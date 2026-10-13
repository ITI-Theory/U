---
tags: area.app, area.build, area.instrument, area.ops, area.papers, area.books, area.theory, area.proofs, area.clinical, area.visualize, project.soma-field-operator, projection.3d, release, uat
fields: date.created, date.start, date.end, epic
---

# Issues — U / [T]-Theory Research Programme

Issue tracker for work that spans sessions or needs a future decision.
Format: `ISS-NNN: Title — STATUS`
Status: OPEN | IN-PROGRESS | ON-HOLD (trigger) | SOMEDAY | PARKED | CLOSED
- OPEN, IN-PROGRESS: being worked on; checked every session.
- ON-HOLD (trigger): paused until a named event, e.g. `ON-HOLD (after Mk 1, 21 Oct)`;
  it comes back by itself when the trigger happens. Not checked before then.
- SOMEDAY: not now, but it may still be slipped in when there is room (author, 13 Oct);
  never checked, reviewed at each release.
- PARKED: set aside; not reviewed; revisited only if the author picks it up again
  (author, 13 Oct: "forget it, but I might revisit it").
- CLOSED: done, or decided against ("won't do" in the closing note).

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
- [ ] NotebookLM UAT from `uat/staging/<track>/`, fresh private `nlm-uat`:
   Sherlock (built right), The Wizard (built the right thing), The Monster
   (understandable). Record in `paper/UAT.md`.
- [ ] Lulu print preview of the [T]-Theory volumes.
- [ ] Print the lot (author, 13 Oct): 25 physical books, one each. The
   papers omnibus (*The Soma-Field: Collected Works*, 2nd ed., A4, 470 pp). The
   Fractal Programme in three volumes (I Cosmos and Matter, II Mind and Body,
   III Culture and Society; replaces the 825/782-page two), the 15 domain
   books, the Field Atlas (A3, BookFactory), the Course, and Phase Dot 2 in
   four A4 volumes at 9pt, two columns (private: `Me/books/phase-dot`, never
   Dist; Origin, The Questions, Building, The Machine). Fractal split done:
   Vol I 575 pp, Vol II 506 pp, Vol III 547 pp, all under Lulu's 800-page cap.
   Phase Dot 2: Vol I 333 pp, Vol II 454 pp, Vol III 593 pp, Vol IV 527 pp, all built.
   One Lulu order, everything at A4 (author, 13 Oct 22:57); the books, papers omnibus, Fractal
   volumes, course and Phase Dot are A4 already; the Field Atlas joins as A4 landscape (about
   395 pages at 10pt, ISS-087); the bookfactory Jumbo comes later, once, trimmed to 300 pages.
- [x] UAT runner (13 Oct): `uat/checklist.yaml` and `uat/scripts/uat.py`
   (`make uat-run`, `HAL uat`): step by step in a terminal, resumable, answers in
   `uat/results/`, `c` sends a finding to the VS Code chat (`code chat`).
- [ ] Author: run the UAT inside the Soma Machine (MOTHER `/shell`: bash and Neovim),
   `HAL uat`. Ready 13 Oct: Neovim 0.12 installed for the user (no admin,
   %LOCALAPPDATA%\Programs\Neovim, on the user PATH); %LOCALAPPDATA%\nvim links to
   `U.Dot/nvim`, the author's own barebone-nvim (H-AL: chosen 29 Aug, "BB looks right";
   `soma-neovim-init.lua` was the Collected Works notebook's, 26 Aug), fixed for 0.12
   (U.Dot 84d88df). Restart the MOTHER bridge so its shell sees `nvim`.
   The UAT includes the pilot's lines (wording and pace) and the MIDI knobs (ISS-074).
- [ ] Promote accepted PDFs: `make dist`, verify checksums against the staging
   manifests, commit Dist.
- [ ] Author: the Zenodo sandbox account and token (Dist/zenodo/README.md, "Sandbox setup"):
      sign up at sandbox.zenodo.org, token with deposit:write and deposit:actions, into the user
      environment as ZENODO_SANDBOX_TOKEN (never a file), then `bin/zenodo-publish --sandbox
      check-token`. (13 Oct: the script is ready: `check-token`, and `rehearse` makes every planned
      record as a sandbox draft, new versions on a published sandbox seed since the live DOIs do not
      exist there; the live community is left out on the sandbox. P25's metadata written; the stale
      sorry counts in Dist/zenodo removed. `plan`: 46 records, the only errors P25's and Vol III's
      PDFs, which `make dist` brings.)
- [ ] Zenodo, after `make dist`: `bin/zenodo-publish --sandbox rehearse`, read the report
      (bld/zenodo/sandbox-rehearsal.md) and two or three drafts; then live with `ZENODO_TOKEN`
      (`plan`, drafts, `--publish --yes`).
- [ ] Fill new DOIs in `Dist/PAPERS.yaml`, `make generate`, update the org
   README DOI tables; commit and tag U and Dist together.

- [x] (13 Oct: rebuilt; Vol I 592, Vol II 508, Vol III 562 pages, all under Lulu's 800; the
      omnibus 1,537 (digital); the assembler makes section ids unique per book (filters/
      ttheory-assemble.lua `unique_ids`): duplicate labels 32 to 0 in Vol II, 0 in every volume,
      no broken internal link) The omnibus, completed (author, 13 Oct): P10, P14 and P15 were in no domain book, and P25
      is new. The manifest now places P10 in Neuroscience, P14 and P15 in Physics (pointers in
      Formal Mathematics), P25 in Trauma (pointers in Complex Systems and Philosophy); each is
      printed in full once. Rebuild the Fractal Programme volumes and the omnibus at release and
      re-check the page counts (Vol I 575 and Vol II 506 grow; Lulu's cap is 800). Also: section
      labels repeat across the assembled books (32 in Vol II: introduction, conclusion, the
      "Reading the ..." pointer sections); make them unique per book so links cannot be ambiguous.
- [ ] (13 Oct, part: the affidavit is done, registry/affidavits/path-sensitive-transitions.yaml,
      frozen at b01d50a: six claims (its counts, "no Lean theorem is claimed", no unhedged clinical
      claim) and the three toy results it proposes proved on witnesses,
      sherlock/Affidavits/PathSensitive/Toy.lean; `make -C sherlock check` 414 of 414. Left: the UAT
      reading and the upload) P25 (path-sensitive transitions): UAT reading, upload to Zenodo with the others; and its
      Sherlock affidavit, so SH1's "affidavits for all its papers" stays true at SH1's next
      version (SH1 v2 is a snapshot of the 24 papers of 11 Oct, left as it is).
- [ ] Set P21 to pending-upload in `Dist/PAPERS.yaml` (`make generate` afterwards) once the
      UAT has read it; its physics question is answered (ISS-081, 13 Oct).
- [ ] Print: the Field Atlas at bookfactory uses their template with bleed (3 mm assumed,
      single pages unless they ask for spreads; checked in their configurator when
      ordering), and its cover's spine width comes from their configurator for the final
      page count (ISS-040).

- [ ] At go-live, HAL-UAT becomes H-AL's production notebook (author, 13 Oct: UAT to prod);
      the old, empty HAL notebook (d6cfc42e) is reused for it or deleted then (ISS-050).

- [ ] (from ISS-080) At go-live, refresh H-AL's memory: `make -C Me/chats collate`, then
      replace HAL-UAT's chat volumes (load.py adds by title and never replaces: give it a
      replace option). (ISS-049) Then `collate` (item above) and refresh HAL-UAT's chat
      volumes (NotebookLM usage: `make nlm-usage`; uploads cost little, questions about 1.6%
      each).

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

## ISS-011: Hopfield.lean — upgrade to SpinState + asynchronous update — CLOSED

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

**Closed 2026-10-13** (author, 13 Oct: waiting for the fork will not work): proved directly
instead of porting HopfieldNet2, in `paper/proofs/HopfieldAsync.lean` (Mathlib only, no
`sorry`, no axioms of its own, no lint warnings; Lake target, in the Lean appendix catalogue).
States `Fin n → Bool` (2ⁿ), asynchronous update that flips only on a strict disagreement;
with symmetric weights and no self-coupling: `energy_update` (the change is −(b − sᵢ)·hᵢ),
`update_lowers_energy`, `attractor_exists`, `run_settles` (any schedule),
`fair_run_reaches_attractor`, `cyclic_is_fair`, `hebbian_pattern_stable`. `Hopfield.lean`
(the demonstration the books cite) is unchanged. The fork and port steps above are no
longer needed; the `../probe-nn` scratch folder can be deleted.

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

## ISS-020: Registry-Driven Pandoc Lua Hooks — CLOSED

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
- (not a task, 13 Oct: kept as a rule for the hooks) Add one real omnibus or paper use-case before expanding the vocabulary.…

**Prototype result (2026-08-19):** `paper/registry-hooks.lua` resolves
`{{papers.count}}`, `{{paper:ID.title|doi|status}}`, and
`{{collection:ID.title|status}}` directly from `PAPERS.yaml`; its Pandoc
fixture passes. This is the project-wide rendering-hook foundation.

**AI opinion:** Start this immediately. The existing Lua filters are cleanup
filters, not a registry hook framework. A narrow, tested hook layer is a quick
win; unrestricted macro substitution would recreate the drift it is meant to prevent.

---

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

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

## ISS-024: Effect specification and causal-response interpreter — CLOSED

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
- [x] Reconcile the 20/21 scale conventions before defining the new type.
      (13 Oct: 21 levels numbered 0 to 20; "the 20-scale dial" counts the 20 steps between
      them; `scaleEquiv : ScaleStep ≃ ScaleLevel` proves the named and numbered scales agree.
      `RenormalisationGroup.RGCouplings` keeps `Fin 20`, one coupling per step.)
- [x] Define `EffectSpec`, a response interpreter contract, and an observation
   lens with lawful non-lossy semantics.
      (13 Oct: `EffectSpec σ α` (pure, poke J, observe x t); `Responder σ` with causality as a
      contract; `TypedUniverse σ`; `interpret` into the sketch's `SomaticIO`; `Lens` with the
      get/put laws, `limbicLens` on X₇.)
