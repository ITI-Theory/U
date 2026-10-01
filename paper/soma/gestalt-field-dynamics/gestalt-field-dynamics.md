---
title: "The Mathematical Foundations of Gestalt Field Dynamics: Formalising the Soma-Field via Russellian Neutral Monism"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: "This paper proposes an interpretive, model-level bridge between the clinical dynamics of Gestalt Psychotherapy and the mathematical architecture of Quantum Field Theory (QFT), utilising Bertrand Russell's Neutral Monism and Type Theory as an epistemological lattice. While Gestalt therapy historically relies on qualitative field descriptions to treat trauma, the Soma-Field model offers a proposed quantitative formalisation and a typed vocabulary for comparing clinical field concepts with field-theoretic structures. We model Gestalt stuckness as non-contractible topological loops with discrete winding numbers within a candidate G2-type manifold. By formalising clinical somatic tracking as a trajectory through an un-obstructed phase space, we frame mind-body dualism as an assumption-bound comparison rather than a closed proof."
---


# Introduction

For over a century, clinical psychology and physical sciences have operated on dual tracks. Where physics achieved extreme mathematical precision by stripping out subjective experience, clinical paradigms like **Gestalt Psychotherapy** preserved the holistic unity of subjective experience at the expense of mathematical formalisation. Gestalt therapy treats the human agent not as an isolated Cartesian machine, but as an organism-environment configuration operating within a dynamic, unified field.

Historically, this "field" has been treated as an illuminating qualitative metaphor. This paper treats field language as a disciplined mathematical analogy / co-identification under stated assumptions. By leveraging the framework of **Mathematical Co-identification** [@johnson2026a], we compare the clinical realities of Gestalt therapy with field-theoretic mathematics.

To bridge this epistemic gap without falling into category errors, we deploy the philosophy of **Bertrand Russell**. Russell’s **Neutral Monism** (1921) posits that both mind and matter are logical constructions built out of a singular, underlying substrate of neutral *events*. Concurrently, his **Theory of Types** provides the strict syntactic hierarchy needed to prevent logical paradoxes when mapping psychological phenomena to physical mathematical structures.

This paper documents how the **Soma-Field Model** (Johnson, 2026b) can serve
as a candidate quantitative architecture for comparing selected qualitative
features of Gestalt therapy.

---

# Historical Context: Three Traditions, One Moment

The three intellectual traditions that converge in this paper — Gestalt psychology,
Russellian analytic philosophy, and quantum field theory — were each established
within the same compressed historical window (1910–1951), yet developed largely
as separate conversations.

**Gestalt psychology** emerged in Berlin and Frankfurt in the early twentieth
century as a direct rejection of Wundt's elementalist programme. Max Wertheimer's
1912 demonstration of the *phi* phenomenon — apparent motion from static stimuli —
established that perceptual experience is irreducibly holistic: the whole precedes
and constrains its parts. Wolfgang Köhler and Kurt Koffka developed this insight
across perception, learning, and problem-solving throughout the 1920s. The critical
clinical extension was made by Kurt Lewin, whose **field theory** (1936) modelled
individual behaviour as a function of the person-in-environment (*Lebensraum*),
introducing explicitly topological language — vectors, valences, barriers — into
psychology.

**Gestalt therapy** was forged from this tradition by Fritz Perls, who trained with
neurologist Kurt Goldstein (whose *organismic theory* directly anticipated somatic
field models) before studying phenomenology and emigrating to South Africa and then
New York. Together with Laura Perls — who had studied with Wertheimer and Martin
Buber — and the social philosopher Paul Goodman, Fritz Perls published *Gestalt
Therapy: Excitement and Growth in the Human Personality* [-@perls1951]. This work
displaced the Freudian focus on historical narrative with present-moment somatic
awareness: the clinical "field" is the organism-environment configuration at
this instant, not merely a decorative metaphor inside Gestalt theory. The
present paper treats the Russell--Gestalt--QFT relation as a structural bridge,
not as a claim of historical influence.

Gestalt therapy sat within the broader **Humanistic psychology** movement — Abraham
Maslow's *third force* (named against behaviourism and Freudianism), formalised
when the American Association for Humanistic Psychology was founded in 1961.
Carl Rogers's person-centred therapy [-@rogers1951], Maslow's hierarchy of needs [-@maslow1943],
and Gestalt therapy share a common commitment: experience is irreducible, relational,
and cannot be adequately captured by stimulus-response mechanics.

