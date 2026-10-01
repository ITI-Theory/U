# Soma Field Operator

The canonical visual template for the Soma Field Instrument, Hologram World,
projection work, and non-medical field figures.

## Visual language

- Cyan and hot pink: D1-4 somatic field layers through the whole body
- Gold: D5-7 physical nervous system, including spinal and peripheral electrical pathways
- Green: EMF / Green-function response shell extending around the complete body
- Electric violet: D8 limbic coupling core in the thorax
- Hot pink: D9-11 non-physical cortex/mind field around the physical brain
- Articulated male-coded wireframe: a symbolic field substrate, not anatomy or a clinical claim

The live and exported composition must read in this order: **BODY** (D1-4),
**NERVES** (D5-7), **LIMBIC** (D8), then **MIND** (D9-11). The green EMF
shell makes the causal relation visible: electrical nervous-system activity
produces a whole-body field response. The oversized labels are deliberate
projection and landing-page anchors, not UI decoration.

## Runtime contract

The scene exposes three normalised fields in `[0, 1]`:

| State | Current visual mapping | Future OSC source |
|---|---|---|
| `somatic` | D1-4 lower-body rings, torso field and wireframe opacity | somatic intensity aggregate |
| `limbic` | D8 thoracic core and coupling ring | coupling / limbic aggregate |
| `cognitive` | D5-7 neural tract and D9-11 cortex ring | perception-threshold aggregate |

## Splash-page layers

- **Organism hierarchy**: the default $\sigma=8$ state is the 11D thinking
	human ($M_4 + P_3 + L_1 + C_3$). At $\sigma=6$, the cortex is unavailable
	and the scene shows the 8D feeling organism ($M_4 + P_3 + L_1$). At
	planetary/orbital scales ($\sigma\ge12$), the internal structure is projected
	away into an inert 4D rock/worldline ($M_4$).
- **Hierarchy controls**: the 4D, 8D, and 11D controls are direct projection
	shortcuts: 4D selects the rock/worldline projection, 8D selects the feeling
	organism, and 11D selects the full human/vertebrate mind.
- **Zoom Operator**: selects $\sigma \in \{0,\ldots,19\}$ and updates the
	active substrate label, field spread, $k$, characteristic length $\ell$, mind
	matrix rank $N$, and equation ledger. The operator uses
	$k(\sigma) = k_0 / \Lambda^\sigma$ as its scale-law reference.
- **TIME / ERA**: selects a record from `registry/eras.yaml`, snaps the
	log-time slider to the nearest era, opens the era card, and switches to the
	registry level that best visualises that era. It is off by default; no
	`#era=<id>` means the existing zoom behaviour is unchanged.
- **BRECVEMA / P.N.S.**: reveals the eight mechanism channels -- BrainStem,
	Rhythmic Entrainment, Evaluative Conditioning, Contagion, Visual Imagery,
	Episodic Memory, Musical Expectancy, and Aesthetic Judgement -- converging
	on the D8 limbic coupling core.
- **Cosmic scale**: at $\sigma=19$, the panel shows the current sourced
	relations $\Lambda_\mathrm{USF}=(21/11)H_0^2/c^2$ and
	$\Omega_\mathrm{DM}=3/11$.

These are visual navigation states for the research model, not medical display
or diagnostic controls.

TouchDesigner can reproduce these same named layers for projection. The Three.js
scene is the portable visual reference and paper-frame exporter.

## Run

```bash
# npm install
cd apps/instrument/visuals/soma-field-operator/
npm run start
```

The `EXPORT FRAME` control writes a PNG from the current canvas state for a
paper or social derivative. Keep the procedural scene as the source of truth.

Deep-link hash keys include `level`, `path`, `lens`, `model`, `reader`,
`compare`, `contours`, `styleoff`, `q`, and `era`.

## Dimension dynamics demos

On `level=human-vertebrate` with `T-THEORY: ON`, the 4D/8D/11D hierarchy
buttons now change the POKE behaviour, not only the image.

- 4D: POKE drives a damped baseline response that rings down to rest.
- 8D: POKE integrates the low-dimensional Langevin double well
  `gamma e_dot = -grad H(e) + sqrt(2D) xi(t) + J(t)` with the P10 exponential
  memory kernel; weak limbic settings return to calm, strong settings flip and
  stay in the high-arousal basin, and a second poke reports the changed
  response.
- 11D: POKE/entry replays the P2 QUANT-EXP-1 simulated tunnelling panel:
  classical cold `0/48` reach vs quantum anneal peak Awe-dominant probability
  about `0.408`. The panel is labelled `simulated` and carries the
  `THEORY-STATUS.md` caveat.

## Data architecture freeze

Read this README before changing the Operator. The app is now frozen against
new hard-coded theory, publication, scale, route, equation, G-ID, or claim
tables in JavaScript. The existing hand-authored tables are migration debt,
not a pattern for new work.

Authority remains outside the browser bundle:

| Source | Owns |
|---|---|
| `Dist/PAPERS.yaml` | Publication metadata, domain-book G-IDs, HUD equation/operator/invariant/observable fields |
| `operator-theory.yaml` | Operator routes, visual contracts, scale transitions, and claim boundaries |
| Paper Markdown and Lean proofs | Scientific prose, equations, and formal-proof status |

The next implementation phase adds `make operator-generate`. It must validate
those source files and emit one generated app-data module. Browser JavaScript
may contain reusable renderers, controls, and a stable renderer registry such
as `renderers['quantum-foam']`; it must not copy the authority data. Missing
renderer IDs must appear as explicit placeholders and in a generated coverage
report. This boundary supports finite and unbounded path catalogues without
expanding control logic.
