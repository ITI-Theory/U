// explorer3d.js: the landscape of states in 3D for the mind-body explorer (ISS-052).
// A terrain mesh of the same energy the 2D drawing and the checked simulation use
// (explorer.js energy), the state as a glowing ball with its trail, and the camera
// circling slowly over the valleys. The explorer's 2D canvas draws the labels on top.

import * as THREE from 'three';

const SIZE = 2.9;
const N = 110;
const TRAIL = 160;

// energy(px, py, beta, J) and the well positions come from explorer.js, so the terrain
// is exactly what the simulation rolls on.
export function createLandscape3D({ energy, wells }) {
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
  scene.fog = new THREE.Fog('#0b1226', 4.5, 9);
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
      const r = 3.9;
      camera.position.set(Math.cos(state.theta) * r, 2.3 + 0.2 * Math.sin(state.theta * 1.7), Math.sin(state.theta) * r);
      camera.lookAt(0, -0.25, 0);
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
    // screen position (pixels from the centre) of a state-space point, for labels
    project(px, py, lift = 0) {
      const v = toWorld(px, py, lift).project(camera);
      return { x: v.x / 2, y: -v.y / 2, visible: v.z < 1 };
    },
  };
}
