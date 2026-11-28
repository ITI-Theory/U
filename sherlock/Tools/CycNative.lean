/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import Std.Data.HashMap
import Std.Data.HashSet
import Tools.CycParse

/-!
# OpenCyc from NextKB, as native Lean: the generator (ISS-141)

Writes the whole of NextKB's taxonomy as Lean (docs/LEAN.md):

* `Carrier`: `Thing`, every thing OpenCyc speaks of, and `toThing`, a collection as a thing (Cyc is
  higher-order: "BrainStem is a BrainRegionType");
* `Vocabulary`: every collection a set of things, every individual a thing, all `opaque` (they assert
  nothing);
* `Mt/...`: every microtheory a class of assumptions (`Prop`), its facts the fields (`A ⊑ B`,
  `x ∈ C`, `A ∩ B = ∅`), its `genlMt` links fields that are instances (`«genlMt P»`), and so
  are the parts of a large one (`«part j»`). Not `extends`: that copies every inherited field into
  the class, which at OpenCyc's scale (UniversalVocabularyMt's 290,000 facts below hundreds of
  microtheories) never finishes. A contradiction stays inside the microtheory: an inconsistent one
  has no instance.

Run from `sherlock/`: `lake exe cyc-native ../bld/sherlock/raw/nextkb ../bld/opencyc`. The output is
NextKB's data under CC BY 4.0, and every generated file says so (NextKB's `license.txt`).
-/

namespace OpenCycGen

