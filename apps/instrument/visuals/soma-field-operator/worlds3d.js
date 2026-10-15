// worlds3d.js: THE WORLDS, the Soma Machine's entry and its map of itself (author, 16 Oct). The
// zoom as nested glass domes: on opening, five, the model's coarse levels (its sectors: QUANTUM,
// LIFE, HUMAN, EARTH, COSMOS), each a scale model of the real thing under glass. Click one and it
// grows round its own few domes while the others shrink to a shelf at the back; and so on down
// (HUMAN: BODY, BRAIN, MIND, each with its places). A dome with nothing inside is a door: a place
// in the explorer, or a floor of the level view. The fader at the left edge is the zoom (author:
// "a DAW slider, a slim triangle under it pointing down"): it picks among the domes in view; the
// triangle goes in. Each dome a threshold, as in the course. A map, never the territory (ISS-096);
// the miniatures are pictures, not measurements. Interpretive.

import * as THREE from 'three';
import { applyLook } from './look.js';
import { updateStereo } from './stereo-depth.js';
import { bubbleMaterial, bubbleEnvironment, tickBubbles } from './bubble.js';

const L = (id, title, level, mini, scale) => ({ id, title, level, mini, scale });
const P = (id, title, stop, place, mini) => ({ id, title, stop, place, mini });
// the tree: { id, title, color, mini, scale, children } | a level door | a place door
export const TREE = {
  id: 'root', title: 'THE WORLDS', children: [
    { id: 'quantum', title: 'QUANTUM', color: '#8ecbff', mini: 'atom', scale: '10⁻³⁵ to 10⁻¹⁰ m', children: [
      L('foam', 'QUANTUM FOAM', 'quantum-foam', 'foam', '10⁻³⁵ m'), L('string', 'THE STRING', 'string-boundary', 'string', '10⁻³² m'),
      L('nuclear', 'THE NUCLEUS', 'nuclear', 'nuclear', '10⁻¹⁵ m'), L('atomic', 'THE ATOM', 'atomic', 'atom', '10⁻¹⁰ m')] },
    { id: 'life', title: 'LIFE', color: '#56f0a2', mini: 'cell', scale: '10⁻⁹ to 10⁻⁶ m', children: [
      L('molecular', 'MOLECULES', 'molecular', 'molecule', '10⁻⁹ m'), L('cellular', 'THE CELL', 'cellular-synaptic', 'cell', '10⁻⁶ m'),
      P('soma', 'THE SOMA', 'neuron', 'hall', 'soma')] },
    { id: 'human', title: 'HUMAN', color: '#5ee7ff', mini: 'human', scale: '10⁻¹ to 10⁰ m', children: [
      { id: 'body', title: 'BODY', color: '#ff4d5e', mini: 'heart', children: [
        P('human-place', 'THE HUMAN', 'human', '', 'human'), P('heart', 'THE HEART', 'body', 'hall', 'heart'), P('wayin', 'THE WAY IN', 'wayin', '', 'wayin')] },
      { id: 'brain', title: 'BRAIN', color: '#a78bfa', mini: 'hall', children: [
        P('hall', 'THE GREAT HALL', 'brain', 'hall', 'hall'), P('cathedral', 'THE CATHEDRAL', 'brain', 'cave', 'cathedral'), P('palace', 'THE PALACE', 'brain', 'palace', 'palace')] },
      { id: 'mind', title: 'MIND', color: '#ff7ad9', mini: 'chamber', children: [
        P('chamber', 'THE MIND CHAMBER', 'thought', 'hall', 'chamber'), P('course', 'THE COURSE', 'thought', 'choices', 'course'),
        P('load', 'THE LOAD', 'landscape', 'golf', 'load'), P('city', 'THE CITY OF CODE', 'landscape', '', 'city')] }] },
    { id: 'earth', title: 'EARTH', color: '#ffd166', mini: 'planet', scale: '10⁰ to 10⁶ m', children: [
      P('dyad', 'THE DYAD', 'dyad', '', 'dyad'), L('swarm', 'THE SWARM', 'animal-swarm', 'swarm', '10² m'),
      L('society', 'THE CITY', 'society-city', 'society', '10³ m'), L('geological', 'THE LAND', 'geological', 'terrain', '10⁵ m'),
      L('planetary', 'THE PLANET', 'planetary', 'planet', '10⁶ m')] },
    { id: 'cosmos', title: 'COSMOS', color: '#c8b6ff', mini: 'galaxy', scale: '10⁹ to 10²⁶ m', children: [
      { id: 'stars', title: 'STARS', color: '#ffb36b', mini: 'solar', children: [
        L('orbital', 'THE ORBITS', 'orbital-system', 'solar', '10⁹ m'), L('stellar', 'THE STAR', 'stellar', 'star', '10¹¹ m'), L('compact', 'THE COMPACT OBJECT', 'compact-object', 'compact', '10³ to 10¹⁰ m')] },
      { id: 'galaxies', title: 'GALAXIES', color: '#c8b6ff', mini: 'galaxy', children: [
        L('disc', 'THE DISC', 'galactic-disc', 'galaxy', '10²⁰ m'), L('halo', 'THE HALO', 'galactic-halo', 'halo', '10²² m'), L('cluster', 'THE CLUSTER', 'galaxy-cluster', 'cluster', '10²³ m')] },
      { id: 'universe', title: 'THE UNIVERSE', color: '#8ecbff', mini: 'web', children: [
        L('filaments', 'THE FILAMENTS', 'cosmic-filaments', 'web', '10²⁴ m'), L('observable', 'THE OBSERVABLE', 'observable-universe', 'web', '10²⁶ m'), L('cosmicweb', 'THE COSMIC WEB', 'cosmic-web', 'web', '10²⁶ m')] }] },
  ],
};
const NODES = new Map();
(function index(n, parent = null) { n.parent = parent; NODES.set(n.id, n); for (const c of n.children ?? []) { c.color ??= n.color; index(c, n); } })(TREE);

