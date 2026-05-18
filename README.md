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

