# Omnibus Document Model

Status: draft for ISS-021 review. This defines the reader-facing model before any move from merged Markdown to a modular renderer.

## Shared Principles

- `Dist/PAPERS.yaml` owns collection identity, ordered membership, roles, and insertion rules.
- A collection has one cover, one master TOC, continuous pagination, and one bibliography policy.
- Member documents remain independently buildable in their own directories.
- The omnibus does not repeat standalone covers, local TOCs, or local page-number sequences.
- A member boundary is explicit and readable; document internals must not silently alter unrelated members.
- Pandoc Lua is the default layer for registry hooks and structural transforms. Python may orchestrate files but must not substitute registry macros in prose.

## Member Roles

| Role | Reader treatment | C1v2 example | C2 example |
|---|---|---|---|
| `foreword` | Opening synthesis; chapter in master TOC | `soma-field-synthesis` | optional programme preface |
| `paper` | Named divider, one master chapter, internal headings subordinate | P1, P2, P9 | source paper excerpt if used |
| `book` | Part opening; internal chapters promoted below the part | `soma-field-book`, `the-tensor` | each domain book |
| `appendix` | Appendix part; internal headings subordinate | temporal dynamics, Lean appendix | technical appendix if added |
| `insert` | Registered non-prose material at a declared placement | none currently | four-page cheatsheet, Gateway noir page |

## C1v2 Target

- `soma-field-synthesis` is a `foreword` and establishes the programme.
- `soma-field-book` is `book` under Part I: its internal chapters should read as a book, not as a short paper flattened under one chapter.
- `the-tensor` is a `book`/interlude under its own part opening.
- Formal, clinical, application, and universal-theory members are `paper` roles.
- Temporal dynamics and Lean proofs are `appendix` roles.
- Abstracts are concise member summaries immediately after the divider, not standalone pages.
- The master TOC shows Parts, member titles, and book-internal chapters; it does not show every paper subsection.

## C2 Target

- Each of the fifteen domain books is a `book` role with a part opening.
- The default domain pattern is: part opening, registered four-page cheatsheet insert, book TOC, book body.
- Gateway is an explicit exception: noir insert near the opening; its cheatsheet is the closing handout.
- Volumes I/II are filtered views of the same C2 member model, not independent hierarchy logic.
- The C2 master TOC lists domain book titles. Each book’s internal TOC remains local to that book.

## Registry Shape To Decide

```yaml
members:
  - slug: soma-field-book
    role: book
    opening: part
    toc: promote-chapters
    summary: inline
  - slug: music-affect-dynamics
    role: paper
    opening: divider
    toc: chapter-only
    summary: inline
  - slug: ttheory-book-physics
    role: book
    opening: part
    inserts:
      - kind: cheatsheet
        placement: after-opening
    toc: local
```

## Acceptance Tests

1. A local change to one member preserves other member boundaries, master TOC entries, and pagination semantics.
2. C1v2 book roles visibly retain book-level hierarchy; paper roles remain atomic.
3. C2 cheatsheets/noir pages appear only where registered.
4. Master and local TOCs are intentional and non-duplicated.
5. Registry order is the sole member inventory; renderers contain no parallel lists.
6. Individual documents still compile without requiring a full omnibus build.

## Decision Questions

1. Should the C1v2 master TOC expose book-internal chapter titles, or only book titles?
2. Should a paper summary use source abstract text verbatim or a separate registry summary field?
3. Are P6 and P8 both `book` roles, or is `the-tensor` an interlude with different rules?
4. Does C2 use true locally numbered book chapters in the master, or preserve each book’s local numbering?
