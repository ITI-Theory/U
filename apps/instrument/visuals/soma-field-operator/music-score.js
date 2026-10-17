// music-score.js: the tensor film from music (ISS-107 B). The music drives the model, not the edit: a
// mix's cue sheet (lib/show/cues.py: grooves, breakdowns, the builds at their ends, the drops) read
// as the score's seven modes. A build raises the barrier (fear and curiosity climb, safety falls),
// a drop is a threshold crossing (awe and the pre-verbal peak, language gone), a breakdown is
// recovery (safety returns), the groove the ground between. Interpretive: one reading of the
// music's form (BRECVEMA's R, rhythmic entrainment, and M, musical expectancy), not a measurement
// of anyone's feeling. Used live by SHOW (show.js) and written as a score file by
// scripts/score-from-cues.mjs, so a mix can be compiled into a film like any score.

export const MUSIC_MODES = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];
const SHAPES = {
  groove: [0.45, 0.3, 0.55, 0.5, 0.15, 0.25, 0.55],
  breakdown: [0.7, 0.15, 0.5, 0.35, 0.3, 0.35, 0.45],
  buildFrom: [0.5, 0.25, 0.6, 0.4, 0.2, 0.2, 0.5],
  buildTo: [0.3, 0.65, 0.8, 0.6, 0.15, 0.15, 0.7],
  drop: [0.3, 0.55, 0.5, 0.9, 0.1, 0.05, 0.85],
};
const DROP_SECONDS = 30; // a drop's peak settles back into the groove over about 16 bars at 140 BPM
const mix = (a, b, f) => a.map((v, i) => v + (b[i] - v) * f);

// the seven modes at time t (seconds) of a mix with cue sheet `cues`
export function musicModesAt(cues, t) {
  const sec = cues.sections.find(s => t >= s.start && t < s.end) ?? cues.sections[cues.sections.length - 1];
  const build = cues.builds.find(b => t >= b.start && t < b.end);
  const since = Math.min(...cues.drops.map(d => (t >= d.t ? t - d.t : Infinity)));
  let v;
  if (build) v = mix(SHAPES.buildFrom, SHAPES.buildTo, (t - build.start) / Math.max(1, build.end - build.start));
  else if (sec?.kind === 'breakdown') v = SHAPES.breakdown;
  else v = SHAPES.groove;
  if (since < DROP_SECONDS) v = mix(SHAPES.drop, v, since / DROP_SECONDS);
  return Object.fromEntries(MUSIC_MODES.map((id, k) => [id, Math.round(v[k] * 1000) / 1000]));
}

// a score (registry/scores format) from a cue sheet: keyframes at every section edge, build and
// drop (story-time t = seconds / duration), a threshold at each drop, a phase per section
export function scoreFromCues(cues, { id = 'music', title = cues.source } = {}) {
  const D = cues.duration;
  const times = new Set([0, D]);
  for (const s of cues.sections) times.add(s.start);
  for (const b of cues.builds) { times.add(b.start); times.add((b.start + b.end) / 2); }
  for (const d of cues.drops) { times.add(d.t); times.add(Math.min(D, d.t + DROP_SECONDS / 2)); times.add(Math.min(D, d.t + DROP_SECONDS)); }
  const keyframes = [...times].filter(x => x >= 0 && x <= D).sort((a, b) => a - b)
    .map(x => [Math.round((x / D) * 10000) / 10000, MUSIC_MODES.map(m => musicModesAt(cues, Math.min(D - 0.01, x))[m])]);
  return {
    id, title, version: '0.1', source: `a cue sheet (lib/show/cues.py) of ${cues.source}`,
    provenance: { author: null, made_by: 'scripts/score-from-cues.mjs', from: `the music's form: ${cues.source}`, attested: null },
    minutes: Math.round((D / 60) * 10) / 10,
    modes: MUSIC_MODES.map(m => ({ id: m })),
    keyframes,
    thresholds: cues.drops.map((d, k) => ({ id: `D${k + 1}`, t: Math.round((d.t / D) * 10000) / 10000, from: 'build', to: 'drop', condition: 'the drop: the barrier crossed', hold: false })),
    phases: cues.sections.map(s => ({ t: Math.round((s.start / D) * 10000) / 10000, name: s.kind === 'breakdown' ? 'Breakdown' : 'Groove', line: s.kind === 'breakdown' ? 'The kick falls away: recovery.' : 'The kick: the ground.' })),
    note: 'Interpretive (ISS-107 B): the music\'s form read as the score\'s modes; not anyone\'s feeling.',
  };
}
