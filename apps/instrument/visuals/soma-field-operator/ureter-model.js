// ureter-model.js: the stone in the ureter as a process, not a point (ISS-076, ISS-077). The
// urine keeps coming from the kidney; with the stone in the way it backs up, the tube above
// swells, and the muscle answers with stronger, more frequent waves (peristalsis) that crash
// into the stone: each crash is a spasm, a spike of pain, and the pain comes in waves (colic).
// Four stages, as the author lived them:
//   1 THE STONE   blocked: swelling and the waves
//   2 THE STENT   a double-J stent is slipped past the stone: the urine drains, the swelling
//                 falls, the waves quieten (a stent damps peristalsis); over days it stretches
//                 the ureter wider; its curled ends irritate the kidney and the bladder, and
//                 when the bladder empties urine refluxes up it into the kidney (a flank pain)
//   3 THE LASER   under anaesthetic: the ureteroscope comes up the widened ureter, the laser
//                 breaks the stone (POKE); the signal is there, it is not felt
//   4 STENT OUT   the stent is pulled out: a last spasm, then the waves pass freely
// A teaching picture with compressed time (days become seconds), not a clinical model.
// Positions along the tract: x = 0 at the kidney, 1 at the bladder; the stone at XS.

export const XS = 0.55;
export const URETER_STAGES = [
  { id: 'stone', title: 'THE STONE', line: 'The stone blocks the ureter. Urine backs up, the tube above it swells, and the muscle squeezes harder and more often to push it on: each wave that crashes into the stone is a spasm, a spike of pain. The pain comes in waves: colic.', poke: 'POKE: a drink, more urine, another wave' },
  { id: 'stent', title: 'THE STENT', line: 'A stent, a thin tube curled at both ends (a double-J), is slipped past the stone. The urine drains through it, the swelling falls, the waves quieten. Over days it stretches the ureter wider for the laser. Its curled ends irritate the kidney and the bladder; when the bladder empties, urine runs back up it into the kidney: a pain in the flank.', poke: 'POKE: a drink, another wave' },
  { id: 'laser', title: 'THE LASER', line: 'Under anaesthetic, the scope comes up the widened ureter and the laser breaks the stone to dust. The nerves still signal; the anaesthetic means it is not felt.', poke: 'POKE: the laser' },
  { id: 'free', title: 'STENT OUT', line: 'The stent is pulled out: a sharp pull, a last spasm. Then the waves pass freely to the bladder and the pain settles.', poke: 'POKE: a drink, a wave that passes' },
];

