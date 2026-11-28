/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Mathlib

/-!
# P17 · The Mathematical Foundations of Gestalt Field Dynamics

[T]-Theory's seventeenth paper, as Lean. Source:
`paper/soma/gestalt-field-dynamics/gestalt-field-dynamics.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P17).

P17 sets Gestalt therapy's clinical language beside the Soma-Field's mathematics and gives three
derivations. Proof 2 (the fixed Gestalt as a Lyapunov-stable basin of the Hopfield energy) is
proved here for any number of modes: along the flow `ė = We + b`, `dH/dt = -|We + b|² ≤ 0`. Its
side condition is not: a negative semi-definite `W` does not bound `H` below (`W = 0`, `b ≠ 0`
leaves `H = -bᵀe`); a negative definite one does. Proof 3's figures check: the angle field's
circulation is `2π` round the defect and `0` with the defect outside, and the tilted double well
loses its valley at `J = 2/(3√3)`. The `G₂` impasse itself stays open.
-/

namespace TTheory.P17

open TTheory Real Finset MeasureTheory intervalIntegral

/-! ## The pole

"`G(ω) = 1/(ω² - m² + iε)` ... a sharp peak (the pole) where the frequency `ω` meets the mass
`m`": `|G|² = 1/((ω² - m²)² + ε²)` is largest at `ω = m`. -/

theorem pole_peak (ω m ε : ℝ) (hε : 0 < ε) :
    1 / ((ω ^ 2 - m ^ 2) ^ 2 + ε ^ 2) ≤ 1 / ((m ^ 2 - m ^ 2) ^ 2 + ε ^ 2) := by
  apply one_div_le_one_div_of_le (by positivity)
  nlinarith [sq_nonneg (ω ^ 2 - m ^ 2)]

/-! ## Proof 2: the fixed Gestalt

`H(e) = -½ eᵀWe - bᵀe`, and the flow `ė = -∇H = We + b` (`W` symmetric). -/

/-- The Hopfield energy. -/
noncomputable def energy {n : ℕ} (W : Matrix (Fin n) (Fin n) ℝ) (b e : Fin n → ℝ) : ℝ :=
  -(1 / 2) * ∑ i, ∑ j, W i j * e i * e j - ∑ i, b i * e i

/-- "`dH/dt = -Σ (∂H/∂eᵢ)² ≤ 0`": along any trajectory of the flow. -/
theorem lyapunov {n : ℕ} {W : Matrix (Fin n) (Fin n) ℝ} (hW : W.IsSymm) (b : Fin n → ℝ)
    (e : ℝ → Fin n → ℝ) (t : ℝ)
    (he : ∀ i, HasDerivAt (fun s => e s i) ((W.mulVec (e t) + b) i) t) :
    HasDerivAt (fun s => energy W b (e s)) (-∑ i, ((W.mulVec (e t) + b) i) ^ 2) t := by
  set v := W.mulVec (e t) + b with hv
  set x := e t with hx
  have hij : ∀ i j, HasDerivAt (fun s => W i j * e s i * e s j)
      (W i j * v i * x j + W i j * x i * v j) t := by
    intro i j
    exact (((he i).const_mul (W i j)).mul (he j)).congr_deriv (by ring)
  have hq : HasDerivAt (fun s => ∑ i, ∑ j, W i j * e s i * e s j)
      (∑ i, ∑ j, (W i j * v i * x j + W i j * x i * v j)) t :=
    HasDerivAt.fun_sum (u := univ) fun i _ => HasDerivAt.fun_sum (u := univ) fun j _ => hij i j
  have hl : HasDerivAt (fun s => ∑ i, b i * e s i) (∑ i, b i * v i) t :=
    HasDerivAt.fun_sum (u := univ) fun i _ => (he i).const_mul (b i)
  refine ((hq.const_mul (-(1 / 2))).sub hl).congr_deriv ?_
  have hsym : ∑ i, ∑ j, W i j * x i * v j = ∑ i, v i * W.mulVec x i := by
    rw [Finset.sum_comm]
    refine Finset.sum_congr rfl fun j _ => ?_
    simp only [Matrix.mulVec, dotProduct, Finset.mul_sum]
    refine Finset.sum_congr rfl fun i _ => ?_
    rw [hW.apply i j]; ring
  have hfirst : ∑ i, ∑ j, W i j * v i * x j = ∑ i, v i * W.mulVec x i := by
    refine Finset.sum_congr rfl fun i _ => ?_
    simp only [Matrix.mulVec, dotProduct, Finset.mul_sum]
    refine Finset.sum_congr rfl fun j _ => ?_
    ring
  have hsplit : ∑ i, ∑ j, (W i j * v i * x j + W i j * x i * v j) =
      ∑ i, ∑ j, W i j * v i * x j + ∑ i, ∑ j, W i j * x i * v j := by
    rw [← Finset.sum_add_distrib]
    exact Finset.sum_congr rfl fun i _ => Finset.sum_add_distrib
  rw [hsplit, hsym, hfirst]
  have hvi : ∀ i, v i = W.mulVec x i + b i := fun i => by rw [hv, hx]; rfl
  have : ∑ i, v i ^ 2 = ∑ i, v i * W.mulVec x i + ∑ i, b i * v i := by
    rw [← Finset.sum_add_distrib]
    refine Finset.sum_congr rfl fun i _ => ?_
    rw [hvi i]; ring
  rw [this]; ring

/-- The figure's two modes: `W₁₁ = W₂₂ = -1`, `W₁₂ = W₂₁ = 0.6`, `b = (0.2, 0.1)`; its fixed point
    "`e* = -W⁻¹b = (0.406, 0.344)`" is `(13/32, 11/32)` exactly. -/
def wFig : Matrix (Fin 2) (Fin 2) ℚ := !![-1, 3 / 5; 3 / 5, -1]
def bFig : Fin 2 → ℚ := ![1 / 5, 1 / 10]

theorem fixed_point : wFig.mulVec ![13 / 32, 11 / 32] + bFig = 0 := by
  ext i; fin_cases i <;> simp [wFig, bFig] <;> norm_num

/-- "when `W` is additionally negative semi-definite, `H(e)` is bounded from below": not with
    `W = 0` and `b = 1`, where `H(e) = -e`. -/
theorem not_bounded : ¬ ∀ (n : ℕ) (W : Matrix (Fin n) (Fin n) ℝ) (b : Fin n → ℝ), W.IsSymm →
    (∀ e : Fin n → ℝ, ∑ i, ∑ j, W i j * e i * e j ≤ 0) → ∃ c, ∀ e, c ≤ energy W b e := by
  intro h
  obtain ⟨c, hc⟩ := h 1 0 (fun _ => 1) (by simp [Matrix.IsSymm]) (fun e => by simp)
  have := hc (fun _ => -c + 1)
  simp [energy] at this
  linarith

/-- With `W` negative definite in the sense `eᵀWe ≤ -λ|e|²`, it is bounded: `H ≥ -|b|²/(2λ)` mode
    by mode (`λx²/2 - bx ≥ -b²/(2λ)`). -/
theorem bounded_definite {l β x : ℝ} (hl : 0 < l) : -(β ^ 2 / (2 * l)) ≤ l * x ^ 2 / 2 - β * x := by
  have : 0 ≤ (l * x - β) ^ 2 / (2 * l) := by positivity
  have h2 : (l * x - β) ^ 2 / (2 * l) = l * x ^ 2 / 2 - β * x + β ^ 2 / (2 * l) := by
    field_simp; ring
  linarith

/-! ## Proof 3: the impasse

"The loop `γ` circles it once: the circulation is `2π`, so `n = 1`" and, with the defect moved to
`(2, 0)`, "the circulation is 0". On the unit circle the angle field's integrand is `1`, and round
the moved defect it is `(1 - 2 cos t)/(5 - 4 cos t)`, the derivative of the periodic
`arctan(sin t/(cos t - 2))`. -/

theorem circulation_round : ∫ t in (0 : ℝ)..(2 * π),
    (cos t * cos t + sin t * sin t) / (cos t ^ 2 + sin t ^ 2) = 2 * π := by
  have : ∀ t : ℝ, (cos t * cos t + sin t * sin t) / (cos t ^ 2 + sin t ^ 2) = 1 := fun t => by
    rw [show cos t * cos t + sin t * sin t = cos t ^ 2 + sin t ^ 2 by ring, cos_sq_add_sin_sq]
    norm_num
  rw [intervalIntegral.integral_congr (fun t _ => this t)]
  simp

theorem circulation_outside : ∫ t in (0 : ℝ)..(2 * π),
    ((cos t - 2) * cos t + sin t * sin t) / ((cos t - 2) ^ 2 + sin t ^ 2) = 0 := by
  have hne : ∀ t : ℝ, cos t - 2 ≠ 0 := fun t => by linarith [cos_le_one t]
  have hderiv : ∀ t : ℝ, HasDerivAt (fun t => arctan (sin t / (cos t - 2)))
      (((cos t - 2) * cos t + sin t * sin t) / ((cos t - 2) ^ 2 + sin t ^ 2)) t := by
    intro t
    have hq : HasDerivAt (fun t => sin t / (cos t - 2))
        ((cos t * (cos t - 2) - sin t * -sin t) / (cos t - 2) ^ 2) t :=
      (hasDerivAt_sin t).div ((hasDerivAt_cos t).sub_const 2) (hne t)
    have := hq.arctan
    convert this using 1
    have h1 := hne t
    have h2 : (cos t - 2) ^ 2 + sin t ^ 2 ≠ 0 := by positivity
    field_simp
    ring
  have hcont : Continuous fun t : ℝ =>
      ((cos t - 2) * cos t + sin t * sin t) / ((cos t - 2) ^ 2 + sin t ^ 2) := by
    apply Continuous.div (by fun_prop) (by fun_prop)
    intro t; have := hne t; positivity
  rw [integral_eq_sub_of_hasDerivAt (fun t _ => hderiv t) (hcont.intervalIntegrable _ _)]
  simp

/-- The tilted double well `V = x⁴/4 - x²/2 - Jx` loses its left valley at
    "`J = 2/(3√3) ≈ 0.385`": there `V'` and `V''` vanish together at `x = -1/√3`. -/
