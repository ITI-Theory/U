---
title: "Sherlock: A Neuro-Symbolic Compiler for Natural Language"
subtitle: "Affidavits for a research programme, checked in Lean 4 against themselves, each other and OpenCyc"
author: "Alistair Johnson"
date: "2026"
lang: en-GB
bibliography: ../../bibliography.bib
csl: ../../apa-7th.csl
abstract: |
  Sherlock is a natural language compiler (NLC): it compiles what a text
  claims into checkable statements and checks them. Its front end is a language model, which reads the text and proposes
  claims, each with the sentence it comes from; a person confirms them. Its
  back end is the Lean 4 theorem prover with the Aesop proof search, which
  decides: against the text's own numbers, in ordinary arithmetic checked by
  the kernel; against the programme's own Lean proofs; against the other
  documents; and against OpenCyc, a knowledge base of common-sense consensus,
  all of which (1,366,193 ground facts in 678 microtheories, as distributed
  in NextKB) is loaded into Lean with each microtheory kept as its own scope.
  The claims of a document, frozen to a version and a SHA-256, form its
  affidavit. The test case is [T]-Theory, the author's research programme on
  emotion and field theory (24 papers, 15 books, a course and an atlas, with
  its own Lean proofs), chosen because it makes every kind of claim Sherlock
  checks, in many places at once. Sherlock has written affidavits for all 24
  of its papers: 248 claims, and 42 problems in 16 papers: counts that do not match their
  lists, values stated twice differently, arithmetic that does not hold,
  numbers that differ between papers, cited Lean declarations that do not
  exist, and category errors against the consensus. Two further layers turn
  checking into compiling. Structure mapping (SME, MAC/FAC) tests the
  programme's many claims that two things share "the same structure": most
  rest on the shared form of one equation, not on shared structure, and one
  contains a contradiction the prose hides. OpenCyc's collections become Lean
  types, so that a category error is a type error: the programme's emotion
  vocabulary now compiles against OpenCyc, after Sherlock found that 25 of
  the 28 OpenCyc names it used were not in OpenCyc. Findings carry evidence
  labels: kernel-verified arithmetic, derivations under OpenCyc's consensus
  (which is not mathematics), and interpretation. The text so far has been
  scientific papers, an advertisement and handwritten notes; natural language
  in general is the claim to be tested.
---

# Introduction

A paper makes claims. Some are mathematics and can be proved; most are not.
They say what a thing is ("an emotional mode"), how many there are ("two
operating modes"), when something happens ("at $t = 0.74$") and what is the
same as what ("all three are the same film"). A careful reader checks such
claims against the paper itself and against what everyone knows. Sherlock is
that reader, made explicit, and built like a compiler.

A compiler has a front end that reads source text into a structure and a
back end that checks and transforms the structure deterministically.
Sherlock's front end is a language model: it reads a document and proposes
its checkable claims, each with the sentence and line it comes from, and a
person confirms or rejects each. Its back end is Lean 4 [@moura2021lean4]:
once a claim is stated, the kernel decides it, and the same claim gets the
same answer every time. The front end is neural and fallible; the back end
is symbolic and exact. That division, language models at the ends and Lean
in the middle, is the design.

The back end checks a claim against four things: the document's own numbers
(arithmetic, decided by the kernel); the programme's own Lean (does the
theorem the paper cites exist, and on what axioms does it rest); the other
documents (is a value quoted the same everywhere); and common sense, as
OpenCyc [@lenat1995cyc; @opencyc2012owl] holds it, with the Aesop proof
search [@limperg2023aesop] looking for what follows. Two further layers
compare and type: structure mapping asks whether two things a document calls
"the same" share structure, and OpenCyc's collections as Lean types make a
category error a compile error.

The first version of this paper described the method and its first three
exhibits, on one document. This version reports Sherlock run over a whole
research programme, [T]-Theory: 24 papers, their Lean, and the claims they
make about each other. The code is in the repository's `sherlock/` directory, the
claims are in `registry/affidavits/`, every finding is a named Lean theorem
or a kernel-checked template, and `make -C sherlock all` rebuilds everything
from the published NextKB archive.

# The test case: [T]-Theory

