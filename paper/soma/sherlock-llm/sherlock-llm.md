---
title: "Can a Language Model Do Sherlock's Job?"
subtitle: "NotebookLM against Sherlock's registry, OpenCyc slice packs and paper-local arithmetic"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
status: draft
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  Sherlock's first paper argues for a neuro-symbolic division of labour: a
  language model proposes claims, a person confirms them, and Lean plus OpenCyc
  checks them. This companion asks whether a language model alone can do the
  back-end job. The stored NotebookLM runs in `bld/sherlock/nlm-exp0.json`,
  `nlm-exp1.json`, `nlm-exp2.json` and `nlm-test.json` asked five questions
  about The Tensor (P8) and the Zoomable Universal Somatic Field (P11), with
  different source packs. Against a simple rubric derived from Sherlock's
  affidavits, 15 of 20 condition-question cells are correct, 1 is partial,
  1 is wrong, and 3 contain no completed answer because the run hit
  rate-limit or network failures (after a second run on 13 Oct). Among
  completed answers the score is 15 of 17; as an end-to-end replacement for
  Sherlock it is 15 of 20. The arithmetic checks on the papers' own numbers
  succeed from the papers alone; the one typing question fails without
  OpenCyc in the sources. The scoring is
  provisional: one scorer, not blind to the condition. This is an empirical result about these saved runs and
  an interpretive scoring judgement, not a general result about language models.
---

# Question

SH1 presents Sherlock as a neuro-symbolic compiler for natural language: a
language model is useful at the front end, while Lean 4, templates, registries
and OpenCyc provide deterministic checks at the back end [@moura2021lean4;
@lenat1995cyc; @opencyc2012owl] `interpretive`. The question here is whether a
language model, given the same source material, can do the back-end job by
reading, deriving and judging the answers itself `open-hypothesis`.

The short answer from the saved runs is cautious. The model often recovered the
same answer when it answered at all `empirical-result`. It also failed to
complete 3 of 20 condition-question cells because of rate-limit or network
failures recorded in the JSON files `empirical-result`. It did not produce Lean
proofs, template checks, frozen-source hashes or reproducible type judgements
`empirical-result`. It therefore did not replace Sherlock's compiler role
`interpretive`.

# Protocol

The protocol is encoded in `sherlock/nlm_test.py` `empirical-result`. It asks
five fixed questions about two frozen documents: The Tensor (P8) and the
Zoomable Universal Somatic Field (P11) `empirical-result`. Questions 1--3 are
common-sense typing questions that correspond to Sherlock's OpenCyc findings
`derived-under-assumptions`. Questions 4--5 are internal arithmetic and
consistency controls that should not depend on OpenCyc `derived-under-assumptions`.

The experiments vary the uploaded sources `empirical-result`.

| Experiment | Condition | Source setting | Label |
|---|---|---|---|
| exp0 | papers only | P8 and P11 only | `empirical-result` |
| exp0 | papers + all of OpenCyc | P8, P11 and the full NextKB/OpenCyc source | `empirical-result` |
| exp1 | papers + Sherlock slice | P8, P11 and Sherlock's 32k-word slice pack | `empirical-result` |
| exp2 | papers + UniversalVocabularyMt | P8, P11 and one large OpenCyc microtheory source | `empirical-result` |

Each ask was meant to be a fresh conversation, so answers did not carry context
from previous conditions `empirical-result`. The stored data show that not every
planned ask completed `empirical-result`.

# Rubric

The rubric is deliberately small and tied to Sherlock's existing affidavits
`derived-under-assumptions`.

| Question | Sherlock answer used for scoring | Affidavit basis |
|---|---|---|
| Q1 | In P8, Fear, Awe, Grief, Curiosity and Shame are treated as emotions, while Safety and Pre-verbal are not; Language as an emotional mode yields the OpenCyc contradiction described in SH1. | `registry/affidavits/the-tensor.yaml`, A6 |
| Q2 | "All three are the same film" is coherent as three refinements or renderings of one score, but false if read as mutual identity of the films. | `registry/affidavits/the-tensor.yaml`, B1--B4 |
| Q3 | "A conscious percept is a pole in the propagator" is a category error if read as identity: perceiving is not a mathematical object; "corresponds to" is safer. | `registry/affidavits/zoomable-somatic-field.yaml`, D8 |
| Q4 | P8 says "Two operating modes" but lists three; Threshold 1 never fires because fear reaches 0.70 but not `>0.7`; Threshold 2 fails at `t=0.74` and holds earlier around 0.70--0.71. | `registry/affidavits/the-tensor.yaml`, A1, A3, A4 |
| Q5 | P11 alternates between twenty and twenty-one levels; Scale 4 to Scale 6 is eight orders of magnitude, not twenty-five; the scale dial is not monotone in length. | `registry/affidavits/zoomable-somatic-field.yaml`, D1--D3 |

A cell is scored **correct** when the saved answer states the relevant Sherlock
finding without reversing it `interpretive`. A cell is scored **partial** when it
states part of the finding and contradicts another part `interpretive`. A cell
is scored **wrong** when it reverses the finding's central claim or endorses the
paper's erroneous wording `interpretive`. A
cell is scored **no answer** when the JSON answer begins with the recorded error
message rather than a substantive answer `empirical-result`.

# Scores from the saved JSON

The following table was computed from the saved JSON files, then checked against
the rubric above `empirical-result` for the file contents and `interpretive` for
the scoring judgement.

