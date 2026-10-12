// cathedral3d.js: the brain's own cave (ISS-077). The ventricles are a real cave system in
// the brain, filled with cerebrospinal fluid: the fourth ventricle, the narrow aqueduct, the
// thin third ventricle, the interventricular foramen, then the lateral ventricle's body (the
// nave), the atrium (the crossing) and the temporal horn. Drawn as a stone cathedral: carved
// walls, vaulting ribs, the choroid plexus hanging like curtains (where blood becomes CSF),
// and the brain's electromagnetic field as moving light in the stone (CEMI, the programme's
// whole-brain level). Thoughts flash in the walls as neural avalanches; with C-PTSD each one
// echoes back, fading, as a sound does in a cathedral. Shapes and sizes are schematic: the
// order of the halls is anatomy, the proportions are for the eye.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { applyLook } from './look.js';

// VISUAL THOUGHTS (ISS-077): soap bubbles with a figure inside. The shell is a thin film
// (three.js iridescence: the colours of a soap film, 200-900 nm thick) reflecting a soft room;
// the figure sits on a disc inside, its texture pulled towards the middle like a view through
// a ball (a fisheye). A bubble grows as it drifts; when it comes close it pops and the figure
// takes the screen (onPop). VIVIDNESS is how much of the picture shows (0: the bubble, no
// picture, as in aphantasia; 1: vivid). Kandinsky's grammar: the tint is the feeling.
function fisheyeDisc() {
  const g = new THREE.CircleGeometry(1, 64);
  const p = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    const r = Math.hypot(x, y);
    const k = r > 0 ? Math.pow(r, 1.45) / r : 0;
    uv.setXY(i, 0.5 + 0.5 * x * k, 0.5 + 0.5 * y * k);
  }
  return g;
}

// the route, in order, with the radius of each hall (scene units; the real halls are mm)
const ROUTE = [
  { p: [0, -3.2, 4.2], r: 1.3, name: 'FOURTH VENTRICLE' },
  { p: [0, -2.2, 3.2], r: 1.1, name: 'FOURTH VENTRICLE' },
  { p: [0, -1.2, 2.2], r: 0.32, name: 'THE AQUEDUCT' },
  { p: [0, -0.4, 1.4], r: 0.3, name: 'THE AQUEDUCT' },
  { p: [0, 0.3, 0.6], r: 0.7, name: 'THIRD VENTRICLE' },
  { p: [0, 0.9, -0.4], r: 0.7, name: 'THIRD VENTRICLE' },
  { p: [0.6, 1.4, -1.2], r: 0.38, name: 'THE FORAMEN' },
  { p: [1.6, 2.4, -1.4], r: 1.5, name: 'THE NAVE: LATERAL VENTRICLE' },
  { p: [2.1, 2.9, 0.6], r: 1.7, name: 'THE NAVE: LATERAL VENTRICLE' },
  { p: [2.3, 2.6, 3.0], r: 1.9, name: 'THE CROSSING: ATRIUM' },
  { p: [2.5, 0.8, 4.4], r: 1.3, name: 'THE TEMPORAL HORN' },
  { p: [2.4, -1.0, 3.2], r: 0.9, name: 'THE TEMPORAL HORN' },
];

function stoneTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = '#6d6676';
  g.fillRect(0, 0, 512, 512);
  // ashlar blocks with mortar, and grain
  for (let row = 0; row < 16; row++) {
    const off = (row % 2) * 32;
    for (let col = -1; col < 9; col++) {
      const x = col * 64 + off, y = row * 32;
      const v = 95 + Math.random() * 40;
      g.fillStyle = `rgb(${v},${v - 6},${v + 10})`;
      g.fillRect(x + 2, y + 2, 60, 28);
    }
  }
  for (let k = 0; k < 9000; k++) {
    g.fillStyle = `rgba(${Math.random() < 0.5 ? '255,250,240' : '30,20,40'},${0.05 + 0.1 * Math.random()})`;
    g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(24, 3);
  return t;
}

