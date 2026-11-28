/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2
import Mathlib.Analysis.SpecialFunctions.Trigonometric.DerivHyp

/-!
# P6 · A Voyage into Trauma

*The Soma-Field as Lived Experience*

[T]-Theory's sixth document, the book, as Lean. Source:
`paper/soma/soma-field-book/soma-field-book.md`; its id, title and DOI are in `Dist/PAPERS.yaml`
(P6).

The book tells the model in plain words and gives the mathematics in Appendix A. What is checked
here: the structural fraction `f(τ_d) = tanh(τ_d/τ_c)` and the values the book quotes (0.76 at
`τ_c`, 0.46 at the author's 18 months), the book's own Lean sketch (now proved), Appendix A.5's
blended entries, and the illustrative coupling matrices of its figures, exactly: their sums, their
Calm-Shame entry (the slip of October, kept fixed), and the direction of the C-PTSD asymmetry, where
the figures disagree with each other.
-/

namespace TTheory.P6

open TTheory

/-! ## The structural fraction

"`f(τ_d) = tanh(τ_d/τ_c)`, `τ_c ≈ 36` months. At `τ_d = τ_c`: `f = tanh(1) ≈ 0.76` ... My
developmental age at trauma: `τ_d ≈ 18` months ... `f(18/36) = tanh(0.5) ≈ 0.46`." -/

/-- `tanh x = (e^{2x} - 1)/(e^{2x} + 1)`. -/
theorem tanh_eq (x : ℝ) : Real.tanh x = (Real.exp (2 * x) - 1) / (Real.exp (2 * x) + 1) := by
  have hx := Real.exp_pos x
  have h2 : Real.exp (2 * x) = Real.exp x * Real.exp x := by
    rw [← Real.exp_add]; ring_nf
  rw [Real.tanh_eq_sinh_div_cosh, Real.sinh_eq, Real.cosh_eq, Real.exp_neg, h2]
  field_simp

/-- `tanh` is strictly increasing. -/
theorem tanh_lt_tanh {a b : ℝ} (h : a < b) : Real.tanh a < Real.tanh b := by
  rw [tanh_eq, tanh_eq]
  have hab := Real.exp_lt_exp.mpr (by linarith : 2 * a < 2 * b)
  have pa := Real.exp_pos (2 * a)
  rw [div_lt_div_iff₀ (by positivity) (by positivity)]
  nlinarith

/-- `tanh 1 = 0.7616` to four places. -/
theorem tanh_one : 0.7615 < Real.tanh 1 ∧ Real.tanh 1 < 0.7617 := by
  have lo := Real.exp_one_gt_d9
  have hi := Real.exp_one_lt_d9
  have h2 : Real.exp (2 * 1) = Real.exp 1 * Real.exp 1 := by
    rw [← Real.exp_add]; ring_nf
  rw [tanh_eq, h2]
  have p : 0 < Real.exp 1 * Real.exp 1 + 1 := by positivity
  constructor
  · rw [lt_div_iff₀ p]; nlinarith
  · rw [div_lt_iff₀ p]; nlinarith

/-- `tanh 0.5 = 0.4621` to four places. -/
theorem tanh_half : 0.4621 < Real.tanh 0.5 ∧ Real.tanh 0.5 < 0.4622 := by
  have lo := Real.exp_one_gt_d9
  have hi := Real.exp_one_lt_d9
  rw [tanh_eq, show (2 : ℝ) * 0.5 = 1 by norm_num]
  have p : 0 < Real.exp 1 + 1 := by positivity
  constructor
  · rw [lt_div_iff₀ p]; nlinarith
  · rw [div_lt_iff₀ p]; nlinarith

/-- The book's sketch ("for pre-verbal trauma ... the neurotypical structural fraction is below
    `tanh(1)`"), proved: below `τ_c` the fraction is below `tanh 1`. -/
theorem preverbal_fraction {τ : ℝ} (h : τ < 36) : Real.tanh (τ / 36) < Real.tanh 1 :=
  tanh_lt_tanh (by rw [div_lt_one (by norm_num)]; exact h)

/-! ## Appendix A.5: the blend

"`W(τ_d) = f(τ_d)·W₀ + (1 - f(τ_d))·W_trauma`", and its figure at `f = tanh 1`: the Fear-Shame
entries 0.3477 and 0.2523, from A.3's `W₀` (0.3 both ways) and `W_C-PTSD` (0.5 and 0.1). -/

/-- One entry of the blend. -/
noncomputable def blend (f w₀ wt : ℝ) : ℝ := f * w₀ + (1 - f) * wt

theorem blend_entries :
    |blend (Real.tanh 1) 0.3 0.5 - 0.3477| < 0.0001 ∧
    |blend (Real.tanh 1) 0.3 0.1 - 0.2523| < 0.0001 := by
  obtain ⟨lo, hi⟩ := tanh_one
  unfold blend
  constructor <;> rw [abs_lt] <;> constructor <;> nlinarith

/-! ## The figures' matrices, exactly

Rows and columns in the figures' order: Fear, Shame, Calm, Anger (4 × 4, "The Modification") and
Fear, Shame, Calm (3 × 3, Appendix A.3). By A.2, `ė = We + θ + σ₀η`: entry `W i j` is how strongly
mode `j` drives mode `i`. -/

/-- "The Modification": the baseline `W₀` (symmetric). -/
def w4Base : Fin 4 → Fin 4 → ℚ :=
  ![![0, 3/10, -2/5, 1/5], ![3/10, 0, -3/10, 1/10], ![-2/5, -3/10, 0, -1/5], ![1/5, 1/10, -1/5, 0]]

/-- "The Modification": `W_C-PTSD`, the Shame-from-Fear entry raised to 0.6. -/
def w4CPTSD : Fin 4 → Fin 4 → ℚ :=
  ![![0, 3/10, -2/5, 1/5], ![3/5, 0, -3/10, 1/10], ![-2/5, -3/10, 0, -1/5], ![1/5, 1/10, -1/5, 0]]

/-- Appendix A.3: the baseline `W₀`. -/
def w3Base : Fin 3 → Fin 3 → ℚ :=
  ![![0, 3/10, -2/5], ![3/10, 0, -3/10], ![-2/5, -3/10, 0]]

/-- Appendix A.3: `W_C-PTSD`. -/
def w3CPTSD : Fin 3 → Fin 3 → ℚ :=
  ![![0, 1/2, -2/5], ![1/10, 0, -3/10], ![-2/5, -3/10, 0]]

/-- "The program checked that `W₀`'s entries sum to the stated illustrative total": −0.6. -/
theorem w4Base_sum : ∑ i, ∑ j, w4Base i j = -3/5 := by
  simp [w4Base, Fin.sum_univ_four]; norm_num

/-- The Calm-Shame coupling is −0.3 in every figure's baseline (the October slip stays fixed). -/
theorem calm_shame : w4Base 1 2 = -3/10 ∧ w4Base 2 1 = -3/10 ∧ w3Base 1 2 = -3/10 ∧
    w3Base 2 1 = -3/10 := by
  simp [w4Base, w3Base]

/-- A.3: "`ΔW_ij ≠ ΔW_ji`": the modification is not symmetric. -/
theorem delta_asymmetric : w3CPTSD 0 1 - w3Base 0 1 ≠ w3CPTSD 1 0 - w3Base 1 0 := by
  simp [w3CPTSD, w3Base]

/-- The text: "fear activates shame more strongly than shame activates fear". In the 4 × 4 figure,
    yes: Shame-from-Fear 0.6, Fear-from-Shame 0.3. -/
theorem fig4_direction : w4CPTSD 0 1 < w4CPTSD 1 0 := by
  simp [w4CPTSD]; norm_num

/-- In A.3's figure, the other way round: Fear-from-Shame 0.5, Shame-from-Fear 0.1. -/
theorem figA3_direction : w3CPTSD 1 0 < w3CPTSD 0 1 := by
  simp [w3CPTSD]; norm_num

/-! ## P6's claims -/

def cFraction : Claim where
  id := "P6.fraction"
  text := "At τ_d = τ_c, f = tanh(1) ≈ 0.76; at the author's 18 months, f(18/36) = tanh(0.5) \
    ≈ 0.46."
  statement := (0.7615 < Real.tanh 1 ∧ Real.tanh 1 < 0.7617) ∧
    (0.4621 < Real.tanh 0.5 ∧ Real.tanh 0.5 < 0.4622)

instance : Witness cFraction := .of ⟨tanh_one, tanh_half⟩

def cPreverbal : Claim where
  id := "P6.preverbal"
  text := "For pre-verbal trauma (τ_d < τ_c) the neurotypical structural fraction is below \
    tanh(1): more than 24% of the coupling is trauma-formed."
  statement := ∀ τ : ℝ, τ < 36 → Real.tanh (τ / 36) < Real.tanh 1

instance : Witness cPreverbal := .of fun _ h => preverbal_fraction h

def cBlend : Claim where
  id := "P6.blend"
  text := "Appendix A.5: at f = tanh(1) the Fear-Shame entries of W(τ_c) are 0.3477 and 0.2523."
  statement := |blend (Real.tanh 1) 0.3 0.5 - 0.3477| < 0.0001 ∧
    |blend (Real.tanh 1) 0.3 0.1 - 0.2523| < 0.0001

instance : Witness cBlend := .of blend_entries

def cEnergy : Claim where
  id := "P6.A1"
  text := "Appendix A.1: H(e) = -½eᵀWe - θᵀe, the paper's Hamiltonian."
  statement := P2.cRecap.statement

instance [h : Witness P2.cRecap] : Witness cEnergy := .of h.proof

def cFigures : Claim where
  id := "P6.figures"
  text := "The figures' baselines: entries summing to -0.6, Calm-Shame -0.3 throughout; and the \
    C-PTSD modification is asymmetric."
  statement := (∑ i, ∑ j, w4Base i j = -3/5) ∧
    (w4Base 1 2 = -3/10 ∧ w4Base 2 1 = -3/10 ∧ w3Base 1 2 = -3/10 ∧ w3Base 2 1 = -3/10) ∧
    w3CPTSD 0 1 - w3Base 0 1 ≠ w3CPTSD 1 0 - w3Base 1 0

instance : Witness cFigures := .of ⟨w4Base_sum, calm_shame, delta_asymmetric⟩

def cDirection : Claim where
  id := "P6.direction"
  text := "Fear activates shame more strongly than shame activates fear, as the figures draw the \
    C-PTSD modification."
  statement := w4CPTSD 0 1 < w4CPTSD 1 0 ∧ w3CPTSD 0 1 < w3CPTSD 1 0

/-- Refuted by Appendix A.3's figure, which draws it the other way round (the 4 × 4 figure agrees
    with the text). -/
instance : Refutation cDirection := .of fun ⟨_, h⟩ => by
  have := figA3_direction
  linarith

/-- P6's claims. -/
def claims : List Claim := [cEnergy, cFigures, cDirection, cFraction, cBlend, cPreverbal]

#status claims

end TTheory.P6
