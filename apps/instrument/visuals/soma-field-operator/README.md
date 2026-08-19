# Soma Field Operator

The canonical visual template for the Soma Field Instrument, Hologram World,
projection work, and non-medical field figures.

## Visual language

- Cyan and hot pink: D1-4 somatic field layers through the body and lower torso
- Electric blue: D5-7 nervous-system tract and cortical branching
- Electric violet: D8 limbic coupling core in the thorax
- Hot pink: D9-11 cortical threshold/cognitive layer
- Articulated male-coded wireframe: a symbolic field substrate, not anatomy or a clinical claim

The live and exported composition must read in this order: **BODY** (D1-4),
**LIMBIC** (D8), then **MIND** (D5-7 plus D9-11). The oversized field labels
are deliberate projection and landing-page anchors, not UI decoration.

## Runtime contract

The scene exposes three normalised fields in `[0, 1]`:

| State | Current visual mapping | Future OSC source |
|---|---|---|
| `somatic` | D1-4 lower-body rings, torso field and wireframe opacity | somatic intensity aggregate |
| `limbic` | D8 thoracic core and coupling ring | coupling / limbic aggregate |
| `cognitive` | D5-7 neural tract and D9-11 cortex ring | perception-threshold aggregate |

## Splash-page layers

- **Zoom Operator**: selects $\sigma \in \{0,\ldots,19\}$ and updates the
	active substrate label, field spread, and equation watermark. The operator
	uses $k(\sigma) = k_0 / \Lambda^\sigma$ as its scale-law reference.
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
npm install
npm run start
```

The `EXPORT FRAME` control writes a PNG from the current canvas state for a
paper or social derivative. Keep the procedural scene as the source of truth.
