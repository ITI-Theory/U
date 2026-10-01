#!/usr/bin/env node
// Automated Field Atlas capture: plates (canvas only) per level x lens, and
// console screenshots (full UI) per path x level. Writes manifest.json and a
// contact sheet (index.html) for review.
//
//   npm run capture                       # full matrix
//   npm run capture -- --only plates      # plates | console | questions
//   npm run capture -- --levels quantum-foam,human-vertebrate --settle 3000
//   npm run capture -- --out <dir> --width 1920 --height 1080 --scale 2

import { createHash } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(appDir, '../../../..');

function parseArgs(argv) {
  const args = {
    out: path.join(repoRoot, 'Part2/book/field-atlas/figures/app'),
    only: 'all',
    levels: null,
    paths: null,
    settle: 2000,
    width: 1920,
    height: 1080,
    scale: 1,
    reader: 'general',
  };
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i].replace(/^--/, '');
    const value = argv[i + 1];
    if (!(key in args)) throw new Error(`Unknown option --${key}`);
    i += 1;
    if (['settle', 'width', 'height', 'scale'].includes(key)) args[key] = Number(value);
    else if (key === 'levels' || key === 'paths') args[key] = new Set(value.split(','));
    else args[key] = key === 'out' ? path.resolve(value) : value;
  }
  if (!['all', 'plates', 'console', 'print', 'questions'].includes(args.only)) throw new Error('--only must be all, plates, console, print, or questions');
  return args;
}

