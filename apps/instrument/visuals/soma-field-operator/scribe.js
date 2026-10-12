// SCRIBE (ISS-079): the programme's own sources in a vim-keyed editor panel. CodeMirror 6
// with @replit/codemirror-vim, loaded on first open. Read-only: a reader with vim keys.
//   :e <name>   open a paper, book or Lean module (fuzzy)    :ls   list them
//   gd          the Lean declaration under the cursor: its tower in the city of code
//   gs          the stop this section is about               ]d [d next / previous finding
// Sherlock's findings (bld/sherlock/ledger.txt, baked into the app data) are its diagnostics.
// ` (backquote) opens and closes it from anywhere, the explorer included; inside, ` is vim's
// mark jump, so :q closes it.

const STOP_WORDS = { // the same map as apps/vscode/extension.js
  ureter: /\b(ureter\w*|kidney stone|stone|stent|colic|renal)\b/gi,
  limbic: /\b(limbic|amygdala\w*|hippocamp\w*|threat|alarm|fear)\b/gi,
  thought: /\b(thoughts?|ruminat\w*|adhd|mindful\w*)\b/gi,
  neuron: /\b(neurons?|synap\w*|dendrit\w*|axons?|cellular)\b/gi,
  network: /\b(hopfield|memory|memories|attractors?)\b/gi,
  landscape: /\b(landscape|basins?|potential well|lean|theorem|proof)\b/gi,
  dyad: /\b(dyad\w*|co-?regulat\w*|attachment|couple|therapist)\b/gi,
  score: /\b(music\w*|score|tempo|rhythm|tensor|containers?)\b/gi,
  brain: /\b(brain|cort\w+|cemi|emf|electromagnetic|cathedral)\b/gi,
  body: /\b(body|vagal|vagus|heart|breath\w*|somatic|interocept\w*)\b/gi,
  flight: /\b(cosmo\w*|universe|galax\w*|planck|scales?)\b/gi,
};

export function stopFor(text) {
  let best = 'human', most = 0;
  for (const [stop, rx] of Object.entries(STOP_WORDS)) {
    const n = (text.match(rx) || []).length;
    if (n > most) { most = n; best = stop; }
  }
  return best;
}

const LEAN_KEYWORDS = new Set(('theorem lemma def axiom structure inductive instance class namespace end open import variable ' +
  'by fun let have show where if then else match with sorry example noncomputable abbrev opaque section private protected ' +
  'calc at intro exact apply simp rfl decide norm_num linarith ring omega aesop').split(' '));

