// RICE (ricing, ISS-075): the author's switch for his own options. Off by default, so the
// public app stays calm; on, it reveals the extras (crew alerting at the score stop first;
// neon themes, code rain and the Root Monster's tours as they arrive). Kept per browser and
// shared by its windows (localStorage), so the Engine Room can switch every window at once.
const KEY = 'soma-rice';
let cached = null;

export function rice() {
  if (cached === null) {
    try { cached = localStorage.getItem(KEY) === '1'; } catch { cached = false; }
  }
  return cached;
}

export function setRice(on) {
  cached = Boolean(on);
  try { localStorage.setItem(KEY, cached ? '1' : '0'); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-rice', { detail: { on: cached } }));
}

// another window changed it
globalThis.addEventListener?.('storage', event => { if (event.key === KEY) cached = event.newValue === '1'; });

// VOICE (RICE): how the machine speaks. 'ms' (default): the browser's voices, Microsoft's
// Natural ones first where the browser has them (Edge: online Natural voices; Windows 11:
// the installed ones). 'hal': H-AL speaks in his Piper voice through the bridge, lowered,
// slowed and given a little room (the HAL effect); MOTHER keeps the Natural voice.
const VOICE_KEY = 'soma-voice';
export const VOICE_STYLES = ['ms', 'hal'];

export function voiceStyle() {
  try { const v = localStorage.getItem(VOICE_KEY); return VOICE_STYLES.includes(v) ? v : 'ms'; } catch { return 'ms'; }
}

export function setVoiceStyle(style) {
  const v = VOICE_STYLES.includes(style) ? style : 'ms';
  try { localStorage.setItem(VOICE_KEY, v); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-voice', { detail: { style: v } }));
}
