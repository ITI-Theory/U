// flight3d.js: the FLY stop of the mind-body explorer (ISS-052). A slow flight forward
// through a fractal world that matches the sector of the current level (H-AL's "Fractal
// Flight": one natural form per sector, uat/RC3/hal-flight-2026-10-10.md):
//   cosmological  the cosmic web: galaxies on filaments around voids
//   micro-physical the quantum foam: flickering bubbles on an interference lattice
//   organismal    an inner sea: fractal coral and flowers, plankton in a current
//   collective    a murmuration: a flock flowing like a fluid over a plain
//   geological    folded strata of rock, dust in the wind
//   network / systemic  a lattice of nodes with gold channels
// Everything drifts with one flow field (the fluid), speed rises with Phi, POKE is a surge.
// The world is two copies of one tile that leapfrog past the camera. Mono or stereo (SBS).

import * as THREE from 'three';

const TILE = 60;
const mod = (n, m) => ((n % m) + m) % m;

function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

const WORLDS = {
  cosmological: { fog: '#03040c', name: 'THE COSMIC WEB', motes: '#9fd8ff' },
  'micro-physical': { fog: '#070414', name: 'THE QUANTUM FOAM', motes: '#cfe8ff' },
  organismal: { fog: '#031a22', name: 'THE INNER SEA', motes: '#bff6e8' },
  collective: { fog: '#141225', name: 'THE MURMURATION', motes: '#e8e0ff' },
  geological: { fog: '#140c08', name: 'THE FOLDED STRATA', motes: '#ffd9b0' },
  network: { fog: '#0a0a14', name: 'THE NETWORK', motes: '#ffe6a0' },
  mind: { fog: '#05030c', name: 'THE MANDELBULB · THE MIND', motes: '#ffb6e8' },
};
WORLDS.systemic = WORLDS.network;
WORLDS['named-solution'] = WORLDS.organismal;
export const worldName = sector => (WORLDS[sector] ?? WORLDS.organismal).name;
// the world of a level: its sector, except where a level reads better as another world
const LEVEL_WORLDS = { 'cellular-synaptic': 'organismal', molecular: 'organismal', 'whole-brain-cemi': 'mind', 'human-vertebrate': 'organismal', dyad: 'organismal', 'animal-swarm': 'collective', 'human-group': 'collective' };
export const worldFor = (levelId, sector) => LEVEL_WORLDS[levelId] ?? (WORLDS[sector] ? sector : 'organismal');

function points(positions, colors, size, opacity = 0.9) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  if (colors) g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size, vertexColors: Boolean(colors), color: colors ? '#ffffff' : '#ffffff', transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
}

function lines(positions, color, opacity) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
}

// ---------------------------------------------------------------- tiles per sector

function cosmicWeb(rand) {
  const group = new THREE.Group();
  const nodes = Array.from({ length: 70 }, () => [(rand() - 0.5) * 40, (rand() - 0.5) * 22, -rand() * TILE]);
  const pos = [];
  const col = [];
  const c = new THREE.Color();
  for (const [i, a] of nodes.entries()) {
    const near = nodes.map((b, j) => [j, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])]).filter(([j]) => j !== i).sort((x, y) => x[1] - y[1]).slice(0, 3);
    for (const [j, d] of near) {
      if (j < i || d > 16) continue;
      const b = nodes[j];
      const n = Math.round(d * 9);
      for (let k = 0; k < n; k++) {
        const s = k / n;
        const jitter = 0.35 * Math.sin(Math.PI * s);
        pos.push(a[0] + (b[0] - a[0]) * s + (rand() - 0.5) * jitter, a[1] + (b[1] - a[1]) * s + (rand() - 0.5) * jitter, a[2] + (b[2] - a[2]) * s + (rand() - 0.5) * jitter);
        c.setHSL(0.58 + 0.08 * rand(), 0.8, 0.45 + 0.3 * rand());
        col.push(c.r, c.g, c.b);
      }
    }
  }
  group.add(points(pos, col, 0.16, 0.9));
  const gpos = [];
  const gcol = [];
  for (const [x, y, z] of nodes) {
    for (let k = 0; k < 40; k++) {
      const r = 0.9 * Math.pow(rand(), 2);
      const a = rand() * Math.PI * 2;
      gpos.push(x + Math.cos(a) * r, y + (rand() - 0.5) * r * 0.5, z + Math.sin(a) * r);
      c.setHSL(0.08 + 0.1 * rand(), 0.9, 0.7);
      gcol.push(c.r, c.g, c.b);
    }
  }
  group.add(points(gpos, gcol, 0.22, 1));
  return group;
}

