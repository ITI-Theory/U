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

function seeded(index) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

export const swarmRenderer = {
  id: 'swarm',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const count = 3400;
    const seeds = Array.from({ length: count }, (_, index) => {
      const a = index * 2.399963;
      const r = 0.18 + Math.sqrt((index + 0.5) / count) * 3.0;
      const h = (seeded(index) - 0.5) * 1.8;
      return {
        a,
        r,
        h,
        phase: seeded(index + 91) * Math.PI * 2,
        layer: seeded(index + 17),
      };
    });
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(points);

    const glow = makeGlowTexture(THREE, 'rgba(255,255,255,0.95)', 'rgba(255,59,206,0.52)', 'rgba(255,59,206,0)');
    const predator = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glow,
      color: collectivePalette.pink,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    predator.position.set(-3.2, 0.35, 0.15);
    group.add(predator);

    const streamlines = Array.from({ length: 28 }, (_, index) => {
      const line = createDynamicLine(THREE, 36, index % 2 ? collectivePalette.green : collectivePalette.cyan, { opacity: 0 });
      group.add(line.object);
      return { ...line, seed: index };
    });
    const waveFront = new THREE.Mesh(
      new THREE.TorusGeometry(0.68, 0.015, 8, 160),
      new THREE.MeshBasicMaterial({ color: collectivePalette.gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    waveFront.scale.set(1, 0.42, 1);
    group.add(waveFront);

    const boundary = new THREE.Mesh(
      new THREE.TorusGeometry(3.08, 0.008, 8, 180),
      new THREE.MeshBasicMaterial({ color: collectivePalette.violet, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    boundary.scale.set(1, 0.52, 1);
    group.add(boundary);
    const phaseColor = new THREE.Color();
    const scaleBar = createDynamicSegments(THREE, 3, collectivePalette.grey, { opacity: 0.42 });
    scaleBar.update([
      [[-3.08, -2.03, 0.06], [-1.36, -2.03, 0.06]],
      [[-3.08, -1.96, 0.06], [-3.08, -2.1, 0.06]],
      [[-1.36, -1.96, 0.06], [-1.36, -2.1, 0.06]],
    ]);
    const scaleLabel = makeTextSprite(THREE, '50 m murmuration', { color: '#aeb8b2', width: 430, height: 72, scale: [1.08, 0.18, 1], background: null });
    scaleLabel.position.set(-2.22, -2.23, 0.08);
    group.add(scaleBar.object, scaleLabel);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'swarm';
        if (!group.visible) return;
        const style = styleFlags(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        for (const material of [points.material, predator.material, waveFront.material, boundary.material, scaleBar.material, ...streamlines.map(line => line.material)]) {
          setGlowBlending(THREE, material, style.glow);
        }
        const waveX = -3.2 + state.responseTime * 6.4;
        const turn = Math.sin(t * 0.55) * 0.45 + pulse * 0.55;
        for (let index = 0; index < count; index += 1) {
          const seed = seeds[index];
          const a = seed.a + t * (0.12 + seed.layer * 0.08) + Math.sin(t * 0.6 + seed.h) * 0.22;
          const localWave = Math.exp(-((Math.cos(a) * seed.r - waveX) ** 2) / 0.24) * (0.3 + pulse * 1.2);
          const curl = turn * Math.sin(seed.h * 2.2 + t * 1.4) + localWave * 0.8;
          const x = Math.cos(a + curl) * seed.r * 1.08;
          const y = 0.15 + seed.h * 0.74 + Math.sin(a * 2.1 + t * 1.5) * 0.16 + localWave * 0.34;
          const z = Math.sin(a + curl * 0.55) * seed.r * 0.44 + Math.cos(t * 0.4 + seed.phase) * 0.18;
          positions[index * 3] = x;
          positions[index * 3 + 1] = y;
          positions[index * 3 + 2] = z;
          const phase = (Math.atan2(Math.sin(a + curl), Math.cos(a + curl)) + Math.PI) / (Math.PI * 2);
          if (style.falsecolour) phaseColor.setHSL(lens ? phase : 0.54 + seed.layer * 0.08, lens ? 0.9 : 0.62, lens ? 0.58 + localWave * 0.18 : 0.52 + localWave * 0.28);
          else phaseColor.setHex(lens ? linePalette.ink : 0xb9c0c3);
          colors[index * 3] = phaseColor.r;
          colors[index * 3 + 1] = phaseColor.g;
          colors[index * 3 + 2] = phaseColor.b;
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        points.material.size = lens ? 0.023 : 0.028;
        points.material.opacity = lens ? 0.82 : 0.92;
        predator.material.visible = style.glow;
        predator.material.opacity = style.glow ? 0.12 + pulse * 0.7 : 0;
        predator.scale.setScalar(0.45 + pulse * 0.7);
        waveFront.visible = lens || pulse > 0.01;
        waveFront.position.set(waveX, 0.08, 0.05);
        waveFront.scale.set(0.85 + state.responseTime * 2.6, 0.3 + state.responseTime * 0.75, 1);
        waveFront.material.color.set(fieldColor(style, collectivePalette.gold, linePalette.ink));
        waveFront.material.opacity = (lens ? 0.34 : 0.18) + pulse * 0.36;
        boundary.visible = lens;
        boundary.rotation.z = t * 0.04;
        boundary.material.color.set(fieldColor(style, collectivePalette.violet, linePalette.dim));
        boundary.material.opacity = lens ? 0.2 + pulse * 0.1 : 0;
        for (const line of streamlines) {
          const pointsOnLine = [];
          const baseY = -1.0 + (line.seed % 7) * 0.34;
          const baseX = -3.0 + Math.floor(line.seed / 7) * 1.55;
          for (let step = 0; step < 34; step += 1) {
            const t = step / 33;
            const x = baseX + t * 1.25;
            const y = baseY + Math.sin(t * Math.PI * 2 + t * 0.9 + line.seed) * 0.14;
            const z = -0.35 + Math.sin(t * Math.PI + line.seed) * 0.28;
            pointsOnLine.push([x, y, z]);
          }
          line.update(pointsOnLine);
          line.material.color.set(fieldColor(style, line.seed % 2 ? collectivePalette.green : collectivePalette.cyan));
          line.material.opacity = lens ? 0.3 : 0;
        }
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        glow.dispose();
      },
    };
  },
};

export default swarmRenderer;
