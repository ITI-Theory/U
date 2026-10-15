// palace3d.js: the mind palace (ISS-078). The memory palace (the method of loci) is old and
// real: you place what you want to keep in rooms you can walk through; it uses the
// hippocampus's sense of place. The programme's own claim makes this palace the universe: the
// same response grammar at every scale, so the palace's floors are the 21 levels of the zoom
// dial, from the quantum foam at the bottom to the cosmic web at the top. One tower, one
// elevator; each floor a round hall dressed by its sector: stone strata, a crowd's lights,
// molecules, stars in the vault. A DOOR on each floor opens that level's own view (the app's
// level renderers). FX (Φ above one half; author, 14 Oct: "def FX for the palace") lights the
// halls: walls glowing in their sector's colour, lights drifting through the programme's pink
// and blue, the fog thinning, a cloud of coloured motes, placed thoughts glowing; at Φ up to
// one half the palace is as it was. And the walls give way: with the field high they bend and
// fold, the building becoming what the author chose instead of a palace ("why a palace? I
// picked an 11d manifold", May/June 2026; HAL-UAT 14 Oct). The foam floor is the hall of the zero moment (mindfulness: everything
// arises and passes, nothing is held). PLACE puts a thought in the hall; it stays there.
// Interpretive: a building for the mind, not a claim about the cosmos.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const FLOOR_H = 3.2;
const PINK = '#ff3bce';   // the programme's two colours (style.css --pink, --cyan)
const BLUE = '#14e5ff';
const PINK_C = new THREE.Color(PINK);
const BLUE_C = new THREE.Color(BLUE);
// the walls' fold (FX) and the time, shared by every hall's wall shader
const FOLD = { value: 0 };
const TIME = { value: 0 };
// a soft round point (the motes), not a square; made on first use (the explorer check loads
// this module in node, where there is no document)
let SOFT_TEX = null;
const soft = () => SOFT_TEX ??= (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(0.35, 'rgba(255,255,255,0.6)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
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
  const ambient = new THREE.AmbientLight('#605878', 0.7);
  scene.add(ambient);
  const restBackground = new THREE.Color('#05040a');
  const hue = new THREE.Color();
  const lamp = new THREE.PointLight('#fff2d8', 1.4, 14, 1.2);
  scene.add(lamp);

  const halls = floors.map((f, k) => {
    const style = STYLE[f.sector] ?? STYLE['named-solution'];
    const y = k * FLOOR_H;
    const group = new THREE.Group();
    group.position.y = y;
    const wallMat = new THREE.MeshStandardMaterial({ map: hallTexture(style, f.label, k), side: THREE.BackSide, roughness: 0.8, emissive: style.wall, emissiveIntensity: 0.25 });
    // the manifold: the wall pushed in and out along its normal by a few moving modes, by FX
    wallMat.onBeforeCompile = shader => {
      shader.uniforms.uFold = FOLD;
      shader.uniforms.uTime = TIME;
      shader.vertexShader = 'uniform float uFold;\nuniform float uTime;\nvarying float vFold;\n' + shader.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float fa = atan(position.z, position.x);
        float ff = sin(3.0 * fa + uTime * 0.7 + position.y * 1.3) * sin(2.0 * position.y - uTime * 0.5) + 0.5 * sin(5.0 * fa - uTime * 1.1 + position.y);
        // the wall stays calm round the door (at -z), so the way out stays open
        ff *= smoothstep(0.35, 1.0, abs(fa + 1.5708));
        vFold = ff * uFold;
        transformed += normal * uFold * 0.6 * ff;`);
      // the folds lit as bands: brighter where the wall pushes in, darker where it falls away
      shader.fragmentShader = 'varying float vFold;\n' + shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance *= 1.0 + 0.9 * vFold;
        diffuseColor.rgb *= 1.0 + 0.5 * vFold;`);
    };
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(HALL_R, HALL_R, FLOOR_H - 0.15, 64, 18, true), wallMat);
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
    // FX: motes in the hall's colour, the programme's pink and blue among them (hidden at rest)
    const nm = 360;
    const mp = new Float32Array(nm * 3), mc = new Float32Array(nm * 3);
    const palette = [new THREE.Color(style.glow), new THREE.Color(PINK), new THREE.Color(BLUE), new THREE.Color('#ffffff')];
    for (let i = 0; i < nm; i++) {
      const a = Math.random() * Math.PI * 2, r = 1.1 + Math.random() * (HALL_R - 1.4);
      mp.set([Math.cos(a) * r, 0.15 + Math.random() * (FLOOR_H - 0.4), Math.sin(a) * r], i * 3);
      const c = palette[i % palette.length];
      mc.set([c.r, c.g, c.b], i * 3);
    }
    const mgeo = new THREE.BufferGeometry();
    mgeo.setAttribute('position', new THREE.Float32BufferAttribute(mp, 3));
    mgeo.setAttribute('color', new THREE.Float32BufferAttribute(mc, 3));
    const motes = new THREE.Points(mgeo, new THREE.PointsMaterial({ size: 0.05, map: soft(), vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    motes.visible = false;
    group.add(motes);
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
    return { f, group, wall, door, glow, motes, sparks, placed: [], base: { wall: new THREE.Color(style.wall), glow: new THREE.Color(style.glow) } };
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
      // FX: 0 up to Φ = 0.5 (the palace as it was), 1 at Φ = 1
      const fx = Math.max(0, Math.min(1, ((state.phi ?? 0) - 0.5) / 0.5));
      ambient.intensity = 0.7 + 0.3 * fx;
      lamp.intensity = 1.4 + 0.5 * fx;
      scene.fog.density = 0.035 * (1 - 0.55 * fx);
      // the manifold is a view (DESIGN.md): the walls fold only in the 11D view
      FOLD.value = (state.dim ?? 11) >= 11 ? fx * fx : 0;
      TIME.value = state.time;
      halls.forEach((h, k) => {
        const near = Math.abs(k * FLOOR_H - carY) < FLOOR_H * 1.5;
        h.group.visible = Math.abs(k * FLOOR_H - carY) < FLOOR_H * 4;
        h.door.material.opacity = (near ? 0.5 : 0.25) + 0.15 * Math.sin(state.time * 1.5 + k) + 0.3 * fx;
        // FX: the walls light in their sector's colour, the hall's light drifts through pink and blue
        // the programme's pink and blue, drifting, not the hall's own (often pale) colour
        const swing = 0.5 + 0.5 * Math.sin(state.time * 0.4 + k * 1.3);
        hue.copy(PINK_C).lerp(BLUE_C, swing);
        h.wall.material.emissiveIntensity = 0.25 + 0.55 * fx;
        h.wall.material.emissive.copy(h.base.wall).lerp(hue, 0.65 * fx);
        h.glow.color.copy(h.base.glow).lerp(hue, 0.8 * fx);
        h.glow.intensity = 0.8 + 2.2 * fx;
        h.motes.visible = fx > 0 && near;
        if (h.motes.visible) {
          h.motes.material.opacity = 0.9 * fx;
          h.motes.material.size = 0.04 + 0.05 * fx;
          h.motes.rotation.y += dt * (0.05 + 0.25 * fx);
        }
        for (const m of h.placed) {
          m.rotation.y += dt * (0.6 + 1.4 * fx);
          m.material.emissiveIntensity = 0.6 + 0.9 * fx;
          m.scale.setScalar(1 + 0.25 * fx * (0.5 + 0.5 * Math.sin(state.time * 3 + m.id)));
        }
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
      scene.background.copy(restBackground).lerp(hue, 0.08 * fx);
      scene.fog.color.copy(scene.background);
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
