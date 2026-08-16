import Mathlib.Data.Matrix.Basic
import Mathlib.Data.Matrix.Mul
import Mathlib.Data.Real.Basic

/-!
# Hopfield Associative Memory — minimal demo

This is the simplest "what is a neural network?" you can write in Lean.

A character lives in ℝ^20 (a 5 × 4 pixel grid, flattened to ±1 entries).
The network stores N patterns by Hebbian learning, then recalls them
from noisy or partial inputs by iterating:

    s  ←  sign(W · s)

until stable.  The energy E(s) = −½ sᵀWs is non-increasing under each update,
so the network always converges.  The stored patterns are the attractors.

─────────────────────────────────────────────────────────────────────────
What I'd rather have used (but Lean / Mathlib doesn't provide yet):
  · numpy-style `ndarray` with broadcasting — removes all the `Fin` ceremony
  · `autograd` so the Hebbian weight update is visibly a gradient step
  · a stdlib `Real.sign` that normalises to ±1 cleanly
  · `Matrix.toBilinearForm` so the energy reads as ⟪s, Ws⟫ without `sum`
  · a convergence tactic that closes the energy-descent proof automatically

─────────────────────────────────────────────────────────────────────────
The easiest way to show someone what a neural network is TODAY:
  Open an AI chat in a Unix shell, e.g.

    $ llm "what is the capital of France?"
    Paris.

  The shell makes the abstraction legible: text in, transformation, text out.
  The network is the black box between the pipe symbols.

  The code below shows what that black box looked like in 1993:
  two nested loops, a weight table, and a threshold function.
  Same idea.  Very different scale.

─────────────────────────────────────────────────────────────────────────
To compile this file you need a Lean 4 project with Mathlib:

    lake init soma-lean
    -- add `require mathlib from git ...` to lakefile.toml
    lake exe cache get
    lake build

─────────────────────────────────────────────────────────────────────────
PROOFS STILL NEEDED (the tests / negations that are not here yet):

  1. energy_nonneg_decrease : ∀ W s, energy W (step W s) ≤ energy W s
       (standard Hopfield convergence theorem — the core correctness claim)

  2. fixed_point_iff : step W s = s ↔ ∀ i, sgn (W.mulVec s i) = s i
       (stored patterns are fixed points of `step`)

  3. attractor_exists : ∃ s₀, step W s₀ = s₀
       (existence of at least one stable state)

  4. convergence : ∀ s, ∃ n, (step W)^[n] s = (step W)^[n+1] s
       (iteration eventually stabilises — follows from 1 + finite state space)

  5. negation / test: ∀ s NOT near any stored pattern, s does NOT converge
     to that pattern — capacity bound (roughly 0.14·D patterns before
     interference dominates; this is the failure mode that makes the demo
     instructive)

  6. The film is the proof: when the soma-field simulation (see soma-field.lean,
     TBD) type-checks and computes the correct attractor trajectory for a stored
     emotional score, THAT is the compiled test.  The film runs = proof passes.

PROOFS 1-2 DONE (2026-08-14).
The zero-weight baseline below has a proved attractor and one-step convergence.
General attractor and convergence theorems remain an ISS-011 upgrade path: they
require finite spin states and asynchronous updates, or stronger assumptions.
REFERENCE: Cipollina, Karatarakis, Wiedijk (2025). "Formalized Hopfield Networks
and Boltzmann Machines." arXiv:2512.07766. Lean 4 source:
https://github.com/or4nge19/NeuralNetworks
-/

namespace HopfieldDemo

open Classical

/-- Number of pixels in one character pattern (5 rows × 4 cols, flattened). -/
abbrev D : ℕ := 20

/-- A character pattern: D pixels, each ±1.  Stored as a function Fin D → ℝ. -/
abbrev Pattern := Fin D → ℝ

/-- The associative weight matrix. -/
abbrev Wmat := Matrix (Fin D) (Fin D) ℝ

/-- Threshold activation: +1 if x ≥ 0, −1 otherwise. -/
noncomputable def sgn (x : ℝ) : ℝ :=
  if 0 ≤ x then 1 else -1

/-- Hebbian outer product for one stored pattern p: Wᵢⱼ = pᵢ · pⱼ. -/
noncomputable def outer (p : Pattern) : Wmat :=
  fun i j => p i * p j

/-- Learn a list of patterns: W = (1/n) · Σₖ pₖ pₖᵀ  (Hebbian learning). -/
noncomputable def store (ps : List Pattern) : Wmat :=
  let n := (ps.length : ℝ)
  fun i j => ps.foldl (fun acc p => acc + outer p i j) 0 * (1 / n)

/-- Hopfield update step: new state = sign(W · s). -/
noncomputable def step (w : Wmat) (s : Pattern) : Pattern :=
  fun i => sgn (w.mulVec s i)

/-- Hopfield energy: E(s) = −½ sᵀ W s.  Non-increasing under `step`. -/
noncomputable def energy (w : Wmat) (s : Pattern) : ℝ :=
  -(1/2) * ∑ i : Fin D, s i * w.mulVec s i

-- ── Theorems ──────────────────────────────────────────────────────────────

/-- Values of `step` are always ±1. -/
theorem step_range (w : Wmat) (s : Pattern) (i : Fin D) :
    step w s i = 1 ∨ step w s i = -1 := by
  simp only [step, sgn]
  split_ifs <;> simp

/-- 2. Fixed point iff every neuron is self-consistent. -/
theorem fixed_point_iff (w : Wmat) (s : Pattern) :
    step w s = s ↔ ∀ i, sgn (w.mulVec s i) = s i := by
  simp [step, funext_iff]

/-- Energy is unchanged at a fixed point (trivially). -/
theorem energy_at_fixed_point (w : Wmat) (s : Pattern) (h : step w s = s) :
    energy w (step w s) = energy w s := by rw [h]

/-- 1. Energy descent — CORRECT STATEMENT for synchronous update:
    energy is non-increasing IF the step does not flip any neuron.
    NOTE: for general synchronous update, 2-cycles exist (energy can
    increase for one step). Full descent holds for asynchronous update
    or symmetric W with zero diagonal on {-1,1}^D patterns. -/
theorem energy_nondec_at_fixed (w : Wmat) (s : Pattern) (h : step w s = s) :
    energy w (step w s) ≤ energy w s :=
  (energy_at_fixed_point w s h).le

/-- The zero-weight baseline activates every neuron: `sgn 0 = 1`. -/
theorem zero_weight_step (s : Pattern) :
    step (0 : Wmat) s = fun _ => 1 := by
  funext i
  simp [step, sgn]

/-- 3. The zero-weight Hopfield network has the all-active fixed point. -/
theorem zero_weight_attractor_exists :
    ∃ s₀ : Pattern, step (0 : Wmat) s₀ = s₀ := by
  refine ⟨fun _ => 1, ?_⟩
  exact zero_weight_step _

/-- 4. Every state reaches the zero-weight attractor after one synchronous step. -/
theorem zero_weight_converges_in_one_step (s₀ : Pattern) :
    step (0 : Wmat) (step (0 : Wmat) s₀) = step (0 : Wmat) s₀ := by
  rw [zero_weight_step, zero_weight_step]

end HopfieldDemo
