// art-looks.js: the Gallery's filters in the app (ISS-097: "filters for images and video (pencil, retro
// black-and-white, distortion driven by the field), in the app and in the build; which are ROOTED").
// The book's are lib/art/filters.py; these are their live twins, SVG filters over the explorer's
// canvases, ROOTED's (`art=pencil|retro|distort` in the address). PENCIL: the picture's edges in
// graphite on paper. RETRO: black and white, hard contrast and grain, an old film stock. DISTORT: the
// picture rippled by a turbulence whose strength is the limbic field Φ, read live. A screen recording
// (SHOW's REC, or any recorder) records the filtered picture, so video follows.

import { rooted } from './who.js';

export const ART_LOOKS = ['pencil', 'retro', 'distort'];

function ensureFilters() {
  if (document.querySelector('#art-looks-svg')) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'art-looks-svg';
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `
    <filter id="art-pencil" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0" />
      <feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" divisor="1" preserveAlpha="true" />
      <feComponentTransfer><feFuncR type="linear" slope="-2.2" intercept="1" /><feFuncG type="linear" slope="-2.2" intercept="0.98" /><feFuncB type="linear" slope="-2.2" intercept="0.94" /></feComponentTransfer>
    </filter>
    <filter id="art-retro" color-interpolation-filters="sRGB">
      <feColorMatrix type="saturate" values="0" result="grey" />
      <feComponentTransfer in="grey" result="hard"><feFuncR type="gamma" amplitude="1.25" exponent="1.4" /><feFuncG type="gamma" amplitude="1.25" exponent="1.4" /><feFuncB type="gamma" amplitude="1.25" exponent="1.4" /></feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="noise" />
      <feColorMatrix in="noise" type="saturate" values="0" result="grain" />
      <feBlend in="hard" in2="grain" mode="multiply" />
    </filter>
    <filter id="art-distort" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence id="art-distort-noise" type="turbulence" baseFrequency="0.008 0.012" numOctaves="2" seed="7" result="t" />
      <feDisplacementMap id="art-distort-map" in="SourceGraphic" in2="t" scale="20" xChannelSelector="R" yChannelSelector="G" />
    </filter>`;
  document.body.append(svg);
}

let current = '';
export function setArtLook(name) {
  const want = ART_LOOKS.includes(name) && rooted() ? name : '';
  if (want) ensureFilters();
  for (const n of ART_LOOKS) document.body.classList.toggle(`art-${n}`, n === want);
  current = want;
}
export const artLook = () => current;
// DISTORT follows the field: call with Φ (0..1) every frame or so
export function artLookField(phi, time) {
  if (current !== 'distort') return;
  document.querySelector('#art-distort-map')?.setAttribute('scale', String(6 + 70 * Math.max(0, Math.min(1, phi))));
  // the noise drifts slowly (never a jump: no flicker)
  document.querySelector('#art-distort-noise')?.setAttribute('baseFrequency', `${(0.008 + 0.002 * Math.sin(time * 0.15)).toFixed(4)} ${(0.012 + 0.003 * Math.cos(time * 0.11)).toFixed(4)}`);
}
