import Lean

/-!
# Sherlock's export of the programme's Lean, for the towers of code (ISS-071)

Loads one programme module (`SHERLOCK_MODULE`, one Lean process per module, as
the ledger's judge does) and writes `bld/sherlock/towers/<Module>.json`: every
declaration the module itself declares (not auto-generated ones), with its kind,
its statement (pretty-printed, shortened), its source line and the axioms it
rests on (`sorryAx` marks a sorry). The Soma Machine's city of code draws a tower
per module and a floor per declaration from it. The result is stamped with the
commit by `sherlock/towers.py`: "kernel-checked at <commit>", never claimed live.
Run by `python sherlock/towers.py` from the repository root.
-/

open Lean Meta

def kindOf : ConstantInfo → String
  | .axiomInfo _ => "axiom"
  | .thmInfo _ => "theorem"
  | .defnInfo _ => "def"
  | .opaqueInfo _ => "opaque"
  | .inductInfo _ => "inductive"
  | .ctorInfo _ => "constructor"
  | _ => "other"

/-- Auto-generated or internal names the towers leave out. -/
def hidden (env : Environment) (n : Name) : Bool :=
  n.isInternal || n.isImplementationDetail || isAuxRecursor env n || isNoConfusion env n ||
  (n.getString!.startsWith "match_") || (n.getString!.startsWith "proof_") ||
  (n.getString!.startsWith "eq_") || n.getString! == "rec" || n.getString! == "casesOn" ||
  n.getString! == "recOn" || n.getString! == "brecOn" || n.getString! == "below" ||
  n.getString! == "noConfusionType" || n.getString! == "mk.injEq" || n.getString! == "sizeOf_spec"

def shorten (s : String) (k : Nat := 400) : String :=
  let flat := " ".intercalate (s.splitOn "\n" |>.map (fun l => l.trimAscii.toString))
  if flat.length ≤ k then flat else (flat.take k).toString ++ " …"

#eval show IO Unit from do
  initSearchPath (← findSysroot)
  enableInitializersExecution
  let some modStr ← IO.getEnv "SHERLOCK_MODULE"
    | throw (IO.userError "set SHERLOCK_MODULE (sherlock/towers.py does)")
  let mod := modStr.toName
  -- loadExts: the notation and delaborator extensions, so statements print as `x < 0`
  let env ← importModules #[{ module := mod }] {} (loadExts := true)
  let some idx := env.getModuleIdx? mod | throw (IO.userError s!"module {mod} not found")
  let ctx : Core.Context := { fileName := "towers", fileMap := default, maxHeartbeats := 0 }
  let mut out : Array Json := #[]
  for (n, i) in env.const2ModIdx.toList do
    if i != idx || hidden env n then continue
    let some ci := env.find? n | continue
    let kind := kindOf ci
    if kind == "other" then continue
    let (stmt, _) ← ((do return toString (← ppExpr ci.type)) : MetaM String).toIO ctx { env := env }
    let (axs, _) ← (collectAxioms n : CoreM _).toIO ctx { env := env }
    let line ← match (← (findDeclarationRanges? n : CoreM _).toIO ctx { env := env }).1 with
      | some r => pure (toJson r.range.pos.line)
      | none => pure Json.null
    out := out.push (Json.mkObj [("name", toString n), ("kind", kind), ("statement", shorten stmt),
      ("line", line), ("axioms", toJson (axs.toList.map toString))])
  IO.FS.createDirAll "bld/sherlock/towers"
  IO.FS.writeFile s!"bld/sherlock/towers/{modStr}.json" (Json.pretty (Json.arr out))
  IO.println s!"towers {modStr}: {out.size} declarations"
