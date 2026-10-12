// MIDI IN (ISS-053, ISS-074): a hardware controller turns the knobs live, e.g. a
// 16-encoder MIDI Fighter Twister (CC 0-15 on channel 1, its factory default). Opt-in
// from the Engine Room; Web MIDI (Chrome, Edge). Every window of this browser listens,
// so a layout of windows stays in step.
//   CC 0-6  the seven modes S F C A G L PV (the pilot's knobs: CO-PILOT and MANUAL)
//   CC 7    Φ, the limbic field and FX
//   CC 8    depth κd (0 to 1)
//   CC 9    velocity κv (0.1 to 3)

export const MIDI_IN_MAP = { 0: 'S', 1: 'F', 2: 'C', 3: 'A', 4: 'G', 5: 'L', 6: 'PV', 7: 'phi', 8: 'kd', 9: 'kv' };
const KEY = 'soma-midi-in';

export function midiInOn() {
  try { return globalThis.localStorage?.getItem(KEY) === '1'; } catch { return false; }
}

export function setMidiIn(on) {
  try { globalThis.localStorage?.setItem(KEY, on ? '1' : '0'); } catch { /* private mode */ }
}

// one MIDI message to a control, or null: { id, value } with value scaled for its control
export function midiControl(data) {
  const [status, cc, raw] = data ?? [];
  if ((status & 0xf0) !== 0xb0 || !(cc in MIDI_IN_MAP)) return null;
  const v = Math.max(0, Math.min(1, raw / 127));
  const id = MIDI_IN_MAP[cc];
  return { id, value: id === 'kv' ? Math.round((0.1 + 2.9 * v) * 10) / 10 : Math.round(v * 100) / 100 };
}

// listen on every input; onControl({ id, value }); returns a status string promise
export async function startMidiIn(onControl, requestAccess = () => globalThis.navigator?.requestMIDIAccess?.()) {
  if (!midiInOn()) return 'off';
  try {
    const access = await requestAccess();
    if (!access) return 'no Web MIDI (use Chrome)';
    const bind = () => {
      for (const input of access.inputs.values()) {
        input.onmidimessage = event => { const c = midiControl(event.data); if (c) onControl(c); };
      }
    };
    bind();
    access.onstatechange = bind;
    const names = [...access.inputs.values()].map(i => i.name);
    return names.length ? `listening: ${names.join(', ')}` : 'no controller connected';
  } catch {
    return 'refused: allow MIDI for this site in Chrome';
  }
}
