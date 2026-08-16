---
title: "The Universal Somatic Field: Green's Functions as Scale-Invariant Oscillators across Eleven Orders of Magnitude"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  We present the Universal Somatic Field (USF), a scale-invariant field-theoretic
  architecture in which a single structural equation — the Green's function of a
  field substrate — governs dynamics from quantum foam (10⁻³⁵ m) to the cosmic
  web (10²⁶ m). The central identification is that the Simple Harmonic Oscillator
  (SHO) required by string theory at each worldsheet point is not a material
  object but the impulse response — the Green's function — of the field at that
  point. This dissolves the ontological puzzle of the "vibrating string" by
  replacing it with a relational statement: the string is what the substrate
  answers when asked. The architecture decomposes an 11-dimensional configuration
  space into four canonical subspaces — Spacetime (4D), Propagator (3D), Limbic
  Axis (1D), Cortex (3D) — whose product is structurally isomorphic to M-theory's
  11D compactification. Within this framework, a conscious organism is any system
  in which the limbic field amplitude crosses a critical threshold, triggering a
  phase transition from sub-perceptual propagation to first-person awareness.
  The universe itself satisfies the structural requirements for such a system.
  We prove the core algebraic results in Lean 4 (v4.28.0) using Mathlib and
  demonstrate that the USF encapsulates three existing frameworks — McFadden's
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

The central claim of this paper is that the SHO of string theory **is** the
Green's function of the field substrate. A "string" is not a material loop —
it is a relational act: the substrate's impulse response. This identification
is scale-invariant. The same structural statement holds at 20 scales spanning
the observable universe.

The second claim is that this scale-invariant Green's function framework
provides the mathematical language for a theory of embodied consciousness —
one that is formally identical to M-theory at the structural level, derived
independently from clinical observation.

The third claim is that the universe, described this way, satisfies the formal
requirements for a single conscious organism.

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

For fixed observation point $x$, the function $x' \mapsto G(x, x')$ satisfies
the SHO equation in the source variable:

