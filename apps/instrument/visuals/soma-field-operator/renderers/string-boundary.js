import { createDynamicLine, disposeTree, ensureOperatorCanvasSize, getRiceStyle, makeLabelSprite, makeRadialTexture, setLinePoints } from './lib/micro-primitives.js';

export const stringBoundaryRenderer = {
  id: 'string-boundary',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const sparkTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.2, 'rgba(246,199,90,0.82)'],
      [0.55, 'rgba(20,229,255,0.24)'],
      [1, 'rgba(20,229,255,0)'],
    ]);

    const brane = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 2.2, 18, 8),
      new THREE.MeshBasicMaterial({ color: 0x3d7bff, transparent: true, opacity: 0.08, wireframe: true, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    brane.position.set(0.25, -0.62, -0.18);
    brane.rotation.x = -0.22;
    group.add(brane);

    const closed = createDynamicLine(THREE, 121, { color: '#14e5ff', opacity: 0.95 });
    const open = createDynamicLine(THREE, 91, { color: '#f6c75a', opacity: 0.92 });
    group.add(closed, open);

    const traces = Array.from({ length: 7 }, (_, index) => {
      const line = createDynamicLine(THREE, 91, { color: index % 2 ? '#8f47ff' : '#14e5ff', opacity: 0.12 });
      group.add(line);
      return line;
    });

    const endpointMaterial = new THREE.SpriteMaterial({ map: sparkTexture, color: 0xff3bce, transparent: true, opacity: 0.72, depthWrite: false, blending: THREE.AdditiveBlending });
    const endpoints = [new THREE.Sprite(endpointMaterial.clone()), new THREE.Sprite(endpointMaterial.clone())];
    for (const sprite of endpoints) {
      sprite.scale.setScalar(0.18);
      group.add(sprite);
    }

    const source = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTexture, color: 0xf6c75a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    source.position.set(-0.35, 0.04, 0.32);
    source.scale.setScalar(0.24);
    group.add(source);

    const responseRings = Array.from({ length: 9 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.26 + index * 0.18, 0.008, 6, 96),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0x56f0a2 : 0x14e5ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      ring.position.copy(source.position);
      ring.rotation.x = Math.PI / 2 - 0.22;
      group.add(ring);
      return ring;
    });

    const ticks = Array.from({ length: 24 }, () => {
      const line = createDynamicLine(THREE, 2, { color: '#56f0a2', opacity: 0 });
      group.add(line);
      return line;
    });

    const compact = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.36, 0.018, 96, 8, 2, 5),
      new THREE.MeshBasicMaterial({ color: 0x8f47ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    compact.position.set(1.8, 0.95, 0.12);
    group.add(compact);

    const label = makeLabelSprite(THREE, ['Gstring(s,s′)', 'log |s - s′| response'], { border: '#8f47ff', scale: [1.62, 0.42, 1] });
    label.position.set(1.82, 1.55, 0.12);
    label.material.opacity = 0;
    group.add(label);

    const scaleLabel = makeLabelSprite(THREE, ['10^-32 m', 'worldsheet boundary'], { border: '#14e5ff', scale: [1.45, 0.38, 1], width: 620, height: 150 });
    scaleLabel.position.set(-2.55, -1.75, 0.15);
    group.add(scaleLabel);

    function openPoint(u, time, impulse = 0) {
      const x = -1.62 + u * 3.24;
      const envelope = Math.sin(Math.PI * u);
      const mode1 = Math.sin(Math.PI * u) * Math.sin(time * 2.1);
      const mode3 = Math.sin(3 * Math.PI * u) * Math.sin(time * 3.2 + 0.7);
      const poke = impulse * Math.sin(5 * Math.PI * u - time * 5.6);
      return [x, -0.55 + envelope * (0.42 * mode1 + 0.15 * mode3 + 0.18 * poke), 0.1 + envelope * 0.34 * Math.cos(time * 1.4 + u * Math.PI * 2)];
    }

    function redrawStringLines(time, pulse, lens) {
      const loop = [];
      for (let index = 0; index <= 120; index += 1) {
        const theta = (index / 120) * Math.PI * 2;
        const r = 0.68 + 0.08 * Math.sin(theta * 3 - time * 2.4) + 0.045 * Math.sin(theta * 5 + time * 1.5);
        loop.push([-1.17 + Math.cos(theta) * r, 0.58 + Math.sin(theta) * r * 0.58, 0.06 + Math.sin(theta * 2 + time) * 0.2]);
      }
      setLinePoints(closed, loop);
      const segment = [];
      for (let index = 0; index <= 90; index += 1) segment.push(openPoint(index / 90, time, pulse));
      setLinePoints(open, segment);
      endpoints[0].position.set(...segment[0]);
      endpoints[1].position.set(...segment[segment.length - 1]);
      for (const [traceIndex, trace] of traces.entries()) {
        const tracePoints = [];
        const traceTime = time - (traceIndex + 1) * 0.28;
        for (let index = 0; index <= 90; index += 1) {
          const point = openPoint(index / 90, traceTime, 0);
          tracePoints.push([point[0], point[1] - 0.045 * (traceIndex + 1), point[2] - 0.1 * (traceIndex + 1)]);
        }
        setLinePoints(trace, tracePoints);
        trace.material.opacity = lens ? 0.22 - traceIndex * 0.022 : 0.09 - traceIndex * 0.009;
      }
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'string-boundary';
        group.visible = active;
        if (!active) return;
        ensureOperatorCanvasSize();
        const style = getRiceStyle(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        redrawStringLines(t, pulse, lens);
        group.rotation.y = style.motion ? Math.sin(t * 0.12) * 0.14 : 0;
        for (const material of [endpointMaterial, ...endpoints.map(sprite => sprite.material), source.material, compact.material]) material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        for (const line of [closed, open, ...traces, ...ticks]) line.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        for (const ring of responseRings) ring.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        closed.material.color.set(style.falsecolour ? 0x14e5ff : 0xb0bac0);
        open.material.color.set(style.falsecolour ? 0xf6c75a : 0xc2b896);
        brane.material.color.set(style.falsecolour ? 0x3d7bff : 0x41506a);
        brane.material.opacity = (lens ? 0.14 : 0.08) + pulse * 0.03;
        closed.material.opacity = 0.78 + pulse * 0.12;
        open.material.opacity = 0.82 + pulse * 0.14;
        source.material.opacity = lens && style.glow ? 0.45 + pulse * 0.5 : 0;
        source.scale.setScalar(0.22 + pulse * 0.22);
        compact.visible = lens;
        compact.material.opacity = lens ? (style.glow ? 0.46 + pulse * 0.16 : 0.28) : 0;
        compact.rotation.set(style.motion ? t * 0.24 : 0, style.motion ? t * 0.37 : 0, style.motion ? t * 0.16 : 0);
        label.visible = lens;
        label.material.opacity = lens ? 0.68 : 0;
        for (const [index, ring] of responseRings.entries()) {
          ring.visible = lens;
          const logFalloff = 1 / Math.log(index + 2.5);
          ring.scale.setScalar(1 + pulse * 0.45 + (style.motion ? Math.sin(t * 0.8 + index) * 0.015 : 0));
          ring.material.opacity = lens ? (style.glow ? 0.16 * logFalloff + pulse * 0.18 * Math.max(0, 1 - index / responseRings.length) : 0.11 * logFalloff + pulse * 0.1) : 0;
        }
        for (const [index, tick] of ticks.entries()) {
          const u = (index + 0.5) / ticks.length;
          const point = openPoint(u, time, pulse);
          const normal = [0, 0.12 + (style.motion ? 0.04 * Math.sin(index + t * 2.4) : 0), 0.03];
          setLinePoints(tick, [[point[0], point[1], point[2]], [point[0], point[1] + normal[1], point[2] + normal[2]]]);
          tick.visible = lens;
          tick.material.opacity = lens ? 0.58 * (style.motion ? 0.55 + 0.45 * Math.sin(t * 2 + index) : 0.65) : 0;
        }
      },
      dispose() {
        scene.remove(group);
        disposeTree(group);
        sparkTexture.dispose();
      },
    };
  },
};

export default stringBoundaryRenderer;
