// explorer3d.js: the landscape of states in 3D for the mind-body explorer (ISS-052).
// One world in three layers, as the 4D/8D/11D switch:
//   4D  the mountains: a terrain of the same energy the 2D drawing and the checked
//       simulation use (explorer.js energy), the state as a glowing ball with its trail;
//   8D  + the country: rolling plains around them that swell and move with Phi (limbic);
//   11D + the city: towers of glowing code on the horizon (as in Hackers, 1995), made of
//       the programme's own formal layer: Sherlock's concepts with their Lean names
//       (taller for stronger evidence) and the levels' equations, with circuit streets
//       running down to the mountains.
// The camera swings over the mountains with the city behind. The explorer's 2D canvas
// draws the labels on top.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';

const SIZE = 2.9;
const T_MID = 0.55;   // the field's temperature at Φ 0.5 (explorer.js T0 + SIGMA / 2)
const N = 110;
const TRAIL = 160;

// energy(px, py, beta, J) and the well positions come from explorer.js, so the terrain
// is exactly what the simulation rolls on.
// city: [{ title, lines: [...], status }] (main.js: the concept registry and level equations)
export function createLandscape3D({ energy, wells, city = [], skyline = [] }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#0b1226');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b1226', 5, 17);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 50);
  // two eyes for 3D SBS; a separation that reads well on a large screen at this scale
  const stereoCamera = new THREE.StereoCamera();
  stereoCamera.eyeSep = 0.09;
  // zero parallax at the near rim: the valleys and the city sit behind the screen (H-AL's staging)
  camera.focus = 3.4;
  const size = new THREE.Vector2();

  scene.add(new THREE.HemisphereLight('#9fd8ff', '#140a1c', 0.9));
  const sun = new THREE.DirectionalLight('#ffffff', 1.1);
  sun.position.set(2, 4, 1.5);
  scene.add(sun);

  const geometry = new THREE.PlaneGeometry(SIZE, SIZE, N, N);
  geometry.rotateX(-Math.PI / 2);
  const count = geometry.attributes.position.count;
  geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  const terrain = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.15 }));
  scene.add(terrain);

  // grid lines over the terrain, every fifth row and column
  const STEP = 5;
  const lineCount = Math.floor(N / STEP) + 1;
  const gridPositions = new Float32Array(2 * lineCount * (N + 1) * 3);
  const gridGeometry = new THREE.BufferGeometry();
  gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
  const gridIndex = [];
  for (let line = 0; line < 2 * lineCount; line++) {
    for (let i = 0; i < N; i++) gridIndex.push(line * (N + 1) + i, line * (N + 1) + i + 1);
  }
  gridGeometry.setIndex(gridIndex);
  const grid = new THREE.LineSegments(gridGeometry, new THREE.LineBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.35 }));
  scene.add(grid);

  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 16), new THREE.MeshBasicMaterial({ color: '#fff4c2' }));
  const ballLight = new THREE.PointLight('#ffd166', 0.9, 0.8);
  ball.add(ballLight);
  scene.add(ball);
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
  const trail = new THREE.Line(trailGeometry, new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.55 }));
  scene.add(trail);

  const country = makeCountry();
  scene.add(country.mesh);
  const cityGroup = makeCity(city);
  // OpenCyc on the horizon, part of the city (11D)
  if (skyline.length) cityGroup.add(makeSkyline(skyline));
  scene.add(cityGroup);

  const wellLights = wells.map(() => {
    const light = new THREE.PointLight('#ffffff', 0, 0.9);
    scene.add(light);
    return light;
  });

  let key = '';
  let eRef = 0;
  let beta = 1;
  let J = 0;
  const color = new THREE.Color();

  // the same clipped height as the 2D drawing, so the valleys stay readable
  const height = (px, py) => Math.max(-0.5, Math.min(0.35, energy(px, py, beta, J) - eRef)) * 0.95;

  function rebuild(phi, T, resourceJ) {
    beta = 1 / T;
    J = resourceJ;
    eRef = energy(0, 0, beta, J);
    const pos = geometry.attributes.position;
    const col = geometry.attributes.color;
    const hue = 0.52 - 0.46 * phi;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = height(x, -z);
      pos.setY(i, y);
      const level = (y + 0.475) / 0.8;
      color.setHSL((hue + 0.18 * level + 1) % 1, 0.75, 0.62 - 0.4 * level);
      col.setXYZ(i, color.r, color.g, color.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
    geometry.computeVertexNormals();
    let k = 0;
    for (let line = 0; line < lineCount; line++) {
      const row = Math.min(N, line * STEP);
      for (let i = 0; i <= N; i++) {
        const v = row * (N + 1) + i;
        gridPositions[k++] = pos.getX(v);
        gridPositions[k++] = pos.getY(v) + 0.004;
        gridPositions[k++] = pos.getZ(v);
      }
    }
    for (let line = 0; line < lineCount; line++) {
      const column = Math.min(N, line * STEP);
      for (let i = 0; i <= N; i++) {
        const v = i * (N + 1) + column;
        gridPositions[k++] = pos.getX(v);
        gridPositions[k++] = pos.getY(v) + 0.004;
        gridPositions[k++] = pos.getZ(v);
      }
    }
    gridGeometry.attributes.position.needsUpdate = true;
    grid.material.color.setHSL(hue, 0.9, 0.65);
  }

  const toWorld = (px, py, lift = 0) => new THREE.Vector3(px, height(px, py) + lift, -py);
  // THE LOAD in 3D (author, 16 Oct 00:27: "copy the FFF square ... paste 5 there ... the other
  // worries"): the square in front is the thought now; five copies around it are unresolved
  // thoughts, each the same SAFE / FIGHT / FREEZE landscape (one field: they share its shape and
  // Φ), each with its own ball still rolling, a violet ghost. Struts join them to the square in
  // front, red while that thought's ball is out of SAFE; the STRUTS slider spreads them out or
  // crowds them in. The examples are illustrative; interpretive.
  const LOAD_NAMES = ['cut the grass', 'book the dentist', 'the tax return', 'fix the bike', 'call mum'];
  // each thought its own slope (author, 16 Oct 01:53: "can each FFF have different slope parameters?"):
  // T its temperature (low: steep walls, the ball stays put; high: shallow, it wanders), J the
  // resource, depth how deep the wells, tilt a lean towards one well (wells: SAFE, FIGHT, FREEZE),
  // hue a shift of the colours. Illustrative values, not readings.
  const LOAD_SHAPES = [
    { T: 0.24, J: 0.15, depth: 0.7, tilt: [0, 1], lean: 0.12, hue: 0.07 },     // cut the grass: shallow, easy, leans SAFE
    { T: 0.08, J: 0, depth: 1.3, tilt: [2], lean: 0.16, hue: -0.08 },          // book the dentist: deep, leans FREEZE
    { T: 0.05, J: 0, depth: 1.6, tilt: [2, 1], lean: 0.12, hue: 0.16 },        // the tax return: steep, high barriers
    { T: 0.14, J: 0, depth: 1.0, tilt: [1], lean: 0.18, hue: -0.18 },          // fix the bike: leans FIGHT
    { T: 0.12, J: 0.45, depth: 0.9, tilt: [0], lean: 0.08, hue: 0.28 },        // call mum: the resource is there
  ];
  const BN = Math.round(N / 2);
  // its temperature follows the field's (Φ), scaled by its own: the shapes move with the slider
  const boardT = (b, T) => T * (0.55 + 0.45 * b.shape.T / 0.12);
  function boardSurface(b, T) {
    const lean = b.shape.tilt.reduce(([ax, ay], k) => [ax + wells[k][0], ay + wells[k][1]], [0, 0]);
    const E = (x, y) => energy(x, y, 1 / boardT(b, T), b.shape.J) * b.shape.depth - b.shape.lean * (lean[0] * x + lean[1] * y);
    const ref = E(0, 0);
    // the rim: every board rises to the same top edge as the square in front
    const rim = (x, y) => 0.35 * Math.min(1, Math.max(0, (Math.max(Math.abs(x), Math.abs(y)) - 1.05) / 0.35)) ** 2;
    b.h = (x, y) => Math.max(rim(x, y), Math.max(-0.5, Math.min(0.35, E(x, y) - ref))) * 0.95;
    b.E = E;
    b.T = boardT(b, T);
  }
  function paintBoard(b, phi, T) {
    boardSurface(b, T);
    const pos = b.geo.attributes.position, col = b.geo.attributes.color;
    const hue = 0.52 - 0.46 * phi + b.shape.hue;
    for (let i = 0; i < pos.count; i++) {
      const y = b.h(pos.getX(i), -pos.getZ(i));
      pos.setY(i, y);
      color.setHSL(((hue + 0.18 * (y + 0.475) / 0.8) % 1 + 1) % 1, 0.75, 0.62 - 0.4 * (y + 0.475) / 0.8);
      col.setXYZ(i, color.r, color.g, color.b);
    }
    pos.needsUpdate = true; col.needsUpdate = true;
    b.geo.computeVertexNormals();
    const lp = b.lines.geometry.attributes.position;
    for (let i = 0; i < lp.count; i++) lp.setY(i, b.h(lp.getX(i), -lp.getZ(i)) + 0.004);
    lp.needsUpdate = true;
    b.lines.material.color.setHSL(((hue % 1) + 1) % 1, 0.9, 0.65);
  }
  const LOAD_ANGLES = [-2.6, -2.05, -1.5708, -1.09, -0.54];   // around the back and the sides
  const BOARD = 0.5;
  let boards = null;
  let lastPhi = 0.5, lastT = T_MID;
  let zoom = 0;
  // ATTENTION (author, 16 Oct 00:40): one ball is neon purple, the thought attended to now; it moves
  // to whichever thought pulls hardest (one whose ball has left SAFE), else now and then on its
  // own; the rest keep rolling unattended. 0 is the square in front, 1..5 the load.
  const PURPLE = new THREE.Color('#c04dff'), CREAM = new THREE.Color('#fff4c2');
  let attended = 0, attendedFor = 0, attendLast = null;
  let jump = null;
  const jumpLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 32 }, () => new THREE.Vector3())), new THREE.LineBasicMaterial({ color: '#c04dff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(jumpLine);
  let glowT = null;
  const glowTex = () => {
    if (glowT) return glowT;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.25)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    glowT = new THREE.CanvasTexture(c);
    return glowT;
  };
  const boardCentre = k => (k === 0 ? new THREE.Vector3(0, 0, 0) : boards[k - 1].group.position.clone());
  const strutMat = new THREE.MeshBasicMaterial({ color: '#ff7ad9', transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  function makeBoards() {
    boards = LOAD_NAMES.map((name, k) => {
      const group = new THREE.Group();
      const geo = new THREE.PlaneGeometry(SIZE, SIZE, BN, BN);
      geo.rotateX(-Math.PI / 2);
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count * 3), 3));
      // its grid: every fifth row and column, on its own surface
      const lp = [];
      const at = (i, j) => [-SIZE / 2 + SIZE * i / BN, -SIZE / 2 + SIZE * j / BN];
      for (let j = 0; j <= BN; j += 5) for (let i = 0; i < BN; i++) { const [x0, z0] = at(i, j), [x1] = at(i + 1, j); lp.push(x0, 0, z0, x1, 0, z0); }
      for (let i = 0; i <= BN; i += 5) for (let j = 0; j < BN; j++) { const [x0, z0] = at(i, j), [, z1] = at(i, j + 1); lp.push(x0, 0, z0, x0, 0, z1); }
      const lg = new THREE.BufferGeometry();
      lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
      const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.35 }));
      group.add(new THREE.Mesh(geo, terrain.material), lines);
      group.scale.set(BOARD, BOARD * 1.7, BOARD);   // their relief kept at their size
      // the same ball and trail as the square in front, in the board's own coordinates
      const ghost = new THREE.Mesh(ball.geometry, ball.material.clone());
      const tg = new THREE.BufferGeometry();
      tg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
      const trailLine = new THREE.Line(tg, trail.material);
      // the wells glow in the memory colours (sprites, not lights: five boards of lights are too many)
      const glows = wells.map(() => { const g = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })); g.scale.setScalar(0.9); group.add(g); return g; });
      group.add(ghost, trailLine);
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 10, 1, true), strutMat.clone());
      scene.add(group, strut);
      const w = wells[k % wells.length];
      const b = { name, shape: LOAD_SHAPES[k], geo, lines, group, ghost, trailLine, glows, strut, px: w[0] * 0.6, py: w[1] * 0.6, path: [], angle: LOAD_ANGLES[k], out: 0 };
      paintBoard(b, lastPhi, lastT);
      return b;
    });
  }
  const local = (b, x, y, lift = 0) => new THREE.Vector3(x, b.h(x, y) + lift, -y);

  return {
    canvas,
    // the load's boards on screen, for the labels: [{ name, x, y, visible, out }]
    loadBoards() {
      if (!boards || zoom < 0.5) return [];
      const main = new THREE.Vector3(0, 0.7, 0).project(camera);
      return [{ name: 'the thought in front', x: main.x / 2, y: -main.y / 2, visible: main.z < 1, out: 0, attended: attended === 0 },
        ...boards.map((b, i) => { const v = b.group.position.clone().add(new THREE.Vector3(0, 0.55, 0)).project(camera); return { name: b.name, x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.05, out: b.out, attended: attended === i + 1 }; })];
    },
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    // state: { phi, T, J, dim, theta, ball: {x, y}, trail: [[x, y]...], memoryColors: [...] }
    render(state) {
      const next = `${state.T.toFixed(3)}|${state.J}`;
      if (next !== key) {
        key = next;
        rebuild(state.phi, state.T, state.J);
        lastPhi = state.phi; lastT = state.T;
        if (boards) for (const b of boards) paintBoard(b, state.phi, state.T);
      }
      // swing over the mountains on the near side, the city on the horizon behind them
      if (state.golf && !boards) makeBoards();
      zoom += ((state.golf ? 1 : 0) - zoom) * 0.05;
      const spread = 2.3 + 2.4 * (state.strut ?? 0.5);
      const holes = [[0, 0, 1.5]];
      if (boards) {
        const dt = Math.min(0.05, Math.max(0, (state.time ?? 0) - (boards.t ?? state.time ?? 0)));
        boards.t = state.time;
        const heat = Math.max(0.02, state.T ?? 0.1);
        for (const b of boards) {
          const on = Boolean(state.golf);
          b.group.visible = b.ghost.visible = b.strut.visible = on && zoom > 0.05;
          if (!on) continue;
          const cx = Math.cos(b.angle) * spread * zoom, cz = Math.sin(b.angle) * spread * 0.85 * zoom;
          b.group.position.set(cx, -0.05, cz);
          holes.push([cx, cz, 1.5 * BOARD + 0.1]);
          // its ball: the same rolling (a noisy descent of the same energy), its own path
          const e = 0.01;
          // on its own slope, at its own temperature (warmer with Φ)
          const gx = (b.E(b.px + e, b.py) - b.E(b.px - e, b.py)) / (2 * e);
          const gy = (b.E(b.px, b.py + e) - b.E(b.px, b.py - e)) / (2 * e);
          const hb = b.T * 0.35;
          b.px = Math.max(-1.35, Math.min(1.35, b.px - gx * 0.6 * dt + Math.sqrt(2 * hb * dt) * 1.4 * (Math.random() - 0.5)));
          b.py = Math.max(-1.35, Math.min(1.35, b.py - gy * 0.6 * dt + Math.sqrt(2 * hb * dt) * 1.4 * (Math.random() - 0.5)));
          b.ghost.position.copy(local(b, b.px, b.py, 0.06));
          b.path.push([b.px, b.py]);
          if (b.path.length > TRAIL) b.path.shift();
          const tp = b.trailLine.geometry.attributes.position;
          b.path.forEach(([x, y], i) => { const v = local(b, x, y, 0.03); tp.setXYZ(i, v.x, v.y, v.z); });
          tp.needsUpdate = true;
          b.trailLine.geometry.setDrawRange(0, b.path.length);
          wells.forEach(([x, y], k) => { b.glows[k].position.copy(local(b, x, y, 0.12)); b.glows[k].material.color.set(state.memoryColors?.[k] ?? '#ffffff'); });
          // out of SAFE (the first well): the strut glows red, its pull on the thought in front
          let near = 0, best = 1e9;
          wells.forEach(([wx, wy], k) => { const d = (wx - b.px) ** 2 + (wy - b.py) ** 2; if (d < best) { best = d; near = k; } });
          b.out += ((near === 0 ? 0 : 1) - b.out) * Math.min(1, dt * 2);
          b.strut.material.color.setRGB(0.6 + 0.4 * b.out, 0.48 * (1 - b.out) + 0.15, 0.85 * (1 - b.out) + 0.25);
          b.strut.material.opacity = 0.35 + 0.45 * b.out + 0.2 * Math.sin(state.time * 3 + b.angle * 4) * b.out;
          // the strut: from the square's edge to the board's
          const from = new THREE.Vector3(Math.cos(b.angle) * 1.45, 0.12, Math.sin(b.angle) * 1.2);
          const to = new THREE.Vector3(cx - Math.cos(b.angle) * 0.75, 0.12, cz - Math.sin(b.angle) * 0.75);
          const len = Math.max(0.01, from.distanceTo(to));
          b.strut.position.copy(from).lerp(to, 0.5);
          b.strut.scale.set(0.02 + 0.02 * b.out, len, 0.02 + 0.02 * b.out);
          b.strut.lookAt(to);
          b.strut.rotateX(Math.PI / 2);
        }
      }
      // attention: held a while, then caught by the thought pulling hardest, or wandering
      if (boards && state.golf) {
        const dt2 = Math.min(0.05, Math.max(0, (state.time ?? 0) - (attendLast ?? state.time ?? 0)));
        attendLast = state.time;
        attendedFor += dt2;
        if (attendedFor > 3) {
          const pulls = boards.map((b, i) => [i + 1, b.out]).filter(([i]) => i !== attended).sort((p, q) => q[1] - p[1]);
          let next = -1;
          if (pulls[0] && pulls[0][1] > 0.7 && Math.random() < dt2 * 0.8) next = pulls[0][0];
          else if (attendedFor > 9 && Math.random() < dt2 * 0.3) next = Math.floor(Math.random() * 6);
          if (next >= 0 && next !== attended) {
            jump = { from: boardCentre(attended), to: boardCentre(next), t: 0 };
            attended = next;
            attendedFor = 0;
          }
        }
        ball.material.color.copy(attended === 0 ? PURPLE : CREAM);
        ballLight.color.copy(attended === 0 ? PURPLE : new THREE.Color('#ffd166'));
        boards.forEach((b, i) => {
          const on = attended === i + 1;
          b.ghost.material.color.copy(on ? PURPLE : CREAM);
          b.ghost.scale.setScalar(on ? 2.2 : 1.4);
        });
        if (jump) {
          jump.t += dt2 / 0.9;
          const pts = jumpLine.geometry.attributes.position;
          for (let i = 0; i < 32; i++) { const t = i / 31; const v = jump.from.clone().lerp(jump.to, t); v.y += 0.9 * Math.sin(Math.PI * t) + 0.3; pts.setXYZ(i, v.x, v.y, v.z); }
          pts.needsUpdate = true;
          jumpLine.material.opacity = Math.max(0, 1 - jump.t);
          if (jump.t >= 1) jump = null;
        }
      } else {
        ball.material.color.copy(CREAM);
        jumpLine.material.opacity = 0;
      }
      cityGroup.position.z = -(spread * 0.85 - 0.9) * zoom;
      const swing = Math.PI / 2 + 0.75 * Math.sin(state.theta * 0.9) * (1 - 0.6 * zoom);
      const r = 4.6 + (2.2 + 1.6 * (state.strut ?? 0.5)) * zoom;
      camera.position.set(Math.cos(swing) * r, 1.45 + (1.4 + 0.9 * (state.strut ?? 0.5)) * zoom + 0.2 * Math.sin(state.theta * 1.7), Math.sin(swing) * r);
      camera.lookAt(0, 0.3 - 0.3 * zoom, -2.4 + 1.4 * zoom);
      country.mesh.visible = state.dim >= 8;
      if (country.mesh.visible) country.update(state.phi, state.time, holes);
      cityGroup.visible = state.dim >= 11;
      // the floors resting on sorry flicker
      if (cityGroup.userData.flicker) cityGroup.userData.flicker.opacity = 0.35 + 0.6 * Math.abs(Math.sin(state.time * 6.3 + 2 * Math.sin(state.time * 17)));
      ball.position.copy(toWorld(state.ball.x, state.ball.y, 0.06));
      const tp = trailGeometry.attributes.position;
      state.trail.forEach(([x, y], i) => {
        const v = toWorld(x, y, 0.03);
        tp.setXYZ(i, v.x, v.y, v.z);
      });
      tp.needsUpdate = true;
      trailGeometry.setDrawRange(0, state.trail.length);
      wells.forEach(([x, y], k) => {
        wellLights[k].position.copy(toWorld(x, y, 0.18));
        wellLights[k].color.set(state.memoryColors[k]);
        wellLights[k].intensity = state.dim >= 11 ? 0.7 : 0;
      });
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        // half: each eye gets the whole frame's aspect squeezed into half the width (the
        // usual HDMI 3D input); full: each eye is a native half-width picture
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.09);
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
    // screen position (fractions of the canvas from the centre) of a state-space point
    project(px, py, lift = 0) {
      const v = toWorld(px, py, lift).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 };
    },
    // the tower under a screen point (fractions of the canvas from the centre, as project()),
    // or null: walk into a tower of the city of code (ISS-071)
    pick(fx, fy) {
      if (!cityGroup.visible || !cityGroup.userData.towers) return null;
      const ray = new THREE.Raycaster();
      ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
      const hit = ray.intersectObjects(cityGroup.userData.towers, false)[0];
      return hit?.object.userData.item ?? null;
    },
    // the towers' titles (for tours: tower=<module>)
    towerItem(title) {
      return (cityGroup.userData.towers ?? []).map(t => t.userData.item).find(it => it.title === title || it.title === `${title}.lean`) ?? null;
    },
    // the same for a world point (zone labels: city, country)
    projectWorld(x, y, z) {
      const v = new THREE.Vector3(x, y, z).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}

