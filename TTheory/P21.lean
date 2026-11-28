/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Fishing.Cosmology

/-!
# P21 · The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic Field

[T]-Theory's twenty-first paper, as Lean. Source:
`paper/soma/cosmological-constant-derivation/cosmological-constant-derivation.md`; its id, title
and DOI are in `Dist/PAPERS.yaml` (P21).

P21 takes `Λ` to be the background amplitude of the USF at the Hubble wavenumber and, by counting
compact dimensions, `Ω_Λ = 7/11`. With `H₀` measured, its quantitative content is that ratio (the
paper says so). Its arithmetic checks: `(H₀/c)² = 5.30 × 10⁻⁵³ m⁻²`, `Λ_obs = 1.09 × 10⁻⁵²`,
`(21/11)(H₀/c)² = 1.01 × 10⁻⁵²`, `0.929`, `0.49`, `√(3Ω_Λ) = 1.43`, `60.93/19 = 3.207`, and the DESI
table's σ. But 7/11 is not "an empirical consistency check" against Planck's `0.6847 ± 0.0073`: it
is more than 6.5σ below it (the fishing's `published_misses`). The equation of state `w = -1` and
the compactification correction are open; `usf_equation_of_state` and `calabi_yau_rg_coefficients`
do not state them.
-/

namespace TTheory.P21

open TTheory

/-! ## The numbers

`H₀ = 67.36 km/s/Mpc`, `1 Mpc = 3.0857 × 10²² m`, `c = 299 792 458 m/s`. -/

/-- `H₀/c` in m⁻¹. -/
def hOverC : ℚ := 67360 / (3.0857e22 * 299792458)

theorem numbers :
    5.30e-53 < hOverC ^ 2 ∧ hOverC ^ 2 < 5.31e-53 ∧
    1.085e-52 < 3 * 0.6847 * hOverC ^ 2 ∧ 3 * 0.6847 * hOverC ^ 2 < 1.095e-52 ∧
    1.005e-52 < 21 / 11 * hOverC ^ 2 ∧ 21 / 11 * hOverC ^ 2 < 1.015e-52 ∧
    0.929 < (7 / 11 : ℚ) / 0.6847 ∧ (7 / 11 : ℚ) / 0.6847 < 0.9295 ∧
    0.485 < 1 / (3 * (0.6847 : ℚ)) ∧ 1 / (3 * (0.6847 : ℚ)) < 0.495 ∧
    (1.43 : ℚ) ^ 2 < 3 * 0.6847 ∧ 3 * 0.6847 < (1.435 : ℚ) ^ 2 ∧
    3.2065 < (60.93 : ℚ) / 19 ∧ (60.93 : ℚ) / 19 < 3.2075 := by
  norm_num [hOverC]

/-- The second figure's "Hubble wavenumber `H₀/c = 7.29e-27`": it is `7.2816 × 10⁻²⁷`. -/
theorem hubble_wavenumber : 7.28e-27 < hOverC ∧ hOverC < 7.285e-27 := by norm_num [hOverC]

/-- The DESI table's distances from `w₀ = -1`: `0.2σ`, `0.1σ`, `3.3σ`, `4.1σ`. -/
theorem desi : |(-0.990 : ℚ) + 1| / 0.050 = 0.2 ∧ |(-0.990 : ℚ) + 1| / 0.130 < 0.1 ∧
    3.25 < |(-0.640 : ℚ) + 1| / 0.110 ∧ |(-0.640 : ℚ) + 1| / 0.110 < 3.35 ∧
    4.05 < |(-0.727 : ℚ) + 1| / 0.067 ∧ |(-0.727 : ℚ) + 1| / 0.067 < 4.15 := by
  norm_num [abs_of_pos]

/-! ## P21's claims -/

def cNumbers : Claim where
  id := "P21.numbers"
  text := "Λ_obs = 3Ω_Λ H₀²/c² ≈ 1.09e-52 m⁻²; H₀²/c² ≈ 5.30e-53; Λ_USF = (21/11) H₀²/c² ≈ \
    1.01e-52; ratios 0.929 and 0.49; ℓ_P Φ₀ ≈ 1.43 = √(3Ω_Λ); 60.93 decades in 19 steps of \
    10^3.207; the DESI table's σ."
  statement := (5.30e-53 < hOverC ^ 2 ∧ hOverC ^ 2 < 5.31e-53 ∧
    1.085e-52 < 3 * 0.6847 * hOverC ^ 2 ∧ 3 * 0.6847 * hOverC ^ 2 < 1.095e-52 ∧
    1.005e-52 < 21 / 11 * hOverC ^ 2 ∧ 21 / 11 * hOverC ^ 2 < 1.015e-52 ∧
    0.929 < (7 / 11 : ℚ) / 0.6847 ∧ (7 / 11 : ℚ) / 0.6847 < 0.9295 ∧
    0.485 < 1 / (3 * (0.6847 : ℚ)) ∧ 1 / (3 * (0.6847 : ℚ)) < 0.495 ∧
    (1.43 : ℚ) ^ 2 < 3 * 0.6847 ∧ 3 * 0.6847 < (1.435 : ℚ) ^ 2 ∧
    3.2065 < (60.93 : ℚ) / 19 ∧ (60.93 : ℚ) / 19 < 3.2075) ∧
    (|(-0.990 : ℚ) + 1| / 0.050 = 0.2 ∧ |(-0.990 : ℚ) + 1| / 0.130 < 0.1 ∧
    3.25 < |(-0.640 : ℚ) + 1| / 0.110 ∧ |(-0.640 : ℚ) + 1| / 0.110 < 3.35 ∧
    4.05 < |(-0.727 : ℚ) + 1| / 0.067 ∧ |(-0.727 : ℚ) + 1| / 0.067 < 4.15)

instance : Witness cNumbers := .of ⟨numbers, desi⟩

def cHubble : Claim where
  id := "P21.hubble-wavenumber"
  text := "Hubble wavenumber H₀/c = 7.29e-27 m⁻¹ (to the figure's three figures)."
  statement := 7.285e-27 ≤ hOverC ∧ hOverC < 7.295e-27

/-- It is `7.2816 × 10⁻²⁷`: `7.28`. -/
instance : Refutation cHubble := .of fun h => absurd hubble_wavenumber.2 (not_lt.mpr h.1)

def cPartition : Claim where
  id := "P21.partition"
  text := "Ω_vac = N_compact/N_total = 7/11 ≈ 0.6364 (omega_lambda_fraction), 7.1% below the \
    observed 0.6847 (omega_lambda_discrepancy_small)."
  statement := (SomaField.Cosmological.Omega_Lambda_USF : ℝ) = 7 / 11 ∧
    |((SomaField.Cosmological.Omega_Lambda_USF : ℝ) - SomaField.Cosmological.Omega_Lambda_obs)| /
      SomaField.Cosmological.Omega_Lambda_obs < 0.08

instance : Witness cPartition := .of ⟨SomaField.Cosmological.omega_lambda_fraction,
  SomaField.Cosmological.omega_lambda_discrepancy_small⟩

def cConsistency : Claim where
  id := "P21.consistency"
  text := "The 7.1% agreement between 7/11 and the current Ω_Λ = 0.6847 is an empirical \
    consistency check (Planck 2018, ± 0.0073: within 3σ)."
  statement := (0.6847 : ℝ) - 7 / 11 ≤ 3 * 0.0073

/-- 7/11 is more than 6.5σ below Planck's value (`Fishing.Cosmology.published_misses`). -/
instance : Refutation cConsistency := .of fun h => by
  have h' : (0.6847 : ℝ) - 7 / 11 ≤ 3 * 0.0073 := h
  have := Fishing.Cosmology.published_misses
  linarith

/-- That the USF condensate has `w = -1` exactly: `usf_equation_of_state` states only that some
    `w = -1` and a constant `7/11` exist (the paper says so). -/
opaque condensateIsLambda : Prop

def cEquationOfState : Claim where
  id := "P21.w"
  text := "A classical background condensate in its regulated vacuum has w = p/ρ = -1; any \
    detection of w ≠ -1 would falsify the claim that Λ is a classical USF condensate."
  statement := condensateIsLambda

/-- That the 7.1% is a compactification-geometry correction: "the content of the open axiom
    `calabi_yau_rg_coefficients`", whose statement (rigid attractor, scale factors above 1) does
    not mention it. -/
opaque compactCorrection : Prop

def cCorrection : Claim where
  id := "P21.correction"
  text := "The 7.1% discrepancy is an open compactification-geometry correction: the metric data \
    on X₇ may depart from simple dimension counting by ~7%."
  statement := compactCorrection

/-- P21's claims, in the paper's order. -/
def claims : List Claim :=
  [cNumbers, cHubble, cPartition, cConsistency, cCorrection, cEquationOfState]

#status claims

end TTheory.P21
