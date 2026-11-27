import TTheory.Core
import Mathlib.Data.Set.Basic

/-!
# Experiment (ISS-141): designing a study at the REPL, type-level, in OpenCyc's words

The author, 27 Nov: "another BIG usage of a BIG lean model is in a REPL, a user can start modelling
something, easily ... typelevel design is the goal ... and use of formal notation U and so on, say for the
design of a people experiment, saying they must speak german OR english AND live in ZH for 10 years".

The words are OpenCyc's (NextKB), in the native form of the experiment (A + C: collections as types,
genls as coercions); OpenCyc's own argument constraints type its predicates:
  languageSpoken:  arg1Isa IntelligentAgent, arg2Isa NaturalLanguage (BaseKB)
  residesInRegion: arg1Isa Person, arg2Isa GeopoliticalEntity (BaseKB)
  Person genls SocialBeing genls IntelligentAgent (UniversalVocabularyMt)
  City genls GeopoliticalEntity (UniversalVocabularyMt)
  GermanLanguage, EnglishLanguage isa NaturalLanguage; CityOfZurichSwitzerland isa City
  (WorldPoliticalGeographyDataVocabularyMt)
Years of residence are not OpenCyc's: they are the study's own notion, and stay visibly so.
-/

open TTheory

namespace StudyDesign

/-! ## OpenCyc's words -/

opaque Person : Type
opaque SocialBeing : Type
opaque IntelligentAgent : Type
opaque NaturalLanguage : Type
opaque City : Type
opaque GeopoliticalEntity : Type

axiom Person.toSocialBeing : Person → SocialBeing
axiom SocialBeing.toIntelligentAgent : SocialBeing → IntelligentAgent
axiom City.toGeopoliticalEntity : City → GeopoliticalEntity
noncomputable instance : Coe Person SocialBeing := ⟨Person.toSocialBeing⟩
noncomputable instance : Coe SocialBeing IntelligentAgent := ⟨SocialBeing.toIntelligentAgent⟩
noncomputable instance : Coe City GeopoliticalEntity := ⟨City.toGeopoliticalEntity⟩

axiom GermanLanguage : NaturalLanguage
axiom EnglishLanguage : NaturalLanguage
axiom CityOfZurichSwitzerland : City

/-- OpenCyc's `languageSpoken`, typed by its argument constraints. -/
opaque languageSpoken : IntelligentAgent → NaturalLanguage → Prop
/-- OpenCyc's `residesInRegion`, typed by its argument constraints. -/
opaque residesInRegion : Person → GeopoliticalEntity → Prop

/-- The study's own notion (not OpenCyc's): whole years a person has lived in a place. -/
opaque yearsResidentIn : Person → GeopoliticalEntity → ℕ

/-! ## The design: the inclusion criterion as sets, a participant as a type -/

/-- The people who speak a language. A person is an intelligent agent by two genls, so `p` fits
    `languageSpoken` without being told. -/
def speakers (l : NaturalLanguage) : Set Person := {p | languageSpoken ((p : SocialBeing) : IntelligentAgent) l}

/-- The people who have lived in a place for at least `n` years. -/
def residents (r : GeopoliticalEntity) (n : ℕ) : Set Person :=
  {p | residesInRegion p r ∧ n ≤ yearsResidentIn p r}

noncomputable def zurich : GeopoliticalEntity := CityOfZurichSwitzerland

/-- The criterion: speaks German or English, and has lived in Zürich for ten years.
    `(German ∪ English) ∩ Zürich₁₀` -/
def Eligible : Set Person := (speakers GermanLanguage ∪ speakers EnglishLanguage) ∩ residents zurich 10

/-- A participant is a person together with the proof that they meet the criterion: the design is a type. -/
def Participant := {p : Person // p ∈ Eligible}

/-! ## A session

Two people, as a user would enter them. Their facts are assumptions (axioms), so whatever follows from them
says so in its receipt. -/

axiom anna : Person
axiom anna_speaks : languageSpoken ((anna : SocialBeing) : IntelligentAgent) GermanLanguage
axiom anna_lives : residesInRegion anna zurich
axiom anna_years : yearsResidentIn anna zurich = 12

/-- Anna qualifies: German, twelve years in Zürich. -/
noncomputable def annaP : Participant :=
  ⟨anna, Or.inl anna_speaks, anna_lives, by rw [anna_years]; decide⟩

axiom ben : Person
axiom ben_speaks : languageSpoken ((ben : SocialBeing) : IntelligentAgent) EnglishLanguage
axiom ben_lives : residesInRegion ben zurich
axiom ben_years : yearsResidentIn ben zurich = 5

-- Ben does not: five years is not ten. The participant cannot be built.
#check_failure (⟨ben, Or.inr ben_speaks, ben_lives, by rw [ben_years]; decide⟩ : Participant)

-- Category errors are type errors: a city is not a language, a language is not a place.
#check_failure speakers CityOfZurichSwitzerland
#check_failure residesInRegion anna GermanLanguage

/-! ## Questions about the design, answered by proof -/

/-- Every participant speaks German or English. -/
theorem participant_speaks (p : Participant) :
    p.1 ∈ speakers GermanLanguage ∪ speakers EnglishLanguage := p.2.1

/-- Tightening the residence rule never adds anyone: fifteen years admits a subset of ten. -/
theorem stricter_is_smaller (r : GeopoliticalEntity) {m n : ℕ} (h : m ≤ n) :
    residents r n ⊆ residents r m :=
  fun _ hp => ⟨hp.1, le_trans h hp.2⟩

theorem stricter_design_smaller :
    (speakers GermanLanguage ∪ speakers EnglishLanguage) ∩ residents zurich 15 ⊆ Eligible :=
  Set.inter_subset_inter_right _ (stricter_is_smaller zurich (by decide))

def cAnna : Claim where
  id := "study.anna"
  text := "Anna is eligible."
  statement := anna ∈ Eligible

instance : Witness cAnna := .of annaP.2

def cStricter : Claim where
  id := "study.stricter"
  text := "Fifteen years instead of ten never admits anyone new."
  statement := (speakers GermanLanguage ∪ speakers EnglishLanguage) ∩ residents zurich 15 ⊆ Eligible

instance : Witness cStricter := .of stricter_design_smaller

def cBen : Claim where
  id := "study.ben"
  text := "Ben is eligible."
  statement := ben ∈ Eligible

/-- Ben's own data refute it: five years is not ten. -/
instance : Refutation cBen := .of fun h => absurd h.2.2 (by rw [ben_years]; decide)

#status [cAnna, cStricter, cBen]

end StudyDesign
