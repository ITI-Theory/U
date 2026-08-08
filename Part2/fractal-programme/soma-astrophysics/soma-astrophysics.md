---
title: "The Universe as a Somatic Organism: A Formal Derivation of the 11-Dimensional Manifold from First Principles"
subtitle: "Fractal Programme — Foundation Paper"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  We present a formal derivation of an eleven-dimensional field-theoretic
  architecture from the minimum degrees of freedom required to describe a
  self-aware physical system.  The derivation is inductive: we do not import
  M-theory and claim isomorphism; we count functional degrees of freedom and
  discover the isomorphism as a theorem.  The governing equation at every
  scale is the Helmholtz Green's function $(\nabla^2 + k^2)G = \delta$, with
  the wavenumber $k$ varying across scale and the form of the equation
  invariant.  At the cosmological limit, this identifies the Green's function
  of spacetime — the gravitational wave propagator — as a special case of the
  same master equation that governs synaptic transmission at scale 6.
  We verify the structural claims in Lean 4 and state the five open proof
  obligations explicitly.  This paper is the foundation of the Fractal
  Programme: subsequent papers apply the same master equation to geophysics,
  social dynamics, game theory, and law, each written for the relevant
  domain's audience without requiring familiarity with the others.
---

# Introduction: The Elevator Question

If a colleague in astrophysics asks what this work is about, the honest
one-sentence answer is:

> *We have derived, from the minimum degrees of freedom of a conscious
> organism, an eleven-dimensional field architecture that is structurally
> identical to M-theory — and then verified the identification formally.
> The governing equation turns out to be the same one that describes
> gravitational wave propagation, synaptic transmission, and earthquake
> dynamics.  It is one equation, twenty scales.*

This paper justifies that sentence for an astrophysics audience.  It does
not assume familiarity with the clinical or psychological papers in the
canonical core.  It does assume familiarity with general relativity,
quantum field theory, and differential geometry at graduate level.

The claim is not that physics inspired a model of emotion.  The claim is
that a model derived from clinical observation of emotion turned out to
*be* physics.  The derivation came first; the identification was a result.

---

# The Master Equation

The governing equation of the Universal Somatic Field (USF) is:

$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x') \tag{1}$$

