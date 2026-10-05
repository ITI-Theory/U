# Evidence and Proof {#ch:evidence-proof}

Every chapter of this course has labelled its claims: `kernel-verified`, `derived-under-assumptions`, `simulated`, `empirical-result`, `interpretive`, `open-hypothesis`. This last chapter is about the labels themselves. It explains what each kind of evidence checks and what it cannot check, shows a computer proof and what it proves, and works through the programme's quantum experiment as a laboratory exercise in reading a simulation: how much three successes in three runs really show. It ends with the review protocol that any new claim, from the programme or anyone else, should pass.

**Chapter outline.** [-@sec:ev-relations] Four kinds of relation · [-@sec:ev-proof] What a proof checks · [-@sec:ev-simulation] What a simulation shows · [-@sec:ev-lab] Laboratory: QUANT-EXP-1 · [-@sec:ev-review] Review and replication

::: {.maths-you-need}
Probability, the normal curve and the square-root law (@sec:m-chance-averages, @sec:m-chance-normal); the Boltzmann factor and escape over barriers (@sec:m-chance-boltzmann); energy landscapes (@sec:m-vec-stability).
:::

## Four kinds of relation {#sec:ev-relations}

::: {.learning-objectives}
- distinguish identity, derivation, simulation and analogy;
- match each to the evidence label it can support;
- classify a sentence by the kind of claim it makes.
:::

When a scientist says that two things are "the same", or that one "explains" another, four quite different relations may be meant, and each is checked differently.

- **Identity**: two descriptions are connected by a defined map that carries every quantity of one to a quantity of the other, as in the dualities of @sec:mth-duality. Checked by the map.
- **Derivation**: a result follows from stated assumptions by valid steps. Checked by the assumptions and the algebra, or by a proof checker (`kernel-verified`, or `derived-under-assumptions` when written by hand).
- **Simulation**: code evolved a model and produced an output. Checked by reproducing the run, varying its parameters and comparing it with controls (`simulated`).
- **Analogy**: a structure that helps organise thought without carrying proof (`interpretive`).

Each is useful; none should borrow the authority of another. A neat analogy does not become a derivation by being drawn carefully, and a simulation does not become a measurement of nature by being exact. Measurements of nature are a fifth thing (`empirical-result`): checked by instruments, protocols, statistics and independent replication. A claim not yet checked in any of these ways is an `open-hypothesis`, which is a respectable status if it comes with a test.

