# Operator Registry

This registry is the data source for the Soma Field Operator generator. It reconciles the existing app JavaScript tables, `operator-theory.yaml`, the Field Atlas scale plates, and `Dist/PAPERS.yaml` paper ids without adding new science.

## Layout

- `levels/<level-id>.yaml`: one substrate node with one chosen label, source labels, explanation registers, claim badges, paper ids, renderer id, and Atlas media.
- `paths/<path-id>/path.yaml`: a named graph over level ids.
- `paths/<path-id>/edges/<from>--<to>.md`: front matter for preserved structure, additions/retypings, kernel, render operation, claim badge, and prose.
- `models/<model-id>.yaml`: model-specific coordinates over level ids.
- `level-types.yaml`: each level's substrate as an OpenCyc class and Sherlock's verdicts on it
  (can it bear a feeling, is it a person), written by `sherlock/level_types.py --write`; the
  app's human controls and type line read it (ISS-063).
- `microtheories.yaml`: the context each document speaks in (ClinicalMt, ArtisticDesignMt,
  TheoryMt) and the disclaimer it must carry; read by `sherlock/clinical.py` (ISS-063).
- `eras.yaml`: ordered Big Bang-to-present time-axis records. Each era stores a machine time in seconds after the Big Bang, a display time, band, target registry level, summary, optional equation, optional app `theme`, app badge, and sources.
- `lenses.yaml`: baseline/T-Theory/display/affect lens catalogue.
- `catalogues/<id>.yaml`: external reference catalogues used as 4D baseline
  (`penrose-road-to-reality.yaml`, see `docs/agent/PENROSE-INDEX.md`;
  `spaceengine-objects.yaml`, a coverage checklist).
- `questions/<question-id>.yaml`: curated "What's Different?" tours with a visitor question, short answer, view settings, optional worked example, MOTHER prompt, next question, evidence label, and sources.

## Models: one zoom operator, several ladders

The Zoom Operator is one continuous operator; it asks only for a path from the quantum foam to the cosmos.
A model is one ladder of coordinates along that path, and every document, book or view that counts levels
counts them in one model, so it should name the model it counts in (ISS-130):

- `canonical-5` is the shortest ladder, a ladder of five bands (I to V, quantum to cosmic). The five bands
  hold twenty-eight levels and list thirty-one, because the three boundary levels (molecular, human, stellar)
  belong to two bands each.
- `universal-21` is the papers' ladder of scale levels: twenty-one coordinates, sigma 0 (the quantum foam) to
  sigma 20 (the cosmic web). The app's equation catalogue names twenty of them, 01 String to 20 Cosmic Web, with
  the foam at 0; "twenty" and "twenty-one" in the papers count these two ways.
- `bird-flock` is a named solution off the main ladders: bird, flock and colony.

The Field Atlas shows every level in the registry: the Atlas's 31 levels are 21 + 6 + 1 + 3, the universal
twenty-one, six drill-downs at the human scale (local circuit, dyad, human group, regional institution,
civilisation, species), one at the stellar scale (stellar cluster) and the three of the bird's solution. The
`paths/` are walks through them; `full-atlas` visits 27 of the 31.

So the app asks for the model first: the USF MODEL control comes before the ZOOM OPERATOR, and the zoom
then moves along the chosen model's ladder.

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
- `eras`: ordered time-axis records from `eras.yaml`.
- `lenses`: lens catalogue.
- `coverage`: validation counts and renderer coverage warnings.
- `zUSFAbstract`: hardened front-matter abstract from
  `paper/soma/zoomable-somatic-field/zoomable-somatic-field.md`.
- `sourceResolver`: source-resolution constants and resolved metadata for the
  abstract source.
- `examples`: worked examples from `registry/examples/`.
- `questions`: curated "What's Different?" tours from `registry/questions/`.

Run `npm run generate` in the operator app or `make operator-generate` from `U/`.

## What's Different? tours

Question records drive the app question drawer, deep links (`#q=<id>`), and the Field Atlas "What's Different?" section. The `badge` field uses the six evidence labels from `docs/agent/THEORY-STATUS.md` (`kernel-verified`, `derived-under-assumptions`, `simulated`, `empirical-result`, `interpretive`, `open-hypothesis`). `view` may set `compare`, `contours`, and `lens`; `mother_prompt` pre-fills MOTHER but never auto-sends.

## Time axis

`eras.yaml` drives the app `#era=<id>` deep links and the Field Atlas Time Axis section. Cosmic, geological, palaeontology, human, and philosophy bands use ordinary sourced science first; Appendix C philosophy rows remain `INTERPRETIVE` unless they cite a sourced scientific or formal tool directly.

The optional `theme` field is validated by the operator generator. Allowed values are `cosmic`, `earth`, `egypt`, `babylon`, `greece`, `islamic-golden-age`, `medieval`, `renaissance`, `enlightenment`, `modern`, `present`, `expressionism`, `constructivism`, `bauhaus`, `color-field`, `pop-art`, and `street-art`. Themes are visual styling hints only; historical mathematics and art-history facts still need sourced records in `paper/bibliography.bib`.
