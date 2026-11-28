/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P21

/-!
# P22 · Dark Matter as the Spatial Vacuum of the Universal Somatic Field

[T]-Theory's twenty-second paper, as Lean. Source:
`paper/soma/dark-matter-spatial-vacuum/dark-matter-spatial-vacuum.md`; its id, title and DOI are
in `Dist/PAPERS.yaml` (P22).

P22 counts the three non-compact spatial dimensions of the eleven, `Ω_DM = 3/11`, beside P21's
`7/11` and a baryon `1/22` with a fitted half. Its fractions and percentages check, its budget
sums to `21/22` as it says, and its own look-elsewhere estimate (about 20%) is right. The shortfall
cannot be curvature (more than 23σ, the fishing's `curvature_excluded`), which the paper does not
claim. Electromagnetic neutrality holds by definition (`gaugeCoupling` is defined as `0`), and
`w = 0` for the spatial block is a placeholder: both are open as physics.
-/

namespace TTheory.P22

open TTheory

/-! ## The fractions -/

theorem fractions :
    (3 : ℚ) / 11 = 3 / 11 ∧ 0.030 < ((3 : ℚ) / 11 - 0.2645) / 0.2645 ∧
    ((3 : ℚ) / 11 - 0.2645) / 0.2645 < 0.032 ∧
    0.077 < (0.0493 - (1 : ℚ) / 22) / 0.0493 ∧ (0.0493 - (1 : ℚ) / 22) / 0.0493 < 0.079 ∧
    ((7 : ℚ) / 11) / (1 / 22) = 14 ∧ ((3 : ℚ) / 11) / (1 / 22) = 6 ∧
    (11 : ℕ) - 7 - 1 = 3 ∧
    (7 : ℚ) / 11 + 3 / 11 + 1 / 22 = 21 / 22 ∧
    (0.6847 : ℚ) + 0.2645 + 0.0493 + 0.001 + 0.0001 = 0.9996 := by
  norm_num

/-- "The probability of the nearest fraction lying within 3.5% of a target by chance (given
    uniform spacing)": a window of `± 3.5%` of `0.2645` on a grid of step `1/11`, about 20%. -/
theorem chance : 0.20 < 2 * 0.035 * (0.2645 : ℚ) / (1 / 11) ∧
    2 * 0.035 * (0.2645 : ℚ) / (1 / 11) < 0.21 := by norm_num

/-- "`m_φ ∼ M_Pl/√(8π) ∼ 10¹⁸ GeV`" with `M_Pl c² = 1.22 × 10¹⁹ GeV`: `m² = M²/(8π)` lies between
    `10³⁶` and `10³⁸` GeV²; and "`E_cosm ∼ H₀ħ ∼ 10⁻³³ eV`" (`ħ = 6.582 × 10⁻¹⁶ eV s`, `H₀` from
    P21). -/
theorem kk : (1e36 : ℝ) < (1.22e19) ^ 2 / (8 * Real.pi) ∧ (1.22e19 : ℝ) ^ 2 / (8 * Real.pi) < 1e38 ∧
    (1e-33 : ℚ) < 6.582e-16 * (P21.hOverC * 299792458) ∧
    6.582e-16 * (P21.hOverC * 299792458) < (1e-32 : ℚ) := by
  have h3 := Real.pi_gt_three
  have h4 := Real.pi_lt_four
  refine ⟨?_, ?_, ?_, ?_⟩
  · rw [lt_div_iff₀ (by positivity)]; nlinarith
  · rw [div_lt_iff₀ (by positivity)]; nlinarith
  all_goals norm_num [P21.hOverC]

/-! ## P22's claims -/

def cFractions : Claim where
  id := "P22.fractions"
  text := "Ω_DM = N_spatial/N_total = 3/11 ≈ 0.2727 (3.1% high); Ω_b = (1/2)(1/11) = 1/22 (7.8% \
    low); 7 : 3 : 1/2; N_spatial = 11 - 7 - 1 = 3; the sum 21/22; the observed 0.9996."
  statement := ((SomaField.DarkMatter.Omega_DM_USF : ℝ) = 3 / 11 ∧
      (SomaField.DarkMatter.Omega_b_USF : ℝ) = 1 / 22) ∧
    ((3 : ℚ) / 11 = 3 / 11 ∧ 0.030 < ((3 : ℚ) / 11 - 0.2645) / 0.2645 ∧
    ((3 : ℚ) / 11 - 0.2645) / 0.2645 < 0.032 ∧
    0.077 < (0.0493 - (1 : ℚ) / 22) / 0.0493 ∧ (0.0493 - (1 : ℚ) / 22) / 0.0493 < 0.079 ∧
    ((7 : ℚ) / 11) / (1 / 22) = 14 ∧ ((3 : ℚ) / 11) / (1 / 22) = 6 ∧
    (11 : ℕ) - 7 - 1 = 3 ∧
    (7 : ℚ) / 11 + 3 / 11 + 1 / 22 = 21 / 22 ∧
    (0.6847 : ℚ) + 0.2645 + 0.0493 + 0.001 + 0.0001 = 0.9996)

