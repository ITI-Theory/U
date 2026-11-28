/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P8
import Mathlib

/-!
# P26 · Compose Once, Play Live

[T]-Theory's twenty-sixth paper, as Lean. Source:
`paper/soma/compose-once-play-live/compose-once-play-live.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P26).

P26 compiles one emotional score, The River Film, to picture and sound. The score it plays is the
registry's (`registry/scores/river-film.yaml`), whose keyframes are transcribed below so that the
paper's statements about it can be held to it. Its shape checks (eleven keyframes of seven modes,
six phases; at 45 minutes safety 0.20 and fear 0.70). Its thresholds do not: fear never exceeds 0.7
anywhere (its largest keyframe is 0.70, and the renderer's smoothstep stays between keyframes), so
T1's condition never holds; T2's holds at the keyframe `t = 0.7` but not at `t = 0.74`, where the
paper and the file put it. And the file is not The Tensor's appendix: on its own scale it differs
from the appendix's table (P8) in safety, curiosity, fear and language. What a listener feels is
open, as the paper says.
-/

namespace TTheory.P26

open TTheory

/-! ## The registry's score

`keyframes: t: [S, F, C, A, G, L, PV]`, `t = 0.0, 0.1, …, 1.0`, in hundredths. -/

def S : Fin 11 → ℕ := ![90, 80, 70, 50, 30, 20, 10, 10, 20, 50, 90]
def F : Fin 11 → ℕ := ![10, 10, 20, 30, 50, 70, 40, 20, 10, 10, 10]
def C : Fin 11 → ℕ := ![30, 50, 70, 80, 70, 50, 30, 20, 30, 50, 50]
def A : Fin 11 → ℕ := ![10, 10, 10, 20, 30, 40, 60, 90, 70, 40, 20]
def G : Fin 11 → ℕ := ![10, 10, 10, 10, 20, 30, 40, 50, 60, 40, 20]
def L : Fin 11 → ℕ := ![90, 90, 80, 70, 50, 30, 10, 5, 20, 60, 90]
def PV : Fin 11 → ℕ := ![10, 10, 10, 20, 30, 50, 70, 90, 60, 20, 10]

/-- The six phases' start times (hundredths). -/
def phases : List ℕ := [0, 25, 52, 53, 74, 75]

theorem shape : phases.length = 6 ∧ (∀ k, S k ≤ 100 ∧ F k ≤ 100) ∧ S 5 = 20 ∧ F 5 = 70 := by
  decide

/-- The renderer (`score.js`) moves between neighbouring keyframes by smoothstep,
    `a + e (b - a)` with `e = s²(3 - 2s) ∈ [0, 1]` (here on 0-1, from hundredths). -/
def between (a b : ℕ) (e : ℚ) : ℚ := ((a : ℚ) + e * ((b : ℚ) - a)) / 100

/-! ## Threshold 1: "T1 at `t = 0.52`, when fear exceeds 0.7 while awe rises"

Every keyframe's fear is at most 0.70, and a value between two of them is too. -/

theorem fear_keys : ∀ i : Fin 10, F i.castSucc ≤ 70 ∧ F i.succ ≤ 70 := by decide

theorem fear_capped (i : Fin 10) (e : ℚ) (h0 : 0 ≤ e) (h1 : e ≤ 1) :
    between (F i.castSucc) (F i.succ) e ≤ 0.7 := by
  have ha : ((F i.castSucc : ℕ) : ℚ) ≤ 70 := by exact_mod_cast (fear_keys i).1
  have hb : ((F i.succ : ℕ) : ℚ) ≤ 70 := by exact_mod_cast (fear_keys i).2
  have ha0 : (0 : ℚ) ≤ (F i.castSucc : ℕ) := by positivity
  unfold between
  rw [div_le_iff₀ (by norm_num)]
  nlinarith

/-! ## Threshold 2: "T2 at `t = 0.74`, when language falls below 0.1 and the pre-verbal exceeds
0.85"

At the keyframe `t = 0.7` both hold. At `t = 0.74`, `s = 0.4` and `e = 0.352`: language is 0.1028
and the pre-verbal 0.7944. -/

def e074 : ℚ := 0.4 ^ 2 * (3 - 2 * 0.4)

theorem keys78 : L 7 = 5 ∧ L 8 = 20 ∧ PV 7 = 90 ∧ PV 8 = 60 := by decide

theorem t2 : (L 7 < 10 ∧ 85 < PV 7) ∧ e074 = 0.352 ∧
    between (L 7) (L 8) e074 = 0.1028 ∧ between (PV 7) (PV 8) e074 = 0.7944 := by
  obtain ⟨h1, h2, h3, h4⟩ := keys78
  refine ⟨by decide, by norm_num [e074], ?_, ?_⟩
  · rw [h1, h2]; norm_num [between, e074]
  · rw [h3, h4]; norm_num [between, e074]

/-! ## The file and the appendix

"The River Film is a file in the programme's registry, transcribed from The Tensor's appendix":
the appendix's table (P8, on 0-9) against the file. At `t = 0.7` the appendix has safety 2, the
file 0.10. -/

theorem not_the_appendix : S 7 ≠ 10 * P8.safety 7 := by decide

/-! ## P26's claims -/

def cShape : Claim where
  id := "P26.score"
  text := "Eleven keyframes of the seven modes, each in [0, 1], six phases; on the River Film at \
    45 minutes the neutral viewer's safety and fear are 0.20 and 0.70."
  statement := phases.length = 6 ∧ (∀ k, S k ≤ 100 ∧ F k ≤ 100) ∧ S 5 = 20 ∧ F 5 = 70

instance : Witness cShape := .of shape

def cThreshold1 : Claim where
  id := "P26.threshold-1"
  text := "Two thresholds, held when crossed: T1 at t = 0.52, when fear exceeds 0.7 while awe \
    rises."
  statement := ∃ (i : Fin 10) (e : ℚ), 0 ≤ e ∧ e ≤ 1 ∧ 0.7 < between (F i.castSucc) (F i.succ) e

/-- Fear never exceeds 0.70, at a keyframe or between. -/
instance : Refutation cThreshold1 := .of fun ⟨i, e, h0, h1, h⟩ =>
  absurd (fear_capped i e h0 h1) (not_le.mpr h)

def cThreshold2 : Claim where
  id := "P26.threshold-2"
  text := "T2 at t = 0.74, when language falls below 0.1 and the pre-verbal exceeds 0.85."
  statement := between (L 7) (L 8) e074 < 0.1 ∧ 0.85 < between (PV 7) (PV 8) e074

/-- At `t = 0.74` language is 0.1028 and the pre-verbal 0.7944 (the condition holds at
    `t = 0.7`). -/
instance : Refutation cThreshold2 := .of fun ⟨h, _⟩ => by
  rw [t2.2.2.1] at h; norm_num at h

def cTranscribed : Claim where
  id := "P26.transcribed"
  text := "The River Film is a file in the programme's registry (registry/scores/river-film.yaml), \
    transcribed from The Tensor's appendix."
  statement := ∀ k : Fin 11, S k = 10 * P8.safety k

/-- At `t = 0.7` the appendix's safety is 2 (0.2), the file's 0.10. -/
instance : Refutation cTranscribed := .of fun h => not_the_appendix (h 7)

/-- "Whether a baseline-compiled film is experienced as better matched than an uncompiled one is
    the first testable claim of this design". -/
opaque baselineMatches : Prop

def cBaseline : Claim where
  id := "P26.baseline"
  text := "A film compiled to the viewer's baseline is experienced as better matched than an \
    uncompiled one."
  statement := baselineMatches

/-- P26's claims, in the paper's order. -/
def claims : List Claim := [cTranscribed, cShape, cThreshold1, cThreshold2, cBaseline]

#status claims

end TTheory.P26
