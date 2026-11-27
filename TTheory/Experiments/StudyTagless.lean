import TTheory.Core
import Mathlib.Data.Set.Basic

/-!
# Experiment (ISS-141): the study, tagless-final, in Lean's words

The same design as `StudyDesign.lean` (speaks German or English, and has lived in Zürich for ten years),
written the way the final model should read (the author, 27 Nov: "i dont think i would expect to see/use
'genls' in the final version. thats a cyc thing, not lean"; and tagless-final, as `EmotionOntology.lean`):

* the vocabulary is types; "every A is a B" is written `fact A ⊑ B`, an asserted subsumption that Lean
  applies by itself as a coercion; OpenCyc's own words appear only where a fact comes from;
* the design language is a class, `Criteria`; the criterion is ONE term; each output is an interpreter of
  it: its meaning (a set of people, with proofs), its text (for the paper or the consent form) and CycL (for
  OpenCyc), which says plainly what OpenCyc does not know.
-/

open TTheory

namespace StudyTagless

/-! ## `fact A ⊑ B`: every `A` is a `B` -/

/-- `fact A ⊑ B` asserts that every `A` is a `B`: an axiom, which Lean then applies by itself (a coercion),
    and chains. -/
syntax "fact " ident " ⊑ " ident : command

macro_rules
  | `(fact $a:ident ⊑ $b:ident) => do
    let f := Lean.mkIdent (a.getId ++ Lean.Name.mkSimple s!"to{b.getId}")
    `(section
      axiom $f : $a → $b
      noncomputable instance : Coe $a $b := ⟨$f⟩
      end)

/-! ## The vocabulary (OpenCyc's, from NextKB) -/

opaque Person : Type
opaque SocialBeing : Type
opaque IntelligentAgent : Type
opaque NaturalLanguage : Type
opaque City : Type
opaque GeopoliticalEntity : Type

fact Person ⊑ SocialBeing               -- NextKB, UniversalVocabularyMt
fact SocialBeing ⊑ IntelligentAgent     -- NextKB, UniversalVocabularyMt
fact City ⊑ GeopoliticalEntity          -- NextKB, UniversalVocabularyMt

axiom GermanLanguage : NaturalLanguage            -- NextKB, AgentGMt
axiom EnglishLanguage : NaturalLanguage           -- NextKB, UniversalVocabularyMt
axiom CityOfZurichSwitzerland : City              -- NextKB, WorldPoliticalGeographyDataVocabularyMt

opaque languageSpoken : IntelligentAgent → NaturalLanguage → Prop   -- NextKB, BaseKB (argument types)
opaque residesInRegion : Person → GeopoliticalEntity → Prop         -- NextKB, BaseKB (argument types)
/-- The study's own notion, not OpenCyc's. -/
opaque yearsResidentIn : Person → GeopoliticalEntity → ℕ

/-! ## The design language -/

/-- The languages and places the design may name, each with its OpenCyc constant. -/
inductive Lang
  | german | english

inductive Place
  | zurich

def Lang.name : Lang → String
  | .german => "German"
  | .english => "English"

def Lang.cyc : Lang → String
  | .german => "GermanLanguage"
  | .english => "EnglishLanguage"

noncomputable def Lang.val : Lang → NaturalLanguage
  | .german => GermanLanguage
  | .english => EnglishLanguage

def Place.name : Place → String
  | .zurich => "Zürich"

def Place.cyc : Place → String
  | .zurich => "CityOfZurichSwitzerland"

noncomputable def Place.val : Place → GeopoliticalEntity
  | .zurich => CityOfZurichSwitzerland

/-- The study-design language: the words once, their meaning supplied by an interpreter. -/
class Criteria (r : Type) where
  speaks : Lang → r
  livedIn : Place → ℕ → r
  any : r → r → r
  all : r → r → r

open Criteria

scoped infixl:68 " ⊔ " => Criteria.any
scoped infixl:69 " ⊓ " => Criteria.all

/-- The criterion, once: `(German ⊔ English) ⊓ Zürich₁₀`. -/
def eligible {r : Type} [Criteria r] : r :=
  (speaks .german ⊔ speaks .english) ⊓ livedIn .zurich 10

/-! ## Interpreter 1: meaning, the people it admits -/

noncomputable instance : Criteria (Set Person) where
  speaks l := {p | languageSpoken ((p : SocialBeing) : IntelligentAgent) l.val}
  livedIn pl n := {p | residesInRegion p pl.val ∧ n ≤ yearsResidentIn p pl.val}
  any a b := a ∪ b
  all a b := a ∩ b

noncomputable def Eligible : Set Person := eligible

/-- A participant: a person with the proof that the criterion admits them. -/
def Participant := {p : Person // p ∈ Eligible}

/-! ## Interpreter 2: text, for the paper or the consent form -/

structure Text where
  s : String

instance : Criteria Text where
  speaks l := ⟨s!"speaks {l.name}"⟩
  livedIn pl n := ⟨s!"has lived in {pl.name} for at least {n} years"⟩
  any a b := ⟨s!"({a.s} or {b.s})"⟩
  all a b := ⟨s!"{a.s}, and {b.s}"⟩

#eval (eligible : Text).s

/-! ## Interpreter 3: CycL, for OpenCyc, saying what OpenCyc does not know -/

structure CycL where
  s : String

instance : Criteria CycL where
  speaks l := ⟨s!"(languageSpoken ?P {l.cyc})"⟩
  livedIn pl n := ⟨s!"(and (residesInRegion ?P {pl.cyc}) (study:yearsResidentIn ?P {pl.cyc} {n}))"⟩
  any a b := ⟨s!"(or {a.s} {b.s})"⟩
  all a b := ⟨s!"(and {a.s} {b.s})"⟩

#eval (eligible : CycL).s

/-! ## A session, against the meaning -/

axiom anna : Person
axiom anna_speaks : languageSpoken ((anna : SocialBeing) : IntelligentAgent) GermanLanguage
axiom anna_lives : residesInRegion anna CityOfZurichSwitzerland
axiom anna_years : yearsResidentIn anna CityOfZurichSwitzerland = 12

noncomputable def annaP : Participant :=
  ⟨anna, Or.inl anna_speaks, anna_lives, by rw [Place.val, anna_years]; decide⟩

axiom ben : Person
axiom ben_years : yearsResidentIn ben CityOfZurichSwitzerland = 5

def cAnna : Claim where
  id := "study.anna (tagless)"
  text := "Anna is eligible."
  statement := anna ∈ Eligible

instance : Witness cAnna := .of annaP.2

def cBen : Claim where
  id := "study.ben (tagless)"
  text := "Ben is eligible."
  statement := ben ∈ Eligible

instance : Refutation cBen := .of fun h => absurd h.2.2 (by rw [Place.val, ben_years]; decide)

#status [cAnna, cBen]

end StudyTagless
