import * as THREE from 'three';
import { levels as registryLevels, paths as registryPaths, models as registryModels, eras as registryEras, lenses as registryLenses, coverage as registryCoverage, zUSFAbstract, sourceResolver, examples as registryExamples, questions as registryQuestions } from './generated/app-data.js';
import { appraisalDimensions, bodyGrid } from './human-affect.js';
import { getScaleMorphism } from './scale-morphisms.js';
import { get, has as hasRenderer, register } from './renderers/index.js';
import { FieldAudio } from './audio/field-audio.js';
import { createMother } from './mother.js';
import { createQuestionTours } from './questions.js';
import { createTimeAxis } from './time-axis.js';
import { createDimensionDynamics } from './dynamics.js';
import { createPanelManager } from './panels.js';
import { anchorsForLevel } from './renderers/lib/anchors.js';

// Every renderers/*.js module registers itself through its default export
// ({ id, create }); adding a renderer never requires editing this file.
const rendererModules = import.meta.glob(['./renderers/*.js', '!./renderers/index.js'], { eager: true });
for (const module of Object.values(rendererModules)) {
  if (module.default?.id && module.default?.create) register(module.default.id, module.default);
}

const levelsById = new Map(registryLevels.map(level => [level.id, level]));
const pathsById = new Map(registryPaths.map(path => [path.id, path]));
const modelsById = new Map(registryModels.map(model => [model.id, model]));
const erasById = new Map((registryEras ?? []).map(era => [era.id, era]));
const questionsById = new Map(registryQuestions.map(question => [question.id, question]));
const universalModel = modelsById.get('universal-21') ?? registryModels[0];
const legacySigmaToLevelId = new Map((universalModel?.levels ?? [])
  .filter(entry => Number.isInteger(entry.coordinate) && entry.level)
  .map(entry => [entry.coordinate, entry.level]));
const universalCoordinateByLevel = new Map([...legacySigmaToLevelId.entries()].map(([coordinate, levelId]) => [levelId, coordinate]));
const levelOrder = [...legacySigmaToLevelId.values()];
const modelRouteById = Object.fromEntries(registryModels.map(model => [model.id, model.paths?.[0] ?? 'full-atlas']));
const claimOrder = ['FORMAL', 'SOURCED', 'INTERPRETIVE'];
const organismLevelIds = new Set(['human-vertebrate']);
const thoughtSparkLevelIds = new Set(['human-vertebrate']);
const dimensionDemoLevelIds = new Set(['human-vertebrate', 'dyad', 'cellular-synaptic']);
const rendererInstances = new Map();

const lenses = [
  { id: 'physics', label: 'PHYSICS', description: 'Scale-appropriate observables and standard baseline equations.' },
  { id: 'response', label: 'RESPONSE', description: 'Impulse, propagation, damping, coupling, and memory.' },
  ...(registryLenses?.observation_layers ?? []),
  { id: 'mirror', label: 'MIRROR', description: 'Observer-side interpretive contour; never a claim of non-human occurrent emotion.' },
].filter((lens, index, array) => lens?.id && array.findIndex(candidate => candidate.id === lens.id) === index);

const cheatSheetSections = [
  { id: 'identity', label: 'IDENTITY' },
  { id: 'physics', label: 'PHYSICS' },
  { id: 'response', label: 'RESPONSE' },
  { id: 'morphism', label: 'MORPHISM' },
  { id: 'evidence', label: 'EVIDENCE' },
  { id: 'interpretation', label: 'INTERPRETATION' },
  { id: 'operate', label: 'OPERATE' },
  { id: 'renderer', label: 'RENDERER' },
];
const displayPresets = [
  { id: 'essential', label: 'ESSENTIAL', sections: ['identity', 'response', 'operate'] },
  { id: 'physics', label: 'PHYSICS', sections: ['identity', 'physics', 'response'] },
  { id: 'dynamics', label: 'DYNAMICS', sections: ['identity', 'response', 'morphism', 'operate'] },
  { id: 'evidence', label: 'EVIDENCE', sections: ['identity', 'physics', 'evidence', 'interpretation'] },
  { id: 'full', label: 'FULL LEDGER', sections: cheatSheetSections.map(section => section.id) },
];
const readerRegisters = [
  { id: 'cookie', label: 'COOKIE' },
  { id: 'general', label: 'GENERAL' },
  { id: 'specialist', label: 'SPECIALIST' },
];

function clampIndex(index, length) {
  return Math.max(0, Math.min(Math.max(0, length - 1), index));
}

function modelEntries(modelId) {
  const model = modelsById.get(modelId) ?? universalModel;
  const entries = [];
  for (const entry of model?.levels ?? []) {
    if (Array.isArray(entry.levels)) {
      for (const levelId of entry.levels) entries.push({ levelId, coordinate: entry.coordinate, coordinateLabel: `${entry.coordinate} / ${entry.label}` });
    } else if (entry.level) {
      entries.push({ levelId: entry.level, coordinate: entry.coordinate, coordinateLabel: String(entry.coordinate) });
    }
  }
  const seen = new Set();
  return entries.filter(entry => levelsById.has(entry.levelId) && !seen.has(entry.levelId) && seen.add(entry.levelId));
}

function levelSigma(levelId) {
  return universalCoordinateByLevel.get(levelId) ?? Math.max(0, levelOrder.indexOf(levelId));
}

function levelByLegacySigma(sigma) {
  return legacySigmaToLevelId.get(sigma) ?? levelOrder[clampIndex(sigma, levelOrder.length)];
}

function activeLevel() {
  return levelsById.get(state.levelId) ?? levelsById.get(levelOrder[0]) ?? registryLevels[0];
}

function activeModel() {
  return modelsById.get(state.implementation) ?? universalModel;
}

function activeModelIndex() {
  return Math.max(0, modelEntries(state.implementation).findIndex(entry => entry.levelId === state.levelId));
}

function defaultPathForModel(modelId) {
  return modelRouteById[modelId] ?? registryPaths[0]?.id ?? 'full-atlas';
}

function getScalePath(id) {
  return pathsById.get(id) ?? registryPaths[0];
}

function getPathEdge(id) {
  for (const path of registryPaths) {
    const edge = path.edge_records?.find(candidate => candidate.id === id);
    if (edge) return edge;
  }
  return null;
}

function pathEdgesFor(path) {
  return (path?.edge_records ?? []).filter(Boolean);
}

function badgeForLevel(level) {
  const values = Object.values(level.claims ?? {}).filter(Boolean);
  return claimOrder.find(claim => values.includes(claim)) ?? 'INTERPRETIVE';
}

function levelExplanation(level, register = 'general') {
  const value = level.explain?.[register] ?? level.explain?.general ?? '';
  if (typeof value === 'string') return { text: value, draft: false };
  return { text: value?.text ?? '', draft: Boolean(value?.draft) };
}

function sourceLabel(source) {
  if (!source) return 'Source not yet published';
  const suffix = source.publication_label === 'not yet published' ? ' (not yet published)' : '';
  return `${source.title}${suffix}`;
}

function sourceSummary(sources = []) {
  return sources.length ? sources.map(sourceLabel).join(' | ') : 'No resolved public source yet';
}

function appendSourceLink(container, source) {
  const link = document.createElement('a');
  link.href = source.url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = sourceLabel(source);
  container.append(link);
}

