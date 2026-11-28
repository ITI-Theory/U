// The eye and the HUD (ISS-127).
//
// The author, 20 Oct: "I have climbed, but my eyes are still the size they were ... when we change
// the zoom, we should feel that we *are* that size"; and 21 Nov: "is the zooming different to just
// putting myself somewhere where I can see something else". A point camera has no size, so zooming
// and moving look the same. The HUMAN eye couples the camera to the zoom: while a zoom is under way
// the viewer is still the old size, peering at the new scale through an aperture (a microscope on
// the way down, a telescope on the way up), so the field of view narrows and a round vignette
// closes in; on arrival the viewer is native to the scale (co-moving) and the view opens again.
// PINHOLE is the plain point camera, as before.
//
// The HUD reports it, SpaceEngine-style: the level, its sigma and length, its "now" (the level's
// response time: how long its present lasts), and the eye's mode. Its instruments are a setting:
// SCALE (the default), FLIGHT (the camera's heading, pitch and roll), BOTH, or OFF.

import * as THREE from 'three';

export const EYE_CHOICES = [
  { id: 'human', label: 'HUMAN (APERTURE WHILE ZOOMING)' },
  { id: 'pinhole', label: 'PINHOLE (POINT CAMERA)' },
];
export const HUD_CHOICES = [
  { id: 'scale', label: 'SCALE' },
  { id: 'flight', label: 'FLIGHT' },
  { id: 'both', label: 'SCALE + FLIGHT' },
  { id: 'off', label: 'OFF' },
];

// How narrow the view gets at the start of a one-level zoom (a fraction of the native field).
const NARROWEST = 0.4;

/** A saved choice, or the fallback when none (or an unknown one) is saved. */
export function loadChoice(key, choices, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (choices.some(choice => choice.id === saved)) return saved;
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }
  return fallback;
}

/** A time in seconds as a person would say it: "10^-3 s" is "1 ms", "10^17 s" "3 billion years". */
export function sayTime(text) {
  const match = /10\^(-?\d+(?:\.\d+)?)\s*s/.exec(String(text ?? ''));
  if (!match) return text ? String(text) : 'UNSET';
  const s = 10 ** Number(match[1]);
  const year = 3.156e7;
  const round = x => (x >= 10 ? Math.round(x) : Math.round(x * 10) / 10);
  if (s >= 1e9 * year) return `${round(s / 1e9 / year)} billion years`;
  if (s >= 1e6 * year) return `${round(s / 1e6 / year)} million years`;
  if (s >= 1e3 * year) return `${round(s / 1e3 / year)} thousand years`;
  if (s >= year) return `${round(s / year)} years`;
  if (s >= 86400) return `${round(s / 86400)} days`;
  if (s >= 3600) return `${round(s / 3600)} hours`;
  if (s >= 60) return `${round(s / 60)} minutes`;
  if (s >= 1) return `${round(s)} s`;
  if (s >= 1e-3) return `${round(s * 1e3)} ms`;
  if (s >= 1e-6) return `${round(s * 1e6)} µs`;
  if (s >= 1e-9) return `${round(s * 1e9)} ns`;
  return `10^${match[1]} s`;
}

/**
 * The eye and its HUD. `getState` gives the app's state (scale, visualScale, eye, hud, stereoSbs,
 * compare); `level` the active level (label, length_scale, response_time); `badge` its evidence
 * label.
 */
export function createEye({ camera, getState, level, badge }) {
  const aperture = document.createElement('div');
  aperture.className = 'eye-aperture';
  aperture.setAttribute('aria-hidden', 'true');
  document.body.append(aperture);

  const panel = document.createElement('section');
  panel.className = 'eye-hud';
  panel.setAttribute('aria-label', 'HUD: where you are and what size you are');
  panel.innerHTML = '<dl class="eye-hud__scale"></dl><dl class="eye-hud__flight"></dl>';
  document.body.append(panel);
  const scaleList = panel.querySelector('.eye-hud__scale');
  const flightList = panel.querySelector('.eye-hud__flight');

  let lastText = '';
  let lastHud = null;
  const euler = new THREE.Euler();

  /** How far the viewer still is from the scale shown: 0 native, 1 a whole level away (or more). */
  function peering() {
    const s = getState();
    if (s.eye !== 'human') return 0;
    return Math.min(1, Math.abs(s.scale - s.visualScale));
  }

  /** Narrow the camera from its native field while peering; call each frame after `resize`. */
  function apply(nativeFov) {
    const s = getState();
    const p = peering();
    const fov = nativeFov * (1 - (1 - NARROWEST) * p);
    if (Math.abs(camera.fov - fov) > 1e-4) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    // One round aperture fits one picture; side-by-side views keep only the narrowing.
    const single = !s.stereoSbs && !s.compare;
    aperture.style.opacity = single ? p.toFixed(3) : '0';
    aperture.style.setProperty('--eye-open', `${(70 - 34 * p).toFixed(1)}%`);
  }

  function row(term, value) {
    return `<div><dt>${term}</dt><dd>${value}</dd></div>`;
  }

  /** The HUD's text, rewritten only when it changes. */
  function update() {
    const s = getState();
    // The setting shows or hides the panel when it changes; its close button may hide it meanwhile.
    if (s.hud !== lastHud) {
      panel.hidden = s.hud === 'off';
      lastHud = s.hud;
      lastText = '';
    }
    if (panel.hidden) return;
    const l = level();
    const p = peering();
    const mode = s.eye !== 'human' ? 'PINHOLE (A POINT CAMERA)'
      : p > 0.02 ? `REMOTE APERTURE: ${s.scale < s.visualScale ? 'MICROSCOPE' : 'TELESCOPE'}`
      : 'CO-MOVING: YOUR SIZE IS THIS SCALE';
    const moving = Math.abs(s.scale - s.visualScale) > 0.02;
    const sigma = moving ? `${s.visualScale.toFixed(2)} → ${s.scale}` : String(s.scale);
    const scaleText = row('LEVEL', `${l.label} <small>${badge(l)}</small>`) + row('σ', sigma)
      + row('ℓ', l.length_scale ?? 'UNSET') + row('NOW', `${sayTime(l.response_time)} <small>${l.response_time ?? ''}</small>`)
      + row('EYE', mode);
    euler.setFromQuaternion(camera.quaternion, 'YXZ');
    const deg = r => Math.round(THREE.MathUtils.radToDeg(r));
    const heading = (360 - deg(euler.y) + 360) % 360;
    const flightText = row('HDG', `${String(heading).padStart(3, '0')}°`) + row('PITCH', `${deg(euler.x)}°`)
      + row('ROLL', `${deg(euler.z)}°`) + row('FOV', `${camera.fov.toFixed(1)}°`);
    const showScale = s.hud === 'scale' || s.hud === 'both';
    const showFlight = s.hud === 'flight' || s.hud === 'both';
    const text = `${s.hud}|${scaleText}|${flightText}`;
    if (text === lastText) return;
    lastText = text;
    scaleList.hidden = !showScale;
    flightList.hidden = !showFlight;
    if (showScale) scaleList.innerHTML = scaleText;
    if (showFlight) flightList.innerHTML = flightText;
  }

  return { panel, apply, update, peering };
}
