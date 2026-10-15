// worlds3d.js: THE WORLDS (author, 16 Oct 00:50: "if you could get all of those ten in a 3D with a
// glass lid on each ... like multi-dimensional chess, each layer one of our little worlds; this
// will be the entry point of the app, perhaps"). The Soma Machine's map of itself: its ten big
// places, each a live miniature under its own glass dome, on boards in four layers stacked like
// three-dimensional chess, body at the bottom and mind above it (the model's order: the body's
// dimensions, then the limbic hinge, then the cortex), with the maps on top (the palace, the
// method of loci, and the city of code, the programme's own Lean). The routes between them run as
// tubes; one glass over all of it. Each dome is a threshold, as in the course: what is under the
// glass runs on its own; a click goes through it. A map, never the territory (ISS-096); the
// miniatures are pictures of the places, not of a brain. Interpretive.

import * as THREE from 'three';
import { applyLook } from './look.js';
import { updateStereo } from './stereo-depth.js';
import { bubbleMaterial, bubbleEnvironment, tickBubbles } from './bubble.js';

// [id, title, sub, layer, slot of the layer, stop, place, colour]
export const WORLDS = [
  ['human', 'THE HUMAN', 'the whole body as one field', 0, 0, 'human', '', '#5ee7ff'],
  ['heart', 'THE HEART', 'the body\'s hub', 0, 1, 'body', 'hall', '#ff4d5e'],
  ['soma', 'THE SOMA', 'inside one neuron', 1, 0, 'neuron', 'hall', '#ffd166'],
  ['hall', 'THE GREAT HALL', 'the brain, a building', 1, 1, 'brain', 'hall', '#a78bfa'],
  ['cathedral', 'THE CATHEDRAL', 'the ventricles', 1, 2, 'brain', 'cave', '#c8b6ff'],
  ['chamber', 'THE MIND CHAMBER', 'thoughts cross the line', 2, 0, 'thought', 'hall', '#ff7ad9'],
  ['course', 'THE COURSE', 'one thought, opened', 2, 1, 'thought', 'choices', '#ffb36b'],
  ['load', 'THE LOAD', 'the landscape and its worries', 2, 2, 'landscape', 'golf', '#56f0a2'],
  ['palace', 'THE PALACE', 'memory: twenty-one floors', 3, 0, 'brain', 'palace', '#5ee7ff'],
  ['city', 'THE CITY OF CODE', 'the programme\'s own Lean', 3, 1, 'landscape', '', '#56f0a2'],
];
export const LAYERS = [
  { name: 'BODY', sub: 'D1-7: the body\'s dimensions', y: 0, z: 9.5, n: 2, turn: 0.3, color: '#5ee7ff' },
  { name: 'BRAIN', sub: 'D8: the limbic hinge and the cells', y: 0, z: 3.2, n: 3, turn: 1.4, color: '#a78bfa' },
  { name: 'MIND', sub: 'D9-11: the cortex, thought', y: 0, z: -3.2, n: 3, turn: 0.35, color: '#ff7ad9' },
  { name: 'THE MAPS', sub: 'memory and the formal layer: maps, not the territory', y: 0, z: -9.5, n: 2, turn: 1.9, color: '#56f0a2' },
];
// the routes: the ways between the places, as the explorer's doorways and buttons have them
const ROUTES = [
  ['human', 'heart'], ['heart', 'hall'], ['hall', 'soma'], ['hall', 'cathedral'], ['hall', 'chamber'],
  ['chamber', 'course'], ['chamber', 'load'], ['chamber', 'palace'], ['hall', 'palace'], ['load', 'city'],
];
const R_ARM = 5.2, DOME = 1.7;

function textSprite(text, color, sub = '', w = 0.2) {
  const c = document.createElement('canvas');
  c.width = 640; c.height = 140;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.shadowColor = color; g.shadowBlur = 18;
  g.fillStyle = '#ffffff';
  g.font = '700 54px "Space Mono", monospace';
  g.fillText(text, 320, 64);
  if (sub) { g.shadowBlur = 0; g.fillStyle = 'rgba(232,238,252,0.8)'; g.font = '28px "Space Mono", monospace'; g.fillText(sub, 320, 112); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false }));
  s.scale.set(w, w * 0.22, 1);
  s.renderOrder = 10;
  return s;
}

