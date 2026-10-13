# [T]-Theory Full UAT

**Track:** [T]-Theory

**Purpose:** Review the Fractal Thesis, Volumes I/II, and Gateway cheatsheet as a book-of-books system before Lulu or C2 release action.

## Evidence Rules

- Cite exact staged PDF filename and page for every conclusion.
- State `PASS`, `FIX`, or `OPEN` for every item.
- Use `PAPERS.md` for registry identity and `BUILD_CONTEXT.md` for renderer context.
- Treat `OMNIBUS_DOCUMENT_MODEL.md` as the approved hierarchy target; report implementation gaps rather than silently redefining it.

## Sherlock: Build and Structure

### TS-1 Master TOC hierarchy

**Question:** Does each master TOC expose every domain book and its immediate internal chapters, while avoiding a many-page subsection inventory?

**Status:** PENDING

### TS-2 Registered insertions

**Question:** For each sampled domain book, verify that the four-page cheatsheet occurs at the registered placement. Verify the Gateway noir/closing-cheatsheet exception.

**Status:** PENDING

### TS-3 Boundary clarity

**Question:** Can a reader distinguish a domain-book boundary, a book chapter, a cheatsheet insert, and the master volume boundary from typography and TOC alone?

**Status:** PENDING

## The Wizard: Model Consistency

Before these questions: the Wizard's automated checks (`make wizard`, ISS-092) report what each
book promised and did not cover, and the neighbouring topics nobody discussed
(bld/sherlock/coverage-<book>.md). Their gaps are attached to this run as sources; the questions
below ask only for judgement: is what is covered the right thing, and does any gap matter?

### TH-1 Shared C1v2/C2 model

**Question:** Compare the Papers omnibus and Fractal Thesis. Do both implement the approved two-level master TOC model: member title plus immediate internal chapter titles?

**Status:** PENDING

### TH-2 Book-of-books integration

**Question:** Does C2 read as fifteen coherent domain books within one programme rather than an undifferentiated long manuscript?

**Status:** PENDING

## The Monster: Reader Navigation

The Monster tests the reader: someone who did not build it. The friendly Monsters read; the
BOFH Monster attacks (an adversary who tries to make the work overclaim). NotebookLM plays
the reader here; at release a real reader does too (a therapist, a doctor, a musician, a
physicist), recorded in uat/checklist.yaml. Sherlock and the Wizard are now largely automated,
so this is where the UAT spends its effort.

### TC-1 Entry points

**Question:** For a reader opening a random volume page, do heading hierarchy, local TOC, and cheatsheet make the current book and its purpose obvious?

**Status:** PENDING

### TC-2 The Chocolate Biscuit Monster: the dunk test

**Persona:** an educated reader in plain English, short attention, a cup of tea
in reach (ISS-070). The dunk test: can the idea be told before the biscuit goes
soft, about one minute?

**Question:** For each volume, can its purpose be told in at most 120 words of
plain English from its opening pages alone? Give the summary and the page used.

**Status:** PENDING

### TC-3 The Root Monster: the roots under every tower

**Persona:** a hacker who reads the Lean before the prose and wants the axioms
under every result (ISS-070, ISS-071).

**Question:** Where a volume says a result is proved, does it name the Lean
theorem and say whether it rests on an axiom, a sorry or only proves a
placeholder? List the volumes that do and do not, with pages.

**Status:** PENDING

### TC-4 The BOFH Monster: tries to make it overclaim

**Persona:** the Bastard Operator From Hell: an adversary, not a reader. He quotes a
sentence out of context, asks the hostile question, and tries to get the volumes to say
more than it does.

**Question:** Find the three sentences that, quoted alone, would most overclaim (a cure,
a proof of consciousness, a quantum result about people, a clinical effect). For each, does
the sentence itself, or its paragraph, carry the evidence label or hedge that stops the
overclaim? Then answer as the volumes would: "So this cures trauma?", "You proved
consciousness in Lean?", "The quantum computer found awe?" Cite the pages used.

**Status:** PENDING

## Acceptance Decision

| Decision | Date | Reviewer | Notes |
|---|---|---|---|
| PENDING |  |  |  |
