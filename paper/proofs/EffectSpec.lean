import UniversalSomaticField
import ScaleUniverse
import MTheoryIsomorphism

/-!
# EffectSpec.lean — effects, a causal response interpreter and a lawful lens (ISS-024)

The UAT sketch `uat/RC1.1/inbox/SomaMachine/SomaUniverse.lean` claimed
`SomaticIO ≃ ImpulseResponse` and a two-sided lens from the 11D field onto the
soma. Both are too strong: an equivalence would identify a description of effects
with a Green's function, and a lossy projection has no inverse
(`lossy_view_has_no_review` below). This module keeps the useful part:

    EffectSpec σ α  →  typed universe at scale σ  →  causal response interpreter  →  lens

* `EffectSpec σ α` says *what* is asked at scale σ (poke the field with J(x, t),
  observe it at (x, t)), not how the substrate answers.
* A `Responder σ` is the substrate's answer: a forcing in, a field out, with
  causality as a contract (the response at t reads the forcing only before t).
* `interpret` runs an effect description against a responder, into the state
  monad `SomaticIO` the sketch defined; it respects `bind` (`interpret_bind`).
  It is a monad morphism, not an equivalence.
* `Lens` is the lawful get/put lens: it keeps the rest of the universe, so its
  laws hold; `limbicLens` focuses X₇ on the limbic axis.

Only structural and type-safety facts are proved here; the physics stays in its
own modules. No `sorry`, no axioms of its own.

**Scale convention.** 21 levels, numbered 0 to 20 (`UniversalSomaticField.ScaleLevel
= Fin 21`, the 21 constructors of `ScaleUniverse.ScaleStep`); "the 20-scale dial" in
the prose counts the 20 steps between them. `scaleEquiv` proves the two encodings
agree. (`RenormalisationGroup.RGCouplings` uses `Fin 20`, one coupling per step.)
-/

namespace SomaField.Effect

open SomaField.Universal SomaField.Universe SomaField.MTheory

noncomputable section

/-! ## 1. One scale convention -/

/-- The position of each `ScaleStep` on the dial (0 to 20). -/
def stepIndex : ScaleStep → ScaleLevel
  | .PlanckFoam => 0
  | .StringScale => 1
  | .NuclearQuark => 2
  | .AtomicOrbital => 3
  | .MolecularBond => 4
  | .CellularSynapse => 5
  | .AxonFibre => 6
  | .BrainCEMI => 7
  | .OrganismBody => 8
  | .SwarmCrowd => 9
  | .CityInfrastructure => 10
  | .GeologicalSeismic => 11
  | .PlanetaryMantle => 12
  | .SolarSystem => 13
  | .StellarNeighbour => 14
  | .GalacticDisc => 15
  | .GalacticHalo => 16
  | .GalaxyCluster => 17
  | .LargeScaleStruct => 18
  | .ObservableUniverse => 19
  | .CosmicWeb => 20

/-- The `ScaleStep` at a position on the dial. -/
def stepOfIndex (i : ScaleLevel) : ScaleStep :=
  match i.val with
  | 0 => .PlanckFoam
  | 1 => .StringScale
  | 2 => .NuclearQuark
  | 3 => .AtomicOrbital
  | 4 => .MolecularBond
  | 5 => .CellularSynapse
  | 6 => .AxonFibre
  | 7 => .BrainCEMI
  | 8 => .OrganismBody
  | 9 => .SwarmCrowd
  | 10 => .CityInfrastructure
  | 11 => .GeologicalSeismic
  | 12 => .PlanetaryMantle
  | 13 => .SolarSystem
  | 14 => .StellarNeighbour
  | 15 => .GalacticDisc
  | 16 => .GalacticHalo
  | 17 => .GalaxyCluster
  | 18 => .LargeScaleStruct
  | 19 => .ObservableUniverse
  | _ => .CosmicWeb

/-- **Proved**: the named scales of `ScaleUniverse` and the numbered scales of
    `UniversalSomaticField` are the same 21 levels, in the same order. -/
