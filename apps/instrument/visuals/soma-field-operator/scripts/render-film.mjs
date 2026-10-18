// render-film.mjs: a compiled film rendered frame by frame (ISS-117): smooth, at any size, however
// slowly each frame draws. The page gets a virtual clock (performance.now, Date.now, timers,
// requestAnimationFrame and the running CSS/Web Animations), frozen once the film starts; each frame
// the clock moves exactly 1/fps, the page draws, the frame is saved; ffmpeg joins them.
//
//   node scripts/render-film.mjs --film <bld/film/x.timeline.json> [--from 0] [--to <s>] [--fps 30]
//        [--width 3840 --height 2160] [--audio <wav>] [--out <dir>] [--ui 1]
//
// The picture is clean (each place with ui=clean&labels=off&atlas=1, as the Atlas plates); --ui 1 keeps the panels.
// The browser is headless on the GPU (ANGLE on Direct3D 11). A new place loads its assets in real
// time while the virtual clock waits, so no frame shows a half-loaded view. Frames are JPEG (quality
// 95) in <out>/frames; the film is <out>/<name>.mp4 (H.264, CRF 16). FFMPEG=<path> if ffmpeg is not
// on PATH. A 90-minute film is 162,000 frames at 30 fps: render it in parts (--from/--to).
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const U = resolve(appDir, '../../../..');
const opt = { from: 0, fps: 30, width: 3840, height: 2160 };
for (let i = 2; i < process.argv.length; i++) if (process.argv[i].startsWith('--')) opt[process.argv[i].slice(2)] = process.argv[++i];
if (!opt.film) { console.error('usage: node scripts/render-film.mjs --film <timeline.json> [--from s] [--to s] [--fps 30] [--width 3840 --height 2160] [--audio wav] [--out dir]'); process.exit(2); }
const film = resolve(opt.film);
const doc = JSON.parse(readFileSync(film, 'utf8'));
const fps = Number(opt.fps), from = Number(opt.from), to = Math.min(Number(opt.to ?? doc.minutes * 60), doc.minutes * 60);
const W = Number(opt.width), H = Number(opt.height);
const name = basename(film).replace(/\.timeline\.json$/, '') + `-${from}-${to}s-${H}p`;
const out = resolve(opt.out ?? join(U, 'bld', 'film', 'render', name));
const framesDir = join(out, 'frames');
rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });

