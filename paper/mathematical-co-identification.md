---
title: "Mathematical Co-identification: A Method for Structural Import Across Scientific Domains"
subtitle: "Or: What to Do When Your Problem Is Already Solved in a Different Field"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "May 2026"
lang: en-GB
abstract: |
  The history of mathematical science contains a recurring event that is poorly
  named and therefore poorly taught: the discovery that a quantity in one domain
  is not *like* a quantity in another domain, but *is* the same mathematical
  object under a change of label. When this identification is made precisely,
  every theorem about the source object is imported into the target domain for
  free. The practitioner who can navigate the space of mathematical types —
  finding the object that matches their problem before re-deriving it from
  scratch — can compress decades of theoretical development into weeks.

  This paper names the practice **mathematical co-identification**, describes
  it as a formal procedure, and argues that it is a distinct scientific method
  with its own validity criteria, failure modes, and epistemological status. It
  is not analogy, not metaphor, not modelling, and not speculation. It is the
  act of recognising that two paths through the typeverse lead to the same point.

  Seven historical precedents are examined: Veneziano (1968), Hopfield (1982),
  Wilson (1971), Black-Scholes (1973), Jaynes (1957), Penrose (1971), and
  Selinger (2010). A worked example is provided in the form of the Soma-Field
  Model, where five sequential co-identifications imported the propagator,
  energy function, brane mechanics, G₂ holonomy, and renormalisation group
  flow from physics into emotional dynamics. The paper concludes with a partial
  catalogue of available mathematical structures — a field guide to the
  typeverse — and a discussion of the failure modes that distinguish genuine
  co-identification from mere analogy.

keywords:
  - mathematical co-identification
  - structural import
  - type theory
  - interdisciplinary methodology
  - dimensional analysis
  - category theory
  - analogy vs identity
  - soma-field model
---

# 1. Introduction: The Two-Culture Problem Within Science

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

# 2. The Typeverse

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

# 3. The Procedure in Detail

## 3.1 Step One: Extract the Type Signature

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

## 3.2 Step Two: Search the Typeverse

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

## 3.3 Step Three: Identify and Import

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

---

# 4. Historical Precedents

The history of science is full of co-identifications that were not named as such.
Examining them retroactively reveals the method clearly.

## 4.1 Veneziano (1968): The Bootstrap Amplitude and String Theory

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

## 4.2 Hopfield (1982): The Ising Hamiltonian and Neural Memory

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

## 4.3 Wilson (1971): Block Spins and the Renormalisation Group

Wilson's insight was that the renormalisation group — a technique for removing
ultraviolet divergences in QFT — was the *same* mathematical object as Kadanoff's
block-spin coarse-graining in condensed matter physics [@wilson1971]. Two fields
that had developed independently were co-identified. Every result from one was
immediately available to the other. The result was a unified framework for critical
phenomena that earned Wilson the 1982 Nobel Prize.

The type signature that matched: both objects were *flows on the space of
coupling constants under a change of scale*. This is a clean type-level description
that carries no substrate information.

## 4.4 Black and Scholes (1973): The Heat Equation and Options Pricing

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

## 4.5 Jaynes (1957): Thermodynamic Entropy and Bayesian Inference

Jaynes identified the entropy of statistical mechanics with the entropy of
Bayesian inference [@jaynes1957]. The type signature that matched: both are
functionals $S[p]$ on probability distributions satisfying the same axioms
(non-negativity, additivity, maximum at the uniform distribution). The
co-identification imported all thermodynamic reasoning into statistical
inference. The maximum entropy principle is not an analogy to thermodynamics;
it is thermodynamics, applied to the problem of belief.

## 4.6 Penrose (1971): Spin Networks and Spacetime Geometry

Penrose introduced spin networks as combinatorial structures encoding angular
momentum [@penrose1971]. The identification: the geometry of spacetime arises as
the large-network limit of spin networks. This reversed the usual direction —
instead of importing a known mathematical structure to describe a new phenomenon,
Penrose constructed a new structure and identified it with a familiar one in
a limit. Loop quantum gravity later formalised this programme. The spin network
*is* a discretisation of spacetime geometry, not a model of one.

## 4.7 Selinger (2010): Linear Maps and Quantum Processes

Selinger demonstrated that the category of finite-dimensional Hilbert spaces and
linear maps is co-identifiable with a certain category of string diagrams [@selinger2010].
This is a purely mathematical co-identification: the graphical calculus of
Penrose, Joyal, and Street was identified with the operational calculus of quantum
mechanics. The import: every calculation in quantum information theory can be done
diagrammatically, and every diagrammatic identity is a valid quantum identity.

---

# 5. The Soma-Field as a Worked Example