// 8D: the country, rolling plains around the mountains (hidden under the terrain square)
function makeCountry() {
  const geometry = new THREE.PlaneGeometry(22, 22, 72, 72);
  geometry.rotateX(-Math.PI / 2);
  const mesh = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), new THREE.LineBasicMaterial({ color: '#56f0a2', transparent: true, opacity: 0.22 }));
  const wire = mesh.geometry.attributes.position;
  return {
    mesh,
    // holes: [[x, z, half]] where boards sit (the main square and the load's)
    update(phi, time, holes = [[0, 0, 1.5]]) {
      const amp = 0.06 + 0.22 * phi;
      for (let i = 0; i < wire.count; i++) {
        const x = wire.getX(i);
        const z = wire.getZ(i);
        const inside = holes.some(([hx, hz, hh]) => Math.abs(x - hx) < hh && Math.abs(z - hz) < hh);
        const y = inside ? -0.9 : 0.25 + amp * (Math.sin(x * 0.9 + time * 0.4) * Math.cos(z * 0.7 - time * 0.3) + 0.5 * Math.sin((x + z) * 1.7 + time * 0.8));
        wire.setY(i, y);
      }
      wire.needsUpdate = true;
      mesh.material.color.setHSL(0.4 - 0.32 * phi, 0.8, 0.6);
    },
  };
}

