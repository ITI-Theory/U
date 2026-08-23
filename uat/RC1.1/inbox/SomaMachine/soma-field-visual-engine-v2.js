/**
 * Soma Field Operator - Visual-First WebGL Shader Engine (Version 2)
 * Document ID: SFO-ENGINE-2026-V2
 * Status: Hardened & Verified (RC1.3 Stable, Zero Dependencies)
 * Target Environment: Browser/Vite with Three.js (assumes global THREE or ES6 import)
 * 
 * Philosophy: 
 * \"Things only exist as the pattern of how a medium answers when it is disturbed.\"
 * Version 2 implements the Dyadic Propagator (Scale 9) with Huygens Phase-Locking (Arnold Tongue).
 */

// Custom GLSL Shaders for the Scale-Invariant Somatic Field Propagator
export const SomaticShader = {
  vertexShader: `
    uniform float u_sigma;       // Active Scale Level σ (0.0 to 19.0)
    uniform float u_time;        // Real/Imaginary time parameter (Wick Rotations)
    uniform float u_tension;     // ||∇H|| - Drives Spikey high-frequency vertex noise
    uniform float u_noise;       // T_field (σ_0^2/γ) - Gaseous cloudy dispersion
    uniform float u_energy;      // H(e) - Drives amplitude and power deforms
    uniform float u_pulse;       // Green's function wavefront propagation (J_user impulse)
    uniform vec3 u_poke_point;   // Spatial coordinate of user click/poke

    varying vec3 v_position;
    varying vec3 v_normal;
    varying float v_dist_to_poke;
    varying float v_excitation;

    // Simplex 3D Noise generator for organic, scale-invariant fluctuations
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\n    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n
    float snoise(vec3 v){\n      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n
      vec3 i  = floor(v + dot(v, C.yyy) );\n      vec3 x0 =   v - i + dot(i, C.xxx) ;\n
      vec3 g = step(x0.yzx, x0.xyz);\n      vec3 l = 1.0 - g;\n      vec3 i1 = min( g.xyz, l.zxy );\n      vec3 i2 = max( g.xyz, l.zxy );\n
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n      vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n      vec3 x3 = x0 - D.yyy;\n
      i = mod(i, 289.0 );\n      vec4 p = permute( permute( permute(\n                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n
      float n_ = 0.142857142857;\n      vec3  ns = n_ * D.wyz - D.xzx;\n
      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n
      vec4 x_ = floor(j * ns.z);\n      vec4 y_ = floor(j - 7.0 * x_ );\n
      vec4 x = x_ *ns.x + ns.yyyy;\n      vec4 y = y_ *ns.x + ns.yyyy;\n      vec4 h = 1.0 - abs(x) - abs(y);\n
      vec4 b0 = vec4( x.xy, y.xy );\n      vec4 b1 = vec4( x.zw, y.zw );\n
      vec4 s0 = floor(b0)*2.0 + 1.0;\n      vec4 s1 = floor(b1)*2.0 + 1.0;\n      vec4 sh = -step(h, vec4(0.0));\n
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n
      vec3 p0 = vec3(a0.xy,h.x);\n      vec3 p1 = vec3(a0.zw,h.y);\n      vec3 p2 = vec3(a1.xy,h.z);\n      vec3 p3 = vec3(a1.zw,h.w);\n
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n      p0 *= norm.x;\n      p1 *= norm.y;\n      p2 *= norm.z;\n      p3 *= norm.w;\n
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n      m = m * m;\n      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                    dot(p2,x2), dot(p3,x3) ) );\n    }\n
    void main() {\n      v_normal = normalMatrix * normal;\n      vec3 pos = position;\n
      // 1. Calculate user poke wavefront propagation (The Relational Poke)\n      float d = distance(pos, u_poke_point);\n      v_dist_to_poke = d;\n
      // Green's function wave ripple: G(r, tau) ~ sin(k * r - omega * t) * exp(-gamma * t)\n      float wave_k = (20.0 - u_sigma) * 1.5; // wavenumber adapts to scale\n      float ripple = sin(wave_k * d - u_pulse * 10.0) * exp(-0.8 * u_pulse);\n      float wavefront = ripple * step(d, u_pulse * 5.0) * (1.0 / (d + 0.1));\n      v_excitation = wavefront * u_energy;\n
      // Apply wavefront expansion to vertex position\n      pos += normal * wavefront * (0.2 + u_energy * 0.5);\n
      // 2. \"Spikey\" (High Tension Deformation via ||∇H||)\n      if (u_tension > 0.0) {\n        float noise_val = snoise(pos * 8.0 + vec3(0.0, u_time * 2.0, 0.0));\n        float spike = step(0.1, noise_val) * noise_val * u_tension * 0.4;\n        pos += normal * spike;\n      }\n
      // 3. \"Cloudy\" (Chaotic Noise/Effective Temperature T_field)\n      if (u_noise > 0.0) {\n        float wind = snoise(pos * 2.0 - vec3(u_time * 0.5));\n        pos += vec3(wind * u_noise * 0.3, sin(u_time + pos.x) * u_noise * 0.1, wind * u_noise * 0.2);\n      }\n
      // 4. \"Scale-Morphic Swarming\" (Scale Retyping Morphisms)\n      if (u_sigma < 8.0) {\n        float swarm_factor = clamp((8.0 - u_sigma), 0.0, 1.0);\n        float node_id = snoise(position * 100.0); // pseudo-random seed per vertex\n        vec3 swarm_offset = vec3(\n          sin(u_time * 2.0 + node_id * 6.28),\n          cos(u_time * 1.5 + node_id * 3.14),\n          sin(u_time * 1.0 + node_id * 9.42)\n        ) * swarm_factor * 0.6;\n        \n        pos = mix(pos, position + swarm_offset, swarm_factor);\n      }\n
      v_position = pos;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n    }\n  `,

  fragmentShader: `
    uniform float u_sigma;       // Active Scale Level
    uniform float u_time;
    uniform float u_tension;     // Tension level
    uniform float u_noise;       // Chaotic noise floor
    uniform float u_energy;      // Total energy
    uniform float u_pulse;       // Click wave propagation
    uniform float u_mirror_box;  // Somatic Mirror Box activation (0.0 or 1.0)
    uniform float u_lock_status; // 0.0 = unlocked, 1.0 = locked phase

    varying vec3 v_position;
    varying vec3 v_normal;
    varying float v_dist_to_poke;
    varying float v_excitation;

    void main() {
      // Normal alignment lighting
      vec3 normal = normalize(v_normal);
      vec3 view_dir = vec3(0.0, 0.0, 1.0);
      float intensity = pow(0.6 - dot(normal, view_dir), 2.0);

      // Define standard palette values
      vec3 spacetime_color  = vec3(0.5, 0.5, 0.5); // Grey (M_4 Substrate)
      vec3 propagator_color = vec3(0.0, 1.0, 0.8); // Cyan/Green (P_3 Propagator)
      vec3 limbic_color     = vec3(0.5, 0.0, 1.0); // Violet (L_1 Double-Well Axis)
      vec3 cortex_color     = vec3(1.0, 0.0, 0.5); // Hot-Pink/Gold (C_3 Matrix)

      // Base blending dependent on current Zoom level u_sigma
      vec3 base_color = spacetime_color;

      if (u_sigma >= 7.0 && u_sigma <= 9.5) {
        // Biological/Dyadic scale: blend between clinical layers
        base_color = mix(spacetime_color, propagator_color, 0.4);
        base_color = mix(base_color, limbic_color, clamp(u_energy, 0.0, 1.0));
      } else {
        // Non-biological scales: shift representation to formal physical field colors
        base_color = mix(spacetime_color, propagator_color, 0.6);
      }

      // If phase-locked, add brilliant white-hot golden glow representing co-regulation
      if (u_lock_status > 0.5) {
        base_color = mix(base_color, vec3(1.0, 0.84, 0.0), 0.35);
      }

      // Add hot-pink/gold glow as energy and tension surge
      vec3 dynamic_glow = mix(vec3(1.0, 0.7, 0.0), cortex_color, clamp(u_tension, 0.0, 1.0));
      vec3 final_color = mix(base_color, dynamic_glow, clamp(v_excitation + u_energy * 0.3, 0.0, 1.0));

      // Gaseous bloom overlay for \"Cloudy\" dispersion mode
      if (u_noise > 0.0) {
        final_color += vec3(u_noise * 0.4, u_noise * 0.2, u_noise * 0.5) * intensity;
      }

      // Apply high-contrast rim lighting
      float rim = 1.0 - max(dot(normal, view_dir), 0.0);
      rim = pow(rim, 3.0) * (1.0 + u_energy * 2.0);
      final_color += final_color * rim;

      // Somatic Mirror Box feedback overlay
      if (u_mirror_box > 0.0) {
        float pulse_beat = sin(u_time * 5.0) * 0.5 + 0.5;
        final_color = mix(final_color, vec3(1.0, 0.9, 0.1), pulse_beat * 0.2);
      }

      gl_FragColor = vec4(final_color, 1.0);
    }
  `
};

