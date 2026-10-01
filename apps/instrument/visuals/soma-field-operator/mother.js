// MOTHER: ask the programme's NotebookLM notebook about the current view.
// Modes (Settings): OFF (hidden), WEB (copy the question with its context and
// open the public notebook, answered under the visitor's own Google account),
// API (answer inline through the local bridge in apps/instrument/mother/,
// which uses the author's own login; never exposed publicly).

const STORAGE = { mode: 'mother-mode', notebook: 'mother-notebook-url', bridge: 'mother-bridge-url' };
const DEFAULT_BRIDGE = 'http://127.0.0.1:8765';
// The programme's public notebook (NotebookLM is now served from notebook.google.com).
const DEFAULT_NOTEBOOK = 'https://notebook.google.com/notebook/16368cb3-6c5f-47b3-8e79-781b77084944';

function read(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
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
    <header><span>MU/TH/UR // [T]-THEORY INTERFACE</span><button type="button" class="mother-close" aria-label="Close">X</button></header>
    <pre class="mother-log" aria-live="polite"></pre>
    <form class="mother-form"><span>&gt;</span><input class="mother-input" autocomplete="off" placeholder="ASK ABOUT THIS VIEW" /></form>`;
  document.body.append(terminal);
  const log = terminal.querySelector('.mother-log');
  const form = terminal.querySelector('.mother-form');
  const input = terminal.querySelector('.mother-input');
  let typing = Promise.resolve();

  function type(text, speed = 12) {
    typing = typing.then(() => new Promise(resolve => {
      let index = 0;
      const step = () => {
        log.textContent += text.slice(index, index + 3);
        index += 3;
        log.scrollTop = log.scrollHeight;
        if (index < text.length) setTimeout(step, speed);
        else { log.textContent += '\n'; resolve(); }
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

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
    const context = getContext();
    const prompt = composePrompt(question, context);
    log.textContent += `\n> ${question}\n`;

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
        body: JSON.stringify({ question, prompt, context }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? `HTTP ${response.status}`);
      await type(data.answer ?? '(NO ANSWER)', 6);
      if (data.citations?.length) await type(`SOURCES: ${data.citations.join('; ')}`);
      await type('[INTERPRETIVE / MAY ERR: CHECK THE CITED SOURCES]');
    } catch (error) {
      await type(`BRIDGE OFFLINE OR ERROR: ${error.message}\nSTART IT WITH apps/instrument/mother/run_bridge.ps1`);
    }
  });

  return { sync };
}
