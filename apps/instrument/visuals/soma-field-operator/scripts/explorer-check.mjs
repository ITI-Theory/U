// explorer-check.mjs: checks the mind explorer's two simulations (explorer.js, ISS-052)
// tell the story the tour tells, many times over with fresh noise:
//   1. calm (Phi 0.1): a state in FREEZE stays in FREEZE, and a weak poke rolls back;
//   2. hot with a resource (Phi 0.8 network, 0.65 landscape, RESOURCE on), then cool
//      with the resource still on: the state ends in SAFE;
//   3. the resource alone, while calm, does not free the state;
//   4. without the resource, heat and cooling move the state, but not reliably to SAFE;
//   5. the dyad: calm in step, hot drifting, hot with the resource attuned, faster repair.
// Usage: node scripts/explorer-check.mjs [runs]. Exit 1 if a rate is below its bound.

import { simulation as sim } from '../explorer.js';

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

function rate(fn, want) {
  let hits = 0;
  for (let i = 0; i < runs; i++) if (fn() === want) hits++;
  return hits / runs;
}

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
  ['dyad: after a rupture the resource repairs faster (calm s / resource s >= 1.3)', mean(() => dyad([[0.1, false, 12]], true), 'repaired') / mean(() => dyad([[0.1, true, 12]], true), 'repaired') / 1.3, 1, 99],
];
let failed = 0;
for (const [name, value, min, max = 1] of checks) {
  const ok = value >= min && value <= max;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}: ${value <= 1 ? `${(value * 100).toFixed(0)}%` : value.toFixed(2)} of ${runs}`);
}
process.exit(failed ? 1 : 0);
