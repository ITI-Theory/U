---
title: "[T]-Theory: The Evolution"
subtitle: "How it came about: Phase Dot, condensed"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  [T]-Theory was not planned. It came out of conversations with machines, hundreds of them, over most
  of 2026. This book is what those conversations amount to once the talk is taken out: what was raised,
  when, and what became of each thing, done, queued, parked or dropped, with the points still open listed
  as they stand. It is compiled, not remembered: the Universal Semantic Compiler (USC) reads every chat,
  writes its affidavit (the threads it opens, at which prompts, and their fate) and lays the chronicle out
  from that record. The raw conversations stay private (Phase Dot); this is their condensed, public form.
---

# Preface: the journey and the treasure {.unnumbered}

People say that mathematics is discovered, not invented. That is how this work felt from the inside. It
was like setting out on an ordinary holiday and finding oneself, without choosing it, on an expedition
through a jungle: one strange and wonderful thing after another, and at the end a treasure to carry
home. The treasure is the theory, its papers and books, the Soma Machine and the compiler that checks
them. But a treasure found is not the finder's to keep; it is handed on, and whether it is real is for
others to judge. What the finder does own is the journey.

This book is the journey. It is not the theory (the papers and the books are), and it is not the
conversations themselves (those are Phase Dot, kept private). It is the record of how one led to the
other, condensed so that it can be read.

# How this book is made {.unnumbered}

Every conversation behind [T]-Theory was exported and given an *affidavit*: a short record, written by a
language model and checked by the compiler, of the threads the conversation opened, the prompts where
each was raised, and what became of it. A thread is *done* when it lives somewhere now (a commit, a
file, a paper), *queued* when an issue in the programme's tracker holds it, *parked* or *dropped* with a
reason, and *not yet triaged* until someone decides. The chronicle in each chapter below is laid out from
those affidavits by the build (`python sherlock/chats.py chronicle`; the book's Lua filter), so its counts
are generated, never typed, and it changes when the record does.

Three rules keep it public. Nothing is quoted from the conversations: a thread appears as its affidavit's
one-line topic. Personal threads are counted, never listed. And the practical threads (hardware,
publishing, accounts) are left out; they are the scaffolding, not the building. Each thread names the
conversation it comes from by its time stamp and prompts, so a reader with the private record can check
it.

The threads are sorted into the programme's three products: the theory (USF, the Universal Soma Field:
the papers and books), the Soma Machine (USM: the theory made visible) and the compiler (USC: Sherlock
and the tools that check everything else).

# Origins: to May 2026

The beginning is in the eleven conversations of April and May 2026 that open Phase Dot, pasted by hand
from the assistant's history before any chat was exported, and in the few exported chats from that time.
The compiler reads them as it reads the later chats; where a pasted conversation kept no prompts, its
threads name the conversation alone.

It began with a question about knowledge, not physics. The first recorded conversation asks how to build
[OpenCyc as an axiom-based knowledge base in Lean 4, searched by Aesop]{.chat ref="20260413_015018" p="1-3"},
and the notes beside it are about [writing mathematics in Markdown next to its Lean]{.chat ref="20260401_02"}:
the habit that later became the programme's build. Then the conversations turn to pictures: [an M-theory
Mandelbulb multiverse in 3D]{.chat ref="20260428_002254" p="26-29"}, and [a 3D projection under a tarp on a
mountainside at night]{.chat ref="20260501_04" p="1-9"}.

The turning point is 6 May. A conversation that began elsewhere arrives at [M-theory and modelling emotions
as a quantum field theory: a unified theory of oneself, and a device to externalise emotions]{.chat
ref="20260506_05" p="16-23"}. The same conversation gives the work its letter, [Station [T], [T]-Chill,
[T]-Cool, "Just prove [T]"]{.chat ref="20260506_05" p="34-57"}, and sketches the checker that became the
compiler: [Sheer Luck, a tool that reads a text and checks it, a plug-in for VS Code or Neovim, with OpenCyc
imported into Lean as axioms]{.chat ref="20260506_05" p="39-42"}. Six months later that plug-in was built.

The rest of May fills in both halves. On the machine side, [Sherlock and Moriarty appear as duals, one finding
by abduction]{.chat ref="20260513_190707" p="2"}, and the idea of [type cruising: a type astronaut in the
typeverse]{.chat ref="20260516_230924" p="28-37"} that the methodology paper later named. On the theory side,
16 May holds [the first written [T]-Theory: an abstract, an introduction, and a README drafted again and
again]{.chat ref="20260516_11"}. By the end of the month the question that leads to this book has been asked:
[the private chats tell where it all came from; put them together as a book?]{.chat ref="20260529_020242"
p="74-76"}

::: {.chronicle to="202605"}
:::

# Summer 2026: the theory takes shape

June set the cast and the method. The checker got its characters, [Sherlock and Moriarty, in an audit run
by the Cookie Monster]{.chat ref="20260605_204722" p="1-24"}, and the programme its shape, [the fractal thesis
as a dependent type over its domains]{.chat ref="20260605_204722" p="37-181"}. The proofs met reality: [the
Lean builds failing, and the build rules that followed]{.chat ref="20260612_184004" p="381-661"}, and two finds
that shaped the physics, [the free field as the Gaussian free field that satisfies the Osterwalder-Schrader
axioms]{.chat ref="20260612_184004" p="181"} and [the dark-matter derivation from the spatial vacuum]{.chat
ref="20260612_184004" p="301-601"}. The question of a better model than Hopfield's [was answered with
M-theory, field theory and Green's functions proved in Lean]{.chat ref="20260613_155133" p="7-18"}.

