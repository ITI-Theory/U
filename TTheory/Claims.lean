/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import Lean

/-!
# Claims, witnesses, and their state

A document's claim is a proposition. A **witness** for it is a proof, registered as an instance of
`Witness`; Lean's instance search chains witnesses, so a rule
`[Witness a] → [Witness b] → Witness c` establishes `c` as soon as `a` and `b` have witnesses,
wherever those come from. A new proof, or
a changed import, moves the states downstream on the next build: nothing is set by hand.

The state of a claim is computed, never typed (`#status`):
* **kernel-verified**: a witness resting on Lean's standard axioms alone;
* **derived under assumptions**: a witness resting on further axioms, which are named;
* **frontier**: a witness through `sorry`, stated exactly but not yet proved;
* **open**: no witness at all;
* **refuted**: a refutation, a proof of the claim's denial (Moriarty's attack); its receipt says
  what the refutation rests on;
* **inconsistent**: both a witness and a refutation: the context the claim lives in (a microtheory,
  a class of assumptions) has no instance. The contradiction stays inside that context; Lean's
  kernel is untouched.

A claim that holds in a microtheory says so in its statement (`∀ T [M T], ...`); `#status` reads the
microtheories off the statement and names them.
-/

namespace TTheory

/-- A claim of a document: a short id, the document's own words in one line, and what it says as a
    proposition. -/
structure Claim where
  id : String
  text : String
  statement : Prop
  /-- What a refutation must prove: by default the statement's negation; for a claim in a
      microtheory, its negation in that microtheory (`∀ T [M T], ¬ ...`). -/
  denial : Prop := ¬ statement

/-- A witness for a claim: a proof of its statement. -/
class Witness (c : Claim) : Prop where
  proof : c.statement

theorem Witness.of {c : Claim} (h : c.statement) : Witness c := ⟨h⟩

/-- A refutation of a claim: a proof that it is false. -/
class Refutation (c : Claim) : Prop where
  disproof : c.denial

theorem Refutation.of {c : Claim} (h : ¬ c.statement) (e : c.denial = ¬ c.statement := by rfl) :
    Refutation c := ⟨e ▸ h⟩

theorem Refutation.ofDenial {c : Claim} (h : c.denial) : Refutation c := ⟨h⟩

open Lean Meta Elab Command

/-- Lean's and Mathlib's standard axioms: a witness on these alone is kernel-verified. -/
def standardAxioms : List Name := [``propext, ``Classical.choice, ``Quot.sound]

private def axiomsOf (e : Expr) : MetaM (Array Name) := do
  let mut out : Array Name := #[]
  for c in e.getUsedConstants do
    for a in (← collectAxioms c) do
      unless out.contains a do out := out.push a
  return out

private partial def listElems (e : Expr) : MetaM (List Expr) := do
  let e ← whnf e
  match e.getAppFnArgs with
  | (``List.cons, #[_, h, t]) => return h :: (← listElems t)
  | (``List.nil, _) => return []
  | _ => throwError "#status: expected a list of claims, got {e}"

/-- The contexts a proposition rests on: the classes of its instance-implicit binders, and of the
    conjuncts' (a claim built from other chapters' claims names what they rest on). -/
