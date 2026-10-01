# Operator Registry

This registry is the data source for the Soma Field Operator generator. It reconciles the existing app JavaScript tables, `operator-theory.yaml`, the Wave Atlas scale plates, and `Dist/PAPERS.yaml` paper ids without adding new science.

## Layout

- `levels/<level-id>.yaml`: one substrate node with one chosen label, source labels, explanation registers, claim badges, paper ids, renderer id, and Atlas media.
- `paths/<path-id>/path.yaml`: a named graph over level ids.
- `paths/<path-id>/edges/<from>--<to>.md`: front matter for preserved structure, additions/retypings, kernel, render operation, claim badge, and prose.
- `models/<model-id>.yaml`: model-specific coordinates over level ids.
- `lenses.yaml`: baseline/T-Theory/display/affect lens catalogue.

## Generated module shape

`apps/instrument/visuals/soma-field-operator/generated/app-data.js` exports:

- `levels`: array of level records.
- `paths`: array of path records with parsed `edge_records`.
- `models`: array of model records; coordinates are model-local.
- `lenses`: lens catalogue.
- `coverage`: validation counts and renderer coverage warnings.

Run `npm run generate` in the operator app or `make operator-generate` from `U/`.
