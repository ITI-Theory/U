# Gemini Handoff: Soma Field Operator

## Assignment

Develop the **Soma Field Operator** as the interactive presentation and exploration layer above the [T]-Theory Cheat Sheets.

This is **not** a simulation or model of the universe. It is an interface to the research programme: it must make the hierarchy, equations, source material, claim status, and open hypotheses inspectable.

Do not modify `Dist/PAPERS.yaml`. That file is the master publication-release registry, not application data.

## Existing App

The existing local app is a Vite + Three.js scene with a KaTeX equation ledger. Its source folder contains `index.html`, `style.css`, and `main.js`.

Visual language to preserve:

- Black space background with cyan, green, violet, hot-pink, and gold field layers.
- Space Mono and Syne UI typography.
- KaTeX-rendered mathematical ledger.
- The visual reading order: **BODY -> NERVES -> LIMBIC -> MIND**.
- No medical diagnostic claims; this is a non-medical educational/research visualisation.

The current scene is successful as a human-scale organism visual, but its 20-position zoom control is not yet a real scale operator. It mostly changes text, and from high scales it hides the organism and substitutes a generic rock/worldline. That must be replaced with genuinely distinct scenes and transitions.

## Core Principle

The Operator presents [T]-Theory. It does not assert that every visual mapping is a literal identity in nature.

Every display needs one of these claim badges:

- **FORMAL**: source/proof-backed structural result.
- **SOURCED**: described in a named paper or Cheat Sheet.
- **INTERPRETIVE**: a visual or cross-scale hypothesis.

Never use `verified` for an interpretive visual mapping.

## Authority Map

There is one master **publication registry**, and several distinct canonical content sources. Do not treat these as duplicate sources of truth: each owns a different concern.

| Authority | Owns | Use in the Operator |
| --- | --- | --- |
| `Dist/PAPERS.yaml` | Paper/dataset/collection identity, title, DOI, status, distribution file, release metadata | Use as the publication catalogue and source link index. Do not edit it. |
| Individual paper Markdown in `paper/soma/<slug>/` | Paper text, equations, claims, citations | Cite this material in the Cheat Sheet drawer. |
| `U/paper/proofs/*.lean` | Formal theorem statements and proof status | Mark a claim `FORMAL` only when grounded here or in an explicitly identified proof output. |
| `U/paper/Makefile` and `Part2/fractal-programme/Makefile` | Canonical build registration and targets | Do not duplicate or modify the build lists from the Operator. |
| `Part2/fractal-programme/cheatsheets/*.md` | Fifteen domain explanations | Use as the explanation layer behind the Cheat Sheet drawer. |
| `paper/soma/ttheory-cheatsheet/ttheory-cheatsheet.md` | Compact master theory map | Use for the top-level operator ledger, hierarchy, and 20-scale map. |

## Publication Registry: `Dist/PAPERS.yaml`

This is the sole master registry for public research records. It is the release/source-link index for the Operator, but it is **not** the authority for scientific prose, proof content, or the interactive scene model.

### Canonical Papers

