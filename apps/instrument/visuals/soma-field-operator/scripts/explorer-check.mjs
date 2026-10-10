// explorer-check.mjs: checks the mind explorer's two simulations (explorer.js, ISS-052)
// tell the story the tour tells, many times over with fresh noise:
//   1. calm (Phi 0.1): a state in FREEZE stays in FREEZE, and a weak poke rolls back;
//   2. hot with a resource (Phi 0.8 network, 0.65 landscape, RESOURCE on), then cool
//      with the resource still on: the state ends in SAFE;
//   3. the resource alone, while calm, does not free the state;
//   4. without the resource, heat and cooling move the state, but not reliably to SAFE;
//   5. the dyad: calm in step, hot drifting, hot with the resource attuned, faster repair;
//   6. The Tensor's knobs: mask, coupling and depth act as the paper says;
//   7. FLY into the Mandelbulb: every dive finds the surface, and the camera stays outside
//      it (as the shader sees it, detail growing with depth) all the way to zoom x40,000.
// Usage: node scripts/explorer-check.mjs [runs]. Exit 1 if a rate is below its bound.

import { simulation as sim } from '../explorer.js';
import { createScorePlayer } from '../score.js';
import { diveMath } from '../flight3d.js';
import { readFileSync } from 'node:fs';

// the River Film score, parsed by hand from its keyframes (no YAML parser in the check)
const scoreText = readFileSync(new URL('../../../../../registry/scores/river-film.yaml', import.meta.url), 'utf8');
const keyframes = [...scoreText.matchAll(/^- \[([\d.]+), \[([^\]]+)\]\]/gm)].map(m => [Number(m[1]), m[2].split(',').map(Number)]);
const river = { minutes: 90, keyframes, thresholds: [{ id: 'T1', t: 0.52 }, { id: 'T2', t: 0.74 }], defaults: { kappa_d: 0.7 } };
// seconds from story-time start until the player passes `until`, under a heart signal
function scoreRun({ start, until, kr, bpm, hdot }) {
  const p = createScorePlayer(river, { kappaV: 3, start });
  let s = 0;
  while (p.t < until && s < 4000) { p.step(0.1, { kr, bpm, hdot }); s += 0.1; }
  return { s, held: p.holding !== null };
}

const runs = Number(process.argv[2] ?? 100);
const DT = 1 / 60;

function network(steps) {
  const x = Float32Array.from(sim.PATTERNS[2]);
  let w = [0, 0, 1];
  for (const [phi, resource, seconds] of steps) {
    for (let t = 0; t < seconds; t += DT) for (let s = 0; s < 3; s++) w = sim.memoryStep(x, phi, resource, DT / 3);
  }
  return sim.MEMORY_NAMES[w.indexOf(Math.max(...w))];
}

function landscape(steps, kick = 0) {
  const p = { x: sim.WELLS[2][0] * 0.95, y: sim.WELLS[2][1] * 0.95 };
  if (kick) {
    const a = Math.random() * 2 * Math.PI;
    p.x += Math.cos(a) * 0.6 * kick;
    p.y += Math.sin(a) * 0.6 * kick;
  }
  for (const [phi, resource, seconds] of steps) for (let t = 0; t < seconds; t += DT) sim.landscapeStep(p, phi, resource, DT);
  const d = sim.WELLS.map(([a, b]) => Math.hypot(p.x - a, p.y - b));
  return sim.MEMORY_NAMES[d.indexOf(Math.min(...d))];
}

// the dyad: mean sync r over the last 6 s, and the time to repair after a rupture
function dyad(steps, kick = false) {
  const s = { a: 0, b: 0.3 + (kick ? Math.PI : 0) };
  let sum = 0, n = 0, t = 0, total = steps.reduce((acc, step) => acc + step[2], 0), repaired = null;
  for (const [phi, resource, seconds] of steps) {
    for (let k = 0; k < seconds; k += DT, t += DT) {
      const r = sim.dyadStep(s, phi, resource, DT);
      if (t > total - 6) { sum += r; n++; }
      if (kick && repaired === null && r > 0.95) repaired = t;
    }
  }
  return { r: sum / n, repaired: repaired ?? Infinity };
}
const mean = (fn, key) => { let s = 0; for (let i = 0; i < runs; i++) s += fn()[key]; return s / runs; };
// median: a repair time can be Infinity when a run never re-syncs in the window
const median = (fn, key) => { const v = Array.from({ length: runs }, () => fn()[key]).sort((x, y) => x - y); return v[Math.floor(v.length / 2)]; };

function rate(fn, want) {
  let hits = 0;
  for (let i = 0; i < runs; i++) if (fn() === want) hits++;
  return hits / runs;
}

// FLY: follow dives as flight3d.js does (back along the line of sight, at the dive's
// detail); the smallest clearance DE(camera) / distance on the way must stay positive
function dives(n) {
  const rand = diveMath.seeded(23);
  let found = 0, worst = Infinity;
  for (let i = 0; i < n; i++) {
    const d0 = diveMath.newDive(rand, (i % 5) / 4, i * 7.3);
    if (!d0) continue;
    found++;
    const { p, v, power, morph } = d0;
    for (let d = d0.d; d > diveMath.DIVE_END; d *= 0.85) {
      const c = [0, 1, 2].map(k => p[k] - d * v[k]);
      worst = Math.min(worst, diveMath.bulbDE(...c, power, morph, diveMath.iters()) / d);
    }
  }
  return { found: found / n, worst };
}
const diveRun = dives(24);

