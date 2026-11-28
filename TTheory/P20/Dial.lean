/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P20
import EffectSpec

/-!
# P20 · the scale dial

P20's table of the twenty-scale dial against the dial in Lean (`ScaleUniverse.ScaleStep`, numbered
by `EffectSpec.stepIndex`). Apart from `TTheory.P20` for the reason `TTheory.P19.Dial` is: the
dial's module imports Physlib, whose `SpaceTime` clashes with OSforGFF's.
-/

namespace TTheory.P20

open TTheory SomaField.Effect

def cDial : Claim where
  id := "P20.dial"
  text := "The 20-step scale hierarchy: 0 Planck, 2 Nuclear, 5 Cellular, 7 Brain (CEMI), 8 \
    Organism, 9 Swarm, 11 Geological, 12 Planetary, 15 Galactic, 19 Cosmological (observable \
    universe)."
  statement := stepIndex .PlanckFoam = 0 ∧ stepIndex .NuclearQuark = 2 ∧
    stepIndex .CellularSynapse = 5 ∧ stepIndex .BrainCEMI = 7 ∧ stepIndex .OrganismBody = 8 ∧
    stepIndex .SwarmCrowd = 9 ∧ stepIndex .GeologicalSeismic = 11 ∧
    stepIndex .PlanetaryMantle = 12 ∧ stepIndex .GalacticDisc = 15 ∧
    stepIndex .ObservableUniverse = 19

instance : Witness cDial := .of (by show _ ∧ _; decide)

#status [cDial]

end TTheory.P20
