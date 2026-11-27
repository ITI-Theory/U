import Mathlib
import Method

/-!
# Fishing, eighth catch: Gutenberg-Richter's b ≈ 1 (USC; ISS-126)

The cheatsheet (V, VI): "Gutenberg-Richter b ≈ 1 derived from universality class ... derived, not
empirically fitted". The geophysics book (books/T-Theory/soma-geophysics) gives the reasoning:
the crust sits near a critical point, where the spectral gap goes to zero, and b ∝ Δλ/k_B T_eff.
Its prediction 1 writes N(M) ∝ M^{-b} e^{-S_WKB(M)}.

1. `b_from_moment`, `b_is_one_iff`, `mean_field`: magnitude is logarithmic in seismic moment
   (log₁₀ M₀ = 1.5 M + c, Hanks and Kanamori 1979), so a moment law N(≥M₀) ∝ M₀^{-β} gives b = 3β/2.
   b = 1 needs β = 2/3. The mean-field universality class (a critical branching process, size
   exponent 3/2, β = 1/2) gives b = 3/4. So "derived from the universality class" needs a class
   with β = 2/3, and none is named.
2. `gap_kills_b`: with b ∝ Δλ/T and criticality as Δλ → 0, b → 0 at the critical point, so the
   book's two premises predict b → 0, not b ≈ 1.
3. `not_power_law`: Gutenberg-Richter is exponential in magnitude, N ∝ 10^{-bM}, not N ∝ M^{-b}.
   They differ already at M = 1, so prediction 1 has the wrong base form.

Evidence labels: 1-3 `kernel-verified`; the mean-field exponent is cited (Harris; Zapperi et al.).
-/

open Real Filter Topology

namespace Fishing.Seismic

/-- 1a. The slope in magnitude of log N, given log N = log C - β log M₀ and log M₀ = 1.5 M + c. -/
theorem b_from_moment (logC β c M : ℝ) :
    (logC - β * (1.5 * (M + 1) + c)) - (logC - β * (1.5 * M + c)) = -(3 / 2 * β) := by ring

/-- 1b. b = 1 exactly when β = 2/3. -/
theorem b_is_one_iff (β : ℝ) : 3 / 2 * β = 1 ↔ β = 2 / 3 := by
  constructor <;> intro h <;> linarith

/-- 1c. The mean-field class, β = 1/2: b = 3/4. -/
theorem mean_field : 3 / 2 * (1 / 2 : ℝ) = 3 / 4 := by norm_num

/-- 2. b ∝ Δλ/T goes to 0 as the gap closes. -/
theorem gap_kills_b (c T : ℝ) : Tendsto (fun Δ : ℝ => c * Δ / T) (𝓝 0) (𝓝 0) := by
  have h : Continuous (fun Δ : ℝ => c * Δ / T) := by fun_prop
  simpa using h.tendsto 0

/-- 3. 10^{-bM} and M^{-b} differ at M = 1 for b > 0. -/
theorem not_power_law {b : ℝ} (hb : 0 < b) : (10 : ℝ) ^ (-b * 1) ≠ (1 : ℝ) ^ (-b) := by
  rw [Real.one_rpow, mul_one]
  exact (Real.rpow_lt_one_of_one_lt_of_neg (by norm_num) (by linarith)).ne

def row : Method.Row where
  id := "COID-GR-1"
  source := "a critical point's universality class: a moment law N(≥M₀) ∝ M₀^{-β}"
  target := "Gutenberg-Richter log N = a - bM, with b ≈ 1 claimed derived (cheatsheet V, VI; soma-geophysics)"
  signature := [(.units, "magnitude is log moment: log₁₀ M₀ = 1.5 M + c"),
    (.poles, "a critical point: the spectral gap closes")]
  imported := "b = 3β/2 (b_from_moment)"
  assumptions := [
    ⟨"magnitude is logarithmic in moment", .cited "Hanks and Kanamori 1979"⟩,
    ⟨"b = 1 iff β = 2/3", .lean ``Fishing.Seismic.b_is_one_iff⟩,
    ⟨"the crust's class has β = 2/3", .open_ "no class named; mean field gives β = 1/2, b = 3/4 (mean_field)"⟩,
    ⟨"b ∝ Δλ/T at a critical point", .open_ "then b → 0 as the gap closes (gap_kills_b): the book's two premises conflict"⟩]
  prediction := "b = 3β/2 for the class the crust is in"
  disconfirmation := "the named class's β gives a b outside the observed 0.8 to 1.2 (rule 3)"
  negativeControl := ⟨"N ∝ M^{-b} (the book's prediction 1) is not Gutenberg-Richter's form",
    .lean ``Fishing.Seismic.not_power_law⟩

#guard row.wellFormed

#print axioms gap_kills_b
#print axioms not_power_law

end Fishing.Seismic
