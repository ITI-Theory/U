// paths3d.js: THE PATHS (ISS-104; the author, 15 Oct: "should I do this or should I do that"):
// the path problem in one picture. The land is the model's energy landscape (gentle hills,
// wells that pull, ridges that resist); on it, a tree of options (a plan's choices, three or four
// levels, not an exploding tree). Activity moves on every path at once, more on the cheaper
// ones (the foam: sub-threshold, parallel); a path's cost is cumulative along its route, not its
// highest hill (the path-sensitive transitions paper, open-hypothesis), so the paths glow by
// their summed cost (blue: cheap; pink: costly). Now and then five or six places flash where the
// activity crosses the threshold, and they stay lit: the hot spots. Then the sequence: one at a
// time, each hot spot's route lights up and a thought pops above it, saying what the land says
// there (a well that pulls, a ridge that resists); now and then another pushes in out of turn.
// Path, then wave, then sequence. Sourced anchor (rats, not people): at a choice point the
// hippocampus sweeps forward along each option in turn (vicarious trial and error; Redish and
// colleagues); for human thought, interpretive. No path is labelled good or bad: the model has
// only downhill, uphill and barriers.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const PINK = new THREE.Color('#ff3bce');
const BLUE = new THREE.Color('#14e5ff');
const AMBER = new THREE.Color('#ffb347');
const VIOLET = new THREE.Color('#8f6bff');

// the land: gentle hills, two wells, a ridge (scene units; heights a few units)
function height(x, z) {
  return 0.9 * Math.sin(0.16 * x + 0.4) * Math.cos(0.13 * z)
    - 2.4 * Math.exp(-((x - 7) ** 2 + (z + 11) ** 2) / 20)
    - 1.8 * Math.exp(-((x + 9) ** 2 + (z + 6) ** 2) / 16)
    + 1.9 * Math.exp(-((x + 1) ** 2) / 5) * Math.exp(-((z + 2) ** 2) / 60)
    + 0.6 * Math.exp(-((x - 3) ** 2 + (z - 6) ** 2) / 10);
}

function rand(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

function softDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function textSprite(text, color) {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 128;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.font = '40px "Space Mono", monospace';
  g.shadowColor = color; g.shadowBlur = 14;
  g.fillStyle = '#ffffff';
  g.fillText(text, 512, 76);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false }));
  s.scale.set(9, 1.1, 1);
  return s;
}

