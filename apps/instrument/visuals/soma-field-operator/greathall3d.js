// greathall3d.js: the brain's great hall (ISS-103), the first hub. Every elevator exit should
// open into a place with routes going off it, as a game's hub world does; here it is the
// atrium of the lateral ventricle, the ventricles' real great hall, where the body, the
// occipital and the temporal horns meet and the choroid plexus is largest (the glomus). Drawn
// as a flooded cave (the ventricles hold cerebrospinal fluid): a vaulted dome of dark stone
// with neon veins, light falling through the water from above, the glomus hanging as a
// chandelier of tissue curtains, the arachnoid's web-like trabeculae (the arachnoid is named
// for the spider's web) as strands in the water, a few jellyfish, and five doorways: the
// cathedral (down to the fourth ventricle), the limbic hinge (the temporal horn), the path of
// a thought, the mind palace, the arteries (back the way in). The elevator at the entrance
// goes to any level. FX (Φ) brightens the veins and lets the walls give way, as in the palace
// (the 11D manifold, not a building). Proportions are for the eye; the real atrium is about a
// centimetre across. Interpretive: a place for the mind, built on anatomy.

import { updateStereo } from './stereo-depth.js';
import * as THREE from 'three';
import { applyLook } from './look.js';

const PINK = new THREE.Color('#ff3bce');
const BLUE = new THREE.Color('#14e5ff');
const R = 14;              // the hall's radius (scene units)
const SQUASH = 0.62;       // the dome's height to its width
const FOG = new THREE.Color('#070519');
const ENTRANCE = new THREE.Vector3(0, -4.4, 9.6);

export const HALL_ROUTES = [
  { id: 'cathedral', angle: 0, label: 'THE CATHEDRAL', sub: 'down the foramen and the aqueduct to the fourth ventricle', color: '#a78bfa' },
  { id: 'limbic', angle: -0.95, label: 'THE LIMBIC HINGE', sub: 'the temporal horn: the hippocampus beneath, the amygdala ahead', color: '#ff7aa8' },
  { id: 'path', angle: 0.95, label: 'THE PATH OF A THOUGHT', sub: 'a thought, from the body to the cortex', color: '#ffd166' },
  { id: 'palace', angle: -1.95, label: 'THE MIND PALACE', sub: 'twenty-one floors: the method of loci', color: '#5ee7ff' },
  { id: 'wayin', angle: 1.95, label: 'THE ARTERIES', sub: 'back the way in, to the heart', color: '#ff4d5e' },
];

const NOISE = /* glsl */`
float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise3(vec3 x) {
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1, 0, 0)), f.x), mix(hash3(i + vec3(0, 1, 0)), hash3(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0, 0, 1)), hash3(i + vec3(1, 0, 1)), f.x), mix(hash3(i + vec3(0, 1, 1)), hash3(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise3(p); p *= 2.03; a *= 0.5; } return s; }
`;

// a soft round point (motes, bubbles)
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

// a label in the water: the route's name and a line under it
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
  g.fillText(sub.length > 46 ? `${sub.slice(0, sub.lastIndexOf(' ', 46))}` : sub, 512, 172);
  if (sub.length > 46) g.fillText(sub.slice(sub.lastIndexOf(' ', 46) + 1), 512, 220);
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

