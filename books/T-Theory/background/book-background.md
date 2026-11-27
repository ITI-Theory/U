---
title: "[T]-Theory: Background"
subtitle: "Book 0: what to know before Book 1"
author: "Alistair Johnson"
orcid: "0009-0007-2194-0850"
institute: "Independent Researcher, Zurich, Switzerland"
date: "2026"
lang: en-GB
abstract: |
  [T]-Theory is new, so a reader cannot simply ask a search engine or a chat assistant about it. They can
  ask about the ideas it is built from: a Green's function, Kramers' escape over a barrier, Kaluza and
  Klein's fifth dimension, Gestalt therapy. What no general source can give is the bridge: how the theory
  uses each idea, where, and how well established that use is. This book collects those bridges, by
  subject. It is Book 0 of the series: what to know before Book 1, and the course's companion. Its record
  is the programme's own conversations, compiled by the Universal Semantic Compiler; every explanation is
  checked before it is printed.
---

# How to read this book {.unnumbered}

Each chapter is a subject around the theory. Its entries, as they are written, give the standard idea first
(with a reference a library can supply), then its role in [T]-Theory (the papers, the proofs, the method's
verdict), then its evidence label. The conversations behind the programme discussed all of these at
length, and not always correctly: the compiler's checks found several explanations that were wrong, and
an entry follows the check, not the conversation.

Below each chapter's introduction is the record it is written from: the threads of the conversations on
that subject, laid out by the build from the conversations' affidavits, with what became of each. Nothing
is quoted from the conversations, and personal threads are never listed. The entries themselves are being
written (ISS-134); the record grows as the conversations are triaged.

# The theory's own ideas

The ideas [T]-Theory adds: the field and its dimensions, the zoom across scales, the Televator's sideways step into the mind. Each entry will say which standard idea it rests on (the next chapters) and where the papers state it.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="TTheory,TTheoryCore,Televator" flat="true"}
:::

# Physics, Einstein and the equations

The physics the theory borrows: fields and their Green's functions, waves and their damping, Kaluza and Klein's extra dimension, the cosmological budget, and Einstein's own route to E = mc², which the compiler was tested on. Each entry: the standard idea with a textbook reference, then its role in the theory, then the method's verdict where there is one (sherlock/Fishing).

## Green's functions and the screened potential {#sec:bg-green}

**The idea.** A Green's function is a system's response to a point source; once it is known, the response
to any source is a sum of point responses. For the static operator with a mass term, $(\nabla^2 - k^2)G =
-\delta$, the response is the screened (Yukawa) potential $e^{-kr}/4\pi r$, which becomes Newton's $1/r$
as $k \to 0$ [@yukawa1935interaction]. With the opposite sign, $(\nabla^2 + k^2)G = -\delta$, the response
oscillates, $\cos kr/4\pi r$: a wave, not a decay.

**In [T]-Theory.** The master equation is of this kind, and the programme reads gravity as the field's static
response to a mass.

**The method's verdict.** `COID-GRAV-1`: exploratory, scope S1, five open assumptions. The first is the sign:
the documents write $+k^2$ (a wavenumber, oscillation) where gravity needs $-k^2$ (a mass, decay), and the
equation census found the source term written with three different signs. `COID-GRAV-2` adds the bound on a
massive graviton from gravitational waves, $m_g \le 1.27 \times 10^{-23}$ eV/$c^2$, which limits how large $k$
can be where gravity is measured. Labels: the physics `derived-under-assumptions`; the reading
`open-hypothesis`.

## The Klein-Gordon equation and memory {#sec:bg-kg}

**The idea.** $(\partial_t^2/v^2 - \nabla^2 + k^2)\varphi = 0$ is the wave equation of a field with mass $k$:
waves with $\omega^2 = v^2(p^2 + k^2)$. In imaginary (Euclidean) time $\tau$ the same operator gives
correlations that fall off as $e^{-kv\tau}$.

**In [T]-Theory.** The time-dependent master equation and its memory kernel $K(\tau) = K_0 e^{-\tau/\tau_m}$,
$\tau_m = 1/kv$.

**The method's verdict.** `COID-KG-1`: exploratory, S1, two open assumptions. The Lean shows that the kernel
does not solve the real-time equation: it is the field's Euclidean correlation, right in imaginary time and
wrong when read as a memory in real time, which would need a damping term the master equation does not have.
Labels: the finding `kernel-verified`; the memory reading `open-hypothesis`.

## A fifth dimension: Kaluza and Klein {#sec:bg-kk}

**The idea.** A massless field in five dimensions, with one dimension curled into a small circle of radius
$R$, appears in four dimensions as a tower of fields with masses $n/R$ [@kaluza1921unitatsproblem;
@klein1926quantentheorie]. On an interval, the orbifold $S^1/\mathbb{Z}_2$, the same holds with a wall at each
end [@horava1996].

**In [T]-Theory.** The master equation's mass term $k$, with the limbic dimension D8 as the orbifold.

**The method's verdict.** `COID-KK-1`: exploratory, S1, two open assumptions: which fields cross the bulk and
which stay on the walls, and a radius below the torsion-balance bound. If the reduction is accepted, it is
the witness for the sign of $k^2$ above: one row's theorem closing another's open assumption. Label
`open-hypothesis`.

