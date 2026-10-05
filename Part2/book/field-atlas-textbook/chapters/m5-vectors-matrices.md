# Vectors, Fields and Matrices {#ch:m-vectors}

A temperature is one number; a wind has a speed *and* a direction. Quantities with direction are **vectors**, and a vector at every point of space is a **vector field**, the language of flows, forces and gradients in every chapter of this course. Vectors are moved, stretched and turned by **matrices**, and each matrix has a few special directions it only stretches: its **eigenvectors**. Eigenvectors are the normal modes of a vibrating system, the principal stresses in a rock, and the directions in which a disturbed system returns to rest or runs away. This chapter builds these ideas in two dimensions, where every one of them can be drawn.

**Chapter outline.** [-@sec:m-vec-vectors] Vectors · [-@sec:m-vec-fields] Vector fields, gradients and circulation · [-@sec:m-vec-matrices] Matrices as transformations · [-@sec:m-vec-eigen] Eigenvalues and eigenvectors · [-@sec:m-vec-stability] Stability from eigenvalues

## Vectors {#sec:m-vec-vectors}

::: {.learning-objectives}
- write a vector in components and find its magnitude;
- add vectors and multiply them by numbers;
- use the dot product to find a projection, an angle or the work done by a force.
:::

A **vector** is a quantity with a size and a direction, drawn as an arrow. In a plane it has two **components**, $\mathbf{a} = (a_x, a_y)$: how far the arrow goes along $x$ and along $y$. Its size, the **magnitude**, follows from Pythagoras, $|\mathbf{a}| = \sqrt{a_x^2 + a_y^2}$. Vectors add component by component, which is the same as placing the arrows head to tail, and multiplying by a number stretches the arrow. Bold letters, or arrows on top, mark vectors in print.

The **dot product** of two vectors multiplies them into a single number:

