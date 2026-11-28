/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import BRECVEMAVariational

/-!
# P24 · G₂ Symmetry Breaking in the Universal Somatic Field

[T]-Theory's twenty-fourth paper, as Lean. Source:
`paper/soma/g2-symmetry-breaking/g2-symmetry-breaking.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P24).

P24 splits the BRECVEMA coupling `W₈` into the `G₂`-invariant `(6/5) I₈` and a traceless `δW`. The
model's `W8ℝ` is the paper's table, entry by entry; the split is the only one of its kind (the
multiple of `I` is fixed by the trace); `‖δW‖²_F = 3.52` and `‖W₈‖²_F = 15.04` exactly, so
`‖δW‖_F = 1.876` and the ratio `0.484` check, and the listed eigenvalues sum to zero and their
squares to `3.52`, as they must. Three statements do not hold: `‖W₈‖_F` is `3.878`, not `3.877`;
"each coupling relaxes toward 6/5" (the `G₂` ideal's couplings between mechanisms are `0`, as the
same paragraph's "return to zero" says); and the `G₂`-holonomy axiom's hypotheses (trace zero, a
zero row sum) fail for the model's own matrix (trace `48/5`), as its file notes.
-/

namespace TTheory.P24

open TTheory

/-- The paper's table of couplings, in the order BS, RE, EC, CO, VI, EM, ME, AJ. -/
noncomputable def table : Matrix (Fin 8) (Fin 8) ℝ :=
  !![6/5, 0, 3/10, 2/5, 0, 0, 0, -2/5;
     0, 6/5, 0, 1/2, 0, 0, 0, 0;
     3/10, 0, 6/5, 2/5, -3/10, 0, 0, 0;
     2/5, 1/2, 2/5, 6/5, 0, 0, 0, 0;
     0, 0, -3/10, 0, 6/5, 3/5, 0, 0;
     0, 0, 0, 0, 3/5, 6/5, 0, 0;
     0, 0, 0, 0, 0, 0, 6/5, 7/10;
     -2/5, 0, 0, 0, 0, 0, 7/10, 6/5]

/-- `W8ℝ` (SomaField.lean) is the table. -/
theorem w8_is_table : W8ℝ = table := by
  ext i j; fin_cases i <;> fin_cases j <;> rfl

/-- The symmetry-breaking part. -/
noncomputable def δW : Matrix (Fin 8) (Fin 8) ℝ := W8ℝ - (6 / 5 : ℝ) • 1

theorem norms : ∑ i, ∑ j, (δW i j) ^ 2 = 3.52 ∧ ∑ i, ∑ j, (W8ℝ i j) ^ 2 = 15.04 := by
  simp only [δW, w8_is_table, Matrix.sub_apply, Matrix.smul_apply, Matrix.one_apply]
  constructor <;> simp [table, Fin.sum_univ_eight] <;> norm_num

/-- `trace W8ℝ = 48/5`, from `brecvema_G2_decomposition`. -/
theorem trace_w8 : Matrix.trace W8ℝ = 48 / 5 := by
  have h := brecvema_G2_decomposition
  rw [Matrix.trace_sub, Matrix.trace_smul, Matrix.trace_one] at h
  simp at h
  linarith

/-- "The unique decomposition": a multiple of `I` plus a traceless part fixes the multiple. -/
theorem unique (l : ℝ) (D : Matrix (Fin 8) (Fin 8) ℝ) (h : W8ℝ = l • 1 + D)
    (hD : Matrix.trace D = 0) : l = 6 / 5 := by
  have := congrArg Matrix.trace h
  rw [trace_w8, Matrix.trace_add, Matrix.trace_smul, Matrix.trace_one, hD] at this
  simp at this
  linarith

/-! ## P24's claims -/

def cDecomposition : Claim where
  id := "P24.decomposition"
  text := "W₈ (the table of author-chosen couplings) decomposes uniquely as W₈ = (6/5) I₈ + δW \
    with δW traceless (brecvema_G2_decomposition)."
  statement := W8ℝ = table ∧ Matrix.trace (W8ℝ - (6 / 5 : ℝ) • (1 : Matrix (Fin 8) (Fin 8) ℝ)) = 0 ∧
    ∀ (l : ℝ) (D : Matrix (Fin 8) (Fin 8) ℝ), W8ℝ = l • 1 + D → Matrix.trace D = 0 → l = 6 / 5

instance : Witness cDecomposition := .of ⟨w8_is_table, brecvema_G2_decomposition, unique⟩

def cNorms : Claim where
  id := "P24.norms"
  text := "‖δW‖_F = 1.876 and ‖δW‖_F/‖W₈‖_F = 0.484 (48.4% symmetry broken); the eigenvalues of \
    δW, 0.984, 0.718, 0.591, 0.113, -0.226, -0.585, -0.742, -0.855, sum to zero."
  statement := (∑ i, ∑ j, (δW i j) ^ 2 = 3.52 ∧ ∑ i, ∑ j, (W8ℝ i j) ^ 2 = 15.04) ∧
    ((1.8755 : ℝ) ^ 2 < 3.52 ∧ (3.52 : ℝ) < 1.8765 ^ 2) ∧
    ((0.4835 : ℝ) ^ 2 < 3.52 / 15.04 ∧ (3.52 : ℝ) / 15.04 < 0.4845 ^ 2) ∧
    |(0.984 + 0.718 + 0.591 + 0.113 - 0.226 - 0.585 - 0.742 - 0.855 : ℝ)| ≤ 0.004 ∧
    |(0.984 ^ 2 + 0.718 ^ 2 + 0.591 ^ 2 + 0.113 ^ 2 + 0.226 ^ 2 + 0.585 ^ 2 + 0.742 ^ 2 +
      0.855 ^ 2 : ℝ) - 3.52| < 0.005

instance : Witness cNorms := .of ⟨norms, by norm_num, by norm_num, by norm_num [abs_le],
  by norm_num [abs_lt]⟩

def cNormW : Claim where
  id := "P24.norm-w8"
  text := "‖W₈‖_F = 3.877 (to three places)."
  statement := (3.8765 : ℝ) ^ 2 ≤ 15.04 ∧ (15.04 : ℝ) < 3.8775 ^ 2

/-- `‖W₈‖²_F = 15.04`, so `‖W₈‖_F = 3.8781...`: `3.878`. -/
instance : Refutation cNormW := .of fun h => by
  have h' : (3.8765 : ℝ) ^ 2 ≤ 15.04 ∧ (15.04 : ℝ) < 3.8775 ^ 2 := h
  norm_num at h'

def cRelax : Claim where
  id := "P24.relax"
  text := "Healthy processing: each coupling relaxes toward 6/5, the coupling of the G₂-symmetric \
    ideal W_G₂ = (6/5) I₈, in which all eight mechanisms are equally coupled."
  statement := ∀ i j : Fin 8, i ≠ j → ((6 / 5 : ℝ) • (1 : Matrix (Fin 8) (Fin 8) ℝ)) i j = 6 / 5

/-- Between two mechanisms the ideal's coupling is `0`: they are uncoupled, not coupled at `6/5`. -/
instance : Refutation cRelax := .of fun h => by
  have := h 0 1 (by decide)
  simp at this
  norm_num at this

def cHolonomy : Claim where
  id := "P24.holonomy"
  text := "moduli_space_is_G2_homotopy (open formalisation): the G₂-holonomy target for the \
    model's coupling, whose hypotheses include trace zero (the Ricci-flat condition)."
  statement := Matrix.trace W8ℝ = 0

/-- The model's trace is `48/5`: the axiom does not apply to `W8ℝ` (its file says so). -/
instance : Refutation cHolonomy := .of fun h => by
  have h' : Matrix.trace W8ℝ = 0 := h
  rw [trace_w8] at h'; norm_num at h'

/-- Schur: a `G₂`-invariant matrix on `ℝ⁸ = ℝ¹ ⊕ ℝ⁷` is `λ₀P₀ + λ₁P₁` ("interpretation requires
    Lie-theory formalisation"). -/
opaque schurG2 : Prop

def cSchur : Claim where
  id := "P24.schur"
  text := "By Schur's lemma, since ℝ⁸ decomposes under G₂ as ℝ¹ ⊕ ℝ⁷, a G₂-invariant matrix is \
    λ₀P₀ + λ₁P₁."
  statement := schurG2

/-- P24's claims, in the paper's order. -/
def claims : List Claim := [cSchur, cDecomposition, cNorms, cNormW, cRelax, cHolonomy]

#status claims

end TTheory.P24
