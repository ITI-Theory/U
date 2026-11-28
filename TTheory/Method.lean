/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims

/-!
# The method: co-identification, at the type level

P3, *Mathematical Co-identification*, gives a procedure: relabel the target's objects as the
source's, import a source theorem, check each of its assumptions in the target, register the row
with a prediction, a disconfirmation criterion and a negative control. Here the procedure is types,
so the kernel holds it to its own rules (ISS-141; it replaces the string-and-Bool `Method.Row` of
`sherlock/Method`):

* a `CoId` is the relabelling `label : T → S` (P3 §3: "under an explicitly checked change of
  label");
* an `Import` along it is a source theorem `∀ s, A s → C s`; `Verified` is the target check, a class
  whose instance says every relabelled target object meets `A`; `Import.transfer` is the import;
* a `Row` (§10.1, the Minimal Registration Template) carries its premises and conclusion as
  propositions, the transfer as a proof, and its negative control (§10.5) as a proof too: a row
  without one does not compile;
* each row gives two claims: `structural` (the conclusion given the premises: the transfer is
  proved, scope S1) and `claim` (the conclusion itself: open until the premises are checked in the
  target, an instance of `Row.Holds`). `#status` computes both, as for any claim.

The texts are for display only; nothing is decided by a string. Generic: any two domains, any
theorem (the Einstein backtest of 1905 is a row of the same kind).
-/

namespace TTheory.Method

open TTheory

universe u v

/-- A co-identification `Q := P`: the target's objects relabelled as the source's. -/
structure CoId (S : Type u) (T : Type v) where
  label : T → S

/-- An import along a co-identification: a source theorem, its assumptions and its conclusion. -/
structure Import {S : Type u} {T : Type v} (q : CoId S T) where
  assumes : S → Prop
  concludes : S → Prop
  source : ∀ s, assumes s → concludes s

/-- The target verification (§10.1): every relabelled target object meets the source theorem's
    assumptions. Its instance is the check. -/
class Verified {S : Type u} {T : Type v} {q : CoId S T} (i : Import q) : Prop where
  holds : ∀ t, i.assumes (q.label t)

/-- The imported theorem, in the target. -/
theorem Import.transfer {S : Type u} {T : Type v} {q : CoId S T} (i : Import q) [h : Verified i] :
    ∀ t, i.concludes (q.label t) :=
  fun t => i.source _ (h.holds t)

/-- A registered row (§10.1): what is claimed of the target, the premises it needs there, the
    transfer as a proof, and the negative control (§10.5) as a proof: a case where the conclusion
    does not follow, so that matching form is shown not to be enough. -/
structure Row where
  id : String
  source : String
  target : String
  prediction : String
  disconfirmation : String
  premises : Prop
  conclusion : Prop
  transfer : premises → conclusion
  /-- The non-transfer case, stated. -/
  control : Prop
  /-- And proved. -/
  controlHolds : control

/-- The premises checked in the target: the instance is the check (§10.1, "target verification"). -/
class Row.Holds (r : Row) : Prop where
  premises : r.premises

/-- Scope S1 (§10.4): the conclusion given the premises; it holds once the transfer is proved. -/
def Row.structural (r : Row) : Claim where
  id := r.id ++ ".S1"
  text := r.source ++ " := " ++ r.target
  statement := ∀ [Row.Holds r], r.conclusion

instance (r : Row) : Witness r.structural := .of fun [h : Row.Holds r] => r.transfer h.premises

/-- The conclusion itself, in the target: open until the premises are checked there. -/
def Row.claim (r : Row) : Claim where
  id := r.id
  text := r.prediction
  statement := r.conclusion

instance (r : Row) [h : Row.Holds r] : Witness r.claim := .of (r.transfer h.premises)

/-- The negative control, as a claim (always kernel-verified, or the row would not compile). -/
def Row.controlClaim (r : Row) : Claim where
  id := r.id ++ ".control"
  text := "negative control: " ++ r.disconfirmation
  statement := r.control

instance (r : Row) : Witness r.controlClaim := .of r.controlHolds

/-- A row from an import: premises the target check, conclusion the imported theorem. -/
def Import.row {S : Type u} {T : Type v} {q : CoId S T} (i : Import q) (id source target prediction
    disconfirmation : String) (control : Prop) (controlHolds : control) : Row where
  id := id
  source := source
  target := target
  prediction := prediction
  disconfirmation := disconfirmation
  premises := ∀ t, i.assumes (q.label t)
  conclusion := ∀ t, i.concludes (q.label t)
  transfer := fun h t => i.source _ (h t)
  control := control
  controlHolds := controlHolds

/-- A row's three claims, for `#status`. -/
def Row.claims (r : Row) : List Claim := [r.structural, r.claim, r.controlClaim]

end TTheory.Method
