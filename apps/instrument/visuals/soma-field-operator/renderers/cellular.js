function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function makeGlowTexture(THREE, inner, outer) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,0.96)');
  gradient.addColorStop(0.18, inner);
  gradient.addColorStop(1, outer);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeDeformedSphereGeometry(THREE, radius, phase = 0) {
  const geometry = new THREE.SphereGeometry(radius, 42, 28);
  const position = geometry.attributes.position;
  const directions = new Float32Array(position.count * 3);
  const factors = new Float32Array(position.count);
  const bumps = [
    { c: new THREE.Vector3(0.82, 0.25, 0.51).normalize(), a: 0.13, k: 5.6 },
    { c: new THREE.Vector3(-0.38, 0.86, -0.34).normalize(), a: 0.1, k: 7.2 },
    { c: new THREE.Vector3(-0.72, -0.18, 0.67).normalize(), a: 0.08, k: 6.5 },
    { c: new THREE.Vector3(0.16, -0.92, -0.36).normalize(), a: 0.075, k: 8.2 },
  ];
  for (let index = 0; index < position.count; index += 1) {
    const direction = new THREE.Vector3(position.getX(index), position.getY(index), position.getZ(index)).normalize();
    let factor = 1
      + 0.035 * Math.sin(direction.x * 3.1 + phase)
      + 0.028 * Math.cos(direction.y * 4.3 - phase * 0.7)
      + 0.02 * Math.sin((direction.x + direction.z) * 5.2 + phase * 1.3);
    for (const bump of bumps) factor += bump.a * Math.exp(bump.k * (direction.dot(bump.c) - 1));
    const offset = index * 3;
    directions[offset] = direction.x;
    directions[offset + 1] = direction.y;
    directions[offset + 2] = direction.z;
    factors[index] = factor;
    position.setXYZ(index, direction.x * radius * factor, direction.y * radius * factor, direction.z * radius * factor);
  }
  position.setUsage(THREE.DynamicDrawUsage);
  geometry.userData.radius = radius;
  geometry.userData.directions = directions;
  geometry.userData.factors = factors;
  geometry.computeVertexNormals();
  return geometry;
}

function animateDeformedSphere(THREE, geometry, time, pulse, fieldOn, motionOn = true) {
  const { radius, directions, factors } = geometry.userData;
  const position = geometry.attributes.position;
  for (let index = 0; index < position.count; index += 1) {
    const offset = index * 3;
    const x = directions[offset];
    const y = directions[offset + 1];
    const z = directions[offset + 2];
    const voltage = fieldOn ? 0.024 * Math.sin(8.5 * x + 4.3 * y - (motionOn ? time * 4.8 : 0)) : 0;
    const breathing = (motionOn ? 0.012 * Math.sin(time * 1.15 + x * 3.2 + z * 4.1) : 0) + pulse * 0.018;
    const r = radius * (factors[index] + breathing + voltage);
    position.setXYZ(index, x * r, y * r, z * r);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

function makeTube(THREE, points, radius, material, segments = 48) {
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, 8, false),
    material,
  );
}

function makeLine(THREE, points, material) {
  return new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), material);
}

function pointOnCurve(points, t) {
  const scaled = clamp01(t) * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return points[index].clone().lerp(points[index + 1], local);
}

