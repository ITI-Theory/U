// MIDI OUT (ISS-073): the score as MIDI, so Ableton Live (its instruments, Max for Live)
// can be the score's instrument. Opt-in from the Engine Room; Web MIDI (Chrome) into a
// virtual port (loopMIDI on Windows), then out through the audio interface.
//   channel 1, CC 20-26: the seven modes S F C A G L PV (0..1 as 0..127)
//   channel 1, CC 27: the heart (40..160 bpm as 0..127); CC 28: story-time (0..1); CC 29: the limbic field Φ (0..1)
//   channel 1, notes 36+: a phase begins (36 the first phase): map to scene launches
//   channel 1, notes 48+: a threshold is crossed (48 the first threshold)
//   channel 2, the band (ISS-115; registry/sound-grammar.yaml's planned channels, a first,
//   interpretive proposal): notes 60-66, the chord pad for the tension (bind Scaler's pads to
//   them: 60 the most settled, 66 the most suspended); CC 30 the bass's motion (how fast the
//   tension moves); CC 31 the drums' density; CC 32 the guitar's drive; CC 33 the tension itself
// Only one window sends (a short lease in localStorage), so a layout of four windows does
// not send four times.

export const MIDI_CC = { S: 20, F: 21, C: 22, A: 23, G: 24, L: 25, PV: 26, HR: 27, T: 28, PHI: 29 };
export const BAND_CC = { motion: 30, density: 31, drive: 32, tension: 33 };
export const CHORD_NOTE = 60;
export const PHASE_NOTE = 36;
export const THRESHOLD_NOTE = 48;
const KEY = 'soma-midi-out';
const LEASE = 'soma-midi-lease';

const store = () => { try { return globalThis.localStorage ?? null; } catch { return null; } };

// the setting: null when off, else the port name to look for ('' = the first output)
export function midiOutSetting() {
  const v = store()?.getItem(KEY);
  return v === null || v === undefined || v === 'off' ? null : v;
}

export function setMidiOut(port) {
  store()?.setItem(KEY, port === null ? 'off' : String(port));
  globalThis.dispatchEvent?.(new CustomEvent('soma-midi-out', { detail: { port } }));
}

const clamp7 = x => Math.max(0, Math.min(127, Math.round(x * 127)));
const clamp01 = x => Math.max(0, Math.min(1, x));

// the band's controls from the score's modes (sound-grammar.yaml: chord-tension, bass-motion,
// drum-density, guitar-drive): a first proposal, interpretive, for the author to tune
export function bandControls(m, dt = 0, last = {}) {
  const tension = clamp01(0.5 * m.F + 0.3 * (1 - m.S) + 0.2 * m.G);
  const prev = last.tension ?? tension;
  const speed = dt > 0 ? Math.abs(tension - prev) / dt : 0;
  last.tension = tension;
  last.motion = 0.9 * (last.motion ?? 0) + 0.1 * clamp01(speed * 20);
  return {
    tension,
    chord: Math.min(6, Math.floor(tension * 7)),
    motion: last.motion,
    density: clamp01(0.5 * m.F + 0.3 * m.C + 0.2 * m.A),
    drive: clamp01(0.7 * m.F + 0.3 * m.PV),
  };
}

// the messages for one frame, given what was sent last (pure: tested without a browser)
export function midiMessages(state, last = {}) {
  const out = [];
  const cc = (id, value) => {
    const v = clamp7(value);
    if (last[id] !== v) { out.push([0xb0, MIDI_CC[id], v]); last[id] = v; }
  };
  for (const id of ['S', 'F', 'C', 'A', 'G', 'L', 'PV']) if (state.modes?.[id] !== undefined) cc(id, state.modes[id]);
  if (state.bpm > 0) cc('HR', (state.bpm - 40) / 120);
  if (state.t !== undefined) cc('T', state.t);
  if (state.phi !== undefined) cc('PHI', state.phi);
  if (state.phase !== undefined && state.phase >= 0 && last.phase !== state.phase) {
    last.phase = state.phase;
    out.push([0x90, Math.min(127, PHASE_NOTE + state.phase), 100]);
  }
  if (state.crossed !== undefined && state.crossed >= 0) out.push([0x90, Math.min(127, THRESHOLD_NOTE + state.crossed), 110]);
  // the band, channel 2
  if (state.modes && ['S', 'F', 'C', 'A', 'G', 'PV'].every(id => state.modes[id] !== undefined)) {
    last.band ??= {};
    const b = bandControls(state.modes, state.dt ?? 0, last.band);
    for (const id of ['motion', 'density', 'drive', 'tension']) {
      const v = clamp7(b[id]);
      if (last[`b${id}`] !== v) { out.push([0xb1, BAND_CC[id], v]); last[`b${id}`] = v; }
    }
    if (last.chord !== b.chord) {
      if (last.chord !== undefined) out.push([0x81, CHORD_NOTE + last.chord, 0]);
      out.push([0x91, CHORD_NOTE + b.chord, 96]);
      last.chord = b.chord;
    }
  }
  return out;
}

export function createMidiOut({ requestAccess = () => globalThis.navigator?.requestMIDIAccess?.(), id = Math.random().toString(36).slice(2), now = () => Date.now() } = {}) {
  let output = null;
  let wanted = undefined;
  let status = 'off';
  let pending = null;
  const last = {};
  let leaseAt = 0;

  async function open(port) {
    status = 'opening';
    try {
      const access = await requestAccess();
      if (!access) { status = 'no Web MIDI (use Chrome)'; return; }
      const outputs = [...access.outputs.values()];
      output = outputs.find(o => !port || o.name.toLowerCase().includes(port.toLowerCase())) ?? null;
      status = output ? `→ ${output.name}` : `no port "${port}"`;
      for (const k of Object.keys(last)) delete last[k];
    } catch {
      status = 'refused: allow MIDI for this site in Chrome';
      output = null;
    }
  }

  // one window sends: take the lease if it is free, stale (2 s) or ours
  function mine() {
    const s = store();
    if (!s) return true;
    const [owner, at] = (s.getItem(LEASE) ?? '').split('|');
    const t = now();
    if (owner && owner !== id && t - Number(at) < 2000) return false;
    if (t - leaseAt > 500) { s.setItem(LEASE, `${id}|${t}`); leaseAt = t; }
    return true;
  }

  return {
    get status() { return status; },
    // called every frame at the score stop
    send(state) {
      const port = midiOutSetting();
      if (port !== wanted) {
        wanted = port;
        output = null;
        if (port === null) status = 'off';
        else pending = open(port);
      }
      if (!output || !mine()) return [];
      const messages = midiMessages(state, last);
      for (const m of messages) {
        output.send(m);
        // notes are short pulses: the off 150 ms later
        if (m[0] === 0x90) output.send([0x80, m[1], 0], (globalThis.performance?.now?.() ?? 0) + 150);
      }
      return messages;
    },
    get ready() { return pending; },
  };
}
