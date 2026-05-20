# U — The Soma-Field Papers

A formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in M-theory compactification and type-checked in Lean 4.

**bioRxiv preprint**: BIORXIV/2026/725970 (May 18, 2026)
**Author**: Alistair Johnson, Independent Researcher, Zurich, Switzerland
**ORCID**: 0009-0007-2194-0850

## Contents

- `paper/` — Source and PDFs for all four documents (main paper, patient POV, book, field notes)
- `src/` — Lean 4 formal verification (`Hopfield.lean`, `SomaField.lean`)
- `facilities/` — Workspace notes

## Building

```bash
cd paper && make all
```

Requires: pandoc, xelatex, pandoc-citeproc.

## Paper Status

Generate a live status dashboard of all paper source/PDF pairs:

```bash
./.venv/Scripts/python.exe scripts/paper_status.py
```

Outputs:

- `paper/PAPER_STATUS.md`
- `paper/paper_status.json`

## Freeze Package (Portable)

Build a transfer-ready ZIP containing papers, PDFs, bibliography, and integrity manifest:

```bash
./.venv/Scripts/python.exe scripts/package_papers.py --version v1.0.1
```

Output:

- `dist/U-papers-freeze-v1.0.1-YYYYMMDD.zip`

## Submission Bundles (Frontiers + arXiv)

Build venue-specific submission ZIPs in one command:

```bash
./.venv/Scripts/python.exe scripts/package_submissions.py --version v1.0.1
```

Outputs:

- `dist/U-submission-frontiers-v1.0.1-YYYYMMDD.zip`
- `dist/U-submission-arxiv-v1.0.1-YYYYMMDD.zip`

Also included in repo:

- `paper/SUBMISSION_FRONTIERS_CHECKLIST.md`
- `paper/SUBMISSION_ARXIV_CHECKLIST.md`

## One Big ZIP (Everything)

Build a single master archive containing source + all generated release ZIPs:

```bash
./.venv/Scripts/python.exe scripts/package_everything.py --version v1.0.0
```

Output:

- `dist/U-everything-v1.0.0-YYYYMMDD.zip`

Build-system target (from `paper/`):

```bash
make everything-bundle
```

## Process Procedures

Repository process and git hygiene requirements are documented in:

- `PROCESS_PROCEDURES.md`