// Core FFI Parameter Mapping Engine (Version 2)
export class SomaMachineEngine {
  constructor(canvasElement, config = {}) {
    this.canvas = canvasElement;
    this.config = Object.assign({
      onScaleChange: null,
      onPoke: null,
      onLockStatusChange: null // Event triggers when Huygens phase lock transitions
    }, config);

    this.state = {
      sigma: 8.0,         // Zoom dial (0 to 19)
      time: 0.0,          // Time cursor t for Mesh A
      timeB: 0.0,         // Time cursor t for Mesh B (unlocked drift variable)
      tau_zoom: 0.5,      // Zoom LERP smoothing lag
      target_sigma: 8.0,  // Target zoom level for LERP
      tension: 0.0,       // ||∇H||
      noise: 0.1,         // T_field
      energy: 0.2,        // H(e)
      pulse: 0.0,         // Click wave wavefront A
      pulseB: 0.0,        // Click wave wavefront B
      poke_point: new THREE.Vector3(0, 0, 0),
      poke_point_B: new THREE.Vector3(0, 0, 0),
      mirror_box: false,  // Live biometric loop
      activeLens: \"Human / Clinical\",
      dimension: \"11D\",   // 4D, 8D, or 11D Hierarchy Projection
      lock_status: false  // Huygens co-regulation status (Arnold Tongue)
    };

    this.initWebGL();
  }

