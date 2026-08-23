import * as THREE from 'three';
import { getPlate, lenses } from './theory-atlas.js';
import { appraisalDimensions, bodyGrid } from './human-affect.js';
import { cheatSheetSections, displayPresets, getPathEdge, getScaleCheatSheet, getScalePath, scalePaths } from './cheat-sheet-registry.js';
import { getScaleMorphism } from './scale-morphisms.js';
import { getSceneCoverageSummary, namedSolutionCoverage, sceneCoverage } from './scene-coverage.js';
import { canonicalBands, expandCanonicalRange, getUSFModel, usfModels, zoomEquation } from './zoom-implementations.js';
import { zUSFAbstract, zUSFAbstractSource } from './zusf-abstract.js';

const abstractSplash = document.querySelector('#abstract-splash');
const abstractSplashCopy = document.querySelector('#abstract-splash-copy');
const abstractSplashSource = document.querySelector('#abstract-splash-source');
const abstractSplashEnter = document.querySelector('#abstract-splash-enter');

abstractSplashCopy.replaceChildren(...zUSFAbstract.split('\n\n').map((paragraph) => {
  const element = document.createElement('p');
  element.textContent = paragraph;
  return element;
}));
abstractSplashSource.textContent = `SOURCE / ${zUSFAbstractSource}`;
abstractSplashEnter.addEventListener('click', () => {
  sessionStorage.setItem('zusf-abstract-acknowledged', 'true');
  abstractSplash.hidden = true;
});
if (sessionStorage.getItem('zusf-abstract-acknowledged') === 'true') abstractSplash.hidden = true;

const atlasCoverageLedger = document.querySelector('#atlas-coverage-ledger');
const atlasCoverageSummary = getSceneCoverageSummary();
const atlasCoverageHeading = document.createElement('p');
atlasCoverageHeading.className = 'atlas-coverage__summary';
atlasCoverageHeading.textContent = `${atlasCoverageSummary.dedicated} / ${atlasCoverageSummary.total} DEDICATED SCENES | ${atlasCoverageSummary.remaining} REMAINING`;
const atlasCoverageList = document.createElement('ul');
for (const entry of sceneCoverage) {
  const item = document.createElement('li');
  item.className = `atlas-coverage__item atlas-coverage__item--${entry.status}`;
  item.textContent = `${String(entry.sigma).padStart(2, '0')} / ${entry.label} / ${entry.status.toUpperCase()}`;
  atlasCoverageList.append(item);
}
const namedCoverage = document.createElement('p');
namedCoverage.className = 'atlas-coverage__named';
namedCoverage.textContent = `NAMED SOLUTIONS / ${namedSolutionCoverage.map((entry) => `${entry.id.toUpperCase()}: ${entry.status.toUpperCase()}`).join(' | ')}`;
atlasCoverageLedger.append(atlasCoverageHeading, atlasCoverageList, namedCoverage);

const canvas = document.querySelector('#operator');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x05070e, 1);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070e, 0.1);
scene.add(new THREE.AmbientLight(0x87dfff, 1.3));
const cellKeyLight = new THREE.PointLight(0x56f0a2, 14, 18);
cellKeyLight.position.set(-3, 4, 6);
scene.add(cellKeyLight);
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0.35, 9.2);
const overheadCamera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 100);
overheadCamera.position.set(0, 12, 0);
overheadCamera.up.set(0, 0, -1);
overheadCamera.lookAt(0, 0, 0);

const backgroundScene = new THREE.Scene();
const backgroundCamera = new THREE.Camera();
const backgroundMaterial = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  depthTest: false,
  uniforms: {
    uTime: { value: 0 },
    uScale: { value: 8 },
    uLevel: { value: 11 },
    uPath: { value: 0 },
    uPower: { value: 6.1 },
    uFold: { value: 1.5 },
    uFlight: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uDepth: { value: 0.28 },
    uQuality: { value: 0.6 },
    uSomatic: { value: 0.72 },
    uLimbic: { value: 0.86 },
    uCognitive: { value: 0.46 },
    uPulse: { value: 0 },
  },
  vertexShader: 'void main() { gl_Position = vec4(position, 1.0); }',
  fragmentShader: `
    uniform float uTime, uScale, uLevel, uPath, uPower, uFold, uFlight, uDepth, uQuality, uSomatic, uLimbic, uCognitive, uPulse;
    uniform vec2 uResolution;
    #define MAX_STEPS 56
    #define MAX_ITER 11
    mat2 rotate(float angle) { float c = cos(angle), s = sin(angle); return mat2(c, -s, s, c); }
    float mandelbulb(vec3 point, float power, float fold) {
      vec3 z = point; float derivative = 1.0; float radius = 0.0;
      for (int iteration = 0; iteration < MAX_ITER; iteration++) {
        radius = length(z);
        if (radius > 3.2) break;
        float theta = acos(clamp(z.z / max(radius, 0.0001), -1.0, 1.0));
        float phi = atan(z.y, z.x);
        derivative = pow(radius, power - 1.0) * power * derivative + 1.0;
        float raised = pow(radius, power);
        theta *= power; phi *= power;
        z = raised * vec3(sin(theta) * cos(phi), sin(phi) * sin(theta), cos(theta)) + point;
        z.xy = rotate(fold * 0.18) * z.xy;
      }
      return 0.5 * log(radius) * radius / derivative;
    }
    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
      float sector = floor(uScale / 4.0);
      vec3 micro = vec3(0.08, 0.78, 0.95);
      vec3 network = vec3(0.12, 0.95, 0.58);
      vec3 organism = vec3(0.95, 0.17, 0.62);
      vec3 collective = vec3(0.98, 0.70, 0.20);
      vec3 cosmic = vec3(0.25, 0.36, 1.0);
      vec3 color = sector < 1.0 ? micro : sector < 2.0 ? network : sector < 3.0 ? organism : sector < 4.0 ? collective : cosmic;
      float power = uPower + uLevel * 0.05;
      float fold = uFold + uSomatic * 0.45 + uLimbic * 0.25;
      if (uPath > 0.5 && uPath < 1.5) {
        if (uScale < 4.5) { color = vec3(0.14, 0.52, 1.0); power = 9.1; fold = 4.2; }
        else if (uScale < 7.5) { color = vec3(0.08, 0.92, 0.58); power = 7.3; fold = 2.9; }
        else if (uScale < 10.5) { color = vec3(1.0, 0.22, 0.64); power = 6.4; fold = 2.1; }
        else if (uScale < 14.5) { color = vec3(1.0, 0.62, 0.16); power = 5.8; fold = 1.7; }
        else { color = vec3(0.26, 0.42, 1.0); power = 5.4; fold = 1.35; }
      }
      if (uPath > 1.5 && uPath < 2.5) { color = vec3(0.10, 0.95, 0.72); power = 7.2; fold = 2.4; }
      if (uPath > 2.5 && uPath < 3.5) { color = vec3(1.0, 0.55, 0.18); power = 8.7; fold = 3.8; }
      vec3 rayOrigin = vec3(0.0, 0.0, -3.6 + 0.55 * sin(uTime * 0.12 + sector) + uFlight * 2.8);
      vec3 rayDirection = normalize(vec3(uv, 1.35));
      rayDirection.xy = rotate(0.12 * sin(uTime * 0.08 + uScale)) * rayDirection.xy;
      float distanceTravelled = 0.0; float distanceEstimate = 0.0; float glow = 0.0;
      for (int step = 0; step < MAX_STEPS; step++) {
        vec3 samplePoint = rayOrigin + rayDirection * distanceTravelled;
        samplePoint.xy = rotate(uTime * 0.055 + sector * 0.16) * samplePoint.xy;
        samplePoint += 0.10 * sin(samplePoint.zxy * (1.8 + uCognitive * 2.4) + uTime * 0.18);
        distanceEstimate = mandelbulb(samplePoint, power, fold);
        glow += exp(-20.0 * abs(distanceEstimate)) * 0.018;
        if (distanceEstimate < 0.002 || distanceTravelled > 8.0) break;
        distanceTravelled += distanceEstimate * mix(0.72, 1.12, uQuality);
      }
      float hit = distanceEstimate < 0.002 ? 1.0 : 0.0;
      float energy = 0.35 + uSomatic * 0.18 + uLimbic * 0.18 + uCognitive * 0.22 + uPulse * 0.75;
      float depthFade = exp(-0.20 * distanceTravelled);
      vec3 field = color * (hit * (0.35 + 0.65 * depthFade) + glow * 2.5) * energy;
      field += color.bgr * glow * 0.35;
      gl_FragColor = vec4(field, uDepth * (uLevel == 4.0 ? 0.45 : uLevel == 8.0 ? 0.72 : 1.0));
    }
  `,
});
backgroundScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial));

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
const physicalGrey = new THREE.Color('#8c98a5');

const fractalProfiles = [
  { power: 9.5, fold: 4.8, speed: 1.7, color: '#3d6dff' },
  { power: 8.6, fold: 3.7, speed: 1.45, color: '#17e7ff' },
  { power: 7.8, fold: 3.1, speed: 1.25, color: '#ff3bce' },
  { power: 6.7, fold: 2.6, speed: 1.05, color: '#56f0a2' },
  { power: 6.2, fold: 2.2, speed: 0.92, color: '#f6c75a' },
  { power: 5.9, fold: 1.9, speed: 0.78, color: '#56f0a2' },
  { power: 5.6, fold: 1.6, speed: 0.66, color: '#14e5ff' },
  { power: 6.1, fold: 1.5, speed: 0.52, color: '#ff3bce' },
  { power: 7.2, fold: 2.4, speed: 0.46, color: '#14e5ff' },
  { power: 8.1, fold: 3.1, speed: 0.38, color: '#f6c75a' },
  { power: 9.0, fold: 3.9, speed: 0.3, color: '#287dff' },
];
const starflight = { active: 0, direction: 1, lastScale: 8 };
const starfieldCount = 1800;
const flightStarPositions = new Float32Array(starfieldCount * 3);
const starSeeds = new Float32Array(starfieldCount);
for (let index = 0; index < starfieldCount; index += 1) {
  const radius = 1.2 + Math.random() * 20;
  const angle = Math.random() * Math.PI * 2;
  flightStarPositions[index * 3] = Math.cos(angle) * radius;
  flightStarPositions[index * 3 + 1] = (Math.random() - 0.5) * 11;
  flightStarPositions[index * 3 + 2] = -Math.random() * 30;
  starSeeds[index] = Math.random();
}
const starfieldGeometry = new THREE.BufferGeometry();
starfieldGeometry.setAttribute('position', new THREE.BufferAttribute(flightStarPositions, 3));
const starfield = new THREE.Points(starfieldGeometry, new THREE.PointsMaterial({ color: cyan, size: 0.025, transparent: true, opacity: 0.34, depthWrite: false }));
scene.add(starfield);

function updateStarflight(delta, profile, pulse) {
  starflight.active = Math.max(0, starflight.active - delta / 0.95);
  const speed = profile.speed * (starflight.active > 0 ? 18 : 0.28) * starflight.direction;
  for (let index = 0; index < starfieldCount; index += 1) {
    const offset = index * 3;
    flightStarPositions[offset + 2] += speed * delta * (0.55 + starSeeds[index]);
    if (flightStarPositions[offset + 2] > 2 || flightStarPositions[offset + 2] < -32) {
      const radius = 1.2 + starSeeds[index] * 20;
      const angle = starSeeds[index] * 29.7 + index * 0.17;
      flightStarPositions[offset] = Math.cos(angle) * radius;
      flightStarPositions[offset + 1] = Math.sin(angle * 1.7) * radius * 0.55;
      flightStarPositions[offset + 2] = starflight.direction > 0 ? -32 : 2;
    }
  }
  starfieldGeometry.attributes.position.needsUpdate = true;
  starfield.material.color.set(profile.color);
  starfield.material.opacity = 0.18 + starflight.active * 0.7 + pulse * 0.2;
  starfield.material.size = 0.018 + starflight.active * 0.09 + pulse * 0.025;
}

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

