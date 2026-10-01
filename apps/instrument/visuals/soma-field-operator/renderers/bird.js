import {
  collectivePalette,
  createDynamicLine,
  disposeObject,
  makeBirdGlyph,
  makeGlowTexture,
} from './lib/collective-primitives.js';

function spiralPoints(side, time, pulse) {
  const points = [];
  for (let step = 0; step < 56; step += 1) {
    const t = step / 55;
    const angle = t * Math.PI * 5 + time * 2.2;
    const radius = 0.08 + t * 0.3 + pulse * 0.05;
    points.push([
      -0.55 - t * 1.7,
      side * (0.78 + Math.cos(angle) * radius),
      Math.sin(angle) * radius * 0.75,
    ]);
  }
  return points;
}

export const birdRenderer = {
  id: 'bird',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const birdRoot = new THREE.Group();
    birdRoot.position.set(0.35, 0.1, 0);
    birdRoot.scale.setScalar(1.85);
    group.add(birdRoot);

    const bird = makeBirdGlyph(THREE, { color: collectivePalette.cyan, opacity: 0.68, scale: 1 });
    birdRoot.add(bird.group);
    const wingPositions = bird.wings.geometry.attributes.position.array;

    const glow = makeGlowTexture(THREE, 'rgba(255,255,255,0.95)', 'rgba(86,240,162,0.45)', 'rgba(86,240,162,0)');
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.86, 32, 16),
      new THREE.MeshBasicMaterial({ color: collectivePalette.green, wireframe: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    shell.scale.set(1.5, 0.75, 0.65);
    birdRoot.add(shell);

    const sensory = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glow,
      color: collectivePalette.green,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    sensory.position.set(0.08, 0.04, 0);
    birdRoot.add(sensory);

    const vortices = [-1, 1].map((side) => {
      const line = createDynamicLine(THREE, 64, collectivePalette.blue, { opacity: 0.42 });
      line.object.position.set(-0.18, 0, 0);
      birdRoot.add(line.object);
      return { ...line, side };
    });

    const forceLines = [
      createDynamicLine(THREE, 2, collectivePalette.green, { opacity: 0.52 }),
      createDynamicLine(THREE, 2, collectivePalette.pink, { opacity: 0.5 }),
      createDynamicLine(THREE, 2, collectivePalette.gold, { opacity: 0.46 }),
    ];
    for (const line of forceLines) group.add(line.object);
    const gustRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: collectivePalette.gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    gustRing.position.set(-2.2, 0.1, 0);
    gustRing.scale.set(1, 0.58, 1);
    group.add(gustRing);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'bird';
        if (!group.visible) return;
        const lens = state.tTheory && state.level >= 8;
        const flap = Math.sin(time * 7.2);
        const wingY = 0.25 + flap * 0.35;
        wingPositions[4] = wingY;
        wingPositions[10] = -wingY;
        wingPositions[16] = 0.02 + flap * 0.05;
        bird.wings.geometry.attributes.position.needsUpdate = true;
        birdRoot.position.y = 0.08 + Math.sin(time * 1.1) * 0.08 + pulse * 0.06;
        birdRoot.rotation.z = Math.sin(time * 0.8) * 0.08 + pulse * 0.12;
        bird.bodyMaterial.opacity = lens ? 0.42 : 0.68;
        bird.lineMaterial.opacity = lens ? 0.46 : 0.8;
        for (const vortex of vortices) {
          vortex.update(spiralPoints(vortex.side, time, pulse));
          vortex.material.opacity = lens ? 0.16 : 0.42 + pulse * 0.2;
        }
        shell.visible = lens;
        shell.scale.set(1.42 + pulse * 0.28, 0.75 + pulse * 0.16, 0.62 + pulse * 0.12);
        shell.rotation.y = time * 0.48;
        shell.material.opacity = lens ? 0.34 + pulse * 0.3 : 0;
        sensory.visible = lens;
        sensory.scale.setScalar(0.92 + Math.sin(time * 1.8) * 0.08 + pulse * 0.55);
        sensory.material.opacity = lens ? 0.2 + pulse * 0.34 : 0;
        forceLines[0].update([[0.35, 0.25, 0.1], [0.35, 1.08 + pulse * 0.35, 0.1]]);
        forceLines[1].update([[0.3, -0.15, 0.1], [0.3, -0.95, 0.1]]);
        forceLines[2].update([[-0.2, 0.08, 0.1], [0.92, 0.08 + flap * 0.06, 0.1]]);
        for (const [index, line] of forceLines.entries()) line.material.opacity = lens ? 0.18 : 0.4 + (index === 0 ? pulse * 0.2 : 0);
        gustRing.position.x = -2.2 + state.responseTime * 2.7;
        gustRing.scale.set(0.8 + state.responseTime * 1.6, 0.42 + state.responseTime * 0.58, 1);
        gustRing.material.opacity = 0.18 + pulse * 0.45;
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        glow.dispose();
      },
    };
  },
};

export default birdRenderer;
