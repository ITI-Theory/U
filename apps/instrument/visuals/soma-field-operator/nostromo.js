// nostromo.js: MOTHER's sounds (ISS-108, author 16 Oct: "the Nostromo boot sequence, lots in
// there ... the typewriter, but there are a few sounds"). Synthesised here (Web Audio), in the
// spirit of a 1979 ship's computer, not taken from any film: a teletype's chatter as she types,
// data trills, high bleeps, and a boot sequence. ROOTED's rewards; elsewhere off unless chosen
// (localStorage 'soma-teletype' = 'on'). Quiet; silent where audio is unavailable.

import { rooted } from './who.js';

let ac = null, bus = null;
function ctx() {
  try {
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AC) return null;
    if (!ac) { ac = new AC(); bus = ac.createGain(); bus.gain.value = 0.5; bus.connect(ac.destination); }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  } catch { return null; }
}
export function soundOn() {
  try { const v = localStorage.getItem('soma-teletype'); return v === 'on' || (v !== 'off' && rooted()); } catch { return false; }
}

// one key of the teletype: a short filtered click with a little body
function click(a, t, level = 0.12) {
  const len = 0.018;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * len), a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (d.length * 0.18));
  const src = a.createBufferSource(); src.buffer = buf;
  const f = a.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1800 + Math.random() * 1600; f.Q.value = 1.4;
  const g = a.createGain(); g.gain.value = level;
  src.connect(f).connect(g).connect(bus);
  src.start(t);
}
function tone(a, t, freq, dur, level = 0.05, type = 'square') {
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(level, t + 0.004);
  g.gain.setValueAtTime(level, t + dur * 0.8);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(bus);
  o.start(t); o.stop(t + dur + 0.01);
}

// chatter for n characters (called as MOTHER types)
export function teletype(n = 3) {
  if (!soundOn()) return;
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime;
  for (let k = 0; k < Math.min(6, n); k++) click(a, t0 + k * (0.022 + Math.random() * 0.012), 0.08 + Math.random() * 0.06);
  if (Math.random() < 0.04) tone(a, t0 + 0.02, 2600 + Math.random() * 900, 0.03, 0.025);
}
// a data trill: fast random high notes, the computer thinking
export function trill(len = 0.6) {
  if (!soundOn()) return;
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime;
  for (let t = 0; t < len; t += 0.035) tone(a, t0 + t, 1400 + Math.floor(Math.random() * 8) * 220, 0.03, 0.03);
}
// a bleep: one or two clean high tones (an answer, a step)
export function bleep(kind = 'ok') {
  if (!soundOn()) return;
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime;
  const seq = { ok: [[2093, 0.07], [2637, 0.09]], no: [[880, 0.12], [660, 0.18]], step: [[1760, 0.05]] }[kind] ?? [[2093, 0.07]];
  let t = t0;
  for (const [f, d] of seq) { tone(a, t, f, d, 0.05, 'square'); t += d + 0.02; }
}
// the boot sequence: chatter, trills and rising bleeps (access granted; the reward)
export function boot() {
  if (!soundOn()) return;
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime;
  for (let k = 0; k < 40; k++) click(a, t0 + k * 0.03 + Math.random() * 0.01, 0.1);
  for (let k = 0; k < 18; k++) tone(a, t0 + 0.4 + k * 0.045, 1200 + Math.floor(Math.random() * 10) * 200, 0.035, 0.035);
  [1047, 1319, 1568, 2093].forEach((f, k) => tone(a, t0 + 1.35 + k * 0.11, f, 0.1, 0.05, 'square'));
  tone(a, t0 + 1.85, 2093, 0.45, 0.04, 'triangle');
}
// a small reward (ROOTED): through a dome, a zap, a thought resolved
export function reward() {
  if (!soundOn()) return;
  const a = ctx(); if (!a) return;
  const t0 = a.currentTime;
  for (let k = 0; k < 6; k++) tone(a, t0 + k * 0.04, 1600 + Math.floor(Math.random() * 6) * 260, 0.03, 0.035);
  tone(a, t0 + 0.28, 2637, 0.12, 0.045);
}
