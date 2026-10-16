// whereami.js: WHEREAMI (ISS-110, author 16 Oct: "a moving map ... whereami in bash: time, place,
// scale, body part"). A small terminal readout, live: the time, the place (the stop and the place
// in it), the scale (the floor of the zoom and its length), the part of the body, the layer and
// the field. Read from the address, so it is the same in every view. Click the prompt to fold it.

import { levels, models } from './generated/app-data.js';

const LEVEL = new Map(levels.map(l => [l.id, l]));
const FLOORS = (models.find(m => m.id === 'universal-21')?.levels ?? []).map(x => x.level);
const STOP = { worlds: 'THE WORLDS', human: 'HUMAN', body: 'BODY', wayin: 'WAY IN', brain: 'BRAIN', limbic: 'LIMBIC', thought: 'THOUGHT', neuron: 'NEURON', network: 'MEMORY', landscape: 'LANDSCAPE', dyad: 'DYAD', tunnel: 'WAY UP', ureter: 'URETER', flight: 'FLY', score: 'SCORE' };
const BODY = {
  worlds: 'everywhere: the map', human: 'the whole body', body: 'the chest: the heart', wayin: 'the arteries: heart to head',
  brain: 'the head: the brain', limbic: 'the head: the limbic hinge', thought: 'the head: the cortex', neuron: 'the head: one cell',
  network: 'the head: a network of cells', landscape: 'the head: the field of feeling', dyad: 'two bodies', tunnel: 'the spine: body to cortex',
  ureter: 'the abdomen: the kidney and the ureter', flight: 'none: the scales', score: 'the whole body, over time',
};
const PLACE = (stop, p) => {
  if (p.get('hall') === '1') return { brain: 'GREAT HALL', body: 'THE HEART', neuron: 'THE SOMA', thought: 'MIND CHAMBER' }[stop] ?? '';
  if (stop === 'brain' && p.get('cave') === '1') return 'CATHEDRAL';
  if (stop === 'brain' && p.get('palace') === '1') return `PALACE${p.get('pf') ? `, FLOOR ${p.get('pf')}` : ''}`;
  if (stop === 'thought' && p.get('choices') === '1') return 'THE COURSE';
  if (stop === 'landscape' && p.get('golf') === '1') return 'MINI GOLF';
  return '';
};

export function createWhereAmI() {
  const el = document.createElement('section');
  el.className = 'whereami';
  el.setAttribute('aria-label', 'Where am I');
  el.innerHTML = '<button type="button" class="whereami__prompt">$ whereami</button><pre class="whereami__out"></pre>';
  document.body.append(el);
  const out = el.querySelector('.whereami__out');
  const read = () => { try { return localStorage.getItem('soma-whereami'); } catch { return null; } };
  el.classList.toggle('whereami--folded', read() === 'folded');
  el.querySelector('.whereami__prompt').addEventListener('click', () => {
    const folded = !el.classList.contains('whereami--folded');
    el.classList.toggle('whereami--folded', folded);
    try { localStorage.setItem('soma-whereami', folded ? 'folded' : 'open'); } catch { /* private mode */ }
  });
  const pad = s => s.padEnd(6);
  function update() {
    const p = new URLSearchParams(location.hash.slice(1));
    const stop = p.get('voyage');
    const lv = LEVEL.get(p.get('level'));
    const k = FLOORS.indexOf(p.get('level'));
    const t = new Date();
    const place = stop ? [STOP[stop] ?? stop.toUpperCase(), PLACE(stop, p)].filter(Boolean).join(' › ') : 'THE LEVEL VIEW';
    const lines = [
      `${pad('time')} ${t.toTimeString().slice(0, 8)}`,
      `${pad('place')} ${place}`,
      `${pad('scale')} ${k >= 0 ? `FLOOR ${k + 1} · ` : ''}${String(lv?.label ?? '?').toUpperCase()}${lv?.length_scale ? ` · ${lv.length_scale}` : ''}`,
      `${pad('body')} ${stop ? BODY[stop] ?? '' : (lv?.sector === 'organismal' ? 'the whole body' : 'beyond the body')}`,
      `${pad('layer')} ${p.get('dim') ?? '11'}D${p.get('phi') ? ` · Φ ${Number(p.get('phi')).toFixed(2)}` : ''}`,
    ];
    out.textContent = lines.join('\n');
  }
  update();
  addEventListener('hashchange', update);
  setInterval(update, 1000);
  return { el, update };
}
