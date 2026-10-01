import { createLineSegments, createPointCloud, disposeObjectTree, gaussian, makeNebulaTexture, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';

function clusterPoints(random, { count, radius, core, colors, xOffset }) {
  const points = [];
  for (let index = 0; index < count; index += 1) {
    const r = radius * Math.pow(random(), core);
    const theta = random() * Math.PI * 2;
    const z = gaussian(random) * radius * 0.12;
    points.push({
      x: xOffset + Math.cos(theta) * r + gaussian(random) * 0.035,
      y: Math.sin(theta) * r * 0.72 + gaussian(random) * 0.03,
      z,
      color: colors[Math.floor(random() * colors.length)],
    });
  }
  return points;
}

export default {
  id: 'stellar-cluster',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(1729);
    const openPoints = clusterPoints(random, {
      count: 620,
      radius: 1.45,
      core: 0.62,
      colors: ['#78a8ff', '#a9c8ff', '#e8f0ff', '#fff2bb'],
      xOffset: -1.85,
    });
    const globularPoints = clusterPoints(random, {
      count: 1100,
      radius: 1.18,
      core: 1.9,
      colors: ['#ffd884', '#f6c75a', '#fff2bb', '#ffad6b'],
      xOffset: 1.75,
    });
    const points = createPointCloud(THREE, openPoints.concat(globularPoints), { size: 0.044, opacity: 1.0 });
    group.add(points);

    const nebulaTexture = makeNebulaTexture(THREE, 12, [
      'rgba(20,229,255,ALPHA)',
      'rgba(61,123,255,ALPHA)',
      'rgba(255,59,206,ALPHA)',
    ]);
    const nebula = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 2.2),
      new THREE.MeshBasicMaterial({ map: nebulaTexture, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    nebula.position.set(-1.86, 0, -0.2);
    group.add(nebula);

    const boundary = [
      new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.01, 8, 96), new THREE.MeshBasicMaterial({ color: 0x14e5ff, transparent: true, opacity: 0.22, depthWrite: false })),
      new THREE.Mesh(new THREE.TorusGeometry(1.24, 0.01, 8, 96), new THREE.MeshBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.26, depthWrite: false })),
    ];
    boundary[0].position.x = -1.85;
    boundary[1].position.x = 1.75;
    group.add(boundary[0], boundary[1]);

    const arrows = [];
    for (let index = 0; index < 26; index += 1) {
      const source = index < 13 ? openPoints[index * 13] : globularPoints[(index - 13) * 17];
      const dx = (source.x < 0 ? -0.18 : 0.12) + gaussian(random) * 0.05;
      const dy = gaussian(random) * 0.06;
      arrows.push([source.x, source.y, source.z + 0.03, source.x + dx, source.y + dy, source.z + 0.03]);
    }
    const properMotions = createLineSegments(THREE, arrows, '#56f0a2', 0.38);
    group.add(properMotions);

    const tail = createLineSegments(THREE, [
      [-3.25, 0.48, 0, -4.0, 0.72, -0.1],
      [-3.2, -0.55, 0, -3.95, -0.92, 0.08],
      [2.72, 0.4, 0, 3.35, 0.72, 0.02],
      [2.65, -0.34, 0, 3.25, -0.7, -0.08],
    ], '#f6c75a', 0.34);
    group.add(tail);

    const inset = makeTextSprite(THREE, ['COLOUR-MAGNITUDE', 'blue: young open cluster', 'gold: old globular core'], { border: '#f6c75a', width: 720, height: 190 });
    inset.position.set(0, -1.88, 0.18);
    inset.scale.set(2.35, 0.62, 1);
    group.add(inset);

    const haloTexture = makeRadialTexture(THREE, [
      [0, 'rgba(86,240,162,0.45)'],
      [0.42, 'rgba(20,229,255,0.18)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const lens = new THREE.Group();
    const potential = new THREE.Mesh(
      new THREE.PlaneGeometry(6.7, 3.5),
      new THREE.MeshBasicMaterial({ map: haloTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    lens.add(potential);
    const contourRings = [];
    for (const [x, color] of [[-1.85, 0x14e5ff], [1.75, 0xf6c75a]]) {
      for (let index = 0; index < 4; index += 1) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.48 + index * 0.35, 0.009, 8, 96),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
        );
        ring.position.x = x;
        lens.add(ring);
        contourRings.push(ring);
      }
    }
    const responseRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.018, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    lens.add(responseRing);
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'stellar-cluster';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        setMaterialColor(points.material, falsecolourOn ? '#ffffff' : '#b8b4a8');
        setGlowBlending(THREE, nebula.material, glowOn);
        setGlowBlending(THREE, properMotions.material, glowOn);
        setGlowBlending(THREE, tail.material, glowOn);
        setGlowBlending(THREE, potential.material, glowOn);
        setGlowBlending(THREE, responseRing.material, glowOn);
        points.rotation.z = Math.sin(styleTime * 0.08) * 0.015;
        points.rotation.y = Math.sin(styleTime * 0.05) * 0.04;
        nebula.visible = glowOn || falsecolourOn;
        nebula.material.opacity = glowOn ? 0.36 + (motionOn ? 0.08 * Math.sin(time * 0.25) : 0) + pulse * 0.08 : 0.12;
        for (const [index, ring] of boundary.entries()) {
          ring.rotation.z = styleTime * (index ? -0.025 : 0.035);
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index ? '#f6c75a' : '#14e5ff') : '#8e8b82');
          ring.material.opacity = 0.18 + (motionOn ? 0.08 * Math.sin(time * 0.4 + index) : 0);
        }
        properMotions.material.opacity = 0.24 + (lensOn ? 0.22 : 0.08);
        lens.visible = lensOn;
        potential.visible = glowOn || falsecolourOn;
        potential.material.opacity = lensOn && glowOn ? 0.24 + pulse * 0.1 : 0;
        for (const [index, ring] of contourRings.entries()) {
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index < 4 ? '#14e5ff' : '#f6c75a') : '#a9a090');
          ring.material.opacity = lensOn ? 0.28 + (motionOn ? 0.12 * Math.sin(time * 0.55 + index) : 0) : 0;
          ring.scale.setScalar(1 + pulse * (0.18 + index * 0.025));
        }
        responseRing.visible = lensOn && pulse > 0.01;
        responseRing.position.set(-0.1, 0, 0.06);
        responseRing.scale.setScalar(1 + state.responseTime * 9);
        responseRing.material.opacity = pulse * 0.7;
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
        nebulaTexture.dispose();
        haloTexture.dispose();
      },
    };
  },
};
