export const PALETTE = {
  cyan: '#14e5ff',
  pink: '#ff3bce',
  gold: '#f6c75a',
  green: '#56f0a2',
  violet: '#8f47ff',
  blue: '#3d7bff',
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

export function setGlowBlending(THREE, material, glowOn, onBlending = THREE.AdditiveBlending) {
  const next = glowOn ? onBlending : THREE.NormalBlending;
  if (material.blending !== next) {
    material.blending = next;
    material.needsUpdate = true;
  }
}

export function setMaterialColor(material, color) {
  material.color.set(color);
}

export function setContourStyle(contourLayer, falsecolourOn, mutedColor = '#aeb8b2') {
  const material = contourLayer.object.material;
  if (material.vertexColors !== falsecolourOn) {
    material.vertexColors = falsecolourOn;
    material.needsUpdate = true;
  }
  if (!falsecolourOn) material.color.set(mutedColor);
}

export function makeRadialTexture(THREE, stops, size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(size / 2, size / 2, 1, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeGlowSprite(THREE, texture, {
  color = '#ffffff',
  opacity = 0.8,
  scale = 1,
  blending = THREE.AdditiveBlending,
} = {}) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: texture,
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending,
  }));
  sprite.scale.setScalar(scale);
  return sprite;
}

export function createArcLine(THREE, {
  radiusX = 1,
  radiusY = 1,
  start = 0,
  end = Math.PI * 2,
  segments = 128,
  color = PALETTE.cyan,
  opacity = 0.6,
  z = 0,
} = {}) {
  const positions = new Float32Array((segments + 1) * 3);
  for (let index = 0; index <= segments; index += 1) {
    const t = start + (end - start) * index / segments;
    positions[index * 3] = Math.cos(t) * radiusX;
    positions[index * 3 + 1] = Math.sin(t) * radiusY;
    positions[index * 3 + 2] = z;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
  const line = new THREE.Line(geometry, material);
  line.frustumCulled = false;
  return line;
}

export function createPolyline(THREE, points, {
  color = PALETTE.cyan,
  opacity = 0.7,
  blending = THREE.NormalBlending,
} = {}) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending });
  const line = new THREE.Line(geometry, material);
  line.frustumCulled = false;
  return line;
}

export function createSectorMesh(THREE, {
  innerRadius = 0,
  outerRadius = 1,
  start = 0,
  end = Math.PI / 2,
  segments = 64,
  color = PALETTE.gold,
  opacity = 0.75,
  blending = THREE.NormalBlending,
  depth = 0,
} = {}) {
  const shape = new THREE.Shape();
  for (let index = 0; index <= segments; index += 1) {
    const t = start + (end - start) * index / segments;
    const x = Math.cos(t) * outerRadius;
    const y = Math.sin(t) * outerRadius;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  if (innerRadius > 0) {
    for (let index = segments; index >= 0; index -= 1) {
      const t = start + (end - start) * index / segments;
      shape.lineTo(Math.cos(t) * innerRadius, Math.sin(t) * innerRadius);
    }
  } else {
    shape.lineTo(0, 0);
  }
  const geometry = depth > 0
    ? new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 4 })
    : new THREE.ShapeGeometry(shape);
  if (depth > 0) geometry.translate(0, 0, -depth / 2);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending,
  });
  return new THREE.Mesh(geometry, material);
}

export function disposeObject(root) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  root.traverse(object => {
    if (object.geometry) geometries.add(object.geometry);
    const materialList = Array.isArray(object.material) ? object.material : [object.material].filter(Boolean);
    for (const material of materialList) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value?.isTexture) textures.add(value);
      }
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}
