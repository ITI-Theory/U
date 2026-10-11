import CycKB.UniversalVocabularyMt
import Cyc.Typing

/-!
# ZSF, part 2: "A conscious percept is a pole in the propagator"

Source: P11 frozen at `3c97a44` (see `Numbers.lean`), §6.2, lines 838-841:
"A conscious percept is a **pole in the propagator**: the field's
first-person experience of its own impulse response". Mapping: a percept is
an OpenCyc `Perceiving` (a sensory event); a pole of a propagator is a
`MathematicalObject` (OpenCyc has no constant for the pole of a function).
Read as identity, the claim makes one thing both: an event in time and a
mathematical object, which OpenCyc holds disjoint. Read as correspondence
("a percept occurs when the drive meets a pole"), nothing follows against it.
Sherlock's advice: "corresponds to", not "is".
-/

namespace Affidavit.ZSF.Typing
open Cyc Sentence

-- Each `link` is an Aesop search over all of UniversalVocabularyMt.
set_option maxHeartbeats 1000000

abbrev UV : Mt := .c "UniversalVocabularyMt"
abbrev Z : Mt := .c "ZoomableSomaticFieldMt"
abbrev percept : Term := .c "ZSF-ConsciousPercept"

axiom z_uv : GenlMt Z UV
theorem lift {φ : Sentence} (h : Holds UV φ) : Holds Z φ := inherit z_uv h

axiom percept_perceiving : Holds Z (isa percept (.c "Perceiving"))
/-- The paper's claim, typed: the percept is a pole, a mathematical object. -/
axiom claim_percept_is_pole : Holds Z (isa percept (.c "MathematicalObject"))

/-- One `genls` link, a fact of UniversalVocabularyMt. -/
macro "link" : term => `((by aesop (rule_sets := [Cyc]) : Holds UV (genls _ _)))

theorem perceiving_temporal : Holds UV (genls (.c "Perceiving") (.c "TemporalThing")) :=
  genls_trans (b := .c "SensoryEvent") link <|
  genls_trans (b := .c "Event-Localized") link <|
  genls_trans (b := .c "Situation-Localized") link <|
  genls_trans (b := .c "SpatialThing-Localized") link <|
  genls_trans (b := .c "TemporallyExistingThing") link link

theorem pole_mathematical : Holds UV (genls (.c "MathematicalObject") (.c "MathematicalOrComputationalThing")) :=
  genls_trans (b := .c "MathematicalThing") link link

/-- A conscious percept that is a pole is both a temporal thing (an event of
perceiving) and a mathematical thing, which OpenCyc says nothing can be. -/
theorem percept_pole_contradiction : Holds Z .falsum :=
  disjoint (c := .c "TemporalThing") (d := .c "MathematicalOrComputationalThing")
    (lift (by aesop (rule_sets := [Cyc])))
    (isa_genls percept_perceiving (lift perceiving_temporal))
    (isa_genls claim_percept_is_pole (lift pole_mathematical))

end Affidavit.ZSF.Typing
