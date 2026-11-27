import Mathlib
import Method
import Fishing.Gravity

/-!
# Fishing, fifth catch: the extra dimensions as a witness (USC; ISS-126)

The author, 27 Nov: "4D -> 8D ... the additional EMF field ... can this be used to add info to
existing equations so other equations can be used ... almost like the emf is itself a witness?"
That is Kaluza and Klein (1921, 1926): one more dimension, and Maxwell comes out of Einstein. In
the method's terms, an extra dimension is a co-identification whose imported theorems supply
premises the 4D equations lack. Tested here on the most important open assumption so far, the
master equation's sign (COID-GRAV-1, COID-KG-1).

1. `kk_reduction`: a massless field in one more space dimension, Φ = φ(t,x) cos(ky), solves
   (∂ₜ²/v² - ∂ₓ² - ∂ᵧ²)Φ = 0 iff φ solves (∂ₜ²/v² - ∂ₓ² + k²)φ = 0, the master equation's
   time-dependent form. The mass k is the momentum around the extra dimension.
2. `orbifold_even`, `periodic`: on D8, the Hořava-Witten S¹/ℤ₂ of the cheatsheet (IV), the even
   modes cos(ny/R) survive, so k is quantised, kₙ = n/R.
3. `tower`: the static response of each mode is the Yukawa e^{-kₙr}/r (the gravity catch), and the
   n = 0 mode is Newton's 1/r. Read this way, gravity is the zero mode, and the modes n ≥ 1 are
   Yukawa corrections at range R.
4. `two_signs`: the two signs on the cheatsheet have two origins. A momentum around a compact SPACE
   dimension gives +k² against -∇² (a mass: the time-dependent form). A frequency in TIME gives
   ∇² + (ω/v)² (Helmholtz: the stationary form, with k = ω/v). These are different k's, not one.
   `timelike_tachyon` (the negative control): a compact TIME-like dimension gives the tachyonic
   sign, the one the memory kernel needs (COID-KG-1).

So the extra dimension is a witness that k² in the time-dependent form is a mass, k = n/R, and it
explains the Helmholtz form without contradiction, if the stationary k is renamed ω/v.
Not formalised: the gauge field from the metric components g_{μ5} and Maxwell from 5D Einstein
(cited). The cost: if gravity propagates in the extra dimensions, R must be below the
torsion-balance bounds (tens of microns), where the cheatsheet puts D5-8 at somatic scales.
Evidence labels: 1-4 `kernel-verified`. The programme's D5-8 as physical compact dimensions is an
`open-hypothesis`.
-/

open Real

namespace Fishing.KaluzaKlein

