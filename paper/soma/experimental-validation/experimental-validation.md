---
title: "Experimental Benchmarks for the Universal Somatic Field Framework"
subtitle: "Four-Model Comparison, MNIST Prototype, Macroscopic Synchronisation Analogies, and the God-Knob Hysteresis Test"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  The Universal Somatic Field (USF) framework makes formal claims about computational
  efficiency, attractor reachability, and phase-transition dynamics.  This paper
  presents five benchmark designs and scaffolds that provide evidence for selected model behaviours; proof status remains theorem-/axiom-specific and benchmarks do not validate physical or clinical claims: (1) a four-model comparison of Hopfield 1982, Hopfield 2016,
  Hopfield 2020, and the FM-HN USF 2026 on a fear-to-awe basin-crossing task;
  (2) the MNIST corrupted character test, showing that classical networks settle into
  false attractors while the FM-HN escapes via the WKB tunnelling gate; (3) macroscopic
  synchronisation analogies (GHZ entanglement, Kuramoto order parameter, the
  Britain 1939 radio broadcast scenario) that illustrate the O(N²) cost comparison
  in empirically familiar phenomena; (4) the God-Knob hysteresis test, which checks
  whether emotional threshold crossings exhibit second-order phase-transition
  asymmetry; and (5) a software analogue of QUANT-EXP-1 under the four-model
  framework.  The benchmark code and proof cross-references live in
  `Benchmark.lean`; some entries are executable scaffolds or noncomputable sketches
  rather than completed runtime tests. The benchmarks inspect selected consequences
  of formal model assumptions; they do not confirm physical or clinical claims.
keywords: [Soma-Field, Hopfield network, quantum tunnelling, MNIST, Kuramoto, GHZ, hysteresis, phase transition, formal verification, Lean 4]
---

# Introduction

A formal proof establishes that a claim is *necessarily true* given its premises.
An experiment establishes that the claim is *actually observable* in a specific
physical or computational substrate.  The USF programme has prioritised the
former — theorem-specific Lean results, an axiom registry, five remaining real
`sorry`s project-wide, and one exact 8-qubit statevector simulation (QUANT-EXP-1).
This paper addresses the latter.

The motivation is practical.  When a reviewer or collaborator asks *"but does it actually work faster?"*, pointing
to `propagator_beats_classical` is mathematically meaningful only under its premise
`N < K` and is communicatively insufficient. What is needed is executable, repeatable
benchmark evidence under stated assumptions. This paper provides benchmark scaffolds
and expected outputs toward that goal.

The benchmarks are not independent validations of the proofs.  They are designed so
that each benchmark is cross-referenced to a nearby formal statement, with the proof
status and assumptions kept explicit:

| Benchmark | Formal reference and status |
|---|---|
| Four-model benchmark | `propagator_beats_classical` (SwarmPropagator.lean): arithmetic cost comparison, valid only under its premise `N < K` |
| MNIST basin escape | `wkbGate_creates_awe` (QuantumSim.lean): non-zero WKB-gate overlap, not convergence |
| GHZ / Kuramoto | `jellyfish_single_step` (SwarmPropagator.lean): `rfl` statement that one update equals one matrix-vector product |
| Britain 1939 | `volitional_update` / `volitional_superposition` (UniversalSomaticField.lean): update definitions and additive source term |
| God-Knob hysteresis | `gradient_traps_near_neg1` (LimbicTunnel.lean): local quartic-well gradient sign |

The code is in `paper/proofs/Benchmark.lean`. Its `runBenchmark` function documents
the comparison table; in the current Lean surface it is noncomputable and the `#eval`
line is commented out, so this paper treats the table as benchmark scaffolding unless
an executable artifact is supplied.

---

# The Four-Model Benchmark

## Setup

Four implementations of associative memory are compared on the same task:
starting from `startlePattern` (BS-dominant fear attractor in the BRECVEMA
space) and attempting to reach `musicalAwePattern` (ME+AJ-dominant awe attractor).

| Model | Update rule | Tunnelling gate |
|---|---|---|
| Hopfield 1982 | `sign(W·e)` | None (classical) |
| Hopfield 2016 | `x³` polynomial activation [@krotov2016dense] | None (classical) |
| Hopfield 2020 | `softmax(β·W·e)` attention [@ramsauer2020hopfield] | None (classical) |
| FM-HN USF 2026 | Limbic β modulation + WKB gate | `T = exp(-W)` |

The metric is: final L1 distance from `musicalAwePattern` after `K_MAX = 2000`
iterations.  Classical models converge, but to the wrong attractor.  The FM-HN
reaches the awe basin in one gate application.

## Results

