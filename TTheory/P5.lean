/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2

/-!
# P5 · The Physical Substrate of the Soma-Field

*Biotensegrity, Fascial Interoception, and Bioelectric Correlates of Emotional Field Dynamics*

[T]-Theory's fifth paper, as Lean. Source:
`paper/soma/soma-physical-substrate/soma-physical-substrate.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P5).

P5 proposes where the field could live in the body, and three bridges to the formal model. Most of
it is empirical hypothesis, and here it stays that: the predictions are open claims over observables
the model names but does not know (`opaque`), to be decided by data. What the bridges assert about
the model itself is checked: that lowering a barrier is not crossing it, how the crossing factor
moves as the barrier falls, and what P2's own noise curve says of P5's worked example. -/

namespace TTheory.P5

open TTheory

/-! ## Bridge 2: barrier lowering, not barrier crossing

"In the model, such reduction would not push the system over the barrier; it would *lower* the
barrier so that transitions become more accessible by classical means." In the double well of
`LimbicTunnel` (barrier `W` at 0, Fear at −1): without noise a state below the barrier never
crosses, whatever `W > 0` is, so lowering alone moves nothing; with noise the classical factor
`exp(-W/T)` rises as `W` falls. -/

/-- Lowering the barrier, by itself, crosses nothing: for every barrier height the noiseless trap
    holds. -/
theorem lowering_is_not_crossing (W : ℝ) (hW : 0 < W) (x : ℝ → ℝ)
    (hflow : ∀ t, HasDerivAt x (-(4 * W * x t * (x t ^ 2 - 1))) t)
    (hbelow : SomaField.LimbicTunnel.V ⟨W, hW⟩ (x 0) < W) (hneg : x 0 < 0) :
    ∀ t, 0 ≤ t → x t < 0 :=
  SomaField.LimbicTunnel.classical_trapped ⟨W, hW⟩ x hflow hbelow hneg

/-- With noise, the classical crossing factor rises strictly as the barrier falls. -/
theorem lowering_raises_crossing {T W W' : ℝ} (hT : 0 < T) (h : W' < W) :
    Real.exp (-(W / T)) < Real.exp (-(W' / T)) := by
  apply Real.exp_lt_exp.mpr
  have : W' / T < W / T := div_lt_div_of_pos_right h hT
  linarith

/-! ## P5's worked example against P2's noise curve

"If initial barrier is `W = -12` and intervention reduces it to `W = -6`, QUANT-EXP-1 motivates the
hypothesis that classical thermal dynamics may cross a barrier previously accessible only through
the simulated quantum-adjacent pathway." P2's noise-equivalence table: the classical temperature
that matches the quantum crossing falls from 0.124 at −12 to 0.094 at −6. Both stay far above P2's
cold baseline, 0.02: by P2's own curve the lowered barrier is still not crossed cold. P5 says "may":
this bounds the claim, it does not refute it. -/

/-- `T*` at −12 and at −6, from P2's table (thousandths), and the cold baseline (0.02 = 20). -/
theorem worked_example :
    P2.tStar[6]! = 124 ∧ P2.tStar[0]! = 94 ∧ P2.tStar[0]! < P2.tStar[6]! ∧ 20 < P2.tStar[0]! := by
  decide

/-! ## Bridge 1, as an assumption, and what follows from it

"Fascial stiffness at region `r` maps to `|W_ij|` ... High stiffness = high barrier." An assumption
of the paper (a field of `Bridges`, not a global axiom), over a region's stiffness and barrier the
model names but does not know. From it, prediction 2's direction follows: at a fixed temperature,
the crossing factor rises as the stiffness falls. -/

/-- Body regions, their fascial stiffness (kPa, by shear-wave elastography), and the barrier of the
    transition each represents. -/
opaque Region : Type
opaque stiffness : Region → ℝ
opaque barrierOf : Region → ℝ

/-- P5's bridges, as assumptions. -/
class Bridges : Prop where
  /-- Bridge 1: the barrier is proportional to the region's stiffness. -/
  armoring : ∃ c : ℝ, 0 < c ∧ ∀ r, barrierOf r = c * stiffness r

/-- Under Bridge 1, a region of lower stiffness has the higher crossing factor. -/
theorem release_helps [h : Bridges] {T : ℝ} (hT : 0 < T) {r r' : Region}
    (hs : stiffness r' < stiffness r) :
    Real.exp (-(barrierOf r / T)) < Real.exp (-(barrierOf r' / T)) := by
  obtain ⟨c, hc, hb⟩ := h.armoring
  apply lowering_raises_crossing hT
  rw [hb, hb]
  exact mul_lt_mul_of_pos_left hs hc

/-! ## The predictions: open until measured

Each over the observables it names. No witness: they are hypotheses to be tested, and a study that
tests one becomes a record (as QUANT-EXP-1 is P2's). -/

/-- The groups' mean stiffness (prediction 1), the coherence-outcome correlation (prediction 4), the
    biophoton difference (prediction 5), the Fear-to-Awe HRV shift correlation (prediction 6). -/
opaque stiffnessCPTSD : ℝ
opaque stiffnessControl : ℝ
opaque coherenceOutcome : ℝ
opaque biophotonDifference : ℝ
opaque transitionHRVShift : ℝ

/-! ## P5's claims -/

def cNotCrossing : Claim where
  id := "P5.bridge-2"
  text := "Myofascial release is hypothesised as barrier lowering rather than barrier crossing: \
    lowering the barrier alone crosses nothing."
  statement := ∀ (W : ℝ) (hW : 0 < W) (x : ℝ → ℝ),
    (∀ t, HasDerivAt x (-(4 * W * x t * (x t ^ 2 - 1))) t) →
    SomaField.LimbicTunnel.V ⟨W, hW⟩ (x 0) < W → x 0 < 0 → ∀ t, 0 ≤ t → x t < 0

instance : Witness cNotCrossing := .of lowering_is_not_crossing

def cRaises : Claim where
  id := "P5.lowering"
  text := "Lowering the barrier makes transitions more accessible by classical means."
  statement := ∀ T W W' : ℝ, 0 < T → W' < W → Real.exp (-(W / T)) < Real.exp (-(W' / T))

instance : Witness cRaises := .of fun _ _ _ hT h => lowering_raises_crossing hT h

def cWorked : Claim where
  id := "P5.worked-example"
  text := "Reducing W = -12 to -6 lowers the classical noise that matches the quantum crossing \
    (P2's curve: 0.124 to 0.094), still far above the cold baseline 0.02."
  statement := P2.tStar[6]! = 124 ∧ P2.tStar[0]! = 94 ∧ P2.tStar[0]! < P2.tStar[6]! ∧
    20 < P2.tStar[0]!

instance : Witness cWorked := .of worked_example

def cArmoring : Claim where
  id := "P5.bridge-1"
  text := "Fascial armoring is modelled as high energy barriers: stiffness maps to |W_ij|, so a \
    region released to lower stiffness has the higher crossing factor."
  statement := ∀ [Bridges], ∀ (T : ℝ) (r r' : Region), 0 < T → stiffness r' < stiffness r →
    Real.exp (-(barrierOf r / T)) < Real.exp (-(barrierOf r' / T))

instance : Witness cArmoring := .of fun [Bridges] _ _ _ hT hs => release_helps hT hs

def cPrediction1 : Claim where
  id := "P5.prediction-1"
  text := "CPTSD and complex-trauma populations show elevated fascial stiffness (diaphragm, psoas, \
    posterior cervical chain) against matched controls."
  statement := stiffnessControl < stiffnessCPTSD

def cPrediction4 : Claim where
  id := "P5.prediction-4"
  text := "Therapist-client HRV coherence predicts session outcome, independently of technique \
    (entrainment as a physical analogue of co-identification)."
  statement := 0 < coherenceOutcome

def cPrediction5 : Claim where
  id := "P5.prediction-5"
  text := "Biophotonic emission from CPTSD populations differs from controls at 500-800 nm."
  statement := biophotonDifference ≠ 0

def cPrediction6 : Claim where
  id := "P5.prediction-6"
  text := "Fear-to-Awe transitions correlate with an HRV shift from LF-dominant to HF-dominant."
  statement := 0 < transitionHRVShift

/-- P5's claims, in the paper's order. -/
def claims : List Claim :=
  [cArmoring, cNotCrossing, cRaises, cWorked, cPrediction1, cPrediction4, cPrediction5,
    cPrediction6]

/-- P5's abstract, phrase by phrase. -/
def abstract : List (String × Claim) :=
  [("Fascial armoring is modelled as high energy barriers in the attractor landscape", cArmoring),
   ("myofascial release is hypothesised as barrier lowering rather than barrier crossing",
      cNotCrossing),
   ("therapist-client physiological entrainment is proposed as a possible physical analogue of \
      mathematical co-identification", cPrediction4),
   ("Each bridge generates testable predictions outside the computational domain", cPrediction1)]

#status claims

#covers abstract claims

end TTheory.P5
