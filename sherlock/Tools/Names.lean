import Affidavits

/-!
# Every theorem the claims registry cites exists

Reads `bld/sherlock/names.json` (written by `sherlock/registry.py check`) and
fails if a name is missing from the compiled affidavits. Python extracts,
Lean decides (Sherlock epic, D5).
-/

open Lean in
#eval show CoreM Unit from do
  let text ← IO.FS.readFile "../bld/sherlock/names.json"
  let json ← IO.ofExcept (Json.parse text)
  let items ← IO.ofExcept json.getArr?
  let env ← getEnv
  let mut missing := #[]
  for item in items do
    let name ← IO.ofExcept (item.getObjValAs? String "name")
    unless env.contains name.toName do
      missing := missing.push name
  unless missing.isEmpty do
    throwError "registry cites theorems that do not exist: {missing}"
  IO.println s!"registry: all {items.size} cited theorems exist"
