---
title: "The Soma-Field and the Universal Somatic Field"
subtitle: "A Formal Theory of Affective Dynamics, Consciousness, and Scale-Invariant Geometry in Biological and Physical Systems"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
---

\clearpage

# Abstract

This monograph presents a formal mathematical theory of affective dynamics —
the **Universal Somatic Field (USF)** framework — developed across the current
paper corpus, with selected algebraic and type-level claims checked in Lean 4.

The central thesis is that emotional experience can be modelled as a physical
field with measurable dynamics — and that the governing equations of that field
share structural forms with equations from quantum field theory, M-theory, and
statistical mechanics. The identity claim is a research hypothesis under stated
definitions, not a settled fact about the world.

This was not assumed by importing physics into psychology.  It was derived
inductively: by counting the minimum functional degrees of freedom required to
describe a system with a body, an affective field, and a mind, and discovering
that the result is isomorphic to M-theory's eleven-dimensional architecture.  The
isomorphism is not a design choice. It is represented by a Lean 4
type/product isomorphism under the model definitions; its physical
interpretation remains an open hypothesis.

The theory makes its claims precise enough to be falsified.  It provides the
formal verification infrastructure necessary to evaluate them rigorously.  The
method used to find the equations — Mathematical Co-identification, an honest
account of the abductive search — is documented in its own paper and is now
history.  The results stand without it.

**The core model** treats the emotional state vector `e ∈ ℝ⁸` as a point in
an 8-dimensional BRECVEMA mechanism space (Juslin & Västfjäll 2008) and
defines its dynamics by the Hopfield Hamiltonian `H(e) = −½ eᵀWe`.  The
weight matrix `W` encodes clinically grounded excitatory and inhibitory
couplings between emotional mechanisms. Attractors of this system model stable
emotional states; trajectories between them model possible change processes. The
limbic system is modelled as a quantum tunnelling gate, using WKB barrier
penetration as a candidate mechanism for why some emotional transitions may
require external perturbation (for example therapy, pharmacology, or
transformative experience) rather than gradient descent.

**The geometric extension** embeds the 8-dimensional field in an 11-dimensional
bookkeeping structure: 4 spacetime dimensions plus 7 compact-sector dimensions
related to the BRECVEMA mechanisms. This embedding is not merely rhetorical,
but the Lean file `MTheoryIsomorphism.lean` checks a type/product isomorphism,
not a physical M-theory derivation. Planck-scale compactification and the
classical 8D low-energy limit remain model assumptions.

**The scale-invariant architecture** (the Zoomable Universal Somatic Field,
zUSF) proposes that the same Green's-function form governs dynamics at 20 scales
spanning 61 orders of magnitude, from quantum foam (10⁻³⁵ m) to the cosmic
web (10²⁶ m).  A zoom operator `Z(s)` leaves the field equation form-invariant
under scale transformations. Consciousness is modelled as a threshold predicate
when the limbic wave amplitude crosses a critical threshold `T_c`; the
phenomenological interpretation of that predicate remains an open empirical
question.

**The Lean 4 formal verification** converts selected formal claims from
informal theorems to machine-checked statements. Key results include: the
Hopfield energy function and its attractor structure; the final-tagless
emotion algebra (simultaneously valid in five semantic domains); the FM-HN
Correspondence Principle (unifying 1982 and 2020 Hopfield networks); the
O(N²) swarm coordination complexity theorem; the M-theory type/product isomorphism; and
scale-invariance inhabitance. The proof sources are included in the Appendix,
alongside explicit axioms and remaining `sorry`s.

**Clinical and experimental grounding** is provided by: QUANT-EXP-1, an exact
8-qubit statevector simulation that reaches the Awe attractor basin in 3/3
cases where the classical baseline fails (0/48); clinical and patient-perspective
materials formalised as field trajectories; and lived somatic testimony. These
materials motivate hypotheses rather than establishing treatment efficacy.

The theory is falsifiable.  Specific predictions are listed in the zUSF paper
(Part V): the limbic tunnelling amplitude should be measurable via
magnetoencephalography during somatic threshold events; the dyadic propagator
poles should correlate with interpersonal synchrony metrics; and the
consciousness threshold T_c should correspond to a measurable EEG phase
transition.

---

\clearpage

# Declaration of Originality

I, Alistair Johnson (ORCID: 0009-0007-2194-0850), declare that this work is
my own original research, conducted independently as an independent researcher
based in Zurich, Switzerland.

The mathematical framework, the clinical interpretations, the Lean 4
formalisations, the quantum experiment design and results, and the writing are
all my own work, except where explicit citation is given.

The Lean 4 proof sources in the Appendix distinguish kernel-checked theorems
from axioms and remaining `sorry`s (current proof surface: v4.33.0). They are
available in the repository
`ITI-Theory/U` on GitHub and can be independently verified by any party
with access to Lean 4 and Mathlib.

Published records in this collection have Zenodo concept DOIs; current status
and pending records are tracked in the project DOI registry.

