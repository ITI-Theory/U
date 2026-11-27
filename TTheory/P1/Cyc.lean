import EmotionCyc
import TTheory.P1

/-!
# P1 against OpenCyc: what is not an equation, checked as the file compiles

P1's words for feelings, brain regions and nervous systems, each anchored to an OpenCyc collection. An
anchor is a proof, found by Aesop in OpenCyc's `UniversalVocabularyMt`, that OpenCyc classifies the
constant so: a wrong name, or a word OpenCyc types differently, does not compile. Where OpenCyc has
nothing, the word is marked unanchored, visibly, and never given an invented name.

Apart from the chapter `TTheory.P1` because it imports all of `UniversalVocabularyMt` (as `EmotionCyc`).
-/

namespace TTheory.P1.Cyc

open _root_.Cyc

abbrev UV : Mt := .c "UniversalVocabularyMt"

-- Each anchor is an Aesop search over all of UniversalVocabularyMt (as in EmotionCyc).
set_option maxHeartbeats 1000000

/-- An OpenCyc constant of the collection type `t`: compiles only if `UniversalVocabularyMt` says so. -/
def anchorAs (t n : String)
    (h : Holds UV (Sentence.isa (.c n) (.c t)) := by aesop (rule_sets := [Cyc])) : Ty.Inst UV t :=
  ⟨.c n, h⟩

/-- A word of the paper: anchored to OpenCyc, or unanchored (OpenCyc has no such constant of that type). -/
inductive Word (t : String)
  | anchored : Ty.Inst UV t → Word t
  | unanchored : String → Word t

/-! ## The feelings the paper names

Fear, shame, calm (regulated calm), awe and nostalgia are OpenCyc emotion types. Anxiety, the face of
flight in Table 2, is not: OpenCyc has no emotion type for it, so it stays unanchored. -/

abbrev Emotion := Word "EmotionalQuantityType"

def fear : Emotion := .anchored (anchorAs _ "Fear")
def shame : Emotion := .anchored (anchorAs _ "Shame")
def calm : Emotion := .anchored (anchorAs _ "Calmness")
def awe : Emotion := .anchored (anchorAs _ "Awe")
def nostalgia : Emotion := .anchored (anchorAs _ "Nostalgia")
def anxiety : Emotion := .unanchored "Anxiety"

-- OpenCyc has no emotion type `Anxiety`: the anchor does not compile.
#check_failure (anchorAs "EmotionalQuantityType" "Anxiety")

/-! ## The three layers' anatomy

Layer 1 is the brainstem, Layer 2 the limbic system: both OpenCyc anatomical parts. Layer 3, the
prefrontal cortex, has no OpenCyc constant. -/

abbrev Anatomy := Word "UniqueAnatomicalPartType"

def layer1 : Anatomy := .anchored (anchorAs _ "BrainStem")
def layer2 : Anatomy := .anchored (anchorAs _ "LimbicSystem")
def layer3 : Anatomy := .unanchored "PrefrontalCortex"

/-! ## Table 2's nervous systems

Polyvagal theory's states rest on two systems OpenCyc knows as internal body regions: the sympathetic
nervous system (fight and flight) and the vagus nerve (ventral and dorsal vagal; OpenCyc has the nerve,
not its two branches). -/

abbrev BodyRegion := Ty.Inst UV "InternalAnimalBodyRegionType"

def sympathetic : BodyRegion := anchorAs _ "SympatheticNervousSystem"
def vagus : BodyRegion := anchorAs _ "VagusNerve"

/-- Each polyvagal state's nervous system, as OpenCyc has it. -/
def _root_.TTheory.P1.Polyvagal.system : Polyvagal → BodyRegion
  | .ventralVagal => vagus
  | .sympathetic => sympathetic
  | .dorsalVagal => vagus

/-! ## The claims, with OpenCyc's witnesses -/

open TTheory

def cFeelings : Claim where
  id := "P1.feelings"
  text := "Fear, shame, calm, awe and nostalgia are emotions."
  statement := ∀ n ∈ ["Fear", "Shame", "Calmness", "Awe", "Nostalgia"],
    Holds UV (Sentence.isa (.c n) (.c "EmotionalQuantityType"))

instance : Witness cFeelings := .of (by
  intro n hn
  simp only [List.mem_cons, List.not_mem_nil, or_false] at hn
  rcases hn with rfl | rfl | rfl | rfl | rfl <;> aesop (rule_sets := [Cyc]))

def cAnxiety : Claim where
  id := "P1.anxiety"
  text := "Anxiety (flight, Table 2) is an emotion."
  statement := Holds UV (Sentence.isa (.c "Anxiety") (.c "EmotionalQuantityType"))

def cLayers : Claim where
  id := "P1.layers"
  text := "The brainstem and the limbic system, Layers 1 and 2, are parts of the body; the brainstem is a brain region."
  statement := Holds UV (Sentence.isa (.c "BrainStem") (.c "BrainRegionType")) ∧
    Holds UV (Sentence.isa (.c "LimbicSystem") (.c "UniqueAnatomicalPartType"))

instance : Witness cLayers := .of ⟨by aesop (rule_sets := [Cyc]), by aesop (rule_sets := [Cyc])⟩

def cPolyvagal : Claim where
  id := "P1.table2"
  text := "Fight and flight share one nervous system, the sympathetic; calm and freeze share the vagus."
  statement := Attractor.fight.polyvagal.system = Attractor.flight.polyvagal.system ∧
    Attractor.regulatedCalm.polyvagal.system = Attractor.freeze.polyvagal.system

instance : Witness cPolyvagal := .of ⟨rfl, rfl⟩

def claims : List Claim := [cFeelings, cAnxiety, cLayers, cPolyvagal]

#status claims

end TTheory.P1.Cyc
