# No-APC Submission Checklist

Use this checklist when APC-charging journals are out of scope.

## A. arXiv (mathematical-co-identification)

- [x] PDF ready: paper/mathematical-co-identification.pdf
- [x] Source ready: paper/mathematical-co-identification.md
- [x] Bundle ready: dist/U-submission-arxiv-v1.0.5-20260520.zip
- [ ] Submit to arXiv category math-ph (secondary q-bio.NC)
- [ ] Save arXiv ID and URL
- [ ] Add arXiv ID to PAPER_STATUS source inputs

## B. bioRxiv Revision (soma-field-paper)

- [x] Existing bioRxiv posting recorded in repo
- [x] Updated PDF ready: paper/soma-field-paper.pdf
- [x] DOCX ready (if needed): paper/soma-field-paper.docx
- [ ] Upload revision in bioRxiv "Manage Submissions"
- [ ] Save revision number/date and public URL
- [ ] Add revision evidence to PAPER_STATUS source inputs

## C. PsyArXiv or OSF Preprints (music-affect-dynamics)

- [x] PDF ready: paper/music-affect-dynamics.pdf
- [x] Source ready: paper/music-affect-dynamics.md
- [x] Freeze bundle ready: dist/U-papers-freeze-v1.0.6-20260520.zip
- [ ] Upload preprint to PsyArXiv or OSF
- [ ] Save DOI/URL
- [ ] Add posting evidence to PAPER_STATUS source inputs

## D. Repository Traceability After Submission

- [ ] Update paper/PAPER_STATUS.md and paper/paper_status.json via scripts/paper_status.py inputs/source evidence
- [ ] Append submission IDs/URLs to DIARY.md
- [ ] Regenerate packages if required:
  - [ ] dist/U-papers-freeze-<next>.zip
  - [ ] dist/U-submission-arxiv-<next>.zip
  - [ ] dist/U-everything-<next>.zip

## Notes

- Frontiers remains available but is treated as optional due to APC cost.
- For journal submission after preprint, prefer venues that do not require mandatory APC for standard (non-OA) publication.
