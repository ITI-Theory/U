# Papers Omnibus NotebookLM UAT

**Track:** Papers

**Candidate:** RC2 Papers staging set

**Purpose:** Accept or return the scientific-paper release before any Zenodo
new version or new-record action. This worksheet is a UAT source document:
upload it with the staged PDFs. The staged-folder README contains the single
NotebookLM instruction and the result-recording procedure.

## Required Sources

Upload this worksheet plus every PDF in `U/uat/staging/papers/`.
The adjacent `MANIFEST.md` records the source paths and SHA-256 hashes for the
exact candidate set.

## Evidence Rules

- Cite source PDF and page for every conclusion.
- State `PASS`, `FIX`, or `OPEN` for each item.
- Do not infer a claim from a differently numbered paper or from an unrelated
  source.
- Treat `PAPERS.yaml` and the Lean appendix as the current status authority;
  older embedded code sketches may be historical examples.
- A result with incorrect source attribution is `OPEN`, not `PASS`.

## Sherlock: Build Consistency

### S-1 Formal claim alignment

**Question:** List the formal claims in `omnibus-a4.pdf` that are supported by
the Lean appendix. Flag any mismatch between the stated claim and the theorem,
axiom, or explicit open problem.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `omnibus-a4.pdf`, pp. 10, 223-226;
`lean-proofs-appendix.pdf`, pp. 2-3. The 11D architecture, Hopfield energy,
and scale-invariance claims align with the named Lean material; cosmological
constant and consciousness-threshold items remain explicitly axiomatic/open.

### S-2 P11/P12 release-status alignment

**Question:** Using only `omnibus-a4.pdf`, `zoomable-somatic-field.pdf`, and
`experimental-validation.pdf`, list the status of P11 Problems 1-2 and P12
GAP-1. Flag any mismatch. Do not use D1 or P23 as evidence for this item.

**Status:** PASS - completed 2026-08-18

**Result - 2026-08-18:** PASS. Problems 1-2 are consistently marked closed;
P12 identifies GAP-1 as not established. No mismatch reported between the
omnibus and the individual papers (`zoomable-somatic-field.pdf`, pp. 40-41;
`experimental-validation.pdf`, p. 11).

### S-3 G2 scope boundary

**Question:** Using only `omnibus-a4.pdf`, `zoomable-somatic-field.pdf`, and
`g2-symmetry-breaking.pdf`, state exactly:

1. what Lean proves about the flat 7D product $X_7$;
2. what P24 proves about the $W_8 = \frac{6}{5}I_8 + \delta W$ decomposition;
3. what remains open about a compact $G_2$-holonomy metric.

Flag any remaining contradiction with page citations.

**Status:** PASS - retest completed 2026-08-18

**Change under test:** P24 and the omnibus now state that the 8-to-7 result is
an algebraic compatibility result. They do not claim a proved $G_2$-holonomy
metric for $X_7$.

**Result - 2026-08-18:** PASS. NotebookLM confirmed that `X7_is_7D_product`
establishes the flat 7D product, P24 establishes the traceless $W_8$
decomposition, and a compact $G_2$-holonomy metric remains open.

**Evidence - 2026-08-18:** `lean-proofs-appendix.pdf`, p. 67;
`g2-symmetry-breaking.pdf`, pp. 1, 7; `zoomable-somatic-field.pdf`, p. 41.

### S-4 Claim-status ledger

**Question:** Using the Lean appendix and P11, classify the following as
proved, partial, open, or interpretive: Hopfield baseline, 11D architecture,
G2 compact geometry, consciousness threshold, cosmological constant, dark
matter, and the universe-as-organism interpretation.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `lean-proofs-appendix.pdf`, pp. 2-3, 91;
`cosmological-constant-derivation.pdf`, pp. 4, 6-7;
`dark-matter-spatial-vacuum.pdf`, pp. 12-13. Hopfield baseline and 11D
architecture are proved; compact $G_2$ geometry is open; consciousness,
cosmological, dark-matter, and universe-as-organism claims retain their
axiomatic, extrapolative, or interpretive limits.

