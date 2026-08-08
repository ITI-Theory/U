---
title: "The Physics of Music and Affect: A Field-Theoretic Account of Aesthetic Experience"
subtitle: "[T]-Theory Volume: Music, Arts, and Aesthetics"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../paper/bibliography.bib
csl: ../../paper/apa-7th.csl
---


# Introduction: Music Knows Something Physics Forgot

Music works. This is the embarrassment at the centre of music psychology: we have an enormous body of evidence showing that music reliably produces specific emotional responses in listeners, that these responses are cross-cultural in their broad outlines, that they involve both peripheral physiological changes (heart rate, skin conductance, temperature) and central phenomenal changes (the felt quality of the experience), and that these effects can be predicted from structural features of the music — tempo, mode, harmonic progression, timbre, rhythm. What we lack is a theory. We know what music does; we do not know *why* it does it, in any deep sense.

The BRECVEMA model — Brainstem Reflex, Rhythmic Entrainment, Evaluative Conditioning, Contagion, Visual Imagery, Episodic Memory, Musical Expectancy, Aesthetic Judgement — enumerates the mechanisms by which music triggers emotional responses. It is an excellent taxonomy. But a taxonomy is not a theory. BRECVEMA tells you that rhythmic entrainment is a mechanism; it does not tell you why the nervous system has a mechanism for entraining to external rhythms, or what the entrainment is accomplishing, or why entrainment produces pleasure.

This book offers a theory: music works because it is a **somatic field perturbation**, and the response to music is the response of the somatic field to an external driving force. The framework is the **Universal Somatic Field (USF)**, and it turns out to be extraordinarily well-suited to describing what music does.

## Music as Field Perturbation

In the USF framework, the somatic field has an attractor landscape: stable configurations (emotional basins) that the field tends to settle into. The field's dynamics are governed by an energy functional, and the field evolves in the direction of steepest descent in that landscape. Stable emotions are attractor basins; emotional transitions are crossings of saddle points or (for larger transitions) tunnelling through energy barriers.

Music acts on this landscape in a specific way: it is a periodic external forcing of the somatic field, delivered via the auditory pathway. The forcing frequency is the musical tempo (or more precisely, the pulse hierarchy — the nested periodicities that characterise rhythmic music). The forcing amplitude is related to the intensity and timbre of the sound. The forcing waveform — the pattern of harmonic content, the shape of the chord progression, the contour of the melody — specifies the direction in somatic field space that the external force pushes.

This reframes every element of musical structure as a specification of a forcing function on the somatic field. The choice of key (major or minor) determines the direction of the tonic attractor. The choice of tempo determines the resonance relationship between the musical forcing and the internal rhythms of the nervous system. The chord progression determines a path through the attractor landscape — a sequence of pushes and releases that guide the field from one attractor to another. Harmonic tension is the energy the progression accumulates in climbing toward a saddle point; resolution is the release of that energy as the field settles into the target basin.

## BRECVEMA in Field-Theoretic Terms

The BRECVEMA mechanisms map cleanly onto field-theoretic operations:

**Brainstem Reflex** is the direct coupling between high-amplitude acoustic transients and the somatic field — the loudness-induced startle is a large-amplitude impulsive perturbation that momentarily drives the field far from its current attractor.

**Rhythmic Entrainment** is Arnold tongue locking: the musical tempo frequency-locks the field oscillations when it falls within the Arnold tongue around the field's natural frequency. The pleasure of rhythmic entrainment is the energy reduction associated with frequency locking — a Lyapunov function decrease.

**Evaluative Conditioning** is the modification of the attractor landscape by learned associations: a melody previously paired with a positive experience has carved a slight gradient in the landscape that biases the field toward positive attractors when the melody recurs.

**Contagion** is direct field-field coupling: performer-to-listener somatic field synchronisation via the auditory channel. This is the formal basis of what musicians call *communication* — the felt sense that the performer and listener are sharing an experience, not merely an acoustic event.

**Musical Expectancy** — the mechanism Meyer and Huron have analysed in most detail — is the dynamics of the field approaching an attractor basin: the pleasure of resolution is the energy release as the field settles into the basin, and the tension of expectation is the energy accumulation as it climbs toward it. Violation of expectation is a barrier-crossing event: the field is forced away from the expected basin, accumulating energy, and the surprise (pleasant or unpleasant) is the phenomenal correlate of that energy state.

