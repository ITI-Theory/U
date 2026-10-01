import {
  disposeGroup,
  makeGlowTexture,
  makeLabelTexture,
  makeLine,
  makeTube,
  setMaterialGlow,
} from './lib/neural-shared.js';

function makeHemisphereGeometry(THREE, side) {
  const rows = 28;
  const columns = 34;
  const positions = [];
  const uvs = [];
  const indices = [];
  const rx = 1.08;
  const ry = 1.22;
  const rz = 0.86;
  for (let row = 0; row <= rows; row += 1) {
    const theta = row / rows * Math.PI;
    for (let column = 0; column <= columns; column += 1) {
      const phi = -Math.PI / 2 + column / columns * Math.PI;
      const banding = 1
        + 0.045 * Math.sin(theta * 16.0 + phi * 5.5)
        + 0.03 * Math.sin(phi * 18.0 - theta * 3.5)
        + 0.022 * Math.cos((theta + phi) * 11.0);
      const sinTheta = Math.sin(theta);
      const x = side * (0.075 + Math.cos(phi) * sinTheta * rx * banding);
      const y = Math.cos(theta) * ry * (1 + 0.02 * Math.sin(phi * 9));
      const z = Math.sin(phi) * sinTheta * rz * banding;
      positions.push(x, y, z);
      uvs.push(column / columns, row / rows);
    }
  }
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const a = row * (columns + 1) + column;
      const b = a + 1;
      const c = a + columns + 1;
      const d = c + 1;
      if (side > 0) indices.push(a, c, b, b, c, d);
      else indices.push(a, b, c, b, d, c);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function brainSurfacePoint(THREE, side, theta, phi, inflate = 1) {
  const banding = 1 + 0.035 * Math.sin(theta * 16 + phi * 5.5) + 0.02 * Math.sin(phi * 18 - theta * 3.5);
  const sinTheta = Math.sin(theta);
  return new THREE.Vector3(
    side * (0.075 + Math.cos(phi) * sinTheta * 1.08 * banding * inflate),
    Math.cos(theta) * 1.22 * inflate,
    Math.sin(phi) * sinTheta * 0.86 * banding * inflate,
  );
}

function makeEllipseLine(THREE, rx, ry, z, material, segments = 128) {
  const points = [];
  for (let step = 0; step <= segments; step += 1) {
    const a = step / segments * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, z));
  }
  const line = makeLine(THREE, points, material);
  line.computeLineDistances?.();
  return line;
}