function quantumFoam(rand) {
  const group = new THREE.Group();
  const geometry = new THREE.SphereGeometry(1, 12, 8);
  const material = new THREE.MeshBasicMaterial({ color: '#8fb6ff', wireframe: true, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending });
  const count = 260;
  const foam = new THREE.InstancedMesh(geometry, material, count);
  const m = new THREE.Matrix4();
  const seeds = [];
  for (let i = 0; i < count; i++) {
    const p = [(rand() - 0.5) * 30, (rand() - 0.5) * 18, -rand() * TILE];
    seeds.push({ p, r: 0.2 + 1.4 * rand() ** 2, f: 0.5 + 2 * rand(), ph: rand() * 6.28 });
    m.makeTranslation(...p);
    foam.setMatrixAt(i, m);
  }
  group.add(foam);
  const lat = [];
  for (let z = 0; z > -TILE; z -= 3) {
    for (let x = -15; x <= 15; x += 3) lat.push(x, -9, z, x, 9, z);
    for (let y = -9; y <= 9; y += 3) lat.push(-15, y, z, 15, y, z);
  }
  group.add(lines(lat, '#6a4cff', 0.07));
  group.userData.animate = t => {
    const s = new THREE.Vector3();
    const q = new THREE.Quaternion();
    for (const [i, b] of seeds.entries()) {
      const k = b.r * (0.4 + 0.6 * Math.abs(Math.sin(t * b.f + b.ph)));
      m.compose(new THREE.Vector3(...b.p), q, s.set(k, k, k));
      foam.setMatrixAt(i, m);
    }
    foam.instanceMatrix.needsUpdate = true;
  };
  return group;
}

// a fractal branch (L-system-like), as line segments; flowers at the tips
function branch(out, tips, rand, x, y, z, dir, len, depth) {
  const end = [x + dir[0] * len, y + dir[1] * len, z + dir[2] * len];
  out.push(x, y, z, ...end);
  if (depth === 0) {
    tips.push(end);
    return;
  }
  const n = 2 + (rand() < 0.4 ? 1 : 0);
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const spread = 0.55;
    const d = new THREE.Vector3(dir[0] + Math.cos(a) * spread, dir[1] + 0.25, dir[2] + Math.sin(a) * spread).normalize();
    branch(out, tips, rand, ...end, [d.x, d.y, d.z], len * (0.62 + 0.15 * rand()), depth - 1);
  }
}

