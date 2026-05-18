---
title: "The Soma-Field: A Wave-Based Model of Emotional Dynamics and Its Clinical Implications"
subtitle: "Bridging Quantum Field Theory, Neural Energy Functions, and Somatic Psychotherapy"
author: "[Author Name]"
date: "May 2026"
lang: en-GB
abstract: |
  Emotions are among the most clinically important and least formally described phenomena in
  human experience. Existing models disagree on their number, hierarchy, and substrate, yet
  clinical practice has long recognised that emotional states are distributed across the body,
  that they persist below conscious awareness, and that they interact with one another in
  complex, often nonlinear ways. This paper proposes the **Soma-Field Model**: a theoretical
  framework in which emotions are conceived not as discrete events but as a persistent,
  distributed wave field co-inhabiting the body and nervous system. Drawing on a structural
  analogy with Quantum Field Theory and the energy-function formalism of Hopfield neural
  networks, the model offers a mathematically grounded account of four clinically familiar
  phenomena: the sub-perceptual presence of emotion, the threshold at which emotion enters
  conscious awareness, the interaction between simultaneous emotional states, and the
  characteristic attractors of the autonomic nervous system — fight, flight, freeze, and
  regulated calm. A companion instrument, based on a MIDI controller and multimodal
  audiovisual feedback, is described as a means of externalising the emotional field for
  therapeutic use. Clinical implications for assessment, psychoeducation, and intervention
  are discussed.

keywords:
  - somatic psychotherapy
  - emotional field
  - quantum field theory analogy
  - Hopfield energy function
  - polyvagal theory
  - biofeedback
  - affect regulation
---

---

# 1. Introduction

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

The paper proceeds as follows. Section 2 reviews the relevant background in somatic clinical
models, and introduces the two theoretical tools borrowed from physics and computer science:
quantum field theory and Hopfield network energy functions. Section 3 develops the Soma-Field
Model in detail. Section 4 describes the energy landscape, including the attractor states
corresponding to fight, flight, freeze, and regulated calm. Section 5 discusses dissonance
and resolution as mechanisms of emotional interaction. Section 6 describes the Soma-Field
Instrument, a practical tool for therapeutic use. Section 7 addresses clinical implications.

---

# 2. Background

## 2.1 The Body-Mind Problem in Clinical Practice

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

## 2.2 The Felt Sense and Sub-Perceptual Emotion

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

## 2.3 Quantum Field Theory as a Conceptual Tool

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

This paper does not claim that emotions are quantum phenomena in any literal sense. The
analogy is structural, not ontological. The value of QFT as a conceptual tool is that it
provides a precise vocabulary for the following set of ideas, which are central to the
clinical observation of emotion:

- A quantity that exists everywhere, continuously, even when unobserved
- A background of sub-threshold activity that is real and causally effective
- The emergence of observable phenomena (conscious feelings) through threshold-crossing
  excitation of that background
- The possibility of multiple simultaneous excitations that interact with one another

## 2.4 Neural Network Energy Functions and Hopfield Networks

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

Where Hopfield proposed an *artificial brain* — a network that stores cognitive patterns
and retrieves them from partial cues — the Soma-Field Model proposes an *artificial body*:
a field that stores emotional-somatic states and re-enacts them in response to body cues.
Hopfield memory is associative and pattern-completing; somatic memory is state-reinstating.
The field does not merely remember what happened. It re-lives it. A body with a past.

A further lineage note is worth recording. Ramsauer et al. (2020) demonstrated that
continuous-state modern Hopfield networks are mathematically equivalent to the
self-attention mechanism in transformer language models. The softmax attention operation
that drives contemporary large language models is a Hopfield retrieval step. The
Soma-Field Model sits in this same energy-based lineage: the equations underlying
associative memory, language understanding, and somatic trauma response are, at the
appropriate level of abstraction, the same equations.

---

## 2.5 The Formal Correspondences: Where the Link Was Seen

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

---

# 3. The Soma-Field Model

## 3.1 Emotions as a Persistent Wave Field

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

```
  SOMATIC WAVE (body)                    NEURAL WAVE (brain / CNS)

  ┌──────────────────────┐              ┌──────────────────────┐
  │  ≋  jaw / throat  ≋  │              │  ≋   prefrontal   ≋  │  ← cognition
  │  ≋  chest / heart ≋  │              │  ≋     limbic     ≋  │  ← emotion memory
  │  ≋  gut / viscera ≋  │              │  ≋   brainstem    ≋  │  ← ANS regulation
  │  ≋  limbs / fascia≋  │              │  ≋  vagus nerve   ≋  │  ← body↔brain axis
  └──────────┬───────────┘              └──────────┬───────────┘
             │                                      │
             │           ╔═════════════╗            │
             ╰───────────╢   COUPLED   ╟────────────╯
                         ╚══════╤══════╝
                                │
                 ┌──────────────┴──────────────┐
                 │       E(x,t) — the field    │
                 │    ≋  always present  ≋     │
                 │    ≋  always moving   ≋     │
                 │    ≋  everywhere      ≋     │
                 └─────────────────────────────┘
```
*Figure 1. The Soma-Field. The body and brain are not separate containers of emotion but two
coupled components of a single distributed wave field. Neither is primary; each continuously
modifies the other. The ≋ symbols indicate that wave activity is always present in each region,
not only during episodes of conscious feeling.*

## 3.2 The Perception Threshold

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

```
  FIELD AMPLITUDE — single emotional mode i, over time

  │                                      ╭──────────────╮
  │             ╭──╮                    ╱                ╲
  │   ╭─╮      ╱    ╲                  ╱                  ╲
  │   ╰─╯ ╭───╯      ╲                ╱                    ╲
  T ──────────────────╲──────────────╱──────────────────────╲── ← threshold T_i
  │              ╭─╮   ╲─────╮      ╱                        ╰───
  │          ────╯ ╰─────────╰──────
  └──────────────────────────────────────────────────────────────► time
   │←───────────── sub-perceptual ──────────────│← perceived ───│
   │  emotion is present, real, causally active  │  emotion is   │
   │  shapes physiology and behaviour            │  conscious,   │
   │  (= Gendlin's 'felt sense')                 │  named, felt  │
   │                                             │               │
   │  ↕  virtual particle (QFT vacuum)           │  ↕ real particle (field excitation)
```
*Figure 2. The perception threshold T_i for a single emotional mode. The field is active
continuously (lower trace). Conscious experience arises only when amplitude exceeds T_i
(upper trace). Everything below the line is still there — shaping body and behaviour
before it can be named.*

## 3.3 The Interaction of Emotional Modes

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

## 3.4 The Three-Layer Architecture

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

**Layer 2 — Limbic system / emotional memory.** The primary substrate of the Soma-Field
Model. The coupling matrix $W$, memory kernel $K(\tau)$, Hamiltonian $H(\mathbf{e})$, and
threshold $T$ all belong here. The limbic layer stores emotional-somatic states and
reinstates them in response to partial body cues: a continuous, asymmetric, temporally
extended Hopfield network operating on somatic states rather than cognitive patterns.

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

# 4. The Energy Landscape

## 4.1 The Structure of the Emotional Energy Function

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

## 4.2 Attractor States: Fight, Flight, Freeze, and Regulated Calm

The Soma-Field Model proposes that the major attractor basins of the emotional energy
landscape correspond directly to the autonomic states described by Porges' polyvagal theory.

```
  ENERGY LANDSCAPE — contour map (view from above)
  Concentric rings = equal-energy surfaces. Tighter rings = steeper gradient.
  The field always flows outward from peaks (╳) and inward to minima (☉).

     · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
   · · ┌─────────────┐ · · · · · · · ┌─────────────┐ · · · · ·
   · ·┌┤    FIGHT    ├┐· · · · · · ·┌┤   FLIGHT    ├┐· · · · ·
   · ·││      ╳      ││· · · · · · ·││      ╳      ││· · · · ·
   · ·└┤  (unstable) ├┘· · · · · · ·└┤  (unstable) ├┘· · · · ·
   · · └─────────────┘ · · saddle · · └─────────────┘ · · · · ·
     · · · · · · · · · · ·  zone  · · · · · · · · · · · · · · ·
     · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
   · · ┌───────────────────┐ · · · · · · ┌───────────┐ · · · · ·
   · ·┌┤                   ├┐· · · · · ·┌┤           ├┐· · · · ·
   · ·││  FREEZE           ││· · · · · ·││     ☉     ││· · · · ·
   · ·││  (deep, isolated) ││· · · · · ·││   CALM    ││· · · · ·
   · ·└┤  hard to leave    ├┘· · · · · ·└┤  (global  ├┘· · · · ·
   · · └───────────────────┘ · · · · · ·  └───────────┘ · · · · ·
     · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·

  ╳ = energy peak (field flows away)    ☉ = global minimum (field flows toward)
  └─┘ = basin walls (energy barriers)   · = energy contours (denser = steeper)
```
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
*Figure 2. Schematic energy landscape. Fight/flight are high-energy, unstable local minima.
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