// 11D: the city of code. Towers of glowing text along an avenue towards the mountains,
// circuit traces for streets. Tower height follows the evidence of its concept.
const HEIGHT = { 'kernel-verified': 3.4, definition: 2.2, sorry: 1.3, axiom: 0.9 };

function towerTexture(item, hue) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const g = canvas.getContext('2d');
  g.fillStyle = 'rgba(4,10,24,0.55)';
  g.fillRect(0, 0, 256, 512);
  g.font = '15px "Space Mono", monospace';
  const lines = [item.title, ...item.lines].filter(Boolean);
  let y = 18;
  let k = 0;
  while (y < 512) {
    const text = String(lines[k % lines.length]);
    g.fillStyle = k % lines.length === 0 ? '#ffffff' : `hsla(${hue}, 90%, ${55 + (k * 7) % 25}%, 0.95)`;
    for (let start = 0; start < text.length && y < 512; start += 24) {
      g.fillText(text.slice(start, start + 24), 8, y);
      y += 18;
    }
    if (k % 3 === 2) {
      g.fillStyle = `hsla(${hue}, 90%, 60%, 0.5)`;
      g.fillRect(8, y - 10, 40 + ((k * 37) % 150), 6);
      y += 12;
    }
    k += 1;
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const mod = (n, m) => ((n % m) + m) % m;

// The programme's Lean (ISS-071): a floor per declaration, a ring around the tower in the
// colour of its status; axioms amber at the foundations, then definitions, then theorems.
const FLOOR_ORDER = { axiom: 0, inductive: 1, opaque: 1, def: 2, theorem: 3 };
const FLOOR_COLOUR = { axiom: [1, 0.72, 0.2], inductive: [0.37, 0.9, 1], opaque: [0.37, 0.9, 1], def: [0.37, 0.9, 1], theorem: [0.34, 0.94, 0.64], trivial: [0.55, 0.6, 0.7] };

function floorRings(decls, x, z, height, w, rings, sorry, where) {
  const floors = decls.map((d, i) => ({ d, i })).sort((a, b) => (FLOOR_ORDER[a.d.k] ?? 2) - (FLOOR_ORDER[b.d.k] ?? 2) || a.i - b.i);
  const step = (height - 0.12) / Math.max(1, floors.length);
  floors.forEach(({ d }, k) => {
    const y = -0.08 + step * (k + 0.5);
    const h = w / 2;
    const corners = [[x - h, z - h], [x + h, z - h], [x + h, z + h], [x - h, z + h]];
    const target = d.sorry ? sorry : rings;
    const c = d.sorry ? [1, 0.25, 0.3] : FLOOR_COLOUR[d.trivial ? 'trivial' : d.k] ?? FLOOR_COLOUR.def;
    for (let e = 0; e < 4; e++) {
      const [ax, az] = corners[e];
      const [bx, bz] = corners[(e + 1) % 4];
      target.pos.push(ax, y, az, bx, y, bz);
      target.col.push(...c, ...c);
    }
    where.set(d.f ?? `${x}|${z}|${k}`, new THREE.Vector3(x, y, z));
    d._at = new THREE.Vector3(x, y, z);
  });
}

function segments(buffers, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(buffers.pos, 3));
  if (buffers.col) geometry.setAttribute('color', new THREE.Float32BufferAttribute(buffers.col, 3));
  return new THREE.LineSegments(geometry, material);
}

