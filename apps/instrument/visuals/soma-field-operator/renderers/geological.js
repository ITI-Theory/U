import { createContourLayer } from './lib/contours.js';
import { PALETTE, createArcLine, createPolyline, disposeObject, makeGlowSprite, makeRadialTexture, setContourStyle, setGlowBlending, setMaterialColor, styleFlags } from './lib/planetary-helpers.js';

function makeArrow(THREE, color) {
  const group = new THREE.Group();
  const shaft = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.035, 0.035),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.82 }),
  );
  const head = new THREE.Mesh(
    new THREE.ConeGeometry(0.095, 0.24, 3),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.92 }),
  );
  head.rotation.z = -Math.PI / 2;
  head.position.x = 0.46;
  group.add(shaft, head);
  return group;
}

function makeStrataTexture(THREE, color, accent, index) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const context = canvas.getContext('2d');
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalAlpha = 0.34;
  context.strokeStyle = accent;
  context.lineWidth = 2;
  for (let y = 10; y < 96; y += 14) {
    context.beginPath();
    for (let x = 0; x <= 256; x += 8) {
      const yy = y + Math.sin(x * 0.055 + index * 1.7) * 3 + Math.sin(x * 0.17 + y) * 1.4;
      if (x === 0) context.moveTo(x, yy);
      else context.lineTo(x, yy);
    }
    context.stroke();
  }
  context.globalAlpha = 0.18;
  for (let i = 0; i < 80; i += 1) {
    context.fillStyle = i % 2 ? '#ffffff' : '#000000';
    context.fillRect((i * 53) % 256, (i * 29 + index * 7) % 96, 2 + (i % 4), 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.5, 1);
  return texture;
}

