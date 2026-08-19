import * as THREE from 'three';

const canvas = document.querySelector('#operator');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x05070e, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070e, 0.1);
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0.55, 8.3);

const root = new THREE.Group();
scene.add(root);
const cyan = new THREE.Color('#14e5ff');
const violet = new THREE.Color('#8f47ff');
const pink = new THREE.Color('#ff3bce');
const blue = new THREE.Color('#287dff');
const gold = new THREE.Color('#f6c75a');
const emfGreen = new THREE.Color('#56f0a2');

function wireSphere(radius, color, position, scale = [1, 1, 1], opacity = 0.65) {
  const geometry = new THREE.SphereGeometry(radius, 18, 12);
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.fromArray(position);
  mesh.scale.fromArray(scale);
  root.add(mesh);
  return mesh;
}

function wireCapsule(radius, length, color, position, rotation = [0, 0, 0], opacity = 0.58) {
  const geometry = new THREE.CapsuleGeometry(radius, length, 6, 12);
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.fromArray(position);
  mesh.rotation.fromArray(rotation);
  root.add(mesh);
  return mesh;
}

function joint(position, radius = 0.1) {
  return wireSphere(radius, cyan, position, [1, 1, 1], 0.7);
}

// Symbolic male-coded body: an articulated field substrate, never a medical model.
const head = wireSphere(0.46, cyan, [0, 2.82, 0], [0.88, 1.1, 0.85]);
const neck = wireCapsule(0.15, 0.35, cyan, [0, 2.32, 0]);
const chest = wireCapsule(0.68, 1.18, cyan, [0, 1.42, 0], [0, 0, 0], 0.48);
chest.scale.set(1.12, 1, 0.62);
const waist = wireCapsule(0.4, 0.6, cyan, [0, 0.42, 0], [0, 0, 0], 0.48);
waist.scale.set(1.12, 1, 0.68);
const pelvis = wireSphere(0.55, cyan, [0, -0.3, 0], [1.16, 0.72, 0.62], 0.48);
const body = [head, neck, chest, waist, pelvis];

function bone(a, b, radius = 0.09) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const direction = end.clone().sub(start);
  const mesh = wireCapsule(radius, Math.max(0.05, direction.length() - radius * 2), cyan, start.clone().add(end).multiplyScalar(0.5).toArray(), [0, 0, 0], 0.68);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}
const shoulders = [[-0.92, 1.85, 0], [0.92, 1.85, 0]];
const elbows = [[-1.28, 0.72, 0.02], [1.28, 0.72, 0.02]];
const wrists = [[-1.45, -0.3, 0.06], [1.45, -0.3, 0.06]];
const hips = [[-0.38, -0.55, 0], [0.38, -0.55, 0]];
const knees = [[-0.46, -1.88, 0.04], [0.46, -1.88, 0.04]];
const ankles = [[-0.5, -3.02, 0], [0.5, -3.02, 0]];
const limbs = [
  bone(shoulders[0], elbows[0]), bone(elbows[0], wrists[0]), bone(shoulders[1], elbows[1]), bone(elbows[1], wrists[1]),
  bone(hips[0], knees[0], 0.11), bone(knees[0], ankles[0], 0.1), bone(hips[1], knees[1], 0.11), bone(knees[1], ankles[1], 0.1),
  ...[...shoulders, ...elbows, ...wrists, ...hips, ...knees, ...ankles].map(point => joint(point)),
];

// Physical nervous system: electrical pathways through the complete body.
const neural = new THREE.Group();
root.add(neural);
const neuralMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.82 });
const spinePoints = [];
for (let y = -0.2; y < 2.45; y += 0.11) spinePoints.push(new THREE.Vector3(Math.sin(y * 8) * 0.03, y, 0.11));
neural.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(spinePoints), neuralMaterial));
for (let index = 0; index < 12; index += 1) {
  const y = 1.55 + index * 0.07;
  const endpoint = new THREE.Vector3((index % 2 ? -1 : 1) * (0.22 + (index % 3) * 0.08), y + 0.2, 0.06);
  neural.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, y, 0.11), endpoint]), neuralMaterial));
}