function makeCity(items) {
  const group = new THREE.Group();
  if (!items.length) return group;
  const box = new THREE.BoxGeometry(1, 1, 1);
  const edges = new THREE.EdgesGeometry(box);
  const rings = { pos: [], col: [] };
  const sorry = { pos: [], col: [] };
  const where = new Map();
  items.forEach((item, i) => {
    const side = i % 2 ? 1 : -1;
    const row = Math.floor(i / 2);
    const x = side * (1.0 + (row % 3) * 0.9 + ((i * 13) % 5) * 0.05);
    const z = -3.6 - row * 0.62;
    const height = item.height ?? HEIGHT[item.status] ?? 1.4 + ((i * 7) % 10) / 10;
    const hue = item.status === 'kernel-verified' ? 150 : item.status === 'sorry' || item.status === 'axiom' ? 320 : 190;
    const texture = towerTexture(item, hue);
    const tower = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    tower.scale.set(0.55, height, 0.55);
    tower.position.set(x, height / 2 - 0.1, z);
    tower.userData.item = item;
    group.add(tower);
    (group.userData.towers ??= []).push(tower);
    const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: new THREE.Color(`hsl(${hue}, 90%, 65%)`), transparent: true, opacity: 0.7 }));
    outline.scale.copy(tower.scale);
    outline.position.copy(tower.position);
    group.add(outline);
    if (item.decls?.length) floorRings(item.decls, x, z, height, 0.64, rings, sorry, where);
  });
  if (rings.pos.length) {
    group.add(segments(rings, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })));
    const flicker = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    if (sorry.pos.length) group.add(segments(sorry, flicker));
    group.userData.flicker = flicker;
    // beams: from each declaration down to the programme's own axioms it rests on
    const beams = { pos: [] };
    for (const item of items) {
      for (const d of item.decls ?? []) {
        for (const a of d.ax ?? []) {
          const to = where.get(a);
          if (to && d._at) beams.pos.push(d._at.x, d._at.y, d._at.z, to.x, to.y, to.z);
        }
      }
    }
    if (beams.pos.length) group.add(segments(beams, new THREE.LineBasicMaterial({ color: '#ffb833', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })));
    group.userData.beams = beams.pos.length / 6;
  }
  // circuit traces: right-angled streets from the avenue down towards the mountains
  const points = [];
  const depth = -3.6 - Math.ceil(items.length / 2) * 0.62;
  for (let k = -6; k <= 6; k++) {
    let x = k * 0.16;
    let z = depth;
    while (z < -1.6) {
      const nz = Math.min(-1.6, z + 0.5 + mod(k * 31 + Math.round(z * 10), 7) * 0.1);
      points.push(x, -0.08, z, x, -0.08, nz);
      z = nz;
      if (z < -1.6) {
        const nx = x + (mod(k * 17 + Math.round(z * 10), 3) - 1) * 0.16;
        points.push(x, -0.08, z, nx, -0.08, z);
        x = nx;
      }
    }
  }
  const traces = new THREE.BufferGeometry();
  traces.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  group.add(new THREE.LineSegments(traces, new THREE.LineBasicMaterial({ color: '#b46cff', transparent: true, opacity: 0.85 })));
  return group;
}