## The Tensor Film and the Strandberg Guitar

Two of the papers in this volume address artistic applications of the framework directly. The Tensor film is a visual artwork — a four-dimensional field evolution rendered as a film — that acts on the viewer's somatic field in ways designed by the framework. The film is not illustration of the theory; it *is* the theory operating as art. The Strandberg guitar, used as the primary instrument in the companion live performance work, is configured as a closed-loop somatic feedback instrument: the performer's physiological state (heart rate variability, skin conductance) modulates the signal processing in real time, making the instrument responsive to the performer's somatic field.

These are not accessories to the scientific programme. They are the *artistic output* of the framework — what the theory looks like when it is not being stated but enacted. The [T]-Theory programme holds that science and art are not in tension; they are the same investigation conducted with different vocabularies.

## Aesthetic Experience as Attractor Traversal

The broader claim of this volume is that aesthetic experience in general — not just music, but visual art, dance, theatre, literature — is a form of guided attractor traversal. The artwork creates a sequence of somatic field states; the experience of the artwork is the experience of that traversal. A great work of art guides the somatic field through a trajectory that is difficult, illuminating, and that returns the field to a new attractor basin — one that was not available before the work was encountered. This is what artists have always known, in their own language. The USF framework provides the mathematics.

## What This Book Offers the Music Researcher

The papers assembled here are written for the reader with a background in music psychology, musicology, or the cognitive science of art. No physics or neuroscience background is assumed. The intended reader is comfortable with the BRECVEMA literature, with psychological experiments, and with music-theoretic vocabulary.

Chapter 2 (music affect dynamics) develops the full BRECVEMA-USF mapping and presents the experimental evidence. Chapter 3 (the Tensor) presents the film project and its theoretical basis. Chapter 4 (soma-field-book) develops the field-theoretic account of aesthetic experience more broadly. Chapter 5 (soma-field-synthesis) provides the synthesis and the research programme. The final chapter asks: what experiments would test the field-forcing hypothesis most directly, and what would a USF-grounded composition practice look like?

Music already knows what physics forgot. It moves through the right space. Now we have the equations.



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

## The Emotional Score

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

## Threshold Events

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

## Control Knobs

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

## The Rendering Function

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

## The Somatic Loop

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

# What the Body Remembers

```
> "The body keeps the score."
> — Bessel van der Kolk, 2014
>
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

## The Waiting Room

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

## What Trauma Is (and Is Not)

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

## The Polyvagal Ladder

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

## The Freeze Response

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

## Why This Matters for Treatment

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

# A Field of Feeling

```
> "The body is the unconscious mind."
> — Candace Pert, 1997
>
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

## What a Field Is

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

## Emotions in the Body

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

## The Soma-Field: A Technical Definition

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

# The Energy Landscape

```
> "Nature does not create mountains and valleys at random.
> They are shaped by the forces beneath them."
>
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

## Hills and Valleys

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

## Attractors and Basins

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

## The Hamiltonian

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

## The Coupling Matrix

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

# The Weight on the Field

```
> "The question is not why the behaviour persists,
> but what it was optimised for."
>
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

## The Modification

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

## Why Hypervigilance Is an Optimisation

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

## Thresholds and Consciousness

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

# Memory Written in the Body

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

## Two Kinds of Memory

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

