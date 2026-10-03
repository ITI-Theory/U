# [T]-Theory Fractal Thesis build

This book set follows the repository build standard: Make orchestrates, pandoc converts from Markdown, defaults files hold pandoc options, and Lua filters perform document assembly/layout.

## Build targets

Run from the repository root:

```sh
make -C books/T-Theory all
make -C books/T-Theory vol1
make -C books/T-Theory vol1-10pt
make -C books/T-Theory vol2
make -C books/T-Theory fractal-thesis
make -C books/T-Theory html
```

Outputs are written to `bld/books/` at the repository root.

## Primary outputs

- `book-gateway.pdf`
- `book-physics.pdf`
- `book-complex-systems.pdf`
- `book-formal-mathematics.pdf`
- `book-neuroscience.pdf`
- `book-consciousness.pdf`
- `book-computer-science.pdf`
- `book-music-arts.pdf`
- `book-clinical-psychology.pdf`
- `book-psychiatry-asd.pdf`
- `book-social-science.pdf`
- `book-geophysics.pdf`
- `book-law.pdf`
- `book-ppe.pdf`
- `book-economics.pdf`
- `ttheory-vol1.pdf`
- `ttheory-vol1-10pt.pdf`
- `ttheory-vol2.pdf`
- `ttheory-omnibus.pdf`
- `booklet-<domain>.pdf` and split `booklet-<domain>-1.pdf` … `booklet-<domain>-4.pdf`
- HTML samples: `book-gateway.html`, `book-physics.html`, `booklet-gateway.html`

## Build files

- `defaults/*.yaml` contains pandoc defaults and the `fractal-manifest.yaml` assembly metadata.
- `filters/ttheory-direct.lua` rewrites legacy booklet insert paths to root `bld/books/` outputs.
- `filters/ttheory-assemble.lua` assembles Vol I, Vol II, and the omnibus directly inside pandoc, including local book TOCs, print inserts, the gateway noir page, and per-volume paper de-duplication.

No Python script is used to generate Markdown, LaTeX, or HTML for these books.