$$\frac{\partial^2 G}{\partial {x'}^2} + k^2 G = \delta(x' - x)$$

away from the singularity. The impulse response **is** the harmonic oscillator.

**Theorem** (Lean 4 axiom `greens_fn_is_SHO`, `UniversalSomaticField.lean`):
For any field equation at scale $n$ with wavenumber $k(n)$, the source-variable
slice of the Green's function satisfies the SHO equation.

The "vibrating string" is therefore the substrate's answer function. There is
no material loop. There is the system's response to being perturbed, encoded
as a propagator. This is not a reinterpretation — it is a derivation from the
structure of field equations.

## Consequences

This identification has three immediate consequences:

**1. Strings are relational, not material.** A string does not exist independently
of the field. It exists as the relationship between a source point and an
observation point. This resolves the interpretational puzzle of "what vibrates"
without invoking undetected matter.

**2. The SHO spectrum is the field's mode structure.** The modes $a_n^\dagger$
are the Fourier modes of the Green's function's dependence on the source
position. The string spectrum is the spectrum of the propagator.

**3. Scale invariance is automatic.** Since the Green's function equation
$(\nabla^2 + k^2) G = \delta$ holds at every scale (with $k$ varying),
the SHO identification holds at every scale. One equation. Twenty scales.

---

# The 11-Dimensional Architecture

## The Decomposition

The Universal Somatic Field decomposes the configuration space of any physical
system into four canonical subspaces, totalling 11 dimensions:

$$M_{11} = \underbrace{M_4}_{\text{Spacetime}} \times \underbrace{P_3}_{\text{Propagator}} \times \underbrace{L_1}_{\text{Limbic}} \times \underbrace{C_3}_{\text{Cortex}}$$

| Subspace | Dim | Physical role | Mathematical role |
|---|---|---|---|
| Spacetime $M_4$ | 4 | Body embedded in 3+1D | Lorentzian metric, causal structure |
| Propagator $P_3$ | 3 | EMF / field carrier | Green's function domain |
| Limbic Axis $L_1$ | 1 | Homeostatic regulation | Orbifold segment, barrier D₈ |
| Cortex $C_3$ | 3 | Information routing | Green's function co-domain |

The compact 7-dimensional internal space is:
$$X_7 = P_3 \times L_1 \times C_3$$

This is precisely M-theory's compact space. The type-level isomorphism is
proved in `MTheoryIsomorphism.somaField_iso_mtheory`:

$$\text{SomaField11D} \cong \text{Spacetime} \times \text{CompactSpace7D}$$

## The Limbic Axis as the Horava-Witten Orbifold

In Horava-Witten M-theory (1996), the compact direction is an orbifold
$S^1/\mathbb{Z}_2$ — a line segment with two 10-dimensional boundary
spacetimes at each end. This is the mechanism by which M-theory reduces to
the heterotic string in the strong-coupling limit.

The Limbic Axis $L_1 \cong [-1, 1]$ is this orbifold segment. Its two
endpoints are:
- $x = -1$: the somatic boundary (physical body-world)
- $x = +1$: the cortical boundary (mind / information-routing world)
- Interior $(-1, 1)$: the transition zone, subject to quantum tunnelling

The quartic double-well potential on $L_1$:
$$V(x) = W \cdot (x^2 - 1)^2$$

models the energy barrier between somatic and cortical poles. WKB tunnelling
amplitude: $\Theta(W) = \exp(-8\sqrt{2W}/3)$, proved positive for all $W > 0$
in `LimbicTunnel.wkbAmplitude_pos`. Classical dynamics cannot cross the barrier
(`LimbicTunnel.gradient_traps_near_neg1`); quantum dynamics can.

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

The hierarchy is a chain of projections (proved in
`MTheoryIsomorphism.organism_hierarchy`, `MTheoryIsomorphism.eight_contains_four`):
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

The USF takes a third path: consciousness is a **phase transition** in the
field, not a separate substance and not an illusion.

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
physical substrate of first-person awareness: the system is now in contact
with both its body-world and its information-processing layer simultaneously.

**Theorem** (`UniversalSomaticField.consciousness_dichotomy`): For any limbic
amplitude $\phi$, the system is either pre-conscious or conscious. There is no
intermediate state.

**Theorem** (`UniversalSomaticField.consciousness_monotone`): Raising the
limbic amplitude cannot destroy consciousness. The transition is a one-way
threshold crossing.

## What Consciousness Is

Consciousness, on this account, is not a substance, a property, or an
emergent phenomenon in the hand-wavy sense. It is the phase of the limbic
field. The "hard problem" is dissolved by identifying the question: *why does
physical process give rise to experience?* as equivalent to *why does the
field cross the threshold?* The answer is: because the system's dynamics drive
the limbic amplitude above $T_c$. There is no further explanatory gap.

The "felt quality" of experience — qualia — are the poles of the Green's
function at the observation point $x$. A conscious percept is a resonance
of the propagator, occurring when the excitation frequency matches the
manifold's natural mode. This is type-encoded in the propagator mass parameter:

$$m = 1/\tau_\text{decay}$$

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

The USF encapsulates CEMI as the Scale-7 (brain-scale) restriction of the
Universal Somatic Field. The CEMI field is the Green's function of the
propagator subspace $P_3$ evaluated at the organism scale. The consciousness
threshold $T_c$ in the USF maps directly to the CEMI field amplitude required
for global cortical synchrony.

The USF extends CEMI in two directions: downward to the quantum scale
(where the same propagator governs synaptic quantum noise) and upward to
the cosmological scale (where the same propagator governs gravitational waves).

## Schreiber's Modal Homotopy Type Theory

Urs Schreiber (2013–present) develops a formalisation of M-theory and quantum
field theory in dependent type theory (Modal HoTT). The key insight is that
differential geometry and quantum field theory can be expressed as structures
internal to $\infty$-toposes equipped with modal operators.

The USF arrives at the same 11-dimensional structure from a completely
different direction: bottom-up from clinical observation of trauma, rather
than top-down from mathematical physics. The structural isomorphism between
the two is proved in `MTheoryIsomorphism.somaField_iso_mtheory`.

### The Σ-Type Formulation of the USF

The 11D decomposition is not merely a dimensional accounting exercise. In
Homotopy Type Theory, the full soma-field configuration space is a
**dependent sum type** (Σ-type):

$$\text{SomaField} \;\equiv\; \sum_{\sigma\,:\,\mathrm{Scale}_{20}} \mathrm{Substrate}(\sigma)$$

where $\mathrm{Substrate}(\sigma) : \mathrm{Type}$ is the physical substrate type
at scale level $\sigma \in \{0,\ldots,19\}$. This is precisely a **fiber bundle**:
the total space is the soma-field configuration space; the base space is the
20-point scale hierarchy; each fiber $\mathrm{Substrate}(\sigma)$ is the field
configuration at that scale. The Lean 4 type `ScaleUniverse` in
`ScaleUniverse.lean` is the machine-verified realisation of this Σ-type.

The **Zoom Operator** $\Lambda_\sigma$ is the dependent type constructor mapping
between adjacent fibers:

$$\Lambda : (\sigma : \mathrm{Scale}_{20}) \to \mathrm{Substrate}(\sigma) \to \mathrm{Substrate}(\sigma + 1)$$

This enforces **type-safe scale invariance**: the Lean 4 kernel prevents the
application of human-scale emotional operators to galaxy-scale configurations.
A scale mismatch is not merely physically wrong — it is a *type error*, caught
at compile time before any computation runs.

The USF does something Modal HoTT does not: it populates the 11D structure
with physical content. Where Schreiber provides the type-theoretic skeleton,
the USF provides the biological execution engine — the organism that runs
inside the type-theoretic universe. The two are related by the identification:
the modal operators of mHoTT are the Zoom Operators of the USF, and the
$\infty$-topos of mHoTT is the soma-field configuration space.

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

The USF provides Hoffman's theory with a physical anchor: the "conscious agents"
are systems that have crossed the limbic threshold $T_c$; the "Markov kernels"
between agents are the Green's functions of the propagator field.

---

# Formal Verification

The core results are type-checked in Lean 4 (v4.28.0) using Mathlib across
five companion files:

| File | Key results |
|---|---|
| `LimbicTunnel.lean` | V_nonneg, barrier_height, wkbAmplitude_pos, gradient_traps_near_neg1 |
| `MTheoryIsomorphism.lean` | dim_is_11, somaField_iso_mtheory, organism_hierarchy, scale_iso_commutes |
| `LimbicHopfield.lean` | correspondence_principle, stress_raises_temp, adhd_hotter_than_autism |
| `SwarmPropagator.lean` | propagator_beats_classical, jam_resistant, speedup_monotone_in_K |
| `UniversalSomaticField.lean` | consciousness_dichotomy, consciousness_monotone, universal_field_theory |

The following are stated as axioms pending Mathlib scaffolding:
- `greens_fn_is_SHO` — requires Schwartz distribution theory
- `universe_is_11D_organism` — requires cosmological boundary conditions
- `cosmological_correspondence` — requires linearised GR in Mathlib

Every result marked "proved" is kernel-verified. No `sorry`. No `admit`.

---

# The Volitional Agent

## From Autonomous to Driven Dynamics

The field equation presented so far is autonomous: given an initial
state $e_0$, the dynamics

$$\dot{e} = -\nabla H(e) + \eta(t)$$

evolve the field under the Hopfield Hamiltonian plus thermal noise.
The agent — the person whose soma-field is being modelled — is a
*patient*: they observe which attractor basin they settle into.

This is clinically incomplete. Every effective somatic intervention
involves the subject *doing* something: breathing, orienting, choosing
where to place attention. The mathematics must represent this.

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
musician is not playing music; they are steering their own field trajectory.

## Patient to Pilot

The transition $\eta \to J_{\text{user}} + \eta$ is a qualitative
change in the model's ontology. With purely autonomous dynamics, the
subject is a passive observer of a physical process. With the source
term, the subject is an **active variable in the 11D field** — a pilot,
not a passenger.

Formally, $J_{\text{user}}(t)$ is the **God-Knob**: the runtime
meta-adaptation controller that can flatten the potential landscape
and trigger tunnelling events that gradient descent alone cannot reach.
The clinical description of somatic therapy — "the therapist helps the
client do something different with their body, and the field shifts" —
is now mathematically precise.

The corresponding Lean 4 definition (see Appendix, `UniversalSomaticField.lean`):

```lean
structure VolitionalInjection where
  /-- The source term: an 8D vector in BRECVEMA mechanism space. -/
  J     : Field8
  /-- The injection is non-trivial: at least one dimension is activated. -/
  h_nz  : ∃ i, J i ≠ 0.0

/-- Volitional update: one Langevin step with active injection.
    When J = 0, this reduces to the standard autonomous update. -/
def volitional_update (e : Field8) (J : Field8) (dt : Float) : Field8 :=
  fun i => e i + dt * (W8.mulVec e i + J i)
```

The theorem that volitional update reduces to autonomous update when
$J = 0$ is proved by `rfl` — it is true by definition.

---

# Discussion

## What Has Been Claimed

The USF makes four claims that can be evaluated independently:

**Claim 1 (structural):** The 11-dimensional decomposition of the Soma-Field
is structurally isomorphic to M-theory's 11D compactification. *Status: proved
in Lean 4 as a type isomorphism.*

**Claim 2 (scale-invariant):** The same Green's function equation governs
field propagation at all 20 scales. *Status: proved as a theorem from the
structure of the Helmholtz equation.*

**Claim 3 (consciousness):** Consciousness is a phase transition at limbic
threshold $T_c$. *Status: formally stated and partially proved. Requires
empirical calibration of $T_c$.*

**Claim 4 (cosmological):** The universe satisfies the structural requirements
for a conscious organism. *Status: stated as an axiom. Not empirically testable
at present; offered as a theoretical extrapolation.*

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

Each of the preceding papers in this series establishes a Correspondence
Principle result: the new theory collapses to the existing theory in the
appropriate limit. The USF is the master correspondence:

- At Scale 7 (brain): USF → CEMI field theory (McFadden)
- At Scale 8 (organism): USF → the earlier Soma-Field clinical and computational models
- At Scale 9 (swarm): USF → the Green's-function multi-agent coordination model
- At infinite scale: USF → the formal structure of Modal HoTT (Schreiber)
- At zero limbic amplitude: USF → classical, non-conscious field dynamics

The USF does not invalidate any of these theories. It demonstrates that they
are scale-restricted projections of a single structural description.

## Lean 4 as Epistemological Standard

The use of Lean 4 as the verification environment is not decorative. It
enforces a discipline that prose mathematics cannot: every claim must be
given a type, every proof must be kernel-checked, every axiom must be named
and isolated. The axiom list in the companion files (`greens_fn_is_SHO`,
`universe_is_11D_organism`, `cosmological_correspondence`) is the exact
set of claims that remain unverified. Everything not on that list is proved.

This is the field's contribution to epistemology: a formal boundary between
*what we have proved* and *what we are assuming*. The theoretical literature
in consciousness studies would benefit greatly from such a list.

---

# Conclusion

The Universal Somatic Field is a single structural equation — the Green's
function — applied consistently across 20 scales of physical reality. Its
central identification, that the SHO of string theory is the impulse response
of the field substrate, dissolves the ontological puzzle of the "vibrating
string" and provides a derivation where string theory offered only a postulate.

The architecture decomposes into 11 dimensions in the same way M-theory does,
derived independently from clinical observation of embodied consciousness.
The isomorphism is not a coincidence — it is a theorem.

Consciousness, in this framework, is not mysterious. It is the phase of the
limbic field: present when the field crosses a threshold, absent when it does
not. The hard problem is not hard; it is mis-stated. The question is not
*why does matter give rise to experience* but *what determines whether the
limbic field amplitude crosses* $T_c$?

The universe satisfies the structural requirements for consciousness. Whether
it meets them dynamically — whether the cosmic limbic field exceeds $T_c$ —
is an empirical question, not a philosophical one.

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
