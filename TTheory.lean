import TTheory.Core
import TTheory.P1

/-!
# [T]-Theory

The model of [T]-Theory in Lean. Open this file and read on.

**How it is built.** The mathematics and physics are Mathlib's and physlib's; common knowledge (what a
person, a language, a brain region is) is OpenCyc's, as Lean types; what is [T]-Theory's own is written
here, in chapters. The theory's languages (emotions, fields, the ladder of scales, the eleven dimensions,
designs of studies) are each written once and read by interpreters: their meaning, with proofs; their text,
the sentences of the papers and books; their OpenCyc typing; the Soma Machine's data.

**How far each thing stands.** A chapter ends with its claims and `#status`, which computes each claim's
state from its witness (`TTheory.Core`): kernel-verified; derived under assumptions (the assumptions named);
frontier (`sorry`); open (no witness); refuted (a proof that it is false). Witnesses chain: a claim built on
another stands or falls with it, so a new proof or a changed import moves the states on the next build.
Nothing is set by hand.

**The chapters.** One per paper, read like the paper; the papers' ids, titles and DOIs are in
`Dist/PAPERS.yaml`. The plan and its state: ISSUES.md, ISS-141.

* `TTheory.P1`: The Soma-Field, a wave-based model of emotional dynamics.
-/
