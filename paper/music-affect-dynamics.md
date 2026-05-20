---
title: "A Dynamical Field Model of Music-Induced Affect: Beyond the Valence–Arousal Circumplex"
author: "Alistair Johnson"
date: "2026"
keywords: [soma-field, music and emotion, dynamical systems, attractor dynamics, affective computing, MIDI, real-time systems]
abstract: |
  The dominant framework for modelling music-induced affect is Russell's
  valence–arousal circumplex: a static two-dimensional map on which emotional
  states are located as points.  The framework describes *where* a listener
  is emotionally, but not *how* they move there, what forces act on them, what
  traps them, or what allows escape.  We present a dynamical field model of
  music-induced affect in which emotional state is a continuous vector
  $\mathbf{e}(t) \in \mathbb{R}^{16}$, governed by a Langevin equation with
  an energy function $H(\mathbf{e})$ whose local minima are the named
  attractor states of the polyvagal and trauma literature (regulated calm,
  fight, flight, freeze, flow, dissociation).  The model is implemented as a
  real-time instrument: a MIDI controller array maps to the state vector;
  a Python field server computes energy, gradient, and threshold crossings
  at 50 Hz; audio output (Ableton Live) and 3D fractal visual output
  (Mandelbulb, projected onto HoloGauze) are driven by the field state via
  OSC.  We demonstrate the instrument in a recorded session and analyse the
  resulting state trajectory against circumplex predictions.  The model
  makes predictions that the circumplex cannot: phase transitions into and
  out of attractor states, the adaptive function of high effective temperature
   (ADHD modifier), and the depth asymmetry of freeze versus regulated calm.
   We specify preregistered hypotheses, baseline models, and disconfirmation
   criteria to make the framework publication-testable rather than descriptive.
---

# 1. Introduction

## 1.1 The Gap in the Literature

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

## 1.2 The Soma-Field Model

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

## 1.3 Why Music

Music is uniquely suited to driving the field.  BRECVEMA's mechanisms act as
*forcing functions* on the energy landscape: rhythmic entrainment modulates
$\gamma$ (damping); musical expectancy and resolution create transient wells and
barriers; appraisal shifts the bias vector $\mathbf{b}$.  The soma-field model
provides the dynamical substrate into which BRECVEMA mechanisms plug as
parameter modulations.

---

# 2. The Model

## 2.1 State Space

$$\mathbf{e}(t) = (e_1^s, \ldots, e_8^s,\; e_1^c, \ldots, e_8^c) \in [0,1]^{16}$$

where $e_i^s$ is the somatic intensity and $e_i^c$ the cognitive intensity
of emotional mode $i$.  The eight modes are: *calm*, *anger/fight*,
*anxiety/flight*, *grief*, *freeze/dissociation*, *hypervigilance*,
*flow/absorption*, *joy*.

## 2.2 Energy Function and Attractors

$$H(\mathbf{e}) = \tfrac{1}{2}\,\mathbf{e}^\top W\,\mathbf{e} - \mathbf{b}^\top\mathbf{e}$$

The coupling matrix $W$ (symmetric, negative semi-definite on the basin of each
attractor) encodes which emotional modes co-activate and which compete.
The bias vector $\mathbf{b}$ encodes the resting depth of each attractor.

Named attractors match the polyvagal hierarchy and trauma literature:
*regulated calm* (global minimum), *fight*, *flight* (shallow saddle),
*freeze* (deep isolated minimum), *flow*, *dissociation*.

## 2.3 Dynamics

$$\gamma\,\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t)) + \sqrt{2D}\;\xi(t)$$

where $\gamma$ is damping, $D$ is diffusion (noise temperature), and
$\xi(t)$ is white noise.  The effective temperature is $T_\text{eff} = D/\gamma$.

## 2.4 Threshold and Conscious Experience

$$\mathcal{P}_i(t) = \mathbf{1}\left[\max(e_i^s,\, e_i^c) > \theta\right]$$

Mode $i$ crosses into conscious experience when its amplitude exceeds
threshold $\theta$.  Sub-threshold activity is real and causally active
but not consciously perceived — matching phenomenological accounts of
interoception and pre-verbal affect.

