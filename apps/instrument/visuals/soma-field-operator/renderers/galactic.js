import { createLineSegments, disposeObjectTree, makeNebulaTexture, makeRadialTexture, makeTextSprite, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';
import { createSpiralGalaxy } from './lib/cosmic-galaxy.js';

function makeSpiralSegments(arms, radius, pitch, zScale, y, steps, phase = 0) {
  const segments = [];
  for (let arm = 0; arm < arms; arm += 1) {
    for (let step = 0; step < steps; step += 1) {
      const r0 = radius * (0.12 + step / (steps + 8));
      const r1 = radius * (0.12 + (step + 1) / (steps + 8));
      const a0 = arm * Math.PI * 2 / arms + r0 * pitch + phase;
      const a1 = arm * Math.PI * 2 / arms + r1 * pitch + phase;
      segments.push([
        Math.cos(a0) * r0, y, Math.sin(a0) * r0 * zScale,
        Math.cos(a1) * r1, y, Math.sin(a1) * r1 * zScale,
      ]);
    }
  }
  return segments;
}

export default {
  id: 'galactic',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const galaxy = createSpiralGalaxy(THREE, { seed: 183, radius: 2.45, count: 3100, arms: 2, pitch: 1.2, bar: true });
    galaxy.rotation.x = -0.78;
    galaxy.rotation.z = -0.2;
    group.add(galaxy);

    const emissionTexture = makeNebulaTexture(THREE, 91, ['rgba(255,59,206,ALPHA)', 'rgba(246,199,90,ALPHA)'], 192);
    const reflectionTexture = makeNebulaTexture(THREE, 92, ['rgba(20,229,255,ALPHA)', 'rgba(61,123,255,ALPHA)'], 192);
    const darkTexture = makeNebulaTexture(THREE, 93, ['rgba(10,4,14,ALPHA)', 'rgba(2,2,8,ALPHA)'], 192);
    const nebulae = [
      [emissionTexture, 0xff3bce, -1.35, 0.28, 0.68, 0.72],
      [reflectionTexture, 0x14e5ff, 1.18, -0.42, -0.46, 0.56],
      [darkTexture, 0x201022, 0.35, 0.08, 0.28, 0.82],
    ].map(([map, color, x, y, z, scale]) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.8),
        new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity: 0.36, depthWrite: false, blending: color === 0x201022 ? THREE.NormalBlending : THREE.AdditiveBlending }),
      );
      mesh.position.set(x, y, z);
      mesh.rotation.x = galaxy.rotation.x;
      mesh.rotation.z = galaxy.rotation.z;
      mesh.scale.setScalar(scale);
      group.add(mesh);
      return mesh;
    });

    const rotationArrows = createLineSegments(THREE, [
      [-2.7, -1.0, 0.18, -1.7, -1.3, 0.18],
      [-0.5, -1.45, 0.18, 0.7, -1.34, 0.18],
      [1.7, -1.15, 0.18, 2.55, -0.72, 0.18],
    ], '#56f0a2', 0.46);
    group.add(rotationArrows);

    const scaleLabel = makeTextSprite(THREE, ['GALACTIC DISC', 'two-arm density wave', 'pink H II, blue reflection, dark dust'], { width: 760, height: 200, border: '#14e5ff' });
    scaleLabel.position.set(0, -1.84, 0.4);
    scaleLabel.scale.set(2.42, 0.63, 1);
    group.add(scaleLabel);

    const haloTexture = makeRadialTexture(THREE, [
      [0, 'rgba(86,240,162,0.28)'],
      [0.45, 'rgba(20,229,255,0.12)'],
      [1, 'rgba(20,229,255,0)'],
    ], 256);
    const lens = new THREE.Group();
    const potentialSheet = new THREE.Mesh(
      new THREE.PlaneGeometry(5.8, 3.4),
      new THREE.MeshBasicMaterial({ map: haloTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    potentialSheet.rotation.x = galaxy.rotation.x;
    potentialSheet.rotation.z = galaxy.rotation.z;
    lens.add(potentialSheet);
    const crests = createLineSegments(THREE, makeSpiralSegments(2, 2.72, 1.2, 0.62, 0.08, 110), '#f6c75a', 0.72);
    crests.rotation.x = galaxy.rotation.x;
    crests.rotation.z = galaxy.rotation.z;
    lens.add(crests);
    const supernovaRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.018, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    supernovaRing.rotation.x = galaxy.rotation.x;
    supernovaRing.position.set(-0.85, 0.2, 0.32);
    lens.add(supernovaRing);
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'galactic';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        galaxy.userData.updateGalaxy(time, pulse, lensOn ? 1 : 0, style);
        galaxy.rotation.y = styleTime * 0.018;
        for (const [index, nebula] of nebulae.entries()) {
          setGlowBlending(THREE, nebula.material, glowOn && index !== 2);
          setMaterialColor(nebula.material, falsecolourOn ? [0xff3bce, 0x14e5ff, 0x201022][index] : [0xc7a9ac, 0xa5b5c0, 0x202020][index]);
          nebula.visible = glowOn || falsecolourOn || index === 2;
          nebula.material.opacity = (glowOn || index === 2 ? 0.22 : 0.08) + (motionOn ? 0.11 * Math.sin(time * 0.27 + index) : 0) + (index === 0 ? pulse * 0.08 : 0);
        }
        setGlowBlending(THREE, rotationArrows.material, glowOn);
        setMaterialColor(rotationArrows.material, falsecolourOn ? '#56f0a2' : '#a7b0aa');
        rotationArrows.material.opacity = 0.3 + (motionOn ? 0.14 * Math.sin(time * 0.3) : 0);
        lens.visible = lensOn;
        setGlowBlending(THREE, potentialSheet.material, glowOn);
        potentialSheet.visible = glowOn || falsecolourOn;
        potentialSheet.material.opacity = lensOn && glowOn ? 0.24 + pulse * 0.12 : 0;
        setGlowBlending(THREE, crests.material, glowOn);
        setMaterialColor(crests.material, falsecolourOn ? '#f6c75a' : '#c8b98a');
        crests.material.opacity = lensOn ? 0.62 + (state.contours ? 0.22 : 0) : 0;
        crests.rotation.y = styleTime * 0.02;
        setGlowBlending(THREE, supernovaRing.material, glowOn);
        setMaterialColor(supernovaRing.material, falsecolourOn ? '#ff3bce' : '#d8b6b8');
        supernovaRing.visible = lensOn && pulse > 0.01;
        supernovaRing.scale.setScalar(1 + state.responseTime * 7.5);
        supernovaRing.material.opacity = pulse * 0.72;
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
        for (const texture of galaxy.userData.cosmicTextures ?? []) texture.dispose();
      },
    };
  },
};
