# Sherlock: how to write and check an affidavit

Sherlock checks what a document claims: against the document's own numbers
and statements (arithmetic in Lean), against OpenCyc's common-sense consensus
(Lean + Aesop, microtheories as scopes), and against the programme's own Lean
(the ledger). It is a neuro-symbolic compiler for natural language, a natural
language compiler (NLC) for short: a language
model proposes the claims (the front end), Lean decides them (the back end),
and an edit re-checks what it touches. Method and results: paper SH1
(`paper/soma/sherlock-compiler/`). The epic, its end state and design
decisions D1-D12: ISS-055, `prj/.adm/issues/ISS-055-sherlock.md`. Commands:
`make -C sherlock help`.

## When to run Sherlock: the writing loop

Write and improve with a language model first, compile with Sherlock, let the
model fix what Sherlock found, then compile again. As with code: you do not
compile every keystroke, and the compiler does not fix the bugs; it says
exactly where they are and why.

1. **Draft** with the model: ideas, structure, clarity.
2. **Compile**: write the affidavit (below) and check it. Each finding comes
   with its proof ("line 779 says k = 0; line 758 says k = omega/c").
3. **Fix** with the model, guided by the findings; the author approves each fix.
4. **Compile again**: a new version, `make -C sherlock delta ID=...`, and the
   checks.
5. **Release**: the release gate (section 21), then NotebookLM as the final
   reader's check (do the fixes read right? D11).

Why this order:

- **Not on immature text.** An affidavit freezes claims; if they will change
  tomorrow, the affidavit is stale tomorrow. Run it when the text makes claims
  you would defend: a version you would show someone.
- **Sherlock does not correct, and should not.** It reports with a proof,
  which is the best instruction a model can get. The model is good at
  rewriting and poor at noticing; Sherlock is the reverse.