const sha256 = buffer => createHash('sha256').update(buffer).digest('hex');
const escapeHtml = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const data = await import(pathToFileURL(path.join(appDir, 'generated/app-data.js')).href);
  const levelById = new Map(data.levels.map(level => [level.id, level]));
  const implemented = new Set(data.coverage.available_renderer_ids);
  const modelForPath = id => data.models.find(model => model.paths.includes(id))?.id;

  // Only a full run starts from an empty folder; filtered runs update in place.
  if (!args.levels && !args.paths && args.only === 'all') await rm(args.out, { recursive: true, force: true });
  await mkdir(path.join(args.out, 'plates'), { recursive: true });

  const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
  await server.listen();
  const { port } = server.httpServer.address();
  const base = `http://127.0.0.1:${port}/`;

  const browser = await chromium.launch({ channel: 'chromium', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const context = await browser.newContext({ viewport: { width: args.width, height: args.height }, deviceScaleFactor: args.scale });
  await context.addInitScript(() => sessionStorage.setItem('zusf-abstract-acknowledged', 'true'));
  const page = await context.newPage();
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push({ hash: page.url().split('#')[1] ?? '', error: String(error) }));

  const manifest = { generated: new Date().toISOString(), viewport: { width: args.width, height: args.height, scale: args.scale }, settle_ms: args.settle, reader: args.reader, plates: [], console: [], questions: [], errors: pageErrors };

  await page.goto(`${base}#level=quantum-foam&reader=${args.reader}`);
  await page.waitForSelector('canvas');
  await page.waitForTimeout(args.settle);

  async function show(hash) {
    await page.evaluate(next => { location.hash = next; }, hash);
    await page.waitForTimeout(args.settle);
  }

  const record = (level, extra) => ({
    level: level.id,
    label: level.label,
    renderer: level.renderer?.id ?? null,
    renderer_status: implemented.has(level.renderer?.id) ? 'implemented' : 'placeholder',
    ...extra,
  });

  if (args.only === 'all' || args.only === 'plates') {
    for (const level of data.levels) {
      if (args.levels && !args.levels.has(level.id)) continue;
      for (const lens of ['off', 'on']) {
        await show(`level=${level.id}&lens=${lens}&reader=${args.reader}`);
        const dataUrl = await page.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
        const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');
        const file = `plates/${level.id}--lens-${lens}.png`;
        await writeFile(path.join(args.out, file), buffer);
        manifest.plates.push(record(level, { lens, file, sha256: sha256(buffer) }));
        process.stdout.write(`plate   ${file}\n`);
      }
    }
  }

  if (args.only === 'print') {
    // Print set: full console, lens on and the 4D|T compare view, one per level, in ladder order.
    await mkdir(path.join(args.out, 'print'), { recursive: true });
    const order = data.paths.find(route => route.id === 'full-atlas')?.nodes ?? [];
    const ladder = [...order, ...data.levels.map(level => level.id).filter(id => !order.includes(id))];
    for (const [index, levelId] of ladder.entries()) {
      if (args.levels && !args.levels.has(levelId)) continue;
      const level = levelById.get(levelId);
      for (const [view, suffix] of [['lens-on', '&lens=on'], ['compare', '&lens=on&compare=1']]) {
        await show(`level=${levelId}${suffix}&reader=${args.reader}`);
        const buffer = await page.screenshot({ type: 'png', timeout: 180000 });
        const file = `print/${String(index + 1).padStart(2, '0')}-${levelId}--${view}.png`;
        await writeFile(path.join(args.out, file), buffer);
        manifest.console.push(record(level, { view, file, position: index, sha256: sha256(buffer) }));
        process.stdout.write(`print   ${file}\n`);
      }
    }
  }

  if (args.only === 'questions') {
    await mkdir(path.join(args.out, 'questions'), { recursive: true });
    for (const question of data.questions ?? []) {
      await show(`q=${question.id}&reader=${args.reader}`);
      const buffer = await page.screenshot({ type: 'png', timeout: 120000 });
      const file = `questions/${question.id}.png`;
      await writeFile(path.join(args.out, file), buffer);
      const level = levelById.get(question.level) ?? { id: question.level, label: question.level };
      manifest.questions.push(record(level, { question: question.id, file, sha256: sha256(buffer) }));
      process.stdout.write(`question ${file}\n`);
    }
  }

  if (args.only !== 'plates' && args.only !== 'print' && args.only !== 'questions') {
    for (const route of data.paths) {
      if (args.paths && !args.paths.has(route.id)) continue;
      await mkdir(path.join(args.out, 'console', route.id), { recursive: true });
      const model = modelForPath(route.id);
      for (const [index, levelId] of route.nodes.entries()) {
        if (args.levels && !args.levels.has(levelId)) continue;
        const level = levelById.get(levelId);
        const modelPart = model ? `&model=${model}` : '';
        await show(`level=${levelId}&path=${route.id}${modelPart}&lens=on&reader=${args.reader}`);
        const buffer = await page.screenshot({ type: 'png', timeout: 120000 });
        const file = `console/${route.id}/${String(index).padStart(2, '0')}-${levelId}.png`;
        await writeFile(path.join(args.out, file), buffer);
        manifest.console.push(record(level, { path: route.id, path_label: route.label, model, position: index, file, sha256: sha256(buffer) }));
        process.stdout.write(`console ${file}\n`);
      }
    }
  }

  await browser.close();
  await server.close();

  await writeFile(path.join(args.out, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(path.join(args.out, 'index.html'), contactSheet(manifest));

  const placeholders = new Set(manifest.plates.concat(manifest.console).filter(entry => entry.renderer_status === 'placeholder').map(entry => entry.level));
  console.log(`\n${manifest.plates.length} plates, ${manifest.console.length} console shots, ${manifest.questions.length} question shots -> ${args.out}`);
  console.log(`${placeholders.size} levels still use placeholder renderers.`);
  if (pageErrors.length) {
    console.error(`${pageErrors.length} page errors (see manifest.json):`);
    for (const entry of pageErrors.slice(0, 10)) console.error(`  #${entry.hash}: ${entry.error}`);
    process.exitCode = 1;
  }
}

function contactSheet(manifest) {
  const badge = entry => `<span class="${entry.renderer_status}">${escapeHtml(entry.renderer ?? 'none')} / ${entry.renderer_status}</span>`;
  const byLevel = new Map();
  for (const plate of manifest.plates) {
    if (!byLevel.has(plate.level)) byLevel.set(plate.level, []);
    byLevel.get(plate.level).push(plate);
  }
  const plateRows = [...byLevel.values()].map(plates => `
    <section><h3>${escapeHtml(plates[0].label)} <code>${escapeHtml(plates[0].level)}</code> ${badge(plates[0])}</h3>
    <div class="row">${plates.map(p => `<figure><a href="${p.file}"><img loading="lazy" src="${p.file}"></a><figcaption>T-Theory ${p.lens.toUpperCase()}</figcaption></figure>`).join('')}</div></section>`).join('');
  const byPath = new Map();
  for (const shot of manifest.console) {
    if (!byPath.has(shot.path)) byPath.set(shot.path, []);
    byPath.get(shot.path).push(shot);
  }
  const consoleRows = [...byPath.values()].map(shots => `
    <section><h3>${escapeHtml(shots[0].path_label)} <code>${escapeHtml(shots[0].path)}</code></h3>
    <div class="row">${shots.map(s => `<figure><a href="${s.file}"><img loading="lazy" src="${s.file}"></a><figcaption>${s.position}. ${escapeHtml(s.label)} ${badge(s)}</figcaption></figure>`).join('')}</div></section>`).join('');
  return `<!doctype html><meta charset="utf-8"><title>Field Atlas captures</title>
<style>body{background:#05060d;color:#e8e2cf;font:14px/1.4 monospace;margin:2rem}h2{color:#6fe3ff}code{color:#c88}
.row{display:flex;flex-wrap:wrap;gap:12px}figure{margin:0;width:460px}img{width:100%;border:1px solid #333}
.placeholder{color:#ff7a7a}.implemented{color:#7dff9a}.errors{color:#ff7a7a}</style>
<h1>Field Atlas captures</h1><p>${escapeHtml(manifest.generated)} &middot; ${manifest.plates.length} plates &middot; ${manifest.console.length} console shots &middot; reader ${escapeHtml(manifest.reader)}</p>
${manifest.errors.length ? `<p class="errors">${manifest.errors.length} page errors; see manifest.json</p>` : ''}
<h2>Plates: level &times; lens (canvas only)</h2>${plateRows}
<h2>Console: path &times; level (lens on)</h2>${consoleRows}
`;
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
