// tunnel3d.js: the PATH stop of the mind-body explorer (ISS-052). Boundaries are paths
// (author, 10 Oct): a thought, the ball, races along a tunnel through the brain, and the
// boundaries are gates on that path. A gate is a barrier: it opens when the limbic field
// Phi is above its height (FM-HN: heat softens barriers; the RESOURCE lowers them a
// little, J(t)); a closed gate stops the thought, and POKE tries to tunnel through with
// probability exp(-3 * gap), after LimbicTunnel.lean (wkbAmplitude_pos: never zero).
// The walls are the fractal of the level: branching dendrites (organismal), Menger blocks
// (network, systemic: the city of code's cubic towers), stars (cosmic); at 11D a
// Mandelbulb, the mind, floats at the centre of the loop. Mono or stereo (SBS).

import * as THREE from 'three';

function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

const GATES = 9;

// Mandelbulb (power 8) as a point cloud: grid points whose escape time is near the
// boundary, coloured by depth; computed once.
function mandelbulb(n = 64, power = 8) {
  const pos = [];
  const col = [];
  const c = new THREE.Color();
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
    const cx = -1.2 + (2.4 * i) / n;
    const cy = -1.2 + (2.4 * j) / n;
    const cz = -1.2 + (2.4 * k) / n;
    let x = cx, y = cy, z = cz;
    let it = 0;
    for (; it < 10; it++) {
      const r = Math.hypot(x, y, z);
      if (r > 2) break;
      const th = Math.acos(z / (r || 1e-9)) * power;
      const ph = Math.atan2(y, x) * power;
      const rp = r ** power;
      x = rp * Math.sin(th) * Math.cos(ph) + cx;
      y = rp * Math.sin(th) * Math.sin(ph) + cy;
      z = rp * Math.cos(th) + cz;
    }
    if (it >= 5 && it < 10) {
      pos.push(cx, cy, cz);
      c.setHSL(0.83 + 0.05 * (it - 5), 0.85, 0.45 + 0.06 * (it - 5));
      col.push(c.r, c.g, c.b);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
}

// Menger sponge, level 1: the 20 cubes left after removing the centre and face centres
const MENGER = [];
for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
  if ((x === 0) + (y === 0) + (z === 0) < 2) MENGER.push([x, y, z]);
}

// URETER mode (a ureteroscope's view, for the urology Presentation): pink smooth-muscle
// walls with peristaltic rings, urine flowing as particles, and one stone. The stone is a
// mechanical obstruction, not a field barrier: Phi does not open it (unlike PATH's gates);
// flow dams behind it and a colic reading rises. POKE is the laser: each shot breaks
// pieces off and sprays dust; after three it is dust, flow returns, the colic eases. A new
// stone forms after a while so the demonstration can repeat. Plain physiology plus a
// picture; no clinical claim.
function stoneGeometry(rand) {
  const g = new THREE.IcosahedronGeometry(0.55, 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i));
    v.multiplyScalar(0.75 + 0.45 * rand() * rand());
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

