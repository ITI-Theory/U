/-!
# The method, as a model (USC; ISS-126)

P3, *Mathematical Co-identification*
(paper/soma/mathematical-co-identification/mathematical-co-identification.md), §3 and §10, in Lean:
a co-identification Q := P is a registered row (§10.1, the Minimal Registration Template); each
of its assumptions is checked in the target domain with a witness, or left open; the scope labels
(§10.4) and the disconfirmation rules (§10.2) are functions of the row, not prose; and a row needs
a negative control (§10.5). The loop of §3.4 (observation, hypothesis, proof, prediction, test) is
`Row.test` and `Row.witness`: new evidence changes the row, and a row cannot rise above S1 while an
assumption is open.

A Lean witness is a name literal (``n), so a row citing a theorem that does not exist does not
compile. The model needs no Mathlib; rows that cite Mathlib proofs import it themselves
(backtests/, fishing/).
-/

namespace Method

/-- §3.1 and §10.1: the parts of a type signature. -/
inductive Aspect where
  | units | operatorForm | poles | symmetry | variational
  deriving Repr, DecidableEq

/-- How an assumption is checked in the target domain (§10.1, "Target verification"). -/
inductive Witness where
  /-- A Lean theorem, checked by the kernel. -/
  | lean (n : Lean.Name)
  /-- A cited source: a paper, a section, a standard result. -/
  | cited (ref : String)
  /-- Assumed, as the source's own derivation assumes it: not checked. -/
  | assumed (why : String)
  /-- Open: not checked, with the note or issue that tracks it. -/
  | open_ (note : String)
  deriving Repr

/-- Lean and cited witnesses count as checked; assumed and open ones do not. -/
def Witness.checked : Witness → Bool
  | .lean _ | .cited _ => true
  | .assumed _ | .open_ _ => false

/-- One assumption of the imported theorem, verbatim, with its check in the target. -/
structure Assumption where
  text : String
  check : Witness
  deriving Repr

/-- §10.2: the four disconfirmation rules. -/
inductive Rule where
  /-- 1. A required assumption cannot be established in the target domain. -/
  | assumptionFails
  /-- 2. The mapped operator fails to preserve the claimed invariance. -/
  | invarianceLost
  /-- 3. The registered prediction is violated under a valid test. -/
  | predictionViolated
  /-- 4. A formally stronger mapping explains the same data with fewer assumptions. -/
  | strongerRival
  deriving Repr, DecidableEq

/-- §10.1: the row's status. -/
inductive Status where
  | exploratory | partiallyValidated | validated | falsified
  deriving Repr, DecidableEq

/-- §10.4: S1 structural, S2 predictive, S3 validated. -/
inductive Scope where
  | S1 | S2 | S3
  deriving Repr, DecidableEq

/-- §10.1: one registered import Q := P. -/
structure Row where
  id : String
  source : String
  target : String
  signature : List (Aspect × String)
  imported : String
  assumptions : List Assumption
  prediction : String
  disconfirmation : String
  /-- §10.5: the required non-transfer case, with its own witness. -/
  negativeControl : Assumption
  status : Status := .exploratory
  scope : Scope := .S1
  /-- The disconfirmation rules that have fired, with the evidence. -/
  fired : List (Rule × String) := []
  /-- The tests run on the prediction, and whether each passed. -/
  tests : List (String × Bool) := []
  deriving Repr

namespace Row

/-- The assumptions without a checked witness: the row's loose ends. -/
def openAssumptions (r : Row) : List Assumption :=
  r.assumptions.filter fun a => !a.check.checked

/-- §10.1: every field of the template is filled. -/
def registered (r : Row) : Bool :=
  !r.id.isEmpty && !r.source.isEmpty && !r.target.isEmpty && !r.signature.isEmpty &&
  !r.imported.isEmpty && !r.assumptions.isEmpty && !r.prediction.isEmpty &&
  !r.disconfirmation.isEmpty && !r.negativeControl.text.isEmpty

/-- The labels agree with the evidence: falsified exactly when a rule has fired; above S1 only
    with every assumption checked and a passed test (§10.4); S3 only when validated. -/
def consistent (r : Row) : Bool :=
  ((r.status == .falsified) == !r.fired.isEmpty) &&
  (r.scope == .S1 || (r.openAssumptions.isEmpty && r.tests.any (·.2))) &&
  (r.scope != .S3 || r.status == .validated)

def wellFormed (r : Row) : Bool := r.registered && r.consistent

/-- §3.4, one turn of the loop: a test of the prediction. A pass makes an exploratory row
    partially validated, and S2 only if no assumption is open; a fail falsifies it (rule 3). -/
def test (r : Row) (what : String) (passed : Bool) : Row :=
  let r := { r with tests := r.tests ++ [(what, passed)] }
  if passed then
    { r with
      status := if r.status == .exploratory then .partiallyValidated else r.status
      scope := if r.scope == .S1 && r.openAssumptions.isEmpty then .S2 else r.scope }
  else
    { r with status := .falsified, fired := r.fired ++ [(.predictionViolated, what)] }

/-- A witness found for an assumption: the row is updated, nothing else changes. -/
def witness (r : Row) (text : String) (w : Witness) : Row :=
  { r with assumptions := r.assumptions.map fun a => if a.text == text then { a with check := w } else a }

/-- A disconfirmation rule fires: the row is falsified, with the evidence recorded. -/
def disconfirm (r : Row) (rule : Rule) (why : String) : Row :=
  { r with status := .falsified, fired := r.fired ++ [(rule, why)] }

/-- A failed test always falsifies. -/
theorem test_fail (r : Row) (what : String) : (r.test what false).status = .falsified := by
  simp [test]

/-- A pass cannot lift a row above S1 while an assumption is open. -/
theorem test_keeps_S1 (r : Row) (what : String) (p : Bool) (hs : r.scope = .S1)
    (ho : r.openAssumptions.isEmpty = false) : (r.test what p).scope = .S1 := by
  cases p <;> simp_all [test, openAssumptions]

end Row

end Method