const gaussianTextureCanvas = document.createElement('canvas');
gaussianTextureCanvas.width = 128;
gaussianTextureCanvas.height = 128;
const gaussianContext = gaussianTextureCanvas.getContext('2d');
const gaussianGradient = gaussianContext.createRadialGradient(64, 64, 2, 64, 64, 64);
gaussianGradient.addColorStop(0, 'rgba(255,255,255,0.94)');
gaussianGradient.addColorStop(0.16, 'rgba(86,240,162,0.56)');
gaussianGradient.addColorStop(0.5, 'rgba(20,229,255,0.18)');
gaussianGradient.addColorStop(1, 'rgba(20,229,255,0)');
gaussianContext.fillStyle = gaussianGradient;
gaussianContext.fillRect(0, 0, 128, 128);
const gaussianTexture = new THREE.CanvasTexture(gaussianTextureCanvas);
const jointField = new THREE.Group();
root.add(jointField);
const jointAnchors = [...shoulders, ...elbows, ...wrists, ...hips, ...knees, ...ankles];
const jointGaussians = jointAnchors.map((anchor, index) => {
  const field = new THREE.Sprite(new THREE.SpriteMaterial({
    map: gaussianTexture,
    color: index % 3 === 0 ? pink : index % 3 === 1 ? cyan : emfGreen,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }));
  field.position.fromArray(anchor);
  jointField.add(field);
  return field;
});

function updateJointField(time, pulse, visibility) {
  jointField.visible = visibility > 0.01;
  for (const [index, field] of jointGaussians.entries()) {
    const phase = time * 1.15 + index * 0.71;
    const amplitude = 0.7 + Math.sin(phase) * 0.18 + pulse * 0.42;
    field.scale.setScalar(amplitude);
    field.material.opacity = visibility * (0.19 + Math.sin(phase) * 0.05 + pulse * 0.16);
  }
}

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

// L1: homeostatic axis as a visible double-well potential and tunnelling barrier.
const limbicWell = new THREE.Group();
root.add(limbicWell);
const wellMaterial = new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.82 });
const wellPoints = [];
for (let index = 0; index <= 80; index += 1) {
  const x = -0.72 + index / 80 * 1.44;
  const y = (x * x - 0.26) ** 2 * 2.7;
  wellPoints.push(new THREE.Vector3(x, y, 0));
}
const wellCurve = new THREE.Line(new THREE.BufferGeometry().setFromPoints(wellPoints), wellMaterial);
wellCurve.position.set(0, 0.9, 0.62);
limbicWell.add(wellCurve);
const barrier = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0.9, 0.62), new THREE.Vector3(0, 1.44, 0.62)]),
  new THREE.LineBasicMaterial({ color: pink, transparent: true, opacity: 0.72 }),
);
limbicWell.add(barrier);

// C3: a compact matrix/fractal proxy emerging inside the head, not the physical brain.
const mindFractal = new THREE.Group();
root.add(mindFractal);
const fractalMaterial = new THREE.MeshBasicMaterial({ color: pink, wireframe: true, transparent: true, opacity: 0.72 });
for (let index = 0; index < 42; index += 1) {
  const phase = index * 2.399963;
  const radius = 0.08 + (index % 7) * 0.045;
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.035 + (index % 3) * 0.012, 1), fractalMaterial);
  node.position.set(Math.cos(phase) * radius, 2.9 + Math.sin(phase * 1.7) * radius * 0.62, Math.sin(phase) * radius * 0.5);
  mindFractal.add(node);
}

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
const mechanisms = [
  { id: 'B', visual: 'B', name: 'Brainstem reflex', effect: 'Fast sensory salience enters the field as a transient source.', parameter: 'J(t)', action: 'Injects a transient source into the field', equation: '\\gamma\\dot{\\mathbf{e}}=-\\nabla H(\\mathbf{e})+J(t)' },
  { id: 'R', visual: 'R', name: 'Rhythmic entrainment', effect: 'A periodic drive brings body and musical rhythm into synchronisation.', parameter: '\\gamma', action: 'Modulates damping and phase locking', equation: '|\\omega_{\\mathrm{ext}}-\\omega_0|<\\Delta\\omega_{\\mathrm{lock}}(\\kappa)' },
  { id: 'E1', visual: 'EC', name: 'Evaluative conditioning', effect: 'Learned associations alter what the field expects from a cue.', parameter: '\\mathbf{b}', action: 'Shifts the attractor bias vector', equation: 'H(\\mathbf{e})=\\tfrac12\\mathbf{e}^\\top W\\mathbf{e}-\\mathbf{b}^\\top\\mathbf{e}' },
  { id: 'C', visual: 'C', name: 'Emotional contagion', effect: 'Another person acts as a coupled external field.', parameter: '\\kappa', action: 'Changes coupling to an external field', equation: '\\dot{\\phi}_1-\\dot{\\phi}_2\\to0\\quad(\\kappa>\\kappa_{\\min})' },
  { id: 'V', visual: 'V', name: 'Visual imagery', effect: 'Internally generated imagery supplies an endogenous source trajectory.', parameter: 'J_{\\mathrm{internal}}(t)', action: 'Adds an endogenous source trajectory', equation: '\\Phi=\\Phi^{(0)}+G_R\\ast(J_{\\mathrm{external}}+J_{\\mathrm{internal}})' },
  { id: 'E2', visual: 'EM', name: 'Episodic memory', effect: 'Past events re-enter the present through the memory kernel.', parameter: 'K(\\tau)', action: 'Reweights the memory kernel', equation: 'K(\\tau)=K_0e^{-\\tau/\\tau_m}\\theta(\\tau)' },
  { id: 'M', visual: 'ME', name: 'Musical expectancy', effect: 'Resolution and violation shape temporary attractor wells and barriers.', parameter: '\\Delta V', action: 'Creates transient wells and barriers', equation: '\\langle T\\rangle\\propto e^{\\Delta V/D}' },
  { id: 'A', visual: 'AJ', name: 'Aesthetic judgement', effect: 'Appraisal of form and value shifts cognitive preference in the field.', parameter: '\\mathbf{b}', action: 'Shifts the cognitive bias vector', equation: 'H(\\mathbf{e})\\mapsto H(\\mathbf{e})-\\Delta\\mathbf{b}^\\top\\mathbf{e}' },
];
const mechanismAnchors = [
  [-0.72, 2.1, 0.08], [0.72, 2.1, 0.08], [-1.05, 1.1, 0.1], [1.05, 1.1, 0.1],
  [-0.92, 0.1, 0.12], [0.92, 0.1, 0.12], [-0.52, -0.62, 0.1], [0.52, -0.62, 0.1],
];
const mechanismMaterial = new THREE.MeshBasicMaterial({ color: pink, transparent: true, opacity: 0.95 });
const mechanismChannels = [];
for (const [index, anchor] of mechanismAnchors.entries()) {
  const mechanism = mechanisms[index];
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.07, 1), mechanismMaterial);
  node.position.fromArray(anchor); brecvemaLayer.add(node);
  const lineMaterial = new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0.6 });
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...anchor), new THREE.Vector3(0, 1.7, 0.1)]), lineMaterial);
  brecvemaLayer.add(line);
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 96; labelCanvas.height = 48;
  const labelContext = labelCanvas.getContext('2d');
  labelContext.font = 'bold 24px monospace'; labelContext.fillStyle = '#ff3bce'; labelContext.fillText(mechanism.visual, 4, 28);
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(labelCanvas), transparent: true }));
  label.position.set(anchor[0] + (anchor[0] < 0 ? -0.18 : 0.18), anchor[1] + 0.1, 0.14); label.scale.set(0.34, 0.17, 1); brecvemaLayer.add(label);
  mechanismChannels.push({ id: mechanism.id, node, line, label });
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
  ['M4 BODY', 'D1-4 / PHYSICAL BRAIN + NERVES', cyan, [0, -2.5, 0], 4],
  ['P3 PROPAGATOR', 'D5-7 / GREEN EMF RESPONSE', emfGreen, [2.65, 0.25, 0], 8],
  ['L1 LIMBIC', 'D8 / HOMEOSTATIC COUPLING', violet, [2.65, 1.48, 0], 8],
  ['C3 MIND', 'D9-11 / CORTEX FIELD', pink, [0.2, 3.82, 0], 11],
];
const fieldLabelMarkers = [];
for (const [label, detail, color, position, level] of fieldLabels) {
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
  marker.position.fromArray(position); marker.scale.set(2.16, 0.5, 1); scene.add(marker); fieldLabelMarkers.push({ marker, level });
}

const grid = new THREE.GridHelper(12, 30, 0x12384b, 0x0b1928);
grid.position.y = -2.78;
scene.add(grid);

const stars = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: cyan, size: 0.018, transparent: true, opacity: 0.55 }));
const starPositions = [];
for (let index = 0; index < 650; index += 1) starPositions.push((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8 - 2);
stars.geometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
scene.add(stars);

// Every scale owns three abstract layers: substrate (4D), response (8D), and
// organization contour (11D). Positions are continuously retyped while zooming.
const scaleField = new THREE.Group();
scene.add(scaleField);
const morphologyPointCount = 196;
const morphologyLayers = [
  { key: 'physical', color: physicalGrey, size: 0.045, level: 4 },
  { key: 'response', color: emfGreen, size: 0.055, level: 8 },
  { key: 'integration', color: pink, size: 0.045, level: 11 },
].map(config => {
  const positions = new Float32Array(morphologyPointCount * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: config.color, size: config.size, transparent: true, opacity: 0, sizeAttenuation: true });
  const points = new THREE.Points(geometry, material);
  scaleField.add(points);
  return { ...config, positions, geometry, material, points };
});

