---
title: "The Soma-Field Research Programme: Method, Model, and Empirical Confirmation"
subtitle: "A Synthesis of Six Papers on Emotional Field Dynamics"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "May 2026"
lang: en-GB
abstract: |
  This document is the linking narrative for a body of work that spans six papers,
  a formal proof suite, a computational experiment, a real-time therapeutic instrument,
  and a popular account. The papers do not merely share a topic; they form a single
  argument in three movements.

  The first movement establishes a **method**: mathematical co-identification, the
  procedure by which a mathematical object known to be well-behaved in one domain
  is recognised as the same object governing a different domain, importing every
  theorem about it as a result. This is not analogy; it is identity under relabelling.

  The second movement applies that method to produce a **model**: the Soma-Field,
  a field-theoretic account of emotional dynamics in which the limbic system is
  given the same formal apparatus that physicists use to describe quantum fields —
  because the governing equations are the same equations. The model is not an
  approximation. It is a co-identification.

  The third movement subjects the model to an **empirical test**: QUANT-EXP-1, a
  pre-registered computational experiment demonstrating that quantum annealing
  traverses topological trauma barriers that low-noise classical dynamics cannot
  cross. The experiment was proposed by the model, specified before it was run,
  and passed all pre-registered hardening checks.

  Together, these three movements constitute a research programme: a new method,
  a non-trivial application of it, and an empirical confirmation of the application's
  central claim.

keywords:
  - soma-field model
  - mathematical co-identification
  - emotional field theory
  - quantum annealing
  - topological barriers
  - trauma dynamics
  - Hopfield network
  - research programme synthesis
  - kappa
---

---

# 1. The Programme

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

## 1.1 The Gap the Programme Addresses

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

## 1.2 The Structure of the Argument

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

# 2. The Method: Mathematical Co-identification

## 2.1 What It Is

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

## 2.2 Why It Matters as Method

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

# 3. The Model: The Soma-Field

## 3.1 Five Co-identifications

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

## 3.2 What the Model Predicts

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

# 4. The Empirical Test: QUANT-EXP-1

## 4.1 The Prediction

The soma-field model makes a specific, falsifiable claim: for a Hopfield landscape
with a topological trauma barrier, low-noise classical Langevin dynamics starting from
the Fear attractor cannot reach the Awe attractor. Quantum annealing — a physically
realisable mechanism — can.

This is not a claim about whether people should use quantum computers in therapy.
It is a claim about reachability: that the mathematical structure of the barrier
distinguishes the quantum and classical regimes in a measurable way.

The prediction was registered in the Zenodo v1 deposit of the Soma-Field paper
(doi:10.5281/zenodo.20350516) before the experiment was run.

## 4.2 The Experiment

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

## 4.3 Results

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

## 4.4 The Penrose Connection

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

# 5. The Lived Case: Field Notes from the Inside

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

# 6. Extensions: Music, Film, and the Domain Generality of the Model

## 6.1 Music-Induced Affect

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

## 6.2 The Tensor: An Abstract Film

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

# 7. The Argument as a Whole

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
instantiation. Music-induced affect is a second. Abstract film is a third. Each
generates falsifiable predictions from the same mathematical core.

What makes this a *novel* research programme is the **gap it fills**: no formal
dynamical model of the limbic system existed before this work. The Hopfield framework
gave the neocortex its formal model in 1982. The soma-field gives the limbic system its
formal model in 2026. Together they constitute the first complete formal description
of the two principal computational substrates of the vertebrate brain.

---

# 8. What Remains

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

---

# 9. Data and Code Availability

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

# References

Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective
computational abilities. *Proceedings of the National Academy of Sciences*, 79(8),
2554–2558.

Johnson, A. (2026a). *Mathematical Co-identification: A Method for Structural Import
Across Scientific Domains*. Zenodo. https://doi.org/10.5281/zenodo.20350331

Johnson, A. (2026b). *The Soma-Field: A Wave-Based Model of Emotional Dynamics and
Its Clinical Implications*. Zenodo. https://doi.org/10.5281/zenodo.20350516

Johnson, A. (2026c). *Quantum Soma and the Penrose Gap: Topological Reachability in
the Emotional Attractor Landscape*. Zenodo. https://doi.org/10.5281/zenodo.20351231

Johnson, A. (2026d). *Field Notes from the Inside: A Patient-Constructed Model of
Emotional Dynamics*. Preprint.

Johnson, A. (2026e). *A Dynamical Field Model of Music-Induced Affect: Beyond the
Valence–Arousal Circumplex*. Preprint.

Johnson, A. (2026f). *The Tensor: An Abstract Film Definition*. Preprint.

Juslin, P. N., & Sloboda, J. A. (Eds.). (2010). *Handbook of Music and Emotion:
Theory, Research, Applications*. Oxford University Press.

Kadowaki, T., & Nishimori, H. (1998). Quantum annealing in the transverse Ising model.
*Physical Review E*, 58(5), 5355–5363.

Penrose, R. (1989). *The Emperor's New Mind: Concerning Computers, Minds, and the
Laws of Physics*. Oxford University Press.

Porges, S. W. (2011). *The Polyvagal Theory: Neurophysiological Foundations of
Emotions, Attachment, Communication, and Self-Regulation*. W. W. Norton.

Russell, J. A. (1980). A circumplex model of affect. *Journal of Personality and
Social Psychology*, 39(6), 1161–1178.

van der Kolk, B. A. (2014). *The Body Keeps the Score: Brain, Mind, and Body in the
Healing of Trauma*. Viking.

Veneziano, G. (1968). Construction of a crossing-symmetric, Regge-behaved amplitude
for linearly rising trajectories. *Il Nuovo Cimento A*, 57(1), 190–197.
