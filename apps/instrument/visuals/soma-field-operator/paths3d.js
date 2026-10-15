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
// suggestive). Interpretive: pictures of the model's terms, not of a brain.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const COLS = 14, ROWS = 10, SP = 3.4;
const X0 = -((COLS - 1) * SP) / 2, Z0 = 15;
const LIE = { SAFE: [0, 0.15, -0.5], FIGHT: [-0.25, -0.15, -0.35], FREEZE: [0.25, -0.15, -0.35] };
const LIE_COLOR = { SAFE: '#9fe8ff', FIGHT: '#ff3b4e', FREEZE: '#c8c8ff' };

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

  // the holes, as a small texture the ground reads: R cost, G feeling (red), B set
  const data = new Uint8Array(COLS * ROWS * 4);
  const tex = new THREE.DataTexture(data, COLS, ROWS, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const holes = [];
  for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) holes.push({ i, j, x: X0 + i * SP, z: Z0 - j * SP, c: 0, r: 0.5, set: false, lie: 'SAFE' });
  const ripples = Array.from({ length: 4 }, () => new THREE.Vector4(0, 0, -100, 0));
  const U = { uHoles: { value: tex }, uTime: { value: 0 }, uRip: { value: ripples } };

  // THE COURSE: one ground, the holes' heights and colours read from the texture; three small
  // wells in every hole (SAFE ahead, FIGHT and FREEZE behind); ripples running across it
  const geo = new THREE.PlaneGeometry(66, 48, 330, 240);
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, 0, Z0 - ((ROWS - 1) * SP) / 2);
  scene.add(new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: /* glsl */`
      uniform sampler2D uHoles; uniform float uTime; uniform vec4 uRip[4];
      varying vec3 vCol; varying float vRip; varying float vH; varying vec3 vP;
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
        float y = (h.r * 2.0 * h.b + dips + 0.18 * (lu * lu + lv * lv)) * edge;
        float rip = 0.0;
        for (int k = 0; k < 4; k++) {
          float age = uTime - uRip[k].z;
          if (uRip[k].w > 0.5 && age > 0.0 && age < 4.0) {
            float d = distance(p.xz, uRip[k].xy);
            rip += exp(-pow(d - age * 6.0, 2.0) / 2.0) * exp(-age * 0.6);
          }
        }
        y += 0.45 * rip;
        p.y = y;
        vec3 cool = vec3(0.08, 0.62, 1.0), warm = vec3(1.0, 0.18, 0.32), unset = vec3(0.16, 0.13, 0.3);
        vCol = mix(unset, mix(cool, warm, h.g), h.b) * edge;
        vRip = rip; vH = y; vP = p;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      varying vec3 vCol; varying float vRip; varying float vH; varying vec3 vP;
      void main() {
        float line = smoothstep(0.44, 0.49, abs(fract(vH * 2.2) - 0.5));
        vec3 col = vCol * (0.28 + 0.5 * line) + vec3(0.9, 0.95, 1.0) * vRip * 0.35;
        float fog = smoothstep(26.0, 36.0, length(vP.xz - vec2(0.0, -0.3)));
        gl_FragColor = vec4(col, 1.0 - fog);
      }`,
    transparent: true,
  })));

  // the balls: one per hole, in the well its reading fits
  const balls = new THREE.InstancedMesh(new THREE.SphereGeometry(0.16, 12, 8), new THREE.MeshBasicMaterial({ color: '#ffffff' }), holes.length);
  scene.add(balls);
  const o = new THREE.Object3D();
  const placeBalls = () => {
    holes.forEach((h, k) => {
      const [lx, lz, dip] = LIE[h.lie];
      o.position.set(h.x + lx * SP, h.set ? h.c * 2 + dip + 0.14 : -50, h.z - lz * SP);
      o.updateMatrix();
      balls.setMatrixAt(k, o.matrix);
      balls.setColorAt(k, new THREE.Color(LIE_COLOR[h.lie]));
    });
    balls.instanceMatrix.needsUpdate = true;
    if (balls.instanceColor) balls.instanceColor.needsUpdate = true;
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
      pts.push(new THREE.Vector3(h.x, (h.set ? h.c * 2 : 0) + 0.6, h.z));
    }
    route = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3(pts).getPoints(120)), new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.9 }));
    scene.add(route);
  };

  let label = '';
  let queue = [];
  let state = { phase: 'ready', t: 0, next: 0, verdict: '', stress: 0, stays: false };
  const tags = [];
  let onEnd = null;

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
    const tag = textSprite(name, feel > 0 ? '#ff5a6e' : '#5ee7ff', 7);
    tag.position.set(h0.x, 3.2, h0.z);
    scene.add(tag);
    tags.push({ tag, born: now });
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
    if (route) { scene.remove(route); route = null; }
    ripples.forEach(r => r.set(0, 0, -100, 0));
    const known = CONSIDERATIONS[text];
    queue = known ? known.map(x => [...x]) : GENERIC.map(n => [n, (rnd() - 0.5) * 1.8, rnd()]);
    queue.sort(() => rnd() - 0.5);
    state = { phase: 'considering', t: 0, next: 0.8, verdict: '', stress: 0, stays: false };
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
    // state: { time, phi, stereo, labels }
    render(s) {
      const dt = Math.min(0.05, last ? s.time - last : 0.016);
      last = s.time;
      clock += dt;
      U.uTime.value = clock;
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
          state.verdict = v.clear ? `${v.text}: resolved` : `${v.text}: it stays, below the line`;
          if (v.clear) drawRoute();
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
      // the camera: above the front of the course, looking along it
      const a = 0.18 * Math.sin(clock * 0.05);
      camera.position.set(Math.sin(a) * 22, 15, 27 + 2 * Math.sin(clock * 0.07));
      camera.lookAt(0, -1, -4);
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