*Alistair Johnson, Zurich, 2026*

---

\clearpage

# Preface

This work began with a single observation that refused to go away: the
mathematics of fear and the mathematics of quantum tunnelling are the same
mathematics.

I did not set out to write a physics theory of emotion.  I set out to
understand a clinical phenomenon — why certain emotional states are almost
impossible to exit through will or insight alone, and why somatic (body-based)
interventions succeed where cognitive approaches fail.  The answer that emerged
from formalising the question was: because the emotional state is in a
potential well with a barrier that requires tunnelling, not gradient descent,
to cross.

Once the barrier was in the model, everything else followed.  The barrier
required a potential; the potential required a geometry; the geometry turned
out to be an 8-dimensional space that happened to match the BRECVEMA
classification of emotional induction mechanisms.  The BRECVEMA space is
8-dimensional.  M-theory has 7 compact dimensions.  The match is not a
coincidence — or rather, even if it is, the coincidence is testable, and
that is all that matters for science.

The Lean 4 proofs came later, after it became clear that informal argument
was insufficient to settle the key questions.  When I found myself writing
*"the propagator has poles at the eigenvalues of W, which are..."* I realised
I could either leave that as an assertion or type-check it.  The Lean files
in the Appendix are the result of choosing to type-check it.

This is not a conventional academic monograph.  It was not written in a
university department, did not go through a PhD committee, and has not
(yet) been refereed in a traditional journal.  It has been published on
Zenodo, which provides persistent identifiers and citability.  The formal
verification provides the rigour that the institutional apparatus would
normally guarantee.

Whether the theory is correct is an empirical question. The Lean proofs show
that named formal statements follow from their definitions and axioms. The
quantum experiment shows model-class reachability in simulation. The clinical
material shows that the framework generates hypotheses about therapeutic
processes. That is enough to warrant a falsifiable research programme rather
than a finished empirical theory.

*A.J., Zurich, July 2026*

---

\clearpage

# Overview of the Work

This monograph is organised in five parts and one appendix, corresponding to
the progression from lay introduction to formal theory to formal verification.

## Kappa: The Editorial Introduction

**Soma-Field Synthesis** introduces the entire programme in accessible terms:
what the soma-field is, why it matters clinically, what the formal apparatus
achieves, and how the seventeen papers relate to each other.  A reader who
reads only this introduction and the zUSF paper (Part V) will have the
essential arc.

## Part I: The Body Knows

**Soma-Field Book** — a lay account of the theory written for a reader with
no mathematical background.  The core ideas — that emotions are fields, that
the body is a computing medium, that the soma-field is both a scientific
model and a practical clinical tool — are developed through narrative and
clinical vignette.

## Interlude: The Tensor — A Film in Fields

**The Tensor** — a bridge between the scientific programme and the
artistic project.  The abstract film *The Tensor* is specified here as a
type-level document: the emotional score, the rendering architecture, the
threshold events. The film is an artistic translation, not evidence for the
formal or physical claims.

## Part II: The Formal Apparatus

The six foundational papers that establish the theory in its original form:

- **Soma-Field Paper** — the 8D BRECVEMA model, Hopfield Hamiltonian, attractors
- **Mathematical Co-Identification** — the co-identification of percept with
  propagator pole; the formal ontology
- **Quantum Soma–Penrose** — the quantum experiment; annealing results; WKB
- **Physical Substrate** — the biological substrate; polyvagal correspondence
- **Music and Affect** — the BRECVEMA mechanisms applied to musical emotion
- **Gestalt Field Dynamics** — emergent field coherence; gestalt in the soma-field

## Part III: Clinical Demonstrations

- **Patient Perspective** — the theory from a patient's point of view; IQ/EQ/AQ/SQ
- **SFT Demo Case** — a fully worked clinical case with field trajectory
- **Preverbal Manifold** — the preverbal layer; the oldest attractor

## Part IV: Extensions and Applications

- **Missing Limbic Layer** (FM-HN) — the limbic field modulates Hopfield β;
  Correspondence Principle; ADHD, ASC, CPTSD as operator modifications
- **Swarm Propagator** — the same Green's function governs drone coordination
  and bird murmurations; O(N²) coordination theorem
- **Geographic Somatic Field** — the same field equation governs dialect
  geography (Estuary English) and parakeet murmurations; river as wave-guide

## Part V: The Universal Theory

- **Universal Somatic Field** — the 15-page capstone; M-theory isomorphism;
  consciousness threshold; the theory as a whole
- **Zoomable Universal Somatic Field** (zUSF) — the magnum opus; 20 scales,
  61 orders of magnitude; the zoom operator; full falsifiability ledger

## Appendix: Formal Lean 4 Verifications

Lean 4 source files, reproduced in dependency order.
The proofs are here not as supplementary material but as primary evidence for
the formal claims they actually state. An AI or human reader who has read only
the preceding papers and then turns to the Appendix can inspect the named
declarations, axioms, and remaining proof obligations directly.