export const cellularRenderer = {
  id: 'cellular',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const dapiBlue = new THREE.Color('#3d7bff');
    const mitoOrange = new THREE.Color('#ff7040');
    const cytoplasmFluoro = new THREE.Color(0x062133);
    const nucleolusFluoro = new THREE.Color(0x8eb2ff);
    const ribosomeFluoro = new THREE.Color(0xeaf5ff);
    const neutralCytoplasm = new THREE.Color('#152226');
    const neutralMembrane = new THREE.Color('#86a3a6');
    const neutralNucleus = new THREE.Color('#697b9a');
    const neutralActin = new THREE.Color('#8fa38e');
    const neutralMito = new THREE.Color('#a36e57');
    const neutralOrganelle = new THREE.Color('#8aa0a2');
    const mutedField = new THREE.Color('#91a8a0');
    const mutedSignal = new THREE.Color('#c0ad78');
    const group = new THREE.Group();
    group.name = 'cellular-renderer';
    group.position.set(-0.35, -0.02, 0);
    group.scale.setScalar(0.86);
    scene.add(group);

    const glowTexture = makeGlowTexture(THREE, 'rgba(20,229,255,0.62)', 'rgba(20,229,255,0)');
    const vesicleTexture = makeGlowTexture(THREE, 'rgba(246,199,90,0.72)', 'rgba(255,59,206,0)');
    const tempObject = new THREE.Object3D();

    const cytoplasmMaterial = new THREE.MeshBasicMaterial({
      color: 0x062133,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const membraneMaterial = new THREE.MeshBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.24,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const membraneWireMaterial = new THREE.MeshBasicMaterial({
      color: cyan,
      wireframe: true,
      transparent: true,
      opacity: 0.09,
      depthWrite: false,
    });
    const nucleusMaterial = new THREE.MeshBasicMaterial({
      color: dapiBlue,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const nucleolusMaterial = new THREE.MeshBasicMaterial({ color: 0x8eb2ff, transparent: true, opacity: 0.86, depthWrite: false, blending: THREE.AdditiveBlending });
    const erMaterial = new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending });
    const ribosomeMaterial = new THREE.MeshBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: 0.75, depthWrite: false, blending: THREE.AdditiveBlending });
    const golgiMaterial = new THREE.MeshBasicMaterial({ color: pink, transparent: true, opacity: 0.78, depthWrite: false, blending: THREE.AdditiveBlending });
    const mitochondriaMaterial = new THREE.MeshBasicMaterial({ color: mitoOrange, transparent: true, opacity: 0.92, depthWrite: false, blending: THREE.AdditiveBlending });
    const cristaeMaterial = new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.82, blending: THREE.AdditiveBlending });
    const cytoskeletonMaterial = new THREE.LineBasicMaterial({ color: green, transparent: true, opacity: 0.52, blending: THREE.AdditiveBlending });
    const neuriteMaterial = new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.54, depthWrite: false });
    const synapseMaterial = new THREE.MeshBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0.58, depthWrite: false });
    const fieldMaterial = new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const lineFieldMaterial = new THREE.LineBasicMaterial({ color: green, transparent: true, opacity: 0, depthWrite: false });

    const soma = new THREE.Group();
    soma.position.set(-1.22, 0.02, 0);
    group.add(soma);

    const somaRadius = 1.02;
    const cytoplasmGeometry = makeDeformedSphereGeometry(THREE, somaRadius, 0.2);
    const cytoplasm = new THREE.Mesh(cytoplasmGeometry, cytoplasmMaterial);
    soma.add(cytoplasm);
    const membraneShell = new THREE.Mesh(makeDeformedSphereGeometry(THREE, somaRadius * 1.055, 1.1), membraneMaterial);
    soma.add(membraneShell);
    const membraneWire = new THREE.Mesh(new THREE.SphereGeometry(somaRadius * 1.015, 32, 18), membraneWireMaterial);
    soma.add(membraneWire);

    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(0.33, 24, 16), nucleusMaterial);
    nucleus.position.set(0.18, 0.08, 0.16);
    soma.add(nucleus);
    const nucleusEnvelope = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 16),
      new THREE.MeshBasicMaterial({ color: dapiBlue, transparent: true, opacity: 0.34, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    nucleusEnvelope.position.copy(nucleus.position);
    soma.add(nucleusEnvelope);
    const nucleusGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      color: dapiBlue,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    nucleusGlow.position.copy(nucleus.position);
    nucleusGlow.scale.set(1.05, 1.05, 1);
    soma.add(nucleusGlow);
    const cytoplasmGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      color: cyan,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    cytoplasmGlow.scale.set(2.4, 2.4, 1);
    soma.add(cytoplasmGlow);
    const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 10), nucleolusMaterial);
    nucleolus.position.set(0.27, 0.15, 0.2);
    soma.add(nucleolus);

    const erCurves = [];
    for (let ribbon = 0; ribbon < 5; ribbon += 1) {
      const points = [];
      for (let step = 0; step < 48; step += 1) {
        const a = step / 47 * Math.PI * 2;
        const r = 0.49 + ribbon * 0.065 + Math.sin(a * 3 + ribbon) * 0.035;
        points.push(new THREE.Vector3(
          nucleus.position.x + Math.cos(a) * r,
          nucleus.position.y + Math.sin(a * 1.7 + ribbon) * 0.18 + (ribbon - 2) * 0.055,
          nucleus.position.z + Math.sin(a) * r * 0.62,
        ));
      }
      const er = makeTube(THREE, points, 0.018 + ribbon * 0.002, erMaterial, 72);
      soma.add(er);
      erCurves.push(points);
    }

    const ribosomeGeometry = new THREE.IcosahedronGeometry(0.018, 0);
    const ribosomes = new THREE.InstancedMesh(ribosomeGeometry, ribosomeMaterial, 120);
    for (let index = 0; index < 120; index += 1) {
      const curve = erCurves[index % erCurves.length];
      const p = curve[Math.floor((index * 7) % curve.length)];
      tempObject.position.set(
        p.x + (Math.sin(index * 12.989) - 0.5) * 0.045,
        p.y + (Math.cos(index * 4.77) - 0.5) * 0.045,
        p.z + (Math.sin(index * 2.31) - 0.5) * 0.045,
      );
      tempObject.scale.setScalar(0.75 + (index % 5) * 0.08);
      tempObject.updateMatrix();
      ribosomes.setMatrixAt(index, tempObject.matrix);
    }
    soma.add(ribosomes);

    const golgi = new THREE.Group();
    golgi.position.set(0.02, -0.48, 0.34);
    soma.add(golgi);
    for (let stack = 0; stack < 6; stack += 1) {
      const points = [];
      for (let step = 0; step < 22; step += 1) {
        const a = -1.35 + step / 21 * 2.7;
        points.push(new THREE.Vector3(Math.cos(a) * (0.34 + stack * 0.015), stack * 0.048, Math.sin(a) * 0.1));
      }
      const disc = makeTube(THREE, points, 0.018, golgiMaterial, 36);
      disc.rotation.z = -0.22;
      golgi.add(disc);
    }

    const mitochondria = [];
    const mitoData = [
      [-0.48, 0.54, 0.26, 0.4],
      [-0.5, -0.38, -0.18, -0.8],
      [0.52, 0.42, -0.24, 0.9],
      [0.43, -0.28, 0.22, -0.25],
      [-0.05, 0.68, -0.36, 1.35],
    ];
    for (const [index, [x, y, z, angle]] of mitoData.entries()) {
      const mito = new THREE.Mesh(new THREE.CapsuleGeometry(0.065, 0.34, 5, 10), mitochondriaMaterial);
      mito.position.set(x, y, z);
      mito.rotation.set(Math.PI / 2, 0.35, angle);
      soma.add(mito);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: vesicleTexture,
        color: mitoOrange,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      halo.position.copy(mito.position);
      halo.scale.set(0.48, 0.24, 1);
      soma.add(halo);
      const cristae = [];
      for (let line = 0; line < 4; line += 1) {
        const localX = -0.13 + line * 0.085;
        const wave = [
          new THREE.Vector3(localX, -0.048, 0.07),
          new THREE.Vector3(localX + 0.03, 0.045, 0.072),
          new THREE.Vector3(localX + 0.06, -0.038, 0.074),
        ];
        const c = makeLine(THREE, wave, cristaeMaterial);
        c.position.copy(mito.position);
        c.rotation.copy(mito.rotation);
        soma.add(c);
        cristae.push(c);
      }
      mitochondria.push({
        mito,
        halo,
        cristae,
        phase: index * 0.83,
        basePosition: mito.position.clone(),
        baseRotation: mito.rotation.clone(),
      });
    }

    const vesicleGeometry = new THREE.SphereGeometry(0.045, 10, 8);
    const vesicleMaterial = new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0.78, depthWrite: false, blending: THREE.AdditiveBlending });
    const vesicles = new THREE.InstancedMesh(vesicleGeometry, vesicleMaterial, 36);
    const vesicleSeeds = Array.from({ length: 36 }, (_, index) => ({
      radius: 0.28 + (index % 9) * 0.065,
      angle: index * 2.399963,
      z: -0.18 + (index % 7) * 0.06,
      speed: 0.22 + (index % 5) * 0.04,
      scale: 0.72 + (index % 4) * 0.13,
    }));
    soma.add(vesicles);

    const channelGeometry = new THREE.BoxGeometry(0.028, 0.078, 0.028);
    const channelMaterial = new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.86, depthWrite: false, blending: THREE.AdditiveBlending });
    const channels = new THREE.InstancedMesh(channelGeometry, channelMaterial, 34);
    for (let index = 0; index < 34; index += 1) {
      const y = -0.78 + (index % 9) * 0.18;
      const a = index * 2.399963;
      const ring = Math.sqrt(Math.max(0.08, 1 - (y / somaRadius) ** 2));
      const dir = new THREE.Vector3(Math.cos(a) * ring, y / somaRadius, Math.sin(a) * ring).normalize();
      tempObject.position.copy(dir).multiplyScalar(somaRadius * 1.06);
      tempObject.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      tempObject.scale.setScalar(0.85 + (index % 3) * 0.18);
      tempObject.updateMatrix();
      channels.setMatrixAt(index, tempObject.matrix);
    }
    soma.add(channels);

    const cytoskeleton = new THREE.Group();
    for (let filament = 0; filament < 18; filament += 1) {
      const points = [];
      const base = filament * 2.399963;
      for (let step = 0; step < 5; step += 1) {
        const a = base + step * 0.54;
        const r = 0.18 + step * 0.16;
        points.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a * 1.4) * 0.38, Math.sin(a) * r * 0.72));
      }
      cytoskeleton.add(makeLine(THREE, points, cytoskeletonMaterial));
    }
    soma.add(cytoskeleton);

    const centrioles = new THREE.Group();
    centrioles.position.set(-0.16, 0.0, -0.44);
    soma.add(centrioles);
    for (const offset of [-0.055, 0.055]) {
      const centriole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.34, 10, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.74, wireframe: true }),
      );
      centriole.position.x = offset;
      centriole.rotation.set(Math.PI / 2, offset > 0 ? 0.65 : -0.18, Math.PI / 2);
      centrioles.add(centriole);
    }

    const dendritePoints = [
      [new THREE.Vector3(-2.02, 0.4, 0), new THREE.Vector3(-2.75, 0.86, 0.18), new THREE.Vector3(-3.62, 1.18, -0.05)],
      [new THREE.Vector3(-2.0, -0.18, 0.03), new THREE.Vector3(-2.72, -0.55, -0.15), new THREE.Vector3(-3.42, -1.08, 0.16)],
      [new THREE.Vector3(-1.46, 0.92, -0.04), new THREE.Vector3(-1.88, 1.62, 0.12), new THREE.Vector3(-2.46, 2.2, -0.08)],
    ];
    for (const [branchIndex, points] of dendritePoints.entries()) {
      const dendrite = makeTube(THREE, points, 0.055 - branchIndex * 0.006, neuriteMaterial, 46);
      group.add(dendrite);
      const tip = points[points.length - 1];
      for (const side of [-1, 1]) {
        group.add(makeTube(THREE, [
          points[1],
          new THREE.Vector3((points[1].x + tip.x) / 2 + side * 0.12, (points[1].y + tip.y) / 2 + side * 0.24, points[1].z + side * 0.18),
          new THREE.Vector3(tip.x + side * 0.44, tip.y + side * 0.24, tip.z + side * 0.12),
        ], 0.026, neuriteMaterial, 28));
      }
    }

    const axonPoints = [
      new THREE.Vector3(-0.32, -0.16, 0.03),
      new THREE.Vector3(0.55, -0.34, 0.1),
      new THREE.Vector3(1.34, -0.32, -0.08),
      new THREE.Vector3(2.12, -0.16, 0.04),
      new THREE.Vector3(2.55, -0.12, 0.0),
    ];
    const axon = makeTube(THREE, axonPoints, 0.052, neuriteMaterial, 82);
    group.add(axon);
    const bouton = new THREE.Mesh(makeDeformedSphereGeometry(THREE, 0.24, 2.3), synapseMaterial);
    bouton.position.set(2.78, -0.1, 0);
    group.add(bouton);

    const postCell = new THREE.Group();
    postCell.position.set(3.88, -0.08, 0.02);
    group.add(postCell);
    const postMembrane = new THREE.Mesh(
      makeDeformedSphereGeometry(THREE, 0.82, 3.1),
      new THREE.MeshBasicMaterial({ color: 0x14e5ff, transparent: true, opacity: 0.17, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    postMembrane.scale.set(0.9, 1.05, 0.75);
    postCell.add(postMembrane);
    const postDensity = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.018, 8, 48),
      new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.2, depthWrite: false }),
    );
    postDensity.rotation.y = Math.PI / 2;
    postDensity.position.x = -0.62;
    postCell.add(postDensity);

    const cleftLines = [];
    for (let index = 0; index < 6; index += 1) {
      const y = -0.31 + index * 0.082;
      const line = makeLine(THREE, [new THREE.Vector3(2.98, y, -0.18), new THREE.Vector3(3.22, y + 0.02 * Math.sin(index), 0.18)], lineFieldMaterial);
      group.add(line);
      cleftLines.push(line);
    }

    const synapticVesicles = Array.from({ length: 15 }, (_, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: vesicleTexture,
        color: index % 2 ? gold : pink,
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      group.add(sprite);
      return sprite;
    });
    const transmitters = Array.from({ length: 24 }, (_, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: index % 3 ? green : gold,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      sprite.visible = false;
      group.add(sprite);
      return sprite;
    });

    const potentialRings = [];
    for (let index = 0; index < 7; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.52 + index * 0.075, 0.009, 8, 96),
        new THREE.MeshBasicMaterial({ color: index % 2 ? green : pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.rotation.set(index * 0.67, Math.PI / 2 + index * 0.31, index * 0.43);
      ring.userData.baseRotation = ring.rotation.clone();
      soma.add(ring);
      potentialRings.push(ring);
    }

    const actionBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.16, 0.026, 10, 48),
      new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    actionBand.rotation.y = Math.PI / 2;
    group.add(actionBand);
    const actionCore = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    group.add(actionCore);

    const fieldShells = [
      new THREE.Mesh(new THREE.SphereGeometry(1.36, 40, 24), fieldMaterial.clone()),
      new THREE.Mesh(new THREE.SphereGeometry(1.74, 40, 24), fieldMaterial.clone()),
    ];
    for (const [index, shell] of fieldShells.entries()) {
      shell.position.copy(soma.position);
      shell.material.side = THREE.BackSide;
      shell.material.wireframe = index === 1;
      group.add(shell);
    }

    const fieldLines = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(12 * 6), 3)),
      new THREE.LineBasicMaterial({ color: pink, transparent: true, opacity: 0, depthWrite: false }),
    );
    group.add(fieldLines);

    function setBlending(material, glowOn) {
      const next = glowOn ? THREE.AdditiveBlending : THREE.NormalBlending;
      if (material.blending !== next) {
        material.blending = next;
        material.needsUpdate = true;
      }
    }

    function applyStyle(style, fieldOn) {
      const fluorescenceOn = style.fluorescence !== false;
      const glowOn = style.glow !== false;
      const falsecolourOn = style.falsecolour !== false;
      const additiveMaterials = [
        cytoplasmMaterial, membraneMaterial, nucleusMaterial, nucleolusMaterial, erMaterial,
        ribosomeMaterial, golgiMaterial, mitochondriaMaterial, cristaeMaterial, cytoskeletonMaterial,
        vesicleMaterial, channelMaterial, neuriteMaterial, synapseMaterial, lineFieldMaterial,
        fieldLines.material, postMembrane.material, postDensity.material, nucleusEnvelope.material,
      ];
      for (const material of additiveMaterials) setBlending(material, glowOn);
      for (const shell of fieldShells) setBlending(shell.material, glowOn);
      for (const ring of potentialRings) setBlending(ring.material, glowOn);
      for (const sprite of [nucleusGlow, cytoplasmGlow, actionCore, ...synapticVesicles, ...transmitters]) setBlending(sprite.material, glowOn);
      for (const item of mitochondria) setBlending(item.halo.material, glowOn);

      cytoplasmMaterial.color.copy(fluorescenceOn ? cytoplasmFluoro : neutralCytoplasm);
      membraneMaterial.color.copy(fluorescenceOn ? cyan : neutralMembrane);
      membraneWireMaterial.color.copy(fluorescenceOn ? cyan : neutralMembrane);
      nucleusMaterial.color.copy(fluorescenceOn ? dapiBlue : neutralNucleus);
      nucleusEnvelope.material.color.copy(fluorescenceOn ? dapiBlue : neutralNucleus);
      nucleusGlow.material.color.copy(fluorescenceOn ? dapiBlue : neutralNucleus);
      cytoplasmGlow.material.color.copy(fluorescenceOn ? cyan : neutralMembrane);
      nucleolusMaterial.color.copy(fluorescenceOn ? nucleolusFluoro : mutedSignal);
      erMaterial.color.copy(fluorescenceOn ? cyan : neutralOrganelle);
      ribosomeMaterial.color.copy(fluorescenceOn ? ribosomeFluoro : neutralOrganelle);
      golgiMaterial.color.copy(fluorescenceOn ? pink : neutralOrganelle);
      mitochondriaMaterial.color.copy(fluorescenceOn ? mitoOrange : neutralMito);
      cristaeMaterial.color.copy(fluorescenceOn ? gold : mutedSignal);
      cytoskeletonMaterial.color.copy(fluorescenceOn ? green : neutralActin);
      vesicleMaterial.color.copy(fluorescenceOn ? gold : mutedSignal);
      channelMaterial.color.copy(fluorescenceOn ? green : neutralActin);
      neuriteMaterial.color.copy(fluorescenceOn ? cyan : neutralMembrane);
      synapseMaterial.color.copy(fluorescenceOn ? pink : neutralOrganelle);
      postMembrane.material.color.copy(fluorescenceOn ? cyan : neutralMembrane);
      postDensity.material.color.copy(fluorescenceOn ? green : neutralActin);
      lineFieldMaterial.color.copy(falsecolourOn ? green : mutedField);
      fieldLines.material.color.copy(falsecolourOn ? pink : mutedField);
      for (const shell of fieldShells) shell.material.color.copy(falsecolourOn ? green : mutedField);
      for (const item of mitochondria) item.halo.material.color.copy(fluorescenceOn ? mitoOrange : neutralMito);
      for (const [index, sprite] of synapticVesicles.entries()) sprite.material.color.copy(fluorescenceOn ? (index % 2 ? gold : pink) : mutedSignal);
      for (const [index, sprite] of transmitters.entries()) sprite.material.color.copy(falsecolourOn ? (index % 3 ? green : gold) : mutedSignal);

      nucleusGlow.visible = glowOn;
      cytoplasmGlow.visible = glowOn;
      for (const item of mitochondria) item.halo.visible = glowOn;
      if (!fieldOn) fieldLines.material.opacity = 0;
    }

    function updateVesicles(time, pulse, motionOn) {
      for (const [index, seed] of vesicleSeeds.entries()) {
        const angle = seed.angle + (motionOn ? time * seed.speed * 0.62 : 0);
        const wobble = motionOn ? Math.sin(time * 0.45 + index) * 0.028 : 0;
        tempObject.position.set(
          Math.cos(angle) * seed.radius * 0.74 + wobble,
          Math.sin(angle * 1.4 + (motionOn ? time * 0.12 : 0)) * seed.radius * 0.55,
          seed.z + Math.sin(angle) * 0.12,
        );
        tempObject.scale.setScalar(seed.scale * (1 + pulse * 0.25));
        tempObject.updateMatrix();
        vesicles.setMatrixAt(index, tempObject.matrix);
      }
      vesicles.instanceMatrix.needsUpdate = true;
    }

    function updateSynapse(time, fieldOn, pulse, responseTime, style) {
      const motionOn = style.motion !== false;
      const glowOn = style.glow !== false;
      const fluorescenceOn = style.fluorescence !== false;
      for (const [index, sprite] of synapticVesicles.entries()) {
        sprite.visible = glowOn || fluorescenceOn;
        const angle = index * 2.399963 + (motionOn ? time * 0.45 : 0);
        sprite.position.set(2.72 + Math.cos(angle) * 0.12, -0.1 + Math.sin(angle * 1.3) * 0.11, Math.sin(angle) * 0.12);
        sprite.scale.setScalar(0.09 + (index % 3) * 0.012);
        sprite.material.opacity = glowOn ? 0.44 + pulse * 0.35 : fluorescenceOn ? 0.24 + pulse * 0.16 : 0.12 + pulse * 0.1;
      }
      const release = fieldOn ? pulse * Math.sin(Math.PI * responseTime) : 0;
      for (const [index, sprite] of transmitters.entries()) {
        const stagger = (index % 8) / 8;
        const progress = clamp01((responseTime - stagger * 0.16) / 0.5);
        const active = glowOn && release > 0.02 && progress > 0 && progress < 1;
        sprite.visible = active;
        if (!active) continue;
        const y = -0.26 + (index % 6) * 0.075 + (motionOn ? Math.sin(time * 6 + index) * 0.018 : 0);
        sprite.position.set(2.94 + progress * 0.36, y, -0.15 + ((index * 37) % 9) * 0.037);
        sprite.scale.setScalar(0.055 + release * 0.06);
        sprite.material.opacity = release * (1 - Math.abs(progress - 0.5) * 1.1);
      }
      for (const [index, line] of cleftLines.entries()) {
        line.material.opacity = 0.16 + (fieldOn ? release * 0.45 : 0);
        line.material.color.copy(fieldOn && release > 0.2 ? gold : (style.falsecolour === false ? mutedField : green));
        line.geometry.attributes.position.needsUpdate = true;
        line.position.z = motionOn ? Math.sin(time * 1.4 + index) * 0.02 : 0;
      }
    }

    function updateFieldLines(time, level11, pulse, motionOn) {
      const positions = fieldLines.geometry.attributes.position.array;
      for (let index = 0; index < 12; index += 1) {
        const a = index / 12 * Math.PI * 2 + (motionOn ? time * 0.18 : 0);
        const y = Math.sin(a * 2.1) * 0.72;
        const z = Math.cos(a) * 0.42;
        const offset = index * 6;
        positions[offset] = -0.72 + Math.cos(a) * 0.55;
        positions[offset + 1] = y;
        positions[offset + 2] = z;
        positions[offset + 3] = 3.35 + Math.cos(a + 0.8) * 0.42;
        positions[offset + 4] = y * 0.75 - 0.07;
        positions[offset + 5] = z * 0.8;
      }
      fieldLines.geometry.attributes.position.needsUpdate = true;
      fieldLines.material.opacity = level11 ? 0.15 + pulse * 0.32 : 0;
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state?.rendererId === 'cellular' && state.viewMode !== '2d';
        group.visible = active;
        if (!active) return;

        const responseTime = clamp01(state.responseTime ?? 0);
        const fieldOn = Boolean(state.tTheory && state.level >= 8);
        const level11 = Boolean(state.tTheory && state.level >= 11);
        const dynamic = state.dimensionDynamics?.kind === 'cellular-synaptic' ? state.dimensionDynamics : null;
        const softenedPulse = clamp01(Math.max(pulse, dynamic?.spikePulse ?? 0, dynamic?.transitionPulse ?? 0));
        const style = {
          fluorescence: true,
          falsecolour: true,
          glow: true,
          motion: true,
          ...(state.style ?? {}),
        };
        const fluorescenceOn = style.fluorescence !== false;
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const allPlain = !fluorescenceOn && !falsecolourOn && !glowOn && !motionOn;
        const motionTime = motionOn ? time : 0;
        applyStyle(style, fieldOn);

        group.rotation.y = motionOn ? Math.sin(time * 0.16) * 0.1 : 0;
        group.rotation.x = motionOn ? Math.sin(time * 0.13) * 0.035 : 0;
        const lifePulse = motionOn ? Math.sin(time * Math.PI * 0.4) : 0;
        soma.scale.setScalar(1 + lifePulse * 0.02 + softenedPulse * 0.035);
        animateDeformedSphere(THREE, cytoplasmGeometry, motionTime, softenedPulse, fieldOn, motionOn);
        animateDeformedSphere(THREE, membraneShell.geometry, motionTime + 0.4, softenedPulse * 0.6, fieldOn, motionOn);
        cytoplasmMaterial.opacity = allPlain ? 0.035 + softenedPulse * 0.03 : (fieldOn ? 0.2 : 0.13) + lifePulse * 0.025 + softenedPulse * 0.08;
        membraneMaterial.opacity = allPlain ? 0.045 + softenedPulse * 0.04 : (fieldOn ? 0.25 : 0.18) + lifePulse * 0.025 + softenedPulse * 0.08;
        membraneWire.material.opacity = allPlain ? 0.36 : fieldOn ? 0.05 : 0.16;
        channelMaterial.opacity = allPlain ? 0.44 : 0.62 + (fieldOn ? 0.15 + softenedPulse * 0.2 : 0);

        nucleus.rotation.y = motionOn ? time * 0.1 : 0;
        nucleus.scale.setScalar(1 + (motionOn ? Math.sin(time * 1.1) * 0.025 : 0) + softenedPulse * 0.04);
        nucleusMaterial.opacity = allPlain ? 0.2 : fluorescenceOn ? 0.86 : 0.42;
        nucleusEnvelope.material.opacity = allPlain ? 0.22 : fluorescenceOn ? 0.34 : 0.24;
        nucleusGlow.material.opacity = glowOn ? 0.24 + Math.max(0, lifePulse) * 0.08 + softenedPulse * 0.08 : 0;
        nucleusGlow.scale.setScalar(1.02 + Math.max(0, lifePulse) * 0.08 + softenedPulse * 0.08);
        cytoplasmGlow.material.opacity = glowOn ? (fieldOn ? 0.16 : 0.11) + Math.max(0, lifePulse) * 0.04 + softenedPulse * 0.08 : 0;
        nucleolus.scale.setScalar(1 + (motionOn ? Math.sin(time * 1.7) * 0.05 : 0));
        nucleolusMaterial.opacity = allPlain ? 0.28 : 0.86;
        cytoskeleton.rotation.y = motionOn ? time * 0.025 : 0;
        cytoskeletonMaterial.opacity = allPlain ? 0.58 : fluorescenceOn ? 0.52 : 0.4;
        centrioles.rotation.z = motionOn ? time * 0.34 : 0;
        updateVesicles(motionTime, softenedPulse, motionOn);

        for (const [index, item] of mitochondria.entries()) {
          item.mito.position.copy(item.basePosition);
          item.mito.position.x += motionOn ? Math.sin(time * 0.63 + item.phase) * 0.015 : 0;
          item.mito.position.y += motionOn ? Math.sin(time * 0.82 + item.phase) * 0.018 : 0;
          item.mito.position.z += motionOn ? Math.cos(time * 0.58 + item.phase) * 0.012 : 0;
          item.mito.rotation.copy(item.baseRotation);
          item.mito.rotation.z += motionOn ? Math.sin(time * 0.74 + index) * 0.055 : 0;
          item.mito.material.opacity = allPlain ? 0.42 : fluorescenceOn ? 0.92 : 0.62;
          item.halo.position.copy(item.mito.position);
          item.halo.scale.set(0.48 + softenedPulse * 0.1, 0.24 + softenedPulse * 0.05, 1);
          item.halo.material.opacity = glowOn ? 0.16 + (motionOn ? Math.max(0, Math.sin(time * 0.9 + item.phase)) * 0.06 : 0) + softenedPulse * 0.08 : 0;
          for (const line of item.cristae) {
            line.position.copy(item.mito.position);
            line.rotation.copy(item.mito.rotation);
          }
        }

        for (const [index, ring] of potentialRings.entries()) {
          ring.visible = fieldOn;
          if (motionOn) ring.rotation.z += 0.002 + index * 0.0006;
          else ring.rotation.copy(ring.userData.baseRotation);
          ring.material.opacity = fieldOn ? (glowOn ? 0.14 : 0.08) + softenedPulse * 0.18 + (motionOn ? 0.12 * Math.max(0, Math.sin(time * 3.1 - index * 0.7)) : 0) : 0;
          ring.material.color.copy(falsecolourOn ? (index % 2 ? green : cyan) : mutedField).lerp(falsecolourOn ? pink : mutedSignal, motionOn ? clamp01(0.5 + 0.5 * Math.sin(time * 2.4 + index)) : 0.35);
          ring.scale.setScalar(1 + (motionOn ? Math.sin(time * 1.7 + index) * 0.025 : 0) + softenedPulse * 0.04);
        }

        const activePulse = fieldOn && (softenedPulse > 0.01 || (dynamic?.voltage ?? 0) > (dynamic?.threshold ?? 1));
        actionBand.visible = activePulse;
        actionCore.visible = activePulse;
        if (activePulse) {
          const pathPosition = pointOnCurve(axonPoints, responseTime);
          actionBand.position.copy(pathPosition);
          actionCore.position.copy(pathPosition);
          actionBand.scale.setScalar(0.7 + softenedPulse * 1.1);
          actionCore.scale.setScalar(0.38 + softenedPulse * 0.48);
          actionBand.material.opacity = softenedPulse * 0.92;
          actionBand.material.color.copy(falsecolourOn ? gold : mutedSignal);
          actionCore.material.opacity = glowOn ? softenedPulse * 0.72 : 0;
        } else {
          actionBand.material.opacity = 0;
          actionCore.material.opacity = 0;
        }

        updateSynapse(time, fieldOn, softenedPulse, responseTime, style);
        for (const [index, shell] of fieldShells.entries()) {
          shell.visible = fieldOn;
          shell.scale.setScalar(1 + responseTime * (0.36 + index * 0.28) + softenedPulse * 0.12);
          shell.rotation.y = motionOn ? time * (0.05 + index * 0.03) : 0;
          shell.material.opacity = fieldOn ? ((glowOn ? 0.08 : 0.035) + softenedPulse * 0.22) * (1 - index * 0.42) : 0;
        }
        postDensity.material.opacity = allPlain ? 0.16 : fieldOn ? 0.26 + softenedPulse * 0.2 : 0.12;
        updateFieldLines(time, level11, softenedPulse, motionOn);
      },
      dispose() {
        scene.remove(group);
        group.traverse(object => {
          object.geometry?.dispose?.();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const material of materials) material?.dispose?.();
        });
        glowTexture.dispose();
        vesicleTexture.dispose();
      },
    };
  },
};

export default cellularRenderer;
