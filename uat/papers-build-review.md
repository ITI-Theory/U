# Papers Build Review

This document scopes architecture and format review separately from scientific acceptance. Treat **Current Facts** as candidate context; treat **Review Questions** as discussion prompts, not release requirements.

## Current Facts

- `Dist/PAPERS.yaml` is the master registry for paper identity, release metadata, reference policy, and C1v2 membership.
- C1v2 is a merged manuscript with one master contents and continuous pagination. Individual-paper covers and local contents are not repeated.
- Individual papers use the shared `journal.tex` opening: cover, blank verso, unnumbered abstract recto, blank verso, contents recto beginning printed folio 1, then first body section recto.
- Later body sections flow normally; heading spacing protects against orphaned headings and blank body pages are rejected.
- Release-scope papers require at least five rendered reference-content lines unless the registry explicitly declares `references: none`.

## Review Questions

1. Does the merged C1v2 hierarchy make the programme easier to navigate than standalone paper sequence alone?
2. Are the paper divider pages useful at their current density and wording?
3. Is one shared `journal.tex` appropriate, or should papers eventually declare named format profiles in the registry?
4. Is a single `Makefile` plus focused Python generators/checkers sufficiently transparent, or should build rules be split further without duplicating registry data?
5. Which checks are valuable release gates, and which are too implementation-specific for long-term maintenance?

## Engineering Observation

The current build is safer than the earlier hard-coded collection path because C1v2 metadata and membership now live in `PAPERS.yaml`. The remaining risk is drift between registry semantics and generators; future changes should add a registry field and a focused test before changing renderer behavior.
