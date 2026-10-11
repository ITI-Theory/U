// score.js: plays an emotional score (The Tensor, paper/soma/the-tensor) over story-time.
// e*(t) is interpolated between keyframes; story-time runs at kappa_v (velocity); at a
// threshold the player holds ("hold_until_ready") until the viewer signals readiness
// (POKE, in place of the biofeedback the paper describes) or the depth timer runs out
// (4 + 10 * kappa_d seconds).
// The somatic loop (paper Part I, "The Somatic Loop"): a heart rate (for now a slider)
// gives the viewer's estimated field e_V and its trend Hdot (bpm/s, the paper's primary
// signal). kappa_r mixes score and viewer: 0 Projection, 0.5 Resonance, 1 Mirror. With
// kappa_r > 0 a rising heart slows story-time, and at a threshold the film waits for the
// heart to settle (falling, below 85 bpm) instead of a timer; POKE still crosses.
// The other knobs (paper, "Control Knobs"): kappa_d (depth) scales how far the film
// descends into the pre-verbal attractor and how long a threshold holds; kappa_W scales
// the score's coupling W* (mode `from` drives mode `to`); kappa_m masks modes (the score is
// rendered without them). kappa_t (texture) is the renderer's (flight3d.js).

export const MODE_IDS = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];

export function createScorePlayer(score, { kappaV = 1, start = 0, kappaD = null, kappaW = 1, mask = null } = {}) {
  const keys = (score?.keyframes ?? []).map(([t, v]) => ({ t: Number(t), v: v.map(Number) })).sort((a, b) => a.t - b.t);
  const thresholds = (score?.thresholds ?? []).map(th => ({ ...th, t: Number(th.t), crossed: false }));
  const phases = (score?.phases ?? []).map(p => ({ ...p, t: Number(p.t) })).sort((a, b) => a.t - b.t);
  const defaults = score?.defaults ?? {};
  const kd = Math.max(0, Math.min(1, Number(kappaD ?? defaults.kappa_d ?? 0.7)));
  const kw = Math.max(0.5, Math.min(2, Number(kappaW) || 1));
  const active = mask && mask.length ? new Set(mask) : null;
  const coupling = (score?.coupling ?? []).map(c => ({ from: c.from, to: c.to, w: Number(c.weight) || 0 }));
  const seconds = Number(score?.minutes ?? 90) * 60;
  let t = Math.max(0, Math.min(1, start));
  for (const th of thresholds) if (th.t < t) th.crossed = true;
  let holding = null;
  let held = 0;
  let ready = false;
  let crossedAt = -1;
  let v = Math.max(0.1, Math.min(3, kappaV));
  let slowed = 1;

  function at(time) {
    if (!keys.length) return MODE_IDS.map(() => 0);
    if (time <= keys[0].t) return keys[0].v.slice();
    for (let i = 0; i + 1 < keys.length; i++) {
      const a = keys[i];
      const b = keys[i + 1];
      if (time <= b.t) {
        const s = (time - a.t) / (b.t - a.t || 1);
        const e = s * s * (3 - 2 * s);
        return a.v.map((x, k) => x + (b.v[k] - x) * e);
      }
    }
    return keys[keys.length - 1].v.slice();
  }

  return {
    get t() { return t; },
    get holding() { return holding; },
    get justCrossed() { return crossedAt; },
    get slowed() { return slowed; },
    set velocity(x) { v = Math.max(0.1, Math.min(3, Number(x) || 1)); },
    get velocity() { return v; },
    // the viewer is ready to cross (POKE)
    ready() { if (holding) ready = true; },
    // follow another player's clock (the twin view): jump to a story-time, no hold
    seek(time) {
      t = Math.max(0, Math.min(1, Number(time) || 0));
      for (const th of thresholds) th.crossed = th.t <= t;
      holding = null;
    },
    // loop: { kr, hdot, bpm }
    step(dt, loop = {}) {
      const kr = Number(loop.kr) || 0;
      const hdot = Number(loop.hdot) || 0;
      const bpm = Number(loop.bpm) || 70;
      crossedAt = -1;
      if (holding) {
        held += dt;
        const settled = kr > 0 && hdot <= 0 && bpm < 85 && held > 2;
        if (ready || (kr === 0 && held > 4 + 10 * kd) || settled) {
          holding.crossed = true;
          crossedAt = thresholds.indexOf(holding);
          holding = null;
          ready = false;
        }
        return;
      }
      // a rising heart slows the film, more the more the viewer drives it
      slowed = kr > 0 && hdot > 0 ? 1 / (1 + 3 * kr * hdot) : 1;
      const next = Math.min(1, t + (dt * v * slowed) / seconds);
      const th = thresholds.find(x => !x.crossed && x.t > t && x.t <= next);
      if (th) {
        t = th.t;
        holding = th;
        held = 0;
        return;
      }
      t = next;
    },
    // the score e*(t), or mixed with the viewer's field: (1 - kr) e* + kr e_V
    modes(viewer = null, kr = 0) {
      const values = at(t);
      const m = shape(Object.fromEntries(MODE_IDS.map((id, k) => [id, values[k] ?? 0])), { kd, kw, active, coupling });
      if (!viewer || !kr) return m;
      for (const id of Object.keys(viewer)) m[id] = (1 - kr) * m[id] + kr * viewer[id];
      return m;
    },
    phase() {
      let current = phases[0] ?? { name: '', line: '' };
      for (const p of phases) if (p.t <= t + 1e-9) current = p;
      return current;
    },
    names: () => (score?.modes ?? []).map(m => m.name),
    // the shaped score at any story-time (the route plan draws the whole journey from it)
    modesAt(time) {
      const values = at(Math.max(0, Math.min(1, time)));
      return shape(Object.fromEntries(MODE_IDS.map((id, k) => [id, values[k] ?? 0])), { kd, kw, active, coupling });
    },
    phaseList: phases,
    thresholdList: thresholds,
    seconds,
    knobs: { kd, kw, mask: active ? [...active] : MODE_IDS.slice() },
  };
}