The Soma-Field Model [@johnsonsoma2026] was developed through five sequential
co-identifications. Each is presented here as an explicit instance of the method.

## 5.1 Co-identification I: The Conscious Percept as Green's Function

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

## 5.2 Co-identification II: The Attractor Landscape as Ising Hamiltonian

**Type signature:** A scalar function $H: \mathbb{R}^n \to \mathbb{R}$ that
is always non-increasing along field trajectories, with isolated minima
corresponding to stable emotional states.

**Typeverse search result:** The Hopfield energy / Ising Hamiltonian:

$$H(\mathbf{e}) = -\frac{1}{2}\mathbf{e}^\top W \mathbf{e} - \boldsymbol{\theta}\cdot\mathbf{e}$$

**Theorems imported:** Convergence to attractors (the Lyapunov argument);
capacity bounds (Hopfield's $0.14N$ result); stochastic escape via Boltzmann
noise (simulated annealing = titrated arousal in clinical language).

## 5.3 Co-identification III: The Perception Threshold as Brane Thickness

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

## 5.4 Co-identification IV: The Coupling Matrix as G₂ Manifold

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

## 5.5 Co-identification V: Therapeutic Processing as Renormalisation Group Flow

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

# 6. A Partial Map of the Typeverse

For the practitioner wishing to apply the method, the following is a partial
field guide to frequently useful mathematical structures, indexed by their
type signatures.

## 6.1 Propagator-Class Structures

**Type:** Complex function of frequency with poles on or near the real axis;
gives the response of a system to a delta-function input.

**Found in:** QFT (Feynman propagator), signal processing (transfer function),
linear systems theory (impulse response), harmonic analysis (Green's function
of the Laplacian).

**Typical imports:** Spectral decomposition; optical theorem; dispersion
relations (Kramers-Kronig: the real and imaginary parts of the response are
not independent — this imports into emotion as: the *dissipation* of an
emotional mode and its *natural frequency* are Hilbert transforms of each other).

## 6.2 Energy-Function-Class Structures

**Type:** Scalar function $H: \mathbb{R}^n \to \mathbb{R}$ that is bounded
below and non-increasing along system trajectories.

**Found in:** Statistical mechanics (Hamiltonian), neural networks (Hopfield
energy), Lyapunov theory (stability analysis), optimisation (loss function).

**Typical imports:** Convergence guarantees; stability analysis; capacity bounds;
the fluctuation-dissipation theorem.

## 6.3 Topological-Class Structures

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

## 6.4 Renormalisation-Class Structures

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

## 6.5 Scattering-Class Structures

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

## 6.6 Einstein-Coefficient-Class Structures

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

# 7. Failure Modes

Mathematical co-identification can fail. Understanding the failure modes is
what distinguishes the method from wishful analogy.

## 7.1 Type Coincidence Without Structural Identity

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

## 7.2 Non-Commutative Functors

The functor $F: D_1 \to D_2$ that implements the co-identification may not
commute with composition. That is, co-identifying $A$ with $A'$ and $B$ with
$B'$ does not guarantee that $AB$ is co-identifiable with $A'B'$.

**Example:** The propagator identification and the energy-function identification
are each valid separately, but combining them requires checking that the path
integral (which links them in QFT) has a valid analogue in the emotional domain.
This was explicitly verified in the Soma-Field Model by constructing the
Langevin equation and checking its consistency with both imported structures.

## 7.3 Over-identification

The most common failure: importing a structure that is richer than what is
warranted. The soma-field is co-identifiable with an eleven-dimensional
bosonic field. It is *not* immediately co-identifiable with the full Standard
Model of particle physics, even though both are quantum field theories.
The identification is precise only up to the type signature that was matched;
nothing beyond that is claimed.

**Rule:** The identification holds exactly at the type level it was made.
Do not import theorems from substrates that were not matched.

## 7.4 The Metaphor Trap

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

---

# 8. Epistemological Status

## 8.1 What Co-identification Claims

Mathematical co-identification claims:

1. That the *mathematical structure* of quantity $Q$ in domain $D$ is identical
   to the mathematical structure of quantity $P$ in domain $D'$.
2. That therefore, all theorems about $P$ that depend only on its mathematical
   structure are valid theorems about $Q$.
3. That the *physical interpretation* of $Q$ and $P$ may differ, and does not
   follow from the mathematical identification.

It does not claim that the *mechanisms* are the same, that one domain *reduces*
to another, or that the substrate is irrelevant in any empirical sense.

## 8.2 Why It Is Not Analogy

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

## 8.3 The Role of Artificial Intelligence

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

# 9. The Methodology as Practice

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

# 10. Conclusions

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

The typeverse does not belong to physics. Physics was merely first to explore it.

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

# References

::: {#refs}
:::
