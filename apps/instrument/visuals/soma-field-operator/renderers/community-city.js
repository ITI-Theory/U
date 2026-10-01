import {
  clamp01,
  disposeObject,
  makeGlowTexture,
  makeLabelTexture,
  makeLineSegments,
  setGlowBlending,
  setMaterialColor,
  styleFlags,
} from './lib/society-utils.js';

function makeStreetCoordinates() {
  const coordinates = [];
  const verticals = [-3.2, -2.45, -1.72, -0.96, -0.28, 0.44, 1.18, 1.92, 2.68, 3.28];
  const horizontals = [-2.15, -1.52, -0.92, -0.28, 0.42, 1.08, 1.78, 2.32];
  for (const x of verticals) coordinates.push(x, -1.28, -2.32, x, -1.28, 2.48);
  for (const z of horizontals) coordinates.push(-3.5, -1.275, z, 3.5, -1.275, z);
  for (let index = 0; index < 7; index += 1) {
    const x0 = -3.25 + index * 1.05;
    coordinates.push(x0, -1.265, -2.05, x0 + 0.88, -1.265, -1.35);
    coordinates.push(x0 - 0.16, -1.265, 0.55, x0 + 0.82, -1.265, 1.82);
  }
  return { coordinates, verticals, horizontals };
}

function makeDistrictTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { canvas, context, texture };
}

