# Independent Replication Run Ledger

Generated: 2026-05-20

This ledger is the canonical evidence log for promotion of claims from `S2`
(predictive) to `S3` (independently replicated) across the three target papers.

## Promotion Rule

A claim is promoted to `S3` only when at least one run entry below satisfies all:

1. `operator_id` is independent of the original run operator,
2. `package_version` and `package_sha256` identify a reproducible artifact bundle,
3. `outcome` is `PASS` against the claim's declared criterion,
4. `evidence_path` points to raw logs plus derived table/figure outputs.

## Claim Registry (Ledger Scope)

| Paper | Claim IDs tracked for S3 promotion |
|---|---|
| soma-field-paper.md | SF-2, SF-3, SF-4, SF-5 |
| mathematical-co-identification.md | COID-PROP-1, COID-ENG-2, COID-RG-5, COID-BS-HEAT-1 |
| music-affect-dynamics.md | H1, H2, H3 |

## Run Entry Schema

| Field | Description |
|---|---|
| run_id | Unique run identifier (`YYYYMMDD-<paper>-<n>`) |
| paper | Manuscript name |
| claim_id | Registered claim/hypothesis ID |
| operator_id | Independent replicator identifier |
| package_version | Bundle version used in the run |
| package_sha256 | SHA256 of the exact bundle |
| protocol_id | Protocol template or preregistration ID |
| outcome | `PASS`, `FAIL`, or `PARTIAL` |
| evidence_path | Path to raw logs and generated analysis artifacts |
| notes | Short rationale, deviations, or failure mode |

## Run Entries

| run_id | paper | claim_id | operator_id | package_version | package_sha256 | protocol_id | outcome | evidence_path | notes |
|---|---|---|---|---|---|---|---|---|---|
| PENDING-001 | soma-field-paper.md | SF-5 | TBD | U-everything-v1.0.7-20260520 | TBD | QUANT-EXP-1-repl-v1 | PENDING | TBD | Awaiting independent operator run |
| PENDING-002 | mathematical-co-identification.md | COID-BS-HEAT-1 | TBD | U-everything-v1.0.7-20260520 | TBD | COID-external-v1 | PENDING | TBD | Awaiting external derivation check |
| PENDING-003 | music-affect-dynamics.md | H1 | TBD | U-everything-v1.0.7-20260520 | TBD | MUSIC-AFFECT-prereg-v1 | PENDING | TBD | Awaiting multi-operator rerun |
