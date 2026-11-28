/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2
import TTheory.P3

/-!
# P4 · The Soma-Field Research Programme: Method, Model, and Computational Test

*A Synthesis of Six Papers on Emotional Field Dynamics*

[T]-Theory's fourth paper, as Lean. Source:
`paper/soma/soma-field-synthesis/soma-field-synthesis.md`; its id, title and DOI are in
`Dist/PAPERS.yaml` (P4).

P4 says the papers are one argument in three movements: a method (P3), a model (P1), a computational
test (P2). So most of its claims are the other papers' claims, and here they are exactly that: each
is witnessed by the other chapter's witness, and stands or falls with it. Where P4 restates a number
of another paper, the statement is about that paper's own value, and the kernel compares them: two
of P4's numbers disagree with P2, the experiment's own paper.
-/

namespace TTheory.P4

open TTheory

/-! ## The three movements, witnessed by the chapters they name -/

def cMethod : Claim where
  id := "P4.method"
  text := "The first movement establishes a method: mathematical co-identification, importing only \
    those theorems whose hypotheses are preserved."
  statement := P3.rowEng.structural.statement

instance [h : Witness P3.rowEng.structural] : Witness cMethod := .of h.proof

def cModel : Claim where
  id := "P4.model"
  text := "The second movement produces a model, the Soma-Field: selected governing equations \
    share the same mathematical form."
  statement := P1.cOneFunction.statement

instance [h : Witness P1.cOneFunction] : Witness cModel := .of h.proof

def cTest : Claim where
  id := "P4.test"
  text := "QUANT-EXP-1: transverse-field annealing reaches registered barrier configurations that \
    the tested low-noise classical dynamics does not reach."
  statement := P2.cShift.statement ∧ P2.cColdRun.statement

instance [h : Witness P2.cShift] [g : Witness P2.cColdRun] : Witness cTest := .of ⟨h.proof, g.proof⟩

def cHardening : Claim where
  id := "P4.hardening"
  text := "The experiment passed all pre-registered hardening checks."
  statement := P2.cControls.statement

instance [h : Witness P2.cControls] : Witness cHardening := .of h.proof

def cTopology : Claim where
  id := "P4.prediction-2"
  text := "Complex PTSD is modelled as a topological configuration: a winding-number-protected \
    landscape the low-noise classical baseline did not cross."
  statement := P2.cTopology.statement ∧ P2.cColdRun.statement

instance [h : Witness P2.cTopology] [g : Witness P2.cColdRun] : Witness cTopology :=
  .of ⟨h.proof, g.proof⟩

/-! ## P4's numbers against P2's

"Classical baseline: overdamped Langevin dynamics at low temperature (`T_eff = 0.01`)": P2's cold
baseline is `T = 0.02`. And P4's results table gives the quantum peak at `W = -6, -8, -10, -12, -14`
as 0.389, 0.408, 0.408, 0.409, 0.416; P2's noise-equivalence table gives 0.416, 0.416, 0.408, 0.398,
0.390: the ends are swapped. -/

/-- P4's results table: the quantum peak by barrier strength, in thousandths. -/
def p4Peak : ℕ → ℕ
  | 6 => 389 | 8 => 408 | 10 => 408 | 12 => 409 | 14 => 416 | _ => 0

def cBaseline : Claim where
  id := "P4.baseline"
  text := "Classical baseline: overdamped Langevin dynamics at low temperature (T_eff = 0.01)."
  statement := P2.tCold = 0.01

/-- Refuted by P2: its cold baseline is 0.02. -/
instance : Refutation cBaseline := .of (by show ¬ P2.tCold = 0.01; norm_num [P2.tCold])

def cPeaks : Claim where
  id := "P4.peaks"
  text := "Quantum peak occupancy is stable at 0.389-0.416 across the full range (W = -6 to -14), \
    as P2 reports it."
  statement := ∀ b ∈ [6, 8, 10, 12, 14], p4Peak b = P2.sweepPeak b

/-- Refuted by P2's sweep: 0.389 against 0.416 at W = -6, 0.416 against 0.390 at W = -14 (and the
    middle values match neither of P2's tables throughout). -/
instance : Refutation cPeaks :=
  .of (by show ¬ ∀ b ∈ [6, 8, 10, 12, 14], p4Peak b = P2.sweepPeak b; decide)

/-- P4's claims, in the paper's order. -/
def claims : List Claim := [cMethod, cModel, cTopology, cTest, cBaseline, cPeaks, cHardening]

/-- P4's abstract, phrase by phrase. -/
def abstract : List (String × Claim) :=
  [("The first movement establishes a method: mathematical co-identification", cMethod),
   ("The second movement applies that method to produce a model: the Soma-Field", cModel),
   ("transverse-field annealing reaches registered barrier configurations that the tested \
      low-noise classical dynamics does not reach", cTest),
   ("passed all pre-registered hardening checks", cHardening)]

#status claims

#covers abstract claims

end TTheory.P4