// At sigma 0, render transient cross-sections instead of another undifferentiated
// point cloud: an emergence, separation, and recombination motif for the vacuum field.
const quantumFoam = new THREE.Group();
const quantumFoamRings = Array.from({ length: 18 }, (_, index) => {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.26, 0.012, 8, 32),
    new THREE.MeshBasicMaterial({ color: index % 2 ? cyan : pink, transparent: true, opacity: 0 }),
  );
  quantumFoam.add(ring);
  return ring;
});
scene.add(quantumFoam);
const quantumSurfaceGeometry = new THREE.PlaneGeometry(8.4, 5.2, 32, 22);
const quantumSurface = new THREE.Mesh(
  quantumSurfaceGeometry,
  new THREE.MeshBasicMaterial({ color: cyan, wireframe: true, transparent: true, opacity: 0, depthWrite: false }),
);
quantumSurface.rotation.x = -Math.PI / 2;
quantumSurface.position.y = -1.55;
quantumFoam.add(quantumSurface);
const quantumThreshold = new THREE.Mesh(
  new THREE.PlaneGeometry(8.4, 5.2),
  new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
);
quantumThreshold.rotation.x = -Math.PI / 2;
quantumThreshold.position.y = -0.73;
quantumFoam.add(quantumThreshold);
const quantumMatter = Array.from({ length: 32 }, (_, index) => {
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: cyan, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  const particle = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  halo.visible = false;
  particle.visible = false;
  quantumFoam.add(halo, particle);
  return { halo, particle, active: false, bornAt: -Infinity, x: 0, z: 0, height: 0 };
});
const quantumEmf = new THREE.Group();
const quantumEmfContours = Array.from({ length: quantumMatter.length }, (_, index) => {
  const contour = new THREE.Mesh(
    new THREE.TorusGeometry(0.28, 0.026, 10, 48),
    new THREE.MeshBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  quantumEmf.add(contour);
  return contour;
});
const quantumEmfLinks = new THREE.LineSegments(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false }),
);
quantumEmf.add(quantumEmfLinks);
scene.add(quantumEmf);
const densityCanvas = document.createElement('canvas');
densityCanvas.width = 160;
densityCanvas.height = 100;
const densityContext = densityCanvas.getContext('2d');
const densityTexture = new THREE.CanvasTexture(densityCanvas);
densityTexture.colorSpace = THREE.SRGBColorSpace;
const densityMap = new THREE.Mesh(
  new THREE.PlaneGeometry(9.6, 6),
  new THREE.MeshBasicMaterial({ map: densityTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
);
densityMap.rotation.x = -Math.PI / 2;
densityMap.position.y = -1.5;
densityMap.visible = false;
scene.add(densityMap);
let lastDensityMapUpdate = 0;
const cellularField = new THREE.Group();
cellularField.visible = false;
scene.add(cellularField);
const cellSeeds = [
  [-2.65, 1.26, 0.66], [-1.12, 1.38, 0.52], [0.55, 1.34, 0.68], [2.27, 1.22, 0.54],
  [-2.08, -0.28, 0.62], [-0.32, -0.18, 0.75], [1.48, -0.3, 0.6],
  [-1.13, -1.62, 0.58], [0.72, -1.56, 0.72],
];
function createCellularDomain([x, y, radius], index) {
  const membraneGeometry = new THREE.SphereGeometry(radius, 18, 14);
  const vertices = membraneGeometry.attributes.position;
  for (let vertex = 0; vertex < vertices.count; vertex += 1) {
    const point = new THREE.Vector3(vertices.getX(vertex), vertices.getY(vertex), vertices.getZ(vertex));
    const direction = point.normalize();
    const irregularity = 1 + 0.07 * Math.sin(direction.x * 5 + index) * Math.cos(direction.y * 4 - index)
      + 0.035 * Math.sin(direction.z * 7 + index * 1.7);
    vertices.setXYZ(vertex, direction.x * radius * irregularity, direction.y * radius * irregularity, direction.z * radius * irregularity);
  }
  vertices.needsUpdate = true;
  membraneGeometry.computeVertexNormals();
  const group = new THREE.Group();
  group.position.set(x, y, 0.15 - index * 0.015);
  const cytoplasm = new THREE.Mesh(
    membraneGeometry,
    new THREE.MeshPhongMaterial({ color: 0x117d87, emissive: 0x062e38, transparent: true, opacity: 0.38, shininess: 95, depthWrite: false }),
  );
  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.025, 18, 14),
    new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.19, side: THREE.BackSide, depthWrite: false }),
  );
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.29, 12, 8), new THREE.MeshPhongMaterial({ color: pink, emissive: 0x4b092f, transparent: true, opacity: 0.9, shininess: 100, depthWrite: false }));
  nucleus.position.set(radius * 0.22, radius * 0.16, radius * 0.28);
  const nucleusOutline = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.305, 12, 8),
    new THREE.MeshBasicMaterial({ color: 0xff8ee8, transparent: true, opacity: 0.28, side: THREE.BackSide, depthWrite: false }),
  );
  nucleusOutline.position.copy(nucleus.position);
  const halo = new THREE.Group();
  halo.add(new THREE.Mesh(new THREE.TorusGeometry(radius * 1.1, 0.012, 8, 32), new THREE.MeshBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending })));
  const organelles = new THREE.Group();
  const organelleMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.86 });
  for (const [side, direction] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) {
    const limb = new THREE.Mesh(new THREE.CapsuleGeometry(radius * 0.06, radius * 0.32, 4, 8), organelleMaterial);
    limb.position.set(side * radius * 0.38, direction * radius * 0.2, Math.sin(index + side * direction) * radius * 0.16);
    limb.rotation.z = side * direction * 0.72;
    const joint = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.07, 8, 6), organelleMaterial);
    joint.position.set(side * radius * 0.19, direction * radius * 0.1, limb.position.z);
    organelles.add(limb, joint);
  }
  group.add(cytoplasm, membrane, nucleus, nucleusOutline, halo, organelles);
  cellularField.add(group);
  return { group, cytoplasm, membrane, nucleus, nucleusOutline, halo, organelles, radius, baseX: x, baseY: y, phase: index * 0.73 };
}
const cellularDomains = cellSeeds.map(createCellularDomain);
const cellularLinks = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false }));
cellularField.add(cellularLinks);
const stellarField = new THREE.Group();
const stellarCore = new THREE.Mesh(new THREE.SphereGeometry(0.76, 20, 14), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
const stellarShell = new THREE.Mesh(new THREE.SphereGeometry(1.02, 18, 12), new THREE.MeshBasicMaterial({ color: 0xff7249, transparent: true, opacity: 0, side: THREE.BackSide, blending: THREE.AdditiveBlending }));
stellarField.add(stellarCore, stellarShell);
const stellarOrbits = [];
for (const [rotationX, rotationY, radius] of [[0, 0, 1.38], [Math.PI / 2, 0.3, 1.73], [0.65, Math.PI / 2, 2.1]]) {
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 56), new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false }));
  orbit.rotation.set(rotationX, rotationY, 0);
  stellarField.add(orbit);
  stellarOrbits.push(orbit);
}
const stellarNodes = [];
for (let index = 0; index < 8; index += 1) {
  const node = new THREE.Mesh(new THREE.SphereGeometry(0.1 + (index % 2) * 0.035, 10, 8), new THREE.MeshBasicMaterial({ color: index % 2 ? cyan : gold, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
  stellarField.add(node);
  stellarNodes.push(node);
}
stellarField.visible = false;
scene.add(stellarField);

const cosmicField = new THREE.Group();
const cosmicNodes = [];
const cosmicPositions = [
  [-2.9, 1.4, -0.4], [-1.45, 0.5, 0.2], [-0.25, 1.75, -0.2], [1.25, 0.72, 0.3], [2.85, 1.5, -0.35],
  [-2.35, -1.3, 0.2], [-0.75, -0.45, -0.1], [0.85, -1.48, 0.22], [2.3, -0.7, -0.25],
];
for (const [index, position] of cosmicPositions.entries()) {
  const node = new THREE.Mesh(new THREE.SphereGeometry(0.11 + (index % 3) * 0.045, 10, 8), new THREE.MeshBasicMaterial({ color: index % 2 ? blue : cyan, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
  node.position.fromArray(position);
  cosmicField.add(node);
  cosmicNodes.push(node);
}
const cosmicLinks = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0, depthWrite: false }));
cosmicField.add(cosmicLinks);
cosmicField.visible = false;
scene.add(cosmicField);
const quantumPreviousHeights = new Float32Array(759);
let quantumNextMatter = 0;

function updateCellularField(time, pulse) {
  const cellularBand = state.implementation === 'canonical-i-v' && state.scale === 4;
  const visible = cellularBand && state.viewMode === '3d';
  cellularField.visible = visible;
  for (const domain of cellularDomains) {
    domain.group.position.x = domain.baseX + Math.sin(time * 0.28 + domain.phase) * 0.12;
    domain.group.position.y = domain.baseY + Math.cos(time * 0.24 + domain.phase * 1.7) * 0.1;
    domain.group.position.z = Math.sin(time * 0.36 + domain.phase) * 0.45;
    const breathing = 1 + Math.sin(time * 1.25 + domain.phase) * 0.028 + pulse * 0.1;
    domain.group.scale.setScalar(breathing);
    domain.cytoplasm.material.opacity = 0.32 + pulse * 0.14;
    domain.membrane.material.opacity = 0.19 + pulse * 0.07;
    domain.nucleus.material.opacity = 0.82 + pulse * 0.18;
    domain.nucleusOutline.material.opacity = 0.28 + pulse * 0.12;
    domain.nucleus.scale.setScalar(1 + pulse * 0.12);
    for (const organelle of domain.organelles.children) organelle.material.opacity = 0.72 + pulse * 0.28;
    domain.halo.rotation.set(time * 0.18 + domain.phase, time * 0.27 - domain.phase, time * 0.34 + domain.phase);
    domain.halo.scale.setScalar(1 + Math.sin(time * 1.8 + domain.phase) * 0.05 + pulse * 0.2);
    for (const contour of domain.halo.children) contour.material.opacity = state.level === 8 ? 0.42 + pulse * 0.35 : 0;
  }
  const links = [];
  if (state.level === 8) for (let source = 0; source < cellularDomains.length; source += 1) {
    for (let target = source + 1; target < cellularDomains.length; target += 1) {
      const from = cellularDomains[source].group.position;
      const to = cellularDomains[target].group.position;
      if (from.distanceTo(to) < cellularDomains[source].radius + cellularDomains[target].radius + 0.26) links.push(from.x, from.y, from.z, to.x, to.y, to.z);
    }
  }
  cellularLinks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3));
  cellularLinks.material.opacity = visible && state.level === 8 ? 0.58 + pulse * 0.34 : 0;
}

function updateAstralFields(time, pulse) {
  const stellarVisible = state.implementation === 'canonical-i-v' && state.scale === 10;
  const cosmicVisible = state.implementation === 'canonical-i-v' && state.scale === 14;
  stellarField.visible = stellarVisible;
  cosmicField.visible = cosmicVisible;
  if (stellarVisible) {
    stellarCore.scale.setScalar(1 + Math.sin(time * 1.6) * 0.06 + pulse * 0.16);
    stellarCore.material.opacity = 0.78 + pulse * 0.22;
    stellarShell.scale.setScalar(1 + Math.sin(time * 0.7) * 0.1 + pulse * 0.2);
    stellarShell.material.opacity = 0.23 + pulse * 0.15;
    for (const [index, orbit] of stellarOrbits.entries()) {
      orbit.rotation.z = time * (0.12 + index * 0.04);
      orbit.material.opacity = 0.64 + pulse * 0.25;
    }
    for (const [index, node] of stellarNodes.entries()) {
      const angle = time * (0.32 + (index % 3) * 0.07) + index * Math.PI / 4;
      const radius = 1.4 + (index % 3) * 0.34;
      node.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.7) * radius * 0.48, Math.sin(angle) * 0.58);
      node.material.opacity = 0.78 + pulse * 0.22;
    }
  }
  if (cosmicVisible) {
    const links = [];
    for (const [index, node] of cosmicNodes.entries()) {
      node.position.z = Math.sin(time * 0.2 + index) * 0.34;
      node.scale.setScalar(1 + Math.sin(time * 0.72 + index) * 0.12 + pulse * 0.1);
      node.material.opacity = 0.8 + pulse * 0.2;
      if (index < cosmicNodes.length - 1) links.push(node.position.x, node.position.y, node.position.z, cosmicNodes[index + 1].position.x, cosmicNodes[index + 1].position.y, cosmicNodes[index + 1].position.z);
    }
    cosmicLinks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3));
    cosmicLinks.material.opacity = 0.54 + pulse * 0.3;
  }
}

function drawDensityMap(activeMatter, time, pulse) {
  const { width, height } = densityCanvas;
  const image = densityContext.createImageData(width, height);
  const data = image.data;
  const impulseRadius = 0.32 + state.responseTime * 4.8;
  for (let pixelY = 0; pixelY < height; pixelY += 1) {
    for (let pixelX = 0; pixelX < width; pixelX += 1) {
      const x = (pixelX / width - 0.5) * 9.6;
      const z = (pixelY / height - 0.5) * 6;
      let density = 0;
      for (const matter of activeMatter) {
        const age = time - matter.bornAt;
        density += Math.exp(-((x - matter.x) ** 2 + (z - matter.z) ** 2) / 3.1) * Math.max(0.5, 1 - age / 14);
      }
      const impulseDistance = Math.hypot(x, z);
      const impulseCore = Math.exp(-(impulseDistance ** 2) / 0.3) * pulse * 1.5;
      const impulseRing = Math.exp(-((impulseDistance - impulseRadius) ** 2) / 0.035) * pulse * 1.8;
      density += impulseCore + impulseRing;
      const contour = density > 0.03 && Math.abs((density * 8) % 1 - 0.5) < 0.052;
      const intensity = Math.min(1, density * 0.78);
      const offset = (pixelY * width + pixelX) * 4;
      data[offset] = Math.round(20 + 236 * intensity);
      data[offset + 1] = Math.round(30 + 216 * Math.min(1, intensity * 1.28));
      data[offset + 2] = Math.round(52 + 203 * (1 - intensity * 0.35));
      data[offset + 3] = Math.round((intensity * 0.68 + (contour ? 0.4 : 0)) * 255);
    }
  }
  densityContext.putImageData(image, 0, 0);
  densityTexture.needsUpdate = true;
}

