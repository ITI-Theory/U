import CycKB.UniversalVocabularyMt
import Cyc.Typing
import Cyc.TTheory

/-!
# The Tensor, part 3: "All three are the same film" (Sherlock exhibit B)

The paper (Part IV): the River Film score "can be realised in at least three
containers without changing a single value in the score definition"
(River, Body, Session), and "All three are the same film". OpenCyc has the
relation for it: `genlWorks NARROW GENERAL`, "NARROW includes all of
GENERAL, but has additions (refinements). This is the relationship of a
story to its plot, … or 'variations on a theme' to the musical theme
itself". Two readings, each in its own microtheory:

- **Same score** (`TheTensorScoreReadingMt`): each container film is a
  refinement of one score. OpenCyc derives that a showing of the River film
  instantiates it, and (its own slip) that the River film is a part of the
  score: `genlInverse genlWorks parts` runs against genlWorks' gloss. It does
  not derive that the showing performs the score: no rule in OpenCyc links
  `performanceOfWork` to `genlWorks`, so "the score is what is being
  rendered" is not provable, which is not the same as false.
- **Same film** (`TheTensorSameFilmReadingMt`): each container film includes
  all of the other. genlWorks is antisymmetric, so the River and Body films
  are equal, and Cyc's unique names make that a contradiction. The paper's
  own table gives them different deep attractors.

Sherlock's advice: say "the same score", not "the same film".
-/

namespace Affidavit.TheTensor.Containers
open Cyc Sentence

abbrev UV : Mt := .c "UniversalVocabularyMt"
abbrev rel (p : String) (a b : Term) : Sentence := .atom (.c p) [a, b]

abbrev score : Term := .c "TheRiverFilm-Score"
abbrev river : Term := .c "TheRiverFilm-River"
abbrev body : Term := .c "TheRiverFilm-Body"
abbrev session : Term := .c "TheRiverFilm-Session"
abbrev riverShowing : Term := .c "TheRiverFilm-River-Showing1"

/-! ## Reading 1: the same score -/

abbrev S : Mt := .c "TheTensorScoreReadingMt"
axiom s_tt : GenlMt S TTheory.TT
theorem liftS {φ : Sentence} (h : Holds UV φ) : Holds S φ := TTheory.liftDoc s_tt h

axiom river_refines : Holds S (rel "genlWorks" river score)
axiom body_refines : Holds S (rel "genlWorks" body score)
axiom session_refines : Holds S (rel "genlWorks" session score)
axiom river_shown : Holds S (rel "performanceOfWork" riverShowing river)

/-- A showing of the River film instantiates it (genlPreds performanceOfWork
instantiationOfWork). -/
theorem showing_instantiates_river : Holds S (rel "instantiationOfWork" riverShowing river) :=
  genlPreds_holds (liftS (by aesop (rule_sets := [Cyc]))) river_shown

theorem score_generalises_river : Holds S (rel "generalizations" river score) :=
  genlPreds_holds (liftS (by aesop (rule_sets := [Cyc]))) river_refines

/-- OpenCyc's slip: `genlInverse genlWorks parts` makes the River film a part
of its score, the reverse of genlWorks' gloss (the story includes its plot). -/
theorem river_part_of_score : Holds S (rel "parts" score river) :=
  genlInverse_holds (liftS (by aesop (rule_sets := [Cyc]))) river_refines

/-- Not provable: the River showing is a performance of the score. -/
example : True := by
  fail_if_success
    have : Holds S (rel "performanceOfWork" riverShowing score) := by
      aesop (add safe apply river_refines, safe apply river_shown, safe apply s_tt, safe apply TTheory.tt_uv,
        unsafe apply genlPreds_holds, unsafe apply genlInverse_holds,
        unsafe apply transitive_holds) (rule_sets := [Cyc])
  trivial

/-! ## Reading 2: the same film -/

abbrev F : Mt := .c "TheTensorSameFilmReadingMt"
axiom f_tt : GenlMt F TTheory.TT
theorem liftF {φ : Sentence} (h : Holds UV φ) : Holds F φ := TTheory.liftDoc f_tt h

axiom river_includes_body : Holds F (rel "genlWorks" river body)
axiom body_includes_river : Holds F (rel "genlWorks" body river)

/-- "The same film" read as each container film including all of the other:
genlWorks is antisymmetric, so River = Body, which Cyc's unique names forbid. -/
theorem same_film_contradiction : Holds F .falsum :=
  unique_names (a := "TheRiverFilm-River") (b := "TheRiverFilm-Body") (by decide)
    (antisymmetric_equals (liftF (by aesop (rule_sets := [Cyc])))
      river_includes_body body_includes_river)

end Affidavit.TheTensor.Containers
