/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Mathlib

/-!
# P25 · Path-Sensitive Transition Dynamics

[T]-Theory's twenty-fifth paper, as Lean. Source:
`paper/soma/path-sensitive-transitions/path-sensitive-transitions.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P25).

P25 asks whether a transition is fixed by its local barrier or by its whole route, proposes an
action `S[γ]` that charges routes, and states no Lean theorem. It names the first formal targets:
"equivalence to a barrier model when only the maximum potential matters; inequivalence when two
paths have the same maximum height but different cumulative costs; and hysteresis when forward and
reverse admissible sets differ". All three are proved here on a toy model: the soft-maximum action
`(1/β) log Σ e^{β V}` tends to the barrier (the maximum) as `β → ∞`; two routes over the same
maximum differ in cumulative cost; and a one-way edge makes onset and recovery take different
routes at different cost. The observable signatures and the comparison of accounts stay open.
-/

namespace TTheory.P25

open TTheory Filter Topology Real Finset

/-! ## The barrier account as a limit

A route visits states with potentials `z₀, …, z_{n-1}`. The soft-maximum action
`A_β = (1/β) log Σ e^{β zᵢ}` lies between the barrier `max z` and `max z + log n / β`. -/

noncomputable def softAction {n : ℕ} (β : ℝ) (z : Fin n → ℝ) : ℝ :=
  (1 / β) * Real.log (∑ i, Real.exp (β * z i))

theorem soft_bounds {n : ℕ} (hn : 0 < n) (z : Fin n → ℝ) {β : ℝ} (hβ : 0 < β) :
    univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z ≤ softAction β z ∧
    softAction β z ≤ univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z + Real.log n / β := by
  set M := univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z
  obtain ⟨k, -, hk⟩ := exists_mem_eq_sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z
  have hpos : 0 < ∑ i, Real.exp (β * z i) :=
    sum_pos (fun i _ => Real.exp_pos _) (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩)
  have hle : ∀ i, z i ≤ M := fun i => le_sup' z (mem_univ i)
  unfold softAction
  constructor
  · have hMk : M = z k := hk
    rw [hMk, one_div, ← div_eq_inv_mul, le_div_iff₀ hβ]
    calc z k * β = Real.log (Real.exp (β * z k)) := by rw [Real.log_exp]; ring
      _ ≤ Real.log (∑ i, Real.exp (β * z i)) :=
        Real.log_le_log (Real.exp_pos _) (single_le_sum (f := fun i => Real.exp (β * z i))
          (fun i _ => (Real.exp_pos _).le) (mem_univ k))
  · have hsum : ∑ i, Real.exp (β * z i) ≤ n * Real.exp (β * M) := by
      calc ∑ i, Real.exp (β * z i) ≤ ∑ _i : Fin n, Real.exp (β * M) :=
            sum_le_sum fun i _ => Real.exp_le_exp.mpr (by nlinarith [hle i])
        _ = n * Real.exp (β * M) := by simp
    have hlog : Real.log (∑ i, Real.exp (β * z i)) ≤ Real.log n + β * M := by
      calc Real.log (∑ i, Real.exp (β * z i)) ≤ Real.log (n * Real.exp (β * M)) :=
            Real.log_le_log hpos hsum
        _ = Real.log n + β * M := by
            rw [Real.log_mul (by exact_mod_cast hn.ne') (Real.exp_pos _).ne', Real.log_exp]
    rw [one_div, ← div_eq_inv_mul, div_le_iff₀ hβ]
    have : (M + Real.log n / β) * β = β * M + Real.log n := by field_simp
    rw [this]; linarith

theorem barrier_limit {n : ℕ} (hn : 0 < n) (z : Fin n → ℝ) :
    Tendsto (fun β => softAction β z) atTop
      (𝓝 (univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z)) := by
  set M := univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z
  have hup : Tendsto (fun β : ℝ => M + Real.log n / β) atTop (𝓝 (M + 0)) :=
    tendsto_const_nhds.add (tendsto_const_nhds.div_atTop tendsto_id)
  rw [add_zero] at hup
  refine tendsto_of_tendsto_of_tendsto_of_le_of_le' tendsto_const_nhds hup ?_ ?_
  · filter_upwards [eventually_gt_atTop 0] with β hβ using (soft_bounds hn z hβ).1
  · filter_upwards [eventually_gt_atTop 0] with β hβ using (soft_bounds hn z hβ).2

/-! ## Same barrier, different cost

Two routes from one basin to the other over the same saddle (potential `1`): one crosses it
once, the other lingers on the ridge. -/

def quick : List ℕ := [0, 1, 0]
def lingering : List ℕ := [0, 1, 1, 1, 0]

theorem same_barrier : quick.maximum = lingering.maximum ∧ quick.sum ≠ lingering.sum := by decide

/-! ## Hysteresis

Three states, `calm`, `stuck`, `bridge`, with a one-way edge `calm → stuck` (onset is a fall) and
the way back only through `bridge`. A route is a list whose consecutive states are joined by an
edge. -/

inductive State | calm | stuck | bridge
  deriving DecidableEq, Repr

open State

def edge : State → State → Bool
  | calm, stuck => true
  | stuck, bridge => true
  | bridge, calm => true
  | _, _ => false

def admissible : List State → Bool
  | a :: b :: rest => edge a b && admissible (b :: rest)
  | _ => true

def cost : State → ℕ
  | calm => 0 | stuck => 2 | bridge => 3

theorem hysteresis : admissible [calm, stuck] = true ∧ admissible [stuck, calm] = false ∧
    admissible [stuck, bridge, calm] = true ∧
    ([calm, stuck].map cost).sum ≠ ([stuck, bridge, calm].map cost).sum := by decide

/-! ## P25's claims -/

def cLimit : Claim where
  id := "P25.barrier-limit"
  text := "The landscape account is recovered as a limiting case when the dominant cost is a local \
    potential barrier: the soft-maximum action tends to the barrier height."
  statement := ∀ (n : ℕ) (hn : 0 < n) (z : Fin n → ℝ),
    Tendsto (fun β => softAction β z) atTop
      (𝓝 (univ.sup' (univ_nonempty_iff.mpr ⟨⟨0, hn⟩⟩) z))

instance : Witness cLimit := .of fun _ hn z => barrier_limit hn z

def cInequivalent : Claim where
  id := "P25.inequivalent"
  text := "Inequivalence when two paths have the same maximum height but different cumulative \
    costs."
  statement := quick.maximum = lingering.maximum ∧ quick.sum ≠ lingering.sum

instance : Witness cInequivalent := .of same_barrier

def cHysteresis : Claim where
  id := "P25.hysteresis"
  text := "Hysteresis when forward and reverse admissible sets differ: onset and recovery follow \
    different routes, at different cost."
  statement := admissible [calm, stuck] = true ∧ admissible [stuck, calm] = false ∧
    admissible [stuck, bridge, calm] = true ∧
    ([calm, stuck].map cost).sum ≠ ([stuck, bridge, calm].map cost).sum

instance : Witness cHysteresis := .of hysteresis

/-- The four observable signatures, each a pre-registered study's result. -/
opaque signature : Fin 4 → Prop

def signatureText : List String :=
  ["Two histories reaching the same measured point differ in later transition probability or \
    recovery time.",
   "Onset and recovery follow different routes, not the same route in reverse.",
   "Dwell-time distributions show mixtures, heavy tails or stage structure when the route has \
    several bottlenecks.",
   "Interventions targeted at a small bottleneck step outperform interventions scaled only to the \
    nominal barrier height."]

def cSignature (i : Fin 4) : Claim where
  id := s!"P25.signature-{i.val + 1}"
  text := signatureText.getD i.val ""
  statement := signature i

/-- That path summaries or action estimates improve prediction after the local barrier is known. -/
opaque pathBeatsBarrier : Prop

def cAccounts : Claim where
  id := "P25.accounts"
  text := "A distributed path-cost account improves prediction beyond the local barrier model."
  statement := pathBeatsBarrier

/-- P25's claims, in the paper's order. -/
def claims : List Claim :=
  [cLimit, cAccounts] ++ (List.finRange 4).map cSignature ++ [cInequivalent, cHysteresis]

#status claims

end TTheory.P25
