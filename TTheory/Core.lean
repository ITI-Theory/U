import Lean

/-!
# The core: claims, witnesses, and their state

A document's claim is a proposition. A **witness** for it is a proof, registered as an instance of
`Witness`; Lean's instance search chains witnesses, so a rule `[Witness a] → [Witness b] → Witness c`
establishes `c` as soon as `a` and `b` have witnesses, wherever those come from. A new proof, or a changed
import, moves the states downstream on the next build: nothing is set by hand.

The state of a claim is computed, never typed (`#status`):
* **kernel-verified**: a witness resting on Lean's standard axioms alone;
* **derived under assumptions**: a witness resting on further axioms, which are named;
* **frontier**: a witness through `sorry`, stated exactly but not yet proved;
* **open**: no witness at all;
* **refuted**: a refutation, a proof that the claim is false (Moriarty's attack); its receipt says what
  the refutation rests on.
-/

namespace TTheory

/-- A claim of a document: a short id, the document's own words in one line, and what it says as a
    proposition. -/
structure Claim where
  id : String
  text : String
  statement : Prop

/-- A witness for a claim: a proof of its statement. -/
class Witness (c : Claim) : Prop where
  proof : c.statement

theorem Witness.of {c : Claim} (h : c.statement) : Witness c := ⟨h⟩

/-- A refutation of a claim: a proof that it is false. -/
class Refutation (c : Claim) : Prop where
  disproof : ¬ c.statement

theorem Refutation.of {c : Claim} (h : ¬ c.statement) : Refutation c := ⟨h⟩

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

private def strField (field : Name) (c : Expr) : MetaM String := do
  match ← whnf (mkApp (mkConst field) c) with
  | .lit (.strVal s) => return s
  | e => throwError "#status: {field} is not a string literal: {e}"

/-- `#status claims`: each claim's state as the model stands now, computed from its witness. -/
elab "#status " t:term : command => liftTermElabM do
  let ty := mkApp (mkConst ``List [Level.zero]) (mkConst ``TTheory.Claim)
  let e ← instantiateMVars (← Term.elabTermEnsuringType t ty)
  let mut lines : Array MessageData := #[]
  let mut counts : Array Nat := #[0, 0, 0, 0, 0]
  for c in ← listElems e do
    let id ← strField ``TTheory.Claim.id c
    let text ← strField ``TTheory.Claim.text c
    let receipt := fun (ax : Array Name) => (ax.filter (fun a => !standardAxioms.contains a)).toList
    let (k, state) ← match ← synthInstance? (mkApp (mkConst ``TTheory.Refutation) c) with
      | some r =>
        let ax ← axiomsOf (← instantiateMVars r)
        if ax.contains ``sorryAx then pure (2, "frontier (a refutation through sorry)")
        else
          let extra := receipt ax
          pure (4, if extra.isEmpty then "refuted" else s!"refuted, resting on: {extra}")
      | none => match ← synthInstance? (mkApp (mkConst ``TTheory.Witness) c) with
        | none => pure (3, "open")
        | some w =>
          let ax ← axiomsOf (← instantiateMVars w)
          if ax.contains ``sorryAx then pure (2, "frontier (sorry)")
          else
            let extra := receipt ax
            if extra.isEmpty then pure (0, "kernel-verified")
            else pure (1, s!"derived under assumptions: {extra}")
    counts := counts.modify k (· + 1)
    lines := lines.push m!"{id} [{state}]: {text}"
  logInfo (MessageData.joinSep lines.toList "\n" ++
    m!"\n{counts[0]!} kernel-verified, {counts[1]!} derived under assumptions, {counts[2]!} frontier, {counts[3]!} open, {counts[4]!} refuted")

end TTheory
