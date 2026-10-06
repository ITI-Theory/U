# U — Universal Somatic Field: Research Programme

Formal model of emotional field dynamics as a tensor-valued Hopfield network, grounded in
M-theory compactification, type-checked in Lean 4, and applied across academic domains.

**Author**: Alistair Johnson · Independent Researcher · Zurich, Switzerland
**ORCID**: [0009-0007-2194-0850](https://orcid.org/0009-0007-2194-0850)
**Org**: [ITI-Theory](https://github.com/ITI-Theory) · **Distribution**: [ITI-Theory/Dist](https://github.com/ITI-Theory/Dist)

Papers, DOIs and their publication status are kept in one place only:
[`Dist/PAPERS.yaml`](https://github.com/ITI-Theory/Dist/blob/main/PAPERS.yaml).

---

## Working on this repo

This section is for everyone who works here, people and AI alike.

**Start here, in this order:**

1. this README;
2. `make help`: every command this repo has;
3. [`docs/agent/CURRENT.md`](docs/agent/CURRENT.md): where the work is now and what comes next;
4. [`ISSUES.md`](ISSUES.md): everything open, decided or parked.

**Commands.** The Makefile is the command handler: every repeatable action is a
Make target, and `make help` lists them. Across repos and devices, `HAL` is the
single address (`HAL help`; design in `T.Dot/DESIGN.md`): commands are noun then
verb, for example `HAL copilot start`, `HAL copilot save`, `HAL chat new <name>`.
AI sessions use the full form of every command.

**AI sessions.** Begin with `HAL copilot start`, which reads this README,
CURRENT.md and the end of the active chat. Until it is installed (ISS-044), read
them directly. Save often (`HAL copilot save`); end with `HAL copilot wrapup`,
which exports the chat to `Me/chats/Inbox/` and rewrites CURRENT.md.

**Autopilot mode** (optional, default off). When switched on, every change is
proposed first as a numbered list and waits for an answer: `next` or `y` does
the next step, `go all` or `A` does the whole list, `stop` or `n` halts.
Details in `T/AGENTS.md`.

**Rules that apply here** (full text in `T.Ops/docs/standards/naming.md`,
"Working rules", and [`docs/BUILD.md`](docs/BUILD.md)):

- point to a fact, don't copy it (paper status lives in `Dist/PAPERS.yaml`);
- `*.OBSOLETE` files and directories are kept for history only: do not read,
  build, cite or link them (naming one as where the history went is fine);
  when renaming something to `.OBSOLETE`, fix what referred to it
  (`bin/release-check` section 15 checks);
- an idea from a discussion that is not done on the spot becomes an issue in
  `ISSUES.md`;
- documents are built by Make, pandoc and Lua filters, never by scripts that
  write markup (BUILD.md).
- never present an interpretation, simulation or planned experiment as a
  proved or empirical result; label every claim (`docs/agent/THEORY-STATUS.md`);
  the quarantined claims in ISS-046 are never presented as results;
- published papers change only through new Zenodo versions: flag problems,
  do not edit a published paper in place;
- run `git status -sb` before every commit; never commit generated PDFs from
  the ignored build directories.

---

## What is in this repo

| Path | Contents |
|---|---|
| `paper/soma/` | canonical papers, source `.md` |
| `paper/proofs/` | Lean 4 formal proofs (`make lean`) |
| `Part2/fractal-programme/` | domain books of the Fractal Thesis |
| `books/T-Theory/` | the [T]-Theory volumes |
| `Part2/book/field-atlas/` | the Field Atlas, A3 and HTML (`make atlas`) |
| `Part2/book/field-atlas-textbook/` | [T]-Theory: A Course, A4 course book (`make textbook`) |
| `apps/instrument/visuals/soma-field-operator/` | the Soma Machine app (`make app`) |
| `apps/instrument/mother/` | MOTHER: the bridge from the app to the NotebookLM notebooks |
| `registry/` | levels, paths, tours and questions shared by the app, the Atlas and the course book |
| `lib/` | shared build machinery: pandoc defaults, Lua filters, Make includes |
| `docs/` | standards (BUILD.md, VISUALIZE.md, TOUR-LANGUAGE.md) and `docs/agent/` |
| `uat/` | release candidates and acceptance evidence |
| `bin/` | repo tools: `release-check`, `issues-check`, `zenodo-audit`, `zenodo-publish` |
| `bld/` | all build output (ignored by git; accepted artifacts are promoted to Dist) |
| `apps/facilities/` | gym and studio floor plans and equipment data |

## The science in one line

The master equation is the Helmholtz Green's function of a tensor field compactified from M-theory:
$$(\nabla^2 + k^2)\,G(x,x') = -\delta^3(x-x')$$
Everything else (trauma topology, quantum tunnelling in the limbic gate, swarm coordination,
music entrainment, tectonic criticality) follows from this single propagator.

## Formal verification

The Osterwalder–Schrader axioms are proved in `paper/proofs/USF_OSAxioms.lean` via the
[OSforGFF](https://github.com/mrdouglasny/OSforGFF) library. `make lean` builds all proofs
(about ten minutes cold, cached thereafter).

## Building and releasing

`make help` lists the build targets; outputs go to `bld/`. Requirements: pandoc,
pandoc-crossref, xelatex, Python 3 (see [`docs/BUILD.md`](docs/BUILD.md)).

The release runbook is [`Dist/README.md`](https://github.com/ITI-Theory/Dist/blob/main/README.md);
`bin/release-check` is the automated gate. Repository process and Zenodo steps: `PROCESS.md`.

## Issue metadata

`ISSUES.md` is the canonical cross-session issue register. Its YAML front
matter is the controlled vocabulary enforced by `bin/issues-check`:

- `tags:` is the complete allowed tag list. Add a tag there before using it in
	an issue's `{{Tags ...}}` macro.
- `fields:` is the complete allowed field list for `{{Fields ...}}` macros.
- A non-empty `epic=` field requires a reciprocal detail file at
	`prj/.adm/issues/<epic>.md` with `fields.issue=ISS-NNN`.

Validate changes with:

```bash
bin/issues-check
```
