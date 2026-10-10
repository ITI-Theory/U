---
title: "Single-Step Multi-Agent Coordination via Green's Function Propagators: A Macroscopic Brane Projection Framework"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  Classical multi-agent coordination protocols — drone swarms, robotic fleets,
  distributed data-centre scheduling — achieve global consensus through
  iterative neighbour-to-neighbour message passing requiring O(N·K) operations
  for N agents and K convergence rounds. We present a field-theoretic
  idealised reformulation in which the swarm is treated as a Macroscopic Brane
  Projection of a continuous electromagnetic field. Under this formulation, the
  Green's function of the field serves as a propagator matrix G ∈ ℝ^{N×N}, and a
  single matrix-vector product G·s can replace the K-round iteration when the
  propagator and source state are already available.
  The resulting idealised protocol has O(N²) update cost with one propagator evaluation,
  yielding a K/N speedup factor over classical protocols — a 50× reduction at
  typical operating parameters (N=100, K=5000). We prove this arithmetic
  complexity comparison formally in Lean 4, derive the break-even condition
  K=N, and state the limited communication-round claim as a corollary of the
  one-step update. The framework is grounded
  in the Soma-Field Model's 11-dimensional configuration space decomposition,
  where the propagator occupies dimensions D₅–D₇. The jellyfish drone formation
  is presented as the primary engineering proof-of-concept.
---


# Introduction

Multi-agent systems face a fundamental coordination bottleneck. Whether the
agents are autonomous drones, data-centre nodes, or robotic units, achieving
a globally consistent state requires each agent to exchange information with
its neighbours across multiple communication rounds. The number of rounds K
required for consensus scales with the diameter of the communication graph —
for a swarm of N agents with bounded-degree connectivity, K = O(N) in the
worst case.

The computational cost of this protocol is O(N · K). For large N with slow
convergence (K ≫ N), this becomes expensive in both computation and energy.
More critically, the protocol's dependence on K sequential communication
rounds introduces a single point of failure: any disruption to communication
in round r propagates forward through all remaining rounds. This makes
classical swarm coordination intrinsically vulnerable to interference.

We propose a different foundation. Rather than modelling agents as discrete
nodes exchanging messages, we treat the swarm as a **Macroscopic Brane
Projection** of a continuous field. In this formulation, the global state of
the swarm is a section of the field at agent positions. The dynamics of the
field are governed by a Green's function $G : \mathbb{R}^N \to \mathbb{R}^N$
that propagates excitations instantaneously across the entire field.

The key idealised result: evaluating $G \cdot s$ once replaces K rounds of
message passing when $G$ encodes the relevant field solution and $s$ is
available to the evaluator. The update cost becomes O(N²) with one propagator
application.

This approach is grounded in the **Soma-Field Model** [@johnson2026b], in
which an 11-dimensional configuration space is decomposed into a 3-dimensional
**Propagator Space** (dimensions D₅–D₇) that carries exactly this role:
field propagation across a distributed spatial substrate.

---

# Background

## Classical Multi-Agent Coordination

Let $s \in \mathbb{R}^N$ be the state vector of N agents (position offsets,
phase values, or load levels). One round of coordination updates each agent
$i$ via a weighted sum of its neighbours:

$$s_i^{(t+1)} = \sum_j W_{ij} s_j^{(t)}$$

or in matrix form: $s^{(t+1)} = W \cdot s^{(t)}$.

After K rounds:

$$s^{(K)} = W^K \cdot s^{(0)}$$

For $W$ to converge to a consensus state, $W$ must be doubly stochastic and
the spectral gap of $W$ must be bounded away from zero. The convergence rate
is $O(\log(1/\varepsilon) / \text{gap}(W))$ to reach $\varepsilon$-consensus.
In sparse graphs (the common case in physical swarms), $\text{gap}(W) = O(1/N^2)$,
giving $K = O(N^2 \log(1/\varepsilon))$ rounds [@gossip2006].

