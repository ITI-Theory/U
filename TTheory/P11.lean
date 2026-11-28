/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import LimbicTunnel
import LimbicHopfield
import MTheoryIsomorphism

/-!
# P11 · The Zoomable Universal Somatic Field

*A Scale-Invariant Green's Function Architecture*

[T]-Theory's eleventh paper, as Lean. Source:
`paper/soma/zoomable-somatic-field/zoomable-somatic-field.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P11).

P11 is the architecture: one master equation and its Green's function at every scale, the
log-sum-exp limit that joins the two Hopfield networks, the eleven dimensions, the orbifold well,
the twenty-scale catalogue and the cosmic ledger. Where the programme's Lean already proves a part
(`LimbicTunnel`, `LimbicHopfield`, `MTheoryIsomorphism`), the claim is witnessed by it. Two do not
hold as written: eq. (1)'s source and eq. (2)'s Green's function differ by a sign, and the
catalogue's lengths fall from Scale 13 to Scale 14.
-/

namespace TTheory.P11

open TTheory Real Filter Topology

/-! ## 2.1 The master equation and its Green's function

"`(∇² + k²) G(x, x') = δ(x - x')` (1) ... `G(x, x') = e^{ik|x-x'|}/(4π|x-x'|)` (2)". A source `+δ`
means a flux `+1` out of a small sphere around it: `4πr² G'(r) → +1`. For eq. (2)'s `G` (its real
part, `cos(kr)/(4πr)`) the flux tends to `−1`: that `G` solves the equation with `−δ`. -/

/-- Eq. (2)'s Green's function, its real part, at distance `r`. -/
noncomputable def green (k r : ℝ) : ℝ := Real.cos (k * r) / (4 * π * r)

