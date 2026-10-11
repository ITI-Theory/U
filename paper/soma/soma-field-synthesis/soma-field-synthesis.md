---
title: "The Soma-Field Research Programme: Method, Model, and Computational Test"
subtitle: "A Synthesis of Six Papers on Emotional Field Dynamics"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "May 2026"
lang: en-GB
abstract: |
  This document is the linking narrative for a body of work that spans six papers,
  formal proof files, a computational experiment, a real-time therapeutic instrument,
  and a popular account. The papers do not merely share a topic; they form a single
  argument in three movements.

  The first movement establishes a **method**: mathematical co-identification, the
  procedure by which a mathematical object known to be well-behaved in one domain
  is recognised as a structurally matching object in a different domain, importing only
  those theorems whose hypotheses, boundary conditions, and axioms are preserved. This is
  stronger than analogy but remains assumption-bound.

  The second movement applies that method to produce a **model**: the Soma-Field,
  a field-theoretic account of emotional dynamics in which the limbic system is
  given formal apparatus adapted from field theory because selected governing equations
  share the same mathematical form. The model is a proposed co-identification under stated
  assumptions, not a claim of literal physical identity.

  The third movement subjects the model to a **computational test**: QUANT-EXP-1, an
  exact 8-qubit statevector simulation showing that transverse-field annealing reaches
  registered barrier configurations that the tested low-noise classical dynamics does not
  reach. The experiment was proposed by the model, specified before it was run,
  and passed all pre-registered hardening checks.

  Together, these three movements constitute a research programme: a new method,
  a non-trivial application of it, and bounded simulation support for the application's
  central reachability claim.

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

# The Programme

This is a document about structure.

Not about feelings — though feelings are what the programme is ultimately for. Not about
therapy — though therapy is one of the principal applications. Not about physics —
though physics is where the mathematics comes from. It is about a single recurring
observation: that emotional dynamics can be modelled with equations structurally related to field theory; identification remains assumption-bound, not literal identity.

When an identification like that is made precisely — when you can say not merely "this is
*like* a wave" but "this can be represented by the same wave operator, with matching
propagator form, energy function, and topology where the stated assumptions hold" — a
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
trauma — had no comparable field-theoretic treatment in this research programme. The clinical literature
described it richly (Porges, van der Kolk, Levine). The neuroscience described its
anatomy. Neither provided a model from which predictions could be derived and tested.

Simultaneously, the psychology of music had reached a similar ceiling. A 991-page
handbook (Juslin and Sloboda, 2010) treated music-induced emotion almost entirely
through Russell's valence–arousal circumplex: a static two-dimensional map. The
circumplex describes *where* a listener is, not *how* they move, what traps them,
or what allows escape. No comparably specified soma-field dynamical model of music-induced affect existed in this programme.

The programme fills both gaps with the same model, via the same method.

---

## The Structure of the Argument

The argument has three movements and several extensions:

| Paper | Movement | Contribution |
|---|---|---|
| *Mathematical Co-identification* (2026) | Method | Names and formalises the procedure |
| *The Soma-Field* (2026) | Model | Applies it to emotional dynamics |
| *Quantum Soma and the Penrose Gap* (2026) | Computational test | Tests the central reachability claim |
| *Field Notes from the Inside* (2026) | Lived case | Primary-source clinical grounding |
| *A Dynamical Field Model of Music-Induced Affect* (2026) | Extension | Demonstrates domain generality |
| *The Tensor* (2026) | Extension | Applies the framework to abstract film |

The popular account (*A Voyage into Trauma*, 2026) provides the same argument in
accessible form, for readers without a physics background.

---

\newpage

# The Method: Mathematical Co-identification

## What It Is

The history of mathematical science contains a recurring event. At a certain moment,
a scientist recognises that the quantity they are studying is not *like* a quantity
already understood in another domain — it *is* the same mathematical object, under
a change of label. When this identification is made precisely, every theorem proved
about the source object whose hypotheses are preserved becomes available in the target
domain as a conditional result, without re-deriving the theorem itself.

This event has happened many times:

