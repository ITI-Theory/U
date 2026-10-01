import {
  clamp01,
  disposeObject,
  makeCurvePoints,
  makeGlowTexture,
  makeLabelTexture,
  makeLine,
  pointOnPolyline,
  setGlowBlending,
  setMaterialColor,
  styleFlags,
} from './lib/society-utils.js';

function makeTerrainTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#09233a');
  gradient.addColorStop(0.45, '#102d28');
  gradient.addColorStop(1, '#251d37');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'rgba(61,123,255,0.55)';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(0, 178);
  for (let x = 0; x <= canvas.width; x += 32) context.lineTo(x, 170 + Math.sin(x * 0.025) * 24);
  context.stroke();
  context.strokeStyle = 'rgba(246,199,90,0.2)';
  context.lineWidth = 3;
  for (let y = 46; y < canvas.height; y += 58) {
    context.beginPath();
    context.moveTo(0, y);
    for (let x = 0; x <= canvas.width; x += 28) context.lineTo(x, y + Math.sin(x * 0.032 + y) * 12);
    context.stroke();
  }
  context.strokeStyle = 'rgba(86,240,162,0.22)';
  context.lineWidth = 2;
  for (let x = 66; x < canvas.width; x += 76) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x + Math.sin(x) * 32, canvas.height);
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const towns = [
  { name: 'capital', x: -1.1, z: -0.1, pop: 1.0 },
  { name: 'port', x: -3.05, z: -1.35, pop: 0.54 },
  { name: 'mill', x: 2.7, z: -1.55, pop: 0.38 },
  { name: 'ridge', x: 2.05, z: 1.42, pop: 0.34 },
  { name: 'clinic', x: -2.25, z: 1.52, pop: 0.28 },
  { name: 'college', x: 0.84, z: 1.02, pop: 0.46 },
  { name: 'border', x: 3.22, z: 0.06, pop: 0.22 },
  { name: 'valley', x: -0.18, z: -1.82, pop: 0.3 },
];

const links = [
  [0, 1, 'rail'],
  [0, 2, 'freight'],
  [0, 3, 'road'],
  [0, 4, 'health'],
  [0, 5, 'admin'],
  [5, 3, 'road'],
  [2, 6, 'border'],
  [1, 7, 'river'],
  [7, 2, 'road'],
  [4, 5, 'data'],
];

