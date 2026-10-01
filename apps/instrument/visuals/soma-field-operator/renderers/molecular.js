import { createDynamicLine, disposeTree, ensureOperatorCanvasSize, getRiceStyle, makeLabelSprite, makeRadialTexture, setLinePoints } from './lib/micro-primitives.js';

function makeDensity(THREE, atoms) {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const cyan = new THREE.Color('#14e5ff');
  const green = new THREE.Color('#56f0a2');
  for (let index = 0; index < count; index += 1) {
    const atom = atoms[index % atoms.length];
    const a = (index * 0.61803398875) % 1;
    const b = (index * 0.754877666) % 1;
    const c = (index * 0.569840291) % 1;
    const theta = Math.PI * 2 * a;
    const z = 1 - 2 * b;
    const radius = 0.12 + 0.25 * c ** 2;
    const xy = Math.sqrt(1 - z * z);
    positions[index * 3] = atom[0] + Math.cos(theta) * xy * radius;
    positions[index * 3 + 1] = atom[1] + z * radius;
    positions[index * 3 + 2] = atom[2] + Math.sin(theta) * xy * radius;
    const color = cyan.clone().lerp(green, c);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function makeBond(THREE, a, b, material) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const mid = start.clone().lerp(end, 0.5);
  const length = start.distanceTo(end);
  const bond = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, length, 10), material);
  bond.position.copy(mid);
  bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
  return bond;
}