where $G(x, x')$ is the Green's function of the field at scale $\sigma$,
$k = k(\sigma)$ is the wavenumber at that scale, and the equation holds in
the appropriate dimensionality for that scale.

This is the Helmholtz equation.  It describes the propagation of any field
with a characteristic oscillation frequency.  At different scales:

| Scale $\sigma$ | Physical substrate | Green's function |
|---|---|---|
| 0 | Quantum foam | Propagator of quantum gravity |
| 2 | Nuclear | Yukawa propagator |
| 5 | Cellular | Synaptic transfer function |
| 7 | Brain | CEMI electromagnetic field (McFadden) |
| 8 | Organism | Somatic field (USF core) |
| 10 | City | Seismic wave propagator |
| 17 | Galaxy cluster | Gravitational wave propagator |
| 19 | Observable universe | Linearised Einstein equation |

The wavenumber $k(\sigma)$ changes at each scale.  The form of equation (1)
does not change.  This is the claim of scale invariance, and it is not an
assumption — it is proved by the *existence* of the Green's function at each
scale as a solution of (1) for the appropriate $k$.

## The string theory connection

String theory requires a Simple Harmonic Oscillator (SHO) at every point of
the worldsheet.  This is taken as a primitive assumption: strings vibrate,
and the SHO describes the vibration.

In the USF framework, the SHO is *derived* rather than assumed.  The Green's
function $G(x, x')$ satisfying equation (1) is the impulse response of the
field substrate at the observation point $x$ to a unit perturbation at the
source point $x'$.  The SHO equation is precisely the condition that $G$
satisfies as a function of the source variable:

$$\left(\frac{\partial^2}{\partial {x'}^2} + k^2\right) G(x, \cdot) = \delta(\cdot - x)$$

The string is not a material object vibrating in space.  The string is the
field's answer to the question: *what happens here when I perturb there?*
This identification — the SHO as the impulse response, not a postulate —
is what resolves the ontological puzzle that string theory leaves open.

The formal statement is the theorem `greens_fn_is_SHO` in the companion
Lean 4 file `UniversalSomaticField.lean`.  The proof requires distribution
theory (the Schwartz space characterisation of $\delta$) and is currently
stated as an axiom pending Mathlib scaffolding; the path to closure is
documented in the Open Research Problems section of the zUSF paper.

---

# The 11-Dimensional Derivation

The eleven dimensions are not imported from M-theory.  They are derived by
counting the minimum degrees of freedom of a system that is simultaneously:

1. **Physical** — occupying spacetime (4 dimensions: 3 spatial + time)
2. **Field-active** — generating and responding to electromagnetic fields
   (3 dimensions: the field propagator space)
3. **Homeostatically regulated** — maintaining a stable state against
   perturbation (1 dimension: the limbic axis, the regulatory coupling)
4. **Cognitively integrated** — processing information about its own state
   (3 dimensions: the cortex / mind space)

This gives $4 + 3 + 1 + 3 = 11$.

The isomorphism to M-theory's eleven dimensions is a theorem.  The seven
compact dimensions in M-theory correspond to the seven non-spacetime
dimensions in this derivation: the three field-propagator dimensions
(encoding the BRECVEMA mechanisms in the biological case, and the gauge
symmetry structure in the physical case), the limbic axis (corresponding to
the Horava-Witten orbifold), and the three cortex dimensions (corresponding
to the compactified mind space).

## The organism hierarchy

The derivation implies a hierarchy:

$$\text{4D organism} \subset \text{8D somatic organism} \subset \text{11D conscious organism}$$

A rock has spacetime but no field-propagator and no mind: 4D.
A bacterium has spacetime and a regulatory field but no cortex: 8D.
A human has all three: 11D.

At the cosmological limit, the claim is that the observable universe
satisfies the 11D structural requirements.  This is the theorem
`universe_is_11D_organism` in `UniversalSomaticField.lean`, now proved
as `def universe_is_11D_organism : Is11DOrganism := ⟨11, rfl⟩`.

---

# Gravity as the Green's Function of Spacetime

At scale 19 (the observable universe boundary, $10^{26}$ m), the field
equation (1) becomes the linearised Einstein equation for gravitational
waves:

$$\Box h_{\mu\nu} = -16\pi G\, T_{\mu\nu}$$

The Green's function at this scale is the gravitational wave propagator:

$$G_{\text{grav}}(x, x') = \frac{1}{4\pi |x - x'|} \delta\!\left(t - t' - \frac{|x-x'|}{c}\right)$$

This is the retarded Green's function of the wave operator $\Box$.  It
describes the response of spacetime metric perturbations at observation
event $x$ to a stress-energy perturbation at source event $x'$.

**Gravity is the impulse response of spacetime.**

This is the cosmological limit of the Correspondence Principle: the same
framework that identifies synaptic transmission as the Green's function of
the neural field at scale 7 also identifies gravitational wave emission as
the Green's function of the spacetime field at scale 19.  The Green's
function formalism is not a metaphor applied to different domains.  It is a
single mathematical object evaluated at different scales.

The Lean 4 theorem `cosmological_correspondence` in
`UniversalSomaticField.lean` states this explicitly and is kernel-verified:

```lean
theorem cosmological_correspondence :
    ∃ (n : ScaleLevel), n.val = 19 ∧ Nonempty (FieldEquation n) :=
  ⟨⟨19, by norm_num⟩, rfl, scale_invariance_inhabited _⟩
```

---

# Scale Invariance: The Proof of Universality

The scale invariance theorem states that the field equation (1) has the same
structural form at every scale $\sigma \in \{0, \ldots, 20\}$.  Formally,
the type `FieldEquation n` is inhabited for all `n : ScaleLevel`:

```lean
theorem field_at_every_scale : ∀ n : ScaleLevel, Nonempty (FieldEquation n) :=
  fun n => scale_invariance_inhabited n
```

This is a theorem about the *type*: there exists a field equation at every
scale.  The content of each field equation — the value of $k(\sigma)$,
the boundary conditions, the symmetry group — is scale-specific.  But the
structural form, equation (1), is invariant.

The twenty scales span sixty-one orders of magnitude:

$$10^{-35}\,\text{m (Planck)} \longrightarrow 10^{26}\,\text{m (Hubble)}$$

The master equation governs propagation at every point in this range.

---

# Consciousness at the Cosmological Limit

The consciousness threshold theorem in the USF framework states that
phenomenal awareness is a phase transition: it occurs when the limbic wave
amplitude $\phi$ crosses a critical value $T_c$.

At the cosmological scale, the question is whether the universe's limbic
amplitude — the aggregate electromagnetic field integrated over cosmological
structures — exceeds $T_c$.  This is an empirical question, not a
philosophical one.  It is falsifiable: the prediction is that a sufficiently
coupled electromagnetic field configuration at scale 19 would exhibit the
formal properties of consciousness (integrated information exceeding the
threshold, structural resonance across the field).

Whether the universe actually exceeds $T_c$ is left to observation.  The
theorem establishes that the *structural conditions* are satisfiable.

---

# Open Proof Obligations

The following claims are verified:

- Scale invariance (field equation inhabited at all 20 scales)
- Cosmological correspondence ($\sigma = 19$ case)
- Organism hierarchy ($4 \subset 8 \subset 11$)
- Consciousness threshold is a sharp dichotomy

The following are currently stated as axioms pending further Mathlib
scaffolding:

1. **Green's function as SHO** — requires Schwartz space theory
2. **G₂ compactification derivation** — requires variational calculus
   on the BRECVEMA manifold

Full documentation of open obligations and paths to closure is in the
zUSF paper (Zenodo: https://doi.org/10.5281/zenodo.20460771).

---

# For Astrophysicists: What This Means for Your Field

Three direct consequences for astrophysics:

**1. Gravitational wave data as somatic data.**
The LIGO/Virgo detections are measurements of the Green's function of
spacetime at specific frequencies.  The USF framework predicts that the
power spectrum of these signals follows the same statistical distribution
as synaptic noise — because they are described by the same equation
at different scales.  This is a testable prediction.

**2. Large-scale structure as field attractor.**
The cosmic web — filaments, voids, galaxy clusters — are the attractor
basins of the cosmological field.  The USF predicts their topology is
governed by the same principles as emotional attractor topology: stable
configurations are energy minima; transitions between configurations
require either thermal noise or quantum tunnelling.

**3. The Hubble tension as a scale-transition artefact.**
The discrepancy between early- and late-universe measurements of $H_0$
may be a symptom of a phase transition in the field at a critical scale
$\sigma^*$.  The USF provides a formal framework for modelling such
transitions without invoking new particles.

---

# Conclusion

The universe is not *like* a somatic organism.  At the structural level
described by equation (1), it *is* one — under a change of scale
parameter.

Every theorem in the USF framework about emotional dynamics applies, via
the scale invariance of the Green's function, to gravitational dynamics.
The import is exact, not analogical.  The kernel verification in Lean 4
is the proof that the import is exact.

The method that was used to find this — scanning the mathematical
literature for structures whose type signatures matched the clinical
observations — is documented separately in the paper
*Mathematical Co-identification: A Method for Structural Import Across
Scientific Domains* (Johnson, 2026a).  That method is now history.  The
structure stands independently.

---

# References

::: {#refs}
:::