| ID | Slug | Title | Status | DOI |
| --- | --- | --- | --- | --- |
| P1 | `soma-field-paper` | The Soma-Field: A Wave-Based Model of Emotional Dynamics | published | 10.5281/zenodo.20350515 |
| P2 | `quantum-soma-penrose` | Quantum Topology and Trauma: A Soma-Field Model of Limbic Gate Tunnelling | published | 10.5281/zenodo.20351230 |
| P3 | `mathematical-co-identification` | Mathematical Co-identification: A Formal Model of Therapeutic Attunement | published | 10.5281/zenodo.20287981 |
| P4 | `soma-field-synthesis` | The Soma-Field Research Programme: A Synthesis | published | 10.5281/zenodo.20460118 |
| P5 | `soma-physical-substrate` | The Physical Substrate of the Soma-Field | published | 10.5281/zenodo.20460357 |
| P6 | `soma-field-book` | A Voyage into Trauma: The Soma-Field as Lived Experience | published | 10.5281/zenodo.20460455 |
| P7 | `soma-field-patient-pov` | Field Notes from the Inside: A Patient Perspective on the Soma-Field | published | 10.5281/zenodo.20460523 |
| P8 | `the-tensor` | The Tensor: Formal Structure of the Universal Somatic Field | published | 10.5281/zenodo.20460613 |
| P9 | `music-affect-dynamics` | Music-Induced Affect Dynamics: A Soma-Field Model of the BRECVEMA Mechanisms | published | 10.5281/zenodo.20460685 |
| P10 | `soma-temporal-dynamics` | Temporal Dynamics of the Universal Somatic Field | published | 10.5281/zenodo.21872784 |
| P11 | `zoomable-somatic-field` | The Zoomable Universal Somatic Field: A Scale-Invariant Green's Function Architecture | needs-new-version | 10.5281/zenodo.21873390 |
| P12 | `experimental-validation` | Experimental Benchmarks for the Universal Somatic Field Framework | needs-new-version | 10.5281/zenodo.21873455 |
| P13 | `missing-limbic-layer` | The Missing Limbic Layer: A Somatic Field Extension of Hopfield Networks via the Correspondence Principle | published | 10.5281/zenodo.21873645 |
| P14 | `usf-euclidean-qft` | The Universal Somatic Field as a Euclidean Quantum Field Theory | published | 10.5281/zenodo.21874214 |
| P15 | `usf-interacting-qft` | Osterwalder-Schrader Axioms for the Interacting Universal Somatic Field | published | 10.5281/zenodo.21874331 |
| P16 | `geographic-somatic-field` | The Geographic Somatic Field: Scale-Invariant Wave Propagation in Human Landscapes | published | 10.5281/zenodo.21874415 |
| P17 | `gestalt-field-dynamics` | The Mathematical Foundations of Gestalt Field Dynamics | published | 10.5281/zenodo.21874503 |
| P18 | `preverbal-manifold` | The Pre-Verbal Manifold: A Soma-Field Case Study of Acquired Neurodevelopmental Phenotypes | published | 10.5281/zenodo.21874564 |
| P19 | `swarm-propagator` | Single-Step Multi-Agent Coordination via Green's Function Propagators | published | 10.5281/zenodo.21874622 |
| P20 | `universal-somatic-field` | The Universal Somatic Field: Green's Functions as Scale-Invariant Oscillators | published | 10.5281/zenodo.21874683 |
| P21 | `cosmological-constant-derivation` | The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic Field | pending-review | none |
| P22 | `dark-matter-spatial-vacuum` | Dark Matter as the Spatial Block Vacuum of 11-Dimensional M-Theory | pending-upload | none |
| P23 | `ttheory-phenomena` | [T]-Theory as Fixed Point: The Universal Somatic Field Describes Its Own Propagation | pending-upload | none |
| P24 | `g2-symmetry-breaking` | G2 Symmetry Breaking in the BRECVEMA Emotional Tensor | pending-upload | none |

### Additional Registered Records

| Type | ID | Slug | Title | Status |
| --- | --- | --- | --- | --- |
| Dataset | E1 | `quant-exp-1` | QUANT-EXP-1: Quantum Annealing Reachability Experiment | published |
| Dataset | D1 | `SFT-DEMO-CASE` | SFT Applied: A Worked Clinical Example | published |
| Dataset | D2 | `lean-proofs-appendix` | Lean 4 Formal Proofs Appendix | published |
| Collection | C1 | `omnibus` | The Soma-Field: Collected Works — 1st Edition | published |
| Collection | C1v2 | `omnibus-v2` | The Soma-Field: Collected Works — Second Edition | needs-new-version |
| Collection | C2 | `ttheory-fractal-programme` | [T]-Theory: The Complete Fractal Programme | needs-new-version |
| Collection | C2-vol1 | `ttheory-vol1` | [T]-Theory Vol 1: Foundation | pending-upload |
| Collection | C2-vol2 | `ttheory-vol2` | [T]-Theory Vol 2: Application | pending-upload |
| Reference | CS1 | `ttheory-cheatsheet` | [T]-Theory Cheatsheet | published |

### Relevant Sources

| Source | What it provides |
| --- | --- |
| `paper/soma/ttheory-cheatsheet/ttheory-cheatsheet.md` | Master field equation, 11D decomposition, 20-scale architecture, Zoom Operator |
| `Part2/fractal-programme/cheatsheets/` | Domain explanations and future Cheat Sheet drawer content |
| `paper/soma/music-affect-dynamics/music-affect-dynamics.md` | BRECVEMA mechanisms and affect-dynamics equations |

## Two Independent Operations

Do not conflate complexity projection with scale zooming.

### Hierarchy Projection

$$\pi_{11\to8\to4}: \mathcal{M}_{11}\to\mathcal{M}_8\to\mathcal{M}_4$$

