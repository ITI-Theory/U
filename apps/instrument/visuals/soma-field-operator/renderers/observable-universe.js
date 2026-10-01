import { createLineSegments, createPointCloud, disposeObjectTree, makeCmbTexture, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';

export default {
  id: 'observable-universe',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(1901);

    const cmbTexture = makeCmbTexture(THREE, 1902, 512);
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(2.52, 64, 32),
      new THREE.MeshBasicMaterial({ map: cmbTexture, transparent: true, opacity: 0.44, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
    );
    shell.rotation.x = -0.26;
    group.add(shell);

    const webPoints = [];
    const webSegments = [];
    const nodes = Array.from({ length: 34 }, () => {
      const r = Math.pow(random(), 0.55) * 2.05;
      const a = random() * Math.PI * 2;
      const b = (random() - 0.5) * 1.2;
      return [Math.cos(a) * r, Math.sin(b) * r * 0.56, Math.sin(a) * r * 0.62];
    });
    for (const node of nodes) webPoints.push({ x: node[0], y: node[1], z: node[2], color: '#f6c75a' });
    for (let a = 0; a < nodes.length; a += 1) {
      const distances = nodes.map((node, b) => ({ b, d: a === b ? Infinity : Math.hypot(nodes[a][0] - node[0], nodes[a][1] - node[1], nodes[a][2] - node[2]) })).sort((p, q) => p.d - q.d);
      for (const { b, d } of distances.slice(0, 2)) {
        if (a < b && d < 1.05) webSegments.push([...nodes[a], ...nodes[b]]);
      }
    }
    for (const segment of webSegments) {
      for (let step = 0; step < 18; step += 1) {
        const t = (step + random() * 0.6) / 18;
        webPoints.push({
          x: segment[0] * (1 - t) + segment[3] * t + (random() - 0.5) * 0.035,
          y: segment[1] * (1 - t) + segment[4] * t + (random() - 0.5) * 0.035,
          z: segment[2] * (1 - t) + segment[5] * t + (random() - 0.5) * 0.035,
          color: random() < 0.5 ? '#78a8ff' : '#fff2bb',
        });
      }
    }
    const interior = createPointCloud(THREE, webPoints, { size: 0.036, opacity: 0.95 });
    group.add(interior);
    const webLines = createLineSegments(THREE, webSegments, '#3d7bff', 0.46);
    group.add(webLines);

    const rings = [];
    for (let index = 1; index <= 4; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(index * 0.58, 0.008, 8, 128),
        new THREE.MeshBasicMaterial({ color: index === 4 ? 0xf6c75a : 0x14e5ff, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.rotation.x = -0.26;
      group.add(ring);
      rings.push(ring);
    }

    const observerTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.24, 'rgba(86,240,162,0.72)'],
      [1, 'rgba(86,240,162,0)'],
    ]);
    const observer = new THREE.Sprite(new THREE.SpriteMaterial({ map: observerTexture, color: 0x56f0a2, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    observer.scale.setScalar(0.18);
    group.add(observer);

    const scalePanel = makeTextSprite(THREE, ['LOOK-BACK SCALE', 'centre: observer today', 'outer shell: procedural CMB anisotropy'], { width: 790, height: 190, border: '#f6c75a' });
    scalePanel.position.set(0, -1.82, 0.4);
    scalePanel.scale.set(2.42, 0.56, 1);
    group.add(scalePanel);

    const lens = new THREE.Group();
    const horizonTexture = makeRadialTexture(THREE, [
      [0, 'rgba(143,71,255,0.06)'],
      [0.72, 'rgba(143,71,255,0.16)'],
      [1, 'rgba(143,71,255,0)'],
    ], 256);
    const grammar = new THREE.Mesh(
      new THREE.PlaneGeometry(5.4, 3.7),
      new THREE.MeshBasicMaterial({ map: horizonTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    lens.add(grammar);
    const metricSegments = [];
    for (let index = 0; index < 18; index += 1) {
      const a = index * Math.PI * 2 / 18;
      metricSegments.push([0, 0, 0.18, Math.cos(a) * 2.45, Math.sin(a) * 1.9, 0.18]);
    }
    const radialLines = createLineSegments(THREE, metricSegments, '#8f47ff', 0.0);
    lens.add(radialLines);
    const impulse = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.014, 8, 128),
      new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    impulse.scale.y = 0.78;
    lens.add(impulse);
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'observable-universe';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        group.rotation.y = styleTime * 0.015;
        shell.rotation.y = -styleTime * 0.018;
        setGlowBlending(THREE, shell.material, glowOn);
        setMaterialColor(shell.material, falsecolourOn ? '#ffffff' : '#b0aca0');
        shell.material.opacity = (glowOn ? 0.42 : 0.24) + (motionOn ? 0.04 * Math.sin(time * 0.17) : 0);
        interior.rotation.y = styleTime * 0.02;
        setMaterialColor(interior.material, falsecolourOn ? '#ffffff' : '#b8b6ad');
        setGlowBlending(THREE, webLines.material, glowOn);
        setMaterialColor(webLines.material, falsecolourOn ? '#3d7bff' : '#929aa8');
        webLines.material.opacity = 0.38 + (motionOn ? 0.1 * Math.sin(time * 0.22) : 0);
        for (const [index, ring] of rings.entries()) {
          ring.rotation.z = styleTime * (0.012 + index * 0.002);
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index === 3 ? '#f6c75a' : '#14e5ff') : '#9ba5a2');
          ring.material.opacity = 0.18 + index * 0.035 + pulse * 0.04;
        }
        setGlowBlending(THREE, observer.material, glowOn);
        setMaterialColor(observer.material, falsecolourOn ? '#56f0a2' : '#c8c8bc');
        observer.material.opacity = glowOn ? 0.74 + (motionOn ? 0.18 * Math.sin(time * 0.9) : 0) : 0.35;
        lens.visible = lensOn;
        setGlowBlending(THREE, grammar.material, glowOn);
        grammar.visible = glowOn || falsecolourOn;
        grammar.material.opacity = lensOn && glowOn ? 0.24 + pulse * 0.12 : 0;
        setGlowBlending(THREE, radialLines.material, glowOn);
        setMaterialColor(radialLines.material, falsecolourOn ? '#8f47ff' : '#a99eb8');
        radialLines.material.opacity = lensOn ? 0.48 + (state.contours ? 0.18 : 0) : 0;
        setGlowBlending(THREE, impulse.material, glowOn);
        setMaterialColor(impulse.material, falsecolourOn ? '#ff3bce' : '#d8b6b8');
        impulse.visible = lensOn && pulse > 0.01;
        impulse.scale.set(1 + state.responseTime * 9.5, 0.78 + state.responseTime * 7.2, 1);
        impulse.material.opacity = pulse * 0.62;
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
      },
    };
  },
};
