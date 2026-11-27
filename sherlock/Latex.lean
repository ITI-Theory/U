import Lean

/-!
# Lean back to LaTeX (USC; ISS-128)

The 23 Nov design (AI Mode, NextKB: "how do I prove that the equation that I've written is actually
correct"): render the Lean's statement back to LaTeX and set it beside the document's. `#latex name` prints a
declaration's type, pretty-printed by Lean and its notation mapped to LaTeX. A first step: it prints, it does
not yet compare; `sherlock/equations.py report` puts the two side by side.
-/

open Lean Elab Command Meta

namespace Latex

/-- Lean's notation to LaTeX, longest first. -/
def rules : List (String × String) :=
  [("Real.exp", "\\exp"), ("rexp", "\\exp"), ("Real.cos", "\\cos"), ("Real.sin", "\\sin"), ("Real.sqrt", "\\sqrt"),
   ("Real.log", "\\log"), ("Real.pi", "\\pi"), ("HasDerivAt", "\\operatorname{HasDerivAt}"), ("√", "\\sqrt "),
   ("π", "\\pi"), ("≠", "\\neq"), ("≤", "\\le"), ("≥", "\\ge"), ("↔", "\\iff"), ("→", "\\to"), ("∀", "\\forall "),
   ("∃", "\\exists "), ("∧", "\\land"), ("∨", "\\lor"), ("¬", "\\lnot "), (" * ", " \\, "), ("ℝ", "\\mathbb{R}"),
   ("ℕ", "\\mathbb{N}"), ("∈", "\\in"), ("ω", "\\omega"), ("β", "\\beta"), ("Δ", "\\Delta"), ("Φ", "\\Phi"),
   ("∫", "\\int"), ("|", "\\lvert ")]

def render (s : String) : String :=
  (rules.foldl (fun acc (a, b) => acc.replace a b) s).replace "\n" " "

/-- `#latex name`: the declaration's statement as LaTeX. -/
elab "#latex " id:ident : command => do
  let n ← liftCoreM <| realizeGlobalConstNoOverloadWithInfo id
  let info ← getConstInfo n
  let fmt ← liftTermElabM <| ppExpr info.type
  logInfo m!"LATEX {n} := {render (toString fmt)}"

end Latex
