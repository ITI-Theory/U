# Registry Reconciliation

Author decision (2026-10-01): rows formerly marked `REVIEW` stay separate shared levels; each model (`canonical-5`, `universal-21`, ...) selects which it shows, and app and Atlas use the same label.

| Level id | Chosen label | canonical-5 | universal-21 | bird-flock | App former label | Atlas former label | Operator former label | Review note |
|---|---:|---:|---:|---:|---|---|---|---|
| `animal-swarm` | Animal Swarm | III | 8 | — | GROUP / SWARM sigma 10 | Scale 7 Animal Swarm / Murmuration | 08 / ANIMAL SWARM | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `atomic` | Atomic | I | 3 | — | ATOMIC sigma 3 | implicit between Scale 2 and Scale 4 | 03 / ATOMIC |  |
| `bird` | Bird | — | — | bird | named solution bird | not a Field Atlas level | bird-flock 07 / BIRD |  |
| `cellular-synaptic` | Cellular / Synaptic | II | 5 | — | CELLULAR / SYNAPTIC sigma 5 | Scale 5 Cellular / Neural Synapse | 05 / CELLULAR |  |
| `civilisational-solar` | Civilisational / Solar | IV | — | — | CIVILISATIONAL / SOLAR sigma 13 | overlaps Wave Scale 13-15 | app systemic sigma 13 | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `colony-roost` | Colony / Roost | — | — | colony-roost | named solution colony-roost | not a Field Atlas level | bird-flock 09 / COLONY / ROOST |  |
| `compact-object` | Compact Object | — | 14 | — | no separate app level | not separately plated | 14 / COMPACT OBJECT | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `cosmic-filaments` | Cosmic Filaments | — | 18 | — | folded into OBSERVABLE UNIVERSE | Scale 18-20 Cosmic Web | 18 / FILAMENTS | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `cosmic-web` | Cosmic Web | — | 20 | — | renderer id for OBSERVABLE UNIVERSE | Scale 20 in dial title | 20 / COSMIC WEB | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `dyad` | Dyad | III | — | — | DYADIC sigma 9 | route-only | organism-couple-dyad |  |
| `flock` | Flock | — | — | flock | named solution flock | related to Scale 7 Animal Swarm | bird-flock 08 / FLOCK |  |
| `galactic-disc` | Galactic Disc | V | 15 | — | GALACTIC sigma 18 | Scale 13-15 Stellar to Galactic | 15 / GALACTIC |  |
| `galactic-halo` | Galactic Halo | — | 16 | — | folded into GALACTIC | not separately plated | 16 / GALACTIC HALO | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `galaxy-cluster` | Galaxy Cluster | — | 17 | — | compare STELLAR / CLUSTER | not separately plated | 17 / CLUSTER | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `geological` | Geological | IV | 10 | — | GEOLOGICAL sigma 15 | Scale 10 Geological / Seismic | 10 / GEOLOGICAL |  |
| `human-vertebrate` | Human / Vertebrate | III | 7 | — | HUMAN / VERTEBRATE sigma 8 | Scale 8 Human Organism | 07 / ORGANISM |  |
| `local-circuit` | Local Circuit | II | — | — | LOCAL CIRCUIT sigma 6 | app-only refinement | zoom 6 Local circuit |  |
| `molecular` | Molecular | I,II | 4 | — | MOLECULAR sigma 4 | Scale 4 Molecular / Chemical Bond | 04 / MOLECULAR |  |
| `nuclear` | Nuclear | I | 2 | — | NUCLEAR sigma 2 | Scale 2 Nuclear / Quark-Gluon | 02 / NUCLEAR |  |
| `observable-universe` | Observable Universe | V | 19 | — | OBSERVABLE UNIVERSE sigma 19 | Scale 18-20 Cosmic Web to Universal | 19 / UNIVERSE | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `orbital-system` | Orbital System | — | 12 | — | folded into CIVILISATIONAL / SOLAR | inside Scale 13-15 range | 12 / ORBITAL | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `planetary` | Planetary | IV | 11 | — | PLANETARY sigma 16 | Scale 11-12 Planetary / Mantle | 11 / PLANETARY |  |
| `quantum-foam` | Quantum Foam | I | 0 | — | QUANTUM FOAM sigma 0 | Scale 0 Planck / Quantum Foam | zoom 0; catalogue boundary |  |
| `regional-institutional` | Regional / Institutional | IV | — | — | REGIONAL / INSTITUTIONAL sigma 12 | regional refinement | zoom 12 Regional |  |
| `society-city` | Society / City | IV | 9 | — | COMMUNITY / CITY sigma 11 | Scale 9 Society / City | 09 / SOCIETY / CITY |  |
| `species-stellar` | Species / Stellar | IV,V | — | — | SPECIES / STELLAR sigma 14 | overlaps Wave Scale 13-15 | app systemic sigma 14 | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `stellar-cluster` | Stellar / Cluster | V | — | — | STELLAR / CLUSTER sigma 17 | Wave Scale 13-15 range | app sigma 17 | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `stellar` | Stellar | — | 13 | — | folded into species/stellar and cluster | Scale 13-15 range | 13 / STELLAR | KEEP: separate shared level; each model selects (author, 2026-10-01) |
| `string-boundary` | String / Planck Boundary | I | 1 | — | STRING / PLANCK BOUNDARY sigma 1 | atlas-scale-01.md | 01 / STRING |  |
| `whole-brain-cemi` | Whole Brain / CEMI | II,III | 6 | — | WHOLE BRAIN / CEMI sigma 7 | Scale 6 Brain / CEMI Field | 06 / BRAIN / CEMI | KEEP: separate shared level; each model selects (author, 2026-10-01) |

## Judgement calls

- Kept `whole-brain-cemi` and `animal-swarm` as separate levels because Field Atlas Scale 7 animal swarm conflicts with app sigma 7 whole brain/CEMI.
- Merged app `GROUP / SWARM` and Field Atlas `Animal Swarm` into `animal-swarm`; author should confirm label scope.
- Merged app `COMMUNITY / CITY` and Field Atlas `Society / City` into `society-city`.
- Split universal catalogue physics ticks (`orbital-system`, `stellar`, `compact-object`, `galactic-halo`, `galaxy-cluster`, `cosmic-filaments`, `cosmic-web`) from broader app scenes where the old app folded them together.
- Retained route-only app levels (`dyad`, `regional-institutional`, `civilisational-solar`, `species-stellar`, `stellar-cluster`) outside universal-21 when no unique catalogue coordinate exists.
- Cookie-register prose is draft; `TODO` means the child-level explanation needs author wording.

## Canonical set (author, 2026-10-01)

- New level `human-group` (Small Group / Crowd / Assembly) between `dyad` and `society-city`; `animal-swarm` relabelled "Animal Swarm" (groups of people now have their own level).
- Paths `animal-to-church` and `community-to-institution` merged into `human-assembly-to-institution`; the app maps the old ids.
