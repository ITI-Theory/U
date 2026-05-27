# Copilot Instructions — U (Soma-Field Research Repo)

## What This Repo Is
Formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in
M-theory compactification and type-checked in Lean 4. Includes quantum experiment, instrument,
and 7 papers (4 languages each).

Author: Alistair Johnson | ORCID: 0009-0007-2194-0850 | Independent Researcher, Zurich

## Key Paths
| Path | Purpose |
|---|---|
| `paper/` | All paper source (.md) and built PDFs |
| `src/` | Lean 4 formal proofs (SomaField.lean, Hopfield.lean) |
| `instrument/` | Python quantum experiment + live instrument server |
| `scripts/` | paper_status.py, package_papers.py, package_submissions.py, package_everything.py |
| `dist/` | Freeze ZIPs and submission bundles |
| `.venv/` | Python venv — activate: `source .venv/Scripts/activate` |

## Build Commands
```bash
cd paper && make all          # rebuild all PDFs
cd paper && make check        # verify toolchain (pandoc + xelatex)
.venv/Scripts/python scripts/paper_status.py           # regenerate PAPER_STATUS.md + paper_status.json
.venv/Scripts/python scripts/package_papers.py --version vX.Y.Z   # freeze ZIP
lake build                    # build Lean proofs
```

## Papers — Publication Status (as of May 2026)
| Paper | Status | DOI |
|---|---|---|
| soma-field-paper | Zenodo published | https://doi.org/10.5281/zenodo.20350516 |
| quantum-soma-penrose | Zenodo published | https://doi.org/10.5281/zenodo.20351231 |
| mathematical-co-identification | Zenodo published | https://doi.org/10.5281/zenodo.20350331 |
| music-affect-dynamics | Built, not submitted | — |
| soma-field-patient-pov | Built, not submitted | — |
| soma-field-book | Built, not submitted | — |
| the-tensor | Built, not submitted | — |

## Git State (as of May 28, 2026)
- 4 commits ahead of origin/main — **not pushed**
- Dirty (uncommitted): `paper/FIELD-NOTES.md`, `paper/quantum-soma-penrose.md`, `paper/quantum-soma-penrose.pdf`
- Untracked: `paper/AI-NOTES.md`, `paper/AI-NOTES-GEN-CLEAN.md`, `paper/PUBLISH-NOW-FILESET.md`
- Standard release procedure: `make && git add -A && git commit && git tag -a vX.Y.Z && git push && git push origin vX.Y.Z`

## Quantum Experiment Status (QUANT-EXP-1)
- **PASS** — quantum annealing reaches Awe basin in 3/3 barrier cases; classical cold 0/48
- Barrier sweep done: W ∈ {-8, -10, -12}, all PASS, quantum peak ~0.408–0.410
- Schedule comparison done: linear > cosine > pause
- 3D animation done: `instrument/quantum_experiment_3d.gif`

### Remaining Experiments
1. Barrier ladder sweep: W from -6 to -14 in unit steps
2. Noise-equivalence curve: find T* (classical temp matching quantum success)
3. Bootstrap confidence intervals (n=200 trajectories)
4. Spectral gap proxy metric during anneal
5. Negative controls A and B
6. Fixed-seed table publication

## Papers Quality Status
| Paper | Score | Blocking gap |
|---|---|---|
| soma-field-paper | 9.3/10 | Independent external replication pending |
| mathematical-co-identification | 9.4/10 | External evaluator claim ledger |
| music-affect-dynamics | 9.4/10 | Multi-operator preregistered replication |

Independent replication ledger: `paper/INDEPENDENT_REPLICATION_LEDGER.md` (all rows PENDING)

## Versioning Convention
`v{major}.{minor}.{patch}` — major: submission/acceptance; minor: new section/proof; patch: fix/rebuild

## Distribution
PDFs are mirrored to `ITI-Theory/Dist` repo (papers/ folder).
Org profile README: `ITI-Theory/.github-private/profile/README.md`
