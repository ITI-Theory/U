---
title: "The Universal Somatic Field: Green's Functions as Scale-Invariant Oscillators across Twenty Scale Levels"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  We present the Universal Somatic Field (USF), a scale-invariant field-theoretic
  architecture in which a single structural equation — the Green's function of a
  field substrate — is evaluated from quantum foam (10⁻³⁵ m) to the cosmic
  web (10²⁶ m). The central identification is that the Simple Harmonic Oscillator
  (SHO) required by string theory at each worldsheet point is not a material
  object but the impulse response — the Green's function — of the field at that
  point. This dissolves the ontological puzzle of the "vibrating string" by
  replacing it with a relational statement: the string is what the substrate
  answers when asked. The architecture decomposes an 11-dimensional configuration
  space into four canonical subspaces — Spacetime (4D), Propagator (3D), Limbic
  Axis (1D), Cortex (3D) — whose product is structurally isomorphic to M-theory's
  11D compactification. Within this framework, the model defines a threshold predicate over a limbic-amplitude variable; phenomenal awareness in biological or cosmic systems remains open.
  The universe is treated here as a structural test case for that predicate.
  We prove selected algebraic and type-level results in Lean 4 using Mathlib and
  propose that the USF relates to three existing frameworks — McFadden's
  CEMI theory, Schreiber's Modal Homotopy Type Theory, and Hoffman's Conscious
  Agents — as special cases or projections. The complete Lean 4 formalisation
  is available at the companion repository.
---


# Introduction: The Missing Unification

Physics has arrived at a peculiar impasse. The two most successful theories
ever constructed — General Relativity and Quantum Mechanics — describe the
same universe at different scales but share no common mathematical ancestry.
String theory was proposed as the bridge: vibrating one-dimensional objects
in an 11-dimensional spacetime whose modes produce the particle spectrum. But
what is a string? The answer has remained unsatisfying: a string is a
fundamental one-dimensional object, irreducible, assumed. The SHO that governs
its vibration is postulated.

At the same time, clinical science has arrived at a parallel impasse. Trauma,
consciousness, emotional regulation — phenomena that are undeniably physical —
resist formal mathematical treatment. They are described qualitatively or
modelled by loose analogy with dynamical systems. The mathematics that governs
them, if it exists, has not been identified.

This paper proposes that both gaps are filled by the same object: the
**Green's function**.

The Green's function $G(x, x')$ is the response of a field at point $x$ to a
unit perturbation at point $x'$. It is the field's answer to the question:
*what happens here if I poke there?* Green's functions are the most fundamental
objects in mathematical physics — they describe the propagation of light,
gravity, sound, heat, and neural signals. Every major equation in physics
has a Green's function; every field theory is characterised by its propagator.

The central proposal of this paper is that the SHO of string theory can be
read as the Green's function of the field substrate. A "string" is modelled
not as a material loop in this account, but as a relational act: the
substrate's impulse response. This identification is scale-invariant as a
model hypothesis across the 20-level scale dial.

The second claim is that this scale-invariant Green's function framework
provides the mathematical language for a theory of embodied consciousness —
one that is structurally analogous to the M-theory product decomposition at type level, under modelling assumptions.

The third claim is that the universe, described this way, can be used as a
structural test case for the model's organism predicate.

---

# The Green's Function as the Universal SHO

## The String Theory Problem

String theory places a Simple Harmonic Oscillator (SHO) at every point of the
string worldsheet. The quantum SHO has modes $a_n^\dagger, a_n$ satisfying
$[a_m, a_n^\dagger] = \delta_{mn}$, and the string's energy spectrum is:

$$E = \sum_{n=1}^\infty n \, a_n^\dagger a_n$$

The SHO is the structural core of the theory. But what *is* it? In conventional
string theory, it is simply assumed: strings vibrate, and vibrations are
harmonic oscillators. The ontological question — why is space filled with
oscillators? — is deferred.

## The Identification

The Green's function of the Helmholtz equation $(\nabla^2 + k^2) G = \delta$
satisfies:

