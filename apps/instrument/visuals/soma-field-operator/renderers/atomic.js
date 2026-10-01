import { createDynamicLine, disposeTree, ensureOperatorCanvasSize, getRiceStyle, makeLabelSprite, makeRadialTexture, setLinePoints } from './lib/micro-primitives.js';

function makeBalmerTexture(THREE, fluorescence = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 130;
  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(80,0,255,0.18)');
  gradient.addColorStop(0.35, 'rgba(0,160,255,0.16)');
  gradient.addColorStop(0.55, 'rgba(0,255,160,0.10)');
  gradient.addColorStop(0.76, 'rgba(255,190,0,0.13)');
  gradient.addColorStop(1, 'rgba(255,0,0,0.20)');
  context.fillStyle = 'rgba(3,5,12,0.92)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = gradient;
  context.fillRect(16, 24, canvas.width - 32, 62);
  const lines = fluorescence ? [
    [656, '#ff3324', '656'],
    [486, '#36c5ff', '486'],
    [434, '#6779ff', '434'],
    [410, '#8d4cff', '410'],
  ] : [
    [656, '#b58f86', '656'],
    [486, '#90a3ad', '486'],
    [434, '#8790aa', '434'],
    [410, '#8d849d', '410'],
  ];
  context.font = 'bold 20px monospace';
  context.textAlign = 'center';
  for (const [wavelength, color, label] of lines) {
    const x = 16 + ((wavelength - 400) / 300) * (canvas.width - 32);
    context.shadowColor = color;
    context.shadowBlur = 22;
    context.strokeStyle = color;
    context.lineWidth = wavelength === 656 ? 9 : 6;
    context.beginPath();
    context.moveTo(x, 18);
    context.lineTo(x, 94);
    context.stroke();
    context.fillStyle = color;
    context.fillText(`${label} nm`, x, 118);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeOrbitalPoints(THREE, count, mapper, palette) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorA = new THREE.Color(palette[0]);
  const colorB = new THREE.Color(palette[1]);
  for (let index = 0; index < count; index += 1) {
    const a = ((index * 0.61803398875) % 1);
    const b = ((index * 0.754877666) % 1);
    const c = ((index * 0.569840291) % 1);
    const point = mapper(a, b, c);
    positions[index * 3] = point[0];
    positions[index * 3 + 1] = point[1];
    positions[index * 3 + 2] = point[2];
    const color = colorA.clone().lerp(colorB, point[3] ?? b);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export const atomicRenderer = {
  id: 'atomic',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const glow = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.18, 'rgba(246,199,90,0.9)'],
      [0.58, 'rgba(20,229,255,0.22)'],
      [1, 'rgba(20,229,255,0)'],
    ]);
    const nucleus = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xf6c75a, transparent: true, opacity: 0.95, depthWrite: false, blending: THREE.AdditiveBlending }));
    nucleus.scale.setScalar(0.34);
    group.add(nucleus);

    const s1 = new THREE.Points(
      makeOrbitalPoints(THREE, 1250, (a, b, c) => {
        const theta = Math.acos(1 - 2 * a);
        const phi = Math.PI * 2 * b;
        const r = 0.2 + 1.05 * c ** 1.9;
        return [Math.sin(theta) * Math.cos(phi) * r, Math.cos(theta) * r * 0.76, Math.sin(theta) * Math.sin(phi) * r, c];
      }, ['#14e5ff', '#56f0a2']),
      new THREE.PointsMaterial({ size: 0.027, vertexColors: true, transparent: true, opacity: 0.46, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    const p2 = new THREE.Points(
      makeOrbitalPoints(THREE, 1300, (a, b, c) => {
        const sign = a < 0.5 ? -1 : 1;
        const theta = Math.acos(sign * (0.35 + 0.65 * b));
        const phi = Math.PI * 2 * c;
        const r = 0.75 + 1.0 * Math.abs(Math.cos(theta)) * (0.3 + b);
        return [Math.sin(theta) * Math.cos(phi) * r * 0.7, Math.cos(theta) * r, Math.sin(theta) * Math.sin(phi) * r * 0.7, Math.abs(Math.cos(theta))];
      }, ['#3d7bff', '#ff3bce']),
      new THREE.PointsMaterial({ size: 0.026, vertexColors: true, transparent: true, opacity: 0.38, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    const d3 = new THREE.Points(
      makeOrbitalPoints(THREE, 1500, (a, b, c) => {
        const theta = Math.PI * 2 * a;
        const lobe = b < 0.5 ? -1 : 1;
        const r = 1.25 + 0.9 * c;
        const pinch = Math.sin(theta * 2);
        return [Math.cos(theta) * r * 0.75, lobe * pinch * 0.75, Math.sin(theta) * r * 0.75, Math.abs(pinch)];
      }, ['#8f47ff', '#f6c75a']),
      new THREE.PointsMaterial({ size: 0.024, vertexColors: true, transparent: true, opacity: 0.32, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    group.add(s1, p2, d3);

    const neutralSpectrum = makeBalmerTexture(THREE, false);
    const fluorescenceSpectrum = makeBalmerTexture(THREE, true);
    const spectrum = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 0.52),
      new THREE.MeshBasicMaterial({ map: fluorescenceSpectrum, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    spectrum.position.set(0, -1.95, 0.2);
    group.add(spectrum);

    const photonWave = createDynamicLine(THREE, 80, { color: '#f6c75a', opacity: 0 });
    group.add(photonWave);
    const photon = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xf6c75a, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    photon.scale.setScalar(0.18);
    group.add(photon);

    const rings = Array.from({ length: 8 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.45 + index * 0.28, 0.008, 6, 128),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0x56f0a2 : 0x14e5ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      group.add(ring);
      return ring;
    });
    const coulombLabel = makeLabelSprite(THREE, ['G_C(r) = 1 / 4πr', 'Coulomb response contours'], { border: '#56f0a2', scale: [2.25, 0.46, 1] });
    coulombLabel.position.set(2.05, 1.55, 0.1);
    coulombLabel.material.opacity = 0;
    group.add(coulombLabel);
    const scaleLabel = makeLabelSprite(THREE, ['~ 1 Å', 'Balmer fluorescence'], { border: '#f6c75a', scale: [1.3, 0.34, 1], width: 560, height: 140 });
    scaleLabel.position.set(-2.4, -1.58, 0.1);
    group.add(scaleLabel);

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'atomic';
        group.visible = active;
        if (!active) return;
        ensureOperatorCanvasSize();
        const style = getRiceStyle(state);
        const t = style.motion ? time : 0;
        const lens = state.tTheory && state.level >= 8;
        const transition = Math.max(pulse, style.motion ? 0.5 + 0.5 * Math.sin(t * 0.7) : 0.45);
        for (const cloud of [s1, p2, d3]) {
          cloud.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          if (cloud.material.vertexColors !== style.falsecolour) {
            cloud.material.vertexColors = style.falsecolour;
            cloud.material.needsUpdate = true;
          }
          cloud.material.color.set(style.falsecolour ? 0xffffff : 0xaab0b2);
        }
        s1.rotation.y = style.motion ? t * 0.08 : 0;
        p2.rotation.set(style.motion ? Math.sin(t * 0.18) * 0.12 : 0, style.motion ? t * 0.16 : 0, 0);
        d3.rotation.set(0, style.motion ? -t * 0.11 : 0, style.motion ? Math.sin(t * 0.13) * 0.1 : 0);
        s1.material.opacity = (style.glow ? 0.42 : 0.55) + pulse * 0.08;
        p2.material.opacity = (style.glow ? 0.28 : 0.42) + transition * 0.14;
        d3.material.opacity = (style.glow ? 0.22 : 0.36) + (1 - transition) * 0.1;
        nucleus.scale.setScalar(0.32 + pulse * 0.12);
        nucleus.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        nucleus.material.opacity = style.glow ? 0.95 : 0.62;
        spectrum.material.map = style.fluorescence ? fluorescenceSpectrum : neutralSpectrum;
        spectrum.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        spectrum.material.opacity = (style.fluorescence ? 0.72 : 0.5) + pulse * (style.glow ? 0.24 : 0.08);

        const wave = [];
        const travel = (state.responseTime + (style.motion ? time * 0.05 : 0)) % 1;
        for (let index = 0; index < 80; index += 1) {
          const t = index / 79;
          const x = -0.2 + t * 2.8;
          const phase = t * Math.PI * 9 - (style.motion ? time * 7 : 0);
          const y = 0.6 + Math.sin(phase) * 0.08;
          const z = 0.18 + Math.cos(phase) * 0.08;
          wave.push([x, y, z]);
        }
        setLinePoints(photonWave, wave);
        photonWave.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        photonWave.material.color.set(style.fluorescence ? 0xf6c75a : 0xa99f84);
        photonWave.material.opacity = (style.glow && style.fluorescence ? 0.22 : 0.16) + pulse * (style.glow ? 0.55 : 0.25);
        photon.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
        photon.position.set(-0.2 + travel * 2.8, 0.6 + Math.sin(travel * Math.PI * 9 - (style.motion ? time * 7 : 0)) * 0.08, 0.18);
        photon.material.opacity = style.glow && style.fluorescence ? 0.35 + pulse * 0.55 : 0;
        photon.scale.setScalar(0.16 + pulse * 0.16);

        for (const [index, ring] of rings.entries()) {
          ring.visible = lens;
          ring.rotation.set(index % 2 ? Math.PI / 2 : 0, (style.motion ? t * 0.03 : 0) + index * 0.1, 0);
          ring.scale.setScalar(1 + pulse * 0.18 + state.responseTime * 0.08 * index);
          ring.material.blending = style.glow ? THREE.AdditiveBlending : THREE.NormalBlending;
          ring.material.color.set(style.falsecolour ? (index % 2 ? 0x56f0a2 : 0x14e5ff) : 0x8ea0a2);
          ring.material.opacity = lens ? ((style.glow ? 0.3 : 0.18) / (index + 1) + pulse * 0.12 / (index + 1)) : 0;
        }
        coulombLabel.visible = lens;
        coulombLabel.material.opacity = lens ? 0.72 : 0;
      },
      dispose() {
        scene.remove(group);
        disposeTree(group);
        glow.dispose();
        fluorescenceSpectrum.dispose();
        neutralSpectrum.dispose();
      },
    };
  },
};

export default atomicRenderer;
