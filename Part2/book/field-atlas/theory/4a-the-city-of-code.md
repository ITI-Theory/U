---
title: "8. The city of code"
---

The eleven dimensions of this chapter are carried, in the programme, by Lean: every claim that can be stated formally is a declaration that the Lean kernel either checks or refuses. The Soma Machine draws that formal layer as a city on the horizon of the landscape of states. Each module of the programme's Lean is a tower and each declaration a ring, in the order the file builds them, foundations first. Amber rings at the base are axioms, assumed rather than proved; blue rings are definitions; green rings are theorems the kernel has checked; a ring that rested on `sorry`, a proof not yet written, would flicker red `kernel-verified`.

The city is not decoration. Its rings come from the towers export, a Lean program that walks every module, records each declaration's kind and the axioms it rests on (`#print axioms`), and marks any declaration whose statement is only `True`. At the export of 13 October 2026 the city has 29 towers and 1,116 declarations: 370 theorems, 522 definitions and 14 of the programme's own axioms; no declaration rests on `sorry` and none proves only `True`. Amber beams run from a theorem down to the axioms it uses, so a reader can see what a result is worth: a theorem resting on the programme's own axioms is `derived-under-assumptions`, however green its ring.

On the far horizon stands OpenCyc, about 1.37 million facts in 547 microtheories, one tower for each; the amber arc between them and the city is the bridge that anchors the programme's emotions to OpenCyc's own classes, with proofs. The plates follow the Root Monster's tour of the city, the route the app offers to the reader who reads the Lean before the prose.

::: {.plate id="city"}
The landscape of states as one world: the mountains of the energy landscape, the country of the field, and on the horizon the city of code, a tower per Lean module, with OpenCyc's microtheories beyond (`interpretive` as a picture; every ring is from the Lean export).
:::

::: {.plate id="city-tower"}
Into the tower of UniversalSomaticField, the hub of the programme: its declarations as floors, its source falling as code rain behind them (`kernel-verified` for the rings' kinds).
:::

::: {.plate id="city-floor"}
A floor of that tower: `greens_fn_is_SHO`, which until October 2026 proved only `True` and now proves the classical Green's-function identity of the oscillator (`kernel-verified`).
:::

::: {.plate id="city-beams"}
In LocalGR, the theorem that gives the dark-energy fraction 7/11, with its amber beams down to the two programme axioms it rests on: a theorem only as strong as its assumptions (`derived-under-assumptions`).
:::
