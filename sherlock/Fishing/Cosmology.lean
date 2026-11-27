import Mathlib
import Method
import CosmologicalConstant

/-!
# Fishing, third catch: the cosmological budget closes short (USC; ISS-126)

The cheatsheet's numerical hits: Ω_Λ = 7/11, Ω_c = 3/11 and, in the Lean
(paper/proofs/CosmologicalConstant.lean), Ω_b = 1/22, "95.5% of the total mass-energy". The σ
distances were found on 15 Oct (ISS-106: Ω_Λ 6.6σ, Ω_b 6.4σ, Ω_DM 1.4σ). This catch is the
unstated premise: Friedmann's closure, Ω_Λ + Ω_m + Ω_r + Ω_K = 1.

1. `budget_short`: the budget sums to 21/22, so the "95.5%" is 1 - 1/22, a shortfall rather than a success.
2. `curvature_excluded`: under closure the missing 1/22 is spatial curvature, more than 23σ from
   Planck 2018 with BAO (Ω_K = 0.0007 ± 0.0019).
3. `flat_fit`: imposing flatness and giving the missing 1/22 to dark energy gives Ω_Λ = 15/22 = 0.6818
   and Ω_m = 7/22 = 0.3182, each within 0.4σ of Planck (0.6847 and 0.3153, ± 0.0073), where the
   published 7/11 is 6.5σ off (`published_misses`).
4. `chance`: but the grid n/22 puts any value within 0.4σ of a grid point with chance about 13%, so
   the match alone is weak evidence (P3 §7, over-identification), and it is post hoc. The row
   pre-registers 15/22 for the next surveys instead of counting it as a pass.

Planck 2018 (TT,TE,EE+lowE+lensing, base ΛCDM; Ω_K with BAO); radiation Ω_r ≈ 9 × 10⁻⁵ < 10⁻⁴.
Evidence labels: 1-4 `kernel-verified` arithmetic. That the missing 1/22 is dark energy is an
`open-hypothesis` with no derivation; the matter split (Ω_b = 1/22, 6.4σ) is not fixed by it.
-/

namespace Fishing.Cosmology

/-- 1. The budget: 7/11 + 3/11 + 1/22 = 1 - 1/22. -/
theorem budget_short : (7 : ℚ) / 11 + 3 / 11 + 1 / 22 = 1 - 1 / 22 := by norm_num

/-- 2. With Friedmann's closure, the shortfall is curvature, excluded at more than 23σ. -/
theorem curvature_excluded (Ωr ΩK : ℝ) (_hr : 0 ≤ Ωr) (hr' : Ωr < 1 / 10000)
    (closure : 7 / 11 + (3 / 11 + 1 / 22) + Ωr + ΩK = 1) : 23 * 0.0019 < ΩK - 0.0007 := by
  norm_num
  linarith

/-- The published Ω_Λ = 7/11 is more than 6.5σ below Planck's 0.6847 ± 0.0073. -/
theorem published_misses : 6.5 * 0.0073 < (0.6847 : ℝ) - 7 / 11 := by norm_num

/-- 3. Flat, with the shortfall as dark energy: both within 0.4σ. -/
theorem flat_fit :
    |(15 : ℝ) / 22 - 0.6847| < 0.4 * 0.0073 ∧ |(7 : ℝ) / 22 - 0.3153| < 0.4 * 0.0073 ∧
    (15 : ℝ) / 22 + 7 / 22 = 1 :=
  ⟨abs_lt.mpr ⟨by norm_num, by norm_num⟩, abs_lt.mpr ⟨by norm_num, by norm_num⟩, by norm_num⟩

/-- 4. The look-elsewhere chance: a window of ± 0.4σ on a grid of step 1/22 covers about 13%. -/
theorem chance : (2 * (0.4 * 0.0073)) / (1 / 22 : ℝ) < 0.13 := by norm_num

/-- The published budget as a row, tested against Planck: falsified as a precision prediction
    (rule 3). P21 calls 7/11 zeroth order; no correction is derived anywhere (ISS-106). -/
def published : Method.Row :=
  ({ id := "COID-COSMO-1"
     source := "dimension counting: 7 compact, 3 spatial, 1 time of 11 (P21)"
     target := "the cosmic energy budget Ω_Λ, Ω_c, Ω_b"
     signature := [(.units, "dimensionless fractions of the critical density")]
     imported := "Ω_Λ = 7/11, Ω_c = 3/11, Ω_b = 1/22"
     assumptions := [
       ⟨"the partition 7 + 3 + 1 = 11", .lean ``SomaField.EnergyBudget.usf_dimensional_partition⟩,
       ⟨"a dimension's share of 11 is its share of the energy density", .open_ "no derivation (P21)"⟩,
       ⟨"7/11 is the full value, not zeroth order", .open_ "P21 calls it zeroth order; no correction derived (ISS-106)"⟩]
     prediction := "Ω_Λ = 7/11 = 0.6364"
     disconfirmation := "Planck-class data more than 5σ from 7/11"
     negativeControl := ⟨"Ω_DM = 3/11 passes (1.4σ) by the same counting: a pass of one row does not save another",
       .cited "ISS-106, 15 Oct"⟩ } : Method.Row).test
    "Planck 2018: Ω_Λ = 0.6847 ± 0.0073, 7/11 is 6.6σ below (published_misses)" false

/-- The catch as a row: flat closure, pre-registered, not yet tested. -/
def row : Method.Row where
  id := "COID-COSMO-2"
  source := "Friedmann's closure Ω_Λ + Ω_m + Ω_r + Ω_K = 1, with Ω_K ≈ 0"
  target := "the budget 7/11 + 3/11 + 1/22, which closes at 21/22"
  signature := [(.units, "dimensionless fractions of the critical density, summing to 1")]
  imported := "Ω_Λ = 15/22, Ω_m = 7/22 (flat_fit)"
  assumptions := [
    ⟨"the universe is flat", .cited "Planck 2018 + BAO: Ω_K = 0.0007 ± 0.0019"⟩,
    ⟨"the budget as published leaves 1/22", .lean ``Fishing.Cosmology.budget_short⟩,
    ⟨"the missing 1/22 is dark energy",
      .open_ "no derivation: the time block's other half (P21's baryogenesis factor of 1/2) given to Λ by fiat; AUTHOR"⟩,
    ⟨"a 0.4σ match is evidence", .open_ "look-elsewhere: 13% by chance on the n/22 grid (chance); post hoc"⟩,
    ⟨"the matter split 6/22 + 1/22", .open_ "Ω_b = 1/22 is 6.4σ from Planck (ISS-106); only the total 7/22 fits"⟩]
  prediction := "pre-registered 27 Nov 2026: flat fits give Ω_Λ = 15/22 = 0.68182 and Ω_m = 7/22 = 0.31818, w = -1"
  disconfirmation := "a flat fit (Euclid, DESI final, CMB-S4) with Ω_Λ more than 3σ from 15/22, or w ≠ -1 at 5σ (rule 3)"
  negativeControl := ⟨"without closure, 7/11 misses by 6.5σ", .lean ``Fishing.Cosmology.published_misses⟩

#guard published.wellFormed && published.status == .falsified
#guard row.wellFormed

#print axioms curvature_excluded
#print axioms flat_fit

end Fishing.Cosmology
