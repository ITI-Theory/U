import Mathlib.Data.Matrix.Basic

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
  · a stdlib `Float.sign` and a `Real.sign` that normalises to ±1 cleanly
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
-/

namespace HopfieldDemo

/-- Number of pixels in one character pattern (5 rows × 4 cols, flattened). -/
abbrev D : ℕ := 20

/-- A character pattern: D pixels, each ±1.  Stored as a function Fin D → Float
    because that is what Mathlib's Matrix.mulVec expects on the right. -/
abbrev Pattern := Fin D → Float

/-- The associative weight matrix. -/
abbrev Wmat := Matrix (Fin D) (Fin D) Float

/-- Threshold activation: +1 if x ≥ 0, −1 otherwise.
    Lean 4 does not have Float.sign in stdlib; we define it by hand. -/
def sgn (x : Float) : Float :=
  if x ≥ 0.0 then 1.0 else -1.0

/-- Hebbian outer product for one stored pattern p: Wᵢⱼ = pᵢ · pⱼ. -/
private def addWmat (a b : Wmat) : Wmat := fun i j => a i j + b i j
private def zeroWmat : Wmat := fun _ _ => 0.0
def outer (p : Pattern) : Wmat :=
  fun i j => p i * p j

/-- Learn a list of patterns: W = (1/n) · Σₖ pₖ pₖᵀ  (Hebbian learning).
    Each pattern lowers the energy at that state; patterns compete for capacity. -/
def store (ps : List Pattern) : Wmat :=
  let n := Float.ofNat ps.length
  fun i j => ps.foldl (fun acc p => acc + outer p i j) 0.0 * (1.0 / n)

/-- Float matrix-vector multiply (avoids NonUnitalNonAssocSemiring Float requirement). -/
private def mulVecH (w : Wmat) (s : Pattern) (i : Fin D) : Float :=
  (List.range D).foldl (fun acc j =>
    if h : j < D then acc + w i ⟨j, h⟩ * s ⟨j, h⟩ else acc) 0.0

/-- One synchronous recall step: new state = sign(W · s).
    Run this repeatedly until the state stops changing. -/
def step (w : Wmat) (s : Pattern) : Pattern :=
  fun i => sgn (mulVecH w s i)

/-- Dot product of two patterns. -/
private def dotH (u v : Pattern) : Float :=
  (List.range D).foldl (fun acc i =>
    if h : i < D then acc + u ⟨i, h⟩ * v ⟨i, h⟩ else acc) 0.0

/-- Hopfield energy: E(s) = −½ sᵀ W s.
    Lower energy = more stable state.
    Stored patterns are local minima.
    Proof obligation: this is non-increasing under `step`. -/
def energy (w : Wmat) (s : Pattern) : Float :=
  -0.5 * dotH s (mulVecH w s)

end HopfieldDemo
