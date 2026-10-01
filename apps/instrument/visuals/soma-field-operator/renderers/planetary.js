import { createContourLayer } from './lib/contours.js';
import { PALETTE, createArcLine, createSectorMesh, disposeObject, makeGlowSprite, makeRadialTexture, setContourStyle, setGlowBlending, setMaterialColor, styleFlags } from './lib/planetary-helpers.js';

function makePlanetTexture(THREE, falsecolourOn) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  const ocean = falsecolourOn ? '#1450a8' : '#40576a';
  const land = falsecolourOn ? '#48b989' : '#7b8162';
  const dark = falsecolourOn ? '#06183a' : '#202830';
  context.fillStyle = dark;
  context.fillRect(0, 0, 512, 512);
  const gradient = context.createRadialGradient(205, 188, 24, 246, 246, 252);
  gradient.addColorStop(0, falsecolourOn ? '#5fb8ff' : '#8da0a5');
  gradient.addColorStop(0.45, ocean);
  gradient.addColorStop(0.74, '#0b2a62');
  gradient.addColorStop(1, dark);
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(256, 256, 252, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 0.86;
  for (let i = 0; i < 22; i += 1) {
    const cx = 90 + ((i * 73) % 340);
    const cy = 75 + ((i * 97) % 360);
    const rx = 26 + (i % 5) * 16;
    const ry = 18 + (i % 7) * 10;
    context.fillStyle = land;
    context.beginPath();
    for (let p = 0; p < 18; p += 1) {
      const a = p / 18 * Math.PI * 2;
      const n = 0.78 + 0.22 * Math.sin(p * 2.7 + i);
      const x = cx + Math.cos(a) * rx * n;
      const y = cy + Math.sin(a) * ry * n;
      if (p === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.fill();
  }
  context.globalAlpha = 0.34;
  context.strokeStyle = falsecolourOn ? '#dff9ff' : '#cfd3c4';
  context.lineWidth = 2;
  for (let y = 92; y < 430; y += 42) {
    context.beginPath();
    for (let x = 58; x < 456; x += 12) {
      const yy = y + Math.sin(x * 0.04 + y) * 7;
      if (x === 58) context.moveTo(x, yy);
      else context.lineTo(x, yy);
    }
    context.stroke();
  }
  context.globalAlpha = 1;
  const terminator = context.createLinearGradient(90, 0, 430, 0);
  terminator.addColorStop(0, 'rgba(255,255,255,0.2)');
  terminator.addColorStop(0.48, 'rgba(0,0,0,0)');
  terminator.addColorStop(0.72, 'rgba(0,0,0,0.45)');
  terminator.addColorStop(1, 'rgba(0,0,0,0.82)');
  context.fillStyle = terminator;
  context.beginPath();
  context.arc(256, 256, 252, 0, Math.PI * 2);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const planetaryRenderer = {
  id: 'planetary',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const ambient = new THREE.AmbientLight('#27364a', 0.9);
    const keyLight = new THREE.DirectionalLight('#fff4d0', 2.6);
    keyLight.position.set(-3.8, 2.1, 4.6);
    group.add(ambient, keyLight);

    const glowTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.95)'],
      [0.22, 'rgba(20,229,255,0.5)'],
      [0.62, 'rgba(61,123,255,0.18)'],
      [1, 'rgba(61,123,255,0)'],
    ], 192);
    const auroraTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.92)'],
      [0.24, 'rgba(86,240,162,0.7)'],
      [0.7, 'rgba(20,229,255,0.16)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const planetFalsecolour = makePlanetTexture(THREE, true);
    const planetNatural = makePlanetTexture(THREE, false);

    const planet = new THREE.Group();
    group.add(planet);
    const atmosphere = makeGlowSprite(THREE, glowTexture, { color: PALETTE.blue, opacity: 0.72, scale: 4.35 });
    planet.add(atmosphere);
    const ocean = new THREE.Mesh(
      new THREE.SphereGeometry(1.82, 128, 64),
      new THREE.MeshPhongMaterial({ map: planetFalsecolour, color: '#ffffff', emissive: '#020712', shininess: 8 }),
    );
    ocean.rotation.set(0.16, -0.48, -0.08);
    planet.add(ocean);
    const limb = new THREE.Mesh(
      new THREE.RingGeometry(1.79, 1.94, 128),
      new THREE.MeshBasicMaterial({ color: PALETTE.cyan, transparent: true, opacity: 0.48, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    limb.position.z = 0.32;
    planet.add(limb);

    const zones = [
      createSectorMesh(THREE, { innerRadius: 0, outerRadius: 0.58, start: -0.92, end: 0.92, color: '#ffdc72', opacity: 0.95, depth: 0.34 }),
      createSectorMesh(THREE, { innerRadius: 0.58, outerRadius: 1.36, start: -0.92, end: 0.92, color: '#d75c2d', opacity: 0.88, depth: 0.3 }),
      createSectorMesh(THREE, { innerRadius: 1.36, outerRadius: 1.74, start: -0.92, end: 0.92, color: '#7750d7', opacity: 0.82, depth: 0.24 }),
      createSectorMesh(THREE, { innerRadius: 1.74, outerRadius: 1.86, start: -0.92, end: 0.92, color: '#62e1a7', opacity: 0.9, depth: 0.18 }),
    ];
    for (const [index, mesh] of zones.entries()) {
      mesh.rotation.z = -0.18;
      mesh.position.z = 1.92 + index * 0.025;
      planet.add(mesh);
    }

    const convection = [];
    for (let i = 0; i < 6; i += 1) {
      const loop = createArcLine(THREE, { radiusX: 0.28 + (i % 3) * 0.13, radiusY: 0.64, color: i % 2 ? PALETTE.gold : PALETTE.pink, opacity: 0.5, z: 0.09, segments: 80 });
      loop.position.set(0.72 + (i % 3) * 0.3, -0.42 + Math.floor(i / 3) * 0.76, 0);
      loop.scale.x = i < 3 ? 1 : -1;
      planet.add(loop);
      convection.push(loop);
    }

    const magnetosphere = new THREE.Group();
    const fieldLines = [];
    for (let i = 0; i < 8; i += 1) {
      const line = createArcLine(THREE, { radiusX: 2.35 + i * 0.26, radiusY: 1.05 + i * 0.19, color: i % 2 ? PALETTE.cyan : PALETTE.green, opacity: 0.24, z: -0.06, segments: 120 });
      line.rotation.z = (i - 3.5) * 0.045;
      magnetosphere.add(line);
      fieldLines.push(line);
    }
    group.add(magnetosphere);

    const auroras = [];
    const curtains = [];
    for (const y of [-1.62, 1.62]) {
      for (let i = 0; i < 11; i += 1) {
        const sprite = makeGlowSprite(THREE, auroraTexture, { color: PALETTE.green, opacity: 0.72, scale: 0.28 });
        const angle = -1.15 + i * 2.3 / 10;
        sprite.position.set(Math.sin(angle) * 0.65, y + Math.cos(angle) * 0.08 * Math.sign(y), 1.94);
        planet.add(sprite);
        auroras.push(sprite);
      }
      for (let i = 0; i < 8; i += 1) {
        const x = -0.62 + i * 0.18;
        const curtain = createArcLine(THREE, { radiusX: 0.05, radiusY: 0.32 + (i % 3) * 0.05, start: -1.25, end: 1.25, color: PALETTE.green, opacity: 0.4, z: 0.2, segments: 28 });
        curtain.position.set(x, y, 1.94);
        curtain.rotation.z = Math.PI / 2;
        planet.add(curtain);
        curtains.push(curtain);
      }
    }

    const contours = createContourLayer(THREE, { levels: [-0.7, -0.45, -0.2, 0.05, 0.3, 0.55, 0.8], opacity: 0.88 });
    const contourHost = new THREE.Object3D();
    contourHost.position.z = 0.22;
    planet.add(contourHost);
    contourHost.add(contours.object);

    const waveRings = Array.from({ length: 4 }, (_, index) => {
      const ring = createArcLine(THREE, { radiusX: 1, radiusY: 1, color: index % 2 ? PALETTE.pink : PALETTE.gold, opacity: 0.28, z: 0.24, segments: 96 });
      planet.add(ring);
      return ring;
    });

    const columns = 81;
    const rows = 81;
    const modeHeight = (col, row, time, pulse) => {
      const x = -1.86 + col * 3.72 / (columns - 1);
      const y = 1.86 - row * 3.72 / (rows - 1);
      const r = Math.hypot(x, y);
      if (r > 1.86) return -10;
      const theta = Math.atan2(y, x);
      const football = Math.cos(2 * theta) * (1 - (r / 1.86) ** 2);
      return football + pulse * Math.sin(r * 8 - time * 5) * Math.exp(-r * 0.7);
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'planetary';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const lensOn = Boolean(state.tTheory && state.level >= 8);
        const styleTime = motionOn ? time : 0;
        const vividZones = ['#ffdc72', '#d75c2d', '#7750d7', '#62e1a7'];
        const naturalZones = ['#d9c48a', '#9a5f32', '#6e5848', '#8ba391'];
        if (ocean.material.map !== (falsecolourOn ? planetFalsecolour : planetNatural)) {
          ocean.material.map = falsecolourOn ? planetFalsecolour : planetNatural;
          ocean.material.emissive.set(falsecolourOn ? '#020712' : '#050607');
          ocean.material.needsUpdate = true;
        }
        setMaterialColor(limb.material, falsecolourOn ? PALETTE.cyan : '#9fb7c6');
        setGlowBlending(THREE, limb.material, glowOn);
        atmosphere.visible = glowOn;
        for (const [index, zone] of zones.entries()) setMaterialColor(zone.material, falsecolourOn ? vividZones[index] : naturalZones[index]);
        for (const [index, loop] of convection.entries()) setMaterialColor(loop.material, falsecolourOn ? (index % 2 ? PALETTE.gold : PALETTE.pink) : '#c4a16e');
        for (const [index, line] of fieldLines.entries()) setMaterialColor(line.material, falsecolourOn ? (index % 2 ? PALETTE.cyan : PALETTE.green) : '#7fa3aa');
        for (const [index, ringLine] of waveRings.entries()) {
          setMaterialColor(ringLine.material, falsecolourOn ? (index % 2 ? PALETTE.pink : PALETTE.gold) : '#c7c0aa');
          setGlowBlending(THREE, ringLine.material, glowOn);
        }
        const ring = Math.exp(-2.7 * (state.responseTime ?? 0)) * Math.sin((state.responseTime ?? 0) * Math.PI * 6);
        const idle = (motionOn ? 0.028 * Math.sin(time * 0.55) : 0);
        const deformation = idle + ring * 0.18 + pulse * 0.16;
        planet.scale.set(1 + deformation, 1 - deformation * 0.82, 1 + deformation * 0.24);
        planet.rotation.z = motionOn ? 0.08 * Math.sin(time * 0.12) : 0;
        ocean.rotation.y = -0.48 + styleTime * 0.045;
        for (const [index, loop] of convection.entries()) loop.rotation.z = styleTime * (index % 2 ? -0.24 : 0.24) + index;
        magnetosphere.visible = lensOn || state.contours;
        for (const [index, line] of fieldLines.entries()) {
          setGlowBlending(THREE, line.material, glowOn);
          line.material.opacity = lensOn ? (glowOn ? 0.2 : 0.34) + (motionOn ? 0.14 * Math.sin(time * 0.65 + index) ** 2 : 0.04) : 0;
        }
        for (const [index, sprite] of auroras.entries()) {
          sprite.visible = glowOn;
          sprite.material.opacity = glowOn ? 0.42 + (motionOn ? 0.32 * Math.sin(time * 1.4 + index * 0.7) ** 2 : 0.18) : 0;
        }
        for (const [index, curtain] of curtains.entries()) {
          setGlowBlending(THREE, curtain.material, glowOn);
          setMaterialColor(curtain.material, falsecolourOn ? PALETTE.green : '#b6d6bf');
          curtain.material.opacity = glowOn ? 0.28 + (motionOn ? 0.2 * Math.sin(time * 1.3 + index) ** 2 : 0.1) : 0.18;
        }
        for (const [index, ringLine] of waveRings.entries()) {
          const radius = 0.5 + ((state.responseTime ?? 0.35) * 1.7 + index * 0.34) % 1.75;
          ringLine.scale.set(radius, radius * (1 + deformation * 1.4), 1);
          ringLine.material.opacity = (pulse > 0.01 ? 0.22 + pulse * 0.42 : (glowOn ? 0.08 : 0.2)) * (1 - index * 0.13);
        }
        contourHost.visible = lensOn || state.contours;
        contours.update({
          columns,
          rows,
          height: (col, row) => modeHeight(col, row, styleTime, pulse),
          x: col => -1.86 + col * 3.72 / (columns - 1),
          y: row => 1.86 - row * 3.72 / (rows - 1),
          lift: 0.03,
          visible: lensOn || state.contours,
        });
        setContourStyle(contours, falsecolourOn, '#a9b2aa');
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        planetFalsecolour.dispose();
        planetNatural.dispose();
      },
    };
  },
};

export default planetaryRenderer;