export function createPaths3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05040c');
  scene.fog = new THREE.Fog('#05040c', 30, 70);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  const rnd = rand(2026);
  const dot = softDot();
  const U = { uTime: { value: 0 }, uFX: { value: 0 } };

  // THE LAND: dark ground, faint field strips (farmland), neon contour lines, wells blue, ridges amber
  const landGeo = new THREE.PlaneGeometry(64, 52, 220, 180);
  landGeo.rotateX(-Math.PI / 2);
  const lp = landGeo.attributes.position;
  for (let i = 0; i < lp.count; i++) lp.setY(i, height(lp.getX(i), lp.getZ(i)));
  landGeo.computeVertexNormals();
  scene.add(new THREE.Mesh(landGeo, new THREE.ShaderMaterial({
    uniforms: U,
    vertexShader: 'varying vec3 vP; varying vec3 vN; void main() { vP = position; vN = normal; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; varying vec3 vP; varying vec3 vN;
      void main() {
        float shade = 0.35 + 0.65 * max(0.0, dot(normalize(vN), normalize(vec3(-0.4, 1.0, 0.3))));
        vec3 col = vec3(0.05, 0.035, 0.11) * shade;
        // field strips, as farmland seen from the air
        float strip = step(0.5, fract(vP.x * 0.12 + floor(vP.z * 0.08) * 0.37));
        col += vec3(0.02, 0.02, 0.05) * strip;
        // contour lines: blue in the wells, amber on the ridges
        float h = vP.y;
        float line = smoothstep(0.44, 0.49, abs(fract(h * 1.6) - 0.5));
        vec3 lc = mix(vec3(0.08, 0.6, 1.0), vec3(1.0, 0.65, 0.25), smoothstep(-1.5, 1.5, h));
        col += lc * line * (0.35 + 0.4 * uFX);
        float fog = smoothstep(26.0, 34.0, length(vP.xz));
        gl_FragColor = vec4(mix(col, vec3(0.02, 0.015, 0.05), fog), 1.0);
      }`,
  })));

  // THE TREE: a plan's options, three or four levels, laid on the land
  const LEVELS = 4;
  const nodes = [{ x: 0, z: 17, d: 0, parent: -1, cost: 0 }];
  const edges = [];
  for (let d = 1; d <= LEVELS; d++) {
    for (const [pi, p] of nodes.entries()) {
      if (p.d !== d - 1) continue;
      for (const side of [-1, 1]) {
        const spread = 16 / 2 ** d;
        const n = { x: p.x + side * spread + (rnd() - 0.5) * spread * 0.4, z: 17 - d * 8.2 + (rnd() - 0.5) * 2, d, parent: pi, cost: 0 };
        nodes.push(n);
        const ci = nodes.length - 1;
        // the edge follows the land: a curve with a little wander, sampled on the ground
        const a = new THREE.Vector2(p.x, p.z), b = new THREE.Vector2(n.x, n.z);
        const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector2((rnd() - 0.5) * 3, 0));
        const pts = [];
        let climb = 0, len = 0;
        for (let s = 0; s <= 28; s++) {
          const t = s / 28;
          const q = a.clone().multiplyScalar((1 - t) ** 2).add(mid.clone().multiplyScalar(2 * t * (1 - t))).add(b.clone().multiplyScalar(t * t));
          const y = height(q.x, q.y);
          const v = new THREE.Vector3(q.x, y + 0.12, q.y);
          if (pts.length) { climb += Math.max(0, y - pts[pts.length - 1].y + 0.12); len += v.distanceTo(pts[pts.length - 1]); }
          pts.push(v);
        }
        // the cost of this step: what it climbs, plus a little for its length (cumulative along the route)
        const cost = climb + 0.04 * len;
        n.cost = p.cost + cost;
        edges.push({ from: pi, to: ci, pts, cost, activity: new Float32Array(pts.length) });
      }
    }
  }
  const maxCost = Math.max(...nodes.map(n => n.cost));
  const lineGroup = new THREE.Group();
  for (const e of edges) {
    const k = nodes[e.to].cost / maxCost;
    const col = BLUE.clone().lerp(PINK, k);
    e.line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(e.pts), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    e.color = col;
    lineGroup.add(e.line);
  }
  scene.add(lineGroup);
  // the leaves: where a route ends, on the land (a well pulls, a ridge resists)
  for (const n of nodes) {
    if (n.d !== LEVELS) continue;
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 10), new THREE.MeshBasicMaterial({ color: height(n.x, n.z) < -0.4 ? VIOLET : height(n.x, n.z) > 0.6 ? AMBER : '#cfe8ff', transparent: true, opacity: 0.8 }));
    m.position.set(n.x, height(n.x, n.z) + 0.3, n.z);
    scene.add(m);
  }
  const root = new THREE.Mesh(new THREE.SphereGeometry(0.35, 20, 12), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
  root.position.set(nodes[0].x, height(nodes[0].x, nodes[0].z) + 0.4, nodes[0].z);
  scene.add(root);
  const rootLabel = textSprite('NOW: what shall I do?', '#5ee7ff');
  rootLabel.position.copy(root.position).add(new THREE.Vector3(0, 1.4, 0));
  scene.add(rootLabel);

  // THE FLOW: activity on every path at once, choosing at each fork by the step's cost and the heat
  const children = nodes.map(() => []);
  edges.forEach((e, i) => children[e.from].push(i));
  const NP = 700;
  const parts = [];
  const pp = new Float32Array(NP * 3);
  for (let i = 0; i < NP; i++) parts.push({ edge: -1, s: 0, speed: 0.5 + rnd() });
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
  scene.add(new THREE.Points(pg, new THREE.PointsMaterial({ map: dot, color: '#9fe8ff', size: 0.35, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })));
  let temp = 1;
  const pick = from => {
    const opts = children[from];
    if (!opts.length) return -1;
    const w = opts.map(i => Math.exp(-edges[i].cost / temp));
    let r = rnd() * w.reduce((a, b) => a + b, 0);
    for (let k = 0; k < opts.length; k++) { r -= w[k]; if (r <= 0) return opts[k]; }
    return opts[opts.length - 1];
  };

  // THE HOT SPOTS and THE SEQUENCE
  const beams = [];
  const fx = [];
  let round = { phase: 'flow', t: 0, order: [], at: -1 };
  const beamMat = color => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  function clearRound() {
    for (const b of beams) { scene.remove(b.group); b.group.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); }); }
    beams.length = 0;
    for (const e of edges) { e.activity.fill(0); e.line.material.color.copy(e.color); e.line.material.opacity = 0.55; }
  }
  function flash() {
    // the places where the activity crossed the threshold: the most active points, on different edges
    const cand = [];
    edges.forEach((e, ei) => e.activity.forEach((a, si) => { if (si > 2) cand.push({ ei, si, a: a * (0.7 + 0.6 * rnd()) }); }));
    cand.sort((p, q) => q.a - p.a);
    const used = new Set();
    for (const c of cand) {
      if (beams.length >= 6) break;
      if (used.has(c.ei)) continue;
      used.add(c.ei);
      const p = edges[c.ei].pts[c.si];
      const h = height(p.x, p.z);
      const land = h < -0.4 ? 'a well: it pulls' : h > 0.6 ? 'a ridge: it resists' : 'level ground';
      const color = h < -0.4 ? VIOLET : h > 0.6 ? AMBER : BLUE;
      const group = new THREE.Group();
      group.position.copy(p);
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.45, 9, 24, 1, true), beamMat(color));
      beam.position.y = 4.5;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.04, 8, 48), beamMat(color));
      ring.rotation.x = Math.PI / 2;
      const thought = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 14), beamMat(color));
      thought.position.y = 5;
      thought.visible = false;
      const route = [];
      for (let n = edges[c.ei].to; n > 0; n = nodes[n].parent) route.push(edges.findIndex(e => e.to === n));
      const cost = nodes[edges[c.ei].to].cost;
      const tag = textSprite(`route cost ${cost.toFixed(1)} · ${land}`, `#${color.getHexString()}`);
      tag.position.y = 6.4;
      tag.visible = false;
      group.add(beam, ring, thought, tag);
      scene.add(group);
      beams.push({ group, beam, ring, thought, tag, route, born: round.t, color });
    }
    // the order they come in: by how strong the flash was, now and then one out of turn
    round.order = beams.map((_, i) => i);
    if (round.order.length > 2 && rnd() < 0.5) { const j = 1 + Math.floor(rnd() * (round.order.length - 1)); [round.order[0], round.order[j]] = [round.order[j], round.order[0]]; }
  }

  let last = 0;
  return {
    canvas,
    poke() { if (round.phase === 'flow') round.t = 99; else { clearRound(); round = { phase: 'flow', t: 0, order: [], at: -1 }; } },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, phi, stereo, labels }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      const phi = state.phi ?? 0.5;
      U.uTime.value = state.time;
      U.uFX.value = phi;
      temp = 0.5 + 3 * phi;            // hotter: the activity explores the costly paths too
      // the flow
      const pos = pg.attributes.position;
      for (let i = 0; i < NP; i++) {
        const q = parts[i];
        if (q.edge < 0) { q.edge = pick(0); q.s = rnd() * 0.3; }
        const e = edges[q.edge];
        q.s += dt * q.speed * (0.35 + 0.6 * phi) * 6 / e.pts.length;
        if (q.s >= 1) { const nx = pick(e.to); if (nx < 0) { q.edge = -1; continue; } q.edge = nx; q.s = 0; }
        const f = q.s * (e.pts.length - 1);
        const k = Math.min(e.pts.length - 2, Math.floor(f));
        const v = e.pts[k].clone().lerp(e.pts[k + 1], f - k);
        pos.setXYZ(i, v.x, v.y + 0.1, v.z);
        if (round.phase === 'flow') e.activity[k] += 1;
      }
      pos.needsUpdate = true;
      // the round: flow, flash (they stay lit), the sequence, rest
      round.t += dt;
      if (round.phase === 'flow' && round.t > 7) { flash(); round.phase = 'flash'; round.t = 0; }
      else if (round.phase === 'flash' && round.t > 2.5) { round.phase = 'sequence'; round.t = 0; round.at = 0; }
      else if (round.phase === 'sequence' && round.t > 3.2) { round.t = 0; round.at += 1; if (round.at >= round.order.length) { round.phase = 'rest'; } }
      else if (round.phase === 'rest' && round.t > 2.5) { clearRound(); round = { phase: 'flow', t: 0, order: [], at: -1 }; }
      const current = round.phase === 'sequence' ? round.order[round.at] : -1;
      for (const e of edges) { e.line.material.opacity = current >= 0 ? 0.25 : 0.55; e.line.material.color.copy(e.color); }
      beams.forEach((b, i) => {
        const on = Math.min(1, (round.phase === 'flash' ? round.t : 3) / 0.6);
        const now = i === current;
        b.beam.material.opacity = (now ? 0.55 : 0.28) * on * (0.85 + 0.15 * Math.sin(state.time * 6 + i));
        b.ring.material.opacity = 0.7 * on;
        b.ring.scale.setScalar(1 + 0.15 * Math.sin(state.time * 3 + i));
        b.thought.visible = now;
        b.thought.material.opacity = 0.75;
        b.thought.position.y = 5 + 0.3 * Math.sin(state.time * 2);
        b.tag.visible = now && state.labels !== false;
        if (now) for (const ei of b.route) { edges[ei].line.material.opacity = 1; edges[ei].line.material.color.copy(b.color).lerp(new THREE.Color('#ffffff'), 0.3); }
      });
      rootLabel.visible = state.labels !== false;
      // the camera: high over the land, turning slowly
      const a = 0.25 * Math.sin(state.time * 0.05);
      camera.position.set(Math.sin(a) * 26, 23, 34 * Math.cos(a));
      camera.lookAt(0, -3, 1.5);
      applyLook(camera);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
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
    get phase() { return round.phase; },
  };
}
