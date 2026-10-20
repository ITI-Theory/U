#!/usr/bin/env node
// console-check.mjs: the console (console.js, ISS-120) in a real browser, against the bridge's /music/console
// (MOTHER's request handler alone, on a spare port: no NotebookLM, the running bridge untouched):
//   1. OPEN THE CONSOLE in the Music Room opens it on the CHANNEL view: the eight sections in order; a standard
//      track (Violins I, the SSL desk): Serum 2 the source, in FEEL with the eight feelings and their CCs, the
//      Snap Heaps and Modular FX off, the desk's strip across EQ, DYNAMICS and OUT with its NKS controls (when
//      the private index is there), the sends in SPACE;
//   2. the Atmosphere's Pad: Phase Plant the source (the standard's by_group);
//   3. the desks: UAD's strip; Live's own (Channel EQ in EQ, Compressor in DYNAMICS);
//   4. two Twisters of 16; bank 2's knobs name their targets (the SSL strip's NKS names with the index); a knob
//      turned (CC 16, channel 1) lights with its value, a push (channel 2) lights its dot, a bank-1 knob too;
//   5. the DESK view: every group, the returns and the master as strips (the group's state, glue and colour);
//   6. without the bridge, the console says so and still shows the standard's chain.
// Screenshots to bld/console/. Usage: npm run check:console. Exit 1 on any failure or page error.

import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const motherDir = path.resolve(appDir, '../../mother');
const out = path.resolve(appDir, '../../../../bld/console');
await mkdir(out, { recursive: true });
const fails = [];
const ok = (cond, what) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${what}`); if (!cond) fails.push(what); };
const PORT = 8798;
const py = [path.join(motherDir, '.venv', 'Scripts', 'python.exe'), path.join(motherDir, '.venv', 'bin', 'python')].find(existsSync) ?? 'python';
const handler = spawn(py, ['-c', `import bridge\nfrom http.server import ThreadingHTTPServer\nThreadingHTTPServer(("127.0.0.1", ${PORT}), bridge.Handler).serve_forever()`], { cwd: motherDir, stdio: 'ignore' });
const wait = ms => new Promise(r => setTimeout(r, ms));
// importing the bridge takes about 25 s on this machine (20 Oct): wait up to 90
for (let i = 0; i < 180; i++) { try { await fetch(`http://127.0.0.1:${PORT}/music/console`); break; } catch { await wait(500); } }
const index = await (await fetch(`http://127.0.0.1:${PORT}/music/console`)).json().catch(() => ({}));
const havePlugins = Object.keys(index.plugins ?? {}).length > 0;

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ channel: 'chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
async function pageWith(bridgeUrl) {
  const context = await browser.newContext({ viewport: { width: 1800, height: 1100 } });
  await context.addInitScript(url => {
    sessionStorage.setItem('zusf-abstract-acknowledged', 'true');
    localStorage.setItem('mother-bridge-url', url);
    // a fake Twister: one MIDI input the check can play
    const input = new EventTarget();
    input.name = 'Midi Fighter Twister (fake)';
    window.__twister = (...bytes) => { const e = new Event('midimessage'); Object.defineProperty(e, 'data', { value: new Uint8Array(bytes) }); input.dispatchEvent(e); };
    const access = Object.assign(new EventTarget(), { inputs: new Map([['t', input]]), outputs: new Map() });
    Object.defineProperty(navigator, 'requestMIDIAccess', { value: async () => access, configurable: true });
  }, bridgeUrl);
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}#level=whole-brain-cemi&lens=on&dim=4&voyage=brain&hall=1`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForSelector('.explorer__guide', { timeout: 60000 });
  await page.waitForTimeout(2500);
  return page;
}
const text = (page, sel) => page.locator(sel).innerText();
const col = (page, s) => text(page, `.console__section[data-section="${s}"]`);
async function pick(page, sel, value) { await page.locator(`.console ${sel}`).selectOption(value); await page.waitForTimeout(250); }

