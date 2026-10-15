// atrium3d.js: the atriums (ISS-103), the hubs every elevator exit opens into, with routes going
// off them as a game's hub world has. The first was the brain's great hall; its style is the
// standard for all (author, 14 Oct): a vaulted place seen from inside, dark stone raised by
// fractal noise with thin neon veins (pink above, blue below), the field's glow rising with Φ
// and the walls folding when it is high (the 11D manifold, not a building), light falling from
// above through the medium, the place's own anatomy hanging and crossing in it, a few drifters,
// fine motes; glowing doorways named with a line under each, a click gliding through; the
// elevator at the entrance; POKE a pulse across the stone. Anatomy for the route, sci-fi for
// the look. Proportions are for the eye. Interpretive: places for the mind, built on anatomy.
//
// THE BRAIN: the great hall, the atrium of the lateral ventricle, the ventricles' real great
// hall (body, occipital and temporal horns meet there), flooded with cerebrospinal fluid; the
// choroid plexus at its largest (the glomus) hangs as a chandelier of curtains; the arachnoid's
// trabeculae (it is named for the spider's web) cross the water as strands; jellyfish drift.
// THE HEART: the left atrium, filled with blood fresh from the lungs (the four pulmonary veins
// open high on its back wall: the light); in its floor the mitral valve opens and shuts with
// every beat, its heart-strings (chordae tendineae) beneath; the comb-like pectinate muscles
// ridge the wall of its appendage; red cells drift through; the walls contract with the beat.
// THE NEURON: the soma, the cell body (the programme's own word): the nucleus hangs in the
// middle, its chromatin glowing, the nucleolus within; the walls are stacked with rough
// endoplasmic reticulum (the Nissl substance); the cytoskeleton's microtubules run as strands
// towards the axon hillock, where the spike begins; mitochondria drift; now and then the cell
// fires (more often as Φ rises), a ring of light across the membrane.
// THE MIND: the Mind Chamber (DESIGN.md), behind the great hall's limbic gate: see mindAnatomy.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const PINK = new THREE.Color('#ff3bce');
const BLUE = new THREE.Color('#14e5ff');
const R = 14;              // the hall's radius (scene units)
const SQUASH = 0.62;       // the dome's height to its width
const ENTRANCE = new THREE.Vector3(0, -4.4, 9.6);

const KINDS = {
  brain: {
    title: 'THE GREAT HALL · the atrium of the lateral ventricle',
    sub: 'the brain\'s own cave, under water (cerebrospinal fluid): the curtains are the choroid plexus at its largest, the webs the arachnoid\'s trabeculae; proportions for the eye',
    fog: '#070519', fogHigh: '#1a0f3a', shaft: [0.55, 0.8, 1.0], ridge: 0, beat: 0,
    routes: [
      { id: 'cathedral', angle: 0, label: 'THE CATHEDRAL', sub: 'down the foramen and the aqueduct to the fourth ventricle', color: '#a78bfa' },
      { id: 'thought', angle: -0.95, label: 'THE LIMBIC GATE', sub: 'the hinge between body and mind: into the mind chamber', color: '#ff7aa8' },
      { id: 'tunnel', angle: 0.95, label: 'THE PATH OF A THOUGHT', sub: 'a thought, from the body to the cortex', color: '#ffd166' },
      { id: 'palace', angle: -1.95, label: 'THE MIND PALACE', sub: 'twenty-one floors: the method of loci', color: '#5ee7ff' },
      { id: 'wayin', angle: 1.95, label: 'THE ARTERIES', sub: 'back the way in, to the heart', color: '#ff4d5e' },
    ],
  },
  heart: {
    title: 'THE HEART · the left atrium',
    sub: 'blood fresh from the lungs pours in through the four pulmonary veins (the light); in the floor the mitral valve opens to the left ventricle with every beat; the ridges are the pectinate muscles; proportions for the eye',
    fog: '#14050f', fogHigh: '#2e0a26', shaft: [1.0, 0.55, 0.65], ridge: 1, beat: 1,
    routes: [
      { id: 'wayin', angle: 0, label: 'THE WAY IN', sub: 'through the mitral valve and the ventricle, up the aorta and the carotid to the brain', color: '#ff4d5e' },
      { id: 'body', angle: -0.95, label: 'THE BODY', sub: 'what a feeling does, organ by organ', color: '#ffd166' },
      { id: 'bloodstream', angle: 0.95, label: 'THE BLOODSTREAM', sub: 'the score\'s body setting: the submarine in the blood', color: '#ff7aa8' },
      { id: 'human', angle: -1.95, label: 'THE JELLYFISH HUMAN', sub: 'the whole body as one field', color: '#5ee7ff' },
      { id: 'ureter', angle: 1.95, label: 'THE URETER', sub: 'down the aorta to the kidney, and the stone', color: '#a78bfa' },
    ],
  },
  neuron: {
    title: 'THE SOMA · the cell body of a neuron',
    sub: 'the nucleus in the middle (chromatin, the nucleolus within); the walls stacked with rough endoplasmic reticulum (the Nissl substance); microtubules run to the axon hillock; mitochondria drift; proportions for the eye',
    fog: '#060a18', fogHigh: '#10213f', shaft: [0.7, 0.85, 1.0], ridge: 0, stack: 1, beat: 0, fire: 1,
    routes: [
      { id: 'neuron', angle: 0, label: 'THE AXON HILLOCK', sub: 'where the spike begins: the whole neuron, firing', color: '#ffd166' },
      { id: 'network', angle: -0.95, label: 'THE DENDRITES', sub: 'out along the branches to the other cells: memory as a network', color: '#5ee7ff' },
      { id: 'thought', angle: 0.95, label: 'THE SUB-THRESHOLD SEA', sub: 'many cells together: a swell that crosses becomes a feeling', color: '#ff7aa8' },
      { id: 'tunnel', angle: -1.95, label: 'THE PATH OF A THOUGHT', sub: 'from the body to the cortex, cell by cell', color: '#a78bfa' },
      { id: 'brain', angle: 1.95, label: 'UP TO THE GREAT HALL', sub: 'the brain, eighty-six billion cells up', color: '#ff4d5e' },
    ],
  },
  mind: {
    title: 'THE MIND CHAMBER · through the limbic gate',
    sub: 'below the gold plane the field is real but not felt; a swell that crosses becomes a feeling, lifted, a thought; each sphere shows its expression (cores: the emotions; fused: blend; clamped: dampen; the spark: the mechanism); with C-PTSD some stay; interpretive, from the model',
    fog: '#04030b', fogHigh: '#140a2c', shaft: [0.6, 0.55, 1.0], ridge: 0, beat: 1, void: 1, door: { y: -6.2, r: 0.88, scale: 0.55 }, eye: { y: 1.4, lookY: -4.2 },
    routes: [
      { id: 'brain', angle: 0, label: 'BACK TO THE GREAT HALL', sub: 'through the limbic gate, into the body', color: '#ff7aa8' },
      { id: 'tunnel', angle: -0.95, label: 'THE PATH OF A THOUGHT', sub: 'a thought, from the body to the cortex', color: '#ffd166' },
      { id: 'landscape', angle: 0.95, label: 'THE WELLS', sub: 'the landscape beneath: where states settle and stick', color: '#5ee7ff' },
      { id: 'network', angle: -1.95, label: 'MEMORY', sub: 'a network: recall blended with a fading trace', color: '#a78bfa' },
      { id: 'limbic', angle: 1.95, label: 'THE LIMBIC HINGE', sub: 'the gate seen from the side: the amygdala, the hippocampus', color: '#ff4d5e' },
    ],
  },
};
// the brain's routes, for anything that lists them
export const HALL_ROUTES = KINDS.brain.routes;

