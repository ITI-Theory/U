# Build Standard

Every document in this repository (papers, books, the Field Atlas, the
textbook edition) is built the same way:

**Make orchestrates. Pandoc converts. Lua filters lay out.**

## Rules

1. **Make is the only entry point.** Each project has a `Makefile` with the
   standard targets below; the root `Makefile` delegates to them. A build is
   reproducible from a clean clone with `make <target>`.
2. **Pandoc options live in defaults files**, not on the command line:
   `<project>/defaults/<output>.yaml` (for example `a3.yaml`, `html.yaml`).
   Shared settings live in `lib/defaults/` and are pulled in with
   `defaults:` inheritance. Values that contain non-ASCII text (titles,
   dashes) go in defaults or metadata files, never in Make variables passed
   as arguments (Windows `make` mangles UTF-8 arguments).
3. **Layout is done by Lua filters**, working on pandoc's document tree:
   columns, full-page plates, callout keys, boxes (learning objectives,
   examples), figure placement, cross-references, registry includes. A
   filter emits format-specific markup only behind a format check
   (`FORMAT:match 'latex'`, `FORMAT:match 'html'`), so every source builds
   to PDF **and** HTML. Shared filters live in `lib/format/`; project-only
   filters live in `<project>/filters/`. A filter never flattens document
   text into a raw string (`pandoc.utils.stringify` + hand escaping): text
   such as captions stays pandoc inlines between raw opening and closing
   markup, so pandoc's writers do the escaping, sub/superscripts and maths.
4. **Sources are plain Pandoc Markdown.** Structure is expressed with fenced
   divs and attributes (`::: {.example}`, `![...](...){.plate}`), never with
   raw LaTeX or HTML in the source. Raw LaTeX belongs in templates and in
   format-guarded filter output only.
5. **No build scripts that write markup.** Python (or any other language)
   must not generate Markdown, LaTeX or HTML for a document build. Allowed
   uses of Python: validators (`check_*.py`), figure generation (matplotlib
   images), data preparation for the Soma Machine app, and release tooling
   that copies or hashes finished files. Registry data reaches documents
   through pandoc (`--metadata-file`, or a Lua filter reading YAML via
   `pandoc.read`).
6. **All output goes to `bld/` at the repository root**, mirroring the
   source layout (`bld/papers/`, `bld/books/`, `bld/atlas/`,
   `bld/textbook/`). `bld/` is ignored by git; nothing under it is ever
   committed. `make clean` removes a project's subtree.
7. **Line endings are LF** everywhere (`.gitattributes`: `* text=auto
   eol=lf`); pandoc is run with `--eol=lf`.
8. **No machine-specific paths or fonts** in tracked files: no user names,
   drive letters, personal tool locations or OS-only fonts (use fonts that
   ship with TeX Live/MiKTeX). Tools are found on `PATH`; overrides go in an
   ignored `local.mk` (`-include local.mk`).
9. **Recipes are POSIX sh.** `lib/mk/paths.mk` makes `make` use Git for
   Windows' `sh` on Windows, so a recipe behaves the same from PowerShell,
   cmd, Git Bash, Linux and macOS. No `cmd.exe` built-ins (`if exist`,
   `xcopy`, `findstr`). Checks that test for absence use
   `if grep ...; then exit 1; fi`, not `! grep`.
10. **Secrets never enter the repository** (ignored `*.local*` files and
   environment variables only).

## Standard targets (every project Makefile)

| Target | Builds |
|---|---|
| `all` | the project's default outputs |
| `pdf` / `a3` / `a4` | print editions the project supports |
| `html` | the HTML edition (required: proves the source is portable) |
| `check` | validators (prose checks, link checks, float loss = 0) |
| `clean` | removes the project's `bld/` subtree |
| `help` | lists targets |

## Layout

```
lib/defaults/      shared pandoc defaults (fonts, engine, citeproc)
lib/format/        shared Lua filters and LaTeX/HTML templates
lib/mk/            shared Make fragments (paths, tools, registry rules)
<project>/defaults/  project defaults files per output
<project>/filters/   project-only Lua filters
bld/               all outputs (ignored)
```