A checker needs a corpus that makes the claims it checks. Sherlock's is
[T]-Theory, the author's research programme on emotion and field theory, and
it is a demanding one, for four reasons.

**Size and repetition.** The programme has 24 papers, 15 domain books, a
course and an atlas, written over a few months. Each central claim (how many
scale levels there are, what an experiment found, which theorem proves what)
is made in several documents, so a change in one leaves the others behind.

**Every kind of claim.** It counts and tabulates; it computes; it does
physics, from a Green's function at the Planck length to the observable
universe; it makes clinical and emotional claims, where common sense
applies; it argues by analogy ("the same structure at every scale"); and it
describes its own formal proofs. Few bodies of text exercise all of
Sherlock's checks at once.

**Its own Lean.** The programme has a Lean 4 library, built on Mathlib,
physlib and a formalisation of the Osterwalder--Schrader axioms, which the
papers cite by name. The ledger can therefore check what the prose says about
the proofs against the proofs.

**Written quickly, with AI help.** Much of the programme was drafted with
language models. That is the setting in which values drift between documents
and plausible names are invented, and so the setting in which a compiler for
text earns its keep (the programme's own Lean used 25 OpenCyc names that do
not exist).

The author of the programme is the author of Sherlock. The findings below are
reported as found; the documents they are about are frozen at the stated
versions and kept as exhibits, and the problems are being fixed in new
versions, which get new affidavits.

# Consensus is not mathematics

OpenCyc was built to hold the common sense that a reader brings to a text:
that a film is shown, that a showing happens somewhere at some time, that a
language is not a feeling [@lenat1995cyc]. It is consensus, entered by
people, and two of its properties shape everything Sherlock does.

**It is incomplete, and incompleteness is not falsity.** OpenCyc has an entry
for *Oliver Twist*, `OliverTwist-TheMovie`, and one for Charles Dickens, but
none for the novel. A question about the novel finds nothing; that says
something about the knowledge base, not about Dickens. Sherlock therefore
never reads "not provable" as "false". It reports three outcomes: proved,
contradicted (a proof of `falsum`), and not provable from what OpenCyc holds.

**It is not one theory.** Statements hold in *microtheories*, contexts with
their own assumptions [@mccarthy1993context; @guha1991contexts]: what holds in
a microtheory of fiction need not hold in one of biology. We tested the flat
reading first. The OpenCyc 2012 OWL release, repaired by ten SPARQL updates
from about 1.02 million OWL 2 DL profile violations to none, is reported
**inconsistent** by the HermiT reasoner. Taken as one ontology, the consensus
contradicts itself. Kept as microtheories, each part can be reasoned over on
its own terms, and a contradiction found inside one stays there.

The everyday shape of the problem is a conversation. "Did you see the latest
advert for Claude?" "Yes, on Tuesday." "I saw it on Thursday." We saw the
same thing, and we did not. OpenCyc settles this by refusing to let one word
name two things: the advert is a `Commercial-CW`, a conceptual work with no
place in space; what each television showed is a `Commercial-IBT`, an
information-bearing thing that happened somewhere; `instantiationOfWork`
links each showing to the work. Exhibit C makes this a proof. The abstract
film of Exhibit A is the same idea at the scale of a feature film: a score
that is none of its renderings.

# Method

## OpenCyc in Lean

NextKB [@nextkb2019] distributes OpenCyc as CycL with one file per
microtheory. A generator turns each microtheory into a Lean module of axioms
of the form

`axiom f : Holds (.c "UniversalVocabularyMt") (.genls (.c "Fear") (.c "Displeasure"))`

where `Holds mt φ` is Cyc's `ist`, "sentence φ is true in microtheory mt".
`Holds` is opaque, so whatever OpenCyc asserts, Lean itself stays consistent:
a contradiction in OpenCyc is not an explosion but a theorem
`Holds mt .falsum`. Microtheory inheritance (`genlMt`) is a separate
relation, and every microtheory inherits `BaseKB`. The ground facts are
translated, and 408 of OpenCyc's simple implication rules (Horn rules) are
translated into a library of their own, so the facts are never rebuilt
when a rule changes.
The largest microtheories are split into parts, and the modules are built one
Lean process at a time.