function drawCellularDensityMap(time, pulse) {
  const { width, height } = densityCanvas;
  const image = densityContext.createImageData(width, height);
  const data = image.data;
  for (let pixelY = 0; pixelY < height; pixelY += 1) {
    for (let pixelX = 0; pixelX < width; pixelX += 1) {
      const x = (pixelX / width - 0.5) * 9.6;
      const z = (pixelY / height - 0.5) * 6;
      let cytoplasm = 0;
      let membrane = 0;
      let nucleus = 0;
      let emf = 0;
      for (const domain of cellularDomains) {
        const centerX = domain.group.position.x;
        const centerZ = domain.group.position.y;
        const distance = Math.hypot(x - centerX, z - centerZ);
        const contactPulse = Math.max(0, 1 - distance / domain.radius);
        cytoplasm += contactPulse > 0 ? 0.12 + 0.03 * Math.sin(time * 1.7 + domain.phase + distance * 9) : 0;
        membrane += Math.exp(-((distance - domain.radius) ** 2) / 0.009);
        const nucleusDistance = Math.hypot(x - (centerX + domain.radius * 0.22), z - (centerZ + domain.radius * 0.16));
        nucleus += Math.exp(-(nucleusDistance ** 2) / (domain.radius * domain.radius * 0.11));
        if (state.level === 8) emf += Math.exp(-(distance ** 2) / (domain.radius * domain.radius * 3.1))
          * Math.cos(distance * 11 - time * 5.2 + domain.phase);
      }
      const contourBand = state.level === 8 && Math.abs((emf * 3.6) % 1) < 0.055 ? 1 : 0;
      const intensity = Math.min(1, cytoplasm + membrane * 0.86 + nucleus * 0.94 + pulse * 0.14);
      const offset = (pixelY * width + pixelX) * 4;
      const emfIntensity = Math.min(1, Math.abs(emf) * 0.68 + contourBand * 0.55 + pulse * 0.16);
      data[offset] = Math.round(state.level === 8 ? 8 + 48 * intensity + 20 * emfIntensity : 9 + 245 * (membrane * 0.65 + nucleus * 0.95 + pulse * 0.1));
      data[offset + 1] = Math.round(state.level === 8 ? 26 + 224 * emfIntensity : 22 + 222 * (cytoplasm + membrane * 0.88 + pulse * 0.16));
      data[offset + 2] = Math.round(state.level === 8 ? 40 + 190 * (0.24 + intensity * 0.35 + contourBand * 0.45) : 43 + 190 * (cytoplasm + membrane * 0.42 + nucleus * 0.45));
      data[offset + 3] = Math.round(state.level === 8 ? Math.min(1, 0.22 + emfIntensity * 0.78) * 255 : Math.min(1, intensity * 0.94 + membrane * 0.25) * 255);
    }
  }
  densityContext.putImageData(image, 0, 0);
  densityTexture.needsUpdate = true;
}

function updateQuantumFoam(time, pulse) {
  const visibility = Math.max(0, 1 - state.visualScale / 1.5);
  const quantumDensityVisible = state.viewMode === '2d' && state.level >= 8 && visibility > 0.01;
  const cellularDensityVisible = state.viewMode === '2d' && state.level === 8
    && state.implementation === 'canonical-i-v' && state.scale === 4;
  const densityVisible = quantumDensityVisible || cellularDensityVisible;
  quantumFoam.visible = visibility > 0.01 && !densityVisible;
  const surfacePositions = quantumSurfaceGeometry.attributes.position;
  for (let index = 0; index < surfacePositions.count; index += 1) {
    const x = surfacePositions.getX(index);
    const z = surfacePositions.getY(index);
    const rollingHeight = Math.sin(x * 2.1 + time * 2.4) * 0.13 + Math.cos(z * 2.8 - time * 1.8) * 0.1;
    let noiseSpike = 0;
    for (let spike = 0; spike < 4; spike += 1) {
      const spikeX = Math.sin(time * (0.13 + spike * 0.02) + spike * 4.7) * 3.3;
      const spikeZ = Math.cos(time * (0.17 + spike * 0.015) + spike * 2.9) * 1.9;
      const distanceSquared = (x - spikeX) ** 2 + (z - spikeZ) ** 2;
      const amplitude = 0.82 + 0.26 * Math.sin(time * 0.7 + spike * 1.9)
        + (state.level === 4 || state.level === 8 ? pulse * 0.7 : 0);
      noiseSpike += Math.exp(-distanceSquared / 0.11) * amplitude;
    }
    const height = rollingHeight + noiseSpike;
    surfacePositions.setZ(index, height);
    if (visibility > 0.02 && quantumPreviousHeights[index] < 0.82 && height >= 0.82) {
      const matter = quantumMatter[quantumNextMatter++ % quantumMatter.length];
      matter.active = true;
      matter.bornAt = time;
      matter.x = x;
      matter.z = z;
      matter.height = height;
    }
    quantumPreviousHeights[index] = height;
  }
  surfacePositions.needsUpdate = true;
  quantumSurface.material.opacity = visibility * (0.42 + pulse * 0.18);
  quantumThreshold.material.opacity = visibility * 0.08;
  for (const matter of quantumMatter) {
    const age = time - matter.bornAt;
    const alive = matter.active && age < 12;
    matter.halo.visible = alive;
    matter.particle.visible = alive;
    if (!alive) continue;
    let interaction = 0;
    for (const neighbor of quantumMatter) {
      if (neighbor === matter || !neighbor.active || time - neighbor.bornAt >= 12) continue;
      interaction += Math.exp(-((matter.x - neighbor.x) ** 2 + (matter.z - neighbor.z) ** 2) / 0.44);
    }
    const persistence = Math.max(0, 1 - age / 12);
    const brightness = Math.min(1, 0.34 + interaction * 0.3 + persistence * 0.4);
    matter.halo.position.set(matter.x, -1.55 + matter.height, matter.z);
    matter.particle.position.set(matter.x, -1.55 + matter.height, matter.z);
    matter.halo.scale.setScalar(0.5 + interaction * 0.24 + persistence * 0.16);
    matter.particle.scale.setScalar(0.12 + interaction * 0.07 + persistence * 0.08);
    matter.halo.material.opacity = visibility * brightness * 0.42;
    matter.particle.material.opacity = visibility * brightness;
  }
  for (const ring of quantumFoamRings) ring.visible = false;
  const emfVisible = visibility > 0.01 && state.level === 8;
  quantumEmf.visible = emfVisible && !densityVisible;
  const activeMatter = quantumMatter.filter(matter => matter.active && time - matter.bornAt < 12);
  densityMap.visible = densityVisible;
  densityMap.material.opacity = densityVisible ? 0.96 : 0;
  const refreshDensityMap = densityVisible && (pulse > 0.01 || time - lastDensityMapUpdate > 1 / 15);
  if (refreshDensityMap) {
    if (quantumDensityVisible) drawDensityMap(activeMatter, time, pulse);
    if (cellularDensityVisible) drawCellularDensityMap(time, pulse);
    lastDensityMapUpdate = time;
  }
  for (const [index, contour] of quantumEmfContours.entries()) {
    const matter = activeMatter[index];
    contour.visible = Boolean(matter);
    if (!matter) continue;
    contour.position.set(matter.x, -1.55 + matter.height, matter.z);
    contour.rotation.set(time * 0.34 + index, time * 0.21 + index * 0.5, time * 0.27);
    contour.scale.setScalar(1.12 + Math.sin(time * 1.4 + index) * 0.12);
    contour.material.opacity = emfVisible ? 0.68 : 0;
  }
  const linkPositions = [];
  for (let source = 0; source < activeMatter.length; source += 1) {
    let nearest = -1;
    let nearestDistance = Infinity;
    for (let target = 0; target < activeMatter.length; target += 1) {
      if (source === target) continue;
      const distance = Math.hypot(activeMatter[source].x - activeMatter[target].x, activeMatter[source].z - activeMatter[target].z);
      if (distance < nearestDistance) {
        nearest = target;
        nearestDistance = distance;
      }
    }
    if (nearest < 0 || nearestDistance > 3.1) continue;
    linkPositions.push(activeMatter[source].x, -1.55 + activeMatter[source].height, activeMatter[source].z);
    linkPositions.push(activeMatter[nearest].x, -1.55 + activeMatter[nearest].height, activeMatter[nearest].z);
  }
  quantumEmfLinks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
  quantumEmfLinks.material.opacity = emfVisible ? Math.min(0.9, 0.34 + activeMatter.length * 0.045) : 0;
}

// Part seeds make the organism-to-collective transition legible. They are
// abstract motifs, not disassembled anatomy: a source template shrinks, seeds
// distribute, and target-scale relations replace intra-body relations.
const partSeedAnchors = [
  [0, 2.82, 0], [0, 2.25, 0], [0, 1.42, 0], [0, 0.42, 0], [0, -0.3, 0],
  [-1.2, 0.7, 0], [1.2, 0.7, 0], [-0.48, -1.9, 0], [0.48, -1.9, 0],
];
const partSeedCount = 144;
const partSeedPositions = new Float32Array(partSeedCount * 3);
const partSeeds = new THREE.Points(
  new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(partSeedPositions, 3)),
  new THREE.PointsMaterial({ color: cyan, size: 0.06, transparent: true, opacity: 0, sizeAttenuation: true }),
);
scene.add(partSeeds);

const collectiveForeground = new THREE.Group();
scene.add(collectiveForeground);
const churchNodes = [];
const churchNodePositions = [];
const churchNodeMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0 });
for (let index = 0; index < 24; index += 1) {
  const column = index % 6;
  const row = Math.floor(index / 6);
  const position = new THREE.Vector3((column - 2.5) * 0.48, (row - 1.5) * 0.46, Math.sin(index * 2.1) * 0.25);
  churchNodePositions.push(position);
  const node = new THREE.Mesh(new THREE.IcosahedronGeometry(0.055, 1), churchNodeMaterial);
  node.position.copy(position);
  collectiveForeground.add(node);
  churchNodes.push(node);
}
const churchEdges = [];
for (let index = 0; index < churchNodePositions.length; index += 1) {
  for (const offset of [1, 6]) {
    const target = index + offset;
    if (target >= churchNodePositions.length || (offset === 1 && index % 6 === 5)) continue;
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([churchNodePositions[index], churchNodePositions[target]]),
      new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0 }),
    );
    collectiveForeground.add(line);
    churchEdges.push(line);
  }
}
const churchBoundary = new THREE.Mesh(
  new THREE.TorusGeometry(1.78, 0.018, 8, 96),
  new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0 }),
);
churchBoundary.scale.y = 0.72;
collectiveForeground.add(churchBoundary);

const flockCount = 72;
const flockPositions = new Float32Array(flockCount * 3);
const flockLines = new Float32Array(flockCount * 6);
const flockGeometry = new THREE.BufferGeometry();
flockGeometry.setAttribute('position', new THREE.BufferAttribute(flockPositions, 3));
const flock = new THREE.Points(flockGeometry, new THREE.PointsMaterial({ color: cyan, size: 0.06, transparent: true, opacity: 0 }));
collectiveForeground.add(flock);
const flockVectorGeometry = new THREE.BufferGeometry();
flockVectorGeometry.setAttribute('position', new THREE.BufferAttribute(flockLines, 3));
const flockVectors = new THREE.LineSegments(flockVectorGeometry, new THREE.LineBasicMaterial({ color: emfGreen, transparent: true, opacity: 0 }));
collectiveForeground.add(flockVectors);

function smoothstep(value) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

function updatePartSeeds(time, pulse) {
  const progress = Math.max(0, Math.min(1, (state.visualScale - 8) / 2));
  const activePath = state.route === 'full-atlas' || state.route === 'animal-to-flock' || state.route === 'animal-to-church';
  const active = activePath && state.visualScale >= 7.98 && state.visualScale <= 10.15 && state.level >= 4;
  partSeeds.visible = active;
  if (!active) return;
  const dyadMix = smoothstep(Math.min(1, progress * 2));
  const targetMix = smoothstep(Math.max(0, progress * 2 - 1));
  const church = state.route === 'animal-to-church';
  for (let index = 0; index < partSeedCount; index += 1) {
    const anchor = partSeedAnchors[index % partSeedAnchors.length];
    const phase = index * 2.399963;
    const source = new THREE.Vector3(
      anchor[0] * 0.72 + Math.cos(phase) * 0.07,
      anchor[1] * 0.72 - 0.1 + Math.sin(phase * 1.7) * 0.07,
      Math.sin(phase * 0.7) * 0.08,
    );
    const side = index % 2 ? -1 : 1;
    const dyad = new THREE.Vector3(
      side * (0.84 + Math.cos(phase) * 0.28),
      Math.sin(phase * 1.3) * 0.9,
      Math.sin(phase) * 0.34,
    );
    const target = church
      ? new THREE.Vector3((index % 12 - 5.5) * 0.36, (Math.floor(index / 12) - 5.5) * 0.3, Math.sin(phase) * 0.2)
      : new THREE.Vector3(Math.cos(phase) * (0.7 + (index % 9) * 0.11), Math.sin(phase * 1.7 + time * 0.2) * (0.55 + (index % 7) * 0.1), Math.sin(phase) * 0.6);
    source.lerp(dyad, dyadMix).lerp(target, targetMix);
    const offset = index * 3;
    partSeedPositions[offset] = source.x;
    partSeedPositions[offset + 1] = source.y;
    partSeedPositions[offset + 2] = source.z;
  }
  partSeeds.geometry.attributes.position.needsUpdate = true;
  partSeeds.material.color.set(church ? gold : cyan).lerp(emfGreen, targetMix);
  partSeeds.material.opacity = Math.sin(Math.PI * progress) * (0.64 + pulse * 0.3);
  partSeeds.material.size = 0.04 + targetMix * 0.025 + pulse * 0.045;
}

