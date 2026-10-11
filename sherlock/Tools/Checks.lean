import Lean

/-!
# Sherlock's arithmetic templates: numbers as data (epic D9)

`sherlock/registry.py check` writes `bld/sherlock/checks.json`: for each
claim with a `check:` field, a template name and its numbers as exact
rationals (numerator, denominator). This file reads it and adds one theorem
per check, `Sherlock.Check.<doc>.<claim>_<k> : holds template args = true`,
proved by `decide`: the kernel evaluates the template on the numbers. An
edited number in a document is re-checked by editing the registry only; no
Lean is written or generated. Python extracts, Lean decides (D5).

Templates (all over exact rationals):
- `eq a b`, `ne a b`, `lt a b`;
- `sum x₁ … xₙ s`: x₁ + … + xₙ = s;
- `diff a b d`: a − b = d;
- `rel-between x ref lo hi`: lo ≤ |x − ref| / ref < hi (a stated percentage);
- `monotone x₁ … xₙ`, `not-monotone x₁ … xₙ`: nondecreasing, or not.
-/

namespace Sherlock

/-- A rational as numerator and positive denominator. -/
abbrev Q := Int × Int

def Q.add (a b : Q) : Q := (a.1 * b.2 + b.1 * a.2, a.2 * b.2)
def Q.sub (a b : Q) : Q := (a.1 * b.2 - b.1 * a.2, a.2 * b.2)
def Q.eq (a b : Q) : Bool := a.1 * b.2 == b.1 * a.2
def Q.le (a b : Q) : Bool := a.1 * b.2 ≤ b.1 * a.2
def Q.lt (a b : Q) : Bool := a.1 * b.2 < b.1 * a.2
def Q.abs (a : Q) : Q := (if a.1 < 0 then -a.1 else a.1, a.2)
/-- |x − ref| / ref, for ref > 0. -/
def Q.relDiff (x ref : Q) : Q :=
  let d := (Q.sub x ref).abs
  (d.1 * ref.2, d.2 * ref.1)

def nondecreasing : List Q → Bool
  | a :: b :: rest => Q.le a b && nondecreasing (b :: rest)
  | _ => true

/-- The templates. -/
def holds : String → List Q → Bool
  | "eq", [a, b] => Q.eq a b
  | "ne", [a, b] => !Q.eq a b
  | "lt", [a, b] => Q.lt a b
  | "sum", xs => match xs.reverse with
    | s :: rest => Q.eq (rest.foldl Q.add (0, 1)) s
    | [] => false
  | "diff", [a, b, d] => Q.eq (Q.sub a b) d
  | "rel-between", [x, ref, lo, hi] => Q.le lo (Q.relDiff x ref) && Q.lt (Q.relDiff x ref) hi
  | "monotone", xs => nondecreasing xs
  | "not-monotone", xs => !nondecreasing xs
  | _, _ => false

end Sherlock

open Lean Elab Command Meta in
/-- Add one kernel-checked theorem per check in a checks file. -/
elab "#sherlock_checks " path:str : command => do
  let text ← IO.FS.readFile path.getString
  let items ← IO.ofExcept ((← IO.ofExcept (Json.parse text)).getArr?)
  let mut ok : Nat := 0
  for item in items do
    let doc ← IO.ofExcept (item.getObjValAs? String "doc")
    let claim ← IO.ofExcept (item.getObjValAs? String "claim")
    let tmpl ← IO.ofExcept (item.getObjValAs? String "template")
    let args ← IO.ofExcept (item.getObjValAs? (Array (Int × Int)) "args")
    let k ← IO.ofExcept (item.getObjValAs? Nat "k")
    let name := Name.mkStr (Name.mkStr `Sherlock.Check (doc.replace "-" "_")) s!"{claim}_{k}"
    let lhs := mkApp2 (mkConst ``Sherlock.holds) (toExpr tmpl) (toExpr args.toList)
    let prop := mkApp3 (mkConst ``Eq [Level.one]) (mkConst ``Bool) lhs (mkConst ``Bool.true)
    -- evaluate first (a clear failure per claim), then let the kernel check the theorem
    unless Sherlock.holds tmpl args.toList do
      logError m!"check failed: {doc} {claim} (#{k}): {tmpl} {args}"
      continue
    let proof ← liftTermElabM <| mkDecideProof prop
    liftCoreM <| addDecl <| .thmDecl { name, levelParams := [], type := prop, value := proof }
    ok := ok + 1
  logInfo m!"sherlock checks: {ok} of {items.size} kernel-checked"

#sherlock_checks "../bld/sherlock/checks.json"
