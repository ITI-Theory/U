// palace3d.js: the mind palace (ISS-078). The memory palace (the method of loci) is old and
// real: you place what you want to keep in rooms you can walk through; it uses the
// hippocampus's sense of place. The programme's own claim makes this palace the universe: the
// same response grammar at every scale, so the palace's floors are the 21 levels of the zoom
// dial, from the quantum foam at the bottom to the cosmic web at the top. One tower, one
// elevator; each floor a round hall dressed by its sector: stone strata, a crowd's lights,
// molecules, stars in the vault. A DOOR on each floor opens that level's own view (the app's
// level renderers). The foam floor is the hall of the zero moment (mindfulness: everything
// arises and passes, nothing is held). PLACE puts a thought in the hall; it stays there.
// Interpretive: a building for the mind, not a claim about the cosmos.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const FLOOR_H = 3.2;
const HALL_R = 4.2;

const STYLE = {
  'micro-physical': { wall: '#2a2350', glow: '#a78bfa', motif: 'sparks' },
  network: { wall: '#16353a', glow: '#3fd0c9', motif: 'molecules' },
  organismal: { wall: '#3a1a24', glow: '#ff7aa8', motif: 'pulse' },
  collective: { wall: '#2e2a18', glow: '#ffd166', motif: 'crowd' },
  geological: { wall: '#3a2a1c', glow: '#e0a060', motif: 'strata' },
  systemic: { wall: '#1a2440', glow: '#8ecbff', motif: 'orbits' },
  cosmological: { wall: '#0c0c22', glow: '#e8eefc', motif: 'stars' },
  'named-solution': { wall: '#222', glow: '#ffffff', motif: 'sparks' },
};

