// MOTHER: ask the programme's NotebookLM notebook about the current view.
// Modes (Settings): OFF (hidden), WEB (copy the question with its context and
// open the public notebook, answered under the visitor's own Google account),
// API (answer inline through the local bridge in apps/instrument/mother/,
// which uses the author's own login; never exposed publicly).

import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { eras, levels, questions } from './generated/app-data.js';

const STORAGE = {
  mode: 'mother-mode',
  notebook: 'mother-notebook-url',
  bridge: 'mother-bridge-url',
  compare: 'mother-compare',
  persona: 'mother-persona',
  shellProfile: 'mother-shell-profile',
  history: 'mother-history',
};
const DEFAULT_BRIDGE = 'http://127.0.0.1:8765';
// The programme's public notebook (NotebookLM is now served from notebook.google.com).
const DEFAULT_NOTEBOOK = 'https://notebook.google.com/notebook/16368cb3-6c5f-47b3-8e79-781b77084944';
const SLASH_COMMANDS = ['/help', '/persona mother', '/persona hal', '/compare on', '/compare off', '/clear', '/shell'];
const COMPLETION_IDS = [...levels.map(level => level.id), ...questions.map(question => question.id), ...eras.map(era => era.id)].sort();

function read(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
}

function escapeHtml(text) {
  return text.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function renderMath(tex, display) {
  try {
    return globalThis.katex ? globalThis.katex.renderToString(tex, { displayMode: display, throwOnError: false }) : escapeHtml(tex);
  } catch {
    return escapeHtml(tex);
  }
}

// NotebookLM answers are Markdown with LaTeX; render a safe subset.
function renderAnswer(markdown) {
  const maths = [];
  const codeBlocks = [];
  const stash = (tex, display) => `\u0000${maths.push(renderMath(tex.replace(/\\\\/g, '\\'), display)) - 1}\u0000`;
  const stashCode = (language, code) => `\u0001${codeBlocks.push({ language: language.trim(), code: code.trimEnd() }) - 1}\u0001`;
  let text = markdown
    .replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_, language, code) => stashCode(language, code))
    .replace(/\\{1,2}\[([\s\S]+?)\\{1,2}\]/g, (_, tex) => stash(tex, true))
    .replace(/\\{1,2}\(([\s\S]+?)\\{1,2}\)/g, (_, tex) => stash(tex, false))
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => stash(tex, true));
  text = escapeHtml(text);
  const lines = text.split('\n').map(line => {
    if (/^\u0001\d+\u0001$/.test(line.trim())) return line.trim();
    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) return '<hr>';
    const heading = line.match(/^#{1,6}\s+(.*)$/);
    if (heading) return `<h4>${heading[1]}</h4>`;
    const item = line.match(/^\s*(?:[-*]|\d+\.)\s+(.*)$/);
    if (item) return `<li>${item[1]}</li>`;
    return line.trim() ? `<p>${line}</p>` : '';
  });
  return lines.join('')
    .replace(/(<li>.*?<\/li>)+/g, match => `<ul>${match}</ul>`)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>')
    .replace(/\[(\d+(?:\s*[,\u2013-]\s*\d+)*)\]/g, '<sup class="mother-cite">[$1]</sup>')
    .replace(/\u0000(\d+)\u0000/g, (_, index) => maths[Number(index)])
    .replace(/\u0001(\d+)\u0001/g, (_, index) => {
      const block = codeBlocks[Number(index)];
      const command = block.code.trim();
      return `<div class="mother-code-block"><button type="button" class="mother-run-shell" data-command="${escapeHtml(command)}">RUN IN SHELL</button><pre><code>${escapeHtml(block.code)}</code></pre></div>`;
    });
}

// The baseline (mainstream reference notebook) gets the bare question: no programme framing.
function composeBaselinePrompt(question, context) {
  const register = {
    cookie: 'Explain as if to a curious ten-year-old.',
    general: 'Explain for an educated general reader.',
    specialist: 'Explain for a specialist; include the relevant equations.',
  }[context.reader] ?? '';
  return `${register} Answer from the sources.\n\nQuestion: ${question}`;
}

