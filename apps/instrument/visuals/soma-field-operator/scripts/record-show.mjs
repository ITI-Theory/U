// record-show.mjs: the music film recorded to a file (ISS-107 A3), on this machine's GPU.
//
//   node scripts/record-show.mjs --mix <mix.wav|mp3> --cues <cues.json> [--out bld/show] [--seconds N] [--mute]
//
// Opens the app in a real browser window (the GPU renders it in real time; headless is too slow),
// as ROOTED, loads the mix and its cue sheet into SHOW, presses REC + PLAY and accepts the tab
// capture itself (Chromium's --auto-accept-this-tab-capture), so nobody has to pick the tab. The
// show runs in real time: a 90-minute mix takes 90 minutes. --seconds N ends it early (a test).
// Then ffmpeg makes an mp4 beside the webm. The mix is the author's: the film stays in bld/, out of
// the repository and Dist. --mute keeps the speakers quiet (the recording may then be silent:
// check it).
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const U = resolve(appDir, '../../../..');
const args = { out: join(U, 'bld', 'show'), seconds: 0, mute: false };
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (a === '--mute') args.mute = true;
  else if (a.startsWith('--')) args[a.slice(2)] = process.argv[++i];
}
if (!args.mix || !args.cues) {
  console.error('usage: node scripts/record-show.mjs --mix <mix> --cues <cues.json> [--out DIR] [--seconds N] [--mute]');
  process.exit(2);
}
const mix = resolve(args.mix), cues = resolve(args.cues), out = resolve(args.out);
mkdirSync(out, { recursive: true });

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({
  headless: false,
  args: ['--auto-accept-this-tab-capture', '--autoplay-policy=no-user-gesture-required',
    '--window-size=1936,1176', '--hide-scrollbars', ...(args.mute ? ['--mute-audio'] : [])],
});
let code = 0;
try {
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, acceptDownloads: true });
  await context.addInitScript(() => localStorage.setItem('soma-rooted', '1'));
  const page = await context.newPage();
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForFunction(() => document.querySelector('.show-panel'), null, { timeout: 120000 });
  await page.evaluate(() => dispatchEvent(new CustomEvent('soma-show')));
  await page.setInputFiles('.show-panel input[type=file]', [mix, cues]);
  await page.waitForSelector('.show-panel [data-act="rec"]:not([disabled])', { timeout: 60000 });
  const status = await page.textContent('.show-panel__status');
  console.log(`show: ${status}`);
  const duration = JSON.parse(await (await import('node:fs/promises')).readFile(cues, 'utf8')).duration;
  const runFor = args.seconds ? Number(args.seconds) : duration;
  const download = page.waitForEvent('download', { timeout: (runFor + 300) * 1000 });
  await page.click('.show-panel [data-act="rec"]');
  const recording = await page.evaluate(() => new Promise(r => setTimeout(() => r(!document.querySelector('.show-panel__status')?.textContent.includes('not allowed')), 3000)));
  if (!recording) throw new Error('the tab capture was refused: nothing is being recorded');
  console.log(`recording ${runFor.toFixed(0)} s in real time...`);
  if (args.seconds) {
    await page.waitForTimeout(runFor * 1000);
    await page.keyboard.press('Escape');
  }
  const d = await download;
  const webm = join(out, d.suggestedFilename());
  await d.saveAs(webm);
  console.log(`wrote ${webm} (${(statSync(webm).size / 1e6).toFixed(1)} MB)`);
  const mp4 = webm.replace(/\.webm$/, '.mp4');
  // FFMPEG=<path> if this shell's PATH predates the install (winget install Gyan.FFmpeg)
  const ff = spawnSync(process.env.FFMPEG || 'ffmpeg', ['-y', '-loglevel', 'error', '-i', webm, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18',
    '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '256k', '-movflags', '+faststart', mp4], { stdio: 'inherit' });
  if (ff.status === 0) console.log(`wrote ${mp4} (${(statSync(mp4).size / 1e6).toFixed(1)} MB)`);
  else console.error(`ffmpeg failed (${ff.error?.code ?? ff.status}); the webm is kept: ${basename(webm)}`);
} catch (e) {
  console.error(e.message);
  code = 1;
} finally {
  await browser.close();
  await server.close();
}
process.exit(code);
