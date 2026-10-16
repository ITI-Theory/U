// show.js: SHOW mode, the music film (ISS-107 A2, A3). ROOTED only (140 BPM psytrance is
// ROOTED's: DESIGN.md, HAL 15 Oct); MOTHER's /show opens it. The author picks a mix from his own
// disk and its cue sheet (`make show-cues MIX=...`, lib/show/cues.py); nothing is uploaded or
// kept. The audio's clock drives the machine: the scene changes on phrase boundaries, the field
// (Φ) pulses on every beat over a base set by the section (low in a breakdown, rising through a
// build, full at a drop), a strong POKE on each drop. The picture is clean: no chrome, no labels.
// REC records the tab, picture and sound, to a webm file (the browser's screen capture: you pick
// this tab), so scene changes are no problem. Esc ends it. Interpretive: a show, not a reading.

import { rooted } from './who.js';

// the scenes, cycled on phrase boundaries (hash views the explorer already knows)
const SCENES = [
  'voyage=brain&hall=1&dim=11&ui=clean&labels=off',          // the great hall
  'voyage=brain&cave=1&dim=11&ui=clean&labels=off',          // the cathedral
  'voyage=thought&hall=1&dim=11&ui=clean&labels=off',        // the mind chamber
  'voyage=thought&choices=1&dim=11&ui=clean&labels=off',     // the sea (THE COURSE)
  'voyage=brain&palace=1&dim=11&ui=clean&labels=off',        // the palace
  'voyage=flight&dim=11&ui=clean&labels=off',                // the fractal flight
  'voyage=worlds&dim=11&ui=clean&labels=off',                // THE WORLDS
];
const PHRASES_PER_SCENE = 2;

export function createShow({ explorer }) {
  const panel = document.createElement('section');
  panel.className = 'show-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <h2>SHOW · THE MUSIC FILM</h2>
    <p>Pick a mix (WAV or MP3) from your disk and its cue sheet (<code>make show-cues MIX=…</code> writes bld/show/cues.json). Nothing leaves this machine.</p>
    <input type="file" accept="audio/*,.json,application/json" multiple />
    <p class="show-panel__status">waiting for the two files</p>
    <div class="show-panel__go"><button type="button" data-act="play" disabled>▶ PLAY</button><button type="button" data-act="rec" disabled>● REC + PLAY</button><button type="button" data-act="close">CLOSE</button></div>
    <small>Esc ends the show. REC asks to share a tab: pick this one, with its audio.</small>`;
  document.body.append(panel);
  const audio = new Audio();
  audio.preload = 'auto';
  const status = panel.querySelector('.show-panel__status');
  let cues = null, audioUrl = null, raf = 0, sceneAt = -1, dropDone = new Set(), recorder = null, chunks = [], prevT = 0, dropsSoFar = 0;

  panel.querySelector('input').addEventListener('change', async event => {
    for (const f of event.target.files) {
      if (/\.json$/i.test(f.name) || f.type === 'application/json') {
        try { cues = JSON.parse(await f.text()); } catch { cues = null; }
      } else {
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        audioUrl = URL.createObjectURL(f);
        audio.src = audioUrl;
      }
    }
    const ok = Boolean(cues?.bar_times?.length && audioUrl);
    status.textContent = ok ? `${cues.source}: ${(cues.duration / 60).toFixed(1)} min, ${cues.bpm} BPM, ${cues.phrases.length} phrases, ${cues.drops.length} drops` : `still needed: ${cues ? '' : 'the cue sheet '}${audioUrl ? '' : 'the mix'}`;
    for (const b of panel.querySelectorAll('[data-act="play"], [data-act="rec"]')) b.disabled = !ok;
  });

  const sectionAt = t => cues.sections.find(s => t >= s.start && t < s.end) ?? null;
  const buildAt = t => cues.builds.find(b => t >= b.start && t < b.end) ?? null;
  function phrase(t) {
    let k = -1;
    for (let i = 0; i < cues.phrases.length && cues.phrases[i] <= t; i++) k = i;
    return k;
  }
  function beatPhase(t) {
    const bars = cues.bar_times;
    let lo = 0, hi = bars.length - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (bars[mid] <= t) lo = mid; else hi = mid; }
    const len = (bars[lo + 1] ?? bars[lo] + cues.bar_seconds) - bars[lo];
    const inBar = Math.max(0, (t - bars[lo]) / len) * 4;
    return inBar - Math.floor(inBar);
  }
  function frame() {
    raf = requestAnimationFrame(frame);
    const t = audio.currentTime;
    // the scene: every PHRASES_PER_SCENE phrases, and at once on a drop
    const p = phrase(t);
    // a drop is crossed between two frames (however slow the frames are)
    const drop = cues.drops.find(d => prevT < d.t && t >= d.t && !dropDone.has(d.bar));
    prevT = t;
    if (drop) dropsSoFar += 1;
    const want = Math.max(0, Math.floor(Math.max(0, p) / PHRASES_PER_SCENE)) + dropsSoFar;
    if (want !== sceneAt) {
      sceneAt = want;
      location.hash = SCENES[((sceneAt % SCENES.length) + SCENES.length) % SCENES.length];
      explorer.setLabels?.(false);
    }
    if (drop) { dropDone.add(drop.bar); explorer.poke?.(1); }
    // the field: a base by section, a pulse on every beat (a kick: fast attack, quick decay)
    const sec = sectionAt(t), build = buildAt(t);
    let base = sec?.kind === 'breakdown' ? 0.28 : 0.58;
    if (build) base = 0.3 + 0.62 * Math.min(1, (t - build.start) / Math.max(1, build.end - build.start));
    const sinceDrop = Math.min(...cues.drops.map(d => (t >= d.t ? t - d.t : Infinity)));
    if (sinceDrop < 4) base = Math.max(base, 1 - sinceDrop * 0.1);
    const kick = sec?.kind === 'breakdown' ? 0 : Math.exp(-beatPhase(t) * 7) * 0.22;
    explorer.setPhi?.(Math.min(1, base + kick));
    if (audio.ended) stop();
  }
  async function start(rec) {
    if (!cues || !audioUrl) return;
    if (rec) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true, preferCurrentTab: true, selfBrowserSurface: 'include' });
        chunks = [];
        recorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : 'video/webm' });
        recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
        recorder.onstop = () => {
          stream.getTracks().forEach(tr => tr.stop());
          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
          a.download = `soma-show-${(cues.source || 'mix').replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '-')}.webm`;
          a.click();
        };
        recorder.start(1000);
      } catch { status.textContent = 'recording not allowed: playing without it'; recorder = null; }
    }
    panel.hidden = true;
    document.body.classList.add('show-mode');
    sceneAt = -1;
    prevT = 0;
    dropsSoFar = 0;
    dropDone = new Set();
    audio.currentTime = 0;
    await audio.play();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(raf);
    audio.pause();
    document.body.classList.remove('show-mode');
    explorer.setLabels?.(true);
    if (/ui=clean|labels=off/.test(location.hash)) location.hash = location.hash.replace(/&?(ui=clean|labels=off)/g, '');
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    recorder = null;
  }
  panel.addEventListener('click', event => {
    const act = event.target.closest('button')?.dataset.act;
    if (act === 'play') start(false);
    if (act === 'rec') start(true);
    if (act === 'close') panel.hidden = true;
  });
  addEventListener('keydown', event => { if (event.key === 'Escape' && document.body.classList.contains('show-mode')) stop(); });
  addEventListener('soma-show', () => { if (rooted()) panel.hidden = false; });
  return { open() { if (rooted()) panel.hidden = false; }, stop };
}
