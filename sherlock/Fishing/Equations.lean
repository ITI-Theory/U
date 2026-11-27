import Mathlib
import Method
import EquationsData
import Latex
import Fishing.Gravity
import Fishing.KleinGordon
import Fishing.KaluzaKlein
import Fishing.Kramers
import Fishing.WKB
import Fishing.Cosmology
import Fishing.Networks
import Fishing.Seismic
import Fishing.Scales
import UniversalSomaticField

/-!
# The programme's equations against the Lean, first pass: the master equation (USC; ISS-128)

`EquationsData` lists every display equation of the papers and books (lib/format/equations-writer.lua) and
the registry's levels (what the app shows), each with its class if it is a form of the master equation
(sherlock/equations.py). Each class has its witness here, by name, so a missing theorem does not compile.

The census (27 Nov) shows no document with the static screened form; the Helmholtz form is in 17 files, the
Klein-Gordon form in 4. Three documents write both with one k: the cheatsheet, P10 (temporal dynamics) and the
philosophy book. Under the provisional reading of ISS-126 (KK-1's `two_signs`) that is consistent only if the
Helmholtz k is the frequency ω/v of a time-harmonic field, and the Klein-Gordon k the mass; the documents
use one letter for both.
-/

namespace Fishing.Equations

open EquationsData

/-- Each class and the Lean that witnesses it. -/
def witnesses : List (String × List Lean.Name) :=
  [("helmholtz", [``SomaField.Universal.greens_fn_is_SHO, ``Fishing.Gravity.wave_solves]),
   ("klein-gordon", [``Fishing.KleinGordon.dispersion, ``Fishing.KaluzaKlein.kk_reduction]),
   ("screened", [``Fishing.Gravity.yukawa_solves]),
   -- The catches, wherever an equation repeats them: the witness is the theorem that shows the problem.
   ("kramers-no-friction", [``Fishing.Kramers.narrower_faster]),
   ("wkb-no-mass", [``Fishing.WKB.cheatsheet_drops_mass]),
   ("omega-7-11", [``Fishing.Cosmology.published_misses]),
   ("sq-lambda1", [``Fishing.Networks.lowest_is_zero]),
   ("gr-power-law", [``Fishing.Seismic.not_power_law]),
   ("scale-10-26", [``Fishing.Scales.top_scale]),
   ("memory-decay", [``Fishing.KleinGordon.kernel_not_mode])]

def ofClass (c : String) : List (String × Nat × Bool × String × String) := all.filter (·.2.2.2.2 == c)

def files (c : String) : List String := ((ofClass c).map fun e => (e.1.splitOn "#").head!).eraseDups

-- Every class found has a witness.
#guard ((all.map (·.2.2.2.2)).filter (· != "")).all fun c => (witnesses.lookup c).isSome
#eval s!"{all.length} equations ({(all.filter (·.2.2.1)).length} display) in {((all.map fun e => (e.1.splitOn "#").head!).eraseDups).length} sources"
#eval witnesses.map fun (c, _) => (c, (ofClass c).length, (files c).length)
-- The documents that use the master equation with both signs of k² and one letter: the ISS-126 places.
#eval (files "helmholtz").filter (files "klein-gordon").contains

-- The witnesses rendered back to LaTeX (read by `sherlock/equations.py report`).
#latex Fishing.Gravity.wave_solves
#latex Fishing.Gravity.yukawa_solves
#latex Fishing.KleinGordon.dispersion
#latex Fishing.KaluzaKlein.kk_reduction
#latex Fishing.KaluzaKlein.two_signs
#latex Fishing.Kramers.narrower_faster
#latex Fishing.WKB.cheatsheet_drops_mass
#latex Fishing.Cosmology.published_misses
#latex Fishing.Networks.lowest_is_zero
#latex Fishing.Seismic.not_power_law
#latex Fishing.Scales.top_scale
#latex Fishing.KleinGordon.kernel_not_mode

end Fishing.Equations