function hallTexture(style, label, k) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = style.wall;
  g.fillRect(0, 0, 1024, 256);
  const rnd = (i => () => { i = (i * 16807) % 2147483647; return i / 2147483647; })(k * 7919 + 13);
  g.globalAlpha = 0.85;
  if (style.motif === 'strata') {
    for (let y = 0; y < 256; y += 14 + rnd() * 18) { g.fillStyle = `hsl(${25 + rnd() * 20}, 40%, ${20 + rnd() * 25}%)`; g.fillRect(0, y, 1024, 8 + rnd() * 14); }
  } else if (style.motif === 'stars') {
    for (let i = 0; i < 900; i++) { g.fillStyle = `rgba(255,255,255,${0.3 + 0.7 * rnd()})`; const s = rnd() < 0.05 ? 3 : 1.5; g.fillRect(rnd() * 1024, rnd() * 256, s, s); }
    for (let i = 0; i < 6; i++) { const gr = g.createRadialGradient(rnd() * 1024, rnd() * 256, 0, 0, 0, 0); g.fillStyle = `rgba(160,140,255,0.15)`; g.beginPath(); g.ellipse(rnd() * 1024, rnd() * 256, 60 + rnd() * 80, 20 + rnd() * 30, rnd() * 3, 0, Math.PI * 2); g.fill(); void gr; }
  } else if (style.motif === 'crowd') {
    for (let i = 0; i < 500; i++) { g.fillStyle = `rgba(255,${190 + rnd() * 60},${100 + rnd() * 80},${0.4 + 0.6 * rnd()})`; g.beginPath(); g.arc(rnd() * 1024, 140 + rnd() * 110, 2 + rnd() * 2, 0, Math.PI * 2); g.fill(); }
  } else if (style.motif === 'molecules') {
    for (let i = 0; i < 70; i++) { const x = rnd() * 1024, y = rnd() * 256; g.strokeStyle = style.glow; g.lineWidth = 2; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 30, y + 10); g.lineTo(x + 50, y - 12); g.stroke(); for (const [dx, dy] of [[0, 0], [30, 10], [50, -12]]) { g.fillStyle = '#e8eefc'; g.beginPath(); g.arc(x + dx, y + dy, 5, 0, Math.PI * 2); g.fill(); } }
  } else if (style.motif === 'orbits') {
    for (let i = 0; i < 18; i++) { g.strokeStyle = `rgba(142,203,255,${0.3 + 0.4 * rnd()})`; g.beginPath(); g.ellipse(rnd() * 1024, 128, 40 + rnd() * 120, 15 + rnd() * 40, 0, 0, Math.PI * 2); g.stroke(); }
  } else if (style.motif === 'pulse') {
    g.strokeStyle = style.glow; g.lineWidth = 3; g.beginPath();
    for (let x = 0; x <= 1024; x += 4) { const ph = (x % 170) / 170; const y = 128 - (ph > 0.4 && ph < 0.46 ? 70 : ph > 0.46 && ph < 0.5 ? -40 : 0); if (x) g.lineTo(x, y); else g.moveTo(x, y); }
    g.stroke();
  } else {
    for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(167,139,250,${0.3 + 0.7 * rnd()})`; g.fillRect(rnd() * 1024, rnd() * 256, 2, 2); }
  }
  g.globalAlpha = 1;
  // the floor's name, carved over the door (the door faces the elevator)
  g.font = 'bold 30px "Space Mono", monospace';
  g.fillStyle = 'rgba(255,255,255,0.85)';
  g.textAlign = 'center';
  g.fillText(label.toUpperCase(), 512, 44);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  // seen from inside the cylinder: mirror it so the carved names read the right way round
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(-2, 1);
  return t;
}

// floors: [{ id, label, sector, scale }], bottom (quantum foam) first
export function createPalace3D(floors) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05040a');
  scene.fog = new THREE.FogExp2('#05040a', 0.035);
  const camera = new THREE.PerspectiveCamera(68, 1, 0.05, 200);
  const stereo = new THREE.StereoCamera();
  stereo.eyeSep = 0.06;
  const size = new THREE.Vector2();
  scene.add(new THREE.AmbientLight('#605878', 0.7));
  const lamp = new THREE.PointLight('#fff2d8', 1.4, 14, 1.2);
  scene.add(lamp);

  const halls = floors.map((f, k) => {
    const style = STYLE[f.sector] ?? STYLE['named-solution'];
    const y = k * FLOOR_H;
    const group = new THREE.Group();
    group.position.y = y;
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(HALL_R, HALL_R, FLOOR_H - 0.15, 48, 1, true),
      new THREE.MeshStandardMaterial({ map: hallTexture(style, f.label, k), side: THREE.BackSide, roughness: 0.8, emissive: style.wall, emissiveIntensity: 0.25 }));
    wall.position.y = FLOOR_H / 2;
    group.add(wall);
    const floor = new THREE.Mesh(new THREE.RingGeometry(0.9, HALL_R, 48), new THREE.MeshStandardMaterial({ color: '#2a2630', roughness: 0.9, side: THREE.DoubleSide }));
    floor.rotation.x = -Math.PI / 2;
    group.add(floor);
    // the door, opposite the elevator: a glowing arch
    const door = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.1), new THREE.MeshBasicMaterial({ color: style.glow, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
    door.position.set(0, 1.1, -HALL_R + 0.05);
    group.add(door);
    const glow = new THREE.PointLight(style.glow, 0.8, 7, 1.5);
    glow.position.set(0, 1.6, -HALL_R + 1);
    group.add(glow);
    // the foam: the hall of the zero moment, sparks that arise and pass
    let sparks = null;
    if (f.id === 'quantum-foam') {
      const n = 220;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(n * 3), 3));
      sparks = new THREE.Points(geo, new THREE.PointsMaterial({ color: '#d8ccff', size: 0.08, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
      sparks.userData.life = new Float32Array(n);
      group.add(sparks);
    }
    scene.add(group);
    return { f, group, door, glow, sparks, placed: [] };
  });
  // the shaft and the car: a glass column in the middle, a ring that rides it
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, floors.length * FLOOR_H, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false }));
  shaft.position.y = floors.length * FLOOR_H / 2;
  scene.add(shaft);
  const car = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.04, 8, 48), new THREE.MeshBasicMaterial({ color: '#5ee7ff' }));
  car.rotation.x = Math.PI / 2;
  scene.add(car);

  let level = 0;
  let carY = 0;
  let last = 0;
  let yaw = 0;
  const placedGeo = new THREE.IcosahedronGeometry(0.16, 1);
  return {
    canvas,
    get floor() { return Math.round(carY / FLOOR_H); },
    get target() { return level; },
    get riding() { return Math.abs(carY - level * FLOOR_H) > 0.05; },
    floorInfo(k) { return halls[k]?.f; },
    go(k) { level = Math.max(0, Math.min(halls.length - 1, k)); },
    // a thought placed in this hall, by the wall, where you are looking; it stays
    place(color = '#ffd166') {
      const h = halls[this.floor];
      if (!h || h.placed.length >= 12) return false;
      const a = -yaw + (Math.random() - 0.5) * 0.4;
      const m = new THREE.Mesh(placedGeo, new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6, roughness: 0.3 }));
      m.position.set(Math.sin(a) * (HALL_R - 0.7), 1 + Math.random() * 0.8, -Math.cos(a) * (HALL_R - 0.7));
      h.group.add(m);
      h.placed.push(m);
      return true;
    },
    placedCount(k) { return halls[k]?.placed.length ?? 0; },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      // the car rides smoothly to the chosen floor
      const goal = level * FLOOR_H;
      carY += (goal - carY) * Math.min(1, dt * 1.6);
      car.position.y = carY + 0.1;
      // in the car, looking out across the hall to its door, turning slowly
      yaw = Math.sin(state.time * 0.08) * 0.5;
      camera.position.set(0, carY + 1.5, 0.2);
      camera.lookAt(Math.sin(yaw) * HALL_R, carY + 1.4, -Math.cos(yaw) * HALL_R);
      applyLook(camera);
      lamp.position.copy(camera.position);
      halls.forEach((h, k) => {
        const near = Math.abs(k * FLOOR_H - carY) < FLOOR_H * 1.5;
        h.group.visible = Math.abs(k * FLOOR_H - carY) < FLOOR_H * 4;
        h.door.material.opacity = (near ? 0.5 : 0.25) + 0.15 * Math.sin(state.time * 1.5 + k);
        for (const m of h.placed) m.rotation.y += dt * 0.6;
        if (h.sparks) {
          const pos = h.sparks.geometry.attributes.position;
          const life = h.sparks.userData.life;
          for (let i = 0; i < life.length; i++) {
            life[i] -= dt;
            if (life[i] <= 0) {
              life[i] = 0.3 + Math.random() * 0.9;
              const a = Math.random() * Math.PI * 2, r = 1 + Math.random() * (HALL_R - 1.2);
              pos.setXYZ(i, Math.cos(a) * r, 0.2 + Math.random() * (FLOOR_H - 0.5), Math.sin(a) * r);
            }
          }
          pos.needsUpdate = true;
          h.sparks.material.opacity = 0.5 + 0.4 * Math.sin(state.time * 9);
        }
      });
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
