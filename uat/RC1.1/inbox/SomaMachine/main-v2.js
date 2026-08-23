import { SomaMachineEngine } from './soma-field-visual-engine-v2.js';

// Setup DOM elements
const canvas = document.getElementById('webgl-canvas');
const dimensionButtons = document.querySelectorAll('#dimension-selector button');
const lensSelector = document.getElementById('lens-selector');
const somaticSelector = document.getElementById('somatic-dropdown');
const btnPoke = document.getElementById('btn-poke');
const btnMirror = document.getElementById('btn-mirror');

const zoomRange = document.getElementById('zoom-range');
const valZoom = document.getElementById('val-zoom');
const smoothingRange = document.getElementById('smoothing-range');
const valSmoothing = document.getElementById('val-smoothing');
const noiseRange = document.getElementById('noise-range');
const valNoise = document.getElementById('val-noise');

const explanationTitle = document.getElementById('explanation-title');
const explanationBody = document.getElementById('explanation-body');
const katexLedger = document.getElementById('katex-ledger');
const claimBadge = document.getElementById('claim-badge');
const scaleBadge = document.getElementById('scale-badge');

// Instantiate the upgraded Engine
const engine = new SomaMachineEngine(canvas, {
  onScaleChange: (currentSigma) => {
    valZoom.textContent = Math.round(currentSigma);
    updateExplanation(Math.round(currentSigma), engine.state.dimension, engine.state.lock_status);
  },
  onPoke: (hitPoint) => {
    // Visually pulse the poke button on click
    btnPoke.style.background = 'rgba(0, 255, 200, 0.4)';
    setTimeout(() => {
      btnPoke.style.background = 'transparent';
    }, 150);
  },
  onLockStatusChange: (isLocked) => {
    updateExplanation(Math.round(engine.state.sigma), engine.state.dimension, isLocked);
  }
});

