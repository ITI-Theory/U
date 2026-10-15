// minigolf3d.js: THE MINI GOLF in LANDSCAPE (author, 15 Oct 23:25: "a six-hole mini golf, with
// paths joining all six up, some bigger than others; paths could be wires, fairways, bridges").
// The six holes are the model's basins (HAL-UAT 15 Oct, checked against the repository):
// SAFE, FIGHT, FLIGHT, FREEZE (the four basins of mathematical-co-identification.md) and AWE,
// GRIEF (QUANT-EXP-1's {Awe, Grief} ground state, FIELD-NOTES). The ball is the state; a path
// is a way from one basin to another, wide where the barrier is low and the crossing frequent
// (a FAIRWAY), thin where it is high and rare (a WIRE), steep and one-way into FREEZE (a SLIDE),
// a BRIDGE that is there only with the resource (J: help lowers the barrier), a TUNNEL for
// barrier tunnelling (WKB; QUANT-EXP-1 is a simulation: an open hypothesis). Every path has two
// lanes, one each way, of different widths: easy into FREEZE, hard out. Φ heats the field: the
// ball hops more. THE WORRY BALLS (author): ghosts that run imagined paths; they never move the
// real ball, but their pull is felt (BRECVEMA's V, visual imagery: an endogenous source,
// J_internal) and the more there are, the more the real ball is drawn their way. The widths
// illustrate the model's stated barriers, qualitatively; they are not computed rates.
// Interpretive throughout.
// Two views (author, 16 Oct 00:09): 2D, this course seen flat from above, a map; 3D, a Star Trek
// three-dimensional chess frame floating over the single LANDSCAPE (explorer3d.js), its boards
// at heights that follow energy: FIGHT and FLIGHT raised (aroused), SAFE the main board, FREEZE
// sunken, AWE and GRIEF lowest (QUANT-EXP-1's ground state) behind a tall ridge.

import * as THREE from 'three';
import { applyLook } from './look.js';
import { updateStereo } from './stereo-depth.js';
import { bubbleMaterial, bubbleEnvironment, tickBubbles } from './bubble.js';

export const HOLES = {
  SAFE: { at: [0, 0, 6], color: '#5ee7ff', depth: 1.0, note: 'regulated calm' },
  FIGHT: { at: [-8.5, 0.6, 2], color: '#ff3b4e', depth: 0.7, note: 'mobilised, towards' },
  FLIGHT: { at: [8.5, 0.6, 2], color: '#ffd166', depth: 0.7, note: 'mobilised, away' },
  FREEZE: { at: [0, -3, -8], color: '#bfe8ff', depth: 1.2, note: 'shutdown; deep, hard to leave' },
  AWE: { at: [-9, 3.6, -15], color: '#a78bfa', depth: 0.9, note: 'remote; past a high ridge' },
  GRIEF: { at: [8, -4, -16], color: '#4b6bff', depth: 1.3, note: 'loss; deep' },
};
// the chess frame: [x, y, z, board size]
export const CHESS = {
  SAFE: [0, 0, 4, 5], FIGHT: [-7, 3, 1, 2.6], FLIGHT: [7, 3, 1, 2.6],
  FREEZE: [0, -3, -4, 3.4], AWE: [-6, -5.5, -12, 3], GRIEF: [6, -6, -12.5, 3],
};
const RIDGE = { z: -8.2, bottom: -6.5, top: 4.5, width: 20 };
// [a, b, type, width a→b, width b→a]; the model's words in the notes (HAL-UAT, Movie.lean)
export const PATHS = [
  ['SAFE', 'FIGHT', 'fairway', 0.7, 0.5],
  ['SAFE', 'FLIGHT', 'fairway', 0.7, 0.5],
  ['FIGHT', 'FLIGHT', 'fairway', 0.55, 0.55],
  ['FIGHT', 'FREEZE', 'slide', 0.6, 0.06],      // easy in, hard out
  ['FLIGHT', 'FREEZE', 'slide', 0.6, 0.06],
  ['FREEZE', 'SAFE', 'bridge', 0.5, 0.0],       // out of FREEZE: only with the resource
  ['FREEZE', 'AWE', 'tunnel', 0.12, 0.0],       // fear to awe by tunnelling (simulated, open)
  ['FIGHT', 'AWE', 'wire', 0.06, 0.15],         // the cold classical crossing: almost never
  ['AWE', 'GRIEF', 'fairway', 0.45, 0.1],       // "awe opens grief" (Movie.lean, +0.30)
  ['GRIEF', 'SAFE', 'wire', 0.2, 0.05],         // the slow way home; grief lingers
  ['AWE', 'SAFE', 'wire', 0.25, 0.04],
];
const PULL_TO = new Set(['FIGHT', 'FREEZE', 'GRIEF']);   // where worries tend to run