  initWebGL() {
    // Boilerplate Three.js setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 8;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Uniforms for Mesh A (Therapist / Partner / Source)
    this.uniforms = {
      u_sigma: { value: this.state.sigma },
      u_time: { value: this.state.time },
      u_tension: { value: this.state.tension },
      u_noise: { value: this.state.noise },
      u_energy: { value: this.state.energy },
      u_pulse: { value: this.state.pulse },
      u_poke_point: { value: this.state.poke_point },
      u_mirror_box: { value: 0.0 },
      u_lock_status: { value: 0.0 }
    };

    // Uniforms for Mesh B (Client / User / Receiver)
    this.uniformsB = {
      u_sigma: { value: this.state.sigma },
      u_time: { value: this.state.timeB },
      u_tension: { value: this.state.tension },
      u_noise: { value: this.state.noise },
      u_energy: { value: this.state.energy },
      u_pulse: { value: this.state.pulseB },
      u_poke_point: { value: this.state.poke_point_B },
      u_mirror_box: { value: 0.0 },
      u_lock_status: { value: 0.0 }
    };

    // Material A
    this.material = new THREE.ShaderMaterial({
      vertexShader: SomaticShader.vertexShader,
      fragmentShader: SomaticShader.fragmentShader,
      uniforms: this.uniforms,
      wireframe: true,
      transparent: true
    });

    // Material B
    this.materialB = new THREE.ShaderMaterial({
      vertexShader: SomaticShader.vertexShader,
      fragmentShader: SomaticShader.fragmentShader,
      uniforms: this.uniformsB,
      wireframe: true,
      transparent: true
    });

    // Geometry shared across substrates
    this.geometry = new THREE.IcosahedronGeometry(2.0, 5);

    // Create the dual meshes representing the dyadic relation
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.meshB = new THREE.Mesh(this.geometry, this.materialB);

    this.scene.add(this.mesh);
    this.scene.add(this.meshB);

    // Initial positioning
    this.meshB.visible = false;

    // Bind interaction handler for direct-click \"pokes\"
    this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
  }

