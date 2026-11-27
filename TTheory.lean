import TTheory.Core
import TTheory.P1

/-!
# [T]-Theory

The model of [T]-Theory in Lean. Open this file and read on: each chapter is one of the papers (and later
the books), read top to bottom like the paper itself, its equations and claims as Lean.

A chapter ends with its claims and `#status`, which computes each claim's state from its witness
(`TTheory.Core`): kernel-verified, derived under assumptions (the axioms named), frontier (`sorry`) or
open (no witness). Witnesses are instances and chain: a claim derived from another stands or falls with
it, so a new proof or a changed import moves the states on the next build. Nothing is set by hand.

The papers' ids, titles and DOIs are in `Dist/PAPERS.yaml`; the plan and its state, ISSUES.md, ISS-141.

* `TTheory.P1`: The Soma-Field, a wave-based model of emotional dynamics.
-/
