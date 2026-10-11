import CycKB.UniversalVocabularyMt
import Cyc.Typing

/-!
# Did you see the Claude advert? (Sherlock exhibit C)

"Did you see the latest advert for Claude?" "Yes, on Tuesday." "I saw it on
Thursday." We saw the same thing, and we did not. OpenCyc keeps the two
apart: the advert is a `Commercial-CW` (a conceptual work, aspatial); what
each television showed is a `Commercial-IBT` (an information-bearing thing,
spatial); `instantiationOfWork` links them. Consensus, not mathematics: the
answer depends on which of the two the question is about, and OpenCyc makes
the question say.
-/

namespace Affidavit.ClaudeAdvert
open Cyc Sentence

-- Each `link` is an Aesop search over all of UniversalVocabularyMt, and the
-- heartbeat limit counts a whole declaration's links together.
set_option maxHeartbeats 1000000

abbrev UV : Mt := .c "UniversalVocabularyMt"
abbrev A : Mt := .c "ClaudeAdvertMt"
abbrev rel (p : String) (a b : Term) : Sentence := .atom (.c p) [a, b]

abbrev advert : Term := .c "ClaudeAdvert"
abbrev tuesday : Term := .c "ClaudeAdvert-Showing-Tuesday"
abbrev thursday : Term := .c "ClaudeAdvert-Showing-Thursday"

axiom a_uv : GenlMt A UV
theorem lift {φ : Sentence} (h : Holds UV φ) : Holds A φ := inherit a_uv h

axiom advert_work : Holds A (isa advert (.c "Commercial-CW"))
axiom tuesday_ibt : Holds A (isa tuesday (.c "Commercial-IBT"))
axiom thursday_ibt : Holds A (isa thursday (.c "Commercial-IBT"))
axiom tuesday_of : Holds A (rel "instantiationOfWork" tuesday advert)
axiom thursday_of : Holds A (rel "instantiationOfWork" thursday advert)

/-- We saw the same thing: one work, instantiated by both showings. -/
theorem same_work : ∃ w, Holds A (rel "instantiationOfWork" tuesday w) ∧
    Holds A (rel "instantiationOfWork" thursday w) :=
  ⟨advert, tuesday_of, thursday_of⟩

/-- We did not: the two showings are two things. -/
theorem different_showings (h : Holds A (rel "equals" tuesday thursday)) : Holds A .falsum :=
  unique_names (by decide) h

/-- One `genls` link, a fact of UniversalVocabularyMt. -/
macro "link" : term => `((by aesop (rule_sets := [Cyc]) : Holds UV (genls _ _)))

theorem showing_spatial : Holds UV (genls (.c "Commercial-IBT") (.c "SpatialThing")) :=
  genls_trans (b := .c "Advertisement-Commercial-IBT") link <|
  genls_trans (b := .c "Advertisement-IBT") link <|
  genls_trans (b := .c "InformationBearingThing") link <|
  genls_trans (b := .c "SpatialThing-Localized") link link

theorem work_aspatial : Holds UV (genls (.c "Commercial-CW") (.c "AspatialThing")) :=
  genls_trans (b := .c "Advertisement-PCW") link <|
  genls_trans (b := .c "PropositionalConceptualWork") link <|
  genls_trans (b := .c "ConceptualWork") link <|
  genls_trans (b := .c "DevisedPracticeOrWork") link <|
  genls_trans (b := .c "AspatialInformationStore") link link

/-- Taking Tuesday's showing for the advert itself is a contradiction: it
would be both spatial and aspatial. -/
theorem showing_is_not_the_work (h : Holds A (rel "equals" tuesday advert)) : Holds A .falsum :=
  disjoint (c := .c "SpatialThing") (d := .c "AspatialThing")
    (lift (by aesop (rule_sets := [Cyc])))
    (equals_isa h (isa_genls tuesday_ibt (lift showing_spatial)))
    (isa_genls advert_work (lift work_aspatial))

end Affidavit.ClaudeAdvert