// The knobs on e*(t): one step of the coupling, scaled by kappa_W (each `to` mode moves by
// kappa_W * w * (from mode), from the unshaped values); depth scales the pre-verbal mode
// (0.3 at kappa_d = 0, the full score at 1); masked modes are 0. Values stay in [0, 1].
export function shape(m, { kd = 0.7, kw = 1, active = null, coupling = [] } = {}) {
  const out = { ...m };
  for (const c of coupling) if (c.from in m && c.to in out) out[c.to] += kw * c.w * m[c.from];
  out.PV *= 0.3 + 0.7 * kd;
  for (const id of Object.keys(out)) {
    out[id] = Math.max(0, Math.min(1, out[id]));
    if (active && !active.has(id)) out[id] = 0;
  }
  return out;
}

// The viewer's field estimated from the heart: arousal a from 60 to 120 bpm raises fear
// and lowers safety; a rising heart (Hdot > 0) also lowers language a little. With a strap,
// heart-rate variability (heart.js hrvFromRR) refines safety: vagal tone (RMSSD, 60 ms and
// above counts as high) and coherence (a slow regular rhythm) raise it, and slow breathing
// (under 10 a minute) a little more. An estimate for the film, not a clinical measure.
export function viewerField(bpm, hdot, hrv = null) {
  const a = Math.max(0, Math.min(1, (bpm - 60) / 60));
  let S = 1 - a;
  if (hrv) {
    const vagal = Math.max(0, Math.min(1, hrv.rmssd / 60));
    const slow = hrv.breath > 0 && hrv.breath < 10 ? 0.1 : 0;
    S = Math.max(0, Math.min(1, 0.5 * S + 0.3 * vagal + 0.2 * hrv.coherence + slow));
  }
  return { S, F: a, L: Math.max(0, 0.8 - 0.5 * a - 0.2 * Math.max(0, hdot)) };
}


