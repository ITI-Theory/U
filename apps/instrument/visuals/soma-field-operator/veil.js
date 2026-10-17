// veil.js: a tour step's declared transition, drawn (registry/transitions.yaml, docs/PIPELINE.md). The
// explorer draws its own jumps (the zoom fade, the dive, the doorway glide); a step's `via:` adds what it
// does not: a fade over the step's seconds, and the wormhole, a flight down the neon cave, when ROOTED
// (in the default a wormhole is drawn as its `default_as`, a fade). The view changes at the midpoint.
// Every step also tells the sound what the jump is (the event `soma-transition`).

import { transitions } from './generated/app-data.js';
import { parseVia } from './transitions.js';
import { rooted } from './who.js';
import { createFlight3D } from './flight3d.js';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
// the end of a CSS fade, or the time it should have taken plus a margin (a busy page starts it late)
const faded = (el, ms) => Promise.race([new Promise(resolve => el.addEventListener('transitionend', resolve, { once: true })), wait(ms + 1500)]);

export function createVeil() {
  const el = document.createElement('div');
  el.className = 'tour-veil';
  Object.assign(el.style, { position: 'fixed', inset: '0', background: '#07020f', opacity: '0', pointerEvents: 'none', zIndex: '207' }); // above the explorer (200) and POKE's rings (205, 206), under the tour card (210)
  document.body.append(el);
  let cave = null;
  let raf = 0;

  function flyCave(seconds) {
    cave ??= createFlight3D();
    if (!cave) return;
    cave.canvas.className = '';
    Object.assign(cave.canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', opacity: '1' });
    el.append(cave.canvas);
    cave.resize(innerWidth, innerHeight, Math.min(2, devicePixelRatio || 1));
    cave.poke(1);
    const t0 = performance.now();
    const frame = now => {
      const t = (now - t0) / 1000;
      cave.render({ sector: 'cave', phi: 0.9, time: 100 + t, stereo: 'off' });
      if (t < seconds) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  }

  // Run a declared transition around `apply` (which changes the view). Returns what was drawn.
  async function run(viaText, apply) {
    const via = parseVia(viaText);
    if (via.problem) { apply(); return via; }
    const def = transitions?.kinds?.[via.kind] ?? {};
    const drawn = def.rooted && !rooted() ? def.default_as ?? 'fade' : via.kind;
    if (drawn !== 'fade' && drawn !== 'wormhole') { apply(); return { ...via, drawn }; }
    const half = Math.max(0.2, via.seconds / 2);
    void el.offsetWidth; // a fresh element has no style yet: flush it, so the fade runs from 0
    el.style.transition = `opacity ${half}s ease-in`;
    el.style.opacity = '1';
    if (drawn === 'wormhole') flyCave(via.seconds + 3);
    await faded(el, half * 1000);
    apply();
    el.style.transition = `opacity ${half}s ease-out`;
    el.style.opacity = '0';
    await faded(el, half * 1000);
    cancelAnimationFrame(raf);
    cave?.canvas.remove();
    return { ...via, drawn };
  }

  return { run };
}