function leanLanguage(StreamLanguage) {
  return StreamLanguage.define({
    startState: () => ({ block: 0 }),
    token(stream, state) {
      if (state.block > 0) {
        while (!stream.eol()) {
          if (stream.match('/-')) state.block += 1;
          else if (stream.match('-/')) { state.block -= 1; if (!state.block) break; } else stream.next();
        }
        return 'comment';
      }
      if (stream.eatSpace()) return null;
      if (stream.match('--')) { stream.skipToEnd(); return 'comment'; }
      if (stream.match('/-')) { state.block = 1; return 'comment'; }
      if (stream.match(/^"(?:[^"\\]|\\.)*"/)) return 'string';
      if (stream.match(/^\d+(\.\d+)?/)) return 'number';
      const w = stream.match(/^[A-Za-z_][\w.'!?]*/);
      if (w) return LEAN_KEYWORDS.has(w[0]) ? 'keyword' : /^[A-Z]/.test(w[0]) ? 'typeName' : 'variableName';
      stream.next();
      return 'operator';
    },
  });
}

export function createScribe({ index, towers, go }) {
  const files = index?.files ?? [];
  const findings = index?.findings ?? [];
  const decls = new Map(); // short or full declaration name -> module
  for (const t of towers?.towers ?? []) for (const d of t.decls) { decls.set(d.n, t.module); if (d.f) decls.set(d.f, t.module); }
  const modules = new Set((towers?.towers ?? []).map(t => t.module));

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'mode-button scribe-open';
  button.textContent = 'SCRIBE';
  button.title = 'The programme\'s papers, books and Lean in a vim-keyed reader';
  document.querySelector('#poke')?.after(button);

  const panel = document.createElement('section');
  panel.className = 'scribe-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'SCRIBE');
  const kinds = { paper: 'PAPERS', book: 'BOOKS', lean: 'LEAN (PROGRAMME)', sherlock: 'LEAN (SHERLOCK)' };
  panel.innerHTML = `
    <header><select class="scribe-file" aria-label="File">${Object.entries(kinds).map(([k, label]) =>
      `<optgroup label="${label}">${files.filter(f => f.kind === k).map(f =>
        `<option value="${f.path}">${(f.title || f.path).replace(/</g, '&lt;')}</option>`).join('')}</optgroup>`).join('')}</select>
      <span class="scribe-status"></span><button type="button" class="scribe-close" aria-label="Close">X</button></header>
    <div class="scribe-host"></div>
    <footer>:e name · :ls · gd tower · gs stop · ]d [d findings · :q close · read-only</footer>`;
  document.body.append(panel);
  const select = panel.querySelector('.scribe-file');
  const status = panel.querySelector('.scribe-status');
  const host = panel.querySelector('.scribe-host');
  // vim keys stay in the editor: the app's own shortcuts (look, labels, B) listen on the window
  panel.addEventListener('keydown', event => event.stopPropagation());

  let cm = null; // the loaded modules
  let view = null;
  let current = null;
  const cache = new Map();

  const say = text => { status.textContent = text; };

  async function load() {
    if (cm) return cm;
    const [{ basicSetup }, state, viewMod, language, lint, md, vimMod, hl] = await Promise.all([
      import('codemirror'), import('@codemirror/state'), import('@codemirror/view'), import('@codemirror/language'),
      import('@codemirror/lint'), import('@codemirror/lang-markdown'), import('@replit/codemirror-vim'), import('@lezer/highlight'),
    ]);
    cm = { basicSetup, ...state, ...viewMod, ...language, ...lint, ...md, ...vimMod, tags: hl.tags };
    cm.lean = leanLanguage(cm.StreamLanguage);
    cm.style = cm.HighlightStyle.define([
      { tag: hl.tags.heading, color: '#ffe3a8', fontWeight: 'bold' },
      { tag: [hl.tags.keyword, hl.tags.strong], color: '#ff9f43', fontWeight: 'bold' },
      { tag: [hl.tags.comment, hl.tags.quote], color: '#8a7a5a', fontStyle: 'italic' },
      { tag: [hl.tags.string, hl.tags.link, hl.tags.url], color: '#7dd3a8' },
      { tag: [hl.tags.typeName, hl.tags.emphasis], color: '#9ecbff' },
      { tag: [hl.tags.number, hl.tags.monospace], color: '#e9a3ff' },
      { tag: hl.tags.processingInstruction, color: '#7a6a4a' },
    ]);
    defineVim(cm);
    return cm;
  }

  function fileFor(arg) {
    const q = arg.toLowerCase().replace(/\s+/g, '');
    const score = f => {
      const p = f.path.toLowerCase(), t = (f.title || '').toLowerCase().replace(/\s+/g, '');
      if (p.endsWith(`/${q}`) || p.endsWith(`/${q}.md`) || p.endsWith(`/${q}.lean`)) return 0;
      if (p.includes(q)) return 1;
      if (t.includes(q)) return 2;
      return 9;
    };
    return files.map(f => [score(f), f]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0])[0]?.[1] ?? null;
  }

  function section(doc, lineNo) {
    let a = lineNo, b = lineNo;
    while (a > 1 && !/^#{1,6}\s/.test(doc.line(a).text)) a -= 1;
    while (b < doc.lines && !/^#{1,6}\s/.test(doc.line(b + 1).text)) b += 1;
    return doc.sliceString(doc.line(a).from, doc.line(b).to);
  }

  function wordAt(line, ch) {
    const rx = /[A-Za-z_][\w.'!?]*/g;
    let m;
    while ((m = rx.exec(line))) if (m.index <= ch && ch <= m.index + m[0].length) return m[0];
    return '';
  }

  function moduleOf(name) {
    if (decls.has(name)) return decls.get(name);
    const last = name.split('.').pop();
    return decls.get(last) ?? null;
  }

  function defineVim(m) {
    const { Vim } = m;
    Vim.defineEx('edit', 'e', (_, params) => {
      const f = fileFor((params.args || []).join(' '));
      if (f) open(f.path); else say(`no file like “${(params.args || []).join(' ')}”`);
    });
    Vim.defineEx('ls', 'ls', () => say(`${files.length} files: ${files.slice(0, 6).map(f => f.path.split('/').pop()).join(', ')}… (the list above)`));
    Vim.defineEx('quit', 'q', () => { panel.hidden = true; });
    Vim.defineEx('write', 'w', () => say('read-only: SCRIBE reads the sources, the repository changes them'));
    Vim.defineAction('scribeTower', cmv => {
      const pos = cmv.getCursor();
      const word = wordAt(cmv.getLine(pos.line), pos.ch);
      const mod = word && moduleOf(word);
      const own = current?.endsWith('.lean') ? current.split('/').pop().replace(/\.lean$/, '') : null;
      if (mod) { go({ voyage: 'landscape', tower: mod, floor: word.split('.').pop() }); say(`${word}: tower ${mod}`); }
      else if (own && modules.has(own)) { go({ voyage: 'landscape', tower: own }); say(`tower ${own}`); }
      else { go({ voyage: 'landscape' }); say(word ? `${word}: no tower; the city of code` : 'the city of code'); }
    });
    Vim.defineAction('scribeStop', cmv => {
      const doc = view.state.doc;
      const sel = view.state.selection.main;
      const text = sel.empty ? section(doc, cmv.getCursor().line + 1) : doc.sliceString(sel.from, sel.to);
      const stop = stopFor(text);
      go({ voyage: stop });
      say(`this section: ${stop.toUpperCase()}`);
    });
    Vim.defineAction('scribeNext', () => m.nextDiagnostic(view));
    Vim.defineAction('scribePrev', () => m.previousDiagnostic(view));
    Vim.mapCommand('gd', 'action', 'scribeTower', {}, { context: 'normal' });
    Vim.mapCommand('gs', 'action', 'scribeStop', {}, { context: 'normal' });
    Vim.mapCommand(']d', 'action', 'scribeNext', {}, { context: 'normal' });
    Vim.mapCommand('[d', 'action', 'scribePrev', {}, { context: 'normal' });
  }

  async function text(path) {
    if (!cache.has(path)) {
      const response = await fetch(`scribe/${path}`);
      if (!response.ok) throw new Error(`${path}: ${response.status}`);
      cache.set(path, await response.text());
    }
    return cache.get(path);
  }

  async function open(path) {
    const m = await load();
    let body;
    try { body = await text(path); } catch (error) { say(String(error.message || error)); return; }
    current = path;
    select.value = path;
    const lean = path.endsWith('.lean');
    const extensions = [
      m.vim(), m.basicSetup, m.EditorState.readOnly.of(true), m.EditorView.lineWrapping,
      lean ? m.lean : m.markdown(), m.syntaxHighlighting(m.style),
      m.EditorView.theme({
        '&': { height: '100%', color: '#f3dfb4', backgroundColor: 'transparent' },
        '.cm-content': { fontFamily: "'Space Mono', monospace", fontSize: '12.5px', caretColor: '#ffcf7d' },
        '.cm-gutters': { backgroundColor: 'rgba(30,20,6,.6)', color: '#7a6a4a', border: 'none' },
        '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: 'rgba(255,207,125,.07)' },
        '.cm-fat-cursor': { background: '#ffcf7d !important', color: '#140c02 !important' },
        '.cm-panels': { backgroundColor: '#1a1206', color: '#ffcf7d' },
        '.cm-selectionBackground, ::selection': { backgroundColor: 'rgba(255,207,125,.25) !important' },
      }, { dark: true }),
    ];
    const state = m.EditorState.create({ doc: body, extensions });
    if (view) view.setState(state); else view = new m.EditorView({ state, parent: host });
    const mine = findings.filter(f => f.file === path);
    const doc = view.state.doc;
    const diagnostics = mine.filter(f => f.line >= 1 && f.line <= doc.lines).map(f => {
      const line = doc.line(f.line);
      return { from: line.from, to: Math.max(line.from, line.to), severity: f.severity === 'error' ? 'error' : f.severity === 'warning' ? 'warning' : 'info', source: 'Sherlock', message: f.message };
    });
    view.dispatch(m.setDiagnostics(view.state, diagnostics));
    say(`${path} · ${doc.lines} lines · ${mine.length ? `${mine.length} Sherlock finding${mine.length === 1 ? '' : 's'}` : 'Sherlock: no findings'}`);
    view.focus();
  }

  function show(path) {
    panel.hidden = false;
    open(path || current || select.value || files[0]?.path);
  }

  const toggle = () => { if (panel.hidden) show(); else panel.hidden = true; };
  button.addEventListener('click', toggle);
  addEventListener('keydown', event => {
    if (event.key !== '`' || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]') && !panel.contains(event.target)) return;
    event.preventDefault();
    toggle();
  });
  panel.querySelector('.scribe-close').addEventListener('click', () => { panel.hidden = true; });
  select.addEventListener('change', () => open(select.value));

  return { panel, button, open: show, get current() { return current; } };
}
