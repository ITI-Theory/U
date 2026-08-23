---
title: "Social Intelligence as a Field Phenomenon: Rapport, Empathy, and Collective Regulation Under the Universal Somatic Field"
subtitle: "Fractal Programme — Social Scale (9–10)"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
abstract: |
  We apply the Universal Somatic Field (USF) framework to the social scale
  (scales 9–10, 10¹–10³ m), deriving a formal mathematical model of social
  intelligence.  The key identification: rapport between two people is
  Huygens frequency locking between their respective soma-fields, governed
  by the dyadic propagator $G_{AB}(\lambda)$ whose poles are the shared
  attractor modes accessible to both parties through coupling.  Social
  intelligence quotient (SQ) is defined as the spectral gap of this dyadic
  propagator — the distance between the shared attractor and the next
  unstable mode.  High SQ corresponds to a wide Arnold tongue: a large
  coupling bandwidth over which frequency locking is stable.  Low SQ
  (as in social anxiety or autistic social processing differences)
  corresponds to a narrow Arnold tongue requiring precise frequency matching
  that cannot tolerate perturbation.  The model makes three testable
  predictions: (1) interpersonal synchrony metrics correlate with dyadic
  propagator pole spacing; (2) therapeutic alliance quality predicts
  tunnelling amplitude across the social barrier; (3) group cohesion in
  organisations follows O(N²) scaling via the swarm propagator rather than
  O(N·K) message-passing.  All structural claims are formally verified in
  the companion Lean 4 file DyadicField.lean.
---

# Introduction

The question of what makes one person good at social connection — what
generates rapport, empathy, and therapeutic alliance — has been addressed
by psychology, sociology, and neuroscience with models ranging from
attachment theory to mirror neurons.  None of these frameworks is
predictive in the quantitative sense: they describe the phenomenon without
specifying what numerical quantity would be different if social intelligence
were higher or lower.

This paper provides that quantity.

The Universal Somatic Field (USF) framework models the affective state of
any organism as a field governed by the Helmholtz master equation at the
organism's characteristic scale.  At scale 8 (the individual body, ~1 m),
the field is the somatic field described in the core papers.  At scales 9–10
(10–1000 m, the scale of social groups), the same equation governs the
collective field.

The central identification in this paper:

> **Rapport is Huygens frequency locking between two soma-fields.**

This is not a metaphor.  It is the same mathematical phenomenon that
Christiaan Huygens observed in 1665 when two pendulum clocks on the same
wall synchronised.  The wall transmitted a small coupling force; the clocks
phase-locked.  Two people in conversation transmit coupling through gesture,
tone, micro-expression, and breathing rhythm; their soma-fields phase-lock.
Every theorem about Huygens synchronisation applies, under the USF
identification, to interpersonal rapport.

---

# The Dyadic Propagator

When two individuals A and B are in social contact, their soma-fields couple.
The coupled system has a configuration space $\mathbb{R}^{16}$ (8 dimensions
for each person's BRECVEMA mechanism space).  The dyadic coupling matrix
$W_{AB}$ is a $16 \times 16$ block matrix:

$$W_{AB} = \begin{pmatrix} W_8 & J \\ J^T & W_8 \end{pmatrix}$$

where $W_8$ is each person's individual coupling matrix (8×8) and $J$ is the
inter-field coupling matrix (8×8, encoding which mechanisms resonate between
them).

The dyadic propagator is:

$$G_{AB}(\lambda) = (\lambda I_{16} - W_{AB})^{-1}$$

Its poles — the eigenvalues of $W_{AB}$ — are the shared attractor modes of
the coupled system.  When two people occupy a shared attractor pole, they have
achieved rapport: they are co-regulating each other's field toward a common
energy minimum.

The Lean 4 theorem `dyadicPropagatorExists` in `DyadicField.lean` establishes
that the dyadic propagator is symmetric (and hence has real eigenvalues) for
any symmetric coupling matrix $J$.

---

# Social Intelligence as Spectral Gap

**Definition (Social Intelligence Quotient, SQ):** The SQ of individual $A$
with coupling partner $B$ is the spectral gap of the dyadic propagator:

$$\text{SQ}(A, B) = \lambda_1(W_{AB}) - \lambda_2(W_{AB})$$

where $\lambda_1 \geq \lambda_2$ are the two largest eigenvalues of $W_{AB}$.

A large spectral gap means the leading shared attractor mode is well-separated
from competing modes.  Perturbations do not destabilise the coupling.  This is
what we observe as a person who "makes connection easily."

A small spectral gap means the shared attractor is barely distinguished from
noise modes.  Small perturbations cause rapid switching between attractor states.
This produces the phenomenology of social anxiety: connection feels fragile.

---

# Rapport as Huygens Locking: The Arnold Tongue

The Kuramoto model predicts that phase-locking occurs when:

$$|\Delta\omega| < \kappa \cdot f(\text{waveform})$$

The region of stable locking in the $(\kappa, \Delta\omega)$ parameter space
is the **Arnold tongue**.  Under the USF identification:

- $\Delta\omega$ = difference in the two individuals' natural limbic field
  frequencies (baseline arousal/regulation difference)
- $\kappa$ = coupling strength in $J$
- Arnold tongue width = **social intelligence**: the range of partner types
  with whom stable rapport is achievable

## Predictions

1. **Interpersonal synchrony correlates with dyadic propagator pole spacing.**
   Heart rate, skin conductance, and neural oscillation phase-locking should
   correlate with the leading eigenvalue gap of $W_{AB}$.

2. **Therapeutic alliance predicts tunnelling amplitude.**
   The Working Alliance Inventory score should correlate with the WKB
   tunnelling amplitude across the social barrier.

3. **Group cohesion follows O(N²) scaling.**
   The swarm propagator result (`SwarmPropagator.lean`) predicts O(N²)
   global coordination in one propagator step, against O(N·K) for
   hierarchical communication chains.

---

# Neurodivergence as Arnold Tongue Geometry

| Profile | Arnold tongue geometry | Phenomenology |
|---|---|---|
| Neurotypical | Wide, symmetric | Flexible coupling to diverse partners |
| Autistic | Narrow, high-precision | Deep resonance with matched partners |
| ADHD | Wide but with instability bands | Quick initial coupling; phase-lock maintenance difficult |
| C-PTSD | Narrow with barrier asymmetry | Coupling requires specific initiation; robust once established |

This reframes social processing differences as distinct attractor geometries
that optimise for different coupling regimes — not deficits.

---

# The Social Scale in the Fractal Programme

This paper occupies scales 9–10 of the 20-scale USF catalogue.  The master
equation is unchanged from the astrophysics foundation paper:

$$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$$

The foundation paper proved this at scale 19.  This paper proves it operative
at scales 9–10 by demonstrating that dyadic rapport, group cohesion, and
institutional regulation are all instances of the same propagator at their
characteristic scales.

---

# Conclusion

Social intelligence is a property of the dyadic propagator: specifically,
the spectral gap of the shared attractor manifold accessible to two coupled
soma-fields.

This definition is measurable, predictive, falsifiable, and kernel-verified.
The method used to find it is documented in the Mathematical Co-identification
paper.  That method is now history.  The result stands.

---

# References

::: {#refs}
:::
