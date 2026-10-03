# T5 — The dark sectors {#theory-dark-sectors}

## 1. The standard budget

![Figure T5.1 — Planck 2018 ΛCDM density budget with approximate one-sigma error bars alongside the programme fractions.](figures/theory/T5_1_friedmann_budget.png){width=92%}

Modern cosmology fits a small number of parameters to cosmic microwave background anisotropies, baryon acoustic oscillations, supernovae, lensing, and large-scale structure. In the Planck 2018 baseline, representative density fractions are approximately $\Omega_\Lambda=0.6847$, $\Omega_c=0.2645$, and $\Omega_b=0.0493$, with percent-level uncertainties depending on the dataset combination. The first is dark energy, the second cold dark matter, and the third ordinary baryonic matter.

The Friedmann equation for a homogeneous and isotropic universe is

$$
H^2=\frac{8\pi G}{3}\rho-\frac{kc^2}{a^2}+\frac{\Lambda c^2}{3}.
$$

Dividing by $H^2$ gives a dimensionless budget,

$$
1=\Omega_m+\Omega_r+\Omega_k+\Omega_\Lambda,
$$

with matter, radiation, curvature, and dark-energy terms. This equation is standard general relativity applied to a Robertson-Walker metric; it is not a programme invention. [derived-under-assumptions]

Dark matter is inferred gravitationally from galaxy rotation curves, cluster dynamics, lensing, cosmic microwave background peaks, and structure formation. Dark energy is inferred from accelerated expansion and the global fit of the cosmological model. Neither component is directly understood as a laboratory substance in the way baryonic matter is. That ignorance is not licence for arbitrary replacement; any alternative must match the full observational suite at least as well as ΛCDM.

## 2. The programme Λ derivation

![Figure T5.2 — ΛUSF compared with the Planck 2018 Λ scale; the leading programme number is about 7.1 percent low.](figures/theory/T5_2_lambda_comparison.png){width=92%}

P21 proposes

$$
\Lambda_{\mathrm{USF}}=\frac{21}{11}\frac{H_0^2}{c^2}.
$$

The factor $21/11$ is written as $3\times7/11$: the Friedmann relation for a cosmological constant contributes the factor 3, and the programme's compact/vacuum sector contributes $7/11$. In density-parameter language this corresponds to

$$
\Omega_{\Lambda,\mathrm{USF}}=\frac{7}{11}\approx0.63636.
$$

Compared with Planck's $0.6847$, the fractional difference is

$$
\frac{0.6847-7/11}{0.6847}\approx0.071.
$$

Thus the leading number is about 7.1 percent low. [derived-under-assumptions]

The calculation should be read as a constrained numerical proposal, not as confirmation. The assumptions include the eleven-part sector count, the mapping from the compact/vacuum sector to $\Omega_\Lambda$, and a local-GR gate that preserves the standard Friedmann form. `CosmologicalConstant.lean` proves arithmetic and formal implications within those assumptions; it does not prove that the physical universe has chosen the programme decomposition. [kernel-verified where named; derived-under-assumptions]

## 3. The programme dark-matter fraction

![Figure T5.3 — ΩDM = 3/11 compared with Planck 2018 cold dark matter; the leading fraction is about 3.1 percent high.](figures/theory/T5_3_dark_matter_comparison.png){width=92%}

P22 proposes that the spatial vacuum block contributes

$$
\Omega_{\mathrm{DM,USF}}=\frac{3}{11}\approx0.2727.
$$

Using the Planck 2018 cold-dark-matter value $\Omega_c=0.2645$, the leading fractional discrepancy is

$$
\frac{3/11-0.2645}{0.2645}\approx0.031.
$$

The proposal is closer to the baseline dark-matter fraction than the Λ proposal is to the dark-energy fraction, but closeness alone is not evidence of mechanism. A rational fraction can land near a measured number by coincidence, by hidden fitting, or by a genuine structural relation. Only additional discriminating tests can separate those cases. [derived-under-assumptions]

The physical reading is gravitational-only under localisation assumptions: the spatial vacuum block sources the metric but does not provide a directly detectable particle with electromagnetic or strong interactions. This would be falsified by a confirmed non-gravitational dark-matter particle or by cosmological observations requiring interactions incompatible with the model. It would also fail if precision fits moved the required fraction away from $3/11$ beyond any allowed correction. [open-hypothesis]

## 4. Local GR gate

![Figure T5.4 — LocalGR gate: local general-relativistic dynamics are preserved while the programme changes only the global sector interpretation.](figures/theory/T5_4_local_gr_gate.png){width=92%}

