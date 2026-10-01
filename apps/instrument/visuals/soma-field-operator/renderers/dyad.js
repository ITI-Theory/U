import {
  collectivePalette,
  createDynamicLine,
  createDynamicSegments,
  disposeObject,
  makeGlowTexture,
  makeLabelTexture,
  makeWireHuman,
} from './lib/collective-primitives.js';

function voiceArcPoints(side, index, time) {
  const points = [];
  const startX = side * 1.18;
  const radius = 0.28 + index * 0.2 + 0.03 * Math.sin(time * 1.4 + index);
  for (let step = 0; step <= 24; step += 1) {
    const t = step / 24;
    const angle = (0.15 + t * 0.78) * Math.PI;
    points.push([
      startX + side * Math.cos(angle) * radius,
      1.35 + Math.sin(angle) * radius * 0.58,
      0.03 * Math.sin(t * Math.PI),
    ]);
  }
  return points;
}

export const dyadRenderer = {
  id: 'dyad',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);

    const glow = makeGlowTexture(THREE, 'rgba(255,255,255,0.95)', 'rgba(20,229,255,0.46)', 'rgba(20,229,255,0)');
    const partnerA = makeWireHuman(THREE, { color: collectivePalette.cyan, scale: 0.76, opacity: 0.48 });
    const partnerB = makeWireHuman(THREE, { color: collectivePalette.pink, scale: 0.76, opacity: 0.48 });
    partnerA.group.position.set(-1.55, -1.2, 0);
    partnerB.group.position.set(1.55, -1.2, 0);
    partnerA.group.rotation.y = -0.18;
    partnerB.group.rotation.y = 0.18;
    group.add(partnerA.group, partnerB.group);

    const chestGlow = [-1, 1].map((side, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glow,
        color: index === 0 ? collectivePalette.cyan : collectivePalette.pink,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      sprite.position.set(side * 1.55, -0.3, 0.03);
      sprite.scale.setScalar(0.68);
      group.add(sprite);
      return sprite;
    });

    const heartRings = [-1, 1].map((side, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.23, 0.01, 8, 48),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? collectivePalette.cyan : collectivePalette.pink,
          transparent: true,
          opacity: 0.44,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      ring.position.set(side * 1.55, -0.3, 0.06);
      group.add(ring);
      return ring;
    });

    const voiceArcs = [];
    for (const side of [-1, 1]) {
      for (let index = 0; index < 3; index += 1) {
        const arc = createDynamicLine(THREE, 28, side < 0 ? collectivePalette.cyan : collectivePalette.pink, { opacity: 0.36 });
        group.add(arc.object);
        voiceArcs.push({ ...arc, side, index });
      }
    }

    const gaze = createDynamicSegments(THREE, 2, collectivePalette.gold, { opacity: 0.48 });
    group.add(gaze.object);
    const bridge = createDynamicLine(THREE, 80, collectivePalette.green, { opacity: 0 });
    group.add(bridge.object);
    const bridgeBack = createDynamicLine(THREE, 80, collectivePalette.violet, { opacity: 0 });
    group.add(bridgeBack.object);
    const waveDot = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glow,
      color: collectivePalette.gold,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(waveDot);

    const phaseRings = [-1, 1].map((side, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.52, 0.016, 8, 80),
        new THREE.MeshBasicMaterial({
          color: index === 0 ? collectivePalette.cyan : collectivePalette.pink,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      ring.position.set(side * 1.55, -0.28, -0.02);
      group.add(ring);
      return ring;
    });

    const labelTexture = makeLabelTexture(THREE, ['G_AB(t-\u03c4)', 'G_BA(t-\u03c4)'], { color: '#56f0a2', width: 520, height: 180 });
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0, depthWrite: false }));
    label.position.set(0, 0.52, 0.12);
    label.scale.set(1.42, 0.48, 1);
    group.add(label);

    const scaleBar = createDynamicSegments(THREE, 3, collectivePalette.grey, { opacity: 0.5 });
    group.add(scaleBar.object);
    scaleBar.update([
      [[-2.42, -1.95, 0], [-0.42, -1.95, 0]],
      [[-2.42, -1.88, 0], [-2.42, -2.02, 0]],
      [[-0.42, -1.88, 0], [-0.42, -2.02, 0]],
    ]);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'dyad';
        if (!group.visible) return;
        const lens = state.tTheory && state.level >= 8;
        const breath = Math.sin(time * Math.PI * 2 * 0.25);
        const beatPhase = time % (60 / 72);
        const heartbeat = Math.exp(-((beatPhase / 0.05) ** 2)) + 0.58 * Math.exp(-(((beatPhase - 0.28) / 0.055) ** 2));
        const delayed = pulse * Math.exp(-((state.responseTime - 0.48) ** 2) / 0.018);
        partnerA.group.scale.set(0.76 * (1 + breath * 0.018 + pulse * 0.04), 0.76 * (1 + breath * 0.012 + pulse * 0.03), 0.76);
        partnerB.group.scale.set(0.76 * (1 + Math.sin(time * Math.PI * 0.5 + 0.7) * 0.014 + delayed * 0.06), 0.76 * (1 + breath * 0.01 + delayed * 0.04), 0.76);
        partnerA.group.position.x = -1.55 - pulse * 0.06;
        partnerB.group.position.x = 1.55 + delayed * 0.08;
        heartRings[0].scale.setScalar(1 + heartbeat * 0.22 + pulse * 0.5);
        heartRings[1].scale.setScalar(1 + heartbeat * 0.16 + delayed * 0.55);
        for (const [index, ring] of heartRings.entries()) ring.material.opacity = 0.24 + heartbeat * 0.26 + (index ? delayed : pulse) * 0.24;
        for (const [index, sprite] of chestGlow.entries()) {
          const localPulse = index ? delayed : pulse;
          sprite.material.opacity = 0.16 + heartbeat * 0.14 + localPulse * 0.32;
          sprite.scale.setScalar(0.52 + heartbeat * 0.08 + localPulse * 0.42);
        }
        for (const arc of voiceArcs) {
          arc.update(voiceArcPoints(arc.side, arc.index, time));
          arc.material.opacity = lens ? 0.18 : 0.24 + 0.12 * Math.sin(time * 2 + arc.index);
        }
        gaze.update([
          [[-1.55, 0.22, 0.06], [1.55, 0.25, 0.06]],
          [[1.55, 0.16, 0.03], [-1.55, 0.18, 0.03]],
        ]);
        gaze.material.opacity = lens ? 0.18 : 0.42 + pulse * 0.16;
        const bridgePoints = [];
        const bridgeBackPoints = [];
        for (let step = 0; step < 72; step += 1) {
          const t = step / 71;
          const phase = time * 1.6 + t * Math.PI * 4;
          bridgePoints.push([-1.35 + t * 2.7, 0.05 + Math.sin(phase) * 0.15, Math.sin(t * Math.PI) * 0.12]);
          bridgeBackPoints.push([1.35 - t * 2.7, -0.42 + Math.cos(phase + 1.1) * 0.12, -Math.sin(t * Math.PI) * 0.12]);
        }
        bridge.update(bridgePoints);
        bridgeBack.update(bridgeBackPoints);
        bridge.material.opacity = lens ? 0.62 + pulse * 0.24 : 0;
        bridgeBack.material.opacity = lens ? 0.42 + delayed * 0.24 : 0;
        for (const [index, ring] of phaseRings.entries()) {
          const localPhase = time * 1.55 + (lens ? Math.exp(-time * 0.08) * (index ? 1.1 : 0) : index * 1.2);
          ring.visible = lens;
          ring.scale.setScalar(0.86 + 0.18 * Math.sin(localPhase) + (index ? delayed : pulse) * 0.2);
          ring.material.opacity = lens ? 0.42 + 0.18 * Math.sin(localPhase) : 0;
          ring.rotation.z = localPhase;
        }
        label.material.opacity = lens ? 0.72 : 0;
        const travel = Math.min(1, Math.max(0, state.responseTime * 1.3));
        waveDot.visible = pulse > 0.01 || delayed > 0.01;
        waveDot.position.set(-1.35 + travel * 2.7, -0.02 + Math.sin(travel * Math.PI) * 0.18, 0.2);
        waveDot.scale.setScalar(0.18 + pulse * 0.52);
        waveDot.material.opacity = Math.min(0.9, pulse * (0.8 - Math.abs(travel - 0.5) * 0.6) + delayed * 0.5);
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        glow.dispose();
        labelTexture.dispose();
      },
    };
  },
};

export default dyadRenderer;