instance : Witness cFractions := .of ⟨⟨SomaField.DarkMatter.omega_dm_fraction,
  SomaField.DarkMatter.omega_baryon_fraction⟩, fractions⟩

def cChance : Claim where
  id := "P22.chance"
  text := "The probability of the nearest fraction k/11 lying within 3.5% of the target by chance \
    is not astronomically small (about 20%)."
  statement := 0.20 < 2 * 0.035 * (0.2645 : ℚ) / (1 / 11) ∧
    2 * 0.035 * (0.2645 : ℚ) / (1 / 11) < 0.21

instance : Witness cChance := .of chance

def cShortfall : Claim where
  id := "P22.shortfall"
  text := "The sum of the three USF predictions undershoots unity by 1/22; with Friedmann's \
    closure the shortfall would be curvature, which Planck excludes (more than 23σ)."
  statement := (7 : ℚ) / 11 + 3 / 11 + 1 / 22 = 1 - 1 / 22 ∧
    ∀ Ωr ΩK : ℝ, 0 ≤ Ωr → Ωr < 1 / 10000 → 7 / 11 + (3 / 11 + 1 / 22) + Ωr + ΩK = 1 →
      23 * 0.0019 < ΩK - 0.0007

instance : Witness cShortfall := .of ⟨Fishing.Cosmology.budget_short,
  fun Ωr ΩK h0 h1 h2 => Fishing.Cosmology.curvature_excluded Ωr ΩK h0 h1 h2⟩

def cKK : Claim where
  id := "P22.kk"
  text := "m_φ ∼ M_Pl/√(8π) ∼ 10¹⁸ GeV; E_cosm ∼ H₀ħ ∼ 10⁻³³ eV, so the spatial block is \
    non-relativistic by about sixty orders of magnitude."
  statement := (1e36 : ℝ) < (1.22e19) ^ 2 / (8 * Real.pi) ∧
    (1.22e19 : ℝ) ^ 2 / (8 * Real.pi) < 1e38 ∧
    (1e-33 : ℚ) < 6.582e-16 * (P21.hOverC * 299792458) ∧
    6.582e-16 * (P21.hOverC * 299792458) < (1e-32 : ℚ)

instance : Witness cKK := .of kk

def cNeutral : Claim where
  id := "P22.neutral"
  text := "Electromagnetic neutrality from gauge-field localisation: a spatial field does not \
    couple to the X₇ gauge fields (spatial_vacuum_em_neutral; gaugeCoupling is defined as 0)."
  statement := ∀ (φ : SomaField.LocalGeometry.SpatialField3)
    (A : SomaField.LocalGeometry.GaugeField7), SomaField.LocalGeometry.gaugeCoupling φ A = 0

instance : Witness cNeutral := .of SomaField.DarkMatter.spatial_vacuum_em_neutral

/-- That the spatial vacuum block is pressureless (`w = 0`) by Kaluza-Klein reduction:
    `spatial_vacuum_pressure_zero` states only that some `w = 0` exists. -/
opaque spatialPressureless : Prop

def cPressureless : Claim where
  id := "P22.w0"
  text := "The spatial block yields the lowest non-zero KK excitation, non-relativistic, so w ≈ 0: \
    cold, pressureless dark matter."
  statement := spatialPressureless

/-- That the remaining 4.5% is Calabi-Yau corrections plus the epoch of comparison. -/
opaque budgetCorrections : Prop

def cCorrections : Claim where
  id := "P22.corrections"
  text := "The ~4.5% discrepancy has two contributions: Calabi-Yau moduli corrections (~7% per \
    sector) and the epoch of comparison."
  statement := budgetCorrections

/-- P22's claims, in the paper's order. -/
def claims : List Claim :=
  [cFractions, cNeutral, cKK, cPressureless, cShortfall, cCorrections, cChance]

#status claims

end TTheory.P22
