---
tags: area.app, area.build, area.instrument, area.ops, area.papers, area.books, area.theory, area.proofs, area.clinical, project.soma-field-operator, projection.3d, release, uat
fields: date.created, date.start, date.end, epic
---

# Issues — U / [T]-Theory Research Programme

Issue tracker for work that spans sessions or needs a future decision.
Format: `ISS-NNN: Title — STATUS`
Status: OPEN | IN-PROGRESS | CLOSED

## Issue Metadata

The front matter declares the controlled tag vocabulary and required fields.
Use one macro of each kind directly below every new or migrated issue heading:

```markdown
{{Tags area.instrument, project.soma-field-operator, projection.3d}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=ISS-027-soma-field-operator-projection}}
```

Tags are comma-separated semantic labels; a dot expresses hierarchy, not a
filesystem location. Fields are comma-separated `name=value` pairs; each value
is one string. Dates use `YYYY-MM-DD`; leave unknown values empty. `epic=` has
no detail file. A non-empty `epic` value names `prj/.adm/issues/<value>.md`,
which must link back to this register.

Tip: Folding in vscode (turns file into a Issues UI), You can fold regions using the folding icons on the gutter between line numbers and line start.
Use Shift + Click on the folding icon to fold or unfold the region and all regions inside.

---

## ISS-001: Phase 1 wrap — Zenodo uploads + NLM UAT — OPEN

**Status 2026-10-04 00:30:** release candidate built and staged. `bin/release-check`
15 PASS, 0 FAIL, 2 WARN (pending uploads; one tracked research gap).
`uat/staging/papers/` (34 files) and `uat/staging/ttheory/` (14 files) carry
SHA-256 manifests. Dist is unchanged until UAT acceptance (Dist/README.md step 7).
`bin/zenodo-publish plan`: 44 records, 24 new versions, 20 new records, 0 errors.

**Actions (in order, Dist/README.md release cycle):**
- [x] Build candidates (`make uat-stage-full`) and pass `make uat-check`.
- [ ] Author: review P21 (cosmological constant) and set it to pending-upload
   in `Dist/PAPERS.yaml` (`make generate` afterwards).
- [ ] NotebookLM UAT from `uat/staging/<track>/`, fresh private `nlm-uat`:
   Sherlock (built right), Harry Potter (built the right thing), Cookie Monster
   (understandable). Record in `paper/UAT.md`.
- [ ] Lulu print preview of the [T]-Theory volumes.
- [ ] Promote accepted PDFs: `make dist`, verify checksums against the staging
   manifests, commit Dist.
- [ ] Zenodo: `ZENODO_SANDBOX_TOKEN` then `bin/zenodo-publish --sandbox plan`,
   sandbox drafts, then live with `ZENODO_TOKEN` (`--publish --yes`).
- [ ] Fill new DOIs in `Dist/PAPERS.yaml`, `make generate`, update the org
   README DOI tables; commit and tag U and Dist together.

**Closes:** `Dist/ISSUES.md` ISS-001 (migrated here 2026-08-14)

---

## ISS-002: Phase 1 → Phase 2 — directory + versioning strategy — CLOSED

**Decision: Option A** — replace in place + Zenodo “New version” + `phase` field in PAPERS.yaml.

> CLOSED: Option A decided 2026-08-14. Add `phase: 1` to PAPERS.yaml entries on next Dist maintenance commit.

---

## ISS-003: PDF encoding — cosmological-constant cover page — CLOSED

> CLOSED 2026-08-14. Source .md fixed (LaTeX `\langle\mathrm{tr}\,\Phi\rangle_0`);
> PDF rebuilt (`make cosconst`) and synced to `Dist/papers/`.

**File:** `Dist/papers/cosmological-constant-derivation.pdf`

Cover page shows `Λ ≡ �tr Φ�₀` — the `⟨ ⟩` angle brackets are rendering as replacement characters.

**Fix:** Changed subtitle in source .md from Unicode `⟨tr Φ⟩₀` to LaTeX
`$\Lambda \equiv \langle\mathrm{tr}\,\Phi\rangle_0$` (2026-08-14).
Pending: rebuild PDF (`make cosmological`) and sync to Dist.

**Actions:**
- [x] Fix source .md
- [x] Rebuild PDF (cover verified 2026-10-03: renders correctly)
- [x] Sync is now `make dist` after UAT (ISS-001)

---

## ISS-004: Lulu metadata — add spine info to PAPERS.yaml — CLOSED

> CLOSED 2026-08-14. Added `lulu_spine_title` and `lulu_spine_author` to C1, C1v2, C2
> in `Dist/PAPERS.yaml`. Format: short title + "Alistair Johnson".

Lulu requires spine title and spine author at upload time. Currently not in PAPERS.yaml.

**Decision needed per volume:**
- Spine title: full title, short title, or `[T]-Theory`?
- Spine author: `Alistair Johnson`, `A. Johnson`, or `[T]-Theory`?

**Actions:**
- [ ] Add `lulu_spine_title` and `lulu_spine_author` fields to PAPERS.yaml for C1, C1v2, C2
- [ ] Document chosen format in `Dist/lulu/README.md`

---

## ISS-005: Lean sorry stubs — CLOSED

> CLOSED 2026-08-16. `grep` finds zero active `sorry` stubs in
> `paper/proofs/*.lean`. The Hopfield demo now proves its zero-weight
> attractor and one-step convergence baseline. Remaining research questions
> are tracked as explicit gaps, axioms, or Phase 2 work rather than `sorry`s.

---

## ISS-006: P23 Fractal Thesis gateway — emphasise cosmological shift — CLOSED

P23 abstract updated 2026-08-14: added opening sentence explicitly naming P21 (Λ derivation)
and P22 (Ω_DM = 3/11) as the cosmological completion of Phase 1.

> CLOSED: abstract updated, PDF rebuild pending (ISS-003 rebuild pass will cover this).

---

## ISS-007: Lake Parallel builds — CLOSED

> CLOSED 2026-08-14. `alias bld='LEAN_NUM_THREADS=2 lake build'` in use. AI build rules: no `&`, no pipes, sync only.

AJ: How did this happen 22 instances of each...cant happen again...are you explictill trying to runn lots in parallel? if so, please dont.... as it doesnt like it, let lake decide, but dont give it lots or processors....will bounce vscode on answer

AI:
My fault. Here's exactly what happened:

I ran lake build DyadicField 2>&1 | tee /tmp/lb.txt & — background ampersand. That hid the process from normal kill
Lake spawns parallel Lean workers by default (one per module, up to CPU count — ~8-16 on your machine)
VS Code Lean language server also runs separate Lean processes for every .lean file open in the editor
Both were running simultaneously → 22 each
Rules going forward — I will not break these:

No & background for lake builds — always sync mode so it can be killed normally
Use --jobs 1 for any terminal build while VS Code is open: lake build --jobs 1 DyadicField
Never start a build while another is running — check jobs first
Close the Lean file in VS Code before running a terminal build, or close VS Code entirely
The VS Code Lean extension is the uncontrolled variable — it quietly starts Lean processes for every open .lean file. Combined with a lake build, it multiplies.

When you come back after VS Code restart: confirm CPU is calm, then we can do a single lake build --jobs 1 DyadicField with you watching.

AJ:
in my .bashrc,  Ihave a function prj, that basically sources a `.prj` file. so if lake can
set the max threads, we add to `.prj` a command `bld`. For a lke project, it calls lake with
the right threads. This would work.

**Actions:**
- [ ] Add bld to prj in ~/.bashrc, a wrapper for lake. simple  though. just wrap lake and the
      threads. done: `alias bld='LEAN_NUM_THREADS=2 lake build'`
- [ ] for consistency, AI /copilot must use the same system, not sure the best way for this.
      note `.prj` can in any directory, not just root.

Review required

---

## ISS-008: check for commented out evals, TODO's, etc — CLOSED

> CLOSED 2026-08-14. Audit findings:
> - `DyadicField.lean` — `#eval` demo in `/-` block (OK, noncomputable)
> - `BRECVEMAVariational.lean` — active `#eval` for W8 row sum (computable, intentional)
> - `EmotionOntology.lean` — many active `#eval` blocks (String/computable, intentional demo layer)
> - `Movie.lean` — 3 active `#eval` blocks (Float-only file, excluded from ISS-009)
> - `Benchmark.lean` — `--#eval runBenchmark` commented (noncomputable ℝ, correct)
> No action required.

---

## ISS-009: Remove Float from proof files — CLOSED

> CLOSED 2026-08-14. Zero `Float` (case-sensitive) in all `paper/proofs/*.lean` except Movie.lean.
> Test: `grep -i Float paper/proofs/*.lean | grep -v Movie.lean` returns empty.

127 Float occurrences across 13 proof files. Float is opaque in Lean 4 — no
mathematical laws, no Decidable (<), hangs native_decide. Replace with ℝ or
move simulation code to dedicated *Sim.lean files.

