# Eleven Dimensions and M-Theory {#ch:eleven-dimensions}

String theory and M-theory propose that space has more dimensions than the three we move in, curled up too small to see. The [T]-Theory programme borrows the language of these theories, including the number eleven. This chapter explains, with the tools of the course, what an extra dimension would mean and how a hidden one would show itself: as a tower of particles, a pattern of symmetries, a web of dictionaries between theories. Then it sets out, side by side and separately labelled, the three different ways the programme uses the words, and what would test each one.

**Chapter outline.** [-@sec:mth-dimension] What a dimension is · [-@sec:mth-kk] A hidden circle: the Kaluza–Klein tower · [-@sec:mth-holonomy] Curled-up shapes and holonomy · [-@sec:mth-duality] The duality web · [-@sec:mth-programme] Three readings kept separate

::: {.maths-you-need}
Standing waves and Fourier series (@sec:fields-waves, @sec:freq-sums-sines); vectors and matrices, eigenvalues (@sec:m-vec-matrices, @sec:m-vec-eigen); powers of ten (@sec:m-scale-powers).
:::

## What a dimension is {#sec:mth-dimension}

::: {.learning-objectives}
- define a dimension as an independent coordinate of a chosen space;
- distinguish physical dimensions, state-space dimensions and bookkeeping counts;
- explain why a small extra dimension could have escaped notice.
:::

A **dimension** is an independent number needed to say where something is in a chosen space. A bead on a wire needs one; a ship on the sea needs two; an aircraft needs three; an event, such as a lightning strike, needs four, three for place and one for time. General relativity describes gravity as the curvature of this four-dimensional **spacetime**.

The word is used for other spaces too, and the course needs to keep them apart. A swinging pendulum moves in ordinary space, but its *state* needs two numbers, angle and angular speed, so its **state space** is two-dimensional. The programme's eight emotional modes (@ch:human) form an eight-dimensional state space: eight numbers describing a condition, not eight directions one could walk in. And a count such as "eleven sectors" may be **bookkeeping**: a way of dividing a total into parts. The same numeral can appear in all three senses. This chapter uses "dimension" alone only for physical dimensions of space and time.

Could space have more physical dimensions than three? Only if the extra ones are small, closed and therefore hidden. A garden hose seen from far away looks like a line, one-dimensional; an ant on it can also walk round it, a second, circular dimension. If the circle is small enough, no experiment with too little energy to resolve it will notice it at all. How much energy is enough is the subject of the next section.

::: {.check-your-learning}
How many dimensions does the state space of two pendulums swinging in the same plane have? (Answer: four: an angle and an angular speed for each.)
:::

## A hidden circle: the Kaluza–Klein tower {#sec:mth-kk}

::: {.learning-objectives}
- show that a field on a circle can only take whole-number modes;
- derive the tower of masses $m_n = n\hbar/Rc$ a hidden circle would produce;
- estimate how small a circle must be to have escaped detection.
:::

In 1921 Theodor Kaluza, and in 1926 Oskar Klein, asked what physics would look like if space had a fourth dimension curled into a circle of radius $R$. A wave travelling round the circle must join up with itself after one turn, $2\pi R$, so only whole numbers of wavelengths fit, exactly as on the string of @sec:fields-waves, but with no ends:

$$\Phi(x, y) = \sum_{n} \phi_n(x)\, e^{iny/R}, \qquad n = 0, \pm 1, \pm 2, \ldots$$ {#eq:mth-circle-modes}

where $y$ is the position round the circle and $x$ stands for the ordinary coordinates. This is the Fourier series of @eq:freq-fourier-series, with the circle as the period.

{{Visualize | eq:mth-circle-modes | function-plot:quantum | f="cos(n*y)"; var=y; vary=n:0,1,2,3; x=[0,2*pi]; legend=below; xlabel="position round the circle $y/R$ (one full turn)"; ylabel="mode shape"; label=fig:mth-circle-modes; height=28% }} The first four patterns a field can take round a circle. Each must join up with itself after one turn, so only whole numbers of waves fit. The $n = 0$ pattern is flat: it does not notice the circle at all.

A wave round the circle carries momentum $p = n\hbar/R$ in the hidden direction. To an observer who cannot see the circle, that momentum appears as **mass**: by $E^2 = (pc)^2 + (mc^2)^2$ the hidden momentum contributes energy even when the particle is at rest in the visible directions. Each mode $n$ appears as a particle of mass

$$m_n c^2 = \frac{|n|\,\hbar c}{R}.$$ {#eq:mth-kk-tower}

This is the **Kaluza–Klein tower**: one ordinary, massless particle ($n = 0$) and above it a ladder of heavy copies, evenly spaced by $\hbar c/R$. A small circle means a widely spaced, very heavy tower, out of reach of any collider; that is how an extra dimension can hide. The geometry of the hidden space has become a spectrum of masses, the same move from boundary to spectrum as the atom in @ch:atoms.

::: {.example #ex:mth-lhc-circle title="How small would a hidden circle have to be?"}
The Large Hadron Collider has found no Kaluza–Klein particles up to energies of roughly $10\,\mathrm{TeV}$. If an extra dimension is a circle, roughly how small must it be? Use $\hbar c = 1.97 \times 10^{-7}\,\mathrm{eV\,m}$.

**Strategy.** The first rung of the tower, $\hbar c/R$, must be above $10^{13}\,\mathrm{eV}$; solve @eq:mth-kk-tower for $R$.

**Solution.** $R < \hbar c/E = 1.97 \times 10^{-7}/10^{13} = 2 \times 10^{-20}\,\mathrm{m}$.

**Significance.** That is a hundred thousand times smaller than a proton, and still enormously larger than the Planck length, $1.6 \times 10^{-35}\,\mathrm{m}$, where string theory expects its structure. The real bounds depend on which fields can travel in the extra dimension; theories in which only gravity does allow much larger circles, which experiments testing gravity at sub-millimetre distances constrain directly.
:::

::: {.check-your-learning}
If an extra circle were $1\,\mathrm{mm}$ in radius, how heavy would the first Kaluza–Klein particle be? (Answer: $\hbar c/R = 2 \times 10^{-4}\,\mathrm{eV}$, far lighter than an electron: such a circle would have been noticed unless ordinary particles cannot enter it.)
:::

## Curled-up shapes and holonomy {#sec:mth-holonomy}

::: {.learning-objectives}
- describe tori, Calabi–Yau spaces and $G_2$ spaces by their dimensions;
- define holonomy as the rotation a vector picks up round a loop;
- compute the holonomy of a loop on a sphere from its area.
:::

A circle is the simplest hidden space. A **torus**, the surface of a ring doughnut, has two independent circles and a tower labelled by two whole numbers. String theory, which needs ten dimensions in all, curls six of them into a **Calabi–Yau space**; M-theory, which needs eleven, curls seven into a **$G_2$ space**. These shapes are not chosen for their looks. They are singled out by a property called holonomy, which decides how much symmetry, in particular supersymmetry, survives in the four dimensions we see.

**Holonomy** is what happens to an arrow carried round a closed loop without being turned. On a flat sheet the arrow comes back pointing the same way. On a curved surface it need not. Carry an arrow along the equator of a globe, up a meridian to the north pole and back down another meridian, always keeping it as straight as the surface allows, and it returns rotated. On a sphere of radius $r$ the rotation angle equals the area enclosed by the loop divided by $r^2$:

$$\theta = \frac{A}{r^2}.$$ {#eq:mth-holonomy-sphere}

![Parallel transport round a loop on a curved surface. The arrow is never turned relative to the surface, yet it returns rotated; the set of all such rotations is the surface's holonomy group.](../field-atlas/figures/theory/T4_5_holonomy_transport.png){width=70%}

::: {.example #ex:mth-octant title="An arrow round an eighth of a globe"}
An arrow is carried round the triangle formed by a quarter of the equator and two meridians meeting at the north pole, with a right angle at each corner. By how much is it rotated when it returns?

**Strategy.** The triangle covers one eighth of the sphere; use @eq:mth-holonomy-sphere.

**Solution.** $A = 4\pi r^2/8 = \pi r^2/2$, so $\theta = \pi/2$: a quarter-turn, $90^\circ$.

**Significance.** The three angles of this triangle add to $270^\circ$, not $180^\circ$; the excess, $90^\circ$, is the holonomy. Curvature shows itself as rotation round loops, and a space whose loops can only produce a restricted set of rotations (**special holonomy**) keeps some symmetry intact. For a six-dimensional Calabi–Yau space the allowed rotations form the group $SU(3)$; for a seven-dimensional $G_2$ space, the exceptional group $G_2$.
:::

::: {.check-your-learning}
A loop on a sphere of radius $r$ encloses an area $\pi r^2/3$. What is its holonomy angle? (Answer: $\pi/3$, or $60^\circ$.)
:::

## The duality web {#sec:mth-duality}

::: {.learning-objectives}
- name the five superstring theories and their relation to M-theory;
- explain T-duality as an exchange of momentum and winding;
- state what a duality requires: a dictionary, not a resemblance.
:::

By the early 1990s there were five consistent superstring theories in ten dimensions: type I, type IIA, type IIB, and two heterotic theories with symmetry groups $SO(32)$ and $E_8 \times E_8$. In 1995 Edward Witten and others showed that they are not rivals but limits of one larger theory, called **M-theory**, whose low-energy limit is eleven-dimensional supergravity. Strongly coupled type IIA string theory, for instance, grows an eleventh dimension shaped as a circle. The relations between the limits are **dualities**: exact dictionaries that translate every measurable quantity in one description into a quantity in another.

![The duality web: five ten-dimensional string theories and eleven-dimensional supergravity as limits of M-theory. Each edge is a dictionary between descriptions.](../field-atlas/figures/theory/T4_4_duality_web.png){width=70%}

The simplest is **T-duality**. A string on a circle of radius $R$ can carry momentum round it, energy $n\hbar c/R$ as in @eq:mth-kk-tower, and it can also *wind* round it $w$ times, with energy proportional to $wR$. Exchanging $n$ with $w$ and $R$ with $\ell_s^2/R$, where $\ell_s$ is the string length, leaves the whole spectrum unchanged. A very small circle and a very large one describe the same physics.

The lesson matters beyond string theory. Two theories are dual not because they look alike or share a number, but because a stated rule maps every observable of one onto an observable of the other and the predictions agree. **A duality requires a dictionary.** That is the standard to which any cross-domain identity in this book, including the programme's, must be held (@sec:zoom-operator).

::: {.check-your-learning}
In units where $\ell_s = 1$, a string on a circle of radius $2$ is T-dual to a string on a circle of what radius? (Answer: $1/2$.)
:::

## Three readings kept separate {#sec:mth-programme}

::: {.learning-objectives}
- distinguish the three ways the programme uses compactification language;
- give each reading its evidence label and its test;
- decompose a matrix into an isotropic part and a traceless remainder.
:::

Everything above is standard theoretical physics; Penrose gives a critical introduction to strings and M-theory in chapters 31 and 32 of his survey [@penrose2004road]. None of it is yet experimentally confirmed: no extra dimension, Kaluza–Klein particle or superpartner has been observed. As physics, the subject is `derived-under-assumptions`. The programme uses its language in three different ways, which must not be merged.

**Reading 1: physical compactification.** Extra dimensions are real and small; their geometry fixes particle masses and forces through towers like @eq:mth-kk-tower. This is the string-theory reading. The programme has *not* constructed such a compactification: it has derived no particle spectrum, stabilised no sizes, and reproduced no masses. Any claim that it has would be false.

**Reading 2: an eleven-part bookkeeping.** The programme divides a total into sectors labelled $M_4 \times P_3 \times L_1 \times C_3$, with $4 + 3 + 1 + 3 = 11$, and compares fractions such as $7/11$ and $3/11$ with measured shares of the cosmic energy budget [@P21; @P22]. The arithmetic is `derived-under-assumptions`; the comparison with the universe is checked against Planck data in @ch:cosmology and tested further in @ch:dark-sectors. The count of eleven does *not* by itself make this M-theory: it would be a false syllogism to argue "M-theory has eleven dimensions, the programme has eleven sectors, so the programme is M-theory".

**Reading 3: the eight-to-seven fold.** The programme's eight-mode coupling matrix $W_8$ (@ch:human) is split into an equal-weight part and a remainder: $W_8 = \tfrac{6}{5}I_8 + \delta W$, with $\delta W$ traceless and carrying $48.4\,\%$ of the matrix's size [@P24]. The trace arithmetic is formal and checked; reading the seven traceless directions as a broken $G_2$ symmetry of a living system is `derived-under-assumptions` as mathematics and `open-hypothesis` as biology.

The split in reading 3 is ordinary linear algebra, and it can be done by hand for a $2 \times 2$ matrix.

$$A = \begin{pmatrix} 1.5 & 0.4 \\ 0.4 & 0.9 \end{pmatrix} = \tfrac{6}{5}\,I + \begin{pmatrix} 0.3 & 0.4 \\ 0.4 & -0.3 \end{pmatrix}$$ {#eq:mth-split}

{{Visualize | eq:mth-split | eigen-transform:quantum | matrix="[[1.5,0.4],[0.4,0.9]]"; expect_eigen="0.7,1.7"; label=fig:mth-split; height=34% }} The matrix of @eq:mth-split acting on the unit circle. The isotropic part alone would turn the circle into a larger circle of radius $1.2$; the traceless remainder stretches one direction and squeezes the other by $0.5$, giving eigenvalues $1.2 \pm 0.5$.

::: {.example #ex:mth-frobenius title="How far from isotropic?"}
For the matrix $A$ of @eq:mth-split, find the size of the traceless part relative to the whole, measured by the **Frobenius norm** (the square root of the sum of the squares of all entries).

**Strategy.** The isotropic part is the mean of the diagonal, $\mathrm{tr}A/2 = 1.2 = 6/5$, times $I$. Subtract it, then compare norms.

**Solution.** $\|\delta\|_F = \sqrt{0.09 + 0.16 + 0.16 + 0.09} = 0.707$ and $\|A\|_F = \sqrt{2.25 + 0.16 + 0.16 + 0.81} = 1.84$, so the ratio is $0.38$.

**Significance.** P24 reports the same ratio, $0.484$, for its $8 \times 8$ matrix. The calculation is mechanical; what it *means* depends entirely on where the matrix came from. Its test is to re-estimate $W_8$ from a defined dataset and recompute the split; if the form does not persist, the claim fails.
:::

| Reading | Status | What would test it |
|:--|:--|:--|
| Physical compactification | not constructed by the programme | a derived particle spectrum with stabilised moduli that matches observation |
| Eleven-part bookkeeping | `derived-under-assumptions` (arithmetic); comparison in @ch:dark-sectors | dark-sector fractions measured more precisely, and their behaviour with redshift |
| Eight-to-seven fold | `derived-under-assumptions`; biological reading `open-hypothesis` | re-estimating $W_8$ from new data and recomputing trace split, eigenvalues and Frobenius ratio |

The bridge from M-theory to the programme's grammar as a whole is therefore an `open-hypothesis`. A strong future result would map the bookkeeping sectors to a compact geometry, derive a low-energy spectrum, keep general relativity intact locally, and reproduce the dark-sector fractions without fitting them after the fact.

::: {.going-further}
The exceptional group $G_2$ has a concrete origin. The **octonions** extend the chain of number systems (real, complex, quaternions) to eight dimensions: one real unit and seven imaginary ones. Their multiplication is not associative, and it can be summarised on the **Fano plane**, seven points on seven lines, each line a multiplication rule. The symmetries that preserve octonion multiplication form exactly $G_2$, a fourteen-dimensional group acting on the seven imaginary units. This is why seven-fold patterns turn up near $G_2$, and why the programme's seven traceless directions invite the comparison. A mnemonic is not a proof: the proof defines the product and computes its symmetry group.

![The Fano plane: a mnemonic for multiplying the seven imaginary octonion units. Each line, followed in the direction of its arrow, gives a product rule.](../field-atlas/figures/theory/T4_6_fano_plane.png){width=55%}
:::

::: {.soma-machine}
At the smallest scales the Soma Machine's levels reach into the territory of this chapter. **Try it:** `#level=string-boundary&lens=on` and read how the level's header labels its claims.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
Calabi–Yau space
: a six-dimensional curled-up space with $SU(3)$ holonomy, used in ten-dimensional string theory

dimension
: an independent coordinate of a chosen space

duality
: an exact dictionary mapping every observable of one theory onto another

$G_2$ space
: a seven-dimensional curled-up space with holonomy $G_2$, used in M-theory

holonomy
: the rotation an arrow acquires when carried round a closed loop

Kaluza–Klein tower
: the ladder of masses $|n|\hbar c/R$ produced by a hidden circle of radius $R$

M-theory
: the eleven-dimensional theory of which the five superstring theories are limits

state space
: the space of numbers needed to describe a system's condition, not its position

T-duality
: the equivalence of strings on circles of radius $R$ and $\ell_s^2/R$
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Modes on a circle
: $\Phi = \sum_n \phi_n(x)\,e^{iny/R}$

Kaluza–Klein tower
: $m_n c^2 = |n|\hbar c/R$

Holonomy on a sphere
: $\theta = A/r^2$

Isotropic split
: $W = \tfrac{\mathrm{tr}W}{n}I + \delta W$, $\ \mathrm{tr}\,\delta W = 0$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:mth-dimension]** A dimension is an independent coordinate. Physical dimensions, state-space dimensions and bookkeeping counts are different things.

**[-@sec:mth-kk]** A hidden circle turns momentum into mass: a tower spaced by $\hbar c/R$. Unseen at the LHC means $R \lesssim 10^{-20}\,\mathrm{m}$ for fields that can enter it.

**[-@sec:mth-holonomy]** Curvature shows as rotation round loops; special holonomy ($SU(3)$, $G_2$) preserves symmetry.

**[-@sec:mth-duality]** Five string theories are limits of M-theory, linked by dualities. A duality is a dictionary, not a resemblance.

**[-@sec:mth-programme]** The programme's three readings (physical, bookkeeping, matrix fold) have different labels and different tests; none is a constructed compactification.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why is an eight-mode emotional state not eight dimensions of space?
2. How does a hidden circle turn into a tower of particles?
3. What does it mean for an arrow to come back rotated after a trip round a loop?
4. Why does T-duality say a tiny circle and a huge one can describe the same physics?
5. What is wrong with the argument "eleven sectors, therefore M-theory"?
6. For each of the three readings, name the observation or calculation that could prove it wrong.
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:mth-tower-rung title="The first rung"}
A hidden circle has radius $R = 10^{-19}\,\mathrm{m}$. What is the mass-energy of the first Kaluza–Klein particle, and could the LHC make it?
:::

::: {.solution}
**Strategy.** $m_1c^2 = \hbar c/R$ with $\hbar c = 1.97 \times 10^{-7}\,\mathrm{eV\,m}$.

**Solution.** $1.97 \times 10^{-7}/10^{-19} = 2.0 \times 10^{12}\,\mathrm{eV} = 2.0\,\mathrm{TeV}$, within the LHC's reach.

**Significance.** Searches at the LHC have looked for exactly such states; their absence is what pushes $R$ below about $10^{-20}\,\mathrm{m}$ in these models.
:::

::: {.problems #pr:mth-torus-tower title="A square torus"}
On a torus made of two circles of the same radius $R$, a mode has two whole numbers $(n_1, n_2)$ and mass $m c^2 = (\hbar c/R)\sqrt{n_1^2 + n_2^2}$. List the lightest massive states and count how many share each mass.
:::

::: {.solution}
**Strategy.** Try the smallest non-zero pairs.

**Solution.** $(\pm 1, 0)$ and $(0, \pm 1)$ give $\hbar c/R$: four states. $(\pm 1, \pm 1)$ give $\sqrt{2}\,\hbar c/R$: four states. Then $(\pm 2, 0)$ and $(0, \pm 2)$ give $2\hbar c/R$: four more.

**Significance.** The pattern of masses and their multiplicities reflects the shape of the hidden space. A rectangular torus would split the first four; the spectrum is the shape heard as masses.
:::

::: {.problems #pr:mth-triangle-holonomy title="A triangle with a fat corner"}
A triangle on a unit sphere has angles of $90^\circ$, $90^\circ$ and $60^\circ$. What is its area, and by how much does it rotate an arrow carried round it?
:::

::: {.solution}
**Strategy.** On a unit sphere the area of a triangle equals its angle excess over $180^\circ$, in radians, and so does its holonomy.

**Solution.** The excess is $240^\circ - 180^\circ = 60^\circ = \pi/3$. The area is $\pi/3 = 1.05$ and the arrow turns by $60^\circ$.

**Significance.** The triangle covers $1/12$ of the sphere. On a flat sheet the excess would be zero, and so would the holonomy.
:::

::: {.problems #pr:mth-t-duality-check title="Momentum or winding?"}
In units where $\hbar c = \ell_s = 1$, a string on a circle of radius $R = 2$ has energy contributions $n/R$ from momentum and $wR$ from winding. Show that the state $(n, w) = (1, 0)$ on this circle has the same energy as $(0, 1)$ on the T-dual circle.
:::

::: {.solution}
**Strategy.** The dual radius is $1/R = 0.5$.

**Solution.** $(1, 0)$ at $R = 2$: $1/2 = 0.5$. $(0, 1)$ at $R' = 0.5$: $1 \times 0.5 = 0.5$. They agree.

**Significance.** Every state on one circle has a partner on the other: the dictionary is complete, which is what makes it a duality rather than a coincidence.
:::

::: {.problems #pr:mth-diagonal-split title="Split a diagonal matrix"}
Split $B = \begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix}$ into an isotropic part and a traceless remainder. Find the Frobenius ratio $\|\delta\|_F/\|B\|_F$ and the eigenvalues of $B$.
:::

::: {.solution}
**Strategy.** The isotropic part is $2I$, half the trace times $I$.

**Solution.** $\delta = \mathrm{diag}(-1, 1)$, so $\|\delta\|_F = \sqrt{2}$, $\|B\|_F = \sqrt{10}$, ratio $0.45$. The eigenvalues are $1$ and $3$, that is $2 \pm 1$.

**Significance.** The eigenvalues are the isotropic value plus and minus the eigenvalues of the remainder, as in @fig:mth-split. For P24's $W_8$ the same split, applied to eight dimensions, is what the claim of $48.4\,\%$ symmetry breaking measures.
:::