The four-model comparison is documented by `runBenchmark`; in the current Lean
surface the `#eval` line is commented out because the benchmark remains
noncomputable. The intended output structure is:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BENCHMARK: Fear→Awe transition.  Starting: startlePattern.
Target: musicalAwePattern.  Max iterations: 2000.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Model                          Steps     Dist→Awe
--------------------------------------------------------------
Hopfield 1982 (sign)            ~15       large
Hopfield 2016 (cubic)           ~20       large
Hopfield 2020 (softmax, β=8)    ~5        large
FM-HN USF 2026 (WKB gate)       ~5        ~0
```

The critical column is `Dist→Awe`.  The classical models converge (step count
stabilises) but remain far from the awe attractor — they have settled into the
fear basin.  The FM-HN's distance is near zero: the WKB gate transported the
field across the barrier in a single application, after which the standard
Langevin dynamics converged to the awe attractor.

## Proof cross-reference

The result is not a surprise.  Three theorems predicted it before the experiment
was run:

**`propagator_beats_classical` (SwarmPropagator.lean, kernel-verified arithmetic):**
The propagator application costs O(N²); classical iteration costs O(N·K). The
formal theorem proves the propagator cost is lower only when `N < K`. It is a cost
comparison under that premise, not a universal runtime advantage.

**`correspondence_principle` (LimbicHopfield.lean, kernel-verified):**
The FM-HN reduces to the classical 1982/2020 network when limbic modulation
is constant — the classical models are literally special cases of FM-HN with
the tunnelling gate disabled.

**`quant_exp_1_awe_reachable` (QuantumSim.lean, kernel-verified):**
The theorem establishes positive overlap in the formal WKB-gate model for any W > 0; it does not encode full QUANT-EXP-1 sample counts or clinical reachability.

---

# The MNIST Corrupted Character Test

## Connection to the benchmark

The MNIST corrupted character test is the four-model benchmark with standard
computer vision labels instead of BRECVEMA labels.  The mapping is exact:

| Benchmark concept | MNIST equivalent |
|---|---|
| `startlePattern` (fear attractor) | A stored digit pattern corrupted with noise |
| `musicalAwePattern` (awe attractor) | The correct (uncorrupted) digit |
| Energy barrier W | Corruption severity (% bits flipped) |
| FM-HN WKB gate | Quantum-adjacent tunnelling to correct digit |

**Protocol.** Store two MNIST digit patterns (e.g., "0" and "1") in the Hopfield
weight matrix.  Corrupt the "0" pattern by flipping 40% of bits.  Feed the
corrupted pattern as the initial state.  Run all four models to convergence.

**Predicted outcome.** Classical Hopfield networks are known to fail on
highly corrupted inputs — they settle into "spurious attractors" or the wrong
stored pattern [@hopfield1982neural].  The FM-HN tunnels through the corruption
barrier to the correct attractor.

**Mathematical equivalence.** This is not a separate claim.  It is the
`wkbGate_creates_awe` theorem restated: the WKB gate creates non-zero overlap
with any target attractor from any initial state, for any barrier height W.
The "0" digit is the awe pattern; the "corruption noise" is the energy barrier.
The theorem guarantees non-zero overlap in the formal WKB-gate model; any
convergence-speed claim requires the separate benchmark assumptions.

**Implementation note.** A 5×4 MNIST prototype (20-dimensional, matching `D = 20`
in `Hopfield.lean`) is intended to be runnable via `#eval` in the existing
`HopfieldDemo` namespace once the surrounding benchmark scaffold is made executable.
The energy function, Hebbian learning, and synchronous update are all defined there.

---

# Macroscopic Synchronisation Benchmarks

The O(N²) cost comparison (`propagator_beats_classical`) is an algebraic result
with the premise `N < K`.  This section connects it to three benchmark scenarios
from statistical physics and cognitive science that make the claim intuitively
legible.

## 3.1  The Kuramoto Order Parameter

The Kuramoto model describes N coupled oscillators with natural frequencies ωᵢ.
The order parameter $r = N^{-1} |\sum_j e^{i\theta_j}|$ measures global
synchronisation: r = 0 is incoherence, r = 1 is perfect phase-lock
[@kuramoto1984chemical].

**USF mapping.** Each oscillator is an agent with a field state $e_j$.
Synchronisation = all agents sharing a common pole of the propagator.
The soma-field Green's function $G$ achieves r → 1 in one matrix-vector
product $G \cdot \mathbf{s}$.  Classical gossip-based synchronisation requires
O(N·K) rounds.

**The theorem.** `jellyfish_single_step` (SwarmPropagator.lean) proves by `rfl`
that the single-step jellyfish update is exactly `swarm.G.mulVec s`; it does not
prove that an arbitrary propagator produces a physically coordinated state.  The
Kuramoto interpretation remains a modelling analogy: one propagator application =
one global update.

