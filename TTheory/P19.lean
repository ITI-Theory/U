/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P12

/-!
# P19 · Single-Step Multi-Agent Coordination via Green's Function Propagators

[T]-Theory's nineteenth paper, as Lean. Source: `paper/soma/swarm-propagator/swarm-propagator.md`;
its id, title and DOI are in `Dist/PAPERS.yaml` (P19).

P19 replaces `K` rounds of neighbour averaging (`N·K` operations) by one product `s' = G·s`
(`N²`). Its cost theorems are `SwarmPropagator.lean`'s and hold (with `N > 0`, which the paper's
statement leaves out); its table and figures check, and the protocol matrix's eigenvalues are
`1/2`, `3/5` and `1`. Two things do not: `G` as "the Gram matrix of the field's Green's function,
`G_ij = G(p_i, p_j)`" with `G = e^{ik|x-x'|}/(4π|x-x'|)` has no diagonal (the function diverges at
`x = x'`); and the scale table's "5 (biological): Neural EMF (CEMI)" is Scale 7 on the dial the
paper cites (`TTheory.P19.Dial`: the dial's module imports Physlib, whose `SpaceTime` clashes with
OSforGFF's, so it cannot share an environment with P14 and is not imported by `TTheory`). A `G`
that does what the protocol asks, every state to consensus in one step with the total kept, is
forced: the dense averaging matrix `𝟙𝟙ᵀ/N`, whatever the field. The global optimality axiom is
P12's, and inconsistent.
-/

namespace TTheory.P19

open TTheory Filter Topology SomaField.SwarmPropagator

/-! ## The figures and the table -/

/-- The row-stochastic coupling of the first figure ("the program checked the displayed matrix
    sum", `3`). -/
def wRow : Matrix (Fin 3) (Fin 3) ℚ := !![0.6, 0.3, 0.1; 0.2, 0.6, 0.2; 0.1, 0.3, 0.6]

/-- The ring of five: "its rows sum to 1 (checked, doubly stochastic)". -/
def wRing : Matrix (Fin 5) (Fin 5) ℚ :=
  !![1/3, 1/3, 0, 0, 1/3; 1/3, 1/3, 1/3, 0, 0; 0, 1/3, 1/3, 1/3, 0; 0, 0, 1/3, 1/3, 1/3;
    1/3, 0, 0, 1/3, 1/3]

/-- The protocol's transition matrix shifted by `λ`: "the eigenvalues are checked",
    `0.5, 0.6, 1`. -/
def shifted (l : ℚ) : Matrix (Fin 3) (Fin 3) ℚ :=
  !![0.7 - l, 0.2, 0.1; 0.1, 0.8 - l, 0.1; 0.2, 0.2, 0.6 - l]

theorem figures : ∑ i, ∑ j, wRow i j = 3 ∧
    (∀ i, ∑ j, wRing i j = 1 ∧ ∑ j, wRing j i = 1) ∧
    (shifted (1 / 2)).det = 0 ∧ (shifted (3 / 5)).det = 0 ∧ (shifted 1).det = 0 := by
  refine ⟨?_, ?_, ?_, ?_, ?_⟩
  · simp [wRow, Fin.sum_univ_three]; norm_num
  · intro i; fin_cases i <;> simp [wRing, Fin.sum_univ_five] <;> norm_num
  all_goals simp [shifted, Matrix.det_fin_three]; norm_num

/-- The complexity table: `(N, K, classical, propagator, speedup)`. -/
def table : List (ℕ × ℕ × ℕ × ℕ × ℕ) :=
  [(100, 100, 10000, 10000, 1), (100, 500, 50000, 10000, 5), (100, 1000, 100000, 10000, 10),
    (100, 5000, 500000, 10000, 50), (1000, 1000, 1000000, 1000000, 1),
    (1000, 5000, 5000000, 1000000, 5)]

/-- Each row is `N·K`, `N²` and `K/N`, and the table is `SwarmPropagator.speedupDemo`. -/
theorem table_checks : table.all (fun (N, K, c, p, sp) => c == N * K && p == N * N && sp * N == K)
    ∧ table.map (fun (N, K, c, p, _) => (N, K, c, p)) = speedupDemo := by decide

/-! ## The Gram matrix

"`G_ij = G(p_i, p_j)`" with "`G(x, x') = e^{ik|x-x'|}/(4π|x-x'|)`": on the diagonal `|x - x'| = 0`,
and the real part `cos(kr)/(4πr)` (P11's `green`) grows without bound as `r → 0`. -/

theorem green_diverges (k : ℝ) : Tendsto (P11.green k) (𝓝[>] 0) atTop := by
  have hcos : Tendsto (fun r => Real.cos (k * r)) (𝓝[>] 0) (𝓝 1) := by
    have : Tendsto (fun r => Real.cos (k * r)) (𝓝 0) (𝓝 (Real.cos (k * 0))) :=
      (Real.continuous_cos.comp (continuous_const.mul continuous_id)).tendsto 0
    simpa using this.mono_left nhdsWithin_le_nhds
  have hinv : Tendsto (fun r : ℝ => (4 * Real.pi)⁻¹ * r⁻¹) (𝓝[>] 0) atTop :=
    tendsto_inv_nhdsGT_zero.const_mul_atTop (by positivity)
  have := hcos.pos_mul_atTop one_pos hinv
  refine this.congr fun r => ?_
  unfold P11.green
  rw [div_eq_mul_inv]; ring

/-! ## One-step consensus

"For the protocol to replace `K`-round message passing as a correct consensus algorithm, `G` must
... map any initial state `s` to the field's stationary distribution": every state to a constant,
the total kept. Then `G` is the averaging matrix: `G e_j` is a constant column summing to `1`. -/

theorem consensus_forces_average {n : ℕ} (G : Matrix (Fin n) (Fin n) ℝ)
    (hc : ∀ s : Fin n → ℝ, ∃ c : ℝ, G.mulVec s = fun _ => c)
    (hsum : ∀ s : Fin n → ℝ, ∑ i, G.mulVec s i = ∑ i, s i) : ∀ i j, G i j = 1 / n := by
  intro i j
  obtain ⟨c, hcj⟩ := hc (Pi.single j 1)
  have hcol : ∀ i, G i j = c := fun i => by
    have := congrFun hcj i
    simpa [Matrix.mulVec, dotProduct, Pi.single_apply] using this
  have hs := hsum (Pi.single j 1)
  rw [hcj] at hs
  simp at hs
  have hn : (n : ℝ) ≠ 0 := by
    rintro h; rw [h, zero_mul] at hs; exact zero_ne_one hs
  rw [hcol i, eq_div_iff hn, mul_comm]; exact hs

/-! ## P19's claims -/

def cCost : Claim where
  id := "P19.cost"
  text := "propagator_beats_classical (N² < N·K for K > N), breakeven_at_N, \
    classical_wins_single_round, speedup_monotone_in_K, jam_resistant (one evaluation)."
  statement := (∀ N K, 0 < N → N < K → propagatorCost N < classicalCost N K) ∧
    (∀ N, propagatorCost N = classicalCost N N) ∧
    (∀ N, 1 < N → classicalCost N 1 < propagatorCost N) ∧
    (∀ N K₁ K₂, 0 < N → K₁ < K₂ → speedupRatio N K₁ < speedupRatio N K₂) ∧
    (∀ n (G : Propagator n) (s : SwarmState n), propagatorStep G s = G.mulVec s)

instance : Witness cCost := .of ⟨propagator_beats_classical, breakeven_at_N,
  classical_wins_single_round, speedup_monotone_in_K, jam_resistant⟩

def cTable : Claim where
  id := "P19.table"
  text := "The complexity table (100 × 5000: 50×) and the figures: the row sums, the ring doubly \
    stochastic, the protocol's eigenvalues 0.5, 0.6 and 1."
  statement := (table.all (fun (N, K, c, p, sp) => c == N * K && p == N * N && sp * N == K) ∧
      table.map (fun (N, K, c, p, _) => (N, K, c, p)) = speedupDemo) ∧
    (∑ i, ∑ j, wRow i j = 3 ∧ (∀ i, ∑ j, wRing i j = 1 ∧ ∑ j, wRing j i = 1) ∧
      (shifted (1 / 2)).det = 0 ∧ (shifted (3 / 5)).det = 0 ∧ (shifted 1).det = 0)

instance : Witness cTable := .of ⟨table_checks, figures⟩

def cGram : Claim where
  id := "P19.gram"
  text := "The propagator matrix G ∈ ℝ^{N×N} is the Gram matrix of the field's Green's function, \
    G_ij = G(p_i, p_j), with G(x, x') = e^{ik|x-x'|}/(4π|x-x'|)."
  statement := ∃ c : ℝ, Tendsto (P11.green 1) (𝓝[>] 0) (𝓝 c)

/-- Its diagonal, `G(p_i, p_i)`, is the limit `r → 0`, and that diverges. -/
instance : Refutation cGram :=
  .of fun ⟨c, h⟩ => not_tendsto_nhds_of_tendsto_atTop (green_diverges 1) c h

def cConsensus : Claim where
  id := "P19.consensus"
  text := "For the protocol to be a correct consensus algorithm, G·s maps any initial state to the \
    stationary distribution: then G is the dense averaging matrix 11ᵀ/N."
  statement := ∀ (n : ℕ) (G : Matrix (Fin n) (Fin n) ℝ),
    (∀ s : Fin n → ℝ, ∃ c : ℝ, G.mulVec s = fun _ => c) →
    (∀ s : Fin n → ℝ, ∑ i, G.mulVec s i = ∑ i, s i) → ∀ i j, G i j = 1 / n

instance : Witness cConsensus := .of fun _ G hc hs => consensus_forces_average G hc hs

def cOptimality : Claim where
  id := "P19.optimality"
  text := "greens_achieves_minimum_energy (SwarmPropagator.lean): stated as an axiom pending PDE \
    scaffolding."
  statement := P12.cSwarmAxiom.statement

instance [h : Witness P12.cSwarmAxiom] : Witness cOptimality := .of h.proof
instance [r : Refutation P12.cSwarmAxiom] : Refutation cOptimality := .of r.disproof

/-- P19's claims, in the paper's order. -/
def claims : List Claim := [cTable, cGram, cConsensus, cCost, cOptimality]

#status claims

end TTheory.P19