A central safety condition is that local general relativity remains unchanged. Solar-system tests, binary pulsars, gravitational waves, lensing, and black-hole observations already constrain departures from GR. P21/P22 therefore route their cosmological claims through a LocalGR gate: the Einstein/Friedmann machinery is kept, while the interpretation of density fractions is altered under sector-count assumptions. [derived-under-assumptions]

This gate narrows the proposal. It cannot explain phenomena by changing Newton's law at galactic accelerations unless a separate modified-gravity extension is introduced. It must fit the same background expansion and perturbation data used by ΛCDM. It must recover standard local predictions. The gain is discipline: a reader can test the new numbers without wondering whether every success of GR has been silently discarded.

The Lean files named in the status ledger formalise pieces of this gate. A theorem can state that within the file's axioms a parameter is static or a fraction has a value. The empirical burden remains outside the kernel. A formal theorem about a model is strong evidence about the model's internal consistency and weak evidence about nature until observations bind the model to the world. [kernel-verified where named]

## 5. Falsification paths

![Figure T5.5 — Dark-sector decision tree: arithmetic fit, background expansion, perturbations, and non-gravitational detection are independent checks.](figures/theory/T5_5_falsification_flow.png){width=92%}

The dark-sector proposals are useful only if they can fail. Four tests are immediate. First, arithmetic must stay aligned with the stated constants; changing $H_0$ conventions or Planck values must not be hidden. Second, the expansion history $H(z)$ must match supernovae, baryon acoustic oscillations, and CMB-inferred distances. Third, perturbation growth and lensing must match structure data, not only the background density fractions. Fourth, direct or indirect dark-matter detection would constrain or refute the gravitational-only reading.

A compact way to state the programme status is this: $\Omega_\Lambda=7/11$ and $\Omega_{DM}=3/11$ are derived numbers under the sector-count model; their current numerical proximity to Planck 2018 is a comparison, not a discovery. The claims become stronger if independent corrections are derived before being fitted and if the same correction improves multiple datasets. The claims weaken if the fractions require ad hoc adjustments for each observable. [derived-under-assumptions; open-hypothesis]

The dark sectors also mark a boundary for analogy. Cosmology permits hidden components because their gravitational effects are measured in many independent ways. A proposed hidden somatic, social, or cultural field requires analogous discipline: an effect, a kernel, an observable, a null model, and a way to lose. Without those elements the word field is only interpretive vocabulary. [interpretive]

## 6. Observational anchors for dark matter

Galaxy rotation curves supply the most familiar anchor. In Newtonian terms, circular speed satisfies $v^2(r)=GM(<r)/r$. If visible mass were concentrated in the stellar disc, speed would fall at large radius. Many galaxies instead show approximately flat curves, implying $M(<r)\propto r$ over the measured region. Dark haloes are the standard ΛCDM interpretation; modified-gravity approaches attempt to alter the acceleration law. Both must also face cluster, lensing, and CMB evidence.

Gravitational lensing is especially important because it maps projected mass without relying on luminous matter tracing the same distribution. Weak lensing by clusters and cosmic shear by large-scale structure are sensitive to the total gravitational potential. The Bullet Cluster and related merging systems are often discussed because lensing peaks are displaced from much of the hot baryonic gas. Such systems do not by themselves settle every dark-matter question, but they strongly constrain explanations that tie all gravity to visible matter alone.

The cosmic microwave background adds a precision anchor. The relative heights and positions of acoustic peaks depend on baryon density, cold dark matter density, radiation, curvature, and the primordial spectrum. A proposal matching only the late-time fraction $3/11$ but failing the CMB peak structure would fail as cosmology. Therefore the P22 number is an entry point, not a completed replacement for the ΛCDM inference pipeline. [open-hypothesis]

## 7. Observational anchors for dark energy

Dark energy entered modern cosmology through Type Ia supernovae indicating late-time acceleration, but the case is now broader. Baryon acoustic oscillations measure a standard ruler. CMB data constrain the angular diameter distance to last scattering. Weak lensing and cluster counts probe growth under the same expansion history. A viable dark-energy model must pass this combined distance-and-growth test.

For a pure cosmological constant, the equation-of-state parameter is $w=p/(\rho c^2)=-1$. Many alternatives allow $w\ne-1$ or $w(z)$ varying with redshift. P21's LocalGR route preserves the $w=-1$ behaviour under its assumptions. That is a strength because it avoids conflict with current constraints, but it also narrows the novelty: the observational background remains ΛCDM-like unless the sector interpretation produces testable corrections. [derived-under-assumptions]

