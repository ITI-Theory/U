// brain3d.js: THE GLASS BRAIN (ISS-052: "the brain with the limbic structures inside a translucent
// cortex, orbiting"). Opt-in at the BRAIN stop (GLASS, `glass=1`); the 2D diagram stays the default and
// the Atlas's plate. A see-through cortex (two hemispheres, the light at their rims), and inside it the
// limbic system: the amygdala, the hippocampus, the fornix arching to the mammillary bodies, the
// thalamus, the hypothalamus, the cingulate gyrus over the corpus callosum. Sourced for which
// structure lies where (OpenStax A&P 2e), schematic in shape and size. At 11D the brain's field rings
// out from the limbic core (CEMI, open hypothesis), at the band the frequency elevator chose.

import * as THREE from 'three';
import { updateStereo } from './stereo-depth.js';

const PARTS = [
  { label: 'THALAMUS', color: '#8ecbff', at: [[-0.28, 0.05, 0], [0.28, 0.05, 0]], r: 0.3 },
  { label: 'HYPOTHALAMUS', color: '#ffd166', at: [[0, -0.42, 0.25]], r: 0.18 },
  { label: 'AMYGDALA', color: '#ff4d5e', at: [[-0.95, -0.55, 0.45], [0.95, -0.55, 0.45]], r: 0.17 },
  { label: 'MAMMILLARY BODIES', color: '#ff7aa8', at: [[-0.08, -0.55, 0.05], [0.08, -0.55, 0.05]], r: 0.07 },
  { label: 'HIPPOCAMPUS', color: '#ffd166', tube: s => [[s * 0.95, -0.6, 0.3], [s * 1.0, -0.55, -0.2], [s * 0.85, -0.3, -0.7], [s * 0.6, 0.0, -0.85]], r: 0.11 },
  { label: 'FORNIX', color: '#a78bfa', tube: s => [[s * 0.6, 0.0, -0.85], [s * 0.3, 0.55, -0.6], [s * 0.12, 0.65, 0.0], [s * 0.08, 0.3, 0.3], [s * 0.08, -0.5, 0.08]], r: 0.05 },
  { label: 'CINGULATE GYRUS', color: '#5ee7ff', tube: s => [[s * 0.15, 0.55, 1.1], [s * 0.15, 0.95, 0.4], [s * 0.15, 1.0, -0.4], [s * 0.15, 0.8, -1.1], [s * 0.15, 0.3, -1.35]], r: 0.1 },
  { label: 'CORPUS CALLOSUM', color: '#e8eefc', tube: () => [[0, 0.45, 0.9], [0, 0.72, 0.2], [0, 0.72, -0.5], [0, 0.5, -1.05]], r: 0.06, opacity: 0.45 },
];

function sprite(text, color) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 64;
  const g = c.getContext('2d');
  g.font = '700 28px "Space Mono", monospace';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = color; g.shadowBlur = 10;
  g.fillStyle = color;
  g.fillText(text, 256, 32);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, depthTest: false }));
  s.scale.set(1.1, 0.14, 1);
  return s;
}

export function createBrain3D() {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true }); } catch { return null; }
  const canvas = renderer.domElement;
  canvas.className = 'explorer__gl';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05060f');
  const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 50);
  const stereo = new THREE.StereoCamera();
  const size = new THREE.Vector2();
  scene.add(new THREE.AmbientLight('#5060a0', 0.9));
  const key = new THREE.PointLight('#ffffff', 2.2, 20);
  key.position.set(2, 3, 4);
  scene.add(key);

  // the cortex: two hemispheres, see-through, lit at the rims (a fresnel), gyri as a ripple
  const glass = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uPhi: { value: 0.5 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; varying vec3 vP; void main(){ vP = position; vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: `uniform float uTime; uniform float uPhi; varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){ float rim = pow(1.0 - abs(dot(vN, vV)), 2.5);
        float gyri = 0.5 + 0.5 * sin(vP.x * 14.0 + sin(vP.y * 9.0) * 2.0 + vP.z * 11.0);
        vec3 c = mix(vec3(0.35, 0.45, 1.0), vec3(1.0, 0.45, 0.8), uPhi) * (rim * (0.55 + 0.35 * gyri) + 0.04);
        gl_FragColor = vec4(c, rim * 0.9 + 0.05); }`,
  });
  for (const s of [-1, 1]) {
    const h = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), glass);
    h.scale.set(0.82, 1.0, 1.55);
    h.position.set(s * 0.72, 0.25, 0);
    scene.add(h);
  }
  // the limbic system inside
  const labels = [];
  for (const p of PARTS) {
    const mat = new THREE.MeshStandardMaterial({ color: p.color, emissive: p.color, emissiveIntensity: 0.5, roughness: 0.45, transparent: true, opacity: p.opacity ?? 0.92 });
    let anchor;
    if (p.tube) {
      for (const side of p.label === 'CORPUS CALLOSUM' ? [1] : [-1, 1]) {
        const curve = new THREE.CatmullRomCurve3(p.tube(side).map(q => new THREE.Vector3(...q)));
        scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, p.r, 12, false), mat));
        anchor ??= curve.getPointAt(0.5);
      }
    } else {
      for (const at of p.at) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(p.r, 24, 16), mat);
        m.position.set(...at);
        if (p.label === 'AMYGDALA') m.scale.set(1, 0.8, 1.4);
        scene.add(m);
      }
      anchor = new THREE.Vector3(...p.at[p.at.length - 1]);
    }
    const tag = sprite(p.label, p.color);
    tag.position.copy(anchor).add(new THREE.Vector3(0, p.r + 0.16, 0));
    scene.add(tag);
    labels.push(tag);
  }
  // the field (11D): shells ringing out from the limbic core
  const shells = [0, 1, 2, 3].map(() => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), new THREE.MeshBasicMaterial({ color: '#5ee7ff', wireframe: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(m);
    return m;
  });
  let orbit = 0.6, last = 0;
  return {
    canvas,
    glass: true,
    resize(w, h, dpr) { renderer.setPixelRatio(dpr); renderer.setSize(w, h, false); },
    // state: { time, phi, dim, stereo, labels, hz (the band's rate, 0 none), bandColor, slow }
    render(state) {
      const dt = Math.min(0.05, last ? state.time - last : 0.016);
      last = state.time;
      orbit += dt * 0.12;
      camera.position.set(Math.sin(orbit) * 5.2, 1.2 + 0.4 * Math.sin(state.time * 0.07), Math.cos(orbit) * 5.2);
      camera.lookAt(0, 0.05, 0);
      glass.uniforms.uTime.value = state.time;
      glass.uniforms.uPhi.value = state.phi ?? 0.5;
      for (const l of labels) l.visible = state.labels !== false;
      const field = (state.dim ?? 11) >= 11;
      const period = state.hz ? (state.slow ?? 20) / state.hz : 1.6 - 0.6 * (state.phi ?? 0.5);
      shells.forEach((m, k) => {
        const f = ((state.time / period) + k / shells.length) % 1;
        m.visible = field;
        m.scale.setScalar(0.2 + 2.2 * f);
        m.material.opacity = field ? 0.18 * (1 - f) : 0;
        if (state.bandColor) m.material.color.set(state.bandColor);
      });
      renderer.getSize(size);
      if (state.stereo === 'half' || state.stereo === 'full') {
        camera.aspect = state.stereo === 'half' ? size.x / size.y : size.x / 2 / size.y;
        camera.updateProjectionMatrix();
        camera.updateMatrixWorld();
        updateStereo(stereo, camera, 0.08);
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
