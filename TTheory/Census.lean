/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory

/-!
# The census

Every chapter's claims in one `#status`, the model's state in one line at the end: how many are
kernel-verified, derived under assumptions, frontier, open, refuted and inconsistent. Run with
`lake env lean TTheory/Census.lean`. The two dial claims (`TTheory.P19.Dial`, `TTheory.P20.Dial`)
are not here: their module imports Physlib, which cannot share an environment with OSforGFF.
-/

namespace TTheory.Census

open TTheory

/-- All the chapters' claims, in the order of the papers. -/
def all : List Claim :=
  P1.claims ++ P2.claims ++ P3.claims ++ P4.claims ++ P5.claims ++ P6.claims ++ P7.claims ++
    P8.claims ++ P9.claims ++ P10.claims ++ P11.claims ++ P12.claims ++ P13.claims ++ P14.claims ++
    P15.claims ++ P16.claims ++ P17.claims ++ P18.claims ++ P19.claims ++ P20.claims ++
    P21.claims ++ P22.claims ++ P23.claims ++ P24.claims ++ P25.claims ++ SH1.claims ++ P26.claims

#status all

end TTheory.Census
