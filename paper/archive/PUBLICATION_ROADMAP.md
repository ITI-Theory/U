# Publication Roadmap (May 2026)

## Portfolio Routing (No-APC First)

| Manuscript | No-cost primary route | Secondary route (verify no mandatory APC) | Immediate preprint route | Why this fit |
|---|---|---|---|---|
| soma-field-paper.md | Keep active on bioRxiv (revise to v2+) | Subscription/hybrid computational neuroscience journals with no mandatory APC option | bioRxiv revision (v2+) | Preserves public timestamp and visibility without paying APC. |
| mathematical-co-identification.md | arXiv (math-ph or q-bio.NC) | Journal of Mathematical Psychology, Foundations of Science | arXiv first | Fastest zero-cost citable identifier for this methods paper. |
| music-affect-dynamics.md | PsyArXiv or OSF Preprints | Empirical Musicology Review, Musicae Scientiae (verify fee policy) | PsyArXiv or OSF Preprints | Keeps the music paper public while avoiding immediate journal APC exposure. |

## Current Status Snapshot

| Manuscript | Build/package status | Publication status in repo | Blocking gap (no-APC path) |
|---|---|---|---|
| soma-field-paper.md | PDF + DOCX + submission bundle present | bioRxiv posted; Frontiers not confirmed | Submit bioRxiv revision package and record version receipt |
| mathematical-co-identification.md | PDF + source + arXiv bundle present | arXiv not confirmed in repo | Finalize arXiv metadata and submit |
| music-affect-dynamics.md | PDF + source in freeze/everything bundles | no repository-confirmed submission record | Upload preprint to PsyArXiv/OSF and record DOI/URL |

## Next Move (Execution Order)

1. Submit mathematical-co-identification.md to arXiv first (fastest external timestamp).
2. Submit bioRxiv revision for soma-field-paper.md (v2+).
3. Post music-affect-dynamics.md to PsyArXiv/OSF.
4. Record confirmation IDs back into PAPER_STATUS.md inputs and DIARY.md.

## Immediate Assets Prepared In This Repo

- SUBMISSION_FRONTIERS_CHECKLIST.md (optional paid route)
- SUBMISSION_ARXIV_CHECKLIST.md
- SUBMISSION_NO_APC_CHECKLIST.md
- INDEPENDENT_REPLICATION_LEDGER.md
- submission_metadata/frontiers_soma_field.json
- submission_metadata/arxiv_mathematical_coidentification.json
- submission_metadata/preprint_music_affect.json

## Decision Rule (If You Want One)

Use this rule to choose where to push first when time is limited:

1. Pick the manuscript with the shortest path to a citable identifier.
2. Prefer routes with existing bundle + checklist + metadata already in repo.
3. Only push a journal route when the preprint route is already queued or posted.

By this rule, the current fastest no-fee path is: arXiv (math paper) -> bioRxiv revision (soma paper) -> PsyArXiv/OSF (music paper).
