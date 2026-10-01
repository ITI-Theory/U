import { createContourLayer } from './lib/contours.js';
import {
  clamp01,
  disposeGroup,
  makeGlowTexture,
  makeLabelTexture,
  makeLine,
  makeTube,
  seededRandomFactory,
  setMaterialGlow,
} from './lib/neural-shared.js';

function calciumActivity(time, phase, pulseDrive = 0) {
  const burst = Math.max(0, Math.sin(time * (1.6 + phase * 0.17) + phase)) ** 7;
  const shoulder = Math.max(0, Math.sin(time * (0.53 + phase * 0.03) + phase * 2.1)) ** 5;
  return clamp01(0.16 + burst * 0.78 + shoulder * 0.26 + pulseDrive);
}

function makeScaleBar(THREE) {
  const material = new THREE.LineBasicMaterial({ color: 0xeaf5ff, transparent: true, opacity: 0.72 });
  const bar = new THREE.Group();
  bar.add(makeLine(THREE, [new THREE.Vector3(-3.1, -1.83, 0.34), new THREE.Vector3(-2.2, -1.83, 0.34)], material));
  bar.add(makeLine(THREE, [new THREE.Vector3(-3.1, -1.75, 0.34), new THREE.Vector3(-3.1, -1.91, 0.34)], material));
  bar.add(makeLine(THREE, [new THREE.Vector3(-2.2, -1.75, 0.34), new THREE.Vector3(-2.2, -1.91, 0.34)], material));
  const labelTexture = makeLabelTexture(THREE, { title: '1 mm', accent: '#eaf5ff', width: 260, height: 110 });
  const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTexture, transparent: true, opacity: 0.72, depthWrite: false }));
  label.position.set(-2.65, -2.08, 0.35);
  label.scale.set(0.62, 0.26, 1);
  bar.add(label);
  return bar;
}