function updateCollectiveForeground(time, pulse) {
  const church = state.route === 'animal-to-church' && state.visualScale >= 8.7;
  const flockRoute = state.route === 'animal-to-flock' && state.visualScale >= 8.7;
  collectiveForeground.visible = church || flockRoute;
  const churchMix = church ? smoothstep((state.visualScale - 8.7) / 1.3) : 0;
  churchNodeMaterial.opacity = churchMix * (0.68 + pulse * 0.3);
  for (const [index, node] of churchNodes.entries()) {
    node.visible = church;
    node.scale.setScalar(0.8 + churchMix * (1 + Math.sin(time * 1.2 + index) * 0.15));
  }
  for (const [index, line] of churchEdges.entries()) {
    line.visible = church;
    line.material.opacity = churchMix * (0.2 + (index % 3) * 0.08 + pulse * 0.2);
  }
  churchBoundary.visible = church;
  churchBoundary.rotation.z = time * 0.08;
  churchBoundary.material.opacity = churchMix * (0.32 + pulse * 0.22);
  const flockMix = flockRoute ? smoothstep((state.visualScale - 8.7) / 1.3) : 0;
  flock.material.opacity = flockMix * (0.5 + pulse * 0.35);
  flockVectors.material.opacity = flockMix * (0.28 + pulse * 0.3);
  for (let index = 0; index < flockCount; index += 1) {
    const phase = index * 2.399963;
    const position = new THREE.Vector3(
      Math.cos(phase + time * 0.16) * (0.65 + (index % 9) * 0.13),
      Math.sin(phase * 1.7 + time * 0.21) * (0.45 + (index % 7) * 0.1),
      Math.sin(phase + time * 0.12) * 0.48,
    );
    const direction = new THREE.Vector3(0.17 + pulse * 0.08, Math.sin(time + index) * 0.035, 0).normalize().multiplyScalar(0.22);
    flockPositions[index * 3] = position.x;
    flockPositions[index * 3 + 1] = position.y;
    flockPositions[index * 3 + 2] = position.z;
    flockLines[index * 6] = position.x;
    flockLines[index * 6 + 1] = position.y;
    flockLines[index * 6 + 2] = position.z;
    flockLines[index * 6 + 3] = position.x + direction.x;
    flockLines[index * 6 + 4] = position.y + direction.y;
    flockLines[index * 6 + 5] = position.z + direction.z;
  }
  flockGeometry.attributes.position.needsUpdate = true;
  flockVectorGeometry.attributes.position.needsUpdate = true;
}

function topologyPoint(topology, index, count, sigma, time, pulse) {
  const ratio = index / count;
  const angle = ratio * Math.PI * 2 * (2 + sigma % 4);
  const radial = 0.45 + (index % 17) / 17 * 1.55;
  const orbit = new THREE.Vector3(Math.cos(angle) * radial, Math.sin(angle * 1.37) * radial * 0.72, Math.sin(angle) * radial * 0.52);
  const gridIndex = index % 14;
  const grid = new THREE.Vector3((gridIndex - 6.5) * 0.28, (Math.floor(index / 14) - 6.5) * 0.28, Math.sin(index * 1.7) * 0.12);
  const spherePhi = Math.acos(1 - 2 * ratio);
  const sphere = new THREE.Vector3(Math.cos(angle) * Math.sin(spherePhi), Math.cos(spherePhi), Math.sin(angle) * Math.sin(spherePhi)).multiplyScalar(1.55);
  const flow = new THREE.Vector3(Math.cos(angle) * (0.4 + ratio), Math.sin(angle * 2 + time * 0.3) * 1.1, Math.sin(angle) * (0.4 + ratio));
  let point = orbit;
  if (/(lattice|grid|network|matrix|constraint|spin)/.test(topology)) point = grid;
  if (/(shell|planet|star|orbital|radial|lensing|wave-packet|decay)/.test(topology)) point = sphere;
  if (/(sheet|ribbon|fault|shear)/.test(topology)) point = new THREE.Vector3((ratio - 0.5) * 4, Math.sin(angle) * 0.6, Math.cos(angle * 0.5) * 0.5);
  if (/(swarm|fluid|current|convection|spiral|rg|branch|cosmic|galactic|terrain)/.test(topology)) point = flow;
  if (/(dyad|coupling|phase-lock)/.test(topology)) {
    const side = index % 2 ? -1 : 1;
    point = new THREE.Vector3(side * (0.75 + Math.cos(angle) * 0.4), Math.sin(angle) * 0.8, Math.cos(angle * 1.4) * 0.5);
  }
  const tremor = (pulse * 0.8 + Math.sin(time * 1.2 + index * 0.37) * 0.045) * (topology.includes('fault') ? 1.8 : 1);
  return point.multiplyScalar(1 + tremor);
}

function updateMorphologyLayer(layer, from, to, mix, time, pulse) {
  const fromTopology = from[layer.key].topology;
  const toTopology = to[layer.key].topology;
  for (let index = 0; index < morphologyPointCount; index += 1) {
    const start = topologyPoint(fromTopology, index, morphologyPointCount, from.sigma, time, pulse);
    const end = topologyPoint(toTopology, index, morphologyPointCount, to.sigma, time, pulse);
    start.lerp(end, mix);
    const offset = index * 3;
    layer.positions[offset] = start.x;
    layer.positions[offset + 1] = start.y;
    layer.positions[offset + 2] = start.z;
  }
  layer.geometry.attributes.position.needsUpdate = true;
  layer.material.color.set(from[layer.key].tint).lerp(new THREE.Color(to[layer.key].tint), mix);
}

function loadDisplaySections() {
  try {
    const saved = JSON.parse(localStorage.getItem('usm-cheat-sheet-sections'));
    const valid = saved?.filter(id => cheatSheetSections.some(section => section.id === id));
    return valid?.length ? valid : displayPresets[0].sections;
  } catch {
    return displayPresets[0].sections;
  }
}

const state = { somatic: 0.72, limbic: 0.86, cognitive: 0.46, scale: 0, visualScale: 0, level: 11, viewMode: '3d', brecvema: false, selectedMechanism: 'B', selectedMechanisms: new Set(), appraisal: Object.fromEntries(appraisalDimensions.map(dimension => [dimension.id, 0])), implementation: 'canonical-i-v', canonicalStart: 'I', canonicalEnd: 'V', zoomTicks: canonicalBands.map(band => band.oom[0]), route: 'canonical-i-v', lenses: new Set(['physics', 'response']), responseTime: 0, impulse: 0, displaySections: new Set(loadDisplaySections()), transport: { playing: false, bpm: 92, position: 0, quantization: 4, nextAt: 0 }, backgroundDepth: 0, mathDepth: 0 };
for (const name of ['somatic', 'limbic', 'cognitive', 'response-time']) document.querySelector(`#${name}`).addEventListener('input', event => {
  const stateKey = name === 'response-time' ? 'responseTime' : name;
  state[stateKey] = Number(event.target.value);
  updateScaleReadout();
});
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
const timeReadout = document.querySelector('#time-readout');
const routeSelect = document.querySelector('#route');
const implementationSelect = document.querySelector('#implementation');
const canonicalStart = document.querySelector('#canonical-start');
const canonicalEnd = document.querySelector('#canonical-end');
const canonicalExpand = document.querySelector('#canonical-expand');
const canonicalReadout = document.querySelector('#canonical-readout');
const zoomEquationFull = document.querySelector('#zoom-equation-full');
const zoomEquationSource = document.querySelector('#zoom-equation-source');
const mathDepthDown = document.querySelector('#math-depth-down');
const mathDepthUp = document.querySelector('#math-depth-up');
const mathDepthReadout = document.querySelector('#math-depth-readout');
const pathReadout = document.querySelector('#path-readout');
const lensControls = [...document.querySelectorAll('.lens-layers input')];
const wallTitle = document.querySelector('#wall-title');
const wallArchitecture = document.querySelector('#wall-architecture');
const wallState = document.querySelector('#wall-state');
const wallDynamics = document.querySelector('#wall-dynamics');
const wallLevelLaw = document.querySelector('#wall-level-law');
const wallDimensions = document.querySelector('#wall-dimensions');
const wallStatus = document.querySelector('#wall-status');
const brecvemaButton = document.querySelector('#brecvema');
const cheatSheetBadge = document.querySelector('#cheat-sheet-badge');
const cheatSheetTitle = document.querySelector('#cheat-sheet-title');
const cheatSheetSummary = document.querySelector('#cheat-sheet-summary');
const cheatSheetSource = document.querySelector('#cheat-sheet-source');
const visualTodo = document.querySelector('#visual-todo');
const displayPreset = document.querySelector('#display-preset');
const cheatSheetToggles = document.querySelector('#cheat-sheet-toggles');
const cheatSheetLedger = document.querySelector('#cheat-sheet-ledger');
const pathEdgeReadout = document.querySelector('#path-edge-readout');
const scaleInput = document.querySelector('#scale');
const view2dButton = document.querySelector('#view-2d');
const view3dButton = document.querySelector('#view-3d');
const wallScaleDown = document.querySelector('#wall-scale-down');
const wallScaleUp = document.querySelector('#wall-scale-up');
const pathBack = document.querySelector('#path-back');
const pathPlay = document.querySelector('#path-play');
const pathNext = document.querySelector('#path-next');
const pathBpm = document.querySelector('#path-bpm');
const pathTransportReadout = document.querySelector('#path-transport-readout');
const backgroundDim = document.querySelector('#background-dim');
const fractalQuality = document.querySelector('#fractal-quality');
const brecvemaInspector = document.querySelector('#brecvema-inspector');
const mechanismButtons = [...document.querySelectorAll('[data-mechanism]')];
const mechanismName = document.querySelector('#mechanism-name');
const mechanismEffect = document.querySelector('#mechanism-effect');
const mechanismParameter = document.querySelector('#mechanism-parameter');
const mechanismAction = document.querySelector('#mechanism-action');
const mechanismEquation = document.querySelector('#mechanism-equation');
const appraisalPanel = document.querySelector('#appraisal-panel');
const appraisalControls = document.querySelector('#appraisal-controls');
const appraisalReadout = document.querySelector('#appraisal-readout');
const bodyMapPanel = document.querySelector('#body-map-panel');
const bodyGridElement = document.querySelector('#body-grid');
const bodyMapStatus = document.querySelector('#body-map-status');
const hierarchyButtons = [...document.querySelectorAll('.hierarchy-button')];
for (const route of scalePaths) routeSelect.add(new Option(route.label, route.id));
routeSelect.value = state.route;
for (const model of usfModels) implementationSelect.add(new Option(model.label, model.id));
implementationSelect.value = state.implementation;
for (const band of canonicalBands) {
  canonicalStart.add(new Option(band.id, band.id));
  canonicalEnd.add(new Option(band.id, band.id));
}
canonicalStart.value = state.canonicalStart;
canonicalEnd.value = state.canonicalEnd;
for (const preset of displayPresets) displayPreset.add(new Option(preset.label, preset.id));
displayPreset.add(new Option('CUSTOM', 'custom'));
const sectionToggles = new Map();
for (const section of cheatSheetSections) {
  const label = document.createElement('label');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = state.displaySections.has(section.id);
  input.addEventListener('change', () => {
    if (input.checked) state.displaySections.add(section.id);
    else state.displaySections.delete(section.id);
    displayPreset.value = 'custom';
    persistDisplaySections();
    updateScaleReadout();
  });
  label.append(input, document.createTextNode(section.label));
  cheatSheetToggles.append(label);
  sectionToggles.set(section.id, input);
}
const bodyCells = Array.from({ length: bodyGrid.columns * bodyGrid.rows }, (_, index) => {
  const cell = document.createElement('div');
  cell.className = 'body-cell';
  cell.title = `Field cell ${index + 1}`;
  bodyGridElement.append(cell);
  return cell;
});
for (const dimension of appraisalDimensions) {
  const row = document.createElement('div');
  row.className = 'appraisal-control';
  const label = document.createElement('label');
  label.htmlFor = `appraisal-${dimension.id}`;
  label.textContent = dimension.label;
  label.title = dimension.description;
  const input = document.createElement('input');
  input.id = `appraisal-${dimension.id}`;
  input.type = 'range';
  input.min = '0';
  input.max = '1';
  input.step = '0.01';
  input.value = '0';
  input.addEventListener('input', () => {
    state.appraisal[dimension.id] = Number(input.value);
    renderAppraisal();
  });
  row.append(label, input);
  appraisalControls.append(row);
}
function persistDisplaySections() {
  try {
    localStorage.setItem('usm-cheat-sheet-sections', JSON.stringify([...state.displaySections]));
  } catch {
    // The control remains usable when storage is unavailable.
  }
}