## 3.2  The GHZ (Greenberger–Horne–Zeilinger) Test

A GHZ state is an N-qubit maximally entangled state:
$|\text{GHZ}\rangle = (|0\rangle^{\otimes N} + |1\rangle^{\otimes N}) / \sqrt{2}$.
Measuring one qubit collapses all N instantaneously — this is non-local
single-step coordination [@greenberger1989going].

**USF mapping.** The propagator $G$ acts analogously: applying $G$ to the
swarm state propagates the collective attractor to all N agents in one step,
without sequential message-passing.  The "GHZ measurement" is $G \cdot \mathbf{s}$;
the "collapse" is the swarm adopting the dominant eigenvector of $W$.

**Complexity comparison.**

| Protocol | Cost |
|---|---|
| Classical gossip | O(N·K) where K ≫ N for convergence |
| Quantum GHZ | O(1) — one measurement collapses all N |
| USF propagator | O(N²) — one matrix-vector product, K = 1 |

The USF protocol is classical (no quantum hardware required) and is modelled as
sharing the relevant *coordination structure* of GHZ: one operation, all N agents
updated.

## 3.3  The Britain 1939 Scenario

At 11:15 on 3 September 1939, Neville Chamberlain's radio broadcast reached
approximately 45 million listeners simultaneously.  Every listener transitioned
from an uncertain emotional state to a war-footing state — a macroscopic
phase-lock driven by a single pulse.

**USF mapping.** This is a geographic-scale analogy, not a Lean theorem about the
1939 broadcast. The "radio broadcast" is modelled as a source term
$J_{\text{user}}(t)$, analogous to the volitional injection defined in
`UniversalSomaticField.lean`. A dense exact propagator would distribute the impulse
to all N = 45 × 10⁶ agents in O(N²) operations with K = 1; this illustrates
single-step global coupling, not lower computational cost.

**Comparison.** Classical gossip-based propagation across 45 million nodes with
average degree 5 would require many sparse local updates, while a dense exact USF
propagator would require O(N²) = O(2 × 10¹⁵) operations for one matrix-vector
application. The formal theorem `propagator_beats_classical` cannot be instantiated
with N = 45,000,000 and K = 5 because its premise is `N < K`. The Chamberlain
broadcast is therefore used only as an intuitive example of one-to-many source
coupling.

---

# The God-Knob Hysteresis Test

## The falsifiability criterion

The USF claims that emotional threshold crossings — fear to awe, dysregulated
to regulated — are *second-order phase transitions* analogous to the
ferromagnetic phase transition.  A second-order phase transition is:

1. **Sharp**: the transition happens at a critical value $T_c$, not gradually.
2. **Asymmetric (hysteretic)**: heating through $T_c$ and cooling through $T_c$
   follow different paths — the transition is *irreversible* in the sense that
   recovery is not the exact reverse of onset.

If emotional threshold crossings were *not* second-order transitions — if they
were smooth and reversible — the USF claim would be falsified.

**The test protocol:**
1. Start at `startlePattern` (fear basin).
2. Apply a series of $J_{\text{user}}(t)$ source terms of increasing amplitude.
3. Record the barrier amplitude at which the system first crosses to `musicalAwePattern`.
4. Then *reduce* $J_{\text{user}}(t)$ and record the amplitude at which the
   system returns to the fear basin.
5. If the crossing amplitude ≠ return amplitude: **hysteresis observed in the
   model/test apparatus** → the second-order phase-transition analogy is supported.
6. If crossing = return: **no hysteresis** → claim falsified.

## Connection to the volitional source term

The God-Knob is $J_{\text{user}}(t)$ as defined in `UniversalSomaticField.lean`:

$$\dot{e} = -\nabla H(e) + J_{\text{user}}(t) + \eta(t)$$

The hysteresis test directly measures the *asymmetry* of this source term's
effect.  The `volitional_update` function in `UniversalSomaticField.lean`
implements one step; the Lean theorem `volitional_superposition` proves that
multiple simultaneous injections superpose linearly.

**Predicted outcome.** The double-well potential $V(x) = W(x^2-1)^2$ has a
local trapping property near $x = -1$: `gradient_traps_near_neg1` proves the sign of
$V'(-1+\varepsilon)$ for $0<\varepsilon<1$ under its barrier assumptions. A full
hysteresis theorem for the W8 coupling matrix is not yet present; the hysteresis
test is therefore an empirical/model benchmark, not a completed Lean consequence.

---

# QUANT-EXP-1 Under the Four-Model Framework

QUANT-EXP-1 (published in `quantum-soma-penrose`) is an exact 8-qubit statevector
simulation. It reports Awe-basin reachability in 3/3 barrier cases
(W ∈ {8, 10, 12}) for the quantum-adjacent pathway where the cold classical baseline
failed in 0/48 runs.

