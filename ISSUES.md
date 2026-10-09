---
tags: area.app, area.build, area.instrument, area.ops, area.papers, area.books, area.theory, area.proofs, area.clinical, area.visualize, project.soma-field-operator, projection.3d, release, uat
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

## ISS-012: Add lean-appendix to lake — CLOSED

**Closed 2026-10-08:** Duplicate of ISS-017. `bin/release-check` section 4 verifies that the appendix embeds the current Lean sources; `make lean-appendix` regenerates it. Auto-regeneration inside a check was ruled out.

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

## ISS-014: Phase 2 research — Path-Dependence in Moduli Space — CLOSED

**Closed 2026-10-08:** Merged into ISS-035 (path-sensitive transition dynamics), together with ISS-014.

From paper section "Open Research Problems" (P11 zoomable-somatic-field).

Dissonance is path-dependent (a Neapolitan 6th resolving upward ≠ same pitch approached
differently). Current `manifold_coords.py` treats it as a scalar point.

**Fix:** path $\gamma: [0,1] \to \mathcal{M}$ through G₂ moduli space with monodromy
recording path-history. Requires `GeographicSomatic.lean` (P16, not yet written).

**Blocking:** Phase 2 / post-release. Requires ISS-016 (GeographicSomatic.lean).

---

## ISS-016: Write GeographicSomatic.lean — CLOSED

**Closed 2026-10-08:** Merged into ISS-035 (path-sensitive transition dynamics), together with ISS-016.

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

## ISS-017: lean-appendix auto-regeneration in release-check — CLOSED

**Closed 2026-10-08:** Duplicate of ISS-012; same resolution (release-check section 4 verifies freshness; `make lean-appendix` regenerates).

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

## ISS-021: Shared Omnibus Document Model — CLOSED

**Closed 2026-10-08:** Done: `paper/OMNIBUS_DOCUMENT_MODEL.md`, `paper/FORMAT.md`, `books/T-Theory/defaults/fractal-manifest.yaml` and the two-level master TOC implement the model. The generated synthesis-table item moved to ISS-034.

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

## ISS-022: Omnibus Build Modularity Evaluation — CLOSED

**Closed 2026-10-08:** Done: `build_fractal_books.py` is gone; the Fractal Thesis builds with Make + pandoc + `filters/ttheory-assemble.lua` (1 Oct).

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

## ISS-023: C2 Vol II exceeds Lulu 800-page cap — CLOSED

**Closed 2026-10-08:** Done: Vol I 726 pages, Vol II 693 pages, both under the 800-page Lulu cap; release-check section 13 passes.

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

## ISS-028: Large issue-body convention — CLOSED
{{Tags area.ops}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-09, epic=}}

**Closed 2026-10-09:** Done: the convention is in README.md (Issue register) and the
front matter of ISSUES.md; `bin/issues-check` (lib/format/issues-check.lua) validates tags,
fields and that each `epic=` names `prj/.adm/issues/<epic>.md` which links back
(ISS-027 and ISS-047 follow it). It now also runs as release-check section 18; it had
not been run, and an unregistered tag (`area.visualize`, ISS-051) had slipped in.

Define and validate the register-to-detail-file convention for issues whose
context, decisions, or sub-issues exceed the main register entry.

**Actions:**
- [ ] Specify the minimum metadata and reciprocal link required in a detail file.
- [ ] Define validation for `epic=<slug>` resolving to
   `prj/.adm/issues/<slug>.md` and the file resolving back to its register issue.
- [ ] Apply the convention to future large issues without duplicating register
   metadata into the detail file.

---

