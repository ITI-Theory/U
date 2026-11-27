/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import Benchmark
import BFSSIsomorphism
import BRECVEMAField
import BRECVEMAVariational
import CosmologicalConstant
import DyadicField
import EffectSpec
import EmotionCyc
import EmotionOntology
import FieldEvent
import FieldProofs
import G2Compactification
import Hopfield
import HopfieldAsync
import LimbicHopfield
import LimbicTunnel
import LocalGeometry
import LocalGR
import Movie
import MTheoryIsomorphism
import QuantumSim
import RenormalisationGroup
import ScaleUniverse
import SomaField
import SomaNetwork
import SomaPhilosophy
import SwarmPropagator
import TemporalDynamics
import UniversalSomaticField
-- import USF_OSAxioms  -- cannot load beside physlib: OSforGFF and physlib both define `SpaceTime`

/-!
# Experiment (ISS-141): every paper's Lean in one environment, "and see what happens"

The author, 27 Nov: "to be able to just import all the Px models ... and see what happens". If this
file compiles, the thirty modules sit together (no clashing names). `#census` then reads the
combined environment: per module, its theorems, definitions and axioms, the axioms named: the
programme's assumptions, all in one place.

First finding (27 Nov): they do not all sit together. `USF_OSAxioms` imports OSforGFF, and three
others (MTheoryIsomorphism, RenormalisationGroup, ScaleUniverse) import physlib; both libraries
define a top-level `SpaceTime`, so Lean refuses to load the two. `USF_OSAxioms` is left out below
until that is resolved. -/

open Lean Elab Command in
elab "#census" : command => do
  let env ← getEnv
  let mods : List Name := [`Benchmark, `BFSSIsomorphism, `BRECVEMAField, `BRECVEMAVariational,
    `CosmologicalConstant, `DyadicField, `EffectSpec, `EmotionCyc, `EmotionOntology, `FieldEvent,
    `FieldProofs, `G2Compactification, `Hopfield, `HopfieldAsync, `LimbicHopfield, `LimbicTunnel,
    `LocalGeometry, `LocalGR, `Movie, `MTheoryIsomorphism, `QuantumSim, `RenormalisationGroup,
    `ScaleUniverse, `SomaField, `SomaNetwork, `SomaPhilosophy, `SwarmPropagator, `TemporalDynamics,
    `UniversalSomaticField, `USF_OSAxioms]
  let mut lines : Array String := #[]
  let mut totals := (0, 0, 0)
  for m in mods do
    let some idx := env.getModuleIdx? m | lines := lines.push s!"{m}: not loaded"; continue
    let mut thms := 0
    let mut defs := 0
    let mut axs : Array Name := #[]
    for (n, ci) in env.constants.toList do
      if env.getModuleIdxFor? n != some idx then continue
      if n.isInternal then continue
      match ci with
      | .thmInfo _ => thms := thms + 1
      | .defnInfo _ => defs := defs + 1
      | .axiomInfo _ => axs := axs.push n
      | _ => pure ()
    totals := (totals.1 + thms, totals.2.1 + defs, totals.2.2 + axs.size)
    let axText := if axs.isEmpty then "" else s!"\n    axioms: {axs.toList}"
    lines := lines.push s!"{m}: {thms} theorems, {defs} definitions, {axs.size} axioms{axText}"
  logInfo (String.intercalate "\n" lines.toList ++
    s!"\nall together: {totals.1} theorems, {totals.2.1} definitions, {totals.2.2} axioms")

#census
