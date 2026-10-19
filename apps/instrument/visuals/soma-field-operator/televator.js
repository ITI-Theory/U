// televator.js: the [T]-Elevator (ISS-121), one device for every move; "[T]" read as Theory and as Time.
// Author, 19 Oct 2026: "a generic device that looks like the elevator ... the tube up and down, a forward
// tube and maybe a worm tube; the fwd is stay at the same dimension, but move to mind; the graphics for
// fwd could include a vis of the next entrance; and a slider for time too ... and the moving map".
//   UP / DOWN  scale: the same thing, larger or smaller (the elevator's floors)
//   FORWARD    aspect: the same scale, another description; the next entrance shown in the tube before
//              the move (a hall's doorways, registry/hubs.yaml; else the floor's other readings)
//   WORM       analogy: no road, the same structure; only where a document claims it, with Sherlock's
//              MAC/FAC similarity and its share beyond the template (computed at build: generate.py)
//   TIME       the eras (registry/eras.yaml); an era has its level
// Every move is a declared transition (registry/televator.yaml `via`, registry/transitions.yaml) and tells
// the sound (`soma-transition`). The moving map: floors up the side, readings across, eras along the
// bottom, the wormholes as arcs. What each move means is labelled interpretive (THEORY-STATUS).

import { televator as TV, hubs as HUBS, eras as ERAS, levels as LEVELS } from './generated/app-data.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const LABEL = new Map((LEVELS ?? []).map(l => [l.id, l.label]));
const STOP_NAMES = { worlds: 'THE WORLDS', human: 'THE HUMAN', body: 'THE BODY', wayin: 'THE WAY IN', brain: 'THE BRAIN', limbic: 'THE LIMBIC SYSTEM',
  thought: 'THE MIND', neuron: 'THE NEURON', network: 'MEMORY', landscape: 'THE LANDSCAPE', dyad: 'THE DYAD', tunnel: 'THE WAY UP',
  ureter: 'THE URETER', flight: 'FLY', score: 'THE SCORE', cathedral: 'THE CATHEDRAL', palace: 'THE MIND PALACE', choices: 'THE COURSE',
  bloodstream: 'THE BLOODSTREAM' };
const ASPECTS = TV?.aspects?.length ? TV.aspects : [{ dim: 4, name: 'BODY' }, { dim: 8, name: 'FEELING' }, { dim: 11, name: 'MIND' }];
const MOVES = TV?.moves ?? {};
const placeName = p => (p?.level ? (LABEL.get(p.level) ?? p.level) : STOP_NAMES[p?.stop] ?? p?.stop ?? '').toUpperCase();

// The address a doorway leads to (the explorer is driven by the address; a click would be undone by it)
function routeAddress(hub, id) {
  if (id === 'cathedral') return { voyage: hub.stop, cave: '1' };
  if (id === 'palace') return { voyage: hub.stop, palace: '1' };
  if (id === 'choices') return { voyage: hub.stop, choices: '1' };
  if (id === 'bloodstream') return { voyage: 'score', kc: 'body' };
  return { voyage: id };
}

// The entrances FORWARD offers: inside a hall, its doorways; on a floor, its halls and their doorways;
// a floor without a hall, its other readings.
function entrances({ levelId, stop, inHall, dim, dims }) {
  const out = [];
  const seen = new Set();
  const add = e => { const k = JSON.stringify(e.address); if (!seen.has(k)) { seen.add(k); out.push(e); } };
  const hubs = Object.values(HUBS ?? {});
  const here = inHall ? hubs.filter(h => h.stop === stop) : hubs.filter(h => h.floor === levelId);
  if (!inHall) for (const h of here) add({ label: h.title.split('·')[0].trim(), sub: h.title.split('·')[1]?.trim() ?? h.sub, color: '#14e5ff', address: { level: h.floor, voyage: h.stop, hall: '1' } });
  for (const h of here) for (const r of h.routes ?? []) add({ label: r.label, sub: r.sub, color: r.color ?? '#14e5ff', address: { level: h.floor, ...routeAddress(h, r.id) } });
  if (!out.length) for (const a of ASPECTS) if (a.dim !== dim && dims.includes(a.dim)) out.push({ label: `${a.dim}D ${a.name}`, sub: a.say ?? '', color: '#ff7aa8', aspect: a.dim });
  return out;
}

