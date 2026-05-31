# Chapter 20 — Synthesis: One Sentence, In Increasing Detail

\begin{quote}\itshape
The whole book, distilled, in a single sentence, then unpacked at
five increasingly technical levels.
\end{quote}

\vspace{1em}

A reader who has reached this chapter has read several hundred pages.
The book has moved from ripples on water to G$_2$ holonomy and back. A
chapter at the end that distils the whole argument is owed.

## §20.0  Level 0 — for someone who has never read the book

> *The same kind of pattern is the same kind of pattern. A wave is a
> wave. Your body is a wave too.*

## §20.1  Level 1 — for an intelligent reader who skipped to this chapter

The universe, from its largest scale to its smallest, consists of
*fields* — quantities defined at every point in space and time — and
the disturbances in those fields, which we call *waves*. A surprising
amount of what the universe does, at every scale, is wave behaviour.
The galaxies' spiral arms are waves. The interior of stars rings like
a bell. The interior of planets rings like a bell. The atmosphere and
oceans support enormous slow waves that determine climate. Living cells
maintain themselves by a network of biochemical waves. Hearts beat by a
synchronised wave across cardiac muscle. Brains think by waves of
synchronous neural firing.

A *person* is, at every scale, a coupled wave system. The book argues
that the right way to think about emotional and behavioural states is
not as moods that come and go but as *attractors* of this wave system —
stable configurations into which the system falls, persists, and from
which it eventually departs. Eight such attractors recur reliably
across cultures, individuals, and historical eras: calm, fight, flight,
freeze, flow, joy, grief, and hypervigilance. The book makes a specific
mathematical claim — that these eight modes correspond to the eight
generators of the exceptional Lie group E$_8$ — and proposes that the
underlying structure of the human soma field is a particular
seven-dimensional manifold with G$_2$ holonomy, of the kind that arises
in M-theory compactifications.

The framework is testable. The book contains a quantum-mechanical
experiment whose results favour the framework over its main classical
alternatives. It also contains a clinical replication protocol that any
adequately-resourced research team could run. The framework will
ultimately succeed or fail by these tests, not by aesthetic appeal.

## §20.2  Level 2 — for a working scientist in any field

Soma Field Theory (SFT) is a tensor-valued generalisation of the
Hopfield network, formulated as a Langevin dynamical system on a
seven-dimensional manifold with G$_2$ holonomy. The attractor structure
of the dynamics corresponds, via the ADE classification of singularities
in the manifold's ALE space, to the root system of E$_8$. The eight
Cartan generators of E$_8$ are identified with the eight named modes
of phenomenological human experience.

The framework makes four kinds of testable prediction.

*First*, *clinical predictions*: that interventions targeting the
autonomic and tissue layers of the soma-field substrate produce
durable changes that cognitive interventions alone do not, and vice
versa. The clinical replication protocol of Appendix B specifies the
randomised trial design.

*Second*, *physical predictions*: that quantum-mechanical effects
contribute non-trivially to certain transitions between soma-field
attractors that classical thermodynamics cannot reach within the
relevant time window. The QUANT-EXP-1 experiment (Chapter 13b)
constitutes the first empirical test, with results favouring the
framework. Replication is ongoing.

*Third*, *neurological predictions*: that the spectral structure of
brain oscillations during transitions between soma-field attractors
should show specific signatures derivable from the framework's
Hamiltonian. These predictions are not yet experimentally tested.

*Fourth*, *aesthetic predictions*: that music, considered as a coupling
operator on the soma field, produces effects whose structure can be
decomposed into entrain-destabilise-release primitives with specific
quantitative signatures in autonomic state. Worked examples in
Chapter 12d.

The framework is approximately 35 % formalised in Lean 4. Substantial
work remains in the formal track. The empirical track has eleven
published papers on Zenodo, of which three are at the 9+ quality grade
with replication pending.

## §20.3  Level 3 — for someone who has read the book carefully

The deepest claim of the book is that the structural invariance of
wave physics across scales — what we have called the fractal claim —
is not metaphor. It is a consequence of the wave equation being a
*linear, second-order, hyperbolic partial differential equation*, and
those properties being preserved under the renormalisation group flow
that takes us from the Planck scale to the cosmological scale. Wave
behaviour is, in a precise sense, the *generic* low-energy behaviour of
a quantum field theory, and is therefore the same low-energy behaviour
across the substrates that host the underlying QFT.