export const molecularRenderer = {
  id: 'molecular',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const glow = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.18, 'rgba(86,240,162,0.85)'],
      [0.55, 'rgba(20,229,255,0.22)'],
      [1, 'rgba(20,229,255,0)'],
    ]);

    const molecule = new THREE.Group();
    molecule.position.y = 0.08;
    group.add(molecule);
    const atomGeometry = new THREE.SphereGeometry(0.105, 18, 12);
    const carbon = new THREE.MeshPhongMaterial({ color: 0x9bc9ff, emissive: 0x10224a, emissiveIntensity: 0.26 });
    const oxygen = new THREE.MeshPhongMaterial({ color: 0xff5c9f, emissive: 0x4b0b24, emissiveIntensity: 0.32 });
    const nitrogen = new THREE.MeshPhongMaterial({ color: 0x56f0a2, emissive: 0x0b4d2d, emissiveIntensity: 0.32 });
    const bondMaterial = new THREE.MeshBasicMaterial({ color: 0xbfefff, transparent: true, opacity: 0.55 });

    const atoms = [];
    for (let ring = 0; ring < 2; ring += 1) {
      const y = ring ? 0.58 : -0.54;
      for (let index = 0; index < 10; index += 1) {
        const angle = (index / 10) * Math.PI * 2 + (ring ? 0.22 : 0);
        atoms.push([Math.cos(angle) * 1.35, y, Math.sin(angle) * 0.74, index % 5 === 0 ? 'N' : 'C']);
      }
    }
    const chromophore = [[-0.34, 0.0, 0.08, 'O'], [0, 0.0, 0.0, 'C'], [0.34, 0.0, -0.08, 'N']];
    atoms.push(...chromophore);

    const atomMeshes = atoms.map(([x, y, z, type], index) => {
      const mesh = new THREE.Mesh(atomGeometry, type === 'O' ? oxygen : type === 'N' ? nitrogen : carbon);
      mesh.position.set(x, y, z);
      mesh.userData.home = new THREE.Vector3(x, y, z);
      mesh.userData.phase = index * 0.53;
      molecule.add(mesh);
      return mesh;
    });
    for (let index = 0; index < 10; index += 1) {
      molecule.add(makeBond(THREE, atoms[index], atoms[(index + 1) % 10], bondMaterial));
      molecule.add(makeBond(THREE, atoms[10 + index], atoms[10 + ((index + 1) % 10)], bondMaterial));
      molecule.add(makeBond(THREE, atoms[index], atoms[10 + index], bondMaterial));
    }
    molecule.add(makeBond(THREE, chromophore[0], chromophore[1], bondMaterial));
    molecule.add(makeBond(THREE, chromophore[1], chromophore[2], bondMaterial));

    const density = new THREE.Points(
      makeDensity(THREE, atoms),
      new THREE.PointsMaterial({ size: 0.034, vertexColors: true, transparent: true, opacity: 0.23, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    molecule.add(density);

    const chromoGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0x56f0a2, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }));
    chromoGlow.position.set(0, 0, 0.03);
    chromoGlow.scale.set(0.9, 0.38, 1);
    molecule.add(chromoGlow);

    const excitation = createDynamicLine(THREE, 30, { color: '#3d7bff', opacity: 0 });
    const emission = createDynamicLine(THREE, 50, { color: '#56f0a2', opacity: 0 });
    group.add(excitation, emission);

    const modeLines = atomMeshes.slice(0, 20).map(() => {
      const line = createDynamicLine(THREE, 2, { color: '#f6c75a', opacity: 0 });
      molecule.add(line);
      return line;
    });
    const bondWaves = Array.from({ length: 12 }, (_, index) => {
      const line = createDynamicLine(THREE, 26, { color: index % 2 ? '#56f0a2' : '#14e5ff', opacity: 0 });
      molecule.add(line);
      return line;
    });

    const surface = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 1.0, 34, 14),
      new THREE.MeshBasicMaterial({ color: 0x8f47ff, wireframe: true, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    surface.position.set(0, -1.52, 0.05);
    surface.rotation.x = -Math.PI / 2;
    group.add(surface);
    const minimaA = makeLabelSprite(THREE, ['min A', 'folded'], { border: '#56f0a2', scale: [0.78, 0.25, 1], width: 360, height: 120 });
    const minimaB = makeLabelSprite(THREE, ['min B', 'excited'], { border: '#ff3bce', scale: [0.82, 0.25, 1], width: 360, height: 120 });
    minimaA.position.set(-1.12, -2.02, 0.18);
    minimaB.position.set(1.05, -2.02, 0.18);
    group.add(minimaA, minimaB);

    const scaleLabel = makeLabelSprite(THREE, ['~ nanometre scale', 'ball-and-stick + density'], { border: '#14e5ff', scale: [2.05, 0.42, 1] });
    scaleLabel.position.set(-2.05, 1.65, 0.2);
    group.add(scaleLabel);

    function drawPhotonLine(line, from, to, time, amplitude) {
      const points = [];
      for (let index = 0; index < line.userData.positions.length / 3; index += 1) {
        const t = index / ((line.userData.positions.length / 3) - 1);
        const x = from[0] + (to[0] - from[0]) * t;
        const y = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI * 8 - time * 7) * amplitude;
        const z = from[2] + (to[2] - from[2]) * t + Math.cos(t * Math.PI * 8 - time * 7) * amplitude;
        points.push([x, y, z]);
      }
      setLinePoints(line, points);
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'molecular';
        group.visible = active;
        if (!active) return;
        ensureOperatorCanvasSize();
        const style = getRiceStyle(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        molecule.rotation.y = style.motion ? t * 0.18 : 0;
        molecule.rotation.x = style.motion ? Math.sin(t * 0.12) * 0.1 : 0;
        carbon.color.set(style.fluorescence ? 0x9bc9ff : 0xa6abad);
        oxygen.color.set(style.fluorescence ? 0xff5c9f : 0xa98582);
        nitrogen.color.set(style.fluorescence ? 0x56f0a2 : 0x8ea398);
        for (const material of [carbon, oxygen, nitrogen]) material.emissiveIntensity = style.glow ? 0.3 : 0.05;
        bondMaterial.color.set(style.fluorescence ? 0xbfefff : 0xa8adae);
        bondMaterial.opacity = style.glow ? 0.55 : 0.7;
        density.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        if (density.material.vertexColors !== style.fluorescence) {
          density.material.vertexColors = style.fluorescence;
          density.material.needsUpdate = true;
        }
        density.material.color.set(style.fluorescence ? 0xffffff : 0x9fa7a7);
        density.material.opacity = (style.glow && style.fluorescence ? 0.18 : 0.11) + pulse * (style.glow ? 0.16 : 0.06);
        chromoGlow.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        chromoGlow.material.opacity = style.glow && style.fluorescence ? 0.54 + pulse * 0.42 : 0;
        chromoGlow.scale.set(0.9 + pulse * 0.42, 0.38 + pulse * 0.16, 1);
        const conform = pulse + (style.motion ? 0.5 + 0.5 * Math.sin(t * 0.33) : 0.5);
        for (const mesh of atomMeshes) {
          const home = mesh.userData.home;
          const wiggle = (style.motion ? Math.sin(t * 2.2 + mesh.userData.phase) * 0.025 : 0) + pulse * 0.035 * Math.sin(mesh.userData.phase);
          mesh.position.set(home.x * (1 + 0.02 * conform), home.y + wiggle, home.z * (1 - 0.015 * conform));
        }
        drawPhotonLine(excitation, [-2.9, 0.64, 0.1], [0, 0.08, 0.08], t, 0.055);
        drawPhotonLine(emission, [0, 0.08, 0.08], [2.9, 0.95, 0.16], t, 0.07);
        excitation.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        emission.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        excitation.material.color.set(style.fluorescence ? 0x3d7bff : 0x8995a4);
        emission.material.color.set(style.fluorescence ? 0x56f0a2 : 0xa0a88f);
        excitation.material.opacity = (style.glow ? 0.18 : 0.2) + pulse * (style.glow ? 0.62 : 0.25);
        emission.material.opacity = (style.glow && style.fluorescence ? 0.22 : 0.16) + pulse * (style.glow ? 0.72 : 0.3);

        for (const [index, line] of modeLines.entries()) {
          const atom = atomMeshes[index];
          const home = atom.userData.home;
          const phase = style.motion ? Math.sin(t * 2.4 + index) : Math.sin(index);
          const end = [home.x * 1.12, home.y + phase * 0.18, home.z * 1.12];
          setLinePoints(line, [[home.x, home.y, home.z], end]);
          line.visible = lens;
          line.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          line.material.color.set(style.fluorescence ? 0xf6c75a : 0xa69c84);
          line.material.opacity = lens ? (style.glow ? 0.36 : 0.28) + pulse * 0.28 : 0;
        }
        for (const [index, line] of bondWaves.entries()) {
          const a = atoms[index];
          const b = atoms[(index + 4) % 20];
          const points = [];
          for (let step = 0; step < 26; step += 1) {
            const t = step / 25;
            points.push([
              a[0] + (b[0] - a[0]) * t,
              a[1] + (b[1] - a[1]) * t + Math.sin(t * Math.PI * 2 + (style.motion ? time * 3 : 0) + index) * 0.045,
              a[2] + (b[2] - a[2]) * t,
            ]);
          }
          setLinePoints(line, points);
          line.visible = lens;
          line.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          line.material.color.set(style.fluorescence ? (index % 2 ? 0x56f0a2 : 0x14e5ff) : 0x9ca5a2);
          line.material.opacity = lens ? 0.18 + (style.motion ? 0.26 * Math.max(0, Math.sin(t * 2.2 + index)) : 0.1) + pulse * 0.18 : 0;
        }
        surface.visible = lens;
        surface.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        surface.material.color.set(style.falsecolour ? 0x8f47ff : 0x777987);
        surface.material.opacity = lens ? (style.glow ? 0.22 : 0.28) : 0;
        minimaA.visible = lens;
        minimaB.visible = lens;
        minimaA.material.opacity = lens ? 0.74 : 0;
        minimaB.material.opacity = lens ? 0.55 + pulse * 0.22 : 0;
      },
      dispose() {
        scene.remove(group);
        disposeTree(group);
        glow.dispose();
      },
    };
  },
};

export default molecularRenderer;