## Harry Potter: Scope and Completeness

### H-1 Established versus open

**Question:** What does the Papers collection establish, and what does it
explicitly leave open? Separate Lean formal claims, empirical results,
cosmological extrapolations, and interpretive claims.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `lean-proofs-appendix.pdf`, pp. 2-3;
`dark-matter-spatial-vacuum.pdf`, pp. 10, 14;
`cosmological-constant-derivation.pdf`, p. 7. The collection separates Lean
results, QUANT-EXP-1 computational evidence, cosmological extrapolations, and
open Kaluza-Klein/baryogenesis/$G_2$-metric work.

### H-2 Cosmology limitations

**Question:** Are cosmological constant, dark matter, and G2 symmetry breaking
presented with consistent limitations? Cite every limitation.

**Status:** PASS - first pass

**Follow-up:** Recheck after S-3, because the G2 scope wording changed.

**Result - 2026-08-18:** PASS. `cosmological-constant-derivation.pdf`,
pp. 1, 6; `dark-matter-spatial-vacuum.pdf`, pp. 1, 4; and
`g2-symmetry-breaking.pdf`, pp. 1, 7 consistently describe the 7% and 2.9%
leading-order discrepancies and the open metric derivation.

### H-3 D1 boundary

**Question:** Does `SFT-DEMO-CASE.pdf` remain explicitly distinct from general
scientific claims? Identify its stated limits on generalisation.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `SFT-DEMO-CASE.pdf`, pp. 1, 6 identifies the
document as a self-case demonstration of explanatory precision, not a clinical
trial or population-level claim.

## Cookie Monster: Comprehensibility

### C-1 Central claim

**Question:** In plain language, what is the central claim of the collected
works? Cite the omnibus pages used.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `omnibus-a4.pdf`, pp. 10, 224;
`zoomable-somatic-field.pdf`, p. 1.

### C-2 Falsification

**Question:** What observations would falsify or seriously challenge the
framework? Separate explicit falsification criteria from open research goals.

**Status:** PASS - first pass

**Evidence - 2026-08-18:** `cosmological-constant-derivation.pdf`, p. 9;
`dark-matter-spatial-vacuum.pdf`, p. 13;
`zoomable-somatic-field.pdf`, p. 39.

### C-3 Non-specialist friction

**Question:** Which terms or sections would confuse an educated non-specialist?
For each, identify whether the omnibus already defines it and suggest a concise
reader bridge without changing the scientific claim.

**Status:** OPEN - next Papers iteration

**First finding:** Osterwalder-Schrader axioms, Wick rotation, Arnold tongue,
and D1-orbifold need more accessible bridges. This is not a blocker for the
current Zenodo scope.

**Evidence - 2026-08-18:** reviewer finding from the Papers RC2 NotebookLM
UAT. This is a qualitative usability result, not a paginated source citation.

**Reader-bridge candidates:** Arnold tongue = synchrony window; OS axioms =
mathematical stress-test; Wick rotation = valley's echo; D1-orbifold = axis
of regulation. These are proposed explanatory bridges, not scientific claims.

## Acceptance Decision

Complete this only after every `PENDING` item has source
citations.

| Decision | Date | Reviewer | Notes |
|---|---|---|---|
| Papers track accepted with deferred C-3 reader bridges | 2026-08-18 | NotebookLM UAT | Sherlock and Harry Potter pass; C-3 remains a non-blocking next-iteration enhancement. |

## Next Action

- If all Sherlock and Harry Potter items pass: accept the Papers candidate,
  then decide Zenodo actions in `Dist/ISSUES.md`.
- If only Cookie Monster C-3 remains open: defer it to the next Papers
  iteration; do not broaden the current release.
- If any scientific consistency item is `FIX`: make a narrow source edit,
  rebuild affected PDFs, refresh `U/uat/staging/papers/`, and repeat only the
  affected worksheet item.
