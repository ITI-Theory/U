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

export function makeLabelSprite(THREE, lines, {
  border = '#14e5ff',
  color = '#eaf5ff',
  width = 780,
  height = 180,
  scale = [2.6, 0.6, 1],
} = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(4,7,15,0.68)';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = border;
  context.lineWidth = 4;
  context.strokeRect(8, 8, width - 16, height - 16);
  context.fillStyle = color;
  context.font = 'bold 30px monospace';
  lines.forEach((line, index) => context.fillText(line, 28, 58 + index * 42));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set(...scale);
  return sprite;
}

export function createGridBox(THREE, {
  width = 4,
  height = 2.6,
  depth = 2.6,
  divisions = 6,
  color = '#14e5ff',
  opacity = 0.2,
} = {}) {
  const x0 = -width / 2;
  const x1 = width / 2;
  const y0 = -height / 2;
  const y1 = height / 2;
  const z0 = -depth / 2;
  const z1 = depth / 2;
  const positions = [];
  const line = (a, b) => positions.push(...a, ...b);
  for (const x of [x0, x1]) for (const y of [y0, y1]) line([x, y, z0], [x, y, z1]);
  for (const x of [x0, x1]) for (const z of [z0, z1]) line([x, y0, z], [x, y1, z]);
  for (const y of [y0, y1]) for (const z of [z0, z1]) line([x0, y, z], [x1, y, z]);
  for (let index = 1; index < divisions; index += 1) {
    const tx = x0 + (width * index) / divisions;
    const ty = y0 + (height * index) / divisions;
    const tz = z0 + (depth * index) / divisions;
    for (const z of [z0, z1]) {
      line([tx, y0, z], [tx, y1, z]);
      line([x0, ty, z], [x1, ty, z]);
    }
    for (const x of [x0, x1]) {
      line([x, ty, z0], [x, ty, z1]);
      line([x, y0, tz], [x, y1, tz]);
    }
    for (const y of [y0, y1]) {
      line([tx, y, z0], [tx, y, z1]);
      line([x0, y, tz], [x1, y, tz]);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
  const box = new THREE.LineSegments(geometry, material);
  box.frustumCulled = false;
  return box;
}

export function createDynamicLine(THREE, maxPoints, materialOptions = {}) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(maxPoints * 3);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setDrawRange(0, maxPoints);
  const material = new THREE.LineBasicMaterial({
    color: materialOptions.color ?? '#14e5ff',
    transparent: true,
    opacity: materialOptions.opacity ?? 0.8,
    depthWrite: false,
    blending: materialOptions.blending ?? THREE.AdditiveBlending,
  });
  const line = new THREE.Line(geometry, material);
  line.frustumCulled = false;
  line.userData.positions = positions;
  return line;
}

export function setLinePoints(line, points) {
  const positions = line.userData.positions;
  const count = Math.min(points.length, positions.length / 3);
  for (let index = 0; index < count; index += 1) {
    const point = points[index];
    positions[index * 3] = point[0];
    positions[index * 3 + 1] = point[1];
    positions[index * 3 + 2] = point[2];
  }
  line.geometry.setDrawRange(0, count);
  line.geometry.attributes.position.needsUpdate = true;
}

export function getRiceStyle(state) {
  const style = state?.style ?? {};
  return {
    fluorescence: style.fluorescence !== false,
    falsecolour: style.falsecolour !== false,
    glow: style.glow !== false,
    motion: style.motion !== false,
  };
}

export function ensureOperatorCanvasSize() {
  const operatorCanvas = document.querySelector('#operator');
  if (operatorCanvas && operatorCanvas.clientWidth > 0 && operatorCanvas.width < operatorCanvas.clientWidth * 0.9) {
    globalThis.dispatchEvent(new Event('resize'));
  }
}

export function disposeTree(root) {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (!material) continue;
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose?.();
    }
  });
}