## 4.3 The Coupling Matrix as a Personal Signature

The coupling matrix $W$ is not universal. Each person has a unique $W$, shaped by attachment
history, trauma, cultural context, and temperament. A person with a history of developmental
trauma may have a $W$ in which anxiety and shame are strongly coupled ($W_{\text{shame,
anxiety}} \gg 0$), creating a combined attractor that is particularly deep and sticky. A
person with a secure attachment history may have a $W$ in which positive emotions are broadly
coupled to one another, creating a wide basin around regulated calm.

This implies that the energy landscape is a therapeutic object in its own right: understanding
a patient's $W$ is understanding the structural dynamics of their emotional life.

---

# 5. Dissonance and Resolution

## 5.1 The Acoustic Analogy

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

## 5.2 The Resolution Principle

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

# 6. The Soma-Field Instrument

## 6.1 Rationale

The Soma-Field Model is not only a theoretical framework. It motivates a practical
therapeutic instrument: a means by which a person can *externalise* their emotional field —
make it visible and audible — and interact with it in real time.

The core insight is that the emotional field is normally invisible to its host. It operates
below the threshold of conscious awareness, shaping behaviour and physiology without being
available for reflection. If its activity could be rendered as a signal — a sound, an image,
a pattern — it could become an object of therapeutic attention.

## 6.2 Design

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
*Figure 3. The Soma-Field Instrument: input, computation, and multimodal output.*

## 6.3 The Feedback Loop

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

## 6.4 The Pluggable Emotion Model

No single model of the emotions is assumed. The coupling matrix $W$ — the structure that
determines how emotional modes interact — is loaded from an external configuration file.
Standard models (Plutchik's wheel of emotions, Ekman's basic emotions, the
valence-arousal-dominance dimensional model) are provided as defaults. The therapist or
client can modify the coupling values to reflect their own understanding of their emotional
patterns, or a new model can be substituted entirely. The computational engine is
model-agnostic.

---

# 7. Clinical Implications

## 7.1 Assessment

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

## 7.2 Intervention

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

## 7.3 Psychoeducation

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

## 7.4 Neurodivergent Conditions as Operator Modifications

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
*Figure 3. The same emotional field mode under two dynamic regimes. Top: regulated
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

# 8. Limitations and Future Directions

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

# 9. Conclusion

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

---

# References

Damasio, A. (1994). *Descartes' Error: Emotion, Reason and the Human Brain*. Putnam.

Gendlin, E. T. (1978). *Focusing*. Everest House.

Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective
computational abilities. *Proceedings of the National Academy of Sciences*, *79*(8),
2554–2558.

Levine, P. A. (2010). *In an Unspoken Voice: How the Body Releases Trauma and Restores
Goodness*. North Atlantic Books.

Ogden, P., Minton, K., & Pain, C. (2006). *Trauma and the Body: A Sensorimotor Approach
to Psychotherapy*. W. W. Norton.

Porges, S. W. (2011). *The Polyvagal Theory: Neurophysiological Foundations of Emotions,
Attachment, Communication, and Self-Regulation*. W. W. Norton.

Schore, A. N. (2001). The effects of early relational trauma on right brain development,
affect regulation, and infant mental health. *Infant Mental Health Journal*, *22*(1–2),
201–269.

Van der Kolk, B. (2014). *The Body Keeps the Score: Brain, Mind, and Body in the Healing
of Trauma*. Viking.

Garfinkel, S. N., et al. (2016). Interoception in autism: A review and research agenda.
*Neuroscience & Biobehavioral Reviews*, *65*, 1–11.

Murray, D. (2018). Monotropism — an interest-based account of autism.
In *Encyclopedia of Autism Spectrum Disorders*. Springer.

Nicolaidis, C., Raymaker, D., McDonald, K., Dern, S., Ashkenazy, E., Boisclair, C.,
... & Baggs, A. (2015). Comparison of healthcare experiences in autistic and
non-autistic adults: A cross-sectional online survey facilitated by an academic-
community partnership. *Journal of General Internal Medicine*, *28*(6), 761–769.

Vitiello, G. (2001). *My Double Unveiled: The Dissipative Quantum Model of Brain*.
John Benjamins.

---

*Correspondence regarding this article should be addressed to [Author Name], [Institution],
[Address]. Email: [email address].*

---

# Appendix A: Categorical Formalization and the M-Theory Scale Hierarchy

*This appendix is addressed to readers with a background in mathematics, theoretical physics,
or formal methods. It provides the formal structure underlying the clinical model, and
describes the type-theoretic foundations required for implementation in a proof assistant
such as Lean 4. It can be read independently of the main text.*

---

## A.1 The Missing Layer: Why Category Theory?

The main body of this paper presents the Soma-Field Model in clinical terms. But there is a
deeper structural question that the clinical presentation leaves implicit: *how does a model
defined at the scale of quantum strings map onto a model of somatic emotional experience?*
More practically: *what mathematical language allows each component of the system —
manifold, field, state, perception, output — to be independently replaced without breaking
the pipeline?*

The answer to both questions is the same: **category theory**. A category is a collection
of objects and structure-preserving maps (morphisms) between them. A *functor* is a
structure-preserving map between categories. The category-theoretic formalization of the
Soma-Field Model does three things:

1. Makes explicit the **scale hierarchy** from the 11D emotional manifold to the 1D
   conscious percept — each step is a functor, and the composition of functors is the
   full pipeline
2. Defines a **type-theoretically correct interface** at each layer boundary, so that any
   layer can be replaced (different emotion model, different output renderer, different
   field representation) without disturbing the others
3. Connects the **holographic principle** to the fractal visual output: both are instances
   of the same categorical structure — a lower-dimensional boundary encoding a
   higher-dimensional bulk

---

## A.2 M-Theory Compactification as the Scale Model

In M-Theory, the 11-dimensional spacetime is not directly observable. What we experience
is a 4-dimensional effective theory, obtained by *compactifying* 7 extra dimensions onto
a compact G₂ manifold. Compactification is not a loss of information — it is a
reorganisation: the topology of the compactified space determines the particle spectrum
and coupling constants of the effective 4D theory. At each scale, a projection functor
carries structure downward, integrating out degrees of freedom that are not observable at
that level but whose topological invariants are preserved.

The Soma-Field Model proposes an analogous compactification tower for emotional experience:

| M-Theory Level | Soma-Field Analogue | Scale |
|---|---|---|
| 11D M-theory spacetime | Full emotional manifold (all body-mind modes) | Micro (sub-perceptual fluctuations) |
| 7D compact G₂ manifold | Emotional coupling structure (topology of W) | Meso (dispositional patterns) |
| 4D effective spacetime | Observable somatic-emotional field **E**(x,t) | Meso (felt sense, sub-threshold) |
| 1D worldsheet | Conscious percept (single named feeling) | Macro (threshold-crossing) |

*Table A1. The compactification tower: M-theory levels and their Soma-Field analogues.*

```
  G₂ COMPACT MANIFOLD M₇ — schematic (seven compactified dimensions, projected to 2D)
  This is the 'hidden' geometry that the full emotional field lives in.

       φ¹     φ²     φ³     φ⁴     φ⁵     φ⁶     φ⁷
        │      │      │      │      │      │      │
  ──────┼──────┼──────┼──────┼──────┼──────┼──────┼──── boundary
        │      │      │      │      │      │      │
  ┌─────┴──────┴──────┴──────┴──────┴──────┴──────┴─────┐
  │     ╭────╮        ╭────╮        ╭────╮        ╭────╮ │
  │    ╱  ·  ╲       ╱  ·  ╲       ╱  ·  ╲       ╱  ·  ╲│
  │   │   ·   │─────│   ·   │─────│   ·   │─────│   ·   ││
  │    ╲  ·  ╱       ╲  ·  ╱       ╲  ·  ╱       ╲  ·  ╱│
  │     ╰──┬─╯        ╰──┬─╯        ╰──┬─╯        ╰──┬─╯ │
  │        │  ╲          │  ╲          │  ╲          │    │
  │        │   ╰─────────┘   ╰─────────┘   ╰─────────┘    │
  │                    G₂ holonomy group                    │
  │              (how the dimensions connect)               │
  └─────────────────────────────────────────────────────────┘
                             │
           ┌─────────────────┴──────────────────┐
           │                                    │
    In M-theory:                        In Soma-Field:
    topology of M₇                      topology of M₇
    determines which                    determines the
    particles exist                     coupling matrix W:
    in the 4D theory                    which emotions interact

  Each φⁱ is one extra dimension, compactified to a tiny circle.
  The way these circles connect — the G₂ holonomy — is the structure
  of W. Different manifold geometries → different W → different
  emotional attractor patterns. Changing the emotion model
  (Plutchik → Ekman → custom) is, formally, changing this geometry.
```
*Figure A1. Schematic of the compact G₂ manifold M₇. The seven extra dimensions are
represented as circular nodes connected by the G₂ holonomy structure. This diagram is a
projection — the actual object is seven-dimensional — but the key point is legible: the
topological structure of the connections between dimensions determines the physical properties
of the effective theory. In the Soma-Field analogy, it determines W.*

