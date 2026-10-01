import { createContourLayer } from './lib/contours.js';
import { PALETTE, createArcLine, createPolyline, disposeObject, makeGlowSprite, makeRadialTexture, setContourStyle, setGlowBlending, setMaterialColor, styleFlags } from './lib/planetary-helpers.js';

function makePlanetDotTexture(THREE, light, mid, dark) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(44, 38, 2, 64, 64, 62);
  gradient.addColorStop(0, light);
  gradient.addColorStop(0.45, mid);
  gradient.addColorStop(1, dark);
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(64, 64, 61, 0, Math.PI * 2);
  context.fill();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const orbitalSystemRenderer = {
  id: 'orbital-system',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);

    const starTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.16, 'rgba(246,199,90,0.95)'],
      [0.45, 'rgba(255,95,34,0.28)'],
      [1, 'rgba(255,95,34,0)'],
    ], 192);
    const particleTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.95)'],
      [0.3, 'rgba(20,229,255,0.58)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const planetTextures = [
      makePlanetDotTexture(THREE, '#8ff0ff', '#167a88', '#071d28'),
      makePlanetDotTexture(THREE, '#e4d59a', '#6cb88b', '#24311f'),
      makePlanetDotTexture(THREE, '#ff8ad9', '#81315f', '#1c0a1a'),
    ];
    const mutedPlanetTextures = [
      makePlanetDotTexture(THREE, '#c2d0d4', '#6d8085', '#263038'),
      makePlanetDotTexture(THREE, '#c8b98f', '#80755a', '#302b21'),
      makePlanetDotTexture(THREE, '#c5b4b4', '#806c6c', '#2d2424'),
    ];

    const star = makeGlowSprite(THREE, starTexture, { color: PALETTE.gold, opacity: 0.95, scale: 1.18 });
    star.position.set(-1.15, 0.1, 0.03);
    group.add(star);
    const starDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.21, 48),
      new THREE.MeshBasicMaterial({ color: '#f2c061', transparent: true, opacity: 0.9 }),
    );
    starDisc.position.copy(star.position);
    starDisc.position.z = 0.09;
    group.add(starDisc);

    const orbitDefs = [
      { rx: 1.18, ry: 0.72, speed: 0.38, size: 0.13, color: PALETTE.cyan, phase: 0.4 },
      { rx: 2.0, ry: 1.18, speed: 0.21, size: 0.18, color: PALETTE.green, phase: 2.1, ringed: true },
      { rx: 2.85, ry: 1.72, speed: 0.12, size: 0.15, color: PALETTE.pink, phase: 4.2 },
    ];
    const planets = orbitDefs.map(def => {
      const orbit = createArcLine(THREE, { radiusX: def.rx, radiusY: def.ry, color: '#6fc8ff', opacity: 0.23, z: -0.03, segments: 160 });
      orbit.position.copy(star.position);
      group.add(orbit);
      const planet = new THREE.Mesh(
        new THREE.CircleGeometry(def.size, 32),
        new THREE.MeshBasicMaterial({ map: planetTextures[orbitDefs.indexOf(def)], color: '#ffffff', transparent: true, opacity: 0.92 }),
      );
      group.add(planet);
      let ring = null;
      if (def.ringed) {
        ring = new THREE.Mesh(
          new THREE.RingGeometry(def.size * 1.35, def.size * 2.15, 48),
          new THREE.MeshBasicMaterial({ color: PALETTE.gold, transparent: true, opacity: 0.62, depthWrite: false, side: THREE.DoubleSide }),
        );
        ring.scale.y = 0.35;
        group.add(ring);
      }
      return { ...def, orbit, planet, ring };
    });

    const moonOrbit = createArcLine(THREE, { radiusX: 0.28, radiusY: 0.13, color: '#dff9ff', opacity: 0.32, z: 0.06, segments: 48 });
    const moon = new THREE.Mesh(new THREE.CircleGeometry(0.045, 16), new THREE.MeshBasicMaterial({ color: '#dfeaff', transparent: true, opacity: 0.8 }));
    group.add(moonOrbit, moon);

    const belt = new THREE.Group();
    const beltParticles = [];
    for (let i = 0; i < 520; i += 1) {
      const sprite = makeGlowSprite(THREE, particleTexture, { color: i % 3 ? PALETTE.cyan : PALETTE.gold, opacity: 0.48, scale: 0.035 + (i % 5) * 0.006 });
      const radius = 2.15 + (i % 37) * 0.011 + 0.08 * Math.sin(i * 1.7);
      const angle = i * 2.399963;
      const lane = i % 2 ? 1 : -1;
      beltParticles.push({ sprite, radius, angle, lane, speed: 0.018 + 0.012 / radius, scale: sprite.scale.x });
      belt.add(sprite);
    }
    belt.position.copy(star.position);
    group.add(belt);

    const comet = new THREE.Group();
    const cometHead = makeGlowSprite(THREE, particleTexture, { color: '#eaf5ff', opacity: 0.9, scale: 0.18 });
    const ionTail = createPolyline(THREE, [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.8, 0.14, -0.01), new THREE.Vector3(1.55, 0.2, -0.01)], { color: PALETTE.cyan, opacity: 0.62, blending: THREE.AdditiveBlending });
    const dustTail = createPolyline(THREE, [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.65, -0.16, -0.01), new THREE.Vector3(1.35, -0.36, -0.01)], { color: PALETTE.gold, opacity: 0.48, blending: THREE.AdditiveBlending });
    comet.add(cometHead, ionTail, dustTail);
    group.add(comet);

    const potentialHost = new THREE.Object3D();
    group.add(potentialHost);
    const contours = createContourLayer(THREE, { levels: [-1.45, -1.1, -0.84, -0.62, -0.45, -0.3, -0.18], opacity: 0.78 });
    potentialHost.add(contours.object);
    const ripples = Array.from({ length: 5 }, (_, index) => {
      const ripple = createArcLine(THREE, { radiusX: 1, radiusY: 0.72, color: index % 2 ? PALETTE.pink : PALETTE.green, opacity: 0.18, z: 0.12, segments: 96 });
      group.add(ripple);
      return ripple;
    });

    const columns = 85;
    const rows = 57;
    const potential = (col, row, time) => {
      const x = -4 + col * 8 / (columns - 1);
      const y = 2.45 - row * 4.9 / (rows - 1);
      let value = -0.55 / Math.max(0.18, Math.hypot(x - star.position.x, y - star.position.y));
      for (const def of planets) {
        const theta = def.phase + time * def.speed;
        const px = star.position.x + Math.cos(theta) * def.rx;
        const py = star.position.y + Math.sin(theta) * def.ry;
        value += -0.12 / Math.max(0.15, Math.hypot(x - px, y - py));
      }
      return value;
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'orbital-system';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const lensOn = Boolean(state.tTheory && state.level >= 8);
        const styleTime = motionOn ? time : 0;
        star.visible = glowOn;
        setGlowBlending(THREE, star.material, glowOn);
        star.material.opacity = glowOn ? 0.82 + (motionOn ? 0.12 * Math.sin(time * 1.2) : 0.06) : 0;
        setMaterialColor(starDisc.material, falsecolourOn ? PALETTE.gold : '#d6b36c');
        const mutedPlanetColors = ['#7f9297', '#9b8a63', '#8b6f6f'];
        let ringedPosition = null;
        for (const [index, def] of planets.entries()) {
          const theta = def.phase + styleTime * def.speed;
          const x = star.position.x + Math.cos(theta) * def.rx;
          const y = star.position.y + Math.sin(theta) * def.ry;
          def.planet.position.set(x, y, 0.08);
          if (def.planet.material.map !== (falsecolourOn ? planetTextures[index] : mutedPlanetTextures[index])) {
            def.planet.material.map = falsecolourOn ? planetTextures[index] : mutedPlanetTextures[index];
            def.planet.material.needsUpdate = true;
          }
          setMaterialColor(def.planet.material, '#ffffff');
          setMaterialColor(def.orbit.material, falsecolourOn ? '#6fc8ff' : '#60707a');
          if (def.ring) {
            def.ring.position.copy(def.planet.position);
            def.ring.rotation.z = 0.45 + (motionOn ? 0.08 * Math.sin(time) : 0);
            setMaterialColor(def.ring.material, falsecolourOn ? PALETTE.gold : '#a89b78');
            ringedPosition = def.planet.position;
          }
        }
        if (ringedPosition) {
          moonOrbit.position.copy(ringedPosition);
          const moonTheta = styleTime * 1.25;
          moon.position.set(ringedPosition.x + Math.cos(moonTheta) * 0.28, ringedPosition.y + Math.sin(moonTheta) * 0.13, 0.11);
        }
        for (const particle of beltParticles) {
          const angle = particle.angle + styleTime * particle.speed * (particle.lane > 0 ? 1 : 0.62);
          const slide = motionOn ? 0.06 * particle.lane * Math.sin(time * 0.32 + particle.angle * 3) : 0;
          particle.sprite.position.set(
            Math.cos(angle) * (particle.radius + slide),
            Math.sin(angle) * (particle.radius * 0.57 + slide * 0.5),
            -0.02,
          );
          setGlowBlending(THREE, particle.sprite.material, glowOn);
          setMaterialColor(particle.sprite.material, falsecolourOn ? (particle.lane > 0 ? PALETTE.cyan : PALETTE.gold) : '#a0a0a0');
          particle.sprite.material.opacity = glowOn ? 0.28 + 0.28 * (particle.lane > 0 ? 1 : 0.7) : 0.32;
          particle.sprite.scale.setScalar(glowOn ? particle.scale : 0.018);
        }
        const cometAngle = 4.65 + styleTime * 0.105;
        comet.position.set(star.position.x + Math.cos(cometAngle) * 3.45, star.position.y + Math.sin(cometAngle) * 2.0, 0.16);
        comet.rotation.z = Math.atan2(comet.position.y - star.position.y, comet.position.x - star.position.x);
        setGlowBlending(THREE, cometHead.material, glowOn);
        setGlowBlending(THREE, ionTail.material, glowOn);
        setGlowBlending(THREE, dustTail.material, glowOn);
        setMaterialColor(ionTail.material, falsecolourOn ? PALETTE.cyan : '#aab8c0');
        setMaterialColor(dustTail.material, falsecolourOn ? PALETTE.gold : '#b0a58f');
        cometHead.material.opacity = glowOn ? 0.9 : 0.45;
        potentialHost.visible = lensOn || state.contours;
        contours.update({
          columns,
          rows,
          height: (col, row) => potential(col, row, styleTime),
          x: col => -4 + col * 8 / (columns - 1),
          y: row => 2.45 - row * 4.9 / (rows - 1),
          lift: 0.05,
          visible: lensOn || state.contours,
        });
        setContourStyle(contours, falsecolourOn, '#a7b0aa');
        for (const [index, ripple] of ripples.entries()) {
          ripple.visible = lensOn || pulse > 0.01;
          setGlowBlending(THREE, ripple.material, glowOn);
          setMaterialColor(ripple.material, falsecolourOn ? (index % 2 ? PALETTE.pink : PALETTE.green) : '#b7b1a5');
          const radius = 0.5 + ((state.responseTime ?? 0.2) * 3.2 + index * 0.55) % 3.2;
          ripple.position.copy(planets[2].planet.position);
          ripple.scale.set(radius, radius, 1);
          ripple.material.opacity = (lensOn ? (glowOn ? 0.1 : 0.18) : 0.02) + pulse * (0.5 - index * 0.07);
        }
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        for (const texture of [...planetTextures, ...mutedPlanetTextures]) texture.dispose();
      },
    };
  },
};

export default orbitalSystemRenderer;