**Bertrand Russell's** pivotal contributions span precisely this same window. His
*Theory of Types* [first published 1908; @russell1910] was a response to Russell's own paradox in set theory — the discovery
that unrestricted self-reference generates logical collapse. *The Analysis of Mind* [-@russell1921] marks Russell's turn toward **Neutral Monism**: written in the same decade as
the Gestalt school's consolidation, it argued that the Cartesian split between mind
and matter is not a metaphysical fact but a bookkeeping error — both are logical
constructions from a single substrate of neutral events.

Meanwhile, **quantum field theory** was achieving its mature form. Dirac's equation
[@dirac1928], Feynman's path integrals and diagrammatic methods [@feynman1948], and Yang-Mills
gauge theory [@yangmills1954] gave physics an extraordinarily precise formal language for
describing fields, excitations, and topological constraints. By the 1960s, cognitive
psychology was consolidating around the information-processing metaphor — the brain
as symbol-manipulating computer — while field-theoretic physics was consolidating
around the language of manifolds, holonomy, and gauge invariance. The two traditions
diverged at the very moment each was maturing, and the structural resonance
with Russell's 1921 neutral-monist vocabulary was never developed as a shared
technical language.

This paper proposes a shared formal vocabulary for that gap. Russell's neutral
events, Lewin's topological field barriers, and the holonomy groups of M-theory
compactification are compared within a common mathematical structure; equivalence
remains interpretive and assumption-dependent.

---

# Epistemological Grounding: Russellian Neutral Monism and Type Theory

To understand how quantum field mathematics can model psychological affect in
this paper, one must reject both simple materialist reductionism and simple
mentalist dualism. In *The Analysis of Mind* [-@russell1921], Bertrand Russell
observed a fundamental convergence in the sciences:

> *"Physics has been making matter less material, and psychology has been making mind less mental."*

Russell argued for neutral monism: the data out of which both "mind" and
"matter" are constructed are not intrinsically mental or material. The present
paper uses the term **events** for those neutral particulars. Physics and
psychology are then treated as different organisations or descriptions of a
common neutral substrate, not as two substances.