export const localCircuitRenderer = {
  id: 'local-circuit',
  create(scene, THREE) {
    const green = new THREE.Color('#56f0a2');
    const red = new THREE.Color('#ff4a4a');
    const cyan = new THREE.Color('#14e5ff');
    const gold = new THREE.Color('#f6c75a');
    const violet = new THREE.Color('#8f47ff');
    const neutralNeuron = new THREE.Color('#b5c0bc');
    const neutralInhibitory = new THREE.Color('#9faaa7');
    const neutralFiber = new THREE.Color('#7f8c88');
    const neutralAxon = new THREE.Color('#98aaa5');
    const mutedField = new THREE.Color('#87918f');
    const mutedSignal = new THREE.Color('#c2b48a');
    const rng = seededRandomFactory(0x51f7c1);
    const group = new THREE.Group();
    group.name = 'local-circuit-renderer';
    group.position.set(0.08, 0.12, 0);
    scene.add(group);

    const glowTexture = makeGlowTexture(THREE, 'rgba(255,255,255,0.98)', 'rgba(86,240,162,0.58)', 'rgba(86,240,162,0)');
    const redGlowTexture = makeGlowTexture(THREE, 'rgba(255,255,255,0.98)', 'rgba(255,74,74,0.58)', 'rgba(255,74,74,0)');
    const punctaTexture = makeGlowTexture(THREE, 'rgba(255,255,255,0.98)', 'rgba(246,199,90,0.78)', 'rgba(246,199,90,0)');

    const microscopePlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.25, 4.25),
      new THREE.MeshBasicMaterial({ color: 0x02120c, transparent: true, opacity: 0.46, depthWrite: false }),
    );
    microscopePlane.position.set(0, 0, -0.62);
    group.add(microscopePlane);

    const fieldCanvas = document.createElement('canvas');
    fieldCanvas.width = 168;
    fieldCanvas.height = 100;
    const fieldContext = fieldCanvas.getContext('2d');
    const fieldImage = fieldContext.createImageData(fieldCanvas.width, fieldCanvas.height);
    const fieldTexture = new THREE.CanvasTexture(fieldCanvas);
    fieldTexture.colorSpace = THREE.SRGBColorSpace;
    const fieldMap = new THREE.Mesh(
      new THREE.PlaneGeometry(7.25, 4.25),
      new THREE.MeshBasicMaterial({ map: fieldTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    fieldMap.position.set(0, 0, -0.5);
    group.add(fieldMap);

    const contourLayer = createContourLayer(THREE, {
      levels: [-0.64, -0.34, -0.08, 0.18, 0.43, 0.68],
      colors: ['#14e5ff', '#56f0a2', '#f6c75a', '#ff3bce'],
    });
    contourLayer.object.position.z = -0.28;
    contourLayer.object.scale.z = 0.075;
    group.add(contourLayer.object);

    const neuronGeometry = new THREE.SphereGeometry(0.13, 18, 12);
    const neuronLayout = [
      [-2.75, 1.12, 0.02, 0, 0.1], [-2.1, -0.44, 0.1, 0, 1.7], [-1.45, 0.72, -0.03, 1, 2.8],
      [-0.82, -1.02, 0.08, 0, 4.2], [-0.28, 1.36, 0.04, 1, 5.3], [0.28, -0.1, 0.0, 0, 6.1],
      [0.86, 0.86, -0.08, 0, 7.4], [1.42, -1.18, 0.05, 1, 8.5], [2.1, 0.28, 0.08, 0, 9.6],
      [2.78, 1.14, -0.04, 1, 10.9], [2.72, -0.76, 0.02, 0, 12.1],
    ];
    const neurons = neuronLayout.map(([x, y, z, inhibitory, phase], index) => {
      const color = inhibitory ? red : green;
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.66,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const soma = new THREE.Mesh(neuronGeometry, material);
      soma.position.set(x, y, z + 0.08);
      soma.scale.setScalar(inhibitory ? 0.92 : 1.08);
      group.add(soma);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({
        map: inhibitory ? redGlowTexture : glowTexture,
        color,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      halo.position.copy(soma.position);
      halo.scale.setScalar(inhibitory ? 0.48 : 0.58);
      group.add(halo);
      return { soma, halo, phase, inhibitory, base: new THREE.Vector3(x, y, z + 0.08), index };
    });

    const greenFiberMaterial = new THREE.MeshBasicMaterial({ color: green, transparent: true, opacity: 0.38, depthWrite: false, blending: THREE.AdditiveBlending });
    const redFiberMaterial = new THREE.MeshBasicMaterial({ color: red, transparent: true, opacity: 0.34, depthWrite: false, blending: THREE.AdditiveBlending });
    const axonMaterial = new THREE.MeshBasicMaterial({ color: cyan, transparent: true, opacity: 0.34, depthWrite: false, blending: THREE.AdditiveBlending });
    for (const neuron of neurons) {
      const branchCount = neuron.inhibitory ? 4 : 6;
      for (let branch = 0; branch < branchCount; branch += 1) {
        const angle = branch / branchCount * Math.PI * 2 + neuron.phase * 0.17;
        const length = neuron.inhibitory ? 0.58 + rng() * 0.35 : 0.72 + rng() * 0.58;
        const bend = (rng() - 0.5) * 0.36;
        const points = [
          neuron.base.clone(),
          new THREE.Vector3(
            neuron.base.x + Math.cos(angle + bend) * length * 0.52,
            neuron.base.y + Math.sin(angle - bend) * length * 0.52,
            neuron.base.z + (rng() - 0.5) * 0.16,
          ),
          new THREE.Vector3(
            neuron.base.x + Math.cos(angle) * length,
            neuron.base.y + Math.sin(angle) * length * 0.82,
            neuron.base.z + (rng() - 0.5) * 0.24,
          ),
        ];
        group.add(makeTube(THREE, points, neuron.inhibitory ? 0.015 : 0.018, neuron.inhibitory ? redFiberMaterial : greenFiberMaterial, 32, 5));
        if (!neuron.inhibitory && branch % 2 === 0) {
          const tip = points[2];
          group.add(makeTube(THREE, [
            points[1],
            new THREE.Vector3((points[1].x + tip.x) / 2 - Math.sin(angle) * 0.22, (points[1].y + tip.y) / 2 + Math.cos(angle) * 0.16, tip.z + 0.06),
            new THREE.Vector3(tip.x - Math.sin(angle) * 0.42, tip.y + Math.cos(angle) * 0.26, tip.z + 0.08),
          ], 0.01, greenFiberMaterial, 20, 5));
        }
      }
    }

    const connections = [
      [0, 2], [0, 5], [1, 3], [1, 5], [2, 6], [3, 7], [4, 6], [5, 8], [6, 9], [7, 10],
      [8, 10], [8, 5], [9, 6], [10, 7],
    ];
    for (const [source, target] of connections) {
      const a = neurons[source].base;
      const b = neurons[target].base;
      const mid = new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2 + (rng() - 0.5) * 0.42, 0.24 + (rng() - 0.5) * 0.18);
      group.add(makeTube(THREE, [a, mid, b], neurons[source].inhibitory ? 0.013 : 0.016, neurons[source].inhibitory ? redFiberMaterial : axonMaterial, 42, 5));
    }

    const synapsePositions = new Float32Array(112 * 3);
    const synapseColors = new Float32Array(112 * 3);
    const synapses = [];
    for (let index = 0; index < 112; index += 1) {
      const neuron = neurons[index % neurons.length];
      const angle = rng() * Math.PI * 2;
      const distance = 0.2 + rng() * 0.82;
      const x = clamp01(rng()) < 0.62
        ? neuron.base.x + Math.cos(angle) * distance
        : -3.1 + rng() * 6.2;
      const y = clamp01(rng()) < 0.62
        ? neuron.base.y + Math.sin(angle) * distance * 0.72
        : -1.65 + rng() * 3.45;
      const z = 0.2 + (rng() - 0.5) * 0.28;
      synapsePositions.set([x, y, z], index * 3);
      synapses.push({ x, y, phase: rng() * 20, inhibitory: index % 7 === 0 });
    }
    const synapseGeometry = new THREE.BufferGeometry();
    synapseGeometry.setAttribute('position', new THREE.BufferAttribute(synapsePositions, 3));
    synapseGeometry.setAttribute('color', new THREE.BufferAttribute(synapseColors, 3));
    const synapseMaterial = new THREE.PointsMaterial({
      size: 0.055,
      map: punctaTexture,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const synapseCloud = new THREE.Points(synapseGeometry, synapseMaterial);
    group.add(synapseCloud);

    const gliaGeometry = new THREE.BufferGeometry();
    const gliaPositions = new Float32Array(38 * 3);
    const gliaColors = new Float32Array(38 * 3);
    for (let index = 0; index < 38; index += 1) {
      gliaPositions.set([-3.25 + rng() * 6.5, -1.75 + rng() * 3.62, -0.18 - rng() * 0.16], index * 3);
      const color = index % 3 === 0 ? violet : cyan;
      gliaColors.set([color.r * 0.32, color.g * 0.32, color.b * 0.32], index * 3);
    }
    gliaGeometry.setAttribute('position', new THREE.BufferAttribute(gliaPositions, 3));
    gliaGeometry.setAttribute('color', new THREE.BufferAttribute(gliaColors, 3));
    group.add(new THREE.Points(gliaGeometry, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.54, depthWrite: false, blending: THREE.AdditiveBlending })));

    const capillaryMaterial = new THREE.LineBasicMaterial({ color: 0xff3b6f, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending });
    for (let vessel = 0; vessel < 5; vessel += 1) {
      const points = [];
      for (let step = 0; step < 34; step += 1) {
        const t = step / 33;
        points.push(new THREE.Vector3(-3.35 + t * 6.7, -1.55 + vessel * 0.74 + Math.sin(t * 10 + vessel) * 0.08, -0.36));
      }
      group.add(makeLine(THREE, points, capillaryMaterial));
    }

    const spikeSprites = Array.from({ length: 7 }, (_, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: punctaTexture,
        color: gold,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      sprite.scale.setScalar(0.16);
      group.add(sprite);
      return { sprite, offset: index / 7, lane: -1.2 + (index % 5) * 0.58 };
    });

    const stimulusRing = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    stimulusRing.position.set(-2.9, 0.55, 0.42);
    group.add(stimulusRing);

    const arrowGroup = new THREE.Group();
    const arrowData = [
      [-2.1, 1.0, 0.65, 0.16, 0x14e5ff], [-1.0, -0.6, 0.74, 0.32, 0xff4a4a],
      [0.24, 0.98, 0.66, -0.08, 0x56f0a2], [1.2, -0.68, 0.7, 0.42, 0xff4a4a],
      [1.86, 0.42, 0.68, -0.3, 0x14e5ff],
    ];
    for (const [x, y, length, angle, color] of arrowData) {
      const arrow = new THREE.ArrowHelper(new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0).normalize(), new THREE.Vector3(x, y, 0.58), length, color, 0.11, 0.065);
      arrow.userData.baseColor = new THREE.Color(color);
      arrow.line.material.transparent = true;
      arrow.line.material.opacity = 0;
      arrow.cone.material.transparent = true;
      arrow.cone.material.opacity = 0;
      arrowGroup.add(arrow);
    }
    group.add(arrowGroup);

    const fieldLabelTexture = makeLabelTexture(THREE, {
      title: 'LOCAL FIELD POTENTIAL',
      subtitle: 'gamma assembly wave + recurrent delays',
      accent: '#56f0a2',
      width: 880,
      height: 170,
    });
    const fieldLabel = new THREE.Sprite(new THREE.SpriteMaterial({ map: fieldLabelTexture, transparent: true, opacity: 0, depthWrite: false }));
    fieldLabel.position.set(0.62, 2.08, 0.64);
    fieldLabel.scale.set(2.65, 0.52, 1);
    group.add(fieldLabel);
    group.add(makeScaleBar(THREE));

    const glowManagedMaterials = [
      fieldMap.material,
      ...neurons.map(neuron => neuron.soma.material),
      ...neurons.map(neuron => neuron.halo.material),
      greenFiberMaterial,
      redFiberMaterial,
      axonMaterial,
      synapseMaterial,
      stimulusRing.material,
      fieldLabel.material,
      ...spikeSprites.map(spike => spike.sprite.material),
    ];
    function applyStyle(style, fieldOn) {
      const fluorescenceOn = style.fluorescence !== false;
      const falsecolourOn = style.falsecolour !== false;
      const glowOn = style.glow !== false;
      for (const material of glowManagedMaterials) setMaterialGlow(THREE, material, glowOn);
      for (const arrow of arrowGroup.children) {
        setMaterialGlow(THREE, arrow.line.material, glowOn);
        setMaterialGlow(THREE, arrow.cone.material, glowOn);
      }
      greenFiberMaterial.color.copy(fluorescenceOn ? green : neutralFiber);
      redFiberMaterial.color.copy(fluorescenceOn ? red : neutralInhibitory);
      axonMaterial.color.copy(fluorescenceOn ? cyan : neutralAxon);
      stimulusRing.material.color.copy(falsecolourOn ? gold : mutedSignal);
      fieldLabel.material.color.copy(falsecolourOn ? green : mutedField);
      fieldMap.material.blending = glowOn ? THREE.AdditiveBlending : THREE.NormalBlending;
      for (const spike of spikeSprites) {
        spike.sprite.material.color.copy(fluorescenceOn ? gold : mutedSignal);
        spike.sprite.material.map = glowOn ? punctaTexture : null;
        spike.sprite.material.needsUpdate = true;
      }
      synapseMaterial.map = glowOn ? punctaTexture : null;
      synapseMaterial.needsUpdate = true;
      for (const neuron of neurons) {
        const color = fluorescenceOn ? (neuron.inhibitory ? red : green) : (neuron.inhibitory ? neutralInhibitory : neutralNeuron);
        neuron.soma.material.color.copy(color);
        neuron.halo.material.color.copy(color);
        neuron.halo.visible = glowOn;
      }
      for (const arrow of arrowGroup.children) {
        const color = falsecolourOn ? arrow.userData.baseColor : mutedField;
        arrow.line.material.color.copy(color);
        arrow.cone.material.color.copy(color);
      }
      if (!fieldOn) fieldMap.material.opacity = 0;
    }

    let lastFieldUpdate = -Infinity;
    const columns = 72;
    const rows = 42;
    const sourceX = -2.9;
    const sourceY = 0.55;

    function fieldValue(x, y, time, pulse, responseTime, motionOn) {
      const fieldTime = motionOn ? time : 0;
      const gammaWave = Math.sin(x * 3.25 + y * 0.85 - fieldTime * 8.8) * 0.46;
      const standing = Math.cos((x + y) * 2.1 + fieldTime * 2.2) * 0.18;
      const waveRadius = responseTime * 5.75;
      const impulse = Math.exp(-((Math.hypot(x - sourceX, y - sourceY) - waveRadius) ** 2) / 0.045) * pulse * 1.4;
      return gammaWave + standing + impulse;
    }

    function drawField(time, pulse, responseTime, style) {
      const falsecolourOn = style.falsecolour !== false;
      const motionOn = style.motion !== false;
      const { width, height } = fieldCanvas;
      const data = fieldImage.data;
      for (let py = 0; py < height; py += 1) {
        const y = 2.125 - py * 4.25 / (height - 1);
        for (let px = 0; px < width; px += 1) {
          const x = -3.625 + px * 7.25 / (width - 1);
          const value = fieldValue(x, y, time, pulse, responseTime, motionOn);
          const positive = clamp01(value * 0.9);
          const negative = clamp01(-value * 0.9);
          const alpha = clamp01(Math.abs(value) * (falsecolourOn ? 0.44 : 0.24) + pulse * 0.08);
          const offset = (py * width + px) * 4;
          data[offset] = falsecolourOn ? Math.round(32 + 220 * negative + 60 * positive) : Math.round(76 + 86 * Math.abs(value));
          data[offset + 1] = falsecolourOn ? Math.round(26 + 220 * positive) : Math.round(84 + 82 * Math.abs(value));
          data[offset + 2] = falsecolourOn ? Math.round(54 + 180 * negative + 70 * positive) : Math.round(82 + 78 * Math.abs(value));
          data[offset + 3] = Math.round(alpha * 255);
        }
      }
      fieldContext.putImageData(fieldImage, 0, 0);
      fieldTexture.needsUpdate = true;
    }

    return {
      group,
      update(state, time, pulse) {
        const active = state.rendererId === 'local-circuit';
        group.visible = active;
        if (!active) return;
        const style = {
          fluorescence: true,
          falsecolour: true,
          glow: true,
          motion: true,
          ...(state.style ?? {}),
        };
        const fluorescenceOn = style.fluorescence !== false;
        const falsecolourOn = style.falsecolour !== false;
        const glowOn = style.glow !== false;
        const motionOn = style.motion !== false;
        const allPlain = !fluorescenceOn && !falsecolourOn && !glowOn && !motionOn;
        const fieldOn = Boolean(state.tTheory && state.level >= 8);
        applyStyle(style, fieldOn);
        const activityTime = motionOn ? time : 0;
        const breath = 1 + (motionOn ? Math.sin(time * 0.58) * 0.012 : 0);
        group.scale.set(breath, breath, 1);
        const radius = state.responseTime * 5.75;
        for (const neuron of neurons) {
          const distance = Math.hypot(neuron.base.x - sourceX, neuron.base.y - sourceY);
          const pulseDrive = Math.exp(-((distance - radius) ** 2) / 0.12) * pulse * 1.25;
          const activity = calciumActivity(activityTime, neuron.phase, pulseDrive);
          neuron.soma.material.opacity = allPlain ? 0.48 + pulseDrive * 0.25 : fluorescenceOn ? 0.28 + activity * 0.66 : 0.32 + activity * 0.22;
          neuron.halo.material.opacity = glowOn ? 0.1 + activity * 0.62 : 0;
          neuron.halo.scale.setScalar((neuron.inhibitory ? 0.48 : 0.58) * (1 + activity * 0.62 + pulseDrive * 0.4));
          neuron.soma.scale.setScalar((neuron.inhibitory ? 0.92 : 1.08) * (1 + (motionOn ? activity * 0.08 : pulseDrive * 0.08)));
        }
        for (let index = 0; index < synapses.length; index += 1) {
          const item = synapses[index];
          const localPulse = Math.exp(-((Math.hypot(item.x - sourceX, item.y - sourceY) - radius) ** 2) / 0.11) * pulse;
          const flash = calciumActivity(activityTime * 1.25, item.phase, localPulse);
          const color = fluorescenceOn ? (item.inhibitory ? red : gold) : mutedSignal;
          const gain = allPlain ? 0.5 + localPulse * 0.45 : 0.25 + flash;
          const offset = index * 3;
          synapseColors[offset] = color.r * gain;
          synapseColors[offset + 1] = color.g * gain;
          synapseColors[offset + 2] = color.b * gain;
        }
        synapseGeometry.attributes.color.needsUpdate = true;
        synapseMaterial.opacity = allPlain ? 0.64 : fluorescenceOn ? 1 : 0.72;
        for (const spike of spikeSprites) {
          const t = motionOn ? (time * 0.42 + spike.offset) % 1 : spike.offset;
          spike.sprite.position.set(-3.45 + t * 6.6, spike.lane + (motionOn ? Math.sin(t * Math.PI * 2) * 0.08 : 0), 0.52);
          spike.sprite.material.opacity = glowOn ? 0.18 + 0.58 * Math.sin(t * Math.PI) ** 2 : 0.22 + pulse * 0.12;
          spike.sprite.scale.setScalar(0.11 + 0.14 * Math.sin(t * Math.PI) ** 2 + pulse * 0.05);
        }
        stimulusRing.visible = pulse > 0.01;
        stimulusRing.scale.setScalar(Math.max(0.05, radius));
        stimulusRing.material.opacity = pulse * 0.72;
        fieldMap.visible = fieldOn;
        fieldMap.material.opacity = fieldOn ? (allPlain ? 0.18 : falsecolourOn ? 0.46 + pulse * 0.1 : 0.28 + pulse * 0.08) : 0;
        if (fieldOn && (pulse > 0.01 || time - lastFieldUpdate > 1 / 18)) {
          drawField(time, pulse, state.responseTime, style);
          lastFieldUpdate = time;
        }
        contourLayer.update({
          columns,
          rows,
          height: (col, row) => fieldValue(-3.625 + col * 7.25 / (columns - 1), 2.125 - row * 4.25 / (rows - 1), time, pulse, state.responseTime, motionOn),
          x: col => -3.625 + col * 7.25 / (columns - 1),
          y: row => 2.125 - row * 4.25 / (rows - 1),
          visible: fieldOn && falsecolourOn,
        });
        contourLayer.setOpacity(fieldOn && falsecolourOn ? (state.contours ? 0.9 : 0.42) : 0);
        arrowGroup.visible = fieldOn;
        for (const arrow of arrowGroup.children) {
          arrow.line.material.opacity = fieldOn ? (allPlain ? 0.46 : 0.48 + pulse * 0.22) : 0;
          arrow.cone.material.opacity = fieldOn ? (allPlain ? 0.5 : 0.54 + pulse * 0.24) : 0;
        }
        fieldLabel.material.opacity = fieldOn ? (allPlain ? 0 : 0.6 + (motionOn ? 0.12 * Math.sin(time * 1.8) : 0)) : 0;
      },
      dispose() {
        scene.remove(group);
        contourLayer.dispose();
        disposeGroup(group);
      },
    };
  },
};

export default localCircuitRenderer;