- [x] Prove only structural/type-safety facts; keep physical theorems in their
   specific existing modules.
      (13 Oct: `interpret_bind` (a monad morphism, not the sketch's equivalence),
      `late_poke_unseen`, `poke_then_observe` (a delayed responder), `typed_universe_at_every_scale`,
      `lossy_view_has_no_review` and `limbic_view_is_lossy` (why the sketch's lens was dropped).)
- [x] Add a focused Lake target and build it with no `sorry`.
      (13 Oct: `lake build EffectSpec`, no `sorry`, no axioms of its own, no lint warnings; in the
      Lean appendix catalogue.)

**Closed 2026-10-13:** `paper/proofs/EffectSpec.lean`.

---

## ISS-025: USM human route — appraisal and context layer (CODA) — CLOSED

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
- [x] Add CODA/appraisal provenance to the human music-affect Cheat Sheet and
   USM MVP specification.
      (13 Oct triage: done: SOMA-MACHINE-MVP.md (sources table, Appraisal and Context section); the human music-affect cheat sheet draws from the same spec)
- [x] Design a compact appraisal/context panel that can coexist with multi-select
   BRECVEMA mechanisms.
      (13 Oct triage: done: APPRAISAL / CONTEXT in the app (index.html), beside the multi-select BRECVEMA mechanisms)
- [x] State which controls are sourced descriptions, simulation inputs, or future
   experimental variables.
      (13 Oct triage: done: the MVP spec and the panel's note (weights the episode, does not replace mechanism inputs; educational inputs, not diagnoses))
- [x] Update P9 literature review and bibliography after a focused source audit.
      (13 Oct triage: done 13 Oct: lennie2022coda in the bibliography (checked: Thomas M. Lennie, Tuomas Eerola, Frontiers in Psychology 13, 822264); P9's gap section and 'What the Model Adds' (builds))

**Closed 2026-10-13:** the CODA appraisal/context layer is sourced, designed and cited: the MVP spec, the APPRAISAL / CONTEXT panel, P9 and the bibliography.

---

## ISS-026: USM human route — body-map and 8x8 field-grid renderer — CLOSED

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
- [x] Audit the body-map papers and extract only defensible region/measurement
   claims.
      (13 Oct triage: done 13 Oct (BODY-MAPS.md): Nummenmaa et al. 2014 and Putkinen et al. 2024 (abstracts checked on PubMed): self-reported felt sensation, separable and cross-cultural; music mainly in limbs, chest and head; no source maps mechanisms to regions. The BODY stop's feelings now carry their basis on screen: anger, anxiety, grief, joy, calm after Nummenmaa 2014; freeze, hypervigilance, flow artistic placements)
- [x] Define the 8x8 grid coordinate system, region names, aggregation rules,
   and visual encoding.
      (13 Oct triage: done: human-affect.js bodyGrid (8 x 8, row 0 the head; head, throat, chest, arms, abdomen, legs, spine), documented in BODY-MAPS.md with its aggregation and encoding)
- [x] Add stacked-region rendering for multi-selected mechanisms.
      (13 Oct triage: done: main.js renderBodyGrid adds one per selected mechanism per cell ('N MECHANISM(S) STACKED'))
- [x] Keep the web demo hardware-free; specify a future controller adapter only
   after the on-screen grid is accepted.
      (13 Oct triage: so: no controller code; an adapter waits for the grid's acceptance)

**Closed 2026-10-13:** audited and documented (BODY-MAPS.md): what the bodily-map sources support, the BODY stop's feelings labelled by basis, the 8x8 grid specified; the grid and stacking were already built.

---

## ISS-027: Soma Field Operator stereoscopic projection — CLOSED
{{Tags area.instrument, project.soma-field-operator, projection.3d}}
{{Fields date.created=2026-08-25, date.start=, date.end=2026-10-13, epic=ISS-027-soma-field-operator-projection}}

**Epic:** [ISS-027-soma-field-operator-projection.md](prj/.adm/issues/ISS-027-soma-field-operator-projection.md)

Add a projector-facing stereoscopic output mode to the Soma Field Operator for
the Dangbei Atom, while retaining its existing browser UI and normal display
mode.

- [x] (10 Oct) The mind-body explorer in 3D SBS: button 3D: OFF / SBS½ / SBS,
      or `?stereo=half|full` for a projector window. SBS½ squeezes each eye into
      half the width (the usual HDMI 3D input); SBS gives each eye a native
      half-width picture. The 2D stops are composited from three layers (far:
      background; screen: scene, labels, caption; near: the field, sparks,
      ripples, the dyad's shared field), the 3D landscape renders two eye
      cameras, the jellyfish human uses the app's SBS with the same layout.
      Controls hide on the projector until the mouse moves; the caption or
      H-AL's tour line is drawn flat at the screen plane in each eye. Fixed an
      older bug: in SBS the eye cameras copied a stale camera matrix (the view
      sat inside the figure when SBS was the first render).
- (moved to ISS-081) Calibrate on the Atom with the glasses (which layout the projector…
- (moved to ISS-052) H-AL's cautions (uat/RC3/hal-stereo-explorer-2026-10-10.md): smooth…

---

**Closed 2026-10-13:** done; what was left (the author's own step) moved to ISS-081.

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

## ISS-033: Archive publication and print context curation — CLOSED
{{Tags area.papers, area.books}}
{{Fields date.created=2026-08-26, date.start=, date.end=2026-10-13, epic=}}

`paper/archive/` contains durable source material alongside dated publication
snapshots and submission checklists. In particular, `PRINT-SPEC.md` documents
the [T]-Theory tetralogy, mark, sticker, and physical-print decisions, but its
QR destination is now superseded by ISS-032 and other operational content may
also be stale.

**Actions:**
- [x] Audit the archive Markdown files and classify each as durable reference,
   current operational guide, or historical snapshot.
      (13 Oct triage: done: paper/archive/README.md classifies all eight (one durable reference, seven historical snapshots), with the current authority for each)
- [x] Move or distil still-valid print, publication, and brand decisions into
   maintained Markdown documentation without silently carrying forward stale
   claims, dates, or destinations.
      (13 Oct triage: done: docs/PRINT.md, pointers to Dist/PAPERS.yaml, Dist/README.md, PROCESS.md, paper/UAT.md, the sticker assets; the mark, Field Realism, no ISBN or retail edition)
- [x] Leave an explicit archive pointer or status note for retained historical
   records so their date and authority are clear.
      (13 Oct triage: done: a status note at the top of every archive file)

**Closed 2026-10-13:** the archive is classified and labelled, and the still-valid decisions live in docs/PRINT.md (1a31fc3; reviewed 13 Oct: every pointer exists, the ISBN rule is sourced from PRINT-SPEC).

---

## ISS-034: Paper script ownership and generated-content boundaries — CLOSED
{{Tags area.ops, area.papers, area.books}}
{{Fields date.created=2026-08-26, date.start=, date.end=2026-10-13, epic=}}

`paper/scripts/` has accumulated build generators, validators, packaging,
translation, staging, and maintenance tools with uneven ownership and output
contracts. `build_lean_appendix.py` is still active: root and paper Makefiles
invoke it and `build_thesis.py` imports it, but it embeds hundreds of lines of
reader-facing Markdown in Python.

**Actions:**
- [x] Inventory each script's caller, inputs, outputs, generated-file policy,
   and current release/build role.
      9 Oct inventory of paper/scripts (33): 26 run by make or release-check.
      No caller: `paper/scripts/load_opencyc.py.OBSOLETE`, `paper/scripts/query_cyc.py.OBSOLETE`, `paper/scripts/validate_cycrefs.py.OBSOLETE` (OpenCyc
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
- [x] Keep Makefiles as the canonical build graph; any replacement must avoid
   hard-coded duplicate source inventories and retain a focused regeneration
   check for the checked-in appendix source.
      (13 Oct triage: done 13 Oct: the appendix's duplicate order list removed, lean-include.lua reads the catalogue's own order; paper/scripts/check_lean_catalogue.py (make -C paper check-lean-catalogue; release-check 14b) fails when a .lean file is not catalogued; it found two (EmotionCyc, FieldEvent), now in the appendix. The appendix is not a checked-in generated file any more, so there is nothing to regenerate)

- (moved to ISS-083) (from ISS-044) One Python directory…
- [x] (from ISS-021) Move generated registry views such as the synthesis table
      out of handwritten sources.
      (13 Oct triage: not a registry view: the synthesis table's Movement and Contribution are the paper's own argument (only the titles are registry facts); it stays handwritten. A cancelled agent's TSV-plus-generator version was reverted (ed3c524))

**Closed 2026-10-13:** the Lean appendix has one inventory (its catalogue) with a check in make and the release gate; the synthesis table is the paper's own content; the Python directory waits as an idea (ISS-083).

---

## ISS-035: Path-sensitive transition dynamics — CLOSED
{{Tags area.theory, area.proofs, area.clinical}}
{{Fields date.created=2026-09-30, date.start=, date.end=2026-10-13, epic=}}

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
- [x] Distinguish the current potential/energy-landscape account from candidate
   minimum-action, stochastic-path, and path-integral formulations.
      (13 Oct triage: done: the draft's 'present landscape account' and 'candidate path formalisms' (Kramers, Freidlin-Wentzell, Onsager-Machlup, path integrals as a separate, unproved step))
- [x] Define the proposed state space, admissible paths, action functional, and
   observable predictions before changing papers or Lean theorems.
      (13 Oct triage: done: the draft's state space, admissible paths, action functional and observable predictions)
- [x] Specify what data could distinguish a single-barrier explanation from a
   distributed path-cost explanation in trauma or overload transitions.
      (13 Oct triage: done: the draft's discriminating data (route dependence, recovery not retracing onset, dwell-time spread, bottleneck interventions; longitudinal within-person data))
- [x] Introduce the extension in the philosophy book as a clearly labelled open
   hypothesis, then decide whether it warrants a dedicated paper and formal
   development.
      (13 Oct triage: done: 'Open hypothesis: path-sensitive transition dynamics' in book-philosophy.md; a dedicated draft paper written, no Lean claims yet)

**Closed 2026-10-13:** specified and drafted: paper/soma/path-sensitive-transitions (make -C paper pathsens, builds; registry pending) and an open-hypothesis section in the philosophy book; reviewed 13 Oct (references real, claims labelled). The author's review of the draft is in ISS-081.

---

## ISS-036: Lean toolchain upgrade and remaining proof debts — CLOSED
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
- [x] Move to v4.34.x when upstream OSforGFF does; drop `lean/patches/v4.33/`
   once #22 is merged. Original plan: upgrade Lean, Mathlib and physlib to v4.34.x and OSforGFF,
   GaussianField and BochnerMinlos to upstream commits for the same release;
   drop `lean/patches/` once upstream builds unpatched; full `lake build`.
   Low priority: a separate task, not before a release.
      (13 Oct: moved to ISS-085, parked.)
- [x] Reproducible from a clean clone: `bash lean/upgrade-build.sh` runs
   `lake update`, applies `lean/patches/v4.33/`, fetches the Mathlib cache and builds.
- [x] Restate `euler_lagrange_BRECVEMA` (`BRECVEMAVariational.lean`): the
   current witness `0` does not satisfy `M ψ̈ = W ψ(t)` in general. Either
   assume the mass matrix is invertible and take `ψ̈ = M⁻¹ W ψ(t)`, or state
   it as a labelled axiom.
      (13 Oct triage: done: proved for an invertible mass matrix (`[Invertible L.mass]`, witness M⁻¹ W ψ(t)); `moduli_space_is_G2_homotopy` is now a labelled axiom, the open G₂ target. BRECVEMAVariational has no `sorry` left; module builds; the Lean appendix catalogue says so. Remaining: DyadicField 2, SomaNetwork 1)
- [x] (13 Oct: seven left. `LimbicTunnel.classical_trapped` is now proved: under gradient flow
      a state below the barrier top on the trauma side stays there for all t >= 0 (V is a
      Lyapunov function, then the intermediate value theorem), Lean's standard axioms only.
      P11 lines 1057 and 1108, P13 line 252 and the formal-mathematics book line 77 still call
      it a placeholder: true of their frozen versions, to update in their next version.)
- [x] (12 Oct, from the towers export) Eight theorems prove only `True` (placeholders):
      `G2Compactification` su3_holonomy and g2_holonomy (structure fields),
      `LimbicTunnel.classical_trapped`, `MTheoryIsomorphism.X7_is_7D_product`,
      `ScaleUniverse.scale_shift_preserves_structure`, `SomaNetwork.sft_gate_toward_awe`,
      `UniversalSomaticField.greens_fn_is_SHO` (declared a placeholder in P11) and
      `sft_encapsulates_cemi`. And 20 declarations rest on `sorryAx`, in four modules
      (BRECVEMAVariational, DyadicField, SomaNetwork, and ScaleUniverse, which has no
      `sorry` of its own: transitively). Papers citing these as theorems or
      kernel-checked should say so; the ledger flags the sorry ones, not yet the `True` ones.
      (13 Oct: six of the eight fixed. The two `True` holonomy fields are removed from
      `G2Compactification` (the holonomy is the labelled axiom's job); `X7_is_7D_product` now
      states `Module.finrank ℝ CompactX7 = 7`; `sft_encapsulates_cemi` states
      `Nonempty (FieldEquation ⟨7,_⟩)`; `sft_gate_toward_awe` and `classical_trapped` are real
      theorems. Left as honest placeholders, disclosed as such in the books:
      `scale_shift_preserves_structure` and `greens_fn_is_SHO`. books.yaml called the first
      "kernel-verified" (twice): corrected. The formal-mathematics book now states the X7
      dimension; P11 lines 249 and 1034 describe the frozen version, to update in its next
      version. The ledger now also reads the data files (books.yaml, the manifest, registry
      concepts, tours and levels, the app's cheat sheet), finds unbackticked declaration names
      there, and flags anything called kernel-checked or a theorem that proves only `True`.)
- [x] Remaining `sorry`s: `BRECVEMAVariational.lean` (2: the above and
   `moduli_space_is_G2_homotopy`), `DyadicField.lean` (2: block-sum lemma and
   the `Field8` transfer of `dyadic_energy_coupling_lowers`), `SomaNetwork.lean`
   (1: `sft_ne_classical`, waiting on the `Field8` migration).
      (13 Oct: done: `count_sorries` total 0. DyadicField's block decomposition is proved and the
      transfer goes through `W8_eq_W8ℝ` (SomaField.lean); `sft_ne_classical` is proved. The books
      and the Lean appendix say "no real sorry remains".)
- [x] Field8 Float→ℝ migration (see the ISS-009 follow-ups) unblocks the
   `DyadicField` and `SomaNetwork` debts.
      (13 Oct: not needed: both layers are already ℝ; the debts closed without it.)
- [x] Optional good-citizen step: an issue or note to the OSforGFF author
   saying where the library is used (no code change needed).
      (13 Oct: done: the PR, mrdouglasny/OSforGFF#22, links the author's work.)

**Closed 2026-10-13:** on v4.33.0, reproducible from a clean clone; no real `sorry` remains;
six of the eight `True` placeholders replaced, the other two disclosed as placeholders. The
v4.34 move is ISS-085 (parked).

---

## ISS-037: MOTHER/H-AL voice — CLOSED
{{Tags area.app}}
{{Fields date.created=2026-10-03, date.start=2026-10-03, date.end=2026-10-13, epic=}}

Answers in the MOTHER terminal can be read aloud (SPEAK toggle, `/speak`,
`/stop`, Esc). H-AL uses the HAL 9000 Piper voice (campwill/HAL-9000-Piper-TTS,
private use only, model outside the repo) through the local bridge's
`POST /speak`; MOTHER and the fallback use the browser's Web Speech API.

**Actions:**
- [x] 2026-10-03: bridge `/speak` (optional Piper; `/health` reports `voice`),
   `voice.js` in the app, SPEAK toggle and slash commands, README setup.
- [x] Speak the WHAT [T]-THEORY ADDS section on request (`/speak diff`). Done 9 Oct
      (mother.js: the last compare answer's section, in the current persona's voice).
- (moved to ISS-082) A licence-clean neural voice for public MOTHER (a stock Piper voice such…
- [x] 2026-10-04: narrated tours: tour stops are spoken (ISS-038).

---

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-038: soma-tour language and MOTHER/H-AL observatory mode — CLOSED
{{Tags area.app, area.books}}
{{Fields date.created=2026-10-04, date.start=2026-10-04, date.end=2026-10-13, epic=}}

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
- (moved to ISS-083) Per worked example "Show me" tours in the textbook HTML (one block per…
- [x] More presets from Dist PROMPTS.md (one per audience section). Done 9 Oct:
      `for-physicists`, `for-neuroscientists`, `for-doctors`, `for-musicians`,
      `for-engineers` (5-7 stops each, pokes where they help; therapists have
      `hal-therapist`, `hal-consulting-room`, `hal-gestalt`). All stops render.

---

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

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

## ISS-040: Field Atlas print edition for bookfactory.ch, and plate-led layout — CLOSED
{{Tags area.books}}
{{Fields date.created=2026-10-04, date.start=2026-10-04, date.end=2026-10-13, epic=}}

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
- (moved to ISS-001, the Atlas print step) Author: confirm bleed and safe zone…
- (moved to ISS-001, the Atlas print step) Cover file (spine width from bookfactory…
- [x] 2026-10-04: plate-led level spreads, as specified by the author: the level
   opener alone on a right-hand page (centred title, scale and response time,
   equation, facts table); full-height triptych on the facing left-hand page;
   callout plate on the next right-hand page; then the text. All 31 levels
   verified on the correct side in both editions; Atlas now 254 pages.
- [x] (superseded by the item above) Plate-led level spreads (brainstorm): each level
   opens on a right-hand page with the level table alone, designed as an
   artistic page; the image plates follow full page, starting on a left-hand
   page so plates face each other; the 4D / 8D / 11D triptych becomes three
   full pages (currently squeezed under the table, which clips the figures,
   e.g. Human / Vertebrate p. 59). Roughly 31 x 4-5 pages: about 300-330
   pages in all, within the 400 maximum.
      (13 Oct triage: superseded, as it says: the plate-led spreads were built 4 Oct)
- (moved to ISS-083) Companion volume (brainstorm, author to confirm)…

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

**Closed 2026-10-13:** the plate-led print edition is built; bookfactory's settings, the cover and the companion volume are the author's (ISS-081).

---

## ISS-041: [T]-Theory course book (textbook edition becomes the course) — CLOSED
{{Tags area.books}}
{{Fields date.created=2026-10-04, date.start=, date.end=2026-10-13, epic=}}

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
- [x] Draft the chapter plan for author review. (Approved 2026-10-05: the plan above.)
- [x] Licence check of each OpenStax maths source. (2026-10-04, each copy's own copyright page:
      docs/agent/OPENSTAX-SURVEY.md; Calculus and University Physics are CC BY-NC-SA, reference
      only, the toolkit written in our own words.)
- [x] A4 defaults, parts (3b58411); generated numbering with pandoc-crossref (7ce084a).
- [x] Visualize macro (docs/VISUALIZE.md), toolkit M1-M6, chapter 3 Frequencies (5 Oct, c9228e5).
- [x] Chapter 4 zooming (T3), Part III 13-15 (T4-T6), Appendix F Atlas cross-reference, Visualize retrofit of 5-8 and 10-12, glossary (5 Oct, to 03:30).
- (moved to ISS-081 for the reading, ISS-051 for the banners) Author read-through; chapter-opening banners for M1-M6, 3, 4, 13-15; release dec…

---

**Closed 2026-10-13:** done; what was left (the author's own step) moved to ISS-081.

## ISS-042: Collected Works side files (Me/chats/notebooks/The_Soma-Field_Collected_Works) — CLOSED
{{Tags area.app, area.proofs, area.books}}
{{Fields date.created=2026-10-05, date.start=, date.end=2026-10-13, epic=}}

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
- [x] (done above) Optional small, honest Lean file for the philosophy band: Russell's
   epochs as an ordered type matching `registry/eras.yaml`'s philosophy band,
   and the true statement that `philosophyZoom` preserves rationality
   (`rfl`). Label `kernel-verified` only for what it proves.
      (13 Oct triage: done, as the item says)
- (moved to ISS-083) Dual-emotion model…
- [x] UI completeness claim (`ttheory-ui-completeness-proof.md`, prose only):
   either state and prove a precise control-to-state surjectivity, or drop the
   word "proof".
      (13 Oct triage: no live document calls it a proof; the word survives only in the incoming RC1.1 file uat/RC1.1/inbox/SomaMachine/ttheory-ui-completeness-proof.md, a historical record left as it was; scale-morphisms.js names it as a source)
- (moved to ISS-083) Instrument extras not in U…
- (moved to ISS-081, done) Workflow extras…
- [x] `ttheory-cheatsheets-vault.md` (11 book assets, equations, field notes):
   check against the current cheat-sheet sources (ISS-031) for anything not
   carried over.
      (13 Oct triage: checked: books/T-Theory/books.yaml carries every book's why, field notes and Sherlock audit from the vault, reworded to drop its overclaims (invented Lean hashes, "Verified without Sorry"); nothing left to carry)

**Closed 2026-10-13:** the side files are carried, quarantined or with the author (ISS-081).

---

## ISS-043: Upgrade pandoc and pandoc-crossref together (after the release) — PARKED
{{Tags area.build}}
{{Fields date.created=2026-10-05, date.start=, date.end=, epic=}}

Parked by the author on 13 Oct (was on hold until after Mk 1). The course book now uses pandoc-crossref (BUILD.md rule 4b). Installed:
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

## ISS-045: HAL next steps — PARKED
{{Tags area.ops}}
{{Fields date.created=2026-10-06, date.start=, date.end=, epic=}}

Fully parked by the author on 13 Oct (was on hold until after Mk 1). Parked by the author after the Git Bash work of 6 Oct (ISS-044). HAL now runs
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

## ISS-046: Open items carried over from the old CURRENT.md (1-6 Oct 2026) — CLOSED
{{Tags area.papers, area.books, area.app, area.proofs}}
{{Fields date.created=2026-10-06, date.start=, date.end=2026-10-13, epic=}}

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
- [x] OSforGFF pull request mrdouglasny/OSforGFF#22 awaiting review.
      (13 Oct triage: still open upstream, 13 Oct; tracked in ISS-036, which drops the patches once it is merged)
- [x] Optional: `git worktree remove ../U-lean-v433`.
      (13 Oct triage: done: no such worktree any more (git worktree list))

**App (ideas from the 1 Oct notebook review and the design note
`docs/agent/APP-ATLAS-DESIGN.md.OBSOLETE`; its design principles are in the
app README):**
- [x] A display-mode axis `4d-baseline | 7d-usf-field | 8d-life | 11d-mind` in
      `operator-theory.yaml` (the app has `dim=4|8` today).
      (13 Oct triage: superseded: the app's 4D / 8D / 11D dimension switch (dim=4|8|11))
- (moved to ISS-083) A gravity view pairing…
- [x] Mind rank N(σ) beside physical scale; the user source term J_user(t) as
      a control; a benchmark suite for validation. Theory data stays out of
      browser JS.
      (13 Oct triage: J(t) is the POKE FIELD / J(t) control; N(σ) is tracked in ISS-052 (it waits for a sourced value); the benchmark is paper/proofs/Benchmark.lean)
- [x] Type guard (on by default): each level declares which layers its type
      admits. With the guard off the user may add any layer anywhere (feelings
      in a rock) and the app shows a red `ILL-TYPED` banner naming the rule.
      To make that honest, generate a small Lean file from the registry (one
      inductive per level's admissible layers) so the rejection is a real type
      error. Links to Sherlock.
      (13 Oct triage: tracked in ISS-063, OWL classes as Lean types)
- [x] (Sherlock's reasoning plan, 10 Oct: ISS-055.) Sherlock concept registry `registry/concepts/<id>.yaml`: concept,
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
      (13 Oct triage: done: v0 registry/concepts, make concepts, release-check section 19, the SHERLOCK panel; the next steps are ISS-063 and ISS-059)
- (moved to ISS-063) Sherlock finding, 9 Oct: none of the 16 OpenCyc constants…
- (moved to ISS-083) Visual rhymes…
- [x] Public app at https://www.t-theory.org/app/ (first published 6 Oct from
      U 424c0a9 into ITI-Theory/t-theory.org, by hand). `make app-publish`
      (DRY=1 first) now builds, checks for private material, copies, commits
      and pushes (8 Oct). The MOTHER notebook link in the build is the
      programme's public notebook (WEB mode, mother/README.md), not a leak;
      the check rejects the private notebook ids from mother.local.json.

**Books and Atlas:**
- (moved to ISS-083) Each Fractal Thesis book: a domain introduction spread…
- (moved to ISS-083) Field Atlas: Physical / Field / Mind parallel layout…
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

**Closed 2026-10-13:** every carried-over item is done, superseded, or tracked where its pointer above says.

---

## ISS-047: RC3 UAT: author session of 7 Oct 2026 and follow-up — CLOSED
{{Tags release, uat}}
{{Fields date.created=2026-10-08, date.start=2026-10-07, date.end=2026-10-13, epic=ISS-047-rc3-uat}}

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
  - [x] MOTHER only works with the author's NotebookLM login: give MOTHER a
        backend others can use (ISS-048, parked).
        (13 Oct triage: tracked in ISS-048, SOMEDAY)
  - [x] Soma Machine as the workstation: shell to local/remote machines, file
        browser, full screen on tablets; local app server for several screens
        (notes 3-4). HAL tablet install on hold (ISS-045).
        (13 Oct triage: done: MOTHER /shell (a local shell), SCRIBE (the files, vim keys), F for full screen, several windows (screens.js); remote machines and the HAL tablet in ISS-045, ON-HOLD)
  - [x] Cockpit/HUD with a fractal journey per level, Sherlock as the HUD, FX
        slider, era views; must stay abstract; pokes must show their effect
        (notes 5, 7; pokes in ISS-046).
        (13 Oct triage: done: ?screen=cockpit as the HUD, the Φ LIMBIC/FX slider, the SHERLOCK panel, era views, pokes that show their effect (ISS-052))
  - [x] Sherlock: OWL classes mapped to Lean types (note 8; concept registry
        and type guard in ISS-046).
        (13 Oct triage: tracked in ISS-063)
  - (moved to ISS-079, done) Autopilot correction (note 9)…
  - [x] Engine room view for all settings (note 10).
        (13 Oct triage: done: ?screen=engine, below)
  - (moved to ISS-083) MOTHER follows a wandering chat…
  - [x] HAL's private knowledge (AJ wiki, links, books) with a switch per
        source; bulk sorting (notes 12-13; ISS-048 and ISS-049).
        (13 Oct triage: tracked in ISS-048, SOMEDAY, and ISS-049)
  - (moved to ISS-083) Test book: a topic suggested…
- [x] D1 (`SFT-DEMO-CASE`, self-case paper): public, as decided 16 Aug (the
      author considered private, then kept it public because it was already on
      Zenodo: record 20459826, open access). PAPERS.yaml matches; no change.
- [x] Runbook step 1, Zenodo audit (8 Oct): 25 community records, all match
      PAPERS.yaml (none missing, no version DOIs, no extras).
- [x] Runbook step 4, `make uat-check` (8 Oct): 15 PASS, 3 WARN (5 sorries, research
      gaps, 44 pending uploads), 0 FAIL. Check 2 had reported zero sorries; its
      pattern missed `sorry -- ...` and `by sorry`. Fixed (count_sorries.py).
- [x] NotebookLM UAT for RC3. Versions now in file names (rc3.1 = U aa28403);
      notebooks keep the previous version for a CMP item. Papers: S-1..S-4, H-1
      PASS; H-2, H-3, C-1..C-3 and CMP not run (daily chat quota): resume with
      `make uat-nlm TRACK=papers KEEP=1 ITEMS=H-2,H-3,C-1,C-2,C-3` (superseded:
      rc3.2 is staged, so run the full papers track again, CMP against rc3.1). Then
      `make uat-nlm TRACK=ttheory` (DRY=1 first).
      (13 Oct triage: superseded: Mk 1's NotebookLM UAT, ISS-001)
- [x] Runbook step 3, visual acceptance of each staged PDF (author).
      (13 Oct triage: superseded: the UAT runner's PDF steps, uat/checklist.yaml, ISS-001)
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
- [x] P1 (soma-field-paper) lost 23 lines of text in 7f794dd (23 Aug): an image
      replaced the end of the body-schema paragraph and the phantom-limb,
      body-schema and somatic-modes paragraphs. Restored 9 Oct; P1 already
      needs a new Zenodo version (Dist/PAPERS.yaml), which must carry them.
      (13 Oct triage: restored 9 Oct; its new Zenodo version is ISS-001's Zenodo step)
- [x] Demo of 9 Oct (psychotherapist, UAT build): spoken H-AL tour
      `registry/tours/hal-therapist.yaml` (15 stops, about 3 minutes; open
      `#tour=hal-therapist`, H-AL voice via `make mother-bridge`). Small
      findings from the demo go in the log below, one line each, and are fixed
      or moved to their own issue afterwards.
      (13 Oct triage: held; its findings are logged below and fixed)
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
- [x] Demo held 9 Oct by phone, on her older copy of the app (no tour). Her
      feedback: "why a presentation for a Gestalt therapist?" The levels view
      gives a good overview; what she needs is "how does it help my daily work".
      Next version for therapists: the poke as the core (4D memoryless
      stimulus-response vs 8D history and context vs 11D unforced change;
      dyad rupture and repair; neuron-only vs whole-person poke), then the
      limbic system (the L1 axis of the 11D split), the Penrose gap and current
      AI, individuals to groups. Needs a tour field that fires a poke, and a
      poke panel for the whole brain (only human, dyad and neuron have one).
      (13 Oct triage: done 9 Oct, the sub-item below)
  - [x] Done 9 Oct: tour field `poke: weak|strong|twice`; whole-brain state
        panel (4D evoked potential, 8D cortical up/down states with adaptation:
        the brain alone forgets within seconds, 11D field synchrony as the CEMI
        layer); `registry/tours/hal-consulting-room.yaml`, 33 stops, 8.9 minutes
        measured: the poke without history / with history / unforced change,
        dyad deflection, rupture and repair, confluence, kinesthetic
        resonance (HAL-UAT, Mann ch. 7, 17-19, Frank ch. 2-3), neuron vs brain vs
        person, the limbic axis, AI and Penrose, groups, and what it could and
        could not do in daily work.
- [x] RC3 decision recorded in `paper/UAT.md`.
      (13 Oct triage: recorded: RC3 superseded by Mk 1, paper/UAT.md)

- (moved to ISS-081, done) P21 sign-off blocker (author, physics)…

**Closed 2026-10-13:** RC3 is superseded by Mk 1 (ISS-079); every finding is built, or tracked where its pointer above says.

---

## ISS-048: Self-hosted HAL: open model plus grounded chat over the corpus — CLOSED
{{Tags area.app, area.ops}}
{{Fields date.created=2026-10-08, date.start=, date.end=2026-10-13, epic=}}

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

**Closed 2026-10-13 (won't do):** author, 13 Oct: not doing this: the programme uses Lean and NotebookLM, no models of its own ("if I change my mind, I can open them up again").

---

## ISS-049: Chats out of Me: private marking, lift, knowledge base — CLOSED
{{Tags area.ops, area.books}}
{{Fields date.created=2026-10-08, date.start=2026-10-08, date.end=2026-10-13, epic=}}

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

**Done 10 Oct:** volumes 8-14 (224 files: the Google Takeout import of 9 Oct
and chats since 8 Oct) collated the same way and loaded as group `chats-new`;
HAL-UAT has 38 of 50 sources. Volumes 1-7 had been collated before the
Takeout, so H-AL had not seen the April 2026 chat on an OpenCyc knowledge base
in Lean with Aesop.

**Earlier ideas (from HAL-UAT), none built:** `make lift` (Me to U, 10 Jun),
segment tags (28 Jun), `visibility: private` (16 Aug, considered for D1, then
dropped: D1 stays public), disclaimer headers (21 May / 10 Jun; in 7 files).

**Proposal (to decide):**
- [x] Whole files: `visibility: private` in the header (default public).
      (13 Oct triage: done: lift skips them (Me/chats/scripts/lift_chats.py))
- [x] Parts of files: `<!-- PRIVATE -->` ... `<!-- /PRIVATE -->`.
      (13 Oct triage: done: lift strips them)
- [x] `make -C Me/chats lift`: copy non-private files with private blocks
      stripped; refuse contact details and keys.
      (13 Oct triage: done (Me eaab5e1): 247 public files, 22 refused for contact details or keys, report in tmp/lift/REFUSED.md; DRY=1 to preview)
- [x] `make -C Me/chats collate`: rebuild the volumes (today a one-off script);
      refresh HAL-UAT after big sessions.
      (13 Oct triage: done (Me eaab5e1): 15 volumes in tmp/collated, the old format; the HAL-UAT refresh is the item below)
- (moved to ISS-083) Knowledge base: HAL-UAT writes a master index…

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
- (moved to ISS-001) Then `collate` (item above) and refresh HAL-UAT…

**Closed 2026-10-13:** marking, lift and collate are built (Me eaab5e1); the HAL-UAT refresh is a go-live step (ISS-001), the knowledge base an idea (ISS-083).

---

## ISS-050: NotebookLM sources: folders and book selection — CLOSED
{{Tags area.ops, area.books}}
{{Fields date.created=2026-10-08, date.start=2026-10-08, date.end=2026-10-13, epic=}}

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
- (moved to ISS-083) Switch sources per group within a notebook…
- [x] `make` target: copy the listed sources into `upload/` (merging where the
      limit needs it) and upload with the bridge (`--dry-run` first).
      Done: `make -C Me/notebooklm load NB= GROUPS= [DRY=1]` (`load.py`, 8 Oct), used 9 Oct for HAL-UAT; it renews the session itself.
- (moved to ISS-081, done) Move `Me/notebooklm/rosetta.pdf`…
- [x] Soma Machine Engine Room panel "Fuel" (knowledge banks, as in Star Trek's
      "load the medical database"; author 8 Oct): which groups are loaded in
      each notebook with a switch per group, a gauge (sources used of 50, chat
      quota left), "load gestalt" through the MOTHER bridge calling the same
      loader (`make -C Me/notebooklm load`); later by voice. Links to the Engine
      Room idea in ISS-047.
      (13 Oct triage: done 9 Oct: the engine room's FUEL (banks per notebook, USE FOR H-AL, the usage gauges; screens.js, bridge /fuel, /usage, /hal-notebook); loading a group from the panel goes with the per-group switch, ISS-080)
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
- (moved to ISS-001, go-live) The old HAL notebook (d6cfc42e) is empty…
- [x] NotebookLM usage (9 Oct): `make nlm-usage`, bridge `GET /usage`, two gauges
      in the engine room FUEL (five-hour, weekly; reset times from the server),
      UAT runs check the window first. A question costs about 1.6% of the
      five-hour window; audio/video overviews about 44%; uploads are not counted.

**Closed 2026-10-13:** the notebooks, loader, FUEL panel and gauges are built; the per-group switch is an idea (ISS-083); rosetta.pdf is moved, the old notebook goes with go-live (ISS-001).

---

## ISS-051: Visualize everything: mark up all equations, generate every figure, show the equation by default — CLOSED
{{Tags area.books, area.instrument, area.visualize}}
{{Fields date.created=2026-10-09, date.start=2026-10-09, date.end=2026-10-13, epic=}}

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
- [x] (13 Oct, lib/format/visualize.lua, docs/VISUALIZE.md: in HTML a display equation and the
      figures directly after it become one panel, radio buttons and CSS, no JavaScript; 71 panels
      in the course book, 217 in the papers; checked in a browser with JavaScript off; PDFs
      unchanged) HTML: a tab panel per marked equation: EQUATION (first, default),
      FIGURES (each output), LEAN (the theorem, when the context is
      `lean:`), READ MORE (the paper section, the level in the Soma Machine, the
      reading list). Works without JavaScript (first tab visible).
- [x] (13 Oct, agent: 40 more figures in 9 papers, ZSF 8, P1 8, the two QFT papers 8,
      swarm 4, patient POV 3, temporal 3, quantum 3, limbic 3; `make visualize-coverage`:
      papers 204 of 233, books 35 of 38, course 131 of 142; the rest are definitions,
      identities or abstract operators with nothing honest to draw.)
- [x] (13 Oct, agent, "literally everything": the last 35 equations marked up in 9
      papers, 3 books and 6 course chapters, each figure an honest picture of
      the equation's own form, without invented data: abstract operators are
      drawn at stated or illustrative parameters and labelled as such, and
      definitions are drawn as `type-decomposition` or `process-diagram`.
      `make visualize-coverage`: papers 234 of 234 (P25 added one), books 38 of
      38, course 142 of 142. `make visualize-library`: 411 figures, every
      `expect_*` check passes; builds of the 9 papers, 3 books and the course
      exit 0.)
- [x] (9 Oct: `make visualize-coverage`: papers 0 of 233 display equations have a
      figure, books 1 of 38, course 52 of 142; the paper builds now carry the
      reader and filter with `visualize-show: none`; P1 marked up: 8 figures, 2
      checks; Gestalt field dynamics: 7 figures, 6 checks;
      music affect dynamics: 4 figures, 3 checks;
      missing limbic layer: 5 figures, 4 checks;
      11 Oct: soma-temporal-dynamics: 4 figures, 0 checks (7 of its 11 display
      equations are PDE/operator statements, boundary conditions or Lean
      type signatures with no numeric form to draw and are left unmarked);
      swarm-propagator: 2 figures, 1 check (6 of its 8 equations are abstract
      matrix/operator identities with no concrete numbers, left unmarked);
      the-tensor: 0 figures, 0 checks (its 3 equations are a vector score with
      no closed form, a deliberately unspecified rendering function, and a
      gradient-flow equation whose potential is never given — none can be
      drawn without inventing data);
      zoomable-somatic-field: 10 figures, 1 check (13 of its 23 equations are
      product/type decompositions, PDE/operator statements, Lean type
      signatures, a trivial arithmetic identity, a matrix-valued coupling
      equation and a near-exact restatement of an already-drawn equation,
      left unmarked);
      universal-somatic-field: 3 figures, 1 check (10 of its 13 equations are
      the same product/type-decomposition and Lean-signature forms, an
      abstract Fock-space operator sum, and two gradient-flow equations whose
      Hamiltonian $H$ is never given a concrete form in this paper, left
      unmarked); 11 Oct: new primitive `type-decomposition` (a whole split into
      typed parts, widths by dimension, an optional second decomposition with
      $\cong$; checks the total and that both decompositions agree), used for
      the M11 = M4 x P3 x L1 x C3, X7 and M-theory isomorphism equations in
      zoomable-somatic-field (3), universal-somatic-field (3) and
      swarm-propagator (1), each total checked; papers 50 of 233;
      11 Oct: cosmological-constant-derivation: 10 figures, 9 checks (the
      new type-decomposition primitive for the 7/11 compact-dimension split;
      7 of its 17 equations are near-exact restatements of equations already
      drawn or trivial identities with no free quantity, left unmarked);
      mathematical-co-identification: 5 figures, 0 checks (Veneziano's
      amplitude drawn as the known pole structure of $\Gamma(-\alpha(s))$
      with no Gamma evaluation needed; 7 of its 12 equations are a process
      diagram, abstract Hamiltonians and a PDE with no stated parameters or
      closed form, left unmarked); dark-matter-spatial-vacuum: 6 figures, 3
      checks (the $\Phi_{MN}$ block matrix and the observed five-sector
      budget each get a type-decomposition; 5 of its 11 equations, including
      the abstract's own copy (YAML front matter, outside the document body),
      are near-exact restatements already drawn, left unmarked);
      soma-field-book: 8 figures, 1 check (defaults/book.yaml had no
      `{{Visualize}}` reader, filter or metadata at all, so its macros were
      leaking into the PDF as literal text — fixed, and visualize-reader.lua's
      Markdown extension set widened to the union both defaults files need;
      17 of its 25 equations are abstract gradient-flow/coupling-matrix
      restatements needing a matrix primitive, or near-exact restatements
      already drawn, including Appendix A's six-equation condensation of the
      main text, left unmarked); papers 79 of 233;
      11 Oct: revisited equations skipped for want of a primitive, now that
      `matrix-heatmap` and `process-diagram` exist: soma-field-book's
      $W_\text{C-PTSD}$ and developmental-age interpolation (2 more figures,
      matrix before/after/difference over the text's own fear/shame/calm/anger
      example); zoomable-somatic-field's FM-HN weight-modulation equation (1
      more figure); mathematical-co-identification's abduction loop, the
      Hopfield/Ising and renormalisation-group coupling matrices, and the
      Black-Scholes closed-form call price using the new `normcdf` (4 more
      figures, the at-the-money call checked at 6.80); swarm-propagator's
      classical-vs-propagator matrix recursion, sparse vs dense (1 more
      figure); universal-somatic-field's $\Sigma$-type sum, drawn with
      `type-decomposition`'s `op=oplus` (1 more figure); 9 figures added
      across these 5 already-marked papers;
      usf-interacting-qft: 3 figures, 0 checks (first pass; the Hopfield
      weight matrix, the mass-renormalisation curve with its critical
      coupling checked at exactly zero, and the Gaussian UV regulator; the
      bare action functionals, the Lean effective-mass definition and the
      phase-transition table give no further concrete form, left unmarked);
      g2-symmetry-breaking: 2 figures, 9 checks (first pass; unusually, this
      paper states exact numbers rather than illustrative ones: $W_{G_2}$,
      $W_8$ and $\delta W$ as matrix-heatmaps, the stated trace and all
      eight eigenvalues of $\delta W$ checked against the text);
      usf-euclidean-qft: 3 figures, 0 checks (first pass; the free
      propagator, the retarded propagator and the OS4 clustering decay; the
      generating functional, Lean theorem statements and the interacting
      field equation give no further concrete form, left unmarked);
      geographic-somatic-field: 3 figures, 2 checks (first pass; equation
      (1) as in the other USF papers, the social-Hopfield sigmoid, and the
      Toner-Tu/parakeet murmuration drawn with the generic Vicsek `flock`
      primitive, captioned as not a simulation of the real reservoir
      geometry or flock size); quantum-soma-penrose: 3 figures, 2 checks
      (first pass over QUANT-EXP-1's own stated numbers: the Fear-Awe
      coupling $W=-10$ as a $2\times2$ matrix, the linear transverse-field
      anneal schedule, and the analytic barrier interpolation checked at
      its stated peak; the general 8-mode Hamiltonian, the transverse-field
      Ising Hamiltonian and the tabulated noise-equivalence curve are
      abstract or have no scatter/table primitive, left unmarked); papers 99
      of 233;
      11 Oct 02:40: new primitive `data-points` (tabulated numbers from the
      text as points, a least-squares fit or the text's own model curve;
      checks `expect_slope`, `expect_intercept`, `expect_n`); applied to
      quantum-soma-penrose's previously-skipped (barrier, $T^*$) table, 9
      points, no fit drawn since the text states only that $T^*$ rises
      monotonically, not a rate (checked `expect_n=9`);
      soma-field-paper (P1): 8 to 17 of 42 equations (9 more figures): the
      QFT on-shell propagator as its pole pair (`complex-plane`); the
      Layer-1 noise/HRV relation; the category-functor pipeline
      $\mathcal{M}\to\mathcal{F}\to\mathcal{S}\to\mathcal{P}\to\mathcal{O}$
      as a line `process-diagram`; the fractal output functor
      $F(X)=\text{EmotionalState}\times X$ as a product `type-decomposition`;
      the baseline noise $\mathcal{N}(0,\sigma_0^2)$ (`distribution`); the
      C-PTSD $W_\text{PTSD}=W_\text{sym}+W_\text{anti}$ and the
      developmental-age $W(\tau_d)$ interpolation over the same illustrative
      fear/shame/calm/anger matrices as soma-field-book
      (`matrix-heatmap`, before/after/difference); the ASC sparse coupling
      $W_\text{ASC}=W\odot M_\text{sparse}$ (`matrix-heatmap`); the C-PTSD
      memory kernel's loop integral as an illustrative `convolution`; the
      generic Hopfield/Ising energy definitions, the Wick-rotation identity,
      the landscape-tilt and three-layer ODEs, the plasticity index $\Pi$,
      the compactification and projection functor integrals, the ADHD and
      autism operator modifiers, the B.5 composed ODE and the MSR path
      integral (Appendix D.1) stay abstract or have no closed form, left
      unmarked; three of the new macros' own params used a bare
      `\text{...}}` pattern whose doubled closing brace matches
      visualize-reader.lua's non-greedy `}}` terminator early, silently
      truncating the macro (caught and rewritten as `\text{...}` without the
      extra wrapping braces; the same pattern, uncaught, already exists in
      soma-field-book's committed "the-modification" figure — since fixed:
      `protect()` now scans with brace balancing and errors on an
      unbalanced macro, and that figure gets its full `titles`);
      soma-field-patient-pov: 0 to 5 of 8 equations: the somatic/neural
      coupling (`type-decomposition`), the perception threshold and the
      one-mode landscape (reusing the technical paper's own illustrative
      forms), the two-term memory kernel, and the ADHD $1/f$ noise term
      (white/pink/red spectra); the general Hopfield energy and the full
      C-PTSD/ADHD/composed ODEs stay abstract, left unmarked;
      experimental-validation: its one equation (the God-Knob source term)
      stays abstract, but the double-well $V(x)=W(x^2-1)^2$ named in the
      next sentence is drawn as an energy landscape at an illustrative
      $W=1$, minima at $x=\pm1$ checked (a direct consequence of the stated
      form, not illustrative);
      soma-field-synthesis: 0 to 1 of 2 (the QFT co-identification's
      propagator as its two poles; the Hopfield co-identification's generic
      $H(\mathbf{e})$ stays abstract);
      soma-physical-substrate: its one equation is a prose correspondence
      ("fascial stiffness $\leftrightarrow$ $|W_{ij}|$"), not a quantity —
      no primitive fits, left unmarked;
      ttheory-phenomena: 0 to 1 of 2 (the master Helmholtz equation drawn as
      the standard free-space outgoing Green's function at an illustrative
      wavenumber — the known closed-form solution, not invented data; the
      Conclusion's boxed restatement of the same equation left unmarked);
      papers 116 of 233;
      11 Oct: the nine `books/T-Theory/*/book-*.md` marked up (books 1 of 38
      before, 35 of 38 after): book-law 1 of 1 (energy-landscape); book-
      social-science 1 of 1 (the dyadic coupling block as a 4x4 illustrative
      matrix-heatmap); book-geophysics 2 of 2 (the elastic wave equation
      reduced to a convolution seismogram with illustrative P/S arrivals, and
      the WKB nucleation barrier as an energy-landscape); book-economics 1 of
      2 (the potential-game defining identity left unmarked — an abstract
      equality with no closed form to draw); book-psychiatry-asd 2 of 2 and
      book-clinical-psychology 3 of 3 (energy-landscape, the Langevin
      equation's stationary Boltzmann-like distribution, and — in clinical-
      psychology only — the memory-kernel convolution); book-music-arts 3 of
      3 (the 16-dimensional listener state as a type-decomposition, plus the
      same energy-landscape/distribution pair); book-philosophy 9 of 10 (the
      tensor-product state, a threshold dichotomy, the Hopfield energy and
      its stationary distribution, two memory kernels, a 1D Helmholtz
      Green's-function reduction, and the M11 decomposition; the retarded
      1+1D wave propagator left unmarked — needs Bessel functions outside the
      SAFE expression set, a candidate primitive if more equations need it);
      book-physics 13 of 14 on top of the 1 already present (the same
      energy-landscape/distribution pair, a 1D two-point-function reduction,
      the Lambda_USF/Lambda_obs and Omega_DM comparisons on `log-scale`, a
      memory-kernel convolution, two M11-style type-decompositions, a 1D
      Helmholtz reduction at scale-dependent k(sigma), the classical
      Gamma=0 limit of the transverse-field Hamiltonian, and the W8 = W_G2 +
      deltaW matrix-heatmap decomposition; only the abstract vacuum-amplitude
      definition of Lambda, stated with no concrete numbers at that point in
      the text, is left unmarked). Every book build (`make -C books/T-Theory
      book-<domain>`, or the absolute bld path for book-philosophy and
      book-physics, which have no `book-%` phony alias) exits 0 with the new
      figures drawn and checked; `make visualize-coverage` now reports books
      35 of 38. Primitive candidates from what remains skipped: a Bessel-
      function-capable curve or wave-propagator primitive (book-philosophy's
      retarded propagator; 1 equation so far, below the 3-equation bar) Mark up the papers: every display equation gets a `{{Visualize}}` when a
      primitive fits; a report lists equations with no fitting primitive (new
      primitives come from that list).
- [x] (11 Oct 01:55) New primitives from the skip lists: `matrix-heatmap` (a
      matrix as a coloured grid, rows and columns named; optionally a second matrix on
      the same scale, e.g. before and after, and their difference; checks
      `expect_eigen`, `expect_sum`), `process-diagram` (named steps in a cycle or a
      line, arrows between the boxes, labels on the arrows), and `erf`, `erfc`,
      `normcdf` in the allowed maths (Black-Scholes: the at-the-money call at
      sigma 0.1, r 5 %, T 1 checks 6.80). docs/VISUALIZE.md updated. Applied
      to the skipped equations (coupling matrices, the abduction loop,
      Black-Scholes) and onward to five not-yet-marked papers; see the
      "Mark up the papers" note above.
- [x] (11 Oct 02:40) New primitive `data-points`: tabulated numbers from the text as
      points (error bars, labels), a least-squares fit (linear or exponential) or the
      text's own model curve to compare; checks `expect_slope`, `expect_intercept`,
      `expect_n`. For the (barrier, T*) table and other small datasets.
- [x] (11 Oct: course chapters, `Part2/book/field-atlas-textbook/chapters/*.md`;
      course 52 of 142 before) 05-atoms-quantum-scale 1 to 7 of 11 (photon
      energy, hydrogen levels, Balmer series, the confinement/Coulomb
      energy-landscape at the Bohr radius, the line quality factor, and the
      damped-oscillator poles at the chapter's own atomic $Q$; the general
      $\lambda=h/p$ and the uncertainty inequality stay abstract, and the
      Bohr-radius derivation restates the energy-landscape's already-drawn
      minimum, left unmarked); 07-human-level 1 to 6 of 8 (the double-well
      landscape, its Boltzmann distribution, Kramers escape time, the
      asymmetric escape-time ratio and the Fear-Awe coupling matrix, all at
      the chapter's own worked numbers; the generic overdamped ODE and the
      Langevin SDE stay abstract, left unmarked); 08-two-people-groups,
      11-stars-galaxies, m2-change and m6-chance marked up to full coverage
      (8 of 8, 7 of 7, 9 of 9 and 9 of 9) using each chapter's own worked
      numbers (phase-locking, Kuramoto onset, stellar luminosity/distance/
      Schwarzschild-radius/redshift/rotation-curve examples, rates and
      derivatives, decay and relaxation laws, dice statistics, the normal
      law, random walks and the Boltzmann factor); course 85 of 142 so far.
      02-response-greens-resonance, m1-numbers-units-scale and 06-molecules-cells
      marked up to full coverage (6 of 6, 8 of 8, 5 of 5): the damped
      oscillator's free ringing, its impulse response, two kicks added by
      convolution, the Yukawa nuclear-force range, powers of ten, unit
      conversion, logarithm rules, decibels, power-law scaling, the cable
      equation's Green's function, the neuron length constant and a
      three-neuron Hopfield energy drop, each at the chapter's own numbers;
      m5-vectors-matrices 8 of 9 (work as a dot product, a rotation
      eigen-transform, its characteristic polynomial, and a saddle-point
      vector field, all at the chapter's own worked numbers; the abstract
      eigenvalue/eigenvector definition stays unmarked, restated concretely
      two equations later); course 103 of 142 so far. One macro parameter
      named `lambda` in each of two chapters collided with the Python
      keyword and was renamed `lam` (same value, same caption) after the
      build caught it. Builds verified one at a time with
      `make -C Part2/book/field-atlas-textbook html`, 0 errors; figures
      spot-checked for legible, non-overlapping labels. 03-frequencies,
      10-earth-deep-time-geology, m3-accumulation and m4-oscillation marked
      up to full coverage (10 of 10, 5 of 5, 9 of 9, 9 of 9): Fourier series
      and the convolution theorem, radiocarbon dating, fault friction and
      the Gutenberg-Richter law, Riemann sums and the fundamental theorem
      of calculus, the inverse-square law, simple harmonic and damped
      motion, and $i^2=-1$ on the complex plane, all at the chapter's own
      worked numbers; course 118 of 142 so far. Three more build errors
      caught and fixed: a parameter computed from other parameters by a
      formula string (not supported; scalar parameters must be plain
      numbers, so the derived constant was computed by hand and inlined),
      a parameter used as a bare stand-in for another parameter's formula
      inside a third expression (same fix: the full expression was written
      out instead of referencing the alias), and `\ge` in a matplotlib
      axis label (matplotlib's mathtext wants `\geq`; the prose caption,
      rendered by LaTeX/HTML rather than matplotlib, keeps `\ge`).
      11 Oct: finished the course chapters, 01-fields-waves-scale,
      04-zooming, 09-flocks-swarms and 12-cosmology-dark-sectors to near-full
      coverage (3 of 3, 5 of 6, 2 of 2, 3 of 4: the wave equation's
      travelling-wave solution, a guitar string's harmonics, a block
      average, the Gaussian closure for hidden kinetic energy, both
      Vicsek-model terms (noise and polarisation), the critical density and
      the Planck dark-sector budget, all at the chapter's own numbers;
      04-zooming's zoom operator and 12-cosmology's Friedmann equation stay
      abstract, left unmarked), then 13-eleven-dimensions, 14-dark-sectors
      and 15-evidence-proof to full coverage (4 of 4, 5 of 5, 5 of 5): the
      Kaluza-Klein mass tower, a holonomy-angle check, galaxy rotation
      curves, the lensing deflection angle, and the response grammar as a
      line `process-diagram` ($J\to G_B\to$ response $\to O\to y$); course
      131 of 142 — every course chapter now processed. Two more build
      errors: `\mathbf v_1` (no braced argument) broke matplotlib's
      mathtext, fixed by dropping the bold (plain $v_1$ matches the rest of
      the book); an unescaped comma inside a LaTeX thin-space (`\,`) inside
      a `process-diagram` step's label was read as a step separator by the
      renderer's own comma-splitter, silently adding a sixth, broken step
      (`\,` replaced by `\;`); and that diagram's five step labels, each a
      multi-symbol LaTeX fraction, were too wide for a `layout=line`
      diagram at this box count and overlapped the arrows between them,
      fixed by shortening each label to a single symbol. 11 of the course's
      142 equations stay unmarked throughout: abstract general forms
      (an undetermined $U(x)$ and $F(t)$, a Langevin SDE, the
      eigenvalue/eigenvector definition, a zoom/coarse-graining operator,
      the Friedmann equation with no stated evolution law) and restatements
      of an equation already drawn (the Bohr-radius derivation, the
      uncertainty inequality) — no primitive candidates reach the
      3-equation bar from this list. Builds verified one at a time with
      `make -C Part2/book/field-atlas-textbook html`, 0 errors throughout;
      figures spot-checked for legible, non-overlapping labels and correct
      numbers at every stage.
- [x] (13 Oct, part: render.py writes every figure as PNG, SVG and the CSV of the numbers it was
      drawn from (lines, points, bars, heatmap cells; a process diagram has none); the HTML tab
      panel links both. Then, 13 Oct night: the sweep strip, viz-<id>-sweep.png, one panel per value on one y-scale, for all 91 varied figures, in the HTML FIGURES tab and the figure library, PDFs unchanged; animations replaced by "see it move": flock, the feeling landscape and the score name their Soma Machine view; docs/VISUALIZE.md) More outputs per figure where reasonable: PNG and SVG; a parameter
      sweep strip; an animated SVG or GIF for time-dependent ones; the data
      table (CSV) the figure was drawn from.
- [x] (9 Oct: `lib/visualize/library.py`, 65 figures, 39 pages, 4.8 MB; each
      document also writes its own list in `visualize/docs/`, since the books
      share one manifest) One-file library for chats: `make visualize-library` builds
      `bld/visualize/library.pdf` (each figure with its equation, caption,
      context, source paper and evidence label) and a Markdown index. Gemini
      Gems and NotebookLM read PDFs with images; one file stays inside the
      source limits.
- [x] Soma Machine: the same tab panel for the level equation (EQUATION, FIGURES,
      READ MORE), using the generated figures.
      Done (13 Oct night): the equation panel has EQUATION, FIGURES (n) and READ MORE tabs; the
      figures are the textbook's, mapped to a level by the example that shows it (show="level=..."),
      92 figures on 17 of the 31 levels, with sweep strips (scripts/generate.py levelFigures,
      copies in public/figures/); READ MORE lists their chapters and the level's papers.

- [x] (13 Oct: unchanged throughout; the build still fails on a missing context or caption)
      Rules unchanged: context first, caption required, expressions are maths
      only, `expect_*` checks (docs/VISUALIZE.md).
- [x] (13 Oct, checked: done in 7465632, every listed chapter opens with an `opener=true` figure)
      (from ISS-081, author, 13 Oct: not the author's) The course's chapter-opening banners
      for M1-M6, 3, 4, 13-15 (ISS-041).

---

## ISS-052: The Soma Machine is a mind-body explorer, not a flight simulator — OPEN
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
   to be visualised. **The limbic system** belongs here too (author, 9 Oct,
   23:19): that is where the trauma therapy helped. It is the hinge of the
   story: the limbic field $\Phi$ (the missing limbic layer paper, FM-HN) is
   what lets a stuck state move.
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

- [x] Positioning line (author, 10 Oct 00:10): **"a mind-body explorer: it is a
      SOMA Machine"**. In the explorer title, the button, the tour and
      docs/TOUR-LANGUAGE.md; still to carry into the README, the app README and
      the Observatory Guide.
- [x] The dive (author, 10 Oct: "the final flying view should have the
      jellyfish human, the humanoid of the Field Atlas; increase the FX and
      zoom, so we can go inside"): a first stop HUMAN shows the level view of
      the human through the explorer (Φ/FX makes it glow); going on, the 3D
      camera flies into the chest while FX rises to full and the view blurs
      through the skin, then the body stop opens at the heart and pulls back.
      Going back to HUMAN flies out again. The MIND-BODY EXPLORER button opens
      at HUMAN; the tour pulls out to it before the voyage into the body and
      ends on it.
- [ ] 3D explorer (author, 10 Oct: "the mind explorer needs to be 3D like the DT
      explorer, nice to have"). Opinion (Copilot): yes, and in the same three.js
      scene as the level view, so the dive never leaves 3D. Order by value:
      (1) the landscape as a real terrain mesh to fly over (the "mountains",
      ball and valleys; the checked simulation stays as it is); (2) the brain
      with the limbic structures inside a translucent cortex, orbiting;
      (3) the body inside the jellyfish human, reusing its mesh; (4) neuron and
      network. The limbic hinge stays a diagram (clearer in 2D). Keep the 2D
      drawings as the map and print mode (labels, Atlas plates, phones).
- [x] Asked H-AL (HAL-UAT, 10 Oct 00:30, after the author logged in again; answer
      in uat/RC3/hal-mind-body-explorer-2026-10-10.md). It fits (4D/8D/11D,
      Level 9 humanoid, FM-HN, J(t)); overreach to avoid: clinical or
      diagnostic claims (the instrument is educational, non-medical), Hopfield
      and 11D as model classes not anatomy, consciousness as open hypothesis.
      Missing from the voyage, now steps below. Question was:
      "The Soma Machine is being repositioned as a mind-body explorer rather
      than a flight simulator: a dive from the whole person into the body,
      brain, limbic system, one neuron, a memory network and the landscape of
      states, where the limbic field heats the memories and a resource lets a
      stuck state move. From the sources, what fits the programme best, what is
      missing, and what would a Gestalt or trauma therapist find most useful?"
- [x] **One app, different views of the same thing** (author, 10 Oct 00:30). The
      explorer is a view inside the SOMA Machine, not a second app: one URL
      hash, one Φ/FX bar, one 4D/8D/11D switch, one poke, one tour language,
      one set of windows (screens.js). Each stop names its level
      (`STOP_LEVELS` in explorer.js; generate.py checks the ids): HUMAN, BODY,
      LANDSCAPE → Human / Vertebrate; LIMBIC → Human at 8D; BRAIN, MEMORY →
      Whole Brain / CEMI; NEURON → Cellular / Synaptic (a DYAD stop → Dyad).
      LEVEL VIEW ↗ goes from a stop to its level; the MIND-BODY EXPLORER button
      opens at the stop of the level being shown. Rule for new work: every new
      view links both ways, and the 3D stops go into the level view's own
      three.js scene, not a separate one.
- [x] 3D landscape (10 Oct): `explorer3d.js`, a three.js terrain of the same
      energy as the checked simulation, the ball and its trail, glowing
      valleys at 11D, the camera circling; 3D button (on by default, 2D map
      kept).
- [x] The elevator (author, 10 Oct 00:32: "an elevator for the zoom, and where
      there is something interesting at a floor, step out"; first raised in
      the AI Mode chat of 7 Oct; H-AL's answer in
      uat/RC3/hal-elevator-2026-10-10.md, its "Scale Ladder"): `elevator.js`,
      a panel LIFT in the level view. Floors are the current model's levels
      (21 in the universal catalogue), each with its length scale, the 4/8/11
      lamps and the P/F/M claim badges (SOURCED green, INTERPRETIVE pink); the
      car rides the app's own zoom, the readout shows the ride (scale ×10^d,
      k ×10^-d) and the floor's carrier field, and (∇² + k²) G = δ stays on
      top. STEP OUT at Human, Whole Brain and Cellular opens the explorer at
      its stop; the explorer's STEP BACK IN returns to the floor.
- [x] City, country, mountains (author, 10 Oct 00:40, with the *Hackers* (1995)
      still of towers of code: "towers of code + buildings, plus the
      attractors: a landscape from city to country to mountains"). The 3D
      landscape is now one world in the three layers: 4D the mountains (the
      attractor valleys), 8D + the country (plains that swell and move with
      Φ), 11D + the city of code on the horizon: towers of glowing text made
      of the programme's own formal layer (Sherlock's concepts with their Lean
      names, taller for stronger evidence; the levels' equations), violet
      circuit streets down to the mountains. Labelled interpretive.
- [x] Emotion and thought (author, 10 Oct 00:55: "an emotion and a thought are
      different types of the same thing, triggered by the body, and thoughts
      trigger the body; the subconscious like the quantum foam; do we have
      this?"). Answer (H-AL, checked in the repo; uat/RC3/hal-emotion-thought-
      quantum-2026-10-10.md): mostly yes. Types: Russell's types in the
      Gestalt paper; emotion and thought as poles of one propagator at D8 and
      D9–11; the loop in the dynamics (R_PFC). Threshold: sub-threshold field
      activity is "virtual"; consciousness_dichotomy (kernel-verified, an order
      fact only). Quantum: QUANT-EXP-1 and LimbicTunnel.lean (tunnelling
      escapes where classical descent is trapped, 0/48); literal quantum foam
      in warm tissue is an open hypothesis. Built: the THOUGHT stop (sea,
      threshold, emotions at 8D, thoughts with words at 11D, the loop back to
      the body, the quantum flicker), three tour stops, and two Sherlock
      concepts (limbic-tunnelling, classical-trapping; 25 concepts, 7
      kernel-verified).
- [ ] (13 Oct night, part: NEURON in true 3D (explorer3d.js createNeuron3D): the 2D stop's own
      cell lifted into space, saltatory spikes, field rings at 11D, the neighbour behind, labels
      projected; 3D SBS as the other stops. LIMBIC in 3D (createLimbic3D): the eleven dimensions as
      an hourglass, seven body rings narrowing to the limbic ring D8, whose band widens with Phi,
      opening into the three mind rings; the stop's signals as beads. THOUGHT in 3D
      (createThought3D): the sub-threshold sea as a moving surface, swells rising through the
      threshold plane into emotions and on to thoughts at the cortex level, the heartbeat in front.
      BODY in 3D (createBody3D): a translucent figure on the 2D layout, the feeling map's regions
      glowing inside it, the nerves and their signals, the heart, the field's shells at 11D. Every
      stop the issue named now has true 3D; left: to watch them on the projector in 3D SBS)
      All stops in true 3D (author, 10 Oct 01:16: "all rendered in 3D and 3D SBS
      on my 3D projector, 100-inch screen"). Done: 3D SBS for every stop
      (ISS-027), true 3D for HUMAN, LANDSCAPE and DYAD (two jellyfish figures,
      hearts pulsing with the simulated rhythms, ripple rings across the
      contact boundary on each beat, coupling lines that tangle when out of
      step, the shared field at 11D; 3D button, 2D drawing kept). Next, by H-AL's ranking
      (uat/RC3/hal-stereo-explorer-2026-10-10.md): the dyad (two bodies across
      real space, ripples meeting at the boundary), the limbic hinge (7D
      narrowing to the D8 line and opening into 3D), the body inside the
      jellyfish, then thought and neuron. Staging: body at the screen plane,
      deep structures and valleys behind, field and sparks in front.
- [x] FLY (author, 10 Oct 01:49: "a flying view through a fractal landscape that
      matches the level, music would help"; H-AL: uat/RC3/hal-flight-2026-10-10.md,
      its "Fractal Flight"): `flight3d.js`, a slow flight forward through the
      world of the current level, one form per sector: the cosmic web
      (galaxies on filaments), the quantum foam (pulsing bubbles on a
      lattice), the inner sea (fractal coral with flowers, plankton), the
      murmuration (a flock flowing like a fluid), folded strata, a network.
      Motes drift in one flow field (the fluid); Φ is the speed, POKE a surge;
      gentle banking only. FLY ▸ on every elevator floor. Mono and SBS.
- [x] Music: `explorer-music.js`, calm generative ambient (a pentatonic pad per
      world, slow bells, a long echo, low-pass), off by default (H-AL:
      opt-in, no beat, no sharp transients for clients); Φ brightens it, the
      RESOURCE settles the chord on its root, POKE rings a bell.
- [x] PATH (author, 10 Oct 01:55: "boundaries are paths, a path of obstacles,
      but which path? a thought racing through the brain in a tunnel, with the
      fractal; cubic fractals match the towers of code; Mandelbulbs are in the
      chats"): `tunnel3d.js`, a thought (the ball) runs a looping tunnel; each
      boundary is a gate that opens when Φ is above its height (FM-HN), the
      RESOURCE lowers all gates (J(t)), POKE at a closed gate tunnels with
      chance exp(−3 × gap), never zero (LimbicTunnel.wkbAmplitude_pos). Walls:
      dendrites (organismal), Menger cubes (network, systemic, collective: the
      city of code), stars (cosmic); a Mandelbulb (power 8, point cloud) at the
      centre at 11D, the mind.
- [x] FLY at Whole Brain: a raymarched Mandelbulb (shader; power breathes with
      Φ, colour warms with Φ, slow spiral in and out; stereo).
- [x] URETER stop and a Presentation for a urologist (author, 10 Oct 02:05,
      watching PATH: "reminds me of my operation to have my kidney stone
      lasered; a Presentation-urologist"). H-AL's answer is kept private
      (Me/chats/notebooks/HAL-UAT/hal-urologist-2026-10-10.md: the programme's
      earlier urology outlines and the post-operative case study; plain
      language, no 11D jargon, no clinical claims). The stop: a ureteroscope
      view (mucosa, peristaltic rings, urine flow), a stone the scope reaches,
      flow damming and a colic reading; Φ does not open a stone (mechanical,
      unlike PATH's gates) but makes the same stone hurt more; POKE is the
      laser (three shots, dust, flow returns, colic eases). Tour
      `hal-urologist` (11 stops, about 6 minutes).
- [x] POV with the author's name (author, 10 Oct 02:26: "it's a POV, gotta have
      my name"): hal-urologist now tells it as Alistair's own procedure.
- [x] Fantastic Voyage walls (author, with a still of the 1966 film): the PATH
      tunnel and the ureter are lined with cells (a painted Voronoi texture:
      glowing membranes, nuclei), red blood cells drift along the path, a lamp
      travels with the thought; wire walls stay for non-living worlds.
- [x] **The film** (author: "a 30-minute film is almost done; slow down the
      visuals, more voice tours; papers, books and now a film"): tour
      `film-inner-voyage`, 87 stops, about 25-30 minutes: opening titles, the
      mind-body explorer, the path of a thought and flights through the scales
      (Mandelbulb, inner sea, murmuration, cosmic web), the kidney stone, the
      consulting room, the end. Tours can now `include:` other tours
      (generate.py). `?film=1` plays at film pace (0.6; `?pace=` to set) with
      the controls hidden and H-AL's line as a subtitle; add `&stereo=half` for
      the projector.
- [x] **The Tensor's skeleton** (author, 10 Oct 02:48: "look at The Tensor, the
      film paper, do we have the skeleton for it?"). Mapping (paper Part I to
      the app): emotional score e*(t) → `registry/scores/river-film.yaml` (the
      paper's appendix as valid YAML, checked by generate.py) and `score.js`
      (interpolation, story-time); threshold events with hold_until_ready →
      the player holds at T1/T2 until POKE (standing in for biofeedback) or a
      κ_d timer; κ_v → `kv=` (0.1-3); rendering function R, visual map → the
      raymarched Mandelbulb (awe → power 2-8, safety → warmth and light, fear
      → cold hue and rim, grief → desaturation and slow orbit, pre-verbal →
      iteration depth, curiosity → camera reach), Language → subtitles fade
      out; container → the explorer stops and tours (the paper's "Body"
      container is the mind-body explorer itself); the trilogy and string
      diagrams → the dyad. New stop SCORE (`#voyage=score&kv=1&st=0`).
      H-AL could not be asked (NotebookLM login expired again at 02:50).
- [x] The Tensor's somatic loop and audio map (author, 10 Oct 02:58: "slider for
      now"): a heart-rate slider (♥, 50-140 bpm, smoothed like a heart) gives
      e_V (arousal raises fear, lowers safety and language) and Ḣ, the paper's
      primary signal; LOOP cycles κ_r Projection / Resonance / Mirror (the
      viewer's field mixes into the rendered modes; white ticks show the
      score's target); a rising heart slows story-time (×1/(1+3κ_r Ḣ)); at a
      threshold the projection waits on its κ_d timer, the loop waits for the
      heart to settle (falling, below 85), POKE crosses. MUSIC on SCORE plays
      the paper's audio map: safety → reverb, fear → tritone, language →
      plain triad, awe/curiosity → brightness, grief → darker and fewer
      notes, pre-verbal → granular noise. Four checks in explorer-check (18).
      Hash keys bpm, kr.
- [x] (13 Oct, all five built: heart.js, the HRV estimator, kd kt km kw and W*, the river,
      body and session containers, the 90-minute film; real-strap and film UAT are the
      author's, items below) The Tensor, next: (1) a real heart-rate strap (Web Bluetooth, standard
      Heart Rate service) in place of the slider; (2) a better field estimator
      (HRV, breath); (3) the
      remaining knobs κ_d, κ_t, κ_m, κ_W and the coupling W*; (4) containers:
      river, body (the explorer), session (the consulting room) under one
      score; (5) the full 90-minute River Film as a tour of the score.
- [x] MUNCH (author, 10 Oct 03:12, bedtime: "voice files for the Cookie Monster?"):
      not possible (Sesame Workshop's character; no voice files or clones of
      it). Instead an original persona: MUNCH, a gruff, happy little monster
      (voice.js, browser speech, low pitch, quick), selectable per tour step
      with `voice: munch` (also `hal`, `mother`; validated in tour.js and
      generate.py). Tour `munch-bedtime` (13 steps, about 3 minutes): MUNCH
      tries to eat galaxies, foam, cells and the mind; H-AL explains each; a
      calm heartbeat; MUNCH falls asleep in a soft valley.
- [x] The Tensor's other knobs (10 Oct 23:45; score.js `shape`, flight3d.js texture):
      depth `kd` (0 to 1: the pre-verbal descent and the threshold hold, default the
      score's 0.7), texture `kt` (grain and hard edges), coupling `kw` (0.5 to 2, a
      scale on the score's W*, now applied), mode mask `km` (e.g. `S,F,A`); in the
      hash, tours and screens, validated in tour.js and generate.py; explorer-check:
      masked modes are 0, more coupling more awe, depth deeper PV and a longer hold.
      Next: on-screen knobs (MIDI-style, ISS-053), texture in the music.
- [x] (10 Oct 23:58) One score in four settings (the paper's Trilogy of Containers):
      SETTING on the SCORE stop (hash `kc=mind|river|body|session`): the mind (the
      Mandelbulb), the river (the inner sea at the speed fear sets), the body (the
      Fantastic Voyage tunnel; safety is the resource) and the session (the dyad's two
      oscillators, client and therapist; a threshold crossing is a rupture to repair).
      One player drives all four, so the thresholds fall at the same story-times; a
      crossing is a burst in each. Next: Sherlock's analogy test of "all three are the
      same film" (ISS-055). (Done 11 Oct 00:05: a real river, flight3d.js `river`: water
      shaded by its waves, jungle banks of hills and trees, mist; it narrows towards the
      encounter, t ~ 0.7, and opens on the way back; safety warms the light, fear darkens
      the water, the mist closes in as language falls away; the camera low like a boat.)
- [x] (13 Oct: moved to ISS-091, parked) The Bluetooth chest strap, and HRV and breathing
      from its RR intervals (coded; to test with a real strap).
- [x] (13 Oct: the checks moved to the UAT list, uat/checklist.yaml steps `film-river-90`,
      `film-record`, `film-review`) The full River Film, its recording and the author's
      review of every line.
- [ ] Film, next (development): titles and credits; OpenStax Anatomy & Physiology (CC BY;
      Calibre 163, in the HAL-UAT `medical` group, not yet loaded) as the reference for
      accurate anatomy in the body, ureter and brain stops.
- [ ] (13 Oct, checked: the stent mode is done, app README "URETER / stent mode"; the
      author's review of the tour wording is left) Urologist, next: the author reviews the tour wording; a stent mode (persistent signal after the stone);
      calculi sizes and laser settings stay out (no clinical claims).
- [ ] (13 Oct night, part: the dive follows the landscape state (explorer.js mindDrive): H sets
      each dive's power, |grad H| the roll, T_eff the colour, a crossing into another valley the
      burst; explorer-check: calm, no burst; hot with the resource, a crossing. Left: branching
      paths, the granular sound of motion, fluid as a flow solver)
      (10 Oct 23:40: FLY at Whole Brain dives INTO the Mandelbulb: down the line of
      sight to a surface point, zoom to x40,000 at fixed detail (16 iterations), Φ the
      speed, POKE deeper, a burst and a new dive; stereo eye separation follows the
      depth; explorer-check: every dive finds the surface and the camera stays
      outside the fractal. Still open: power from H, rotation from |∇H|, colour
      from T_eff, bursts at threshold crossings.) FLY and PATH, next: fly INTO the Mandelbulb (Fractal Flight
      proper: fly into it; power from H, rotation from |∇H|, colour from
      T_eff, bursts at threshold crossings, after the chats); branching paths
      (several tunnels; which one a thought takes depends on the gates); the
      granular sound of motion; fluid as a real flow solver.
- [x] (13 Oct: the tunnelling move is built: at 11D POKE tries the landscape's lowest
      barrier with the WKB chance, model ħ 0.3; calm 0.2 %, Φ 0.3 2.6 %, in explorer-check; the
      Lean type too: paper/proofs/FieldEvent.lean, emotion at D8 and thought at D9-11 over one
      FieldState, project and lift keep the state, five theorems, a default target) Emotion and thought, next: a Lean type for "same field, different type"
      (an inductive FieldEvent with emotion at D8 and thought at D9–11 and a
      projection between them), so the claim becomes a definition the
      registry can point to; a tunnelling move on the landscape (the ball
      through a barrier, QUANT-EXP-1) at 11D.
- [x] (13 Oct: every tower opens, concepts with their lines, the Lean modules floor by
      floor, ISS-071; the fly-through is left as a later tour move) City, next: towers clickable (open the concept, its Lean file and paper);
      a fly-through from the city down the avenue to the mountains as a tour
      move; the city grows as Sherlock's registry grows.
- [ ] (13 Oct, part: the readout shows τ, the level's response time, beside ℓ, and the
      carrier field retypes as the car rides, "passing → riding to"; N(σ) waits for a
      sourced value: only ScaleUniverse's tensor_rank exists, and it rests on sorry)
      Elevator, from H-AL: show the tensor rank N(σ) beside ℓ(σ), the response
      time τ, and the carrier field retyping as the car moves; more STEP OUT
      floors as stops appear (dyad, swarm, geological memory, cosmic web);
      other buildings next door for other paths (the 7 Oct chat).
- [x] DYAD stop (10 Oct): two people, two rhythms (Kuramoto, as the dyad level),
      coupling across the contact boundary; Φ widens the gap (drift, rupture),
      RESOURCE strengthens the coupling (attuned even when hot), POKE is a
      rupture and the repair is visible; sync r over the last 10 s. Linked
      both ways with the Dyad level (elevator STEP OUT). Checked
      (explorer-check, 14 checks): calm r 0.96, hot 0.70, hot with the
      resource 0.95, repair 1.4 times faster with the resource. Tour: three
      stops before the return to the jellyfish human.
- [x] (13 Oct, the landscape: with MUSIC on, its 8 s phrase rocks the ground towards SAFE
      and back, J(t) = J + 0.12 cos(2πt/8), mean zero; with the noise it lifts escapes
      from FREEZE to SAFE within a minute at Φ 0.4 from about 48% to 90%, a stochastic-
      resonance effect in the model, in explorer-check; the body stop not yet) From H-AL: music as forcing (BRECVEMA mechanisms, rhythm) on the body and
      landscape stops: the Somatron roots of the machine.
- [x] (13 Oct: PAST on the MEMORY stop: recall blends the present with a trace,
      K(τ) = e^(−τ/4 s), drawn as rings; FIGHT feeds FREEZE, not the reverse (the defence
      cascade; interpretive); explorer-check: calm FIGHT ends in FREEZE with it, never
      without) From H-AL: the memory kernel K(τ) and asymmetric coupling (W_ij ≠ W_ji) on
      the memory stop: the past keeps shaping the ground.
- [x] (13 Oct: already there, STEP BACK IN ↩ takes any stop out to its level on the zoom
      dial, STOP_LEVELS) From H-AL: link back out to the zoom dial (the levels), not only inward.
- [x] (13 Oct: a stop in registry/tours/mind-explorer.yaml after the poke that rolls back)
      From H-AL: Beisser's paradoxical theory of change as a landscape tour
      line (staying with the sensation raises Φ, rather than pushing).
- [x] (9 Oct, Friday night: `explorer.js`, the **mind explorer**; tour
      `mind-explorer`, 23 stops, about seven minutes) Origin tour ("where it
      started"): the 1982 memory network, 2020 attention, the limbic field
      (FM-HN), then the landscape and the voyage back into the body. Still to
      add: the levels at the end, and the Visualize figures of P1 and the limbic
      layer paper as stills.
- [x] Inside view ("voyage", 9 Oct): six stops, body → brain → limbic hinge →
      neuron → memory network → landscape, with zoom transitions (Fantastic
      Voyage); the 4D / 8D / 11D switch adds anatomy, electrical activity
      (nerve traffic, low and high road, spikes) and the field (rings, ephaptic
      coupling); POKE works at every stop. Opened from the hash
      (`voyage=`, `phi=`, `feel=`, `resource=`; docs/TOUR-LANGUAGE.md), the
      MIND EXPLORER button, arrow keys and Esc; shared with the other windows.
      Later: link the stops to the existing levels (human, whole-brain,
      cellular-synaptic) and back.
- [x] (9 Oct: the LIMBIC stop and the brain stop; T = T0 + σΦ live) Limbic system stop (inside view and origin tour): amygdala, hippocampus,
      hypothalamus, cingulate as one schematic region between body and cortex
      (the $D_8$ segment between body field $D_{1-7}$ and mind field $D_{9-11}$);
      the FX bar as $\Phi_\text{limbic}$: calm keeps memories deep and fixed,
      arousal melts the valleys, and safe, resourced arousal (the therapy) lets
      the state settle somewhere new. Uses the FM-HN figures of the limbic layer
      paper and the whole-brain panel; evidence labels on the clinical claims.
- [x] (9 Oct: the body stop, eight feelings, a design map after Nummenmaa
      et al. 2014, labelled as not yet audited; still to do: the audit and
      the link to registry/concepts) Emotions on the body: the eight modes as regions or colours on the body
      map (cf. bodily maps of emotions), linked to the concept registry
      (registry/concepts, ISS-046).
- [x] Landscape view (9 Oct): the three memories (SAFE, FIGHT, FREEZE) as
      valleys of the 2020 energy, the state as a ball (Langevin dynamics), the
      FX bar is $\Phi$ (T = 0.25 + 0.6 Φ; the valleys melt just past Φ = 0.5),
      RESOURCE is the driving term J(t). `scripts/explorer-check.mjs` (release
      gate section 20) checks the story many times with fresh noise: calm keeps
      FREEZE (100%), the resource alone does not free it (100%), heat with the
      resource then cooling ends in SAFE (100%), heat without it moves the state
      but not reliably to SAFE (about a third; in the network SAFE or FIGHT).
- [x] (13 Oct, checked: superseded by ISS-075; the app README's "Cockpit vocabulary"
      keeps the cockpit as the design vocabulary of the film and score only) Rework the old cockpit/flight notes (ISS-047, the engine room, FX) under
      this framing; keep the cockpit only as "the view out of the window" onto
      the landscape.
- [x] (12 Oct, author: "Fantastic Voyage's oval things, mesh curtains, hair"; a 3D lining,
      not a wallpaper) The body container's blood vessel built from the wall's anatomy
      (`vessel.js`): endothelial cells as a cobblestone of plates elongated along the
      flow, each with an oval nucleus bulging into the lumen; the glycocalyx as hairs
      swaying in the flow; smooth-muscle rings; red cells. The score drives it: fear
      constricts (vasoconstriction), the heartbeat pulses wall and flow, safety warms,
      grief drains the colour. Later: white cells, platelets, a fibrin mesh, capillary
      pores; move the per-frame pulse into a shader if frame rates suffer.
- [x] (6b9ebd0) The twin view, at the SCORE stop: one film, two viewers
      ($S = R(e^*, \kappa, e_V)$). TWIN (`tw=1`) plays the film twice on the
      river: left the viewer of now (neutral), right a VIEWER preset
      (`registry/viewers`, `pv`) plus ADHD, ASD and C-PTSD sliders (`ca`, `cs`,
      `cp`: P13's model operators, hypotheses, not diagnoses); the knobs and
      the heart move both. FILM (`kf`) picks the River Film or the 2021 film.
      "As I was in 2021" (`v2021`) is fitted by `scripts/fit_viewer.py` from
      the two films (RMS 0.178 to 0.058 over the shared phases; it reads as
      C-PTSD 1.0, curiosity -0.29, safety +0.15). Still to do: the author
      tunes the presets and the condition mappings (and asks H-AL).
- [x] (from ISS-081, author, 13 Oct: not the author's) A DEPTH slider in the engine room for
      `localStorage soma-stereo-depth` (default 1), for the author's calibration with the
      glasses.
      (13 Oct triage: done: DEPTH (STEREO) in the engine room scales every 3D view's eye separation and the 2D stereo, live across windows (1606e3b))
- [x] (13 Oct night: CLIENT in the engine room's DEPTH holds every view at most ×0.6 (a choice for
      the author to check), the slider keeping its own setting; explorer-check covers it)
      (13 Oct, checked: labels stay flat at the screen plane in each eye (explorer.js), stop
      changes ease in and out, one DEPTH slider scales every view (stereo-depth.js, 0 to 2.5);
      left: a moderate depth for clients, not just the author's calibration)
      (from ISS-081, author, 13 Oct: not the author's) (ISS-027) H-AL's cautions
      (uat/RC3/hal-stereo-explorer-2026-10-10.md): smooth transitions only, moderate depth
      for clients (looming 3D can trigger C-PTSD), labels never in depth.
- [x] (13 Oct night: `palace=1&pf=N` in the address (docs/TOUR-LANGUAGE.md; the hash writer keeps
      it), and registry/tours/mind-palace.yaml, seven stops: leave a thought on floors 7 and 8, ride
      to the rock and the top, come back and find them; tested in a browser)
      (from ISS-080) (ISS-078) The palace tour: the method of loci as an exercise. Needs the
      palace in the URL first (palace=1, a floor key) so a tour can ride it.

---

## ISS-053: The externalising machine: you compose your own film, the AI only asks — CLOSED
{{Tags area.instrument}}
{{Fields date.created=2026-10-10, date.start=, date.end=2026-10-13, epic=}}

Author, 10 Oct 04:26 (last thought before sleep): we have 32 knobs on screen
(and MIDI Fighter Twister-style controllers, 16 per bank), each with sub-knobs.
The Tensor is a film made of knobs over time. And it dawned on him: the whole
programme is a **Sensory and Emotion eXternalising machine**. Problem: nobody
knows how to set all those knobs. The common solution, "let the AI do it",
breaks the path: if the AI sets them, *I* am not expressing my emotions. His
solution: **I set the knobs.** I write the story of the film by hand, at most
ten A5 pages in note style; that is the film. The AI (or a therapist, in exactly
the same role, or both together) **questions me**: how I feel, why the film
starts where it does, a few emotions it thinks relevant, and so on; my answers
set the knobs.

Research to check (author's memory; from Copilot's memory, to be verified with
H-AL and the papers): US work found about 13 distinct emotions evoked by music
and about 27 to 30 in visual material (short videos), probably Cowen and
Keltner, PNAS 2017 (27 categories, videos) and Cowen et al., PNAS 2020 (13,
music). That gives the knob vocabulary: 13 for sound, ~27 for picture.

Opinion (Copilot, 10 Oct):

- Right, and it is already in The Tensor: "Composing with the Score" lists five
  questions a composer answers (which modes, the arc, where the thresholds
  are, how deep, the return topology). The AI interview is those questions
  asked of a person about their own story. The person is the composer; the
  AI is the interviewer, never the author.
- Keep the path unbroken with provenance: every knob value carries the
  sentence of the person's own answer it came from, and the person can see
  and override every value. The AI may propose ("you said 'the river
  narrowed'; is that fear, or curiosity?"); only the person decides.
- Knobs in layers, so nobody sets 32 by hand: the seven Tensor modes (or 13
  for music) are the macros the person sets by answering; each macro drives
  its sub-knobs through the rendering maps already in the paper; a 16-knob
  controller can play the macros live.
- Handwriting first is good: slow, embodied, owned. The pages are
  photographed and read in; the interview starts from them.
- A therapist in the same role is the same protocol, which is why it fits
  Gestalt work ("what are you feeling now, as you say that?"). Cautions: it
  is not therapy by itself; stop rules for distress; the AI asks and
  reflects, never interprets or diagnoses; pages and answers stay private
  (Me, not U).

Steps:

- [x] Asked H-AL (10 Oct 17:30; uat/RC3/hal-externalising-2026-10-10.md). The
      research is Cowen and Keltner (PNAS): at least 13 dimensions in music,
      27 in short videos. In the programme those are attractor states, the
      eight BRECVEMA mechanisms are the forcing inputs, and The Tensor's seven
      modes are the compressed axes the categories blend onto. Knob layout:
      16 knobs = 13 music emotions + 3 masters, or 8 modes × (somatic,
      cognitive); 32 = those plus the four masters (scale, time, threshold,
      volition). The interview = The Tensor's five composer questions; the
      AI is a compiler of the person's own answers into keyframes, with
      authorship and provenance in the score's front matter, the person's
      veto through the κ knobs (depth, velocity, mode mask); cautions:
      non-medical, never presume the inner state, establish safety before
      deep thresholds. Usage at 17:25: five-hour 0%, week 9.2%. Question was: "The Cowen and
      Keltner findings (13 emotions in music, about 27 in video): what do the
      sources say, and how do they map onto The Tensor's seven modes, the
      eight BRECVEMA mechanisms and the 32 on-screen knobs? How should an
      AI interview turn ten handwritten pages into a score without the AI
      becoming the author?" Then print `make nlm-usage`.
- [x] (13 Oct: docs/INTERVIEW.md, a draft for the author: safety and consent first, the
      five questions with what each answer sets, probes built only from the person's
      words, provenance, stop rules, system rules for an AI interviewer; not a clinical
      protocol) The interview protocol (a document first): the five composer questions,
      emotion probes, provenance per answer, stop rules; same script for an
      AI or a therapist.
- [x] (13 Oct: score-editor.js, EDIT at the score stop: a mode's points dragged, a point
      added at the playhead, each with its BECAUSE sentence (gold ring), PLAY MINE (kf=mine),
      SAVE downloads YAML with the provenance; kept in the browser, private) The score editor: knobs per mode over story-time, each value linked to
      the answer it came from; the person overrides; saves a score file
      (registry/scores format; private scores in Me).
- (moved to ISS-081) Pages in: photograph ten A5 pages, read them in, keep them private.…
- [x] (13 Oct: midi-in.js, MIDI IN in the Engine Room: CC 0-6 the seven modes, CC 7 Φ, CC 8
      depth, CC 9 velocity, a Twister's factory CCs; tested with a simulated controller;
      the real one is author UAT) MIDI: a 16-knob controller (Web MIDI) for the macros, live.
---

**Closed 2026-10-13:** done; what was left (the author's own step) moved to ISS-081.

## ISS-054: H-AL's name, its own voice and its markup — CLOSED
{{Tags area.instrument}}
{{Fields date.created=2026-10-10, date.start=2026-10-10, date.end=2026-10-13, epic=}}

Author, 10 Oct 17:25: the official name is **H-AL**, short for Hologram
Alistair; `HAL` only in file and command names. The real reason: the voice.
The private Piper voice (a HAL 9000 imitation) is for testing only; the
released H-AL must speak in a voice the author owns, his own: record known
scripts, or his dictation, and train a voice from it, then "halify" it with
rules (vocabulary for the AI that writes the lines, delivery for the speech).
Is there phonetic markup? And there is a W3C emotion markup language, good for
The Tensor. H-AL's answer and the checks: uat/RC3/hal-voice-name-markup-2026-10-10.md.

- [x] Name rule (10 Oct): README "Name"; H-AL in prose, tours, papers and the
      app ("H-AL // HOLOGRAM ALISTAIR" in the MOTHER panel); HAL only in
      commands, files and code; "HAL 9000" only for the film. Audit: tours,
      app text and docs already used H-AL; two code comments fixed.
- Author, 11 Oct 20:43: H-AL should *not* be his own voice; a stock voice
  with the H-AL-ifier is the preferred end state (ISS-065 D5). The two
  recording and training items below are dropped unless he asks again.
- (moved to ISS-082) Record the voice: about one hour of clean, single-speaker audio, 22 kHz…
- (moved to ISS-082) Train: fine-tune a Piper checkpoint on the recordings (piper-train);…
- [x] (13 Oct: the bridge's HAL_DELIVERY for any Piper voice: length scale 1.15, noise
      scales 0.55/0.5, 0.45 s after each sentence, overridable in its local config; the
      browser voice keeps rate 0.88, pitch 0.55; docs/HALIFY.md) Halify, delivery: slower rate, lower pitch, even pitch contour, longer
      pauses at sentence ends (post-processing, or Piper length/noise scales);
      a per-line `pause` already exists in the tour language.
- [x] (13 Oct: docs/HALIFY.md, nine rules; the one-sentence question stays the author's)
      Halify, vocabulary: a rule sheet for the AI writing H-AL's lines (calm,
      measured, no drama, plain sensory words, mathematics on screen not in
      speech, name the evidence label plainly). H-AL quotes a rule "one
      sentence per stop"; the night's film tours use several: author to
      decide.
- [x] (13 Oct: lexicon.js, applied to every spoken line: symbols as words, units in full,
      10^n as "ten to the n", names as they sound; H-AL as "Hal" and BRECVEMA marked for
      the author to check by ear) Markup: SSML is the W3C standard for speech (prosody, break, emphasis,
      IPA phonemes) but Piper supports little of it yet; use a small
      pronunciation lexicon (H-AL, Hopfield, Kuramoto, Mandelbulb, Φ) instead.
- [x] EmotionML (W3C, 2014) can carry a score's mode trajectories as
      `<trace>` samples: add an EmotionML export of registry/scores (coupling
      and thresholds stay in the native YAML). (Done 11 Oct: `make
      emotionml`, `lib/scores/emotionml.py`, bld/scores/<id>.emotionml: an
      inline dimension vocabulary of the score's modes, one trace per mode
      over the film's length at $\kappa_v = 1$, `<info>` pointing back to
      the YAML; the script checks the EmotionML rules it relies on, and the
      W3C XSD reports 0 errors.)

**Closed 2026-10-13:** done; what was left (the author's own step) moved to ISS-081.

## ISS-055: Sherlock: three ways of reasoning over OpenCyc (consistency, proof, analogy) — CLOSED
{{Tags area.proofs, area.theory, area.books}}
{{Fields date.created=2026-10-10, date.start=2026-10-10, date.end=2026-10-13, epic=ISS-055-sherlock}}

**Epic:** [ISS-055-sherlock.md](prj/.adm/issues/ISS-055-sherlock.md) (end state, design decisions D1-D7, sub-issues ISS-056 to ISS-064, the document list).

Author, 10 Oct: model what a document is trying to say or prove as a short
set of checkable facts (an affidavit), typed against OpenCyc, and reason over
it. "Earlier I thought Sherlock was doomed before arrival; now not so sure."
Test case first: The Tensor. Outcome feeds the books (Philosophy may get
shorter if it fails; Law longer if it works: affidavits, precedent).

**Sources (U.Ops repo, `opencyc/`; bibliography: opencyc2012owl, nextkb2019,
forbus2017analogy, chaudhri2025knowledge):**
- [x] OpenCyc 2012-05-10 OWL, version 2.0.0, 242,380 subjects. The readable
      release on most mirrors and archive.org is truncated; the intact copy is
      github.com/therohk/opencyc-kb. `make -C opencyc fetch` checks SHA-256.
      The Cyc server release (binary CFASL world) is not used: OpenCyc here is
      triples only (author).
- [x] NextKB (Northwestern QRG, CC BY 4.0), downloaded only: OpenCyc as CycL
      with ~690 microtheories (one file each), 2,545 `genlMt` links, 681 rules,
      1.3M facts, the NuLex lexicon and FrameNet/VerbNet/WordNet links, the QP
      ontology, the analogy ontology. Fills what the OWL export dropped
      (microtheory of each statement, rules, words to concepts).
- [x] H-AL found the earlier design: the April 2026 chat "lean 4 implementing
      a axiom based knowledge base from opencyc" (collections as types,
      genls as `extends`, properties as typeclasses, microtheories as
      namespaces and parameters, generated Lean, Aesop rule sets per domain,
      the LLM last). It was in the Takeout import, not in H-AL's volumes
      until 10 Oct (ISS-049).
      (13 Oct triage: recorded; the design is what sherlock/ now implements)

**1. Consistency: OWL 2 DL (OpenCyc as one knowledge base, nothing removed).**
- [x] `make -C opencyc ttl repair profile STAGE=repaired`: ten SPARQL Update
      fixes (`opencyc/fixes/NN-*.ru`) take the export from ~1.02M OWL 2 DL
      profile violations to 0 (ROBOT 1.9.10, 10 Oct). Lexical predicates become
      annotation properties, one kind per property, CFASL integers decoded
      ("M4I" = 2), OWL built-ins the export wrote for Cyc constants mapped
      back (`owl:Thing` to `#$Thing`, `rdfs:subClassOf` to `#$genls`, `rdfs:range` to
      `#$arg2Isa`), statements OWL 2 DL cannot state kept as `fix:` annotations.
- [x] HermiT consistency and classification of the repaired KB (3.1M triples;
      running 10 Oct). If the full KB is too large for HermiT: Konclude, or
      locality-based modules (provably complete for every entailment over the
      chosen terms; not a slice of the KB).
      (13 Oct triage: superseded, the Lean route replaced the OWL one (see Parked below))
- [x] The Tensor in OWL (`the-tensor.ttl`, 30-50 triples importing OpenCyc):
      the affidavit (score is a proposal, not what the viewer feels; output
      R(e*, kappa, e_V); container independence; thresholds; somatic loop and
      the three kappa_r modes; the Pensieve claim; "artistic and systems-design,
      not clinical"). Expected findings: "Two operating modes" with three in
      the table (cardinality: certain); the mode Safety has no OpenCyc class;
      the mode Language is a FirstOrderCollection disjoint with VisualWork
      (a film), not an emotion type; the Pensieve file "stores" an experience
      (InformationBearingThing vs mental event: to be checked). Worth it if the
      reasoner finds more than a text linter would.
      (13 Oct triage: superseded, done in Lean instead (the affidavit item below))

**2. Proof: Lean 4 and Aesop, microtheories as scopes.**
- [x] Generate Lean from NextKB (KRF is Lisp syntax): collections, `genls`,
      `isa`, disjointness, the 681 rules as Aesop rules in one rule set per
      microtheory; each microtheory a scope (assumptions as parameters, not
      global axioms), so a contradiction stays inside its microtheory.
      (Done 11 Oct: U.Ops `make -C opencyc lean-gen lean`, all of NextKB,
      1,366,193 facts in 678 microtheories, 923 Lake jobs, 0 errors; one Lean
      process at a time.)
- [x] The Tensor's affidavit in Lean (11 Oct, U.Ops 9268ae9, `make -C
      opencyc affidavits`, about 6 min; done in Lean rather than OWL since
      the KB is there). Findings, each a theorem:
      - Its own numbers (`Affidavits/TheTensor/Score.lean`, core Lean):
        "Two operating modes:" heads a table of three; the model equation
        puts $\kappa_r$ on the film-to-viewer term, so in Projection
        ($\kappa_r = 0$, "the score drives the viewer") the screen signal
        drops out; Threshold 1 ("F > 0.7") is never reached, since fear
        peaks at exactly 0.70 at every rational story-time, so the default
        rendering holds at T1 for ever; Threshold 2 ("L < 0.1 AND
        PV > 0.85") holds at t = 0.70 but fails at its declared 0.74 and on
        all of [0.72, 0.8] (the chart's "t ≈ 0.71" is right, Phase 3's
        0.74 is not); the 0–9 chart and the Appendix keyframes differ in 11
        of 77 values, all at t ≥ 0.7.
      - Against OpenCyc (`Affidavits/TheTensor/Language.lean`, imports all
        of UniversalVocabularyMt): Fear, Awe, Grief, Curiosity and Shame
        are OpenCyc emotions (`EmotionalQuantityType`); Safety and
        Pre-verbal are not (Safety is only a quantity of a situation; the
        nearest feeling is `Security-Emotion`); Language as an "emotional
        mode" proves `Holds TheTensorMt falsum`: every emotion type is a
        kind of `FeelingAttribute` (`typeGenls`, a new rule in
        `Cyc/Typing.lean`), hence a scalar interval; Language is a kind of
        `InformationStore`; the two are disjoint; Arabic is a language.
      - Verdict: more than a text linter. The numeric findings need
        arithmetic over the score; the Language finding needs OpenCyc. The
        expected Pensieve check was not made (no InformationBearingThing
        claim was typed). Aesop does not guess a chain's middle collection;
        multi-step `genls` chains are spelled out, each link a fact.
      - Author to decide: fix the paper (rename the axes "modes" rather
        than "emotional modes", or map Safety to Security; three operating
        modes; one T2 time; one score table) or keep it as Sherlock's first
        exhibit.
- [x] Sherlock public in U and paper SH1 (11 Oct): `sherlock/` (moved from
      U.Ops; the built KB reused, no rebuild), `docs/SHERLOCK.md` (how to
      write an affidavit), `make -C sherlock affidavits` (one module at a
      time, stops on errors, then `bld/sherlock/findings.md`). SH1
      `paper/soma/sherlock-compiler/` (renamed from sherlock-affidavit, 11 Oct; `make -C paper sh1`; Dist/PAPERS.yaml
      SH1, pending review): exhibit A The Tensor (frozen at 2d36eaf),
      B "the same film" (OpenCyc's `genlWorks`, story to plot: the same
      score, not the same film; OpenCyc's own slip `genlInverse genlWorks
      parts`), C the Claude advert (work vs showing).
- [x] Exhibit D, ZSF (P11, frozen at 3c97a44; the author's "start here"
      paper), `Affidavits/ZSF/`, `Ledger/ZSF.lean`. Claims extracted by an
      agent (8 candidates, 1 false: the Scale 20 propagator is a 1/r form),
      each checked: 21 levels but "twenty" five times; the dial not
      monotone (Scale 14, 10³ m, after Scale 13, 10¹¹ m); "twenty-five
      orders of magnitude" between Scales 4 and 6 is eight; N(σ=2) 10² in
      eq. (10) and the abstract, 10⁵ in the Scale 2 entry; Scale 13 gives
      10⁶ and 10⁷ modes; "the five axioms in §10", a table of four;
      "O(N·K) to O(N²) with K = 1" needs K > N; "a conscious percept is a
      pole in the propagator" read as identity proves `falsum` (an event of
      perceiving is a TemporalThing, a pole a mathematical object). The
      ledger asks the programme's own Lean: of the four "axioms" only
      `quant_exp_1` is one (`universe_is_11D_organism` is a def, line 774
      calls it an axiom; two are theorems), and the cited files hold three
      axioms the table omits. Passing checks: 11 = 4+3+1+3, 7/11+3/11+1/11,
      the 20 transition steps, the trauma gradient sign. Author to decide:
      fix P11 or keep it as an exhibit.
- (moved to ISS-063) (13 Oct, first pass in Python…
- (already so, 13 Oct: Mathlib and physlib are in the lakefile) Physics through Mathlib and physlib…

**3. Analogy: structure mapping and qualitative processes (NextKB/QRG ideas;
the tools themselves not needed).**
- [x] SME-style structure mapping (Gentner; Falkenhainer, Forbus & Gentner
      1989): compares two descriptions by relational structure; gives a score,
      the correspondences and the candidate inferences. Tests the programme's
      cross-domain claims, graded (Lean functors are the strict end). First
      test: The Tensor's three containers (River, Body, Session: "all three are
      the same film") against the score.
      (13 Oct triage: done, sherlock/sme.py with registry/analogies (6a7f9cd, f8ed78c))
- [x] MAC/FAC retrieval over a case library of the programme's claims: "where
      else have I claimed this structure?" Cross-paper consistency, and case
      law's precedent search (Law book).
      (13 Oct triage: done, sherlock/macfac.py over registry/cases (cd7f629))
- [x] QP theory (Forbus): The Tensor's somatic loop as a qualitative model
      (H-dot pushes toward a threshold; kappa_r sets coupling; a threshold
      crossing is a limit point); a qualitative simulation tests whether the
      river film's phases are reachable.
      (13 Oct triage: superseded, the arithmetic answered the threshold questions (Parked below))
- (moved to ISS-083) Text to facts without guessing…
- (dropped 13 Oct: the author reads the A5 pages in by hand) Sketch understanding…

**Doable?** (assessment, 10 Oct)
- OWL consistency and The Tensor test: yes, days; the open risk is HermiT's
  speed and memory on the whole KB (fallbacks above).
- SME core and MAC/FAC: yes, days to a week; the algorithm is published and
  small; Case Mapper can give reference results.
- QP for one model (The Tensor's few quantities): yes, days; a general QP
  simulator: no.
- Lean from NextKB: yes for the taxonomy and simple rules, weeks; CycL's
  higher-order and default reasoning do not map one-to-one and need choices.
- Text to facts from NuLex/FrameNet: medium; QRG's parser is not the part we
  get, so the LLM does the parsing and the semantic translations check it.
- Sketch understanding: hard; not before the rest works.

**Revisited 11 Oct, from experience.** Engineering was overestimated (OpenCyc
in Lean took about a day plus one overnight build, not weeks; an affidavit
1.5 hours); the bottleneck is reading: extracting claims (an agent helps, 1
false positive in 8, so every candidate is checked) and mapping words to
OpenCyc constants. Findings per hour: the document's own numbers first, then
claims about the Lean against the Lean (ledger), then OpenCyc typing (fewer,
but nothing else finds them). Plan:
- [x] Essential: chain finder (KRF search emits the `genls` proof chain;
      Aesop does not guess the middle), half a day.
      (13 Oct triage: done, sherlock/chain.py (6a7f9cd))
- [x] Essential: programme-wide ledger (every paper's "axiom", "sorry",
      "kernel-checked" claims against the Lean; ZSF says "five real sorries",
      a scan counts 14 uncommented `sorry` tokens, to check), a day.
      (13 Oct triage: done, sherlock/ledger.py; 0 of 419 disagree)
- [x] Essential: an affidavit per paper with the saved extraction prompt,
      1-2 hours each; `make -C sherlock affidavits` in the release gate.
      (13 Oct triage: the gate is bin/release-check section 21; the remaining documents are ISS-059)
- [x] Next: values quoted across papers (cross-paper consistency, MAC/FAC
      lite); a mapping assistant from NextKB's lexicon; OpenCyc's 769
      `implies` rules (the simple ones) into Lean, days each.
      (13 Oct triage: done, cross-document values, the mapping assistant sherlock/lookup.py and the Horn rules (gen_rules.py, CycRules.lean), 6a7f9cd)
- (moved to ISS-084) Later: SME (after the Body and Session phases are written)…
- Parked: QP simulation (the arithmetic answered the threshold questions),
  HermiT explanations (the Lean route replaced the OWL one), sketches.

**Closed 2026-10-13:** the three ways are built or superseded (ticked above with the
evidence); the later steps went to ISS-063, ISS-083 and ISS-084, and sketch understanding was dropped.

## ISS-056: Sherlock claims registry and validator — CLOSED
{{Tags area.proofs}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055, decisions D1-D4. `registry/affidavits/<doc>.yaml`: the frozen
source (commit, SHA-256), and per claim: id, quote, lines, kind, reading
(microtheory), formal form in OpenCyc vocabulary, verdict, label, Lean
theorem, disposition (open / fixed in version / kept as exhibit). A validator
(`make -C sherlock check`) ties each finding to a compiled theorem; the
findings report reads the registry.
- [x] Schema and validator; `TTheoryVocabularyMt` (shared programme concepts). (11 Oct: `sherlock/registry.py`, `make -C sherlock check`.)
- [x] Migrate exhibits A-D (The Tensor, containers, Claude advert, ZSF).

## ISS-057: Sherlock chain finder — CLOSED
{{Tags area.proofs}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055. Aesop does not guess the middle collection of a `genls` chain,
so chains are written link by link. `sherlock/chain.py A B [MT]` searches the
KRF (`isa`, `genls`, `disjointWith`, `typeGenls`, `genlPreds`, `genlInverse`)
and prints the Lean proof term, or the disjointness that makes two
collections incompatible. Later perhaps a Lean tactic.
- [x] chain.py with paths and disjointness; use it in the existing affidavits.

## ISS-058: Sherlock programme-wide ledger — CLOSED
{{Tags area.proofs, release}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055, D5. Every paper's and book's claims about the programme's own
Lean (named theorems and modules, "axiom", "sorry", "kernel-checked")
extracted by a script to JSON; one Lean program in the root package reads it
and reports each declaration's kind, its axioms (`#print axioms`), and
whether it exists; the report lists mismatches per document. ZSF says "five
real sorries"; a scan counts 14 uncommented `sorry` tokens in
`paper/proofs`: to settle.
- [x] Extractor, Lean judge, report; replaces `Ledger/ZSF.lean`'s fixed list. (11 Oct: all affidavit documents by default; 171 citations, 16 disagree; about 18 min.)
- [x] (13 Oct, the ledger trial) The data files too: books.yaml, the omnibus manifest, the
      registry's concepts, tours and levels, the cheat sheet, read with plain declaration
      names and a status rule ("<claim>: <status> (<File>.lean, <name>)"); a table header
      that lists kinds ("paper/file/theorem") claims none; a "Label" column is a status
      column. It found: books.yaml's "seven sorries remain" (13 places), two Root Monster
      tour stops, the booklet's `GeometricRGFlow_waveEquation` (no such name), the
      philosophy book's unlisted axiom, and the last two theorems of `True`
      (`greens_fn_is_SHO`, `scale_shift_preserves_structure`), now real theorems; and,
      through the towers export, physlib's `FLRW` sorry, now replaced (ISS-085). Result:
      460 citations in 121 documents, 0 disagree with the Lean; towers 1116 declarations,
      0 resting on sorry, 0 proving only True.

## ISS-059: An affidavit for every paper and book — CLOSED
{{Tags area.proofs, area.books, release}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=ISS-055-sherlock}}

Epic ISS-055 (document list in the epic file). Per document: freeze, extract
with the saved prompt (D7), verify, registry entry, Lean (numbers in core
Lean, typing against OpenCyc), findings; the author disposes. About 1-2 hours
each.
- [x] Papers P1-P24: all 24 (P6 on 12 Oct: 4 problems); and SH1 itself.
- [x] (13 Oct, agent, redone once: the first pass checked numbers against themselves) Fourteen domain books: 103 claims, mostly stated counts
      checked against the items listed, the cosmological arithmetic (7/11 vs 0.6847,
      1.01/1.09, 3/11) and the books' Lean claims against the export; six books say
      "five real sorries", true of the markers, incomplete (20 declarations rest on
      sorry, ScaleUniverse's transitively): recorded as consistent, disposition open.
      399 of 399 kernel checks. The soma-* folders have no book source.
- [x] The course book, CS1, D1, D2.
      (13 Oct triage: done: registry/affidavits ttheory-course (the course's evidence-and-proof chapter, 15), ttheory-cheatsheet (CS1, the booklet body), sft-demo-case (D1), lean-proofs-appendix (D2), 8 claims each; registry check OK; make -C sherlock check 411 of 411 (D7's tolerance check corrected to a relative 1 %))
- [x] `make -C sherlock affidavits` in the release gate.
      (13 Oct triage: done: bin/release-check section 21 runs make -C sherlock check when OpenCyc is built)
- [x] (11-12 Oct: v2, then v3 after Sherlock ran on it; renamed sherlock-compiler) SH1 v2 (author, 11 Oct 21:30: "is a new paper needed?"; next): exhibit D (ZSF) and the
      programme-wide results (24 affidavits, 270 kernel checks, the real findings by kind,
      the ledger's 16 disagreements, values across documents, units, delta, structure
      mapping): the paper that makes the "compiler for papers" claim.
- [x] (12 Oct: both done; CS gained "Sherlock as built: engineering notes") Books catch up with Sherlock built: Computer Science ("a future Sherlock" becomes
      what was built, with its costs); the course ch. 15 one worked example (P4's "seven
      sorries", five in the Lean). Philosophy and Law: ISS-064.

**Closed 2026-10-13:** every paper and book has an affidavit: 44, 411 of 411 template checks kernel-checked; the release gate runs them (bin/release-check section 21).

## ISS-060: Sherlock mapping assistant (words to OpenCyc constants) — CLOSED
{{Tags area.proofs}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055. The weakest link is which OpenCyc constant a word means.
`sherlock/lookup.py WORD` searches NextKB's lexicon (NuLex
`denotation`, FrameNet links, `prettyString`) and constant names, and lists
candidates with their `comment`, `isa` and key `genls`, for the affidavit's
author to choose; the choice is recorded in the registry.
- [x] lookup.py; mappings recorded per claim.

## ISS-061: Values quoted across documents — CLOSED
{{Tags area.proofs, area.theory}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055, D2-D3. Numeric claims in the registry as `quotedValue doc
quantity value unit`; a check groups by quantity across documents and
reports disagreements (e.g. synapse counts, Ω_DM = 3/11, scale-level
counts, N(σ)). Filled in while ISS-059 runs.
- [x] Quantity vocabulary; cross-document report (`values.md`: 201 quantities, 5 differ).

## ISS-062: OpenCyc's simple rules into Lean — CLOSED
{{Tags area.proofs}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-11, epic=ISS-055-sherlock}}

Epic ISS-055, D6. NextKB has 769 `implies` sentences, now skipped by
gen_krf.py. Translate the Horn-shaped ones (a conjunction of atoms implies an
atom, variables universally quantified) into Aesop rules in their
microtheory's rule set; count the rest. Changes the generated KB: overnight
rebuild by the author. Check whether the exhibit B gap (a showing performs
the score) closes.
- [x] Translator, rebuild, affidavits re-run (`gen_rules.py`, 408 Horn rules in `CycRules`).

## ISS-063: Structure mapping over affidavits — OPEN
{{Tags area.proofs, area.theory}}
{{Fields date.created=2026-10-11, date.start=, date.end=, epic=ISS-055-sherlock}}

Epic ISS-055 (later). SME (Falkenhainer, Forbus & Gentner 1989) over the
registry's relational forms: score, correspondences, candidate inferences;
MAC/FAC retrieval ("where else is this structure claimed?"). First tests:
The Tensor's three containers (after the Body and Session phases are
written, ISS-053), and pairs of papers claiming the same structure at
different scales (ZSF's "same as always").
- [x] SME core (`sme.py`; River Film vs the 2021 film, 66% shared).
- [x] (12 Oct: sherlock/macfac.py, 35 cases, 320 facts, 23 tests; ZSF's "same as
      always" mostly shares only the section template, Scale 12~3 holds; the containers
      test waits for the author's corrections to the Body and Session phases, ISS-053) MAC/FAC retrieval; the two tests (three containers; ZSF's "same as always").
      Author, 11 Oct 21:35: prioritised ahead of SH1 v2 and the books (it may change
      claims across the project). Order: (1) MAC/FAC over a case library and the ZSF
      test; (2) OWL classes as Lean types: a design note and a spike, the author
      decides; (3) SH1 v2 with both; (4) the books; (5) the containers test once the
      Body and Session phases exist (Copilot drafts them from The Tensor for the
      author to correct; ISS-053).
- [x] OWL classes as Lean types, first real use (11 Oct, 22:30): `Cyc.Types` (Inst,
      up, apart); the root package requires Sherlock's OpenCyc package (no rebuild);
      `paper/proofs/EmotionCyc.lean` anchors the programme's emotions with proofs
      from UniversalVocabularyMt (not a default target). Finding: 25 of the 28 OpenCyc
      names in `EmotionOntology.lean` (`#$Fear-Emotion`, `#$emotionalBlend`, the
      "axioms we inherit for free") were not in OpenCyc; fixed (OpenCyc's own
      constants; blend, dampen, evoke and the mechanisms marked `T:`, programme
      vocabulary; trust has no OpenCyc emotion type). The TypeDB bridge that should
      have caught it only ran with a database and printed "skipped" otherwise:
      retired (`*.OBSOLETE`). The philosophy book's account of the "built substrate"
      (TypeDB) is now out of date (ISS-064 rewrite).
- [x] The concept registry as types (12 Oct): `make -C sherlock types` (sherlock/gen_types.py)
      makes each OpenCyc class in registry/concepts a Lean type and proves the class
      exists from all of OpenCyc (10 of 10, about a minute); SLICE=1 writes the same
      facts as axioms for the fast loop (the author's slice-first method). Next: the
      programme's own types anchored to them, beyond the emotions (EmotionCyc).
- [ ] The inversion test (author, 13 Oct, on Me/film/art-fis-2021-08.md, the FIS notes of
      Aug 2021): "linking bad people from bad films and inverting their persona onto
      'normal' people, who underneath are the same". That is structure mapping's own claim:
      analogy follows shared relations, not attributes. The thug in *Made in Britain*,
      *Scum*'s housemaster and *A Clockwork Orange*'s therapists hold the same relations to a
      helpless person (power over, a "cure" imposed, the victim blamed, self-harm as the
      only reply) as the doctor, judge, social worker and ABA school of the notes; only the
      costume differs (braces and Chelsea boots against a title and a contract). The notes'
      page 2 is the author's own mapping ("ABA in ASD == school in MiB", "Forensic
      treatment == ACO therapy", "school == Borstal, MB centre, Prison"), and page 9 states
      the inversion ("Doctor is a skinhead + Racist"). ABA is applied behaviour analysis, which in
      the author's reading reinforces masking rather than preventing it (author, 13 Oct):
      the relation it shares with ACO's Ludovico treatment is conditioning the outward
      behaviour while the person is left as they were ("no free will ⇒ 'Cured'", page 1;
      "Masking = survival", page 2). The cases should carry that relation, not the word. Test: the films and the institutions
      as cases (relations only, no names that give the answer away); does MAC/FAC retrieve
      the film for each institution, and does SME's mapping recover the author's "=="
      pairs? A pair it misses, or one it adds, is a finding either way. Private material: the
      cases stay in Me, only the scores go to U.
      (13 Oct night, plan, not run: macfac.py reads cases only from U's registry/cases, with a
      frozen source in U. For private cases it needs a second case folder (Me/film/cases) whose
      source commit is resolved in Me's repository, and a report that prints only scores and
      predicate names to U. Then the cases: Made in Britain, Scum, A Clockwork Orange, Cuckoo's
      Nest, and the clinic, the court, social services, ABA, each as relations only (power
      over, cure imposed, victim blamed, self-harm as reply, masking as survival), each fact
      citing its line in art-fis-2021-08.md. For the author: the extraction is a reading of
      private notes, so he confirms the facts before the test is run.)
      (14 Oct, author OK: after the release, a one-evening CogSketch trial (QRG, free, v4.18,
      Windows) as part of this test: trace one or two of the A5 film pages, export the facts and
      run them through sherlock/sme.py beside the written cases, so a drawn structure is compared
      directly. Sketch understanding was dropped from ISS-055 on 13 Oct; this is its narrow use.)
- [x] (13 Oct, part: the design note (docs/SHERLOCK.md, last section) and the spike
      (sherlock/Cyc/Types/Spike.lean): Percept, Pole and Emotion as types; "a percept is a pole",
      read literally, is a contradiction in NextKB (Perceiving is a TemporalThing,
      PropagatorPole-TTheory a MathematicalOrComputationalThing, disjoint), so the coherent reading
      is a map, which is how FieldAxioms already writes it. PropagatorPole-TTheory and "percept"
      added to the vocabulary. For the author: restate every "X IS Y" axiom as a typed map? the
      concept registry and the app's type guard on the same types?)
      (13 Oct, author: "let Sherlock type both sides, turn only the refuted ones into maps, keep
      the names": registry/axiom-types.yaml types both sides of FieldAxioms.lean's six identity
      axioms; `python sherlock/readings.py axioms` -> bld/sherlock/axiom-types.md; the verdicts go
      into the readings' Lean slice (`make -C sherlock readings-lean`, kernel-checked). Refuted, so
      read as maps: PerceptIsPropagatorPole (an event and a mathematical object) and TherapyIsRGFlow
      (an event between people and a mathematical flow); their doc comments say so, the Lean
      statements already did; P1's claims table SF-1 now says "modelled by". Not refuted:
      AttractorIsHopfieldMinimum, HRVIsSomaFieldSpectralDensity (in OpenCyc a physiological
      quantity is itself a mathematical quantity), CoIdentificationIsAbduction, SomaFieldIsQUBO. Seven
      programme constants added to the vocabulary for the sides OpenCyc lacks, abduction among them,
      since OpenCyc's abducting is a kidnapping) OWL classes as Lean types (from ISS-047 note 8, now prioritised): the
      programme's own collections (TTheoryVocabularyMt and what it inherits, a few
      hundred) as Lean types; genls as coercions, disjointness as no common member;
      a category error becomes a type error in the programme's Lean, the concept
      registry and the app's type guard. Design note and spike on Emotion, Percept,
      Pole first.
      Done (13 Oct night; author: "one set of types, from OpenCyc"): registry/level-types.yaml gives
      every level an OpenCyc class (Person, Bird, Brain, Synapse, Galaxy, Group ...), and
      sherlock/level_types.py writes OpenCyc's verdicts beside it: can it bear a feeling
      (feelsEmotion takes an IndividualAgent; Person and Bird proved, groups, regions, brains and
      inanimate things refuted, a society or the cosmic web unproved) and is it a person. Concepts
      are checked against them: T1 a class that is a microtheory (found one: musical expectancy was
      typed `#$Expectation`, which in OpenCyc is a microtheory; now no class, with a note), T2 a
      feeling on a level that cannot feel. The Soma Machine's human controls now come from
      person: proved, and its type line states OpenCyc's verdict ("a galaxy cannot feel; feeling
      here is a reading"). `make -C sherlock level-types`, release check 19; Moriarty: two new
      faults (an emotion moved to a galaxy, the microtheory put back), both caught.
- [x] (13 Oct, checked: done by 7981cab and ISS-089. EmotionOntology's CycRef names are
      OpenCyc's real constants, the rest marked `T:` in TTheoryVocabularyMt
      (registry/vocabulary.yaml); EmotionCyc.lean's `#check_failure anchor "Fear-Emotion"`
      keeps the old name from compiling; SH1 reports the finding; the concept
      registry keeps `lean_cycref` as history only)
      (from ISS-081, author, 13 Oct: not the author's; do with the OWL types) (ISS-046)
      Sherlock finding, 9 Oct: none of the 16 OpenCyc constants in EmotionOntology.lean's
      CycRef interpreter exist in OpenCyc (checked against the OpenCyc OWL, 239,119
      constants): `#$Joy-Emotion` etc., and the predicates `#$emotionalBlend`,
      `#$emotionalInhibition`; `#$causes` exists only typed (`causes-SitSit` ...). Real
      classes: Happiness, Sadness, Fear, Anger, Disgust, Surprise, Anticipation-Feeling,
      ReflexiveAction, Expectation, AestheticDiscrimination; no match for trust,
      entrainment, conditioning, contagion, imagery, episodic memory. The registry now uses
      the real classes (the Lean string kept as `lean_cycref`); `make concepts` fails on any
      class that is not an OpenCyc constant. Author decides: change the Lean strings (and
      the CycRef examples quoted in the papers and the omnibus) to real constants, or define
      the missing ones as the programme's own OWL classes. Plan: the real constants where
      OpenCyc has them, the rest as the programme's own classes in TTheoryVocabularyMt.
- [x] (from ISS-080) (ISS-055) (13 Oct, first pass in Python: `make -C sherlock clinical`,
      sherlock/clinical.py: every registry document's sentences that claim a clinical effect
      with no hedge in the sentence and no evidence label in the paragraph, as candidates; 2
      in 39 documents, for the author: P1 line 499, "the formal account of why fear
      amplifies pain, why safety reduces it" (no "in the model"), and the synthesis line
      437, "The therapeutic implication is ..." (a prescription without a label); both
      reworded with the author's OK, 13 Oct 04:30, as model claims labelled open-hypothesis,
      P1 with a source (Sharp and Harvey 2001); now 0 candidates. The microtheory version
      stays open) The paper's own disclaimers become microtheories (ArtisticDesignMt vs
      ClinicalMt): Sherlock checks that no clinical-context claim is made without evidence.
      The affidavit, and the legal use.

## ISS-064: The Law book's affidavit chapter and the Russell reading — CLOSED
{{Tags area.books}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=ISS-055-sherlock}}

Epic ISS-055 (later). Law (C2-book-13): affidavits as legal argument (claims,
exhibits, versions as precedent), with Sherlock's exhibits as worked cases.
Philosophy (C2-book-06): Russell's *History of Western Philosophy* read as a
sequence of affidavits about the same questions, compared by structure
mapping (ISS-063).
      Done (13 Oct night): registry/microtheories.yaml puts each registry document in a context:
      ClinicalMt (15 documents: the clinical papers, the case study, the clinical and psychiatry
      books), ArtisticDesignMt (P9 and the music and arts book), TheoryMt (the rest). ClinicalMt
      and ArtisticDesignMt documents must carry their own disclaimer (not clinical advice, a
      treatment or a diagnosis); in ArtisticDesignMt a hedge does not bring a clinical claim back
      into context, it needs an evidence label. Found: P1, P2, P3 and P18 had no disclaimer of
      their own (their Zenodo descriptions had it); one sentence added to each one's limitations
      or status section. Now 0 candidates, 0 missing disclaimers in 44 documents. Moriarty: two
      new faults (a dropped disclaimer, a hedged clinical claim in a design book), both caught.
      The affidavit's legal use stays with the Law book (ISS-064, closed).
- [x] Law chapter (12 Oct: "Affidavits: Claims, Exhibits and Precedent": prior inconsistent
      statements, hearsay, judicial notice, the work and the copy, cross-examination,
      precedent and versions, nemo iudex).
- [x] (13 Oct: the philosophy book's own chapter-7 readings of Pythagoras, Heraclitus,
      Parmenides, Socrates and Plato as cases, registry/cases/phil-*.yaml, frozen at ff0ddeb;
      MAC/FAC pairs Parmenides with Plato 0.53, Heraclitus with Socrates 0.49, the "opposites"
      Heraclitus and Parmenides share a frame 0.35, permanence reads as P17's fixed gestalt
      and flow does not; Pythagoras finds no close partner, even with a new P9 case and a proposed `forces` predicate (0.23): the bridge from eigenmodes to affect forcing is unbuilt. Written up in
      chapter 7, "Reading Russell with Sherlock"; no Russell text quoted) Philosophy reading: Russell's *History* as a sequence of affidavits compared by structure mapping.
- [x] (12 Oct: chapters 12-13, "October 2026: Sherlock built", "Denoting, fiction and consensus", status rows, Appendix B) Philosophy (11 Oct): Sherlock is no longer "proposed": tense and results;
      Moriarty/DOT as an actual role (Popper); SH1's "consensus is not mathematics"
      (the Claude advert, Oliver Twist) read through Russell's theory of
      descriptions ("On Denoting", 1905) and Frege's sense and reference, with
      OpenCyc's unique names assumption as one engineering answer. Do with the
      Russell reading.

## ISS-065: Sergeant Major: admin reminders pushed to H-AL, a Maintenance deck, a releasable voice — CLOSED
{{Tags area.instrument, area.ops}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=ISS-065-sergeant-major}}

Author, 11 Oct 20:31: "my ADHD makes me the worst admin guy ever"; the
final project. Reminders pushed out to H-AL, a Maintenance section below
the engine room, and voice: the author's own voice stays parked; use a
default voice with the H-AL-ifier on top (quicker). Epic file:
prj/.adm/issues/ISS-065-sergeant-major.md.
- [x] Reminder collector (`HAL remind`): read, never copy.
      (13 Oct triage: done: bin/remind reads ISS-081 and ISS-001's Author items (U f72c58c, U.Dot 02976b1))
- [x] Maintenance deck (screens.js role `maintenance`): done and snooze only.
      (13 Oct triage: done: ?screen=maintenance, done and snooze only (2cabe66), its list read from ISSUES.md (9490f10))
- [x] H-AL's briefing, spoken: a stock Piper voice plus the H-AL-ifier.
      (13 Oct triage: done: BRIEF ME on the deck reads the due steps, H-AL's Piper voice through the bridge, else the browser voice (f72c58c))

**Closed 2026-10-13:** the reminders are read from ISSUES.md, never copied: bin/remind (make remind, HAL remind), the Maintenance deck (?screen=maintenance) with DONE, SNOOZE and BRIEF ME.

## ISS-066: Names and third-party characters: Sherlock, the Monster, the Wizard — CLOSED
{{Tags area.ops}}
{{Fields date.created=2026-10-11, date.start=2026-10-11, date.end=2026-10-13, epic=}}

Author, 11 Oct 20:47: now Sherlock is alive, is the name safe (old, but the
new TV series)? Ditto Cookie Monster; the other name was "Sheerluck". Not
legal advice; the checks and decisions:

- Sherlock and Moriarty: Doyle's stories are public domain (UK/EU since
  2001, US since 2023); the Conan Doyle Estate still holds "Sherlock Holmes"
  trademarks and enforces them. Decision (author, 20:50, on the HUD): keep
  "Sherlock" for the method, in papers, code and as a plain text label in
  the Soma Machine's HUD (a description, not a brand). No logo, silhouette,
  deerstalker or pipe, nothing from the BBC series (look, title cards, 221B
  styling, actors). "Mind palace" is generic (the method of loci); cite
  Doyle's own "brain attic" (*A Study in Scarlet*, 1887). "SheerLuck" (the
  author's pun, in the chats since spring) is the reserve name if Sherlock
  is ever released as a standalone tool or product.
- [x] About note in the app and SH1: "Named after Conan Doyle's detective
      (public domain); not affiliated with the Conan Doyle Estate or any
      adaptation." (11 Oct: the app README's Names section and SH1's
      Discussion; the app has no About page yet: add it there when it does.)
- [x] Cookie Monster (Sesame Workshop's character and trademark, in
      copyright): renamed **The Monster** (author, 20:54: "this whole app
      is about abstract things") in the live documents (PROCESS.md tier 3,
      PROGRAMME.md, the app README, FIELD-NOTES, UAT.md and the uat
      worksheets). `reader=cookie` stays (a common word). Historical records
      (uat/results, uat/RC1*, *.OBSOLETE) are left as they were. MUNCH is
      the Monster's voice (ISS-052).
- [x] Phase Dot (`Part2/book/phase-dot/phase-dot.md`, public): about 90
      lines of pasted web search results about Cookie Monster eye templates
      and Sesame Street listings (around line 9140). Resolved 13 Oct: Phase
      Dot is private, moved to `Me/books/phase-dot/` (author: "makes sense
      to mv it"); its hybrid rebuild with the Takeout exports is Phase Dot 2.
- [x] Harry Potter, the second UAT persona (Rowling and Warner Bros, in
      copyright and trademarked): renamed **The Wizard** (author, 11 Oct) in
      the same live documents and the philosophy book. The UAT triad is now
      Sherlock (built right), the Wizard (built the right thing), the Monster
      (understandable).
- Mentions in prose are references, not names of our things: low risk,
  left (Penny from *The Big Bang Theory* in PROGRAMME.md; the Pensieve in
  The Tensor and FIELD-NOTES).

**Closed 2026-10-13:** every item done.

## ISS-067: SH2: can a language model do Sherlock's job? — CLOSED
{{Tags area.papers}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=ISS-055-sherlock}}

Author, 11 Oct: a second Sherlock paper, after the experiments (which run only at
the end of a usage period). NotebookLM (Gemini) with all of OpenCyc, Sherlock's
slice pack and the papers as sources (notebook Sherlock-UAT; exp0 Q1-Q2: it
retrieves facts but does not derive), against Sherlock's kernel-checked answers;
then a locally run model. D11: language models at both ends, Lean in the middle.
- [x] Experiments: exp0 Q3-Q5, exp1, exp2 (`sherlock/nlm_test.py`), one per period.
      (13 Oct triage: done: second run 13 Oct, 17 of 20 cells answered; exp0 Q4 with all of OpenCyc, exp1 Q4 and exp2 Q5 failed twice (network, rate limit), recorded as future work in SH2)
- [x] A local model on the same questions (ISS-048).
      (13 Oct triage: waits with ISS-048, SOMEDAY; SH2 says it has not been run)
- [x] Write SH2: scores, where the model was right, wrong or could not say.
      (13 Oct triage: drafted: paper/soma/sherlock-llm (make -C paper sh2, builds; registry pending). Scores corrected on review 13 Oct (2b9d34d): 10 correct, 1 partial, 1 wrong, 8 unanswered; provisional until the missing cells are run and the scoring is blind)

**Closed 2026-10-13:** SH2 drafted with two runs of the experiments: 15 correct, 1 partial, 1 wrong, 3 unanswered (paper/soma/sherlock-llm, builds); the local model waits with ISS-048 (SOMEDAY).

## ISS-068: Release builds and Sherlock in CI on a large runner — CLOSED
{{Tags area.build, area.ops}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=}}

Author, 11 Oct 21:37 ("fire up a really fast machine in the GitHub cloud?"). Not
now: the current bottleneck is review and agent time, not CPU. Worth it at the
release rebuild (everything rebuilt anyway) and for Sherlock as a compiler in CI.
Where compute helps: the ledger judge (18 min, one Lean process per module: about
3 min with 8-10 in parallel on 128 GB); the OpenCyc build (hours, one process at a
time for RAM); all papers, books, course and atlas (`make -j`). Where it does not:
NotebookLM (rate limit), agents, the author's reviews.
- [ ] A release-build workflow (GitHub Actions; a large runner needs the org on
      Team or Enterprise, else a 32-core / 128 GB Codespace at about $2.90 an
      hour): build everything in parallel, run the release gate including
      Sherlock's kernel checks, publish the PDFs as artifacts. Reproducible and
      independent of the laptop.
- [ ] Caches: Lean and Mathlib (`lake exe cache get`), the built OpenCyc oleans
      (tens of GB: a cache or an artifact, rebuilt only when `gen_krf.py` changes),
      TeX, pandoc and pandoc-crossref at the pinned versions (docs/BUILD.md).
- [ ] Portability: the build scripts' Windows assumptions (paths, PowerShell);
      private repos (Me, U.Ops) only through secrets, never in public logs.
- [ ] Sherlock in CI: `make -C sherlock check` on every push that touches a paper,
      and the ledger in parallel (one module per process, several at once).
- [ ] Optional: a devcontainer with prebuilds so a Codespace starts ready (first
      setup otherwise about half a day).

**Closed 2026-10-13 (won't do):** author, 13 Oct: not doing this: no paid cloud builds; the laptop builds, Lean only, no database ("if I change my mind, I can open them up again").

## ISS-069: Four screens as the big concept: the inverted-T cockpit (ship, time machine, fantastic voyage) — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=}}

Author, 11 Oct 22:31. The Soma Machine's layout is four screens in an inverted T:
a main screen on top, one screen beneath it, and one left and one right below
that. The top screen is the main one; a one-screen system is that screen.
- One screen: the film plays (say the 2021 film, a dark one) and a control flips
  between the real version and the viewer's modified one ("the happy version"):
  the twin view (ISS-052, 6b9ebd0) as an A/B flip as well as a split.
- Two screens: the modified view goes on the second screen, beneath the main one,
  like a modern cockpit's synthetic vision (the view through cloud), with the
  controls beneath. Unlike an aircraft's fixed windows, any view can be moved to
  any screen ("we can swap the images around").
- Four screens: the bottom left and right show other information (the level, the
  elevator, the engine room, Sherlock's findings, the maintenance deck, ISS-065).
- One screen, 3D: a glass cockpit rendered in 3D, the window as the main view and
  the other screens as panels inside the cockpit; three tablets beneath as the
  controls. The vessel is a ship, a time machine and a fantastic-voyage shrinking
  craft in one (The Tensor's containers: the river boat, the submarine in the
  bloodstream).

Fit with what exists: `screens.js` already has window roles (level, cockpit,
engine; maintenance planned) sharing the view's state across windows; the twin
view already renders a second viewer. Difficulty (Copilot): the layout, the swap
and the A/B flip are small (a role per screen, a "show this view here" control,
the twin's right window as a full view). The 3D glass cockpit is medium to hard:
each panel is a live render of another view drawn as a texture inside the 3D
scene, and the tablets need a network channel (the windows' channel only reaches
windows of one browser; a relay through the MOTHER bridge would serve tablets).
Not lost: build it after the four-screen layout works.
- [x] (13 Oct: ROLE beside FULL SCREEN on every window turns it into the next role, level,
      cockpit, engine room, keeping the view; the layouts place them) Screen roles for the inverted T (main, beneath, left, right), any view to any screen.
- [x] One-screen A/B flip between the real film and the modified viewer's version (12 Oct:
      A/B at the score stop, `ab=b`: every setting drawn for the VIEWER preset, with the
      condition sliders; the twin view stays the side-by-side).
- [x] (12 Oct, with the layouts: the window beneath opens with ab=b, the viewer's version) The modified view on the screen beneath ("synthetic vision").
- [x] (13 Oct: not through the MOTHER bridge, which has a shell and acts with the Google
      account and so stays on 127.0.0.1, but a separate relay, apps/instrument/mother/
      relay.py, `make relay LAN=1`: view messages only, a pairing token, Server-Sent
      Events; the app joins with ?relay=…&token=… or the Engine Room's RELAY panel; a
      message heard on both the channel and the relay counts once. Tested across two
      browser contexts, a level and a cockpit window following; a real tablet is author
      UAT) Tablets as controls: a relay for the screens' channel (MOTHER bridge).
- (moved to ISS-083) The 3D glass cockpit (after the above): panels as live textures, the window as t…

Author, 11 Oct 22:40: more layouts, all kept; each screen is just another Chrome
window, so a layout is a named profile (which role on which screen), not code:
- **Inverted T** (above): main; beneath; bottom left; bottom right.
- **Simulator**: the main screen and two glass cockpits beneath it, plus the
  pilot's tablet (an electronic flight bag) for anything else: a search, this
  chat, notes.
- **The author's desk**: the 32-inch screen as main, three tablets beneath it,
  the laptop screen to the right.
Windows on one machine already share the view (`screens.js`); tablets and a
second machine need the relay (item above).
- [x] Layout profiles (inverted T, simulator, the author's desk): a profile names
      the role of each window; any window can switch role; saved per machine. (12 Oct:
      LAYOUT in the Engine Room opens the arrangement around the main window, placed on
      the monitors with Chrome's Window Management API when allowed, else cascaded;
      A/B is per window, so the screen beneath shows B. Not yet tried on the real
      monitors and tablets.)

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-070: The Monsters: example personas, and names the user can change — CLOSED
{{Tags area.app, area.ops}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=}}

Author, 11 Oct 23:02. The Monster (the understandability tier, ISS-066) gets
example Monsters, each a reader with a taste, for UAT and for the app's reader
register:
- **The Chocolate Biscuit Monster** (the author is from the UK): plain English,
  short, a cup of tea in reach. Its test, the dunk test: can the idea be told
  before the biscuit goes soft (about a minute)?
- **The Root Monster** (named by the author, 11 Oct 23:10), "sort of the author":
  a hacker who rices his Linux (neon terminals, tiling windows, dotfiles polished
  for hours; glowing grids and green code rain). Root twice: the Linux superuser,
  and he wants the roots, the axioms under every tower. Reads the Lean before the
  prose; wants to see the programme's Lean in the towers of code (ISS-071).
- [x] (13 Oct: papers C-4 and C-5, volumes TC-2 and TC-3 in the NotebookLM worksheets, the dunk
      test and the roots under every tower; the reader register shows COOKIE with the
      Chocolate Biscuit Monster, SPECIALIST with the Root Monster, following NAMES) Monster personas in the UAT worksheets and the reader register (`reader=`).
- [x] (12 Oct: `names.js`; the Engine Room's NAMES panel; MOTHER/H-AL's terminal title
      follows it; other labels can call `displayName(id)` as they appear) Settings: the user sets their own display name for each layer and persona
      (Sherlock, the Wizard, the Monster and its kinds, H-AL, MOTHER, the
      screens' roles). Display only: the ids, the files and the published
      defaults stay as they are; a name is kept in the browser (localStorage),
      never shipped (so the defaults stay clear of third-party names, ISS-066).

## ISS-071: The towers of code: a walk-through of the programme's Lean (the Root Monster's wish) — CLOSED
{{Tags area.app, area.proofs}}
{{Fields date.created=2026-10-11, date.start=, date.end=2026-10-13, epic=}}

Author, 11 Oct 23:02: the Root Monster "really wants to see a demo of the Lean model of
[T]-Theory in the Towers, or close to". Today the city of code (11D, ISS-052)
draws Sherlock's concepts as towers, taller for stronger evidence. Copilot's
proposal, in steps:
- [x] (12 Oct: `make -C sherlock towers`, sherlock/Ledger/Export.lean and towers.py:
      26 modules, 980 declarations, 311 theorems, 468 definitions, 13 axioms, 20
      resting on sorry, 8 proving only True; the city of code draws a tower per
      module, its glowing text the declarations marked ✓ = ◆ ✗ ∘, kernel-checked at
      the stated commit) Export the Lean: every declaration of the programme's modules with its
      kind (theorem, def, axiom), its statement, its source line and the axioms
      it rests on (sorryAx shows a sorry): a Lean metaprogram like the ledger's
      judge (one module per process), written to bld/, read by generate.py. The
      result is stamped with the commit it was checked at ("kernel-checked at
      <commit>"), never claimed live.
- [x] (13 Oct: the Lean towers now stand nearest on the avenue, concepts behind; a
      ring per declaration, axioms amber at the base, then definitions cyan, theorems
      green, trivial-True grey, the 20 floors resting on sorry flickering red; amber
      beams from the 6 theorems resting on the programme's own axioms to those axioms,
      11 beams, all in LocalGR, LocalGeometry and their users) Towers as modules (about 25), floors as declarations; the glow says the
      status: theorems one colour, definitions another, axioms amber at the
      foundations, the five sorries flickering red; beams from each theorem down
      to the axioms it rests on, so the foundations are visible.
- [x] (13 Oct: tower.js; click a tower at 11D, or tower=<module>&floor=<name> in the
      hash: the module's text falls as code rain behind its floors, foundations first;
      a floor shows its statement, status, source line, the programme's axioms it rests
      on and the papers citing it from Sherlock's ledger) Walk into a tower: the module's source falls as code rain, our own neon
      palette; a floor opens its theorem (the statement, the proof, its axioms,
      the papers that cite it from the ledger, Sherlock's verdicts).
- [x] (13 Oct: `make -C sherlock skyline` counts the generated KB, 1,366,193 facts in
      547 microtheories with facts; a wireframe tower per microtheory on a wide arc,
      height by log facts, UniversalVocabularyMt (497,791) at the centre; an amber
      arc from the programme's towers to it, labelled EMOTIONCYC BRIDGE) On the horizon, OpenCyc's skyline (1.37M facts, 678 microtheories), with
      `EmotionCyc` as the bridge between the programme's towers and it.
- [x] (13 Oct: registry/tours/root-monster.yaml, 9 stops, `#tour=root-monster`; adds
      greens_fn_is_SHO (only True), DyadicField's sorry and LimbicTunnel's
      classical_trapped, only True, the link to ISS-076) A tour, the Root Monster's tour: into UniversalSomaticField, up to
      `consciousness_dichotomy`, down its beams to the axioms, past the red floors,
      across the bridge to OpenCyc.
- (moved to ISS-083) Later, desktop only: PROVE on a floor asks the MOTHER bridge to run Lean on…
Difficulty: the export and the towers are medium (the judge and the city exist);
the live PROVE is the hard part and optional.

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-072: How much language: a text-level control for the films, and help bringing it down — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-12, date.start=, date.end=2026-10-13, epic=}}

Author, 12 Oct 00:30: Rothko gave his pictures numbers, no clues. The films get a
control for how much language they give the viewer, from none to narration; the
more text, the easier to connect, and the viewer is helped to bring it down. Not a
course: a slider (or radio buttons) with a word of help now and then.
- Levels: 0 a number only (No. 7); 1 the title; 2 intertitles at each phase
  (silent-film cards: Departure, Descent, The Deep River, Return); 3 captions (the
  phase lines); 4 narration (H-AL speaks each phase, today's `?film=1`).
- Within a film the words already recede with the Language mode (The Tensor: at the
  bottom of the river there are none); the level caps what the film may show.
- Across viewings, fading (support withdrawn as it is no longer needed): after a
  viewing the film suggests one notch lower ("next time, with fewer words"); the
  viewer's level is remembered in the browser. The arrival point is a film felt
  without being told what it is: the score is what is rendered, not the story.
- Fits the externalising machine (ISS-053): the less the film says, the more the
  viewer brings.
- [x] (12 Oct) WORDS (`kx`, 0-4) at the score stop: NUMBER (the film's number only,
      the setting line hidden), TITLE, CARDS (an intertitle on a darkened frame as
      each phase begins), CAPTIONS (the phase lines, fading with the Language mode),
      NARRATION (H-AL speaks); in the hash, tours and the screens' shared keys.
- [x] (12 Oct) The level is remembered in the browser; at the end of a viewing the
      film says "Next time, try it with fewer words" and stores the suggestion.

## ISS-073: SpaceEngine PRO for the cosmic scales; music generated from the score — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-12, date.start=, date.end=2026-10-13, epic=}}

Author, 12 Oct 00:13: he owns SpaceEngine PRO, with rights to use its output; would
its music be usable, and what else for music? The licence (SpaceEngine PRO Licence
Agreement v1.8, May 2022, sections 3.1.1 b-d and 4.2; check the current Steam EULA
before use):
- Visuals: yes. Screenshots, video, exported textures and models may be published,
  distributed and used in a larger work, commercially, royalty free, with the credit
  "Produced in part with SpaceEngine PRO © Cosmographic Software LLC". One licence per
  user.
- Music: no. Both the grant and the re-use rights exclude "music/soundtrack"; the
  soundtrack is licensed third-party tracks, not generated by the engine.
Plan:
- (moved to ISS-083) SpaceEngine for the cosmic scales (dial levels 12-20): rendered footage and…
- [x] (13 Oct: already mostly built at the score stop; the persisting heartbeat added, a
      soft low lub-dub at the viewer's heart rate) Music generated from the score (recommended): The Tensor's Part III audio
      rendering (harmonic content falls with the descent, grain rises with
      Pre-verbal, the heartbeat persists), driving the app's generative music
      (`createExplorerMusic`) from the seven modes live, so the music is the film's
      score made audible; it follows the knobs and the strap. Ours, and clean.
- [x] (13 Oct: the music's pulse now follows the score's tempo in PROJECTION, the heart in
      MIRROR, between in RESONANCE, so a heart drawn to it is entrainment, not an echo;
      the score stop shows ♪ PULSE, ♥, the gap and whether it closes over the last
      minute, a measure, not a proof; a real strap is author UAT) Measure it with P9 (BRECVEMA): rhythmic entrainment as tempo against the
      viewer's heart rate, read from the strap.
- (moved to ISS-083) (13 Oct: the credits file exists, apps/instrument/visuals/soma-field-operator/au…
- Not recommended: AI song generators (licences and training data unclear; the
  lesson of ISS-066).
- Author, 12 Oct 00:40: a MOTU 8A routes the PC's audio into Ableton Live 12 Suite;
  could SpaceEngine just play its music and Ableton add the effects? Sound, yes;
  licence, no for anything published: effects make a derivative of the soundtrack,
  which the licence excludes (private listening while working is fine).
- [x] (13 Oct: `midi-out.js`, MIDI OUT in the Engine Room, Web MIDI to a named port,
      default loopMIDI; channel 1, CC 20-26 the modes S F C A G L PV, CC 27 the heart,
      CC 28 story-time, note 36+ a phase begins, 48+ a threshold crossed; only one
      window sends (a lease); explorer-check covers it. Author UAT: loopMIDI, Ableton's
      MIDI Map, the MOTU) Ableton as the score's instrument (recommended): the Soma Machine sends the score
      as MIDI (the seven modes as CC knobs; thresholds and phases as notes or scene
      launches) through a virtual port (loopMIDI on Windows; the existing
      `soma_midi.py` bridge, or Web MIDI, ISS-053) into Ableton Live; Ableton (its
      instruments, Max for Live) renders the music live, following the knobs and the
      heart, out through the MOTU. The author's own music: clean to publish.

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-074: Autopilot, co-pilot, manual: learning to set and name feelings without a lesson — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-12, date.start=, date.end=2026-10-13, epic=}}

Author, 12 Oct 01:00: a simpler way to train setting and expressing emotions with
AI help. The journey starts at zero all round and needs a poke; then two modes, as
in a flight simulator: autopilot (the AI takes over, says what it feels and turns
the knobs) and manual (the user does it). "An easy way of teaching someone to do
something without them knowing they are being taught."
Copilot's shaping (modelling and fading, as with WORDS, ISS-072):
- Start still: every mode at zero until a poke moves the journey.
- AUTOPILOT: H-AL flies and thinks aloud in plain feeling-words ("fear is rising,
  about a six; I notice it in the chest; I'll bring safety up a touch") while the
  knob moves on screen: affect labelling and emotional granularity, taught by
  example.
- CO-PILOT, the step real autopilots have: hand over one axis at a time ("you have
  fear; I keep safety and the rest"), then two, then all seven.
- MANUAL: the user drives every knob (on screen, MIDI, or the heart via the strap);
  H-AL is quiet or names what it sees.
- The next journey hands over earlier (remembered in the browser).
- H-AL's narration is modelled feeling ("in this river I would feel..."), not a claim
  that the AI feels; not therapy; labelled interpretive. In the repository,
  "Autopilot" also names the speech-to-text helper (ISS-047 note 9): keep the two
  apart in the docs.
- [x] (12 Oct, first version; PILOT at the score stop, `ap=auto|co|manual`) A start-at-zero journey with a poke; the AUTOPILOT / CO-PILOT / MANUAL control at
      the score stop; per-mode handover; H-AL's think-aloud lines per mode change
      (spoken at WORDS NARRATION, shown at CAPTIONS, left to the knobs below: fading).
- [x] Remembered handover level; the next journey hands over earlier.
- (moved to ISS-001, the UAT run) Author UAT: the lines' wording and pace; MIDI knobs for the viewer's modes (ISS-…

**Closed 2026-10-13:** done; what was left (the author's own step) moved to ISS-081.

## ISS-075: RICE: a ricing switch for the author's options, and the glass cockpit as design vocabulary — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-12, date.start=, date.end=2026-10-13, epic=}}

Author, 12 Oct 01:20: a RICE (ricing) on/off in settings, so that all his "weird
stuff" lives behind it; and the glass cockpit (a primary and a multi-function
display) as a source of design ideas, without making the Soma Machine a flight
simulator: the film's graph is the route plan, and there are many more parallels,
hazard warnings and all.
- [x] (12 Oct: `rice.js`; RICE ON/OFF in the Engine Room, every window follows) RICE in the Engine Room, off by default (the public app calm and clean); on, it
      reveals the author's options: neon themes, code rain, the Root Monster's tours
      (ISS-070, ISS-071), experimental features, the cockpit extras below. Kept per
      browser.
- (done 13 Oct: the app README's Cockpit vocabulary) Cockpit parallels, generic terms (PFD, MFD; no product names):…
- [x] (12 Oct, behind RICE: WARNING freeze attractor near, CAUTION heart rising, ADVISORY
      threshold within two minutes) Alerts first (they are the most useful): the three levels, from the score and the
      heart, at the score stop;
- [x] (13 Oct, behind RICE at the score stop: a vertical-profile panel, Language as the
      altitude over the whole story-time, thresholds as waypoints, phases as legs, the
      chevron where the viewer is; `modesAt` exported from score.js) then the route-plan view of the score for the MFD
      screen of a layout.

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-076: The stone in the ureter: barriers down the scales, tunnelling at the quantum level — CLOSED
{{Tags area.app, area.instrument, area.visualize}}
{{Fields date.created=2026-10-13, date.start=, date.end=2026-10-13, epic=}}

Author, 13 Oct: at the end of the ureter voyage, a 6 mm stone (a huge rock at that
scale; stones over about 5-6 mm often do not pass on their own). You cannot get past.
Turn 90 degrees and try the wall: its layers up close (urothelium, lamina propria, the
smooth muscle, the adventitia), but the wall is rubber: POKE it and it boings back. So
take the elevator down a level or two: smaller, the same barrier in a new form (a cell
membrane, the lipid bilayer, an electron cloud), great graphics, still no way through,
until the quantum level: tunnelling, a secret tunnel. A graphics treat with FX full.
Copilot's view (13 Oct): worth doing, medium importance; the lesson is the point: the
barrier is the same and the scale changes the rule. The tunnelling probability goes as
exp(-2d·sqrt(2m(V-E))/ħ), so mass and width make it zero for a stone or a cell and real
for an electron or a proton. It is also the programme's own metaphor: LimbicTunnel.lean's
WKB gate is how the field escapes a trauma well (classically stuck, quantum-possible), so
the stone is the freeze attractor in the body, and the voyage teaches the model.
- [x] (13 Oct: the 3D stone is a crystal aggregate, bipyramids on bipyramids, tunnel3d.js;
      the stone says 6 mm, too big to pass) The stone at the end of the ureter voyage: a new fractal (a calcium oxalate
      crystal grown as a 3D fractal; several Mandelbulb-like bodies, fractal passages),
      perhaps its own thread.
- [x] (13 Oct: WALL ▸ at the URETER stop: the four layers; POKE sends the stone, the wall
      wobbles and boings, and says try the elevator) The wall: its layers close up; POKE gives an elastic boing (spring and sound), and
      a hint: "try the elevator".
- [x] (13 Oct: barrier.js, six scales on the ▼ ▲ elevator: wall, cell, membrane, hydrogen
      bond, atom, a 0.2 nm gap; T from the WKB exponent with each scale's mass, width and
      height, from 10^-(5.6×10^27) for the stone to 13% for an electron; explorer-check
      covers it. The app's own level control is not yet linked) Each level down, the barrier in that level's form (tissue, cell membrane, bilayer,
      molecule, electron cloud), each refusing, each with the reason in one line (the
      exponent, with this level's mass and width).
- [x] (13 Oct: the wave in, its decay in the barrier, √T out; POKE tunnels at the rate T;
      FX above 0.3 shows the glowing secret tunnel, FX off the plain drawing) The quantum level: the tunnel opens. FX off: the honest drawing, an incoming wave,
      its exponential decay inside the barrier, the small wave out, the probability as a
      number; FX high: the glowing secret tunnel. All FX off must still be correct
      (renderers/README.md).
- [x] (13 Oct, author: "rock climbing on the north face of The Stone?") ORBIT and CLIMB at
      the URETER stop: fly round the stone (drag, wheel), or climb its north face with a
      climber drawn to scale (40 µm, the stone 150 climbers high; the Eiger's north face
      is some 1000), a rope behind, the altitude in mm; the stone looks like calcium
      oxalate dihydrate (weddellite: sharp bipyramids, honey to ivory, brown monohydrate
      flecks, a grainy bump texture), 170 crystals in three generations.
- [x] (13 Oct: on screen at the atom and quantum scales) Tunnelling in the brain, labelled (docs/agent/THEORY-STATUS.md): established,
      electron and proton tunnelling in enzymes and the respiratory chain; contested,
      vibration-assisted tunnelling in smell (Turin); speculative, Orch-OR (Penrose and
      Hameroff; decoherence objections, Tegmark 2000). The programme's limbic tunnel is a
      model (WKB gate; `quant_exp_1` is an axiom recording a numerical result), not a
      claim that neurons tunnel. Say so on screen.
- [x] (13 Oct 16:30, author: the stone is not a point, it is always being poked; the main picture
      is the waves; two screens, one inside, one outside, like the adverts of pain spreading;
      four stages: the stone, the stent, the laser, the stent out.) Built: ureter-model.js, the
      stone as a process: the kidney keeps producing, urine backs up above the stone, the tube
      swells, peristaltic waves come faster and deeper and crash into the stone (a spasm each),
      the pain is stretch + spasm (+ the stent's ends, + reflux when the bladder empties),
      louder with Φ, not felt under anaesthetic. STAGE ▸ 1-4 (uo, shared by all windows; the
      stent drains and dilates, the laser breaks it, the stent out gives a last spasm); VIEW:
      INSIDE (the 3D tube swelling and squeezing, waves as muscle rings, the stent on the floor,
      a red light at each spasm), OUTSIDE (the urinary tract drawn like a medical illustration,
      the stone, the stent, pain rings spreading from each spasm, the loin and the groin
      lighting, the last minute of pain: it comes in waves), BOTH (uv, per window: one screen
      inside, one outside). A teaching picture, days compressed into seconds.

**Closed 2026-10-13:** every item done.

## ISS-077: Inside the brain: the cathedral, thoughts as bursts, the path of pain — CLOSED
{{Tags area.app, area.instrument, area.visualize}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

Author, 13 Oct 03:55: visualise thoughts, feelings and pain in the brain. First get in:
are the main arteries mapped in 3D? Then the brain not as a solid mass but, with all
that electricity, a huge EM field as well as the matter: explore it as a massive stone
cave, cathedral-sized and beautiful. ADHD pictures show thoughts as comic-strip bubbles,
loads of them floating, louder, softer: abstract that as the bright bursts of the foam
scale, loads of them buzzing about; match it to something scientific; they are his
thoughts. And pain.

Copilot, 13 Oct (the facts first):
- Arteries: not mapped. The app has a generic vessel (`vessel.js`) and a schematic
  brain; no named arteries. The way in is real anatomy: heart, aortic arch, common
  carotid, internal carotid, the circle of Willis at the base of the brain, the middle
  cerebral artery out over the cortex (and the vertebral arteries joining as the
  basilar). Either draw them schematically from OpenStax Anatomy & Physiology (CC BY,
  the reference already chosen, ISS-052) with true calibres (aorta about 25 mm, carotid
  about 7, internal carotid about 5, middle cerebral about 3: the voyage shrinks as it
  goes), or import real meshes (BodyParts3D or Z-Anatomy: CC BY-SA, share-alike on the
  derived meshes; the author decides).
- The cathedral is real: the brain's ventricles are an actual cave system, filled with
  cerebrospinal fluid: the fourth ventricle, the aqueduct, the third, and the two lateral
  ventricles, curved halls with the choroid plexus hanging like curtains. Enter from the
  arteries (the choroid plexus is where blood becomes CSF) and the voyage is inside the
  brain without passing through tissue. The walls as carved stone, the gyri above as the
  vault; through them the field: the programme's whole-brain level is the brain's own
  electromagnetic field (CEMI, McFadden), drawn as light in the stone.
- Thoughts as bursts: the match is neural avalanches (Beggs and Plenz 2003): cascades of
  activity with a power law of sizes, many small, a few large, which is exactly "loads of
  them, louder, softer". A large one that spreads through the cortex is what the global
  workspace calls ignition (Dehaene): the moment a thought becomes conscious. Loudness =
  size; colour = the feeling mode carried (the Tensor's seven); with ADHD more bursts,
  more scattered (P13's operator: the temperature up, more noise), a picture and a model,
  not a diagnosis. Mind-wandering (the default mode network) as the slow background hum.
- Pain is not in one place: from the ureter's stone, a C-fibre signal climbs the
  spinothalamic tract to the thalamus, then the insula, the cingulate and the sensory
  cortex (the pain neuromatrix, Melzack; the ureter stop already says C-fibre to insula).
  Drawn as a red pulse arriving and the regions lighting; with fear it is louder (P1's
  W between fear and pain); chronic pain is a valley that stays lit. And a line for the
  cathedral: the brain itself has no pain receptors; the stone does not hurt, pain is
  music played in it.
Order (Copilot): thoughts as avalanches first (most expressive; the foam scale's bursts
and the ADHD slider exist), then pain's path from the stone (it continues the ureter
voyage), then the ventricle cathedral, then the arteries as the way in. Difficulty:
avalanches and pain medium; the cathedral and the arteries medium to hard (anatomy).
- [x] (13 Oct: THOUGHTS at the BRAIN stop: a critical branching process per burst, sizes
      with slope -1.47 against the theory's -3/2 (in explorer-check), loudness as size, the
      mode as colour, thought bubbles for the middle sizes, ignition above 1000; the ADHD,
      ASD and C-PTSD sliders: more and scattered, fewer and focused, each burst echoing back
      fading, a first taste of the cathedral's echo) Thoughts as neural avalanches in the brain stop: bursts with a power law of sizes,
      loudness as size, colour as the mode, ignition when one spreads; ADHD slider; checks
      that the sizes are power-law distributed.
- [x] (13 Oct: PAIN at the BRAIN stop, OFF, ACUTE, CHRONIC: pulses about once a second up the
      spinal cord to the thalamus, then to the insula, the cingulate and the sensory cortex,
      which light; louder with Φ; chronic, they stay lit; the no-pain-receptors line. 13 Oct:
      FOLLOW THE PAIN ▸ at the URETER stop goes there, and says the ureter's nerves enter the
      cord at T11-L2, the loin and the groin) Pain's path: from the ureter's colic up the spinothalamic tract to the thalamus,
      insula, cingulate and sensory cortex; fear makes it louder; chronic as a lit valley.
- [x] (13 Oct: CAVE at the BRAIN stop, cathedral3d.js: a flight through the ventricles in
      anatomical order, fourth ventricle, aqueduct, third, the foramen, the lateral ventricle
      as the nave, the atrium as the crossing, the temporal horn; ashlar stone, vaulting ribs
      in the wide halls, the choroid plexus as bead curtains, the field as three moving
      coloured lights (FX); proportions schematic. FX off (13 Oct): the plain labelled side view of
      the ventricles in the same order, a dot where the voyage is) The cathedral: the ventricles as the cave (CSF, the choroid plexus), the field as
      light in the stone; FX off the plain anatomy.
- [x] The way in: the arteries from the heart to the circle of Willis and the middle
      cerebral artery, true calibres, the voyage shrinking; source and licence decided.
      (Author, 13 Oct 04:20: OpenStax, drawn from Anatomy & Physiology 2e, CC BY 4.0, credited.)
      (13 Oct triage: done: the WAY IN stop (f3503db): heart, aorta ~25 mm, common carotid ~6.5 mm, internal carotid ~4.5 mm, circle of Willis, middle cerebral artery ~3 mm, a schematic route after OpenStax Anatomy and Physiology 2e (CC BY 4.0, credited), arriving at BRAIN; reviewed 13 Oct)
- [x] ONE BODY (author, 13 Oct 16:50: waves in the tube cause waves in the head, already busy; the
      limbic system forces slow deep breathing, as in labour or the way out of freeze: the
      calming wave; modified for C-PTSD, ADHD, ASD: "Mount Everest"). Built 13 Oct:
      somaloop.js; one shared body for every stop; LOOP: BODY + MIND at the URETER and BRAIN
      stops: the stone's pain lands in the head as red bursts at the sensory cortex and insula,
      heats the field, and the head's tension tightens the spasms (the vicious circle); past a
      threshold the limbic breath (about six a minute) sends a blue calming wave through the
      brain and softens the spasms; ADHD keeps the head busier, ASD amplifies the pain channel,
      C-PTSD echoes the pain, comes to the breath later and cools slower. THOUGHT POKES THOUGHT:
      a large burst sets off its neighbours, lines from one to the next. explorer-check: the
      breath lowers the pain to 73 %, C-PTSD breathes 6 s later, C-PTSD and ADHD keep Φ higher.
      Interpretive; numbers for the eye.
- [x] (13 Oct: done, both tiers. PICTURES in the CAVE: FIGURES, ART or BOTH. Public: 6 Kandinsky
      (Art Institute of Chicago) and 6 Klee (Cleveland Museum of Art), public domain from CC0
      open-access files (`scripts/fetch-public-art.py` -> `public/art/`, each in CREDITS.md, the
      pop-in names artist, work, museum and licence). Private, RICE on: 261 picture pages rendered
      from the author's 8 art books (`apps/instrument/mother/art_private.py`, pdftoppm; pdfimages
      mis-decoded the scanned books) into %LOCALAPPDATA%/SomaMachine/art, outside every repository,
      served only by the MOTHER bridge's `/art/` (local origins only; traversal and other file types
      refused; tested). `audio/CREDITS.md` became the app's `CREDITS.md`, for all media (ISS-086).
      Restart the MOTHER bridge to serve /art.) Avant-garde art as visual thoughts too (author, 13 Oct 04:35): the author's Calibre
      library (C:\Users\alist\OneDrive\Apps\Calibre Portable\Calibre Library) has Kandinsky
      (On the Spiritual in Art; Kandinsky in Munich; Russian and Bauhaus Years), Klee's
      Notebook 1, The Moderns, Subway Art, Banksy. Copyright, two tiers:
      - Private (RICE on, this machine only): images extracted from the books (pdfimages /
        the EPUBs) into a private folder, served by the local MOTHER bridge (/art), never
        copied into the app's public/ (a vite build publishes all of public/); any artist.
      - Public: only works in the public domain (Kandinsky d. 1944, Klee d. 1940: 70 years
        after death in CH and the EU), and only from open-access museum files marked CC0
        or public domain, not scans from the books (the book's photographs and layout have
        their own rights; Swiss law also protects photographs); each in audio/CREDITS.md
        (rename it CREDITS for all media). Subway Art and Banksy: private only.
- [x] (13 Oct 04:30, built: 60 of the programme's figures, a spread over 14 kinds, copied at
      generate time to public/thoughts (git-ignored); in the CAVE, bursts above 60 and POKE
      blow bubbles, iridescent thin-film shells reflecting a soft room, the figure on a
      fisheye disc inside, tinted by its domain; they drift towards you and grow, and pop
      when close or clicked: the figure fills the screen through a growing circle, with its
      caption, formula and paper; VIVIDNESS 0 is aphantasia, bubbles without pictures. Live
      stops inside bubbles: later) Visual thoughts (author, 13 Oct 04:10): steal from Kandinsky; images floating; 3D
      bubbles as real as possible with the image on them; they grow; one that comes close
      fills the screen and you pop into it, into the "video". Copilot's view:
      - The science fits: mental imagery reuses the visual cortex (Kosslyn), weaker and
        blurrier than seeing, built top-down from memory; how vivid it is varies from none
        (aphantasia) to very vivid (hyperphantasia): a VIVIDNESS slider, as the conditions
        have theirs. The images come from memory, so they should be ours: the 992 generated
        figures (bld/visualize, the papers, the books) and the equations, the author's own
        thoughts made visible. A curated set (about 60) copied into the app at generate time.
      - Kandinsky as grammar, not copies (he died 1944, his works are public domain in most
        countries, but the point is his language): colour carries the feeling (his yellow
        loud, blue deep), point, line and plane; the bubbles' tint is the mode, as THOUGHTS.
      - One mechanism, not two: a THOUGHT burst that grows past ignition becomes a bubble
        with an image; small bursts stay sparks. Bubbles: three.js thin-film iridescence and
        transmission, the image wrapped on with a fisheye; size from the avalanche; they
        drift, grow, pop.
      - Pop in: when a bubble nears the camera it fills the screen through its refraction and
        the content takes over: a figure full screen with its equation and caption (EQUATION,
        FIGURES, READ MORE, ISS-051), or, better, a bubble holding a stop of the Soma Machine
        (the river, the stone, a tower), so popping in is travelling by thought.
      - Where: the cathedral's nave (thoughts floating through it) and the brain stop.
      Difficulty: bubbles with images medium (a dozen at once; transmission is costly);
      the pop-in medium; live stops inside bubbles (render targets) hard, later.
- [x] (13 Oct: in the cave, THOUGHTS and POKE flash in the stone; with the C-PTSD slider each
      returns, fading, more often and longer as cp rises, and the music's echo lengthens; the
      partial-cue flashback is not yet built) C-PTSD echoes in the cathedral (author, 13 Oct 04:00). The match: a cathedral's
      reverberation time is how long a sound lives after it stops; the programme already
      has the same shape, the memory kernel K(τ) (PAST, 13 Oct) and P13's C-PTSD operator
      (the barrier deeper, slower back). So in C-PTSD mode a burst does not die: it comes
      back off the walls, again and again, slowly fading, the reverberation time set by
      the C-PTSD slider (cp). A cue that resembles an old pattern (recall from a partial
      cue, as in the memory stop's Hopfield net) wakes a loud echo: the flashback picture,
      the old burst returning as if now. The music's echo is the same knob (its delay
      feedback is the "reverb blanket"): with cp up the sound echoes too. Safety (S) and a
      resource shorten the echo. A picture and a model, not a diagnosis (ISS-066's care).

**Closed 2026-10-13:** thoughts as avalanches, pain's path, the cathedral, the way in, one body, visual thoughts, C-PTSD echoes, and avant-garde art (public and private tiers) all built.

## ISS-078: The control room, the cathedral from outside, the mind palace as the universe — CLOSED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-13, date.start=, date.end=2026-10-13, epic=}}

Author, 13 Oct 17:04 ("fun", not for the UAT): (1) a control room, many monitors of outside and
system views; the multi-window layouts already give it, but a window view needs to look
around: pan left/right, forward/back. Why: C-PTSD, constant vigilance. (2) In the thought
cathedral a rear view, then look at the cathedral from outside, like Hogwarts but abstract.
(3) The elevator in the cathedral is different: each level is different; the mind palace IS
the universe. A lot; doable; best strategy?

Copilot, 13 Oct:
- (1) LOOK: a free look in every 3D window (drag, or keys), plus a VIGILANCE mode: with the
  C-PTSD slider the view scans by itself, glancing left, right and behind, more often and
  faster as cp rises; with safety it settles forward. Hypervigilance as something the viewer
  feels, not reads. Small; one camera offset shared by the 3D stops.
- (2) OUTSIDE THE CATHEDRAL: the ventricles really have a famous shape from outside (the
  ventricular cast); the same hall curve rendered from outside in stone, with a spire rising
  from each hall (the hall's name), windows lit by the field, thoughts flashing behind them,
  the camera orbiting at a distance: Hogwarts, abstract. Medium; it reuses the cave's curve.
- (3) THE MIND PALACE: the method of loci (memory palaces) is real and old (Simonides; modern
  memory champions; it recruits the hippocampus's place cells). The programme's own claim
  makes the rest: the same response grammar at every scale, so a palace whose floors are the
  31 levels of the zoom dial is the programme in one building. Strategy: do not build 31
  worlds; the app has them (32 level renderers, the elevator, STEP OUT). The cathedral's
  tower becomes the elevator shaft; each floor a hall dressed by its sector (8: cosmological,
  geological, collective, systemic, network, organismal, micro-physical, named solutions:
  stars in the vault, strata in the walls, a crowd's lights ...), and the door of each hall
  opens onto that level's own view. Phase: the shaft and 8 hall styles first, the doors to
  the existing views second, a palace tour third (the memory-palace exercise: place a thought
  in a hall, find it again).
- [x] (13 Oct: look.js, at PATH, URETER, FLY, SCORE and the CAVE: arrow keys and a right-drag
      turn the head, B the rear view; VIGILANCE glances left, right, up and behind, more often,
      faster and further with the C-PTSD slider, settling with safety, the score's S or the
      limbic breath) LOOK and VIGILANCE (C-PTSD scanning) in the 3D windows.
- [x] (13 Oct: OUTSIDE in the CAVE: the halls' shell in stone seen from outside, a spire per
      hall, the visitor's spire white, windows lit by the field that flare when a thought fires
      inside, an orbit at a distance; the rear view inside is B) The cathedral from outside: the ventricular cast in stone, a spire per hall, the field in
      the windows, an orbit; the rear view from inside first.
- [x] (13 Oct: palace3d.js, PALACE at the BRAIN stop: one tower, the universal-21 levels as 21
      floors from the quantum foam (the hall of the zero moment, sparks that arise and pass) to the
      cosmic web; each a round hall in its sector's style (strata, a pulse, crowd lights, stars ...),
      its name carved; ▲ ▼ ride the car; DOOR ▸ goes into that level's own view; PLACE leaves a
      thought that stays in the hall) The mind palace: the tower as the elevator, eight sector halls, doors to the levels' views.
- (moved to ISS-052) The palace tour: the method of loci as an exercise.…
- [x] (13 Oct, author: "we're in trouble if mindfulness is not included"; built: MINDFUL at the
      BRAIN stop: thoughts arise and pass on their own, none pokes the next, softer and longer;
      the field is not pushed down; with the body loop the same pain heats the head less (Φ to
      64 %, explorer-check; after Zeidan et al. 2011: mindfulness changes the unpleasantness more
      than the intensity; Kabat-Zinn 1990, both in the bibliography). The palace's foam hall
      comes with the palace) Mindfulness and the foam (author, 13 Oct 17:20: is the quantum foam the mind's ultimate
      mindful state, the zero moment? not sure). Copilot: half right, and the better half is
      surprising. The foam is not still: it is the most agitated level; even the vacuum's
      zero-point state fluctuates. That fits mindfulness better than stillness does: not a blank
      mind but one where things arise and pass without being held (the Abhidharma's
      momentariness). So mindfulness is a way of attending, not a place on the dial: in
      THOUGHTS, a MINDFUL mode where a thought does not poke the next (the chains stop; the
      branching ratio falls below 1: bursts arise and fade alone), Φ is not forced down; and in
      the palace the foam floor becomes the hall of the zero moment, where that is easiest to
      see. Interpretive throughout; a picture, not physics of the mind.

**Closed 2026-10-13:** done; what was left moved on: see the pointer above.

## ISS-079: [T]-Theory Mk 1 (V1, 21 Oct) and the VS Code extension as a back door — OPEN
{{Tags area.ops, area.app, area.instrument}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=2026-10-21, epic=}}

Author, 13 Oct 18:28: a Sherlock plug-in with a Lean scribe is a lot of work for no return;
instead ship the Soma Machine inside the Sherlock extension ("view in Soma Machine"): a back
door to distribute the app, VS Code users see the pictures. Then: before the UAT, the web
(t-theory.org) and the GitHub organisation; a big UAT release, [T]-Theory Mk 1. Nothing is
pushed to the web yet. V1 release date 21 Oct (the author's birthday). Books to Lulu as soon
as possible. No actual extension release for now: preview "sneaks".

Copilot, 13 Oct:
- [x] `apps/vscode/` (Sherlock & the Soma Machine, 0.1.0, preview): the Soma Machine in a
      webview (the app built with relative paths, about 3.5 MB; bridge panels hidden);
      Go to a Stop; View in Soma Machine (a Lean file opens its tower in the city of code, a
      document the stop its text is about); Sherlock's ledger as Problems (reloads when it
      changes), Sherlock: Check, a quick fix from a finding to its declaration's tower. No AI
      model, no Lean in the extension. `npm run package` writes `bld/*.vsix`; a sneak is that
      file (Extensions: Install from VSIX). Tested in a two-origin webview emulation
      (Playwright): no errors, the stop and tower deep links open.
- [x] App: a `tower=` link survives the hash rewrite before its panel opens.
- [x] SCRIBE (author: "neovim js... we already have the browser"): the sources in a
      read-only CodeMirror reader with vim keys inside the Soma Machine (`scribe.js`):
      `:e`, `gd` to a declaration's tower, `gs` to the section's stop, Sherlock's findings as
      diagnostics, `` ` `` to open, `:q` to close; stays beside the explorer. Real Neovim
      cannot run in a browser; `node-client`/`pynvim` drive a native nvim, so a coupling of
      MOTHER's `/shell` Neovim to the machine through the bridge is a later option.
- (moved to ISS-090, parked, 13 Oct) Try the VSIX; "Sherlock: Set up"; the Marketplace and Open VSX.
- [ ] Web: t-theory.org and the GitHub organisation for Mk 1 (plan; nothing published before
      the author says so).
- [x] (from ISS-081, author, 13 Oct: not the author's) (ISS-047) Autopilot correction (note
      9): it is for speech-to-text; the AI repeats back before acting, and a planned task is
      armed before it is confirmed. Update the Autopilot rule in T README/AGENTS with the
      author.
      (13 Oct triage: done: T/AGENTS.md Autopilot: repeat back first; arm, then confirm)

## ISS-080: Later: the optional and someday steps of closed issues — CLOSED
{{Tags area.app, area.instrument, area.ops}}
{{Fields date.created=2026-10-13, date.start=, date.end=2026-10-13, epic=}}

Triage of 2026-10-13 (author: "43 open is a lot"): issues whose work is done except a later or
optional step are closed; the step is kept here, word for word, with the issue it came from.

- [x] (ISS-020) Add one real omnibus or paper use-case before expanding the vocabulary.
      (13 Oct sort: not a task: a rule for ISS-020's hooks (one real use before more vocabulary); kept as that)
- [x] (ISS-055) Physics through Mathlib and physlib (already in the lakefile).
      (13 Oct sort: already so: Mathlib and physlib are in the lakefile and the proofs use them where needed)
- [x] (ISS-075) Cockpit parallels, generic terms (PFD, MFD; no product names): route plan =
      the film's score graph (phases as legs, thresholds as waypoints); vertical profile =
      the trajectory over story-time; speed tape = velocity (kv); altitude tape = depth
      (pre-verbal); attitude = the balance of safety and fear; engine strip = heart rate,
      HRV, breathing (strap); crew alerting = red WARNING (freeze attractor near), amber
      CAUTION (heart rising), ADVISORY (threshold in two minutes); terrain awareness = the
      energy landscape ahead ("deep basin ahead"); synthetic vision = the viewer's version
      on the screen beneath (A/B, ISS-069, done); flight director = the score's target (the
      white ticks); autopilot panel = ISS-074; traffic = the other viewer in the twin view
      or the dyad; checklists = before a viewing (strap on, lights down, touch the page).
      (13 Oct sort: done: the app README's Cockpit vocabulary table)

**Closed 2026-10-13** (author: "seems like we moved stuff to one issue to reduce the count"): sorted item by item: 3 done or not tasks (above); the clinical microtheories to ISS-063, the palace tour to ISS-052, H-AL's memory refresh to ISS-001's go-live; SME, the Law chapter and the Russell reading to ISS-084 (ON-HOLD); 15 ideas to ISS-083 (SOMEDAY).

## ISS-081: The author's desk: steps only the author can take — OPEN
{{Tags area.ops}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

Triage of 2026-10-13: issues whose remaining step is the author's own (a read-through, a recording,
a calibration, a UAT) are closed; the steps are here in one place. ISS-001 keeps the release
steps; ISS-047 the RC3 follow-up.

Author, 13 Oct: the reading (the pages, the draft paper, the course) comes last, after the
other work.

- [ ] (ISS-053) Pages in, by hand (author, 13 Oct: manual): photograph the ten A5 film pages, read
      them in yourself, keep them private.
- [x] (ISS-047) P21 sign-off blocker (author, physics): is the zoom step (10^3.207 per
      level; 19 steps span log10(k_P c/H0) = 60.93 decades exactly) fixed independently of
      H0? If not, H0 is an input and P21 predicts Omega_Lambda = 7/11 given H0 (what the
      paper now says, review item 4); if yes, P21 predicts H0 and the paper should say so.
      Then sign-off and status pending-upload (all nine review items are fixed in the text).
      (13 Oct triage: answered: nothing in the programme fixes the zoom step independently of H0 (it is 60.93 decades / 19; P21 and the registry); so H0 is an input and P21's present wording, Omega_Lambda = 7/11 given the measured H0, is the right one. The status change is a release step, ISS-001)
- [x] (ISS-042) Workflow extras: Neovim config (`soma-neovim-init.lua`: author, 13 Oct, not
      this file, origin unsure; a barebone Neovim instead, ISS-001); a Markdown task engine
      (`tasks-makefile.md`; ISSUES.md and the issue tooling may already cover it);
      `soma-developer-tips.md` (eight-knob SomaFX strip, ME-MD-MAKE flow).
      (13 Oct triage: done or superseded: a barebone Neovim (U.Dot nvim, ISS-001); the task engine is ISSUES.md with bin/remind and the Maintenance deck; the developer tips are notes, nothing to build)
- [x] (ISS-035) Review the draft paper `paper/soma/path-sensitive-transitions/`
      (`make -C paper pathsens`) and the philosophy book's new open-hypothesis section;
      decide whether it becomes a paper for Mk 1 or waits.
      (13 Oct 22:20, author: "it's a paper, def now". Done: P25 in Dist/PAPERS.yaml
      (pending-upload), "draft" wording removed, a References heading added (11 references,
      check passes); the philosophy book's paper table and corpus count say 25.)
- [x] (13 Oct, author: "your call". A slip, and not the author's: the +0.2 was in two
      illustrative {{Visualize}} matrices an agent added on 11 Oct, not in the prose; set to -0.3
      in both figures, baseline and modified; `readings.py qp`: 0 clashes)
      (ISS-088, Sherlock's first QP finding) P6 Appendix A, lines 2636 and 2657: the base matrix
      W0 couples Calm and Shame at +0.2 (calm amplifies shame); every other figure in P1 and P6 has
      -0.3. A slip in the illustrative example, or meant? If a slip, -0.3 at both places.
- [ ] (ISS-027) Calibrate the stereo on the Atom with the glasses: which layout the
      projector takes, and a comfortable depth (the DEPTH slider in the engine room,
      ISS-052).
- [x] (ISS-041) Read the course through, then the release decision (the chapter-opening
      banners are ISS-051). Decided (author, 13 Oct 21:18): the course goes in the release, "it's good".
- [x] (ISS-050) Move `Me/notebooklm/rosetta.pdf` into its notebook folder
      (13 Oct triage: done, into HAL/ as chat material, with its sources entry; Me 024cd43)

## ISS-082: The voices: the author's own, and a licence-clean public one — PARKED
{{Tags area.app, area.instrument}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

Author, 13 Oct: "all issues re my voice etc, they can be moved to someday". Meanwhile RICE's
VOICE chooses MS (Microsoft's Natural voices in the browser, the default) or H-AL (his
Piper voice through the bridge with the HAL effect).

- [ ] (ISS-037) A licence-clean neural voice for public MOTHER (a stock Piper voice such as
      en_GB) if browser voices prove too uneven across platforms.
- [ ] (ISS-054) Record the voice: about one hour of clean, single-speaker audio, 22 kHz mono
      WAV with transcripts (known scripts: the tours themselves are the best script, they
      are what H-AL will say; plus dictation); a quiet room, one microphone, one session
      setup.
- [ ] (ISS-054) Train: fine-tune a Piper checkpoint on the recordings (piper-train); check
      the base checkpoint's licence so the result is the author's to release; keep the HAL
      9000 imitation private (ISS-048).

## ISS-083: Ideas and extras for some day — SOMEDAY
{{Tags area.app, area.instrument, area.books}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

From the author's desk (ISS-081), 13 Oct triage: ideas the author may want one day, not
steps to take now.

Author, 13 Oct 23:05 (review): "finish things fully where possible; do these, in any order,
to get them done". Being worked through; the hardware, the author's choices (music pieces,
SpaceEngine renders) and the one waiting on a viewer stay.

- [x] (ISS-042) Dual-emotion model (`ttheory-dual-emotion-spec-v2.md`): occurrent emotion
      only at biological scales, structural contours elsewhere (Davies, Barrett). The claim
      boundary is already in `SOMA-MACHINE-MVP.md`; decide whether the typed version (Lean
      types, HUD retyping) is wanted.
      (13 Oct review: covered: `FieldEvent.lean` types it (emotion at D8, thought at D9-D11,
      `project` and `lift` retype without changing the field), and the claim boundary is stated.)
- [ ] (ISS-042) Instrument extras not in U, author to decide: ERAE touch controller over
      MIDI 2.0 via Bome (`soma-erae-bome-routing (1).js`); foot-pedal zoom (`soma-pedal-zoom
      (1).sh`); Conky desktop status panel (`soma-machine-conky.conf`); TouchDesigner
      Mandelbulb render (`soma-touchdesigner-mandelbulb (1).py`).
- [x] (ISS-040) Companion volume (brainstorm, author to confirm): the theory book as a
      second A3 landscape volume read alongside the Atlas, with each Atlas level pointing to
      the theory pages to read with it, so leafing through the Atlas iterates through the
      theory chapters.
      (13 Oct review: moved to ISS-087: the Atlas has its Part I theory; each level's text page
      points to the theory sections to read with it, in the A4-landscape edition.)
- [x] (from ISS-080) (ISS-038) Per worked example "Show me" tours in the textbook HTML (one
      block per example) if the chapter-level stops prove useful.
      (13 Oct: done: each of the course's 96 worked examples names its app view (`show=` on the
      example, a level with lens, dimension or compare, a question or a tour); the HTML ends the box
      with "Show me in the Soma Machine" linking to https://t-theory.org/app/#<view>; the PDF is
      unchanged. textbook-boxes.lua checks every view against the registry (levels, questions,
      tours, lens, dim, compare) and fails the build on an unknown one.)
- [ ] (from ISS-080) (ISS-069) The 3D glass cockpit (after the above): panels as live
      textures, the window as the main view.
- [x] (from ISS-080) (ISS-071) Later, desktop only: PROVE on a floor asks the MOTHER bridge
      to run Lean on that theorem and stream the kernel's answer (the browser cannot run
      Lean).
      (13 Oct: done where a host can run Lean. In the VS Code extension a tower floor has PROVE ▸
      ask Lean: the extension accepts only names in Sherlock's towers export, writes
      `import <Module>`, `#check @<name>`, `#print axioms <name>`, runs `lake env lean` (one process,
      no shell) and streams the kernel's answer to the floor; tested with a harness on
      sft_ne_classical, and an injection attempt refused. In a local browser (with Neovim, or on its
      own) the floor asks the MOTHER bridge, POST /prove, with the same rules (towers export only,
      one process, no shell, local origins); tested on sft_gate_toward_awe, injection and a foreign
      origin refused. In Neovim, `:SherlockProve` does the same
      in a terminal split (U.Dot nvim/lua/sherlock.lua, which also loads the ledger's findings as
      diagnostics, runs the ledger and the readings check, opens the app at a file's view with
      `:SomaView` and at a declaration's tower floor with `:SomaTower`, on a local dev server when
      one runs so PROVE is there).)
- [x] (from ISS-080) (ISS-073) SpaceEngine for the cosmic scales (dial levels 12-20):
      rendered footage and plates for the film and the atlas, backdrops for the Soma
      Machine's cosmic levels; the credit line in each work and in the app's credits.
      (13 Oct: dropped by the author: hand-made renders from a closed program break the rule
      that every figure is built by Make from the registry or the app; the photoreal look clashes
      with the abstract one (UAT 7 Oct) and suggests the theory shows what is there; the cosmic
      levels have their renderers and FLY's cosmic web. Real-sky images, if ever wanted:
      public-domain NASA/ESA observations, credited in CREDITS.md.)
- [ ] (from ISS-080) (ISS-073) (13 Oct: the credits file exists,
      apps/instrument/visuals/soma-field-operator/CREDITS.md (moved from audio/, ISS-086), with the rules for a
      fixed piece and the SpaceEngine credit line; the pieces themselves are the author's
      choice) Fixed pieces where wanted: public-domain compositions in CC0 recordings (e.g.
      Musopen; Satie's Gymnopedies for Departure); keep a credits file.
- [x] (from ISS-080) (ISS-055) Text to facts without guessing: NextKB's semantic
      translations (FrameNet frames mapped to OpenCyc; QP frames with narrative functions)
      as the target vocabulary and validator for the later LLM front end.
      (13 Oct: promoted to its own issue, ISS-088, started now (author).)
- [x] (from ISS-080) (ISS-047) MOTHER follows a wandering chat: log and tag each departure,
      show the chat as a branching path, revisit and continue; sound effects (note 11).
      (13 Oct: done. `mother-thread.js`: every question is a turn (parent, topic tag, the view it was
      asked from, the start of the answer), kept in this browser; a change of topic is a departure,
      logged ("NEW BRANCH: BRAIN -> COSMOS") with a rising tone; /path draws the conversation as a
      branching tree with RETURN on each turn, which restores its view and continues from there (a
      falling tone); a follow-up tells NotebookLM which question it follows; /path clear starts
      again. explorer-check checks the thread; tested in the browser.)
- [x] (from ISS-080) (ISS-047) Test book: a topic suggested by someone else (waiting for the
      viewer).
      (13 Oct: dropped by the author. It was the 7 Oct UAT viewer's topic for a book not from the
      author (uat/RC3/uat-session-2026-10-07.md), never given.)
- [x] (from ISS-080) (ISS-046) A gravity view pairing a baseline GR render with the
      Green-function render.
      (13 Oct: done: the gravity question (`q=gravity-time-bending`) has a third panel, the same
      mass's field as GR's weak-field potential −GM/r − Λc²r²/6 (sourced) and the Green function
      −cos(kr)/r of (∇² + k²)G = δ (derived-under-assumptions; k at 1/r₀ for the picture,
      interpretive): both Newton's −1/r where gravity is tested, parting near 1/k;
      explorer-check checks both.)
- [x] (from ISS-080) (ISS-046) Visual rhymes: renderers may share motion styles across
      levels (sliding plates for `geological`, ring/belt debris for `orbital-system`),
      badged as visual analogy (`INTERPRETIVE`); the physics differs.
      (13 Oct: done. A level may borrow another's motion (registry/levels/<id>.yaml `rhyme:
      {motion, with, note}`, checked by generate.py): regional-institutional borrows geological's
      sliding plates (lock and slip), galactic-disc the orbital system's sheared debris ring.
      `renderers/rhymes.js` draws it faintly with a VISUAL RHYME · INTERPRETIVE badge naming the
      level, only with the lens on at 11D and RICE's new RHYMES switch on; the Atlas captures turn
      it off. More rhymes are one registry entry each.)
- [x] (from ISS-080) (ISS-046) Each Fractal Thesis book: a domain introduction spread
      (specialist label, G-ID, zoom note); a per-book G-ID registry; "61 decades of
      magnitude" as the headline with the scales as tick marks.
      (13 Oct: done. Each book's opening in the Fractal volumes and the omnibus already had its
      reader and G-ID (the manifest's green_id is the per-book registry); it now has the strip: the
      31 levels of registry/levels as tick marks over the ladder, the book's own levels tall, the
      headline computed from the registry (10^-35 m to 10^26 m: 61 decades), and a zoom note naming
      the levels and their range. Each domain's `levels:` is in fractal-manifest.yaml (author may
      edit); Gateway and Mathematics read the whole ladder. Checked in Vol II.)
- [x] (from ISS-080) (ISS-046) Field Atlas: Physical / Field / Mind parallel layout;
      notebook figures 1, 2, 4, 5 only if redrawn and badged `INTERPRETIVE`.
      (13 Oct review: done: the 4D / 8D / 11D triptych on every level is the body / feeling /
      mind parallel layout; the notebook figures were not needed.)
- [ ] (from ISS-080) (ISS-050) Switch sources per group within a notebook (ISS-047 notes
      12-13).
- [ ] (from ISS-080) (ISS-049) Knowledge base: HAL-UAT writes a master index, then one
      dossier per topic; the coding agent turns each into a note in `Me/kb/` with front
      matter (area, visibility, sources, evidence label); quarantined claims stay out.
      *Phase Dot* is built from the notes, filtered by visibility.
- [x] (from ISS-034, ISS-044) One Python directory: move the existing scripts there. Copilot,
      13 Oct: not recommended: the scripts live with their owners (paper/scripts, sherlock/,
      apps/*/scripts, lib/visualize, bin) and their Makefiles; one directory would cut that.
      (13 Oct review: closed, won't do.)

## ISS-084: Sherlock's analogy and the books' writing, after the Body and Session phases — CLOSED
{{Tags area.proofs, area.books}}
{{Fields date.created=2026-10-13, date.start=, date.end=2026-10-13, epic=}}

SME needs the Body and Session containers written before it can compare them with the River.
They are (13 Oct): the author accepted the draft as it was ("go with yours, I have read it"), and
its lines are in The Tensor's Part II under each phase, beside the river's; the draft file is gone.

- [x] SME on the containers (13 Oct): `registry/analogies/tensor-river-body.yaml`,
      `tensor-river-session.yaml`, `tensor-body-river.yaml` (The Tensor frozen at d53a893;
      `python sherlock/sme.py <id>`, report in bld/sherlock/sme-<id>.md). Findings:
      - River -> Body: 9 of 14 river facts map (58 %): traveller -> pilot, Kurtz -> heart
        chamber, world -> body; narrowing, the irreversible discovery at Threshold 1, the
        wordless encounter, light returning, "the world has not changed, you have". The body
        container is the same journey `derived-under-assumptions`.
      - River -> Session: 4 of 14 (26 %): only the threshold, the wordless deep phase
        (Kurtz -> the freeze) and the return map. The session has no traveller who meets
        anything: SME infers (encounters ?Traveller Freeze). It is the same score, not the
        same journey `derived-under-assumptions`.
      - Body -> River (48 %): the river has no Threshold 2 line; Body and Session both do
        (the oldest memory, grief opens fully). A gap in Part II.
      - The scores depend on the encoding (which lines share a predicate): one encoder, so
        `interpretive` until a second reading checks it.
      Verdict on "All three are the same film": the same score in all three; the same film
      for River and Body; the Session is the same score told without a journey, as Sherlock's
      SH1 found for the film claim.
- [x] Possible edits to The Tensor from the test (author's call): a river line for Threshold 2
      (grief opens fully, the oldest loss); and in the session, someone meets the freeze (the
      encounter), so the three tell the same journey; or keep them as they are and let
      Part IV say "the same score" rather than "the same film".
      (13 Oct triage: done (author, 13 Oct: my recommendation): a river line for Threshold 2 (the oldest loss surfaces from the dark water; grief opens fully), and Part IV now says "All three are the same score" (River and Body the same journey, the Session the same shape without a voyage); the session line kept as it is. The translations follow at their next refresh)
- [x] The Law book's affidavit chapter and the Russell reading (writing, not tools).
      (13 Oct triage: already done, a duplicate of ISS-064 (closed): the Law book's chapter "Affidavits: Claims, Exhibits and Precedent" (book-law.md line 389, 12 Oct) and "Reading Russell with Sherlock" in the philosophy book's chapter 7 (line 1140, 13 Oct; registry/cases/phil-*.yaml))

**Closed 2026-10-13:** the containers test is run and The Tensor edited from it; the Law chapter and the Russell reading were already written (ISS-064).

---

## ISS-085: Lean v4.34 move, after OSforGFF — PARKED
{{Tags area.proofs, area.ops}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

From ISS-036. The proofs build on Lean, Mathlib and physlib v4.33.0, with a one-line local
patch to OSforGFF (`lean/patches/v4.33/`) submitted upstream as mrdouglasny/OSforGFF#22.
Nothing is broken; this waits on upstream.

- [ ] When #22 is merged and OSforGFF moves to v4.34.x: upgrade Lean, Mathlib and physlib to
      v4.34.x, and OSforGFF, GaussianField and BochnerMinlos to upstream commits for the
      same release (`bash lean/upgrade-build.sh`); full `lake build`.
- [ ] Drop `lean/patches/v4.33/` once upstream builds unpatched.
- [x] (13 Oct, from the towers export) physlib's `Cosmology.FLRW` rests on `sorryAx` upstream;
      `ScaleUniverse.FieldLayerType` uses it for the three cosmic levels, so 17 ScaleUniverse
      declarations inherit it (the programme's own files have no `sorry`: count_sorries 0). At
      the upgrade, check whether physlib has closed it; until then the ledger reports them as
      resting on sorry, which is true.
      (13 Oct, author: "any other option?" Yes: physlib's `FLRW` is `def FLRW : Type := sorry`
      with a TODO saying what it should be. ScaleUniverse now defines `FLRWData` exactly as
      that TODO says (a positive, twice-differentiable scale factor `Time → ℝ` and a
      `SpatialGeometry`, both from physlib's sorry-free parts) and uses it for the three cosmic
      levels: nothing in the programme rests on `sorryAx` any more.)
- [ ] Offer `FLRWData` upstream as the replacement for physlib's placeholder (a PR to
      leanprover-community/physlib, as with OSforGFF#22); if merged, switch back to
      `Cosmology.FLRW` at the upgrade.
      (14 Oct 01:00, prepared, not opened: a clone of upstream physlib in ../physlib-flrw, branch
      flrw-structure, local commit 8dfaa69: `Cosmology.FLRW` becomes the structure (a, a_pos,
      contDiff_a, geometry), the placeholder, its `@[sorryful]` and the TODO's first half removed,
      the dynamics half kept as a narrower TODO. Builds on upstream Lean v4.34.1 with every
      Cosmology module; the style linter passes; the module-doc linter reports no new problem.
      Physlib's AI-POLICY.md: the human author vouches for every line and talks to the reviewers
      himself. The PR text is ../physlib-flrw/PR-DESCRIPTION.md. Author: read it, then
      `gh repo fork leanprover-community/physlib --clone=false`, in ../physlib-flrw
      `git remote add fork https://github.com/<you>/physlib.git` and `git push fork flrw-structure`,
      and `gh pr create -R leanprover-community/physlib --head <you>:flrw-structure --body-file
      PR-DESCRIPTION.md`.)

---

## ISS-086: Licences: what is declared, what is stated, and a check so it cannot be lost — CLOSED
{{Tags release, area.build, area.papers, area.books}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=2026-10-13, epic=}}

Author, 13 Oct 22:10: look at the licences of my work (books, code, etc.): what have we
defined and what is actually stated, on GitHub, in the books themselves, on Zenodo? Harden
it: a licence text is easily lost, so add it to the tests and checks. Is CREDITS part of it?

**Found (13 Oct survey, before any change):**
- The intent is CC BY 4.0: `registry/papers.yaml` line 19 ("All records: CC BY 4.0"),
  `paper/ZENODO_RELEASE_SHEETS.md` ("License for all records: CC BY 4.0"), PROCESS.md step 7
  (Zenodo metadata, by hand), the Field Atlas colophon, and the VS Code extension
  (`apps/vscode/LICENSE.md` and `package.json`: CC-BY-4.0).
- **Dist's LICENSE is CC0 1.0** (a public-domain dedication; GitHub shows Dist as CC0).
  Dist is where the published PDFs live, so it contradicts CC BY 4.0: anyone may take them
  without attribution. The most important item.
- **U, T, U.Dot: no LICENSE file**, and GitHub shows no licence: by default all rights
  reserved, so the public code and Lean cannot be reused, whatever the papers say. (U.Ops and
  Me are private: none needed.)
- The papers' and books' build files (pandoc defaults, filters) state no licence: only the
  Field Atlas says it in its colophon; the other books and the papers do not, unless by hand.
- The Zenodo uploads set the licence by hand (PROCESS.md); no script, no check.
- Code under CC BY is not recommended (Creative Commons itself advises a software licence
  for code); the VS Code extension's code is CC BY 4.0 today.

**CREDITS is the other half.** A licence says what others may do with the author's work;
CREDITS says what the author uses from others under their licences (three.js and xterm.js
MIT; OpenStax CC BY 4.0; the museum art CC0, ISS-077; the audio; the Field Atlas textbook's
`figures/CREDITS.yaml`; Mathlib and physlib Apache-2.0 for the Lean). One check covers both:
every public repository says what it gives, and every borrowed thing says where it is from.

**Copilot's view:** two licences, stated once and checked everywhere.
- Text, figures, books, papers, data: CC BY 4.0 (as intended).
- Code (the app, scripts, Lean, Sherlock): a software licence; Apache-2.0 (Mathlib's
  licence, with a patent grant) or MIT (shortest). Recommended: Apache-2.0 for the Lean and
  code, so the proofs match Mathlib's.
- One source of truth, e.g. `registry/licences.yaml`, which each repository's LICENSE,
  every book's and paper's copyright page, the Zenodo metadata and the app's About are
  generated from or checked against.

**Actions:**
- [x] Author's decision: the code licence (Apache-2.0 recommended, or MIT); Dist: CC BY 4.0
      instead of CC0 (recommended; note that CC0 on the already-published PDFs cannot be taken
      back for copies already taken, only for what is published from now on).
      (13 Oct 22:12, author: CC BY 4.0 for text, Apache-2.0 for code; Dist to CC BY 4.0.)
- [x] `registry/licences.yaml`: per repository and per kind (text, code, data), with the SPDX id.
- [x] LICENSE files: U (a LICENSE for text, LICENSE-CODE for code, or a REUSE layout), T,
      U.Dot, Dist (replace CC0); GitHub then shows them.
      (13 Oct: done for the public repositories (T and U.Dot are private): U and t-theory.org
      LICENSE-APACHE and LICENSE-CC-BY, Dist LICENSE now CC BY 4.0 (its README notes the CC0
      mistake), T.Dot LICENSE Apache-2.0; a Licence section in each README and a line on the
      organisation's profile page; the VS Code extension and the app's package.json say
      `Apache-2.0 AND CC-BY-4.0`. All 39 Zenodo records checked: CC BY 4.0.)
- [x] (13 Oct: lib/format/licence.lua, the last filter of all 17 book, paper, course and Atlas
      defaults files, writes the line from registry/licences.yaml `documents.line`: into the
      Atlas colophon's `::: licence` placeholder (its hand-typed sentence removed), else at the
      end; cheat sheets and the noir page opt out; docs/BUILD.md rule 4d. Checked in the P11,
      Law book and Atlas PDFs) Every book and paper: a copyright and licence line on the copyright page or colophon,
      from the build (a pandoc metadata field filled from the registry, not typed per book).
- [x] (13 Oct night: bin/zenodo-publish reads the licence from registry/licences.yaml, the text
      licence's `zenodo` id; `check_licences.py --zenodo` compares every live record with the same
      value) Zenodo: the deposit metadata's licence read from the registry; the release check compares
      the live records' licence (Zenodo API) with it.
- [x] (13 Oct night: registry/licences.yaml `credits:`; check_licences.py fails on an app asset
      (public/art/*) or a package (dependencies and devDependencies, by a credit name) missing from
      the app's CREDITS.md; CodeMirror, codemirror-vim, Vite and Playwright added; a removed entry is
      caught. The books' and papers' figures are the programme's own: the Atlas credits page says
      so, and the course book has its figures/CREDITS.yaml) CREDITS: one CREDITS file per public app/book (rename `audio/CREDITS.md` to the app's
      `CREDITS.md`, ISS-077), each third-party asset listed with its licence; a check that every
      file under `public/art`, `audio`, the textbook figures, etc. has an entry.
- [x] (13 Oct night: all parts done: files, READMEs, manifests, statements, every built PDF
      (--pdfs, release check 14c), CREDITS coverage, and the live Zenodo records (--zenodo))
      `make check-licences`, wired into the release check: LICENSE files present and matching
      the registry; every built PDF contains its licence line (pdftotext); the app's
      `package.json` and the VS Code extension's licence fields match; every third-party asset
      credited.
      (13 Oct: first part done: `make -C paper check-licences` (release check 14c) checks every
      public repository's licence files against the canonical text (SHA-256), the README
      sections, the manifests and the statements; `--zenodo` checks every record live. The
      PDF licence lines and the CREDITS coverage follow those items.
      13 Oct: `--pdfs` (release check 14c; `make -C paper check-licences ARGS=--pdfs`) reads
      every built paper, book, volume, omnibus, course and Atlas PDF with pdftotext and fails
      on one without the holder and CC BY 4.0. Today it fails on the volumes, the omnibus and
      the course until they are rebuilt (ISS-001's release rebuild). CREDITS coverage left.)

---

## ISS-087: Field Atlas, the print edition with the new graphics (about 300 pages) — OPEN
{{Tags area.books, area.app, area.visualize}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=, epic=}}

Author, 13 Oct 22:33: the Atlas prints differently (bookfactory.ch, not Lulu), so do it first;
it depends on the app, and a lot has been added since it was laid out (4 Oct; triptychs 9 Oct).
Its inputs are the registry, its own front and back matter, its theory figures and the app's
captures, not the papers, the omnibus or the Lean. Decided (author, 13 Oct 22:40): everything
printable, about 300 pages (bookfactory: even, at most 400).

**Limit and cost (author, 13 Oct 22:55):** bookfactory's Jumbo takes at most 300 pages (not 400;
the build now fails above 300) and costs about CHF 600. So the plan must fit 300 with a margin,
and the format was open. Decided (author, 13 Oct 23:00): proof first. An A4-landscape edition with
everything, printed at Lulu with the other books (Lulu takes A4 landscape, up to 800 pages, no
300 limit), read on paper; the Jumbo (CHF 600) once, when the content is final, trimmed to 300
(drop the city of code and the Tensor score, tighten the voyage, or the callout on the text page).
- [x] (13 Oct night: defaults/lulu.yaml, 297 x 210 mm, no bleed (nothing prints to the edge), 10pt,
      three columns; `make -C Part2/book/field-atlas lulu` checks Lulu's 800-page limit: 347 pages
      with all six additions. The A3 edition is 313 pages, so the Jumbo (bookfactory, max 300) needs
      trimming before it is ordered, as planned) (in the one Lulu order, ISS-001; 10pt, about 395 pages with everything) An A4-landscape edition: `make -C Part2/book/field-atlas lulu` (defaults/lulu.yaml, scaled
      from the A3 layout; Lulu's size, bleed and cover template checked at order time).

- [x] Recapture check: compare fresh portrait captures of a few levels with the 9 Oct ones;
      recapture all 31 levels if the level views changed.
      (13 Oct: 15 captures of 5 levels, mean difference 0.2 to 2.9 of 255, the animation phase only:
      the level views have not changed; the 9 Oct triptychs stay.)
- [x] (13 Oct night, agent: done; atlas.yaml `voyage:`, Part2/book/field-atlas/voyage/, 15 stops and
      25 plates captured from the app by `npm run capture -- --only voyage` with atlas=1, which now
      hides the explorer's controls and its instructions (hint()); prose in the Atlas register
      with evidence labels and sources (OpenStax A&P 2e, Nummenmaa, LeDoux, Beggs and Plenz added
      to the bibliography); the avalanche power-law figure V1 from the explorer's own rule) 1. A new part, "The Voyage Inside", after sector 3: the explorer's stops as plates with
      text (about 30 pages): the body maps (feelings by basis), the way in (arteries with true
      calibres, OpenStax CC BY, credited), the cathedral of the ventricles (inside, outside,
      FX-off anatomy), thoughts as avalanches (with the power-law figure), pain's path, the
      limbic hinge, the neuron, memory recall, the landscape of states, the dyad, the path's
      gates, the ureter in four stages.
- [x] (13 Oct night: quantum foam, Mandelbulb, network, folded strata, cosmic web; Sector III
      uses the network, since the murmuration renders as single pixels in the software renderer
      the captures use) 2. One fractal world per sector (FLY), opening each sector (5 pages).
- [x] (13 Oct night: front/3-the-mind-palace.md; the tower drawn from registry/models/universal-21
      (figure P1), two halls captured; the method of loci after Yates 1966) 3. The elevator / mind palace as a double spread in the front matter: the ladder as one
      tower (2 pages).
- [x] (13 Oct night: each level page ends with "Sherlock, reading and theory": the level's
      concepts with the real status of their Lean (check_concepts.py --json, the app's own source;
      5 of 31 levels have concepts, the rest say none is registered), its level-specific further
      reading, and the Part I chapters to read with it, paired per sector in atlas.yaml `read_with`,
      an editorial choice for the author to check) 4. Per-level data on each level's text page: the Sherlock panel (concept, Lean name, real
      proof status) and further reading (registry/reading.yaml), and the theory sections of
      Part I to read with the level (from ISS-083, the companion-volume idea).
- [x] (13 Oct night: theory/4a-the-city-of-code.md after T4, four plates along the Root Monster's
      tour, the towers export at 641f3b4: 1,116 declarations, none on sorry, none of True) 5. The city of code for the 11D chapter: the landscape as one world, a tower of Lean with
      floors and axiom beams (about 4 pages).
- [x] (13 Oct night: voyage stop 15, the same story-time in mind, river, body and session) 6. The Tensor's score in its four settings: mind, river, body, session (about 4 pages).
- [ ] Capture routes for explorer stops (capture.mjs), plates, prose (labelled), credits in
      back/3-sources-and-credits.md; build `make -C Part2/book/field-atlas bookfactory`; then the
      print steps in ISS-001 (pages to check, bleed, spine width, cover).
Not for print: twin view, A/B, the consulting room, SCRIBE, the control room, MIDI, the voices.

---

## ISS-088: Sherlock's front end checked: text to facts without guessing (FrameNet and QP) — CLOSED
{{Tags area.proofs, area.papers}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=, epic=}}

From ISS-083 (ISS-055). Author, 13 Oct 23:20: the biggest open piece not implemented; do it
now, before the Atlas. Today the front end is "a language model proposes, a person checks" (one
candidate in eight was wrong); this makes it "a language model proposes, Sherlock checks
mechanically", which is what makes "natural language compiler" literally true.

**In NextKB (bld/sherlock/raw, 13 Oct inventory):** about 24,400 FrameNet semantic
translations (14,900 nouns, 6,300 verbs, 3,100 adjectives; `Noun-`, `Verb-`,
`ADJ-Semtranses.krf`): each word's frame, the OpenCyc type it denotes and a binding template
(syntactic role to OpenCyc predicate); about 660 QP-frame statements (`qpframes.krf`,
`qpframesupport.krf`: "X increases with Y" as qualitative proportionalities); about 350
narrative-function rules. Today only the noun and verb types are used, as a hint for a person
(`sherlock/lookup.py`).

**Plan (estimate about a week; a first working version in 2 to 3 days):**
- [x] 1. Index the semantic translations: word, part of speech, frame, denoted type, binding
      template (role to predicate), from the archive (`bld/sherlock/semtrans.json`).
      (13 Oct: `sherlock/semtrans.py build`, 18 s: 13,846 words, 26,435 senses, 1,023 frames; and a KB
      index of 165,344 constants, 28,621 predicates with an arity, 26,443 with argument types.
      `semtrans.py show <word>` lists a word's senses.)
- [x] 2. A target format: per claim sentence, the word whose translation is used and the role
      bindings, giving OpenCyc facts (`registry/readings/<doc>.yaml`).
      (13 Oct: per document frozen at a commit with its SHA-256 and the reader named; each reading the
      quote and line, the word and sense, per slot the predicate and OpenCyc type, an optional
      influence (qp: sign, constrainer, constrained), or `none` with the reason.)
- [x] 3. The validator: every constant and predicate exists in OpenCyc; arguments satisfy
      OpenCyc's argument types (checked in Lean against Sherlock's OpenCyc types); bindings
      match the word's own template. Reports "no translation" honestly.
      (13 Oct: `sherlock/readings.py check`, rules R1-R6; `make -C sherlock readings`. First run, The
      Tensor, P1 and P6: 15 readings, 5 validated, 10 with no translation (amplify is not in FrameNet;
      Safety, tempo, heart rate are not in OpenCyc). It corrected its reader at once: "Fear rises" read
      with Fear as objectOfStateChange was refuted (a feeling is AspatialThing; the role needs a
      PartiallyTangible), the right reading being Fear as the attribute that changes (fe_attribute);
      "fear activates shame" has no licensed reading (activate is a device's state change in NextKB).
      R5 in Lean, 13 Oct: `make -C sherlock readings-lean` writes `CycReadings.Slice` (generated):
      each refusal as a theorem (an instance of both types gives `Holds .falsum`), each proved fit as
      a `genls` theorem, proofs built step by step with Cyc.Core's rules; the NextKB facts used (27)
      are axioms in slice mode. 7 theorems, kernel-checked in 2.4 s. The reader's refused readings
      are kept in the registry (`rejected`) as tests that must stay refused (R0). Proving the slice's
      facts from the full KB is the release step, as for the concept types.)
- [x] 4. QP sign consistency: "X increases / decreases with Y" read into qualitative
      proportionalities; two documents stating opposite signs for the same pair are a finding.
      (13 Oct: `readings.py qp`. The programme states influences with verbs FrameNet lacks (amplify)
      or between quantities OpenCyc lacks (Φ, safety), so few sentences license a sign; it also
      states them as data, the coupling matrices of its figures (W_ij > 0: j amplifies i, P1 line
      701). The check compares sentences with their own document's matrices, and matrices across
      documents: 74 influences in the labelled matrices (Fear, Shame, Anger, Calm, Awe). First
      finding: Calm and Shame are coupled at -0.3 in P1 (lines 1946, 1973, 2132) and P6 (796,
      1108), but at +0.2 in P6's Appendix A base matrix W0 (lines 2636, 2657): calm amplifies shame
      there. Author to decide (ISS-081).)
- [x] 5. Run on The Tensor and one paper; measure how much validates and what it finds; write it
      into SH1 and SH2.
      (13 Oct: The Tensor, P1 and P6 read (15 sentences); `readings.py coverage` over all 385 claims
      of 43 affidavits: 65% of content words have a FrameNet translation, 16% of claims have one for
      every word; the gaps are the technical vocabulary (propagator, attractor, limbic, Hopfield) and
      connectives (because, therefore). SH1 has a new section 4.4, "The front end, checked", and its
      Discussion says what is checked now (Baker et al. 1998 and Forbus 1984 added to the
      bibliography); SH2's future work proposes scoring models' readings by the validator.)

**Closed 2026-10-13:** the front end can be checked where NextKB's FrameNet reaches. Next steps,
if wanted (SOMEDAY): more readings per paper; (done 13 Oct, ISS-089: the programme's own vocabulary
added to OpenCyc as a microtheory); the slice's
facts proved from the full KB at release; SH2's experiment (models' readings scored by the validator).
Risk: FrameNet covers everyday words better than technical ones, and OpenCyc lacks many of the
programme's terms; "no translation" is measured, not guessed.

---

## ISS-089: The programme's own vocabulary in OpenCyc (TTheoryVocabularyMt) — CLOSED
{{Tags area.proofs, area.papers}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=2026-10-13, epic=}}

From ISS-088 (author, 13 Oct 23:43: "vocab, yes pls"). OpenCyc and NextKB's FrameNet lack the
programme's technical words, or have them in another sense: OpenCyc's Threshold is part of a
building, Landscape a topographical feature, NeuralNetwork an AI program; FrameNet's dampen is
to make wet; NextKB's scale sense of reduce is typed IncreaseAction (an error).

- [x] `registry/vocabulary.yaml` (TTheoryVocabularyMt, the microtheory `sherlock/Cyc/TTheory.lean`
      already declared): 19 constants (Propagator, Attractor, EnergyLandscape, EnergyBarrier,
      LimbicGate, Threshold, MemoryKernel, CouplingMatrix, Coupling, HopfieldNetwork, LimbicField
      (Phi), SomaField, UniversalSomaticField, CosmologicalConstant, FeltSafety, HeartRate, Tempo,
      NeuralSynchrony, Dyad; each `-TTheory`) placed by `genls` under neutral OpenCyc collections
      (a model quantity is a ScalarQuantity, the soma-field a Field-LogicalOrPhysical: no physical
      claim); words for 8 constants OpenCyc has (simulation, axiom, definition, dimension, limbic,
      hysteresis, tunnelling); 7 verbs typed with OpenCyc event types on a FrameNet sense's template
      (amplify, deepen, activate, soften, dampen, trigger, reduce).
- [x] `sherlock/semtrans.py build` merges it, marked as the programme's (source
      TTheoryVocabularyMt), after NextKB's senses so their numbers do not move; it refuses an anchor
      OpenCyc lacks, a name OpenCyc uses, a missing template, and a constant under two disjoint
      collections. In the Lean slice the vocabulary's facts are named and documented apart (`v_`).
- [x] Re-read: 12 of the 15 readings validate (5 before); the 5 influences read from sentences now
      carry licensed signs and agree with their own documents' coupling matrices; NextKB's reduce
      error is reported. Coverage over the 385 claims: 69% of content words, 18% of claims fully
      (65% and 16% with NextKB alone). The rest is general academic language and connectives.
      SH1 4.4 updated.

**Closed 2026-10-13.**

---

## ISS-090: The VS Code extension: trying, setting up, publishing — OPEN
{{Tags area.app}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

Parked by the author on 13 Oct (from ISS-079): what is built stays (apps/vscode 0.1.0: the
Soma Machine in a tab, Sherlock's findings as errors, View in Soma Machine, PROVE on a tower
floor; Apache-2.0 AND CC-BY-4.0); the author works in Neovim, where U.Dot's `sherlock.lua`
gives the same Sherlock commands and opens the app in the browser. Picked up if the
extension is wanted as the back door for distribution, after Mk 1.

(Unparked 13 Oct afternoon, author: prepare it, the local steps only; do not publish yet.)
- [ ] Author: try the VSIX in VS Code (`npm run package` in apps/vscode).
- [ ] "Sherlock: Set up" (Lean, NextKB 20 MB, local build, several GB, warned first).
- [ ] Marketplace pre-release and Open VSX (publisher account, screenshots, a public build).

---

## ISS-091: The chest strap: heart rate, HRV and breathing from a real strap — OPEN
{{Tags area.instrument}}
{{Fields date.created=2026-10-13, date.start=, date.end=, epic=}}

From ISS-052 (author, 13 Oct: its own issue, parked; unparked 13 Oct afternoon: "I can see the
benefit"). Coded and checked with sample
packets; waits for a real strap.

- [ ] (10 Oct 23:50, coded, to test in UAT with a real strap) A Bluetooth heart-rate
      chest strap: heart.js (Web Bluetooth, the standard Heart Rate service 0x180D and
      measurement 0x2A37: 8- or 16-bit rate, RR intervals kept for HRV), ♥ STRAP on the
      SCORE stop (Chrome or Edge, https or localhost); while connected it drives the
      heart and the slider is off; explorer-check decodes sample packets. UAT: connect a
      strap (Polar, Garmin, Wahoo ...), watch ♥ follow it, LOOP on, a rising heart
      slows the film; then HRV from the RR intervals (next item).
- [x] (11 Oct 00:10) HRV and breathing from the strap's RR intervals (heart.js
      `hrvFromRR`, the last 60 s): RMSSD (vagal tone), breaths a minute (the respiratory
      rhythm in the heart rate, 0.12-0.4 Hz) and coherence (one slow regular peak); they
      refine the viewer's Safety (score.js `viewerField`); shown on the SCORE stop as
      estimates. explorer-check: breathing 15/min recovered, a slow 6/min rhythm coherent,
      irregular beats not, a calm coherent heart raises Safety. Estimates for the film, not
      clinical measures; to test with a strap in UAT.
- [ ] Uses beyond the score (author, 13 Oct: "I can see the benefit"): the body stop's heart, the
      landscape's noise, the dyad's rhythm from a real heart; the author to say which he sees.
- [ ] UAT with a real strap (Polar, Garmin, Wahoo ...): ♥ STRAP on the SCORE stop; ♥ follows
      it; LOOP on, a rising heart slows the film; RMSSD, breaths a minute and coherence look
      plausible. Then put the strap back into uat/checklist.yaml's `hw-strap-twister` step.

---

## ISS-092: The Wizard's checks: what a book promises, what is next to it, what was never written — OPEN
{{Tags area.proofs, area.books}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=, epic=ISS-055-sherlock}}

Author, 13 Oct afternoon: before the UAT and asking H-AL whether we covered everything, add it to
Sherlock: a definition of what each book is expected to cover, and the big question, "is there
anything we haven't discussed or considered that would make this better?", with a little
interaction between the AI and Cyc. Three sources of gaps, each with its own tool; the AI
proposes, the author confirms, the registry or Cyc decides.

Author, 13 Oct: these are the Wizard's checks (validation: built the right thing), beside
Sherlock (verification: built right) and the Monster (comprehensibility: reader tests by
someone who did not build it, and the BOFH Monster, an adversary who tries to make the work
overclaim, author 13 Oct). Automated, they run at release (`make wizard`); the NotebookLM UAT's Wizard section starts
from their report and asks only the judgement questions, and the UAT concentrates on the Monster,
with real readers.
- [x] Scope: each book's promise in books.yaml as registry ids (levels, explorer stops, concepts,
      papers, models, paths, tours); `make wizard` checks each is covered and reports
      what is missing. The Atlas first (all 31 levels, the 15 stops, the models, paths and tours).
      (13 Oct night: the fifteen domain books' scopes are read from the fractal manifest, not
      copied: papers required, levels and concepts reported (the ladder note naming the levels is
      added in the volumes, not the standalone books); a paper counts under its published or its
      own title; and a printed check: every paper the manifest assigns must be printed in full in
      some book. It found P10, P14, P15 and P25 cited and printed nowhere, though the 13 Oct
      omnibus note said they were: Reading sections and AddPaper added (P10 Neuroscience, P14 and
      P15 Physics, P25 Trauma; pointers in Formal Mathematics and Complex Systems).)
- [x] Neighbourhood (Cyc): for each concept a book covers, its siblings and parents one step away
      in OpenCyc that the book never mentions (the emotions it leaves out, the organs next to the
      ones it shows); the AI ranks them and phrases each as a question for the author.
      (14 Oct 01:15: sherlock/neighbours.py, `make -C sherlock neighbours`: each typed concept's
      OpenCyc neighbours of the same kind, never named in the papers, books or atlas: 27, all
      feelings next to the programme's emotions (trapped feeling, emotional coldness,
      indifference, listlessness, nervousness, uneasiness, hate, gratitude, touched ...).
      Concepts of no specific kind are skipped (a reflexive action's parent is any action on an
      object). The ranking and the questions go to the HAL-UAT with the "never written" item.)
- [ ] Never written (H-AL): ask H-AL what the chats discuss that no book covers; with the UAT.

## ISS-093: What Sherlock found in its own programme, written up — CLOSED
{{Tags area.papers, area.books, area.proofs}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=2026-10-13, epic=ISS-055-sherlock}}

Author, 13 Oct afternoon: Sherlock has been used for a while; is there new information for the
papers or books? Yes: six lessons from running it on the programme itself. For SH1's next
version and a chapter of the Formal Mathematics book (not a new paper).
- [x] Prose about proofs goes stale within hours: after the last sorries closed, about 20 documents
      still said "five remain", the data files (books.yaml) worst. Statements about proof status
      should be generated from the Lean, as the licence line is.
- [x] "No sorry in my files" is not "nothing rests on sorry": physlib's FLRW placeholder reached 17
      declarations through a dependency; only the towers export (#print axioms per declaration)
      showed it.
- [x] Theorems of `True` look proved: two survived because their names said what they did not prove.
- [x] Word-sense traps: pole (a rod), threshold (part of a building), abduction (a kidnapping), landscape
      (topography); and the ontology corrects intuition both ways (HRV as a quantity is mathematical).
- [x] AI-made figures are claims: the P6 Calm-Shame sign slip was in figure parameters an agent wrote.
- [x] Yield follows numbers: a hedged paper (P25) gives Sherlock little to check; numeric papers most.

---

Done (13 Oct night): SH1 has a new section, "After the snapshot: what Sherlock found in its own
programme", ten lessons (these six; disclaimers as contexts; one set of types; mentioned is not
printed; a checker needs an adversary, with Moriarty's 13 of 14), the snapshot's counts left as
they are. The Formal Mathematics book has a new chapter, "What the Checker Found: Proof Status
Goes Stale", with its ledger. On the way the lessons kept proving themselves: the Formal
Mathematics book still called two proved theorems `sorry`s and a scale family "rests on
`sorry`"; the ledger missed the first because the name was camelCase (fixed: it reads every
declared name, 460 to 586 citations, 0 disagree) and its was/now reading ran across a whole
paragraph (fixed: the sentence); the booklets' summary page claimed "0 extra axioms", a G₂
obligation "closed" by a flat product and a "quantum advantage real" from a simulation (fixed).

## ISS-094: Every check has a nasty: Moriarty, the Dark Matter Lord, the BOFH — OPEN
{{Tags area.proofs, area.books, area.instrument}}
{{Fields date.created=2026-10-13, date.start=2026-10-13, date.end=, epic=ISS-055-sherlock}}

Author, 13 Oct: each of the three levels has an adversary, and a check that has never been
attacked has not passed. Sherlock (verification, built right) has Moriarty, the breaker who
finds the DOT; the Wizard (validation, built the right thing; Harry Potter in the V-model) has
the Dark Matter Lord (author, 13 Oct, renamed from He-Who-Must-Not-Be-Named: the programme's own
name, and the rival is the unseen mass a book's argument must account for, as dark matter is in
P22), who names what a book avoided naming; the Monster (comprehensibility;
the Cookie Monster, the honest hungry reader) has the BOFH, who misuses and misquotes. H-AL was
asked (uat/RC3/hal-adversaries-2026-10-13.md); its corrections are taken in:
- Moriarty attacks the theory, not only Sherlock: two modes, as the philosophy book says,
  the breaker (the DOT) and the abducer. So: (a) mutation tests of Sherlock's own sensitivity,
  and (b) stress tests of the claims themselves.
- The Wizard's rival is the author's own Disconfirmation Rule 4: "a formally stronger competing
  mapping explains the same data with fewer assumptions"; the Wizard also keeps scope discipline
  (the D1 boundary: one case is not a law; cosmological modesty).
- The BOFH is the Monster level's adversary, not the Monster: the Cookie Monster stays the honest
  reader whose question is "has it been translated?".

- [x] Moriarty (a), mutation tests (`make moriarty`): plant faults in copies of frozen documents (a
      changed number, "proved" where the Lean has an axiom or `True`, a dropped evidence label, an
      unhedged clinical sentence) and measure what Sherlock (affidavits, ledger, clinical, readings)
      catches; each miss is a DOT in Sherlock.
      Done (13 Oct): registry/moriarty.yaml (8 faults), sherlock/moriarty.py; the file is restored
      in a `finally`. 6 of 8 caught: an axiom called kernel-checked (ledger), a misspelt Lean name
      (ledger), a dropped hedge (clinical), the Calm-Shame sign put back (qp: matrices differ), a
      changed number (delta: edited), a dropped credit (licences). Two DOTs, both expected: a stale
      sorry count in prose with no Lean name (ISS-093 lesson 1), and "the matrix $W$ is the
      amygdala" (biological leakage in prose; the typing check, ISS-063, sees only axioms). Moriarty
      (b) below is where these get attacked.
- [ ] Moriarty (b), stress tests of the claims (H-AL's first attacks): axiom smuggling (prose
      "kernel-verified" over FieldAxioms or a placeholder); biological leakage (a D9-11 matrix
      equated with tissue without a transduction map: the typing check, ISS-063); matrix
      non-generalisation (QUANT-EXP-1 and FM-HN reachability under random non-symmetric couplings
      with noise, not only the hand-tuned W8); algebraic vs metric G2 (prose implying a G2-holonomy
      metric where only algebraic compatibility is proved).
      (13 Oct night, part: biological leakage is sherlock/leakage.py, model objects said to be
      OpenCyc's body parts with no map, 0 in 44 documents, Moriarty's fault now caught; axiom
      smuggling is the ledger's, and its fault is caught; the G₂ wording, scanned once: the
      papers and books are careful, the booklets' summary page was not (fixed, see ISS-093).
      Left: the matrix non-generalisation test, random non-symmetric couplings with noise.)
- [ ] The Dark Matter Lord (the Wizard's rivals): for each book's central claims, does it name
      and answer the simpler rival: classical annealing, Langevin noise or modern Hopfield networks
      without 11D or tunnelling; interoception and predictive processing (Craig's lamina I, Friston's
      active inference); pure CEMI (McFadden, 4D Maxwell); and the D1 breach (N = 1 presented as a
      law). The AI proposes rivals (with Cyc's neighbourhood and the bibliography), the author judges.
- [x] (13 Oct: uat/*-nlm-uat.md C-6 and TC-4, uat/checklist.yaml monster-bofh) The BOFH: hostile
      questions and out-of-context quotes; misuse of the app.
- [ ] The BOFH, H-AL's further attacks: poke during scale transitions, 11D controls below sigma 7,
      emotion labels leaking into non-biological scales; the jargon trap (a general-reader section,
      the Gateway booklet, lapsing into untranslated string theory without a reader bridge).

