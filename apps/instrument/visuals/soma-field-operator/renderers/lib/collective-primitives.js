export const collectivePalette = {
  cyan: 0x14e5ff,
  pink: 0xff3bce,
  gold: 0xf6c75a,
  green: 0x56f0a2,
  violet: 0x8f47ff,
  blue: 0x3d7bff,
  grey: 0xaec7d8,
};

export const linePalette = {
  ink: 0xc8d1d8,
  dim: 0x687b88,
  paper: 0xe8eef2,
};

export function styleFlags(state) {
  return {
    fluorescence: true,
    falsecolour: true,
    glow: true,
    motion: true,
    ...(state?.style ?? {}),
  };
}

export function setGlowBlending(THREE, material, glowOn, glowBlending = THREE.AdditiveBlending) {
  const next = glowOn ? glowBlending : THREE.NormalBlending;
  if (material.blending !== next) {
    material.blending = next;
    material.needsUpdate = true;
  }
}

export function setMaterialColor(material, color) {
  material.color.set(color);
}

export function biologicalColor(style, neonColor, inkColor = linePalette.ink) {
  return style.fluorescence === false ? inkColor : neonColor;
}

export function fieldColor(style, neonColor, inkColor = linePalette.dim) {
  return style.falsecolour === false ? inkColor : neonColor;
}

export function makeGlowTexture(THREE, inner = 'rgba(255,255,255,0.95)', mid = 'rgba(20,229,255,0.45)', outer = 'rgba(20,229,255,0)') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.2, mid);
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export function makeLabelTexture(THREE, lines, { color = '#14e5ff', width = 640, height = 220 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, width, height);
  context.fillStyle = 'rgba(5,7,14,0.72)';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = color;
  context.lineWidth = 4;
  context.strokeRect(8, 8, width - 16, height - 16);
  context.fillStyle = color;
  context.font = 'bold 38px monospace';
  for (const [index, line] of lines.entries()) context.fillText(line, 30, 66 + index * 52);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeTextSprite(THREE, text, {
  color = '#e8eef2',
  width = 300,
  height = 92,
  font = 'bold 34px monospace',
  background = 'rgba(5,7,14,0.58)',
  scale = [0.72, 0.22, 1],
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, width, height);
  if (background) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }
  context.fillStyle = color;
  context.font = font;
  context.textBaseline = 'middle';
  context.fillText(text, 18, height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.78, depthWrite: false }));
  sprite.userData.worldLabel = true;
  sprite.scale.set(...scale);
  return sprite;
}

export function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (!material) continue;
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose();
    }
  });
}

