# Copilot Instructions — U (Soma-Field Research Repo)

## What This Repo Is
Formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in
M-theory compactification and type-checked in Lean 4. Includes quantum experiment, live instrument,
facilities planning, and 11 papers/datasets (4 languages each).

This is the **Soma Field Theory (SFT)** engine — the scientific core nested inside the [T]-Theory art movement. See T copilot-instructions for Phase B context.

Author: Alistair Johnson | ORCID: 0009-0007-2194-0850 | Independent Researcher, Zurich

**Master instructions (naming, repos, HAL, session primer) are in `T/.github/copilot-instructions.md` — that layer loads first. This file adds U-specific detail only.**

## Key Paths
| Path | Purpose |
|---|---|
| `paper/` | All paper source (.md) and built PDFs |
| `paper/soma/<name>/` | One dir per paper — source .md + translations + paper-specific data |
| `paper/proofs/` | Lean 4 formal proofs (cross-cutting — not paper-specific) |
| `paper/scripts/` | paper_status.py, package_papers.py, translate_papers.py, build_omnibus.py |
| `apps/instrument/` | Python live instrument server (OSC, MIDI, field renderer) |
| `apps/facilities/` | Gym + studio floor plans, equipment data |
| `.venv/` | Python venv — activate: `source .venv/Scripts/activate` |
| `PROCESS.md` | Session-start primer, git hygiene, Zenodo publishing steps |
| `paper/FIELD-NOTES.md` | Running research log — read last 40 lines to catch up on recent work |

## Build Commands
```bash
cd paper && make all          # rebuild all PDFs
cd paper && make check        # verify toolchain (pandoc + xelatex)
.venv/Scripts/python paper/scripts/paper_status.py           # regenerate PAPER_STATUS.md + paper_status.json
.venv/Scripts/python paper/scripts/package_papers.py --version vX.Y.Z   # freeze ZIP
```

## Papers — Publication Status (as of May 30, 2026)
All 11 records published on Zenodo. P10–P13 and C2 pending upload. P14–P20 written/queued 2026-08-10. **Master registry: [`Dist/PAPERS.yaml`](https://github.com/ITI-Theory/Dist/blob/main/PAPERS.yaml)** — DOIs, status, file paths.

| ID | Paper | Concept DOI |
|---|---|---|
| P1 | soma-field-paper | https://doi.org/10.5281/zenodo.20350515 |
| P2 | quantum-soma-penrose | https://doi.org/10.5281/zenodo.20351230 |
| P3 | mathematical-co-identification | https://doi.org/10.5281/zenodo.20287981 |
| D1 | SFT-DEMO-CASE | https://doi.org/10.5281/zenodo.20459825 |
| P4 | soma-field-synthesis | https://doi.org/10.5281/zenodo.20460118 |
| P5 | soma-physical-substrate | https://doi.org/10.5281/zenodo.20460357 |
| P6 | soma-field-book | https://doi.org/10.5281/zenodo.20460455 |
| P7 | soma-field-patient-pov | https://doi.org/10.5281/zenodo.20460523 |
| P8 | the-tensor | https://doi.org/10.5281/zenodo.20460613 |
| P9 | music-affect-dynamics | https://doi.org/10.5281/zenodo.20460685 |
| D2 | lean-proofs-appendix | https://doi.org/10.5281/zenodo.20437858 |
| C1 | omnibus | https://doi.org/10.5281/zenodo.20460771 |
| P10 | soma-temporal-dynamics | pending Zenodo upload |
| P11 | zoomable-somatic-field | pending Zenodo upload |
| P12 | experimental-validation | pending Zenodo upload |
| P13 | missing-limbic-layer | pending Zenodo upload |
| C2 | ttheory-fractal-omnibus | pending Zenodo upload |
| P14 | usf-euclidean-qft | not yet submitted |
| P15 | usf-interacting-qft | research programme paper, not yet submitted |
| P16 | geographic-somatic-field | not yet submitted |
| P17 | gestalt-field-dynamics | not yet submitted |
| P18 | preverbal-manifold | not yet submitted |
| P19 | swarm-propagator | not yet submitted |
| P20 | universal-somatic-field | not yet submitted |
| P21 | cosmological-constant-derivation | pending Zenodo upload — Λ ≡ ⟨tr Φ⟩₀; Λ_USF = (21/11)H₀²/c² within 7% of Λ_obs |
| P22 | dark-matter-spatial-vacuum | not yet submitted — Ω_DM = 3/11 from spatial block vacuum; 2.9% off Planck 2018 |
| P23 | ttheory-phenomena | not yet submitted — fixed-point paper; USF describes its own propagation; Phase 2 gateway |
| P24 | g2-symmetry-breaking | not yet submitted — W8ℝ = (6/5)I₈ + δW; 48.4% G₂ symmetry broken; resolves 8→7 dimension question |

## Git State (as of May 30, 2026)
- All repos clean and pushed (main branch, no uncommitted changes)
- Standard release procedure: `make && git add -A && git commit && git tag -a vX.Y.Z && git push && git push origin vX.Y.Z`

## Quantum Experiment Status (QUANT-EXP-1)
- **PASS** — quantum annealing reaches Awe basin in 3/3 barrier cases; classical cold 0/48
- Barrier sweep done: W ∈ {-8, -10, -12}, all PASS, quantum peak ~0.408–0.410
- Schedule comparison done: linear > cosine > pause
- 3D animation done: `paper/soma/quantum-soma-penrose/quantum_experiment_3d.gif`

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
