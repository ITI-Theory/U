# The Wave That Is Always There

*A Fractal Atlas from the Universe to the Soma*

**Author:** Alistair Johnson | ORCID: 0009-0007-2194-0850
**Project status:** Drafting — Volume 0 (anchor chapters first, then fill)
**Licence:** CC BY 4.0 (text); image credits per-figure (see `figures/FIGURES.md`)
**Citation style:** Chicago notes-and-bibliography (CMOS 17)

---

## Premise

A coffee-table science book that zooms — fractally — from the largest scale we
know (the cosmic microwave background) to the smallest (Planck-scale
compactification), and shows that the *same mathematical objects* recur at
every scale: waves, fields, attractor landscapes, and self-similar branching.
The human body — and specifically the Soma Field — is one rung on a ladder
that runs continuously from cosmos to manifold.

Two non-negotiables:

1. **The wave is the through-line.** Every chapter has at least one wave.
2. **Pictures do the work.** This is a coffee-table book; the prose is the
   caption around the imagery.

## Architecture

Three Acts, eighteen chapters, with the **Glarus thrust** as the literal and
narrative hinge of Part I, and the **soma field** as the heart of Part III.

### Part I — Cosmos to Crust

1. The Wave That Is Always There *(thesis chapter)*
2. The Cosmos Has Texture *(CMB, inflation, cosmic web)*
3. Galaxies as Standing Waves *(density-wave theory, spirals)*
4. Stars Breathe *(helioseismology, asteroseismology)*
5. Planets Ring *(normal modes, Schumann resonances)*
6. The Ground Is a Slow Sea *(plate tectonics; **Glarus Hauptüberschiebung**)*

### Part II — Crust to Skin

7. Life as Standing Wave *(Turing patterns, morphogenesis)*
8. Trees, Rivers, Lungs *(fractal branching everywhere)*
9. The Cardiac Field *(heart oscillator, electromagnetic toroid)*
10. The Body Is a Tensegrity *(biotensegrity, fascia, biofield)*

### Part III — Skin to Singularity

11. The Soma Field *(your model, in human voice)*
12. Attractors and the Shape of Feeling *(Hopfield energy landscapes)*
13. The Quantum in the Crossing *(QUANT-EXP-1, tunnelling)*
14. The Microtubule and the Photon *(Hameroff–Penrose, biophotons)*
15. Eleven Dimensions of Feeling *(M-theory, G₂ compactification)*
16. The Fractal Closes *(Mandelbulb as compactification cartoon)*

### Coda

17. A Practice *(somatic praxis — what to do with this)*
18. A Family Album *(intentionally personalisable pages)*

### Back Matter

* Glossary
* Notes (Chicago)
* Bibliography
* Image credits
* Colophon

## Writing voice

First-person, continuing the voice of *The Soma Field: A Patient's Point of
View*. Plain English, light prose, occasional formal aside in a clearly marked
box. The narrator is a physicist-by-training, neurodivergent, who has spent
thirty years walking around inside the question.

## Build

```bash
make wave-atlas        # builds bld/wave-atlas.pdf  (Royal 156×234 mm)
make wave-atlas-a4     # builds bld/wave-atlas-a4.pdf
```

(See parent `paper/Makefile` for the targets.)

## Family-edition affordances

This is also a family project. Chapter 18 (*A Family Album*) is a sequence of
ruled and image-framed pages with prompts ("a photograph of the place that
calmed you"; "draw the wave you felt last summer"); the source markdown is
deliberately minimal so the buyer can drop their own JPEGs into
`figures/family/` and rebuild. Several chapters have a final sidebar — *Your
own example* — inviting the reader to write or paste in a personal instance of
the chapter's wave.