export const geologicalRenderer = {
  id: 'geological',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const ambient = new THREE.AmbientLight('#30313a', 1.1);
    const keyLight = new THREE.DirectionalLight('#fff0c4', 2.4);
    keyLight.position.set(-2.2, 3.2, 3.8);
    group.add(ambient, keyLight);

    const glowTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.95)'],
      [0.2, 'rgba(246,199,90,0.65)'],
      [0.62, 'rgba(255,59,206,0.2)'],
      [1, 'rgba(255,59,206,0)'],
    ]);

    const block = new THREE.Group();
    block.position.set(0, -0.28, 0);
    block.rotation.x = -0.42;
    block.rotation.y = 0.42;
    block.rotation.z = 0.02;
    group.add(block);

    const strata = [
      { y: 0.95, h: 0.38, color: '#24306e', sober: '#404552', shift: -0.18 },
      { y: 0.55, h: 0.32, color: '#7b4bb0', sober: '#5a505f', shift: 0.08 },
      { y: 0.18, h: 0.36, color: '#d99a55', sober: '#7b674d', shift: -0.04 },
      { y: -0.25, h: 0.42, color: '#4d8f77', sober: '#526a5d', shift: 0.16 },
      { y: -0.75, h: 0.52, color: '#b24b42', sober: '#71524c', shift: -0.12 },
      { y: -1.32, h: 0.48, color: '#2c638f', sober: '#3f5968', shift: 0.04 },
    ];
    const strataMeshes = strata.map((layer, index) => {
      const texture = makeStrataTexture(THREE, layer.color, index % 2 ? '#f6c75a' : '#dff9ff', index);
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(5.9, layer.h, 1.15),
        new THREE.MeshLambertMaterial({ map: texture, color: layer.color, transparent: true, opacity: 0.92 }),
      );
      mesh.position.set(layer.shift, layer.y, 0);
      block.add(mesh);
      if (index > 0) {
        const contact = createPolyline(THREE, Array.from({ length: 80 }, (_, point) => {
          const x = -2.95 + point * 5.9 / 79;
          return new THREE.Vector3(x, layer.y + layer.h * 0.5 + 0.035 * Math.sin(x * 3 + index), 0.65);
        }), { color: '#dff9ff', opacity: 0.23 });
        block.add(contact);
      }
      return mesh;
    });

    const topCap = new THREE.Mesh(
      new THREE.BoxGeometry(5.95, 0.04, 1.2),
      new THREE.MeshLambertMaterial({ color: '#53645b', transparent: true, opacity: 0.62 }),
    );
    topCap.position.set(0, 1.18, 0);
    block.add(topCap);

    const fault = new THREE.Mesh(
      new THREE.PlaneGeometry(6.2, 0.08),
      new THREE.MeshBasicMaterial({ color: PALETTE.gold, transparent: true, opacity: 0.62, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    fault.rotation.z = 0.52;
    fault.position.set(0.02, -0.08, 0.64);
    block.add(fault);

    const hangingWall = createPolyline(THREE, [
      new THREE.Vector3(-2.8, 0.98, 0.68),
      new THREE.Vector3(-1.2, 0.84, 0.68),
      new THREE.Vector3(2.4, -1.12, 0.68),
      new THREE.Vector3(2.8, -0.72, 0.68),
      new THREE.Vector3(-0.7, 1.22, 0.68),
      new THREE.Vector3(-2.8, 0.98, 0.68),
    ], { color: '#f6c75a', opacity: 0.5, blending: THREE.AdditiveBlending });
    block.add(hangingWall);

    const arrows = [];
    for (let i = 0; i < 7; i += 1) {
      const top = makeArrow(THREE, PALETTE.cyan);
      const bottom = makeArrow(THREE, PALETTE.pink);
      top.position.set(-3 + i, 1.58, -0.35);
      bottom.position.set(3 - i, -1.82, -0.35);
      bottom.rotation.z = Math.PI;
      block.add(top, bottom);
      arrows.push({ arrow: top, direction: 1, offset: i }, { arrow: bottom, direction: -1, offset: i });
    }

    const slipPatch = makeGlowSprite(THREE, glowTexture, { color: PALETTE.gold, opacity: 0.9, scale: 0.38 });
    slipPatch.position.set(-0.95, 0.06, 0.72);
    block.add(slipPatch);

    const pWave = createArcLine(THREE, { radiusX: 0.45, radiusY: 0.32, color: PALETTE.cyan, opacity: 0.72, z: 0.02 });
    const sWave = createArcLine(THREE, { radiusX: 0.55, radiusY: 0.4, color: PALETTE.pink, opacity: 0.62, z: 0.03 });
    pWave.position.copy(slipPatch.position);
    sWave.position.copy(slipPatch.position);
    block.add(pWave, sWave);

    const stress = new THREE.Group();
    const stressBands = [];
    for (let i = 0; i < 9; i += 1) {
      const band = createPolyline(THREE, Array.from({ length: 96 }, (_, point) => {
        const x = -2.9 + point * 5.8 / 95;
        const y = 0.42 * x - 0.13 + (i - 4) * 0.18 + 0.08 * Math.sin(x * 2.8 + i);
        return new THREE.Vector3(x, y, 0.76);
      }), { color: i % 2 ? PALETTE.green : PALETTE.cyan, opacity: 0.36, blending: THREE.AdditiveBlending });
      stress.add(band);
      stressBands.push(band);
    }
    block.add(stress);

    const contourPlane = new THREE.Object3D();
    contourPlane.position.set(0, 0, 0.79);
    block.add(contourPlane);
    const contours = createContourLayer(THREE, { levels: [-0.6, -0.35, -0.12, 0.12, 0.35, 0.6, 0.85], opacity: 0.82 });
    contourPlane.add(contours.object);

    const seismogram = createPolyline(THREE, Array.from({ length: 120 }, (_, index) => {
      const x = -0.95 + index * 1.9 / 119;
      const y = Math.sin(index * 0.55) * Math.exp(-index / 68) * 0.16;
      return new THREE.Vector3(x, y, 0.82);
    }), { color: PALETTE.green, opacity: 0.78, blending: THREE.AdditiveBlending });
    seismogram.position.set(1.82, 1.62, 0);
    seismogram.scale.set(0.72, 0.72, 1);
    block.add(seismogram);

    const columns = 79;
    const rows = 43;
    const stressHeight = (col, row, time, pulse) => {
      const x = -2.9 + col * 5.8 / (columns - 1);
      const y = 1.5 - row * 3 / (rows - 1);
      const faultDistance = Math.abs(y - (0.42 * x - 0.13));
      const ring = Math.hypot(x + 0.95, y - 0.06);
      return Math.exp(-faultDistance * 4.5) * 0.8
        + Math.sin((x + y) * 2.6 + time * 0.8) * 0.1
        + pulse * Math.exp(-((ring - 0.4 - 2.1 * (pulse > 0 ? 1 - pulse : 0.3)) ** 2) / 0.05);
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'geological';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const lensOn = Boolean(state.tTheory && state.level >= 8);
        const styleTime = motionOn ? time : 0;
        for (const [index, mesh] of strataMeshes.entries()) {
          setMaterialColor(mesh.material, falsecolourOn ? strata[index].color : strata[index].sober);
          const shear = (motionOn ? Math.sin(time * 0.18) : 0) * 0.09;
          mesh.position.x = strata[index].shift + shear * (index < 3 ? 1 : -1);
        }
        setMaterialColor(topCap.material, falsecolourOn ? '#53645b' : '#6d6d62');
        setGlowBlending(THREE, fault.material, glowOn);
        setGlowBlending(THREE, hangingWall.material, glowOn);
        setGlowBlending(THREE, pWave.material, glowOn);
        setGlowBlending(THREE, sWave.material, glowOn);
        setGlowBlending(THREE, seismogram.material, glowOn);
        for (const band of stressBands) setGlowBlending(THREE, band.material, glowOn);
        setMaterialColor(fault.material, falsecolourOn ? PALETTE.gold : '#c9b07a');
        setMaterialColor(hangingWall.material, falsecolourOn ? PALETTE.gold : '#b9aa89');
        setMaterialColor(pWave.material, falsecolourOn ? PALETTE.cyan : '#9fc4d2');
        setMaterialColor(sWave.material, falsecolourOn ? PALETTE.pink : '#c49cae');
        setMaterialColor(seismogram.material, falsecolourOn ? PALETTE.green : '#b4c8b8');
        for (const item of arrows) {
          item.arrow.traverse(part => {
            if (part.material) {
              setMaterialColor(part.material, falsecolourOn ? (item.direction > 0 ? PALETTE.cyan : PALETTE.pink) : '#b6bec6');
            }
          });
        }
        for (const item of arrows) {
          item.arrow.position.x = motionOn ? ((item.offset + time * 0.24 * item.direction + 3) % 6) - 3 : -3 + item.offset;
        }
        const wavePhase = state.responseTime || (motionOn ? 0.5 + 0.5 * Math.sin(time * 0.45) : 0.42);
        const pRadius = 0.42 + wavePhase * 2.3 + pulse * 0.8;
        const sRadius = 0.26 + wavePhase * 1.55 + pulse * 0.45;
        pWave.scale.set(pRadius, pRadius, 1);
        sWave.scale.set(sRadius, sRadius, 1);
        pWave.material.opacity = (glowOn ? 0.16 : 0.34) + pulse * 0.58;
        sWave.material.opacity = (glowOn ? 0.12 : 0.3) + pulse * 0.45;
        slipPatch.visible = glowOn;
        slipPatch.material.opacity = glowOn ? 0.58 + pulse * 0.35 + (motionOn ? 0.08 * Math.sin(time * 3.2) : 0) : 0;
        stress.visible = lensOn;
        contourPlane.visible = lensOn || state.contours;
        for (const [index, band] of stressBands.entries()) {
          setMaterialColor(band.material, falsecolourOn ? (index % 2 ? PALETTE.green : PALETTE.cyan) : '#c3c8c2');
          band.material.opacity = lensOn ? 0.22 + (motionOn ? 0.16 * Math.sin(time * 0.8 + index) ** 2 : 0.08) : 0;
        }
        contours.update({
          columns,
          rows,
          height: (col, row) => stressHeight(col, row, styleTime, pulse),
          x: col => -2.9 + col * 5.8 / (columns - 1),
          y: row => 1.5 - row * 3 / (rows - 1),
          lift: 0.02,
          visible: lensOn || state.contours,
        });
        setContourStyle(contours, falsecolourOn, '#b8b4a8');
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
      },
    };
  },
};

export default geologicalRenderer;