// OpenCyc's skyline (ISS-071): a tower per microtheory on a wide arc beyond the city,
// height by the log of its facts, the largest (UniversalVocabularyMt) at the centre; a faint
// wireframe that the fog does not hide. EmotionCyc is the bridge: an amber arc from the
// programme's towers at the front of the avenue over the city to the centre tower.
function makeSkyline(rows) {
  const group = new THREE.Group();
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)).attributes.position.array;
  const pos = [];
  const R = 42;
  const top = { y: 0, z: 0 };
  rows.forEach(([, facts], k) => {
    const side = k % 2 ? 1 : -1;
    const a = side * Math.ceil(k / 2) * (1.45 / Math.max(1, rows.length / 2));
    const r = R + ((k * 7919) % 13) * 0.9;
    const x = r * Math.sin(a);
    const z = 4 - r * Math.cos(a);
    const lg = Math.log10(facts + 1);
    const h = 0.3 + 0.35 * lg * lg;
    const w = 0.12 + 0.07 * lg;
    if (k === 0) { top.y = h; top.z = z; }
    for (let i = 0; i < edges.length; i += 3) pos.push(x + edges[i] * w, h / 2 + edges[i + 1] * h - 0.1, z + edges[i + 2] * w);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  group.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: '#8f7cff', transparent: true, opacity: 0.38, fog: false, depthWrite: false })));
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0.2, -3.6), new THREE.Vector3(0, 16, (top.z - 3.6) / 2), new THREE.Vector3(0, top.y, top.z));
  const bridge = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64)), new THREE.LineBasicMaterial({ color: '#ffb833', transparent: true, opacity: 0.8, fog: false, blending: THREE.AdditiveBlending, depthWrite: false }));
  group.add(bridge);
  return group;
}

// ---------------------------------------------------------------- the dyad in 3D

// Two jellyfish figures across a contact boundary, hearts pulsing with the simulated
// rhythms (explorer.js dyadStep), a ripple ring towards the other on each beat, coupling
// lines between the chests (tangled when out of step), and at 11D a shared field around
// both. In stereo the bodies sit at the screen plane, ripples and field in front.
export function createDyad3D() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#0b1226');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#0b1226', 6, 16);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 60);
  camera.focus = 5.6;
  const stereoCamera = new THREE.StereoCamera();
  stereoCamera.eyeSep = 0.1;
  const size = new THREE.Vector2();
  scene.add(new THREE.HemisphereLight('#9fd8ff', '#140a1c', 0.8));

  const floor = new THREE.GridHelper(14, 28, '#1f3a5a', '#16263d');
  floor.position.y = -1.15;
  scene.add(floor);
  const boundary = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.6), new THREE.MeshBasicMaterial({ color: '#e8eefc', transparent: true, opacity: 0.05, side: THREE.DoubleSide, depthWrite: false }));
  boundary.rotation.y = Math.PI / 2;
  boundary.position.y = 0.05;
  scene.add(boundary);
  const boundaryEdges = new THREE.LineSegments(new THREE.EdgesGeometry(boundary.geometry), new THREE.LineBasicMaterial({ color: '#e8eefc', transparent: true, opacity: 0.25 }));
  boundaryEdges.rotation.copy(boundary.rotation);
  boundaryEdges.position.copy(boundary.position);
  scene.add(boundaryEdges);

  function figure(x, color) {
    const group = new THREE.Group();
    const wire = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.35 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 1.1, 6, 14), wire);
    body.position.y = -0.25;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 10), wire);
    head.position.y = 0.72;
    const field = new THREE.Mesh(new THREE.CapsuleGeometry(0.48, 1.5, 6, 18), new THREE.MeshBasicMaterial({ color: '#56f0a2', wireframe: true, transparent: true, opacity: 0.12 }));
    field.position.y = -0.1;
    const heart = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    heart.position.set(0, 0.05, 0);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.copy(heart.position);
    group.add(body, head, field, heart, halo);
    group.position.x = x;
    scene.add(group);
    return { group, heart, halo, prev: 0 };
  }
  const people = [figure(-1.1, '#3fd0c9'), figure(1.1, '#a78bfa')];

  const shared = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.BackSide, fog: false }));
  shared.scale.set(2.2, 1.35, 1.2);
  scene.add(shared);

  // coupling lines between the chests
  const LINES = 7;
  const SEG = 40;
  const coupling = Array.from({ length: LINES }, () => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array((SEG + 1) * 3), 3));
    const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.4 }));
    scene.add(line);
    return line;
  });

  // ripple rings, each a torus facing the other person
  const rings = [];
  const ringGeometry = new THREE.TorusGeometry(1, 0.012, 6, 48);
  function ripple(k) {
    const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: k ? '#a78bfa' : '#3fd0c9', transparent: true, opacity: 0.8, depthWrite: false }));
    ring.rotation.y = Math.PI / 2;
    ring.position.set(people[k].group.position.x, 0.05, 0);
    scene.add(ring);
    rings.push({ ring, age: 0, dir: k ? -1 : 1 });
  }

  let last = 0;
  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    // state: { a, b, r, coupling, dim, time, stereo }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      for (const [k, phase] of [state.a, state.b].entries()) {
        const p = people[k];
        const beat = 0.5 + 0.5 * Math.sin(phase);
        p.heart.scale.setScalar(0.8 + 0.6 * beat);
        p.halo.scale.setScalar(0.7 + 0.6 * beat);
        p.halo.material.opacity = 0.12 + 0.25 * beat;
        // a ripple on each beat (the phase passing the top of its cycle)
        const wrapped = ((phase % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        if (state.dim >= 8 && p.prev < Math.PI / 2 && wrapped >= Math.PI / 2) ripple(k);
        p.prev = wrapped;
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.age += dt;
        r.ring.position.x += r.dir * dt * 0.9;
        r.ring.scale.setScalar(0.15 + r.age * 0.35);
        r.ring.material.opacity = Math.max(0, 0.8 - r.age * 0.45);
        if (r.age > 1.8) {
          scene.remove(r.ring);
          r.ring.material.dispose();
          rings.splice(i, 1);
        }
      }
      const tangle = 1 - state.r;
      coupling.forEach((line, k) => {
        line.visible = state.dim >= 8;
        const pos = line.geometry.attributes.position;
        const y0 = 0.05 + (k - (LINES - 1) / 2) * 0.06;
        for (let i = 0; i <= SEG; i++) {
          const s = i / SEG;
          const x = -1.0 + 2.0 * s;
          const bulge = Math.sin(Math.PI * s);
          const wob = (0.04 + 0.25 * tangle) * Math.sin(9 * s - state.time * 3 + k) * bulge;
          pos.setXYZ(i, x, y0 + wob, (k - 3) * 0.05 * bulge + 0.15 * tangle * Math.cos(7 * s + state.time * 2 + k) * bulge);
        }
        pos.needsUpdate = true;
        line.material.opacity = (0.15 + 0.45 * state.coupling) * (0.4 + 0.6 * state.r);
        line.material.color.set(state.coupling > 0.5 ? '#3fd0c9' : '#5ee7ff');
      });
      shared.visible = state.dim >= 11;
      shared.material.opacity = 0.07 * state.r * state.r;
      const swing = Math.sin(state.time * 0.12) * 0.55;
      const radius = 5.6;
      camera.position.set(Math.sin(swing) * radius, 0.7, Math.cos(swing) * radius);
      camera.lookAt(0, -0.05, 0);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.1);
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
    projectWorld(x, y, z) {
      const v = new THREE.Vector3(x, y, z).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}

