# [T]-Theory: Field Atlas

*The Wave That Is Always There*

A reference atlas of the programme's level ladder: one spread per level, in
five sectors from quantum foam to the observable universe, plus the bird
side-path. It shares its data with the Soma Machine app: the same registry
drives both, and every plate is an app screenshot.

## Sources

| Part | Where |
| --- | --- |
| Order (sectors, levels, front and back matter) | `atlas.yaml` |
| Level data panel (scale, response time, substrate, field, equation, badges) | `registry/levels/<id>.yaml` |
| Level text (ordinary science, [T]-Theory reading, picture briefs) | `registry/levels/<id>.md` |
| Transitions between levels | `registry/paths/*/edges/*.md` |
| Worked examples (4D / 8D / 11D) | `registry/examples/*.yaml` |
| Sector introductions | `sectors/` |
| Front and back matter | `front/`, `back/` |
| Plates (lens off / lens on) | `figures/app/plates/` (generated, gitignored) |
| Other figures | `figures/` (`build_figures.py`; `*placeholder*` files are not real figures) |

## Build

```bash
# 1. capture the app plates (from apps/instrument/visuals/soma-field-operator)
npm run capture
# 2. assemble and build (from this folder)
python build_atlas.py            # bld/field-atlas.md and bld/field-atlas.pdf
python build_atlas.py --md-only
# A3 landscape picture atlas (printfactory.ch): full-bleed console per level,
# text page in three columns, compare view. Needs the print set first:
#   node scripts/capture.mjs --only print --width 1920 --height 1200 --scale 2.585
#   (apps/instrument/visuals/soma-field-operator): the app exactly as a full-screen
#   16:10 display shows it, 4963 px wide. Then JPEGs (q92) in figures/app/print.
python build_atlas.py --a3          # bld/field-atlas-a3.pdf
```

Royal format (156 x 234 mm), xelatex, citations from `paper/bibliography.bib`.

## Rules

- An atlas is a reference work: third person, no personal material, no
  reader exercises.
- Ordinary, sourced science first (lens off); the [T]-Theory reading second,
  every claim labelled with an evidence label from
  `docs/agent/THEORY-STATUS.md`.
- No repository paths in reader-facing text.

The earlier first-person draft ("The Wave That Is Always There: A Fractal
Atlas from the Universe to the Soma") was retired on 2026-10-01 and remains in
git history.
