---
title: "The Tensor"
subtitle: "An Abstract Film Definition"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "May 2026"
---

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
