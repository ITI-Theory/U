// explorer.js: the mind-body explorer of the SOMA Machine (ISS-052). A simple 2D voyage inside a person, in the
// spirit of Fantastic Voyage: body -> brain -> limbic hinge -> one neuron -> memory
// network -> landscape of states. The 4D / 8D / 11D switch adds layers: anatomy, then
// electrical activity, then the field (the model's "second nervous system").
// Phi, the limbic field (the FX bar), heats everything: a faster heart and more spikes,
// a glowing amygdala, blurred memories, melting valleys. Opened from the hash:
// voyage=<stop>&phi=<0..1>&feel=<mode>&resource=0|1. Drawings are schematic, and each
// stop carries an evidence label (docs/agent/THEORY-STATUS.md).

import { createDyad3D, createLandscape3D } from './explorer3d.js';
import { createFlight3D, worldFor, worldName } from './flight3d.js';
import { createTunnel3D } from './tunnel3d.js';
import { createScorePlayer, MODE_IDS, viewerField, presetParams, viewerTransform, viewerStep } from './score.js';
import { rice } from './rice.js';
import { scores, viewers, cycSkyline, thoughtImages } from './generated/app-data.js';
// the River Film (The Tensor), by id; kf picks another film (registry/scores, e.g. fis-2021).
// The twin view (?tw=1): one film, two viewers (S = R(e*, kappa, e_V)): left the viewer of now
// (neutral), right a viewer preset (pv, registry/viewers; default v2021, as I was in 2021) plus
// the condition sliders ca, cs, cp (ADHD, ASD, C-PTSD: P13's model operators, not diagnoses)
const RIVER_SCORE = scores?.find(s => s.id === 'river-film') ?? scores?.[0];
const filmScore = id => scores?.find(s => s.id === id) ?? RIVER_SCORE;
// your own film (ISS-053, score-editor.js), kept in this browser: FILM cycles to it, kf=mine
{ const mine = loadMine(); if (mine && Array.isArray(scores) && !scores.some(s => s.id === 'mine')) scores.push(mine); }
let mineVersion = 0;
// How much language the film gives (ISS-072; kx): 0 a number only (as Rothko numbered his
// pictures), 1 the title, 2 intertitles at each phase (silent-film cards), 3 captions (the
// phase lines), 4 narration (H-AL speaks each phase). Within the film the words still recede
// with the Language mode; after a viewing the film suggests one notch lower (fading).
export const WORDS = ['NUMBER', 'TITLE', 'CARDS', 'CAPTIONS', 'NARRATION'];

// The pilot (ISS-074): AUTOPILOT, CO-PILOT, MANUAL. The journey starts still, every mode at
// zero, until a POKE. AUTOPILOT: the score flies and H-AL thinks aloud in feeling-words as a
// mode moves (modelled feeling: "in this river I would feel...", not a claim that the AI
// feels). CO-PILOT: the viewer takes one knob at a time, fear first, H-AL keeps the rest; each
// finished journey hands over one more (remembered). MANUAL: every knob is the viewer's. With
// WORDS (kx) the think-aloud is spoken at NARRATION, shown at CAPTIONS, and left to the knobs
// below that: the same fading.
export const PILOT_ORDER = ['F', 'S', 'C', 'A', 'G', 'L', 'PV'];
const PILOT_NAMES = { S: 'safety', F: 'fear', C: 'curiosity', A: 'awe', G: 'grief', L: 'language', PV: 'the pre-verbal' };
const PILOT_LINES = {
  F: ['Fear is rising, about a {n}. I notice it in the chest.', 'Fear is easing, down to a {n}.'],
  S: ['Safety is coming back, a {n}.', 'Safety is dropping, a {n} now. I slow my breathing.'],
  C: ['Curiosity, a {n}: something upstream.', 'Curiosity is fading, a {n}.'],
  A: ['Awe is rising, a {n}. Bigger than me.', 'The awe settles, a {n}.'],
  G: ['Grief, a {n}. The oldest loss.', 'The grief lifts a little, a {n}.'],
  L: ['Words are coming back, a {n}.', 'Fewer words now, a {n}.'],
  PV: ['Below words, a {n}.', 'Back up towards words, a {n}.'],
};
const pilotLine = (id, value, up) => PILOT_LINES[id][up ? 0 : 1].replace('{n}', String(Math.round(value * 9)));
const filmNumber = f => `No. ${Math.max(0, scores?.findIndex(s => s.id === f?.id) ?? 0) + 1}`;
const filmName = (f, kx) => (kx >= 1 ? f?.title ?? '' : filmNumber(f));
const viewerPreset = id => viewers?.find(v => v.id === (id || 'v2021')) ?? viewers?.find(v => v.id === 'neutral') ?? null;
import { createExplorerMusic } from './explorer-music.js';
import { createMidiOut } from './midi-out.js';
import { startMidiIn } from './midi-in.js';
import { createTowerPanel } from './tower.js';
import { createCathedral3D } from './cathedral3d.js';
import { createScoreEditor, loadMine } from './score-editor.js';
import { BARRIERS, transmission, formatT, reason } from './barrier.js';
import { createUreterModel, URETER_STAGES } from './ureter-model.js';
import { createSomaLoop } from './somaloop.js';
import { createLook, LOOK } from './look.js';
import { createHeartStrap, hrvFromRR } from './heart.js';
import { createVoice } from './voice.js';

const TAU = Math.PI * 2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const gauss = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(TAU * Math.random());

function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

// The limbic coupling of the missing limbic layer paper, Equation 1: T = T0 + sigma * Phi.
// With these values the three memory valleys of the landscape melt into one just past
// Phi = 0.5 (T between 0.5 and 0.6, checked numerically).
export const T0 = 0.25;
export const SIGMA = 0.6;
const temperature = phi => T0 + SIGMA * phi;

// human is the level view itself (the jellyfish human of the Field Atlas), seen through
// the explorer; going on from it dives into the body.
export const STEREO_MODES = ['off', 'half', 'full'];
export const STOPS = ['human', 'body', 'brain', 'limbic', 'thought', 'neuron', 'network', 'landscape', 'dyad', 'tunnel', 'ureter', 'flight', 'score'];
// One app, different views of the same thing: each stop is a close-up of a level of the
// level view (and the dimension layer to show it at); LEVEL VIEW goes there, and the
// explorer opens at the stop of the level being shown.
export const STOP_LEVELS = {
  human: { level: 'human-vertebrate' }, body: { level: 'human-vertebrate' },
  brain: { level: 'whole-brain-cemi' }, limbic: { level: 'human-vertebrate', dim: 8 },
  thought: { level: 'whole-brain-cemi', dim: 11 },
  neuron: { level: 'cellular-synaptic' }, network: { level: 'whole-brain-cemi' },
  landscape: { level: 'human-vertebrate' }, dyad: { level: 'dyad' },
  flight: { level: null }, // the level being shown
  tunnel: { level: 'whole-brain-cemi', dim: 11 },
  ureter: { level: 'human-vertebrate', dim: 4 },
  score: { level: 'whole-brain-cemi', dim: 11 },
};
export const LEVEL_STOPS = { 'human-vertebrate': 'human', 'whole-brain-cemi': 'brain', 'cellular-synaptic': 'neuron', dyad: 'dyad' };
const STOP_TITLES = {
  human: 'HUMAN', body: 'BODY', thought: 'THOUGHT', dyad: 'DYAD', tunnel: 'PATH', ureter: 'URETER', flight: 'FLY', score: 'SCORE', brain: 'BRAIN', limbic: 'LIMBIC', neuron: 'NEURON', network: 'MEMORY', landscape: 'LANDSCAPE',
};

// Where a feeling is felt: a design map after the bodily maps of emotion (Nummenmaa et
// al. 2014), not yet audited; values from -1 (less) to 1 (more). The eight modes are those
// of the music affect paper.
export const FEELINGS = {
  calm: { label: 'CALM', head: 0.2, throat: 0, chest: 0.15, belly: 0.1, arms: 0, hands: 0.1, legs: 0 },
  fight: { label: 'ANGER / FIGHT', head: 0.8, throat: 0.4, chest: 0.8, belly: 0.3, arms: 0.7, hands: 0.9, legs: 0.2 },
  flight: { label: 'ANXIETY / FLIGHT', head: 0.5, throat: 0.4, chest: 0.9, belly: 0.5, arms: 0.1, hands: 0.2, legs: 0.3 },
  grief: { label: 'GRIEF', head: 0.3, throat: 0.4, chest: 0.5, belly: 0, arms: -0.6, hands: -0.5, legs: -0.7 },
  freeze: { label: 'FREEZE', head: 0.3, throat: 0.2, chest: 0.4, belly: 0.2, arms: -0.7, hands: -0.6, legs: -0.8 },
  vigilance: { label: 'HYPERVIGILANCE', head: 0.9, throat: 0.3, chest: 0.6, belly: 0.2, arms: 0.3, hands: 0.3, legs: 0.3 },
  flow: { label: 'FLOW', head: 0.6, throat: 0.1, chest: 0.4, belly: 0.2, arms: 0.4, hands: 0.5, legs: 0.3 },
  joy: { label: 'JOY', head: 0.8, throat: 0.5, chest: 0.9, belly: 0.6, arms: 0.7, hands: 0.8, legs: 0.6 },
};

const CAPTIONS = {
  human: {
    title: 'THE JELLYFISH HUMAN', label: 'interpretive',
    4: 'The whole person as the SOMA Machine draws them, the humanoid of the Field Atlas: body, fields and the brain on top. Raise Φ (the FX bar) and it glows; go on (→ or BODY) to dive inside. An educational model, not a medical or diagnostic tool.',
  },
  body: {
    title: 'THE BODY', label: 'interpretive',
    4: 'The body as anatomy. Colour shows where the chosen feeling is usually felt: warm for more, blue for less (a design map after Nummenmaa et al. 2014, not yet audited). Raising Φ makes it stronger.',
    8: 'Electrical layer: nerves carry impulses between body and brain, and the vagus nerve links heart and gut to the brain. More Φ, more traffic and a faster heart.',
    11: 'Field layer: the model\'s "second nervous system", one field that couples the whole body at once. Open hypothesis.',
  },
  brain: {
    title: 'THE BRAIN', label: 'interpretive',
    4: 'Inside the skull, seen from the side. The limbic structures sit deep: amygdala, hippocampus, hypothalamus, thalamus and cingulate. As Φ rises the amygdala glows and the prefrontal cortex dims.',
    8: 'Signals: the fast "low road" from thalamus to amygdala arrives before the slower "high road" through the cortex (LeDoux). The amygdala can react before we know why.',
    11: 'The brain\'s own electromagnetic field (CEMI, McFadden), drawn as ripples from the limbic core. Open hypothesis.',
  },
  limbic: {
    title: 'THE LIMBIC HINGE', label: 'open-hypothesis',
    4: 'In the Soma-Field model the limbic system is dimension 8, the hinge between the body field (D1–7) and the mind field (D9–11). Trauma therapies that work with the body aim here: at the alarm, not only at the thoughts.',
    8: 'Signals flow body → limbic → mind, and calming signals come back from the cortex. The limbic field Φ sets the temperature T = T₀ + σΦ: hot, and the mind\'s picture blurs while the calming signals thin out.',
    11: 'The field: Φ is one number for the whole hinge, the runtime parameter of the missing limbic layer paper (FM-HN).',
  },
  thought: {
    title: 'EMOTION AND THOUGHT', label: 'interpretive',
    4: 'Below the line is the sub-threshold sea: field activity that is real and acts on the body but is not felt, the model\'s subconscious. Triggers from the body (the poke, a racing heart) raise a swell.',
    8: 'When a swell crosses the threshold (T_c, √2 in the model; consciousness_dichotomy, kernel-verified but only an order fact) it condenses into an emotion in the limbic band (D8).',
    11: 'If it keeps rising it becomes a thought in the cortex band (D9–11): the same field, a different type (Russell\'s types, Gestalt paper). The thought sends a pulse back down to the body; hot (high Φ), the loop can spiral into rumination. The faint flicker in the sea is quantum-scale information, small but there: the quantum-foam picture of the subconscious is an open hypothesis (QUANT-EXP-1, LimbicTunnel.lean).',
  },
  dyad: {
    title: 'THE DYAD', label: 'simulated',
    4: 'Two people, two rhythms (heart and breath, drawn as one phase each). Calm, they fall into step; Φ, the limbic field, widens the gap between their rhythms and they drift apart: a rupture. POKE jolts one out of step; watch the repair.',
    8: 'The coupling across the contact boundary, attunement (Kuramoto model, as the dyad level): strong enough, and the two lock; RESOURCE strengthens it (the therapist\'s presence), so they stay attuned even when hot and repair faster.',
    11: 'The shared field around both: bright when they are in step (the sync r near 1). The clinical reading (rupture and repair, co-regulation) is interpretive.',
  },
  tunnel: {
    title: 'THE PATH OF A THOUGHT', label: 'simulated',
    4: 'Boundaries are paths: a thought, the ball, races along a tunnel through the brain, and each boundary is a gate on its path. A gate opens when Φ, the limbic field, is above its height (gold: closed, teal: open); a closed gate stops the thought.',
    8: 'POKE at a closed gate and the thought tries to tunnel through, with chance exp(−3 × the gap), never zero (LimbicTunnel.lean, wkbAmplitude_pos); RESOURCE lowers every gate a little (J(t)). Which path a thought takes is set by which gates are open.',
    11: 'The walls are the fractal of the level: dendrites, or Menger cubes for networks (the city of code\'s towers); at the centre of the loop floats a Mandelbulb, the mind. Interpretive pictures around a simulated rule.',
  },
  ureter: {
    title: 'THE URETER', label: 'interpretive',
    4: 'The view down a ureteroscope: smooth-muscle walls with waves of peristalsis, urine flowing. A stone blocks the path; the flow dams behind it and the colic rises (the red pulse). Unlike the gates of PATH, a stone is mechanical: Φ, calm or alarm, does not open it. POKE is the laser: three shots break it to dust, the flow returns and the colic eases. Or WALL: turn to the wall and POKE (it boings back), then ride the elevator ▼ down the scales, cell, membrane, molecule, atom, until an electron tunnels through a 0.2 nm gap: the same barrier, a different rule at each scale.',
    8: 'Electrical layer: visceral pain travels as C-fibre signals to the spinal cord and on to the insula, and the body answers (heart rate, guarding). Raise Φ and the same stone hurts more: the alarm amplifies the signal.',
    11: 'A teaching picture, not medical advice or a model of any patient.',
  },
  score: {
    title: 'THE RIVER FILM · SCORE', label: 'interpretive',
    4: 'The Tensor (the film paper): a film defined as an emotional score, seven modes over story-time, rendered here as the Mandelbulb. Awe sets its power, safety its warmth and light, fear a cold hue and hard edges, grief takes the colour out and slows the orbit, pre-verbal deepens the fractal, curiosity sets how far in the camera goes. Words fade with the Language mode.',
    8: 'At each threshold the film holds until the viewer is ready. The somatic loop (♥: the slider, or a chest strap): LOOP cycles Projection (the score drives), Resonance and Mirror (the heart drives, the score is the target; white ticks). ♥ STRAP connects a Bluetooth chest strap (Chrome or Edge), which then drives the heart. With the loop on, a rising heart (Ḣ > 0, the paper\'s primary signal) slows the film, and at a threshold it waits for the heart to settle; POKE crosses. Velocity: kv (0.1 to 3; 90 minutes at 1). The other knobs, in the address: kd depth (0 to 1: how far into the pre-verbal attractor, and how long a threshold holds), kt texture (0 smooth to 1 granular), kw coupling (0.5 to 2, the score\'s W*: fear drives awe, awe grief, language and pre-verbal hold each other down), km the modes rendered (e.g. km=S,F,A). SETTING (kc): the same score in the mind, the river (the boat on the water), the body (the submarine in the bloodstream) or the session (client and therapist): one player, the same thresholds at the same story-times (the paper\'s Trilogy of Containers). The full River Film, 90 minutes, H-AL speaking each phase: ?film=1#voyage=score&st=0&kv=1&kc=river (MUSIC on). FILM (kf) picks the film: the River Film or the 2021 film. TWIN (tw=1): one film, two viewers, side by side on the river: left the viewer of now, right a VIEWER preset (pv: as I was in 2021, fitted from the two films; neutral; or a model condition) plus the ADHD, ASD and C-PTSD sliders (ca, cs, cp: P13\'s model operators, hypotheses, not diagnoses); the knobs and the heart move both. WORDS (kx): how much language the film gives, from NUMBER (only its number, as Rothko numbered his pictures) through TITLE and CARDS (silent-film intertitles) to CAPTIONS and NARRATION; each press is one notch fewer, and after a viewing the film suggests trying the next one down. A/B (ab): on one screen, flip the whole film between A, as it is, and B, the same film for the VIEWER preset (your version), with the same knobs and heart; A/B is per window, so in a LAYOUT the screen beneath the main one can show B while the main one shows A. PILOT (ap): AUTOPILOT, H-AL flies the feelings and thinks aloud as each moves (modelled feeling, not a claim that the AI feels); CO-PILOT, you take one knob at a time, fear first, and each finished journey hands over one more; MANUAL, every knob is yours. The journey starts still: POKE to begin. MUSIC plays the score: the chord darkens with fear, the grain rises as words fade, and a soft heartbeat keeps your pace. MIDI OUT (Engine Room) sends the score to Ableton or any synth: the seven modes, the heart and story-time as knobs, phases and thresholds as notes. EDIT: your own film, the seven modes over story-time; drag a point, give it the sentence it came from (docs/INTERVIEW.md), PLAY MINE, SAVE; kept in this browser only.',
  },
  flight: {
    title: 'FLY', label: 'interpretive',
    4: 'A slow flight through the world of the level you are on, one natural form per scale: the cosmic web, the quantum foam, an inner sea of coral and flowers, a murmuration, folded rock, a network. Everything drifts in one current, the fluid. Φ is the speed; POKE is a surge. At Whole Brain the world is the Mandelbulb, the mind, and you dive into it: the surface keeps unfolding as you fall (zoom ×40,000), Φ is how fast you fall, POKE pushes you deeper, and each dive ends in a burst and starts again somewhere new. Pick another floor in the elevator (FLY ▸) to fly somewhere else; MUSIC adds calm sound (off by default).',
    11: 'The forms are pictures of each scale, not data: an invitation to look inward the way the programme looks outward.',
  },
  neuron: {
    title: 'ONE NEURON', label: 'simulated',
    4: 'A neuron: the dendrites (left) gather, the cell body decides and the axon (right) sends. Myelin wraps the axon.',
    8: 'Action potentials: all-or-nothing spikes jump from gap to gap along the myelin. The trace is the membrane voltage; Φ raises the firing rate, and POKE fires one spike.',
    11: 'Each spike adds to the field around the axon, which can nudge a neighbour (ephaptic coupling: small, but measured in tissue). Its role in experience is an open hypothesis.',
  },
  network: {
    title: 'MEMORY NETWORK', label: 'simulated',
    4: 'Where the project started: a Hopfield network (1982) stores memories as stable patterns. Here 49 cells hold three: SAFE, FIGHT and FREEZE.',
    8: 'Recall the 2020 way: the state is compared with every memory and pulled towards the best match (the lines are the softmax attention). POKE scrambles it; watch it find its way back.',
    11: 'The limbic layer (FM-HN): Φ heats the network. Cold, recall is sharp and the state stays stuck; hot, the memories blur and it can move. RESOURCE adds a pull towards SAFE.',
  },
  landscape: {
    title: 'THE LANDSCAPE OF STATES', label: 'simulated',
    4: 'The same three memories as valleys of the energy E (missing limbic layer paper); the ball is the person\'s state. Calm: deep valleys, and the ball stays where it is, even in FREEZE. Raise Φ past the middle and the valleys melt into one. RESOURCE (the therapist\'s J(t), Gestalt paper) tilts the ground towards SAFE; lower Φ again and the ball settles somewhere new.',
    8: 'In 3D, the country (8D): plains around the mountains that swell and move with Φ, the limbic field.',
    11: 'And the city of code (11D) on the horizon, the formal mind, as in the film Hackers: each tower is a concept of the programme with its Lean theorem, taller for stronger evidence (kernel-verified tallest; Sherlock), or a level\'s equation; circuit streets run down to the mountains. Interpretive.',
  },
};

const COLORS = {
  bg0: '#070a16', bg1: '#140a1c', teal: '#3fd0c9', cyan: '#5ee7ff', violet: '#a78bfa', gold: '#ffd166',
  red: '#ff4d5e', orange: '#ff9a3c', ice: '#8ecbff', ink: '#e8eefc', dim: 'rgba(232,238,252,0.55)',
};
const OUTSIDE_BG = '#0b1226';
const MEMORY_COLORS = { safe: COLORS.teal, fight: COLORS.red, freeze: COLORS.ice };

// ---------------------------------------------------------------- drawing helpers

function polyline(points) {
  const segs = [];
  let total = 0;
  for (let i = 0; i + 1 < points.length; i++) {
    const len = Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
    segs.push(len);
    total += len;
  }
  return { points, segs, total };
}

function along(pl, s) {
  let d = clamp(s, 0, 1) * pl.total;
  for (let i = 0; i < pl.segs.length; i++) {
    if (d <= pl.segs[i] || i === pl.segs.length - 1) {
      const f = pl.segs[i] ? clamp(d / pl.segs[i], 0, 1) : 0;
      return [lerp(pl.points[i][0], pl.points[i + 1][0], f), lerp(pl.points[i][1], pl.points[i + 1][1], f)];
    }
    d -= pl.segs[i];
  }
  return pl.points[pl.points.length - 1];
}

function strokePath(ctx, u, points, smooth = false) {
  ctx.beginPath();
  ctx.moveTo(points[0][0] * u, points[0][1] * u);
  if (!smooth || points.length < 3) {
    for (const p of points.slice(1)) ctx.lineTo(p[0] * u, p[1] * u);
    return;
  }
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i][0] + points[i + 1][0]) / 2;
    const my = (points[i][1] + points[i + 1][1]) / 2;
    ctx.quadraticCurveTo(points[i][0] * u, points[i][1] * u, mx * u, my * u);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last[0] * u, last[1] * u);
}

function closedSmooth(ctx, u, points) {
  const n = points.length;
  const mid = i => [(points[i][0] + points[(i + 1) % n][0]) / 2, (points[i][1] + points[(i + 1) % n][1]) / 2];
  ctx.beginPath();
  const start = mid(n - 1);
  ctx.moveTo(start[0] * u, start[1] * u);
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    ctx.quadraticCurveTo(points[i][0] * u, points[i][1] * u, m[0] * u, m[1] * u);
  }
  ctx.closePath();
}