$$\mathbf{a} \cdot \mathbf{b} = a_x b_x + a_y b_y = |\mathbf{a}|\,|\mathbf{b}|\cos\theta,$$ {#eq:m-vec-dot}

where $\theta$ is the angle between them. It measures how much one vector points along the other. It is largest when they are parallel, zero when they are perpendicular and negative when they point apart. The **work** done by a force $\mathbf{F}$ moving an object through a displacement $\mathbf{d}$ is $W = \mathbf{F} \cdot \mathbf{d}$: only the part of the force along the motion does work.

::: {.example #ex:m-vec-sledge title="Pulling a sledge"}
A child pulls a sledge $10\,\mathrm{m}$ along flat snow with a rope at $30^\circ$ above the horizontal, with a force of $50\,\mathrm{N}$. How much work does the child do?

**Strategy.** Use $W = |\mathbf{F}|\,|\mathbf{d}|\cos\theta$ from @eq:m-vec-dot.

**Solution.** $W = 50 \times 10 \times \cos 30^\circ = 433\,\mathrm{J}$.

**Significance.** The upward part of the pull, $50\sin 30^\circ = 25\,\mathrm{N}$, lifts some of the sledge's weight off the snow but does no work, because the sledge does not rise. The dot product sorts the useful part of a force from the rest.
:::

::: {.check-your-learning}
Find the angle between $\mathbf{a} = (2, 3)$ and $\mathbf{b} = (4, -1)$. (Answer: $\mathbf{a}\cdot\mathbf{b} = 5$, $|\mathbf{a}| = 3.61$, $|\mathbf{b}| = 4.12$, so $\cos\theta = 0.336$ and $\theta = 70.3^\circ$.)
:::

## Vector fields, gradients and circulation {#sec:m-vec-fields}

::: {.learning-objectives}
- compute the gradient of a scalar field and interpret it as an uphill arrow;
- distinguish a field that spreads out from a source from one that circulates;
- read a contour map with its gradient.
:::

A **vector field** gives a vector at every point: the velocity of water in a river, the electric field around a charge, the force on a ball rolling on a curved surface. The most important way to make one is from a scalar field. The **gradient** of a scalar field $f(x, y)$ is the vector of its slopes along each axis,

$$\nabla f = \left(\frac{\partial f}{\partial x},\ \frac{\partial f}{\partial y}\right),$$ {#eq:m-vec-gradient}

where $\partial f/\partial x$, a **partial derivative**, is the slope along $x$ with $y$ held fixed (@sec:m-change-derivative). The gradient points straight uphill, and its length is the steepness. On a contour map it crosses the contour lines at right angles. Many laws of nature say that something flows *down* a gradient, as heat and charge do in @sec:fields-fields, and that a ball on a curved surface feels a force $-\nabla U$ towards lower energy.

{{Visualize | eq:m-vec-gradient | contour-map:soma | f="(x^2 - 1)^2 + y^2"; x=[-1.8,1.8]; y=[-1.4,1.4]; levels=18; downhill=true; zlabel="height $U$"; label=fig:m-vec-landscape; height=36% }} A landscape with two valleys and a pass between them, $U = (x^2 - 1)^2 + y^2$. The white arrows are $-\nabla U$, pointing downhill at right angles to the contours. A ball released anywhere rolls into one of the two valleys; which one depends on which side of the ridge it starts.

Fields of arrows come in two basic patterns. A field like the source of @fig:m-acc-flux spreads out: arrows leave every closed curve around the source, and the field has **divergence**. A field like the swirl of water round a plughole circulates: following the arrows round a loop brings you back, and the field has **curl**. The simplest swirl is $\mathbf{F} = (-y, x)$, which turns every point anticlockwise about the origin.

$$\mathbf{F}_{\mathrm{swirl}}(x, y) = (-y,\ x)$$ {#eq:m-vec-swirl}

{{Visualize | eq:m-vec-swirl | vector-field:wave | u="-y"; v="x"; x=[-2,2]; y=[-2,2]; n=15; circle=1; expect_flux=0; expect_circulation=2*pi; label=fig:m-vec-swirl; height=34% }} A pure swirl. Nothing flows out of the red circle (the flux is zero), but going round it the field pushes all the way: the circulation is $2\pi$, twice the area of the circle.

::: {.example #ex:m-vec-temperature-gradient title="A gradient in a room"}
In a room, the temperature is $T(x, y) = 20 + 0.5x - 0.2y$ (in $^\circ\mathrm{C}$, with $x$ and $y$ in metres). Find the gradient, its magnitude, and the direction heat flows.

**Strategy.** Take the partial derivatives of @eq:m-vec-gradient; heat flows along $-\nabla T$.

**Solution.** $\nabla T = (0.5, -0.2)\,\mathrm{K\,m^{-1}}$, with magnitude $\sqrt{0.25 + 0.04} = 0.54\,\mathrm{K\,m^{-1}}$. Heat flows along $(-0.5, 0.2)$: mostly towards negative $x$, and a little towards positive $y$, from warm to cold.

**Significance.** The gradient packs the two slopes into one arrow. Fourier's law, $\mathbf{q} = -k\nabla T$, then gives the heat flux in both directions at once.
:::

::: {.check-your-learning}
On a hill of height $h = 100 - 0.002x^2 - 0.001y^2$ metres, what is the gradient at $(x, y) = (50, 100)$, and how steep is the slope? (Answer: $\nabla h = (-0.2, -0.2)$; the slope is $0.28$, an angle of $15.8^\circ$.)
:::

## Matrices as transformations {#sec:m-vec-matrices}

::: {.learning-objectives}
- multiply a $2 \times 2$ matrix by a vector;
- describe a matrix as a transformation of the plane;
- compose two transformations by multiplying their matrices.
:::

A **matrix** is a table of numbers that turns vectors into other vectors. A $2 \times 2$ matrix acts on a vector by taking a dot product of each row with it:

$$\begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} ax + by \\ cx + dy \end{pmatrix}.$$ {#eq:m-vec-matrix}

Matrices of this kind are **linear**: they send straight lines to straight lines and keep the origin fixed. A diagonal matrix $\begin{pmatrix} 2 & 0 \\ 0 & 1 \end{pmatrix}$ stretches the plane by two along $x$ and leaves $y$ alone. The matrix $R = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$ turns every vector a quarter-turn anticlockwise: it sends $(3, 4)$ to $(-4, 3)$, exactly what multiplying $3 + 4i$ by $i$ did in @fig:m-osc-rotate.

Applying one matrix after another is the same as applying their **product**, found by taking dot products of the rows of the first with the columns of the second. Order matters: in general $AB \neq BA$, as anyone who has rotated a book and then flipped it, or flipped and then rotated, can confirm.

::: {.check-your-learning}
Compute $R^2$ for the quarter-turn matrix $R$ and say what it does. (Answer: $R^2 = \begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$, a half-turn: every vector is reversed, as $i^2 = -1$ reverses a complex number.)
:::

## Eigenvalues and eigenvectors {#sec:m-vec-eigen}

::: {.learning-objectives}
- define an eigenvector and its eigenvalue;
- find the eigenvalues of a $2 \times 2$ matrix from its trace and determinant;
- interpret eigenvectors as the natural directions, or modes, of a system.
:::

Most vectors change direction when a matrix acts on them. A few special ones do not: the matrix only stretches them. Such a vector is an **eigenvector** (German *eigen*, "own"), and the stretch factor is its **eigenvalue** $\lambda$:

$$A\,\mathbf{v} = \lambda\,\mathbf{v}.$$ {#eq:m-vec-eigen}

For a $2 \times 2$ matrix the eigenvalues solve a quadratic, the **characteristic equation**,

$$\lambda^2 - (a + d)\,\lambda + (ad - bc) = 0,$$ {#eq:m-vec-characteristic}

whose coefficients are the **trace** $a + d$ (the sum of the diagonal) and the **determinant** $ad - bc$ (the factor by which the matrix scales areas). The eigenvalues add up to the trace and multiply to the determinant.

$$A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$$ {#eq:m-vec-example-matrix}

{{Visualize | eq:m-vec-example-matrix | eigen-transform:generic | matrix="[[2,1],[1,2]]"; expect_eigen="1,3"; label=fig:m-vec-eigen; height=36% }} The matrix $A$ turns the unit circle (dashed) into an ellipse. Grey arrows show where sample points move; most change direction. Along the two eigenvectors they do not: the diagonal $(1, 1)$ is stretched three times, and the other diagonal $(1, -1)$ is left unchanged.

::: {.example #ex:m-vec-eigen-example title="Eigenvalues of a symmetric matrix"}
Find the eigenvalues and eigenvectors of the matrix $A$ in @eq:m-vec-example-matrix.

**Strategy.** The trace is $4$ and the determinant $3$; solve @eq:m-vec-characteristic, then find $\mathbf{v}$ from $A\mathbf{v} = \lambda\mathbf{v}$.

**Solution.** $\lambda^2 - 4\lambda + 3 = 0$ gives $\lambda = 1$ and $\lambda = 3$. For $\lambda = 3$: $2x + y = 3x$, so $y = x$ and $\mathbf{v} = (1, 1)$. For $\lambda = 1$: $2x + y = x$, so $y = -x$ and $\mathbf{v} = (1, -1)$.

**Significance.** The eigenvectors are perpendicular, which always happens for a **symmetric** matrix (one equal to its mirror image across the diagonal). The program that drew @fig:m-vec-eigen computed the eigenvalues independently and checked them against this example.
:::

The physical meaning of eigenvectors is clearest in a vibrating system. Two equal masses $m$, each held to a wall by a spring $k$ and joined to each other by a third spring $k$, obey Newton's law in the matrix form $\ddot{\mathbf{x}} = -\tfrac{k}{m}\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}\mathbf{x}$. Its eigenvectors are the **normal modes**: the two masses swinging together, $(1, 1)$, with $\omega^2 = k/m$, and swinging opposite, $(1, -1)$, with $\omega^2 = 3k/m$. Any motion of the pair is a mixture of these two, each at its own frequency. The standing waves of a string (@sec:fields-waves) are the same idea with infinitely many masses.

::: {.check-your-learning}
Find the eigenvalues of $\begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$. (Answer: trace $7$, determinant $10$, so $\lambda^2 - 7\lambda + 10 = 0$: $\lambda = 2$ and $5$.)
:::

## Stability from eigenvalues {#sec:m-vec-stability}

::: {.learning-objectives}
- write the motion near a resting point as a linear system $\dot{\mathbf{x}} = A\mathbf{x}$;
- decide from the eigenvalues whether the resting point is stable;
- recognise complex eigenvalues as spirals, the poles of @ch:m-oscillation.
:::

Close to a resting point almost any system behaves linearly: the rate of change of a small disturbance $\mathbf{x}$ is a matrix times the disturbance,

$$\frac{d\mathbf{x}}{dt} = A\,\mathbf{x}.$$ {#eq:m-vec-linear-system}

Along an eigenvector the matrix only stretches, so each eigen-direction behaves like the one-number law of @eq:m-change-decay-law: it changes as $e^{\lambda t}$. If every eigenvalue has a negative real part, every disturbance dies away and the resting point is **stable**. If any has a positive real part, some disturbance grows and the point is **unstable**. If the eigenvalues are complex, $\lambda = -\gamma \pm i\omega$, the disturbance spirals as it decays: these are exactly the poles of the damped oscillator (@eq:m-osc-poles). Eigenvalues and poles are the same thing seen from two sides.

$$A_{\mathrm{spiral}} = \begin{pmatrix} -1 & 2 \\ -2 & -1 \end{pmatrix}$$ {#eq:m-vec-spiral-matrix}

{{Visualize | eq:m-vec-spiral-matrix | vector-field:soma | u="-x + 2*y"; v="-2*x - y"; x=[-2,2]; y=[-2,2]; n=15; circle=1; expect_flux=-2*pi; expect_circulation=-4*pi; label=fig:m-vec-spiral; height=34% }} The flow of $\dot{\mathbf{x}} = A_{\mathrm{spiral}}\mathbf{x}$. Arrows turn clockwise and point inwards: a disturbance spirals back to rest. The inward flux through the circle reflects the negative trace, the circulation the rotation.

::: {.example #ex:m-vec-spiral title="A stable spiral"}
Find the eigenvalues of $A_{\mathrm{spiral}}$ and describe what a small disturbance does.

**Strategy.** Trace $-2$, determinant $(-1)(-1) - (2)(-2) = 5$. Solve @eq:m-vec-characteristic.

**Solution.** $\lambda^2 + 2\lambda + 5 = 0$ gives $\lambda = -1 \pm 2i$. The disturbance shrinks as $e^{-t}$ while turning at $2\,\mathrm{rad}$ per unit time: a spiral into the resting point, about a third of a turn per time constant.

**Significance.** Two numbers from the matrix, its trace and determinant, decided the whole behaviour. The same test, applied to the curvature of a landscape, tells whether a valley in @sec:human-state-landscape holds a state or lets it go.
:::

The landscape of @fig:m-vec-landscape shows all the cases at once. At the bottom of each valley the curvature is positive in every direction and a ball returns: stable. At the pass in the middle the surface curves up along $y$ but down along $x$, a **saddle**: one eigenvalue of each sign, so a ball balanced there stays only if it is perfectly placed and rolls off along $x$ at the slightest push. Ridges and passes like this decide which way a system tips (@sec:human-tipping-points-critical).

::: {.going-further}
For symmetric matrices the eigenvalues are always real and the eigenvectors can be chosen perpendicular, the **spectral theorem**. It is why the normal modes of any vibrating structure are independent, and why a stress tensor (@sec:fields-fields) has three **principal stresses** along perpendicular axes: the eigenvalues and eigenvectors of the $3 \times 3$ symmetric stress matrix. The curvature of a landscape at a resting point is also a symmetric matrix, the **Hessian** of second partial derivatives; its eigenvalues are the stiffnesses along the natural directions. For @fig:m-vec-landscape the Hessian at a valley floor $(\pm 1, 0)$ has eigenvalues $8$ and $2$, both positive; at the pass it has $-4$ and $2$, the signature of a saddle.
:::

::: {.check-your-learning}
Is the resting point of $\dot{\mathbf{x}} = \begin{pmatrix} 1 & 0 \\ 0 & -2 \end{pmatrix}\mathbf{x}$ stable? (Answer: no. The eigenvalues are $1$ and $-2$; disturbances along $x$ grow as $e^{t}$, so it is a saddle.)
:::

::: {.soma-machine}
The Soma Machine's field at each level is a vector or tensor field, and its tours stop at valleys, passes and spirals of the kind drawn here. **Try it:** `#level=human-vertebrate&lens=on` and look for the two valleys and the ridge between them.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
characteristic equation
: the polynomial equation whose roots are a matrix's eigenvalues

curl
: how much a vector field circulates about a point

divergence
: how much a vector field spreads out from a point

dot product
: $\mathbf{a}\cdot\mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$; how much one vector points along another

eigenvector, eigenvalue
: a vector that a matrix only stretches, and the stretch factor

gradient
: the vector of slopes of a scalar field; points uphill

matrix
: a table of numbers that transforms vectors linearly

normal mode
: an eigenvector of a vibrating system; a pattern that oscillates at one frequency

saddle
: a resting point that is stable in some directions and unstable in others

stable
: a resting point to which every small disturbance returns
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Dot product
: $\mathbf{a}\cdot\mathbf{b} = a_x b_x + a_y b_y = |\mathbf{a}||\mathbf{b}|\cos\theta$

Gradient
: $\nabla f = (\partial f/\partial x,\ \partial f/\partial y)$

Eigenvectors
: $A\mathbf{v} = \lambda\mathbf{v}$

Characteristic equation
: $\lambda^2 - (\mathrm{tr}\,A)\lambda + \det A = 0$

Linear stability
: $\dot{\mathbf{x}} = A\mathbf{x}$; stable if every eigenvalue has negative real part
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-vec-vectors]** Vectors have components and a magnitude; the dot product measures alignment and gives work.

**[-@sec:m-vec-fields]** The gradient of a scalar field points uphill; vector fields can spread out (divergence) or circulate (curl).

**[-@sec:m-vec-matrices]** Matrices transform the plane linearly; products compose transformations, and order matters.

**[-@sec:m-vec-eigen]** Eigenvectors are directions a matrix only stretches. For symmetric matrices they are perpendicular; in vibrating systems they are normal modes.

**[-@sec:m-vec-stability]** Near a resting point, eigenvalues decide stability: negative real parts return, positive ones escape, complex ones spiral. Eigenvalues and poles are the same idea.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does a force perpendicular to the motion do no work?
2. What does the gradient of a contour map look like, and why is it perpendicular to the contours?
3. Give an everyday example of a field with divergence and one with curl.
4. Why does the order of two matrix multiplications matter?
5. What is special about the eigenvectors of a symmetric matrix, and where does that matter in physics?
6. A resting point has eigenvalues $-0.1 \pm 5i$. Describe what a small disturbance does.
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-vec-projection title="Wind on a sail"}
Wind blows with velocity $(6, 8)\,\mathrm{m\,s^{-1}}$. A boat heads along the unit vector $(0.6, -0.8)$. What component of the wind lies along the boat's heading?
:::

::: {.solution}
**Strategy.** The component of $\mathbf{w}$ along a unit vector $\hat{\mathbf{u}}$ is $\mathbf{w}\cdot\hat{\mathbf{u}}$.

**Solution.** $6 \times 0.6 + 8 \times (-0.8) = 3.6 - 6.4 = -2.8\,\mathrm{m\,s^{-1}}$.

**Significance.** The negative sign means the wind blows partly *against* the heading. The full wind speed is $10\,\mathrm{m\,s^{-1}}$, but along this course only $2.8\,\mathrm{m\,s^{-1}}$ of it counts, and in the wrong direction.
:::

::: {.problems #pr:m-vec-hessian title="Valley and pass"}
For the landscape $U = (x^2 - 1)^2 + y^2$ of @fig:m-vec-landscape, show that $(1, 0)$ and $(0, 0)$ are resting points (zero gradient), and find the curvatures $\partial^2 U/\partial x^2$ and $\partial^2 U/\partial y^2$ at each.
:::

::: {.solution}
**Strategy.** $\partial U/\partial x = 4x(x^2 - 1)$ and $\partial U/\partial y = 2y$; differentiate again.

**Solution.** Both partial derivatives vanish at $(1, 0)$ and at $(0, 0)$. The curvatures are $\partial^2 U/\partial x^2 = 12x^2 - 4$ and $\partial^2 U/\partial y^2 = 2$: at $(1, 0)$ they are $8$ and $2$, at $(0, 0)$ they are $-4$ and $2$.

**Significance.** Both positive means a valley; one of each sign means a pass. These are the Hessian eigenvalues of the Going Further box, here simply the two curvatures, because the cross term $\partial^2 U/\partial x\,\partial y$ is zero.
:::

::: {.problems #pr:m-vec-shear title="A shear"}
The matrix $S = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ slides the plane sideways. Find its eigenvalues and eigenvectors, and say what it does to areas.
:::

::: {.solution}
**Strategy.** Trace $2$, determinant $1$.

**Solution.** $\lambda^2 - 2\lambda + 1 = 0$ gives a repeated eigenvalue $\lambda = 1$. From $x + y = x$, $y = 0$: the only eigenvector is $(1, 0)$. The determinant $1$ means areas are unchanged.

**Significance.** A shear has only one eigen-direction: the layers slide past each other along it. Not every matrix has a full set of eigenvectors; symmetric ones always do.
:::

::: {.problems #pr:m-vec-coupled-pendulums title="Two coupled masses"}
For the two coupled masses of @sec:m-vec-eigen with $k/m = 100\,\mathrm{s^{-2}}$, find the frequencies of the two normal modes in hertz.
:::

::: {.solution}
**Strategy.** The modes have $\omega^2 = k/m$ and $3k/m$.

**Solution.** $\omega_1 = 10\,\mathrm{rad\,s^{-1}}$, $f_1 = 1.59\,\mathrm{Hz}$; $\omega_2 = \sqrt{300} = 17.3\,\mathrm{rad\,s^{-1}}$, $f_2 = 2.76\,\mathrm{Hz}$.

**Significance.** Start one mass moving and the other at rest, and the motion is a mixture of both modes; energy sloshes back and forth between the masses at the difference frequency, $1.17\,\mathrm{Hz}$. This energy exchange between coupled oscillators returns in @ch:groups.
:::

::: {.problems #pr:m-vec-unstable title="Which way does it go?"}
A system near rest obeys $\dot{\mathbf{x}} = \begin{pmatrix} 0 & 1 \\ 4 & 0 \end{pmatrix}\mathbf{x}$. Find the eigenvalues and eigenvectors, and describe the motion after a small push.
:::

::: {.solution}
**Strategy.** Trace $0$, determinant $-4$.

**Solution.** $\lambda^2 - 4 = 0$ gives $\lambda = \pm 2$. For $\lambda = 2$: $y = 2x$, eigenvector $(1, 2)$. For $\lambda = -2$: $y = -2x$, eigenvector $(1, -2)$. A push along $(1, -2)$ dies away as $e^{-2t}$; any push with a part along $(1, 2)$ grows as $e^{2t}$.

**Significance.** This is a saddle, like an inverted pendulum: balanced in principle, but the growing direction wins as soon as it is disturbed.
:::
