/-
SomaPhilosophy.lean — the philosophy band of the Soma Machine, stated honestly.

Replaces two drafts in the Collected Works chat (`SomaPhilosophy.lean`,
`SinnfeldOntology.lean`; see ISSUES.md ISS-042) that claimed to be verified but
used `sorry` and stated theorems that are false. This file keeps their ideas and
proves only what is true. Every theorem here is about the definitions below; none
is evidence about minds, history or the world (label: `kernel-verified` for the
statements as written, `interpretive` for any reading of them).

1. Russell's timeline: the thinkers on the app's philosophy band
   (`registry/eras.yaml`, band `philosophy`) fall into the three books of
   Russell's *History of Western Philosophy* (1945) in time order.
2. Fields of sense (Gabriel): zooming a field of sense to another scale keeps
   its rules and its rationality.
3. Spinoza's dual aspect: one state described as body and as mind. Equal
   states give equal descriptions (parallelism), but the body description does
   not in general determine the mind description (monism without reduction).
4. Kant: appearances are the observer's categories applied to the thing in
   itself. Observers with the same categories see the same appearance, and
   different things in themselves can look the same (the noumenon cannot be
   recovered from the appearance).

No Mathlib: core Lean only, so the file builds in seconds.
-/

namespace SomaPhilosophy

/-! ## 1. Russell's timeline -/

/-- The three books of Russell's *History of Western Philosophy*. -/
inductive RussellBook where
  | ancient
  | catholic
  | modern
  deriving DecidableEq, Repr

def RussellBook.index : RussellBook → Nat
  | .ancient => 0
  | .catholic => 1
  | .modern => 2

/-- Thinkers on the Soma Machine's philosophy band (ids in `registry/eras.yaml`). -/
inductive Thinker where
  | heraclitus | parmenides | socrates | plato | aristotle
  | augustine | aquinas | ockham
  | descartes | spinoza | leibniz | locke | hume | kant | hegel
  deriving DecidableEq, Repr

/-- Chronological position on the time axis (the order of `registry/eras.yaml`). -/
def Thinker.order : Thinker → Nat
  | .heraclitus => 0 | .parmenides => 1 | .socrates => 2 | .plato => 3 | .aristotle => 4
  | .augustine => 5 | .aquinas => 6 | .ockham => 7
  | .descartes => 8 | .spinoza => 9 | .locke => 10 | .leibniz => 11 | .hume => 12
  | .kant => 13 | .hegel => 14

/-- The book of Russell's *History* in which each thinker is treated. -/
def Thinker.book : Thinker → RussellBook
  | .heraclitus | .parmenides | .socrates | .plato | .aristotle => .ancient
  | .augustine | .aquinas | .ockham => .catholic
  | .descartes | .spinoza | .leibniz | .locke | .hume | .kant | .hegel => .modern

/-- The time slider and Russell's books agree: moving forward in time never moves
    back to an earlier book. Checked over all 225 ordered pairs. -/
theorem book_monotone (a b : Thinker) (h : a.order ≤ b.order) :
    a.book.index ≤ b.book.index := by
  revert h
  cases a <;> cases b <;> decide

/-- The positions on the time axis are distinct: the band is a strict order. -/
theorem order_injective (a b : Thinker) (h : a.order = b.order) : a = b := by
  revert h
  cases a <;> cases b <;> decide

/-! ## 2. Fields of sense -/

/-- A field of sense (Gabriel's *Sinnfeld*): where it sits on the scale ladder and
    the time axis, the rules that make objects appear in it, and whether those
    rules are rational. -/
structure Sinnfeld (Scale : Type) where
  scale : Scale
  epoch : Thinker
  rules : String
  rational : Bool

/-- The philosophy zoom: view the same field of sense at another scale. -/
def zoom {Scale : Type} (s : Sinnfeld Scale) (target : Scale) : Sinnfeld Scale :=
  { s with scale := target }

theorem zoom_preserves_rules {Scale : Type} (s : Sinnfeld Scale) (t : Scale) :
    (zoom s t).rules = s.rules := rfl

theorem zoom_preserves_rational {Scale : Type} (s : Sinnfeld Scale) (t : Scale) :
    (zoom s t).rational = s.rational := rfl

theorem zoom_preserves_epoch {Scale : Type} (s : Sinnfeld Scale) (t : Scale) :
    (zoom s t).epoch = s.epoch := rfl

/-- Zooming twice is zooming once, to the last scale: the zoom does not drift. -/
theorem zoom_zoom {Scale : Type} (s : Sinnfeld Scale) (a b : Scale) :
    zoom (zoom s a) b = zoom s b := rfl

/-! ## 3. Spinoza: one state, two descriptions -/

/-- Dual-aspect monism: a single kind of state, described as body and as mind. -/
structure DualAspect (State Body Mind : Type) where
  body : State → Body
  mind : State → Mind

/-- Parallelism: the same state has the same body and the same mind description. -/
theorem parallelism {S B M : Type} (d : DualAspect S B M) {s t : S} (h : s = t) :
    d.body s = d.body t ∧ d.mind s = d.mind t := by
  subst h
  exact ⟨rfl, rfl⟩

/-- Monism without reduction: there is a dual-aspect description in which two
    states share a body description but differ in their mind description. So
    parallelism alone does not make mind a function of body. -/
theorem body_does_not_fix_mind :
    ∃ (d : DualAspect Bool Unit Bool) (s t : Bool), d.body s = d.body t ∧ d.mind s ≠ d.mind t :=
  ⟨⟨fun _ => (), id⟩, true, false, rfl, by decide⟩

/-! ## 4. Kant: appearance and the thing in itself -/

/-- The observer's categories: how a thing in itself appears to this observer. -/
def appearance {Noumenon Phenomenon : Type} (categories : Noumenon → Phenomenon)
    (n : Noumenon) : Phenomenon :=
  categories n

/-- Observers with the same categories see the same appearance of the same thing. -/
theorem same_categories_same_appearance {N P : Type} (c₁ c₂ : N → P) (n : N) (h : c₁ = c₂) :
    appearance c₁ n = appearance c₂ n := by
  subst h
  rfl

/-- Different things in themselves can appear the same: the noumenon cannot in
    general be recovered from the appearance. -/
theorem noumenon_not_recoverable :
    ∃ (c : Bool → Unit) (n₁ n₂ : Bool), n₁ ≠ n₂ ∧ appearance c n₁ = appearance c n₂ :=
  ⟨fun _ => (), true, false, by decide, rfl⟩

end SomaPhilosophy
