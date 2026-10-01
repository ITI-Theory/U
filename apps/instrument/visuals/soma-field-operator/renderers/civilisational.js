import {
  clamp01,
  disposeObject,
  makeCurvePoints,
  makeGlowTexture,
  makeLabelTexture,
  makeLine,
  pointOnPolyline,
} from './lib/society-utils.js';

const cities = [
  [-74, 40.7, 1.0], [-0.1, 51.5, 0.86], [2.35, 48.85, 0.72], [37.6, 55.75, 0.72],
  [77.2, 28.6, 0.9], [116.4, 39.9, 0.86], [139.7, 35.7, 0.82], [151.2, -33.9, 0.52],
  [-46.6, -23.5, 0.74], [31.2, 30.0, 0.62], [28.0, -26.2, 0.5], [-99.1, 19.4, 0.64],
  [103.8, 1.35, 0.7], [121.5, 25.0, 0.58], [13.4, 52.5, 0.66], [126.9, 37.6, 0.66],
  [-118.2, 34.0, 0.76], [-87.6, 41.8, 0.58], [55.3, 25.2, 0.6], [18.4, -34.0, 0.42],
  [72.9, 19.1, 0.74], [100.5, 13.7, 0.54], [3.4, 6.5, 0.5], [144.9, -37.8, 0.46],
];

const arcs = [[0, 1], [1, 4], [4, 5], [5, 6], [0, 16], [16, 11], [11, 8], [1, 14], [14, 3], [1, 9], [9, 18], [18, 12], [12, 5], [6, 7], [8, 19]];

function latLonToVector(THREE, lon, lat, radius, target = new THREE.Vector3()) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + 180) * Math.PI / 180;
  target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
  return target;
}

function makeEarthTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 384;
  const context = canvas.getContext('2d');
  const ocean = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, '#07122c');
  ocean.addColorStop(1, '#020612');
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(20,229,255,0.17)';
  const continents = [
    [150, 140, 95, 55], [245, 120, 70, 45], [360, 145, 90, 64], [405, 215, 62, 70],
    [505, 145, 130, 54], [570, 205, 82, 45], [650, 250, 50, 34], [112, 240, 60, 72],
  ];
  for (const [x, y, rx, ry] of continents) {
    context.beginPath();
    context.ellipse(x, y, rx, ry, Math.sin(x) * 0.6, 0, Math.PI * 2);
    context.fill();
  }
  context.strokeStyle = 'rgba(61,123,255,0.18)';
  context.lineWidth = 2;
  for (let y = 48; y < canvas.height; y += 48) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }
  for (let x = 64; x < canvas.width; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const civilisationalRenderer = {
  id: 'civilisational',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const green = new THREE.Color('#56f0a2');
    const group = new THREE.Group();
    group.name = 'civilisational-renderer';
    group.position.set(0, 0.18, 0);
    scene.add(group);

    const earthTexture = makeEarthTexture(THREE);
    const glowTexture = makeGlowTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.2, 'rgba(246,199,90,0.86)'],
      [0.65, 'rgba(255,59,206,0.2)'],
      [1, 'rgba(255,59,206,0)'],
    ]);
    const labelTexture = makeLabelTexture(THREE, 'CIVILISATIONAL / SOLAR', [
      'Earth night footprint with global arcs',
      'Sun-Earth reference line at hybrid scale',
      'lens: centuries-long response waves',
    ], '#f6c75a');

    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -0.32;
    group.add(earthGroup);
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.52, 64, 40),
      new THREE.MeshBasicMaterial({ map: earthTexture, color: 0xbfdfff, transparent: true, opacity: 0.94 }),
    );
    earthGroup.add(earth);
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.58, 64, 32),
      new THREE.MeshBasicMaterial({ color: 0x14e5ff, transparent: true, opacity: 0.08, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    earthGroup.add(atmosphere);

    const cityPositions = new Float32Array(cities.length * 3);
    const cityColors = new Float32Array(cities.length * 3);
    const vector = new THREE.Vector3();
    for (const [index, city] of cities.entries()) {
      latLonToVector(THREE, city[0], city[1], 1.545, vector);
      cityPositions.set([vector.x, vector.y, vector.z], index * 3);
      const color = gold.clone().lerp(cyan, 1 - city[2]);
      cityColors.set([color.r, color.g, color.b], index * 3);
    }
    const cityGeometry = new THREE.BufferGeometry();
    cityGeometry.setAttribute('position', new THREE.BufferAttribute(cityPositions, 3));
    cityGeometry.setAttribute('color', new THREE.BufferAttribute(cityColors, 3));
    const cityLights = new THREE.Points(cityGeometry, new THREE.PointsMaterial({
      size: 0.075,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    earthGroup.add(cityLights);

    const tradeRoutes = arcs.map(([aIndex, bIndex], index) => {
      const start = latLonToVector(THREE, cities[aIndex][0], cities[aIndex][1], 1.57);
      const end = latLonToVector(THREE, cities[bIndex][0], cities[bIndex][1], 1.57);
      const middle = start.clone().add(end).normalize().multiplyScalar(2.15 + (index % 3) * 0.1);
      const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
      const points = curve.getPoints(44);
      const line = makeLine(THREE, points, new THREE.LineBasicMaterial({
        color: index % 2 ? cyan : gold,
        transparent: true,
        opacity: 0.42,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      earthGroup.add(line);
      return { line, points, index };
    });

    const satellites = Array.from({ length: 9 }, (_, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: index % 2 ? cyan : green, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }));
      sprite.scale.setScalar(0.12);
      group.add(sprite);
      return { sprite, radius: 2.05 + (index % 3) * 0.16, speed: 0.09 + index * 0.012, phase: index * 2.3999, tilt: -0.4 + index * 0.1 };
    });

    const sunLine = makeLine(THREE, [
      new THREE.Vector3(2.1, -0.12, -0.25),
      new THREE.Vector3(3.85, 0.38, -1.05),
    ], new THREE.LineBasicMaterial({ color: gold, transparent: true, opacity: 0.42, depthWrite: false, blending: THREE.AdditiveBlending }));
    group.add(sunLine);
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: gold, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending }));
    sun.position.set(3.92, 0.4, -1.08);
    sun.scale.setScalar(0.56);
    group.add(sun);

    const waveShells = Array.from({ length: 5 }, (_, index) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(1.72 + index * 0.18, 48, 24),
        new THREE.MeshBasicMaterial({ color: index % 2 ? pink : green, transparent: true, opacity: 0, wireframe: true, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      earthGroup.add(shell);
      return shell;
    });
    const responseParticles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(tradeRoutes.length * 3), 3)),
      new THREE.PointsMaterial({ size: 0.09, map: glowTexture, color: pink, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    earthGroup.add(responseParticles);
    const target = new THREE.Vector3();

    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.76, depthWrite: false }));
    label.position.set(0.15, -2.04, 0.45);
    label.scale.set(3.78, 0.94, 1);
    group.add(label);

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'civilisational';
        group.visible = active;
        if (!active) return;
        const fieldOn = state.tTheory && state.level >= 8;
        earthGroup.rotation.y = time * 0.045;
        earthGroup.rotation.x = 0.08 * Math.sin(time * 0.07);
        const nightPulse = 0.78 + 0.18 * Math.sin(time * 0.16);
        cityLights.material.opacity = nightPulse + pulse * 0.08;
        for (const route of tradeRoutes) {
          route.line.material.opacity = (fieldOn ? 0.36 : 0.48) + 0.08 * Math.sin(time * 0.18 + route.index);
          route.line.material.color.copy(fieldOn ? pink.clone().lerp(gold, (Math.sin(time * 0.1 + route.index) + 1) * 0.5) : (route.index % 2 ? cyan : gold));
        }

        for (const [index, satellite] of satellites.entries()) {
          const angle = time * satellite.speed + satellite.phase;
          satellite.sprite.position.set(
            Math.cos(angle) * satellite.radius,
            Math.sin(angle * 1.3) * 0.42 + satellite.tilt,
            Math.sin(angle) * satellite.radius * 0.55,
          );
          satellite.sprite.material.opacity = 0.48 + 0.22 * Math.sin(time * 0.6 + index);
        }
        sun.material.opacity = 0.58 + 0.22 * Math.sin(time * 0.22);
        sun.scale.setScalar(0.52 + pulse * 0.15);

        for (const [index, shell] of waveShells.entries()) {
          const centuries = (time * 0.025 + index * 0.17 + state.responseTime * 0.55) % 1;
          const scale = 0.82 + centuries * 0.55 + pulse * 0.05;
          shell.scale.setScalar(scale);
          shell.rotation.y = -time * (0.018 + index * 0.004);
          shell.material.opacity = fieldOn ? (0.08 + 0.13 * (1 - centuries)) : 0;
        }
        const responsePositions = responseParticles.geometry.attributes.position;
        for (const [index, route] of tradeRoutes.entries()) {
          const progress = (state.responseTime * 0.8 + time * 0.035 + index * 0.071) % 1;
          pointOnPolyline(route.points, progress, target);
          responsePositions.setXYZ(index, target.x, target.y, target.z);
        }
        responsePositions.needsUpdate = true;
        responseParticles.material.opacity = fieldOn ? 0.54 + pulse * 0.22 : 0;
        atmosphere.material.opacity = fieldOn ? 0.12 + pulse * 0.06 : 0.075;
        label.material.opacity = 0.58 + (fieldOn ? 0.18 : 0.04);
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        earthTexture.dispose();
        glowTexture.dispose();
        labelTexture.dispose();
      },
    };
  },
};

export default civilisationalRenderer;