A numerical example fixes the scale. With $H_0=67.4$ km s$^{-1}$ Mpc$^{-1}$, $H_0\approx2.18\times10^{-18}$ s$^{-1}$. Then

$$
\frac{H_0^2}{c^2}\approx5.3\times10^{-53}\,\mathrm{m}^{-2},
$$

and $\Lambda_{USF}=(21/11)H_0^2/c^2\approx1.0\times10^{-52}\,\mathrm{m}^{-2}$. The observed Λ scale is about $1.1\times10^{-52}\,\mathrm{m}^{-2}$ for the same baseline. The agreement is numerically interesting under the model assumptions, but the difference remains large compared with precision-cosmology error bars. [derived-under-assumptions]

## 8. Critical density and error accounting

The density parameters are ratios to the critical density,

$$
\rho_c=\frac{3H_0^2}{8\pi G}.
$$

A physical density becomes $\Omega_i=\rho_i/\rho_c$ for matter or radiation, while the cosmological constant corresponds to

$$
\Omega_\Lambda=\frac{\Lambda c^2}{3H_0^2}.
$$

Solving this equation for Λ gives $\Lambda=3\Omega_\Lambda H_0^2/c^2$. The P21 formula follows if $\Omega_\Lambda$ is set to $7/11$. This derivation shows exactly where the factor 3 enters and why changing $H_0$ changes the dimensional Λ value but not the dimensionless fraction. [derived-under-assumptions]

Error accounting should be done on the dimensionless quantities first. Planck 2018's quoted uncertainty on $\Omega_\Lambda$ is much smaller than the gap between $7/11$ and $0.6847$ for the baseline fit, so the leading fraction is not statistically consistent as a precision measurement. It is a nearby structural proposal requiring correction terms or a different dataset interpretation. The dark-matter fraction is closer, but still must pass perturbation and lensing constraints, not only a one-number comparison.

A fair presentation therefore keeps three columns separate: model fraction, observational fit, and discrepancy. It should not round the model until after the comparison is made. It should not switch between $H_0=70$ and Planck $H_0$ without saying so. It should not describe a percent-level mismatch as confirmation. The right phrase is a derived comparison under stated assumptions. [derived-under-assumptions]

## 9. What correction terms would have to do

If compactification or sector corrections are introduced, they must be predictive rather than decorative. A correction $\Delta_\Lambda$ could move $7/11$ toward $0.6847$, but it would need to be derived from a stated mechanism and preferably fixed before the cosmological fit is examined. Otherwise the correction is just a fit parameter replacing the cosmological constant it hoped to explain.

The same is true for dark matter. A correction to $3/11$ might arise from baryon coupling, radiation, neutrino mass, curvature assumptions, or a detailed compact geometry. Each possibility affects more than one observable. A baryon-related correction should touch acoustic peaks; a neutrino-related correction should alter growth; a geometry correction should appear in the background expansion or perturbation equations. Single-number repair is too weak.

A stronger future paper would publish the correction formula, compute $H(z)$, compute linear perturbation growth, compare CMB peak constraints, and state a failure threshold before fitting. If the same mechanism improved Λ and dark matter simultaneously, the programme claim would become more serious. If separate ad hoc terms were needed, the structural appeal of the fractions would decline. [open-hypothesis]

## 10. Baryons, radiation, and closure

The dark-sector fractions should be read together with the ordinary components. Baryons contribute about five percent of the present critical density. Radiation is dynamically important in the early universe but small today. Curvature is constrained to be close to zero in the baseline model. A fraction proposal for dark energy and dark matter must leave room for these ordinary terms or explain how closure is restored.

The simple triplet $7/11$, $3/11$, and $1/11$ sums to one, but $1/11\approx0.0909$ is larger than the observed baryon fraction plus present radiation. If the programme uses $1/11$ as a residual sector rather than a baryon prediction, that should be stated. If it is intended as an ordinary-matter fraction, it conflicts with Planck-level accounting. This is an example where a clean integer partition is not automatically a cosmological model. [derived-under-assumptions]

A more precise sector model might split the residual into baryons, radiation, neutrinos, curvature tolerance, or localisation corrections. It would then need to preserve nucleosynthesis, CMB baryon loading, and structure constraints. The attractive feature of the fractions is their simplicity; the scientific risk is that the missing ordinary-sector detail hides the real work. [open-hypothesis]