// ONE NEURON in 3D (ISS-052): the 2D stop's own cell (dendrites, axon, myelin, synapses) lifted
// into space, so the labels and the simulation stay the same. Spikes are glowing beads that jump
// from node to node (saltatory); at 11D each spike's field is a ring around the axon, and a
// neighbour cell sits behind (ephaptic coupling, small but measured; its role open).
// geometry: { soma: [x, y], dendrites: [[a, b, depth]], axonPts: [[x, y]], terminals: [[x, y]], ghost: [dx, dy] }
export function createNeuron3D(geometry) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#070b16');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#070b16', 5, 14);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 60);
  camera.focus = 5;
  const stereoCamera = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  scene.add(new THREE.HemisphereLight('#bcd8ff', '#0a0612', 0.9));
  const key = new THREE.PointLight('#ffffff', 1.2, 20);
  key.position.set(1, 2, 3);
  scene.add(key);

  const S = 4;   // 2D units to 3D
  const [sx, sy] = geometry.soma;
  const at = (x, y, z = 0) => new THREE.Vector3((x - 0.1) * S, -(y - sy) * S, z);
  const rand = (() => { let a = 7; return () => { a = (a * 16807) % 2147483647; return a / 2147483647; }; })();

  function cell(opacity) {
    const group = new THREE.Group();
    const membrane = new THREE.MeshStandardMaterial({ color: '#5a7fa8', roughness: 0.6, transparent: opacity < 1, opacity });
    const myelinMat = new THREE.MeshStandardMaterial({ color: '#dfe6f2', roughness: 0.4, transparent: opacity < 1, opacity });
    const somaMat = new THREE.MeshStandardMaterial({ color: '#2f4f74', emissive: '#ffd166', emissiveIntensity: 0, roughness: 0.5, transparent: opacity < 1, opacity });
    const soma = new THREE.Mesh(new THREE.SphereGeometry(0.065 * S, 24, 18), somaMat);
    soma.position.copy(at(sx, sy));
    group.add(soma);
    // dendrites: each branch a tapered tube, lifted a little out of the plane
    const zOf = new Map();
    for (const [a, b, depth] of geometry.dendrites) {
      const ka = a.join(','), kb = b.join(',');
      if (!zOf.has(ka)) zOf.set(ka, depth === 0 ? 0 : (rand() - 0.5) * 0.5);
      zOf.set(kb, zOf.get(ka) + (rand() - 0.5) * 0.35);
      const path = new THREE.LineCurve3(at(a[0], a[1], zOf.get(ka)), at(b[0], b[1], zOf.get(kb)));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(path, 4, (0.009 - depth * 0.0025) * S, 8), membrane));
    }
    // the axon along the 2D path, and the myelin sheaths between the nodes of Ranvier
    const axonCurve = new THREE.CatmullRomCurve3(geometry.axonPts.map(([x, y]) => at(x, y)));
    group.add(new THREE.Mesh(new THREE.TubeGeometry(axonCurve, 120, 0.007 * S, 10), membrane));
    const NODES = 8;
    for (let k = 0; k < NODES; k++) {
      const t0 = (k + 0.12) / NODES, t1 = (k + 0.88) / NODES;
      const seg = new THREE.CatmullRomCurve3(Array.from({ length: 8 }, (_, i) => axonCurve.getPointAt(t0 + (t1 - t0) * i / 7)));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(seg, 16, 0.02 * S, 14), myelinMat));
    }
    // synapses: the axon branches to its terminals, each a gold bouton
    const end = geometry.axonPts[geometry.axonPts.length - 1];
    for (const [x, y] of geometry.terminals) {
      const curve = new THREE.QuadraticBezierCurve3(at(end[0], end[1]), at(end[0] + 0.06, end[1]), at(x, y));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.005 * S, 6), membrane));
      const bouton = new THREE.Mesh(new THREE.SphereGeometry(0.018 * S, 14, 10), new THREE.MeshStandardMaterial({ color: '#ffd166', emissive: '#ffd166', emissiveIntensity: 0.3, transparent: opacity < 1, opacity }));
      bouton.position.copy(at(x, y));
      group.add(bouton);
    }
    scene.add(group);
    return { group, somaMat, axonCurve };
  }
  const main = cell(1);
  const [gx, gy] = geometry.ghost;
  const neighbour = cell(0.32);
  // the neighbour above and behind, clear of the voltage trace at the bottom of the screen
  neighbour.group.position.set(gx * S, gy * S * 1.1, -1.4);

  // spikes: a pool of glowing beads, and field rings at 11D
  const bead = new THREE.SphereGeometry(0.022 * S, 12, 8);
  const glowGeo = new THREE.SphereGeometry(0.06 * S, 12, 8);
  const ringGeo = new THREE.TorusGeometry(1, 0.01, 6, 40);
  const pool = Array.from({ length: 24 }, () => {
    const core = new THREE.Mesh(bead, new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    const halo = new THREE.Mesh(glowGeo, new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending }));
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(core, halo, ring);
    return { core, halo, ring };
  });

  const centre = at(0.12, sy);
  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    // state: { spikes: [0..1 along the axon], ghost: [0..1], flash, dim, time, stereo }
    render(state) {
      main.somaMat.emissiveIntensity = 0.9 * (state.flash ?? 0);
      neighbour.group.visible = state.dim >= 11;
      let used = 0;
      const show = (list, curve, offset, alpha) => {
        for (const s of list) {
          if (used >= pool.length) return;
          const b = pool[used++];
          const p = curve.getPointAt(Math.min(1, Math.max(0, s))).clone().add(offset);
          b.core.position.copy(p); b.halo.position.copy(p); b.ring.position.copy(p);
          b.core.visible = b.halo.visible = state.dim >= 8;
          b.halo.material.opacity = 0.45 * alpha;
          const tangent = curve.getTangentAt(Math.min(1, Math.max(0, s)));
          b.ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
          const pulse = (state.time * 1.6 + s * 7) % 1;
          b.ring.scale.setScalar(0.06 * S * (0.6 + 2.2 * pulse));
          b.ring.material.opacity = 0.45 * (1 - pulse) * alpha;
          b.ring.visible = state.dim >= 11;
        }
      };
      show(state.spikes ?? [], main.axonCurve, new THREE.Vector3(), 1);
      if (state.dim >= 11) show(state.ghost ?? [], neighbour.axonCurve, neighbour.group.position, 0.4);
      for (let i = used; i < pool.length; i++) pool[i].core.visible = pool[i].halo.visible = pool[i].ring.visible = false;
      const swing = Math.sin(state.time * 0.1) * 0.6;
      const radius = 7;
      camera.position.set(centre.x + Math.sin(swing) * radius, centre.y + 1.1, centre.z + Math.cos(swing) * radius);
      camera.lookAt(centre.x, centre.y + 0.25, centre.z);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.1);
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
    // a 2D stop point (its own coordinates) on the screen, for labels
    project(x, y, onNeighbour = false) {
      const v = (onNeighbour ? at(x, y).add(neighbour.group.position) : at(x, y)).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}

