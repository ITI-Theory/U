# The Fractal Programme

## What this is

The **Fractal Programme** is the second layer of the [T]-Theory research.

The first layer — the 22 papers in `paper/soma/` — is the **canonical core**:
the deep mathematical and clinical work, written for peer review.

The second layer — this directory — is the **translation layer**:
each paper here takes the same master equation and applies it to a specific
domain, written for *that domain's audience*, not for physicists or
mathematicians in general.

The same Helmholtz Green's function governs everything. The fractal programme
proves this by demonstrating, in each domain's own language, that the same
equation which describes quantum foam also describes rap sheet patterns,
earthquake cycles, and social network dynamics.

This is the programme. We are not waiting 20 years for the geophysicist to
read the astrophysics paper and figure out the connection. We are doing it now.

---

## The map — 15 books (all complete)

All 15 books are built. Run `make all` in this directory to regenerate PDFs.
Each book is assembled from a domain-specific kappa (`kappas/`) plus 3–7 canonical papers.

| # | Book PDF | Title | Domain |
|---|---|---|---|
| 1 | `book-gateway.pdf` | [T]-Theory: A Universal Field Theory of Mind, Body, and Cosmos | General introduction |
| 2 | `book-physics.pdf` | Field Equations of Mind | Mathematical physics, QFT, astrophysics |
| 3 | `book-neuroscience.pdf` | The Electromagnetic Nervous System | Neuroscience, cognitive science |
| 4 | `book-clinical-psychology.pdf` | Trauma as Topology | Clinical psychology, psychotherapy |
| 5 | `book-computer-science.pdf` | Verified Emotional Computing | Computer science, AI, formal verification |
| 6 | `book-formal-mathematics.pdf` | Dependent Types and the Geometry of Feeling | Formal mathematics, type theory, HoTT |
| 7 | `book-consciousness.pdf` | The Hard Problem Dissolved | Consciousness studies, philosophy of mind |
| 8 | `book-complex-systems.pdf` | Scale-Free Dynamics | Complex systems, emergence, network science |
| 9 | `book-music-arts.pdf` | The Physics of Music and Affect | Music psychology, musicology, aesthetics |
| 10 | `book-geophysics.pdf` | The Geological Soma | Geophysics, seismology, Earth sciences |
| 11 | `book-social-science.pdf` | The Physics of Society | Sociology, social psychology, anthropology |
| 12 | `book-economics.pdf` | Economic Criticality | Economics, game theory, financial mathematics |
| 13 | `book-law.pdf` | Topology of Justice | Law, jurisprudence, regulatory studies |
| 14 | `book-ppe.pdf` | Mind, Market, and Mandate | Philosophy, politics, economics (PPE) |
| 15 | `book-psychiatry-asd.pdf` | Rewiring the Field | Psychiatry, ASD, neurodivergence, trauma |

---

## The Makefile pipeline

Each book is assembled from a domain-specific kappa (AI-generated framing, stored in `kappas/`)
plus 3–7 canonical papers from `paper/soma/`, merged by `build_fractal_books.py`.

```bash
make all           # build all 15 books
make book-physics  # build one book
make omnibus       # rebuild the combined omnibus PDF
make kappas        # regenerate kappas via API (requires OPENAI_API_KEY)
```

---

## Reader level guide

Approximate entry level for each book — useful when recommending to colleagues.

| # | Book | Target field | Entry level |
|---|---|---|---|
| 1 | `book-gateway.pdf` | General public, science communication | No background required |
| 2 | `book-physics.pdf` | Mathematical physics, QFT, astrophysics | PhD / postdoc |
| 3 | `book-formal-mathematics.pdf` | Type theory, HoTT, algebraic topology | PhD |
| 4 | `book-neuroscience.pdf` | Neuroscience, computational neuroscience | Masters / PhD |
| 5 | `book-consciousness.pdf` | Philosophy of mind, consciousness studies | Masters / PhD |
| 6 | `book-complex-systems.pdf` | Complex systems, network science | Masters / PhD |
| 7 | `book-computer-science.pdf` | CS, AI, formal verification | Masters / PhD |
| 8 | `book-music-arts.pdf` | Music psychology, musicology, aesthetics | Undergrad II / Masters |
| 9 | `book-geophysics.pdf` | Geophysics, seismology, Earth sciences | Masters / PhD |
| 10 | `book-social-science.pdf` | Sociology, social psychology, anthropology | Masters |
| 11 | `book-economics.pdf` | Economics, game theory, financial maths | Masters / PhD |
| 12 | `book-law.pdf` | Law, jurisprudence, regulatory studies | Masters (LLM) |
| 13 | `book-ppe.pdf` | Philosophy, politics, economics (PPE) | Undergrad II / Masters |
| 14 | `book-clinical-psychology.pdf` | Clinical psychology, psychotherapy, trauma | Masters / PhD (clinical) |
| 15 | `book-psychiatry-asd.pdf` | Psychiatry, ASD, neurodivergence | Masters / PhD (clinical) |