### Category A — Float references in comments / blocked evals
- [x] `BRECVEMAVariational.lean:160` — uncommented `#eval` AJ row-sum; switched to `W8` (computable)
- [x] `CosmologicalConstant.lean:119` — deleted Python comment block
- [x] `BRECVEMAField.lean:39,42` — removed Float references from doc comments

### Category B — Struct fields (replace Float with ℝ)
- [x] `ScaleUniverse.lean` — 3 struct fields: `phase`, `freq_hz`, `limbic_coupling` → ℝ

### Category B — Struct fields (replace Float with ℝ)
- [ ] `ScaleUniverse.lean` — blocked: `CemiField` + `T_TheoryUniverse` mix Float (`Field8`) and ℝ; clean when Field8→ℝ migration (Category C) is done

### Category C — Simulation in proof files (extract to *Sim.lean)
- [ ] `SomaField.lean` (13) — W8/Field8/step8/runField8 (blocked: Field8 core migration)
- [ ] `DyadicField.lean` (17) — W_AB/J/Float dynamics (blocked: Field8 core migration)
- [ ] `Hopfield.lean` (11) — weights/energy/step (entire Float simulation layer)
- [ ] `UniversalSomaticField.lean` (4) — autonomous_update/volitional_update (blocked: dt:Float tied to Field8)
- [x] `LimbicHopfield.lean` — softmax2F/correspondenceDemo: Float-only #eval demo fns, no theorems; acceptable as-is
- [x] `LimbicTunnel.lean` — wkbActionF/wkbAmplitudeF/barrierValues: Float-only numerical demo fns, no theorems; acceptable as-is

### Category D — Decide intent (proof or demo?)
- [ ] `Movie.lean` (41) — animation/rendering; if demo-only, move to MovieSim.lean
- [ ] `Benchmark.lean` (13) — benchmarks; move to BenchmarkSim.lean
- [ ] `SomaNetwork.lean` (10) — network sim; move to SomaNetworkSim.lean

> CLOSED when: zero Float in files that contain `theorem`/`lemma`.
> Float in *Sim.lean files is OK (they contain no proofs). WRONG... no flaots!!!!

test : `grep -i float paper/proofs/*.lean | grep -v Movie.lean `

---

## ISS-010: check for TODO's in proofs — CLOSED

> CLOSED 2026-08-14. Single TODO found: `SomaField.lean:17` — 5 proof obligations.
> Updated to reflect current status (two are sorry'd in ISS-005,
> three are open Phase-2 work). No other TODO/FIXME markers in proof files.

---

## ISS-011: Hopfield.lean — upgrade to SpinState + asynchronous update — OPEN

Current Hopfield.lean uses `Pattern = Fin D → ℝ` (synchronous step). This
makes proofs 3 (attractor\_exists) and 4 (convergence) hard because the state
space is infinite.

**Reference:** Cipollina, Karatarakis, Wiedijk (2025). "Formalized Hopfield
Networks and Boltzmann Machines." arXiv:2512.07766.
Lean 4 source: https://github.com/or4nge19/NeuralNetworks

**Required changes:**
- Redefine `Pattern` as `Fin D → SpinState` where `SpinState = {up, down}`
- Add asynchronous `updateAsync (w : Wmat) (s : Pattern) (i : Fin D)` (flip one neuron)
- Finiteness: `Fintype (HopfieldState D)` gives `2^D` states
- Energy descent: `energy w (updateAsync w s i) ≤ energy w s` (per Cipollina Energy.lean)
- Convergence: well-founded induction on energy over the finite state space

**Assessment (2026-10-03):** the README of the repository above points to a newer
development, https://github.com/or4nge19/HopfieldNet2 (MIT; authors Cipollina,
Karatarakis, Wiedijk; arXiv:2512.07766; Lean v4.28.0-rc1, last pushed 2026-03).
Its Hopfield core (`HopfieldNet/HN`: 9 files, 143 theorems, 0 sorries) proves
what this issue needs: `energy_diff_leq_zero`, `HopfieldNet_convergence_fair`,
`HopfieldNet_convergence_cyclic`, `Hebbian_stable_orthogonal`. The import
closure we need is 5 files, about 1,950 lines, Mathlib only: `HN/Core`,
`HN/Hebbian`, `HN/aux`, `NN`, `SpinState/Basic`.

Plan: fork it (not official code) and depend on the fork from our lakefile.
- [ ] Windows: four files are named `aux.lean` (a reserved device name on
   Windows), so the repository cannot be checked out on Windows. Rename them
   to `Auxiliary.lean` in the fork and update the imports.
- [ ] Port the 5-file slice from v4.28.0-rc1 to our v4.33.0 (estimate 2-4 h).
   Probe in `../probe-nn` (scratch, outside the repo) already fixes: imports
   (`Mathlib.Data.Fintype.Pi`, `Mathlib.Data.ZMod.Defs`,
   `Mathlib.Topology.MetricSpace.Basic`), `zero_le` now implicit,
   `CanonicallyOrderedAddCommMonoid.single_le_sum` -> `Finset.single_le_sum`,
   a hand-written `Fintype SpinState` (the deriving handler fails),
   `ZMod 2` cases by `decide`. Remaining: 12 errors in `SpinState/Basic`
   (decidability instances, `Finset.not_mem_empty` renamed) and
   `HN/Auxiliary` line 177; `NN`, `HN/Core`, `HN/Hebbian` not yet compiled.
- [ ] Require the fork in `lakefile.toml` at a pinned commit; then implement
   the SpinState and asynchronous-update upgrade of `Hopfield.lean` below.

**Status of current proofs (2026-08-16):**
- `step_range`, `fixed_point_iff`, `energy_at_fixed_point`, `energy_nondec_at_fixed` — PROVED
- `zero_weight_attractor_exists`, `zero_weight_converges_in_one_step` — PROVED
- General finite-spin asynchronous convergence — deferred to this issue

---

## ISS-012: Add lean-appendix to lake - OPEN

**Progress 2026-08-16:** `bin/release-check` verifies that the appendix embeds
the current sources declared by `build_lean_appendix.py`, avoiding unreliable
filesystem timestamp comparisons. Automatic regeneration remains undecided.

If a proof changes, lean-appendix is built. Now, not all PDF might want to be rebuilt if
lean-appendix changes, the target could at print a list out, or instructions for an AI.

**Questions for AJ:**
1. Lake vs Makefile: should lean-appendix rebuild be a **Lake target** (triggered by
   `bld`) or a **Makefile rule** (e.g. `make lean-appendix` as a dependency)?
2. On change, should the output be: (a) a list of affected PDFs, (b) a message
   "run `make omnibus` to update", or (c) write an instruction file for the AI?
3. Font warning: ℝ, ⟨, ⟩ are missing from Consolas in PDF code blocks — should we
   switch monofont for the lean-appendix chapter (e.g. DejaVu Sans Mono or Fira Code)?

---

## ISS-013: Add U/UAT script — CLOSED

> CLOSED 2026-08-14. Script written to `U/bin/uat`.
> Checks: Float, sorry stubs, open problem markers, lean-appendix freshness,
> PAPERS.yaml pending uploads, git status, build reminder.
> PROCESS.md Tier 1 updated to reference `bin/uat`.

See PROCESS.md:100, thats the basis for a script, except lean-appendix should already exist,
see ISS-012,

