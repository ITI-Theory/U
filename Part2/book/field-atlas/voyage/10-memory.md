---
title: Memory
---

This is where the project started: a Hopfield network stores memories as stable patterns of activity, and recall is the network falling into the nearest one [@hopfield1982neural] `sourced`. The plate's network has 49 cells and holds three patterns, SAFE, FIGHT and FREEZE. Recall is done the 2020 way, in which the state is compared with every memory and pulled towards the best match by softmax attention, the same operation as in transformer networks [@ramsauer2020hopfield] `simulated`.

The limbic layer heats the network [@P13]. Cold, recall is sharp and the state stays where it is, even in FREEZE; hot, the memories blur and the state can move. A resource, the model's term for a safe presence, adds a pull towards SAFE. That a stuck state moves when the field is raised and a resource is present is the model's account of what therapy does `open-hypothesis`.

::: {.plate id="memory"}
Memory as a Hopfield network of 49 cells holding three patterns, SAFE, FIGHT and FREEZE, recalled by attention; the limbic field heats it (`simulated`).
:::