export const regionalSystemRenderer = {
  id: 'regional-system',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const group = new THREE.Group();
    group.name = 'regional-system-renderer';
    group.position.set(0, 0.54, 0);
    scene.add(group);

    const glowTexture = makeGlowTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.18, 'rgba(86,240,162,0.82)'],
      [1, 'rgba(86,240,162,0)'],
    ]);
    const terrainTexture = makeTerrainTexture(THREE);
    const labelTexture = makeLabelTexture(THREE, 'REGIONAL SYSTEM', [
      'towns, routes, rivers, borders',
      'institutions carry and constrain',
      'no feeling institution is implied',
    ], '#56f0a2');

    const terrain = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 4.9, 1, 1),
      new THREE.MeshBasicMaterial({ map: terrainTexture, transparent: true, opacity: 0.9, depthWrite: false }),
    );
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -1.34;
    group.add(terrain);

    const mountainMaterial = new THREE.LineBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.28, depthWrite: false });
    for (let index = 0; index < 6; index += 1) {
      const x = 0.45 + index * 0.24;
      const line = makeLine(THREE, [
        new THREE.Vector3(x, -1.18, -2.12),
        new THREE.Vector3(x + 0.25, -1.16, -0.92),
        new THREE.Vector3(x + 0.02, -1.18, 0.28),
        new THREE.Vector3(x + 0.36, -1.16, 1.85),
      ], mountainMaterial);
      group.add(line);
    }

    const boundaryMaterial = new THREE.LineBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending });
    const boundaries = [
      [[-3.3, -1.9], [-1.65, -2.05], [-1.38, 0.2], [-2.4, 2.0], [-3.45, 1.65], [-3.3, -1.9]],
      [[-1.38, 0.2], [0.25, -2.1], [1.3, -0.7], [0.7, 1.86], [-0.85, 1.93], [-1.38, 0.2]],
      [[1.3, -0.7], [3.45, -1.9], [3.35, 1.95], [0.7, 1.86], [1.3, -0.7]],
    ].map(points => {
      const boundary = makeLine(THREE, points.map(([x, z]) => new THREE.Vector3(x, -1.12, z)), boundaryMaterial.clone());
      group.add(boundary);
      return boundary;
    });

    const linkMaterials = {
      rail: new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending }),
      freight: new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.56, depthWrite: false, blending: THREE.AdditiveBlending }),
      road: new THREE.LineBasicMaterial({ color: green, transparent: true, opacity: 0.48, depthWrite: false, blending: THREE.AdditiveBlending }),
      health: new THREE.LineBasicMaterial({ color: pink, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending }),
      admin: new THREE.LineBasicMaterial({ color: 0x8f47ff, transparent: true, opacity: 0.52, depthWrite: false, blending: THREE.AdditiveBlending }),
      border: new THREE.LineBasicMaterial({ color: 0xff3bce, transparent: true, opacity: 0.44, depthWrite: false, blending: THREE.AdditiveBlending }),
      river: new THREE.LineBasicMaterial({ color: 0x3d7bff, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }),
      data: new THREE.LineBasicMaterial({ color: cyan, transparent: true, opacity: 0.44, depthWrite: false, blending: THREE.AdditiveBlending }),
    };
    const routeRecords = links.map(([aIndex, bIndex, type]) => {
      const a = towns[aIndex];
      const b = towns[bIndex];
      const points = makeCurvePoints(
        THREE,
        new THREE.Vector3(a.x, -1.02, a.z),
        new THREE.Vector3(b.x, -1.02, b.z),
        type === 'border' ? 0.1 : 0.18,
        36,
      );
      const line = makeLine(THREE, points, linkMaterials[type]);
      group.add(line);
      return { aIndex, bIndex, type, points, line };
    });
    const responseCanvas = document.createElement('canvas');
    responseCanvas.width = 192;
    responseCanvas.height = 128;
    const responseContext = responseCanvas.getContext('2d');
    const responseTexture = new THREE.CanvasTexture(responseCanvas);
    responseTexture.colorSpace = THREE.SRGBColorSpace;
    const responsePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.55, 4.95),
      new THREE.MeshBasicMaterial({ map: responseTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }),
    );
    responsePlane.rotation.x = -Math.PI / 2;
    responsePlane.position.y = -0.985;
    group.add(responsePlane);

    const townMeshes = towns.map((town, index) => {
      const radius = 0.08 + town.pop * 0.18;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 24, 12),
        new THREE.MeshBasicMaterial({ color: index === 0 ? gold : cyan, transparent: true, opacity: 0.82, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      sphere.position.set(town.x, -0.92 + radius * 0.3, town.z);
      group.add(sphere);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: index === 0 ? gold : green, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.position.copy(sphere.position);
      halo.scale.setScalar(radius * 4.4);
      group.add(halo);
      return { sphere, halo, town, radius };
    });
    const sourceNode = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    sourceNode.position.set(towns[0].x, -0.72, towns[0].z);
    sourceNode.scale.setScalar(0.54);
    group.add(sourceNode);

    const flowCount = 220;
    const flowPositions = new Float32Array(flowCount * 3);
    const flowColors = new Float32Array(flowCount * 3);
    const flowGeometry = new THREE.BufferGeometry();
    flowGeometry.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    flowGeometry.setAttribute('color', new THREE.BufferAttribute(flowColors, 3));
    const flowPoints = new THREE.Points(flowGeometry, new THREE.PointsMaterial({
      size: 0.055,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    group.add(flowPoints);
    const flowData = Array.from({ length: flowCount }, (_, index) => ({
      route: routeRecords[index % routeRecords.length],
      routeIndex: index % routeRecords.length,
      offset: (index * 0.38196601125) % 1,
      speed: 0.025 + (index % 19) * 0.002,
      color: index % 4 === 0 ? gold : (index % 3 === 0 ? pink : green),
    }));

    const fieldRings = routeRecords.map((route, index) => {
      const marker = new THREE.Mesh(
        new THREE.TorusGeometry(0.18, 0.006, 8, 72),
        new THREE.MeshBasicMaterial({ color: index % 2 ? pink : gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      marker.rotation.x = Math.PI / 2;
      group.add(marker);
      return marker;
    });
    const delayMarks = towns.map((town, index) => {
      const mark = new THREE.Mesh(
        new THREE.TorusGeometry(0.18 + index * 0.005, 0.006, 8, 48),
        new THREE.MeshBasicMaterial({ color: pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      mark.rotation.x = Math.PI / 2;
      mark.position.set(town.x, -0.86, town.z);
      group.add(mark);
      return mark;
    });
    const target = new THREE.Vector3();
    const neutralRoute = new THREE.Color('#cbd7d0');
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.72, depthWrite: false }));
    label.position.set(0.25, -2.12, 0.42);
    label.scale.set(3.62, 0.9, 1);
    group.add(label);
    let lastResponseDraw = -Infinity;

    function drawResponse(styleTime, response, falsecolourOn) {
      if (styleTime - lastResponseDraw < 0.08) return;
      lastResponseDraw = styleTime;
      const image = responseContext.createImageData(responseCanvas.width, responseCanvas.height);
      const data = image.data;
      const front = 0.8 + response * 3.6;
      const source = towns[0];
      for (let py = 0; py < responseCanvas.height; py += 1) {
        const z = 2.45 - (py / (responseCanvas.height - 1)) * 4.9;
        for (let px = 0; px < responseCanvas.width; px += 1) {
          const x = -3.775 + (px / (responseCanvas.width - 1)) * 7.55;
          const mountainDelay = x > 0.25 && x < 1.25 ? 0.52 : 0;
          const borderReflect = x > 1.35 ? 0.24 : 0;
          const d = Math.hypot((x - source.x) * 0.82, (z - source.z) * 1.12) + mountainDelay + borderReflect;
          const corridors = routeRecords.reduce((best, route) => {
            let nearest = 99;
            for (let p = 0; p < route.points.length; p += 4) {
              const point = route.points[p];
              nearest = Math.min(nearest, Math.hypot(point.x - x, point.z - z));
            }
            return Math.max(best, Math.exp(-(nearest ** 2) / 0.018));
          }, 0);
          const ridge = Math.exp(-((d - front) ** 2) / 0.035) * (0.55 + corridors * 0.85);
          const wake = Math.exp(-(d ** 2) / Math.max(0.2, front * 1.05)) * 0.22;
          const contour = Math.abs(((d - front) * 4.8) % 1) < 0.04 ? 0.34 : 0;
          const value = clamp01(ridge + wake + contour + corridors * 0.22);
          const offset = (py * responseCanvas.width + px) * 4;
          if (falsecolourOn) {
            data[offset] = Math.round(40 + 215 * clamp01(ridge + contour));
            data[offset + 1] = Math.round(80 + 165 * clamp01(wake + corridors * 0.72));
            data[offset + 2] = Math.round(44 + 130 * clamp01(corridors + contour));
          } else {
            const ink = Math.round(126 + 118 * value);
            data[offset] = ink;
            data[offset + 1] = ink;
            data[offset + 2] = ink;
          }
          data[offset + 3] = Math.round(225 * value);
        }
      }
      responseContext.putImageData(image, 0, 0);
      responseTexture.needsUpdate = true;
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'regional-system';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const styleTime = motionOn ? time : 0;
        const fieldOn = state.tTheory && state.level >= 8;
        const response = fieldOn ? Math.max(state.responseTime, 0.32 + (motionOn ? 0.04 * Math.sin(time * 0.22) : 0)) : state.responseTime;
        setGlowBlending(THREE, terrain.material, glowOn);
        setGlowBlending(THREE, responsePlane.material, glowOn);
        terrain.material.opacity = falsecolourOn ? (fieldOn ? 0.76 : 0.9) : 0.28;
        boundaryMaterial.opacity = fieldOn ? 0.52 + (glowOn ? pulse * 0.14 : 0) : 0.28;
        setGlowBlending(THREE, boundaryMaterial, glowOn);
        setMaterialColor(boundaryMaterial, falsecolourOn ? pink : '#d5c7d2');
        setMaterialColor(mountainMaterial, falsecolourOn ? gold : '#b7b2a4');
        for (const [index, boundary] of boundaries.entries()) {
          boundary.material.opacity = (fieldOn ? 0.44 : 0.24) + (motionOn ? 0.04 * Math.sin(time * 0.22 + index) : 0);
        }

        for (const [index, record] of routeRecords.entries()) {
          const ruleReach = clamp01(response * 1.35 - index * 0.055);
          setGlowBlending(THREE, record.line.material, glowOn);
          const routeColor = falsecolourOn ? linkMaterials[record.type].color : neutralRoute;
          record.line.material.color.copy(routeColor);
          record.line.material.opacity = (fieldOn ? 0.46 + 0.42 * ruleReach : (glowOn ? 0.46 : 0.7)) + (motionOn ? 0.06 * Math.sin(time * 0.4 + index) : 0);
        }

        for (let index = 0; index < flowCount; index += 1) {
          const item = flowData[index];
          const t = (item.offset + styleTime * item.speed) % 1;
          pointOnPolyline(item.route.points, t, target);
          const offset = index * 3;
          flowPositions[offset] = target.x;
          flowPositions[offset + 1] = target.y + (motionOn ? 0.04 * Math.sin(time * 2.5 + index) : 0);
          flowPositions[offset + 2] = target.z;
          const routeDelay = item.routeIndex * 0.045;
          const reached = fieldOn && response > routeDelay + t * 0.55;
          const color = falsecolourOn ? (reached ? gold : item.color) : (reached ? gold : green);
          flowColors[offset] = color.r;
          flowColors[offset + 1] = color.g;
          flowColors[offset + 2] = color.b;
        }
        flowGeometry.attributes.position.needsUpdate = true;
        flowGeometry.attributes.color.needsUpdate = true;
        setGlowBlending(THREE, flowPoints.material, glowOn);
        flowPoints.material.opacity = glowOn ? (fieldOn ? 0.92 : 0.7) : 0.5;

        responsePlane.visible = fieldOn;
        drawResponse(styleTime, response, falsecolourOn);
        responsePlane.material.opacity = fieldOn ? (glowOn ? 1.0 + pulse * 0.12 : 0.45) : 0;
        sourceNode.material.opacity = fieldOn && glowOn ? 0.48 + pulse * 0.42 : 0;
        sourceNode.scale.setScalar(0.48 + pulse * 0.28);

        for (const [index, townRecord] of townMeshes.entries()) {
          const reach = clamp01(response * 1.8 - Math.hypot(townRecord.town.x + 1.1, townRecord.town.z + 0.1) * 0.2);
          setGlowBlending(THREE, townRecord.sphere.material, glowOn);
          setGlowBlending(THREE, townRecord.halo.material, glowOn);
          setMaterialColor(townRecord.sphere.material, falsecolourOn ? (index === 0 ? gold : cyan) : '#dde3dd');
          townRecord.sphere.scale.setScalar(1 + (motionOn ? 0.08 * Math.sin(time * 0.8 + index) : 0) + pulse * 0.08 * reach);
          townRecord.halo.material.opacity = glowOn ? 0.2 + 0.18 * townRecord.town.pop + (fieldOn ? reach * 0.34 : 0) : 0;
          townRecord.halo.scale.setScalar(townRecord.radius * (4.2 + reach * 5.5 + (glowOn ? pulse : 0)));
        }

        for (const [index, marker] of fieldRings.entries()) {
          const route = routeRecords[index];
          const progress = clamp01(response * 1.42 - index * 0.055);
          pointOnPolyline(route.points, progress, target);
          marker.position.copy(target);
          const size = 0.3 + progress * 0.9 + pulse * 0.18;
          marker.scale.set(size * (route.type === 'border' ? 0.65 : 1.15), size * 0.72, 1);
          setGlowBlending(THREE, marker.material, glowOn);
          setMaterialColor(marker.material, falsecolourOn ? (index % 2 ? pink : gold) : '#f0ead8');
          marker.material.opacity = fieldOn ? (state.contours ? 0.42 : 0.24) * Math.sin(Math.PI * progress) + (glowOn ? pulse * 0.05 : 0) : 0;
        }
        for (const [index, mark] of delayMarks.entries()) {
          const delay = index * 0.07;
          const reach = clamp01(response * 1.45 - delay);
          setGlowBlending(THREE, mark.material, glowOn);
          setMaterialColor(mark.material, falsecolourOn ? pink : '#efe8dd');
          mark.material.opacity = fieldOn ? reach * (0.12 + (motionOn ? 0.22 * Math.sin(time * 0.5 + index) ** 2 : 0.12)) : 0;
          mark.scale.setScalar(0.8 + reach * 1.8);
        }
        label.material.opacity = 0.58 + (fieldOn ? 0.18 : 0.04);
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        glowTexture.dispose();
        terrainTexture.dispose();
        responseTexture.dispose();
        labelTexture.dispose();
      },
    };
  },
};

export default regionalSystemRenderer;