function glassMaterial(color) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uHot: { value: 0 }, uTime: { value: 0 } },
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying vec3 vP; void main() { vP = position; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform float uHot; uniform float uTime; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main() {
        float rim = pow(1.0 - abs(dot(vN, vV)), 2.5);
        float sheen = 0.5 + 0.5 * sin(vP.y * 3.0 - uTime * 0.7 + vP.x);
        vec3 c = mix(uColor, vec3(1.0), 0.35) * (0.02 + 0.5 * rim + 0.03 * sheen) * (1.0 + 1.6 * uHot);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
}

// the miniatures: each place in a few strokes, in its own colours; update(t, fx)
const MINIS = {
  human(g, c) {
    const m = new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.7 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.7, 4, 10), m);
    body.position.y = 0.7;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 8), new THREE.MeshBasicMaterial({ color: '#ff7ad9', wireframe: true }));
    head.position.y = 1.35;
    const rings = [0.45, 0.75, 1.0].map((y, k) => { const r = new THREE.Mesh(new THREE.TorusGeometry(0.45 - 0.05 * k, 0.012, 6, 40), new THREE.MeshBasicMaterial({ color: k % 2 ? '#ff7ad9' : c })); r.rotation.x = Math.PI / 2; r.position.y = y; return r; });
    g.add(body, head, ...rings);
    return t => rings.forEach((r, k) => { r.scale.setScalar(1 + 0.12 * Math.sin(t * 2 + k)); });
  },
  heart(g, c) {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 16), new THREE.MeshStandardMaterial({ color: '#5a0a18', emissive: c, emissiveIntensity: 0.5, roughness: 0.4 }));
    h.position.y = 0.7;
    const veins = [0, 1, 2, 3].map(k => { const v = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8), new THREE.MeshBasicMaterial({ color: '#ff7a8a' })); const a = k * Math.PI / 2 + 0.4; v.position.set(Math.cos(a) * 0.35, 1.2, Math.sin(a) * 0.35); v.rotation.z = Math.cos(a) * 0.5; v.rotation.x = -Math.sin(a) * 0.5; return v; });
    g.add(h, ...veins);
    return t => { const beat = Math.exp(-((t * 68 / 60) % 1) * 6); h.scale.setScalar(1 + 0.15 * beat); h.material.emissiveIntensity = 0.4 + 0.8 * beat; };
  },
  soma(g, c) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 12), new THREE.MeshStandardMaterial({ color: '#3a2a08', emissive: c, emissiveIntensity: 0.6 }));
    s.position.y = 0.8;
    const lines = [];
    for (let k = 0; k < 7; k++) {
      const a = k * 0.9, e = (k % 3) * 0.4 - 0.4;
      const pts = [new THREE.Vector3(0, 0.8, 0), new THREE.Vector3(Math.cos(a) * 0.6, 0.8 + e, Math.sin(a) * 0.6), new THREE.Vector3(Math.cos(a + 0.3) * 1.0, 0.8 + e * 1.6, Math.sin(a + 0.3) * 1.0)];
      lines.push(new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3(pts).getPoints(16)), new THREE.LineBasicMaterial({ color: k ? c : '#ffffff' })));
    }
    const spike = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    g.add(s, ...lines, spike);
    const axon = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.8, 0), new THREE.Vector3(0.6, 0.6, 0.3), new THREE.Vector3(1.1, 0.4, 0.1)]);
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(axon.getPoints(20)), new THREE.LineBasicMaterial({ color: '#ffffff' })));
    return (t, fx) => { const k = (t * (0.5 + fx)) % 1; spike.position.copy(axon.getPointAt(k)); s.material.emissiveIntensity = 0.4 + 0.6 * Math.exp(-k * 5); };
  },
  hall(g, c) {
    const doors = ['#ff7ad9', '#ffd166', '#5ee7ff', '#a78bfa', '#ff4d5e'].map((col, k) => { const d = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 8, 32), new THREE.MeshBasicMaterial({ color: col })); const a = k * 1.26 + 0.6; d.position.set(Math.cos(a) * 0.95, 0.4, Math.sin(a) * 0.95); d.lookAt(0, 0.4, 0); return d; });
    const vault = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.18 }));
    const jelly = [0, 1, 2].map(k => { const j = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ff7ad9', transparent: true, opacity: 0.8 })); j.position.set((k - 1) * 0.35, 0.9, 0.1 * k); return j; });
    g.add(vault, ...doors, ...jelly);
    return t => jelly.forEach((j, k) => { j.position.y = 0.8 + 0.12 * Math.sin(t * 0.9 + k * 2); });
  },
  cathedral(g, c) {
    const pts = [];
    for (let k = 0; k <= 60; k++) { const a = k * 0.22; pts.push(new THREE.Vector3(Math.cos(a) * 0.7, 1.4 - k * 0.022, Math.sin(a) * 0.7)); }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.12, 10, false), new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.55 }));
    const light = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    g.add(tube, light);
    return (t, fx) => { light.position.copy(curve.getPointAt((t * 0.08) % 1)); tube.material.color.set(fx > 0.85 ? '#ffffff' : c); };
  },
  chamber(g, c, env) {
    const foam = new THREE.Points(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 220 }, () => new THREE.Vector3((Math.random() - 0.5) * 2, 0.15 + Math.random() * 0.25, (Math.random() - 0.5) * 2).multiplyScalar(0.8))), new THREE.PointsMaterial({ color: '#3a6bff', size: 0.04 }));
    const line = new THREE.Mesh(new THREE.RingGeometry(0.2, 1.05, 48), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.25, side: THREE.DoubleSide }));
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.5;
    const bubbles = [0, 1, 2, 3].map(k => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 12), bubbleMaterial({ tint: ['#ff7ad9', '#5ee7ff', '#ffd166', '#a78bfa'][k], opacity: 0.5 })); b.userData.p = k * 1.7; return b; });
    g.add(foam, line, ...bubbles);
    return (t, fx) => bubbles.forEach((b, k) => { const y = (t * (0.15 + 0.25 * fx) + b.userData.p) % 1; b.position.set(Math.cos(k * 1.6) * 0.5, 0.3 + y * 1.2, Math.sin(k * 1.6) * 0.5); b.scale.setScalar(y > 0.2 ? 1 : 0.4); });
  },
  course(g, c) {
    const geo = new THREE.PlaneGeometry(1.8, 1.8, 30, 30);
    geo.rotateX(-Math.PI / 2);
    const base = geo.attributes.position.array.slice();
    const sea = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: '#5a4bd6', wireframe: true, transparent: true, opacity: 0.6 }));
    sea.position.y = 0.35;
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.95, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.25 }));
    lid.scale.y = 0.6;
    lid.position.y = 0.35;
    const pop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 8), new THREE.MeshBasicMaterial({ color: '#ff3b6e' }));
    g.add(sea, lid, pop);
    return (t, fx) => {
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const x = base[i * 3], z = base[i * 3 + 2]; const env = Math.max(0, 1 - (x * x + z * z) / 0.9); p.setY(i, env * (0.12 + (0.1 + 0.15 * fx) * Math.sin(x * 4 + t * 1.2) * Math.cos(z * 3 - t))); }
      p.needsUpdate = true;
      const k = (t * 0.3) % 1;
      pop.position.set(0.3, 0.5 + k * 0.9, 0);
      pop.visible = k > 0.15;
    };
  },
  load(g, c) {
    const square = (s, x, z, col) => {
      const geo = new THREE.PlaneGeometry(s, s, 14, 14);
      geo.rotateX(-Math.PI / 2);
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) { const px = p.getX(i) / s * 2, pz = p.getZ(i) / s * 2; const w = (a, b) => Math.exp(-((px - a) ** 2 + (pz - b) ** 2) * 4); p.setY(i, (-0.6 * (w(0, -0.5) + w(-0.5, 0.35) + w(0.5, 0.35)) + 0.2) * s * 0.25); }
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.6 }));
      m.position.set(x, 0.4, z);
      g.add(m);
      return m;
    };
    square(0.9, 0, 0.25, c);
    const small = [-2.4, -1.9, -1.57, -1.2, -0.7].map(a => square(0.38, Math.cos(a) * 0.85, Math.sin(a) * 0.75 + 0.15, '#c8b6ff'));
    const attn = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 6), new THREE.MeshBasicMaterial({ color: '#c04dff' }));
    g.add(attn);
    return t => { const k = Math.floor(t / 3) % 6; const at = k === 0 ? new THREE.Vector3(0, 0.45, 0.25) : small[k - 1].position.clone().add(new THREE.Vector3(0, 0.08, 0)); attn.position.lerp(at, 0.08); };
  },
  palace(g, c) {
    const floors = [];
    for (let k = 0; k < 21; k++) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.7 - k * 0.012, 0.03, 0.7 - k * 0.012), new THREE.MeshBasicMaterial({ color: k % 5 ? c : '#ff7ad9', transparent: true, opacity: 0.55 })); f.position.y = 0.15 + k * 0.065; floors.push(f); g.add(f); }
    const car = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.12), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    car.position.x = 0.45;
    g.add(car);
    return t => { car.position.y = 0.15 + ((Math.sin(t * 0.4) + 1) / 2) * 1.3; };
  },
  city(g, c) {
    const towers = [];
    for (let k = 0; k < 14; k++) {
      const h = 0.3 + ((k * 7) % 10) / 10 * 1.0;
      const b = new THREE.Mesh(new THREE.BoxGeometry(0.16, h, 0.16), new THREE.MeshBasicMaterial({ color: k % 4 ? c : '#ff7ad9', wireframe: true, transparent: true, opacity: 0.8 }));
      b.position.set(((k % 5) - 2) * 0.32, h / 2 + 0.05, (Math.floor(k / 5) - 1) * 0.36);
      towers.push(b);
      g.add(b);
    }
    return t => towers.forEach((b, k) => { b.material.opacity = 0.5 + 0.4 * Math.abs(Math.sin(t * 1.5 + k)); });
  },
};