// The Tensor's knobs at the fear peak (t = 0.5): the modes as the player renders them
const river2 = { ...river, coupling: [{ from: 'F', to: 'A', weight: 0.4 }, { from: 'A', to: 'G', weight: 0.3 }, { from: 'L', to: 'PV', weight: -0.6 }, { from: 'PV', to: 'L', weight: -0.6 }] };
const knob = opts => createScorePlayer(river2, { start: 0.5, ...opts }).modes();
const holdTime = kappaD => {
  const p = createScorePlayer(river, { kappaV: 3, start: 0.515, kappaD });
  let s = 0, wasHeld = 0;
  while (p.t < 0.53 && s < 400) { p.step(0.1, { kr: 0 }); s += 0.1; if (p.holding) wasHeld += 0.1; }
  return wasHeld;
};

// Durations follow the tour (registry/tours/mind-explorer.yaml): about 15 s per stop.
const checks = [
  // [name, rate, lowest allowed, highest allowed]
  ['network: calm keeps FREEZE', rate(() => network([[0.1, false, 20]]), 'freeze'), 0.99],
  ['network: calm with the resource still keeps FREEZE', rate(() => network([[0.1, true, 30]]), 'freeze'), 0.9],
  ['network: hot + resource, then cool: SAFE', rate(() => network([[0.8, true, 15], [0.1, true, 15]]), 'safe'), 0.95],
  ['network: hot, then cool, no resource: leaves FREEZE', rate(() => network([[0.8, false, 15], [0.1, false, 15]]), 'freeze'), 0, 0.5],
  ['network: hot, then cool, no resource: SAFE not certain', rate(() => network([[0.8, false, 15], [0.1, false, 15]]), 'safe'), 0, 0.8],
  ['landscape: calm keeps FREEZE', rate(() => landscape([[0.1, false, 20]]), 'freeze'), 0.99],
  ['landscape: calm with the resource still keeps FREEZE', rate(() => landscape([[0.1, true, 30]]), 'freeze'), 0.95],
  ['landscape: weak poke rolls back', rate(() => landscape([[0.1, false, 15]], 0.2), 'freeze'), 0.95],
  ['landscape: hot + resource, then cool: SAFE', rate(() => landscape([[0.65, true, 15], [0.1, true, 15]]), 'safe'), 0.95],
  ['landscape: hot, then cool, no resource: SAFE not certain', rate(() => landscape([[0.65, false, 15], [0.1, false, 15]]), 'safe'), 0, 0.6],
  ['dyad: calm, the two stay in step (mean sync r)', mean(() => dyad([[0.1, false, 20]]), 'r'), 0.9],
  ['dyad: hot, they drift apart (mean sync r)', mean(() => dyad([[0.7, false, 20]]), 'r'), 0, 0.8],
  ['dyad: hot with the resource, attuned again (mean sync r)', mean(() => dyad([[0.7, true, 20]]), 'r'), 0.9],
  ['dyad: after a rupture the resource repairs faster (median calm s / resource s >= 1.3)', median(() => dyad([[0.1, false, 12]], true), 'repaired') / median(() => dyad([[0.1, true, 12]], true), 'repaired') / 1.3, 1, Infinity],
  // The Tensor's somatic loop (score.js): a rising heart slows the film; at a threshold the
  // projection waits on a timer, the loop waits for the heart; a settled heart crosses
  ['score: projection crosses T1 on its timer, whatever the heart (s: 9 to reach, 11 held, 18 after)', scoreRun({ start: 0.515, until: 0.53, kr: 0, bpm: 110, hdot: 1 }).s, 35, 42],
  ['score: resonance with a racing, rising heart is still holding at T1 after 400 s', Number(scoreRun({ start: 0.515, until: 0.53, kr: 0.5, bpm: 120, hdot: 1 }).held), 1, 1],
  ['score: resonance with a settled heart crosses T1 (s)', scoreRun({ start: 0.515, until: 0.53, kr: 0.5, bpm: 72, hdot: -0.1 }).s, 2, 40],
  ['score: a rising heart slows the film (s for 0.02 of story, rising / steady >= 2)', scoreRun({ start: 0.2, until: 0.22, kr: 1, bpm: 90, hdot: 1 }).s / scoreRun({ start: 0.2, until: 0.22, kr: 1, bpm: 90, hdot: 0 }).s / 2, 1, Infinity],
  // The Tensor's knobs (score.js shape)
  ['knobs: masked modes are 0 (km=S,F)', Number(['C', 'A', 'G', 'L', 'PV'].every(id => knob({ mask: ['S', 'F'] })[id] === 0) && knob({ mask: ['S', 'F'] }).F > 0), 1, 1],
  ['knobs: more coupling, more awe from fear (A at kw 2 minus kw 0.5)', knob({ kappaW: 2 }).A - knob({ kappaW: 0.5 }).A, 0.2, 1],
  ['knobs: depth 0 is shallower than depth 1 (PV)', knob({ kappaD: 1 }).PV - knob({ kappaD: 0 }).PV, 0.1, 1],
  ['knobs: depth sets the hold at a threshold without the loop (s at kd 1 / kd 0 >= 2)', holdTime(1) / holdTime(0) / 2, 1, Infinity],
  // FLY into the Mandelbulb (flight3d.js)
  ['fly: every dive finds the surface', diveRun.found, 1],
  ['fly: the camera stays outside the fractal on every dive (min DE / distance > 0)', diveRun.worst, 1e-6, Infinity],
];
let failed = 0;
for (const [name, value, min, max = 1] of checks) {
  const ok = value >= min && value <= max;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}: ${value <= 1 ? `${(value * 100).toFixed(0)}%` : value.toFixed(2)} of ${runs}`);
}
process.exit(failed ? 1 : 0);
