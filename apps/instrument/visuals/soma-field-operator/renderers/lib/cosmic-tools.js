export function seededRandom(seed) {
  let value = seed >>> 0;
  return function random() {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gaussian(random) {
  const u = Math.max(Number.EPSILON, random());
  const v = Math.max(Number.EPSILON, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
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

export function makeNebulaTexture(THREE, seed, palette, size = 256) {
  const random = seededRandom(seed);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, size, size);
  context.globalCompositeOperation = 'lighter';
  for (let index = 0; index < 96; index += 1) {
    const x = random() * size;
    const y = random() * size;
    const radius = (0.08 + random() * 0.24) * size;
    const color = palette[Math.floor(random() * palette.length)];
    const gradient = context.createRadialGradient(x, y, 1, x, y, radius);
    gradient.addColorStop(0, color.replace('ALPHA', String(0.12 + random() * 0.2)));
    gradient.addColorStop(0.55, color.replace('ALPHA', String(0.04 + random() * 0.06)));
    gradient.addColorStop(1, color.replace('ALPHA', '0'));
    context.fillStyle = gradient;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeCmbTexture(THREE, seed, size = 512) {
  const random = seededRandom(seed);
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const context = canvas.getContext('2d');
  const blobs = Array.from({ length: 260 }, () => ({
    x: random() * size,
    y: random() * size / 2,
    r: 7 + random() * 38,
    a: gaussian(random) * 0.82,
  }));
  const image = context.createImageData(size, size / 2);
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      let value = 0;
      for (const blob of blobs) {
        const dx = Math.min(Math.abs(x - blob.x), image.width - Math.abs(x - blob.x));
        const dy = y - blob.y;
        value += blob.a * Math.exp(-(dx * dx + dy * dy) / (2 * blob.r * blob.r));
      }
      value += 0.28 * Math.sin(x * 0.09 + y * 0.04) + 0.2 * Math.cos(y * 0.13 - x * 0.025);
      const warm = Math.max(0, Math.min(1, 0.5 + value * 0.42));
      const offset = (y * image.width + x) * 4;
      image.data[offset] = Math.round(46 + 206 * warm);
      image.data[offset + 1] = Math.round(70 + 120 * (1 - Math.abs(warm - 0.5)));
      image.data[offset + 2] = Math.round(245 - 205 * warm);
      image.data[offset + 3] = 215;
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeTextSprite(THREE, lines, {
  width = 760,
  height = 260,
  border = '#14e5ff',
  title = '#f6c75a',
  body = '#eaf5ff',
  background = 'rgba(5,7,14,0.72)',
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = border;
  context.lineWidth = 5;
  context.strokeRect(10, 10, width - 20, height - 20);
  context.font = 'bold 34px monospace';
  context.fillStyle = title;
  context.fillText(lines[0] ?? '', 32, 62);
  context.font = '24px monospace';
  context.fillStyle = body;
  for (let index = 1; index < lines.length; index += 1) context.fillText(lines[index], 32, 62 + index * 42);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.86, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.userData.disposeTexture = texture;
  return sprite;
}

export function createPointCloud(THREE, points, { size = 0.045, opacity = 0.9 } = {}) {
  const positions = new Float32Array(points.length * 3);
  const colors = new Float32Array(points.length * 3);
  const color = new THREE.Color();
  for (const [index, point] of points.entries()) {
    positions[index * 3] = point.x;
    positions[index * 3 + 1] = point.y;
    positions[index * 3 + 2] = point.z;
    color.set(point.color ?? '#ffffff');
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size,
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  return new THREE.Points(geometry, material);
}

export function createLineSegments(THREE, segments, color = '#14e5ff', opacity = 0.62, additive = true) {
  const positions = new Float32Array(segments.length * 6);
  for (const [index, segment] of segments.entries()) {
    positions.set(segment, index * 6);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
  return new THREE.LineSegments(geometry, material);
}

export function setOpacity(object, opacity) {
  object.traverse(child => {
    if (child.material) {
      if (Array.isArray(child.material)) child.material.forEach(material => { material.opacity = opacity; material.transparent = true; });
      else {
        child.material.opacity = opacity;
        child.material.transparent = true;
      }
    }
  });
}

export function styleFlags(state) {
  return {
    fluorescence: true,
    falsecolour: true,
    glow: true,
    motion: true,
    ...(state?.style ?? {}),
  };
}

export function setGlowBlending(THREE, material, enabled) {
  const blending = enabled ? THREE.AdditiveBlending : THREE.NormalBlending;
  if (material.blending !== blending) {
    material.blending = blending;
    material.needsUpdate = true;
  }
}

export function setMaterialColor(material, color) {
  material.color?.set(color);
}

export function disposeObjectTree(object) {
  object.traverse(child => {
    child.geometry?.dispose?.();
    const materials = Array.isArray(child.material) ? child.material : [child.material].filter(Boolean);
    for (const material of materials) {
      material.map?.dispose?.();
      material.dispose?.();
    }
    child.userData?.disposeTexture?.dispose?.();
  });
}