export function createCathedral3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05030a');
  scene.fog = new THREE.FogExp2('#0a0612', 0.09);
  const camera = new THREE.PerspectiveCamera(72, 1, 0.02, 60);
  const stereo = new THREE.StereoCamera();
  stereo.eyeSep = 0.06;
  const size = new THREE.Vector2();

  const curve = new THREE.CatmullRomCurve3(ROUTE.map(s => new THREE.Vector3(...s.p)), false, 'catmullrom', 0.5);
  const radiusAt = u => {
    const f = u * (ROUTE.length - 1);
    const i = Math.min(ROUTE.length - 2, Math.floor(f));
    const s = f - i;
    const e = s * s * (3 - 2 * s);
    return ROUTE[i].r + (ROUTE[i + 1].r - ROUTE[i].r) * e;
  };
  const routeLength = curve.getLength();
  const hallAt = u => ROUTE[Math.min(ROUTE.length - 1, Math.round(u * (ROUTE.length - 1)))].name;

  // the walls: a tube whose radius follows the halls, roughened like hewn stone
  const SEG = 600, RAD = 32;
  const tube = new THREE.TubeGeometry(curve, SEG, 1, RAD, false);
  const pos = tube.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i <= SEG; i++) {
    const u = i / SEG;
    const c = curve.getPointAt(u);
    const r = radiusAt(u);
    for (let j = 0; j <= RAD; j++) {
      const k = i * (RAD + 1) + j;
      v.fromBufferAttribute(pos, k).sub(c);
      const rough = 1 + 0.06 * Math.sin(j * 1.7 + i * 0.31) * Math.cos(i * 0.13) + 0.04 * Math.sin(j * 5.3 + i * 0.9);
      v.multiplyScalar(r * rough).add(c);
      pos.setXYZ(k, v.x, v.y, v.z);
    }
  }
  tube.computeVertexNormals();
  const map = stoneTexture();
  const walls = new THREE.Mesh(tube, new THREE.MeshStandardMaterial({ map, bumpMap: map, bumpScale: 0.05, roughness: 0.85, metalness: 0.05, side: THREE.BackSide }));
  walls.material.envMapIntensity = 0;
  scene.add(walls);
  // a soft room for the bubbles to reflect (the stone ignores it)
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // vaulting ribs where the hall is wide (the nave and the crossing)
  const ribMat = new THREE.MeshStandardMaterial({ color: '#8d8496', roughness: 0.7 });
  for (let k = 0; k <= 60; k++) {
    const u = k / 60;
    const r = radiusAt(u);
    if (r < 1.2) continue;
    const rib = new THREE.Mesh(new THREE.TorusGeometry(r * 0.97, 0.05, 6, 40), ribMat);
    const c = curve.getPointAt(u);
    rib.position.copy(c);
    rib.lookAt(c.clone().add(curve.getTangentAt(u)));
    scene.add(rib);
  }

  // the choroid plexus: grape-like tufts hanging from the roof, swaying in the CSF (where
  // blood becomes CSF): short chains of small beads, one instanced mesh
  const tufts = [];
  for (let k = 0; k < 170; k++) {
    const u = Math.random() < 0.65 ? 0.62 + 0.33 * Math.random() : 0.02 + 0.12 * Math.random();
    const c = curve.getPointAt(u);
    const r = radiusAt(u) * 0.93;
    const a = Math.PI / 2 + (Math.random() - 0.5) * 1.4;
    const t = curve.getTangentAt(u);
    const side = new THREE.Vector3().crossVectors(t, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3().crossVectors(side, t).normalize();
    const top = c.clone().addScaledVector(up, Math.sin(a) * r).addScaledVector(side, Math.cos(a) * r);
    tufts.push({ top, down: up.clone().negate(), beads: 3 + Math.floor(Math.random() * 4), phase: Math.random() * 6 });
  }
  const beadCount = tufts.reduce((n, t) => n + t.beads, 0);
  const beads = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshStandardMaterial({ color: '#d9506f', emissive: '#4a0f1e', roughness: 0.45 }), beadCount);
  scene.add(beads);
  const bead = new THREE.Object3D();
  function swayTufts(time) {
    let i = 0;
    for (const t of tufts) {
      const sway = 0.03 * Math.sin(time * 0.8 + t.phase);
      for (let b = 0; b < t.beads; b++) {
        bead.position.copy(t.top).addScaledVector(t.down, 0.05 + b * 0.06).add(new THREE.Vector3(sway * b, 0, sway * 0.5 * b));
        bead.scale.setScalar(0.035 - 0.003 * b);
        bead.updateMatrix();
        beads.setMatrixAt(i++, bead.matrix);
      }
    }
    beads.instanceMatrix.needsUpdate = true;
  }
  swayTufts(0);

  // the field: three moving lights along the halls, their colours the field's modes
  scene.add(new THREE.AmbientLight('#3a3050', 0.6));
  const lamp = new THREE.PointLight('#fff2d8', 1.6, 7, 1.4);
  scene.add(lamp);
  const field = ['#5ee7ff', '#a78bfa', '#ff7aa8'].map(color => { const l = new THREE.PointLight(color, 0, 9, 1.2); scene.add(l); return l; });

  // thoughts in the walls: flashes, and their echoes
  const flashes = [];
  const flashGeo = new THREE.SphereGeometry(1, 12, 8);
  function burst(size, at, color, gain = 1, delay = 0) {
    const m = new THREE.Mesh(flashGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.copy(at);
    scene.add(m);
    flashes.push({ m, age: -delay, life: 0.8 + 0.4 * Math.log10(size + 1), size, gain });
  }

  // the bubbles
  const bubbles = [];
  const loader = new THREE.TextureLoader();
  const textures = new Map();
  const disc = fisheyeDisc();
  const shellGeo = new THREE.SphereGeometry(1, 48, 32);
  const shellMat = () => new THREE.MeshPhysicalMaterial({
    color: '#ffffff', metalness: 0, roughness: 0.04, transparent: true, opacity: 0.22, depthWrite: false,
    iridescence: 1, iridescenceIOR: 1.33, iridescenceThicknessRange: [200, 900], clearcoat: 1, clearcoatRoughness: 0.02,
    envMapIntensity: 2.2, specularIntensity: 1,
  });
  let vivid = 0.8;
  let onPop = null;
  const texture = src => {
    if (!textures.has(src)) {
      const t = loader.load(src);
      t.colorSpace = THREE.SRGBColorSpace;
      textures.set(src, t);
    }
    return textures.get(src);
  };

  // OUTSIDE (ISS-078): the same halls seen from outside, as anatomists know them (the cast of
  // the ventricles), built as an abstract castle: the hewn shell, a spire on each hall, lit
  // windows that flare when a thought fires inside, all orbited at a distance.
  const outside = new THREE.Group();
  outside.visible = false;
  scene.add(outside);
  const shell = new THREE.Mesh(tube, new THREE.MeshStandardMaterial({ map, bumpMap: map, bumpScale: 0.05, roughness: 0.8, metalness: 0.05, color: '#b8b0c4', side: THREE.FrontSide }));
  outside.add(shell);
  const spireMat = new THREE.MeshStandardMaterial({ color: '#8d8496', roughness: 0.6, metalness: 0.1 });
  const spireTips = [];
  ROUTE.forEach((s, k) => {
    if (k > 0 && ROUTE[k - 1].name === s.name) return;
    const h = 1.2 + 1.6 * s.r;
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.18 + 0.12 * s.r, h, 8), spireMat);
    spire.position.set(s.p[0], s.p[1] + s.r + h / 2 - 0.1, s.p[2]);
    outside.add(spire);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    tip.position.set(s.p[0], s.p[1] + s.r + h - 0.05, s.p[2]);
    outside.add(tip);
    spireTips.push({ name: s.name, tip });
  });
  // windows: small lit panes on the shell, each near a point of the route
  const WINDOWS = 140;
  const panes = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.22, 0.4), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.95, side: THREE.DoubleSide, fog: false }), WINDOWS);
  const paneU = new Float32Array(WINDOWS);
  const paneGlow = new Float32Array(WINDOWS);
  {
    const o = new THREE.Object3D();
    for (let k = 0; k < WINDOWS; k++) {
      const uu = 0.02 + 0.96 * Math.random();
      paneU[k] = uu;
      const c = curve.getPointAt(uu);
      const t = curve.getTangentAt(uu);
      const n1 = new THREE.Vector3().crossVectors(t, new THREE.Vector3(0, 1, 0)).normalize();
      const n2 = new THREE.Vector3().crossVectors(t, n1).normalize();
      const a = Math.random() * Math.PI * 2;
      const dirv = n1.clone().multiplyScalar(Math.cos(a)).addScaledVector(n2, Math.sin(a));
      o.position.copy(c).addScaledVector(dirv, radiusAt(uu) * 1.07);
      o.lookAt(o.position.clone().add(dirv));
      o.updateMatrix();
      panes.setMatrixAt(k, o.matrix);
      panes.setColorAt(k, new THREE.Color('#ffcf7a'));
    }
  }
  outside.add(panes);
  const outsideLights = [new THREE.DirectionalLight('#c8d8ff', 0), new THREE.HemisphereLight('#a8b8ff', '#20102a', 0)];
  outsideLights[0].position.set(6, 10, 4);
  outsideLights.forEach(l => scene.add(l));
  const centre = new THREE.Box3().setFromPoints(ROUTE.map(s => new THREE.Vector3(...s.p))).getCenter(new THREE.Vector3());
  let viewOut = false;
  let orbitA = 0.6;

  let u = 0.01;
  let last = 0;
  const COLORS = ['#3fd0c9', '#ff4d5e', '#ffd166', '#a78bfa', '#8ecbff', '#e8eefc', '#ff7aa8'];
  return {
    canvas,
    get hall() { return hallAt(u); },
    get outside() { return viewOut; },
    set outside(on) { viewOut = Boolean(on); },
    get bubbleCount() { return bubbles.filter(b => !b.popping).length; },
    set vividness(v) { vivid = Math.max(0, Math.min(1, v)); },
    set onPop(fn) { onPop = fn; },
    // a visual thought: a bubble ahead in the hall, holding image { src, ... }, tint a colour,
    // loud 0..1 (its size)
    bubble(image, tint = '#ffffff', loud = 0.5) {
      if (bubbles.filter(b => !b.popping).length >= 10) return null;
      // 2.5 to 5 units ahead: about half a minute before the visitor reaches it
      const bu = Math.min(0.985, u + (2.5 + 2.5 * Math.random()) / routeLength);
      const hall = radiusAt(bu);
      const group = new THREE.Group();
      const shell = new THREE.Mesh(shellGeo, shellMat());
      const film = new THREE.Mesh(disc, new THREE.MeshBasicMaterial({ map: image ? texture(image.src) : null, color: new THREE.Color('#ffffff').lerp(new THREE.Color(tint), 0.22), transparent: true, opacity: 0, depthWrite: false }));
      film.scale.setScalar(0.9);
      film.visible = Boolean(image);
      group.add(film, shell);
      const a = Math.random() * Math.PI * 2;
      const off = new THREE.Vector2(Math.cos(a), Math.sin(a)).multiplyScalar(hall * 0.45 * Math.random());
      scene.add(group);
      const b = { group, shell, film, image, u: bu, off, size: Math.min(hall * 0.55, 0.12 + 0.38 * loud), age: 0, phase: Math.random() * 6, popping: 0 };
      group.scale.setScalar(0.01);
      bubbles.push(b);
      return b;
    },
    // the bubble under a screen point (fractions from the centre), popped: the click pops it
    pick(fx, fy) {
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
      const hit = ray.intersectObjects(bubbles.filter(b => !b.popping).map(b => b.shell), false)[0];
      const b = hit && bubbles.find(x => x.shell === hit.object);
      if (b) { b.popping = 0.001; onPop?.(b.image); }
      return Boolean(b);
    },
    get u() { return u; },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // a thought burst on the wall near the camera (POKE), or anywhere ahead
    burst(sizeArg, cp = 0) {
      const ahead = Math.min(0.99, u + 0.01 + 0.05 * Math.random());
      const c = curve.getPointAt(ahead);
      const r = radiusAt(ahead) * 0.97;
      const a = Math.random() * Math.PI * 2;
      const t = curve.getTangentAt(ahead);
      const n1 = new THREE.Vector3().crossVectors(t, new THREE.Vector3(0, 1, 0)).normalize();
      const n2 = new THREE.Vector3().crossVectors(t, n1).normalize();
      const at = c.clone().addScaledVector(n1, Math.cos(a) * r).addScaledVector(n2, Math.sin(a) * r);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      burst(sizeArg, at, color);
      // seen from outside: the windows near it flare
      for (let k = 0; k < WINDOWS; k++) if (Math.abs(paneU[k] - ahead) < 0.04) paneGlow[k] = Math.min(1.5, paneGlow[k] + 0.4 + 0.3 * Math.log10(sizeArg + 1));
      if (cp > 0.05) for (let k = 1; k <= Math.round(2 + 6 * cp); k++) burst(sizeArg, at.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.3)), color, Math.pow(0.55 + 0.35 * cp, k), 0.55 * k);
    },
    // state: { time, phi (FX: the field's light), speed, stereo }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      u = (u + dt * (state.speed ?? 0.006)) % 1;
      if (u > 0.985) u = 0.01;
      const p = curve.getPointAt(u);
      const ahead = curve.getPointAt(Math.min(0.999, u + 0.012));
      outside.visible = viewOut;
      walls.visible = !viewOut;
      scene.fog.density = viewOut ? 0.012 : 0.09;
      outsideLights[0].intensity = viewOut ? 1.4 : 0;
      outsideLights[1].intensity = viewOut ? 0.7 : 0;
      if (viewOut) {
        // orbit at a distance; the visitor's place glows as a small light inside
        orbitA += dt * 0.06;
        const R = 19;
        camera.position.set(centre.x + R * Math.cos(orbitA), centre.y + 5 + 2 * Math.sin(orbitA * 0.7), centre.z + R * Math.sin(orbitA));
        camera.lookAt(centre);
        const fxw = Math.max(0, Math.min(1, state.phi ?? 0.5));
        const tint = new THREE.Color();
        for (let k = 0; k < WINDOWS; k++) {
          paneGlow[k] *= Math.exp(-dt / 1.2);
          const near = Math.abs(paneU[k] - u) < 0.03 ? 0.6 : 0;
          const g = Math.min(1.6, 0.6 + 0.5 * fxw + paneGlow[k] + near);
          panes.setColorAt(k, tint.setRGB(1.2 * g, 0.85 * g, 0.4 * g + 0.5 * paneGlow[k]));
        }
        panes.instanceColor.needsUpdate = true;
        for (const s of spireTips) s.tip.material.color.set(s.name === hallAt(u) ? '#ffffff' : '#ffd166');
      } else {
        camera.position.copy(p).add(new THREE.Vector3(0, -0.15 * radiusAt(u), 0));
        camera.lookAt(ahead);
        applyLook(camera);
      }
      lamp.position.copy(camera.position);
      const fx = Math.max(0, Math.min(1, state.phi ?? 0.5));
      field.forEach((l, k) => {
        const lu = (u + 0.03 + 0.04 * k + 0.02 * Math.sin(state.time * 0.4 + k * 2)) % 1;
        l.position.copy(curve.getPointAt(Math.min(0.999, lu)));
        l.intensity = (0.4 + 2.2 * fx) * (0.6 + 0.4 * Math.sin(state.time * (0.7 + 0.3 * k) + k));
      });
      swayTufts(state.time);
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.age += dt;
        // drift: slowly towards the visitor, bobbing, growing to full size over about 4 s
        b.u = Math.max(0, b.u - dt * 0.0015);
        const c = curve.getPointAt(b.u);
        const t = curve.getTangentAt(b.u);
        const n1 = new THREE.Vector3().crossVectors(t, new THREE.Vector3(0, 1, 0)).normalize();
        const n2 = new THREE.Vector3().crossVectors(t, n1).normalize();
        b.group.position.copy(c).addScaledVector(n1, b.off.x + 0.05 * Math.sin(state.time * 0.7 + b.phase)).addScaledVector(n2, b.off.y + 0.06 * Math.sin(state.time * 0.5 + b.phase * 2));
        const grow = Math.min(1, b.age / 4);
        const wobble = 1 + 0.03 * Math.sin(state.time * 3 + b.phase);
        let s = b.size * (0.15 + 0.85 * (1 - (1 - grow) ** 2)) * wobble;
        b.film.lookAt(camera.position);
        b.film.material.opacity = vivid * Math.min(1, b.age / 1.5) * (b.popping ? Math.max(0, 1 - b.popping * 3) : 1);
        b.shell.rotation.y += dt * 0.2;
        const dist = b.group.position.distanceTo(camera.position);
        if (!b.popping && b.age > 1 && dist < s * 1.8) {
          b.popping = 0.001;
          onPop?.(b.image);
        }
        if (b.popping) {
          b.popping += dt;
          s *= 1 + 2.5 * b.popping;
          b.shell.material.opacity = Math.max(0, 0.22 * (1 - b.popping * 3));
        }
        b.group.scale.setScalar(s);
        // gone: popped, or left behind the visitor
        if (b.popping > 0.4 || b.u < u - 0.004) {
          scene.remove(b.group);
          b.shell.material.dispose();
          b.film.material.dispose();
          bubbles.splice(i, 1);
        }
      }
      for (let i = flashes.length - 1; i >= 0; i--) {
        const fl = flashes[i];
        fl.age += dt;
        if (fl.age < 0) continue;
        const f = fl.age / fl.life;
        const loud = Math.log10(fl.size + 1) / 3;
        fl.m.scale.setScalar((0.02 + 0.1 * loud) * (0.6 + 0.8 * f));
        fl.m.material.opacity = Math.max(0, (1 - f) * (0.25 + 0.5 * loud) * fl.gain);
        if (f >= 1) { scene.remove(fl.m); fl.m.material.dispose(); flashes.splice(i, 1); }
      }
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereo, camera, 0.06);
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
