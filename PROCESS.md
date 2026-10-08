# Process

## Git Hygiene Requirement

This repository must maintain a predictable checkout state.

Required rules:

1. Generated artifacts are not committed in U unless explicitly release-critical.
   `bld/` is the ignored repo-root build tree (`bld/papers/`, `bld/books/`,
   `bld/atlas/`, `bld/app/`); accepted PDFs are promoted deliberately to Dist,
   the distribution repository.
2. Work in two phases:
   - content/source edits,
   - optional artifact regeneration for release.
3. Before opening a PR or tagging a release, run:
   - `git status --short`
   - `./.venv/Scripts/python.exe paper/scripts/paper_status.py`
4. Keep large generated outputs in ignored paths (`dist/`, generated status files, generated media).
5. If a generated file must be versioned for a release, add it intentionally in a dedicated commit with a clear message.
6. **Never commit Lean files that do not compile.** Run `lake build` and confirm exit 0 before every commit touching `.lean` files. A build that was passing before your changes must still pass after.

### Generated Quantum Artifacts Policy

`apps/instrument/quantum_*.csv`, `apps/instrument/quantum_*.png`, and generated `.gif` outputs are treated as build/runtime artifacts.

- They are ignored by default and should not be re-added accidentally.
- If you need to publish a figure/table in git history, copy it to a curated path first (e.g. `paper/soma/quantum-soma-penrose/`) and commit that curated file only.
- Do not commit raw sweep outputs directly from `apps/instrument/` unless explicitly required for a reproducibility milestone.

## Recommended Commit Order

1. Source commit:
   - `.md`, `.py`, `.lean`, checklists, roadmap, metadata templates.
2. Packaging commit (optional):
   - regenerate bundles and add only release outputs you explicitly want tracked.
3. Release note commit:
   - update `paper/FIELD-NOTES.md` and any status docs intended for history.

## Zenodo: How to Publish a New Version of an Existing Record

Use this when a paper has been updated (e.g. acknowledgements added, corrections) and needs a new version DOI on an existing Zenodo concept record.

1. Go to the existing record URL (e.g. `zenodo.org/records/XXXXXXX`)
2. Click **New version** — file list starts empty
3. **Upload** the new PDF from `bld/papers/<paper-name>.pdf`
4. Click **Get a DOI** → generate the new version DOI
5. **Publication date** — Zenodo forces you to set this. Use the date of the **first publication** of this record, not today. Check the original record for that date.
6. Click **Add description** → set the **Type** dropdown to **Other** → type the version note (e.g. `Added Acknowledgements section`)
7. **Save** → **Publish**
8. Record both DOIs:
   - **Concept DOI** (stable, version-independent) — use this in all cross-references and README links
   - **Version DOI** (this specific upload) — record in `paper/ZENODO_RELEASE_SHEETS.md`
9. Update `.github-private/profile/README.md` with the new version DOI (if that paper is listed there)

**Note:** The concept DOI never changes between versions. Always cite the concept DOI in papers and READMEs.

## Zenodo: How to Create a New Record

Use this for first-time uploads (new papers, datasets, supplementary materials).

