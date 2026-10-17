// tunnel3d.js: the PATH stop of the mind-body explorer (ISS-052). Boundaries are paths
// (author, 10 Oct): a signal from the body, the ball, races along a tunnel to the cortex, and the
// boundaries are gates on that way (15 Oct: thoughts are not things in tubes; they pop in the
// Mind Chamber; this is the physical road). A gate is a barrier: it opens when the limbic field
// Phi is above its height (FM-HN: heat softens barriers; the RESOURCE lowers them a
// little, J(t)); a closed gate stops the thought, and POKE tries to tunnel through with
// probability exp(-3 * gap), after LimbicTunnel.lean (wkbAmplitude_pos: never zero).
// The walls are the fractal of the level: branching dendrites (organismal), Menger blocks
// (network, systemic: the city of code's cubic towers), stars (cosmic); at 11D a
// Mandelbulb, the mind, floats at the centre of the loop. Mono or stereo (SBS).

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { XS } from './ureter-model.js';
import { applyLook, hiresCanvas } from './look.js';
import { createVessel } from './vessel.js';

function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

const GATES = 9;

// Fantastic Voyage walls: a tileable cell texture (Voronoi cells with glowing membranes
// and dark nuclei), painted once per colour scheme and repeated along the tube.
function cellTexture({ membrane = [255, 120, 150], interior = [70, 10, 30], nucleus = [120, 40, 140], seed = 9 } = {}) {
  const N = 256;
  const rand = seeded(seed);
  const pts = Array.from({ length: 46 }, () => [rand() * N, rand() * N, 0.7 + 0.6 * rand()]);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = N;
  const g = canvas.getContext('2d');
  const img = g.createImageData(N, N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let d1 = 1e9, d2 = 1e9, best = null;
    for (const p of pts) {
      let dx = Math.abs(x - p[0]); dx = Math.min(dx, N - dx);
      let dy = Math.abs(y - p[1]); dy = Math.min(dy, N - dy);
      const d = Math.hypot(dx, dy);
      if (d < d1) { d2 = d1; d1 = d; best = p; } else if (d < d2) d2 = d;
    }
    const edge = Math.exp(-((d2 - d1) ** 2) / 6);
    const core = Math.exp(-(d1 * d1) / (40 * best[2]));
    const shade = 0.55 + 0.45 * (1 - d1 / 28);
    const k = (y * N + x) * 4;
    for (let c = 0; c < 3; c++) {
      img.data[k + c] = Math.min(255, interior[c] * shade + membrane[c] * edge + nucleus[c] * core);
    }
    img.data[k + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// red blood cells: flattened tori drifting along the path (PATH, organismal worlds)
function bloodCells(curve, count = 160) {
  const geo = new THREE.TorusGeometry(0.09, 0.055, 8, 18);
  geo.scale(1, 1, 0.55);
  const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: '#c8102e', roughness: 0.4, emissive: '#3a0008' }), count);
  const cells = Array.from({ length: count }, () => ({ u: Math.random(), off: new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.6), spin: new THREE.Euler(Math.random() * 6, Math.random() * 6, 0), v: 0.004 + 0.006 * Math.random() }));
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const one = new THREE.Vector3(1, 1, 1);
  return {
    mesh,
    update(dt, speed) {
      for (const [i, c] of cells.entries()) {
        c.u = (c.u + (c.v + speed * 0.3) * dt) % 1;
        c.spin.x += dt * 0.6;
        c.spin.y += dt * 0.4;
        q.setFromEuler(c.spin);
        m.compose(curve.getPointAt(c.u).add(c.off), q, one);
        mesh.setMatrixAt(i, m);
      }
      mesh.instanceMatrix.needsUpdate = true;
    },
  };
}

