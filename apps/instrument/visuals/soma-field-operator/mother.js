// MOTHER: ask the programme's NotebookLM notebook about the current view.
// Modes (Settings): OFF (hidden), WEB (copy the question with its context and
// open the public notebook, answered under the visitor's own Google account),
// API (answer inline through the local bridge in apps/instrument/mother/,
// which uses the author's own login; never exposed publicly).

const STORAGE = { mode: 'mother-mode', notebook: 'mother-notebook-url', bridge: 'mother-bridge-url', compare: 'mother-compare', persona: 'mother-persona' };
const DEFAULT_BRIDGE = 'http://127.0.0.1:8765';
// The programme's public notebook (NotebookLM is now served from notebook.google.com).
const DEFAULT_NOTEBOOK = 'https://notebook.google.com/notebook/16368cb3-6c5f-47b3-8e79-781b77084944';

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
  const stash = (tex, display) => `\u0000${maths.push(renderMath(tex.replace(/\\\\/g, '\\'), display)) - 1}\u0000`;
  let text = markdown
    .replace(/\\{1,2}\[([\s\S]+?)\\{1,2}\]/g, (_, tex) => stash(tex, true))
    .replace(/\\{1,2}\(([\s\S]+?)\\{1,2}\)/g, (_, tex) => stash(tex, false))
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => stash(tex, true));
  text = escapeHtml(text);
  const lines = text.split('\n').map(line => {
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
    .replace(/\u0000(\d+)\u0000/g, (_, index) => maths[Number(index)]);
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
    <header><span class="mother-title">MU/TH/UR // [T]-THEORY INTERFACE</span><span class="mother-persona" role="radiogroup" aria-label="Notebook"><label><input type="radio" name="mother-persona" value="mother" autocomplete="off" /> MOTHER</label><label title="H-AL (Hologram Al): the author's private notebook; API mode only"><input type="radio" name="mother-persona" value="hal" autocomplete="off" /> H-AL</label></span><label class="mother-compare" title="Also ask the mainstream reference notebook and show what [T]-Theory adds (API mode)"><input type="checkbox" autocomplete="off" /> COMPARE</label><button type="button" class="mother-close" aria-label="Close">X</button></header>
    <div class="mother-log" aria-live="polite"></div>
    <form class="mother-form"><span>&gt;</span><input class="mother-input" autocomplete="off" placeholder="ASK ABOUT THIS VIEW" /></form>`;
  document.body.append(terminal);
  const log = terminal.querySelector('.mother-log');
  const form = terminal.querySelector('.mother-form');
  const input = terminal.querySelector('.mother-input');
  const personaInputs = [...terminal.querySelectorAll('.mother-persona input')];
  const titleSpan = terminal.querySelector('.mother-title');
  const persona = () => (modeSelect.value === 'api' ? personaInputs.find(radio => radio.checked)?.value ?? 'mother' : 'mother');
  const syncPersona = () => {
    terminal.querySelector('.mother-persona').hidden = modeSelect.value !== 'api';
    titleSpan.textContent = persona() === 'hal' ? 'H-AL // HOLOGRAM AL' : 'MU/TH/UR // [T]-THEORY INTERFACE';
    terminal.classList.toggle('persona-hal', persona() === 'hal');
  };
  for (const radio of personaInputs) {
    radio.checked = radio.value === read(STORAGE.persona, 'mother');
    radio.addEventListener('change', () => { write(STORAGE.persona, persona()); syncPersona(); });
  }
  modeSelect.addEventListener('change', syncPersona);
  syncPersona();
  const compareInput = terminal.querySelector('.mother-compare input');
  compareInput.checked = read(STORAGE.compare, 'on') === 'on';
  compareInput.addEventListener('change', () => write(STORAGE.compare, compareInput.checked ? 'on' : 'off'));
  let typing = Promise.resolve();

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
  sync();

  button.addEventListener('click', () => {
    terminal.hidden = !terminal.hidden;
    if (!terminal.hidden) {
      if (!log.textContent) {
        const context = getContext();
        type(`INTERFACE READY FOR INQUIRY.\nMODE: ${modeSelect.value.toUpperCase()}\nVIEW: ${context.levelLabel} / ${context.pathLabel} / LENS ${context.lensOn ? 'ON' : 'OFF'}`);
      }
      input.focus();
    }
  });
  terminal.querySelector('.mother-close').addEventListener('click', () => { terminal.hidden = true; });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
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

  return { sync };
}
