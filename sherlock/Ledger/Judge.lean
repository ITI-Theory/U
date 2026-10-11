import Lean

/-!
# Sherlock's ledger judge (root package)

Reads `bld/sherlock/ledger-claims.json` (`sherlock/ledger.py extract`):
names that documents cite, as `Module.name` or a bare name. Loads one programme module (`SHERLOCK_MODULE`; one Lean process per module,
so memory stays bounded, and some modules cannot share an environment:
OSforGFF and Physlib both define `SpaceTime`), resolves the cited names declared
there, and writes `bld/sherlock/ledger/<Module>.json`: the resolved name, its
kind and the axioms it rests on (`sorryAx` shows a sorry). Library names (Mathlib) are
resolved too. Python extracts and reports, Lean decides (Sherlock epic, D5).
Run by `sherlock/ledger.py judge` from the repository root.
-/

open Lean

/-- The programme's own modules (the root package's libraries). -/
def programme : List Name := [`Benchmark, `BFSSIsomorphism, `BRECVEMAField, `BRECVEMAVariational, `CosmologicalConstant, `DyadicField, `EmotionOntology, `FieldProofs, `G2Compactification, `Hopfield, `LimbicHopfield, `LimbicTunnel, `LocalGeometry, `LocalGR, `Movie, `MTheoryIsomorphism, `QuantumSim, `RenormalisationGroup, `ScaleUniverse, `SomaField, `SomaNetwork, `SomaPhilosophy, `SwarmPropagator, `TemporalDynamics, `UniversalSomaticField, `USF_OSAxioms]

def kindOf : ConstantInfo → String
  | .axiomInfo _ => "axiom"
  | .thmInfo _ => "theorem"
  | .defnInfo _ => "def"
  | .opaqueInfo _ => "opaque"
  | .inductInfo _ => "inductive"
  | .ctorInfo _ => "constructor"
  | _ => "other"

def axiomsOf (env : Environment) (n : Name) : IO (List String) := do
  let (axs, _) ← (collectAxioms n : CoreM _).toIO { fileName := "judge", fileMap := default } { env := env }
  return axs.toList.map toString

/-- Does declaration `n` match the cited string (`Module.name` or a bare name)? -/
def citedAs (cited : String) (mod n : Name) : Bool :=
  let parts := cited.splitOn "."
  let last := parts.getLast!
  n.getString! == last &&
    (parts.length == 1 || mod.toString == String.intercalate "." parts.dropLast || n.toString.endsWith cited)

def result (env : Environment) (cited : String) (n : Name) (mod : String) : IO Json := do
  let some ci := env.find? n | return Json.mkObj [("name", cited), ("kind", "missing")]
  return Json.mkObj [("name", cited), ("resolved", toString n), ("module", mod), ("kind", kindOf ci),
    ("axioms", toJson (← axiomsOf env n))]

#eval show IO Unit from do
  initSearchPath (← findSysroot)
  let some modStr ← IO.getEnv "SHERLOCK_MODULE"
    | throw (IO.userError "set SHERLOCK_MODULE (sherlock/ledger.py judge does)")
  let mod := modStr.toName
  let text ← IO.FS.readFile "bld/sherlock/ledger-claims.json"
  let items ← IO.ofExcept ((← IO.ofExcept (Json.parse text)).getArr?)
  let mut wanted : Array String := #[]
  for item in items do
    let n ← IO.ofExcept (item.getObjValAs? String "name")
    unless wanted.contains n do wanted := wanted.push n
  let env ← importModules #[{ module := mod }] {}
  let some idx := env.getModuleIdx? mod | throw (IO.userError s!"module {mod} not found")
  let mut found : Std.HashMap String Json := {}
  for (n, i) in env.const2ModIdx.toList do
    if i != idx then continue
    for cited in wanted do
      if !found.contains cited && citedAs cited mod n then
        found := found.insert cited (← result env cited n modStr)
  for cited in wanted do
    unless found.contains cited do
      if env.contains cited.toName && !programme.contains cited.toName.getRoot then
        found := found.insert cited (← result env cited cited.toName "library")
  IO.FS.createDirAll "bld/sherlock/ledger"
  IO.FS.writeFile s!"bld/sherlock/ledger/{modStr}.json" (Json.pretty (Json.arr (found.toArray.map (·.2))))
  IO.println s!"ledger judge {modStr}: {found.size} of {wanted.size} names resolved here"