Total cost: $O(N \cdot K) = O(N^3 \log(1/\varepsilon))$ in the worst case.

## Green's Functions and Field Propagation

In classical field theory, the Green's function $G(x, x')$ of a differential
operator $\mathcal{L}$ satisfies:

$$\mathcal{L}\, G(x, x') = \delta(x - x')$$

$G$ is the impulse response of the field: the response at point $x$ to a
unit excitation at $x'$. For the Helmholtz operator
$\mathcal{L} = \nabla^2 + k^2$, the free-space Green's function in three
dimensions is:

$$G(x, x') = \frac{e^{ik|x-x'|}}{4\pi|x-x'|}$$

{{Visualize | greens-functions-and-field-propagation | function-plot:wave | f="cos(k*x)/(4*pi*x)"; vary=k:1,2,4; x=[0.2,10]; xlabel="separation $|x-x''|$"; ylabel="$\mathrm{Re}\,G$" }} The real part of the free-space Green's function at three wavenumbers $k$: an oscillation whose envelope decays as $1/|x-x'|$ — a single evaluation propagates the field from source to observation point, without the iterative rounds of classical consensus.

This propagates a field excitation from source $x'$ to observation point $x$
in a single evaluation — not iteratively.

The key property: given a source distribution $\rho(x')$, the field response
everywhere is:

$$\phi(x) = \int G(x, x') \rho(x')\, dx'$$

Discretised at N agent positions $\{x_1, \ldots, x_N\}$, this becomes the
matrix-vector product $\phi = G \cdot \rho$, where $G_{ij} = G(x_i, x_j)$.

---

# The Macroscopic Brane Projection Framework

## The Swarm as a Brane

In M-theory, a brane is a lower-dimensional object embedded in a
higher-dimensional spacetime. In the Soma-Field Model [@johnson2026b], the
11-dimensional configuration space decomposes as:

$$M_{11} = M_4 \times X_7 = \text{Spacetime} \times (\text{Propagator} \times \text{Limbic} \times \text{Cortex})$$

{{Visualize | the-swarm-as-a-brane | type-decomposition:soma | whole="$\mathcal{M}_{11}$"; parts="$M_4$ spacetime=4, $X_7$ = $P_3 \times L_1 \times C_3$=7"; row_label="soma field"; iso="$\mathbb{R}^{1,3}$=4, $X_7$ compact=7"; iso_label="M-theory"; expect_total=11 }} The isomorphism of the equation above as a picture: the soma-field decomposition and M-theory's $M_4 \times X_7$ have the same dimensional structure, 4 + 7 = 11 (both totals checked). This is a match of dimensions and product structure only; the $G_2$ holonomy of $X_7$ is an open problem.

The Propagator Space $D_{5-7} \cong \mathbb{R}^3$ is the 3-dimensional
subspace carrying electromagnetic field propagation. A swarm of N agents
embedded in physical 3D space is a **brane projection**: the agents sample
the field at N discrete positions in this propagator space.

Under this identification:
- Agent $i$ occupies position $p_i \in D_{5-7}$
- The swarm state $s \in \mathbb{R}^N$ is the field amplitude at agent positions
- The propagator matrix $G \in \mathbb{R}^{N \times N}$ is the Gram matrix of
  the field's Green's function: $G_{ij} = G(p_i, p_j)$

## The Single-Step Protocol

**Protocol.** Distribute $G$ to all agents (one-time setup cost $O(N^2)$), and
ensure the required source state is available.
For each coordination step:

$$s' = G \cdot s$$

This is a single matrix-vector multiply: O(N²) cost, K = 1.

For the protocol to replace K-round message passing as a *correct* consensus
algorithm, $G$ must satisfy the consensus property: $G \cdot s$ maps any
initial state $s$ to the field's stationary distribution conditioned on the
boundary excitation. This correctness property is separate from the arithmetic
cost theorem below.

**Theorem (Lean-verified, `SwarmPropagator.propagator_beats_classical`).**
For any $N, K \in \mathbb{N}$ with $K > N$:

$$\text{cost}(G \text{ protocol}) = N^2 < N \cdot K = \text{cost}(\text{classical})$$

{{Visualize | the-single-step-protocol | function-plot:generic | f1="K*x"; name1="classical, $N\cdot K$"; vary=K:100,500,1000,5000; f2="x^2"; name2="propagator, $N^2$"; x=[0,200]; value_at=100; expect_value=10000; xlabel="swarm size $N$"; ylabel="operation count" }} Operation count against swarm size $N$: classical $K$-round consensus costs $N\cdot K$ (one curve per $K$), the propagator protocol costs $N^2$ regardless of $K$. At $N=K=100$ the two are equal — 10,000 operations, the break-even row of the complexity table; for $K=5000$ the classical cost is 50 times larger, matching the table's 50x row.

*Proof.* $N^2 < N \cdot K \iff N < K$, which holds by hypothesis. $\square$

**Corollary (break-even).** The two protocols have equal cost when $K = N$:
$N \cdot K = N^2$. At $K < N$, classical message passing is cheaper.

---

# Complexity Analysis

## When the Propagator Wins

The speedup ratio is $K/N$:

| N | K | Classical | Propagator | Speedup |
|---|---|---|---|---|
| 100 | 100 | 10,000 | 10,000 | 1× (break-even) |
| 100 | 500 | 50,000 | 10,000 | **5×** |
| 100 | 1,000 | 100,000 | 10,000 | **10×** |
| 100 | 5,000 | 500,000 | 10,000 | **50×** |
| 1,000 | 1,000 | 1,000,000 | 1,000,000 | 1× |
| 1,000 | 5,000 | 5,000,000 | 1,000,000 | **5×** |

The 50× figure at N=100, K=5000 is an operation-count comparison for the
idealised update. In practice, data-centre
load balancing and large-scale drone coordination operate in regimes where
$K \gg N$ is the norm, not the exception.

## Lean 4 Verification

The complexity results are type-checked in `SwarmPropagator.lean`:

- `propagator_beats_classical` — arithmetic cost inequality proved by `nlinarith`
- `breakeven_at_N` — proved by `simp`
- `classical_wins_single_round` — proved (for K=1, classical is faster)
- `speedup_monotone_in_K` — proved by `Rat.div_lt_div_right`
- `jam_resistant` — one-step update identity proved by `rfl`

---

# Jam Resistance

Classical coordination depends on K sequential communication rounds. A
hostile jammer that disrupts round $r$ corrupts all subsequent rounds:
$s^{(r)}, s^{(r+1)}, \ldots, s^{(K)}$ are all affected.

Under the propagator protocol, there is no round $r > 1$ in the update model.
The single evaluation $s' = G \cdot s$ requires that $G$ and the relevant
source state be available; the Lean theorem below proves the one-step identity,
not adversarial security against every radio-frequency attack.

**Theorem (Lean-verified, `SwarmPropagator.jam_resistant`).**
The propagator protocol completes in a single evaluation, assuming $G$ and the
state vector are already available.

*Proof.* `jellyfishUpdate swarm s = swarm.G.mulVec s = rfl`. $\square$

The distribution of $G$ itself is a one-time setup that can be done over a
secured channel before deployment. Subsequent coordination reduces the number
of sequential communication rounds in the model; practical jam resistance
requires an engineering threat model.

---

# The Jellyfish Drone Formation

The jellyfish formation is the natural engineering demonstration of the
brane projection framework. A jellyfish moves by propagating a field
excitation from its bell (the lead) outward through its body (the
tentacles). Each tentacle position is the Green's function of the
bell's excitation, evaluated at that tentacle's attachment point.

In the drone implementation:
1. A lead drone broadcasts a field state $\rho_\text{lead}$
2. Each follower drone $i$ computes its target position:
   $p_i' = \sum_j G(p_i, p_j) \rho_j$
3. No follower communicates with any other follower

The formation shape — the "tentacle" geometry — emerges from the level
sets of $G$. Changing the lead's excitation frequency $k$ changes the
formation shape continuously, enabling real-time morphing between
formations without any reconfiguration protocol.

This one-step update is formalised in `SwarmPropagator.JellyfishSwarm` and proved
by `jellyfish_single_step`.

---

# Connection to the Soma-Field Model

The propagator framework is not an independent construction. It is the
engineering instantiation of the Soma-Field's D₅–D₇ subspace.

In the full 11-dimensional model [@johnson2026b], the Propagator Space
carries electromagnetic field excitations between the body's physical
substrate (Spacetime, D₁–D₄) and the cortical processing layer
(Cortex, D₉–D₁₁). The Green's function of this field is what
McFadden [@mcfadden2002a; @mcfadden2002b] identifies as the CEMI
field's propagation kernel.

The swarm application is the same mathematics at a different scale.
The 20-level scale dial from `MTheoryIsomorphism.lean` (namespace
`SomaField.MTheory`) maps:

| Scale level | Physical substrate | Field propagator role |
|---|---|---|
| 5 (biological) | Neural EMF (CEMI) | Cortical coordination |
| 9 (swarm / crowd) | Drone swarm | Formation coordination |
| 10 (city / infrastructure) | Sensor networks | Infrastructure routing |
| 12–13 (planetary / solar-system) | Satellite constellation | Global coverage |

The same $G \cdot s$ operation is proposed across these levels. The boundary
conditions and engineering constraints change; the algebraic form does not.

---

# Discussion

## Relation to Attention Mechanisms

The softmax attention mechanism in Transformers [@vaswani2017] is
structurally analogous to the propagator update. The attention matrix
$A = \text{softmax}(QK^T / \sqrt{d})$ plays the role of $G$; the value
update $V' = A \cdot V$ plays the role of $G \cdot s$.

The difference is that in the Transformer, $A$ is recomputed at every
step from the current query-key pairs. In the propagator framework, $G$
is fixed by the physics of the field and the geometry of the swarm. This
removes the quadratic attention computation cost at each step — $G$ is
precomputed once and reused.

## Limitations

The propagator protocol assumes that $G$ can be computed and distributed
before coordination begins and that the relevant source state can be evaluated.
This is feasible when agent positions are known in advance (pre-planned drone
missions, static sensor networks) but requires adaptation for dynamic agent sets.

Additionally, the single-step result is exact only when the field is
linear and the agents are the only sources. Nonlinear field interactions
or external perturbations require iterative corrections — though even
in this case, the propagator provides a warm start that dramatically
reduces the number of classical rounds required.

## Formal Proof Status

The core arithmetic complexity theorems are Lean 4 verified. The global optimality result (`greens_achieves_minimum_energy` in
`SwarmPropagator.lean`) is stated as an axiom pending PDE scaffolding
in Mathlib; this paper gives the analytical motivation rather than a
kernel-checked proof.

---

# Conclusion

Classical multi-agent coordination pays a cost of O(N·K) for K rounds of
message passing. In the idealised model where the propagator and source state
are available, treating the swarm as a Macroscopic Brane Projection of a
continuous field reduces the update to a single O(N²) Green's-function
evaluation. The speedup factor is K/N,
reaching 50× at representative parameters (N=100, K=5000).

The framework is formally type-checked in Lean 4, providing kernel-checked
arithmetic proofs for the complexity comparison and one-step update identity.
The jellyfish drone
formation illustrates the result in a physically concrete setting where
the emergent formation geometry is the Green's function visualised as a
drone cloud.

The approach is scale-invariant as a modelling construction: the same
propagator form is proposed for cortical coordination (millimetre scale),
drone swarms (metre scale), and satellite constellations (megametre scale).
The scale parameter enters
through the boundary conditions of $G$, not through the update equation
itself.

---

# References

::: {#refs}
:::

---
nocite: |
  @johnson2026b
  @mcfadden2002a
  @mcfadden2002b
  @vaswani2017
  @ramsauer2020
...
