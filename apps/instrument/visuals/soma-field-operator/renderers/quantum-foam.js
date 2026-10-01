function makeGaussianTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,0.94)');
  gradient.addColorStop(0.16, 'rgba(86,240,162,0.56)');
  gradient.addColorStop(0.5, 'rgba(20,229,255,0.18)');
  gradient.addColorStop(1, 'rgba(20,229,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

export const quantumFoamRenderer = {
  id: 'quantum-foam',
  create(scene, THREE) {
    const cyan = new THREE.Color('#14e5ff');
    const pink = new THREE.Color('#ff3bce');
    const gold = new THREE.Color('#f6c75a');
    const emfGreen = new THREE.Color('#56f0a2');
    const gaussianTexture = makeGaussianTexture(THREE);
    const group = new THREE.Group();
    scene.add(group);

    const foam = new THREE.Group();
    group.add(foam);
    const rings = Array.from({ length: 18 }, (_, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.26, 0.012, 8, 32),
        new THREE.MeshBasicMaterial({ color: index % 2 ? cyan : pink, transparent: true, opacity: 0 }),
      );
      foam.add(ring);
      return ring;
    });

    const surfaceGeometry = new THREE.PlaneGeometry(8.4, 5.2, 32, 22);
    const surface = new THREE.Mesh(
      surfaceGeometry,
      new THREE.MeshBasicMaterial({ color: cyan, wireframe: true, transparent: true, opacity: 0, depthWrite: false }),
    );
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = -1.55;
    foam.add(surface);

    const threshold = new THREE.Mesh(
      new THREE.PlaneGeometry(8.4, 5.2),
      new THREE.MeshBasicMaterial({ color: gold, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
    );
    threshold.rotation.x = -Math.PI / 2;
    threshold.position.y = -0.73;
    foam.add(threshold);

    const matter = Array.from({ length: 32 }, () => {
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: cyan, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      const particle = new THREE.Sprite(new THREE.SpriteMaterial({ map: gaussianTexture, color: gold, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
      halo.visible = false;
      particle.visible = false;
      foam.add(halo, particle);
      return { halo, particle, active: false, bornAt: -Infinity, x: 0, z: 0, height: 0 };
    });

    const emf = new THREE.Group();
    const emfContours = Array.from({ length: matter.length }, () => {
      const contour = new THREE.Mesh(
        new THREE.TorusGeometry(0.28, 0.026, 10, 48),
        new THREE.MeshBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      emf.add(contour);
      return contour;
    });
    const emfLinks = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: emfGreen, transparent: true, opacity: 0, depthWrite: false }),
    );
    emf.add(emfLinks);
    group.add(emf);

    const densityCanvas = document.createElement('canvas');
    densityCanvas.width = 160;
    densityCanvas.height = 100;
    const densityContext = densityCanvas.getContext('2d');
    const densityTexture = new THREE.CanvasTexture(densityCanvas);
    densityTexture.colorSpace = THREE.SRGBColorSpace;
    const densityMap = new THREE.Mesh(
      new THREE.PlaneGeometry(9.6, 6),
      new THREE.MeshBasicMaterial({ map: densityTexture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    densityMap.rotation.x = -Math.PI / 2;
    densityMap.position.y = -1.5;
    densityMap.visible = false;
    group.add(densityMap);

    const previousHeights = new Float32Array(surfaceGeometry.attributes.position.count);
    let nextMatter = 0;
    let lastDensityMapUpdate = 0;

    function drawDensityMap(activeMatter, time, pulse, state) {
      const { width, height } = densityCanvas;
      const image = densityContext.createImageData(width, height);
      const data = image.data;
      const impulseRadius = 0.32 + state.responseTime * 4.8;
      for (let pixelY = 0; pixelY < height; pixelY += 1) {
        for (let pixelX = 0; pixelX < width; pixelX += 1) {
          const x = (pixelX / width - 0.5) * 9.6;
          const z = (pixelY / height - 0.5) * 6;
          let density = 0;
          for (const item of activeMatter) {
            const age = time - item.bornAt;
            density += Math.exp(-((x - item.x) ** 2 + (z - item.z) ** 2) / 3.1) * Math.max(0.5, 1 - age / 14);
          }
          const impulseDistance = Math.hypot(x, z);
          const impulseCore = Math.exp(-(impulseDistance ** 2) / 0.3) * pulse * 1.5;
          const impulseRing = Math.exp(-((impulseDistance - impulseRadius) ** 2) / 0.035) * pulse * 1.8;
          density += impulseCore + impulseRing;
          const contour = density > 0.03 && Math.abs((density * 8) % 1 - 0.5) < 0.052;
          const intensity = Math.min(1, density * 0.78);
          const offset = (pixelY * width + pixelX) * 4;
          data[offset] = Math.round(20 + 236 * intensity);
          data[offset + 1] = Math.round(30 + 216 * Math.min(1, intensity * 1.28));
          data[offset + 2] = Math.round(52 + 203 * (1 - intensity * 0.35));
          data[offset + 3] = Math.round((intensity * 0.68 + (contour ? 0.4 : 0)) * 255);
        }
      }
      densityContext.putImageData(image, 0, 0);
      densityTexture.needsUpdate = true;
    }

    return {
      group,
      update(state, time, pulse) {
        const level = state.tTheory ? state.level : 4;
        const visibility = Math.max(0, 1 - state.visualScale / 1.5);
        const densityVisible = state.viewMode === '2d' && level >= 8 && visibility > 0.01 && state.tTheory;
        foam.visible = visibility > 0.01 && !densityVisible;
        const surfacePositions = surfaceGeometry.attributes.position;
        for (let index = 0; index < surfacePositions.count; index += 1) {
          const x = surfacePositions.getX(index);
          const z = surfacePositions.getY(index);
          const rollingHeight = Math.sin(x * 2.1 + time * 2.4) * 0.13 + Math.cos(z * 2.8 - time * 1.8) * 0.1;
          let noiseSpike = 0;
          for (let spike = 0; spike < 4; spike += 1) {
            const spikeX = Math.sin(time * (0.13 + spike * 0.02) + spike * 4.7) * 3.3;
            const spikeZ = Math.cos(time * (0.17 + spike * 0.015) + spike * 2.9) * 1.9;
            const distanceSquared = (x - spikeX) ** 2 + (z - spikeZ) ** 2;
            const amplitude = 0.82 + 0.26 * Math.sin(time * 0.7 + spike * 1.9)
              + (level === 4 || level === 8 ? pulse * 0.7 : 0);
            noiseSpike += Math.exp(-distanceSquared / 0.11) * amplitude;
          }
          const height = rollingHeight + noiseSpike;
          surfacePositions.setZ(index, height);
          if (visibility > 0.02 && previousHeights[index] < 0.82 && height >= 0.82) {
            const item = matter[nextMatter++ % matter.length];
            item.active = true;
            item.bornAt = time;
            item.x = x;
            item.z = z;
            item.height = height;
          }
          previousHeights[index] = height;
        }
        surfacePositions.needsUpdate = true;
        surface.material.opacity = visibility * (0.42 + pulse * 0.18);
        threshold.material.opacity = visibility * 0.08;
        for (const item of matter) {
          const age = time - item.bornAt;
          const alive = item.active && age < 12;
          item.halo.visible = alive;
          item.particle.visible = alive;
          if (!alive) continue;
          let interaction = 0;
          for (const neighbor of matter) {
            if (neighbor === item || !neighbor.active || time - neighbor.bornAt >= 12) continue;
            interaction += Math.exp(-((item.x - neighbor.x) ** 2 + (item.z - neighbor.z) ** 2) / 0.44);
          }
          const persistence = Math.max(0, 1 - age / 12);
          const brightness = Math.min(1, 0.34 + interaction * 0.3 + persistence * 0.4);
          item.halo.position.set(item.x, -1.55 + item.height, item.z);
          item.particle.position.set(item.x, -1.55 + item.height, item.z);
          item.halo.scale.setScalar(0.5 + interaction * 0.24 + persistence * 0.16);
          item.particle.scale.setScalar(0.12 + interaction * 0.07 + persistence * 0.08);
          item.halo.material.opacity = visibility * brightness * 0.42;
          item.particle.material.opacity = visibility * brightness;
        }
        for (const ring of rings) ring.visible = false;
        const emfVisible = visibility > 0.01 && level === 8 && state.tTheory;
        emf.visible = emfVisible && !densityVisible;
        const activeMatter = matter.filter(item => item.active && time - item.bornAt < 12);
        densityMap.visible = densityVisible;
        densityMap.material.opacity = densityVisible ? 0.96 : 0;
        if (densityVisible && (pulse > 0.01 || time - lastDensityMapUpdate > 1 / 15)) {
          drawDensityMap(activeMatter, time, pulse, state);
          lastDensityMapUpdate = time;
        }
        for (const [index, contour] of emfContours.entries()) {
          const item = activeMatter[index];
          contour.visible = Boolean(item);
          if (!item) continue;
          contour.position.set(item.x, -1.55 + item.height, item.z);
          contour.rotation.set(time * 0.34 + index, time * 0.21 + index * 0.5, time * 0.27);
          contour.scale.setScalar(1.12 + Math.sin(time * 1.4 + index) * 0.12);
          contour.material.opacity = emfVisible ? 0.68 : 0;
        }
        const linkPositions = [];
        for (let source = 0; source < activeMatter.length; source += 1) {
          let nearest = -1;
          let nearestDistance = Infinity;
          for (let target = 0; target < activeMatter.length; target += 1) {
            if (source === target) continue;
            const distance = Math.hypot(activeMatter[source].x - activeMatter[target].x, activeMatter[source].z - activeMatter[target].z);
            if (distance < nearestDistance) {
              nearest = target;
              nearestDistance = distance;
            }
          }
          if (nearest < 0 || nearestDistance > 3.1) continue;
          linkPositions.push(activeMatter[source].x, -1.55 + activeMatter[source].height, activeMatter[source].z);
          linkPositions.push(activeMatter[nearest].x, -1.55 + activeMatter[nearest].height, activeMatter[nearest].z);
        }
        emfLinks.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
        emfLinks.material.opacity = emfVisible ? Math.min(0.9, 0.34 + activeMatter.length * 0.045) : 0;
      },
      dispose() {
        scene.remove(group);
        gaussianTexture.dispose();
      },
    };
  },
};

export default quantumFoamRenderer;
