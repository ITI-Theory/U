# Lulu Cover-Wrap Build

This directory renders one upload-ready Lulu cover PDF as a single spread:
back cover, spine, and front cover. It follows the structural model in the
HoTT Lulu hardcover renderer, but never guesses printer geometry.

## Required Lulu input

For each registry record with a `lulu` value, first upload the exact candidate
interior PDF to the matching Lulu project and download Lulu's custom cover
template. Transcribe its measurements into:

```text
config/<lulu identifier>.tex
```

The configuration defines the full canvas, the three panel centres, text-safe
widths, and safe Y coordinates. It is a source record of Lulu's exact product
template, not a calculated approximation. The template must correspond to the
candidate's SHA-256 and page count.

Lulu requires a single-page cover spread with full bleed, no guide marks,
embedded fonts, and its product-specific spine/hinge dimensions. The renderer
therefore emits no trim, bleed, or margin lines.

## Build

From `U/paper`:

```bash
make -C lulu-cover cover COVER=01-omnibus-v2
```

The output is written under `bld/lulu-covers/` at the repository root.

The same identifier covers the complete Lulu set:

- `01-omnibus-v2`
- `03-ttheory-vol1-foundation`
- `04-ttheory-vol2-application` only after it is reduced to the registered
  800-page limit
- `ttheory-book-*` for all 15 domain books

## Configuration contract

Each configuration must define, using dimensions accepted by TeX:

```tex
\def\CoverCanvasWidth{...}
\def\CoverCanvasHeight{...}
\def\CoverBackCenterX{...}
\def\CoverSpineCenterX{...}
\def\CoverFrontCenterX{...}
\def\CoverPanelCenterY{...}
\def\CoverBackTextWidth{...}
\def\CoverSpineTextWidth{...}
\def\CoverFrontTextWidth{...}
\def\CoverFrontTopY{...}
\def\CoverFrontAuthorY{...}
\def\CoverTitle{...}
\def\CoverSubtitle{...}
\def\CoverSpineText{...}
\def\CoverBackText{...}
\def\CoverAuthor{Alistair Johnson}
\def\CoverAffiliation{ORCID: 0009-0007-2194-0850\\Independent Researcher, Zurich}
```

Keep the downloaded Lulu template with its configuration for audit. The cover
is promotable only with the matching interior and template record.
