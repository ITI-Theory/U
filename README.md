# U — Universal Somatic Field: Research Programme

Formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in
M-theory compactification, type-checked in Lean 4, and applied across 15 academic domains.

**24 canonical papers · 15 fractal programme books · OS axioms machine-verified (0 sorries)**

**Author**: Alistair Johnson · Independent Researcher · Zurich, Switzerland
**ORCID**: [0009-0007-2194-0850](https://orcid.org/0009-0007-2194-0850)
**Org**: [ITI-Theory](https://github.com/ITI-Theory) · **Distribution**: [ITI-Theory/Dist](https://github.com/ITI-Theory/Dist)

---

## What is in this repo

| Path | Contents |
|---|---|
| `paper/soma/` | 24 canonical papers (P1–P24), source `.md` + built PDFs |
| `paper/proofs/` | Lean 4 formal proofs — OS axioms, M-theory isomorphism, RG flow, causality |
| `paper/bld/` | Built PDFs including omnibus (all 21 papers) and cheatsheet |
| `paper/scripts/` | Build scripts: `build_omnibus.py`, `paper_status.py`, `package_papers.py` |
| `Part2/fractal-programme/` | 15 domain books applying the USF to 15 academic fields |
| `apps/instrument/` | Python live instrument server (OSC, MIDI, field renderer) |
| `apps/facilities/` | Gym + studio floor plans and equipment data |

## The science in one line

The master equation is the Helmholtz Green's function of a tensor field compactified from M-theory:
$$(\nabla^2 + k^2)\,G(x,x') = -\delta^3(x-x')$$
Everything else — trauma topology, quantum tunnelling in the limbic gate, swarm coordination,
music entrainment, tectonic criticality — follows from this single propagator.

## Formal verification

All five Osterwalder–Schrader axioms proved in `paper/proofs/USF_OSAxioms.lean` via the
[OSforGFF](https://github.com/tydeu/OSforGFF) library. **0 sorries · 0 extra axioms.**

```bash
lake build USF_OSAxioms   # ~10 min cold, cached thereafter
```

## Building papers

```bash
cd paper && make all        # all 20 individual papers
cd paper && make omnibus    # omnibus (Royal + A4)
```

Requires: pandoc, xelatex.

## Fractal programme (15 domain books)

```bash
cd Part2/fractal-programme && make all    # all 15 books
```

See `Part2/fractal-programme/PROGRAMME.md` for the full V-model, reader level guide,
and the extended ESA-style methodology documentation.

## Paper status

```bash
.venv/Scripts/python paper/scripts/paper_status.py
```

## Process / release

Repository process, git hygiene, and Zenodo publishing steps: `PROCESS.md`
Zenodo runbook and upload queue: [`ITI-Theory/Dist/zenodo/`](https://github.com/ITI-Theory/Dist/tree/main/zenodo)