// a name on a dark plate, kept the same size on screen
function plate(text, color, sub = '') {
  const c = document.createElement('canvas');
  c.width = 720; c.height = sub ? 150 : 104;
  const g = c.getContext('2d');
  g.font = '700 50px "Space Mono", monospace';
  const w = Math.min(700, Math.max(g.measureText(text).width, sub ? 260 : 0) + 56);
  g.fillStyle = 'rgba(5,7,18,0.86)';
  g.strokeStyle = color; g.lineWidth = 3;
  g.beginPath(); g.roundRect((720 - w) / 2, 6, w, c.height - 12, 18); g.fill(); g.stroke();
  g.textAlign = 'center';
  g.fillStyle = '#ffffff';
  g.shadowColor = color; g.shadowBlur = 10;
  g.fillText(text, 360, 70);
  if (sub) { g.shadowBlur = 0; g.fillStyle = color; g.font = '30px "Space Mono", monospace'; g.fillText(sub, 360, 120); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, depthTest: false, sizeAttenuation: false }));
  s.userData.aspect = c.height / 720;
  s.renderOrder = 10;
  return s;
}

function glassMaterial(color) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uHot: { value: 0 }, uTime: { value: 0 }, uFade: { value: 1 } },
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying vec3 vP; void main() { vP = position; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform float uHot; uniform float uTime; uniform float uFade; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main() {
        float rim = pow(1.0 - abs(dot(vN, vV)), 2.5);
        float sheen = 0.5 + 0.5 * sin(vP.y * 3.0 - uTime * 0.7 + vP.x);
        vec3 c = mix(uColor, vec3(1.0), 0.35) * (0.02 + 0.5 * rim + 0.03 * sheen) * (1.0 + 1.6 * uHot) * uFade;
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
}

const pts = (n, f) => new THREE.Points(new THREE.BufferGeometry().setFromPoints(Array.from({ length: n }, (_, i) => f(i))), new THREE.PointsMaterial({ size: 0.04, vertexColors: false }));
const wire = (geo, color, opacity = 0.7) => new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity }));
const glowBall = (r, color, i = 0.9) => new THREE.Mesh(new THREE.SphereGeometry(r, 24, 16), new THREE.MeshStandardMaterial({ color: new THREE.Color(color).multiplyScalar(0.3), emissive: color, emissiveIntensity: i, roughness: 0.4 }));

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

  // ---- the scale models: each a picture of the real thing, a few strokes, moving
  atom(g, c) {
    const nuc = new THREE.Group();
    for (let k = 0; k < 12; k++) { const b = glowBall(0.09, k % 2 ? '#ff4d5e' : '#8ecbff', 0.6); b.position.set(Math.sin(k * 2.4) * 0.12, Math.cos(k * 1.7) * 0.12, Math.sin(k * 3.1) * 0.12); nuc.add(b); }
    nuc.position.y = 0.8;
    const orbits = [0, 1, 2].map(k => { const o = new THREE.Group(); const r = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.01, 6, 64), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.6 })); const e = glowBall(0.05, '#ffffff', 1.2); e.position.x = 0.75; o.add(r, e); o.position.y = 0.8; o.rotation.set(k * 1.05, k * 0.6, 0); return { o, e }; });
    g.add(nuc, ...orbits.map(x => x.o));
    return t => { orbits.forEach(({ o }, k) => { o.children[1].position.set(Math.cos(t * (1.2 + k * 0.4)) * 0.75, Math.sin(t * (1.2 + k * 0.4)) * 0.75, 0); }); nuc.rotation.y = t * 0.3; };
  },
  foam(g, c) {
    const p = pts(400, () => new THREE.Vector3((Math.random() - 0.5) * 2, 0.1 + Math.random() * 1.4, (Math.random() - 0.5) * 2));
    p.material.color.set(c);
    g.add(p);
    const base = p.geometry.attributes.position.array.slice();
    return t => { const a = p.geometry.attributes.position; for (let i = 0; i < a.count; i++) a.setY(i, base[i * 3 + 1] + 0.08 * Math.sin(t * 9 + i * 1.7)); a.needsUpdate = true; p.material.opacity = 1; };
  },
  string(g, c) {
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 80 }, () => new THREE.Vector3())), new THREE.LineBasicMaterial({ color: c }));
    const loop = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 81 }, () => new THREE.Vector3())), new THREE.LineBasicMaterial({ color: '#ff7ad9' }));
    g.add(line, loop);
    return t => {
      const a = line.geometry.attributes.position; for (let i = 0; i < 80; i++) { const x = i / 79 * 1.8 - 0.9; a.setXYZ(i, x, 0.6 + 0.25 * Math.sin(Math.PI * (i / 79) * 3) * Math.sin(t * 4), 0); } a.needsUpdate = true;
      const b = loop.geometry.attributes.position; for (let i = 0; i <= 80; i++) { const u = i / 80 * Math.PI * 2; const r = 0.4 + 0.08 * Math.sin(u * 4 + t * 5); b.setXYZ(i, Math.cos(u) * r, 1.15 + Math.sin(u) * r * 0.3, Math.sin(u) * r * 0.6); } b.needsUpdate = true;
    };
  },
  nuclear(g, c) {
    const nuc = new THREE.Group();
    for (let k = 0; k < 26; k++) { const b = glowBall(0.13, k % 2 ? '#ff4d5e' : c, 0.5); const v = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(0.3 * Math.cbrt(Math.random())); b.position.copy(v); nuc.add(b); }
    nuc.position.y = 0.8;
    const gl = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 12), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.08 }));
    gl.position.y = 0.8;
    g.add(nuc, gl);
    return t => { nuc.rotation.set(t * 0.4, t * 0.6, 0); nuc.scale.setScalar(1 + 0.04 * Math.sin(t * 6)); };
  },
  molecule(g, c) {
    const m = new THREE.Group();
    const at = [[0, 0, 0, '#ff4d5e', 0.2], [0.42, 0.22, 0, '#ffffff', 0.12], [-0.42, 0.22, 0, '#ffffff', 0.12], [0, -0.45, 0.3, c, 0.17], [0.3, -0.75, -0.2, '#ffffff', 0.12]];
    for (const [x, y, z, col, r] of at) { const b = glowBall(r, col, 0.4); b.position.set(x, y, z); m.add(b); }
    for (const [a, b] of [[0, 1], [0, 2], [0, 3], [3, 4]]) { const A = new THREE.Vector3(...at[a].slice(0, 3)), B = new THREE.Vector3(...at[b].slice(0, 3)); const s = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, A.distanceTo(B), 8), new THREE.MeshBasicMaterial({ color: '#c8d0e8' })); s.position.copy(A).lerp(B, 0.5); s.lookAt(B); s.rotateX(Math.PI / 2); m.add(s); }
    m.position.y = 0.95;
    g.add(m);
    return t => { m.rotation.y = t * 0.5; m.rotation.x = 0.3 * Math.sin(t * 0.4); };
  },
  cell(g, c) {
    const mem = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 20), bubbleMaterial({ tint: c, opacity: 0.35 }));
    mem.position.y = 0.85;
    const nucleus = glowBall(0.3, '#a78bfa', 0.5);
    nucleus.position.set(0.1, 0.85, 0);
    const org = [0, 1, 2, 3, 4, 5].map(k => { const o = glowBall(0.07 + 0.03 * (k % 2), k % 2 ? '#ffd166' : c, 0.6); o.userData.a = k; return o; });
    g.add(mem, nucleus, ...org);
    return t => { org.forEach((o, k) => o.position.set(Math.cos(t * 0.3 + k) * 0.55, 0.85 + 0.35 * Math.sin(t * 0.4 + k * 2), Math.sin(t * 0.3 + k) * 0.5)); mem.scale.set(1 + 0.03 * Math.sin(t), 1 - 0.03 * Math.sin(t), 1); };
  },
  wayin(g, c) {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.8, 0.2, 0.3), new THREE.Vector3(-0.3, 0.8, -0.2), new THREE.Vector3(0.3, 0.6, 0.3), new THREE.Vector3(0.8, 1.4, 0)]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.14, 12, false), new THREE.MeshStandardMaterial({ color: '#4a0812', emissive: '#ff4d5e', emissiveIntensity: 0.35, transparent: true, opacity: 0.8 }));
    const cells = [0, 1, 2, 3].map(() => glowBall(0.06, '#ff7a8a', 0.8));
    g.add(tube, ...cells);
    return t => cells.forEach((b, k) => b.position.copy(curve.getPointAt((t * 0.15 + k / 4) % 1)));
  },
  dyad(g, c) {
    const fig = x => { const f = new THREE.Group(); const b = wire(new THREE.CapsuleGeometry(0.18, 0.45, 4, 8), c, 0.7); b.position.y = 0.55; const h = wire(new THREE.SphereGeometry(0.14, 10, 8), '#ff7ad9', 0.9); h.position.y = 1.0; f.add(b, h); f.position.x = x; return f; };
    const a = fig(-0.5), b = fig(0.5);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 6, 32), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    ring.position.y = 0.7; ring.rotation.y = Math.PI / 2;
    g.add(a, b, ring);
    return t => { const k = (t * 0.8) % 1; ring.position.x = -0.4 + 0.8 * k; ring.scale.setScalar(0.6 + k); };
  },
  swarm(g, c) {
    const birds = Array.from({ length: 60 }, (_, i) => ({ p: Math.random() * 6, r: 0.3 + Math.random() * 0.6, h: 0.5 + Math.random() * 0.8 }));
    const p = pts(60, () => new THREE.Vector3());
    p.material.color.set(c); p.material.size = 0.07;
    g.add(p);
    return t => { const a = p.geometry.attributes.position; birds.forEach((b, i) => a.setXYZ(i, Math.cos(t * 0.8 + b.p) * b.r + 0.2 * Math.sin(t * 2 + i), b.h + 0.15 * Math.sin(t * 1.3 + b.p * 2), Math.sin(t * 0.8 + b.p) * b.r * 0.7)); a.needsUpdate = true; };
  },
  society(g, c) {
    const lights = [];
    for (let k = 0; k < 22; k++) { const h = 0.15 + Math.random() * 0.9; const b = new THREE.Mesh(new THREE.BoxGeometry(0.14, h, 0.14), new THREE.MeshStandardMaterial({ color: '#1a1830', emissive: k % 3 ? '#ffd166' : '#5ee7ff', emissiveIntensity: 0.35 })); b.position.set(((k % 6) - 2.5) * 0.24, h / 2, (Math.floor(k / 6) - 1.5) * 0.28); lights.push(b); g.add(b); }
    return t => lights.forEach((b, k) => { b.material.emissiveIntensity = 0.25 + 0.3 * Math.abs(Math.sin(t * 0.7 + k)); });
  },
  terrain(g, c) {
    const geo = new THREE.PlaneGeometry(1.9, 1.9, 24, 24);
    geo.rotateX(-Math.PI / 2);
    const a = geo.attributes.position;
    for (let i = 0; i < a.count; i++) { const x = a.getX(i), z = a.getZ(i); a.setY(i, 0.3 + 0.35 * Math.max(0, Math.sin(x * 2.2) * Math.cos(z * 1.9)) + 0.1 * Math.sin(x * 6 + z * 4)); }
    geo.computeVertexNormals();
    const land = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#2a2a18', emissive: c, emissiveIntensity: 0.15, flatShading: true }));
    const w = wire(geo, c, 0.25);
    g.add(land, w);
    return t => { land.rotation.y = w.rotation.y = 0.2 * Math.sin(t * 0.1); };
  },
  planet(g, c) {
    const tex = (() => { const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; const x = cv.getContext('2d'); x.fillStyle = '#123a7a'; x.fillRect(0, 0, 256, 128); for (let k = 0; k < 40; k++) { x.fillStyle = k % 4 ? '#2f7a3a' : '#b89a5a'; x.beginPath(); x.ellipse(Math.random() * 256, 20 + Math.random() * 88, 8 + Math.random() * 26, 5 + Math.random() * 14, Math.random() * 3, 0, 7); x.fill(); } x.fillStyle = '#eef'; x.fillRect(0, 0, 256, 8); x.fillRect(0, 120, 256, 8); const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t; })();
    const p = new THREE.Mesh(new THREE.SphereGeometry(0.6, 40, 24), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 }));
    p.position.y = 0.85;
    const air = new THREE.Mesh(new THREE.SphereGeometry(0.66, 32, 20), new THREE.MeshBasicMaterial({ color: '#7fc8ff', transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
    air.position.y = 0.85;
    const moon = glowBall(0.1, '#d8d8e8', 0.15);
    g.add(p, air, moon);
    return t => { p.rotation.y = t * 0.25; moon.position.set(Math.cos(t * 0.5) * 1.0, 0.95, Math.sin(t * 0.5) * 0.8); };
  },
  solar(g, c) {
    const sun = glowBall(0.22, '#ffd166', 1.4);
    sun.position.y = 0.8;
    const ps = [0.45, 0.7, 0.95].map((r, k) => { const o = new THREE.Mesh(new THREE.TorusGeometry(r, 0.006, 4, 64), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.45 })); o.rotation.x = Math.PI / 2; o.position.y = 0.8; const pl = glowBall(0.05 + 0.02 * k, ['#8ecbff', '#ff7a8a', '#c8b6ff'][k], 0.5); g.add(o, pl); return { r, pl }; });
    g.add(sun);
    return t => ps.forEach(({ r, pl }, k) => pl.position.set(Math.cos(t * (0.9 - k * 0.25)) * r, 0.8, Math.sin(t * (0.9 - k * 0.25)) * r));
  },
  star(g, c) {
    const s = glowBall(0.5, '#ffb36b', 1.3);
    s.position.y = 0.85;
    const corona = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 16), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false }));
    corona.position.y = 0.85;
    g.add(s, corona);
    return t => { corona.scale.setScalar(1 + 0.08 * Math.sin(t * 2)); s.rotation.y = t * 0.2; };
  },
  compact(g, c) {
    const hole = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), new THREE.MeshBasicMaterial({ color: '#000000' }));
    hole.position.y = 0.85;
    const disc = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.85, 64), new THREE.MeshBasicMaterial({ color: '#ffb36b', transparent: true, opacity: 0.6, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    disc.rotation.x = Math.PI / 2 - 0.25; disc.position.y = 0.85;
    g.add(hole, disc);
    return t => { disc.rotation.z = t * 0.8; };
  },
  galaxy(g, c) {
    const N = 900;
    const p = pts(N, i => { const arm = i % 2, r = Math.pow(Math.random(), 0.6) * 1.0, a = r * 5 + arm * Math.PI + (Math.random() - 0.5) * 0.5; return new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 0.06 * (1.2 - r), Math.sin(a) * r); });
    p.material.color.set(c); p.material.size = 0.035;
    const core = glowBall(0.09, '#fff2c8', 1.4);
    const gal = new THREE.Group(); gal.add(p, core); gal.position.y = 0.8; gal.rotation.x = 0.4;
    g.add(gal);
    return t => { p.rotation.y = -t * 0.12; };
  },
  halo(g, c) {
    const disc = pts(300, () => { const r = Math.random(), a = Math.random() * 7; return new THREE.Vector3(Math.cos(a) * r * 0.7, (Math.random() - 0.5) * 0.04, Math.sin(a) * r * 0.7); });
    disc.material.color.set('#fff2c8');
    const halo = pts(400, () => new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(0.6 + 0.4 * Math.random()));
    halo.material.color.set(c); halo.material.opacity = 0.5; halo.material.transparent = true;
    const gr = new THREE.Group(); gr.add(disc, halo); gr.position.y = 0.85;
    g.add(gr);
    return t => { gr.rotation.y = t * 0.08; };
  },
  cluster(g, c) {
    const gals = Array.from({ length: 14 }, () => { const s = glowBall(0.05 + Math.random() * 0.05, Math.random() < 0.5 ? '#fff2c8' : c, 0.9); s.position.set((Math.random() - 0.5) * 1.4, 0.3 + Math.random() * 1.2, (Math.random() - 0.5) * 1.2); return s; });
    const gas = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 12), new THREE.MeshBasicMaterial({ color: '#ff7ad9', transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false }));
    gas.position.y = 0.85;
    g.add(gas, ...gals);
    return t => { gas.scale.setScalar(1 + 0.05 * Math.sin(t)); };
  },
  web(g, c) {
    const nodes = Array.from({ length: 26 }, () => new THREE.Vector3((Math.random() - 0.5) * 1.8, 0.2 + Math.random() * 1.3, (Math.random() - 0.5) * 1.6));
    const seg = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && a.distanceTo(b) < 0.6) seg.push(a, b); }));
    const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(seg), new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.6 }));
    const knots = nodes.map(v => { const k = glowBall(0.04, '#ffffff', 0.9); k.position.copy(v); return k; });
    const gr = new THREE.Group(); gr.add(lines, ...knots);
    g.add(gr);
    return t => { gr.rotation.y = t * 0.06; };
  },
};

