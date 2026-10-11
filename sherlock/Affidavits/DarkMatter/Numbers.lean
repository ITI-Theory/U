/-!
# Dark Matter as the Spatial Vacuum (P22), part 1: the paper's own numbers

Source: U `paper/soma/dark-matter-spatial-vacuum/dark-matter-spatial-vacuum.md`,
frozen at commit `2d728a4`, SHA-256
`52f7ebbb4920243c8266e81479c9c74fbc3a9469ed5c85dd6ba777c6c63b05a6`. The
first slice of the cross-document pipeline (ISS-061): P22 and P11 both quote
Ω_DM = 3/11 and Planck 2018's 0.2645. Values ×10000; core Lean only.
-/

namespace Affidavit.DarkMatter.Numbers

/-- "3/11 ≈ 0.2727 … 0.2645: a 3.1% high discrepancy" (lines 15-17, 111):
(3/11 − 0.2645)/0.2645 = 905/29095, between 3.1% and 3.2%. -/
theorem dark_matter_three_point_one :
    30000 - 11 * 2645 = 905 ∧ 31 * 29095 ≤ 905 * 1000 ∧ 905 * 1000 < 32 * 29095 := by
  decide

/-- "7/11 … 0.6847: 7.1% low" (line 110): (0.6847 − 7/11)/0.6847 =
5317/75317, between 7.0% and 7.1% (7.06%, rounded to 7.1). -/
theorem dark_energy_seven_point_one :
    11 * 6847 - 70000 = 5317 ∧ 70 * 75317 ≤ 5317 * 1000 ∧ 5317 * 1000 < 71 * 75317 := by
  decide

/-- "1/22 ≈ 0.0455 vs 0.0493 (7.8% low)" (line 263): (0.0493 − 1/22)/0.0493
= 846/10846, between 7.8% and 7.9%. -/
theorem baryons_seven_point_eight :
    22 * 493 - 10000 = 846 ∧ 78 * 10846 ≤ 846 * 1000 ∧ 846 * 1000 < 79 * 10846 := by
  decide

/-- The observed budget (line 279): 0.6847 + 0.2645 + 0.0493 + 0.001 +
0.0001 = 0.9996 (×10000). -/
theorem observed_budget : 6847 + 2645 + 493 + 10 + 1 = 9996 := by decide

end Affidavit.DarkMatter.Numbers