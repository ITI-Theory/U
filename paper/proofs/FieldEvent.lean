import Mathlib.Data.Real.Basic

/-!
# FieldEvent: same field, different type (ISS-052)

The programme's claim about emotion and thought: they are the same soma-field, read at
different dimension layers, emotion at D8 (the limbic layer) and thought at D9 to D11 (the
cortical layers). This file makes the claim a definition the concept registry can point
to. It is a typing discipline, not a fact about brains: what it proves is that the
definitions keep the field and the layer apart (`derived-under-assumptions`).

* `FieldEvent l` is an event of the field read at layer `l`; an `emotion` exists only at
  D8, a `thought` only at a layer other than D8.
* `state` gives the field an event carries: one type, whatever the layer (same field).
* `project` retypes a thought as the emotion of the same field; `lift` retypes an emotion
  as a thought at a chosen layer; neither changes the state, and they are inverse on D8.
* An event at D11 is always a thought (different type).
-/

namespace SomaField.Events

/-- The dimension layers at which the field is read. -/
inductive Layer
  | d8 | d9 | d10 | d11
  deriving DecidableEq, Repr

/-- A field state: an amplitude for each of the eight modes (P9's modes). -/
structure FieldState where
  amp : Fin 8 → ℝ

/-- One event of the field, typed by its layer. -/
inductive FieldEvent : Layer → Type
  | emotion (s : FieldState) : FieldEvent .d8
  | thought (l : Layer) (h : l ≠ .d8) (s : FieldState) : FieldEvent l

/-- The field an event carries: the same type of state at every layer. -/
def FieldEvent.state : {l : Layer} → FieldEvent l → FieldState
  | _, .emotion s => s
  | _, .thought _ _ s => s

/-- A thought (or an emotion) read at the emotion layer: the same field, retyped. -/
def project {l : Layer} (e : FieldEvent l) : FieldEvent .d8 := .emotion e.state

/-- An emotion read at a thought layer: the same field, retyped. -/
def lift (e : FieldEvent .d8) (l : Layer) (h : l ≠ .d8) : FieldEvent l := .thought l h e.state

/-- Same field: projecting keeps the state. -/
theorem project_same_field {l : Layer} (e : FieldEvent l) : (project e).state = e.state := rfl

/-- Same field: lifting keeps the state. -/
theorem lift_same_field (e : FieldEvent .d8) (l : Layer) (h : l ≠ .d8) :
    (lift e l h).state = e.state := rfl

/-- Projecting a lifted emotion gives the emotion back. -/
theorem project_lift (e : FieldEvent .d8) (l : Layer) (h : l ≠ .d8) : project (lift e l h) = e := by
  cases e with
  | emotion s => rfl
  | thought _ h' _ => exact absurd rfl h'

/-- Different type: at D11 there are only thoughts. -/
theorem d11_is_thought (e : FieldEvent .d11) : ∃ s, e = .thought .d11 (by decide) s := by
  cases e with
  | thought _ _ s => exact ⟨s, rfl⟩

/-- Different type: at D8 there are only emotions. -/
theorem d8_is_emotion (e : FieldEvent .d8) : ∃ s, e = .emotion s := by
  cases e with
  | emotion s => exact ⟨s, rfl⟩
  | thought _ h _ => exact absurd rfl h

end SomaField.Events
