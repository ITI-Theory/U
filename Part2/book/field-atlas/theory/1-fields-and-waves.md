# T1 — Fields and waves {#theory-fields-waves}

## 1. Fields before waves

![Figure T1.1 — A localized disturbance travels through a scalar field while the underlying material points oscillate about equilibrium.](figures/theory/T1_1_wave_packet.png){width=92%}

A field assigns a value to each point of a domain. In elementary examples the value is a real number such as height, pressure, temperature, or voltage; in relativistic field theory it may be a spinor, vector, tensor, connection, or section of a bundle. The statement is mathematical before it is physical: a domain, a value space, and a rule of assignment define the object. [derived-under-assumptions]

A wave is not a separate substance inside the field. It is a pattern in the field that changes in time and usually transports phase, energy, momentum, or information. A pulse on a string moves down the string while individual string elements move mostly transverse to the direction of travel. A sound wave carries compression through air while molecules perform small oscillations about their local positions. Electromagnetic radiation requires no material medium because the electromagnetic field itself supplies the dynamical degrees of freedom; see Penrose 2004, chs. 19 and 24 for the standard field baseline.

The minimal scalar wave equation in one spatial dimension is

$$
\frac{\partial^2 u}{\partial t^2}=c^2\frac{\partial^2 u}{\partial x^2},
$$

where $u(x,t)$ is the field displacement and $c$ is the propagation speed. This equation follows from Newton's law for a taut string with tension $T$ and linear mass density $\mu$, giving $c=\sqrt{T/\mu}$. It also appears as the low-amplitude limit of many systems whose exact equations are nonlinear. The shared equation is not an identity of substances; it is a reusable local model once variables, units, and boundary conditions have been declared. [derived-under-assumptions]

## 2. Superposition and interference

![Figure T1.2 — Two pulses add linearly; the resulting profile is the pointwise sum, including constructive and destructive regions.](figures/theory/T1_2_superposition.png){width=92%}

Linearity gives the first powerful rule. If $u_1$ and $u_2$ both solve the homogeneous linear wave equation, then $a u_1+b u_2$ also solves it for constants $a,b$. This is superposition. Constructive interference occurs where like signs meet; destructive interference occurs where opposite signs meet. The rule is exact for the ideal equation and approximate when amplitudes are small enough that nonlinear terms can be neglected. [derived-under-assumptions]

A useful travelling-wave form is

$$
u(x,t)=f(x-ct)+g(x+ct),
$$

with $f$ moving right and $g$ moving left. A plucked string can be decomposed into such waves, but fixed endpoints reflect them and convert travelling patterns into standing modes. In quantum mechanics the same linear algebra appears in Hilbert space rather than in the displacement of a string: complex state vectors add, and probability amplitudes interfere. The formal analogy is genuine linear mathematics, while the interpretation of the state vector belongs to the physical theory using it. [derived-under-assumptions]

Superposition also shows why cross-scale language must remain typed. Two voltage transients in a membrane, two pressure pulses in air, and two scalar perturbations in a numerical field can all add. Their shared operation is addition in a compatible vector space. Nothing follows about consciousness, cosmology, or matter unless the state variable and measurement map are supplied. A programme claim that a level entry uses a common response grammar is therefore labelled as cross-scale modelling, not as proof of physical sameness. [interpretive]

## 3. Standing modes on bounded domains

![Figure T1.3 — The first four normal modes of a fixed string; nodes remain fixed and the wavelength is selected by the endpoints.](figures/theory/T1_3_string_modes.png){width=92%}

A finite string of length $L$ with fixed endpoints satisfies $u(0,t)=u(L,t)=0$. Separation of variables, $u(x,t)=X(x)T(t)$, gives

$$
\frac{T''}{c^2T}=\frac{X''}{X}=-k^2.
$$

The spatial problem $X''+k^2X=0$ with fixed endpoints has nonzero solutions only for $k_n=n\pi/L$, $n=1,2,3,\ldots$. Thus

$$
u_n(x,t)=A_n\sin\!\left(\frac{n\pi x}{L}\right)\cos(\omega_n t+\phi_n),\qquad
\omega_n=\frac{n\pi c}{L}.
$$

The boundary condition quantises the allowed wavelengths. The word quantise here means a discrete spectrum of a classical boundary-value problem; it is not yet quantum mechanics.

The same eigenfunction logic governs membranes, cavities, drums, and linear perturbations of continuous media. Once the operator and the boundary are fixed, the domain chooses a basis of modes. Initial data determine the coefficients in the modal expansion. For the string,