export const communityCityRenderer = {
  id: 'community-city',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const violet = new THREE.Color('#8f47ff');
    const group = new THREE.Group();
    group.name = 'community-city-renderer';
    group.position.set(0, 0.72, 0);
    group.rotation.x = -0.52;
    scene.add(group);

    const glowTexture = makeGlowTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.16, 'rgba(246,199,90,0.85)'],
      [0.55, 'rgba(20,229,255,0.22)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const labelTexture = makeLabelTexture(THREE, 'CITY DIFFUSION', [
      'streets, blocks, public flows',
      'lens: behaviour front over network',
      'poke: one neighbourhood impulse',
    ], '#14e5ff');

    const { coordinates: streetCoordinates, verticals, horizontals } = makeStreetCoordinates();
    const streetMaterial = new THREE.LineBasicMaterial({
      color: cyan,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const streets = makeLineSegments(THREE, streetCoordinates, streetMaterial);
    group.add(streets);
    const scaleBarMaterial = new THREE.LineBasicMaterial({
      color: 0xeaf5ff,
      transparent: true,
      opacity: 0.64,
      depthWrite: false,
    });
    const scaleBar = makeLineSegments(THREE, [
      -3.46, -1.235, 2.58, -2.46, -1.235, 2.58,
      -3.46, -1.235, 2.48, -3.46, -1.235, 2.68,
      -2.46, -1.235, 2.48, -2.46, -1.235, 2.68,
    ], scaleBarMaterial);
    group.add(scaleBar);

    const riverCoordinates = [];
    for (let index = 0; index < 44; index += 1) {
      const a = index / 43;
      const b = (index + 1) / 43;
      const ax = -3.7 + a * 7.4;
      const bx = -3.7 + b * 7.4;
      riverCoordinates.push(ax, -1.255, -0.08 + Math.sin(a * Math.PI * 2.4) * 0.16);
      riverCoordinates.push(bx, -1.255, -0.08 + Math.sin(b * Math.PI * 2.4) * 0.16);
    }
    const river = makeLineSegments(THREE, riverCoordinates, new THREE.LineBasicMaterial({
      color: 0x3d7bff,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(river);

    const buildingGeometry = new THREE.BoxGeometry(0.48, 1, 0.38);
    const buildingMaterial = new THREE.MeshBasicMaterial({
      color: 0x244b7a,
      transparent: true,
      opacity: 0.86,
      depthWrite: true,
    });
    const buildingCount = 126;
    const buildings = new THREE.InstancedMesh(buildingGeometry, buildingMaterial, buildingCount);
    const buildingEdgeMaterial = new THREE.MeshBasicMaterial({
      color: cyan,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    const buildingEdges = new THREE.InstancedMesh(buildingGeometry, buildingEdgeMaterial, buildingCount);
    const buildingData = [];
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    let buildingIndex = 0;
    for (let xi = 0; xi < verticals.length - 1 && buildingIndex < buildingCount; xi += 1) {
      for (let zi = 0; zi < horizontals.length - 1 && buildingIndex < buildingCount; zi += 1) {
        if ((xi + zi) % 7 === 0) continue;
        const cx = (verticals[xi] + verticals[xi + 1]) * 0.5 + Math.sin(xi * 2.1 + zi) * 0.05;
        const cz = (horizontals[zi] + horizontals[zi + 1]) * 0.5 + Math.cos(zi * 1.7) * 0.05;
        const height = 0.18 + ((xi * 13 + zi * 7) % 11) * 0.055;
        position.set(cx, -1.28 + height * 0.5, cz);
        scale.set(0.78 + (zi % 3) * 0.12, height, 0.76 + (xi % 2) * 0.16);
        matrix.compose(position, quaternion, scale);
        buildings.setMatrixAt(buildingIndex, matrix);
        buildingEdges.setMatrixAt(buildingIndex, matrix);
        const color = new THREE.Color(0x16365f).lerp(gold, ((xi * 5 + zi * 3) % 9) / 18);
        buildings.setColorAt(buildingIndex, color);
        buildingData.push({ index: buildingIndex, color, cx, cz, height, phase: xi * 0.9 + zi * 1.7 });
        buildingIndex += 1;
      }
    }
    buildings.count = buildingIndex;
    buildingEdges.count = buildingIndex;
    buildings.instanceMatrix.needsUpdate = true;
    buildings.instanceColor.needsUpdate = true;
    group.add(buildings);
    buildingEdges.instanceMatrix.needsUpdate = true;
    group.add(buildingEdges);

    const parkGeometry = new THREE.CircleGeometry(0.38, 32);
    const parkMaterial = new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending });
    const parks = [[-2.82, 1.18], [0.75, -1.72], [2.55, 0.83]].map(([x, z]) => {
      const park = new THREE.Mesh(parkGeometry, parkMaterial);
      park.rotation.x = -Math.PI / 2;
      park.position.set(x, -1.245, z);
      group.add(park);
      return park;
    });

    const particleCount = 520;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const traffic = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.84,
      depthWrite: false,
      map: glowTexture,
      blending: THREE.AdditiveBlending,
    }));
    group.add(traffic);
    const trafficData = Array.from({ length: particleCount }, (_, index) => ({
      axis: index % 3 === 0 ? 'z' : 'x',
      lane: index % 3 === 0 ? verticals[index % verticals.length] : horizontals[index % horizontals.length],
      offset: ((index * 0.61803398875) % 1),
      speed: 0.035 + (index % 17) * 0.004,
      side: index % 2 ? -1 : 1,
      color: index % 5 === 0 ? gold : (index % 2 ? cyan : green),
    }));

    const { canvas: fieldCanvas, context: fieldContext, texture: fieldTexture } = makeDistrictTexture(THREE);
    const fieldPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.6, 5.1),
      new THREE.MeshBasicMaterial({ map: fieldTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
    );
    fieldPlane.rotation.x = -Math.PI / 2;
    fieldPlane.position.y = -0.58;
    group.add(fieldPlane);

    const contourGroup = new THREE.Group();
    const contourRings = Array.from({ length: 7 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.38 + index * 0.2, 0.006, 8, 128),
        new THREE.MeshBasicMaterial({ color: index % 2 ? pink : gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.set(-2.46, -1.16, -1.52);
      contourGroup.add(ring);
      return ring;
    });
    group.add(contourGroup);

    const sourceNode = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture,
      color: pink,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    sourceNode.position.set(-2.46, -1.08, -1.52);
    sourceNode.scale.setScalar(0.32);
    group.add(sourceNode);

    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.78, depthWrite: false }));
    label.position.set(0.1, -2.12, 0.5);
    label.scale.set(3.5, 0.88, 1);
    group.add(label);

    let lastFieldUpdate = -Infinity;
    const sourceX = -2.46;
    const sourceZ = -1.52;
    const tempColor = new THREE.Color();
    const neutralBuildingBase = new THREE.Color('#10151e');
    const neutralBuildingLight = new THREE.Color('#d6d7cf');

    function drawField(time, response, active, falsecolourOn) {
      if (!active || time - lastFieldUpdate < 0.065) return;
      lastFieldUpdate = time;
      const image = fieldContext.createImageData(fieldCanvas.width, fieldCanvas.height);
      const data = image.data;
      const front = 0.35 + response * 5.65 + 0.18 * Math.sin(time * 0.4);
      for (let py = 0; py < fieldCanvas.height; py += 1) {
        const z = 2.55 - (py / (fieldCanvas.height - 1)) * 5.1;
        for (let px = 0; px < fieldCanvas.width; px += 1) {
          const x = -3.8 + (px / (fieldCanvas.width - 1)) * 7.6;
          const dx = x - sourceX;
          const dz = z - sourceZ;
          const gridEase = 1 + 0.36 * (Math.cos((x + 0.28) * Math.PI * 2.6) ** 8 + Math.cos((z - 0.08) * Math.PI * 3.0) ** 8);
          const riverDelay = z > -0.05 && sourceZ < -0.05 ? 0.42 : 0;
          const districtDelay = x > 0.7 ? 0.22 : 0;
          const d = Math.hypot(dx * 0.9, dz * 1.25) + riverDelay + districtDelay;
          const ridge = Math.exp(-((d - front) ** 2) / 0.045) * gridEase;
          const filled = Math.exp(-(d ** 2) / Math.max(0.2, front * 1.28)) * 0.42;
          const contours = active && Math.abs(((d - front) * 5.2) % 1) < 0.045 ? 0.55 : 0;
          const value = clamp01(ridge + filled + contours);
          const offset = (py * fieldCanvas.width + px) * 4;
          if (falsecolourOn) {
            data[offset] = Math.round(45 + 210 * clamp01(ridge + contours));
            data[offset + 1] = Math.round(20 + 190 * clamp01(filled + ridge * 0.28));
            data[offset + 2] = Math.round(92 + 155 * clamp01(1 - filled + contours));
          } else {
            const ink = Math.round(120 + 130 * clamp01(ridge + contours + filled * 0.4));
            data[offset] = ink;
            data[offset + 1] = ink;
            data[offset + 2] = ink;
          }
          data[offset + 3] = Math.round(210 * value);
        }
      }
      fieldContext.putImageData(image, 0, 0);
      fieldTexture.needsUpdate = true;
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'community-city';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const fieldOn = state.tTheory && state.level >= 8;
        const day = 0.5 + 0.5 * Math.sin(styleTime * 0.11 - 1.1);
        setGlowBlending(THREE, streetMaterial, glowOn);
        setGlowBlending(THREE, river.material, glowOn);
        setGlowBlending(THREE, traffic.material, glowOn);
        setGlowBlending(THREE, fieldPlane.material, glowOn);
        setGlowBlending(THREE, parkMaterial, glowOn);
        setGlowBlending(THREE, sourceNode.material, glowOn);
        setMaterialColor(streetMaterial, falsecolourOn ? cyan : '#d7dee7');
        setMaterialColor(river.material, falsecolourOn ? '#3d7bff' : '#a7b0bd');
        setMaterialColor(buildingMaterial, falsecolourOn ? '#244b7a' : '#141922');
        setMaterialColor(buildingEdgeMaterial, falsecolourOn ? cyan : '#cad2dc');
        scaleBarMaterial.opacity = glowOn ? 0.64 : 0.9;
        streetMaterial.opacity = glowOn ? (fieldOn ? 0.5 : 0.56 + (1 - day) * 0.34) : 0.82;
        buildingMaterial.opacity = falsecolourOn ? 0.58 + (1 - day) * 0.36 : 0.18;
        buildingEdgeMaterial.opacity = glowOn ? 0.18 + (fieldOn ? 0.08 : 0) : 0.42;
        for (const item of buildingData) {
          const lit = 0.18 + (1 - day) * 0.66 + (motionOn ? 0.16 * Math.sin(time * 0.7 + item.phase) : 0);
          tempColor.copy(falsecolourOn ? item.color : neutralBuildingBase).lerp(falsecolourOn ? gold : neutralBuildingLight, clamp01(lit * (falsecolourOn ? 0.52 : 0.24)));
          buildings.setColorAt(item.index, tempColor);
        }
        buildings.instanceColor.needsUpdate = true;

        for (let index = 0; index < particleCount; index += 1) {
          const item = trafficData[index];
          const t = (item.offset + styleTime * item.speed) % 1;
          let x;
          let z;
          if (item.axis === 'x') {
            x = -3.42 + t * 6.84;
            z = item.lane + item.side * 0.028;
          } else {
            x = item.lane + item.side * 0.028;
            z = -2.24 + t * 4.58;
          }
          const offset = index * 3;
          particlePositions[offset] = x;
          particlePositions[offset + 1] = -1.08 + (motionOn ? 0.015 * Math.sin(time * 4 + index) : 0);
          particlePositions[offset + 2] = z;
          const fieldReach = fieldOn && Math.hypot(x - sourceX, z - sourceZ) < 0.45 + state.responseTime * 5.8;
          const colour = falsecolourOn
            ? (fieldReach ? pink : item.color)
            : (fieldReach ? tempColor.set('#f1f1e6') : tempColor.set('#bfc8c4'));
          particleColors[offset] = colour.r;
          particleColors[offset + 1] = colour.g;
          particleColors[offset + 2] = colour.b;
        }
        particleGeometry.attributes.position.needsUpdate = true;
        particleGeometry.attributes.color.needsUpdate = true;
        traffic.material.opacity = motionOn ? (fieldOn ? 0.95 : 0.68 + (1 - day) * 0.26) : 0.7;

        drawField(styleTime, state.responseTime, fieldOn, falsecolourOn);
        fieldPlane.visible = fieldOn;
        fieldPlane.material.opacity = fieldOn ? (glowOn ? 0.88 + pulse * 0.12 : 0.34) : 0;
        sourceNode.material.opacity = fieldOn && glowOn ? 0.5 + pulse * 0.45 : 0;
        sourceNode.scale.setScalar(0.26 + pulse * 0.34);
        for (const [index, ring] of contourRings.entries()) {
          const radius = 0.18 + state.responseTime * (1.1 + index * 0.56) + index * 0.11 + pulse * 0.12;
          ring.scale.set(radius * 1.18, radius * 0.78, 1);
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index % 2 ? pink : gold) : '#ece7d8');
          ring.material.opacity = fieldOn ? (state.contours ? Math.max(0, 0.42 - index * 0.04) : Math.max(0, 0.22 - index * 0.02)) + (glowOn ? pulse * 0.08 : 0) : 0;
          ring.rotation.z = styleTime * 0.045 + index * 0.18;
        }
        for (const [index, park] of parks.entries()) {
          park.material.opacity = falsecolourOn ? 0.13 + (motionOn ? 0.05 * Math.sin(time * 0.33 + index) : 0) : 0.08;
        }
        label.material.opacity = 0.58 + (fieldOn ? 0.18 : 0.08) + (motionOn ? 0.04 * Math.sin(time * 0.8) : 0);
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        fieldTexture.dispose();
        glowTexture.dispose();
        labelTexture.dispose();
      },
    };
  },
};

export default communityCityRenderer;
