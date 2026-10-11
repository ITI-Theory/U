// vessel.js: the body container's blood vessel, built from the wall's real anatomy rather
// than a wallpaper (author, 12 Oct: Fantastic Voyage's "oval things", "mesh curtains, hair").
// From the lumen outwards (an anatomy textbook's tunica intima, media, externa):
//  - endothelial cells: thin plates elongated along the flow, each with an oval nucleus that
//    bulges into the lumen (the film's "oval things");
//  - the glycocalyx: a brush of sugar chains lining the lumen, hair-like, swaying in the flow
//    (the "curtains, hair");
//  - smooth-muscle rings (the media), which constrict the vessel.
// The score drives it: fear constricts (sympathetic vasoconstriction), the heartbeat pulses
// the wall and the flow, safety warms the light, grief takes the colour out. Interpretive
// staging of a modelled score, labelled as such by the explorer.

import * as THREE from 'three';

function seeded(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

export function createVessel(curve, { radius = 1.1, cells = 5200, hairs = 5200, rings = 90 } = {}) {
  const group = new THREE.Group();
  const rand = seeded(1966); // the year of the film
  const frames = curve.computeFrenetFrames(400, true);
  const frameAt = u => {
    const i = Math.min(399, Math.floor(u * 400));
    return { t: frames.tangents[i], n: frames.normals[i], b: frames.binormals[i] };
  };

  // the cells: placed in staggered rows around the tube, each a flattened ellipsoid in the wall
  const place = Array.from({ length: cells }, (_, k) => {
    const row = Math.floor(k / 26);
    const u = ((row + 0.5 * (k % 2)) / (cells / 26) + rand() * 0.002) % 1;
    const a = ((k % 26) / 26) * Math.PI * 2 + (row % 2) * 0.12 + (rand() - 0.5) * 0.08;
    return { u, a, size: 0.9 + 0.2 * rand(), tilt: (rand() - 0.5) * 0.25 };
  });
  const cellGeo = new THREE.SphereGeometry(1, 14, 8);
  const cellMat = new THREE.MeshStandardMaterial({ color: '#d9506a', roughness: 0.55, metalness: 0.05, emissive: '#2a0610', transparent: true, opacity: 0.92 });
  const cellMesh = new THREE.InstancedMesh(cellGeo, cellMat, cells);
  const nucleusMat = new THREE.MeshStandardMaterial({ color: '#8a2a6a', roughness: 0.35, emissive: '#1a0220' });
  const nucleusMesh = new THREE.InstancedMesh(cellGeo, nucleusMat, cells);
  group.add(cellMesh, nucleusMesh);

  // the smooth-muscle rings of the media, faint, just outside the lining
  const ringMat = new THREE.MeshBasicMaterial({ color: '#ff8aa0', transparent: true, opacity: 0.12, depthWrite: false });
  const ringMeshes = Array.from({ length: rings }, (_, k) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.025, 6, 40), ringMat);
    mesh.userData.u = (k + 0.5) / rings;
    group.add(mesh);
    return mesh;
  });

  // the glycocalyx: hairs from the wall into the lumen
  const hairBase = Array.from({ length: hairs }, () => ({ u: rand(), a: rand() * Math.PI * 2, len: 0.05 + 0.08 * rand(), phase: rand() * Math.PI * 2 }));
  const hairPos = new Float32Array(hairs * 6);
  const hairGeo = new THREE.BufferGeometry();
  hairGeo.setAttribute('position', new THREE.BufferAttribute(hairPos, 3));
  const hairMat = new THREE.LineBasicMaterial({ color: '#ffd0e6', transparent: true, opacity: 0.35, depthWrite: false, blending: THREE.AdditiveBlending });
  group.add(new THREE.LineSegments(hairGeo, hairMat));

  // the lumen's back wall: dark red, behind the cells
  const lumen = new THREE.Mesh(new THREE.TubeGeometry(curve, 360, radius * 1.04, 20, true),
    new THREE.MeshStandardMaterial({ color: '#4a0812', roughness: 0.8, side: THREE.BackSide, emissive: '#1a0206' }));
  group.add(lumen);

  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const basis = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const radial = new THREE.Vector3();
  const warm = new THREE.Color('#ff7a5a');
  const cool = new THREE.Color('#d9506a');
  const grey = new THREE.Color('#8a8088');
  let lastR = -1;

  function placeCells(r) {
    for (const [i, c] of place.entries()) {
      const f = frameAt(c.u);
      radial.copy(f.n).multiplyScalar(Math.cos(c.a)).addScaledVector(f.b, Math.sin(c.a));
      // the cell's own axes: along the flow, around the tube, out of the wall
      const around = new THREE.Vector3().crossVectors(radial, f.t).normalize();
      basis.makeBasis(f.t, around, radial);
      q.setFromRotationMatrix(basis);
      pos.copy(curve.getPointAt(c.u)).addScaledVector(radial, r);
      scl.set(0.19 * c.size, 0.135 * c.size, 0.02);
      m4.compose(pos, q, scl);
      cellMesh.setMatrixAt(i, m4);
      // the nucleus: an oval bulging into the lumen
      pos.addScaledVector(radial, -0.022);
      scl.set(0.065 * c.size, 0.04 * c.size, 0.03);
      m4.compose(pos, q, scl);
      nucleusMesh.setMatrixAt(i, m4);
    }
    cellMesh.instanceMatrix.needsUpdate = true;
    nucleusMesh.instanceMatrix.needsUpdate = true;
    for (const ring of ringMeshes) {
      const u = ring.userData.u;
      const p = curve.getPointAt(u);
      ring.position.copy(p);
      ring.lookAt(p.clone().add(curve.getTangentAt(u)));
      ring.scale.setScalar(r * 1.03);
    }
    lastR = r;
  }

  return {
    group,
    // score: { S, F, G, ... } in [0, 1]; bpm: the heart; time in seconds
    update({ score = null, bpm = 68, time = 0 } = {}) {
      const F = score?.F ?? 0.2;
      const S = score?.S ?? 0.6;
      const G = score?.G ?? 0;
      const beat = Math.max(0, Math.sin(time * Math.PI * 2 * (bpm / 60))) ** 3; // a systolic kick
      const r = radius * (1 - 0.22 * F) * (1 + 0.035 * beat);
      if (Math.abs(r - lastR) > 0.002) placeCells(r);
      // hairs sway along the flow, harder on each beat
      for (const [i, h] of hairBase.entries()) {
        const f = frameAt(h.u);
        radial.copy(f.n).multiplyScalar(Math.cos(h.a)).addScaledVector(f.b, Math.sin(h.a));
        const base = curve.getPointAt(h.u).addScaledVector(radial, r * 0.985);
        const sway = 0.03 * Math.sin(time * 2.2 + h.phase) + 0.05 * beat;
        const tip = base.clone().addScaledVector(radial, -h.len).addScaledVector(f.t, sway);
        hairPos.set([base.x, base.y, base.z, tip.x, tip.y, tip.z], i * 6);
      }
      hairGeo.attributes.position.needsUpdate = true;
      // safety warms the cells; grief drains the colour
      cellMat.color.copy(cool).lerp(warm, Math.max(0, S - 0.4)).lerp(grey, 0.8 * G);
      cellMat.emissive.setRGB(0.16 + 0.12 * beat, 0.02, 0.06 * (1 - G));
      ringMat.opacity = 0.08 + 0.25 * F;
    },
    radius: () => lastR,
  };
}
