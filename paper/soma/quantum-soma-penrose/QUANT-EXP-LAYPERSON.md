# It Tunnels — What Does That Actually Mean?

## A Plain-Language Guide to QUANT-EXP-1

*For anyone who heard "quantum tunneling" and thought: cool word, no idea.*

---

## 1. The problem in one sentence

Imagine you are stuck at the bottom of a valley, surrounded by a steep hill.
You want to reach another valley on the other side — a much deeper, better valley.
Normal walking (classical physics) means you must climb the hill first.
If the hill is too steep, you just stay stuck. Forever.

That is what trauma does to the nervous system.
The body learns a pattern — say, *Fear* — and that pattern becomes a very stable valley.
To reach *Awe*, or *Safety*, or *Connection*, you would have to climb a steep hill first.
And the body, running on its ordinary rules, cannot do that.

So the question becomes: **is there another way across?**

---

## 2. What quantum mechanics says

In the quantum world, particles do not have to climb the hill.
They can go *through* it.
This is called **quantum tunneling**. In physics it is not a metaphor — it is how tunnel diodes work, and it contributes to nuclear fusion in the sun.
In this document, applying the word to trauma is a model translation, not a claim that brains literally tunnel quantum mechanically.
It is how the sun burns.
It is real.

The quantum particle does not choose a single path.
It exists as a **wave spread across all possible paths at once**.
Some of those probability waves leak through the hill and emerge on the other side.
No climbing required.

---

## 3. What this experiment did

We built a tiny model of the mind using **8 emotional modes**:
Safety, Fear, Curiosity, Awe, Grief, Language, Preverbal, Shame.

We then created a *landscape*:
- **Fear** is a local valley: easy to get into, stable once you are there.
- **Awe** is a deeper target valley in the model.
- Between them is a **steep anti-cooperative hill** (mathematically: W[Fear, Awe] = −10).

We ran three experiments:

| Experiment | Result |
|---|---|
| Classical cold dynamics (T = 0.02) | **Stuck.** Stayed in Fear every single time across all seeds. |
| Classical hot dynamics (T = 1.50) | **Floods.** Crosses, but only by making everything noisy and chaotic — destroying all the structure. |
| Quantum annealing (exact statevector simulation) | **Tunnels in the model.** Reaches the Awe basin without adding classical thermal noise. |

---

## 4. The wave pictures

The new figures show the **probability wave** of the quantum system over time.

Think of it like this: at the start, the quantum mind is a wave spread everywhere.
As the annealing proceeds (as the transverse field slowly switches off and the classical landscape switches on), the probability mass *concentrates preferentially in Awe-dominant states*.

The **green wave** in the plots is the quantum occupancy of Awe-dominant states.
It rises smoothly, wave-like, across the annealing schedule.
The **red line** (classical cold) never moves.
The **orange line** (classical at T*) matches the quantum result — but only by turning up the temperature to a specific value for each barrier height.

The **noise-equivalence curve** answers: *how much noise does a classical system need to match the transverse-field result?*
Answer: in this model, more than the tested cold dynamics can use while preserving the same attractor structure.

---

## 5. What does this mean — first-ever Quantum Intelligence?

### The "modern AI" comparison

Most AI (GPT, Claude, any language model, any deep learning system) is **classical**.
It runs on deterministic transistors.
It finds patterns by gradient descent — that is, by rolling downhill in a loss landscape.
It is, in the mathematical sense, a *classical* Langevin-like process.
It gets stuck in local minima.
It can be nudged out by noise (dropout, temperature in sampling) — but that is the *hot classical* strategy: flood the landscape.

Flooding works. But flooding loses structure.

### What quantum intelligence would be

A quantum system traverses the landscape differently.
It does not descend — it **superimposes**.
It holds all possible paths simultaneously, and the probability wave constructively interferes with the deepest attractor.

This experiment is a small, exact statevector simulation showing that the modelled transverse-field dynamics operating on the soma-field attractor landscape:

1. **Reaches basins that cold classical dynamics cannot reach at all.**
2. **Does so without the flooding that hot classical dynamics require.**
3. **Does so robustly, across a wide range of barrier strengths.**

Is this "the first Quantum Intelligence"? Probably too strong for a journal paper.
But here is what we can say precisely:

> *The soma-field model of emotional dynamics has a topological structure that the tested low-temperature classical Langevin dynamics does not traverse. The transverse-field simulation traverses that structure. If emotional intelligence includes the capacity to move between topologically separated states, then this model gives quantum dynamics that capacity and does not give it to the tested cold classical baseline.*

That is a precise, falsifiable, simulation-verified statement.

---

## 6. The therapy translation

If the soma-field model is even approximately right about how the nervous system works, the clinical translation is a hypothesis only:

- **Cognitive-behavioural therapy** (CBT) can be represented, in this analogy, as a smooth landscape-reshaping process.
  Whether that captures any given therapy is an empirical and clinical question.

- **Flooding / exposure therapy** can be represented as a higher-arousal process.
  This is not treatment advice and not an efficacy claim.

- **What THERAPY-2 says in the axiom registry**: a smooth intervention does not change winding number in the model. It motivates, but does not establish, research into non-smooth or topologically distinct clinical processes.
  Clinical analogues are hypotheses only; interventions should not be treated as candidates here without ethics approval, controlled evidence, and explicit non-treatment disclaimers.

  These are not clinical recommendations. They are candidate analogues whose mechanisms would require controlled evidence.
  The simulation measures a model-level difference.

---

## 7. One-line summary

> **Quantum tunneling in the toy model: a wave finding a basin that the tested cold dynamics did not reach.**

---

## 8. Technical note for the curious

All computation here uses the full statevector rather than sampling a reduced state.
We use a 256-dimensional complex state vector — the full quantum state of an 8-qubit system.
We diagonalise the dense Hamiltonian at each annealing step using `scipy.linalg.eigh`;
the schedule itself is discretised, and no hardware or IBM account is used.
The result is reproducible on any laptop.

The core code is in `paper/soma/quantum-soma-penrose/quantum_experiment.py`.
Run it from that folder to see the PASS verdict yourself.

---

*Filed under: QUANT-EXP-1, THERAPY-2, soma-field theory — 20 May 2026*
