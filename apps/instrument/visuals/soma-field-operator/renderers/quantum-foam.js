import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';
import { createContourLayer } from './lib/contours.js';
import { createGridBox, disposeTree, ensureOperatorCanvasSize, getRiceStyle, makeRadialTexture } from './lib/micro-primitives.js';

function heatColour(value, falsecolour = true) {
  const t = Math.max(0, Math.min(1, value));
  if (!falsecolour) {
    const v = Math.round(42 + t * 140);
    return [v, v + 8, v + 10];
  }
  const stops = [
    [0.0, [6, 13, 32]],
    [0.18, [34, 73, 210]],
    [0.42, [20, 229, 255]],
    [0.68, [86, 240, 162]],
    [0.88, [246, 199, 90]],
    [1.0, [255, 59, 206]],
  ];
  let lower = stops[0];
  let upper = stops[stops.length - 1];
  for (let index = 0; index < stops.length - 1; index += 1) {
    if (t >= stops[index][0] && t <= stops[index + 1][0]) {
      lower = stops[index];
      upper = stops[index + 1];
      break;
    }
  }
  const mix = (t - lower[0]) / Math.max(0.0001, upper[0] - lower[0]);
  return lower[1].map((channel, index) => Math.round(channel + (upper[1][index] - channel) * mix));
}

function makeCutPlane(THREE, width, height, rotation, position) {
  const canvas = document.createElement('canvas');
  canvas.width = 72;
  canvas.height = 72;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.78, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
  );
  mesh.rotation.set(...rotation);
  mesh.position.set(...position);
  mesh.userData.canvas = canvas;
  mesh.userData.context = canvas.getContext('2d');
  mesh.userData.texture = texture;
  return mesh;
}

