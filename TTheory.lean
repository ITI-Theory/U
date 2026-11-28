/-
Copyright (c) 2026 Alistair Johnson. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE-APACHE.
Authors: Alistair Johnson
-/
import TTheory.Claims
import TTheory.P1
import TTheory.P2
import TTheory.P3
import TTheory.P4
import TTheory.P5

/-!
# [T]-Theory

The model of [T]-Theory in Lean. Open this file and read on.

**How it is built.** The mathematics and physics are Mathlib's and physlib's; common knowledge (what
a person, a language, a brain region is) is OpenCyc's, as Lean types; what is [T]-Theory's own is
written here, in chapters. The theory's languages (emotions, fields, the ladder of scales, the
eleven dimensions, designs of studies) are each written once and read by interpreters: their
meaning, with proofs; their text, the sentences of the papers and books; their OpenCyc typing; the
Soma Machine's data.

**How far each thing stands.** A chapter ends with its claims and `#status`, which computes each
claim's state from its witness (`TTheory.Claims`): kernel-verified; derived under assumptions (the
assumptions named); frontier (`sorry`); open (no witness); refuted (a proof that it is false).
Witnesses chain: a claim built on another stands or falls with it, so a new proof or a changed
import moves the states on the next build. Nothing is set by hand.

**The chapters.** One per paper, read like the paper; the papers' ids, titles and DOIs are in
`Dist/PAPERS.yaml`. The plan and its state: ISSUES.md, ISS-141.

* `TTheory.P1`: The Soma-Field, a wave-based model of emotional dynamics.
* `TTheory.P2`: Quantum topology and trauma, attractor reachability (QUANT-EXP-1).
* `TTheory.P3`: Mathematical co-identification, run on its own row COID-ENG-2 (`TTheory.Method`
  is the method itself: rows, the target check, the negative control).
* `TTheory.P4`: The research programme's synthesis: its claims chained to P1, P2 and P3, its
  numbers checked against P2's.
* `TTheory.P5`: The physical substrate: the bridges' logic checked, the predictions open until
  measured.
-/
