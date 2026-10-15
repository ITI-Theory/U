// bubble.js: a thought as a soap bubble (author, 15 Oct: "3D soap bubbles, changing shape like in
// a fluid"). The skin is a thin film (three.js iridescence: the colours of a soap film 200 to 900 nm
// thick, as the cathedral's visual thoughts) reflecting a soft room; the shape wobbles, slow
// travelling modes along the normal, as a bubble does drifting in a fluid. Each bubble has its own
// phase; `tint` colours the film a little. Shared by the Mind Chamber and the course's dome.

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const TIME = { value: 0 };
let envFor = new WeakMap();

// a soft room for the film to reflect, once per renderer
export function bubbleEnvironment(renderer) {
  if (!envFor.has(renderer)) {
    const pm = new THREE.PMREMGenerator(renderer);
    envFor.set(renderer, pm.fromScene(new RoomEnvironment(), 0.04).texture);
    pm.dispose();
  }
  return envFor.get(renderer);
}

export function tickBubbles(time) { TIME.value = time; }

export function bubbleMaterial({ tint = '#ffffff', opacity = 0.3, envMap = null, wobble = 1 } = {}) {
  const m = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff').lerp(new THREE.Color(tint), 0.25), metalness: 0, roughness: 0.04,
    transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide,
    iridescence: 1, iridescenceIOR: 1.33, iridescenceThicknessRange: [200, 900],
    clearcoat: 1, clearcoatRoughness: 0.02, envMap, envMapIntensity: 2.2, specularIntensity: 1,
  });
  const seed = Math.random() * 100;
  m.onBeforeCompile = shader => {
    shader.uniforms.uT = TIME;
    shader.vertexShader = `uniform float uT;\n${shader.vertexShader}`.replace('#include <begin_vertex>', `#include <begin_vertex>
      float t = uT * 0.9 + ${seed.toFixed(2)};
      vec3 q = normalize(position);
      float w = 0.10 * sin(3.0 * q.x + t) * sin(2.0 * q.y + 1.3 * t) + 0.07 * sin(4.0 * q.z - 0.8 * t) + 0.05 * sin(5.0 * (q.x + q.y) + 1.7 * t);
      transformed += normal * w * ${wobble.toFixed(2)} * length(position);`);
  };
  return m;
}
