import Lake
open Lake DSL

package U where
  name := "U"

/-
  Core emotion DSL — no external dependencies.
  EmotionOntology is imported by SomaField, so Lake builds it first.
-/
lean_lib Emotions where
  srcDir := "src"

/-
  Movie server — The Abstract Film: Lean high-level API.
  "The movie is the proof."
  Depends on EmotionOntology for EmotionLabel primitives.
-/
lean_lib Movie where
  srcDir := "src"
  roots  := #[`Movie]

/-
  Full Hopfield demo — requires Mathlib.
  Uncomment the `require` block below and run `lake update` to enable.
-/
lean_lib HopfieldDemo where
  srcDir := "src"
  roots  := #[`Hopfield]

require mathlib from git "https://github.com/leanprover-community/mathlib4.git" @ "master"