July asked whether it could be explained: [to a child, in three sentences, and whether it is a new
field]{.chat ref="20260716_203112" p="1-5"}; it found a first test, [Hopfield's learning time against the
limbic shortcut]{.chat ref="20260716_203112" p="10-11"}, and a first audience, [a teacher, and a master's
thesis for teachers of children with special needs]{.chat ref="20260717_100350" p="7-15"}.

August was the month of breadth. The theory reached [the swarm and the spread of an accent]{.chat
ref="20260805_170944" p="29-33"} and [the law]{.chat ref="20260805_170944" p="35-39"}; it produced its two
boldest numbers, [the cosmological constant]{.chat ref="20260811_232415" p="1-7"} and [a dark-matter share of
3/11]{.chat ref="20260811_232415" p="8-9"}, and the instinct to [stress-test them against other
predictions]{.chat ref="20260813_152749" p="1-6"}, which the compiler would act on in November. Music entered
the field as [Juslin's BRECVEMA solved inside the eleven-dimensional field]{.chat ref="20260817_235530"
p="12-21"}; physics as [the poke, the energy that creates a particle]{.chat ref="20260825_025816" p="5-9"}.
And the working method found its form: [range tags in the Markdown, stripped by a Lua filter]{.chat
ref="20260807_120707" p="1-15"}, and [thoughts as code, the chats compiled like source]{.chat
ref="20260811_182331" p="15-18"}, the seed of everything the last chapter describes.

::: {.chronicle from="202606" to="202608"}
:::

# Autumn 2026: the papers, the books and the release

September gathered the material: [the equations of Penrose's *Road to Reality* as a Pandoc list]{.chat
ref="20260922_160144" p="3-5"}, the wish to [let people without the conditions feel C-PTSD, autism and ADHD in
the explorer]{.chat ref="20260928_223150" p="17-19"}, and [a philosophy book in Russell's manner]{.chat
ref="20260928_223150" p="34-35"}. October built it. A single conversation carried [the release: the registry of
papers, the Makefiles, the volumes and their acceptance tests]{.chat ref="20261006_190130" p="1-641"}, and
beside it [the bridge to NotebookLM]{.chat ref="20261006_190130" p="41-221"}, [Sherlock with no database, Lean
as the reasoner]{.chat ref="20261006_190130" p="281-381"} and [an adversary for every check]{.chat
ref="20261008_190711" p="40"}. Figures became data: [a Visualize macro whose parameters an AI fills in]{.chat
ref="20261003_202706" p="6-9"}.

The second half of October turned to sound and to explaining. The music grew from [the day as five to ten
tracks, then an orchestral movement]{.chat ref="20261016_220251" p="1-7"} to [a hook typed as a question and
its answer]{.chat ref="20261020_124851" p="5"}; the checker was explained as [an AI writing the model and Lean
checking it, with Moriarty trying to break it]{.chat ref="20261025_160728" p="5-15"}; and the cosmology met new
data in [DESI's question whether the dark-matter share grows]{.chat ref="20261026_191719" p="9-22"}, the
question the fishing answered a month later.

::: {.chronicle from="202609" to="202610"}
:::

# November 2026: the compiler

November is the month the checker became a compiler. On 18 November the question was whether to release it:
[a plug-in on the Marketplace, one-click install, the affidavits as its basis]{.chat ref="20261118_215825"
p="18-24"}; and what it is: [not a specification compiler but a Universal Semantic Compiler]{.chat
ref="20261118_215825" p="41-43"}. Two days later it was renamed, [USC beside USF and USM]{.chat
ref="20261120_140700" p="22-34"}, and given its strangest task: [run Sherlock on the chat files; did we chat
about anything not implemented?]{.chat ref="20261120_140700" p="71-73"} This book is one answer to that question.

The week after turned the idea into a method. [USC as the gateway: it models what a document tries to show,
and tested on a book it found errors another AI had missed]{.chat ref="20261122_173241" p="24-62"}. [Compile
documents as if they were code, each Markdown file to a Lean file in a library]{.chat ref="20261123_171439"
p="13-15"}. Then, on 26 November, a calibration: [the history of E = mc², the first proof and the circularity
Planck caught]{.chat ref="20261126_140957" p="8-9"}, and the proposal to [give the system Einstein's work
before the result and see whether it finds it]{.chat ref="20261126_140957" p="15-18"}. It did, and it found
the step his first proof left unstated. The same conversation designed [the tags that mark loose ends where they
were said]{.chat ref="20261126_140957" p="33-34"}.

On 27 November the chats themselves were compiled: [a Lean model of the chats, so that grep is not needed]{.chat
ref="20261127_033130" p="13-18"}, [the methodology paper as the model of the method]{.chat ref="20261127_033130"
p="22-23"}, and the three products, [USF, USM and USC]{.chat ref="20261127_033130" p="30"}. The chronicle below
is the compiler's account of that month, and this book is its first product.

::: {.chronicle from="202611" to="202611"}
:::

# Where it stands

::: {.chronicle-totals}
:::

By the end of November 2026 the work had become three products released as one: the theory in its papers and
books, the Soma Machine that shows it, and the compiler that checks both, in an editor's tab and in Neovim
[as the release plan has it]{.chat ref="20261127_033130" p="30"}. The compiler had checked its own write-up
and compiled the conversations that made it, and this book is one of the things it made from them.

The treasure is not this book's to judge: that is for the papers' readers, the reviewers and the measurements
still to come. What the record can show is the journey, and that most of what was said along the way was
either done, put on a list, or set aside with a reason. The rest is the next chapter's agenda, below.

# What is still open {.unnumbered}

Every thread that is not yet triaged, or is queued to an issue, month by month: the agenda the journey
leaves behind.

::: {.chronicle open="true"}
:::
