---
title: "Field Notes from the Inside: A Patient-Constructed Model of Emotional Dynamics"
subtitle: "Or: The Author Could Not Wait"
author: "Alistair Johnson, BSc Physics (Royal Holloway, University of London, 1993)"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
author-note: |
  The author presents this work as a researcher with lived experience of the conditions
  described herein — specifically, Autism Spectrum Condition (Level 2), Attention Deficit
  Hyperactivity Disorder, and Complex Post-Traumatic Stress Disorder. Formal training in
  physics provided the theoretical tools. The clinical observations were gathered over a
  lifetime, by the most direct means available.
date: "May 2026"
lang: en-GB
abstract: |
  There is a tradition, well-established in academic medicine, of researchers developing
  theoretical frameworks that are, in retrospect, transparently autobiographical. This
  paper does not conceal that tradition; it simply acknowledges it upfront. The author
  presents the Soma-Field Model: a formally grounded account of emotional dynamics in
  which emotions are conceived as a persistent distributed wave field co-inhabiting the
  body and nervous system, perceived only when a local amplitude exceeds a threshold, and
  governed by an energy function — borrowed from Hopfield network theory — that drives the
  field toward stable attractor states corresponding to fight, flight, freeze, and
  regulated calm.

  The model was not developed because an academic gap was identified in the literature.
  It was developed because the existing models of emotional experience were inadequate for
  the author's own case, the appropriate specialist had not yet appeared, and the author
  has a degree in physics and a limited supply of patience. The mathematics are, to the
  best of the author's knowledge, correct. The clinical observations are primary source
  material.

  A categorical formalization, Lean 4 type sketches, and mathematical operator
  modifications for Autism Spectrum Condition, ADHD, and Complex PTSD are included, partly
  because they are necessary for a complete treatment and partly because, once one has
  started borrowing from M-Theory, there is very little reason to stop.

keywords:
  - lived experience research
  - patient-researcher
  - somatic psychotherapy
  - emotional field theory
  - Hopfield energy function
  - polyvagal theory
  - autism
  - ADHD
  - complex PTSD
  - quantum field theory analogy
  - autoethnographic theory
---

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

# References

Arnstein, S. R. (1969). A ladder of citizen participation. *Journal of the American
Institute of Planners*, *35*(4), 216–224.

Beresford, P. (2002). User involvement in research and evaluation: Liberation or
regulation? *Social Policy and Society*, *1*(2), 95–105.

Damasio, A. (1994). *Descartes' Error: Emotion, Reason and the Human Brain*. Putnam.

Garfinkel, S. N., et al. (2016). Interoception in autism: A review and research agenda.
*Neuroscience & Biobehavioral Reviews*, *65*, 1–11.

Gendlin, E. T. (1978). *Focusing*. Everest House.

Grandin, T. (1995). *Thinking in Pictures: And Other Reports from My Life with Autism*.
Doubleday.

Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective
computational abilities. *Proceedings of the National Academy of Sciences*, *79*(8),
2554–2558.

Jamison, K. R. (1995). *An Unquiet Mind: A Memoir of Moods and Madness*. Knopf.

Levine, P. A. (2010). *In an Unspoken Voice: How the Body Releases Trauma and Restores
Goodness*. North Atlantic Books.

Murray, D. (2018). Monotropism — an interest-based account of autism. In *Encyclopedia
of Autism Spectrum Disorders*. Springer.

Ogden, P., Minton, K., & Pain, C. (2006). *Trauma and the Body: A Sensorimotor Approach
to Psychotherapy*. W. W. Norton.

Porges, S. W. (2011). *The Polyvagal Theory: Neurophysiological Foundations of Emotions,
Attachment, Communication, and Self-Regulation*. W. W. Norton.

Schore, A. N. (2001). The effects of early relational trauma on right brain development,
affect regulation, and infant mental health. *Infant Mental Health Journal*, *22*(1–2),
201–269.

Van der Kolk, B. (2014). *The Body Keeps the Score: Brain, Mind, and Body in the Healing
of Trauma*. Viking.

---

*The author notes that all three appendices from the companion paper (categorical
formalization, M-theory scale hierarchy, Lean 4 type sketches, and neurodivergent
operator mathematics) apply without modification to this version. The mathematics do
not change depending on who is presenting them. This is, in the author's view, rather
the point.*

---

*Correspondence: [Author Name], [Address]. The author is available for discussion of
this work and is generally more responsive to correspondence that engages with the
mathematics than to correspondence that expresses surprise at its existence.*
