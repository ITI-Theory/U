import { createLineSegments, createPointCloud, gaussian, makeRadialTexture, seededRandom, setGlowBlending, setMaterialColor } from './cosmic-tools.js';

const TEMPERATURES = ['#78a8ff', '#a9c8ff', '#fff2bb', '#ffd07a', '#ff8b5c'];

export function createSpiralGalaxy(THREE, {
  seed = 1,
  radius = 1.7,
  count = 1000,
  arms = 2,
  pitch = 1.18,
  bar = true,
  dust = true,
  h2 = true,
} = {}) {
  const random = seededRandom(seed);
  const group = new THREE.Group();
  const stars = [];
  for (let index = 0; index < count; index += 1) {
    const arm = index % arms;
    const r = radius * Math.sqrt(random());
    const spread = 0.11 + r * 0.052;
    const angle = arm * Math.PI * 2 / arms + r * pitch + gaussian(random) * spread;
    const z = gaussian(random) * 0.028 * (1 + r / radius);
    const young = random() < Math.max(0.14, 0.62 * Math.exp(-((r - radius * 0.7) ** 2) / (radius * 0.38)));
    const color = young ? (random() < 0.56 ? '#78a8ff' : '#a9c8ff') : TEMPERATURES[Math.floor(random() * TEMPERATURES.length)];
    stars.push({ x: Math.cos(angle) * r, y: z, z: Math.sin(angle) * r * 0.62, color });
  }
  for (let index = 0; index < Math.floor(count * 0.22); index += 1) {
    const r = radius * Math.pow(random(), 0.65);
    const angle = random() * Math.PI * 2;
    stars.push({ x: Math.cos(angle) * r, y: gaussian(random) * 0.035, z: Math.sin(angle) * r * 0.62, color: random() < 0.6 ? '#ffd884' : '#fff2bb' });
  }
  if (bar) {
    for (let index = 0; index < 170; index += 1) {
      const x = gaussian(random) * radius * 0.34;
      stars.push({ x, y: gaussian(random) * 0.035, z: gaussian(random) * radius * 0.07, color: '#ffd884' });
    }
  }
  const pointCloud = createPointCloud(THREE, stars, { size: 0.035, opacity: 1.0 });
  group.add(pointCloud);

  const bulgeTexture = makeRadialTexture(THREE, [
    [0, 'rgba(255,255,255,1)'],
    [0.16, 'rgba(246,199,90,0.86)'],
    [0.48, 'rgba(246,199,90,0.26)'],
    [1, 'rgba(246,199,90,0)'],
  ], 192);
  const bulge = new THREE.Sprite(new THREE.SpriteMaterial({ map: bulgeTexture, color: 0xf6c75a, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  bulge.scale.set(radius * 0.72, radius * 0.52, 1);
  group.add(bulge);

  const haloTexture = makeRadialTexture(THREE, [
    [0, 'rgba(255,235,180,0.45)'],
    [0.35, 'rgba(61,123,255,0.12)'],
    [1, 'rgba(61,123,255,0)'],
  ], 192);
  const halo = new THREE.Mesh(
    new THREE.PlaneGeometry(radius * 4.2, radius * 3.0),
    new THREE.MeshBasicMaterial({ map: haloTexture, transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = -0.02;
  group.add(halo);

  const dustLines = [];
  const armGlowLines = [];
  if (dust) {
    for (let arm = 0; arm < arms; arm += 1) {
      for (let step = 0; step < 96; step += 1) {
        const r0 = radius * (0.16 + step / 112);
        const r1 = radius * (0.16 + (step + 1) / 112);
        const a0 = arm * Math.PI * 2 / arms + r0 * pitch + 0.28;
        const a1 = arm * Math.PI * 2 / arms + r1 * pitch + 0.28;
        dustLines.push([
          Math.cos(a0) * r0, 0.018, Math.sin(a0) * r0 * 0.62,
          Math.cos(a1) * r1, 0.018, Math.sin(a1) * r1 * 0.62,
        ]);
        const g0 = arm * Math.PI * 2 / arms + r0 * pitch - 0.04;
        const g1 = arm * Math.PI * 2 / arms + r1 * pitch - 0.04;
        armGlowLines.push([
          Math.cos(g0) * r0, 0.012, Math.sin(g0) * r0 * 0.62,
          Math.cos(g1) * r1, 0.012, Math.sin(g1) * r1 * 0.62,
        ]);
      }
    }
  }
  const armGlow = createLineSegments(THREE, armGlowLines, '#3d7bff', 0.28);
  group.add(armGlow);
  const dustLane = createLineSegments(THREE, dustLines, '#1a0b18', 0.78, false);
  group.add(dustLane);

  const h2Texture = makeRadialTexture(THREE, [
    [0, 'rgba(255,255,255,0.95)'],
    [0.22, 'rgba(255,59,206,0.6)'],
    [1, 'rgba(255,59,206,0)'],
  ]);
  const knots = [];
  if (h2) {
    for (let index = 0; index < 78; index += 1) {
      const r = radius * (0.25 + random() * 0.72);
      const arm = index % arms;
      const angle = arm * Math.PI * 2 / arms + r * pitch + gaussian(random) * 0.14;
      const knot = new THREE.Sprite(new THREE.SpriteMaterial({
        map: h2Texture,
        color: 0xff3bce,
        transparent: true,
        opacity: 0.62,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      knot.position.set(Math.cos(angle) * r, 0.04, Math.sin(angle) * r * 0.62);
      knot.scale.setScalar(radius * (0.06 + random() * 0.05));
      knots.push(knot);
      group.add(knot);
    }
  }

  group.userData.cosmicTextures = [haloTexture, h2Texture, bulgeTexture];
  group.userData.updateGalaxy = (time, pulse, lensStrength = 0, style = {}) => {
    const falsecolourOn = style.falsecolour !== false;
    const glowOn = style.glow !== false;
    const motionOn = style.motion !== false;
    const styleTime = motionOn ? time : 0;
    group.rotation.y = styleTime * 0.025;
    pointCloud.rotation.y = styleTime * 0.06;
    setMaterialColor(pointCloud.material, falsecolourOn ? '#ffffff' : '#bcc1bd');
    setMaterialColor(bulge.material, falsecolourOn ? '#f6c75a' : '#b8a16f');
    setMaterialColor(armGlow.material, falsecolourOn ? '#3d7bff' : '#9ba7b5');
    setMaterialColor(dustLane.material, falsecolourOn ? '#1a0b18' : '#1f1f22');
    setGlowBlending(THREE, halo.material, glowOn);
    setGlowBlending(THREE, bulge.material, glowOn);
    setGlowBlending(THREE, armGlow.material, glowOn);
    bulge.material.opacity = glowOn ? 0.86 + pulse * 0.08 : 0.42;
    armGlow.material.opacity = glowOn ? 0.24 + lensStrength * 0.08 : 0.1;
    dustLane.material.opacity = 0.5 + (motionOn ? 0.15 * Math.sin(time * 0.3) : 0);
    halo.visible = glowOn || falsecolourOn;
    halo.material.opacity = glowOn ? 0.26 + lensStrength * 0.1 + pulse * 0.05 : 0.08;
    for (const [index, knot] of knots.entries()) {
      setMaterialColor(knot.material, falsecolourOn ? '#ff3bce' : '#d9c7a2');
      setGlowBlending(THREE, knot.material, glowOn);
      knot.visible = glowOn || falsecolourOn;
      knot.material.opacity = glowOn ? 0.42 + (motionOn ? 0.2 * Math.sin(time * 0.7 + index) : 0) + pulse * 0.16 : 0.18;
    }
  };
  return group;
}

export function createEllipticalGalaxy(THREE, { seed = 20, count = 520, radius = 0.72 } = {}) {
  const random = seededRandom(seed);
  const stars = [];
  for (let index = 0; index < count; index += 1) {
    const r = radius * Math.pow(random(), 0.42);
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    stars.push({
      x: Math.cos(theta) * Math.sin(phi) * r,
      y: Math.cos(phi) * r * 0.34,
      z: Math.sin(theta) * Math.sin(phi) * r * 0.58,
      color: random() < 0.7 ? '#ffd884' : '#fff2bb',
    });
  }
  const group = new THREE.Group();
  const points = createPointCloud(THREE, stars, { size: 0.032, opacity: 0.9 });
  group.add(points);
  const glowTexture = makeRadialTexture(THREE, [
    [0, 'rgba(255,255,255,0.94)'],
    [0.2, 'rgba(246,199,90,0.72)'],
    [0.58, 'rgba(246,199,90,0.2)'],
    [1, 'rgba(246,199,90,0)'],
  ]);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: 0xf6c75a, transparent: true, opacity: 0.54, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.set(radius * 1.12, radius * 0.72, 1);
  group.add(glow);
  group.userData.updateGalaxy = (time, pulse, lensStrength = 0, style = {}) => {
    const falsecolourOn = style.falsecolour !== false;
    const glowOn = style.glow !== false;
    const motionOn = style.motion !== false;
    points.rotation.y = (motionOn ? time : 0) * 0.018;
    setMaterialColor(points.material, falsecolourOn ? '#ffffff' : '#b8b2a3');
    setMaterialColor(glow.material, falsecolourOn ? '#f6c75a' : '#b8a16f');
    setGlowBlending(THREE, glow.material, glowOn);
    glow.material.opacity = glowOn ? 0.48 + lensStrength * 0.08 + pulse * 0.08 : 0.2;
  };
  return group;
}