$$
u(x,0)=\sum_{n=1}^{\infty} A_n\sin\!\left(\frac{n\pi x}{L}\right),
$$

so Fourier coefficients encode the pluck shape. A narrow pluck excites many modes; a smooth sinusoidal initial shape excites mostly one. This is the mathematical origin of timbre in a stringed instrument and of spectral diagnostics in many field measurements. [derived-under-assumptions]

## 4. Membranes and degeneracy

![Figure T1.4 — Rectangular membrane modes: two spatial indices select nodal lines in perpendicular directions.](figures/theory/T1_4_membrane_modes.png){width=92%}

For a rectangular membrane $0<x<a$, $0<y<b$ with fixed boundary, the two-dimensional wave equation is

$$
\partial_t^2 u=c^2(\partial_x^2u+\partial_y^2u).
$$

Separation gives modes

$$
u_{mn}(x,y,t)=A_{mn}\sin\!\left(\frac{m\pi x}{a}\right)
\sin\!\left(\frac{n\pi y}{b}\right)
\cos(\omega_{mn}t+\phi_{mn}),
$$

with

$$
\omega_{mn}=c\pi\sqrt{\frac{m^2}{a^2}+\frac{n^2}{b^2}}.
$$

A square membrane has symmetries that can produce degeneracy: distinct pairs $(m,n)$ and $(n,m)$ have the same frequency. Perturbing the shape or tension splits the degeneracy. This small calculation becomes important in field theory and geometry because spectra remember both operator and domain. Different spaces can occasionally be isospectral, but generic changes of geometry move eigenvalues. [derived-under-assumptions]

Membrane modes are the first place where the word field stops sounding one-dimensional. The value is assigned to a surface, boundary curves matter, and nodal sets become lines instead of isolated points. Higher-dimensional fields follow the same conceptual pattern with richer geometry. The Field Atlas levels use this grammar only after a concrete substrate has been named: membrane voltage, elastic displacement, density contrast, gravitational potential, or a model variable in a registered simulation. [interpretive]

## 5. Boundary conditions as physical information

![Figure T1.5 — Fixed, free, Robin, and absorbing boundary choices select different reflected waves and mode spectra.](figures/theory/T1_5_boundary_conditions.png){width=92%}

A differential equation without boundary conditions is incomplete. Fixed endpoints enforce $u=0$. Free endpoints enforce a zero derivative such as $\partial_xu=0$. Robin conditions combine value and derivative, $\alpha u+\beta\partial_nu=0$, and model partial constraints. Absorbing conditions attempt to let waves leave the domain with minimal reflection. Each choice states how the field meets its environment. [derived-under-assumptions]

Consider a string with one fixed end and one free end. The conditions $u(0,t)=0$ and $\partial_xu(L,t)=0$ give

$$
X(x)=\sin(kx),\qquad \cos(kL)=0,
$$

so $k_n=(n+\tfrac12)\pi/L$. The fundamental frequency is half the fixed-fixed value. This is not a small detail; a changed endpoint changes the spectrum. In observational work, measured resonances can therefore reveal hidden boundary conditions. In modelling work, a boundary copied from another domain without justification can create a false analogy.

A damping layer supplies a second kind of boundary information. If a wave equation is modified to

$$
\partial_t^2u+2\gamma(x)\partial_tu=c^2\partial_x^2u,
$$

and $\gamma(x)$ is nonzero only near an edge, outgoing waves lose energy before reflecting. Numerical solvers use this trick to imitate an open domain. The construction is useful but not neutral: a poor absorbing layer generates spurious echoes. The same caution applies to all programme diagrams that display transitions between levels. A drawn edge is a modelling boundary, not a guarantee that nature uses that cut. [interpretive]

## 6. Dispersion, phase velocity, and group velocity

![Figure T1.6 — A dispersive packet: high and low wavenumbers travel at different phase speeds while the envelope moves at group velocity.](figures/theory/T1_6_dispersion.png){width=92%}

A monochromatic component is written as $e^{i(kx-\omega t)}$. The relation $\omega(k)$ is the dispersion relation. For the ideal string, $\omega=ck$, so every wavelength travels with the same speed. For deep-water gravity waves, $\omega^2=gk$, making the phase velocity $v_p=\omega/k=\sqrt{g/k}$ and the group velocity $v_g=d\omega/dk=\tfrac12\sqrt{g/k}$. Long waves outrun short waves. Dispersion therefore changes the shape of a packet even when the equation remains linear.

Massive relativistic fields have