- **The model is also a source of errors** (values that drift between
  documents, plausible names that do not exist: 25 invented OpenCyc names in
  the programme's own Lean). So its fix is compiled again.

Two speeds: the **cheap checks** (templates, the ledger, values across
documents, types) run all the time, like a linter, in the release gate and in
CI (ISS-068); the **expensive front end** (extracting and confirming a new
affidavit's claims) runs at milestones. Who runs what, and when, is the
user's choice; this is the default.

## Setup (once, hours)

`make -C sherlock fetch lean-gen rules-gen lean`: NextKB (SHA-256 checked),
one Lean module per microtheory in `bld/sherlock/lean`, OpenCyc's Horn rules
(`CycRules`, never rebuilding the facts), built one Lean process at a time
(several GB; never two Lean builds at once).

## Tools

| Command | What it does |
|---|---|
| `python sherlock/lookup.py WORD` | candidate OpenCyc constants for a word (FrameNet translations, names), with comment, isa, genls |
| `python sherlock/chain.py genls\|isa\|disjoint A B` | the OpenCyc path between two constants, printed as the Lean term |
| `make -C sherlock check` | the registry: frozen sources, quotes, lines, levels, concepts; cited theorems exist; template checks (kernel); reports |
| `make -C sherlock ledger LEDGER_DOCS=...` | documents' claims about the programme's own Lean (axiom, kernel-checked, sorry) against the Lean |
| `make -C sherlock delta ID=... [REV=...]` | what an edit did to an affidavit's claims (unchanged, edited, probably fixed, lost, new text) |
| `python sherlock/sme.py ID` | structure mapping between two relational descriptions (`registry/analogies/`) |
| `python sherlock/macfac.py check\|report` | MAC/FAC over the case library (`registry/cases/`): where else a structure occurs; the documents' sameness claims as tests |
| `lake build EmotionCyc` (root) | the programme's emotions as OpenCyc types (`Cyc.Types`): a wrong name does not compile |
| `make -C sherlock affidavits` | every affidavit module, one at a time, then `check` |
| `make -C sherlock level-types` | one set of types: each level's OpenCyc class (registry/level-types.yaml), whether it can bear a feeling (feelsEmotion takes an IndividualAgent) or is a person; a concept typed with a microtheory, or a feeling on a level that cannot feel, is an error; the Soma Machine's human controls read the same verdicts |
| `make -C sherlock leakage` | biological leakage (ISS-094): a model object (a coupling matrix, an attractor, a propagator) said to *be* a body part, OpenCyc's own (1,349 animal parts), with no map stated and no interpretive label |
| `make -C sherlock clinical` | sentences claiming a clinical effect with no hedge in the sentence and no evidence label in the paragraph; each document in its context (registry/microtheories.yaml: ClinicalMt and ArtisticDesignMt documents must carry their own disclaimer, and in ArtisticDesignMt a hedge is not enough) |
| `make -C sherlock towers`, `skyline` | the programme's Lean and OpenCyc exported for the Soma Machine's city of code |

Reports in `bld/sherlock/`: `affidavits.md` (every claim), `values.md` (values
quoted across documents), `palace.json` (claims by scale level and concept,
for the Soma Machine), `ledger.md`, `delta-<id>.md`, `sme-<id>.md`.

**As a compiler.** The ledger and the clinical check also print their findings the way a
compiler does, `path:line: error|warning: message` (`bld/sherlock/ledger.txt`). In VS Code,
run the task **Sherlock: report** (fast, from the last Lean judge) or **Sherlock: ledger**
(re-judges with Lean): each finding appears in the Problems panel and as a squiggle on its
line in the paper or book. A finding read and accepted as not an error goes into
`registry/ledger-accepted.yaml` with its reason (a disposition); the ledger then reports it
as accepted, as a compiler's warning is silenced with a reason, never quietly.

## Writing an affidavit for a document

1. **Freeze the document**: its commit and SHA-256
   (`git show <commit>:<file> | sha256sum`). The affidavit is about that text.
2. **Extract the checkable claims** with the prompt below (an AI agent,
   read-only); verify every candidate yourself: about one in eight is wrong.
3. **Write the registry entry** `registry/affidavits/<doc>.yaml` (schema in
   `sherlock/registry.py`): per claim the exact quote (it must be found in the
   frozen text), lines, kind, finding, verdict, label, and
   - arithmetic: a `check:` template with the document's numbers (`eq`, `ne`,
     `lt`, `sum`, `diff`, `rel-between`, `monotone`, `not-monotone`); the
     kernel checks it from the data, no Lean to write;
   - what templates cannot say: a Lean theorem in `sherlock/Affidavits/<Doc>/`
     (core Lean for numbers; `CycKB.UniversalVocabularyMt`, `Cyc.Typing` and
     `Cyc.TTheory` for typing, the document's microtheory inheriting
     `TTheoryVocabularyMt`, one microtheory per reading), named in `lean:`;
   - `mapping` (word to OpenCyc constant, from `lookup.py`), `formal`
     (CycL-shaped sentence), `values` (quoted quantities, for cross-document
     checks), `levels` and `concepts` (registry ids: where the claim lives in
     the mind palace).
4. Run `make -C sherlock affidavits` (or `check` when only the registry
   changed) and `make -C sherlock ledger` for the document.
5. Labels (`docs/agent/THEORY-STATUS.md`): arithmetic on the document's
   numbers is `kernel-verified`; a result against OpenCyc is
   `derived-under-assumptions` (OpenCyc's facts plus the chosen mapping);
   choosing a reading is `interpretive`. "Not provable" is never "false".
6. The author disposes of each finding (`disposition`: open, fixed in a new
   version, kept as an exhibit). After an edit, `make -C sherlock delta`
   proposes what changed; a new version gets a new freeze.

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

Claims about the programme's own Lean (axioms, theorems, sorries) are checked
by the ledger (`make -C sherlock ledger`), which asks the root package's Lean,
one module per process, what each cited declaration is.

## The programme's collections as Lean types (ISS-063, design note)

A word in a paper names a collection: OpenCyc's where OpenCyc has the sense, the programme's
own (`registry/vocabulary.yaml`, TTheoryVocabularyMt) where it does not. Typed, a collection is
`Cyc.Ty.Inst m c` (`sherlock/Cyc/Types.lean`): the terms microtheory `m` says are instances of
`c`. `genls` gives a coercion (`Inst.up`); `disjointWith` gives `Inst.apart`, so one term with two
disjoint types is a contradiction. A category error then fails to type-check instead of passing
as prose.

The spike (`sherlock/Cyc/Types/Spike.lean`, 13 Oct) takes the first case the issue named.
`FieldAxioms.PerceptIsPropagatorPole` says a percept *is* a pole of the somatic propagator. OpenCyc
types a percept as a `Perceiving`, an event and so a `TemporalThing`; the programme's
`PropagatorPole-TTheory` (added to the vocabulary for this, since OpenCyc's "pole" is a rod, a
planet's pole or an ethnic group) is a `MathematicalOrComputationalThing`; NextKB says the two are
disjoint. `percept_is_not_pole` proves the literal reading a contradiction. The coherent reading
is that a percept is *modelled by* a pole, a map `Percept → Pole`, and that is how the Lean axiom
is already written (`ω₀ = percept e`, `percept : EmotionState → ℂ`): the papers' "is" is the
model's "=" between quantities, not an identity of kinds. Emotions are already typed this way
(`paper/proofs/EmotionCyc.lean`).

Decided so far: the slice mode of the readings (NextKB facts as axioms in one microtheory, the
programme's definitions marked as such); OpenCyc's own constants where they exist, the programme's
`-TTheory` constants where they do not. For the author: whether every co-identification axiom of
`FieldAxioms.lean` ("X IS Y") should be restated as a map with its typing (the readings check
already reports each such sentence's literal reading), and whether the concept registry and the
app's type guard should read the same types.

## USC: the working record (chats, issues, tags, the app, the method)

Sherlock is one instance of the Universal Semantic Compiler (USC; ISS-126 to ISS-131). The same back end
(Lean models and queries) reads the programme's working record as well as its documents. What it did on
26-27 Nov is written up in SH1 ("A second run"), P3's next version ("The Protocol as Code") and the course,
chapter 15 ("Backtest: Einstein, 1905"). The commands run from `U/` (`make -C sherlock ...`; the Python ones from `U/sherlock/`). At most two Lean processes
run at a time, so run the targets one after another.

| Command | What it builds or does |
|:--|:--|
| `make -C sherlock chats` | every chat in `Me/chats/Inbox` with its affidavit (`Me/chats/affidavits/*.aff`), as Lean in `bld/` (private, never committed); runs `tags` and `issues` first |
| `make -C sherlock issues` | `ISSUES.md` as Lean: issues, boxes, refs |
| `make -C sherlock tags` | the `{{usc:...}}` tags, checked and compiled; a ref to an issue that does not exist fails |
| `make -C sherlock links` | papers, issues, chats and the method's rows in one graph; what nothing links to |
| `make -C sherlock method` / `backtests` | P3's protocol as Lean (`Method/`), and the Einstein backtest (`backtests/Einstein1905.lean`) |
| `make -C sherlock fishing` | the method's rows on [T]-Theory (`Fishing/`): the ledger and the bait (open assumptions) |
| `make -C sherlock equations` | every equation in the documents, classed, beside its Lean (`bld/sherlock/equations.md`) |
| `make -C sherlock usm` / `app-audit` | the app as a model; the app as seen (screenshots, Windows OCR, about 35 minutes) |
| `python chats.py todo` | the chats with no affidavit yet |
| `python chats.py route STAMP THREAD DISP [REF]` | route a thread: `implemented REF`, `queued ISS-NNN`, `parked`, `discarded REASON` |
| `python chats.py triage` | witnesses that do not hold, possible witnesses, loose ends: `Me/chats/triage.md` |
| `python chats.py ideas` | what the chats leave behind, by kind and product: `Me/chats/ideas.md` |
| `python chats.py ideas --grep WORD --by kind\|product\|date` | search it; printed, nothing written |
| `python chats.py tag` | write a tag into the original chat for every routed thread (idempotent) |
| `python usctags.py check` | the tag checks alone; `strip FILE` prints a file as the builds see it |
| `python usc.py check` (`make -C sherlock usc`) | every editor's findings in seconds: tag errors, the books' citations, untriaged tags, open assumptions |
| `python usc.py recall WORD ...` | "didn't I think about ...?": every thread, any state, best first; `--text` searches the chats' text |
| `python usc.py browse`, `where`, `rank` | the picker's data (`:UscBrowse`), a thread's chat and line, the author's 0-3 rating |
| `python usc.py board [STAMP]`, `board --apply` | the thoughts as a Kanban board (Me/chats/board.md); moved cards become routes |

**Tagging a line.** Put the tag on its own line, where the thing was said: in a chat (`Me/chats/Inbox`) or in
`ISSUES.md`, the only places allowed until the builds strip tags (ISS-081):

```text
{{usc:begin id="LOOSE-20261127-memory-kernel" status="LOOSE_END" disp="queued" ref="ISS-130" note="..."}}
...the lines it covers...
{{usc:end id="LOOSE-20261127-memory-kernel"}}
```

The classes for the working record are `IDEA`, `LOOSE_END`, `DECISION` and `QUESTION` (the grammar is
`usc_tags.ebnf`). `disp` is one of `implemented`, `queued`, `parked` or `discarded`. `implemented` and `queued`
need a `ref`. A tag without `disp` is listed as untriaged by `make -C sherlock tags` and in `ideas.md` until it is routed. A
tag inside a line of prose is a mention and is ignored. Tags survive a re-export of a chat
(`Me/chats/scripts/usc_keep.py`), and `chats.py parse` blanks tag lines, so prompt numbers do not move.