This is a complexity projection:

| Level | Structure | Meaning | Current visual |
| --- | --- | --- | --- |
| 4D | $M_4$ | physical spacetime substrate | static grey physical body with gold brain/nerves |
| 8D | $M_4 + P_3 + L_1$ | propagator plus regulation/attractor axis | physical body plus one green response volume and violet double well |
| 11D | $M_4 + P_3 + L_1 + C_3$ | integrated cortex/matrix geometry | 8D scene plus pink head-local fractal/matrix geometry |

At the existing human/vertebrate scene, these controls must remain working:

- **4D**: static grey wireframe, gold physical brain and nervous system; no propagator, limbic, or cortex/mind field.
- **8D**: physical body plus one green $P_3$ propagator response and one violet $L_1$ double well/trauma barrier; no cortex/mind geometry.
- **11D**: physical body, propagator, limbic well, and pink $C_3$ head-local matrix/fractal geometry.

### Zoom Operator

$$\Lambda_\sigma: \operatorname{Substrate}(\sigma)\to\operatorname{Substrate}(\sigma+1)$$

The scale morphism must preserve a declared structural invariant while **retyping** the substrate and observables. The app must never imply that human-scale variables retain literal units at another scale.

For every forward/reverse step, visibly show the source scale, target scale, selected substrate, observable, and new geometry.

## The 20 Zoom Scenes

Each scale needs a distinct composition, camera framing, time behavior, selected observable, equation ledger, source reference, and claim badge. Labels alone are insufficient. Use smooth transitions between adjacent scenes.

| Sigma | Label | Substrate | Visual mode | Main observable | Affect mode |
| ---: | --- | --- | --- | --- | --- |
| 0 | Quantum foam | vacuum fluctuation | quantum lattice | $\hbar_{geo}$ / $\tau_m$ | interpretive |
| 1 | String scale | worldsheet / compactification | compactification | mode spectrum | interpretive |
| 2 | Nuclear | nuclear field | nuclear shell | binding response | interpretive |
| 3 | Atomic | atomic field | orbital field | Coulomb kernel | interpretive |
| 4 | Molecular | molecular landscape | molecular network | folding basin | interpretive |
| 5 | Cellular / neural | cell and local EMF | cell field | membrane response | interpretive |
| 6 | Local circuit | cortical column | circuit field | oscillation / coherence | interpretive |
| 7 | Whole brain | global somatic field | brain field | percept threshold | human-clinical |
| 8 | Human / vertebrate | 11D organism | organism | $M_4+P_3+L_1+C_3$ | human-clinical |
| 9 | Dyadic | two-person field | dyadic coupling | rapport / locking | interpretive |
| 10 | Group / swarm | collective field | swarm | coordination / spectral gap | interpretive |
| 11 | Community | social network | network | trust / coupling | interpretive |
| 12 | Regional | cultural field | regional flow | memory / diffusion | interpretive |
| 13 | Civilisational | institutional field | civilisation | attractor landscape | interpretive |
| 14 | Species | evolutionary field | species tree | selection / memory | interpretive |
| 15 | Geological | tectonic soma | tectonic | strain / fault memory | interpretive |
| 16 | Planetary | planetary field | planetary | global modes | interpretive |
| 17 | Stellar | stellar field | stellar | helioseismic modes | interpretive |
| 18 | Galactic | galactic field | galactic | lensing kernel | interpretive |
| 19 | Observable universe | cosmological field | cosmic web | $\Lambda_{USF}$ / $H_0$ | interpretive |

Suggested scene families:

- 0-3: field lattice, compactification, nuclear/atomic response.
- 4-6: molecular/cellular/circuit networks and local propagation.
- 7-8: brain and organism, retaining the existing hierarchy visual.
- 9-11: dyadic coupling, swarm, and network coherence.
- 12-14: regional/civilisational/species flows and attractor landscapes.
- 15-17: tectonic memory, planetary modes, stellar oscillation.
- 18-19: galactic field and cosmic web with cosmological ledger.

These are presentation-level geometries. They must display `INTERPRETIVE` where they are not formal source claims.

## Field Layers