- Hopfield (1982) recognised that a neural network's energy-minimisation dynamics
  are the same as a spin-glass Hamiltonian. Selected results from statistical mechanics
  of spin glasses — ground states, phase transitions, capacity bounds — became available
  where the Hopfield hypotheses matched.
- Veneziano (1968) recognised that the Euler Beta function, a result in pure
  mathematics, described the scattering amplitudes of hadrons. String theory began.
- Black and Scholes (1973) recognised that an option pricing equation was the
  heat diffusion equation. Analytical tools from thermodynamics became available under the
  equation's assumptions.

The paper *Mathematical Co-identification: A Method for Structural Import Across
Scientific Domains* (Johnson, 2026a) names this procedure, formalises it as a
distinct scientific method with its own validity criteria and failure modes, and
distinguishes it from analogy, metaphor, and modelling. The key distinction:

> **Analogy**: A is *like* B in certain respects. Illuminating, not transferable.
>
> **Co-identification**: A preserves the relevant mathematical structure of B under
> relabelling. Theorems about B transfer only when their hypotheses transfer.

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

## When MCI Is Over: The Verification Threshold

Here is something no paper on scientific method says clearly enough.

Every scientist who produces a major structural identification — Hopfield recognising
the Ising Hamiltonian, Veneziano recognising the Euler Beta function — does so by
being, for a period, a *type astronaut*.  They are scanning the existing mathematical
universe for a structure whose type signature matches the phenomenon they are studying.
This is abductive reasoning: not deduction from first principles, not induction from
data alone, but the systematic search of a known solution space for a structure that
fits.  It is, to be direct, a form of academic hacking.  And it is how most of
the connective work of mathematical science actually gets done.

What no one says — because scientists do not typically publish the search, only the
result — is that once a structural match has been formalised, the search method becomes
less important than the stated hypotheses of the match.

When Veneziano published his scattering amplitude, he did not need to cite the
library where he found the Beta function.  The formula did the work.  Results about
the Beta function became relevant to hadronic scattering where the physical assumptions
matched.  The library visit was the ladder; the amplitude was the building.

The present work makes this transition explicit, because being explicit about it is
itself a contribution.  Every reader of the earlier papers — particularly
*Mathematical Co-identification* — has correctly understood that MCI was the search
engine.  What should now be equally clear is that the search is over.

The strongest verification threshold available in this project is a Lean 4 theorem with a
named file and theorem statement, compiled without `sorry` and with its axioms explicit.
That threshold verifies the formal statement under its definitions and assumptions. It does
not verify the intended physical, biological, or clinical interpretation of those
definitions.

**What the work therefore rests on is not MCI.  It rests on four things:**

1. **Inductive structural necessity.** The 11-dimensional decomposition of a
   body-field-mind system is structurally compared with M-theory. The Lean result
   is a type/product isomorphism under assumptions, not a proof of physical M-theory,
   consciousness, or clinical reality.

2. **Matched formal structure.** A co-identification supports theorem transfer only
   for the matched formal structure and stated assumptions. It does not make every
   theorem about one domain a theorem about the other wholesale.

3. **Scale invariance.** Companion papers argue for a repeated Helmholtz/Green-function
   pattern across scales. This is a model-derived comparison, not a Lean theorem or
   independent empirical law.

4. **Kernel verification.** Lean 4 kernel checks are the project's strongest formal
   evidence for named theorems. Kernel-verified theorems are exactly as true as the
   definitions and axioms they depend on; the current repository still contains seven real
   `sorry` markers and an explicit axiom registry.

The *mathematical-co-identification* paper remains an accurate account of how the
work was done — and naming the search process honestly is itself a contribution, in
a discipline where the search is usually erased.  But readers coming to the thesis or
omnibus now should understand that they are reading the *results*, not the method.
The method is in the history.  The formal results are in the named proof files, under
their stated definitions, axioms, and remaining proof obligations.

---

\newpage

# The Model: The Soma-Field

## Five Co-identifications

The Soma-Field Model (Johnson, 2026b) is built from five sequential proposed
correspondences, each importing a bounded body of mathematics from physics into emotional
dynamics when its hypotheses are preserved:

**Co-identification 1: The Hopfield identification.**
The model represents emotional attractor dynamics with the canonical Hopfield
energy-function form. The energy function is:

$$H(\mathbf{e}) = -\tfrac{1}{2}\mathbf{e}^{\top} W \mathbf{e} - \mathbf{b}^{\top}\mathbf{e}$$

where $\mathbf{e} \in \mathbb{R}^N$ is the emotional state vector, $W$ is the coupling
matrix, and $\mathbf{b}$ is a bias vector encoding baseline arousal. The local minima
of $H$ are the named attractor states: regulated calm, fight, flight, freeze, flow,
dissociation.

**Co-identification 2: The QFT identification.**
The emotional field is modelled with a propagator form adapted from quantum field theory.
The conscious emotional percept is interpreted as the one-dimensional impulse response —
the Green's function — of an eleven-dimensional coupling manifold. The particle/percept
comparison is a formal analogy between poles in propagators, not a claim that conscious
emotion is a quantum particle.

$$G(\omega) = \frac{1}{\omega^2 - m^2 + i\epsilon}$$

{{Visualize | five-co-identifications | complex-plane:quantum | points="m - 0.05*j, -m + 0.05*j"; names="omega=+m,omega=-m"; poles=true; m=1 }} The two poles of the propagator above, at an illustrative mass/correlation parameter $m=1$: the Feynman $i\epsilon$ prescription moves them slightly off the real $\omega$-axis (shift exaggerated here for visibility).

In the formal analogy, a threshold parameter plays a role comparable to a mass/correlation parameter in the propagator. Conscious perception is an open biological interpretation.

**Co-identification 3: The brane identification.**
In the model, the body and the nervous system are represented as distinct coupled
components. The body is treated analogically as a 3-brane embedded in the 11-dimensional
coupling manifold. Somatic pain states and the body
schema are field modes on this brane, not on the bulk manifold. This is the formal
statement of the somatic grounding of emotion.

**Co-identification 4: The $G_2$ holonomy identification.**
The seven compactified extra dimensions of the coupling manifold are modelled using a
$G_2$-inspired structure. In the formal model, this permits topological obstructions —
loops through the modelled moduli space that cannot be continuously contracted to a point.
In emotional terms this is an open hypothesis about trauma configurations from which
smooth continuous change may not escape; the winding number is a property of the modelled
barrier, not yet an empirical clinical measurement.

**Co-identification 5: The renormalisation group identification.**
Developmental trajectory is compared with renormalisation-group flow. The age at which
a traumatic modification was introduced corresponds to the energy scale at which the
coupling constant was set. High-energy (early developmental) modifications are
renormalisation-group relevant — they affect all subsequent scales. Low-energy (later
life) modifications are irrelevant in the technical sense. This gives a formal
hypothesis for why early trauma may not be simply a more intense version of later trauma:
it is modelled as a different class of object.

## What the Model Predicts

From these five model correspondences, several predictions follow that are not ordinarily
expressed in existing clinical models:

1. **Threshold crossings are phase transitions.** The transition from sub-perceptual to
   conscious emotion is a second-order phase transition in the field. This predicts
   hysteresis — it is easier to stay in a state than to enter it, and easier to stay
   out than to leave.

2. **Complex PTSD is modelled as a topological configuration.** The coupling matrix $W$ for a CPTSD
   nervous system has a specific structure: a winding-number-protected attractor
   landscape in which the Fear basin is separated from the Awe basin by a barrier that
   the registered low-noise classical baseline did not cross in QUANT-EXP-1. This is a
   prediction about matrix structure, not a description of symptoms.

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

5. **Transverse-field mechanisms are sufficient for certain simulated transitions.** For
   trauma configurations with topological barriers (non-zero winding number), low-noise
   classical gradient descent may fail to reach the global minimum under the registered
   protocol. A transverse-field annealing term is sufficient in the simulated model. This
   is the prediction that QUANT-EXP-1 was designed to test.

---

\newpage

# The Computational Test: QUANT-EXP-1