```**Pre-upload code check (run before each release — not NotebookLM):**
- `grep -ri Float paper/proofs/*.lean | grep -v Movie.lean` → must be empty
- `make lean-appendix` → must build; `lean-proofs-appendix.md` must match current proofs
- `bld` → must exit 0 (3912/3912 jobs)
```

Script live in `U/bin/XXX`, not sure of name and besides, it will also need an AI, that's OK.
just print instructions for now if needed. Note: Although this is in the build, i guess it must be
triggered manually. unless the target writes instructions to a file, or?

other checks I am sure exist.

**Questions for AJ:**
1. Script name: `uat`, `release-check`, `pre-release`, or something else? - `release-check`
2. Output: stdout only, or also write to a timestamped log file (e.g. `uat-2026-08-14.log`)?
3. Lean-appendix check: should the script (a) regenerate it by calling
   `build_lean_appendix.py`, or (b) just warn if `.md` is older than any `.lean` file?
4. "Other checks I am sure exist" — want me to scan PROCESS.md + ISSUES.md and
   propose a full checklist now, or keep v1 minimal (just the three checks listed)?

---

## ISS-014: Phase 2 research — Path-Dependence in Moduli Space — OPEN

From paper section "Open Research Problems" (P11 zoomable-somatic-field).

Dissonance is path-dependent (a Neapolitan 6th resolving upward ≠ same pitch approached
differently). Current `manifold_coords.py` treats it as a scalar point.

**Fix:** path $\gamma: [0,1] \to \mathcal{M}$ through G₂ moduli space with monodromy
recording path-history. Requires `GeographicSomatic.lean` (P16, not yet written).

**Blocking:** Phase 2 / post-release. Requires ISS-016 (GeographicSomatic.lean).

---

## ISS-016: Write GeographicSomatic.lean — OPEN

Blocker for ISS-014 (path-dependence in moduli space) and P16 (geographic-somatic-field paper).

`GeographicSomatic.lean` should define:
- `GeoField` — spatial extension of `Field8` over a geographic region
- `PathIntegral` machinery for path-dependent dissonance coordinates
- Monodromy of holonomy connection recording path-history through G₂ moduli space

Needs P16 paper drafted first to ground the Lean definitions. Phase 2.

---

## ISS-015: Placeholder scales — CLOSED

> CLOSED 2026-08-15. 19 of 21 ScaleStep arms now use real Physlib/SFT types.
> Only PlanckFoam and StringScale remain String (no Physlib module for those yet).
> `open_problem_3_progress` = 19. Build passes.

---

## ISS-017: lean-appendix auto-regeneration in release-check — OPEN

`bin/release-check` now verifies that the appendix embeds the current declared Lean
sources. Automatic regeneration remains desirable but is intentionally not performed
during a release check.

**Action:** in `bin/release-check`, replace the freshness warn with:
```bash
python3 paper/scripts/build_lean_appendix.py && make -C paper lean-appendix
```
Deferred because the build is slow. Do when CI/CD is set up (ISS-012).

---

## ISS-018: CosmologicalConstant.lean pre-existing errors — CLOSED

> CLOSED 2026-08-15. All errors fixed:
> - `native_decide` → `norm_num [Omega_Lambda_USF, N_compact, N_total]` (and DM/baryon variants)
> - `N_total` out-of-scope in `SomaField.DarkMatter` — inlined literal `11`
> - `usf_is_fixed_point` — added `import UniversalSomaticField`; used fully-qualified
>   `SomaField.Universal.ScaleLevel`, `SomaField.Universal.scale_invariance_inhabited`
> - Discrepancy theorems: added `N_compact, N_total, N_spatial` to norm_num hints
> - Added to `defaultTargets` in lakefile.toml. Build: ✔ (warnings only).

---

## ISS-019: BRECVEMAVariational.lean missing dependency — CLOSED

> CLOSED 2026-08-15. Full fix:
> - Registered `BRECVEMAField` and `BRECVEMAVariational` in `lakefile.toml` (`lean_lib` + `defaultTargets`)
> - `BRECVEMAField.lean`: `def` → `abbrev` for `BRECVEMAField8` and `BRECVEMAMatrix` (type transparency);
>   `Matrix.dotProduct` (non-existent in Mathlib 4.31.0) → inline `∑ i : Fin 8, ψ i * W.mulVec ψ i`;
>   fixed `brecvema_compact_iso` proof (replaced `simp+refine` with `Prod.ext`+`funext`+`simp`+`congr`)
> - `BRECVEMAVariational.lean`: same `Matrix.dotProduct` fix ×2; `sorry` for trivial Euler-Lagrange
>   witness; removed redundant `simp only [Subtype.mk.injEq]`; commented out `#eval`;
>   `SomaField.W8ℝ` → `W8ℝ` (no namespace prefix needed); `/-- CONJECTURE` → `/- CONJECTURE`
>   (doc-comment after `end` caused parse error); `BRECVEMAMatrix` → `Matrix (Fin 8) (Fin 8) ℝ`
>   in `delta_W_dof` type (abbrev in existential binding was opaque).
> Both files: build ⚠ (warnings + sorrys only, no errors).

---

## ISS-020: Registry-Driven Pandoc Lua Hooks — OPEN

**Problem:** Paper and omnibus prose currently risks hand-written references to
project-wide counts, DOI/status values, and cross-paper locations. Those links
drift when the registry or collection changes.

**Decision:** Lua-first for Pandoc rendering logic, project-wide. Use a Pandoc
Lua filter, not Python string replacement, to resolve a small hook vocabulary
from `Dist/PAPERS.yaml` during rendering. Candidate hooks include paper count,
registered paper identity, DOI, status, and cross-paper reference.

**Decision boundary:** `PAPERS.yaml` remains the sole source of release metadata.
Lua may resolve only explicitly documented hooks. It must not become a general
template language or silently rewrite scientific prose.

**Next actions:**
- [x] Define the initial hook syntax and allowed registry fields.
- [x] Implement a Pandoc Lua filter with fixture-based pass/fail tests.
- [ ] Add one real omnibus or paper use-case before expanding the vocabulary.

**Prototype result (2026-08-19):** `paper/registry-hooks.lua` resolves
`{{papers.count}}`, `{{paper:ID.title|doi|status}}`, and
`{{collection:ID.title|status}}` directly from `PAPERS.yaml`; its Pandoc
fixture passes. This is the project-wide rendering-hook foundation.

**AI opinion:** Start this immediately. The existing Lua filters are cleanup
filters, not a registry hook framework. A narrow, tested hook layer is a quick
win; unrestricted macro substitution would recreate the drift it is meant to prevent.

---

## ISS-021: Shared Omnibus Document Model — OPEN

**Problem:** C1v2 is a collected-work manuscript containing papers, a book,
and appendices. C2 is likewise a book of domain books, additionally placing
cheatsheets within its constituent books. The correct hierarchy for books,
papers, abstracts, dividers, TOC depth, and appendices is not yet a settled
registry-level document model.

**External proposal considered:** Classify members as `book` or `paper`; promote
book internal structure while keeping papers as atomic chapters. Render abstracts
as short chapter summaries in the omnibus. Generate the synthesis table from the
registry rather than retaining a hand-written copy in a paper forematter. The
same model must cover C2's book members, with cheatsheets as registered inserts.

**Decision:** C1v2 and C2 share one documented model with
explicit per-member roles and insertion rules. C2's cheatsheets are an additional
member-level insertion rule, not a separate architecture.

**Draft artifact:** `paper/OMNIBUS_DOCUMENT_MODEL.md` records the proposed
shared roles, C1v2/C2 target behavior, registry shape, acceptance tests, and
questions requiring an explicit decision before renderer migration.

**Next actions:**
- [ ] Specify registry fields for member role, hierarchy treatment, abstract mode,
   appendix mode, and optional insertions.
- [ ] Write accepted page/TOC examples for C1v2 and C2 before changing renderers.
- [ ] Prototype the book-member treatment on `soma-field-book`; compare with the
   current merged output using focused format checks.
- [ ] Move generated registry views such as the synthesis table out of handwritten
   paper prose only after the document model is accepted.

**AI opinion:** The reader-facing hierarchy is now decided. Next implementation
must use Lua/registry transforms to produce the two-level master TOC without
turning it into a many-page inventory.

---

## ISS-022: Omnibus Build Modularity Evaluation — OPEN

**Problem:** The current merge-then-render approach can create hidden coupling:
a formatting or hierarchy change in one source can alter unrelated omnibus
output. The question is not compile speed; it is whether explicit document
boundaries make a book-of-books easier to reason about, test, and finish.

**External proposal considered:** Generate per-member TeX files and assemble via
LaTeX `subfiles`/`combine`, or pass the ordered Markdown list directly to Pandoc
with Lua structural transforms. `subfiles.sty` is installed locally;
`combine.sty` is not currently installed. The proposal also suggests removing
the generated `omnibus-body.md` intermediate.

**Decision boundary:** Do not replace the merged build merely because modular
LaTeX is conventional. `subfiles` is appropriate only if child documents can
share the master preamble while preserving a single registry-owned TOC,
continuous pagination, citations, and quality gates. `combine` is not a
current option. Any Lua/Pandoc approach must retain those same guarantees.

**Next actions:**
- [ ] Complete ISS-021's C1v2/C2 document model first.
- [x] Build a two-member `subfiles` prototype using registry-owned member roles.
- [x] Test the installed `combine` class using its documented invocation.
- [ ] Build an equivalent direct multi-file Pandoc + Lua prototype.
- [ ] Compare isolation of local changes, TOC, citations, continuous pagination,
   page references, and output stability.
- [ ] Adopt only if it reduces integration coupling without creating a second
   hard-coded member inventory.
- [ ] Replace `books/T-Theory/build_fractal_books.py` with the accepted
   registry-driven Pandoc/Lua body assembly, then remove the script.

**Prototype result (2026-08-19):** `subfiles` compiles the two-member master
and each child independently under XeLaTeX, sharing the master preamble and
master TOC. `combine` is installed but fails even under its canonical example
with `Extra \endgroup` on `\begin{document}`; its own documentation also warns
that citations and TOCs are local to imports and that modified LaTeX internals
may produce grouping errors. Rule out `combine` for C1v2/C2.

**AI opinion:** `subfiles` is the only viable installed package candidate. It
models separately compilable documents without `combine`'s incompatible
document-boundary surgery. Investigate it after ISS-021, with Lua as the
default metadata/structure layer. The acceptance test is easier integration and
fewer unrelated regressions, not a faster build.

---

## ISS-023: C2 Vol II exceeds Lulu 800-page cap — OPEN

**Measured state (2026-08-19):** Registry-driven `check_lulu_pages.py`
enforces `lulu_page_limit: 800` for every Lulu-designated artifact.

| Artifact | Pages | Limit | Result |
|---|---:|---:|---|
| C1v2 | 423 | 800 | PASS |
| C2 Vol I | 758 | 800 | PASS |
| C2 Vol II | 828 | 800 | FAIL |
| Each individual C2 domain book | 83–236 | 800 | PASS |

**Decision boundary:** Do not promote `ttheory-vol2.pdf` to `Dist/lulu/` while
it exceeds the registered cap. The normal A4/NLM artifact can remain valid;
this blocks the dedicated print artifact only.

**Next actions:**
- [ ] Identify a natural C2 Vol II split or move one coherent domain book to
   another registered volume.
- [ ] Rebuild the resulting print volumes with the Lulu A4 profile.
- [ ] Recalculate page counts and cover spine dimensions before Lulu preview.

**AI opinion:** Split Vol II by a coherent reader/domain boundary rather than
shrinking typography or margins to force 28 pages under the cap. Individual
domain books already provide valid local Lulu outputs.

---

## ISS-024: Effect specification and causal-response interpreter — OPEN

**Tag:** Future / USM formal foundation

**Problem:** The incoming UAT sketch `uat/RC1.1/inbox/SomaMachine/SomaUniverse.lean`
correctly identifies a useful Rosetta connection between abstract effect management,
scale-indexed universes, and causal impulse response. Its current direct claim
`SomaticIO ≃ ImpulseResponse` is too strong, and its lens laws cannot hold for a
lossy 11D-to-soma projection. It contains `sorry` placeholders and must not be
treated as an active proof.

**Decision:** Define a small, no-`sorry` Lean kernel in the existing proof
architecture:

```text
EffectSpec σ α -> typed Universe σ -> causal response interpreter -> ObservationLens
```

The interpreter expresses how a selected substrate turns a declared forcing term
or observation request into a scale-appropriate response trajectory. It is not an
identity between Lean `IO` and a Green's function.

**Purpose:** Give USM's `POKE FIELD / J(t)`, scale selection, response time, and
future mirror lens a type-safe conceptual foundation without asserting new physics.

**Sources:**
- `paper/proofs/ScaleUniverse.lean`
- `paper/proofs/EmotionOntology.lean`
- `uat/RC1.1/inbox/SomaMachine/SomaUniverse.lean` (design sketch only)

**Actions:**
- [ ] Reconcile the 20/21 scale conventions before defining the new type.
- [ ] Define `EffectSpec`, a response interpreter contract, and an observation
   lens with lawful non-lossy semantics.
- [ ] Prove only structural/type-safety facts; keep physical theorems in their
   specific existing modules.
- [ ] Add a focused Lake target and build it with no `sorry`.

---

## ISS-025: USM human route — appraisal and context layer (CODA) — OPEN

**Tag:** Current USM specification / literature update

**Problem:** The human music-affect UI currently uses BRECVEMA mechanisms as
forcing lenses. Current music-emotion literature also emphasizes appraisal,
goals, personal relevance, context, individual history, and meaning as dynamic
contributors to an emotional episode. The same music can produce different
responses for different listeners or situations.

**Decision:** Do not replace BRECVEMA. Model it as a mechanism/input layer and
add a sourced, optional `APPRAISAL / CONTEXT` layer that weights or interprets
the episode:

```text
music features + BRECVEMA mechanism profile + appraisal/context
-> field forcing and parameter weighting
-> response trajectory and reportable experience
```

**Candidate appraisal dimensions:** novelty/familiarity, expectation, goal
relevance, goal conduciveness, certainty, coping potential, agency, lyrics or
other extra-musical context. These remain user-selectable educational inputs,
not diagnoses or claims of measured personal psychology.

**Source:** Lennie & Eerola (2022), *The CODA Model: A Review and Skeptical
Extension of the Constructionist Model of Emotional Episodes Induced by Music*,
Frontiers in Psychology, 13:822264, doi:10.3389/fpsyg.2022.822264.

**Actions:**
- [ ] Add CODA/appraisal provenance to the human music-affect Cheat Sheet and
   USM MVP specification.
- [ ] Design a compact appraisal/context panel that can coexist with multi-select
   BRECVEMA mechanisms.
- [ ] State which controls are sourced descriptions, simulation inputs, or future
   experimental variables.
- [ ] Update P9 literature review and bibliography after a focused source audit.

---

## ISS-026: USM human route — body-map and 8x8 field-grid renderer — OPEN

**Tag:** Current USM specification / visual instrument

**Problem:** The human music-affect UI needs a specific spatial rendering of
selected mechanisms and field state. A generic body wireframe is insufficient.
The same representation should later map naturally to an 8x8 pad/controller
surface, but no MIDI or Push integration is required now.

**Decision:** Define a hardware-neutral 8x8 field grid as the canonical spatial
control/rendering representation. The body map is a named human-scale view onto
grid regions; non-human scales can retarget the same grid to their own substrate.

```text
BRECVEMA + appraisal/context + field state
-> region weights on 8x8 field grid
-> body-map overlay in USM
-> future controller, OSC, audio, or projection mapping
```

**Evidence boundary:** Body-map descriptions must distinguish published
body-sensation findings, USF field interpretation, and unsupported artistic
placement. Do not present a one-to-one mechanism-to-body-region map as settled
fact without a source-specific audit.

**Candidate sources:**
- Nummenmaa et al. (2014), *Bodily maps of emotions*, PNAS.
- 2024 *Bodily Maps of Musical Sensations* research (verify exact bibliographic
   record and findings before implementation).
- P9 music-affect dynamics for the forcing and field-state side.

**Actions:**
- [ ] Audit the body-map papers and extract only defensible region/measurement
   claims.
- [ ] Define the 8x8 grid coordinate system, region names, aggregation rules,
   and visual encoding.
- [ ] Add stacked-region rendering for multi-selected mechanisms.
- [ ] Keep the web demo hardware-free; specify a future controller adapter only
   after the on-screen grid is accepted.

---

## ISS-027: Soma Field Operator stereoscopic projection — OPEN
{{Tags area.instrument, project.soma-field-operator, projection.3d}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=ISS-027-soma-field-operator-projection}}

**Epic:** [ISS-027-soma-field-operator-projection.md](prj/.adm/issues/ISS-027-soma-field-operator-projection.md)

Add a projector-facing stereoscopic output mode to the Soma Field Operator for
the Dangbei Atom, while retaining its existing browser UI and normal display
mode.

---

## ISS-028: Large issue-body convention — OPEN
{{Tags area.ops}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=}}

Define and validate the register-to-detail-file convention for issues whose
context, decisions, or sub-issues exceed the main register entry.

**Actions:**
- [ ] Specify the minimum metadata and reciprocal link required in a detail file.
- [ ] Define validation for `epic=<slug>` resolving to
   `prj/.adm/issues/<slug>.md` and the file resolving back to its register issue.
- [ ] Apply the convention to future large issues without duplicating register
   metadata into the detail file.

---

## ISS-029: Administration chat browser — OPEN
{{Tags area.ops}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=}}

Defer chat ingestion and browser design until the issue index is stable. The
issue browser remains focused on the canonical `ISSUES.md` register.

**Actions:**
- [ ] Define the canonical source, metadata, navigation, and retention rules for
   administration chats before adding them to the local browser.
- [ ] Remove `prj/.adm/chats/example-vlogs-interview-video-using-drone.md` when
   the chat design is implemented or the example is no longer needed.

---

## ISS-030: Zoomable hierarchy transition tables — OPEN
{{Tags area.instrument}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=}}

Replace one-off zoomable organism hierarchy level morphs with a table-driven
transition model that defines the mapping, interpolation, and controls for each
adjacent scale transition.

**Actions:**
- [ ] Define the transition-table schema from the working level-morph example.
- [ ] Apply the schema to every supported adjacent hierarchy transition.
- [ ] Validate continuity, controls, and visual semantics across the full scale
   range.

---

## ISS-031: Cheat-sheet coverage and build contract — OPEN
{{Tags area.papers, area.books}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=}}

Use the completed cheat-sheet slice to define and apply a shared source, build,
registration, and insertion contract for all required paper and book cheat
sheets.

**Actions:**
- [ ] Audit which papers and books require a cheat sheet and record coverage.
- [ ] Define the common source/build/insertion contract from the completed
   example.
- [ ] Implement the remaining cheat sheets through that shared contract.

---

## ISS-032: t-theory.org landing page and sticker QR destination — OPEN
{{Tags release}}
{{Fields date.created=2026-08-25, date.start=, date.end=, epic=}}

Make `https://www.t-theory.org/` the canonical public destination for sticker
QR codes, rather than a GitHub repository URL. The existing
`ITI-Theory/t-theory.org` GitHub Pages repository has `CNAME` and `index.html`;
its landing page needs the same immediate [T]-Theory orientation as the GitHub
organization profile and the `T` repository landing page.

**Actions:**
- [ ] Verify the GitHub Pages deployment and custom-domain resolution for
   `www.t-theory.org`.
- [ ] Publish a minimal `t-theory.org` landing page with the [T]-Theory identity,
   two-layer explanation, and primary public links.
- [ ] Update the sticker QR source to `https://www.t-theory.org/`, regenerate the
   affected sticker asset, and verify the destination by scanning it.
- [ ] Create `lib/images/` and add the validated `tt-qr-t-theory-org.*` assets
   before a separate, verified move/rename of existing QR assets to
   `tt-qr-github-t-theory.*`.

---

## ISS-033: Archive publication and print context curation — OPEN
{{Tags area.papers, area.books}}
{{Fields date.created=2026-08-26, date.start=, date.end=, epic=}}

`paper/archive/` contains durable source material alongside dated publication
snapshots and submission checklists. In particular, `PRINT-SPEC.md` documents
the [T]-Theory tetralogy, mark, sticker, and physical-print decisions, but its
QR destination is now superseded by ISS-032 and other operational content may
also be stale.

**Actions:**
- [ ] Audit the archive Markdown files and classify each as durable reference,
   current operational guide, or historical snapshot.
- [ ] Move or distil still-valid print, publication, and brand decisions into
   maintained Markdown documentation without silently carrying forward stale
   claims, dates, or destinations.
- [ ] Leave an explicit archive pointer or status note for retained historical
   records so their date and authority are clear.

---

## ISS-034: Paper script ownership and generated-content boundaries — OPEN
{{Tags area.ops, area.papers, area.books}}
{{Fields date.created=2026-08-26, date.start=, date.end=, epic=}}

`paper/scripts/` has accumulated build generators, validators, packaging,
translation, staging, and maintenance tools with uneven ownership and output
contracts. `build_lean_appendix.py` is still active: root and paper Makefiles
invoke it and `build_thesis.py` imports it, but it embeds hundreds of lines of
reader-facing Markdown in Python.

**Actions:**
- [ ] Inventory each script's caller, inputs, outputs, generated-file policy,
   and current release/build role.
- [ ] Identify obsolete, duplicated, or unowned scripts and decide whether to
   retire, consolidate, or document them.
- [x] Extract the Lean appendix's reader-facing Markdown into an appropriate
   maintained source/template while preserving the ordered Lean-file catalogue
   and existing build contract. (2026-10-03: `paper/filters/lean-include.lua`
   reads the `.lean` files; `build_lean_appendix.py`, `build_thesis.py`,
   `build_omnibus.py`, `build_atlas.py` and `build_fractal_books.py` are
   retired; see `docs/BUILD.md`.)
- [ ] Keep Makefiles as the canonical build graph; any replacement must avoid
   hard-coded duplicate source inventories and retain a focused regeneration
   check for the checked-in appendix source.

---

## ISS-035: Path-sensitive transition dynamics — OPEN
{{Tags area.theory, area.proofs, area.clinical}}
{{Fields date.created=2026-09-30, date.start=, date.end=, epic=}}

Extend the current attractor-and-barrier account of state transition with a
path-sensitive model. A transition may be limited not only by one high local
barrier, but by the cumulative action or coordination cost of many constrained
micro-transitions. This is an open theoretical and empirical question; it must
not be presented as an established clinical mechanism without evidence.

**Actions:**
- [ ] Distinguish the current potential/energy-landscape account from candidate
   minimum-action, stochastic-path, and path-integral formulations.
- [ ] Define the proposed state space, admissible paths, action functional, and
   observable predictions before changing papers or Lean theorems.
- [ ] Specify what data could distinguish a single-barrier explanation from a
   distributed path-cost explanation in trauma or overload transitions.
- [ ] Introduce the extension in the philosophy book as a clearly labelled open
   hypothesis, then decide whether it warrants a dedicated paper and formal
   development.

---

## ISS-036: Lean toolchain upgrade and remaining proof debts — OPEN
{{Tags area.proofs, area.ops}}
{{Fields date.created=2026-10-03, date.start=, date.end=, epic=}}

Status on 2026-10-03: the proofs build on Lean, Mathlib and physlib v4.31.0
(latest: v4.34.1). OSforGFF, GaussianField and BochnerMinlos are pinned to
commits written for v4.29.0 and need small local compatibility patches, now
recorded in `lean/patches/` (they previously lived only in `.lake/packages`,
so a fresh clone could not build). Upstream has since moved to v4.33.0-rc1
and rewritten the patched lines, so the patches are not upstreamable.
`perceptIsPropagatorPole_nostalgia` and `brainStemActivatesContagion` were
closed on 2026-10-03 (exact arithmetic: residual 673/2500 < 1; 23/25 > 0);
five real `sorry`s remain in three files.

**Actions:**
- [x] 2026-10-03: upgraded to Lean, Mathlib and physlib v4.33.0 (the newest set
   matching upstream OSforGFF, which targets v4.33.0-rc1); OSforGFF at upstream
   HEAD with a one-line patch submitted as mrdouglasny/OSforGFF#22; all 25
   libraries build with 0 errors and 0 lint warnings in our files;
   `lean/upgrade-build.sh` applies the patch after `lake update`.
- [ ] Move to v4.34.x when upstream OSforGFF does; drop `lean/patches/v4.33/`
   once #22 is merged. Original plan: upgrade Lean, Mathlib and physlib to v4.34.x and OSforGFF,
   GaussianField and BochnerMinlos to upstream commits for the same release;
   drop `lean/patches/` once upstream builds unpatched; full `lake build`.
   Low priority: a separate task, not before a release.
- [x] Reproducible from a clean clone: `bash lean/upgrade-build.sh` runs
   `lake update`, applies `lean/patches/v4.33/`, fetches the Mathlib cache and builds.
- [ ] Restate `euler_lagrange_BRECVEMA` (`BRECVEMAVariational.lean`): the
   current witness `0` does not satisfy `M ψ̈ = W ψ(t)` in general. Either
   assume the mass matrix is invertible and take `ψ̈ = M⁻¹ W ψ(t)`, or state
   it as a labelled axiom.
- [ ] Remaining `sorry`s: `BRECVEMAVariational.lean` (2: the above and
   `moduli_space_is_G2_homotopy`), `DyadicField.lean` (2: block-sum lemma and
   the `Field8` transfer of `dyadic_energy_coupling_lowers`), `SomaNetwork.lean`
   (1: `sft_ne_classical`, waiting on the `Field8` migration).
- [ ] Field8 Float→ℝ migration (see the ISS-009 follow-ups) unblocks the
   `DyadicField` and `SomaNetwork` debts.
- [ ] Optional good-citizen step: an issue or note to the OSforGFF author
   saying where the library is used (no code change needed).

---

## ISS-037: MOTHER/H-AL voice — OPEN
{{Tags area.app}}
{{Fields date.created=2026-10-03, date.start=2026-10-03, date.end=, epic=}}

Answers in the MOTHER terminal can be read aloud (SPEAK toggle, `/speak`,
`/stop`, Esc). H-AL uses the HAL 9000 Piper voice (campwill/HAL-9000-Piper-TTS,
private use only, model outside the repo) through the local bridge's
`POST /speak`; MOTHER and the fallback use the browser's Web Speech API.

**Actions:**
- [x] 2026-10-03: bridge `/speak` (optional Piper; `/health` reports `voice`),
   `voice.js` in the app, SPEAK toggle and slash commands, README setup.
- [ ] Speak the WHAT [T]-THEORY ADDS section on request (`/speak diff`).
- [ ] A licence-clean neural voice for public MOTHER (a stock Piper voice such
   as en_GB) if browser voices prove too uneven across platforms.
- [x] 2026-10-04: narrated tours: tour stops are spoken (ISS-038).

---

## ISS-038: soma-tour language and MOTHER/H-AL observatory mode — OPEN
{{Tags area.app, area.books}}
{{Fields date.created=2026-10-04, date.start=2026-10-04, date.end=, epic=}}

The design agreed on 2026-10-03 (see the session archive in `Me/archive/sessions/`):
answers carry a fenced `soma-tour` block of `- view:` / `say:` / `label:` /
`dwell:` steps or a one-line `tour: <preset>`; the app validates every step
against registry ids, drops unknown steps, and never executes anything.

**Done 2026-10-04:**
- [x] Spec and NotebookLM source: `docs/TOUR-LANGUAGE.md`, built with registry
   id tables by `make observatory-guide` (pandoc + `lib/format/observatory-ids.lua`).
- [x] Presets in `registry/tours/` (cell-to-cosmos, gravity, blue-rubber-ball,
   whats-different, textbook), validated by `scripts/generate.py`, which also
   validates the guide's example blocks.
- [x] App: `tour.js` parser, validator and player card; `#tour=<id>[&stop=n]`.
- [x] MOTHER/H-AL: OBSERVATORY toggle, prompt instruction, interception of
   the block, `/tour`, `/tours`, `/play` (WEB mode), narration with SPEAK.
- [x] Textbook: each chapter's Soma Machine box names its stop in `#tour=textbook`.

**Actions:**
- [ ] Author: upload `bld/app/observatory-guide.md` to the MOTHER and H-AL
   notebooks, then ask one question with OBSERVATORY on and judge the tour.
- [ ] Per worked example "Show me" tours in the textbook HTML (one block per
   example) if the chapter-level stops prove useful.
- [ ] More presets from Dist PROMPTS.md (one per audience section).

---

## ISS-039: Local MOTHER/H-AL fallback (retrieval + local model) — PARKED
{{Tags area.app, area.ops}}
{{Fields date.created=2026-10-04, date.start=, date.end=, epic=}}

NotebookLM (free) stays the main MOTHER and H-AL. A local fallback would answer
when the daily quota is used up or offline, and keep H-AL's private chats on
the machine. Advice recorded 2026-10-04 (see the session archive):

- **Approach:** retrieval, not training. Index the papers, books and chats;
  pass the best passages to a local model through Ollama (native Windows, not
  Microsoft software); answers cite file and page and are labelled LOCAL.
  The bridge already detects the NotebookLM quota error, so it can fall back
  automatically. Fine-tuning teaches style, not facts, and is not recommended.
- **Quality:** below NotebookLM on synthesis across papers, subtle physics and
  contradiction-finding (the UAT-style questions); close on everyday
  "what does the programme say about X" questions with a 32B model; fine for
  observatory tours at any size (invalid steps are dropped anyway).
- **Hardware** (prices early October 2026, Toppreise/swisshw.ch):
  - Current laptop (T550, 4 GB): 3B on the GPU or 8B on the CPU at
    1-2 minutes per answer; enough to prove the idea.
  - New PC around CHF 2,000: one RX 7900 XTX (24 GB, ~CHF 800-1,050) runs
    32B models; about 80-90% as useful as NotebookLM day to day.
  - 48 GB for 70B models: two new RX 7900 XTX, ~CHF 2,700-3,200 for the PC
    (1,200 W supply, two-slot board); or two used RTX 3090, ~CHF 2,000-2,300.
    New NVIDIA 48 GB is out of range (RTX 5090 32 GB alone ~CHF 4,100).
  - Middle option: the Gemini API free tier with the same retrieval
    (needs the internet; check current terms).

**Actions (when unparked):**
- [ ] Build the software on the laptop first: Ollama, embedding index of the
   corpus, bridge fallback with LOCAL labels; try it in real use.
- [ ] Decide on hardware from that experience (24 GB is the sensible step;
   48 GB only if the local model becomes the main MOTHER).

---

## ISS-040: Field Atlas print edition for bookfactory.ch, and plate-led layout — OPEN
{{Tags area.books}}
{{Fields date.created=2026-10-04, date.start=2026-10-04, date.end=, epic=}}

**Printer (author, 2026-10-04):** bookfactory.ch Premium Plus, Jumbo landscape
40 x 29.4 cm, Magno Satin 170 g, **black** Japanese silk cover, gold
embossing; 16-400 pages. (Earlier plan, 1-2 Oct: Lulu for every other book,
in black linen; Lulu has no A3.)

**Done 2026-10-04:**
- [x] `make -C Part2/book/field-atlas bookfactory`: same content as the A3
   edition at 406 x 300 mm (400 x 294 trim + 3 mm bleed; margins = A3 + bleed;
   full-page plates already reach the bleed). The target fails on an odd page
   count or more than 400 pages. First build: 200 pages.

**Actions:**
- [ ] Author: confirm bleed and safe zone in bookfactory's PDF-to-Book
   configurator (3 mm assumed); check whether they want single pages or spreads.
- [ ] Cover file (spine width from bookfactory for the final page count), or
   embossing text only if Premium Plus covers are unprinted.
- [x] 2026-10-04: plate-led level spreads, as specified by the author: the level
   opener alone on a right-hand page (centred title, scale and response time,
   equation, facts table); full-height triptych on the facing left-hand page;
   callout plate on the next right-hand page; then the text. All 31 levels
   verified on the correct side in both editions; Atlas now 254 pages.
- [ ] (superseded by the item above) Plate-led level spreads (brainstorm): each level
   opens on a right-hand page with the level table alone, designed as an
   artistic page; the image plates follow full page, starting on a left-hand
   page so plates face each other; the 4D / 8D / 11D triptych becomes three
   full pages (currently squeezed under the table, which clips the figures,
   e.g. Human / Vertebrate p. 59). Roughly 31 x 4-5 pages: about 300-330
   pages in all, within the 400 maximum.
- [ ] Companion volume (brainstorm, author to confirm): the theory book as a
   second A3 landscape volume read alongside the Atlas, with each Atlas level
   pointing to the theory pages to read with it, so leafing through the Atlas
   iterates through the theory chapters.

---

## ISS-041: [T]-Theory course book (textbook edition becomes the course) — OPEN
{{Tags area.books}}
{{Fields date.created=2026-10-04, date.start=, date.end=, epic=}}

**Decisions (author, 2026-10-04):**
- The Field Atlas stays the refined A3 reference and art book (ISS-040).
- The textbook edition becomes a **course book on [T]-Theory**: the Atlas's
  Part I theory and the ten ladder chapters combined, with elementary maths.
- Format: **A4 portrait** (printable at Lulu with the other books).
- Audience: **both** - a gentle main text for the motivated non-specialist,
  with "going further" boxes for the first-year university reader.

**Chapter plan (approved by the author 2026-10-05, working title "[T]-Theory: A Course"):**
- Part 0, Toolkit: M1 numbers, units and scale; M2 change (exponentials,
  derivatives); M3 accumulation (integrals, flux); M4 oscillation (oscillator
  equation, complex numbers, Euler); M5 vectors, fields, matrices and
  eigenvalues; M6 chance (distributions, normal curve, Boltzmann factor).
- Part I, The response grammar: 1 fields, waves, scale; 2 response and Green's
  functions; 3 (new) frequencies: Fourier, convolution, poles; 4 zooming.
- Part II, The ladder: 5-12 = the current chapters 3-10.
- Part III, Frontier and method: 13 eleven dimensions and M-theory (Atlas T4);
  14 the dark sectors (T5); 15 evidence and proof, QUANT-EXP-1 lab (T6).
- Every chapter: "maths you need" and "going further" boxes, Atlas
  cross-references, Soma Machine labs, worked homework with checked answers.
- Appendices: constants, glossary, Atlas cross-reference, credits (OpenStax
  attributions). About 330 A4 pages.

**Earlier proposed shape (superseded by the plan above):**
- Part 0, maths toolkit (just in time, visual): functions, exponentials and
  logs; derivatives and integrals as area and flux; the oscillator equation;
  complex numbers; vectors and fields; eigenvalues; probability and the
  Boltzmann factor. Chapters open with "maths you need: toolkit §x".
- Part I, theory: Atlas Part I to course standard (worked examples, homework,
  machine-checked answers).
- Part II, the ladder: the current ten chapters, anchored to Atlas levels and
  pages.
- Part III, evidence and method: Lean, falsifiers, QUANT-EXP-1 as a lab.
- Labs: Soma Machine tours and demos throughout.

**Constraints:**
- OpenStax science books used so far are CC BY 4.0. The OpenStax Calculus
  volumes are believed to be CC BY-NC-SA: verify every licence before reuse;
  write the maths toolkit in our own words, borrowing only from CC BY books.
- Keep the toolkit a toolkit (size target to agree; the whole course could
  reach 400-600 pages).
- The course is the teaching spine; the Fractal Thesis books give depth.

**Related idea (author's concept chat, `Me/chats/notebooks/openstax-concept/`):**
a `{{Visualize | context | structural-type | domain | params}}` macro: figures
declared in the text, generated by code (a Lua filter reads the macro; a
figure script draws from equations; outputs checked like the answers). No
AI-drawn physics figures.

**Actions:**
- [ ] Draft the chapter plan for author review.
- [ ] Licence check of each OpenStax maths source.
- [x] A4 defaults, parts (3b58411); generated numbering with pandoc-crossref (7ce084a).
- [x] Visualize macro (docs/VISUALIZE.md), toolkit M1-M6, chapter 3 Frequencies (5 Oct, c9228e5).
- [x] Chapter 4 zooming (T3), Part III 13-15 (T4-T6), Appendix F Atlas cross-reference, Visualize retrofit of 5-8 and 10-12, glossary (5 Oct, to 03:30).
- [ ] Author read-through; chapter-opening banners for M1-M6, 3, 4, 13-15; Visualize for chapters 1, 2, 9; release decision.

---

## ISS-042: Collected Works side files (Me/chats/notebooks/The_Soma-Field_Collected_Works) — OPEN
{{Tags area.app, area.proofs, area.books}}
{{Fields date.created=2026-10-05, date.start=, date.end=, epic=}}

Audit 2026-10-05 of the 50 files exported with the Collected Works chat
(2026-09-30). Most are earlier versions of work U now does differently or
better: the operator specs v1-v6, `main*.js`, `setup-soma-app*.sh`,
`style*.css`, the visual engines and test harnesses (the app in
`apps/instrument/visuals/soma-field-operator/`, ISS-026); `soma-server.js`
and `soma-midi-bridge.js` (`apps/instrument/server.py`, `midi_input.py`,
`osc_output.py`); `soma-machine-fmhn.py` (`field_render.py`); the AI loop,
bridge and coprocessor spec (partly the MOTHER bridge, ISS-037/038).

**Lean files (none in the proof build):**
- `SomaUniverse.lean`: already handled. A copy is in `uat/RC1.1/inbox/`; its
  11D isomorphism is the proved `somaField_iso_mtheory`
  (`MTheoryIsomorphism.lean`); its `SomaticIO ≃ ImpulseResponse` claim is
  recorded above as too strong.
- `SomaPhilosophy.lean` (Spinoza, Kant) and `SinnfeldOntology (1).lean`
  (Gabriel's fields of sense, Russell's epochs): not usable as written. They
  are headed "verified" but carry four `sorry`s, and three theorems are false
  or unprovable as stated: `raw_noumenon_latent` (its hypothesis is unused;
  an 11D observer yields Thought, not Extension), `spinozist_parallelism`
  (asks for an equality of two distinct types), `philosophy_time_invariance`
  (two Sinnfelder can share the rationality flag yet differ in rules).

**Actions:**
- [x] 2026-10-05: `paper/proofs/SomaPhilosophy.lean` (core Lean, 10 theorems,
   no axioms, no sorries): Russell's three books in time order over the band's
   thinkers; field-of-sense zoom keeps rules, epoch and rationality; Spinoza
   parallelism without reduction; Kant's appearance and the unrecoverable
   noumenon. In the default build and the Lean appendix (now 26 files).
- [ ] (done above) Optional small, honest Lean file for the philosophy band: Russell's
   epochs as an ordered type matching `registry/eras.yaml`'s philosophy band,
   and the true statement that `philosophyZoom` preserves rationality
   (`rfl`). Label `kernel-verified` only for what it proves.
- [ ] Dual-emotion model (`ttheory-dual-emotion-spec-v2.md`): occurrent
   emotion only at biological scales, structural contours elsewhere
   (Davies, Barrett). The claim boundary is already in
   `SOMA-MACHINE-MVP.md`; decide whether the typed version (Lean types, HUD
   retyping) is wanted.
- [ ] UI completeness claim (`ttheory-ui-completeness-proof.md`, prose only):
   either state and prove a precise control-to-state surjectivity, or drop the
   word "proof".
- [ ] Instrument extras not in U, author to decide: ERAE touch controller over
   MIDI 2.0 via Bome (`soma-erae-bome-routing (1).js`); foot-pedal zoom
   (`soma-pedal-zoom (1).sh`); Conky desktop status panel
   (`soma-machine-conky.conf`); TouchDesigner Mandelbulb render
   (`soma-touchdesigner-mandelbulb (1).py`).
- [ ] Workflow extras: Neovim config (`soma-neovim-init.lua`; the MOTHER shell
   already offers Neovim when installed); a Markdown task engine
   (`tasks-makefile.md`; ISSUES.md and the issue tooling may already cover
   it); `soma-developer-tips.md` (eight-knob SomaFX strip, ME-MD-MAKE flow).
- [ ] `ttheory-cheatsheets-vault.md` (11 book assets, equations, field notes):
   check against the current cheat-sheet sources (ISS-031) for anything not
   carried over.

---

## ISS-043: Upgrade pandoc and pandoc-crossref together (after the release) — OPEN
{{Tags area.build}}
{{Fields date.created=2026-10-05, date.start=, date.end=, epic=}}

The course book now uses pandoc-crossref (BUILD.md rule 4b). Installed:
pandoc 3.10.2 (Chocolatey) with pandoc-crossref 0.3.25 (built on 3.10.1;
`%LOCALAPPDATA%\Pandoc\pandoc-crossref.exe`). It warns about the patch-level
mismatch; output was verified word for word against the pre-crossref build.

Chocolatey offers pandoc 3.12.0, but the newest pandoc-crossref (0.3.25a,
6 Sep 2026) is built on pandoc 3.11. Do not upgrade before the release:
UAT candidates were built with 3.10.2.

**Actions (after release):**
- [ ] Pick the pandoc version the newest pandoc-crossref is built on; install both.
- [ ] We keep no custom pandoc templates (only header includes), so pandoc's
      built-in LaTeX and HTML templates change with it: rebuild every book,
      paper and the Atlas and diff the PDF text (pdftotext word diff) before
      and after.
- [ ] Update the version line in BUILD.md rule 4b.

---

## ISS-044: Admin before release: front door, command handlers, HAL vocabulary, .OBSOLETE, chat process — OPEN
{{Tags area.ops, release}}
{{Fields date.created=2026-10-06, date.start=2026-10-06, date.end=, epic=}}

Agreed with the author on 6 Oct 2026 (chat `write_a_book`), before UAT. A new AI
session started blind: the auto-loaded instruction files are stale (30 May),
HAL is not installed in this machine's Git Bash, `HAL prime` reads stale
sources, and the chat-ingest process exists in three competing forms.

**Decisions:**
- **Front door = README.md**, for people and AI alike (no separate files where
  avoidable). It documents how we work, including the Autopilot rules from
  T/AGENTS.md. `.github/copilot-instructions.md` and AGENTS.md shrink to
  "read README.md and follow it" plus AI-only rules.
- **Makefile = command handler.** Every repeatable action is a Make target,
  even if it only runs a script; `make help` lists them. Widens BUILD.md rule 1
  from builds to commands.
- **HAL = dispatcher across repos and devices.** Noun then verb, two levels
  max, few shared verbs, `HAL help` is the one command list, `HAL context`
  sets a default noun (auto-detected, always shown), AI always types the full
  form. HAL calls Make targets. Design note: T.Dot/DESIGN.md.
- **Autopilot** (propose, wait, go) stays available, **default off**.
- **HAL uses Me/Ops/tools** (todo-admin, voice-admin) when available.
- **`.OBSOLETE` suffix** (end of name, file or directory) = kept for history,
  do not read, build or cite; search tools and builds skip it. Fast-changing
  facts are pointed to, never copied.
- **Chats**: one process in Me/chats/Makefile (`ingest`, `stage`, new
  `copilot`), one front-matter header, landing in `chats/Inbox` with
  `status: raw`; md2chat's checker becomes a Make target.
- **Tangents** in chat: always suggest doing it now or issuing it.
- U.Dot's laptop `bin/HAL` and `bin/HAL0` are WSL symlinks (git-ignored,
  unreadable from Windows), not placeholders; documented in U.Dot README.

**Actions:**
- [x] T.Dot/DESIGN.md: HAL vocabulary (T.Dot 7268798).
- [x] Standards: working rules in T.Ops naming.md (70bd529); BUILD.md rule 1;
      `.ignore` and `search.exclude` for `*.OBSOLETE` in U (7f7e476).
- [x] U/README.md front door (4e877b4); T/README.md front door for all repos (T dc9d910).
- [x] U and T copilot-instructions.md and T/AGENTS.md now point to the READMEs (dcbd286, T dc9d910); Autopilot default off.
- [ ] **HAL on Git Bash** (analysed 6 Oct; HAL was written for Linux; WSL rejected,
      VirtualBox later for the Linux parts). One implementation, bash, everywhere:
  - [x] HAL0 detects the platform once (`HAL_OS` = linux, wsl, termux, gitbash);
        each command declares where it works; `help` shows only what works here,
        others answer "needs Linux (VirtualBox)".
  - [x] HAL.bat keeps its concept, not its code: a three-line `HAL.cmd` launcher
        that runs the bash HAL through Git Bash, so `HAL` works from cmd and
        PowerShell; old HAL.bat becomes `HAL.bat.OBSOLETE` (its `setx PATH`
        is a known truncation trap).
  - [x] HAL1 gated by platform: on Git Bash `init` never overwrites a file
        (today it would replace ~/.bashrc with the Ubuntu one, silently, since
        `ln -s` copies on Git Bash); `boot` and `dim` need Linux.
  - [x] One bash standard on every system: `bash/common.sh` (aliases, `prj`,
        `gitdirs`, `timestamp`, `~/.local/bin` on PATH) sourced by a small
        `bash/<platform>/bashrc`; `~/.bashrc` is one `source` line. First merge
        the live ~/.bashrc (24 lines ahead of U.Dot) into U.Dot; tidy U.Dot's
        older parts (README says KDE, DESIGN says XFCE4).
  - [ ] (moved to ISS-045) `HAL context` from `prj`/.prj; install on the laptop.
- [x] HAL: dry run (`-n`), HAL0-lib, `copilot start|save|wrapup`, `chat new|list`;
      `prime` = `copilot start` (T.Dot 42e539e..86cf484).
- [x] HAL: `mother ask`, `hal ask` (U `make ask`, app's Bridge, one 30 s pace; U 1d1363e, U.Dot 2c119e2).
- [ ] (moved to ISS-045) further HAL nouns and the MOTHER panel path.
- [x] Me/chats/Makefile: `copilot`, `check`, `help`, Windows sh; exports in `Inbox/`;
      md2chat `.OBSOLETE` (Me 55b7817, dd0b7cc). `make check` lists 5 old Inbox
      files without a header (limbic-hop, limbic-hop2, notebooklm, opencyc1, self-aware).
- [x] Stale-file review with the author, item by item (6 Oct): kept U
      paper/FIELD-NOTES.md; PROCESS session primer → pointer (cc65823);
      CURRENT.md → one screen, old file `.OBSOLETE`, open items → ISS-046,
      guardrails → README (b80ef39); philosophy brief and outline `.OBSOLETE`,
      decisions → books/T-Theory/philosophy/README.md (dd244b1);
      APP-ATLAS-DESIGN `.OBSOLETE`, principles → operator app README (cf91cc3);
      docs/agent/README.md index (192884b); Me/Dot removed (Me 59607e2);
      Me/Ops/tools tidied, LeanScribe `.env` untracked (Me 5853416); duplicate
      AI-NOTES removed (Me 377cb66); June-August chat export and
      chats/notebooks tracked, chats/tmp ignored (Me 666d256, f44ce72);
      T.Dot FIELD-NOTES `.OBSOLETE` (T.Dot 0a1f5e7); release-check section 15
      (`paper/scripts/check_obsolete_refs.py`). Earlier: Me/Ops/sessions/ToSonnet4.6.md.
- [ ] Then the scope check (`HAL uat scope`) and UAT (Dist README step 5).
- [ ] Later (not this round): one Python directory, moving the existing scripts.

---

## ISS-045: HAL next steps (parked 6 Oct 2026) — OPEN
{{Tags area.ops}}
{{Fields date.created=2026-10-06, date.start=, date.end=, epic=}}

Parked by the author after the Git Bash work of 6 Oct (ISS-044). HAL now runs
on Git Bash with platform detection, capability guards, dry run (`-n`),
`HAL.cmd`, `copilot start|save|wrapup`, `chat new|list`, `mother ask`,
`hal ask`; one bash standard in U.Dot. Design: T.Dot/DESIGN.md.

**For the author:**
- [ ] Install on the laptop, in Git Bash: `~/prj/git/ITI-Theory/U.Dot/bin/HAL1 -n init`,
      read the `[would]` lines, then without `-n`. It backs up `~/.bashrc`
      (`~/.bashrc.bak-<date>`), makes it one `source` line, writes three wrappers
      into `~/.local/bin` and adds `T.Dot\bin` to the Windows user PATH.
- [ ] First real `HAL hal ask "..."` (uses one NotebookLM chat credit).

**Next HAL work:**
- [ ] `HAL uat scope`: create or reuse a private `nlm-uat` notebook, upload the
      chat files and candidates (Dist README step 5), ask the scope questions
      paced. Until then the scope check is done by hand in the NotebookLM web UI.
- [ ] `HAL context <noun>` built on `prj <dir> [vscode|neovim] [dark|light]` and
      the `.prj` files; auto-detect `TERM_PROGRAM=vscode`; shown in every output.
- [ ] `HAL todo` and `HAL voice` from Me/Ops/tools (todo-admin, voice-admin).
- [ ] MOTHER panel H-AL mode and the bridge honour the same pace as `ask.py`
      (`~/.cache/hal/nlm-last`), so app and terminal share one quota guard.
- [ ] Route the remaining state-changing commands (`sync`, `provision`, the
      `tablets`, `wsl2`, `host` modules) through `_hal_do`, so `-n` covers all.
- [ ] `tablets` guard: relax `avahi-resolve` once tested (cached IPs work without it).
- [ ] Generate `HAL help` from the scripts (now hand-written usage blocks).
- [ ] Test on a VirtualBox VM and the Linux mini PC (`HAL_OS=unix`), then the tablets.
- [ ] Laptop: remove the old WSL symlinks `U.Dot/bin/HAL`, `bin/HAL0` (git-ignored).
- [ ] Me/chats/Makefile hard-codes `BASE_DIR := /c/Users/alist`; use `$(HOME)`.

---

## ISS-046: Open items carried over from the old CURRENT.md (1-6 Oct 2026) — OPEN
{{Tags area.papers, area.books, area.app, area.proofs}}
{{Fields date.created=2026-10-06, date.start=, date.end=, epic=}}

CURRENT.md was rewritten to one screen on 6 Oct (stale-file review, ISS-044);
the full old file is `docs/agent/CURRENT-2026-10-01-to-06.md.OBSOLETE`. Each
open item was checked against the repo and ISSUES.md; these were not tracked
anywhere else.

**Checked and done (for the record):** exact Planck 2018 values in P21/P22
(0.6847, 0.2645) and matching Lean bounds; P22's direct-detection null
prediction; Fractal Thesis and paper omnibus hardening (1 Oct); Atlas plates for
all 31 levels; no "no sorries" claims left in the appendix or books.

**Papers and proofs:**
- [ ] Lean doc comments in `G2Compactification.lean` and `LocalGR.lean` say
      `dΩ_Λ/dz = 0`; the correct statement is that Λ (ρ_Λ) is constant
      (Ω_Λ itself changes with z). Comments only; the proofs are unaffected.
- [ ] OSforGFF pull request mrdouglasny/OSforGFF#22 awaiting review.
- [ ] Optional: `git worktree remove ../U-lean-v433`.

**App (ideas from the 1 Oct notebook review and the design note
`docs/agent/APP-ATLAS-DESIGN.md.OBSOLETE`; its design principles are in the
app README):**
- [ ] A display-mode axis `4d-baseline | 7d-usf-field | 8d-life | 11d-mind` in
      `operator-theory.yaml` (the app has `dim=4|8` today).
- [ ] A gravity view pairing a baseline GR render with the Green-function render.
- [ ] Mind rank N(σ) beside physical scale; the user source term J_user(t) as
      a control; a benchmark suite for validation. Theory data stays out of
      browser JS.
- [ ] Type guard (on by default): each level declares which layers its type
      admits. With the guard off the user may add any layer anywhere (feelings
      in a rock) and the app shows a red `ILL-TYPED` banner naming the rule.
      To make that honest, generate a small Lean file from the registry (one
      inductive per level's admissible layers) so the rejection is a real type
      error. Links to Sherlock.
- [ ] Sherlock concept registry `registry/concepts/<id>.yaml`: concept,
      ontology class (OpenCyc/OWL), Lean type (Mathlib, PhysLib or programme),
      proof status, papers, levels, so that gaps become visible.
- [ ] Visual rhymes: renderers may share motion styles across levels (sliding
      plates for `geological`, ring/belt debris for `orbital-system`), badged
      as visual analogy (`INTERPRETIVE`); the physics differs.
- [ ] Public app at https://www.t-theory.org/app/ (first published 6 Oct from
      U 424c0a9 into ITI-Theory/t-theory.org, `vite build --base=./`, by hand).
      Make it `make app-publish` (build, scan, copy, commit, push), and leave
      the private MOTHER notebook link (`notebook.google.com/notebook/16368cb3…`)
      out of public builds; MOTHER is local-only, so the panel stays offline there.

**Books and Atlas:**
- [ ] Each Fractal Thesis book: a domain introduction spread (specialist label,
      G-ID, zoom note); a per-book G-ID registry; "61 decades of magnitude" as
      the headline with the scales as tick marks.
- [ ] Field Atlas: Physical / Field / Mind parallel layout; notebook figures 1,
      2, 4, 5 only if redrawn and badged `INTERPRETIVE`.
- [ ] Course book: Visualize for chapter 9 (needs a flock primitive).

**Quarantined** (never presented as results; now also in README's rules): the
claim that autism is pre-verbal C-PTSD (at most a research question); the
C-PTSD pilot protocol (needs ethics, consent and safeguarding first); the
post-operative case (N = 1 field note); NotebookLM's "verified", "zero
sorries" and "proves" statements.

Not now (author, 1 Oct): completing *Phase Dot*.

