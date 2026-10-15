// paths3d.js: THE COURSE, the inside of a thought that sticks (ISS-104; the process agreed with
// the author, 15 Oct). In the Mind Chamber thoughts pop and vanish, a wave; one sticks ("cut the
// grass"), the rest blur and carry on; it opens in place into a field, a golf course: the
// LANDSCAPE stop's one SAFE / FIGHT / FREEZE landscape tiled into a hundred and forty small holes
// ("each hole is a FFF"), the fairways between them the paths (chess: the moves from here). The
// considerations arrive one after another ("the weather; when does it get dark; rain tomorrow"),
// each a ripple across the course that settles the holes it passes: a hole's height is its cost
// (the energy landscape), its colour the feeling (the emotion algebra: fear and anger warm red,
// joy and trust cool blue), the ball rolls to the well that fits (SAFE, FIGHT, FREEZE). Stress is
// height and colour disagreeing and the colours scattered: low and blue an obvious do, high and
// red an obvious don't, low but red avoidance, high but blue worth the effort. At the end it
// resolves (the easiest way through drawn across the course), or it does not, and the thought
// stays: it sinks below the threshold and builds up (allostatic load; the Zeigarnik effect,
// suggestive). Over it all a glass dome, the threshold (the global workspace: Baars; Dehaene's
// ignition): the course runs below in parallel; a consideration that crosses pops out above the
// dome as a thought, one after another, at most four held at once (the working-memory limit);
// "solution" (an insight, a sudden settling) melts them back down. The stream looks serial; the
// wave underneath is not (author, 15 Oct). Interpretive: pictures of the model's terms, not of a brain.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';
import { bubbleMaterial, bubbleEnvironment, tickBubbles } from './bubble.js';

// dense enough to read as a surface (the author: at 2^200 holes the course is a landscape)
const COLS = 40, ROWS = 28, SP = 1.2;
const X0 = -((COLS - 1) * SP) / 2, Z0 = 15;
const LIE = { SAFE: [0, 0.15, -0.5], FIGHT: [-0.25, -0.15, -0.35], FREEZE: [0.25, -0.15, -0.35] };
const LIE_COLOR = { SAFE: '#9fe8ff', FIGHT: '#ff3b4e', FREEZE: '#c8c8ff' };
// THE SEA (author, 15 Oct 22:07): the course is a curved sea under the glass, its swell rising and
// falling, almost touching the dome; a consideration is a surge that reaches the glass, and where
// it touches, a purple zap, and the thought passes through (ignition at the threshold)
const CZ = Z0 - ((ROWS - 1) * SP) / 2;
const DOME_R = 29, DOME_SY = 0.3, DOME_Y0 = -0.6;
const COST_H = 1.2;
const domeY = (x, z) => DOME_Y0 + DOME_SY * Math.sqrt(Math.max(0, DOME_R * DOME_R - x * x - (z - CZ) * (z - CZ)));
function swellAt(x, z, t, fx) {
  const dz = z - CZ;
  const env = Math.max(0, Math.min(1, 1 - (x * x + dz * dz) / (DOME_R * DOME_R)));
  const wn = (Math.sin(x * 0.18 + t * 0.9) + 0.8 * Math.sin(z * 0.23 - t * 0.7 + 1.3) + 1.2 * Math.sin((x + z) * 0.11 + t * 0.5)) / 3;
  const chop = 0.35 * Math.sin(x * 0.55 - t * 1.7) * Math.sin(z * 0.47 + t * 1.3) + 0.22 * Math.sin((x - z) * 0.8 + t * 2.3);
  return env * (2.9 + (1.8 + 2.6 * fx) * wn + (0.6 + 0.8 * fx) * chop);
}
const surgeProfile = age => (age <= 0 || age >= 2.4 ? 0 : age < 0.9 ? (t => t * t * (3 - 2 * t))(age / 0.9) : age < 1.2 ? 1 : 1 - (t => t * t * (3 - 2 * t))((age - 1.2) / 1.2));
const SEA_GLSL = /* glsl */`
  float swell(vec2 q, float t, float fx) {
    vec2 d = q - vec2(0.0, ${CZ.toFixed(3)});
    float env = clamp(1.0 - dot(d, d) / ${(DOME_R * DOME_R).toFixed(1)}, 0.0, 1.0);
    float wn = (sin(q.x * 0.18 + t * 0.9) + 0.8 * sin(q.y * 0.23 - t * 0.7 + 1.3) + 1.2 * sin((q.x + q.y) * 0.11 + t * 0.5)) / 3.0;
    float chop = 0.35 * sin(q.x * 0.55 - t * 1.7) * sin(q.y * 0.47 + t * 1.3) + 0.22 * sin((q.x - q.y) * 0.8 + t * 2.3);
    return env * (2.9 + (1.8 + 2.6 * fx) * wn + (0.6 + 0.8 * fx) * chop);
  }
  float surgeProfile(float age) {
    if (age <= 0.0 || age >= 2.4) return 0.0;
    if (age < 0.9) return smoothstep(0.0, 0.9, age);
    if (age < 1.2) return 1.0;
    return 1.0 - smoothstep(1.2, 2.4, age);
  }`;

