import UniversalSomaticField
import LimbicTunnel
import SwarmPropagator

/-!
# ZSF, part 3: the axiom ledger against the Lean it cites

Source: P11 frozen at `3c97a44` (see `Affidavits/ZSF/Numbers.lean`). §10
(lines 1032-1037) lists four "axioms": `universe_is_11D_organism`,
`cosmological_correspondence`, `classical_trapped`, `quant_exp_1`; line 774
calls `universe_is_11D_organism` an axiom; line 1110 says "the five axioms
in §10". This file asks the Lean environment of the programme's own proofs
(the root package, with Mathlib) what each declaration is. It runs in the
root package (`make -C sherlock ledger`), not in the OpenCyc one.

Findings: of the four, only `quant_exp_1` is an axiom; `universe_is_11D_organism`
is a definition; the other two are theorems; and the three files hold three
axioms the table does not list. Each `#guard` fails the build if the Lean
changes, so the ledger finding is re-checked on every run.
-/

open Lean in
/-- What kind of declaration a name is in the current environment. -/
def declKind (n : Name) : CoreM String := do
  match (← getEnv).find? n with
  | some (.axiomInfo _) => return "axiom"
  | some (.thmInfo _) => return "theorem"
  | some (.defnInfo _) => return "def"
  | some _ => return "other"
  | none => return "missing"

-- The §10 table's four "axioms": one axiom, one definition, two theorems.
#eval show Lean.CoreM Unit from do
  let got ← [``SomaField.Universal.universe_is_11D_organism,
    ``SomaField.Universal.cosmological_correspondence,
    ``SomaField.LimbicTunnel.classical_trapped,
    ``SomaField.LimbicTunnel.quant_exp_1].mapM declKind
  unless got == ["def", "theorem", "theorem", "axiom"] do
    throwError "ledger changed: {got}"
  IO.println s!"§10 table, as Lean has them: {got}"

-- Axioms in the cited files that the §10 table leaves out.
#eval show Lean.CoreM Unit from do
  let got ← [``SomaField.Universal.sft_iso_modal_hott,
    ``SomaField.Universal.sft_grounds_hoffman,
    ``SomaField.SwarmPropagator.greens_achieves_minimum_energy].mapM declKind
  unless got == ["axiom", "axiom", "axiom"] do
    throwError "ledger changed: {got}"
  IO.println s!"axioms not in the §10 table: {got}"