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

import * as THREE from 'three';

const SIZE = 2.9;
const N = 110;
const TRAIL = 160;

// energy(px, py, beta, J) and the well positions come from explorer.js, so the terrain
// is exactly what the simulation rolls on.
// city: [{ title, lines: [...], status }] (main.js: the concept registry and level equations)
export function createLandscape3D({ energy, wells, city = [] }) {
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

  return {
    canvas,
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
      }
      // swing over the mountains on the near side, the city on the horizon behind them
      const swing = Math.PI / 2 + 0.75 * Math.sin(state.theta * 0.9);
      const r = 4.6;
      camera.position.set(Math.cos(swing) * r, 1.45 + 0.2 * Math.sin(state.theta * 1.7), Math.sin(swing) * r);
      camera.lookAt(0, 0.3, -2.4);
      country.mesh.visible = state.dim >= 8;
      if (country.mesh.visible) country.update(state.phi, state.time);
      cityGroup.visible = state.dim >= 11;
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
        stereoCamera.update(camera);
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
    update(phi, time) {
      const amp = 0.06 + 0.22 * phi;
      for (let i = 0; i < wire.count; i++) {
        const x = wire.getX(i);
        const z = wire.getZ(i);
        const inside = Math.abs(x) < 1.5 && Math.abs(z) < 1.5;
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

function makeCity(items) {
  const group = new THREE.Group();
  if (!items.length) return group;
  const box = new THREE.BoxGeometry(1, 1, 1);
  const edges = new THREE.EdgesGeometry(box);
  items.forEach((item, i) => {
    const side = i % 2 ? 1 : -1;
    const row = Math.floor(i / 2);
    const x = side * (1.0 + (row % 3) * 0.9 + ((i * 13) % 5) * 0.05);
    const z = -3.6 - row * 0.62;
    const height = HEIGHT[item.status] ?? 1.4 + ((i * 7) % 10) / 10;
    const hue = item.status === 'kernel-verified' ? 150 : item.status === 'sorry' || item.status === 'axiom' ? 320 : 190;
    const texture = towerTexture(item, hue);
    const tower = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    tower.scale.set(0.55, height, 0.55);
    tower.position.set(x, height / 2 - 0.1, z);
    group.add(tower);
    const outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: new THREE.Color(`hsl(${hue}, 90%, 65%)`), transparent: true, opacity: 0.7 }));
    outline.scale.copy(tower.scale);
    outline.position.copy(tower.position);
    group.add(outline);
  });
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
        stereoCamera.update(camera);
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