## ISS-029: Administration chat browser — CLOSED
{{Tags area.ops}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Superseded by ISS-049 (chats out of Me) and the Me/chats process; the example chat in `prj/.adm/chats/` was removed.

Defer chat ingestion and browser design until the issue index is stable. The
issue browser remains focused on the canonical `ISSUES.md` register.

**Actions:**
- [ ] Define the canonical source, metadata, navigation, and retention rules for
   administration chats before adding them to the local browser.
- [ ] Remove `prj/.adm/chats/example-vlogs-interview-video-using-drone.md` when
   the chat design is implemented or the example is no longer needed.

---

## ISS-030: Zoomable hierarchy transition tables — CLOSED
{{Tags area.instrument}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Done: `registry/paths/` holds 58 transition files in 10 paths with the preserves/adds/claim schema.

Replace one-off zoomable organism hierarchy level morphs with a table-driven
transition model that defines the mapping, interpolation, and controls for each
adjacent scale transition.

**Actions:**
- [ ] Define the transition-table schema from the working level-morph example.
- [ ] Apply the schema to every supported adjacent hierarchy transition.
- [ ] Validate continuity, controls, and visual semantics across the full scale
   range.

---

## ISS-031: Cheat-sheet coverage and build contract — CLOSED
{{Tags area.papers, area.books}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Superseded: cheat sheets became the 15 registered four-page booklets (release-check section 12); the old cheatsheets are `.OBSOLETE`.

Use the completed cheat-sheet slice to define and apply a shared source, build,
registration, and insertion contract for all required paper and book cheat
sheets.

**Actions:**
- [ ] Audit which papers and books require a cheat sheet and record coverage.
- [ ] Define the common source/build/insertion contract from the completed
   example.
- [ ] Implement the remaining cheat sheets through that shared contract.

---

## ISS-032: t-theory.org landing page and sticker QR destination — CLOSED
{{Tags release}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Done: www.t-theory.org is live on GitHub Pages with the custom domain (6 Oct); QR assets `tt-qr-t-theory-org.{svg,png}` and the print version are in `lib/images/sticker/`.

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
- [x] Inventory each script's caller, inputs, outputs, generated-file policy,
   and current release/build role.
      9 Oct inventory of paper/scripts (33): 26 run by make or release-check.
      No caller: `load_opencyc.py`, `query_cyc.py`, `validate_cycrefs.py` (OpenCyc
      in TypeDB via docker compose; owner Sherlock, ISS-046: next, validate the
      registry's ontology classes with them); `plot_field.py` + `soma_midi.py`
      (BRECVEMA field plots; candidates for Visualize primitives, ISS-051);
      `translate_queue.sh` (resumable translation runner for translate_papers.py;
      run by hand). Retired: `sync_dist.py.OBSOLETE` (= `make dist`),
      `translate_omnibus.py.OBSOLETE` (= `make translate-omnibus`).
- [x] Identify obsolete, duplicated, or unowned scripts and decide whether to
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

- [ ] (from ISS-044) One Python directory: move the existing scripts there.
- [ ] (from ISS-021) Move generated registry views such as the synthesis table
      out of handwritten sources.
---

## ISS-035: Path-sensitive transition dynamics — OPEN
{{Tags area.theory, area.proofs, area.clinical}}
{{Fields date.created=2026-09-30, date.start=, date.end=, epic=}}

**Merged 2026-10-08 from ISS-014 and ISS-016:** dissonance is path-dependent
(a Neapolitan sixth resolving upward is not the same pitch approached
differently), but `manifold_coords.py` treats it as a point; the fix is a path
γ: [0,1] → M through the G₂ moduli space with monodromy recording the history.
`GeographicSomatic.lean` (not yet written; P16 is now built) should define
`GeoField`, path-integral machinery for path-dependent coordinates, and the
monodromy of the holonomy connection.

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
- [x] Speak the WHAT [T]-THEORY ADDS section on request (`/speak diff`). Done 9 Oct
      (mother.js: the last compare answer's section, in the current persona's voice).
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
- [x] (9 Oct: loaded into MOTHER and HAL-UAT with `make -C Me/notebooklm load ... GROUPS=guides`) Author: upload `bld/app/observatory-guide.md` to the MOTHER and H-AL
   notebooks, then ask one question with OBSERVATORY on and judge the tour.
- [ ] Per worked example "Show me" tours in the textbook HTML (one block per
   example) if the chapter-level stops prove useful.
- [x] More presets from Dist PROMPTS.md (one per audience section). Done 9 Oct:
      `for-physicists`, `for-neuroscientists`, `for-doctors`, `for-musicians`,
      `for-engineers` (5-7 stops each, pokes where they help; therapists have
      `hal-therapist`, `hal-consulting-room`, `hal-gestalt`). All stops render.

---

## ISS-039: Local MOTHER/H-AL fallback (retrieval + local model) — CLOSED
{{Tags area.app, area.ops}}
{{Fields date.created=2026-10-04, date.start=, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Superseded by ISS-048 (self-hosted HAL: open model plus grounded chat).

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

- [x] Triptych panels (L*.1) fixed at the source (author review 8 Oct, printed
      pages 70-83): today each panel is a narrow centre slice of one landscape
      app capture, so wide subjects are cut (dyad: two people at the edges;
      human: off-centre, halo cut; brain: wider than the slice, the red HEAD
      panel cut). Plan: (1) capture each dimension (4D, 8D, 11D) separately in
      an upright viewport; (2) the app frames the subject for any aspect ratio
      (also needed for tablets in portrait, ISS-047); (3) captures without UI
      panels or labels (`ui`/`labels` off): graphics only, labels stay in the
      Atlas captions and keys. Keep triptych plus detail page per level; one
      full page per dimension only for a few showcase levels, if wanted. The A3
      PDF is behind its sources; recapture and rebuild before print.
      Done 9 Oct (code): `capture.mjs --portrait` writes upright captures to
      `atlas-plates-portrait/`, framed on the rendered subject (one frame per
      level for all three dimensions); `plates.py` uses them whole; label
      sprites drawn by renderers now obey `labels=off` (the CEMI panel).
      App: 11D availability in one rule; the brain is exempt (author, 9 Oct);
      levels off the universal ladder take the nearest ladder coordinate by
      length scale (they had sigma 0, which disabled their 11D). At the
      quantum scales the third panel says there is no 11D view.
      Done 9 Oct (fb17cd4, 34b04cc): upright per-dimension captures framed on the subject; author to check printed pages 70-83.
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
- [ ] Author read-through; chapter-opening banners for M1-M6, 3, 4, 13-15; release decision. (Visualize for chapters 1, 2 and 9 done: 1 and 2 earlier, 9 on 9 Oct.)

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

## ISS-044: Admin before release: front door, command handlers, HAL vocabulary, .OBSOLETE, chat process — CLOSED
{{Tags area.ops, release}}
{{Fields date.created=2026-10-06, date.start=2026-10-06, date.end=2026-10-08, epic=}}

**Closed 2026-10-08:** Done. Remaining items live elsewhere: HAL next steps in ISS-045, scope check and UAT in ISS-047, one Python directory in ISS-034.

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

**8 Oct (RC3 UAT notes, ISS-047):** HAL installation on the tablets is on hold;
the Soma Machine in a full-screen browser may replace the tablet setup. HAL
stays useful for the laptop and for cloud machines.

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
- [x] Me/chats/Makefile hard-codes `BASE_DIR := /c/Users/alist`; use `$(HOME)`.
      Done 9 Oct (Me d61bd47): `BASE_DIR` from `$(HOME)`, forward slashes.

- [ ] `HAL` is not on the PATH in a plain (non-login) Git Bash: sessions call
      `U.Dot/bin/HAL1` directly (9 Oct). Part of the install step above.
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
- [x] (8 Oct, comments only; formal statements unchanged; see ISS-047 P21 Sherlock)
      Lean doc comments in `G2Compactification.lean` and `LocalGR.lean` said
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
      9 Oct, v0: `registry/concepts/` (23 concepts: the 8 emotions and 8 BRECVEMA
      mechanisms with their OpenCyc classes from EmotionOntology's CycRef
      interpreter, and 7 central theorems), `make concepts`
      (paper/scripts/check_concepts.py: real proof status from the source, gap
      table), release-check section 19 (fails on broken references or a label
      the proof does not support). Next: ontology classes for the 7 programme
      concepts (author: OpenCyc or the programme's own OWL), more concepts
      (level by level), the Lean types side of the map (Mathlib/PhysLib), and the
      type guard below generated from the same registry.
      App (9 Oct): SHERLOCK panel per level (tally and list: ontology class, Lean name,
      PROVED / SORRY / AXIOM / DEFINED, papers), from the same status code.
- [ ] Sherlock finding, 9 Oct: none of the 16 OpenCyc constants in
      EmotionOntology.lean's CycRef interpreter exist in OpenCyc (checked against
      the OpenCyc OWL, 239,119 constants): `#$Joy-Emotion` etc., and the predicates
      `#$emotionalBlend`, `#$emotionalInhibition`; `#$causes` exists only typed
      (`causes-SitSit` ...). Real classes: Happiness, Sadness, Fear, Anger, Disgust,
      Surprise, Anticipation-Feeling, ReflexiveAction, Expectation,
      AestheticDiscrimination; no match for trust, entrainment, conditioning,
      contagion, imagery, episodic memory. The registry now uses the real classes
      (the Lean string kept as `lean_cycref`); `make concepts` fails on any class
      that is not an OpenCyc constant. Author decides: change the Lean strings
      (and the CycRef examples quoted in the papers and the omnibus) to real
      constants, or define the missing ones as the programme's own OWL classes.
- [ ] Visual rhymes: renderers may share motion styles across levels (sliding
      plates for `geological`, ring/belt debris for `orbital-system`), badged
      as visual analogy (`INTERPRETIVE`); the physics differs.
- [x] Public app at https://www.t-theory.org/app/ (first published 6 Oct from
      U 424c0a9 into ITI-Theory/t-theory.org, by hand). `make app-publish`
      (DRY=1 first) now builds, checks for private material, copies, commits
      and pushes (8 Oct). The MOTHER notebook link in the build is the
      programme's public notebook (WEB mode, mother/README.md), not a leak;
      the check rejects the private notebook ids from mother.local.json.

**Books and Atlas:**
- [ ] Each Fractal Thesis book: a domain introduction spread (specialist label,
      G-ID, zoom note); a per-book G-ID registry; "61 decades of magnitude" as
      the headline with the scales as tick marks.
- [ ] Field Atlas: Physical / Field / Mind parallel layout; notebook figures 1,
      2, 4, 5 only if redrawn and badged `INTERPRETIVE`.
- [x] Course book: Visualize for chapter 9 (needs a flock primitive). Done 9 Oct:
      primitive `flock` (Vicsek); the chapter opener is now declared in the text and
      checks the quoted orders (0.99 at noise 0.5, 0.17 at 4.0) on every build.
- [x] (8 Oct: wired into the domain books, volumes and omnibus; the filter draws
      figures itself for one-step builds; first figures: physics (retarded response,
      `lean:TemporalDynamics.retardedDecayFactor_isCausal`) and neuroscience (Hopfield
      landscape, `lean:Hopfield.energy_at_fixed_point`). More figures: open.)
      Visualize beyond the course book (8 Oct): 66 `{{Visualize}}` figures in 20
      course chapters, none in the Fractal Thesis books, papers or Field Atlas
      (the filter is only in the course build). Wire `lib/format/visualize.lua`
      into the book defaults and reuse course figures (convolution, Kuramoto,
      Fourier, energy landscape) in the physics and neuroscience books.

**Quarantined** (never presented as results; now also in README's rules): the
claim that autism is pre-verbal C-PTSD (at most a research question); the
C-PTSD pilot protocol (needs ethics, consent and safeguarding first); the
post-operative case (N = 1 field note); NotebookLM's "verified", "zero
sorries" and "proves" statements.

Not now (author, 1 Oct): completing *Phase Dot*.

---

## ISS-047: RC3 UAT: author session of 7 Oct 2026 and follow-up — OPEN
{{Tags release, uat}}
{{Fields date.created=2026-10-08, date.start=2026-10-07, date.end=, epic=ISS-047-rc3-uat}}

**Epic:** [ISS-047-rc3-uat.md](prj/.adm/issues/ISS-047-rc3-uat.md)

RC3 is the October release candidate (staged 4 Oct, restaged 6 Oct; the public
app preview at www.t-theory.org/app/ belongs to it). Earlier candidates: books
v1.0.0-rc1/rc2 (15-16 Aug), Papers RC2 (papers-omnibus v2.0.0-rc2, 18 Aug).
The author ran a UAT session on 7 Oct; the notes are in
`uat/RC3/uat-session-2026-10-07.md` and the findings become sub-issues here.

- [x] Author types up the 7 Oct session notes (cleaned 8 Oct; raw notes private in
      Me/chats/Inbox/20261008_202500_RC3_UAT_session_raw.md).
- [x] Turn each finding into a sub-issue (8 Oct). The session passed: levels 1-20
      work; nothing blocks the release. The ideas are for after RC3:
  - [ ] MOTHER only works with the author's NotebookLM login: give MOTHER a
        backend others can use (ISS-048, parked).
  - [ ] Soma Machine as the workstation: shell to local/remote machines, file
        browser, full screen on tablets; local app server for several screens
        (notes 3-4). HAL tablet install on hold (ISS-045).
  - [ ] Cockpit/HUD with a fractal journey per level, Sherlock as the HUD, FX
        slider, era views; must stay abstract; pokes must show their effect
        (notes 5, 7; pokes in ISS-046).
  - [ ] Sherlock: OWL classes mapped to Lean types (note 8; concept registry
        and type guard in ISS-046).
  - [ ] Autopilot correction (note 9): it is for speech-to-text; the AI repeats
        back before acting, and a planned task is armed before it is confirmed.
        Update the Autopilot rule in T README/AGENTS with the author.
  - [ ] Engine room view for all settings (note 10).
  - [ ] MOTHER follows a wandering chat: log and tag each departure, show the
        chat as a branching path, revisit and continue; sound effects (note 11).
  - [ ] HAL's private knowledge (AJ wiki, links, books) with a switch per
        source; bulk sorting (notes 12-13; ISS-048 and ISS-049).
  - [ ] Test book: a topic suggested by someone else (waiting for the viewer).
- [x] D1 (`SFT-DEMO-CASE`, self-case paper): public, as decided 16 Aug (the
      author considered private, then kept it public because it was already on
      Zenodo: record 20459826, open access). PAPERS.yaml matches; no change.
- [x] Runbook step 1, Zenodo audit (8 Oct): 25 community records, all match
      PAPERS.yaml (none missing, no version DOIs, no extras).
- [x] Runbook step 4, `make uat-check` (8 Oct): 15 PASS, 3 WARN (5 sorries, research
      gaps, 44 pending uploads), 0 FAIL. Check 2 had reported zero sorries; its
      pattern missed `sorry -- ...` and `by sorry`. Fixed (count_sorries.py).
- [ ] NotebookLM UAT for RC3. Versions now in file names (rc3.1 = U aa28403);
      notebooks keep the previous version for a CMP item. Papers: S-1..S-4, H-1
      PASS; H-2, H-3, C-1..C-3 and CMP not run (daily chat quota): resume with
      `make uat-nlm TRACK=papers KEEP=1 ITEMS=H-2,H-3,C-1,C-2,C-3` (superseded:
      rc3.2 is staged, so run the full papers track again, CMP against rc3.1). Then
      `make uat-nlm TRACK=ttheory` (DRY=1 first).
- [ ] Runbook step 3, visual acceptance of each staged PDF (author).
- [x] P21 Sherlock review (8 Oct, `uat/RC3/p21-sherlock-2026-10-08.md`): numbers
      right; Φ₀ wrong (1.43, not 0.39 M_Pl); the formal-status table overclaims
      (`usf_equation_of_state` and the LocalGR chain are empty existence
      statements); circularity (the result is Ω_Λ = 7/11 given H₀); two origins
      for the factor 3; a stale sentence; Λ used for two things; "thermal noise".
      Lean comments fixed (8fca2c2). Author decides items 1-8, then a NotebookLM
      second pass, then sign-off.
- [x] P22-P24 Sherlock reviews (8 Oct, `uat/RC3/p2{2,3,4}-sherlock-2026-10-08.md`):
      all numbers reproduce. P22: the baryon ½ is wrong physics, the fixed 7 : 3
      partition fits one epoch only, the formal table overclaims w = 0. P23: well
      hedged; Λ ≡ ⟨tr Φ⟩₀ clashes with P21's formula. P24: the matrix's cited
      source (Juslin 2019, Table 22.3) has no coupling values (the table is in
      the 2010 Handbook and is qualitative), so "empirical" must go. Author
      decides; then fixes, restage as rc3.2.
- [x] Fixes applied (author: "you choose"; U 548a3c7), Lean docstrings aligned
      (build passes), Lean appendix rebuilt, both tracks staged as rc3.2;
      `make uat-check` 15 PASS, 3 WARN, 0 FAIL. Remaining for P21: NotebookLM
      second opinion on rc3.2, then the author's sign-off (status pending-upload).
- [x] Layout fixes, 8-9 Oct: the wrapping code blocks never applied in the books
      (tcolorbox reloads verbatim.sty after journal.tex; now set at begin
      document); `\tolerance=1000` for prose dense with inline code; contents
      page numbers wide enough for the omnibus (p1000+); the Wick figure's note
      overlapped its boxes (removed, the caption says the same).
- [ ] P1 (soma-field-paper) lost 23 lines of text in 7f794dd (23 Aug): an image
      replaced the end of the body-schema paragraph and the phantom-limb,
      body-schema and somatic-modes paragraphs. Restored 9 Oct; P1 already
      needs a new Zenodo version (Dist/PAPERS.yaml), which must carry them.
- [ ] Demo of 9 Oct (psychotherapist, UAT build): spoken H-AL tour
      `registry/tours/hal-therapist.yaml` (15 stops, about 3 minutes; open
      `#tour=hal-therapist`, H-AL voice via `make mother-bridge`). Small
      findings from the demo go in the log below, one line each, and are fixed
      or moved to their own issue afterwards.
  - 9 Oct: stray edit in `books/T-Theory/noir-page.md` (typing slip, CRLF);
    reverted, never committed.
  - 9 Oct: at 1600 px wide the right-hand panels hide part of the scene (tour
    stop 10: the second person of the dyad); use full screen or minimise the
    panel. Panels could step aside during tours (later).
- [x] Presentation (author, 9 Oct: the 3-minute tour is the Demo; a Presentation
      runs 10 +/- 2 minutes): `registry/tours/hal-presentation.yaml`, 43 stops,
      10.4 minutes measured with the Piper voice. Part 1 talks through the
      abstract in plain words ("forget the maths, what this really says is"),
      with faint moving overlays per idea; part 2 is the journey out of the
      cockpit window (note 7: panels hidden, the tour card as HUD), Gestalt
      bridges at the human scale; part 3 answers her question of 7 Oct (how the
      books get written). New tour fields `abstract`, `overlay`, `pause` and the
      view key `ui=clean` (`presentation.js`, docs/TOUR-LANGUAGE.md).
  - 9 Oct: P11's abstract (the app splash) said "across twenty orders of
    magnitude", but 10^-35 m to 10^26 m is 61; twenty is the number of zoom
    steps. Fixed: "across twenty-one scale levels". P11 needs a new Zenodo
    version for it.
- [x] Presentation-Gestalt (9 Oct): HAL-UAT loaded (30 sources: chats, own,
      core, gestalt; ISS-050), asked twice (concept map with chapters; a
      therapist's reading of the script, in Me/chats/tmp/collated/hal-gestalt-*.md).
      `registry/tours/hal-gestalt.yaml`, 45 stops, about 11.5 minutes: body and
      feeling as one whole, figure and ground as a process, contact instead of
      pokes, Beisser's paradoxical theory of change, Frank's yielding and
      kinesthetic resonance, three invitations to experiment (8 s pauses), the
      labels as phenomenological bracketing.
- [x] Several windows on one machine (note 7 and 10; tablets via spacedesk):
      `?screen=cockpit` (the view out of the window, follows the other windows,
      HAL's line as a HUD; camera external or follow/drone), `?screen=engine`
      (engine room: every setting, FX slider, cockpit camera, open windows);
      F or the corner button for full screen. `screens.js`, BroadcastChannel.
      Combined cockpit view (all views, zooming) later.
- [x] Demo stops 8 and 10 use the cockpit view (the panels hid the dyad).
- [ ] Demo held 9 Oct by phone, on her older copy of the app (no tour). Her
      feedback: "why a presentation for a Gestalt therapist?" The levels view
      gives a good overview; what she needs is "how does it help my daily work".
      Next version for therapists: the poke as the core (4D memoryless
      stimulus-response vs 8D history and context vs 11D unforced change;
      dyad rupture and repair; neuron-only vs whole-person poke), then the
      limbic system (the L1 axis of the 11D split), the Penrose gap and current
      AI, individuals to groups. Needs a tour field that fires a poke, and a
      poke panel for the whole brain (only human, dyad and neuron have one).
  - [x] Done 9 Oct: tour field `poke: weak|strong|twice`; whole-brain state
        panel (4D evoked potential, 8D cortical up/down states with adaptation:
        the brain alone forgets within seconds, 11D field synchrony as the CEMI
        layer); `registry/tours/hal-consulting-room.yaml`, 33 stops, 8.9 minutes
        measured: the poke without history / with history / unforced change,
        dyad deflection, rupture and repair, confluence, kinesthetic
        resonance (HAL-UAT, Mann ch. 7, 17-19, Frank ch. 2-3), neuron vs brain vs
        person, the limbic axis, AI and Penrose, groups, and what it could and
        could not do in daily work.
- [ ] RC3 decision recorded in `paper/UAT.md`.

- [ ] P21 sign-off blocker (author, physics): is the zoom step (10^3.207 per
      level; 19 steps span log10(k_P c/H0) = 60.93 decades exactly) fixed
      independently of H0? If not, H0 is an input and P21 predicts
      Omega_Lambda = 7/11 given H0 (what the paper now says, review item 4); if
      yes, P21 predicts H0 and the paper should say so. Then sign-off and
      status pending-upload (all nine review items are fixed in the text).
---

## ISS-048: Self-hosted HAL: open model plus grounded chat over the corpus — OPEN (parked 8 Oct)
{{Tags area.app, area.ops}}
{{Fields date.created=2026-10-08, date.start=, date.end=, epic=}}

**Parked 8 Oct (author): no GPU for now.** NotebookLM with the collated chats
(HAL-UAT, ISS-049) already gives the memory this issue was after. Later notes,
same evening:
- Training the papers, books and cleaned chats (~4M tokens) into a 27B model
  with LoRA: ~1-2 h on one H100 or ~4-6 h on an L40S (estimate), a few CHF.
  It teaches vocabulary and style, not reliable facts (no citations), and
  private material would be in the weights for good. Best: train for the
  voice, look up facts from an index.
- Laptop: NVIDIA T550 4 GB, 48 GB RAM, no local LLM installed. Voice in
  (Whisper) and out (Piper) run locally; the LLM is where a cloud GPU matters.
- H-AL voice: the current Piper model (campwill/HAL-9000-Piper-TTS) is trained
  on the film actor and stays private. Public-safe plan: a Piper voice trained
  on the author's own recordings plus an H-AL effects chain (pitch down, slower,
  dry, compressed, warm EQ) in Ableton, Web Audio or sox. No AI conversion to
  the film voice; no "HAL 9000" branding.

Idea (author, 8 Oct): run our own LLM HAL on a cloud GPU, with a Sonnet-class
model and a NotebookLM-style chat (the chat only, not notebook management).

**Findings (8 Oct, web research; prices are a snapshot):**
- Training a model from scratch: not sensible (millions). Fine-tuning (LoRA):
  GPU time $200-1,500 for 7-13B, $1,500-6,000 for 70B, but data preparation
  dominates and a fine-tuned model cannot cite sources. Grounded chat over
  retrieved passages (RAG) gives the NotebookLM behaviour with citations.
- Open models near Claude Sonnet 5 (63.2% SWE-bench Pro, Sep 2026, vendor
  figures): Qwen3.8-27B 61.7% (Apache 2.0, one 24 GB GPU); GLM-5.2 62.1% and
  GLM-5.3, DeepSeek V4-Pro (MIT, 8-GPU cluster). Benchmarks do not measure
  long agentic sessions; keep a frontier model for those.
- GPU per hour (Oct 2026): H100 $1.49-3.99 at RunPod/Lambda/Vast, $6.88 AWS,
  $12.29 Azure; H200 $3.59 RunPod; L40S $0.60-1.50. Personal HAL on one
  L40S/H100 at 4 h/day: about $120-360/month. An 8 x H100/H200 node (AWS
  p5.48xlarge, Azure ND96isr_H100_v5, GCP a3-highgpu-8g): about $29/h, bursts only.

**GitHub route (8 Oct, checked; easiest, no GPU):**
- Copilot Spaces: chat grounded in chosen repos and uploaded files (PDF
  included), with citations; syncs with the repo's main branch, so no upload
  step per release. In every Copilot plan; uses the Copilot chat quota. Can be
  private, shared or public. Size limits are not published: test with the corpus.
- Copilot SDK (GA June 2026; Python `github-copilot-sdk`): build HAL as our own
  agent on Copilot's models (Claude Sonnet and others), with custom tools and
  MCP; billed to the Copilot plan's premium requests. This session runs on it.
- Gone: GitHub Models (retired 30 Jul 2026; GitHub points to Azure AI Foundry)
  and GPU Codespaces (ended Aug 2025).
- Not "our own model": data goes to GitHub and the model provider, as it goes
  to Google with NotebookLM. The GPU route below stays the private option.

**Own machine: Infomaniak GPU cloud (8 Oct; author's preference; Swiss, Geneva/Winterthur):**
- Linux instances with a dedicated GPU, Swiss jurisdiction (nFADP/GDPR),
  renewable power. CHF per hour excl. VAT: A2 0.16, T4 16 GB 0.24, L4 24 GB 0.29,
  **L40S 48 GB 0.76**, A100 40 GB 1.57; H100 80 GB and B300 288 GB on request.
- L40S is the sweet spot: Qwen3.8-27B with long context. About CHF 100/month
  at 4 h/day, about CHF 600/month 24/7 (incl. VAT). Cheaper than RunPod's median.
- Linux natively, so it can also be HAL's Linux machine (HAL0 linux mode, SSH
  from Git Bash) instead of VirtualBox (ISS-045).
- To check: billing for stopped instances; what "Get started for free" gives;
  H100/B300 quote only if a frontier model is ever needed.

**Flexible, pay-per-use (8 Oct, author's criteria: pay only when used, flexible model choice):**
- Infomaniak AI Services: open models hosted in Switzerland, OpenAI-compatible
  API, queries not stored or used for training, billed per token, nothing when
  idle, model chosen per request; 1M free credits. CHF per 1M tokens in/out:
  Kimi-K2.6 0.60/3.00, Qwen3.5-397B 0.80/3.60, Qwen3.5-122B 0.40/3.20,
  Gemma-4-31B 0.20/0.40, Mistral-Small-4 0.20/0.75, Apertus-v1.5-70B (Swiss)
  0.70/2.50; Qwen3-Embedding-8B 0.07, Qwen3-Reranker 0.009; Whisper CHF 0.006/min.
  A grounded question (20k in, 1k out, Kimi) is about CHF 0.015; a 16-question
  UAT run about CHF 0.25.
- GPU instances: a switched-off instance on a public network is still billed
  for the GPU (Infomaniak FAQ), so pay-per-use means delete after use and keep
  the model weights on a volume (a few CHF/month at most; exact rate to check
  in the calculator). Billing per minute in practice; CHF 300 trial credit
  for 3 months. 2x/4x GPU flavours reported, not confirmed on Infomaniak's pages.
- Plan: HAL's model backend is one switch: Infomaniak API (default), own GPU
  (`HAL gpu up|down`, create/delete with the volume kept, dry run first),
  NotebookLM, Copilot SDK. One machine is enough; the API covers capacity.

**Test plan (about $10-20):**
- [ ] Open an Infomaniak account (author): AI Services (1M free tokens) and
      Public Cloud (CHF 300 trial credit).
- [ ] RAG over the corpus with Qwen3-Embedding-8B; ask the RC3 UAT worksheets
      through Kimi-K2.6 and compare with NotebookLM.
- [ ] One L40S instance (Ubuntu) on the trial credit; serve Qwen3.8-27B with vLLM;
      `HAL gpu up|down` with the model volume kept.
- [ ] Alternative without a machine: a private Copilot Space on ITI-Theory/U;
      run the UAT worksheet questions there and compare with NotebookLM.
- [ ] MOTHER bridge: add a backend switch (NotebookLM, local model, Copilot SDK).
- [ ] Give the MOTHER bridge a backend switch (NotebookLM or local model) with
      retrieval over the papers omnibus and the books; answers cite file and page.
- [ ] Run the RC3 UAT worksheets (`uat/scripts/nlm_uat.py`) against both and
      compare the answers side by side.
- [ ] Decide: rent on demand, buy hardware (24 GB GPU or 128 GB machine), or stay
      with NotebookLM. Ask about Azure credits through the Microsoft contact.

---

## ISS-049: Chats out of Me: private marking, lift, knowledge base — OPEN
{{Tags area.ops, area.books}}
{{Fields date.created=2026-10-08, date.start=2026-10-08, date.end=, epic=}}

Goal (author, 8 Oct): get the chats out of the private Me repo into a cleaned,
text-based knowledge base, and from there into *Phase Dot* book(s), with
private material marked and kept back.

**Done 8 Oct:** all chats (Inbox, archive/sessions, notebooks; 95 files,
~4.6M tokens, exact duplicates skipped) collated by date into 7 volumes in
`Me/chats/tmp/collated/` (ignored) and loaded into the private NotebookLM
notebook HAL-UAT. Its answers (same folder): the chat-workflow history, and
four areas: [T]-Theory science (~35-40%), tooling (~25-30%), creative/fun
(~15-20%), personal (~15-20%), often mixed within one chat ("do not split the
fun from the technical", the author's own rule). HAL-UAT recalls history well;
check its current-state facts against the repo (it named a wrong script path).

**Earlier ideas (from HAL-UAT), none built:** `make lift` (Me to U, 10 Jun),
segment tags (28 Jun), `visibility: private` (16 Aug, considered for D1, then
dropped: D1 stays public), disclaimer headers (21 May / 10 Jun; in 7 files).

**Proposal (to decide):**
- [ ] Whole files: `visibility: private` in the header (default public).
- [ ] Parts of files: `<!-- PRIVATE -->` ... `<!-- /PRIVATE -->`.
- [ ] `make -C Me/chats lift`: copy non-private files with private blocks
      stripped; refuse contact details and keys.
- [ ] `make -C Me/chats collate`: rebuild the volumes (today a one-off script);
      refresh HAL-UAT after big sessions.
- [ ] Knowledge base: HAL-UAT writes a master index, then one dossier per
      topic; the coding agent turns each into a note in `Me/kb/` with front
      matter (area, visibility, sources, evidence label); quarantined claims
      stay out. *Phase Dot* is built from the notes, filtered by visibility.

- [x] VS Code chats (9 Oct, Me 0f8b327): `make -C Me/chats vscode [DRY=1]` replays
      each VS Code Copilot Chat session log (all workspaces) into `Inbox/`
      (`type: ai_chat_vscode`): 28 conversations from February to September;
      copies of one chat reopened in another workspace are merged; thinking and
      tool calls left out; tokens and passwords masked. Re-running updates changed
      sessions.
- [x] Google Takeout, second account (9 Oct, Me 2e85cfc): `make -C Me/chats takeout
      Z=<zip> A=<account> [DRY=1]`. It held AI Mode (HTML, prompts with full
      answers) and NotebookLM (4 notebooks: chat histories, artifacts, sources),
      no Gemini Apps. Imported: 158 AI Mode conversations (234 prompts), 4
      NotebookLM chat histories (Rosetta Stone 647 turns), 3 new artifacts into
      `notebooks/<notebook>/takeout-artifacts/`. Sources skipped (own papers).
      Some AI Mode chats are personal (recipes, immigration, sport): mark them
      private (item above) before anything is lifted or collated.
- [x] Google Takeout, gmail account (9 Oct, Me 84a7381): 20 Gemini and AI Mode
      conversations (Gemini grouped by its conversation link), 11 NotebookLM chat
      histories (Collected Works 261 turns, Complete Research Programme 304, MOTHER,
      HAL-UAT, the UAT notebooks), 22 artifacts (comparison figures, the
      post-operative case study, SinnfeldOntology.lean, early app prototypes).
      Inbox now 270 chat files. Next: private marking, then collate and refresh
      HAL-UAT's chat volumes.
- [x] Agent sessions (`~/.copilot/session-state`): only 2 of the 8 folders have
      a session log (this one, 0eee7915, and c06281b7 of 15 Feb); both are in the
      Inbox. Nothing else to export.
- [ ] Then `collate` (item above) and refresh HAL-UAT's chat volumes (NotebookLM
      usage: `make nlm-usage`; uploads cost little, questions about 1.6% each).
---

## ISS-050: NotebookLM sources: folders and book selection — OPEN
{{Tags area.ops, area.books}}
{{Fields date.created=2026-10-08, date.start=2026-10-08, date.end=, epic=}}

Which books and files go into which NotebookLM notebook. Layout (created 8 Oct,
private repo Me): `Me/notebooklm/<notebook>/sources.yaml` lists each source
(title, path, licence, kind); the copies to upload go to the ignored `upload/`
folder and are uploaded with the MOTHER bridge, dry run first. Book files are
never committed (Calibre library 313 books, 6.9 GB; copyright).

**Rules:** MOTHER is public, so only released papers and books plus CC BY
material; third-party copyrighted books (Penrose, Calibre) only in the private
notebooks HAL and HAL-UAT. Limit 50 sources per notebook (seen 8 Oct in the
papers UAT notebook); one source can be large, so books can be merged.

- [x] Choose the books (author, 8 Oct): HAL-UAT groups chats, own, core (10),
      gestalt (8), physics, maths in `Me/notebooklm/HAL-UAT/sources.yaml`.
      Loaded 9 Oct: chats + own + core + gestalt = 30 sources (the login had
      expired; `notebooklm login` renewed it from the saved browser profile).
      The app's H-AL now answers from HAL-UAT (`hal_notebook_id` in the private
      `mother.local.json`; the old HAL id kept as `hal_notebook_id_previous`).
      HAL private (favourites, AJ wiki, links) and MOTHER (released work) later.
- [x] Choose the H-AL notebook in the app (HAL, HAL-UAT), instead of editing
      `mother.local.json`. Done 9 Oct: bridge `GET /fuel` (each notebook and its
      sources) and `POST /hal-notebook {name}` (names from `hal_notebooks` in the
      private config); engine room FUEL lists the banks, USE FOR H-AL switches.
      Tested: MOTHER 1 source, HAL-UAT 30 (H-AL), HAL 0 (the old notebook is
      empty), BASELINE 45. MOTHER's single source is worth a look.
- [ ] Switch sources per group within a notebook (ISS-047 notes 12-13).
- [x] `make` target: copy the listed sources into `upload/` (merging where the
      limit needs it) and upload with the bridge (`--dry-run` first).
      Done: `make -C Me/notebooklm load NB= GROUPS= [DRY=1]` (`load.py`, 8 Oct), used 9 Oct for HAL-UAT; it renews the session itself.
- [ ] Move `Me/notebooklm/rosetta.pdf` into its notebook folder (author decides).
- [ ] Soma Machine Engine Room panel "Fuel" (knowledge banks, as in Star Trek's
      "load the medical database"; author 8 Oct): which groups are loaded in
      each notebook with a switch per group, a gauge (sources used of 50, chat
      quota left), "load gestalt" through the MOTHER bridge calling the same
      loader (`make -C Me/notebooklm load`); later by voice. Links to the Engine
      Room idea in ISS-047.
- Candidates noted 8 Oct (rule: one original per level, no remixes; CC BY can
  also go to MOTHER, NC/SA and copyrighted only to HAL/HAL-UAT): already owned:
  Earle *Physical Geology* 2e (CC BY 4.0), OpenStax *Astronomy* 2e older CC BY
  copy (current edition is CC BY-NC-SA); skip the remixes *Introduction to
  Earth Science* and *Introduction to Planetary Geology*. MIT OCW (CC BY-NC-SA,
  merge each course's PDFs into one source): 8.821 String Theory 2008
  (McGreevy; holography, wave equation and correlators in AdS), 8.251 String
  Theory for Undergraduates, 8.323/8.324 QFT, 8.962 General Relativity.
  Check overlap with Penrose ch. 31 first.

- [x] MOTHER's notebook had only 1 source (seen in FUEL, 9 Oct). Loaded 9 Oct
      (Me `MOTHER/sources.yaml`): the released work with a DOI (C1v2 papers
      omnibus, C2 Fractal Thesis omnibus, D1, D2) and the Observatory Guide: 6
      sources. Pending-upload work joins when released.
- [ ] The old HAL notebook (d6cfc42e) is empty: delete it, or fill it with the
      private group (favourites, AJ wiki, links) when that exists.
- [x] NotebookLM usage (9 Oct): `make nlm-usage`, bridge `GET /usage`, two gauges
      in the engine room FUEL (five-hour, weekly; reset times from the server),
      UAT runs check the window first. A question costs about 1.6% of the
      five-hour window; audio/video overviews about 44%; uploads are not counted.
---

## ISS-051: Visualize everything: mark up all equations, generate every figure, show the equation by default — OPEN
{{Tags area.books, area.instrument, area.visualize}}
{{Fields date.created=2026-10-09, date.start=, date.end=, epic=}}

Author, 9 Oct: mark up as much as possible with `{{Visualize}}`, papers
included (literally everything), and generate the figures, with as many outputs
as are reasonable for each. But by default show nothing except the equation.
Reasons: (1) the figures become a large library, useful for custom chats
(Gemini, NotebookLM) if uploaded, ideally as one file; (2) in HTML nothing has
to be chosen: a tab panel per equation, the equation tab first and always
there, the figures one click away "if" the reader wants them, plus links for
further reading. Today: about 67 figures from 11 primitives, in the course
book, the Atlas textbook and two Fractal books (docs/VISUALIZE.md).

- [x] Display switch per output: `visualize-show: none|selected|all` and
      `display=true` per macro (9 Oct, lib/format/visualize.lua, docs/VISUALIZE.md).
      Hidden figures are still drawn and checked; in HTML they collapse under
      the equation ("Show figure"). Default stays `all`; set `none` per output
      when the papers are marked up.
- [ ] HTML: a tab panel per marked equation: EQUATION (first, default),
      FIGURES (each output), LEAN (the theorem, when the context is
      `lean:`), READ MORE (the paper section, the level in the Soma Machine, the
      reading list). Works without JavaScript (first tab visible).
- [ ] (9 Oct: `make visualize-coverage`: papers 0 of 233 display equations have a
      figure, books 1 of 38, course 52 of 142; the paper builds now carry the
      reader and filter with `visualize-show: none`; P1 marked up: 8 figures, 2
      checks; Gestalt field dynamics: 7 figures, 6 checks;
      music affect dynamics: 4 figures, 3 checks) Mark up the papers: every display equation gets a `{{Visualize}}` when a
      primitive fits; a report lists equations with no fitting primitive (new
      primitives come from that list).
- [ ] More outputs per figure where reasonable: PNG and SVG; a parameter
      sweep strip; an animated SVG or GIF for time-dependent ones; the data
      table (CSV) the figure was drawn from.
- [x] (9 Oct: `lib/visualize/library.py`, 65 figures, 39 pages, 4.8 MB; each
      document also writes its own list in `visualize/docs/`, since the books
      share one manifest) One-file library for chats: `make visualize-library` builds
      `bld/visualize/library.pdf` (each figure with its equation, caption,
      context, source paper and evidence label) and a Markdown index. Gemini
      Gems and NotebookLM read PDFs with images; one file stays inside the
      source limits.
- [ ] Soma Machine: the same tab panel for the level equation (EQUATION, FIGURES,
      READ MORE), using the generated figures.
- [ ] Rules unchanged: context first, caption required, expressions are maths
      only, `expect_*` checks (docs/VISUALIZE.md).
---

## ISS-052: The Soma Machine is a mind and thought explorer, not a flight simulator — OPEN
{{Tags area.instrument}}
{{Fields date.created=2026-10-09, date.start=, date.end=, epic=}}

Author, 9 Oct (evening), after the Gestalt therapist's question "why a
presentation?" (ISS-047): the notes about a cockpit, a front window and flying
(mountains as in *2001: A Space Odyssey*, towers of code as in *Hackers*, the FX
bar) all sound cheesy. What is really going on:

1. The level view is the **dependent-type explorer**: each level is a type, and
   what it holds (fields, layers 4D/8D/11D) depends on the level. Keep it; it is
   the map of the whole programme.
2. Missing: **where the project started** (P1, the limbic layer paper): the
   brain, the 1D Hopfield net, then 3D, and so on, and the emotions. This needs
   to be visualised.
3. One of the plates looks like a meshy spider web, cave-like; the film
   *Fantastic Voyage* has a similar landscape. Idea: an **ultra-simple explorer
   of the human body and brain**, like what we already have but inside the
   body; then electricity and the quantum field on top, almost like a second
   nervous system.
4. So the Soma Machine is not a flight simulator, space engine, planetarium or
   virtual microscope: it is a **mind and thought explorer**.

Opinion (Copilot, 9 Oct):

- Agreed. "Mind and thought explorer" has one purpose that a therapist can use
  ("where does this feeling live, and how does it move?"). The flight-sim
  metaphors invite "toy"; the levels stay, but they are not the identity.
- The idea already exists in the theory. The zoom into the body is the
  zoomable somatic field (P21's zoom step), and the three layers are the 4D/8D/11D
  layers the app already draws: anatomy (4D), electrical activity (8D), the
  field (11D, the "second nervous system"). The inside view is therefore a
  layer switch on a body/brain map, not a new 3D world.
- The "mountains" are not cheesy if they are the energy landscape $H(\mathbf{e})$:
  valleys are attractors (fixed Gestalts), the ball is the person's state. The
  cave-like plates and the new Visualize figures (the music, Gestalt and
  limbic papers) are exactly this terrain. Flying through it is moving through
  states. **The FX bar keeps its place**: as the limbic field $\Phi$ (or the
  temperature $T$), raising it melts the valleys and the state can move (the
  FM-HN figure in the limbic layer paper). That is the therapy story in one
  control.
- Keep it ultra-simple: schematic, flat drawings (body outline, brain regions,
  a few nets), no realistic anatomy, no game engine. Reuse the level canvas,
  the poke tool, the whole-brain panel (`dynamics.js`) and the Visualize
  figures. Evidence labels on every clinical claim (THEORY-STATUS.md).

Steps:

- [ ] Author: confirm the positioning line ("a mind and thought explorer") for
      the README, the app splash, the tours and the Observatory Guide.
- [ ] Origin tour ("where it started"): 1D Hopfield net (1982), the modern
      network (2020), the limbic field (FM-HN), 3D, then the levels; one stop
      per step, using the Visualize figures of P1 and the limbic layer paper.
- [ ] Inside view ("voyage"): a schematic body → brain → network → neuron map;
      stops are existing levels (human, whole-brain, cellular-synaptic); a layer
      switch 4D anatomy / 8D electrical / 11D field; poke a region and watch it
      spread in each layer.
- [ ] Emotions on the body: the eight modes as regions or colours on the body
      map (cf. bodily maps of emotions), linked to the concept registry
      (registry/concepts, ISS-046).
- [ ] Landscape view: the state as a ball on $H(\mathbf{e})$ (energy-landscape
      and contour figures as the terrain); the FX bar drives $\Phi$ or $T$.
- [ ] Rework the old cockpit/flight notes (ISS-047, the engine room, FX) under
      this framing; keep the cockpit only as "the view out of the window" onto
      the landscape.

