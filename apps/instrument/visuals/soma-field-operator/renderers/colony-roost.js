import {
  collectivePalette,
  createDynamicLine,
  createDynamicSegments,
  disposeObject,
  fieldColor,
  linePalette,
  makeGlowTexture,
  makeTextSprite,
  setGlowBlending,
  styleFlags,
} from './lib/collective-primitives.js';

function branchSegments() {
  return [
    [[0, -1.9, 0], [0, 0.75, 0]],
    [[0, -0.25, 0], [-0.85, 0.55, 0]],
    [[0, 0.02, 0], [0.92, 0.74, 0]],
    [[-0.45, 0.18, 0], [-1.45, 1.15, 0]],
    [[0.42, 0.32, 0], [1.42, 1.14, 0]],
    [[-0.82, 0.52, 0], [-1.8, 0.55, 0]],
    [[0.82, 0.62, 0], [1.88, 0.62, 0]],
    [[-0.22, 0.42, 0], [-0.32, 1.55, 0]],
    [[0.24, 0.48, 0], [0.28, 1.55, 0]],
  ];
}

export const colonyRoostRenderer = {
  id: 'colony-roost',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const duskCanvas = document.createElement('canvas');
    duskCanvas.width = 16;
    duskCanvas.height = 64;
    const duskContext = duskCanvas.getContext('2d');
    const gradient = duskContext.createLinearGradient(0, 0, 0, 64);
    gradient.addColorStop(0, '#1a1846');
    gradient.addColorStop(0.45, '#122947');
    gradient.addColorStop(1, '#06070e');
    duskContext.fillStyle = gradient;
    duskContext.fillRect(0, 0, 16, 64);
    const duskTexture = new THREE.CanvasTexture(duskCanvas);
    duskTexture.colorSpace = THREE.SRGBColorSpace;
    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(7.4, 4.6),
      new THREE.MeshBasicMaterial({ map: duskTexture, transparent: true, opacity: 0.78, depthWrite: false }),
    );
    backdrop.position.set(0, 0.05, -0.75);
    group.add(backdrop);

    const tree = createDynamicSegments(THREE, 20, collectivePalette.grey, { opacity: 0.72 });
    tree.update(branchSegments());
    group.add(tree.object);

    const glow = makeGlowTexture(THREE, 'rgba(255,255,255,0.92)', 'rgba(246,199,90,0.45)', 'rgba(246,199,90,0)');
    const count = 132;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = Array.from({ length: count }, (_, index) => ({
      angle: index * 2.399963,
      radius: 0.6 + (index % 17) * 0.12,
      targetX: -1.7 + (index % 13) * 0.28,
      targetY: -0.05 + Math.floor(index / 13) * 0.16,
      phase: index * 0.57,
    }));
    const birdGeometry = new THREE.BufferGeometry();
    birdGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    birdGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const birds = new THREE.Points(birdGeometry, new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(birds);

    const paths = Array.from({ length: 12 }, (_, index) => {
      const line = createDynamicLine(THREE, 44, collectivePalette.gold, { opacity: 0.24 });
      group.add(line.object);
      return { ...line, index };
    });
    const densityRings = Array.from({ length: 5 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.45 + index * 0.28, 0.009, 8, 96),
        new THREE.MeshBasicMaterial({ color: index % 2 ? collectivePalette.green : collectivePalette.cyan, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.position.set(0, 0.35 + index * 0.08, 0.05);
      ring.scale.set(1.9, 0.7, 1);
      group.add(ring);
      return ring;
    });
    const links = createDynamicSegments(THREE, 80, collectivePalette.green, { opacity: 0 });
    group.add(links.object);
    const arrivalWave = new THREE.Mesh(
      new THREE.TorusGeometry(0.4, 0.012, 8, 112),
      new THREE.MeshBasicMaterial({ color: collectivePalette.pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    arrivalWave.position.set(-2.8, 0.3, 0.1);
    arrivalWave.scale.set(1, 0.48, 1);
    group.add(arrivalWave);
    const roostGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glow,
      color: collectivePalette.gold,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    roostGlow.position.set(0, 0.42, -0.05);
    roostGlow.scale.set(2.9, 1.35, 1);
    group.add(roostGlow);
    const scaleBar = createDynamicSegments(THREE, 3, collectivePalette.grey, { opacity: 0.45 });
    scaleBar.update([
      [[-3.05, -2.06, 0.08], [-1.35, -2.06, 0.08]],
      [[-3.05, -1.99, 0.08], [-3.05, -2.13, 0.08]],
      [[-1.35, -1.99, 0.08], [-1.35, -2.13, 0.08]],
    ]);
    const scaleLabel = makeTextSprite(THREE, '500 m roost', { color: '#aeb8b2', width: 360, height: 72, scale: [0.9, 0.17, 1], background: null });
    scaleLabel.position.set(-2.16, -2.26, 0.1);
    group.add(scaleBar.object, scaleLabel);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'colony-roost';
        if (!group.visible) return;
        const style = styleFlags(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        for (const material of [tree.material, birds.material, links.material, arrivalWave.material, roostGlow.material, scaleBar.material, ...paths.map(path => path.material), ...densityRings.map(ring => ring.material)]) {
          setGlowBlending(THREE, material, style.glow);
        }
        const arrival = (Math.sin(t * 0.08) + 1) * 0.5;
        const waveX = -2.8 + state.responseTime * 5.6;
        for (const [index, seed] of seeds.entries()) {
          const cycle = (t * 0.035 + index / count) % 1;
          const settle = Math.min(1, Math.max(0, (cycle - 0.22) / 0.55));
          const spiralRadius = seed.radius * (1 - settle * 0.75);
          const xFlight = Math.cos(seed.angle + t * 0.65 + settle * 6) * spiralRadius + 1.1 * (1 - settle);
          const yFlight = 1.9 - settle * 1.5 + Math.sin(seed.angle + t * 0.55) * 0.32;
          const x = xFlight * (1 - settle) + seed.targetX * settle;
          const y = yFlight * (1 - settle) + seed.targetY * settle + Math.sin(t * 0.5 + seed.phase) * 0.025;
          const z = -0.08 + Math.sin(seed.phase + t * 0.2) * 0.22;
          const wave = Math.exp(-((x - waveX) ** 2) / 0.16) * (0.2 + pulse * 1.1);
          positions[index * 3] = x + wave * 0.16;
          positions[index * 3 + 1] = y + wave * 0.18;
          positions[index * 3 + 2] = z;
          if (style.falsecolour) {
            colors[index * 3] = lens ? 0.2 + wave : 0.86;
            colors[index * 3 + 1] = lens ? 0.9 : 0.72;
            colors[index * 3 + 2] = lens ? 0.72 : 0.28;
          } else {
            colors[index * 3] = lens ? 0.78 : 0.9;
            colors[index * 3 + 1] = lens ? 0.84 : 0.82;
            colors[index * 3 + 2] = lens ? 0.86 : 0.65;
          }
        }
        birdGeometry.attributes.position.needsUpdate = true;
        birdGeometry.attributes.color.needsUpdate = true;
        birds.material.size = lens ? 0.046 : 0.055;
        roostGlow.material.visible = style.glow;
        roostGlow.material.opacity = style.glow ? (lens ? 0.34 + pulse * 0.12 : 0.18 + arrival * 0.08) : 0;
        for (const path of paths) {
          const points = [];
          const seed = seeds[path.index * 9];
          for (let step = 0; step < 42; step += 1) {
            const t = step / 41;
            points.push([
              2.8 - t * (2.8 - seed.targetX) + Math.sin(t * Math.PI * 4 + seed.phase) * 0.18,
              1.78 - t * (1.5 - seed.targetY) + Math.cos(t * Math.PI * 3 + t * 0.5) * 0.12,
              -0.1,
            ]);
          }
          path.update(points);
          path.material.color.set(fieldColor(style, collectivePalette.gold, linePalette.ink));
          path.material.opacity = lens ? 0.08 : 0.22;
        }
        const linkSegments = [];
        for (let index = 0; index < count; index += 3) {
          const x = positions[index * 3];
          const y = positions[index * 3 + 1];
          if (Math.hypot(x, y - 0.35) < 1.9) linkSegments.push([[x, y, 0.12], [0, 0.35, 0.12]]);
        }
        links.update(linkSegments);
        links.material.opacity = lens ? 0.16 + pulse * 0.16 : 0;
        for (const [index, ring] of densityRings.entries()) {
          ring.visible = lens;
          ring.rotation.z = Math.sin(t * 0.15 + index) * 0.12;
          ring.material.color.set(fieldColor(style, index % 2 ? collectivePalette.green : collectivePalette.cyan));
          ring.material.opacity = lens ? 0.17 + index * 0.035 + pulse * 0.07 : 0;
        }
        arrivalWave.position.x = waveX;
        arrivalWave.scale.set(0.8 + state.responseTime * 3.0, 0.34 + state.responseTime * 0.8, 1);
        arrivalWave.material.color.set(fieldColor(style, collectivePalette.pink, linePalette.ink));
        arrivalWave.material.opacity = (lens ? 0.4 : 0.15) + pulse * 0.32;
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        duskTexture.dispose();
        glow.dispose();
      },
    };
  },
};

export default colonyRoostRenderer;
