/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P11
import LimbicHopfield
import Mathlib.Analysis.Complex.ExponentialBounds

/-!
# P13 · The Missing Limbic Layer

[T]-Theory's thirteenth paper, as Lean. Source:
`paper/soma/missing-limbic-layer/missing-limbic-layer.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P13).

The Field-Modulated Hopfield Network (FM-HN): a limbic field `Φ ∈ [0, 1]` raises the temperature
(`T = T₀ + σΦ`) and shifts the weights (`W = W₀ + γΦJ`). The coupling theorems of
`LimbicHopfield.lean` carry the paper's claims, and the figures' numbers check. The cold limit the
paper lists as a pending obligation (`softmax_limit_argmax`) is proved here, and it shows what the
limit is: the 2020 update retrieves the stored pattern nearest the state, in one step. That is not
the 1982 sign update, which the paper says it is: with one stored pattern, the 1982 network sends
the pattern's far side to the pattern's mirror, the 2020 network to the pattern. The companion
file's strict energy descent fails at every fixed point.
-/

namespace TTheory.P13

open TTheory Filter Topology Finset LimbicHopfield

/-! ## The two coupling equations

"`β(t) = 1/(T₀ + σ·Φ_limbic(t))` ... As `Φ ↑`, temperature rises, `β` drops" -/

theorem beta_falls (T₀ σ : ℝ) (hT : 0 < T₀) (hσ : 0 < σ) (l₁ l₂ : LimbicState)
    (h : l₁.φ < l₂.φ) : modulatedBeta T₀ σ hT l₂ < modulatedBeta T₀ σ hT l₁ := by
  unfold modulatedBeta
  apply one_div_lt_one_div_of_lt
  · unfold modulatedTemp; nlinarith [l₁.hφ_lo]
  · exact modulation_monotone T₀ σ hσ l₁ l₂ h

/-- "calm (`Φ = 0`) gives `β = 4` ... At `Φ = 0.5` (`β = 0.8`)", with `T₀ = 0.25`, `σ = 2`. -/
theorem figure_betas :
    modulatedBeta 0.25 2 (by norm_num) ⟨0, le_refl 0, zero_le_one⟩ = 4 ∧
    modulatedBeta 0.25 2 (by norm_num) ⟨0.5, by norm_num, by norm_num⟩ = 0.8 := by
  constructor <;> norm_num [modulatedBeta, modulatedTemp]

/-- The weight figure: baseline `W₀`, coupling `J`, `γ = 0.5`, `Φ = 0.6`. -/
def w0 : Matrix (Fin 3) (Fin 3) ℝ := !![0, 1, -1; 1, 0, -1; -1, -1, 0]
def jFig : Matrix (Fin 3) (Fin 3) ℝ := !![0, 1, 0; 1, 0, 1; 0, 1, 0]
noncomputable def wFig : Matrix (Fin 3) (Fin 3) ℝ :=
  modulatedW w0 jFig 0.5 ⟨0.6, by norm_num, by norm_num⟩

/-- "The program checked the baseline and modulated matrix sums" (`-2`, `-0.8`), and the gain
    "preserv[es] the zero diagonal". -/
theorem weight_figure : ∑ i, ∑ j, w0 i j = -2 ∧ ∑ i, ∑ j, wFig i j = -0.8 ∧ ∀ i, wFig i i = 0 := by
  refine ⟨?_, ?_, ?_⟩
  · simp [w0, Fin.sum_univ_three]; norm_num
  · simp [wFig, modulatedW, w0, jFig, Fin.sum_univ_three]; norm_num
  · intro i; fin_cases i <;> simp [wFig, modulatedW, w0, jFig]

/-! ## The cold limit

"As `β → ∞` ... `lim softmax(β·z)_i = 1[i = argmax z]`": with a unique maximum at `k`, the softmax
tends to the indicator of `k` (P11's vanishing entries, and the sum is 1), so the 2020 update tends
to the `k`-th stored pattern. -/

theorem softmax_tendsto {n : ℕ} (z : Fin n → ℝ) (k : Fin n) (hk : ∀ i, i ≠ k → z i < z k) :
    Tendsto (fun β => softmax β z) atTop (𝓝 (Pi.single k 1)) := by
  rw [tendsto_pi_nhds]
  intro i
  by_cases hi : i = k
  · subst hi
    have hsum : (fun β => softmax β z i) = fun β => 1 - ∑ j ∈ univ.erase i, softmax β z j := by
      funext β
      have h1 := softmax_sum_one (Fin.pos i) β z
      rw [← Finset.add_sum_erase _ _ (mem_univ i)] at h1
      linarith
    have h0 : Tendsto (fun β => ∑ j ∈ univ.erase i, softmax β z j) atTop (𝓝 0) := by
      have := tendsto_finsetSum (univ.erase i)
        (fun j hj => P11.softmax_vanishes z (hk j (ne_of_mem_erase hj)))
      simpa using this
    rw [hsum, Pi.single_eq_same]
    simpa using (tendsto_const_nhds (x := (1 : ℝ))).sub h0
  · rw [Pi.single_eq_of_ne hi]
    exact P11.softmax_vanishes z (hk i hi)

theorem cold_limit {n d : ℕ} (X : Matrix (Fin n) (Fin d) ℝ) (ξ : Fin d → ℝ) (k : Fin n)
    (hk : ∀ i, i ≠ k → X.mulVec ξ i < X.mulVec ξ k) :
    Tendsto (fun β => update2020 β X ξ) atTop (𝓝 (X k)) := by
  have hc : Continuous fun v : Fin n → ℝ => (Matrix.transpose X).mulVec v :=
    continuous_const.matrix_mulVec continuous_id
  have := (hc.tendsto _).comp (softmax_tendsto _ k hk)
  have e : X k = (Matrix.transpose X).mulVec (Pi.single k 1) := by
    ext j; simp [Matrix.mulVec, dotProduct, Pi.single_apply]
  rw [e]
  exact this

/-- Hebbian weights, `W_ij = N⁻¹ Σ_μ ξ^μ_i ξ^μ_j`, `W_ii = 0` (the paper's 1982 network). -/
noncomputable def hebbian {n d : ℕ} (X : Matrix (Fin n) (Fin d) ℝ) : Matrix (Fin d) (Fin d) ℝ :=
  fun i j => if i = j then 0 else (∑ μ, X μ i * X μ j) / n

/-- One stored pattern, all ones, in four units; the state is its far side. -/
def xOne : Matrix (Fin 1) (Fin 4) ℝ := fun _ _ => 1
def ξFar : Fin 4 → ℝ := ![1, -1, -1, -1]

/-- The 2020 update returns the pattern at every `β` (one pattern: the softmax is 1). -/
theorem update2020_far (β : ℝ) : update2020 β xOne ξFar = fun _ => 1 := by
  funext j
  simp [update2020, softmax, Matrix.mulVec, dotProduct, xOne]

/-- The 1982 update sends it to the mirror, `(-1, -1, -1, -1)`: its first unit gets `-3`. -/
theorem update1982_far : update1982 (hebbian xOne) ξFar 0 = -1 := by
  simp [update1982, hebbian, Matrix.mulVec, dotProduct, Fin.sum_univ_four, ξFar, xOne]
  norm_num

theorem classical_limit_false : ¬ ∀ (n d : ℕ) (X : Matrix (Fin n) (Fin d) ℝ) (ξ : Fin d → ℝ),
    (∀ i, ξ i = 1 ∨ ξ i = -1) → (∀ μ i, X μ i = 1 ∨ X μ i = -1) →
    Tendsto (fun β => update2020 β X ξ) atTop (𝓝 (update1982 (hebbian X) ξ)) := by
  intro h
  have h1 := h 1 4 xOne ξFar (by intro i; fin_cases i <;> simp [ξFar]) (by simp [xOne])
  simp only [update2020_far] at h1
  have h0 := congrFun (tendsto_nhds_unique tendsto_const_nhds h1) 0
  rw [update1982_far] at h0
  norm_num at h0

/-! ## The companion file's energy descent

`LimbicHopfield.lean` lists "`energy_descent_modern` — `E₂₀(ξ_{t+1}) < E₂₀(ξ_t)` for each update
step": strict, so it fails wherever the update is at rest. One pattern `1`, the state `1`. -/

def xUnit : Matrix (Fin 1) (Fin 1) ℝ := fun _ _ => 1

theorem fixed_point (β : ℝ) : update2020 β xUnit (fun _ => 1) = fun _ => 1 := by
  funext j
  simp [update2020, softmax, Matrix.mulVec, dotProduct, xUnit]

theorem strict_descent_false : ¬ ∀ (n d : ℕ) (β : ℝ) (hβ : 0 < β) (X : Matrix (Fin n) (Fin d) ℝ)
    (ξ : Fin d → ℝ), energy2020 β hβ X (update2020 β X ξ) < energy2020 β hβ X ξ := by
  intro h
  have := h 1 1 1 one_pos xUnit (fun _ => 1)
  rw [fixed_point] at this
  exact lt_irrefl _ this

/-! ## Two candidates, and the C-PTSD barrier

"With two candidates the softmax weight on the first is a smooth step ... The program checked
`0.6225` at `β = 1`, `z₁ - z₂ = 0.5`." -/

theorem two_candidates (β a b : ℝ) :
    softmax β ![a, b] 0 = 1 / (1 + Real.exp (-(β * (a - b)))) := by
  have h : Real.exp (-(β * (a - b))) = Real.exp (β * b) / Real.exp (β * a) := by
    rw [← Real.exp_sub]; ring_nf
  simp only [softmax, Fin.sum_univ_two, Matrix.cons_val_zero, Matrix.cons_val_one,
    Matrix.cons_val_fin_one]
  rw [h]
  field_simp

theorem logistic_half : 0.62245 < 1 / (1 + Real.exp (-0.5)) ∧
    1 / (1 + Real.exp (-0.5)) < 0.6225 := by
  have lo := Real.exp_one_gt_d9
  have hi := Real.exp_one_lt_d9
  have hsq : Real.exp 0.5 * Real.exp 0.5 = Real.exp 1 := by rw [← Real.exp_add]; norm_num
  have hp := Real.exp_pos 0.5
  have hx1 : 1.64866 < Real.exp 0.5 := by nlinarith
  have hx2 : Real.exp 0.5 < 1.6489 := by nlinarith
  have hn : Real.exp (-0.5) = 1 / Real.exp 0.5 := by rw [Real.exp_neg, one_div]
  have hq : 1 / (1 + 1 / Real.exp 0.5) = Real.exp 0.5 / (Real.exp 0.5 + 1) := by field_simp
  rw [hn, hq]
  have p : 0 < Real.exp 0.5 + 1 := by positivity
  constructor
  · rw [lt_div_iff₀ p]; linarith
  · rw [div_lt_iff₀ p]; linarith

/-- "`LimbicTunnel.wkbAmplitude 12` (approximately `2.1 × 10⁻⁶`)": between `2.1` and `2.2 × 10⁻⁶`
    (`8√24/3` lies between `13.06` and `13.07`; `e¹³` from `e` to nine places). -/
theorem wkb_12 : 2.1e-6 < SomaField.LimbicTunnel.wkbAmplitude 12 ∧
    SomaField.LimbicTunnel.wkbAmplitude 12 < 2.2e-6 := by
  rw [P11.theta_is_wkb, show (2 : ℝ) * 12 = 24 by norm_num]
  have s1 : (4.8975 : ℝ) < Real.sqrt 24 := by
    rw [Real.lt_sqrt (by norm_num)]; norm_num
  have s2 : Real.sqrt 24 < 4.9012 := by
    rw [Real.sqrt_lt' (by norm_num)]; norm_num
  set a := 8 * Real.sqrt 24 / 3 with ha
  have a1 : 13.06 < a := by rw [ha]; linarith
  have a2 : a < 13.07 := by rw [ha]; linarith
  have e13lo : (2.7182818283 : ℝ) ^ 13 < Real.exp 13 := by
    have := pow_lt_pow_left₀ Real.exp_one_gt_d9 (by norm_num) (by norm_num : (13 : ℕ) ≠ 0)
    rw [← Real.exp_nat_mul, mul_one] at this
    exact_mod_cast this
  have e13hi : Real.exp 13 < (2.7182818286 : ℝ) ^ 13 := by
    have := pow_lt_pow_left₀ Real.exp_one_lt_d9 (Real.exp_pos 1).le (by norm_num : (13 : ℕ) ≠ 0)
    rw [← Real.exp_nat_mul, mul_one] at this
    exact_mod_cast this
  have lo6 : (1.06 : ℝ) ≤ Real.exp 0.06 := by
    have := Real.add_one_le_exp (0.06 : ℝ); linarith
  have lo7 : (0.93 : ℝ) ≤ Real.exp (-0.07) := by
    have := Real.add_one_le_exp (-0.07 : ℝ); linarith
  have big : 454546 < Real.exp 13.06 := by
    rw [show (13.06 : ℝ) = 13 + 0.06 by norm_num, Real.exp_add]
    nlinarith [Real.exp_pos 13]
  have small : Real.exp 13.07 < 476190 := by
    have h : Real.exp 13.07 * Real.exp (-0.07) = Real.exp 13 := by
      rw [← Real.exp_add]; norm_num
    nlinarith [Real.exp_pos 13.07]
  have hpos := Real.exp_pos a
  rw [Real.exp_neg]
  constructor
  · rw [lt_inv_comm₀ (by norm_num) hpos]
    calc Real.exp a < Real.exp 13.07 := Real.exp_lt_exp.mpr a2
      _ < 476190 := small
      _ < (2.1e-6)⁻¹ := by norm_num
  · rw [inv_lt_comm₀ hpos (by norm_num)]
    calc (2.2e-6 : ℝ)⁻¹ < 454546 := by norm_num
      _ < Real.exp 13.06 := big
      _ < Real.exp a := Real.exp_lt_exp.mpr a1

/-! ## P13's claims -/

def cCoupling : Claim where
  id := "P13.coupling"
  text := "Equations 1-2: stress raises the temperature, monotonically, and so lowers β."
  statement := (∀ T₀ σ, 0 < σ → ∀ l : LimbicState, 0 < l.φ → T₀ < modulatedTemp T₀ σ l) ∧
    (∀ T₀ σ, 0 < σ → ∀ l₁ l₂ : LimbicState, l₁.φ < l₂.φ →
      modulatedTemp T₀ σ l₁ < modulatedTemp T₀ σ l₂) ∧
    (∀ T₀ σ (hT : 0 < T₀), 0 < σ → ∀ l₁ l₂ : LimbicState, l₁.φ < l₂.φ →
      modulatedBeta T₀ σ hT l₂ < modulatedBeta T₀ σ hT l₁)

instance : Witness cCoupling := .of ⟨fun T₀ σ hσ l hφ => stress_raises_temp T₀ σ hσ l hφ,
  fun T₀ σ hσ l₁ l₂ h => modulation_monotone T₀ σ hσ l₁ l₂ h,
  fun T₀ σ hT hσ l₁ l₂ h => beta_falls T₀ σ hT hσ l₁ l₂ h⟩

def cFigures : Claim where
  id := "P13.figures"
  text := "The figures: β(0) = 4 and β(0.5) = 0.8 (T₀ = 0.25, σ = 2); the weight matrix sums -2 \
    and -0.8 with a zero diagonal; softmax weight 0.6225 at β = 1, z₁ - z₂ = 0.5."
  statement := (modulatedBeta 0.25 2 (by norm_num) ⟨0, le_refl 0, zero_le_one⟩ = 4 ∧
      modulatedBeta 0.25 2 (by norm_num) ⟨0.5, by norm_num, by norm_num⟩ = 0.8) ∧
    (∑ i, ∑ j, w0 i j = -2 ∧ ∑ i, ∑ j, wFig i j = -0.8 ∧ ∀ i, wFig i i = 0) ∧
    (0.62245 < softmax 1 ![0.5, 0] 0 ∧ softmax 1 ![0.5, 0] 0 < 0.6225)

instance : Witness cFigures := .of ⟨figure_betas, weight_figure, by
  rw [two_candidates, show (1 : ℝ) * (0.5 - 0) = 0.5 by norm_num]; exact logistic_half⟩

def cCorrespondence : Claim where
  id := "P13.correspondence"
  text := "Theorem (Correspondence Principle): under Φ = 0, T = T₀ and W = W₀."
  statement := ∀ (T₀ σ : ℝ) (d : ℕ) (W₀ J : Matrix (Fin d) (Fin d) ℝ) (γ : ℝ),
    modulatedTemp T₀ σ ⟨0, le_refl 0, zero_le_one⟩ = T₀ ∧
    modulatedW W₀ J γ ⟨0, le_refl 0, zero_le_one⟩ = W₀

instance : Witness cCorrespondence := .of fun T₀ σ _ W₀ J γ => correspondence_principle T₀ σ W₀ J γ

def cColdLimit : Claim where
  id := "P13.cold-limit"
  text := "softmax_limit_argmax: as β → ∞, softmax(β·z) → 1[i = argmax z], so the 2020 update \
    retrieves the nearest stored pattern in one step."
  statement := ∀ (n d : ℕ) (X : Matrix (Fin n) (Fin d) ℝ) (ξ : Fin d → ℝ) (k : Fin n),
    (∀ i, i ≠ k → X.mulVec ξ i < X.mulVec ξ k) →
    Tendsto (fun β => update2020 β X ξ) atTop (𝓝 (X k))

instance : Witness cColdLimit := .of fun _ _ X ξ k hk => cold_limit X ξ k hk

def cClassical : Claim where
  id := "P13.classical-limit"
  text := "Corollary (Classical Limit): as β → ∞ the 2020 update converges pointwise to the 1982 \
    sign update; the 1982 network is the cold limit of the FM-HN under calm conditions."
  statement := ∀ (n d : ℕ) (X : Matrix (Fin n) (Fin d) ℝ) (ξ : Fin d → ℝ),
    (∀ i, ξ i = 1 ∨ ξ i = -1) → (∀ μ i, X μ i = 1 ∨ X μ i = -1) →
    Tendsto (fun β => update2020 β X ξ) atTop (𝓝 (update1982 (hebbian X) ξ))

/-- One pattern, the state at its far side: the 2020 update gives the pattern, the 1982 update
    its mirror. -/
instance : Refutation cClassical := .of classical_limit_false

def cTrap : Claim where
  id := "P13.trap"
  text := "LimbicTunnel.gradient_traps_near_neg1 proves the trapping sign near the negative well."
  statement := ∀ (p : SomaField.LimbicTunnel.BarrierParam) (ε : ℝ), 0 < ε → ε < 1 →
    0 < 4 * p.W * (-1 + ε) * ((-1 + ε) ^ 2 - 1)

instance : Witness cTrap := .of SomaField.LimbicTunnel.gradient_traps_near_neg1

/-- That FM-HN dynamics escape the trauma well with probability at least `Θ(W)`: the paper cites
    `wkbAmplitude_pos`, which says only that `Θ(W) > 0`. -/
opaque escapeBound : Prop

def cEscape : Claim where
  id := "P13.escape"
  text := "FM-HN dynamics escape ξ⁻ with probability bounded below by Θ(W) = exp(-8√(2W)/3)."
  statement := escapeBound

def cOperators : Claim where
  id := "P13.operators"
  text := "adhd_hotter_than_autism: ADHD operates hotter than baseline (T = 1.8·T₀), ASC colder \
    (T = 0.4·T₀); C-PTSD's barrier W = 12, the QUANT-EXP-1 maximum, where Θ ≈ 2.1 × 10⁻⁶."
  statement := (∀ T : ℝ, 0 < T → autismOperator T < T ∧ T < adhdOperator T) ∧
    cptsdBarrierW = 12 ∧ 2.1e-6 < SomaField.LimbicTunnel.wkbAmplitude cptsdBarrierW ∧
    SomaField.LimbicTunnel.wkbAmplitude cptsdBarrierW < 2.2e-6

instance : Witness cOperators := .of ⟨adhd_hotter_than_autism, by norm_num [cptsdBarrierW],
  by rw [show cptsdBarrierW = 12 by norm_num [cptsdBarrierW]]; exact wkb_12⟩

def cLemmas : Claim where
  id := "P13.lemmas"
  text := "softmax_nonneg, softmax_sum_one, lse_ge_max: substantive real-arithmetic lemmas."
  statement := (∀ n (β : ℝ) (z : Fin n → ℝ) i, 0 ≤ softmax β z i) ∧
    (∀ n, 0 < n → ∀ (β : ℝ) (z : Fin n → ℝ), ∑ i, softmax β z i = 1) ∧
    (∀ n, 0 < n → ∀ (β : ℝ) (hβ : 0 < β) (z : Fin n → ℝ) k, z k ≤ lse β hβ z)

instance : Witness cLemmas := .of ⟨fun _ β z i => softmax_nonneg β z i,
  fun _ hn β z => softmax_sum_one hn β z, fun _ hn β hβ z k => lse_ge_max hn β hβ z k⟩

def cDescent : Claim where
  id := "P13.descent"
  text := "energy_descent_modern (LimbicHopfield.lean, pending): E₂₀(ξ_{t+1}) < E₂₀(ξ_t) for each \
    update step."
  statement := ∀ (n d : ℕ) (β : ℝ) (hβ : 0 < β) (X : Matrix (Fin n) (Fin d) ℝ) (ξ : Fin d → ℝ),
    energy2020 β hβ X (update2020 β X ξ) < energy2020 β hβ X ξ

/-- Strict descent fails at a fixed point. -/
instance : Refutation cDescent := .of strict_descent_false

/-- P13's claims, in the paper's order. -/
def claims : List Claim :=
  [cCoupling, cFigures, cCorrespondence, cColdLimit, cClassical, cTrap, cEscape, cOperators,
    cLemmas, cDescent]

#status claims

end TTheory.P13
