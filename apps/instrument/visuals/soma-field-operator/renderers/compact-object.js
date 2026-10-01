import { createContourLayer } from './lib/contours.js';
import { PALETTE, createArcLine, createPolyline, disposeObject, makeGlowSprite, makeRadialTexture, setContourStyle, setGlowBlending, setMaterialColor, styleFlags } from './lib/planetary-helpers.js';

export const compactObjectRenderer = {
  id: 'compact-object',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);

    const glowTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.98)'],
      [0.18, 'rgba(20,229,255,0.58)'],
      [0.58, 'rgba(255,59,206,0.22)'],
      [1, 'rgba(255,59,206,0)'],
    ]);
    const goldTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.22, 'rgba(246,199,90,0.74)'],
      [1, 'rgba(246,199,90,0)'],
    ]);

    const blackHole = new THREE.Group();
    blackHole.position.set(-1.1, 0.1, 0);
    group.add(blackHole);
    const lensRing = new THREE.Mesh(
      new THREE.RingGeometry(0.5, 0.58, 160),
      new THREE.MeshBasicMaterial({ color: PALETTE.gold, transparent: true, opacity: 0.7, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
    );
    const horizon = new THREE.Mesh(
      new THREE.SphereGeometry(0.43, 48, 32),
      new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 1 }),
    );
    blackHole.add(lensRing, horizon);
    const discSurfaceGeometry = new THREE.RingGeometry(0.68, 1.82, 192, 6);
    const colors = [];
    const color = new THREE.Color();
    const positions = discSurfaceGeometry.getAttribute('position');
    for (let i = 0; i < positions.count; i += 1) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const radius = Math.hypot(x, y);
      const angle = Math.atan2(y, x);
      const innerHeat = 1 - Math.min(1, Math.max(0, (radius - 0.68) / 1.14));
      const dopplerBoost = 0.55 + 0.45 * Math.max(0, Math.cos(angle - 0.35));
      color.setHSL(0.05 + innerHeat * 0.08, 1, 0.28 + innerHeat * 0.38 + dopplerBoost * 0.24);
      colors.push(color.r, color.g, color.b);
    }
    discSurfaceGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    const discSurface = new THREE.Mesh(
      discSurfaceGeometry,
      new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.62, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    discSurface.rotation.set(0.38, 0, -0.18);
    discSurface.scale.y = 0.42;
    discSurface.position.z = -0.08;
    blackHole.add(discSurface);
    const discRings = [];
    for (let i = 0; i < 7; i += 1) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.76 + i * 0.14, 0.83 + i * 0.14, 128),
        new THREE.MeshBasicMaterial({ color: i < 3 ? PALETTE.gold : PALETTE.pink, transparent: true, opacity: 0.22 + i * 0.035, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.rotation.set(0.38, 0, -0.12);
      ring.scale.y = 0.42;
      blackHole.add(ring);
      discRings.push(ring);
    }
    const doppler = createArcLine(THREE, { radiusX: 1.2, radiusY: 0.4, start: -0.25, end: 1.28, color: '#fff0a8', opacity: 0.95, z: 0.13, segments: 56 });
    doppler.rotation.x = 0.38;
    doppler.scale.y = 0.42;
    blackHole.add(doppler);
    const hotEdge = new THREE.Mesh(
      new THREE.RingGeometry(0.64, 0.7, 128),
      new THREE.MeshBasicMaterial({ color: '#fff0a8', transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }),
    );
    hotEdge.rotation.set(0.38, 0, -0.12);
    hotEdge.scale.y = 0.42;
    blackHole.add(hotEdge);
    const lensedFarSide = [];
    for (let i = 0; i < 4; i += 1) {
      const arc = createArcLine(THREE, { radiusX: 0.92 + i * 0.16, radiusY: 0.46 + i * 0.08, start: 0.05, end: Math.PI - 0.05, color: i < 2 ? PALETTE.gold : PALETTE.pink, opacity: 0.34, z: 0.26 + i * 0.012, segments: 72 });
      arc.position.y = 0.28 + i * 0.08;
      blackHole.add(arc);
      lensedFarSide.push(arc);
    }
    const jets = [
      createPolyline(THREE, [new THREE.Vector3(0, 0.45, 0), new THREE.Vector3(0.1, 1.25, 0), new THREE.Vector3(0.22, 2.05, 0)], { color: PALETTE.cyan, opacity: 0.74, blending: THREE.AdditiveBlending }),
      createPolyline(THREE, [new THREE.Vector3(0, -0.45, 0), new THREE.Vector3(-0.1, -1.25, 0), new THREE.Vector3(-0.22, -2.05, 0)], { color: PALETTE.cyan, opacity: 0.74, blending: THREE.AdditiveBlending }),
    ];
    blackHole.add(...jets);

    const pulsar = new THREE.Group();
    pulsar.position.set(2.1, -0.55, 0);
    group.add(pulsar);
    const neutronStar = makeGlowSprite(THREE, glowTexture, { color: PALETTE.blue, opacity: 0.88, scale: 0.58 });
    const neutronDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.15, 48),
      new THREE.MeshBasicMaterial({ color: PALETTE.blue, transparent: true, opacity: 0.85 }),
    );
    const beamA = createPolyline(THREE, [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.15, 0.18, 0), new THREE.Vector3(2.0, 0.28, 0)], { color: PALETTE.green, opacity: 0.62, blending: THREE.AdditiveBlending });
    const beamB = createPolyline(THREE, [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-1.15, -0.18, 0), new THREE.Vector3(-2.0, -0.28, 0)], { color: PALETTE.green, opacity: 0.62, blending: THREE.AdditiveBlending });
    const magnet = createArcLine(THREE, { radiusX: 0.62, radiusY: 0.28, color: PALETTE.violet, opacity: 0.55, z: 0.05, segments: 80 });
    pulsar.add(neutronStar, neutronDisc, beamA, beamB, magnet);

    const grid = new THREE.Group();
    grid.position.set(0, -1.72, -0.35);
    for (let i = -6; i <= 6; i += 1) {
      grid.add(createPolyline(THREE, [new THREE.Vector3(i * 0.42, -0.75, 0), new THREE.Vector3(i * 0.42, 0.75, 0)], { color: '#255078', opacity: 0.28 }));
      grid.add(createPolyline(THREE, [new THREE.Vector3(-2.5, i * 0.12, 0), new THREE.Vector3(2.5, i * 0.12, 0)], { color: '#255078', opacity: 0.28 }));
    }
    group.add(grid);
    const gwRipples = Array.from({ length: 6 }, (_, index) => {
      const ring = createArcLine(THREE, { radiusX: 1, radiusY: 0.38, color: index % 2 ? PALETTE.pink : PALETTE.cyan, opacity: 0.18, z: 0.06, segments: 96 });
      grid.add(ring);
      return ring;
    });

    const responseHost = new THREE.Object3D();
    responseHost.position.z = 0.2;
    group.add(responseHost);
    const contours = createContourLayer(THREE, { levels: [-0.7, -0.46, -0.24, 0, 0.24, 0.46, 0.7], opacity: 0.85 });
    responseHost.add(contours.object);
    const shells = Array.from({ length: 5 }, (_, index) => {
      const shell = makeGlowSprite(THREE, index % 2 ? goldTexture : glowTexture, { color: index % 2 ? PALETTE.gold : PALETTE.cyan, opacity: 0.22, scale: 1.4 + index * 0.55 });
      shell.position.copy(blackHole.position);
      group.add(shell);
      return shell;
    });

    const columns = 81;
    const rows = 57;
    const kernelHeight = (col, row, time, pulse) => {
      const x = -4 + col * 8 / (columns - 1);
      const y = 2.2 - row * 4.4 / (rows - 1);
      const r = Math.hypot(x - blackHole.position.x, y - blackHole.position.y);
      const qnm = Math.exp(-r * 0.75) * Math.cos(r * 7.5 - time * 2.2);
      return qnm + pulse * Math.exp(-r * 0.55) * Math.cos(r * 10 - time * 8);
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'compact-object';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const lensOn = Boolean(state.tTheory && state.level >= 8);
        const styleTime = motionOn ? time : 0;
        blackHole.rotation.z = styleTime * 0.1;
        discSurface.rotation.z = -0.18 + styleTime * 0.34;
        discSurface.material.opacity = glowOn ? 0.54 : 0.38;
        setGlowBlending(THREE, discSurface.material, glowOn);
        setGlowBlending(THREE, lensRing.material, glowOn);
        setMaterialColor(lensRing.material, falsecolourOn ? PALETTE.gold : '#b7a77d');
        for (const [index, ring] of discRings.entries()) {
          ring.rotation.z = -0.12 + styleTime * (0.28 + index * 0.04);
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index < 3 ? PALETTE.gold : PALETTE.pink) : (index < 3 ? '#b78957' : '#9b716a'));
          ring.material.opacity = glowOn ? 0.22 + index * 0.035 : 0.34;
        }
        setGlowBlending(THREE, hotEdge.material, glowOn);
        setMaterialColor(hotEdge.material, falsecolourOn ? '#fff0a8' : '#d5c28d');
        hotEdge.rotation.z = -0.12 + styleTime * 0.42;
        hotEdge.material.opacity = glowOn ? 0.65 + (motionOn ? 0.18 * Math.sin(time * 1.6) : 0) : 0.42;
        for (const [index, arc] of lensedFarSide.entries()) {
          setGlowBlending(THREE, arc.material, glowOn);
          setMaterialColor(arc.material, falsecolourOn ? (index < 2 ? PALETTE.gold : PALETTE.pink) : '#b89b77');
          arc.material.opacity = glowOn ? 0.28 + index * 0.04 : 0.22;
        }
        setGlowBlending(THREE, doppler.material, glowOn);
        setMaterialColor(doppler.material, falsecolourOn ? '#fff0a8' : '#c8b98e');
        doppler.material.opacity = (glowOn ? 0.72 : 0.5) + (motionOn ? 0.22 * Math.sin(time * 1.7) : 0);
        lensRing.scale.setScalar(1 + (motionOn ? 0.04 * Math.sin(time * 1.3) : 0) + pulse * 0.08);
        pulsar.rotation.z = styleTime * 1.45;
        neutronStar.visible = glowOn;
        setMaterialColor(neutronDisc.material, falsecolourOn ? PALETTE.blue : '#8fa6b8');
        setGlowBlending(THREE, beamA.material, glowOn);
        setGlowBlending(THREE, beamB.material, glowOn);
        setGlowBlending(THREE, magnet.material, glowOn);
        setMaterialColor(beamA.material, falsecolourOn ? PALETTE.green : '#9eb7a5');
        setMaterialColor(beamB.material, falsecolourOn ? PALETTE.green : '#9eb7a5');
        setMaterialColor(magnet.material, falsecolourOn ? PALETTE.violet : '#aaa0ba');
        for (const jet of jets) {
          setGlowBlending(THREE, jet.material, glowOn);
          setMaterialColor(jet.material, falsecolourOn ? PALETTE.cyan : '#9bb7c0');
          jet.material.opacity = glowOn ? 0.74 : 0.42;
        }
        beamA.material.opacity = (glowOn ? 0.22 : 0.36) + (motionOn ? 0.52 * Math.sin(time * 2.9) ** 2 : 0.18);
        beamB.material.opacity = beamA.material.opacity;
        const ringPhase = state.responseTime ?? 0.35;
        for (const [index, ring] of gwRipples.entries()) {
          setGlowBlending(THREE, ring.material, glowOn);
          setMaterialColor(ring.material, falsecolourOn ? (index % 2 ? PALETTE.pink : PALETTE.cyan) : '#b8b8b0');
          const radius = 0.35 + ((ringPhase * 2.7 + index * 0.42) % 2.45);
          ring.scale.set(radius, radius, 1);
          ring.material.opacity = (glowOn ? 0.08 : 0.18) + pulse * (0.55 - index * 0.07);
        }
        responseHost.visible = lensOn || state.contours;
        contours.update({
          columns,
          rows,
          height: (col, row) => kernelHeight(col, row, styleTime, pulse),
          x: col => -4 + col * 8 / (columns - 1),
          y: row => 2.2 - row * 4.4 / (rows - 1),
          lift: 0.04,
          visible: lensOn || state.contours,
        });
        setContourStyle(contours, falsecolourOn, '#b8b4aa');
        for (const [index, shell] of shells.entries()) {
          shell.visible = lensOn;
          setGlowBlending(THREE, shell.material, glowOn);
          setMaterialColor(shell.material, falsecolourOn ? (index % 2 ? PALETTE.gold : PALETTE.cyan) : '#b9b1a0');
          shell.visible = lensOn && glowOn;
          shell.material.opacity = lensOn && glowOn ? 0.08 + (motionOn ? 0.14 * Math.sin(time * 0.7 + index) ** 2 : 0.05) + pulse * 0.12 : 0;
          shell.scale.setScalar(1.15 + index * 0.45 + pulse * 0.75);
        }
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
      },
    };
  },
};

export default compactObjectRenderer;