// the virtual clock: real until freeze(), then time moves only by step(ms)
const clock = () => {
  const real = { now: performance.now.bind(performance), dnow: Date.now.bind(Date), st: setTimeout.bind(window), ct: clearTimeout.bind(window), si: setInterval.bind(window), ci: clearInterval.bind(window), raf: requestAnimationFrame.bind(window), caf: cancelAnimationFrame.bind(window) };
  let frozen = false, vt = 0, base = 0, id = 1e6;
  const timers = new Map(), rafs = new Map();
  performance.now = () => (frozen ? vt : real.now());
  Date.now = () => (frozen ? base + vt : real.dnow());
  window.setTimeout = (fn, ms = 0, ...a) => { if (!frozen) return real.st(fn, ms, ...a); const k = id++; timers.set(k, { at: vt + Math.max(0, +ms || 0), fn, a }); return k; };
  window.clearTimeout = k => { timers.delete(k); real.ct(k); };
  window.setInterval = (fn, ms = 0, ...a) => { if (!frozen) return real.si(fn, ms, ...a); const k = id++; const every = Math.max(1, +ms || 0); timers.set(k, { at: vt + every, every, fn, a }); return k; };
  window.clearInterval = k => { timers.delete(k); real.ci(k); };
  window.requestAnimationFrame = fn => { if (!frozen) return real.raf(fn); const k = id++; rafs.set(k, fn); return k; };
  window.cancelAnimationFrame = k => { rafs.delete(k); real.caf(k); };
  const call = f => { try { f(); } catch (e) { console.error(e); } };
  let placeChanged = false;
  addEventListener('soma-transition', () => { placeChanged = true; });
  window.__vt = {
    freeze() { if (frozen) return; vt = real.now(); base = real.dnow() - vt; frozen = true; },
    step(ms) {
      const end = vt + ms;
      for (;;) {
        let next = null;
        for (const [k, t] of timers) if (t.at <= end && (!next || t.at < next[1].at)) next = [k, t];
        if (!next) break;
        const [k, t] = next;
        vt = Math.max(vt, t.at);
        if (t.every) t.at += t.every; else timers.delete(k);
        call(() => (typeof t.fn === 'function' ? t.fn(...t.a) : null));
      }
      vt = end;
      for (const a of document.getAnimations()) {
        if (!a.__vt) { a.pause(); a.__vt = true; }
        const endTime = a.effect?.getComputedTiming().endTime ?? 0;
        a.currentTime = Math.min(endTime, (a.currentTime ?? 0) + ms);
        if (a.currentTime >= endTime && Number.isFinite(endTime)) call(() => a.finish());
      }
      const cbs = [...rafs.values()];
      rafs.clear();
      for (const cb of cbs) call(() => cb(vt));
    },
    takePlaceChange() { const c = placeChanged; placeChanged = false; return c; },
  };
};

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
const ff = process.env.FFMPEG || 'ffmpeg';
let code = 0;
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.addInitScript(clock);
  await page.goto(`${base}#ui=clean&labels=off`, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForFunction(() => document.querySelector('.film-panel'), null, { timeout: 180000 });
  await page.evaluate(() => dispatchEvent(new CustomEvent('soma-film')));
  await page.setInputFiles('.film-panel input[type=file]', film);
  await page.waitForSelector('.film-panel [data-act="play"]:not([disabled])', { timeout: 120000 });
  await page.evaluate(() => window.__vt.freeze());
  await page.click('.film-panel [data-act="play"]');
  await page.evaluate(s => dispatchEvent(new CustomEvent('soma-film-seek', { detail: { seconds: s } })), from);
  console.log(`  start: ${await page.evaluate(() => `hash ${location.hash.slice(0, 60)}; film-mode ${document.body.classList.contains('film-mode')}; overlays ${[...document.querySelectorAll('[class*=intro],[class*=welcome],[class*=card]')].filter(e => e.offsetParent).map(e => e.className).slice(0, 4).join(' | ')}`)}`);
  const total = Math.round((to - from) * fps);
  const t0 = Date.now();
  console.log(`${name}: ${total} frames at ${W}x${H}, ${fps} fps (film ${from}-${to} s of ${doc.minutes * 60})`);
  for (let n = 0; n < total; n++) {
    await page.evaluate(ms => window.__vt.step(ms), 1000 / fps);
    // a new place loads in real time while the film's clock waits
    if (await page.evaluate(() => window.__vt.takePlaceChange())) {
      // a clean picture: no panels, no labels, the explorer's controls stripped as for the Atlas plates; --ui keeps them
      if (!opt.ui) await page.evaluate(() => { if (!/atlas=1/.test(location.hash)) location.hash += '&ui=clean&labels=off&atlas=1'; });
      console.log(`  frame ${n + 1}: ${await page.evaluate(() => location.hash.slice(1))}`);
      await page.waitForLoadState('networkidle').catch(() => {});
      await page.waitForTimeout(2500);
      await page.evaluate(() => window.__vt.step(0));
    }
    await page.screenshot({ path: join(framesDir, `${String(n).padStart(6, '0')}.jpg`), type: 'jpeg', quality: 95 });
    if (n % Math.max(1, fps * 5) === 0 || n === total - 1) {
      const per = (Date.now() - t0) / (n + 1) / 1000;
      console.log(`  frame ${n + 1}/${total}  ${per.toFixed(2)} s a frame, about ${Math.round(per * (total - n - 1) / 60)} min to go`);
    }
  }
  const mp4 = join(out, `${name}.mp4`);
  const audio = opt.audio ? ['-ss', String(from), '-t', String(to - from), '-i', resolve(opt.audio)] : [];
  const r = spawnSync(ff, ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', join(framesDir, '%06d.jpg'), ...audio,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', ...(opt.audio ? ['-c:a', 'aac', '-b:a', '256k', '-shortest'] : []),
    '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  if (r.status === 0) console.log(`wrote ${mp4}`);
  else { console.error(`ffmpeg failed (${r.error?.code ?? r.status}); the frames are in ${framesDir}`); code = 1; }
} catch (e) {
  console.error(e.message);
  code = 1;
} finally {
  await browser.close();
  await server.close();
}
process.exit(code);
