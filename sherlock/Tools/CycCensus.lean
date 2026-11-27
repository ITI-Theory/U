/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import Std.Data.HashMap
import Std.Data.HashSet

/-!
# OpenCyc from NextKB: the census (ISS-141)

The native OpenCyc generator's first step: read NextKB's KRF files (CycL) and count what the native
model will have to hold, before anything is generated. The model's design (docs/LEAN.md, ISS-141): a
carrier `Thing`; a collection is a set of things; the sorts, the collections OpenCyc uses as argument
types (`arg1Isa` ... `arg6Isa`), are types; individuals are things with memberships; collection-types
are sets of sets; microtheories are classes.

Run from `sherlock/`: `lake exe cyc-census ../bld/sherlock/raw/nextkb` (unpacked from NextKB's archive,
`make -C sherlock fetch`). The data is NextKB's, under CC BY 4.0 (its `license.txt`); this program
only reads it.
-/

namespace OpenCycGen

/-- A CycL form: an atom, a string, or a list. -/
inductive SExpr where
  | atom (s : String)
  | str (s : String)
  | list (xs : Array SExpr)
  deriving Inhabited

private def isSpace (c : UInt8) : Bool := c == 32 || c == 9 || c == 10 || c == 13

private def isDelim (c : UInt8) : Bool := isSpace c || c == 40 || c == 41 || c == 34 || c == 59

/-- The top-level forms of a KRF file: `;` comments to the end of the line, strings with backslash
    escapes, nested lists. -/
def parse (b : ByteArray) : Array SExpr := Id.run do
  let n := b.size
  let mut out : Array SExpr := #[]
  let mut stack : Array (Array SExpr) := #[]
  let mut i := 0
  while i < n do
    let c := b[i]!
    if c == 59 then
      while i < n && b[i]! != 10 do
        i := i + 1
    else if c == 40 then
      stack := stack.push #[]
      i := i + 1
    else if c == 41 then
      i := i + 1
      if stack.size > 0 then
        let e := SExpr.list stack.back!
        stack := stack.pop
        if stack.isEmpty then out := out.push e
        else stack := stack.modify (stack.size - 1) (·.push e)
    else if c == 34 then
      let mut j := i + 1
      let mut buf := ByteArray.empty
      while j < n && b[j]! != 34 do
        if b[j]! == 92 && j + 1 < n then j := j + 1
        buf := buf.push b[j]!
        j := j + 1
      let e := SExpr.str ((String.fromUTF8? buf).getD "")
      if stack.isEmpty then out := out.push e
      else stack := stack.modify (stack.size - 1) (·.push e)
      i := j + 1
    else if isSpace c then
      i := i + 1
    else
      let mut j := i
      while j < n && !isDelim b[j]! do
        j := j + 1
      let e := SExpr.atom ((String.fromUTF8? (b.extract i j)).getD "")
      if stack.isEmpty then out := out.push e
      else stack := stack.modify (stack.size - 1) (·.push e)
      i := j
  return out

/-- A ground constant: an atom that is not a variable. -/
private def const? : SExpr → Option String
  | .atom s => if s.startsWith "?" then none else some s
  | _ => none

/-- What the census collects. -/
structure Census where
  files : Nat := 0
  forms : Nat := 0
  mts : Std.HashSet String := {}
  genlMt : Nat := 0
  genls : Array (String × String) := #[]
  isa : Array (String × String) := #[]
  disjoint : Array (String × String) := #[]
  argIsa : Std.HashMap String Nat := {}
  other : Nat := 0
  nonGround : Nat := 0

private def argIsaPreds : List String :=
  ["arg1Isa", "arg2Isa", "arg3Isa", "arg4Isa", "arg5Isa", "arg6Isa"]

/-- Count one file's forms. -/
def Census.addFile (c : Census) (forms : Array SExpr) : Census := Id.run do
  let mut c := { c with files := c.files + 1 }
  for e in forms do
    c := { c with forms := c.forms + 1 }
    match e with
    | .list xs =>
      match (xs[0]? : Option SExpr) with
      | some (SExpr.atom "in-microtheory") =>
        if let some (SExpr.atom m) := (xs[1]? : Option SExpr) then
          c := { c with mts := c.mts.insert m }
      | some (SExpr.atom p) =>
        if p == "genlMt" then
          c := { c with genlMt := c.genlMt + 1 }
        else if p == "isa" || p == "genls" || p == "disjointWith" || argIsaPreds.contains p then
          match (xs[1]? : Option SExpr) >>= const?, (xs[2]? : Option SExpr) >>= const? with
          | some a, some b =>
            if p == "isa" then c := { c with isa := c.isa.push (a, b) }
            else if p == "genls" then c := { c with genls := c.genls.push (a, b) }
            else if p == "disjointWith" then c := { c with disjoint := c.disjoint.push (a, b) }
            else c := { c with argIsa := c.argIsa.insert b ((c.argIsa.getD b 0) + 1) }
          | _, _ => c := { c with nonGround := c.nonGround + 1 }
        else
          c := { c with other := c.other + 1 }
      | _ => c := { c with other := c.other + 1 }
    | _ => pure ()
  return c

def main (args : List String) : IO UInt32 := do
  let root : System.FilePath := args.headD "../bld/sherlock/raw/nextkb"
  let files := (← root.walkDir).filter (·.extension == some "krf")
  let mut c : Census := {}
  for f in files do
    c := c.addFile (parse (← IO.FS.readBinFile f))
  -- collections: whatever OpenCyc uses as one
  let mut colls : Std.HashSet String := {}
  for (a, b) in c.genls do
    colls := (colls.insert a).insert b
  for (a, b) in c.disjoint do
    colls := (colls.insert a).insert b
  for (_, b) in c.isa do
    colls := colls.insert b
  for (s, _) in c.argIsa.toList do
    colls := colls.insert s
  -- individuals: what is an instance but never a collection; collection-types: collections of
  -- collections
  let mut individuals : Std.HashSet String := {}
  let mut ctypes : Std.HashSet String := {}
  for (a, b) in c.isa do
    if colls.contains a then ctypes := ctypes.insert b
    else individuals := individuals.insert a
  let sorts := c.argIsa.toList
  let top := (sorts.toArray.qsort (fun x y => x.2 > y.2)).toList.take 25
  IO.println s!"files {c.files}, forms {c.forms}, microtheories {c.mts.size}, genlMt {c.genlMt}"
  IO.println s!"genls {c.genls.size}, isa {c.isa.size}, disjointWith {c.disjoint.size}, \
    argIsa constraints {sorts.foldl (fun n s => n + s.2) 0}"
  IO.println s!"collections {colls.size}, of which sorts {sorts.length} and collection-types \
    {ctypes.size}; individuals {individuals.size}"
  IO.println s!"other forms (rules, other predicates) {c.other}, not ground {c.nonGround}"
  IO.println s!"the sorts most used as argument types: {top}"
  return 0

end OpenCycGen

def main (args : List String) : IO UInt32 := OpenCycGen.main args