export function createUreterModel() {
  let stage = 0;
  let stone = 3;          // the stone's size, 3 whole .. 0 dust
  let stent = false;
  let dilation = 0;       // the stent's stretching of the ureter, 0 .. 1 (days, compressed)
  let Pu = 0.3;           // pressure above the stone, in units of its calm value (about 0.13)
  let spasm = 0;          // the muscle clamping on the stone, 0 .. 1
  let reflux = 0;         // flank pain from urine running up the stent
  let event = 0;          // a procedure's own pain: the insertion, the removal
  let time = 0;
  let nextWave = 1.5;
  let nextVoid = 18;
  let traceClock = 0;
  const waves = [];       // peristaltic contractions: { x, depth }
  const trace = [];       // [perceived pain, distension] every 0.25 s, the last 60 s
  const rings = [];       // pain rings for the outside view: { x, age, strength, kind }
  let pain = 0;
  let raw = 0;

  const conductance = () => (stone > 0 ? [0.05, 0.25, 0.5][3 - stone] : 1) + (stent ? 0.8 : 0);
  const distension = () => 1 - Math.exp(-Pu);
  const ring = (x, strength, kind = 'stone') => { if (strength > 0.08) rings.push({ x, age: 0, strength, kind }); };

  const api = {
    get stage() { return stage; },
    get stone() { return stone; },
    get stent() { return stent; },
    get dilation() { return dilation; },
    get distension() { return distension(); },
    get spasm() { return spasm; },
    get pain() { return pain; },
    get raw() { return raw; },
    get waves() { return waves; },
    get trace() { return trace; },
    get rings() { return rings; },
    get time() { return time; },

    setStage(next) {
      next = Math.max(0, Math.min(URETER_STAGES.length - 1, next | 0));
      if (next === stage) return;
      if (next === 0) { stone = 3; stent = false; dilation = 0; Pu = 0.3; event = 0; }
      if (next === 1) { stent = true; event = 0.55; ring(0.02, 0.5, 'end'); ring(0.98, 0.5, 'end'); }
      if (next === 2) { stent = true; dilation = Math.max(dilation, 0.85); }
      if (next === 3) { stone = 0; stent = false; event = 0.6; spasm = Math.max(spasm, 0.5); ring(0.98, 0.6, 'end'); }
      stage = next;
    },

    // POKE: the laser in stage 3 (while there is a stone), else a drink: more urine, a wave
    poke() {
      if (stage === 2 && stone > 0) { stone -= 1; return 'laser'; }
      Pu += 0.35;
      waves.push({ x: 0, depth: 0 });
      return 'wave';
    },

    // the ureter's radius at x, relative to its calm width
    radius(x) {
      const D = distension();
      let r = 1 + 0.35 * dilation;
      if (x < XS || stone === 0 || stent) r += (x < XS ? 0.9 : stone === 0 ? 0.25 : 0.45) * D;
      if (stone > 0) r -= 0.3 * spasm * Math.exp(-(((x - XS) / 0.03) ** 2));
      for (const w of waves) {
        r -= w.depth * Math.exp(-(((x - w.x) / 0.025) ** 2));
        r += 0.3 * w.depth * Math.exp(-(((x - w.x - 0.05) / 0.03) ** 2));
      }
      return Math.max(0.35, r);
    },

    // gain: the head's tension on the muscle (somaloop.js bodyGain; 1 when no loop)
    step(dt, { phi = 0.5, gain = 1 } = {}) {
      time += dt;
      const D = distension();
      // the kidney keeps producing; the stone (or the stent) lets it through
      Pu += (0.08 - 0.6 * conductance() * Pu) * dt;
      Pu = Math.max(0.05, Math.min(6, Pu));
      if (stent) dilation = Math.min(1, dilation + dt / 40);
      else dilation = Math.max(0, dilation - dt / 30);
      // peristalsis: more often and deeper when the tube is swollen; damped by a stent
      nextWave -= dt;
      if (nextWave <= 0) {
        waves.push({ x: 0, depth: 0 });
        nextWave = stent ? 14 : 9 / (1 + 1.5 * D);
      }
      const depth = stent ? 0.12 : 0.25 + 0.25 * D;
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.depth += (depth - w.depth) * Math.min(1, dt * 3);
        const before = w.x;
        w.x += 0.18 * dt;
        if (before < XS && w.x >= XS && stone > 0) {
          // the wave crashes into the stone: what does not pass is spasm and back-pressure
          const pass = Math.min(1, conductance());
          const spike = Math.min(1.2, (1 - pass) * (0.35 + 0.65 * D) * gain);
          spasm = Math.max(spasm, spike);
          Pu += 0.12 * (1 - pass);
          ring(XS, spike);
          if (pass < 0.5) { waves.splice(i, 1); continue; }
        }
        if (w.x > 1) waves.splice(i, 1);
      }
      spasm *= Math.exp(-dt / 2.5);
      // the bladder empties now and then; with a stent, urine runs back up it to the kidney
      nextVoid -= dt;
      if (nextVoid <= 0) {
        nextVoid = 18;
        if (stent) { reflux = 0.45; ring(0.02, 0.45, 'end'); ring(0.98, 0.3, 'end'); }
      }
      reflux *= Math.exp(-dt / 3);
      event *= Math.exp(-dt / 5);
      // what the nerves report: stretch above a threshold, the spasms, the stent's ends
      const stretch = Math.max(0, D - 0.25) * 1.1;
      const ends = stent ? 0.2 + 0.2 * (stage === 1 ? 1 - dilation : 0) : 0;
      raw = stretch + spasm + ends + reflux + event;
      // fear makes the same signal louder; under anaesthetic (the laser) it is not felt
      pain = Math.min(1.5, raw * (0.4 + 0.6 * phi) * (stage === 2 ? 0.15 : 1));
      if (stretch > 0.1 && Math.random() < dt * 0.5) ring(XS * 0.6, stretch * 0.6, 'stretch');
      for (const r of rings) r.age += dt;
      for (let i = rings.length - 1; i >= 0; i--) if (rings[i].age > 3) rings.splice(i, 1);
      traceClock += dt;
      while (traceClock >= 0.25) {
        traceClock -= 0.25;
        trace.push([pain, distension()]);
        if (trace.length > 240) trace.shift();
      }
    },
  };
  return api;
}