The meaning of the core predicates is given by a handful of axioms about
`Holds`: an instance of a collection is an instance of every more general
one; `genls` is transitive; two disjoint collections share no instance (a
shared one proves `falsum`); disjointness passes to specialisations. A second
file adds what the exhibits needed: `typeGenls` (every instance of a type of
collections specialises a given collection), the meta-predicates `genlPreds`
and `genlInverse`, transitive and antisymmetric predicates, equality, and
Cyc's unique names assumption.

## The affidavit

An affidavit is a Lean file. The document's claims are axioms in a
microtheory of their own that inherits OpenCyc's vocabulary
(`UniversalVocabularyMt`); the findings are theorems. Where a claim can be
read in two ways, each reading gets its own microtheory, so a contradiction
under one does not touch the other. A "not provable" result is a test that
passes when Aesop fails (`fail_if_success`).

Aesop finds single facts and short chains by itself; it does not guess the
middle collection of a long `genls` chain. Such chains are written out link
by link, and Aesop finds each link as a fact. This makes the proofs longer
and the explanations better: each finding lists the facts it uses.

## The front end

Claims are proposed by a language model with a fixed instruction (in
`docs/SHERLOCK.md`): read the whole document, report candidate findings with
their exact quotes and lines, recompute every number, and sort them into
kinds (a count against the list it counts, a value stated twice, arithmetic,
a unit, a value quoted by another document, a claim about the programme's
Lean, a typing against OpenCyc). Each candidate is checked by a person before
it is written down; on the first full paper, about one candidate in eight
was wrong. The confirmed claims go into the affidavit's registry entry
(`registry/affidavits/<doc>.yaml`), with the document frozen at a commit and
its SHA-256; the validator refuses a quote that is not in the frozen text.

## The front end, checked

A language model's reading of a sentence can itself be compiled. NextKB
[@nextkb2019] includes FrameNet's semantic translations [@baker1998framenet]:
for 13,846 English words (26,435 senses in 1,023 frames), the OpenCyc type a
word denotes and a binding template saying which grammatical slot is bound by
which OpenCyc predicate. A *reading* names the word and its sense and, for
each participant, the slot, the predicate and the OpenCyc type
(`registry/readings/`). Sherlock checks it without guessing: the quote at its
line in the frozen document; the sense in NextKB; the slot and predicate in
that sense's template; every type an OpenCyc constant; each type against the
predicate's argument type, proved by a `genls` path or refuted by a
`disjointWith` above both, the verdicts generated as Lean theorems and
checked by the kernel; and a sign of influence ("X raises Y", a qualitative
proportionality [@forbus1984qp]) licensed by the sense's own type
(`sherlock/readings.py`). `kernel-verified`

The first readings (The Tensor, P1, P6; 15 sentences) gave 5 validated and 10
with no translation: *amplify* is not in FrameNet, and safety, tempo and heart
rate are not in OpenCyc. The programme's own vocabulary then became a
microtheory, `TTheoryVocabularyMt` (`registry/vocabulary.yaml`): 19 constants
placed under neutral OpenCyc collections (a model quantity is a
`ScalarQuantity`, not a physical claim), words for 8 constants OpenCyc
already has, and 7 verbs typed with OpenCyc event types. It was needed for
more than coverage: OpenCyc's *threshold* is part of a building, its
*landscape* a topographical feature, its *neural network* an AI program, and
FrameNet's *dampen* is to make wet. With it, 12 of the 15 readings validate,
and every influence read from a sentence carries a sign its verb licenses;
the definitions are marked as the programme's, never as OpenCyc's. The validator corrected its own reader at once:
"Fear rises", read with fear as the object of the change, was refuted, since
the role needs a tangible thing and OpenCyc's feelings are aspatial; the
reading it accepts makes fear the attribute whose value changes. "Fear
activates shame" has no licensed reading: in NextKB, *activate* is a device's
change of state. The refused readings are kept as tests that must stay
refused. `derived-under-assumptions`

The programme also states influences as data, in the coupling matrices of its
figures ($W_{ij} > 0$: emotion $j$ amplifies emotion $i$). Comparing their
signs across documents found one disagreement: P6's appendix couples calm and
shame at $+0.2$, where every other figure in P1 and P6 has $-0.3$.
`derived-under-assumptions`

