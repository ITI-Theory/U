function normal() {
  const u = Math.max(Number.EPSILON, Math.random());
  const v = Math.max(Number.EPSILON, Math.random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function makeBadgeTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 960;
  canvas.height = 220;
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgba(5,7,14,0.76)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#f6c75a';
  context.lineWidth = 5;
  context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  context.fillStyle = '#f6c75a';
  context.font = 'bold 38px monospace';
  context.fillText('INTERPRETIVE', 34, 70);
  context.fillStyle = '#eaf5ff';
  context.font = '26px monospace';
  context.fillText('Thoughts as threshold crossings of a classical noisy field', 34, 126);
  context.fillText('(not quantum events)', 34, 166);
  return new THREE.CanvasTexture(canvas);
}

function makeSparkTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 1, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.12, 'rgba(246,199,90,0.94)');
  gradient.addColorStop(0.42, 'rgba(255,59,206,0.34)');
  gradient.addColorStop(1, 'rgba(255,59,206,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export const thoughtSparksRenderer = {
  id: 'thought-sparks',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    const sparkTexture = makeSparkTexture(THREE);
    const badgeTexture = makeBadgeTexture(THREE);
    const modeCount = 9;
    const modes = Array.from({ length: modeCount }, (_, index) => ({
      x: (Math.random() - 0.5) * 0.5,
      previousAbs: 0,
      k: 0.75 + (index % 4) * 0.18,
      phase: index * 2.399963,
    }));
    const sparkCount = 36;
    const sparks = Array.from({ length: sparkCount }, (_, index) => {
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: sparkTexture,
        color: index % 2 ? 0xf6c75a : 0xff3bce,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }));
      sprite.visible = false;
      group.add(sprite);
      return { sprite, bornAt: -Infinity, mode: 0, amplitude: 0 };
    });
    const badge = new THREE.Sprite(new THREE.SpriteMaterial({ map: badgeTexture, transparent: true, opacity: 0.92, depthWrite: false }));
    badge.userData.worldLabel = true;
    badge.position.set(0, -2.45, 0.2);
    badge.scale.set(3.8, 0.88, 1);
    group.add(badge);
    const thresholdRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xf6c75a, transparent: true, opacity: 0.18, depthWrite: false }),
    );
    thresholdRing.rotation.x = Math.PI / 2;
    thresholdRing.position.y = 2.05;
    group.add(thresholdRing);
    let nextSpark = 0;
    let lastTime = 0;

    function triggerSpark(mode, amplitude, time) {
      const spark = sparks[nextSpark++ % sparks.length];
      const radius = 0.28 + (mode % 5) * 0.12;
      const angle = modes[mode].phase + time * 0.16;
      spark.bornAt = time;
      spark.mode = mode;
      spark.amplitude = amplitude;
      spark.sprite.position.set(
        Math.cos(angle) * radius,
        2.78 + Math.sin(angle * 1.7) * 0.28 + (mode % 3) * 0.08,
        Math.sin(angle) * 0.35,
      );
      spark.sprite.visible = true;
    }

    return {
      group,
      update(state, time, pulse) {
        const humanScale = state.tTheory && (state.scale === 7 || state.scale === 8 || (state.visualScale >= 6.6 && state.visualScale <= 8.4));
        group.visible = humanScale;
        if (!humanScale) return;
        const dt = Math.min(0.08, Math.max(0.004, time - lastTime || 0.016));
        lastTime = time;
        const diffusion = Math.max(0.001, state.thoughtNoiseD ?? 0.16);
        const threshold = Math.max(0.05, state.thoughtThreshold ?? 0.82);
        for (const [index, mode] of modes.entries()) {
          const previousAbs = Math.abs(mode.x);
          mode.x += -mode.k * mode.x * dt + Math.sqrt(2 * diffusion * dt) * normal();
          const amplitude = Math.abs(mode.x);
          if (previousAbs < threshold && amplitude >= threshold) triggerSpark(index, amplitude, time);
          mode.previousAbs = amplitude;
        }
        thresholdRing.scale.setScalar(0.72 + threshold * 0.55);
        thresholdRing.material.opacity = 0.12 + pulse * 0.18;
        thresholdRing.rotation.z = time * 0.12;
        badge.material.opacity = 0.72 + 0.18 * Math.sin(time * 1.7);
        for (const spark of sparks) {
          const age = time - spark.bornAt;
          const alive = age >= 0 && age < 1.55;
          spark.sprite.visible = alive;
          if (!alive) continue;
          const decay = Math.max(0, 1 - age / 1.55);
          const scale = 0.18 + spark.amplitude * 0.32 + pulse * 0.12;
          spark.sprite.scale.setScalar(scale * (1 + age * 1.8));
          spark.sprite.material.opacity = decay * (0.88 + pulse * 0.12);
          spark.sprite.position.y += dt * 0.12;
        }
      },
      dispose() {
        scene.remove(group);
        sparkTexture.dispose();
        badgeTexture.dispose();
      },
    };
  },
};

export default thoughtSparksRenderer;
