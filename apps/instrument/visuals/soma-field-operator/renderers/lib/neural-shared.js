export function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

export function seededRandomFactory(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function makeGlowTexture(THREE, inner = 'rgba(255,255,255,0.95)', middle = 'rgba(86,240,162,0.48)', outer = 'rgba(86,240,162,0)') {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.18, middle);
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function makeLabelTexture(THREE, { title, subtitle = '', footer = '', accent = '#14e5ff', width = 860, height = 230 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(3,6,13,0.72)';
  context.fillRect(0, 0, width, height);
  context.strokeStyle = accent;
  context.lineWidth = 5;
  context.strokeRect(10, 10, width - 20, height - 20);
  context.fillStyle = accent;
  context.font = 'bold 36px monospace';
  context.fillText(title, 34, 70);
  context.fillStyle = '#eaf5ff';
  context.font = '25px monospace';
  if (subtitle) context.fillText(subtitle, 34, 126);
  if (footer) context.fillText(footer, 34, 168);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.worldLabel = true;
  return texture;
}

export function makeLine(THREE, points, material) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

export function makeTube(THREE, points, radius, material, segments = 36, radialSegments = 6) {
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radialSegments, false),
    material,
  );
}

export function setMaterialGlow(THREE, material, glowOn) {
  const next = glowOn ? THREE.AdditiveBlending : THREE.NormalBlending;
  if (material.blending !== next) {
    material.blending = next;
    material.needsUpdate = true;
  }
}

export function pointOnPolyline(points, t) {
  const scaled = clamp01(t) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  return points[index].clone().lerp(points[index + 1], scaled - index);
}

export function disposeGroup(group) {
  group.traverse(object => {
    object.geometry?.dispose?.();
    const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value?.isTexture) value.dispose();
      }
      material.dispose?.();
    }
  });
}
