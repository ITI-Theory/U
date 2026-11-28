/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2
import TTheory.P7

/-!
# P9 · A Dynamical Field Model of Music-Induced Affect

*Beyond the Valence-Arousal Circumplex*

[T]-Theory's ninth paper, as Lean. Source:
`paper/soma/music-affect-dynamics/music-affect-dynamics.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P9).

P9 runs the soma-field on music: sixteen channels (eight modes, a somatic and a cognitive part
each), the Hopfield energy, Langevin dynamics with an effective temperature, a threshold. Its energy
and threshold are P1's, its noise is P7's; its pilot session's figures are checked against each
other, and its hypotheses are open until tested (H1 has an exploratory pass in the pilot's record).
-/

namespace TTheory.P9

open TTheory

/-! ## The model, against the other chapters -/

/-- "`γ ė = -∇H + √(2D) ξ` ... the effective temperature is `T_eff = D/γ`": per unit damping the
    noise is P7's scale, `√(2 T_eff)`. -/
theorem noise_is_temperature (D γ : ℝ) : P7.noiseScale D γ = Real.sqrt (2 * (D / γ)) := by
  rw [P7.noiseScale, mul_div_assoc]

/-- "`P_i = 1[max(e_i^s, e_i^c) > θ]`": for amplitudes in `[0, 1]` this is P1's eq. (12) on the
    larger of the two channels, at the one threshold `θ`. -/
theorem threshold_is_P1 {n : ℕ} (es ec : Fin n → ℝ) (hs : ∀ i, 0 ≤ es i) (θ : ℝ) (i : Fin n) :
    P1.Perceived (fun _ => θ) (fun j => max (es j) (ec j)) i ↔ θ < max (es i) (ec i) := by
  unfold P1.Perceived
  rw [abs_of_nonneg (le_trans (hs i) (le_max_left _ _))]

/-- "A high-temperature listener ... harder to trap": the chance to leave a basin over a barrier
    `ΔH > 0`, `exp(-ΔH/T)`, rises with the temperature. -/
theorem warmer_escapes {ΔH T T' : ℝ} (hH : 0 < ΔH) (hT : 0 < T) (h : T < T') :
    Real.exp (-(ΔH / T)) < Real.exp (-(ΔH / T')) := by
  apply Real.exp_lt_exp.mpr
  have : ΔH / T' < ΔH / T := div_lt_div_of_pos_left hH hT h
  linarith

/-! ## The pilot session, against itself

"duration: 114.88 s, total transitions: 14 ... nearest-attractor occupancy: regulated_calm 5594
samples, grief 45 samples", logged at 50 Hz; and in the table, "7.31 transitions/min". -/

/-- 14 transitions in 114.88 s are 7.31 a minute. -/
theorem transitions_rate : |(14 : ℚ) / (114.88 / 60) - 7.31| < 0.005 := by norm_num [abs_lt]

/-- The session's samples at 50 Hz, and the occupancy's: 5744 against 5594 + 45 = 5639. -/
theorem occupancy_short : (114.88 : ℚ) * 50 = 5744 ∧ 5594 + 45 = 5639 := by norm_num

/-! ## The hypotheses, and the pilot's record -/

/-- The pilot's H1 measure: target (grief) occupancy in the directed blocks and in the baseline
    block, in percent. -/
opaque griefDirected : ℚ
opaque griefBaseline : ℚ
/-- H2 and H3, as the tests would decide them. -/
opaque freezeSlowerThanCalm : Prop
opaque warmerMoreTransitions : Prop

/-- The pilot session's report ("exploratory pilot fill", single logged session). -/
class Pilot : Prop where
  h1 : griefDirected = 1.2 ∧ griefBaseline = 0

/-! ## P9's claims -/

def cEnergy : Claim where
  id := "P9.energy"
  text := "H(e) = -½eᵀWe - bᵀe, local minima the named attractor states (P1, P2's recap)."
  statement := P2.cRecap.statement

instance [h : Witness P2.cRecap] : Witness cEnergy := .of h.proof

def cThreshold : Claim where
  id := "P9.threshold"
  text := "Mode i crosses into conscious experience when its amplitude exceeds threshold θ."
  statement := ∀ n (es ec : Fin n → ℝ), (∀ i, 0 ≤ es i) → ∀ (θ : ℝ) (i : Fin n),
    P1.Perceived (fun _ => θ) (fun j => max (es j) (ec j)) i ↔ θ < max (es i) (ec i)

instance : Witness cThreshold := .of fun _ es ec hs θ i => threshold_is_P1 es ec hs θ i

def cTemperature : Claim where
  id := "P9.temperature"
  text := "The effective temperature is T_eff = D/γ; a high-temperature listener is harder to trap \
    in a single emotional state."
  statement := (∀ D γ : ℝ, P7.noiseScale D γ = Real.sqrt (2 * (D / γ))) ∧
    ∀ ΔH T T' : ℝ, 0 < ΔH → 0 < T → T < T' → Real.exp (-(ΔH / T)) < Real.exp (-(ΔH / T'))

instance : Witness cTemperature :=
  .of ⟨noise_is_temperature, fun _ _ _ hH hT h => warmer_escapes hH hT h⟩

def cRate : Claim where
  id := "P9.pilot-rate"
  text := "Pilot: 14 transitions in 114.88 s, 7.31 transitions/min."
  statement := |(14 : ℚ) / (114.88 / 60) - 7.31| < 0.005

instance : Witness cRate := .of transitions_rate

def cOccupancy : Claim where
  id := "P9.pilot-occupancy"
  text := "Pilot: nearest-attractor occupancy regulated_calm 5594 samples, grief 45 samples (the \
    session: 114.88 s at 50 Hz)."
  statement := (5594 + 45 : ℚ) = 114.88 * 50

/-- Refuted by the paper's own figures: 5639 samples are accounted for, of 5744; 105 (2.1 s) are
    missing, unless they were excluded, which the pilot should then say. -/
instance : Refutation cOccupancy :=
  .of (by show ¬ (5594 + 45 : ℚ) = 114.88 * 50; norm_num)

def cH1 : Claim where
  id := "P9.H1"
  text := "H1 (attractor residence): directed transition blocks show higher residence in target \
    attractors than the baseline block (pilot: an exploratory pass)."
  statement := ∀ [Pilot], griefBaseline < griefDirected

instance : Witness cH1 := .of fun [h : Pilot] => by rw [h.h1.1, h.h1.2]; norm_num

def cH2 : Claim where
  id := "P9.H2"
  text := "H2 (barrier asymmetry): transition latency into freeze exceeds latency into regulated \
    calm."
  statement := freezeSlowerThanCalm

def cH3 : Claim where
  id := "P9.H3"
  text := "H3 (temperature effect): elevated T_eff reduces dwell time and increases transitions \
    per minute."
  statement := warmerMoreTransitions

/-- P9's claims, in the paper's order. -/
def claims : List Claim := [cEnergy, cTemperature, cThreshold, cH1, cH2, cH3, cRate, cOccupancy]

/-- P9's abstract, phrase by phrase. -/
def abstract : List (String × Claim) :=
  [("an energy function H(e) whose local minima are the named attractor states", cEnergy),
   ("governed by a Langevin equation", cTemperature),
   ("We report an exploratory recorded-session fill", cRate),
   ("the adaptive function of high effective temperature (ADHD modifier)", cTemperature),
   ("We specify preregistration-ready hypotheses", cH1)]

#status claims

#covers abstract claims

end TTheory.P9