export function createDynamicLine(THREE, maxPoints, color, { opacity = 0.75, linewidth = 1 } = {}) {
  const positions = new Float32Array(maxPoints * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setDrawRange(0, 0);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    linewidth,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const line = new THREE.Line(geometry, material);
  line.frustumCulled = false;
  return {
    object: line,
    material,
    update(points) {
      const count = Math.min(points.length, maxPoints);
      for (let index = 0; index < count; index += 1) {
        positions[index * 3] = points[index][0];
        positions[index * 3 + 1] = points[index][1];
        positions[index * 3 + 2] = points[index][2] ?? 0;
      }
      geometry.setDrawRange(0, count);
      geometry.attributes.position.needsUpdate = true;
    },
  };
}

export function createDynamicSegments(THREE, maxSegments, color, { opacity = 0.65 } = {}) {
  const positions = new Float32Array(maxSegments * 2 * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setDrawRange(0, 0);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(geometry, material);
  lines.frustumCulled = false;
  return {
    object: lines,
    material,
    update(segments) {
      const count = Math.min(segments.length, maxSegments);
      for (let index = 0; index < count; index += 1) {
        const [a, b] = segments[index];
        positions[index * 6] = a[0];
        positions[index * 6 + 1] = a[1];
        positions[index * 6 + 2] = a[2] ?? 0;
        positions[index * 6 + 3] = b[0];
        positions[index * 6 + 4] = b[1];
        positions[index * 6 + 5] = b[2] ?? 0;
      }
      geometry.setDrawRange(0, count * 2);
      geometry.attributes.position.needsUpdate = true;
    },
  };
}

export function makeWireHuman(THREE, { color = collectivePalette.cyan, scale = 1, opacity = 0.6 } = {}) {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false });
  const jointMaterial = material.clone();
  jointMaterial.opacity = Math.min(0.9, opacity + 0.18);
  const sphere = (radius, position, stretch = [1, 1, 1], mat = material) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 9), mat);
    mesh.position.set(...position);
    mesh.scale.set(...stretch);
    group.add(mesh);
    return mesh;
  };
  const capsule = (radius, length, a, b, mat = material) => {
    const start = new THREE.Vector3(...a);
    const end = new THREE.Vector3(...b);
    const direction = end.clone().sub(start);
    const mesh = new THREE.Mesh(new THREE.CapsuleGeometry(radius, Math.max(0.02, length), 5, 10), mat);
    mesh.position.copy(start.add(end).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    group.add(mesh);
    return mesh;
  };
  const head = sphere(0.24, [0, 1.95, 0], [0.88, 1.08, 0.82]);
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 0.65, 5, 12), material);
  chest.position.set(0, 1.18, 0);
  chest.scale.set(1.05, 1, 0.52);
  group.add(chest);
  const pelvis = sphere(0.25, [0, 0.45, 0], [1.2, 0.64, 0.56]);
  const points = {
    shoulderL: [-0.46, 1.42, 0],
    shoulderR: [0.46, 1.42, 0],
    elbowL: [-0.62, 0.86, 0.02],
    elbowR: [0.62, 0.86, 0.02],
    wristL: [-0.58, 0.28, 0.04],
    wristR: [0.58, 0.28, 0.04],
    hipL: [-0.22, 0.28, 0],
    hipR: [0.22, 0.28, 0],
    kneeL: [-0.32, -0.48, 0.04],
    kneeR: [0.32, -0.48, 0.04],
    ankleL: [-0.36, -1.12, 0],
    ankleR: [0.36, -1.12, 0],
  };
  const limbs = [
    capsule(0.045, 0.5, points.shoulderL, points.elbowL),
    capsule(0.04, 0.45, points.elbowL, points.wristL),
    capsule(0.045, 0.5, points.shoulderR, points.elbowR),
    capsule(0.04, 0.45, points.elbowR, points.wristR),
    capsule(0.055, 0.55, points.hipL, points.kneeL),
    capsule(0.05, 0.48, points.kneeL, points.ankleL),
    capsule(0.055, 0.55, points.hipR, points.kneeR),
    capsule(0.05, 0.48, points.kneeR, points.ankleR),
  ];
  const joints = Object.values(points).map(point => sphere(0.06, point, [1, 1, 1], jointMaterial));
  group.scale.setScalar(scale);
  return { group, material, jointMaterial, body: [head, chest, pelvis], limbs, joints, chest };
}

export function makeBirdGlyph(THREE, { color = collectivePalette.cyan, opacity = 0.72, scale = 1 } = {}) {
  const group = new THREE.Group();
  const bodyMaterial = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity, depthWrite: false });
  const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), bodyMaterial);
  body.scale.set(1.5, 0.55, 0.42);
  group.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.07, 9, 6), bodyMaterial);
  head.position.set(0.25, 0.03, 0);
  group.add(head);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    -0.08, 0, 0, -0.55, 0.22, 0,
    -0.08, 0, 0, -0.55, -0.22, 0,
    -0.22, 0, 0, -0.5, 0, 0,
    0.22, 0.01, 0, 0.4, 0, 0,
  ], 3));
  const wings = new THREE.LineSegments(geometry, lineMaterial);
  group.add(wings);
  group.scale.setScalar(scale);
  return { group, bodyMaterial, lineMaterial, body, head, wings };
}
