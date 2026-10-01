import {
  collectivePalette,
  createDynamicLine,
  createDynamicSegments,
  disposeObject,
  biologicalColor,
  fieldColor,
  linePalette,
  makeBirdGlyph,
  makeGlowTexture,
  makeTextSprite,
  setGlowBlending,
  setMaterialColor,
  styleFlags,
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
    birdRoot.position.set(0.55, 0.08, 0);
    birdRoot.scale.setScalar(2.35);
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
    const scaleBar = createDynamicSegments(THREE, 3, collectivePalette.grey, { opacity: 0.5 });
    scaleBar.update([
      [[-1.15, -1.58, 0.08], [-0.15, -1.58, 0.08]],
      [[-1.15, -1.51, 0.08], [-1.15, -1.65, 0.08]],
      [[-0.15, -1.51, 0.08], [-0.15, -1.65, 0.08]],
    ]);
    const scaleLabel = makeTextSprite(THREE, '1 m', { color: '#aeb8b2', scale: [0.42, 0.16, 1], width: 170, height: 72, background: null });
    scaleLabel.position.set(-0.64, -1.78, 0.12);
    const wingbeatLabel = makeTextSprite(THREE, 'wingbeat trace', { color: '#3d7bff', scale: [1.0, 0.18, 1], width: 420, height: 72, background: null });
    wingbeatLabel.position.set(-2.25, 1.28, 0.05);
    group.add(scaleBar.object, scaleLabel, wingbeatLabel);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'bird';
        if (!group.visible) return;
        const style = styleFlags(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        const bodyColor = biologicalColor(style, collectivePalette.cyan);
        const aeroColor = fieldColor(style, collectivePalette.blue, linePalette.ink);
        for (const material of [bird.bodyMaterial, bird.lineMaterial, shell.material, sensory.material, gustRing.material, scaleBar.material, ...forceLines.map(line => line.material), ...vortices.map(vortex => vortex.material)]) {
          setGlowBlending(THREE, material, style.glow);
        }
        setMaterialColor(bird.bodyMaterial, bodyColor);
        setMaterialColor(bird.lineMaterial, bodyColor);
        const flap = Math.sin(t * 7.2);
        const wingY = 0.25 + flap * 0.35;
        wingPositions[4] = wingY;
        wingPositions[10] = -wingY;
        wingPositions[16] = 0.02 + flap * 0.05;
        bird.wings.geometry.attributes.position.needsUpdate = true;
        birdRoot.position.y = 0.08 + Math.sin(t * 1.1) * 0.08 + pulse * 0.06;
        birdRoot.rotation.z = Math.sin(t * 0.8) * 0.08 + pulse * 0.12;
        bird.bodyMaterial.opacity = lens ? 0.5 : 0.78;
        bird.lineMaterial.opacity = lens ? 0.54 : 0.9;
        for (const vortex of vortices) {
          vortex.update(spiralPoints(vortex.side, t, pulse));
          vortex.material.color.set(aeroColor);
          vortex.material.opacity = lens ? 0.18 : 0.48 + pulse * 0.2;
        }
        shell.visible = lens;
        shell.scale.set(1.42 + pulse * 0.28, 0.75 + pulse * 0.16, 0.62 + pulse * 0.12);
        shell.rotation.y = t * 0.48;
        shell.material.color.set(fieldColor(style, collectivePalette.green, linePalette.dim));
        shell.material.opacity = lens ? (style.glow ? 0.34 : 0.22) + pulse * 0.3 : 0;
        sensory.visible = lens;
        sensory.scale.setScalar(0.92 + Math.sin(t * 1.8) * 0.08 + pulse * 0.55);
        sensory.material.visible = style.glow;
        sensory.material.opacity = lens && style.glow ? 0.2 + pulse * 0.34 : 0;
        forceLines[0].update([[0.35, 0.25, 0.1], [0.35, 1.08 + pulse * 0.35, 0.1]]);
        forceLines[1].update([[0.3, -0.15, 0.1], [0.3, -0.95, 0.1]]);
        forceLines[2].update([[-0.2, 0.08, 0.1], [0.92, 0.08 + flap * 0.06, 0.1]]);
        for (const [index, line] of forceLines.entries()) {
          line.material.color.set(index === 0 ? fieldColor(style, collectivePalette.green, linePalette.ink) : index === 1 ? fieldColor(style, collectivePalette.pink, linePalette.dim) : fieldColor(style, collectivePalette.gold, linePalette.ink));
          line.material.opacity = lens ? 0.2 : 0.46 + (index === 0 ? pulse * 0.2 : 0);
        }
        gustRing.position.x = -2.2 + state.responseTime * 2.7;
        gustRing.scale.set(0.8 + state.responseTime * 1.6, 0.42 + state.responseTime * 0.58, 1);
        gustRing.material.color.set(fieldColor(style, collectivePalette.gold, linePalette.ink));
        gustRing.material.opacity = 0.2 + pulse * 0.45;
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