function innerSea(rand) {
  const group = new THREE.Group();
  const seg = [];
  const tips = [];
  for (let i = 0; i < 46; i++) {
    const floor = rand() < 0.75;
    const x = (rand() - 0.5) * 34;
    const z = -rand() * TILE;
    const y = floor ? -7 : 7;
    const dir = floor ? [0, 1, 0] : [0, -1, 0];
    const startTips = tips.length;
    branch(seg, tips, rand, x, y, z, dir, 1.4 + rand() * 1.4, 4);
    if (!floor) for (let k = startTips; k < tips.length; k++) tips[k][1] = Math.min(tips[k][1], 7);
  }
  group.add(lines(seg, '#ff7aa8', 0.5));
  const fpos = [];
  const fcol = [];
  const c = new THREE.Color();
  for (const [x, y, z] of tips) {
    const hue = rand();
    for (let p = 0; p < 7; p++) {
      const a = (p / 7) * Math.PI * 2;
      for (let k = 1; k <= 3; k++) {
        fpos.push(x + Math.cos(a) * 0.09 * k, y + 0.04 * k, z + Math.sin(a) * 0.09 * k);
        c.setHSL(hue, 0.85, 0.55 + 0.1 * k);
        fcol.push(c.r, c.g, c.b);
      }
    }
  }
  group.add(points(fpos, fcol, 0.14, 1));
  const sand = new THREE.Mesh(new THREE.PlaneGeometry(40, TILE, 40, 60), new THREE.MeshBasicMaterial({ color: '#1c6f78', wireframe: true, transparent: true, opacity: 0.12 }));
  sand.rotation.x = -Math.PI / 2;
  sand.position.set(0, -7.2, -TILE / 2);
  group.add(sand);
  return group;
}

function murmuration(rand) {
  const group = new THREE.Group();
  const plain = new THREE.Mesh(new THREE.PlaneGeometry(60, TILE, 30, 40), new THREE.MeshBasicMaterial({ color: '#5a4a9a', wireframe: true, transparent: true, opacity: 0.14 }));
  plain.rotation.x = -Math.PI / 2;
  plain.position.set(0, -8, -TILE / 2);
  group.add(plain);
  const n = 2400;
  const pos = new Float32Array(n * 3);
  const home = [];
  for (let i = 0; i < n; i++) {
    const cluster = Math.floor(rand() * 3);
    home.push({ cx: (cluster - 1) * 9, cz: -10 - cluster * 18, u: rand() * 6.28, v: rand() * 6.28, r: 2 + 3 * rand() });
  }
  const flock = points(pos, null, 0.22, 1);
  flock.material.color.set('#e8e0ff');
  group.add(flock);
  group.userData.animate = t => {
    for (const [i, h] of home.entries()) {
      const u = h.u + t * 0.3;
      const v = h.v + t * 0.21;
      const wob = 1 + 0.35 * Math.sin(t * 0.4 + h.cx);
      pos[i * 3] = h.cx + Math.sin(u) * Math.cos(v) * h.r * 2.2 * wob + 3 * Math.sin(t * 0.25 + h.cz);
      pos[i * 3 + 1] = 2 + Math.sin(v * 2) * h.r * 0.5 + 1.5 * Math.cos(t * 0.3 + h.cx);
      pos[i * 3 + 2] = h.cz + Math.cos(u) * h.r * 1.3;
    }
    flock.geometry.attributes.position.needsUpdate = true;
  };
  return group;
}

function foldedStrata(rand) {
  const group = new THREE.Group();
  const c = new THREE.Color();
  for (let k = 0; k < 9; k++) {
    const g = new THREE.PlaneGeometry(50, TILE, 50, 60);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    const amp = 1.5 + rand() * 2;
    const ph = rand() * 6;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      p.setY(i, -9 + k * 1.1 + amp * Math.sin(z * 0.12 + ph + 0.3 * Math.sin(x * 0.1)) * Math.exp(-((x / 22) ** 2)));
    }
    c.setHSL(0.05 + 0.03 * k, 0.6, 0.35 + 0.03 * k);
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c.clone(), wireframe: true, transparent: true, opacity: 0.22 }));
    mesh.position.z = -TILE / 2;
    group.add(mesh);
  }
  return group;
}

function networkWorld(rand) {
  const group = new THREE.Group();
  const nodes = Array.from({ length: 90 }, () => [(rand() - 0.5) * 30, (rand() - 0.5) * 18, -rand() * TILE]);
  const seg = [];
  for (const [i, a] of nodes.entries()) {
    for (const [j, b] of nodes.entries()) {
      if (j <= i) continue;
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < 7.5) seg.push(...a, a[0], b[1], a[2], a[0], b[1], a[2], ...b);
    }
  }
  group.add(lines(seg, '#ffd166', 0.35));
  group.add(points(nodes.flat(), null, 0.4, 1));
  return group;
}

