/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import Mathlib.Data.Real.Basic
import Mathlib.Data.Fin.VecNotation
import Mathlib.Tactic.NormNum

/-!
# P8 · The Tensor

*An Abstract Film Definition*

[T]-Theory's eighth document, as Lean. Source: `paper/soma/the-tensor/the-tensor.md`; its id, title
and DOI are in `Dist/PAPERS.yaml` (P8).

A film defined as a score: seven emotional modes over story-time, threshold events at which the
field tips, control knobs, and the model equation of the somatic loop. The River Film's score is a
table, so its claims can be held to the table: the phases agree with it; the two threshold events'
conditions and times do not, and the resonance knob sits on a different arrow in the equation than
in its definition.
-/

namespace TTheory.P8

open TTheory

/-! ## The River Film's score

"EMOTIONAL SCORE: THE RIVER FILM. Scale: 0 (silent) to 9 (full activation). Resolution: 0.1
story-time units": eleven columns, `t = 0.0, 0.1, ..., 1.0`. -/

def safety : Fin 11 → ℕ := ![9, 8, 7, 5, 3, 2, 1, 2, 4, 7, 9]
def curiosity : Fin 11 → ℕ := ![3, 5, 7, 8, 7, 5, 3, 2, 4, 6, 5]
def fear : Fin 11 → ℕ := ![1, 1, 2, 3, 5, 7, 4, 2, 2, 1, 1]
def awe : Fin 11 → ℕ := ![1, 1, 1, 2, 3, 4, 6, 9, 7, 4, 2]
def grief : Fin 11 → ℕ := ![1, 1, 1, 1, 2, 3, 4, 4, 6, 4, 2]
def language : Fin 11 → ℕ := ![9, 9, 8, 7, 5, 3, 1, 1, 3, 7, 9]
def preverbal : Fin 11 → ℕ := ![1, 1, 1, 2, 3, 5, 7, 9, 6, 3, 1]

/-- Every entry is on the scale. -/
theorem on_scale : ∀ k, safety k ≤ 9 ∧ curiosity k ≤ 9 ∧ fear k ≤ 9 ∧ awe k ≤ 9 ∧ grief k ≤ 9 ∧
    language k ≤ 9 ∧ preverbal k ≤ 9 := by decide

/-! ## The phases, against the table -/

/-- Phase 1, Departure (`t ≤ 0.2` on the grid): "Safety is high; the field is organised. Language
    is dominant": Safety at least 7 and Language at least every other mode. -/
theorem phase1 : ∀ k : Fin 11, k.val ≤ 2 → 7 ≤ safety k ∧ curiosity k ≤ language k ∧
    fear k ≤ language k ∧ awe k ≤ language k ∧ grief k ≤ language k ∧
    preverbal k ≤ language k := by
  decide

/-- Phase 3, the Deep River (`0.52 ≤ t ≤ 0.74`, columns 0.6 and 0.7): "Awe rises toward maximum.
    Fear falls ... Language approaches silence": Awe reaches the scale's top, Fear falls, Language
    is at its least. -/
theorem phase3 :
    awe 7 = 9 ∧ fear 7 < fear 6 ∧ fear 6 < fear 5 ∧ (∀ k, language 6 ≤ language k) := by
  decide

/-! ## The threshold events, against the table

"THRESHOLD EVENTS: 2 (at t = 0.52 and t = 0.74)". Under the table: "THRESHOLD 1 at t ≈ 0.52:
Safety<2, Fear>7"; "THRESHOLD 2 at t ≈ 0.71: Language<1, PREVERBAL≥9". In the phase text: "Threshold
2, t ≈ 0.74 ... Language = 0, Pre-verbal = 9". On a 0-9 scale the table's Fear never exceeds 7 and
its Language never goes below 1, so neither condition holds at any column; and threshold 2 has two
times. -/

/-- Threshold 2's time, as the score parameters and the phase text give it, and as the table's note
    gives it (hundredths). -/
def threshold2Params : ℕ := 74
def threshold2Note : ℕ := 71

/-! ## The somatic loop

"`ė_V = -∇H_V(e_V) + κ_r · λ · S(t) + η_V`", with the knob defined as "Resonance `κ_r`: weight of
viewer biofeedback in modulating the score. At `κ_r = 0`: pure projection", and the mode table:
"Projection, `κ_r ≈ 0`: the score drives the viewer". In the equation `κ_r` weighs the screen's
effect on the viewer: at `κ_r = 0` the screen does not reach the viewer at all. -/

/-- The equation's right-hand side, one mode: the viewer's gradient, the screen signal through
    `κ_r · λ`, the noise. -/
noncomputable def viewerDrift (grad κr lam S η : ℝ) : ℝ := -grad + κr * lam * S + η

