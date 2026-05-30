# U — Soma Field Theory

Formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in
M-theory compactification and type-checked in Lean 4. 11 papers published on Zenodo.

**Author**: Alistair Johnson, Independent Researcher, Zurich, Switzerland
**ORCID**: 0009-0007-2194-0850

## Structure

- `paper/` — All paper source (.md), PDFs, scripts, and Lean 4 proofs
  - `paper/soma/<name>/` — One dir per paper (source + translations + data)
  - `paper/proofs/` — Cross-cutting Lean 4 formal proofs
  - `paper/scripts/` — paper_status.py, package_papers.py, translate_papers.py, build_omnibus.py
- `apps/` — Build/run things
  - `apps/instrument/` — Python live instrument server (OSC, MIDI, field renderer)
  - `apps/facilities/` — Gym + studio floor plans and equipment data

## Building

```bash
cd paper && make all
```

Requires: pandoc, xelatex, pandoc-citeproc.

## Paper Status

```bash
.venv/Scripts/python paper/scripts/paper_status.py
```

Outputs `paper/PAPER_STATUS.md` and `paper/paper_status.json`.

## Freeze Package

```bash
.venv/Scripts/python paper/scripts/package_papers.py --version vX.Y.Z
```

## Process

Repository process, git hygiene, and Zenodo publishing steps: `PROCESS.md`

