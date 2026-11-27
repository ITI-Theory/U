import Mathlib
import Method
import LimbicTunnel

/-!
# Fishing, sixth catch: how long a trauma well holds (USC; ISS-126)

The cheatsheet (III): trauma wells are "deep narrow minima"; the mean escape time is Kramers',
⟨T⟩ = (2π/ω_A ω_B) e^{ΔV/D}; "formation time ≪ dissolution time". The programme's own well is
`SomaField.LimbicTunnel.V`, W(x² - 1)², with wells at ±1 and a barrier of height W at 0.

1. `deriv2_V`, `curvatures`: its curvatures are 8W in the wells and -4W on the barrier, so
   ω_A ω_B = √32 W: the prefactor is fixed by the barrier itself.
2. `deeper_slower`: for W ≥ D, a deeper well holds longer, e^{W/D}/W increasing. Below W = D the
   prefactor wins, but Kramers' formula needs W ≫ D anyway.
3. `narrower_faster`: a narrower well (larger ω_A) is escaped faster. So "narrow" works against
   persistence: depth is what holds a trauma, not narrowness. The cheatsheet's phrase has the second
   word wrong for the claim it is used for.
4. `arrhenius`: the time is exponential in 1/D: halving the noise squares the factor e^{W/D}. Read
   with the cheatsheet's field temperature (the therapeutic window, annealing in QUANT-EXP-1): a
   warmer field shortens the dwell exponentially, and a colder one lengthens it.

The cheatsheet's formula is Kramers' overdamped result with the friction set to 1 and ω² = |V''|.
It omits the friction γ: ⟨T⟩ = 2πγ/(ω_A ω_B) e^{ΔV/D}. That is assumed here, not checked.
Evidence labels: 1-4 `kernel-verified`; the clinical reading is `interpretive`.
-/

open Real SomaField.LimbicTunnel

namespace Fishing.Kramers

