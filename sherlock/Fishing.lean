import Fishing.Gravity
import Fishing.KleinGordon
import Fishing.Cosmology
import Fishing.Scales
import Fishing.Expansion
import Fishing.KaluzaKlein
import Fishing.Kramers
import Fishing.Locking
import Fishing.Seismic
import Fishing.Games
import Fishing.Networks
import Fishing.WKB
import Fishing.Graviton
import Einstein1905

/-!
# The catch so far, and the bait for the next round (USC; ISS-126)

Every row of the method (`Method`, P3) from the backtests and the fishing. `bait` lists what each
row leaves open; the next round fishes there, and a witness found once closes the assumption in
every row that cites it.
-/

open Method

def rows : List Row :=
  [Backtest.Einstein1905.row, Fishing.Gravity.row, Fishing.KleinGordon.row,
   Fishing.Cosmology.published, Fishing.Cosmology.row, Fishing.Expansion.row,
   Fishing.KaluzaKlein.row, Fishing.Kramers.row, Fishing.Locking.row,
   Fishing.Seismic.row, Fishing.Games.row, Fishing.Networks.row,
   Fishing.WKB.row, Fishing.WKB.preverbal, Fishing.Graviton.row]

#guard rows.all (·.wellFormed)
#eval ledger rows
#eval bait rows

/-- The loop at work: one catch's theorem closes another's bait. If the extra dimensions are
    accepted (COID-KK-1, whose own bait still includes "the field propagates in D5-8"), the
    gravity row's first open assumption, the sign, has a Lean witness. A what-if, not the ledger:
    the author decides. -/
def gravityIfKK : Row :=
  Fishing.Gravity.row.witness
    "the master equation's k² term is a mass (decay), not a wavenumber (oscillation)"
    (.lean ``Fishing.KaluzaKlein.kk_reduction)

#guard gravityIfKK.wellFormed
#guard Fishing.Gravity.row.openAssumptions.length == 5 && gravityIfKK.openAssumptions.length == 4