const nerveRoutes = [
  [[0, 1.85, 0.08], shoulders[0], elbows[0], wrists[0]],
  [[0, 1.85, 0.08], shoulders[1], elbows[1], wrists[1]],
  [[0, -0.28, 0.08], hips[0], knees[0], ankles[0]],
  [[0, -0.28, 0.08], hips[1], knees[1], ankles[1]],
];
for (const route of nerveRoutes) {
  neural.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(route.map(point => new THREE.Vector3(...point))), neuralMaterial));
  for (let index = 0; index < route.length - 1; index += 1) {
    const start = new THREE.Vector3(...route[index]);
    const end = new THREE.Vector3(...route[index + 1]);
    const direction = end.clone().sub(start);
    const segment = wireCapsule(0.027, Math.max(0.02, direction.length() - 0.05), gold, start.clone().add(end).multiplyScalar(0.5).toArray(), [0, 0, 0], 0.86);
    segment.material.wireframe = false;
    segment.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    neural.add(segment);
  }
}

const brainPhysical = wireSphere(0.33, gold, [0, 2.84, 0.06], [1.0, 0.7, 0.86], 0.92);
brainPhysical.material.wireframe = false;
brainPhysical.material.opacity = 0.62;
const cortex = wireSphere(0.52, pink, [0, 2.9, 0.02], [1.08, 0.76, 0.95], 0.34);
const limbicCore = wireSphere(0.27, violet, [0, 1.7, 0.1], [1.15, 0.72, 0.82], 0.85);
const somaCore = wireSphere(0.82, pink, [0, 0.42, 0.03], [0.88, 1.35, 0.62], 0.22);

// Green EMF response shell: a full-body propagator field sourced by neural activity.
const emfField = new THREE.Group();
root.add(emfField);
const emfShell = wireCapsule(1.08, 4.5, emfGreen, [0, 0.08, -0.03], [0, 0, 0], 0.12);
emfShell.scale.set(1.08, 1, 0.72);
emfField.add(emfShell);
const emfHalo = wireCapsule(1.28, 4.72, emfGreen, [0, 0.08, -0.05], [0, 0, 0], 0.035);
emfHalo.scale.set(1.02, 1, 0.62);
emfField.add(emfHalo);
const emfCloudPositions = [];
for (let index = 0; index < 420; index += 1) {
  const angle = Math.random() * Math.PI * 2;
  const height = -2.75 + Math.random() * 5.8;
  const radius = 0.95 + Math.random() * 0.5;
  emfCloudPositions.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius * 0.6);
}
const emfCloud = new THREE.Points(
  new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(emfCloudPositions, 3)),
  new THREE.PointsMaterial({ color: emfGreen, size: 0.025, transparent: true, opacity: 0.18 }),
);
emfField.add(emfCloud);

// BRECVEMA: eight peripheral mechanism channels converging on the D8 limbic core.
const brecvemaLayer = new THREE.Group();
root.add(brecvemaLayer);
const mechanismNames = ['BS', 'RE', 'EC', 'CO', 'VI', 'EM', 'ME', 'AJ'];
const mechanismAnchors = [
  [-0.72, 2.1, 0.08], [0.72, 2.1, 0.08], [-1.05, 1.1, 0.1], [1.05, 1.1, 0.1],
  [-0.92, 0.1, 0.12], [0.92, 0.1, 0.12], [-0.52, -0.62, 0.1], [0.52, -0.62, 0.1],
];
const mechanismMaterial = new THREE.MeshBasicMaterial({ color: pink, transparent: true, opacity: 0.95 });
const mechanismLineMaterial = new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.6 });
for (const [index, anchor] of mechanismAnchors.entries()) {
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 1), mechanismMaterial);
  node.position.fromArray(anchor); brecvemaLayer.add(node);
  brecvemaLayer.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...anchor), new THREE.Vector3(0, 1.7, 0.1)]), mechanismLineMaterial));
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 96; labelCanvas.height = 48;
  const labelContext = labelCanvas.getContext('2d');
  labelContext.font = 'bold 24px monospace'; labelContext.fillStyle = '#ff3bce'; labelContext.fillText(mechanismNames[index], 4, 28);
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(labelCanvas), transparent: true }));
  label.position.set(anchor[0] + (anchor[0] < 0 ? -0.18 : 0.18), anchor[1] + 0.1, 0.14); label.scale.set(0.34, 0.17, 1); brecvemaLayer.add(label);
}
brecvemaLayer.visible = false;

function ring(radius, color, y) {
  const ringGeometry = new THREE.TorusGeometry(radius, 0.018, 8, 72);
  const ringMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 });
  const mesh = new THREE.Mesh(ringGeometry, ringMaterial);
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = y;
  root.add(mesh);
  return mesh;
}
const somaticRing = ring(1.06, cyan, 0.12);
const limbicRing = ring(0.9, violet, 1.68);
const thresholdRing = ring(0.64, pink, 2.86);
const somaDimensions = [-0.82, -0.48, -0.12, 0.25].map((y, index) => ring(0.78 + index * 0.09, index % 2 ? cyan : pink, y));
const emfContours = [-1.55, -0.3, 0.95, 2.2].map((y, index) => {
  const contour = ring(1.14 + index * 0.08, emfGreen, y);
  contour.rotation.y = index % 2 ? Math.PI / 5 : -Math.PI / 6;
  contour.material.opacity = 0.16;
  emfField.add(contour);
  return contour;
});

