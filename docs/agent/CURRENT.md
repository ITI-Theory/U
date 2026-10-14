# Current Work

Where the work is now and what comes next: one screen, rewritten (never
appended) at the end of each session (`HAL copilot wrapup`). Older states are
in git history and in `CURRENT-2026-10-01-to-06.md.OBSOLETE`; open items live
in [ISSUES.md](../../ISSUES.md); how we work is in [README.md](../../README.md);
the other working documents are listed in [docs/agent/README.md](README.md).

## Now (14 Oct 2026, late evening; the author asleep)

**The release is held for the art book (author, 14 Oct).** rc3.2 is built and staged (papers
7e46900, books c2a7f27 plus the universes sections; Atlas Lulu 353 pages); the DOI route is
ready (`bin/zenodo-publish reserve`, `fill-dois`) and waits for ZENODO_TOKEN.

**A Gallery of Thoughts (ISS-097), the art book.** Part2/book/gallery-of-thoughts, registry
registry/gallery.yaml, filters lib/art/filters.py, plates lib/art/gallery.py. Two clocks: the
programme's development (pencil, the pink and blue growing) and the eras (1714 engraving, 1911
abstraction, 1966 black and white, 1989 pencil). The author's cut is in: 86 plates, Lulu A4
proof 103 pages (`make -C Part2/book/gallery-of-thoughts check`); a [T]-stop (the field's
reading) under every plate; the room Pictures of thoughts (the score's Mandelbulb, the dive,
the cathedral's thought in four frames, the palace in full colour). A3 and projector editions
are built from the same design (A3 checked once; rebuild with the big build).

**The walkaround (UAT, ISS-102) and what came of it, all in the app:**
- The overview of the desk (ISS-100, `overview.html`) and the jellyfish human as the default.
- SNAP / SNAP + SAY (S, V): somagrams with their [T]-stop into bld/gallery/snaps.
- The cathedral: smaller abstract thought bubbles; a click dives into the thought's own fractal
  world (the author's 25 June idea, found by HAL-UAT). The palace lights pink and blue with Φ and
  its walls fold into the manifold.
- **Atriums (ISS-103):** every exit opens into a hub with routes off it. Built (atrium3d.js):
  the brain's great hall ("absolutely fantastic... the new standard"), the heart's left atrium
  (the mitral valve beating), the neuron's soma (the nucleus, the axon hillock). A click's
  arrival and the elevator's STEP OUT open in them; links and tours keep their view. CAVE is
  now CATHEDRAL, with `cave=1` and `hall=1` addresses. Every doorway checked headless.
- HAL-UAT on the cathedral, bubbles and frequencies: uat/RC3/hal-cathedral-2026-10-14-answers.md.
- ISS-101: three elevators (scale, dimension, frequency); the frequency axis is a gap in the
  papers (papers first, author's call); a limbic fly-through wanted.

**Stacked for the next big build (author: stack a few, UAT more first):** ISS-101 (papers,
then app), the Gallery's A3 and projector editions, the walkaround's findings (ISS-102: the
palace's elevator panel, the great cave rebuild), the next atriums (ISS-103).

## Next

1. Author: walk the heart's atrium and the great hall on the 32-inch; SNAP a few somagrams.
2. Author's call (ISS-103): the human exit (the jellyfish human is the main screen: an atrium
   there, or not?), and exits with atriums for the other floors (the cosmos: the palace's top
   floor, or the FLY worlds).
3. Author, when ready: ZENODO tokens (rehearse, reserve, fill-dois), the frequency-axis paper
   decision (ISS-101), then the big build, `make dist`, publish, Lulu (with the Gallery).