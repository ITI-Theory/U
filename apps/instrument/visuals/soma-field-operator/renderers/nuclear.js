import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { createGridBox, disposeTree, ensureOperatorCanvasSize, getRiceStyle, makeLabelSprite, makeRadialTexture } from './lib/micro-primitives.js';

function actionColour(value, falsecolour = true) {
  const t = Math.max(0, Math.min(1, value));
  if (!falsecolour) {
    const v = Math.round(38 + t * 150);
    return [v, v + 8, v + 14];
  }
  const cold = [22, 33, 92];
  const mid = [20, 229, 255];
  const hot = [255, 112, 42];
  const hi = [246, 199, 90];
  const a = t < 0.5 ? cold : mid;
  const b = t < 0.5 ? mid : t < 0.82 ? hot : hi;
  const m = t < 0.5 ? t * 2 : t < 0.82 ? (t - 0.5) / 0.32 : (t - 0.82) / 0.18;
  return a.map((channel, index) => Math.round(channel + (b[index] - channel) * m));
}

function makeSlice(THREE, width, height, rotation, position) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.64, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
  );
  mesh.rotation.set(...rotation);
  mesh.position.set(...position);
  mesh.userData.canvas = canvas;
  mesh.userData.context = canvas.getContext('2d');
  mesh.userData.texture = texture;
  return mesh;
}