How far does this reach? Over the 385 claims of 43 affidavits, 65% of the
content words have a FrameNet translation, and 16% of the claims have one for
every word; with the programme's vocabulary, 69% and 18%. The rest is general
academic language (*real*, *formal*, *clinical*, *empirical*) and connectives
(*because*, *therefore*, *whether*), which are a claim's logical structure
rather than words a lexicon translates. `empirical-result`

## Templates: numbers as data

Most claims about a document's numbers need no Lean to be written. A claim
carries a check template with the document's numbers as data (`eq`, `ne`,
`lt`, `sum`, `diff`, `rel-between`, `monotone`, `not-monotone`), and a single
Lean file evaluates each one and adds it as a theorem proved by `decide`.
The kernel checks the arithmetic; the template only says which arithmetic.

## Across documents

Three further checks run over the whole programme. The **ledger** extracts
every Lean name a document cites and what it says about it ("axiom",
"kernel-checked", "theorem", "sorry"), asks the programme's Lean, one module
per Lean process, what each name is and which axioms it rests on, and lists
the disagreements. **Values** groups the quantities the affidavits record
(a scale count, an experiment's result) by name across documents and flags
those quoted differently. **Delta** compares an affidavit with a later
version of its document and proposes which claims an edit changed.

## Structure mapping

Many claims are analogies: two things "have the same structure". Sherlock
tests them with the Structure-Mapping Engine [@gentner1983structure;
@falkenhainer1989sme] and its retrieval model MAC/FAC [@forbus1995macfac].
A **case** describes one thing a document models (a scale of a catalogue, a
paper's model) as relational facts in a shared vocabulary of 33 predicates,
each fact with the line that states it; the same structure must be written
with the same predicate in every case, and a document's own sameness claims
are never facts of a case but tests of them. MAC ranks all cases by a cheap
count of predicates; FAC maps the probe onto each candidate; similarity is
the mapping's score over the probe's score against itself, averaged over
both directions. Because documents often describe every case under the same
headings, Sherlock also reports similarity **beyond the template**: with
the predicates that most cases share removed.

## Types

OpenCyc's knowledge is a deep embedding: `Holds mt φ` is a proposition about
a sentence. A thin typed layer sits over it (`Cyc.Types`): `Inst mt c` is
collection `c` as a Lean type, the terms microtheory `mt` says are its
instances, each carrying its proof; a `genls` fact gives a coercion from one
type to the other; a `disjointWith` fact gives a theorem that a term with
both types is a contradiction, so no coercion between disjoint types can be
added consistently. A programme type anchored to a collection then turns a
category error into a type error, reported by the compiler before any
search.

## Evidence labels

Findings carry the programme's evidence labels. Arithmetic over the
document's own numbers is `kernel-verified`; most of it is checked by
evaluation (`decide`), which proves that the stated numbers have the stated
property and nothing more. Findings against OpenCyc are
`derived-under-assumptions`: the assumptions are OpenCyc's facts and the
affidavit's choice of which OpenCyc constant a word of the document means.
That choice is the weakest link and is stated with each finding. How to read
a claim (Exhibit B's two readings) is `interpretive`.

# Exhibit A: The Tensor

*The Tensor* [@johnson2026tensor] defines a film as an emotional score, a
trajectory of seven "emotional modes" over story-time $t \in [0, 1]$, rendered
at run time through control knobs and, optionally, the viewer's own
heartbeat. Its worked example is *The River Film*. The exhibit is the text at
repository commit `2d36eaf` (1 October 2026), file
`paper/soma/the-tensor/the-tensor.md`, SHA-256
`0ec7a4dfe0d36413ea2e1e597fed624cebc5a26e98138a0d3fe7a46aada1e012`. Later
versions of the paper may correct what follows; the exhibit does not change.

The paper gives the score twice: as a 0 to 9 chart in Part II and as
keyframes in its Appendix. Between keyframes it is read by linear
interpolation, the only reading the Appendix offers.

**A1.** "Two operating modes:" heads a table of three (Projection, Resonance,
Mirror). `operating_modes_not_two`, kernel-verified.

**A2.** Projection, $\kappa_r \approx 0$, is where "the score drives the
viewer", but the model equation
$\dot{e}_V = -\nabla H_V + \kappa_r \lambda S + \eta_V$ puts $\kappa_r$ on the
film-to-viewer term, so at $\kappa_r = 0$ the screen signal drops out. The
knob table defines $\kappa_r$ the other way round, as the weight of the
viewer on the film. `projection_screen_drops_out`, kernel-verified.

**A3.** Threshold 1 fires when "F > 0.7", but fear peaks at exactly 0.70 and
is at most 0.70 at every rational story-time. The score never crosses, and at
the default $\kappa_r = 0$ the film holds at T1 for ever.
`threshold1_unreached`, kernel-verified.

**A4.** Threshold 2 is declared at $t = 0.74$ with the condition
"L < 0.1 AND PV > 0.85", which holds at 0.70 and fails at 0.74 and on all of
$[0.72, 0.8]$; the chart's "$t \approx 0.71$" is right.
`threshold2_fails_at_074`, kernel-verified.

**A5.** The chart and the keyframes, the same score twice, differ in 11 of 77
values, all at $t \geq 0.7$. `chart_keyframes_differ`, kernel-verified.

**A6.** Of the seven "emotional modes", Fear, Awe, Grief, Curiosity and Shame
are OpenCyc emotions (`EmotionalQuantityType`); Safety and Pre-verbal are not
(the nearest emotion to Safety is `Security-Emotion`); and Language as an
emotional mode proves `falsum`. `language_mode_contradiction`,
derived-under-assumptions.

A6 needs OpenCyc and is worth spelling out. The affidavit maps the mode
"Language" to OpenCyc's `Language` and asserts the paper's typing,
`isa Language EmotionalQuantityType`. OpenCyc holds that every emotional
quantity type specialises `FeelingAttribute` (`typeGenls`), which is a
`MentalQuantity`, a `ScalarQuantity`, a `ScalarInterval` and so a
`ScalarOrVectorInterval`; that `Language` is a `CommunicationConvention` and
so an `InformationStore`; that `InformationStore` and `ScalarOrVectorInterval`
are disjoint; and that Arabic is a language. If Language were an emotional
mode, Arabic would be both a store of information and a quantity of
feeling. The paper itself describes the mode as "symbolic, conceptual,
narrative organisation", which is not a feeling; the finding is that its
heading says otherwise.

A1 and A2 a careful proofreader could find; A3 to A5 need the arithmetic
done. A6 needs the consensus: no rule of grammar or arithmetic says that a
language is not an emotion.

# Exhibit B: "All three are the same film"

The Tensor's last part claims that the River Film's score "can be realised in
at least three containers without changing a single value in the score
definition": a river journey, a voyage through the body, a therapy session.
"All three are the same film."

OpenCyc has a relation for exactly this. `genlWorks NARROW GENERAL` means that
NARROW "includes all of GENERAL, but has additions (refinements). This is the
relationship of a story to its plot … or 'variations on a theme' to the
musical theme itself." `genlWorks` is reflexive, transitive and
antisymmetric. The claim has two readings, and each gets a microtheory.

**Same score.** Each container film is a refinement of one score
(`genlWorks river score`, and likewise for body and session). OpenCyc then
derives that a showing of the river film instantiates it, and that the score
generalises the river film. It does *not* derive that the showing is a
performance of the score: no rule in OpenCyc links `performanceOfWork` to
`genlWorks`, so the paper's "the score is what is being rendered" is not
provable. That is a gap in the consensus, not a refutation.

**Same film.** Each container film includes all of the other
(`genlWorks river body` and `genlWorks body river`). Antisymmetry makes them
equal, and Cyc's unique names assumption makes two differently named works
being equal a contradiction (`same_film_contradiction`). The paper's own
table gives the containers different deep attractors, so they are not one
work.

Sherlock's advice is to say "the same score", not "the same film". The
analogy the paper intends, the same relational structure in three settings
[@gentner1983structure; @forbus2017analogy], is then a claim about the score,
and it can be tested by comparing three independently written container
descriptions, which the paper does not yet contain (the body and session
versions are drafted for the author; the test runs once they are in the paper).

The exhibit also found a slip in OpenCyc. It states
`genlInverse genlWorks parts`, which makes the river film a *part* of its
score (`river_part_of_score`); the gloss of `genlWorks` says the reverse,
that the story includes its plot. Consensus can be wrong, and a proof makes
the error visible.

# Exhibit C: Did you see the Claude advert?

The conversation of Section 2 as an affidavit (`ClaudeAdvertMt`): the advert
is a `Commercial-CW`; the Tuesday and Thursday showings are
`Commercial-IBT`s; each is an `instantiationOfWork` of the advert. Three
theorems follow.

- **We saw the same thing:** one work is instantiated by both showings
  (`same_work`).
- **We did not:** the two showings are two things (`different_showings`).
- **Taking a showing for the work is a contradiction**
  (`showing_is_not_the_work`): a `Commercial-IBT` is ultimately a
  `SpatialThing`, a `Commercial-CW` an `AspatialThing`, and OpenCyc holds the
  two disjoint.

The answer to "did we see the same thing?" depends on which thing the
question is about, and the consensus makes the question say.

# Exhibit D: The Zoomable Universal Somatic Field

The fourth exhibit is a long paper, P11, *The Zoomable Universal Somatic
Field*, frozen at commit `3c97a44`. It claims that one equation, the
Helmholtz Green's function equation $(\nabla^2 + k^2) G = \delta$, governs
propagation at every scale from the Planck length to the observable
universe, and it walks through a catalogue of scales, each ending in a
sentence beginning "Same as always."

Sherlock's affidavit finds eight problems. The catalogue covers 21 levels,
as the abstract and the programme's Lean (`ScaleLevel := Fin 21`) say, but
the text says "twenty" five times (D1). The scale dial is not monotone in
length: Scale 14 ($10^3$ m) follows Scale 13 ($10^{11}$ m) (D2). The double
well of Scale 4 is said to be "separated by twenty-five orders of magnitude"
from the limbic one at Scale 6, but the paper's own headings ($10^{-9}$ m,
$10^{-1}$ m) give eight (D3). Two mode counts are stated twice with
different values (D4, D5). The table of the paper's axioms has four rows;
the Lean holds only one of them as an axiom, and the cited files hold three
axioms the table omits (D6, found by the ledger). A cost reduction claimed
in the abstract needs a condition the abstract omits (D7). And "a conscious
percept is a pole in the propagator", read as identity, makes an event of
perceiving a mathematical object, which OpenCyc holds disjoint (D8); read as
correspondence it is fine, and Sherlock's advice is the word "corresponds".

Structure mapping then tests the "Same as always" sentences. Each of the 18
catalogue sections became a case (164 facts), and the limbic double well of
§§3.3 and 6.3 a nineteenth. Every section states the equation, a propagator,
a substrate and what sets the wavenumber: the general claim holds as
written, because each section asserts it. Beyond those headings the
specific claims mostly share little: of seven (fifteen pairs of scales), only
Scale 12 against Scale 3 (both $1/r$ propagators) shares structure
(similarity 0.90 beyond the template, the best match of all cases); the
others share 0.31 or less. The molecular and limbic double wells, "identical in
structure", are far apart: of the 18 other cases, the limbic one is the least like
Scale 4 (0.14): both are
quartic double wells, but only the limbic one has attractors, trapping and
tunnelling. They share a form, not a structure.

Reading the cases against their sentences found one more problem. Scale
19--20's propagator is the gravitational wave's, with $k = \omega/c$ (line
758); twenty lines later it is "formally identical to the Coulomb
propagator ... both are $1/r$ forms of equation (1) with $k=0$" (line 779),
and identical too to Scale 5's synaptic transfer function, which the paper
writes with $k = i\lambda^{-1}$. Two of the three propagators that are "the
same" with $k = 0$ have, in the paper's own words, a different $k$.

# The programme: twenty-four affidavits of [T]-Theory

Sherlock has written affidavits for all 24 of the programme's papers, 248
claims, and for Exhibit C, 3 more: 251 claims, of which 237 are labelled
kernel-verified, nine derived under OpenCyc's assumptions, four
interpretive and one sourced. 129 are confirmed, 69 consistent, 4 unclear,
5 not provable from what OpenCyc holds, and 44 contradicted. Two of the 44
are Exhibit C's, contradictions by design; the other 42 are problems in 16
papers.

| Kind | Problems | Example |
|---|---:|---|
| A value stated twice, differently | 12 | P11 gives $N \approx 10^2$ at Scale 2 in equation (10) and $10^5$ in the catalogue |
| Arithmetic | 9 | P1 infers "more than 24%" from a bound of $1 - \tanh 1 = 0.2384\ldots$ |
| A count against its list | 8 | P4's "three categories of work remain" lists four |
| Between papers | 7 | P19, P20, P21 count 20 scale levels; P11 and the Lean have 21 |
| A claim about the Lean | 3 | P19 cites `Rat.div_lt_div_right`, which current Mathlib does not have |
| Category, against OpenCyc | 3 | The Tensor's Language as an "emotional mode" |

Some are slips a careful proofreader would catch; some need the arithmetic
done (the threshold The Tensor's score never reaches); and some only show up
across documents. The programme cites one experiment, QUANT-EXP-1, as
"classical 0/48, quantum 3/3" in three papers; those are the figures of an
earlier sweep, and the paper that reports the experiment now gives a
different design (P2, Q1). P4 says the repository has seven `sorry`
markers; the other affidavits, and a count of the source, said five (Y2); all five were closed in October 2026.
P9 names seven mechanisms of an eight-letter acronym (M1).

The ledger, over the 24 papers, found 171 citations of Lean names, of which
17 disagree with the Lean: names that do not exist, declarations called
theorems or kernel-checked that are axioms or rest on axioms, and one called a
theorem that proves only `True` (the ledger reads the programme's own export of
its Lean, which flags such placeholders; papers that call them placeholders
agree with it). The values
check groups 218 quoted quantities and finds five quoted differently.

One finding came from the programme's Lean rather than its prose. Its
emotion vocabulary, a typed DSL with an OpenCyc interpreter, rendered each
emotion as an OpenCyc name and listed "key Cyc axioms we inherit for free".
Checked against NextKB, 25 of the 28 OpenCyc names in that file were not in
OpenCyc: `Fear-Emotion` and `Joy-Emotion` where OpenCyc has `Fear` and
`Happiness`, and predicates such as `emotionalBlend` that OpenCyc does not
have. The check it relied on ran only when an external database was running,
and printed "skipped" otherwise. It is now a type check (next section).

# Types: a category error is a compile error

Exhibit D's percept and pole show the typed layer. With
`Percept := Inst Z "Perceiving"` and `Pole := Inst Z "MathematicalObject"`
in P11's microtheory, a function about poles applied to a percept is
rejected when the file compiles: "Application type mismatch: has type
Percept but is expected to have type Pole". The correspondence reading, a
relation between a percept and a pole, type-checks; and a theorem shows
that no future coercion could make a percept a pole without a contradiction
in that microtheory.

The programme's emotion vocabulary now has a typed interpreter
(`EmotionCyc`). Each base emotion is an `EmotionType`, a term that
UniversalVocabularyMt classifies as an `EmotionalQuantityType`, and the
anchor is a proof found by Aesop over all of OpenCyc when the file
compiles: Happiness, Sadness, Fear, Anger, Disgust, Surprise,
Anticipation-Feeling, and Awe. `Fear-Emotion` does not compile. Trust has
no emotion type in OpenCyc and is marked as unanchored, visibly, instead of
being given an invented name; the programme's blend, dampen and evoke are
its own operators, not OpenCyc predicates, and are now written as such. The
programme's Lean package requires Sherlock's package, which shares its
Lean, Aesop and Batteries versions, so the programme sees all of OpenCyc
without rebuilding it.

# Discussion

**A compiler, with a language-model parser.** Sherlock's back end is a
compiler in the ordinary sense: a stated claim is decided the same way
every time, and its proof can be read. Its front end is not yet, but part of
it can be: a language model proposes claims and mappings and a person
confirms them, and where NextKB's FrameNet translations reach (two in three
content words, one claim in six whole) a reading is checked like the rest
(the front end, checked). Language
models at the ends and Lean in the middle is the design, not a stopgap: the
model reads and explains, Lean decides. A first test of the other
arrangement, a language model given all of OpenCyc as sources and asked
Sherlock's questions directly, retrieves facts but does not derive from
them; the scored comparison, with a locally run model, is a companion
paper's subject.

**When to compile.** Sherlock is run like a compiler in a writing loop:
draft and improve with a language model; compile (the affidavit and its
checks); let the model fix what the findings name, each finding being a
precise instruction with its proof; compile again, and compare the versions.
Sherlock does not correct the text, and should not: the model rewrites well
and notices poorly, and Sherlock the reverse. An affidavit is not worth
writing for text whose claims will change tomorrow; the cheap checks
(templates, the ledger, values, types) can run on every change, and the
front end at milestones.

**More than a linter.** Of the 42 problems, most need arithmetic or a second
document to see; three need common-sense knowledge no style checker has;
and the structure-mapping results change what the programme can say:
"the same equation" or "the same form" where it said "identical in
structure".

**The mapping is the weak link.** Which OpenCyc constant a word means, and
which predicate of the case vocabulary a sentence states, are choices made
by whoever writes the affidavit or the case. Sherlock makes them explicit
and checkable, cites the line for each, and reports the template control;
it does not make the choices for the author.

**Sherlock on this paper.** Sherlock was run on this paper before
publication, as the writing loop prescribes. It found two problems in the
previous version (the abstract counted the advert's claims as the papers',
and a ledger figure predated four affidavits), both fixed here; and the
ledger found two disagreements in this paper that were its own errors: a
module name read as a declaration, and a sentence saying that a name does
not exist read as a claim that it does. The ledger now reads both.

**Limits.** OpenCyc's 408 simple implication rules are in Lean; its default
reasoning and its more complex rules are not, and Aesop needs long chains
spelled out. The knowledge base is OpenCyc's 2012 consensus, with its gaps
(no *Oliver Twist* novel) and its slips (`genlInverse genlWorks parts`).
The texts so far are one programme's papers, an advertisement and the
author's handwritten notes; "natural language" is the claim to be tested on a
mixed set (news, a contract, a novel's chapter, a recipe).

**Where the idea came from.** The author added the W3C OWL 2 Primer's family
ontology [@hitzler2012owlprimer] as a test to the Scala RDF library
banana-rdf on 13 February 2015 [@bananardf]: a document's facts, typed and
checked. The programme's emotion vocabulary descends from the same library's
OWL DSL. Sherlock is that test grown up, with the document a scientific
paper and the ontology the common sense its reader brings. The name is Conan
Doyle's detective's, whose stories are in the public domain; the work is not
affiliated with the Conan Doyle Estate or with any adaptation.

**Next.** The programme's books; the containers
test of Exhibit B, once the body and session versions of the film are
written; the whole programme's concepts as types; affidavits as a form of
legal argument (claims, exhibits, precedent); and a reading of the history
of philosophy [@russell1945history] as a sequence of affidavits about the
same questions.

# Conclusion

An affidavit is cheap to write and exact to check. Run over a research
programme, [T]-Theory, Sherlock found 42 problems in 16 of 24 papers, separated the
mathematical findings from the consensus ones, showed that most of the
programme's "same structure" claims share a form rather than a structure,
and caught 25 invented names in the programme's own Lean by making them
fail to compile. OpenCyc is not mathematics, and Sherlock does not pretend
it is: it says what follows from the consensus, in which microtheory, and
why.

# Reproducing the exhibits

`make -C sherlock fetch lean-gen rules-gen lean affidavits` downloads NextKB
(checked by SHA-256), generates the Lean modules and the rules, builds them
one Lean process at a time (hours, several gigabytes), checks the affidavits
in `sherlock/Affidavits/` and the registry's template checks, and runs the
ledger over every affidavit's document; the reports are in `bld/sherlock/`.
`python sherlock/macfac.py report` runs the structure mapping over
`registry/cases/`; `lake build EmotionCyc` compiles the typed emotions; the
type spike is `sherlock/Types/Spike.lean`. Exhibit A is
`TheTensor/Score.lean` (A1 to A5) and `TheTensor/Language.lean` (A6),
Exhibit B `TheTensor/Containers.lean`, Exhibit C `ClaudeAdvert.lean`,
Exhibit D `ZSF/`. The River Film score is also exported as W3C EmotionML
[@burkhardt2014emotionml] by `make emotionml`.

# References
