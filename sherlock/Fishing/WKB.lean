import Mathlib
import Method
import LimbicTunnel
import Fishing.KleinGordon

/-!
# Fishing, eleventh catch: the WKB exponent and the pre-verbal claim (USC; ISS-126)

The cheatsheet (III): "WKB tunnelling amplitude: P ≈ exp(-(2/ħ_geo) ∫ √(V(q) - E) dq)"; the Lean
(`SomaField.LimbicTunnel`) defines the action `wkbAction W = √(2W) · 4/3` (m = 1) and calls exp(-2S) the
"amplitude"; QUANT-EXP-1 uses it at W = 8, 10, 12.

1. `action_integral`: the Lean's action is right, and now derived: for the programme's own well
   V = W(x² - 1)² at E = 0, ∫₋₁¹ √(2V) dx = √(2W) · 4/3.
2. `cheatsheet_drops_mass`: the cheatsheet's formula has √(V - E), not √(2m(V - E)): its exponent is √2
   smaller, so the two agree only if m = 1/2. One of them must change, and QUANT-EXP-1's numbers follow
   the Lean.
3. exp(-2S) is a transmission probability (the square of an amplitude e^{-S}); both the Lean's name and the
   cheatsheet's word "amplitude" say otherwise. Recorded, not proved.

And a reuse (COID-PREVERBAL-1): the cheatsheet's pre-verbal manifold (VII: "large k, rapid memory decay")
rests on the memory kernel's decay e^{-kvτ}; the master equation as written does not decay in time
(`Fishing.KleinGordon.kernel_not_mode`), so the claim needs the damping term KG-1 asks for.
Evidence labels: 1-2 `kernel-verified`; 3 a reading.
-/

open Real SomaField.LimbicTunnel

namespace Fishing.WKB

/-- 1. The action integral of the programme's well, at the well's bottom (E = 0), m = ħ = 1. -/
theorem action_integral (p : BarrierParam) :
    ∫ x in (-1 : ℝ)..1, Real.sqrt (2 * V p x) = wkbAction p.W := by
  have h : Set.EqOn (fun x => Real.sqrt (2 * V p x)) (fun x => Real.sqrt (2 * p.W) * (1 - x ^ 2))
      (Set.uIcc (-1) 1) := by
    intro x hx
    rw [Set.uIcc_of_le (by norm_num)] at hx
    obtain ⟨h1, h2⟩ := hx
    have hx2 : 0 ≤ 1 - x ^ 2 := by nlinarith
    simp only [V]
    rw [show 2 * (p.W * (x ^ 2 - 1) ^ 2) = (2 * p.W) * (1 - x ^ 2) ^ 2 by ring,
      Real.sqrt_mul (by linarith [p.hW]), Real.sqrt_sq hx2]
  rw [intervalIntegral.integral_congr h, intervalIntegral.integral_const_mul,
    intervalIntegral.integral_sub intervalIntegrable_const ((continuous_pow 2).intervalIntegrable _ _),
    integral_pow, intervalIntegral.integral_const]
  unfold wkbAction
  norm_num

/-- 2. Without the 2m, the exponent differs for every positive barrier. -/
theorem cheatsheet_drops_mass {W : ℝ} (hW : 0 < W) :
    Real.exp (-(2 * (Real.sqrt W * (4 / 3)))) ≠ Real.exp (-(2 * wkbAction W)) := by
  intro h
  rw [Real.exp_eq_exp] at h
  unfold wkbAction at h
  rw [Real.sqrt_mul (by norm_num : (0 : ℝ) ≤ 2) W] at h
  have e : (Real.sqrt 2 - 1) * Real.sqrt W = 0 := by linear_combination (3 / 8) * h
  rcases mul_eq_zero.mp e with h2 | h2
  · have : Real.sqrt 2 = 1 := by linarith
    rw [Real.sqrt_eq_one] at this
    norm_num at this
  · exact (Real.sqrt_pos.mpr hW).ne' h2

def row : Method.Row where
  id := "COID-WKB-1"
  source := "WKB barrier penetration: T ≈ exp(-(2/ħ) ∫ √(2m(V - E)) dx) (Gamow 1928; Landau and Lifshitz §50)"
  target := "limbic tunnelling in the programme's well V = W(x² - 1)² (LimbicTunnel; cheatsheet III; QUANT-EXP-1)"
  signature := [(.operatorForm, "a classically forbidden region between the wells, -1 < x < 1, at E = 0")]
  imported := "T = exp(-2S), S = √(2W) · 4/3 (action_integral)"
  assumptions := [
    ⟨"the Lean's action is the integral", .lean ``Fishing.WKB.action_integral⟩,
    ⟨"m = ħ = 1", .assumed "the Lean's units; ħ_geo is not given a value"⟩,
    ⟨"E = 0, the well's bottom (the instanton's exponent)", .assumed "standard for the splitting; the zero-point energy shifts the turning points"⟩,
    ⟨"exp(-2S) is called an amplitude", .open_ "it is a probability (|e^{-S}|²): rename in the Lean and the cheatsheet"⟩]
  prediction := "the tunnelling rate falls as exp(-(8/3)√(2W)): at W = 8, 10, 12 as QUANT-EXP-1 uses"
  disconfirmation := "QUANT-EXP-1's exact simulation departing from the WKB exponent at large W (rule 3)"
  negativeControl := ⟨"the cheatsheet's formula, without 2m, gives another exponent", .lean ``Fishing.WKB.cheatsheet_drops_mass⟩

/-- The pre-verbal claim, reusing the Klein-Gordon catch. -/
def preverbal : Method.Row where
  id := "COID-PREVERBAL-1"
  source := "the memory kernel K(τ) = K₀ e^{-τ/τₘ}, τₘ = 1/(kv): a large k forgets fast"
  target := "the pre-verbal manifold (cheatsheet VII: σ = 6, large k, rapid memory decay; P18)"
  signature := [(.units, "τₘ = 1/(kv), a time")]
  imported := "pre-verbal material decays fast because its k is large"
  assumptions := [
    ⟨"the master equation decays in time", .open_ "it does not (KG-1): the kernel is not a mode; a damping term is needed (AUTHOR, ISS-126)"⟩,
    ⟨"pre-verbal material sits at large k", .open_ "interpretive (P18)"⟩]
  prediction := "memory for pre-verbal events fades on the time τₘ = 1/(kv) of its scale"
  disconfirmation := "with damping added, a decay time that does not grow as k falls (rule 3)"
  negativeControl := ⟨"the kernel is not a solution of the equation as written", .lean ``Fishing.KleinGordon.kernel_not_mode⟩

#guard row.wellFormed && preverbal.wellFormed

#print axioms action_integral
#print axioms cheatsheet_drops_mass

end Fishing.WKB