// hooks: { context() -> {levelId, floors:[ids], index, dim, dims:[4,8,11 available], eraId, stop, inHall},
//          step(delta), go(address), aspect(dim), era(era), via(viaText, apply) }
export function createTelevator(hooks) {
  const el = document.createElement('section');
  el.className = 'televator';
  el.setAttribute('aria-label', 'The [T]-Elevator: every move from here');
  el.innerHTML = `
    <header class="televator__head" title="${esc(TV?.floorsNote ?? '')}"><span class="televator__where"></span></header>
    <div class="televator__pad">
      <button type="button" data-move="up">▲ ${esc(MOVES.up?.label ?? 'UP')}</button>
      <button type="button" data-move="forward">▶ ${esc(MOVES.forward?.label ?? 'FORWARD')}</button>
      <button type="button" data-move="worm">◎ ${esc(MOVES.worm?.label ?? 'WORM')}</button>
      <button type="button" data-move="down">▼ ${esc(MOVES.down?.label ?? 'DOWN')}</button>
    </div>
    <div class="televator__view" aria-live="polite"></div>
    <label class="televator__time"><span>${esc(MOVES.time?.label ?? 'TIME')}</span>
      <input type="range" min="0" max="${Math.max(0, (ERAS?.length ?? 1) - 1)}" step="1" value="0" aria-label="Time: the eras">
      <output></output></label>
    <svg class="televator__map" viewBox="0 0 240 190" role="img" aria-label="The moving map: floors up the side, readings across, eras along the bottom"></svg>`;
  const where = el.querySelector('.televator__where');
  const view = el.querySelector('.televator__view');
  const slider = el.querySelector('.televator__time input');
  const sliderOut = el.querySelector('.televator__time output');
  const map = el.querySelector('.televator__map');
  let mode = null;            // null | 'forward' | 'worm'
  let pick = 0;               // the entrance shown in the tube
  let key = '';

  const ctx = () => hooks.context();
  const announce = (move, viaText, address) => {
    const m = /^([a-z]+)(?:\s+(\d+(?:\.\d+)?)s)?(?:\s+on\s+([a-z]+))?/.exec(viaText ?? '') ?? [];
    dispatchEvent(new CustomEvent('soma-transition', { detail: { kind: m[1] ?? 'cut', seconds: Number(m[2] ?? 0), sync: m[3] ?? 'now', style: null, view: address ? new URLSearchParams(address).toString() : '', from: 'televator', move } }));
  };
  const move = (name, apply, address) => {
    const via = MOVES[name]?.via ?? 'cut';
    announce(name, via, address);
    hooks.via(via, apply);
  };

  function explain(name, folded = false) {
    const m = MOVES[name];
    if (!m) return '';
    const why = `<i>${esc(m.philosophy)}</i> <span class="televator__badge">${esc(String(m.label_status ?? 'interpretive').toUpperCase())}</span>`;
    return `<p class="televator__say"><b>${esc(m.label)}</b> · ${esc(m.say)}</p>`
      + (folded ? `<details class="televator__why"><summary>WHAT IT MEANS</summary>${why}</details>` : `<p class="televator__why">${why}</p>`);
  }

  function worms(c) {
    const here = (c.stop ? TV?.worms?.[`stop:${c.stop}`] ?? [] : []).concat(TV?.worms?.[`level:${c.levelId}`] ?? []);
    const by = new Map();
    for (const w of here) {
      const k = w.to.level ? `level:${w.to.level}` : `stop:${w.to.stop}`;
      if (!by.has(k)) by.set(k, { to: w.to, claims: [] });
      by.get(k).claims.push(w);
    }
    return [...by.values()].sort((a, b) => Math.max(...b.claims.map(x => x.beyond)) - Math.max(...a.claims.map(x => x.beyond)));
  }

  function render() {
    const c = ctx();
    const ents = entrances(c);
    pick = Math.min(pick, Math.max(0, ents.length - 1));
    const era = ERAS?.find(e => e.id === c.eraId);
    where.textContent = `FLOOR ${c.index + 1}/${c.floors.length} ${placeName({ level: c.levelId })}${c.stop ? ` · ${STOP_NAMES[c.stop] ?? c.stop.toUpperCase()}` : ''} · ${c.dim}D${era ? ` · ${era.label}` : ''}`;
    for (const b of el.querySelectorAll('[data-move]')) {
      b.classList.toggle('active', b.dataset.move === mode);
      if (b.dataset.move === 'up') b.disabled = c.index >= c.floors.length - 1;
      if (b.dataset.move === 'down') b.disabled = c.index <= 0;
      if (b.dataset.move === 'forward') b.disabled = !ents.length;
    }
    if (mode === 'forward' && ents.length) {
      const e = ents[pick];
      view.innerHTML = `
        <div class="televator__tube" style="--tube:${esc(e.color)}" aria-hidden="true"><span>${esc(e.label)}</span></div>
        <p class="televator__next"><b>NEXT ENTRANCE ${pick + 1}/${ents.length}</b> · ${esc(e.label)}</p>
        <p class="televator__sub">${esc(e.sub)}</p>
        <div class="televator__row"><button type="button" data-cycle="-1">◂</button><button type="button" data-cycle="1">▸</button>
          <button type="button" class="televator__go" data-go="forward">GO ▶</button></div>
        ${explain('forward', true)}`;
    } else if (mode === 'worm') {
      const list = worms(c);
      view.innerHTML = list.length
        ? `<ol class="televator__worms">${list.map((w, i) => {
            const best = w.claims.reduce((a, b) => (b.beyond > a.beyond ? b : a));
            return `<li><button type="button" class="televator__go" data-worm="${i}">◎ ${esc(placeName(w.to))}</button>
              <span class="televator__bars"><i style="--v:${best.similarity}" title="similarity: the structure as written, both directions">SIMILARITY ${best.similarity.toFixed(2)}</i><i style="--v:${best.beyond}" class="beyond" title="beyond the template: what they share besides the one equation every floor obeys">BEYOND ${best.beyond.toFixed(2)}</i></span>
              ${w.claims.map(x => `<q title="${esc(x.test)}">${esc(x.quote)}</q> <small>${esc(x.document)}, line ${x.line}</small>`).join('<br>')}</li>`;
          }).join('')}</ol><p class="televator__sub">Sherlock's MAC/FAC on the documents' own sameness claims; the extraction is interpretive, each fact cites its line.</p>${explain('worm', true)}`
        : `<p class="televator__sub">No document claims this place shares its structure with another: no wormhole here.</p>${explain('worm')}`;
      view.dataset.worms = JSON.stringify(list.map(w => w.to));
    } else {
      view.innerHTML = `<p class="televator__sub">Four moves and a clock: UP and DOWN change the scale, FORWARD the description, WORM jumps where a document claims the same structure, TIME moves through the eras.</p>`;
    }
    drawMap(c);
  }

  function drawMap(c) {
    const n = c.floors.length;
    const top = 8, bottom = 150, left = 92;
    const colX = d => left + 30 + ASPECTS.findIndex(a => a.dim === d) * 52;
    const rowY = i => bottom - (n <= 1 ? 0 : (i / (n - 1)) * (bottom - top));
    const parts = [];
    ASPECTS.forEach(a => parts.push(`<text x="${colX(a.dim)}" y="${bottom + 12}" class="col">${esc(a.name)}</text><line x1="${colX(a.dim)}" y1="${top}" x2="${colX(a.dim)}" y2="${bottom}" class="shaft"/>`));
    c.floors.forEach((id, i) => {
      const y = rowY(i);
      parts.push(`<line x1="${left + 14}" y1="${y}" x2="${colX(11) + 10}" y2="${y}" class="floor${i === c.index ? ' here' : ''}"/>`);
      const gap = (bottom - top) / Math.max(1, n - 1);
      const every = Math.max(1, Math.ceil(11 / gap));
      if (i === c.index || (i % every === 0 && Math.abs(i - c.index) * gap >= 11)) parts.push(`<text x="${left + 10}" y="${y + 3}" class="lbl${i === c.index ? ' here' : ''}">${esc(placeName({ level: id }).slice(0, 18))}</text>`);
    });
    const atStop = c.stop ? TV?.mapStops?.[c.stop] : null;
    const hereRow = atStop && c.floors.includes(atStop.level) ? c.floors.indexOf(atStop.level) : c.index;
    const hereX = colX(atStop ? atStop.dim : c.dim);
    for (const w of worms(c)) {
      const at = w.to.level ? { level: w.to.level, dim: 4 } : TV?.mapStops?.[w.to.stop];
      if (!at || !c.floors.includes(at.level)) continue;
      const best = Math.max(...w.claims.map(x => x.beyond));
      const y2 = rowY(c.floors.indexOf(at.level));
      const x2 = colX(at.dim);
      const bulge = Math.max(hereX, x2) + 30 + Math.abs(rowY(hereRow) - y2) * 0.25;
      parts.push(`<path d="M${hereX} ${rowY(hereRow)} Q ${bulge} ${(rowY(hereRow) + y2) / 2} ${x2} ${y2}" class="worm" style="opacity:${0.35 + 0.65 * best}"/>`);
    }
    if (mode === 'forward') parts.push(`<path d="M${hereX + 6} ${rowY(hereRow)} l14 0 m-5 -4 l5 4 l-5 4" class="fwd"/>`);
    parts.push(`<circle cx="${hereX}" cy="${rowY(hereRow)}" r="7" class="halo"/><circle cx="${hereX}" cy="${rowY(hereRow)}" r="3.5" class="car"/>`);
    // the clock along the bottom: every era a tick, the one in force lit
    const m = ERAS?.length ?? 0;
    ERAS?.forEach((e, k) => {
      const x = 8 + (m <= 1 ? 0 : (k / (m - 1)) * 224);
      parts.push(`<line x1="${x}" y1="176" x2="${x}" y2="${e.id === c.eraId ? 168 : 173}" class="era${e.id === c.eraId ? ' here' : ''}"><title>${esc(e.label)} · ${esc(e.time?.display ?? '')}</title></line>`);
    });
    parts.push(`<text x="8" y="188" class="col">TIME</text>`);
    map.innerHTML = parts.join('');
  }

  el.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b) return;
    const c = ctx();
    if (b.dataset.move === 'up' || b.dataset.move === 'down') {
      const d = b.dataset.move === 'up' ? 1 : -1;
      move(b.dataset.move, () => hooks.step(d), { level: c.floors[c.index + d] ?? '' });
      mode = null;
    } else if (b.dataset.move === 'forward' || b.dataset.move === 'worm') {
      if (mode === b.dataset.move && mode === 'forward') return void el.querySelector('[data-go="forward"]')?.click();
      mode = mode === b.dataset.move ? null : b.dataset.move;
      pick = 0;
    } else if (b.dataset.cycle) {
      const n = entrances(c).length;
      pick = (pick + Number(b.dataset.cycle) + n) % Math.max(1, n);
    } else if (b.dataset.go === 'forward') {
      const e = entrances(c)[pick];
      if (!e) return;
      if (e.aspect) move('forward', () => hooks.aspect(e.aspect), { dim: String(e.aspect) });
      else move('forward', () => hooks.go(e.address), e.address);
      mode = null;
    } else if (b.dataset.worm !== undefined) {
      const to = JSON.parse(view.dataset.worms || '[]')[Number(b.dataset.worm)];
      if (!to) return;
      const address = to.level ? { level: to.level } : { voyage: to.stop };
      move('worm', () => hooks.go(address), address);
      mode = null;
    }
    key = '';
    render();
  });
  el.addEventListener('mouseover', event => {
    const b = event.target.closest('[data-move]');
    if (b && !mode) view.innerHTML = explain(b.dataset.move);
  });
  slider.addEventListener('input', () => {
    const e = ERAS?.[Number(slider.value)];
    sliderOut.textContent = e ? `${e.label} · ${e.time?.display ?? ''}` : '';
  });
  slider.addEventListener('change', () => {
    const e = ERAS?.[Number(slider.value)];
    if (e) move('time', () => hooks.era(e), { era: e.id });
  });

  // called often (the app's loop): redraw only when where you are has changed
  function update() {
    const c = ctx();
    const k = [c.levelId, c.index, c.dim, c.eraId, c.stop, c.inHall, mode, pick].join('|');
    if (k === key) return;
    key = k;
    const ei = ERAS?.findIndex(e => e.id === c.eraId) ?? -1;
    if (ei >= 0 && document.activeElement !== slider) {
      slider.value = String(ei);
      sliderOut.textContent = `${ERAS[ei].label} · ${ERAS[ei].time?.display ?? ''}`;
    } else if (ei < 0 && document.activeElement !== slider) sliderOut.textContent = 'no era chosen';
    render();
  }

  return { element: el, update };
}