/-- 1. The second derivative of the programme's well: V'' = 4W(3x² - 1). -/
theorem deriv2_V (p : BarrierParam) (x : ℝ) :
    HasDerivAt (fun x => 4 * p.W * x * (x ^ 2 - 1)) (4 * p.W * (3 * x ^ 2 - 1)) x := by
  have e : (fun x : ℝ => 4 * p.W * x * (x ^ 2 - 1)) = fun x => 4 * p.W * (x ^ 3 - x) := by
    funext x; ring
  rw [e]
  refine (((hasDerivAt_pow 3 x).sub (hasDerivAt_id' x)).const_mul (4 * p.W)).congr_deriv ?_
  push_cast
  ring

theorem curvatures (p : BarrierParam) :
    4 * p.W * (3 * (1 : ℝ) ^ 2 - 1) = 8 * p.W ∧ 4 * p.W * (3 * (-1 : ℝ) ^ 2 - 1) = 8 * p.W ∧
      4 * p.W * (3 * (0 : ℝ) ^ 2 - 1) = -(4 * p.W) ∧ deriv (V p) = fun x => 4 * p.W * x * (x ^ 2 - 1) :=
  ⟨by ring, by ring, by ring, funext fun x => (deriv_V p x).deriv⟩

/-- Kramers' mean escape time, as the cheatsheet writes it. -/
noncomputable def kramers (ωA ωB ΔV D : ℝ) : ℝ := 2 * π / (ωA * ωB) * Real.exp (ΔV / D)

/-- 2. Deeper holds longer, in Kramers' regime W ≥ D: e^{W₁/D}/W₁ < e^{W₂/D}/W₂. -/
theorem deeper_slower {D W1 W2 : ℝ} (hD : 0 < D) (hDW : D ≤ W1) (h12 : W1 < W2) :
    Real.exp (W1 / D) / W1 < Real.exp (W2 / D) / W2 := by
  have hW1 : 0 < W1 := lt_of_lt_of_le hD hDW
  have hW2 : 0 < W2 := by linarith
  have hx : (W2 - W1) / D ≠ 0 := div_ne_zero (by linarith) hD.ne'
  have h1 : (W2 - W1) / D + 1 < Real.exp ((W2 - W1) / D) := Real.add_one_lt_exp hx
  have h2 : (W2 - W1) / W1 ≤ (W2 - W1) / D := div_le_div_of_nonneg_left (by linarith) hD hDW
  have e : W2 / W1 = (W2 - W1) / W1 + 1 := by rw [div_add_one hW1.ne', sub_add_cancel]
  have h3 : W2 / W1 < Real.exp ((W2 - W1) / D) := by rw [e]; linarith
  have h3' : W2 < Real.exp ((W2 - W1) / D) * W1 := (div_lt_iff₀ hW1).mp h3
  have hsplit : Real.exp (W2 / D) = Real.exp (W1 / D) * Real.exp ((W2 - W1) / D) := by
    rw [← Real.exp_add]; congr 1; ring
  rw [div_lt_div_iff₀ hW1 hW2, hsplit]
  calc Real.exp (W1 / D) * W2 < Real.exp (W1 / D) * (Real.exp ((W2 - W1) / D) * W1) :=
        mul_lt_mul_of_pos_left h3' (Real.exp_pos _)
    _ = Real.exp (W1 / D) * Real.exp ((W2 - W1) / D) * W1 := by ring

/-- 3. Narrower is escaped faster: a larger curvature ω_A shortens ⟨T⟩. -/
theorem narrower_faster {ωA1 ωA2 ωB : ℝ} (h1 : 0 < ωA1) (h12 : ωA1 < ωA2) (hB : 0 < ωB) (ΔV D : ℝ) :
    kramers ωA2 ωB ΔV D < kramers ωA1 ωB ΔV D := by
  unfold kramers
  apply mul_lt_mul_of_pos_right _ (Real.exp_pos _)
  exact div_lt_div_of_pos_left (by positivity) (by positivity) (mul_lt_mul_of_pos_right h12 hB)

/-- 4. Arrhenius: halving the noise squares the exponential factor. -/
theorem arrhenius (W D : ℝ) : Real.exp (W / (D / 2)) = Real.exp (W / D) ^ 2 := by
  rw [← Real.exp_nat_mul]; congr 1; push_cast
  rcases eq_or_ne D 0 with h | h
  · simp [h]
  · field_simp

/-- The catch as a row. -/
def row : Method.Row where
  id := "COID-KRAMERS-1"
  source := "Kramers' escape from a well over a barrier, overdamped (Kramers 1940; Hänggi, Talkner and Borkovec 1990)"
  target := "trauma persistence in the limbic double well V = W(x² - 1)² (LimbicTunnel; cheatsheet III)"
  signature := [(.operatorForm, "overdamped Langevin in a double well: dx = -V'(x) dt + √(2D) dB"),
    (.units, "time = 2πγ/(ω_A ω_B) e^{ΔV/D}, with γ set to 1 in the cheatsheet")]
  imported := "⟨T⟩ ∝ e^{W/D}/W for the programme's well; depth holds, narrowness does not"
  assumptions := [
    ⟨"the well's curvatures are 8W and -4W", .lean ``Fishing.Kramers.curvatures⟩,
    ⟨"a deeper well holds longer", .lean ``Fishing.Kramers.deeper_slower⟩,
    ⟨"the dwell is exponential in 1/D", .lean ``Fishing.Kramers.arrhenius⟩,
    ⟨"the friction γ is 1", .assumed "the cheatsheet's formula omits it"⟩,
    ⟨"W ≫ D (Kramers' regime)", .open_ "no value of W/D is stated; the Field Atlas exercises use W/D = 4 and 5"⟩,
    ⟨"a clinical state is a coordinate in this well, with noise D", .open_ "interpretive (the trauma well)"⟩]
  prediction := "log ⟨T⟩ is linear in 1/D (Arrhenius), slope W; raising the field temperature shortens the dwell exponentially"
  disconfirmation := "in the programme's own simulations or in data, log dwell time not linear in 1/D at W ≫ D (rule 3)"
  negativeControl := ⟨"a narrower well is escaped faster: 'narrow' does not explain persistence",
    .lean ``Fishing.Kramers.narrower_faster⟩

#guard row.wellFormed

#print axioms curvatures
#print axioms deeper_slower
#print axioms narrower_faster
#print axioms arrhenius

end Fishing.Kramers
