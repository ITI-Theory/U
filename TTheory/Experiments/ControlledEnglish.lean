/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import Mathlib.Data.Set.Disjoint

/-!
# Experiment (ISS-141): controlled English, both ways

Who says the Lean says what the text says? (The author, 28 Nov, pointing to Attempto Controlled
English, University of Zürich: https://attempto.ifi.uzh.ch/site/docs/writing_owl_in_ace.html.)
ACE is English cut down until each sentence has one reading; its tools turn it into OWL. Here it
is turned into Lean instead, without APE, Prolog or Python:

* `ace "…"` reads controlled English at compile time; a sentence outside the controlled language
  is a compile error, not a guess;
* the sentences are a tagless-final class, `Sentences`, with two interpreters: `Prop` (the meaning:
  sets and things, Mathlib's own `⊆`, `Disjoint`, `∈`) and `String` (the English, for display);
* so the text is checked twice by the kernel: reading it back gives the same words (`rfl`), and
  what it entails or contradicts is a theorem;
* consistency is shown by a model (Moriarty's counter-model), as the page's reasoning examples.

Covered: ACE's class and individual sentences (every, no, or, is a, is not). Not yet: verbs
(OWL properties), cardinality, the lexicon (English words to OpenCyc constants: NextKB has one). -/

namespace ControlledEnglish

/-- A Lean value with the word the text used for it (the word is only for display). -/
structure W (β : Type) where
  val : β
  word : String

/-- ACE's sentences about classes and individuals, the words once; their meaning is supplied by
    an interpreter. -/
class Sentences (α r : Type) where
  /-- Every A is a B. -/
  every : W (Set α) → W (Set α) → r
  /-- Every A is a B or is a C. -/
  everyOr : W (Set α) → W (Set α) → W (Set α) → r
  /-- No A is a B. -/
  no : W (Set α) → W (Set α) → r
  /-- X is a A. -/
  isA : W α → W (Set α) → r
  /-- X is not a A. -/
  isNotA : W α → W (Set α) → r
  /-- X is not Y. -/
  distinct : W α → W α → r

/-- A text: sentences one after the other (apart from `Sentences`, as it names no universe). -/
class Text (r : Type) where
  both : r → r → r

instance : Text Prop := ⟨And⟩
instance : Text String := ⟨fun p q => p ++ " " ++ q⟩

/-- The meaning: native Lean, no Cyc and no OWL words. -/
instance {α : Type} : Sentences α Prop where
  every a b := a.val ⊆ b.val
  everyOr a b c := a.val ⊆ b.val ∪ c.val
  no a b := Disjoint a.val b.val
  isA x a := x.val ∈ a.val
  isNotA x a := x.val ∉ a.val
  distinct x y := x.val ≠ y.val

/-- The indefinite article for a noun. -/
def art (w : String) : String := if "aeiouAEIOU".contains w.front then "an" else "a"

/-- The English. -/
instance {α : Type} : Sentences α String where
  every a b := s!"Every {a.word} is {art b.word} {b.word}."
  everyOr a b c := s!"Every {a.word} is {art b.word} {b.word} or is {art c.word} {c.word}."
  no a b := s!"No {a.word} is {art b.word} {b.word}."
  isA x a := s!"{x.word} is {art a.word} {a.word}."
  isNotA x a := s!"{x.word} is not {art a.word} {a.word}."
  distinct x y := s!"{x.word} is not {y.word}."

open Lean in
/-- One controlled sentence, read into a `Sentences` term; the words become the Lean names in
    scope (nouns are sets, proper names are things). -/
def sentence (s : String) : MacroM (TSyntax `term) := do
  let ws := (s.splitOn " ").filter (· ≠ "")
  let w (x : String) : MacroM (TSyntax `term) :=
    `(⟨$(mkIdent (Name.mkSimple x)), $(Syntax.mkStrLit x)⟩)
  let isArt (a : String) := a == "a" || a == "an"
  match ws with
  | ["Every", a, "is", x, b, "or", "is", y, c] =>
    if isArt x && isArt y then `(Sentences.everyOr $(← w a) $(← w b) $(← w c))
    else Macro.throwError s!"not controlled English: {s}"
  | ["Every", a, "is", x, b] =>
    if isArt x then `(Sentences.every $(← w a) $(← w b))
    else Macro.throwError s!"not controlled English: {s}"
  | ["No", a, "is", x, b] =>
    if isArt x then `(Sentences.no $(← w a) $(← w b))
    else Macro.throwError s!"not controlled English: {s}"
  | [n, "is", "not", x, a] =>
    if isArt x then `(Sentences.isNotA $(← w n) $(← w a))
    else Macro.throwError s!"not controlled English: {s}"
  | [n, "is", "not", m] => `(Sentences.distinct $(← w n) $(← w m))
  | [n, "is", x, a] =>
    if isArt x then `(Sentences.isA $(← w n) $(← w a))
    else Macro.throwError s!"not controlled English: {s}"
  | _ => Macro.throwError s!"not controlled English: {s}"

/-- `ace "…"`: a text in controlled English, read at compile time. -/
syntax "ace " str : term

macro_rules
  | `(ace $s:str) => do
    let sents := (s.getString.splitOn ".").map (·.trimAscii.toString) |>.filter (· ≠ "")
    match (← sents.mapM sentence).reverse with
    | [] => Lean.Macro.throwError "an empty text"
    | t :: rest =>
      let mut acc := t
      for x in rest do
        acc ← `(Text.both $x $acc)
      return acc

section Examples

-- The linter cannot see that `ace` uses the words bound around it.
set_option linter.unusedVariables false

variable {α : Type} (man woman human child : Set α) (John Bill : α)

/-! ## Reading back: the English the Lean says is the English written

The English is for display, so it is checked by evaluation (`#guard`, at compile time); the
meaning is checked by the kernel, below. The words are bound to empty sets of `Unit`. -/

#guard (let man : Set Unit := ∅; let human : Set Unit := ∅; let woman : Set Unit := ∅
    let John : Unit := ()
    (ace "Every man is a human. No man is a woman. John is a man." : String)) ==
    "Every man is a human. No man is a woman. John is a man."

-- Reading back is a check, not a courtesy: "an human" is read, but does not come back.
#guard (let man : Set Unit := ∅; let human : Set Unit := ∅
    (ace "Every man is an human." : String)) != "Every man is an human."

/-- Prose outside the controlled language does not compile (the page's own first example). -/
example : True := by
  fail_if_success have := (ace "Socrates is a human and lives in Athens." : Prop)
  trivial

/-! ## The page's reasoning, as theorems -/

/-- "John is a man. No man is a woman. John is a woman." is inconsistent. -/
theorem john_inconsistent :
    ¬ (ace "John is a man. No man is a woman. John is a woman." : Prop) :=
  fun ⟨h1, h2, h3⟩ => Set.disjoint_left.mp h2 h1 h3

/-- "Every child is a man or is a woman. No child is a man. No child is a woman." is consistent
    (a model: nothing at all), only `child` is empty. -/
example : ∃ (β : Type) (child man woman : Set β),
    (ace "Every child is a man or is a woman. No child is a man. No child is a woman." : Prop) :=
  ⟨Unit, ∅, ∅, ∅, by simp [Sentences.everyOr, Sentences.no, Text.both]⟩

/-- … and becomes inconsistent once there is a child. -/
theorem child_inconsistent : ¬ (ace "Every child is a man or is a woman. No child is a man. \
    No child is a woman. John is a child." : Prop) := by
  rintro ⟨h1, h2, h3, h4⟩
  rcases h1 h4 with h | h
  · exact Set.disjoint_left.mp h2 h4 h
  · exact Set.disjoint_left.mp h3 h4 h

/-! ## No unique names, as in OWL: John and Bill may be one or two, until the text says -/

example : ∃ (β : Type) (John Bill : β), John = Bill := ⟨Unit, (), (), rfl⟩
example : ∃ (β : Type) (John Bill : β), John ≠ Bill := ⟨Bool, true, false, by decide⟩

/-- Entailment: the text implies a sentence it does not contain. -/
theorem entails : (ace "John is a man. Bill is not a man." : Prop) →
    (ace "John is not Bill." : Prop) :=
  fun ⟨h1, h2⟩ e => h2 (e ▸ h1)

end Examples

end ControlledEnglish