theorem dy (k y : ℝ) : HasDerivAt (fun y => Real.cos (k * y)) (-(k * Real.sin (k * y))) y := by
  refine ((hasDerivAt_id' y).const_mul k).cos.congr_deriv ?_
  ring

theorem dy2 (k y : ℝ) :
    HasDerivAt (fun y => -(k * Real.sin (k * y))) (-(k ^ 2) * Real.cos (k * y)) y := by
  refine (((hasDerivAt_id' y).const_mul k).sin.const_mul k).neg.congr_deriv ?_
  ring

/-- 1. The reduction, at a point where φ = P, φₜₜ = A and φₓₓ = B (Φᵧᵧ from `dy2`): the extra
    dimension's equation holds for every y iff the master equation holds with mass k. -/
theorem kk_reduction (v k A B P : ℝ) :
    (∀ y, A * Real.cos (k * y) / v ^ 2 - B * Real.cos (k * y) - (-(k ^ 2) * (P * Real.cos (k * y))) = 0)
      ↔ A / v ^ 2 - B + k ^ 2 * P = 0 := by
  constructor
  · intro h
    have h0 := h 0
    rw [mul_zero, Real.cos_zero] at h0
    linear_combination h0
  · intro h y
    have e : A * Real.cos (k * y) / v ^ 2 - B * Real.cos (k * y) - (-(k ^ 2) * (P * Real.cos (k * y)))
        = (A / v ^ 2 - B + k ^ 2 * P) * Real.cos (k * y) := by ring
    rw [e, h, zero_mul]

/-- 2a. The modes cos(ky) are even: they survive the orbifold S¹/ℤ₂ (y ↦ -y). -/
theorem orbifold_even (k y : ℝ) : Real.cos (k * -y) = Real.cos (k * y) := by
  rw [mul_neg, Real.cos_neg]

/-- 2b. On a circle of radius R, k = n/R is periodic. -/
theorem periodic (n : ℕ) {R : ℝ} (hR : R ≠ 0) (y : ℝ) :
    Real.cos (n / R * (y + 2 * π * R)) = Real.cos (n / R * y) := by
  have e : n / R * (y + 2 * π * R) = n / R * y + n * (2 * π) := by
    field_simp
  rw [e, Real.cos_add_nat_mul_two_pi]

/-- 2c. The field across D8 (the segment between the walls, length L = πR): the even modes
    cos(nπy/L) have zero slope at both walls, body (y = 0) and mind (y = L). So k = nπ/L is set by the
    segment's length. -/
theorem segment_walls (n : ℕ) {L : ℝ} (hL : L ≠ 0) :
    -(n * π / L * Real.sin (n * π / L * 0)) = 0 ∧ -(n * π / L * Real.sin (n * π / L * L)) = 0 := by
  refine ⟨by simp, ?_⟩
  rw [div_mul_cancel₀ _ hL, Real.sin_nat_mul_pi, mul_zero, neg_zero]

/-- 3. The tower: mode n's static response is Yukawa with k = n/R; mode 0 is Newton's 1/r. -/
theorem tower (n : ℕ) (R : ℝ) {r : ℝ} (hr : r ≠ 0) :
    Gravity.yukawa'' (n / R) r + 2 / r * Gravity.yukawa' (n / R) r
        - (n / R) ^ 2 * Gravity.yukawa (n / R) r = 0 ∧
      Gravity.yukawa (((0 : ℕ) : ℝ) / R) r = 1 / r :=
  ⟨Gravity.yukawa_solves _ hr, by simp [Gravity.yukawa]⟩

/-- 4. Two signs, two origins. A frequency in time, Φ = ψ cos(ωt) with ψₓₓ = B, turns the wave
    operator into Helmholtz: (ψₓₓ + (ω/v)² ψ) cos(ωt), up to sign. -/
theorem two_signs {v : ℝ} (hv : v ≠ 0) (ω B P t : ℝ) :
    -(ω ^ 2) * (P * Real.cos (ω * t)) / v ^ 2 - B * Real.cos (ω * t)
      = -((B + (ω / v) ^ 2 * P) * Real.cos (ω * t)) := by
  field_simp
  ring

/-- The negative control: a compact time-like dimension, Φ = φ cos(ks) with the sign of ∂ₛ² that of
    ∂ₜ², gives the tachyonic sign (A/v² - B - k²P/v²). -/
theorem timelike_tachyon (v k A B P s : ℝ) :
    (A * Real.cos (k * s) + -(k ^ 2) * (P * Real.cos (k * s))) / v ^ 2 - B * Real.cos (k * s)
      = (A / v ^ 2 - B - k ^ 2 * P / v ^ 2) * Real.cos (k * s) := by
  ring

/-- The catch as a row: Kaluza-Klein on D8 as the witness for the sign. -/
def row : Method.Row where
  id := "COID-KK-1"
  source := "Kaluza-Klein reduction of a massless field on a compact dimension (Kaluza 1921, Klein 1926), on S¹/ℤ₂ (Hořava-Witten 1996)"
  target := "the master equation's mass term k, with D8 the limbic orbifold S¹/ℤ₂ (cheatsheet IV)"
  signature := [(.operatorForm, "the higher-dimensional wave operator restricted to one mode is Klein-Gordon"),
    (.symmetry, "ℤ₂: y ↦ -y keeps the even modes cos(ny/R)"),
    (.poles, "a tower of poles at kₙ = n/R; n = 0 massless")]
  imported := "k² is a mass, kₙ = n/R; gravity is the zero mode, Yukawa corrections at range R"
  assumptions := [
    ⟨"one mode of the massless field solves the master equation", .lean ``Fishing.KaluzaKlein.kk_reduction⟩,
    ⟨"the orbifold keeps the even modes", .lean ``Fishing.KaluzaKlein.orbifold_even⟩,
    ⟨"k is quantised on the circle", .lean ``Fishing.KaluzaKlein.periodic⟩,
    ⟨"mode n is Yukawa, mode 0 Newton", .lean ``Fishing.KaluzaKlein.tower⟩,
    ⟨"the stationary (Helmholtz) k is a frequency ω/v, not the mass", .lean ``Fishing.KaluzaKlein.two_signs⟩,
    ⟨"the field across D8 meets the walls with zero slope", .lean ``Fishing.KaluzaKlein.segment_walls⟩,
    ⟨"which fields cross D8 (the bulk) and which stay on the walls",
      .open_ "recommended (ISS-126): EM and matter on the walls, as IV and Hořava-Witten have it; gravity and the limbic field across D8. AUTHOR"⟩,
    ⟨"the gauge field is g_{μ5}, Maxwell from 5D Einstein", .cited "Kaluza 1921; Klein 1926; not formalised"⟩,
    ⟨"R is below the torsion-balance bound",
      .open_ "if gravity is in the bulk, R is below tens of microns (Eöt-Wash, Lee et al. 2020); the cheatsheet puts D5-8 at somatic scales"⟩]
  prediction := "masses kₙ = n/R; Newton at r ≫ R, with Yukawa corrections α e^{-r/R}"
  disconfirmation := "Newton's 1/r holding below R (rule 3), with gravity in the bulk"
  negativeControl := ⟨"a compact time-like dimension gives the tachyonic sign",
    .lean ``Fishing.KaluzaKlein.timelike_tachyon⟩

#guard row.wellFormed

#print axioms kk_reduction
#print axioms periodic
#print axioms tower
#print axioms two_signs

end Fishing.KaluzaKlein