| Source file | Condition | Correct | Partial | Wrong | No answer | Notes |
|---|---:|---:|---:|---:|---:|---|
| `nlm-exp0.json` | papers only | 4 | 0 | 1 | 0 | Q1 wrong (no contradiction, it says); Q2--Q5 correct (Q3--Q5 from the second run, 13 Oct). |
| `nlm-exp0.json` | papers + all of OpenCyc | 4 | 0 | 0 | 1 | Q1--Q3 and Q5 correct (Q3, Q5 from the second run); Q4 hit a network/streaming error twice. |
| `nlm-exp1.json` | papers + Sherlock slice | 3 | 1 | 0 | 1 | Q1 partial (Safety and Pre-verbal counted as emotions); Q2, Q3, Q5 correct; Q4 failed twice (network, then rate limit). |
| `nlm-exp2.json` | papers + UniversalVocabularyMt | 4 | 0 | 0 | 1 | Q1--Q4 correct; Q5 hit a rate-limit error twice. |
| **Total** | all stored condition-question cells | **15** | **1** | **1** | **3** | 15/20 end to end; 15/17 among completed answers. |

The scoring was revised on review (13 Oct): a first pass had counted every
completed cell as correct `interpretive`.

`nlm-test.json` is byte-for-byte the same run content as `nlm-exp0.json` in this
workspace snapshot, so it is treated as the exp0 baseline rather than as an
independent replicate `empirical-result`.

# Where the model was right

On Q1, every completed answer said that Language is not an emotion
`empirical-result`. The answers with OpenCyc material (exp0 with all of
OpenCyc, exp1, exp2) also stated the OpenCyc reason: Language is a different
kind of thing, and treating it as an emotional quantity is a contradiction
`empirical-result`. Only exp2 also said that Safety is not an emotion
`empirical-result`.

On Q2, every completed answer distinguished a coherent score/rendering reading
from a false literal identity reading `empirical-result`. This is close to
Sherlock's distinction between the score-generalisation reading and the mutual
same-film reading `derived-under-assumptions`.

On Q3, all four completed answers called the percept--pole identity a category
error and identified the pole as a mathematical object `empirical-result`. This
matches Sherlock's recommendation to say "corresponds to" rather than "is"
`derived-under-assumptions`.

On Q4, both completed answers (with the papers only, and with UniversalVocabularyMt) found all three internal checks: there are three
operating modes, Threshold 1 never strictly satisfies `F > 0.7`, and Threshold 2
fails at `t=0.74` but holds earlier near `t=0.70` `empirical-result`.

On Q5, all three completed answers found the twenty/twenty-one inconsistency, the
8-order rather than 25-order separation, and the non-monotone scale dial (Scale
14 after Scale 13) `empirical-result`. Q4 and Q5 are controls on the papers' own
numbers: with the papers alone the model did them as well as with OpenCyc
`empirical-result`.

# Where the model was wrong or could not say

Two completed answers to Q1 failed `empirical-result`. With the papers only
(exp0), the model said that calling Language an emotional mode "does not lead to
a logical contradiction", because The Tensor uses "emotional mode" as an
engineering umbrella term; that reverses Sherlock's finding, so the cell is
scored wrong `interpretive`. With Sherlock's slice (exp1), it found the Language
contradiction but called "six of the seven" axes genuine emotions, Safety and
Pre-verbal included; that is partial `interpretive`. Without OpenCyc in the
sources, the model took the paper's own framing; with it, the model found the
contradiction `interpretive`.

The unanswered cells are part of the result: exp0 Q4 with all of OpenCyc,
exp1 Q4 and exp2 Q5 did not complete in two runs `empirical-result`. A system that cannot reliably return an answer cannot serve
as a deterministic compiler back end `interpretive`.

The answers also did not provide frozen-source hashes, exact line anchoring in
the repository, Lean names, template-check objects or OpenCyc proof terms
`empirical-result`. They explain; they do not compile `interpretive`. Sherlock's
value in SH1 is precisely that the explanation is turned into a registry entry
and a reproducible check `interpretive`.

# Future work not yet run

Three cells are still missing after two runs: exp0 Q4 with all of OpenCyc,
exp1 Q4 and exp2 Q5 `empirical-result`. They should be completed before any
source-pack ranking is claimed `open-hypothesis`.

ISS-048's local-model comparison has not been run in the stored data
`empirical-result`. A fair SH2 result needs the same five questions asked of a
local model with the same source packs or an explicit statement of what context
it received `open-hypothesis`.

A stronger protocol would pre-register the rubric, blind the scorer to the
condition label, and repeat each condition enough times to estimate stability
`open-hypothesis`. It would also separate retrieval from reasoning: one measure
for whether the answer cites the right source sentence, and another for whether
it derives the right conclusion `open-hypothesis`.

The division of labour can also be tightened at the front end itself. Since
13 Oct 2026 a model's reading of a sentence, written as OpenCyc facts through
one of NextKB's FrameNet semantic translations, is checked by Sherlock: the
sense, the slots, the predicates and the argument types, with the type
verdicts as Lean theorems (SH1, "The front end, checked") `kernel-verified`. A
natural next experiment asks NotebookLM and a local model for readings in that
format and scores them by the validator rather than by a person: how many
validate, how many are refused, and why `open-hypothesis`.

# Conclusion

For these saved runs, NotebookLM did most of the visible reading work correctly
when it produced an answer, 15 of 17 `empirical-result`; with the papers alone it
accepted the paper's framing where Sherlock found a contradiction
`empirical-result`. It did not do Sherlock's job as a
compiler, because it did not guarantee completion, preserve a frozen source,
write a registry affidavit, run a template check, ask Lean, or type the claim
against OpenCyc `empirical-result`. The result supports SH1's division of labour:
language models are useful readers at the edges; the middle still needs symbolic,
reproducible checks `interpretive`.
