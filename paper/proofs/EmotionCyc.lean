import EmotionOntology
import CycKB.UniversalVocabularyMt
import Cyc.Types
import Cyc.Typing

/-!
# EmotionCyc: the programme's emotions anchored to OpenCyc, as types

`EmotionOntology`'s Interpreter 4 (`CycRef`) renders emotions as OpenCyc
strings such as `#$Fear-Emotion`. Sherlock checked them against NextKB
(11 Oct 2026): 25 of the 28 names in that file do not exist in OpenCyc
(`Fear-Emotion`, `Joy-Emotion`, `NegativeEmotion`, `emotionalBlend`,
`emotionalInhibition`, `causes`, ...); OpenCyc's emotions are `Fear`,
`Happiness`, `Sadness`, ... (as the concept registry already says), each an
`EmotionalQuantityType`. Strings cannot catch that; types can.

This interpreter is typed: a base emotion is an `EmotionType`, a constant
that UniversalVocabularyMt says is an `EmotionalQuantityType`, and `anchor`
proves it from the KB when the file compiles. A wrong name does not compile
(see `#check_failure` below). Plutchik's trust has no OpenCyc emotion type,
so it is marked `unanchored`, visibly, instead of being given an invented
name. OpenCyc has no predicates for blend, dampen or evoke either: they stay
the programme's own structure over the anchored constants, not claims about
OpenCyc. Built on its own (`lake build EmotionCyc`), not a default target: it
imports all of UniversalVocabularyMt (design decision D12, ISS-063).
-/

namespace EmotionCyc

abbrev UV : Cyc.Mt := .c "UniversalVocabularyMt"

-- Each anchor is an Aesop search over all of UniversalVocabularyMt (as in the affidavits).
set_option maxHeartbeats 1000000

/-- An OpenCyc emotion type: a constant UniversalVocabularyMt classifies as an `EmotionalQuantityType`. -/
abbrev EmotionType : Type := Cyc.Ty.Inst UV "EmotionalQuantityType"

/-- Anchor a name: compiles only if OpenCyc says the constant is an emotion type. -/
def anchor (n : String)
    (h : Cyc.Holds UV (Cyc.Sentence.isa (.c n) (.c "EmotionalQuantityType")) := by
      aesop (rule_sets := [Cyc])) : EmotionType :=
  ⟨.c n, h⟩

/-- An emotion expression over anchored constants; `unanchored` marks a programme
emotion OpenCyc has no type for. -/
inductive CycEmotion where
  | base : EmotionType → CycEmotion
  | unanchored : String → CycEmotion
  | blend : CycEmotion → CycEmotion → CycEmotion
  | dampen : CycEmotion → CycEmotion → CycEmotion
  | evoke : Mechanism → CycEmotion → CycEmotion

instance : EmotionLang CycEmotion where
  joy          := .base (anchor "Happiness")
  sadness      := .base (anchor "Sadness")
  fear         := .base (anchor "Fear")
  anger        := .base (anchor "Anger")
  disgust      := .base (anchor "Disgust")
  surprise     := .base (anchor "Surprise")
  trust        := .unanchored "Trust"
  anticipation := .base (anchor "Anticipation-Feeling")
  blend        := .blend
  dampen       := .dampen
  evoke        := .evoke

-- Interpreter 4's names do not compile: OpenCyc has no `Fear-Emotion`.
#check_failure anchor "Fear-Emotion"

/-- OpenCyc has awe as an emotion type of its own; the programme builds awe as
a blend of fear and surprise (`Emotion.awe`). Both are now well-typed terms. -/
def aweInOpenCyc : EmotionType := anchor "Awe"

end EmotionCyc
