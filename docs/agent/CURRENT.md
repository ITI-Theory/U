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
- First full draft written: `books/T-Theory/philosophy/book-philosophy.md`
  (Prologue, 19 chapters, Appendices A-D; about 88,000 words), plus
  `booklet-philosophy.md` and a rewritten `book-philosophy` record in
  `books.yaml`. Drafted in parallel, then fact-checked and label-checked;
  the source file is now the single authority for the text.
- The generic `book-%`/`booklet-%` rules build it
  (`make bld/booklet-philosophy.pdf bld/book-philosophy.pdf`, about 270
  pages). The Makefile `DOMAINS` list still names this domain
  `consciousness`; aggregate targets do not include it yet.
- 63 new references were added to `paper/bibliography.bib` (normalised to
  LF); `russell1910` now lists Whitehead first.
- Awaiting author review of voice, label density, and the subtitle.

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

In the author's order after the philosophy book:

1. Papers: decide whether the path-integral extension (`ISS-035`) changes any
   paper; published papers change only through new Zenodo versions.
2. Books: rewrite each generated book's shared introduction in its own style;
   expand the books that are still slim; prefix every title with
   "[T]-Theory:".
3. Visual app (Soma Machine / Soma Field Operator): bring it up to date with
   the papers, books, and the philosophy book's time axis (Appendix C).
4. Wave Atlas: use app screenshots at all twenty levels, plus the extra
   systems at each level (for example belief systems).
5. *Phase Dot*: complete it; it should eventually hold most of the chats.

## Known Issues

- `paper/soma/lean-proofs-appendix` and several generated book passages say
  "no sorries"; seven real `sorry`s remain (see `THEORY-STATUS.md`).
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