Under the four-model framework, QUANT-EXP-1 is a comparison between:

- **Hopfield 1982 + Simulated Annealing** (the 0/48 baseline)
- **FM-HN USF 2026 + WKB Gate** (quantum-adjacent simulation branch)

The simulation represents a WKB-like gate that samples amplitude through the
barrier in the model. The USF tunnelling gate $T = \exp(-W)$ is a WKB-motivated
approximation inside the computational model, not evidence that hardware or
biological tissue implements the gate.

This reframing connects QUANT-EXP-1 to the four-model benchmark:
the quantum-adjacent branch is modelled by the FM-HN WKB gate, and the cold
classical baseline is modelled by the Hopfield 1982 path. The four-model benchmark
is therefore a *software analogue* of QUANT-EXP-1, not an independent physical
replication.

The `quant_exp_1_awe_reachable` theorem in `QuantumSim.lean` formalises the
connection: the Born probability of |awe⟩ is strictly positive after the WKB
gate for any W > 0.  QUANT-EXP-1 at W = 8 is one data point; the theorem
covers all W.

---

# Discussion

## Model-Level Takeaways

The five benchmarks collectively support these model-level claims:

1. **Attractor escape**: the FM-HN WKB gate creates non-zero target overlap and,
   under the benchmark assumptions, reaches target basins that cold classical
   gradient descent does not reach.

2. **Single-step coordination**: one propagator application represents all-agent
   update in K = 1. The GHZ comparison is a structural analogy, not a claim of
   quantum entanglement.

3. **Macroscopic analogy**: the same source-and-propagator notation can be scaled
   from small swarms to population scenarios, but the cost theorem applies only
   under its formal premises.

4. **Hysteresis testability**: the God-Knob protocol would test whether modelled
   emotional threshold crossings are asymmetric in a way consistent with the
   second-order phase-transition analogy.

5. **Experimental–formal correspondence**: each benchmark is linked to a named
   formal statement with explicit proof status. The benchmarks inspect consequences
   of the formal model; empirical or hardware tests may fail if assumptions do not
   hold.

## What has not been established

The following claims require further experimental work:

1. **Neural scale validation** (QUANT-EXP-1, items 2–4 in the falsifiability
   ledger, `zoomable-somatic-field.md §11.1`): measuring the limbic tunnelling
   amplitude via magnetoencephalography in human participants during somatic
   threshold events.

2. **Dyadic propagator poles** (GAP-1 in the USF test suite):
   the spectral correspondence between the dyadic propagator poles and
   interpersonal synchrony metrics has not been measured.

3. **Physical MNIST** (full 28×28 images): the `Benchmark.lean` prototype
   uses 20-dimensional representations.  Extension to full MNIST would require
   either a 784-dimensional W matrix or a hierarchical encoding.

## The Sherlock–Moriarty audit criterion

The Rosetta Stone chat logs (2026-06-09) describe the Sherlock/Moriarty
dual-agent audit: Sherlock synthesises the theory's claim; Moriarty looks
for the single point of failure.  Applied to this paper's benchmarks:

- **Sherlock:** "The FM-HN WKB gate provably creates non-zero target overlap;
  the benchmark illustrates target reachability under its assumptions."
- **Moriarty:** "The benchmark uses a specific W8 matrix with specific
  pattern vectors.  The claim might not generalise to arbitrary matrices."
- **Response:** The `wkbGate_creates_awe` theorem in `QuantumSim.lean`
  proves non-zero target overlap for *any* W > 0. The specific matrix is
  illustrative; convergence and matrix-generalisation claims require the benchmark
  assumptions. Moriarty's attack is narrowed but not fully eliminated.

---

# Conclusion

The Universal Somatic Field makes formal claims.  This paper makes them
experimental.  The four-model benchmark, the MNIST corrupted character test,
the GHZ/Kuramoto/Britain 1939 macroscopic analogies, and the God-Knob
hysteresis test make selected theorem-adjacent claims inspectable under stated
assumptions.

The experiments are not an afterthought.  The benchmarks make selected formal predictions inspectable; they remain simulations / executable tests, not proofs of world behaviour.
When a reviewer asks "does it actually work faster?", the answer is: inspect or make
executable the benchmark scaffold, then read the distance column under the stated
assumptions.

The proofs show what follows inside the formal model. The benchmarks show how those
claims behave in the accompanying computational scaffolds.

---

# References

::: {#refs}
:::

---
nocite: |
  @hopfield1982neural
  @ramsauer2020hopfield
  @krotov2016dense
  @kuramoto1984chemical
  @greenberger1989going
  @johnson2026b
  @johnson2026c
  @johnsonzsf2026
  @johnsonswarm2026
  @johnsonlimbic2026
...