export const nuclearRenderer = {
  id: 'nuclear',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const mutedFieldColours = [new THREE.Color('#74818a'), new THREE.Color('#566269'), new THREE.Color('#9a8376')];
    const glow = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.18, 'rgba(246,199,90,0.9)'],
      [0.58, 'rgba(255,59,206,0.25)'],
      [1, 'rgba(255,59,206,0)'],
    ]);

    const vacuum = new THREE.Group();
    vacuum.position.set(0, 0.26, -0.16);
    group.add(vacuum);
    const grid = createGridBox(THREE, { width: 5.0, height: 2.9, depth: 2.9, divisions: 7, color: '#3d7bff', opacity: 0.12 });
    vacuum.add(grid);

    const actionMaterial = new THREE.MeshPhongMaterial({
      color: 0x5ff0df,
      emissive: 0x123bff,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity: 0.28,
      vertexColors: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const actionField = new MarchingCubes(30, actionMaterial, false, true, 10000);
    actionField.isolation = 60;
    actionField.scale.set(2.35, 1.25, 1.25);
    actionField.frustumCulled = false;
    vacuum.add(actionField);

    const slices = [
      makeSlice(THREE, 5.0, 2.9, [0, 0, 0], [0, 0, -1.46]),
      makeSlice(THREE, 2.9, 2.9, [0, Math.PI / 2, 0], [2.51, 0, 0]),
    ];
    slices.forEach(slice => vacuum.add(slice));

    const nucleus = new THREE.Group();
    nucleus.position.set(0, 0.05, 0.2);
    group.add(nucleus);
    const sphere = new THREE.SphereGeometry(0.28, 24, 16);
    const protonMaterial = new THREE.MeshPhongMaterial({ color: 0xff6dbd, emissive: 0x6b123a, emissiveIntensity: 0.35, transparent: true, opacity: 0.86 });
    const neutronMaterial = new THREE.MeshPhongMaterial({ color: 0x76dbff, emissive: 0x0b4660, emissiveIntensity: 0.3, transparent: true, opacity: 0.82 });
    const nucleonData = [
      [-0.45, 0.04, 0.02, 'p'], [0.02, 0.23, -0.08, 'n'], [0.46, -0.02, 0.08, 'p'],
      [-0.1, -0.28, 0.14, 'n'], [0.12, -0.02, 0.47, 'p'], [-0.02, 0.0, -0.46, 'n'],
      [-0.52, -0.24, -0.16, 'p'], [0.52, 0.26, -0.14, 'n'],
    ];
    const nucleons = nucleonData.map(([x, y, z, type], index) => {
      const mesh = new THREE.Mesh(sphere, type === 'p' ? protonMaterial : neutronMaterial);
      mesh.position.set(x, y, z);
      nucleus.add(mesh);
      return { mesh, type, phase: index * 0.77 };
    });

    const quarkSprites = [];
    const fluxPositions = new Float32Array(nucleons.length * 18);
    const flux = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(fluxPositions, 3).setUsage(THREE.DynamicDrawUsage)),
      new THREE.LineBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.62, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    nucleus.add(flux);
    for (const [nIndex, nucleon] of nucleons.entries()) {
      if (nucleon.type !== 'p') continue;
      for (let q = 0; q < 3; q += 1) {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: q === 0 ? 0xff3bce : 0xf6c75a, transparent: true, opacity: 0.92, depthWrite: false, blending: THREE.AdditiveBlending }));
        sprite.scale.setScalar(0.16);
        nucleus.add(sprite);
        quarkSprites.push({ sprite, nIndex, q });
      }
    }

    const forceBands = Array.from({ length: 18 }, () => {
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
        new THREE.LineBasicMaterial({ color: 0x56f0a2, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      nucleus.add(line);
      return line;
    });

    const yukawaShells = Array.from({ length: 5 }, (_, index) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.48 + index * 0.18, 32, 16),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0x14e5ff : 0x56f0a2, transparent: true, opacity: 0, depthWrite: false, wireframe: true, blending: THREE.AdditiveBlending }),
      );
      nucleus.add(shell);
      return shell;
    });

    const sMatrix = makeLabelSprite(THREE, ['S-matrix outcomes', 'elastic | inelastic | scatter'], { border: '#56f0a2', scale: [2.0, 0.46, 1] });
    sMatrix.position.set(2.2, 1.25, 0.3);
    sMatrix.material.opacity = 0;
    group.add(sMatrix);

    const fieldBlobs = Array.from({ length: 13 }, (_, index) => ({
      phase: index * 1.19,
      colour: index % 3 === 0 ? new THREE.Color('#f6c75a') : index % 3 === 1 ? new THREE.Color('#14e5ff') : new THREE.Color('#ff3bce'),
    }));
    const blobState = fieldBlobs.map(() => [0, 0, 0, 0]);
    let lastSliceUpdate = -Infinity;

    function updateField(time, pulse, style) {
      actionField.reset();
      for (const [index, blob] of fieldBlobs.entries()) {
        const pulseBias = index < 4 ? pulse * 0.06 : 0;
        const x = 0.5 + 0.36 * Math.sin(time * (0.23 + index * 0.011) + blob.phase);
        const y = 0.5 + 0.31 * Math.cos(time * (0.19 + index * 0.013) + blob.phase * 1.7);
        const z = 0.5 + 0.35 * Math.sin(time * (0.17 + index * 0.009) + blob.phase * 2.1);
        const strength = 0.18 + 0.18 * (0.5 + 0.5 * Math.sin(time * 0.7 + blob.phase)) + pulseBias;
        blobState[index][0] = x;
        blobState[index][1] = y;
        blobState[index][2] = z;
        blobState[index][3] = strength;
        actionField.addBall(x, y, z, strength, 10.5, style.falsecolour ? blob.colour : mutedFieldColours[index % mutedFieldColours.length]);
      }
      actionField.update();
    }

    function sampleAction(x, y, z) {
      let value = 0;
      for (const blob of blobState) {
        const bx = blob[0] * 2 - 1;
        const by = blob[1] * 2 - 1;
        const bz = blob[2] * 2 - 1;
        value += Math.exp(-((x - bx) ** 2 + (y - by) ** 2 + (z - bz) ** 2) / 0.13) * blob[3] * 1.7;
      }
      return value;
    }

    function redrawSlices(style) {
      const paint = (slice, toXYZ) => {
        const { canvas, context, texture } = slice.userData;
        const image = context.createImageData(canvas.width, canvas.height);
        for (let py = 0; py < canvas.height; py += 1) {
          for (let px = 0; px < canvas.width; px += 1) {
            const u = (px / (canvas.width - 1)) * 2 - 1;
            const v = 1 - (py / (canvas.height - 1)) * 2;
            const value = sampleAction(...toXYZ(u, v));
            const [r, g, b] = actionColour(value, style.falsecolour);
            const offset = (py * canvas.width + px) * 4;
            image.data[offset] = r;
            image.data[offset + 1] = g;
            image.data[offset + 2] = b;
            image.data[offset + 3] = Math.round(Math.min(1, value * 0.85) * 210);
          }
        }
        context.putImageData(image, 0, 0);
        texture.needsUpdate = true;
      };
      paint(slices[0], (u, v) => [u, v, -1]);
      paint(slices[1], (u, v) => [1, v, u]);
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'nuclear';
        group.visible = active;
        if (!active) return;
        ensureOperatorCanvasSize();
        const style = getRiceStyle(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        updateField(t, pulse, style);
        if (t - lastSliceUpdate > 0.16 || pulse > 0.03) {
          redrawSlices(style);
          lastSliceUpdate = t;
        }
        vacuum.rotation.y = style.motion ? Math.sin(t * 0.08) * 0.12 : 0;
        actionMaterial.color.set(style.falsecolour ? 0x5ff0df : 0x8c969b);
        actionMaterial.emissive.set(style.glow ? (style.falsecolour ? 0x123bff : 0x1f2528) : 0x000000);
        actionMaterial.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        actionMaterial.wireframe = !style.glow;
        actionMaterial.opacity = style.glow ? 0.22 + pulse * 0.06 : 0.48;
        grid.material.color.set(style.falsecolour ? 0x3d7bff : 0x65737c);
        grid.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        for (const slice of slices) {
          slice.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          slice.material.opacity = style.falsecolour ? 0.64 : 0.48;
        }
        protonMaterial.color.set(style.falsecolour ? 0xff6dbd : 0x9b7f83);
        neutronMaterial.color.set(style.falsecolour ? 0x76dbff : 0x8f9aa0);
        protonMaterial.emissiveIntensity = style.glow ? 0.35 : 0.08;
        neutronMaterial.emissiveIntensity = style.glow ? 0.3 : 0.08;
        flux.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        flux.material.opacity = style.glow ? 0.62 : 0.38;
        nucleus.rotation.y = style.motion ? t * 0.18 : 0;
        nucleus.rotation.x = style.motion ? Math.sin(t * 0.12) * 0.08 : 0;

        const protonQuarkPositions = [];
        for (const [index, nucleon] of nucleons.entries()) {
          const wobble = 1 + (style.motion ? 0.035 * Math.sin(t * 1.6 + nucleon.phase) : 0);
          nucleon.mesh.scale.setScalar(wobble + pulse * (index === 0 ? 0.12 : 0.02));
          if (nucleon.type === 'p') {
            const center = nucleon.mesh.position;
            const local = [];
            for (let q = 0; q < 3; q += 1) {
              const angle = (style.motion ? t * 1.9 : 0) + nucleon.phase + q * Math.PI * 2 / 3;
              local.push(new THREE.Vector3(center.x + Math.cos(angle) * 0.15, center.y + Math.sin(angle * 1.3) * 0.12, center.z + Math.sin(angle) * 0.15));
            }
            protonQuarkPositions[index] = local;
          }
        }
        for (const item of quarkSprites) {
          const position = protonQuarkPositions[item.nIndex]?.[item.q];
          if (!position) continue;
          item.sprite.position.copy(position);
          item.sprite.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          item.sprite.material.opacity = style.glow ? 0.74 + 0.18 * Math.sin(t * 3.2 + item.q) : 0.38;
        }
        let offset = 0;
        for (const local of protonQuarkPositions.filter(Boolean)) {
          for (let q = 0; q < 3; q += 1) {
            const a = local[q];
            const b = local[(q + 1) % 3];
            fluxPositions.set([a.x, a.y, a.z, b.x, b.y, b.z], offset);
            offset += 6;
          }
        }
        flux.geometry.setDrawRange(0, offset / 3);
        flux.geometry.attributes.position.needsUpdate = true;

        let band = 0;
        for (let a = 0; a < nucleons.length; a += 1) {
          for (let b = a + 1; b < nucleons.length; b += 1) {
            if (band >= forceBands.length) break;
            const distance = nucleons[a].mesh.position.distanceTo(nucleons[b].mesh.position);
            if (distance > 0.88) continue;
            const positions = forceBands[band].geometry.attributes.position;
            positions.setXYZ(0, nucleons[a].mesh.position.x, nucleons[a].mesh.position.y, nucleons[a].mesh.position.z);
            positions.setXYZ(1, nucleons[b].mesh.position.x, nucleons[b].mesh.position.y, nucleons[b].mesh.position.z);
            positions.needsUpdate = true;
            forceBands[band].visible = true;
            forceBands[band].material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
            forceBands[band].material.color.set(style.falsecolour ? 0x56f0a2 : 0x9fa8a5);
            forceBands[band].material.opacity = (style.glow ? 0.16 : 0.28) + pulse * 0.08;
            band += 1;
          }
        }
        for (; band < forceBands.length; band += 1) forceBands[band].visible = false;

        for (const [index, shell] of yukawaShells.entries()) {
          shell.visible = lens;
          shell.position.copy(nucleons[0].mesh.position);
          shell.scale.setScalar(1 + state.responseTime * (0.9 + index * 0.18) + pulse * 0.25);
          shell.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          shell.material.opacity = lens ? (style.glow ? 0.24 * Math.exp(-index * 0.7) + pulse * 0.18 * Math.exp(-index * 0.4) : 0.16 * Math.exp(-index * 0.55) + pulse * 0.08) : 0;
        }
        sMatrix.visible = lens;
        sMatrix.material.opacity = lens ? 0.72 : 0;
      },
      dispose() {
        scene.remove(group);
        disposeTree(group);
        glow.dispose();
      },
    };
  },
};

export default nuclearRenderer;
