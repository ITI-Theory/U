# Current Work

## Purpose

Resume [T]-Theory work quickly. Read this file, then `SOURCES.md`,
`THEORY-STATUS.md`, and the brief for the active task.

## Active Task: the Philosophy Book

Brief: `PHILOSOPHY-BOOK-BRIEF.md`. The philosophy volume is the programme's
last book: a philosopher's retrospective treatment of [T]-Theory, organised
around Russell's history of philosophy as the history of philosophy's effects,
the time-invariant response grammar, the Soma Machine's time axis, and
Sherlock as modern philosophy of knowledge representation.

State on 2026-10-01:

- Both anchors, the Sherlock/Russell/origin chats, the Collected Works
  notebook, `uat/`, the Lean surface, and the Visual Operator have been read.
- Book direction agreed (see the brief). The chapter outline in
  `PHILOSOPHY-BOOK-OUTLINE.md` awaits author review.
- No book source has been written yet.

## Book Architecture

- Reader-facing book content is source-owned Markdown under
  `books/T-Theory/<domain>/`.
- Makefiles own the build graph; `lib/format/macros.lua` owns reusable Pandoc
  directives. Lua transforms source into presentation and is not a content
  store.
- A booklet is front matter with `book_id` plus the `{{Booklet...}}` macros.
  Its text comes from the matching record in `books/T-Theory/books.yaml` and
  the shared `books/T-Theory/booklet/booklet_body.md`.
- The Gateway is exceptional: its noir page precedes the local TOC
  (`books/T-Theory/format/gateway-template.tex`).
- PDF-only inserts use `{{AddPDF ...}}` or `{{AddBooklet ...}}`.

## Deferred Work (agreed, not started)

- Rewrite each of the fifteen generated books' shared introduction in its own
  book's style.
- Expand the books that are still slim.
- Prefix every book title with "[T]-Theory:".
- Complete *Phase Dot*, which should eventually hold most of the chats.
- Review new chats and notebooks for novelty before reading them in full.

## Known Issues

- The `book-philosophy` record in `books.yaml` labels its interpretive claims
  as kernel-verified. Fix it together with the book.
- `paper/soma/lean-proofs-appendix` and several book passages say "no
  sorries"; seven real `sorry`s remain (see `THEORY-STATUS.md`).
- Published papers change only through new Zenodo versions. Flag problems;
  do not edit published papers in place.

## Focused Checks

```bash
cd books/T-Theory && make -B bld/book-gateway.pdf bld/booklet-gateway.pdf
bin/issues-check
git diff --check
.venv/Scripts/python paper/scripts/paper_status.py
```

## Guardrails

- Run `git status -sb` before any commit.
- Do not present an interpretation, simulation, or planned experiment as a
  proved or empirical result.
- Do not commit generated candidate PDFs from ignored build directories.
- Do not modify legacy `gateway.md.OBSOLETE`.