import CycKB.UniversalVocabularyMt
import Cyc.Typing

/-!
# The Tensor, part 2: its seven modes typed against OpenCyc (ISS-055)

Source: U `paper/soma/the-tensor/the-tensor.md`. The paper calls each axis of
the score an "emotional mode" and lists Safety, Fear, Shame, Grief, Curiosity,
Awe and Language (the River Film swaps Shame for Pre-verbal). The affidavit
asserts that typing in its own microtheory, `TheTensorMt`, which inherits
OpenCyc's `UniversalVocabularyMt`; a contradiction stays inside it.

Findings:
- Fear, Awe, Grief, Curiosity and Shame are emotions in OpenCyc
  (`EmotionalQuantityType`): checked.
- Safety and Pre-verbal have no emotion in OpenCyc; Safety is only a
  quantity of a situation. The nearest feeling is `Security-Emotion`.
- Language as an emotional mode is a contradiction: every emotion type is a
  kind of `FeelingAttribute` (typeGenls), a scalar interval; Language is a
  kind of `InformationStore`; OpenCyc says the two are disjoint, and Arabic
  is a language. The proof term is the explanation.
-/

namespace Affidavit.TheTensor
open Cyc Sentence

abbrev T : Mt := .c "TheTensorMt"
abbrev UV : Mt := .c "UniversalVocabularyMt"

axiom tensor_uv : GenlMt T UV

/-- The paper's claim, typed: Language is an emotional mode. -/
axiom claim_language : Holds T (isa (.c "Language") (.c "EmotionalQuantityType"))

theorem lift {φ : Sentence} (h : Holds UV φ) : Holds T φ := inherit tensor_uv h

/-! ## The modes OpenCyc agrees are emotions -/

/-- OpenCyc agrees: Fear is an emotion (as are Awe, Grief, Curiosity, Shame
and Security-Emotion, below). -/
theorem fear : Holds UV (isa (.c "Fear") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])
theorem awe : Holds UV (isa (.c "Awe") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])
theorem grief : Holds UV (isa (.c "Grief") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])
theorem curiosity : Holds UV (isa (.c "Curiosity") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])
theorem shame : Holds UV (isa (.c "Shame") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])
theorem security : Holds UV (isa (.c "Security-Emotion") (.c "EmotionalQuantityType")) := by
  aesop (rule_sets := [Cyc])

/-- Safety is not an emotion in OpenCyc: no proof exists (the test passes
when Aesop fails). -/
example : True := by
  fail_if_success
    have : Holds UV (isa (.c "Safety") (.c "EmotionalQuantityType")) := by
      aesop (rule_sets := [Cyc])
  trivial

/-! ## Language as an emotional mode -/

theorem language_feeling : Holds T (genls (.c "Language") (.c "FeelingAttribute")) :=
  typeGenls_genls claim_language (lift (by aesop (rule_sets := [Cyc])))

/-- One `genls` link, a fact of UniversalVocabularyMt. -/
macro "link" : term => `((by aesop (rule_sets := [Cyc]) : Holds UV (genls _ _)))

-- Aesop does not guess the middle collection of a chain, so the chains are
-- spelled out; each link is a fact.
theorem feeling_interval : Holds UV (genls (.c "FeelingAttribute") (.c "ScalarOrVectorInterval")) :=
  genls_trans (b := .c "MentalQuantity") link <|
  genls_trans (b := .c "ScalarQuantity") link <|
  genls_trans (b := .c "ScalarInterval") link link

theorem language_store : Holds UV (genls (.c "Language") (.c "InformationStore")) :=
  genls_trans (b := .c "CommunicationConvention") link <|
  genls_trans (b := .c "AspatialInformationStore") link link

theorem arabic : Holds UV (isa (.c "ArabicLanguage") (.c "Language")) := by
  aesop (rule_sets := [Cyc])

/-- If Language is an emotional mode, Arabic is both an information store and
a scalar interval, which OpenCyc says nothing can be. -/
theorem language_mode_contradiction : Holds T .falsum :=
  disjoint (c := .c "InformationStore") (d := .c "ScalarOrVectorInterval")
    (lift (by aesop (rule_sets := [Cyc])))
    (lift (isa_genls arabic language_store))
    (isa_genls (lift arabic) (genls_trans language_feeling (lift feeling_interval)))

end Affidavit.TheTensor