function renderTextWithMath(container, text) {
  container.replaceChildren();
  for (const paragraphText of text.split('\n\n')) {
    const paragraph = document.createElement('p');
    const parts = paragraphText.split(/(\$[^$]+\$|`[^`]+`)/g).filter(Boolean);
    for (const part of parts) {
      if (part.startsWith('$') && part.endsWith('$')) {
        const span = document.createElement('span');
        const tex = part.slice(1, -1);
        if (globalThis.katex) globalThis.katex.render(tex, span, { throwOnError: false });
        else span.textContent = tex;
        paragraph.append(span);
      } else if (part.startsWith('`') && part.endsWith('`')) {
        const code = document.createElement('code');
        code.textContent = part.slice(1, -1);
        paragraph.append(code);
      } else {
        paragraph.append(document.createTextNode(part));
      }
    }
    container.append(paragraph);
  }
}

const abstractSplash = document.querySelector('#abstract-splash');
const abstractSplashCopy = document.querySelector('#abstract-splash-copy');
const abstractSplashSource = document.querySelector('#abstract-splash-source');
const abstractSplashEnter = document.querySelector('#abstract-splash-enter');

renderTextWithMath(abstractSplashCopy, zUSFAbstract);
abstractSplashSource.replaceChildren();
abstractSplashSource.append('SOURCE / ');
appendSourceLink(abstractSplashSource, sourceResolver.abstract_source);
abstractSplashEnter.addEventListener('click', () => {
  sessionStorage.setItem('zusf-abstract-acknowledged', 'true');
  abstractSplash.hidden = true;
});
if (sessionStorage.getItem('zusf-abstract-acknowledged') === 'true') abstractSplash.hidden = true;

const atlasCoverageLedger = document.querySelector('#atlas-coverage-ledger');
const atlasCoverageHeading = document.createElement('p');
atlasCoverageHeading.className = 'atlas-coverage__summary';
atlasCoverageHeading.textContent = `${registryCoverage.available_renderer_ids.length} RENDERERS / ${registryCoverage.level_count} LEVELS | ${registryCoverage.missing_renderer_ids.length} PLACEHOLDER IDS`;
const atlasCoverageList = document.createElement('ul');
for (const level of registryLevels) {
  const item = document.createElement('li');
  const rendererId = level.renderer?.id ?? 'missing';
  const status = registryCoverage.available_renderer_ids.includes(rendererId) ? 'dedicated' : 'generic';
  item.className = `atlas-coverage__item atlas-coverage__item--${status}`;
  item.textContent = `${level.id} / ${level.label} / ${rendererId.toUpperCase()}`;
  atlasCoverageList.append(item);
}
const namedCoverage = document.createElement('p');
namedCoverage.className = 'atlas-coverage__named';
namedCoverage.textContent = `MISSING RENDERERS / ${registryCoverage.missing_renderer_ids.join(' | ') || 'NONE'}`;
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
const stereoCamera = new THREE.StereoCamera();
stereoCamera.eyeSep = 0.064;
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
  marker.userData.worldLabel = true;
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

const quantumFoam = get('quantum-foam').create(scene, THREE);
const thoughtSparks = get('thought-sparks').create(scene, THREE);

const cellularDensityCanvas = document.createElement('canvas');
cellularDensityCanvas.width = 160;
cellularDensityCanvas.height = 100;
const cellularDensityContext = cellularDensityCanvas.getContext('2d');
const cellularDensityTexture = new THREE.CanvasTexture(cellularDensityCanvas);
cellularDensityTexture.colorSpace = THREE.SRGBColorSpace;
const cellularDensityMap = new THREE.Mesh(
  new THREE.PlaneGeometry(9.6, 6),
  new THREE.MeshBasicMaterial({ map: cellularDensityTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
);
cellularDensityMap.rotation.x = -Math.PI / 2;
cellularDensityMap.position.y = -1.5;
cellularDensityMap.visible = false;
scene.add(cellularDensityMap);
let lastCellularDensityMapUpdate = 0;
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
function updateCellularField(time, pulse) {
  const cellularBand = activeLevel().id === 'cellular-synaptic';
  const displayLevel = activeDimensionLevel();
  const visible = false; // The dedicated cellular renderer replaces this legacy 3D field.
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
    for (const contour of domain.halo.children) contour.material.opacity = state.tTheory && displayLevel === 8 ? 0.42 + pulse * 0.35 : 0;
  }
  const links = [];
  if (state.tTheory && displayLevel === 8) for (let source = 0; source < cellularDomains.length; source += 1) {
    for (let target = source + 1; target < cellularDomains.length; target += 1) {
      const from = cellularDomains[source].group.position;
      const to = cellularDomains[target].group.position;
      if (from.distanceTo(to) < cellularDomains[source].radius + cellularDomains[target].radius + 0.26) links.push(from.x, from.y, from.z, to.x, to.y, to.z);
    }
  }
  cellularLinks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(links, 3));
  cellularLinks.material.opacity = visible && state.tTheory && displayLevel === 8 ? 0.58 + pulse * 0.34 : 0;
}

function updateAstralFields(time, pulse) {
  const stellarVisible = ['stellar', 'species-stellar'].includes(activeLevel().id);
  const cosmicVisible = ['observable-universe', 'cosmic-web', 'cosmic-filaments'].includes(activeLevel().id);
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

function drawCellularDensityMap(time, pulse) {
  const displayLevel = activeDimensionLevel();
  const { width, height } = cellularDensityCanvas;
  const image = cellularDensityContext.createImageData(width, height);
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
        if (displayLevel === 8) emf += Math.exp(-(distance ** 2) / (domain.radius * domain.radius * 3.1))
          * Math.cos(distance * 11 - time * 5.2 + domain.phase);
      }
      const contourBand = displayLevel === 8 && Math.abs((emf * 3.6) % 1) < 0.055 ? 1 : 0;
      const intensity = Math.min(1, cytoplasm + membrane * 0.86 + nucleus * 0.94 + pulse * 0.14);
      const offset = (pixelY * width + pixelX) * 4;
      const emfIntensity = Math.min(1, Math.abs(emf) * 0.68 + contourBand * 0.55 + pulse * 0.16);
      data[offset] = Math.round(displayLevel === 8 ? 8 + 48 * intensity + 20 * emfIntensity : 9 + 245 * (membrane * 0.65 + nucleus * 0.95 + pulse * 0.1));
      data[offset + 1] = Math.round(displayLevel === 8 ? 26 + 224 * emfIntensity : 22 + 222 * (cytoplasm + membrane * 0.88 + pulse * 0.16));
      data[offset + 2] = Math.round(displayLevel === 8 ? 40 + 190 * (0.24 + intensity * 0.35 + contourBand * 0.45) : 43 + 190 * (cytoplasm + membrane * 0.42 + nucleus * 0.45));
      data[offset + 3] = Math.round(displayLevel === 8 ? Math.min(1, 0.22 + emfIntensity * 0.78) * 255 : Math.min(1, intensity * 0.94 + membrane * 0.25) * 255);
    }
  }
  cellularDensityContext.putImageData(image, 0, 0);
  cellularDensityTexture.needsUpdate = true;
}


function updateCellularDensityLayer(time, pulse) {
  const visible = state.viewMode === '2d' && activeDimensionLevel() === 8
    && activeLevel().id === 'cellular-synaptic' && state.tTheory;
  cellularDensityMap.visible = visible;
  cellularDensityMap.material.opacity = visible ? 0.96 : 0;
  if (visible && (pulse > 0.01 || time - lastCellularDensityMapUpdate > 1 / 15)) {
    drawCellularDensityMap(time, pulse);
    lastCellularDensityMapUpdate = time;
  }
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
  const activePath = state.route === 'full-atlas' || state.route === 'animal-to-flock' || state.route === 'human-assembly-to-institution';
  const active = activePath && state.visualScale >= 7.98 && state.visualScale <= 10.15 && state.level >= 4;
  partSeeds.visible = active;
  if (!active) return;
  const dyadMix = smoothstep(Math.min(1, progress * 2));
  const targetMix = smoothstep(Math.max(0, progress * 2 - 1));
  const church = state.route === 'human-assembly-to-institution';
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
  const church = state.route === 'human-assembly-to-institution' && state.visualScale >= 8.7;
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

function readHashState() {
  const params = new URLSearchParams(location.hash.slice(1));
  return {
    hasLevel: params.has('level'),
    hasPath: params.has('path'),
    hasLens: params.has('lens'),
    hasModel: params.has('model'),
    hasReader: params.has('reader'),
    hasEra: params.has('era'),
    hasDemo: params.has('demo'),
    hasDim: params.has('dim'),
    hasAtlas: params.has('atlas'),
    level: params.get('level'),
    path: params.get('path'),
    lens: params.get('lens'),
    model: params.get('model'),
    reader: params.get('reader'),
    era: params.get('era'),
    demo: params.get('demo'),
    dim: params.get('dim'),
    atlas: params.get('atlas'),
    hasQuestion: params.has('q'),
    question: params.get('q'),
    compare: params.get('compare'),
    contours: params.get('contours'),
    styleoff: params.get('styleoff'),
    ui: params.get('ui'),
    labels: params.get('labels'),
  };
}

function loadReaderRegister() {
  try {
    const saved = localStorage.getItem('usm-reader-register');
    if (readerRegisters.some(registerEntry => registerEntry.id === saved)) return saved;
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }
  return 'general';
}

const state = {
  somatic: 0.72,
  limbic: 0.86,
  cognitive: 0.46,
  levelId: levelByLegacySigma(0),
  scale: 0,
  visualScale: 0,
  level: 11,
  reader: loadReaderRegister(),
  developerSources: false,
  libraryOpen: false,
  viewMode: '3d',
  stereoSbs: false,
  compare: false,
  contours: false,
  // Imaging styles (renderers read these); all off gives a plain line drawing.
  style: { fluorescence: true, falsecolour: true, glow: true, motion: true },
  tTheory: true,
  brecvema: false,
  selectedMechanism: 'B',
  selectedMechanisms: new Set(),
  appraisal: Object.fromEntries(appraisalDimensions.map(dimension => [dimension.id, 0])),
  implementation: 'universal-21',
  eraId: null,
  canonicalStart: 'I',
  canonicalEnd: 'V',
  route: defaultPathForModel('universal-21'),
  questionId: null,
  lenses: new Set(['physics', 'response']),
  responseTime: 0,
  impulse: 0,
  displaySections: new Set(loadDisplaySections()),
  transport: { playing: false, bpm: 92, position: 0, quantization: 4, nextAt: 0 },
  backgroundDepth: 0,
  mathDepth: 0,
  thoughtNoiseD: 0.16,
  thoughtThreshold: 0.82,
  uiClean: false,
  labelsOff: false,
  atlasCapture: false,
};
let suppressHashWrite = false;
let timeAxis = null;
let panelManager = null;
// A poke plays over the same wall-clock span at every level; the readout states the level's own time scale.
const POKE_DISPLAY_SECONDS = 4;
const fieldAudio = new FieldAudio({ pokeSeconds: POKE_DISPLAY_SECONDS });
const responseTimeInput = document.querySelector('#response-time');
state.pokeRunning = false;

function responseTimeReadout(level) {
  const tau = level.response_time ? `τ ≈ ${level.response_time}` : 'τ UNSET';
  timeReadout.title = level.response_time_basis ? `Characteristic response time (order of magnitude): ${level.response_time_basis}` : '';
  return `T = ${state.responseTime.toFixed(2)} τ / ${tau}`;
}
for (const name of ['somatic', 'limbic', 'cognitive', 'response-time']) document.querySelector(`#${name}`).addEventListener('input', event => {
  const stateKey = name === 'response-time' ? 'responseTime' : name;
  state[stateKey] = Number(event.target.value);
  if (name === 'response-time') {
    // Scrubbing holds the impulse response at the chosen time instead of animating it.
    state.pokeRunning = false;
    state.impulse = state.responseTime > 0 ? 1 : 0;
  }
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
const readerRegisterSelect = document.querySelector('#reader-register');
const libraryToggle = document.querySelector('#library-toggle');
const libraryPanel = document.querySelector('#library-panel');
const libraryTitle = document.querySelector('#library-title');
const libraryList = document.querySelector('#library-list');
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
const contoursInput = document.querySelector('#contours');
contoursInput.addEventListener('change', () => {
  state.contours = contoursInput.checked;
  writeHashState();
});
for (const key of Object.keys(state.style)) {
  document.querySelector(`#style-${key}`).addEventListener('change', event => {
    state.style[key] = event.target.checked;
    writeHashState();
  });
}
const wallTitle = document.querySelector('#wall-title');
const equationKicker = document.querySelector('.equation-kicker');
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
const headerEyebrow = document.querySelector('.field-readout .eyebrow');
const view2dButton = document.querySelector('#view-2d');
const view3dButton = document.querySelector('#view-3d');
const stereoSbsButton = document.querySelector('#view-sbs');
const tTheoryButton = document.querySelector('#t-theory-toggle');
const thoughtSparksPanel = document.querySelector('#thought-sparks-panel');
const thoughtNoiseInput = document.querySelector('#thought-noise');
const thoughtThresholdInput = document.querySelector('#thought-threshold');
const wallScaleDown = document.querySelector('#wall-scale-down');
const wallScaleUp = document.querySelector('#wall-scale-up');
const pathBack = document.querySelector('#path-back');
const pathPlay = document.querySelector('#path-play');
const pathNext = document.querySelector('#path-next');
const pathBpm = document.querySelector('#path-bpm');
const pathTransportReadout = document.querySelector('#path-transport-readout');
const backgroundDim = document.querySelector('#background-dim');
const fractalQuality = document.querySelector('#fractal-quality');
const developerSourcesInput = document.querySelector('#developer-sources');
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
const fieldNote = document.querySelector('.field-note');
const dimensionDynamics = createDimensionDynamics({ getState: () => state, activeLevel, activeDimensionLevel });
let questionTours = null;

const demoViews = {
  dyad: { level: 'dyad', path: 'dyadic-care', dimension: 11 },
  'dyad-4d': { level: 'dyad', path: 'dyadic-care', dimension: 4 },
  'dyad-8d': { level: 'dyad', path: 'dyadic-care', dimension: 8 },
  'dyad-11d': { level: 'dyad', path: 'dyadic-care', dimension: 11 },
  'dyadic-phase-locking': { level: 'dyad', path: 'dyadic-care', dimension: 11 },
  cellular: { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 8 },
  'cellular-4d': { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 4 },
  'cellular-8d': { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 8 },
  'cellular-11d': { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 11 },
  'cellular-synaptic': { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 8 },
  'action-potential': { level: 'cellular-synaptic', path: 'micro-to-life', dimension: 8 },
  'human-vertebrate': { level: 'human-vertebrate', path: 'micro-to-life', dimension: 8 },
  'human-8d': { level: 'human-vertebrate', path: 'micro-to-life', dimension: 8 },
};

function syncQuestionTours() {
  questionTours?.sync(state.questionId, state.levelId);
}

function applyDemoView(demoId) {
  const demo = demoViews[demoId];
  if (!demo || !levelsById.has(demo.level)) return false;
  state.questionId = null;
  state.eraId = null;
  state.levelId = demo.level;
  state.scale = levelSigma(state.levelId);
  state.visualScale = state.scale;
  state.tTheory = true;
  state.compare = false;
  state.contours = false;
  state.level = demo.dimension;
  if (demo.path && pathsById.has(demo.path)) {
    state.route = demo.path;
    const routeModel = registryModels.find(model => model.paths?.includes(demo.path));
    if (routeModel) state.implementation = routeModel.id;
  } else {
    fitLevelRoute(state.levelId);
  }
  document.querySelector('#contours').checked = state.contours;
  syncQuestionTours();
  return true;
}

function applyQuestionView(questionId, { write = true, render = true } = {}) {
  if (!questionId) {
    state.questionId = null;
    syncQuestionTours();
    if (write) writeHashState();
    return;
  }
  const question = questionsById.get(questionId);
  if (!question) return;
  state.questionId = question.id;
  if (levelsById.has(question.level)) {
    state.levelId = question.level;
    state.scale = levelSigma(state.levelId);
    state.visualScale = state.scale;
  }
  if (question.path && pathsById.has(question.path)) {
    state.route = question.path;
    const routeModel = registryModels.find(model => model.paths?.includes(question.path));
    if (routeModel) state.implementation = routeModel.id;
  }
  if (question.view?.lens === 'off') state.tTheory = false;
  if (question.view?.lens === 'on') state.tTheory = true;
  state.compare = Boolean(question.view?.compare);
  state.contours = Boolean(question.view?.contours);
  if ([4, 8, 11].includes(question.view?.dimension)) state.level = question.view.dimension;
  document.querySelector('#contours').checked = state.contours;
  routeSelect.value = state.route;
  implementationSelect.value = state.implementation;
  syncQuestionTours();
  if (render) {
    syncScaleControl();
    renderZoomEquation();
    updateScaleReadout();
  }
  if (write) writeHashState();
}

function applyHashState({ render = true } = {}) {
  const hashState = readHashState();
  state.uiClean = hashState.ui === 'clean';
  state.labelsOff = hashState.labels === 'off' || (state.uiClean && hashState.labels !== 'on');
  panelManager?.setCleanMode(state.uiClean, { writeHash: false });
  if (hashState.hasModel && modelsById.has(hashState.model)) {
    state.implementation = hashState.model;
    state.route = defaultPathForModel(hashState.model);
  }
  if (hashState.hasLens) {
    if (hashState.lens === 'off') state.tTheory = false;
    if (hashState.lens === 'on') state.tTheory = true;
  }
  if (hashState.hasReader && readerRegisters.some(registerEntry => registerEntry.id === hashState.reader)) {
    state.reader = hashState.reader;
  }
  if (hashState.hasDim && ['4', '8', '11'].includes(hashState.dim)) {
    state.level = Number(hashState.dim);
  }
  state.atlasCapture = hashState.atlas === '1';
  state.compare = hashState.compare === '1';
  state.contours = hashState.contours === '1';
  document.querySelector('#contours').checked = state.contours;
  const styleOff = new Set((hashState.styleoff ?? '').split('.').filter(Boolean));
  for (const key of Object.keys(state.style)) {
    state.style[key] = !styleOff.has(key);
    document.querySelector(`#style-${key}`).checked = state.style[key];
  }
  if (hashState.hasPath) {
    // Paths merged into the canonical set (2026-10-01) keep their old links working.
    const pathId = { 'animal-to-church': 'human-assembly-to-institution', 'community-to-institution': 'human-assembly-to-institution' }[hashState.path] ?? hashState.path;
    const hashedRoute = registryPaths.find(route => route.id === pathId);
    if (hashedRoute) {
      state.route = hashedRoute.id;
      const routeModel = registryModels.find(model => model.paths?.includes(hashedRoute.id));
      if (routeModel && !hashState.hasModel) state.implementation = routeModel.id;
    }
  }
  if (hashState.hasLevel) {
    const hashedSigma = Number(hashState.level);
    if (levelsById.has(hashState.level)) {
      state.levelId = hashState.level;
      state.scale = levelSigma(state.levelId);
      state.visualScale = state.scale;
    } else if (Number.isInteger(hashedSigma) && hashedSigma >= 0 && hashedSigma <= 20) {
      state.levelId = levelByLegacySigma(hashedSigma);
      state.scale = levelSigma(state.levelId);
      state.visualScale = state.scale;
    }
  }
  if (hashState.hasEra && erasById.has(hashState.era)) {
    const era = erasById.get(hashState.era);
    state.eraId = era.id;
    state.levelId = era.level;
    state.scale = levelSigma(state.levelId);
    state.visualScale = state.scale;
  } else if (hashState.hasEra) {
    state.eraId = null;
  }
  if ((hashState.hasLevel || state.eraId) && !hashState.hasPath) {
    // A level-only link must not be overridden by a remembered path or model that lacks the level.
    fitLevelRoute(state.levelId);
  }
  if (hashState.hasDemo) applyDemoView(hashState.demo);
  if (hashState.hasQuestion && questionsById.has(hashState.question)) {
    applyQuestionView(hashState.question, { write: false, render: false });
  } else if (hashState.hasQuestion) {
    state.questionId = null;
  } else {
    state.questionId = null;
  }
  state.transport.playing = false;
  state.transport.nextAt = 0;
  if (!render) return;
  suppressHashWrite = true;
  routeSelect.value = state.route;
  implementationSelect.value = state.implementation;
  readerRegisterSelect.value = state.reader;
  pathPlay.classList.remove('active');
  pathPlay.setAttribute('aria-pressed', 'false');
  pathPlay.textContent = 'PLAY PATH';
  syncScaleControl();
  renderZoomEquation();
  suppressHashWrite = false;
  updateScaleReadout();
  timeAxis?.setSelected(state.eraId);
}

applyHashState({ render: false });
for (const route of registryPaths) routeSelect.add(new Option(route.label, route.id));
routeSelect.value = state.route;
for (const model of registryModels) implementationSelect.add(new Option(model.label, model.id));
implementationSelect.value = state.implementation;
for (const entry of modelEntries('canonical-5')) {
  const label = `${entry.coordinate} / ${levelsById.get(entry.levelId)?.label ?? entry.levelId}`;
  canonicalStart.add(new Option(label, entry.levelId));
  canonicalEnd.add(new Option(label, entry.levelId));
}
state.canonicalStart = canonicalStart.options[0]?.value ?? state.levelId;
state.canonicalEnd = canonicalEnd.options[canonicalEnd.options.length - 1]?.value ?? state.levelId;
canonicalStart.value = state.canonicalStart;
canonicalEnd.value = state.canonicalEnd;
for (const registerEntry of readerRegisters) readerRegisterSelect.add(new Option(registerEntry.label, registerEntry.id));
readerRegisterSelect.value = state.reader;
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
  const model = activeModel();
  const depthLabels = ['INVARIANT', 'SCALE LEDGER', 'OPERATORS + CONTEXT'];
  mathDepthReadout.textContent = depthLabels[state.mathDepth];
  mathDepthDown.disabled = state.mathDepth === 0;
  mathDepthUp.disabled = state.mathDepth === depthLabels.length - 1;
  if (state.mathDepth === 0) {
    const line = document.createElement('div');
    const invariant = '(\\nabla^2+k(\\sigma)^2)G_\\sigma(x,x\\prime)=\\delta(x-x\\prime)';
    if (globalThis.katex) globalThis.katex.render(invariant, line, { displayMode: true, throwOnError: false });
    else line.textContent = invariant;
    zoomEquationFull.append(line);
  } else {
    for (const entry of modelEntries(model.id)) {
      const level = levelsById.get(entry.levelId);
      const row = document.createElement('section');
      row.className = 'model-equation';
      const rowLabel = document.createElement('span');
      rowLabel.className = 'model-equation-label';
      rowLabel.textContent = `${entry.coordinateLabel} / ${level.label}`;
      const math = document.createElement('div');
      if (globalThis.katex) globalThis.katex.render(level.equation, math, { displayMode: true, throwOnError: false });
      else math.textContent = level.equation;
      row.append(rowLabel, math);
      if (state.mathDepth === 2) {
        const operator = document.createElement('p');
        operator.className = 'model-equation-operator';
        operator.textContent = `OPERATOR / ${level.field}`;
        const detail = document.createElement('p');
        detail.className = 'model-equation-context';
        detail.textContent = levelExplanation(level, state.reader).text;
        row.append(operator, detail);
      }
      zoomEquationFull.append(row);
    }
  }
  zoomEquationSource.textContent = `MODEL / ${model.description} / SOURCE / ${sourceLabel(sourceResolver.abstract_source)}`;
}

function renderCanonicalExpansion() {
  const entries = modelEntries('canonical-5');
  const start = entries.findIndex(entry => entry.levelId === state.canonicalStart);
  const end = entries.findIndex(entry => entry.levelId === state.canonicalEnd);
  const lower = Math.min(start, end);
  const upper = Math.max(start, end);
  const selected = entries.slice(lower, upper + 1);
  canonicalReadout.textContent = selected.map(entry => levelsById.get(entry.levelId)?.label ?? entry.levelId).join(' → ');
  if (state.implementation === 'canonical-5' && selected.length) {
    state.levelId = selected[0].levelId;
    state.scale = levelSigma(state.levelId);
  }
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

function addLedgerSources(container, key, sources) {
  const line = document.createElement('p');
  if (key) {
    const label = document.createElement('span');
    label.className = 'cheat-ledger-key';
    label.textContent = `${key}: `;
    line.append(label);
  }
  if (!sources?.length) line.append('No resolved public source yet');
  else {
    sources.forEach((source, index) => {
      if (index) line.append(' | ');
      appendSourceLink(line, source);
    });
  }
  container.append(line);
}

function developerRepoPaths(level, edge) {
  const paths = [
    ...(level.resolved_sources ?? []).map(source => source.repo_path).filter(Boolean),
    ...(level.resolved_media ?? []).map(source => source.repo_path).filter(Boolean),
  ];
  if (edge?.resolved_source?.repo_path) paths.push(edge.resolved_source.repo_path);
  return [...new Set(paths)];
}

function renderLibrary(level) {
  libraryTitle.textContent = level.label;
  libraryList.replaceChildren();
  const groups = [
    { title: 'Papers', items: level.resolved_sources ?? [] },
    { title: 'Atlas and media', items: level.resolved_media ?? [] },
    { title: 'Related books and collections', items: level.related_collections ?? [] },
  ];
  for (const group of groups) {
    const section = document.createElement('section');
    section.className = 'library-group';
    const heading = document.createElement('h3');
    heading.textContent = group.title;
    const list = document.createElement('ul');
    const items = group.items.length ? group.items : [{ title: 'No resolved document yet', url: sourceResolver.unpublished_base_url, publication_label: 'not yet published' }];
    for (const source of items) {
      const item = document.createElement('li');
      appendSourceLink(item, source);
      list.append(item);
    }
    section.append(heading, list);
    libraryList.append(section);
  }
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
      addLedgerLine(block, 'LEVEL', `${sheet.id} / ${sheet.label}`);
      addLedgerLine(block, 'MODEL POSITION', `${activeModel().label} / ${state.scale}`);
      addLedgerLine(block, 'SECTOR', sheet.sector);
      addLedgerLine(block, 'SUBSTRATE', sheet.substrate);
      addLedgerLine(block, 'LENGTH', sheet.length_scale);
    } else if (section.id === 'physics') {
      addLedgerLine(block, 'PHYSICAL', sheet.atlas_rows?.physical ?? sheet.substrate);
      addLedgerLine(block, 'EQUATION', sheet.equation);
      addLedgerLine(block, 'FIELD', sheet.field);
    } else if (section.id === 'response') {
      addLedgerLine(block, 'EXPLANATION', levelExplanation(sheet, state.reader).text);
      addLedgerLine(block, 'REGISTER', state.reader.toUpperCase());
      if (levelExplanation(sheet, state.reader).draft) addLedgerLine(block, 'STATUS', 'DRAFT');
    } else if (section.id === 'morphism') {
      if (edge) {
        addLedgerLine(block, 'EDGE', `${edge.label} / ${edge.from} -> ${edge.to}`);
        addLedgerLine(block, 'PRESERVE', edge.preserves.join('; '));
        addLedgerLine(block, 'ADD', edge.adds.join('; '));
        addLedgerLine(block, 'INTEGRATE OUT', edge.integrates_out?.join('; ') ?? '');
        addLedgerLine(block, 'KERNEL', edge.kernel);
        addLedgerLine(block, 'RENDER', edge.render_operation);
        if (edge.resolved_source) addLedgerSources(block, 'SOURCE', [edge.resolved_source]);
      } else addLedgerLine(block, 'PATH', 'Move the scale dial to a path edge to inspect its typed morphism.');
    } else if (section.id === 'evidence') {
      addLedgerLine(block, 'CLAIMS', Object.entries(sheet.claims ?? {}).map(([level, claim]) => `${level.toUpperCase()} ${claim}`).join(' / '));
      addLedgerSources(block, 'SOURCES', sheet.resolved_sources);
      if (state.developerSources) {
        for (const repoPath of developerRepoPaths(sheet, edge)) addLedgerLine(block, 'REPO PATH', repoPath);
      }
    } else if (section.id === 'interpretation') {
      addLedgerLine(block, 'MIND CLAIM', sheet.claims?.mind ?? 'INTERPRETIVE');
      addLedgerLine(block, 'CONTOUR', sheet.atlas_rows?.mind ?? 'Interpretive layer unavailable.');
    } else if (section.id === 'operate') {
      addLedgerLine(block, 'CONTROLS', organismLevelIds.has(sheet.id) ? 'SOMATIC, LIMBIC, COGNITIVE, BRECVEMA, THOUGHT SPARKS' : 'ZOOM, RESPONSE TIME, POKE');
      addLedgerLine(block, 'SCOPE', organismLevelIds.has(sheet.id) ? 'Organism renderer available.' : 'Typed substrate renderer or placeholder only.');
    } else if (section.id === 'renderer') {
      addLedgerLine(block, 'ID', sheet.renderer?.id ?? 'placeholder');
      addLedgerLine(block, 'STATUS', registryCoverage.available_renderer_ids.includes(sheet.renderer?.id) ? 'IMPLEMENTED' : 'PLACEHOLDER');
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
  const entries = modelEntries(state.implementation);
  return { entries, scales: entries.map(entry => entry.levelId), label: activeModel().label.toUpperCase() };
}

function activeDimensionLevel() {
  return state.tTheory ? state.level : 4;
}

function baselineEquation(plate) {
  if (plate.id === 'human-vertebrate') return '4D physiology, acoustics, motion, and measured nervous-system observables';
  if (plate.id === 'whole-brain-cemi') return '(\\nabla^2+k_{\\mathrm{brain}}^2)G=\\delta';
  return plate.equation;
}

function baselineField(plate) {
  if (plate.id === 'human-vertebrate') return 'ordinary physiological observables';
  if (plate.id === 'whole-brain-cemi') return 'neural tissue and measured EM activity';
  return plate.field;
}

function equationToLatex(equation) {
  const exact = new Map([
    ['G_P(x,x\') = <x | G | x\'>', 'G_P(x,x\')=\\langle x\\mid G\\mid x\'\\rangle'],
    ['G_string(s,s\') = -(alpha\'/2) log |s-s\'|^2', 'G_{\\mathrm{string}}(s,s\')=-\\frac{\\alpha\'}{2}\\log\\lvert s-s\'\\rvert^2'],
    ['G_Y(r) = e^{-m r} / (4 pi r)', 'G_Y(r)=\\frac{e^{-mr}}{4\\pi r}'],
    ['G_C(r) = 1 / (4 pi r)', 'G_C(r)=\\frac{1}{4\\pi r}'],
    ['H psi = E psi', 'H\\psi=E\\psi'],
    ['(d^2/dx^2 - lambda^-2)V = I_inject', '(\\partial_x^2-\\lambda^{-2})V=I_{\\mathrm{inject}}'],
    ['(v_s^-2 d_t^2 - nabla^2 + k^2)Phi = -J', '(v_s^{-2}\\partial_t^2-\\nabla^2+k^2)\\Phi=-J'],
    ['(nabla^2 + k_CEMI^2)G = delta', '(\\nabla^2+k_{\\mathrm{CEMI}}^2)G=\\delta'],
    ['(nabla^2 + k_brain^2)G = delta', '(\\nabla^2+k_{\\mathrm{brain}}^2)G=\\delta'],
    ['gamma e_dot = -grad H(e) + sqrt(2D) xi(t) + J(t)', '\\gamma\\dot{e}=-\\nabla H(e)+\\sqrt{2D}\\,\\xi(t)+J(t)'],
    ['|omega_A - omega_B| < Delta omega_lock(kappa)', '|\\omega_A-\\omega_B|<\\Delta\\omega_{\\mathrm{lock}}(\\kappa)'],
    ['partial_t v + lambda(v dot grad)v = -grad P + D_T nabla^2 v', '\\partial_t\\mathbf v+\\lambda(\\mathbf v\\cdot\\nabla)\\mathbf v=-\\nabla P+D_T\\nabla^2\\mathbf v'],
    ['partial_t u = D nabla^2 u + f(u)', '\\partial_t u=D\\nabla^2u+f(u)'],
    ['(nabla^2 + k_geo^2)G_geo = delta', '(\\nabla^2+k_{\\mathrm{geo}}^2)G_{\\mathrm{geo}}=\\delta'],
    ['nabla^2 Phi = 4 pi G rho', '\\nabla^2\\Phi=4\\pi G\\rho'],
    ['omega^2 = k/m', '\\omega^2=k/m'],
    ['rho partial_tt u_i = C_ijkl partial_j partial_k u_l', '\\rho\\,\\partial_{tt}u_i=C_{ijkl}\\partial_j\\partial_ku_l'],
    ['rho(D_t u) = -grad P + eta nabla^2 u + rho g', '\\rho(D_t\\mathbf u)=-\\nabla P+\\eta\\nabla^2\\mathbf u+\\rho\\mathbf g'],
    ['Box h_mn = -16 pi G T_mn', '\\Box h_{\\mu\\nu}=-16\\pi G\\,T_{\\mu\\nu}'],
  ]);
  if (exact.has(equation)) return exact.get(equation);
  return `\\text{${String(equation).replace(/[{}\\]/g, '').replace(/\s+/g, '\\;')}}`;
}

function modelContainsLevel(modelId, levelId) {
  return modelEntries(modelId).some(entry => entry.levelId === levelId);
}

function fitLevelRoute(levelId) {
  const currentRoute = registryPaths.find(route => route.id === state.route);
  if (!currentRoute?.nodes.includes(levelId)) {
    const modelPaths = modelsById.get(state.implementation)?.paths ?? [];
    const fit = registryPaths.find(route => modelPaths.includes(route.id) && route.nodes.includes(levelId))
      ?? registryPaths.find(route => route.id === 'full-atlas' && route.nodes.includes(levelId))
      ?? registryPaths.find(route => route.nodes.includes(levelId));
    if (fit) state.route = fit.id;
  }
  if (!modelContainsLevel(state.implementation, levelId)) {
    const fitModel = registryModels.find(model => model.paths?.includes(state.route) && modelContainsLevel(model.id, levelId))
      ?? registryModels.find(model => modelContainsLevel(model.id, levelId));
    if (fitModel) state.implementation = fitModel.id;
  }
}

function selectEra(era, { write = true } = {}) {
  state.eraId = era?.id ?? null;
  if (era) {
    state.transport.playing = false;
    state.transport.nextAt = 0;
    state.levelId = era.level;
    state.scale = levelSigma(state.levelId);
    state.visualScale = state.scale;
    fitLevelRoute(state.levelId);
    if (state.scale < 7 && state.level === 11) state.level = 4;
  }
  routeSelect.value = state.route;
  implementationSelect.value = state.implementation;
  pathPlay.classList.remove('active');
  pathPlay.setAttribute('aria-pressed', 'false');
  pathPlay.textContent = 'PLAY PATH';
  syncScaleControl();
  renderZoomEquation();
  updateScaleReadout();
  timeAxis?.setSelected(state.eraId);
  if (write) writeHashState();
}

function hashForState() {
  const params = new URLSearchParams();
  params.set('level', state.levelId);
  params.set('path', state.route);
  params.set('lens', state.tTheory ? 'on' : 'off');
  params.set('dim', String(activeDimensionLevel()));
  params.set('model', state.implementation);
  params.set('reader', state.reader);
  if (state.eraId) params.set('era', state.eraId);
  if (state.questionId) params.set('q', state.questionId);
  if (state.compare) params.set('compare', '1');
  if (state.contours) params.set('contours', '1');
  if (state.uiClean) params.set('ui', 'clean');
  if (state.atlasCapture) params.set('atlas', '1');
  if (state.labelsOff) params.set('labels', 'off');
  else if (state.uiClean) params.set('labels', 'on');
  const styleOff = Object.keys(state.style).filter(key => !state.style[key]);
  if (styleOff.length) params.set('styleoff', styleOff.join('.'));
  return `#${params.toString()}`;
}

function writeHashState() {
  if (suppressHashWrite) return;
  const nextHash = hashForState();
  if (location.hash !== nextHash) history.replaceState(null, '', nextHash);
}

function syncTTheoryUI() {
  document.body.classList.toggle('t-theory-off', !state.tTheory);
  tTheoryButton.textContent = `T-THEORY: ${state.tTheory ? 'ON' : 'OFF'}`;
  tTheoryButton.classList.toggle('active', state.tTheory);
  tTheoryButton.setAttribute('aria-pressed', String(state.tTheory));
  fieldNote.textContent = state.tTheory
    ? 'M4: BODY / P3: PROPAGATOR + EMF / L1: LIMBIC / C3: CORTEX + MIND'
    : 'PHYSICS BASELINE: 4D BODY / BRAIN / NERVES ONLY';
  headerEyebrow.textContent = state.tTheory ? '[T] / SOMA MACHINE' : 'SOMA MACHINE / PHYSICS BASELINE';
  if (!state.tTheory && state.brecvema) {
    state.brecvema = false;
    brecvemaInspector.hidden = true;
    brecvemaButton.classList.remove('active');
    brecvemaButton.setAttribute('aria-pressed', 'false');
    brecvemaButton.textContent = 'BRECVEMA / P.N.S.';
  }
}

function syncScaleControl() {
  const zoom = activeZoom();
  const position = activeModelIndex();
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
  const exactIndex = zoom.scales.indexOf(state.levelId);
  if (exactIndex >= 0) state.transport.position = exactIndex;
  else state.transport.position = activeModelIndex();
  pathBack.disabled = state.transport.position === 0;
  pathNext.disabled = state.transport.position === zoom.scales.length - 1;
  pathTransportReadout.textContent = `${state.transport.playing ? 'PLAYING' : 'STOPPED'} / ${state.transport.bpm} BPM / ${zoom.label} STEP ${state.transport.position + 1} OF ${zoom.scales.length}`;
}

function setPathStep(position) {
  const zoom = activeZoom();
  const clamped = Math.max(0, Math.min(zoom.scales.length - 1, position));
  const previousScale = state.scale;
  state.transport.position = clamped;
  state.levelId = zoom.scales[clamped];
  state.scale = levelSigma(state.levelId);
  if (state.scale < 7 && state.level === 11) state.level = 4;
  if (state.scale !== previousScale) {
    starflight.active = 1;
    starflight.direction = state.scale > previousScale ? 1 : -1;
    starflight.lastScale = state.scale;
  }
  syncScaleControl();
  updateScaleReadout();
}

function advancePath(direction) {
  const currentPosition = activeModelIndex();
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
  const plate = activeLevel();
  state.scale = levelSigma(plate.id);
  const displayLevel = activeDimensionLevel();
  const isHuman = displayLevel === 11;
  const isFeeling = displayLevel === 8;
  const isPhysical = displayLevel === 4;
  const humanScale = organismLevelIds.has(plate.id);
  const explanation = levelExplanation(plate, state.reader);
  const physicalReading = plate.atlas_rows?.physical ?? plate.substrate;
  const responseReading = explanation.text;
  const integrationReading = explanation.text;
  const primaryReading = isPhysical ? physicalReading : isFeeling ? responseReading : integrationReading;
  const activeLensLabels = state.tTheory ? lenses.filter(lens => state.lenses.has(lens.id)).map(lens => lens.label) : ['PHYSICS BASELINE'];
  const mirrorReading = plate.claims?.mind === 'INTERPRETIVE' ? 'Interpretive contour available with claim boundary.' : '';
  const reading = state.tTheory ? [primaryReading, state.lenses.has('mirror') ? mirrorReading : '', explanation.draft ? 'DRAFT.' : ''].filter(Boolean).join(' ') : physicalReading;
  const badge = (isPhysical ? plate.claims?.physical : isFeeling ? plate.claims?.field : plate.claims?.mind) ?? badgeForLevel(plate);
  const route = getScalePath(state.route);
  const edge = pathEdgesFor(route).find(candidate => candidate?.from === plate.id)
    ?? pathEdgesFor(route).find(candidate => candidate?.to === plate.id);
  const modelEntry = modelEntries(state.implementation).find(entry => entry.levelId === plate.id);
  scaleReadout.textContent = `${modelEntry?.coordinateLabel ?? state.scale} / ${plate.label}`;
  projectionReadout.textContent = state.tTheory
    ? `${displayLevel}D / ${activeLensLabels.join(' + ')} / ${plate.substrate.toUpperCase()}`
    : `PHYSICS BASELINE / 4D / ${plate.substrate.toUpperCase()}`;
  equationTitle.textContent = state.tTheory ? `${activeLensLabels.join(' + ')} / ${plate.label}` : `PHYSICS BASELINE / ${plate.label}`;
  equationPrimary.replaceChildren();
  const primaryEquation = state.tTheory ? plate.equation : baselineEquation(plate);
  if (globalThis.katex && primaryEquation.includes('\\')) globalThis.katex.render(primaryEquation, equationPrimary, { throwOnError: false });
  else equationPrimary.textContent = primaryEquation;
  equationSecondary.textContent = primaryReading;
  dimensionReadout.textContent = isHuman ? 'M4 + P3 + L1 + C3 = 11D' : isFeeling ? 'M4 + P3 + L1 = 8D' : 'M4 = 4D / PHYSICS BASELINE';
  wavenumberReadout.textContent = state.tTheory ? plate.field : baselineField(plate);
  lengthReadout.textContent = plate.length_scale;
  rankReadout.textContent = humanScale ? 'human-scale eligible' : 'typed substrate reading';
  timeReadout.textContent = responseTimeReadout(plate);
  typeStatus.textContent = state.tTheory
    ? `${badge} / ${humanScale ? 'HUMAN-SCALE VOCABULARY AVAILABLE' : 'RETYPE VARIABLES FOR SELECTED SUBSTRATE'}`
    : `${badge} / PHYSICS BASELINE ACTIVE`;
  typeStatus.classList.toggle('error', state.tTheory && !isHuman && state.brecvema);
  pathReadout.textContent = route.id === 'full-atlas'
    ? 'DEFAULT PATH / QUANTUM FOAM -> OBSERVABLE UNIVERSE'
    : `PATH / ${route.purpose}`;
  pathEdgeReadout.textContent = edge
    ? `MORPHISM / ${edge.label} / ${edge.from} -> ${edge.to} / ${edge.claim}`
    : 'PATH EDGE / MOVE THE SCALE DIAL TO A CONNECTED TRANSITION TO INSPECT ITS MORPHISM';
  syncTransportPosition();
  for (const control of lensControls) {
    if (control.id === 'lens-mirror') {
      control.disabled = plate.claims?.mind !== 'INTERPRETIVE';
      if (plate.claims?.mind !== 'INTERPRETIVE' || !state.tTheory) state.lenses.delete('mirror');
    }
    control.disabled = !state.tTheory || (control.id === 'lens-mirror' && plate.claims?.mind !== 'INTERPRETIVE');
    control.checked = state.lenses.has(control.id.replace('lens-', ''));
  }
  brecvemaButton.disabled = !humanScale || !state.tTheory;
  appraisalPanel.hidden = !humanScale || !state.tTheory;
  bodyMapPanel.hidden = !humanScale || !state.tTheory;
  thoughtSparksPanel.hidden = !humanScale || !state.tTheory;
  brecvemaButton.title = humanScale && state.tTheory ? 'Open the human music-affect mechanism lens' : 'BRECVEMA is available at the human biological scales only when T-Theory is on';
  const quantumCanonical = state.scale < 7;
  for (const button of hierarchyButtons) {
    const isElevenDimensional = Number(button.dataset.level) === 11;
    button.disabled = (!state.tTheory && Number(button.dataset.level) !== 4)
      || (quantumCanonical && isElevenDimensional && !dimensionDemoLevelIds.has(plate.id));
    button.classList.toggle('active', Number(button.dataset.level) === displayLevel);
  }
  equationKicker.textContent = state.tTheory ? 'DEPENDENT-TYPE MORPHISM INTERFACE' : 'PHYSICS BASELINE';
  wallTitle.textContent = state.tTheory
    ? `${displayLevel}D / ${plate.label}`
    : `PHYSICS BASELINE / ${plate.label}`;
  wallArchitecture.dataset.tex = isHuman ? '\\mathcal{M}_{11}=M_4\\times P_3\\times L_1\\times C_3' : isFeeling ? '\\mathcal{M}_8=M_4\\times P_3\\times L_1' : '\\mathcal{M}_4';
  wallState.dataset.tex = '\\mathrm{Substrate}=\\text{' + plate.substrate.replace(/ /g, '\\;') + '}';
  wallDynamics.dataset.tex = !state.tTheory
    ? equationToLatex(baselineEquation(plate))
    : plate.equation;
  wallLevelLaw.dataset.tex = isFeeling ? 'G_R\\ast J\\;\\Rightarrow\\;\\text{causal response}' : isHuman ? '\\operatorname{Spec}(X)=\\text{integrated organization}' : '\\text{physics baseline at selected scale}';
  wallDimensions.replaceChildren();
  wallDimensions.append('SOURCE: ');
  if (plate.resolved_sources?.[0]) appendSourceLink(wallDimensions, plate.resolved_sources[0]);
  else wallDimensions.append('not yet published');
  wallStatus.textContent = `${badge} / ${reading}`;
  cheatSheetBadge.textContent = badge;
  cheatSheetBadge.classList.toggle('sourced', badge === 'SOURCED');
  cheatSheetTitle.textContent = `${displayLevel}D ${plate.label}`;
  cheatSheetSummary.textContent = reading;
  cheatSheetSource.textContent = `SOURCES / ${sourceSummary(plate.resolved_sources)}`;
  visualTodo.textContent = `${plate.renderer?.id ?? 'placeholder'} / ${registryCoverage.available_renderer_ids.includes(plate.renderer?.id) ? 'IMPLEMENTED' : 'PLACEHOLDER RENDERER'}`;
  for (const [id, input] of sectionToggles) input.checked = state.displaySections.has(id);
  const matchingPreset = displayPresets.find(preset => preset.sections.length === state.displaySections.size
    && preset.sections.every(id => state.displaySections.has(id)));
  displayPreset.value = matchingPreset?.id ?? 'custom';
  renderCheatSheetLedger(plate, edge);
  renderLibrary(plate);
  renderWallMath();
  syncTTheoryUI();
  syncQuestionTours();
  writeHashState();
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
  state.route = defaultPathForModel(state.implementation);
  const firstEntry = modelEntries(state.implementation)[0];
  if (firstEntry) {
    state.levelId = firstEntry.levelId;
    state.scale = levelSigma(state.levelId);
  }
  if (state.implementation === 'canonical-5') state.level = 4;
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
  state.scale = levelSigma(state.levelId);
  scaleInput.value = String(activeModelIndex());
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
readerRegisterSelect.addEventListener('change', () => {
  state.reader = readerRegisterSelect.value;
  try {
    localStorage.setItem('usm-reader-register', state.reader);
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }
  updateScaleReadout();
  renderZoomEquation();
});
libraryToggle.addEventListener('click', () => {
  state.libraryOpen = !state.libraryOpen;
  libraryPanel.hidden = !state.libraryOpen;
  libraryToggle.classList.toggle('active', state.libraryOpen);
  libraryToggle.setAttribute('aria-pressed', String(state.libraryOpen));
  if (state.libraryOpen) renderLibrary(activeLevel());
});
developerSourcesInput.addEventListener('change', () => {
  state.developerSources = developerSourcesInput.checked;
  updateScaleReadout();
});
for (const control of lensControls) control.addEventListener('change', () => {
  const lens = control.id.replace('lens-', '');
  if (control.checked) state.lenses.add(lens);
  else state.lenses.delete(lens);
  updateScaleReadout();
});
tTheoryButton.addEventListener('click', () => {
  state.tTheory = !state.tTheory;
  updateScaleReadout();
});
thoughtNoiseInput.addEventListener('input', () => {
  state.thoughtNoiseD = Number(thoughtNoiseInput.value);
});
thoughtThresholdInput.addEventListener('input', () => {
  state.thoughtThreshold = Number(thoughtThresholdInput.value);
});
document.querySelector('#poke').addEventListener('click', () => {
  state.impulse = 1;
  state.pokeRunning = true;
  state.responseTime = 0;
  document.querySelector('#response-time').value = '0';
  dimensionDynamics.poke({ strength: state.limbic });
  updateScaleReadout();
  fieldAudio.poke({ level: activeLevel() });
});
const audioToggle = document.querySelector('#audio-toggle');
audioToggle.addEventListener('click', async () => {
  if (fieldAudio.enabled) fieldAudio.disable();
  else await fieldAudio.enable();
  audioToggle.classList.toggle('active', fieldAudio.enabled);
  audioToggle.setAttribute('aria-pressed', String(fieldAudio.enabled));
  audioToggle.textContent = fieldAudio.enabled ? 'AUDIO: ON' : 'AUDIO: OFF';
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
    dimensionDynamics.reset();
    updateScaleReadout();
  });
}
for (const [mode, button] of [['2d', view2dButton], ['3d', view3dButton]]) {
  button.addEventListener('click', () => {
    state.viewMode = mode;
    if (mode === '2d') state.stereoSbs = false;
    view2dButton.classList.toggle('active', mode === '2d');
    view3dButton.classList.toggle('active', mode === '3d');
    view2dButton.setAttribute('aria-pressed', String(mode === '2d'));
    view3dButton.setAttribute('aria-pressed', String(mode === '3d'));
    stereoSbsButton.classList.toggle('active', state.stereoSbs);
    stereoSbsButton.setAttribute('aria-pressed', String(state.stereoSbs));
    resize();
  });
}
stereoSbsButton.addEventListener('click', () => {
  state.stereoSbs = !state.stereoSbs;
  if (state.stereoSbs) state.viewMode = '3d';
  if (state.stereoSbs) setCompare(false);
  view2dButton.classList.toggle('active', state.viewMode === '2d');
  view3dButton.classList.toggle('active', state.viewMode === '3d' && !state.stereoSbs);
  stereoSbsButton.classList.toggle('active', state.stereoSbs);
  view2dButton.setAttribute('aria-pressed', String(state.viewMode === '2d'));
  view3dButton.setAttribute('aria-pressed', String(state.viewMode === '3d' && !state.stereoSbs));
  stereoSbsButton.setAttribute('aria-pressed', String(state.stereoSbs));
  resize();
});
addEventListener('hashchange', () => applyHashState());
const compareButton = document.querySelector('#view-compare');
const compareLabels = document.querySelector('#compare-labels');
const compareRightLabel = document.querySelector('#compare-right');
function setCompare(on) {
  state.compare = on;
  if (on && state.stereoSbs) {
    state.stereoSbs = false;
    stereoSbsButton.classList.remove('active');
    stereoSbsButton.setAttribute('aria-pressed', 'false');
    view3dButton.classList.toggle('active', state.viewMode === '3d');
    view3dButton.setAttribute('aria-pressed', String(state.viewMode === '3d'));
  }
  compareButton.classList.toggle('active', on);
  compareButton.setAttribute('aria-pressed', String(on));
  compareLabels.hidden = !on;
  resize();
  writeHashState();
}
compareButton.addEventListener('click', () => setCompare(!state.compare));

const mother = createMother({
  getContext: () => {
    const level = activeLevel();
    return {
      levelId: level.id,
      levelLabel: level.label,
      lengthScale: level.length_scale,
      responseTime: level.response_time ?? 'not set',
      pathLabel: registryPaths.find(route => route.id === state.route)?.label ?? state.route,
      modelLabel: modelsById.get(state.implementation)?.label ?? state.implementation,
      lensOn: state.tTheory,
      dimension: activeDimensionLevel(),
      reader: state.reader,
    };
  },
});

questionTours = createQuestionTours({
  questions: registryQuestions,
  levelsById,
  getActiveQuestionId: () => state.questionId,
  getLevelId: () => state.levelId,
  onSelect: questionId => applyQuestionView(questionId),
  onMother: prompt => mother.open(prompt),
  scene,
  THREE,
});
syncQuestionTours();

// Worked examples (registry/examples): the 4D step under the baseline half,
// the matching T-Theory step under the field half.
const compareCards = document.querySelector('#compare-cards');
const compareCardLeft = document.querySelector('#compare-card-left');
const compareCardRight = document.querySelector('#compare-card-right');
panelManager = createPanelManager({
  clean: state.uiClean,
  onCleanChange: clean => {
    state.uiClean = clean;
    if (clean && !readHashState().labels) state.labelsOff = true;
    writeHashState();
  },
});
document.addEventListener('keydown', event => {
  if (event.defaultPrevented || event.key.toLowerCase() !== 'l' || !state.uiClean) return;
  if (event.target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  event.preventDefault();
  state.labelsOff = !state.labelsOff;
  writeHashState();
});
panelManager.registerPanel(document.querySelector('.field-readout'), { id: 'controls', title: 'FIELD CONTROLS', dockLabel: 'CONTROLS', minWidth: 260, minHeight: 260 });
panelManager.registerPanel(document.querySelector('.equation-wall'), { id: 'morphism', title: 'DEPENDENT-TYPE MORPHISM', dockLabel: 'MORPHISM', minWidth: 320, minHeight: 220 });
panelManager.registerPanel(document.querySelector('.mother-terminal'), { id: 'mother', title: 'MOTHER / H-AL TERMINAL', dockLabel: 'MOTHER', minWidth: 380, minHeight: 250 });
panelManager.registerPanel(document.querySelector('.question-card'), { id: 'whats-different', title: "WHAT'S DIFFERENT?", dockLabel: 'DIFFERENCE', minWidth: 310, minHeight: 180 });
panelManager.registerPanel(document.querySelector('#dimension-dynamics-panel'), { id: 'state-dynamics', title: 'STATE DYNAMICS', dockLabel: 'STATE', minWidth: 300, minHeight: 220 });
panelManager.registerPanel(compareCards, { id: 'compare-examples', title: 'COMPARE EXAMPLES', dockLabel: 'COMPARE', minWidth: 340, minHeight: 230 });
const examplesByLevel = new Map();
for (const example of registryExamples) {
  if (!examplesByLevel.has(example.level)) examplesByLevel.set(example.level, []);
  examplesByLevel.get(example.level).push(example);
}
let exampleIndex = 0;
let compareCardsKey = '';

function fillCompareCard(card, example, step, count, withCycle) {
  card.replaceChildren();
  const kicker = document.createElement('p');
  kicker.className = 'compare-card__kicker';
  kicker.textContent = `WORKED EXAMPLE${count > 1 ? ` ${exampleIndex + 1}/${count}` : ''} / ${example.label} / ${step.badge}`;
  card.append(kicker);
  if (withCycle && count > 1) {
    const cycle = document.createElement('button');
    cycle.type = 'button';
    cycle.className = 'compare-card__cycle';
    cycle.textContent = 'NEXT EXAMPLE';
    cycle.addEventListener('click', () => { exampleIndex = (exampleIndex + 1) % count; compareCardsKey = ''; });
    card.append(cycle);
  }
  const title = document.createElement('h3');
  title.textContent = step.title;
  const body = document.createElement('p');
  renderTextWithMath(body, step.body);
  const equation = document.createElement('div');
  equation.className = 'compare-card__equation';
  if (globalThis.katex) globalThis.katex.render(step.equation, equation, { displayMode: true, throwOnError: false });
  else equation.textContent = step.equation;
  const sources = document.createElement('p');
  sources.className = 'compare-card__sources';
  for (const source of step.resolved_sources ?? []) {
    const item = source.url ? document.createElement('a') : document.createElement('span');
    if (source.url) { item.href = source.url; item.target = '_blank'; item.rel = 'noopener'; }
    item.textContent = source.kind === 'paper' ? source.id : source.label ?? source.title ?? source.id;
    if (source.title) item.title = source.title;
    sources.append(item);
  }
  card.append(title, body, equation, sources);
}

function updateCompareCards(rightLevel) {
  const levelExamples = examplesByLevel.get(state.levelId) ?? [];
  const key = state.compare && !state.questionId && levelExamples.length ? `${state.levelId}|${rightLevel}|${exampleIndex}` : 'none';
  if (key === compareCardsKey) return;
  compareCardsKey = key;
  compareCards.hidden = key === 'none';
  if (key === 'none') return;
  const example = levelExamples[exampleIndex % levelExamples.length];
  const stepFor = axis => example.steps.find(step => step.axis === axis);
  const rightAxis = rightLevel >= 11 ? '11d-mind' : '8d-life';
  fillCompareCard(compareCardLeft, example, stepFor('4d-baseline'), levelExamples.length, false);
  fillCompareCard(compareCardRight, example, stepFor(rightAxis) ?? stepFor('8d-life'), levelExamples.length, true);
}
syncScaleControl();
syncTTheoryUI();
renderZoomEquation();
updateScaleReadout();
timeAxis = createTimeAxis({
  eras: registryEras,
  levelsById,
  state,
  onSelect: era => selectEra(era),
});
timeAxis?.setSelected(state.eraId);

const viewportSize = new THREE.Vector2();
const labelWorldPosition = new THREE.Vector3();
const labelWorldScale = new THREE.Vector3();

function rectsIntersect(a, b, padding = 4) {
  return a.left < b.right + padding && a.right > b.left - padding && a.top < b.bottom + padding && a.bottom > b.top - padding;
}

function labelScreenRect(sprite, viewCamera, viewport) {
  sprite.getWorldPosition(labelWorldPosition);
  labelWorldPosition.project(viewCamera);
  if (labelWorldPosition.z < -1 || labelWorldPosition.z > 1) return null;
  sprite.getWorldScale(labelWorldScale);
  const x = viewport.left + (labelWorldPosition.x + 1) * 0.5 * viewport.width;
  const y = viewport.top + (1 - (labelWorldPosition.y + 1) * 0.5) * viewport.height;
  let pixelsPerWorld;
  if (viewCamera.isOrthographicCamera) {
    pixelsPerWorld = viewport.height / Math.max(0.001, viewCamera.top - viewCamera.bottom);
  } else {
    const distance = viewCamera.position.distanceTo(sprite.getWorldPosition(new THREE.Vector3()));
    pixelsPerWorld = viewport.height / Math.max(0.001, 2 * distance * Math.tan(THREE.MathUtils.degToRad(viewCamera.fov) * 0.5));
  }
  const width = Math.max(24, Math.abs(labelWorldScale.x) * pixelsPerWorld);
  const height = Math.max(14, Math.abs(labelWorldScale.y) * pixelsPerWorld);
  return { left: x - width / 2, right: x + width / 2, top: y - height / 2, bottom: y + height / 2 };
}

const anchorWorldPosition = new THREE.Vector3();
function projectAnchor(anchor, viewCamera, viewport, panels) {
  anchorWorldPosition.fromArray(anchor.position);
  anchorWorldPosition.project(viewCamera);
  const inFrustum = anchorWorldPosition.x >= -1 && anchorWorldPosition.x <= 1
    && anchorWorldPosition.y >= -1 && anchorWorldPosition.y <= 1
    && anchorWorldPosition.z >= -1 && anchorWorldPosition.z <= 1;
  const x = viewport.left + (anchorWorldPosition.x + 1) * 0.5 * viewport.width;
  const y = viewport.top + (1 - (anchorWorldPosition.y + 1) * 0.5) * viewport.height;
  const panelRect = { left: x - 10, right: x + 10, top: y - 10, bottom: y + 10, width: 20, height: 20 };
  const blockedByPanel = panels.some(panel => rectsIntersect(panelRect, panel, 8));
  return { x, y, ndc: { x: anchorWorldPosition.x, y: anchorWorldPosition.y, z: anchorWorldPosition.z }, inFrustum, blockedByPanel, visible: inFrustum && !blockedByPanel };
}

window.__somaAnchors = () => {
  const level = activeLevel();
  const { x: width, y: height } = renderer.getSize(viewportSize);
  const viewCamera = state.viewMode === '2d' ? overheadCamera : camera;
  const panels = panelManager?.visiblePanelRects() ?? [];
  const base = {
    level: level.id,
    label: level.label,
    lens: state.tTheory ? 'on' : 'off',
    dimension: activeDimensionLevel(),
    compare: state.compare && !state.stereoSbs,
    viewport: { width, height, devicePixelRatio: renderer.getPixelRatio() },
  };
  const anchors = anchorsForLevel(level.id);
  if (!base.compare) {
    const viewport = { left: 0, top: 0, width, height };
    return { ...base, anchors: anchors.map(anchor => ({ ...anchor, screen: projectAnchor(anchor, viewCamera, viewport, panels) })) };
  }
  const halfWidth = Math.floor(width / 2);
  return {
    ...base,
    anchors: anchors.map(anchor => ({
      ...anchor,
      halves: {
        left: projectAnchor(anchor, viewCamera, { left: 0, top: 0, width: halfWidth, height }, panels),
        right: projectAnchor(anchor, viewCamera, { left: halfWidth, top: 0, width: halfWidth, height }, panels),
      },
    })),
  };
};

function updateWorldLabelVisibility(viewCamera, viewport = { left: 0, top: 0, width: innerWidth, height: innerHeight }) {
  const panels = panelManager?.visiblePanelRects() ?? [];
  const viewportRect = { left: viewport.left, top: viewport.top, right: viewport.left + viewport.width, bottom: viewport.top + viewport.height };
  scene.traverse(object => {
    if (!object.isSprite || !object.userData.worldLabel) return;
    if (object.userData.wmHidden) {
      object.visible = object.userData.wmDesiredVisible ?? true;
      object.userData.wmHidden = false;
    }
    const desiredVisible = object.visible;
    object.userData.wmDesiredVisible = desiredVisible;
    if (!desiredVisible) return;
    let hidden = state.labelsOff;
    const rect = hidden ? null : labelScreenRect(object, viewCamera, viewport);
    if (!hidden && (!rect || !rectsIntersect(rect, viewportRect, 0))) hidden = true;
    if (!hidden && panels.some(panel => rectsIntersect(rect, panel, 8))) hidden = true;
    if (hidden) {
      object.visible = false;
      object.userData.wmHidden = true;
    }
  });
}

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  backgroundMaterial.uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
  camera.aspect = (state.stereoSbs || state.compare ? innerWidth / 2 : innerWidth) / innerHeight;
  camera.updateProjectionMatrix();
  const aspect = (state.compare && !state.stereoSbs ? innerWidth / 2 : innerWidth) / innerHeight;
  overheadCamera.left = -5 * aspect;
  overheadCamera.right = 5 * aspect;
  overheadCamera.top = 5;
  overheadCamera.bottom = -5;
  overheadCamera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
const clock = new THREE.Clock();

function renderScene() {
  if (state.stereoSbs && state.viewMode === '3d') {
    stereoCamera.update(camera);
    // setViewport/setScissor take CSS pixels; three.js applies the pixel ratio.
    const { x: width, y: height } = renderer.getSize(viewportSize);
    const halfWidth = Math.floor(width / 2);
    renderer.setScissorTest(true);
    for (const [x, eyeCamera] of [[0, stereoCamera.cameraL], [halfWidth, stereoCamera.cameraR]]) {
      renderer.setViewport(x, 0, halfWidth, height);
      renderer.setScissor(x, 0, halfWidth, height);
      renderer.autoClear = true;
      renderer.render(backgroundScene, backgroundCamera);
      renderer.autoClear = false;
      renderer.clearDepth();
      updateWorldLabelVisibility(eyeCamera, { left: x, top: 0, width: halfWidth, height });
      renderer.render(scene, eyeCamera);
    }
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, width, height);
    renderer.autoClear = true;
    return;
  }
  renderer.autoClear = true;
  renderer.render(backgroundScene, backgroundCamera);
  renderer.autoClear = false;
  renderer.clearDepth();
  const viewCamera = state.viewMode === '2d' ? overheadCamera : camera;
  updateWorldLabelVisibility(viewCamera);
  renderer.render(scene, viewCamera);
  renderer.autoClear = true;
}

function markRenderedState() {
  window.__somaLastRender = {
    level: activeLevel().id,
    lens: state.tTheory ? 'on' : 'off',
    dimension: activeDimensionLevel(),
    atlas: state.atlasCapture,
  };
}

function rendererState() {
  const level = activeLevel();
  const rendererId = thoughtSparkLevelIds.has(level.id) && !state.atlasCapture && state.tTheory && activeDimensionLevel() === 11
    ? 'thought-sparks'
    : organismLevelIds.has(level.id) ? null : level.renderer?.id ?? 'placeholder';
  return {
    ...state,
    activeLevelId: level.id,
    level: activeDimensionLevel(),
    dimensionDynamics: dimensionDynamics.visualState(),
    rendererId,
  };
}

function updateRegistryRenderer(renderState, time, pulse) {
  const rendererId = renderState.rendererId;
  if (!rendererId) {
    for (const instance of rendererInstances.values()) instance.update({ ...renderState, rendererId: null }, time, pulse);
    return;
  }
  if (!rendererInstances.has(rendererId)) rendererInstances.set(rendererId, get(rendererId).create(scene, THREE));
  for (const [id, instance] of rendererInstances) {
    if (id === rendererId) instance.update(renderState, time, pulse);
    else instance.update({ ...renderState, rendererId: null }, time, pulse);
  }
}

function frame() {
  // getDelta() must run first: getElapsedTime() resets the delta clock.
  const delta = Math.min(clock.getDelta(), 0.1);
  const time = clock.elapsedTime;
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
  if (state.impulse && state.pokeRunning) {
    state.responseTime = Math.min(1, state.responseTime + delta / POKE_DISPLAY_SECONDS);
    responseTimeInput.value = state.responseTime.toFixed(3);
    if (state.responseTime >= 1) { state.impulse = 0; state.pokeRunning = false; }
  }
  if (state.brecvema || state.impulse) renderBodyGrid(time);
  const mechanismsActive = state.brecvema && state.tTheory && organismLevelIds.has(activeLevel().id);
  const mechanismGain = mechanismsActive ? 1 + Math.max(0, state.selectedMechanisms.size - 1) * 0.15 : 1;
  const responsePulse = state.impulse * mechanismGain * Math.exp(-state.responseTime * 3.4);
  const dynamicsState = dimensionDynamics.update({ time, delta, responsePulse });
  const scenePulse = Math.max(responsePulse, dynamicsState.scenePulse ?? 0);
  fieldAudio.update({
    level: activeLevel(),
    lensOn: state.tTheory,
    limbic: state.limbic,
    cognitive: state.cognitive,
    mechanisms: mechanismsActive ? [...state.selectedMechanisms] : [],
    bpm: state.transport.bpm,
  });
  const compareOn = state.compare && !state.stereoSbs;
  if (compareLabels.hidden === compareOn) {
    compareLabels.hidden = !compareOn;
    compareButton.classList.toggle('active', compareOn);
    compareButton.setAttribute('aria-pressed', String(compareOn));
    if (!compareOn) { compareCardsKey = ''; compareCards.hidden = true; }
    resize();
  }
  if (compareOn) renderCompare(time, delta, scenePulse);
  else {
    applyScene(time, delta, scenePulse);
    renderScene();
  }
  markRenderedState();
  if (state.impulse) timeReadout.textContent = responseTimeReadout(activeLevel());
  requestAnimationFrame(frame);
}

// Scene pass: reads state (including the lens) and sets every object's
// visibility, opacity, and motion. Compare view runs it twice per frame.
function applyScene(time, delta, responsePulse) {
  backgroundMaterial.uniforms.uTime.value = time;
  backgroundMaterial.uniforms.uScale.value = state.visualScale;
  const displayLevel = activeDimensionLevel();
  const tTheoryLayerOn = state.tTheory;
  const currentLevel = activeLevel();
  const quantumMode = currentLevel.id === 'quantum-foam' && displayLevel === 4;
  backgroundMaterial.uniforms.uLevel.value = displayLevel;
  backgroundMaterial.uniforms.uPath.value = state.implementation === 'canonical-5' ? 1 : state.route === 'animal-to-flock' ? 2 : state.route === 'human-assembly-to-institution' ? 3 : 0;
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
  root.rotation.y = displayLevel === 4 ? 0 : Math.sin(time * 0.18) * 0.24;
  root.rotation.x = displayLevel === 4 ? 0 : Math.sin(time * 0.13) * 0.035;
  const scaleFraction = state.visualScale / 19;
  const humanSceneWeight = organismLevelIds.has(currentLevel.id) ? 1 : 0;
  const morphologyWeight = quantumMode ? 0 : 1 - humanSceneWeight;
  const cellularCanonical = currentLevel.id === 'cellular-synaptic';
  const astralCanonical = currentLevel.id === 'stellar' || currentLevel.id === 'species-stellar';
  const fromSigma = Math.floor(state.visualScale);
  const toSigma = Math.min(19, fromSigma + 1);
  const morphologyMix = state.visualScale - fromSigma;
  const fromMorphism = getScaleMorphism(fromSigma);
  const toMorphism = getScaleMorphism(toSigma);
  root.visible = !astralCanonical && humanSceneWeight > 0.01;
  for (const { marker, level } of fieldLabelMarkers) marker.visible = !state.labelsOff && !astralCanonical && humanSceneWeight > 0.01 && displayLevel >= level;
  for (const layer of morphologyLayers) {
    updateMorphologyLayer(layer, fromMorphism, toMorphism, morphologyMix, time, responsePulse);
    const levelWeight = displayLevel >= layer.level && (tTheoryLayerOn || layer.level === 4) ? 1 : 0;
    layer.material.opacity = cellularCanonical || astralCanonical ? 0 : morphologyWeight * levelWeight * (layer.key === 'physical' ? 0.68 : layer.key === 'response' ? 0.82 : 0.72);
    layer.material.size = layer.size * (1 + responsePulse * (layer.key === 'response' ? 2.4 : 1.15));
  }
  scaleField.rotation.y = time * 0.06 + state.visualScale * 0.13;
  scaleField.rotation.z = Math.sin(time * 0.13) * 0.08;
  const renderState = rendererState();
  quantumFoam.update({ ...renderState, rendererId: renderState.rendererId === 'quantum-foam' ? 'quantum-foam' : null }, time, responsePulse);
  thoughtSparks.update({ ...renderState, rendererId: renderState.rendererId === 'thought-sparks' ? 'thought-sparks' : null }, time, responsePulse);
  if (!['quantum-foam', 'thought-sparks'].includes(renderState.rendererId)) updateRegistryRenderer(renderState, time, responsePulse);
  else for (const instance of rendererInstances.values()) instance.update({ ...renderState, rendererId: null }, time, responsePulse);
  questionTours?.updateOverlay(renderState, time, responsePulse);
  updateCellularDensityLayer(time, responsePulse);
  updateCellularField(time, responsePulse);
  updateAstralFields(time, responsePulse);
  stars.material.opacity = quantumMode ? 0.08 : 0.28 + scaleFraction * 0.52;
  grid.visible = !quantumMode;
  updatePartSeeds(time, responsePulse);
  updateCollectiveForeground(time, responsePulse);
  // A dedicated renderer for the active level replaces the legacy shared visuals.
  if (hasRenderer(renderState.rendererId) && !organismLevelIds.has(currentLevel.id)) {
    cellularField.visible = false;
    stellarField.visible = false;
    cosmicField.visible = false;
    partSeeds.visible = false;
    collectiveForeground.visible = false;
    for (const layer of morphologyLayers) layer.material.opacity = 0;
  }
  const humanWeight = tTheoryLayerOn && displayLevel === 11 ? humanSceneWeight : 0;
  const feelingWeight = tTheoryLayerOn && displayLevel >= 8 ? humanSceneWeight : 0;
  const physicalWeight = displayLevel >= 4 ? humanSceneWeight : 0;
  // Physiological idle rhythms: breathing (~0.25 Hz) and a lub-dub heartbeat (72 bpm).
  const motion = state.style.motion ? 1 : 0;
  const breath = Math.sin(time * Math.PI * 2 * 0.25) * motion;
  const beatPhase = time % (60 / 72);
  const heartbeat = (Math.exp(-((beatPhase / 0.05) ** 2)) + 0.6 * Math.exp(-(((beatPhase - 0.28) / 0.05) ** 2))) * motion;
  root.scale.set(0.72 * (1 + breath * 0.006), 0.72 * (1 + breath * 0.004), 0.72 * (1 + breath * 0.014));
  root.position.y = -0.1;
  brecvemaLayer.rotation.y = time * 0.16;
  const humanScale = organismLevelIds.has(currentLevel.id);
  brecvemaLayer.visible = tTheoryLayerOn && state.brecvema && humanScale && displayLevel === 11 && humanSceneWeight > 0.01;
  for (const channel of mechanismChannels) {
    const selected = state.selectedMechanisms.has(channel.id);
    channel.line.material.color.copy(selected ? pink : violet);
    channel.line.material.opacity = selected ? 0.98 : 0.12;
    channel.node.scale.setScalar(selected ? 1.75 : 0.78);
    channel.label.material.opacity = state.labelsOff ? 0 : selected ? 1 : 0.3;
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
  limbicWell.visible = tTheoryLayerOn && displayLevel >= 8;
  limbicWell.scale.setScalar(0.9 + state.limbic * 0.2);
  wellMaterial.opacity = (0.45 + state.limbic * 0.45 + responsePulse * 0.25) * feelingWeight;
  barrier.material.opacity = (0.25 + state.limbic * 0.55 + responsePulse * 0.35) * feelingWeight;
  const dynamicVisual = dimensionDynamics.visualState();
  if (dynamicVisual.active && currentLevel.id === 'human-vertebrate' && displayLevel >= 8) {
    limbicCore.scale.setScalar(1 + Math.max(0, dynamicVisual.basin) * 0.22);
    limbicRing.scale.multiplyScalar(1 + Math.abs(dynamicVisual.basin) * 0.04);
    barrier.material.opacity *= 0.62 + dynamicVisual.barrier * 0.55;
    wellMaterial.opacity *= 0.72 + Math.max(0, dynamicVisual.basin) * 0.48;
  }
  thresholdRing.position.y = 2.4 + state.cognitive * 0.75; thresholdRing.material.opacity = (0.2 + state.cognitive * 0.8) * humanWeight;
  cortex.material.opacity = (0.18 + state.cognitive * 0.75) * humanWeight;
  mindFractal.visible = tTheoryLayerOn && displayLevel === 11;
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
    mesh.material.opacity = (0.18 + state.somatic * 0.5 + heartbeat * 0.06) * physicalWeight;
    mesh.material.color.copy(displayLevel === 4 ? physicalGrey : cyan);
  }
  for (const line of limbs) {
    line.material.opacity = (0.25 + state.somatic * 0.5) * physicalWeight;
    line.material.color.copy(displayLevel === 4 ? physicalGrey : cyan);
  }
}

// Compare view: left half is the 4D physics baseline, right half the T-Theory
// field view (at the selected dimension, or 11D when 4D is selected).
function renderCompare(time, delta, responsePulse) {
  const userLens = state.tTheory;
  const userLevel = state.level;
  const { x: width, y: height } = renderer.getSize(viewportSize);
  const halfWidth = Math.floor(width / 2);
  const viewCamera = state.viewMode === '2d' ? overheadCamera : camera;
  renderer.setScissorTest(true);
  for (const [x, lensOn] of [[0, false], [halfWidth, true]]) {
    state.tTheory = lensOn;
    state.level = lensOn && userLevel === 4 ? 11 : userLevel;
    applyScene(time, lensOn ? 0 : delta, responsePulse);
    renderer.setViewport(x, 0, halfWidth, height);
    renderer.setScissor(x, 0, halfWidth, height);
    renderer.autoClear = true;
    renderer.render(backgroundScene, backgroundCamera);
    renderer.autoClear = false;
    renderer.clearDepth();
    updateWorldLabelVisibility(viewCamera, { left: x, top: 0, width: halfWidth, height });
    renderer.render(scene, viewCamera);
  }
  state.tTheory = userLens;
  state.level = userLevel;
  renderer.setScissorTest(false);
  renderer.setViewport(0, 0, width, height);
  renderer.autoClear = true;
  compareRightLabel.textContent = `T-THEORY / ${userLevel === 4 ? 11 : userLevel}D`;
  updateCompareCards(userLevel === 4 ? 11 : userLevel);
}
frame();

document.querySelector('#export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'soma-field-operator.png';
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
});