const NOISE = /* glsl */`
float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise3(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise3(p); p *= 2.03; a *= 0.5; } return s; }
`;

// a soft round point (motes, glints)
function softDot() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, 'rgba(255,255,255,1)');
  r.addColorStop(0.4, 'rgba(255,255,255,0.5)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

// a sign in the medium: the route's name and a line or two under it
function textSprite(title, sub, color) {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.shadowColor = color;
  g.shadowBlur = 18;
  g.fillStyle = '#ffffff';
  g.font = '700 64px "Space Mono", monospace';
  g.fillText(title, 512, 110);
  g.shadowBlur = 0;
  g.fillStyle = 'rgba(232,238,252,0.85)';
  g.font = '38px "Space Mono", monospace';
  const cut = sub.length > 46 ? sub.lastIndexOf(' ', 46) : -1;
  g.fillText(cut > 0 ? sub.slice(0, cut) : sub, 512, 172);
  if (cut > 0) g.fillText(sub.slice(cut + 1), 512, 220);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false }));
  s.scale.set(5.2, 1.3, 1);
  return s;
}

function rand(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

// THE BRAIN's anatomy: the glomus as a chandelier, the arachnoid's webs, jellyfish
function brainAnatomy(scene, rnd, U, dot) {
  const curtainMat = new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: /* glsl */`
      uniform float uTime; varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        vec3 top = modelMatrix[3].xyz;
        float hang = -p.y;
        p.x += sin(uTime * 0.7 + top.x * 2.1 + top.z * 1.3 + hang * 0.6) * hang * 0.07;
        p.z += cos(uTime * 0.5 + top.z * 1.7 + hang * 0.5) * hang * 0.05;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uFX; uniform vec3 uPink; varying vec2 vUv;
      void main() {
        float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
        float fringe = 0.65 + 0.35 * sin(vUv.y * 90.0);
        vec3 c = mix(vec3(0.45, 0.18, 0.75), uPink, vUv.y);
        float a = edge * fringe * smoothstep(0.0, 0.2, vUv.y) * (0.16 + 0.22 * uFX);
        gl_FragColor = vec4(c * a, 1.0);
      }`,
  });
  const chandelier = new THREE.Group();
  for (let k = 0; k < 80; k++) {
    const len = 3 + rnd() * 5;
    const g = new THREE.PlaneGeometry(0.28 + rnd() * 0.3, len, 1, 24);
    g.translate(0, -len / 2, 0);
    const m = new THREE.Mesh(g, curtainMat);
    const a = rnd() * Math.PI * 2, r = 0.3 + rnd() * 2.6;
    m.position.set(Math.cos(a) * r, 7.6 - rnd() * 0.8, Math.sin(a) * r);
    m.rotation.y = rnd() * Math.PI;
    chandelier.add(m);
  }
  {
    const n = 140, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2, r = rnd() * 2.8;
      pos.set([Math.cos(a) * r, 7.4 - rnd() * 6, Math.sin(a) * r], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    chandelier.add(new THREE.Points(g, new THREE.PointsMaterial({ map: dot, color: '#ffb6f0', size: 0.22, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })));
  }
  scene.add(chandelier);
  strands(scene, rnd, 420, '#9fe8ff', 0.22, () => {
    const dir = new THREE.Vector3(rnd() - 0.5, (rnd() - 0.5) * 1.2, rnd() - 0.5).normalize();
    const a = new THREE.Vector3(dir.x * R * 0.82, dir.y * R * SQUASH * 0.8, dir.z * R * 0.82);
    const b = a.clone().add(new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(5 + rnd() * 5)).multiplyScalar(0.92);
    return [a, b, 0.06];
  });
  const jellies = [];
  for (let k = 0; k < 6; k++) {
    const color = k % 2 ? PINK : BLUE;
    const j = new THREE.Group();
    j.add(new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })));
    const t = [];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      let px = Math.cos(a) * 0.38, pz = Math.sin(a) * 0.38, py = 0;
      for (let s = 1; s <= 10; s++) {
        const x = px + Math.sin(s * 0.9 + i) * 0.04, z = pz + Math.cos(s * 0.8 + i) * 0.04, y = -s * 0.18;
        t.push(px, py, pz, x, y, z);
        px = x; py = y; pz = z;
      }
    }
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.Float32BufferAttribute(t, 3));
    j.add(new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false })));
    j.userData = { r: 4 + rnd() * 6, a: rnd() * Math.PI * 2, y: -2 + rnd() * 6, speed: 0.02 + rnd() * 0.03, phase: rnd() * 6 };
    scene.add(j);
    jellies.push(j);
  }
  return {
    update(dt, state) {
      chandelier.rotation.y += dt * 0.02;
      for (const j of jellies) {
        const u = j.userData;
        u.a += dt * u.speed;
        j.position.set(Math.cos(u.a) * u.r, u.y + 0.6 * Math.sin(state.time * 0.3 + u.phase), Math.sin(u.a) * u.r);
        const beat = 1 + 0.16 * Math.sin(state.time * 1.8 + u.phase);
        j.scale.set(beat, 2 - beat, beat);
      }
    },
  };
}