// what comes to mind about a thing (a few the author named; the rest generic), each with its
// feeling (-1 cool, +1 warm) and its cost (0 easy, 1 hard)
const CONSIDERATIONS = {
  'cut the grass': [['the weather', -0.3, 0.3], ['when does it get dark?', 0.4, 0.5], ['is it going to rain tomorrow?', 0.5, 0.4],
    ['the mower needs petrol', 0.6, 0.7], ['my back', 0.7, 0.8], ['the neighbours are out', -0.6, 0.2]],
};
const GENERIC = ['is it the right time?', 'what will it cost?', 'who else is involved?', 'am I tired?', 'what if it goes wrong?', 'will I feel better after?'];
export const TODOS = ['cut the grass', 'book the dentist', 'answer the email', 'fix the bike', 'call mum', 'go skiing on Saturday'];

function rand(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

function textSprite(text, color, w = 8) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 128;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.font = '44px "Space Mono", monospace';
  g.shadowColor = color; g.shadowBlur = 16;
  g.fillStyle = '#ffffff';
  g.fillText(text, 512, 78);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false }));
  s.scale.set(w, w / 8, 1);
  return s;
}

// options: { loop: start again by itself (THE PATHS place) }
export function createPaths3D({ loop = true } = {}) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  let rnd = rand(1966);
  scene.environment = bubbleEnvironment(renderer);   // the thoughts over the dome are soap films

  // the holes, as a small texture the ground reads: R cost, G feeling (red), B set
  const data = new Uint8Array(COLS * ROWS * 4);
  const tex = new THREE.DataTexture(data, COLS, ROWS, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const holes = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) holes.push({ i, j, x: X0 + i * SP, z: Z0 - j * SP, c: 0, r: 0.5, set: false, lie: 'SAFE' });
  const ripples = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0));
  const surges = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0));
  const zapsAt = [new THREE.Vector4(0, 0, 0, -100), new THREE.Vector4(0, 0, 0, -100)];
  const U = { uHoles: { value: tex }, uTime: { value: 0 }, uRip: { value: ripples }, uSurge: { value: surges }, uFX: { value: 0.5 } };
  let fxNow = 0.5;

  // THE COURSE: one ground, the holes' heights and colours read from the texture; three small
  // wells in every hole (SAFE ahead, FIGHT and FREEZE behind); ripples running across it
  const geo = new THREE.PlaneGeometry(66, 48, 330, 240);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, Z0 - ((ROWS - 1) * SP) / 2);
  scene.add(new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: /* glsl */`
      uniform sampler2D uHoles; uniform float uTime; uniform vec4 uRip[4]; uniform vec4 uSurge[4]; uniform float uFX;
      varying vec3 vCol; varying float vRip; varying float vH; varying vec3 vP; varying float vSea;
      ${SEA_GLSL}
      void main() {
        vec3 p = position;
        float u = (p.x - (${X0.toFixed(2)})) / ${SP.toFixed(2)};
        float v = (${Z0.toFixed(2)} - p.z) / ${SP.toFixed(2)};
        vec4 h = texture2D(uHoles, vec2((u + 0.5) / ${COLS}.0, (v + 0.5) / ${ROWS}.0));
        float lu = fract(u + 0.5) - 0.5, lv = fract(v + 0.5) - 0.5;
        float dips = -0.5 * exp(-(lu * lu + (lv - 0.15) * (lv - 0.15)) / 0.012)
                     -0.35 * exp(-((lu + 0.25) * (lu + 0.25) + (lv + 0.15) * (lv + 0.15)) / 0.01)
                     -0.35 * exp(-((lu - 0.25) * (lu - 0.25) + (lv + 0.15) * (lv + 0.15)) / 0.01);
        float edge = step(-0.6, u) * step(u, ${COLS - 1}.6) * step(-0.6, v) * step(v, ${ROWS - 1}.6);
        float y = (h.r * ${COST_H.toFixed(2)} * h.b + dips + 0.18 * (lu * lu + lv * lv)) * edge;
        float rip = 0.0;
        for (int k = 0; k < 4; k++) {
          float age = uTime - uRip[k].z;
          if (uRip[k].w > 0.5 && age > 0.0 && age < 4.0) {
            float d = distance(p.xz, uRip[k].xy);
            rip += exp(-pow(d - age * 6.0, 2.0) / 2.0) * exp(-age * 0.6);
          }
        }
        y += 0.45 * rip;
        // the sea under it all, and the surges that reach for the glass
        float sea = swell(p.xz, uTime, uFX);
        for (int k = 0; k < 4; k++) if (uSurge[k].w > 0.0) sea += uSurge[k].w * surgeProfile(uTime - uSurge[k].z) * exp(-dot(p.xz - uSurge[k].xy, p.xz - uSurge[k].xy) / 7.0);
        y += sea;
        vSea = sea;
        p.y = y;
        vec3 cool = vec3(0.08, 0.62, 1.0), warm = vec3(1.0, 0.18, 0.32), unset = vec3(0.16, 0.13, 0.3);
        vCol = mix(unset, mix(cool, warm, h.g), h.b) * edge;
        vRip = rip; vH = y - sea; vP = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      varying vec3 vCol; varying float vRip; varying float vH; varying vec3 vP; varying float vSea;
      void main() {
        float line = smoothstep(0.44, 0.49, abs(fract(vH * 2.2) - 0.5));
        // the swell's crests catch the light: the higher, the brighter, violet towards the glass
        float crest = smoothstep(3.0, 7.5, vSea);
        vec3 col = vCol * (0.28 + 0.5 * line) + vec3(0.9, 0.95, 1.0) * vRip * 0.35 + vec3(0.45, 0.25, 0.9) * crest * 0.35 + vec3(0.1, 0.2, 0.45) * (0.5 + 0.5 * sin(vSea * 3.0)) * 0.12;
        float fog = smoothstep(26.0, 36.0, length(vP.xz - vec2(0.0, -0.3)));
        gl_FragColor = vec4(col, 1.0 - fog);
      }`,
    transparent: true,
  })));

  // the balls: one per hole, in the well its reading fits
  const balls = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }), holes.length);
  scene.add(balls);
  const o = new THREE.Object3D();
  const seaAt = (x, z) => {
    let y = swellAt(x, z, U.uTime.value, fxNow);
    for (const sg of surges) if (sg.w > 0) y += sg.w * surgeProfile(U.uTime.value - sg.z) * Math.exp(-((x - sg.x) ** 2 + (z - sg.y) ** 2) / 7);
    return y;
  };
  const placeBalls = () => {
    holes.forEach((h, k) => balls.setColorAt(k, new THREE.Color(LIE_COLOR[h.lie])));
    if (balls.instanceColor) balls.instanceColor.needsUpdate = true;
  };
  // every frame: the balls ride the swell in their wells
  const moveBalls = () => {
    holes.forEach((h, k) => {
      const [lx, lz, dip] = LIE[h.lie];
      const x = h.x + lx * SP, z = h.z - lz * SP;
      o.position.set(x, h.set ? h.c * COST_H + dip + 0.14 + seaAt(x, z) : -50, z);
      o.updateMatrix();
      balls.setMatrixAt(k, o.matrix);
    });
    balls.instanceMatrix.needsUpdate = true;
  };
  const writeTex = () => {
    holes.forEach((h, k) => data.set([Math.round(h.c * 255), Math.round(h.r * 255), h.set ? 255 : 0, 255], k * 4));
    tex.needsUpdate = true;
  };

  // the easiest way through, once it has settled: front to back, the cheapest, coolest next hole
  let route = null;
  const drawRoute = () => {
    if (route) { scene.remove(route); route.geometry.dispose(); }
    const score = h => (h.set ? h.c + h.r : 1.2);
    let i = 0;
    for (let k = 1; k < COLS; k++) if (score(holes[k]) < score(holes[i])) i = k;
    const pts = [];
    for (let j = 0; j < ROWS; j++) {
      if (j > 0) {
        let best = i;
        for (const di of [-1, 1]) { const ni = i + di; if (ni >= 0 && ni < COLS && score(holes[j * COLS + ni]) < score(holes[j * COLS + best])) best = ni; }
        i = best;
      }
      const h = holes[j * COLS + i];
      pts.push(new THREE.Vector3(h.x, (h.set ? h.c * COST_H : 0) + 0.6, h.z));
    }
    const curve = new THREE.CatmullRomCurve3(pts).getPoints(120);
    route = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve), new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 }));
    route.userData.base = curve.map(q => q.y);
    scene.add(route);
  };

  // THE DOME: the threshold over the course, glass, its rim catching the light
  const dome = new THREE.Mesh(new THREE.SphereGeometry(DOME_R, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.ShaderMaterial({
    uniforms: { uGlow: { value: 0 }, uTime: U.uTime, uZap: { value: zapsAt } },
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying vec3 vP; void main() { vP = position; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: /* glsl */`
      uniform float uGlow; uniform float uTime; uniform vec4 uZap[2]; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main() {
        float rim = pow(1.0 - abs(dot(vN, vV)), 3.0);
        // where a surge touched: the glass flares violet and fades
        float zap = 0.0;
        for (int k = 0; k < 2; k++) { float age = uTime - uZap[k].w; if (age >= 0.0 && age < 1.5) zap += exp(-dot(vP - uZap[k].xyz, vP - uZap[k].xyz) / 60.0) * exp(-age * 2.6); }
        float bands = 0.5 + 0.5 * sin(vP.y * 1.2 - uTime * 0.8);
        vec3 c = vec3(1.0, 0.8, 0.35) * (0.008 + 0.16 * pow(rim, 1.5) + 0.01 * bands) * (1.0 + 2.5 * uGlow);   // the glass, quieter than the course (GPT review, fix 9)
        c += vec3(0.72, 0.32, 1.0) * zap * 1.6;
        gl_FragColor = vec4(c, 1.0);
      }`,
  }));
  dome.scale.set(1, DOME_SY, 1);
  dome.position.set(0, DOME_Y0, CZ);
  dome.renderOrder = 2;
  scene.add(dome);
  const domeTop = DOME_R * DOME_SY + DOME_Y0;
  // THE ZAP: where a surge touches the glass, a violet bolt up from the crest and crawling over the
  // dome, flickering for a moment; the glass flares there (uZap)
  const zaps = [];
  const zapMat = new THREE.LineBasicMaterial({ color: '#c77dff', transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false });
  let zapSlot = 0;
  let flashT = null;
  const flashTex = () => {
    if (flashT) return flashT;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(210,150,255,0.8)'); gr.addColorStop(1, 'rgba(120,40,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    flashT = new THREE.CanvasTexture(c);
    return flashT;
  };
  function zap(x, z) {
    const top = domeY(x, z);
    const geo = new THREE.BufferGeometry();
    const line = new THREE.LineSegments(geo, zapMat.clone());
    line.renderOrder = 4;
    scene.add(line);
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashTex(), color: '#d9a6ff', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    flash.position.set(x, top, z);
    flash.renderOrder = 5;
    scene.add(flash);
    zaps.push({ x, z, top, born: U.uTime.value, line, flash });
    zapsAt[zapSlot].set(x, (top - DOME_Y0) / DOME_SY, z - CZ, U.uTime.value);
    zapSlot = (zapSlot + 1) % zapsAt.length;
  }
  function drawZap(zp, age) {
    const pts = [];
    const jag = (a, b, n, spread) => {
      let prev = a.clone();
      for (let k = 1; k <= n; k++) {
        const q = a.clone().lerp(b, k / n);
        if (k < n) q.add(new THREE.Vector3((rnd() - 0.5) * spread, (rnd() - 0.5) * spread * 0.5, (rnd() - 0.5) * spread));
        for (const d of [0, 0.06, -0.06]) pts.push(prev.clone().addScalar(d), q.clone().addScalar(d));
        prev = q;
      }
    };
    const top = new THREE.Vector3(zp.x, zp.top, zp.z);
    jag(new THREE.Vector3(zp.x, zp.top - 2.2, zp.z), top, 7, 0.9);
    // branches crawling over the glass
    for (let b = 0; b < 4; b++) {
      const a = rnd() * Math.PI * 2, r = 2.5 + rnd() * 4.5 * Math.min(1, age * 5);
      const ex = zp.x + Math.cos(a) * r, ez = zp.z + Math.sin(a) * r;
      const steps = 6;
      let prev = top.clone();
      for (let k = 1; k <= steps; k++) {
        const t = k / steps;
        const qx = zp.x + (ex - zp.x) * t + (rnd() - 0.5) * 0.8, qz = zp.z + (ez - zp.z) * t + (rnd() - 0.5) * 0.8;
        const q = new THREE.Vector3(qx, domeY(qx, qz) + 0.05, qz);
        for (const d of [0, 0.05]) pts.push(prev.clone().addScalar(d), q.clone().addScalar(d));
        prev = q;
      }
    }
    zp.line.geometry.dispose();
    zp.line.geometry = new THREE.BufferGeometry().setFromPoints(pts);
    zp.line.material.opacity = Math.max(0, 1 - age / 0.55) * (0.55 + 0.45 * rnd());
    zp.flash.material.opacity = Math.max(0, 1 - age / 0.5) * (0.7 + 0.3 * rnd());
    zp.flash.scale.setScalar(3 + 5 * age);
  }
  // things that happen on the course's own clock (so PAUSE holds them too)
  const later = [];
  // THE THOUGHTS OVER THE DOME: considerations that crossed, one after another, at most four
  const pops = [];
  const SLOTS = [-12, -4, 4, 12];
  function popThought(name, feel, from) {
    const live = pops.filter(q => !q.sinking);
    if (live.length >= 4) live[0].sinking = true;
    const used = new Set(pops.filter(q => !q.sinking).map(q => q.slot));
    const slot = SLOTS.findIndex((_, k) => !used.has(k));
    const color = feel > 0 ? '#ff3b6e' : '#3fb8ff';
    const g = new THREE.Group();
    const s = new THREE.Mesh(new THREE.SphereGeometry(1.2, 48, 24), bubbleMaterial({ tint: color, opacity: 0.5 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.05, 8, 64), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
    const tag = textSprite(name, color, 9);
    tag.position.y = 2.2;
    g.add(s, ring, tag);
    g.position.set(from.x, domeY(from.x, from.z), from.z);
    g.renderOrder = 3;
    scene.add(g);
    pops.push({ g, s, ring, tag, slot: Math.max(0, slot), sinking: false, from: from.clone(), age: 0 });
  }
  function meltAll() { for (const q of pops) q.sinking = true; }

  let label = '';
  let queue = [];
  let state = { phase: 'ready', t: 0, next: 0, verdict: '', stress: 0, stays: false };
  const tags = [];
  let onEnd = null;
  let paused = false;

  function stats() {
    const set = holes.filter(h => h.set);
    if (!set.length) return { meanR: 0.5, dis: 0, spread: 0, stress: 0, n: 0 };
    const meanR = set.reduce((a, h) => a + h.r, 0) / set.length;
    const dis = set.reduce((a, h) => a + h.c * (1 - h.r) + (1 - h.c) * h.r, 0) / set.length;
    const spread = Math.sqrt(set.reduce((a, h) => a + (h.r - meanR) ** 2, 0) / set.length);
    const stress = Math.min(1, 0.7 * dis + 1.1 * spread);
    return { meanR, dis, spread, stress, n: set.length };
  }
  function verdictOf(s) {
    if (s.meanR < 0.4 && s.stress < 0.42) return { text: 'mostly blue and easy: an obvious do', clear: true };
    if (s.meanR > 0.6 && s.stress < 0.42) return { text: 'mostly red and hard: an obvious don\'t', clear: true };
    return { text: `mixed: height and colour disagree, stress ${Math.round(100 * s.stress)}%`, clear: false };
  }

  function consider(now) {
    const [name, feel, cost] = queue.shift();
    const h0 = holes[Math.floor(rnd() * holes.length)];
    const rip = ripples.find(r => r.w < 0.5 || now - r.z > 4) ?? ripples[0];
    rip.set(h0.x, h0.z, now, 1);
    // it crosses the dome when it is strong enough (here, every consideration that is not trivial):
    // a surge rises from the sea to the glass; where it touches, the zap, and the thought passes
    if (Math.abs(feel) + cost > 0.35) {
      const sg = surges.find(q => U.uTime.value - q.z > 2.4) ?? surges[0];
      const reach = domeY(h0.x, h0.z) + 0.2 - swellAt(h0.x, h0.z, now + 0.9, fxNow);
      sg.set(h0.x, h0.z, now, Math.max(0.5, reach));
      later.push({ at: now + 0.9, fn: () => { zap(h0.x, h0.z); popThought(name, feel, new THREE.Vector3(h0.x, 0, h0.z)); } });
    }
    // the holes the ripple will reach take the consideration's colour and cost, with scatter;
    // a hole already set blends the two (a later thought revises an earlier one)
    for (const h of holes) {
      const d = Math.hypot(h.x - h0.x, h.z - h0.z);
      if (d > 13) continue;
      h.pending = { at: now + d / 6, r: Math.min(1, Math.max(0, 0.5 + 0.5 * feel + (rnd() - 0.5) * 0.5)), c: Math.min(1, Math.max(0, cost + (rnd() - 0.5) * 0.45)) };
    }
  }

  function start(text) {
    label = text;
    rnd = rand([...text].reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) >>> 0);
    for (const h of holes) { h.set = false; h.c = 0; h.r = 0.5; h.lie = 'SAFE'; h.pending = null; }
    for (const t of tags) scene.remove(t.tag);
    tags.length = 0;
    for (const q of pops) scene.remove(q.g);
    pops.length = 0;
    if (route) { scene.remove(route); route = null; }
    ripples.forEach(r => r.set(0, 0, -100, 0));
    const known = CONSIDERATIONS[text];
    queue = known ? known.map(x => [...x]) : GENERIC.map(n => [n, (rnd() - 0.5) * 1.8, rnd()]);
    queue.sort(() => rnd() - 0.5);
    state = { phase: 'considering', t: 0, next: 0.8, verdict: '', stress: 0, stays: false, solution: 0 };
    later.length = 0;
    writeTex();
    placeBalls();
  }

  let last = 0;
  let clock = 0;
  let restartAt = 0;
  return {
    canvas,
    start,
    set onEnd(fn) { onEnd = fn; },
    get phase() { return state.phase; },
    get label() { return label; },
    get verdict() { return state.verdict; },
    get stress() { return state.stress; },
    // POKE: one more consideration now (or, when it is over, begin again)
    poke() {
      if (state.phase === 'considering') { if (!queue.length) queue.push([GENERIC[Math.floor(rnd() * GENERIC.length)], (rnd() - 0.5) * 1.8, rnd()]); state.next = 0; }
      else start(label || TODOS[0]);
    },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // PAUSE: the course holds still to be read (the camera still turns by hand)
    pause(on) { paused = on ?? !paused; },
    get paused() { return paused; },
    // state: { time, phi, stereo, labels }
    render(s) {
      const dt = paused ? 0 : Math.min(0.05, last ? s.time - last : 0.016);
      last = s.time;
      clock += dt;
      U.uTime.value = clock;
      fxNow = Math.max(0, Math.min(1, s.phi ?? 0.5));
      U.uFX.value = fxNow;
      tickBubbles(clock);
      for (let k = later.length - 1; k >= 0; k--) if (clock >= later[k].at) { const f = later[k].fn; later.splice(k, 1); f(); }
      moveBalls();
      if (route) { const pa = route.geometry.attributes.position; for (let k = 0; k < pa.count; k++) pa.setY(k, route.userData.base[k] + seaAt(pa.getX(k), pa.getZ(k))); pa.needsUpdate = true; }
      for (let k = zaps.length - 1; k >= 0; k--) {
        const age = clock - zaps[k].born;
        if (age > 0.6) { scene.remove(zaps[k].line, zaps[k].flash); zaps[k].line.geometry.dispose(); zaps[k].line.material.dispose(); zaps[k].flash.material.dispose(); zaps.splice(k, 1); }
        else drawZap(zaps[k], age);
      }
      if (state.phase === 'ready' && loop) start(TODOS[Math.floor(rnd() * TODOS.length)]);
      if (state.phase === 'considering') {
        state.t += dt;
        state.next -= dt * (0.6 + 0.8 * (s.phi ?? 0.5));
        if (state.next <= 0 && queue.length) { consider(clock); state.next = 2.4; }
        let changed = false;
        for (const h of holes) {
          if (h.pending && clock >= h.pending.at) {
            const p = h.pending;
            h.r = h.set ? (h.r + p.r) / 2 : p.r;
            h.c = h.set ? (h.c + p.c) / 2 : p.c;
            h.set = true;
            h.lie = h.r < 0.45 ? 'SAFE' : h.c > 0.6 ? 'FREEZE' : 'FIGHT';
            h.pending = null;
            changed = true;
          }
        }
        if (changed) { writeTex(); placeBalls(); }
        const st = stats();
        state.stress = st.stress;
        state.verdict = st.n ? verdictOf(st).text : '';
        if (!queue.length && !holes.some(h => h.pending) && state.next < -1.5) {
          const v = verdictOf(st);
          state.phase = 'done';
          state.stays = !v.clear;
          state.verdict = v.clear ? `SOLUTION · ${v.text}: the thoughts melt back down` : `${v.text}: it stays, below the line`;
          if (v.clear) { drawRoute(); meltAll(); state.solution = clock; }
          restartAt = clock + 5;
          onEnd?.({ label, stays: state.stays, verdict: v.text, stress: st.stress });
        }
      } else if (state.phase === 'done' && loop && clock > restartAt) start(TODOS[(TODOS.indexOf(label) + 1) % TODOS.length]);
      for (let k = tags.length - 1; k >= 0; k--) {
        const age = clock - tags[k].born;
        tags[k].tag.material.opacity = Math.max(0, 1 - age / 4);
        tags[k].tag.visible = s.labels !== false;
        tags[k].tag.position.y = 3.2 + 0.3 * age;
        if (age > 4) { scene.remove(tags[k].tag); tags.splice(k, 1); }
      }
      // the thoughts over the dome: rise from where they crossed to their place above it; when a
      // fifth comes, or at the solution, they melt back down through the glass
      for (let k = pops.length - 1; k >= 0; k--) {
        const q = pops[k];
        q.age += dt;
        const goal = q.sinking ? new THREE.Vector3(q.from.x, -1, q.from.z) : new THREE.Vector3(SLOTS[q.slot], domeTop + 4.2, CZ + 2);
        q.g.position.lerp(goal, Math.min(1, dt * (q.sinking ? 1.2 : 1.6)));
        q.ring.rotation.x += dt * 0.6;
        q.tag.visible = s.labels !== false && !q.sinking;
        if (q.sinking) { q.s.material.opacity *= 1 - dt * 0.9; q.ring.material.opacity *= 1 - dt * 0.9; }
        if (q.sinking && q.g.position.y < 0.5) { scene.remove(q.g); q.g.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); }); pops.splice(k, 1); }
      }
      dome.material.uniforms.uGlow.value = state.solution ? Math.max(0, 1 - (clock - state.solution) / 2.5) : 0;
      // the camera: back and above, the dome and the thoughts over it in view
      const a = 0.16 * Math.sin(clock * 0.05);
      camera.position.set(Math.sin(a) * 30, 22, 46 + 2 * Math.sin(clock * 0.07));
      camera.lookAt(0, 4, -3);
      applyLook(camera);
      renderer.getSize(size);
      if (s.stereo === 'half' || s.stereo === 'full') {
        camera.aspect = s.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereo, camera, 0.2);
        renderer.setScissorTest(true);
        for (const [x, eye] of [[0, stereo.cameraL], [size.x / 2, stereo.cameraR]]) {
          renderer.setViewport(x, 0, size.x / 2, size.y);
          renderer.setScissor(x, 0, size.x / 2, size.y);
          renderer.render(scene, eye);
        }
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, size.x, size.y);
        return;
      }
      camera.aspect = size.x / size.y;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    },
  };
}