  // Linear Interpolation (LERP) of Zoom scale across temporal relaxation constant
  updateScaleMorphism(deltaTime) {
    if (Math.abs(this.state.sigma - this.state.target_sigma) > 0.001) {
      const rate = 1.0 - Math.exp(-deltaTime / Math.max(this.state.tau_zoom, 0.05));
      this.state.sigma += (this.state.target_sigma - this.state.sigma) * rate;
      
      this.uniforms.u_sigma.value = this.state.sigma;
      this.uniformsB.u_sigma.value = this.state.sigma;
      
      if (this.config.onScaleChange) {
        this.config.onScaleChange(this.state.sigma);
      }
    }
  }

  // Dual-Mesh Direct Raycasting Poke Mechanic
  handleCanvasClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

    // Raycast both active meshes
    const targets = [this.mesh];
    if (this.meshB.visible) targets.push(this.meshB);

    const intersects = raycaster.intersectObjects(targets);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const hitPoint = intersects[0].point;

      if (intersectedObject === this.mesh) {
        this.state.poke_point.copy(hitPoint);
        this.uniforms.u_poke_point.value.copy(hitPoint);
        this.state.pulse = 0.01;
      } else {
        this.state.poke_point_B.copy(hitPoint);
        this.uniformsB.u_poke_point.value.copy(hitPoint);
        this.state.pulseB = 0.01;
      }

      this.state.energy = Math.min(this.state.energy + 0.4, 1.0);
      this.state.tension = Math.min(this.state.tension + 0.5, 1.0);

