// tower.js: walk into a tower of the city of code (ISS-071). A panel over the landscape:
// the module's own text falls behind it as code rain (our neon palette), and a floor list,
// foundations first; a floor opens its declaration: the statement, what it rests on, the
// papers that cite it (Sherlock's ledger), kernel-checked at the export's commit.

const MARK = d => (d.sorry ? '✗' : d.k === 'axiom' ? '◆' : d.trivial ? '∘' : d.k === 'theorem' ? '✓' : '=');
const KIND = d => (d.sorry ? 'rests on sorry' : d.k === 'axiom' ? 'axiom (assumed, not proved)' : d.trivial ? 'proves only True (a placeholder)' : d.k === 'theorem' ? 'theorem, kernel-checked' : d.k);
const ORDER = { axiom: 0, inductive: 1, opaque: 1, def: 2, theorem: 3 };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// THE SOURCE (author, 15 Oct 23:20: "a window with highlighted source code, with a font and colour
// matching the ricing"): the module's Lean, coloured in the app's palette, in the app's font;
// RICE's GLOW and FALSE COLOUR apply. The file is the SCRIBE copy (public/scribe/, generated).
const DECL_KW = 'theorem|lemma|def|axiom|structure|inductive|class|instance|abbrev|opaque|example';
const LEAN = new RegExp([
  '(--.*$)',                                                     // 1 line comment
  '(/-)',                                                        // 2 block comment opens
  '("(?:[^"\\\\]|\\\\.)*")',                                 // 3 string
  `\\b(noncomputable\\s+)?(${DECL_KW})(\\s+)([^\\s:({\\[]+)`,          // 4-7 declaration and its name
  '\\b(sorry)\\b',                                               // 8 sorry
  '\\b(by|fun|let|have|show|from|where|with|match|if|then|else|do|at|calc|namespace|end|section|open|import|variable|universe|set_option|private|protected|noncomputable|deriving|in)\\b', // 9 keyword
  '\\b(simp|simp_all|norm_num|linarith|nlinarith|ring|ring_nf|exact|apply|intro|intros|rw|rwa|unfold|constructor|refine|use|positivity|omega|decide|rfl|field_simp|gcongr|aesop|cases|rcases|obtain|induction|trivial|exists|specialize|push_cast|norm_cast|exact_mod_cast|calc|filter_upwards|nlinarith|polyrith|continuity|measurability|fin_cases|interval_cases|split|left|right|contradiction|exfalso|by_contra|subst|congr|ext|funext)\\b', // 10 tactic
  '\\b(\\d+(?:\\.\\d+)?)\\b',                                   // 11 number
  "\\b([A-Z][A-Za-z0-9_']*)",                                     // 12 type or namespace
  '([∀∃λ→←↔∧∨¬≤≥≠∈∉⊆∑∏ℝℕℤℂ√⟨⟩∘×·∣⁻¹²³∞∫∂π]+)',                    // 13 symbols
].join('|'), 'gu');
function highlightLean(text) {
  let inBlock = false, doc = false;
  return text.split('\n').map(line => {
    let out = '', i = 0;
    while (i < line.length) {
      if (inBlock) {
        const close = line.indexOf('-/', i);
        const end = close < 0 ? line.length : close + 2;
        out += `<span class="lean-${doc ? 'doc' : 'comment'}">${esc(line.slice(i, end))}</span>`;
        i = end;
        if (close >= 0) inBlock = false;
        continue;
      }
      LEAN.lastIndex = i;
      const m = LEAN.exec(line);
      if (!m) { out += esc(line.slice(i)); break; }
      out += esc(line.slice(i, m.index));
      if (m[1]) out += `<span class="lean-comment">${esc(m[1])}</span>`;
      else if (m[2]) { inBlock = true; doc = line.startsWith('/--', m.index) || line.startsWith('/-!', m.index); out += `<span class="lean-${doc ? 'doc' : 'comment'}">/-</span>`; }
      else if (m[3]) out += `<span class="lean-string">${esc(m[3])}</span>`;
      else if (m[5]) out += `${m[4] ? '<span class="lean-kw">noncomputable</span> ' : ''}<span class="lean-decl">${m[5]}</span>${m[6]}<span class="lean-name${m[5] === 'axiom' ? ' lean-axiom' : ''}">${esc(m[7])}</span>`;
      else if (m[8]) out += '<span class="lean-sorry">sorry</span>';
      else if (m[9]) out += `<span class="lean-kw">${m[9]}</span>`;
      else if (m[10]) out += `<span class="lean-tactic">${m[10]}</span>`;
      else if (m[11]) out += `<span class="lean-num">${m[11]}</span>`;
      else if (m[12]) out += `<span class="lean-type">${esc(m[12])}</span>`;
      else if (m[13]) out += `<span class="lean-sym">${esc(m[13])}</span>`;
      i = m.index + Math.max(1, m[0].length);
    }
    return out;
  });
}

