// capture-overview.mjs: the overview (overview.html, the author's desk with its four live screens) as a
// plate for the Field Atlas's front matter and the Gallery (ISS-100). 1920 x 1080 at double density,
// headless on the GPU; the four frames are given time to draw.
//
//   node scripts/capture-overview.mjs [--out ../../../../Part2/book/field-atlas/figures/app/overview.png] [--settle 30000]
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const out = resolve(arg('out', resolve(appDir, '../../../../Part2/book/field-atlas/figures/app/overview.png')));
const settle = Number(arg('settle', 30000));

const server = await createServer({ root: appDir, logLevel: 'error', server: { host: '127.0.0.1', port: 0 } });
await server.listen();
const base = `http://127.0.0.1:${server.httpServer.address().port}/`;
const browser = await chromium.launch({ headless: true, args: ['--use-angle=d3d11', '--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error('page error:', e.message));
  await page.goto(`${base}overview.html`, { waitUntil: 'load', timeout: 180000 });
  await page.waitForTimeout(settle);
  await page.screenshot({ path: out });
  console.log(`wrote ${out}`);
} finally {
  await browser.close();
  await server.close();
}