const BUILDERS = { cosmological: cosmicWeb, 'micro-physical': quantumFoam, organismal: innerSea, collective: murmuration, geological: foldedStrata, network: networkWorld, systemic: networkWorld, 'named-solution': innerSea };

// ---------------------------------------------------------------- the Mandelbulb, raymarched

// A full-screen quad whose shader marches a ray per pixel into a power-p Mandelbulb
// (distance estimate). The ray comes from the eye camera being rendered, so stereo works.
// FLY dives into it: the camera falls towards a point on the surface, its distance
// shrinking exponentially (faster with Phi, POKE pushes deeper), at a fixed high detail;
// at the limit of float precision a burst, and a new dive. The shape holds still during
// a dive (power, morph and detail are fixed when it starts).
// With an emotional score (The Tensor) the camera orbits instead, as the score sets.
const BULB_FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec4 uView;          // viewport x, y, w, h in pixels
uniform mat4 uCamWorld;
uniform mat4 uProjInv;
uniform float uPower;
uniform float uTime;
uniform float uPhi;
uniform float uSurge;
uniform float uScore;   // 1 when an emotional score drives the picture (The Tensor)
uniform float uIters;   // iterations (detail) during a dive
uniform float uMorph;   // the slow twist of the shape (fixed during a dive)
uniform float uFade;    // 0 clear, 1 the burst between dives
uniform float uTexture; // kappa_t: 0 smooth and tonal, 1 granular (grain and hard edges)
float grain() { return fract(sin(dot(gl_FragCoord.xy + floor(uTime * 24.0) * 7.31, vec2(12.9898, 78.233))) * 43758.5453) - 0.5; }
uniform float uS, uF, uA, uG, uPV;
float de(vec3 p, out float trap) {
  vec3 z = p; float dr = 1.0; float r = 0.0; trap = 1e9;
  float iters = uScore > 0.5 ? 3.0 + 6.0 * uPV : uIters;
  for (int i = 0; i < 18; i++) {
    if (float(i) >= iters) break;
    r = length(z);
    if (r > 2.0) break;
    float th = acos(clamp(z.z / r, -1.0, 1.0)) * uPower + uMorph;
    float ph = atan(z.y, z.x) * uPower;
    dr = pow(r, uPower - 1.0) * uPower * dr + 1.0;
    float zr = pow(r, uPower);
    z = zr * vec3(sin(th) * cos(ph), sin(th) * sin(ph), cos(th)) + p;
    trap = min(trap, length(z.xy));
  }
  return 0.5 * log(r) * r / dr;
}
void main() {
  vec2 ndc = ((gl_FragCoord.xy - uView.xy) / uView.zw) * 2.0 - 1.0;
  vec4 target = uProjInv * vec4(ndc, 1.0, 1.0);
  vec3 dir = normalize((uCamWorld * vec4(normalize(target.xyz / target.w), 0.0)).xyz);
  vec3 ro = (uCamWorld * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float t = 0.0; float trap = 0.0; float steps = 0.0; bool hit = false;
  for (int i = 0; i < 110; i++) {
    vec3 p = ro + dir * t;
    float d = de(p, trap);
    if (d < 0.0008 * t) { hit = true; break; }
    t += d * 0.9;
    steps += 1.0;
    if (t > 8.0) break;
  }
  vec3 bg = vec3(0.02, 0.012, 0.05) + 0.05 * vec3(0.6, 0.2, 0.9) * (1.0 - abs(dir.y));
  vec3 flash = vec3(1.0, 0.86, 0.96);
  if (!hit) { gl_FragColor = vec4(mix(bg + vec3(0.9, 0.3, 0.7) * 0.004 * steps * (0.6 + uSurge) + 0.12 * uTexture * grain(), flash, uFade), 1.0); return; }
  vec3 p = ro + dir * t;
  float tt;
  vec2 e = vec2(0.0006 * t, 0.0);
  vec3 n = normalize(vec3(de(p + e.xyy, tt) - de(p - e.xyy, tt), de(p + e.yxy, tt) - de(p - e.yxy, tt), de(p + e.yyx, tt) - de(p - e.yyx, tt)));
  vec3 cool = mix(vec3(0.25, 0.35, 1.0), vec3(1.0, 0.3, 0.75), clamp(trap, 0.0, 1.0));
  vec3 warm = mix(vec3(1.0, 0.55, 0.2), vec3(1.0, 0.2, 0.45), clamp(trap, 0.0, 1.0));
  vec3 base = mix(cool, warm, uPhi);
  float light = 1.0;
  float rim = 0.25;
  if (uScore > 0.5) {
    // The Tensor's visual map: safety warm and light, fear cold with hard edges,
    // grief desaturated, awe the power (set on the CPU)
    base = mix(cool, warm, uS);
    base = mix(base, vec3(0.35, 0.55, 1.0), 0.55 * uF);
    base = mix(base, vec3(dot(base, vec3(0.3, 0.59, 0.11))), 0.8 * uG);
    light = 0.45 + 0.75 * uS + 0.3 * uA;
    rim = 0.15 + 0.7 * uF;
  }
  rim *= 1.0 + 1.5 * uTexture;
  float diff = clamp(dot(n, normalize(vec3(0.6, 0.8, 0.4))), 0.0, 1.0);
  diff = mix(diff, step(0.5, diff) * 0.8 + 0.2 * diff, 0.6 * uTexture);
  float ao = 1.0 - steps / 110.0;
  vec3 col = light * base * (0.25 + 0.75 * diff) * ao + rim * pow(1.0 - abs(dot(n, -dir)), 3.0) * vec3(1.0, 0.8, 1.0);
  col = mix(col, bg, clamp(t / 8.0, 0.0, 1.0));
  col += 0.3 * uTexture * grain() * (0.4 + col);
  gl_FragColor = vec4(mix(col, flash, uFade), 1.0);
}`;

function createBulb() {
  const material = new THREE.ShaderMaterial({
    vertexShader: 'void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: BULB_FRAG,
    uniforms: {
      uRes: { value: new THREE.Vector2() }, uView: { value: new THREE.Vector4() },
      uCamWorld: { value: new THREE.Matrix4() }, uProjInv: { value: new THREE.Matrix4() },
      uPower: { value: 8 }, uTime: { value: 0 }, uPhi: { value: 0 }, uSurge: { value: 0 },
      uScore: { value: 0 }, uS: { value: 0 }, uF: { value: 0 }, uA: { value: 0 }, uG: { value: 0 }, uPV: { value: 0 },
      uIters: { value: 9 }, uMorph: { value: 0 }, uFade: { value: 0 }, uTexture: { value: 0 },
    },
    depthTest: false, depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  quad.frustumCulled = false;
  const scene = new THREE.Scene();
  scene.add(quad);
  const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  return {
    render(renderer, eye, view, state) {
      const u = material.uniforms;
      u.uView.value.copy(view);
      eye.updateMatrixWorld();
      u.uCamWorld.value.copy(eye.matrixWorld);
      u.uProjInv.value.copy(eye.projectionMatrixInverse);
      const sc = state.score;
      u.uScore.value = sc ? 1 : 0;
      if (sc) for (const k of ['S', 'F', 'A', 'G', 'PV']) u[`u${k}`].value = sc[k];
      u.uPower.value = sc ? 2 + 6 * sc.A : state.power;
      u.uIters.value = state.iters ?? 9;
      u.uMorph.value = state.morph ?? state.time * 0.05;
      u.uFade.value = state.fade ?? 0;
      u.uTexture.value = state.texture ?? 0;
      u.uTime.value = state.time;
      u.uPhi.value = state.phi;
      u.uSurge.value = state.surge;
      renderer.render(scene, ortho);
    },
  };
}

// The same distance estimate on the CPU (double precision), to find where a dive lands.
function bulbDE(px, py, pz, power, morph, iters) {
  let x = px, y = py, z = pz, dr = 1, r = 0;
  for (let i = 0; i < iters; i++) {
    r = Math.hypot(x, y, z);
    if (r > 2) break;
    const th = Math.acos(Math.max(-1, Math.min(1, z / r))) * power + morph;
    const ph = Math.atan2(y, x) * power;
    dr = r ** (power - 1) * power * dr + 1;
    const zr = r ** power;
    x = zr * Math.sin(th) * Math.cos(ph) + px;
    y = zr * Math.sin(th) * Math.sin(ph) + py;
    z = zr * Math.cos(th) + pz;
  }
  return 0.5 * Math.log(r) * r / dr;
}

const DIVE_START = 1.2;    // camera distance from the surface when a dive begins
const DIVE_END = 3e-5;     // about the limit of float precision in the shader (zoom x40,000)
// One detail for the whole dive: a coarser surface early on would bulge past the camera
// (explorer-check: the camera stays outside the fractal on every dive).
const DIVE_ITERS = 16;

// A dive: a surface point P, marched from a random direction v; the camera then sits
// at P - D v, looking at P and rolling slowly about the line of sight.
function newDive(rand, phi, time) {
  const power = 8 + 2 * phi;
  const morph = time * 0.05;
  const iters = DIVE_ITERS;
  for (let attempt = 0; attempt < 8; attempt++) {
    const u = rand() * 2 - 1, a = rand() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    const dir = [-s * Math.cos(a), -u * 0.6, -s * Math.sin(a)];
    const len = Math.hypot(...dir);
    for (let k = 0; k < 3; k++) dir[k] /= len;
    let t = 0, hit = false, p = null;
    for (let i = 0; i < 400; i++) {
      p = [-dir[0] * 2.6 + dir[0] * t, -dir[1] * 2.6 + dir[1] * t, -dir[2] * 2.6 + dir[2] * t];
      const d = bulbDE(p[0], p[1], p[2], power, morph, iters);
      if (d < 2e-6) { hit = true; break; }
      t += d * 0.9;
      if (t > 5) break;
    }
    if (!hit) continue;
    // the line of sight that found the point marched through empty space: the camera
    // falls back along it, so it is always outside (the local normal is not: the
    // fractal's other bulges cross it further out)
    const v = dir;
    const helper = Math.abs(v[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const t1 = [v[1] * helper[2] - v[2] * helper[1], v[2] * helper[0] - v[0] * helper[2], v[0] * helper[1] - v[1] * helper[0]];
    const l1 = Math.hypot(...t1);
    for (let k = 0; k < 3; k++) t1[k] /= l1;
    const t2 = [v[1] * t1[2] - v[2] * t1[1], v[2] * t1[0] - v[0] * t1[2], v[0] * t1[1] - v[1] * t1[0]];
    return { p, v, t1, t2, power, morph, d: Math.min(DIVE_START, t * 0.95), s: 0 };
  }
  return null;
}

// for scripts/explorer-check.mjs
export const diveMath = { bulbDE, newDive, seeded, DIVE_START, DIVE_END, iters: () => DIVE_ITERS };

export function createFlight3D() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, 0.05, 80);
  camera.focus = 6;
  const stereoCamera = new THREE.StereoCamera();
  stereoCamera.eyeSep = 0.12;
  const size = new THREE.Vector2();
  let tiles = [];
  let sector = '';
  let bulb = null;
  let orbit = 0;
  let travelled = 0;
  let surge = 0;
  let last = 0;
  let dive = null;      // the current dive into the Mandelbulb (FLY at the mind)
  let fade = 0;         // the burst between dives (1 = full flash)
  let fading = 0;       // +1 fading out to the burst, -1 fading back in
  const diveRand = seeded(23);

  // motes: the fluid, drifting in one flow field around the camera
  const MOTES = 1600;
  const motePos = new Float32Array(MOTES * 3);
  const rand = seeded(5);
  for (let i = 0; i < MOTES; i++) {
    motePos[i * 3] = (rand() - 0.5) * 24;
    motePos[i * 3 + 1] = (rand() - 0.5) * 14;
    motePos[i * 3 + 2] = -rand() * 40;
  }
  const motes = points(motePos, null, 0.05, 0.6);
  scene.add(motes);

  function build(next) {
    sector = next;
    for (const t of tiles) scene.remove(t);
    const world = WORLDS[sector] ?? WORLDS.organismal;
    if (sector === 'mind') {
      tiles = [];
      return;
    }
    const make = BUILDERS[sector] ?? innerSea;
    const rnd = seeded(sector.length * 97 + 11);
    const tile = make(rnd);
    tiles = [tile, tile.clone()];
    if (tile.userData.animate) tiles[1].userData.animate = null;
    for (const t of tiles) scene.add(t);
    scene.background = new THREE.Color(world.fog);
    scene.fog = new THREE.Fog(world.fog, 8, 52);
    motes.material.color.set(world.motes);
  }

  function renderEye(eye) {
    renderer.render(scene, eye);
  }

  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    poke(strength = 1) {
      surge = Math.max(surge, 0.6 + 0.6 * strength);
    },
    // state: { sector, phi, time, stereo }
    render(state) {
      if (state.sector !== sector) {
        build(state.sector);
        dive = null; fade = 0; fading = 0;
        camera.near = 0.05; camera.up.set(0, 1, 0); stereoCamera.eyeSep = 0.12;
      }
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      surge = Math.max(0, surge - dt * 0.6);
      const speed = 1.2 + 3.5 * state.phi + 8 * surge;
      travelled += speed * dt;
      if (state.sector === 'mind') {
        bulb ??= createBulb();
        const tt = state.time;
        const sc = state.score;
        let bulbState;
        if (sc) {
          // The Tensor: a slow spiral in towards the surface and back out; a surge pushes in.
          // Curiosity: how far in the camera explores; grief: a slower orbit.
          const reach = 0.25 + 0.6 * sc.C;
          const radius = 2.15 - reach * (0.5 + 0.5 * Math.sin(tt * 0.045)) - 0.3 * surge;
          orbit += 0.06 * (1 - 0.7 * sc.G) * dt;
          camera.up.set(0, 1, 0);
          camera.position.set(Math.sin(orbit) * radius, 0.35 * Math.sin(tt * 0.04), Math.cos(orbit) * radius);
          camera.lookAt(0, 0, 0);
          bulbState = { phi: state.phi, time: tt, surge, score: sc, power: 8, iters: 9, morph: tt * 0.05, fade: 0, texture: state.texture ?? 0 };
        } else {
          // FLY: dive into the Mandelbulb
          dive ??= newDive(diveRand, state.phi, tt);
          if (dive && !fading) {
            const k = 0.12 + 0.35 * state.phi + 1.4 * surge;
            dive.d *= Math.exp(-k * dt);
            dive.s += dt;
            if (dive.d < DIVE_END) { fading = 1; surge = Math.max(surge, 0.8); }
          }
          if (fading === 1) {
            fade = Math.min(1, fade + dt / 1.2);
            if (fade >= 1) { dive = newDive(diveRand, state.phi, tt); fading = -1; }
          } else if (fading === -1) {
            fade = Math.max(0, fade - dt / 1.5);
            if (fade <= 0) fading = 0;
          }
          if (dive) {
            const { p, v, t1, t2 } = dive;
            camera.position.set(p[0] - v[0] * dive.d, p[1] - v[1] * dive.d, p[2] - v[2] * dive.d);
            const roll = 0.12 * dive.s;
            camera.up.set(...[0, 1, 2].map(i => Math.cos(roll) * t2[i] - Math.sin(roll) * t1[i]));
            camera.lookAt(p[0], p[1], p[2]);
          }
          const depth = dive ? DIVE_START / dive.d : 1;
          this.depth = depth;
          bulbState = { phi: state.phi, time: tt, surge, score: null, power: dive?.power ?? 8,
            iters: diveMath.iters(depth), morph: dive?.morph ?? tt * 0.05, fade };
        }
        // the eye separation and the near plane follow the dive (stereo stays fusable deep in)
        stereoCamera.eyeSep = !sc && dive ? Math.min(0.12, 0.04 * dive.d) : 0.12;
        camera.near = Math.max(1e-6, Math.min(0.05, (dive?.d ?? 1) * 0.1));
        renderer.getSize(size);
        const pr = renderer.getPixelRatio();
        const full = new THREE.Vector4(0, 0, size.x * pr, size.y * pr);
        if (state.stereo === 'half' || state.stereo === 'full') {
          camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
          camera.updateProjectionMatrix();
          camera.updateMatrixWorld();
          stereoCamera.update(camera);
          renderer.setScissorTest(true);
          for (const [x, eye] of [[0, stereoCamera.cameraL], [size.x / 2, stereoCamera.cameraR]]) {
            renderer.setViewport(x, 0, size.x / 2, size.y);
            renderer.setScissor(x, 0, size.x / 2, size.y);
            bulb.render(renderer, eye, new THREE.Vector4(x * pr, 0, (size.x / 2) * pr, size.y * pr), bulbState);
          }
          renderer.setScissorTest(false);
          renderer.setViewport(0, 0, size.x, size.y);
        } else {
          camera.aspect = size.x / size.y;
          camera.updateProjectionMatrix();
          bulb.render(renderer, camera, full, bulbState);
        }
        return;
      }
      if (!tiles.length) return;
      const offset = mod(travelled, TILE);
      tiles[0].position.z = offset;
      tiles[1].position.z = offset - TILE;
      // the copy whose tile has the animation drives both (they share geometry through clone)
      tiles[0].userData.animate?.(state.time);
      // the fluid: a divergence-free swirl, and the forward drift
      const t = state.time;
      for (let i = 0; i < MOTES; i++) {
        const k = i * 3;
        const x = motePos[k];
        const y = motePos[k + 1];
        motePos[k] += (Math.sin(y * 0.4 + t * 0.3) * 0.6) * dt;
        motePos[k + 1] += (Math.cos(x * 0.35 + t * 0.25) * 0.4) * dt;
        motePos[k + 2] += speed * dt;
        if (motePos[k + 2] > 2) {
          motePos[k + 2] -= 42;
          motePos[k] = (Math.random() - 0.5) * 24;
          motePos[k + 1] = (Math.random() - 0.5) * 14;
        }
      }
      motes.geometry.attributes.position.needsUpdate = true;
      // a gentle banking glide, never a jolt (H-AL: smooth motion only)
      camera.position.set(Math.sin(t * 0.11) * 2.2, Math.sin(t * 0.07) * 1.2, 0);
      camera.lookAt(Math.sin(t * 0.11 + 0.6) * 2.2, Math.sin(t * 0.07 + 0.4) * 1.2, -10);
      camera.rotateZ(Math.sin(t * 0.09) * 0.06);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        stereoCamera.update(camera);
        renderer.setScissorTest(true);
        for (const [x, eye] of [[0, stereoCamera.cameraL], [size.x / 2, stereoCamera.cameraR]]) {
          renderer.setViewport(x, 0, size.x / 2, size.y);
          renderer.setScissor(x, 0, size.x / 2, size.y);
          renderEye(eye);
        }
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, size.x, size.y);
        return;
      }
      camera.aspect = size.x / size.y;
      camera.updateProjectionMatrix();
      renderEye(camera);
    },
  };
}