// THE LIMBIC HINGE in 3D (ISS-052): the 11 dimensions as an hourglass along one axis, the body
// field's seven rings (teal) narrowing to the single limbic ring D8 (red, its width set by the
// limbic field), opening into the mind field's three rings (violet). The 2D stop's signals run
// as beads: up from the body through the waist to the mind, calming signals back down the
// outside. A picture of the model's dimension count and of T = T0 + sigma Phi: interpretive.
export function createLimbic3D() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#070a16');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#070a16', 6, 18);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 60);
  camera.focus = 6;
  const stereoCamera = new THREE.StereoCamera();
  const size = new THREE.Vector2();

  // the axis: x from -3 (body) to 3 (mind); ring k at x = -3 + k * 0.6, k = 0..10
  const X = k => -3 + k * 0.6;
  const radius = (k, waist) => (k < 7 ? 0.35 + 0.12 * (6 - k) + waist : k === 7 ? waist : 0.35 + 0.18 * (k - 7) + waist);
  const rings = Array.from({ length: 11 }, (_, k) => {
    const color = k < 7 ? '#3fd0c9' : k === 7 ? '#ff4d5e' : '#a78bfa';
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1, k === 7 ? 0.035 : 0.018, 10, 64),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: k === 7 ? 0.95 : 0.6 }));
    ring.rotation.y = Math.PI / 2;
    ring.position.x = X(k);
    scene.add(ring);
    return ring;
  });
  // the hinge itself: the eighth dimension as a bright disc whose size is the limbic band
  const hinge = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  hinge.rotation.y = Math.PI / 2;
  hinge.position.x = X(7);
  scene.add(hinge);
  // the skin of the hourglass: faint lines joining the rings
  const SEG = 48;
  const skin = Array.from({ length: 16 }, () => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(11 * 3), 3));
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: '#e8eefc', transparent: true, opacity: 0.08 }));
    scene.add(line);
    return line;
  });
  const glowL = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending }));
  glowL.position.x = X(7);
  scene.add(glowL);
  const beadGeo = new THREE.SphereGeometry(0.045, 10, 8);
  const beads = Array.from({ length: 40 }, () => {
    const m = new THREE.Mesh(beadGeo, new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
    scene.add(m);
    return m;
  });

  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    // state: { phi, dim, time, stereo, signals: [{ s, kind: 'up1'|'up2'|'down', color, lane }] }
    render(state) {
      const waist = 0.12 + 0.28 * state.phi;   // the limbic band widens as the field rises
      rings.forEach((ring, k) => {
        ring.scale.setScalar(radius(k, waist));
        ring.visible = k < 7 || state.dim >= 8 || k === 7;
        if (k > 7) ring.visible = state.dim >= 11;
      });
      rings[7].material.color.set(state.phi > 0.5 ? '#ff4d5e' : '#ffd166');
      hinge.scale.setScalar(waist);
      hinge.material.color.set(state.phi > 0.5 ? '#ff4d5e' : '#ffd166');
      glowL.scale.setScalar(waist * 2.2);
      glowL.material.opacity = 0.05 + 0.15 * state.phi;
      skin.forEach((line, j) => {
        const a = (j / skin.length) * Math.PI * 2;
        const pos = line.geometry.attributes.position;
        for (let k = 0; k < 11; k++) {
          const r = radius(k, waist);
          pos.setXYZ(k, X(k), Math.sin(a) * r, Math.cos(a) * r);
        }
        pos.needsUpdate = true;
        line.visible = state.dim >= 11 || j % 2 === 0;
      });
      let used = 0;
      for (const sig of state.signals ?? []) {
        if (used >= beads.length || state.dim < 8) break;
        const b = beads[used++];
        const lane = sig.lane * Math.PI * 2;
        let x, r;
        if (sig.kind === 'down') {   // calming signals: mind back to the hinge, on the outside
          x = X(10) + (X(7) - X(10)) * sig.s;
          r = radius(Math.round((x + 3) / 0.6), waist) + 0.25;
        } else {
          const from = sig.kind === 'up1' ? 0 : 7;
          const to = sig.kind === 'up1' ? 7 : 10;
          x = X(from) + (X(to) - X(from)) * sig.s;
          r = 0.55 * radius(Math.max(0, Math.min(10, Math.round((x + 3) / 0.6))), waist);
        }
        b.position.set(x, Math.sin(lane) * r, Math.cos(lane) * r);
        b.material.color.set(sig.color);
        b.visible = true;
      }
      for (let i = used; i < beads.length; i++) beads[i].visible = false;
      const swing = Math.sin(state.time * 0.1) * 0.7;
      camera.position.set(Math.sin(swing) * 2.5, 1.4, 6.4 + Math.cos(swing) * 0.5);
      camera.lookAt(0, 0, 0);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.1);
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
    // ring k (0 = D1 .. 10 = D11) on the screen, for labels
    projectRing(k, above = 0) {
      const v = new THREE.Vector3(X(k), radius(k, 0.12) + 0.35 + above, 0).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}

// EMOTION AND THOUGHT in 3D (ISS-052): the 2D stop's bands as levels in space. The sub-threshold
// sea is a moving surface; a swell that rises through the gold threshold plane becomes an
// emotion (a glowing sphere at the limbic level), and a strong one rises on to a thought (a
// violet sphere at the cortex level); hot thoughts send pulses down to the body's heartbeat
// line. Everything comes from the stop's own simulation (explorer.js makeThought).
// levels: { body, sea, line, emotion, thought } (2D y, down positive); x0, x1: the 2D extent
export function createThought3D({ levels, x0, x1 }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#070a16');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#070a16', 6, 16);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 60);
  camera.focus = 6;
  const stereoCamera = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  scene.add(new THREE.HemisphereLight('#bcd8ff', '#0a0612', 0.9));

  const S = 3.6;
  const Z = 0.4;  // the sea's depth either side, in 2D units
  const H = y => (levels.sea - y) * S;          // a 2D level as a height
  const at = (x, y, z) => new THREE.Vector3(x * S, H(y), z * S);

  // the sea: a grid whose heights follow the stop's sea function
  const NX = 90, NZ = 36;
  const seaGeo = new THREE.PlaneGeometry((x1 - x0) * S, 2 * Z * S, NX, NZ);
  seaGeo.rotateX(-Math.PI / 2);
  const sea = new THREE.Mesh(seaGeo, new THREE.MeshStandardMaterial({ color: '#2f7fd6', emissive: '#0b3a6a', roughness: 0.4, metalness: 0.1, transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
  scene.add(sea);
  const seaWire = new THREE.Mesh(seaGeo, new THREE.MeshBasicMaterial({ color: '#5ee7ff', wireframe: true, transparent: true, opacity: 0.18 }));
  scene.add(seaWire);
  // the threshold plane
  const plane = new THREE.Mesh(new THREE.PlaneGeometry((x1 - x0) * S, 2 * Z * S), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = H(levels.line);
  scene.add(plane);
  const planeEdge = new THREE.LineSegments(new THREE.EdgesGeometry(plane.geometry), new THREE.LineBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.7 }));
  planeEdge.rotation.copy(plane.rotation);
  planeEdge.position.copy(plane.position);
  scene.add(planeEdge);
  // the cortex level: a faint violet frame
  const cortex = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry((x1 - x0) * S, 2 * Z * S)), new THREE.LineBasicMaterial({ color: '#a78bfa', transparent: true, opacity: 0.4 }));
  cortex.rotation.x = -Math.PI / 2;
  cortex.position.y = H(levels.thought);
  scene.add(cortex);
  // the body: a heartbeat line below the sea
  const BODY_N = 200;
  const bodyGeo = new THREE.BufferGeometry();
  bodyGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((BODY_N + 1) * 3), 3));
  const bodyLine = new THREE.Line(bodyGeo, new THREE.LineBasicMaterial({ color: '#ff4d5e' }));
  scene.add(bodyLine);

  const sphere = new THREE.SphereGeometry(1, 16, 12);
  const pool = Array.from({ length: 48 }, () => {
    const core = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    const halo = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(core, halo);
    return { core, halo };
  });

  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    // state: { height(x, z) (2D units, up positive), beatAt(x) (2D offset), items: [{ x, y, z, color, r, fade }], dim, time, stereo }
    render(state) {
      const pos = seaGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i) / S, z = pos.getZ(i) / S;
        pos.setY(i, state.height(x, z) * S);
      }
      pos.needsUpdate = true;
      seaGeo.computeVertexNormals();
      plane.visible = planeEdge.visible = state.dim >= 8;
      cortex.visible = state.dim >= 11;
      const bp = bodyGeo.attributes.position;
      for (let i = 0; i <= BODY_N; i++) {
        const x = x0 + (x1 - x0) * i / BODY_N;
        bp.setXYZ(i, x * S, H(levels.body) + state.beatAt(x) * S, Z * S * 1.15);
      }
      bp.needsUpdate = true;
      let used = 0;
      for (const it of state.items) {
        if (used >= pool.length) break;
        const b = pool[used++];
        const p = at(it.x, it.y, it.z);
        b.core.position.copy(p); b.halo.position.copy(p);
        b.core.scale.setScalar(it.r * S * 0.35);
        b.halo.scale.setScalar(it.r * S);
        b.halo.material.color.set(it.color);
        b.halo.material.opacity = 0.4 * it.fade;
        b.core.material.opacity = it.fade;
        b.core.material.transparent = it.fade < 1;
        b.core.visible = b.halo.visible = true;
      }
      for (let i = used; i < pool.length; i++) pool[i].core.visible = pool[i].halo.visible = false;
      const swing = Math.sin(state.time * 0.09) * 0.5;
      camera.position.set(Math.sin(swing) * 8.6, H(levels.line) + 0.9, Math.cos(swing) * 8.6);
      camera.lookAt(0, H(levels.line) + 0.35, 0);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.1);
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
    project(x, y, z = 0) {
      const v = at(x, y, z).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}