// Start WebGL render loop
function animate(timestamp) {
  engine.tick(timestamp);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Morphing Explanation Database
const EXPLANATION_DB = {
  // Scenario A: Acoustic Analogy (Applied to Micro, Neural, and Human Scales)
  acoustic: {
    "4D": {
      title: "The Cold Cathedral (4D Material Substrate)",
      body: "We stand in a silent, ancient limestone cathedral. We observe only the static, physical boundary conditions: the height of the vaults, the cold stone walls, and the wooden pews. The air is completely still. In classical acoustics, this is a material container—dead, silent, and inactive.",
      equation: "V = L \\times W \\times H",
      badge: "formal"
    },
    "8D": {
      title: "The Struck Bell (8D Relational Propagator)",
      body: "We clap our hands sharply—a single, instantaneous energetic impulse \\(\\delta(t)\\). The silent cathedral instantly answers. A complex, rolling wave of sound expands, bounces off the limestone arches, and reverberates. The somatic field exists purely as the medium's continuous, causal **impulse response (the Green's function)**. The simple harmonic oscillator is not a material primitive; it is how the space responds when poked.",
      equation: "(\\nabla^2 + k^2) G(x, x') = -\\delta(x - x')",
      badge: "formal"
    },
    "11D": {
      title: "The Beautiful Attunement (11D Cognitive Compactification)",
      body: "The acoustic reverberations are organized into beautiful, preferred eigenfrequencies selected by the parabolic geometry of the space. The listener's nervous system acts as a **covariant functor**, mapping the topological winding numbers of these sound waves directly onto their own interoceptive, limbic matrix. The boundary perfectly encodes the bulk. The listener and the cathedral merge into a single resonant system.",
      equation: "\\tilde{G}_{ii}(\\omega) = \\frac{\\sigma^2_{\\text{eff}}}{\\omega^2 + \\lambda^2_i}",
      badge: "interpretive"
    }
  },
  // Scenario B: Gravity vs Somatic Equivalence (Applied to Systemic and Cosmological Scales)
  gravity: {
    "4D": {
      title: "The Bowling Ball on a Rubber Sheet (4D Material Substrate)",
      body: "We observe a heavy iron ball resting on a stretched rubber sheet. It creates a permanent, static 'dent' in the material, and smaller marbles roll down the slope toward it. In standard general relativity, this represents mass curving a passive, pre-existing spatial background.",
      equation: "g = 9.81 \\text{ m/s}^2",
      badge: "formal"
    },
    "8D": {
      title: "The Sudden Tilt (8D Relational Propagator)",
      body: "The rubber sheet is not a passive canvas. It is a dynamic, highly coupled wave-bearing medium. When we tap the sheet, the mass is accelerated by a propagating spacetime ripple. This is the **Somatic Equivalence Principle**. When a sudden hormonal spike causes your heart to accelerate, your internal emotional landscape physically tilts before any threshold is crossed. Your somatic field only feels the resulting 'throw'.",
      equation: "\\gamma \\dot{\\mathbf{e}} = -\\nabla H(\\mathbf{e}) + J(t)",
      badge: "formal"
    },
    "11D": {
      title: "The Unified Geodesic (11D Cognitive Compactification)",
      body: "Spacetime and the somatic body are shown to be the exact same physical manifold projected down to different subspaces. The emotional attractor states are the literal, beautiful, machine-verified differential geometry of the G2 compactified moduli space. Tectonic plates sliding, heartbeats accelerating, and galaxies orbiting are simply different resolution settings of the same continuous somatic field.",
      equation: "\\Lambda_{USF} \\equiv \\langle \\operatorname{tr} \\Phi \\rangle_0",
      badge: "interpretive"
    }
  },
  // Scenario C: Tectonic Fault Memory (Applied to Geophysical Scales)
  geophysical: {
    "4D": {
      title: "The Glarus Thrust (4D Material Substrate)",
      body: "We observe the towering cliffs of Glarus, Switzerland. Ancient Verrucano sandstone (250 million years old) rests directly on top of young Eocene flysch (35 million years old). Standard geology describes this as a static, physical contact line formed by millions of years of tectonic pressure.",
      equation: "\\tau = \\mu(\\sigma_n - P_f) + C",
      badge: "formal"
    },
    "8D": {
      title: "The Geological Seismogram (8D Relational Propagator)",
      body: "Solid rock is not rigid; under immense pressure, it behaves like an incredibly slow, highly viscous fluid. The Glarus Thrust is a giant, ten-million-year seismogram. Every earthquake, compressional slip, and continental collision is stored as residual shear-stress patterns in the rock's **Somatic Memory Kernel**.",
      equation: "K_{\\text{fault}}(\\tau) = K_0 e^{-\\tau/\\tau_m}\\theta(\\tau)",
      badge: "formal"
    },
    "11D": {
      title: "The Structural Isomorphism (11D Cognitive Compactification)",
      body: "Under the HoTT Univalence Axiom, equivalent structures are identical: \\((A \\simeq B) \\simeq (A = B)\\). The physical stress-energy landscape of the tectonic fault is structurally identical (isomorphic) to the deep, pre-verbal C-PTSD trauma wells of the human autonomic nervous system. Fascial armoring in a human body and the recumbent folds of Glarus sandstone are the exact same mathematical winding numbers.",
      equation: "\\operatorname{Wind}(G_{\\text{fault}}) = \\operatorname{Wind}(e_{\\text{trauma}})",
      badge: "interpretive"
    }
  },
  // Scenario D: Dyadic Co-Regulation (Applied at Scale 9)
  dyadic: {
    "4D": {
      title: "The Independent Entities (4D Material Substrate)",
      body: "We observe two distinct, physically separated human bodies or systems. Classical taxonomy treats them as separate, independent biological devices. Their emotional states are unrelated, discrete categories existing inside their own skin bounds.",
      equation: "\\mathbf{e}_A \\cap \\mathbf{e}_B = \\emptyset",
      badge: "formal"
    },
    "8D": {
      title: "Huygens Out of Phase (8D Relational Propagator)",
      body: "The two systems are close enough to interact, but high interoceptive or autonomic noise disrupts coordination. They drift and beat out of phase, creating turbulent emotional interference. The Arnold Tongue locking threshold is not met: \\(|\\omega_A - \\omega_B| \\ge \\kappa\\). Adjust the Langevin Noise slider down to decrease the noise floor and allow co-regulation to lock.",
      equation: "|\\omega_A - \\omega_B| \\ge \\kappa",
      badge: "formal"
    },
    "11D": {
      title: "The Arnold Tongue Co-Regulation (11D Locked Phase)",
      body: "Success! Autonomic noise is lowered below the threshold. The two separate systems instantly **phase-lock** into a single synchronized resonance. The Arnold Tongue locking condition is met: \\(|\\omega_A - \\omega_B| < \\kappa\\). The off-diagonal empathic propagators \\(G_{AB}\\) bind their spaces, demonstrating that co-regulation is a literal frequency-locking of two 11-dimensional manifolds.",
      equation: "|\\omega_A - \\omega_B| < \\kappa",
      badge: "interpretive"
    }
  }
};

// Update explanations based on Scale and Dimension
function updateExplanation(scale, dimension, isLocked = false) {
  let scenario = 'acoustic';
  
  if (scale === 9) {
    scenario = 'dyadic';
  } else if (scale >= 15 && scale <= 17) {
    scenario = 'geophysical';
  } else if (scale >= 18 || (scale >= 10 && scale <= 14)) {
    scenario = 'gravity';
  }

  // Force custom states in Dyadic Mode based on the Arnold Tongue lock status
  let content;
  if (scenario === 'dyadic') {
    if (dimension === '4D') {
      content = EXPLANATION_DB.dyadic["4D"];
    } else {
      // 8D or 11D maps to Unlocked or Locked states
      content = isLocked ? EXPLANATION_DB.dyadic["11D"] : EXPLANATION_DB.dyadic["8D"];
    }
  } else {
    content = EXPLANATION_DB[scenario][dimension];
  }
  
  explanationTitle.textContent = content.title;
  explanationBody.innerHTML = content.body;
  
  // Dynamic Badge Assignment
  claimBadge.className = `badge ${content.badge}`;
  claimBadge.textContent = content.badge;

  // Swap Scale Badge (Clinically certified or Interpretive Field)
  if (scale === 7 || scale === 8 || scale === 9) {
    scaleBadge.className = 'badge sourced';
    scaleBadge.textContent = isLocked && scale === 9 ? 'Co-Regulating' : 'Human-Clinical';
    if (isLocked && scale === 9) {
      scaleBadge.style.background = 'rgba(212, 175, 55, 0.2)';
      scaleBadge.style.color = '#ffd700';
      scaleBadge.style.borderColor = '#ffd700';
    } else {
      scaleBadge.style.background = '';
      scaleBadge.style.color = '';
      scaleBadge.style.borderColor = '';
    }
  } else {
    scaleBadge.className = 'badge formal';
    scaleBadge.textContent = 'Interpretive / Field';
    scaleBadge.style.background = '';
    scaleBadge.style.color = '';
    scaleBadge.style.borderColor = '';
  }

  // Safe KaTeX renderer
  if (window.katex) {
    try {
      window.katex.render(content.equation, katexLedger, { throwOnError: false });
    } catch (err) {
      katexLedger.textContent = content.equation;
    }
  } else {
    katexLedger.textContent = content.equation;
  }
}

// Event Listeners: Segmented Dimension Selector
document.getElementById('dimension-selector').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    document.querySelectorAll('#dimension-selector button').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const dim = e.target.getAttribute('data-dim');
    engine.setDimensionLevel(dim);
    updateExplanation(Math.round(engine.state.sigma), dim, engine.state.lock_status);
  }
});