theorem fold : let x := -(1 / Real.sqrt 3); let J := 2 / (3 * Real.sqrt 3)
    x ^ 3 - x - J = 0 ∧ 3 * x ^ 2 - 1 = 0 ∧ 0.384 < J ∧ J < 0.385 := by
  intro x J
  have hs : Real.sqrt 3 ^ 2 = 3 := Real.sq_sqrt (by norm_num)
  have hp : 0 < Real.sqrt 3 := by positivity
  have s1 : (1.732 : ℝ) < Real.sqrt 3 := by rw [Real.lt_sqrt (by norm_num)]; norm_num
  have s2 : Real.sqrt 3 < 1.7321 := by rw [Real.sqrt_lt' (by norm_num)]; norm_num
  refine ⟨?_, ?_, ?_, ?_⟩
  · simp only [x, J]; field_simp
    rw [show Real.sqrt 3 ^ 3 = Real.sqrt 3 ^ 2 * Real.sqrt 3 by ring, hs]
    ring
  · simp only [x]; field_simp; rw [hs]; ring
  · simp only [J]; rw [lt_div_iff₀ (by positivity)]; linarith
  · simp only [J]; rw [div_lt_iff₀ (by positivity)]; linarith

/-! ## P17's claims -/

def cPole : Claim where
  id := "P17.pole"
  text := "G(ω) = 1/(ω² - m² + iε): a sharp peak (the pole) where the frequency ω meets the mass m."
  statement := ∀ ω m ε : ℝ, 0 < ε →
    1 / ((ω ^ 2 - m ^ 2) ^ 2 + ε ^ 2) ≤ 1 / ((m ^ 2 - m ^ 2) ^ 2 + ε ^ 2)

instance : Witness cPole := .of fun ω m ε h => pole_peak ω m ε h

def cLyapunov : Claim where
  id := "P17.lyapunov"
  text := "Proof 2: along de/dt = -∇H(e) = We + b, dH/dt = -Σ(∂H/∂eᵢ)² ≤ 0; the fixed Gestalt \
    e* = -W⁻¹b = (0.406, 0.344) for the figure's two modes."
  statement := (∀ (n : ℕ) (W : Matrix (Fin n) (Fin n) ℝ), W.IsSymm → ∀ (b : Fin n → ℝ)
      (e : ℝ → Fin n → ℝ) (t : ℝ), (∀ i, HasDerivAt (fun s => e s i) ((W.mulVec (e t) + b) i) t) →
      HasDerivAt (fun s => energy W b (e s)) (-∑ i, ((W.mulVec (e t) + b) i) ^ 2) t) ∧
    wFig.mulVec ![13 / 32, 11 / 32] + bFig = 0

instance : Witness cLyapunov := .of ⟨fun _ _ hW b e t he => lyapunov hW b e t he, fixed_point⟩

def cBounded : Claim where
  id := "P17.bounded"
  text := "When W is additionally negative semi-definite, H(e) is bounded from below."
  statement := ∀ (n : ℕ) (W : Matrix (Fin n) (Fin n) ℝ) (b : Fin n → ℝ), W.IsSymm →
    (∀ e : Fin n → ℝ, ∑ i, ∑ j, W i j * e i * e j ≤ 0) → ∃ c, ∀ e, c ≤ energy W b e

/-- `W = 0`, `b = 1`: `H(e) = -e`. Negative definite suffices (`bounded_definite`). -/
instance : Refutation cBounded := .of not_bounded

def cWinding : Claim where
  id := "P17.winding"
  text := "The angle field round a defect: circulation 2π (n = 1) with the defect inside the loop, \
    0 with it moved to (2, 0)."
  statement := (∫ t in (0 : ℝ)..(2 * π),
      (cos t * cos t + sin t * sin t) / (cos t ^ 2 + sin t ^ 2) = 2 * π) ∧
    ∫ t in (0 : ℝ)..(2 * π),
      ((cos t - 2) * cos t + sin t * sin t) / ((cos t - 2) ^ 2 + sin t ^ 2) = 0

instance : Witness cWinding := .of ⟨circulation_round, circulation_outside⟩

def cFold : Claim where
  id := "P17.fold"
  text := "As J grows the valley gets shallower, and above J = 2/(3√3) ≈ 0.385 it vanishes."
  statement := let x := -(1 / Real.sqrt 3); let J := 2 / (3 * Real.sqrt 3)
    x ^ 3 - x - J = 0 ∧ 3 * x ^ 2 - 1 = 0 ∧ 0.384 < J ∧ J < 0.385

instance : Witness cFold := .of fold

/-- That a client's impasse is a loop of non-zero winding round a defect in a `G₂` moduli space,
    and resourcing moves the defect out: "a proposed structural bridge, not a completed
    compactification proof". -/
opaque impasseIsWinding : Prop

def cImpasse : Claim where
  id := "P17.impasse"
  text := "The impasse occurs when a closed path γ encircles a topological defect in the moduli \
    space of the G₂ manifold; present-moment tracking takes the winding number to 0."
  statement := impasseIsWinding

/-- P17's claims, in the paper's order. -/
def claims : List Claim := [cPole, cLyapunov, cBounded, cImpasse, cWinding, cFold]

#status claims

end TTheory.P17