## The Prediction

The soma-field model makes a specific, falsifiable claim: for a Hopfield landscape
with a topological trauma barrier, the registered low-noise classical Langevin baseline
starting from the Fear attractor did not reach the Awe attractor. Simulated transverse-field
annealing reached non-zero Awe-dominant occupancy under the same modelled landscape.

This is not a claim about whether people should use quantum computers in therapy.
It is a claim about reachability: that the mathematical structure of the barrier
distinguishes the simulated transverse-field and low-noise classical regimes in a
measurable way.

The prediction was registered in the Zenodo v1 deposit of the Soma-Field paper
(doi:10.5281/zenodo.20350515) before the experiment was run.

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

Bootstrap confidence intervals (n = 200 seeds) estimate that the classical cold success
rate is bounded above by 1.9\% at all tested barrier strengths under the registered
protocol. Quantum peak occupancy
is stable at 0.389–0.416 across the full range.

**Pre-registered hardening protocol — all checks passed:**

- **Bootstrap** (n = 200): cold CI = [0.000, 0.019]; quantum peak 0.408–0.410. Intervals
  do not overlap at any barrier strength.
- **Control A** (start from Awe, barrier intact): classical 16/16 stay in Awe. PASS.
  Supports the directional-barrier interpretation: it blocks Fear → Awe in the tested
  baseline, not the reverse.
- **Control B** (barrier removed, $W[\text{Fear,Awe}] = +0.4$): classical 16/16 reach Awe.
  PASS. Supports the conclusion that the registered barrier, not the rest of the landscape
  geometry, blocks the tested classical dynamics.
- **Spectral gap**: gap narrows monotonically with barrier strength (B8: 0.0095, B10:
  0.0089, B12: 0.0085) and reaches its minimum at $s \approx 0.999$, consistent with a
  late-anneal tunnelling bottleneck in the simulated model.

**Verdict:** The registered reachability claim stands within the exact 8-qubit statevector
model. QUANT-EXP-1 is a PASS.

## The Penrose Connection

The paper situates this result in the context of Penrose's argument about
non-computability and consciousness. The connection is not that consciousness requires
quantum mechanics in general. The connection is more specific:

Penrose argued for a *gap* between classical computation and aspects of consciousness.
The soma-field identifies a corresponding *topological gap* in
the emotional landscape between what classical gradient descent can reach and what
a modelled basin transition requires. QUANT-EXP-1 provides a computational demonstration
of such a gap in this finite model and shows that it is crossed by the simulated
transverse-field term.

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
the resulting model is *more* constrained, not less — because predictions that fail to
match the primary observer's experience are immediately pressured, though not formally
falsified without external data.

The formal content is a set of operator modifications for the three conditions:

- **ASC**: The threshold operator $T$ is replaced by a modality-dependent operator
  $T_k$ for each sensory channel $k$, with different coupling strengths. The result
  is the characteristic simultaneous hypo- and hyper-sensitivity: some channels are
  below threshold where the neurotypical channel is above it, others are above where
  the neurotypical channel is below.

- **ADHD**: The Langevin noise term $\sqrt{2 T_{\text{eff}}} \, \eta(t)$ has elevated
  $T_{\text{eff}}$. This is a quantitative modification, not a qualitative one. The
  system is modelled not as broken but as sampling the energy landscape at higher
  temperature.
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
presented here as a dynamical model of music-induced affect.

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

The six papers form a single argument, stated here with the programme's evidence limits
explicit:

> The limbic system and its coupling to the body are modelled with mathematical
> structures drawn from field theory on an eleven-dimensional, $G_2$-inspired manifold.
> The identification is not a loose metaphor, but it remains assumption-bound: only
> theorems whose hypotheses are preserved transfer. Within that finite Hopfield landscape,
> QUANT-EXP-1 shows that registered topological barriers in the emotional-attractor model
> were not crossed by the low-noise classical baseline and were reached by simulated
> transverse-field annealing. The ASC, ADHD, and C-PTSD operator modifications are
> hypotheses with lived-case and model support, and the same formal architecture is applied
> to music-induced affect and abstract film.

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
instantiations is intended to generate falsifiable predictions from the same mathematical
core.