// Event Listeners: Perspective Selector
lensSelector.addEventListener('change', (e) => {
  const lens = e.target.value;
  let targetSigma = 8;
  
  if (lens === "Human / Clinical") targetSigma = 8;
  else if (lens === "Swarms / Collective") targetSigma = 7;
  else if (lens === "Geophysics / Landscape") targetSigma = 15;
  else if (lens === "Astrophysics / Cosmology") targetSigma = 19;

  zoomRange.value = targetSigma;
  valZoom.textContent = targetSigma;
  engine.setTargetSigma(targetSigma);
});

// Event Listeners: Somatic Injector (Poke)
btnPoke.addEventListener('click', () => {
  // Simulate a somatic injection at the center of the mesh A & B
  const targetPoint = new THREE.Vector3(0, 0, 2.0); 
  engine.state.poke_point.copy(targetPoint);
  engine.uniforms.u_poke_point.value.copy(targetPoint);
  
  if (engine.meshB.visible) {
    engine.state.poke_point_B.copy(targetPoint);
    engine.uniformsB.u_poke_point.value.copy(targetPoint);
    engine.state.pulseB = 0.01;
  }

  engine.state.pulse = 0.01;
  engine.state.energy = 0.9;
  engine.state.tension = 0.8;
});

// Event Listeners: Biometric Mirror Box
btnMirror.addEventListener('click', () => {
  const active = !engine.state.mirror_box;
  engine.toggleMirrorBox(active);
  
  if (active) {
    btnMirror.classList.add('active');
    btnMirror.textContent = "Somatic Mirror Box [ON]";
  } else {
    btnMirror.classList.remove('active');\n    btnMirror.textContent = \"Somatic Mirror Box [OFF]\";\n  }\n});\n\n// Event Listeners: Timeline HUD Ranges\nzoomRange.addEventListener('input', (e) => {\n  const val = parseInt(e.target.value);\n  valZoom.textContent = val;\n  engine.setTargetSigma(val);\n});\n\nsmoothingRange.addEventListener('input', (e) => {\n  const val = parseFloat(e.target.value);\n  valSmoothing.textContent = val.toFixed(2);\n  engine.setZoomSmoothing(val);\n});\n\nnoiseRange.addEventListener('input', (e) => {\n  const val = parseFloat(e.target.value);\n  valNoise.textContent = val.toFixed(2);\n  engine.setLimbicNoise(val);\n});\n\n// Trigger initial ledger load\nupdateExplanation(8, \"11D\", false);\n"
}