def scaleEquiv : ScaleStep ≃ ScaleLevel where
  toFun := stepIndex
  invFun := stepOfIndex
  left_inv s := by cases s <;> rfl
  right_inv i := by fin_cases i <;> rfl

theorem scale_count : Fintype.card ScaleLevel = 21 := by simp

theorem brain_is_scale_seven : stepIndex .BrainCEMI = 7 := rfl

theorem organism_is_scale_eight : stepIndex .OrganismBody = 8 := rfl

/-! ## 2. Effect specifications -/

/-- A forcing term J(x, t): POKE FIELD in the Soma Machine. -/
abbrev Forcing := ℝ → ℝ → ℝ

/-- What is asked at scale σ, as data. The scale is in the type: an effect written
    for the brain (σ = 7) cannot be run by a responder for the body (σ = 8). -/
inductive EffectSpec (σ : ScaleLevel) (α : Type) : Type where
  /-- Return a value; nothing happens to the field. -/
  | pure : α → EffectSpec σ α
  /-- Add a forcing J(x, t) to the field, then continue. -/
  | poke : Forcing → EffectSpec σ α → EffectSpec σ α
  /-- Read the field's response at (x, t), then continue with the reading. -/
  | observe : ℝ → ℝ → (ℝ → EffectSpec σ α) → EffectSpec σ α

/-- Sequencing: do `m`, then `f` with its result. -/
def EffectSpec.bind {σ : ScaleLevel} {α β : Type} :
    EffectSpec σ α → (α → EffectSpec σ β) → EffectSpec σ β
  | .pure a, f => f a
  | .poke J m, f => .poke J (m.bind f)
  | .observe x t k, f => .observe x t (fun r => (k r).bind f)

instance (σ : ScaleLevel) : Monad (EffectSpec σ) where
  pure := .pure
  bind := EffectSpec.bind

/-! ## 3. The causal response interpreter -/

