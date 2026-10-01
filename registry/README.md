# Operator Registry

This registry is the data source for the Soma Field Operator generator. It reconciles the existing app JavaScript tables, `operator-theory.yaml`, the Field Atlas scale plates, and `Dist/PAPERS.yaml` paper ids without adding new science.

## Layout

- `levels/<level-id>.yaml`: one substrate node with one chosen label, source labels, explanation registers, claim badges, paper ids, renderer id, and Atlas media.
- `paths/<path-id>/path.yaml`: a named graph over level ids.
- `paths/<path-id>/edges/<from>--<to>.md`: front matter for preserved structure, additions/retypings, kernel, render operation, claim badge, and prose.
- `models/<model-id>.yaml`: model-specific coordinates over level ids.
- `lenses.yaml`: baseline/T-Theory/display/affect lens catalogue.

## Source resolution

The generator reads `../Dist/PAPERS.yaml` as the publication authority. Paper,
dataset, and collection ids resolve to their public title and concept DOI link
(`https://doi.org/<doi>`). Records without a DOI, Field Atlas chapters, figures,
proof files, and other unpublished material resolve to the placeholder front-door
pattern `https://www.t-theory.org/atlas/<slug>` and are labelled "not yet
published". Repository paths remain in generated metadata only for the app's
developer setting; reader mode must not display them.

## Generated module shape

`apps/instrument/visuals/soma-field-operator/generated/app-data.js` exports:

- `levels`: array of level records.
- `paths`: array of path records with parsed `edge_records`.
- `models`: array of model records; coordinates are model-local.
- `lenses`: lens catalogue.
- `coverage`: validation counts and renderer coverage warnings.
- `zUSFAbstract`: hardened front-matter abstract from
  `paper/soma/zoomable-somatic-field/zoomable-somatic-field.md`.
- `sourceResolver`: source-resolution constants and resolved metadata for the
  abstract source.

Run `npm run generate` in the operator app or `make operator-generate` from `U/`.