theorem green_deriv (k : ℝ) {r : ℝ} (hr : r ≠ 0) :
    HasDerivAt (green k)
      ((-(k * r * Real.sin (k * r)) - Real.cos (k * r)) / (4 * π * r ^ 2)) r := by
  have h1 : HasDerivAt (fun r => Real.cos (k * r)) (-Real.sin (k * r) * (k * 1)) r :=
    ((hasDerivAt_id' r).const_mul k).cos
  have h2 : HasDerivAt (fun r => 4 * π * r) (4 * π * 1) r := (hasDerivAt_id' r).const_mul (4 * π)
  have hne : 4 * π * r ≠ 0 := mul_ne_zero (by positivity) hr
  refine (h1.div h2 hne).congr_deriv ?_
  field_simp

/-- The flux through a sphere of radius `r`. -/
theorem flux_eq (k : ℝ) {r : ℝ} (hr : r ≠ 0) :
    4 * π * r ^ 2 * deriv (green k) r = -(k * r * Real.sin (k * r)) - Real.cos (k * r) := by
  rw [(green_deriv k hr).deriv]
  field_simp

/-- As the sphere shrinks the flux tends to `−1`. -/
theorem flux_limit (k : ℝ) :
    Tendsto (fun r => 4 * π * r ^ 2 * deriv (green k) r) (𝓝[>] 0) (𝓝 (-1)) := by
  have hc : Continuous (fun r : ℝ => -(k * r * Real.sin (k * r)) - Real.cos (k * r)) := by
    fun_prop
  have h := (hc.tendsto 0).mono_left (nhdsWithin_le_nhds (s := Set.Ioi 0))
  simp only [mul_zero, Real.sin_zero, Real.cos_zero, neg_zero, zero_sub] at h
  refine h.congr' ?_
  filter_upwards [self_mem_nhdsWithin] with r hr
  exact (flux_eq k (ne_of_gt hr)).symm

/-! ## 2.3 The correspondence limit

"`lim_{β→∞} softmax(β·z)_i = 1[i = argmax z]` (4)": every entry below the maximum vanishes, bounded
by `e^{β(z_i - z_j)}` for any larger `z_j`. -/

theorem softmax_le {n : ℕ} (β : ℝ) (z : Fin n → ℝ) (i j : Fin n) :
    LimbicHopfield.softmax β z i ≤ Real.exp (β * (z i - z j)) := by
  unfold LimbicHopfield.softmax
  have hj : Real.exp (β * z j) ≤ ∑ l, Real.exp (β * z l) :=
    Finset.single_le_sum (f := fun l => Real.exp (β * z l)) (fun l _ => (Real.exp_pos _).le)
      (Finset.mem_univ j)
  calc Real.exp (β * z i) / ∑ l, Real.exp (β * z l)
      ≤ Real.exp (β * z i) / Real.exp (β * z j) :=
        div_le_div_of_nonneg_left (Real.exp_pos _).le (Real.exp_pos _) hj
    _ = Real.exp (β * (z i - z j)) := by rw [← Real.exp_sub]; ring_nf

theorem softmax_vanishes {n : ℕ} (z : Fin n → ℝ) {i j : Fin n} (h : z i < z j) :
    Tendsto (fun β => LimbicHopfield.softmax β z i) atTop (𝓝 0) := by
  have hexp : Tendsto (fun β : ℝ => Real.exp (β * (z i - z j))) atTop (𝓝 0) :=
    Real.tendsto_exp_atBot.comp (tendsto_id.atTop_mul_const_of_neg (by linarith))
  exact tendsto_of_tendsto_of_tendsto_of_le_of_le tendsto_const_nhds hexp
    (fun β => LimbicHopfield.softmax_nonneg β z i) (fun β => softmax_le β z i j)

/-! ## 3. Eleven dimensions; the limbic axis; the tunnelling amplitude -/

/-- "`dx/dt = -V'(x) = -4Wx(x² - 1) < 0` for `x ∈ (-1, 0)`" (§6.3): below the barrier the flow runs
    to the trauma well. -/
theorem trauma_flow {W x : ℝ} (hW : 0 < W) (h1 : -1 < x) (h0 : x < 0) :
    -(4 * W * x * (x ^ 2 - 1)) < 0 := by
  have : 0 < x * (x ^ 2 - 1) := by nlinarith
  nlinarith

/-- "`Θ(W) = exp(-8√(2W)/3) > 0`" (11, 12) is `LimbicTunnel`'s WKB amplitude. -/
theorem theta_is_wkb (W : ℝ) :
    SomaField.LimbicTunnel.wkbAmplitude W = Real.exp (-(8 * Real.sqrt (2 * W) / 3)) := by
  unfold SomaField.LimbicTunnel.wkbAmplitude SomaField.LimbicTunnel.wkbAction
  congr 1; ring

/-! ## The twenty-scale catalogue and the cosmic ledger

The catalogue's lengths, by scale, as the midpoint of each heading's range in `log₁₀ m`, doubled
to stay whole: 0 Quantum Foam −35, 1 String −32, 2 Nuclear −15, 3 Atomic −10, 4 Molecular −9,
5 Cellular −6, 6 Brain −1, 7 Organism 0, 8 Swarms 0-1, 9 Society 3, 10 Geological 5, 11 Planetary
6, 12 Orbital 9, 13 Stellar 11, 14 Black Holes 3-10, 15-16 Galactic 20-22, 17-18 Large-Scale
23-24, 19-20 Observable 26. -/

def catalogue : List ℤ :=
  [-70, -64, -30, -20, -18, -12, -2, 0, 1, 6, 10, 12, 18, 22, 13, 42, 47, 52]

/-! ## P11's claims -/

def cSource : Claim where
  id := "P11.eq1-2"
  text := "(∇² + k²) G = δ (1), with G = e^{ik|x-x'|}/(4π|x-x'|) (2): a unit source at x'."
  statement := ∀ k : ℝ, Tendsto (fun r => 4 * π * r ^ 2 * deriv (green k) r) (𝓝[>] 0) (𝓝 1)

/-- Refuted: for eq. (2)'s `G` the flux tends to `−1`, so it solves (1) with `−δ` (or (2) needs a
    minus sign). -/
instance : Refutation cSource := .of fun h => by
  have := tendsto_nhds_unique (h 0) (flux_limit 0)
  norm_num at this

def cCorrespondence : Claim where
  id := "P11.eq4"
  text := "lim_{β→∞} softmax(β·z)_i = 1[i = argmax z]: the correspondence limit (every entry below \
    the maximum vanishes)."
  statement := ∀ n (z : Fin n → ℝ) (i j : Fin n), z i < z j →
    Tendsto (fun β => LimbicHopfield.softmax β z i) atTop (𝓝 0)

instance : Witness cCorrespondence := .of fun _ z _ _ h => softmax_vanishes z h

def cFMHN : Claim where
  id := "P11.fm-hn"
  text := "FM-HN Correspondence Principle: at Φ_limbic = 0, T(t) = T₀ and W(t) = W₀, the 1982 \
    network (LimbicHopfield)."
  statement := ∀ (T₀ σ : ℝ) (d : ℕ) (W₀ J : Matrix (Fin d) (Fin d) ℝ) (γ : ℝ),
    LimbicHopfield.modulatedTemp T₀ σ ⟨0, le_refl 0, zero_le_one⟩ = T₀ ∧
    LimbicHopfield.modulatedW W₀ J γ ⟨0, le_refl 0, zero_le_one⟩ = W₀

instance : Witness cFMHN := .of fun T₀ σ _ W₀ J γ =>
  LimbicHopfield.correspondence_principle T₀ σ W₀ J γ

def cEleven : Claim where
  id := "P11.eq5-7"
  text := "M₁₁ = M₄ × P₃ × L₁ × C₃, X₇ = P₃ × L₁ × C₃ of dimension 7: SomaField₁₁ ≅ Spacetime × \
    CompactSpace₇ (MTheoryIsomorphism)."
  statement := Module.finrank ℝ SomaField.MTheory.CompactX7 = 7 ∧
    (fun s => SomaField.MTheory.fromMTheory (SomaField.MTheory.toMTheory s)) = id

instance : Witness cEleven :=
  .of ⟨SomaField.MTheory.X7_is_7D_product, SomaField.MTheory.somaField_iso_mtheory⟩

def cTrauma : Claim where
  id := "P11.6.3"
  text := "The trauma attractor: dx/dt = -V'(x) = -4Wx(x² - 1) < 0 for x ∈ (-1, 0); the tunnelling \
    amplitude Θ(W) = exp(-8√(2W)/3) > 0 for every W > 0."
  statement := (∀ W x : ℝ, 0 < W → -1 < x → x < 0 → -(4 * W * x * (x ^ 2 - 1)) < 0) ∧
    ∀ W : ℝ, 0 < Real.exp (-(8 * Real.sqrt (2 * W) / 3))

instance : Witness cTrauma :=
  .of ⟨fun _ _ hW h1 h0 => trauma_flow hW h1 h0, fun W => by
    rw [← theta_is_wkb]; exact SomaField.LimbicTunnel.wkbAmplitude_pos W⟩

def cLedger : Claim where
  id := "P11.ledger"
  text := "11 = 7 + 3 + 1; Ω_DM = 3/11 ≈ 0.2727."
  statement := (11 : ℕ) = 7 + 3 + 1 ∧ (0.2727 : ℚ) < 3 / 11 ∧ (3 / 11 : ℚ) < 0.2728

instance : Witness cLedger := .of ⟨rfl, by norm_num, by norm_num⟩

def cCatalogue : Claim where
  id := "P11.catalogue"
  text := "The twenty-scale catalogue climbs from the quantum foam to the observable universe, \
    each scale larger than the one before."
  statement := catalogue.Pairwise (· < ·)

/-- Refuted: Scale 14, Black Holes and Compact Objects (`10³`-`10¹⁰` m), follows Scale 13, Stellar
    (`10¹¹` m). -/
instance : Refutation cCatalogue :=
  .of (by show ¬ catalogue.Pairwise (· < ·); decide)

/-- P11's claims, in the paper's order. -/
def claims : List Claim :=
  [cSource, cCorrespondence, cEleven, cTrauma, cCatalogue, cLedger, cFMHN]

#status claims

end TTheory.P11