## The cosmological budget {#sec:bg-budget}

**The idea.** In Friedmann's cosmology the energy fractions add to one, $\Omega_\Lambda + \Omega_m + \Omega_r
+ \Omega_K = 1$. Planck 2018 measures $\Omega_\Lambda = 0.6847 \pm 0.0073$ [@planck2018cosmology].

**In [T]-Theory.** Dimension counting: $\Omega_\Lambda = 7/11$, $\Omega_c = 3/11$, $\Omega_b = 1/22$.

**The method's verdict.** `COID-COSMO-1` is falsified: $7/11 = 0.636$ lies 6.6σ below Planck, and the three
fractions sum to $21/22$, a shortfall. `COID-COSMO-2` pre-registers the flat closure, $\Omega_\Lambda = 15/22
= 0.682$, within 0.4σ of Planck; but a grid of 22nds comes that close to any value about 13 per cent of the
time, so the next surveys decide. `COID-COSMO-3`, the fractions fixed at every epoch, is falsified: it would
leave the universe no decelerating era. Labels: the arithmetic `kernel-verified`; the counting
`open-hypothesis`.

## Tunnelling: Gamow and WKB {#sec:bg-wkb}

**The idea.** A quantum particle crosses a barrier it could not cross classically, with probability $T
\approx \exp(-\tfrac{2}{\hbar}\int\sqrt{2m(V - E)}\,dx)$; Gamow used it to explain alpha decay
[@gamow1928quantentheorie].

**In [T]-Theory.** Tunnelling between the wells of the limbic double well $V = W(x^2 - 1)^2$, and the
QUANT-EXP-1 simulation.

**The method's verdict.** `COID-WKB-1`: exploratory, S1, three open assumptions: units with $m = \hbar = 1$
and the energy at the well's bottom (both assumed, as in the standard calculation), and $e^{-2S}$ called an
amplitude, which is a probability ($|e^{-S}|^2$): a word to correct. Label `open-hypothesis`.

## Escape over a barrier: Kramers {#sec:bg-kramers}

**The idea.** A particle pushed about by noise of strength $D$ escapes over a barrier of height $W$ at a
rate proportional to $e^{-W/D}$, with a prefactor that depends on the friction $\gamma$ [@kramers1940;
@hanggi1990reaction].

**In [T]-Theory.** The persistence of a trauma state: a state held in a deep well.

**The method's verdict.** `COID-KRAMERS-1`: exploratory, S1, three open assumptions: $\gamma = 1$ (the
summary sheet's formula omits it), $W \gg D$, and that a clinical state is a coordinate in such a well,
which is interpretive. Label `open-hypothesis`.

## Mass and energy: Einstein, 1905 {#sec:bg-einstein}

**The idea.** A body that emits light of energy $L$ loses mass $L/c^2$ [@einstein1905inertia], confirmed to
four parts in $10^7$ [@rainville2005direct].

**In [T]-Theory.** The compiler's calibration: before it was pointed at the theory, it was given Einstein's
argument, and it found the result and the lemma his first proof left unstated (the course, chapter 15).

**The method's verdict.** `COID-EINSTEIN-1905`: validated, scope S3, every assumption witnessed. Label
`kernel-verified` for the derivation, `empirical-result` for the measurement.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Physics,Einstein,EinsteinBacktest,Equations" flat="true"}
:::

# Mind, body and the clinic

The clinical and psychological ideas the theory reads in field terms: trauma and its persistence, attunement, autism and ADHD, Gestalt therapy, the emotions of music (BRECVEMA), and the uses in teaching. Models and readings, not medical advice: every entry carries its evidence label.

## Locking: Adler {#sec:bg-adler}

**The idea.** Two oscillators with frequencies $\Delta\omega$ apart lock when their coupling $K$ is strong
enough: Adler's equation $\dot\varphi = \Delta\omega - K\sin\varphi$ has a fixed point when $|\Delta\omega|
< K$ [@adler1946locking].

**In [T]-Theory.** Rapport as frequency locking between two people's rhythms.

**The method's verdict.** `COID-ADLER-1`: exploratory, S1, two open assumptions: that rapport is a phase
difference between two people's rhythms, and that $K$ grows with the coupling the theory names. Label
`open-hypothesis`; not medical advice.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Clinical,Teaching" flat="true"}
:::

# Philosophy and history

Discovery or invention, analogy or identity, what counts as evidence: the philosophy of science the programme leans on, and the history it learns from.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Philosophy,History" flat="true"}
:::

# Music and the arts

The music behind the Soma Machine's emotional score: how a score carries feeling, and the tools the programme composes with.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="Music" flat="true"}
:::

# Knowledge, proof and machines

What the compiler stands on: Lean and its proofs, OpenCyc's common sense, documents compiled to models, and the adversary that tries to break them.

**Where it was discussed.** The conversations' threads on these ideas, as the record has them now:

::: {.chronicle concept="OpenCyc,OpenCycInLean,NextKB,Lake,LeanModelOfDocument,Sherlock,USC,MTC,Moriarty,EpistemicGrades,CombineModels" flat="true"}
:::
