# Omnibus Format Standard

This is the source of truth for physical-format behavior in the Papers
Omnibus and the [T]-Theory Omnibus. Build scripts implement this contract;
format checks enforce the parts that can be verified automatically.

## Shared Rules

- The title page is physical page 1.
- A blank inside-cover is physical page 2.
- For an individual paper, the abstract begins recto on physical page 3.
- A blank abstract verso is physical page 4; the table of contents begins
  recto on physical page 5 and begins its own printed folio sequence at 1.
- Deliberately inserted blank pages contain no text and occur only on even
  physical pages.
- The master table of contents begins on physical page 3.
- Master contents lists only major containers, not every internal heading.
- Every contained work begins recto (an odd physical page).
- A contained work begins with a divider page that names the work clearly.
- Major appendices begin recto and have a prose-to-proof separation page.
- The omnibus carries one continuous pagination and one master table of
  contents; it does not reproduce individual-paper front matter or local TOCs.
- Mathematical Unicode in prose and code listings is rendered through TeX math;
  the monospaced code font must not be relied on for mathematical glyphs.

## Papers Omnibus Profile

- `omnibus-a4.pdf` and `omnibus-royal.pdf` are a single merged manuscript.
- C1v2 in `Dist/PAPERS.yaml` owns its title, front matter, ordered members, and
  part openings; the build script contains no duplicate collection inventory.
- The master contents lists the merged hierarchy once; included paper-local
  covers, abstracts, TOCs, pagination, and reference sections are not repeated.
- Each canonical paper gets a named recto divider before its merged body.
- The Lean proof appendix is merged as the final registered appendix.

## Individual Paper Profile

- A title/cover page with the [T] sticker is followed by an explicit blank
  inside-cover page.
- The abstract occupies the following recto page without contents material.
- A blank verso follows the abstract; the table of contents begins recto.
- The table of contents begins at printed page 1, independently of the cover
  and preliminary physical leaves.
- After the table of contents, the first numbered section begins recto.
- This rule applies to every individual paper rendered through `journal.tex`.

## [T]-Theory Omnibus Profile

- The Fractal Thesis and Volumes I/II use master TOC depth 1.
- Each contained domain book gets a named recto part-opening page.
- Each domain book includes its own four-page cheatsheet immediately after
  the opening page.
- The Gateway is the only book with a noir page and may place its cheatsheet
  at the end as a retrospective map.
- Domain-book details stay in their individual book TOCs; they do not expand
  the master volume TOC.

## Verification

Run the relevant format check after an omnibus build:

```bash
cd U/paper
make check-omnibus-format
make check-individual-format PAPER=soma-field-synthesis
make check-glyph-warnings
```

The checker verifies source-level break and divider contracts plus the first
three physical pages and recto paper-divider parity. The [T]-Theory profile is
specified here and will receive its checker when that build is revised. Visual
review remains required for typography, images, and binding quality.

`check-glyph-warnings` also rejects unresolved-reference diagnostics. Pandoc
may echo latexmk's intermediate "Label(s) may have changed" line even after
latexmk settles the final PDF; it is not an unresolved-reference failure.
