// The stereo depth (ISS-052, from the author's calibration with the glasses, ISS-027):
// one multiplier for the eye separation of every 3D view and the 2D stereo, set by the
// engine room's DEPTH slider (0 flat, 1 as built, up to 2.5) and live in every window.
const KEY = 'soma-stereo-depth';
let cached = null;

export function stereoDepth() {
  if (cached === null) {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch { /* private mode */ }
    const v = raw === null ? 1 : Number(raw);
    cached = Number.isFinite(v) && v >= 0 ? v : 1;
  }
  return cached;
}

export function setStereoDepth(value) {
  cached = Math.max(0, Math.min(2.5, Number(value) || 0));
  try { localStorage.setItem(KEY, String(cached)); } catch { /* private mode */ }
  globalThis.dispatchEvent?.(new CustomEvent('soma-stereo-depth', { detail: { depth: cached } }));
}

// another window moved the slider
globalThis.addEventListener?.('storage', event => { if (event.key === KEY) cached = null; });

// A scene's stereo camera: its own separation (base) times the depth, then update.
export function updateStereo(stereo, camera, base) {
  stereo.eyeSep = base * stereoDepth();
  stereo.update(camera);
}