export const wholeBrainRenderer = {
  id: 'whole-brain',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const green = new THREE.Color('#56f0a2');
    const blue = new THREE.Color('#3d7bff');
    const red = new THREE.Color('#ff3b6f');
    const gold = new THREE.Color('#f6c75a');
    const violet = new THREE.Color('#8f47ff');
    const naturalBrain = new THREE.Color('#9fb7bd');
    const mutedBrain = new THREE.Color('#8fa0a5');
    const mutedTract = new THREE.Color('#d0d8d6');
    const mutedField = new THREE.Color('#8a9692');
    const mutedSensor = new THREE.Color('#cfd7d7');
    const mutedBlood = new THREE.Color('#8a5f63');
    const group = new THREE.Group();
    group.name = 'whole-brain-renderer';
    group.position.set(0, 0.18, 0);
    group.scale.setScalar(1.06);
    scene.add(group);

    const glowTexture = makeGlowTexture(THREE, 'rgba(255,255,255,0.98)', 'rgba(20,229,255,0.56)', 'rgba(20,229,255,0)');
    const hubTexture = makeGlowTexture(THREE, 'rgba(255,255,255,0.98)', 'rgba(255,59,206,0.72)', 'rgba(255,59,206,0)');

    const brainMaterial = new THREE.MeshBasicMaterial({
      color: 0x5ed8ff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const leftBrain = new THREE.Mesh(makeHemisphereGeometry(THREE, -1), brainMaterial.clone());
    const rightBrain = new THREE.Mesh(makeHemisphereGeometry(THREE, 1), brainMaterial.clone());
    group.add(leftBrain, rightBrain);

    const cortexWireMaterial = new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending });
    const gyri = new THREE.Group();
    for (const side of [-1, 1]) {
      for (let stripe = 0; stripe < 13; stripe += 1) {
        const points = [];
        const theta = 0.34 + stripe * 0.18;
        for (let step = 0; step < 56; step += 1) {
          const t = step / 55;
          const phi = -1.08 + t * 2.16;
          points.push(brainSurfacePoint(THREE, side, theta + Math.sin(t * Math.PI * 5 + stripe) * 0.025, phi, 1.012));
        }
        gyri.add(makeLine(THREE, points, cortexWireMaterial));
      }
      for (let fold = 0; fold < 7; fold += 1) {
        const points = [];
        const phi = -0.92 + fold * 0.3;
        for (let step = 0; step < 52; step += 1) {
          const theta = 0.38 + step / 51 * 2.22;
          points.push(brainSurfacePoint(THREE, side, theta, phi + Math.sin(theta * 7 + fold) * 0.02, 1.014));
        }
        gyri.add(makeLine(THREE, points, cortexWireMaterial));
      }
    }
    group.add(gyri);

    const tractGroup = new THREE.Group();
    const tractMaterials = {
      lr: new THREE.MeshBasicMaterial({ color: red, transparent: true, opacity: 0.66, depthWrite: false, blending: THREE.AdditiveBlending }),
      ap: new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }),
      si: new THREE.MeshBasicMaterial({ color: blue, transparent: true, opacity: 0.64, depthWrite: false, blending: THREE.AdditiveBlending }),
    };
    const tracts = [];
    for (let index = 0; index < 7; index += 1) {
      const y = -0.62 + index * 0.19;
      const z = -0.4 + (index % 3) * 0.34;
      const points = [
        new THREE.Vector3(-1.02, y, z),
        new THREE.Vector3(-0.42, y + 0.18 * Math.sin(index), z * 0.28),
        new THREE.Vector3(0.42, y - 0.16 * Math.cos(index * 0.7), -z * 0.22),
        new THREE.Vector3(1.02, y + 0.04, -z),
      ];
      const tube = makeTube(THREE, points, 0.018, tractMaterials.lr, 72, 5);
      tube.userData.phase = index * 0.7;
      tractGroup.add(tube);
      tracts.push(tube);
    }
    for (let index = 0; index < 7; index += 1) {
      const x = -0.72 + index * 0.24;
      const points = [
        new THREE.Vector3(x, -1.0, -0.36),
        new THREE.Vector3(x * 0.7, -0.28, 0.18 + Math.sin(index) * 0.14),
        new THREE.Vector3(x * 0.5, 0.88, 0.34),
      ];
      const tube = makeTube(THREE, points, 0.015, tractMaterials.si, 62, 5);
      tube.userData.phase = index * 0.9 + 2.1;
      tractGroup.add(tube);
      tracts.push(tube);
    }
    for (let index = 0; index < 8; index += 1) {
      const side = index % 2 ? -1 : 1;
      const x = side * (0.34 + (index % 4) * 0.19);
      const points = [
        new THREE.Vector3(x, -0.82, -0.62),
        new THREE.Vector3(x + side * 0.12, -0.12, -0.18),
        new THREE.Vector3(x - side * 0.08, 0.72, 0.58),
      ];
      const tube = makeTube(THREE, points, 0.014, tractMaterials.ap, 58, 5);
      tube.userData.phase = index * 0.8 + 4.6;
      tractGroup.add(tube);
      tracts.push(tube);
    }
    group.add(tractGroup);

    const nucleiMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
    const nuclei = new THREE.Group();
    for (const [x, y, z, sx, sy, sz] of [
      [-0.38, -0.22, 0.08, 0.22, 0.13, 0.18], [0.38, -0.22, 0.08, 0.22, 0.13, 0.18],
      [-0.24, -0.5, -0.2, 0.17, 0.1, 0.13], [0.24, -0.5, -0.2, 0.17, 0.1, 0.13],
    ]) {
      const nucleus = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), nucleiMaterial);
      nucleus.position.set(x, y, z);
      nucleus.scale.set(sx, sy, sz);
      nuclei.add(nucleus);
    }
    group.add(nuclei);

    const sensorGroup = new THREE.Group();
    const sensorMaterial = new THREE.MeshBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending });
    const sensorGeometry = new THREE.SphereGeometry(0.035, 10, 8);
    const sensorLocations = [
      [-0.74, 1.05, 0.18], [-0.28, 1.17, 0.34], [0.28, 1.17, 0.34], [0.74, 1.05, 0.18],
      [-1.06, 0.4, 0.58], [1.06, 0.4, 0.58], [-0.92, -0.24, 0.7], [0.92, -0.24, 0.7],
      [-0.44, 0.62, -0.78], [0.44, 0.62, -0.78],
    ];
    for (const position of sensorLocations) {
      const electrode = new THREE.Mesh(sensorGeometry, sensorMaterial);
      electrode.position.set(...position);
      sensorGroup.add(electrode);
    }
    const coilMaterial = new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending });
    for (let coil = 0; coil < 7; coil += 1) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.006, 6, 36), coilMaterial);
      ring.position.set(-1.55 + coil * 0.52, 1.38 + Math.sin(coil) * 0.04, 0.18);
      ring.rotation.x = Math.PI / 2;
      sensorGroup.add(ring);
    }
    group.add(sensorGroup);

    const vesselMaterial = new THREE.LineBasicMaterial({ color: red, transparent: true, opacity: 0.18, depthWrite: false, blending: THREE.AdditiveBlending });
    const vessels = new THREE.Group();
    for (const side of [-1, 1]) {
      for (let branch = 0; branch < 4; branch += 1) {
        const points = [];
        for (let step = 0; step < 34; step += 1) {
          const t = step / 33;
          const y = -1.0 + t * 1.88;
          const x = side * (0.22 + branch * 0.17 + Math.sin(t * 7 + branch) * 0.04);
          const z = 0.72 - branch * 0.1 + Math.cos(t * 8 + branch) * 0.035;
          points.push(new THREE.Vector3(x, y, z));
        }
        vessels.add(makeLine(THREE, points, vesselMaterial));
      }
    }
    group.add(vessels);

    const eegMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.0, depthWrite: false, blending: THREE.AdditiveBlending });
    const eegWaves = [];
    for (let band = 0; band < 7; band += 1) {
      const line = makeEllipseLine(THREE, 0.62 + band * 0.13, 0.2 + band * 0.028, 0.62 - band * 0.09, eegMaterial.clone(), 96);
      line.position.y = 0.08 + band * 0.11;
      line.rotation.x = 0.58 + band * 0.05;
      line.userData.phase = band * 0.71;
      group.add(line);
      eegWaves.push(line);
    }

    const fieldGroup = new THREE.Group();
    group.add(fieldGroup);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: 0x56f0a2,
      transparent: true,
      opacity: 0,
      wireframe: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1.45, 48, 26), shellMaterial);
    shell.scale.set(1.42, 1.18, 0.92);
    fieldGroup.add(shell);
    const outerShell = new THREE.Mesh(new THREE.SphereGeometry(1.72, 48, 26), shellMaterial.clone());
    outerShell.scale.set(1.38, 1.16, 0.92);
    fieldGroup.add(outerShell);

    const dashedMaterial = new THREE.LineDashedMaterial({ color: gold, dashSize: 0.08, gapSize: 0.055, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const boundaryRings = [
      makeEllipseLine(THREE, 2.2, 1.48, 0, dashedMaterial.clone(), 160),
      makeEllipseLine(THREE, 1.62, 1.18, 0, dashedMaterial.clone(), 160),
    ];
    boundaryRings[0].rotation.x = Math.PI / 2;
    boundaryRings[1].rotation.y = Math.PI / 2;
    for (const ring of boundaryRings) fieldGroup.add(ring);

    const fieldLineMaterial = new THREE.LineBasicMaterial({ color: violet, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const fieldLines = [];
    for (let lineIndex = 0; lineIndex < 16; lineIndex += 1) {
      const points = [];
      const phase = lineIndex / 16 * Math.PI * 2;
      for (let step = 0; step < 64; step += 1) {
        const t = step / 63;
        const a = phase + (t - 0.5) * 2.35;
        const y = -1.45 + t * 2.9;
        const radius = 1.55 + Math.sin(t * Math.PI) * 0.38;
        points.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius * 0.65));
      }
      const line = makeLine(THREE, points, fieldLineMaterial.clone());
      line.userData.phase = phase;
      fieldGroup.add(line);
      fieldLines.push(line);
    }

    const hubGroup = new THREE.Group();
    const hubPositions = [
      [-0.62, 0.72, 0.54, 'posterior hub'], [0.62, 0.72, 0.54, 'posterior hub'],
      [-0.72, -0.24, 0.66, 'temporal hub'], [0.72, -0.24, 0.66, 'temporal hub'],
      [0, 0.96, -0.28, 'medial hub'], [0, -0.68, 0.08, 'subcortical hub'],
    ];
    const hubs = hubPositions.map(([x, y, z], index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: hubTexture,
        color: index % 2 ? cyan : gold,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      sprite.position.set(x, y, z);
      sprite.scale.setScalar(0.18);
      hubGroup.add(sprite);
      return sprite;
    });
    const hubMeshMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false });
    const hubMeshes = hubPositions.map(([x, y, z], index) => {
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), hubMeshMaterial.clone());
      hub.material.color.copy(index % 2 ? cyan : gold);
      hub.position.set(x, y, z);
      hubGroup.add(hub);
      return hub;
    });
    const hubLineMaterial = new THREE.LineBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    for (let index = 0; index < hubPositions.length; index += 1) {
      const next = (index + 2) % hubPositions.length;
      hubGroup.add(makeLine(THREE, [
        new THREE.Vector3(...hubPositions[index].slice(0, 3)),
        new THREE.Vector3(...hubPositions[next].slice(0, 3)),
      ], hubLineMaterial));
    }
    fieldGroup.add(hubGroup);

    const cemiLabelTexture = makeLabelTexture(THREE, {
      title: 'CEMI HYPOTHESIS LAYER',
      subtitle: 'brain EM field shell / Green-function contours',
      footer: 'visual label only: no claim that the shell is mind',
      accent: '#f6c75a',
      width: 1040,
      height: 220,
    });
    const cemiLabel = new THREE.Sprite(new THREE.SpriteMaterial({ map: cemiLabelTexture, transparent: true, opacity: 0, depthWrite: false }));
    cemiLabel.position.set(0, 2.12, 0.3);
    cemiLabel.scale.set(3.1, 0.66, 1);
    fieldGroup.add(cemiLabel);

    const responseMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const responseRing = new THREE.Mesh(new THREE.TorusGeometry(1, 0.014, 8, 112), responseMaterial);
    responseRing.position.set(-1.12, 0.08, 0.82);
    responseRing.rotation.x = 0.36;
    group.add(responseRing);
    const responseHalo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      color: gold,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    responseHalo.position.copy(responseRing.position);
    responseHalo.scale.setScalar(0.28);
    group.add(responseHalo);

    const scaleBarMaterial = new THREE.LineBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: 0.68 });
    group.add(makeLine(THREE, [new THREE.Vector3(-2.08, -1.65, 0.78), new THREE.Vector3(-0.98, -1.65, 0.78)], scaleBarMaterial));
    const scaleLabelTexture = makeLabelTexture(THREE, { title: '10 cm', accent: '#eaf5ff', width: 300, height: 110 });
    const scaleLabel = new THREE.Sprite(new THREE.SpriteMaterial({ map: scaleLabelTexture, transparent: true, opacity: 0.72, depthWrite: false }));
    scaleLabel.position.set(-1.52, -1.88, 0.78);
    scaleLabel.scale.set(0.66, 0.25, 1);
    group.add(scaleLabel);

    const styleMaterials = [
      leftBrain.material,
      rightBrain.material,
      cortexWireMaterial,
      tractMaterials.lr,
      tractMaterials.ap,
      tractMaterials.si,
      nucleiMaterial,
      sensorMaterial,
      coilMaterial,
      vesselMaterial,
      ...eegWaves.map(wave => wave.material),
      shell.material,
      outerShell.material,
      ...boundaryRings.map(ring => ring.material),
      ...fieldLines.map(line => line.material),
      ...hubs.map(hub => hub.material),
      ...hubMeshes.map(hub => hub.material),
      hubLineMaterial,
      cemiLabel.material,
      responseRing.material,
      responseHalo.material,
    ];
    function applyStyle(style) {
      const falsecolourOn = style.falsecolour !== false;
      const glowOn = style.glow !== false;
      for (const material of styleMaterials) setMaterialGlow(THREE, material, glowOn);
      leftBrain.material.color.copy(falsecolourOn ? cyan : naturalBrain);
      rightBrain.material.color.copy(falsecolourOn ? cyan : naturalBrain);
      cortexWireMaterial.color.copy(falsecolourOn ? cyan : mutedBrain);
      tractMaterials.lr.color.copy(falsecolourOn ? red : mutedTract);
      tractMaterials.ap.color.copy(falsecolourOn ? green : mutedTract);
      tractMaterials.si.color.copy(falsecolourOn ? blue : mutedTract);
      nucleiMaterial.color.copy(falsecolourOn ? gold : mutedBrain);
      sensorMaterial.color.set(falsecolourOn ? 0xeaf5ff : mutedSensor);
      coilMaterial.color.copy(falsecolourOn ? cyan : mutedSensor);
      vesselMaterial.color.copy(falsecolourOn ? red : mutedBlood);
      shell.material.color.copy(falsecolourOn ? green : mutedField);
      outerShell.material.color.copy(falsecolourOn ? green : mutedField);
      for (const ring of boundaryRings) ring.material.color.copy(falsecolourOn ? gold : mutedField);
      for (const line of fieldLines) line.material.color.copy(falsecolourOn ? violet : mutedField);
      hubLineMaterial.color.set(falsecolourOn ? 0xff3bce : mutedField);
      responseRing.material.color.copy(falsecolourOn ? gold : mutedField);
      responseHalo.material.color.copy(falsecolourOn ? gold : mutedField);
      for (const [index, hub] of hubs.entries()) {
        hub.material.color.copy(falsecolourOn ? (index % 2 ? cyan : gold) : mutedField);
        hub.visible = glowOn;
      }
      for (const [index, hub] of hubMeshes.entries()) hub.material.color.copy(falsecolourOn ? (index % 2 ? cyan : gold) : mutedField);
      responseHalo.visible = glowOn;
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'whole-brain';
        group.visible = active;
        if (!active) return;
        const style = {
          fluorescence: true,
          falsecolour: true,
          glow: true,
          motion: true,
          ...(state.style ?? {}),
        };
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const allPlain = style.fluorescence === false && !falsecolourOn && !glowOn && !motionOn;
        const fieldOn = Boolean(state.tTheory && state.level >= 8);
        applyStyle(style);
        const breath = 1 + (motionOn ? Math.sin(time * 0.46) * 0.01 : 0) + pulse * 0.006;
        group.scale.setScalar(1.06 * breath);
        group.rotation.y = motionOn ? Math.sin(time * 0.1) * 0.08 : 0;
        group.rotation.x = motionOn ? Math.sin(time * 0.073) * 0.018 : 0;
        leftBrain.material.opacity = allPlain ? 0.1 : fieldOn ? 0.18 : 0.24;
        rightBrain.material.opacity = allPlain ? 0.1 : fieldOn ? 0.18 : 0.24;
        cortexWireMaterial.opacity = allPlain ? 0.34 : fieldOn ? 0.14 : 0.22;
        for (const tract of tracts) {
          tract.material.opacity = allPlain ? 0.52 : (fieldOn ? 0.46 : 0.66) + (motionOn ? Math.sin(time * 1.2 + tract.userData.phase) * 0.08 : 0);
        }
        for (const wave of eegWaves) {
          const rhythm = motionOn ? 0.5 + 0.5 * Math.sin(time * 2.6 + wave.userData.phase) : 0.58;
          wave.material.opacity = (allPlain ? 0.18 : fieldOn ? 0.14 : 0.24) * rhythm + pulse * 0.08;
          wave.scale.setScalar(1 + rhythm * 0.035 + pulse * 0.04);
        }
        const responseRadius = 0.12 + state.responseTime * 2.15;
        responseRing.scale.setScalar(responseRadius);
        responseRing.material.opacity = pulse * (fieldOn ? 0.82 : 0.58);
        responseHalo.material.opacity = glowOn ? pulse * 0.8 : 0;
        responseHalo.scale.setScalar(0.36 + responseRadius * 0.38);
        fieldGroup.visible = fieldOn;
        shell.material.opacity = fieldOn ? (allPlain ? 0.18 : 0.12 + pulse * 0.05) : 0;
        outerShell.material.opacity = fieldOn ? (allPlain ? 0.12 : 0.07 + pulse * 0.05) : 0;
        shell.rotation.y = motionOn ? time * 0.065 : 0;
        outerShell.rotation.y = motionOn ? -time * 0.045 : 0;
        for (const [index, ring] of boundaryRings.entries()) {
          ring.material.opacity = fieldOn ? (allPlain ? 0.28 : 0.26 + pulse * 0.14 + (motionOn ? Math.sin(time * 1.1 + index) * 0.04 : 0)) : 0;
          ring.rotation.z = motionOn ? time * (index ? -0.055 : 0.04) : 0;
        }
        for (const line of fieldLines) {
          const filament = motionOn ? Math.sin(time * 0.8 + line.userData.phase) ** 2 : 0.45;
          line.material.opacity = fieldOn ? (allPlain ? 0.22 : 0.18 + 0.16 * filament + pulse * 0.08) : 0;
        }
        for (const [index, hub] of hubs.entries()) {
          const mode = motionOn ? 0.5 + 0.5 * Math.sin(time * (0.9 + index * 0.04) + index * 1.7) : 0.62;
          hub.material.opacity = fieldOn && glowOn ? 0.52 + mode * 0.42 + pulse * 0.16 : 0;
          hub.scale.setScalar(0.2 + mode * 0.1 + pulse * 0.06);
        }
        for (const [index, hub] of hubMeshes.entries()) {
          const mode = motionOn ? 0.5 + 0.5 * Math.sin(time * (0.9 + index * 0.04) + index * 1.7) : 0.62;
          hub.visible = fieldOn;
          hub.material.opacity = fieldOn ? (glowOn ? 0.18 : 0.74) + pulse * 0.08 : 0;
          hub.scale.setScalar(1 + mode * 0.18 + pulse * 0.16);
        }
        hubLineMaterial.opacity = fieldOn ? (allPlain ? 0.32 : 0.24 + pulse * 0.16) : 0;
        cemiLabel.material.opacity = fieldOn ? (allPlain ? 0.5 : 0.64 + (motionOn ? 0.08 * Math.sin(time * 1.4) : 0)) : 0;
        sensorGroup.visible = !fieldOn || state.level < 11;
        vesselMaterial.opacity = fieldOn ? 0.1 : 0.18;
        nucleiMaterial.opacity = allPlain ? 0.3 : fieldOn ? 0.36 : 0.5;
      },
      dispose() {
        scene.remove(group);
        disposeGroup(group);
      },
    };
  },
};

export default wholeBrainRenderer;