export function createWorlds3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#04030b');
  scene.fog = new THREE.FogExp2('#04030b', 0.018);
  scene.environment = bubbleEnvironment(renderer);
  scene.add(new THREE.AmbientLight('#8070c0', 0.8));
  const key = new THREE.DirectionalLight('#dfe6ff', 1.0);
  key.position.set(6, 14, 8);
  scene.add(key);
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 300);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  const ray = new THREE.Raycaster();

  // the floor: a neon grid, the great hall's palette
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShaderMaterial({
    vertexShader: 'varying vec3 vP; void main() { vP = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vP, 1.0); }',
    fragmentShader: 'varying vec3 vP; void main() { vec2 g = abs(fract(vP.xz * 0.5) - 0.5); float l = smoothstep(0.46, 0.5, max(g.x, g.y)); float f = exp(-length(vP.xz) * 0.07); gl_FragColor = vec4(mix(vec3(0.02, 0.015, 0.05), vec3(0.4, 0.22, 0.85), l * 0.7) * f, 1.0); }',
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.2;
  scene.add(floor);

  // the column and the layers' names
  const chrome = new THREE.MeshStandardMaterial({ color: '#a8b8de', metalness: 0.85, roughness: 0.28, emissive: '#26345e', emissiveIntensity: 0.5 });
  // THE PARK (author, 16 Oct 01:18: "lay them flat ... a higher altitude ... like a theme park"):
  // each layer a land on the ground, the body nearest, the maps furthest; walkways between
  const top = 6;
  for (const L of LAYERS) {
    const land = new THREE.Mesh(new THREE.PlaneGeometry(26, 5.6), new THREE.MeshBasicMaterial({ color: L.color, transparent: true, opacity: 0.06, depthWrite: false }));
    land.rotation.x = -Math.PI / 2;
    land.position.set(0, -1.15, L.z);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(26, 5.6)), new THREE.LineBasicMaterial({ color: L.color, transparent: true, opacity: 0.45 }));
    edge.rotation.x = -Math.PI / 2;
    edge.position.copy(land.position);
    scene.add(land, edge);
  }
  const layerTags = LAYERS.map(L => { const s = textSprite(L.name, L.color, L.sub, 0.17); s.position.set(-15.5, 0, L.z); scene.add(s); return s; });

  // the worlds: a board on an arm, a glass dome, the miniature, the name
  const worlds = WORLDS.map(([id, title, sub, layer, slot, stop, place, color]) => {
    const L = LAYERS[layer];
    // facing the visitor (author, 16 Oct 01:00: "as it rotates round the back it is hard to read ... zig-zag"):
    // each layer spread left to right, alternate boards forward and back, the layers shifted
    // left and right in turn; the higher, the bigger
    const pos = new THREE.Vector3((slot - (L.n - 1) / 2) * 7 + (layer % 2 ? 1.8 : -1.8), L.y, L.z + (slot % 2 ? -0.7 : 0.7));
    const grow = 1 + 0.08 * layer;   // the far lands a little bigger, against the perspective
    const g = new THREE.Group();
    g.position.copy(pos);
    g.scale.setScalar(grow);
    const board = new THREE.Mesh(new THREE.CylinderGeometry(DOME * 1.08, DOME * 1.12, 0.12, 48), new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.12), emissive: color, emissiveIntensity: 0.12, roughness: 0.5 }));
    board.position.y = -0.06;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(DOME * 1.1, 0.035, 8, 80), new THREE.MeshBasicMaterial({ color }));
    rim.rotation.x = Math.PI / 2;
    const checks = new THREE.Mesh(new THREE.CircleGeometry(DOME * 1.05, 8, 0), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.25 }));
    checks.rotation.x = -Math.PI / 2;
    checks.position.y = 0.01;
    const glass = new THREE.Mesh(new THREE.SphereGeometry(DOME, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), glassMaterial(color));
    glass.renderOrder = 5;
    const mini = new THREE.Group();
    const tick = MINIS[id](mini, color);
    const name = textSprite(title, color, sub);
    name.position.y = DOME + 0.55;
    g.add(board, rim, checks, mini, glass, name);
    scene.add(g);
    return { id, title, stop, place, color, g, glass, rim, tick, name, pos, hot: 0 };
  });
  const byId = Object.fromEntries(worlds.map(w => [w.id, w]));

  // the routes: tubes between the boards, light flowing along them
  const routes = ROUTES.map(([a, b]) => {
    const A = byId[a].pos.clone(), B = byId[b].pos.clone();
    const mid = A.clone().lerp(B, 0.5);
    mid.x += (A.z === B.z ? 0 : 1.2);
    mid.y = 0.25;
    const curve = new THREE.CatmullRomCurve3([A.clone().setY(A.y + 0.1), mid, B.clone().setY(B.y + 0.1)]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.07, 8, false), new THREE.MeshBasicMaterial({ color: byId[a].color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
    const dots = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffffff' }), 5);
    scene.add(tube, dots);
    return { curve, dots, phase: Math.random() };
  });

  // THE GLASS OVER ALL OF IT
  const BIG = 12;
  const big = new THREE.Mesh(new THREE.SphereGeometry(BIG, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), glassMaterial('#a78bfa'));
  big.scale.set(1.45, 0.42, 1.25);
  big.position.y = -1.2;
  big.renderOrder = 6;
  scene.add(big);

  let last = 0, clock = 0, hover = null, dive = null;
  const target = new THREE.Vector3(0, -1, -0.5);
  const o = new THREE.Object3D();
  const pickAt = (fx, fy) => {
    ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
    const hit = ray.intersectObjects(worlds.flatMap(w => [w.glass, w.rim]), false)[0];
    return hit ? worlds.find(w => w.glass === hit.object || w.rim === hit.object) : null;
  };
  return {
    canvas,
    // the world under a screen point (fractions from the centre): { stop, place, title } or null
    pick(fx, fy) { const w = pickAt(fx, fy); return w ? { stop: w.stop, place: w.place, title: w.title, id: w.id } : null; },
    hover(fx, fy) { hover = fx === null ? null : pickAt(fx, fy); return hover ? hover.title : null; },
    // the camera flies down into a dome, then done()
    dive(id, done) { const w = byId[id]; if (!w) { done?.(); return; } dive = { from: camera.position.clone(), to: w.pos.clone().add(new THREE.Vector3(0, 0.8, 0)), look: w.pos.clone().add(new THREE.Vector3(0, 0.4, 0)), start: performance.now(), done }; },
    get diving() { return Boolean(dive); },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, phi, stereo, labels }
    render(s) {
      const dt = Math.min(0.05, last ? s.time - last : 0.016);
      last = s.time;
      clock += dt;
      tickBubbles(clock);
      const fx = Math.max(0, Math.min(1, s.phi ?? 0.5));
      for (const w of worlds) {
        w.tick(clock, fx);
        w.hot += ((w === hover ? 1 : 0) - w.hot) * Math.min(1, dt * 6);
        w.glass.material.uniforms.uTime.value = clock;
        w.glass.material.uniforms.uHot.value = w.hot;
        w.rim.scale.setScalar(1 + 0.06 * w.hot);
        w.name.visible = s.labels !== false;
      }
      big.material.uniforms.uTime.value = clock;
      layerTags.forEach(t => { t.visible = s.labels !== false; });
      for (const r of routes) {
        for (let k = 0; k < 5; k++) { o.position.copy(r.curve.getPointAt((r.phase + clock * (0.06 + 0.1 * fx) + k / 5) % 1)); o.updateMatrix(); r.dots.setMatrixAt(k, o.matrix); }
        r.dots.instanceMatrix.needsUpdate = true;
      }
      if (dive) {
        const t = Math.min(1, (performance.now() - dive.start) / 1300);
        const e = t * t * (3 - 2 * t);
        camera.position.copy(dive.from).lerp(dive.to, e);
        camera.lookAt(target.clone().lerp(dive.look, e));
        if (t >= 1) { const done = dive.done; dive = null; done?.(); }
      } else {
        // in front, swaying: all ten always in view, never from behind
        const a = 0.22 * Math.sin(clock * 0.045);
        const R = 25;
        camera.position.set(Math.sin(a) * R, 27 + 1.5 * Math.sin(clock * 0.06), Math.cos(a) * R + 4);
        camera.lookAt(target);
        applyLook(camera);
      }
      renderer.getSize(size);
      if (s.stereo === 'half' || s.stereo === 'full') {
        camera.aspect = s.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereo, camera, 0.25);
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