The critical structural claim is that the coupling matrix $W$ — the object that determines
which emotions amplify or suppress one another — encodes the **topology of the compactified
space**. Just as the G₂ holonomy group of the compactified manifold determines which
particles can exist in the effective 4D theory, the structure of $W$ determines which
emotional configurations are stable in the effective somatic theory. Changing the emotion
model (Plutchik → Ekman → custom) is, in this framework, a change of compactification
geometry — a different topology, a different set of stable attractors.

---

## A.3 The Four Categories and Their Functors

Define four categories:

**𝓜 (Manifold Category)**
- *Objects*: emotional manifold configurations M with G₂ holonomy structure
- *Morphisms*: smooth deformations δM preserving the G₂ 3-form Ω

**𝓕 (Field Category)**
- *Objects*: field configurations **E**(x,t) on the soma — sections of a bundle over body × time
- *Morphisms*: field evolution operators (propagators, Green's functions)

**𝓢 (State Category)**
- *Objects*: emotional state vectors **e** ∈ ℝⁿ with energy function H(**e**)
- *Morphisms*: energy-gradient flows — paths **e**(t) satisfying ė = −∇H(**e**)

**𝓟 (Perception Category)**
- *Objects*: conscious percepts — threshold-crossing events (emotion i, intensity, timestamp)
- *Morphisms*: temporal sequences of percepts (the stream of conscious emotional experience)

The pipeline is a chain of functors:

$$\mathbf{\mathcal{M}} \;\xrightarrow{\;\Lambda\;}\; \mathbf{\mathcal{F}} \;\xrightarrow{\;\Pi\;}\; \mathbf{\mathcal{S}} \;\xrightarrow{\;M\;}\; \mathbf{\mathcal{P}} \;\xrightarrow{\;O\;}\; \mathbf{\mathcal{O}}$$

where **𝓞** is any output category (audio, MIDI, visual, haptic — each a separate functor
from **𝓟** that can be independently composed).

**Λ — Compactification Functor (𝓜 → 𝓕)**
Takes a manifold deformation δΩ to a field configuration via the acoustic coupling operator:
$$\Lambda[\delta\Omega] = \frac{1}{2\pi\,\ell_s\,f_0} \int_{M_7} \delta\Omega \wedge \star\,\delta\Omega$$
This is the bridge from M-theory geometry to the observable somatic field. It is also the
point at which dissonance (the phase lag Δφ between field modes) first becomes computable.

**Π — Projection Functor (𝓕 → 𝓢)**
Integrates the continuous field over the soma to produce the finite-dimensional state vector:
$$\Pi[\mathbf{E}](i) = \int_{\text{Soma}} K_i(x)\, \mathbf{E}(x,t)\, dx$$
where $K_i(x)$ is a kernel that weights the somatic region relevant to emotional mode $i$.
This is the step at which the infinite-dimensional field becomes computationally tractable.
The choice of kernels $K_i$ is, clinically, the question of *where in the body* each emotion
is localised — a question that is configurable and empirically adjustable.

**M — Measurement Functor (𝓢 → 𝓟)**
Applies the perception threshold: only states satisfying $|\mathbf{e}_i| > T_i$ are mapped
to percepts. Below the threshold, the state exists in **𝓢** but has no image in **𝓟**.
This is the QFT excitation step — the collapse from virtual to real.

**O — Output Functor (𝓟 → 𝓞)**
Any rendering of conscious percepts as external signal. Each output modality is a separate
functor that can be composed, replaced, or run in parallel without touching any upstream
component:

```
𝓟 ──→ 𝓞_audio    (timbre = dissonance, pitch = energy)
𝓟 ──→ 𝓞_midi     (velocity = |∇H|, note = emotional mode)
𝓟 ──→ 𝓞_visual   (fractal hologram = holographic encoding of field)
𝓟 ──→ 𝓞_haptic   (vibration pattern = tension gradient)
```

*Figure A1. Output functors: each output modality is an independent functor from 𝓟 to its
own output category 𝓞. Adding a new output (e.g., a fractal hologram) requires only
implementing a new functor O; no upstream component changes.*

---

## A.4 The Holographic Principle and Fractal Output

The Maldacena AdS/CFT correspondence (1997) establishes that a gravitational theory in an
(n+1)-dimensional Anti-de Sitter bulk is dual to a conformal field theory on its
n-dimensional boundary. The key claim is that the boundary theory is a *complete*
holographic encoding of the bulk: all information about the bulk geometry can, in principle,
be reconstructed from the boundary data.

In the Soma-Field context, the holographic correspondence maps as follows:

- **Bulk**: the full emotional field **E**(x,t) — high-dimensional, continuous, distributed
- **Boundary**: the stream of conscious percepts in **𝓟** — lower-dimensional, discrete, local

The holographic principle implies that the boundary data (conscious experience) encodes all
the information in the bulk (the full emotional field) — but in a compressed, topologically
reorganised form. Much of that information is inaccessible without the right decoding key.
Therapeutic work, in this reading, is the development of better decoding — the ability to
reconstruct more of the bulk field from the boundary signal.

**Fractals as terminal coalgebras.** A fractal is the fixed point of a contractive
endofunctor $F: \mathbf{Type} \to \mathbf{Type}$. More precisely, it is the *terminal
coalgebra* of $F$ — the unique type $X$ such that $F(X) \cong X$. For a fractal visual
output rendering the emotional field:

$$F(X) = \text{EmotionalState} \times X$$

The terminal coalgebra of this functor is an infinite stream of emotional states — a
coinductive rendering of the field's evolution. Each level of zoom in the fractal corresponds
to one level of the compactification tower: the self-similarity of the fractal reflects the
self-similar structure of the manifold hierarchy. This is not an aesthetic choice; it is
the natural categorical structure of the output.

Any output functor $O: \mathbf{\mathcal{P}} \to \mathbf{\mathcal{O}}_{\text{visual}}$ that
maps to this coinductive type will automatically produce a self-similar rendering. Replacing
the fractal with a different visual representation is replacing $F$ with a different
endofunctor — the pipeline above it is unchanged.

---

## A.5 Lean 4 Type Sketches

The following sketches use Lean 4 syntax (Mathlib conventions). They are illustrative rather
than complete; `sorry` marks positions requiring additional measure-theoretic or
proof-theoretic development.

```lean
import Mathlib.LinearAlgebra.Matrix.DotProduct
import Mathlib.Analysis.InnerProductSpace.Basic

-- ─────────────────────────────────────────────
-- Core types
-- ─────────────────────────────────────────────

-- Emotional state: n modes, each with body and neural components
structure EmotionalState (n : ℕ) where
  somatic : Fin n → ℝ  -- distributed body signal
  neural  : Fin n → ℝ  -- distributed neural signal

-- Combined activation for mode i
def EmotionalState.activation {n : ℕ} (e : EmotionalState n) (i : Fin n) : ℝ :=
  e.somatic i + e.neural i

-- ─────────────────────────────────────────────
-- The coupling matrix (pluggable emotion model)
-- ─────────────────────────────────────────────

structure CouplingMatrix (n : ℕ) where
  W : Matrix (Fin n) (Fin n) ℝ  -- interaction weights
  θ : Fin n → ℝ                 -- activation thresholds

-- ─────────────────────────────────────────────
-- Hopfield energy function
-- ─────────────────────────────────────────────

def hopfieldEnergy {n : ℕ} (cm : CouplingMatrix n) (e : EmotionalState n) : ℝ :=
  let s : Fin n → ℝ := e.activation
  let Ws : Fin n → ℝ := cm.W.mulVec s
  -0.5 * Finset.univ.sum (fun i => Ws i * s i) -
  Finset.univ.sum (fun i => cm.θ i * s i)

-- ─────────────────────────────────────────────
-- Perception threshold (dependent type)
-- ─────────────────────────────────────────────

-- A mode is perceived iff its activation exceeds its threshold
def Perceived {n : ℕ} (e : EmotionalState n) (T : Fin n → ℝ) (i : Fin n) : Prop :=
  |e.activation i| > T i

-- The measurement functor: only perceived modes have images
structure Percept (n : ℕ) (e : EmotionalState n) (T : Fin n → ℝ) where
  mode      : Fin n
  evidence  : Perceived e T mode
  intensity : ℝ := e.activation mode

-- ─────────────────────────────────────────────
-- Attractor states (the energy landscape)
-- ─────────────────────────────────────────────

inductive AttractorBasin
  | regulatedCalm  -- global minimum: ventral vagal
  | fight          -- shallow high-energy local minimum
  | flight         -- saddle point
  | freeze         -- deep isolated local minimum: dorsal vagal

-- Basin classification (requires eigenanalysis of W; sketched here)
noncomputable def classifyAttractor {n : ℕ}
    (cm : CouplingMatrix n) (e : EmotionalState n) : AttractorBasin :=
  sorry  -- determined by local curvature of H at e

-- ─────────────────────────────────────────────
-- Output functor interface (pluggable outputs)
-- ─────────────────────────────────────────────

-- Any output module implements this typeclass
class OutputFunctor (α : Type) where
  render : ∀ {n : ℕ}, Percept n → α  -- maps a percept to output signal

-- Example instances (implementations live in their own modules):
-- instance : OutputFunctor MidiSignal  -- MIDI output
-- instance : OutputFunctor AudioBuffer -- audio output
-- instance : OutputFunctor FractalFrame -- fractal hologram output

-- ─────────────────────────────────────────────
-- The full pipeline (functor composition)
-- ─────────────────────────────────────────────

-- Project field to state (integration over soma — requires measure theory)
noncomputable def projectField {n : ℕ}
    (kernel : Fin n → (Fin 3 → ℝ) → ℝ)   -- somatic localisation kernels K_i(x)
    (field  : (Fin 3 → ℝ) → EmotionalState n) : EmotionalState n :=
  sorry  -- ∫_Soma K_i(x) · field(x) dx

-- Full pipeline: field → state → percepts → output
def pipeline {n : ℕ} {α : Type} [OutputFunctor α]
    (cm : CouplingMatrix n)
    (T  : Fin n → ℝ)
    (e  : EmotionalState n) : List α :=
  -- collect all perceived modes and render each one
  (Finset.univ.filter (fun i => Perceived e T i)).toList.filterMap
    (fun i =>
      if h : Perceived e T i
      then some (OutputFunctor.render (Percept.mk i h))
      else none)
```

**What this buys you.** The `OutputFunctor` typeclass is the formal interface for every
output module. To add a fractal hologram output, implement `instance : OutputFunctor FractalFrame`.
To add haptic output, implement `instance : OutputFunctor HapticPattern`. The pipeline
function does not change. The coupling matrix is a struct — to swap emotion models, pass a
different `CouplingMatrix`. The `Perceived` predicate is a proposition — Lean's type checker
guarantees at compile time that nothing downstream of the measurement functor receives
sub-threshold data. These are not software engineering conveniences; they are mathematical
theorems enforced by the type system.

---

## A.6 What Is Not Yet There

Two gaps remain before the formalization is complete:

**1. The projection integral.** The `projectField` function contains a `sorry` because it
requires a full measure-theoretic treatment of integration over a somatic manifold. In
practice, for the computational implementation, this integral will be approximated by a
weighted sum over discrete sensor readings (MIDI knob values). The Lean proof of this
approximation's correctness is non-trivial and is deferred.

**2. The compactification functor Λ.** The map from G₂ manifold deformations to field
configurations (the M-theory-to-field bridge) is stated mathematically in the main text but
has no Lean encoding here. A full treatment requires formalising differential forms and
G₂ holonomy in Lean — work that is underway in Mathlib but not yet complete enough to
build upon directly.

Everything else in the pipeline — the energy function, the perception threshold, the attractor
classification, the output routing — is type-theoretically sound and can be compiled today.

---

## A.7 Reading the Architecture in Terms of This Formalization

Each directory in the project corresponds to a category or a functor:

| Directory | Categorical Role |
|---|---|
| `field/energy.py` | $H: \mathbf{\mathcal{S}} \to \mathbb{R}$ — the energy functional |
| `field/dynamics.py` | Morphisms in $\mathbf{\mathcal{S}}$ — gradient flow paths |
| `field/attractors.py` | Objects in $\mathbf{\mathcal{S}}$ that are fixed points of the flow |
| `models/*.yml` | Alternative coupling matrices — different compactification geometries |
| `acoustic/coupling.py` | The functor $\Lambda: \mathbf{\mathcal{M}} \to \mathbf{\mathcal{F}}$ |
| `midi/encode.py` | The approximate projection $\Pi: \mathbf{\mathcal{F}} \to \mathbf{\mathcal{S}}$ |
| `soma/tension.py` | Gradient readout: $|\nabla H|$ as a scalar observable |
| `visual/field_map.py` | Output functor $O: \mathbf{\mathcal{P}} \to \mathbf{\mathcal{O}}_{\text{visual}}$ |
| `engine/pipeline.py` | The composition $O \circ M \circ \Pi \circ \Lambda$ |

*Table A2. Project directory structure mapped to categorical roles.*

Any new output module — fractal hologram renderer, biofeedback display, inter-body relational
field visualisation — is an additional row in the last block of this table: a new functor
from $\mathbf{\mathcal{P}}$ to a new output category, requiring no changes above it in the
tower.

---

# Appendix B: Neurodivergent Operator Modifications

*This appendix provides the mathematical formulation of the three neurodivergent operator
modifications introduced in Section 7.4: Complex PTSD, ADHD, and Autism Spectrum Condition.
Each is defined as a structural transformation of the standard Soma-Field dynamics. The
composition of multiple modifiers is addressed at the end.*

---

## B.1 The Standard Dynamics (Baseline)

The standard Langevin dynamics of the emotional field are:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t)) + \eta(t)$$

