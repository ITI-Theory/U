# Issues — U / [T]-Theory Research Programme

Issue tracker for work that spans sessions or needs a future decision.
Format: `ISS-NNN: Title — STATUS`
Status: OPEN | IN-PROGRESS | CLOSED

Tip: Folding in vscode (turns file into a Issues UI), You can fold regions using the folding icons on the gutter between line numbers and line start.
Use Shift + Click on the folding icon to fold or unfold the region and all regions inside.

---

## ISS-001: Phase 1 wrap — Zenodo uploads + NLM UAT — OPEN

**Context:** Phase 1 is the MVP theory release. All 20 papers (P1–P20) are on Zenodo.
Four records need new versions (content changed). Four new records (P21–P24) need uploading.
NLM UAT validates the content before release is declared complete.

**Actions:**
UAT - See `UAT Testing` in `.../U/PROCESS.md`
- [ ] Setup NLM

UAT: U
- [ ] Verification (Sherlock)
- [ ] Validation (Harry P)
- [ ] The CM (CheatSheet)

UAT: Dist

Zenodo — version patches (go to record → New version → upload → Publish):
- [ ] P11 zoomable-somatic-field — Problems 1+2 closed; axiom table updated
- [ ] P12 experimental-validation — "Open Problem 5" → "GAP-1 in USF test suite"
- [ ] D2 lean-proofs-appendix — regenerated 2026-08-14 (Float→ℝ); upload new version
- [ ] C1v2 omnibus-v2 — rebuilt with updated P11
- [ ] C2 fractal-programme — rebuilt with TOC + updated P12

Zenodo — new records (form fields in `Dist/zenodo/README.md`):
- [ ] P21 cosmological-constant — review PDF first (see ISS-003), then upload
- [ ] P22 dark-matter-spatial-vacuum — upload
- [ ] P23 ttheory-phenomena — upload
- [ ] P24 g2-symmetry-breaking — upload

After upload:
- [ ] Fill DOIs in `Dist/PAPERS.yaml` and `Dist/zenodo/README.md`
- [ ] Update `U/.github/copilot-instructions.md` paper table
- [ ] Update both org README DOI tables

NLM UAT (see UAT section in this file's PROCESS.md):
- [ ] Sherlock: did we build it right? — query nlm-uat with new Omnibus + Fractal Thesis
- [ ] Harry Potter: did we build the right thing? — completeness check
- [ ] Cookie Monster: can anyone understand it? — cheat-sheet validation

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
- [ ] Rebuild PDF
- [ ] sync_dist.py --papers
- [ ] Commit Dist

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

**Decision boundary:** C1v2 and C2 should share one documented model with
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

**AI opinion:** This is the highest-value design issue. Do not optimize the build
until the intended reader-facing hierarchy is explicit and shared by C1v2/C2.

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