| Layer | Dimensions | Label | Visual rule | Status |
| --- | --- | --- | --- | --- |
| $M_4$ | D1-4 | SPACETIME / SUBSTRATE | grey wireframe or scale-specific material/worldline | FORMAL |
| $P_3$ | D5-7 | PROPAGATOR / GREEN RESPONSE | one response volume, not duplicate rings | FORMAL |
| $L_1$ | D8 | REGULATION / ATTRACTOR AXIS | double well, barrier depth, transition trajectory | FORMAL at organism scale |
| $C_3$ | D9-11 | CORTEX / MATRIX GEOMETRY | head-local fractal and matrix spectrum | FORMAL at organism scale |

## BRECVEMA Inspector

BRECVEMA is a **sourced human-scale model** from P9, not a universal literal-emotion claim. It describes mechanisms by which music induces emotion as forcing functions on a 16-dimensional soma-field state:

$$\mathbf{e}(t)\in[0,1]^{16}$$

with eight somatic and eight cognitive affect-mode intensities.

The existing app has an inspector. Preserve and improve it, rather than returning to an opaque overlay. It must show the full name, a plain-language explanation, parameter, field action, KaTeX equation, `SOURCED / P9 MUSIC-AFFECT DYNAMICS` badge, and a highlighted route into the $L_1$ limbic field.

| ID | Mechanism | Parameter | Field action | Equation / relation |
| --- | --- | --- | --- | --- |
| B | Brainstem reflex | $J(t)$ | transient source injection | $\gamma\dot{\mathbf e}=-\nabla H(\mathbf e)+J(t)$ |
| R | Rhythmic entrainment | $\gamma$ | damping and phase-locking modulation | $\lvert\omega_{ext}-\omega_0\rvert<\Delta\omega_{lock}(\kappa)$ |
| E1 | Evaluative conditioning | $\mathbf b$ | learned bias-vector shift | $H(\mathbf e)=\frac12\mathbf e^\top W\mathbf e-\mathbf b^\top\mathbf e$ |
| C | Emotional contagion | $\kappa$ | external-field coupling | $\dot\phi_1-\dot\phi_2\to0$ for sufficient coupling |
| V | Visual imagery | $J_{internal}(t)$ | endogenous source trajectory | $\Phi=\Phi^{(0)}+G_R\ast(J_{external}+J_{internal})$ |
| E2 | Episodic memory | $K(\tau)$ | memory-kernel reweighting | $K(\tau)=K_0e^{-\tau/\tau_m}\theta(\tau)$ |
| M | Musical expectancy | $\Delta V$ | transient wells and barriers | $\langle T\rangle\propto e^{\Delta V/D}$ |
| A | Aesthetic judgement | $\mathbf b$ | cognitive appraisal/bias shift | $H(\mathbf e)\mapsto H(\mathbf e)-\Delta\mathbf b^\top\mathbf e$ |

## Cross-Scale Affect Dynamics

Provide an explicit segmented mode:

- **OFF**: formal field and scale data only.
- **INTERPRETIVE**: show retyped variables meaningful to the selected substrate: stability, forcing, memory, coupling, attractor basin, and transition rate.
- **HUMAN-CLINICAL**: use BRECVEMA labels and clinical vocabulary only at declared organism/clinical scales.

Do **not** claim that cities, planets, or the universe literally have human emotions. At non-human scales use regulation, memory, coupling, stability, forcing, and attractor dynamics, with an `INTERPRETIVE` badge.

`GREGMA` was mentioned verbally but has no confirmed spelling, source, dimensions, or formal status. Treat it as unresolved until supplied; do not invent or canonicalise it.

## Cheat Sheet Drawer

Add a `CHEAT SHEET` control at every scale and layer. Its side panel must contain:

- source Cheat Sheet title;
- short explanation relevant to the selected state;
- key KaTeX equation(s);
- local source path/deep link;
- claim badge;
- one sentence: `What changes at this scale`.

The Operator is the navigation layer; the Cheat Sheets are the explanatory/evidence layer.

## Technical Constraints

- Continue to use Three.js, KaTeX, and the existing visual language.
- Keep hierarchy projection and zoom as independent controls.
- Do not introduce remote APIs for theory content.
- Do not alter release/publication metadata.
- Use incremental changes and preserve existing source files.
- Validate UI states at sigma 0, 8, 12, and 19; validate 4D/8D/11D at sigma 8; validate BRECVEMA controls and claim badges.
- Build real visual transitions: no blank scene and no generic rock fallback for all large scales.

## Required Response

First produce a technically specific implementation plan that identifies the scene abstraction, local data representation, state transitions, and validation approach. Do not begin coding until the plan has been approved.
