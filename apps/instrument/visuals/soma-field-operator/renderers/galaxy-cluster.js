import { createLineSegments, disposeObjectTree, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';
import { createEllipticalGalaxy, createSpiralGalaxy } from './lib/cosmic-galaxy.js';

export default {
  id: 'galaxy-cluster',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(1701);

    const gasTexture = makeRadialTexture(THREE, [
      [0, 'rgba(20,229,255,0.52)'],
      [0.28, 'rgba(61,123,255,0.34)'],
      [0.58, 'rgba(255,59,206,0.15)'],
      [1, 'rgba(255,59,206,0)'],
    ], 384);
    const gas = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 3.7),
      new THREE.MeshBasicMaterial({ map: gasTexture, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    gas.position.set(0.28, 0.02, -0.24);
    group.add(gas);

    const galaxies = [];
    for (let index = 0; index < 28; index += 1) {
      const spiral = index % 5 === 0;
      const galaxy = spiral
        ? createSpiralGalaxy(THREE, { seed: 2000 + index, radius: 0.22 + random() * 0.1, count: 130, h2: false })
        : createEllipticalGalaxy(THREE, { seed: 2100 + index, radius: 0.28 + random() * 0.18, count: 150 });
      const theta = random() * Math.PI * 2;
      const r = Math.pow(random(), 0.55) * 2.75;
      galaxy.position.set(Math.cos(theta) * r, Math.sin(theta) * r * 0.58, gaussianLike(random) * 0.28);
      galaxy.rotation.set(random() * 0.6, random() * Math.PI, random() * Math.PI);
      galaxy.userData.baseRotationY = galaxy.rotation.y;
      galaxy.scale.setScalar(0.72 + random() * 0.65);
      galaxies.push(galaxy);
      group.add(galaxy);
    }

    const arcMaterial = new THREE.MeshBasicMaterial({ color: 0x14e5ff, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending });
    const lensArc = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.025, 8, 96, Math.PI * 0.8), arcMaterial);
    lensArc.position.set(0.06, 0.04, 0.22);
    lensArc.rotation.z = 0.42;
    group.add(lensArc);

    const shock = createLineSegments(THREE, [
      [-2.2, 0.7, 0.12, -1.5, 0.95, 0.12],
      [-1.5, 0.95, 0.12, -0.6, 1.0, 0.12],
      [-0.6, 1.0, 0.12, 0.2, 0.85, 0.12],
    ], '#ff3bce', 0.62);
    group.add(shock);

    const scale = createLineSegments(THREE, [[-3.15, -1.95, 0.2, -2.25, -1.95, 0.2]], '#f6c75a', 0.8);
    group.add(scale);
    const panel = makeTextSprite(THREE, ['X-RAY GAS / Mpc', 'blue: hot intracluster plasma', 'arc: gravitational lensing'], { width: 720, height: 190, border: '#3d7bff' });
    panel.position.set(1.82, -1.82, 0.32);
    panel.scale.set(2.16, 0.57, 1);
    group.add(panel);

    const lens = new THREE.Group();
    const massContours = [];
    const pressureContours = [];
    const gridLines = [];
    for (let index = 0; index < 5; index += 1) {
      const mass = new THREE.Mesh(
        new THREE.TorusGeometry(0.55 + index * 0.34, 0.012, 8, 128),
        new THREE.MeshBasicMaterial({ color: 0x56f0a2, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      mass.scale.y = 0.63;
      mass.position.x = -0.22;
      lens.add(mass);
      massContours.push(mass);
      const pressure = new THREE.Mesh(
        new THREE.TorusGeometry(0.45 + index * 0.28, 0.01, 8, 96),
        new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      pressure.scale.y = 0.5;
      pressure.position.set(0.38, 0.05, 0.04);
      lens.add(pressure);
      pressureContours.push(pressure);
    }
    for (let index = -3; index <= 3; index += 1) {
      gridLines.push([-3.0, index * 0.42, 0.18, 3.0, index * 0.42, 0.18]);
      gridLines.push([index * 0.62, -1.35, 0.18, index * 0.62, 1.35, 0.18]);
    }
    const metricGrid = createLineSegments(THREE, gridLines, '#14e5ff', 0.24);
    lens.add(metricGrid);
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'galaxy-cluster';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        setGlowBlending(THREE, gas.material, glowOn);
        gas.visible = glowOn || falsecolourOn;
        gas.material.opacity = glowOn ? 0.76 + (motionOn ? 0.08 * Math.sin(time * 0.21) : 0) + pulse * 0.08 : 0.14;
        setGlowBlending(THREE, lensArc.material, glowOn);
        setMaterialColor(lensArc.material, falsecolourOn ? '#14e5ff' : '#c6d2d4');
        lensArc.rotation.z = 0.42 + Math.sin(styleTime * 0.08) * 0.05;
        lensArc.material.opacity = 0.58 + pulse * 0.18;
        setGlowBlending(THREE, shock.material, glowOn);
        setMaterialColor(shock.material, falsecolourOn ? '#ff3bce' : '#c1a4b3');
        shock.material.opacity = 0.38 + (motionOn ? 0.25 * Math.sin(time * 0.42) : 0);
        for (const [index, galaxy] of galaxies.entries()) {
          galaxy.rotation.y = galaxy.userData.baseRotationY ?? galaxy.rotation.y;
          galaxy.rotation.y += Math.sin(styleTime * 0.2 + index) * 0.03;
          galaxy.userData.updateGalaxy?.(time * 0.55, pulse, lensOn ? 0.5 : 0, style);
        }
        lens.visible = lensOn;
        for (const [index, contour] of massContours.entries()) {
          setGlowBlending(THREE, contour.material, glowOn);
          setMaterialColor(contour.material, falsecolourOn ? '#56f0a2' : '#a7b8ad');
          contour.material.opacity = lensOn ? 0.34 + (state.contours ? 0.18 : 0) + pulse * 0.08 : 0;
          contour.scale.set(1 + pulse * (index + 1) * 0.04, 0.63, 1);
        }
        for (const [index, contour] of pressureContours.entries()) {
          setGlowBlending(THREE, contour.material, glowOn);
          setMaterialColor(contour.material, falsecolourOn ? '#ff3bce' : '#c1a4b3');
          contour.material.opacity = lensOn ? 0.24 + (motionOn ? 0.1 * Math.sin(time * 0.5 + index) : 0) : 0;
        }
        setGlowBlending(THREE, metricGrid.material, glowOn);
        setMaterialColor(metricGrid.material, falsecolourOn ? '#14e5ff' : '#a9b8bc');
        metricGrid.material.opacity = lensOn ? 0.28 + pulse * 0.18 : 0;
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
      },
    };
  },
};

function gaussianLike(random) {
  return (random() + random() + random() + random() - 2) * 0.5;
}