export function createTunnel3D({ ureter = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch {
    return null;
  }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(ureter ? '#1a0508' : '#060818');
  scene.fog = new THREE.Fog(ureter ? '#1a0508' : '#060818', ureter ? 1 : 3, ureter ? 7 : 22);
  const camera = new THREE.PerspectiveCamera(70, 1, 0.02, 80);
  camera.focus = 2.2;
  const stereoCamera = new THREE.StereoCamera();
  stereoCamera.eyeSep = 0.05;
  const size = new THREE.Vector2();
  const rand = seeded(23);

  // the path: a closed, wandering loop around the centre (where the mind sits)
  const control = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const r = 9 + 2.5 * Math.sin(3 * a) + rand() * 1.5;
    return new THREE.Vector3(Math.cos(a) * r, 2.2 * Math.sin(2 * a + 1) + (rand() - 0.5), Math.sin(a) * r);
  });
  const curve = new THREE.CatmullRomCurve3(control, true, 'catmullrom', 0.5);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 360, 1.15, 14, true), new THREE.MeshBasicMaterial({ color: '#5ee7ff', wireframe: true, transparent: true, opacity: 0.16, depthWrite: false }));
  scene.add(tube);
  if (ureter) {
    tube.material = new THREE.MeshStandardMaterial({ color: '#8a2a3a', roughness: 0.35, metalness: 0.0, side: THREE.BackSide, emissive: '#3a0a12' });
    // mucosa: fine vessels on the wall
    const vessels = new THREE.Mesh(new THREE.TubeGeometry(curve, 360, 1.12, 10, true), new THREE.MeshBasicMaterial({ color: '#ff8a9a', wireframe: true, transparent: true, opacity: 0.18, depthWrite: false }));
    scene.add(vessels);
    scene.add(new THREE.PointLight('#fff0e0', 2.2, 6, 1.6));
    scene.add(new THREE.AmbientLight('#ff9aa8', 0.15));
  }

  // gates: the boundaries on the path (none in URETER mode: the stone is the obstruction)
  const gates = Array.from({ length: ureter ? 0 : GATES }, (_, k) => {
    const u = (k + 0.5) / GATES;
    const p = curve.getPointAt(u);
    const tangent = curve.getTangentAt(u);
    const height = 0.25 + 0.65 * rand();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.05, 8, 40), new THREE.MeshBasicMaterial({ color: '#ffd166' }));
    const iris = new THREE.Mesh(new THREE.CircleGeometry(1.05, 40), new THREE.MeshBasicMaterial({ color: '#ff4d5e', transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }));
    for (const m of [ring, iris]) {
      m.position.copy(p);
      m.lookAt(p.clone().add(tangent));
      scene.add(m);
    }
    return { u, height, ring, iris, open: 0 };
  });

  // the thought
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 14), new THREE.MeshBasicMaterial({ color: '#fff4c2' }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffd166', transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending }));
  ball.add(halo);
  scene.add(ball);

  // the mind at the centre
  const bulb = ureter ? new THREE.Group() : mandelbulb();
  bulb.scale.setScalar(2.4);
  scene.add(bulb);

  // URETER: the scope's light, peristaltic rings, urine flow, the stone
  const light = ureter ? scene.children.find(o => o.isPointLight) : null;
  const STONE_U = 0.5;
  const rings = ureter ? Array.from({ length: 6 }, (_, k) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.12, 8, 32), new THREE.MeshStandardMaterial({ color: '#e07a8c', roughness: 0.6 }));
    scene.add(ring);
    return { ring, u: k / 6 };
  }) : [];
  const FLOW = ureter ? 500 : 0;
  const flowU = Float32Array.from({ length: FLOW }, () => Math.random());
  const flowOff = Array.from({ length: FLOW }, () => new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4, (Math.random() - 0.5) * 1.4));
  const flowPos = new Float32Array(FLOW * 3);
  const flowGeo = new THREE.BufferGeometry();
  flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
  const flow = new THREE.Points(flowGeo, new THREE.PointsMaterial({ color: '#fff3b0', size: 0.025, transparent: true, opacity: 0.45, depthWrite: false }));
  if (ureter) scene.add(flow);
  const stone = { mesh: null, size: 0, pieces: [], dust: [], clearedAt: -1 };
  function newStone() {
    if (stone.mesh) scene.remove(stone.mesh);
    stone.mesh = new THREE.Mesh(stoneGeometry(rand), new THREE.MeshStandardMaterial({ color: '#e0b860', roughness: 0.7, metalness: 0.1, flatShading: true, emissive: '#3a2a08' }));
    stone.mesh.position.copy(curve.getPointAt(STONE_U));
    stone.size = 3;
    stone.mesh.scale.setScalar(1);
    scene.add(stone.mesh);
  }
  if (ureter) newStone();
  let colic = 0;
  let stoneAhead = false;

  let walls = null;
  let world = '';
  function buildWalls(next) {
    world = next;
    if (walls) scene.remove(walls);
    walls = new THREE.Group();
    const r = seeded(world.length * 31 + 7);
    if (world === 'network' || world === 'systemic' || world === 'collective') {
      // Menger blocks stacked into towers beside the tunnel: the city of code's cubes
      const box = new THREE.BoxGeometry(1, 1, 1);
      const count = 46 * MENGER.length;
      const mesh = new THREE.InstancedMesh(box, new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }), count);
      const edges = [];
      const m = new THREE.Matrix4();
      let n = 0;
      for (let k = 0; k < 46; k++) {
        const u = k / 46;
        const p = curve.getPointAt(u);
        const side = new THREE.Vector3().crossVectors(curve.getTangentAt(u), new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar((k % 2 ? 1 : -1) * (2.2 + r() * 1.5));
        const s = 0.25 + r() * 0.2;
        const floors = 1 + Math.floor(r() * 3);
        for (let f = 0; f < floors && n < count; f++) {
          const base = p.clone().add(side).add(new THREE.Vector3(0, -1 + f * 3 * s, 0));
          for (const [x, y, z] of MENGER) {
            if (n >= count) break;
            m.makeScale(s * 0.92, s * 0.92, s * 0.92).setPosition(base.x + x * s, base.y + y * s, base.z + z * s);
            mesh.setMatrixAt(n++, m);
          }
          const h = 1.5 * s;
          const b = base;
          for (const [a1, a2] of [[[-1, -1], [1, -1]], [[1, -1], [1, 1]], [[1, 1], [-1, 1]], [[-1, 1], [-1, -1]]]) {
            for (const yy of [-h, h]) edges.push(b.x + a1[0] * h, b.y + yy, b.z + a1[1] * h, b.x + a2[0] * h, b.y + yy, b.z + a2[1] * h);
            edges.push(b.x + a1[0] * h, b.y - h, b.z + a1[1] * h, b.x + a1[0] * h, b.y + h, b.z + a1[1] * h);
          }
        }
      }
      mesh.count = n;
      walls.add(mesh);
      const eg = new THREE.BufferGeometry();
      eg.setAttribute('position', new THREE.Float32BufferAttribute(edges, 3));
      walls.add(new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: '#b46cff', transparent: true, opacity: 0.6 })));
    } else if (world === 'cosmological') {
      const pos = [];
      for (let i = 0; i < 4000; i++) pos.push((r() - 0.5) * 50, (r() - 0.5) * 30, (r() - 0.5) * 50);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      walls.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.08, color: '#cfe8ff', transparent: true, opacity: 0.8, depthWrite: false })));
    } else {
      // branching dendrites growing out of the tunnel wall
      const seg = [];
      const grow = (p, d, len, depth) => {
        const q = p.clone().addScaledVector(d, len);
        seg.push(p.x, p.y, p.z, q.x, q.y, q.z);
        if (!depth) return;
        for (let i = 0; i < 2; i++) {
          const nd = d.clone().add(new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).multiplyScalar(1.1)).normalize();
          grow(q, nd, len * 0.68, depth - 1);
        }
      };
      for (let k = 0; k < 70; k++) {
        const u = r();
        const p = curve.getPointAt(u);
        const out = new THREE.Vector3(r() - 0.5, r() - 0.5, r() - 0.5).normalize();
        grow(p.clone().addScaledVector(out, 1.2), out, 1.0 + r(), 4);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
      walls.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: '#ff7aa8', transparent: true, opacity: 0.45 })));
    }
    scene.add(walls);
  }

  let u = ureter ? 0.44 : 0.02;
  let speed = 0;
  let last = 0;
  let blockedAt = -1;
  let event = { text: '', until: 0 };
  let pokeWanted = 0;

  return {
    canvas,
    get event() { return event; },
    get blocked() { return blockedAt >= 0; },
    get colic() { return colic; },
    get stoneAhead() { return stoneAhead; },
    resize(w, h, dpr) {
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
    },
    poke(strength = 1) { pokeWanted = strength; },
    // state: { world, phi, resource, dim, time, stereo }
    render(state) {
      if (!ureter && state.world !== world) buildWalls(state.world);
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      if (ureter) {
        const there = stone.size > 0;
        const d = (STONE_U - u + 1) % 1;
        const blocked = there && d < 0.03;
        if (pokeWanted && there && d < 0.12) {
          // the laser: a flash, pieces off, dust
          stone.size -= 1;
          light.intensity = 14;
          for (let k = 0; k < 40; k++) {
            const m = new THREE.Mesh(new THREE.TetrahedronGeometry(0.012 + 0.02 * Math.random()), new THREE.MeshStandardMaterial({ color: '#d9b878', flatShading: true }));
            m.position.copy(stone.mesh.position);
            stone.dust.push({ m, v: new THREE.Vector3((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8), age: 0 });
            scene.add(m);
          }
          if (stone.size > 0) {
            stone.mesh.scale.setScalar(0.45 + 0.55 * (stone.size / 3));
            event = { text: `LASER: the stone breaks (${stone.size} of 3 left)`, until: state.time + 3 };
          } else {
            scene.remove(stone.mesh);
            stone.clearedAt = state.time;
            event = { text: 'LASER: dust. The path is clear, the flow returns', until: state.time + 4 };
          }
        }
        pokeWanted = 0;
        light.intensity += (3 - light.intensity) * Math.min(1, dt * 4);
        if (!there && stone.clearedAt >= 0 && state.time - stone.clearedAt > 25 && d > 0.3) newStone();
        // colic: rises while the flow is dammed, eases when it is clear
        colic = Math.max(0, Math.min(1, colic + (there ? 0.06 : -0.12) * dt));
        tube.material.emissive.setRGB(0.23 + 0.5 * colic * (0.6 + 0.4 * Math.sin(state.time * 5)), 0.04, 0.07);
        if (stone.mesh && there) stone.mesh.rotation.y += dt * 0.2;
        for (const r of rings) {
          r.u = (r.u + dt * 0.04) % 1;
          const pp = curve.getPointAt(r.u);
          r.ring.position.copy(pp);
          r.ring.lookAt(pp.clone().add(curve.getTangentAt(r.u)));
          const squeeze = 0.75 + 0.25 * Math.sin(r.u * 40 + state.time * 2);
          r.ring.scale.set(squeeze, squeeze, 1);
        }
        for (let i = 0; i < FLOW; i++) {
          const before = false;
          flowU[i] = (flowU[i] + (before ? 0.0004 : 0.05 + 0.04 * Math.random()) * dt) % 1;
          // dammed urine collects upstream of the stone (behind it, as the scope sees it)
          if (there && ((flowU[i] - STONE_U + 1) % 1) < 0.002) flowU[i] = (STONE_U + 0.004) % 1;
          const pp = curve.getPointAt(flowU[i]).add(flowOff[i]);
          flowPos[i * 3] = pp.x;
          flowPos[i * 3 + 1] = pp.y;
          flowPos[i * 3 + 2] = pp.z;
        }
        flowGeo.attributes.position.needsUpdate = true;
        for (let i = stone.dust.length - 1; i >= 0; i--) {
          const s = stone.dust[i];
          s.age += dt;
          s.m.position.addScaledVector(s.v, dt);
          s.v.multiplyScalar(0.96);
          s.m.rotation.x += dt * 3;
          if (s.age > 6) {
            scene.remove(s.m);
            stone.dust.splice(i, 1);
          }
        }
        stoneAhead = there && d < 0.12;
        if (blocked) {
          speed = 0;
          blockedAt = 0;
        } else {
          blockedAt = -1;
          speed += ((0.012 + 0.01 * state.phi) - speed) * Math.min(1, dt * 1.5);
          u = (u + speed * dt) % 1;
        }
        state.colic = colic;
      } else {
      const lowered = state.resource ? 0.15 : 0;
      // gates open when Phi is above their height
      for (const g of gates) {
        const target = state.phi >= g.height - lowered ? 1 : 0;
        g.open += (target - g.open) * Math.min(1, dt * 2.5);
        g.iris.scale.setScalar(Math.max(0.001, 1 - g.open));
        g.iris.material.opacity = 0.35 * (1 - g.open);
        g.ring.material.color.set(g.open > 0.5 ? '#3fd0c9' : '#ffd166');
      }
      // the next gate ahead
      const ahead = gates.map(g => ({ g, d: (g.u - u + 1) % 1 })).sort((a, b) => a.d - b.d)[0];
      const closed = ahead.g.open < 0.5 && ahead.d < 0.022;
      if (closed) {
        speed = 0;
        blockedAt = gates.indexOf(ahead.g);
        if (pokeWanted) {
          const gap = Math.max(0, ahead.g.height - lowered - state.phi);
          const p = Math.exp(-3 * gap);
          if (Math.random() < p) {
            u = (ahead.g.u + 0.012) % 1;
            event = { text: `TUNNELLED through the boundary (chance ${(p * 100).toFixed(0)}%)`, until: state.time + 3 };
          } else {
            event = { text: `BOUNCED back: the barrier held (chance was ${(p * 100).toFixed(0)}%)`, until: state.time + 3 };
            u = (u - 0.006 + 1) % 1;
          }
        }
      } else {
        blockedAt = -1;
        speed += ((0.012 + 0.03 * state.phi) - speed) * Math.min(1, dt * 1.5);
        u = (u + speed * dt) % 1;
      }
      pokeWanted = 0;
      }
      const p = curve.getPointAt(u);
      ball.position.copy(p);
      ball.visible = !ureter;
      halo.scale.setScalar(1 + 0.25 * Math.sin(state.time * 6));
      const behind = curve.getPointAt((u - 0.03 + 1) % 1);
      camera.position.copy(behind).add(new THREE.Vector3(0, ureter ? 0 : 0.45, 0));
      if (light) light.position.copy(camera.position);
      camera.lookAt(curve.getPointAt((u + 0.01) % 1));
      bulb.visible = state.dim >= 11;
      bulb.rotation.y = state.time * 0.05;
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
  };
}
