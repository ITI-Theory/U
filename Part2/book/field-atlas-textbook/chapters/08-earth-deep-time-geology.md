# Earth: Deep Time and Geology

Earth history is a scale lesson. Human lives are short, recorded history is thin, and even the age of agriculture is a tiny fraction of planetary time. Rocks preserve slow fields: temperature, stress, pressure, flow, chemistry, and gravity. This chapter uses deep time, radiometric decay, and elastic waves to show how geology turns field response into evidence.

::: {.learning-objectives}
Readers should be able to place major Earth events on a deep-time axis, compute simple radioactive remaining fractions, describe stress and seismic waves as fields, explain why eras.yaml is a sourced registry input, and classify geological [T]-Theory overlays as interpretive unless tested.
:::

![Generated deep-time timeline. Almost all human history lies too close to the present to be visible at planetary scale.](figures/generated/ch08-deep-time.png){width="82%"}

## 8.1 Time written in rock

Geology studies processes whose clocks range from seconds to billions of years. Earthquakes rupture in seconds, river channels migrate over years to centuries, mountains rise over millions of years, and radioactive isotopes record billions of years. A time axis therefore needs logarithmic thinking. The repository file `registry/eras.yaml` supplies sourced entries for cosmic, geological, life, and human history; this textbook uses it as a data source rather than as original evidence.

A rock record is incomplete. Erosion removes layers, metamorphism rewrites minerals, and tectonics recycles crust. Geologists therefore combine field mapping, stratigraphy, radiometric dating, geochemistry, fossils, and geophysics. The result is not a single memory stored in stone, but a network of constrained inferences from physical traces.

::: {.example title="Example 8.1 Uranium-238 remaining fraction"}
Uranium-238 has a half-life of about $4.47\,\mathrm{Ga}$. After one billion years, the remaining fraction is $2^{-1/4.47}=0.8565$. After one half-life, the remaining fraction is exactly $0.5$. These calculations explain why long-lived isotopes are useful for ancient rocks.
:::

::: {.check-your-learning}
After two half-lives, a radioactive parent isotope has $1/4$ remaining. After three half-lives, it has $1/8$ remaining.
:::

## 8.2 Stress, strain, and waves

Rock can deform elastically, flow ductilely, or fracture. Stress is force per area, while strain describes deformation. For small elastic disturbances, seismic waves obey equations that resemble other wave equations but use material parameters such as density and elastic moduli. P waves compress and expand material; S waves shear it. Their travel times let geophysicists infer Earth's interior structure.

Plate tectonics provides the boundary story. Plates move centimeters per year, but their interactions produce earthquakes, volcanoes, mountain belts, and ocean basins. A field picture helps because stress accumulates over regions before it releases locally. It also prevents a common error: no single rock carries the whole planet's history. The evidence comes from spatially distributed traces.

::: {.making-connections}
Physical Geology 2e style teaching begins with observations, maps, minerals, and field evidence. The Atlas overlay must preserve that baseline before adding any response-grammar interpretation.
:::

## 8.3 Geological Atlas readings

The geological registry level uses elastic response as its baseline and points to Earth free oscillations and the Glarus thrust as examples. A [T]-Theory reading of valleys, faults, or cultural corridors as response pathways is usually class C or D: cross-scale unification or reinterpretation. It becomes class B only if it predicts new behavior that can be checked against geological or geographical data.

Falsifiers are available. A proposed Green-function model for a valley should fit measured propagation, boundary conditions, or transport better than a simple diffusion or network baseline. A claim about deep-time memory should specify the physical carrier: mineral alignment, isotope ratio, fossil assemblage, stress field, or stratigraphic relation. Without a carrier, the statement remains poetic.

::: {.soma-machine}
Use `#level=geological&lens=on&dim=11` to compare the rock-memory question with the sourced geological baseline. The lens should not turn metaphor into mechanism.
:::

::: {.key-terms}
**Deep time:** geological timescales far exceeding human history. **Half-life:** time for half a radioactive parent isotope to decay. **Stress:** force per area. **Strain:** deformation measure. **Seismic wave:** elastic wave travelling through Earth.
:::

::: {.key-equations}
Radioactive remaining fraction after time $t$ is $N/N_0=2^{-t/t_{1/2}}$. A schematic elastic wave equation is $\rho\partial_t^2u_i=C_{ijkl}\partial_j\partial_ku_l$.
:::

::: {.summary}
Geology reads distributed physical traces over immense time. Radiometric dating, waves, and tectonic boundaries provide the baseline. [T]-Theory geological overlays need explicit carriers and tests.
:::

::: {.review-questions}
1. Why does deep time require different intuition from human history? 2. What makes a seismic wave a field phenomenon? 3. What physical carrier could support a geological memory claim?
:::

::: {.problems}
1. What fraction remains after $8.94\,\mathrm{Ga}$ for a $4.47\,\mathrm{Ga}$ half-life? 2. A plate moves $3\,\mathrm{cm\,yr^{-1}}$. How far does it move in one million years? 3. Name two types of evidence used to reconstruct Earth history.
:::