export const quantumFoamRenderer = {
  id: 'quantum-foam',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const mutedFieldColours = [new THREE.Color('#8aa0a6'), new THREE.Color('#5d7478')];
    const gaussianTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.96)'],
      [0.16, 'rgba(86,240,162,0.62)'],
      [0.5, 'rgba(20,229,255,0.18)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const group = new THREE.Group();
    scene.add(group);

    const volume = new THREE.Group();
    volume.position.set(0, 0.18, -0.05);
    group.add(volume);
    const box = createGridBox(THREE, { width: 4.6, height: 2.7, depth: 2.7, divisions: 7, color: '#14e5ff', opacity: 0.16 });
    volume.add(box);

    const foamMaterial = new THREE.MeshPhongMaterial({
      color: 0x85ffd5,
      emissive: 0x0bd6cc,
      emissiveIntensity: 0.72,
      transparent: true,
      opacity: 0.4,
      shininess: 75,
      vertexColors: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const field = new MarchingCubes(34, foamMaterial, false, true, 14000);
    field.isolation = 58;
    field.scale.set(2.18, 1.22, 1.22);
    field.frustumCulled = false;
    volume.add(field);

    const cutPlanes = [
      makeCutPlane(THREE, 4.6, 2.7, [0, 0, 0], [0, 0, -1.36]),
      makeCutPlane(THREE, 2.7, 2.7, [0, Math.PI / 2, 0], [2.31, 0, 0]),
      makeCutPlane(THREE, 4.6, 2.7, [-Math.PI / 2, 0, 0], [0, -1.36, 0]),
    ];
    for (const plane of cutPlanes) volume.add(plane);

    const surfaceGeometry = new THREE.PlaneGeometry(8.2, 5.0, 34, 22);
    const surface = new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshBasicMaterial({ color: cyan, wireframe: true, transparent: true, opacity: 0.28, depthWrite: false }),
    );
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = -1.72;
    group.add(surface);

    const contours = createContourLayer(THREE, { levels: [-0.12, 0.08, 0.25, 0.43, 0.62, 0.82, 1.05] });
    surface.add(contours.object);
    const contourColumns = 99;
    const contourRows = 61;

    const threshold = new THREE.Mesh(
      new THREE.PlaneGeometry(8.2, 5.0),
      new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.DoubleSide }),
    );
    threshold.rotation.x = -Math.PI / 2;
    threshold.position.y = -0.9;
    group.add(threshold);

    const matter = Array.from({ length: 30 }, () => {
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: cyan, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      const particle = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.visible = false;
      particle.visible = false;
      group.add(halo, particle);
      return { halo, particle, active: false, bornAt: -Infinity, x: 0, z: 0, height: 0 };
    });

    const responsePaths = Array.from({ length: 26 }, (_, index) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.2, 0),
        new THREE.Vector3(Math.cos(index) * 0.8, 0.2, Math.sin(index * 1.7) * 0.55),
        new THREE.Vector3(Math.cos(index * 2.399) * 2.1, 0.55, Math.sin(index * 2.399) * 1.15),
      ]);
      const mesh = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),
        new THREE.LineBasicMaterial({ color: index % 2 ? green : cyan, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      mesh.frustumCulled = false;
      group.add(mesh);
      return mesh;
    });

    const blobs = Array.from({ length: 9 }, (_, index) => ({
      phase: index * 1.731,
      speed: 0.34 + (index % 4) * 0.055,
      radius: 0.09 + (index % 3) * 0.018,
      colour: index % 3 === 0 ? green : index % 3 === 1 ? cyan : pink,
    }));
    const previousHeights = new Float32Array(surfaceGeometry.attributes.position.count);
    let nextMatter = 0;
    let lastCutUpdate = -Infinity;

    const blobState = blobs.map(() => [0, 0, 0, 0]);
    const updateBlobState = (time, pulse) => {
      for (const [index, blob] of blobs.entries()) {
        const breath = 0.5 + 0.5 * Math.sin(time * (blob.speed * 1.9) + blob.phase * 1.31);
        blobState[index][0] = 0.5 + 0.32 * Math.sin(time * blob.speed + blob.phase);
        blobState[index][1] = 0.5 + 0.28 * Math.cos(time * (blob.speed * 1.23) + blob.phase * 0.7);
        blobState[index][2] = 0.5 + 0.32 * Math.sin(time * (blob.speed * 0.83) + blob.phase * 1.9);
        blobState[index][3] = 0.32 + blob.radius + breath * 0.15 + pulse * (index < 4 ? 0.08 : 0.02);
      }
    };

    const sampleVolume = (x, y, z) => {
      let value = 0;
      for (let index = 0; index < blobState.length; index += 1) {
        const bx = blobState[index][0] * 2 - 1;
        const by = blobState[index][1] * 2 - 1;
        const bz = blobState[index][2] * 2 - 1;
        const strength = blobState[index][3];
        const distance2 = (x - bx) ** 2 + (y - by) ** 2 + (z - bz) ** 2;
        value += Math.exp(-distance2 / (0.11 + strength * 0.05)) * strength;
      }
      return value;
    };

    function redrawCutPlanes(style) {
      const draw = (plane, toXYZ) => {
        const { canvas, context, texture } = plane.userData;
        const image = context.createImageData(canvas.width, canvas.height);
        for (let py = 0; py < canvas.height; py += 1) {
          for (let px = 0; px < canvas.width; px += 1) {
            const u = (px / (canvas.width - 1)) * 2 - 1;
            const v = 1 - (py / (canvas.height - 1)) * 2;
            const value = sampleVolume(...toXYZ(u, v));
            const [r, g, b] = heatColour(value * 1.7, style.falsecolour);
            const contour = Math.abs((value * 8) % 1 - 0.5) < 0.045;
            const offset = (py * canvas.width + px) * 4;
            image.data[offset] = r;
            image.data[offset + 1] = g;
            image.data[offset + 2] = b;
            image.data[offset + 3] = Math.round(Math.min(1, value * 0.85 + (contour ? 0.28 : 0)) * 210);
          }
        }
        context.putImageData(image, 0, 0);
        texture.needsUpdate = true;
      };
      draw(cutPlanes[0], (u, v) => [u, v, -1]);
      draw(cutPlanes[1], (u, v) => [1, v, u]);
      draw(cutPlanes[2], (u, v) => [u, -1, v]);
    }

    const heightAt = (x, z, time, pulse) => {
      let height = Math.sin(x * 2.2 + time * 2.2) * 0.11 + Math.cos(z * 2.7 - time * 1.6) * 0.09;
      for (let index = 0; index < 4; index += 1) {
        const spikeX = Math.sin(time * (0.14 + index * 0.025) + index * 4.7) * 3.2;
        const spikeZ = Math.cos(time * (0.18 + index * 0.018) + index * 2.9) * 1.9;
        const amplitude = 0.78 + 0.28 * Math.sin(time * 0.72 + index * 1.9) + pulse * 0.55;
        height += Math.exp(-((x - spikeX) ** 2 + (z - spikeZ) ** 2) / 0.12) * amplitude;
      }
      return height;
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'quantum-foam';
        group.visible = active;
        if (!active) return;
        ensureOperatorCanvasSize();
        const style = getRiceStyle(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        updateBlobState(t, pulse);
        field.reset();
        for (const [index, blob] of blobs.entries()) {
          field.addBall(blobState[index][0], blobState[index][1], blobState[index][2], blobState[index][3], 11.8, style.falsecolour ? blob.colour : mutedFieldColours[index % mutedFieldColours.length]);
        }
        field.addPlaneY(0.025 + pulse * 0.02, 12);
        field.update();
        foamMaterial.color.set(style.falsecolour ? 0x85ffd5 : 0x8fa0a0);
        foamMaterial.emissive.set(style.glow ? (style.falsecolour ? 0x0bd6cc : 0x1f2b2c) : 0x000000);
        foamMaterial.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        foamMaterial.wireframe = !style.glow;
        foamMaterial.opacity = style.glow ? (lens ? 0.46 : 0.36) : 0.62;
        foamMaterial.emissiveIntensity = style.glow ? 0.62 + pulse * 0.36 : 0;
        box.material.color.set(style.falsecolour ? 0x14e5ff : 0x6f7c82);
        box.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        for (const plane of cutPlanes) {
          plane.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          plane.material.opacity = style.falsecolour ? 0.78 : 0.48;
        }
        volume.rotation.y = style.motion ? Math.sin(t * 0.11) * 0.18 : 0;
        volume.rotation.x = style.motion ? Math.sin(t * 0.09) * 0.05 : 0;
        box.material.opacity = 0.13 + pulse * 0.06;
        if (t - lastCutUpdate > 0.12 || pulse > 0.03) {
          redrawCutPlanes(style);
          lastCutUpdate = t;
        }

        const surfacePositions = surfaceGeometry.attributes.position;
        for (let index = 0; index < surfacePositions.count; index += 1) {
          const x = surfacePositions.getX(index);
          const z = surfacePositions.getY(index);
          const height = heightAt(x, z, t, pulse);
          surfacePositions.setZ(index, height);
          if (previousHeights[index] < 0.82 && height >= 0.82) {
            const item = matter[nextMatter++ % matter.length];
            item.active = true;
            item.bornAt = time;
            item.x = x;
            item.z = z;
            item.height = height;
          }
          previousHeights[index] = height;
        }
        surfacePositions.needsUpdate = true;
        contours.update({
          columns: contourColumns,
          rows: contourRows,
          height: (col, row) => heightAt(-4.1 + (col * 8.2) / (contourColumns - 1), 2.5 - (row * 5.0) / (contourRows - 1), t, pulse),
          x: col => -4.1 + (col * 8.2) / (contourColumns - 1),
          y: row => 2.5 - (row * 5.0) / (contourRows - 1),
          visible: Boolean(state.contours),
        });
        contours.setOpacity(state.contours ? 0.92 : 0);
        surface.material.opacity = state.contours ? 0.14 : 0.23;
        threshold.material.opacity = 0.045 + pulse * 0.06;
        for (const item of matter) {
          const age = time - item.bornAt;
          const alive = item.active && age < 10;
          item.halo.visible = alive;
          item.particle.visible = alive;
          if (!alive) continue;
          const persistence = Math.max(0, 1 - age / 10);
          item.halo.position.set(item.x, -1.72 + item.height, item.z);
          item.particle.position.copy(item.halo.position);
          item.halo.scale.setScalar(0.46 + persistence * 0.22 + pulse * 0.08);
          item.particle.scale.setScalar(0.12 + persistence * 0.08);
          item.halo.material.opacity = style.glow ? persistence * 0.34 : 0;
          item.particle.material.opacity = style.glow ? persistence * 0.78 : 0;
        }
        for (const [index, path] of responsePaths.entries()) {
          path.visible = lens;
          path.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          path.material.color.set(style.falsecolour ? (index % 2 ? green : cyan) : 0x9aa8aa);
          path.material.opacity = lens ? (style.glow ? (0.11 + pulse * 0.34) * (0.55 + 0.45 * Math.sin(t * 0.9 + index)) : 0.18 + pulse * 0.16) : 0;
          path.rotation.y = style.motion ? t * (0.03 + index * 0.002) : 0;
        }
      },
      dispose() {
        contours.dispose();
        gaussianTexture.dispose();
        scene.remove(group);
        disposeTree(group);
      },
    };
  },
};

export default quantumFoamRenderer;