The soma field is not a separate field. It is the low-energy effective
description of the coupled-oscillator system that a living human is.
The eight modes are not new entities; they are the named local minima
of the effective potential. The G$_2$ compactification is not a free
parameter; it is the unique seven-dimensional manifold structure that
gives the correct attractor count and inter-attractor coupling.

This is the framework's strongest claim and the one that, if false,
sinks the rest. The strongest version of the falsification: produce a
human population in which the eight-attractor structure does not
recur, or produce a careful empirical analysis showing that the
inter-attractor transition structure does not match the E$_8$
root-system predictions, and the framework is wrong.

The framework's weakest claim — the one that survives even if the
strong version is wrong — is that *thinking of human soma-field state
in terms of coupled-oscillator dynamics is more useful than thinking
of it in terms of discrete labels*. This weak claim is, by 2026,
substantially uncontroversial in the trauma-informed and
contemplative-practice literatures, and the framework's contribution
is to make explicit what was already implicit there.

The book contains, in addition, a sustained argument that the
mathematical structure that has been developed independently in
physics (gauge symmetries, fibre bundles, exceptional Lie groups),
biology (reaction-diffusion, Hopfield networks, attractor dynamics),
and contemplative practice (the named modes of consciousness, the
attractor-like character of meditative states) is the *same
mathematical structure*. This is the book's wave-atlas claim made
mathematically precise.

## §20.4  Level 4 — for the next decade of research

The framework's open problems, in order of expected difficulty:

*Independent clinical replication* of the framework's eight-mode
predictions across at least three trauma-focused therapy centres. The
protocol is published in Appendix B. The data analysis pipeline is
deposited on Zenodo. The replication ledger is open.

*Independent quantum replication* of QUANT-EXP-1 on actual quantum
hardware (the published experiment used IBM Aer and quantum simulators
on bounded problem sizes). D-Wave annealers are available; the
problem is to scale the QUANT-EXP-1 Hamiltonian to a hardware embedding
without losing the qualitative structure of the result.

*Completion of the Lean formalisation* to the point at which the
core theorems (soma-field bundle existence, E$_8$ attractor structure
under suitable conditions, tunnelling rate bounds) are machine-checked.
The current 35 % covers the easier early portions.

*Establishment of the G$_2$ compactification claim*. This is the
deepest open problem and the one most likely to require revision of
the framework. Specifically: producing the seven-dimensional manifold
on which the soma-field dynamics live as a *derived* rather than
*postulated* object, by reduction from a more fundamental
neurodynamical Lagrangian. This has not been done.

*External evaluator engagement*. The framework needs sustained
critical engagement from mathematicians (on the geometry),
neuroscientists (on the empirical adequacy), and clinical researchers
(on the trial results). The author's role is to publish, respond, and
revise. The framework's role is to survive or not survive that
engagement.

## §20.5  Level 5 — for the author, ten years from now

You are reading this in 2036. Your daughter is twenty-four. You are
sixty-eight. The framework has either succeeded, failed, or is still
in litigation. Which of those three you find yourself in determines
what you should do next.

If it has *succeeded*: the protocol is being run by groups you do not
know personally. The Lean formalisation is complete. The G$_2$
compactification is derived. There are graduate students at three
institutions working on extensions. Your job is to stay out of their
way and keep writing what you actually care about, which is probably
no longer this framework.

If it has *failed*: at least some predictions did not replicate. You
have already said publicly which ones. You have already proposed the
specific revisions the failures require. The framework is not the same
framework it was in 2026. It is a different framework, with the
features the failures left intact. This is also a success — it is the
success of *science working*. Take it.

If it is still in *litigation*: the trials have not yet completed, the
formalisation is partial, the geometry is conjectural, and the
arguments continue. You are probably tired. The argument is probably
no longer mostly your work, in the sense that other people have taken
it up and you are now responding to their reformulations. Take the
opportunity to step back. You have done your part. The framework will
or will not survive the next ten years on its merits, not on yours.

Whichever it is: the daughter is twenty-four. The art movement is or
is not still going. The album is or is not released. You are or are
not still walking up to the Klöntalersee viewpoint each summer. The
book that this is the synthesis chapter of is or is not still in
print. Some of these things matter much more than others. The
hierarchy of mattering — daughter, family, the small set of people who
have stayed close, the work, the framework, the wrapper — that
hierarchy is the same in every plausible future. The framework is
fourth or fifth on the list. Behaving accordingly was, when you wrote
this in 2026, already the goal.

\bigskip

\hfill *A.J., 2026* \\
\hfill *(to A.J., 2036)*