try {
  const page = await pageWith(`http://127.0.0.1:${PORT}`);
  // 1. the channel view
  await page.locator('.explorer__guide', { hasText: 'MUSIC ROOM' }).click();
  await page.waitForSelector('.room--music:not([hidden]) .room__output', { timeout: 20000 });
  await page.locator('.room--music button', { hasText: 'OPEN THE CONSOLE' }).click();
  await page.waitForSelector('.console:not([hidden]) .console__section', { timeout: 20000 });
  ok(await page.locator('.room--music').isHidden(), 'OPEN THE CONSOLE closes the Music Room and opens the console');
  const heads = await page.locator('.console__section h3').allInnerTexts();
  ok(heads.join('|') === 'SOURCE|FEEL|WRONG|EQ AND FILTER|DYNAMICS|DRIVE|SPACE|OUT', `the eight sections in order: ${heads.join(', ')}`);
  ok((await text(page, '.console__status')).includes('Violins I') && (await text(page, '.console__status')).includes('SSL desk'), 'it opens on a standard track (Violins I) with the SSL desk');
  ok((await col(page, 'source')).includes('Serum 2'), 'SOURCE: Serum 2');
  const feel = await col(page, 'feel');
  ok(['Serum 2', 'Snap Heap', 'safety', 'fear', 'CC 20', 'CC 29', 'Macro 8'].every(w => feel.includes(w)), 'FEEL: the feelings as the app sends them (CC 20-26, 29 into Macros 1-8), the source and the state');
  const wrong = await col(page, 'wrong');
  ok(wrong.includes('Snap Heap') && wrong.includes('Softube Modular FX') && wrong.includes('off'), 'WRONG: the wrong slot and Modular FX, off by default');
  const eq = await col(page, 'eq'), dyn = await col(page, 'dynamics'), outC = await col(page, 'out');
  ok(eq.includes('SSL Native Channel Strip 2') && dyn.includes('SSL Native Channel Strip 2') && outC.includes('SSL Native Channel Strip 2'), 'the desk\'s strip across EQ, DYNAMICS and OUT');
  if (havePlugins) ok(eq.includes('Low Gain') && dyn.includes('Threshold') && outC.includes('Fader'), 'its NKS controls: Low Gain in EQ, Threshold in DYNAMICS, Fader in OUT');
  else console.log('skip the NKS controls (no private index: make console-index)');
  ok((await col(page, 'space')).includes('send to Space') && (await col(page, 'space')).includes('send to Designed space'), 'SPACE: the two sends');
  await page.locator('.console').screenshot({ path: path.join(out, 'console-1-channel-ssl.png') });
  // 2. the Atmosphere
  await pick(page, '[data-track]', 'Pad');
  const sources = await page.locator('.console__section[data-section="source"] .console__device b').allInnerTexts();
  ok(sources.join() === 'Phase Plant', `the Atmosphere's Pad: Phase Plant the source (${sources.join(', ')})`);
  ok((await col(page, 'feel')).includes('Phase Plant') && (await col(page, 'feel')).includes('its macros 1-8: the feelings') && !(await col(page, 'feel')).includes('Timbre'),
    'FEEL: Phase Plant\'s macros are the feelings (not one preset\'s labels)');
  // 3. the desks
  await pick(page, '[data-track]', 'Violins I');
  await pick(page, '[data-desk]', 'uad');
  ok((await col(page, 'eq')).includes('API Vision Channel Strip') && !(await col(page, 'eq')).includes('SSL'), 'the UAD desk: its strip, no SSL');
  await pick(page, '[data-desk]', 'live');
  ok((await col(page, 'eq')).includes('Channel EQ') && (await col(page, 'dynamics')).includes('Compressor'), 'the Live desk: Channel EQ in EQ, Compressor in DYNAMICS');
  await page.locator('.console').screenshot({ path: path.join(out, 'console-2-channel-live.png') });
  await pick(page, '[data-desk]', 'ssl');
  // 4. the Twisters
  ok(await page.locator('.twister__knob[data-bank="1"]').count() === 16 && await page.locator('.twister__knob[data-bank="2"]').count() === 16, 'two Twisters of 16 knobs');
  const k16 = await page.locator('.twister__knob[data-bank="2"][data-cc="16"]').getAttribute('title');
  ok(havePlugins ? k16.includes('LF Low Gain') : k16.includes('low'), `bank 2's first knob: ${k16}`);
  await page.locator('.console [data-act="listen"]').click();
  await page.waitForTimeout(300);
  ok((await text(page, '.console [data-act="listen"]')).startsWith('LISTENING'), 'LISTEN: the Twister heard');
  await page.evaluate(() => window.__twister(0xb0, 16, 127));
  await page.waitForTimeout(100);
  const ring = await page.locator('.twister__knob[data-bank="2"][data-cc="16"] .twister__ring').evaluate(e => e.style.getPropertyValue('--v'));
  ok(await page.locator('.twister__knob[data-bank="2"][data-cc="16"]').evaluate(e => e.classList.contains('is-touched')) && ring === '1', 'a turned knob (CC 16) lights, its ring full');
  ok(await page.locator('.console__section[data-section="eq"]').evaluate(e => e.classList.contains('is-touched')), 'and its section (EQ) lights');
  await page.evaluate(() => window.__twister(0xb1, 31, 127));
  ok(await page.locator('.twister__knob[data-bank="2"][data-cc="31"]').evaluate(e => e.classList.contains('is-pushed')), 'a push (channel 2) lights its dot');
  await page.evaluate(() => window.__twister(0xb0, 1, 64));
  ok(await page.locator('.twister__knob[data-bank="1"][data-cc="1"]').evaluate(e => e.classList.contains('is-touched')), 'bank 1: the app\'s Fear knob lights');
  // the M32 and the F1
  const m32 = () => page.locator('.m32__display').innerText();
  ok((await text(page, '.m32 h4')).includes('EQ AND FILTER') && (havePlugins ? (await m32()).includes('Low Gain') : true), 'the M32: EQ in focus, its NKS names (Low Gain)');
  await page.locator('.console__section[data-section="dynamics"] h3').click();
  await page.waitForTimeout(250);
  ok((await text(page, '.m32 h4')).includes('DYNAMICS') && (havePlugins ? (await m32()).includes('Threshold') : true), 'a section clicked comes to the M32 (DYNAMICS: Threshold)');
  ok(await page.locator('.console__section.is-focus').getAttribute('data-section') === 'dynamics', 'the section in focus is marked');
  ok(await page.locator('.f1__pad').count() === 16 && await page.locator('.f1__fader').count() === 4 && (await text(page, '.f1')).includes('texture'), 'the F1: the deck, 16 pads and 4 faders (lead to texture)');
  await page.locator('.console').screenshot({ path: path.join(out, 'console-3-twisters.png') });
  // 5. the desk view
  await page.locator('.console [data-view="desk"]').click();
  await page.waitForTimeout(300);
  const strips = await page.locator('.console__strip h3').allInnerTexts();
  ok(strips.length === 12 && strips[0] === 'Violins A' && strips.includes('Space') && strips.at(-1) === 'MASTER', `the desk: ${strips.length} strips (${strips.join(', ')})`);
  const va = await text(page, '.console__strip >> nth=0');
  ok(va.includes('Snap Heap') && va.includes('SSL Native Bus Compressor 2') && va.includes('SSL Native X-Saturator'), 'a group: its state, the desk\'s glue and colour');
  ok((await text(page, '.console__strip >> nth=-1')).includes('Ozone 9'), 'the master: Ozone 9');
  await page.locator('.console').screenshot({ path: path.join(out, 'console-4-desk.png') });
  await page.keyboard.press('Escape');
  ok(await page.locator('.console').isHidden(), 'Esc closes the console');
  // 6. without the bridge
  const lone = await pageWith('http://127.0.0.1:1');
  await lone.evaluate(() => dispatchEvent(new CustomEvent('soma-console')));
  await lone.waitForSelector('.console:not([hidden]) .console__section', { timeout: 20000 });
  ok((await text(lone, '.console__status')).includes('bridge is not running') && (await text(lone, '.console__section[data-section="eq"]')).includes('SSL Native Channel Strip 2'),
    'without the bridge: it says so, and still shows the standard\'s chain');
} catch (e) {
  fails.push(String(e));
  console.log('FAIL', e);
} finally {
  await browser.close();
  await server.close();
  handler.kill();
}
for (const e of errors) { console.log('page error:', e); fails.push(e); }
console.log(fails.length ? `\n${fails.length} failure(s)` : '\nconsole check: PASS');
process.exit(fails.length ? 1 : 0);