// Mandelbulb (power 8) as a point cloud: grid points whose escape time is near the
// boundary, coloured by depth; computed once.
function mandelbulb(n = 64, power = 8) {
  const pos = [];
  const col = [];
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
    const cx = -1.2 + (2.4 * i) / n;
    const cy = -1.2 + (2.4 * j) / n;
    const cz = -1.2 + (2.4 * k) / n;
    let x = cx, y = cy, z = cz;
    let it = 0;
    for (; it < 10; it++) {
      const r = Math.hypot(x, y, z);
      if (r > 2) break;
      const th = Math.acos(z / (r || 1e-9)) * power;
      const ph = Math.atan2(y, x) * power;
      const rp = r ** power;
      x = rp * Math.sin(th) * Math.cos(ph) + cx;
      y = rp * Math.sin(th) * Math.sin(ph) + cy;
      z = rp * Math.cos(th) + cz;
    }
    if (it >= 5 && it < 10) {
      pos.push(cx, cy, cz);
      c.setHSL(0.83 + 0.05 * (it - 5), 0.85, 0.45 + 0.06 * (it - 5));
      col.push(c.r, c.g, c.b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
}

// Menger sponge, level 1: the 20 cubes left after removing the centre and face centres
const MENGER = [];
for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
  if ((x === 0) + (y === 0) + (z === 0) < 2) MENGER.push([x, y, z]);
}

// URETER mode (a ureteroscope's view, for the urology Presentation): pink smooth-muscle
// walls with peristaltic rings, urine flowing as particles, and one stone. The stone is a
// mechanical obstruction, not a field barrier: Phi does not open it (unlike PATH's gates);
// flow dams behind it and a colic reading rises. POKE is the laser: each shot breaks
// pieces off and sprays dust; after three it is dust, flow returns, the colic eases. A new
// stone forms after a while so the demonstration can repeat. Plain physiology plus a
// picture; no clinical claim.
// The stone (ISS-076): a crystal aggregate grown as a small 3D fractal, as kidney stones are
// aggregates of crystals. The look follows calcium oxalate dihydrate (weddellite): sharp
// tetragonal bipyramids, honey to ivory, with darker flecks of the monohydrate (whewellite)
// and a grainy surface (a canvas texture used as colour and bump). Bipyramids on the faces of
// bipyramids, three generations, one instanced mesh (about 170 crystals).
function stoneTexture() {
  const { c, g } = hiresCanvas(256);
  g.fillStyle = '#d8c07a';
  g.fillRect(0, 0, 256, 256);
  for (let k = 0; k < 2600; k++) {
    const r = Math.random();
    g.fillStyle = r < 0.08 ? 'rgba(92,58,24,0.55)' : r < 0.5 ? `rgba(255,246,214,${0.15 + 0.3 * Math.random()})` : `rgba(150,110,50,${0.1 + 0.25 * Math.random()})`;
    const s = 1 + Math.random() * (r < 0.08 ? 5 : 2.5);
    g.fillRect(Math.random() * 256, Math.random() * 256, s, s);
  }
  // growth lines, as on a cut stone
  g.strokeStyle = 'rgba(120,84,36,0.25)';
  for (let k = 0; k < 12; k++) { g.beginPath(); g.arc(128, 128, 10 + k * 11, 0, Math.PI * 2); g.stroke(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function stoneAggregate(rand) {
  const map = stoneTexture();
  const material = new THREE.MeshStandardMaterial({ color: '#ffffff', map, bumpMap: map, bumpScale: 0.04, roughness: 0.42, metalness: 0.05, flatShading: true, emissive: '#2a1e06' });
  const habit = new THREE.OctahedronGeometry(1, 0);
  habit.scale(0.62, 1, 0.62);
  const parts = [];
  const grow = (pos, r, depth, tilt) => {
    parts.push({ pos, r, tilt, depth });
    if (depth >= 3) return;
    const n = [10, 4, 3][depth];
    for (let k = 0; k < n; k++) {
      const dir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
      grow(pos.clone().addScaledVector(dir, r * 0.78), r * (0.4 + 0.12 * rand()), depth + 1, new THREE.Euler(rand() * 3, rand() * 3, rand() * 3));
    }
  };
  grow(new THREE.Vector3(), 0.42, 0, new THREE.Euler(0.3, 0, 0.2));
  const mesh = new THREE.InstancedMesh(habit, material, parts.length);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const tint = new THREE.Color();
  parts.forEach((p, k) => {
    m.compose(p.pos, q.setFromEuler(p.tilt), new THREE.Vector3(p.r, p.r, p.r));
    mesh.setMatrixAt(k, m);
    // ivory to honey; now and then a brown monohydrate crystal
    const v = rand();
    mesh.setColorAt(k, v < 0.12 ? tint.set('#7a5428') : tint.setHSL(0.11 + 0.03 * rand(), 0.45 + 0.2 * rand(), 0.55 + 0.25 * v));
  });
  const group = new THREE.Group();
  group.add(mesh);
  group.userData.crystals = mesh;
  return group;
}

// the climber (ISS-076, the author's north face): a small figure, helmet and rope, drawn
// 40 µm tall, so the 6 mm stone is 150 climbers high
function makeClimber() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.03, 4, 8), new THREE.MeshStandardMaterial({ color: '#3fd0c9', roughness: 0.5 }));
  body.position.y = 0.03;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.011, 12, 8), new THREE.MeshStandardMaterial({ color: '#ff4d5e', roughness: 0.3 }));
  head.position.y = 0.062;
  const lamp = new THREE.PointLight('#fff4d0', 0.12, 0.08);
  lamp.position.y = 0.07;
  g.add(body, head, lamp);
  // to scale: the stone is about 1.8 units across (6 mm), so 40 µm is 0.012 units
  g.scale.setScalar(0.17);
  return g;
}

