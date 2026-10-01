export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function styleFlags(state) {
  return {
    fluorescence: true,
    falsecolour: true,
    glow: true,
    motion: true,
    ...(state.style ?? {}),
  };
}

export function setMaterialColor(material, color) {
  if (material?.color) material.color.set(color);
}

export function setGlowBlending(THREE, material, glowOn) {
  if (!material) return;
  const next = glowOn ? THREE.AdditiveBlending : THREE.NormalBlending;
  if (material.blending !== next) {
    material.blending = next;
    material.needsUpdate = true;
  }
}

export function makeGlowTexture(THREE, stops = [
  [0, 'rgba(255,255,255,1)'],
  [0.22, 'rgba(20,229,255,0.7)'],
  [1, 'rgba(20,229,255,0)'],
]) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeLabelTexture(THREE, title, lines, accent = '#14e5ff') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(5,7,14,0.76)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = accent;
  context.lineWidth = 5;
  context.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);
  context.fillStyle = accent;
  context.font = 'bold 40px monospace';
  context.fillText(title, 36, 72);
  context.fillStyle = '#eaf5ff';
  context.font = '27px monospace';
  lines.slice(0, 3).forEach((line, index) => context.fillText(line, 36, 128 + index * 42));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeLine(THREE, points, material) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

export function makeLineSegments(THREE, coordinates, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(coordinates, 3));
  return new THREE.LineSegments(geometry, material);
}

export function makeCurvePoints(THREE, start, end, lift = 0.35, steps = 32) {
  const points = [];
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const ease = Math.sin(Math.PI * t);
    points.push(new THREE.Vector3(
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t + lift * ease,
      start.z + (end.z - start.z) * t,
    ));
  }
  return points;
}

export function pointOnPolyline(points, t, target) {
  const clamped = clamp01(t);
  const scaled = clamped * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const a = points[index];
  const b = points[index + 1];
  target.set(
    a.x + (b.x - a.x) * local,
    a.y + (b.y - a.y) * local,
    a.z + (b.z - a.z) * local,
  );
  return target;
}

export function disposeObject(object) {
  object.traverse(child => {
    if (child.geometry) child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (!material) continue;
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose?.();
    }
  });
}