---

# 3. The Instrument

## 3.1 Hardware Architecture

*(See instrument/DESIGN.md for full specification.)*

| Layer | Hardware |
|---|---|
| State input | 2× MIDI Fighter Twister (16 encoders each) |
| Scene control | 2× Elgato Stream Deck XL + Bitfocus Companion |
| Trajectory sequencer | Akai Fire (iSotonik hack) |
| MIDI routing | Bome MIDI Translator Pro → single virtual port |
| Audio output | Ableton Live Suite + Max4Live OSC receiver |
| Visual output | TouchDesigner (Mandelbulb shader) → HDMI → HoloGauze |
| Field server | Python 3.14, 50 Hz update rate |

## 3.2 MIDI Mapping

Twister 1 encodes the 8 somatic components; Twister 2 encodes the 8 cognitive
components.  Each encoder's turn value maps to $e_i \in [0,1]$; push toggles
mute.  Encoders 9–12 on each Twister control field parameters ($\gamma$, $D$,
$\theta$) and neurotype modifiers.

## 3.3 Audio Rendering

The Max4Live device receives OSC from the Python server and maps:

| Field quantity | Audio parameter |
|---|---|
| $H(\mathbf{e})$ | Macro energy — master filter cutoff, reverb size |
| $\|\nabla H\|$ | Rhythmic density / gate rate |
| $T_\text{eff}$ | Noise floor, stochastic modulation depth |
| Threshold crossing $\mathcal{P}_i$ | Trigger: note-on for mode $i$ |
| Nearest attractor | Scene/track selection |

## 3.4 Visual Rendering

The Mandelbulb power parameter is driven by $H$; rotation speed by $\|\nabla H\|$;
colour temperature by $T_\text{eff}$.  Threshold crossings trigger particle bursts.
Output via HDMI to a short-throw projector onto HoloGauze screen.

---

# 4. Demonstration Session

## 4.1 Protocol

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

## 4.2 State Trajectory Analysis

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

## 4.3 Comparison with Circumplex Predictions

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

## 4.4 Results Template (for Manuscript Fill-In)

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

## 4.5 Statistical Analysis Plan

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

## 4.6 Exploratory Pilot Fill (Single Logged Session)

Using `instrument/logs/session_20260519_051107.jsonl` as an exploratory pilot run,
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

# 5. Discussion

## 5.1 What the Model Adds to BRECVEMA

BRECVEMA remains the best mechanism taxonomy for music-induced affect. The
soma-field contribution is orthogonal: it supplies state dynamics. In this
combined view, BRECVEMA terms become parameter modulations to a dynamical system,
rather than endpoint labels on a static map.

Concretely, the model adds:

- A state equation with explicit forces and noise
- Quantifiable attractor depth and transition latency
- Testable hysteresis and barrier-crossing predictions
- A direct bridge from controller gestures to state-space motion

## 5.2 Phase Transitions and Musical Catharsis

Catharsis is modelled as threshold crossing plus attractor transfer under
temporarily elevated energy and noise. This yields a measurable event pattern:

1. rising $\|\nabla H\|$ and threshold event density,
2. short interval of high transition probability,
3. stabilisation in a lower-energy basin.

The account is mechanistic rather than metaphorical, and can be falsified by
absence of this sequence in sessions labelled cathartic by participants.

## 5.3 The ADHD Temperature: A Reframing

The elevated $T_\text{eff}$ of the ADHD modifier is not purely pathological.
Hertz, Krogh, and Palmer (1991) observed that thermal noise in Hopfield
networks "makes it possible to kick the system out of spurious local minima"
that would trap a deterministic system permanently.  In the musical context,
a high-temperature listener is not necessarily worse at music engagement —
they are harder to trap in a single emotional state, which may be a distinct
form of musical sensitivity.

## 5.4 Limitations

This manuscript reports a model and a reproducible instrument pipeline, but not
yet a large-n confirmatory dataset. Main limitations are:

- single-operator demonstration bias,
- potential controller-learning confound,
- limited external validity without independent participant cohorts,
- current attractor labels depend on theory-informed interpretation.

