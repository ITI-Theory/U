# Current Work

## Purpose

Use this packet to resume [T]-Theory work without a broad repository scan.
Read `SOURCES.md` before proposing or making changes.

## Last Checkpoint

- Gateway rendering migration: `3eb5af9 Refactor Gateway book rendering`.
- Issue metadata and LF text policy: `6b949f1 Document issue metadata and normalize text endings`.
- Before any commit, run `git status -sb`; do not infer the worktree state from an editor file counter.

## Accepted Book Architecture

- Reader-facing book content belongs in source-owned Markdown under `books/T-Theory/<domain>/`.
- Makefiles own the build graph.
- `lib/format/macros.lua` owns reusable Pandoc directives.
- Lua transforms semantic source into output-specific presentation; it must not become a second content store.
- The Gateway is exceptional: its noir page precedes the local TOC, implemented by `books/T-Theory/format/gateway-template.tex`.
- PDF-only artifacts such as fixed-layout booklet inserts use `{{AddPDF ...}}` or `{{AddBooklet ...}}`; HTML does not emulate those inserts.

## Current Priorities

1. Produce a read-only philosophy/Atlas/app integration proposal from the curated source list.
2. Decide the first shared registry between the app, Atlas, and philosophy book.
3. Build release candidates only after source and print contracts are stable; Zenodo and Lulu remain the delivery goals.

## Focused Checks

```bash
cd books/T-Theory && make -B bld/book-gateway.pdf bld/booklet-gateway.pdf
bin/issues-check
git diff --check
.venv/Scripts/python paper/scripts/paper_status.py
```

## Guardrails

- Do not search the repository beyond `SOURCES.md` unless given explicit approval.
- Do not present an interpretation, simulation, or planned experiment as a proved or empirical result.
- Do not commit generated candidate PDFs from ignored build directories.
- Do not modify legacy `gateway.md.OBSOLETE`.