function composePrompt(question, context) {
  const register = {
    cookie: 'Explain as if to a curious ten-year-old.',
    general: 'Explain for an educated general reader.',
    specialist: 'Explain for a specialist; include the relevant equations.',
  }[context.reader] ?? '';
  return [
    'Context: I am looking at the [T]-Theory Soma Machine.',
    `Level: ${context.levelLabel} (${context.levelId}), scale ${context.lengthScale}, response time ${context.responseTime}.`,
    `Path: ${context.pathLabel}. Model: ${context.modelLabel}.`,
    context.lensOn
      ? `T-Theory lens ON at ${context.dimension}D: the programme's field layers are shown.`
      : 'T-Theory lens OFF: only ordinary 4D physics is shown.',
    `${register} Answer from the sources, and say which claims are established science and which are the programme's interpretation or open hypotheses.`,
    '',
    `Question: ${question}`,
  ].join('\n');
}

export function createMother({ getContext }) {
  const button = document.createElement('button');
  button.id = 'mother-open';
  button.type = 'button';
  button.className = 'mode-button mother-open';
  button.textContent = 'ASK MOTHER';
  button.hidden = true;
  document.querySelector('#poke')?.after(button);

  const settings = document.createElement('div');
  settings.className = 'mother-settings';
  settings.innerHTML = `
    <label for="mother-mode">MOTHER</label>
    <select id="mother-mode" autocomplete="off">
      <option value="off">OFF</option>
      <option value="web">WEB / PUBLIC NOTEBOOK</option>
      <option value="api">API / LOCAL BRIDGE</option>
    </select>
    <input id="mother-notebook" type="url" placeholder="Public NotebookLM notebook URL" autocomplete="off" />
    <input id="mother-bridge" type="url" placeholder="${DEFAULT_BRIDGE}" autocomplete="off" />`;
  document.querySelector('.settings-panel')?.append(settings);
  const modeSelect = settings.querySelector('#mother-mode');
  const notebookInput = settings.querySelector('#mother-notebook');
  const bridgeInput = settings.querySelector('#mother-bridge');

  const terminal = document.createElement('section');
  terminal.className = 'mother-terminal';
  terminal.hidden = true;
  terminal.setAttribute('role', 'dialog');
  terminal.setAttribute('aria-label', 'MOTHER interface');
  terminal.innerHTML = `
    <header><span class="mother-title">MU/TH/UR // [T]-THEORY INTERFACE</span><nav class="mother-tabs" aria-label="MOTHER panel tabs"><button type="button" class="active" data-tab="chat">CHAT</button><button type="button" data-tab="shell">SHELL</button></nav><span class="mother-persona" role="radiogroup" aria-label="Notebook"><label><input type="radio" name="mother-persona" value="mother" autocomplete="off" /> MOTHER</label><label title="H-AL (Hologram Al): the author's private notebook; API mode only"><input type="radio" name="mother-persona" value="hal" autocomplete="off" /> H-AL</label></span><label class="mother-compare" title="Also ask the mainstream reference notebook and show what [T]-Theory adds (API mode)"><input type="checkbox" autocomplete="off" /> COMPARE</label><button type="button" class="mother-close" aria-label="Close">X</button></header>
    <div class="mother-pane mother-pane-chat" data-pane="chat">
      <div class="mother-log" aria-live="polite"></div>
      <form class="mother-form"><span>&gt;</span><input class="mother-input" autocomplete="off" placeholder="ASK ABOUT THIS VIEW — /help FOR COMMANDS" /></form>
    </div>
    <div class="mother-pane mother-pane-shell" data-pane="shell" hidden>
      <div class="mother-shell-toolbar"><label>PROFILE <select class="mother-shell-profile" autocomplete="off"></select></label><button type="button" class="mother-shell-connect">CONNECT</button><button type="button" class="mother-shell-disconnect">KILL</button><span class="mother-shell-status">BRIDGE NOT CHECKED</span></div>
      <div class="mother-shell-host" aria-label="Local shell terminal"></div>
    </div>`;
  document.body.append(terminal);
  const log = terminal.querySelector('.mother-log');
  const form = terminal.querySelector('.mother-form');
  const input = terminal.querySelector('.mother-input');
  const chatPane = terminal.querySelector('[data-pane="chat"]');
  const shellPane = terminal.querySelector('[data-pane="shell"]');
  const tabButtons = [...terminal.querySelectorAll('.mother-tabs button')];
  const profileSelect = terminal.querySelector('.mother-shell-profile');
  const shellConnect = terminal.querySelector('.mother-shell-connect');
  const shellDisconnect = terminal.querySelector('.mother-shell-disconnect');
  const shellStatus = terminal.querySelector('.mother-shell-status');
  const shellHost = terminal.querySelector('.mother-shell-host');
  const personaInputs = [...terminal.querySelectorAll('.mother-persona input')];
  const titleSpan = terminal.querySelector('.mother-title');
  let activeTab = 'chat';
  let xterm;
  let fitAddon;
  let shellSocket;
  let shellHealth;
  let pendingShellPaste = '';
  let history = [];
  let historyIndex = null;
  let typing = Promise.resolve();
  const persona = () => (modeSelect.value === 'api' ? personaInputs.find(radio => radio.checked)?.value ?? 'mother' : 'mother');
  const syncPersona = () => {
    terminal.querySelector('.mother-persona').hidden = modeSelect.value !== 'api' || activeTab !== 'chat';
    terminal.querySelector('.mother-compare').hidden = activeTab !== 'chat';
    titleSpan.textContent = persona() === 'hal' ? 'H-AL // HOLOGRAM AL' : 'MU/TH/UR // [T]-THEORY INTERFACE';
    terminal.classList.toggle('persona-hal', persona() === 'hal');
    if (xterm) xterm.options.theme = shellTheme();
  };
  for (const radio of personaInputs) {
    radio.checked = radio.value === read(STORAGE.persona, 'mother');
    radio.addEventListener('change', () => { write(STORAGE.persona, persona()); loadHistory(); syncPersona(); });
  }
  modeSelect.addEventListener('change', syncPersona);
  syncPersona();
  const compareInput = terminal.querySelector('.mother-compare input');
  compareInput.checked = read(STORAGE.compare, 'on') === 'on';
  compareInput.addEventListener('change', () => write(STORAGE.compare, compareInput.checked ? 'on' : 'off'));

  function historyKey() {
    return `${STORAGE.history}-${persona()}`;
  }

  function loadHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(historyKey()) || '[]');
      history = Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string').slice(-80) : [];
    } catch {
      history = [];
    }
    historyIndex = null;
  }

  function remember(question) {
    if (question.startsWith('/')) return;
    history = history.filter(item => item !== question);
    history.push(question);
    history = history.slice(-80);
    try { localStorage.setItem(historyKey(), JSON.stringify(history)); } catch { /* storage unavailable */ }
    historyIndex = null;
  }

  function historyStep(direction) {
    if (!history.length) return;
    if (historyIndex === null) historyIndex = direction < 0 ? history.length - 1 : history.length;
    else historyIndex = Math.max(0, Math.min(history.length, historyIndex + direction));
    input.value = historyIndex === history.length ? '' : history[historyIndex];
    queueMicrotask(() => input.setSelectionRange(input.value.length, input.value.length));
  }

  function completionsFor(token) {
    const pool = token.startsWith('/') ? SLASH_COMMANDS : COMPLETION_IDS;
    return pool.filter(item => item.toLowerCase().startsWith(token.toLowerCase()));
  }

  function completeInput() {
    const cursor = input.selectionStart ?? input.value.length;
    const before = input.value.slice(0, cursor);
    const start = Math.max(before.lastIndexOf(' '), before.lastIndexOf('\n')) + 1;
    const token = before.slice(start);
    if (!token) return false;
    const matches = completionsFor(token);
    if (!matches.length) return false;
    const replacement = matches.length === 1 ? matches[0] : matches.reduce((prefix, value) => {
      let index = 0;
      while (index < prefix.length && index < value.length && prefix[index].toLowerCase() === value[index].toLowerCase()) index += 1;
      return prefix.slice(0, index);
    });
    if (!replacement || replacement === token) {
      shellStatus.textContent = `MATCHES: ${matches.slice(0, 6).join('  ')}${matches.length > 6 ? ' ...' : ''}`;
      return true;
    }
    input.value = `${input.value.slice(0, start)}${replacement}${input.value.slice(cursor)}`;
    input.setSelectionRange(start + replacement.length, start + replacement.length);
    return true;
  }

  function showTab(tab) {
    activeTab = tab;
    chatPane.hidden = tab !== 'chat';
    shellPane.hidden = tab !== 'shell';
    terminal.classList.toggle('mother-shell-active', tab === 'shell');
    for (const button of tabButtons) button.classList.toggle('active', button.dataset.tab === tab);
    syncPersona();
    if (tab === 'shell') {
      ensureTerminal();
      refreshShell().then(() => fitShell()).catch(() => fitShell());
    } else {
      input.focus();
    }
  }

  function shellBridge() {
    return (bridgeInput.value.trim() || DEFAULT_BRIDGE).replace(/\/$/, '');
  }

  function shellTheme() {
    const hal = persona() === 'hal';
    return {
      background: hal ? '#120403' : '#020a04',
      foreground: hal ? '#ff9a8a' : '#9dffb5',
      cursor: hal ? '#ffd2ca' : '#d9ffe3',
      selectionBackground: hal ? '#84251e' : '#1d6d38',
      black: '#05070e',
      red: '#ff604a',
      green: '#7dff9a',
      yellow: '#f6c75a',
      blue: '#8fd0ff',
      magenta: '#ff3bce',
      cyan: '#14e5ff',
      white: '#eaf5ff',
    };
  }

  function ensureTerminal() {
    if (xterm) return;
    xterm = new Terminal({
      cursorBlink: true,
      fontFamily: '"Space Mono", Consolas, monospace',
      fontSize: 13,
      theme: shellTheme(),
      allowProposedApi: false,
    });
    fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.open(shellHost);
    xterm.write('SOMA MACHINE LOCAL SHELL\r\n');
    xterm.onData(data => {
      if (shellSocket?.readyState === WebSocket.OPEN) shellSocket.send(JSON.stringify({ type: 'input', data }));
    });
  }

  function fitShell() {
    if (!fitAddon || shellPane.hidden) return;
    try {
      fitAddon.fit();
      if (shellSocket?.readyState === WebSocket.OPEN) shellSocket.send(JSON.stringify({ type: 'resize', cols: xterm.cols, rows: xterm.rows }));
    } catch { /* terminal not measurable yet */ }
  }

  async function refreshShell() {
    const response = await fetch(`${shellBridge()}/health`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
    shellHealth = data.shell;
    profileSelect.innerHTML = '';
    for (const [name, profile] of Object.entries(shellHealth.profiles ?? {})) {
      const option = document.createElement('option');
      option.value = name;
      option.disabled = !profile.enabled;
      option.textContent = profile.enabled ? profile.label : `${profile.label} — ${profile.hint}`;
      profileSelect.append(option);
    }
    profileSelect.value = read(STORAGE.shellProfile, 'bash');
    if (profileSelect.selectedOptions[0]?.disabled) profileSelect.value = [...profileSelect.options].find(option => !option.disabled)?.value ?? 'bash';
    shellConnect.disabled = !shellHealth.enabled || !shellHealth.available;
    shellStatus.textContent = shellHealth.enabled
      ? (shellHealth.available ? `READY (${shellHealth.active}/${shellHealth.limit})` : 'INSTALL pywinpty IN THE MOTHER VENV')
      : 'SHELL OFF: set "shell": true in mother.local.json';
    return shellHealth;
  }

  function cleanPaste(command) {
    return command.trim().replace(/\r?\n/g, ' ');
  }

  async function connectShell(commandToPaste = '') {
    ensureTerminal();
    if (!shellHealth) await refreshShell();
    if (!shellHealth?.enabled || !shellHealth?.available || !shellHealth?.token) return;
    if (shellSocket?.readyState === WebSocket.OPEN) {
      if (commandToPaste) shellSocket.send(JSON.stringify({ type: 'input', data: cleanPaste(commandToPaste) }));
      return;
    }
    pendingShellPaste = commandToPaste;
    const wsBase = shellBridge().replace(/^http/i, 'ws');
    const profile = profileSelect.value || 'bash';
    write(STORAGE.shellProfile, profile);
    const params = new URLSearchParams({ token: shellHealth.token, profile, cols: String(xterm.cols || 100), rows: String(xterm.rows || 28) });
    shellSocket = new WebSocket(`${wsBase}/shell?${params}`);
    shellStatus.textContent = `CONNECTING ${profile.toUpperCase()}...`;
    shellSocket.addEventListener('open', () => {
      shellStatus.textContent = `CONNECTED ${profile.toUpperCase()}`;
      fitShell();
      if (pendingShellPaste) {
        shellSocket.send(JSON.stringify({ type: 'input', data: cleanPaste(pendingShellPaste) }));
        pendingShellPaste = '';
      }
    });
    shellSocket.addEventListener('message', event => xterm.write(String(event.data)));
    shellSocket.addEventListener('close', () => { shellStatus.textContent = 'SHELL CLOSED'; });
    shellSocket.addEventListener('error', () => { shellStatus.textContent = 'SHELL ERROR'; });
  }

  function disconnectShell() {
    if (shellSocket) shellSocket.close();
    shellSocket = undefined;
  }

  function openShell(command = '') {
    terminal.hidden = false;
    showTab('shell');
    connectShell(command);
  }

  function helpHtml() {
    const idList = (title, items) => `<p><strong>${title}</strong>: ${items.map(escapeHtml).join(', ')}</p>`;
    return `<div class="mother-answer"><p class="mother-section">CHAT COMMANDS</p><p>${SLASH_COMMANDS.map(escapeHtml).join('  ')}</p>${idList('LEVEL IDS', levels.map(level => level.id))}${idList('QUESTION IDS', questions.map(question => question.id))}${idList('ERA IDS', eras.map(era => era.id))}<p>UP/DOWN browse per-persona history. TAB completes commands and ids. Code blocks have RUN IN SHELL buttons that paste only.</p></div>`;
  }

  function handleCommand(command) {
    const [verb, ...rest] = command.split(/\s+/);
    if (verb === '/help') {
      log.insertAdjacentHTML('beforeend', helpHtml());
      log.scrollTop = log.scrollHeight;
      return true;
    }
    if (verb === '/clear') {
      log.innerHTML = '';
      return true;
    }
    if (verb === '/shell') {
      openShell();
      return true;
    }
    if (verb === '/compare') {
      compareInput.checked = rest[0] !== 'off';
      write(STORAGE.compare, compareInput.checked ? 'on' : 'off');
      type(`COMPARE ${compareInput.checked ? 'ON' : 'OFF'}`);
      return true;
    }
    if (verb === '/persona' && ['mother', 'hal'].includes(rest[0])) {
      for (const radio of personaInputs) radio.checked = radio.value === rest[0];
      write(STORAGE.persona, persona());
      loadHistory();
      syncPersona();
      type(`PERSONA ${persona().toUpperCase()}`);
      return true;
    }
    return false;
  }

  function type(text, speed = 12) {
    typing = typing.then(() => new Promise(resolve => {
      let index = 0;
      const line = document.createElement('div');
      line.className = 'mother-line';
      log.append(line);
      const step = () => {
        line.textContent += text.slice(index, index + 3);
        index += 3;
        log.scrollTop = log.scrollHeight;
        if (index < text.length) setTimeout(step, speed);
        else resolve();
      };
      step();
    }));
    return typing;
  }

  function sync() {
    const mode = modeSelect.value;
    write(STORAGE.mode, mode);
    write(STORAGE.notebook, notebookInput.value.trim());
    write(STORAGE.bridge, bridgeInput.value.trim());
    notebookInput.hidden = mode !== 'web';
    bridgeInput.hidden = mode !== 'api';
    button.hidden = mode === 'off';
    if (mode === 'off') terminal.hidden = true;
  }

  modeSelect.value = read(STORAGE.mode, 'off');
  notebookInput.value = read(STORAGE.notebook, '') || DEFAULT_NOTEBOOK;
  bridgeInput.value = read(STORAGE.bridge, '');
  for (const control of [modeSelect, notebookInput, bridgeInput]) control.addEventListener('change', sync);
  loadHistory();
  sync();

  button.addEventListener('click', () => {
    terminal.hidden = !terminal.hidden;
    if (!terminal.hidden) {
      if (!log.textContent) {
        const context = getContext();
        type(`INTERFACE READY FOR INQUIRY.\nMODE: ${modeSelect.value.toUpperCase()}\nVIEW: ${context.levelLabel} / ${context.pathLabel} / LENS ${context.lensOn ? 'ON' : 'OFF'}`);
      }
      if (activeTab === 'shell') fitShell();
      else input.focus();
    }
  });
  terminal.querySelector('.mother-close').addEventListener('click', () => { terminal.hidden = true; });
  for (const tab of tabButtons) tab.addEventListener('click', () => showTab(tab.dataset.tab));
  shellConnect.addEventListener('click', () => connectShell());
  shellDisconnect.addEventListener('click', disconnectShell);
  profileSelect.addEventListener('change', () => { write(STORAGE.shellProfile, profileSelect.value); disconnectShell(); });
  log.addEventListener('click', event => {
    const run = event.target.closest('.mother-run-shell');
    if (run) openShell(run.dataset.command ?? '');
  });
  new ResizeObserver(() => fitShell()).observe(terminal);
  window.addEventListener('panel-resize', event => {
    if (!event.detail || event.detail.panel === terminal || event.target === terminal) fitShell();
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      form.requestSubmit();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      historyStep(-1);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      historyStep(1);
    } else if (event.key === 'Tab') {
      if (completeInput()) event.preventDefault();
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
    if (question.startsWith('/') && handleCommand(question)) return;
    remember(question);
    const context = getContext();
    const prompt = composePrompt(question, context);
    const asked = document.createElement('div');
    asked.className = 'mother-line mother-question';
    asked.textContent = `> ${question}`;
    log.append(asked);

    if (modeSelect.value === 'web') {
      const url = notebookInput.value.trim();
      if (!/^https:\/\/notebook(lm)?\.google\.com\//.test(url)) {
        await type('NO PUBLIC NOTEBOOK SET. ADD ITS URL IN SETTINGS.');
        return;
      }
      try { await navigator.clipboard.writeText(prompt); } catch { /* clipboard blocked */ }
      window.open(url, '_blank', 'noopener');
      await type('QUESTION COPIED WITH YOUR VIEW.\nNOTEBOOK OPENED IN A NEW TAB: PASTE TO ASK.');
      return;
    }

    const bridge = (bridgeInput.value.trim() || DEFAULT_BRIDGE).replace(/\/$/, '');
    await type('QUERYING...', 30);
    try {
      const response = await fetch(`${bridge}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, prompt, context, persona: persona(), compare: compareInput.checked, baseline_prompt: composeBaselinePrompt(question, context) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      await typing;
      const section = (title, html, className = 'mother-answer') => {
        const block = document.createElement('div');
        block.className = className;
        block.innerHTML = `${title ? `<p class="mother-section">${title}</p>` : ''}${html}`;
        log.append(block);
        log.scrollTop = log.scrollHeight;
        return block;
      };
      const sources = list => (list?.length ? `<p class="mother-sources">SOURCES: ${list.map((title, index) => `[${index + 1}] ${escapeHtml(title)}`).join('; ')}</p>` : '');
      section(data.diff ? `${persona() === 'hal' ? 'H-AL' : 'MOTHER'} / [T]-THEORY` : '', renderAnswer(data.answer ?? '(NO ANSWER)') + sources(data.citations));
      if (data.diff) {
        section('WHAT [T]-THEORY ADDS', renderAnswer(data.diff), 'mother-answer mother-diff');
        const baseline = document.createElement('details');
        baseline.className = 'mother-answer mother-baseline';
        baseline.innerHTML = `<summary>MAINSTREAM ANSWER (REFERENCE SOURCES)</summary>${renderAnswer(data.baseline?.answer ?? '')}${sources(data.baseline?.citations)}`;
        log.append(baseline);
      } else if (compareInput.checked) {
        await type('(NO BASELINE NOTEBOOK CONFIGURED: COMPARE SKIPPED)');
      }
      await type('[INTERPRETIVE / MAY ERR: CHECK THE CITED SOURCES]');
    } catch (error) {
      // fetch() rejects with TypeError only when the bridge cannot be reached at all.
      if (error instanceof TypeError) await type('BRIDGE OFFLINE.\nSTART IT WITH apps/instrument/mother/run_bridge.ps1');
      else await type(`MOTHER ERROR: ${error.message}`);
    }
  });

  return {
    sync,
    open(prefill = '') {
      terminal.hidden = false;
      showTab('chat');
      if (!log.textContent) {
        const context = getContext();
        type(`INTERFACE READY FOR INQUIRY.\nMODE: ${modeSelect.value.toUpperCase()}\nVIEW: ${context.levelLabel} / ${context.pathLabel} / LENS ${context.lensOn ? 'ON' : 'OFF'}`);
      }
      if (prefill) input.value = prefill;
      input.focus();
      input.select();
    },
  };
}