$$
\omega^2=c^2k^2+\frac{m^2c^4}{\hbar^2}.
$$

The mass term creates a frequency gap at $k=0$. Signals built from finite bandwidth then propagate with a group velocity below $c$. In quantum field theory this relation sits behind the difference between massless and massive mediators, including the Coulomb and Yukawa potentials discussed in T2. See Penrose 2004, chs. 21, 24, and 26 for the standard complex-amplitude and relativistic-wave baseline.

The working rule is simple: same equation, same boundary class, and same dispersion relation justify a strong formal comparison. Shared pictures alone do not. The programme's scale claims in P11 use a recurring response grammar across registered levels; they do not assert that a drumhead, a galaxy, and a nervous system are made of the same field. [derived-under-assumptions]

## 7. Energy flow and impedance

A wave equation also carries an energy accounting. For the ideal string, the energy density is

$$
\mathcal E=\frac12\mu(\partial_tu)^2+\frac12T(\partial_xu)^2,
$$

and the energy flux is

$$
\mathcal P=-T(\partial_tu)(\partial_xu).
$$

Direct differentiation gives a local conservation law, $\partial_t\mathcal E+\partial_x\mathcal P=0$, when no damping or forcing is present. The first term is kinetic energy of the string elements; the second is elastic potential energy stored by slope. This calculation matters because it separates a visual crest from transported energy. A standing wave has local motion and stored energy even though the net average flux through the endpoints vanishes. [derived-under-assumptions]

At a boundary between two strings, impedance determines reflection and transmission. For a string, characteristic impedance is $Z=\sqrt{T\mu}$. A travelling wave meeting a change from $Z_1$ to $Z_2$ has reflection coefficient

$$
R=\frac{Z_2-Z_1}{Z_2+Z_1},
$$

for displacement amplitude under the usual ideal junction assumptions. Equal impedances give no reflection. A severe mismatch reflects most of the pulse. Acoustics, transmission lines, optics, and mechanical waves all have versions of this idea. The formal lesson for cross-level work is that boundaries are not passive lines in a diagram. They can dominate what passes, what returns, and what becomes invisible to a downstream observer.

Damping changes conservation into a balance equation. With a viscous term $2\gamma\partial_tu$, energy decreases at a rate proportional to $(\partial_tu)^2$ after integration over the domain. The lost energy may become heat, unresolved microscopic motion, or external radiation depending on substrate. Describing damping only as "decay" hides the physical channel that absorbs the energy. A model should state that channel when it is known and mark it as unresolved when it is not. [derived-under-assumptions]

## 8. Electromagnetic waves as self-contained fields

Maxwell's equations show that waves need not be displacements of matter. In vacuum, with no charges or currents, the equations imply

$$
\nabla^2\mathbf E-\frac{1}{c^2}\partial_t^2\mathbf E=0,
\qquad
\nabla^2\mathbf B-\frac{1}{c^2}\partial_t^2\mathbf B=0,
$$

where $c^{-2}=\mu_0\epsilon_0$. Electric and magnetic fields regenerate one another as the wave propagates. The energy density is

$$
u=\frac12\epsilon_0|\mathbf E|^2+\frac{1}{2\mu_0}|\mathbf B|^2,
$$

and the energy flux is the Poynting vector $\mathbf S=\mu_0^{-1}\mathbf E\times\mathbf B$. This is baseline physics, not a programme-specific field. [derived-under-assumptions]

The electromagnetic example is useful because it removes the hidden assumption that every wave is a material ripple. It also raises the standard of evidence for any proposed field: if a field is physical, it should state what stores energy, what equations it obeys, how sources couple, and how instruments detect it. If those pieces are absent, the word field may still be a modelling term, but the claim cannot borrow the empirical authority of Maxwell theory. [interpretive]

## 9. The weak and strong uses of wave language

Wave language has a weak use and a strong use. The weak use points to recurring mathematical roles: disturbance, propagation, interference, boundary selection, and spectral decomposition. It is often useful for organising a model before the exact substrate is known. The strong use asserts a specific field equation with parameters, conserved quantities, and measurements. Only the strong use can carry physical prediction by itself. [interpretive]

The difference can be seen in seismology. Saying that Earth "rings" after an earthquake is not merely poetic, because normal modes of the elastic planet are measured. The operator, boundary, and data stream exist. Saying that an institution "rings" after a crisis may be a helpful analogy, but it becomes a model only after variables, timescales, coupling pathways, and observations are fixed. The same word wave therefore spans a large evidence range.
