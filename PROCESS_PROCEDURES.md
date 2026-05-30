# Process Procedures

## Git Hygiene Requirement

This repository must maintain a predictable checkout state.

Required rules:

1. Generated artifacts are not committed unless explicitly release-critical.
2. Work in two phases:
   - content/source edits,
   - optional artifact regeneration for release.
3. Before opening a PR or tagging a release, run:
   - `git status --short`
   - `./.venv/Scripts/python.exe scripts/paper_status.py`
4. Keep large generated outputs in ignored paths (`dist/`, generated status files, generated media).
5. If a generated file must be versioned for a release, add it intentionally in a dedicated commit with a clear message.

### Generated Quantum Artifacts Policy

`instrument/quantum_*.csv`, `instrument/quantum_*.png`, and generated `.gif` outputs are treated as build/runtime artifacts.

- They are ignored by default and should not be re-added accidentally.
- If you need to publish a figure/table in git history, copy it to a curated path first (for example, `paper/figures/`) and commit that curated file only.
- Do not commit raw sweep outputs directly from `instrument/` unless explicitly required for a reproducibility milestone.

## Recommended Commit Order

1. Source commit:
   - `.md`, `.py`, `.lean`, checklists, roadmap, metadata templates.
2. Packaging commit (optional):
   - regenerate bundles and add only release outputs you explicitly want tracked.
3. Release note commit:
   - update `DIARY.md` and any status docs intended for history.

## No-APC Publication Process

1. arXiv submission for `paper/mathematical-co-identification.md`.
2. bioRxiv revision for `paper/soma-field-paper.md`.
3. PsyArXiv/OSF preprint for `paper/music-affect-dynamics.md`.
4. Record IDs/URLs in project logs and regenerate release packages.

Use these operational files:

- `paper/SUBMISSION_NO_APC_CHECKLIST.md`
- `paper/PUBLICATION_ROADMAP.md`
- `paper/INDEPENDENT_REPLICATION_LEDGER.md`

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

**Note:** The concept DOI never changes between versions. Always cite the concept DOI in papers and READMEs.

## Zenodo: How to Create a New Record

Use this for first-time uploads (new papers, datasets, supplementary materials).

1. Go to [zenodo.org](https://zenodo.org) → **New upload**
2. Set **Resource type** (Publication → Preprint for papers; Dataset for data; Software for code)
3. Upload the file(s)
4. Click **Get a DOI** → generate
5. Fill metadata — at minimum: title, authors, description, licence (CC BY 4.0), publication date
6. Add **Related identifiers** for companion records (use concept DOIs):
   - `Cites` — papers this work builds on
   - `IsSupplementedBy` / `IsSupplementTo` — datasets, proofs
   - `IsPartOf` — omnibus collection
7. **Save** → **Publish**
8. Record concept DOI in `paper/ZENODO_RELEASE_SHEETS.md` and update `.github-private/profile/README.md`