export function createTowerPanel(root) {
  const panel = document.createElement('aside');
  panel.className = 'explorer__tower';
  panel.hidden = true;
  panel.innerHTML = '<canvas class="explorer__rain" aria-hidden="true"></canvas><div class="explorer__tower-body"></div>';
  root.append(panel);
  const source = document.createElement('section');
  source.className = 'explorer__source';
  source.hidden = true;
  source.innerHTML = '<header><span class="explorer__source-tab"></span><button type="button" data-source="close" aria-label="Close the source">✕</button></header><div class="explorer__source-body"></div>';
  root.append(source);
  source.addEventListener('click', event => { event.stopPropagation(); if (event.target.closest('[data-source="close"]')) source.hidden = true; });
  const sourceCache = new Map();
  // the RICE (the level view's visual customisation) as it stands: glow, false colour
  const rice = () => ({ glow: document.querySelector('#style-glow')?.checked ?? true, falsecolour: document.querySelector('#style-falsecolour')?.checked ?? false });
  async function showSource(it, declName = '') {
    if (!it?.file) return;
    source.hidden = false;
    const r = rice();
    source.classList.toggle('lean--glow', r.glow);
    source.classList.toggle('lean--false', r.falsecolour);
    source.querySelector('.explorer__source-tab').textContent = `SOURCE · ${it.title}${declName ? ` · ${declName}` : ''}`;
    const bodyEl = source.querySelector('.explorer__source-body');
    if (!sourceCache.has(it.file)) {
      bodyEl.textContent = 'loading…';
      try {
        const res = await fetch(`scribe/${it.file}`);
        sourceCache.set(it.file, res.ok ? await res.text() : null);
      } catch { sourceCache.set(it.file, null); }
    }
    const text = sourceCache.get(it.file);
    if (text == null) { bodyEl.textContent = `The source is not in this build (scribe/${it.file}; npm run generate copies it).`; return; }
    // the declaration's lines: from its own line to the next declaration's
    const lines = (it.decls ?? []).map(d => d.line).filter(Boolean).sort((a, b) => a - b);
    const d = (it.decls ?? []).find(x => x.n === declName);
    const from = d?.line ?? 0;
    const to = from ? (lines.find(l => l > from) ?? from + 12) - 1 : 0;
    bodyEl.innerHTML = highlightLean(text).map((h, k) => `<div class="lean-line${k + 1 >= from && k + 1 <= to ? ' lean-here' : ''}"><span class="lean-n">${k + 1}</span>${h || ' '}</div>`).join('');
    if (from) bodyEl.querySelector('.lean-here')?.scrollIntoView({ block: 'center' });
    else bodyEl.scrollTop = 0;
  }
  const rain = panel.querySelector('canvas');
  const body = panel.querySelector('.explorer__tower-body');
  let item = null;
  let drops = [];
  let glyphs = '';
  let raf = 0;
  let floorName = '';

  function draw() {
    const g = rain.getContext('2d');
    const w = rain.width = panel.clientWidth;
    const h = rain.height = panel.clientHeight;
    if (!drops.length) drops = Array.from({ length: Math.ceil(w / 12) }, () => Math.random() * h / 14);
    let last = 0;
    const step = now => {
      if (panel.hidden) return;
      raf = requestAnimationFrame(step);
      if (now - last < 60) return;
      last = now;
      g.fillStyle = 'rgba(2,6,12,0.16)';
      g.fillRect(0, 0, w, h);
      g.font = '13px "Space Mono", monospace';
      drops.forEach((y, i) => {
        const c = glyphs[(i * 31 + Math.floor(y)) % glyphs.length] ?? '0';
        g.fillStyle = Math.random() < 0.08 ? '#e9fff2' : 'rgba(86,240,162,0.55)';
        g.fillText(c, i * 12, y * 14);
        drops[i] = y * 14 > h && Math.random() > 0.96 ? 0 : y + 1;
      });
    };
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(step);
  }

  function floorView(d) {
    floorName = d.n;
    const cites = (d.cite ?? []).map(c => `<li>${esc(c)}</li>`).join('');
    const rests = (d.ax ?? []).map(a => `<li>◆ ${esc(a)}</li>`).join('');
    return `<button type="button" data-tower="back">◂ FLOORS</button>
      <h3>${MARK(d)} ${esc(d.n)}</h3><p class="explorer__tower-kind">${esc(KIND(d))}${d.line ? ` · line ${d.line}` : ''}</p>
      ${item.file ? '<button type="button" data-source="decl" title="The module\'s Lean, at this declaration">SOURCE ▸</button>' : ''}
      <pre>${esc(d.s)}</pre>
      ${rests ? `<p>Rests on the programme's own axioms:</p><ul>${rests}</ul>` : d.k === 'theorem' && !d.sorry ? '<p>Rests on no axiom of the programme (Lean\'s standard axioms only).</p>' : ''}
      ${cites ? `<p>Cited by (Sherlock's ledger):</p><ul>${cites}</ul>` : '<p>Not cited by any paper\'s affidavit.</p>'}
      ${canProve() ? `<button type="button" data-prove="1" title="Ask Lean now, on this machine: the statement and the axioms it rests on, from the kernel">PROVE ▸ ask Lean</button>
      <pre class="explorer__prove" hidden></pre>` : ''}`;
  }

  // PROVE (ISS-083, from ISS-071): only where a host can run Lean; the browser cannot. In the VS
  // Code extension the extension runs it; in a local browser (with Neovim, or on its own) the
  // MOTHER bridge does (POST /prove). Either way the kernel's answer comes back to the floor.
  const inVsCode = () => typeof window !== 'undefined' && window.SOMA_HOST === 'vscode' && typeof window.somaHostPost === 'function';
  const localPage = () => typeof location !== 'undefined' && /^(127\.0\.0\.1|localhost)$/.test(location.hostname);
  function canProve() { return inVsCode() || localPage(); }
  const bridgeUrl = () => { try { return (localStorage.getItem('mother-bridge-url') || 'http://127.0.0.1:8765').replace(/\/$/, ''); } catch { return 'http://127.0.0.1:8765'; } };
  const moduleOf = it => String(it?.title ?? '').replace(/\.lean$/, '');
  if (typeof window !== 'undefined') {
    addEventListener('message', event => {
      const m = event.data;
      if (!m || (m.type !== 'prove-out' && m.type !== 'prove-done') || m.name !== floorName) return;
      const out = panel.querySelector('.explorer__prove');
      if (!out) return;
      out.hidden = false;
      if (m.type === 'prove-out') out.textContent += m.text;
      else {
        out.textContent += m.code === 0 ? '\n✔ the kernel accepted it' : `\n✖ Lean exited with ${m.code}`;
        const b = panel.querySelector('[data-prove]');
        if (b) b.disabled = false;
      }
    });
  }

  function listView() {
    floorName = '';
    const decls = (item.decls ?? []).map((d, i) => ({ d, i })).sort((a, b) => (ORDER[a.d.k] ?? 2) - (ORDER[b.d.k] ?? 2) || a.i - b.i);
    const count = k => (item.decls ?? []).filter(k).length;
    const rows = decls.map(({ d, i }) => `<li><button type="button" data-floor="${i}" class="explorer__floor explorer__floor--${d.sorry ? 'sorry' : d.trivial ? 'trivial' : d.k}">${MARK(d)} ${esc(d.n)}</button></li>`).join('');
    return `<button type="button" data-tower="close" aria-label="Leave the tower">✕</button>
      <h3>${esc(item.title)}</h3>
      <p class="explorer__tower-kind">${esc(item.lines?.[0] ?? '')}</p>
      ${item.file ? '<button type="button" data-source="file" title="The module\'s Lean source, highlighted">SOURCE ▸</button>' : ''}
      ${item.decls ? `<p>${count(d => d.k === 'theorem')} theorems · ${count(d => d.k === 'def')} definitions · ${count(d => d.k === 'axiom')} axioms · ${count(d => d.sorry)} on sorry · ${count(d => d.trivial)} only True</p>
      <ol class="explorer__floors">${rows}</ol>` : `<ul>${(item.lines ?? []).filter(Boolean).map(l => `<li>${esc(l)}</li>`).join('')}</ul>`}`;
  }

  panel.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b) return;
    event.stopPropagation();
    if (b.dataset.source === 'file') showSource(item);
    else if (b.dataset.source === 'decl') showSource(item, floorName);
    else if (b.dataset.tower === 'close') api.close();
    else if (b.dataset.tower === 'back') body.innerHTML = listView();
    else if (b.dataset.floor) body.innerHTML = floorView(item.decls[Number(b.dataset.floor)]);
    else if (b.dataset.prove && canProve()) {
      b.disabled = true;
      const out = panel.querySelector('.explorer__prove');
      if (out) { out.hidden = false; out.textContent = 'asking Lean (one process; a big module takes a minute)…\n'; }
      const req = { module: moduleOf(item), name: floorName };
      if (inVsCode()) window.somaHostPost({ type: 'prove', ...req });
      else {
        const name = floorName;
        fetch(`${bridgeUrl()}/prove`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req) })
          .then(r => r.json())
          .then(res => {
            postMessage({ type: 'prove-out', name, text: res.output ?? res.error ?? '' }, '*');
            postMessage({ type: 'prove-done', name, code: res.code ?? 1 }, '*');
          })
          .catch(() => {
            postMessage({ type: 'prove-out', name, text: 'The MOTHER bridge is not running (make mother-bridge); it runs Lean on this machine.' }, '*');
            postMessage({ type: 'prove-done', name, code: 1 }, '*');
          });
      }
    }
  });

  const api = {
    get open() { return !panel.hidden; },
    get item() { return item; },
    get floor() { return floorName; },
    show(next, floor = null) {
      item = next;
      glyphs = [item.title, ...(item.decls ?? []).map(d => `${d.n} : ${d.s}`), ...(item.lines ?? [])].join(' ').replace(/\s+/g, ' ');
      drops = [];
      panel.hidden = false;
      const at = floor === null ? -1 : (item.decls ?? []).findIndex(d => d.n === floor);
      body.innerHTML = at >= 0 ? floorView(item.decls[at]) : listView();
      draw();
    },
    close() {
      panel.hidden = true;
      source.hidden = true;
      item = null;
      cancelAnimationFrame(raf);
    },
  };
  return api;
}