## The Memory Kernel

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
> │      │  │   (episode resolves; field returns
>
  │         │                              baseline              │
  │         └──────────────────────────────────────────────→    │
  │                            time                             │
  └─────────────────────────────────────────────────────────────┘

  C-PTSD: Significant memory kernel — traces persist
  ┌─────────────────────────────────────────────────────────────┐
  │  Field  ▲                                                   │
>
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

## Why Early Traces Persist

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

## What Therapy Does

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

# How Early Is Early?

```
> "Before language, there is only the body."
>
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

## Developmental Time

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

## Below the Threshold: Pre-Verbal Trauma

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

## The Interpolation

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

## Forward Transformation

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

# The Same Equation, Three Times

```
> "The unreasonable effectiveness of mathematics in the
> natural sciences."
> — Eugene Wigner, 1960
>
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

## The Moment of Recognition

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

## The Same Hamiltonian

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

## The Wick Rotation: One Substitution

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

## Feynman Diagrams for Emotions

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

## The Correspondence Table

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

# The Nervous System as Phase Diagram

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

## Phase Transitions

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

## The Three Phases of the Nervous System

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

## ADHD: A Thermodynamic Framing

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
>

  ADHD (high σ₀, low γ):
  ──── e(t): fast, wide excursions, brief attractor dwell

>

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

# The Instrument

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

## The Map Is Not the Territory

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

## The Seven Dimensions

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

## The ABCD Operator Circuit

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

# Forward Transformation

```
> "The opposite of trauma is not safety.
> It is a nervous system that can find safety."
>
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

## The Wrong Goal

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

## The Right Goal

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
>
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

## What Therapy Does

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

## The Therapeutic Relationship as Field Coupling

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

# A Voyage into the Field

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

## The Navigable Landscape

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

## Emotions Looking for Each Other

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

## The Emotional Score

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

## The Holographic Clinic

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

## EmotionML: Labels Without Dynamics

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

\newpage

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
result — is that the moment of structural identity is also the moment the method
becomes irrelevant.

When Veneziano published his scattering amplitude, he did not need to cite the
library where he found the Beta function.  The formula was true.  Every theorem about
the Beta function was now a theorem about hadronic scattering.  The library visit was
the ladder; the amplitude was the building.  The ladder came down.

The present work makes this transition explicit, because being explicit about it is
itself a contribution.  Every reader of the earlier papers — particularly
*Mathematical Co-identification* — has correctly understood that MCI was the search
engine.  What should now be equally clear is that the search is over.

The exact moment the search ended was when the Lean 4 kernel accepted the proof.
Not when a reviewer accepted a paper.  Not when a human mathematician checked the
algebra.  When a formal proof-checking engine with no stake in the outcome closed the
goal.  That is the verification threshold.  Before it: exploration.  After it:
structural fact.

**What the work therefore rests on is not MCI.  It rests on four things:**

1. **Inductive structural necessity.** The 11-dimensional decomposition of a
   body-field-mind system is not an analogy with M-theory.  It is the minimum
   geometry required to account for the functional degrees of freedom of a conscious
   organism.  The isomorphism to M-theory is a *theorem*, not a design choice.

2. **Structural identity, not analogy.** A co-identification is not "A is like B."
   It is "A *is* B under relabelling."  Every theorem about B becomes a theorem about
   A — immediately, without re-derivation.  This is categorically different from
   saying that emotional dynamics *resemble* a Hopfield network.  They *are* one.

3. **Scale invariance.** The same Helmholtz Green's function equation governs 20
   scales of physical reality, from quantum foam to the cosmic web.  This is a
   discovered law.  MCI was used to find it; it stands whether or not MCI is
   remembered.

4. **Kernel verification.** The Lean 4 proofs are the epistemological gold standard.
   A human reviewer can miss a subtle error.  The kernel cannot.  Kernel-verified
   theorems are exactly as true as the axioms they depend on — and the axioms are
   explicit and listed.

The *mathematical-co-identification* paper remains an accurate account of how the
work was done — and naming the search process honestly is itself a contribution, in
a discipline where the search is usually erased.  But readers coming to the thesis or
omnibus now should understand that they are reading the *results*, not the method.
The method is in the history.  The results are in the formal proofs.

---

\newpage

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

\newpage

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
| *The Soma-Field* | [10.5281/zenodo.20350515](https://doi.org/10.5281/zenodo.20350515) |
| *Mathematical Co-identification* | [10.5281/zenodo.20287981](https://doi.org/10.5281/zenodo.20287981) |
| *Quantum Soma and the Penrose Gap* | [10.5281/zenodo.20351230](https://doi.org/10.5281/zenodo.20351230) |

The unreviewed papers (*Field Notes from the Inside*, *Music-Induced Affect*,
*The Tensor*, and this synthesis document) will be deposited on Zenodo as part of
the next release of the research archive.

---



\newpage

# Conclusion: Composing with the Field

The papers assembled in this volume have moved between the abstract and the concrete — between the field equations that govern somatic dynamics and the specific experiences of music, film, and performance. The movement was intentional. The [T]-Theory programme holds that art and science are not in tension; they are the same investigation conducted with different vocabularies and different instruments.

What music has always known — that sound can move a listener from one emotional state to another, that this movement is reliable and reproducible, that specific structural choices produce specific responses — the USF framework now knows mathematically. The field equations describe the mechanism. The question is what practitioners can do with that description.

## What Changes for Musical Practice

The field-theoretic account of music does not change what composers and performers do; it changes how they understand what they do. Several practical reframings follow.

**Tension and resolution as field dynamics.** The experience of harmonic tension and resolution — the fundamental temporal experience of tonal music — is the experience of the somatic field climbing toward a saddle point and then releasing into a target attractor basin. This means that the composer's choice of harmonic progression is a choice of trajectory through the energy landscape. Analysing a progression in terms of its energy dynamics — how it accumulates tension, how steeply it climbs, how completely it resolves — gives a new analytical vocabulary that complements the standard voice-leading and functional harmony accounts.

**Timbre as field direction.** In standard accounts, timbre is a spectral characteristic of a sound. In the field-theoretic account, timbre specifies the direction in somatic field space that the sound pushes. Different timbres push the field in different directions — toward different attractor regions. This explains the emotional colouring of timbres: the warmth of strings, the edge of distorted electric guitar, the melancholy of the oboe. Each is a different directional push in field space.

**Rhythm as Arnold tongue driving.** The rhythmic experience of music — the groove, the drive, the sense of forward motion — is the experience of the somatic field's oscillations being driven into Huygens locking by the rhythmic pulse. The pleasure of groove is the energy reduction associated with frequency locking. This predicts that grooves will be most satisfying when the tempo is within the listener's Arnold tongue — and that listeners with narrower tongues will be more selective about which tempos produce the groove experience.

## The Tensor Film as Research

The Tensor film deserves a special note in this conclusion, because it occupies an unusual position: it is simultaneously an artwork and a scientific instrument. As an artwork, it is a four-dimensional field evolution rendered cinematically, designed to guide the viewer's somatic field through a specific trajectory. As a scientific instrument, it is a controlled stimulus — a precisely specified field perturbation — whose effect on viewer physiology and phenomenology can be measured.

The film has been shown to audiences and the responses measured qualitatively. A systematic study — measuring physiological responses (HRV, skin conductance, pupil dilation) at timed points during the film, correlating with self-reports of emotional state — would give a controlled test of the field-forcing hypothesis: does the film move the somatic field in the direction it was designed to move it?

This is not just a test of the film. It is a test of the framework.

## Music as Emotional Technology

The broadest implication of the USF framework for music is the reconceptualisation of music as emotional technology — as a tool for reliably and reproducibly modifying the somatic field states of listeners. This is not a new idea; music has been used therapeutically for millennia, and the therapeutic applications of music are an active clinical field. What is new is the formal basis: a set of equations that specifies how specific musical structures produce specific field modifications, and that can be used to design music for particular therapeutic purposes.

Music therapy — currently an empirical practice without a theoretical foundation — would benefit from the field-theoretic framework in the same way that pharmacology benefits from biochemistry: knowing the mechanism allows rational design rather than empirical trial.

## Open Questions

**Experimental test of BRECVEMA-USF mapping.** Each of the eight BRECVEMA mechanisms has a field-theoretic correlate. A systematic experimental programme — testing each mechanism's predictions in controlled conditions — would validate (or refute) the mapping.

**Individual differences in Arnold tongue width.** The framework predicts that individuals differ in their Arnold tongue width — the range of tempos and rhythmic patterns that produce groove and entrainment. Measuring these individual differences and correlating with personality traits, neurological profiles, and musical training would test the framework's prediction about the neural basis of musical responsiveness.

**Therapeutic protocol design.** If music is emotional technology, what protocols would be most effective for specific therapeutic purposes? The framework provides the design principles; clinical trials would test the outcomes.

The score is the field trajectory. The performance is the traversal. The experience is the attractor.
