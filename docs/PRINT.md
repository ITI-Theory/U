# Print and brand decisions

This is the maintained pointer for print and brand operations. The old detailed
specification in `paper/archive/PRINT-SPEC.md` is provenance only: it records a
June 2026 lock, including the tetralogy concept, the `[T]` mark, microdot, and
wave/dot/unified roles, but it also contains stale operational destinations and
costs.

## Current authorities

- Paper DOI, status, and publication metadata: `Dist/PAPERS.yaml`.
- Release and upload runbook: `Dist/README.md` and `PROCESS.md`.
- Print/UAT gates: `paper/UAT.md` and `bin/release-check`.
- Sticker and QR assets: `lib/images/sticker/README.md`.
- Build graph: `make help`; all repeatable actions stay in Makefiles.

## Decisions retained from the archive

- The public mark is `[T]`; the microdot remains part of the mark's design
  language where the maintained artwork supports it.
- The cultural label is Field Realism; use it as a labelled artistic/design
  frame, not as evidence for a scientific result.
- Physical books remain personal/release artefacts unless a maintained release
  document says otherwise: no retail edition, no ISBN, and no bookshop workflow.
- The wave/dot/unified roles may guide covers and colophons, but current page
  counts, volumes, QR targets, and upload order must come from the current UAT
  and Dist runbooks, not the archive.
- QR codes for public material point at the maintained custom-domain landing
  page through the current sticker assets; do not revive the archived GitHub-org
  QR target without a new decision.

## How to update this page

When a print or brand decision changes, update this page and the owning source
asset or runbook in the same change. Leave `paper/archive/` as history: add a
status note there if a historical file's authority changes, but do not turn the
archive back into an operational checklist.
