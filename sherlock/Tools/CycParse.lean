/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
/-!
# CycL, read (ISS-141)

The parser shared by the census and the generator: NextKB's KRF files (CycL) as forms.
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
def const? : SExpr → Option String
  | .atom s => if s.startsWith "?" then none else some s
  | _ => none

end OpenCycGen