// ---------------------------------------------------------------- viewers (the twin view)
// A viewer preset (registry/viewers): who watches the film. The Tensor's rendering function
// S(t) = R(e*, kappa, e_V): the same score and knobs, a different viewer. Three layers:
// - baseline: the instrument's 16 knobs (P1, "Design": eight emotional dimensions, each a
//   somatic and a cognitive knob), here The Tensor's modes plus Shame (VIEW_MODES); offsets
//   in [-1, 1] added to the film's modes (a mode the film does not have is ignored);
// - conditions: model operators from P13 (hypotheses, not diagnoses): adhd and asd move the
//   effective temperature T = T0 (1 + 0.8 adhd - 0.6 asd) (ADHD about 1.8 T0, ASC about
//   0.4 T0): noise and texture; asd also monotropism (the two strongest modes stay, the
//   others fade); cptsd deepens the barrier (W towards 12): safety lower, fear and grief
//   higher, and slower to come back (the lag is the app's, applied over time);
// - the film's own knobs, shared by both windows.
// scripts/fit_viewer.py uses the same deterministic transform to fit a preset from two films.
export const VIEW_MODES = ['S', 'F', 'Sh', 'G', 'C', 'A', 'L', 'PV'];
const clamp01 = x => Math.max(0, Math.min(1, x));

// a preset plus the three condition sliders (each slider adds to the preset's value)
export function presetParams(preset = null, sliders = {}) {
  const c = k => clamp01(Number(preset?.conditions?.[k] ?? 0) + Number(sliders?.[k] ?? 0));
  return { adhd: c('adhd'), asd: c('asd'), cptsd: c('cptsd'), baseline: preset?.baseline ?? {} };
}

// the effective temperature, as a multiple of T0
export function temperature(p) { return 1 + 0.8 * p.adhd - 0.6 * p.asd; }

// the deterministic part of the viewer: baseline offsets, the C-PTSD barrier, ASD monotropism
export function viewerTransform(m, p) {
  const out = { ...m };
  for (const id of Object.keys(out)) {
    const b = p.baseline?.[id];
    const off = Array.isArray(b) ? (Number(b[0] ?? 0) + Number(b[1] ?? 0)) / 2 : Number(b) || 0;
    out[id] = clamp01(out[id] + off);
  }
  if ('S' in out) out.S = clamp01(out.S - 0.3 * p.cptsd);
  if ('F' in out) out.F = clamp01(out.F + 0.2 * p.cptsd);
  if ('G' in out) out.G = clamp01(out.G + 0.2 * p.cptsd);
  if (p.asd > 0) {
    const ids = Object.keys(out).sort((a, b) => out[b] - out[a]);
    ids.forEach((id, k) => { out[id] = k < 2 ? clamp01(out[id] * (1 + 0.3 * p.asd)) : out[id] * (1 - 0.6 * p.asd); });
  }
  return out;
}

// the dynamic part, frame by frame: ADHD noise (a smooth jitter per mode, scaled by the
// temperature above T0) and the C-PTSD lag (the viewer follows the film more slowly, the
// deeper the barrier). state: the previous output (null at the start).
export function viewerStep(target, p, state, time, dt) {
  const noise = 0.18 * Math.max(0, temperature(p) - 1);
  const tau = 0.5 + 12 * p.cptsd;
  const out = {};
  Object.keys(target).forEach((id, k) => {
    const jitter = noise * (Math.sin(time * (0.9 + 0.37 * k) + k) * 0.6 + Math.sin(time * (2.3 + 0.21 * k) + 2 * k) * 0.4);
    const goal = clamp01(target[id] + jitter);
    const prev = state?.[id] ?? goal;
    out[id] = prev + (goal - prev) * Math.min(1, dt / tau);
  });
  return out;
}