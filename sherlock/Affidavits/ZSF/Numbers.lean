/-!
# ZSF, part 1: the paper's own numbers (Sherlock affidavit, exhibit D)

Source: U `paper/soma/zoomable-somatic-field/zoomable-somatic-field.md` (P11,
*The Zoomable Universal Somatic Field*), frozen at repository commit
`3c97a44`, SHA-256
`79536841bf2e51c9f9eb849bea362de6fb8ec7ff57c0b289ed3eb24d17de0022`. Line
numbers below are of that text. Every value is the paper's; length scales are
the base-10 exponents in metres of the catalogue headings (lower bound where a
heading gives a range). Core Lean only.
-/

namespace Affidavit.ZSF.Numbers

/-! ## The scale catalogue -/

/-- Catalogue headings (lines 374-755): the levels each heading covers, and
the heading's length exponent. Scales 15-16, 17-18 and 19-20 share headings. -/
def headings : List (Nat × Nat × Int) := [
  (0, 0, -35), (1, 1, -32), (2, 2, -15), (3, 3, -10), (4, 4, -9), (5, 5, -6),
  (6, 6, -1), (7, 7, 0), (8, 8, 0), (9, 9, 3), (10, 10, 5), (11, 11, 6),
  (12, 12, 9), (13, 13, 11), (14, 14, 3), (15, 16, 20), (17, 18, 23), (19, 20, 26)]

def levelsCovered : Nat := (headings.map fun (lo, hi, _) => hi - lo + 1).foldl (· + ·) 0

/-- The catalogue covers 21 levels (as do the abstract, `Fin 21` and
⌈61/3⌉ = 21 on line 318), yet "the 20 levels", "the 20 named positions",
"The Twenty-Scale Catalogue", "the twenty scale levels" and "Twenty scales"
(lines 311, 312, 365, 367, 780) say twenty. -/
theorem levels_twenty_one_not_twenty :
    levelsCovered = 21 ∧ headings.length = 18 ∧ (26 - (-35) + 2) / 3 = 21 ∧ levelsCovered ≠ 20 := by
  decide

/-- The five transitions (lines 324-328) span 20 steps between the 21 levels:
"the 20 steps" (line 318) is right. -/
theorem transitions_twenty_steps :
    ([(0, 4), (4, 7), (7, 10), (10, 14), (14, 20)].map fun (a, b) => b - a).foldl (· + ·) 0 = 20 := by
  decide

def nondecreasing : List Int → Bool
  | a :: b :: rest => a ≤ b && nondecreasing (b :: rest)
  | _ => true

/-- The dial is not monotone in length: Scale 14, black holes and compact
objects (10³–10¹⁰ m, line 698), comes after Scale 13, stellar (10¹¹ m); the
first fourteen headings are in order. -/
theorem dial_not_monotone :
    nondecreasing (headings.map fun (_, _, e) => e) = false ∧
    nondecreasing ((headings.take 14).map fun (_, _, e) => e) = true := by
  decide

/-- "Twenty-five orders of magnitude" between the molecular double-well
(Scale 4, 10⁻⁹ m) and the limbic one (Scale 6, 10⁻¹ m), lines 492-495: the
paper's own headings give eight. -/
theorem molecular_limbic_eight_orders : (-1 : Int) - (-9) = 8 ∧ (8 : Int) ≠ 25 := by
  decide

/-! ## Values given twice -/

/-- Equation (10): mind rank N(σ) as a power of ten at σ = 2, 6, 15. -/
def equation10 : List (Nat × Nat) := [(2, 2), (6, 14), (15, 11)]

/-- The same ranks in the catalogue's "Mind matrix" entries (lines 440, 465,
536, 731), with Scale 3 (atomic) for comparison. -/
def catalogueRank : List (Nat × Nat) := [(2, 5), (3, 2), (6, 14), (15, 11)]

/-- Equation (10) and the abstract give N ≈ 10² at Scale 2 (nuclear); the
Scale 2 entry gives 10⁵. Scales 6 and 15 agree; 10² is Scale 3's value. -/
theorem nuclear_rank_differs :
    (equation10.filter fun (s, e) => catalogueRank.lookup s != some e) = [(2, 2)] ∧
    catalogueRank.lookup 3 = some 2 := by
  decide

/-- Scale 13 gives N ≈ 10⁶ oscillation modes (line 683) and, six lines
later, about 10⁷ acoustic modes (line 689). Exponents. -/
theorem stellar_modes_differ : (6 : Nat) ≠ 7 := by decide

/-- "The five axioms in §10" (line 1110): the §10 table has four rows
(lines 1034-1037). -/
theorem axioms_four_not_five :
    ["universe_is_11D_organism", "cosmological_correspondence", "classical_trapped",
      "quant_exp_1"].length = 4 := by
  decide

/-! ## Coordination cost -/

/-- "Reduce from O(N·K) to O(N²) with K = 1" (abstract, line 52): with
K = 1 the old cost N·1 is already below N² for every N ≥ 2. -/
theorem k_one_is_not_a_reduction (N : Nat) (h : 2 ≤ N) : N * 1 < N * N := by
  rw [Nat.mul_one]
  exact Nat.lt_mul_self_iff.mpr (by omega)

/-- What the paper's own theorem table states (`propagator_beats_classical`,
line 1024): N² < N·K exactly when K > N, a condition the abstract omits. -/
theorem reduction_iff (N K : Nat) (hN : 0 < N) : N * N < N * K ↔ N < K :=
  Nat.mul_lt_mul_left hN

/-! ## Checks that pass -/

/-- 11 = 4 + 3 + 1 + 3 and 7 = 3 + 1 + 3 (lines 213, 229); the energy ledger
7/11 + 3/11 + 1/11 = 1 (lines 789-797). -/
theorem dimensions_add_up : 4 + 3 + 1 + 3 = 11 ∧ 3 + 1 + 3 = 7 ∧ 7 + 3 + 1 = 11 := by
  decide

/-- The trauma well (line 849): dx/dt = −4Wx(x²−1) < 0 for x ∈ (−1, 0).
With x = −p/q, 0 < p < q, and W > 0: q³·dx/dt = 4Wp(p² − q²) < 0. -/
theorem trauma_gradient_negative (W p q : Int) (hW : 0 < W) (hp : 0 < p) (hpq : p < q) :
    4 * W * p * (p * p - q * q) < 0 := by
  have hsq : p * p < q * q := Int.mul_self_lt_mul_self (Int.le_of_lt hp) hpq
  have hpos : 0 < 4 * W * p := Int.mul_pos (Int.mul_pos (by decide) hW) hp
  exact Int.mul_neg_of_pos_of_neg hpos (by omega)

end Affidavit.ZSF.Numbers
