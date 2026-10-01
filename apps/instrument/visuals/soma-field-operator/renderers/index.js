const registry = new Map();

function makeLabelTexture(THREE, label) {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 180;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(5,7,14,0.82)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#ff3bce';
  context.lineWidth = 4;
  context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  context.fillStyle = '#14e5ff';
  context.font = 'bold 34px monospace';
  context.fillText('MISSING RENDERER', 28, 76);
  context.fillStyle = '#eaf5ff';
  context.font = '24px monospace';
  context.fillText(label, 28, 124);
  return new THREE.CanvasTexture(canvas);
}

function placeholderFactory(id) {
  return {
    id,
    create(scene, THREE) {
      const group = new THREE.Group();
      const marker = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeLabelTexture(THREE, id),
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }));
      marker.position.set(0, 0.3, 0);
      marker.scale.set(3.6, 0.9, 1);
      group.add(marker);
      scene.add(group);
      return {
        group,
        update(state) {
          group.visible = state?.rendererId === id;
        },
        dispose() {
          scene.remove(group);
          marker.material.map?.dispose();
          marker.material.dispose();
        },
      };
    },
  };
}

export function register(id, factory) {
  if (!id || !factory?.create) throw new Error(`Invalid renderer factory for ${id ?? 'unknown id'}`);
  registry.set(id, factory);
  return factory;
}

export function get(id) {
  return registry.get(id) ?? placeholderFactory(id);
}

export function has(id) {
  return registry.has(id);
}

export function listRenderers() {
  return [...registry.keys()].sort();
}
