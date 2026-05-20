# Papers 10/10 Tracker

Generated: 2026-05-20

## Portfolio Snapshot

| Paper | Current estimate | Main strength | Main remaining gap | Next action |
|---|---:|---|---|---|
| soma-field-paper | 9.3 | Claim registry + claim-evidence-result matrix + reviewer-risk mapping | Independent external replication still pending for S3 promotion | Run independent replication package and upgrade eligible claims |
| mathematical-co-identification | 9.4 | Worked external example + strict disconfirmation grammar + reviewer-risk mapping | Needs independent rejected/accepted claim ledger from external evaluator | Publish row-wise replication/failure ledger for registered imports |
| music-affect-dynamics | 9.4 | Measured pilot fill + reproducibility checklist + explicit acceptance rule | Still single-operator pilot at core evidence layer | Add multi-operator preregistered replication cohort |

## Definition of 10/10 (for this repo)

A paper is treated as 10/10 when all are true:

1. Claim-level falsifiability is explicit.
2. At least one quantitative results table is filled from actual runs.
3. Replication package requirements are listed and satisfiable.
4. Reviewer-risk objections are addressed in-manuscript or companion note.
5. Submission bundle is generated and internally consistent.

## Immediate sequence

1. Fill `paper/INDEPENDENT_REPLICATION_LEDGER.md` with first independent run entries.
2. Execute independent-operator replication pass for all three papers.
3. Promote eligible claims to `S3` only where ledger rows are `PASS`.
4. Rebuild PDFs and regenerate submission bundles.
