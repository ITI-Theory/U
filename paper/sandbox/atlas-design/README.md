# Wave Atlas — Coffee-Table Layout Sandbox

**Isolated from the main build.** Nothing here is wired into `paper/Makefile`.
Iterate freely; when a design is locked, promote it into a real template.

## Goal

Make Wave Atlas read like *Wallpaper\* / Phaidon / Taschen XL* — not a LaTeX
thesis. See PRINT-SPEC.md §5 (coffee-table notes). Phase Dot and Collected
Works keep their current monastic / classical typesetting respectively; only
the Atlas changes.

## What's in here

| File | Purpose |
|---|---|
| `Makefile`               | Local make — `make A`, `make B`, `make C`, `make all` |
| `tt-atlas-A.tex`         | Layout A: `tufte-book` baseline (margin notes + side figs out of the box) |
| `tt-atlas-B.tex`         | Layout B: KOMA `scrbook` with manual asymmetric grid + `sidenotes` package |
| `tt-atlas-C.tex`         | Layout C: full-bleed spread openers + ranged-left body + margin pull-quotes |
| `sample.md`              | Same short source used for all three so we compare like-for-like |
| `bld/`                   | Output PDFs |

## Workflow

```bash
cd paper/sandbox/atlas-design
make all          # builds A, B, C
make A B C        # individual
make clean
```

Open `bld/atlas-A.pdf`, `bld/atlas-B.pdf`, `bld/atlas-C.pdf` side-by-side.
Pick a winner. Iterate inside that one until it's right. Then we promote it
to `paper/templates/tt-atlas.tex` and wire it into the real Makefile.

## What NOT to do here

- Don't touch the real `paper/Makefile`.
- Don't touch translation caches.
- Don't translate sample.md (English only, prototyping).
- Don't add fonts that aren't in MiKTeX by default unless we plan to install
  them everywhere (IBM Plex Serif IS in MiKTeX as `plex-serif`).