private partial def contextsIn (stmt : Expr) : MetaM (List Name) :=
  forallTelescopeReducing stmt fun xs body => do
    let mut out : List Name := []
    for x in xs do
      let d ← x.fvarId!.getDecl
      if d.binderInfo.isInstImplicit then
        if let some n := (← whnfR d.type).getAppFn.constName? then out := out ++ [n]
    match (← whnf body).getAppFnArgs with
    | (``And, #[a, b]) => return (out ++ (← contextsIn a) ++ (← contextsIn b)).eraseDups
    | _ => return out

/-- The microtheories a claim's statement quantifies over: its instance-implicit binders' classes,
    through conjunctions. -/
private def contextOf (c : Expr) : MetaM (List Name) := do
  contextsIn (← whnf (mkApp (mkConst ``TTheory.Claim.statement) c))

private unsafe def evalStringUnsafe (e : Expr) : MetaM String :=
  Meta.evalExpr String (mkConst ``String) e

/-- A string computed rather than written (a row's id with a suffix): evaluated, for display. -/
@[implemented_by evalStringUnsafe] private opaque evalString (e : Expr) : MetaM String

private def strField (field : Name) (c : Expr) : MetaM String := do
  let e := mkApp (mkConst field) c
  match ← whnf e with
  | .lit (.strVal s) => return s
  | w => try evalString e catch _ => throwError "#status: {field} is not a string: {w}"

/-- A claim's state, computed from its witness or refutation: an index (0 kernel-verified,
    1 derived under assumptions, 2 frontier, 3 open, 4 refuted, 5 inconsistent) and the words. -/
private def stateOf (c : Expr) : MetaM (Nat × String) := do
  let receipt := fun (ax : Array Name) => (ax.filter (fun a => !standardAxioms.contains a)).toList
  let ctx ← contextOf c
  let inCtx := if ctx.isEmpty then "" else s!" in {ctx}"
  let w? ← synthInstance? (mkApp (mkConst ``TTheory.Witness) c)
  let r? ← synthInstance? (mkApp (mkConst ``TTheory.Refutation) c)
  let (k, state) ← match r?, w? with
    | some _, some _ =>
      pure (5, s!"inconsistent: witnessed and refuted{inCtx}, " ++ "which has no instance")
    | some r, none =>
      let ax ← axiomsOf (← instantiateMVars r)
      if ax.contains ``sorryAx then pure (2, "frontier (a refutation through sorry)")
      else
        let extra := receipt ax
        pure (4, if extra.isEmpty then s!"refuted{inCtx}"
          else s!"refuted{inCtx}, resting on: {extra}")
    | none, none => pure (3, "open")
    | none, some w =>
      let ax ← axiomsOf (← instantiateMVars w)
      if ax.contains ``sorryAx then pure (2, "frontier (sorry)")
      else
        let extra := receipt ax
        if extra.isEmpty then pure (0, s!"kernel-verified{inCtx}")
        else pure (1, s!"derived under assumptions{inCtx}: {extra}")
  return (k, state)

/-- `#status claims`: each claim's state as the model stands now, computed from its witness. -/
elab "#status " t:term : command => liftTermElabM do
  let ty := mkApp (mkConst ``List [Level.zero]) (mkConst ``TTheory.Claim)
  let e ← instantiateMVars (← Term.elabTermEnsuringType t ty)
  let mut lines : Array MessageData := #[]
  let mut counts : Array Nat := #[0, 0, 0, 0, 0, 0]
  for c in ← listElems e do
    let id ← strField ``TTheory.Claim.id c
    let text ← strField ``TTheory.Claim.text c
    let (k, state) ← stateOf c
    counts := counts.modify k (· + 1)
    lines := lines.push m!"{id} [{state}]: {text}"
  logInfo (MessageData.joinSep lines.toList "\n" ++
    m!"\n{counts[0]!} kernel-verified, {counts[1]!} derived under assumptions, " ++
    m!"{counts[2]!} frontier, {counts[3]!} open, {counts[4]!} refuted, " ++
    m!"{counts[5]!} inconsistent")

/-- `#covers abstract body`: does the body establish what the abstract says? `abstract` pairs each
    phrase of a document's abstract with the claim that carries it; `body` is the chapter's claims.
    Each phrase is shown with its claim's state; then the claims the body proves that the abstract
    does not mention. A phrase is established when its claim is kernel-verified or derived under
    assumptions. -/
elab "#covers " a:term:max b:term:max : command => liftTermElabM do
  let claimTy := mkConst ``TTheory.Claim
  let pairTy := mkApp2 (mkConst ``Prod [Level.zero, Level.zero]) (mkConst ``String) claimTy
  let listOf := fun (t : Expr) => mkApp (mkConst ``List [Level.zero]) t
  let ae ← instantiateMVars (← Term.elabTermEnsuringType a (listOf pairTy))
  let be ← instantiateMVars (← Term.elabTermEnsuringType b (listOf claimTy))
  let mut lines : Array MessageData := #[]
  let mut ids : Array String := #[]
  let mut established := 0
  let pairs ← listElems ae
  for p in pairs do
    let p ← whnf p
    let args := p.getAppArgs
    let phrase ← match ← whnf args[2]! with
      | .lit (.strVal s) => pure s
      | e => throwError "#covers: the phrase is not a string literal: {e}"
    let c := args[3]!
    let id ← strField ``TTheory.Claim.id c
    ids := ids.push id
    let (k, state) ← stateOf c
    if k ≤ 1 then established := established + 1
    lines := lines.push m!"\"{phrase}\"\n    -> {id} [{state}]"
  let mut extra : Array String := #[]
  for c in ← listElems be do
    let id ← strField ``TTheory.Claim.id c
    unless ids.contains id do extra := extra.push id
  logInfo (MessageData.joinSep lines.toList "\n" ++
    m!"\nthe abstract: {established} of {pairs.length} established by the body" ++
    m!"\nthe body also proves (not in the abstract): {extra.toList}")

end TTheory
