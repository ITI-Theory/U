# Development Handover

## Current Candidate

- Papers UAT candidate: merged C1v2 omnibus, `423` pages.
- Registry title: *The Soma-Field: Collected Works — Second Edition*.
- Candidate staging is hash-manifested under `uat/staging/papers/`.

## Completed This Sprint

- Restored the merged omnibus after the rejected PDF-concatenation experiment.
- Moved C1v2 identity, member order, and part openings into `PAPERS.yaml`.
- Removed artificial blank pages between ordinary body sections.
- Set shared individual-paper typography to 11pt and enforced the physical opening sequence.
- Replaced placeholder P11 figures with rendered figures.
- Added stale-label, reference-content, figure, and physical-format checks.
- Raised release-scope reference policy to five rendered reference entries; D2 is explicitly exempt.

## Open Before Release

- Run NotebookLM UAT on the refreshed staged Papers package.
- Record findings in `papers-omnibus-nlm-uat.md` and the acceptance decision.
- Commit validated U/Dist changes together only after acceptance.
- Promote accepted artifacts to Dist; do not copy candidate outputs before UAT acceptance.

## Sprint Retrospective

The work became too iterative when collection architecture and print formatting changed simultaneously. The failed facsimile path also bypassed registry ownership and created a large release regression.

Preferred next-stage practice:

1. Confirm registry ownership and output identity before changing a release builder.
2. Make one reversible source/test change at a time.
3. Run a focused check immediately after each change.
4. Keep UAT staging stale until all candidate gates pass.
5. Treat registry changes as release-contract changes, not incidental metadata.