/-- How a substrate at scale σ answers a forcing: J ↦ ψ, the field ψ(x, t).
    Contract: the response at time t depends on the forcing only before t
    (a retarded response; the sketch's `t' < t`). -/
structure Responder (σ : ScaleLevel) where
  respond : Forcing → Forcing
  causal : ∀ (J J' : Forcing) (t : ℝ), (∀ y s, s < t → J y s = J' y s) →
    ∀ x, respond J x t = respond J' x t

/-- A typed universe at scale σ: that scale's field equation and its responder. -/
structure TypedUniverse (σ : ScaleLevel) where
  field : FieldEquation σ
  responder : Responder σ

/-- The sketch's state monad: thread a state, return a value. -/
def SomaticIO (S α : Type) : Type := S → α × S

/-- Run an effect description against a responder. The state is the total forcing
    so far; a poke adds to it, an observation reads the response to it. -/
def interpret {σ : ScaleLevel} {α : Type} (R : Responder σ) :
    EffectSpec σ α → Forcing → α × Forcing
  | .pure a, J => (a, J)
  | .poke P m, J => interpret R m (J + P)
  | .observe x t k, J => interpret R (k (R.respond J x t)) J

/-- The interpreter as a `SomaticIO` action. -/
def toSomaticIO {σ : ScaleLevel} {α : Type} (R : Responder σ) (m : EffectSpec σ α) :
    SomaticIO Forcing α :=
  interpret R m

theorem interpret_pure {σ : ScaleLevel} {α : Type} (R : Responder σ) (a : α) (J : Forcing) :
    interpret R (.pure a) J = (a, J) := rfl

/-- **Proved**: interpretation respects sequencing (a monad morphism into the state
    monad). This, not an equivalence, is the correspondence the sketch was after. -/
theorem interpret_bind {σ : ScaleLevel} {α β : Type} (R : Responder σ)
    (m : EffectSpec σ α) (f : α → EffectSpec σ β) (J : Forcing) :
    interpret R (m.bind f) J = interpret R (f (interpret R m J).1) (interpret R m J).2 := by
  induction m generalizing J with
  | pure a => rfl
  | poke P m ih =>
      simp only [EffectSpec.bind, interpret]
      exact ih (J + P)
  | observe x t k ih =>
      simp only [EffectSpec.bind, interpret]
      exact ih _ J

/-- **Proved**: a poke that starts at t or later is not seen by an observation at t. -/
theorem late_poke_unseen {σ : ScaleLevel} (R : Responder σ) (J P : Forcing) (x t : ℝ)
    (hP : ∀ y s, s < t → P y s = 0) :
    R.respond (J + P) x t = R.respond J x t :=
  R.causal _ _ t (fun y s hs => by simp [hP y s hs]) x

/-- A responder that answers with gain g after a delay τ > 0: ψ(x, t) = g · J(x, t − τ).
    The simplest causal response, with a response time. -/
def delayed {σ : ScaleLevel} (g τ : ℝ) (hτ : 0 < τ) : Responder σ where
  respond J x t := g * J x (t - τ)
  causal J J' t h x := by
    show g * J x (t - τ) = g * J' x (t - τ)
    rw [h x (t - τ) (by linarith)]

/-- **Proved**: poke a quiet field with J, observe at (x, t): the delayed responder
    reads g · J(x, t − τ). -/
theorem poke_then_observe {σ : ScaleLevel} (g τ : ℝ) (hτ : 0 < τ) (J : Forcing) (x t : ℝ) :
    (interpret (delayed (σ := σ) g τ hτ)
      (.poke J (.observe x t .pure)) (0 : Forcing)).1 = g * J x (t - τ) := by
  simp [interpret, delayed]

/-- **Proved**: every scale has a typed universe (its field equation, a causal responder). -/
theorem typed_universe_at_every_scale (σ : ScaleLevel) : Nonempty (TypedUniverse σ) :=
  let ⟨e⟩ := scale_invariance_inhabited σ
  ⟨⟨e, delayed 1 1 one_pos⟩⟩

/-! ## 4. The observation lens -/

/-- A lawful lens: look at one part of a universe (`view`) and change only that
    part (`set`). It keeps the rest, so nothing is lost. -/
structure Lens (U S : Type) where
  view : U → S
  set : U → S → U
  view_set : ∀ u s, view (set u s) = s
  set_view : ∀ u, set u (view u) = u
  set_set : ∀ u s s', set (set u s) s' = set u s'

/-- X₇ = P₃ × L₁ × C₃ focused on the limbic axis L₁. -/
def limbicLens : Lens CompactX7 LimbicAxis1D where
  view u := u.2.1
  set u l := (u.1, l, u.2.2)
  view_set _ _ := rfl
  set_view _ := rfl
  set_set _ _ _ := rfl

/-- **Proved**: a view that sends two different universes to the same picture has no
    inverse. The sketch's lens laws (`view ∘ review = id` and `review ∘ view = id`)
    cannot hold for a lossy projection such as 11D onto the soma. -/
theorem lossy_view_has_no_review {U S : Type} (view : U → S) (u₁ u₂ : U)
    (hv : view u₁ = view u₂) (hne : u₁ ≠ u₂) :
    ¬ ∃ review : S → U, ∀ u, review (view u) = u := by
  rintro ⟨review, h⟩
  apply hne
  calc u₁ = review (view u₁) := (h u₁).symm
    _ = review (view u₂) := by rw [hv]
    _ = u₂ := h u₂

/-- **Proved**: the limbic view alone cannot rebuild X₇; the lens's `set` must be
    given the rest. -/
theorem limbic_view_is_lossy :
    ¬ ∃ review : LimbicAxis1D → CompactX7, ∀ u, review (limbicLens.view u) = u :=
  lossy_view_has_no_review limbicLens.view
    ((fun _ => 0, 0, fun _ => 0) : CompactX7) ((fun _ => 1, 0, fun _ => 0) : CompactX7) rfl
    (by
      intro h
      have := congrFun (congrArg Prod.fst h) 0
      norm_num at this)

end

end SomaField.Effect
