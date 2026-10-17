// lens.js: the lensing skin (ISS-095: "a lensing skin is RICE"). Over any view, a point mass's
// gravitational lens follows the pointer: each point of the picture is shifted towards the lens by
// theta_E^2 / theta (the deflection of a point mass, in the thin-lens approximation), so straight
// lines bend round it and a ring of light gathers at the Einstein radius. An SVG displacement filter
// on the explorer's canvases; RICE's (the extras), off by default. The science version, a wormhole
// ray-traced through its metric, is wormhole.html.

import { rice } from './rice.js';

const SIZE = 512;       // the displacement map's pixels
const SCALE = 200;      // the filter's range of shift, in screen pixels (twice the largest)
const THETA_E = 0.16;   // the Einstein radius, as a fraction of the map

let map = null;
function displacementMap() {
  if (map) return map;
  const c = document.createElement('canvas');
  c.width = c.height = SIZE;
  const g = c.getContext('2d');
  const img = g.createImageData(SIZE, SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const dx = x / SIZE - 0.5, dy = y / SIZE - 0.5;
      const r = Math.max(1e-3, Math.hypot(dx, dy));
      // the lens equation, beta = theta - theta_E^2 / theta: the light seen at theta left its source
      // nearer the lens, so each pixel samples inwards; faded to nothing at the map's edge
      const a = Math.min(0.3, (THETA_E * THETA_E) / r) * Math.max(0, 1 - r / 0.5) ** 2;
      const sx = -(dx / r) * a, sy = -(dy / r) * a;
      const k = (y * SIZE + x) * 4;
      img.data[k] = Math.round(255 * Math.max(0, Math.min(1, 0.5 + (sx * SIZE) / SCALE)));
      img.data[k + 1] = Math.round(255 * Math.max(0, Math.min(1, 0.5 + (sy * SIZE) / SCALE)));
      img.data[k + 2] = 128;
      img.data[k + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  map = c.toDataURL('image/png');
  return map;
}

function ensureFilter() {
  if (document.querySelector('#lens-skin-svg')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'lens-skin-svg';
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `
    <filter id="lens-skin" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-color="rgb(128,128,128)" result="flat" />
      <feImage id="lens-skin-map" href="${displacementMap()}" x="0" y="0" width="${SIZE}" height="${SIZE}" preserveAspectRatio="none" result="lens" />
      <feComposite in="lens" in2="flat" operator="over" result="field" />
      <feDisplacementMap in="SourceGraphic" in2="field" scale="${SCALE}" xChannelSelector="R" yChannelSelector="G" />
    </filter>`;
  document.body.append(svg);
  addEventListener('pointermove', e => {
    const im = document.querySelector('#lens-skin-map');
    if (!im || !document.body.classList.contains('lens-skin')) return;
    im.setAttribute('x', String(e.clientX - SIZE / 2));
    im.setAttribute('y', String(e.clientY - SIZE / 2));
  });
}

export const lensSkin = () => { try { return localStorage.getItem('soma-lens') === '1'; } catch { return false; } };
export function setLensSkin(on) {
  try { localStorage.setItem('soma-lens', on ? '1' : '0'); } catch { /* private mode */ }
  syncLensSkin();
}
export function syncLensSkin() {
  const want = lensSkin() && rice();
  if (want) ensureFilter();
  document.body.classList.toggle('lens-skin', want);
}
