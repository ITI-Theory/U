// rhymes.js: visual rhymes across levels (ISS-083, from ISS-046). A level may borrow another
// level's motion style (registry/levels/<id>.yaml: rhyme: {motion, with, note}): sliding plates
// that lock and slip (the geological level's faults), or a debris ring sheared by differential
// rotation (the orbital system's belts). The motion is shared; the physics is not. So it is
// drawn faintly, with an INTERPRETIVE badge naming the level it rhymes with, only with the
// [T]-Theory lens on at 11D (interpretive layers), and only with RICE's RHYMES switch on.

function badgeTexture(THREE, title, note) {
  const canvas = document.createElement('canvas');
  canvas.width = 1100;
  canvas.height = 200;
  const c = canvas.getContext('2d');
  c.fillStyle = 'rgba(5,7,14,0.76)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.strokeStyle = '#f6c75a';
  c.lineWidth = 5;
  c.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  c.fillStyle = '#f6c75a';
  c.font = 'bold 36px monospace';
  c.fillText('VISUAL RHYME · INTERPRETIVE', 32, 64);
  c.fillStyle = '#eaf5ff';
  c.font = '25px monospace';
  c.fillText(title, 32, 112);
  c.fillText(note.length > 70 ? `${note.slice(0, 69)}…` : note, 32, 152);
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export const rhymesRenderer = {
  id: 'rhymes',
  create(scene, THREE) {
    const group = new THREE.Group();
    group.visible = false;
    scene.add(group);

    // sliding plates: two slabs along a fault; strain builds, then a sudden slip
    const plates = new THREE.Group();
    const slab = new THREE.BoxGeometry(2.6, 0.06, 1.2);
    const mats = ['#f6c75a', '#ff3bce'].map(color => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, depthWrite: false }));
    const edgeMat = new THREE.LineBasicMaterial({ color: '#f6c75a', transparent: true, opacity: 0.55 });
    const slabs = mats.map((m, k) => {
      const s = new THREE.Mesh(slab, m);
      s.add(new THREE.LineSegments(new THREE.EdgesGeometry(slab), edgeMat));
      s.position.set(k ? 1.32 : -1.32, -1.85, k ? 0.62 : -0.62);
      plates.add(s);
      return s;
    });
    group.add(plates);

    // debris ring: a belt of grains, inner ones faster (Keplerian shear, omega ~ r^-3/2)
    const N = 700;
    const r = new Float32Array(N), a = new Float32Array(N), y = new Float32Array(N);
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      r[i] = 2.2 + Math.random() * 0.9;
      a[i] = Math.random() * Math.PI * 2;
      y[i] = (Math.random() - 0.5) * 0.06;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const ring = new THREE.Points(ringGeo, new THREE.PointsMaterial({ color: '#8ecbff', size: 0.045, transparent: true, opacity: 0.7, depthWrite: false }));
    ring.rotation.x = 0.42;
    group.add(ring);

    const badgeMat = new THREE.SpriteMaterial({ transparent: true, opacity: 0.92, depthWrite: false });
    const badge = new THREE.Sprite(badgeMat);
    badge.userData.worldLabel = true;
    badge.position.set(0, -2.6, 0.2);
    badge.scale.set(4.4, 0.8, 1);
    group.add(badge);

    let shown = '';
    let last = 0;
    return {
      group,
      // state.rhyme: the active level's rhyme ({motion, with, withLabel, note}) or null
      update(state, time) {
        const rh = state.rhyme;
        const on = Boolean(rh && state.style?.rhyme && state.tTheory && state.level === 11);
        group.visible = on;
        if (!on) return;
        const key = `${rh.motion}|${rh.with}`;
        if (key !== shown) {
          shown = key;
          badgeMat.map?.dispose();
          badgeMat.map = badgeTexture(THREE, `the motion of ${rh.withLabel ?? rh.with}, not its physics`, rh.note ?? '');
          badgeMat.needsUpdate = true;
        }
        plates.visible = rh.motion === 'sliding-plates';
        ring.visible = rh.motion === 'debris-ring';
        const moving = state.style?.motion !== false;
        const dt = moving ? Math.min(0.05, Math.max(0, time - last)) : 0;
        last = time;
        if (plates.visible) {
          // stick-slip: a slow creep of strain, then a sudden jump; the slabs move apart along the fault
          const cycle = (time * 0.22) % 1;
          const jumps = Math.floor(time * 0.22);
          const slip = moving ? ((jumps % 6) + (cycle > 0.92 ? (cycle - 0.92) / 0.08 : 0)) * 0.12 : 0;
          slabs[0].position.x = -1.32 - (slip % 0.72);
          slabs[1].position.x = 1.32 + (slip % 0.72);
          edgeMat.opacity = cycle > 0.92 ? 0.95 : 0.45 + 0.1 * cycle;
        }
        if (ring.visible) {
          for (let i = 0; i < N; i++) {
            a[i] += dt * 0.9 * Math.pow(2.2 / r[i], 1.5);
            pos[i * 3] = Math.cos(a[i]) * r[i];
            pos[i * 3 + 1] = y[i];
            pos[i * 3 + 2] = Math.sin(a[i]) * r[i];
          }
          ringGeo.attributes.position.needsUpdate = true;
        }
      },
      dispose() {
        scene.remove(group);
        slab.dispose();
        mats.forEach(m => m.dispose());
        edgeMat.dispose();
        ringGeo.dispose();
        ring.material.dispose();
        badgeMat.map?.dispose();
        badgeMat.dispose();
      },
    };
  },
};

export default rhymesRenderer;
