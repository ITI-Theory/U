# Renderers: guide

One renderer per registry level id (`registry/levels/<id>.yaml` → `renderer.id`).
Every `renderers/*.js` module registers itself through its default export; never
edit `main.js` to add one. When a level has a registered renderer, `main.js` hides
the legacy shared visuals for it.

## Interface

```js
export default {
  id: 'planetary',
  create(scene, THREE) {
    const group = new THREE.Group();
    scene.add(group);
    return {
      group,
      update(state, time, pulse) { group.visible = state.rendererId === 'planetary'; /* ... */ },
      dispose() { scene.remove(group); /* dispose geometries, materials, textures */ },
    };
  },
};
```

`update` runs every frame for every created renderer; return early when inactive.

| Input | Meaning |
| --- | --- |
| `state.rendererId` | active renderer id; draw only when it equals yours |
| `state.tTheory` | lens: `false` = ordinary 4D physics only; `true` = [T]-Theory layers allowed |
| `state.level` | display dimension `4`, `8`, or `11` (lens off is always 4) |
| `state.viewMode` | `'3d'` or `'2d'` (top-down orthographic camera) |
| `state.contours` | draw iso-lines of your field if you have one (`lib/contours.js`) |
| `state.style` | RICE switches (visual customisation, as in Linux ricing): `fluorescence` (microscopy colours for cells and molecules, emission glow for atoms), `falsecolour` (astronomy palettes), `glow` (halos, additive glow), `motion` (idle rhythms). All off must still give a clean, legible line drawing. |
| `state.somatic`, `state.limbic`, `state.cognitive` | sliders 0..1 (human levels; may tint other levels gently) |
| `state.responseTime` | 0..1 across a poke (4 s of wall-clock time; 1 = one level τ) |
| `pulse` | poke response, 1 at impact decaying as `exp(-3.4 t)` |
| `time` | seconds since start |

**Compare view** calls `update` twice per frame (lens off, then lens on, with
the same `time`). Keep all motion a function of `time` (and `pulse`), never of
frame count, and do not advance simulations inside `update` more than once per
`time` value.

## Space and camera

Perspective camera at (0, 0.35, 9.2), field of view 34°, looking at the origin:
the visible area at z = 0 is about x ∈ [-5, 5], y ∈ [-2.5, 3.2] on 16:9. The
left control panel covers the left fifth and the equation panel the lower
right, so keep the subject centred in x ∈ [-3.5, 3.5], y ∈ [-2, 2.6]. A grid
floor sits at y = -2.78. The top-down camera is at (0, 12, 0).

## Look

- Dark background; neon palette: cyan `#14e5ff`, pink `#ff3bce`, gold `#f6c75a`,
  green `#56f0a2`, violet `#8f47ff`, blue `#3d7bff`.
- Glow, not plastic: additive blending, emissive shells, sprite halos. Where the
  science images that way, use it: fluorescence microscopy (cells, molecules),
  emission spectra (atoms), false-colour astronomy (nebulae, galaxies).
- Alive: a slow idle rhythm appropriate to the level (breathing, orbiting,
  drifting, rotating), subtle and never distracting.
- Lens off = only what ordinary, sourced science shows at that scale. Lens on
  (level ≥ 8) adds the field: propagator / response waves, field shells,
  coupling links, contours. Level 11 may add an information overlay, but never
  feelings, faces, or minds for non-human substrates.
- Poke: show an impulse at a source and the level's own kind of response
  (ringing modes for stars and planets, travelling waves for media, diffusion
  for crowds and cities, gravitational ringdown for compact objects).

## Spec

For each level read `registry/levels/<id>.yaml` (substrate, field, equation,
response time) and the `## The pictures` section of `registry/levels/<id>.md`
(lens off / lens on): that section is the brief. `registry/catalogues/spaceengine-objects.yaml`
lists object classes that belong at the level.

## Budget and checks

- Under ~80k triangles and ~6k points per renderer; reuse geometries; no
  per-frame allocation in hot loops; dispose everything.
- Shared helpers go in `renderers/lib/` (not registered as renderers).
- Check: `node scripts/capture.mjs --only plates --levels <ids> --settle 2500`
  writes lens-off/on plates to `Part2/book/field-atlas/figures/app/plates/`;
  open `#level=<id>&compare=1` to see both lenses side by side; no console
  errors; `npm run build` passes.
