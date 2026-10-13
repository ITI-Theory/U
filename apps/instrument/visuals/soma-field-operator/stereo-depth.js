// The stereo depth (ISS-052, from the author's calibration with the glasses, ISS-027):
// one multiplier for the eye separation of every 3D view and the 2D stereo, set by the
// engine room's DEPTH slider (0 flat, 1 as built, up to 2.5) and live in every window.
const KEY = 'soma-stereo-depth';
const CLIENT_KEY = 'soma-stereo-client';
// CLIENT (H-AL's caution, ISS-052): looming 3D can trigger C-PTSD, so with a client the depth
// is held moderate, whatever the slider says. The author calibrates his own depth above it.
export const CLIENT_MAX_DEPTH = 0.6;
let cached = null;
let client = null;

export function clientSafe() {
  if (client === null) {
    try { client = localStorage.getItem(CLIENT_KEY) === '1'; } catch { client = false; }
  }
  return client;
}

export function setClientSafe(on) {
  client = Boolean(on);
  try { localStorage.setItem(CLIENT_KEY, client ? '1' : '0'); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-stereo-depth', { detail: { depth: stereoDepth() } }));
}

export function stereoDepth() {
  if (cached === null) {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch { /* private mode */ }
    const v = raw === null ? 1 : Number(raw);
    cached = Number.isFinite(v) && v >= 0 ? v : 1;
  }
  return clientSafe() ? Math.min(cached, CLIENT_MAX_DEPTH) : cached;
}

// The slider's own setting, before the client cap.
export function stereoDepthSetting() {
  stereoDepth();
  return cached;
}

export function setStereoDepth(value) {
  cached = Math.max(0, Math.min(2.5, Number(value) || 0));
  try { localStorage.setItem(KEY, String(cached)); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-stereo-depth', { detail: { depth: cached } }));
}

// another window moved the slider
globalThis.addEventListener?.('storage', event => {
  if (event.key === KEY) cached = null;
  if (event.key === CLIENT_KEY) client = null;
});

// A scene's stereo camera: its own separation (base) times the depth, then update.
export function updateStereo(stereo, camera, base) {
  stereo.eyeSep = base * stereoDepth();
  stereo.update(camera);
}
