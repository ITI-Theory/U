import {
  clamp01,
  disposeObject,
  makeGlowTexture,
  makeLabelTexture,
  makeLine,
  setGlowBlending,
  setMaterialColor,
  styleFlags,
} from './lib/society-utils.js';

function seeded(index) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function makeTreeSegments(THREE) {
  const segments = [];
  const tips = [{ x: -2.95, y: -1.5, z: 0.1, angle: 0.55, length: 0.62, depth: 0, phase: 0 }];
  const maxDepth = 6;
  while (tips.length) {
    const tip = tips.shift();
    if (tip.depth > maxDepth) continue;
    const branches = tip.depth < 2 ? 3 : 2;
    for (let branch = 0; branch < branches; branch += 1) {
      const sign = branch - (branches - 1) / 2;
      const angle = tip.angle + sign * (0.45 + tip.depth * 0.055) + (seeded(tip.depth * 13 + branch) - 0.5) * 0.25;
      const length = tip.length * (0.72 + seeded(tip.depth * 17 + branch) * 0.12);
      const curl = 0.16 * tip.depth;
      const end = {
        x: tip.x + Math.cos(angle + curl) * length,
        y: tip.y + Math.sin(angle) * length * 0.86 + 0.07,
        z: tip.z + (seeded(branch * 19 + tip.depth) - 0.5) * 0.36,
        angle,
        length,
        depth: tip.depth + 1,
        phase: tip.phase + branch * 0.7,
      };
      segments.push([
        new THREE.Vector3(tip.x, tip.y, tip.z),
        new THREE.Vector3(end.x, end.y, end.z),
        tip.depth,
      ]);
      tips.push(end);
    }
  }
  return segments;
}

const namedStars = [
  ['Sun', 0, 0, 0, 1.0],
  ['Alpha Cen', -0.76, 0.28, -0.42, 0.78],
  ['Barnard', 0.84, -0.34, 0.26, 0.45],
  ['Wolf 359', 1.32, 0.18, -0.86, 0.35],
  ['Sirius', -1.65, 0.72, 0.7, 0.68],
  ['Lalande', 2.08, -0.22, 0.58, 0.42],
  ['Epsilon Eri', -2.28, -0.54, -0.62, 0.5],
  ['Tau Ceti', 2.62, 0.42, -0.22, 0.47],
  ['Procyon', -0.35, 1.28, 1.18, 0.64],
  ['Ross 128', 0.22, -1.05, -1.25, 0.32],
  ['Luyten', 1.74, 1.06, 0.92, 0.36],
  ['Kapteyn', -2.72, 0.12, 0.16, 0.34],
];