// THE HEART's anatomy: the mitral valve and its strings, red cells in the flow
function heartAnatomy(scene, rnd, U, dot) {
  // the mitral valve: a ring in the floor, two leaflets that open with each beat
  const valve = new THREE.Group();
  valve.position.set(0, -7.3, -1.5);
  const annulus = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.16, 16, 96), new THREE.MeshBasicMaterial({ color: '#ff7aa8' }));
  annulus.rotation.x = Math.PI / 2;
  valve.add(annulus);
  const leafMat = new THREE.MeshBasicMaterial({ color: '#ff3b8e', transparent: true, opacity: 0.3, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
  const leaflets = [0, 1].map(k => {
    const pivot = new THREE.Group();
    pivot.position.set(0, 0, k ? 2.5 : -2.5);
    const leaf = new THREE.Mesh(new THREE.CircleGeometry(2.5, 48, 0, Math.PI), leafMat);
    leaf.rotation.set(-Math.PI / 2, 0, k ? Math.PI : 0);
    leaf.position.z = k ? -0.02 : 0.02;
    pivot.add(leaf);
    valve.add(pivot);
    return { pivot, k };
  });
  scene.add(valve);
  // its heart-strings (chordae tendineae), from the leaflets' edges down into the ventricle
  strands(scene, rnd, 90, '#ffc2d6', 0.35, () => {
    const a = rnd() * Math.PI * 2, r = 0.6 + rnd() * 1.8;
    const top = new THREE.Vector3(Math.cos(a) * r, -7.25, -1.5 + Math.sin(a) * r);
    return [top, top.clone().add(new THREE.Vector3((rnd() - 0.5) * 1.5, -4 - rnd() * 3, (rnd() - 0.5) * 1.5)), 0.02];
  });
  // red cells: biconcave discs, carried from the veins above down to the valve
  const profile = [];
  for (let i = 0; i <= 16; i++) {
    const x = (i / 16) * 0.16;
    const y = 0.04 * Math.sqrt(Math.max(0, 1 - (x / 0.16) ** 2)) * (0.45 + 0.55 * (x / 0.16) ** 2);
    profile.push(new THREE.Vector2(x, y));
  }
  for (let i = 16; i >= 0; i--) profile.push(new THREE.Vector2(profile[i].x, -profile[i].y));
  const cellGeo = new THREE.LatheGeometry(profile, 24);
  const cellMat = new THREE.MeshBasicMaterial({ color: '#ff2f55', transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
  const N = 160;
  const cells = new THREE.InstancedMesh(cellGeo, cellMat, N);
  const flow = [];
  for (let i = 0; i < N; i++) flow.push({ a: rnd() * Math.PI * 2, r: 1 + rnd() * 9, y: -6 + rnd() * 13, spin: rnd() * 6, tilt: rnd() * Math.PI, speed: 0.5 + rnd() });
  scene.add(cells);
  const o = new THREE.Object3D();
  return {
    update(dt, state, beat) {
      // the valve opens in diastole (between beats) and shuts as the ventricle contracts
      const open = 0.15 + 0.75 * (1 - beat);
      for (const { pivot, k } of leaflets) pivot.rotation.x = (k ? 1 : -1) * open * 1.1;
      leafMat.opacity = 0.18 + 0.25 * beat;
      for (let i = 0; i < N; i++) {
        const c = flow[i];
        // a slow spiral down towards the valve, faster on the beat
        c.y -= dt * c.speed * (0.4 + 1.6 * beat + 0.6 * state.fx);
        c.a += dt * 0.08 * c.speed;
        c.r += (2.2 - c.r) * dt * 0.02;
        if (c.y < -7) { c.y = 6 + rnd() * 2; c.r = 2 + rnd() * 9; }
        c.spin += dt * c.speed;
        o.position.set(Math.cos(c.a) * c.r, c.y, -1.5 + Math.sin(c.a) * c.r);
        o.rotation.set(c.tilt + c.spin, c.spin * 0.7, 0);
        o.updateMatrix();
        cells.setMatrixAt(i, o.matrix);
      }
      cells.instanceMatrix.needsUpdate = true;
    },
  };
}

// THE NEURON's anatomy: the nucleus, the microtubules to the axon hillock, mitochondria
function neuronAnatomy(scene, rnd, U, dot) {
  const nucleus = new THREE.Group();
  nucleus.position.set(0, 1.2, -1);
  const envelope = new THREE.Mesh(new THREE.SphereGeometry(3, 96, 64), new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vP; varying vec3 vN; varying vec3 vV; void main() { vP = position; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; uniform vec3 uPink; uniform vec3 uBlue; varying vec3 vP; varying vec3 vN; varying vec3 vV;
      ${NOISE}
      void main() {
        float rim = pow(1.0 - abs(dot(vN, vV)), 2.2);
        float chromatin = fbm(vP * 1.4 + vec3(0.0, uTime * 0.05, 0.0));
        vec3 c = mix(uBlue, vec3(0.56, 0.28, 1.0), chromatin) * (0.12 + 0.5 * chromatin * chromatin) + uBlue * rim * (0.7 + 0.6 * uFX);
        gl_FragColor = vec4(c, 1.0);
      }`,
  }));
  const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(0.75, 48, 32), new THREE.MeshBasicMaterial({ color: '#ff7ad9', transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  nucleolus.position.set(0.6, 0.3, 0.4);
  nucleus.add(envelope, nucleolus);
  {
    // the pores of its envelope
    const n = 260, pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const v = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(3.02);
      pos.set([v.x, v.y, v.z], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    nucleus.add(new THREE.Points(g, new THREE.PointsMaterial({ map: dot, color: '#bff6ff', size: 0.16, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })));
  }
  scene.add(nucleus);
  // microtubules: long strands from all round the soma converging on the axon hillock
  const hillock = new THREE.Vector3(0, -3.4, -R * 0.7);
  strands(scene, rnd, 260, '#b8f0ff', 0.2, () => {
    const dir = new THREE.Vector3(rnd() - 0.5, (rnd() - 0.5) * 1.2, rnd() * 0.8).normalize();
    const a = new THREE.Vector3(dir.x * R * 0.8, dir.y * R * SQUASH * 0.7, dir.z * R * 0.8);
    return [a, hillock.clone().add(new THREE.Vector3((rnd() - 0.5) * 2, (rnd() - 0.5) * 2, 0)), 0.015];
  });
  // mitochondria: small glowing capsules, drifting
  const mito = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.08, 0.28, 4, 10), new THREE.MeshBasicMaterial({ color: '#ffae6b', transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }), 70);
  const drift = [];
  for (let i = 0; i < 70; i++) drift.push({ p: new THREE.Vector3((rnd() - 0.5) * 18, -5 + rnd() * 10, (rnd() - 0.5) * 18), v: new THREE.Vector3(rnd() - 0.5, (rnd() - 0.5) * 0.4, rnd() - 0.5).multiplyScalar(0.25), r: new THREE.Euler(rnd() * 3, rnd() * 3, rnd() * 3) });
  scene.add(mito);
  const o = new THREE.Object3D();
  return {
    update(dt, state) {
      nucleus.rotation.y += dt * 0.03;
      for (let i = 0; i < drift.length; i++) {
        const d = drift[i];
        d.p.addScaledVector(d.v, dt * (1 + state.fx));
        if (d.p.length() > 11) d.v.negate();
        d.r.x += dt * 0.2;
        o.position.copy(d.p);
        o.rotation.copy(d.r);
        o.updateMatrix();
        mito.setMatrixAt(i, o.matrix);
      }
      mito.instanceMatrix.needsUpdate = true;
    },
  };
}

// THE MIND CHAMBER's contents (ISS-104, DESIGN.md): the foam below a gold threshold plane;
// thoughts that rise from the foam and ignite as they cross it, each showing its expression in
// the model's algebra (EmotionOntology: blend, dampen, evoke over eight basic emotions); the
// mechanism as the spark that births it; five kinds (the author's words heard, pictures seen, a
// feeling, a pain, a flashback); with C-PTSD (cp) some stay, rising a little and holding behind
// a crystalline ridge (a high barrier); echoes (the memory kernel) and a pulse down to the heart.
// Interpretive: pictures of the model's terms, not of a brain.
const EMO = { joy: '#ffd166', trust: '#3ddc97', fear: '#14e5ff', surprise: '#8ecbff', sadness: '#5a5cff', disgust: '#b04bff', anger: '#ff3b4e', anticipation: '#ff9f1c' };
// named terms of EmotionOntology.lean (love, optimism, ... nostalgia), as expressions
const EXPRESSIONS = [
  { name: 'love', op: 'blend', a: 'joy', b: 'trust' },
  { name: 'optimism', op: 'blend', a: 'joy', b: 'anticipation' },
  { name: 'disapproval', op: 'blend', a: 'sadness', b: 'surprise' },
  { name: 'remorse', op: 'blend', a: 'sadness', b: 'disgust' },
  { name: 'awe', op: 'blend', a: 'fear', b: 'surprise' },
  { name: 'contempt', op: 'dampen', a: 'disgust', b: 'anger' },
  { name: 'submission', op: 'dampen', a: 'trust', b: 'fear' },
  { name: 'aggressiveness', op: 'blend', a: 'anger', b: 'anticipation' },
  { name: 'nostalgia', op: 'blend', a: 'joy', b: 'sadness', m: 'EpisodicMemory' },
  { name: 'acoustic fright', op: 'atom', a: 'fear', m: 'BrainStem' },
  { name: 'mirror sadness', op: 'atom', a: 'sadness', m: 'Contagion' },
  { name: 'entrained calm', op: 'atom', a: 'joy', m: 'RhythmicEntrainment' },
  { name: 'conditioned affect', op: 'atom', a: 'fear', m: 'EvaluativeConditioning' },
  { name: 'imagined tenderness', op: 'blend', a: 'joy', b: 'sadness', m: 'VisualImagery' },
];
const exprText = e => {
  const core = e.op === 'atom' ? e.a : `${e.op}(${e.a}, ${e.b})`;
  return `${e.name} = ${e.m ? `evoke(${e.m}, ${core})` : core}`;
};
const WORDS = ['what have I got to do?', 'skiing on Saturday', 'this way, or that way', 'the chair', 'why did I say that', 'a third way'];
const THRESHOLD_Y = -3.2;
const FLOOR_Y = -7.2;

function mindAnatomy(scene, rnd, U, dot) {
  const texts = new Map();
  const label = (text, color) => {
    if (!texts.has(text)) {
      const c = document.createElement('canvas');
      c.width = 1024; c.height = 96;
      const g = c.getContext('2d');
      g.textAlign = 'center';
      g.font = '40px "Space Mono", monospace';
      g.shadowColor = color; g.shadowBlur = 12;
      g.fillStyle = '#ffffff';
      g.fillText(text, 512, 60);
      const tx = new THREE.CanvasTexture(c);
      tx.colorSpace = THREE.SRGBColorSpace;
      texts.set(text, tx);
    }
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texts.get(text), transparent: true, depthWrite: false, fog: false }));
    s.scale.set(4.2, 0.4, 1);
    return s;
  };
  // THE FOAM: the field below the threshold, real but not felt, bubbling
  const NF = 2600;
  const fp = new Float32Array(NF * 3), fc = new Float32Array(NF * 3), base = new Float32Array(NF), phase = new Float32Array(NF);
  const blue = new THREE.Color('#3a6bff'), violet = new THREE.Color('#8f47ff');
  for (let i = 0; i < NF; i++) {
    const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 9.5;
    base[i] = FLOOR_Y + rnd() * (THRESHOLD_Y - FLOOR_Y - 0.6);
    phase[i] = rnd() * 6.28;
    fp.set([Math.cos(a) * r, base[i], -1 + Math.sin(a) * r], i * 3);
    const c = blue.clone().lerp(violet, rnd());
    fc.set([c.r, c.g, c.b], i * 3);
  }
  const fg = new THREE.BufferGeometry();
  fg.setAttribute('position', new THREE.Float32BufferAttribute(fp, 3));
  fg.setAttribute('color', new THREE.Float32BufferAttribute(fc, 3));
  const foam = new THREE.Points(fg, new THREE.PointsMaterial({ map: dot, size: 0.14, vertexColors: true, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(foam);
  // THE THRESHOLD: a gold plane across the chamber (T_c, fixed in the model)
  const plane = new THREE.Mesh(new THREE.CircleGeometry(10.5, 128), new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vP; void main() { vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; varying vec2 vP;
      void main() {
        float r = length(vP);
        float rings = smoothstep(0.92, 1.0, abs(sin(r * 3.0 - uTime * 0.4)));
        float a = (0.05 + 0.12 * rings) * smoothstep(10.5, 6.0, r);
        gl_FragColor = vec4(vec3(1.0, 0.78, 0.25) * a, 1.0);
      }`,
  }));
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, THRESHOLD_Y, -1);
  scene.add(plane);
  const planeLabel = label('THE THRESHOLD: below, real but not felt; above, conscious', '#ffd166');
  planeLabel.position.set(0, THRESHOLD_Y + 0.25, -9.5);
  planeLabel.scale.set(7, 0.66, 1);
  scene.add(planeLabel);

  const thoughts = [];
  const effects = [];
  const lineFx = (from, to, color, life) => {
    const g = new THREE.BufferGeometry().setFromPoints([from, to]);
    const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(l);
    effects.push({ obj: l, age: 0, life, kind: 'line' });
  };
  const ringFx = (at, color, life, delay = 0, size = 0.6) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(size, 0.025, 6, 64), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.copy(at);
    m.rotation.x = Math.PI / 2;
    scene.add(m);
    effects.push({ obj: m, age: -delay, life, kind: 'ring' });
  };
  const SPARK = { BrainStem: '#e8f6ff', EpisodicMemory: '#ffb347', Contagion: '#ff7ad9', RhythmicEntrainment: '#5ee7ff', EvaluativeConditioning: '#ffd166', VisualImagery: '#c9a7ff', MusicalExpectancy: '#7dffb2', AestheticJudgement: '#ffffff' };

  function spawn(state, forced) {
    const e = EXPRESSIONS[Math.floor(rnd() * EXPRESSIONS.length)];
    const cp = state.cp ?? 0;
    const roll = rnd();
    let kind = e.m === 'VisualImagery' ? 'picture' : roll < 0.34 ? 'words' : roll < 0.58 ? 'picture' : roll < 0.84 ? 'feeling' : roll < 0.93 ? 'pain' : 'flashback';
    if (kind === 'flashback' && cp < 0.05) kind = 'feeling';
    const g = new THREE.Group();
    const a = rnd() * Math.PI * 2, r = 2 + rnd() * 4.5;
    g.position.set(Math.cos(a) * r, FLOOR_Y + 0.4, -1 + Math.sin(a) * r);
    const shellColor = kind === 'pain' ? '#ff3b4e' : kind === 'flashback' ? '#7a3bff' : '#cfc4ff';
    const shell = new THREE.Mesh(kind === 'pain' ? new THREE.IcosahedronGeometry(0.55, 0) : new THREE.SphereGeometry(0.5, 32, 16),
      new THREE.MeshBasicMaterial({ color: shellColor, transparent: true, opacity: 0.08, wireframe: kind === 'pain', blending: THREE.AdditiveBlending, depthWrite: false }));
    g.add(shell);
    // the expression: one core per basic emotion; blend fused in phase, dampen clamped
    const core = (name, rr) => new THREE.Mesh(new THREE.SphereGeometry(rr, 20, 12), new THREE.MeshBasicMaterial({ color: EMO[name], transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    const cores = [];
    if (e.op === 'atom') cores.push(core(e.a, 0.2));
    else if (e.op === 'blend') cores.push(core(e.a, 0.16), core(e.b, 0.16));
    else {
      cores.push(core(e.a, 0.24));
      const held = core(e.b, 0.09);
      held.material.opacity = 0.45;
      const lattice = new THREE.Mesh(new THREE.IcosahedronGeometry(0.15, 0), new THREE.MeshBasicMaterial({ color: '#2a2440', wireframe: true }));
      held.add(lattice);
      cores.push(held);
    }
    cores.forEach(c => g.add(c));
    const extra = [];
    if (kind === 'words') {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.008, 6, 64), new THREE.MeshBasicMaterial({ color: '#e8eefc', transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false }));
      g.add(ring); extra.push(ring);
      const w = label(`"${WORDS[Math.floor(rnd() * WORDS.length)]}"`, '#e8eefc');
      w.position.set(0, -0.85, 0); w.scale.set(2, 0.19, 1);
      g.add(w); extra.push(w);
    } else if (kind === 'picture') {
      const lens = new THREE.Sprite(new THREE.SpriteMaterial({ map: dot, color: EMO[e.a], transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
      lens.scale.set(1.1, 1.1, 1);
      g.add(lens); extra.push(lens);
    }
    const tag = label(exprText(e), EMO[e.a]);
    tag.position.set(0, 0.85, 0);
    tag.scale.set(2.6, 0.25, 1);
    tag.visible = false;
    g.add(tag);
    g.scale.setScalar(0.45);
    scene.add(g);
    const stay = kind === 'flashback' || rnd() < cp * 0.55;
    thoughts.push({ g, shell, cores, extra, tag, kind, e, age: 0, ignited: false, stay, holdY: -1.6 + rnd() * 5.5, drift: new THREE.Vector3(rnd() - 0.5, 0, rnd() - 0.5).multiplyScalar(0.4), fading: 0, ridge: null, pain: kind === 'pain' ? new THREE.Vector3(Math.cos(a) * 9, FLOOR_Y, -1 + Math.sin(a) * 9) : null });
  }

  function ignite(th, state) {
    th.ignited = true;
    const at = th.g.position.clone();
    const m = th.e.m;
    if (m === 'BrainStem') lineFx(new THREE.Vector3(at.x, FLOOR_Y, at.z), at, SPARK[m], 0.6);
    else if (m === 'EpisodicMemory') {
      const d = new THREE.Vector3(rnd() - 0.5, (rnd() - 0.2) * 0.6, rnd() - 0.5).normalize().multiplyScalar(R * 0.75);
      lineFx(d, at, SPARK[m], 1.6);
    } else if (m === 'Contagion') lineFx(at.clone().add(new THREE.Vector3(12, 0.5, 0)), at, SPARK[m], 1.4);
    else ringFx(at, m ? SPARK[m] : '#ffffff', 1.4, 0, 0.5);
    // the pulse down to the heart (the somatic loop): a thought acts on the body
    lineFx(at, new THREE.Vector3(0, FLOOR_Y, -1), '#a78bfa', 0.9);
    // echoes (the memory kernel; C-PTSD): fainter rings, later
    const echoes = Math.round((state.cp ?? 0) * 4);
    for (let k = 1; k <= echoes; k++) ringFx(at, '#a78bfa', 1.3, 0.45 * k, 0.5 + 0.25 * k);
  }

  return {
    poke(state) { spawn(state ?? {}, true); },
    update(dt, state, beat) {
      const fx = state.fx ?? 0;
      // the foam: bubbling, faster and higher as Φ heats the chamber
      const pos = fg.attributes.position;
      for (let i = 0; i < NF; i++) pos.setY(i, base[i] + (0.18 + 0.35 * fx) * Math.sin(state.time * (1.2 + 2.5 * fx) + phase[i]));
      pos.needsUpdate = true;
      foam.material.opacity = 0.45 + 0.35 * fx;
      planeLabel.visible = state.labels !== false;
      // new thoughts, more as the field heats
      if (thoughts.length < 44 && rnd() < (0.25 + 0.9 * fx) * dt) spawn(state);
      // too many staying: the oldest is let go
      const staying = thoughts.filter(t => t.stay && t.ignited && !t.fading);
      if (staying.length > 30) staying[0].stay = false;
      for (let i = thoughts.length - 1; i >= 0; i--) {
        const th = thoughts[i];
        th.age += dt;
        const p = th.g.position;
        const goal = th.stay ? th.holdY : 0.5 + rnd() * 0.01;
        if (!th.fading && p.y < goal) p.y += dt * (0.5 + 0.7 * fx) * (th.ignited ? 0.7 : 1);
        if (!th.ignited && p.y >= THRESHOLD_Y) ignite(th, state);
        // below the plane, a dim swell (a feeling at D8); above, the sphere condenses (D9-11)
        const s = th.ignited ? Math.min(1, 0.45 + (p.y - THRESHOLD_Y) * 0.35) : 0.45;
        const pulse = th.kind === 'feeling' ? 1 + 0.08 * beat + 0.04 * Math.sin(state.time * 2.4) : 1;
        const shake = th.kind === 'flashback' ? 0.05 * Math.sin(state.time * 31 + i) : 0;
        th.g.scale.setScalar(2 * s * pulse);   // a thought is a few times a foam bubble's size
        th.g.position.x += shake;
        th.shell.material.opacity = th.ignited ? 0.16 + 0.06 * Math.sin(state.time * 1.7 + i) : 0.05;
        for (const c of th.cores) c.material.opacity = th.ignited ? 0.9 : 0.35;
        // blend: the two cores orbit in phase, fused; dampen: the held one sits clamped
        if (th.e.op === 'blend') { const a = state.time * 1.8 + i; th.cores[0].position.set(Math.cos(a) * 0.09, Math.sin(a) * 0.06, 0); th.cores[1].position.set(-Math.cos(a) * 0.09, -Math.sin(a) * 0.06, 0); }
        else if (th.e.op === 'dampen') th.cores[1].position.set(0.12, 0.05, 0.1);
        for (const x of th.extra) if (x.isMesh) x.rotation.z += dt * 0.8;
        th.tag.visible = state.labels !== false && th.ignited && !th.fading;
        // thoughts that stay: held behind a crystalline ridge (a high barrier)
        if (th.stay && th.ignited && p.y >= goal - 0.05 && !th.ridge) {
          th.ridge = new THREE.Mesh(new THREE.IcosahedronGeometry(0.78, 1), new THREE.MeshBasicMaterial({ color: '#bff6ff', wireframe: true, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }));
          th.g.add(th.ridge);
        }
        if (th.ridge) th.ridge.rotation.y += dt * 0.15;
        if (th.pain && th.ignited) {
          if (!th.tether) {
            th.tether = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), new THREE.LineBasicMaterial({ color: '#ff3b4e', transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
            scene.add(th.tether);
          }
          th.tether.geometry.setFromPoints([p.clone(), th.pain]);
        }
        // the rest drift away and fade
        if (!th.stay && th.ignited && p.y >= goal - 0.05) {
          th.fading += dt / 4;
          p.addScaledVector(th.drift, dt);
          th.g.scale.multiplyScalar(1 - 0.4 * th.fading);
          th.shell.material.opacity *= 1 - th.fading;
          for (const c of th.cores) c.material.opacity *= 1 - th.fading;
        }
        if (th.fading >= 1) {
          scene.remove(th.g);
          if (th.tether) scene.remove(th.tether);
          th.g.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
          thoughts.splice(i, 1);
        }
      }
      for (let i = effects.length - 1; i >= 0; i--) {
        const f = effects[i];
        f.age += dt;
        if (f.age < 0) continue;
        const k = f.age / f.life;
        f.obj.material.opacity = Math.max(0, 1 - k);
        if (f.kind === 'ring') f.obj.scale.setScalar(1 + 2.5 * k);
        if (k >= 1) { scene.remove(f.obj); f.obj.geometry.dispose(); f.obj.material.dispose(); effects.splice(i, 1); }
      }
    },
  };
}

// fine strands that sag a little (the arachnoid's trabeculae, the heart's strings)
function strands(scene, rnd, n, color, opacity, ends) {
  const pts = [];
  for (let k = 0; k < n; k++) {
    const [a, b, sag] = ends();
    const len = a.distanceTo(b);
    let prev = a;
    for (let s = 1; s <= 8; s++) {
      const t = s / 8;
      const p = a.clone().lerp(b, t);
      p.y -= Math.sin(Math.PI * t) * len * sag;
      pts.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
      prev = p;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false })));
}

export function createAtrium3D(kind = 'brain') {
  const K = KINDS[kind] ?? KINDS.brain;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const FOG = new THREE.Color(K.fog);
  const FOG_HIGH = new THREE.Color(K.fogHigh);
  const scene = new THREE.Scene();
  scene.background = FOG.clone();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 120);
  const stereo = new THREE.StereoCamera();
  stereo.eyeSep = 0.06;
  const size = new THREE.Vector2();
  const rnd = rand(kind === 'heart' ? 1628 : 1714);
  const dot = softDot();
  const U = {
    uTime: { value: 0 }, uFX: { value: 0 }, uPulse: { value: -1 }, uFog: { value: FOG.clone() }, uPink: { value: PINK }, uBlue: { value: BLUE },
    uRidge: { value: K.ridge }, uStack: { value: K.stack ?? 0 }, uBeat: { value: 0 }, uVoid: { value: K.void ?? 0 },
  };

  // THE VAULT: an ellipsoid seen from inside, its stone raised by fractal noise; FX folds it;
  // in the heart the pectinate muscles comb part of the wall, and the wall contracts on the beat
  const vault = new THREE.Mesh(new THREE.SphereGeometry(R, 192, 128), new THREE.ShaderMaterial({
    uniforms: U,
    side: THREE.BackSide,
    vertexShader: /* glsl */`
      uniform float uTime; uniform float uFX; uniform float uRidge; uniform float uStack; uniform float uBeat;
      varying vec3 vPos; varying float vDepth;
      ${NOISE}
      void main() {
        vec3 p = position;
        vec3 n = normalize(normal);
        float f = fbm(p * 0.16 + vec3(0.0, uTime * 0.015, 0.0));
        float a = atan(p.z, p.x);
        float fold = sin(3.0 * a + uTime * 0.6 + p.y * 0.35) * sin(p.y * 0.45 - uTime * 0.4);
        float comb = uRidge * smoothstep(0.1, 0.9, sin(a * 2.0 + 1.0)) * pow(0.5 + 0.5 * sin(a * 46.0 + p.y * 0.4), 3.0);
        // the neuron's walls: stacked folds (the rough endoplasmic reticulum), wavering
        float stack = uStack * pow(0.5 + 0.5 * sin(p.y * 2.6 + f * 5.0), 4.0);
        p -= n * (3.4 * (f - 0.45) * (1.0 - 0.5 * uStack) + uFX * uFX * 1.8 * fold - 0.9 * comb - 1.1 * stack + uBeat * 0.5);
        vPos = p * vec3(1.0, ${SQUASH.toFixed(2)}, 1.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; uniform float uPulse; uniform float uBeat; uniform float uVoid; uniform vec3 uFog; uniform vec3 uPink; uniform vec3 uBlue;
      varying vec3 vPos; varying float vDepth;
      ${NOISE}
      void main() {
        float f = fbm(vPos * 0.32);
        vec3 col = mix(vec3(0.035, 0.022, 0.09), vec3(0.15, 0.07, 0.26), f);
        // veins: thin bright lines where a slower noise crosses its levels, pink high, blue low
        float lv = fbm(vPos * 0.11 + vec3(0.0, 0.0, uTime * 0.01)) * 7.0;
        float vein = smoothstep(0.43, 0.49, abs(fract(lv) - 0.5));
        vec3 vc = mix(uBlue, uPink, smoothstep(-6.0, 6.0, vPos.y));
        col += vc * vein * (0.5 + 1.4 * uFX + 0.6 * uBeat);
        // the field's glow in the stone, rising with FX (and with each beat, in the heart)
        col += vc * (0.04 + 0.16 * uFX + 0.08 * uBeat) * (0.6 + 0.8 * f);
        // caustics: light through the medium from above, strongest high on the walls
        float c = sin(vPos.x * 0.9 + uTime * 0.8) * sin(vPos.z * 0.9 - uTime * 0.6) + 0.5 * sin((vPos.x + vPos.z) * 0.6 + uTime);
        col += vec3(0.25, 0.55, 0.95) * pow(abs(c), 3.0) * 0.14 * smoothstep(-4.0, 7.0, vPos.y);
        // POKE: a ring of the field's light spreading from the middle of the hall
        if (uPulse >= 0.0) {
          float d = length(vPos - vec3(0.0, 4.0, 0.0));
          col += mix(uPink, uBlue, 0.5) * exp(-pow((d - uPulse * 20.0) * 0.5, 2.0)) * (1.0 - uPulse) * 1.4;
        }
        col *= 1.0 - 0.55 * uVoid;   // the mind chamber: the same stone, emptied to a void
        float fog = 1.0 - exp(-vDepth * vDepth * 0.0022);
        gl_FragColor = vec4(mix(col, uFog, fog * 0.8), 1.0);
      }`,
  }));
  vault.scale.set(1, SQUASH, 1);
  scene.add(vault);

  // LIGHT FROM ABOVE: shafts through the medium (in the heart, the pulmonary veins' inflow)
  const shaftColor = new THREE.Vector3(...K.shaft);
  const shaftMat = new THREE.ShaderMaterial({
    uniforms: { ...U, uShaft: { value: shaftColor } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; uniform vec3 uShaft; varying vec2 vUv;
      void main() {
        float a = pow(vUv.y, 1.6) * (0.06 + 0.05 * uFX) * (0.75 + 0.25 * sin(uTime * 0.7 + vUv.x * 40.0));
        gl_FragColor = vec4(uShaft * a, 1.0);
      }`,
  });
  for (let k = 0; k < (kind === 'heart' ? 4 : kind === 'mind' ? 2 : 6); k++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.4 + rnd() * 1.6, 15, 40, 1, true), shaftMat);
    if (kind === 'heart') {
      // the four pulmonary veins open high on the back wall, two each side
      cone.position.set((k < 2 ? -1 : 1) * (3 + 1.5 * (k % 2)), 2.5, -6 + 1.5 * (k % 2));
      cone.rotation.set(-0.5, 0, (k < 2 ? 1 : -1) * 0.35);
    } else {
      cone.position.set((rnd() - 0.5) * 5, 1.2, (rnd() - 0.5) * 5);
      cone.rotation.set((rnd() - 0.5) * 0.35, 0, (rnd() - 0.5) * 0.35);
    }
    scene.add(cone);
  }

  const anatomy = ({ heart: heartAnatomy, neuron: neuronAnatomy, mind: mindAnatomy }[kind] ?? brainAnatomy)(scene, rnd, U, dot);

  // MOTES: fine particles rising slowly through the medium
  const MOTES = 1400;
  const motePos = new Float32Array(MOTES * 3);
  for (let i = 0; i < MOTES; i++) motePos.set([(rnd() - 0.5) * R * 1.6, (rnd() - 0.5) * R * SQUASH * 1.6, (rnd() - 0.5) * R * 1.6], i * 3);
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.Float32BufferAttribute(motePos, 3));
  scene.add(new THREE.Points(moteGeo, new THREE.PointsMaterial({ map: dot, color: kind === 'heart' ? '#ffd0dc' : '#cfe8ff', size: 0.07, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })));

  // THE DOORWAYS: a glowing ring, a dark swirl, the route's name above
  const doorMat = color => new THREE.ShaderMaterial({
    uniforms: { ...U, uColor: { value: new THREE.Color(color) } }, transparent: true, depthWrite: false,
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
      void main() {
        vec2 q = vUv - 0.5; float r = length(q) * 2.0; float a = atan(q.y, q.x);
        float swirl = 0.5 + 0.5 * sin(a * 5.0 + r * 9.0 - uTime * 1.6);
        vec3 c = uColor * (pow(r, 2.5) * 0.9 + swirl * 0.18 * r);
        gl_FragColor = vec4(c, smoothstep(1.0, 0.92, r));
      }`,
  });
  const doors = K.routes.map(route => {
    const dir = new THREE.Vector3(Math.sin(route.angle), 0, -Math.cos(route.angle));
    const D = K.door ?? { y: -3.4, r: 0.7, scale: 1 };   // the mind chamber keeps its doorways low, at the edge
    const at = new THREE.Vector3(dir.x * R * D.r, D.y, dir.z * R * D.r);
    const g = new THREE.Group();
    g.position.copy(at);
    g.lookAt(0, D.y, 0);
    g.scale.setScalar(D.scale);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(1.5, 64), doorMat(route.color));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.08, 12, 96), new THREE.MeshBasicMaterial({ color: route.color, transparent: true, opacity: 0.95 }));
    const label = textSprite(route.label, route.sub, route.color);
    label.position.set(0, 2.6, 0);
    g.add(disc, ring, label);
    scene.add(g);
    return { route, group: g, disc, ring, label, at };
  });

  // THE ELEVATOR at the entrance: a glass column, its car riding; it goes to any level
  const lift = new THREE.Group();
  lift.position.set(-5.4, -4.4, 4.2);   // near left of the entrance, clear of every doorway
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 5.4, 40, 1, true),
    new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  column.position.y = 1.6;
  const cars = [0, 1, 2].map(k => {
    const c = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 8, 64), new THREE.MeshBasicMaterial({ color: '#5ee7ff' }));
    c.rotation.x = Math.PI / 2;
    c.userData.phase = k / 3;
    lift.add(c);
    return c;
  });
  const liftLabel = textSprite('ELEVATOR', 'from here to any level', '#5ee7ff');
  liftLabel.position.set(0.6, 3.7, 0);
  liftLabel.scale.set(3.2, 0.8, 1);
  lift.add(column, liftLabel);
  scene.add(lift);

  let last = 0;
  let travel = null;
  let pulseAt = -1;
  const ray = new THREE.Raycaster();
  const target = new THREE.Vector3();

  return {
    canvas,
    info: { kind, title: K.title, sub: K.sub },
    // a route chosen: glide towards its doorway, then hand over (done); the wall clock, so the
    // glide takes 1.4 s at any frame rate
    route(id, done) {
      const d = doors.find(x => x.route.id === id);
      if (!d || travel) return;
      travel = { from: camera.position.clone(), to: d.at.clone().lerp(new THREE.Vector3(0, -3.4, 0), 0.12), look: d.at.clone(), start: performance.now(), done };
    },
    // the doorway or the elevator under a screen point (fractions from the centre)
    pick(fx, fy) {
      ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
      const hits = ray.intersectObjects([...doors.map(d => d.disc), column], false);
      if (!hits.length) return null;
      if (hits[0].object === column) return 'elevator';
      return doors.find(d => d.disc === hits[0].object)?.route.id ?? null;
    },
    pulse(state) { pulseAt = 0; anatomy.poke?.(state); },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, phi, stereo, labels, bpm }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      const fx = Math.max(0, Math.min(1, ((state.phi ?? 0) - 0.3) / 0.7));
      // the heartbeat: a sharp rise at each beat, decaying (the heart only)
      const beat = K.beat ? Math.exp(-((state.time * (state.bpm ?? 68) / 60) % 1) * 6) : 0;
      U.uTime.value = state.time;
      U.uFX.value = fx;
      U.uBeat.value = beat;
      U.uFog.value.copy(FOG).lerp(FOG_HIGH, 0.6 * fx + 0.25 * beat);
      scene.background.copy(U.uFog.value);
      // the neuron fires now and then by itself, more often as the field rises
      if (K.fire && pulseAt < 0 && Math.random() < (0.08 + 0.5 * fx) * dt) pulseAt = 0;
      if (pulseAt >= 0) { pulseAt += dt / 2.4; if (pulseAt > 1) pulseAt = -1; }
      U.uPulse.value = pulseAt;
      if (travel) {
        const t = Math.min(1, (performance.now() - travel.start) / 1400);
        const e = t * t * (3 - 2 * t);
        camera.position.copy(travel.from).lerp(travel.to, e);
        camera.lookAt(travel.look);
        if (t >= 1) { const done = travel.done; travel = null; camera.position.copy(ENTRANCE); done?.(); }
      } else {
        const yaw = 0.6 * Math.sin(state.time * 0.045);
        const eye = K.eye ?? { y: ENTRANCE.y, lookY: -2.6 };   // the mind chamber looks down onto the foam
        camera.position.set(ENTRANCE.x, eye.y + 0.15 * Math.sin(state.time * 0.3), ENTRANCE.z);
        target.set(Math.sin(yaw) * 14, eye.lookY + 1.6 * Math.sin(state.time * 0.037), ENTRANCE.z - Math.cos(yaw) * 14);
        camera.lookAt(target);
        applyLook(camera);
      }
      anatomy.update(dt, { ...state, fx }, beat);
      const mp = moteGeo.attributes.position;
      const top = R * SQUASH * 0.8;
      for (let i = 0; i < MOTES; i++) {
        let y = mp.getY(i) + dt * (0.12 + 0.3 * fx);
        if (y > top) y = -top;
        mp.setY(i, y);
      }
      mp.needsUpdate = true;
      for (const d of doors) d.ring.material.opacity = 0.7 + 0.3 * Math.sin(state.time * 1.4 + d.route.angle * 3);
      cars.forEach(c => { c.position.y = -1.1 + 5.4 * ((state.time * 0.08 + c.userData.phase) % 1); });
      // the signs follow the explorer's labels (off: a clean picture, for SNAP)
      for (const d of doors) d.label.visible = state.labels !== false;
      liftLabel.visible = state.labels !== false;
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

// the brain's great hall (the first atrium)
export const createGreatHall3D = () => createAtrium3D('brain');
