/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.P2
import TTheory.P17

/-!
# P18 · The Pre-Verbal Manifold

[T]-Theory's eighteenth paper, as Lean. Source:
`paper/soma/preverbal-manifold/preverbal-manifold.md`; its id, title and DOI are in `Dist/PAPERS.yaml` (P18).

P18 is a single case (N = 1) read through the Soma-Field. The case history is the paper's and is
not modelled here; what is modelled is its formal reading and what it predicts. Its one formal
distinction, between collapse ("a basin from which the present coupling cannot return without
external scaffolding") and return, is carried by the programme's Lean: without input a run
started below the barrier never crosses it (P2), and a drive past the fold removes the valley it
sits in (P17). The reading of the case and its ten cohort predictions are open: they are what a
study would test.
-/

namespace TTheory.P18

open TTheory

/-! ## (C3) Collapse and return -/

def cCollapse : Claim where
  id := "P18.collapse"
  text := "(C3) Collapse is a transition to a basin from which the present coupling cannot return \
    without external scaffolding: no crossing without input (P2), and a drive past the fold \
    removes the valley (P17)."
  statement := P2.cNoiseless.statement ∧ P17.cFold.statement

instance [h : Witness P2.cNoiseless] [g : Witness P17.cFold] : Witness cCollapse :=
  .of ⟨h.proof, g.proof⟩

/-! ## The reading and the predictions -/

/-- That ASD, ADHD, complex PTSD, disorganised attachment and the spiky profile are correlated
    projections of one coupling `K` configured in a sensitive period. -/
opaque oneManifold : Prop

def cReading : Claim where
  id := "P18.reading"
  text := "(C1)-(C2) The standard diagnostic categories are possibly correlated projections of one \
    reconfigured manifold, set during sensitive periods, preserving their clinical distinctness."
  statement := oneManifold

/-- The ten cohort predictions of section 9, each a study's result. -/
opaque prediction : Fin 10 → Prop

/-- Section 9's predictions, by number, as the paper words them (shortened). -/
def predictionText : List String :=
  ["Cohort: adults with a documented pre-verbal severe physical illness and later speech delay \
    show elevated adult autism prevalence.",
   "Comorbidity: in that cohort the ASD-ADHD-cPTSD triple-comorbidity rate is elevated.",
   "Attachment marker: elevated disorganised-attachment classifications.",
   "Pain reactivity: altered pain-pressure thresholds and interoceptive accuracy.",
   "Maternal-side modulation: maternal affective-instability history predicts cPTSD-DSO severity \
    more strongly than ASD severity.",
   "Day-pupil amplification: single-sex day-pupil attendance predicts dissociative traits more \
    strongly than full boarding.",
   "Reorganisation pattern: after a near-fatal crisis, formal-theory or formal-craft \
    reorganisation exceeds the general post-crisis rate.",
   "Inflammation correlate: residual inflammation and autonomic baselines differ from controls.",
   "Genetic moderation: ASD polygenic scores moderate but do not account for phenotype severity.",
   "Diagnostic age: age at first ASD diagnosis is higher than for autistic adults of equal \
    severity."]

/-- One claim per prediction. -/
def cPrediction (i : Fin 10) : Claim where
  id := s!"P18.prediction-{i.val + 1}"
  text := predictionText.getD i.val ""
  statement := prediction i

/-- P18's claims, in the paper's order. -/
def claims : List Claim :=
  [cReading, cCollapse] ++ (List.finRange 10).map cPrediction

#status claims

end TTheory.P18
