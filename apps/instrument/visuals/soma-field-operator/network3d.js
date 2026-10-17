// network3d.js: MEMORY in 3D (ISS-052, (4): "neuron and network"). The memory stop's Hopfield network,
// the same simulation as the 2D grid (explorer.js makeNetwork): its 49 cells on a curved sheet, lit by
// their state (dark blue -1 to gold +1), a flash where a cell flips; the links between cells that the
// three stored memories make (Hebb's rule, W = sum of the patterns' outer products), drawn faintly
// where they are strong; and the three memories above as orbs, SAFE, FIGHT and FREEZE, each as bright
// as the state's overlap with it, a thread from the sheet to each as thick. The 2D grid stays the map
// and the print mode. Simulated (the network is the model's, its numbers computed).

import * as THREE from 'three';
import { updateStereo } from './stereo-depth.js';

const SIDE = 7;

export function createNetwork3D({ patterns, names, colors }) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05070f');
  scene.fog = new THREE.Fog('#05070f', 9, 22);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 60);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  scene.add(new THREE.AmbientLight('#6070a0', 1.0));
  const key = new THREE.PointLight('#ffffff', 1.6, 30);
  key.position.set(3, 6, 6);
  scene.add(key);

  // the cells on a curved sheet
  const pos = [];
  for (let i = 0; i < SIDE * SIDE; i++) {
    const cx = (i % SIDE) - (SIDE - 1) / 2, cy = Math.floor(i / SIDE) - (SIDE - 1) / 2;
    const a = cx * 0.16;
    pos.push(new THREE.Vector3(Math.sin(a) * 4.2, -cy * 0.62, Math.cos(a) * 4.2 - 4.2));
  }
  const cells = pos.map(p => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 14), new THREE.MeshStandardMaterial({ color: '#1d3557', emissive: '#000000', roughness: 0.4 }));
    m.position.copy(p);
    scene.add(m);
    return m;
  });
  // the links Hebb's rule makes, where strong (|W| = the number of memories that agree)
  const W = (i, j) => patterns.reduce((s, p) => s + p[i] * p[j], 0);
  const lp = [], lc = [];
  for (let i = 0; i < pos.length; i++) {
    for (let j = i + 1; j < pos.length; j++) {
      const w = W(i, j);
      if (Math.abs(w) < patterns.length || pos[i].distanceTo(pos[j]) > 1.9) continue;
      lp.push(pos[i].x, pos[i].y, pos[i].z, pos[j].x, pos[j].y, pos[j].z);
      const c = new THREE.Color(w > 0 ? '#5ee7ff' : '#ff4d5e');
      lc.push(c.r, c.g, c.b, c.r, c.g, c.b);
    }
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
  lg.setAttribute('color', new THREE.Float32BufferAttribute(lc, 3));
  scene.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.18, depthWrite: false })));
  // the memories above, and the threads to them
  const centre = new THREE.Vector3(0, 0, -0.2);
  const orbs = names.map((name, k) => {
    const at = new THREE.Vector3((k - 1) * 2.4, 3.1, -1.4);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 20), new THREE.MeshStandardMaterial({ color: colors[name], emissive: colors[name], emissiveIntensity: 0.3, transparent: true, opacity: 0.9 }));
    m.position.copy(at);
    scene.add(m);
    const curve = new THREE.QuadraticBezierCurve3(centre, new THREE.Vector3(at.x * 0.4, 2.2, 0), at);
    const thread = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.04, 8, false), new THREE.MeshBasicMaterial({ color: colors[name], transparent: true, opacity: 0.5, depthWrite: false }));
    scene.add(thread);
    return { m, thread };
  });
  let orbit = 0, last = 0;
  const lo = new THREE.Color('#1d3557'), hi = new THREE.Color('#ffd166'), tmp = new THREE.Color();
  return {
    canvas,
    network: true,
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, x (49 states), flips (49, 0..1), weights (3), dim, stereo, phi }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      orbit += dt * 0.08;
      camera.position.set(Math.sin(orbit) * 3.2, 1.4 + 0.3 * Math.sin(state.time * 0.1), 9.8 + Math.cos(orbit) * 1.2);
      camera.lookAt(0, 0.5, -1.4);
      for (let i = 0; i < cells.length; i++) {
        const f = Math.max(0, Math.min(1, (state.x[i] + 1) / 2));
        cells[i].material.color.copy(tmp.copy(lo).lerp(hi, f));
        const flash = state.flips[i] ?? 0;
        cells[i].material.emissive.copy(tmp.copy(hi).multiplyScalar(0.25 * f + 0.9 * flash));
        cells[i].scale.setScalar(1 + 0.6 * flash);
      }
      orbs.forEach((o, k) => {
        const w = state.weights[k] ?? 0;
        o.m.material.emissiveIntensity = 0.15 + 1.4 * w;
        o.m.scale.setScalar(0.7 + 0.6 * w);
        o.thread.material.opacity = 0.08 + 0.7 * w;
        o.thread.visible = (state.dim ?? 11) >= 8;
      });
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereo, camera, 0.1);
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
