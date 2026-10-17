// wormhole.js: a Morris-Thorne wormhole (ISS-095: "the science version of a wormhole stays in the
// default ... an exact solution of general relativity at the compact-object level, labelled; an
// embedding diagram, and the lensing view by a ray-traced shader"). The Ellis wormhole,
//   ds^2 = -dt^2 + dl^2 + r(l)^2 dOmega^2,   r(l) = sqrt(b0^2 + l^2),
// with l the proper radial distance (l < 0 is the other side). A light ray with impact parameter b
// turns by dphi/dl = b / (r sqrt(r^2 - b^2)): a ray with b > b0 turns back at r = b to our side's sky;
// one with b < b0 passes the throat to the other side's. The shader integrates the turning angle per
// pixel (substitutions remove the turning point's 1/sqrt singularity) and looks the sky up there.

import * as THREE from 'three';

const B0 = 1;
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uL;      // the camera's proper distance l (signed: the side)
uniform mat3 uLook;    // camera orientation: columns right, up, forward (world)
uniform float uGrid;
const float B0 = ${B0.toFixed(1)};
const int N = 56;
float rOf(float l) { return sqrt(B0 * B0 + l * l); }
float f(float l, float b) { float r = rOf(l); return b / (r * sqrt(max(1e-9, r * r - b * b))); }
// integral of f from a to infinity, where a may be the turning point (l = a + q^2, q = tan psi)
float toInf(float a, float b) {
  float s = 0.0; float h = 1.5707963 / float(N);
  for (int i = 0; i < N; i++) {
    float psi = (float(i) + 0.5) * h;
    float q = tan(psi); float sec2 = 1.0 + q * q;
    s += f(a + q * q, b) * 2.0 * q * sec2 * h;
  }
  return s;
}
// integral of f from a to c (a the turning point or 0), l = a + q^2
float between(float a, float c, float b) {
  float Q = sqrt(max(0.0, c - a)); float s = 0.0; float h = Q / float(N);
  for (int i = 0; i < N; i++) { float q = (float(i) + 0.5) * h; s += f(a + q * q, b) * 2.0 * q * h; }
  return s;
}
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
vec3 sky(vec3 d, float side) {
  d = normalize(d);
  vec3 col = side > 0.0 ? vec3(0.01, 0.015, 0.05) : vec3(0.05, 0.025, 0.005);
  // a galaxy band, and a nebula on the far side
  float band = exp(-pow(d.y * 4.0, 2.0));
  col += (side > 0.0 ? vec3(0.12, 0.16, 0.4) : vec3(0.45, 0.25, 0.06)) * band * 0.6;
  if (side < 0.0) col += vec3(0.9, 0.45, 0.15) * pow(max(0.0, dot(d, normalize(vec3(0.4, 0.3, 1.0)))), 18.0);
  else col += vec3(0.4, 0.5, 1.0) * pow(max(0.0, dot(d, normalize(vec3(-0.5, 0.2, -1.0)))), 24.0) * 0.6;
  for (int k = 0; k < 2; k++) {
    float sc = k == 0 ? 90.0 : 220.0;
    vec3 c = floor(d * sc);
    float h = hash(c + float(k) * 17.0);
    if (h > 0.985) {
      vec3 sp = (c + 0.5 + 0.3 * vec3(hash(c + 1.0) - 0.5, hash(c + 2.0) - 0.5, hash(c + 3.0) - 0.5)) / sc;
      float dd = length(d * sc - sp * sc);
      col += (side > 0.0 ? vec3(0.75, 0.85, 1.0) : vec3(1.0, 0.85, 0.6)) * smoothstep(0.6, 0.0, dd) * (h - 0.985) * 60.0;
    }
  }
  if (uGrid > 0.5) {
    float th = acos(clamp(d.y, -1.0, 1.0)), ph = atan(d.z, d.x);
    float g = max(smoothstep(0.985, 1.0, abs(cos(th * 9.0))), smoothstep(0.985, 1.0, abs(cos(ph * 9.0))));
    col += (side > 0.0 ? vec3(0.2, 0.35, 0.8) : vec3(0.8, 0.5, 0.15)) * g * 0.35;
  }
  return col;
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 d = normalize(uLook * vec3(uv.x, uv.y, 1.2));
  float near = uL >= 0.0 ? 1.0 : -1.0;     // the camera's side
  float lc = abs(uL);
  vec3 er = vec3(0.0, 0.0, 1.0);           // outward, away from the throat, on either side
  float rc = rOf(lc);
  float cosT = dot(d, -er);                 // the angle from the inward direction
  float sinT = sqrt(max(0.0, 1.0 - cosT * cosT));
  float b = rc * sinT;
  vec3 et = sinT > 1e-5 ? normalize(d - dot(d, er) * er) : vec3(1.0, 0.0, 0.0);
  float phi; float side = near;
  if (cosT <= 0.0) {
    phi = toInf(lc, b);                                   // outward: straight to our sky
  } else if (b > B0) {
    float lt = sqrt(b * b - B0 * B0);
    phi = between(lt, lc, b) + toInf(lt, b);              // in, turn, out again
  } else {
    phi = between(0.0, lc, b) + toInf(0.0, b);            // in, through the throat
    side = -near;
  }
  vec3 dir = cos(phi) * er + sin(phi) * et;
  gl_FragColor = vec4(pow(sky(dir, side), vec3(0.8)), 1.0);
}`;

const canvas = document.querySelector('#wh-view');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
renderer.setPixelRatio(Math.min(1.5, devicePixelRatio || 1));
const uniforms = { uRes: { value: new THREE.Vector2() }, uL: { value: 5 }, uLook: { value: new THREE.Matrix3() }, uGrid: { value: 1 } };
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({ vertexShader: 'void main(){gl_Position=vec4(position.xy,0.0,1.0);}', fragmentShader: FRAG, uniforms }));
const scene = new THREE.Scene();
scene.add(quad);
const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const lInput = document.querySelector('#wh-l');
const lOut = document.querySelector('#wh-l-out');
const grid = document.querySelector('#wh-grid');
const embed = document.querySelector('#wh-embed');
let yaw = 0, pitch = 0, fly = null;

function look() {
  // forward: towards the throat on our side, away from it on the other (the way a traveller faces)
  const toward = Number(lInput.value) >= 0 ? -1 : 1;
  const fwd = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), toward * Math.cos(yaw) * Math.cos(pitch)).normalize();
  const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0)).normalize();
  const up = new THREE.Vector3().crossVectors(right, fwd);
  uniforms.uLook.value.set(right.x, up.x, fwd.x, right.y, up.y, fwd.y, right.z, up.z, fwd.z);
}

function drawEmbed(l) {
  const g = embed.getContext('2d');
  const W = embed.width, H = embed.height;
  g.clearRect(0, 0, W, H);
  const zOf = r => B0 * Math.acosh(Math.max(1, r / B0));
  const R = 4, sx = W / (2 * R + 1), sy = H / (2 * zOf(R) + 0.6), cx = W / 2, cy = H / 2;
  g.lineWidth = 1;
  // rings of the surface r = b0 cosh(z/b0), seen a little from the side (ellipses)
  for (let k = -12; k <= 12; k++) {
    const z = (k / 12) * zOf(R), r = B0 * Math.cosh(z / B0);
    g.strokeStyle = z >= 0 ? 'rgba(94,231,255,.45)' : 'rgba(255,190,90,.45)';
    g.beginPath();
    g.ellipse(cx, cy - z * sy, r * sx, r * sx * 0.18, 0, 0, Math.PI * 2);
    g.stroke();
  }
  for (const s of [-1, 1]) {
    g.strokeStyle = 'rgba(232,238,252,.6)';
    g.beginPath();
    for (let k = -40; k <= 40; k++) {
      const z = (k / 40) * zOf(R), r = B0 * Math.cosh(z / B0);
      const x = cx + s * r * sx, y = cy - z * sy;
      if (k === -40) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.stroke();
  }
  const z = B0 * Math.asinh(l / B0), r = Math.hypot(B0, l);
  g.fillStyle = '#ff7ad9';
  g.beginPath();
  g.arc(cx + r * sx * 0.7, cy - Math.max(-zOf(R), Math.min(zOf(R), z)) * sy, 6, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(232,238,252,.8)';
  g.font = '18px Space Mono, monospace';
  g.fillText('our side', 8, 22);
  g.fillText('the other side', 8, H - 10);
  g.fillText(`the throat: r = b0 (${B0})`, W - 260, cy - 6);
}

function frame(now) {
  requestAnimationFrame(frame);
  if (fly) {
    const t = (now - fly) / 12000;
    lInput.value = String(Math.max(-10, 6 - 12 * Math.min(1, t)));
    if (t >= 1) fly = null;
  }
  const l = Number(lInput.value);
  uniforms.uL.value = l;
  uniforms.uGrid.value = grid.checked ? 1 : 0;
  lOut.textContent = `l = ${l.toFixed(2)} b0 (${l >= 0 ? 'our side' : 'the other side'})`;
  look();
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== Math.round(w * renderer.getPixelRatio())) renderer.setSize(w, h, false);
  uniforms.uRes.value.set(canvas.width, canvas.height);
  renderer.render(scene, cam);
  drawEmbed(l);
}
requestAnimationFrame(frame);

let drag = null;
canvas.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, yaw, pitch }; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', e => {
  if (!drag) return;
  yaw = drag.yaw + (e.clientX - drag.x) * 0.005;
  pitch = Math.max(-1.4, Math.min(1.4, drag.pitch - (e.clientY - drag.y) * 0.005));
});
canvas.addEventListener('pointerup', () => { drag = null; });
document.querySelector('#wh-fly').addEventListener('click', () => { yaw = 0; pitch = 0; fly = performance.now(); });
document.querySelector('#wh-back').addEventListener('click', () => { location.href = './index.html'; });
const start = Number(new URLSearchParams(location.search).get('l'));
if (Number.isFinite(start) && start >= -10 && start <= 10 && new URLSearchParams(location.search).has('l')) lInput.value = String(start);