export function createGreatHall3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = FOG.clone();
  const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 120);
  const stereo = new THREE.StereoCamera();
  stereo.eyeSep = 0.06;
  const size = new THREE.Vector2();
  const rnd = rand(1714);
  const dot = softDot();
  const U = { uTime: { value: 0 }, uFX: { value: 0 }, uPulse: { value: -1 }, uFog: { value: FOG.clone() }, uPink: { value: PINK }, uBlue: { value: BLUE } };

  // THE VAULT: an ellipsoid seen from inside, its stone raised by fractal noise; FX folds it
  const vault = new THREE.Mesh(new THREE.SphereGeometry(R, 192, 128), new THREE.ShaderMaterial({
    uniforms: U,
    side: THREE.BackSide,
    vertexShader: /* glsl */`
      uniform float uTime; uniform float uFX;
      varying vec3 vPos; varying float vDepth;
      ${NOISE}
      void main() {
        vec3 p = position;
        vec3 n = normalize(normal);
        float f = fbm(p * 0.16 + vec3(0.0, uTime * 0.015, 0.0));
        float a = atan(p.z, p.x);
        float fold = sin(3.0 * a + uTime * 0.6 + p.y * 0.35) * sin(p.y * 0.45 - uTime * 0.4);
        p -= n * (3.4 * (f - 0.45) + uFX * uFX * 1.8 * fold);
        vPos = p * vec3(1.0, ${SQUASH.toFixed(2)}, 1.0);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; uniform float uPulse; uniform vec3 uFog; uniform vec3 uPink; uniform vec3 uBlue;
      varying vec3 vPos; varying float vDepth;
      ${NOISE}
      void main() {
        float f = fbm(vPos * 0.32);
        vec3 col = mix(vec3(0.035, 0.022, 0.09), vec3(0.15, 0.07, 0.26), f);
        // veins: thin bright lines where a slower noise crosses its levels, pink high, blue low
        float lv = fbm(vPos * 0.11 + vec3(0.0, 0.0, uTime * 0.01)) * 7.0;
        float vein = smoothstep(0.43, 0.49, abs(fract(lv) - 0.5));
        vec3 vc = mix(uBlue, uPink, smoothstep(-6.0, 6.0, vPos.y));
        col += vc * vein * (0.5 + 1.4 * uFX);
        // the field's glow in the stone, pink above and blue below, rising with FX
        col += vc * (0.04 + 0.16 * uFX) * (0.6 + 0.8 * f);
        // caustics: light through the water from the oculus, strongest high on the walls
        float c = sin(vPos.x * 0.9 + uTime * 0.8) * sin(vPos.z * 0.9 - uTime * 0.6) + 0.5 * sin((vPos.x + vPos.z) * 0.6 + uTime);
        col += vec3(0.25, 0.55, 0.95) * pow(abs(c), 3.0) * 0.14 * smoothstep(-4.0, 7.0, vPos.y);
        // POKE: a ring of the field's light spreading from the chandelier
        if (uPulse >= 0.0) {
          float d = length(vPos - vec3(0.0, 4.0, 0.0));
          col += mix(uPink, uBlue, 0.5) * exp(-pow((d - uPulse * 20.0) * 0.5, 2.0)) * (1.0 - uPulse) * 1.4;
        }
        float fog = 1.0 - exp(-vDepth * vDepth * 0.0022);
        gl_FragColor = vec4(mix(col, uFog, fog * 0.8), 1.0);
      }`,
  }));
  vault.scale.set(1, SQUASH, 1);
  scene.add(vault);

  // LIGHT FROM ABOVE: shafts through the water from an opening in the vault
  const shaftMat = new THREE.ShaderMaterial({
    uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: /* glsl */`
      uniform float uTime; uniform float uFX; varying vec2 vUv;
      void main() {
        float a = pow(vUv.y, 1.6) * (0.06 + 0.05 * uFX) * (0.75 + 0.25 * sin(uTime * 0.7 + vUv.x * 40.0));
        gl_FragColor = vec4(vec3(0.55, 0.8, 1.0) * a, 1.0);
      }`,
  });
  for (let k = 0; k < 6; k++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.4 + rnd() * 1.6, 15, 40, 1, true), shaftMat);
    cone.position.set((rnd() - 0.5) * 5, 1.2, (rnd() - 0.5) * 5);
    cone.rotation.set((rnd() - 0.5) * 0.35, 0, (rnd() - 0.5) * 0.35);
    scene.add(cone);
  }

  // THE GLOMUS: the choroid plexus at its largest, hanging from the vault as curtains of tissue
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
  // its lights: small glowing knots among the curtains
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

  // THE WEBS: the arachnoid's trabeculae as strands in the water, sagging a little
  {
    const pts = [];
    for (let k = 0; k < 420; k++) {
      const dir = new THREE.Vector3(rnd() - 0.5, (rnd() - 0.5) * 1.2, rnd() - 0.5).normalize();
      const a = new THREE.Vector3(dir.x * R * 0.82, dir.y * R * SQUASH * 0.8, dir.z * R * 0.82);
      const b = a.clone().add(new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).multiplyScalar(5 + rnd() * 5));
      b.multiplyScalar(0.92);
      const len = a.distanceTo(b);
      let prev = a;
      for (let s = 1; s <= 8; s++) {
        const t = s / 8;
        const p = a.clone().lerp(b, t);
        p.y -= Math.sin(Math.PI * t) * len * 0.06;
        pts.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
        prev = p;
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: '#9fe8ff', transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })));
  }

  // JELLYFISH: a few, drifting, pulsing
  const jellies = [];
  for (let k = 0; k < 6; k++) {
    const color = k % 2 ? PINK : BLUE;
    const j = new THREE.Group();
    const bell = new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    j.add(bell);
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

  // MOTES: fine particles rising slowly through the fluid
  const MOTES = 1400;
  const motePos = new Float32Array(MOTES * 3);
  for (let i = 0; i < MOTES; i++) motePos.set([(rnd() - 0.5) * R * 1.6, (rnd() - 0.5) * R * SQUASH * 1.6, (rnd() - 0.5) * R * 1.6], i * 3);
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.Float32BufferAttribute(motePos, 3));
  const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({ map: dot, color: '#cfe8ff', size: 0.07, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(motes);

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
  const doors = HALL_ROUTES.map(route => {
    const dir = new THREE.Vector3(Math.sin(route.angle), 0, -Math.cos(route.angle));
    const at = new THREE.Vector3(dir.x * R * 0.7, -3.4, dir.z * R * 0.7);
    const g = new THREE.Group();
    g.position.copy(at);
    g.lookAt(0, -3.4, 0);
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
  lift.position.set(4.4, -4.4, 3.2);
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 5.4, 40, 1, true),
    new THREE.MeshBasicMaterial({ color: '#5ee7ff', transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  column.position.y = 1.6;
  const cars = [0, 1, 2].map(k => {
    const c = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.035, 8, 64), new THREE.MeshBasicMaterial({ color: '#5ee7ff' }));
    c.rotation.x = Math.PI / 2;
    c.userData.phase = k / 3;
    lift.add(c);
    return c;
  });
  const liftLabel = textSprite('ELEVATOR', 'from this thought to any level', '#5ee7ff');
  liftLabel.position.set(0, 4.9, 0);
  liftLabel.scale.set(4, 1, 1);
  lift.add(column, liftLabel);
  scene.add(lift);

  let last = 0;
  let travel = null;
  let pulseAt = -1;
  const ray = new THREE.Raycaster();
  const target = new THREE.Vector3();

  return {
    canvas,
    // a route chosen: glide towards its doorway, then hand over (done)
    route(id, done) {
      const d = doors.find(x => x.route.id === id);
      if (!d || travel) return;
      travel = { from: camera.position.clone(), to: d.at.clone().lerp(new THREE.Vector3(0, -3.4, 0), 0.12), look: d.at.clone(), start: performance.now(), t: 0, done };
    },
    // the doorway or the elevator under a screen point (fractions from the centre)
    pick(fx, fy) {
      ray.setFromCamera(new THREE.Vector2(fx * 2, -fy * 2), camera);
      const hits = ray.intersectObjects([...doors.map(d => d.disc), column], false);
      if (!hits.length) return null;
      if (hits[0].object === column) return 'elevator';
      return doors.find(d => d.disc === hits[0].object)?.route.id ?? null;
    },
    pulse() { pulseAt = 0; },
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, phi, stereo, labels }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      const fx = Math.max(0, Math.min(1, ((state.phi ?? 0) - 0.3) / 0.7));
      U.uTime.value = state.time;
      U.uFX.value = fx;
      U.uFog.value.copy(FOG).lerp(new THREE.Color('#1a0f3a'), 0.6 * fx);
      scene.background.copy(U.uFog.value);
      if (pulseAt >= 0) { pulseAt += dt / 2.4; if (pulseAt > 1) pulseAt = -1; }
      U.uPulse.value = pulseAt;
      // the camera: at the entrance, looking round the hall; or gliding to a chosen doorway
      if (travel) {
        travel.t = Math.min(1, (performance.now() - travel.start) / 1400);   // the wall clock: 1.4 s at any frame rate
        const e = travel.t * travel.t * (3 - 2 * travel.t);
        camera.position.copy(travel.from).lerp(travel.to, e);
        camera.lookAt(travel.look);
        if (travel.t >= 1) { const done = travel.done; travel = null; camera.position.copy(ENTRANCE); done?.(); }
      } else {
        const yaw = 0.6 * Math.sin(state.time * 0.045);
        camera.position.copy(ENTRANCE).add(new THREE.Vector3(0, 0.15 * Math.sin(state.time * 0.3), 0));
        target.set(Math.sin(yaw) * 14, -2.6 + 1.6 * Math.sin(state.time * 0.037), ENTRANCE.z - Math.cos(yaw) * 14);
        camera.lookAt(target);
        applyLook(camera);
      }
      chandelier.rotation.y += dt * 0.02;
      for (const j of jellies) {
        const u = j.userData;
        u.a += dt * u.speed;
        j.position.set(Math.cos(u.a) * u.r, u.y + 0.6 * Math.sin(state.time * 0.3 + u.phase), Math.sin(u.a) * u.r);
        const beat = 1 + 0.16 * Math.sin(state.time * 1.8 + u.phase);
        j.scale.set(beat, 2 - beat, beat);
      }
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