function glow(ctx, u, x, y, r, color, alpha) {
  if (alpha <= 0 || r <= 0) return;
  const g = ctx.createRadialGradient(x * u, y * u, 0, x * u, y * u, r * u);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x * u, y * u, r * u, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function dot(ctx, u, x, y, r, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x * u, y * u, r * u, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function ripples(ctx, u, x, y, t, period, maxR, color, alpha, squash = 1) {
  ctx.save();
  const base = ctx.globalAlpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = Math.max(1, 0.006 * u);
  for (let k = 0; k < 4; k++) {
    const phase = ((t / period) + k / 4) % 1;
    ctx.globalAlpha = base * alpha * (1 - phase);
    ctx.beginPath();
    ctx.ellipse(x * u, y * u, phase * maxR * u, phase * maxR * u * squash, 0, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();
}

function label(ctx, u, text, x, y, color = COLORS.ink, align = 'center', size = 0.034) {
  ctx.save();
  ctx.font = `600 ${Math.max(10, size * u)}px 'Space Mono', ui-monospace, monospace`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(5,7,14,0.85)';
  ctx.strokeText(text, x * u, y * u);
  ctx.fillStyle = color;
  ctx.fillText(text, x * u, y * u);
  ctx.restore();
}

function leader(ctx, u, text, from, to, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha *= 0.6;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(from[0] * u, from[1] * u);
  ctx.lineTo(to[0] * u, to[1] * u);
  ctx.stroke();
  ctx.restore();
  label(ctx, u, text, to[0], to[1] + (to[1] > from[1] ? 0.025 : -0.025), color, 'center', 0.03);
}

// Impulses travelling along polylines: spawn at a rate, move at a speed, fade at the end.
function makeTraffic() {
  const items = [];
  return {
    items,
    spawn(path, { travel = 1, color = COLORS.cyan, reverse = false, size = 0.014, onArrive = null } = {}) {
      items.push({ path, s: 0, travel, color, reverse, size, onArrive });
    },
    tick(dt) {
      for (const item of items) {
        item.s += dt / item.travel;
        if (item.s >= 1 && item.onArrive) {
          item.onArrive();
          item.onArrive = null;
        }
      }
      for (let i = items.length - 1; i >= 0; i--) if (items[i].s > 1.05) items.splice(i, 1);
    },
    draw(ctx, u) {
      for (const item of items) {
        const s = item.reverse ? 1 - item.s : item.s;
        const [x, y] = along(item.path, s);
        glow(ctx, u, x, y, item.size * 3.2, item.color, 0.55);
        dot(ctx, u, x, y, item.size * 0.55, '#ffffff', 0.95);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: body

const NERVES = {
  spine: [[0, -0.68], [0, -0.3], [0, 0.05]],
  armL: [[0, -0.58], [-0.24, -0.57], [-0.32, -0.28], [-0.4, 0.06]],
  armR: [[0, -0.58], [0.24, -0.57], [0.32, -0.28], [0.4, 0.06]],
  legL: [[0, 0.05], [-0.1, 0.08], [-0.12, 0.45], [-0.13, 0.84]],
  legR: [[0, 0.05], [0.1, 0.08], [0.12, 0.45], [0.13, 0.84]],
  vagusHeart: [[0, -0.68], [0.035, -0.58], [0.07, -0.45]],
  vagusGut: [[0, -0.68], [-0.035, -0.5], [-0.045, -0.3], [0, -0.14]],
};
const BODY_REGIONS = {
  head: [[0, -0.8, 0.17]], throat: [[0, -0.63, 0.07]], chest: [[0, -0.43, 0.21]], belly: [[0, -0.14, 0.17]],
  arms: [[-0.28, -0.45, 0.1], [0.28, -0.45, 0.1], [-0.35, -0.16, 0.1], [0.35, -0.16, 0.1]],
  hands: [[-0.41, 0.09, 0.08], [0.41, 0.09, 0.08]],
  legs: [[-0.11, 0.28, 0.13], [0.11, 0.28, 0.13], [-0.125, 0.66, 0.13], [0.125, 0.66, 0.13]],
};

const BODY_SCALE = 0.86;
const BODY_SHIFT = 0.1;

function bodyShape(ctx, u, widen = 0) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const limb = (points, width) => {
    ctx.lineWidth = (width + widen) * u;
    strokePath(ctx, u, points);
    ctx.stroke();
  };
  ctx.beginPath();
  ctx.arc(0, -0.8 * u, (0.115 + widen / 2) * u, 0, TAU);
  ctx.fill();
  limb([[0, -0.7], [0, -0.6]], 0.09);
  ctx.lineWidth = (0.05 + widen) * u;
  ctx.beginPath();
  for (const [i, p] of [[-0.24, -0.59], [0.24, -0.59], [0.2, -0.2], [0.17, 0.1], [-0.17, 0.1], [-0.2, -0.2]].entries()) {
    if (i) ctx.lineTo(p[0] * u, p[1] * u);
    else ctx.moveTo(p[0] * u, p[1] * u);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  limb([[-0.25, -0.56], [-0.33, -0.28], [-0.4, 0.06]], 0.085);
  limb([[0.25, -0.56], [0.33, -0.28], [0.4, 0.06]], 0.085);
  limb([[-0.1, 0.06], [-0.12, 0.45], [-0.13, 0.86]], 0.12);
  limb([[0.1, 0.06], [0.12, 0.45], [0.13, 0.86]], 0.12);
}

function heatColor(v, a) {
  if (v >= 0) return `rgba(255,${Math.round(lerp(225, 70, v))},${Math.round(lerp(90, 50, v))},${a})`;
  return `rgba(90,150,255,${a})`;
}

function makeBody() {
  const nerves = Object.fromEntries(Object.entries(NERVES).map(([k, v]) => [k, polyline(v)]));
  const traffic = makeTraffic();
  const off = document.createElement('canvas');
  let beatPhase = 0;
  return {
    focus: [0, -0.8 * BODY_SCALE + BODY_SHIFT],
    enter: [0.06 * BODY_SCALE, -0.45 * BODY_SCALE + BODY_SHIFT],
    tick(env) {
      beatPhase += env.dt * (60 + 60 * env.phi) / 60;
      if (env.dim < 8) return;
      const rate = 0.5 + 3 * env.phi;
      for (const name of ['armL', 'armR', 'legL', 'legR', 'spine']) {
        if (Math.random() < rate * env.dt) traffic.spawn(nerves[name], { travel: 1.3 - 0.5 * env.phi, color: COLORS.cyan, reverse: Math.random() < 0.5 });
      }
      for (const name of ['vagusHeart', 'vagusGut']) {
        if (Math.random() < (0.6 + 1.5 * env.phi) * env.dt) traffic.spawn(nerves[name], { travel: 0.9, color: COLORS.gold, reverse: Math.random() < 0.7 });
      }
      traffic.tick(env.dt);
    },
    poke(strength) {
      for (const pl of Object.values(nerves)) traffic.spawn(pl, { travel: 0.7, color: COLORS.orange, size: 0.012 + 0.01 * strength });
    },
    // the body is drawn a little smaller and lower, below the toolbar and the feelings row
    draw(ctx, outer) {
      ctx.save();
      ctx.translate(0, BODY_SHIFT * outer.u);
      drawBody(ctx, { ...outer, u: outer.u * BODY_SCALE, cy: outer.cy + BODY_SHIFT * outer.u });
      ctx.restore();
    },
  };

  function drawBody(ctx, env) {
      const { u, w, h, dpr, cx, cy, dim, phi } = env;
      const f = env.fieldCtx ?? ctx; // near layer in 3D SBS
      if (dim >= 11) {
        const lines = 6;
        f.save();
        f.strokeStyle = COLORS.violet;
        f.lineWidth = 1.2;
        for (let k = 0; k < lines; k++) {
          f.globalAlpha = env.alpha * (0.22 - k * 0.025);
          f.beginPath();
          for (let i = 0; i <= 96; i++) {
            const a = (i / 96) * TAU;
            const wob = 1 + 0.03 * (1 + phi) * Math.sin(5 * a + env.t * (1.2 + k * 0.2) + k);
            const rx = (0.5 + k * 0.08) * wob;
            const ry = (0.98 + k * 0.05) * wob;
            const x = Math.cos(a) * rx * u;
            const y = (Math.sin(a) * ry - 0.0) * u;
            if (i) f.lineTo(x, y);
            else f.moveTo(x, y);
          }
          f.stroke();
        }
        f.restore();
        ripples(f, u, 0.06, -0.45, env.t, 1.6 - 0.6 * phi, 1.0, COLORS.cyan, 0.35);
        ripples(f, u, 0, -0.8, env.t + 0.4, 2.2, 0.7, COLORS.violet, 0.3);
      }
      // outline glow, then the body filled on an offscreen canvas (heat clipped to it)
      ctx.save();
      ctx.globalAlpha *= 0.55;
      ctx.fillStyle = ctx.strokeStyle = 'rgba(63,208,201,0.35)';
      bodyShape(ctx, u, 0.018);
      ctx.restore();
      if (off.width !== Math.round(w * dpr) || off.height !== Math.round(h * dpr)) {
        off.width = Math.round(w * dpr);
        off.height = Math.round(h * dpr);
      }
      const o = off.getContext('2d');
      o.setTransform(1, 0, 0, 1, 0, 0);
      o.clearRect(0, 0, off.width, off.height);
      o.setTransform(dpr, 0, 0, dpr, cx * dpr, cy * dpr);
      o.fillStyle = o.strokeStyle = '#10313a';
      bodyShape(o, u);
      o.globalCompositeOperation = 'source-atop';
      const feel = FEELINGS[env.feel] ?? FEELINGS.calm;
      const intensity = 0.55 + 0.45 * phi;
      for (const [region, spots] of Object.entries(BODY_REGIONS)) {
        const v = feel[region] ?? 0;
        if (!v) continue;
        for (const [x, y, r] of spots) {
          const a = clamp(Math.abs(v) * intensity, 0, 1) * 0.9;
          const g = o.createRadialGradient(x * u, y * u, 0, x * u, y * u, r * 1.5 * u);
          g.addColorStop(0, heatColor(v, a));
          g.addColorStop(1, heatColor(v, 0));
          o.fillStyle = g;
          o.fillRect((x - r * 1.5) * u, (y - r * 1.5) * u, r * 3 * u, r * 3 * u);
        }
      }
      const beat = Math.exp(-((beatPhase % 1) * 7));
      const hg = o.createRadialGradient(0.06 * u, -0.45 * u, 0, 0.06 * u, -0.45 * u, (0.05 + 0.04 * beat) * u);
      hg.addColorStop(0, `rgba(255,60,80,${0.5 + 0.5 * beat})`);
      hg.addColorStop(1, 'rgba(255,60,80,0)');
      o.fillStyle = hg;
      o.fillRect(-0.1 * u, -0.6 * u, 0.32 * u, 0.32 * u);
      o.globalCompositeOperation = 'source-over';
      ctx.drawImage(off, -cx, -cy, w, h);
      if (dim >= 8) {
        ctx.save();
        ctx.strokeStyle = 'rgba(94,231,255,0.28)';
        ctx.lineWidth = Math.max(1, 0.005 * u);
        for (const pl of Object.values(nerves)) {
          strokePath(ctx, u, pl.points);
          ctx.stroke();
        }
        ctx.restore();
        glow(ctx, u, 0, -0.8, 0.11, COLORS.violet, 0.4 + 0.4 * phi);
        traffic.draw(ctx, u);
      }
      if (env.labels) {
        label(ctx, u, `${Math.round(60 + 60 * phi)} BPM`, 0.5, -0.45, COLORS.red, 'left', 0.03);
        label(ctx, u, feel.label, 0.5, -0.36, COLORS.gold, 'left', 0.03);
        if (dim >= 8) label(ctx, u, 'VAGUS', -0.17, -0.3, COLORS.gold, 'center', 0.026);
      }
  }
}

// ---------------------------------------------------------------- stop: brain

const CEREBRUM = [[-0.62, -0.02], [-0.58, -0.22], [-0.44, -0.38], [-0.2, -0.47], [0.08, -0.48], [0.34, -0.42], [0.54, -0.28],
  [0.63, -0.08], [0.6, 0.1], [0.5, 0.2], [0.3, 0.22], [0.18, 0.28], [0.0, 0.36], [-0.2, 0.36], [-0.36, 0.28], [-0.42, 0.16], [-0.55, 0.12]];
const BRAIN = {
  thalamus: [0.06, 0.0], hypothalamus: [-0.07, 0.13], amygdala: [-0.15, 0.22], prefrontal: [-0.45, -0.12], sensory: [0.3, -0.3],
  hippocampus: [[-0.12, 0.24], [-0.02, 0.27], [0.12, 0.24], [0.22, 0.16], [0.24, 0.08]],
  cingulate: [[-0.3, 0.02], [-0.28, -0.14], [-0.12, -0.24], [0.1, -0.25], [0.28, -0.16], [0.32, 0.0]],
  callosum: [[-0.24, 0.03], [-0.2, -0.1], [-0.06, -0.17], [0.12, -0.17], [0.24, -0.1], [0.27, 0.02]],
};

// THOUGHTS (ISS-077): thoughts as neural avalanches (Beggs and Plenz 2003). Each burst is
// a cascade of a critical branching process: every active unit wakes two neighbours with
// probability sigma / 2 each; at sigma = 1 the sizes follow a power law, P(s) ~ s^-3/2, many
// small, a few large ("loads of them, louder, softer"). A burst that spreads far is
// ignition (the global workspace: a thought becoming conscious). The conditions are P13's
// model operators, pictures, not diagnoses: ADHD more bursts, ASD fewer and focused,
// C-PTSD echoes (a burst comes back, fading, as in a cathedral).
export const IGNITION = 1000;
// FX off in the cathedral: the honest drawing. The ventricles in a side view (front to the
// left), in the order the cave is flown: fourth ventricle, aqueduct, third ventricle, the
// interventricular foramen, the lateral ventricle's body, the atrium, the temporal horn.
// Schematic positions within the brain outline, not measurements.
const VENTRICLE_ROUTE = [[0.28, 0.34], [0.25, 0.27], [0.2, 0.17], [0.15, 0.1], [0.07, 0.05], [0.02, 0.0], [-0.07, -0.05],
  [-0.2, -0.13], [0.02, -0.2], [0.26, -0.1], [0.24, 0.06], [0.1, 0.16]];
const VENTRICLE_LABELS = [['FOURTH VENTRICLE', [0.28, 0.34], [0.55, 0.5]], ['AQUEDUCT', [0.18, 0.15], [0.5, 0.25]],
  ['THIRD VENTRICLE', [0.05, 0.03], [0.62, 0.05]], ['FORAMEN', [-0.07, -0.05], [-0.55, 0.1]],
  ['LATERAL VENTRICLE (body)', [-0.08, -0.18], [-0.45, -0.55]], ['ATRIUM', [0.26, -0.1], [0.55, -0.35]], ['TEMPORAL HORN', [0.14, 0.15], [-0.2, 0.45]]];
// VISUAL THOUGHTS: a burst this large becomes a bubble with a picture (in the cathedral)
export const VISUAL = 60;
const THOUGHT_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';
const CONCEPT_TINT = { soma: '#ff7aa8', wave: '#5ee7ff', cosmic: '#a78bfa', quantum: '#ffd166', neural: '#3fd0c9', earth: '#8ecbff', generic: '#e8eefc' };
function randomThought() {
  const list = thoughtImages ?? [];
  if (!list.length) return null;
  const t = list[Math.floor(Math.random() * list.length)];
  return { ...t, src: `${THOUGHT_BASE}${t.src}` };
}
// the explorer's full-screen view of a popped bubble (set by createExplorer)
let popHandler = null;
// ONE BODY (ISS-077): the stone in the ureter and the mind-body loop, shared by every stop, so
// the ureter's waves reach the head and the head's tension and breath reach the ureter. The
// loop is on when LOOP is pressed at the ureter or the brain (st.body).
const BODY = { ureter: createUreterModel(), loop: createSomaLoop() };
function bodyStep(env) {
  const on = Boolean(env.body);
  BODY.ureter.setStage(env.uo ?? 0);
  BODY.ureter.step(env.dt, on ? { phi: BODY.loop.phi, gain: BODY.loop.bodyGain } : { phi: env.phi });
  if (on) BODY.loop.step(env.dt, { pain: BODY.ureter.pain, ca: env.ca ?? 0, cs: env.cs ?? 0, cp: env.cp ?? 0, mindful: Boolean(env.mindful) });
}

export function avalancheSize(sigma = 1, rand = Math.random, cap = 5000) {
  let active = 1;
  let size = 1;
  while (active > 0 && size < cap) {
    let next = 0;
    for (let i = 0; i < active; i++) {
      if (rand() < sigma / 2) next += 1;
      if (rand() < sigma / 2) next += 1;
    }
    active = next;
    size += next;
  }
  return Math.min(size, cap);
}

const THOUGHT_MODES = ['S', 'F', 'C', 'A', 'G', 'L', 'PV'];

function makeBrain() {
  const rand = seeded(7);
  // THOUGHTS: the bursts on screen, and their echoes
  const bursts = [];
  let ignited = 0;
  let caveGl = null;
  let lastCp = 0;
  const gyri = [];
  while (gyri.length < 30) {
    const x = lerp(-0.58, 0.58, rand());
    const y = lerp(-0.44, 0.3, rand());
    if ((x / 0.6) ** 2 + ((y + 0.06) / 0.4) ** 2 > 1) continue;
    const pts = [[x, y]];
    let a = rand() * TAU;
    for (let k = 0; k < 4; k++) {
      a += (rand() - 0.5) * 2.2;
      const p = pts[pts.length - 1];
      pts.push([p[0] + Math.cos(a) * 0.05, p[1] + Math.sin(a) * 0.05]);
    }
    gyri.push(pts);
  }
  const roads = {
    low: polyline([BRAIN.thalamus, [-0.05, 0.12], BRAIN.amygdala]),
    high: polyline([BRAIN.thalamus, BRAIN.sensory, [-0.1, -0.4], BRAIN.prefrontal, BRAIN.amygdala]),
    out: polyline([BRAIN.amygdala, BRAIN.hypothalamus, [0.1, 0.3], [0.2, 0.6]]),
  };
  const traffic = makeTraffic();
  let flash = 0;
  let phiNow = 0;
  // PAIN (ISS-077): the path of a visceral pain, from the spinal cord (the spinothalamic
  // tract) to the thalamus, then the pain neuromatrix: the insula, the anterior cingulate and
  // the sensory cortex. Each pulse lights them; fear (Phi) makes the same signal louder (P1's
  // W between fear and pain modes); chronic, they stay lit between pulses.
  const INSULA = [-0.13, 0.04];
  const ACC = BRAIN.cingulate[2];
  const pain = {
    clock: 0,
    lit: { insula: 0, acc: 0, s1: 0, thalamus: 0 },
    up: polyline([[0.24, 0.64], [0.2, 0.45], [0.14, 0.24], BRAIN.thalamus]),
    out: { insula: polyline([BRAIN.thalamus, INSULA]), acc: polyline([BRAIN.thalamus, [-0.02, -0.12], ACC]), s1: polyline([BRAIN.thalamus, [0.2, -0.15], BRAIN.sensory]) },
  };
  const painPulse = () => {
    const loud = 0.5 + phiNow;
    traffic.spawn(pain.up, { travel: 0.7, color: '#ff3048', size: 0.012 + 0.01 * loud, onArrive: () => {
      pain.lit.thalamus = Math.min(1.5, pain.lit.thalamus + 0.6 * loud);
      for (const [k, path] of Object.entries(pain.out)) {
        traffic.spawn(path, { travel: 0.45, color: '#ff3048', size: 0.01 + 0.008 * loud, onArrive: () => { pain.lit[k] = Math.min(1.5, pain.lit[k] + 0.7 * loud); } });
      }
    } });
  };
  const alarm = () => {
    flash = 1;
    if (Math.random() < 0.2 + phiNow) traffic.spawn(roads.out, { travel: 0.8, color: COLORS.orange });
  };
  function event(strength = 0) {
    traffic.spawn(roads.low, { travel: 0.35, color: COLORS.red, size: 0.014 + strength * 0.008, onArrive: alarm });
    traffic.spawn(roads.high, { travel: 1.5, color: COLORS.cyan });
  }
  return {
    focus: [-0.05, 0.12],
    tick(env) {
      const loop = env.body ? BODY.loop : null;
      phiNow = loop ? loop.phi : env.phi;
      if (env.thoughts || loop) {
        const ca = env.ca ?? 0, cs = env.cs ?? 0, cp = env.cp ?? 0;
        const rate = (3 + 4 * phiNow) * (1 + 3 * ca) * (1 - 0.6 * cs);
        // the body's pain lands in the head: pain bursts, near the sensory cortex and insula
        if (loop && Math.random() < loop.painShare() * rate * env.dt) {
          const at = Math.random() < 0.5 ? BRAIN.sensory : [-0.13, 0.04];
          bursts.push({ x: at[0] + (Math.random() - 0.5) * 0.12, y: at[1] + (Math.random() - 0.5) * 0.12, size: avalancheSize(1) + 20, mode: 'pain', age: 0, life: 1.4, gain: 1, echo: 0 });
        }
        if (Math.random() < rate * env.dt) {
          const size = avalancheSize(1);
          // ASD: bursts gather near one place (monotropism); otherwise anywhere in the cortex
          let x, y;
          do { x = lerp(-0.55, 0.55, Math.random()); y = lerp(-0.42, 0.28, Math.random()); } while ((x / 0.6) ** 2 + ((y + 0.06) / 0.4) ** 2 > 0.9);
          if (cs > 0) { x = lerp(x, -0.3, cs * 0.8); y = lerp(y, -0.2, cs * 0.8); }
          // fear more likely as the field heats
          const mode = Math.random() < 0.15 + 0.4 * phiNow ? 'F' : THOUGHT_MODES[Math.floor(Math.random() * THOUGHT_MODES.length)];
          bursts.push({ x, y, size, mode, age: 0, life: (0.9 + 0.5 * Math.log10(size + 1)) * (env.mindful ? 1.6 : 1), gain: env.mindful ? 0.7 : 1, echo: 0 });
          if (size >= IGNITION) ignited = 2.5;
          // C-PTSD: the burst returns off the walls, fading, the longer the higher cp
          if (cp > 0.05) for (let k = 1; k <= Math.round(2 + 6 * cp); k++) bursts.push({ x: x + (Math.random() - 0.5) * 0.06, y: y + (Math.random() - 0.5) * 0.06, size, mode, age: -0.55 * k, life: 0.9 + 0.5 * Math.log10(size + 1), gain: Math.pow(0.55 + 0.35 * cp, k), echo: k });
        }
        // THOUGHT POKES THOUGHT: a large burst sets off its neighbours, a chain, not a flash
        for (const b of bursts) {
          if (!env.mindful && !b.sparked && b.age > 0.25 && b.size >= 30 && !b.echo) {
            b.sparked = true;
            const n = Math.min(4, Math.floor(Math.log10(b.size)));
            for (let k = 0; k < n; k++) {
              if (bursts.length > 160) break;
              const a = Math.random() * TAU, d = 0.06 + 0.06 * Math.random();
              bursts.push({ x: b.x + Math.cos(a) * d, y: b.y + Math.sin(a) * d, size: Math.max(2, Math.floor(b.size / (3 + 3 * Math.random()))), mode: b.mode, age: -0.05 * k, life: 0.9, gain: 0.85, echo: 0, from: [b.x, b.y] });
            }
          }
        }
        for (const b of bursts) b.age += env.dt;
        for (let i = bursts.length - 1; i >= 0; i--) if (bursts[i].age > bursts[i].life) bursts.splice(i, 1);
        ignited = Math.max(0, ignited - env.dt);
      } else bursts.length = 0;
      flash = Math.max(0, flash - env.dt * 2.5);
      if (env.pain) {
        // colic comes in waves: a pulse about every second
        pain.clock += env.dt;
        if (pain.clock > 0.9) { pain.clock = 0; painPulse(); }
      }
      // acute: the lit regions fade between pulses; chronic: they barely fade
      const fade = env.pain === 'chronic' ? 0.08 : 1.4;
      for (const k of Object.keys(pain.lit)) pain.lit[k] = Math.max(env.pain === 'chronic' ? 0.45 : 0, pain.lit[k] - env.dt * fade);
      if (env.dim >= 8 && Math.random() < (0.35 + 1.4 * env.phi) * env.dt) event();
      traffic.tick(env.dt);
    },
    poke(strength) {
      if (caveGl) {
        caveGl.burst(Math.max(20, avalancheSize(1)), lastCp);
        const img = randomThought();
        caveGl.bubble(img, CONCEPT_TINT[img?.concept] ?? '#ffffff', 0.85);
        return;
      }
      event(strength);
    },
    draw(ctx, env) {
      const { u, phi, dim, t } = env;
      caveGl = env.cave && env.gl?.burst ? env.gl : null;
      lastCp = env.cp ?? 0;
      if (caveGl) {
        caveGl.vividness = env.vivid ?? 0.8;
        caveGl.outside = env.caveOut;
        caveGl.onPop = img => popHandler?.(img);
        caveGl.render({ time: t, phi, speed: 0.004 + 0.006 * phi, stereo: env.stereo });
        // FX off: no stone, no light show; the anatomy as it is, and where the voyage is
        if (phi < 0.05) {
          const W = env.w / 2 / u, H = env.h / 2 / u;
          ctx.save();
          ctx.fillStyle = '#0b0d16';
          ctx.fillRect(-W * u, -H * u, 2 * W * u, 2 * H * u);
          closedSmooth(ctx, u, CEREBRUM);
          ctx.strokeStyle = 'rgba(232,238,252,0.55)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = 'rgba(94,231,255,0.35)';
          ctx.lineWidth = 0.05 * u;
          strokePath(ctx, u, VENTRICLE_ROUTE, true);
          ctx.stroke();
          ctx.strokeStyle = '#5ee7ff';
          ctx.lineWidth = 2;
          strokePath(ctx, u, VENTRICLE_ROUTE, true);
          ctx.stroke();
          ctx.restore();
          const [px, py] = along(polyline(VENTRICLE_ROUTE), caveGl.u);
          dot(ctx, u, px, py, 0.022, '#ffd166', 1);
          if (env.labels) {
            for (const [name, at, to] of VENTRICLE_LABELS) leader(ctx, u, name, at, to, name === caveGl.hall.replace(/^THE NAVE: |^THE CROSSING: |^THE /, '').replace('LATERAL VENTRICLE', 'LATERAL VENTRICLE (body)') ? '#ffd166' : '#5ee7ff');
            label(ctx, u, `FX OFF: THE VENTRICLES · you are in ${caveGl.hall}`, 0, -0.72, '#e8eefc', 'center', 0.032);
            label(ctx, u, 'a side view, front to the left; schematic positions; the cave is filled with cerebrospinal fluid · raise FX for the cathedral', 0, -0.65, COLORS.dim, 'center', 0.02);
          }
          return;
        }
        // thoughts in the stone; the large ones become visual thoughts, a picture in a bubble;
        // without THOUGHTS, a visual thought now and then
        const rate = env.thoughts ? (3 + 4 * phi) * (1 + 3 * (env.ca ?? 0)) * (1 - 0.6 * (env.cs ?? 0)) : 0.25;
        if (Math.random() < rate * env.dt) {
          const size = env.thoughts ? avalancheSize(1) : VISUAL * 2;
          if (env.thoughts) caveGl.burst(size, lastCp);
          if (size >= VISUAL) {
            const img = randomThought();
            caveGl.bubble(img, CONCEPT_TINT[img?.concept] ?? '#ffffff', Math.min(1, Math.log10(size) / Math.log10(IGNITION)));
          }
        }
        if (env.labels) {
          label(ctx, u, env.caveOut ? `THE CATHEDRAL FROM OUTSIDE · the visitor is in ${caveGl.hall} (the white spire)` : `THE CATHEDRAL · ${caveGl.hall}`, 0, -0.72, '#e8d8ff', 'center', 0.034);
          label(ctx, u, 'the ventricles, the brain\'s own cave, full of cerebrospinal fluid; the curtains are the choroid plexus; the light is the field', 0, -0.65, COLORS.dim, 'center', 0.02);
          label(ctx, u, `VISUAL THOUGHTS: the programme's own figures in bubbles; come close or click one to pop in · VIVIDNESS ${Math.round(100 * (env.vivid ?? 0.8))}%${(env.vivid ?? 0.8) < 0.05 ? ' (aphantasia: the bubble, no picture)' : ''}`, 0, 0.78, '#ffd166', 'center', 0.02);
          label(ctx, u, `POKE: a thought in the stone${(env.cp ?? 0) > 0.05 ? ' · C-PTSD: it echoes, and so does the music' : ''}${env.thoughts ? ' · THOUGHTS: avalanches in the walls' : ''} · FX: the field's light`, 0, 0.84, COLORS.violet, 'center', 0.02);
        }
        return;
      }
      // cerebellum and brainstem behind the cerebrum
      ctx.save();
      ctx.fillStyle = '#24182a';
      ctx.strokeStyle = 'rgba(255,190,200,0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0.42 * u, 0.3 * u, 0.18 * u, 0.1 * u, -0.15, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.lineCap = 'round';
      ctx.lineWidth = 0.09 * u;
      ctx.strokeStyle = '#2a1c30';
      strokePath(ctx, u, [[0.14, 0.24], [0.2, 0.45], [0.24, 0.64]]);
      ctx.stroke();
      ctx.restore();
      closedSmooth(ctx, u, CEREBRUM);
      const fill = ctx.createRadialGradient(-0.05 * u, -0.05 * u, 0.05 * u, 0, 0, 0.7 * u);
      fill.addColorStop(0, '#3a2440');
      fill.addColorStop(1, '#170d1c');
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.save();
      ctx.strokeStyle = 'rgba(255,190,200,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.clip();
      ctx.strokeStyle = 'rgba(255,190,200,0.16)';
      ctx.lineWidth = 2;
      for (const g of gyri) {
        strokePath(ctx, u, g, true);
        ctx.stroke();
      }
      glow(ctx, u, BRAIN.prefrontal[0], BRAIN.prefrontal[1], 0.2, '#6aa8ff', 0.55 * (1 - phi) + 0.05);
      // THOUGHTS: each burst a glow, louder for larger ones; medium ones in a thought bubble;
      // ignition washes the whole cortex
      if (env.thoughts || env.body) {
        if (ignited > 0) glow(ctx, u, -0.05, -0.05, 0.75, '#ffffff', 0.35 * Math.min(1, ignited));
        for (const b of bursts) {
          if (b.age < 0) continue;
          const f = b.age / b.life;
          const loud = Math.log10(b.size + 1) / Math.log10(IGNITION);
          const r = (0.02 + 0.09 * loud) * (0.6 + 0.6 * f);
          const a = (1 - f) * (0.25 + 0.75 * loud) * b.gain;
          const color = b.mode === 'pain' ? '#ff2a3c' : MODE_COLORS[b.mode] ?? '#ffffff';
          if (b.from && f < 0.5) {
            ctx.save();
            ctx.globalAlpha *= (1 - 2 * f) * 0.7;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(b.from[0] * u, b.from[1] * u);
            ctx.lineTo(b.x * u, b.y * u);
            ctx.stroke();
            ctx.restore();
          }
          glow(ctx, u, b.x, b.y, r * 1.8, color, a);
          if (b.size >= 8 && b.size < IGNITION && !b.echo && f < 0.7) {
            ctx.save();
            ctx.globalAlpha *= a;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse((b.x + r) * u, (b.y - r * 1.4) * u, r * 1.3 * u, r * 0.8 * u, 0, 0, TAU);
            ctx.moveTo((b.x + r * 0.3) * u, (b.y - r * 0.7) * u);
            ctx.lineTo(b.x * u, b.y * u);
            ctx.stroke();
            ctx.restore();
          }
          if (b.echo) {
            ctx.save();
            ctx.globalAlpha *= a * 0.8;
            ctx.strokeStyle = color;
            ctx.setLineDash([3, 5]);
            ctx.beginPath();
            ctx.arc(b.x * u, b.y * u, (r * 2 + 0.03 * b.echo) * u, 0, TAU);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      if (dim >= 11) {
        ripples(ctx, u, -0.05, 0.1, t, 1.3 - 0.5 * phi, 0.75, COLORS.cyan, 0.4, 0.75);
        ctx.strokeStyle = COLORS.violet;
        ctx.lineWidth = 1;
        for (let k = 0; k < 6; k++) {
          ctx.globalAlpha = env.alpha * 0.14;
          ctx.beginPath();
          for (let i = 0; i <= 60; i++) {
            const x = -0.65 + i * 0.022;
            const y = -0.42 + k * 0.14 + 0.025 * Math.sin(7 * x + 2 * t * (1 + phi) + k);
            if (i) ctx.lineTo(x * u, y * u);
            else ctx.moveTo(x * u, y * u);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
      // deep limbic structures
      ctx.save();
      ctx.lineCap = 'round';
      ctx.globalAlpha *= 0.9;
      for (const [path, color, width] of [[BRAIN.callosum, 'rgba(240,230,240,0.35)', 0.025], [BRAIN.cingulate, COLORS.violet, 0.03], [BRAIN.hippocampus, COLORS.gold, 0.032]]) {
        ctx.strokeStyle = color;
        ctx.lineWidth = width * u;
        strokePath(ctx, u, path, true);
        ctx.stroke();
      }
      ctx.restore();
      ctx.save();
      ctx.fillStyle = 'rgba(190,170,230,0.75)';
      ctx.beginPath();
      ctx.ellipse(BRAIN.thalamus[0] * u, BRAIN.thalamus[1] * u, 0.1 * u, 0.06 * u, 0, 0, TAU);
      ctx.fill();
      ctx.restore();
      dot(ctx, u, BRAIN.hypothalamus[0], BRAIN.hypothalamus[1], 0.035, COLORS.orange, 0.9);
      // PAIN: the neuromatrix lit
      if (env.pain || Object.values(pain.lit).some(v => v > 0.01)) {
        for (const [k, [x, y], r] of [['insula', INSULA, 0.11], ['acc', ACC, 0.1], ['s1', BRAIN.sensory, 0.12], ['thalamus', BRAIN.thalamus, 0.08]]) {
          const v = Math.min(1, pain.lit[k]);
          if (v > 0.01) glow(ctx, u, x, y, r * (1.1 + 0.6 * v), '#ff2040', 0.45 + 0.9 * v);
        }
        if (env.pain) {
          ctx.save();
          ctx.setLineDash([3, 6]);
          ctx.strokeStyle = 'rgba(255,48,72,0.45)';
          ctx.lineWidth = 1.5;
          for (const pl of [pain.up, ...Object.values(pain.out)]) { strokePath(ctx, u, pl.points); ctx.stroke(); }
          ctx.restore();
        }
      }
      const pulse = 0.5 + 0.5 * Math.sin(t * (2 + 6 * phi));
      glow(ctx, u, BRAIN.amygdala[0], BRAIN.amygdala[1], 0.08 + 0.14 * phi + 0.08 * flash, COLORS.red, 0.3 + 0.6 * phi * (0.7 + 0.3 * pulse) + 0.5 * flash);
      ctx.save();
      ctx.fillStyle = COLORS.red;
      ctx.beginPath();
      ctx.ellipse(BRAIN.amygdala[0] * u, BRAIN.amygdala[1] * u, 0.05 * u, 0.035 * u, -0.4, 0, TAU);
      ctx.fill();
      ctx.restore();
      if (dim >= 8) {
        ctx.save();
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1;
        for (const [pl, color] of [[roads.low, COLORS.red], [roads.high, COLORS.cyan], [roads.out, COLORS.orange]]) {
          ctx.strokeStyle = color;
          ctx.globalAlpha = env.alpha * 0.35;
          strokePath(ctx, u, pl.points);
          ctx.stroke();
        }
        ctx.restore();
        traffic.draw(ctx, u);
      }
      // the calming breath: a slow blue wave rolling down over the head with each out-breath
      if (env.body && BODY.loop.breath > 0.05) {
        const fr = BODY.loop.calmFront;
        const y = -0.5 + 1.1 * fr;
        ctx.save();
        // inside the brain only, and down the brainstem to the body
        closedSmooth(ctx, u, CEREBRUM);
        ctx.rect(0.08 * u, 0.2 * u, 0.2 * u, 0.5 * u);
        ctx.clip();
        const g = ctx.createLinearGradient(0, (y - 0.18) * u, 0, (y + 0.06) * u);
        g.addColorStop(0, 'rgba(94,231,255,0)');
        g.addColorStop(0.7, `rgba(94,231,255,${0.32 * BODY.loop.breath})`);
        g.addColorStop(1, 'rgba(94,231,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(-0.7 * u, (y - 0.18) * u, 1.4 * u, 0.24 * u);
        ctx.restore();
      }
      if (env.labels && env.mindful) {
        label(ctx, u, 'MINDFUL: each thought arises and passes on its own; none sets off the next (the chain is broken, not the thinking)', 0, 0.74, '#a8f0d8', 'center', 0.021);
        label(ctx, u, 'the field is not pushed down; pain still arrives, it heats the head less (interpretive; after Zeidan 2011, Kabat-Zinn)', 0, 0.8, COLORS.dim, 'center', 0.019);
      }
      if (env.labels && env.body) {
        const L = BODY.loop;
        label(ctx, u, `ONE BODY · pain in ${Math.round(100 * Math.min(1, L.painIn))}% · the field Φ ${L.phi.toFixed(2)} · ${L.breath > 0.5 ? 'the limbic breath: slow and deep, a calming wave' : L.painIn > 0.4 ? 'the head heats; tension tightens the body' : 'the head is busy, as always'}`, 0, 0.68, L.breath > 0.5 ? COLORS.cyan : '#ff8090', 'center', 0.022);
      }
      if (env.labels && env.pain) {
        label(ctx, u, env.pain === 'chronic' ? 'CHRONIC PAIN: the regions stay lit between pulses, a valley that stays deep' : 'PAIN: up the spinal cord to the thalamus, then the insula, the cingulate, the sensory cortex', 0, 0.74, '#ff6070', 'center', 0.024);
        label(ctx, u, `louder with fear (Φ ${env.phi.toFixed(2)}) · the brain itself has no pain receptors: the stone does not hurt, pain is music played in it`, 0, 0.8, COLORS.dim, 'center', 0.02);
        if (env.painFrom === 'ureter') label(ctx, u, 'from the stone in the ureter: its nerves enter the spinal cord at T11 to L2, which is why the colic is felt in the loin and the groin', 0, 0.86, '#ff9a3c', 'center', 0.02);
        leader(ctx, u, 'INSULA (deep, beneath the cortex)', INSULA, [-0.62, 0.12], '#ff6070');
        leader(ctx, u, 'SENSORY CORTEX', BRAIN.sensory, [0.62, -0.5], '#ff6070');
      }
      if (env.labels && env.thoughts) {
        label(ctx, u, ignited > 0 ? 'IGNITION: a burst spreads through the cortex, a thought becoming conscious (global workspace)' : 'THOUGHTS: bursts of activity, neural avalanches: many small, a few large (a power law); colour, the feeling', 0, -0.72, ignited > 0 ? '#ffffff' : COLORS.dim, 'center', 0.024);
        const cond = [(env.ca ?? 0) > 0.05 ? 'ADHD: more, scattered' : '', (env.cs ?? 0) > 0.05 ? 'ASD: fewer, focused' : '', (env.cp ?? 0) > 0.05 ? 'C-PTSD: each burst echoes' : ''].filter(Boolean).join(' · ');
        if (cond) label(ctx, u, `${cond} (model operators, pictures, not diagnoses)`, 0, -0.66, COLORS.violet, 'center', 0.02);
      }
      if (env.labels) {
        leader(ctx, u, 'AMYGDALA', BRAIN.amygdala, [-0.42, 0.46], COLORS.red);
        leader(ctx, u, 'HYPOTHALAMUS', BRAIN.hypothalamus, [-0.62, 0.3], COLORS.orange);
        leader(ctx, u, 'HIPPOCAMPUS', [0.12, 0.24], [0.02, 0.5], COLORS.gold);
        leader(ctx, u, 'THALAMUS', BRAIN.thalamus, [0.62, 0.42], 'rgb(190,170,230)');
        leader(ctx, u, 'CINGULATE', [0.1, -0.25], [0.3, -0.6], COLORS.violet);
        leader(ctx, u, 'PREFRONTAL CORTEX', BRAIN.prefrontal, [-0.52, -0.6], '#8fbaff');
        if (dim >= 8) {
          label(ctx, u, 'LOW ROAD (fast)', -0.02, 0.06, COLORS.red, 'center', 0.024);
          label(ctx, u, 'HIGH ROAD (slow)', 0.18, -0.4, COLORS.cyan, 'center', 0.024);
        }
      }
    },
  };
}

// ---------------------------------------------------------------- stop: limbic hinge

function makeLimbic() {
  const nodes = { body: [-0.62, 0], limbic: [0, 0], mind: [0.62, 0] };
  const up1 = polyline([nodes.body, [-0.31, -0.05], nodes.limbic]);
  const up2 = polyline([nodes.limbic, [0.31, -0.05], nodes.mind]);
  const down = polyline([nodes.mind, [0.31, 0.08], nodes.limbic]);
  const traffic = makeTraffic();
  return {
    focus: [0, 0],
    tick(env) {
      if (env.dim >= 8) {
        const T = temperature(env.phi);
        if (Math.random() < (2 + 6 * env.phi) * env.dt) traffic.spawn(up1, { travel: 1.1, color: COLORS.teal });
        if (Math.random() < (1.5 + 3 * env.phi) * env.dt) traffic.spawn(up2, { travel: 1.0 + T, color: env.phi > 0.5 ? COLORS.orange : COLORS.gold });
        if (Math.random() < 2.2 * (1 - env.phi) ** 2 * env.dt) traffic.spawn(down, { travel: 1.2, color: '#8fbaff' });
      }
      traffic.tick(env.dt);
    },
    poke(strength) {
      for (let k = 0; k < 3 + 4 * strength; k++) traffic.spawn(up1, { travel: 0.6 + 0.1 * k, color: COLORS.orange });
    },
    draw(ctx, env) {
      const { u, phi, dim, t } = env;
      const T = temperature(phi);
      ctx.save();
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(232,238,252,0.12)';
      ctx.lineWidth = 0.06 * u;
      for (const pl of [up1, up2]) {
        strokePath(ctx, u, pl.points, true);
        ctx.stroke();
      }
      ctx.restore();
      if (dim >= 11) {
        ripples(env.fieldCtx ?? ctx, u, 0, 0, t, 1.4 - 0.6 * phi, 0.9, phi > 0.5 ? COLORS.orange : COLORS.cyan, 0.35);
        const x0 = -0.36;
        const step = 0.11;
        for (let d = 1; d <= 11; d++) {
          const color = d <= 7 ? COLORS.teal : d === 8 ? COLORS.red : COLORS.violet;
          const x = x0 + (d - 1) * step;
          ctx.save();
          ctx.globalAlpha *= d === 8 ? 0.5 + 0.5 * phi : 0.55;
          ctx.fillStyle = color;
          ctx.fillRect((x - 0.045) * u, 0.52 * u, 0.09 * u, 0.03 * u);
          ctx.restore();
          label(ctx, u, String(d), x, 0.58, color, 'center', 0.026);
        }
        label(ctx, u, 'BODY FIELD', x0 + 3 * step, 0.64, COLORS.teal, 'center', 0.026);
        label(ctx, u, 'LIMBIC', x0 + 7 * step, 0.64, COLORS.red, 'center', 0.026);
        label(ctx, u, 'MIND FIELD', x0 + 9 * step, 0.64, COLORS.violet, 'center', 0.026);
      }
      const rL = 0.13 + 0.09 * phi;
      glow(ctx, u, 0, 0, rL * 2.2, phi > 0.5 ? COLORS.red : COLORS.teal, 0.35 + 0.4 * phi);
      for (const [key, r, color] of [['body', 0.16, COLORS.teal], ['limbic', rL, phi > 0.5 ? COLORS.red : COLORS.gold], ['mind', 0.16, COLORS.violet]]) {
        const [x, y] = nodes[key];
        ctx.save();
        ctx.fillStyle = 'rgba(10,14,28,0.9)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(x * u, y * u, r * u, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      // the mind's picture: sharp rings when cold, smeared when hot
      const blur = (T - T0) / SIGMA;
      ctx.save();
      ctx.strokeStyle = COLORS.violet;
      ctx.lineWidth = 1.5;
      for (let k = 1; k <= 4; k++) {
        ctx.globalAlpha = env.alpha * (0.8 - blur * 0.5);
        ctx.beginPath();
        for (let i = 0; i <= 48; i++) {
          const a = (i / 48) * TAU;
          const r = k * 0.028 * (1 + blur * 0.35 * Math.sin(a * (3 + k) + t * 3 * blur + k));
          const x = nodes.mind[0] + Math.cos(a) * r;
          const y = nodes.mind[1] + Math.sin(a) * r;
          if (i) ctx.lineTo(x * u, y * u);
          else ctx.moveTo(x * u, y * u);
        }
        ctx.stroke();
      }
      ctx.restore();
      if (dim >= 8) traffic.draw(ctx, u);
      if (env.labels) {
        label(ctx, u, 'BODY FIELD', -0.62, -0.25, COLORS.teal);
        label(ctx, u, 'D1–7', -0.62, 0, COLORS.teal, 'center', 0.03);
        label(ctx, u, 'LIMBIC', 0, -0.32, phi > 0.5 ? COLORS.red : COLORS.gold);
        label(ctx, u, 'D8', 0, 0, COLORS.ink, 'center', 0.04);
        label(ctx, u, 'MIND FIELD', 0.62, -0.25, COLORS.violet);
        label(ctx, u, 'D9–11', 0.62, 0.22, COLORS.violet, 'center', 0.03);
        label(ctx, u, `Φ = ${phi.toFixed(2)}   T = T₀ + σΦ = ${T.toFixed(2)}   β = 1/T = ${(1 / T).toFixed(2)}`, 0.1, 0.41, COLORS.ink, 'center', 0.032);
        if (dim >= 8) label(ctx, u, '← calming signals from the cortex', 0.36, 0.3, '#8fbaff', 'center', 0.022);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: emotion and thought

// Bands, bottom to top: body, the sub-threshold sea, the threshold line, limbic (emotion),
// cortex (thought). Swells in the sea come from body triggers; one that crosses T_c becomes
// an emotion, one that keeps rising becomes a thought, which pulses back to the body.
const THOUGHT_WORDS = {
  hot: ['I am not safe', 'it is my fault', 'get out', 'they will leave', 'not again', 'I can not cope'],
  calm: ['I can feel my feet', 'this will pass', 'I am here', 'breathe out', 'I can ask for help', 'that was then'],
};
const EMOTION_WORDS = { hot: ['fear', 'anger', 'shame', 'alarm'], calm: ['ease', 'curiosity', 'warmth', 'joy'] };

function makeThought() {
  const Y = { body: 0.55, sea: 0.28, line: 0.08, emotion: -0.18, thought: -0.46 };
  const X0 = -0.85, X1 = 0.85;
  const swells = [];
  const emotions = [];
  const thoughts = [];
  const pulses = [];
  const foam = Array.from({ length: 90 }, () => ({ x: lerp(X0, X1, Math.random()), y: Y.sea + (Math.random() - 0.5) * 0.18, p: Math.random() * TAU }));
  let clock = 0;
  let feedback = 0;
  let beat = 0;
  const arousal = phi => clamp(phi + feedback, 0, 1.4);
  function trigger(strength = 0.6, x = lerp(X0 + 0.1, X1 - 0.1, Math.random())) {
    swells.push({ x, a: 0, target: 0.06 + 0.42 * strength, born: clock, crossed: false, rose: false });
  }
  const sea = (x, t, a) => 0.035 * (1 + a) * (Math.sin(9 * x + 2.1 * t) + 0.6 * Math.sin(17 * x - 3.3 * t + 1) + 0.4 * Math.sin(31 * x + 5 * t));
  const swellAt = x => swells.reduce((acc, s) => acc + s.a * Math.exp(-((x - s.x) ** 2) / 0.006), 0);
  return {
    focus: [0, Y.line],
    tick(env) {
      clock += env.dt;
      const a = arousal(env.phi);
      beat += env.dt * (60 + 60 * a) / 60;
      feedback = Math.max(0, feedback - env.dt * 0.05);
      // the body triggers swells more often when aroused
      if (Math.random() < (0.2 + 1.5 * a * a) * env.dt) trigger(0.15 + 0.85 * Math.random() * (0.25 + a));
      for (const s of swells) {
        s.a += (s.target - s.a) * Math.min(1, env.dt * 1.6);
        const peak = Y.sea - s.a - 0.04;
        if (!s.crossed && env.dim >= 8 && peak < Y.line) {
          s.crossed = true;
          const words = a > 0.5 ? EMOTION_WORDS.hot : EMOTION_WORDS.calm;
          emotions.push({ x: s.x, y: Y.line, life: 0, word: words[Math.floor(Math.random() * words.length)], hot: a > 0.5 });
        }
        if (!s.rose && env.dim >= 11 && s.target > 0.38 && s.a > 0.36) {
          s.rose = true;
          const hot = a > 0.5;
          const words = hot ? THOUGHT_WORDS.hot : THOUGHT_WORDS.calm;
          thoughts.push({ x: s.x, y: Y.emotion, life: 0, word: words[Math.floor(Math.random() * words.length)], hot });
        }
      }
      for (let i = swells.length - 1; i >= 0; i--) {
        if (clock - swells[i].born > 3) swells[i].target = 0;
        if (clock - swells[i].born > 6) swells.splice(i, 1);
      }
      for (const e of emotions) {
        e.life += env.dt;
        e.y = lerp(e.y, Y.emotion + 0.03, Math.min(1, env.dt * 1.5));
      }
      for (const th of thoughts) {
        th.life += env.dt;
        th.y = lerp(th.y, Y.thought, Math.min(1, env.dt * 1.2));
        // the thought acts back on the body: a hot thought heats it, a calm one cools it
        if (!th.sent && th.life > 1.6) {
          th.sent = true;
          pulses.push({ x: th.x, s: 0, hot: th.hot });
        }
      }
      for (const pl of pulses) {
        pl.s += env.dt / 1.4;
        if (pl.s >= 1 && !pl.done) {
          pl.done = true;
          feedback = clamp(feedback + (pl.hot ? 0.06 : -0.05), 0, 0.5);
          if (pl.hot) trigger(0.5, pl.x);
        }
      }
      for (const list of [emotions, thoughts]) for (let i = list.length - 1; i >= 0; i--) if (list[i].life > 4.5) list.splice(i, 1);
      for (let i = pulses.length - 1; i >= 0; i--) if (pulses[i].s > 1.05) pulses.splice(i, 1);
    },
    poke(strength) { trigger(0.6 + 0.4 * strength, 0); },
    draw(ctx, env) {
      const { u, dim, phi, t } = env;
      const a = arousal(phi);
      const band = (y0, y1, color, text) => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha *= 0.12;
        ctx.fillRect(X0 * u, y0 * u, (X1 - X0) * u, (y1 - y0) * u);
        ctx.restore();
        if (env.labels) label(ctx, u, text, X1 + 0.02, (y0 + y1) / 2, color, 'left', 0.026);
      };
      band(Y.body - 0.08, Y.body + 0.12, COLORS.teal, 'BODY (D1–7)');
      band(Y.line, Y.sea + 0.14, '#3d6bff', 'SUB-THRESHOLD SEA');
      if (dim >= 8) band(Y.emotion - 0.1, Y.line, COLORS.red, 'EMOTION · limbic (D8)');
      if (dim >= 11) band(Y.thought - 0.12, Y.emotion - 0.1, COLORS.violet, 'THOUGHT · cortex (D9–11)');
      // the body: a heartbeat trace
      ctx.save();
      ctx.strokeStyle = COLORS.red;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = lerp(X0, X1, i / 200);
        const ph = (beat - (X1 - x) * 1.5) % 1;
        const q = (ph + 1) % 1;
        const spike = Math.exp(-((q - 0.1) ** 2) / 0.0009) * 0.07 - Math.exp(-((q - 0.14) ** 2) / 0.0006) * 0.025;
        const y = Y.body + 0.03 - spike;
        if (i) ctx.lineTo(x * u, y * u);
        else ctx.moveTo(x * u, y * u);
      }
      ctx.stroke();
      ctx.restore();
      if (env.labels) label(ctx, u, `${Math.round(60 + 60 * a)} BPM`, X0, Y.body + 0.1, COLORS.red, 'left', 0.024);
      // 11D: quantum-scale flicker in the sea
      if (dim >= 11) {
        for (const f of foam) {
          const twinkle = 0.5 + 0.5 * Math.sin(t * 7 + f.p * 3);
          dot(ctx, u, f.x, f.y + 0.01 * Math.sin(t * 3 + f.p), 0.004 + 0.003 * twinkle, '#cfe8ff', 0.25 + 0.5 * twinkle);
        }
      }
      // the sea and its swells
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= 260; i++) {
        const x = lerp(X0, X1, i / 260);
        const y = Y.sea - sea(x, t, a) - swellAt(x);
        if (i) ctx.lineTo(x * u, y * u);
        else ctx.moveTo(x * u, y * u);
      }
      ctx.lineTo(X1 * u, (Y.sea + 0.14) * u);
      ctx.lineTo(X0 * u, (Y.sea + 0.14) * u);
      ctx.closePath();
      const g = ctx.createLinearGradient(0, (Y.line) * u, 0, (Y.sea + 0.14) * u);
      g.addColorStop(0, 'rgba(94,231,255,0.55)');
      g.addColorStop(1, 'rgba(30,60,160,0.15)');
      ctx.fillStyle = g;
      ctx.fill();
      ctx.strokeStyle = COLORS.cyan;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
      // the threshold
      if (dim >= 8) {
        ctx.save();
        ctx.strokeStyle = COLORS.gold;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 6]);
        ctx.beginPath();
        ctx.moveTo(X0 * u, Y.line * u);
        ctx.lineTo(X1 * u, Y.line * u);
        ctx.stroke();
        ctx.restore();
        if (env.labels) label(ctx, u, 'THRESHOLD T_c', X0 - 0.02, Y.line, COLORS.gold, 'right', 0.024);
      }
      const f = env.fieldCtx ?? ctx; // near layer in 3D SBS
      for (const e of emotions) {
        const fade = clamp(1 - (e.life - 3) / 1.5, 0, 1);
        const c = e.hot ? COLORS.red : COLORS.teal;
        glow(f, u, e.x, e.y, 0.08, c, 0.7 * fade);
        dot(f, u, e.x, e.y, 0.012, '#ffffff', fade);
        f.save();
        f.globalAlpha *= fade;
        label(f, u, e.word, e.x, e.y - 0.05, c, 'center', 0.028);
        f.restore();
      }
      for (const th of thoughts) {
        const fade = clamp(1 - (th.life - 3) / 1.5, 0, 1);
        const c = th.hot ? COLORS.orange : COLORS.violet;
        f.save();
        f.globalAlpha *= fade;
        f.strokeStyle = c;
        f.lineWidth = 1.5;
        f.fillStyle = 'rgba(10,14,28,0.85)';
        const w = 0.012 * th.word.length + 0.06;
        f.beginPath();
        f.roundRect((th.x - w / 2) * u, (th.y - 0.04) * u, w * u, 0.08 * u, 0.03 * u);
        f.fill();
        f.stroke();
        f.restore();
        f.save();
        f.globalAlpha *= fade;
        label(f, u, th.word, th.x, th.y, '#ffffff', 'center', 0.026);
        f.restore();
      }
      if (dim >= 11) {
        for (const pl of pulses) {
          const y = lerp(Y.thought, Y.body, pl.s);
          const x = pl.x + 0.05 * Math.sin(pl.s * 6);
          glow(f, u, x, y, 0.05, pl.hot ? COLORS.orange : COLORS.teal, 0.7);
          dot(f, u, x, y, 0.008, '#ffffff');
        }
      }
      if (env.labels) {
        label(ctx, u, 'emotion : type at D8   ·   thought : type at D9–11   ·   one field', 0, Y.thought - 0.17, COLORS.dim, 'center', 0.026);
        if (dim >= 11 && feedback > 0.08) label(ctx, u, 'the loop: hot thoughts heat the body', 0, Y.body + 0.18, COLORS.orange, 'center', 0.024);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: the dyad

// Two phase oscillators (Kuramoto): base rate 1 Hz, the second faster by 0.03 + 0.12 Φ Hz,
// coupling K = 0.3, + 0.5 with the resource, noise rising with Φ. Locked when the gap is
// below 2K: calm locks, hot drifts, hot with the resource locks (scripts/explorer-check.mjs).
const DYAD = { rate: 1, gap: phi => 0.03 + 0.12 * phi, coupling: resource => 0.3 + (resource ? 0.5 : 0), noise: phi => 0.02 + 0.1 * phi };

export function dyadStep(s, phi, resource, dt) {
  const w = TAU * DYAD.rate;
  const dw = TAU * DYAD.gap(phi);
  const K = DYAD.coupling(resource);
  const D = DYAD.noise(phi);
  const da = w + K * Math.sin(s.b - s.a);
  const db = w + dw + K * Math.sin(s.a - s.b);
  s.a += da * dt + Math.sqrt(2 * D * dt) * gauss();
  s.b += db * dt + Math.sqrt(2 * D * dt) * gauss();
  return Math.abs(Math.cos((s.b - s.a) / 2));
}

function makeDyad() {
  const s = { a: 0, b: 0.3 };
  const history = [];
  let r = 1;
  let smooth = 1;
  let clock = 0;
  let rupture = 0;
  return {
    focus: [0, -0.1],
    tick(env) {
      clock += env.dt;
      const sub = 3;
      for (let k = 0; k < sub; k++) r = dyadStep(s, env.phi, env.resource, env.dt / sub);
      rupture = Math.max(0, rupture - env.dt * 0.5);
      smooth += (r - smooth) * Math.min(1, env.dt / 2);
      history.push([clock, r]);
      while (history.length && clock - history[0][0] > 10) history.shift();
    },
    poke(strength) {
      s.b += Math.PI * (0.6 + 0.4 * strength);
      rupture = 1;
    },
    draw(ctx, env) {
      const { u, dim, phi, t } = env;
      if (env.gl) {
        env.gl.render({ a: s.a, b: s.b, r, coupling: DYAD.coupling(env.resource), dim, time: t, stereo: env.stereo });
        if (env.labels) {
          const state = rupture > 0.3 ? 'rupture: repairing' : smooth > 0.9 ? 'in step' : smooth > 0.8 ? 'slipping' : 'drifting apart';
          label(ctx, u, `sync r = ${smooth.toFixed(2)} · ${state}`, 0, -0.72, smooth > 0.9 && rupture <= 0.3 ? COLORS.teal : COLORS.orange, 'center', 0.034);
          const b = env.gl.projectWorld(0, -1.0, 0);
          if (b.visible) label(ctx, u, 'CONTACT BOUNDARY', (b.x * env.w) / u, (b.y * env.h) / u, COLORS.dim, 'center', 0.024);
          if (dim >= 8) label(ctx, u, env.resource ? 'coupling K = 0.8 (with the resource)' : 'coupling K = 0.3', 0, -0.64, env.resource ? COLORS.teal : COLORS.cyan, 'center', 0.026);
        }
        return;
      }
      const people = [{ x: -0.45, phase: s.a, color: COLORS.teal }, { x: 0.45, phase: s.b, color: COLORS.violet }];
      const f = env.fieldCtx ?? ctx; // near layer in 3D SBS
      if (dim >= 11) {
        f.save();
        const g = f.createRadialGradient(0, -0.15 * u, 0.1 * u, 0, -0.15 * u, 0.85 * u);
        g.addColorStop(0, `rgba(255,209,102,${0.28 * r * r})`);
        g.addColorStop(1, 'rgba(255,209,102,0)');
        f.fillStyle = g;
        f.beginPath();
        f.ellipse(0, -0.15 * u, 0.9 * u, 0.6 * u, 0, 0, TAU);
        f.fill();
        f.restore();
      }
      // the contact boundary
      ctx.save();
      ctx.strokeStyle = 'rgba(232,238,252,0.35)';
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(0, -0.62 * u);
      ctx.lineTo(0, 0.25 * u);
      ctx.stroke();
      ctx.restore();
      const fc = env.fieldCtx ?? ctx; // near layer in 3D SBS
      if (dim >= 8) {
        const strength = DYAD.coupling(env.resource);
        fc.save();
        for (let k = 0; k < 7; k++) {
          const y = -0.42 + k * 0.035;
          fc.strokeStyle = env.resource ? COLORS.teal : COLORS.cyan;
          fc.globalAlpha = env.alpha * (0.15 + 0.5 * strength) * (0.4 + 0.6 * r);
          fc.lineWidth = 1.2;
          fc.beginPath();
          for (let i = 0; i <= 60; i++) {
            const x = lerp(-0.33, 0.33, i / 60);
            const wob = 0.02 * Math.sin(10 * x - t * 3 + k) * (1 + 2 * (1 - r));
            if (i) fc.lineTo(x * u, (y + wob) * u);
            else fc.moveTo(x * u, (y + wob) * u);
          }
          fc.stroke();
        }
        fc.restore();
      }
      for (const [i, person] of people.entries()) {
        ctx.save();
        ctx.translate(person.x * u, 0.02 * u);
        ctx.scale(i ? -0.48 : 0.48, 0.48);
        ctx.fillStyle = ctx.strokeStyle = 'rgba(16,49,58,0.9)';
        bodyShape(ctx, u);
        ctx.restore();
        const breath = 0.5 + 0.5 * Math.sin(person.phase);
        glow(ctx, u, person.x, -0.2, 0.08 + 0.06 * breath, person.color, 0.4 + 0.5 * breath);
        dot(ctx, u, person.x, -0.2, 0.018, '#ffffff', 0.6 + 0.4 * breath);
      }
      // phase difference over the last 10 s
      const x0 = -0.4, x1 = 0.85, yMid = 0.5, amp = 0.09;
      ctx.save();
      ctx.strokeStyle = 'rgba(232,238,252,0.18)';
      ctx.strokeRect(x0 * u, (yMid - amp - 0.02) * u, (x1 - x0) * u, (2 * amp + 0.04) * u);
      ctx.strokeStyle = COLORS.gold;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (const [i, [when, sync]] of history.entries()) {
        const x = lerp(x0, x1, 1 - (clock - when) / 10);
        const y = yMid + amp - 2 * amp * sync;
        if (i) ctx.lineTo(x * u, y * u);
        else ctx.moveTo(x * u, y * u);
      }
      ctx.stroke();
      ctx.restore();
      if (env.labels) {
        const state = rupture > 0.3 ? 'rupture: repairing' : smooth > 0.9 ? 'in step' : smooth > 0.8 ? 'slipping' : 'drifting apart';
        label(ctx, u, `sync r = ${smooth.toFixed(2)} · ${state}`, 0, -0.72, smooth > 0.9 && rupture <= 0.3 ? COLORS.teal : COLORS.orange, 'center', 0.034);
        label(ctx, u, 'CONTACT BOUNDARY', 0, 0.3, COLORS.dim, 'center', 0.024);
        label(ctx, u, 'SYNC r, LAST 10 S (top = in step, dips = slips)', (x0 + x1) / 2, yMid + amp + 0.06, COLORS.dim, 'center', 0.024);
        if (dim >= 8) label(ctx, u, env.resource ? 'coupling K = 0.8 (with the resource)' : 'coupling K = 0.3', 0, -0.5, env.resource ? COLORS.teal : COLORS.cyan, 'center', 0.026);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: the path of a thought

function makeTunnel() {
  let gl = null;
  return {
    focus: [0, 0],
    tick() {},
    poke(strength) { gl?.poke(strength); },
    draw(ctx, env) {
      const { u, t } = env;
      if (!env.gl) {
        if (env.labels) label(ctx, u, 'PATH needs WebGL (3D)', 0, 0, COLORS.dim, 'center', 0.03);
        return;
      }
      gl = env.gl;
      gl.render({ world: env.world, phi: env.phi, resource: env.resource, dim: env.dim, time: t, stereo: env.stereo });
      if (env.labels) {
        label(ctx, u, gl.blocked ? 'STOPPED AT A BOUNDARY · raise Φ, add the RESOURCE, or POKE to tunnel' : 'the thought moves on', 0, -0.7, gl.blocked ? COLORS.orange : COLORS.teal, 'center', 0.03);
        if (gl.event.until > t) label(ctx, u, gl.event.text, 0, -0.62, COLORS.gold, 'center', 0.032);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: the ureter

// THE STAGES, OUTSIDE (ISS-076): the urinary tract as a medical illustration, from the kidney to
// the bladder, the tube's width from the model, the stone, the stent, the waves; and the pain as
// the adverts draw it: a red glow where it starts, rings spreading from each spasm, and the places
// it is felt (the loin and the groin, the dermatomes T11 to L2). Beneath, the last minute of pain:
// it comes in waves. box: { x, y, w } in scene units, the tract above, the trace below.
function wrapLines(text, n) {
  const out = [];
  let line = '';
  for (const word of String(text).split(' ')) {
    if ((line + ' ' + word).trim().length > n) { out.push(line.trim()); line = word; } else line += ' ' + word;
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

function drawUreterOutside(ctx, u, env, m, box) {
  const s = box.w;
  const P = (px, py) => [box.x + px * s, box.y + py * s];
  const bez = x => {
    const a = [0.42, 0.2], b = [0.28, 0.42], c = [0.56, 0.6], d = [0.52, 0.8];
    const q = 1 - x;
    return [q * q * q * a[0] + 3 * q * q * x * b[0] + 3 * q * x * x * c[0] + x * x * x * d[0],
      q * q * q * a[1] + 3 * q * q * x * b[1] + 3 * q * x * x * c[1] + x * x * x * d[1]];
  };
  const at = x => P(...bez(Math.max(0, Math.min(1, x))));
  const normal = x => {
    const [x0, y0] = bez(Math.max(0, x - 0.01));
    const [x1, y1] = bez(Math.min(1, x + 0.01));
    const len = Math.hypot(x1 - x0, y1 - y0) || 1;
    return [-(y1 - y0) / len, (x1 - x0) / len];
  };
  const D = m.distension;
  const t = env.t;
  const glowAt = ([x, y], r, color, a) => { if (a > 0.01) glow(ctx, u, x, y, r, color, Math.min(1, a)); };
  ctx.save();
  // the body, faint, as the adverts draw it
  ctx.strokeStyle = 'rgba(160,190,230,0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse((box.x + 0.5 * s) * u, (box.y + 0.5 * s) * u, 0.42 * s * u, 0.52 * s * u, 0, 0, Math.PI * 2);
  ctx.stroke();
  // the places the pain is felt: the loin and the groin (the same spinal segments)
  const pain = Math.min(1, m.pain);
  const pulse = 0.65 + 0.35 * Math.sin(t * 2.2);
  glowAt(P(0.14, 0.3), 0.14 * s, '#ff2a3c', 0.55 * pain * pulse);
  glowAt(P(0.66, 0.92), 0.12 * s, '#ff2a3c', 0.45 * pain * pulse);
  // the kidney (it swells too when the urine backs up) and the bladder
  const kid = P(0.33, 0.14);
  ctx.fillStyle = '#9a3846';
  ctx.strokeStyle = 'rgba(255,190,200,0.6)';
  ctx.beginPath();
  ctx.ellipse(kid[0] * u, kid[1] * u, 0.07 * s * (1 + 0.15 * D) * u, 0.11 * s * (1 + 0.15 * D) * u, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  const bl = P(0.53, 0.86);
  ctx.fillStyle = '#b8606e';
  ctx.beginPath();
  ctx.ellipse(bl[0] * u, bl[1] * u, 0.11 * s * u, 0.065 * s * u, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // the ureter: its width from the model, the urine inside it, pooled above the stone
  const hw0 = 0.016 * s;
  const side = (k, f) => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const x = i / 80;
      const [px, py] = at(x);
      const [nx, ny] = normal(x);
      const w = hw0 * m.radius(x) * f * k;
      pts.push([px + nx * w, py + ny * w]);
    }
    return pts;
  };
  const tubePath = f => {
    const a = side(1, f);
    const b = side(-1, f).reverse();
    ctx.beginPath();
    [...a, ...b].forEach(([x, y], i) => (i ? ctx.lineTo(x * u, y * u) : ctx.moveTo(x * u, y * u)));
    ctx.closePath();
  };
  tubePath(1);
  ctx.fillStyle = '#d97a88';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,220,225,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  tubePath(0.55);
  ctx.fillStyle = `rgba(255,226,120,${0.25 + 0.5 * D})`;
  ctx.fill();
  // the waves: muscle rings travelling down
  ctx.strokeStyle = '#6a1424';
  ctx.lineWidth = 3;
  for (const w of m.waves) {
    const [px, py] = at(w.x);
    const [nx, ny] = normal(w.x);
    const hw = hw0 * m.radius(w.x) * 1.15;
    ctx.beginPath();
    ctx.moveTo((px - nx * hw) * u, (py - ny * hw) * u);
    ctx.lineTo((px + nx * hw) * u, (py + ny * hw) * u);
    ctx.stroke();
  }
  // the stent, curled at both ends
  if (m.stent) {
    ctx.strokeStyle = '#4aa3ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const curl = ([cx, cy], r0) => { for (let a = 0; a <= Math.PI * 3; a += 0.2) ctx.lineTo((cx + r0 * Math.cos(a)) * u, (cy + r0 * Math.sin(a)) * u); };
    const k0 = P(0.37, 0.16);
    ctx.moveTo((k0[0] + 0.025 * s) * u, k0[1] * u);
    curl(k0, 0.025 * s);
    for (let i = 0; i <= 60; i++) { const [px, py] = at(i / 60); ctx.lineTo(px * u, py * u); }
    curl(P(0.53, 0.84), 0.03 * s);
    ctx.stroke();
  }
  // the stone
  if (m.stone > 0) {
    const [sx, sy] = at(0.55);
    const r = hw0 * 1.5 * (0.45 + 0.55 * m.stone / 3);
    ctx.fillStyle = '#e0b860';
    ctx.strokeStyle = '#7a5428';
    for (let k = 0; k < 7; k++) {
      const a = k * 0.9 + 0.3;
      const cx = sx + (k ? Math.cos(a) * r * 0.6 : 0);
      const cy = sy + (k ? Math.sin(a) * r * 0.6 : 0);
      const rr = k ? r * 0.5 : r * 0.8;
      ctx.beginPath();
      ctx.moveTo(cx * u, (cy - rr) * u);
      ctx.lineTo((cx + rr * 0.6) * u, cy * u);
      ctx.lineTo(cx * u, (cy + rr) * u);
      ctx.lineTo((cx - rr * 0.6) * u, cy * u);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
  // the pain where it starts: the stone's spasm, the swollen tube, the stent's ends
  glowAt(at(0.55), (0.05 + 0.12 * m.spasm) * s, '#ff2a3c', (0.3 + 0.7 * m.spasm) * (0.4 + 0.6 * pain));
  glowAt(at(0.28), 0.1 * s * D, '#ff4d5e', 0.5 * Math.max(0, D - 0.25) * (0.5 + pain));
  if (m.stent) { glowAt(kid, 0.06 * s, '#ff7a3c', 0.5); glowAt(bl, 0.06 * s, '#ff7a3c', 0.5); }
  // rings spreading from each spasm, as in the adverts
  for (const r of m.rings) {
    const c = r.kind === 'end' ? (r.x < 0.5 ? kid : bl) : at(r.x);
    const f = r.age / 3;
    ctx.strokeStyle = r.kind === 'end' ? `rgba(255,140,60,${(1 - f) * Math.min(1, r.strength * 1.5)})` : `rgba(255,50,70,${(1 - f) * Math.min(1, r.strength * 1.5)})`;
    ctx.lineWidth = 3 * (1 - f) + 1;
    ctx.beginPath();
    ctx.arc(c[0] * u, c[1] * u, (0.03 + 0.28 * f) * s * u, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
  if (env.labels) {
    leader(ctx, u, 'KIDNEY', kid, P(0.06, 0.06), 'rgba(255,190,200,0.9)');
    leader(ctx, u, 'URETER', at(0.25), P(0.04, 0.48), 'rgba(255,190,200,0.9)');
    if (m.stone > 0) leader(ctx, u, 'STONE', at(0.55), P(0.82, 0.5), COLORS.gold);
    if (m.stent) leader(ctx, u, 'STENT (double-J)', at(0.75), P(0.8, 0.7), '#4aa3ff');
    leader(ctx, u, 'BLADDER', bl, P(0.86, 0.86), 'rgba(255,190,200,0.9)');
    if (pain > 0.15) {
      label(ctx, u, 'felt in the loin', ...P(0.14, 0.42), '#ff6070', 'center', 0.02);
      label(ctx, u, 'and the groin (T11 to L2)', ...P(0.7, 1.0), '#ff6070', 'center', 0.02);
    }
  }
  // the last minute: the pain (red) and the swelling (gold)
  const cy0 = box.y + 1.06 * s;
  const ch = 0.2 * s;
  const cx0 = box.x + 0.04 * s;
  const cw = 0.92 * s;
  ctx.save();
  ctx.fillStyle = 'rgba(8,10,20,0.75)';
  ctx.fillRect(cx0 * u, cy0 * u, cw * u, ch * u);
  const tr = m.trace;
  const X = i => cx0 + cw * (i / 239);
  ctx.beginPath();
  ctx.moveTo(X(240 - tr.length) * u, (cy0 + ch) * u);
  tr.forEach(([p], i) => ctx.lineTo(X(240 - tr.length + i) * u, (cy0 + ch - ch * Math.min(1, p / 1.2)) * u));
  ctx.lineTo(X(239) * u, (cy0 + ch) * u);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,42,60,0.55)';
  ctx.fill();
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  tr.forEach(([, d], i) => { const x = X(240 - tr.length + i) * u, y = (cy0 + ch - ch * d) * u; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); });
  ctx.stroke();
  ctx.restore();
  if (env.labels) label(ctx, u, `THE LAST MINUTE · pain (red) comes in waves: colic · swelling (gold)${m.stage === 2 ? ' · under anaesthetic' : ''}`, cx0, cy0 - 0.02, COLORS.dim, 'left', 0.018);
}

function makeUreter() {
  let gl = null;
  // the stone as a process: the model drives both views (ureter-model.js)
  const model = BODY.ureter;
  let pokeEvent = { text: '', until: 0 };
  // the wall (ISS-076): 0 = the scope's view; 1..6 = the barrier at a scale (BARRIERS[wall - 1])
  let wall = 0;
  const shot = { x: -1, state: 'idle', wob: 0, through: false };
  let wallEvent = { text: '', until: 0 };
  let audio = null;
  // a soft boing: a sine that drops in pitch with a wobble, under a low-pass (no sharp edge)
  function boing() {
    try {
      audio ??= new AudioContext();
      const now = audio.currentTime;
      const osc = audio.createOscillator();
      const wob = audio.createOscillator();
      const wobGain = audio.createGain();
      const gain = audio.createGain();
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.6);
      wob.frequency.value = 14;
      wobGain.gain.value = 30;
      wob.connect(wobGain).connect(osc.frequency);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
      osc.connect(gain).connect(audio.destination);
      osc.start(now); wob.start(now);
      osc.stop(now + 0.75); wob.stop(now + 0.75);
    } catch { /* no audio */ }
  }

  function drawWall(ctx, env) {
    const { u, t } = env;
    const fx = Math.max(0, Math.min(1, env.phi));
    const b = BARRIERS[wall - 1];
    const T = transmission(b);
    const W = env.w / 2 / u;
    const H = env.h / 2 / u;
    ctx.save();
    ctx.fillStyle = wall === 1 ? '#1a0508' : '#05060f';
    ctx.fillRect(-W * u, -H * u, 2 * W * u, 2 * H * u);
    // the barrier slab, wobbling after a boing
    shot.wob *= Math.exp(-env.dt * 4);
    const sx = 1 + 0.12 * shot.wob * Math.sin(t * 28);
    const x0 = -0.2 * sx;
    const x1 = 0.2 * sx;
    const y0 = -0.42;
    const y1 = 0.42;
    ctx.shadowColor = 'transparent';
    if (fx > 0.05) { ctx.shadowBlur = 30 * fx; }
    const slab = (color, a, b2, c, d) => { ctx.fillStyle = color; ctx.fillRect(a * u, c * u, (b2 - a) * u, (d - c) * u); };
    if (b.id === 'tissue') {
      // the wall's layers, inside to out
      const bands = [['#ff9aa8', 0.18], ['#f3d6d0', 0.22], ['#c4384e', 0.4], ['#e8c48a', 0.2]];
      let x = x0;
      for (const [color, f] of bands) { ctx.shadowColor = color; slab(color, x, x + f * (x1 - x0), y0, y1); x += f * (x1 - x0); }
      ctx.strokeStyle = 'rgba(80,0,10,0.5)';
      for (let k = 0; k < 14; k++) { const yy = y0 + (k + 0.5) * (y1 - y0) / 14; ctx.beginPath(); ctx.moveTo((x0 + 0.4 * (x1 - x0)) * u, yy * u); ctx.lineTo((x0 + 0.8 * (x1 - x0)) * u, (yy + 0.02 * Math.sin(k + t)) * u); ctx.stroke(); }
    } else if (b.id === 'cell') {
      for (let k = 0; k < 6; k++) {
        const yy = y0 + k * (y1 - y0) / 6;
        ctx.shadowColor = '#ff8ab0';
        ctx.fillStyle = `hsl(${340 + 6 * k}, 60%, ${55 + 5 * fx}%)`;
        ctx.beginPath(); ctx.roundRect(x0 * u, (yy + 0.005) * u, (x1 - x0) * u, ((y1 - y0) / 6 - 0.01) * u, 0.03 * u); ctx.fill();
        ctx.fillStyle = '#6a1440';
        ctx.beginPath(); ctx.ellipse(0, (yy + (y1 - y0) / 12) * u, 0.05 * u, 0.025 * u, 0, 0, Math.PI * 2); ctx.fill();
      }
    } else if (b.id === 'membrane') {
      ctx.shadowColor = '#ffd166';
      for (const side of [-1, 1]) {
        for (let k = 0; k < 18; k++) {
          const yy = y0 + (k + 0.5) * (y1 - y0) / 18;
          const hx = side * 0.16 * sx;
          ctx.strokeStyle = '#d9c38a'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(hx * u, yy * u); ctx.lineTo((hx - side * 0.13) * u, (yy + 0.01 * Math.sin(t * 3 + k)) * u); ctx.stroke();
          ctx.fillStyle = '#ffd166';
          ctx.beginPath(); ctx.arc(hx * u, yy * u, 0.02 * u, 0, Math.PI * 2); ctx.fill();
        }
      }
    } else if (b.id === 'molecule') {
      ctx.shadowColor = '#5ee7ff';
      ctx.fillStyle = 'rgba(94,231,255,0.08)';
      ctx.fillRect(x0 * u, y0 * u, (x1 - x0) * u, (y1 - y0) * u);
      for (const [xx, txt] of [[-0.3, 'O'], [0.3, 'O']]) { ctx.fillStyle = '#ff4d5e'; ctx.beginPath(); ctx.arc(xx * u, 0, 0.07 * u, 0, Math.PI * 2); ctx.fill(); label(ctx, u, txt, xx, 0, '#ffffff', 'center', 0.04); }
      ctx.setLineDash([4, 6]); ctx.strokeStyle = COLORS.cyan; ctx.beginPath(); ctx.moveTo(-0.23 * u, 0); ctx.lineTo(0.23 * u, 0); ctx.stroke(); ctx.setLineDash([]);
    } else {
      // the atom and the quantum gap: electron clouds either side, a bare gap between
      for (const side of [-1, 1]) {
        const g = ctx.createRadialGradient(side * 0.45 * u, 0, 0, side * 0.45 * u, 0, 0.42 * u);
        g.addColorStop(0, `rgba(167,139,250,${0.5 + 0.3 * fx})`);
        g.addColorStop(1, 'rgba(167,139,250,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(side * 0.45 * u, 0, 0.42 * u, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = b.id === 'quantum' ? 'rgba(232,238,252,0.18)' : 'rgba(232,238,252,0.28)';
      ctx.fillRect(x0 * u, y0 * u, (x1 - x0) * u, (y1 - y0) * u);
      ctx.strokeStyle = 'rgba(232,238,252,0.6)';
      ctx.strokeRect(x0 * u, y0 * u, (x1 - x0) * u, (y1 - y0) * u);
    }
    ctx.shadowBlur = 0;
    // the honest drawing: the wave in, its decay inside the barrier, what comes out
    const amp = 0.16;
    const out = amp * Math.sqrt(T);
    const kappa = out > 1e-4 ? Math.log(amp / out) / (x1 - x0) : 40;
    const wy = 0.62;
    ctx.strokeStyle = COLORS.gold;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let k = 0; k <= 900; k++) {
      const x = -W + (2 * W) * k / 900;
      let y;
      if (x < x0) y = amp * Math.cos(30 * x - 6 * t);
      else if (x <= x1) y = amp * Math.exp(-kappa * (x - x0)) * Math.cos(30 * x0 - 6 * t);
      else y = out * Math.cos(30 * (x - x1) + 30 * x0 - 6 * t);
      if (k === 0) ctx.moveTo(x * u, (wy - y) * u); else ctx.lineTo(x * u, (wy - y) * u);
    }
    ctx.stroke();
    label(ctx, u, 'the wave in', -0.9, wy - 0.24, COLORS.gold, 'center', 0.024);
    label(ctx, u, out > 0.002 ? 'out: amplitude √T' : T > 1e-30 ? 'out: too small to draw' : 'out: nothing', 0.9, wy - 0.24, out > 0.002 ? COLORS.gold : COLORS.dim, 'center', 0.024);
    // FX high, at the quantum scales: the secret tunnel, a glowing passage through the gap
    if (T > 1e-3 && fx > 0.3) {
      ctx.save();
      ctx.shadowColor = '#5ee7ff';
      ctx.shadowBlur = 40 * fx;
      ctx.strokeStyle = `rgba(94,231,255,${0.4 + 0.5 * fx})`;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(0, 0, (x1 - x0) * 0.62 * u, 0.09 * u, 0, 0, Math.PI * 2); ctx.stroke();
      for (let k = 0; k < 10; k++) {
        const px = x0 + ((t * 0.25 + k / 10) % 1) * (x1 - x0);
        ctx.fillStyle = '#e9fbff';
        ctx.beginPath(); ctx.arc(px * u, 0.03 * Math.sin(k * 7 + t * 5) * u, 0.012 * u, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
      label(ctx, u, 'THE SECRET TUNNEL', 0, 0.16, COLORS.cyan, 'center', 0.028);
    }
    // the particle: POKE sends it at the wall
    if (shot.state === 'go') {
      shot.x += env.dt * 1.2;
      if (shot.x >= x0 - 0.06 && !shot.through) {
        if (Math.random() < T) {
          shot.through = true;
          shot.x = x1 + 0.06;
          wallEvent = { text: `TUNNELLED · it came out the other side (chance ${formatT(b)} a try)`, until: t + 4 };
        } else {
          shot.state = 'back';
          shot.wob = 1;
          boing();
          wallEvent = { text: `BOING · the barrier held (chance ${formatT(b)})${wall < BARRIERS.length ? ' · try the elevator ▼' : ''}`, until: t + 4 };
        }
      }
      if (shot.x > W) shot.state = 'idle';
    } else if (shot.state === 'back') {
      shot.x -= env.dt * 1.4;
      if (shot.x < -W) shot.state = 'idle';
    }
    const px = shot.state === 'idle' ? -0.75 : shot.x;
    ctx.save();
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 20 * fx;
    if (b.id === 'tissue') {
      // the stone: a crystal aggregate, bipyramids on bipyramids
      const diamond = (cx, cy, r, d) => {
        ctx.fillStyle = `hsl(42, 60%, ${48 + 8 * d}%)`;
        ctx.beginPath(); ctx.moveTo(cx * u, (cy - r) * u); ctx.lineTo((cx + 0.6 * r) * u, cy * u); ctx.lineTo(cx * u, (cy + r) * u); ctx.lineTo((cx - 0.6 * r) * u, cy * u); ctx.closePath(); ctx.fill();
        if (d < 2) for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + d; diamond(cx + Math.cos(a) * r * 0.7, cy + Math.sin(a) * r * 0.7, r * 0.45, d + 1); }
      };
      diamond(Math.min(px, x0 - 0.2), 0, 0.16, 0);
    } else {
      const r = { cell: 0.06, membrane: 0.035, molecule: 0.02 }[b.id] ?? 0.018;
      ctx.fillStyle = b.id === 'cell' ? '#9ae66e' : b.id === 'membrane' ? '#ffd166' : '#ffffff';
      if (b.id === 'cell') { ctx.beginPath(); ctx.roundRect((px - 2 * r) * u, -r * u, 4 * r * u, 2 * r * u, r * u); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(px * u, 0, r * u, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
    ctx.restore();
    if (env.labels) {
      label(ctx, u, `${b.title} · ${b.scale} · level ${wall} of ${BARRIERS.length}`, 0, -0.72, COLORS.cyan, 'center', 0.036);
      label(ctx, u, `${b.who} against ${b.what}`, 0, -0.65, COLORS.ink, 'center', 0.024);
      label(ctx, u, `T ≈ exp(−2d·√(2m(V−E))/ħ) = ${formatT(b)}`, 0, 0.84, COLORS.gold, 'center', 0.028);
      label(ctx, u, reason(b), 0, 0.92, COLORS.dim, 'center', 0.022);
      if (wallEvent.until > t) label(ctx, u, wallEvent.text, 0, -0.57, wallEvent.text.startsWith('TUNNEL') ? COLORS.cyan : COLORS.orange, 'center', 0.03);
      else label(ctx, u, 'POKE: send it at the wall · ▼ ▲: the elevator, a scale down or up · FX: the graphics', 0, -0.57, COLORS.dim, 'center', 0.022);
      if (b.id === 'quantum' || b.id === 'atom') {
        const lines = ['Tunnelling in the body and brain, honestly:',
          'established: electrons and protons tunnel in enzymes and the respiratory chain;',
          'contested: tunnelling in smell (Turin); speculative: Orch-OR (Penrose, Hameroff; Tegmark 2000).',
          'The programme\'s limbic tunnel is a model (a WKB gate), not a claim that neurons tunnel.'];
        lines.forEach((l, k) => label(ctx, u, l, -W + 0.04, -0.46 + k * 0.042, k ? COLORS.dim : COLORS.violet, 'left', 0.018));
      }
    }
  }

  // the stage strip and its line, at the top of either view
  function drawStages(ctx, env) {
    const { u } = env;
    URETER_STAGES.forEach((stg, k) => {
      const x = -0.66 + k * 0.44;
      const on = k === model.stage;
      label(ctx, u, `${k + 1} ${stg.title}`, x, -0.66, on ? COLORS.gold : 'rgba(232,238,252,0.4)', 'center', on ? 0.03 : 0.024);
    });
    wrapLines(URETER_STAGES[model.stage].line, 120).forEach((l, k) => label(ctx, u, l, 0, -0.61 + k * 0.035, COLORS.ink, 'center', 0.019));
  }

  return {
    focus: [0, 0],
    tick() {},
    get model() { return model; },
    get wall() { return wall; },
    get gl() { return gl; },
    setWall(n) { wall = Math.max(0, Math.min(BARRIERS.length, n)); shot.state = 'idle'; shot.through = false; wallEvent = { text: '', until: 0 }; },
    poke(strength) {
      if (wall) { if (shot.state === 'idle') { shot.state = 'go'; shot.x = -0.75; shot.through = false; } return; }
      const r = model.poke();
      if (r === 'wave') pokeEvent = { text: 'a drink: more urine comes down, another wave', until: model.time + 3 };
    },
    draw(ctx, env) {
      const { u, t, phi } = env;
      if (wall) { drawWall(ctx, env); return; }
      const view = env.uv || 'in';
      const W = env.w / 2 / u;
      if (view === 'out' || !env.gl) {
        // OUTSIDE: the urinary tract, full screen
        ctx.save();
        ctx.fillStyle = '#0b0d16';
        ctx.fillRect(-W * u, -env.h / 2, 2 * W * u, env.h);
        ctx.restore();
        const bw = Math.min(1.05, 2 * W - 0.2);
        drawUreterOutside(ctx, u, env, model, { x: -bw / 2, y: -0.6, w: bw * 0.92 });
        if (env.labels) {
          drawStages(ctx, env);
          label(ctx, u, `${URETER_STAGES[model.stage].poke} · STAGE ▸: the next stage · a teaching picture: days compressed into seconds, not medical advice`, 0, 0.94, COLORS.dim, 'center', 0.018);
        }
        return;
      }
      gl = env.gl;
      gl.render({ phi, resource: env.resource, dim: env.dim, time: t, stereo: env.stereo, ureter: model });
      if (view === 'both') {
        // BOTH: the outside as a panel beside the inside
        const bw = Math.min(0.62, W * 0.55);
        const bx = W - bw - 0.04;
        ctx.save();
        ctx.fillStyle = 'rgba(6,8,16,0.82)';
        ctx.fillRect((bx - 0.02) * u, -0.64 * u, (bw + 0.04) * u, 1.42 * u);
        ctx.restore();
        drawUreterOutside(ctx, u, env, model, { x: bx, y: -0.56, w: bw });
      }
      if (env.labels && gl.view === 'orbit') {
        label(ctx, u, 'ORBIT · THE STONE · 6 mm · drag to turn, the wheel to zoom', 0, -0.7, COLORS.gold, 'center', 0.03);
        label(ctx, u, 'calcium oxalate dihydrate (weddellite): sharp bipyramid crystals, honey to ivory; brown flecks of the monohydrate', 0, 0.7, COLORS.dim, 'center', 0.022);
        return;
      }
      if (env.labels && gl.view === 'climb') {
        const alt = gl.climbAltitude;
        label(ctx, u, alt > 0.97 ? 'SUMMIT · the first ascent of the north face of the Stone' : `THE NORTH FACE · altitude ${(6 * alt).toFixed(1)} of 6 mm`, 0, -0.7, alt > 0.97 ? COLORS.gold : COLORS.cyan, 'center', 0.03);
        label(ctx, u, 'the climber is 40 µm tall: the stone is 150 climbers high (an Eiger north face is about 1.8 km, some 1000 climbers)', 0, 0.7, COLORS.dim, 'center', 0.022);
        return;
      }
      if (env.labels) {
        const pain = Math.min(1, model.pain);
        drawStages(ctx, env);
        const where = model.stage === 2 ? (gl.blocked ? 'THE SCOPE AT THE STONE' : 'THE SCOPE comes up from the bladder') : model.stage === 1 ? 'INSIDE, above the stone: the stent (blue, on the floor) drains past it; the swelling falls' : model.stone > 0 ? 'INSIDE the ureter above the stone, looking down at it: the tube swells, the waves crash into it' : 'INSIDE the ureter: the waves pass freely';
        label(ctx, u, where, 0, -0.47, COLORS.teal, 'center', 0.024);
        label(ctx, u, `pain ${'█'.repeat(Math.round(pain * 10)).padEnd(10, '·')}  ${Math.round(70 + 40 * pain)} BPM${model.stage === 2 ? ' · under anaesthetic: the nerves still signal (' + Math.round(100 * Math.min(1, model.raw)) + '%), it is not felt' : ''}`, 0, 0.62, pain > 0.5 ? COLORS.red : COLORS.dim, 'center', 0.028);
        label(ctx, u, `${URETER_STAGES[model.stage].poke} · STAGE ▸ the next stage · VIEW: inside, outside, both · LOOP: the head joins in`, 0, 0.7, COLORS.dim, 'center', 0.02);
        if (env.body) label(ctx, u, `THE HEAD: Φ ${BODY.loop.phi.toFixed(2)}, tension ×${BODY.loop.bodyGain.toFixed(2)} on the spasms${BODY.loop.breath > 0.5 ? ' · the limbic breath is softening them' : ''}`, 0, 0.56, BODY.loop.breath > 0.5 ? COLORS.cyan : '#ff8090', 'center', 0.022);
        if (gl.event.until > t) label(ctx, u, gl.event.text, 0, -0.41, COLORS.gold, 'center', 0.03);
        else if (pokeEvent.until > model.time) label(ctx, u, pokeEvent.text, 0, -0.41, COLORS.gold, 'center', 0.028);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: the score (The Tensor)

// The Tensor's containers (SETTING on the SCORE stop; hash kc)
export const SETTING_IDS = ['mind', 'river', 'body', 'session'];

const MODE_COLORS = { S: '#3fd0c9', F: '#ff4d5e', C: '#ffd166', A: '#a78bfa', G: '#8ecbff', L: '#e8eefc', PV: '#ff7aa8' };

let scoreModes = null;
let scoreT = 0;
let midiInStatus = 'off';
// the score as MIDI for Ableton (ISS-073), when the Engine Room switches it on
const midiOut = createMidiOut();

function makeScore() {
  let gl = null;
  let player = null;
  let twinModes = null; // the twin view: the right window's viewer (a preset), frame by frame
  let twinClock = 0;
  let film = RIVER_SCORE;
  let params = '';
  let bpmS = 68;
  let hdot = 0;
  const gaps = [];
  let entrainClock = 0;
  let viewer = null;
  // The Trilogy of Containers (paper Part IV): the same score in the river, the body or the
  // session; one player, so the thresholds fall at the same story-times in all three.
  const pair = { a: 0, b: 0.3 }; // the session: client and therapist (the dyad's oscillators)
  let hrv = null;      // from the strap's RR intervals, refreshed every 2 s
  // the film (?film=1): H-AL speaks each phase line of the score as story-time reaches it
  let spokenPhase = null;
  let narrator = null;
  let cardPhase = null; // the intertitle on screen (kx 2) and how long it has left
  // the pilot (ISS-074): started by a poke; what H-AL last said per mode; the line on screen
  let pilotKey = '';
  let pilotStarted = false;
  let pilotSaid = {};
  let pilotText = '';
  let pilotTextT = 0;
  let pilotClock = 0;
  let pilotLast = -99;
  let handedOver = false;
  let lastEnv = null;
  const owned = env => (env.ap === 'manual' ? PILOT_ORDER.length : env.ap === 'co' ? Math.max(1, Math.min(7, env.own || 1)) : 0);
  const pilotModes = (base, env) => {
    if (!env.ap) return base;
    if (!pilotStarted) return Object.fromEntries(Object.keys(base).map(id => [id, 0]));
    const out = { ...base };
    for (const id of PILOT_ORDER.slice(0, owned(env))) if (id in out) out[id] = Number(env.knobs?.[id] ?? 0);
    return out;
  };
  const pilotSay = (text, env) => {
    pilotText = text;
    pilotTextT = 6;
    if (env.kx >= 4) { narrator ??= createVoice(); narrator.speak(text, 'hal'); }
  };
  let cardTime = 0;
  let suggested = false;
  let hrvClock = 0;
  let pairR = 1;
  let burst = false;
  return {
    focus: [0, 0],
    tick(env) {
      const key = `${env.kv}|${env.st}|${env.kd}|${env.kw}|${env.km}|${env.kf}|${mineVersion}`;
      if (!player || key !== params) {
        params = key;
        film = filmScore(env.kf);
        player = createScorePlayer(film, { kappaV: env.kv, start: env.st, kappaD: env.kd, kappaW: env.kw, mask: env.km ? env.km.split(',') : null });
      }
      // the heart, smoothed (the slider jumps; a heart does not), and its trend Hdot in bpm/s
      const before = bpmS;
      bpmS += (env.bpm - bpmS) * Math.min(1, env.dt / 3);
      hdot += ((bpmS - before) / Math.max(env.dt, 1e-3) - hdot) * Math.min(1, env.dt / 1.5);
      hrvClock += env.dt;
      if (hrvClock > 2) { hrvClock = 0; hrv = env.strap && env.rr ? hrvFromRR(env.rr) : null; }
      viewer = viewerField(bpmS, hdot, hrv);
      lastEnv = env;
      if (`${env.ap}` !== pilotKey) { pilotKey = `${env.ap}`; pilotStarted = false; pilotSaid = {}; pilotText = ''; handedOver = false; }
      if (!env.ap || pilotStarted) player.step(env.dt, { kr: env.kr, hdot, bpm: bpmS });
      scoreModes = pilotModes(player.modes(viewer, env.kr), env);
      scoreT = player.t;
      // H-AL thinks aloud about the modes it still flies: one line at a time, at most every 6 s
      pilotClock += env.dt;
      pilotTextT = Math.max(0, pilotTextT - env.dt);
      if ((env.ap === 'auto' || env.ap === 'co') && pilotStarted && pilotClock - pilotLast > 6) {
        for (const id of PILOT_ORDER.slice(owned(env))) {
          const v = scoreModes[id];
          if (v === undefined) continue;
          const before = pilotSaid[id] ?? 0;
          if (Math.abs(v - before) > 0.2) {
            pilotSaid[id] = v;
            pilotLast = pilotClock;
            pilotSay(pilotLine(id, v, v > before), env);
            break;
          }
        }
      }
      // a finished co-pilot journey hands over one more knob next time
      if (env.ap === 'co' && player.t >= 0.999 && !handedOver) {
        handedOver = true;
        try { localStorage.setItem('soma-handover', String(Math.min(7, owned(env) + 1))); } catch { /* private mode */ }
      }
      // the twin view: the same film, the same live knobs and heart, seen by a viewer preset
      // (score.js: the baseline offsets and condition operators, then the ADHD noise and C-PTSD lag)
      // the twin view, or the B side of the one-screen flip (ab=b, ISS-069): the same film,
      // the same live knobs and heart, seen by a viewer preset
      if (env.tw || env.ab === 'b') {
        const p = presetParams(viewerPreset(env.pv), { adhd: env.ca, asd: env.cs, cptsd: env.cp });
        twinClock += env.dt;
        twinModes = viewerStep(viewerTransform(scoreModes, p), p, twinModes, twinClock, env.dt);
      } else twinModes = null;
      if (player.justCrossed >= 0) burst = true;
      const phase = player.phase();
      midiOut.send({ modes: scoreModes, bpm: bpmS, t: player.t, phase: (player.phaseList ?? []).indexOf(phase), crossed: player.justCrossed });
      // browsers only speak after the viewer has touched the page: wait for that, then say the
      // phase the film is in
      const mayspeak = typeof navigator === 'undefined' || (navigator.userActivation?.hasBeenActive ?? true);
      if (env.kx >= 4 && mayspeak && phase.name && phase.name !== spokenPhase) {
        spokenPhase = phase.name;
        narrator ??= createVoice();
        narrator.speak(phase.line, 'hal');
      }
      if (env.kx === 2 && phase.name && phase.name !== cardPhase) { cardPhase = phase.name; cardTime = 3.5; }
      cardTime = Math.max(0, cardTime - env.dt);
      // after a viewing: suggest one notch fewer words next time (remembered, not imposed)
      if (player.t >= 0.999 && !suggested && env.kx > 0) {
        suggested = true;
        try { localStorage.setItem('soma-kx-suggest', String(env.kx - 1)); } catch { /* private mode */ }
      }
      if (player.t < 0.5) suggested = false;
      if (env.kc === 'session') {
        const m = scoreModes;
        for (let k = 0; k < 3; k++) pairR = dyadStep(pair, m.F, m.S > 0.5, env.dt / 3);
      }
    },
    poke(strength) {
      if (lastEnv?.ap && !pilotStarted) {
        pilotStarted = true;
        pilotClock = 0;
        pilotLast = 0;
        const env = lastEnv;
        const yours = PILOT_ORDER.slice(0, owned(env)).map(id => PILOT_NAMES[id]);
        pilotSay(env.ap === 'auto' ? 'In this river I would feel it like this. Watch the knobs.'
          : env.ap === 'co' ? `You have ${yours.join(', ')}. I keep the rest.` : 'Every knob is yours.', env);
        return;
      }
      if (player?.holding) player.ready();
      else gl?.poke(strength);
    },
    draw(ctx, env) {
      const { u, t } = env;
      if (!player) return;
      // the one-screen flip (ISS-069): A the film as it is, B the preset viewer's version
      const flipB = env.ab === 'b' && !env.tw && twinModes;
      const m = flipB ? { ...pilotModes(player.modes(viewer, env.kr), env), ...twinModes } : pilotModes(player.modes(viewer, env.kr), env);
      const target = player.modes();
      if (env.gl) {
        gl = env.gl;
        // a threshold crossing is a burst in every container (a rupture in the session)
        if (burst) {
          burst = false;
          if (env.kc === 'session') pair.b += Math.PI * 0.9;
          else gl.poke?.(1);
        }
        if (env.kc === 'river') {
          // upriver: narrowest at the encounter (story-time ~0.7), open again on the return
          const narrow = Math.exp(-(((player.t - 0.68) / 0.22) ** 2));
          const river = { narrow, light: m.S, fear: m.F, mist: Math.max(0, 1 - m.L) };
          // the twin view: the same river, rendered for the preset viewer (its own light, fear, mist)
          const w = env.tw ? twinModes : null;
          const side = w ? { narrow, light: w.S, fear: w.F, mist: Math.max(0, 1 - w.L) } : null;
          gl.render({ sector: 'river', phi: 0.15 + 0.6 * m.F, time: t, stereo: side ? 'off' : env.stereo, river, twin: side });
        }
        else if (env.kc === 'body') gl.render({ world: 'organismal', phi: m.F, resource: m.S > 0.5, dim: 11, time: t, stereo: env.stereo, score: m, bpm: bpmS });
        else if (env.kc === 'session') gl.render({ a: pair.a, b: pair.b, r: pairR, coupling: DYAD.coupling(m.S > 0.5), dim: 11, time: t, stereo: env.stereo });
        else gl.render({ sector: 'mind', phi: m.F, time: t, stereo: env.stereo, score: m, texture: env.kt });
      }
      if (!env.labels) return;
      const SETTINGS = { mind: 'THE MIND · the Mandelbulb', river: 'THE RIVER · upriver by boat', body: 'THE BODY · the submarine in the bloodstream', session: 'THE SESSION · client and therapist' };
      if (env.tw && twinModes && env.kc === 'river') {
        // the twin view: one film, two viewers
        const xr = (env.w / 4) / u;
        const pr = viewerPreset(env.pv);
        const p = presetParams(pr, { adhd: env.ca, asd: env.cs, cptsd: env.cp });
        label(ctx, u, `NOW · the neutral viewer · ${filmName(film, env.kx)}`, -xr, -0.64, COLORS.ink, 'center', 0.028);
        label(ctx, u, `${(pr?.title ?? 'neutral').toUpperCase()} · the same film`, xr, -0.64, COLORS.ink, 'center', 0.028);
        label(ctx, u, `ADHD ${p.adhd.toFixed(2)} · ASD ${p.asd.toFixed(2)} · C-PTSD ${p.cptsd.toFixed(2)} (model operators, not diagnoses)`, xr, -0.6, COLORS.dim, 'center', 0.022);
      } else if (flipB) {
        const pr = viewerPreset(env.pv);
        label(ctx, u, `B · ${(pr?.title ?? 'neutral').toUpperCase()} · your version of ${filmName(film, env.kx)} (A/B to flip back)`, 0, -0.64, COLORS.gold, 'center', 0.028);
      } else if (env.kx >= 1) label(ctx, u, `SETTING: ${SETTINGS[env.kc] ?? SETTINGS.mind} · the same score`, 0, -0.64, COLORS.ink, 'center', 0.028);
      if (env.kc === 'session') label(ctx, u, `in step r = ${pairR.toFixed(2)}`, 0, -0.6, pairR > 0.9 ? COLORS.teal : COLORS.orange, 'center', 0.024);
      // the score: seven bars, story-time, the phase
      const names = player.names();
      // the score panel on the right, clear of the caption card on the left
      const x0 = 0.95 * (env.w / 2) / u - 0.72;
      MODE_IDS.forEach((id, k) => {
        const y = -0.55 + k * 0.06;
        label(ctx, u, names[k] ?? id, x0, y, MODE_COLORS[id], 'left', 0.024);
        ctx.save();
        ctx.fillStyle = 'rgba(232,238,252,0.12)';
        ctx.fillRect((x0 + 0.24) * u, (y - 0.012) * u, 0.3 * u, 0.024 * u);
        ctx.fillStyle = MODE_COLORS[id];
        ctx.fillRect((x0 + 0.24) * u, (y - 0.012) * u, 0.3 * m[id] * u, 0.024 * u);
        // the twin view: the preset viewer's value, a thin bar under the viewer of now
        if (twinModes) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.7;
          ctx.fillRect((x0 + 0.24) * u, (y + 0.014) * u, 0.3 * (twinModes[id] ?? 0) * u, 0.006 * u);
          ctx.globalAlpha = 1;
        }
        // the score's own value (the target) as a white tick, when the viewer changes it
        if (env.kr > 0) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect((x0 + 0.24 + 0.3 * target[id]) * u - 1, (y - 0.02) * u, 2, 0.04 * u);
        }
        ctx.restore();
      });
      const loopName = { 0: 'PROJECTION', 0.5: 'RESONANCE', 1: 'MIRROR' }[env.kr];
      label(ctx, u, `♥ ${Math.round(bpmS)}${env.strap ? ' (strap)' : ''} · Ḣ ${hdot >= 0 ? '+' : ''}${hdot.toFixed(2)}/s · ${loopName}`, x0, -0.12, COLORS.red, 'left', 0.024);
      if (env.kr > 0 && player.slowed < 0.95) label(ctx, u, `heart rising: film ×${player.slowed.toFixed(2)}`, x0, -0.07, COLORS.orange, 'left', 0.024);
      if (hrv) label(ctx, u, `HRV ${Math.round(hrv.rmssd)} ms · breath ${hrv.breath.toFixed(0)}/min · coherence ${hrv.coherence.toFixed(2)} (estimates)`, x0, -0.02, COLORS.teal, 'left', 0.022);
      else if (env.strap) label(ctx, u, 'HRV: collecting beats (20 s)', x0, -0.02, COLORS.dim, 'left', 0.022);
      if (midiOut.status !== 'off') label(ctx, u, `MIDI ${midiOut.status}`, x0, 0.03, COLORS.dim, 'left', 0.02);
      if (midiInStatus !== 'off') label(ctx, u, `MIDI IN ${midiInStatus}`, x0, 0.13, COLORS.dim, 'left', 0.02);
      // entrainment (P9, BRECVEMA's rhythmic entrainment): the gap between the music's pulse and
      // the heart, and whether it closes over the last minute. A measure, not a proof.
      if (env.music) {
        const pulse = (1 - env.kr) * scoreTempo(m) + env.kr * bpmS;
        const gap = bpmS - pulse;
        entrainClock += env.dt;
        if (entrainClock >= 1) { entrainClock = 0; gaps.push(Math.abs(gap)); if (gaps.length > 60) gaps.shift(); }
        let trend = '';
        if (gaps.length >= 20) {
          const n = gaps.length;
          const mx = (n - 1) / 2;
          const my = gaps.reduce((a, b) => a + b, 0) / n;
          let sxy = 0, sxx = 0;
          gaps.forEach((g, k) => { sxy += (k - mx) * (g - my); sxx += (k - mx) * (k - mx); });
          const slope = (sxy / sxx) * 60;
          trend = slope < -0.5 ? ` · closing ${(-slope).toFixed(1)} bpm/min: entraining` : slope > 0.5 ? ` · opening ${slope.toFixed(1)} bpm/min` : ' · steady';
        }
        label(ctx, u, `♪ PULSE ${Math.round(pulse)} · ♥ ${Math.round(bpmS)} · gap ${gap >= 0 ? '+' : ''}${gap.toFixed(0)}${trend}`, x0, 0.08, COLORS.violet, 'left', 0.02);
      } else gaps.length = 0;
      const bar = { x: -0.6, w: 1.2, y: 0.78 };
      ctx.save();
      ctx.fillStyle = 'rgba(232,238,252,0.15)';
      ctx.fillRect(bar.x * u, bar.y * u, bar.w * u, 0.01 * u);
      ctx.fillStyle = COLORS.gold;
      ctx.fillRect(bar.x * u, bar.y * u, bar.w * player.t * u, 0.01 * u);
      for (const th of film?.thresholds ?? []) ctx.fillRect((bar.x + bar.w * th.t) * u - 1, (bar.y - 0.02) * u, 2, 0.05 * u);
      ctx.restore();
      const phase = player.phase();
      const mins = (player.t * player.seconds) / 60;
      label(ctx, u, `${filmName(film, env.kx)}${env.kx >= 2 ? ` · ${phase.name}` : ''} · t = ${player.t.toFixed(3)} · ${mins.toFixed(1)} min · κv ${player.velocity}`, 0, bar.y - 0.04, COLORS.dim, 'center', 0.024);
      const kn = player.knobs;
      label(ctx, u, `κd ${kn.kd.toFixed(2)} · κt ${(env.kt ?? 0).toFixed(2)} · κW ${kn.kw.toFixed(2)} · modes ${kn.mask.join(' ')}`, 0, bar.y - 0.09, COLORS.dim, 'center', 0.022);
      // words fade with the Language mode: at the bottom of the river there are none
      if (env.kx >= 3) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, (m.L - 0.1) / 0.6));
        label(ctx, u, phase.line, 0, 0.66, COLORS.ink, 'center', 0.034);
        ctx.restore();
      }
      // kx 2: a silent-film intertitle when a phase begins, the frame darkened behind it
      if (env.kx === 2 && cardTime > 0 && cardPhase) {
        const a = Math.min(1, cardTime / 0.6, (3.5 - cardTime) / 0.4);
        ctx.save();
        ctx.globalAlpha = 0.85 * a;
        ctx.fillStyle = '#000';
        ctx.fillRect(-env.w / 2, -env.h / 2, env.w, env.h);
        ctx.globalAlpha = a;
        ctx.strokeStyle = '#e8eefc';
        ctx.lineWidth = 2;
        ctx.strokeRect(-0.42 * u, -0.16 * u, 0.84 * u, 0.32 * u);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = a;
        label(ctx, u, cardPhase, 0, 0.0, COLORS.ink, 'center', 0.06);
        ctx.restore();
      }
      if (player.t >= 0.999 && env.kx > 0) label(ctx, u, `Next time, try it with fewer words: ${WORDS[env.kx - 1]} (WORDS)`, 0, 0.58, COLORS.gold, 'center', 0.028);
      // RICE (ISS-075): crew alerting, as a glass cockpit does: red WARNING, amber CAUTION,
      // cyan ADVISORY, read from the score and the heart. Model alerts, not clinical ones.
      if (rice()) {
        const alerts = [];
        if (m.S < 0.2 && m.F > 0.55) alerts.push(['WARNING', 'FREEZE ATTRACTOR NEAR (safety low, fear high)', '#ff3b4f']);
        if (hdot > 0.5 || bpmS > 105) alerts.push(['CAUTION', `HEART RISING (${Math.round(bpmS)} bpm, ${hdot >= 0 ? '+' : ''}${hdot.toFixed(1)}/s)`, '#f6b73c']);
        const next = (film?.thresholds ?? []).find(th => th.t > player.t);
        const toNext = next ? ((next.t - player.t) * player.seconds) / 60 : Infinity;
        if (toNext < 2) alerts.push(['ADVISORY', `THRESHOLD ${next.id} IN ${toNext < 1 ? `${Math.round(toNext * 60)} S` : `${toNext.toFixed(1)} MIN`}`, '#3fd0e9']);
        alerts.forEach(([level, text, colour], k) => {
          const y = -0.5 + k * 0.055;
          ctx.save();
          ctx.fillStyle = level === 'WARNING' ? colour : 'rgba(4,8,16,0.85)';
          ctx.strokeStyle = colour;
          ctx.lineWidth = 1.5;
          ctx.fillRect(-0.44 * u, (y - 0.022) * u, 0.88 * u, 0.044 * u);
          ctx.strokeRect(-0.44 * u, (y - 0.022) * u, 0.88 * u, 0.044 * u);
          ctx.restore();
          label(ctx, u, `${level} · ${text}`, 0, y, level === 'WARNING' ? '#ffffff' : colour, 'center', 0.022);
        });
      }
      if (env.ap && !pilotStarted) label(ctx, u, 'STILL · every mode at zero · POKE to begin', 0, 0.0, COLORS.gold, 'center', 0.04);
      if (env.ap && pilotTextT > 0 && env.kx >= 3) {
        ctx.save();
        ctx.globalAlpha = Math.min(1, pilotTextT / 0.8);
        label(ctx, u, `H-AL: ${pilotText}`, 0, 0.6, '#9ad9ff', 'center', 0.03);
        ctx.restore();
      }
      // RICE (ISS-075): the route plan, as a glass cockpit's vertical profile: the journey's
      // descent below words (Language as the altitude), thresholds as waypoints, phases as
      // legs, the chevron where the viewer is now
      if (rice() && player.modesAt) {
        const box = { x: -0.95 * (env.w / 2) / u + 0.04, y: 0.34, w: 0.8, h: 0.3 };
        if (box.x < -1.6) box.x = -1.6;
        ctx.save();
        ctx.fillStyle = 'rgba(0,0,0,0.78)';
        ctx.strokeStyle = 'rgba(232,238,252,0.35)';
        ctx.fillRect(box.x * u, box.y * u, box.w * u, box.h * u);
        ctx.strokeRect(box.x * u, box.y * u, box.w * u, box.h * u);
        const px = tt => (box.x + 0.03 + (box.w - 0.06) * tt) * u;
        const py = alt => (box.y + 0.04 + (box.h - 0.09) * (1 - alt)) * u;
        ctx.strokeStyle = '#ff4fd8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let k = 0; k <= 80; k++) {
          const tt = k / 80;
          const alt = player.modesAt(tt).L ?? 0;
          if (k === 0) ctx.moveTo(px(tt), py(alt)); else ctx.lineTo(px(tt), py(alt));
        }
        ctx.stroke();
        ctx.fillStyle = '#3fd0e9';
        for (const th of player.thresholdList ?? []) {
          const x = px(th.t);
          const y = py(player.modesAt(th.t).L ?? 0);
          ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x - 5, y + 4); ctx.lineTo(x + 5, y + 4); ctx.closePath(); ctx.fill();
        }
        // the chevron: where the viewer is now
        const nx = px(player.t);
        const ny = py(m.L ?? 0);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.moveTo(nx + 8, ny); ctx.lineTo(nx - 6, ny - 6); ctx.lineTo(nx - 2, ny); ctx.lineTo(nx - 6, ny + 6); ctx.closePath(); ctx.fill();
        ctx.restore();
        label(ctx, u, 'VERT PROFILE · ALT = LANGUAGE', box.x + 0.02, box.y + 0.02, '#9fe8ff', 'left', 0.018);
        for (const th of player.thresholdList ?? []) label(ctx, u, th.id, (px(th.t) / u) - 0.012, py(player.modesAt(th.t).L ?? 0) / u - 0.035, '#3fd0e9', 'left', 0.017);
        (player.phaseList ?? []).filter(p => p.name).forEach((ph, k) => label(ctx, u, ph.name.slice(0, 10).toUpperCase(), (px(ph.t) / u) + 0.004, box.y + box.h - 0.018 - 0.021 * (k % 3), ph === player.phase() ? '#ffffff' : 'rgba(232,238,252,0.5)', 'left', 0.013));
      }
      if (player.holding) label(ctx, u, `THRESHOLD ${player.holding.id} · ${player.holding.from} → ${player.holding.to} · ${env.kr > 0 ? 'waiting for the heart to settle (falling, below 85) or POKE' : 'holding until ready (POKE)'}`, 0, -0.7, COLORS.gold, 'center', 0.03);
    },
  };
}

// ---------------------------------------------------------------- stop: fly

function makeFlight() {
  let gl = null;
  const stars = Array.from({ length: 220 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
  return {
    focus: [0, 0],
    tick() {},
    poke(strength) { gl?.poke(strength); },
    draw(ctx, env) {
      const { u, phi, t } = env;
      if (env.gl) {
        gl = env.gl;
        gl.render({ sector: env.world, phi, time: t, stereo: env.stereo });
      } else {
        // 2D fallback: a warp of stars
        for (const s of stars) {
          s.z -= env.dt * (0.15 + 0.4 * phi);
          if (s.z <= 0.02) Object.assign(s, { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: 1 });
          dot(ctx, u, (s.x / s.z) * 0.4, (s.y / s.z) * 0.4, 0.004 / s.z, '#cfe8ff', 1 - s.z);
        }
      }
      if (env.labels) {
        label(ctx, u, worldName(env.world), 0, -0.7, COLORS.ink, 'center', 0.04);
        const zoom = env.world === 'mind' && gl?.depth ? ` · diving: zoom ×${gl.depth < 1000 ? gl.depth.toFixed(0) : Math.round(gl.depth).toLocaleString('en')}` : '';
        label(ctx, u, `${env.levelLabel} · speed Φ ${phi.toFixed(2)}${zoom}`, 0, -0.62, COLORS.dim, 'center', 0.026);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: one neuron

function makeNeuron() {
  const rand = seeded(11);
  const Y0 = -0.2;
  const soma = [-0.38, Y0];
  const dendrites = [];
  const grow = (x, y, a, len, depth) => {
    const x2 = x + Math.cos(a) * len;
    const y2 = y + Math.sin(a) * len;
    dendrites.push([[x, y], [x2, y2], depth]);
    if (depth < 2) for (const da of [-0.45, 0.45]) grow(x2, y2, a + da + (rand() - 0.5) * 0.3, len * 0.68, depth + 1);
  };
  for (let k = 0; k < 6; k++) {
    const a = Math.PI * (0.62 + k * 0.15) + (rand() - 0.5) * 0.2;
    grow(soma[0] + Math.cos(a) * 0.06, soma[1] + Math.sin(a) * 0.06, a, 0.17, 0);
  }
  const axonPts = [];
  for (let x = -0.315; x <= 0.6001; x += 0.035) axonPts.push([x, Y0 + 0.02 * Math.sin(6 * x)]);
  const axon = polyline(axonPts);
  const GHOST = [0.14, 0.27];
  const ghostAxon = polyline(axonPts.map(([x, y]) => [x + GHOST[0], y + GHOST[1]]));
  const terminals = [[0.72, Y0 - 0.12], [0.74, Y0 - 0.03], [0.73, Y0 + 0.07], [0.7, Y0 + 0.15]];
  const NODES = 8;
  const spikes = [];
  const ghostSpikes = [];
  const history = [];
  let lastFire = -10;
  let somaFlash = 0;
  let clock = 0;
  const fire = () => {
    spikes.push({ s: 0, passed: false });
    history.push(clock);
    lastFire = clock;
    somaFlash = 1;
  };
  const saltatory = s => {
    const k = Math.floor(s * NODES);
    const f = s * NODES - k;
    return (k + ease(clamp(f * 2.5, 0, 1))) / NODES;
  };
  return {
    focus: [0.7, Y0],
    tick(env) {
      clock += env.dt;
      somaFlash = Math.max(0, somaFlash - env.dt * 3);
      if (env.dim >= 8 && clock - lastFire > 0.02 && Math.random() < (0.4 + 5 * env.phi) * env.dt) fire();
      for (const sp of spikes) {
        sp.s += env.dt / 1.1;
        if (!sp.passed && sp.s > 0.5) {
          sp.passed = true;
          if (env.dim >= 11 && Math.random() < 0.15 + 0.5 * env.phi) ghostSpikes.push({ s: 0.45 });
        }
      }
      for (const sp of ghostSpikes) sp.s += env.dt / 1.1;
      for (const list of [spikes, ghostSpikes]) for (let i = list.length - 1; i >= 0; i--) if (list[i].s > 1.1) list.splice(i, 1);
      while (history.length && clock - history[0] > 5) history.shift();
    },
    poke() { fire(); },
    draw(ctx, env) {
      const { u, dim, phi, t } = env;
      const drawCell = (dx, dy, alpha, axonPl, list) => {
        ctx.save();
        ctx.globalAlpha *= alpha;
        ctx.translate(dx * u, dy * u);
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#5a7fa8';
        for (const [a, b, depth] of dendrites) {
          ctx.lineWidth = (0.018 - depth * 0.005) * u;
          ctx.beginPath();
          ctx.moveTo(a[0] * u, a[1] * u);
          ctx.lineTo(b[0] * u, b[1] * u);
          ctx.stroke();
        }
        ctx.lineWidth = 0.014 * u;
        strokePath(ctx, u, axonPts);
        ctx.stroke();
        for (let k = 0; k < NODES; k++) {
          const a = along(axon, (k + 0.12) / NODES);
          const b = along(axon, (k + 0.88) / NODES);
          ctx.strokeStyle = '#cfd8e8';
          ctx.lineWidth = 0.04 * u;
          ctx.beginPath();
          ctx.moveTo(a[0] * u, a[1] * u);
          ctx.lineTo(b[0] * u, b[1] * u);
          ctx.stroke();
        }
        ctx.strokeStyle = '#5a7fa8';
        ctx.lineWidth = 0.01 * u;
        const end = axonPts[axonPts.length - 1];
        for (const p of terminals) {
          ctx.beginPath();
          ctx.moveTo(end[0] * u, end[1] * u);
          ctx.quadraticCurveTo((end[0] + 0.06) * u, end[1] * u, p[0] * u, p[1] * u);
          ctx.stroke();
          dot(ctx, u, p[0], p[1], 0.018, COLORS.gold, 0.9);
        }
        const breathe = 1 + 0.03 * Math.sin(t * 1.3);
        ctx.fillStyle = '#2f4f74';
        ctx.strokeStyle = '#8fb6e0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(soma[0] * u, soma[1] * u, 0.065 * breathe * u, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        if (dim >= 8) {
          ctx.save();
          ctx.translate(0, 0);
          for (const sp of list) {
            const [x, y] = along(axonPl, saltatory(clamp(sp.s, 0, 1)));
            glow(ctx, u, x, y, 0.06, COLORS.gold, 0.8 * alpha);
            dot(ctx, u, x, y, 0.012, '#fff', alpha);
            if (dim >= 11) ripples(env.fieldCtx ?? ctx, u, x, y, t, 0.6, 0.16, COLORS.cyan, 0.4 * alpha, 0.7);
          }
          ctx.restore();
        }
      };
      if (dim >= 11) drawCell(GHOST[0], GHOST[1], 0.38, ghostAxon, ghostSpikes);
      drawCell(0, 0, 1, axon, spikes);
      glow(ctx, u, soma[0], soma[1], 0.14, COLORS.gold, somaFlash * 0.9);
      if (dim >= 8) {
        // membrane voltage over the last 4 s; spikes drawn as lines (they last about 1 ms)
        const x0 = -0.4, x1 = 0.85, yTop = 0.44, yBot = 0.68, span = 4;
        const vy = v => lerp(yBot, yTop, (v + 80) / 115);
        ctx.save();
        ctx.strokeStyle = 'rgba(232,238,252,0.18)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x0 * u, (yTop - 0.02) * u, (x1 - x0) * u, (yBot - yTop + 0.04) * u);
        ctx.strokeStyle = COLORS.gold;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const cols = 220;
        for (let i = 0; i <= cols; i++) {
          const when = clock - span + (i / cols) * span;
          let v = -70 + 1.2 * Math.sin(when * 23) + 0.8 * Math.sin(when * 41 + 1) + 6 * phi * (0.5 + 0.5 * Math.sin(when * 9));
          for (const f of history) if (when > f) v -= 8 * Math.exp(-(when - f) / 0.06);
          const x = lerp(x0, x1, i / cols);
          if (i) ctx.lineTo(x * u, vy(v) * u);
          else ctx.moveTo(x * u, vy(v) * u);
        }
        ctx.stroke();
        for (const f of history) {
          if (clock - f > span) continue;
          const x = lerp(x0, x1, 1 - (clock - f) / span);
          ctx.beginPath();
          ctx.moveTo(x * u, vy(-70) * u);
          ctx.lineTo(x * u, vy(30) * u);
          ctx.stroke();
        }
        ctx.restore();
        if (env.labels) {
          label(ctx, u, '+30 mV', x0 - 0.01, vy(30), COLORS.dim, 'right', 0.022);
          label(ctx, u, '-70 mV', x0 - 0.01, vy(-70), COLORS.dim, 'right', 0.022);
          label(ctx, u, 'MEMBRANE VOLTAGE, LAST 4 S', (x0 + x1) / 2, yBot + 0.05, COLORS.dim, 'center', 0.024);
        }
      }
      if (env.labels) {
        label(ctx, u, 'DENDRITES', -0.7, Y0 - 0.33, '#8fb6e0');
        label(ctx, u, 'CELL BODY', -0.3, Y0 - 0.12, '#8fb6e0');
        label(ctx, u, 'AXON + MYELIN', 0.12, Y0 - 0.12, '#cfd8e8');
        label(ctx, u, 'SYNAPSES', 0.74, Y0 - 0.22, COLORS.gold);
        if (dim >= 11) label(ctx, u, 'NEIGHBOUR (ephaptic coupling)', 0.35, Y0 + GHOST[1] + 0.1, COLORS.cyan, 'center', 0.026);
      }
    },
  };
}

// ---------------------------------------------------------------- stop: memory network

const GLYPHS = {
  safe: ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...', '.......'],
  fight: ['....XX.', '...XX..', '..XXXX.', '....XX.', '...XX..', '..XX...', '.X.....'],
  freeze: ['X..X..X', '.X.X.X.', '..XXX..', 'XXXXXXX', '..XXX..', '.X.X.X.', 'X..X..X'],
};
const MEMORY_NAMES = Object.keys(GLYPHS);
const PATTERNS = MEMORY_NAMES.map(name => Float32Array.from(GLYPHS[name].join(''), c => (c === 'X' ? 1 : -1)));
const N_CELLS = 49;

// Gain and resource pull are tuned (scripts/explorer-check.mjs) so that calm keeps
// FREEZE even with the resource, heat without it ends in SAFE or FIGHT, and heat with
// it, then cooling, ends in SAFE.
const RECALL_GAIN = 2;
const RESOURCE_PULL = 0.1;

// PAST (H-AL's suggestion, ISS-052; interpretive): the memory kernel and asymmetric
// coupling. past = { trace }: recall compares a blend of the present and a fading trace of
// the past, K(tau) = exp(-tau / PAST_TAU) / PAST_TAU, so the past keeps shaping the ground;
// and the coupling is not symmetric (W_ij != W_ji): recalling FIGHT feeds FREEZE, not the
// reverse, after the defence cascade (fight or flight, then freeze). Off by default.
const PAST_TAU = 4;
const PAST_BLEND = 0.5;
const CASCADE = 0.35;

function memoryStep(x, phi, resource, dt, past = null) {
  const T = temperature(phi);
  const gamma = RECALL_GAIN / T;
  if (past) for (let i = 0; i < N_CELLS; i++) past.trace[i] += (x[i] - past.trace[i]) * Math.min(1, dt / PAST_TAU);
  const sims = PATTERNS.map((p, k) => {
    let s = 0;
    for (let i = 0; i < N_CELLS; i++) s += p[i] * (past ? (1 - PAST_BLEND) * x[i] + PAST_BLEND * past.trace[i] : x[i]);
    return s / N_CELLS + (resource && k === 0 ? RESOURCE_PULL : 0);
  });
  const m = Math.max(...sims);
  const e = sims.map(s => Math.exp(gamma * (s - m)));
  const z = e.reduce((a, b) => a + b, 0);
  const w = e.map(v => v / z);
  if (past) {
    const fed = CASCADE * w[1];
    w[1] -= fed;
    w[2] += fed;
  }
  const noise = 0.02 + 0.55 * phi * phi;
  const k = 1 - Math.exp(-dt * 6);
  for (let i = 0; i < N_CELLS; i++) {
    let target = 0;
    for (let j = 0; j < PATTERNS.length; j++) target += w[j] * PATTERNS[j][i];
    x[i] = clamp(x[i] + k * (target - x[i]) + noise * Math.sqrt(dt) * gauss(), -1.2, 1.2);
  }
  return w;
}

function cellColor(v, alpha = 1) {
  const f = clamp((v + 1) / 2, 0, 1);
  return `rgba(${Math.round(lerp(29, 255, f))},${Math.round(lerp(53, 209, f))},${Math.round(lerp(87, 102, f))},${alpha})`;
}

function makeNetwork() {
  const x = Float32Array.from(PATTERNS[2]);
  const past = { trace: Float32Array.from(x) };
  let weights = [0, 0, 1];
  const flips = new Float32Array(N_CELLS);
  const prevSign = Float32Array.from(x, Math.sign);
  const grid = { x0: -0.58, y0: -0.36, step: 0.09 };
  const thumbs = MEMORY_NAMES.map((name, k) => ({ name, x: 0.3, y: -0.58 + k * 0.4, step: 0.03 }));
  return {
    focus: [-0.31, -0.09],
    tick(env) {
      const steps = 3;
      if (!env.past) past.trace.set(x);
      for (let s = 0; s < steps; s++) weights = memoryStep(x, env.phi, env.resource, env.dt / steps, env.past ? past : null);
      for (let i = 0; i < N_CELLS; i++) {
        const sign = Math.sign(x[i]);
        if (sign !== prevSign[i]) flips[i] = 1;
        prevSign[i] = sign;
        flips[i] = Math.max(0, flips[i] - env.dt * 3);
      }
    },
    poke(strength) {
      for (let i = 0; i < N_CELLS; i++) if (Math.random() < 0.25 + 0.3 * strength) x[i] = -x[i];
    },
    draw(ctx, env) {
      const { u, dim, phi } = env;
      const best = weights.indexOf(Math.max(...weights));
      if (dim >= 11) {
        let r = 0, g = 0, b = 0;
        for (const [k, name] of MEMORY_NAMES.entries()) {
          const c = MEMORY_COLORS[name];
          r += weights[k] * parseInt(c.slice(1, 3), 16);
          g += weights[k] * parseInt(c.slice(3, 5), 16);
          b += weights[k] * parseInt(c.slice(5, 7), 16);
        }
        glow(ctx, u, -0.31, -0.09, 0.62, `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`, 0.35 + 0.25 * phi);
      }
      if (dim >= 8) {
        ctx.save();
        ctx.lineCap = 'round';
        for (const [k, th] of thumbs.entries()) {
          ctx.strokeStyle = MEMORY_COLORS[th.name];
          ctx.globalAlpha = env.alpha * (0.15 + 0.85 * weights[k]);
          ctx.lineWidth = Math.max(1, (0.004 + 0.035 * weights[k]) * u);
          ctx.beginPath();
          ctx.moveTo(-0.02 * u, -0.09 * u);
          ctx.bezierCurveTo(0.1 * u, -0.09 * u, 0.12 * u, (th.y + 0.09) * u, (th.x - 0.03) * u, (th.y + 0.09) * u);
          ctx.stroke();
        }
        ctx.restore();
      }
      for (let i = 0; i < N_CELLS; i++) {
        const cx = grid.x0 + (i % 7) * grid.step;
        const cy = grid.y0 + Math.floor(i / 7) * grid.step;
        if (dim >= 8 && flips[i] > 0) glow(ctx, u, cx, cy, 0.07, '#ffffff', flips[i] * 0.6);
        ctx.save();
        ctx.fillStyle = cellColor(x[i]);
        ctx.strokeStyle = 'rgba(232,238,252,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx * u, cy * u, 0.034 * u, 0, TAU);
        ctx.fill();
        ctx.stroke();
        // PAST: the trace as a ring around each cell, the colour of what it was
        if (env.past) {
          ctx.strokeStyle = cellColor(past.trace[i], 0.9);
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx * u, cy * u, 0.042 * u, 0, TAU);
          ctx.stroke();
        }
        ctx.restore();
      }
      for (const [k, th] of thumbs.entries()) {
        const p = PATTERNS[k];
        ctx.save();
        ctx.strokeStyle = MEMORY_COLORS[th.name];
        ctx.lineWidth = k === best ? 3 : 1.2;
        ctx.strokeRect((th.x - 0.02) * u, (th.y - 0.02) * u, (th.step * 7 + 0.01) * u, (th.step * 7 + 0.01) * u);
        for (let i = 0; i < N_CELLS; i++) {
          ctx.fillStyle = cellColor(p[i], 0.9);
          ctx.fillRect((th.x + (i % 7) * th.step - 0.012) * u, (th.y + Math.floor(i / 7) * th.step - 0.012) * u, 0.024 * u, 0.024 * u);
        }
        ctx.fillStyle = MEMORY_COLORS[th.name];
        ctx.globalAlpha *= 0.85;
        ctx.fillRect(0.56 * u, (th.y + 0.06) * u, weights[k] * 0.36 * u, 0.06 * u);
        ctx.restore();
        label(ctx, u, `${th.name.toUpperCase()} ${Math.round(weights[k] * 100)}%`, 0.56, th.y + 0.02, MEMORY_COLORS[th.name], 'left', 0.03);
      }
      if (env.labels) {
        const T = temperature(phi);
        label(ctx, u, `RECALLED: ${MEMORY_NAMES[best].toUpperCase()}`, -0.31, -0.52, MEMORY_COLORS[MEMORY_NAMES[best]], 'center', 0.038);
        label(ctx, u, `T = ${T.toFixed(2)}${env.resource ? '   RESOURCE: pull towards SAFE' : ''}`, -0.31, 0.31, COLORS.dim, 'center', 0.028);
        if (env.past) {
          label(ctx, u, `PAST: K(τ) = e^(−τ/${PAST_TAU} s), the rings are the trace; W_ij ≠ W_ji: FIGHT feeds FREEZE`, -0.31, 0.38, COLORS.violet, 'center', 0.022);
          label(ctx, u, 'the past keeps shaping the ground (interpretive: the defence cascade)', -0.31, 0.43, COLORS.dim, 'center', 0.02);
        }
      }
    },
  };
}

// ---------------------------------------------------------------- stop: landscape

const WELLS = [[0, 1], [Math.cos(7 * Math.PI / 6), Math.sin(7 * Math.PI / 6)], [Math.cos(-Math.PI / 6), Math.sin(-Math.PI / 6)]];
const RESOURCE_J = 0.22;

function energy(px, py, beta, J) {
  const s = WELLS.map(([a, b]) => beta * (a * px + b * py));
  const m = Math.max(...s);
  const lse = m + Math.log(s.reduce((acc, v) => acc + Math.exp(v - m), 0));
  return -lse / beta + 0.5 * (px * px + py * py) - J * (WELLS[0][0] * px + WELLS[0][1] * py);
}

function gradient(px, py, beta, J) {
  const s = WELLS.map(([a, b]) => beta * (a * px + b * py));
  const m = Math.max(...s);
  const e = s.map(v => Math.exp(v - m));
  const z = e.reduce((a, b) => a + b, 0);
  let gx = px - J * WELLS[0][0];
  let gy = py - J * WELLS[0][1];
  for (let k = 0; k < WELLS.length; k++) {
    gx -= (e[k] / z) * WELLS[k][0];
    gy -= (e[k] / z) * WELLS[k][1];
  }
  return [gx, gy];
}

// One step of the state on the landscape: downhill on E plus noise (Langevin). The noise
// is small when calm, so that a resource alone rarely frees a stuck state (checked in
// scripts/explorer-check.mjs).
const BALL_LIMIT = 1.37;
// MUSIC as forcing (H-AL, ISS-052; P9's rhythmic entrainment; interpretive): with the music
// on, its phrase rhythm tilts the ground towards SAFE and back, J(t) = J + A cos(2 pi t / P).
// A periodic push too small to cross a barrier alone, which with the noise can (stochastic
// resonance). forcing = { time } or null.
export const FORCING = { A: 0.12, P: 8 };
export const scoreTempo = m => Math.max(48, Math.min(110, 52 + 30 * (m.F ?? 0) + 10 * (m.C ?? 0) - 8 * (m.S ?? 0)));

function landscapeStep(ball, phi, resource, dt, forcing = null) {
  const T = temperature(phi);
  const J = (resource ? RESOURCE_J : 0) + (forcing ? FORCING.A * Math.cos((2 * Math.PI * forcing.time) / FORCING.P) : 0);
  const D = 0.002 + 0.06 * phi * phi;
  const sub = 4;
  const h = Math.min(dt, 0.05) * 2.5 / sub;
  for (let k = 0; k < sub; k++) {
    const [gx, gy] = gradient(ball.x, ball.y, 1 / T, J);
    ball.x += -gx * h + Math.sqrt(2 * D * h) * gauss();
    ball.y += -gy * h + Math.sqrt(2 * D * h) * gauss();
    const r = Math.hypot(ball.x, ball.y);
    if (r > BALL_LIMIT) {
      ball.x *= BALL_LIMIT / r;
      ball.y *= BALL_LIMIT / r;
    }
  }
}

// TUNNEL (ISS-052, QUANT-EXP-1's picture; interpretive): at 11D a poke may carry the state
// THROUGH a barrier instead of over it. Along the straight path to each other valley, the
// barrier is where the energy rises above the state's own: its width d and its height dE
// above the state; the WKB chance is P = exp(-2 d sqrt(2 dE) / HBAR_MODEL), the best path
// is tried once. HBAR_MODEL is a model constant (the landscape has no Planck constant):
// small enough that a deep valley at calm almost never lets go, large enough to be seen.
export const HBAR_MODEL = 0.3;

export function tunnelTry(ball, phi, resource, rand = Math.random) {
  const beta = 1 / temperature(phi);
  const J = resource ? RESOURCE_J : 0;
  const e0 = energy(ball.x, ball.y, beta, J);
  let best = null;
  for (const [wx, wy] of WELLS) {
    const L = Math.hypot(wx - ball.x, wy - ball.y);
    if (L < 0.3) continue;
    let inside = 0, top = e0, exit = null;
    const n = 120;
    for (let i = 1; i <= n; i++) {
      const s = i / n;
      const x = ball.x + (wx - ball.x) * s;
      const y = ball.y + (wy - ball.y) * s;
      const e = energy(x, y, beta, J);
      if (e > e0) { inside += L / n; top = Math.max(top, e); } else if (inside > 0 && !exit) exit = { x, y };
    }
    if (!exit || inside <= 0) continue;
    const p = Math.exp((-2 * inside * Math.sqrt(2 * (top - e0))) / HBAR_MODEL);
    if (!best || p > best.p) best = { p, exit, width: inside, height: top - e0 };
  }
  if (!best) return { tried: false };
  const through = rand() < best.p;
  if (through) { ball.x = best.exit.x; ball.y = best.exit.y; }
  return { tried: true, through, ...best };
}

function makeLandscape() {
  const R = 1.45;
  const ball = { x: WELLS[2][0] * 0.95, y: WELLS[2][1] * 0.95 };
  const trail = [];
  let theta = 0.5;
  let lastEnv = null;
  let tunnelEvent = { text: '', until: 0 };
  return {
    focus: [0, 0],
    tick(env) {
      lastEnv = env;
      theta += env.dt * 0.07;
      landscapeStep(ball, env.phi, env.resource, env.dt, env.music ? { time: env.t } : null);
      trail.push([ball.x, ball.y]);
      if (trail.length > 160) trail.shift();
    },
    poke(strength) {
      if (lastEnv && lastEnv.dim >= 11) {
        const r = tunnelTry(ball, lastEnv.phi, lastEnv.resource);
        if (r.tried) {
          const chance = r.p >= 0.001 ? `${(100 * r.p).toPrecision(2)}%` : `10^${Math.log10(r.p).toFixed(1)}`;
          tunnelEvent = { text: r.through ? `TUNNELLED through the barrier (chance ${chance}; width ${r.width.toFixed(2)}, height ${r.height.toFixed(2)})` : `HELD: the barrier did not let go (chance ${chance}); warm the field to lower it`, until: lastEnv.t + 4, through: r.through };
          return;
        }
        tunnelEvent = { text: 'NO BARRIER to tunnel through: the valleys have melted, the state moves freely', until: lastEnv.t + 4, through: true };
      }
      const a = Math.random() * TAU;
      ball.x += Math.cos(a) * 0.6 * strength;
      ball.y += Math.sin(a) * 0.6 * strength;
    },
    draw(ctx, env) {
      const { u, phi, dim } = env;
      const T = temperature(phi);
      const beta = 1 / T;
      const J = env.resource ? RESOURCE_J : 0;
      if (env.gl) {
        env.gl.render({ phi, T, J, dim, theta, ball, trail, time: env.t, stereo: env.stereo, memoryColors: MEMORY_NAMES.map(name => MEMORY_COLORS[name]) });
        if (env.labels) {
          const zones = [[[0, 0.75, 1.75], 'MOUNTAINS · the body’s memories (4D)', COLORS.ice, 4],
            [[-3.4, 0.9, -0.6], 'COUNTRY · the limbic plains (8D)', '#56f0a2', 8],
            [[0, 3.8, -9], 'CITY OF CODE · the formal mind (11D)', '#b46cff', 11],
            ...(cycSkyline?.length ? [[[22, 2.2, -30], `OPENCYC · ${(cycSkyline.reduce((a, r) => a + r[1], 0) / 1e6).toFixed(2)}M facts in ${cycSkyline.length} microtheories`, '#9f8cff', 11],
              [[0, 2.2, -9], 'EMOTIONCYC BRIDGE', '#ffb833', 11]] : [])];
          for (const [[x, y, z], text, color, layer] of zones) {
            const s = layer <= dim ? env.gl.projectWorld(x, y, z) : null;
            if (s?.visible) label(ctx, u, text, (s.x * env.w) / u, (s.y * env.h) / u, color, 'center', 0.028);
          }
          for (const [k, [wx, wy]] of WELLS.entries()) {
            const s = env.gl.project(wx, wy, 0.32);
            if (s.visible) label(ctx, u, MEMORY_NAMES[k].toUpperCase(), (s.x * env.w) / u, (s.y * env.h) / u, MEMORY_COLORS[MEMORY_NAMES[k]], 'center', 0.034);
          }
          landscapeHud(ctx, u, phi, T, beta, env.resource);
          if (env.music && env.labels) label(ctx, u, `♪ MUSIC: the ground rocks towards SAFE and back every ${FORCING.P} s (a forcing; in this model, with the noise, it helps the state out)`, 0, 0.9, COLORS.violet, 'center', 0.022);
          if (env.labels && tunnelEvent.until > env.t) label(ctx, u, tunnelEvent.text, 0, -0.62, tunnelEvent.through ? COLORS.cyan : COLORS.orange, 'center', 0.028);
          else if (env.labels && dim >= 11) label(ctx, u, 'at 11D, POKE tries to TUNNEL through the nearest barrier (QUANT-EXP-1, a picture)', 0, -0.62, COLORS.dim, 'center', 0.02);
        }
        return;
      }
      const eRef = energy(0, 0, beta, J);
      const c = Math.cos(theta), s = Math.sin(theta);
      const toView = (px, py) => [px * c - py * s, px * s + py * c];
      const fromView = (vx, vy) => [vx * c + vy * s, -vx * s + vy * c];
      const project = (vx, vy, e) => {
        const depth = (vy + R) / (2 * R);
        const f = lerp(0.72, 1.12, depth);
        // heights clipped at the rim so the three valleys stay visible
        const hgt = clamp(e - eRef, -0.5, 0.35) * 1.1 * f;
        return [vx * 0.66 * f, 0.12 + vy * 0.3 - hgt];
      };
      const ballView = toView(ball.x, ball.y);
      const drawBall = () => {
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (const [i, p] of trail.entries()) {
          const v = toView(p[0], p[1]);
          const [sx, sy] = project(v[0], v[1], energy(p[0], p[1], beta, J));
          if (i) ctx.lineTo(sx * u, (sy - 0.025) * u);
          else ctx.moveTo(sx * u, (sy - 0.025) * u);
        }
        ctx.stroke();
        ctx.restore();
        const [bx, by] = project(ballView[0], ballView[1], energy(ball.x, ball.y, beta, J));
        glow(ctx, u, bx, by - 0.03, 0.09, '#ffffff', 0.5);
        dot(ctx, u, bx, by - 0.03, 0.03, '#ffffff');
      };
      const backdrop = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(env.w, env.h) * 0.7);
      backdrop.addColorStop(0, OUTSIDE_BG);
      backdrop.addColorStop(1, COLORS.bg0);
      const rows = 46;
      const cols = 84;
      const hue = lerp(188, 18, phi);
      for (let r = 0; r < rows; r++) {
        const vy = -R + (2 * R * r) / (rows - 1);
        const half = Math.sqrt(Math.max(0, R * R - vy * vy));
        if (half < 0.05) continue;
        const pts = [];
        for (let i = 0; i <= cols; i++) {
          const vx = -half + (2 * half * i) / cols;
          const [px, py] = fromView(vx, vy);
          pts.push(project(vx, vy, energy(px, py, beta, J)));
        }
        const depth = r / (rows - 1);
        ctx.save();
        // hide the rows behind with the background itself (same gradient as background())
        ctx.beginPath();
        ctx.moveTo(pts[0][0] * u, pts[0][1] * u);
        for (const p of pts) ctx.lineTo(p[0] * u, p[1] * u);
        ctx.lineTo(pts[pts.length - 1][0] * u, (pts[pts.length - 1][1] + 0.7) * u);
        ctx.lineTo(pts[0][0] * u, (pts[0][1] + 0.7) * u);
        ctx.closePath();
        ctx.fillStyle = backdrop;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(pts[0][0] * u, pts[0][1] * u);
        for (const p of pts) ctx.lineTo(p[0] * u, p[1] * u);
        ctx.strokeStyle = `hsla(${hue}, 85%, ${lerp(38, 66, depth)}%, ${lerp(0.45, 1, depth)})`;
        ctx.lineWidth = lerp(0.8, 1.8, depth);
        ctx.stroke();
        ctx.restore();
      }
      // the state is the subject: always drawn on top of the terrain
      drawBall();
      for (const [k, [wx, wy]] of WELLS.entries()) {
        const v = toView(wx, wy);
        const [sx, sy] = project(v[0], v[1], energy(wx, wy, beta, J));
        const name = MEMORY_NAMES[k];
        if (dim >= 11) {
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          glow(ctx, u, sx, sy, 0.22, MEMORY_COLORS[name], 0.22);
          ctx.restore();
        }
        if (env.labels) label(ctx, u, name.toUpperCase(), sx, sy - 0.12, MEMORY_COLORS[name], 'center', 0.034);
      }
      if (env.labels) landscapeHud(ctx, u, phi, T, beta, env.resource);
          if (env.music && env.labels) label(ctx, u, `♪ MUSIC: the ground rocks towards SAFE and back every ${FORCING.P} s (a forcing; in this model, with the noise, it helps the state out)`, 0, 0.9, COLORS.violet, 'center', 0.022);
          if (env.labels && tunnelEvent.until > env.t) label(ctx, u, tunnelEvent.text, 0, -0.62, tunnelEvent.through ? COLORS.cyan : COLORS.orange, 'center', 0.028);
          else if (env.labels && dim >= 11) label(ctx, u, 'at 11D, POKE tries to TUNNEL through the nearest barrier (QUANT-EXP-1, a picture)', 0, -0.62, COLORS.dim, 'center', 0.02);
    },
  };
}

function landscapeHud(ctx, u, phi, T, beta, resource) {
  const state = T < 0.45 ? 'deep valleys: the state stays put' : T < 0.55 ? 'valleys melting' : 'one shallow bowl: the state can move';
  label(ctx, u, `Φ ${phi.toFixed(2)}   T ${T.toFixed(2)}   β ${beta.toFixed(2)}   ${state}`, 0, -0.62, COLORS.ink, 'center', 0.032);
  if (resource) label(ctx, u, 'RESOURCE J(t): the ground tilts towards SAFE', 0, -0.55, COLORS.teal, 'center', 0.028);
}

const FACTORIES = { score: makeScore, ureter: makeUreter, tunnel: makeTunnel, flight: makeFlight, body: makeBody, brain: makeBrain, limbic: makeLimbic, thought: makeThought, dyad: makeDyad, neuron: makeNeuron, network: makeNetwork, landscape: makeLandscape };

// For tests (scripts/explorer-check.mjs): the two simulations without any drawing.
export const simulation = { avalancheSize, tunnelTry, memoryStep, landscapeStep, dyadStep, PATTERNS, MEMORY_NAMES, energy, gradient, WELLS, RESOURCE_J, temperature };

// ---------------------------------------------------------------- the explorer

// hooks: { getDim(): 4|8|11, onDim(d), onPhi(v), onChange(), dive('in'|'out'): Promise,
//          onLevel(levelId, dim), levelLabel(levelId) }
// (dive flies the level view's camera into or out of the jellyfish human)
export function createExplorer(hooks = {}) {
  const root = document.createElement('section');
  root.className = 'explorer';
  root.hidden = true;
  root.setAttribute('aria-label', 'Mind-body explorer');
  root.innerHTML = `
    <canvas class="explorer__canvas"></canvas>
    <header class="explorer__bar">
      <span class="explorer__title">MIND-BODY EXPLORER</span>
      <nav class="explorer__stops" aria-label="Stops">${STOPS.map(id => `<button type="button" data-stop="${id}">${STOP_TITLES[id]}</button>`).join('<span aria-hidden="true">›</span>')}</nav>
      <div class="explorer__layers" role="group" aria-label="Layers">${[4, 8, 11].map(d => `<button type="button" data-dim="${d}">${d}D</button>`).join('')}</div>
      <label class="explorer__phi">Φ LIMBIC / FX <input type="range" min="0" max="1" step="0.01" aria-label="Limbic field Phi" /><output></output></label>
      <button type="button" data-act="poke">POKE</button>
      <button type="button" data-act="resource" aria-pressed="false">RESOURCE</button>
      <button type="button" data-act="thoughts" aria-pressed="false" title="Thoughts as neural avalanches (ISS-077): many small bursts, a few large; ignition; with the ADHD, ASD and C-PTSD sliders">THOUGHTS</button>
      <label class="explorer__vivid" title="How vivid visual thoughts are (mental imagery varies from none, aphantasia, to very vivid, hyperphantasia)">VIVIDNESS <input type="range" min="0" max="1" step="0.05" value="0.8" aria-label="Vividness" /></label>
      <button type="button" data-act="mindful" aria-pressed="false" title="MINDFUL (ISS-078): attending without grasping. Thoughts still arise; none pokes the next. The field is not pushed down. Pain arrives but heats the head less">MINDFUL</button>
      <button type="button" data-act="caveout" title="The cathedral from outside (ISS-078): the halls as an abstract castle, a spire on each hall, windows that flare when a thought fires inside">OUTSIDE</button>
      <button type="button" data-act="cave" title="The cathedral (ISS-077): fly through the ventricles, the brain's own cave, the field as light in the stone; POKE a thought; C-PTSD echoes">CAVE</button>
      <button type="button" data-act="pain" title="The path of pain (ISS-077): from the ureter's colic up the spinal cord to the thalamus, the insula, the cingulate and the sensory cortex; ACUTE or CHRONIC">PAIN: OFF</button>
      <button type="button" data-act="past" aria-pressed="false" title="The memory kernel K(τ) and asymmetric coupling (W_ij ≠ W_ji): the past keeps shaping recall, and fight feeds freeze (H-AL's suggestion; interpretive)">PAST</button>
      <button type="button" data-act="uo" title="The four stages (ISS-076): 1 the stone, 2 the stent, 3 the laser, 4 the stent out">STAGE 1 · THE STONE ▸</button>
      <button type="button" data-act="uv" title="INSIDE the tube, OUTSIDE (the urinary tract and where the pain is felt), or BOTH; on two screens, one window INSIDE and the other OUTSIDE">VIEW: INSIDE</button>
      <button type="button" data-act="vig" aria-pressed="false" title="VIGILANCE (ISS-078): the view glances around by itself, left, right, behind; more often and faster with the C-PTSD slider; safety lets it settle. Look yourself: the arrow keys, a right-drag; B: the rear view">VIGILANCE</button>
      <button type="button" data-act="body" aria-pressed="false" title="ONE BODY (ISS-077): the stone's pain reaches the head, the head's tension tightens the body, the limbic breath calms both; with the ADHD, ASD and C-PTSD sliders">LOOP: BODY + MIND</button>
      <button type="button" data-act="follow" title="Follow the colic from the stone to the brain: up the spinal cord to the thalamus and the pain regions (ISS-077)">FOLLOW THE PAIN ▸</button>
      <button type="button" data-act="wall" title="The stone is too big to pass: turn to the wall, then ride the elevator down the scales (ISS-076)">WALL ▸</button>
      <button type="button" data-act="orbit" title="Fly around the stone: drag to turn, the wheel to zoom">ORBIT</button>
      <button type="button" data-act="climb" title="Climb the stone's north face (a climber 40 µm tall: the stone is 150 climbers high)">CLIMB</button>
      <button type="button" data-act="wdown" title="The elevator: a scale down">▼</button>
      <button type="button" data-act="wup" title="The elevator: a scale up">▲</button>
      <button type="button" data-act="view3d" aria-pressed="true" title="The landscape in 3D (on) or as the 2D drawing (off)">3D</button>
      <label class="explorer__hr" title="The viewer's heart rate (the slider, or a chest strap: ♥ STRAP). With the loop on, a rising heart slows the film and it waits at a threshold until the heart settles">♥ <input type="range" min="50" max="140" step="1" aria-label="Heart rate" /><output></output></label>
      <button type="button" data-act="kc" title="One score, four settings (The Tensor, the Trilogy of Containers): the mind (the Mandelbulb), the river, the body, the session. The same thresholds at the same story-times">SETTING: MIND</button>
      <button type="button" data-act="kf" title="The film (registry/scores): the River Film (2026) or the 2021 film (Art – FIS). Both windows of the twin view play it">FILM: RIVER</button>
      <button type="button" data-act="edit" title="Your own film (ISS-053): the seven modes over story-time; drag the points, give each the sentence it came from; PLAY MINE, SAVE">EDIT</button>
      <button type="button" data-act="kx" title="How much language the film gives (kx): NUMBER only (as Rothko numbered his pictures), TITLE, CARDS (silent-film intertitles), CAPTIONS, NARRATION (H-AL speaks). After a viewing the film suggests one notch fewer words">WORDS: CAPTIONS</button>
      <button type="button" data-act="ap" title="The pilot (ISS-074): AUTOPILOT (H-AL flies the feelings and thinks aloud), CO-PILOT (you take one knob at a time, fear first), MANUAL (every knob is yours). The journey starts still: POKE to begin">PILOT: OFF</button>
      <span class="explorer__knobs" role="group" aria-label="Your knobs">${PILOT_ORDER.map(id => `<label>${id} <input type="range" min="0" max="1" step="0.05" value="0" data-knob="${id}" aria-label="${id}" /></label>`).join('')}</span>
      <button type="button" data-act="ab" title="One screen, two versions (ISS-069): A the film as it is, B the same film for the VIEWER preset (your version); press to flip">A/B: A</button>
      <button type="button" data-act="tw" aria-pressed="false" title="The twin view (setting: the river): one film, two viewers. Left the viewer of now (neutral); right a viewer preset. The knobs and the heart move both">TWIN</button>
      <button type="button" data-act="pv" title="The right window's viewer (registry/viewers): as I was in 2021 (fitted from the two films), neutral, or a model condition (P13: hypotheses, not diagnoses)">VIEWER</button>
      <span class="explorer__conds" role="group" aria-label="Conditions (added to the preset)" title="Added to the preset's conditions: P13's model operators (ADHD: the temperature up, noise; ASD: the temperature down, monotropism; C-PTSD: the barrier deeper, slower back). Hypotheses, not diagnoses">${[['ca', 'ADHD'], ['cs', 'ASD'], ['cp', 'C-PTSD']].map(([k, n]) => `<label>${n} <input type="range" min="0" max="1" step="0.05" value="0" data-cond="${k}" aria-label="${n} (added to the preset)" /></label>`).join('')}</span>
      <button type="button" data-act="strap" title="Connect a Bluetooth heart-rate chest strap (any standard strap; Chrome or Edge). While it is connected it drives the heart; click again to let go">♥ STRAP</button>
      <button type="button" data-act="kr" title="The somatic loop: PROJECTION (the score drives), RESONANCE (score and viewer together), MIRROR (the viewer drives, the score is the target)">LOOP: PROJECTION</button>
      <button type="button" data-act="music" aria-pressed="false" title="Calm generative music (off by default)">MUSIC</button>
      <button type="button" data-act="stereo" title="Stereo for a 3D projector or TV: SBS½ (half side-by-side, squeezed: the usual HDMI 3D input) or SBS (full); move the mouse to show the controls">3D: OFF</button>
      <button type="button" data-act="level">STEP BACK IN ↩</button>
      <button type="button" data-act="close" aria-label="Close the mind-body explorer">✕</button>
    </header>
    <div class="explorer__feel" role="group" aria-label="Feeling">${Object.entries(FEELINGS).map(([id, f]) => `<button type="button" data-feel="${id}">${f.label}</button>`).join('')}</div>
    <aside class="explorer__card" aria-live="polite"><h2></h2><p></p><span class="explorer__label"></span></aside>`;
  document.body.append(root);
  const canvas = root.querySelector('canvas');
  const mainCtx = canvas.getContext('2d');
  let ctx = mainCtx;
  const phiInput = root.querySelector('.explorer__phi input');
  const phiOut = root.querySelector('.explorer__phi output');
  const card = root.querySelector('.explorer__card');
  const feelRow = root.querySelector('.explorer__feel');
  const resourceButton = root.querySelector('[data-act="resource"]');
  const pastButton = root.querySelector('[data-act="past"]');
  const thoughtsButton = root.querySelector('[data-act="thoughts"]');
  const painButton = root.querySelector('[data-act="pain"]');
  const caveButton = root.querySelector('[data-act="cave"]');
  const caveOutButton = root.querySelector('[data-act="caveout"]');
  const mindfulButton = root.querySelector('[data-act="mindful"]');
  const vividLabel = root.querySelector('.explorer__vivid');
  vividLabel.querySelector('input').addEventListener('input', event => { st.vivid = Number(event.target.value); });
  // POP IN: a bubble's figure takes the screen
  const pop = document.createElement('section');
  pop.className = 'explorer__pop';
  pop.hidden = true;
  pop.innerHTML = '<figure><img alt="" /><figcaption><p class="explorer__pop-caption"></p><p class="explorer__pop-formula"></p><p class="explorer__pop-doc"></p></figcaption></figure><button type="button" data-pop="close">◂ BACK TO THE CATHEDRAL</button>';
  root.append(pop);
  const closePop = () => { pop.classList.remove('is-open'); setTimeout(() => { pop.hidden = true; }, 500); };
  popHandler = img => {
    if (!img || !pop.hidden) return;
    pop.querySelector('img').src = img.src;
    pop.querySelector('.explorer__pop-caption').textContent = img.caption ?? '';
    pop.querySelector('.explorer__pop-formula').textContent = img.formula ? `the figure of: ${img.formula}` : '';
    pop.querySelector('.explorer__pop-doc').textContent = `${img.document ?? ''} · ${img.primitive ?? ''} · generated and checked by the Visualize build`;
    pop.hidden = false;
    void pop.offsetWidth;
    pop.classList.add('is-open');
  };
  pop.addEventListener('click', event => { event.stopPropagation(); closePop(); });
  addEventListener('keydown', event => { if (event.key === 'Escape' && !pop.hidden) closePop(); });
  // a click in the cathedral pops the bubble under it
  root.addEventListener('click', event => {
    if (st.stop !== 'brain' || !st.cave || event.target.closest('button, input, label, .explorer__pop, .explorer__card')) return;
    const g = gls['brain-cave'];
    if (!g?.pick) return;
    const r = root.getBoundingClientRect();
    g.pick((event.clientX - r.left) / r.width - 0.5, (event.clientY - r.top) / r.height - 0.5);
  });
  const hrLabel = root.querySelector('.explorer__hr');
  const hrInput = hrLabel.querySelector('input');
  const hrOut = hrLabel.querySelector('output');
  const krButton = root.querySelector('[data-act="kr"]');
  const strapButton = root.querySelector('[data-act="strap"]');
  const kcButton = root.querySelector('[data-act="kc"]');
  const kfButton = root.querySelector('[data-act="kf"]');
  const twButton = root.querySelector('[data-act="tw"]');
  const kxButton = root.querySelector('[data-act="kx"]');
  const abButton = root.querySelector('[data-act="ab"]');
  const editButton = root.querySelector('[data-act="edit"]');
  const wallButton = root.querySelector('[data-act="wall"]');
  const followButton = root.querySelector('[data-act="follow"]');
  const uoButton = root.querySelector('[data-act="uo"]');
  const bodyButton = root.querySelector('[data-act="body"]');
  const vigButton = root.querySelector('[data-act="vig"]');
  // LOOK: the head in the first-person 3D stops
  const look = createLook();
  const LOOK_STOPS = ['tunnel', 'ureter', 'flight', 'score', 'brain'];
  const lookHere = () => st.open && LOOK_STOPS.includes(st.stop) && st.view3d && (st.stop !== 'brain' || st.cave);
  const lookHud = document.createElement('div');
  lookHud.className = 'explorer__look';
  root.append(lookHud);
  addEventListener('keydown', event => {
    if (!lookHere() || event.target.closest?.('input, textarea, select')) return;
    if (event.key.startsWith('Arrow')) { look.key(event.key, true); event.preventDefault(); }
    else if (event.key.toLowerCase() === 'b' && !event.ctrlKey && !event.metaKey) look.toggleRear();
  });
  addEventListener('keyup', event => look.key(event.key, false));
  let rdrag = null;
  root.addEventListener('contextmenu', event => { if (lookHere()) event.preventDefault(); });
  root.addEventListener('pointerdown', event => { if (event.button === 2 && lookHere()) rdrag = { x: event.clientX, y: event.clientY }; });
  addEventListener('pointerup', event => { if (event.button === 2) rdrag = null; });
  root.addEventListener('pointermove', event => {
    if (!rdrag) return;
    look.drag(event.clientX - rdrag.x, event.clientY - rdrag.y);
    rdrag = { x: event.clientX, y: event.clientY };
  });
  const uvButton = root.querySelector('[data-act="uv"]');
  const wdownButton = root.querySelector('[data-act="wdown"]');
  const wupButton = root.querySelector('[data-act="wup"]');
  const orbitButton = root.querySelector('[data-act="orbit"]');
  const climbButton = root.querySelector('[data-act="climb"]');
  const apButton = root.querySelector('[data-act="ap"]');
  const knobRow = root.querySelector('.explorer__knobs');
  // MIDI IN: a controller's encoders turn the knobs, Φ, depth and velocity
  startMidiIn(({ id, value }) => {
    if (id in st.knobs) {
      st.knobs[id] = value;
      const input = knobRow.querySelector(`[data-knob="${id}"]`);
      if (input) input.value = String(value);
    } else if (id === 'phi') {
      phiInput.value = String(value);
      phiInput.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (id === 'kd' || id === 'kv') {
      st[id] = value;
      hooks.onChange?.();
    }
  }).then(status => { midiInStatus = status; });
  for (const input of knobRow.querySelectorAll('input')) {
    input.addEventListener('input', () => { st.knobs[input.dataset.knob] = Number(input.value); });
  }
  const pvButton = root.querySelector('[data-act="pv"]');
  const condRow = root.querySelector('.explorer__conds');
  for (const input of condRow.querySelectorAll('input')) {
    input.addEventListener('input', () => { st[input.dataset.cond] = Number(input.value); hooks.onChange?.(); });
  }
  let strapStatus = '';
  const rrIntervals = []; // beat-to-beat intervals (s) from the strap, for HRV later
  const strap = createHeartStrap({
    onBeat({ bpm, rr }) {
      if (!(bpm > 0)) return;
      st.bpm = Math.round(bpm);
      rrIntervals.push(...rr);
      if (rrIntervals.length > 300) rrIntervals.splice(0, rrIntervals.length - 300);
      hrInput.value = String(Math.max(50, Math.min(140, st.bpm)));
      hrOut.textContent = String(st.bpm);
    },
    onStatus(text) { strapStatus = text; syncUi(); },
  });
  const view3dButton = root.querySelector('[data-act="view3d"]');

  const music = createExplorerMusic();
  const scenes = {};
  const scene = id => (scenes[id] ??= FACTORIES[id]());
  const rand = seeded(3);
  const particles = Array.from({ length: 70 }, () => ({ x: rand(), y: rand(), z: 0.3 + rand() * 0.7, r: rand() }));
  const st = { open: false, stop: 'body', from: null, transStart: 0, forward: true, phi: 0.2, feel: 'calm', resource: false, labels: true,
    diving: false, enterStart: 0, view3d: localStorage.getItem('soma-explorer-3d') !== '0',
    stereo: STEREO_MODES.includes(new URLSearchParams(location.search).get('stereo')) ? new URLSearchParams(location.search).get('stereo')
      : STEREO_MODES.includes(localStorage.getItem('soma-stereo')) ? localStorage.getItem('soma-stereo') : 'off',
    depth: Number(localStorage.getItem('soma-stereo-depth') ?? 1) || 1,
    // ?film=1: the film pace (0.6) and the controls hidden until the mouse moves; ?pace= sets it
    film: new URLSearchParams(location.search).get('film') === '1',
    kv: 1, st: 0, bpm: 68, kr: 0, kd: null, kt: 0, kw: 1, km: '', kc: 'mind',
    kf: 'river-film', tw: false, pv: 'v2021', ca: 0, cs: 0, cp: 0, ab: 'a',
    past: false, thoughts: false, pain: '', painFrom: '', cave: false, vivid: 0.8, uo: 0, uv: 'in', body: false, vig: false, caveOut: false, mindful: false, ap: '', own: Math.max(1, Math.min(7, Number(localStorage.getItem('soma-handover')) || 1)), knobs: { S: 0, F: 0, C: 0, A: 0, G: 0, L: 0, PV: 0 },
    // words: the viewer's last choice, else narration for the film (?film=1), else captions
    kx: (() => { const v = Number(localStorage.getItem('soma-kx')); return Number.isInteger(v) && v >= 0 && v <= 4 && localStorage.getItem('soma-kx') !== null ? v : (new URLSearchParams(location.search).get('film') === '1' ? 4 : 3); })(),
    pace: Number(new URLSearchParams(location.search).get('pace')) || (new URLSearchParams(location.search).get('film') === '1' ? 0.6 : 1) };
  // 3D SBS: far (background), screen (scene, labels) and near (the field) layers, composited
  // per eye with opposite shifts; the 3D landscape renders its own two eyes.
  const layer = name => {
    const c = document.createElement('canvas');
    return { canvas: c, ctx: c.getContext('2d'), name };
  };
  const layers = { far: layer('far'), screen: layer('screen'), near: layer('near') };
  let tourLine = null;
  addEventListener('soma-tour-step', event => { tourLine = event.detail; });
  addEventListener('soma-tour-end', () => { tourLine = null; });
  let chromeTimer = 0;
  addEventListener('pointermove', () => {
    if ((st.stereo === 'off' && !st.film) || !st.open) return;
    document.body.classList.add('explorer-chrome');
    clearTimeout(chromeTimer);
    chromeTimer = setTimeout(() => document.body.classList.remove('explorer-chrome'), 3000);
  });
  // The 3D stops (explorer3d.js), each made on first use; null where WebGL is missing.
  const GL_MAKERS = {
    landscape: () => createLandscape3D({ energy, wells: WELLS, city: hooks.cityItems?.() ?? [], skyline: cycSkyline ?? [] }),
    dyad: () => createDyad3D(),
    flight: () => createFlight3D(),
    tunnel: () => createTunnel3D(),
    ureter: () => createTunnel3D({ ureter: true }),
    score: () => createFlight3D(),
    // the same score in the other containers (SETTING on the SCORE stop)
    'score-river': () => createFlight3D(),
    'score-body': () => createTunnel3D({ vessel: true }),
    'score-session': () => createDyad3D(),
    // the brain's own cave: the ventricles as a cathedral (ISS-077)
    'brain-cave': () => createCathedral3D(),
  };
  const gls = {};
  function stageGl(stop) {
    if (!GL_MAKERS[stop]) return null;
    if (!(stop in gls)) {
      gls[stop] = GL_MAKERS[stop]();
      if (gls[stop]) {
        root.prepend(gls[stop].canvas);
        gls[stop].resize(w, h, dpr);
      }
    }
    return gls[stop];
  }
  function showGl(active) {
    for (const g of Object.values(gls)) g?.canvas.classList.toggle('is-active', g === active);
    root.classList.toggle('explorer--gl', Boolean(active));
  }
  let raf = 0;
  let last = 0;
  let vt = 0;
  let w = 0, h = 0, dpr = 1;

  function resize() {
    dpr = Math.min(2, devicePixelRatio || 1);
    w = innerWidth;
    h = innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    for (const g of Object.values(gls)) g?.resize(w, h, dpr);
  }
  addEventListener('resize', () => { if (st.open) resize(); });

  function dim() {
    const d = Number(hooks.getDim?.() ?? 11);
    return [4, 8, 11].includes(d) ? d : 11;
  }

  function syncUi() {
    for (const b of root.querySelectorAll('[data-stop]')) b.classList.toggle('active', b.dataset.stop === st.stop);
    root.classList.toggle('explorer--diving', st.diving);
    for (const b of root.querySelectorAll('[data-dim]')) b.classList.toggle('active', Number(b.dataset.dim) === dim());
    for (const b of root.querySelectorAll('[data-feel]')) b.classList.toggle('active', b.dataset.feel === st.feel);
    feelRow.hidden = st.stop !== 'body';
    const wallNow = st.stop === 'ureter' ? scene('ureter').wall : 0;
    wallButton.hidden = st.stop !== 'ureter';
    followButton.hidden = st.stop !== 'ureter' || Boolean(wallNow);
    uoButton.hidden = uvButton.hidden = st.stop !== 'ureter' || Boolean(wallNow);
    bodyButton.hidden = !['ureter', 'brain'].includes(st.stop) || Boolean(wallNow);
    vigButton.hidden = !LOOK_STOPS.includes(st.stop) || Boolean(wallNow) || (st.stop === 'brain' && !st.cave);
    vigButton.classList.toggle('active', st.vig);
    vigButton.setAttribute('aria-pressed', String(st.vig));
    bodyButton.classList.toggle('active', st.body);
    bodyButton.setAttribute('aria-pressed', String(st.body));
    uoButton.textContent = `STAGE ${st.uo + 1} · ${URETER_STAGES[st.uo].title} ▸`;
    uvButton.textContent = `VIEW: ${{ in: 'INSIDE', out: 'OUTSIDE', both: 'BOTH' }[st.uv]}`;
    wallButton.textContent = wallNow ? '◂ SCOPE' : 'WALL ▸';
    wdownButton.hidden = wupButton.hidden = !wallNow;
    wdownButton.disabled = wallNow >= BARRIERS.length;
    wupButton.disabled = wallNow <= 1;
    const ugl = st.stop === 'ureter' && !wallNow ? scene('ureter').gl : null;
    orbitButton.hidden = climbButton.hidden = st.stop !== 'ureter' || Boolean(wallNow) || !st.view3d;
    if (ugl) {
      orbitButton.classList.toggle('active', ugl.view === 'orbit');
      climbButton.classList.toggle('active', ugl.view === 'climb');
      orbitButton.disabled = climbButton.disabled = !ugl.hasStone;
    }
    resourceButton.hidden = !['network', 'landscape', 'dyad', 'tunnel'].includes(st.stop);
    resourceButton.classList.toggle('active', st.resource);
    pastButton.hidden = st.stop !== 'network';
    thoughtsButton.hidden = st.stop !== 'brain';
    painButton.hidden = st.stop !== 'brain' || st.cave;
    caveButton.hidden = st.stop !== 'brain';
    caveOutButton.hidden = st.stop !== 'brain' || !st.cave;
    mindfulButton.hidden = st.stop !== 'brain';
    mindfulButton.classList.toggle('active', st.mindful);
    mindfulButton.setAttribute('aria-pressed', String(st.mindful));
    caveOutButton.classList.toggle('active', st.caveOut);
    vividLabel.hidden = st.stop !== 'brain' || !st.cave;
    caveButton.classList.toggle('active', st.cave);
    painButton.textContent = `PAIN: ${(st.pain || 'off').toUpperCase()}`;
    painButton.classList.toggle('active', Boolean(st.pain));
    thoughtsButton.classList.toggle('active', st.thoughts);
    pastButton.classList.toggle('active', st.past);
    pastButton.setAttribute('aria-pressed', String(st.past));
    hrLabel.hidden = st.stop !== 'score';
    krButton.hidden = st.stop !== 'score';
    strapButton.hidden = st.stop !== 'score';
    kcButton.hidden = st.stop !== 'score';
    kcButton.textContent = `SETTING: ${st.kc.toUpperCase()}`;
    kfButton.hidden = st.stop !== 'score' || (scores?.length ?? 0) < 2;
    kfButton.textContent = `FILM: ${(filmScore(st.kf)?.title ?? st.kf).replace(/^The /, '').toUpperCase()}`;
    twButton.hidden = st.stop !== 'score';
    kxButton.hidden = st.stop !== 'score';
    editButton.hidden = st.stop !== 'score';
    editButton.classList.toggle('active', Boolean(editor?.open));
    if (st.stop !== 'score' && editor?.open) editor.close();
    kxButton.textContent = `WORDS: ${WORDS[st.kx]}`;
    twButton.classList.toggle('active', st.tw);
    twButton.setAttribute('aria-pressed', String(st.tw));
    pvButton.hidden = st.stop !== 'score' || !(st.tw || st.ab === 'b');
    condRow.hidden = !((st.stop === 'score' && (st.tw || st.ab === 'b')) || (st.stop === 'brain' && (st.thoughts || st.cave || st.body)) || (st.stop === 'ureter' && st.body) || (st.vig && LOOK_STOPS.includes(st.stop)));
    abButton.hidden = st.stop !== 'score' || st.tw;
    apButton.hidden = st.stop !== 'score';
    apButton.textContent = `PILOT: ${{ '': 'OFF', auto: 'AUTOPILOT', co: `CO-PILOT (${st.own})`, manual: 'MANUAL' }[st.ap]}`;
    apButton.classList.toggle('active', Boolean(st.ap));
    knobRow.hidden = st.stop !== 'score' || !(st.ap === 'co' || st.ap === 'manual');
    const mine = st.ap === 'manual' ? PILOT_ORDER.length : st.ap === 'co' ? st.own : 0;
    knobRow.querySelectorAll('input').forEach(input => { input.disabled = PILOT_ORDER.indexOf(input.dataset.knob) >= mine; });
    abButton.textContent = `A/B: ${st.ab === 'b' ? 'B (MINE)' : 'A (REAL)'}`;
    abButton.classList.toggle('active', st.ab === 'b');
    pvButton.textContent = `VIEWER: ${(viewerPreset(st.pv)?.title ?? st.pv).toUpperCase()}`;
    for (const input of condRow.querySelectorAll('input')) input.value = String(st[input.dataset.cond]);
    strapButton.textContent = strap.connected ? '♥ STRAP ON' : '♥ STRAP';
    strapButton.classList.toggle('active', strap.connected);
    if (strapStatus) strapButton.title = `Heart-rate strap: ${strapStatus}. Click to ${strap.connected ? 'let go' : 'connect'}`;
    hrInput.disabled = strap.connected;
    hrInput.value = String(st.bpm);
    hrOut.textContent = `${st.bpm}`;
    krButton.textContent = `LOOP: ${{ 0: 'PROJECTION', 0.5: 'RESONANCE', 1: 'MIRROR' }[st.kr]}`;
    krButton.classList.toggle('active', st.kr > 0);
    resourceButton.setAttribute('aria-pressed', String(st.resource));
    view3dButton.hidden = !GL_MAKERS[st.stop] || (st.stop in gls && !gls[st.stop]);
    const link = STOP_LEVELS[st.stop];
    const linkLevel = link.level ?? hooks.levelId?.();
    root.querySelector('[data-act="level"]').title = `Back into the elevator: the same thing in the level view, ${hooks.levelLabel?.(linkLevel) ?? linkLevel}${link.dim ? ` at ${link.dim}D` : ''}`;
    view3dButton.classList.toggle('active', st.view3d);
    const musicButton = root.querySelector('[data-act="music"]');
    musicButton.classList.toggle('active', music.enabled);
    musicButton.setAttribute('aria-pressed', String(music.enabled));
    const stereoButton = root.querySelector('[data-act="stereo"]');
    stereoButton.textContent = `3D: ${{ off: 'OFF', half: 'SBS½', full: 'SBS' }[st.stereo]}`;
    stereoButton.classList.toggle('active', st.stereo !== 'off');
    root.classList.toggle('explorer--stereo', st.stereo !== 'off');
    document.body.classList.toggle('explorer-stereo', st.open && st.stereo !== 'off');
    document.body.classList.toggle('explorer-film', st.open && st.film);
    view3dButton.setAttribute('aria-pressed', String(st.view3d));
    phiInput.value = String(st.phi);
    phiOut.textContent = st.phi.toFixed(2);
    const cap = CAPTIONS[st.stop];
    const d = dim();
    const text = [4, 8, 11].filter(k => k <= d && cap[k]).map(k => cap[k]).join(' ');
    card.querySelector('h2').textContent = `${cap.title} · ${d}D`;
    card.querySelector('p').textContent = text;
    const tag = card.querySelector('.explorer__label');
    tag.textContent = cap.label;
    tag.dataset.label = cap.label;
  }

  function background(t, w = viewW()) {
    const inside = ['body', 'brain', 'limbic', 'neuron', 'thought'].includes(st.stop);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    g.addColorStop(0, inside ? '#1a0d22' : OUTSIDE_BG);
    g.addColorStop(1, COLORS.bg0);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    const speed = 0.012 + 0.05 * st.phi;
    for (const p of particles) {
      const x = ((p.x - t * speed * p.z) % 1 + 1) % 1;
      const y = (p.y + 0.02 * Math.sin(t * 0.5 + p.r * 10)) % 1;
      ctx.save();
      ctx.globalAlpha = 0.25 * p.z;
      if (inside && p.r < 0.6) {
        ctx.fillStyle = '#b3243a';
        ctx.beginPath();
        ctx.ellipse(x * w, y * h, 9 * p.z, 6 * p.z, p.r * 6, 0, TAU);
        ctx.fill();
      } else {
        ctx.fillStyle = inside ? '#f4e6ee' : '#9fd8ff';
        ctx.beginPath();
        ctx.arc(x * w, y * h, (inside ? 3 : 1.4) * p.z, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawScene(id, env, alpha, zoom, focus) {
    if (alpha <= 0.001) return;
    const sc = scene(id);
    const targets = env.fieldCtx ? [ctx, env.fieldCtx] : [ctx];
    for (const c of targets) {
      c.save();
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.globalAlpha = alpha;
      c.translate(env.cx, env.cy);
      c.translate(focus[0] * env.u, focus[1] * env.u);
      c.scale(zoom, zoom);
      c.translate(-focus[0] * env.u, -focus[1] * env.u);
    }
    sc.draw(ctx, { ...env, alpha });
    for (const c of targets) c.restore();
  }

  // the width each eye sees: half the window in full SBS, else the whole window
  // (half SBS squeezes the whole frame into each half)
  const viewW = () => (st.stereo === 'full' ? w / 2 : w);

  function prepareLayers(lw) {
    for (const l of Object.values(layers)) {
      const cw = Math.round(lw * dpr);
      const ch = Math.round(h * dpr);
      if (l.canvas.width !== cw || l.canvas.height !== ch) {
        l.canvas.width = cw;
        l.canvas.height = ch;
      }
      l.ctx.setTransform(1, 0, 0, 1, 0, 0);
      l.ctx.clearRect(0, 0, cw, ch);
      l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // The caption (or H-AL's tour line) flat at the screen plane, in each eye (H-AL: evidence
  // labels stay on a flat HUD, never floating in depth).
  function hud(lw) {
    const c = layers.screen.ctx;
    const cap = CAPTIONS[st.stop];
    const title = tourLine ? tourLine.title : `${cap.title} · ${dim()}D`;
    const label = tourLine ? tourLine.label : cap.label;
    const text = tourLine ? tourLine.say : [4, 8, 11].filter(k => k <= dim() && cap[k]).map(k => cap[k]).join(' ');
    const size = Math.max(12, Math.min(lw, h) * 0.022);
    c.save();
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.font = `${size}px 'Space Mono', ui-monospace, monospace`;
    const maxW = lw * 0.62;
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (c.measureText(next).width > maxW && line) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    const shown = lines.slice(0, tourLine ? 5 : 4);
    if (lines.length > shown.length) shown[shown.length - 1] += ' …';
    const lh = size * 1.35;
    const boxH = lh * (shown.length + 1.6);
    const x = lw * 0.04;
    const y = h - boxH - h * 0.04;
    c.fillStyle = 'rgba(7,10,22,0.78)';
    c.strokeStyle = 'rgba(94,231,255,0.45)';
    c.fillRect(x, y, maxW + size * 1.5, boxH);
    c.strokeRect(x, y, maxW + size * 1.5, boxH);
    c.fillStyle = COLORS.cyan;
    c.fillText(`${title}${label ? `   [${label}]` : ''}`, x + size * 0.75, y + lh);
    c.fillStyle = COLORS.ink;
    shown.forEach((s, i) => c.fillText(s, x + size * 0.75, y + lh * (i + 2.1)));
    c.restore();
  }

  function composite() {
    const W = canvas.width;
    const H = canvas.height;
    const L = layers.screen.canvas.width;
    const scale = W / 2 / L;
    const far = 0.011 * L * st.depth;
    const near = 0.007 * L * st.depth;
    mainCtx.setTransform(1, 0, 0, 1, 0, 0);
    mainCtx.clearRect(0, 0, W, H);
    for (const sign of [-1, 1]) {
      const x0 = sign < 0 ? 0 : W / 2;
      mainCtx.save();
      mainCtx.beginPath();
      mainCtx.rect(x0, 0, W / 2, H);
      mainCtx.clip();
      // behind the screen: the left eye's image moves left, the right eye's right; in front, the reverse
      const put = (img, shift, grow = 1) => {
        const ww = L * scale * grow;
        const hh = H * grow;
        mainCtx.drawImage(img, x0 + (W / 2 - ww) / 2 + shift * scale, (H - hh) / 2, ww, hh);
      };
      put(layers.far.canvas, sign * far, 1.03);
      put(layers.screen.canvas, 0);
      put(layers.near.canvas, -sign * near);
      mainCtx.restore();
    }
  }

  function frame(now) {
    if (!st.open) return;
    // a virtual clock: film pace slows everything (motion, simulations, transitions)
    const real = now / 1000;
    const dt = Math.min(0.05, last ? real - last : 0.016) * st.pace;
    last = real;
    vt += dt;
    const t = vt;
    const stereo = st.stereo !== 'off';
    const lw = viewW();
    const u = Math.min(lw, h * 1.05) * 0.48;
    const sector = hooks.levelSector?.() ?? 'organismal';
    const env = { t, dt, u, w: lw, h, dpr, cx: lw / 2, cy: h * 0.5, dim: dim(), phi: st.phi, feel: st.feel, resource: st.resource, labels: st.labels, alpha: 1, stereo: st.stereo,
      sector, world: worldFor(hooks.levelId?.(), sector), kv: st.kv, st: st.st, bpm: st.bpm, kr: st.kr, kd: st.kd, kt: st.kt, kw: st.kw, km: st.km, kc: st.kc, kf: st.kf, tw: st.tw, pv: st.pv, ca: st.ca, cs: st.cs, cp: st.cp, kx: st.kx, ab: st.ab, ap: st.ap, own: st.own, knobs: st.knobs, past: st.past, thoughts: st.thoughts, pain: st.pain, painFrom: st.painFrom, cave: st.cave, vivid: st.vivid, uo: st.uo, uv: st.uv, body: st.body, vig: st.vig, caveOut: st.caveOut, mindful: st.mindful, music: music.enabled, strap: strap.connected, rr: rrIntervals, film: st.film, levelLabel: hooks.levelLabel?.(hooks.levelId?.()) ?? '' };
    // the music's pulse: the score's tempo in PROJECTION, the heart's in MIRROR, between in
    // RESONANCE (so in PROJECTION a heart drawn towards it is entrainment, not an echo)
    const pulse = st.stop === 'score' && scoreModes ? (1 - st.kr) * scoreTempo(scoreModes) + st.kr * st.bpm : st.bpm;
    music.update({ sector: st.stop === 'flight' ? env.world : 'organismal', phi: st.phi, resource: st.resource, score: st.stop === 'score' ? scoreModes : null, bpm: pulse, echo: st.stop === 'brain' && st.cave ? st.cp : 0 });
    if (stereo) {
      prepareLayers(lw);
      ctx = layers.far.ctx;
      env.fieldCtx = layers.near.ctx;
    } else {
      ctx = mainCtx;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (st.stop === 'human') {
      // the level view shows through: no 3D stop canvas on top of it
      showGl(null);
      if (stereo) {
        mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        mainCtx.clearRect(0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(frame);
      return;
    }
    const p = st.from ? clamp((t - st.transStart) / 1.3, 0, 1) : 1;
    env.gl = st.view3d ? stageGl(st.stop === 'score' && st.kc !== 'mind' ? `score-${st.kc}` : st.stop === 'brain' && st.cave ? 'brain-cave' : st.stop) : null;
    showGl(env.gl);
    if (env.gl) {
      // the terrain is on the WebGL canvas below; fade the old stop's background out over it
      ctx.clearRect(0, 0, lw, h);
      if (st.from && p < 1) {
        ctx.globalAlpha = 1 - ease(p);
        background(t, lw);
        ctx.globalAlpha = 1;
      }
    } else {
      background(t, lw);
    }
    // a tour or a link opens a tower (tower=<module>&floor=<declaration>); a click opens one too
    if (st.stop === 'landscape' && env.gl?.towerItem) {
      const want = `${st.tower}|${st.floor}`;
      if (want !== towerShown) {
        towerShown = want;
        const item = st.tower ? env.gl.towerItem(st.tower) : null;
        if (item) towerPanel.show(item, st.floor || null);
        else towerPanel.close();
      }
    } else if (towerPanel.open) towerPanel.close();
    if (stereo) ctx = layers.screen.ctx;
    bodyStep(env);
    // the head: vigilance and the look, settled by safety (the score's S, the limbic breath)
    if (lookHere()) {
      const safety = Math.min(1, (st.stop === 'score' && scoreModes ? scoreModes.S : 0) + (st.body ? 0.6 * BODY.loop.breath : 0));
      look.update(env.dt, { vigilance: st.vig, cp: st.cp, safety });
      const parts = [];
      if (st.vig) parts.push(`VIGILANCE${st.cp > 0.05 ? ` · C-PTSD ${Math.round(100 * st.cp)}%` : ''}${safety > 0.3 ? ' · settling (safety)' : ''}`);
      if (LOOK.behind) parts.push('LOOKING BEHIND');
      else if (LOOK.glancing) parts.push('a glance');
      lookHud.textContent = parts.join(' · ');
      lookHud.hidden = !parts.length;
    } else {
      LOOK.yaw = 0; LOOK.pitch = 0;
      lookHud.hidden = true;
    }
    scene(st.stop).tick(env);
    const entering = st.enterStart ? clamp((t - st.enterStart) / 1.6, 0, 1) : 1;
    if (entering < 1) {
      // just through the skin: start at the heart and pull back to the whole body
      drawScene(st.stop, env, 1, lerp(6, 1, ease(entering)), scene(st.stop).enter ?? scene(st.stop).focus);
    } else if (st.from && p < 1) {
      const e = ease(p);
      if (st.forward) {
        drawScene(st.from, { ...env, gl: null }, 1 - e, 1 + 7 * e, scene(st.from).focus);
        drawScene(st.stop, env, e, lerp(0.35, 1, e), [0, 0]);
      } else {
        drawScene(st.from, { ...env, gl: null }, 1 - e, lerp(1, 0.35, e), [0, 0]);
        drawScene(st.stop, env, e, lerp(8, 1, e), scene(st.stop).focus);
      }
    } else {
      st.from = null;
      st.enterStart = 0;
      drawScene(st.stop, env, 1, 1, [0, 0]);
    }
    if (stereo) {
      hud(lw);
      composite();
      ctx = mainCtx;
    }
    raf = requestAnimationFrame(frame);
  }

  function seeThrough(on) {
    root.classList.toggle('explorer--see-through', on);
  }

  function go(stop, { notify = true } = {}) {
    if (!STOPS.includes(stop) || st.diving) return;
    if (st.open && stop !== st.stop && st.stop === 'human') {
      // dive: the level view's camera flies into the jellyfish human, then the stop fades in
      st.diving = true;
      syncUi();
      Promise.resolve(hooks.dive?.('in')).then(() => {
        st.diving = false;
        st.stop = stop;
        st.from = null;
        st.enterStart = vt;
        seeThrough(false);
        syncUi();
        if (notify) hooks.onChange?.();
      });
      return;
    }
    if (st.open && stop === 'human' && st.stop !== 'human') {
      st.stop = 'human';
      seeThrough(true);
      hooks.dive?.('out');
      syncUi();
      if (notify) hooks.onChange?.();
      return;
    }
    if (stop !== st.stop && st.open) {
      st.from = st.stop;
      st.forward = STOPS.indexOf(stop) > STOPS.indexOf(st.stop);
      st.transStart = vt;
    }
    st.stop = stop;
    syncUi();
    if (notify) hooks.onChange?.();
  }

  // ORBIT around the stone: drag to turn, the wheel to zoom
  let drag = null;
  const orbiting = () => (st.stop === 'ureter' && scene('ureter').gl?.view === 'orbit' ? scene('ureter').gl : null);
  root.addEventListener('pointerdown', event => { if (orbiting() && !event.target.closest('button, input')) drag = { x: event.clientX, y: event.clientY }; });
  addEventListener('pointerup', () => { drag = null; });
  root.addEventListener('pointermove', event => {
    const g = orbiting();
    if (!g || !drag) return;
    g.turn(-(event.clientX - drag.x) * 0.006, (event.clientY - drag.y) * 0.006);
    drag = { x: event.clientX, y: event.clientY };
  });
  root.addEventListener('wheel', event => { const g = orbiting(); if (g) { event.preventDefault(); g.zoom(event.deltaY > 0 ? 1.1 : 0.9); } }, { passive: false });

  // MY FILM: the score editor at the score stop
  const editor = createScoreEditor(root, {
    base: () => filmScore(st.kf === 'mine' ? 'river-film' : st.kf),
    colors: MODE_COLORS,
    now: () => scoreT,
    onPlay: score => {
      const copy = JSON.parse(JSON.stringify(score));
      const i = scores.findIndex(s => s.id === 'mine');
      if (i >= 0) scores[i] = copy; else scores.push(copy);
      mineVersion += 1;
      st.kf = 'mine';
      syncUi();
      hooks.onChange?.();
    },
  });

  // walk into a tower: a click on the city of code (landscape, 11D) opens it
  const towerPanel = createTowerPanel(root);
  let towerShown = '|';
  root.addEventListener('click', event => {
    if (event.target.closest('button, .explorer__tower, .explorer__card') || st.stop !== 'landscape') return;
    const gl = gls.landscape;
    if (!gl?.pick) return;
    const r = root.getBoundingClientRect();
    const item = gl.pick((event.clientX - r.left) / r.width - 0.5, (event.clientY - r.top) / r.height - 0.5);
    if (item) towerPanel.show(item);
    else if (towerPanel.open) towerPanel.close();
    st.tower = towerPanel.open ? towerPanel.item.title.replace(/\.lean$/, '') : '';
    st.floor = '';
    towerShown = `${st.tower}|`;
    hooks.onChange?.();
  });

  root.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b) return;
    if (b.dataset.stop) go(b.dataset.stop);
    else if (b.dataset.dim) hooks.onDim?.(Number(b.dataset.dim));
    else if (b.dataset.feel) {
      st.feel = b.dataset.feel;
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'poke') api.poke(1);
    else if (b.dataset.act === 'kc') {
      st.kc = SETTING_IDS[(SETTING_IDS.indexOf(st.kc) + 1) % SETTING_IDS.length];
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'kf') {
      const ids = (scores ?? []).map(sc => sc.id);
      st.kf = ids[(ids.indexOf(st.kf) + 1) % ids.length] ?? 'river-film';
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'ap') {
      const order = ['', 'auto', 'co', 'manual'];
      st.ap = order[(order.indexOf(st.ap) + 1) % order.length];
      st.own = Math.max(1, Math.min(7, Number(localStorage.getItem('soma-handover')) || 1));
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'edit') {
      editor.toggle();
      syncUi();
    } else if (b.dataset.act === 'mindful') {
      st.mindful = !st.mindful;
      if (st.mindful) st.thoughts = true;
      syncUi();
    } else if (b.dataset.act === 'caveout') {
      st.caveOut = !st.caveOut;
      syncUi();
    } else if (b.dataset.act === 'vig') {
      st.vig = !st.vig;
      syncUi();
    } else if (b.dataset.act === 'body') {
      st.body = !st.body;
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'uo') {
      st.uo = (st.uo + 1) % URETER_STAGES.length;
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'uv') {
      st.uv = { in: 'out', out: 'both', both: 'in' }[st.uv];
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'follow') {
      st.pain = 'acute';
      st.painFrom = 'ureter';
      st.cave = false;
      go('brain');
    } else if (b.dataset.act === 'cave') {
      st.cave = !st.cave;
      if (st.cave) st.view3d = true;
      syncUi();
    } else if (b.dataset.act === 'pain') {
      st.pain = { '': 'acute', acute: 'chronic', chronic: '' }[st.pain];
      if (!st.pain) st.painFrom = '';
      syncUi();
    } else if (b.dataset.act === 'thoughts') {
      st.thoughts = !st.thoughts;
      syncUi();
    } else if (b.dataset.act === 'past') {
      st.past = !st.past;
      syncUi();
    } else if (b.dataset.act === 'orbit' || b.dataset.act === 'climb') {
      const g = scene('ureter').gl;
      g?.setView(g.view === b.dataset.act ? 'scope' : b.dataset.act);
      syncUi();
    } else if (b.dataset.act === 'wall' || b.dataset.act === 'wdown' || b.dataset.act === 'wup') {
      const sc = scene('ureter');
      sc.setWall(b.dataset.act === 'wall' ? (sc.wall ? 0 : 1) : sc.wall + (b.dataset.act === 'wdown' ? 1 : -1));
      syncUi();
    } else if (b.dataset.act === 'ab') {
      st.ab = st.ab === 'b' ? 'a' : 'b';
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'kx') {
      st.kx = (st.kx + 4) % 5; // down a notch each press: fewer words, then round to narration
      try { localStorage.setItem('soma-kx', String(st.kx)); } catch { /* private mode */ }
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'tw') {
      st.tw = !st.tw;
      if (st.tw) st.kc = 'river'; // the twin view is drawn in the river (two viewports)
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'pv') {
      const ids = (viewers ?? []).map(v => v.id);
      st.pv = ids[(ids.indexOf(st.pv) + 1) % ids.length] ?? 'v2021';
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'strap') {
      if (strap.connected) strap.disconnect();
      else strap.connect();
    }
    else if (b.dataset.act === 'kr') {
      st.kr = st.kr === 0 ? 0.5 : st.kr === 0.5 ? 1 : 0;
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'music') {
      Promise.resolve(music.enabled ? music.disable() : music.enable()).then(syncUi);
    } else if (b.dataset.act === 'stereo') {
      api.setStereo(STEREO_MODES[(STEREO_MODES.indexOf(st.stereo) + 1) % STEREO_MODES.length]);
    } else if (b.dataset.act === 'view3d') {
      st.view3d = !st.view3d;
      localStorage.setItem('soma-explorer-3d', st.view3d ? '1' : '0');
      syncUi();
    } else if (b.dataset.act === 'resource') {
      st.resource = !st.resource;
      syncUi();
      hooks.onChange?.();
    } else if (b.dataset.act === 'level') {
      const link = STOP_LEVELS[st.stop];
      api.hide();
      hooks.onLevel?.(link.level, link.dim);
    } else if (b.dataset.act === 'close') {
      api.hide();
      hooks.onChange?.();
    }
  });
  phiInput.addEventListener('input', () => {
    st.phi = Number(phiInput.value);
    phiOut.textContent = st.phi.toFixed(2);
    hooks.onPhi?.(st.phi);
  });
  phiInput.addEventListener('change', () => hooks.onChange?.());
  hrInput.addEventListener('input', () => {
    st.bpm = Number(hrInput.value);
    hrOut.textContent = String(st.bpm);
  });
  hrInput.addEventListener('change', () => hooks.onChange?.());
  document.addEventListener('keydown', event => {
    if (!st.open || event.defaultPrevented) return;
    if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    const i = STOPS.indexOf(st.stop);
    if (event.key === 'ArrowRight' && i < STOPS.length - 1) go(STOPS[i + 1]);
    else if (event.key === 'ArrowLeft' && i > 0) go(STOPS[i - 1]);
    else if (event.key === 'Escape') {
      api.hide();
      hooks.onChange?.();
    } else return;
    event.preventDefault();
  });

  const api = {
    // the open tower of the city of code and its floor (the hash keys tower and floor)
    get tower() { return towerPanel.open ? { tower: towerPanel.item.title.replace(/\.lean$/, ''), floor: towerPanel.floor } : null; },
    setTower(tower, floor) { st.tower = tower || ''; st.floor = floor || ''; },
    // the ureter's stage (shared by all windows) and view (this window): uo 1-4, uv in|out|both
    get ureterParams() { return { uo: st.uo, uv: st.uv }; },
    setUreter({ uo, uv } = {}) {
      const n = Number(uo);
      if (uo !== null && uo !== undefined && n >= 1 && n <= URETER_STAGES.length) st.uo = n - 1;
      if (['in', 'out', 'both'].includes(uv)) st.uv = uv;
      syncUi();
    },
    get open() { return st.open; },
    get stereo() { return st.stereo; },
    setStereo(mode) {
      if (!STEREO_MODES.includes(mode)) return;
      st.stereo = mode;
      localStorage.setItem('soma-stereo', mode);
      syncUi();
      hooks.onStereo?.(mode);
    },
    // true when the explorer hides the level view (not at the human stop, not while diving)
    get covers() { return st.open && st.stop !== 'human' && !st.diving; },
    get stop() { return st.stop; },
    get phi() { return st.phi; },
    get feel() { return st.feel; },
    get resource() { return st.resource; },
    show(stop) {
      if (!st.open) {
        st.open = true;
        root.hidden = false;
        document.body.classList.add('explorer-open');
        resize();
        last = 0;
        st.stop = STOPS.includes(stop) ? stop : st.stop;
        st.from = null;
        st.enterStart = 0;
        seeThrough(st.stop === 'human');
        syncUi();
        raf = requestAnimationFrame(frame);
      } else if (stop !== st.stop) {
        go(stop, { notify: false });
      }
    },
    hide() {
      if (!st.open) return;
      st.open = false;
      root.hidden = true;
      document.body.classList.remove('explorer-open');
      cancelAnimationFrame(raf);
    },
    setPhi(v) {
      const value = clamp(Number(v), 0, 1);
      if (!Number.isFinite(value)) return;
      st.phi = value;
      syncUi();
    },
    get loop() { return { bpm: st.bpm, kr: st.kr }; },
    get heart() { return { strap: strap.connected, status: strapStatus, rr: rrIntervals.slice() }; },
    get scoreParams() { return { kv: st.kv, st: st.st, kd: st.kd, kt: st.kt, kw: st.kw, km: st.km, kc: st.kc, kf: st.kf, tw: st.tw ? 1 : 0, pv: st.pv, ca: st.ca, cs: st.cs, cp: st.cp, kx: st.kx, ab: st.ab, ap: st.ap }; },
    setLoop({ bpm, kr } = {}) {
      if (bpm !== null && bpm !== undefined && bpm !== '' && Number.isFinite(Number(bpm))) st.bpm = Math.max(50, Math.min(140, Number(bpm)));
      if (kr !== null && kr !== undefined && ['0', '0.5', '1'].includes(String(kr))) st.kr = Number(kr);
      syncUi();
    },
    setScore({ kv, st: start, kd, kt, kw, km, kc, kf, tw, pv, ca, cs, cp, kx, ab, ap } = {}) {
      if (SETTING_IDS.includes(kc)) st.kc = kc;
      const num = x => x !== null && x !== undefined && x !== '' && Number.isFinite(Number(x));
      if (scores?.some(sc => sc.id === kf)) st.kf = kf;
      if (tw !== null && tw !== undefined && tw !== '') st.tw = String(tw) === '1' || tw === true;
      if (viewers?.some(v => v.id === pv)) st.pv = pv;
      if (num(ca)) st.ca = clamp(Number(ca), 0, 1);
      if (num(cs)) st.cs = clamp(Number(cs), 0, 1);
      if (num(cp)) st.cp = clamp(Number(cp), 0, 1);
      if (ab === 'a' || ab === 'b') st.ab = ab;
      if (['', 'auto', 'co', 'manual'].includes(ap ?? null)) st.ap = ap;
      if (num(kx) && Number.isInteger(Number(kx)) && Number(kx) >= 0 && Number(kx) <= 4) st.kx = Number(kx);
      syncUi();
      if (num(kd)) st.kd = clamp(Number(kd), 0, 1);
      if (num(kt)) st.kt = clamp(Number(kt), 0, 1);
      if (num(kw)) st.kw = clamp(Number(kw), 0.5, 2);
      if (typeof km === 'string') st.km = km.split(',').filter(id => MODE_IDS.includes(id)).join(',');
      if (Number.isFinite(Number(kv)) && kv !== null && kv !== '') st.kv = Number(kv);
      if (Number.isFinite(Number(start)) && start !== null && start !== '') st.st = Number(start);
    },
    setFeel(f) { if (FEELINGS[f]) { st.feel = f; syncUi(); } },
    setResource(on) { st.resource = Boolean(on); syncUi(); },
    setLabels(on) { st.labels = Boolean(on); },
    refresh() { syncUi(); },
    poke(strength = 1) {
      if (st.open && st.stop !== 'human') scene(st.stop).poke(clamp(Number(strength) || 1, 0, 1));
      music.poke();
    },
  };
  return api;
}
