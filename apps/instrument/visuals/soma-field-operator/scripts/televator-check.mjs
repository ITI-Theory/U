#!/usr/bin/env node
// televator-check.mjs: the [T]-Elevator (televator.js, ISS-121) in a real browser, every move from the brain:
//   1. the levels view at the brain's floor: the device is there, FORWARD offers THE GREAT HALL and THE MIND
//      CHAMBER (brain to mind at the same scale);
//   2. FORWARD into THE MIND CHAMBER: the explorer opens at the mind, the device stays visible above it;
//   3. in the Great Hall, FORWARD offers its doorways; THE LIMBIC GATE leads to the mind;
//   4. WORM at the molecular floor lists the limbic system with Sherlock's scores; the jump arrives there;
//   5. WORM at the atomic floor ranks the orbital system first (the most structure beyond the template);
//   6. UP and DOWN change the floor by one; TIME to an era moves to the era's level;
// every move tells the sound (soma-transition). Screenshots of the panel to bld/televator/ for review and
// the books. Usage: npm run check:televator. Exit 1 on any failure or page error.

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.resolve(appDir, '../../../../bld/televator');
await mkdir(out, { recursive: true });
const fails = [];
const ok = (cond, what) => { console.log(`${cond ? 'ok  ' : 'FAIL'} ${what}`); if (!cond) fails.push(what); };

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ channel: 'chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
await context.addInitScript(() => {
  sessionStorage.setItem('zusf-abstract-acknowledged', 'true');
  window.__transitions = [];
  addEventListener('soma-transition', e => window.__transitions.push(e.detail));
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

const hash = () => page.evaluate(() => new URLSearchParams(location.hash.slice(1)));
const param = async k => page.evaluate(key => new URLSearchParams(location.hash.slice(1)).get(key), k);
const view = () => page.locator('.televator__view').innerText();
const shot = name => page.locator('.televator').screenshot({ path: path.join(out, `${name}.png`) });
const goto = async h => { await page.goto(`${base}#${h}`, { waitUntil: 'domcontentloaded', timeout: 120000 }); await page.waitForSelector('.televator', { timeout: 60000 }); await page.waitForTimeout(2500); };
const press = async sel => { await page.locator(`.televator ${sel}`).first().click(); await page.waitForTimeout(400); };
// cycle FORWARD's tube until the entrance named `label` is shown
async function showEntrance(label) {
  for (let i = 0; i < 14; i++) {
    if ((await view()).includes(label)) return true;
    await press('[data-cycle="1"]');
  }
  return false;
}

try {
  // 1. the brain's floor, levels view
  await goto('level=whole-brain-cemi&lens=on&dim=4');
  ok(await page.locator('.televator').isVisible(), 'the [T]-Elevator is on screen in the levels view');
  await page.screenshot({ path: path.join(out, '0-levels-view.png') });
  ok((await page.locator('.televator__where').innerText()).toUpperCase().includes('BRAIN'), 'it says where you are: the brain\'s floor');
  await press('[data-move="forward"]');
  ok((await view()).includes('THE GREAT HALL'), 'FORWARD at the brain offers THE GREAT HALL first');
  await shot('1-forward-brain');
  ok(await showEntrance('THE MIND CHAMBER'), 'FORWARD at the brain offers THE MIND CHAMBER (brain to mind, the same scale)');
  // 2. into the mind
  await press('[data-go="forward"]');
  await page.waitForTimeout(2500);
  ok(await param('voyage') === 'thought' && await param('hall') === '1', 'GO enters the mind chamber (voyage=thought, hall=1)');
  ok(await page.evaluate(() => document.body.classList.contains('explorer-open')), 'the explorer is open');
  ok(await page.locator('.televator').isVisible(), 'the device stays visible above the explorer');
  await shot('2-in-the-mind');
  await page.screenshot({ path: path.join(out, '2-in-the-mind-full.png') });
  // 3. the Great Hall's doorways: THE LIMBIC GATE
  await goto('level=whole-brain-cemi&lens=on&dim=4&voyage=brain&hall=1');
  await press('[data-move="forward"]');
  ok((await view()).includes('THE CATHEDRAL'), 'FORWARD in the Great Hall starts at its first doorway, THE CATHEDRAL');
  ok(await showEntrance('THE LIMBIC GATE'), 'the Great Hall offers THE LIMBIC GATE');
  await shot('3-limbic-gate');
  await press('[data-go="forward"]');
  await page.waitForTimeout(2500);
  ok(await param('voyage') === 'thought', 'THE LIMBIC GATE leads to the mind (voyage=thought)');
  // 4. WORM at the molecular floor
  await goto('level=molecular&lens=on&dim=4');
  await press('[data-move="worm"]');
  const molecular = await view();
  ok(molecular.includes('THE LIMBIC SYSTEM') && molecular.includes('0.14') && molecular.includes('0.17'), 'WORM at the molecular floor lists the limbic system with Sherlock\'s scores (0.14, 0.17)');
  ok(molecular.includes('identical in structure to the limbic'), 'the claim is quoted (P11, line 493)');
  await shot('4-worm-molecular');
  await page.locator('.televator [data-worm]', { hasText: 'THE LIMBIC SYSTEM' }).click();
  await page.waitForTimeout(4500);
  ok(await param('voyage') === 'limbic', 'the wormhole arrives at the limbic system');
  // 5. WORM at the atomic floor: the orbital system first
  await goto('level=atomic&lens=on&dim=4');
  await press('[data-move="worm"]');
  const first = await page.locator('.televator [data-worm]').first().innerText();
  ok(first.includes('ORBITAL'), `WORM at the atomic floor ranks the orbital system first (${first.trim()})`);
  await shot('5-worm-atomic');
  // 6. UP, DOWN, TIME
  const before = await page.evaluate(() => document.querySelector('.televator__where').textContent);
  await press('[data-move="up"]');
  await page.waitForTimeout(1500);
  const after = await page.evaluate(() => document.querySelector('.televator__where').textContent);
  ok(before !== after, `UP changes the floor (${before.trim()} -> ${after.trim()})`);
  await press('[data-move="down"]');
  await page.waitForTimeout(1500);
  ok(await page.evaluate(() => document.querySelector('.televator__where').textContent) === before, 'DOWN comes back to the same floor');
  const era = await page.evaluate(() => {
    const s = document.querySelector('.televator__time input');
    s.value = String(Math.floor(Number(s.max) * 0.6));
    s.dispatchEvent(new Event('input')); s.dispatchEvent(new Event('change'));
    return document.querySelector('.televator__time output').textContent;
  });
  await page.waitForTimeout(2500);
  ok(Boolean(await param('era')), `TIME moves to an era (${era})`);
  await shot('6-time');
  const kinds = await page.evaluate(() => window.__transitions.filter(t => t.from === 'televator').map(t => t.move));
  ok(['forward', 'worm', 'up', 'down', 'time'].every(k => kinds.includes(k)), `every move told the sound (${[...new Set(kinds)].join(', ')})`);
  ok(errors.length === 0, `no page errors${errors.length ? `: ${errors.slice(0, 3).join(' | ')}` : ''}`);
} catch (e) {
  ok(false, `the check ran to the end (${e.message.split('\n')[0]})`);
} finally {
  await browser.close();
  await server.close();
}
console.log(fails.length ? `\n${fails.length} failed` : `\nall passed; panels in ${path.relative(process.cwd(), out)}`);
process.exit(fails.length ? 1 : 0);