// vessel: the body container (the submarine in the bloodstream): the wall built from its
// anatomy (vessel.js), driven by the score and the heart; no gates.
export function createTunnel3D({ ureter = false, vessel = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(ureter ? '#1a0508' : vessel ? '#120204' : '#060818');
  scene.fog = new THREE.Fog(ureter ? '#1a0508' : vessel ? '#120204' : '#060818', ureter || vessel ? 1 : 3, ureter ? 7 : vessel ? 9 : 22);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.02, 80);
  camera.focus = 2.2;
  const stereoCamera = new THREE.StereoCamera();
  stereoCamera.eyeSep = 0.05;
  const size = new THREE.Vector2();
  const rand = seeded(23);

  // the path: a closed, wandering loop around the centre (where the mind sits)
  const control = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const r = 9 + 2.5 * Math.sin(3 * a) + rand() * 1.5;
    return new THREE.Vector3(Math.cos(a) * r, 2.2 * Math.sin(2 * a + 1) + (rand() - 0.5), Math.sin(a) * r);
  });
  const curve = new THREE.CatmullRomCurve3(control, true, 'catmullrom', 0.5);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 360, 1.15, 14, true), new THREE.MeshBasicMaterial({ color: '#5ee7ff', wireframe: true, transparent: true, opacity: 0.16, depthWrite: false }));
  scene.add(tube);
  const wall = vessel ? createVessel(curve) : null;
  if (wall) {
    tube.visible = false;
    scene.add(wall.group);
  }
  if (ureter) {
    const cells = cellTexture({ membrane: [255, 150, 160], interior: [120, 30, 45], nucleus: [90, 20, 60] });
    cells.repeat.set(70, 3);
    tube.material = new THREE.MeshStandardMaterial({ color: '#ffffff', map: cells, roughness: 0.35, metalness: 0.0, side: THREE.BackSide, emissive: '#3a0a12' });
    // mucosa: fine vessels on the wall
    const vessels = new THREE.Mesh(new THREE.TubeGeometry(curve, 360, 1.12, 10, true), new THREE.MeshBasicMaterial({ color: '#ff8a9a', wireframe: true, transparent: true, opacity: 0.18, depthWrite: false }));
    scene.add(vessels);
    scene.add(new THREE.PointLight('#fff0e0', 2.2, 6, 1.6));
    scene.add(new THREE.AmbientLight('#ff9aa8', 0.15));
  }

  // gates: the boundaries on the path (none in URETER mode: the stone is the obstruction)
  const gates = Array.from({ length: ureter || vessel ? 0 : GATES }, (_, k) => {
    const u = (k + 0.5) / GATES;
    const p = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u);
    const height = 0.25 + 0.65 * rand();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 8, 40), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    const iris = new THREE.Mesh(new THREE.CircleGeometry(1.05, 40), new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
    for (const m of [ring, iris]) {
      m.position.copy(p);
      m.lookAt(p.clone().add(tangent));
      scene.add(m);
    }
    return { u, height, ring, iris, open: 0, bypass: null };
  });
  // BRANCHING PATHS (ISS-052: "several tunnels; which one a thought takes depends on the gates"):
  // three gates have a side road, a narrower tube arching round them with its own, lower gate; when
  // the main gate is shut and the side road's is open, the signal takes the side road and rejoins
  // after the gate (the field's barriers decide the route, not the signal). POKE still means
  // tunnelling straight through.
  const up = new THREE.Vector3(0, 1, 0);
  for (const k of gates.length ? [2, 5, 7] : []) {
    const g = gates[k];
    const a = curve.getPointAt((g.u - 0.035 + 1) % 1), z = curve.getPointAt((g.u + 0.035) % 1), m = curve.getPointAt(g.u);
    const out = new THREE.Vector3().crossVectors(curve.getTangentAt(g.u), up).normalize();
    const side = new THREE.CatmullRomCurve3([a, a.clone().lerp(m, 0.5).addScaledVector(out, 2.2), m.clone().addScaledVector(out, 3.2), z.clone().lerp(m, 0.5).addScaledVector(out, 2.2), z]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(side, 60, 0.42, 14, false), new THREE.MeshBasicMaterial({ color: '#a78bfa', transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false }));
    scene.add(tube);
    const at = side.getPointAt(0.5), tan = side.getTangentAt(0.5);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.035, 8, 32), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    const iris = new THREE.Mesh(new THREE.CircleGeometry(0.44, 32), new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
    for (const mm of [ring, iris]) { mm.position.copy(at); mm.lookAt(at.clone().add(tan)); scene.add(mm); }
    g.bypass = { curve: side, ring, iris, height: Math.max(0.08, g.height - 0.3), open: 0 };
  }
  let onBypass = null;   // { g, s }: the signal on a side road, s from 0 to 1

  // the thought
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshBasicMaterial({ color: '#fff4c2' }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
  ball.add(halo);
  scene.add(ball);

  // the mind at the centre
  const bulb = ureter || vessel ? new THREE.Group() : mandelbulb();
  bulb.scale.setScalar(2.4);
  scene.add(bulb);

  // URETER: the scope's light, peristaltic rings, urine flow, the stone
  const light = ureter ? scene.children.find(o => o.isPointLight) : null;
  const STONE_U = 0.5;
  const rings = ureter ? Array.from({ length: 6 }, (_, k) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.12, 8, 32), new THREE.MeshStandardMaterial({ color: '#e07a8c', roughness: 0.6 }));
    scene.add(ring);
    return { ring, u: k / 6 };
  }) : [];
  const FLOW = ureter ? 500 : 0;
  const flowU = Float32Array.from({ length: FLOW }, () => Math.random());
  const flowOff = Array.from({ length: FLOW }, () => new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4));
  const flowPos = new Float32Array(FLOW * 3);
  const flowGeo = new THREE.BufferGeometry();
  flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
  const flow = new THREE.Points(flowGeo, new THREE.PointsMaterial({ color: '#fff3b0', size: 0.025, transparent: true, opacity: 0.45, depthWrite: false }));
  if (ureter) scene.add(flow);
  const stone = { mesh: null, size: 0, pieces: [], dust: [], clearedAt: -1 };
  function newStone() {
    if (stone.mesh) scene.remove(stone.mesh);
    stone.mesh = stoneAggregate(rand);
    stone.mesh.position.copy(curve.getPointAt(STONE_U));
    stone.size = 3;
    stone.mesh.scale.setScalar(1);
    scene.add(stone.mesh);
  }
  if (ureter) newStone();
  // THE STAGES (ureter-model.js, ISS-076): the model is the stone as a process. Where the
  // ureter lies on the loop: the kidney at uOf(0), the stone at STONE_U, the bladder at uOf(1)
  const L = 0.4;
  const uOf = x => STONE_U + (XS - x) * L;
  const xOf = uu => XS - (uu - STONE_U) / L;
  // the walls swell and squeeze: each ring of the tube scaled about the centre line
  function deformer(mesh, TS, RS) {
    const pos = mesh.geometry.attributes.position;
    const base = Float32Array.from(pos.array);
    const centres = Array.from({ length: TS + 1 }, (_, i) => curve.getPointAt((i / TS) % 1));
    return scale => {
      for (let i = 0; i <= TS; i++) {
        const sc = scale(i / TS);
        const c = centres[i];
        for (let j = 0; j <= RS; j++) {
          const k = (i * (RS + 1) + j) * 3;
          pos.array[k] = c.x + (base[k] - c.x) * sc;
          pos.array[k + 1] = c.y + (base[k + 1] - c.y) * sc;
          pos.array[k + 2] = c.z + (base[k + 2] - c.z) * sc;
        }
      }
      pos.needsUpdate = true;
    };
  }
  const deformTube = ureter ? deformer(tube, 360, 14) : null;
  const vesselsMesh = ureter ? scene.children.find(o => o.isMesh && o !== tube && o.material.wireframe) : null;
  const deformVessels = vesselsMesh ? deformer(vesselsMesh, 360, 10) : null;
  // the stent: a thin blue tube beside the stone from the bladder to the kidney, curled at both ends
  function makeStent() {
    const up = new THREE.Vector3(0, 1, 0);
    const frame = uu => {
      const p = curve.getPointAt(uu);
      const t = curve.getTangentAt(uu);
      return { p, t, n: new THREE.Vector3().crossVectors(t, up).normalize() };
    };
    // along the floor of the tube, away from the scope's line of sight
    const down = new THREE.Vector3(0, -1, 0);
    const off = 0.72;
    const line = [];
    for (let k = 0; k <= 80; k++) {
      const { p } = frame(uOf(1) + (uOf(0) - uOf(1)) * k / 80);
      line.push(p.clone().addScaledVector(down, off));
    }
    const curl = (uu, sign) => {
      const { p, t, n } = frame(uu);
      const c = p.clone().addScaledVector(down, off).addScaledVector(t, sign * 0.3);
      const out = [];
      for (let a = 0.25; a <= 1.6 * Math.PI * 2; a += 0.25) out.push(c.clone().addScaledVector(t, -sign * 0.3 * Math.cos(a)).addScaledVector(n, 0.3 * Math.sin(a)));
      return out;
    };
    const pts = [...curl(uOf(1), -1).reverse(), ...line, ...curl(uOf(0), 1)];
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 700, 0.035, 8, false),
      new THREE.MeshStandardMaterial({ color: '#4aa3ff', roughness: 0.3, emissive: '#0a2a55', transparent: true, opacity: 0.9 }));
    mesh.visible = false;
    scene.add(mesh);
    return mesh;
  }
  const stentMesh = ureter ? makeStent() : null;
  const waveRings = ureter ? Array.from({ length: 8 }, () => {
    const r = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.14, 8, 36), new THREE.MeshStandardMaterial({ color: '#b03050', roughness: 0.55, emissive: '#300810' }));
    r.visible = false;
    scene.add(r);
    return r;
  }) : [];
  const painLight = ureter ? new THREE.PointLight('#ff2a3c', 0, 5, 1.5) : null;
  if (painLight) { painLight.position.copy(curve.getPointAt(STONE_U)); scene.add(painLight); }
  let modelStage = -1;
  let dir = 1;
  let colic = 0;
  let stoneAhead = false;
  // ORBIT and CLIMB (ISS-076): fly around the stone, or climb its north face (the side facing
  // -z), the camera leaving the scope's path
  let view = 'scope';
  const orbit = { yaw: 0.6, pitch: 0.25, r: 2.0 };
  const climber = ureter ? makeClimber() : null;
  if (climber) { climber.visible = false; scene.add(climber); }
  const climb = { c: 0, trail: [], line: null, alt: 0 };
  const ray = new THREE.Raycaster();
  const sun = ureter ? new THREE.DirectionalLight('#fff2dc', 0) : null;
  if (sun) { sun.position.set(2, 4, 1); scene.add(sun); scene.add(sun.target); }
  // a point on the stone's surface, looking in from outside along a direction
  function surface(dir) {
    const c = stone.mesh.position;
    ray.set(c.clone().addScaledVector(dir, 3), dir.clone().negate());
    const hit = ray.intersectObject(stone.mesh, true)[0];
    return hit ? hit.point : c.clone().addScaledVector(dir, 0.5);
  }

  let walls = null;
  let world = '';
  const blood = bloodCells(curve);
  if (!ureter) {
    scene.add(blood.mesh);
    scene.add(new THREE.AmbientLight('#ffb0c0', vessel ? 0.45 : 0.6));
    const lamp = new THREE.PointLight('#ffffff', 2, 8, 1.5);
    ball.add(lamp);
  }
  function buildWalls(next) {
    world = next;
    if (walls) scene.remove(walls);
    walls = new THREE.Group();
    const r = seeded(world.length * 31 + 7);
    // the tube itself: cells for living worlds (Fantastic Voyage), wire for the rest
    const living = !['network', 'systemic', 'collective', 'cosmological', 'micro-physical'].includes(world);
    if (living) {
      const cells = cellTexture({ membrane: [255, 120, 190], interior: [40, 10, 50], nucleus: [180, 60, 255], seed: 4 });
      cells.repeat.set(70, 3);
      tube.material = new THREE.MeshBasicMaterial({ map: cells, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    } else {
      tube.material = new THREE.MeshBasicMaterial({ color: '#5ee7ff', wireframe: true, transparent: true, opacity: 0.16, depthWrite: false });
    }
    blood.mesh.visible = living;
    if (world === 'network' || world === 'systemic' || world === 'collective') {
      // Menger blocks stacked into towers beside the tunnel: the city of code's cubes
      const box = new THREE.BoxGeometry(1, 1, 1);
      const count = 46 * MENGER.length;
      const mesh = new THREE.InstancedMesh(box, new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }), count);
      const edges = [];
      const m = new THREE.Matrix4();
      let n = 0;
      for (let k = 0; k < 46; k++) {
        const u = k / 46;
        const p = curve.getPointAt(u);
        const side = new THREE.Vector3().crossVectors(curve.getTangentAt(u), new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar((k % 2 ? 1 : -1) * (2.2 + r() * 1.5));
        const s = 0.25 + r() * 0.2;
        const floors = 1 + Math.floor(r() * 3);
        for (let f = 0; f < floors && n < count; f++) {
          const base = p.clone().add(side).add(new THREE.Vector3(0, -1 + f * 3 * s, 0));
          for (const [x, y, z] of MENGER) {
            if (n >= count) break;
            m.makeScale(s * 0.92, s * 0.92, s * 0.92).setPosition(base.x + x * s, base.y + y * s, base.z + z * s);
            mesh.setMatrixAt(n++, m);
          }
          const h = 1.5 * s;
          const b = base;
          for (const [a1, a2] of [[[-1, -1], [1, -1]], [[1, -1], [1, 1]], [[1, 1], [-1, 1]], [[-1, 1], [-1, -1]]]) {
            for (const yy of [-h, h]) edges.push(b.x + a1[0] * h, b.y + yy, b.z + a1[1] * h, b.x + a2[0] * h, b.y + yy, b.z + a2[1] * h);
            edges.push(b.x + a1[0] * h, b.y - h, b.z + a1[1] * h, b.x + a1[0] * h, b.y + h, b.z + a1[1] * h);
          }
        }
      }
      mesh.count = n;
      walls.add(mesh);
      const eg = new THREE.BufferGeometry();
      eg.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3));
      walls.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: '#b46cff', transparent: true, opacity: 0.6 })));
    } else if (world === 'cosmological') {
      const pos = [];
      for (let i = 0; i < 4000; i++) pos.push((r() - 0.5) * 50, (r() - 0.5) * 30, (r() - 0.5) * 50);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      walls.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.08, color: '#cfe8ff', transparent: true, opacity: 0.8, depthWrite: false })));
    } else {
      // branching dendrites growing out of the tunnel wall
      const seg = [];
      const grow = (p, d, len, depth) => {
        const q = p.clone().addScaledVector(d, len);
        seg.push(p.x, p.y, p.z, q.x, q.y, q.z);
        if (!depth) return;
        for (let i = 0; i < 2; i++) {
          const nd = d.clone().add(new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).multiplyScalar(1.1)).normalize();
          grow(q, nd, len * 0.68, depth - 1);
        }
      };
      for (let k = 0; k < 70; k++) {
        const u = r();
        const p = curve.getPointAt(u);
        const out = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
        grow(p.clone().addScaledVector(out, 1.2), out, 1.0 + r(), 4);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
      walls.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: '#ff7aa8', transparent: true, opacity: 0.45 })));
    }
    scene.add(walls);
  }

  let u = ureter ? 0.44 : 0.02;
  let speed = 0;
  let last = 0;
  let blockedAt = -1;
  let event = { text: '', until: 0 };
  let pokeWanted = 0;

  return {
    canvas,
    get event() { return event; },
    get blocked() { return blockedAt >= 0; },
    get colic() { return colic; },
    get stoneAhead() { return stoneAhead; },
    get view() { return view; },
    get climbAltitude() { return climb.alt; },
    get hasStone() { return stone.size > 0; },
    get stageView() { return dir; },
    setView(next) {
      view = stone.size > 0 ? next : 'scope';
      if (climber) climber.visible = view === 'climb';
      if (view === 'climb') { climb.c = 0; climb.trail = []; }
    },
    turn(dx, dy) { orbit.yaw += dx; orbit.pitch = Math.max(-1.3, Math.min(1.3, orbit.pitch + dy)); },
    zoom(f) { orbit.r = Math.max(1.0, Math.min(4, orbit.r * f)); },
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    poke(strength = 1) { pokeWanted = strength; },
    // state: { world, phi, resource, dim, time, stereo }
    render(state) {
      if (!ureter && !vessel && state.world !== world) buildWalls(state.world);
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      if (ureter && state.ureter) {
        const m = state.ureter;
        // a new stage: where the camera is and which way it looks
        if (m.stage !== modelStage) {
          modelStage = m.stage;
          if (m.stage === 2) { dir = 1; u = 0.42; } else { dir = -1; u = m.stage === 3 ? 0.66 : 0.62; }
          speed = 0;
        }
        // the stone follows the model; a smaller stone than before is a laser shot
        if (m.stone > 0 && !stone.mesh) newStone();
        if (m.stone < stone.size && stone.mesh) {
          light.intensity = 14;
          for (let k = 0; k < 40; k++) {
            const d = new THREE.Mesh(new THREE.TetrahedronGeometry(0.012 + 0.02 * Math.random()), new THREE.MeshStandardMaterial({ color: '#d9b878', flatShading: true }));
            d.position.copy(stone.mesh.position);
            stone.dust.push({ m: d, v: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8), age: 0 });
            scene.add(d);
          }
          event = m.stone > 0 ? { text: `LASER: the stone breaks (${m.stone} of 3 left)`, until: state.time + 3 } : { text: 'LASER: dust. The path is clear, the urine flows again', until: state.time + 4 };
        }
        stone.size = m.stone;
        if (stone.mesh) {
          if (m.stone > 0) stone.mesh.scale.setScalar(0.45 + 0.55 * (m.stone / 3));
          else { scene.remove(stone.mesh); stone.mesh = null; }
        }
        light.intensity += ((view === 'scope' ? 3 : view === 'climb' ? 0.35 : 1.2) - light.intensity) * Math.min(1, dt * 4);
        // the walls: swelling above the stone, the clamp around it, the waves
        const scaleAt = uu => {
          const x = xOf(uu);
          if (x < -0.05 || x > 1.05) return 1;
          const w = Math.min(1, Math.min(x + 0.05, 1.05 - x) / 0.05);
          return 1 + (m.radius(Math.max(0, Math.min(1, x))) - 1) * w;
        };
        deformTube(scaleAt);
        deformVessels?.(scaleAt);
        // the pain: the whole wall glows with it; a red pulse at the stone with each spasm
        colic = m.pain;
        tube.material.emissive.setRGB(0.2 + 0.45 * Math.min(1, m.pain) * (0.7 + 0.3 * Math.sin(state.time * 4)), 0.03, 0.06);
        painLight.intensity = 6 * m.spasm + (m.stent ? 0 : 0.6 * m.distension);
        if (stone.mesh && view === 'scope') stone.mesh.rotation.y += dt * 0.15;
        if (!stone.mesh && view !== 'scope') { view = 'scope'; climber.visible = false; }
        stentMesh.visible = m.stent;
        // the waves as muscle rings, travelling from the kidney towards the bladder
        waveRings.forEach((r, k) => {
          const w = m.waves[k];
          r.visible = Boolean(w);
          if (!w) return;
          const uu = uOf(w.x);
          const pp = curve.getPointAt(uu);
          r.position.copy(pp);
          r.lookAt(pp.clone().add(curve.getTangentAt(uu)));
          const sc = 0.98 * m.radius(w.x);
          r.scale.set(sc, sc, 1);
        });
        // the urine: from the kidney down; held above the stone, dripping through a stent
        const D = m.distension;
        for (let i = 0; i < FLOW; i++) {
          const x0 = xOf(flowU[i]);
          const pooled = m.stone > 0 && x0 < XS;
          flowU[i] -= (pooled ? 0.004 + 0.01 * (1 - D) : 0.04 + 0.03 * Math.random()) * dt;
          if (m.stone > 0 && xOf(flowU[i]) >= XS && x0 < XS) {
            if (!(m.stent && Math.random() < 0.08)) flowU[i] = STONE_U + 0.004 + Math.random() * 0.2 * L * (0.3 + D);
          }
          if (xOf(flowU[i]) > 1.02 || flowU[i] < uOf(1.02)) flowU[i] = uOf(0) - Math.random() * 0.02;
          const x1 = Math.max(0, Math.min(1, xOf(flowU[i])));
          const pp = curve.getPointAt(((flowU[i] % 1) + 1) % 1).addScaledVector(flowOff[i], 0.9 * m.radius(x1));
          flowPos[i * 3] = pp.x;
          flowPos[i * 3 + 1] = pp.y;
          flowPos[i * 3 + 2] = pp.z;
        }
        flowGeo.attributes.position.needsUpdate = true;
        for (let i = stone.dust.length - 1; i >= 0; i--) {
          const sd = stone.dust[i];
          sd.age += dt;
          sd.m.position.addScaledVector(sd.v, dt);
          sd.v.multiplyScalar(0.96);
          sd.m.rotation.x += dt * 3;
          if (sd.age > 6) { scene.remove(sd.m); stone.dust.splice(i, 1); }
        }
        // the camera: the scope comes up from the bladder (the laser); otherwise the view is
        // inside the swollen ureter above the stone, looking down at it with the flow
        const ahead = dir > 0 ? (STONE_U - u + 1) % 1 : (u - STONE_U + 1) % 1;
        const stop = m.stone > 0 ? ahead < 0.03 : (dir > 0 ? u > 0.62 : u < 0.36);
        stoneAhead = m.stone > 0 && ahead < 0.12;
        blockedAt = stop ? 0 : -1;
        if (stop || view !== 'scope') speed = 0;
        else {
          speed += ((0.008 + 0.006 * state.phi) - speed) * Math.min(1, dt * 1.5);
          u = (u + dir * speed * dt + 1) % 1;
        }
        state.colic = colic;
        pokeWanted = 0;
      } else if (ureter) {
        const there = stone.size > 0;
        const d = (STONE_U - u + 1) % 1;
        const blocked = there && d < 0.03;
        if (pokeWanted && there && d < 0.12) {
          // the laser: a flash, pieces off, dust
          stone.size -= 1;
          light.intensity = 14;
          for (let k = 0; k < 40; k++) {
            const m = new THREE.Mesh(new THREE.TetrahedronGeometry(0.012 + 0.02 * Math.random()), new THREE.MeshStandardMaterial({ color: '#d9b878', flatShading: true }));
            m.position.copy(stone.mesh.position);
            stone.dust.push({ m, v: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8), age: 0 });
            scene.add(m);
          }
          if (stone.size > 0) {
            stone.mesh.scale.setScalar(0.45 + 0.55 * (stone.size / 3));
            event = { text: `LASER: the stone breaks (${stone.size} of 3 left)`, until: state.time + 3 };
          } else {
            scene.remove(stone.mesh);
            stone.clearedAt = state.time;
            event = { text: 'LASER: dust. The path is clear, the flow returns', until: state.time + 4 };
          }
        }
        pokeWanted = 0;
        light.intensity += ((view === 'scope' ? 3 : view === 'climb' ? 0.35 : 1.2) - light.intensity) * Math.min(1, dt * 4);
        if (!there && stone.clearedAt >= 0 && state.time - stone.clearedAt > 25 && d > 0.3) newStone();
        // colic: rises while the flow is dammed, eases when it is clear
        colic = Math.max(0, Math.min(1, colic + (there ? 0.06 : -0.12) * dt));
        tube.material.emissive.setRGB(0.23 + 0.5 * colic * (0.6 + 0.4 * Math.sin(state.time * 5)), 0.04, 0.07);
        if (stone.mesh && there && view === 'scope') stone.mesh.rotation.y += dt * 0.2;
        if (!there && view !== 'scope') { view = 'scope'; climber.visible = false; }
        for (const r of rings) {
          r.ring.visible = true;
          r.u = (r.u + dt * 0.04) % 1;
          const pp = curve.getPointAt(r.u);
          r.ring.position.copy(pp);
          r.ring.lookAt(pp.clone().add(curve.getTangentAt(r.u)));
          const squeeze = 0.75 + 0.25 * Math.sin(r.u * 40 + state.time * 2);
          r.ring.scale.set(squeeze, squeeze, 1);
        }
        for (let i = 0; i < FLOW; i++) {
          const before = false;
          flowU[i] = (flowU[i] + (before ? 0.0004 : 0.05 + 0.04 * Math.random()) * dt) % 1;
          // dammed urine collects upstream of the stone (behind it, as the scope sees it)
          if (there && ((flowU[i] - STONE_U + 1) % 1) < 0.002) flowU[i] = (STONE_U + 0.004) % 1;
          const pp = curve.getPointAt(flowU[i]).add(flowOff[i]);
          flowPos[i * 3] = pp.x;
          flowPos[i * 3 + 1] = pp.y;
          flowPos[i * 3 + 2] = pp.z;
        }
        flowGeo.attributes.position.needsUpdate = true;
        for (let i = stone.dust.length - 1; i >= 0; i--) {
          const s = stone.dust[i];
          s.age += dt;
          s.m.position.addScaledVector(s.v, dt);
          s.v.multiplyScalar(0.96);
          s.m.rotation.x += dt * 3;
          if (s.age > 6) {
            scene.remove(s.m);
            stone.dust.splice(i, 1);
          }
        }
        stoneAhead = there && d < 0.12;
        if (blocked || view !== 'scope') {
          speed = 0;
          blockedAt = blocked ? 0 : -1;
        } else {
          blockedAt = -1;
          speed += ((0.012 + 0.01 * state.phi) - speed) * Math.min(1, dt * 1.5);
          u = (u + speed * dt) % 1;
        }
        state.colic = colic;
      } else if (vessel) {
        // the submarine drifts with the flow: faster as the heart quickens
        const flow = 0.012 + 0.012 * Math.max(0, Math.min(1, ((state.bpm ?? 68) - 50) / 70));
        speed += (flow - speed) * Math.min(1, dt * 1.5);
        u = (u + speed * dt) % 1;
        wall.update({ score: state.score, bpm: state.bpm ?? 68, time: state.time });
        pokeWanted = 0;
      } else {
      const lowered = state.resource ? 0.15 : 0;
      // gates open when Phi is above their height
      for (const g of gates) {
        const target = state.phi >= g.height - lowered ? 1 : 0;
        g.open += (target - g.open) * Math.min(1, dt * 2.5);
        g.iris.scale.setScalar(Math.max(0.001, 1 - g.open));
        g.iris.material.opacity = 0.35 * (1 - g.open);
        g.ring.material.color.set(g.open > 0.5 ? '#3fd0c9' : '#ffd166');
        if (g.bypass) {
          const b = g.bypass;
          b.open += ((state.phi >= b.height - lowered ? 1 : 0) - b.open) * Math.min(1, dt * 2.5);
          b.iris.scale.setScalar(Math.max(0.001, 1 - b.open));
          b.iris.material.opacity = 0.35 * (1 - b.open);
          b.ring.material.color.set(b.open > 0.5 ? '#3fd0c9' : '#ffd166');
        }
      }
      // the next gate ahead
      const ahead = gates.map(g => ({ g, d: (g.u - u + 1) % 1 })).sort((a, b) => a.d - b.d)[0];
      const closed = !onBypass && ahead.g.open < 0.5 && ahead.d < 0.022;
      if (onBypass) {
        // on the side road: through its gate if open, else wait at it
        const b = onBypass.g.bypass;
        const atGate = onBypass.s < 0.5 && onBypass.s > 0.44;
        if (!(atGate && b.open < 0.5)) onBypass.s += dt * (0.25 + 0.4 * state.phi);
        if (onBypass.s >= 1) {
          u = (onBypass.g.u + 0.035) % 1;
          onBypass = null;
          event = { text: 'REJOINED the main road after the side road', until: state.time + 2 };
        }
      } else if (closed && ahead.g.bypass && ahead.g.bypass.open > 0.5 && !pokeWanted) {
        onBypass = { g: ahead.g, s: 0 };
        blockedAt = -1;
        event = { text: 'TOOK THE SIDE ROAD: the main gate is shut, the side road\'s lower gate open', until: state.time + 3 };
      } else if (closed) {
        speed = 0;
        blockedAt = gates.indexOf(ahead.g);
        if (pokeWanted) {
          const gap = Math.max(0, ahead.g.height - lowered - state.phi);
          const p = Math.exp(-3 * gap);
          if (Math.random() < p) {
            u = (ahead.g.u + 0.012) % 1;
            event = { text: `TUNNELLED through the boundary (chance ${(p * 100).toFixed(0)}%)`, until: state.time + 3 };
          } else {
            event = { text: `BOUNCED back: the barrier held (chance was ${(p * 100).toFixed(0)}%)`, until: state.time + 3 };
            u = (u - 0.006 + 1) % 1;
          }
        }
      } else {
        blockedAt = -1;
        speed += ((0.012 + 0.03 * state.phi) - speed) * Math.min(1, dt * 1.5);
        u = (u + speed * dt) % 1;
      }
      pokeWanted = 0;
      }
      const p = curve.getPointAt(u);
      ball.position.copy(p);
      ball.visible = !ureter;
      const sideRoad = onBypass?.g.bypass.curve ?? null;
      if (sideRoad) ball.position.copy(sideRoad.getPointAt(Math.min(1, onBypass.s)));
      if (!ureter && blood.mesh.visible) blood.update(dt, speed);
      halo.scale.setScalar(1 + 0.25 * Math.sin(state.time * 6));
      const behind = curve.getPointAt((u - 0.03 * dir + 1) % 1);
      camera.position.copy(behind).add(new THREE.Vector3(0, ureter ? 0 : 0.45, 0));
      if (light) light.position.copy(camera.position);
      camera.lookAt(curve.getPointAt((u + 0.01 * dir + 1) % 1));
      if (sideRoad) {
        camera.position.copy(sideRoad.getPointAt(Math.max(0, onBypass.s - 0.12))).add(new THREE.Vector3(0, 0.3, 0));
        camera.lookAt(sideRoad.getPointAt(Math.min(1, onBypass.s + 0.06)));
      }
      applyLook(camera);
      if (ureter && state.ureter) for (const r of rings) r.ring.visible = false;
      if (ureter && view !== 'scope' && stone.size > 0) {
        const c = stone.mesh.position;
        sun.intensity = view === 'climb' ? 0.8 : 1.2;
        sun.position.copy(c).add(new THREE.Vector3(2, 4, 1.5));
        sun.target.position.copy(c);
        if (view === 'orbit') {
          orbit.yaw += dt * 0.08;
          const d = new THREE.Vector3(Math.cos(orbit.pitch) * Math.sin(orbit.yaw), Math.sin(orbit.pitch), Math.cos(orbit.pitch) * Math.cos(orbit.yaw));
          camera.position.copy(c).addScaledVector(d, orbit.r);
          camera.lookAt(c);
        } else {
          // up the north face: from 165 degrees from the summit to the summit, about a minute
          climb.c = Math.min(1, climb.c + dt / 60);
          const polar = (165 - 160 * climb.c) * Math.PI / 180;
          const dir = new THREE.Vector3(0.15 * Math.sin(climb.c * 9), Math.cos(polar), -Math.sin(polar)).normalize();
          const p = surface(dir);
          const out = p.clone().sub(c).normalize();
          climber.position.copy(p);
          climber.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), out);
          if (!climb.trail.length || climb.trail[climb.trail.length - 1].distanceTo(p) > 0.01) {
            climb.trail.push(p.clone().addScaledVector(out, 0.002));
            if (climb.line) { scene.remove(climb.line); climb.line.geometry.dispose(); }
            climb.line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(climb.trail), new THREE.LineBasicMaterial({ color: '#ff9a3c' }));
            scene.add(climb.line);
          }
          const box = new THREE.Box3().setFromObject(stone.mesh);
          climb.alt = (p.y - box.min.y) / Math.max(1e-6, box.max.y - box.min.y);
          // over the shoulder: out from the face and a little below, looking up the route
          camera.position.copy(p).addScaledVector(out, 0.07).add(new THREE.Vector3(0, -0.03, 0));
          camera.lookAt(p.clone().add(new THREE.Vector3(0, 0.05, 0)));
        }
        if (light) light.position.copy(camera.position);
      } else if (sun) sun.intensity = 0;
      if (climb.line && view !== 'climb') { scene.remove(climb.line); climb.line = null; }
      bulb.visible = state.dim >= 11;
      bulb.rotation.y = state.time * 0.05;
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.05);
        renderer.setScissorTest(true);
        for (const [x, eye] of [[0, stereoCamera.cameraL], [size.x / 2, stereoCamera.cameraR]]) {
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
