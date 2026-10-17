// compile-film.mjs: compile a film once, at "compose time" (author, 17 Oct: "cut, for a film, the whole
// thing once, with zero user adjustments ... then at runtime it's compiled and we just run in sync";
// docs/PIPELINE.md). One timeline that both senses read: the places (a tour's views, in order) laid over
// the score's story-time, the score's seven modes at each frame, and the viewer's baseline compiled on top
// (score.js viewerTransform and viewerStep: the deterministic part and the noise and lag, by time), so a
// viewer's own film plays "as zero" and live knobs only add small overrides at run time. The band's
// controls (midi-out.js bandControls, interpretive) are compiled too, for the sound to come.
//
//   node scripts/compile-film.mjs [--tour grand-tour] [--score river-film] [--viewer neutral] [--minutes 90] [--fps 10]
//   -> ../../../../bld/film/<tour>.<score>.<viewer>.timeline.json

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tours, scores, viewers } from '../generated/app-data.js';
import { presetParams, viewerTransform, viewerStep, MODE_IDS } from '../score.js';
import { bandControls } from '../midi-out.js';
import { parseVia } from '../transitions.js';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : fallback; };
const tourId = arg('tour', 'grand-tour'), scoreId = arg('score', 'river-film'), viewerId = arg('viewer', 'neutral');
const fps = Number(arg('fps', 10));
const tour = tours.find(t => t.id === tourId);
const score = scores.find(s => s.id === scoreId);
const viewer = viewers.find(v => v.id === viewerId) ?? null;
if (!tour) throw new Error(`no tour ${tourId}`);
if (!score) throw new Error(`no score ${scoreId}`);
const minutes = Number(arg('minutes', score.minutes ?? 90));
const seconds = minutes * 60;

// the score's modes at story-time t in [0, 1] (linear between keyframes, as the player does)
const keys = score.keyframes.map(k => (Array.isArray(k) ? { t: k[0], v: k[1] } : { t: k.t, v: MODE_IDS.map(id => k[id]) }));
function modesAt(t) {
  let i = 0;
  while (i < keys.length - 2 && keys[i + 1].t <= t) i++;
  const a = keys[i], b = keys[Math.min(i + 1, keys.length - 1)];
  const f = b.t > a.t ? Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t))) : 0;
  return Object.fromEntries(MODE_IDS.map((id, k) => [id, +(a.v[k] + (b.v[k] - a.v[k]) * f).toFixed(4)]));
}

// the places: each tour step an equal share of the film (a step's `dwell` would weight it later).
// A step's `style:` (a directive to the renderers, non-functional) holds until the next one.
let style = null;
const places = tour.steps.map((s, k) => {
  if (s.style !== undefined) style = s.style === 'none' ? null : s.style;
  return { index: k, view: s.view, from: (k / tour.steps.length) * seconds, to: ((k + 1) / tour.steps.length) * seconds, say: s.say, style };
});
const params = presetParams(viewer);
const frames = [];
let state = null;
const band = {};
for (let n = 0; n <= seconds * fps; n++) {
  const time = n / fps, t = time / seconds;
  const place = places.findIndex(p => time >= p.from && time < p.to);
  const modes = modesAt(t);
  state = viewerStep(viewerTransform(modes, params), params, state, time, 1 / fps);
  const compiled = Object.fromEntries(Object.entries(state).map(([k, v]) => [k, +v.toFixed(4)]));
  const b = bandControls(compiled, 1 / fps, band);
  frames.push({ time: +time.toFixed(2), t: +t.toFixed(5), place: place < 0 ? places.length - 1 : place, modes, compiled,
    band: { tension: +b.tension.toFixed(3), chord: b.chord, motion: +b.motion.toFixed(3), density: +b.density.toFixed(3), drive: +b.drive.toFixed(3) } });
}
// a transition (a morphism between places) at each place boundary (registry/transitions.yaml): the
// step's own `via:` when it has one, else the kind inferred from the two views, with that kind's defaults
const kindOf = (a, b) => {
  const va = new URLSearchParams(a), vb = new URLSearchParams(b);
  if (va.get('voyage') === 'worlds') return 'dive';
  if (va.get('hall') === '1' && vb.get('voyage') !== va.get('voyage')) return 'doorway';
  if (va.get('level') !== vb.get('level')) return 'elevator';
  if (vb.get('voyage') === 'flight' || vb.get('voyage') === 'wayin') return 'tube';
  return 'cut';
};
const transitions = places.slice(1).map((p, k) => {
  const declared = tour.steps[k + 1].via;
  const via = parseVia(declared ?? kindOf(places[k].view, p.view));
  if (via.problem) throw new Error(`step ${k + 2}: ${via.problem}`);
  return { at: +p.from.toFixed(2), from: k, to: k + 1, kind: via.kind, seconds: via.seconds, sync: via.sync, speed: via.speed, declared: declared !== undefined };
});
const out = resolve(here, '../../../../../bld/film', `${tourId}.${scoreId}.${viewerId}.timeline.json`);
mkdirSync(dirname(out), { recursive: true });
const doc = { schema: 'soma-film-timeline/1', compiled: new Date().toISOString(), tour: tourId, score: scoreId, viewer: viewerId,
  minutes, fps, modes: MODE_IDS, places, transitions, frames,
  note: 'Compiled once (compose time). At run time the app plays it in sync and adds only live overrides (knobs, the strap, a poke). Interpretive: the band and the transitions are proposals (ISS-115, docs/PIPELINE.md).' };
writeFileSync(out, JSON.stringify(doc));
console.log(`${out}: ${places.length} places, ${transitions.length} transitions, ${frames.length} frames (${minutes} min at ${fps} fps)`);
const kinds = transitions.reduce((m, x) => ({ ...m, [x.kind]: (m[x.kind] ?? 0) + 1 }), {});
console.log('transitions:', JSON.stringify(kinds));
