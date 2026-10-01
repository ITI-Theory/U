import { createLineSegments, createPointCloud, disposeObjectTree, gaussian, makeRadialTexture, makeTextSprite, seededRandom, setGlowBlending, setMaterialColor, styleFlags } from './lib/cosmic-tools.js';
import { createSpiralGalaxy } from './lib/cosmic-galaxy.js';

export default {
  id: 'galactic-halo',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const random = seededRandom(1601);
    const disc = createSpiralGalaxy(THREE, { seed: 1602, radius: 0.78, count: 650, arms: 2, pitch: 1.22 });
    disc.rotation.x = -0.76;
    disc.position.y = -0.05;
    group.add(disc);

    const haloTexture = makeRadialTexture(THREE, [
      [0, 'rgba(61,123,255,0.18)'],
      [0.42, 'rgba(143,71,255,0.11)'],
      [0.72, 'rgba(20,229,255,0.055)'],
      [1, 'rgba(20,229,255,0)'],
    ], 384);
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(7.4, 4.4),
      new THREE.MeshBasicMaterial({ map: haloTexture, transparent: true, opacity: 0.78, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    group.add(halo);
    const shells = [];
    for (let index = 0; index < 5; index += 1) {
      const shell = new THREE.Mesh(
        new THREE.TorusGeometry(1.0 + index * 0.54, 0.009, 8, 128),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0x8f47ff : 0x14e5ff, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      shell.scale.y = 0.62;
      group.add(shell);
      shells.push(shell);
    }

    const clusters = [];
    const clusterSprites = [];
    const glowTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.95)'],
      [0.18, 'rgba(246,199,90,0.65)'],
      [1, 'rgba(246,199,90,0)'],
    ]);
    for (let index = 0; index < 24; index += 1) {
      const a = random() * Math.PI * 2;
      const r = 1.2 + random() * 2.15;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: 0xf6c75a, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }));
      sprite.position.set(Math.cos(a) * r, Math.sin(a * 1.7) * 0.75, Math.sin(a) * r * 0.45);
      sprite.scale.setScalar(0.08 + random() * 0.04);
      clusters.push({ sprite, r, a, speed: 0.012 + random() * 0.018 });
      clusterSprites.push(sprite);
      group.add(sprite);
    }

    const satellites = [];
    for (let index = 0; index < 5; index += 1) {
      const points = [];
      for (let star = 0; star < 120; star += 1) {
        const r = 0.18 * Math.pow(random(), 0.35);
        const a = random() * Math.PI * 2;
        points.push({ x: Math.cos(a) * r, y: gaussian(random) * 0.025, z: Math.sin(a) * r * 0.52, color: star % 3 ? '#ffd884' : '#78a8ff' });
      }
      const satellite = createPointCloud(THREE, points, { size: 0.028, opacity: 0.76 });
      const angle = index * Math.PI * 2 / 5 + 0.3;
      satellite.position.set(Math.cos(angle) * (2.0 + random() * 1.2), -0.6 + random() * 1.2, Math.sin(angle) * 1.1);
      satellite.rotation.z = random() * Math.PI;
      satellites.push({ satellite, angle, radius: satellite.position.length(), speed: 0.008 + random() * 0.01 });
      group.add(satellite);
    }

    const streamSegments = [];
    for (let step = 0; step < 140; step += 1) {
      const t0 = step / 140;
      const t1 = (step + 1) / 140;
      const a0 = t0 * Math.PI * 2.2 - 0.8;
      const a1 = t1 * Math.PI * 2.2 - 0.8;
      streamSegments.push([
        Math.cos(a0) * (1.35 + t0 * 1.85), Math.sin(a0 * 1.5) * 0.52, Math.sin(a0) * 0.85,
        Math.cos(a1) * (1.35 + t1 * 1.85), Math.sin(a1 * 1.5) * 0.52, Math.sin(a1) * 0.85,
      ]);
    }
    const stream = createLineSegments(THREE, streamSegments, '#f6c75a', 0.38);
    group.add(stream);

    const panel = makeTextSprite(THREE, ['ROTATION CURVE', 'visible mass falls', 'observed speed stays high'], { width: 680, height: 190, border: '#8f47ff' });
    panel.position.set(2.55, -1.9, 0.3);
    panel.scale.set(2.0, 0.58, 1);
    group.add(panel);

    const lens = new THREE.Group();
    const potentialContours = [];
    for (let index = 0; index < 7; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.58 + index * 0.38, 0.012, 8, 128),
        new THREE.MeshBasicMaterial({ color: 0x56f0a2, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.scale.y = 0.58;
      lens.add(ring);
      potentialContours.push(ring);
    }
    const subhaloPoints = createPointCloud(THREE, Array.from({ length: 85 }, () => {
      const a = random() * Math.PI * 2;
      const r = 0.9 + random() * 2.5;
      return { x: Math.cos(a) * r, y: gaussian(random) * 0.8, z: Math.sin(a) * r * 0.44, color: '#8f47ff' };
    }), { size: 0.045, opacity: 0.0 });
    lens.add(subhaloPoints);
    group.add(lens);

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'galactic-halo';
        if (!group.visible) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const lensOn = state.tTheory && state.level >= 8;
        disc.userData.updateGalaxy(time, pulse, lensOn ? 1 : 0, style);
        setGlowBlending(THREE, halo.material, glowOn);
        halo.visible = glowOn || falsecolourOn;
        halo.material.opacity = glowOn ? 0.7 + (motionOn ? 0.08 * Math.sin(time * 0.12) : 0) : 0.16;
        for (const [index, shell] of shells.entries()) {
          shell.rotation.z = styleTime * (0.01 + index * 0.002);
          setGlowBlending(THREE, shell.material, glowOn);
          setMaterialColor(shell.material, falsecolourOn ? (index % 2 ? '#8f47ff' : '#14e5ff') : '#71808a');
          shell.material.opacity = 0.16 + (motionOn ? 0.07 * Math.sin(time * 0.21 + index) : 0);
        }
        for (const cluster of clusters) {
          const a = cluster.a + styleTime * cluster.speed;
          cluster.sprite.position.x = Math.cos(a) * cluster.r;
          cluster.sprite.position.z = Math.sin(a) * cluster.r * 0.45;
          setGlowBlending(THREE, cluster.sprite.material, glowOn);
          setMaterialColor(cluster.sprite.material, falsecolourOn ? '#f6c75a' : '#c8b98a');
          cluster.sprite.material.opacity = glowOn ? 0.48 + (motionOn ? 0.18 * Math.sin(time * 0.8 + cluster.a) : 0) : 0.22;
        }
        for (const satellite of satellites) {
          satellite.satellite.rotation.y = styleTime * satellite.speed * 8;
          setMaterialColor(satellite.satellite.material, falsecolourOn ? '#ffffff' : '#b7b2a8');
        }
        setGlowBlending(THREE, stream.material, glowOn);
        setMaterialColor(stream.material, falsecolourOn ? '#f6c75a' : '#b8ae92');
        stream.rotation.z = Math.sin(styleTime * 0.05) * 0.06;
        panel.visible = !state.questionId;
        lens.visible = lensOn;
        for (const [index, ring] of potentialContours.entries()) {
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? '#56f0a2' : '#a7b8ad');
          ring.material.opacity = lensOn ? 0.28 + (state.contours ? 0.18 : 0) + pulse * 0.08 : 0;
          ring.scale.set(1 + pulse * 0.06 * (index + 1), 0.58 + pulse * 0.02 * index, 1);
        }
        setMaterialColor(subhaloPoints.material, falsecolourOn ? '#8f47ff' : '#9a94a2');
        subhaloPoints.material.opacity = lensOn ? 0.4 : 0;
      },
      dispose() {
        scene.remove(group);
        disposeObjectTree(group);
      },
    };
  },
};