function renderZoomEquation() {
  zoomEquationFull.replaceChildren();
  const model = getUSFModel(state.implementation);
  const depthLabels = ['INVARIANT', 'SCALE LEDGER', 'OPERATORS + CONTEXT'];
  mathDepthReadout.textContent = depthLabels[state.mathDepth];
  mathDepthDown.disabled = state.mathDepth === 0;
  mathDepthUp.disabled = state.mathDepth === depthLabels.length - 1;
  if (state.mathDepth === 0) {
    const line = document.createElement('div');
    const invariant = '\\mathcal L_{M,\\sigma}G_{M,\\sigma}=\\delta_\\sigma';
    if (globalThis.katex) globalThis.katex.render(invariant, line, { displayMode: true, throwOnError: false });
    else line.textContent = invariant;
    zoomEquationFull.append(line);
  } else {
    for (const [label, equation, context] of model.equations) {
      const row = document.createElement('section');
      row.className = 'model-equation';
      const rowLabel = document.createElement('span');
      rowLabel.className = 'model-equation-label';
      rowLabel.textContent = label;
      const math = document.createElement('div');
      if (globalThis.katex) globalThis.katex.render(equation, math, { displayMode: true, throwOnError: false });
      else math.textContent = equation;
      row.append(rowLabel, math);
      if (state.mathDepth === 2) {
        const operator = document.createElement('p');
        operator.className = 'model-equation-operator';
        operator.textContent = `OPERATOR / L_${label.split(' / ')[0]} G = delta`;
        const detail = document.createElement('p');
        detail.className = 'model-equation-context';
        detail.textContent = context;
        row.append(operator, detail);
      }
      zoomEquationFull.append(row);
    }
  }
  zoomEquationSource.textContent = `MODEL / ${model.description} / SOURCE / ${zoomEquation.source}`;
}

function renderCanonicalExpansion() {
  const expanded = expandCanonicalRange(state.canonicalStart, state.canonicalEnd);
  const bandStart = canonicalBands.findIndex(band => band.id === state.canonicalStart);
  const bandEnd = canonicalBands.findIndex(band => band.id === state.canonicalEnd);
  const bands = canonicalBands.slice(Math.min(bandStart, bandEnd), Math.max(bandStart, bandEnd) + 1).map(band => band.id).join(' → ');
  const visualTicks = expanded.filter(sigma => sigma <= 19);
  state.zoomTicks = state.implementation === 'canonical-i-v'
    ? canonicalBands.slice(Math.min(bandStart, bandEnd), Math.max(bandStart, bandEnd) + 1).map(band => Math.min(19, band.oom[0]))
    : visualTicks;
  canonicalReadout.textContent = `${bands} / OOM ${visualTicks.join(' → ')}${expanded.includes(20) ? ' / FORMAL COSMIC WEB σ20' : ''}`;
}

function addLedgerLine(container, key, value) {
  const line = document.createElement('p');
  if (key) {
    const label = document.createElement('span');
    label.className = 'cheat-ledger-key';
    label.textContent = `${key}: `;
    line.append(label);
  }
  line.append(document.createTextNode(value));
  container.append(line);
}

function renderCheatSheetLedger(sheet, edge) {
  cheatSheetLedger.replaceChildren();
  const selected = cheatSheetSections.filter(section => state.displaySections.has(section.id));
  for (const section of selected) {
    const block = document.createElement('section');
    block.className = 'cheat-ledger-section';
    const heading = document.createElement('h3');
    heading.textContent = section.label;
    block.append(heading);
    if (section.id === 'identity') {
      addLedgerLine(block, 'SCALE', `SIGMA ${String(sheet.sigma).padStart(2, '0')} / ${sheet.identity.label}`);
      addLedgerLine(block, 'SECTOR', sheet.identity.sector);
      addLedgerLine(block, 'SUBSTRATE', sheet.identity.substrate);
      addLedgerLine(block, 'LENGTH', sheet.identity.length);
      addLedgerLine(block, 'SYSTEM', sheet.identity.partonomy.label);
      addLedgerLine(block, 'PARTS', sheet.identity.partonomy.parts.join('; '));
      addLedgerLine(block, 'RELATIONS', sheet.identity.partonomy.relations.join('; '));
      addLedgerLine(block, 'WHOLE', sheet.identity.partonomy.aggregation);
    } else if (section.id === 'physics') {
      addLedgerLine(block, 'IMPORTANT', sheet.physics.important);
      addLedgerLine(block, 'EQUATION', sheet.physics.equation);
      addLedgerLine(block, 'FIELD', sheet.physics.field);
      addLedgerLine(block, 'TIME', sheet.physics.time);
      addLedgerLine(block, 'OBSERVABLE', sheet.physics.observable);
    } else if (section.id === 'response') {
      addLedgerLine(block, 'POKE', sheet.response.description);
      addLedgerLine(block, 'KERNEL', sheet.response.topology);
      addLedgerLine(block, 'MODE', sheet.response.poke);
      addLedgerLine(block, 'EXPECT', sheet.response.expected);
    } else if (section.id === 'morphism') {
      if (edge) {
        addLedgerLine(block, 'EDGE', `${edge.label} / SIGMA ${edge.from} -> ${edge.to}`);
        addLedgerLine(block, 'PRESERVE', edge.preserves.join('; '));
        addLedgerLine(block, 'ADD', edge.adds.join('; '));
        addLedgerLine(block, 'INTEGRATE OUT', edge.integratesOut.join('; '));
        addLedgerLine(block, 'KERNEL', edge.kernel);
        addLedgerLine(block, 'ACTION', edge.action);
        addLedgerLine(block, 'PART OPERATION', edge.partonomy.operation);
        addLedgerLine(block, 'PART PRESERVE', edge.partonomy.preserves.join('; '));
        addLedgerLine(block, 'PART RETYPE', edge.partonomy.retypes.join('; '));
        addLedgerLine(block, 'RENDER', edge.partonomy.render);
      } else addLedgerLine(block, 'PATH', 'Move the scale dial to a path edge to inspect its typed morphism.');
    } else if (section.id === 'evidence') {
      addLedgerLine(block, 'CLAIMS', Object.entries(sheet.evidence.claims).map(([level, claim]) => `${level.toUpperCase()} ${claim}`).join(' / '));
      addLedgerLine(block, 'SOURCE', sheet.evidence.source);
      addLedgerLine(block, 'PAPERS', `${sheet.evidence.papers.join(', ')} / ${'Dist/PAPERS.yaml'}`);
    } else if (section.id === 'interpretation') {
      addLedgerLine(block, 'STATUS', `${sheet.interpretation.claim} / ${sheet.interpretation.enabled ? 'AVAILABLE' : 'BIOLOGICAL READING'}`);
      addLedgerLine(block, 'CONTOUR', sheet.interpretation.description);
      if (sheet.interpretation.enabled) addLedgerLine(block, 'TERMS', sheet.interpretation.terms.join(', '));
    } else if (section.id === 'operate') {
      addLedgerLine(block, 'CONTROLS', sheet.operate.controls.join(', ').toUpperCase());
      addLedgerLine(block, 'SCOPE', sheet.operate.humanOnly ? 'Human-route extensions available.' : 'Typed substrate controls only.');
    } else if (section.id === 'renderer') {
      addLedgerLine(block, '4D', `${sheet.renderer.physical.topology} / ${sheet.renderer.physical.claim}`);
      addLedgerLine(block, '8D', `${sheet.renderer.response.topology} / ${sheet.renderer.response.claim}`);
      addLedgerLine(block, '11D', `${sheet.renderer.integration.topology} / ${sheet.renderer.integration.claim}`);
      addLedgerLine(block, 'STATUS', `${sheet.renderer.status.status} / ${sheet.renderer.status.next}`);
    }
    cheatSheetLedger.append(block);
  }
}
function renderWallMath() {
  for (const element of [wallArchitecture, wallState, wallDynamics, wallLevelLaw]) {
    const tex = element.dataset.tex;
    if (globalThis.katex) globalThis.katex.render(tex, element, { displayMode: true, throwOnError: false });
    else element.textContent = tex;
  }
}
function renderMechanismSelection() {
  const selected = mechanisms.filter(mechanism => state.selectedMechanisms.has(mechanism.id));
  if (!selected.length) {
    mechanismName.textContent = 'Select mechanisms';
    mechanismEffect.textContent = 'Choose one or more mechanisms to compose a music-affect forcing profile.';
    mechanismParameter.textContent = 'J(t)';
    mechanismAction.textContent = 'No mechanism lens selected';
    mechanismEquation.textContent = 'J(t) = 0';
  } else {
    const primary = mechanisms.find(mechanism => mechanism.id === state.selectedMechanism) ?? selected[0];
    mechanismName.textContent = selected.map(mechanism => mechanism.name).join(' + ');
    mechanismEffect.textContent = selected.map(mechanism => mechanism.effect).join(' ');
    mechanismParameter.textContent = selected.map(mechanism => mechanism.parameter).join(', ');
    mechanismAction.textContent = selected.map(mechanism => mechanism.action).join('; ');
    if (globalThis.katex) globalThis.katex.render(primary.equation, mechanismEquation, { displayMode: false, throwOnError: false });
    else mechanismEquation.textContent = primary.equation;
  }
  for (const button of mechanismButtons) button.classList.toggle('active', state.selectedMechanisms.has(button.dataset.mechanism));
  renderBodyGrid();
}
function renderAppraisal() {
  const active = appraisalDimensions.filter(dimension => state.appraisal[dimension.id] > 0.05);
  appraisalReadout.textContent = active.length
    ? active.map(dimension => `${dimension.label} ${state.appraisal[dimension.id].toFixed(2)}`).join(' / ')
    : 'NO APPRAISAL WEIGHTS SELECTED';
}
function renderBodyGrid(time = 0) {
  const activeCells = new Map();
  for (const mechanism of mechanisms) {
    if (!state.selectedMechanisms.has(mechanism.id)) continue;
    for (const region of bodyGrid.mechanismRegions[mechanism.id] ?? []) {
      for (const cell of bodyGrid.regions[region]) activeCells.set(cell, (activeCells.get(cell) ?? 0) + 1);
    }
  }
  for (const [index, cell] of bodyCells.entries()) {
    const intensity = activeCells.get(index) ?? 0;
    const row = Math.floor(index / bodyGrid.columns);
    const column = index % bodyGrid.columns;
    const wave = state.impulse ? Math.max(0, 1 - Math.abs(column - (state.responseTime * 12 - 2)) / 4) : 0;
    const red = Math.round(22 + 214 * Math.min(1, state.limbic * 0.45 + intensity * 0.18 + wave * 0.75));
    const green = Math.round(18 + 210 * Math.min(1, state.somatic * 0.35 + intensity * 0.1 + wave * 0.45));
    const blue = Math.round(24 + 220 * Math.min(1, state.cognitive * 0.35 + intensity * 0.16 + wave * 0.62));
    cell.classList.toggle('active', intensity > 0);
    cell.style.background = `rgb(${red}, ${green}, ${blue})`;
    cell.style.opacity = String(0.38 + intensity * 0.18 + wave * 0.35);
    cell.style.transform = wave ? `scale(${1 + wave * 0.08})` : '';
  }
  bodyMapStatus.textContent = state.selectedMechanisms.size
    ? `${bodyGrid.provenance} / ${state.selectedMechanisms.size} MECHANISM(S) STACKED`
    : bodyGrid.provenance;
}
function selectMechanism(id) {
  if (state.selectedMechanisms.has(id)) state.selectedMechanisms.delete(id);
  else {
    state.selectedMechanisms.add(id);
    state.selectedMechanism = id;
  }
  renderMechanismSelection();
}
function activeZoom() {
  return { scales: state.zoomTicks, label: state.implementation === 'canonical-i-v' ? 'I-V CANONICAL' : '0-20 OOM EXPANDED' };
}

