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
  roots  := #[`EmotionOntology, `SomaField]

/-
  Full Hopfield demo — requires Mathlib.
  Uncomment the `require` block below and run `lake update` to enable.
-/
lean_lib HopfieldDemo where
  srcDir := "src"
  roots  := #[`Hopfield]

-- require mathlib from
--   git "https://github.com/leanprover-community/mathlib4" @ "v4.20.1"
