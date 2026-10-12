// cathedral3d.js: the brain's own cave (ISS-077). The ventricles are a real cave system in
// the brain, filled with cerebrospinal fluid: the fourth ventricle, the narrow aqueduct, the
// thin third ventricle, the interventricular foramen, then the lateral ventricle's body (the
// nave), the atrium (the crossing) and the temporal horn. Drawn as a stone cathedral: carved
// walls, vaulting ribs, the choroid plexus hanging like curtains (where blood becomes CSF),
// and the brain's electromagnetic field as moving light in the stone (CEMI, the programme's
// whole-brain level). Thoughts flash in the walls as neural avalanches; with C-PTSD each one
// echoes back, fading, as a sound does in a cathedral. Shapes and sizes are schematic: the
// order of the halls is anatomy, the proportions are for the eye.

import * as THREE from 'three';

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
  scene.add(walls);

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

  let u = 0.01;
  let last = 0;
  const COLORS = ['#3fd0c9', '#ff4d5e', '#ffd166', '#a78bfa', '#8ecbff', '#e8eefc', '#ff7aa8'];
  return {
    canvas,
    get hall() { return hallAt(u); },
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
      camera.position.copy(p).add(new THREE.Vector3(0, -0.15 * radiusAt(u), 0));
      camera.lookAt(ahead);
      lamp.position.copy(camera.position);
      const fx = Math.max(0, Math.min(1, state.phi ?? 0.5));
      field.forEach((l, k) => {
        const lu = (u + 0.03 + 0.04 * k + 0.02 * Math.sin(state.time * 0.4 + k * 2)) % 1;
        l.position.copy(curve.getPointAt(Math.min(0.999, lu)));
        l.intensity = (0.4 + 2.2 * fx) * (0.6 + 0.4 * Math.sin(state.time * (0.7 + 0.3 * k) + k));
      });
      swayTufts(state.time);
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
        stereo.update(camera);
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
