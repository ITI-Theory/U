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
const rockProjection = new THREE.Group();
scene.add(rockProjection);
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
const fieldLabelMarkers = [];
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
  marker.position.fromArray(position); marker.scale.set(2.16, 0.5, 1); scene.add(marker); fieldLabelMarkers.push(marker);
}

const grid = new THREE.GridHelper(12, 30, 0x12384b, 0x0b1928);
grid.position.y = -2.78;
scene.add(grid);

const stars = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: cyan, size: 0.018, transparent: true, opacity: 0.55 }));
const starPositions = [];
for (let index = 0; index < 650; index += 1) starPositions.push((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 2);
stars.geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
scene.add(stars);

// 4D projection: inert spacetime worldline and planetary/rock shell.
const rockMaterial = new THREE.MeshBasicMaterial({ color: 0x7e858d, wireframe: true, transparent: true, opacity: 0 });
const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 3), rockMaterial);
rock.position.set(0, 0, 0);
rockProjection.add(rock);
const worldline = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -3.5, 0), new THREE.Vector3(0, 3.5, 0)]),
  new THREE.LineBasicMaterial({ color: 0x9ba3ad, transparent: true, opacity: 0 }),
);
rockProjection.add(worldline);

const scaleProfiles = [
  ['QUANTUM FOAM', '10^-35 m', '10^35 m^-1', 'infinity'], ['STRING SCALE', '10^-32 m', '10^32 m^-1', '10^500'],
  ['NUCLEAR', '10^-15 m', '10^15 m^-1', '10^5'], ['ATOMIC', '10^-10 m', '10^10 m^-1', '10^2'],
  ['MOLECULAR', '10^-9 m', '10^9 m^-1', '10^3'], ['CELLULAR / NEURAL', '10^-6 m', '10^3 m^-1', '10^4'],
  ['BRAIN / CEMI', '10^-1 m', '40 m^-1', '10^14'], ['ORGANISM', '10^0 m', 'k_tissue', '10^14-10^15'],
  ['HUMAN / VERTEBRATE', '10^0-10^1 m', 'k_tissue', '11D active'], ['SOCIETY / CITY', '10^3 m', '10^-3 m^-1', '10^3 modes'],
  ['GEOLOGICAL', '10^5 m', 'omega / vP', 'earth modes'], ['PLANETARY', '10^6 m', 'k_planet', '1'],
  ['ORBITAL', '10^9 m', '1/r', '1'], ['STELLAR', '10^11 m', '1/r', '1'],
  ['COMPACT OBJECT', '10^10 m', 'k_GR', '1'], ['GALACTIC', '10^20 m', 'k_gal', '1'],
  ['GALACTIC HALO', '10^22 m', 'k_halo', '1'], ['LARGE SCALE', '10^24 m', 'k0 / Lambda^17', '1'],
  ['COSMIC WEB', '10^25 m', 'k0 / Lambda^18', '1'], ['OBSERVABLE UNIVERSE', '10^26 m', 'H0 / c', '1'],
];
const state = { somatic: 0.72, limbic: 0.86, cognitive: 0.46, scale: 8, brecvema: false };
for (const name of ['somatic', 'limbic', 'cognitive', 'scale']) document.querySelector(`#${name}`).addEventListener('input', event => { state[name] = Number(event.target.value); updateScaleReadout(); });
const scaleReadout = document.querySelector('#scale-readout');
const equationTitle = document.querySelector('#equation-title');
const equationPrimary = document.querySelector('#equation-primary');
const equationSecondary = document.querySelector('#equation-secondary');
const projectionReadout = document.querySelector('#projection-readout');
const dimensionReadout = document.querySelector('#dimension-readout');
const wavenumberReadout = document.querySelector('#wavenumber-readout');
const lengthReadout = document.querySelector('#length-readout');
const rankReadout = document.querySelector('#rank-readout');
const typeStatus = document.querySelector('#type-status');
const brecvemaButton = document.querySelector('#brecvema');
function updateScaleReadout() {
  const [label, length, wavenumber, rank] = scaleProfiles[state.scale];
  const isHuman = state.scale === 8;
  const isFeeling = state.scale === 6;
  const isProjection = state.scale >= 12;
  scaleReadout.textContent = `SIGMA ${String(state.scale).padStart(2, '0')} / ${label}`;
  projectionReadout.textContent = isHuman ? '11D THINKING MIND / M11 ACTIVE' : isFeeling ? '8D FEELING ORGANISM / M4 + P3 + L1' : isProjection ? '4D SPACETIME PROJECTION / M4 ONLY' : 'PROPAGATOR-BOUND SCALE STATE';
  equationTitle.textContent = `DEPENDENT PAIR AT SIGMA ${String(state.scale).padStart(2, '0')}`;
  equationPrimary.textContent = 'SomaField = SUM(sigma:Scale20) Substrate(sigma)';
  equationSecondary.textContent = 'Lambda: Substrate(sigma) -> Substrate(sigma + 1)';
  dimensionReadout.textContent = isHuman ? 'M4 + P3 + L1 + C3 = 11D' : isFeeling ? 'M4 + P3 + L1 = 8D' : isProjection ? 'M4 = 4D / worldline only' : 'Substrate-dependent projection';
  wavenumberReadout.textContent = wavenumber;
  lengthReadout.textContent = length;
  rankReadout.textContent = rank;
  typeStatus.textContent = isHuman ? 'LEAN: SCALE-COMPATIBLE / HUMAN OPERATORS ENABLED' : isFeeling ? 'LEAN: FEELING ORGANISM / CORTEX UNAVAILABLE' : isProjection ? 'LEAN TYPE ERROR: BRECVEMA REQUIRES ORGANISM SUBSTRATE' : 'LEAN: SCALE TRANSITION / SUBSTRATE CONSTRAINED';
  typeStatus.classList.toggle('error', !isHuman && state.brecvema);
}
brecvemaButton.addEventListener('click', () => {
  state.brecvema = !state.brecvema;
  brecvemaLayer.visible = state.brecvema;
  brecvemaButton.classList.toggle('active', state.brecvema);
  brecvemaButton.setAttribute('aria-pressed', String(state.brecvema));
  brecvemaButton.textContent = state.brecvema ? 'BRECVEMA / P.N.S. ACTIVE' : 'BRECVEMA / P.N.S.';
  updateScaleReadout();
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
  const humanWeight = Math.max(0, 1 - Math.abs(state.scale - 8) / 2);
  const feelingWeight = Math.max(0, 1 - Math.abs(state.scale - 6) / 3);
  const rockWeight = state.scale >= 12 ? Math.min(1, (state.scale - 11) / 3) : 0;
  const isProjection = state.scale >= 12;
  root.visible = !isProjection;
  for (const marker of fieldLabelMarkers) marker.visible = !isProjection;
  root.scale.setScalar(1);
  root.position.y = 0;
  rockProjection.scale.setScalar(0.75 + rockWeight * 0.75);
  rockMaterial.opacity = rockWeight * 0.75;
  worldline.material.opacity = rockWeight * 0.78;
  brecvemaLayer.rotation.y = time * 0.16;
  const somaticPulse = 1 + state.somatic * (0.08 + Math.sin(time * 2.2) * 0.05);
  somaticRing.scale.setScalar(somaticPulse * (1 + scaleFraction * 0.12)); somaticRing.material.opacity = 0.25 + state.somatic * 0.7;
  somaCore.material.opacity = (0.08 + state.somatic * 0.42) * Math.max(feelingWeight, humanWeight);
  for (const [index, layer] of somaDimensions.entries()) {
    layer.scale.setScalar(1 + scaleFraction * 0.16 + state.somatic * (0.08 + index * 0.025) + Math.sin(time * 1.6 + index) * 0.025);
    layer.material.opacity = 0.18 + state.somatic * 0.5;
  }
  limbicRing.scale.setScalar(1 + state.limbic * (0.12 + Math.sin(time * 1.5) * 0.07)); limbicRing.material.opacity = (0.2 + state.limbic * 0.75) * feelingWeight;
  limbicCore.material.opacity = (0.2 + state.limbic * 0.75) * feelingWeight;
  thresholdRing.position.y = 2.4 + state.cognitive * 0.75; thresholdRing.material.opacity = (0.2 + state.cognitive * 0.8) * humanWeight;
  cortex.material.opacity = (0.18 + state.cognitive * 0.75) * humanWeight;
  brainPhysical.material.opacity = (0.3 + state.cognitive * 0.65) * humanWeight;
  neuralMaterial.opacity = (0.3 + state.cognitive * 0.62) * feelingWeight;
  const emfAmplitude = 0.06 + (state.somatic + state.cognitive) * 0.1;
  emfShell.material.opacity = emfAmplitude * feelingWeight;
  emfHalo.material.opacity = emfAmplitude * 0.5 * feelingWeight;
  emfCloud.material.opacity = (0.06 + state.cognitive * 0.2) * feelingWeight;
  emfCloud.material.size = 0.015 + state.cognitive * 0.025;
  emfCloud.rotation.y = time * 0.045;
  emfShell.scale.set(1.08 + Math.sin(time * 1.4) * state.cognitive * 0.035, 1 + Math.sin(time * 1.2) * 0.025, 0.72);
  for (const [index, contour] of emfContours.entries()) {
    contour.scale.setScalar(1 + state.cognitive * 0.16 + Math.sin(time * 1.1 + index) * 0.045);
    contour.material.opacity = (0.05 + state.cognitive * 0.18) * feelingWeight;
  }
  stars.material.size = 0.018 + scaleFraction * 0.032;
  stars.material.opacity = 0.28 + scaleFraction * 0.52;
  for (const mesh of body) mesh.material.opacity = (0.18 + state.somatic * 0.5) * (1 - rockWeight * 0.9);
  for (const line of limbs) line.material.opacity = (0.25 + state.somatic * 0.5) * (1 - rockWeight * 0.9);
  renderer.render(scene, camera); requestAnimationFrame(frame);
}
frame();

document.querySelector('#export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'soma-field-operator.png';
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
});
