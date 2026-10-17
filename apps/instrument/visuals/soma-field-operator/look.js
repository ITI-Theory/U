// look.js: looking around in the first-person 3D stops (ISS-078). LOOK is a yaw and pitch added
// to wherever the stop aims its camera: the arrow keys and a right-drag turn the head, B looks
// behind (the rear view). VIGILANCE: the view glances by itself, left, right, up and now and
// then behind, as hypervigilance does; with the C-PTSD slider the glances come more often,
// faster, and turn further; safety (the score's S, the limbic breath) lets them settle. A
// picture of a state, felt rather than read; not a diagnosis.

export const LOOK = { yaw: 0, pitch: 0, behind: false, glancing: false };

export function createLook() {
  let manualYaw = 0, manualPitch = 0;
  let rear = 0;                // 0 .. 1, eased towards the rear view
  let rearOn = false;
  let glance = { yaw: 0, pitch: 0, until: 0 };
  let nextGlance = 3;
  let yaw = 0, pitch = 0;
  let time = 0;
  const keys = new Set();
  return {
    get rear() { return rearOn; },
    toggleRear() { rearOn = !rearOn; },
    key(code, down) { if (down) keys.add(code); else keys.delete(code); },
    drag(dx, dy) { manualYaw -= dx * 0.004; manualPitch = Math.max(-0.9, Math.min(0.9, manualPitch - dy * 0.004)); },
    reset() { manualYaw = 0; manualPitch = 0; rearOn = false; },
    // vigilance: on/off; cp: the C-PTSD slider; safety: 0 .. 1
    update(dt, { vigilance = false, cp = 0, safety = 0 } = {}) {
      time += dt;
      if (keys.has('ArrowLeft')) manualYaw += 1.4 * dt;
      if (keys.has('ArrowRight')) manualYaw -= 1.4 * dt;
      if (keys.has('ArrowUp')) manualPitch = Math.min(0.9, manualPitch + 1 * dt);
      if (keys.has('ArrowDown')) manualPitch = Math.max(-0.9, manualPitch - 1 * dt);
      // without input the head drifts back to the front
      if (![...keys].some(k => k.startsWith('Arrow'))) { manualYaw *= Math.exp(-dt / 6); manualPitch *= Math.exp(-dt / 6); }
      rear += ((rearOn ? 1 : 0) - rear) * Math.min(1, dt * 3);
      // the glances
      const k = vigilance ? Math.max(0, (0.3 + 0.7 * cp) * (1 - 0.8 * safety)) : 0;
      if (k > 0.02) {
        nextGlance -= dt;
        if (nextGlance <= 0) {
          const side = Math.random() < 0.5 ? -1 : 1;
          const back = Math.random() < 0.08 + 0.25 * cp;
          glance = { yaw: back ? side * (2.6 + 0.4 * Math.random()) : side * (0.5 + 1.1 * k * Math.random()), pitch: (Math.random() - 0.4) * 0.35 * k, until: time + 0.45 + 0.6 * Math.random() };
          nextGlance = (6 - 4.8 * k) * (0.6 + 0.8 * Math.random()) + 0.6;
        }
      }
      const gOn = time < glance.until;
      const gy = gOn ? glance.yaw : 0, gp = gOn ? glance.pitch : 0;
      // a glance is quick (the faster the higher cp); the return a little slower
      const speed = gOn ? 1 / (0.12 + 0.25 * (1 - cp)) : 2.2;
      yaw += (manualYaw + Math.PI * rear + gy - yaw) * Math.min(1, dt * speed);
      pitch += (manualPitch + gp - pitch) * Math.min(1, dt * speed);
      LOOK.yaw = yaw;
      LOOK.pitch = pitch;
      LOOK.behind = Math.abs(((yaw + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI) > 2.2;
      LOOK.glancing = gOn;
      return LOOK;
    },
  };
}

// after a stop aims its camera
export function applyLook(camera) {
  if (!LOOK.yaw && !LOOK.pitch) return;
  camera.rotateY(LOOK.yaw);
  camera.rotateX(LOOK.pitch);
}

// Procedural textures at the display's resolution (ISS-103): a wall texture drawn at 512 px is soft on
// a 4K screen. texScale() is how many times larger to draw it: 1 up to 1080p, 2 from 1440p, 4 at 4K;
// a texture keeps its drawing code and scales its context (hiresCanvas).
export function texScale() {
  const px = Math.max(globalThis.screen?.width ?? 1920, globalThis.screen?.height ?? 1080) * (globalThis.devicePixelRatio || 1);
  return px >= 3800 ? 4 : px >= 2500 ? 2 : 1;
}
export function hiresCanvas(size) {
  const k = texScale();
  const c = document.createElement('canvas');
  c.width = c.height = size * k;
  const g = c.getContext('2d');
  g.scale(k, k);
  return { c, g };
}