The *Soma-Field* model uses Russell's neutral monism as a philosophical
scaffold by treating the conscious emotional percept as a proposed
physical-mathematical event—specifically, the one-dimensional impulse response
(the Green's function) of an eleven-dimensional coupling manifold:

$$G(\omega) = \frac{1}{\omega^2 - m^2 + i\epsilon}$$

To prevent this co-identification from collapsing into pseudo-scientific abstraction, we enforce Russell's **Theory of Types**. This mathematical syntax creates a strict structural hierarchy where operations at Level $n$ cannot operate reflexively upon themselves without generating syntactic nonsense. In the context of computational verification, we define our system states across explicit, non-overlapping types:

* **Type 0 (Individual Somatic Data):** Discrete physiological metrics (heart-rate variability, cortisol levels, muscular contraction vectors).
* **Type 1 (Somatic Fields / Attractor Nets):** The global coupling matrix ($W$) and bias vectors ($\mathbf{b}$) defining the Hopfield energy function of the organism:
  $$H(\mathbf{e}) = -\tfrac{1}{2}\mathbf{e}^{\top} W \mathbf{e} - \mathbf{b}^{\top}\mathbf{e}$$
* **Type 2 (Topological Spaces):** The global boundary conditions and holonomy groups ($G_2$) constraining the trajectories of Type 1 fields.

By adhering to this type-theoretic hierarchy, the Soma-Field model avoids
classifying emotional trauma as a vague "ghost in the machine." Instead, it
represents traumatic stuckness as a structural property of a high-dimensional
model topology, whose clinical validity remains empirical.

---

# The Comparative Framework: Soma-Field Mathematics vs. Gestalt Clinical Reality

The table below proposes structural correspondences between Gestalt clinical
language and the Soma-Field model. These are model-level co-identifications
under stated assumptions, not historical or clinical equivalence claims:


| Soma-Field Mathematical Construct | Russellian Philosophical Substrate | Gestalt Clinical Phenomenon |
| :--- | :--- | :--- |
| **Hopfield Attractor Basin** <br>Local minima of the energy function: <br>$H(\mathbf{e}) = -\tfrac{1}{2}\mathbf{e}^{\top} W \mathbf{e} - \mathbf{b}^{\top}\mathbf{e}$ | **Systemic State Configuration** <br>The local grouping of neutral physical-mental events. | **Fixed Gestalt / Chronically Regulated State** <br>Rigidly patterned autonomic states (e.g., chronic freeze, fight, or dissociation). |
| **Green's Function Pole** <br>Sub-perceptual field fluctuations crossing the mass threshold $m$. | **The Emergence of Percepts** <br>Sensory data translating into a direct present-moment experience. | **Formation of the Figure** <br>A specific need or somatic sensation emerging out of the background field into awareness. |
| **Brane Embedding** <br>The physical body modelled as a 3-brane within an 11D manifold. | **Bimodal Manifestation** <br>Neutral events expressing physical properties on the localised boundary. | **Somatic Grounding** <br>Somatic trauma models hypothesise persistent bodily correlates of traumatic response; mechanisms require empirical evidence. |
| **Non-Contractible Loops ($G_2$ Holonomy)** <br>Topological obstructions in the moduli space with non-zero winding numbers. | **Structural Category Traps** <br>Logical knots where internal relations prevent systemic transformation. | **The Impasse / Unfinished Situation** <br>The state of chronic psychological 'stuckness' where smooth change is impossible. |
| **Phase Space Trajectory Modulations** <br>Smoothing boundary conditions via external field coupling. | **Dynamic Relational Re-ordering** <br>Altering the external relations of neutral events to change the psychological outcome. | **Somatic Tracking & Resourcing** <br>The therapist-client relational co-regulation that alters the somatic boundary conditions. |

---

# Mathematical Derivations and Structural Proofs

To make these co-identifications precise, we provide three mathematical
derivations that formalise candidate mechanics of Gestalt interventions. The
attractor-basin formalism follows [@hopfield1982].

## Proof 1: The Bio-Somatic Interface via Brane Embedding

To understand why a psychological emotion is bound to physical anatomy, we derive **Co-identification 3**. We define the global coupling manifold as an 11-dimensional bulk space $\mathcal{M}_{11}$ with coordinates $X^M$. The physical body is a four-dimensional spacetime hypersurface (a 3-brane) $\Sigma_4$ embedded within $\mathcal{M}_{11}$ via the mapping $X^M(x^\mu)$, where $x^\mu$ are the coordinates on the brane ($\mu = 0,1,2,3$).

The induced metric $g_{\mu\nu}$ on the somatic brane is determined by the pull-back of the bulk metric $G_{MN}$:

$$g_{\mu\nu}(x) = G_{MN}(X) \frac{\partial X^M}{\partial x^\mu} \frac{\partial X^N}{\partial x^\nu}$$

Let an emotional state change be represented by a bulk field fluctuation
$\Phi(X)$. The restriction of this field to the somatic brane gives the
modelled visceral state $\phi(x) = \Phi(X(x))$. The action $S_{\text{soma}}$
for the modelled bodily variables is given by:

$$S_{\text{soma}} = \int_{\Sigma_4} d^4x \sqrt{-g} \left[ -\frac{1}{2} g^{\mu\nu} \partial_\mu \phi \partial_\nu \phi - V(\phi) \right]$$

Within the model, this suggests coupling between field state and somatic variables on the 3-brane. It does not prove clinical limits of cognitive reflection; it represents emotional state change as structurally coupled to the physical tissue variables of the somatic brane ($g_{\mu\nu}$).

## Proof 2: Lyapunov Stability of the Fixed Gestalt

In Gestalt theory, a "fixed Gestalt" is a chronic, repetitive pattern of
affect that resists alteration. We model this mathematically by treating the
emotional state vector $\mathbf{e} \in \mathbb{R}^N$ as a continuous dynamical
system governed by the gradient descent of the Hopfield energy function
(**Co-identification 1**):

$$\frac{d\mathbf{e}}{dt} = -\nabla H(\mathbf{e}) = W\mathbf{e} + \mathbf{b}$$

Here $W$ is required to be symmetric ($W = W^\top$), which ensures the gradient $\nabla H$ is well-defined; when $W$ is additionally negative semi-definite, $H(\mathbf{e})$ is bounded from below, a necessary precondition for stable attractor dynamics.

To show why a fixed Gestalt can be represented as a stable attractor basin, we
select $H(\mathbf{e})$ as a candidate Lyapunov function. For
$H(\mathbf{e})$ to be a valid Lyapunov function, it must satisfy two conditions:
1. $H(\mathbf{e})$ is bounded from below.
2. The time derivative $\frac{dH}{dt}$ is strictly non-positive along the trajectories of the system.

We compute the total time derivative of $H(\mathbf{e})$ using the chain rule:

$$\frac{dH}{dt} = \sum_{i=1}^N \frac{\partial H}{\partial e_i} \frac{de_i}{dt}$$

Substituting the dynamical equation $\frac{de_i}{dt} = -\frac{\partial H}{\partial e_i}$ into the expression yields:

$$\frac{dH}{dt} = \sum_{i=1}^N \frac{\partial H}{\partial e_i} \left( -\frac{\partial H}{\partial e_i} \right) = -\sum_{i=1}^N \left( \frac{\partial H}{\partial e_i} \right)^2 \leq 0$$

Because $\frac{dH}{dt} \leq 0$, the model energy is non-increasing along the
gradient trajectory, and local minima are candidate stable fixed Gestalts.

This derivation shows how the model can represent chronic psychological
defences (such as dissociation or hyper-arousal) as stable or metastable
states of low energy within the organism's current coupling matrix ($W$). It
does not diagnose any individual or prove clinical mechanism.

## Proof 3: Topological Resolution of the Impasse via Present-Moment Tracking

The most speculative synthesis occurs in the conceptualisation of trauma. In
Gestalt therapy, trauma can be approached as an impasse—a frozen,
non-adaptive structural configuration of the environmental-somatic field that
resists the client's conscious desire for change.

The Soma-Field model provides a candidate mathematical language for this
impasse via Co-identification 4 ($G_2$ holonomy). If the seven compactified
dimensions of the emotional coupling manifold are modelled as a $G_2$-type
space, then topological obstructions can be represented as loops through phase
space with non-zero winding number. The $G_2$ link is a proposed structural
bridge, not a completed compactification proof.

The impasse occurs when a closed path $\gamma$ encircles a topological defect in the moduli space of the $G_2$ manifold. The winding number $n$ is invariant under smooth deformations:

$$n = \frac{1}{2\pi} \oint_{\gamma} d\theta \quad (n \neq 0)$$

The model represents chronic stuckness as a possible topological obstruction with non-zero winding number ($n$). Intervention response is empirical; the formal loop does not establish that cognitive restructuring cannot help a given client.

Within the model, changing the trajectory without changing the global manifold
topology is represented by modulating boundary conditions through an external,
time-dependent driving term—the relational presence of the therapist. The
client-therapist co-regulation is modelled as a localized driving current
$\mathbf{J}(t)$ in the field equations:

$$\frac{d\mathbf{e}}{dt} = W\mathbf{e} + \mathbf{b} + \mathbf{J}(t)$$

This external current changes the local energy landscape, shifting the
position of the topological defect relative to the trajectory $\gamma$ in the
model. Present-moment somatic tracking is represented as guiding the system
along a path where the effective radius of the loop approaches zero
($r \to 0$).

$$\lim_{\mathbf{J}(t) \to \mathbf{J}_{\text{resource}}} \oint_{\gamma} d\theta = 0$$

If such a driven path exists, the model represents resolution as a transition
from a non-zero to a zero winding number. Whether a given client experiences
clinical resolution is an empirical matter outside this derivation.

# Conclusion

By mapping selected clinical methodologies of Gestalt therapy onto the Soma-Field model, we offer a formal model for analysing some psychotherapy dynamics rather than a proof that radical psychology and modern quantum field mathematics describe the same neutral events.

The Soma-Field architecture [@johnson2026b] is a model-level physics exercise applied to clinical language; it does not prove clinical validity or close the objective/subjective gap. When a Gestalt therapist supports a change in present-moment awareness, the
model describes that process as operations on the boundary conditions of a
high-dimensional emotional field.

# References

---
nocite: |
  @wertheimer1912, @lewin1936, @perls1951, @rogers1951, @maslow1943,
  @russell1910, @russell1921, @dirac1928, @feynman1948, @yangmills1954,
  @hopfield1982, @johnson2026a, @johnson2026b
---
