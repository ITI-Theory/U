import { createContourLayer } from './lib/contours.js';
import { PALETTE, createArcLine, createSectorMesh, disposeObject, makeGlowSprite, makeRadialTexture, setContourStyle, setGlowBlending, setMaterialColor, styleFlags } from './lib/planetary-helpers.js';

function makeStarSurface(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 384;
  const context = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  let lastKey = '';
  function update(falsecolourOn, time) {
    const key = `${falsecolourOn ? 1 : 0}:${Math.round(time * 8)}`;
    if (key === lastKey) return;
    lastKey = key;
    context.clearRect(0, 0, 384, 384);
    const gradient = context.createRadialGradient(154, 132, 8, 192, 192, 190);
    gradient.addColorStop(0, falsecolourOn ? '#fff6b0' : '#f3d18a');
    gradient.addColorStop(0.45, falsecolourOn ? '#ffad3d' : '#d89147');
    gradient.addColorStop(0.78, falsecolourOn ? '#b33420' : '#8a5639');
    gradient.addColorStop(1, '#170a06');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(192, 192, 188, 0, Math.PI * 2);
    context.fill();
    for (let i = 0; i < 190; i += 1) {
      const r = Math.sqrt((i * 0.6180339887) % 1) * 174;
      const a = i * 2.399963 + time * 0.09;
      const x = 192 + Math.cos(a) * r;
      const y = 192 + Math.sin(a) * r;
      const pulse = 0.35 + 0.65 * Math.sin(time * 1.7 + i * 1.9) ** 2;
      context.globalAlpha = falsecolourOn ? 0.18 + pulse * 0.2 : 0.12 + pulse * 0.12;
      context.fillStyle = i % 2 ? '#fff1a0' : '#ff6d3a';
      context.beginPath();
      context.arc(x, y, 2 + (i % 6), 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    texture.needsUpdate = true;
  }
  return { texture, update };
}

function makePhotosphereMaterial(THREE, texture) {
  return new THREE.ShaderMaterial({
    uniforms: {
      surfaceMap: { value: texture },
      time: { value: 0 },
      ripple: { value: 0 },
    },
    vertexShader: `
      uniform float time;
      uniform float ripple;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vec3 n = normalize(normal);
        float longitude = atan(position.y, position.x);
        float latitude = asin(clamp(n.y, -1.0, 1.0));
        float mode = sin(longitude * 5.0 + time * 1.3) * cos(latitude * 6.0 - time * 0.7);
        vec3 displaced = position + n * ripple * mode;
        vNormal = normalize(normalMatrix * n);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D surfaceMap;
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vec3 texel = texture2D(surfaceMap, vUv).rgb;
        float mu = clamp(abs(normalize(vNormal).z), 0.0, 1.0);
        float limb = 0.28 + 0.92 * pow(mu, 0.58);
        vec3 corona = vec3(1.0, 0.48, 0.18) * pow(1.0 - mu, 3.2) * 0.32;
        gl_FragColor = vec4(texel * limb + corona, 1.0);
      }
    `,
  });
}

export const stellarRenderer = {
  id: 'stellar',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);

    const starTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,1)'],
      [0.16, 'rgba(246,199,90,0.95)'],
      [0.48, 'rgba(255,104,40,0.48)'],
      [1, 'rgba(255,59,206,0)'],
    ], 224);
    const knotTexture = makeRadialTexture(THREE, [
      [0, 'rgba(255,255,255,0.94)'],
      [0.25, 'rgba(246,199,90,0.76)'],
      [1, 'rgba(255,59,206,0)'],
    ]);
    const starSurface = makeStarSurface(THREE);
    starSurface.update(true, 0);

    const star = new THREE.Group();
    group.add(star);
    const halo = makeGlowSprite(THREE, starTexture, { color: PALETTE.gold, opacity: 0.82, scale: 4.55 });
    star.add(halo);
    const photosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 160, 80),
      makePhotosphereMaterial(THREE, starSurface.texture),
    );
    photosphere.rotation.set(0.08, -0.34, 0);
    star.add(photosphere);
    const limb = new THREE.Mesh(
      new THREE.RingGeometry(1.48, 1.58, 160),
      new THREE.MeshBasicMaterial({ color: '#fff0a8', transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    star.add(limb);

    const layers = [
      createSectorMesh(THREE, { innerRadius: 0, outerRadius: 0.38, start: -0.85, end: 0.85, color: '#fff4a8', opacity: 0.95, depth: 0.32 }),
      createSectorMesh(THREE, { innerRadius: 0.38, outerRadius: 0.95, start: -0.85, end: 0.85, color: '#f6c75a', opacity: 0.84, depth: 0.27 }),
      createSectorMesh(THREE, { innerRadius: 0.95, outerRadius: 1.5, start: -0.85, end: 0.85, color: '#ff5d44', opacity: 0.78, depth: 0.22 }),
    ];
    for (const [index, layer] of layers.entries()) {
      layer.rotation.z = -0.2;
      layer.position.z = 1.62 + index * 0.025;
      star.add(layer);
    }

    const granules = [];
    for (let i = 0; i < 130; i += 1) {
      const r = Math.sqrt((i * 0.754877666) % 1) * 1.45;
      const a = i * 2.399963;
      const sprite = makeGlowSprite(THREE, knotTexture, { color: i % 2 ? '#ffd36a' : '#ff6d3a', opacity: 0.32, scale: 0.08 + (i % 7) * 0.007 });
      sprite.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.11);
      star.add(sprite);
      granules.push({ sprite, phase: a, radius: r });
    }

    const prominences = [];
    for (let i = 0; i < 5; i += 1) {
      const arc = createArcLine(THREE, { radiusX: 0.38 + i * 0.04, radiusY: 0.7 + i * 0.03, start: 0.18, end: Math.PI - 0.18, color: i % 2 ? PALETTE.pink : PALETTE.gold, opacity: 0.42, z: 0.15, segments: 50 });
      arc.position.set(Math.cos(i * 1.41) * 1.37, Math.sin(i * 1.41) * 1.37, 0);
      arc.rotation.z = i * 1.41 + Math.PI / 2;
      star.add(arc);
      prominences.push(arc);
    }

    const pmodes = [];
    for (let i = 0; i < 8; i += 1) {
      const mode = createArcLine(THREE, { radiusX: 1.65 + i * 0.045, radiusY: 1.65 - i * 0.055, color: i % 2 ? PALETTE.cyan : PALETTE.green, opacity: 0.28, z: 0.18, segments: 128 });
      mode.rotation.z = i * 0.38;
      mode.position.z = 1.68;
      star.add(mode);
      pmodes.push(mode);
    }

    const insets = new THREE.Group();
    insets.position.set(2.95, 0, 0);
    const nebula = createArcLine(THREE, { radiusX: 0.48, radiusY: 0.32, color: PALETTE.cyan, opacity: 0.55, z: 0.02, segments: 80 });
    const nebulaCore = makeGlowSprite(THREE, knotTexture, { color: PALETTE.violet, opacity: 0.74, scale: 0.36 });
    nebula.position.set(0, 0.78, 0);
    nebulaCore.position.set(0, 0.78, 0.03);
    const remnant = createArcLine(THREE, { radiusX: 0.56, radiusY: 0.45, color: PALETTE.pink, opacity: 0.55, z: 0.02, segments: 84 });
    const remnantCore = makeGlowSprite(THREE, knotTexture, { color: PALETTE.gold, opacity: 0.52, scale: 0.24 });
    remnant.position.set(0, -0.75, 0);
    remnantCore.position.set(0, -0.75, 0.03);
    insets.add(nebula, nebulaCore, remnant, remnantCore);
    group.add(insets);

    const contours = createContourLayer(THREE, { levels: [-0.8, -0.55, -0.28, 0, 0.28, 0.55, 0.8], opacity: 0.82 });
    const contourHost = new THREE.Object3D();
    contourHost.position.z = 1.82;
    star.add(contourHost);
    contourHost.add(contours.object);
    const columns = 83;
    const rows = 83;
    const modeHeight = (col, row, time, pulse) => {
      const x = -1.58 + col * 3.16 / (columns - 1);
      const y = 1.58 - row * 3.16 / (rows - 1);
      const r = Math.hypot(x, y);
      if (r > 1.58) return -10;
      const theta = Math.atan2(y, x);
      return Math.sin(5 * theta + time * 0.7) * Math.cos(r * 7.5 - time * 1.8) * (1 - r / 1.7) + pulse * Math.sin(r * 10 - time * 5);
    };

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'stellar';
        group.visible = active;
        if (!active) return;
        const style = styleFlags(state);
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const lensOn = Boolean(state.tTheory && state.level >= 8);
        const styleTime = motionOn ? time : 0;
        const vividLayers = ['#fff4a8', '#f6c75a', '#ff5d44'];
        const naturalLayers = ['#f4d48b', '#d89b52', '#a86a3f'];
        halo.visible = glowOn;
        starSurface.update(falsecolourOn, styleTime);
        photosphere.material.uniforms.time.value = styleTime;
        photosphere.material.uniforms.ripple.value = 0.012 + pulse * 0.055 + (motionOn ? 0.012 * Math.sin(time * 1.05) ** 2 : 0);
        photosphere.rotation.y = -0.34 + styleTime * 0.025;
        setMaterialColor(limb.material, falsecolourOn ? '#fff0a8' : '#d8c79a');
        setGlowBlending(THREE, limb.material, glowOn);
        for (const [index, layer] of layers.entries()) setMaterialColor(layer.material, falsecolourOn ? vividLayers[index] : naturalLayers[index]);
        const fiveMinute = (motionOn ? Math.sin(time * 1.05) * 0.035 : 0) + pulse * 0.08;
        star.scale.set(1 + fiveMinute, 1 - fiveMinute * 0.5, 1);
        halo.material.opacity = glowOn ? 0.72 + (motionOn ? 0.1 * Math.sin(time * 0.8) : 0.05) : 0;
        for (const [index, granule] of granules.entries()) {
          setGlowBlending(THREE, granule.sprite.material, glowOn);
          setMaterialColor(granule.sprite.material, falsecolourOn ? (index % 2 ? '#ffd36a' : '#ff6d3a') : '#c59a6e');
          granule.sprite.material.opacity = glowOn ? 0.22 + (motionOn ? 0.22 * Math.sin(time * 1.1 + granule.phase * 3) ** 2 : 0.12) : 0.12;
          granule.sprite.position.z = 0.11 + (motionOn ? 0.02 * Math.sin(time * 1.4 + index) : 0);
        }
        for (const [index, arc] of prominences.entries()) {
          setGlowBlending(THREE, arc.material, glowOn);
          setMaterialColor(arc.material, falsecolourOn ? (index % 2 ? PALETTE.pink : PALETTE.gold) : '#d3a36b');
          arc.material.opacity = (glowOn ? 0.26 : 0.34) + (motionOn ? 0.32 * Math.sin(time * 0.65 + index) ** 2 : 0.05);
        }
        for (const [index, mode] of pmodes.entries()) {
          mode.visible = true;
          setGlowBlending(THREE, mode.material, glowOn);
          setMaterialColor(mode.material, falsecolourOn ? (index % 2 ? PALETTE.cyan : PALETTE.green) : '#b9c0aa');
          mode.scale.setScalar(1 + (motionOn ? 0.025 * Math.sin(time * 1.4 + index) : 0) + pulse * 0.03);
          mode.material.opacity = (glowOn ? 0.16 : 0.26) + (lensOn ? 0.18 : 0.05) * (motionOn ? Math.sin(time * 1.2 + index) ** 2 : 0.45);
        }
        setMaterialColor(nebula.material, falsecolourOn ? PALETTE.cyan : '#9aaebb');
        setMaterialColor(remnant.material, falsecolourOn ? PALETTE.pink : '#b59a9a');
        nebulaCore.visible = glowOn;
        remnantCore.visible = glowOn;
        insets.rotation.z = motionOn ? 0.06 * Math.sin(time * 0.2) : 0;
        contourHost.visible = lensOn || state.contours;
        contours.update({
          columns,
          rows,
          height: (col, row) => modeHeight(col, row, styleTime, pulse),
          x: col => -1.58 + col * 3.16 / (columns - 1),
          y: row => 1.58 - row * 3.16 / (rows - 1),
          lift: 0.03,
          visible: lensOn || state.contours,
        });
        setContourStyle(contours, falsecolourOn, '#b8b6a6');
      },
      dispose() {
        scene.remove(group);
        disposeObject(group);
        starSurface.texture.dispose();
      },
    };
  },
};

export default stellarRenderer;