const D = 1.7;   // a dome's radius
export function createWorlds3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#04030b');
  scene.fog = new THREE.FogExp2('#04030b', 0.014);
  scene.environment = bubbleEnvironment(renderer);
  scene.add(new THREE.AmbientLight('#8070c0', 0.9));
  const key = new THREE.DirectionalLight('#dfe6ff', 1.1);
  key.position.set(6, 14, 10);
  scene.add(key);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 300);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  const ray = new THREE.Raycaster();
  // the floor: a planetarium's dark, a neon grid
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.ShaderMaterial({
    vertexShader: 'varying vec3 vP; void main() { vP = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * viewMatrix * vec4(vP, 1.0); }',
    fragmentShader: 'varying vec3 vP; void main() { vec2 g = abs(fract(vP.xz * 0.5) - 0.5); float l = smoothstep(0.46, 0.5, max(g.x, g.y)); float f = exp(-length(vP.xz) * 0.06); gl_FragColor = vec4(mix(vec3(0.02, 0.015, 0.05), vec3(0.4, 0.22, 0.85), l * 0.6) * f, 1.0); }',
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.2;
  scene.add(floor);
  const stars = pts(900, () => new THREE.Vector3((Math.random() - 0.5) * 160, 10 + Math.random() * 60, -40 - Math.random() * 60));
  stars.material.color.set('#9fb4ff'); stars.material.size = 0.18;
  scene.add(stars);

  // a dome for every node, made when first shown
  const domes = new Map();
  function dome(n) {
    if (domes.has(n.id)) return domes.get(n.id);
    const g = new THREE.Group();
    const board = new THREE.Mesh(new THREE.CylinderGeometry(D * 1.08, D * 1.12, 0.1, 64), new THREE.MeshStandardMaterial({ color: new THREE.Color(n.color).multiplyScalar(0.12), emissive: n.color, emissiveIntensity: 0.14, roughness: 0.5 }));
    board.position.y = -0.05;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(D * 1.1, 0.035, 8, 96), new THREE.MeshBasicMaterial({ color: n.color }));
    rim.rotation.x = Math.PI / 2;
    const glass = new THREE.Mesh(new THREE.SphereGeometry(D, 56, 28, 0, Math.PI * 2, 0, Math.PI / 2), glassMaterial(n.color));
    glass.renderOrder = 5;
    const mini = new THREE.Group();
    const tick = (MINIS[n.mini] ?? MINIS.foam)(mini, n.color);
    g.add(board, rim, mini, glass);
    g.scale.setScalar(0.001);
    scene.add(g);
    const name = plate(n.title, n.color, n.scale ?? '');
    name.visible = false;
    scene.add(name);
    const d = { n, g, board, rim, glass, mini, tick, name, pos: new THREE.Vector3(), scale: new THREE.Vector3(0.001, 0.001, 0.001), tPos: new THREE.Vector3(), tScale: new THREE.Vector3(), tName: 0, nameS: 0, fade: 1, tFade: 1, hot: 0, role: 'hidden' };
    domes.set(n.id, d);
    return d;
  }

  let current = TREE;   // the node whose children are in view
  let highlight = 0;    // the child the fader points at
  let hover = null, dive = null, last = 0, clock = 0;
  const layout = node => {
    const kids = node.children ?? [];
    const n = kids.length;
    const gap = Math.min(7.2, 30 / Math.max(1, n));
    const s = Math.min(1.25, gap / (D * 2.6));
    return kids.map((k, i) => ({ k, pos: new THREE.Vector3((i - (n - 1) / 2) * gap, 0, (i % 2 ? -1.2 : 0.6) - 0.05 * Math.abs(i - (n - 1) / 2) ** 2), s }));
  };
  function place() {
    for (const d of domes.values()) { d.role = 'hidden'; d.tScale.setScalar(0.001); d.tName = 0; }
    // the children: the main row
    for (const { k, pos, s } of layout(current)) {
      const d = dome(k);
      if (d.role === 'hidden' && d.scale.x < 0.01) { const from = current === TREE ? pos : new THREE.Vector3(0, 0.6, -1); d.pos.copy(from); }
      d.role = 'main'; d.tPos.copy(pos); d.tScale.setScalar(s); d.tName = 1; d.tFade = 1;
    }
    // the node itself: one big glass round its children, its picture faded
    if (current !== TREE) {
      const d = dome(current);
      const n = (current.children ?? []).length;
      d.role = 'outer'; d.tPos.set(0, -0.1, -0.6); d.tScale.set(Math.max(4.5, n * 2.2), 3.8, 3.2); d.tName = 0; d.tFade = 0.45;
      // its siblings, and the ways back: a shelf of small domes at the back
      const up = [];
      for (let p = current.parent; p; p = p.parent) up.push(p);
      const shelf = (current.parent?.children ?? []).filter(x => x !== current);
      shelf.forEach((k, i) => { const e = dome(k); e.role = 'shelf'; e.tPos.set((i - (shelf.length - 1) / 2) * 3.6, 6.4, -9); e.tScale.setScalar(0.38); e.tName = 0.62; e.tFade = 1; });
    }
  }
  place();

  const pickAt = (fx, fy) => {
    ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
    const cands = [...domes.values()].filter(d => d.role === 'main' || d.role === 'shelf');
    const hit = ray.intersectObjects(cands.flatMap(d => [d.glass, d.rim, d.board]), false)[0];
    return hit ? cands.find(d => d.glass === hit.object || d.rim === hit.object || d.board === hit.object) : null;
  };
  const info = n => ({ id: n.id, title: n.title, inside: Boolean(n.children), level: n.level ?? null, stop: n.stop ?? null, place: n.place ?? '' });
  const api = {
    canvas,
    pick(fx, fy) { const d = pickAt(fx, fy); return d ? info(d.n) : null; },
    hover(fx, fy) { hover = fx === null ? null : pickAt(fx, fy); return hover ? hover.n.title : null; },
    // in: the node's children come into view (others shrink to the shelf)
    open(id) { const n = NODES.get(id); if (!n?.children) return; current = n; highlight = 0; place(); api.onChange?.(); },
    up() { if (current.parent) { const was = current; current = current.parent; highlight = Math.max(0, current.children.indexOf(was)); place(); api.onChange?.(); } },
    get path() { const p = []; for (let n = current; n; n = n.parent) p.unshift(n.title); return p; },
    get pathIds() { const p = []; for (let n = current; n && n !== TREE; n = n.parent) p.unshift(n.id); return p; },
    get children() { return (current.children ?? []).map(info); },
    get highlight() { return highlight; },
    setHighlight(i) { highlight = Math.max(0, Math.min((current.children?.length ?? 1) - 1, i)); },
    // the camera flies down into a dome, then done()
    dive(id, done) { const d = domes.get(id); if (!d) { done?.(); return; } dive = { from: camera.position.clone(), to: d.pos.clone().add(new THREE.Vector3(0, 1.1 * d.scale.y, 0.4)), look: d.pos.clone().add(new THREE.Vector3(0, 0.5, 0)), start: performance.now(), done }; },
    get diving() { return Boolean(dive); },
    onChange: null,
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    render(s) {
      const dt = Math.min(0.05, last ? s.time - last : 0.016);
      last = s.time;
      clock += dt;
      tickBubbles(clock);
      const fx = Math.max(0, Math.min(1, s.phi ?? 0.5));
      const k = Math.min(1, dt * 3.2);
      const kids = current.children ?? [];
      for (const d of domes.values()) {
        d.pos.lerp(d.tPos, k);
        d.scale.lerp(d.tScale, k);
        d.fade += (d.tFade - d.fade) * k;
        d.g.position.copy(d.pos);
        d.g.scale.copy(d.scale);
        d.g.visible = d.scale.x > 0.01;
        const lit = d.role === 'main' && (d === hover || kids[highlight] === d.n);
        d.hot += ((lit ? 1 : 0) - d.hot) * Math.min(1, dt * 6);
        d.glass.material.uniforms.uTime.value = clock;
        d.glass.material.uniforms.uHot.value = d.hot;
        d.glass.material.uniforms.uFade.value = d.role === 'outer' ? 0.6 : 1;
        d.mini.visible = d.role !== 'outer' && d.g.visible;
        d.board.visible = d.role !== 'outer';
        d.rim.visible = d.role !== 'outer';
        d.rim.scale.setScalar(1 + 0.06 * d.hot);
        if (d.mini.visible) d.tick(clock, fx);
        // the name: a plate above the dome, its size on screen fixed by the role
        d.nameS += ((s.labels === false ? 0 : d.tName) - d.nameS) * k;
        d.name.visible = d.nameS > 0.05 && d.g.visible;
        if (d.name.visible) {
          d.name.position.copy(d.pos).add(new THREE.Vector3(0, D * d.scale.y + 0.7, 0));
          const w = 0.2 * d.nameS * (1 + 0.15 * d.hot);
          d.name.scale.set(w, w * d.name.userData.aspect, 1);
        }
      }
      stars.rotation.y = clock * 0.004;
      if (dive) {
        const t = Math.min(1, (performance.now() - dive.start) / 1300);
        const e = t * t * (3 - 2 * t);
        camera.position.copy(dive.from).lerp(dive.to, e);
        camera.lookAt(new THREE.Vector3(0, 0.8, -1).lerp(dive.look, e));
        if (t >= 1) { const done = dive.done; dive = null; done?.(); }
      } else {
        // in front, a little above, swaying: everything in view, still moving
        const a = 0.14 * Math.sin(clock * 0.05);
        camera.position.set(Math.sin(a) * 27, 10.5 + 0.8 * Math.sin(clock * 0.07), Math.cos(a) * 27);
        camera.lookAt(0, 1.6, -1.5);
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
  return api;
}
