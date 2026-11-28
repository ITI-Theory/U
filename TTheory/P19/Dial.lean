/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P19
import EffectSpec

/-!
# P19 · the scale dial

P19's scale table against the dial it cites ("the 20-level scale dial from
`MTheoryIsomorphism.lean`"; the dial is `ScaleUniverse.ScaleStep`, numbered by
`EffectSpec.stepIndex`). Apart from `TTheory.P19` because `ScaleUniverse` imports Physlib, whose
`SpaceTime` clashes with OSforGFF's (P14, P15): the two cannot be loaded together, so `TTheory`
does not import this module.
-/

namespace TTheory.P19

open TTheory

def cDial : Claim where
  id := "P19.dial"
  text := "The 20-level scale dial maps 5 (biological): neural EMF (CEMI); 9: swarm; 10: city; \
    12-13: planetary, solar system."
  statement := SomaField.Effect.stepIndex .BrainCEMI = 5 ∧
    SomaField.Effect.stepIndex .SwarmCrowd = 9 ∧
    SomaField.Effect.stepIndex .CityInfrastructure = 10 ∧
    SomaField.Effect.stepIndex .PlanetaryMantle = 12 ∧ SomaField.Effect.stepIndex .SolarSystem = 13

/-- The dial has the brain and CEMI field at Scale 7; the rest agree. -/
instance : Refutation cDial := .of (by show ¬ (_ ∧ _); decide)

#status [cDial]

end TTheory.P19
