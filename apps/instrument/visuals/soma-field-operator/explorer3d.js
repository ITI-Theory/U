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

