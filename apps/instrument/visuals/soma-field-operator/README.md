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
	`#era=<id>` means the existing zoom behaviour is unchanged. Era records may
	set `theme` to change the app surface with procedural CSS only: cosmic/current
	neon, earth strata, Egyptian sandstone, Babylonian clay, Greek marble,
	Islamic geometric tiling, medieval illumination, Renaissance notebook,
	Enlightenment copperplate, modern blueprint, present neon, and original
	20th-century art-movement treatments (Expressionism, Constructivism, Bauhaus,
	colour field, Pop Art, and street art). Human-history theme cards include
	sourced "MATHS OF THE ERA" KaTeX worked examples; art-movement cards use
	"IDEA OF THE ERA" notes and generated CSS/SVG geometry only.
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
`compare`, `contours`, `styleoff`, `q`, `demo`, `era`, `ui`, and `labels`.

## MOTHER / H-AL terminal

The MOTHER panel has `CHAT` and `SHELL` tabs. `CHAT` keeps the MOTHER/H-AL
persona switch and COMPARE mode, adds per-persona local prompt history
(`Up`/`Down`), and tab-completes slash commands plus generated level, question,
and era ids. Use `/help`, `/persona mother|hal`, `/compare on|off`, `/clear`,
and `/shell`.

The `SHELL` tab connects to the local bridge only when
`apps/instrument/mother/mother.local.json` contains `"shell": true`. It opens
Git Bash by default, offers the mother venv Python profile, and shows Neovim
only when `nvim` is already installed. MOTHER answer code blocks get a
`RUN IN SHELL` button that switches tabs and pastes the command without
pressing Enter.

## Panel window manager

Every major overlay has a neon title bar: drag it to move, use the corner grip
to resize, and dock/minimise it to the lower-left activity strip. Dock buttons
restore panels; `RESET LAYOUT` clears saved positions from local storage.

- `H`: toggle Clean Mode (hide panels, dock, DOM labels, HUD strips; world
  labels are off by default).
- `L`: while in Clean Mode, toggle world labels back on/off for diagnostics.
- `Esc`: exit Clean Mode.
- `#ui=clean`: open directly in Clean Mode for captures/presentation; implies
  `labels=off` unless `labels=on` is explicitly present.
- `#labels=off`: also hide the core built-in world-space label sprites.

`npm run capture -- --clean` appends `ui=clean&labels=off` to captured URLs
without changing normal capture defaults.

## Dimension dynamics demos

On `level=human-vertebrate`, `level=dyad`, or `level=cellular-synaptic` with
`T-THEORY: ON`, the 4D/8D/11D hierarchy buttons now change the POKE behaviour,
not only the image.

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
- DYAD: the STATE panel uses the two-oscillator Adler/Kuramoto form
  `phi_dot = Delta_omega - 2 kappa sin(phi)`. 4D has `kappa=0` drift, 8D is
  below `kappa_min=Delta_omega/2` and counts phase slips, and 11D exceeds the
  threshold so a poke knocks the pair out and the display reports re-lock time.
- CELLULAR-SYNAPTIC: the STATE panel uses a passive cable/leaky membrane
  baseline plus leaky integrate-and-fire spike threshold. 4D decays
  subthreshold, 8D spikes then suppresses an identical second poke during the
  refractory period, and 11D draws the spike as a next-level transition.

Dyad and cellular thresholds are standard sourced science; the [T]-Theory note
is only that they share the same source-kernel-threshold-response grammar as
the human-level demo.

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
