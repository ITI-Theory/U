import {
  collectivePalette,
  createDynamicLine,
  createDynamicSegments,
  disposeObject,
  biologicalColor,
  fieldColor,
  linePalette,
  makeBirdGlyph,
  makeTextSprite,
  setGlowBlending,
  setMaterialColor,
  styleFlags,
} from './lib/collective-primitives.js';

export const flockRenderer = {
  id: 'flock',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const layout = [
      [0, 0.55, 0],
      [-0.55, 0.12, -0.05], [0.55, 0.12, -0.05],
      [-1.08, -0.3, -0.1], [1.08, -0.3, -0.1],
      [-1.6, -0.72, -0.15], [1.6, -0.72, -0.15],
      [-2.05, -1.05, -0.22], [2.05, -1.05, -0.22],
      [-2.46, -1.34, -0.28], [2.46, -1.34, -0.28],
    ];
    const birds = layout.map((position, index) => {
      const glyph = makeBirdGlyph(THREE, { color: index ? collectivePalette.cyan : collectivePalette.gold, opacity: 0.76, scale: 0.64 });
      glyph.group.position.set(position[0], position[1], position[2]);
      glyph.group.rotation.z = index % 2 ? -0.08 : 0.08;
      group.add(glyph.group);
      return { ...glyph, base: position, phase: index * 0.8 };
    });

    const headings = createDynamicSegments(THREE, 16, collectivePalette.gold, { opacity: 0.48 });
    group.add(headings.object);
    const links = createDynamicSegments(THREE, 24, collectivePalette.green, { opacity: 0 });
    group.add(links.object);
    const turnWave = new THREE.Mesh(
      new THREE.TorusGeometry(0.42, 0.013, 8, 96),
      new THREE.MeshBasicMaterial({ color: collectivePalette.pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    turnWave.position.set(-2.65, -1.2, 0.1);
    turnWave.scale.set(1, 0.5, 1);
    group.add(turnWave);

    const fieldArrows = Array.from({ length: 18 }, (_, index) => {
      const line = createDynamicLine(THREE, 3, index % 2 ? collectivePalette.cyan : collectivePalette.green, { opacity: 0 });
      group.add(line.object);
      return { ...line, index };
    });
    const scaleBar = createDynamicSegments(THREE, 3, collectivePalette.grey, { opacity: 0.45 });
    scaleBar.update([
      [[-2.85, -1.98, 0.08], [-1.45, -1.98, 0.08]],
      [[-2.85, -1.91, 0.08], [-2.85, -2.05, 0.08]],
      [[-1.45, -1.91, 0.08], [-1.45, -2.05, 0.08]],
    ]);
    const scaleLabel = makeTextSprite(THREE, '20 m formation', { color: '#aeb8b2', width: 380, height: 72, scale: [0.94, 0.17, 1], background: null });
    scaleLabel.position.set(-2.12, -2.18, 0.1);
    group.add(scaleBar.object, scaleLabel);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'flock';
        if (!group.visible) return;
        const style = styleFlags(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        for (const material of [headings.material, links.material, turnWave.material, scaleBar.material, ...fieldArrows.map(arrow => arrow.material), ...birds.flatMap(bird => [bird.bodyMaterial, bird.lineMaterial])]) {
          setGlowBlending(THREE, material, style.glow);
        }
        const headingSegments = [];
        const linkSegments = [];
        const waveX = -2.65 + state.responseTime * 5.3;
        for (const [index, bird] of birds.entries()) {
          const localWave = Math.exp(-((bird.base[0] - waveX) ** 2) / 0.18) * (0.2 + pulse * 1.2);
          const flap = Math.sin(t * 7.8 + bird.phase) * 0.1;
          bird.group.position.set(
            bird.base[0] + Math.sin(t * 0.7 + bird.phase) * 0.05,
            bird.base[1] + Math.sin(t * 1.1 + bird.phase) * 0.06 + localWave * 0.2,
            bird.base[2],
          );
          bird.group.rotation.z = Math.sin(t * 0.7 + bird.phase) * 0.08 + localWave * 0.3;
          bird.group.rotation.y = localWave * 0.3;
          bird.wings.geometry.attributes.position.array[4] = 0.22 + flap;
          bird.wings.geometry.attributes.position.array[10] = -0.22 - flap;
          bird.wings.geometry.attributes.position.needsUpdate = true;
          const start = [bird.group.position.x + 0.05, bird.group.position.y, bird.group.position.z + 0.12];
          const end = [start[0] + 0.42, start[1] + 0.04 + localWave * 0.2, start[2]];
          headingSegments.push([start, end]);
          if (index > 0) linkSegments.push([[bird.group.position.x, bird.group.position.y, bird.group.position.z], [birds[0].group.position.x, birds[0].group.position.y, birds[0].group.position.z]]);
          const birdColor = index ? biologicalColor(style, collectivePalette.cyan) : fieldColor(style, collectivePalette.gold, linePalette.paper);
          setMaterialColor(bird.bodyMaterial, birdColor);
          setMaterialColor(bird.lineMaterial, birdColor);
          bird.bodyMaterial.opacity = lens ? 0.45 : 0.72;
          bird.lineMaterial.opacity = lens ? 0.48 : 0.82;
        }
        headings.update(headingSegments);
        headings.material.color.set(fieldColor(style, collectivePalette.gold, linePalette.ink));
        headings.material.opacity = lens ? 0.24 : 0.55;
        links.update(linkSegments);
        links.material.color.set(fieldColor(style, collectivePalette.green, linePalette.dim));
        links.material.opacity = lens ? 0.28 + pulse * 0.18 : 0;
        turnWave.position.x = waveX;
        turnWave.scale.set(0.72 + state.responseTime * 2.8, 0.32 + state.responseTime * 0.72, 1);
        turnWave.material.color.set(fieldColor(style, collectivePalette.pink, linePalette.ink));
        turnWave.material.opacity = (lens ? 0.42 : 0.18) + pulse * 0.34;
        for (const arrow of fieldArrows) {
          const row = Math.floor(arrow.index / 6);
          const col = arrow.index % 6;
          const x = -2.6 + col * 1.04;
          const y = -1.35 + row * 0.72;
          const curl = Math.sin(t * 0.6 + col * 0.7 + row) * 0.18;
          arrow.update([[x, y, -0.42], [x + 0.46, y + 0.06 + curl, -0.42], [x + 0.34, y + 0.16 + curl, -0.42]]);
          arrow.material.color.set(fieldColor(style, arrow.index % 2 ? collectivePalette.cyan : collectivePalette.green));
          arrow.material.opacity = lens ? 0.34 : 0;
        }
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
      },
    };
  },
};

export default flockRenderer;