/-- A Lean identifier for a Cyc constant: as it is if it starts with a capital and has only letters,
    digits and `_` (Lean's keywords are lowercase, but for `Type`, `Prop` and `Sort`), else in
    guillemets (Mathlib adds keywords, such as `alias`, so no list of them is safe). -/
def ident (s : String) : String :=
  let plain := s.length > 0 && s.front.isUpper && s.all (fun c => c.isAlphanum || c == '_') &&
    !["Type", "Prop", "Sort"].contains s
  if plain then s else "«" ++ s ++ "»"

/-- A collection or individual, referred to from a microtheory. OpenCyc's `Thing` is everything. -/
def ref (s : String) : String :=
  if s == "Thing" then "(_root_.Set.univ : _root_.Set OpenCyc.Thing)" else "OpenCyc." ++ ident s

/-- A file name for a microtheory. -/
def fileOf (s : String) : String :=
  let f := s.map (fun c => if c.isAlphanum then c else '_')
  if f.front.isAlpha then f else "M" ++ f

/-- The header of every generated file: NextKB's credit, as its licence asks, and what changed. -/
def header : String := "/-
This file is generated from NextKB and contains its data, under the Creative Commons Attribution 4.0
licence (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/).

This work includes data from NextKB, which was compiled by the Qualitative Reasoning Group at
Northwestern University. NextKB is freely available under the Creative Commons Attribution 4.0
license from http://qrg.northwestern.edu/nextkb/index.html. The included data was created by
contributors to the Qualitative Reasoning Group, contributors to Cycorp's OpenCyc, University of
California at Berkeley's FrameNet project, the VerbNet project, and Princeton University's WordNet
project. For details of attributions, please see http://www.qrg.northwestern.edu/nextkb/license.html

Source: nextkb_files_20190107.zip, SHA-256
5489856b64c9db1c69965ecb6a9a82382ddffd3fdf76c571b8bbde97405d7b79.
Changes: translated from CycL into Lean 4 by sherlock/Tools/CycNative.lean (ISS-141): collections as
sets of things, individuals as things, genls, isa and disjointWith as the fields of microtheory
classes, genlMt as instance fields; rules and the other predicates are not translated yet.
-/
"

/-- One fact of a microtheory: its field's name and its statement. -/
structure Fact where
  name : String
  stmt : String

/-- Everything the generator collects. -/
structure KB where
  /-- Every fact: its microtheory, its predicate and its two arguments. -/
  facts : Array (String × String × String × String) := #[]
  mts : Std.HashSet String := {}
  genlMt : Array (String × String) := #[]

def KB.addFile (kb : KB) (forms : Array SExpr) : KB := Id.run do
  let mut kb := kb
  let mut mt := ""
  for e in forms do
    match e with
    | .list xs =>
      match (xs[0]? : Option SExpr) with
      | some (SExpr.atom "in-microtheory") =>
        if let some (SExpr.atom m) := (xs[1]? : Option SExpr) then
          mt := m
          kb := { kb with mts := kb.mts.insert m }
      | some (SExpr.atom p) =>
        if mt.isEmpty then continue
        let a := (xs[1]? : Option SExpr) >>= const?
        let b := (xs[2]? : Option SExpr) >>= const?
        match a, b with
        | some a, some b =>
          if p == "genlMt" then
            kb := { kb with genlMt := kb.genlMt.push (a, b), mts := (kb.mts.insert a).insert b }
          else if p == "genls" || p == "isa" || p == "disjointWith" then
            kb := { kb with facts := kb.facts.push (mt, p, a, b) }
        | _, _ => pure ()
      | _ => pure ()
    | _ => pure ()
  return kb

structure OrderState where
  mark : Std.HashMap String Bool := {}
  out : Array String := #[]
  kept : Std.HashMap String (Array String) := {}
  dropped : Nat := 0

/-- Depth first: a microtheory is emitted after its parents; a link to a microtheory still being
    visited closes a cycle and is dropped (`mark` is `false` while visiting, `true` when done). -/
partial def visit (parents : Std.HashMap String (Array String)) (m : String) :
    StateM OrderState Unit := do
  if (← get).mark.contains m then return
  modify fun s => { s with mark := s.mark.insert m false }
  let mut met : Array String := #[]
  for p in parents.getD m #[] do
    if (← get).mark[p]? == some false then
      modify fun s => { s with dropped := s.dropped + 1 }
    else
      visit parents p
      met := met.push p
  modify fun s => { s with mark := s.mark.insert m true, out := s.out.push m, kept := s.kept.insert m met }

/-- The microtheories in an order where every one comes after its parents. Every microtheory also
    has `BaseKB` as a parent, except `BaseKB`'s own ancestors; the `genlMt` links that close a cycle
    are dropped (and counted). -/
def order (mts : Array String) (genlMt : Array (String × String)) :
    Array String × Std.HashMap String (Array String) × Nat := Id.run do
  let mut parents : Std.HashMap String (Array String) := {}
  for (c, p) in genlMt do
    if c != p && !(parents.getD c #[]).contains p then
      parents := parents.insert c ((parents.getD c #[]).push p)
  let mut above : Std.HashSet String := {}
  let mut todo : Array String := #["BaseKB"]
  while !todo.isEmpty do
    let m := todo.back!
    todo := todo.pop
    for p in parents.getD m #[] do
      if !above.contains p then
        above := above.insert p
        todo := todo.push p
  for m in mts do
    if m != "BaseKB" && !above.contains m && !(parents.getD m #[]).contains "BaseKB" then
      parents := parents.insert m ((parents.getD m #[]).push "BaseKB")
  let s := ((mts.forM (visit parents)).run {}).2
  return (s.out, s.kept, s.dropped)

def main (args : List String) : IO UInt32 := do
  let root : System.FilePath := args.getD 0 "../bld/sherlock/raw/nextkb"
  let out : System.FilePath := args.getD 1 "../bld/opencyc"
  let partSize := 2000
  let vocabSize := 5000
  let files := (← root.walkDir).filter (·.extension == some "krf")
  let mut kb : KB := {}
  for f in files do
    kb := kb.addFile (parse (← IO.FS.readBinFile f))
  -- the vocabulary: collections, and individuals (what is an instance but never a collection)
  let mut colls : Std.HashSet String := {}
  for (_, p, a, b) in kb.facts do
    if p == "isa" then colls := colls.insert b
    else colls := (colls.insert a).insert b
  let mut inds : Std.HashSet String := {}
  for (_, p, a, _) in kb.facts do
    if p == "isa" && !colls.contains a then inds := inds.insert a
  -- the facts grouped by microtheory in one pass (a sort is quadratic here: few distinct keys)
  let mut slot : Std.HashMap String Nat := {}
  let mut groups : Array (Array (String × String × String × String)) := #[]
  for f in kb.facts do
    match slot[f.1]? with
    | some k => groups := groups.modify k (·.push f)
    | none =>
      slot := slot.insert f.1 groups.size
      groups := groups.push #[f]
  let skip := ["Thing", "ThingImpl", "toThing"]
  let base := out / "OpenCycNative"
  IO.FS.createDirAll (base / "Vocabulary")
  IO.FS.createDirAll (base / "Mt")
  IO.FS.writeFile (base / "Carrier.lean") (header ++ "import Mathlib.Data.Set.Disjoint

/-! # OpenCyc: the carrier -/

namespace OpenCyc

/-- The carrier's implementation, hidden. -/
opaque ThingImpl : NonemptyType

/-- Every thing OpenCyc speaks of. -/
def Thing : Type := ThingImpl.type

instance : Nonempty Thing := ThingImpl.property

/-- A collection is also a thing (Cyc is higher-order). Not injective: no function from the sets of
    things to the things can be. -/
noncomputable opaque toThing : _root_.Set Thing → Thing

end OpenCyc
")
  -- vocabulary parts
  let decls : Array String :=
    ((colls.toArray.filter (!skip.contains ·)).qsort (· < ·)).map
        (fun c => s!"opaque {ident c} : _root_.Set Thing") ++
      ((inds.toArray.filter (!skip.contains ·)).qsort (· < ·)).map
        (fun x => s!"noncomputable opaque {ident x} : Thing")
  let mut vparts : Array String := #[]
  let mut k := 0
  while k * vocabSize < decls.size do
    let name := s!"P{k + 1}"
    let chunk := decls.extract (k * vocabSize) ((k + 1) * vocabSize)
    IO.FS.writeFile (base / "Vocabulary" / s!"{name}.lean")
      (header ++ "import OpenCycNative.Carrier\n\n/-! # OpenCyc: vocabulary, part " ++
        toString (k + 1) ++ " -/\n\nnamespace OpenCyc\n\n" ++ "\n".intercalate chunk.toList ++
        "\n\nend OpenCyc\n")
    vparts := vparts.push name
    k := k + 1
  IO.FS.writeFile (base / "Vocabulary.lean") (header ++
    "\n".intercalate (vparts.toList.map (s!"import OpenCycNative.Vocabulary.{·}")) ++ "\n")
  -- microtheories
  let mtList := (kb.mts.toArray.qsort (· < ·))
  let (ordered, parents, dropped) := order mtList kb.genlMt
  -- file names unique ignoring case: NextKB has MetaEngineeringEventsMt and
  -- MetaengineeringEventsMt, one file on a case-insensitive file system (Windows, macOS), so
  -- the later one gets a suffix
  let mut fileName : Std.HashMap String String := {}
  let mut taken : Std.HashSet String := {}
  for m in mtList do
    let mut f := fileOf m
    let mut suffix := 2
    while taken.contains f.toLower || taken.contains (f ++ "_P1").toLower do
      f := s!"{fileOf m}_{suffix}"
      suffix := suffix + 1
    taken := taken.insert f.toLower
    fileName := fileName.insert m f
  let fileOfMt := fun (m : String) => fileName.getD m (fileOf m)
  let mut mtMods : Array String := #[]
  let mut nFacts := 0
  -- each microtheory's fact names, so that one an ancestor already asserts is inherited, not
  -- asserted again
  let mut own : Std.HashMap String (Std.HashSet String) := {}
  let mut inherited := 0
  for m in ordered do
    let mut anc : Array String := #[]
    let mut ancSeen : Std.HashSet String := {}
    let mut todo := parents.getD m #[]
    while !todo.isEmpty do
      let a := todo.back!
      todo := todo.pop
      if !ancSeen.contains a then
        ancSeen := ancSeen.insert a
        anc := anc.push a
        todo := todo ++ parents.getD a #[]
    let mut seen : Std.HashSet String := {}
    let mut facts : Array Fact := #[]
    for (_, p, a, b) in (slot[m]?.map (groups[·]!)).getD #[] do
      let f : Fact :=
        if p == "genls" then ⟨s!"«{a} ⊑ {b}»", s!"{ref a} ⊆ {ref b}"⟩
        else if p == "isa" then
          let x := if colls.contains a then s!"OpenCyc.toThing {ref a}" else ref a
          ⟨s!"«{a} ∈ {b}»", s!"{x} ∈ {ref b}"⟩
        else ⟨s!"«{a} ∩ {b} = ∅»", s!"_root_.Disjoint {ref a} {ref b}"⟩
      if !seen.contains f.name then
        seen := seen.insert f.name
        if anc.any (fun a => (own.getD a {}).contains f.name) then inherited := inherited + 1
        else facts := facts.push f
    own := own.insert m seen
    nFacts := nFacts + facts.size
    let fm := fileOfMt m
    let ps := parents.getD m #[]
    let parentImports := ps.toList.map (fun p => s!"import OpenCycNative.Mt.{fileOfMt p}")
    let mut partNames : Array String := #[]
    let mut partImports : Array String := #[]
    if facts.size > partSize then
      let mut j := 0
      while j * partSize < facts.size do
        let chunk := facts.extract (j * partSize) ((j + 1) * partSize)
        let pn := s!"{ident m}.P{j + 1}"
        IO.FS.writeFile (base / "Mt" / s!"{fm}_P{j + 1}.lean") (header ++
          "import OpenCycNative.Vocabulary\n\nnamespace OpenCycMt\n\n" ++
          s!"/-- Microtheory {m}, facts part {j + 1}. -/\nclass {pn} : Prop where\n" ++
          "\n".intercalate (chunk.toList.map (fun f => s!"  {f.name} : {f.stmt}")) ++
          "\n\nend OpenCycMt\n")
        partNames := partNames.push pn
        partImports := partImports.push s!"import OpenCycNative.Mt.{fm}_P{j + 1}"
        j := j + 1
    let instFields : List (String × String) :=
      (ps.toList.map (fun p => (s!"«genlMt {p}»", ident p))) ++
        (partNames.toList.zipIdx.map (fun (pn, j) => (s!"«part {j + 1}»", pn)))
    let fieldLines := instFields.map (fun (n, t) => s!"  {n} : {t}") ++
      (if facts.size > partSize then [] else facts.toList.map (fun f => s!"  {f.name} : {f.stmt}"))
    let body := if fieldLines.isEmpty then "" else " where\n" ++ "\n".intercalate fieldLines
    let attr := if instFields.isEmpty then "" else
      "\n\nattribute [instance] " ++
        " ".intercalate (instFields.map (fun (n, _) => s!"{ident m}.{n}"))
    IO.FS.writeFile (base / "Mt" / s!"{fm}.lean") (header ++
      "\n".intercalate (["import OpenCycNative.Vocabulary"] ++ parentImports ++ partImports.toList) ++
      "\n\nset_option autoImplicit false\n\nnamespace OpenCycMt\n\n" ++
      s!"/-- Microtheory {m} ({facts.size} facts). -/\n" ++
      s!"class {ident m} : Prop{body}{attr}\n\nend OpenCycMt\n")
    mtMods := mtMods.push s!"OpenCycNative.Mt.{fm}"
  IO.FS.writeFile (out / "OpenCycNative.lean") (header ++
    "\n".intercalate ((["OpenCycNative.Carrier", "OpenCycNative.Vocabulary"] ++
      mtMods.toList).map (s!"import {·}")) ++ "\n")
  IO.println s!"vocabulary: {decls.size} constants in {vparts.size} parts; microtheories: \
    {ordered.size}, {nFacts} facts ({inherited} inherited, not repeated); genlMt links dropped to \
    break cycles: {dropped}"
  return 0

end OpenCycGen

def main (args : List String) : IO UInt32 := OpenCycGen.main args