// THE BODY in 3D (ISS-052): the body inside the jellyfish human, a translucent figure on the 2D
// stop's own layout. The feeling map's regions (after Nummenmaa et al. 2014, or the artistic
// placements) glow inside it in the stop's colours; the nerves are fine tubes carrying the
// stop's signals; the heart beats; at 11D the field's shells surround it.
// layout: { nerves: { name: [[x, y]] }, regions: { name: [[x, y, r]] } } (2D, y down)
export function createBody3D(layout) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  renderer.setClearColor('#05101a');
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#05101a', 6, 16);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 60);
  camera.focus = 6;
  const stereoCamera = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  scene.add(new THREE.HemisphereLight('#bff6e8', '#06121c', 0.9));

  const S = 3.2;
  const at = (x, y, z = 0) => new THREE.Vector3(x * S, -y * S, z * S);
  const skin = new THREE.MeshStandardMaterial({ color: '#3fd0c9', transparent: true, opacity: 0.16, roughness: 0.3, depthWrite: false, side: THREE.DoubleSide });
  const edge = new THREE.MeshBasicMaterial({ color: '#3fd0c9', wireframe: true, transparent: true, opacity: 0.14 });
  const body = new THREE.Group();
  const part = (geo, p) => { for (const m of [skin, edge]) { const mesh = new THREE.Mesh(geo, m); mesh.position.copy(p); body.add(mesh); } };
  part(new THREE.SphereGeometry(0.115 * S, 28, 20), at(0, -0.8));
  part(new THREE.CylinderGeometry(0.045 * S, 0.05 * S, 0.12 * S, 16), at(0, -0.66));
  const torso = new THREE.CapsuleGeometry(0.15 * S, 0.42 * S, 8, 24);
  torso.scale(1, 1, 0.62);
  part(torso, at(0, -0.33));
  const limb = (pts, r) => {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, y]) => at(x, y)));
    for (const m of [skin, edge]) body.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, r * S, 14), m));
  };
  limb(layout.nerves.armL.slice(1), 0.045); limb(layout.nerves.armR.slice(1), 0.045);
  limb(layout.nerves.legL.slice(1), 0.06); limb(layout.nerves.legR.slice(1), 0.06);
  scene.add(body);
  // nerves
  const nerveMat = new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.45 });
  const curves = {};
  for (const [name, pts] of Object.entries(layout.nerves)) {
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, y]) => at(x, y, name.startsWith('vagus') ? 0.03 : 0)));
    curves[name] = curve;
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.0045 * S, 6), nerveMat);
    tube.userData.nerve = true;
    scene.add(tube);
  }
  // the feeling regions, as glows inside the body
  const glows = [];
  for (const [region, spots] of Object.entries(layout.regions)) {
    for (const [x, y, r] of spots) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      m.position.copy(at(x, y));
      m.scale.setScalar(r * S * 0.9);
      scene.add(m);
      glows.push({ region, m });
    }
  }
  const heart = new THREE.Mesh(new THREE.SphereGeometry(0.035 * S, 18, 12), new THREE.MeshBasicMaterial({ color: '#ff3c50', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  heart.position.copy(at(0.06, -0.45, 0.02));
  scene.add(heart);
  // the field (11D): shells around the whole body
  const shells = Array.from({ length: 4 }, (_, k) => {
    const g = new THREE.SphereGeometry(1, 40, 28);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: '#a78bfa', wireframe: true, transparent: true, opacity: 0.06 - k * 0.01, depthWrite: false }));
    m.scale.set((0.55 + k * 0.08) * S, (1.0 + k * 0.06) * S, (0.4 + k * 0.06) * S);
    m.position.copy(at(0, -0.02));
    scene.add(m);
    return m;
  });
  const beadGeo = new THREE.SphereGeometry(0.012 * S, 10, 8);
  const beads = Array.from({ length: 60 }, () => {
    const m = new THREE.Mesh(beadGeo, new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending }));
    scene.add(m);
    return m;
  });
  const centre = at(0, -0.05);

  return {
    canvas,
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    // state: { feel: { region: -1..1 }, phi, beat (0..1), signals: [{ nerve, s, color }], dim, time, stereo }
    render(state) {
      const intensity = 0.55 + 0.45 * state.phi;
      for (const { region, m } of glows) {
        const v = state.feel[region] ?? 0;
        m.material.color.set(v >= 0 ? new THREE.Color().setRGB(1, (225 - 155 * v) / 255, (90 - 40 * v) / 255) : new THREE.Color('#5a96ff'));
        m.material.opacity = Math.min(1, Math.abs(v) * intensity) * 0.55;
      }
      heart.scale.setScalar(1 + 0.6 * state.beat);
      for (const shell of shells) shell.visible = state.dim >= 11;
      shells.forEach((sh, k) => { sh.rotation.y = state.time * (0.05 + 0.02 * k); });
      scene.traverse(o => { if (o.userData.nerve) o.visible = state.dim >= 8; });
      let used = 0;
      for (const sig of state.signals ?? []) {
        if (used >= beads.length || state.dim < 8) break;
        const curve = curves[sig.nerve];
        if (!curve) continue;
        const b = beads[used++];
        b.position.copy(curve.getPointAt(Math.min(1, Math.max(0, sig.s))));
        b.material.color.set(sig.color);
        b.visible = true;
      }
      for (let i = used; i < beads.length; i++) beads[i].visible = false;
      const swing = Math.sin(state.time * 0.12) * 0.7;
      camera.position.set(centre.x + Math.sin(swing) * 11, centre.y + 0.8, Math.cos(swing) * 11);
      camera.lookAt(centre.x, centre.y + 0.45, 0);
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereoCamera, camera, 0.1);
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
    project(x, y, z = 0) {
      const v = at(x, y, z).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 && Math.abs(v.x) < 1.1 };
    },
  };
}
