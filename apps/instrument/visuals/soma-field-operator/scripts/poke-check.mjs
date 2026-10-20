#!/usr/bin/env node
// poke-check.mjs: a poke reaches every screen (ISS-120, screens.js). Three windows of one browser (the level, a
// cockpit, the engine room) share the screens' channel; a poke in the level window fires the same poke in the
// others, each fires it once (no echo back), and every window answers visibly (its edge flashes). A poke from a
// cockpit reaches the level window too. Usage: npm run check:poke. Exit 1 on any failure or page error.

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(appDir, '../../../../bld/poke');
await mkdir(out, { recursive: true });
const fails = [];
const ok = (cond, what) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${what}`); if (!cond) fails.push(what); };
const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ channel: 'chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1200, height: 800 } });
await context.addInitScript(() => { sessionStorage.setItem('zusf-abstract-acknowledged', 'true'); });
async function open(role) {
  const page = await context.newPage();
  page.on('pageerror', e => errors.push(`${role}: ${e}`));
  await page.goto(`${base}${role === 'level' ? '' : `?screen=${role}`}#level=whole-brain-cemi&dim=4`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForSelector('#poke', { state: 'attached', timeout: 60000 });
  await page.waitForTimeout(2500);
  return page;
}
const pokes = page => page.evaluate(() => Number(document.body.dataset.pokes ?? 0));
const flashed = page => page.evaluate(() => document.body.classList.contains('screen-poked'));

try {
  const level = await open('level');
  const cockpit = await open('cockpit');
  const engine = await open('engine');
  await level.evaluate(() => document.querySelector('#poke').click());
  await level.waitForTimeout(250);
  ok(await pokes(level) === 1 && await flashed(level), 'the level window pokes once and flashes');
  ok(await pokes(cockpit) === 1 && await flashed(cockpit), 'the cockpit fires the same poke and flashes');
  ok(await pokes(engine) === 1 && await flashed(engine), 'the engine room fires it and flashes');
  await cockpit.screenshot({ path: path.join(out, 'cockpit-poked.png') });
  await level.waitForTimeout(1200);
  ok(await pokes(level) === 1, 'no echo: the level window still counts one');
  ok(!(await flashed(level)), 'the flash passes');
  await cockpit.evaluate(() => document.querySelector('#poke').click());
  await level.waitForTimeout(250);
  ok(await pokes(level) === 2 && await pokes(engine) === 2 && await pokes(cockpit) === 2, 'a poke from the cockpit reaches the others, once each');
} catch (e) {
  fails.push(String(e));
  console.log('FAIL', e);
} finally {
  await browser.close();
  await server.close();
}
for (const e of errors) { console.log('page error:', e); fails.push(e); }
console.log(fails.length ? `\n${fails.length} failure(s)` : '\npoke check: PASS');
process.exit(fails.length ? 1 : 0);
