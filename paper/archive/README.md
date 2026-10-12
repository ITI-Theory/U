# Archive status

`paper/archive/` is retained for historical context only. It is not the current
publication, print, or release command surface. Current paper status lives in
`Dist/PAPERS.yaml`; release and promotion steps live in `Dist/README.md`,
`PROCESS.md`, `paper/UAT.md`, and the Make targets listed by `make help`.

| File | Classification | Status | Current authority |
|---|---|---|---|
| `INDEPENDENT_REPLICATION_LEDGER.md` | Durable reference | Historical schema for independent-run evidence; not the live ledger. | `docs/agent/THEORY-STATUS.md` and current UAT evidence. |
| `PAPERS_10_TRACKER.md` | Historical snapshot | May 2026 quality snapshot for three early papers. | `paper/UAT.md`, release checks, and `Dist/PAPERS.yaml`. |
| `PRINT-SPEC.md` | Historical snapshot | June 2026 print/brand lock; still useful as provenance, but QR and release routes have changed. | `docs/PRINT.md`, `lib/images/sticker/README.md`, `paper/UAT.md`, and `Dist/README.md`. |
| `PUBLICATION_ROADMAP.md` | Historical snapshot | May 2026 no-APC route proposal. | `Dist/PAPERS.yaml` and `Dist/README.md`. |
| `PUBLISH-NOW-FILESET.md` | Historical snapshot | May 2026 upload fileset. | `Dist/PAPERS.yaml` and `Dist/README.md`. |
| `SUBMISSION_ARXIV_CHECKLIST.md` | Historical snapshot | Portal checklist for a past candidate submission. | `Dist/README.md` and release-check outputs. |
| `SUBMISSION_FRONTIERS_CHECKLIST.md` | Historical snapshot | Optional APC-bearing route; not the default route. | `Dist/README.md` and author decision. |
| `SUBMISSION_NO_APC_CHECKLIST.md` | Historical snapshot | May 2026 no-APC checklist. | `Dist/README.md` and current UAT evidence. |

## Distilled decisions still carried forward

- Build and release actions remain Make-driven; scripts may validate and package,
  but the Makefiles are the build graph.
- Paper publication facts are not repeated here: use `Dist/PAPERS.yaml` for DOI,
  status, and release metadata.
- Current sticker and QR assets are maintained in `lib/images/sticker/`; the
  public QR destination is the custom-domain landing page documented there.
- Print review is a UAT/release step, not an archive action: use `paper/UAT.md`,
  `PROCESS.md`, and `Dist/README.md` for the current sequence.
- Durable brand provenance from `PRINT-SPEC.md`: the `[T]` mark, microdot idea,
  Field Realism language, and wave/dot/unified volume roles are historical design
  decisions to be re-used only through maintained source files, not by copying the
  stale archive checklist.