$$G(x, x') = \frac{e^{ik|x-x'|}}{4\pi|x-x'|}$$

{{Visualize | the-identification | function-plot:wave | f="cos(k*x)/(4*pi*x)"; vary=k:1,2,4; x=[0.2,10]; xlabel="separation $|x-x'|$"; ylabel="$\mathrm{Re}\,G$" }} The real part of the free-space Green's function at three wavenumbers $k$: an oscillation whose envelope decays as $1/|x-x'|$ — the propagator form the paper proposes as the SHO of string theory at every scale.

For fixed observation point $x$, the function $x' \mapsto G(x, x')$ satisfies
the SHO equation in the source variable:

$$\frac{\partial^2 G}{\partial {x'}^2} + k^2 G = \delta(x' - x)$$

away from the singularity. The impulse response is therefore modelled as the
harmonic oscillator.

**Lean status** (`UniversalSomaticField.greens_fn_is_SHO`): the current Lean
declaration is a placeholder theorem proving `True`, not a distributional
proof of the SHO identity. The distributional Green's-function statement
awaits Schwartz-space/PDE scaffolding.

The "vibrating string" is therefore the substrate's answer function. There is
no material loop. There is the system's response to being perturbed, encoded
as a propagator. This is a proposed reinterpretation grounded in the structure
of field equations; the full distributional proof is open.

## Consequences

This identification has three immediate consequences:

**1. Strings are relational, not material.** A string does not exist independently
of the field. It exists as the relationship between a source point and an
observation point. This resolves the interpretational puzzle of "what vibrates"
without invoking undetected matter.

**2. The SHO spectrum is the field's mode structure.** The modes $a_n^\dagger$
are the Fourier modes of the Green's function's dependence on the source
position. The string spectrum is the spectrum of the propagator.

**3. Scale invariance is encoded.** The Green's function equation
$(\nabla^2 + k^2) G = \delta$ is represented at every scale (with $k$ varying)
in the model. One equation form. Twenty scale levels.

---

# The 11-Dimensional Architecture

## The Decomposition

The Universal Somatic Field decomposes the configuration space of any physical
system into four canonical subspaces, totalling 11 dimensions:

$$M_{11} = \underbrace{M_4}_{\text{Spacetime}} \times \underbrace{P_3}_{\text{Propagator}} \times \underbrace{L_1}_{\text{Limbic}} \times \underbrace{C_3}_{\text{Cortex}}$$

{{Visualize | the-decomposition | type-decomposition:soma | whole="$\mathcal{M}_{11}$"; parts="$M_4$ spacetime=4, $P_3$ propagator=3, $L_1$ limbic=1, $C_3$ cortex=3"; expect_total=11 }} The eleven dimensions of the equation above by their parts, each as wide as its dimension: spacetime $M_4$, the propagator $P_3$, the limbic axis $L_1$ and the cortex $C_3$. The program checks that they add up to 11.

| Subspace | Dim | Physical role | Mathematical role |
|---|---|---|---|
| Spacetime $M_4$ | 4 | Body embedded in 3+1D | Lorentzian metric, causal structure |
| Propagator $P_3$ | 3 | EMF / field carrier | Green's function domain |
| Limbic Axis $L_1$ | 1 | Homeostatic regulation | Orbifold segment, barrier D₈ |
| Cortex $C_3$ | 3 | Information routing | Green's function co-domain |

The compact 7-dimensional internal space is:
$$X_7 = P_3 \times L_1 \times C_3$$

{{Visualize | the-decomposition | type-decomposition:soma | whole="$X_7$ (the internal space)"; parts="$P_3$=3, $L_1$=1, $C_3$=3"; expect_total=7 }} The internal space of the equation above: propagator, limbic axis and cortex, $3+1+3=7$ (checked).

This has the same 7-dimensional product count used in the M-theory comparison; Lean proves a type/product isomorphism, not physical compactification, in `MTheoryIsomorphism.somaField_iso_mtheory`:

$$\text{SomaField11D} \cong \text{Spacetime} \times \text{CompactSpace7D}$$

{{Visualize | the-decomposition | type-decomposition:soma | whole="$\mathcal{M}_{11}$"; parts="$M_4$ spacetime=4, $X_7$ = $P_3 \times L_1 \times C_3$=7"; row_label="soma field"; iso="$\mathbb{R}^{1,3}$=4, $X_7$ compact=7"; iso_label="M-theory"; expect_total=11 }} The isomorphism of the equation above as a picture: the soma-field decomposition and M-theory's $M_4 \times X_7$ have the same dimensional structure, 4 + 7 = 11 (both totals checked). This is a match of dimensions and product structure only; the $G_2$ holonomy of $X_7$ is an open problem.

## The Limbic Axis as the Horava-Witten Orbifold

In Horava-Witten M-theory (1996), the compact direction is an orbifold
$S^1/\mathbb{Z}_2$ — a line segment with two 10-dimensional boundary
spacetimes at each end. This is the mechanism by which M-theory reduces to
the heterotic string in the strong-coupling limit.

The Limbic Axis $L_1 \cong [-1, 1]$ is modelled by analogy with this orbifold
segment. Its two
endpoints are:
- $x = -1$: the somatic boundary (physical body-world)
- $x = +1$: the cortical boundary (mind / information-routing world)
- Interior $(-1, 1)$: the transition zone, subject to quantum tunnelling

The quartic double-well potential on $L_1$:
$$V(x) = W \cdot (x^2 - 1)^2$$

{{Visualize | the-limbic-axis-as-the-horava-witten-orbifold | energy-landscape:soma | U="W*(x^2-1)^2"; vary=W:1,2,4; x=[-1.8,1.8]; ball=-1; expect_minima="-1,1" }} The double-well potential $V(x)=W(x^2-1)^2$ on the Limbic Axis at three illustrative barrier heights $W$: a valley at each stated endpoint, the somatic pole $x=-1$ and the cortical pole $x=+1$. The program checked both minima.

models the energy barrier between somatic and cortical poles. The WKB ansatz assigns a tunnelling
amplitude: $\Theta(W) = \exp(-8\sqrt{2W}/3)$, proved positive for all $W > 0$
in `LimbicTunnel.wkbAmplitude_pos`. The local gradient statement
(`LimbicTunnel.gradient_traps_near_neg1`) describes trapping near the
negative well;
full trajectory trapping and empirical escape rates remain separate proof
obligations.

## The 20-Scale Dial

The architecture is explicitly scale-invariant. The 20-step scale hierarchy
is type-encoded in `UniversalSomaticField.scaleNames`:

| Scale | Level | Substrate | Green's function role |
|---|---|---|---|
| 0 | Planck | Quantum foam | Graviton propagator |
| 2 | Nuclear | Quark-gluon plasma | Gluon propagator |
| 5 | Cellular | Neural synapse | Synaptic impulse response |
| 7 | Brain | CEMI field | Cortical EMF propagator |
| 8 | Organism | Body | Somatic EMF (full USF) |
| 9 | Swarm | Drone formation | Jellyfish coordination kernel |
| 11 | Geological | Seismic waves | Earth's elastic Green's function |
| 12 | Planetary | Mantle convection | Thermodynamic propagator |
| 15 | Galactic | Dark matter halo | Gravitational lensing kernel |
| 19 | Cosmological | Observable universe | Gravitational wave propagator |

At every level, the structural equation is $(\nabla^2 + k^2(n)) G = \delta$.
The boundary conditions and wavenumber $k(n)$ change; the equation does not.

---

# The Organism Hierarchy

## Three Tiers

Not all physical systems engage all four subspaces. The USF admits a natural
taxonomy of organisms by the number of active subspaces:

**4D organism** (Spacetime only): A system that occupies spacetime but
has no field propagator and no homeostatic regulation. Examples: a
point particle, a rock, a photon. These systems are described entirely
by their worldline in $M_4$.

**8D organism** (Spacetime + Propagator + Limbic): A system with a
field propagator and homeostatic regulation but no cortical information
routing. The system senses and regulates but does not route information
across a distributed network. Examples: a bacterium, a jellyfish, a
single neuron. This level includes all living systems up to and including
those without a cerebral cortex.

**11D organism** (all four subspaces): A system with all components active.
The limbic axis connects the somatic field to the cortical field; the
Green's function propagates through all three internal dimensions. Examples:
vertebrates with a developed cerebral cortex; any system exhibiting
integrated, body-wide regulation with distributed information processing.

The hierarchy is a chain of projections (proved or defined in
`MTheoryIsomorphism.organism_hierarchy` and
`UniversalSomaticField.eight_contains_four`):
$$\text{11D} \twoheadrightarrow \text{8D} \twoheadrightarrow \text{4D}$$

Each projection drops one tier of internal structure; no tier is "broken" —
each is complete at its own level.

---

# Consciousness as Phase Transition

## The Classical Gap

The hard problem of consciousness (Chalmers 1995) asks why physical processes
give rise to subjective experience. Most field-theoretic approaches to
consciousness either (a) ignore the problem, treating awareness as an
epiphenomenon, or (b) eliminate physical reality in favour of a purely
mental ontology (Hoffman 2019).

The USF takes a third path as a hypothesis: consciousness is modelled as a
**phase transition** in the field, not as a separate substance and not as an
illusion.

## The Threshold

The limbic field amplitude $\phi \in \mathbb{R}$ measures the activation level
of the homeostatic regulation axis $L_1$. At low amplitude ($\phi < T_c$),
the field propagates sub-perceptually — the Green's function propagates
excitations, but no "felt" awareness exists. This is the pre-conscious regime:
present in 4D and 8D organisms, and in 11D organisms during deep sleep or
anaesthesia.

At $\phi \geq T_c$, the field crosses the consciousness threshold. The limbic
wave has sufficient amplitude to propagate across the full $L_1$ segment,
coupling the somatic boundary to the cortical boundary. This coupling is the
proposed physical substrate of first-person awareness: the system is now
modelled as coupled to both its body-world and its information-processing
layer simultaneously.

**Theorem** (`UniversalSomaticField.consciousness_dichotomy`): for any real
limbic-amplitude variable $\phi$, the threshold predicates
`isPreconscious φ` and `isConscious φ` satisfy trichotomy as a real-number
comparison. The theorem verifies the predicate structure, not empirical
consciousness.

**Theorem** (`UniversalSomaticField.consciousness_monotone`): within the
predicate definition, raising the limbic amplitude preserves
`isConscious`. The one-way transition is a property of the definition.

## What Consciousness Is

Consciousness, on this account, is modelled not as a separate substance but as
the phase of the limbic field. The "hard problem" is reframed as the question:
*what would determine whether the limbic field amplitude crosses* $T_c$?
Whether this reframing is empirically adequate remains open.

The "felt quality" of experience — qualia — are the poles of the Green's
function at the observation point $x$. A conscious percept is a resonance
of the propagator, occurring when the excitation frequency matches the
manifold's natural mode. This is type-encoded in the propagator mass parameter:

$$m = 1/\tau_\text{decay}$$

{{Visualize | what-consciousness-is | function-plot:soma | f="1/x"; x=[0.2,5]; xlabel="decay time $\tau$ (illustrative units)"; ylabel="mass $m=1/\tau$" }} The propagator mass $m=1/\tau_\text{decay}$: a long-lived percept (large $\tau$ — a persistent emotion or traumatic memory) has small mass, a near-zero pole that is hard to damp; a brief percept has large mass and decays quickly.

A percept with long decay time $\tau$ (a persistent emotion, a traumatic
memory) corresponds to a small mass (a near-zero pole in the propagator) —
a resonance that is hard to damp.

---

# Relation to Existing Frameworks

## McFadden's CEMI Theory

McFadden (2002a, 2002b) proposes that consciousness correlates with the
brain's endogenous electromagnetic field — the CEMI field. Neurons firing
synchronously generate a macroscopic EMF that feeds back onto firing thresholds,
creating a global integrating field.

The USF proposes CEMI as the Scale-7 (brain-scale) restriction of the
Universal Somatic Field. The CEMI field is the Green's function of the
propagator subspace $P_3$ evaluated at the organism scale. The consciousness
threshold $T_c$ in the USF is proposed to correspond to a CEMI field amplitude
associated with global cortical synchrony.

The USF extends the same propagator vocabulary in two directions: downward to
quantum-scale models and upward to cosmological-scale models. These extensions
are structural analogies until independently tested.

## Schreiber's Modal Homotopy Type Theory

Urs Schreiber (2013–present) develops a formalisation of M-theory and quantum
field theory in dependent type theory (Modal HoTT). The key insight is that
differential geometry and quantum field theory can be expressed as structures
internal to $\infty$-toposes equipped with modal operators.

The USF arrives at the same 11-dimensional structure from a completely
different direction: bottom-up from clinical observation of trauma, rather
than top-down from mathematical physics. The type/product isomorphism between the USF decomposition and the M-theory
dimension count is proved in `MTheoryIsomorphism.somaField_iso_mtheory`;
physical compactification is not proved by that theorem.

### The Σ-Type Formulation of the USF

The 11D decomposition is not merely a dimensional accounting exercise. In
Homotopy Type Theory, the full soma-field configuration space is a
**dependent sum type** (Σ-type):

$$\text{SomaField} \;\equiv\; \sum_{\sigma\,:\,\mathrm{Scale}_{20}} \mathrm{Substrate}(\sigma)$$

where $\mathrm{Substrate}(\sigma) : \mathrm{Type}$ is the physical substrate type
at scale level $\sigma \in \{0,\ldots,19\}$. This is analogous to a **fiber bundle**:
the total space is the soma-field configuration space; the base space is the
20-point scale hierarchy; each fiber $\mathrm{Substrate}(\sigma)$ is the field
configuration at that scale. The Lean 4 `ScaleStep`, `FieldLayerType`, and
`T_TheoryUniverse` declarations in `ScaleUniverse.lean` are the typed
realisation of this scale-indexed construction.

The **Zoom Operator** $\Lambda_\sigma$ is the dependent type constructor mapping
between adjacent fibers:

$$\Lambda : (\sigma : \mathrm{Scale}_{20}) \to \mathrm{Substrate}(\sigma) \to \mathrm{Substrate}(\sigma + 1)$$

This enforces **type-safe scale invariance**: the Lean 4 kernel prevents the
application of human-scale emotional operators to galaxy-scale configurations.
A scale mismatch is not merely physically wrong — it is a *type error*, caught
at compile time before any computation runs.

The USF aims to do something Modal HoTT does not: it populates the 11D structure
with physical content. Where Schreiber provides the type-theoretic skeleton,
the USF provides the biological execution engine — the organism that runs
inside the type-theoretic universe. The two are related by the identification:
the modal operators of mHoTT are the Zoom Operators of the USF, and the
$\infty$-topos of mHoTT is compared with the soma-field configuration space.

## Hoffman's Conscious Agents

Donald Hoffman (2019) proposes that spacetime is not fundamental but a
"user interface" — a simplified representation generated by a deeper network
of conscious agents interacting via Markov kernels. Spacetime is the icon,
not the reality.

The USF disagrees on one point and agrees on another.

*Disagreement*: Spacetime (D₁–D₄) is real and causal in the USF. Brain
surgery alters subjective experience because physical processes in spacetime
causally affect the limbic field amplitude. Hoffman's model has no mechanism
for this.

*Agreement*: The deeper structure is relational. Conscious percepts are poles
in the Green's function — relational objects between source and observation
points. In this sense, the USF and Hoffman agree that fundamental reality is
not substance but relation.

The USF proposes a physical anchor for Hoffman's theory: "conscious agents"
are modelled as systems that have crossed the limbic threshold $T_c$, and the
"Markov kernels" between agents are compared with Green's functions of the
propagator field.

---

# Formal Verification

Selected results are type-checked in Lean 4 using Mathlib across
five companion files:

| File | Key results |
|---|---|
| `LimbicTunnel.lean` | `V_nonneg`, `barrier_height`, `wkbAmplitude_pos`, `gradient_traps_near_neg1`; trajectory trapping and QUANT-EXP-1 rates are separate obligations |
| `MTheoryIsomorphism.lean` | `somaField_iso_mtheory`, `organism_hierarchy`, `X7_is_7D_product`, `scale_invariance_full` |
| `LimbicHopfield.lean` | correspondence_principle, stress_raises_temp, adhd_hotter_than_autism |
| `SwarmPropagator.lean` | `propagator_beats_classical`, `jam_resistant`, `speedup_monotone_in_K`; global optimality is an axiom |
| `UniversalSomaticField.lean` | `scale_invariance_inhabited`, `consciousness_dichotomy`, `consciousness_monotone`, `universal_field_theory` |

Open or assumption-bound items include:
- `greens_fn_is_SHO` — currently a placeholder theorem proving `True`; the
  distributional identity requires Schwartz/PDE infrastructure.
- `universe_is_11D_organism` — a definition/witness of the model predicate,
  not cosmological evidence.
- `cosmological_correspondence` — shows inhabited field-equation structure at
  scale 19, not a proof of linearised general relativity.
- `sft_iso_modal_hott` and `sft_grounds_hoffman` — axioms/interpretive bridges.

Every result must be cited by theorem/status; the current proof surface contains five real sorries plus axioms, definitions, imported theorem applications, and arithmetic.

---

# The Volitional Agent

## From Autonomous to Driven Dynamics

The field equation presented so far is autonomous: given an initial
state $e_0$, the dynamics

$$\dot{e} = -\nabla H(e) + \eta(t)$$

evolve the field under the Hopfield Hamiltonian plus thermal noise.
The agent — the person whose soma-field is being modelled — is a
*patient*: they observe which attractor basin they settle into.

This is incomplete as a model of active regulation. Many somatic interventions
involve the subject *doing* something: breathing, orienting, choosing where to
place attention. The mathematics must represent this if it is to model such
protocols.

## The Somatic Injection

We extend the dynamics with a **volitional source term** $J_{\text{user}}(t)$:

$$\dot{e} = -\nabla H(e) + J_{\text{user}}(t) + \eta(t)$$

$J_{\text{user}}(t) \in \mathbb{R}^8$ is a time-dependent vector in the
BRECVEMA mechanism space. At each instant, the subject injects energy into
specific dimensions of the field — choosing to attend to breath (dimension
1, Rhythmic Entrainment), orient gaze (dimension 0, BrainStem), or
deliberately recall a regulating memory (dimension 5, Episodic Memory).
This is not noise: it is structured, intentional, and directed.

The source term has a direct physical interpretation in the instrument
architecture (`apps/instrument/`): the Push 3 controller's faders are
$J_{\text{user}}(t)$. Each fader maps to one BRECVEMA dimension. The
musician is modelled as steering their own field trajectory.

## Patient to Pilot

The transition $\eta \to J_{\text{user}} + \eta$ is a qualitative
change in the model's ontology. With purely autonomous dynamics, the
subject is a passive observer of a physical process. With the source
term, the subject is modelled as an **active variable in the 11D field** — a
pilot, not a passenger.

Formally, $J_{\text{user}}(t)$ is the **God-Knob**: the runtime
meta-adaptation controller that can flatten the potential landscape
and model transitions that gradient descent alone cannot reach.
The clinical description of somatic therapy — "the therapist helps the
client do something different with their body, and the field shifts" —
is represented mathematically, not clinically proved.

The corresponding Lean 4 definition (see Appendix, `UniversalSomaticField.lean`):

```lean
structure VolitionalInjection where
  /-- The source term: one component per BRECVEMA mechanism. -/
  J    : Field8

/-- Volitional update: one Langevin step with active injection.
    When J = 0, this reduces to the standard autonomous update. -/
noncomputable def volitional_update (e : Field8) (J : Field8) (dt : ℝ) : Field8 :=
  fun i => e i + dt * (fieldForce8 e i + J i)
```

The theorem that volitional update reduces to autonomous update when
$J = 0$ is proved by `funext` and `simp`; it is true by definition of the
update.

---

# Discussion

## What Has Been Claimed

The USF makes four claims that can be evaluated independently:

**Claim 1 (structural):** The 11-dimensional decomposition of the Soma-Field
is structurally isomorphic to the stated 11D product decomposition used for
comparison with M-theory. *Status: proved in Lean 4 as a type/product
isomorphism, not as physical compactification.*

**Claim 2 (scale-invariant):** The same Green's function equation is used to model
field propagation at all 20 scale levels. *Status: represented by inhabited
field-equation structures; the distributional Green's-function identity
remains open.*

**Claim 3 (consciousness):** Consciousness is a phase transition at limbic
threshold $T_c$. *Status: formally stated as threshold predicates with
definition-level theorems. Requires operational measures and empirical
calibration of $T_c$.*

**Claim 4 (cosmological):** The universe satisfies the structural requirements
for a conscious organism. *Status: model witness/definition, not empirical
evidence; offered as a theoretical extrapolation.*

Claims 1 and 2 are mathematical results. Claims 3 and 4 are physical
hypotheses with different levels of testability.

## Current Extensions: Cosmos, Symmetry, and [T]-Theory

The scale architecture has since been extended in three directions. First,
*The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic
Field* proposes that the compact-sector contribution of an eleven-dimensional
model provides a cosmological-constant term. *Dark Matter as the Spatial
Vacuum of the Universal Somatic Field* proposes that the non-compact spatial
sector supplies a cold, gravitationally coupled component. The fractions 7/11
and 3/11 follow exactly from the proposed dimensional partition; identifying
them with observed cosmological sectors is a physical model that remains to be
tested against expansion history, clustering, and perturbation data.

Second, *G2 Symmetry Breaking in the Universal Somatic Field* separates the
eight-channel BRECVEMA coupling matrix into a scalar component and an exactly
traceless residual. The matrix identity is exact for the stated rational
entries. Its connection to compact-sector geometry is a proposed bridge, not a
completed derivation of biological couplings from compactification.

Third, [T]-Theory names the cultural and cross-domain extension of this
research programme: the Fractal Thesis, music, visual work, live events, and
domain-specific applications. It is not an additional physical theory. Its
role is to communicate, test, and extend the use of the framework across
domains. An artwork or application does not provide evidence for a physical
claim; a formal theorem does not decide an artwork's value. The two layers are
related by a shared vocabulary of propagation and coupling, but they retain
different standards of evidence.

This yields a practical reading rule. A claim is either a formal statement,
a model with stated assumptions, an empirical result under a stated protocol,
or an interpretation. The categories can inform one another, but none should
be silently substituted for another.

## The Correspondence Principle at Every Scale

Each of the preceding papers in this series proposes or proves, at its own
evidence level, a Correspondence Principle result: the new theory collapses to
the existing theory in the appropriate limit. The USF is the proposed master
correspondence:

- At Scale 7 (brain): USF → CEMI field theory (McFadden)
- At Scale 8 (organism): USF → the earlier Soma-Field clinical and computational models
- At Scale 9 (swarm): USF → the Green's-function multi-agent coordination model
- At infinite scale: USF → the formal structure of Modal HoTT (Schreiber)
- At zero limbic amplitude: USF → classical, non-conscious field dynamics

The USF does not invalidate any of these theories. It proposes that they can be
read as scale-restricted projections of a single structural description.

## Lean 4 as Epistemological Standard

The use of Lean 4 as the verification environment is not decorative. It
enforces a discipline that prose mathematics cannot: every claim must be
given a type, every proof must be kernel-checked, every axiom must be named
and isolated. The current proof surface still contains five real `sorry`s,
axioms, placeholder/definition-level results, imported theorem applications,
and arithmetic proofs; these categories must not be conflated.

This is the field's contribution to epistemology: a formal boundary between
*what we have proved* and *what we are assuming*. The theoretical literature
in consciousness studies would benefit greatly from such a list.

---

# Conclusion

The Universal Somatic Field is a single structural equation — the Green's
function — applied consistently across 20 scales of physical reality. Its
central proposal, that the SHO of string theory can be read as the impulse
response of the field substrate, reframes the ontological puzzle of the
"vibrating string" as a field-response question.

The architecture decomposes into an 11-dimensional product in the same
dimension count used in the M-theory comparison. The type/product isomorphism
is a theorem; the physical compactification claim remains open.

Consciousness, in this framework, is modelled as the phase of the limbic
field: present when the field crosses a threshold, absent when it does not.
The hard problem is reframed as: *what determines whether the limbic field
amplitude crosses* $T_c$?

The universe is treated as a structural test case for the model's organism
predicate. Whether any cosmic analogue of the limbic field exceeds $T_c$ is an
open modelling question.

From quantum strings to the cosmic web: one equation, one framework, one
organism.

---

# References

::: {#refs}
:::

---
nocite: |
  @johnson2026b
  @johnson2026c
  @mcfadden2002a
  @mcfadden2002b
  @ramsauer2020
  @vaswani2017
  @witten1995
  @horava1996
  @chalmers1995
  @hoffman2019
  @schreiber2013
...
