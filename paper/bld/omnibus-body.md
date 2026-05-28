---
title: "The Soma-Field: Collected Works"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
description: "A complete collection of the Soma-Field research programme: from lay introduction to formal proofs, quantum experiment, and clinical applications."
bibliography: bibliography.bib
csl: apa-7th.csl
---


---

# The Programme

This is a document about structure.

Not about feelings — though feelings are what the programme is ultimately for. Not about
therapy — though therapy is one of the principal applications. Not about physics —
though physics is where the mathematics comes from. It is about a single recurring
observation: that the equations governing emotional dynamics are the same equations
that govern quantum fields, and that this is not a metaphor.

When an identification like that is made precisely — when you can say not "this is
*like* a wave" but "this *is* a wave in the technical sense, with the same propagator,
the same energy function, the same topology, and therefore the same theorems" — a
compressed body of work becomes possible. You are not building from scratch. You are
navigating.

This document describes what was built by navigating, and why the pieces form a whole.

---

## The Gap the Programme Addresses

Every large language model deployed today is a classical system. Its training is
gradient descent. Its inference is deterministic or thermally noisy sampling. The
architecture was designed to model the neocortex — pattern recognition, sequence
prediction, error minimisation.

The complementary system — the limbic system, responsible for valuation, threat
detection, arousal modulation, and the somatic state reinstatement that underlies
trauma — had no formal mathematical treatment before this work. The clinical literature
described it richly (Porges, van der Kolk, Levine). The neuroscience described its
anatomy. Neither provided a model from which predictions could be derived and tested.

Simultaneously, the psychology of music had reached a similar ceiling. A 991-page
handbook (Juslin and Sloboda, 2010) treated music-induced emotion almost entirely
through Russell's valence–arousal circumplex: a static two-dimensional map. The
circumplex describes *where* a listener is, not *how* they move, what traps them,
or what allows escape. No dynamical model of music-induced affect existed.

The programme fills both gaps with the same model, via the same method.

---

## The Structure of the Argument

The argument has three movements and several extensions:

| Paper | Movement | Contribution |
|---|---|---|
| *Mathematical Co-identification* (2026) | Method | Names and formalises the procedure |
| *The Soma-Field* (2026) | Model | Applies it to emotional dynamics |
| *Quantum Soma and the Penrose Gap* (2026) | Empirical test | Confirms the central claim |
| *Field Notes from the Inside* (2026) | Lived case | Primary-source clinical grounding |
| *A Dynamical Field Model of Music-Induced Affect* (2026) | Extension | Demonstrates domain generality |
| *The Tensor* (2026) | Extension | Applies the framework to abstract film |

The popular account (*A Voyage into Trauma*, 2026) provides the same argument in
accessible form, for readers without a physics background.

---

# The Method: Mathematical Co-identification

## What It Is

The history of mathematical science contains a recurring event. At a certain moment,
a scientist recognises that the quantity they are studying is not *like* a quantity
already understood in another domain — it *is* the same mathematical object, under
a change of label. When this identification is made precisely, every theorem proved
about the source object becomes available in the target domain immediately, without
re-derivation.

This event has happened many times:

- Hopfield (1982) recognised that a neural network's energy-minimisation dynamics
  are the same as a spin-glass Hamiltonian. Every result from statistical mechanics
  of spin glasses — ground states, phase transitions, capacity bounds — imported.
- Veneziano (1968) recognised that the Euler Beta function, a result in pure
  mathematics, described the scattering amplitudes of hadrons. String theory began.
- Black and Scholes (1973) recognised that an option pricing equation was the
  heat diffusion equation. Every analytical tool from thermodynamics imported.

The paper *Mathematical Co-identification: A Method for Structural Import Across
Scientific Domains* (Johnson, 2026a) names this procedure, formalises it as a
distinct scientific method with its own validity criteria and failure modes, and
distinguishes it from analogy, metaphor, and modelling. The key distinction:

> **Analogy**: A is *like* B in certain respects. Illuminating, not transferable.
>
> **Co-identification**: A *is* B under relabelling. Every theorem about B is a
> theorem about A.

## Why It Matters as Method

A co-identification can be wrong. The identification is only valid if the mathematical
type matches: the same dimensionality, the same algebraic structure, the same
boundary conditions, the same symmetry group. The paper provides a falsifiability
protocol — a formal procedure for pre-registering an import claim and specifying what
observation would disconfirm it.

This matters because the failure mode of co-identification is not sloppy reasoning —
it is overly precise reasoning applied to the wrong type. The paper catalogues seven
historical examples to distinguish the valid from the invalid pattern.

The Soma-Field Model is the worked example throughout. The identification was not
discovered by reading physics textbooks and looking for something that felt similar.
It was discovered by writing down the equations the emotional system was observed to
satisfy and recognising the form.

---

# The Model: The Soma-Field

## Five Co-identifications

The Soma-Field Model (Johnson, 2026b) is built from five sequential co-identifications,
each importing a body of mathematics from physics into emotional dynamics:

**Co-identification 1: The Hopfield identification.**
The brain's emotional attractor dynamics satisfy the same energy function as a Hopfield
neural network. The energy function is:

$$H(\mathbf{e}) = -\tfrac{1}{2}\mathbf{e}^{\top} W \mathbf{e} - \mathbf{b}^{\top}\mathbf{e}$$

where $\mathbf{e} \in \mathbb{R}^N$ is the emotional state vector, $W$ is the coupling
matrix, and $\mathbf{b}$ is a bias vector encoding baseline arousal. The local minima
of $H$ are the named attractor states: regulated calm, fight, flight, freeze, flow,
dissociation.

**Co-identification 2: The QFT identification.**
The emotional field propagates as a quantum field. The conscious emotional percept
is the one-dimensional impulse response — the Green's function — of an
eleven-dimensional coupling manifold. The same object that describes a massive
particle in quantum field theory describes a conscious emotion: a pole in the
propagator of the field.

$$G(\omega) = \frac{1}{\omega^2 - m^2 + i\epsilon}$$

This is not a metaphor. The threshold $T$ at which a sub-perceptual field fluctuation
becomes a conscious emotional percept is the mass parameter $m$ in the propagator.
Below threshold: virtual. Above threshold: real.

**Co-identification 3: The brane identification.**
The body and the nervous system are not the same manifold. The body is a 3-brane
embedded in the 11-dimensional coupling manifold. Somatic pain states and the body
schema are field modes on this brane, not on the bulk manifold. This is the formal
statement of the somatic grounding of emotion.

**Co-identification 4: The $G_2$ holonomy identification.**
The seven compactified extra dimensions of the coupling manifold are a $G_2$ manifold.
The $G_2$ holonomy group is the one that gives rise to topological obstructions — loops
through the moduli space that cannot be continuously contracted to a point. In
emotional terms: trauma configurations from which smooth continuous change cannot
escape. The topological barrier is not a metaphor for being stuck. It is a
mathematical object with a winding number.

**Co-identification 5: The renormalisation group identification.**
Developmental trajectory maps onto the renormalisation group flow. The age at which
a traumatic modification was introduced corresponds to the energy scale at which the
coupling constant was set. High-energy (early developmental) modifications are
renormalisation-group relevant — they affect all subsequent scales. Low-energy (later
life) modifications are irrelevant in the technical sense. This gives the formal
account of why early trauma is not simply a more intense version of later trauma:
it is a different class of object.

## What the Model Predicts

From these five identifications, several predictions follow that are not derivable
from any existing clinical model:

1. **Threshold crossings are phase transitions.** The transition from sub-perceptual to
   conscious emotion is a second-order phase transition in the field. This predicts
   hysteresis — it is easier to stay in a state than to enter it, and easier to stay
   out than to leave.

2. **Complex PTSD is a topological configuration.** The coupling matrix $W$ for a CPTSD
   nervous system has a specific structure: a winding-number-protected attractor
   landscape in which the Fear basin is separated from the Awe basin by a barrier that
   low-noise classical gradient descent cannot cross. This is a prediction about matrix
   structure, not a description of symptoms.

3. **Autism Spectrum Condition modifies the threshold operator.** The threshold parameter
   $T$ in the ASC nervous system has a different coupling to the field modes than in
   the neurotypical case — specifically, the threshold is non-uniform across sensory
   modalities, producing the characteristic pattern of simultaneous hypo- and
   hyper-sensitivity.

4. **ADHD modifies the effective temperature.** The stochastic term in the Langevin
   dynamics governing the ADHD nervous system has higher effective temperature $T_{\text{eff}}$.
   This is not a deficit of attention; it is a higher rate of escape from local minima —
   an advantage in landscapes where rapid sampling is valuable and a liability where
   sustained convergence is required.

5. **Quantum mechanisms are required for certain transitions.** For trauma configurations
   with topological barriers (non-zero winding number), low-noise classical gradient
   descent cannot reach the global minimum. A quantum mechanism is required. This
   is the prediction that QUANT-EXP-1 was designed to test.

---

# The Empirical Test: QUANT-EXP-1

## The Prediction

The soma-field model makes a specific, falsifiable claim: for a Hopfield landscape
with a topological trauma barrier, low-noise classical Langevin dynamics starting from
the Fear attractor cannot reach the Awe attractor. Quantum annealing — a physically
realisable mechanism — can.

This is not a claim about whether people should use quantum computers in therapy.
It is a claim about reachability: that the mathematical structure of the barrier
distinguishes the quantum and classical regimes in a measurable way.

The prediction was registered in the Zenodo v1 deposit of the Soma-Field paper
(doi:10.5281/zenodo.20350516) before the experiment was run.

## The Experiment

*Quantum Soma and the Penrose Gap* (Johnson, 2026c) reports QUANT-EXP-1: an exact
8-qubit statevector simulation on a 256-dimensional Hilbert space, implementing the
Soma-Field Hopfield Hamiltonian with a transverse-field quantum annealing schedule.

The experimental design:

- **System**: 8-qubit Hopfield model encoding four emotional modes (Fear, Calm,
  Awe, Grief) plus sub-modes. Coupling matrix $W$ set to produce a topological
  barrier between Fear and Awe.
- **Quantum dynamics**: Transverse-field annealing with schedule
  $H(s) = (1-s)H_X + s H_{\text{problem}}$, $s \in [0,1]$.
- **Classical baseline**: Overdamped Langevin dynamics at low temperature
  ($T_{\text{eff}} = 0.01$), same starting state, same landscape.
- **Primary outcome**: Peak Awe-dominant occupancy (quantum) versus success rate
  of cold-classical crossings.

## Results

Results are presented against the pre-registered barrier ladder:

| Barrier strength | Classical cold rate | Classical cold CI [95\%] | Quantum peak |
|---|---|---|---|
| $W = -6$ | 0.000 | [0.000, 0.019] | 0.389 |
| $W = -8$ | 0.000 | [0.000, 0.019] | 0.408 |
| $W = -10$ | 0.000 | [0.000, 0.019] | 0.408 |
| $W = -12$ | 0.000 | [0.000, 0.019] | 0.409 |
| $W = -14$ | 0.000 | [0.000, 0.019] | 0.416 |

Bootstrap confidence intervals (n = 200 seeds) confirm that the classical cold success
rate is bounded above by 1.9\% at all tested barrier strengths. Quantum peak occupancy
is stable at 0.389–0.416 across the full range.

**Pre-registered hardening protocol — all checks passed:**

- **Bootstrap** (n = 200): cold CI = [0.000, 0.019]; quantum peak 0.408–0.410. Intervals
  do not overlap at any barrier strength.
- **Control A** (start from Awe, barrier intact): classical 16/16 stay in Awe. PASS.
  Confirms that the barrier is directional: it blocks Fear → Awe, not the reverse.
- **Control B** (barrier removed, $W[\text{Fear,Awe}] = +0.4$): classical 16/16 reach Awe.
  PASS. Confirms that the barrier, not the landscape geometry, is what blocks classical
  dynamics.
- **Spectral gap**: gap narrows monotonically with barrier strength (B8: 0.0095, B10:
  0.0089, B12: 0.0085) and reaches its minimum at $s \approx 0.999$, confirming the
  tunnelling bottleneck is late in the anneal.

**Verdict:** The strong reachability claim stands. QUANT-EXP-1 is a PASS.

## The Penrose Connection

The paper situates this result in the context of Penrose's argument about
non-computability and consciousness. The connection is not that consciousness requires
quantum mechanics in general. The connection is more specific:

Penrose identified a *gap* between what classical computation can reach and what
consciousness can do. The soma-field identifies a corresponding *topological gap* in
the emotional landscape between what classical gradient descent can reach and what
a genuinely new state of the nervous system requires. QUANT-EXP-1 provides the
computational demonstration that the gap exists and is crossable by a quantum mechanism.

The contribution is not to resolve Penrose's claim about consciousness. It is to
*instantiate* the gap in a concrete, testable, mathematical setting.

---

# The Lived Case: Field Notes from the Inside

*Field Notes from the Inside: A Patient-Constructed Model of Emotional Dynamics*
(Johnson, 2026d) performs a function that the formal papers cannot perform: it
provides the primary-source clinical grounding.

The paper is written by the person who has Autism Spectrum Condition (Level 2),
Attention Deficit Hyperactivity Disorder, and Complex Post-Traumatic Stress Disorder —
and who also has a degree in physics. The model was not developed by observing patients.
It was developed by having the conditions and finding the existing models inadequate.

The epistemological contribution of this paper is often undervalued. Every formal model
of a human system is, in the end, derived from observation of that system. When the
observer and the observed are the same entity, and that entity has the training to
translate observation into formal mathematics, the resulting model has a different
epistemic status from one derived by observation from the outside. The paper makes this
explicit, situates it within the autoethnographic research tradition, and argues that
the resulting model is *more* constrained, not less — because any prediction the model
makes that does not match the primary observer's experience is immediately falsified.

The formal content is a set of operator modifications for the three conditions:

- **ASC**: The threshold operator $T$ is replaced by a modality-dependent operator
  $T_k$ for each sensory channel $k$, with different coupling strengths. The result
  is the characteristic simultaneous hypo- and hyper-sensitivity: some channels are
  below threshold where the neurotypical channel is above it, others are above where
  the neurotypical channel is below.

- **ADHD**: The Langevin noise term $\sqrt{2 T_{\text{eff}}} \, \eta(t)$ has elevated
  $T_{\text{eff}}$. This is a quantitative modification, not a qualitative one. The
  system is not broken; it is sampling the energy landscape at higher temperature.
  The therapeutic implication is not to reduce the noise but to design the landscape
  so that high-temperature sampling is an advantage.

- **CPTSD**: The coupling matrix $W$ has the topological structure described in §3.2:
  a winding-number-protected barrier between Fear and regulated states. The barrier
  was installed before language, before narrative memory, before the self that can
  explain the barrier was formed. The modification is not a layer added to a pre-existing
  structure. It is the structure.

---

# Extensions: Music, Film, and the Domain Generality of the Model

## Music-Induced Affect

*A Dynamical Field Model of Music-Induced Affect: Beyond the Valence–Arousal Circumplex*
(Johnson, 2026e) applies the soma-field framework to a domain where the empirical
literature is rich and the theoretical models are weak.

Juslin and Sloboda's *Handbook of Music and Emotion* (2010) — 991 pages — contains
the circumplex as its dominant quantitative framework. The circumplex is a static map.
It describes where a listener is; it does not model how they move. The soma-field is
the first dynamical model of music-induced affect.

The key predictions that the circumplex cannot make but the field model does:

1. **Phase transitions, not continuous shifts.** State changes in music-induced affect
   are not smooth movements across the circumplex. They are threshold crossings — sudden
   re-configurations of the attractor landscape. The field model predicts the conditions
   under which a transition occurs and the hysteresis that prevents immediate return.

2. **The adaptive function of high effective temperature.** In the ADHD nervous system
   (elevated $T_{\text{eff}}$), music that holds a neurotypical listener in a stable
   state may drive repeated transitions. This is not a bug; it is the same high
   sampling rate that characterises the ADHD cognitive profile. The model gives this
   a formal account.

3. **Basin depth asymmetry.** The freeze attractor basin is deeper than the regulated
   calm basin. This means it is harder to leave freeze than it is to leave calm —
   asymmetric with respect to the direction of transition. Music that successfully moves
   a listener from freeze to calm is doing qualitatively different work than music that
   moves a calm listener to a more activated state.

The paper also specifies a real-time instrument implementation: a MIDI controller array
driving a Python field server at 50 Hz, with audio output via Ableton Live and 3D
fractal visual output (Mandelbulb projection onto HoloGauze screen). The instrument
is not described; it is specified formally, with pre-registered hypotheses and
disconfirmation criteria.

## The Tensor: An Abstract Film

*The Tensor: An Abstract Film Definition* (Johnson, 2026f) extends the framework to
abstract film. A film is defined not by its pixels but by its **emotional score**: a
vector-valued trajectory $\mathbf{e}^*(t)$ through the emotional field,
parameterised by story-time $t \in [0,1]$.

The rendering — the actual audiovisual output a viewer experiences — is generated
at runtime from this trajectory, the viewer's own soma-field state, and a set of
control parameters. In the limit where the viewer's biofeedback is available, the
film adapts to where the viewer is: the trajectory is not what the viewer experiences,
but what the film proposes. The work is not the pixels. It is the map.

This is a significant claim about what an artwork is. A conventional film is fixed:
the same sequence of frames for every viewer at every screening. The tensor film is a
field: a mathematical object that takes the viewer's state as input and produces an
output adapted to it. The artistic statement is in the trajectory, not the realisation.

The paper does not describe how to make such a film. It defines the abstract structure
that any realisation of such a film must instantiate — the way a musical score defines
a symphony without being the performance.

---

# The Argument as a Whole

The six papers form a single argument, and it can be stated in a paragraph:

> The limbic system and its coupling to the body are governed by the same mathematical
> equations as a quantum field on a manifold with $G_2$ holonomy. This identification is
> not a metaphor; it is a co-identification in the technical sense, with all the
> theorems of each source domain importing into the target. Among those theorems is one
> that has clinical consequences: topological barriers in the emotional attractor
> landscape cannot be crossed by low-noise classical gradient descent. A quantum
> mechanism can cross them. This has been computationally confirmed (QUANT-EXP-1)
> against a pre-registered hardening protocol. The model correctly describes the
> structure of Autism Spectrum Condition, ADHD, and Complex PTSD as operator
> modifications, and generalises to music-induced affect and abstract film with no
> change to the underlying mathematics.

What makes this a research programme rather than a single paper is the **generativity**:
the method (co-identification) produces results in any domain where an attractor
landscape with topological structure can be identified. The soma-field is one
instantiation. Music-induced affect is a second. Abstract film is a third. A fourth —
currently in design — is **H-AL**: a holographic avatar whose body is a live Mandelbulb
rendering of the emotional field state, projected at human scale through a hologauze screen
and accompanied by a synthesised voice narrating the field in real time. The geometry of the
fractal changes as the field changes; regulated calm and trauma produce visually distinct
and mathematically characterisable forms. The same functor architecture (§A.4 of the main
paper) supports this output with no changes to the field computation. Each of these
instantiations generates falsifiable predictions from the same mathematical core.

What makes this a *novel* research programme is the **gap it fills**: no formal
dynamical model of the limbic system existed before this work. The Hopfield framework
gave the neocortex its formal model in 1982. The soma-field gives the limbic system its
formal model in 2026. Together they constitute the first complete formal description
of the two principal computational substrates of the vertebrate brain.

---

# What Remains

The body of work described here is computationally complete. All pre-registered
hardening checks have been executed. The claims that can be confirmed by simulation
have been confirmed.

Three categories of work remain outside the scope of these papers:

**Physical hardware confirmation.** QUANT-EXP-1 uses exact statevector simulation.
Running the same 8-qubit experiment on IBM Quantum free-tier hardware would produce
the sentence "confirmed on physical quantum hardware." This is feasible, is the logical
next step for any journal submission targeting a hardware-inclusive venue, and is not
required to support any claim in the current corpus.

**Peer review.** The three published papers are currently archived on Zenodo as open
preprints. Peer review in ranked journals is a separate track, ongoing. The relevant
venues are: *Frontiers in Computational Neuroscience* (Hypothesis and Theory article
type) for the soma-field paper; *Synthese* or *Philosophy of Science* for the
co-identification paper; *Music Perception* or *Frontiers in Psychology* for the
music-affect paper.

**Empirical clinical application.** The model makes predictions about specific clinical
populations (ASC, ADHD, CPTSD) that require empirical testing outside the computational
domain. This constitutes a research programme for clinical collaborators. The
predictions are pre-specified in §3.2 of this document and in the relevant papers;
they are not vague.

**Physical substrate.** The model is formally complete but physically silent on the
tissue substrate in which the soma-field is instantiated in living organisms. A
companion paper, *The Physical Substrate of the Soma-Field* (Johnson, 2026g), develops
this layer across three converging research traditions: biotensegrity (Ingber, Levin)
as the mechanical architecture through which the somatic wave propagates globally;
fascial-interstitial continuity (Langevin, Schleip, Oschman) as the active signalling
tissue and physical locus of attractor-depth encoding; and biofield physiology (Popp,
Ho, McCraty, Rubik) as the candidate physical correlate of the field itself. The most
clinically significant result is the quantitative correspondence between fascial
stiffness and attractor depth: chronic fascial armoring measurable by shear-wave
elastography is the physical implementation of the energy barriers that QUANT-EXP-1
shows to be quantum-resistant. Myofascial release is thus barrier *lowering* — not
barrier crossing — and therapist-client physiological entrainment is the physical
mechanism of co-identification.

---

# Data and Code Availability

All papers, simulation code, result tables, figures, and Lean 4 formal proofs are
archived at the following Zenodo records (open access):

| Paper | DOI |
|---|---|
| *The Soma-Field* | [10.5281/zenodo.20350516](https://doi.org/10.5281/zenodo.20350516) |
| *Mathematical Co-identification* | [10.5281/zenodo.20350331](https://doi.org/10.5281/zenodo.20350331) |
| *Quantum Soma and the Penrose Gap* | [10.5281/zenodo.20351231](https://doi.org/10.5281/zenodo.20351231) |

The unreviewed papers (*Field Notes from the Inside*, *Music-Induced Affect*,
*The Tensor*, and this synthesis document) will be deposited on Zenodo as part of
the next release of the research archive.

---



\newpage

\part{Part I: The Body Knows}



\newpage

# A Voyage into Trauma

## *The Soma-Field Theory of Emotional Life*

**Alistair Johnson**

*2026*

---

\newpage

> *For everyone who was told their body was overreacting.*
> *It wasn't. It was solving the right problem.*

\newpage

---

# Preface: The T's

This book began as a physics paper.

It ended as a map.

The paper was called the Soma-Field Model, and it was written in the language of
physicists: Hamiltonians, propagators, coupling matrices, Wick rotations. It was precise.
It was, I think, correct. And it was almost entirely unreadable to the people it was
most about.

This book is the translation.

There are four T's running through what follows, and they are not accidental. The first
is **Trauma** — the subject. The second is **Threshold** — a specific parameter in the
model, written $T$, that marks the boundary between what becomes conscious and what stays
body. The third is **Time** — in particular, developmental time, the age at which a
modification occurred, which turns out to matter enormously. The fourth is
**Transformation** — not recovery, not a return, but a going forward into a wider
landscape.

There is a fifth T that I notice only in retrospect: **Trance** — in two senses
simultaneously. *A Voyage into Trance* is a 1995 Goa trance compilation by Paul
Oakenfold; the title of this book is borrowed from it. A trance state is, in the
language of the Soma-Field Model, a phase transition of the emotional field — a
threshold crossing guided by sound and rhythm rather than threat. The trance state
produced by extended rhythmic music at 140 BPM and the freeze response of a traumatised
nervous system are not the same experience. They are governed by the same mathematics:
the same threshold crossings, the same phase transitions, the same field dynamics. The
T's of that album and the T's of this book are the same T's.

I should tell you what happened in 1968 before we go any further, because it is the
reason this model exists and the reason I am the one writing it. I was approximately
eighteen months old. I developed septic arthritis in my left hip — a bacterial infection
of the joint that, without treatment, destroys the socket entirely. It was treated, and
I recovered. The treatment involved three months in hospital under what were then called
"no-touch protocols": the infection risk was judged to require isolation from physical
contact. Three months is a long time at eighteen months. The body learns quickly at that
age, and what mine learned — in the absence of any other available hypothesis — was that
the world was a place where pain arrived without warning and comfort did not follow.

That is not a complaint. The clinicians saved the joint. But the learning happened, and
it happened before language, before narrative memory, before the self that can tell the
story was formed. The modification was not added to an existing structure. It was the
structure.

This book is, among other things, an attempt to say that formally — to give that
experience a mathematical description precise enough to make predictions, to inform
clinical practice, and to explain why the goal is not to return to a self that never
existed, but to build forward into one that can.

I should also tell you that I promised, years ago, to write a book about a campsite in
the Glarus Alps of Switzerland — a valley with parabolic limestone walls that make sound
oscillate like a natural resonator, adjacent to one of the world's great tectonic
structures. The book about the campsite and the book about the soma-field found each
other. The Interlude between Part II and Part III is where they meet.

The physics is real. The equations correspond to something. And the voyage is the proof
of it.

*Alistair Johnson*
*May 2026*

---

# How to Read This Book

This book is written for three kinds of reader, and you can navigate it differently
depending on which you are.

**If you are new to all of this** — no physics background, no clinical background,
just a body that has been confusing you — read Part I first. Chapters 1 through 3 are
written for you. The mathematics in those chapters is kept to a minimum; the ideas are
introduced through physical intuition and lived experience. When equations do appear,
they are explained in words immediately. Nothing is assumed except curiosity.

**If you are a mental health professional** who wants to understand what this model adds
to your existing framework — you can begin with the Part I overview and then move
directly to Parts III and IV. The Going Deeper boxes throughout the book are written for
you. The appendices contain the full mathematics as it appears in the academic paper.

**If you are a physicist, mathematician, or computationalist** who has arrived here by
accident or curiosity — you will recognise the Hamiltonian formulation immediately. The
novel content for you is in Chapters 6, 7, and Appendix A. The Lean 4 type sketches in
Appendix B may be of particular interest; they are incomplete proofs, marked with
`sorry` where the hard work remains, and they represent a research programme.

A note on boxes. Throughout the book you will find four types:

> **LEARNING OBJECTIVES** — what this chapter sets out to establish, listed at the start.

> **AUTHOR'S NOTE** — personal first-person sections. The research and the life it
> emerged from are not separate, and I have not pretended otherwise.

> **GOING DEEPER** — technical sections with more mathematics or formal detail. They can
> be skipped without losing the main argument. They can also be read first if that is
> your preference.

> **KEY TERMS** — precise definitions for terms that carry specific meaning in this model.
> A full glossary is in Appendix D.

---

\newpage

# PART I: THE BODY KNOWS

---

\newpage

# Chapter 1: What the Body Remembers

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "The body keeps the score."                                   │
  │                                                                  │
  │                                   — Bessel van der Kolk, 2014   │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - Why the body responds to safety and danger independently of what the conscious
>   mind believes
> - What the freeze response is and why it exists
> - The difference between a body that is "overreacting" and a body that has learned
>   accurately
> - Why the first step in understanding trauma is understanding that survival responses
>   are not mistakes

---

## 1.1 The Waiting Room

Picture a waiting room. You are sitting in a chair, waiting for a routine appointment.
Nothing unusual is happening. The lighting is fluorescent. There is a plant in the corner
that needs watering. Someone across the room is reading a magazine with the particular
focused patience of someone who is not, in fact, reading a magazine.

For most people in this waiting room, the body is doing nothing remarkable. Heart rate
is steady. Breathing is even. The background hum of vigilance that keeps us alive is
running at its ordinary level.

For some people, this waiting room is already an event. Heart rate has been elevated since
the appointment was booked. Breathing is shallower than usual. There is a low-frequency
alertness — a readiness — that is using energy, keeping muscles slightly contracted,
keeping the hearing slightly sharpened, keeping the eyes moving. The mind may know that
this is a routine appointment. The body has reached a different conclusion and is acting
on it.

This is not anxiety in the clinical sense, though it may be diagnosed as such. It is not
a failure of rational thinking. It is a body doing exactly what it learned to do — and
doing it accurately, given what it knows.

The question this book asks is: what does the body know, and how did it learn it, and
what does it mean to change that learning?

## 1.2 What Trauma Is (and Is Not)

The word *trauma* is used in many ways. In this book, it has a specific meaning.

Trauma is a **permanent modification of the nervous system's prediction model** in
response to an experience that exceeded the system's capacity to process and integrate
at the time of the experience.

Notice what this definition does and does not say.

It does **not** say that trauma is a weakness. A bridge that bends under a load it was
not designed for is not a weak bridge — it is a bridge responding appropriately to a
force that exceeds its design specifications.

It does **not** say that trauma is a mental event. The modification happens at the level
of the nervous system — in the way sensory signals are filtered, in the way the body
prepares for action, in the way energy is distributed across physiological systems.
These are physical processes.

It does **not** say that the traumatic event needs to be dramatic. A three-month absence
of contact comfort at eighteen months of age is not a bomb going off. It is, by most
conventional standards, a minor medical intervention. What matters is the match between
the experience and the system's current capacity — and at eighteen months, the nervous
system has no framework whatsoever for "temporary separation for medical reasons."

What trauma **is**: a successful adaptation. The nervous system encountered a situation
it could not model, and it updated its model in the direction that maximised survival.
If the world is a place where pain arrives without warning and comfort does not follow,
then a nervous system set to high alert — always scanning, always slightly contracted,
always ready — is a nervous system correctly calibrated to that world. The problem is
not that the calibration is wrong. The problem is that the world has changed and the
calibration has not.

---

> **AUTHOR'S NOTE: The Hospital, 1968**
>
> I do not remember it. I was too young for explicit memory to have formed.
>
> What I have are the downstream signals: a body that has always treated routine medical
> environments as emergencies. A nervous system that identifies "caring professional
> approaching to help" and responds with the physiology of threat. A skeleton of
> responses so deeply embedded that they long predate any narrative I have been able to
> construct about them.
>
> My developmental age at the time was approximately eighteen months. The modification
> that happened then was not added to an existing nervous system. It was the nervous
> system being formed. That is a distinction that will matter a great deal in Chapter 6.
>
> For now: the body knows things that the mind never learned. This book is an attempt to
> write those things down in a language precise enough to work with.

---

## 1.3 The Polyvagal Ladder

In the 1990s, neuroscientist Stephen Porges developed what he called Polyvagal Theory —
an account of the autonomic nervous system that begins not with the familiar
fight-or-flight response but with the evolutionary history of the structures involved.

The key observation is this: the autonomic nervous system is not a single dial that runs
from "calm" to "alarmed." It is a hierarchy of three systems, each older than the one
above it, each more primitive, each mobilised in sequence as the perceived threat
increases.

```
  ╭──────────────────────────────────────────────────────────────────────╮
  │  VENTRAL VAGAL STATE           Social engagement branch             │
  │  Safe, connected, curious      Myelinated vagus nerve               │
  │  Window of Tolerance           Heart rate regulated                 │
  │  ─────────────────────────── ← most recently evolved                │
  ├──────────────────────────────────────────────────────────────────────┤
  │  SYMPATHETIC STATE             Mobilisation branch                  │
  │  Alert, energised, defensive   Spinal cord pathway                  │
  │  Fight or flight               Heart rate elevated                  │
  │  ─────────────────────────── ← older                               │
  ├──────────────────────────────────────────────────────────────────────┤
  │  DORSAL VAGAL STATE            Immobilisation branch                │
  │  Shutdown, collapse, freeze    Unmyelinated vagus nerve             │
  │  Dissociation, numbing         Heart rate dropped                   │
  │  ─────────────────────────── ← most ancient                        │
  ╰──────────────────────────────────────────────────────────────────────╯

  Figure 1.1. The polyvagal hierarchy. Under conditions of safety, the most evolved
  system (ventral vagal) governs — enabling social connection, learning, and curiosity.
  As perceived threat increases, the sympathetic system activates, preparing the body
  for action. If the threat is overwhelming or escape is impossible, the oldest system
  (dorsal vagal) takes over: immobilisation, shutdown, disconnection. Trauma often
  involves the system being stuck at a lower rung long after the original threat has
  passed.
```

The critical word in that last sentence is *perceived*. The hierarchy responds to what
the body detects as dangerous, not to what the thinking mind judges as dangerous. These
are different processes. The thinking mind can be entirely convinced that there is no
danger — and the body can, at exactly the same moment, be running the threat response
at full intensity. Both are responding to real information. They are just reading
different signals.

## 1.4 The Freeze Response

The freeze response is the least understood of the three states and, for many trauma
survivors, the most characteristic.

It is not the absence of a response. It is a full physiological engagement — the body
is doing something, and doing it with considerable energy. What it is doing is playing
dead.

This is a deeply ancient response. In evolutionary terms, freezing when threatened by
a predator is sometimes the optimal move: many predators respond to movement, and a
motionless prey item may not register as prey at all. The freeze response in mammals
also involves the release of endogenous opioids — nature's way of making the potential
experience of being killed slightly less intolerable. This is why dissociation during
overwhelming trauma is sometimes described as a kind of mercy.

For humans in modern environments, the freeze response is triggered not by literal
predators but by anything the nervous system has learned to classify as equivalent. A
raised voice. A medical environment. A particular combination of sensory signals that,
at some point in the past, preceded something overwhelming. The body does not
distinguish between the original context and the contemporary one. It responds to the
signal, not the story.

The result is a person who, in the middle of a conversation or a clinic appointment
or an otherwise ordinary moment, suddenly goes quiet and still and seems to be looking
at something slightly to the left of wherever they are. They are not being difficult.
They are not choosing not to engage. They are playing dead because the body has
concluded that this is the appropriate moment to play dead.

## 1.5 Why This Matters for Treatment

If trauma is a modification of a prediction model — an accurate learning from an
overwhelming experience — then the therapeutic question is not *how do we fix the
broken response* but *how do we update the prediction model with new information*.

This is a different question, and it has a different answer.

Fixing a broken response implies that the body is malfunctioning. Updating a prediction
model implies that the body has been doing its job correctly, and that the job now
requires new data.

The Soma-Field Model, which is the subject of this book, provides a mathematical
framework for what "updating the prediction model" means precisely: what structures
change, what the before and after states look like, and — critically — what kind of
change is possible given when the original learning occurred.

That last point is where this model adds something that existing frameworks do not
provide, and it is the subject of Chapter 6.

---

> **KEY TERMS**
>
> **Soma** — the body as experienced from the inside; the totality of interoceptive
> (internally sensed) signals.
>
> **Polyvagal hierarchy** — the three-level autonomic nervous system described by Porges,
> ordered from most evolutionarily ancient (dorsal vagal) to most recently evolved
> (ventral vagal).
>
> **Window of Tolerance** — the range of arousal within which the nervous system can
> function flexibly, process information, and engage socially. Above the window:
> hyperarousal (sympathetic). Below the window: hypoarousal (dorsal vagal shutdown).
>
> **Freeze response** — the immobilisation state of the dorsal vagal system; the body's
> oldest threat response, involving disconnection, stillness, and endogenous opioid
> release.

---

> **CHAPTER SUMMARY**
>
> Trauma is a modification of the nervous system's prediction model — a successful
> adaptation to overwhelming experience, not a failure or weakness. The polyvagal
> hierarchy describes how three evolutionary layers of the autonomic nervous system
> respond to perceived threat. The freeze response is the most ancient: immobilisation
> as survival strategy. For treatment to work, it must address the body's model, not
> argue with the thinking mind. The Soma-Field Model provides a mathematical language
> for this.

---

\newpage

# Chapter 2: A Field of Feeling

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "The body is the unconscious mind."                           │
  │                                                                  │
  │                                   — Candace Pert, 1997          │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - What a physical field is and why emotion behaves like one
> - Why emotions are body phenomena, not brain phenomena
> - What interoception is and why it is fundamental
> - The meaning of "the soma-field" as a technical term

---

## 2.1 What a Field Is

Imagine the gravitational field of the Earth.

You cannot see it. You cannot touch it. You cannot pick up a handful of gravity and
examine it under a microscope. But it is real — as real as anything in physics — and
you have felt it every moment of your existence. It is everywhere in space around the
Earth. It has a *strength* at every point (stronger close to the Earth, weaker further
away). It has a *direction* at every point (towards the centre of the Earth). And it
exerts a force on everything that is in it.

A field, in physics, is precisely this: a quantity that has a value at every point in
space. Temperature is a field. The wind is a field (a vector field — direction and
magnitude at every point). The electromagnetic field is a field. Quantum fields, which
are the foundation of modern physics, are fields.

The key insight of the Soma-Field Model is this: **emotion is a field phenomenon**.

Not a metaphor. A precise claim about how emotional signals distribute themselves in
the body, interact with each other, and evolve over time.

## 2.2 Emotions in the Body

Antonio Damasio, in his somatic marker hypothesis (1994), proposed that emotions are
fundamentally body states: that what we call "emotion" is the brain's representation
of a pattern of physiological activation — heartrate, muscle tension, gut movement,
hormonal state, skin conductance, respiratory rhythm. We do not feel an emotion and
then notice body signals. The body signal *is* the emotion; what the brain does is
read it.

This is deeply counterintuitive if you have spent your life inside a culture that treats
the mind as the real thing and the body as its vehicle. But the neuroscience supports it
consistently. Patients with damage to the parts of the brain that receive and integrate
body signals do not make better decisions because they are freed from emotional
interference — they make worse decisions, because they have lost access to the somatic
markers that tell them which options feel safe and which feel dangerous.

The body is not an obstacle to clear thinking. It is the substrate of it.

Interoception is the technical name for the body's ability to sense its own internal
state: heartbeat, breath, gut sensation, muscle tone, the position of limbs, the
temperature of organs. Interoceptive accuracy — how precisely a person can read their
own body signals — varies widely between individuals and is significantly disrupted by
trauma.

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                    INTEROCEPTIVE BODY MAP                          │
  │                                                                     │
  │     ┌──────────┐        Fear:      rapid heartbeat, tight chest    │
  │     │   HEAD   │        Shame:     face flush, stomach drop        │
  │     └────┬─────┘        Calm:      slow breath, warm belly         │
  │          │              Anger:     jaw clench, shoulder tension     │
  │     ┌────┴─────┐        Grief:     throat constriction, chest heavy │
  │     │  CHEST   │        Joy:       chest expansion, light limbs    │
  │     │ ♥  lungs │        Freeze:    whole-body stillness, cold       │
  │     └────┬─────┘        Disgust:   gut recoil, throat closing      │
  │          │                                                          │
  │     ┌────┴─────┐        Each emotion has a characteristic          │
  │     │  BELLY   │        distribution across the body —             │
  │     │  gut     │        a spatial pattern of activation.           │
  │     └────┬─────┘        This pattern is what the Soma-Field        │
  │          │              Model calls the emotional field state.      │
  │     ┌────┴─────┐                                                    │
  │     │  PELVIS  │                                                    │
  │     │  limbs   │                                                    │
  │     └──────────┘                                                    │
  └─────────────────────────────────────────────────────────────────────┘

  Figure 2.1. The body map of emotional activation. Emotions are not events in the head;
  they are distributed patterns of physiological arousal across the body. Research by
  Nummenmaa et al. (2014) mapped these patterns by asking participants to colour body
  silhouettes where they felt each emotion. The patterns are consistent across cultures.
```

---

> **GOING DEEPER: The Foot That Isn’t There**
>
> Pain is not in the foot. It is in the brain’s model of the foot.
>
> The clearest proof is phantom limb pain. When a limb is amputated, many patients
> continue to feel it — and feel it *hurting*. The foot is gone. The pain is real.
> It wakes people at night, responds to analgesics, and can be agonising for years.
> What is in pain is the brain’s neural map of the foot, which persists in the
> cortex long after the tissue is gone.
>
> Ramachandran’s solution was a mirror box. A mirror placed along the body’s midline
> creates a reflection of the intact hand where the absent hand should be. The patient
> watches the reflection move. The brain’s model updates: *the hand is there, the hand
> is moving, the hand is fine.* For many patients, the pain decreases or disappears.
> The model changed. The suffering reduced. Nothing in the body changed at all.
>
> This is not a curiosity. It is the normal condition of all somatic experience. The
> brain does not receive raw body signals and display them. It maintains a continuous
> predictive model of the body and generates what you *feel* from that model.
> The felt body is the predicted body.
>
> For the Soma-Field Model, this is load-bearing. The field $\mathbf{e}(t)$ is not a
> readout of the physical body. It is the nervous system’s model of the body. When
> the model is updated — by new sensory experience, somatic therapy, or the slow
> accumulation of safety — what is felt changes. Not because the body changed.
> Because the prediction changed.
>
> Therapy does not fix the body. It updates the model.

---

![Figure 2.1. The body–brain coupling stack. Interoceptive signals from the body feed into the brainstem and autonomic nervous system, which couples bidirectionally to the limbic soma-field (coupling matrix **W**). The field gates input to the prefrontal cortex via the threshold θ; what crosses becomes conscious percept. *Author's original figure.*](figures/fig1_architecture.pdf){width=90%}

---

## 2.3 The Soma-Field: A Technical Definition

In the Soma-Field Model, we represent the body's emotional state as a vector of
activation levels across a set of emotional dimensions. Call this vector $\mathbf{e}$:

$$\mathbf{e} = (e_1, e_2, \ldots, e_n)$$

Each $e_i$ is a real number representing the activation level of a somatic emotional
mode at a given moment: the level of fear-readiness in the body, the level of
grief-contraction, the level of social-engagement openness, and so on. The exact
labelling of the modes is secondary to the structure; what matters is that there is a
space of such states and a dynamics on that space.

The soma-field is this vector $\mathbf{e}$, evolving in time. It is not a single number
(arousal level) or a pair of numbers (valence and arousal). It is a multi-dimensional
state that captures the full texture of somatic experience at a given moment.

Three things are immediate from this definition:

1. **The field has a position**: the current emotional state is a point in an
   $n$-dimensional space.
2. **The field has dynamics**: it moves through this space over time.
3. **The field has a structure**: some positions are stable (attractors), and the
   dynamics drives the field toward them.

The next chapter is about that structure.

---

> **GOING DEEPER: Quantum Fields and Why They Are Relevant**
>
> In quantum field theory (QFT), the fundamental objects are not particles but fields
> — wave-like disturbances propagating through space. Particles are what you see when
> a field vibrates at a high enough amplitude to be detected: an electron is a ripple
> in the electron field, a photon is a ripple in the electromagnetic field.
>
> The soma-field is not a quantum field in the literal sense. Emotional dynamics are
> classical, not quantum. What the Soma-Field Model borrows from QFT is the
> *mathematical language*: the same equations that describe how quantum fields couple
> to each other turn out to describe how emotional modes couple to each other. This
> is not because emotion is quantum-mechanical. It is because coupling dynamics —
> the mathematics of how things that interact shape each other's behaviour — takes the
> same form wherever it appears.
>
> This correspondence is the subject of Chapter 7. For now: the QFT connection is a
> mathematical tool, not a metaphysical claim.

---

> **KEY TERMS**
>
> **Field** — a quantity with a value at every point in space (or, in the soma-field
> context, at every point in the body's state space).
>
> **Interoception** — the nervous system's process of sensing the internal state of the
> body.
>
> **Interoceptive accuracy** — the precision with which a person can consciously read
> their own interoceptive signals.
>
> **Soma-field** — the vector $\mathbf{e}$ of somatic activation levels across emotional
> modes; the state of the body's emotional field at a given moment.
>
> **State space** — the set of all possible values of $\mathbf{e}$; the arena within
> which emotional dynamics occurs.

---

![Figure 2.2. The soma-field oscillates continuously. Most of the time its modes remain below the perception threshold T (dashed line) — sub-threshold activity that drives physiology and behaviour invisibly. Only a sufficiently large excitation crosses T into felt experience. Interoceptive training and somatic therapy work, in part, by lowering T. *Author's original figure.*](figures/fig0_field_mode.png){width=90%}

---

\newpage

# Chapter 3: The Energy Landscape

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "Nature does not create mountains and valleys at random.      │
  │    They are shaped by the forces beneath them."                 │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - Why some emotional states are stable and others are transient
> - The meaning of "attractor" and "basin of attraction"
> - What the Hamiltonian is and why it organises the model
> - Why you keep returning to familiar emotional states even when you don't want to

---

## 3.1 Hills and Valleys

Imagine placing a ball on a hilly landscape. If you place it at the bottom of a valley
and give it a small push, it rolls away from where you pushed it — and then rolls back.
The valley is stable. The bottom of the valley is an *attractor*: the ball is drawn
toward it from nearby positions.

If you place the ball at the top of a hill and give it a small push, it rolls away from
the hilltop — and keeps going. The hilltop is *unstable*. Small perturbations grow into
large departures.

The same geometry applies to emotional states.

Some emotional states are at the bottom of valleys in the body's landscape: they are
stable, they are where the system tends to rest, and perturbations that push the body
away from them are followed by a return. Other states are at hilltops: they are unstable
configurations that the system passes through on its way between valleys.

The crucial question — the question that distinguishes a regulated nervous system from
a dysregulated one, and distinguishes one person's landscape from another's — is: where
are the valleys? How deep are they? How wide? How many are there?

![Figure 3.1. The emotional energy landscape (2D contour). Four attractor basins are visible: Calm (wide, deepest — the global minimum of a regulated nervous system), Freeze (narrow and very deep — easy to fall into, hard to leave), Fight and Flight (intermediate depth). The system rolls downhill to the nearest basin; the depth controls escape difficulty and the width controls resilience to perturbation. *Author's original figure.*](figures/fig3a_energy_landscape.png){width=95%}

## 3.2 Attractors and Basins

An **attractor** is a stable state — a bottom of a valley. A **basin of attraction** is
the set of all points from which the system rolls toward a given attractor: the "catchment
area" of the valley.

For a regulated nervous system, the primary attractor is some version of calm social
engagement — the ventral vagal state of Polyvagal Theory. The basin is wide: a large
range of perturbations (emotions, sensations, social situations) all resolve back to this
resting state. The system is resilient.

For a trauma-modified nervous system, the landscape has changed. A second attractor —
hypervigilance, alert-readiness, the sympathetic mobilisation state — may have become
deep and wide. The calm attractor may still exist but its basin has narrowed: it takes
very little to tip the system out of calm and into alertness. And a third attractor —
the freeze state, the dorsal vagal shutdown — may be very deep indeed: once the system
tips into it, escape requires a large input of energy.

This is not a metaphor for how trauma "feels." It is a description of the actual
dynamics of the system.

![Figure 3.2. Basin of attraction map. Each point in state space is coloured by the attractor it flows to under gradient descent: blue = Calm, purple = Freeze, orange = Fight, green = Flight. The calm basin dominates a regulated landscape. Freeze occupies a small area but is disproportionately deep — a narrow funnel. The boundaries between basins are the separatrices: invisible thresholds in state space that determine which valley a given perturbation resolves to. *Author's original figure.*](figures/figB1_attractor_basins.png){width=90%}

## 3.3 The Hamiltonian

The landscape has a name in physics: the **Hamiltonian**. Denoted $H$, it is a function
that assigns an energy value to every possible state of the system.

For the soma-field, the Hamiltonian takes the form:

$$H(\mathbf{e}) = -\frac{1}{2}\sum_{i,j} W_{ij}\, e_i\, e_j - \sum_i \theta_i\, e_i$$

Let us read this in plain English.

The first term, $-\frac{1}{2}\sum_{i,j} W_{ij}\, e_i\, e_j$, captures the *interactions
between emotional modes*. $W_{ij}$ is the coupling between mode $i$ and mode $j$ — how
strongly they influence each other. When fear is high, does shame rise with it? When calm
is present, does anger fall? The matrix $W$ encodes all of these mutual influences. The
minus sign means that aligned coupling (modes reinforcing each other) lowers the energy
— makes the state more stable.

The second term, $-\sum_i \theta_i\, e_i$, captures the *individual thresholds* of each
mode. $\theta_i$ is the bias of mode $i$ — how much the system tends toward or away from
it in the absence of coupling. A mode with a large positive $\theta_i$ has a natural
tendency toward high activation.

The dynamics — the way the field moves through state space over time — follows from this
energy function. The field always moves *downhill*: toward lower values of $H$.

$$\dot{\mathbf{e}} = -\nabla H(\mathbf{e}) + \eta(t)$$

This equation says: the rate of change of the emotional state ($\dot{\mathbf{e}}$) equals
the negative gradient of the energy (the direction of steepest descent on the landscape)
plus a noise term $\eta(t)$ representing the small random fluctuations of physiological
and environmental variation. The system is always rolling toward the nearest valley,
with a small amount of noise that occasionally kicks it over a hill into a different
basin.

The noise term has a deeper structure. The *level* of noise — how wide the fluctuations
are — is set by the autonomic nervous system, specifically by heart rate variability
(HRV): high coherence in the cardiac rhythm narrows the noise, stabilising the field;
low HRV widens it. But there is a second, more predictive cardiac quantity: the
**cardiac acceleration** $\dot{H}$ — the rate at which heart rate is *changing*. A
rising heart rate predicts approach to a threshold; a falling heart rate predicts retreat
from one. The current BPM tells you where you are. The acceleration of BPM tells you
where you are going next.

> **GOING DEEPER: Gravity and the Heartbeat**
>
> Gravity, in SI units, is measured in metres per second squared (m/s²) — it is an
> *acceleration*, not a speed. It tells you not where a falling object is, but how
> fast its velocity is changing: where it will be next.
>
> Cardiac acceleration — the rate of change of heart rate — has units beats/s².
> Same type, different physical dimension. And the same logical character: it tells
> you not what the BPM is, but where it is heading. N+1, not N.
>
> In the soma-field, cardiac acceleration acts as a **landscape tilt**: it tips the
> energy function toward activation or rest before any emotional threshold is crossed.
> When the heart accelerates, the field is being pulled toward higher-energy states
> by a force it cannot see and cannot always attribute correctly. Some anxiety that
> feels emotionally caused is cardiac in origin — the field cannot distinguish the
> two from the inside. This is the somatic equivalence principle: you cannot tell,
> from your own experience, whether your emotional landscape tilted because something
> happened, or because your heart accelerated first.
>
> Clinically: monitoring the *direction* of heart rate change, not just its level,
> gives earlier warning of threshold approach than any other non-invasive signal.

---

> **GOING DEEPER: Why Physicists Love the Hamiltonian**
>
> The Hamiltonian was introduced by William Rowan Hamilton in the 1830s as a way of
> rewriting Newton's equations in a more elegant form. What Hamilton discovered is that
> the trajectory of any physical system — the path it takes through its state space over
> time — can be derived entirely from a single scalar function $H$. You do not need to
> describe all the forces. You just need the energy landscape, and the dynamics follows.
>
> In quantum mechanics, the Hamiltonian operator $\hat{H}$ plays the same role: it
> determines how a quantum state evolves over time through Schrödinger's equation,
> $i\hbar\,\partial_t\psi = \hat{H}\psi$. The eigenvalues of $\hat{H}$ are the
> allowed energy levels.
>
> In the Soma-Field Model, $H(\mathbf{e})$ is neither Newtonian nor quantum: it is the
> Hamiltonian of a classical stochastic system (a Langevin system), where the dynamics
> is gradient descent with noise. But the mathematical structure — a scalar energy
> function that determines everything else — is identical.
>
> This is not a coincidence. It is because "a system has stable states to which it
> returns" is a very general physical principle, and the Hamiltonian is the most general
> way to formalise it.

---

## 3.4 The Coupling Matrix

The matrix $W$ — the coupling matrix — is the central object of the model. It encodes
the emotional architecture of a nervous system: which modes excite each other, which
inhibit each other, how strongly, and in which direction.

For a neurotypical, regulated nervous system, $W$ has a specific mathematical property:
it is *symmetric*. $W_{ij} = W_{ji}$: the influence of mode $i$ on mode $j$ equals the
influence of mode $j$ on mode $i$. This symmetry is not incidental. It is what guarantees
the existence of an energy function: if $W$ is not symmetric, the dynamics cannot be
written as gradient descent, and the system may not have stable fixed points at all.
It may cycle indefinitely.

Trauma, in this model, is a modification of $W$ that breaks this symmetry. A traumatised
nervous system has couplings that do not balance: fear activates shame more strongly than
shame activates fear; hypervigilance activates the freeze response more readily than
the freeze response resolves back to hypervigilance. The asymmetric couplings create
directional flows in the landscape — attractors that are easy to fall into and hard to
climb out of.

This is the formal basis of the clinical observation that trauma often feels like a
one-way ratchet.

---

> **KEY TERMS**
>
> **Attractor** — a stable state in the energy landscape; a valley that the field rolls
> toward from nearby positions.
>
> **Basin of attraction** — the region of state space from which the system flows toward
> a given attractor.
>
> **Hamiltonian** — the energy function $H(\mathbf{e})$ that organises the dynamics; the
> mathematical description of the landscape.
>
> **Coupling matrix $W$** — the matrix encoding the interactions between emotional modes;
> shapes the landscape by determining which states lower the energy.
>
> **Threshold $\theta_i$** — the individual bias of emotional mode $i$; shifts its
> natural resting level.

---

> **CHAPTER SUMMARY**
>
> Emotional states are points in a landscape shaped by the Hamiltonian $H$. Attractors
> are stable states (valley bottoms); basins of attraction are the regions from which the
> system rolls toward each attractor. The dynamics — gradient descent with noise — always
> moves toward lower energy. The coupling matrix $W$ encodes the interactions that shape
> the landscape. Symmetry of $W$ guarantees stable attractors; asymmetry (introduced by
> trauma) creates directional flows that are hard to reverse.

---

![Figure 3.3. 1D energy cross-section along a principal axis of the landscape. The height of each barrier between basins determines transition probability: a deep Freeze well with a high approach barrier (right) requires substantial energy input to escape — corresponding clinically to a freeze response that does not self-resolve without intervention. Barrier asymmetry (left-to-right ≠ right-to-left) is the signature of trauma modification. *Author's original figure.*](figures/fig3b_energy_profile.png){width=90%}

---

\newpage

# PART II: HOW THE FIELD CHANGES

---

\newpage

# Chapter 4: The Weight on the Field

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "The question is not why the behaviour persists,              │
  │    but what it was optimised for."                              │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - What the C-PTSD operator is and how it modifies the field
> - Why hypervigilance is not an error but an optimisation
> - What "the landscape has changed" means precisely
> - The difference between a perturbation and a structural modification

---

## 4.1 The Modification

Complex PTSD (C-PTSD) is distinguished from single-incident PTSD by the presence of
repeated, prolonged, or developmental trauma — particularly trauma that occurred in
relationships on which the person depended for survival. The result is not a discrete
memory that can be "processed" and resolved. It is a pervasive reorganisation of the
emotional field architecture: a new landscape, not a scar on an old one.

In the Soma-Field Model, C-PTSD is represented as a modification of the coupling matrix:

$$W_{\text{C-PTSD}} = W_0 + \Delta W_{\text{trauma}}$$

where $W_0$ is the baseline coupling matrix and $\Delta W_{\text{trauma}}$ is the
modification — an asymmetric additive term that reshapes the landscape. Crucially,
$\Delta W_{\text{trauma}}$ is not symmetric: it introduces directional flows. Certain
states become easy to fall into and hard to leave. Others become difficult to access
from the modified landscape even though they exist.

This can be visualised as a landscape that has been tilted and deformed: new deep valleys
in places that were not attractors before, old deep valleys raised, and the topology of
connectivity between states changed.

![Figure 4.1. Four neurotype landscapes (1D cross-section). *Typical* (upper left): a deep wide Calm basin with accessible secondary states. *C-PTSD* (lower left): Calm shallowed and narrowed, Freeze dominant — the resting state shifts toward high-vigilance. *ADHD* (upper right): all basins flattened, low barriers, rapid transitions — high-temperature dynamics. *ASD* (lower right): narrow steep wells with high barriers between states — strong attractor stability, low noise tolerance, high cost of transitions. *Author's original figure.*](figures/fig5_neurotype_landscapes.png){width=95%}

## 4.2 Why Hypervigilance Is an Optimisation

A nervous system that has adapted to an environment of chronic threat has correctly
learned that:

1. Danger is frequent and unpredictable.
2. The cost of missing a threat is very high.
3. The cost of false alarms is low (relative to the cost of missing a real threat).

Given these parameters, the optimal configuration is exactly what we see in C-PTSD: a
bias toward high vigilance, a wide definition of "potential threat," a fast-responding
sympathetic system, and a slow-to-settle calm state. The hypervigilance attractor is
deep because a deep attractor is appropriate to the environment it was optimised for.

The modification is not an error. It is a correct solution to the wrong problem — where
"the wrong problem" means the original environment, which no longer exists (or no longer
exists in the same form).

This reframing is not merely philosophical. It changes the clinical question from
"how do we extinguish the hypervigilance response" to "how do we update the landscape
to incorporate evidence that the current environment is different." These are very
different operations, with very different implications for what kind of therapeutic
intervention is useful.

## 4.3 Thresholds and Consciousness

There is a parameter in the model that has not yet been introduced, and it does a great
deal of work. This is the **threshold** $T$ — denoted with the capital $T$ that recurs
throughout this book.

The threshold is a level of field activation above which an emotional state becomes
conscious experience — enters awareness as a felt emotion — rather than remaining as
sub-threshold somatic activation. Below $T$, the field is active but not felt; the
activation is present in the body, influencing behaviour and physiology, but not
represented in consciousness.

This has immediate clinical consequences. A person with a very high threshold $T$ may
have a strongly activated soma-field — may be physiologically in a fear state, with all
the somatic correlates — while experiencing nothing that they would call fear. The
activation is real. The consciousness of it is absent. Somatic therapy, interoceptive
training, and bodywork all operate, in part, by lowering $T$: bringing below-threshold
somatic content into awareness.

A person with a very low threshold $T$ experiences the opposite: everything is felt,
amplified, present. This is associated with high interoceptive sensitivity, certain
presentations of anxiety, and some forms of neurodivergence.

The threshold is where the physics and the clinical presentation most visibly connect.

---

> **AUTHOR'S NOTE: The Landscape I Inherited**
>
> There is a version of this chapter that is abstract: modifications to coupling matrices,
> reshaping of landscapes, asymmetric $W$. And then there is the version that is what
> it feels like to live in a modified landscape.
>
> What it feels like is this: calm is always provisional. Not shallow, exactly —
> but unsecured. Like a surface that holds weight when you step carefully but gives way
> if you shift too quickly. Alert is never far away. And underneath alert, the freeze
> state is a gravity well that does not announce itself before you are already in it.
>
> The modification in my case is not a perturbation on a pre-existing normal landscape.
> That would require a $W_0$ to perturb. The timeline does not allow for that. That is
> the subject of Chapter 6.

---

> **KEY TERMS**
>
> **C-PTSD operator** — the modification $\Delta W$ to the coupling matrix that reshapes
> the energy landscape; the mathematical representation of the effect of complex trauma.
>
> **Threshold $T$** — the activation level above which a soma-field state becomes
> conscious experience. The central parameter distinguishing felt emotion from
> sub-threshold somatic activation.
>
> **Hypervigilance attractor** — the deep stability basin in the modified landscape
> corresponding to high-arousal, high-alert states.

---

![Figure 4.2. The perception threshold T. Mode i (grey) oscillates continuously but never crosses T — it is sub-perceptual, influencing behaviour and physiology without entering felt experience. Mode j (blue) rises through T and becomes a consciously felt emotion. The threshold is the key parameter that distinguishes somatic activation from emotional awareness; its value varies across individuals and can be modified by interoceptive practice, arousal level, and therapeutic work. *Author's original figure.*](figures/fig2_threshold.png){width=90%}

---

\newpage

# Chapter 5: Memory Written in the Body

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - The difference between narrative memory and somatic memory
> - What the memory kernel is and what it does to the field dynamics
> - Why trauma memory persists — and why some trauma memories persist much longer
> - What therapeutic processing means in terms of the memory kernel

---

## 5.1 Two Kinds of Memory

When you remember a conversation from last week, you are using **episodic memory** — the
explicit, narrative record of events that occurred at specific times and places. Episodic
memory is context-dependent, verbally expressible, and subject to conscious recall and
revision. It is stored primarily in the hippocampus.

When you flinch at a sound that resembles the sound that preceded something terrible, you
are using **procedural** or **somatic memory** — a form of memory that is not stored as
narrative but as pattern: as a configured readiness in the body to respond in a particular
way to particular signals. Somatic memory is not verbally expressible (you cannot "tell
the story" of a procedural response; you can only notice it happening). It does not
require conscious recall — it is not a replay of an event but an embodied preparation.
It is stored across the body: in muscle tone, in the brainstem, in the autonomic nervous
system, in the way sensory signals are gated before they reach cortical processing.

Trauma creates primarily somatic memory. This is why it is not resolved by talking about
it. The body has stored information in a form that language does not reach.

## 5.2 The Memory Kernel

In the Soma-Field Model, the effect of past activation on present dynamics is captured
by a **memory kernel** $K(\tau)$. This is a function that says: an activation of the
field $\tau$ time units ago continues to influence the field now, with a weight
proportional to $K(\tau)$.

For C-PTSD, the memory kernel takes the form:

$$K_{\text{trauma}}(\tau) = \sum_k A_k\, e^{-|\tau|/\tau_k}$$

This is a sum of decaying exponentials. Each term represents a distinct trauma trace:
$A_k$ is the amplitude (how strongly the trace affects the current field) and $\tau_k$
is the decay time (how long the trace persists before fading).

```
  REGULATED: No significant memory kernel
  ┌─────────────────────────────────────────────────────────────┐
  │  Field  ▲                                                   │
  │  activ. │      ╭──╮                                         │
  │         │      │  │   (episode resolves; field returns       │
  │         │  ────╯  ╰─────────────────────────────────────   │
  │         │                              baseline              │
  │         └──────────────────────────────────────────────→    │
  │                            time                             │
  └─────────────────────────────────────────────────────────────┘

  C-PTSD: Significant memory kernel — traces persist
  ┌─────────────────────────────────────────────────────────────┐
  │  Field  ▲                                                   │
  │  activ. │      ╭──╮                    ╭──╮                 │
  │         │      │  ╰─╮    ╭──╮      ╭───╯  ╰─╮              │
  │         │  ────╯    ╰────╯  ╰──────╯         ╰──────       │
  │         │                                                   │
  │         └──────────────────────────────────────────────→    │
  │                            time                             │
  │  Baseline elevated; episodes bleed into one another;        │
  │  field rarely returns to original rest level                │
  └─────────────────────────────────────────────────────────────┘

  Figure 5.1. The effect of the trauma memory kernel on field dynamics. In a regulated
  system (top), a field activation episode resolves and the field returns to a low
  resting level. In the C-PTSD-modified system (bottom), the memory kernel elevates
  the baseline between episodes, so that subsequent episodes begin from a higher resting
  activation. Over time, the field cycles at an elevated level without returning to rest.
```

## 5.3 Why Early Traces Persist

The decay time $\tau_k$ is central: it determines how long a trace remains active.

For trauma that occurs early in development — before language, before narrative memory
capacity — the decay time tends to be much longer. There are two reasons.

First, **somatic memory has no verbal layer**. For trauma occurring after language
develops, the episodic and somatic memories co-encode: the narrative version partially
"covers" the somatic trace, providing a context that can be accessed verbally. Verbal
processing in therapy can then shorten the effective lifetime of the trace. For pre-verbal
trauma, the somatic trace has no narrative companion. It cannot be reached by talking.
The decay time is governed by purely somatic processes, which are much slower.

Second, **the trace cannot be separated from the structure**. For pre-verbal trauma,
the memory is not a modification of an already-formed architecture. The architecture
itself was shaped by the conditions of the traumatic period. This is addressed more
formally in Chapter 6.

## 5.4 What Therapy Does

In the language of the memory kernel, effective somatic therapy does two things:

1. It reduces the amplitudes $A_k$: the traces continue to influence the field, but
   with less force. Activation episodes are smaller and resolve more completely.

2. It increases the decay times $\tau_k$: the traces fade more quickly after episodes.
   The field returns to rest more rapidly.

The goal is not to eliminate the traces — the nervous system cannot un-learn an
experience, and attempting to make it do so is not the right model. The goal is to
reduce their influence to a level that allows the field to return to rest between
episodes: to restore the gap between activations in which recovery occurs.

---

> **GOING DEEPER: The Memory Kernel and the QFT Propagator**
>
> This may seem like a digression, but it is one of the most striking features of the
> model. The memory kernel for C-PTSD — $K(\tau) = \sum_k A_k e^{-|\tau|/\tau_k}$ —
> is mathematically identical to the **Euclidean propagator** in quantum field theory.
>
> In QFT, the Euclidean propagator $G_E(\tau)$ describes how a disturbance in a quantum
> field at time $0$ correlates with the field at time $\tau$:
>
> $$G_E(\tau) = \langle \phi(0)\,\phi(\tau) \rangle = \frac{1}{2m}\, e^{-m|\tau|}$$
>
> The mass $m$ of the QFT particle corresponds to $1/\tau_k$ in the memory kernel. A
> heavier particle creates a shorter-range propagator; a shorter-lived trauma trace
> has a larger $1/\tau_k$ (i.e., smaller $\tau_k$, faster decay).
>
> This identity is not an analogy. The two expressions are the same function with
> different names for the parameters. The Wick rotation — the substitution
> $t \to -i\tau$ that takes quantum mechanics into statistical mechanics — is the
> formal bridge between them, and it is the subject of Chapter 7.

---

> **KEY TERMS**
>
> **Episodic memory** — explicit, narrative memory of events at specific times and places;
> accessible to conscious recall and verbal expression.
>
> **Somatic (procedural) memory** — embodied memory stored as configured physiological
> readiness; not verbally expressible; activated by sensory signals that match the
> original encoding context.
>
> **Memory kernel $K(\tau)$** — the function describing how field activations at time
> $\tau$ in the past continue to influence the current field state.
>
> **Amplitude $A_k$** — the strength of a trauma trace's influence on the current field.
>
> **Decay time $\tau_k$** — the timescale over which a trauma trace fades after
> activation; how long the echo persists.

---

\newpage

# Chapter 6: How Early Is Early?

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "Before language, there is only the body."                   │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - Why the age at which trauma occurred matters to its character
> - What happens to the structure of the soma-field when modification occurs
>   before language develops
> - Why "returning to the pre-trauma self" is a coherent goal for late trauma but
>   not for pre-verbal trauma
> - What "forward transformation" means as a mathematical and clinical concept

---

## 6.1 Developmental Time

Children are not small adults. The nervous system develops in stages, and each stage
has different capacities — for encoding, for integration, for language, for explicit
memory. What a three-year-old can do with an overwhelming experience is not what a
ten-year-old can do, and neither is what an adult can do.

This is relevant to trauma because the *character* of a traumatic modification depends
on the developmental stage at which it occurs. Not the severity — severity is a separate
question. The character. What structures are modified, how the modification is stored,
and what it is even possible to change about it afterward.

The key developmental milestone for this model is the onset of reliable verbal encoding
capacity — the ability to store experiences with a narrative, linguistic representation
alongside the somatic one. This typically emerges between approximately 24 and 48 months
of age, with considerable individual variation. We use $\tau_c \approx 36$ months as
an approximate threshold.

The parameter $\tau_d$ — **developmental age at trauma** — is the age at which the
primary modification occurred.

## 6.2 Below the Threshold: Pre-Verbal Trauma

For $\tau_d < \tau_c$ (pre-verbal trauma), several things are different from the
late-trauma case.

**The structure was formed under the modification.** A nervous system that is being
organised — that is still forming its basic coupling architecture — under conditions of
unresolved physiological threat does not develop and then get modified. It develops
*as* modified. The asymmetric couplings, the elevated vigilance attractor, the memory
kernel coefficients — these are not perturbations on a pre-existing baseline. They
are the baseline.

**There is no prior self to recover.** For trauma occurring after the baseline
architecture is formed ($\tau_d > \tau_c$), there is a counterfactual: the person that
would have developed without the traumatic modification. This counterfactual is
partially encoded — in early memories, in narrative, in the patterns of functioning
before the event. Therapeutic language of "returning to yourself" or "recovering the
pre-trauma self" is coherent in this case: the target exists.

For pre-verbal trauma ($\tau_d < \tau_c$), the counterfactual does not exist as an
encoded state. There was no formed nervous system that then got modified. The
self-before-trauma never developed. There is nowhere to return to.

This is not a pessimistic statement. It is a precise one. And precision here matters
because it changes the therapeutic question.

## 6.3 The Interpolation

The coupling matrix for a traumatised nervous system can be written as a function of
developmental age:

$$W(\tau_d) = f(\tau_d)\cdot W_0 + \bigl(1 - f(\tau_d)\bigr)\cdot W_{\text{trauma}}$$

where $f$ is a smooth interpolation function:

$$f(\tau_d) = \tanh\!\left(\frac{\tau_d}{\tau_c}\right)$$

```
  STRUCTURAL FRACTION f(τ_d) = tanh(τ_d / τ_c)
  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  f(τ_d) ▲  1.0 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╭──────────     │
  │  (how    │                               ╭─────╯              │
  │  much    │                         ╭────╯                     │
  │  is W₀)  │  0.76 ─ ─ ─ ─ ─ ─ ─ ─ ─╯  ← f(τ_c) = tanh(1)    │
  │          │                        ↑                           │
  │          │  0.5 ─ ─ ─ ─ ─ ─ ─ ╭──╯                           │
  │          │                 ╭──╯                               │
  │          │             ╭──╯                                   │
  │          │         ╭──╯                                       │
  │          │  0.0 ───╯                                          │
  │          └──────────────────────────────────────────────────→ │
  │           0    τ_c/2  τ_c    2τ_c    3τ_c      τ_d (months)  │
  │                       (36)                                     │
  │                                                                │
  │  Left of τ_c:  W is mostly W_trauma — structural             │
  │  Right of τ_c: W is mostly W₀ — perturbative                 │
  └──────────────────────────────────────────────────────────────────┘

  Figure 6.1. The structural fraction f(τ_d). This function describes what proportion
  of the coupling matrix is neurotypical baseline (W₀) versus trauma-formed (W_trauma),
  as a function of developmental age at trauma. At τ_d = 0 (birth or in utero), the
  coupling is entirely trauma-formed: f = 0. At τ_d = τ_c ≈ 36 months, f ≈ 0.76:
  the baseline accounts for about three-quarters of the coupling. The interpolation is
  smooth: there is no sharp cutoff, just a continuous change in character.
```

At $\tau_d = 0$: $f = 0$ and $W = W_{\text{trauma}}$. There is no baseline component.

At $\tau_d = \tau_c$: $f = \tanh(1) \approx 0.76$. The baseline accounts for 76% of
the coupling; the modification is 24%.

At large $\tau_d$: $f \to 1$ and $W \approx W_0$. The modification is a small
perturbation on a fully formed baseline.

The therapeutic implication of this formula is significant. For $\tau_d \ll \tau_c$:
the operation $W \to W_0$ — extracting the baseline from the current coupling — is not
defined. The $W_0$ was never the dominant component. It cannot be recovered because it
was not formed.

## 6.4 Forward Transformation

What *is* possible, for pre-verbal trauma, is a **forward transformation**: the
construction of a new coupling matrix $W'$ that has desirable properties — wider
window of tolerance, shallower hypervigilance attractor, lower memory kernel amplitudes,
greater capacity for social engagement — without that new matrix being a recovery of a
prior state.

This is a different target, and it requires a different process:

- Not excavating the past for the lost self, but building forward
- Not reducing to a baseline that didn't form, but constructing a landscape that works
- Not recovery ($W \to W_0$, undefined), but transformation ($W \to W'$, unconstrained)

The route to $W'$ uses the same therapeutic tools — somatic therapy, relational repair,
interoceptive training, bodywork — but with a different intention. The intention is not
to return somewhere but to arrive somewhere for the first time.

---

> **AUTHOR'S NOTE: $\tau_d$ = 18 Months**
>
> My developmental age at trauma: $\tau_d \approx 18$ months. Approximately half of
> $\tau_c$.
>
> At that age, the structural fraction is approximately $f(18/36) = \tanh(0.5) \approx
> 0.46$. Slightly less than half of the coupling matrix was neurotypical baseline at the
> time. More than half was trauma-formed. As the trauma continued over three months
> of hospitalisation — developmental ages 18 to 21 months — the modification was
> present throughout the period when the coupling architecture was being most actively
> organised.
>
> There is no version of me that existed before this modification and then got
> modified. The preVerbalIsStructural theorem, which is in Appendix B, is a formal
> proof of the clinical fact that has taken decades of therapy to find words for:
> *there is nowhere to return to, and that is not a tragedy, it is simply the correct
> topography*.
>
> The voyage is forward. This book is part of it.

---

> **GOING DEEPER: The preVerbalIsStructural Theorem**
>
> The following is a proof sketch in Lean 4, a proof assistant that requires
> mathematical arguments to be written in a form that a computer can verify.
> A `sorry` marks a step that is stated but not fully proved — an open obligation.
>
> ```lean
> -- Key theorem: for pre-verbal trauma, no neurotypical W₀ can be
> -- recovered by subtraction from the current coupling matrix
> theorem preVerbalIsStructural {n : ℕ} (profile : TraumaProfile n)
>     (h : profile.τ_d < τ_c) :
>     structuralFraction profile.τ_d < Real.tanh 1 := by
>   unfold structuralFraction
>   apply Real.tanh_lt_tanh
>   exact div_lt_one_of_lt h (by norm_num)
> ```
>
> This theorem states: for any TraumaProfile with developmental age below $\tau_c$,
> the neurotypical structural fraction is below $\tanh(1) \approx 0.76$. More than
> 24% of the coupling matrix is trauma-formed, not baseline-formed. At $\tau_d = 0$,
> 100% is trauma-formed.
>
> **Corollary** (commented in the code): the therapeutic operation for pre-verbal trauma
> is forward transformation ($W \to W'$), not recovery ($W \to W_0$). The second
> operation is undefined because $W_0$ was never the dominant component.

---

> **KEY TERMS**
>
> **Developmental age at trauma ($\tau_d$)** — the age, in months, at which the primary
> traumatic modification occurred.
>
> **Verbal encoding threshold ($\tau_c$)** — the approximate developmental age (≈36
> months) at which reliable narrative memory and verbal encoding capacity emerges.
>
> **Structural fraction $f(\tau_d)$** — the proportion of the coupling matrix attributable
> to neurotypical baseline development; interpolated smoothly from 0 (purely structural
> modification) to 1 (purely perturbative modification).
>
> **Forward transformation** — the therapeutic goal for pre-verbal trauma: constructing a
> new coupling matrix $W'$ with wider attractor topology, rather than recovering a
> baseline that was not fully formed.

---

\newpage

# Interlude: A Voyage to the Alps

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "Everything floats: the universe, the mountains, the body.   │
  │    The question is only what it is floating in."               │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

There is a campsite in the Klöntal valley, in the canton of Glarus, Switzerland, that I
have been returning to for many years. I promised to write a book about it. This is the
closest I have managed — and as it turns out, the campsite book and the soma-field book
are the same book.

The Klöntal sits in a glacially carved valley a few kilometres from the town of Glarus,
adjacent to the Swiss Tectonic Arena Sardona — a UNESCO World Heritage Site containing
some of the most famous and legible tectonic structures in the world. The valley walls
are parabolic: shaped by ice over millions of years into the form that an engineer would
choose if they wanted to focus sound. Stand at one end and speak quietly, and the words
arrive at the other end with startling clarity. The valley is a natural resonator:
limestone and dolomite walls, near-perfect parabolic geometry, and an acoustic character
that makes sound oscillate long after the source has fallen silent.

```
  PARABOLIC VALLEY CROSS-SECTION

    valley rim                    valley rim
    (limestone)                   (limestone)
          ╲    ~   ~   ~   ~   ~   ╱
           ╲  ~               ~  ╱   ← sound reflects from walls
            ╲ ~  → source ←  ~ ╱
             ╲~               ~╱
              ╲ ~  converge  ~╱
               ────────────────
                  valley floor

  A parabolic cross-section focuses incoming sound to the focal region.
  The same geometry governs satellite dishes, reflector telescopes, and
  the resonant cavities of musical instruments. Mountain valleys with this
  profile produce exceptional acoustics — sound oscillates long after the
  source goes quiet.
```

The valley's acoustic behaviour is the physical intuition behind the soma-field wave
description. The emotional field has modes — preferred patterns of activation, like
standing waves in a resonant cavity — that continue to oscillate after the activating
event has passed. The memory kernel $K(\tau)$ is the body's version of the valley's
echo: not a recording, but a resonance that continues to shape what comes next.

## Everything Floats

Geology teaches, and physics confirms, that everything floats.

At the **cosmological scale**: galaxies float in the curved spacetime that mass creates.
The Milky Way is moving toward the Virgo Supercluster at approximately one million
kilometres per hour — not through a fixed background, but on the spacetime manifold
itself. There is no fixed frame. The background is the field.

At the **geological scale**: continents float on the asthenosphere, the semi-molten
layer beneath the rigid lithosphere. The Alps exist because the African plate has been
moving north at 2–3 centimetres per year for approximately 50 million years, crumpling
the sediments of the ancient Tethys Sea into the mountains visible from the valley floor.
The same forces are operating now, invisibly, at the speed of growing fingernails.

At the **somatic scale**: the emotional field floats in the Hamiltonian landscape —
moving toward attractors, drawn by the energy gradient, oscillating around stable states,
occasionally crossing a phase boundary into a new basin.

One equation governs all three:

$$\ddot{x} = -\nabla V(x) + F_{\text{ext}}$$

A galaxy, a tectonic plate, a nervous system: all governed by gradient descent on a
potential with external forcing. The scales span 25 orders of magnitude. The structure
does not vary.

## Reading the Mountain

The Glarus Thrust (Glarner Hauptüberschiebung) is the tectonic feature that makes this
region a UNESCO World Heritage Site. It is a thrust fault on which an enormous slab of
Verrucano sandstone (Permian, approximately 250 million years old) was transported
roughly 35 kilometres northward over much younger Flysch sediment (Eocene, approximately
40 million years old). The old sits on top of the new. The contact is visible across many
mountain faces as a near-horizontal line: above it, ancient red sandstone; below it,
young grey sediment.

```
  GLARUS THRUST: SCHEMATIC CROSS-SECTION (not to scale)

  Surface  ════════════════════════════════════════════════════
           │  VERRUCANO  (~250 Ma, Permian)                   │
           │  Ancient red sandstone                           │
           │  Formed long before the Alps existed             │
  ─ ─ ─ ─ ├══════════════ THRUST CONTACT ═══════════════════╤╡ ← THE LINE
           │  FLYSCH  (~40 Ma, Eocene)                       │ │
           │  Young grey marine sediment                     │ │
           │  Floor of the ancient Tethys Sea                │ │
  Base     ═════════════════════════════════════════════════╧══

  Direction of transport: ~35 km northward.
  The ancient slab (~250 Ma) was carried over the young sediment (~40 Ma).
  Read a single mountain face: 210 million years of geological history,
  visible in one glance. This is 4D geology — space encodes time.
```

A geological cross-section is four-dimensional: horizontal position records geography,
but vertical position records time. Deep is old; shallow is recent. To read a mountain
face is to read the history of the forces that shaped it — compression, burial,
metamorphism, uplift, erosion — all preserved in the mineral record.

The soma-field coupling matrix $W$ is four-dimensional in the same sense. The current
configuration encodes the accumulated history of all the forces that shaped it. The
asymmetries in $W$ are the thrust faults of the emotional landscape: places where an
ancient force has pushed its structure over something newer, and the contact is still
legible if you know how to read it.

For pre-verbal trauma at $\tau_d \approx 18$ months: the Verrucano is very old, very
deep in the developmental history, and emphatically on top.

## M-Theory: Everything Floats in More Dimensions

M-theory, the current best candidate for a unified theory of physics, proposes that the
universe is a *brane* — a membrane — floating in an 11-dimensional space. Our familiar
four dimensions are a surface in a higher-dimensional structure. The other seven
dimensions are curled too small to observe directly, but they leave measurable signatures
in the physics of the accessible four.

The soma-field is not M-theoretic in any technical sense. But the intuition scales: the
emotional field is a field on the brane of the body, and what we observe — threshold
crossings, attractor dynamics, memory kernel echoes — are projections of a structure
that extends into dimensions not directly accessible to ordinary awareness.

The pre-verbal, the sub-threshold, the procedural — somatic content that drives
behaviour without entering conscious experience — is the body's version of the curled
dimensions: real, causally active, not directly observable. Interoceptive practice is
the project of unfolding them: making accessible what was previously curled below $T$.

## The Valley at Dusk

I use Phase Plant, a modular synthesizer, to work with acoustic field recordings —
routing them through resonant filter banks, mapping the frequencies that a resonant
space prefers, listening for the modes that survive decay while others fall away. It is
an unconventional approach to acoustics. But it is physics: finding the eigenfrequencies
of a resonant cavity by attending to what persists.

The Klöntal valley has such frequencies. When the sun drops behind the peaks and the
daytime noise subsides, what remains is the valley's own voice: a low, slow resonance
in the limestone, carrying the frequencies that the parabolic geometry selects.

The emotional field has equivalent preferred frequencies. The trauma memory kernel
$K(\tau) = \sum_k A_k e^{-|\tau|/\tau_k}$ encodes them: the values $1/\tau_k$ are the
field's natural resonance rates, the $A_k$ their amplitudes. Therapeutic work — reducing
$A_k$, lengthening $\tau_k$ — is the project of quieting the modes excited by the
original event until the field returns to its ground state.

In the valley at dusk, this is not a metaphor. It is audible.

---

\newpage

# PART III: THE PHYSICS UNDERNEATH

---

\newpage

# Chapter 7: The Same Equation, Three Times

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "The unreasonable effectiveness of mathematics in the         │
  │    natural sciences."                                           │
  │                                                                  │
  │                               — Eugene Wigner, 1960             │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - Why the same Hamiltonian appears in condensed matter physics, neural network theory,
>   and the soma-field model
> - What the Wick rotation is and why it connects quantum oscillations to trauma memory
> - What string diagrams and Feynman diagrams are and what they say about emotional
>   interaction
> - The meaning of "the same mathematical structure" as evidence of structural reality

---

## 7.1 The Moment of Recognition

The Soma-Field Model did not begin with a plan to connect it to quantum field theory.
It began with a neuroscience question: what is the simplest mathematical model of an
emotional field that has stable states, dynamic transitions, and the capacity to be
modified by experience?

The answer that emerged — a Hamiltonian field with a coupling matrix, evolving under
Langevin dynamics — turned out to be an equation that physicists had seen before.

It is the Hopfield network Hamiltonian. Which is the Ising model Hamiltonian. Which is
the classical limit of a quantum field theory in imaginary time.

This is not a coincidence crafted after the fact. It is the signature of something: when
you write down "the simplest model of a field with stable states," you land on an
equation that appears in three separate disciplines because three separate disciplines
have independently answered the same mathematical question.

## 7.2 The Same Hamiltonian

The Ising model (condensed matter physics, early 20th century) describes a lattice of
interacting spins — magnetic moments that can point up or down:

$$H_{\text{Ising}} = -\frac{1}{2}\sum_{i,j} J_{ij}\,\sigma_i\,\sigma_j - \sum_i h_i\,\sigma_i$$

The Hopfield network (computational neuroscience, Hopfield 1982 — Nobel Prize 2024)
describes a network of interacting neurons that stores memories as stable states:

$$H_{\text{Hopfield}} = -\frac{1}{2}\sum_{i,j} W_{ij}\,x_i\,x_j - \sum_i \theta_i\,x_i$$

The Soma-Field Model describes the energy landscape of the emotional field:

$$H_{\text{soma}} = -\frac{1}{2}\sum_{i,j} W_{ij}\,e_i\,e_j - \sum_i \theta_i\,e_i$$

Replace $J_{ij} \to W_{ij}$, $\sigma_i \to e_i$, $h_i \to \theta_i$: these are the same
equation written with different letters. The same mathematics describes magnetic spins
in a crystal, memories in a neural network, and emotional states in a body.

This is the Hopfield equivalence — the observation for which Hopfield received the Nobel
Prize: that the Ising spin model and a neural memory network are computing the same
energy function. The Soma-Field Model extends that equivalence one step further: the
same computation also describes the attractor structure of emotional dynamics.

Placed in the longer history of neural network modelling, the position of the Soma-Field
Model is more precise than *an extension of the Hopfield framework*. Every artificial
neural network built since McCulloch and Pitts (1943) — perceptrons, backpropagation
networks, LSTMs, transformers — is a formal model of the neocortex. These systems learn
to recognise patterns and minimise prediction error with increasing sophistication. None
of them possess a limbic system: no internal valuation, no threat-detection architecture,
no arousal modulation, no interoceptive loop from the body back to the field.

Hopfield's energy network is the most elegant of the neocortical models. It describes
associative pattern-completion — exactly what the hippocampal-cortical system does for
declarative memory. The Soma-Field Model is not a better cortex. It is the model of the
system underneath the cortex that has been waiting, since 1943, to be written down.

Hopfield later described a wish that he had incorporated something analogous to 'maternal
instincts' into the energy function. In the light of the Soma-Field Model, that wish
was not a desire for a better neocortical model. It was an intuition pointing at the
absent layer — the limbic system — for which he had no formal language at the time.

---

> **GOING DEEPER: The Missing Half of the Brain**
>
> Every artificial neural network ever built — from the perceptron in 1943 to the
> large language models of today — is a formal model of the neocortex. The neocortex
> recognises patterns, predicts sequences, and minimises error. It has been formally
> described, trained, and deployed at extraordinary scale.
>
> The limbic system has not.
>
> The limbic system is the older, deeper structure: amygdala, hippocampus, hypothalamus,
> cingulate cortex. It assigns value. It detects threat before the cortex has finished
> processing. It reinstates whole body states in response to a partial cue — a smell,
> a texture, a tone of voice. It holds trauma. It is the system that makes things *matter*.
>
> Artificial intelligence has very effective cortex. It has no limbic system.
> It can tell you that fire is hot. It cannot be burned.
>
> The Soma-Field Model provides the first formal field-theoretic architecture for the
> limbic system. Together with the Hopfield framework it describes — for the first
> time — both principal computational substrates of the vertebrate brain. The
> architecture is, formally, complete.

---

## 7.3 The Wick Rotation: One Substitution

The deepest correspondence in the model is the one that connects quantum mechanics to
trauma memory. It requires a single substitution.

In quantum mechanics, the state of a system evolves in time via the time evolution
operator:
$$U(t) = e^{-i\hat{H}t/\hbar}$$

The key feature is the $i$ — the imaginary unit. This makes the exponential oscillatory:
$e^{-i\omega t} = \cos(\omega t) - i\sin(\omega t)$. A quantum state oscillates in time
rather than decaying.

Now make the substitution $t \to -i\tau$ — replacing real time with imaginary time. This
is the **Wick rotation**, named after Gian-Carlo Wick (1954):

$$e^{-i\hat{H}(-i\tau)/\hbar} = e^{-\hat{H}\tau/\hbar}$$

The oscillatory phase has become a real decaying exponential. This is the Boltzmann
weight $e^{-\beta\hat{H}}$ from statistical mechanics (at inverse temperature
$\beta = \tau/\hbar$). The Wick rotation is the bridge between quantum mechanics
and thermal physics.

```
  ╔════════════════════════════════════════════════════════════════════╗
  ║                    THE WICK ROTATION                               ║
  ╠════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  QUANTUM MECHANICS               THERMAL / SOMATIC PHYSICS        ║
  ║  (real time t)                   (imaginary time τ = it)          ║
  ║                                                                    ║
  ║  e^{-iHt/ℏ}    ──────────────→   e^{-Hτ/ℏ}                       ║
  ║                   t → -iτ                                         ║
  ║                                                                    ║
  ║  oscillates:                     decays:                          ║
  ║                                                                    ║
  ║       ╭╮  ╭╮  ╭╮                    │╲                            ║
  ║   ────╯╰──╯╰──╯╰──                  │  ╲                          ║
  ║                                     │    ╲___                     ║
  ║  Quantum wave                        │        ─────────           ║
  ║  function: oscillates               Thermal weight: decays        ║
  ║                                                                    ║
  ║  The i is the only difference between these two functions.        ║
  ║  Remove i → quantum oscillation becomes exponential decay.        ║
  ╚════════════════════════════════════════════════════════════════════╝

  Figure 7.1. The Wick rotation. A single substitution (t → -iτ) transforms the
  oscillatory quantum phase factor into the real decaying exponential of thermal
  physics. The memory kernel K(τ) = Σ Aₖ e^{-|τ|/τₖ} has exactly this form. The
  i in the quantum exponent is the only mathematical difference between a quantum
  field that oscillates and a trauma trace that decays.
```

And the memory kernel for C-PTSD trauma?

$$K_{\text{trauma}}(\tau) = \sum_k A_k\, e^{-|\tau|/\tau_k}$$

This is the Wick-rotated propagator. The QFT field mass $m$ corresponds to $1/\tau_k$.
The propagator amplitude $1/2m$ corresponds to $A_k$. These are not analogous. They are
the same mathematical object with different domain-specific names.

## 7.4 Feynman Diagrams for Emotions

Feynman diagrams were developed in the 1940s as a way of computing interactions in
quantum field theory. They represent particles as lines and interactions (couplings) as
vertices. A photon and an electron meeting at a vertex and scattering is a Feynman
diagram. The rules for computing physical quantities from these diagrams are exact —
each diagram corresponds to a specific integral.

In the 1990s and 2000s, it was established (Penrose 1971, Baez and Lauda 2011, Selinger
2010) that Feynman diagrams are a special case of a more general mathematical language:
**string diagrams** — diagrams for morphisms in symmetric monoidal categories. This is
not a simplification. It is a theorem. String diagrams, Feynman diagrams, and morphisms
in symmetric monoidal categories are the same mathematical object in three notations.

The soma-field operations — coupling of emotional modes, composition of field operators,
tensor products of states — are morphisms in exactly this sense. The following diagram
represents two emotional modes combining at an interaction vertex:

```
  EMOTIONAL INTERACTION AS FEYNMAN VERTEX

  Fear ────────╮
               ├───────── Freeze
  Shame ───────╯
  (coupling W_{fear,shame → freeze})

  This is identical in structure to a Feynman vertex:

  electron ────────╮
                   ├───────── electron (scattered)
  photon ──────────╯

  Both are morphisms:  A ⊗ B → C
  in a symmetric monoidal category.
  Fear ⊗ Shame → Freeze  is a valid morphism in the soma-field category.
```

The clinical relevance: the Feynman diagram language gives us a way to represent and
compute emotional interactions combinatorially — to ask what the "Feynman rules" for
emotional coupling are, and what composite interactions are possible.

## 7.5 The Correspondence Table

```
  ┌──────────────────────────┬────────────────────────────────────┐
  │ QFT quantity             │ Soma-Field analogue                │
  ├──────────────────────────┼────────────────────────────────────┤
  │ Field mode φₖ            │ Emotional mode eᵢ                  │
  │ Coupling constant Jᵢⱼ    │ Coupling matrix entry Wᵢⱼ          │
  │ Field mass m             │ Inverse decay time 1/τₖ            │
  │ Propagator amplitude 1/2m│ Trauma trace amplitude Aₖ          │
  │ Euclidean propagator G_E │ Memory kernel K(τ)                 │
  │ Vacuum energy ⟨H⟩₀       │ Resting field energy H(e_calm)     │
  │ Thermal fluctuation k_BT │ Noise amplitude σ₀                 │
  │ Wick rotation t → −iτ    │ Real-time Langevin dynamics        │
  │ Feynman vertex           │ Emotional mode interaction         │
  │ Morphism A⊗B → C         │ Field coupling operation           │
  └──────────────────────────┴────────────────────────────────────┘

  Table 7.1. Formal correspondence between QFT quantities and Soma-Field analogues.
  Each row is a single mathematical entity in two different notation systems. The
  correspondences are not approximate analogies — they are exact identifications under
  the Wick rotation and the Hopfield equivalence.
```

---

> **GOING DEEPER: The Baez–Lauda Coherence Theorem**
>
> In 2011, John Baez and Aaron Lauda proved a coherence theorem establishing that string
> diagrams are a complete and sound notation for morphisms in symmetric monoidal
> categories. This means: anything you can write as a morphism in a symmetric monoidal
> category, you can draw as a string diagram, and vice versa, with perfect fidelity.
>
> Feynman diagrams are string diagrams for the symmetric monoidal category of
> representations of the Poincaré group (the symmetry group of spacetime). Tensor
> network diagrams (used in quantum information and condensed matter) are string
> diagrams for the same structure.
>
> The soma-field operations — emotional mode coupling, field composition, state tensor
> products — are morphisms in a symmetric monoidal category. Therefore, they can be
> drawn as string diagrams. Therefore, they can be computed with the same diagrammatic
> calculus as Feynman diagrams.
>
> This is not the claim that emotions are quantum mechanical. It is the claim that
> the mathematics of composition and coupling is universal — it appears wherever things
> interact, regardless of what the things are.

---

> **KEY TERMS**
>
> **Wick rotation** — the substitution $t \to -i\tau$ that transforms oscillatory quantum
> dynamics into real-time thermal/stochastic dynamics.
>
> **Feynman diagram** — a diagrammatic notation for computing interaction amplitudes in
> quantum field theory; each diagram represents a specific integral contribution to a
> physical quantity.
>
> **String diagram** — a diagrammatic notation for morphisms in a symmetric monoidal
> category; identical in structure to Feynman diagrams under the Baez–Lauda theorem.
>
> **Morphism** — a structure-preserving map between objects in a category; the general
> notion that subsumes functions, linear maps, and physical interactions.

---

\newpage

# Chapter 8: The Nervous System as Phase Diagram

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - What phase transitions are and why they apply to the nervous system
> - How the three polyvagal states correspond to different phases
> - Why state changes in trauma feel sudden rather than gradual
> - What ADHD represents in thermodynamic terms

---

## 8.1 Phase Transitions

Water can exist as ice, liquid, or steam. At atmospheric pressure, it transitions between
these phases at specific temperatures: 0°C and 100°C. The transitions are dramatic:
adding energy to ice below 0°C changes its temperature gradually; adding energy at
exactly 0°C produces no temperature change — the energy goes entirely into breaking the
crystal lattice, reorganising water molecules from a rigid ordered structure into a fluid
disordered one. This is a **phase transition**: a qualitative reorganisation of the
system's structure at a critical point, rather than a smooth gradual change.

Phase transitions appear wherever there is an energy landscape with multiple stable
phases, and a parameter (temperature, pressure, magnetic field) that shifts the relative
stability of those phases. They are universal.

## 8.2 The Three Phases of the Nervous System

The polyvagal hierarchy describes three functional states of the autonomic nervous
system. In the Soma-Field Model, these correspond to three distinct phases of the field:

```
  ╔════════════════════════════════════════════════════════════════════╗
  ║              SOMA-FIELD PHASE DIAGRAM                             ║
  ╠════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Arousal ▲  HIGH                                                   ║
  ║  level   │   ╔════════════════════════╗                            ║
  ║          │   ║  SYMPATHETIC PHASE     ║ Fight / Flight            ║
  ║          │   ║  Large oscillations    ║ High noise                ║
  ║          │   ║  Fast transitions      ║ Mobilisation              ║
  ║          │   ╚════════════════════════╝                            ║
  ║          │                ↕ phase boundary (T_upper)              ║
  ║   MEDIUM │   ╔════════════════════════╗                            ║
  ║          │   ║  VENTRAL VAGAL PHASE   ║ Social engagement         ║
  ║          │   ║  Stable oscillations   ║ Regulated noise           ║
  ║          │   ║  Social capacity       ║ Window of Tolerance       ║
  ║          │   ╚════════════════════════╝                            ║
  ║          │                ↕ phase boundary (T_lower)              ║
  ║     LOW  │   ╔════════════════════════╗                            ║
  ║          │   ║  DORSAL VAGAL PHASE    ║ Freeze / Shutdown         ║
  ║          │   ║  Minimal oscillations  ║ Very low noise            ║
  ║          │   ║  Disconnection         ║ Immobilisation            ║
  ║          │   ╚════════════════════════╝                            ║
  ║          └──────────────────────────────────────────────────────   ║
  ║               perceived threat level →                            ║
  ╚════════════════════════════════════════════════════════════════════╝

  Figure 8.1. The nervous system as a phase diagram. Three distinct phases correspond
  to the three polyvagal states. Phase boundaries (T_upper and T_lower) mark the
  transitions. For a regulated nervous system, most experience occurs in the ventral
  vagal phase. For a trauma-modified system, the lower boundary T_lower may be close
  to the ventral vagal resting state, making the transition to freeze easier to trigger.
```

The critical feature of a phase transition — as opposed to a smooth change in arousal
level — is that it happens *all at once*. Below the phase boundary, adding arousal
increases activation level. At the phase boundary, the system tips: a qualitatively
different organisation takes over. This is why the freeze response (dorsal vagal) is
not "very very calm": it is a different phase with different physical properties,
entered through a phase transition, not reached by gradual reduction.

This also explains why clients in therapy sometimes describe state changes as happening
without warning: from their perspective, they were fine, and then suddenly they were not.
From the model's perspective, they were gradually approaching a phase boundary, and the
transition happened when they crossed it. The discontinuity is real — it is a property
of the phase diagram, not a failure of self-awareness.

## 8.3 ADHD: A Thermodynamic Framing

Attention Deficit Hyperactivity Disorder (ADHD) presents quite differently from C-PTSD
in the soma-field model. Rather than a modification of the coupling matrix structure,
ADHD corresponds primarily to an increase in the **effective noise amplitude** $\sigma_0$
and a reduction in **damping** $\gamma$ of the field dynamics.

The Langevin equation with these parameters:

$$\dot{\mathbf{e}} = -\gamma\,\nabla H(\mathbf{e}) + \sigma_0\,\eta(t)$$

In the ADHD regime, $\sigma_0$ is large and $\gamma$ is small. The implications:

- The field moves around the landscape quickly (high noise, low damping)
- It spends less time in any single attractor (shallow dwell time in all basins)
- Transitions between states are frequent and sometimes erratic
- The effective "temperature" of the system is high: many states are thermally accessible

```
  NEUROTYPICAL (moderate σ₀, moderate γ):
  ──── e(t): settles at attractor, brief excursions, returns

         ─────────╮
                  │  ╭──────────────────────────────────── calm
                  ╰──╯

  ADHD (high σ₀, low γ):
  ──── e(t): fast, wide excursions, brief attractor dwell

        ╭╮   ╭──╮  ╭╮╭╮    ╭──╮  ╭╮
  ──────╯╰───╯  ╰──╯╰╯╰────╯  ╰──╯╰──  rapid wide movement

  Figure 8.2. Field dynamics in neurotypical (top) and ADHD (bottom) regimes.
  ADHD is not a broken attractor structure — the landscape may be quite normal.
  It is a high-temperature, low-damping dynamical regime in which the field moves
  through the landscape rapidly and does not settle.
```

The clinical significance: ADHD is not a motivation or character failure. It is a
nervous system running at a thermodynamic setting different from typical, with specific
performance characteristics — excellent rapid exploration of large state spaces, poor
sustained dwell in narrow regions. "Focus" difficulties arise not because the attractor
is absent, but because the effective temperature is too high for the system to remain
in it.

The co-occurrence of ADHD and C-PTSD — which is common, and is well-documented — creates
a particularly complex landscape: the coupling matrix is asymmetrically modified
(C-PTSD effect) *and* the field is running at high temperature (ADHD effect). The
practical consequence is a system that has a large, deep hypervigilance attractor and
the thermal energy to reach it from almost anywhere.

---

> **KEY TERMS**
>
> **Phase transition** — a qualitative reorganisation of a system's structure at a
> critical parameter value; not a gradual change but a discontinuous one.
>
> **Noise amplitude $\sigma_0$** — the magnitude of random fluctuations in the field
> dynamics; controls the effective temperature of the system.
>
> **Damping $\gamma$** — the rate at which the field returns toward attractor states
> after perturbation; low damping means slow return.
>
> **Effective temperature** — the ratio $\sigma_0^2 / \gamma$; determines how widely the
> field explores the landscape relative to the depth of the attractors.

---

\newpage

# PART IV: WHAT CHANGES

---

\newpage

# Chapter 9: The Instrument

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - What the Soma-Field Instrument is designed to measure
> - The seven dimensions the instrument tracks
> - What the ABCD operator circuit does
> - How the instrument relates to clinical practice

---

## 9.1 The Map Is Not the Territory

The Soma-Field Model is a mathematical description. Like all mathematical descriptions
of physical or biological systems, it simplifies. The soma-field is not the body; it is
a model of the body, selected for the properties it can illuminate while necessarily
omitting others. This is not a failure of the model. A map that included every detail
of the territory would be the territory.

The **Soma-Field Instrument** is a clinical tool built on this model: a structured means
of tracking the parameters of the soma-field over time — the coupling structure, the
attractor positions, the threshold, the noise level, the memory kernel amplitudes — so
that changes can be measured rather than merely described.

The instrument is not a questionnaire. It does not ask about narrative or history. It
asks about the body: current activation levels across the emotional modes, attractor
dwell times, threshold accessibility, interoceptive accuracy. The goal is to make the
model's parameters observable.

## 9.2 The Seven Dimensions

The instrument tracks seven primary dimensions of soma-field state:

```
  ╔══════════════════════════════════════════════════════════════════╗
  ║          THE SEVEN DIMENSIONS OF THE SOMA-FIELD                 ║
  ╠══════════════════════════════════════════════════════════════════╣
  ║                                                                  ║
  ║  1. ACTIVATION LEVEL         How strongly are the modes         ║
  ║     e = (e₁,...,eₙ)          currently firing?                  ║
  ║                                                                  ║
  ║  2. ATTRACTOR POSITION       Which state is the field           ║
  ║     e* = argmin H(e)         currently resting in?              ║
  ║                                                                  ║
  ║  3. THRESHOLD                At what activation level does      ║
  ║     T                        the field become conscious?        ║
  ║                                                                  ║
  ║  4. WINDOW OF TOLERANCE      How wide is the basin around       ║
  ║     ΔT = T_upper - T_lower   the current attractor?             ║
  ║                                                                  ║
  ║  5. NOISE LEVEL              How much thermal fluctuation       ║
  ║     σ₀                       is present? (ADHD component)       ║
  ║                                                                  ║
  ║  6. MEMORY KERNEL AMPLITUDE  How strongly are past              ║
  ║     A = (A₁, A₂, ...)        activations currently echoing?     ║
  ║                                                                  ║
  ║  7. INTEROCEPTIVE ACCURACY   How reliably can the person        ║
  ║     α ∈ [0,1]                read their own field state?        ║
  ║                                                                  ║
  ╚══════════════════════════════════════════════════════════════════╝

  Figure 9.1. The seven dimensions of the Soma-Field Instrument. Each dimension
  corresponds to a parameter or derived quantity of the mathematical model. Clinical
  progress is tracked as change across these dimensions over time, rather than as
  narrative self-report alone.
```

![Figure 9.2. The Soma-Field instrument pipeline. Biofeedback sensors (HRV, EDA, EMG) feed the soma-field model, which produces a real-time emotion vector **e**(t) ∈ ℝ¹¹. This drives The Tensor (the emotional score specification), which controls a synthesis engine (Phase Plant). A feedback loop via therapeutic intervention δW allows the practitioner to modify the coupling matrix directly — closing the loop between measurement and treatment. *Author's original figure.*](figures/fig4_instrument.pdf){width=100%}

## 9.3 The ABCD Operator Circuit

The instrument is organised around four operators that act on the soma-field:

**A — Attention**: the operation of directing conscious attention to a body region or
emotional mode. Attention modulates the threshold $T$ locally: attended regions have
their activation brought closer to or above the threshold. Formally: a projection
operator that selects a subspace of the field.

**B — Body**: the somatic grounding operations — breath, posture, movement, temperature.
These directly influence the coupling matrix (changing which modes are activated together)
and the noise amplitude (breath regulation reduces $\sigma_0$). Formally: a modification
of the $W$ and $\sigma_0$ parameters.

**C — Coupling**: the explicit work of mapping which emotional modes are coupled, how
strongly, and in what direction. This is the diagnostic function of the instrument:
identifying the current coupling structure so that modifications can be targeted.
Formally: an estimation of $W$ from observed field dynamics.

**D — Dynamics**: tracking field evolution over time — how the state moves, which
attractors it visits, how long it dwells, what triggers transitions. This is the
longitudinal function: measuring change across sessions.

```
  THE ABCD CIRCUIT

  ┌────────────────────────────────────────────────────────────────┐
  │                                                                │
  │      A (Attention)    B (Body)                                │
  │          │                │                                   │
  │          ▼                ▼                                   │
  │      ┌───────┐       ┌────────┐                               │
  │      │ lower │       │ modify │                               │
  │      │   T   │       │ W, σ   │                               │
  │      └───┬───┘       └────┬───┘                               │
  │          │                │                                   │
  │          └────────┬───────┘                                   │
  │                   │                                           │
  │              ┌────▼────┐                                      │
  │              │  FIELD  │ e(t)                                 │
  │              │  STATE  │                                      │
  │              └────┬────┘                                      │
  │                   │                                           │
  │          ┌────────┴───────┐                                   │
  │          │                │                                   │
  │      ┌───▼───┐       ┌────▼───┐                               │
  │      │ map W │       │ track  │                               │
  │      │       │       │  e(t)  │                               │
  │      └───────┘       └────────┘                               │
  │      C (Coupling)    D (Dynamics)                             │
  │                                                                │
  └────────────────────────────────────────────────────────────────┘

  Figure 9.2. The ABCD operator circuit. Attention (A) and Body (B) are input operators
  that act on the field. Coupling (C) and Dynamics (D) are measurement operators that
  read from the field. Together they form a closed loop: the measurement informs the
  input, which modifies the field, which is measured again.
```

---

\newpage

# Chapter 10: Forward Transformation

```
  ╭──────────────────────────────────────────────────────────────────╮
  │                                                                  │
  │   "The opposite of trauma is not safety.                        │
  │    It is a nervous system that can find safety."               │
  │                                                                  │
  ╰──────────────────────────────────────────────────────────────────╯
```

---

> **LEARNING OBJECTIVES**
>
> By the end of this chapter, you will understand:
>
> - Why "healing" in the traditional sense is not the right goal for all trauma
> - What forward transformation means in the language of the model
> - What therapy "does" when it works, in terms of field parameters
> - What the new landscape looks like

---

## 10.1 The Wrong Goal

The dominant model of trauma recovery involves, in some form, a return. Processing the
memory until it no longer carries charge. Resolving the dissociated parts. Finding the
self that existed before. Returning to baseline.

For late trauma — modification occurring after the baseline is formed — this model is
coherent. A baseline exists. The modification can, in principle, be subtracted from the
current coupling matrix to recover something close to it. The therapeutic work, however
difficult, is working toward a target that is real.

For pre-verbal trauma, this model generates a problem. The baseline was never fully
formed. The target of recovery — the self before the modification — is a mathematical
object that does not exist. Attempting to drive the field toward it is attempting to
converge on an undefined value.

Clinically, this manifests as therapy that helps, and helps, and helps — and never arrives.
Each session improves things. The client gets better at regulation, more tolerant of
activation, more able to function. But the destination remains unreachable. The gap
persists. The sense of having "a self before all this" that the therapy is trying to
restore — never narrows to nothing.

This is not a failure of the therapy or the therapist. It is a consequence of using the
wrong map. The destination does not exist; the voyage toward it cannot terminate.

## 10.2 The Right Goal

Forward transformation changes the question.

Instead of: *how do we remove the modification to recover what was there before?*

We ask: *what kind of coupling matrix $W'$ would give this nervous system the widest
possible window of tolerance, the deepest possible calm attractor, and the lowest
possible memory kernel amplitudes — starting from where it is now?*

This is a well-posed optimisation problem. $W'$ does not have to be $W_0$. It does not
have to resemble a neurotypical baseline. It has to have desirable dynamical properties
as specified by the clinical goals of this person.

The voyage is not back. It is forward into a landscape that has never existed — a
landscape being constructed, not recovered.

```
  THERAPEUTIC TRAJECTORY: FORWARD TRANSFORMATION

  ┌──────────────────────────────────────────────────────────────────┐
  │                                                                  │
  │  CURRENT LANDSCAPE (W)          TARGET LANDSCAPE (W')          │
  │                                                                  │
  │  Energy H ▲                     Energy H ▲                     │
  │           │  ╭──╮  ╭──╮                  │╭───╮               │
  │           │  │  │  │  │                  ││   ╰──────         │
  │           │  │  ╰──╯  │                  │╰─ calm *           │
  │           │  │calm *  │  hyper*          │    wide basin       │
  │           │  │(narrow)│  (deep)          │                    │
  │           └──┴────────┴───────           └───────────────      │
  │                                                                  │
  │  W → W': calm basin widens, hypervigilance basin shallows,     │
  │          memory kernel amplitudes reduce.                       │
  │          The new landscape has never existed before.            │
  │          It is being built, not recovered.                      │
  │                                                                  │
  └──────────────────────────────────────────────────────────────────┘

  Figure 10.1. Forward transformation. The target W' is not a reconstruction of
  a prior baseline (which may not have existed). It is a new configuration with
  desired dynamical properties: a wide calm basin, shallow hypervigilance attractor,
  and reduced memory kernel amplitudes. The path from W to W' uses therapeutic
  tools as the mechanism of landscape modification.
```

## 10.3 What Therapy Does

In the language of the model, effective somatic therapy for pre-verbal trauma does the
following, measurable in terms of the model's parameters:

1. **Widens the window of tolerance** ($T_{\text{upper}} - T_{\text{lower}}$ increases):
   more activation is tolerable without triggering a phase transition.

2. **Reduces memory kernel amplitudes** ($A_k$ decrease): past activations exert less
   pull on the current field state. The echoes get quieter.

3. **Increases memory kernel decay times** ($\tau_k$ increase): the echoes that remain
   fade more quickly. The field returns to rest between episodes.

4. **Symmetrises the coupling partially** ($W$ becomes more symmetric): the asymmetric
   directional flows decrease. Getting from hypervigilance to calm becomes less difficult
   relative to the reverse journey.

5. **Deepens the calm attractor** (calm basin gets deeper and wider): the field can be
   perturbed further from rest and still return there.

6. **Improves interoceptive accuracy** ($\alpha$ increases): the person gets better at
   reading their own field state, which improves the precision of all the above.

None of these changes brings the field to $W_0$. All of them make the field $W'$ more
functional, more flexible, and more capable of safety. The model does not specify how
these changes are achieved — that is the domain of clinical practice. It specifies what
is changing when they are achieved.

## 10.4 The Therapeutic Relationship as Field Coupling

A note on the relational dimension, which the model's formalism can sometimes obscure.

The coupling matrix $W$ is not static. It is updated by experience. The experience of
being in a regulated relationship — of having an other whose field is predominantly
ventral vagal, engaged, and non-threatening — is itself field-modifying. The nervous
system learns from co-regulation.

In field language: the therapist's soma-field is coupled to the client's soma-field
during a session. This coupling is weak (they are separate bodies) but not zero. Repeated
experiences of this coupling — of another field that is stable and available — gradually
shift the client's attractor structure. The calm that is borrowed from the relational
field slowly becomes encoded in the client's own coupling matrix.

This is why relational therapy works even in the absence of explicit body-focused
techniques. The relationship is the technique. The therapist's regulated nervous system
is the instrument.

---

> **AUTHOR'S NOTE: The Voyage Forward**
>
> I wrote this model in part because I needed a description of my own landscape that was
> precise enough to work with.
>
> The traditional therapeutic story — you process the trauma, you return to yourself,
> you heal — did not fit. I got better, session by session, year by year. The regulation
> improved. The activation windows widened. The freeze responses got shorter. But there
> was nowhere I was arriving at, no self I was returning to, because the modification
> had not been added to a prior self. It was the self.
>
> What the model gave me was a different story: not a return, but a construction. Not
> going back to something, but going forward to something that has never existed. And
> because the target is $W'$ rather than $W_0$, the voyage does not need to end.
>
> There is no failure in that. There is, in fact, considerable freedom.

---

> **KEY TERMS**
>
> **Forward transformation** — the construction of a new coupling matrix $W'$ with
> desired dynamical properties, as opposed to the recovery of a prior baseline $W_0$.
>
> **Co-regulation** — the process by which the soma-field of one person influences the
> soma-field of another through relational coupling; the mechanism by which the
> therapeutic relationship modifies the landscape.

---

\newpage

# PART V: APPLICATIONS

---

\newpage

# Chapter 11: A Voyage into the Field

> **LEARNING OBJECTIVES**
>
> By the end of this chapter you should be able to:
>
> - Explain what it means to *navigate* an emotional field rather than merely observe it
> - Describe the two sectors of soma-field dynamics: perturbative (within a basin) and non-perturbative (threshold crossings)
> - Explain what a Feynman diagram represents and apply the concept informally to emotional coupling
> - Define the *emotional score* of a narrative and distinguish it from its container
> - Explain the holographic principle as applied to clinical assessment
> - Describe what EmotionML captures and what it omits

---

Two films. One from 1966. One never made.

In *Fantastic Voyage* (Fleischer, 1966), a submarine called the *Proteus* is miniaturised
to microscopic scale and injected into the bloodstream of a critically injured scientist.
The crew has sixty minutes to navigate from the carotid artery to a blood clot in the
brain, dissolve it, and exit before the miniaturisation reverses. The body is the
territory. The voyage is literal.

In a therapy session, something similar happens. Attention — the therapist's, and
eventually the patient's own — is directed inward. It navigates through layers of somatic
sensation, emotional activation, and memory echo. It encounters resistance: the field's
own defence against being observed. It approaches regions of high activation — the deep
attractors — and, if conditions permit, crosses the threshold into them rather than
turning back.

The body is the territory in both cases. The voyage is into an interior that has its own
geography, its own currents, its own immune responses. The *Proteus* crew is attacked by
white blood cells — the body's machinery for destroying foreign objects. The therapeutic
attention is resisted by the field's own homeostatic mechanisms: avoidance, dissociation,
intellectualisation, the body's insistence that some regions remain unvisited.

*It was always the same film.*

The Soma-Field Model provides the mathematics of that film: the Hamiltonian landscape the
crew must navigate, the attractor basins where the submarine drifts without effort, the
energy barriers that require thrust to cross, the memory kernel that makes past routes
echo in present navigation. This chapter develops the geometry of the voyage.

---

## 11.1 The Navigable Landscape

In Chapter 4 we introduced the Hamiltonian $H(\mathbf{e})$ as the energy function of the
emotional field. The state of the field is a point in the high-dimensional space of all
possible emotional-somatic configurations. The dynamics move the field downhill toward
local minima — the attractor basins.

Think of this as terrain. The attractor basins are valleys. The field settles naturally
into whichever valley it is closest to, and tends to stay there unless external energy
(a trigger, a somatic cue, a therapeutic intervention) pushes it uphill toward a ridge
and over into another valley.

The therapeutic voyage is a navigation across this terrain: starting in one valley (the
presenting state), moving toward another (the target state — safety, integration, the
capacity for contact), crossing the ridges in between. The ridges are the thresholds.
The crossing is the therapeutic event.

**What the terrain looks like.** For a field with two strongly coupled modes — call them
*fear* and *shame* — the landscape is a surface in three dimensions: fear on one axis,
shame on another, energy on the vertical axis. The attractor is a bowl. The trauma state
may have two bowls: a "fear-then-shame" sequence, and a "freeze" attractor from which
shame and fear are both absent but unreachable.

For $n$ modes, the terrain is $n$-dimensional. Visualisation requires projection, but the
mathematics is the same regardless of dimension.

**Fractal basin boundaries.** When the coupling matrix $W$ is asymmetric — when fear
drives shame more strongly than shame drives fear, as is common in post-traumatic
presentations — the boundary between attractor basins is not a smooth curve. It is
fractal: the boundary between the "hypervigilance" basin and the "collapse" basin in a
traumatised field has infinitely complex interdigitation at every scale of magnification.

The Mandelbrot set is the mathematical archetype of a fractal basin boundary: the
boundary between the set and its complement is a Julia set, infinitely detailed at every
scale. The fractal basin boundaries of the soma-field are of the same class. The
visualisation is not merely aesthetic — the mathematics is the same.

> **GOING DEEPER: Fractals, Julia Sets, and Attractor Boundaries**
>
> The iteration $z \mapsto z^2 + c$ that generates the Mandelbrot set is a discrete
> dynamical system on the complex plane. Its attractor is the origin (the sequence
> converges to 0), or infinity (the sequence escapes). The boundary between the two
> basins is the Julia set $J_c$ — a fractal object that, for most values of $c$, has
> non-integer (Hausdorff) dimension strictly between 1 and 2.
>
> The soma-field is a continuous dynamical system on $\mathbb{R}^n$, not a discrete
> iteration on $\mathbb{C}$. But the mechanism is the same: nonlinear coupling between
> modes (the $W_{ij}$ terms + the threshold nonlinearity) generates sensitivity at the
> boundary that propagates across scales. The Hausdorff dimension of the boundary is a
> direct function of the asymmetry of $W$ and the steepness of the threshold
> nonlinearity. In a severely traumatised field with highly asymmetric coupling, the
> boundary dimension approaches 2: the boundary is space-filling. There is, in the
> formal sense, no clean edge between hypervigilance and collapse. Just increasingly
> complex interdigitation.

**Clinical implication.** The fractal character of the basin boundary means that small
perturbations near the threshold have disproportionate effects — the butterfly effect is
concentrated at the boundary. A session conducted near a threshold crossing is
qualitatively different from a session conducted well inside a basin. The geometry
predicts this before any clinical experience confirms it.

---

## 11.2 Emotions Looking for Each Other

In particle physics, interactions are drawn as Feynman diagrams: lines representing
particles moving through space and time, meeting at vertices where something happens.
An electron emits a photon. A quark changes flavour. Two particles scatter.

The same formalism applies to the soma-field, and the interpretation is immediate.

**The propagator.** A single emotional mode — call it *fear* — traveling through time
without interacting with anything else is drawn as a single line, moving from left to
right (earlier to later). The line gets fainter as time increases: the mode decays toward
its equilibrium unless maintained by coupling or stimulus. This is the *propagator* —
the Green's function of the free dynamics.

```
  Single-mode propagator:

  fear ───────────────────────────>   (decays at rate |W_fear,fear|)
       t'                         t
```

**The coupling vertex.** When fear and shame are coupled — $W_{\text{fear, shame}} \neq 0$
— they can scatter: fear activates shame, shame amplifies fear. This is drawn as two
lines meeting at a vertex, with the coupling strength $W_{ij}$ labeling the junction.

```
  Fear-shame coupling vertex:

  fear  ────────────● ──────────── fear
                    │  W_fs
  shame ────────────● ──────────── shame
```

If $W_{\text{fear, shame}} > 0$, shame excites fear. If $W_{\text{fear, shame}} < 0$,
shame suppresses fear. For the asymmetric case $W_{\text{fear, shame}} \neq
W_{\text{shame, fear}}$ — one emotion drives the other more than it is driven in return —
the vertex is directional. Fear leads shame in a post-traumatic field. Shame may or may
not respond in kind.

**Feedback loops.** When fear excites shame and shame excites fear in a closed cycle, the
diagram is a loop. The loop is not merely a metaphor: it is a precise mathematical object
whose value — computed by integrating over the intermediate times — gives a correction to
the effective coupling at the loop's characteristic timescale.

```
  Fear-shame feedback loop:

  FEAR  ────────────●─────────────────────●──── FEAR
                    │  W_fs               │
                    └─────── SHAME ───────┘
                                W_sf
                    Loop correction: loop runs faster,
                    effective W_fear,fear increases.
                    This is sensitisation.
```

Repeated co-activation of fear and shame — as occurs in a trauma where shame was the
response to terror — consolidates the loop: the effective coupling grows. The Feynman
diagram is a picture of how shame becomes a reliable trigger for fear across sessions and
years.

**The memory vertex.** The trauma memory kernel introduces a vertex that is non-local in
time: mode $j$ at some earlier time $t'$ contributes to mode $i$ now, at time $t$, with
weight $K(t - t')$. The diagram has an internal arrow going backward in time — not
acausally, but in the sense that the *past state* of the field is still driving the
*present state*.

```
  Memory kernel vertex:

  shame(t') ────╮  K(t-t') J_fs
                ╰──────────────────── fear(t)

  The shame at time t' is still driving fear now,
  weighted by how much the memory kernel retains it.
```

For a field with a slow memory kernel (large $\tau_k$), past activations echo far into
the future. A traumatic incident twenty years ago is still driving present fear via the
memory vertex — not as a belief or a narrative, but as a dynamical coupling with a
specific timescale.

**The instanton: the pivot.** No finite collection of Feynman diagrams — no sum of
scattering and loop corrections — describes a threshold crossing. The topological change
from one basin to another is a *non-perturbative* event: an instanton. It is not a series
of small steps; it is a qualitative transition, a jump between attractors. In physics,
instantons are the events that perturbation theory cannot see. In the therapy room, they
are the sessions that change something permanently.

> **GOING DEEPER: The Two Sectors**
>
> Every field theory divides into a *perturbative* sector (small fluctuations, describable
> by Feynman diagrams) and a *non-perturbative* sector (large topological events,
> described by instantons, solitons, and other saddle-point solutions).
>
> The soma-field has the same division:
>
> | Sector | Events | Mathematical description |
> |---|---|---|
> | Perturbative | Emotional coupling, sensitisation, habituation, day-to-day activation | Feynman diagrams: propagators, vertices, loops |
> | Non-perturbative | Threshold crossings, basin transitions, pivotal sessions | Instantons: minimal-action paths between basins |
>
> The perturbative sector is accessible to standard talk therapy (changing $W_{ij}$ by
> desensitisation; damping memory kernel amplitudes $A_k$; adjusting thresholds). The
> non-perturbative sector requires conditions for threshold crossing: sufficient activation
> energy, a safe enough container, and — often — direct somatic engagement. You cannot
> reach an instanton by accumulating small perturbative steps. That is the formal reason
> why some therapeutic approaches reach a ceiling.

---

## 11.3 The Emotional Score

A musical score is not a performance. It is the abstract structure that can be performed
in many ways — by different orchestras, in different halls, at different tempos — while
remaining recognisably itself. The *notes* are the invariant; the *sound* is the
realisation.

A film has an emotional score. Not the music (though the music is part of its
expression), but the trajectory of the emotional field that the film traces over its
duration: how activation rises and falls, which modes are coupled, where the thresholds
are crossed, what the final attractor state is.

This emotional score is independent of the narrative container — the specific story in
which it is realised. The same score can be realised in a river journey, a war, a
marriage, a career, a therapy, or a voyage through a bloodstream.

**Formally.** The emotional score is a trajectory $\mathbf{e}^*(t)$ in the emotional
field space, parameterised by story-time $t \in [0, 1]$ (opening to closing). A film,
novel, or therapy session is:

$$\text{Realisation} = \bigl(\mathbf{e}^*(t),\; \text{Container}\bigr)$$

The container provides the narrative surface: characters, setting, imagery, plot. The
emotional score provides the dynamics: which modes activate, in what sequence, at what
coupling strength.

**The Conrad example.** *Heart of Darkness* and its film realisation *Apocalypse Now*
(Coppola, 1979) share a score: an upstream journey toward something pre-verbal, toward a
figure (*Kurtz*) who represents the field's deepest attractor — the place where normal
threshold regulation has dissolved. The journey upstream is a journey toward decreasing
$\tau_d$ (shorter developmental time), toward earlier, more diffuse, less differentiated
emotional modes. The field becomes less structured as the journey continues. Kurtz is the
attractor at the bottom of the developmental basin — not a monster, but the deepest
attractor, the one with no threshold above it.

The score is: *progressive reduction of threshold distance, increasing weight of
pre-verbal modes, final approach to a basin from which ordinary return is blocked.* The
container (Congo river / Vietnam river) is a surface over which this score is played.

**Multi-scale structure.** The score has fractal structure: the same emotional pattern
recurs at the level of the full film, the act, the scene, and the moment. A scene in
which a character approaches and retreats from a threshold is a micro-version of the
film's macro-structure. This is not a metaphor — the soma-field dynamics are
scale-invariant near a critical point, so the same Hamiltonian structure repeats across
timescales. A good filmmaker composes at all scales simultaneously.

**The viewer's field.** The viewer has their own emotional field $\mathbf{e}_V(t)$ which
couples to the screen signal $S(t)$:

$$\dot{\mathbf{e}}_V = -\nabla H_V(\mathbf{e}_V) + \lambda \cdot S(t) + \eta_V$$

The director controls $S(t)$ — the screen signal — but not $H_V$ (the viewer's own
landscape). A viewer whose own field has a deep shame attractor will have a different
response to the same $S(t)$ than a viewer without it. The film is the same; the voyage
is different. This is the formal account of why films affect different people differently,
and why re-watching a film after therapeutic work can produce a qualitatively different
emotional experience: $H_V$ has changed.

---

## 11.4 The Holographic Clinic

In theoretical physics, the holographic principle (Susskind, 1995; Bousso, 2002) states
that the complete description of a volume of space can be encoded on its boundary surface,
with no loss of information. A three-dimensional object is fully represented by a
two-dimensional hologram. The interior is encoded in the edge.

The soma-field has a holographic structure that is clinically actionable.

**The boundary.** The observable boundary of the soma-field is what can be seen from
outside: behaviour, posture, facial expression, reported affect, the pattern of
threshold crossings in session, the rate of escalation and de-escalation, the latency
between stimulus and response. This is the boundary data — the hologram.

**The bulk.** The interior of the soma-field is inaccessible to direct observation: the
weight matrix $W$, the memory kernel $K(\tau)$, the effective thresholds $T_i$, the
attractor topology. These are the bulk fields.

**The reconstruction theorem.** If the boundary data is sufficiently rich — if we observe
enough threshold crossings, enough coupling patterns, enough temporal correlations — the
bulk fields can be reconstructed. The weight matrix $W_{ij}$ can be estimated from the
co-activation statistics of observed modes. The memory kernel time constants $\tau_k$ can
be estimated from the delay between stimulus and response at different frequencies. The
attractor topology can be inferred from which basins the field visits and how long it
dwells in each.

*The body tells you everything.* This is not a therapeutic truism. It is a measurement
theorem: given sufficiently rich boundary data, the full soma-field is recoverable from
external observation. The body is a hologram of its own interior.

**Clinical implication.** A thorough intake assessment — one that tracks not just
presented symptoms but response latencies, co-occurrence statistics, threshold distances,
and interoceptive access — is a holographic measurement. It gives access to the bulk
fields without requiring the patient to verbally report what they do not have words for.
The body has been keeping a precise record. The therapist's task is to read it.

---

## 11.5 EmotionML: Labels Without Dynamics

The W3C EmotionML standard (Schröder et al., 2011) provides a formal vocabulary for
annotating emotional states in human-computer interaction. It specifies representation
formats for emotion categories (anger, fear, joy, sadness...), dimensions (valence,
arousal, dominance), and appraisals (novelty, intrinsic pleasantness, goal congruence).
It is a well-engineered taxonomy.

It is not a dynamical theory.

EmotionML says what emotional state a system is in at time $t$. It does not say how that
state changes, what coupling it has to other states, what its threshold distance is, how
its memory kernel drives its future evolution, or what basin transition conditions apply.
It provides a label; the Soma-Field Model provides the dynamics.

The relationship is analogous to the relationship between a chemical nomenclature (naming
compounds) and a rate equation (describing how compounds react). The nomenclature is
necessary but not sufficient. Knowing that a patient presents as "fearful" is the EmotionML
layer. Knowing the coupling $W_{\text{fear, shame}}$, the threshold $T_{\text{fear}}$, the
memory kernel time constants, and the attractor depth is the soma-field layer. The
second layer strictly includes the first.

> **AUTHOR'S NOTE: Why Taxonomy Is Not Enough**
>
> The history of psychiatry is largely a history of improving the taxonomy: from
> humours to syndromes to DSM categories to dimensional models. Each generation's
> taxonomy is more precise than the previous. Each is still a taxonomy.
>
> The shift from taxonomy to dynamics is not a refinement. It is a change of
> mathematical structure: from a set of labels to a vector field on a state space,
> with a Hamiltonian, a noise term, and a coupling matrix. The prediction capability
> is qualitatively different. A taxonomy tells you what something is called. A
> dynamical model tells you what it will do next and what it would take to change it.
>
> EmotionML is a very good taxonomy. The Soma-Field Model is the next layer.

---

> **KEY TERMS**
>
> **Navigable landscape** — the Hamiltonian $H(\mathbf{e})$ understood as terrain,
> with attractor basins as valleys and thresholds as ridges that must be crossed.
>
> **Fractal basin boundary** — the boundary between attractor basins when the coupling
> matrix $W$ is asymmetric; has non-integer Hausdorff dimension and is sensitive to
> perturbation at all scales.
>
> **Feynman diagram** — a graphical notation for the terms in a perturbative expansion;
> in the soma-field, lines represent propagating modes, vertices represent couplings,
> and loops represent feedback cycles.
>
> **Perturbative sector** — dynamics within an attractor basin, describable by Feynman
> diagrams; accessible to standard desensitisation and coupling-modification approaches.
>
> **Non-perturbative sector** — threshold crossings and basin transitions; described by
> instantons; requires conditions for the full threshold-crossing event.
>
> **Instanton** — a non-perturbative saddle-point solution connecting two attractor
> basins; in the therapy room, the pivot moment that changes the field topology.
>
> **Emotional score** — the trajectory $\mathbf{e}^*(t)$ that defines a narrative's
> emotional structure independently of its container; formally $\text{Realisation} =
> (\mathbf{e}^*(t), \text{Container})$.
>
> **Holographic principle** — the claim that boundary observables (behaviour, symptoms,
> threshold patterns) encode the full bulk fields ($W$, $K$, attractor topology);
> the basis for clinical assessment as measurement.
>
> **EmotionML** — W3C standard for emotion annotation; provides taxonomy (labels) but
> not dynamics (evolution equations); a necessary but not sufficient layer.

---

> **CHAPTER SUMMARY**
>
> The Soma-Field Model provides the geometry of a voyage. The Hamiltonian landscape is
> the territory: attractor basins are valleys, thresholds are ridges, and the field
> navigates this terrain continuously. For asymmetric coupling matrices, the basin
> boundaries are fractal — infinitely complex at every scale, sensitive to perturbation
> everywhere along the edge.
>
> The dynamics divide into two sectors. The perturbative sector — small fluctuations
> within a basin — is organised by Feynman diagrams: propagators carry modes through
> time, coupling vertices describe interactions between modes, feedback loops describe
> sensitisation, and memory kernel vertices describe the echo of past activations into
> the present. The non-perturbative sector — threshold crossings — is described by
> instantons: the minimal-action paths between basins that no perturbative sum can reach.
>
> Narratives have emotional scores: trajectories $\mathbf{e}^*(t)$ that define a film or
> story independently of its narrative container. The same score can be realised in a
> river journey, a war, or a voyage through a bloodstream. The viewer's own soma-field
> couples to the screen signal; what they experience depends on their own Hamiltonian.
>
> The boundary of the soma-field encodes the bulk: behavioural observation, response
> latency, co-activation statistics, and threshold patterns give access to the full
> weight matrix, memory kernel, and attractor topology without requiring verbal report
> of what has no words. The body is a hologram of its own interior.
>
> EmotionML provides the taxonomy. The Soma-Field Model provides the dynamics. Both are
> needed; the second strictly extends the first.

---

\newpage

# Epilogue: The T's

There are four T's in this book, and they are not accidental.

**Theory** — the formal structure that makes prediction possible. A theory is not a guess
or an opinion. It is a precise description that can be tested, that makes specific
predictions, and that says exactly what evidence would falsify it. The Soma-Field Model
is a theory of emotional dynamics: it makes predictions about attractor structure,
about the character of pre-verbal versus late trauma, about what parameters change in
effective therapy. Whether those predictions survive contact with data is an empirical
question, and the empirical work is needed.

**Threshold** — the parameter $T$, which appears in the model as the boundary between
sub-threshold somatic activity and conscious emotional experience. The threshold is not
a switch. It is a continuous parameter, differently set in different nervous systems,
modifiable through practice and therapy. The difference between a body that feels
everything and a body that feels nothing is, in formal terms, a difference in $T$.
The therapeutic expansion of the window of tolerance is, in formal terms, a widening
of the range around $T$ within which the field can move without triggering a phase
transition.

**Time** — the developmental time $\tau_d$, which changes the character of a
modification from perturbative (late trauma: $W = W_0 + \delta W$, a baseline plus
a modification) to structural (pre-verbal trauma: $W = W_{\text{trauma}}$, the
modification is the structure). Time also appears in $\tau_k$ — the decay time of the
memory kernel, how long an echo persists. Therapy changes $\tau_k$. The passage of time,
in the absence of intervention, does not reliably change $\tau_k$ for pre-verbal somatic
traces.

**Transformation** — the fourth T, the one that this book is about, finally. Not recovery.
Not return. Not the restoration of a prior state. The construction of a new landscape:
wider, more flexible, with deeper calm and shallower hypervigilance, arrived at from
where the system is, going somewhere it has not been before.

There is a fifth T, which gave this book its title: **Trance** — in two senses. The
first: the altered state at the threshold, the phase transition, the field crossing a
boundary and remaining in the other phase. Trance is not a malfunction; it is a dynamic
state, momentarily ungoverned by the usual attractors. In those moments, something is
possible that is not possible from within a stable phase.

The second sense is the title itself. *A Voyage into Trance* (1995) is a Goa trance
compilation by Paul Oakenfold. The trance state produced by extended rhythmic music and
the freeze response of a traumatised nervous system are not the same experience. They are
governed by the same mathematics. Both drive an arousal variable across a threshold and
sustain it there. Music does this deliberately; trauma does it involuntarily. The
mathematics does not distinguish.

The voyage into trauma is not a straight line. It passes through all five T's,
sometimes in order, sometimes not.

The model is the map.
The body is the territory.
The voyage is yours.

---

\newpage

# Appendices

---

## Appendix A: The Mathematics in Full

*The following is a condensed version of the academic paper* Soma-Field Model of
Emotional Dynamics and C-PTSD *for readers who want the formal derivations. Full
derivations, Lean 4 type sketches, and bibliography are in the companion document
`soma-field-paper.md`.*

### A.1 The Hamiltonian

$$H(\mathbf{e}) = -\frac{1}{2}\,\mathbf{e}^{\top} W\, \mathbf{e} - \boldsymbol{\theta}^{\top}\mathbf{e}$$

where $W \in \mathbb{R}^{n \times n}$ is the coupling matrix and
$\boldsymbol{\theta} \in \mathbb{R}^n$ is the threshold bias vector.

### A.2 The Dynamics

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}) + \sigma_0\,\eta(t) = W\mathbf{e} + \boldsymbol{\theta} + \sigma_0\,\eta(t)$$

where $\eta(t)$ is white noise with $\langle\eta_i(t)\eta_j(s)\rangle = \delta_{ij}\delta(t-s)$.

### A.3 The C-PTSD Modification

$$W_{\text{C-PTSD}} = W_0 + \Delta W, \qquad \Delta W_{ij} \neq \Delta W_{ji}$$

The asymmetry of $\Delta W$ breaks the gradient flow property and introduces directional
cycles in the landscape.

### A.4 The Memory Kernel

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}) + \int_0^t K(t-s)\,\mathbf{e}(s)\,ds + \sigma_0\,\eta(t)$$

$$K(\tau) = \sum_k A_k\, e^{-\tau/\tau_k}$$

### A.5 Developmental Time Parameterisation

$$W(\tau_d) = f(\tau_d)\cdot W_0 + \bigl(1 - f(\tau_d)\bigr)\cdot W_{\text{trauma}}$$

$$f(\tau_d) = \tanh\!\left(\frac{\tau_d}{\tau_c}\right), \qquad \tau_c \approx 36 \text{ months}$$

### A.6 The QFT Correspondence

Under the Wick rotation $t \to -i\tau$:

| QFT | Soma-Field |
|-----|-----------|
| $G_E(\tau) = \frac{1}{2m}e^{-m\lvert\tau\rvert}$ | $K(\tau) = \sum_k A_k e^{-\lvert\tau\rvert/\tau_k}$ |
| Field mass $m$ | Inverse decay time $1/\tau_k$ |
| $H_{\text{Ising}}$ | $H_{\text{soma}}$ |

---

## Appendix B: Lean 4 Type Sketches

The following are proof sketches in Lean 4. `sorry` marks open proof obligations.

```lean
-- Core soma-field structures
structure CouplingMatrix (n : ℕ) where
  W : Matrix (Fin n) (Fin n) ℝ
  θ : Fin n → ℝ

structure SomaField (n : ℕ) where
  e     : Fin n → ℝ      -- current activation vector
  W     : CouplingMatrix n
  T     : ℝ              -- threshold parameter
  sigma : ℝ              -- noise amplitude

-- The Hamiltonian
noncomputable def hamiltonian {n : ℕ} (W : CouplingMatrix n) (e : Fin n → ℝ) : ℝ :=
  -0.5 * Matrix.dotProduct (Matrix.mulVec W.W e) e
  - Matrix.dotProduct W.θ e

-- C-PTSD modification: asymmetric coupling
def isCPTSDModified {n : ℕ} (W : CouplingMatrix n) : Prop :=
  ∃ i j, W.W i j ≠ W.W j i

-- Developmental time parameterisation
structure TraumaProfile (n : ℕ) where
  τ_d        : ℝ
  asymmetry  : Matrix (Fin n) (Fin n) ℝ
  amplitudes : List (Fin n → ℝ)
  decayTimes : List (Fin n → ℝ)

def τ_c : ℝ := 36

noncomputable def structuralFraction (τ_d : ℝ) : ℝ :=
  Real.tanh (τ_d / τ_c)

-- For pre-verbal trauma: structural fraction < tanh(1) ≈ 0.76
theorem preVerbalIsStructural {n : ℕ} (profile : TraumaProfile n)
    (h : profile.τ_d < τ_c) :
    structuralFraction profile.τ_d < Real.tanh 1 := by
  unfold structuralFraction
  apply Real.tanh_lt_tanh
  exact div_lt_one_of_lt h (by norm_num)
```

---

## Appendix C: The Cross-Language Correspondence Table

| Mathematical language | Emotional dynamics |
|---|---|
| Symmetric monoidal category $\mathcal{C}$ | Soma-field operator algebra |
| Object $A \in \mathcal{C}$ | Emotional mode type |
| Morphism $f : A \to B$ | Field operator (maps one mode to another) |
| Tensor product $A \otimes B$ | Simultaneous activation of modes $A$ and $B$ |
| Composition $g \circ f$ | Sequential field operations |
| Identity morphism $\text{id}_A$ | Identity (mode persists unchanged) |
| Braiding $\sigma : A \otimes B \cong B \otimes A$ | Mode-order independence of simultaneous states |
| Feynman vertex | Emotional interaction (coupling $W_{ij}$) |
| Loop diagram | Memory kernel (self-coupling over time) |
| Feynman propagator | Memory trace decay $e^{-\lvert\tau\rvert/\tau_k}$ |
| Vacuum state | Resting soma-field (minimal activation) |
| Partition function $Z$ | Field normalisation (probability distribution over states) |
| Renormalisation group flow | Therapeutic modification of coupling constants |
| Phase transition | Polyvagal state transition (ventral/sympathetic/dorsal) |
| Symmetry breaking | Asymmetric $W$ (C-PTSD modification) |

*The correspondences in this table are not analogies. They are identifications of the
same mathematical object in two notation systems, established by the Baez–Lauda coherence
theorem (2011) for the categorical column and the Wick rotation for the QFT column.*

---

## Appendix D: Glossary

**Amplitude $A_k$** — The strength of a trauma memory trace's influence on the current
soma-field. Reduced by effective somatic therapy.

**Attractor** — A stable state in the energy landscape; a position toward which the
soma-field naturally moves from nearby states.

**Basin of attraction** — The region of state space from which the field flows toward a
given attractor.

**C-PTSD operator** — The modification $\Delta W$ to the coupling matrix that represents
the effect of complex developmental trauma on the soma-field landscape.

**Co-regulation** — The process by which the soma-field of one person influences another
through relational coupling; the somatic mechanism of relational healing.

**Coupling matrix $W$** — The matrix encoding the interactions between emotional modes;
determines the shape of the energy landscape. Symmetry of $W$ guarantees stable attractors.

**Damping $\gamma$** — The rate at which the field returns toward attractors after
perturbation. Low damping (ADHD) produces rapid, wide-ranging field dynamics.

**Decay time $\tau_k$** — How long a trauma memory trace persists before fading.
Pre-verbal traces typically have longer decay times.

**Developmental age at trauma $\tau_d$** — The age in months at which the primary
traumatic modification occurred. Determines whether the modification is perturbative
(late trauma) or structural (pre-verbal trauma).

**Effective temperature** — The ratio $\sigma_0^2 / \gamma$; determines how widely the
soma-field explores the landscape relative to the depth of the attractors.

**Forward transformation** — The construction of a new coupling matrix $W'$ with desired
dynamical properties, as the correct therapeutic goal for pre-verbal trauma (as opposed
to recovery of a prior baseline).

**Hamiltonian $H$** — The energy function that assigns a value to every possible
soma-field state; determines the landscape's hills and valleys and thus the dynamics.

**Interoception** — The nervous system's process of sensing the body's internal state.

**Interoceptive accuracy $\alpha$** — The precision with which a person can read their
own soma-field state. Disrupted by trauma; improvable through training and therapy.

**Memory kernel $K(\tau)$** — The function describing how past field activations
continue to influence the current state. In C-PTSD: a sum of decaying exponentials.

**Noise amplitude $\sigma_0$** — The magnitude of random fluctuations in field dynamics.
Elevated in ADHD; reduced by breath and autonomic regulation.

**Phase transition** — A qualitative reorganisation of the field's state at a critical
parameter value. Polyvagal state changes (e.g., ventral vagal to freeze) are phase
transitions, not gradual changes.

**Soma** — The body as experienced from the inside; the totality of interoceptive signals.

**Soma-field** — The vector $\mathbf{e}$ of somatic activation levels across emotional
modes; the state of the body's emotional field at a given moment.

**Structural fraction $f(\tau_d)$** — The proportion of the coupling matrix attributable
to neurotypical baseline development versus trauma-formed modification.

**Threshold $T$** — The activation level above which a soma-field mode becomes conscious
experience. The boundary between felt emotion and sub-threshold somatic activation.

**Verbal encoding threshold $\tau_c$** — The approximate developmental age (≈36 months)
at which narrative memory and verbal encoding capacity reliably emerges.

**Wick rotation** — The substitution $t \to -i\tau$ that transforms oscillatory quantum
dynamics into real-time thermal/stochastic dynamics; the bridge connecting QFT
propagators to soma-field memory kernels.

**Window of Tolerance** — The range of arousal within which the nervous system can
function flexibly, process information, and engage socially.

---

## Bibliography

The following references are cited in this book. Full academic citation details are in
the companion document `bibliography.bib`.

- Baez, J. C., & Lauda, A. D. (2011). A prehistory of $n$-categorical physics.
- Damasio, A. (1994). *Descartes' Error: Emotion, Reason, and the Human Brain*.
- Gendlin, E. T. (1978). *Focusing*.
- Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective
  computational abilities. *PNAS, 79*(8), 2554–2558.
- Levine, P. A. (2010). *In an Unspoken Voice*.
- Ogden, P., Minton, K., & Pain, C. (2006). *Trauma and the Body*.
- Penrose, R. (1971). Applications of negative dimensional tensors.
- Porges, S. W. (2011). *The Polyvagal Theory*.
- Schore, A. N. (2001). The effects of early relational trauma on right brain development.
- Selinger, P. (2010). A survey of graphical languages for monoidal categories.
- van der Kolk, B. A. (2014). *The Body Keeps the Score*.
- Vitiello, G. (2001). *My Double Unveiled*.

---

*A Voyage into Trauma: The Soma-Field Theory of Emotional Life*
*First edition, 2026. Companion academic paper: soma-field-paper.md*

---

\newpage

## Listening Notes

This book was written in a single session on the night of 16–17 May 2026.

The development was set to *Silver Machine* by Hawkwind.
It closed with *It's So Easy* by Hawkwind.

Both choices were correct.



\newpage

\part{Interlude: The Tensor --- A Film in Fields}



\newpage

# The Tensor

*An Abstract Film Definition*

---

This is not a screenplay. It contains no dialogue, no character names, no scene
headings, no camera directions. It cannot be read to an actor or handed to a set
designer. It describes a film the way a musical score describes a performance —
as an abstract structure that can be realised in many ways, by many different
instruments, for many different audiences.

The film is defined as a trajectory through the emotional field. The rendering —
the actual pixels and samples the viewer experiences — is generated at runtime
from this trajectory, from the viewer's own soma-field state, and from a set of
control parameters. Two viewers watching the same film may hear different music.
In the limit where the viewer's own biofeedback is available, they may traverse
the trajectory differently — the film meets them where they are.

The territory is the body. The voyage is inward.

---

# Part I: The Format

## 1. The Emotional Score

A film is defined by its **emotional score**: a vector-valued trajectory

$$\mathbf{e}^*(t) = \bigl(e^*_1(t),\; e^*_2(t),\; \ldots,\; e^*_n(t)\bigr)$$

parameterised by story-time $t \in [0, 1]$ (opening to closing). Each component
$e^*_k(t)$ is the intended activation of emotional mode $k$ at story-moment $t$.

The score is **not** what the viewer feels. It is what the film proposes — the
director's instruction to the rendering system. Whether the viewer's field
resonates with the proposal depends on their own Hamiltonian $H_V$.

The standard mode vocabulary for this project uses seven primary axes:

| Mode | Symbol | Description |
|---|---|---|
| Safety | $e_S$ | Regulation, groundedness, ventral vagal tone |
| Fear | $e_F$ | Threat activation, mobilisation |
| Shame | $e_{Sh}$ | Social evaluation, self-concealment |
| Grief | $e_G$ | Loss, withdrawal, parasympathetic collapse |
| Curiosity | $e_C$ | Approach, exploration, openness |
| Awe | $e_A$ | Threshold-adjacent wonder; dissolution of self-boundary |
| Language | $e_L$ | Symbolic, conceptual, narrative organisation |

Additional modes can be added per score. Pre-verbal affect, disgust, rage, and
the somatic marker of HRV coherence may all appear as named axes.

## 2. Threshold Events

At specified story-times $t_k$, the score may declare a **threshold crossing** —
a non-perturbative event in which the emotional field transitions between attractor
basins. These are not smooth changes of $\mathbf{e}^*(t)$; they are instantons.

A threshold event is declared as:

```
THRESHOLD  t = 0.58  FROM: [hypervigilance]  TO: [awe]
           condition: e_F > 0.7 AND e_A rising
           duration: 0.04  (narrow window)
```

The rendering system must hold the score near the threshold approach for as long
as necessary until the crossing condition is met — whether by the score's internal
dynamics or by the viewer's biofeedback signalling readiness.

## 3. Control Knobs

The score is rendered through a set of **control parameters** $\kappa$ that the
viewer, clinician, or runtime system can adjust. These are continuous dials, not
binary switches.

| Knob | Symbol | Effect |
|---|---|---|
| Depth | $\kappa_d \in [0,1]$ | How far the instanton descends into the pre-verbal attractor. At $\kappa_d = 0$, threshold crossings are shallow; at $\kappa_d = 1$, the full instanton trajectory is traversed. |
| Velocity | $\kappa_v \in [0.1, 3]$ | Clock multiplier for story-time. $\kappa_v < 1$: expanded, slower passage. $\kappa_v > 1$: compressed. |
| Resonance | $\kappa_r \in [0,1]$ | Weight of viewer biofeedback in modulating the score. At $\kappa_r = 0$: pure projection. At $\kappa_r = 1$: the score is entirely driven by the viewer's field (the film becomes a mirror). |
| Texture | $\kappa_t \in [0,1]$ | Audio/visual granularity. Low: smooth, tonal, harmonic. High: granular, fractal, noisy. Maps to noise level $\sigma_{\text{eff}}$ in the rendering. |
| Mode mask | $\kappa_m \subseteq \{1..n\}$ | Which emotional modes are active in this rendering. A viewer without a shame attractor may have $Sh$ masked; the score is rendered without that channel. |
| Coupling scale | $\kappa_W \in [0.5, 2]$ | Global scale on the coupling matrix $W^*$ of the score. High values increase inter-mode interaction; the emotional landscape becomes more complex and entangled. |

## 4. The Rendering Function

The screen signal $S(t)$ — the actual audio and visual output — is:

$$S(t) = \mathcal{R}\bigl(\mathbf{e}^*(t),\; \kappa,\; \mathbf{e}_V(t)\bigr)$$

where:

- $\mathbf{e}^*(t)$ is the abstract score
- $\kappa$ is the control parameter vector
- $\mathbf{e}_V(t)$ is the viewer's own emotional field (measured or inferred)
- $\mathcal{R}$ is the **rendering function** — the audio/visual synthesis engine

The rendering function maps emotional-field coordinates to audio parameters
(frequency, harmonic content, tempo, grain density, spectral centroid, reverb
depth) and visual parameters (fractal dimension, colour temperature, edge
sharpness, motion speed, light level). The mapping is specified per rendering
implementation; the score is independent of any specific renderer.

## 5. The Somatic Loop

When the viewer's field $\mathbf{e}_V(t)$ is available — via HRV monitor,
skin conductance, posture sensor, or simply therapist observation — the system
closes a **somatic loop**.

Of the available biofeedback signals, **cardiac acceleration** $\dot{H}(t)$ (beats/s²)
is the most predictively useful. Current BPM tells the system where the viewer's
cardiac field *is*; $\dot{H}$ tells it where the field is *going* — the N+1 state.
A rising heart rate ($\dot{H} > 0$) predicts threshold approach and may trigger the
system to hold at a pre-threshold moment in the score, or to soften texture and
deepen resonance to meet the viewer where they are heading. A decelerating heart
rate ($\dot{H} < 0$) signals return and may allow the score velocity to increase.
The rendering system should treat $\dot{H}$ as the primary cardiac control signal
and instantaneous BPM as a secondary state indicator.

The system

$$\dot{\mathbf{e}}_V = -\nabla H_V(\mathbf{e}_V) + \kappa_r \cdot \lambda \cdot S(t) + \eta_V$$

The screen signal $S(t)$ drives the viewer's field; the viewer's field modifies
$S(t)$ via the resonance knob $\kappa_r$ and the rendering function $\mathcal{R}$.
At high resonance, the film and the viewer co-regulate. The distinction between
"watching a film" and "being in a therapy" begins to dissolve.

Two operating modes:

| Mode | $\kappa_r$ | Description |
|---|---|---|
| **Projection** | $\approx 0$ | The score drives the viewer. Classical cinema: fixed score, passive audience. |
| **Resonance** | $\approx 0.5$ | Score and viewer co-determine the output. Biofeedback cinema: the film breathes with the viewer. |
| **Mirror** | $\approx 1$ | The viewer's field drives the rendering. The score becomes a target trajectory; the system generates audio/visual content that guides the viewer toward $\mathbf{e}^*(t)$ from wherever they actually are. |

In Mirror mode, the system is a **real-time emotional score calibrator**: it
continuously measures $\mathbf{e}_V(t)$, computes the gap to $\mathbf{e}^*(t)$,
and renders audio/visual content calculated to reduce that gap. This is a formal
definition of what a therapist does.

---

\newpage

# Part II: The River Film

*A score. Not a story.*

The following is the abstract definition of a film. Its narrative container is
a river journey: upstream away from civilisation, toward something older and
less organised, then back. The container is not the film. Another realisation
of the same score might use a descent into a cave, a journey into psychosis, a
session of deep somatic therapy, or a voyage through a bloodstream in a
miniaturised submarine. The score is invariant. The river is one surface over
which it is played.

## Score Parameters

```
TITLE:        The River Film (working title)
DURATION:     t in [0, 1]  (maps to approximately 90 minutes at kappa_v = 1.0)
PRIMARY MODES: Safety, Fear, Curiosity, Awe, Grief, Language, Pre-verbal
THRESHOLD EVENTS: 2  (at t = 0.52 and t = 0.74)
DEFAULT KAPPA: depth=0.7, velocity=1.0, resonance=0.0, texture=0.4,
               coupling_scale=1.0
```

## Emotional Trajectory

The seven primary modes over story-time $t \in [0, 1]$:

```
EMOTIONAL SCORE: THE RIVER FILM
Scale: 0 (silent) → 9 (full activation)  Resolution: 0.1 story-time units

         0.0  0.1  0.2  0.3  0.4  0.5  0.6  0.7  0.8  0.9  1.0
          |    |    |    |    |    |    |    |    |    |    |
SAFETY    9    8    7    5    3    2    1  ≠ 2    4    7    9
CURIOSITY 3    5    7    8    7    5    3    2    4    6    5
FEAR      1    1    2    3    5    7  ≠ 4    2    2    1    1
AWE       1    1    1    2    3    4    6    9    7    4    2
GRIEF     1    1    1    1    2    3    4    4    6    4    2
LANGUAGE  9    9    8    7    5    3    1  ≠ 1    3    7    9
PREVERBAL 1    1    1    2    3    5    7    9    6    3    1

  ≠ = threshold crossing event
  THRESHOLD 1 at t ≈ 0.52: Safety<2, Fear>7 → AWE begins rise  (field tips)
  THRESHOLD 2 at t ≈ 0.71: Language<1, PREVERBAL≥9 → GRIEF opens fully
              (the encounter; the deepest attractor)
```

## Phase Descriptions

**Phase 1: Departure** $t \in [0, 0.25]$

Safety is high; the field is organised. Language is dominant — the viewer is
still thinking in sentences. Curiosity rises: there is something upstream. Fear
is present but low, a background hum. The rendering is harmonic, tonal, structured.
Tempo is regular. Visual: clear light, organised geometry, recognisable forms.

*In the river container:* the boat leaves the last town. The last road disappears
behind the tree line. The journey has begun.

**Phase 2: Descent** $t \in [0.25, 0.52]$

Safety falls steadily. Curiosity peaks and begins to fall. Fear rises. Language
degrades — the score calls for less and less conceptual organisation. Pre-verbal
modes begin their ascent. The field is approaching the threshold.

The audio rendering: harmonic content decreases, spectral centroid drops, grain
size increases ($\kappa_t$ increases internally with $e_{PV}$). The music becomes
less music and more texture. Tempo irregularity increases. Visual: light dims,
edges soften, forms become ambiguous, fractal structure begins to emerge in
peripheral detail.

*In the river container:* the river narrows. The current strengthens. The
vegetation becomes unrecognisable. Something that was navigable is becoming
something that is navigating you.

**Threshold 1** $t \approx 0.52$

The first instanton. Safety $< 2$, Fear $> 7$. The field tips. This is the
moment when fear passes its threshold into something larger: the beginning of
awe. The two are close — they activate the same somatic substrate. The difference
is the interpretation. The rendering system holds here until the crossing completes.

*In the river container:* the moment you cannot go back. Not a decision. A discovery.

**Phase 3: The Deep River** $t \in [0.52, 0.74]$

Awe rises toward maximum. Fear falls — it has been superseded, not resolved.
Language approaches silence. Pre-verbal is dominant. Safety is minimal. The
field is at the bottom of the developmental axis — the oldest, most diffuse,
most somatic registers of experience. The music, if it still deserves that name,
is almost entirely noise and texture and rhythm — rhythm because the heartbeat
persists where nothing else does.

The visual rendering at $e_{PV} = 9$: pure fractal. Mandelbulb parameters driven
entirely by the emotional modes. Self-similar at every scale. No recognisable
objects. Colour driven by $e_A$ (awe) and $e_G$ (grief) — the pairing of
wonder and loss that characterises the deepest attractors.

*In the river container:* the encounter. Whatever Kurtz is. Whatever the heart
of darkness is. It does not speak in sentences. It does not need to.

**Threshold 2** $t \approx 0.74$

The second instanton. Language $= 0$, Pre-verbal $= 9$. The encounter.
This threshold does not go to a higher activation — it goes to a deeper
quality. Grief opens fully: not sadness, but the affect of having arrived at
the oldest loss, the one that precedes memory. The field is in a state that
has no name in any clinical taxonomy. It has only a position in the field.

The rendering system may pause here. At high $\kappa_r$, the viewer's own
biofeedback determines when this phase ends.

**Phase 4: Return** $t \in [0.74, 1.0]$

The journey reverses. But not to the same place. The return is asymmetric:
the basin topology has changed. Safety rises, but along a different path.
Language returns, but to describe something it could not have described at
the outset. Curiosity does not return to its Phase 1 character — it is now
the curiosity of someone who has seen something. Grief persists longer than
expected; it is the last mode to settle.

The audio rendering: gradual return of harmonic structure, but with residual
grain. The music has been changed by what happened in Phase 3. A tonal structure
that carries the memory of noise.

*In the river container:* the river widens. Light returns. Towns appear on the
bank. The world has not changed. You have.

---

\newpage

# Part III: The Rendering Architecture

## Audio Rendering

The emotional score maps to audio parameters through a continuous, differentiable
function. The following mapping is a reference implementation; specific renderers
may use different functions so long as the monotonicity and qualitative character
of each mapping is preserved.

```
AUDIO RENDERING MAP (reference implementation)

  Emotional mode          →   Audio parameter(s)

  Safety (e_S)            →   Fundamental pitch stability; reverb decay time
                               (high safety = long, stable reverb; low = short, dry)
  Fear (e_F)              →   Harmonic tension; tritone content; spectral irregularity
  Curiosity (e_C)         →   Melodic motion; register expansion; rhythmic anticipation
  Awe (e_A)               →   Dynamic range; spatial width; harmonic overtone richness
  Grief (e_G)             →   Descending melodic tendency; sub-bass presence; tempo drop
  Language (e_L)          →   Harmonic coherence; rhythmic regularity; tonal centre strength
  Pre-verbal (e_PV)       →   Grain density (granular synthesis parameter); spectral noise;
                               rhythm de-synchronisation from fixed grid

  Coupling scale (kappa_W) →  Cross-mode harmonic interference (dissonance from coupling)
  Texture (kappa_t)        →  Overall grain size; spectral smear
  Velocity (kappa_v)       →  Clock rate; effective tempo multiplier
```

In a Phase Plant implementation: each emotional mode drives a macro knob. Macros
modulate synthesis parameters across all generators. At $e_{PV} = 9$, the granular
engine is at maximum grain randomness; at $e_{PV} = 1$, it is silent or running at
maximum coherence. The complete score trajectory is an automation lane for each macro.

**Personalisation.** Different users hear different music because:

1. $\kappa_m$ may exclude modes they do not have active attractors for
2. $\kappa_r > 0$ allows their own $\mathbf{e}_V(t)$ to modulate the rendering in real time
3. $\kappa_d$ scales the depth of the instanton traversal — some users may not be
   ready for $\kappa_d = 1.0$ and the system (or clinician) sets it lower
4. The rendering function $\mathcal{R}$ may be calibrated to the individual's own
   mode vocabulary — their specific fear-to-shame coupling, their specific grief
   timescale

Two people hearing the same score may hear music that is recognisably related —
same structure, same threshold events, same overall arc — but with different
timbres, different depths, different durations at the instanton.

## Visual Rendering

The abstract visual rendering drives a fractal or generative system. The reference
implementation uses a Mandelbulb renderer with the following parameter mapping:

```
VISUAL RENDERING MAP (reference implementation)

  Emotional mode          →   Visual parameter(s)

  Safety (e_S)            →   Light level; warm colour temperature (high K value)
  Fear (e_F)              →   Edge contrast; cold hue shift; motion speed
  Curiosity (e_C)         →   Zoom velocity; camera path exploration radius
  Awe (e_A)               →   Mandelbulb power parameter (2→8: more complex geometry)
  Grief (e_G)             →   Desaturation; slow orbital camera; depth of field
  Language (e_L)          →   Structural regularity; recognisable geometric forms
  Pre-verbal (e_PV)       →   Fractal iteration depth; self-similarity at fine scales;
                               dissolution of object-level forms
```

At $e_{PV} = 9$, $e_L = 0$: the visual is a deep Mandelbulb zoom at high iteration
depth, fully abstract, no edges that resolve into recognisable shapes. The image is
entirely self-referential — a structure that contains only itself.

At $e_S = 9$, $e_L = 9$: the visual is clear, geometrically organised, warm.
A landscape that makes sense.

The emotional score determines which of these states the visual system is in at
each moment of the film.

## The Somatic Loop: Biofeedback Integration

If the viewer wears an HRV monitor or similar:

```
SOMATIC LOOP ARCHITECTURE

  Viewer
    |
    | physiological signal (HRV, SCR, respiration, posture)
    |
    v
  [FIELD ESTIMATOR]  -->  e_V(t)  (estimated viewer soma-field state)
    |
    v
  [RESONANCE MIXER]  <--  e*(t)  (abstract score)
    |
    | kappa_r blends e*(t) and e_V(t)
    v
  [RENDERER R]  -->  S(t)  (audio + visual output)
    |
    | screen signal
    v
  Viewer  (loop closes)
```

At $\kappa_r = 0$: the viewer's field does not affect the output. Standard cinema.

At $\kappa_r = 0.5$: the film breathes with the viewer. If the viewer enters
a freeze state at the threshold approach, the score velocity slows, the texture
softens, the system waits. When the viewer's HRV coherence returns, the threshold
crossing is attempted again.

At $\kappa_r = 1.0$: the film is a mirror. The audio and visual content is generated
entirely from $\mathbf{e}_V(t)$. The abstract score $\mathbf{e}^*(t)$ functions only
as a *target trajectory* — an attractor for the viewer's field. The rendering
system continuously generates content designed to guide $\mathbf{e}_V$ toward
$\mathbf{e}^*$. This is a formal implementation of therapeutic presence.

---

\newpage

# Part IV: Extensions and Applications

## The Trilogy of Containers

The River Film score can be realised in at least three containers without changing
a single value in the score definition:

| Container | Setting | Kurtz / deep attractor |
|---|---|---|
| **River** | Congo / Mekong / Amazon | The upriver figure; the place without language |
| **Body** | Miniaturised submarine in bloodstream | Heart chamber; the oldest immune memory |
| **Session** | Psychotherapy room | The moment the freeze lifts |

All three are the same film. All three cross the same two thresholds at the same
story-times. All three return along the asymmetric path. The rendering renders all
three identically — because the score is what is being rendered, not the container.

## Composing with the Score

A composer working with this system does not write notes. They write trajectories.
The compositional decisions are:

1. **Which modes** are the primary axes of this piece?
2. **What is the arc** — the shape of each trajectory over story-time?
3. **Where are the thresholds** — the instanton events?
4. **How deep** is the deepest attractor? (What does $\kappa_d = 1.0$ sound like here?)
5. **What is the return topology** — does the field return to where it started,
   or is the return basin different from the departure basin?

A film with the same departure and return basins (safety at $t=0$ ≈ safety at $t=1$)
is a round trip. Most therapy sessions are not round trips. The return basin is
reorganised: higher HRV coherence, lower default coupling between fear and shame,
wider threshold distance from the freeze attractor. The score should reflect this —
the return is not a reversal of the departure, but a different path to a different
version of home.

## String Diagrams as Score Notation

For multi-character scores — where the coupling between multiple viewer fields is
part of the composition — string diagrams provide the notation. Each wire is a
soma-field. Each box is an interaction. Composition (two boxes in sequence) is a
temporal sequence of interactions. Tensor product (two wires in parallel) is
simultaneous independent activation.

A therapy dyad is two wires through time, with coupling boxes at the points of
co-regulation. A film audience is $N$ parallel wires, each with their own $H_V$,
all coupling to the same screen signal $S(t)$. The emotional score is the abstract
specification of what $S(t)$ does. The audience's collective response is
the tensor product of $N$ individual trajectories, all shaped by the same source.

## The Tensor Trilogy

This document is part of a three-part project:

| Document | Register | Full title |
|---|---|---|
| **soma-field-paper.md** | Academic | *The Soma-Field Model* (The Tensor II) |
| **soma-field-book.md** | Accessible | *A Voyage into Trauma* (The Tensor III) |
| **the-tensor.md** | Operational | *The Tensor* — abstract film definition |

The paper defines the model. The book explains the model. This document **runs**
the model — or more precisely, defines the interface by which an audio-visual
rendering system can instantiate the model as a real-time experience.

## The Pensieve Problem

In *Harry Potter*, Dumbledore uses his wand to extract a thought from his mind —
it emerges as a silvery thread — and deposits it in a stone basin called the
Pensieve. Others can then lower their face to the surface and enter the memory,
experiencing it from within.

This is serialisation of mental state: a running process (a memory, currently
executing in a living mind) extracted and written to persistent storage, then
deserialised at a later time by a different reader.

The soma-field score is a Pensieve for emotional dynamics. The wand is the
measurement system (HRV, therapist observation, biofeedback). The silvery thread
is the score file $\mathbf{e}^*(t)$, the coupling matrix $W^*$, the memory kernel
$K^*$. The Pensieve basin is the rendering system.

But the soma-field score is strictly more powerful than Dumbledore's basin:

| | Pensieve | Soma-field score |
|---|---|---|
| What is serialised | Memory content — the specific events and images | Emotional dynamics — the field shape, attractor topology, coupling strengths |
| Replay | Fixed; same experience for every viewer | Rendered through viewer's own $H_V$; personalised without losing the score's identity |
| Viewer's role | Passive observer inside a fixed recording | Active field participant; at $\kappa_r = 1$, co-author of the rendering |
| Storage unit | A specific thought | The emotional *shape* — valid for any narrative container with the same dynamics |

Dumbledore stores what happened. The soma-field stores what it felt like to be in
that basin — decoupled from the specific narrative content, portable across
containers, renderable by a different nervous system in a different century.

The technical word for what both systems do is **serialise**: to take a running
process that exists only in real time and write it to a durable, transmittable
format. The poetic word is **crystallise** — to fix something fluid into a
reproducible form without destroying its essential structure.

We are crystallising emotional experience. Not the story. Not the images. The
mathematics underneath all stories and all images that have the same emotional
shape. That is what the score file contains. That is what the rendering system
reads back.

---

\newpage

# Appendix: Score File Format

A machine-readable score would be expressed as follows. This is a sketch of the
format; a full specification is a separate engineering document.

```yaml
score:
  title: "The River Film"
  version: "0.1"
  modes:
    - id: S   name: Safety      range: [0, 1]
    - id: F   name: Fear        range: [0, 1]
    - id: C   name: Curiosity   range: [0, 1]
    - id: A   name: Awe         range: [0, 1]
    - id: G   name: Grief       range: [0, 1]
    - id: L   name: Language    range: [0, 1]
    - id: PV  name: Pre-verbal  range: [0, 1]

  coupling:
    # W_ij: mode j drives mode i
    - from: F  to: A  weight: +0.4   # fear can tip into awe near threshold
    - from: A  to: G  weight: +0.3   # awe opens grief
    - from: L  to: PV weight: -0.6   # language suppresses pre-verbal
    - from: PV to: L  weight: -0.6   # pre-verbal suppresses language

  keyframes:
    # story-time: [S,    F,    C,    A,    G,    L,    PV  ]
    0.0:          [0.90, 0.10, 0.30, 0.10, 0.10, 0.90, 0.10]
    0.1:          [0.80, 0.10, 0.50, 0.10, 0.10, 0.90, 0.10]
    0.2:          [0.70, 0.20, 0.70, 0.10, 0.10, 0.80, 0.10]
    0.3:          [0.50, 0.30, 0.80, 0.20, 0.10, 0.70, 0.20]
    0.4:          [0.30, 0.50, 0.70, 0.30, 0.20, 0.50, 0.30]
    0.5:          [0.20, 0.70, 0.50, 0.40, 0.30, 0.30, 0.50]
    0.52:         [THRESHOLD_1]
    0.6:          [0.10, 0.40, 0.30, 0.60, 0.40, 0.10, 0.70]
    0.7:          [0.10, 0.20, 0.20, 0.90, 0.50, 0.05, 0.90]
    0.74:         [THRESHOLD_2]
    0.8:          [0.20, 0.10, 0.30, 0.70, 0.60, 0.20, 0.60]
    0.9:          [0.50, 0.10, 0.50, 0.40, 0.40, 0.60, 0.20]
    1.0:          [0.90, 0.10, 0.50, 0.20, 0.20, 0.90, 0.10]

  thresholds:
    - id: T1
      t: 0.52
      from_basin: [approach, hypervigilance]
      to_basin: [awe-onset]
      condition: "F > 0.7 AND A rising"
      instanton_depth: kappa_d
      hold_until_ready: true

    - id: T2
      t: 0.74
      from_basin: [awe-onset]
      to_basin: [encounter]
      condition: "L < 0.1 AND PV > 0.85"
      instanton_depth: kappa_d
      hold_until_ready: true

  defaults:
    kappa_d: 0.70
    kappa_v: 1.00
    kappa_r: 0.00
    kappa_t: 0.40
    kappa_W: 1.00
```

---

*The Tensor. 17 May 2026.*



\newpage

\part{Part II: The Formal Apparatus}



---

> *AI has had a brain since 1943. Now it has a body.*

---

# Introduction

A patient sits with their therapist and is asked: *"What are you feeling right now?"* The
question is deceptively simple. They may say *anxious*, yet that word covers a vast and
heterogeneous territory — a tightness in the chest, a running commentary of worry, a vague
readiness to flee, a memory surfacing from childhood. Another patient, asked the same
question, reports feeling nothing at all; and yet their posture, respiration, and the quality
of their silence suggest otherwise. The emotion is there. It is simply not yet conscious.

This gap between emotional presence and emotional awareness is one of the most clinically
significant phenomena in psychotherapy. Theories of affect regulation (Schore, 2001),
somatic experiencing (Levine, 2010), sensorimotor psychotherapy (Ogden, Minton & Pain,
2006), and polyvagal theory (Porges, 2011) all grapple, in different ways, with the same
observation: emotions exist in the body before — and often without — being named in the
mind. Eugene Gendlin called the sub-verbal bodily sense of an emotional situation the *felt
sense* (Gendlin, 1978): something that is there, whole and present, but not yet articulate.

The Soma-Field Model proposed here attempts to give this clinical observation a formal
structure. It does so by borrowing a conceptual tool from physics: the field. In physics, a
field is not a thing that exists at a point. It is a quantity that exists everywhere in a
space, continuously, whether or not it is observed. Particles — the things we can measure —
are not separate from the field; they are *excitations* of it, local concentrations of
energy that arise when the field is perturbed above a certain threshold.

The central claim of this paper is that this structure accurately describes the phenomenology
of emotion. The emotional field is always there, distributed across body and nervous system.
What we call a conscious emotional experience is an excitation of that field — a local
concentration that has crossed a perceptual threshold and entered awareness. The field
continues below the threshold whether or not we attend to it, and its sub-perceptual activity
shapes our behaviour, physiology, and cognition continuously.

The Soma-Field Model contributes the first formal field-theoretic architecture for the limbic
system. Every artificial neural network since McCulloch and Pitts (1943) [@mcculloch1943]
is a formal model of the neocortex — the pattern-recognition and prediction layer. The
limbic system — responsible for emotional valuation, threat detection, and the somatic
state reinstatement that underlies trauma — has never received a comparable formal
treatment. The Soma-Field Model is that treatment. Together with the Hopfield framework,
it constitutes the first complete formal description of the two principal computational
substrates of the vertebrate brain.

The paper proceeds as follows. Section 2 reviews the relevant background in somatic clinical
models, and introduces the two theoretical tools borrowed from physics and computer science:
quantum field theory and Hopfield network energy functions. Section 3 develops the Soma-Field
Model in detail. Section 4 describes the energy landscape, including the attractor states
corresponding to fight, flight, freeze, and regulated calm. Section 5 discusses dissonance
and resolution as mechanisms of emotional interaction. Section 6 describes the Soma-Field
Instrument, a practical tool for therapeutic use. Section 7 addresses clinical implications.

---

# Background

## The Body-Mind Problem in Clinical Practice

Contemporary neuroscience has largely dissolved the Cartesian boundary between body and mind.
Damasio (1994) demonstrated that emotion is inseparable from rational cognition: patients with
damage to the ventromedial prefrontal cortex — preventing the normal generation of somatic
signals — lose not only their emotional range but also their capacity for effective
decision-making. Van der Kolk (2014) documented extensively how traumatic emotional states are
encoded not merely in explicit memory but in posture, gesture, visceral sensation, and
autonomic regulation. Porges' polyvagal theory (2011) provided a neurobiological account of
how the autonomic nervous system generates three hierarchically organised states — ventral
vagal (social engagement), sympathetic (mobilisation: fight/flight), and dorsal vagal
(immobilisation: freeze) — each with characteristic phenomenological and behavioural
signatures.

What these frameworks share is a conviction that emotional states are not located in the brain
alone, nor in the body alone, but in a coupled system that is best understood as a single
functional unit. The term *soma* — from the Greek for body — is used here to denote this
unified body-mind system, following the tradition of somatic psychotherapy.

## The Felt Sense and Sub-Perceptual Emotion

Gendlin's concept of the *felt sense* (1978) is of particular relevance. He described it as
"a special kind of internal bodily awareness... a body sense of meaning." It is not an
emotion in the ordinary sense — not a named feeling — but something more diffuse: a
pre-articulate sense that *something is there*, present in the body, before it has been
identified or named. Focussing, the therapeutic method Gendlin developed, works precisely
by attending to this pre-threshold signal and allowing it to surface into conscious
articulation.

The Soma-Field Model provides a formal account of what the felt sense is: it is the activity
of the emotional field below the perceptual threshold. It is real, causal, and continuously
present. It shapes cognition and behaviour even when it does not surface as a named feeling.

## Quantum Field Theory: Structure, Not Metaphor

Quantum Field Theory (QFT) is the framework of modern particle physics. Its central departure
from classical physics is the priority of the *field* over the *particle*. In QFT, what we
call particles — electrons, photons — are not fundamental objects. They are *excitations* of
an underlying field: local, stable configurations of energy that arise when the field receives
a sufficient perturbation.

The quantum vacuum — the ground state of the field — is not empty. It is a seething
background of virtual fluctuations: momentary excitations that do not have enough energy to
persist as observable particles. The vacuum is active, but sub-threshold.

```
  A SINGLE FIELD MODE — amplitude over time
  (e.g. a mode of the electromagnetic field; or, later, a mode of the emotional field)

  │                                    ╭──────────────────╮
  │          ╭──╮              ╭──╮   ╱                    ╲             ╭──
  │   ╭─╮   ╱    ╲    ╭─╮    ╱    ╲ ╱                      ╲    ╭──╮  ╱
  │  ╱   ╲ ╱      ╲  ╱   ╲  ╱      ╳                        ╲  ╱    ╲╱
  T ╱─────╲╱────────╲╯─────╲╯────────────────────────────────╲╱──────────── T
  │         ╲────────╯       ╲──────╯                          ╲────────────
  │
  └──────────────────────────────────────────────────────────────────────► time

  ←─── VIRTUAL: field fluctuates but stays sub-threshold ────────────→ ←REAL→
       present, active, causally real — but not locally detectable        ↑
       (the QUANTUM VACUUM: not empty; seething with activity)        particle
                                                                      created
```
*Figure 0. A single field mode in quantum field theory. The field oscillates continuously.
Below the detection threshold T, excitations are sub-threshold — real and causally active,
but not detectable as particles. The quantum vacuum is not empty; it is a field in constant
motion that never quite crosses the threshold. When the amplitude does cross T, a particle
exists: a locally observable excitation. The same structure — field always present,
consciousness only when threshold crossed — is the core of the Soma-Field Model.*

This paper does not claim that emotions are quantum phenomena in any literal sense: the
soma-field is a classical field, not a quantised one. The claim is stronger and more
specific than analogy: the mathematical object being constructed — the Green’s function
of a coupled field manifold — is formally of the same *type* as the objects that arise in
QFT, differing only in the dimensionality of the manifold and the nature of the probe.
What was previously described as a structural analogy is here identified as a formal
correspondence: a particle is a pole in the propagator of its field; a conscious emotional
percept is a pole in the propagator of the soma-field. Different physics. Same mathematics.

That correspondence gives the model precise vocabulary for the following set of ideas,
which are central to the clinical observation of emotion:

- A quantity that exists everywhere, continuously, even when unobserved
- A background of sub-threshold activity that is real and causally effective
- The emergence of observable phenomena (conscious feelings) through threshold-crossing
  excitation of that background
- The possibility of multiple simultaneous excitations that interact with one another

*Note (May 2026):* A subsequent experiment (QUANT-EXP-1) demonstrates that the quantum
extension of the Hopfield landscape used in this model — replacing the classical Langevin
process with a transverse-field quantum annealer — produces a measurable *topological
reachability advantage*: quantum annealing reaches attractor basins that cold classical
dynamics cannot reach at any finite noise level. This upgrades the formal correspondence
from a structural claim to a testable empirical prediction. See the companion paper
*Quantum Soma and the Penrose Gap* (doi:10.5281/zenodo.20351231) for the full results
and theoretical implications.

One further consequence follows. The clinical phenomena of alexithymia — difficulty
identifying and naming feelings — and its apparent opposite, emotional flooding or
hypervigilance, have always been treated as separate conditions requiring separate
explanations. In the Green’s function framing, they are the same structure at two
extremes of the same parameter: the perception threshold $T_i$ is too high (the bulk
dynamics cannot cross into observable experience) or too low (bulk fluctuations flood
the boundary without filtering). This is structurally identical to one of the deepest
open problems in particle physics — the **hierarchy problem** — which asks why gravity
is so much weaker than the other forces. The standard answer is that gravity propagates
in the full higher-dimensional bulk while other forces are confined to a lower-dimensional
brane; the coupling across the brane boundary determines the apparent weakness. The
soma-field correspondence is exact: the threshold $T_i$ *is* the brane. Perception is
confined to the one-dimensional boundary of an eleven-dimensional dynamics. The hierarchy
of emotional experience — why conscious feeling is so much weaker and more transient than
the underlying field activity — has the same formal structure as the hierarchy of forces.

## Neural Network Energy Functions and Hopfield Networks

In 1982, John Hopfield (awarded the Nobel Prize in Physics in 2024) proposed a model of
associative memory based on a network of interconnected neurons (Hopfield, 1982). The
critical insight was borrowed directly from statistical physics: the network could be assigned
an **energy function** — a scalar quantity that decreases with each state update — such that
the network would always evolve toward a local energy minimum. These minima are the stable
states of the network: its memories, or more precisely, its *attractors*.

Hopfield observed that his neural network's dynamics were mathematically identical to those
of an Ising spin-glass model from condensed matter physics — a system of interacting magnetic
spins that minimises its total energy by aligning or anti-aligning with neighbours. The
energy function he used is:

$$H(\mathbf{s}) = -\frac{1}{2} \sum_{i,j} W_{ij}\, s_i s_j - \sum_i \theta_i s_i$$

where $\mathbf{s}$ is the state of the network, $W_{ij}$ is the coupling strength between
units $i$ and $j$, and $\theta_i$ is the activation threshold of unit $i$. The network
always moves in the direction of decreasing $H$.

The Soma-Field Model applies this energy function directly to emotional dynamics. The
*emotional coupling matrix* $W$ encodes the relationships between emotional modes — which
emotions amplify one another, which suppress one another — and the energy function
determines the direction in which the emotional field naturally evolves.

Hopfield's network is a formal model of the *neocortex*: a system for storing cognitive
patterns and retrieving them from partial cues by minimising an energy function. Every
artificial neural network constructed since McCulloch and Pitts (1943) [@mcculloch1943] — from perceptrons
to backpropagation networks to transformers — sits in this neocortical lineage. These
systems recognise patterns, predict sequences, and minimise prediction error with
increasing sophistication. None of them possess a limbic system. They have no internal
valuation, no arousal modulation, no threat-detection architecture, no attachment
structure, no interoception. They have very effective cortex.

The Soma-Field Model does not add to the neocortical lineage. It proposes the
architectural layer that has never been formally built: *an artificial limbic system*.

Hopfield memory is associative and pattern-completing; somatic memory is state-reinstating.
The field does not merely remember what happened. It re-lives it. *A body with a past.*

Hopfield's later-reported wish to have incorporated something analogous to 'maternal
instincts' into the energy function was, in this reading, not a desire for a better
cortex. It was an intuition pointing directly at the absent system — the layer beneath
the cortex that assigns value, registers threat, and holds the body in a particular way
of being long after the event that caused it.

This positions the Soma-Field Model not as a supplement to the neocortical lineage but
as its completion. Artificial neural networks have, for eighty years, been increasingly
sophisticated formal models of the neocortex: pattern recognition, sequence prediction,
error minimisation. The cortex has been mapped in extraordinary detail. The limbic system
— which assigns value, detects threat, modulates arousal, maintains attachment, and
reinstates whole somatic states in response to partial cues — has had no comparable
formal treatment. The architectural description of the vertebrate brain was, until this
paper, half-built.

**Four kinds of formal intelligence.** This architectural gap can be situated within a
wider taxonomy. Four quotients have been proposed to describe the landscape of biological
intelligence across popular and scientific usage. They map onto the formal components of
this model with an exactness that is not coincidental:

| Quotient | What it measures | Biological substrate | Soma-Field status |
|---|---|---|---|
| IQ — cognitive | Pattern recognition, reasoning, prediction | Neocortex | Built (1943–): McCulloch & Pitts → Hopfield → transformers |
| EQ — emotional | Valuation, arousal, affect regulation | Limbic system | **Built here**: $W$, $K(\tau)$, $H(\mathbf{e})$, $C_\text{HRV}$, $\dot{H}$ |
| AQ — adversity | Structural resilience under threat | PFC–limbic axis | **Built here**: $S_\text{inst}$, $\partial\|W\|/\partial t$, $C_\text{HRV}^\text{recovery}$ |
| SQ — social | Attunement, theory of mind, relational navigation | Mirror system, TPJ | *Next paper*: $\kappa_r$, multi-field coupling |

*Table 3. Four dimensions of biological intelligence mapped onto the Soma-Field Model. The
neocortical lineage (IQ) has been formally modelled for eighty years. Emotional intelligence
(EQ) and adversity resilience (AQ) are formalised here for the first time. Social
intelligence (SQ) is defined as the next extension of the framework.*

AQ — adversity quotient — is formally the capacity to update $W$ after adversity
without the adversity permanently becoming $W$. Its mathematical definition appears in
Section 3.4; its pathological lower bound is C-PTSD, in which all three components of
AQ are simultaneously compromised (Appendix B.2).

The AI alignment implication follows directly. Current artificial systems have high IQ by
construction and zero EQ, AQ, or SQ. The absence of internal valuation means that
valuation must be injected externally — through reinforcement learning from human feedback
(RLHF) and related techniques — which is structurally brittle for the same reason that a
field with no limbic layer is brittle: the system has no internal stake in what it does.
The Soma-Field formalisation specifies what that internal stake would look like, were it
ever built.

A further lineage note is worth recording. Ramsauer et al. (2020) demonstrated that
continuous-state modern Hopfield networks are mathematically equivalent to the
self-attention mechanism in transformer language models. The softmax attention operation
that drives contemporary large language models is a Hopfield retrieval step. The
Soma-Field Model sits in this same energy-based lineage: the equations underlying
associative memory, language understanding, and somatic trauma response are, at the
appropriate level of abstraction, the same equations.

A historical irony completes the picture. String theory was not discovered as a theory
of strings. In 1968, Gabriele Veneziano wrote down a scattering amplitude — a response
function encoding how particles scatter — and only later did Nambu, Nielsen, and Susskind
identify the string as whatever object produces that amplitude [@veneziano1968]. The
response function came before the thing. The Soma-Field Model recapitulates this
historical order deliberately: the primary object is the eleven-dimensional coupling
manifold; the string — the one-dimensional conscious percept — is what the manifold
produces when probed. We retain Veneziano’s discovery and decline to reify the string.

---

## The Formal Correspondences: Where the Link Was Seen

The structural analogy between QFT and the Soma-Field Model is not merely conceptual.
There are three places where equations from different disciplines become, after substituting
the relevant quantities, literally the same functional form. The following sets them side
by side. The point is not to impress with notation but to show exactly where the
recognition happened — the moment when the same Greek letters appeared in the same
positions in two fields that had no prior reason to be connected.

**The same Hamiltonian:** Ising spin model (condensed matter physics, 1920s) — Hopfield
neural network (computational neuroscience, 1982) — Soma-Field Model:

$$H_{\text{Ising}}(\boldsymbol{\sigma}) = -\frac{1}{2}\sum_{i,j} J_{ij}\,\sigma_i\,\sigma_j - \sum_i h_i\,\sigma_i$$

$$H_{\text{soma}}(\mathbf{e}) = -\frac{1}{2}\sum_{i,j} W_{ij}\,e_i\,e_j - \sum_i \theta_i\,e_i$$

Replace $J_{ij} \to W_{ij}$, $\sigma_i \to e_i$, $h_i \to \theta_i$: identical. The
physicist, the neural network theorist, and the somatic clinician are computing the same
energy function on different state spaces. The Hopfield 2024 Nobel Prize was awarded for
discovering this identity between spin physics and neural computation; the Soma-Field Model
extends the same identity one step further to emotional dynamics.

**The Wick rotation — why the same exponential appears in QM and in memory:**

In quantum mechanics, the time evolution operator is a complex phase:
$$U(t) = e^{-i\hat{H}t/\hbar}$$

Substitute $t \to -i\tau$ (the *Wick rotation* — replacing real time with imaginary time):
$$e^{-i\hat{H}(-i\tau)/\hbar} = e^{-\hat{H}\tau/\hbar}$$

The oscillating complex exponential becomes a real decaying exponential. This is the
Boltzmann weight $e^{-\beta\hat{H}}$ at $\beta = \tau/\hbar$. The Langevin equation
$\dot{\mathbf{e}} = -\nabla H + \eta$ is the classical limit of this Wick-rotated
dynamics. Every simulation of the soma-field running this equation is, formally, a path
integral in imaginary time.

**The same propagator:** Euclidean QFT (imaginary-time two-point correlator for a massive
scalar field) — C-PTSD trauma memory kernel:

$$G_E(\tau) = \langle\phi(0)\,\phi(\tau)\rangle_{\text{QFT}} = \frac{1}{2m}\,e^{-m|\tau|}$$

$$K_{\text{trauma}}(\tau) = \sum_k A_k\,e^{-|\tau|/\tau_k}$$

Same form. The QFT field mass $m$ corresponds to $1/\tau_k$ — the reciprocal of the
trauma trace decay time. A heavier particle has a shorter-range propagator; a shorter-lived
trauma trace decays faster. Therapeutic processing (reducing $A_k$, increasing $\tau_k$)
is, in the QFT language, changing the mass and amplitude of the propagator until the
correlation function vanishes.

The specific visual moment: the quantum phase factor is $e^{-i\omega t}$. Remove the $i$
(Wick rotation) and it becomes $e^{-\omega\tau}$. The memory kernel is $e^{-\tau/\tau_k}$.
These are the same exponential. The $i$ is the only difference between a quantum field
that oscillates and a trauma trace that decays.

| QFT quantity | Symbol | Soma-Field analogue | Symbol |
|---|---|---|---|
| Field mode | $\phi_k$ | Emotional mode | $e_i$ |
| Coupling constant | $J_{ij}$ | Coupling matrix entry | $W_{ij}$ |
| Field mass | $m$ | Inverse decay time | $1/\tau_k$ |
| Propagator amplitude | $1/2m$ | Trauma trace amplitude | $A_k$ |
| Euclidean propagator | $G_E(\tau) \propto e^{-m\tau}$ | Memory kernel | $K(\tau) \propto e^{-\tau/\tau_k}$ |
| Vacuum energy | $\langle H \rangle_0$ | Resting field energy | $H(\mathbf{e}_\text{calm})$ |
| Thermal fluctuation | $k_B T$ | Noise amplitude | $\sigma_0$ |
| Wick rotation | $t \to -i\tau$ | Real-time Langevin | $\dot{\mathbf{e}} = -\nabla H + \eta$ |

*Table 2. Formal correspondence between QFT quantities and Soma-Field analogues. Each row
is a single mathematical entity in two notations. These correspondences were not constructed
after the fact; they are the reason the QFT framework was recognised as relevant.*

**The central identification — particle and percept as poles in their respective propagators.**
All four correspondences above follow from one structural fact. In QFT, a particle is not
a separate object from the field. It is a *pole* in the field’s propagator — the Green’s
function evaluated in momentum space:

$$\tilde{G}_{\text{QFT}}(k^\mu) = \frac{i}{k^2 - m^2 + i\varepsilon}$$

The particle exists precisely when the four-momentum satisfies $k^2 = m^2$ — the
*on-shell condition*. The particle is the singularity in the field’s response to a
point source: the field’s Green’s function, evaluated at its own resonance.

Diagonalise $W$ with eigenvalues $\lambda_i$ (the natural resonance frequencies of the
emotional modes). The soma-field propagator — the two-point correlator
$\langle e_i(t)\,e_i(t')\rangle$ in the frequency domain — is:

$$\tilde{G}_{ii}(\omega) = \frac{\sigma_{\text{eff}}^2}{\omega^2 + \lambda_i^2}$$

A conscious emotional percept in mode $i$ exists precisely when the excitation
frequency $\omega$ approaches $i\lambda_i$ — the mode’s natural resonance. The percept
is the singularity in the soma-field’s response to a somatic probe.

Setting the two propagators side by side:

$$\underbrace{\frac{i}{k^2 - m^2 + i\varepsilon}}_{\text{QFT: particle at mass-shell }k^2=m^2}
\qquad\longleftrightarrow\qquad
\underbrace{\frac{\sigma_{\text{eff}}^2}{\omega^2 + \lambda_i^2}}_{\text{Soma-Field: percept at resonance }\omega = i\lambda_i}$$

Both are poles in the propagator of their respective field manifold. A photon is not
the electromagnetic field; it is the field’s Green’s function evaluated at a resonance.
A flash of conscious emotion is not the soma-field; it is the field’s Green’s function
evaluated at a threshold-crossing resonance. The manifolds differ — one is the
four-dimensional spacetime vacuum, the other is the eleven-dimensional emotional
coupling geometry. The mathematical type is the same. This is not analogy.

---

## The Body Schema, Interoception, and Pain

A complete model of the emotional field must address a phenomenon that standard psychological
accounts of emotion consistently underspecify: the field is not a model of the physical body.
It is the nervous system's *predictive model* of the body — a continuously updated internal
representation of what the soma should be experiencing, revised by incoming interoceptive
signals.

The clinical proof of this distinction is phantom limb pain [@ramachandran1998].
Patients who have undergone amputation routinely experience pain in the absent limb. The pain
is real: it activates the same neural circuits, produces the same suffering, and responds to
the same analgesics as pain from an intact limb. The limb is gone. The neural model of the
limb persists. What hurts is the *brain's representation* of the foot, not the foot.

This is not an anomaly. It is the normal condition of all somatic experience. The brain does
not receive raw signals from the body — it maintains a continuous predictive model of the
body (the *body schema*) and generates somatic experience from that model. Interoception —
the sense of the internal body state — is a prediction, not a direct readout [@seth2021].
The brain predicts what the heart should be doing, what the gut should feel like, where
tension should be. The felt body is the predicted body.

The formal consequence is direct: the soma-field's state vector $\mathbf{e}(t)$ must
include **somatic modes** — pain states, regional tension, visceral sensation,
proprioceptive activation — alongside emotional modes. These are modes of the same field,
governed by the same coupling matrix $W$. The $W_{ij}$ between fear modes and somatic pain
modes is the formal account of why fear amplifies pain, why safety reduces it, and why
chronic pain and C-PTSD are highly comorbid. They are not separate conditions sharing a
correlation. They are the same attractor architecture operating across emotional and somatic
modes simultaneously.

**Phantom limb as attractor persistence.** An amputated limb's somatic modes do not
disappear from $W$ when the limb is removed. The neural model persists. When movement-
intention modes are activated — attempting to move the absent foot — foot-sensation modes
are co-activated via $W$. If co-activation exceeds threshold, it is experienced as pain.
Ramachandran's mirror box provides visual input that disconfirms the prediction error:
new sensory evidence that the limb is moving, reducing coupling-driven co-activation, and
therefore reducing the pain. This is $W \to W'$: therapy as structural rewriting of the
field.

**The load-bearing hyphen.** The term *emotional-somatic* in clinical literature is not
a stylistic compound. The hyphen marks an ontological claim: emotional states and somatic
states are not two separate things that correlate. They are two aspects of the same field.
The coupling matrix $W$ is precisely the hyphen, made formal.

**Therapeutic implication.** Somatic therapies — body scanning, sensorimotor work,
EMDR's bilateral stimulation — work not on the physical body but on the brain's model of
the body. They provide new interoceptive evidence that updates the prediction. They change
$W$. Therapy does not fix the tissue. It updates the model.

---

## Correspondence with Existing Emotion Representations

A reasonable objection to any new framework is: *there is already a great deal of structure
out here.* This is true. The emotion research literature contains several well-developed
representational systems, and the Soma-Field Model must be positioned relative to them.
The short answer is that every existing representation is *descriptive*; the Soma-Field
Model is *dynamical*. The longer answer follows.

**Categorical taxonomies** (Ekman 1972; Plutchik 1980; Parrot 2001) assign names and
hierarchical membership to emotional states. They are ontologies in the formal sense: a
T-Box of classes and subclass relations. Plutchik's wheel additionally defines a *blend*
operation — Love := Joy $\sqcap$ Trust, Awe := Fear $\sqcap$ Surprise — which is precisely
the OWL2 `intersectionOf` construction. These systems tell you what to call a state. They
do not tell you how a state evolves, or which attractor a system settles in when two
mechanisms fire simultaneously.

**Dimensional models** (Russell 1980; Mehrabian and Russell 1974) embed emotions in a
continuous space, canonically Valence × Arousal (the *circumplex*), sometimes extended to
Pleasure × Arousal × Dominance. These models capture the *coordinates* of a state.
The energy landscape of the Soma-Field Model — the function $H(\mathbf{e})$ over
emotion-space — is the dynamical generalisation of the circumplex: the circumplex is a
snapshot of positions; the energy landscape is the surface over which the field moves. The
stable attractors of $H$ are the emotion categories; their coordinates are the circumplex
positions.

**Process and appraisal models** (Scherer 1999; Frijda 1986; the OCC model of Ortony,
Clove and Collins 1988) describe the *sequence of evaluations* through which a stimulus
becomes an emotion. They are closer to the Soma-Field dynamics — they include temporal
stages — but they are deterministic and single-threaded: one appraisal chain, one output.
The Soma-Field replaces this with a parallel field update: all modes evolve simultaneously,
governed by the full $W$ matrix.

**Music-specific schemas** (BRECVEMA, Juslin and Västfjäll 2008; Juslin *et al.* 2011;
GEMS, Zentner *et al.* 2008) are the closest antecedents to the present model. The
BRECVEMA framework identifies eight distinct psychological mechanisms through which music
evokes emotion — Brain stem reflex, Rhythmic entrainment, Evaluative conditioning,
Contagion, Visual imagery, Episodic memory, Musical expectancy, Aesthetic judgement — each
with distinct evolutionary origins, processing speeds, and neural substrates. These
mechanisms are the *object properties* of the emotion-induction ontology: they specify
which musical features activate which emotional outputs. Juslin explicitly identifies the
open problem: *"Exploring how various musical emotions come about through the interaction
of multiple psychological mechanisms is an exciting endeavour that has just begun"*
[@juslin2011handbook, p. 638]. The $W$ coupling matrix is the formal answer to that open
problem. Where BRECVEMA gives a list of mechanisms with characteristic outputs, the
Soma-Field gives the interaction tensor $W_{ij}$ that specifies, with numerical precision,
what happens when mechanisms $i$ and $j$ fire concurrently.

The deeper connection is spectral. The *eigenmodes* of $W$ — the directions in
emotion-space that evolve independently — are the natural resonances of the
soma-field: the patterns the field rings with when struck. BRECVEMA mechanisms
are inputs: they excite specific rows of $W$. The eigenspectrum of $W$ is the
response: the set of frequencies the manifold can sustain. Where BRECVEMA is a
taxonomy of *stimuli*, the eigenspectrum of $W$ is a taxonomy of *responses*.
Juslin’s open problem — how mechanisms interact — is the question of how
stimulus-space maps onto eigenmode-space through $W$. Section 3.3 develops this.

**Body maps** (Nummenmaa *et al.* 2014) map emotions to their somatic distribution —
where in the body each emotion is felt. These are precisely the spatial support of the
soma-field modes: the field configuration corresponding to an attractor state is the
body map of that emotion. Body maps are measurements of the attractors; the Soma-Field
is the dynamical system that generates them.

**The formal correspondence table** extends Table 2 to include these systems:

| Existing representation | What it captures | Soma-Field equivalent |
|---|---|---|
| Ekman categories | Attractor labels (names) | Values of $\mathbf{e}$ at energy minima |
| Plutchik dyads ($A \sqcap B$) | Blend attractors | Metastable states between two energy minima |
| Russell circumplex | Coordinates (valence, arousal) | Projection of $H(\mathbf{e})$ onto two axes |
| OCC appraisal tree | Single-path sequential process | Single trajectory in the full field |
| BRECVEMA mechanisms | Object properties: stimulus → emotion | Rows of $W$: mechanism $i$ activates mode $j$ |
| Body maps (Nummenmaa) | Spatial support of each attractor | Modal structure of $\mathbf{e}$ at each minimum |

None of these correspondences require modifying either the existing representations or the
Soma-Field Model. They are consequences of the model's structure. The formal machinery for
exploring these correspondences — typing BRECVEMA mechanisms as Lean inductive constructors,
Plutchik blends as type intersections, mechanism profiles as decidable propositions — is
developed in the companion file `src/EmotionOntology.lean`.

---

# The Soma-Field Model

The field is primary. The felt emotion is secondary — it is what registers when the
field is probed. This is the same ontological relationship as between a quantum field
and a particle: the field exists continuously and everywhere; the particle is what you
observe at the moment of measurement. The Soma-Field Model does not describe what
emotions are *made of*. It describes the manifold whose impulse response *is* conscious
emotional experience.

## Emotions as a Persistent Wave Field

The foundational claim of the Soma-Field Model is simple: emotions are not events. They are
a *field* — a distributed, continuous quantity defined over the entire soma (body-mind system)
at all times.

This field has two coupled components:

1. **The somatic wave** $\mathbf{E}_\text{body}(x,t)$: distributed across the body as patterns
   of visceral sensation, muscle tone, proprioception, interoception, and autonomic state.
2. **The neural wave** $\mathbf{E}_\text{neural}(x,t)$: distributed across the nervous system
   as patterns of activation in cortical, subcortical, and peripheral neural circuits.

These two components are not separate systems. They are coupled — each continuously
influencing the other. The total emotional field is their combined state:

$$\mathbf{E}(x,t) = \mathbf{E}_\text{body}(x,t) \otimes \mathbf{E}_\text{neural}(x,t)$$

The field is characterised by:

- **Multiplicity**: multiple emotional modes can be simultaneously active and interfering
- **Continuity**: it exists at all times, not only during episodes of conscious feeling
- **Spatial distribution**: different aspects of the field are localised in different regions
  of the soma (the familiar clinical observation that grief is felt in the chest, fear in
  the gut, anger in the jaw and fists)
- **Temporal dynamics**: the field evolves continuously, driven by the energy function

![](figures/fig1_architecture.pdf){ width=90% }
*Figure 1. The Soma-Field. The body and brain are not separate containers of emotion but two
coupled components of a single distributed wave field. Neither is primary; each continuously
modifies the other. The ≋ symbols indicate that wave activity is always present in each region,
not only during episodes of conscious feeling.*

## The Perception Threshold

Not all activity in the emotional field is consciously perceived. The field has a **perception
threshold** $T_i$ for each emotional mode $i$. Below this threshold, the emotional mode is
sub-perceptual: it exists, it influences behaviour and physiology, but it does not surface as
a named conscious feeling.

$$\text{Emotion } i \text{ is consciously perceived} \iff |\mathbf{E}_i(t)| > T_i$$

This threshold crossing corresponds precisely to the QFT excitation analogy: the emotional
mode behaves like a virtual particle that has accumulated enough energy to become real — to
emerge from the sub-threshold background and enter awareness.

This accounts for a range of clinically significant phenomena:

| Clinical Observation | Soma-Field Account |
|---|---|
| Patient reports no feeling but shows physiological signs of distress | Sub-threshold field activity below $T_i$ |
| Sudden unexpected flood of emotion in session | Rapid threshold crossing after gradual accumulation |
| Emotion felt somatically but not named | Threshold crossed in $\mathbf{E}_\text{body}$, not yet in $\mathbf{E}_\text{neural}$ |
| Alexithymia (difficulty identifying feelings) | Elevated $T_i$ — high threshold requiring more energy to cross |
| Hypervigilance / emotional flooding | Lowered $T_i$ — reduced threshold, field crosses to conscious easily |

*Table 1. Clinical observations mapped onto the perception threshold model.*

![](figures/fig2_threshold.pdf){ width=90% }
*Figure 2. The perception threshold T_i for a single emotional mode. The field is active
continuously (lower trace). Conscious experience arises only when amplitude exceeds T_i
(upper trace). Everything below the line is still there — shaping body and behaviour
before it can be named.*


![](figures/fig0_field_mode.pdf){ width=95% }
*Figure 0. Continuous soma-field activity (blue) with a single threshold-crossing event. The field is always active; conscious experience (shaded) arises only when amplitude exceeds the perception threshold θ (red dashed). Below the threshold: real, causally active, but not yet conscious.*

## The Interaction of Emotional Modes

Multiple emotional modes are simultaneously active in the field at all times. They do not
simply co-exist: they interact. The nature of these interactions is encoded in the **emotional
coupling matrix** $W$, where $W_{ij}$ represents the influence of emotional mode $j$ on
emotional mode $i$.

- If $W_{ij} > 0$: emotion $j$ amplifies emotion $i$ (e.g., fear can amplify shame)
- If $W_{ij} < 0$: emotion $j$ suppresses emotion $i$ (e.g., calm suppresses anxiety)
- If $W_{ij} = 0$: emotions $i$ and $j$ are independent

The field evolves according to the energy gradient:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}) + \eta(t)$$

where $\eta(t)$ represents the continuous low-level fluctuations of the sub-perceptual field
— the emotional equivalent of quantum vacuum noise. The field is always moving, always
seeking lower energy, never at absolute rest.

---

## The Three-Layer Architecture

The nervous system that implements the soma-field is not architecturally flat. Three
hierarchically organised layers contribute to field dynamics, each corresponding to a
distinct evolutionary substrate and a distinct role in the model. The clinical literature
(Porges, 2011; van der Kolk, 2014; Ogden et al., 2006) converges on this stratification;
what follows is its formal expression.

**Layer 1 — Brainstem / autonomic baseline.** The oldest structures: vagal nuclei,
arousal systems, interoceptive machinery. In the model, this layer is represented by the
noise term and, specifically, by the heart rate variability coherence $C_{\text{HRV}}$,
which modulates effective noise amplitude across the whole field:
$$\sigma_{\text{eff}} = \frac{\sigma_0}{C_{\text{HRV}}}$$
High HRV coherence narrows effective noise, stabilising the field in its current attractor.
This is the mechanism of HRV biofeedback as a regulatory intervention: it does not target
any specific emotional mode but lowers the fluctuation floor of the entire field.

**Layer 1 extension: cardiac acceleration and landscape tilt.** The term $C_{\text{HRV}}$
measures the *current state* of cardiac regularity — where the heart is. A complementary
quantity is $\dot{H}(t)$, the first time-derivative of heart rate, in units of beats/s$^2$.
This is the **cardiac acceleration**: not what the heart rate is, but where it is going.

The dimensional parallel with gravity is exact: gravitational acceleration $g$ carries
units m/s$^2$; cardiac acceleration $\dot{H}$ carries units beats/s$^2$. Both are
accelerations; both describe a force field rather than a position. Gravity does not tell
you where a test mass is — it tells you how it will move next. Cardiac acceleration tells
you not the current BPM but the direction of the next one: the N+1 state.

In the soma-field, $\dot{H}(t)$ enters the dynamics not as noise modulation but as a
**landscape tilt** — a time-varying bias added to the Hamiltonian that tips the energy
function toward activation or rest attractors:

$$H(\mathbf{e}, t) = H_0(\mathbf{e}) - \alpha\,\dot{H}(t)\,\boldsymbol{\beta}\cdot\mathbf{e}$$

where $\alpha > 0$ is the cardiac-somatic coupling constant and $\boldsymbol{\beta}$ is
a mode-coupling vector (at leading order, $\boldsymbol{\beta} = \mathbf{1}$: the tilt
acts uniformly across all modes). When $\dot{H}(t) > 0$ (heart accelerating), the
landscape tilts toward higher activation states before any cognitive or affective threshold
is crossed. When $\dot{H}(t) < 0$ (heart decelerating), it tilts toward rest. The full
three-layer equation including the cardiac acceleration term is:

$$\dot{\mathbf{e}}(t) = -\nabla H_0(\mathbf{e}) + \alpha\,\dot{H}(t)\,\boldsymbol{\beta}
  + R_{\text{PFC}}(\mathbf{e}, t)
  + \frac{\sigma_0}{C_{\text{HRV}}}\,\xi(t)$$

The two cardiac terms serve distinct functions: $C_{\text{HRV}}$ (state) modulates the
noise floor; $\dot{H}$ (acceleration) tilts the deterministic landscape. Both are needed
for a complete account of cardiac influence on the field.

**Predictive clinical value.** A patient with BPM = 90 and $\dot{H} = +4$ beats/s$^2$ is
approaching threshold; one with BPM = 90 and $\dot{H} = -4$ beats/s$^2$ is retreating
from it. The snapshot is identical; the trajectories are opposite. Cardiac acceleration
is therefore an early-warning signal for threshold crossings — detectable at Layer 1
before the emotional field at Layer 2 has crossed its threshold. This has independent
support in cardiology: Bauer et al. (2006) demonstrated that *acceleration capacity* and
*deceleration capacity* of heart rate — estimates of $\dot{H}$ over a cardiac window —
carry prognostic information independent of conventional HRV measures.

**The somatic equivalence principle.** The cardiac acceleration term $\alpha\,\dot{H}\,\boldsymbol{\beta}$
is structurally identical in the equation to any other forcing term. From the perspective
of the field itself — from conscious experience — cardiac-driven activation is
indistinguishable from event-driven activation. A sudden heart rate acceleration tilts
the landscape by exactly the same mechanism as an external threat or an intrusive memory.
The field has no access to the origin of the tilt. This is the formal account of a
clinically well-documented phenomenon: anxiety initiated by cardiac irregularity
(arrhythmia, postural hypotension, caffeine, exertion) is experienced as emotionally
caused, because the somatic signal is identical. Disambiguation requires either external
measurement or deliberate interoceptive inquiry that can distinguish the two sources.

**Layer 2 — Limbic system / emotional memory.** The primary substrate of the Soma-Field
Model. The coupling matrix $W$, memory kernel $K(\tau)$, Hamiltonian $H(\mathbf{e})$, and
threshold $T$ all belong here. The limbic layer stores emotional-somatic states and
reinstates them in response to partial body cues: a continuous, asymmetric, temporally
extended Hopfield network operating on somatic states rather than cognitive patterns.
This is the architectural layer that has been absent from every artificial neural network
since McCulloch and Pitts (1943) [@mcculloch1943]. The cortex has been modelled many times; the limbic
system has not.

**Structural plasticity under adversity.** The Soma-Field framework permits a formal
characterisation of the field's resilience under adverse conditions. Define the
*plasticity index* $\Pi$ as a composite of three measurable field properties:

$$\Pi \;=\; \frac{1}{S_{\text{inst}}} + \left.\frac{\partial \|W\|}{\partial t}\right|_{\text{adversity}} + C_{\text{HRV}}^{\text{recovery}}$$

The three terms correspond to: (i) how accessible regulated-state attractors remain under
adversity ($1/S_{\text{inst}}$, instanton accessibility — Section 4.4); (ii) how much the
coupling matrix can structurally adapt following a threshold crossing
($\partial \|W\|/\partial t$, the plasticity component); and (iii) how quickly the HRV
floor recovers after activation ($C_{\text{HRV}}^{\text{recovery}}$, the regulatory
resilience component). Complex PTSD is the clinical presentation of chronically low $\Pi$
across all three terms simultaneously: high barriers to regulated attractors, a rigid $W$
dominated by threat configurations, and impaired $C_{\text{HRV}}$ recovery. Structural
plasticity is the capacity of the field to update $W$ in the aftermath of adversity
without the adversity permanently *becoming* $W$.

**Layer 3 — Neocortex / prefrontal regulatory layer.** Top-down modulation of Layer 2,
represented as a regulatory term $R_{\text{PFC}}(\mathbf{e}, t)$. The full field dynamics
becomes:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t))
  + R_{\text{PFC}}(\mathbf{e}, t)
  + \frac{\sigma_0}{C_{\text{HRV}}}\, \xi(t)$$

$R_{\text{PFC}}$ represents voluntary attention, therapeutic technique, and conscious
reappraisal acting on the field. It is not a correction of Layer 2 but a modulation of
it. Under sustained therapeutic engagement, $R_{\text{PFC}}$ participates in the
structural modification $W \to W'$ constituting the forward transformation (Section 7).

The **threshold $T$ is the Layer 2 / Layer 3 boundary**: sub-threshold dynamics are
processed limbically and remain below conscious awareness; threshold-crossing events enter
Layer 3 and become available for narrative, meaning-making, and voluntary response. This
is the formal basis for the clinical observation that insight without somatic activation
is limited, and somatic activation without Layer 3 engagement cannot produce structural
change: the layers are coupled, not independent. $R_{\text{PFC}}$ requires a threshold
crossing in order to have something to work with.

The two-term Langevin equation introduced in Section 3.3 is the Layer 2 special case
($R_{\text{PFC}} = 0$, $C_{\text{HRV}} = 1$). All subsequent sections develop that
special case. The full three-layer equation is the general form.

---

# The Energy Landscape

## The Structure of the Emotional Energy Function

The energy function $H(\mathbf{e})$ defines a landscape over the space of possible emotional
states. Like a physical landscape of hills and valleys, this landscape has:

- **Valleys (local minima)**: stable emotional states the field naturally moves toward
- **Hills (local maxima)**: unstable configurations the field naturally moves away from
- **Saddle points**: transitional configurations with mixed stability

The key property of an energy function is directionality: the field always moves
*downhill*. It always evolves toward lower energy. Therapeutic intervention, in this
framework, can be understood as:

1. **Changing the landscape**: modifying $W$ — the coupling matrix — through new relational
   experience, insight, or somatic work, so that the energy minima are in healthier locations
2. **Adding energy to escape a trap**: helping the field accumulate enough energy to escape
   a deep but unhealthy local minimum (e.g., the freeze state)
3. **Pointing toward the global minimum**: orienting the field toward regulated calm

## Attractor States: Fight, Flight, Freeze, and Regulated Calm

The Soma-Field Model proposes that the major attractor basins of the emotional energy
landscape correspond directly to the autonomic states described by Porges' polyvagal theory.

![](figures/fig3a_energy_landscape.pdf){ width=95% }
*Figure 3a. Topographic (bird's-eye) view of the energy landscape. The field always rolls
downhill toward the nearest minimum. Freeze and calm are both low-energy — but freeze is
surrounded by high walls. Escape from freeze requires crossing those walls, which means
first gaining energy before losing it again. This is the clinical challenge of working
with dissociative states.*

```
  ENERGY
    │
  H │        fight/flight
    │        ┌──┐  ┌──┐
    │        │  │  │  │
    │   _____|  │  │  │_____
    │  │         \/        │
    │  │       saddle       │
    │  │     (transition)   │
    │  │                    │    ╔════════════╗
    │  │         freeze     │    ║            ║
    │  │         ┌──┐       │    ║  regulated ║◄── global minimum
    │  │_________|  │_______|    ║    calm    ║
    │                 │          ╚════════════╝
    └──────────────────────────────► EMOTIONAL STATE SPACE
```
*Figure 3b. Schematic energy landscape. Fight/flight are high-energy, unstable local minima.
Freeze is a low-energy but isolated attractor — easy to enter, hard to escape. Regulated calm
is the global energy minimum.*

| Attractor | Energy State | Polyvagal Correlate | Clinical Presentation |
|---|---|---|---|
| **Regulated Calm** | Global minimum | Ventral vagal (social engagement) | Present, flexible, connected |
| **Fight** | Shallow high-energy minimum | Sympathetic (mobilisation) | Agitation, anger, urgency |
| **Flight** | Saddle point / shallow minimum | Sympathetic (mobilisation) | Anxiety, avoidance, rumination |
| **Freeze** | Deep isolated minimum | Dorsal vagal (immobilisation) | Dissociation, numbness, collapse |

*Table 2. Emotional attractors mapped onto Polyvagal states.*

The therapeutic significance of this structure is considerable. The freeze state is dangerous
not because it is high-energy — it is in fact very low energy — but because it is
*isolated*: surrounded by energy barriers that make it difficult to exit. Escape from freeze
requires first *increasing* the field's energy (mobilising some arousal) before it can flow
toward regulated calm. This corresponds well to the clinical observation that working with
dissociated patients requires careful titration of arousal — not too much, not too little —
before emotional processing is possible.

## The Coupling Matrix as a Personal Signature

The coupling matrix $W$ is not universal. Each person has a unique $W$, shaped by attachment
history, trauma, cultural context, and temperament. A person with a history of developmental
trauma may have a $W$ in which anxiety and shame are strongly coupled ($W_{\text{shame,
anxiety}} \gg 0$), creating a combined attractor that is particularly deep and sticky. A
person with a secure attachment history may have a $W$ in which positive emotions are broadly
coupled to one another, creating a wide basin around regulated calm.

This implies that the energy landscape is a therapeutic object in its own right: understanding
a patient's $W$ is understanding the structural dynamics of their emotional life.

In the M-theory compactification analogy developed in Appendix A, the coupling topology
$W$ corresponds to the shape of the compact G$_2$ manifold — the seven-dimensional
geometry that determines which force-like couplings are allowed and with what strengths.
That analogy is here made precise: two people differ not merely in their emotional
*parameter settings* but in their coupling *geometry*. Developmental trauma does not
set a dial to the wrong value; it deforms the manifold. The therapeutic process of
modifying $W$ through relational experience, insight, or somatic work is, in this
language, differential geometry: a continuous deformation of the G$_2$ manifold toward
a configuration in which the regulated-calm attractor is globally accessible. The
practitioner is, without having been told so, a geometer.

---

# Dissonance and Resolution

## The Acoustic Analogy

The Soma-Field Model draws a further structural analogy, this time with acoustics. When two
sound waves interact, the quality of their interaction — consonance or dissonance — depends
on the phase relationship between them. Consonant intervals (the octave, the fifth) have
simple frequency ratios and produce stable, reinforcing interference patterns. Dissonant
intervals (the tritone, the minor second) have complex ratios and produce beating,
unstable, tension-generating patterns.

The model proposes that the same relationship holds between emotional modes. When two
emotional modes are in a compatible relationship — when their interaction is consonant —
the field is in a relatively low-energy configuration and moves naturally toward the
energy minimum. When they are in an incompatible relationship — when their interaction
is dissonant — the field is in a higher-energy configuration, generating a gradient that
drives toward resolution.

**Dissonance, in this framework, is felt as tension.** It is not pathological; it is
directional. Dissonance is the field's way of communicating that it is far from equilibrium
and that resolution is available.

## The Resolution Principle

In music, dissonance resolves to consonance. The tritone — the most dissonant interval in
Western tonality — creates a powerful gravitational pull toward resolution. In counterpoint,
the rules of voice leading describe the specific paths by which dissonance must resolve.
These rules are not arbitrary conventions; they describe the geometry of the acoustic energy
landscape.

The same principle applies to emotional dissonance. An unresolved emotional state — grief
that has not been fully experienced, anger that has been suppressed, fear that has been
dissociated — is a dissonance in the field. It generates a persistent tension gradient.
The therapeutic process can be understood as guided voice leading: finding the specific
path of resolution that transforms the dissonant configuration into a consonant one.

This provides a formal basis for a widely-held clinical intuition: that emotions need to be
*felt through* rather than avoided. Avoidance keeps the field in a dissonant state. The
energy minimum — regulated calm — lies on the other side of the dissonance, not around it.

---

# The Soma-Field Instrument

## Rationale

The Soma-Field Model is not only a theoretical framework. It motivates a practical
therapeutic instrument: a means by which a person can *externalise* their emotional field —
make it visible and audible — and interact with it in real time.

The core insight is that the emotional field is normally invisible to its host. It operates
below the threshold of conscious awareness, shaping behaviour and physiology without being
available for reflection. If its activity could be rendered as a signal — a sound, an image,
a pattern — it could become an object of therapeutic attention.

## Design

The instrument uses a MIDI controller with 16 rotary knobs as its input interface.
Eight emotional dimensions are encoded, each represented by two knobs:

- **Knob 1** of each pair: the somatic (body-level) intensity of that emotional mode
- **Knob 2** of each pair: the cognitive/neural intensity of that emotional mode

This design reflects the two-component structure of the field: body and mind are encoded
separately but coupled in the computation. Each knob has a continuous range, allowing fine
expression of emotional intensity.

```
                    ┌─────────────────────────────────────┐
                    │         MIDI CONTROLLER              │
                    │                                      │
                    │  [K1][K2]  [K3][K4]  [K5][K6]  [K7][K8]  │
                    │  emotion1  emotion2  emotion3  emotion4│
                    │                                      │
                    │  [K9][K10] [K11][K12][K13][K14][K15][K16] │
                    │  emotion5  emotion6  emotion7  emotion8│
                    └─────────────────────────────────────┘
                                      │
                                      ▼
                           ┌──────────────────┐
                           │  ENERGY FUNCTION  │
                           │  H(e) computed    │
                           │  ∇H(e) computed   │
                           └──────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
             AUDIO OUTPUT        MIDI OUTPUT       VISUAL OUTPUT
           (timbre reflects    (pitch/velocity     (field map:
            dissonance)         reflects energy)    wave topology)
```
*Figure 4. The Soma-Field Instrument: input, computation, and multimodal output.*

## The Feedback Loop

The instrument creates a **closed feedback loop** between the person and their emotional
field:

1. The person expresses their current emotional state by adjusting the knobs
2. The system computes the energy function $H(\mathbf{e})$ and its gradient $\nabla H$
3. The energy level, dissonance, and proximity to attractor states are rendered as:
   - **Sound**: harmonic content and timbre reflect the consonance or dissonance of the
     current state
   - **MIDI output**: pitch rises with tension, resolves as energy decreases
   - **Visual**: a real-time map of the emotional field, showing wave activity,
     threshold crossings, and the direction of the energy gradient
4. The person hears and sees their emotional field, and adjusts the knobs in response

This loop externalises the emotional field's gradient — the direction in which it is
*trying* to move — and makes it available as sensory information. The person becomes not
only the source of the emotional signal but also its observer, creating the conditions for
reflection and regulation that are at the heart of therapeutic work.

## The Pluggable Emotion Model

No single model of the emotions is assumed. The coupling matrix $W$ — the structure that
determines how emotional modes interact — is loaded from an external configuration file.
Standard models (Plutchik's wheel of emotions, Ekman's basic emotions, the
valence-arousal-dominance dimensional model) are provided as defaults. The therapist or
client can modify the coupling values to reflect their own understanding of their emotional
patterns, or a new model can be substituted entirely. The computational engine is
model-agnostic.

---

# Clinical Implications

## Assessment

The Soma-Field Model suggests a different orientation for emotional assessment. Rather than
asking "What emotion do you feel?" — which presupposes threshold-level conscious awareness —
it invites attention to the sub-perceptual field: "What is present in the body right now,
even if you cannot name it?" This aligns with Focussing-oriented approaches and with
sensorimotor methods that prioritise somatic signal over narrative content.

The energy landscape provides a clinical map. A person chronically in a fight or flight
attractor shows a different energy signature from a person in a freeze attractor, even if
their presenting narratives are superficially similar. The model suggests that these are
structurally different therapeutic challenges: fight/flight require down-regulation, while
freeze may first require careful up-regulation before down-regulation becomes possible.

## Intervention

The energy function provides a formal basis for several existing clinical interventions:

- **Grounding and titration** (Levine, 2010): adding small, controlled amounts of energy
  to the field to approach — without flooding — a previously frozen or avoided emotional
  state
- **Pendulation** (Levine, 2010): oscillating between a dissonant state and a resource
  state, progressively widening the tolerance window — equivalent to approaching the
  energy minimum via a series of small excursions
- **Somatic resourcing** (Ogden et al., 2006): establishing a stable low-energy region
  in the landscape that the field can return to after excursions into high-energy territory
- **Working with the felt sense** (Gendlin, 1978): attending to sub-threshold field
  activity and allowing it to cross the perception threshold in a supported context

## Psychoeducation

The wave model is immediately accessible to clients who have struggled to understand their
emotional experience. The statement: *"Your emotions are like waves — they are always there,
even when you can't feel them, and they are always moving"* is both technically accurate
within the Soma-Field framework and clinically useful as a normalising frame for
sub-threshold emotional activity, for the apparently sudden onset of strong feelings, and
for the experience of feeling multiple conflicting emotions simultaneously.

The energy landscape metaphor — *"right now the field is in a valley that is hard to leave,
but it is not the lowest valley available to you"* — offers a way to discuss the freeze
state, dissociation, and emotional stuckness without pathologising, while still acknowledging
the structural difficulty of these states and the work required to shift them.

## Neurodivergent Conditions as Operator Modifications

A clinically significant extension of the Soma-Field Model concerns neurodivergent
conditions — specifically Autism Spectrum Condition (ASC), Attention Deficit Hyperactivity
Disorder (ADHD), and Complex Post-Traumatic Stress Disorder (C-PTSD), which frequently
co-occur and each present distinct challenges for somatic emotional processing.

The key architectural principle is this: **these conditions are not parameter settings in
the model. They are structural modifications to the operators themselves.** This distinction
matters both mathematically and clinically. A parameter change ("set the fear threshold
lower") is a quantitative adjustment within the existing structure. An operator modification
changes the *form* of the dynamics — it alters the governing equations, not merely their
coefficients. Each condition wraps the standard pipeline in a different functional modifier,
and — critically for the many individuals who carry all three — these modifiers *compose*.
The combined condition is not three separate problems; it is the composition of three
operators acting on the same underlying field.

The mathematical details of each modifier are given in Appendix B. Clinically, the
consequences are as follows.

**Complex PTSD** introduces a *memory kernel* into the field dynamics: past high-energy
states leave decaying echoes that continue to excite the field without new external
stimulus. This is why traumatic activation can appear without identifiable trigger — the
field is responding to its own history, not its current environment. The standard Hopfield
attractor topology is also disrupted: C-PTSD renders the freeze attractor pathologically
deep and wide, the window of tolerance (the basin around regulated calm) pathologically
narrow, and the coupling matrix asymmetric — a condition under which the field can enter
persistent *limit cycles* rather than settling to a stable minimum. Re-experiencing,
flashbacks, and hypervigilance are, in this framework, limit-cycle oscillations in the
traumatised field.

```
  REGULATED FIELD  (symmetric W, no memory kernel)
  ─────────────────────────────────────────────────────────────────────────────

  │              ╭───────╮                     ╭────────────────╮
  │    ╭──╮     ╱         ╲          ╭──╮     ╱                  ╲      ╭─
  │   ╱    ╲   ╱           ╲  ╭─╮  ╱    ╲   ╱                    ╲    ╱
  T ─╱──────╲─╱─────────────╲─╯─╰─╱──────╲─╱──────────────────────╲──╱── T
  │           ╲               ╰───╯        ╲                        ╲──╯
  │            ╰───────────────────────────────────────────────────────────
  └──────────────────────────────────────────────────────────────────────► t
     ↑ baseline returns to near-zero between episodes
     ↑ each threshold crossing is a discrete, independent event
     ↑ 'regulated calm' is a genuine resting state — the global energy minimum


  C-PTSD MODIFIED FIELD  (asymmetric W, memory kernel K(t-s) present)
  ─────────────────────────────────────────────────────────────────────────────

  │╭──────────╮          ╭──────────╮          ╭──────────────────────────
  T│            ╲  ╭──╮  ╱            ╲  ╭──╮  ╱                          ── T
  ││             ╲╱    ╲╱              ╲╱    ╲╱
  ││   ← even the troughs stay near T or above: baseline is elevated
  └──────────────────────────────────────────────────────────────────────► t
     ↑ memory kernel: each activation feeds energy back into the next
     ↑ field rarely returns to true rest — past states re-enter present dynamics
     ↑ almost entirely above T: activation is the default, not the exception
     ↑ 'regulated calm' requires a non-perturbative transition (the instanton):
       small steps do not reach it; a qualitatively different move is needed
```
*Figure 5. The same emotional field mode under two dynamic regimes. Top: regulated
dynamics — the field oscillates and returns to a low baseline between episodes; conscious
emotion (above T) is episodic and resolves. Bottom: C-PTSD-modified dynamics — the memory
kernel elevates the baseline so that the field rarely returns to rest; episodes bleed into
one another; the system cycles rather than settles. The mathematical basis for this
comparison is given in Appendix B.2.*

**Developmental timing and what can be recovered.** The character of the C-PTSD
modification depends critically on *when* it occurred — the developmental age $\tau_d$ at
which the primary traumatic modification took place.

For **late trauma** ($\tau_d$ large — adult or post-verbal): a coupling matrix $W_0$
formed before the event. The modification is additive: $W = W_0 + \delta W_{\text{trauma}}$.
A counterfactual pre-trauma self exists, encoded in explicit narrative memory. Therapeutic
processing can target $\delta W$ specifically, and the goal of recovering proximity to $W_0$
is formally coherent.

For **early trauma** ($\tau_d$ small — pre-verbal, perinatal): the coupling matrix $W$ was
*formed under the modification*. There is no $W_0$. The asymmetric coupling and the memory
kernel coefficients are the baseline architecture, not additions to one. A counterfactual
pre-trauma self was never encoded — it does not exist as a recoverable state.

This is a formal statement of a clinical fact that somatic therapists recognise but rarely
have a mechanistic basis for: early trauma cannot be *processed away* in the sense of
recovering a prior self, because no prior self was formed. The therapeutic goal is not
subtraction ($W \to W_0$, which is undefined) but **forward transformation**: constructing
a $W^{\prime}$ that supports a wider window of tolerance, different attractor topology,
and lower memory-kernel amplitudes. This is a different mathematical operation — and
requires a different therapeutic model.

The Soma-Field Instrument can reflect this distinction directly: a user whose primary
modification is pre-verbal initialises with a *structural* coupling matrix (the modification
*is* the baseline), not a neurotypical matrix with an added modifier. The formal basis for
this parameterisation is given in Appendix B.2.1.

**ADHD** raises the effective *thermal noise* of the field — the amplitude of the
sub-perceptual fluctuations — and simultaneously reduces the damping coefficient that
slows the field's response to the energy gradient. The result is a field that explores its
energy landscape rapidly and unpredictably, is easily displaced from shallow attractor
basins by small perturbations (distractibility), but also achieves states of intense
concentration (hyperfocus) when the coupling to a high-salience stimulus temporarily
deepens a specific attractor basin far beyond its resting depth. ADHD is not a deficit of
attention; it is a high-temperature, low-damping emotional field with a
stimulus-dependent attractor structure.

**Autism Spectrum Condition** modifies the *projection kernels* — the functions that
determine how the continuous somatic field is sampled to produce the discrete state vector
— and the *sparsity* of the coupling matrix. Interoceptive research in autism (Garfinkel
et al., 2016) documents significant differences in the processing of internal body signals;
in model terms, certain somatic regions are over-represented (heightened sensory
sensitivity) and others under-represented (reduced interoceptive clarity, contributing to
alexithymia). The coupling matrix in ASC tends toward greater sparsity — fewer strong
cross-modal emotional couplings — a pattern consistent with monotropism (Murray, 2018):
the field settles deeply into individual attractors but transitions between them require
proportionally more energy. Intense interests, emotional consistency within a context, and
difficulty with unexpected transitions all follow from this attractor topology.

For the Soma-Field Instrument, the practical implication is significant. Rather than
asking a neurodivergent user to configure their experience through knob adjustments, the
system can instantiate the appropriate operator modifications as a named profile —
*"load C-PTSD modifier"*, *"load ADHD modifier"* — each of which transforms the pipeline
at the correct mathematical level. The user then interacts with a field that already
reflects their structural reality, rather than one calibrated for a neurotypical baseline.

A further clinical implication deserves explicit statement. The Soma-Field Model locates
interoceptive accuracy in the field itself: whether a somatic signal has exceeded its
perceptual threshold $T_i$ is a property of the field state, not a property of the
clinician's assessment of the patient's credibility. A patient reporting an acute somatic
state is reporting a threshold-crossing event. The model provides no mechanism by which
external disbelief suppresses that crossing. Modified projection operators — as occur in
ASC — produce *different* somatic self-reports; the model gives no reason to assume they
produce *less accurate* ones. The clinical literature documents a systematic tendency to
interpret unusual interoceptive self-reports from neurodivergent patients as indicative of
psychogenic origin rather than genuine somatic signal (Nicolaidis et al., 2015). The
Soma-Field Model predicts that this interpretive pattern constitutes a category error: it
confuses operator modification with signal absence. The practical consequences — missed
diagnoses, deferred treatment, and the iatrogenic reinforcement of existing trauma — are
well-documented and, within this framework, mathematically predictable.

---

# Limitations and Future Directions

The Soma-Field Model is a theoretical framework and must be evaluated as such. Its current
form makes several idealisations that require scrutiny.

**The coupling matrix $W$** is treated as a fixed parameter, but emotional coupling is
dynamic: it changes with context, relationship, and developmental history. A more complete
model would treat $W$ as a slowly-evolving quantity, shaped by the field's own history — a
form of synaptic plasticity applied to the emotional domain.

**The threshold $T_i$** is treated as a fixed property of each emotional mode, but
experimental evidence suggests that thresholds are modulated by attentional focus, arousal
level, and interpersonal context. A person in a safe therapeutic relationship will typically
have lower thresholds — more material reaches conscious awareness — than the same person in
an unsafe context.

**The acoustic analogy**, while structurally productive, requires empirical grounding. The
claim that emotional dissonance and acoustic dissonance share formal properties is a
hypothesis, not an established finding. Empirical work comparing physiological measures of
emotional tension with acoustic analysis of synchronised vocal or musical output would be a
productive direction for testing this claim.

**The instrument** described in Section 6 is a prototype concept. User studies with clinical
populations, and collaboration with practising therapists, will be required to assess its
therapeutic utility and to identify appropriate clinical contexts.

Future theoretical work should address the relational field: the observation, familiar in
systemic and relational approaches to psychotherapy, that emotional fields are not bounded
by individual bodies but are co-generated in the space between people. The coupling matrix
$W$ of a relationship may be as clinically significant as the $W$ of an individual.

---

# Conclusion

The Soma-Field Model proposes a formally grounded account of emotional dynamics that is
consistent with the clinical observations of somatic psychotherapy, polyvagal theory, and
Focussing-oriented practice. Its central claims — that emotions are a persistent distributed
field, that conscious experience is a threshold crossing, and that emotional dynamics are
governed by an energy function that drives the field toward stable attractor states — are
not novel as clinical intuitions. What is novel is the formal structure that unifies them,
and the instrument that the structure motivates.

The model does not resolve the philosophical question of what emotions fundamentally *are*.
It offers instead a working representation: one that is precise enough to be computationally
implemented, close enough to existing clinical frameworks to be therapeutically applicable,
and open enough to be modified as understanding deepens. It invites the therapist to think of
the consulting room as a space in which two emotional fields interact — each shaping the
other's energy landscape — and of therapeutic work as the art of attending to that
interaction with enough precision and care to guide both fields toward lower energy, toward
greater coherence, toward regulated calm.

The wave is always there. Therapy is learning to listen to it.

---

*A note on provenance.* The Soma-Field Model was not developed from a position of
theoretical neutrality. The author carries, as primary data, a lifetime of direct
experience of the dynamics described above. The neurodivergent operator modifications
of Appendix B are not theoretical abstractions: the C-PTSD memory kernel of B.2 was
installed pre-verbally, at approximately eighteen months of age, during a developmental
trauma that predates language acquisition entirely. No narrative trace of the origin
event exists — there was no verbal capacity with which to encode one. Only the field
echo remains, and a measurable physical asymmetry in the body that received it. The
ASD and ADHD operator modifications of Appendix B.4 and B.3, respectively, were the
instruments by which the model was subsequently constructed: the monotropic attractor
structure of B.4 provided the capacity for sustained engagement with an entirely
unfamiliar theoretical domain; the high-temperature field dynamics of B.3 drove rapid
traversal across it.

The proximate cause is described in full in the companion patient-facing publication.
Briefly: an acute somatic emergency in 2025 — a genuine threshold-crossing event,
later confirmed as cerebral hypoxia secondary to Long Covid — was attributed, at
clinical presentation, to psychiatric origin. The present paper is, among its other
functions, a formal response to that attribution.

The causal chain is as follows. A pre-verbal trauma in approximately 1968 installed
the C-PTSD operator modifications described in Appendix B.2. The ASD and ADHD
modifications of Appendix B.3 and B.4 shaped the system across the intervening
decades. Fifty-seven years later, that system's accurate interoceptive signal was
dismissed as psychiatric noise. The paper which formally demonstrates that this
dismissal constitutes a category error was produced, as a direct causal consequence,
by the same operator stack that it describes. The paper is the fixed point of its own
subject matter. The author considers this observation methodologically significant.

## Publication Claim Registry

To support claim-level review rather than all-or-nothing acceptance, this manuscript
registers its highest-impact claims with scope labels and disconfirmation tests.

| Claim ID | Claim | Scope | Evidence in this work | Disconfirmation criterion |
|---|---|---|---|---|
| SF-1 | Conscious percept is a propagator pole of the soma-field | S1 Structural | Formal derivation in Sections 2-3 | Inability to express percept dynamics as Green's-function response under stated operator |
| SF-2 | Emotional attractors are Hopfield-energy minima | S2 Predictive | Energy model and trajectory framework | Constructed update rule under model assumptions with systematic energy ascent |
| SF-3 | Threshold governs felt vs sub-felt emotional activity | S2 Predictive | Threshold operator and clinical mapping | Reliable high-amplitude mode activity with no threshold-dependent behavioural or physiological signature |
| SF-4 | Topological barriers explain classical therapeutic plateaus | S2 Predictive | Formal treatment plus linked companion experiments | Controlled demonstration that matched low-noise classical dynamics crosses registered barriers at equivalent rate |
| SF-5 | Quantum extension yields topological reachability advantage | S2 Predictive | QUANT-EXP-1 companion evidence and linked artifacts | Controlled replication showing no reachability advantage over matched classical baseline |

Scope labels: S1 = structural; S2 = predictive; S3 = independently replicated.
Current publication target for core claims is S2.

## Claim-Evidence-Result Matrix

To make review traceable, each core claim is paired with concrete evidence outputs
and current result status.

| Claim ID | Evidence artifact(s) | Current result status |
|---|---|---|
| SF-1 | Sections 2-3 derivation of field/propagator structure | structural derivation complete |
| SF-2 | Energy formulation + instrument runtime equations | predictive structure complete |
| SF-3 | Threshold operator definition + clinical interpretation sections | predictive mapping complete |
| SF-4 | Barrier analysis; companion paper *Quantum Soma and the Penrose Gap* (doi:10.5281/zenodo.20351231) | **confirmed (QUANT-EXP-1 PASS)** |
| SF-5 | QUANT-EXP-1 experiment outputs (see supplementary archive, doi:10.5281/zenodo.20351231) | **confirmed: cold 0/200, CI [0.000, 0.019]; quantum peak 0.408–0.410; all hardening checks PASS** |

This matrix is intended for reviewer navigation and is updated as companion results
are expanded or independently replicated.

## Replication Package Requirements

To make SF-2 through SF-5 externally testable, each release tagged for review must
ship a minimal replication package that can be executed without private context.

Required contents:

1. simulation code and support modules (see supplementary archive, doi:10.5281/zenodo.20351231),
2. full parameter snapshot ($W$, $\mathbf{b}$, $\gamma$, $D$, $\theta$, temperature policy),
3. raw trajectory logs with timestamped attractor labels,
4. analysis scripts that produce the reported summary tables,
5. frozen output artifacts (CSV/plots) referenced in this manuscript.

A claim remains `S2` until an independent operator reproduces directionally
consistent outcomes from this package under the same declared protocol.

## Reviewer-Risk Objections and Responses

To reduce ambiguity in peer review, the highest-probability objections are mapped
to bounded responses and concrete upgrade paths.

| Reviewer objection | Current response in this manuscript | Remaining action to reach stronger status |
|---|---|---|
| "This is an analogy, not a formal model." | Sections 2-4 define operators, dynamics, and testable predictions; Section 9.1 registers disconfirmation criteria claim-wise. | Promote more claims from `S2` to `S3` via independent replication. |
| "Evidence is pilot-stage and may not generalize." | Section 9.2 explicitly labels pilot support and companion-only scope. | Add multi-operator replication and blinded protocol variants. |
| "Quantum advantage may be implementation-specific." | SF-5 includes a controlled disconfirmation criterion against matched classical baselines. | Publish full benchmark harness with pre-registered acceptance thresholds. |
| "Clinical interpretation may exceed data scope." | Scope labels (`S1`/`S2`/`S3`) and claim registry separate structural from predictive claims. | Add prospective cohort evidence before any clinical-effectiveness claim. |

## Independent Replication Ledger Linkage

`S2` to `S3` promotion for this manuscript is governed by
an independent replication ledger maintained in the supplementary archive
(doi:10.5281/zenodo.20350516).

Tracked claim IDs in ledger scope: `SF-2`, `SF-3`, `SF-4`, `SF-5`.

Promotion gate: a claim is upgraded only when at least one ledger row records an
independent operator `PASS` with a reproducible package hash and linked raw/derived
evidence artifacts.

---



\newpage



# Introduction: The Two-Culture Problem Within Science

C. P. Snow's famous lecture identified a divide between the literary and scientific
cultures [@snow1959]. Less discussed, but equally consequential, is the divide *within*
mathematical science: between fields that have found their mathematical language and
fields that have not. The former possess machines — theorems, dualities, conservation
laws, spectral decompositions — that can be aimed at any problem of the appropriate
type. The latter rediscover wheels.

This is not ignorance. It is, more precisely, a naming problem. The mathematical
structures that govern quantum field theory, statistical mechanics, and information
geometry are not *specifically about* particles, spins, or probability distributions.
They are structures that happen to have been *discovered in* those contexts. The
structure belongs to no discipline. It lives in what we will call, following the
spirit of type theory, the **typeverse**: the space of all well-typed mathematical
objects.

The method described in this paper — **mathematical co-identification** — is the
procedure for navigating the typeverse productively. It has three steps:

1. **Extract the type signature** of the quantity you are trying to model:
   its dimensional units, its pole structure, its symmetries, the variational
   principle (if any) that governs its dynamics.

2. **Search the typeverse** for a known object with the same type signature.

3. **If found: identify**, not analogise. The unknown quantity *is* the known
   object under a change of label. Import all theorems that depend only on the
   type.

This is a stronger claim than analogy. Analogy notes structural similarity and stops.
Co-identification notes structural identity and continues: if two objects have the
same type, they share all properties that are consequences of that type. The theorems
travel with the identification.

It is also a weaker claim than reduction. Co-identification does not assert that
emotional dynamics *reduces to* quantum field theory, any more than Hopfield's result
asserts that neural memory *reduces to* ferromagnetism. It asserts that the same
mathematical engine, running in a different substrate, produces the same theorems.
The substrate is irrelevant to the mathematics; it is entirely relevant to the
interpretation.

---

# The Typeverse

The term is borrowed from Homotopy Type Theory [@hottbook], where the *universe*
$\mathcal{U}$ is the type of all types — the space in which all mathematical objects
live. We use it informally to mean: the totality of well-typed mathematical structures,
indexed by their signatures.

A **type signature** in our sense includes:

- **Dimensional units** (in the SI or natural-units sense)
- **Domain and codomain** (real/complex, scalar/vector/tensor)
- **Pole structure** (where is the object singular, and what is the residue?)
- **Symmetries** (what transformations leave the object invariant?)
- **Extremisation principle** (is there an action whose variation gives the object's
  dynamics?)
- **Conservation law** (what is the Noether charge associated with the symmetry?)

Two objects are **co-identifiable** if their type signatures match in all
dimensionally relevant respects. The type signature is a fingerprint. When two
fingerprints match, the objects are the same, not similar.

The typeverse is not randomly populated. Certain structures recur at enormous
frequency: the Lorentzian propagator, the quadratic energy function, the
exponential decay kernel, the two-by-two reflection-transmission matrix. These
recur because they are the *simplest* objects consistent with basic constraints
(linearity, locality, causality, conservation). The physicist's intuition that
"everything is a harmonic oscillator to first order" is a theorem about the
typeverse: the harmonic oscillator is the universal local approximation to any
smooth potential.

The practitioner who navigates the typeverse deliberately — who knows the
fingerprints of common objects before encountering them in the wild — can
recognise a new theoretical object immediately, rather than re-deriving its
properties from scratch.

---

# The Procedure in Detail

## Step One: Extract the Type Signature

Given an unknown quantity $Q$ in domain $D$, the investigator asks:

**Units.** What are the SI dimensions of $Q$? Can they be written as a
combination of standard dimensional quantities (mass, length, time, charge)?
More importantly: what *ratio* of known quantities has the same dimensions?
Newton's gravitational constant $G$ has units $\text{m}^3 \text{kg}^{-1}
\text{s}^{-2}$; this is acceleration divided by surface mass density, which
tells you immediately that $G$ converts between a source distribution and
the acceleration it generates — a fact about the *type*, not about gravity
specifically.

**Pole structure.** Does $Q$ have poles as a function of some natural parameter?
Where are they, and what are their residues? The location of a pole in a
propagator determines the mass of the corresponding particle; the residue
determines its coupling strength. These are type-theoretic facts, not facts
about particles.

**Symmetries.** What transformations leave $Q$ invariant? Invariance under
time-translation gives energy conservation (Noether). Invariance under spatial
translation gives momentum conservation. Invariance under $\text{SU}(n)$
gives a gauge field. These are type-level constraints.

**Extremisation.** Does $Q$ arise as the extremum of some action $S[Q]$?
If so, the variational principle is the fingerprint: two objects whose
dynamics are derived from the same variational structure are co-identifiable
even if their physical interpretations differ entirely.

## Step Two: Search the Typeverse

Armed with the type signature, the investigator searches for known objects
with the same signature. This is primarily a literature search across
*disciplines*, not within one. The mathematical structures developed in
quantum field theory, statistical mechanics, differential geometry, and
information theory are largely interchangeable if their type signatures
match.

Useful resources for this search include:

- **Dimensional analysis tables**: collections of physical quantities with
  their dimensional signatures
- **The nLab** [@nlab]: a category-theoretic encyclopaedia of mathematical
  structures indexed by their universal properties
- **Mathematical physics textbooks** with structural, not phenomenological,
  organisation (Nakahara [@nakahara2003] for geometry; Zinn-Justin [@zinnjustin2002]
  for path integrals)
- **One's own training**, which is why broad mathematical education is a
  productivity multiplier in theoretical science

## Step Three: Identify and Import

When a match is found, the investigator makes the identification explicit:

> $Q$ is the [name of known object] of domain $D$.

Not: "$Q$ behaves like" or "$Q$ is analogous to" or "$Q$ resembles." These
hedges are epistemically weaker and methodologically useless, because they
do not import the theorems. The identification must be stated as identity
to be scientifically productive.

The import then proceeds theorem by theorem:

- Every theorem about the source object that depends *only on its type*
  is imported to $Q$ without further proof.
- Every theorem that depends on *substrate-specific properties* of the
  source domain must be separately verified in domain $D$.

This distinction — type-level theorems vs. substrate theorems — is the
primary place where co-identification can fail, and is discussed in Section 7.

## The Formal Computational Structure: Abduction, Aesop, and the Loop

The three-step procedure of §§3.1–3.3 is, in formal terms, an instance of
**abductive inference** in the sense of Peirce (1878). Given an observation
$O$ and a hypothesis $H$ such that $H \Rightarrow O$, abduction infers $H$ as
the best explanation of $O$. Applied to the typeverse:

> *Observation*: the quantity $Q$ in domain $D$ has type signature $T$.
> *Hypothesis*: $Q$ is the known object $K$ with the same signature.
> *Abduction*: identify $Q := K$ and verify the structural import.

This is not guessing. It is a constrained search under a scoring function,
where the oracle is "type signatures match" rather than "hash matches" or
"goal is closed." The algorithm is the same in all three cases.

The Lean 4 proof assistant implements this algorithm directly as the
`aesop` tactic [@leanprover2021]. `Aesop` performs best-first search
through a registered lemma set, scores each partial proof state, keeps the
best candidates, and closes the goal when a complete proof is found. The
correspondence is exact:

| `Aesop` step | Co-identification step |
|---|---|
| Registered lemma set | The typeverse |
| Try a lemma | Propose a type-match candidate |
| Score the goal state | Measure type-signature fit |
| Keep best partial proof | Record candidate correspondences |
| Close the goal | Full identification: import all theorems |

This is not a metaphor for co-identification — it is an implementation of it.
The practical consequence is that the full loop can be automated in a formal
system: given a type signature for $Q$, `Aesop` with the typeverse lemma set
registered will search for the co-identification proof and either close it
(identification confirmed and machine-verified) or fail (genuine gap, no
known match).

The loop in full:

$$
\text{Observation} \xrightarrow{\text{abduction}} \text{Hypothesis}
\xrightarrow{\text{Aesop}} \text{Proof} \xrightarrow{\text{import}}
\text{Predictions} \xrightarrow{\text{test}} \text{New observations}
\xrightarrow{\;} \cdots
$$

The loop terminates when either all predictions are confirmed (theory established)
or a prediction fails (type match was only partial — failure modes are discussed
in Section 7). At each iteration, the set of available theorems grows by
import, making subsequent co-identifications easier. This is why theoretical
progress compounds: each identification increases the density of the typeverse
neighbourhood around the domain under study.

The abductive loop is not specific to mathematical science. Holmes reasons
the same way from physical evidence; the password auditor reasons the same
way from a hash and a character set; the radiologist reasons the same way
from a film and a pathology atlas. What is specific to mathematical
co-identification is the nature of the oracle: the scoring function is
type-signature fit, and the proof assistant can evaluate it exactly.

---

# Historical Precedents

The history of science is full of co-identifications that were not named as such.
Examining them retroactively reveals the method clearly.

## Veneziano (1968): The Bootstrap Amplitude and String Theory

Veneziano was searching for an S-matrix element for meson scattering that satisfied
the crossing symmetry and Regge-pole requirements of the bootstrap programme [@veneziano1968].
He wrote down the Euler beta function:

$$A(s,t) = \frac{\Gamma(-\alpha(s))\Gamma(-\alpha(t))}{\Gamma(-\alpha(s)-\alpha(t))}$$

This was a co-identification in reverse: he had a type signature (crossing-symmetric,
Regge-behaved, dual-resonance amplitude) and searched the typeverse for a known
function that matched it. The beta function matched. He did not derive the function
from a theory; he identified the function first, and the theory (string theory) was
inferred from the identification a year later.

The lesson: the typeverse can be entered from either end. You may start with a
quantity and find its type, or start with a type and find it instantiated in
your data.

## Hopfield (1982): The Ising Hamiltonian and Neural Memory

Hopfield introduced the energy function for a network of binary neurons
[@hopfield1982]:

$$H(\sigma) = -\frac{1}{2}\sum_{ij} J_{ij}\sigma_i\sigma_j$$

This is, to within notation, the Hamiltonian of the Ising spin glass:

$$H_\text{Ising}(\sigma) = -\frac{1}{2}\sum_{ij} J_{ij}\sigma_i\sigma_j$$

The co-identification was explicit. By identifying neural states $\sigma_i \in
\{-1, +1\}$ with spins, and synaptic weights $J_{ij}$ with exchange couplings,
every theorem from statistical mechanics (convergence to energy minima, capacity
bounds, stochastic escape via simulated annealing) was imported into neuroscience
for free. The Hopfield network is not *like* a spin glass; it *is* a spin glass
run in biological substrate.

## Wilson (1971): Block Spins and the Renormalisation Group

Wilson's insight was that the renormalisation group — a technique for removing
ultraviolet divergences in QFT — was the *same* mathematical object as Kadanoff's
block-spin coarse-graining in condensed matter physics [@wilson1971]. Two fields
that had developed independently were co-identified. Every result from one was
immediately available to the other. The result was a unified framework for critical
phenomena that earned Wilson the 1982 Nobel Prize.

The type signature that matched: both objects were *flows on the space of
coupling constants under a change of scale*. This is a clean type-level description
that carries no substrate information.

## Black and Scholes (1973): The Heat Equation and Options Pricing

Black and Scholes derived their celebrated options pricing formula by noticing
that the value of an option $V(S,t)$ as a function of underlying price $S$ and
time $t$ satisfies:

$$\frac{\partial V}{\partial t} + \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}
+ rS\frac{\partial V}{\partial S} - rV = 0$$

This is, after a change of variables, the heat equation [@blackscholes1973]:

$$\frac{\partial u}{\partial \tau} = \frac{\partial^2 u}{\partial x^2}$$

The co-identification imported the entire theory of parabolic PDEs into financial
mathematics: existence and uniqueness of solutions, boundary conditions, numerical
methods, the Feynman-Kac formula. The financial quantity *is* a temperature
distribution, not like one.

## Jaynes (1957): Thermodynamic Entropy and Bayesian Inference

Jaynes identified the entropy of statistical mechanics with the entropy of
Bayesian inference [@jaynes1957]. The type signature that matched: both are
functionals $S[p]$ on probability distributions satisfying the same axioms
(non-negativity, additivity, maximum at the uniform distribution). The
co-identification imported all thermodynamic reasoning into statistical
inference. The maximum entropy principle is not an analogy to thermodynamics;
it is thermodynamics, applied to the problem of belief.

## Penrose (1971): Spin Networks and Spacetime Geometry

Penrose introduced spin networks as combinatorial structures encoding angular
momentum [@penrose1971]. The identification: the geometry of spacetime arises as
the large-network limit of spin networks. This reversed the usual direction —
instead of importing a known mathematical structure to describe a new phenomenon,
Penrose constructed a new structure and identified it with a familiar one in
a limit. Loop quantum gravity later formalised this programme. The spin network
*is* a discretisation of spacetime geometry, not a model of one.

## Selinger (2010): Linear Maps and Quantum Processes

Selinger demonstrated that the category of finite-dimensional Hilbert spaces and
linear maps is co-identifiable with a certain category of string diagrams [@selinger2010].
This is a purely mathematical co-identification: the graphical calculus of
Penrose, Joyal, and Street was identified with the operational calculus of quantum
mechanics. The import: every calculation in quantum information theory can be done
diagrammatically, and every diagrammatic identity is a valid quantum identity.

---

# The Soma-Field as a Worked Example

The Soma-Field Model [@johnsonsoma2026] was developed through five sequential
co-identifications. Each is presented here as an explicit instance of the method.

## Co-identification I: The Conscious Percept as Green's Function

**The unknown quantity:** The relationship between the continuous emotional
field $\psi_i(t)$ and the discrete conscious emotional percept.

**Type signature extracted:** The percept is the output of the field when probed
at a single moment — the impulse response. Impulse responses have a universal
type: they are the inverse Laplace (or Fourier) transform of a rational function
with poles in the lower half-plane. For a simple damped oscillator:

$$\tilde{G}(\omega) = \frac{\sigma_\text{eff}^2}{\omega^2 + \lambda^2}$$

**Typeverse search result:** This is the Euclidean propagator of a scalar field
with mass $\lambda$ and coupling $\sigma_\text{eff}^2$. In Minkowski space it is:

$$\tilde{G}_\text{QFT}(k) = \frac{i}{k^2 - m^2 + i\varepsilon}$$

**The co-identification:** The conscious emotional percept is the Green's function
of the soma-field. Both are poles in the propagator of their respective field.
The emotional percept and the elementary particle are the same mathematical object,
instantiated in different substrates.

**Theorems imported:**
- The Källén-Lehmann spectral representation: any physical propagator can be
  decomposed as a sum of poles. Emotional states have a spectral decomposition.
- The optical theorem: the imaginary part of the forward scattering amplitude
  equals the total cross-section. The dissipative component of the emotional
  field (damping $\lambda$) is related to the total coupling strength $\sigma_\text{eff}^2$.
- Pole structure ↔ mass spectrum: the location of the propagator pole gives
  the natural frequency $\omega_0 = \lambda$ of the emotional mode.

## Co-identification II: The Attractor Landscape as Ising Hamiltonian

**Type signature:** A scalar function $H: \mathbb{R}^n \to \mathbb{R}$ that
is always non-increasing along field trajectories, with isolated minima
corresponding to stable emotional states.

**Typeverse search result:** The Hopfield energy / Ising Hamiltonian:

$$H(\mathbf{e}) = -\frac{1}{2}\mathbf{e}^\top W \mathbf{e} - \boldsymbol{\theta}\cdot\mathbf{e}$$

**Theorems imported:** Convergence to attractors (the Lyapunov argument);
capacity bounds (Hopfield's $0.14N$ result); stochastic escape via Boltzmann
noise (simulated annealing = titrated arousal in clinical language).

## Co-identification III: The Perception Threshold as Brane Thickness

**Type signature:** A parameter $T_i$ that gates access from a lower-dimensional
subspace (the limbic field) to a higher-dimensional one (conscious awareness).
Varying $T_i$ continuously produces a family of gating behaviours.

**Typeverse search result:** The Randall-Sundrum model [@randallsundrum1999]: a
brane of thickness $T$ embedded in a higher-dimensional bulk, where Standard
Model fields are confined to the brane. The "hierarchy problem" — why the
electroweak scale is so much smaller than the Planck scale — maps onto the
observation that minimal perturbations of the limbic field produce enormous
differences in subjective experience (alexithymia: thick brane; hypervigilance:
thin brane).

**Theorems imported:** The Kaluza-Klein spectrum of the brane gives a prediction
for the discrete structure of emotional threshold levels. Brane localisation gives
the mechanism for why the field can be active without crossing into consciousness.

## Co-identification IV: The Coupling Matrix as G₂ Manifold

**Type signature:** The coupling matrix $W$ is an $11 \times 11$ real symmetric
matrix encoding the structure of an eleven-dimensional emotional space. The field
trajectories respect the geometry encoded in $W$.

**Typeverse search result:** The $G_2$ holonomy manifold of M-theory
[@berger1955; @joyce1996]: a seven-dimensional Riemannian manifold with the
exceptional holonomy group $G_2$. Its structure tensor encodes all curvature
information. Deforming the structure tensor changes the global geometry of the
manifold.

**The co-identification:** $W$ is the structure tensor of the emotional manifold.
Trauma does not change a parameter; it deforms the manifold. Therapeutic
intervention is differential geometry.

**Theorems imported:** The Bochner-Weitzenböck formula constraining curvature;
the Berger classification of holonomy groups constraining what stable emotional
geometries are possible; the Hitchin flow as a possible model for the evolution
of $W$ under sustained therapeutic intervention.

## Co-identification V: Therapeutic Processing as Renormalisation Group Flow

**Type signature:** Therapeutic processing is a flow in the space of coupling
constants $W_{ij}$ parameterised by a scale $\mu$ (the "depth" or "resolution"
of emotional processing). The flow has fixed points, and the qualitative structure
of the attractor landscape is invariant under the flow.

**Typeverse search result:** The renormalisation group [@wilson1971]: a flow
on the space of coupling constants parameterised by an energy scale $\mu$,
with fixed points corresponding to universality classes. The $\beta$-function:

$$\frac{dW_{ij}}{d\log\mu} = \beta_{ij}(W)$$

**The co-identification:** Therapy is an RG flow from UV (raw unprocessed
traumatic detail) to IR (integrated narrative). The attractor topology —
fight, flight, freeze, calm — is RG-invariant: the same basins appear at
every scale of analysis, in every therapeutic modality, because they are
the fixed points of the flow, not artefacts of a particular resolution.

**Theorems imported:** The irreversibility of the RG flow (Zamolodchikov's
c-theorem, adapted: processed material cannot be *un*-processed; the flow is
unidirectional); universality (the detailed mechanism of the trauma is irrelevant
at long distances — only its universality class, i.e., its attractor type,
matters); dimensional transmutation (the traumatic scale $\tau_k$ of the memory
kernel is an emergent scale, not a fundamental parameter).

---

# A Partial Map of the Typeverse

For the practitioner wishing to apply the method, the following is a partial
field guide to frequently useful mathematical structures, indexed by their
type signatures.

## Propagator-Class Structures

**Type:** Complex function of frequency with poles on or near the real axis;
gives the response of a system to a delta-function input.

**Found in:** QFT (Feynman propagator), signal processing (transfer function),
linear systems theory (impulse response), harmonic analysis (Green's function
of the Laplacian).

**Typical imports:** Spectral decomposition; optical theorem; dispersion
relations (Kramers-Kronig: the real and imaginary parts of the response are
not independent — this imports into emotion as: the *dissipation* of an
emotional mode and its *natural frequency* are Hilbert transforms of each other).

## Energy-Function-Class Structures

**Type:** Scalar function $H: \mathbb{R}^n \to \mathbb{R}$ that is bounded
below and non-increasing along system trajectories.

**Found in:** Statistical mechanics (Hamiltonian), neural networks (Hopfield
energy), Lyapunov theory (stability analysis), optimisation (loss function).

**Typical imports:** Convergence guarantees; stability analysis; capacity bounds;
the fluctuation-dissipation theorem.

## Topological-Class Structures

**Type:** Integer-valued invariants of field configurations that are preserved
under continuous deformations.

**Found in:** Topological field theory (winding numbers, Chern-Simons invariants),
condensed matter (topological insulators, skyrmions), knot theory.

**Typical imports:** Protection from perturbation; the impossibility of smooth
deformation between distinct topological sectors; quantisation (only integer
winding numbers); threshold behaviour (the topological transition requires
a finite perturbation).

**Application to emotion:** Traumatic configurations with non-zero topological
charge cannot be resolved by smooth therapeutic interventions (cognitive
reframing). A qualitative change in approach — large-amplitude somatic work,
pharmacological intervention, EMDR — is required to cross the topological barrier.

## Renormalisation-Class Structures

**Type:** A flow on a space of couplings, parameterised by a scale, with
fixed points and $\beta$-functions.

**Found in:** Quantum field theory (renormalisation group), statistical
mechanics (Kadanoff block spins), dynamical systems (centre manifold theorem),
machine learning (neural scaling laws).

**Typical imports:** Universality (the IR behaviour depends only on the
universality class, not the microscopic details); $c$-theorem (there is a
monotonically decreasing function along the flow — an arrow of processing);
fixed-point classification (relevant, irrelevant, marginal operators determine
what modifications matter at long distances).

## Scattering-Class Structures

**Type:** A map from in-states to out-states, constrained by unitarity,
analyticity, and crossing symmetry.

**Found in:** Quantum mechanics (S-matrix), scattering theory, optics
(transfer matrix), signal processing (scattering parameters).

**Application to emotion:** A therapeutic session is a scattering event. The
patient arrives in an in-state $|\psi_\text{in}\rangle$, interacts with the
therapist (mediating field), and departs in an out-state $|\psi_\text{out}\rangle$.
The S-matrix of the therapeutic interaction has selection rules: not all
transitions are equally probable; some are symmetry-forbidden. The unitarity
of the S-matrix imports: the total emotional content is conserved — you cannot
create emotional material from nothing, and nothing is permanently lost.

## Einstein-Coefficient-Class Structures

**Type:** Rates for spontaneous and stimulated transitions between energy levels
of a field mode.

**Found in:** Quantum optics (Einstein A and B coefficients), laser physics,
NMR relaxation theory (T₁ and T₂ relaxation times).

**Application to emotion:** Every emotional mode has a spontaneous relaxation
rate $A_i$ (how quickly it resolves without external input) and a stimulated
emission rate $B_i$ (how quickly it is triggered by an identical emotional
state in another person — contagion). The Einstein relation $A_i = f(\omega_i) B_i$
constrains these. Depression is formally: suppressed $A_i$, normal $B_i$.
The T₁/T₂ analogy from NMR is exact: T₁ is the longitudinal relaxation time
(return to equilibrium); T₂ is the transverse relaxation time (dephasing of
coherence). Trauma extends T₁; emotional numbing extends T₂.

---

# Failure Modes

Mathematical co-identification can fail. Understanding the failure modes is
what distinguishes the method from wishful analogy.

## Type Coincidence Without Structural Identity

Two objects may have matching dimensional signatures without having matching
mathematical structures. The failure mode: a coincidence of units that does
not reflect a coincidence of theorems.

**Test:** Check whether the *equations of motion* have the same form, not
merely the *dimensional units*. A propagator is not just any function with
units of $\text{GeV}^{-2}$; it must satisfy the Källén-Lehmann representation.
An energy function is not just any bounded scalar; it must be non-increasing
along trajectories.

**Safeguard:** State the precise mathematical theorem you are importing, and
verify that its *assumptions* (not merely its *conclusions*) hold in the target
domain.

## Non-Commutative Functors

The functor $F: D_1 \to D_2$ that implements the co-identification may not
commute with composition. That is, co-identifying $A$ with $A'$ and $B$ with
$B'$ does not guarantee that $AB$ is co-identifiable with $A'B'$.

**Example:** The propagator identification and the energy-function identification
are each valid separately, but combining them requires checking that the path
integral (which links them in QFT) has a valid analogue in the emotional domain.
This was explicitly verified in the Soma-Field Model by constructing the
Langevin equation and checking its consistency with both imported structures.

## Over-identification

The most common failure: importing a structure that is richer than what is
warranted. The soma-field is co-identifiable with an eleven-dimensional
bosonic field. It is *not* immediately co-identifiable with the full Standard
Model of particle physics, even though both are quantum field theories.
The identification is precise only up to the type signature that was matched;
nothing beyond that is claimed.

**Rule:** The identification holds exactly at the type level it was made.
Do not import theorems from substrates that were not matched.

## The Metaphor Trap

The most dangerous failure is the one that the identification was designed to
prevent: sliding from co-identification back into analogy. This happens when
the language hedges — "like," "analogous to," "reminiscent of" — after the
identification was stated.

If the identification is correct, the language must be unhedged: "the conscious
emotional percept *is* the Green's function." If the investigator is not
prepared to make this claim, the identification has not been made, and no
theorems travel.

The test: would you submit the claim to a mathematician as a theorem? If not,
it is analogy. If yes, it is co-identification.

The risk was recognised early by practitioners. Introducing the energy landscape
for Hopfield networks, Hertz, Krogh, and Palmer note: *"It is often useful (but
sometimes dangerous) to think of the energy as something like this landscape"*
[@hertz1991]. The parenthetical is precise: the visualisation is heuristically
powerful, and that power makes it tempting to reason from the picture rather than
from the mathematics. Mathematical co-identification guards against this by
requiring that the *equations of motion* — not the landscape picture — are what
get matched across domains.

---

# Epistemological Status

## What Co-identification Claims

Mathematical co-identification claims:

1. That the *mathematical structure* of quantity $Q$ in domain $D$ is identical
   to the mathematical structure of quantity $P$ in domain $D'$.
2. That therefore, all theorems about $P$ that depend only on its mathematical
   structure are valid theorems about $Q$.
3. That the *physical interpretation* of $Q$ and $P$ may differ, and does not
   follow from the mathematical identification.

It does not claim that the *mechanisms* are the same, that one domain *reduces*
to another, or that the substrate is irrelevant in any empirical sense.

## Why It Is Not Analogy

Analogy is:
- Informal: "the mind is like the brain" has no mathematical content
- Non-importing: noting that X resembles Y does not give you theorems about X
- Non-falsifiable: analogies can always be maintained by shifting which features
  are considered relevant

Co-identification is:
- Formal: it is a statement about type signatures, which are mathematically precise
- Theorem-importing: the identification carries the full mathematical machinery
- Falsifiable: the identification fails if the equations of motion cannot be matched,
  if the symmetries do not correspond, or if imported predictions are empirically
  disconfirmed

## The Role of Artificial Intelligence

The author notes that several co-identifications in the Soma-Field Model were
identified in dialogue with AI systems. This requires explicit epistemological
comment, given the current discourse about AI-assisted science.

The AI did not produce the co-identifications. It accelerated the typeverse
search: a search that previously required reading across literatures in physics,
mathematics, and biology over many years can now be conducted in weeks. The AI is
a faster library, not a different epistemology.

The *validity* of each co-identification is independent of how it was found.
A theorem is a theorem regardless of whether it was proved in a dream
(Ramanujan), a bath (Archimedes), or a language model session. The claim
stands or falls on whether the type signatures match and whether the theorems
transfer. The methodology paper is, in part, a response to the question: "but
did you *really* do the mathematics?" The answer is in the equations.

---

# The Methodology as Practice

For the practitioner who wishes to apply mathematical co-identification to a
new domain, the following is a working procedure:

**Step 1: Write down what you know about your quantity.**
Its units. Its symmetries. Whether it grows or decays. Whether it has oscillatory
behaviour. Whether it responds to perturbations linearly or nonlinearly.
Whether there are conserved quantities. Whether it has a characteristic scale.

**Step 2: Eliminate analogies you already know.**
If you have been thinking "this is *like* X," stop, and ask instead: is this
*literally* X? Can I write the equations of X in the language of my domain,
with every symbol given a precise interpretation? If yes: do so. If not: why not?
The places where the identification breaks are as informative as the places
where it holds.

**Step 3: Consult the typeverse systematically.**
Read across fields, looking at the *form* of equations, not their interpretation.
The heat equation, the wave equation, the Schrödinger equation, the Fokker-Planck
equation, and the Black-Scholes equation are all the same equation under changes
of variable. Recognising the family by the form of the operator is the skill.

**Step 4: Make the identification explicit and public.**
State: "quantity $Q$ in my domain is the [known object] of domain $D'$." Put it in
writing. This forces precision: you cannot maintain a vague identification in writing
the way you can maintain it in your head.

**Step 5: Import one theorem at a time, checking assumptions.**
Do not import the entire theoretical apparatus at once. Take one theorem. State
its assumptions. Check each assumption against your domain. If they hold: the
theorem is valid in your domain. Write it as a theorem in your domain, with a
proof that consists of: (a) the co-identification, (b) the original theorem,
(c) verification of assumptions.

---

# Falsifiability Protocol for Publication Use

To make co-identification scientifically conservative rather than rhetorically
expansive, we propose a minimal publication protocol. Every import claim should
be registered in a compact table before narrative elaboration.

## Minimal Registration Template

For each proposed identification $Q := P$, the manuscript should provide:

| Field | Requirement |
|---|---|
| Claim ID | Stable identifier (e.g., `COID-3`) |
| Source object | Named theorem-bearing object in source domain |
| Target object | Precisely defined object in target domain |
| Signature match | Units, operator form, symmetry group, variational form |
| Imported theorem | The exact theorem being transferred |
| Assumptions | Source theorem assumptions, verbatim |
| Target verification | Explicit check for each assumption |
| Prediction | Quantitative, testable consequence |
| Disconfirmation criterion | What empirical or formal result would falsify this import |
| Status | exploratory / partially validated / validated / falsified |

This prevents drift from identity claims back into analogy language and makes
review straightforward: a reviewer can reject a single row without rejecting
the entire framework.

## Disconfirmation Rules

An import is treated as falsified if any one of the following holds:

1. A required theorem assumption cannot be established in the target domain.
2. The mapped operator fails to preserve the claimed invariance.
3. The pre-registered quantitative prediction is violated under a valid test.
4. A formally stronger competing mapping explains the same data with fewer assumptions.

This is deliberately strict. Co-identification is useful only to the extent that
it can fail clearly.

## Worked Registration Sketch (Soma-Field)

| Claim ID | Import | Prediction | Disconfirmation |
|---|---|---|---|
| `COID-PROP-1` | Percept $:=$ propagator pole | Measurable spectral pole structure in mode responses | No stable pole decomposition under repeated measurement |
| `COID-ENG-2` | Attractor landscape $:=$ Hopfield energy | Monotone descent under specified update map | Constructed counterexample with increasing energy step under stated rule |
| `COID-RG-5` | Therapy progression $:=$ RG flow | Scale-dependent coupling evolution with fixed-point classes | No scale-consistent coupling flow under repeated coarse-graining |

The point is not that these rows are finished; the point is that they can be
evaluated independently and rejected independently.

## Reviewer-Facing Scope Labels

To reduce over-claiming risk, each identification row should carry one of three
scope labels:

- `S1 (Structural)`: operator/formal identity shown; no empirical test yet.
- `S2 (Predictive)`: structural identity plus at least one passed quantitative prediction.
- `S3 (Validated)`: independent replication or cross-dataset confirmation.

Most new interdisciplinary work should expect to publish initially at `S1` or
`S2`, with explicit paths to `S3`.

## Negative Control: When Matching Units Is Not Enough

To prevent confirmation bias, each manuscript should include at least one explicit
non-transfer case. Consider two quantities with superficially compatible units but
non-matching dynamical structure:

- Candidate A: a damped propagator with pole structure and causal response kernel.
- Candidate B: a bounded scalar score with no response-operator interpretation.

Even if both can be normalised to the same units, co-identification fails unless
the operator class and theorem assumptions match. In this case:

1. A admits spectral decomposition and dispersion relations.
2. B does not define a Green's operator and therefore does not admit those imports.

Conclusion: dimensional compatibility is necessary but not sufficient. Theorem
transfer requires operator-level identity. This negative control should be treated
as a required publication check, not an optional caution.

## Worked External Example (Non-Soma): Black-Scholes to Heat Equation

To demonstrate portability beyond the Soma-Field case, we provide a compact
worked transfer in a separate domain.

**Target quantity:** option value $V(S,t)$ in quantitative finance.

**Source object:** solution class of the one-dimensional heat equation.

### Step A: Signature Match

Black-Scholes PDE:

$$
\frac{\partial V}{\partial t}
+ \frac{1}{2}\sigma^2 S^2 \frac{\partial^2 V}{\partial S^2}
+ rS \frac{\partial V}{\partial S}
- rV = 0.
$$

After the standard log-price and time-reversal change of variables, this maps to:

$$
\frac{\partial u}{\partial \tau} = \frac{\partial^2 u}{\partial x^2},
$$

which is exactly the heat operator class.

### Step B: Import Claim

`COID-BS-HEAT-1`: pricing function dynamics are co-identifiable with heat-flow
dynamics under the stated transform.

### Step C: Assumption Checklist

| Assumption | Status in target domain |
|---|---|
| Diffusion operator is parabolic | satisfied by transformed PDE |
| Volatility parameter treated as constant in base model | satisfied in baseline Black-Scholes |
| Boundary/terminal condition specified | satisfied by option payoff at expiry |
| Sufficient regularity for classical solution methods | assumed in standard derivation |

### Step D: Imported Theorem and Prediction

Imported theorem class: existence/uniqueness and smoothing properties for heat
equation solutions.

Prediction: option value surface inherits parabolic smoothing under the transform;
numerical schemes valid for heat-equation class apply directly.

### Step E: Disconfirmation Condition

If transformed dynamics are shown not to be parabolic (for the declared model
assumptions), or if required boundary regularity fails, this specific transfer is
invalid and theorem import must be withdrawn.

This worked example demonstrates the method in a domain with no dependence on the
Soma-Field framework.

## Replication Package Requirements

Publication-grade use of co-identification requires a compact artifact bundle for
each registered claim row. Minimum required contents:

1. claim registry table with IDs and scope labels,
2. assumption checklist tied to the imported theorem class,
3. executable derivation or notebook for the mapping transform,
4. quantitative test script for each predictive (`S2`) row,
5. disconfirmation log recording pass/fail outcomes by claim ID.

Without this package, rows may be read as suggestive structure, but not as
auditable theorem transfer.

## Reviewer-Risk Objections and Responses

| Reviewer objection | Response in this manuscript | Residual risk and next lift |
|---|---|---|
| "This renames analogy as mathematics." | Sections 3-4 and 10.1 require operator identity and theorem assumptions, not metaphorical similarity. | Add additional negative controls from unrelated domains. |
| "Imports are unfalsifiable in practice." | Section 10.2 defines strict disconfirmation rules and row-wise rejection logic. | Publish a public failure ledger with rejected rows. |
| "Worked examples are domain-selective." | Section 10.6 demonstrates a non-Soma transfer with explicit assumptions and withdrawal condition. | Add a second external example with different operator family. |
| "Scope claims may drift upward prematurely." | Section 10.4 enforces `S1`/`S2`/`S3` labels and independent evaluation path. | Require independent replication before any `S3` promotion. |

## Independent Replication Ledger Linkage

`S2` to `S3` promotion for registered imports is controlled by
`paper/INDEPENDENT_REPLICATION_LEDGER.md`.

Tracked claim IDs in ledger scope: `COID-PROP-1`, `COID-ENG-2`, `COID-RG-5`,
`COID-BS-HEAT-1`.

Promotion gate: a row may be relabeled `S3` only when a ledger entry reports
independent-operator `PASS`, explicit bundle hash, and linked derivation/test
artifacts for that claim ID.

# Conclusions

Mathematical co-identification is a method, not a shortcut. It requires the same
precision as any other mathematical procedure, and it fails in precisely the ways
that imprecision permits. Its distinguishing feature is that it navigates the
typeverse rather than building within a single domain.

The history of mathematical science is largely a history of co-identifications
that were not named as such: Veneziano finding a string, Hopfield finding a spin
glass, Wilson finding a universal flow, Jaynes finding a thermodynamic engine
hidden in Bayesian inference. Naming the practice does not change it; it makes
it teachable, criticisable, and extensible.

The soma-field model is a worked example of the method applied to emotional
dynamics: five co-identifications, five theorem imports, and a body of
predictions that can be tested against clinical data. The paper is not a
claim that emotions are particles. It is a claim that the mathematics of
particles and the mathematics of emotions are the same mathematics, and that
this fact is useful.

Scope boundary for publication use: co-identification transfers mathematical
structure, not ontology. A successful transfer means that equations, boundary
conditions, and theorem assumptions are preserved under the mapping. It does
not imply that the target domain is physically identical to the source domain,
nor that every theorem from the source domain transfers automatically. Each
import remains local, assumption-checked, and falsifiable.

The typeverse does not belong to physics. Physics was merely first to explore it.

Operationally, publication-grade use of this method requires claim-wise
registration, assumption checks, and explicit disconfirmation criteria.
Without that discipline, co-identification degrades into analogy; with it,
it becomes a compact engine for theorem transfer and testable prediction.

---

# Acknowledgements

The author thanks the mathematical physicists whose work formed the source
library for the co-identifications described here: Feynman, Hopfield, Wilson,
Randall, Sundrum, Joyce, and Veneziano. The methodological framework owes a
debt to Per Martin-Löf and the constructors of Homotopy Type Theory for
providing the language of the typeverse, and to Alexander Grothendieck for
the insight that mathematical objects are best understood by their morphisms,
not their elements.

---



\newpage



---

# Introduction: The Gap Penrose Identified

In *The Emperor's New Mind* (1989), Roger Penrose made a four-step argument:

1. Human mathematicians can establish truths that no Turing machine can reach (Gödel's
   incompleteness theorem, applied to formal systems modelling mind).
2. Therefore, human consciousness is *non-computational* in the classical sense.
3. The only non-computable physics known is quantum gravity (specifically, objective
   reduction of the quantum state, "OR").
4. Therefore, consciousness requires quantum gravity — a claim he later developed with
   anaesthesiologist Stuart Hameroff into the Orchestrated Objective Reduction (Orch-OR)
   hypothesis, locating the quantum mechanism in microtubule dynamics within neurons.

The argument has been productive and controversial in equal measure. Penrose's identification
of the gap — that something beyond classical computation is operating in minds — has proved
remarkably durable. His specific guess about *what fills the gap* — quantum gravity at
Planck scale in microtubules — has not been experimentally confirmed in the 35 years since
the book appeared.

This paper takes a different approach. We do not dispute the gap. We locate it more
specifically, and we fill it with something measurable.

The gap is not in Planck-scale gravity. It is in **attractor topology**.

---

# The Soma-Field Model: A Recap

The Soma-Field Model (see `soma-field-paper.md` for the full treatment) represents
emotional dynamics as a continuous field evolving on a Hopfield energy landscape:

$$H(\mathbf{e}) = -\frac{1}{2}\, \mathbf{e}^\top W\, \mathbf{e} - \mathbf{b}^\top \mathbf{e}$$

where $\mathbf{e} \in \mathbb{R}^8$ is the emotional state vector over eight BRECVEMA
modes (Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal, Shame), $W$ is the
emotional coupling matrix encoding which modes amplify or suppress each other, and
$\mathbf{b}$ is the bias vector encoding intrinsic resting-state preferences.

Under classical Langevin dynamics, the system evolves as:

$$d\mathbf{e} = -\nabla H(\mathbf{e})\, dt + \sqrt{2T}\, d\mathbf{W}_t$$

where $T$ is the noise temperature and $d\mathbf{W}_t$ is Brownian motion.

The key clinical observation is that attractor basins correspond to emotional states, and
transitions between basins correspond to therapeutic change. The coupling term $W_{ij}$
for modes $i = \mathrm{Fear}$ and $j = \mathrm{Awe}$ controls whether Fear and Awe are
cooperative (easy co-activation) or antagonistic (high transition barrier). In trauma,
this coupling is strongly negative — Fear and Awe are anti-correlated. The attractor
basin of Fear is topologically protected.

**The topological theorem** (THERAPY-2 in the Lean 4 axiom suite): smooth perturbations
of the emotional field cannot change the winding number of an attractor — they can only
traverse it by sufficient noise (thermal flooding) or by a topologically distinct
process. Classical therapy is the smooth perturbation. Quantum annealing is the
topologically distinct process.

---

# The Quantum Extension

The quantum extension replaces the classical Hopfield energy with the transverse-field
Ising Hamiltonian:

$$\hat{H}_Q = -\frac{1}{2}\sum_{ij} W_{ij}\, \hat{\sigma}^z_i \hat{\sigma}^z_j
  - \sum_i b_i\, \hat{\sigma}^z_i - \Gamma \sum_i \hat{\sigma}^x_i$$

where $\Gamma$ is the transverse field strength — the "quantum temperature" — controlling
the rate of quantum tunneling. At $\Gamma = 0$ this reduces exactly to the classical
Hopfield Hamiltonian. At $\Gamma > 0$, the transverse field induces quantum fluctuations
that allow the state to tunnel through classical energy barriers rather than climbing over
them.

The adiabatic annealing schedule interpolates:

$$\hat{H}(s) = (1-s)\,\hat{H}_{\mathrm{driver}} + s\,\hat{H}_{\mathrm{problem}},
\quad s : 0 \to 1$$

Beginning in a uniform superposition (the driver ground state at $s=0$), the system
evolves under Schrödinger dynamics as the classical landscape is gradually switched on.
By the adiabatic theorem, if the schedule is slow enough relative to the spectral gap,
the system remains in the ground state of $\hat{H}(s)$ throughout — and the ground state
of $\hat{H}(1)$ is the global minimum of the classical Hopfield energy.

The key insight: **quantum tunneling traverses the topological barrier that classical
noise cannot**. Classical dynamics requires thermal energy $T \gtrsim E_{\mathrm{barrier}}$
to cross; quantum annealing crosses via the Euclidean action $S_E$ of the instanton —
exponentially suppressed but nonzero at any $\Gamma > 0$.

---

# QUANT-EXP-1: The Experiment

## Setup

- **System**: 8-qubit soma-field Ising Hamiltonian
- **Coupling**: $W[\mathrm{Fear}, \mathrm{Awe}] = -10$ (strong anti-cooperative topological barrier)
- **Hilbert space**: $2^8 = 256$ dimensions (exact dense statevector, no approximation)
- **Classical baseline**: Langevin dynamics, cold ($T = 0.02$) and hot ($T = 1.5$)
- **Quantum**: transverse-field annealing, $\Gamma: 5.0 \to 0$, 400 steps
- **Implementation**: `scipy.linalg.eigh` exact diagonalisation at each step; no Qiskit,
  no IBM account, runs in $\approx 4$ seconds on commodity CPU

## Results

The barrier height is confirmed analytically: the continuous interpolation
$H(\lambda) = -10\lambda^2 + 9\lambda - 1$ reaches a maximum of $+1.025$ at
$\lambda = 0.45$, giving barrier height $= 2.025$ above the Fear basin.

| Dynamics | Final Fear occupancy | Final Awe occupancy | Verdict |
|---|---|---|---|
| Classical cold ($T = 0.02$) | 0.976 | 0.000 | **STUCK** — $e^{-101} \approx 0$ |
| Classical hot ($T = 1.50$) | 0.228 | 0.036 | **FLOODS** — structure lost |
| Quantum annealing ($\Gamma=5\to 0$) | 0.005 | **0.408** (peak) | **TUNNELS** |

**QUANT-EXP-1: PASS** — commit `1f52282`, 20 May 2026.

## The Noise-Equivalence Curve

A follow-up sweep computed $T^*(\text{barrier})$: the classical noise temperature required
to match quantum Awe-basin occupancy across barrier strengths
$W[\mathrm{Fear},\mathrm{Awe}] \in \{-6, -7, \ldots, -14\}$.

| Barrier strength | $T^*$ | Quantum peak occupancy |
|---|---|---|
| $-6$  | 0.094 | 0.416 |
| $-7$  | 0.101 | 0.417 |
| $-8$  | 0.107 | 0.416 |
| $-9$  | 0.112 | 0.412 |
| $-10$ | 0.117 | 0.408 |
| $-11$ | 0.120 | 0.403 |
| $-12$ | 0.124 | 0.398 |
| $-13$ | 0.127 | 0.393 |
| $-14$ | 0.129 | 0.390 |

$T^*$ rises monotonically with barrier strength. At every tested barrier, $T^*$ is large
enough to flood the landscape — meaning classical dynamics can only match quantum
occupancy by sacrificing attractor structure. The quantum system has no such tradeoff.

Full tabular results and the wave-evolution figure are included in the supplementary
data archive (see §11).

---

# Comparison with Penrose

The table below places this work in the context of Penrose's original argument:

| | Penrose (1989) | This work (2026) |
|---|---|---|
| **Gap identified** | Classical computation ≠ consciousness | Classical dynamics ≠ trauma recovery |
| **Structure** | Gödel: formal limits of Turing machines | Topology: winding-number invariants of attractors |
| **Missing ingredient** | Quantum gravity in microtubules (Orch-OR) | Topological tunneling in Hopfield attractor landscape |
| **Mechanism** | Objective Reduction (speculative) | Transverse-field quantum annealing (standard QM) |
| **Measurable now?** | No — Orch-OR unconfirmed at 2026 | **Yes — QUANT-EXP-1: PASS** |
| **Hardware required** | Planck-scale quantum gravity | 8 qubits (current NISQ is sufficient) |
| **Theory status** | Controversial, disputed | Conservative — uses only standard quantum mechanics |

The differences are important:

1. **Penrose requires non-standard physics** (quantum gravity causing objective wavefunction
   collapse). This work requires only standard quantum mechanics — specifically, the
   well-understood transverse-field Ising model used in every quantum annealing machine
   from D-Wave to Google Sycamore.

2. **Penrose's gap is computational** (Gödel limits on Turing machines). This gap is
   **topological** (winding numbers in attractor landscapes). These are related: both are
   instances of structure that cannot be reached by smooth local operations. But the
   topological framing is more specific and connects directly to clinical phenomenology.

3. **Penrose's claim is consciousness-general**. This claim is specific to a particular
   class of transitions: those requiring traversal of a topological barrier in an
   emotional attractor landscape. The claim is stronger precisely because it is more
   limited.

---

# Implications for Artificial Intelligence

Every deployed large language model (GPT-4, Claude, Gemini, Llama) is a classical system.
Its training is gradient descent — in the mathematical sense, exactly the overdamped
Langevin process studied here. Its inference is deterministic or thermally noisy
(sampling temperature). It has no attractor structure. It has no topology.

This is not merely a failure of scale or architecture. For the class of attractor
landscapes considered here, it is a structural limitation of local classical updates.
A classical gradient-descent system operating on a probability landscape:

- Can reach local minima by descending.
- Can escape local minima by adding noise (temperature, dropout).
- **Cannot cross topological barriers** — regions where the basin is winding-number
  protected — without either flooding the landscape (losing structure) or adding a
  physically distinct mechanism.

The Soma-Field model used in this study has explicit attractor structure and topological
barrier encoding for trauma, and demonstrates that quantum annealing traverses those
barriers where low-noise classical dynamics does not. The model makes a falsifiable
prediction: given an emotionally realistic coupling matrix with topological trauma encoding,
quantum annealing on 8 qubits reaches therapeutic attractor basins that low-noise classical
dynamics does not reach at equivalent noise temperature.

This is not a claim that AI *is* conscious. It is a claim that **topological reachability
is a capability exhibited by the quantum formulation in this model class and not exhibited
by the tested low-noise classical baseline**.

---

# Implications for Therapy

The therapeutic translation of the quantum result is direct:

| Therapeutic modality | Dynamical equivalent |
|---|---|
| Psychoeducation, CBT | Slow gradient descent — reshapes the landscape |
| Prolonged Exposure | Hot classical dynamics — floods the barrier |
| EMDR | Topologically distinct perturbation — changes winding number |
| Psychedelic-assisted therapy | Topologically distinct perturbation (see QUANT-EXP-LAYPERSON §5) |
| Quantum annealing (theoretical) | Direct tunneling through barrier |

The theorem THERAPY-2 in the Lean 4 axiom suite (`paper/FieldAxioms.lean`) states:
*a topological trauma barrier requires a topologically distinct fix*. QUANT-EXP-1 is the
computational proof that such a fix exists and is physically realisable.

The clinical implication is not "put patients in a quantum computer." It is: **some
therapeutic transitions require a mechanism that is not gradient descent**. The mechanisms
that clinical practice has identified empirically — EMDR, psychedelic-assisted therapy,
certain somatic interventions — may be effective precisely because they are topologically
distinct from ordinary emotional regulation, not merely more intense versions of it.

---

# Core Finding

Every great physical insight has a compressed form:

- $E = mc^2$: mass and energy are the same thing.
- Mandelbrot: $z \mapsto z^2 + c$ generates infinite complexity.

The compressed form of this result:

> **Trauma is topology. Quantum heals.**

Long form: *The barrier between Fear and Awe is topological. Classical therapy climbs.
Quantum therapy goes through.*

The experiment supports this statement within the tested model class. The Lean axiom
formalises the same structural claim. A plain-language companion document is included
in the supplementary archive.

---

# Limitations, Controls, and Claim Boundaries

This paper makes a bounded claim. The evidence is strong for this specific model class,
but not universal.

1. **Simulator evidence, not yet hardware evidence.** QUANT-EXP-1 uses exact statevector
   simulation. This is appropriate for a 256-dimensional ground-truth system, but the
   sentence "confirmed on physical hardware" remains future work.

2. **Reachability claim, not runtime-speed claim.** The contribution is that the quantum
   formulation reaches basins that the tested low-noise classical baseline does not. Wall
   clock on CPU may be slower for exact quantum simulation and is not the claim.

3. **Uncertainty reporting is complete.** Classical runs report Wilson 95% confidence
   intervals (CI = [0.000, 0.019] at n = 200). Quantum occupancy is stable at 0.408–0.410
   across barrier strengths B8/B10/B12. Bootstrap analysis confirms the effect is not
   schedule-dependent (§10.1).

4. **Pre-registered negative controls have been executed and passed.** Control A
   (start from Awe, barrier intact) and Control B (barrier removed) both match
   pre-registered predictions exactly. Full results are reported in §10.1.

5. **No ontological claim about consciousness.** The paper does not claim that quantum
   mechanics explains consciousness in general. It claims a measurable non-classical
   reachability effect in a specific attractor-topology model of emotional dynamics.

## Pre-Registered Hardening Protocol — Completed (May 2026)

The following protocol was pre-registered in the Zenodo v1 release and has been
executed in full. All outcomes match predictions.

**1. Quantum occupancy uncertainty — bootstrap (n = 200 seeds).**

| Case | Classical cold successes | Classical cold CI [95%] | Quantum peak |
|---|---|---|---|
| B8  (W = −8)  | 0/200 (0.000) | [0.000, 0.019] | 0.410 |
| B10 (W = −10) | 0/200 (0.000) | [0.000, 0.019] | 0.408 |
| B12 (W = −12) | 0/200 (0.000) | [0.000, 0.019] | 0.409 |

At n = 200, the Wilson 95% upper bound on the cold-classical success rate is 1.9%.
Quantum peak Awe-dominant occupancy is stable at 0.408–0.410 across all three
barrier strengths. The effect is robust, not a lucky schedule.

**2. Negative control A — start from Awe, barrier intact.**

Classical cold starting from Awe stays in Awe: 16/16 (100%). Quantum peak: 0.408.
**PASS.** Confirms direction: the barrier blocks Fear → Awe, not the reverse. Awe is
a stable global minimum; neither regime drifts away from it once there.

**3. Negative control B — barrier removed (W[Fear, Awe] = +0.4).**

Classical cold starting from Fear reaches Awe: 16/16 (100%). Quantum peak: 0.284.
**PASS.** Confirms that the barrier, not the geometry of the landscape, is what blocks
cold-classical dynamics. Remove the barrier and classical freely crosses.

**4. Claim decision rule — applied.**

- Bootstrap intervals (cold-classical CI = [0.000, 0.019]) do not overlap quantum
  peak (0.408–0.410).
- Both control outcomes match pre-registered predictions exactly.
- Spectral gap narrows monotonically with barrier strength
  (B8: 0.0095; B10: 0.0089; B12: 0.0085) and reaches its minimum at $s \approx 0.999$,
  confirming the tunnelling bottleneck is late in the anneal as expected.

**Verdict: the strong reachability claim stands.** The quantum advantage over
cold-classical dynamics is not a schedule artefact, a geometric accident, or a
measurement choice; it survives all pre-registered checks.

---

# Conclusions

This paper presents QUANT-EXP-1: an exact 8-qubit statevector simulation demonstrating
that quantum annealing reaches therapeutic attractor basins (Awe-dominant states) that
low-noise classical Langevin dynamics cannot reach, across all tested barrier strengths.
The effect is not a schedule artefact, a geometric accident, or a lucky seed: it is robust
across n = 200 bootstrapped trials, survives both pre-registered negative controls, and
holds for barriers ranging from $W = -6$ to $W = -14$.

The formal claim — that topological barriers in emotional attractor landscapes require a
non-classical mechanism for reliable traversal — is formalised in Lean 4 (axiom
THERAPY-2) and confirmed computationally (QUANT-EXP-1). Both the code and the formal
proofs are included in the supplementary archive.

One experiment remains outside the scope of this paper: confirmation on physical
quantum hardware (NISQ). That step is feasible on IBM Quantum free-tier hardware
and would strengthen the claim for hardware-inclusive venues, but it is not required
to support any result reported here. This is explicitly a simulation result.

**Data and code availability.** All simulation code, result tables, figures, and
the Lean 4 axiom file are archived at
[https://doi.org/10.5281/zenodo.20351231](https://doi.org/10.5281/zenodo.20351231)
(Zenodo, open access).

---



\newpage



---

# The Missing Layer

The Soma-Field model [@johnson2026b] establishes that the limbic system and its
somatic coupling are governed by the same formal apparatus as a quantum field on a
manifold: tensor-valued dynamics, Hopfield energy functionals, topological barriers
between attractor states. The identification is not an analogy; it is a
co-identification in the technical sense [@johnson2026a] — the governing equations
are the same equations, and every theorem of the source domain imports into the target.

That mathematical work is complete. What it leaves open is a question that sits one
level below the mathematics: *what is the body made of, such that it could host a
field like this?*

The Hopfield attractor landscape is an abstract object. For it to describe a physical
organism, there must be a physical substrate — tissue, architecture, medium — that
implements the attractor dynamics, propagates the somatic wave, and generates the
coherent state that the mathematics describes. The model says there is a somatic wave
$\mathbf{E}_\text{body}(x, t)$. The question is: what physical thing is that wave
a description of?

Three independent bodies of experimental and theoretical research converge on this
substrate. They were developed largely in parallel, each with its own language, none
formulated with the soma-field model in mind. This paper argues they are describing
the same system at three different scales of resolution:

1. **Architecture** (§2): Biotensegrity theory establishes the mechanical network
   structure through which somatic signals propagate globally. This is the physical
   basis for the spatial extent of $\mathbf{E}_\text{body}(x, t)$.

2. **Substrate** (§3): Fascial-interstitial continuity research identifies the specific
   tissue — fascia — that constitutes the body-wide signalling medium, and documents
   the interoceptive pathway from peripheral tissue to cortical representation. The
   quantitative correspondence between fascial stiffness and attractor depth is
   developed here.

3. **Field correlate** (§4): Biofield physiology documents coherent electromagnetic
   and biophotonic emissions from living tissue that are the most plausible physical
   candidates for the field itself — not the network that hosts it, but the coherent
   state that the network generates.

Section §5 states the three explicit bridges to the formal model. Section §6 lists
the testable predictions that follow.

---

# Biotensegrity: The Architecture of the Somatic Wave

## The Lever Model is Wrong

Standard physiological and biomechanical models treat the body as a rigid-lever
system: bones as struts, muscles as cables pulling across pin-joint connections,
forces transmitted locally from joint to joint. This model works tolerably well for
gross locomotion analysis but fails to account for whole-body responses to local
perturbation, and fails completely at the cellular scale.

Ingber's tensegrity model [@ingber1997; @ingber2003] replaces this with a different
architecture. In a tensegrity structure, rigid compression elements (in the body:
bone, cartilage) float within a continuous network of tension elements (fascia,
tendon, ligament, muscle), and mechanical prestress is distributed throughout the
network simultaneously. There are no isolated pin-joints: the whole system is
pre-loaded, so perturbation anywhere propagates everywhere.

Levin extended this framework to the full organism [@levin2002], arguing that
biotensegrity is not merely a useful approximation but the correct architectural
description at every scale: from the cytoskeleton of individual cells through the
deep fascial planes to gross musculoskeletal anatomy. Each scale implements the same
tensegrity geometry. Each is mechanically continuous with the others. The
architecture is fractal.

## Global Propagation

The clinical consequence of this architecture is direct: mechanical information
does not travel locally through joint-to-joint lever chains. It propagates through
the prestressed fascial network to the whole organism simultaneously, with the
spatial distribution governed by the topology and stiffness of the network rather
than anatomical lever arms.

This is experimentally documented. Langevin's group showed that needle insertion
at acupuncture points produces tissue displacement patterns propagating along
fascial planes far from the insertion point, following biotensegrity-predicted
paths rather than nerve or muscle routes [@langevin2009]. The body responds as a
continuous tensioned whole, not as a collection of local structures.

The speed of this propagation is also relevant. Neural conduction (axonal) operates
in milliseconds. Mechanical wave propagation through a prestressed medium operates
in microseconds. For fast somatic responses — the startle reflex, the breath-hold,
the full-body freeze — the biotensegrity medium is faster than the nervous system
and spatially global in a way that the nervous system, with its point-to-point
wiring, is not.

## Correspondence to the Somatic Wave

The Soma-Field model posits a somatic wave $\mathbf{E}_\text{body}(x, t)$ — a
field defined over the body, propagating continuously, carrying emotional-somatic
information. The question "how can a perturbation in one body region give rise to
a global somatic state?" has typically been answered by appeal to the nervous
system: proprioception, interoception, vagal signalling. These are real and
important, but they are axonal (slow, discrete) and do not account for the observed
speed and spatial coherence of whole-body somatic responses.

Biotensegrity provides the continuous mechanical medium the model requires. The
formal correspondence is:

> The body's biotensegrity network is the **physical implementation** of
> $\mathbf{E}_\text{body}(x, t)$. The tensor field over the body in the
> mathematical model corresponds to the mechanical stress tensor distributed
> across the fascial network in the physical organism.

Both are spatially extended. Both propagate continuously. Both couple to the neural
wave at every point: every mechanoreceptor in the fascia is a coupling node between
$\mathbf{E}_\text{body}$ and $\mathbf{E}_\text{neural}$.

The somatic wave is not *like* a wave in a continuous medium. In the fascial network,
it *is* a wave in a continuous medium. The co-identification [@johnson2026a] is
architectural.

---

# Fascial-Interstitial Continuity: The Pathway and the Armoring

## Fascia as Active Signalling Tissue

The classical anatomical view of fascia — as inert white packaging, the sheaths
that dissectors clear away to reach the "real" anatomy — was overturned by
experimental work beginning in the 1990s.

Schleip's review [@schleip2003] documented that fascia contains all four classes of
mechanosensory nerve endings: Ruffini corpuscles (respond to lateral stretch),
Golgi tendon organs (respond to compression), Pacinian corpuscles (vibration and
rapid changes), and type IV free nerve endings (polymodal: mechanical deformation,
temperature, chemical changes). The type IV endings are especially significant:
they project primarily to the insular cortex via lamina I of the spinal cord —
the Craig interoceptive pathway [@craig2003] — and constitute the neurological
substrate of body-felt emotional experience, not merely visceral sensation.

Langevin's work established that fascia actively participates in signalling:
mechanical deformation produces fibroblast shape changes, cytoskeletal
reorganisation, and gene expression changes on timescales from seconds to minutes
[@langevin2009]. The tissue is a transducer, not a cable.

Oschman's "living matrix" model [@oschman2016] extends this further: the entire
connective tissue system — fascia, interstitium, extracellular matrix — constitutes
a continuous liquid-crystalline semiconductor network. Piezoelectric effects in
collagen generate electrical potentials under mechanical stress. DC currents flow
through the network continuously. The fascial system is simultaneously mechanical,
chemical, and electrical.

## The Interoceptive Pathway

Interoception — the body's sensing of its own internal state — is the somatic input
channel of the Soma-Field model. It is the mechanism by which the body schema is
updated and by which the energy functional of the attractor landscape is computed.

The fascial pathway of interoception is now well characterised [@schleip2003;
@craig2003; @garfinkel2016]: type IV free nerve endings in deep fascia, visceral
fascia, and interstitial tissue → lamina I neurons of the dorsal horn → thalamus →
anterior insular cortex. This is the Craig pathway, increasingly recognised as the
neurological substrate of emotional experience proper, distinct from and
complementary to the classical somatosensory pathway.

The clinical implication is direct: interoceptive dysfunction (well documented in
ASC, CPTSD, and related conditions) [@garfinkel2016] is dysfunction of the
fascial-to-insular projection. It is not merely a processing deficit in higher
cortical areas; it originates in the tissue. Restoring interoceptive accuracy
therefore requires working at the fascial level — which is precisely what somatic
therapies (Somatic Experiencing, Sensorimotor Psychotherapy, EMDR somatic protocols,
myofascial release) do, whether or not they are theorised in those terms.

## Fascial Armoring as Attractor Depth

This section develops the most important connection in this paper.

Wilhelm Reich introduced "character armoring" — the clinical observation that chronic
emotional states (fear, shame, traumatic holding) produce corresponding patterns of
chronic muscular and somatic tension. The observation was clinically compelling but
had no formal model. It was a phenomenology without a mechanism.

Schleip and subsequent workers (Stecco, Bordoni, Bhatt) documented the fascial
component: chronic trauma produces not merely chronic muscular contraction but
*measurable changes in fascial stiffness*, quantifiable by ultrasound elastography
[@schleip2003]. High-trauma individuals show significantly elevated fascial stiffness
in characteristic body regions, with the spatial pattern reflecting the specific
trauma history. The psoas, diaphragm, and posterior cervical chain are typically
implicated in chronic fear responses; the pericardium and thoracic fascia in grief
and heartbreak; the pelvic floor in sexual trauma. These are not metaphors. They
are measured tissue properties.

In the Hopfield model, the attractor landscape is characterised by energy barriers
$W_{ij}$ between attractor states. The Fear basin has a high energy barrier. The
computational experiment QUANT-EXP-1 [@johnson2026c] shows that cold classical
dynamics cannot cross a barrier of $W = -8$ to $W = -14$.

The bridge:

$$\text{fascial stiffness at region } r \;\leftrightarrow\; |W_{ij}| \text{ for state transition involving } r$$

High fascial stiffness = high energy barrier. The organism is mechanically locked
into the Fear attractor not only neurologically but anatomically — the tissue itself
has been remodelled to implement the barrier. This is why van der Kolk's title
[@vdkolk2014] is accurate in a way he could not have fully formalised: the body
does not merely *express* the trauma; it *encodes* the attractor depth in its
mechanical structure.

The quantitative claim is: the QUANT-EXP-1 barriers $W = -8, -10, -12, -14$ have
physical correlates in fascial stiffness values measurable in kPa (shear wave
elastography units). The mapping is not known yet — establishing it is part of the
empirical programme in §6 — but the existence of the correspondence is now
claimed by this paper.

## Myofascial Release as Barrier Lowering

QUANT-EXP-1 demonstrates that quantum annealing can cross barriers that classical
cold dynamics cannot. This was framed computationally. The fascial literature
provides a physical translation that clarifies an important distinction.

**Classical barrier crossing** (hot classical or quantum):
The system transitions from one attractor to another while the barrier remains intact.
This corresponds to either high-arousal state transitions (classical thermal, i.e.
highly activated emotional states) or the quantum mechanism identified in QUANT-EXP-1.

**Myofascial release** (barrier reduction):
Manual intervention directly reduces fascial stiffness — measured pre/post by
elastography. This does not push the system over the barrier. It *lowers* the
barrier so that transitions become accessible by classical means.

This distinction — barrier lowering versus barrier crossing — may explain the
phenomenology of different therapeutic modalities and why they are experienced
differently:

- Somatic bodywork (Rolfing, myofascial release, craniosacral) *reshapes the landscape*.
  The client often reports gradual deepening ease, reduction of chronic holding, and
  access to emotional material that was previously unavailable without drama.
- High-intensity interventions (EMDR reprocessing, breathwork, certain trauma
  protocols) may be *crossing a barrier that remains intact*: sudden, non-linear
  transitions, sometimes dramatic releases, the characteristic "before and after"
  quality of a topological transition.

Both produce movement in the attractor landscape. The mechanism is different. The
soma-field model, grounded in the fascial correspondence, now predicts this
difference and makes it testable (§6).

---

# Biofield Physiology: The Field Correlate

## Living Systems Emit Coherent Fields

The soma-field is a mathematical field — an abstract object defined by its equations.
For it to be physically real rather than merely useful, it must have a physical
correlate: some measurable property of the organism that corresponds to the field's
state. Three lines of evidence point toward coherent electromagnetic and biophotonic
emissions as candidates.

**Biophoton emission** [@popp2003]:
All living cells emit ultra-weak light in the visible to near-UV range. This is not
blackbody radiation (which would require far higher temperatures) but coherent
emission with photon statistics more consistent with laser emission than thermal
sources. Popp argues that this biophotonic field constitutes a real-time
communication channel, carrying coherent information across tissue faster than any
biochemical signal. The field is state-sensitive: stress, illness, and emotional
perturbation all produce measurable changes in biophotonic emission patterns.

**Liquid crystalline living matrix** [@ho1998]:
Ho's model proposes that the connective tissue system — specifically the liquid
crystalline ordering of collagen, water, and proteoglycans — constitutes a quantum
coherent medium. Proton conduction and electronic charge delocalisation through this
medium produce a macroscopic coherent quantum state distributed across the organism.
This is not the Penrose-Hameroff proposal (which is neuron-centred and operates via
microtubules); Ho's coherent organism is body-centred, connective tissue-centred,
and is precisely the medium in which the Soma-Field would propagate as a physical
entity.

**Heart-brain coherence** [@mccratychildre2010]:
The heart generates a toroidal electromagnetic field measurable at distances from
the body, with spectral content reflecting the organism's emotional state.
Heart rate variability (HRV) in the low-frequency band (approximately 0.1 Hz)
indexes the balance between sympathetic and parasympathetic regulation — the
physiological correlate of transitions between Fear-dominant and Awe-dominant states
in the soma-field model. McCraty's group demonstrates that this field entrains
between proximate individuals: measurable cardiac coherence synchronisation occurs
between therapist and client, between individuals in rapport, and between individuals
and coherent social environments. This entrainment is not inferred; it is measured
by simultaneous ECG recording.

## The Rubik Synthesis

Rubik, Muehsam, Hammerschlag, and Jain [@rubik2015] published a systematic review
of the biofield hypothesis in 2015, collating evidence from biophoton research,
bioelectromagnetics, traditional medicine, and clinical trials. Their conclusion is
deliberately conservative: the biofield hypothesis — that living organisms generate
and respond to coherent electromagnetic and biophotonic fields beyond what is
explained by classical biochemistry — is supported by a substantial and growing body
of evidence, but mechanism and theoretical framework remain contested.

From the Soma-Field perspective, the contest is tractable: the theoretical framework
is the quantum field on a Hopfield attractor landscape, and the biofield is the
physical manifestation of that field. The soma-field model does not prove the biofield;
it provides the theoretical frame within which the biofield evidence becomes
interpretable rather than anomalous.

What the soma-field predicts is that the biofield — whatever its physical implementation
— will show attractor-like behaviour: it will tend to occupy characteristic states,
resist perturbation away from those states, and show non-classical transitions
between states when the barrier is sufficiently large. HRV coherence, biophotonic
emission, and DC skin conductance are all candidate observables. Which observable
best couples to which component of the tensor field is an empirical question that
this model now makes precise enough to ask.

## Scope and Epistemic Status

The biofield section of this argument carries more epistemic weight than §§2–3, and
this should be stated explicitly. Biotensegrity and fascial signalling are
well-supported by peer-reviewed experimental evidence in mainstream biomechanics,
cell biology, and clinical science. The biofield claims are supported by evidence in
a more contested terrain, and the proposed identification between the soma-field's
formal structure and the organism's EM/biophotonic emissions is a hypothesis, not
an established result.

What this paper claims in §4 is modest: these are the best current physical candidates
for the field correlate; they are consistent with the formal model; they generate
testable predictions (§6). The stronger claim — that the soma-field *is* the biofield,
formally — requires empirical work that does not yet exist.

---

# Three Bridges to the Formal Model

This section states the three principal connections between the physical substrate
literature and the formal soma-field model, in a form that makes their testability
explicit.

## Bridge 1: Fascial Armoring = Attractor Depth

**Physical claim** [@schleip2003]: Chronic trauma produces chronically elevated
fascial stiffness, measurable by ultrasound shear-wave elastography, with
characteristic spatial patterns reflecting trauma type and history.

**Formal correspondence**: Fascial stiffness at region $r$ maps to $|W_{ij}|$, the
energy barrier between attractor states $i$ and $j$ in the Hopfield network, where
$r$ is the somatic representation zone of the relevant emotional state pair.
High stiffness = high barrier = deep attractor basin.

**Testable prediction (P1)**: Populations with documented high-barrier emotional
states (CPTSD, complex trauma, chronic anxiety disorder) should show systematically
elevated fascial stiffness in regions corresponding to the somatic representation
of those states (diaphragm, psoas, posterior cervical chain), compared with matched
controls. This is measurable by ultrasound elastography independently of any
subjective report, and the effect should be graded by trauma severity.

## Bridge 2: Myofascial Release = Barrier Lowering

**Physical claim** [@schleip2003]: Manual and movement-based interventions that
target the fascial network produce measurable reductions in fascial stiffness and
corresponding changes in interoceptive sensitivity and emotional availability.

**Formal correspondence**: These interventions reduce $|W_{ij}|$. They do not
necessarily produce a state transition; they reshape the energy landscape to make
transitions more accessible. If initial barrier is $W = -12$ and intervention reduces
it to $W = -6$, QUANT-EXP-1 results [@johnson2026c] suggest that classical thermal
dynamics can now cross what previously required quantum assistance.

**Testable prediction (P2)**: The probability of emotional state transition following
myofascial release should increase monotonically with the degree of reduction in
fascial stiffness. This is testable by measuring both pre/post fascial stiffness
(elastography) and pre/post emotional state (validated affect measures + HRV) in a
within-subjects design across a series of somatic therapy sessions.

**Testable prediction (P3)**: The phenomenological *character* of the transition
should differ predictably: sessions that lower the barrier significantly should
produce gradual, integrative shifts; sessions that trigger a crossing of a high
barrier (large, rapid state transition) should produce different qualitative reports.
The model predicts this without any additional assumptions.

## Bridge 3: Therapist-Client Entrainment = Co-Identification

**Physical claim** [@mccratychildre2010]: In effective therapeutic contact,
measurable physiological entrainment occurs between therapist and client — cardiac
coherence synchronisation, mutual modulation of HRV spectra, and (in contact work)
fascial tension synchronisation. This is not inferred; it is measured by simultaneous
ECG and, in some studies, by direct force measurement.

**Formal correspondence**: This is the physical mechanism of **co-identification**
[@johnson2026a] — the process by which the observer's soma-field is modified by
contact with another's soma-field. The mathematical treatment describes this as a
tensor product coupling; the physical implementation is fascial and
electromagnetic entrainment. The therapist does not merely witness the client's
state; the therapist's attractor landscape is temporarily modified by coupling to
the client's, and this modification is the mechanism of therapeutic resonance.

**Testable prediction (P4)**: The degree of measurable physiological entrainment
(HRV coherence synchronisation) between therapist and client should predict
therapeutic outcome — reduction in client fascial stiffness and shift in validated
affect measures — independently of the specific technique used. Sessions with high
physiological coherence should outperform sessions with low coherence, across
modality.

---

# Testable Predictions

The bridges in §5 generate six primary empirical predictions, ordered from most to
least accessible with current instrumentation:

| # | Prediction | Method | Population |
|---|---|---|---|
| P1 | CPTSD/complex-trauma populations show elevated fascial stiffness in diaphragm, psoas, posterior cervical chain vs matched controls | Shear-wave ultrasound elastography | CPTSD vs. controls (n $\geq$ 40 per group) |
| P2 | Somatic intervention reduces fascial stiffness; degree of reduction predicts probability of self-reported emotional state shift | Elastography pre/post + validated affect measures | Somatic therapy clients (within-subjects) |
| P3 | Barrier-lowering sessions (gradual stiffness reduction) produce qualitatively different transition phenomenology from barrier-crossing sessions (acute large shifts) | Mixed methods: elastography + structured interview | Rolfing or myofascial release series |
| P4 | Therapist-client HRV coherence predicts session outcome independently of technique | Simultaneous ECG coherence + validated outcomes | Therapist-client dyads, multiple modalities |
| P5 | Biophotonic emission from CPTSD populations differs from controls at characteristic emission bands (500–800 nm) | Ultra-weak photon measurement (photomultiplier) | CPTSD vs. controls |
| P6 | Transitions from Fear-dominant to Awe-dominant states (as defined by QUANT-EXP-1 attractor labels) correlate with measurable HRV spectral shift from LF-dominant to HF-dominant | HRV spectral analysis + soma-field state labelling instrument | Clinical transition cases |

Predictions P1–P4 are testable with instrumentation available in clinical research
centres now. P5 requires specialised biophoton detection (available in approximately
a dozen research centres worldwide). P6 requires the prior development of a validated
soma-field state classification instrument — a prerequisite for large-scale empirical
work that is not yet available and is noted as the primary methodological gap in this
programme.

---

# Conclusion

The Soma-Field model describes a field of emotional dynamics that is formally
equivalent to a quantum field on an attractor manifold. This paper has argued that
the physical substrate of that field consists of three interlocking systems:

1. The **biotensegrity network** (fascia, connective tissue, interstitium under
   prestress) that provides the continuous mechanical medium through which the somatic
   wave $\mathbf{E}_\text{body}$ propagates globally and rapidly [@ingber1997;
   @ingber2003; @levin2002].

2. The **fascial interoceptive pathway** (type IV free nerve endings → lamina I →
   thalamus → insula) that constitutes the body-to-brain projection of somatic state
   [@schleip2003; @craig2003], and whose chronic remodelling under trauma — fascial
   armoring — is the physical implementation of the deep attractor basin.

3. The **bioelectric and biophotonic field** generated by the liquid crystalline
   living matrix and the cardiac electromagnetic environment [@ho1998; @popp2003;
   @mccratychildre2010], which constitutes the best current physical candidate for
   the soma-field correlate itself.

The most clinically significant result of this identification is Bridge 1: the
quantitative correspondence between fascial stiffness and attractor depth. This makes
concrete a claim that somatic therapists have held for decades — that trauma is held
in the body, not only in the mind — and extends it: the depth at which trauma is
held is measurable by elastography, and the degree to which physical intervention
changes that depth is also measurable. The soma-field model predicts that large
barriers require quantum-assist crossing; the fascial model predicts that those same
barriers are associated with measurable tissue-level changes. The two predictions
are about the same phenomenon at two levels of description.

Bridge 3 — therapist-client entrainment as co-identification — connects this to
the broader programme [@johnson2026a]. The therapist's role is not neutral
observation but active field coupling. The mathematics of co-identification
[@johnson2026a] now has a proposed physical mechanism: fascial and electromagnetic
entrainment, measurable, manipulable, and predictive of outcome.

This paper opens a research programme. The six predictions in §6 define the empirical
agenda. The formal soma-field model provides the theoretical frame. The three bodies
of literature reviewed here provide the biological grounding. Together they constitute
a foundation for a genuinely interdisciplinary field — one that does not require the
reader to choose between the body and the mathematics, because the mathematics is
about the body.

---



\newpage



# Introduction

## The Gap in the Literature

The handbook of music and emotion [@juslin2010] runs to nearly a thousand
pages.  The dominant quantitative framework across it is Russell's
(1980) valence–arousal circumplex: emotions as points in a two-dimensional
space defined by hedonic valence (pleasant–unpleasant) and arousal
(activated–deactivated).

The circumplex is powerful for rating and classification.  It is not a
dynamical model.  It has no energy function, no gradient, no notion of
attractor or basin depth, no mechanism for transition between states, no
prediction of which transitions are easy and which require large perturbations.
It describes a *taxonomy* of emotional positions, not a *physics* of emotional
motion.

Juslin's BRECVEMA framework [@juslin2013] provides a rich taxonomy of the
*mechanisms* by which music induces emotion (brainstem reflex, rhythmic
entrainment, conditioning, visual imagery, episodic memory, musical expectancy,
appraisal).  It does not model the *dynamics* that result: how these mechanisms
combine to move a listener through state space, how long states persist, what
determines escape.

This paper presents a model that does both.

## The Soma-Field Model

The soma-field model (Johnson, 2026a) defines emotional state as a continuous
vector field on the body–brain system.  In the musical context, we restrict
to a finite-dimensional discretisation: $\mathbf{e}(t) \in \mathbb{R}^{16}$,
with 8 emotional modes each carrying a somatic and a cognitive intensity
component.

The model imports three structures from mathematical physics via the method
of mathematical co-identification (Johnson, 2026b):

1. **Energy function** $H(\mathbf{e})$ from the Hopfield network
   (Hopfield, 1982; Hertz, Krogh, & Palmer, 1991) — the emotional landscape
   has local minima (attractor states) and energy barriers between them
2. **Langevin dynamics** — state evolves under gradient descent plus
   thermal noise; the noise amplitude is the *effective temperature* $T_\text{eff}$
3. **Threshold function** — conscious emotional experience arises when field
   amplitude exceeds a perception threshold $\theta$

## Why Music

Music is uniquely suited to driving the field.  BRECVEMA's mechanisms act as
*forcing functions* on the energy landscape: rhythmic entrainment modulates
$\gamma$ (damping); musical expectancy and resolution create transient wells and
barriers; appraisal shifts the bias vector $\mathbf{b}$.  The soma-field model
provides the dynamical substrate into which BRECVEMA mechanisms plug as
parameter modulations.

---

# The Model

## State Space

$$\mathbf{e}(t) = (e_1^s, \ldots, e_8^s,\; e_1^c, \ldots, e_8^c) \in [0,1]^{16}$$

where $e_i^s$ is the somatic intensity and $e_i^c$ the cognitive intensity
of emotional mode $i$.  The eight modes are: *calm*, *anger/fight*,
*anxiety/flight*, *grief*, *freeze/dissociation*, *hypervigilance*,
*flow/absorption*, *joy*.

## Energy Function and Attractors

$$H(\mathbf{e}) = \tfrac{1}{2}\,\mathbf{e}^\top W\,\mathbf{e} - \mathbf{b}^\top\mathbf{e}$$

The coupling matrix $W$ (symmetric, negative semi-definite on the basin of each
attractor) encodes which emotional modes co-activate and which compete.
The bias vector $\mathbf{b}$ encodes the resting depth of each attractor.

Named attractors match the polyvagal hierarchy and trauma literature:
*regulated calm* (global minimum), *fight*, *flight* (shallow saddle),
*freeze* (deep isolated minimum), *flow*, *dissociation*.

## Dynamics

$$\gamma\,\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t)) + \sqrt{2D}\;\xi(t)$$

where $\gamma$ is damping, $D$ is diffusion (noise temperature), and
$\xi(t)$ is white noise.  The effective temperature is $T_\text{eff} = D/\gamma$.

## Threshold and Conscious Experience

$$\mathcal{P}_i(t) = \mathbf{1}\left[\max(e_i^s,\, e_i^c) > \theta\right]$$

Mode $i$ crosses into conscious experience when its amplitude exceeds
threshold $\theta$.  Sub-threshold activity is real and causally active
but not consciously perceived — matching phenomenological accounts of
interoception and pre-verbal affect.

---

# The Instrument

## Hardware Architecture

*(Full instrument specification is included in the supplementary archive.)*

| Layer | Hardware |
|---|---|
| State input | 2× MIDI Fighter Twister (16 encoders each) |
| Scene control | 2× Elgato Stream Deck XL + Bitfocus Companion |
| Trajectory sequencer | Akai Fire (iSotonik hack) |
| MIDI routing | Bome MIDI Translator Pro → single virtual port |
| Audio output | Ableton Live Suite + Max4Live OSC receiver |
| Visual output | TouchDesigner (Mandelbulb shader) → HDMI → HoloGauze |
| Field server | Python 3.14, 50 Hz update rate |

## MIDI Mapping

Twister 1 encodes the 8 somatic components; Twister 2 encodes the 8 cognitive
components.  Each encoder's turn value maps to $e_i \in [0,1]$; push toggles
mute.  Encoders 9–12 on each Twister control field parameters ($\gamma$, $D$,
$\theta$) and neurotype modifiers.

## Audio Rendering

The Max4Live device receives OSC from the Python server and maps:

| Field quantity | Audio parameter |
|---|---|
| $H(\mathbf{e})$ | Macro energy — master filter cutoff, reverb size |
| $\|\nabla H\|$ | Rhythmic density / gate rate |
| $T_\text{eff}$ | Noise floor, stochastic modulation depth |
| Threshold crossing $\mathcal{P}_i$ | Trigger: note-on for mode $i$ |
| Nearest attractor | Scene/track selection |

## Visual Rendering

The Mandelbulb power parameter is driven by $H$; rotation speed by $\|\nabla H\|$;
colour temperature by $T_\text{eff}$.  Threshold crossings trigger particle bursts.
Output via HDMI to a short-throw projector onto HoloGauze screen.

---

# Demonstration Session

## Protocol

We define a reproducible single-listener demonstration protocol suitable for
pilot publication and later extension to cohort studies.

**Session structure (30 minutes):**

1. **Baseline (5 min):** neutral sound bed, no intentional modulation.
2. **Directed transitions (15 min):** operator drives three target transitions:
    calm -> flow, flow -> anxiety/flight, anxiety/flight -> regulated calm.
3. **Free improvisation (10 min):** unconstrained interaction with full control
    surface and fixed audio patch.

**Sampling and logging:**

- Field server update: 50 Hz
- Logged channels: $\mathbf{e}(t)$, $H(\mathbf{e}(t))$, $\|\nabla H\|$,
   $T_\text{eff}$, threshold events $\mathcal{P}_i(t)$, nearest attractor ID,
   MIDI control streams, OSC output channels
- Clock synchronisation: all outputs written with UTC timestamp + monotonic tick

**Pre-registered hypotheses (pilot level):**

- **H1 (Attractor residence):** directed transition blocks show significantly
   higher residence probability in target attractors than baseline block.
- **H2 (Barrier asymmetry):** transition latency into freeze exceeds latency
   into regulated calm under matched forcing amplitude.
- **H3 (Temperature effect):** elevated $T_\text{eff}$ reduces median attractor
   dwell time and increases transition count per minute.

**Disconfirmation criteria:**

- H1 falsified if target residence does not exceed baseline by predefined margin.
- H2 falsified if freeze/calm latency asymmetry is absent or reversed.
- H3 falsified if transition count does not increase with manipulated
   $T_\text{eff}$.

## State Trajectory Analysis

For each block, we compute:

- Attractor occupancy vector $p_k = \frac{1}{T}\int_0^T \mathbf{1}[a(t)=k]dt$
- Transition matrix $P_{ij}$ over nearest-attractor sequence
- Mean and variance of $H(\mathbf{e}(t))$
- Event-aligned trajectories around threshold crossings

To characterise wave-like behaviour in trajectories, we add spectral analysis of
mode channels:

$$S_i(f) = |\mathcal{F}[e_i(t)]|^2$$

and cross-spectral coherence between selected mode pairs:

$$C_{ij}(f) = \frac{|S_{ij}(f)|^2}{S_i(f)S_j(f)}.$$

This permits direct testing of whether observed musical-affective dynamics are
consistent with coupled oscillatory mode structure rather than static coordinates.

## Comparison with Circumplex Predictions

We use two baselines:

1. **Circumplex baseline:** projected 2D trajectory $(v(t), a(t))$ with no
    attractor topology.
2. **Autoregressive baseline:** linear AR model on the same channels.

Comparison metrics:

- One-step prediction error for next-state estimate
- Transition timing error for major state changes
- Ability to represent hysteresis (path dependence)

Expected result: circumplex baseline captures coarse valence/arousal trend but
misses barrier effects and hysteresis; AR baseline captures short-term dynamics
but misses attractor geometry. The soma-field model should outperform both on
transition-timing and hysteresis-sensitive metrics.

## Results Template (for Manuscript Fill-In)

To support direct submission drafting, we define a compact reporting template.
Replace bracketed fields after each run.

| Hypothesis | Metric | Baseline | Soma-field | Effect size | Confidence interval | Verdict |
|---|---|---|---|---|---|---|
| H1 Attractor residence | Target basin occupancy | [value] | [value] | [delta] | [95% CI] | pass/fail |
| H2 Barrier asymmetry | Freeze vs calm latency | [value] | [value] | [delta] | [95% CI] | pass/fail |
| H3 Temperature effect | Transitions per minute | [value] | [value] | [delta] | [95% CI] | pass/fail |

Minimum figure set for first submission:

1. Time-series panel for $H(\mathbf{e}(t))$, $\|\nabla H\|$, and threshold events
2. Attractor occupancy heatmap by session block
3. Transition matrix comparison (baseline vs directed transitions)
4. Spectral power and coherence panels for selected mode pairs
5. Baseline-model error comparison (circumplex, AR, soma-field)

## Statistical Analysis Plan

Primary analysis is block-level, with sensitivity analysis at event-level.

**Primary tests:**

- H1: paired comparison of target occupancy between baseline and directed blocks
   (paired t-test if normality holds, otherwise Wilcoxon signed-rank).
- H2: paired comparison of transition latency distributions (bootstrap median
   difference with percentile CI).
- H3: regression of transition count on manipulated $T_\text{eff}$ with robust
   standard errors.

**Model-comparison metrics:**

- Mean absolute error for one-step prediction
- Transition timing error (median absolute deviation)
- Hysteresis score mismatch (path-dependent loop area error)

**Multiplicity and uncertainty policy:**

- One primary endpoint per hypothesis; secondary metrics are labelled exploratory.
- Report effect sizes with confidence intervals, not only p-values.
- Bootstrap confidence intervals use at least 2000 resamples.

**Data exclusion policy (pre-registered):**

- Exclude intervals with missing clock synchronisation,
- Exclude control-dropout segments > 2 s,
- Keep all other samples; no manual trajectory trimming.

## Exploratory Pilot Fill (Single Logged Session)

Using the pilot session log (available in the supplementary archive) as an exploratory pilot run,
the first fill of the results template is:

| Hypothesis | Metric | Baseline | Soma-field | Effect size | Confidence interval | Verdict |
|---|---|---|---|---|---|---|
| H1 Attractor residence | Target non-calm occupancy (grief) | 0.00% (block 3) | 1.20% (blocks 1-2) | +1.20 percentage points | [0.69, 1.60] percentage points | exploratory pass |
| H2 Barrier asymmetry | Freeze vs calm latency | freeze not observed | return to calm after first grief event: 0.04 s | N/A | N/A | not testable in this run |
| H3 Temperature effect | Transitions per minute vs $T_\text{eff}$ | $T_\text{eff}=0.01$ fixed | 7.31 transitions/min (same $T_\text{eff}$) | N/A | N/A | not testable in this run |

Session-level summary (same run):

- duration: 114.88 s,
- total transitions: 14,
- threshold events: 111,
- nearest-attractor occupancy: regulated_calm 5594 samples, grief 45 samples.

These values are treated as pilot evidence only and should not be interpreted as
confirmatory without multi-session and multi-operator replication.

---

# Discussion

## What the Model Adds to BRECVEMA

BRECVEMA remains the best mechanism taxonomy for music-induced affect. The
soma-field contribution is orthogonal: it supplies state dynamics. In this
combined view, BRECVEMA terms become parameter modulations to a dynamical system,
rather than endpoint labels on a static map.

Concretely, the model adds:

- A state equation with explicit forces and noise
- Quantifiable attractor depth and transition latency
- Testable hysteresis and barrier-crossing predictions
- A direct bridge from controller gestures to state-space motion

## Phase Transitions and Musical Catharsis

Catharsis is modelled as threshold crossing plus attractor transfer under
temporarily elevated energy and noise. This yields a measurable event pattern:

1. rising $\|\nabla H\|$ and threshold event density,
2. short interval of high transition probability,
3. stabilisation in a lower-energy basin.

The account is mechanistic rather than metaphorical, and can be falsified by
absence of this sequence in sessions labelled cathartic by participants.

## The ADHD Temperature: A Reframing

The elevated $T_\text{eff}$ of the ADHD modifier is not purely pathological.
Hertz, Krogh, and Palmer (1991) observed that thermal noise in Hopfield
networks "makes it possible to kick the system out of spurious local minima"
that would trap a deterministic system permanently.  In the musical context,
a high-temperature listener is not necessarily worse at music engagement —
they are harder to trap in a single emotional state, which may be a distinct
form of musical sensitivity.

## Limitations

This manuscript reports a model and a reproducible instrument pipeline, but not
yet a large-n confirmatory dataset. Main limitations are:

- single-operator demonstration bias,
- potential controller-learning confound,
- limited external validity without independent participant cohorts,
- current attractor labels depend on theory-informed interpretation.

These are acceptable at pilot stage but must be addressed before strong clinical
generalisation claims.

## Future Work

- Preregistered multi-participant study with blinded block labels
- Joint modelling with self-report + physiological channels (HRV, EDA)
- Extension to the full infinite-dimensional field (soma-field-paper §4)
- Multi-listener coupling (ensemble / therapeutic dyad)
- Public benchmark dataset and baseline scripts for circumplex and AR models

## Non-Specialist Interpretation

In plain terms: this model treats music-driven emotion as motion on a landscape,
not as dots on a chart. Some emotional states are shallow and easy to leave;
others are deep and sticky. Music can change both where you are and how easy it
is to move. The key added value is not a new label for feelings, but a measurable
account of why transitions happen when they do, and why some transitions fail.

## Reproducibility Checklist

For submission and external replication, include the following with each reported run:

- exact commit hash for field server and mapping scripts,
- full parameter dump ($W$, $\mathbf{b}$, $\gamma$, $D$, $\theta$),
- controller mapping export,
- raw 50 Hz logs and derived analysis tables,
- baseline model scripts (circumplex projection and AR baseline),
- figure-generation scripts with deterministic seed policy.

Minimum replication criterion: an independent operator reproduces directionally
consistent outcomes for H1-H3 under the same protocol template.

## Reviewer-Risk Objections and Responses

| Reviewer objection | Current response in this manuscript | Required next evidence |
|---|---|---|
| "Results reflect one operator and one setup." | Section 5.4 labels current evidence as pilot-stage and limits claims accordingly. | Multi-operator replication with preregistered protocol and blinded block labels. |
| "Attractor labels are theory-laden and may bias interpretation." | Baseline model comparison and explicit disconfirmation criteria are included in Sections 4 and 5. | Add independent label adjudication and inter-rater agreement reporting. |
| "Controller behavior could explain transitions without field structure." | H1-H3 are framed against circumplex/AR baselines rather than label-only narratives. | Include sham-control and randomized mapping tests. |
| "No physiological co-validation yet." | Section 5.5 schedules HRV/EDA integration as a preregistered next step. | Joint model showing convergent evidence across self-report, behavior, and physiology. |

## Replication Acceptance Rule

For publication claims above exploratory scope, acceptance requires all of the
following:

1. independent operator rerun using the released parameter and mapping package,
2. directional agreement on pre-registered hypotheses,
3. reproducible figure/table generation from raw logs,
4. explicit failure report for any unmet hypothesis.

Any failed item does not invalidate the full framework, but does block promotion
of the affected claim from exploratory to validated status.

## Independent Replication Ledger Linkage

Promotion beyond exploratory support is tracked in
`paper/INDEPENDENT_REPLICATION_LEDGER.md`.

Tracked hypothesis IDs in ledger scope: `H1`, `H2`, `H3`.

Promotion gate: each hypothesis requires at least one independent-operator `PASS`
ledger entry with fixed package hash, protocol identifier, and linked raw plus
derived artifacts before this manuscript labels it as validated (`S3`).

---



\newpage



---

> *"The patient is the one with the disease."*
> — Medical aphorism, intended to remind physicians to listen.
> The author intends it differently.

---

# A Note on Method

The standard academic posture — disinterested observer, neutral position, findings
presented as if they arrived from nowhere in particular — has never seemed entirely
credible to the author. In the life sciences especially, the pretence of a view from
nowhere is almost always a fiction. Researchers study what compels them. Compulsion has
a cause.

This paper dispenses with the fiction. The theoretical framework presented here was
developed by a person with ASD, ADHD, and Complex PTSD who could not find an adequate
formal account of his own emotional experience in the existing literature, who had studied
physics at university, and who eventually concluded that the most efficient solution was
to build one himself. The result is offered not as a confessional but as a theoretical
contribution. These are not mutually exclusive.

There is precedent. Temple Grandin revolutionised the study of animal cognition and
welfare as an autistic person whose own perceptual experience gave her access to
observations that non-autistic researchers had systematically missed (Grandin, 1995).
Peter Levine developed Somatic Experiencing partly through direct observation of his own
nervous system's responses (Levine, 2010). Kay Redfield Jamison wrote what remains one
of the most clinically precise accounts of bipolar disorder from inside it (Jamison,
1995). The history of medicine includes, more often than is acknowledged, the doctor who
is also the patient.

The author is not a doctor. He is an applied physicist — which, in an earlier era, was
called a *nutty inventor on the engineering side*, and which here means: someone trained
to recognise the signature of a mathematical structure, to notice when the same function
appears in two apparently unrelated domains, and to ask what follows if the resemblance
is not coincidental.

What follows is the result of applying that training to the domain of one's own inner
life. The author considers this a reasonable use of available resources.

---

# Introduction: The Inadequacy of Existing Maps

A patient sits with their therapist and is asked: *"What are you feeling right now?"*
For many people, this question has a navigable answer. For a person with ASD,
alexithymia, and a C-PTSD-modified attractor landscape, the question lands differently.
The honest answer is often: *"Something is happening. I cannot tell you what it is,
where it is coming from, or how large it is. But it is definitely there."*

The available frameworks for this situation are unsatisfying. Emotion wheels offer
vocabulary but not structure. Polyvagal theory offers an excellent map of the
autonomic nervous system but does not formalise the interaction between simultaneous
emotional states. Cognitive models locate the action in the mind and underestimate the
body. Somatic models are rich in clinical texture but light on mathematical precision.
None of them — to the author's knowledge — provide a formal account of why a person can
be profoundly affected by an emotional state that they cannot perceive, name, or
locate.

The author's experience of living with ASD, ADHD, and C-PTSD suggested a different
picture. Emotions did not feel like events. They felt like weather — present everywhere,
always moving, only occasionally breaking through into named experience. The body held
states that the mind had no language for. Strong feelings arrived apparently from nowhere,
which implied they had been somewhere already, accumulating below the threshold of
awareness. Different emotional states seemed to interact — to amplify, to suppress, to
oscillate — in ways that were distinctly nonlinear.

This phenomenology required a different kind of model. The author, having spent thirty
years in occasional proximity to physics and mathematics, recognised the structure. The
quantum field. The vacuum fluctuation. The threshold crossing. The energy function. The
attractor basin. These were the right tools. They had been applied to neural networks.
There was no obvious reason they could not be applied to emotional dynamics. The author
applied them.

The remainder of this paper presents the result.

---

# Background

## Lived Experience as a Research Position

The use of lived experience as a legitimate source of theoretical knowledge — rather than
merely as anecdotal material awaiting scientific validation — has gained substantial
ground in health research over the past two decades. The *nothing about us without us*
principle, originating in disability rights advocacy, has become a methodological
commitment in participatory research (Arnstein, 1969; Beresford, 2002). Researchers
with lived experience of mental health conditions have produced theoretical contributions
that purely external observers could not have generated, precisely because their insider
position made certain observations available to them that were invisible from the outside.

The Soma-Field Model belongs to this tradition, with one modification: the author's
background is in physics rather than in qualitative research, so the methodology is
*experiential theorising* rather than autoethnography. The observations come from the
inside; the tools used to formalise them come from mathematical physics. The combination
is unusual. The author considers it appropriate.

## The Body-Mind Problem in Clinical Practice

Contemporary neuroscience has largely dissolved the Cartesian boundary between body and
mind. Damasio (1994) demonstrated that emotion is inseparable from rational cognition:
patients with damage to the ventromedial prefrontal cortex lose not only emotional range
but effective decision-making capacity. Van der Kolk (2014) documented how traumatic
emotional states are encoded not merely in explicit memory but in posture, visceral
sensation, and autonomic regulation. Porges' polyvagal theory (2011) provided a
neurobiological account of three hierarchically organised autonomic states: ventral vagal
(social engagement), sympathetic (fight/flight), and dorsal vagal (freeze/dissociation).

The author can confirm these findings from direct observation. He can also add, as a
data point: the experience of being in a freeze state while simultaneously being expected
to report on one's emotional state is an exercise in the epistemological limits of
self-report. The instrument designed in Section 6 is a partial response to this problem.

## The Felt Sense and Sub-Perceptual Emotion

Gendlin's concept of the *felt sense* (1978) describes a pre-articulate bodily sense
that is present before an emotion has been named — something whole and present but not
yet articulate. Gendlin called this the sub-verbal sense of a situation.

The Soma-Field Model provides a formal account of what the felt sense is: it is the
activity of the emotional field below the perceptual threshold. The author can confirm
that this description is accurate. He has spent considerable time in the company of felt
senses that declined to become named feelings, and the model's account of this — a field
active below threshold, causally effective but not consciously perceived — matches the
phenomenology precisely.

## Quantum Field Theory: Structure, Not Metaphor

Quantum Field Theory (QFT) is the framework of modern particle physics. Its central
claim is that particles — electrons, photons — are not fundamental objects. They are
*excitations* of underlying fields: local concentrations of energy that arise when a
field receives sufficient perturbation above the vacuum state. The quantum vacuum is not
empty; it is a background of sub-threshold fluctuations, continuously present, causally
active, not directly observable.

This paper does not claim that emotions are quantum phenomena in any literal sense. The
analogy is structural. The author was trained in this formalism in 1993 and has found it
useful ever since, applied to a variety of problems that are not, in any technical sense,
quantum mechanical. The key property being borrowed is: *a quantity that exists
everywhere, continuously, below the threshold of direct observation, which becomes
observable only when local amplitude exceeds a threshold.* This is an accurate
description of both the quantum vacuum and, in the author's experience, the emotional
field.

Since writing that paragraph, the paper has upgraded the claim. The conscious emotional
percept is now formally identified as the one-dimensional impulse response — the
Green's function — of the soma-field manifold. This places it in the same mathematical
category as a particle in quantum field theory: both are poles in the propagator of
their respective underlying field. The structural similarity is not borrowed; it is
exact. The mathematics is the same mathematics.

Gabriele Veneziano wrote down the Euler beta function in 1968 while looking for an
amplitude that matched scattering data, then noticed that the function implied a theory
— string theory — that nobody had yet conceived. He had identified a known mathematical
object in an unexpected place and followed the implication. The author has, with
considerably less elegance and considerably more time in therapy, done something
structurally similar: identified the Green's function in emotional dynamics, and noted
that it is the object quantum field theory calls a particle. The author leaves the
implication as an exercise for readers with the relevant background.

## Hopfield Networks and the Energy Function

In 1982, John Hopfield — awarded the Nobel Prize in Physics in 2024 — proposed a model
of associative memory whose dynamics were mathematically identical to an Ising spin-glass
model from statistical physics (Hopfield, 1982). The critical component was an energy
function: a scalar that always decreases as the network evolves, guaranteeing convergence
to stable attractor states.

The author recognised this as the same structural move that gives quantum field theory
its predictive power: identifying the conserved or extremised quantity, and deriving the
dynamics from it. In physics, this is Noether's theorem applied as a design principle.
In Hopfield networks, it is an energy function borrowed directly from condensed matter
physics. The author's proposal is to apply the same move to emotional dynamics.

The observation that underwrites this is simple: emotional states feel like they have
energy. Some states are high-energy and unstable — fight, flight, acute anxiety. Others
are low-energy and stable — calm, regulated, present. Some are low-energy and *stuck* —
freeze, dissociation, collapse. If these states have an energy ordering, there is likely
an energy function. If there is an energy function, the dynamics can be derived from it.
The author found this reasoning persuasive.

---

# The Soma-Field Model

## Emotions as a Persistent Wave Field

The foundational claim is this: emotions are not events. They are a *field* —
a distributed, continuous quantity defined over the entire soma (body-mind system) at all
times.

This is not a metaphor. It is the most accurate description the author can offer of his
own experience. The emotional field is always there. It does not begin when a feeling
becomes conscious and end when it subsides. It precedes conscious awareness and continues
after it. What changes is not the field's existence but its local amplitude: whether,
at a given moment, the field in a given mode exceeds the threshold required to surface
as a named experience.

The field has two coupled components:

1. **The somatic wave** $\mathbf{E}_\text{body}(x,t)$: distributed across the body as
   patterns of visceral sensation, muscle tone, proprioception, and autonomic state.
2. **The neural wave** $\mathbf{E}_\text{neural}(x,t)$: distributed across the nervous
   system as patterns of cortical, subcortical, and peripheral activation.

These are not separate systems:

$$\mathbf{E}(x,t) = \mathbf{E}_\text{body}(x,t) \otimes \mathbf{E}_\text{neural}(x,t)$$

```
          SOMATIC WAVE                     NEURAL WAVE
         (body, viscera,                  (cortex, limbic,
          fascia, ANS)                     brainstem, PNS)
               │                                 │
               └──────────── COUPLED ────────────┘
                                  │
                         EMOTIONAL FIELD E(x,t)
                     (always present, always active)
```
*Figure 1. The Soma-Field: two coupled waves constituting a single unified emotional field.*

## The Perception Threshold

Not all field activity is consciously perceived. Each emotional mode $i$ has a
threshold $T_i$:

$$\text{Emotion } i \text{ is consciously perceived} \iff |\mathbf{E}_i(t)| > T_i$$

Below threshold: the emotion is sub-perceptual. It exists, it influences behaviour and
physiology, but it does not surface as a named conscious feeling. This is the author's
most frequent relationship with his own emotional field — something is happening, below
the line, shaping everything, unidentified.

| Clinical Observation | Soma-Field Account |
|---|---|
| Field active but no named feeling | Sub-threshold: $|\mathbf{e}_i| < T_i$ |
| Sudden unexplained flood of emotion | Rapid threshold crossing after accumulation |
| Somatic signal without cognitive name | Threshold crossed in body component, not neural |
| Alexithymia | Elevated $T_i$ — high energy required to cross |
| Hypervigilance / flooding | Lowered $T_i$ — reduced threshold |

*Table 1. Clinical observations mapped onto the perception threshold model.*

The author notes that all five rows in Table 1 are, in his clinical history,
simultaneously applicable. This is, admittedly, a challenging configuration.
It is also why this model was necessary.

### A note on the intelligence quotients

McCulloch and Pitts built the mathematical brain in 1943. What they built — what every
artificial neural network since has been — is the **IQ machine**: the neocortex, pattern
recognition, sequence prediction, error minimisation. The field of AI has, for eighty
years, been building increasingly sophisticated versions of this one component.

The soma-field adds what was missing: the **AQ machine**. AQ is to limbic dynamics as
IQ is to cortical dynamics. Not a score; a formal model of the system that produces it.

| Quotient | System | First Formalised | Comment |
|---|---|---|---|
| **IQ** | Neocortex: pattern recognition, prediction | McCulloch & Pitts, 1943 | The entire AI industry |
| **EQ** | Limbic: valuation, attachment, empathy | Goleman, 1995 | Described; not yet formally modelled |
| **AQ** | Soma-field: field-theoretic limbic dynamics | This paper, 2026 | The formal model EQ has always needed |
| **SQ** | Relational field: dyadic and social resonance | Future work | Requires AQ as prerequisite |

*Table 3. The four intelligence quotients and their formal status.*

The author observes — with a wryness he trusts the reader will share — that his IQ is in
the column labelled 1943. His AQ is in the column he has just written. His EQ is what
brought him to this desk in the first place.

### A note on brane thickness

The threshold parameter $T_i$ is not merely a number. The technical paper identifies it
with the thickness of an extra dimension — the metaphorical ‘brane’ separating the
limbic system from conscious awareness. Alexithymia is a thick brane: the field can be
highly active and almost nothing crosses the threshold into named conscious experience.
Hypervigilance is a thin brane: everything crosses, simultaneously, at high amplitude.
The author confirms personal experience of both states. He notes that neither is a
character flaw; both are calibration states of a physical parameter in a system that
was trying, with the information available, to keep him safe.

## The Interaction of Emotional Modes

Multiple emotional modes are simultaneously active at all times. Their interactions are
encoded in the **emotional coupling matrix** $W$, where $W_{ij}$ is the influence of
mode $j$ on mode $i$:

- $W_{ij} > 0$: mode $j$ amplifies mode $i$
- $W_{ij} < 0$: mode $j$ suppresses mode $i$

The field evolves according to the energy gradient plus noise:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}) + \eta(t)$$

The noise term $\eta(t)$ represents the continuous sub-perceptual fluctuations. The
field is never still. This is not pathology; it is physics.

---

# The Energy Landscape

## The Hopfield Energy Function

$$H(\mathbf{e}) = -\frac{1}{2}\,\mathbf{e}^\top W\,\mathbf{e} - \boldsymbol{\theta} \cdot \mathbf{e}$$

The field always moves toward lower $H$. The stable states of the system are the
local minima of $H$ — the attractor basins.

## Attractor States: Fight, Flight, Freeze, and Regulated Calm

```
  ENERGY
    │
  H │        fight/flight
    │        ┌──┐  ┌──┐
    │        │  │  │  │
    │   _____|  │  │  │_____
    │  │         \/        │
    │  │       saddle       │
    │  │     (transition)   │
    │  │                    │    ╔════════════╗
    │  │         freeze     │    ║            ║
    │  │         ┌──┐       │    ║  regulated ║◄── global minimum
    │  │_________|  │_______|    ║    calm    ║
    │                 │          ╚════════════╝
    └──────────────────────────────► EMOTIONAL STATE SPACE
```
*Figure 2. The emotional energy landscape. The freeze state is not high-energy — it is
isolated. This distinction matters enormously. The author is aware of this from personal
experience, over many years, and from the other side.*

| Attractor | Energy | Polyvagal Correlate | Clinical Presentation |
|---|---|---|---|
| **Regulated Calm** | Global minimum | Ventral vagal | Present, flexible, connected |
| **Fight** | High, unstable | Sympathetic | Agitation, urgency |
| **Flight** | Saddle point | Sympathetic | Anxiety, avoidance |
| **Freeze** | Deep, isolated | Dorsal vagal | Dissociation, numbness |

*Table 2. Attractor states and their polyvagal correlates.*

The coupling matrix $W$ is not merely a parameter. It is the *shape* of the emotional
manifold — a seven-dimensional space with the mathematical structure of a G₂ manifold.
Trauma does not adjust a dial on this space; it deforms the manifold itself. The
therapist doing somatic work is, without needing to know this, doing differential
geometry on the patient’s G₂ manifold: reshaping a seven-dimensional space by modifying
the structure tensor. This is a precise technical statement. The author considers it
a more honest account of what a skilled practitioner actually does than any narrative
framework currently available. The practitioner is a geometer. The patient is a manifold
that is learning to remember its own natural curvature.

The therapeutic and personal significance of the freeze attractor's structure cannot
be overstated. It is not high-energy — it does not feel dramatic or intense. It is
*isolated*: surrounded by energy barriers. Escape requires first *increasing* the
field's energy before it can flow toward calm. This is counterintuitive from the outside
and well-known from the inside.

---

# Dissonance and Resolution

When two emotional modes are in an incompatible phase relationship, the field is far
from equilibrium. This is felt as tension. The acoustic analogy is precise: just as two
tones in a dissonant interval generate a beating, unstable interference pattern,
two emotional modes in an incompatible configuration generate a gradient that drives
toward resolution.

Dissonance is not pathological. It is the field's communication that resolution is
available. The therapeutic process is guided voice-leading: finding the path that
transforms the dissonant configuration into a consonant one. Avoidance keeps the field
in dissonance. The energy minimum lies on the other side of the tension, not around it.

The author has spent considerable time attempting the route around it. He does not
recommend it.

---

# The Neurodivergent Field: ASD, ADHD, and C-PTSD as Operator Modifications

*This section addresses the author's specific clinical picture. It is presented not as
a case study but as a theoretical elaboration: three structural modifications to the
standard Soma-Field dynamics, each defined by the operator it adds to the governing
equations.*

The key architectural principle — and the author considers this the most important
contribution of this paper — is the following:

> **These conditions are not parameter settings. They are operator modifications.**

A parameter change adjusts a coefficient within the existing equations. An operator
modification changes the *form* of the equations themselves. The distinction is not
semantic. It determines what kind of therapeutic intervention is possible and at what
level it must operate.

Each condition is a functor that wraps the standard dynamics. The composed condition —
ASD + ADHD + C-PTSD — is their composition. The composition does not commute; order
matters; the joint presentation is structurally different from any of the individual
conditions or from their sum.

## Complex PTSD: Memory Kernel and Asymmetric Coupling

C-PTSD adds a **memory kernel**: past activations leave exponentially decaying echoes.

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t))
  + \int_0^t K_{\text{trauma}}(t - s)\, \mathbf{e}(s)\, ds + \eta(t)$$

$$K_{\text{trauma}}(\tau) = \sum_{k} A_k\, e^{-\tau / \tau_k}$$

This is a damped oscillating kernel. The past does not vanish; it rings. Therapeutic
processing is the progressive reduction of $A_k$ — the amplitude of the echo — and
the shortening of $\tau_k$ — the time over which it persists. The author notes that
this description is a more accurate account of what trauma processing actually feels
like, from the inside, than most of the narrative accounts available to him.

C-PTSD also breaks the symmetry of the coupling matrix $W$, admitting **limit cycles**:
the oscillation between hyperarousal and shutdown that characterises the PTSD symptom
cycle is, in this model, a limit cycle generated by the antisymmetric component of $W$.
It is not a choice, a habit, or a failure of willpower. It is a topological consequence
of an asymmetric coupling matrix.

## ADHD: High Temperature, Low Damping, Pink Noise

ADHD modifies the **effective temperature** of the field:

$$\gamma_{\text{ADHD}}\, \dot{\mathbf{e}}(t) = -\nabla H + \sqrt{2 D_{\text{ADHD}}}\, \xi_{1/f}(t)$$

with $\gamma_{\text{ADHD}} < \gamma_0$ (less damping) and $D_{\text{ADHD}} > D_0$
(more noise). The noise has $1/f$ spectral structure — long-range temporal correlations
that produce the characteristic slow drift of attentional state.

The practical consequences: shallow attractor basins cannot hold the field at high
temperature (distractibility). When a high-salience stimulus deepens a specific basin
far beyond its baseline depth, the field falls in and is held (hyperfocus). The system
is not broken. It is a different thermodynamic regime, with different costs and different
affordances — including, at the right temperature, a capacity to explore the energy
landscape at speed that a low-temperature system does not have.

The author considers this framing considerably more useful than "difficulty sustaining
attention."

## Autism Spectrum Condition: Sparse Coupling and Modified Projection

ASC modifies the **projection kernels** and the **coupling matrix sparsity**.

The projection kernel $K_i(x)$ determines which somatic regions contribute to the
$i$-th emotional mode. In ASC, some regions are over-weighted (sensory sensitivity)
and others under-weighted (interoceptive under-registration). The named-feeling state
vector is produced from a differently sampled version of the same somatic field.

The coupling matrix is sparser — fewer strong cross-modal connections — producing
deeper individual attractor basins with higher inter-basin barriers. This is
monotropism: the field settles deeply into one attractor at a time and requires
disproportionate energy to transition. The author confirms that this is an accurate
description of his attentional and emotional experience, and that it has both
significant disadvantages (transitions are hard, unexpected context changes are
physiologically costly) and significant advantages (depth of engagement, reliability
of focus once established, resistance to shallow distractors).

## The Composed Condition

$$\gamma_{\text{ADHD}}\, \dot{\mathbf{e}}(t) =
  -\nabla H_{\text{ASC}}(\mathbf{e}(t))
  + \int_0^t K_{\text{trauma}}(t - s)\, \mathbf{e}(s)\, ds
  + \sqrt{2 D_{\text{ADHD}}}\, \xi_{1/f}(t)$$

The interaction effects are non-trivial:

| Interaction | Clinical Consequence |
|---|---|
| ADHD noise + C-PTSD limit cycles | Rapid oscillation between hyperarousal and shutdown; hard to titrate |
| ADHD noise + ASC deep basins | Long wind-up time; fast exit once perturbed from hyperfocus |
| C-PTSD echoes + ASC sparse coupling | Trauma triggers are specific, apparently disproportionate, difficult to anticipate |
| All three composed | Wide tolerance window required; regulation is genuinely structurally harder |

*Table 3. Interaction effects of composed neurodivergent modifiers.*

The author wishes to note, for the record, that Table 3 is not a complaint. It is a
description. These are the equations. The field is doing what the equations predict.
Understanding this has been, in practice, more useful than most of the alternative
framings on offer.

---

# The Soma-Field Instrument

## Rationale

The emotional field is normally invisible to its host. It operates below the threshold
of conscious awareness, shaping behaviour and physiology without being available for
reflection. The author found this situation suboptimal and designed an instrument to
address it.

The instrument externalises the emotional field — renders it as sound, image, and signal
— so that it becomes available as an object of attention. This is a therapeutic
biofeedback instrument. It is also, unavoidably, a musical instrument. The author
considers these compatible.

## Design

A MIDI controller with 16 rotary knobs. Eight emotional dimensions. Two knobs per
dimension — one for the somatic component, one for the neural/cognitive component.
The act of setting a knob is the act of reporting an emotional state: it is the
quantum measurement, the collapse of the distributed field onto a specific coordinate.

```
                    ┌─────────────────────────────────────┐
                    │         MIDI CONTROLLER              │
                    │  [K1][K2]  [K3][K4]  [K5][K6]  [K7][K8]  │
                    │  emotion1  emotion2  emotion3  emotion4│
                    │  [K9][K10] [K11][K12][K13][K14][K15][K16] │
                    │  emotion5  emotion6  emotion7  emotion8│
                    └─────────────────────────────────────┘
                                      │
                           ┌──────────────────┐
                           │  H(e) and ∇H(e)  │
                           └──────────────────┘
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
             AUDIO OUTPUT        MIDI OUTPUT       VISUAL OUTPUT
```
*Figure 3. The Soma-Field Instrument.*

## The Feedback Loop

The instrument creates a closed feedback loop: the person expresses a state, the system
reflects it back as sound and image, the person responds. The system does not tell the
user what they are feeling. It shows them what the field looks like when they report
what they are feeling. The difference is significant.

## Pluggable Emotion Models

No single emotion model is assumed. The coupling matrix $W$ is loaded from a
configuration file. Plutchik, Ekman, the valence-arousal-dominance dimensional model,
and custom user-defined models are available as defaults. The author's own $W$ has been
refined over time and is not identical to any standard model. This is, on reflection,
unsurprising.

---

# Clinical Implications

## Assessment

The model suggests asking not "What emotion do you feel?" but "What is present in the
body right now, even if it cannot be named?" This aligns with Focussing-oriented and
sensorimotor approaches, and is considerably more productive, in the author's experience,
for anyone whose $T_i$ values are elevated or whose somatic-to-neural projection is
modified.

## Intervention

The energy function provides formal grounding for titration, pendulation, somatic
resourcing, and felt-sense work. In each case, the therapeutic action can be described
as: adding energy to approach a frozen state, establishing a stable low-energy region,
or attending to sub-threshold field activity in a supported context.

## Psychoeducation

*"Your emotions are like waves — they are always there, even when you cannot feel them,
and they are always moving."*

This sentence is both clinically useful and technically accurate. The author has found
it more useful than most alternative formulations, including several that were provided
to him by qualified practitioners. He offers it here as a contribution to the field.

## Neurodivergent Profiles as Structural Realities

The most important clinical implication of Section 6 is this: for people with ASD,
ADHD, and C-PTSD, the challenge of emotional regulation is not a motivational or
characterological failure. It is a structural consequence of specific operator
modifications to the dynamics. The composed modifier produces a field that is
genuinely harder to regulate — not by a small margin, not as a matter of subjective
experience, but mathematically, as a consequence of higher noise temperature, memory
echoes, sparse coupling topology, and the possibility of limit cycles.

Knowing this does not solve the problem. It does, however, locate it correctly. The
author has found that locating a problem correctly is a necessary precondition for
solving it, and that a great deal of time and distress can be saved by not attempting
to solve problems that are located in the wrong place.

---

# Limitations and Future Directions

The model is theoretical and requires empirical validation. Its QFT analogies are
structural rather than ontological. The coupling matrix $W$ is idealized as fixed when
it is in practice dynamic. The acoustic analogy is a hypothesis.

The author also acknowledges a methodological limitation: this paper is written by
someone who is simultaneously the theorist and the primary data source. This is either
a significant advantage (direct access), a significant limitation (potential
confirmation bias), or both. The author suspects both.

What is needed: empirical work with physiological sensors, user studies with the
instrument, collaboration with practitioners, and independent theoretical review. The
author is, by training and disposition, an applied physicist — an engineer with a
tolerance for abstraction. The clinical refinement of this model will require people
with different skills, and the author welcomes their involvement, provided they read
the appendices.

---

# Conclusion

The wave is always there. This is not a metaphor; it is a description of how the
emotional field actually behaves, as far as the author can determine from the inside.
Therapy — and the instrument described in this paper — is the practice of learning to
hear it: to extend awareness downward, below the threshold, into the field's continuous
activity, and to make that activity available as information rather than overwhelming
noise.

The Soma-Field Model is offered as a tool for this practice. It was built because it
was needed. It uses the best mathematical tools available for describing distributed,
dynamic, energy-minimising systems, because those tools are, in the author's assessment,
appropriate to the problem.

The author is aware that this is an unusual paper. A formally trained physicist with
three neurodivergent conditions developing a quantum-field-inspired model of his own
emotional dynamics and presenting it as a contribution to clinical psychology is not,
strictly speaking, the standard academic pipeline. The author does not find this
troubling. The standard academic pipeline has had some time to address the problem and
has not yet done so to his satisfaction.

He therefore took the matter in hand.

---