1. Go to [zenodo.org](https://zenodo.org) → **New upload**
2. Upload the file(s)
3. Set **Resource type** (Publication → Preprint for papers; Other for demo/notes)
4. Fill **Title**
5. Fill **Publication date**
6. Fill **Author(s)** — Name: `Johnson, Alistair` | ORCID: `0009-0007-2194-0850`
7. Fill remaining metadata: description, licence (CC BY 4.0)
8. Add **Related identifiers** for companion records (use concept DOIs).
   For each entry, fill fields in this order: **Relation → Identifier → Scheme (DOI) → Resource type**
   - `Is cited by` / `Cites` — papers this work builds on
   - `Is supplemented by` / `Is supplement to` — datasets, proofs
   - `Is part of` — omnibus collection
9. **Save** → **Publish**
10. Record concept DOI in `Dist/PAPERS.yaml` and update org README DOI tables

**Detailed form fields:** `Dist/zenodo/README.md`

## UAT Testing (CM → HP → SH framework)

The canonical release sequence and the Papers/[T]-Theory split live in
`Dist/README.md`. This section defines the local U candidate and NotebookLM
work only; it does not authorize promotion or Zenodo release.

Run before declaring any release complete. Uses the private standing UAT notebooks.

### Setup

Each track has a standing private notebook (`NOTEBOOKS` in
`uat/scripts/nlm_uat.py`; titles start `UAT `). It holds two versions of the
candidate, so UAT can ask whether the new one is better:

1. Log in once per session expiry: `apps/instrument/mother/.venv/Scripts/notebooklm login`.
2. Set the candidate version in `uat/manifest.yaml` (`version: rcN.M`; bump M
   before restaging changed sources), commit, then stage the track:
   `make uat-stage-papers` or `make uat-stage-ttheory`. Staged files carry the
   version in their names (`omnibus-a4.rc3.1.pdf`); `MANIFEST.md` records the
   git ref.
3. Dry run: `make uat-nlm TRACK=papers DRY=1` lists what would be relabelled,
   kept (the previous version), deleted (older versions), uploaded and asked.
4. Run: `make uat-nlm TRACK=papers`. The worksheet is asked of the new version
   only; a final CMP item compares new with previous (BETTER, SAME or WORSE).
   Report in `uat/results/<track>-<version>-<time>.md`. `KEEP=1` asks without
   uploading; `ITEMS=S-1,H-2` asks only those items.
5. Review the report with the author before anything goes into `paper/UAT.md`.

By hand in the web UI the same rule holds: reuse the notebook, keep the
previous version, delete older ones.

### Tier 1 — Sherlock: “Did we build it right?”

Checks formal correctness and internal consistency.

Files to load:
- New Omnibus PDF (`Dist/papers/omnibus-a4.pdf`)
- New Fractal Thesis PDF (`Dist/papers/ttheory-omnibus.pdf`)
- Old versions of both (for comparison — load and toggle off when not comparing)

Test questions:
- “Are all five OS axioms listed and correctly stated?”
- “What does the theory say about [X] — is it consistent across the omnibus?”
- “Find any contradiction between [early paper] and [later paper].”

**Local candidate workflow (run from the U repo root):**

1. Run `make generate` when adopting the latest `Dist/PAPERS.yaml` registry.
2. Build and hash the selected track: `make uat-stage-papers` or
   `make uat-stage-ttheory`. Files land in ignored `uat/staging/<track>/`.
3. Perform track-specific PDF/reader QA, then run `bin/release-check`.
4. Follow `Dist/README.md` for acceptance, promotion, Lulu, and Zenodo ordering.

Release candidates are English-only; translation tooling is deferred and does
not form part of the candidate or release workflow.

`bin/release-check` covers Float in proofs, sorry count, open problem markers,
lean-appendix freshness, PAPERS.yaml pending uploads, git status, and release-file
integrity. See ISS-013.
### Tier 2 — Harry Potter: “Did we build the right thing?”

Checks completeness and scope.

Files to load: same as Tier 1, plus any new papers being validated.

Test questions:
- “What open problems are listed and which are now closed?”
- “Is the D-Wave quantum experiment described? Is the result stated?”
- “Is the cosmological constant derivation present? Is dark matter addressed?”

### Tier 3 — Cookie Monster: “Can anyone understand it?”

Checks accessibility. The cheat-sheet is the primary test artefact.

Files to load:
- `Dist/stuff/ttheory-cheatsheet.pdf` — primary test document
- Optionally: one domain book from the Fractal Thesis for context

Test questions:
- “From the cheat-sheet alone, what is the USF?”
- “What is the Zoom Operator?”
- “Explain the Hopfield energy function from what’s on this sheet.”

### Pass criteria

All three tiers pass when no new contradictions, gaps, or incomprehensible sections are found.
Log results in `FIELD-NOTES.md` with date and notebook name.

## Session Start

How to start a session is in [README.md](README.md), *Working on this repo*:
run `HAL copilot start` (an AI runs it itself; for a web chat such as
claude.ai, paste its output). It shows the front doors, the current state
(`docs/agent/CURRENT.md`), the end of the active chat and git status.

**Open workspace command:**
```
code "C:\Users\alist\prj\git\ITI-Theory\U\paper\U.code-workspace"
```
Do not move `U.code-workspace` — its location is the workspace storage key (moving it orphans chat history).
