import { createLineSegments, createPointCloud, disposeObjectTree, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';

export default {
  id: 'cosmic-web',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(2001);
    const nodes = Array.from({ length: 115 }, () => {
      const x = (random() - 0.5) * 6.2;
      const y = (random() - 0.5) * 3.2;
      const z = (random() - 0.5) * 2.8;
      return [x, y, z];
    });
    const segments = [];
    const used = new Set();
    for (let a = 0; a < nodes.length; a += 1) {
      const neighbors = nodes
        .map((node, b) => ({ b, d: a === b ? Infinity : Math.hypot(nodes[a][0] - node[0], nodes[a][1] - node[1], nodes[a][2] - node[2]) }))
        .sort((p, q) => p.d - q.d)
        .slice(0, 4);
      for (const { b, d } of neighbors) {
        const key = [Math.min(a, b), Math.max(a, b)].join(':');
        if (used.has(key) || d > 1.38) continue;
        used.add(key);
        segments.push([...nodes[a], ...nodes[b]]);
      }
    }
    const galaxies = [];
    for (const node of nodes) galaxies.push({ x: node[0], y: node[1], z: node[2], color: '#f6c75a' });
    for (const segment of segments) {
      const steps = 20 + Math.floor(random() * 12);
      for (let step = 0; step < steps; step += 1) {
        const t = (step + random()) / steps;
        galaxies.push({
          x: segment[0] * (1 - t) + segment[3] * t + (random() - 0.5) * 0.05,
          y: segment[1] * (1 - t) + segment[4] * t + (random() - 0.5) * 0.05,
          z: segment[2] * (1 - t) + segment[5] * t + (random() - 0.5) * 0.05,
          color: random() < 0.28 ? '#78a8ff' : '#fff2bb',
        });
      }
    }
    const points = createPointCloud(THREE, galaxies, { size: 0.034, opacity: 1.0 });
    group.add(points);
    const webLines = createLineSegments(THREE, segments, '#3d7bff', 0.58);
    group.add(webLines);

    const nodeTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.16, 'rgba(246,199,90,0.82)'],
      [0.48, 'rgba(20,229,255,0.26)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const nodeSprites = nodes.map((node, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: nodeTexture, color: index % 3 ? 0xf6c75a : 0x14e5ff, transparent: true, opacity: 0.74, depthWrite: false, blending: THREE.AdditiveBlending }));
      sprite.position.set(...node);
      sprite.scale.setScalar(0.08 + random() * 0.06);
      group.add(sprite);
      return sprite;
    });

    const cubeSegments = [];
    const x = 3.25; const y = 1.85; const z = 1.55;
    const corners = [[-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z], [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]];
    for (const [a, b] of [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]]) cubeSegments.push([...corners[a], ...corners[b]]);
    const surveyBox = createLineSegments(THREE, cubeSegments, '#14e5ff', 0.16);
    group.add(surveyBox);

    const baoRings = [];
    for (let index = 0; index < 3; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.82 + index * 0.43, 0.008, 8, 160),
        new THREE.MeshBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.position.set(-2.15 + index * 1.8, -0.1 + index * 0.24, 0.22 - index * 0.34);
      ring.rotation.set(0.85, index * 0.4, 0.2);
      group.add(ring);
      baoRings.push(ring);
    }

    const panel = makeTextSprite(THREE, ['COSMIC WEB', '3D survey volume: nodes, filaments, voids', 'faint rings: BAO-scale standard ruler'], { width: 840, height: 190, border: '#8f47ff' });
    panel.position.set(0, -1.84, 0.52);
    panel.scale.set(2.6, 0.55, 1);
    group.add(panel);

    const lens = new THREE.Group();
    const fieldTexture = makeRadialTexture(THREE, [
      [0, 'rgba(86,240,162,0.1)'],
      [0.55, 'rgba(20,229,255,0.08)'],
      [1, 'rgba(20,229,255,0)'],
    ], 256);
    const potentialGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 4.1),
      new THREE.MeshBasicMaterial({ map: fieldTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    lens.add(potentialGlow);
    const fieldLines = createLineSegments(THREE, segments.filter((_, index) => index % 2 === 0), '#56f0a2', 0.0);
    lens.add(fieldLines);
    const responseShells = [];
    for (let index = 0; index < 4; index += 1) {
      const shell = new THREE.Mesh(
        new THREE.TorusGeometry(0.65 + index * 0.5, 0.01, 8, 144),
        new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      shell.scale.y = 0.62;
      lens.add(shell);
      responseShells.push(shell);
    }
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'cosmic-web';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        group.rotation.y = styleTime * 0.035;
        group.rotation.x = Math.sin(styleTime * 0.03) * 0.08;
        setMaterialColor(points.material, falsecolourOn ? '#ffffff' : '#b8b7ad');
        points.material.opacity = 0.86 + (motionOn ? 0.1 * Math.sin(time * 0.19) : 0);
        setGlowBlending(THREE, webLines.material, glowOn);
        setMaterialColor(webLines.material, falsecolourOn ? '#3d7bff' : '#929aa8');
        webLines.material.opacity = 0.5 + (motionOn ? 0.12 * Math.sin(time * 0.25) : 0);
        for (const [index, sprite] of nodeSprites.entries()) {
          setGlowBlending(THREE, sprite.material, glowOn);
          setMaterialColor(sprite.material, falsecolourOn ? (index % 3 ? '#f6c75a' : '#14e5ff') : '#c4bdab');
          sprite.material.opacity = glowOn ? 0.58 + (motionOn ? 0.16 * Math.sin(time * 0.4 + index) : 0) : 0.22;
        }
        setGlowBlending(THREE, surveyBox.material, glowOn);
        setMaterialColor(surveyBox.material, falsecolourOn ? '#14e5ff' : '#87969a');
        for (const [index, ring] of baoRings.entries()) {
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? '#f6c75a' : '#b8ae92');
          ring.material.opacity = 0.16 + (motionOn ? 0.08 * Math.sin(time * 0.22 + index) : 0);
          ring.rotation.z = styleTime * 0.02 * (index + 1);
        }
        lens.visible = lensOn;
        setGlowBlending(THREE, potentialGlow.material, glowOn);
        potentialGlow.visible = glowOn || falsecolourOn;
        potentialGlow.material.opacity = lensOn && glowOn ? 0.28 + pulse * 0.12 : 0;
        setGlowBlending(THREE, fieldLines.material, glowOn);
        setMaterialColor(fieldLines.material, falsecolourOn ? '#56f0a2' : '#a8b8ad');
        fieldLines.material.opacity = lensOn ? 0.72 + (state.contours ? 0.16 : 0) : 0;
        for (const [index, shell] of responseShells.entries()) {
          setGlowBlending(THREE, shell.material, glowOn);
          setMaterialColor(shell.material, falsecolourOn ? '#ff3bce' : '#c1a4b3');
          shell.material.opacity = lensOn ? 0.18 + pulse * 0.18 : 0;
          const scale = 1 + pulse * 0.07 * (index + 1) + state.responseTime * 0.12;
          shell.scale.set(scale, 0.62 * scale, scale);
        }
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
      },
    };
  },
};
