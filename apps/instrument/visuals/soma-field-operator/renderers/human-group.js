import {
  collectivePalette,
  createDynamicSegments,
  disposeObject,
  makeGlowTexture,
} from './lib/collective-primitives.js';

export const humanGroupRenderer = {
  id: 'human-group',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const glow = makeGlowTexture(THREE, 'rgba(255,255,255,0.95)', 'rgba(246,199,90,0.5)', 'rgba(246,199,90,0)');
    const peopleCount = 54;
    const people = Array.from({ length: peopleCount }, (_, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      const x = (col - 4) * 0.58 + (row % 2) * 0.18;
      const y = -1.58 + row * 0.32;
      const z = -0.35 - row * 0.08 + (Math.sin(index * 9.1) * 0.08);
      return {
        x,
        y,
        z,
        basePhase: index * 2.399963,
        omega: 0.65 + (index % 7) * 0.08,
        role: index === 4 ? 1 : 0,
      };
    });

    const skeletonPositions = new Float32Array(peopleCount * 7 * 2 * 3);
    const skeletonGeometry = new THREE.BufferGeometry();
    skeletonGeometry.setAttribute('position', new THREE.BufferAttribute(skeletonPositions, 3));
    const skeletonMaterial = new THREE.LineBasicMaterial({
      color: collectivePalette.grey,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const skeletons = new THREE.LineSegments(skeletonGeometry, skeletonMaterial);
    skeletons.frustumCulled = false;
    group.add(skeletons);

    const phasePositions = new Float32Array(peopleCount * 3);
    const phaseColors = new Float32Array(peopleCount * 3);
    const phaseGeometry = new THREE.BufferGeometry();
    phaseGeometry.setAttribute('position', new THREE.BufferAttribute(phasePositions, 3));
    phaseGeometry.setAttribute('color', new THREE.BufferAttribute(phaseColors, 3));
    const phaseDots = new THREE.Points(phaseGeometry, new THREE.PointsMaterial({
      size: 0.105,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(phaseDots);

    const crowdWave = new THREE.Mesh(
      new THREE.RingGeometry(0.45, 0.52, 96),
      new THREE.MeshBasicMaterial({ color: collectivePalette.gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    crowdWave.position.set(-2.5, -1.15, 0.1);
    crowdWave.scale.set(1, 0.42, 1);
    group.add(crowdWave);

    const clap = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glow,
      color: collectivePalette.gold,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    clap.position.set(-2.55, -1.34, 0.12);
    group.add(clap);

    const normField = Array.from({ length: 4 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.4 + index * 0.36, 0.01, 8, 120),
        new THREE.MeshBasicMaterial({ color: index % 2 ? collectivePalette.violet : collectivePalette.green, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.position.set(0, -0.68 + index * 0.1, -0.03);
      ring.scale.set(1.52, 0.42, 1);
      group.add(ring);
      return ring;
    });

    const couplingLinks = createDynamicSegments(THREE, 120, collectivePalette.green, { opacity: 0 });
    group.add(couplingLinks.object);
    const phaseColor = new THREE.Color();

    return {
      group,
      update(state, time, pulse) {
        group.visible = state.rendererId === 'human-group';
        if (!group.visible) return;
        const lens = state.tTheory && state.level >= 8;
        let offset = 0;
        const clapRadius = 0.25 + state.responseTime * 4.4;
        const segments = [];
        for (const [index, person] of people.entries()) {
          const distanceFromClap = Math.hypot(person.x + 2.55, person.y + 1.34);
          const wave = Math.exp(-((distanceFromClap - clapRadius) ** 2) / 0.08);
          const applause = Math.sin(time * 4.8 - person.x * 1.3 + person.basePhase) > 0.45 ? 1 : 0;
          const lift = (lens ? 0.04 : 0.12) * Math.sin(time * 2.6 - person.x * 2.2) + wave * (0.28 + pulse * 0.28);
          const head = [person.x, person.y + 0.22 + lift, person.z];
          const neck = [person.x, person.y + 0.11 + lift * 0.35, person.z];
          const body = [person.x, person.y - 0.18, person.z];
          const leftHand = [person.x - 0.12 - applause * 0.04, person.y + 0.02 + applause * 0.08 + lift * 0.5, person.z];
          const rightHand = [person.x + 0.12 + applause * 0.04, person.y + 0.02 + applause * 0.08 + lift * 0.5, person.z];
          const leftFoot = [person.x - 0.1, person.y - 0.36, person.z];
          const rightFoot = [person.x + 0.1, person.y - 0.36, person.z];
          for (const [a, b] of [[head, neck], [neck, body], [neck, leftHand], [neck, rightHand], [body, leftFoot], [body, rightFoot], [leftHand, rightHand]]) {
            skeletonPositions.set([...a, ...b], offset);
            offset += 6;
          }
          const sync = lens ? 0.86 + 0.1 * Math.sin(time * 0.3) : 0.12;
          const meanPhase = time * 1.2;
          const phase = meanPhase * sync + (person.basePhase + person.omega * time) * (1 - sync);
          phaseColor.setHSL((phase / (Math.PI * 2) + 1) % 1, 0.86, 0.58);
          phasePositions[index * 3] = person.x;
          phasePositions[index * 3 + 1] = person.y + 0.32 + wave * 0.18;
          phasePositions[index * 3 + 2] = person.z + 0.08;
          phaseColors[index * 3] = phaseColor.r;
          phaseColors[index * 3 + 1] = phaseColor.g;
          phaseColors[index * 3 + 2] = phaseColor.b;
          if (lens && index > 8 && index % 2 === 0) {
            const target = people[index - 9];
            segments.push([[person.x, person.y + 0.15, person.z], [target.x, target.y + 0.15, target.z]]);
          }
        }
        skeletonGeometry.attributes.position.needsUpdate = true;
        skeletonMaterial.color.set(lens ? collectivePalette.cyan : collectivePalette.grey);
        skeletonMaterial.opacity = lens ? 0.32 : 0.58;
        phaseGeometry.attributes.position.needsUpdate = true;
        phaseGeometry.attributes.color.needsUpdate = true;
        phaseDots.material.opacity = lens ? 0.9 : 0.18;
        couplingLinks.update(segments);
        couplingLinks.material.opacity = lens ? 0.16 + pulse * 0.2 : 0;
        crowdWave.visible = pulse > 0.01 || !lens;
        crowdWave.position.x = -2.55 + state.responseTime * 4.8;
        crowdWave.scale.set(0.9 + state.responseTime * 3.2, 0.24 + state.responseTime * 0.75, 1);
        crowdWave.material.opacity = (lens ? 0.16 : 0.32) + pulse * 0.32;
        clap.scale.setScalar(0.42 + pulse * 1.3);
        clap.material.opacity = Math.min(0.9, 0.25 + pulse * 0.65);
        for (const [index, ring] of normField.entries()) {
          ring.visible = lens;
          ring.rotation.z = 0.06 * Math.sin(time * 0.35 + index);
          ring.scale.set(1.35 + index * 0.18 + Math.sin(time * 0.4 + index) * 0.03, 0.36 + index * 0.05, 1);
          ring.material.opacity = lens ? 0.18 + index * 0.035 + pulse * 0.06 : 0;
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

export default humanGroupRenderer;
