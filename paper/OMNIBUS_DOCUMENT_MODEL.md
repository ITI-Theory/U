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
- The master TOC shows every member title and its immediate internal chapters;
  this two-level view must make book boundaries and book purpose obvious without
  expanding into every lower subsection.

## C2 Target

- Each of the fifteen domain books is a `book` role with a part opening.
- The default domain pattern is: part opening, registered four-page cheatsheet insert, book TOC, book body.
- Gateway is an explicit exception: noir insert near the opening; its cheatsheet is the closing handout.
- Volumes I/II are filtered views of the same C2 member model, not independent hierarchy logic.
- The C2 master TOC lists every domain-book title and its immediate internal
  chapters. Each book retains a local TOC for deeper navigation.

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

1. **Decided:** expose a two-level master TOC everywhere: member title plus
  immediate internal chapter titles. Typography must distinguish book chapters
  from ordinary member entries.
2. **Decided:** preserve source abstract text verbatim whenever an omnibus
  summary is rendered; do not create editorial replacement summaries.
3. **Decided:** P6 is a `book`; P8 is an `interlude` book role with the same
  two-level TOC treatment but its own part-opening typography.
4. **Decided:** C2 preserves book-local chapter numbering while the master TOC
  shows the book title and immediate chapter names as visually subordinate entries.
