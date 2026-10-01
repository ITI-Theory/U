import { createLineSegments, createPointCloud, disposeObjectTree, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';

export default {
  id: 'cosmic-filaments',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(1801);
    const nodes = [
      [-2.8, 0.95, -0.4], [-1.05, 0.2, 0.25], [0.85, 0.72, -0.2], [2.55, 0.05, 0.3],
      [-2.1, -1.15, 0.35], [0.0, -0.72, -0.1], [2.15, -1.18, -0.22], [0.25, 1.75, 0.1],
    ];
    const edges = [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [1, 5], [2, 5], [2, 7], [7, 3]];
    const galaxyPoints = [];
    const filamentSegments = [];
    for (const [a, b] of edges) {
      const start = nodes[a];
      const end = nodes[b];
      filamentSegments.push([...start, ...end]);
      for (let step = 0; step < 180; step += 1) {
        const t = random();
        const bend = Math.sin(t * Math.PI) * 0.18;
        galaxyPoints.push({
          x: start[0] * (1 - t) + end[0] * t + (random() - 0.5) * 0.14,
          y: start[1] * (1 - t) + end[1] * t + bend * (random() - 0.5),
          z: start[2] * (1 - t) + end[2] * t + (random() - 0.5) * 0.13,
          color: random() < 0.2 ? '#78a8ff' : '#fff2bb',
        });
      }
    }
    const points = createPointCloud(THREE, galaxyPoints, { size: 0.034, opacity: 1.0 });
    group.add(points);
    const filaments = createLineSegments(THREE, filamentSegments, '#3d7bff', 0.58);
    group.add(filaments);

    const nodeTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.16, 'rgba(246,199,90,0.72)'],
      [0.55, 'rgba(255,59,206,0.25)'],
      [1, 'rgba(255,59,206,0)'],
    ]);
    const nodeSprites = nodes.map((node, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: nodeTexture, color: index % 2 ? 0xff3bce : 0xf6c75a, transparent: true, opacity: 0.78, depthWrite: false, blending: THREE.AdditiveBlending }));
      sprite.position.set(...node);
      sprite.scale.setScalar(0.34 + (index % 3) * 0.08);
      group.add(sprite);
      return sprite;
    });

    const gas = createLineSegments(THREE, filamentSegments, '#14e5ff', 0.42);
    gas.scale.set(1.02, 1.02, 1.02);
    group.add(gas);
    const voidRings = [
      new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.01, 8, 96), new THREE.MeshBasicMaterial({ color: 0x17233f, transparent: true, opacity: 0.42, depthWrite: false })),
      new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.01, 8, 96), new THREE.MeshBasicMaterial({ color: 0x17233f, transparent: true, opacity: 0.34, depthWrite: false })),
    ];
    voidRings[0].position.set(-0.95, -1.0, -0.35);
    voidRings[1].position.set(1.25, 1.35, -0.25);
    voidRings[1].scale.y = 0.75;
    group.add(...voidRings);

    const panel = makeTextSprite(THREE, ['COSMIC FILAMENTS', 'nodes feed from galaxy threads', 'voids stay dark between flows'], { width: 760, height: 190, border: '#56f0a2' });
    panel.position.set(0.2, -1.84, 0.45);
    panel.scale.set(2.22, 0.55, 1);
    group.add(panel);

    const lens = new THREE.Group();
    const flowLines = createLineSegments(THREE, filamentSegments, '#56f0a2', 0.0);
    lens.add(flowLines);
    const pulses = edges.map(([a, b], index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: nodeTexture, color: index % 2 ? 0x56f0a2 : 0xf6c75a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      sprite.scale.setScalar(0.14);
      lens.add(sprite);
      return { sprite, a: nodes[a], b: nodes[b], phase: index / edges.length };
    });
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'cosmic-filaments';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        group.rotation.y = Math.sin(styleTime * 0.04) * 0.16;
        points.rotation.y = styleTime * 0.012;
        setMaterialColor(points.material, falsecolourOn ? '#ffffff' : '#b8b7ae');
        setGlowBlending(THREE, filaments.material, glowOn);
        setMaterialColor(filaments.material, falsecolourOn ? '#3d7bff' : '#929aa8');
        filaments.material.opacity = 0.5 + (motionOn ? 0.1 * Math.sin(time * 0.19) : 0);
        setGlowBlending(THREE, gas.material, glowOn);
        setMaterialColor(gas.material, falsecolourOn ? '#14e5ff' : '#9facb0');
        gas.material.opacity = 0.36 + (motionOn ? 0.12 * Math.sin(time * 0.23) : 0) + pulse * 0.1;
        for (const [index, sprite] of nodeSprites.entries()) {
          setGlowBlending(THREE, sprite.material, glowOn);
          setMaterialColor(sprite.material, falsecolourOn ? (index % 2 ? '#ff3bce' : '#f6c75a') : '#c2b89e');
          sprite.material.opacity = glowOn ? 0.58 + (motionOn ? 0.18 * Math.sin(time * 0.45 + index) : 0) + pulse * 0.08 : 0.22;
          sprite.scale.setScalar(0.3 + (index % 3) * 0.08 + pulse * 0.08);
        }
        for (const [index, ring] of voidRings.entries()) {
          setMaterialColor(ring.material, falsecolourOn ? '#17233f' : '#292b31');
          ring.rotation.z = styleTime * (index ? -0.018 : 0.014);
        }
        lens.visible = lensOn;
        setGlowBlending(THREE, flowLines.material, glowOn);
        setMaterialColor(flowLines.material, falsecolourOn ? '#56f0a2' : '#a8b8ad');
        flowLines.material.opacity = lensOn ? 0.68 + (state.contours ? 0.16 : 0) : 0;
        for (const item of pulses) {
          const t = (styleTime * 0.08 + item.phase + pulse * 0.2) % 1;
          const fade = lensOn ? Math.sin(t * Math.PI) : 0;
          setGlowBlending(THREE, item.sprite.material, glowOn);
          setMaterialColor(item.sprite.material, falsecolourOn ? (item.phase > 0.5 ? '#56f0a2' : '#f6c75a') : '#c0bba6');
          item.sprite.position.set(
            item.a[0] * (1 - t) + item.b[0] * t,
            item.a[1] * (1 - t) + item.b[1] * t,
            item.a[2] * (1 - t) + item.b[2] * t,
          );
          item.sprite.material.opacity = Math.max(0, fade) * (0.45 + pulse * 0.35);
        }
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
      },
    };
  },
};
