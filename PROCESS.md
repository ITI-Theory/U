# Process

## Git Hygiene Requirement

This repository must maintain a predictable checkout state.

Required rules:

1. Generated artifacts are not committed unless explicitly release-critical.
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
3. **Upload** the new PDF from `paper/bld/<paper-name>.pdf`
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

Run before declaring any release complete. Uses a private NotebookLM notebook (`nlm-uat`).

### Setup

1. Create a new private NotebookLM notebook at https://notebooklm.google.com
2. Name it `nlm-uat`
3. Upload the files relevant to the test (see tiers below)
4. **Delete the notebook when done** — always start fresh

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

## Session Start — Standard Primer Prompt

Use this at the start of any new AI chat session (GitHub Copilot in VS Code, or Claude Sonnet/Opus native or via Copilot). Paste verbatim:

```
Session start. Read: FIELD-NOTES.md (last 40 lines) and PROCESS.md.
Then run: git status -sb in repos U, Me, T.Ops.
Summarise: what was last worked on, current git state, and what's next. Then wait.
```

**For VS Code Copilot:** `copilot-instructions.md` loads automatically — no extra priming needed for project facts. Just paste the above to catch up on recent session work.

**For Claude native (claude.ai Sonnet/Opus):**
1. Create a **Project** called `[T]-Theory/U`
2. Set system prompt = contents of `U/.github/copilot-instructions.md`
3. Add `U/PROCESS.md` as project knowledge
4. Then paste the session starter above in each new conversation

**Open workspace command:**
```
code "C:\Users\alist\prj\git\ITI-Theory\U\paper\U.code-workspace"
```
Do not move `U.code-workspace` — its location is the workspace storage key (moving it orphans chat history).