function syncScaleControl() {
  const zoom = activeZoom();
  const position = Math.max(0, zoom.scales.indexOf(state.scale));
  scaleInput.min = '0';
  scaleInput.max = String(zoom.scales.length - 1);
  scaleInput.value = String(position);
  document.querySelector('#scale-down').disabled = position === 0;
  document.querySelector('#scale-up').disabled = position === zoom.scales.length - 1;
  wallScaleDown.disabled = position === 0;
  wallScaleUp.disabled = position === zoom.scales.length - 1;
}

function syncTransportPosition() {
  const zoom = activeZoom();
  const exactIndex = zoom.scales.indexOf(state.scale);
  if (exactIndex >= 0) state.transport.position = exactIndex;
  else state.transport.position = zoom.scales.reduce((closest, sigma, index) => Math.abs(sigma - state.scale) < Math.abs(zoom.scales[closest] - state.scale) ? index : closest, 0);
  pathBack.disabled = state.transport.position === 0;
  pathNext.disabled = state.transport.position === zoom.scales.length - 1;
  pathTransportReadout.textContent = `${state.transport.playing ? 'PLAYING' : 'STOPPED'} / ${state.transport.bpm} BPM / ${zoom.label} STEP ${state.transport.position + 1} OF ${zoom.scales.length}`;
}

function setPathStep(position) {
  const zoom = activeZoom();
  const clamped = Math.max(0, Math.min(zoom.scales.length - 1, position));
  const previousScale = state.scale;
  state.transport.position = clamped;
  state.scale = zoom.scales[clamped];
  if (state.implementation === 'canonical-i-v' && state.scale < 7 && state.level === 11) state.level = 4;
  if (state.scale !== previousScale) {
    starflight.active = 1;
    starflight.direction = state.scale > previousScale ? 1 : -1;
    starflight.lastScale = state.scale;
  }
  syncScaleControl();
  updateScaleReadout();
}

function advancePath(direction) {
  const currentPosition = Math.max(0, activeZoom().scales.indexOf(state.scale));
  setPathStep(currentPosition + direction);
}

function toggleTransport() {
  state.transport.playing = !state.transport.playing;
  state.transport.nextAt = 0;
  pathPlay.classList.toggle('active', state.transport.playing);
  pathPlay.setAttribute('aria-pressed', String(state.transport.playing));
  pathPlay.textContent = state.transport.playing ? 'PAUSE PATH' : 'PLAY PATH';
  syncTransportPosition();
}
function updateScaleReadout() {
  const plate = getPlate(state.scale);
  const isHuman = state.level === 11;
  const isFeeling = state.level === 8;
  const isPhysical = state.level === 4;
  const humanScale = state.scale === 7 || state.scale === 8;
  const primaryReading = isPhysical ? plate.physical : isFeeling ? plate.response : plate.integration;
  const activeLensLabels = lenses.filter(lens => state.lenses.has(lens.id)).map(lens => lens.label);
  const mirrorReading = plate.mirror.enabled ? `Mirror contour available: ${plate.mirror.terms.join(', ')}.` : 'Mirror contour is not enabled for this biological reading.';
  const reading = [primaryReading, state.lenses.has('mirror') ? mirrorReading : ''].filter(Boolean).join(' ');
  const badge = isPhysical ? plate.claim.physical : isFeeling ? plate.claim.response : plate.claim.integration;
  const route = getScalePath(state.route);
  const edge = route.edges.map(getPathEdge).find(candidate => candidate?.from === state.scale)
    ?? route.edges.map(getPathEdge).find(candidate => candidate?.to === state.scale);
  const sheet = getScaleCheatSheet(state.scale);
  const canonicalBand = state.implementation === 'canonical-i-v'
    ? canonicalBands.find(band => band.oom[0] === state.scale)
    : null;
  scaleReadout.textContent = canonicalBand
    ? `${canonicalBand.id} / ${canonicalBand.label.split('/ ')[1]} / σ ${canonicalBand.oom[0]}–${canonicalBand.oom[1]}`
    : `SIGMA ${String(state.scale).padStart(2, '0')} / ${plate.label}`;
  projectionReadout.textContent = `${state.level}D / ${activeLensLabels.join(' + ')} / ${plate.substrate.toUpperCase()}`;
  equationTitle.textContent = `${activeLensLabels.join(' + ')} / ${plate.label}`;
  equationPrimary.textContent = plate.equation;
  equationSecondary.textContent = isPhysical ? plate.physical : isFeeling ? plate.response : plate.integration;
  dimensionReadout.textContent = isHuman ? 'M4 + P3 + L1 + C3 = 11D' : isFeeling ? 'M4 + P3 + L1 = 8D' : 'M4 = 4D / PHYSICS BASELINE';
  wavenumberReadout.textContent = plate.field;
  lengthReadout.textContent = plate.length;
  rankReadout.textContent = humanScale ? 'human-scale eligible' : 'typed substrate reading';
  timeReadout.textContent = `T = ${state.responseTime.toFixed(2)} / ${plate.time.toUpperCase()}`;
  typeStatus.textContent = `${badge} / ${humanScale ? 'HUMAN-SCALE VOCABULARY AVAILABLE' : 'RETYPE VARIABLES FOR SELECTED SUBSTRATE'}`;
  typeStatus.classList.toggle('error', !isHuman && state.brecvema);
  pathReadout.textContent = route.id === 'full-atlas'
    ? 'DEFAULT PATH / 0 QUANTUM FOAM -> 19 OBSERVABLE UNIVERSE'
    : `PATH / ${route.purpose}`;
  pathEdgeReadout.textContent = edge
    ? `MORPHISM / ${edge.label} / SIGMA ${edge.from} -> ${edge.to} / ${edge.claim}`
    : 'PATH EDGE / MOVE THE SCALE DIAL TO A CONNECTED TRANSITION TO INSPECT ITS MORPHISM';
  syncTransportPosition();
  for (const control of lensControls) {
    if (control.id === 'lens-mirror') {
      control.disabled = !plate.mirror.enabled;
      if (!plate.mirror.enabled) state.lenses.delete('mirror');
    }
    control.checked = state.lenses.has(control.id.replace('lens-', ''));
  }
  brecvemaButton.disabled = !humanScale;
  appraisalPanel.hidden = !humanScale;
  bodyMapPanel.hidden = !humanScale;
  brecvemaButton.title = humanScale ? 'Open the human music-affect mechanism lens' : 'BRECVEMA is available at the human biological scales only';
  const quantumCanonical = state.implementation === 'canonical-i-v' && state.scale < 7;
  for (const button of hierarchyButtons) {
    const isElevenDimensional = Number(button.dataset.level) === 11;
    button.disabled = quantumCanonical && isElevenDimensional;
    button.classList.toggle('active', Number(button.dataset.level) === state.level);
  }
  wallTitle.textContent = canonicalBand ? `${canonicalBand.id} / ${canonicalBand.label.split('/ ')[1]}` : `${state.level}D / ${plate.label}`;
  wallArchitecture.dataset.tex = isHuman ? '\\mathcal{M}_{11}=M_4\\times P_3\\times L_1\\times C_3' : isFeeling ? '\\mathcal{M}_8=M_4\\times P_3\\times L_1' : '\\mathcal{M}_4';
  wallState.dataset.tex = canonicalBand
    ? `\\sigma\\in[${canonicalBand.oom[0]},${canonicalBand.oom[1]}]`
    : '\\mathrm{Substrate}(\\sigma)=\\text{' + plate.substrate.replace(/ /g, '\\;') + '}';
  wallDynamics.dataset.tex = canonicalBand
    ? `\\mathcal F_{${canonicalBand.id}}=\\bigoplus_{\\sigma=${canonicalBand.oom[0]}}^{${canonicalBand.oom[1]}}[(\\nabla_\\sigma^2+k_\\sigma^2)G_\\sigma=\\delta_\\sigma]`
    : plate.equation.replace(/\^/g, '^');
  wallLevelLaw.dataset.tex = canonicalBand
    ? `\\text{${canonicalBand.change.replace(/ /g, '\\;')}}`
    : isFeeling ? 'G_R\\ast J\\;\\Rightarrow\\;\\text{causal response}' : isHuman ? '\\operatorname{Spec}(X)=\\text{integrated organization}' : '\\text{physics baseline at selected scale}';
  wallDimensions.textContent = `SOURCE: ${plate.source}`;
  wallStatus.textContent = `${badge} / ${reading}`;
  cheatSheetBadge.textContent = badge;
  cheatSheetBadge.classList.toggle('sourced', badge === 'SOURCED');
  cheatSheetTitle.textContent = `${state.level}D ${plate.label}`;
  cheatSheetSummary.textContent = reading;
  cheatSheetSource.textContent = plate.source;
  visualTodo.textContent = `${plate.visual.status} / ${plate.visual.next}`;
  for (const [id, input] of sectionToggles) input.checked = state.displaySections.has(id);
  const matchingPreset = displayPresets.find(preset => preset.sections.length === state.displaySections.size
    && preset.sections.every(id => state.displaySections.has(id)));
  displayPreset.value = matchingPreset?.id ?? 'custom';
  renderCheatSheetLedger(sheet, edge);
  renderWallMath();
}
routeSelect.addEventListener('change', () => {
  state.route = routeSelect.value;
  state.transport.playing = false;
  pathPlay.classList.remove('active');
  pathPlay.setAttribute('aria-pressed', 'false');
  pathPlay.textContent = 'PLAY PATH';
  updateScaleReadout();
});
implementationSelect.addEventListener('change', () => {
  state.implementation = implementationSelect.value;
  state.route = getUSFModel(state.implementation).route;
  state.zoomTicks = state.implementation === 'canonical-i-v'
    ? canonicalBands.map(band => band.oom[0])
    : Array.from({ length: 20 }, (_, sigma) => sigma);
  state.scale = state.zoomTicks[0];
  if (state.implementation === 'canonical-i-v') state.level = 4;
  syncScaleControl();
  renderZoomEquation();
  updateScaleReadout();
});
mathDepthDown.addEventListener('click', () => {
  state.mathDepth = Math.max(0, state.mathDepth - 1);
  renderZoomEquation();
});
mathDepthUp.addEventListener('click', () => {
  state.mathDepth = Math.min(2, state.mathDepth + 1);
  renderZoomEquation();
});
scaleInput.addEventListener('input', () => setPathStep(Number(scaleInput.value)));
document.querySelector('#scale-down').addEventListener('click', () => advancePath(-1));
document.querySelector('#scale-up').addEventListener('click', () => advancePath(1));
wallScaleDown.addEventListener('click', () => advancePath(-1));
wallScaleUp.addEventListener('click', () => advancePath(1));
canonicalExpand.addEventListener('click', () => {
  state.canonicalStart = canonicalStart.value;
  state.canonicalEnd = canonicalEnd.value;
  renderCanonicalExpansion();
  state.scale = state.zoomTicks[0];
  scaleInput.value = String(state.scale);
  updateScaleReadout();
});
pathBack.addEventListener('click', () => advancePath(-1));
pathNext.addEventListener('click', () => advancePath(1));
pathPlay.addEventListener('click', toggleTransport);
pathBpm.addEventListener('input', () => {
  state.transport.bpm = Number(pathBpm.value);
  syncTransportPosition();
});
backgroundDim.addEventListener('input', () => {
  state.backgroundDepth = Number(backgroundDim.value);
  backgroundMaterial.uniforms.uDepth.value = state.backgroundDepth;
});
fractalQuality.addEventListener('input', () => {
  backgroundMaterial.uniforms.uQuality.value = Number(fractalQuality.value);
});
displayPreset.addEventListener('change', () => {
  if (displayPreset.value === 'custom') return;
  const preset = displayPresets.find(candidate => candidate.id === displayPreset.value);
  state.displaySections = new Set(preset.sections);
  persistDisplaySections();
  updateScaleReadout();
});
for (const control of lensControls) control.addEventListener('change', () => {
  const lens = control.id.replace('lens-', '');
  if (control.checked) state.lenses.add(lens);
  else state.lenses.delete(lens);
  updateScaleReadout();
});
document.querySelector('#poke').addEventListener('click', () => {
  state.impulse = 1;
  state.responseTime = 0;
  document.querySelector('#response-time').value = '0';
  updateScaleReadout();
  timeReadout.textContent = 'T = 0.00 / IMPULSE J(t) ACTIVE';
});
brecvemaButton.addEventListener('click', () => {
  state.brecvema = !state.brecvema;
  brecvemaInspector.hidden = !state.brecvema;
  brecvemaButton.classList.toggle('active', state.brecvema);
  brecvemaButton.setAttribute('aria-pressed', String(state.brecvema));
  brecvemaButton.textContent = state.brecvema ? 'BRECVEMA / INSPECTOR OPEN' : 'BRECVEMA / P.N.S.';
  if (state.brecvema) renderMechanismSelection();
  updateScaleReadout();
});
for (const button of mechanismButtons) button.addEventListener('click', () => selectMechanism(button.dataset.mechanism));
for (const button of hierarchyButtons) {
  button.addEventListener('click', () => {
    if (button.disabled) return;
    const level = Number(button.dataset.level);
    state.level = level;
    updateScaleReadout();
  });
}
for (const [mode, button] of [['2d', view2dButton], ['3d', view3dButton]]) {
  button.addEventListener('click', () => {
    state.viewMode = mode;
    view2dButton.classList.toggle('active', mode === '2d');
    view3dButton.classList.toggle('active', mode === '3d');
    view2dButton.setAttribute('aria-pressed', String(mode === '2d'));
    view3dButton.setAttribute('aria-pressed', String(mode === '3d'));
  });
}
syncScaleControl();
renderZoomEquation();
updateScaleReadout();

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  backgroundMaterial.uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  const aspect = innerWidth / innerHeight;
  overheadCamera.left = -5 * aspect;
  overheadCamera.right = 5 * aspect;
  overheadCamera.top = 5;
  overheadCamera.bottom = -5;
  overheadCamera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
