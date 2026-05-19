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

*(To be completed — recorded session analysis)*

## 4.1 Protocol

## 4.2 State Trajectory Analysis

## 4.3 Comparison with Circumplex Predictions

---

# 5. Discussion

## 5.1 What the Model Adds to BRECVEMA

## 5.2 Phase Transitions and Musical Catharsis

## 5.3 The ADHD Temperature: A Reframing

The elevated $T_\text{eff}$ of the ADHD modifier is not purely pathological.
Hertz, Krogh, and Palmer (1991) observed that thermal noise in Hopfield
networks "makes it possible to kick the system out of spurious local minima"
that would trap a deterministic system permanently.  In the musical context,
a high-temperature listener is not necessarily worse at music engagement —
they are harder to trap in a single emotional state, which may be a distinct
form of musical sensitivity.

## 5.4 Limitations

## 5.5 Future Work

- Empirical validation against self-report and psychophysiological measures
- Extension to the full infinite-dimensional field (soma-field-paper §4)
- Multi-listener coupling (ensemble / therapeutic dyad)

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