::: {.example #ex:ev-classify title="Classifying four sentences"}
Give each sentence its label: (a) "a string fixed at both ends has modes $f_n = nv/2L$"; (b) "the Lean theorem `omega_dm_fraction` proves $\Omega_{\mathrm{DM}} = 3/11$ inside the declared model"; (c) "an exact statevector run reached the Awe basin in the tested cases"; (d) "a change of emotional state behaves like quantum tunnelling".

**Strategy.** Ask what would check each one.

**Solution.** (a) follows from the wave equation and boundary conditions, and is confirmed by every instrument: `derived-under-assumptions` as mathematics, `empirical-result` as physics. (b) is checked by the Lean kernel: `kernel-verified`, about the model. (c) is checked by rerunning the code: `simulated`. (d) has no observable fixed yet: `interpretive`, or an `open-hypothesis` once a measurement is proposed.

**Significance.** The four sentences sit in the same programme and use related words, yet each needs a different kind of check. The label belongs to the sentence, not to the chapter it sits in.
:::

::: {.check-your-learning}
"The programme's fractions match Planck to within a few per cent." Which kind of relation is this, and what label? (Answer: a comparison between a derived number and a measurement; the fractions are `derived-under-assumptions`, and their match is a comparison, not a confirmation, as @sec:dark-near-miss showed.)
:::

## What a proof checks {#sec:ev-proof}

::: {.learning-objectives}
- describe what a proof assistant such as Lean verifies;
- explain why a proved theorem can still be irrelevant to nature;
- recognise the gaps (`sorry`, extra axioms) that weaken a formal proof.
:::

A **proof assistant** is a program that accepts a mathematical statement only when every step of its proof follows from definitions and axioms by rules it can check mechanically. The programme's appendix contains twenty-six Lean files. A small example shows the idea:

```lean
-- The programme's eleven-part count, checked by the kernel
theorem eleven_parts : 4 + 3 + 1 + 3 = 11 := rfl

-- A false statement is rejected:
-- theorem wrong : 4 + 3 + 1 + 3 = 12 := rfl
-- error: Not a definitional equality
```

The first theorem compiles: Lean's **kernel**, a small core trusted to check every proof, confirms it. The second, uncommented, is rejected with an error. (Both were run while this chapter was being written.) A proof assistant cannot be talked into a false step.

What it checks is narrow, and that is its strength. It checks that the **statement** follows from the **definitions**. It does not check that the definitions describe the world. `omega_dm_fraction` proves that, within the file's model, a certain fraction equals $3/11$; whether the dark matter of our universe is $3/11$ is a question for telescopes (@ch:dark-sectors). A reader must therefore audit two things the kernel does not: whether the statement says what the prose claims, and whether the definitions are the right ones.

Two gaps weaken a formal proof. The keyword `sorry` tells Lean to accept a step without proof; it is useful while drafting and fatal in a finished result. Extra **axioms**, statements assumed rather than proved, can make anything provable if they are inconsistent. Lean's `#print axioms` lists everything a theorem rests on, including any `sorry`. In the programme's appendix most files are complete, a handful of older ones still contain `sorry`, and the appendix says which.

::: {.check-your-learning}
A theorem's `#print axioms` lists `sorryAx`. What does that mean? (Answer: somewhere in its proof, or in a result it uses, a step was assumed with `sorry`; the theorem is not yet proved.)
:::

## What a simulation shows {#sec:ev-simulation}

::: {.learning-objectives}
- list what makes a simulation result trustworthy: code, seeds, sweeps, controls;
- bound a success rate from a small number of runs;
- explain why "0 out of 48" and "3 out of 3" carry different weight.
:::

A simulation is an experiment on a model. Like any experiment it is trustworthy when it can be repeated (the code and the random seeds are published), when it is robust (the result survives changes of parameters it should not depend on), and when it is controlled (runs designed to fail do fail). It shows what the model does; whether the model describes the world is a separate question.

Simulations are often run only a few times, because they are expensive. How much can a few runs show? Suppose a method succeeded in all of $n$ independent runs. Starting from no preference for any success rate, the probability that its true success rate exceeds $p$ after $n$ successes out of $n$ is $1 - p^{n+1}$. For $n = 3$ this gives a 95 per cent lower bound of

$$p_{95} = 0.05^{1/4} = 0.47.$$ {#eq:ev-three-of-three}

{{Visualize | eq:ev-three-of-three | distribution:quantum | pdf="x^3"; x=[0,1]; shade=[0.4729,1]; expect_prob=0.95; xlabel="true success rate"; ylabel="probability density after 3 of 3"; label=fig:ev-three-of-three; height=28% }} What three successes in three runs say about the true success rate. Rates near one are favoured, but anything above $0.47$ is plausible at the 95 per cent level (shaded). Three runs are encouraging, not decisive.

Failures count the other way. If a method failed in all of $48$ runs, its success rate is below about $3/48 = 6\,\%$ at 95 per cent confidence, the **rule of three**: zero events in $n$ trials put the rate below about $3/n$.

$$p_{\max} \approx \frac{3}{n}$$ {#eq:ev-rule-of-three}

{{Visualize | eq:ev-rule-of-three | distribution:generic | pdf="(1-x)^48"; x=[0,0.2]; shade=[0,0.0593]; expect_prob=0.95; xlabel="true success rate"; ylabel="probability density after 0 of 48"; label=fig:ev-zero-of-48; height=28% }} What forty-eight failures say. The success rate is almost certainly small: below $6\,\%$ at the 95 per cent level (shaded), close to the rule-of-three estimate $3/48$.

::: {.example #ex:ev-how-many-runs title="How many runs are enough?"}
A simulated method succeeds in $190$ of $200$ bootstrap runs. Estimate its success rate with a 95 per cent interval.

**Strategy.** The observed rate is $p = 0.95$. The standard error of a proportion is $\sqrt{p(1-p)/n}$ (@sec:m-chance-normal), and 95 per cent is about $1.96$ standard errors.

**Solution.** $\sqrt{0.95 \times 0.05/200} = 0.015$, so the interval is $0.95 \pm 0.03$.

**Significance.** Two hundred runs pin the rate to within three percentage points; three runs pin it only to "above $0.47$". The programme's list of remaining experiments includes exactly such a bootstrap of two hundred trajectories.
:::

::: {.check-your-learning}
A method never fails in $20$ runs. Using the rule of three, below what failure rate can you claim it lies? (Answer: about $3/20 = 15\,\%$; the exact 95 per cent bound is $14\,\%$.)
:::

## Laboratory: QUANT-EXP-1 {#sec:ev-lab}

::: {.learning-objectives}
- describe what QUANT-EXP-1 simulated and what it found;
- explain from the Boltzmann factor why cold classical dynamics stays trapped;
- design the controls and sweeps that would strengthen or weaken the result.
:::

@sec:human-programmes-human-model introduced the programme's quantum experiment [@P2]. Its model has eight emotional modes; a strongly negative coupling between Fear and Awe, $W_{\mathrm{Fear,Awe}} = -10$, builds a high ridge between their valleys, and the state starts in Fear. Three kinds of dynamics are compared on the same landscape: classical noisy dynamics at a low temperature ($T = 0.02$), at a high one ($T = 1.5$), and quantum annealing, an exact simulation of the full $256$-component quantum state of eight two-level modes, slowly switching from a quantum mixing term to the landscape.

$$U(x) = (x^2 - 1)^2 - 0.3\,x$$ {#eq:ev-toy-landscape}

{{Visualize | eq:ev-toy-landscape | energy-landscape:soma | U="(x^2 - 1)^2 - 0.3*x"; x=[-1.7,1.7]; ball=-0.96; barrier=true; label=fig:ev-landscape; height=28% }} A one-dimensional cartoon of the experiment's problem: the state (ball) sits in a shallower valley (Fear) separated by a ridge from a deeper one (Awe). The real model has eight dimensions; the cartoon shows only the shape of the difficulty.

The results: cold classical dynamics stayed in Fear in all $48$ runs; hot classical dynamics crossed, but only by washing out the landscape's structure; quantum annealing reached the Awe basin in all three barrier strengths tested ($W = -8, -10, -12$). Why cold dynamics fails follows from @sec:m-chance-boltzmann: the waiting time to cross a barrier $\Delta U$ grows as $e^{\Delta U/kT}$.

$$t_{\mathrm{escape}} \propto e^{\Delta U/kT}$$ {#eq:ev-arrhenius}

{{Visualize | eq:ev-arrhenius | function-plot:soma | f="exp(1/T)"; var=T; x=[0.02,1.5]; logy=true; vline="0.02, 1.5"; xlabel="noise temperature $T$ (in units of the barrier height)"; ylabel="relative waiting time to cross"; label=fig:ev-arrhenius; height=28% }} Waiting time to cross a barrier against noise temperature. At the experiment's cold setting ($T = 0.02$, left dotted line) the wait is about $10^{21}$ times longer than at the hot one ($T = 1.5$): cold classical dynamics is trapped for any practical run length.

What the experiment establishes, and what it does not:

| Statement | Label |
|:--|:--|
| In the eight-mode model, cold classical dynamics stays trapped; quantum annealing reaches the target basin in the tested cases | `simulated` |
| The landscape's valleys are emotional states | `interpretive` (the model's reading, @ch:human) |
| Nervous systems use quantum dynamics of this kind | `open-hypothesis`, untested; no hardware or brain data are involved |
| Any clinical implication | none claimed; hypotheses only, requiring ethics approval and controlled evidence |

::: {.example #ex:ev-design-controls title="Designing the controls"}
Propose two negative controls for QUANT-EXP-1: runs that *should* fail if the result is genuine.

**Strategy.** Remove the ingredient the claim credits, or the obstacle it overcomes, and check the outcome changes as predicted.

**Solution.** Control A: switch off the quantum mixing term while keeping the same schedule; the anneal should then behave classically and stay trapped. Control B: remove the ridge ($W_{\mathrm{Fear,Awe}} = 0$); cold classical dynamics should now cross easily, showing the classical code is not simply broken.

**Significance.** A result that survives its controls is far stronger than one that has only succeeded. Both controls are on the programme's list of remaining experiments, with a barrier sweep from $W = -6$ to $-14$, a noise-equivalence curve (the classical temperature that matches the quantum success rate), two hundred bootstrap trajectories and a published table of fixed seeds.
:::

::: {.check-your-learning}
If the quantum success rate stays high from $W = -6$ to $W = -14$ while the cold classical rate stays zero, which label does the result earn, and which does it still not earn? (Answer: a stronger `simulated` result; it still says nothing `empirical` about nervous systems.)
:::

## Review and replication {#sec:ev-review}

::: {.learning-objectives}
- apply the six acceptance questions to a level claim;
- classify a new claim by its difference class;
- explain why independent replication is the final check.
:::

The programme's synthesis chapter of the Field Atlas reduces every level to one sentence, the **response grammar**: a source $J$ drives a system whose operator and boundary define a kernel $G$, and an observer records a projection $O$ of the response, plus noise:

$$y = O\left[\int G_B(x, x')\,J(x')\,dx'\right] + \epsilon.$$ {#eq:ev-grammar}

Every row of the course, from the guitar string to the cosmic microwave background, has filled these slots. The grammar claims a shared *form* of description, not a shared *substance*: `interpretive` as an organising idea, and testable only row by row. A level claim should answer six questions, and its label follows from which it can answer: what is the state variable; what operator or rule acts on it; what boundary closes it; what source drives it; what observable is compared with data; and what result would make it weaker?

New claims also differ in what they add. The programme sorts them into **difference classes**:

| Class | The claim adds | Example | Hardest check |
|:--|:--|:--|:--|
| A | a new number | $\Omega_{\mathrm{DM}} = 3/11$ | precision measurement; look-elsewhere odds |
| B | a new behaviour | quantum crossing of a classical barrier in the model | controls, sweeps, replication |
| C | a link across scales | one response grammar at every level | a prediction a domain baseline misses |
| D | a reinterpretation | an emotional state read as a valley | an observable that distinguishes it |
| E | the standard limit preserved | local general relativity unchanged | every existing test still passed |

Finally, nothing in science is settled by its authors alone. **Independent replication** means another group, with its own code, data or instruments, repeats the check and gets the same answer. The programme keeps a replication ledger for its papers; at the time of writing every row is pending. That is not a weakness to hide but the honest state of a young programme, and the most useful thing a reader of this course could do is to fill one of its rows.

::: {.going-further}
Two habits from modern research protect against fooling oneself. **Preregistration** states the analysis, the success criterion and the failure threshold before the data are seen, which removes the temptation to choose them afterwards. **Blind analysis** hides the answer from the analysts until the method is fixed. Both are standard in particle physics and clinical trials, and both apply directly to the programme's proposed tests: fix the poles' fitting method before the second session (@sec:freq-programme), and fix any correction to $7/11$ before comparing it with Planck (@sec:dark-tests).
:::

::: {.soma-machine}
The Soma Machine shows every level with its evidence badges. **Try it:** `#tour=whats-different` walks through the app's thirteen questions ("Is an emotion a particle?", "Why do starlings turn together?"), each shown with its evidence label. Practise classifying each one before the label appears.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
axiom
: a statement assumed, not proved; a proof is only as good as its axioms

difference class
: what a new claim adds: a number, a behaviour, a cross-scale link, a reinterpretation, or the standard limit

independent replication
: another group repeating a check with its own means

kernel (proof assistant)
: the small trusted core that checks every step of a formal proof

negative control
: a run designed to fail if the claimed effect is genuine

preregistration
: stating the analysis and the failure criterion before seeing the data

rule of three
: zero events in $n$ trials bound the rate below about $3/n$ at 95 per cent

`sorry`
: a Lean keyword that accepts a step without proof
:::

## Key Equations {.unnumbered}

::: {.key-equations}
After $n$ successes in $n$ runs
: $P(\text{rate} > p) = 1 - p^{n+1}$; $\ p_{95} = 0.05^{1/(n+1)}$

Rule of three
: $p_{\max} \approx 3/n$ after $0$ of $n$

Proportion
: standard error $\sqrt{p(1-p)/n}$

Escape time
: $t \propto e^{\Delta U/kT}$

Response grammar
: $y = O[\int G_B J] + \epsilon$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:ev-relations]** Identity, derivation, simulation, analogy and measurement are different relations with different checks; the label belongs to the sentence.

**[-@sec:ev-proof]** A proof assistant checks that statements follow from definitions, not that definitions fit the world; `sorry` and extra axioms are gaps.

**[-@sec:ev-simulation]** Simulations need code, seeds, sweeps and controls. Three of three bounds a rate above $0.47$; zero of forty-eight bounds it below $6\,\%$.

**[-@sec:ev-lab]** QUANT-EXP-1 is a `simulated` result about a model; its biological reading is an `open-hypothesis` and it makes no clinical claim.

**[-@sec:ev-review]** Six questions decide a level claim's label; difference classes say what a claim adds; independent replication is the final check, and every row of the programme's ledger is still open.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why can a neat analogy not be promoted to a derivation by drawing it well?
2. What does Lean check, and what must a human reader still audit?
3. Why do three successes in three runs say less than they seem to?
4. Explain, using the Boltzmann factor, why the cold classical runs never crossed the ridge.
5. Design one more negative control for QUANT-EXP-1.
6. Which difference class is hardest to establish, and why?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:ev-classify-five title="Five more sentences"}
Label each: (a) "rotation curves are flat far beyond the visible disc"; (b) "$4 + 3 + 1 + 3 = 11$, checked in Lean"; (c) "the Earth's slowest mode has $Q \approx 500$"; (d) "a group's mood is a field"; (e) "the programme's poles will predict a second session's physiology".
:::

::: {.solution}
**Strategy.** For each, ask what would check it.

**Solution.** (a) `empirical-result`. (b) `kernel-verified`. (c) `empirical-result`. (d) `interpretive`. (e) `open-hypothesis`, with its test stated in the sentence.

**Significance.** Two measurements, one proof, one reading and one bet: a healthy mix, as long as no sentence borrows another's label.
:::

::: {.problems #pr:ev-five-of-five title="Five of five"}
How does the 95 per cent lower bound on a success rate change if a method succeeds in $5$ of $5$ runs instead of $3$ of $3$?
:::

::: {.solution}
**Strategy.** $p_{95} = 0.05^{1/(n+1)}$.

**Solution.** For $n = 5$: $0.05^{1/6} = 0.61$, up from $0.47$.

**Significance.** Each extra success helps, but slowly: to push the bound above $0.9$ needs about $28$ straight successes, since $0.05^{1/29} = 0.90$.
:::

::: {.problems #pr:ev-arrhenius-ratio title="Cold and hot"}
Using $t \propto e^{\Delta U/kT}$ with $\Delta U = 1$ in model units, by what factor is the waiting time at $T = 0.02$ longer than at $T = 1.5$?
:::

::: {.solution}
**Strategy.** Divide the two exponentials: $e^{1/0.02 - 1/1.5}$.

**Solution.** $e^{50 - 0.67} = e^{49.3} = 2.7 \times 10^{21}$.

**Significance.** No simulation runs long enough to see a crossing at the cold setting, which is why "stuck in every run" is the expected classical result and a clean baseline for the quantum comparison.
:::

::: {.problems #pr:ev-lean-audit title="What did Lean prove?"}
For each statement, say whether a compiled Lean theorem could establish it: (a) $7 + 3 + 1 = 11$; (b) the universe's dark-energy fraction is $7/11$; (c) a theorem's proof uses no `sorry`; (d) the definitions in a file match the physics they are named after.
:::

::: {.solution}
**Strategy.** Lean checks statements against definitions and axioms, and reports what a proof rests on.

**Solution.** (a) yes; (b) no, that is a measurement; (c) yes, via `#print axioms`; (d) no, that needs a human audit of the definitions.

**Significance.** The two "no" answers are where the scientific work lies; the two "yes" answers are where Lean removes doubt completely.
:::

::: {.problems #pr:ev-bootstrap title="Two hundred trajectories"}
In a planned bootstrap of $200$ trajectories, the quantum method succeeds $176$ times. Give the success rate with a 95 per cent interval, and say whether a classical rate of $0.80$ lies inside it.
:::

::: {.solution}
**Strategy.** $p = 176/200$; standard error $\sqrt{p(1-p)/n}$; interval $\pm 1.96$ standard errors.

**Solution.** $p = 0.88$, standard error $0.023$, interval $0.88 \pm 0.045$, that is $0.835$ to $0.925$. A rate of $0.80$ lies outside it.

**Significance.** With two hundred runs, a difference of eight percentage points becomes detectable. Comparing the quantum rate with the classical rate at the noise-equivalent temperature is exactly the planned noise-equivalence test.
:::