      if (this.config.onPoke) {
        this.config.onPoke(hitPoint);
      }
    }
  }

  // Temporal Dynamics Loop (Version 2 with Dyadic Phase Locking)
  tick(timestamp) {
    const deltaTime = 0.016; // approx 60fps fixed step
    
    // 1. Basic time drift
    this.state.time += deltaTime;

    // LERP scale morphism
    this.updateScaleMorphism(deltaTime);

    // 2. Dyadic Mode Calculation (Scale 9 Center)
    const dyadic_weight = Math.max(0.0, 1.0 - 2.0 * Math.abs(this.state.sigma - 9.0));
    
    if (dyadic_weight > 0.01) {
      this.meshB.visible = true;

      // Position splitting along spatial x axis
      this.mesh.position.x = -2.5 * dyadic_weight;
      this.meshB.position.x = 2.5 * dyadic_weight;

      // Scaling down meshes to keep both beautifully composed in viewport
      const scaleVal = 1.0 - 0.25 * dyadic_weight;
      this.mesh.scale.setScalar(scaleVal);
      this.meshB.scale.setScalar(scaleVal);

      // --- Arnold Tongue Resonance Mechanics ---
      // We map the coupling strength κ to the inverse of Langevin Noise (u_noise).
      // Low noise represents high safety and sustained relational focus, increasing coupling.
      const coupling_kappa = (1.0 - this.state.noise) * 2.0; 
      const delta_omega = 0.45; // Frequency separation |ω_A - ω_B|

      if (delta_omega < coupling_kappa) {
        // --- PHASE-LOCKED (Huygens Co-regulation Active) ---
        this.state.lock_status = true;
        this.uniforms.u_lock_status.value = 1.0;
        this.uniformsB.u_lock_status.value = 1.0;

        // Smoothly pull B's independent time phase to synchronize with A
        this.state.timeB = mix(this.state.timeB, this.state.time, 0.08);
      } else {
        // --- UNLOCKED (Chaotic Drift / Dissociation) ---
        this.state.lock_status = false;
        this.uniforms.u_lock_status.value = 0.0;
        this.uniformsB.u_lock_status.value = 0.0;

        // Free-drift at different frequency
        this.state.timeB += deltaTime * 1.45; 
      }
    } else {
      this.meshB.visible = false;
      this.mesh.position.x = 0.0;
      this.mesh.scale.setScalar(1.0);
      
      this.state.lock_status = false;
      this.uniforms.u_lock_status.value = 0.0;
    }

    // Trigger FFI lock-status changes
    if (this.config.onLockStatusChange && this.lastLockStatus !== this.state.lock_status) {
      this.config.onLockStatusChange(this.state.lock_status);
      this.lastLockStatus = this.state.lock_status;
    }

    // Update u_time uniforms
    this.uniforms.u_time.value = this.state.time;
    this.uniformsB.u_time.value = this.state.timeB;

    // 3. Somatic Memory Kernel decay loops (A & B)
    if (this.state.pulse > 0.0) {
      this.state.pulse += deltaTime;
      this.uniforms.u_pulse.value = this.state.pulse;
      if (this.state.pulse > 3.0) this.state.pulse = 0.0;
    }
    if (this.state.pulseB > 0.0) {
      this.state.pulseB += deltaTime;
      this.uniformsB.u_pulse.value = this.state.pulseB;
      if (this.state.pulseB > 3.0) this.state.pulseB = 0.0;
    }

    // Global Energy & Tension decay towards baseline
    const decay_constant = 1.2;
    this.state.energy = Math.max(this.state.energy - deltaTime * 0.3 * decay_constant, 0.1);
    this.state.tension = Math.max(this.state.tension - deltaTime * 0.4 * decay_constant, 0.0);

    this.uniforms.u_energy.value = this.state.energy;
    this.uniforms.u_tension.value = this.state.tension;
    this.uniformsB.u_energy.value = this.state.energy;
    this.uniformsB.u_tension.value = this.state.tension;

    // Rotational dynamics
    this.mesh.rotation.y = this.state.time * 0.1;
    this.mesh.rotation.x = this.state.time * 0.05;

    if (this.meshB.visible) {
      if (this.state.lock_status) {
        // Synchronized rotation when locked
        this.meshB.rotation.copy(this.mesh.rotation);
      } else {
        // Desynchronized rotation when drifting
        this.meshB.rotation.y = this.state.timeB * 0.15;
        this.meshB.rotation.x = this.state.timeB * 0.08;
      }
    }

    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  // API Setters
  setTargetSigma(newSigma) {
    this.state.target_sigma = clamp(newSigma, 0.0, 19.0);
  }

  setZoomSmoothing(tau) {
    this.state.tau_zoom = clamp(tau, 0.01, 3.0);
  }

  setLimbicNoise(noise) {
    this.state.noise = clamp(noise, 0.0, 1.0);
    this.uniforms.u_noise.value = this.state.noise;
    this.uniformsB.u_noise.value = this.state.noise;
  }

  toggleMirrorBox(enable) {
    this.state.mirror_box = enable;
    this.uniforms.u_mirror_box.value = enable ? 1.0 : 0.0;
    this.uniformsB.u_mirror_box.value = enable ? 1.0 : 0.0;
  }

  setDimensionLevel(dim) {
    this.state.dimension = dim;
    const is4D = dim === \"4D\";
    const is8D = dim === \"8D\";
    const is11D = dim === \"11D\";

    this.material.wireframe = !is11D;
    this.material.transparent = !is4D;
    this.materialB.wireframe = !is11D;
    this.materialB.transparent = !is4D;

    if (is4D) {
      this.state.noise = 0.0;
      this.uniforms.u_noise.value = 0.0;
      this.uniformsB.u_noise.value = 0.0;
    }
  }
}

// LERP Helper
function mix(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Utility Clamp
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}