export const stellarNeighborhoodRenderer = {
  id: 'stellar-neighborhood',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const violet = new THREE.Color('#8f47ff');
    const group = new THREE.Group();
    group.name = 'stellar-neighborhood-renderer';
    group.position.set(0.18, 0.18, 0);
    scene.add(group);

    const starTexture = makeGlowTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.14, 'rgba(20,229,255,0.8)'],
      [0.58, 'rgba(141,71,255,0.22)'],
      [1, 'rgba(141,71,255,0)'],
    ]);
    const sunTexture = makeGlowTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.18, 'rgba(246,199,90,0.95)'],
      [0.72, 'rgba(246,199,90,0.2)'],
      [1, 'rgba(246,199,90,0)'],
    ]);
    const labelTexture = makeLabelTexture(THREE, 'SPECIES / STELLAR', [
      'nearby stars around the Sun',
      'ghost tree = biological lineage stream',
      'lens: deep-time response comparison',
    ], '#8f47ff');

    const starPositions = new Float32Array(namedStars.length * 3);
    const starColors = new Float32Array(namedStars.length * 3);
    for (const [index, star] of namedStars.entries()) {
      starPositions.set([star[1], star[2], star[3]], index * 3);
      const color = index === 0 ? gold : cyan.clone().lerp(violet, (index % 5) / 5);
      starColors.set([color.r, color.g, color.b], index * 3);
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry()
        .setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
        .setAttribute('color', new THREE.BufferAttribute(starColors, 3)),
      new THREE.PointsMaterial({
        size: 0.13,
        map: starTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    group.add(stars);

    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTexture, color: gold, transparent: true, opacity: 0.92, depthWrite: false, blending: THREE.AdditiveBlending }));
    sun.scale.setScalar(0.52);
    group.add(sun);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x3d7bff, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending });
    const orbits = [];
    for (let index = 0; index < 4; index += 1) {
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(0.56 + index * 0.32, 0.0035, 6, 128),
        new THREE.MeshBasicMaterial({ color: 0x3d7bff, transparent: true, opacity: 0.12, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      orbit.rotation.x = Math.PI / 2 + index * 0.1;
      orbit.rotation.z = index * 0.42;
      group.add(orbit);
      orbits.push(orbit);
    }

    const neighborLinks = namedStars.slice(1).map((star, index) => {
      const line = makeLine(THREE, [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(star[1], star[2], star[3]),
      ], orbitMaterial.clone());
      line.material.opacity = 0.1 + index * 0.008;
      group.add(line);
      return line;
    });
    const divider = makeLine(THREE, [
      new THREE.Vector3(-1.05, -1.85, 0.18),
      new THREE.Vector3(-0.66, 1.75, 0.18),
    ], new THREE.LineBasicMaterial({ color: 0x8f47ff, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
    group.add(divider);

    const treeGroup = new THREE.Group();
    treeGroup.position.set(0.3, 0.03, 0);
    group.add(treeGroup);
    const treeSegments = makeTreeSegments(THREE);
    const treeLines = treeSegments.map(([start, end, depth], index) => {
      const line = makeLine(THREE, [start, end], new THREE.LineBasicMaterial({
        color: depth % 2 ? green : pink,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      line.userData.depth = depth;
      line.userData.phase = index * 0.37;
      treeGroup.add(line);
      return line;
    });
    const treeSpiral = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(Array.from({ length: 150 }, (_, index) => {
        const t = index / 149;
        return new THREE.Vector3(
          -3.05 + t * 2.25,
          -1.58 + t * 3.1,
          0.1 + Math.sin(t * Math.PI * 9) * 0.23,
        );
      })),
      new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    treeGroup.add(treeSpiral);

    const waveShells = Array.from({ length: 6 }, (_, index) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.75 + index * 0.38, 40, 20),
        new THREE.MeshBasicMaterial({ color: index % 2 ? pink : cyan, wireframe: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      group.add(shell);
      return shell;
    });

    const lineageBasins = Array.from({ length: 5 }, (_, index) => {
      const basin = new THREE.Mesh(
        new THREE.TorusGeometry(0.24 + index * 0.16, 0.006, 8, 96),
        new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      basin.rotation.x = Math.PI / 2;
      basin.position.set(-2.42 + index * 0.28, -0.65 + index * 0.38, 0.16);
      treeGroup.add(basin);
      return basin;
    });

    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.78, depthWrite: false }));
    label.position.set(0.2, -2.08, 0.4);
    label.scale.set(3.78, 0.94, 1);
    group.add(label);
    const starColorAttribute = stars.geometry.getAttribute('color');
    const tempColor = new THREE.Color();
    const lineInk = new THREE.Color('#d8dbe2');

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'stellar-neighborhood';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const fieldOn = state.tTheory && state.level >= 8;
        stars.rotation.y = styleTime * 0.028;
        stars.rotation.x = motionOn ? 0.12 * Math.sin(time * 0.05) : 0;
        setGlowBlending(THREE, stars.material, glowOn);
        stars.material.size = glowOn ? 0.16 : 0.075;
        stars.material.opacity = glowOn ? 0.92 + (motionOn ? 0.08 * Math.sin(time * 0.16) : 0) : 0.86;
        for (const [index] of namedStars.entries()) {
          tempColor.copy(falsecolourOn ? (index === 0 ? gold : cyan) : lineInk);
          if (falsecolourOn && index !== 0) tempColor.lerp(violet, (index % 5) / 5);
          starColorAttribute.setXYZ(index, tempColor.r, tempColor.g, tempColor.b);
        }
        starColorAttribute.needsUpdate = true;
        setGlowBlending(THREE, sun.material, glowOn);
        sun.material.opacity = glowOn ? 0.86 + (motionOn ? 0.12 * Math.sin(time * 0.45) : 0) + pulse * 0.12 : 0.32;
        sun.scale.setScalar(0.52 + (glowOn ? pulse * 0.18 : 0));
        for (const [index, orbit] of orbits.entries()) {
          setGlowBlending(THREE, orbit.material, glowOn);
          setMaterialColor(orbit.material, falsecolourOn ? '#3d7bff' : '#cfd6df');
          orbit.material.opacity = glowOn ? 0.14 + 0.03 * index : 0.26;
        }
        for (const [index, line] of neighborLinks.entries()) {
          setGlowBlending(THREE, line.material, glowOn);
          setMaterialColor(line.material, falsecolourOn ? '#3d7bff' : '#cfd6df');
          line.material.opacity = (fieldOn ? 0.26 : (glowOn ? 0.14 : 0.32)) + (motionOn ? 0.04 * Math.sin(time * 0.18 + index) : 0);
        }
        setGlowBlending(THREE, divider.material, glowOn);
        setMaterialColor(divider.material, falsecolourOn ? violet : '#d8dbe2');
        divider.material.opacity = glowOn ? 0.28 : 0.45;
        treeGroup.rotation.z = motionOn ? 0.05 * Math.sin(time * 0.06) : 0;
        setGlowBlending(THREE, treeSpiral.material, glowOn);
        setMaterialColor(treeSpiral.material, falsecolourOn ? gold : '#e2dccd');
        treeSpiral.material.opacity = 0.28 + (motionOn ? 0.08 * Math.sin(time * 0.12) : 0);
        for (const line of treeLines) {
          setGlowBlending(THREE, line.material, glowOn);
          setMaterialColor(line.material, falsecolourOn ? (line.userData.depth % 2 ? green : pink) : '#dcd8ce');
          line.material.opacity = (fieldOn ? 0.36 : (glowOn ? 0.24 : 0.38)) + (motionOn ? 0.08 * Math.sin(time * 0.35 + line.userData.phase) : 0);
        }
        for (const [index, shell] of waveShells.entries()) {
          const deepTime = (styleTime * 0.018 + index * 0.13 + state.responseTime * 0.4) % 1;
          shell.scale.setScalar(0.82 + deepTime * 0.62 + pulse * 0.05);
          shell.rotation.y = styleTime * (0.012 + index * 0.003);
          setGlowBlending(THREE, shell.material, glowOn);
          setMaterialColor(shell.material, falsecolourOn ? (index % 2 ? pink : cyan) : '#ece8da');
          shell.material.opacity = fieldOn ? (glowOn ? 0.045 + 0.1 * (1 - deepTime) : 0.028 + 0.05 * (1 - deepTime)) : 0;
        }
        for (const [index, basin] of lineageBasins.entries()) {
          const reach = clamp01(state.responseTime * 1.25 - index * 0.12);
          basin.scale.set(1 + reach * 1.8, 0.64 + reach * 1.1, 1);
          setGlowBlending(THREE, basin.material, glowOn);
          setMaterialColor(basin.material, falsecolourOn ? green : '#ebe6dc');
          basin.material.opacity = fieldOn ? reach * (0.2 + (motionOn ? 0.12 * Math.sin(time * 0.25 + index) ** 2 : 0.08)) : 0;
        }
        label.material.opacity = 0.58 + (fieldOn ? 0.2 : 0.05);
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        starTexture.dispose();
        sunTexture.dispose();
        labelTexture.dispose();
      },
    };
  },
};

export default stellarNeighborhoodRenderer;
