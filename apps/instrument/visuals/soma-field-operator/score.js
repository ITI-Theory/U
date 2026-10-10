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

export const MODE_IDS = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];

export function createScorePlayer(score, { kappaV = 1, start = 0 } = {}) {
  const keys = (score?.keyframes ?? []).map(([t, v]) => ({ t: Number(t), v: v.map(Number) })).sort((a, b) => a.t - b.t);
  const thresholds = (score?.thresholds ?? []).map(th => ({ ...th, t: Number(th.t), crossed: false }));
  const phases = (score?.phases ?? []).map(p => ({ ...p, t: Number(p.t) })).sort((a, b) => a.t - b.t);
  const defaults = score?.defaults ?? {};
  const kappaD = Number(defaults.kappa_d ?? 0.7);
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
    // loop: { kr, hdot, bpm }
    step(dt, loop = {}) {
      const kr = Number(loop.kr) || 0;
      const hdot = Number(loop.hdot) || 0;
      const bpm = Number(loop.bpm) || 70;
      crossedAt = -1;
      if (holding) {
        held += dt;
        const settled = kr > 0 && hdot <= 0 && bpm < 85 && held > 2;
        if (ready || (kr === 0 && held > 4 + 10 * kappaD) || settled) {
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
      const m = Object.fromEntries(MODE_IDS.map((id, k) => [id, values[k] ?? 0]));
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
    seconds,
  };
}

// The viewer's field estimated from the heart alone: arousal a from 60 to 120 bpm raises
// fear and lowers safety; a rising heart (Hdot > 0) also lowers language a little.
// A crude estimator for a slider; a real one would use HRV, skin conductance, breath.
export function viewerField(bpm, hdot) {
  const a = Math.max(0, Math.min(1, (bpm - 60) / 60));
  return { S: 1 - a, F: a, L: Math.max(0, 0.8 - 0.5 * a - 0.2 * Math.max(0, hdot)) };
}