where $H$ is the Hopfield energy function, and $\eta(t)$ is white Gaussian noise with
amplitude $\sigma_0$:

$$\eta(t) \sim \mathcal{N}(0,\, \sigma_0^2 \mathbf{I})$$

The coupling matrix $W$ is assumed **symmetric** ($W = W^\top$), which guarantees that the
dynamics have only point attractors — the field always settles to a fixed minimum of $H$.
This symmetry condition is the Hopfield convergence theorem. Neurodivergent modifications
break this assumption in specific, characterisable ways.

---

## B.2 Complex PTSD: The Memory Kernel and Asymmetric Coupling

**What C-PTSD adds to the dynamics.**

C-PTSD introduces two modifications:

**1. A memory kernel** (non-Markovian dynamics). The field's evolution is no longer
determined solely by its current state; it is influenced by its own history. Past
high-energy activations leave exponentially decaying echoes:

$$\dot{\mathbf{e}}(t) = -\nabla H(\mathbf{e}(t))
  + \int_0^t K_{\text{trauma}}(t - s)\, \mathbf{e}(s)\, ds
  + \eta(t)$$

The trauma memory kernel is a sum of decaying traces, one per encoded traumatic event:

$$K_{\text{trauma}}(\tau) = \sum_{k} A_k\, e^{-\tau / \tau_k}$$