What makes this a *novel* research programme is the **gap it fills**: no comparable
soma-field dynamical model of the limbic system existed within this programme before this work. The Hopfield framework
gave the neocortex its formal model in 1982. The soma-field gives the limbic system its
candidate formal model in 2026. Together they are proposed as a two-layer formal
description of cortical-pattern and limbic-somatic computation.

---

# What Remains

The registered simulation work described here is complete for the current protocol. All
pre-registered hardening checks have been executed. Claims supported by these simulations
remain bounded by the exact statevector model and registered classical baselines.

Three categories of work remain outside the scope of these papers:

**Physical hardware test.** QUANT-EXP-1 uses exact statevector simulation. Running the
same 8-qubit experiment on physical quantum hardware would be a hardware test of the same
finite protocol, subject to device noise and calibration limits. It is a logical next step
for hardware-inclusive venues, but no current claim depends on hardware execution.

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

**Physical substrate.** The current formal model is physically under-specified with
respect to the tissue substrate in which the soma-field would be instantiated in living
organisms. A
companion paper, *The Physical Substrate of the Soma-Field* (Johnson, 2026g), develops
this layer across three converging research traditions: biotensegrity (Ingber, Levin)
as the mechanical architecture through which the somatic wave propagates globally;
fascial-interstitial continuity (Langevin, Schleip, Oschman) as the active signalling
tissue and physical locus of attractor-depth encoding; and biofield physiology (Popp,
Ho, McCraty, Rubik) as the candidate physical correlate of the field itself. The most
clinically significant hypothesis is a quantitative correspondence between fascial
stiffness and attractor depth: chronic fascial armouring measured by shear-wave
elastography is proposed as a possible physical correlate of the energy barriers that
QUANT-EXP-1 models computationally. Myofascial release and therapist-client physiological
entrainment are therefore framed as candidate mechanisms requiring empirical validation,
not as established treatments or proven substrate identities.

---

# Data and Code Availability

All papers, simulation code, result tables, figures, and Lean 4 proof files are
archived at the following Zenodo records (open access):

| Paper | DOI |
|---|---|
| *The Soma-Field* | [10.5281/zenodo.20350515](https://doi.org/10.5281/zenodo.20350515) |
| *Mathematical Co-identification* | [10.5281/zenodo.20287981](https://doi.org/10.5281/zenodo.20287981) |
| *Quantum Soma and the Penrose Gap* | [10.5281/zenodo.20351230](https://doi.org/10.5281/zenodo.20351230) |

The unreviewed papers (*Field Notes from the Inside*, *Music-Induced Affect*,
*The Tensor*, and this synthesis document) will be deposited on Zenodo as part of
the next release of the research archive.

---

# References

Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective
computational abilities. *Proceedings of the National Academy of Sciences*, 79(8),
2554–2558.

Johnson, A. (2026a). *Mathematical Co-identification: A Method for Structural Import
Across Scientific Domains*. Zenodo. https://doi.org/10.5281/zenodo.20287981

Johnson, A. (2026b). *The Soma-Field: A Wave-Based Model of Emotional Dynamics and
Its Clinical Implications*. Zenodo. https://doi.org/10.5281/zenodo.20350515

Johnson, A. (2026c). *Quantum Soma and the Penrose Gap: Topological Reachability in
the Emotional Attractor Landscape*. Zenodo. https://doi.org/10.5281/zenodo.20351230

Johnson, A. (2026d). *Field Notes from the Inside: A Patient-Constructed Model of
Emotional Dynamics*. Preprint.

Johnson, A. (2026e). *A Dynamical Field Model of Music-Induced Affect: Beyond the
Valence–Arousal Circumplex*. Preprint.

Johnson, A. (2026f). *The Tensor: An Abstract Film Definition*. Preprint.

Johnson, A. (2026g). *The Physical Substrate of the Soma-Field: Biotensegrity, Fascial
Interoception, and Bioelectric Correlates of Emotional Field Dynamics*. Preprint.

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
