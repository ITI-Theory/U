# NotebookLM UAT: ttheory rc3.2 (20261014-0020)

Version rc3.2 (U 8ddc7d5-dirty); compared with rc3.1. Notebook `f9c01519-a563-4644-be82-f02d5fe891f8` (private). Worksheet `ttheory-nlm-uat.rc3.2.md`.
Automated run (`uat/scripts/nlm_uat.py`); review before transferring findings to the worksheet.

| Item | Title | Status | Cited sources |
|---|---|---|---|
| TS-1 | Master TOC hierarchy | FIX | BUILD_CONTEXT.rc3.2.md, OMNIBUS_DOCUMENT_MODEL.rc3.2.md, ttheory-nlm-uat.rc3.2.md, ttheory-omnibus.rc3.2.pdf, ttheory-vol1.rc3.2.pdf, ttheory-vol2.rc3.2.pdf, ttheory-vol3.rc3.2.pdf |
| TS-2 | Registered insertions | ERROR | - |
| TS-3 | Boundary clarity | FIX | - |
| TH-1 | Shared C1v2/C2 model | FIX | - |
| TH-2 | Book-of-books integration | ERROR | - |
| TC-1 | Entry points | ERROR | - |
| TC-2 | The Chocolate Biscuit Monster: the dunk test | ERROR | - |
| TC-3 | The Root Monster: the roots under every tower | ERROR | - |
| TC-4 | The BOFH Monster: tries to make it overclaim | ERROR | - |
| CMP | rc3.2 against rc3.1 | ERROR | - |

Totals: FIX 3, ERROR 7

## TS-1 Master TOC hierarchy (FIX)

**Question:** Does each master TOC expose every domain book and its immediate internal chapters, while avoiding a many-page subsection inventory?

**ITEM:** TS-1 [1]

**STATUS:** FIX [2]

**FINDING:** While the master Table of Contents across the rc3.2 master volumes exposes the domain books and internal headings beneath them, it fails the requirement to avoid a many-page subsection inventory [3]. In `ttheory-omnibus.rc3.2.pdf`, setting global `--toc-depth=2` without scoping lower headings causes the master TOC to sprawl across 25 physical pages (pages 3–27), dumping exhaustive subordinate sections and internal paper sub-headings from all fifteen domain books into the front matter [4-7]. The partition volumes exhibit the exact same defect: `ttheory-vol1.rc3.2.pdf` contains an 11-page master TOC (pages 3–13) [8-10], `ttheory-vol2.rc3.2.pdf` spans 8 pages (pages 3–10) [11-13], and `ttheory-vol3.rc3.2.pdf` spans 10 pages (pages 3–12) [14-16]. This directly violates the physical-format standard in `BUILD_CONTEXT.rc3.2.md` and `OMNIBUS_DOCUMENT_MODEL.rc3.2.md`, which mandates that master contents list only domain-book titles plus immediate chapter titles while keeping lower-level domain and paper details in local book TOCs [3, 17, 18].

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, pages 3–27 [4-7]
- `ttheory-vol1.rc3.2.pdf`, pages 3–13 [8-10]
- `ttheory-vol2.rc3.2.pdf`, pages 3–10 [11-13]
- `ttheory-vol3.rc3.2.pdf`, pages 3–12 [14-16]

---

🔍 Would you like to proceed with evaluating **TS-2 (Registered insertions)** across the rc3.2 PDFs to verify the cheatsheet and Gateway noir placements?

## TS-2 Registered insertions (ERROR)

**Question:** For each sampled domain book, verify that the four-page cheatsheet occurs at the registered placement. Verify the Gateway noir/closing-cheatsheet exception.

RPCResponseTooLargeError: RPC response exceeded 268435456 bytes (read 268444477 bytes before aborting)

## TS-3 Boundary clarity (FIX)

**Question:** Can a reader distinguish a domain-book boundary, a book chapter, a cheatsheet insert, and the master volume boundary from typography and TOC alone?

**ITEM:** TS-3

**STATUS:** FIX

**FINDING:**
1. **Typography Distinguishability (PASS):** In physical body pages, a reader can distinguish all four boundary levels through typography:
   - **Domain-Book Boundaries:** Clearly demarcated by dedicated, centered recto `\part` title pages in bold navy text, featuring the Green-ID, target reader, 61-decades scale diagram, and HUD field scan.
   - **Book Chapters:** Clearly demarcated by Level-1 `\chapter` headings styled with large colored typography and a horizontal rule accent (`\color{rulecolor}\hrule height 0.6pt`), along with dynamic running headers on even/odd pages.
   - **Cheatsheet Inserts:** Instantly recognisable by their distinctive 4-page parchment/tan background tint (`#F5EEDB`), two-column mathematical/type-theoretic tables, HUD boxes, and Sherlock/Moriarty audit panels.
   - **Master Volume Boundaries:** Clearly distinguished between standalone partition volumes (`ttheory-vol1.rc3.2.pdf`, `ttheory-vol2.rc3.2.pdf`, `ttheory-vol3.rc3.2.pdf`) by unique title pages with [T] QR stickers, distinct volume subtitles, independent front matter, and separate continuous pagination sequences.