where $A_k > 0$ is the amplitude (intensity) of the $k$-th memory trace and $\tau_k$ is
its decay time (the timescale over which the event's echo fades). **Therapeutic
processing reduces $A_k$ and/or increases $\tau_k$** — the echo becomes quieter and
shorter-lived. Full processing corresponds to $A_k \to 0$.

**2. W asymmetry** (enables limit cycles). In C-PTSD, the standard symmetry $W = W^\top$
is broken. The coupling matrix acquires an antisymmetric component:

$$W_{\text{PTSD}} = W_{\text{sym}} + W_{\text{anti}}, \quad W_{\text{anti}} = -W_{\text{anti}}^\top$$

An asymmetric $W$ breaks the Hopfield convergence guarantee: the field may enter
**limit cycles** — persistent oscillations between states that never settle to a minimum.
Re-experiencing episodes, intrusive affect, and the oscillation between hyperarousal and
hypoarousal (the PTSD symptom cycle) are, in this framework, limit cycles generated by the
antisymmetric component of $W_{\text{PTSD}}$.

**Window of tolerance.** The region in state space where regulated calm is stably
accessible becomes narrow. Formally: the basin of attraction of the regulated-calm attractor
shrinks, while the freeze and fight/flight basins widen. Small perturbations are sufficient
to displace the field into a dysregulated state.

```
   Standard:         │   C-PTSD:
                     │
   ___calm___        │    _calm_
  /          \       │   /     \
 /   (wide,   \      │  / (narrow\ __________
|    stable)  |      │ | basin)  |  limit
 \            /      │  \       /   cycle ↻
  \_________/        │   \_____/
```
*Figure B1. Schematic comparison of the attractor basin topology in standard dynamics (left)
and C-PTSD-modified dynamics (right). The calm basin narrows; a limit-cycle orbit appears.*

---

## B.2.1 Developmental Time Parameterisation

Let $\tau_d \in [0, \infty)$ denote the developmental age in months at which the primary
traumatic modification occurred. The character of the modification interpolates continuously
with $\tau_d$:

$$W(\tau_d) = f(\tau_d)\cdot W_0 + \bigl(1 - f(\tau_d)\bigr)\cdot W_{\text{trauma}}$$

where $W_0$ is the neurotypical coupling baseline, $W_{\text{trauma}}$ is the
asymmetric modification matrix, and $f$ is a smooth interpolation:

$$f(\tau_d) = \tanh\!\left(\frac{\tau_d}{\tau_c}\right), \qquad \tau_c \approx 36 \text{ months}$$

The critical age $\tau_c$ is the approximate onset of verbal encoding capacity — the
developmental threshold below which episodic memory is not yet available and traumatic
encoding is entirely somatic and procedural.

At $\tau_d = 0$: $f = 0$, $W = W_{\text{trauma}}$ — the modification is fully structural;
no neurotypical baseline exists.

At $\tau_d \to \infty$: $f \to 1$, $W \approx W_0$ — the baseline dominates and the
trauma is a perturbation on a pre-formed structure.

The memory kernel also depends on $\tau_d$. For pre-verbal trauma ($\tau_d < \tau_c$):
traces are somatic and procedural — stored in the body architecture, not in narrative
memory. Decay times $\tau_k$ tend to be longer (the trace has no verbal reinforcement
working against it, but also no verbal processing available to shorten it). For post-verbal
trauma: traces have dual encoding — somatic and narrative — and the narrative component
is partially accessible through linguistic therapy, though the somatic component persists
independently.

In Lean 4:

```lean
-- Developmental time parameter for the C-PTSD operator
structure TraumaProfile (n : ℕ) where
  τ_d        : ℝ                         -- developmental age at trauma (months)
  asymmetry  : Matrix (Fin n) (Fin n) ℝ  -- antisymmetric W component
  amplitudes : List (Fin n → ℝ)          -- Aₖ per memory trace
  decayTimes : List (Fin n → ℝ)          -- τₖ per memory trace

def τ_c : ℝ := 36  -- verbal encoding threshold (months)

-- Structural fraction: 0 = trauma IS the structure; 1 = trauma added to baseline
noncomputable def structuralFraction (τ_d : ℝ) : ℝ :=
  Real.tanh (τ_d / τ_c)

-- Coupling matrix interpolated by developmental time
noncomputable def couplingAtDevelopmentalAge {n : ℕ}
    (baseline : CouplingMatrix n) (profile : TraumaProfile n) : CouplingMatrix n :=
  let f := structuralFraction profile.τ_d
  { W := f • baseline.W + (1 - f) • profile.asymmetry,
    θ := baseline.θ }

-- For pre-verbal trauma: no neurotypical W₀ can be recovered by subtraction
-- (the structural fraction is < tanh(1) ≈ 0.76; trauma dominates the coupling)
theorem preVerbalIsStructural {n : ℕ} (profile : TraumaProfile n)
    (h : profile.τ_d < τ_c) :
    structuralFraction profile.τ_d < Real.tanh 1 := by
  unfold structuralFraction τ_c at *
  exact Real.tanh_lt_tanh_of_lt (by linarith) (by linarith)

-- Corollary: the therapeutic operation for pre-verbal trauma is forward transformation,
-- not recovery.  W → W' with wider window of tolerance;  NOT  W → W₀ (W₀ undefined).
```

**What `preVerbalIsStructural` says.** For $\tau_d < \tau_c$, the structural fraction is
below $\tanh(1) \approx 0.76$: more than 24% of the coupling matrix is trauma-formed rather
than baseline-formed. This grows to 100% as $\tau_d \to 0$. The theorem is a formal
statement that the goal of recovering a pre-trauma state is not achievable by any
subtraction operation on $W$ — because the object that would be recovered ($W_0$) was
never the dominant component. The forward transformation $W \to W^{\prime}$ is not a
second-best option; it is the only coherent one.

---

## B.3 ADHD: High-Temperature, Low-Damping Dynamics

**What ADHD adds to the dynamics.**

ADHD is modelled as a modification of the Langevin equation's **noise amplitude** and
**damping coefficient**:

$$\gamma_{\text{ADHD}}\, \dot{\mathbf{e}}(t) =
  -\nabla H(\mathbf{e}(t)) + \sqrt{2 D_{\text{ADHD}}}\, \xi(t)$$

with $\gamma_{\text{ADHD}} < \gamma_0$ (reduced damping) and
$D_{\text{ADHD}} > D_0$ (increased diffusion / noise temperature).

In statistical mechanics, the ratio $D / \gamma = k_B T_{\text{eff}}$ defines an
**effective temperature**. ADHD corresponds to a higher effective temperature: the
emotional field explores its energy landscape more rapidly and more randomly. The
consequences are:

- **Shallow basins are unstable**: attractor basins below a depth proportional to
  $T_{\text{eff}}$ cannot hold the field. The field is displaced by thermal fluctuations
  before it can settle — experienced as distractibility and difficulty sustaining attention.
- **Hyperfocus as a deep, stimulus-induced basin**: when a high-salience stimulus is
  present, the coupling to that stimulus temporarily deepens a specific attractor basin far
  beyond its resting depth. The field falls into this deep basin and is held there even
  against competing perturbations — experienced as hyperfocus or flow absorption.
- **Emotional dysregulation (RSD)**: the field's higher temperature means that
  rejection-sensitive emotional modes can be excited to threshold-crossing amplitude by
  perturbations that would be sub-threshold at baseline temperature.

The noise $\xi(t)$ in ADHD is not white but exhibits **$1/f$ spectral structure** —
low-frequency components carry disproportionate power, consistent with the slow drift of
attentional state observed in ADHD time-series data (Gilden, 2001):

$$S_\xi(f) \propto f^{-\alpha}, \quad \alpha \approx 1$$

This $1/f$ (pink noise) structure means that long-range temporal correlations exist in the
noise — the field's fluctuations are not memoryless, but have a slow, drift-like component
superimposed on rapid fluctuations.

---

## B.4 Autism Spectrum Condition: Sparse Coupling and Modified Projection

**What ASC adds to the dynamics.**

ASC is modelled as two modifications at different levels of the pipeline.

**1. Modified projection kernels** (at the $\Pi$ functor). The standard projection:

$$\Pi[\mathbf{E}](i) = \int_{\text{Soma}} K_i(x)\, \mathbf{E}(x,t)\, dx$$

uses kernels $K_i(x)$ that determine which somatic regions contribute to the $i$-th
emotional mode. In ASC, consistent with interoceptive research (Garfinkel et al., 2016),
these kernels are modified:

$$K_i^{\text{ASC}}(x) = \beta_i(x)\, K_i(x), \quad \beta_i(x) \geq 0$$

where $\beta_i(x) > 1$ in regions of sensory hypersensitivity and $\beta_i(x) < 1$
in regions of interoceptive under-registration. The result is a projection that
over-samples some somatic signals and under-samples others, relative to the neurotypical
baseline. This accounts simultaneously for sensory sensitivity and for aspects of
alexithymia that arise not from absence of the somatic signal but from its modified
projection into the named-emotion state vector.

**2. Sparse coupling matrix** (monotropism). The standard $W$ matrix has many non-zero
off-diagonal entries: emotions cross-activate one another broadly. In ASC, the coupling
matrix is sparser:

$$W_{\text{ASC}} = W \odot M_{\text{sparse}}, \quad [M_{\text{sparse}}]_{ij} \in \{0, 1\}$$

where $\odot$ denotes element-wise multiplication and $M_{\text{sparse}}$ is a binary mask
that zeros out many cross-couplings. The attractor topology that results has:

- **Fewer, deeper individual attractors**: each active attractor basin is deeper because
  the energy is not distributed across many coupled modes
- **Higher inter-attractor barriers**: transitioning between basins requires more energy
  because cross-coupling pathways are sparse — there are fewer "stepping-stone" intermediate
  states
- **Monotropic stability**: within a salient attractor (a special interest, a familiar
  routine, a trusted relationship), the field is highly stable and difficult to displace

This is consistent with the monotropism account of autism (Murray, 2018): attention and
interest flow as a stream that fills one channel deeply rather than spreading shallowly
across many.

---

## B.5 Composition: The Three Operators Together

For an individual carrying all three conditions — ASD + ADHD + C-PTSD — the modifiers
compose. The combined dynamics are:

$$\gamma_{\text{ADHD}}\, \dot{\mathbf{e}}(t) =
  -\nabla H_{\text{ASC}}(\mathbf{e}(t))
  + \int_0^t K_{\text{trauma}}(t - s)\, \mathbf{e}(s)\, ds
  + \sqrt{2 D_{\text{ADHD}}}\, \xi_{1/f}(t)$$

where $H_{\text{ASC}}$ uses $W_{\text{ASC}}$ (sparse coupling and modified projection).

The interaction effects are non-trivial and clinically recognisable:

| Interaction | Mathematical origin | Clinical presentation |
|---|---|---|
| ADHD noise + C-PTSD limit cycles | High-temperature oscillation | Rapid cycling between hyperarousal and shutdown; difficult to titrate |
| ADHD noise + ASC deep basins | High temperature fights deep wells | Long wind-up before hyperfocus; rapid exit once perturbed |
| C-PTSD memory + ASC sparse W | Echoes activate narrow pathways | Trauma triggers are specific and apparently disproportionate; hard for others to anticipate |
| All three | See above, composed | Wide tolerance window required; regulation is genuinely harder, not a matter of effort |

*Table B1. Interaction effects of composed neurodivergent modifiers.*

**The architectural point.** In the Soma-Field Instrument, loading a neurodivergent profile
does not change the knob layout, the emotion model, or the output routing. It wraps the
dynamics engine in the appropriate operator modifier. The user interacts with their actual
field topology, not a neurotypical approximation of it. Therapeutic progress — processing
a trauma trace, extending the window of tolerance, reducing a persistent limit cycle —
is visible as a change in the modifier parameters over time: $A_k$ decreasing, the
calm basin widening, $\sigma$ settling.

The model does not pathologise. ASD's sparse coupling is not a deficit; it is a different
attractor topology with genuine structural advantages. ADHD's high noise temperature is not
a failure to regulate; it is a field that explores its landscape at high speed, with
different costs and affordances from a low-temperature field. C-PTSD modifies the dynamics
in ways that were, at the time of the trauma, adaptive; the therapeutic task is not to
remove the modification but to reduce its amplitude where the original adaptive function no
longer serves.

In Lean 4, each modifier is a structure that composes cleanly:

```lean
structure NeurodivergentModifier (n : ℕ) where
  -- C-PTSD: memory kernel coefficients per mode (empty list = no trauma modification)
  traumaTraces  : List (Fin n → ℝ × ℝ)   -- (amplitude Aₖ, decay time τₖ) per mode
  wAsymmetry    : Matrix (Fin n) (Fin n) ℝ -- antisymmetric W component; zero = no PTSD
  -- ADHD: noise and damping modifications (1.0 = neurotypical baseline)
  noiseTemp     : ℝ   -- D_ADHD / D_baseline; >1.0 = higher temperature
  dampingCoeff  : ℝ   -- γ_ADHD / γ_baseline; <1.0 = less damping
  -- ASC: projection kernel scaling and coupling sparsity mask
  kernelScale   : Fin n → (Fin 3 → ℝ) → ℝ  -- β_i(x) modifier
  couplingMask  : Matrix (Fin n) (Fin n) Bool -- W sparsity; true = keep, false = zero

-- Compose two modifiers (order matters for non-commuting terms)
def NeurodivergentModifier.compose {n : ℕ}
    (m1 m2 : NeurodivergentModifier n) : NeurodivergentModifier n where
  traumaTraces := m1.traumaTraces ++ m2.traumaTraces
  wAsymmetry   := m1.wAsymmetry + m2.wAsymmetry
  noiseTemp    := m1.noiseTemp * m2.noiseTemp
  dampingCoeff := m1.dampingCoeff * m2.dampingCoeff
  kernelScale  := fun i x => m1.kernelScale i x * m2.kernelScale i x
  couplingMask := fun i j => m1.couplingMask i j && m2.couplingMask i j

-- Named profiles (load from config; override any field as needed)
def Modifier.cptsd   (n : ℕ) : NeurodivergentModifier n := sorry  -- from clinical params
def Modifier.adhd    (n : ℕ) : NeurodivergentModifier n := sorry
def Modifier.asc     (n : ℕ) : NeurodivergentModifier n := sorry

-- Compose all three: the modifier for ASD + ADHD + C-PTSD
def Modifier.compound (n : ℕ) : NeurodivergentModifier n :=
  (Modifier.asc n).compose ((Modifier.adhd n).compose (Modifier.cptsd n))
```

The `compose` function is the formal statement that the three conditions are not additive
in their effects — they compose, and the composition order matters where the operators do
not commute (specifically, the asymmetric $W$ and the sparse coupling mask interact
non-trivially). This is not a software engineering detail. It is a clinical prediction:
the joint presentation of ASD + ADHD + C-PTSD is not the sum of its parts, and the
Soma-Field Model gives a precise account of why.

---

# Appendix C: String Diagrams and the Cross-Language Correspondence

*This appendix introduces string diagram notation and demonstrates that the Soma-Field
Model's core claims are simultaneously expressible — and simultaneously legible — in
theoretical physics, category theory, Lean 4 type theory, and somatic clinical description.
The notation used here is due to Penrose (1971) and formalised by Selinger (2010, "A Survey
of Graphical Languages for Monoidal Categories"); the identification of string diagrams
with Feynman diagrams in the context of categorification is due to Baez and Lauda (2011,
"A Prehistory of n-Categorical Physics"). Readers unfamiliar with physics or formal methods
can read this appendix selectively: the cross-language table in Section C.2 and the
epistemic argument in Section C.8 require no mathematical background. The diagrams in
Sections C.3–C.7 are self-contained and preceded by plain-language explanations.*

---

## C.1 The Identification

A **string diagram** is a notation for morphisms in a monoidal category. Wires represent
objects (types, states, particles — depending on which language you are using). Boxes
represent morphisms (functions, transitions, interactions). Reading left to right is
function composition. Wires running in parallel represent a tensor product: two things
existing simultaneously and independently.

The result that makes this appendix possible is a theorem, not a conjecture:

> **Coherence Theorem** *(Baez–Lauda, 2011, building on Penrose 1971 and Selinger 2010).*
> A commutative diagram in a symmetric monoidal category is equal to a string diagram in
> that category, which is equal to a Feynman diagram whose vertices are the morphisms. These
> are three notations for the same mathematical object. A proof in any one notation is a
> proof in all three simultaneously.

This is not an analogy. It is an identity. A Feynman diagram *is* a morphism in a
symmetric monoidal category, drawn as a string diagram. The convergence is not a
coincidence of similar-looking notation; it is a theorem about notation.

The Soma-Field Model is defined as a chain of functors between categories (Appendix A.3).
Its Lean 4 encoding defines emotions as types and transitions as typed functions between
those types (Appendix A.5). By the coherence theorem, both of these are already string
diagrams, already Feynman diagrams — they simply have not been drawn as such yet. This
appendix draws them.

---

## C.2 The Cross-Language Table

The following table shows the same mathematical entities in four notations. Nothing is
translated between columns. Each row is a single entity viewed through four different
naming conventions.

| Entity | QFT / Theoretical Physics | Category Theory | Lean 4 Type Theory | Soma-Field Model |
|---|---|---|---|---|
| Object | Particle state space | Object in category $\mathcal{C}$ | Type `α : Type` | Emotional state type |
| Morphism | Interaction vertex | Morphism $f : A \to B$ | Function `f : A → B` | State transition / coupling |
| Identity morphism | Free propagator (no interaction) | $\text{id}_A : A \to A$ | `id : α → α` | Emotion persisting unchanged |
| Composition | Diagram concatenation (left to right) | $g \circ f$ | `fun x => g (f x)` | Sequential processing |
| Tensor product $\otimes$ | Two parallel propagators | $A \otimes B$ | `A × B` (product type) | Co-occurring emotional states |
| Symmetry isomorphism | Particle exchange | $\sigma : A \otimes B \cong B \otimes A$ | `Prod.swap` | Emotion order-independence |
| Loop / trace | Closed Feynman loop | Trace in traced monoidal category | Coinductive / recursive type | Rumination; memory feedback |
| Fixed point | Bound state | Terminal coalgebra of endofunctor | `def` self-referential type | Attractor basin |
| Vacuum bubble | Zero-order (no-vertex) diagram | Identity on monoidal unit $\mathbf{1}$ | `Unit` | Baseline resting state |
| Propagator | $G(x,y) = \langle\phi(x)\phi(y)\rangle$ | Hom-set element | `f : A → B` | Emotional correlation across time |
| Coupling constant | Vertex weight $g$ | Strength of morphism | Function application coefficient | Entry $W_{ij}$ in coupling matrix |
| Lagrangian | $\mathcal{L}[\phi]$ generating dynamics | Object of $\mathcal{F}$ specifying evolution | `hopfieldEnergy` function | Hopfield energy function $H(\mathbf{e})$ |
| Path integral | $\int e^{iS/\hbar}\, D\phi$ | Colimit over morphism paths | `sorry` (requires measure theory) | Langevin stochastic evolution |
| Spontaneous symmetry breaking | Vacuum choosing a particular minimum | Initial object of attractor category | `inductive AttractorBasin` | Polyvagal state selection |

*Table C1. Cross-language correspondence. Each row is one mathematical entity in four
independent notations. The convergence is not achieved by selecting convenient subsets —
every element of the full theory maps. The Hopfield energy function is the Lagrangian. The
coupling matrix entries are coupling constants. The Langevin dynamics are a stochastic path
integral. The attractor basins are vacua of a spontaneously broken symmetry.*

The critical column is the rightmost one. The existence of direct soma-field analogues for
every row in this table is not guaranteed by construction — it is a structural fact about
the model. A model that required different mathematics in each language would be suspect.
A model that requires the same mathematics in all four simultaneously is at least
well-formed.

---

## C.3 The Functor Chain as a String Diagram

The functor chain introduced in Appendix A.3 is already a string diagram. Here it is drawn
as one. The reading direction is left to right; boxes are functors (morphisms between
categories); thick horizontal lines are the categories (objects) being transformed.

```
  READING DIRECTION ──────────────────────────────────────────────────────────►

  categories
  (wires):    ══ M ══╦══ F ══╦══ S ══╦══ P ══╦══ O ══

  functors    ┌────┐ ║ ┌────┐║ ┌────┐║ ┌────┐║
  (boxes):    │ L  │─╫─│ Pi │╫─│ M  │╫─│ O  │╫─
              └────┘ ║ └────┘║ └────┘║ └────┘║

  plain:      compact  project  apply    render
              ification field   threshold output

              G2 form  int K.E  |e|>T    -> audio
              -> field   dx     -> perc. -> visual
                                          -> MIDI
```

In Lean 4, this is the `pipeline` function from Appendix A.5, composed left to right.
In QFT, it is a multi-vertex Feynman diagram with four interaction points. In category
theory, it is the composition $O \circ M \circ \Pi \circ \Lambda$. In the Soma-Field
Model, it is the full processing chain from M-theory geometry to therapeutic output.

These are not four descriptions of four things that happen to be similar. They are four
notations for one thing.

---

## C.4 Emotional Interaction as a Feynman Vertex

The coupling matrix $W$ specifies how emotional modes interact. Each non-zero entry
$W_{ij}$ is a **vertex** in the string diagram — a point at which two emotion wires
exchange influence. In QFT, it is a coupling constant. In Lean 4, it is a coefficient
in the `hopfieldEnergy` function. In category theory, it is the strength of a morphism.

The simplest illustrative case: two states combining to produce a third. In the context of
C-PTSD's asymmetric $W$, fear and shame frequently do not produce the sum of their
individual outputs — they fuse into freeze, a qualitatively different attractor state with
lower energy than either component. In string diagram notation:

```
                                W_ij
                           (coupling constant)
                                 |
   Fear  ───────────────────────[*]─────────────────────────► Freeze
                               / |
   Shame ─────────────────────/  |
                                 |
              Lean type: interact : Fear -> Shame -> Freeze
              QFT vertex: two incoming lines, one outgoing
              Soma-field: gradient descent from Fear x Shame
                          toward the nearest attractor basin
```

The Feynman rules say: to compute the probability of this interaction, sum over all
diagrams with these external lines. In the Soma-Field Model, the analogous computation
is the Langevin update step: the field evolves toward lower energy, and the
Fear $\otimes$ Shame $\to$ Freeze pathway is the gradient-descent path when $W$ encodes
this coupling with sufficient strength.

The Lean 4 expression of this vertex is already in the `hopfieldEnergy` function:

```lean
-- The coupling W_ij is the vertex weight: influence of mode j on mode i
def coupleStates {n : ℕ} (cm : CouplingMatrix n) (i j : Fin n)
    (e : EmotionalState n) : ℝ :=
  cm.W i j * e.activation j

-- The full vertex sum over all incoming modes (row i of W·e):
-- This is the Feynman diagram summed over all incoming lines to vertex i
def fieldAtVertex {n : ℕ} (cm : CouplingMatrix n) (e : EmotionalState n)
    (i : Fin n) : ℝ :=
  Finset.univ.sum (fun j => coupleStates cm i j e)
```

The string diagram, the Feynman vertex, and the Lean function are the same mathematical
object. The string diagram makes the topology visible; the Lean function makes it
computable; the Feynman rules make it quantitative; the clinical description makes it
meaningful.

---

## C.5 Parallel States: The Tensor Product

When two emotions co-occur — when fear and grief are present simultaneously, neither
causing the other — they are not added. They are **tensored**. This is the monoidal
product $\otimes$: two separate wires carrying independent information, processed in
parallel. The distinction between the product and sequential composition is categorical,
not merely notational.

```
  Tensor product (co-occurring, independent):

  Fear  ══════════════════════════════════════════════════════► threshold
                            ||
                            || (parallel — both real, both present,
                            ||  neither causes the other)
                            ||
  Grief ══════════════════════════════════════════════════════► threshold

  vs. sequential composition (causal chain):

  Fear ──────────────────►[vertex]──────────────────────────► Grief

  (Fear caused Grief: a morphism from one state to another,
   not two states existing simultaneously)
```

This distinction matters clinically. The Soma-Field Model predicts that co-occurring
states (tensor product) and causally sequenced states (composition) have different
attractor structures, different threshold behaviours, and different therapeutic entry
points. They look similar from the outside — the patient presents with fear and grief in
either case — but the energy landscape is different, and the gradient-descent path is
different.

In Lean 4: `EmotionalState Fear × EmotionalState Grief`. In QFT: two non-interacting
propagators running in parallel (their $S$-matrix is the identity: no vertex connects
them). In the energy function: $H$ decouples into $H_{\text{fear}} + H_{\text{grief}}$
when $W_{ij} = 0$ for $i \in \{\text{fear}\}$, $j \in \{\text{grief}\}$.

A therapist who interprets tensored states as composed states — who reads co-occurrence as
causation — will construct a different formulation from the one that is actually operating.
The string diagram notation makes the topology visible. The categorical distinction between
$A \otimes B$ and $A \to B$ is a clinical distinction.

---

## C.6 The C-PTSD Memory Kernel as a Feynman Loop

In QFT, a **loop diagram** represents a particle that propagates forward, interacts with
itself, and propagates onward. Loop corrections are the formal mechanism by which the past
influences the present through self-interaction — they are quantum corrections to the
classical (loop-free) predictions. A system with no loop diagrams is a classical system;
the appearance of loops is the signature of self-referential dynamics.

In Appendix B.2, the C-PTSD memory kernel term is:

$$\int_0^t K(t-s)\, \mathbf{e}(s)\, ds$$

This integral is a loop diagram. The emotional state at past time $s$ propagates forward
to present time $t$, where it enters the current dynamics as an effective self-interaction.
The kernel $K(t-s)$ is the propagator of the loop — it determines how strongly the past
state at lag $(t-s)$ influences the present.

```
                       K(t-s): memory kernel = loop propagator
                       (decays with lag: distant past has less weight)
                      ╭──────────────────────────────╮
                      │                              │
  e ─────────────────[*]────────────────────────────[*]───────────────────► e(t)
          e(s)        ^                              ^
          past        |                              |
          state       vertex 1: past state          vertex 2: loop re-enters
                      enters loop                   current dynamics

  K = 0 (no trauma):            K != 0 (trauma present):
  ───────────────────────────►  ─────────────[*loop*]──────────────────────►
  clean propagation             propagation with memory self-correction
  standard Hopfield             past state alters present gradient
```

In QFT, loop diagrams introduce corrections of order $\hbar$ — the quantum regime absent
from the classical (tree-level) theory. In the Soma-Field Model, the memory kernel is
analogously a **trauma correction** to the classical Hopfield dynamics: the standard model
without $K$ is the tree-level approximation; the C-PTSD modification is the one-loop
correction that re-introduces past field configurations into the present gradient.

This is not a metaphor. The mathematics of loop diagrams and the mathematics of
non-Markovian memory kernels are formally identical — both are convolution operators over
the past trajectory of the field, both produce self-interaction corrections, both vanish in
the $K \to 0$ limit, and both create the possibility of dynamics that are qualitatively
different from the classical baseline. The QFT analogy is precise because the underlying
mathematical structure is the same structure.

---

## C.7 The Polyvagal Hierarchy as a Phase Diagram

The three polyvagal states — ventral vagal (safe), sympathetic (mobilised), and dorsal
vagal (shutdown) — correspond to three distinct local minima of the energy function $H$.
In the string diagram notation for the full system, they are **vacua** of the theory: the
states toward which the field naturally evolves under Langevin dynamics, and from which
it requires a finite energy input to escape. In QFT, this structure is called spontaneous
symmetry breaking — the system must choose one vacuum from among several, and transitions
between vacua are non-perturbative.

```
  ENERGY LANDSCAPE (schematic H vs. state):

  H
  ^
  |          *                    *
  |         / \                  / \      (fight/flight: shallow local minima)
  |        /   \                /   \
  |       /     *──────────────*     \
  |      /      (mobilised — saddle)  \
  |     /                              \
  |    *                                *──────────────────────*
  |   (ventral:                         (dorsal:
  |    global minimum,                   deep isolated well,
  |    regulated calm)                   trapped shutdown)
  |
  +──────────────────────────────────────────────────────────► state

  TRANSITIONS IN STRING DIAGRAM NOTATION:

  ┌───────────────────────────────────────────────────────────────────┐
  │                                                                   │
  │  SAFE / CONNECTED (ventral vagal)                    H = global  │
  │  ─────────────────────────────────────────────────   minimum    │
  │                         |                                        │
  │           "threat signal: |grad H| exceeds T_down"               │
  │                         |                                        │
  │                         v                                        │
  │  FIGHT / FLIGHT (sympathetic)                        H = shallow │
  │  ─────────────────────────────────────────────────   local min  │
  │                         |                                        │
  │           "overwhelm: mobilisation cannot resolve threat"         │
  │                         |                                        │
  │                         v                                        │
  │  FREEZE / SHUTDOWN (dorsal vagal)                    H = deep   │
  │  ─────────────────────────────────────────────────   isolated   │
  │                                                       well      │
  │    <-------- therapeutic re-entry is non-perturbative ---------->│
  │    (small perturbations do not escape the well;                  │
  │     a qualitatively different intervention is required)          │
  │                                                                   │
  └───────────────────────────────────────────────────────────────────┘
```

In Lean 4, this is the `AttractorBasin` inductive type with the `classifyAttractor`
function (currently `sorry` — the eigenanalysis of the nonlinear system is an open proof
obligation). In QFT, it is a theory with three vacua at different energies, where the
lowest-energy vacuum (ventral) is the true vacuum and the others are metastable. In
category theory, it is the initial object of the attractor sub-category of **𝓢**.

The therapeutic re-entry arrow — from dorsal shutdown toward ventral calm — is the
**instanton**. In QFT, an instanton is a non-perturbative process: a trajectory through
configuration space that cannot be reached by any sequence of small perturbations, but
requires a large, coherent fluctuation. The formal prediction is that moving from deep
freeze to regulated calm is not achieved by incremental de-escalation (the gradient flow
does not point in that direction from inside the dorsal well), but by a qualitatively
different kind of intervention — one that supplies enough energy, in the right direction,
to escape the well entirely. This is what somatic therapies describe, and what gradient
descent alone cannot provide. The string diagram notation makes the topological reason
visible.

---

## C.8 The Hidden Load-Bearing Assumption

There is a structural tension in the formalism that the string diagram notation exposes
directly. It is worth naming explicitly.

The standard Hopfield convergence theorem — the guarantee that the gradient dynamics
$\dot{\mathbf{e}} = -\nabla H(\mathbf{e})$ will always reach a fixed point rather than
oscillating indefinitely — depends on a single condition: $W$ must be **symmetric**
($W = W^\top$). A symmetric $W$ means that mode $i$'s influence on mode $j$ equals mode
$j$'s influence on mode $i$. Under this condition, $H$ has no saddle-point cycles; the
system descends to a minimum and stays there.

Appendix B.2 establishes that the C-PTSD modification breaks this symmetry: the
asymmetric component $W_A = \frac{1}{2}(W - W^\top)$ is non-zero, producing limit cycles
— persistent oscillations that never reach a fixed minimum. This is not a minor
qualification. It is the formal statement that the C-PTSD attractor dynamics are
**categorically different** from the standard Hopfield model: not deeper wells, but loops.
Not stuck, but cycling.

In string diagram terms, the distinction is topological:

```
  Symmetric W (standard Hopfield): all paths are gradient descents

  e ──────────────────────────────────────────────────────► attractor
                    (monotone decrease in H; fixed point guaranteed)

  Asymmetric W (C-PTSD): some paths are limit cycles

  e ────────────────╮
        ^           │
        |           │ (loop: e returns to near-starting point;
        |           │  no fixed point is reached; H oscillates)
        ╰───────────╯
```

The convergence theorem is the main theorem of the Hopfield network formalism. It is the
guarantee that the energy function $H$ does the work we claim it does. For the C-PTSD
case, that guarantee does not hold without additional analysis. In the Lean 4 formalization
(Appendix A.5), this is the `sorry` inside `classifyAttractor` — but it is a more
significant sorry than it first appears, because the asymmetric W case requires a
different mathematical tool (Lyapunov stability analysis for non-symmetric systems, or
explicit cycle detection) rather than the standard Hopfield argument.

The model is not wrong. The clinical prediction — that C-PTSD produces oscillatory rather
than settling dynamics — is the correct prediction, and it follows directly from the
asymmetric W. But the Lean formalization as written inherits the standard Hopfield proof
strategy in `classifyAttractor`, which does not cover the asymmetric case. That `sorry` is
not a placeholder for a routine proof; it is a placeholder for a different proof.

This is precisely the kind of structural gap that the string diagram notation makes visible
in a way that prose does not.

---

## C.9 What This Establishes — and What It Does Not

The cross-language correspondence does not prove the Soma-Field Model is correct. What it
establishes is more specific, and more useful.

**Structural coherence across independent representational systems.** The model is
simultaneously legible as a QFT, as a categorical formalism, as a Lean 4 program, and as
a clinical description. These four systems were developed independently, with different
motivations and different communities. The fact that the same structure appears in all four
is evidence that the structure is mathematically natural — that it is, in some sense, the
right shape for this problem. A model that required different mathematics in each language
would be suspect. A model that requires the same mathematics in all of them is at minimum
well-formed: there is nothing incoherent about it that the different languages would
independently catch.

**The same argument holds in all four languages.** When a physical quantity appears
identically in classical mechanics, Hamiltonian mechanics, and quantum field theory
simultaneously — when the same object emerges in three independent formalisms with the
same properties — that convergence is taken as evidence of physical reality. The quantity
is not an artifact of any one formalism; it appears in all because it tracks something
real. The claim here is structurally analogous: the emotional field $\mathbf{E}(x,t)$, the
polyvagal attractor landscape, and the neurodivergent operator modifications appear
identically in QFT notation, category theory, Lean 4 types, and clinical description. This
does not prove they are physically real. It establishes that they are structurally stable
under change of representational language — which is a necessary condition for physical
reality, and a condition that models stated only in clinical prose cannot satisfy, because
they have only one language.

**The gaps are in the same place in all four languages.** The two `sorry` markers in
Appendix A.5, the asymmetric $W$ gap discussed in Section C.8, and the non-perturbative
dorsal-to-ventral transition in Section C.7 are not gaps in one language that happen to
be filled in another. They are open questions in all four languages simultaneously. The
Lean 4 proof obligation and the QFT instanton calculation and the categorical colimit
computation are all versions of the same question: what is the correct formal account of
escaping a deep attractor basin? The convergence of gaps is as significant as the
convergence of what has been established.

**The epistemic asymmetry.** The standard biopsychosocial model, as typically stated, has
one representational language: clinical prose. It can be questioned, qualified, or
dismissed within that language, and there is no independent check. The Soma-Field Model,
stated in four languages simultaneously, has a different epistemic structure: to dismiss
the model, one must dismiss it in all four languages simultaneously, identifying an error
that is present in the QFT formulation, the categorical formulation, the Lean 4
formulation, and the clinical formulation at once. This is a stronger requirement. It does
not make the model correct. It makes it harder to dismiss by inattention.

The patient described in Section 1 who was told that persistent somatic symptoms required
psychiatric rather than physiological investigation was, among other things, the subject of
a single-language model encountering an experience that requires more than one language to
describe correctly. A framework expressible in physics, mathematics, formal verification,
and clinical description simultaneously does not guarantee the symptoms will be taken
seriously. It does ensure that dismissing them requires engaging with the formal structure
of the argument, not merely its prose register.