function rand(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

function textSprite(text, color, sub = '') {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.shadowColor = color; g.shadowBlur = 16;
  g.fillStyle = '#ffffff';
  g.font = '700 54px "Space Mono", monospace';
  g.fillText(text, 256, 62);
  if (sub) { g.shadowBlur = 0; g.fillStyle = 'rgba(232,238,252,0.75)'; g.font = '26px "Space Mono", monospace'; g.fillText(sub, 256, 106); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false }));
  s.scale.set(0.2, 0.05, 1);
  s.renderOrder = 6;
  return s;
}

// the six holes, the lanes, the ball and the worries, built into a group: layout 'flat' (the
// map) or 'chess' (the frame); the caller adds the group to its scene and calls update
export function buildGolf({ layout = 'flat', ground: withGround = true } = {}) {
  const scene = new THREE.Group();
  const rnd = rand(1966);
  const chess = layout === 'chess';

  // the ground: a dark neon grid, the great hall's palette
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec3 vP; void main() { vP = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vP, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; varying vec3 vP;
      void main() {
        vec2 g = abs(fract(vP.xz * 0.5) - 0.5);
        float line = smoothstep(0.47, 0.5, max(g.x, g.y));
        float fade = exp(-length(vP.xz - vec2(0.0, -3.0)) * 0.05);
        vec3 c = mix(vec3(0.02, 0.015, 0.05), vec3(0.35, 0.2, 0.75), line * 0.6) * fade;
        gl_FragColor = vec4(c, 1.0);
      }`,
  }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -4.6;
  if (withGround) scene.add(ground);
  // THE FRAME (chess): a board under each hole, the central column and its arms, the ridge
  if (chess) {
    const chrome = new THREE.MeshStandardMaterial({ color: '#9fb4d8', metalness: 0.8, roughness: 0.3, emissive: '#2a3a66', emissiveIntensity: 0.4 });
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 12, 16), chrome);
    col.position.set(0, -1.2, -3.5);
    scene.add(col);
    for (const [id, [x, y, z, w]] of Object.entries(CHESS)) {
      const c = HOLES[id].color;
      const board = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, w), new THREE.MeshStandardMaterial({ color: new THREE.Color(c).multiplyScalar(0.15), emissive: c, emissiveIntensity: 0.12, transparent: true, opacity: 0.55, roughness: 0.4 }));
      board.position.set(x, y - 0.05, z);
      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(board.geometry), new THREE.LineBasicMaterial({ color: c }));
      edges.position.copy(board.position);
      // the checks: a lattice of squares, as on the Enterprise's boards
      const checks = new THREE.Mesh(new THREE.PlaneGeometry(w, w, 4, 4), new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.35 }));
      checks.rotation.x = -Math.PI / 2;
      checks.position.set(x, y + 0.01, z);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 8), chrome);
      const from = new THREE.Vector3(0, y - 0.05, -3.5), to = new THREE.Vector3(x, y - 0.05, z);
      arm.position.copy(from).lerp(to, 0.5);
      arm.scale.y = Math.max(0.01, from.distanceTo(to) - w * 0.5);
      arm.lookAt(to); arm.rotateX(Math.PI / 2);
      scene.add(board, edges, checks, arm);
    }
    // the ridge: a tall lattice between the near basins and the deep ones (AWE, GRIEF)
    const ridge = new THREE.Mesh(new THREE.PlaneGeometry(RIDGE.width, RIDGE.top - RIDGE.bottom, 10, 6), new THREE.MeshBasicMaterial({ color: '#ff7ad9', wireframe: true, transparent: true, opacity: 0.22 }));
    ridge.position.set(0, (RIDGE.top + RIDGE.bottom) / 2, RIDGE.z);
    scene.add(ridge);
  }

  // THE HOLES: a green, a glowing rim, a cup, a pillar of light, the name
  const holes = {};
  for (const [id, h] of Object.entries(HOLES)) {
    const g = new THREE.Group();
    const at = chess ? CHESS[id].slice(0, 3) : h.at;
    g.position.set(...at);
    const r = 1.3 + 0.5 * h.depth;
    const green = new THREE.Mesh(new THREE.CircleGeometry(r, 64), new THREE.MeshStandardMaterial({ color: new THREE.Color(h.color).multiplyScalar(0.25), emissive: h.color, emissiveIntensity: 0.18, roughness: 0.9 }));
    green.rotation.x = -Math.PI / 2;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(r, 0.06, 8, 80), new THREE.MeshBasicMaterial({ color: h.color }));
    rim.rotation.x = -Math.PI / 2;
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3 + 0.6 * h.depth, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#000000', side: THREE.DoubleSide }));
    cup.position.y = -(0.15 + 0.3 * h.depth);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.4, 7, 16, 1, true), new THREE.MeshBasicMaterial({ color: h.color, transparent: true, opacity: 0.09, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.position.y = 3.5;
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.42), new THREE.MeshBasicMaterial({ color: h.color, side: THREE.DoubleSide }));
    flag.position.set(0.38, 1.7, 0);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2, 6), new THREE.MeshBasicMaterial({ color: '#e8eefc' }));
    pole.position.y = 1;
    const tag = textSprite(id, h.color, h.note);
    tag.position.y = 2.7;
    g.add(green, rim, cup, beam, flag, pole, tag);
    scene.add(g);
    if (chess) { green.visible = false; beam.visible = false; }
    holes[id] = { ...h, g, rim, flag, tag, pos: new THREE.Vector3(...at), r };
  }

  // THE PATHS: two lanes each, one each way; the look says the kind, the width the ease
  const STYLE = {
    fairway: { color: '#56f0a2', tube: w => 0.05 + 0.32 * w, opacity: 0.55 },
    slide: { color: '#bfe8ff', tube: w => 0.05 + 0.32 * w, opacity: 0.55 },
    wire: { color: '#ff7ad9', tube: () => 0.025, opacity: 0.95 },
    bridge: { color: '#ffd166', tube: () => 0.09, opacity: 0.9 },
    tunnel: { color: '#a78bfa', tube: () => 0.06, opacity: 0.7 },
  };
  const lanes = [];
  const up = new THREE.Vector3(0, 1, 0);
  for (const [a, b, type, wab, wba] of PATHS) {
    for (const [from, to, w, side] of [[a, b, wab, 1], [b, a, wba, -1]]) {
      if (w <= 0) continue;
      const A = holes[from].pos, B = holes[to].pos;
      const dir = B.clone().sub(A);
      const off = new THREE.Vector3().crossVectors(dir, up).normalize().multiplyScalar(0.45 * side);
      const mid = A.clone().lerp(B, 0.5).add(off);
      const crossesRidge = chess && (A.z - RIDGE.z) * (B.z - RIDGE.z) < 0;
      if (type === 'tunnel') mid.y = chess ? (A.y + B.y) / 2 : Math.min(A.y, B.y) - 3.2;
      else if (type === 'bridge') mid.y = Math.max(A.y, B.y) + (chess ? 2 : 3.2);
      else if (crossesRidge) mid.y = RIDGE.top + 1.2;   // over the ridge: up first, the barrier
      else if (type === 'wire') mid.y = Math.max(A.y, B.y) + 1.6;
      else mid.y += type === 'slide' ? 0.4 : 0.8;
      const pts = [A.clone().add(off.clone().multiplyScalar(0.6)), A.clone().lerp(mid, 0.5).add(new THREE.Vector3(0, 0.2, 0)), mid, mid.clone().lerp(B, 0.5).add(new THREE.Vector3(0, 0.2, 0)), B.clone().add(off.clone().multiplyScalar(0.6))];
      pts[0].y += 0.15; pts[4].y += 0.15;
      const curve = new THREE.CatmullRomCurve3(pts);
      const sty = STYLE[type];
      let mesh;
      if (type === 'bridge') {
        // planks along the curve: the bridge is there only with the resource
        mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.06, 0.18), new THREE.MeshBasicMaterial({ color: sty.color, transparent: true, opacity: sty.opacity }), 34);
        const o = new THREE.Object3D();
        for (let k = 0; k < 34; k++) {
          const t = (k + 0.5) / 34;
          o.position.copy(curve.getPointAt(t));
          o.lookAt(curve.getPointAt(Math.min(1, t + 0.01)));
          o.updateMatrix();
          mesh.setMatrixAt(k, o.matrix);
        }
      } else if (type === 'tunnel') {
        // dashes underground: a way that is not walked but passed through
        mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: sty.color, transparent: true, opacity: sty.opacity }), 40);
        const o = new THREE.Object3D();
        for (let k = 0; k < 40; k++) { o.position.copy(curve.getPointAt((k + 0.5) / 40)); o.updateMatrix(); mesh.setMatrixAt(k, o.matrix); }
      } else {
        mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 80, sty.tube(w), 10, false), new THREE.MeshBasicMaterial({ color: sty.color, transparent: true, opacity: sty.opacity * (0.5 + 0.5 * w), blending: THREE.AdditiveBlending, depthWrite: false }));
      }
      scene.add(mesh);
      // the flow along the lane: more and brighter dots the easier the way
      const n = Math.max(1, Math.round(2 + 10 * w));
      const dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.8 }), n);
      scene.add(dots);
      lanes.push({ from, to, type, w, curve, mesh, dots, n, len: curve.getLength(), phase: rnd() });
    }
  }

  // THE BALL: the state, in a hole or on its way along a lane
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 16), new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.55, roughness: 0.3 }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 12), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false }));
  ball.add(halo);
  scene.add(ball);
  const real = { at: 'SAFE', lane: null, t: 0, dwell: 0 };
  // THE WORRY BALLS: imagined runs, never the state
  const worries = [];
  const ghostGeo = new THREE.SphereGeometry(0.3, 32, 16);

  const resting = (id, k = 0, n = 1) => {
    const h = holes[id];
    const a = (k / Math.max(1, n)) * Math.PI * 2;
    return h.pos.clone().add(new THREE.Vector3(Math.cos(a) * 0.5 * (n > 1 ? 1 : 0), 0.32, Math.sin(a) * 0.5 * (n > 1 ? 1 : 0)));
  };
  const out = (id, resource) => lanes.filter(l => l.from === id && (l.type !== 'bridge' || resource));
  const pull = to => worries.filter(q => !q.fading && (q.lane ? q.lane.to : q.at) === to).length;
  function pickLane(id, s, kick = false) {
    const opts = out(id, s.resource);
    if (!opts.length) return null;
    const ws = opts.map(l => l.w * (l.type === 'tunnel' ? 0.5 : 1) * (1 + 0.6 * pull(l.to)) * (kick && PULL_TO.has(l.to) ? 1.3 : 1));
    let r = rnd() * ws.reduce((a, b) => a + b, 0);
    for (let k = 0; k < opts.length; k++) { r -= ws[k]; if (r <= 0) return opts[k]; }
    return opts[opts.length - 1];
  }
  function spawnWorry(s) {
    if (worries.filter(q => !q.fading).length >= 6) return;
    const mesh = new THREE.Mesh(ghostGeo, bubbleMaterial({ tint: '#a78bfa', opacity: 0.32, wobble: 0.8 }));
    const tether = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: '#a78bfa', transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(mesh, tether);
    worries.push({ mesh, tether, at: real.lane ? real.lane.to : real.at, lane: null, t: 0, hops: 2 + Math.floor(rnd() * 3), fading: 0, s });
  }
  function worryLane(id) {
    const opts = lanes.filter(l => l.from === id);
    if (!opts.length) return null;
    const ws = opts.map(l => (0.15 + l.w) * (PULL_TO.has(l.to) ? 2.2 : 0.6));
    let r = rnd() * ws.reduce((a, b) => a + b, 0);
    for (let k = 0; k < opts.length; k++) { r -= ws[k]; if (r <= 0) return opts[k]; }
    return opts[0];
  }

  let last = 0, clock = 0, kickNow = false;
  return {
    group: scene,
    get at() { return real.lane ? `${real.lane.from} → ${real.lane.to} (${real.lane.type})` : real.at; },
    get worries() { return worries.filter(q => !q.fading).length; },
    // POKE: a kick; the ball goes now, by a way it can take from here
    poke() { kickNow = true; },
    // state: { time, phi, labels, resource, cp }
    update(s) {
      const dt = Math.min(0.05, last ? s.time - last : 0.016);
      last = s.time;
      clock += dt;
      tickBubbles(clock);
      ground.material.uniforms.uTime.value = clock;
      const phi = Math.max(0, Math.min(1, s.phi ?? 0.5));
      // the real ball: it rests, then by chance (hotter, oftener) or by a kick takes a way out
      if (!real.lane) {
        real.dwell += dt;
        const rate = (0.04 + 0.5 * phi * phi) * (1 + 0.25 * pull('FREEZE') + 0.25 * pull('FIGHT'));
        if (kickNow || (real.dwell > 1.5 && rnd() < rate * dt)) {
          const l = pickLane(real.at, s, kickNow);
          if (l) { real.lane = l; real.t = 0; }
        }
        kickNow = false;
        ball.position.lerp(resting(real.at), Math.min(1, dt * 4));
      } else {
        real.t += dt * 3.2 / real.lane.len * (real.lane.type === 'tunnel' ? 1.8 : 1);
        if (real.t >= 1) { real.at = real.lane.to; real.lane = null; real.dwell = 0; }
        else ball.position.copy(real.lane.curve.getPointAt(real.t)).add(new THREE.Vector3(0, 0.25, 0));
      }
      halo.material.opacity = 0.1 + 0.08 * Math.sin(clock * 3);
      // worries: more with the heat and with C-PTSD; each runs a few imagined hops, then fades
      if (rnd() < (0.03 + 0.25 * phi + 0.5 * (s.cp ?? 0)) * dt) spawnWorry(s);
      for (let i = worries.length - 1; i >= 0; i--) {
        const q = worries[i];
        if (!q.lane && !q.fading) {
          q.t += dt;
          if (q.t > 0.8) { if (q.hops-- > 0) { q.lane = worryLane(q.at); q.t = 0; if (!q.lane) q.fading = 0.01; } else q.fading = 0.01; }
          q.mesh.position.lerp(resting(q.at, i + 1, 7), Math.min(1, dt * 3));
        } else if (q.lane) {
          q.t += dt * 4 / q.lane.len;
          if (q.t >= 1) { q.at = q.lane.to; q.lane = null; q.t = 0; }
          else q.mesh.position.copy(q.lane.curve.getPointAt(q.t)).add(new THREE.Vector3(0, 0.6, 0));
        }
        if (q.fading) {
          q.fading += dt / 2;
          q.mesh.material.opacity = Math.max(0, 0.32 * (1 - q.fading));
        }
        q.tether.geometry.setFromPoints([q.mesh.position, ball.position]);
        q.tether.material.opacity = 0.35 * (1 - Math.min(1, q.fading));
        if (q.fading >= 1) { scene.remove(q.mesh, q.tether); q.tether.geometry.dispose(); q.mesh.material.dispose(); worries.splice(i, 1); }
      }
      // the lanes: dots flowing the lane's way; the bridge lit only with the resource
      const o = new THREE.Object3D();
      for (const l of lanes) {
        for (let k = 0; k < l.n; k++) {
          const t = (l.phase + clock * (0.12 + 0.25 * l.w) + k / l.n) % 1;
          o.position.copy(l.curve.getPointAt(t));
          o.scale.setScalar(l.type === 'bridge' && !s.resource ? 0.001 : 0.6 + 0.8 * l.w);
          o.updateMatrix();
          l.dots.setMatrixAt(k, o.matrix);
        }
        l.dots.instanceMatrix.needsUpdate = true;
        if (l.type === 'bridge') l.mesh.material.opacity = s.resource ? 0.95 : 0.12;
        if (l.type === 'tunnel') l.mesh.material.opacity = 0.45 + 0.25 * Math.sin(clock * 2 + l.phase * 6);
      }
      for (const [id, h] of Object.entries(holes)) {
        const here = !real.lane && real.at === id;
        h.rim.material.color.set(here ? '#ffffff' : h.color);
        h.flag.rotation.y = 0.3 * Math.sin(clock * 1.7 + h.pos.x);
        h.tag.visible = s.labels !== false;
      }
    },
  };
}

// THE MAP (the 2D view): the flat course seen from straight above
export function createMiniGolf3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05030c');
  scene.environment = bubbleEnvironment(renderer);
  scene.add(new THREE.AmbientLight('#6a5a9a', 0.9));
  const key = new THREE.DirectionalLight('#cfd8ff', 1.1);
  key.position.set(4, 12, 8);
  scene.add(key);
  const golf = buildGolf({ layout: 'flat' });
  scene.add(golf.group);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 300);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  return {
    canvas,
    golf,
    get at() { return golf.at; },
    get worries() { return golf.worries; },
    poke() { golf.poke(); },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    render(s) {
      golf.update(s);
      camera.position.set(0, 52, -4.5);
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, -4.5);
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
