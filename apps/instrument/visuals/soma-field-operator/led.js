// led.js: the LED film look (ISS-107; author, 16 Oct: Suicide's "Frankie Teardrop", Douglas Hart's film:
// "old, dark, a low-tech flashing LED matrix, like an old AI"). ROOTED's (a film style, registry/
// rooted.yaml preset led-2021). Any view becomes a matrix of round LEDs: the picture pixelated into
// cells (an SVG filter), four levels of red and amber (an old display's few colours), each cell masked
// to a dot, and a slow scan line passing down. No new flashing: the light is the view's own.

import { rooted } from './who.js';

const CELL = 10;

function ensureFilter() {
  if (document.querySelector('#led-matrix-svg')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'led-matrix-svg';
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `
    <filter id="led-matrix" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feFlood x="${CELL / 2 - 1}" y="${CELL / 2 - 1}" width="2" height="2" />
      <feComposite width="${CELL}" height="${CELL}" />
      <feTile result="grid" />
      <feComposite in="SourceGraphic" in2="grid" operator="in" />
      <feMorphology operator="dilate" radius="${CELL / 2}" />
      <feColorMatrix type="saturate" values="0" />
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0.04 0.45 0.8 1" />
        <feFuncG type="discrete" tableValues="0.01 0.08 0.25 0.55" />
        <feFuncB type="discrete" tableValues="0.01 0.02 0.04 0.12" />
      </feComponentTransfer>
    </filter>`;
  document.body.append(svg);
  const scan = document.createElement('div');
  scan.className = 'led-scan';
  document.body.append(scan);
}

export function setLed(on) {
  const want = Boolean(on) && rooted();
  if (want) ensureFilter();
  document.body.classList.toggle('led-look', want);
  document.body.style.setProperty('--led-cell', `${CELL}px`);
}
export const led = () => document.body.classList.contains('led-look');