const fieldLabels = [
  ['BODY', 'D1-4 / SOMA', cyan, [0, -2.5, 0]],
  ['NERVES', 'D5-7 / ELECTRICAL P.N.S.', gold, [2.65, 0.25, 0]],
  ['LIMBIC', 'D8 / COUPLING', violet, [2.65, 1.48, 0]],
  ['MIND', 'D9-11 / CORTEX FIELD', pink, [2.45, 2.63, 0]],
  ['EMF', 'GREEN FUNCTION / WHOLE-BODY RESPONSE', emfGreen, [2.45, -1.12, 0]],
];
for (const [label, detail, color, position] of fieldLabels) {
  const sprite = document.createElement('canvas');
  sprite.width = 640; sprite.height = 150;
  const context = sprite.getContext('2d');
  const hex = `#${color.getHexString()}`;
  context.fillStyle = 'rgba(5, 7, 14, 0.74)'; context.fillRect(0, 0, 640, 150);
  context.strokeStyle = hex; context.lineWidth = 3; context.strokeRect(2, 2, 636, 146);
  context.font = 'bold 58px sans-serif'; context.fillStyle = hex; context.fillText(label, 22, 68);
  context.font = 'bold 20px monospace'; context.fillStyle = '#eaf5ff'; context.fillText(detail, 24, 112);
  const texture = new THREE.CanvasTexture(sprite);
  const marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.96 }));
  marker.position.fromArray(position); marker.scale.set(2.16, 0.5, 1); scene.add(marker);
}

const grid = new THREE.GridHelper(12, 30, 0x12384b, 0x0b1928);
grid.position.y = -2.78;
scene.add(grid);

