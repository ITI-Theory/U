# Sherlock: how to write and check an affidavit

Sherlock checks what a document claims, in two ways: against the document's
own numbers and statements (arithmetic in Lean), and against OpenCyc's
common-sense consensus (Lean + Aesop, microtheories as scopes). The method and
the first exhibits are in paper SH1 (`paper/soma/sherlock-affidavit/`); open
work is ISS-055. Code: `sherlock/` (`make -C sherlock help`).

## Setup (once, hours)

`make -C sherlock fetch lean-gen lean`: NextKB (checked by SHA-256), one Lean
module per microtheory in `bld/sherlock/lean`, built one Lean process at a
time (several GB of memory; do not run two Lean builds at once).

## Writing an affidavit for a document

1. **Freeze the document.** Record the repository commit, the file and its
   SHA-256 (`git show <commit>:<file> | sha256sum`) in the affidavit's header.
   The affidavit is about that text; later versions do not change it.
2. **List the checkable claims**, each with the sentence it comes from:
   - internal: counts ("two modes" over a list of three), values given twice,
     tables against prose, equations at the document's own parameter values,
     thresholds against the data;
   - typing: what kind of thing something is said to be ("an emotional
     mode", "a film"), mapped to an OpenCyc constant. Search NextKB
     (`bld/sherlock/raw/nextkb_files_20190107.zip`, CycL text) for the
     constant, its `isa`/`genls`, `disjointWith` and `comment`.
3. **Write the Lean file** in `sherlock/Affidavits/<Document>/`:
   - numbers: core Lean only, scaled to natural numbers; `decide` for finite
     checks, `omega` or a small lemma for every rational point (see
     `TheTensor/Score.lean`);
   - typing: import `CycKB.UniversalVocabularyMt` (or the microtheory needed)
     and `Cyc.Typing`; put the document's claims as axioms in a microtheory of
     their own with `GenlMt` to OpenCyc's; one microtheory per reading when a
     claim can be read two ways (see `TheTensor/Containers.lean`);
   - Aesop finds single facts; spell out long `genls` chains link by link
     (the `link` macro); `fail_if_success` for "not provable".
   - Give every finding a doc comment (`/-- … -/`): the report uses it.
     Undocumented theorems are listed as steps.
4. Add the module to `sherlock/Affidavits.lean` and run
   `make -C sherlock affidavits` (one module at a time; stops on the first
   error), which writes `bld/sherlock/findings.md`.
5. Label each finding (`docs/agent/THEORY-STATUS.md`): arithmetic on the
   document's numbers is `kernel-verified`; a result against OpenCyc is
   `derived-under-assumptions` (OpenCyc's facts plus the chosen mapping);
   choosing a reading is `interpretive`. "Not provable" is never "false".
6. Record the findings in ISS-055 and, when the author decides, either fix the
   document (a new version) or keep it as an exhibit.

## Claim extraction (step 2, with an AI agent)

The ZSF affidavit used a read-only agent with this prompt (one in eight of
its candidates was wrong, so check each before writing Lean):

> Read the whole paper `<file>` (all of it, in chunks). Read-only: no edits,
> builds or commits. Sherlock checks a document's claims in two ways: against
> its own numbers and statements (counts, sums, ranges, values stated twice,
> tables against prose, equations at the paper's own parameter values, "N
> things" against the list given) and against OpenCyc typing (what kind of
> thing something is said to be; category errors). Report candidate
> findings, each with: the exact quote(s) and line numbers; the kind
> (internal-count, internal-arithmetic, internal-duplicate-mismatch,
> internal-unit, cross-paper, opencyc-typing with the OpenCyc concept you
> would map to); your verdict (CONFIRMED / CONSISTENT / UNCLEAR) with the
> computation shown; and for internal ones the exact numbers needed to state
> it in Lean. Cover every table, every count, every equation with numbers,
> every repeated constant, the abstract against the body, and every claim
> about Lean (theorem names, axioms, sorries). Most important confirmed
> findings first, then consistent positives, then 5-10 typing candidates.

Claims about the programme's own Lean (axioms, theorems, sorries) go in a
ledger (`sherlock/Ledger/`), which asks the root package's Lean environment
what each declaration is; `make -C sherlock affidavits` runs the ledgers too.