These are acceptable at pilot stage but must be addressed before strong clinical
generalisation claims.

## 5.5 Future Work

- Preregistered multi-participant study with blinded block labels
- Joint modelling with self-report + physiological channels (HRV, EDA)
- Extension to the full infinite-dimensional field (soma-field-paper §4)
- Multi-listener coupling (ensemble / therapeutic dyad)
- Public benchmark dataset and baseline scripts for circumplex and AR models

## 5.6 Non-Specialist Interpretation

In plain terms: this model treats music-driven emotion as motion on a landscape,
not as dots on a chart. Some emotional states are shallow and easy to leave;
others are deep and sticky. Music can change both where you are and how easy it
is to move. The key added value is not a new label for feelings, but a measurable
account of why transitions happen when they do, and why some transitions fail.

## 5.7 Reproducibility Checklist

For submission and external replication, include the following with each reported run:

- exact commit hash for field server and mapping scripts,
- full parameter dump ($W$, $\mathbf{b}$, $\gamma$, $D$, $\theta$),
- controller mapping export,
- raw 50 Hz logs and derived analysis tables,
- baseline model scripts (circumplex projection and AR baseline),
- figure-generation scripts with deterministic seed policy.

Minimum replication criterion: an independent operator reproduces directionally
consistent outcomes for H1-H3 under the same protocol template.

## 5.8 Reviewer-Risk Objections and Responses

| Reviewer objection | Current response in this manuscript | Required next evidence |
|---|---|---|
| "Results reflect one operator and one setup." | Section 5.4 labels current evidence as pilot-stage and limits claims accordingly. | Multi-operator replication with preregistered protocol and blinded block labels. |
| "Attractor labels are theory-laden and may bias interpretation." | Baseline model comparison and explicit disconfirmation criteria are included in Sections 4 and 5. | Add independent label adjudication and inter-rater agreement reporting. |
| "Controller behavior could explain transitions without field structure." | H1-H3 are framed against circumplex/AR baselines rather than label-only narratives. | Include sham-control and randomized mapping tests. |
| "No physiological co-validation yet." | Section 5.5 schedules HRV/EDA integration as a preregistered next step. | Joint model showing convergent evidence across self-report, behavior, and physiology. |

## 5.9 Replication Acceptance Rule

For publication claims above exploratory scope, acceptance requires all of the
following:

1. independent operator rerun using the released parameter and mapping package,
2. directional agreement on pre-registered hypotheses,
3. reproducible figure/table generation from raw logs,
4. explicit failure report for any unmet hypothesis.

Any failed item does not invalidate the full framework, but does block promotion
of the affected claim from exploratory to validated status.

## 5.10 Independent Replication Ledger Linkage

Promotion beyond exploratory support is tracked in
`paper/INDEPENDENT_REPLICATION_LEDGER.md`.

Tracked hypothesis IDs in ledger scope: `H1`, `H2`, `H3`.

Promotion gate: each hypothesis requires at least one independent-operator `PASS`
ledger entry with fixed package hash, protocol identifier, and linked raw plus
derived artifacts before this manuscript labels it as validated (`S3`).

---

# References

Hertz, J., Krogh, A., & Palmer, R. G. (1991). *Introduction to the Theory of Neural
Computation*. Addison-Wesley.

Hopfield, J. J. (1982). Neural networks and physical systems with emergent
collective computational abilities. *Proceedings of the National Academy of
Sciences*, *79*(8), 2554–2558.

Johnson, A. (2026a). *The Soma-Field Model: A Field-Theoretic Account of Affective
Regulation*. Preprint.

Johnson, A. (2026b). Mathematical co-identification: A method for structural import
across scientific domains. Preprint.

Juslin, P. N., & Sloboda, J. A. (Eds.). (2010). *Handbook of Music and Emotion:
Theory, Research, Applications*. Oxford University Press.

Juslin, P. N. (2013). From everyday emotions to aesthetic emotions: Towards a
unified theory of musical emotions. *Physics of Life Reviews*, *10*(3), 235–266.

Russell, J. A. (1980). A circumplex model of affect. *Journal of Personality and
Social Psychology*, *39*(6), 1161–1178.

---