const stars = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: cyan, size: 0.018, transparent: true, opacity: 0.55 }));
const starPositions = [];
for (let index = 0; index < 650; index += 1) starPositions.push((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 2);
stars.geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
scene.add(stars);

const scaleProfiles = [
  ['QUANTUM FOAM', 'k0 = lP^-1', 'M11 = M4 x P3 x L1 x C3'], ['STRING SCALE', 'Gstring(s,s\') = -(alpha\'/2) ln|s-s\'|^2', 'SHO = Green function'],
  ['NUCLEAR', 'Gnuc(r) = e^(-mpi r) / (4 pi r)', 'massive carrier'], ['ATOMIC', 'GEM(r) = 1 / (4 pi r)', 'massless Coulomb limit'],
  ['MOLECULAR', '(nabla^2 + k^2) G = delta', 'conformational attractors'], ['CELLULAR / NEURAL', 'E(s) = -(1/2) s^T W s', 'synaptic transfer'],
  ['BRAIN / CEMI', 'phi >= Tc = sqrt(2)', 'physical brain field / threshold'], ['ORGANISM', '(nabla^2 + k^2) G = delta', 'nervous electricity -> full-body EMF response'],
  ['ANIMAL SWARM', 'G replaces iterative messaging', 'macroscopic brane projection'], ['SOCIETY / CITY', 'P(si -> 1) = sigma(sum Gij sj - theta)', 'social kernel'],
  ['GEOLOGICAL', 'k = omega / vP', 'seismic Green function'], ['PLANETARY', '(nabla^2 + k^2) G = delta', 'planetary modes'],
  ['ORBITAL', 'G(r) ~ 1/r', 'gravitational propagation'], ['STELLAR', 'G(r) ~ 1/r', 'stellar field'],
  ['COMPACT OBJECT', 'GR propagator', 'boundary geometry'], ['GALACTIC', 'Gsigma = Gsigma+1', 'scale covariance'],
  ['GALACTIC HALO', 'OmegaDM = 3/11', 'spatial vacuum fraction'], ['LARGE SCALE', 'k(sigma) = k0 / Lambda^sigma', 'geometric RG flow'],
  ['COSMIC WEB', 'Lambda : sigma -> k(sigma)', 'type-safe scale invariance'], ['OBSERVABLE UNIVERSE', 'LambdaUSF = (21/11) H0^2 / c^2', 'OmegaDM = 3/11 / Omegavac = 7/11'],
];
const state = { somatic: 0.72, limbic: 0.86, cognitive: 0.46, scale: 7, brecvema: false };
for (const name of ['somatic', 'limbic', 'cognitive', 'scale']) document.querySelector(`#${name}`).addEventListener('input', event => { state[name] = Number(event.target.value); updateScaleReadout(); });
const scaleReadout = document.querySelector('#scale-readout');
const equationTitle = document.querySelector('#equation-title');
const equationPrimary = document.querySelector('#equation-primary');
const equationSecondary = document.querySelector('#equation-secondary');
const brecvemaButton = document.querySelector('#brecvema');
function updateScaleReadout() {
  const [label, equation, detail] = scaleProfiles[state.scale];
  scaleReadout.textContent = `SIGMA ${String(state.scale).padStart(2, '0')} / ${label}`;
  equationTitle.textContent = `ACTIVE SCALE: ${label}`;
  equationPrimary.textContent = equation;
  equationSecondary.textContent = detail;
}
brecvemaButton.addEventListener('click', () => {
  state.brecvema = !state.brecvema;
  brecvemaLayer.visible = state.brecvema;
  brecvemaButton.classList.toggle('active', state.brecvema);
  brecvemaButton.setAttribute('aria-pressed', String(state.brecvema));
  brecvemaButton.textContent = state.brecvema ? 'BRECVEMA / P.N.S. ACTIVE' : 'BRECVEMA / P.N.S.';
});
updateScaleReadout();

function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const clock = new THREE.Clock();
function frame() {
  const time = clock.getElapsedTime();
  root.rotation.y = Math.sin(time * 0.18) * 0.24;
  root.rotation.x = Math.sin(time * 0.13) * 0.035;
  const scaleFraction = state.scale / 19;
  root.scale.setScalar(1);
  brecvemaLayer.rotation.y = time * 0.16;
  const somaticPulse = 1 + state.somatic * (0.08 + Math.sin(time * 2.2) * 0.05);
  somaticRing.scale.setScalar(somaticPulse * (1 + scaleFraction * 0.12)); somaticRing.material.opacity = 0.25 + state.somatic * 0.7;
  somaCore.material.opacity = 0.08 + state.somatic * 0.42;
  for (const [index, layer] of somaDimensions.entries()) {
    layer.scale.setScalar(1 + scaleFraction * 0.16 + state.somatic * (0.08 + index * 0.025) + Math.sin(time * 1.6 + index) * 0.025);
    layer.material.opacity = 0.18 + state.somatic * 0.5;
  }
  limbicRing.scale.setScalar(1 + state.limbic * (0.12 + Math.sin(time * 1.5) * 0.07)); limbicRing.material.opacity = 0.2 + state.limbic * 0.75;
  limbicCore.material.opacity = 0.2 + state.limbic * 0.75;
  thresholdRing.position.y = 2.4 + state.cognitive * 0.75; thresholdRing.material.opacity = 0.2 + state.cognitive * 0.8;
  cortex.material.opacity = 0.18 + state.cognitive * 0.75;
  brainPhysical.material.opacity = 0.3 + state.cognitive * 0.65;
  neuralMaterial.opacity = 0.3 + state.cognitive * 0.62;
  const emfAmplitude = 0.06 + (state.somatic + state.cognitive) * 0.1;
  emfShell.material.opacity = emfAmplitude;
  emfHalo.material.opacity = emfAmplitude * 0.5;
  emfCloud.material.opacity = 0.06 + state.cognitive * 0.2;
  emfCloud.material.size = 0.015 + state.cognitive * 0.025;
  emfCloud.rotation.y = time * 0.045;
  emfShell.scale.set(1.08 + Math.sin(time * 1.4) * state.cognitive * 0.035, 1 + Math.sin(time * 1.2) * 0.025, 0.72);
  for (const [index, contour] of emfContours.entries()) {
    contour.scale.setScalar(1 + state.cognitive * 0.16 + Math.sin(time * 1.1 + index) * 0.045);
    contour.material.opacity = 0.05 + state.cognitive * 0.18;
  }
  stars.material.size = 0.018 + scaleFraction * 0.032;
  stars.material.opacity = 0.28 + scaleFraction * 0.52;
  for (const mesh of body) mesh.material.opacity = 0.32 + state.somatic * 0.52;
  for (const line of limbs) line.material.opacity = 0.35 + state.somatic * 0.55;
  renderer.render(scene, camera); requestAnimationFrame(frame);
}
frame();

document.querySelector('#export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'soma-field-operator.png';
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
});