/-- At `κ_r = 0`, the screen signal does not enter the viewer's dynamics. -/
theorem projection_ignores_screen (grad lam S S' η : ℝ) :
    viewerDrift grad 0 lam S η = viewerDrift grad 0 lam S' η := by
  simp [viewerDrift]

/-! ## The control knobs

The River Film's defaults (`depth = 0.7, velocity = 1.0, resonance = 0.0, texture = 0.4,
coupling_scale = 1.0`) lie in the knobs' ranges (`[0, 1]`, `[0.1, 3]`, `[0, 1]`, `[0, 1]`,
`[0.5, 2]`). -/

theorem defaults_in_range :
    (0 : ℚ) ≤ 0.7 ∧ (0.7 : ℚ) ≤ 1 ∧ (0.1 : ℚ) ≤ 1 ∧ (1 : ℚ) ≤ 3 ∧ (0 : ℚ) ≤ 0 ∧ (0 : ℚ) ≤ 1 ∧
    (0 : ℚ) ≤ 0.4 ∧ (0.4 : ℚ) ≤ 1 ∧ (0.5 : ℚ) ≤ 1 ∧ (1 : ℚ) ≤ 2 := by
  norm_num

/-! ## P8's claims -/

def cTable : Claim where
  id := "P8.score"
  text := "The River Film's score: seven modes on a 0-9 scale at resolution 0.1."
  statement := ∀ k, safety k ≤ 9 ∧ curiosity k ≤ 9 ∧ fear k ≤ 9 ∧ awe k ≤ 9 ∧ grief k ≤ 9 ∧
    language k ≤ 9 ∧ preverbal k ≤ 9

instance : Witness cTable := .of on_scale

def cPhase1 : Claim where
  id := "P8.phase-1"
  text := "Departure: Safety is high; the field is organised. Language is dominant."
  statement := ∀ k : Fin 11, k.val ≤ 2 → 7 ≤ safety k ∧ curiosity k ≤ language k ∧
    fear k ≤ language k ∧ awe k ≤ language k ∧ grief k ≤ language k ∧ preverbal k ≤ language k

instance : Witness cPhase1 := .of phase1

def cPhase3 : Claim where
  id := "P8.phase-3"
  text := "The Deep River: Awe rises toward maximum. Fear falls. Language approaches silence."
  statement := awe 7 = 9 ∧ fear 7 < fear 6 ∧ fear 6 < fear 5 ∧ ∀ k, language 6 ≤ language k

instance : Witness cPhase3 := .of phase3

def cThreshold1 : Claim where
  id := "P8.threshold-1"
  text := "Threshold 1 at t ≈ 0.52: Safety < 2, Fear > 7. The field tips."
  statement := ∃ k : Fin 11, safety k < 2 ∧ 7 < fear k

/-- Refuted by the table: Fear's largest value is 7. -/
instance : Refutation cThreshold1 :=
  .of (by show ¬ ∃ k : Fin 11, safety k < 2 ∧ 7 < fear k; decide)

def cThreshold2 : Claim where
  id := "P8.threshold-2"
  text := "Threshold 2: Language = 0 (the note: Language < 1), Pre-verbal = 9. The encounter."
  statement := ∃ k : Fin 11, language k = 0 ∧ preverbal k = 9

/-- Refuted by the table: Language's smallest value is 1. -/
instance : Refutation cThreshold2 :=
  .of (by show ¬ ∃ k : Fin 11, language k = 0 ∧ preverbal k = 9; decide)

def cThreshold2Time : Claim where
  id := "P8.threshold-2-time"
  text := "Two threshold events, at t = 0.52 and t = 0.74 (the table's note: t ≈ 0.71)."
  statement := threshold2Params = threshold2Note

instance : Refutation cThreshold2Time := .of (by show ¬ threshold2Params = threshold2Note; decide)

def cProjection : Claim where
  id := "P8.projection"
  text := "Projection (κ_r ≈ 0): the score drives the viewer, as in classical cinema."
  statement := ∃ grad lam S S' η : ℝ, viewerDrift grad 0 lam S η ≠ viewerDrift grad 0 lam S' η

/-- Refuted by the paper's own equation: at `κ_r = 0` the screen does not enter the viewer's
    dynamics. The knob's definition (viewer to score) and the equation (score to viewer) put
    `κ_r` on different arrows; one of them needs to change. -/
instance : Refutation cProjection := .of fun ⟨g, l, S, S', η, h⟩ =>
  h (projection_ignores_screen g l S S' η)

def cDefaults : Claim where
  id := "P8.defaults"
  text := "The River Film's default knobs lie in their ranges."
  statement := (0 : ℚ) ≤ 0.7 ∧ (0.7 : ℚ) ≤ 1 ∧ (0.1 : ℚ) ≤ 1 ∧ (1 : ℚ) ≤ 3 ∧ (0 : ℚ) ≤ 0 ∧
    (0 : ℚ) ≤ 1 ∧ (0 : ℚ) ≤ 0.4 ∧ (0.4 : ℚ) ≤ 1 ∧ (0.5 : ℚ) ≤ 1 ∧ (1 : ℚ) ≤ 2

instance : Witness cDefaults := .of defaults_in_range

/-- P8's claims, in the paper's order. -/
def claims : List Claim :=
  [cTable, cDefaults, cProjection, cPhase1, cThreshold1, cPhase3, cThreshold2, cThreshold2Time]

#status claims

end TTheory.P8
