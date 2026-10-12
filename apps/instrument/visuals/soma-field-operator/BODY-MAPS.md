# Body maps: what the sources support (ISS-026 audit, 13 Oct 2026)

The Soma Machine draws feelings on the body in two places: the BODY stop (where a
chosen feeling is felt) and the human music-affect route (the 8×8 field grid, with
BRECVEMA mechanisms stacked on it). This note says what the two sources behind them
support, and what is the app's own design.

## Sources (abstracts checked on PubMed, 13 Oct)

- Nummenmaa, Glerean, Hari & Hietanen (2014), *Bodily maps of emotions*, PNAS
  111(2), 646–651, doi:10.1073/pnas.1321664111 (`nummenmaa2014bodily`). Five
  experiments, n = 701. Participants coloured on two body silhouettes the regions
  whose activity they **felt** increasing or decreasing for emotion words, stories,
  films or faces. Different emotions gave statistically separable bodily sensation
  maps, concordant across West European and East Asian samples, and classifiers
  told them apart.
- Putkinen, Zhou, Gan, Yang, Becker, Sams & Nummenmaa (2024), *Bodily maps of
  musical sensations across cultures*, PNAS 121(5), e2308859121,
  doi:10.1073/pnas.2308859121 (`putkinen2024bodily`). Western (n = 903) and East
  Asian (n = 1035) listeners marked where they felt activity change while
  listening. The maps varied with the music's emotional qualities, mainly in the
  limbs, chest and head; they replicated across the two cultures, clustered like
  the self-reported emotions, and went with the music's acoustic and structural
  features in both.

## What can be claimed

- These are **self-reports of felt sensation**, not measurements of physiology:
  a map says where people say they feel a change, not what the body does.
- Emotions have distinct, culturally consistent sensation maps; music's maps
  differ mainly in the limbs, chest and head.
- Neither paper maps BRECVEMA mechanisms (or any mechanism) to body regions.

## The BODY stop's feelings (`explorer.js`, `FEELINGS`)

Each feeling carries a `basis`, shown with its name in the app:

| Feeling | Basis | Against the 2014 maps |
|---|---|---|
| ANGER / FIGHT | after Nummenmaa 2014 | anger: strong in the upper body, head, chest, arms and hands |
| ANXIETY / FLIGHT | after Nummenmaa 2014 | fear and anxiety: strongest in the chest |
| GRIEF | after Nummenmaa 2014 | sadness: limbs less active, some chest and head |
| JOY | after Nummenmaa 2014 | happiness: the whole body more active |
| CALM | after Nummenmaa 2014 | close to the neutral map: little change |
| FREEZE | artistic placement | not one of the 14 emotions mapped; drawn like depressed limbs |
| HYPERVIGILANCE | artistic placement | not mapped; drawn with the head foremost |
| FLOW | artistic placement | not mapped |

The values are the app's own drawing of the published patterns (qualitative, −1 to
1), not numbers taken from the figures.

## The 8×8 field grid (`human-affect.js`, `bodyGrid`; drawn by `renderBodyGrid` in `main.js`)

- Coordinates: 8 columns by 8 rows over the silhouette, cell index = row × 8 +
  column, row 0 at the head, row 7 at the feet.
- Regions: head, throat, chest, arms, abdomen, legs and spine, each a set of cells
  (`bodyGrid.regions`).
- Aggregation: each selected mechanism adds 1 to every cell of its regions; the
  cell's brightness follows the sum, so several mechanisms stack.
- Encoding: a cell's colour follows the field state (red the limbic, green the
  somatic, blue the cognitive layer) plus the stacked count; more mechanisms on a
  cell make it brighter and more opaque; a poke sends a wave across the columns
  with the response time. The provenance line states how many are stacked.
- The mechanism-to-region placements (`bodyGrid.mechanismRegions`) are the app's
  **design map**: no source assigns mechanisms to regions. They are kept as
  design, labelled so, and stay hardware-free; a controller adapter waits until
  the on-screen grid is accepted.
