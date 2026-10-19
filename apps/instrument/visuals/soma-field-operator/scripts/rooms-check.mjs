#!/usr/bin/env node
// rooms-check.mjs: the Music Room and the Cinema (rooms.js, ISS-122) in a real browser, against the bridge's
// room routes (MOTHER's request handler alone, on a spare port: no NotebookLM, the running bridge untouched):
//   1. the Music Room opens from the explorer's top bar: its four outputs (the printed suite's pages and costs
//      when Me/music has one), the score's movements by part, the versions, the studio standard;
//      OPEN THE DECK opens the deck;
//   2. the Cinema: the compiled films, PLAY hands one to FILM and the film runs; Esc ends it;
//   3. the bridge serves a room's file only from inside its folder, with byte ranges (206), and nothing
//      outside it (404);
//   4. without the bridge, a room says the private side is the author's and still shows the public side.
// Screenshots to bld/rooms/. Usage: npm run check:rooms. Exit 1 on any failure or page error.

import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const motherDir = path.resolve(appDir, '../../mother');
const out = path.resolve(appDir, '../../../../bld/rooms');
await mkdir(out, { recursive: true });
const fails = [];
const ok = (cond, what) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${what}`); if (!cond) fails.push(what); };
const PORT = 8799;
const py = [path.join(motherDir, '.venv', 'Scripts', 'python.exe'), path.join(motherDir, '.venv', 'bin', 'python')].find(existsSync) ?? 'python';
const handler = spawn(py, ['-c', `import bridge\nfrom http.server import ThreadingHTTPServer\nThreadingHTTPServer(("127.0.0.1", ${PORT}), bridge.Handler).serve_forever()`], { cwd: motherDir, stdio: 'ignore' });
const wait = ms => new Promise(r => setTimeout(r, ms));
for (let i = 0; i < 40; i++) { try { await fetch(`http://127.0.0.1:${PORT}/cinema/room`); break; } catch { await wait(500); } }

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ channel: 'chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
async function pageWith(bridgeUrl) {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  await context.addInitScript(url => { sessionStorage.setItem('zusf-abstract-acknowledged', 'true'); localStorage.setItem('mother-bridge-url', url); }, bridgeUrl);
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(`${base}#level=whole-brain-cemi&lens=on&dim=4&voyage=brain&hall=1`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForSelector('.explorer__guide', { timeout: 60000 });
  await page.waitForTimeout(2500);
  return page;
}
const text = (page, sel) => page.locator(sel).innerText();
const section = async (page, room, name) => { await page.locator(`.room--${room} .gallery__rooms button`, { hasText: name }).click(); await page.waitForTimeout(300); return text(page, `.room--${room} .gallery__room`); };

try {
  const page = await pageWith(`http://127.0.0.1:${PORT}`);
  // 1. the Music Room
  await page.locator('.explorer__guide', { hasText: 'MUSIC ROOM' }).click();
  await page.waitForSelector('.room--music:not([hidden]) .room__output', { timeout: 20000 });
  const outs = await text(page, '.room--music .gallery__room');
  ok(['THE PRINTED SCORE', 'THE STEMS', 'THE MASTER', 'THE LIVE SET'].every(o => outs.includes(o)), 'the Music Room shows its four outputs');
  const room = await (await fetch(`http://127.0.0.1:${PORT}/music/room`)).json();
  if (room.print) ok(outs.includes(`${room.print.conductor_pages} A3 pages`), `the printed score: ${room.print.conductor_pages} A3 pages, about ${room.print.conductor_cost} ${room.print.currency}`);
  ok(outs.includes('Live is the instrument behind this room'), 'it says the sound is Live\'s own');
  await page.locator('.room--music').screenshot({ path: path.join(out, 'music-1-outputs.png') });
  const score = await section(page, 'music', 'THE SCORE');
  if (room.suite) ok(score.includes(room.suite.movements[0].title) && score.includes(room.suite.movements.at(-1).title), `the score: ${room.suite.movements.length} movements, first to last`);
  await page.locator('.room--music').screenshot({ path: path.join(out, 'music-2-score.png') });
  const versions = await section(page, 'music', 'THE VERSIONS');
  ok(versions.includes('Neutral'), 'the versions list the viewers');
  const standard = await section(page, 'music', 'THE STANDARD');
  ok(['Serum 2', 'Phase Plant', 'SSL Native Channel Strip 2'].every(d => standard.includes(d)), 'the studio standard: Serum 2, Phase Plant, SSL Channel Strip 2');
  await page.locator('.room--music').screenshot({ path: path.join(out, 'music-3-standard.png') });
  await section(page, 'music', 'THE FOUR OUTPUTS');
  await page.locator('.room--music button', { hasText: 'OPEN THE DECK' }).click();
  await page.waitForTimeout(800);
  ok(await page.locator('.deck-panel').isVisible() && await page.locator('.room--music').isHidden(), 'OPEN THE DECK closes the room and opens the deck');
  await page.locator('.deck-panel [data-act="close"]').click();
  await page.waitForTimeout(300);
  // 2. the Cinema
  await page.locator('.explorer__guide', { hasText: 'CINEMA' }).click();
  await page.waitForSelector('.room--cinema:not([hidden]) .room__output', { timeout: 20000 });
  const cine = await (await fetch(`http://127.0.0.1:${PORT}/cinema/room`)).json();
  ok((await text(page, '.room--cinema .gallery__room')).includes('THE FILM'), 'the Cinema shows its four outputs');
  await page.locator('.room--cinema').screenshot({ path: path.join(out, 'cinema-1-outputs.png') });
  const films = await section(page, 'cinema', 'THE FILMS');
  ok(cine.films.every(f => films.includes(f.tour)), `the films: ${cine.films.length} compiled`);
  await page.locator('.room--cinema').screenshot({ path: path.join(out, 'cinema-2-films.png') });
  if (cine.films.length) {
    await page.locator('.room--cinema [data-film]').first().click();
    await page.waitForTimeout(4000);
    ok(await page.evaluate(() => document.body.classList.contains('film-mode')), 'PLAY hands the film to FILM and it runs');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    ok(!(await page.evaluate(() => document.body.classList.contains('film-mode'))), 'Esc ends the film');
  }
  // 3. the bridge's files: ranges inside the folder, nothing outside
  if (cine.films.length) {
    const r = await fetch(`http://127.0.0.1:${PORT}/cinema/film/${encodeURIComponent(cine.films[0].name)}`, { headers: { Range: 'bytes=0-99' } });
    ok(r.status === 206 && (await r.arrayBuffer()).byteLength === 100, 'a film is served in byte ranges (206, 100 bytes)');
  }
  const escape = await fetch(`http://127.0.0.1:${PORT}/cinema/film/..%2F..%2FISSUES.md`);
  ok(escape.status === 404, 'nothing outside a room\'s folder is served (404)');
  const foreign = await fetch(`http://127.0.0.1:${PORT}/music/room`, { headers: { Origin: 'https://example.com' } });
  ok(foreign.status === 403, 'a foreign origin is refused (403)');
  // 4. without the bridge
  const lone = await pageWith('http://127.0.0.1:9');
  await lone.locator('.explorer__guide', { hasText: 'MUSIC ROOM' }).click();
  await lone.waitForSelector('.room--music:not([hidden]) .room__output', { timeout: 20000 });
  const alone = await text(lone, '.room--music .gallery__room');
  ok(alone.includes('bridge is not running') && alone.includes('THE PRINTED SCORE'), 'without the bridge: the private side is the author\'s, the public side still shows');
  ok(errors.length === 0, `no page errors${errors.length ? `: ${errors.slice(0, 3).join(' | ')}` : ''}`);
} catch (e) {
  ok(false, `the check ran to the end (${e.message.split('\n')[0]})`);
} finally {
  await browser.close();
  await server.close();
  handler.kill();
}
console.log(fails.length ? `\n${fails.length} failed` : `\nall passed; rooms in ${path.relative(process.cwd(), out)}`);
process.exit(fails.length ? 1 : 0);