2. **TOC Alone Distinguishability (FAIL / FIX):** A reader **cannot** navigate or distinguish these elements from the Table of Contents alone:
   - **Cheatsheet Inserts Omitted from TOC:** The 4-page cheatsheet inserts for Books 2 through 15 are **completely omitted** from both the Master TOC and Local TOCs across all master volumes. The only cheatsheet appearing in any TOC is Book 1 Gateway's closing cheatsheet. A reader consulting the TOC alone has no indication that 4-page reference cheatsheets exist at the openings of Physics, Neuroscience, Mathematics, Philosophy, etc., or what pages they occupy.
   - **Master TOC Sprawl Blurs Chapter Hierarchy:** Because global `--toc-depth=2` was enabled without restricting lower-level section scoping, the Master TOC runs for 8 to 25 physical pages across volumes, interleaving domain-book titles with hundreds of internal paper subheadings.
   - **Omnibus Lacks Volume Partitions:** Within `ttheory-omnibus.rc3.2.pdf`, the 15 domain books run as an unpartitioned sequence of parts without volume-level demarcations in either the Master TOC or body typography.

**EVIDENCE:**
- **Cheatsheet Absence in Master & Local TOCs:**
  - `ttheory-omnibus.rc3.2.pdf`:
    - Master TOC (pages 3–27): Page 3 lists Book 2 Physics at page 283 then jumps directly to *The Green Propagator* at page 293 (cheatsheet on pages 284–287 is omitted); page 12 lists Book 6 Mathematics at page 727 then jumps to page 734 (cheatsheet on pages 728–731 is omitted); page 13 lists Book 7 Philosophy at page 781 then jumps to page 792 (cheatsheet on pages 782–785 is omitted). Only Gateway's closing cheatsheet appears (page 278, listed on TOC page 6).
    - Local TOCs: Physics local TOC (pages 288–292) starts at page 293 (omitting cheatsheet pages 284–287); Mathematics local TOC (pages 732–733) starts at page 734 (omitting pages 728–731); Philosophy local TOC (pages 786–791) starts at page 792 (omitting pages 782–785).
  - `ttheory-vol1.rc3.2.pdf`: Master TOC (pages 3–13) jumps from Physics at page 232 to page 242 (omitting cheatsheet pages 233–236) and Mathematics at page 367 to page 375 (omitting cheatsheet pages 368–371).
  - `ttheory-vol2.rc3.2.pdf`: Master TOC (pages 3–10) jumps from Neuroscience at page 11 to page 21 (omitting cheatsheet pages 12–15) and Philosophy at page 145 to page 155 (omitting cheatsheet pages 146–149).
  - `ttheory-vol3.rc3.2.pdf`: Master TOC (pages 3–12) jumps from Music & Arts at page 13 to page 23 (omitting cheatsheet pages 14–17) and Society at page 187 to page 196 (omitting cheatsheet pages 188–191).
- **Body Typographical Demarcation (Part Openers & Cheatsheet Styling):**
  - `ttheory-omnibus.rc3.2.pdf`: Book 1 Gateway part opening page 31, noir insert page 32, closing cheatsheet pages 279–282; Book 2 Physics part opening page 283, cheatsheet pages 284–287, chapter opening page 293; Book 6 Mathematics part opening page 727, cheatsheet pages 728–731; Book 7 Philosophy part opening page 781, cheatsheet pages 782–785.
  - `ttheory-vol1.rc3.2.pdf`: Title page 1; Book 2 Physics part opening page 232, cheatsheet pages 233–236, chapter opening page 242.
  - `ttheory-vol2.rc3.2.pdf`: Title page 1; Book 1 Neuroscience part opening page 11, cheatsheet pages 12–15, chapter opening page 21; Book 2 Philosophy part opening page 145, cheatsheet pages 146–149.
  - `ttheory-vol3.rc3.2.pdf`: Title page 1; Book 1 Music & Arts part opening page 13, cheatsheet pages 14–17, chapter opening page 23; Book 2 Society part opening page 187, cheatsheet pages 188–191.

---

🔍 **Next Step:** Would you like to proceed with evaluating **TH-1 (Shared C1v2/C2 model)** from the Model Consistency section using the rc3.2 sources?

## TH-1 Shared C1v2/C2 model (FIX)

**Question:** Compare the Papers omnibus and Fractal Thesis. Do both implement the approved two-level master TOC model: member title plus immediate internal chapter titles?

**ITEM:** TH-1

**STATUS:** FIX

**FINDING:** Neither the Fractal Thesis nor the Papers omnibus implements the approved two-level master TOC model (member/book title plus immediate internal chapter titles without a many-page subsection inventory) mandated by `OMNIBUS_DOCUMENT_MODEL.rc3.2.md` and `BUILD_CONTEXT.rc3.2.md`:

1. **Fractal Thesis (C2 Track):** In `ttheory-omnibus.rc3.2.pdf`, applying global `--toc-depth=2` without scoping subordinate headings causes the master Table of Contents to sprawl across 25 physical pages (pages 3–27). Instead of exposing only domain-book titles and their immediate chapter titles, it dumps hundreds of lower-level sections and paper sub-headings from all fifteen domain books into the front matter. The partition volumes exhibit the exact same defect: `ttheory-vol1.rc3.2.pdf` spans 11 pages (pages 3–13), `ttheory-vol2.rc3.2.pdf` spans 8 pages (pages 3–10), and `ttheory-vol3.rc3.2.pdf` spans 10 pages (pages 3–12).
2. **Papers Omnibus (C1v2 Track):** As specified in `BUILD_CONTEXT.rc3.2.md` (`paper/filters/omnibus.lua` and `paper/defaults/omnibus.yaml`), the build pipeline applies a uniform `shift_headers` across all members. It flattens `soma-field-book` and `the-tensor` under identical title headers rather than implementing the promoted book-role hierarchy required by the C1v2 target in `OMNIBUS_DOCUMENT_MODEL.rc3.2.md`. Furthermore, `omnibus-a4.rc3.2.pdf` was not included in this candidate's staged manifest (`MANIFEST.rc3.2.md`; staged under `uat/staging/papers/` per `dev-handover.rc3.2.md`), precluding physical PDF page re-verification for the compiled Papers omnibus in this staging package.

**EVIDENCE:**
- `ttheory-omnibus.rc3.2.pdf`, pages 3–27
- `ttheory-vol1.rc3.2.pdf`, pages 3–13
- `ttheory-vol2.rc3.2.pdf`, pages 3–10
- `ttheory-vol3.rc3.2.pdf`, pages 3–12
- `OMNIBUS_DOCUMENT_MODEL.rc3.2.md`, Section "Decision Questions" (Decisions 1 & 4), "C1v2 Target", and "C2 Target"
- `BUILD_CONTEXT.rc3.2.md`, Section `paper/FORMAT.md` ("Shared Rules", "[T]-Theory Omnibus Profile", and "Papers Omnibus Profile"), `paper/defaults/omnibus.yaml`, and `paper/filters/omnibus.lua`
- `MANIFEST.rc3.2.md`, Section "UAT Staging: ttheory" (confirming `omnibus-a4.rc3.2.pdf` is not part of this staging package)

---

🔍 Would you like to proceed with evaluating **TH-2 (Book-of-books integration)** from the Model Consistency section across the rc3.2 sources?

## TH-2 Book-of-books integration (ERROR)

**Question:** Does C2 read as fifteen coherent domain books within one programme rather than an undifferentiated long manuscript?

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.

## TC-1 Entry points (ERROR)

**Question:** For a reader opening a random volume page, do heading hierarchy, local TOC, and cheatsheet make the current book and its purpose obvious?

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.

## TC-2 The Chocolate Biscuit Monster: the dunk test (ERROR)

**Question:** For each volume, can its purpose be told in at most 120 words of plain English from its opening pages alone? Give the summary and the page used.

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.

## TC-3 The Root Monster: the roots under every tower (ERROR)

**Question:** Where a volume says a result is proved, does it name the Lean theorem and say whether it rests on an axiom, a sorry or only proves a placeholder? List the volumes that do and do not, with pages.

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.

## TC-4 The BOFH Monster: tries to make it overclaim (ERROR)

**Question:** Find the three sentences that, quoted alone, would most overclaim (a cure, a proof of consciousness, a quantum result about people, a clinical effect). For each, does the sentence itself, or its paragraph, carry the evidence label or hedge that stops the overclaim? Then answer as the volumes would: "So this cures trauma?", "You proved consciousness in Lean?", "The quantum computer found awe?" Cite the pages used.

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.

## CMP rc3.2 against rc3.1 (ERROR)

**Question:** Two versions of this release candidate are loaded; every source title ends with its version: rc3.1 (previous) and rc3.2 (new). Using the questions in ttheory-nlm-uat.rc3.2.md, is rc3.2 BETTER, the SAME or WORSE than rc3.1? For each worksheet area, give the concrete differences, citing the exact filename (with version) and page on both sides. End with one line: VERDICT: BETTER, SAME or WORSE. Of rc3.1 only these are loaded: BUILD_CONTEXT.rc3.1.md, MANIFEST.rc3.1.md, OMNIBUS_DOCUMENT_MODEL.rc3.1.md, PAPERS.rc3.1.md, book-philosophy.rc3.1.pdf, booklet-gateway.rc3.1.pdf, dev-handover.rc3.1.md, papers-build-review.rc3.1.md, staging-readme-ttheory.rc3.1.md, ttheory-build-review.rc3.1.md, ttheory-nlm-uat.rc3.1.md, ttheory-omnibus.rc3.1.pdf, ttheory-vol1.rc3.1.pdf, ttheory-vol2.rc3.1.pdf; compare like with like.

ChatError: Chat request was rate limited or rejected by the API. Wait a few seconds and try again.
