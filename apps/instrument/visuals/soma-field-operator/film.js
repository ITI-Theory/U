// film.js: FILM, a compiled film played at run time (docs/PIPELINE.md, ISS-117; author, 17 Oct: "cut, for
// a film, the whole thing once, with zero user adjustments ... at runtime it's compiled and we just run
// in sync ... then a user can make small adjustments"). The film is compiled once by
// scripts/compile-film.mjs (a tour over a score with a viewer's baseline baked in, bld/film/*.json);
// here it is played: the places in order, each jump as declared (a fade or the wormhole through the
// veil, the rest the explorer's own), the compiled modes driving the score's pictures frame by frame,
// and the live knobs (PILOT: CO-PILOT, MANUAL) still overriding on top. Every frame is announced as
// `soma-film-frame` (time, story-time, place, the compiled modes, the band's controls) and every jump as
// `soma-transition`, for the sound to follow. MOTHER's /film opens it; the file is read from your disk.

import { createVeil } from './veil.js';

const SPEEDS = [1, 10, 60];

export function createFilm({ explorer }) {
  const panel = document.createElement('section');
  panel.className = 'show-panel film-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <h2>FILM · A COMPILED FILM</h2>
    <p>Pick a compiled film (<code>node scripts/compile-film.mjs</code> writes bld/film/&lt;tour&gt;.&lt;score&gt;.&lt;viewer&gt;.timeline.json). The viewer's baseline is already in it: it plays as zero, and the knobs move it from there.</p>
    <input type="file" accept=".json,application/json" />
    <p class="show-panel__status">waiting for the film</p>
    <p>Speed: <select data-act="speed">${SPEEDS.map(s => `<option value="${s}">${s}×</option>`).join('')}</select></p>
    <div class="show-panel__go"><button type="button" data-act="play" disabled>▶ PLAY</button><button type="button" data-act="close">CLOSE</button></div>
    <small>Esc ends the film.</small>`;
  document.body.append(panel);
  const status = panel.querySelector('.show-panel__status');
  let doc = null, raf = 0, t0 = 0, placeAt = -1, veil = null, busy = false, speed = 1;

  panel.querySelector('input').addEventListener('change', async event => {
    const f = event.target.files?.[0];
    doc = null;
    if (f) {
      try { doc = JSON.parse(await f.text()); } catch { doc = null; }
      if (doc?.schema !== 'soma-film-timeline/1' || !doc.frames?.length) doc = null;
    }
    status.textContent = doc ? `${doc.tour} · ${doc.score} · ${doc.viewer}: ${doc.places.length} places, ${doc.minutes} min, ${doc.transitions.length} jumps` : 'not a compiled film (soma-film-timeline/1)';
    panel.querySelector('[data-act="play"]').disabled = !doc;
  });
  panel.querySelector('[data-act="speed"]').addEventListener('change', event => {
    // keep the film's time where it is when the speed changes
    const now = performance.now();
    const time = ((now - t0) / 1000) * speed;
    speed = Number(event.target.value) || 1;
    t0 = now - (time / speed) * 1000;
  });

  function enter(k) {
    const prev = placeAt;
    placeAt = k;
    const place = doc.places[k];
    const jump = doc.transitions.find(x => x.to === k) ?? null;
    dispatchEvent(new CustomEvent('soma-transition', { detail: { index: k, view: place.view, via: null, kind: jump?.kind ?? null, seconds: jump?.seconds ?? null, sync: jump?.sync ?? null, style: place.style ?? null, film: true } }));
    const show = () => { location.hash = place.view; };
    if (prev >= 0 && jump?.declared && (jump.kind === 'fade' || jump.kind === 'wormhole')) {
      busy = true;
      veil ??= createVeil();
      veil.run(`${jump.kind} ${jump.seconds}s on ${jump.sync}`, show).finally(() => { busy = false; });
    } else show();
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const time = ((now - t0) / 1000) * speed;
    const n = Math.min(doc.frames.length - 1, Math.max(0, Math.floor(time * doc.fps)));
    const f = doc.frames[n];
    if (f.place !== placeAt && !busy) enter(f.place);
    explorer.setFilm?.(f.compiled, f.t);
    dispatchEvent(new CustomEvent('soma-film-frame', { detail: { time: f.time, t: f.t, place: f.place, compiled: f.compiled, band: f.band } }));
    if (time >= doc.minutes * 60) stop();
  }

  function start() {
    if (!doc) return;
    panel.hidden = true;
    document.body.classList.add('film-mode');
    placeAt = -1;
    busy = false;
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
    explorer.setFilm?.(null);
    document.body.classList.remove('film-mode');
  }
  panel.addEventListener('click', event => {
    const act = event.target.closest('button')?.dataset.act;
    if (act === 'play') start();
    if (act === 'close') panel.hidden = true;
  });
  addEventListener('keydown', event => { if (event.key === 'Escape' && document.body.classList.contains('film-mode')) stop(); });
  addEventListener('soma-film', () => { panel.hidden = false; });
  return { open() { panel.hidden = false; }, stop, get playing() { return Boolean(raf); } };
}
