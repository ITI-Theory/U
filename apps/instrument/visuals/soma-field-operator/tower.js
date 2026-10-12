// tower.js: walk into a tower of the city of code (ISS-071). A panel over the landscape:
// the module's own text falls behind it as code rain (our neon palette), and a floor list,
// foundations first; a floor opens its declaration: the statement, what it rests on, the
// papers that cite it (Sherlock's ledger), kernel-checked at the export's commit.

const MARK = d => (d.sorry ? '✗' : d.k === 'axiom' ? '◆' : d.trivial ? '∘' : d.k === 'theorem' ? '✓' : '=');
const KIND = d => (d.sorry ? 'rests on sorry' : d.k === 'axiom' ? 'axiom (assumed, not proved)' : d.trivial ? 'proves only True (a placeholder)' : d.k === 'theorem' ? 'theorem, kernel-checked' : d.k);
const ORDER = { axiom: 0, inductive: 1, opaque: 1, def: 2, theorem: 3 };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export function createTowerPanel(root) {
  const panel = document.createElement('aside');
  panel.className = 'explorer__tower';
  panel.hidden = true;
  panel.innerHTML = '<canvas class="explorer__rain" aria-hidden="true"></canvas><div class="explorer__tower-body"></div>';
  root.append(panel);
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
      <pre>${esc(d.s)}</pre>
      ${rests ? `<p>Rests on the programme's own axioms:</p><ul>${rests}</ul>` : d.k === 'theorem' && !d.sorry ? '<p>Rests on no axiom of the programme (Lean\'s standard axioms only).</p>' : ''}
      ${cites ? `<p>Cited by (Sherlock's ledger):</p><ul>${cites}</ul>` : '<p>Not cited by any paper\'s affidavit.</p>'}`;
  }

  function listView() {
    floorName = '';
    const decls = (item.decls ?? []).map((d, i) => ({ d, i })).sort((a, b) => (ORDER[a.d.k] ?? 2) - (ORDER[b.d.k] ?? 2) || a.i - b.i);
    const count = k => (item.decls ?? []).filter(k).length;
    const rows = decls.map(({ d, i }) => `<li><button type="button" data-floor="${i}" class="explorer__floor explorer__floor--${d.sorry ? 'sorry' : d.trivial ? 'trivial' : d.k}">${MARK(d)} ${esc(d.n)}</button></li>`).join('');
    return `<button type="button" data-tower="close" aria-label="Leave the tower">✕</button>
      <h3>${esc(item.title)}</h3>
      <p class="explorer__tower-kind">${esc(item.lines?.[0] ?? '')}</p>
      ${item.decls ? `<p>${count(d => d.k === 'theorem')} theorems · ${count(d => d.k === 'def')} definitions · ${count(d => d.k === 'axiom')} axioms · ${count(d => d.sorry)} on sorry · ${count(d => d.trivial)} only True</p>
      <ol class="explorer__floors">${rows}</ol>` : `<ul>${(item.lines ?? []).filter(Boolean).map(l => `<li>${esc(l)}</li>`).join('')}</ul>`}`;
  }

  panel.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b) return;
    event.stopPropagation();
    if (b.dataset.tower === 'close') api.close();
    else if (b.dataset.tower === 'back') body.innerHTML = listView();
    else if (b.dataset.floor) body.innerHTML = floorView(item.decls[Number(b.dataset.floor)]);
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
      item = null;
      cancelAnimationFrame(raf);
    },
  };
  return api;
}