const clock = new THREE.Clock();
function frame() {
  const time = clock.getElapsedTime();
  const delta = clock.getDelta();
  state.visualScale += (state.scale - state.visualScale) * 0.075;
  if (state.transport.playing && Math.abs(state.visualScale - state.scale) < 0.035) {
    const secondsPerStep = 60 / state.transport.bpm * state.transport.quantization;
    if (!state.transport.nextAt) state.transport.nextAt = time + secondsPerStep;
    if (time >= state.transport.nextAt) {
      const zoom = activeZoom();
      if (state.transport.position < zoom.scales.length - 1) {
        advancePath(1);
        state.transport.nextAt = time + secondsPerStep;
      } else toggleTransport();
    }
  }
  if (state.impulse) {
    state.responseTime = Math.min(1, state.responseTime + 0.004);
    if (state.responseTime >= 1) state.impulse = 0;
  }
  if (state.brecvema || state.impulse) renderBodyGrid(time);
  const responsePulse = state.impulse * (1 + Math.max(0, state.selectedMechanisms.size - 1) * 0.15) * Math.exp(-state.responseTime * 3.4);
  backgroundMaterial.uniforms.uTime.value = time;
  backgroundMaterial.uniforms.uScale.value = state.visualScale;
  const quantumMode = state.implementation === 'canonical-i-v' && state.scale === 0 && state.level === 4;
  backgroundMaterial.uniforms.uLevel.value = state.level;
  backgroundMaterial.uniforms.uPath.value = state.implementation === 'canonical-i-v' ? 1 : state.route === 'animal-to-flock' ? 2 : state.route === 'animal-to-church' ? 3 : 0;
  const profile = fractalProfiles[Math.min(fractalProfiles.length - 1, Math.floor(state.visualScale / 2))];
  backgroundMaterial.uniforms.uPower.value = profile.power;
  backgroundMaterial.uniforms.uFold.value = profile.fold;
  backgroundMaterial.uniforms.uFlight.value = starflight.active * starflight.direction;
  backgroundMaterial.uniforms.uDepth.value = quantumMode ? 0.012 : state.backgroundDepth;
  backgroundMaterial.uniforms.uQuality.value = Number(fractalQuality.value);
  backgroundMaterial.uniforms.uSomatic.value = state.somatic;
  backgroundMaterial.uniforms.uLimbic.value = state.limbic;
  backgroundMaterial.uniforms.uCognitive.value = state.cognitive;
  backgroundMaterial.uniforms.uPulse.value = responsePulse;
  updateStarflight(delta, profile, responsePulse);
  root.rotation.y = state.level === 4 ? 0 : Math.sin(time * 0.18) * 0.24;
  root.rotation.x = state.level === 4 ? 0 : Math.sin(time * 0.13) * 0.035;
  const scaleFraction = state.visualScale / 19;
  const humanSceneWeight = state.implementation === 'canonical-i-v'
    ? Math.max(0, 1 - Math.abs(state.visualScale - 7) / 2)
    : state.visualScale <= 8 ? 1 : Math.max(0, 1 - (state.visualScale - 8) * 2);
  const morphologyWeight = quantumMode ? 0 : 1 - humanSceneWeight;
  const cellularCanonical = state.implementation === 'canonical-i-v' && state.scale === 4;
  const astralCanonical = state.implementation === 'canonical-i-v' && (state.scale === 10 || state.scale === 14);
  const fromSigma = Math.floor(state.visualScale);
  const toSigma = Math.min(19, fromSigma + 1);
  const morphologyMix = state.visualScale - fromSigma;
  const fromMorphism = getScaleMorphism(fromSigma);
  const toMorphism = getScaleMorphism(toSigma);
  root.visible = !astralCanonical && humanSceneWeight > 0.01;
  for (const { marker, level } of fieldLabelMarkers) marker.visible = !astralCanonical && humanSceneWeight > 0.01 && state.level >= level;
  for (const layer of morphologyLayers) {
    updateMorphologyLayer(layer, fromMorphism, toMorphism, morphologyMix, time, responsePulse);
    const levelWeight = state.level >= layer.level ? 1 : 0;
    layer.material.opacity = cellularCanonical || astralCanonical ? 0 : morphologyWeight * levelWeight * (layer.key === 'physical' ? 0.68 : layer.key === 'response' ? 0.82 : 0.72);
    layer.material.size = layer.size * (1 + responsePulse * (layer.key === 'response' ? 2.4 : 1.15));
  }
  scaleField.rotation.y = time * 0.06 + state.visualScale * 0.13;
  scaleField.rotation.z = Math.sin(time * 0.13) * 0.08;
  updateQuantumFoam(time, responsePulse);
  updateCellularField(time, responsePulse);
  updateAstralFields(time, responsePulse);
  stars.material.opacity = quantumMode ? 0.08 : 0.28 + scaleFraction * 0.52;
  grid.visible = !quantumMode;
  updatePartSeeds(time, responsePulse);
  updateCollectiveForeground(time, responsePulse);
  const humanWeight = state.level === 11 ? humanSceneWeight : 0;
  const feelingWeight = state.level >= 8 ? humanSceneWeight : 0;
  const physicalWeight = state.level >= 4 ? humanSceneWeight : 0;
  root.scale.setScalar(0.72);
  root.position.y = -0.1;
  brecvemaLayer.rotation.y = time * 0.16;
  const humanScale = state.scale === 7 || state.scale === 8;
  brecvemaLayer.visible = state.brecvema && humanScale && state.level === 11 && humanSceneWeight > 0.01;
  for (const channel of mechanismChannels) {
    const selected = state.selectedMechanisms.has(channel.id);
    channel.line.material.color.copy(selected ? pink : violet);
    channel.line.material.opacity = selected ? 0.98 : 0.12;
    channel.node.scale.setScalar(selected ? 1.75 : 0.78);
    channel.label.material.opacity = selected ? 1 : 0.3;
  }
  const somaticPulse = 1 + state.somatic * (0.08 + Math.sin(time * 2.2) * 0.05) + responsePulse * 0.24;
  updateJointField(time, responsePulse, physicalWeight);
  somaticRing.scale.setScalar(somaticPulse * (1 + scaleFraction * 0.12)); somaticRing.material.opacity = (0.06 + state.somatic * 0.18) * humanWeight;
  somaCore.material.opacity = (0.08 + state.somatic * 0.42) * humanWeight;
  for (const [index, layer] of somaDimensions.entries()) {
    layer.scale.setScalar(1 + scaleFraction * 0.16 + state.somatic * (0.08 + index * 0.025) + Math.sin(time * 1.6 + index) * 0.025);
    layer.material.opacity = (0.18 + state.somatic * 0.5) * humanWeight;
  }
  limbicRing.scale.setScalar(1 + state.limbic * (0.12 + Math.sin(time * 1.5) * 0.07) + responsePulse * 0.3); limbicRing.material.opacity = (0.05 + state.limbic * 0.15 + responsePulse * 0.1) * feelingWeight;
  limbicCore.material.opacity = (0.2 + state.limbic * 0.75 + responsePulse * 0.25) * feelingWeight;
  limbicWell.visible = state.level >= 8;
  limbicWell.scale.setScalar(0.9 + state.limbic * 0.2);
  wellMaterial.opacity = (0.45 + state.limbic * 0.45 + responsePulse * 0.25) * feelingWeight;
  barrier.material.opacity = (0.25 + state.limbic * 0.55 + responsePulse * 0.35) * feelingWeight;
  thresholdRing.position.y = 2.4 + state.cognitive * 0.75; thresholdRing.material.opacity = (0.2 + state.cognitive * 0.8) * humanWeight;
  cortex.material.opacity = (0.18 + state.cognitive * 0.75) * humanWeight;
  mindFractal.visible = state.level === 11;
  mindFractal.rotation.y = time * 0.72;
  mindFractal.rotation.z = Math.sin(time * 0.6) * 0.24;
  fractalMaterial.opacity = (0.22 + state.cognitive * 0.72) * humanWeight;
  brainPhysical.material.opacity = (0.3 + state.cognitive * 0.65) * physicalWeight;
  neuralMaterial.opacity = 0.3 + state.cognitive * 0.62;
  const emfAmplitude = 0.06 + (state.somatic + state.cognitive) * 0.1 + responsePulse * 0.3;
  emfShell.material.opacity = emfAmplitude * feelingWeight;
  emfHalo.material.opacity = emfAmplitude * 0.5 * feelingWeight;
  emfCloud.material.opacity = (0.06 + state.cognitive * 0.2) * feelingWeight;
  emfCloud.material.size = 0.015 + state.cognitive * 0.025 + responsePulse * 0.04;
  emfCloud.rotation.y = time * 0.045;
  emfShell.scale.set(1.08 + Math.sin(time * 1.4) * state.cognitive * 0.035, 1 + Math.sin(time * 1.2) * 0.025, 0.72);
  for (const [index, contour] of emfContours.entries()) {
    contour.scale.setScalar(1 + state.cognitive * 0.16 + Math.sin(time * 1.1 + index) * 0.045);
    contour.material.opacity = (0.05 + state.cognitive * 0.18) * feelingWeight;
  }
  stars.material.size = 0.018 + scaleFraction * 0.032;
  stars.material.opacity = 0.28 + scaleFraction * 0.52;
    if (!quantumMode) stars.material.opacity = 0.28 + scaleFraction * 0.52;
  for (const mesh of body) {
    mesh.material.opacity = (0.18 + state.somatic * 0.5) * physicalWeight;
    mesh.material.color.copy(state.level === 4 ? physicalGrey : cyan);
  }
  for (const line of limbs) {
    line.material.opacity = (0.25 + state.somatic * 0.5) * physicalWeight;
    line.material.color.copy(state.level === 4 ? physicalGrey : cyan);
  }
  if (state.impulse) timeReadout.textContent = `T = ${state.responseTime.toFixed(2)} / RESPONSE DECAY ${getPlate(state.scale).time.toUpperCase()}`;
  renderer.autoClear = true;
  renderer.render(backgroundScene, backgroundCamera);
  renderer.autoClear = false;
  renderer.clearDepth();
  renderer.render(scene, state.viewMode === '2d' ? overheadCamera : camera);
  renderer.autoClear = true;
  requestAnimationFrame(frame);
}
frame();

document.querySelector('#export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'soma-field-operator.png';
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
});