**Level key:** No background = any curious reader; Undergrad II = 2nd/3rd year; Masters = MSc/MA; PhD = doctoral researcher; Postdoc = active specialist. Level reflects *required background*, not difficulty of the USF argument.

---

## What this is NOT

- It is not a rewrite of the existing papers.
- It is not a simplification or popularisation.
- It is a **test case**: each paper proves the master equation applies in
  that domain by deriving domain-specific results from it.
- The proof is that you do not need to be a physicist to use the framework.
  The geophysicist gets geophysics results. The game theorist gets game
  theory results. The equation is the same.

---

## The Soma Waterfall (process)

The V-model is the standard systems-engineering lifecycle used by ESA and NATO
for safety-critical software: the left arm decomposes requirements down to
implementation; the right arm verifies back up to acceptance. Both arms are
real and populated — the right is not a rubber stamp.

This project uses an extended V with an additional pre-formal left arm above
the standard engineering entry point. That extension is documented below
because it exists in every serious project and is almost never written down.

```
 PRE-FORMAL                          │                        VALIDATION
 (not in methodology)                │                    (right-arm mirror)
                                     │
 Cookie Monster ─────────────────────┼──────────────── Cookie Monster test
  diverge, brainstorm,               │                  Can a non-specialist
  lateral thinking                   │                  understand it?
  the hardest audience               │                  → book-gateway.pdf
  to reach — if you can              │                  → NLM live notebook
  reach them, you've                 │                  If yes: PROBLEM NAILED
  nailed the problem                 │                          ▲
          │                          │                          │
 Harry Potter ───────────────────────┼─────────────── Omnibus + Fractal Programme
  serialise — AI chats as            │                  integrated, readable by
  Pensieve; capture structure        │                  15 specialist audiences
  before it evaporates               │                          ▲
          │                          │                          │
 Sherlock Holmes ────────────────────┼──────────────── 20 individual papers
  converge — abductive               │                  each verified against
  synthesis, extract the             │                  kernel, peer-readable
  minimal type signature             │                          ▲
          │                          │                          │
──────────┼──────── ENGINEERING ENTRY POINT ───────────────────┼──────────
          │                          │                          │
 Reichenbach ────────────────────────┴──────────────── Lean 4 proofs
  formal verification                                   USF_OSAxioms.lean
  Lean 4, zero sorries                                  0 sorries · 0 axioms
  scaffold comes down                                   machine-checked
          │                                                     │
          └──────────────── KERNEL (red) ────────────────────────
                      G(x,y) = e^{-k|x-y|} / 4πk|x-y|
                      the Helmholtz Green's function
                      the single invariant both arms serve
```

**Left arm:** Everything above the engineering entry point is real work. A
conversation with an AI assistant about whether a release is correct, whether
a file should be dropped, whether a claim holds — that is Harry Potter stage
work. It is not engineering. It is the cognitive scaffolding that makes
engineering possible. The names are comical precisely to make this boundary
visible: no organisation documents this phase, which is why so many projects
go wrong during it.

**Right arm — Cookie Monster test (top):** The hardest validation in the
whole V. Cookie Monster is not a joke audience — they are Penny from The Big
Bang Theory: intelligent, curious, no specialist background, and with no
obligation to persist if you lose them. If the gateway book and the NLM
notebook can be understood by someone with no physics, no maths, and no
clinical training, the problem is solved at the hardest level. Every
specialist audience below that is easier. This test has a binary result:
either a non-specialist can follow the argument, or the theory has not yet
been translated — not simplified, translated.

**Right arm — formal outputs (below):** The individual papers are integration
tests — each must derive its results from the kernel alone. The omnibus and
fractal programme are system integration across 15 domains. Zenodo and Lulu
are deployment: the public, citable, printable record.

The V-model proper — the part that counts as methodology — begins at
Reichenbach and runs right. Everything to the left of the entry point
is prior art that made the kernel possible.
