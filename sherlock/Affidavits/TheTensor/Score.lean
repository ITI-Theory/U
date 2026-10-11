/-!
# The Tensor, part 1: the paper's own numbers (Sherlock affidavit, ISS-055)

Source: U `paper/soma/the-tensor/the-tensor.md` (17 May 2026). Every value
below is the paper's, scaled to natural numbers: the Appendix keyframes ×100,
the Part II chart (0–9) ×10. Story-time between keyframes is linear
interpolation, the only reading the Appendix gives. Core Lean only (`decide`,
`omega`); no OpenCyc needed for this part.

Findings, each a theorem below:
1. "Two operating modes:" heads a table of three.
2. The model equation puts κ_r on the film-to-viewer term: at κ_r = 0
   (Projection, "the score drives the viewer") the screen signal drops out.
3. Threshold 1 ("F > 0.7") is never reached by the score: fear peaks at
   exactly 0.70, so the default rendering (κ_r = 0) holds at T1 for ever.
4. Threshold 2 ("L < 0.1 AND PV > 0.85") holds at t = 0.70 but not at its
   declared t = 0.74, nor anywhere in [0.72, 0.8].
5. The chart and the keyframes, the same score twice, differ in 11 of 77
   values, all at t ≥ 0.7.
-/

namespace Affidavit.TheTensor.Score

/-! ## 1. Operating modes -/

inductive OperatingMode | projection | resonance | mirror
  deriving DecidableEq, Repr

/-- The table under "Two operating modes:" (Part I, The Somatic Loop). -/
def operatingModes : List OperatingMode := [.projection, .resonance, .mirror]

theorem operating_modes_not_two : operatingModes.length ≠ 2 ∧ operatingModes.Nodup := by
  decide

/-! ## 2. The model equation and the resonance knob -/

/-- One mode of the model equation, ė_V = −∇H_V(e_V) + κ_r·λ·S(t) + η_V. -/
def rhs (grad κr lam S eta : Int) : Int := -grad + κr * lam * S + eta

/-- At κ_r = 0 the screen signal S has no effect on the viewer, yet the
Projection row says "The score drives the viewer"; the knob table defines
κ_r as the weight of the viewer's biofeedback on the score, the other way. -/
theorem projection_screen_drops_out (grad lam eta S S' : Int) :
    rhs grad 0 lam S eta = rhs grad 0 lam S' eta := by
  simp [rhs]

/-! ## 3–4. Thresholds on the keyframes -/

/-- Appendix keyframes at t = 0, 0.1, …, 1.0, ×100. -/
structure Frame where
  S : Nat
  F : Nat
  C : Nat
  A : Nat
  G : Nat
  L : Nat
  PV : Nat
  deriving DecidableEq, Repr

def keyframes : List Frame := [
  ⟨90, 10, 30, 10, 10, 90, 10⟩, ⟨80, 10, 50, 10, 10, 90, 10⟩,
  ⟨70, 20, 70, 10, 10, 80, 10⟩, ⟨50, 30, 80, 20, 10, 70, 20⟩,
  ⟨30, 50, 70, 30, 20, 50, 30⟩, ⟨20, 70, 50, 40, 30, 30, 50⟩,
  ⟨10, 40, 30, 60, 40, 10, 70⟩, ⟨10, 20, 20, 90, 50, 5, 90⟩,
  ⟨20, 10, 30, 70, 60, 20, 60⟩, ⟨50, 10, 50, 40, 40, 60, 20⟩,
  ⟨90, 10, 50, 20, 20, 90, 10⟩]

/-- Linear interpolation of values a ≤ c and b ≤ c stays ≤ c, at every
rational point p/q of the segment. -/
theorem interp_le {a b c p q : Nat} (ha : a ≤ c) (hb : b ≤ c) (hp : p ≤ q) :
    a * (q - p) + b * p ≤ c * q :=
  calc a * (q - p) + b * p ≤ c * (q - p) + c * p :=
        Nat.add_le_add (Nat.mul_le_mul_right _ ha) (Nat.mul_le_mul_right _ hb)
    _ = c * q := by rw [← Nat.mul_add, Nat.sub_add_cancel hp]

theorem fear_peaks_at_070 : ∀ f ∈ keyframes, f.F ≤ 70 := by decide

/-- Threshold 1 never fires on the score: between keyframes i and i+1, at
every rational story-time, fear ×100 is at most 70 (the condition is > 70). -/
theorem threshold1_unreached (i : Nat) (hi : i + 1 < keyframes.length) (p q : Nat)
    (hp : p ≤ q) :
    (keyframes[i]'(by omega)).F * (q - p) + (keyframes[i + 1]'hi).F * p ≤ 70 * q :=
  interp_le (fear_peaks_at_070 _ (List.getElem_mem _)) (fear_peaks_at_070 _ (List.getElem_mem _)) hp

/-- The chart's own T1 condition ("Safety<2, Fear>7"): fear never exceeds 7. -/
theorem threshold1_chart_unreached :
    ∀ x ∈ [1, 1, 2, 3, 5, 7, 4, 2, 2, 1, 1], x ≤ 7 := by decide

/-- Threshold 2 between keyframes 0.7 and 0.8, at t = 0.7 + s/1000 (×100×100). -/
def L7 (s : Nat) : Nat := 5 * (100 - s) + 20 * s
def PV7 (s : Nat) : Nat := 90 * (100 - s) + 60 * s

theorem threshold2_holds_at_070 : L7 0 < 1000 ∧ PV7 0 > 8500 := by decide

/-- At the declared t = 0.74: L = 0.11 and PV = 0.78; the condition fails. -/
theorem threshold2_fails_at_074 : ¬ (L7 40 < 1000 ∧ PV7 40 > 8500) := by decide

theorem threshold2_fails_from_072 (s : Nat) (h1 : 20 ≤ s) (h2 : s ≤ 100) :
    ¬ PV7 s > 8500 := by
  unfold PV7; omega

/-! ## 5. The chart against the keyframes -/

/-- Part II chart, the same order as `Frame`. -/
def chart : List Frame := [
  ⟨9, 1, 3, 1, 1, 9, 1⟩, ⟨8, 1, 5, 1, 1, 9, 1⟩, ⟨7, 2, 7, 1, 1, 8, 1⟩,
  ⟨5, 3, 8, 2, 1, 7, 2⟩, ⟨3, 5, 7, 3, 2, 5, 3⟩, ⟨2, 7, 5, 4, 3, 3, 5⟩,
  ⟨1, 4, 3, 6, 4, 1, 7⟩, ⟨2, 2, 2, 9, 4, 1, 9⟩, ⟨4, 2, 4, 7, 6, 3, 6⟩,
  ⟨7, 1, 6, 4, 4, 7, 3⟩, ⟨9, 1, 5, 2, 2, 9, 1⟩]

def Frame.vals (f : Frame) : List Nat := [f.S, f.F, f.C, f.A, f.G, f.L, f.PV]

/-- Values that differ (chart ×10 against keyframe ×100), per keyframe. -/
def differences : List Nat :=
  (chart.zip keyframes).map fun (c, k) =>
    ((c.vals.zip k.vals).filter fun (x, y) => x * 10 != y).length

theorem chart_keyframes_differ : differences = [0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 0] := by
  decide

end Affidavit.TheTensor.Score
