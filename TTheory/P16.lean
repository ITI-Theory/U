/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P11
import Mathlib.Analysis.Real.Pi.Bounds

/-!
# P16 · The Geographic Somatic Field

[T]-Theory's sixteenth paper, as Lean. Source:
`paper/soma/geographic-somatic-field/geographic-somatic-field.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P16).

P16 evaluates the USF's Helmholtz equation on geography: the Thames Valley as a wave-guide for
Estuary English and for parakeet murmurations, the Klöntalersee as an acoustic resonator. Its
equation (1) is P11's, with P11's sign. Its wave-guide runs backwards: in a corridor of width `a`
the lowest transverse mode travels when `k > π/a`, so a pattern whose wavelength is shorter than
the corridor propagates, and one longer than twice its width is cut off and decays; the paper says
the short ones decay. Its scale numbers put the swarms at Scale 7, where P11's catalogue has the
organism. The acoustic wavenumber checks.
-/

namespace TTheory.P16

open TTheory Filter Topology Real

/-! ## The wave-guide

A corridor `0 ≤ y ≤ a` with walls where the field vanishes: the lowest mode is `sin(πy/a) X(x)`,
and `Δu + k²u = 0` leaves `X'' + (k² - (π/a)²) X = 0`. Above the cutoff `X = cos(qx)`,
`q² = k² - (π/a)²`, which travels; below it `X = e^{-κx}`, `κ² = (π/a)² - k²`, which decays. -/

theorem cos_ode (q x : ℝ) : deriv (deriv fun x => cos (q * x)) x = -q ^ 2 * cos (q * x) := by
  have h1 : deriv (fun x => cos (q * x)) = fun x => -(sin (q * x) * q) := by
    funext x
    have := ((hasDerivAt_id x).const_mul q).cos
    simpa using this.deriv
  rw [h1]
  have := (((hasDerivAt_id x).const_mul q).sin.mul_const q).neg
  simp only [mul_one, id] at this
  rw [show deriv (fun x => -(sin (q * x) * q)) x = -(cos (q * x) * q * q) from this.deriv]; ring

theorem exp_ode (κ x : ℝ) : deriv (deriv fun x => exp (-κ * x)) x = κ ^ 2 * exp (-κ * x) := by
  have h1 : deriv (fun x => exp (-κ * x)) = fun x => exp (-κ * x) * -κ := by
    funext x
    have := ((hasDerivAt_id x).const_mul (-κ)).exp
    simpa using this.deriv
  rw [h1]
  have := (((hasDerivAt_id x).const_mul (-κ)).exp.mul_const (-κ))
  simp only [mul_one, id] at this
  rw [this.deriv]; ring

theorem sin_ode (p y : ℝ) : deriv (deriv fun y => sin (p * y)) y = -p ^ 2 * sin (p * y) := by
  have h1 : deriv (fun y => sin (p * y)) = fun y => cos (p * y) * p := by
    funext y
    have := ((hasDerivAt_id y).const_mul p).sin
    simpa using this.deriv
  rw [h1]
  have := (((hasDerivAt_id y).const_mul p).cos.mul_const p)
  simp only [mul_one, id] at this
  rw [this.deriv]; ring

/-- The transverse profile vanishes on both walls. -/
theorem walls {a : ℝ} (ha : a ≠ 0) : sin (π / a * 0) = 0 ∧ sin (π / a * a) = 0 := by
  rw [mul_zero, sin_zero, div_mul_cancel₀ _ ha, sin_pi]; exact ⟨rfl, rfl⟩

/-- Above the cutoff the mode travels: `cos(qx)` returns to `1` at every `x = 2πn/q`, so it never
    dies away. -/
theorem travels {q : ℝ} (hq : 0 < q) : ¬ Tendsto (fun x => cos (q * x)) atTop (𝓝 0) := by
  intro h
  obtain ⟨N, hN⟩ := eventually_atTop.mp (h.eventually (gt_mem_nhds (by norm_num : (0 : ℝ) < 1 / 2)))
  obtain ⟨n, hn⟩ := exists_nat_gt (N * q / (2 * π))
  have hx : N ≤ 2 * π * n / q := by
    rw [le_div_iff₀ hq]
    have := (div_lt_iff₀ (by positivity : 0 < 2 * π)).mp hn
    linarith
  have := hN _ hx
  rw [show q * (2 * π * n / q) = n * (2 * π) by field_simp, cos_nat_mul_two_pi] at this
  norm_num at this

/-- Below it the mode decays. -/
theorem decays {κ : ℝ} (hκ : 0 < κ) : Tendsto (fun x => exp (-κ * x)) atTop (𝓝 0) := by
  have : Tendsto (fun x => -κ * x) atTop atBot :=
    tendsto_id.const_mul_atTop_of_neg (by linarith)
  exact tendsto_exp_atBot.comp this

/-! ## The scale numbers

"Scales 7–9 on the USF dial correspond to animal swarms, human organisms, and societal-scale
dynamics ... Scale 7 (Animal Swarms) ... `10⁰–10¹` m". P11's catalogue (lengths as doubled
`log₁₀ m`) has `0` at Scale 7, the organism, and `1` at Scale 8, the swarms. -/

theorem scales : P11.catalogue[7]? = some 0 ∧ P11.catalogue[8]? = some 1 ∧
    P11.catalogue[9]? = some 6 ∧ P11.catalogue[10]? = some 10 := by decide

/-! ## The acoustic wavenumber

"`k = ω/c_air ≈ 2πf/340` m⁻¹ (e.g., `f = 100` Hz: `k ≈ 1.8` m⁻¹)": between `1.84` and `1.85`. -/

theorem acoustic : 1.84 < 2 * π * 100 / 340 ∧ 2 * π * 100 / 340 < 1.85 := by
  constructor
  · rw [lt_div_iff₀ (by norm_num)]; nlinarith [pi_gt_d2]
  · rw [div_lt_iff₀ (by norm_num)]; nlinarith [pi_lt_d4]

/-! ## P16's claims -/

def cEquation : Claim where
  id := "P16.eq1"
  text := "(∇² + k²) G(x, x') = δ(x - x') (1), with Re G = cos(k|x-x'|)/(4π|x-x'|) as plotted."
  statement := P11.cSource.statement

/-- P11's sign: the plotted `G` gives a flux of `-1`, so it solves (1) with `-δ`. -/
instance [h : Refutation P11.cSource] : Refutation cEquation := .of h.disproof

def cModes : Claim where
  id := "P16.modes"
  text := "The corridor's Green's function selects which propagation modes survive: a mode above \
    the cutoff travels, one below it decays."
  statement := (∀ q x : ℝ, deriv (deriv fun x => cos (q * x)) x = -q ^ 2 * cos (q * x)) ∧
    (∀ κ x : ℝ, deriv (deriv fun x => exp (-κ * x)) x = κ ^ 2 * exp (-κ * x)) ∧
    (∀ p y : ℝ, deriv (deriv fun y => sin (p * y)) y = -p ^ 2 * sin (p * y)) ∧
    (∀ q : ℝ, 0 < q → ¬ Tendsto (fun x => cos (q * x)) atTop (𝓝 0)) ∧
    (∀ κ : ℝ, 0 < κ → Tendsto (fun x => exp (-κ * x)) atTop (𝓝 0))

instance : Witness cModes := .of ⟨cos_ode, exp_ode, sin_ode, fun _ => travels, fun _ => decays⟩

def cGuide : Claim where
  id := "P16.wave-guide"
  text := "Patterns with a characteristic wavelength shorter than the corridor width decay within \
    a few kilometres."
  statement := ∀ a k : ℝ, 0 < a → 0 < k → 2 * π / k < a →
    ∀ X : ℝ → ℝ, (∀ x, deriv (deriv X) x + (k ^ 2 - (π / a) ^ 2) * X x = 0) →
      Tendsto X atTop (𝓝 0)

/-- Wavelength `1/2` in a corridor of width `1` (`k = 4π > π`): `cos(√15 π x)` travels. -/
instance : Refutation cGuide := .of fun h => by
  have hq : 0 < Real.sqrt 15 * π := by positivity
  apply travels hq
  apply h 1 (4 * π) one_pos (by positivity) (by
    rw [show 2 * π / (4 * π) = 1 / 2 by field_simp; ring]; norm_num)
  intro x
  rw [cos_ode]
  have : Real.sqrt 15 ^ 2 = 15 := Real.sq_sqrt (by norm_num)
  rw [mul_pow, this]; ring

def cScales : Claim where
  id := "P16.scales"
  text := "Scales 7–9: animal swarms (Scale 7, 10⁰–10¹ m), human organisms (8), society \
    (9, 10³ m); the geological Scale 10 at 10⁵ m (P11's catalogue)."
  statement := P11.catalogue[7]? = some 1 ∧ P11.catalogue[9]? = some 6 ∧
    P11.catalogue[10]? = some 10

/-- P11's catalogue has the organism at Scale 7 (`10⁰` m) and the swarms at Scale 8. -/
instance : Refutation cScales := .of (by show ¬ (_ ∧ _); decide)

def cAcoustic : Claim where
  id := "P16.acoustic"
  text := "Acoustic: k = ω/c_air ≈ 2πf/340 m⁻¹ (f = 100 Hz: k ≈ 1.8 m⁻¹)."
  statement := 1.84 < 2 * π * 100 / 340 ∧ 2 * π * 100 / 340 < 1.85

instance : Witness cAcoustic := .of acoustic

/-- That geographic substrates obey the same equation (Estuary English, the murmurations, the
    lake): "substrate equivalence remains a hypothesis". -/
opaque substrateEquivalence : Prop

def cSubstrate : Claim where
  id := "P16.substrate"
  text := "The same formal operator can be evaluated wherever fields propagate through bounded \
    media; the Thames Valley channels both patterns by the same mechanism."
  statement := substrateEquivalence

/-- P16's claims, in the paper's order. -/
def claims : List Claim :=
  [cEquation, cGuide, cModes, cScales, cAcoustic, cSubstrate]

#status claims

end TTheory.P16
