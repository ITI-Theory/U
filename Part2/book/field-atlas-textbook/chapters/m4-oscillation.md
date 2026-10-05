# Oscillation: Springs, Circles and Complex Numbers {#ch:m-oscillation}

Pull a mass on a spring and let go, and it swings back and forth. Pluck a string, tap a glass, kick a nerve membrane hard enough, push a child on a swing: the world is full of things that oscillate. This chapter finds the one equation behind all of them and the one function that solves it. Along the way it introduces complex numbers. They are not exotic: they are the natural way to describe anything that goes round, and with them a damped oscillation becomes a single point on a plane. That point, called a **pole**, is how the rest of the course reads a spectral line, a resonance and a ringing system.

**Chapter outline.** [-@sec:m-osc-spring] The spring and simple harmonic motion · [-@sec:m-osc-circle] Oscillation as a shadow of a circle · [-@sec:m-osc-complex] Complex numbers · [-@sec:m-osc-euler] Euler's formula and phasors · [-@sec:m-osc-damping] Damping and poles

## The spring and simple harmonic motion {#sec:m-osc-spring}

::: {.learning-objectives}
- write Newton's law for a mass on a spring as a differential equation;
- solve it with a sine or cosine and find the angular frequency;
- relate angular frequency, frequency and period.
:::

A spring pulls back in proportion to how far it is stretched: $F = -kx$, where $x$ is the displacement from rest and $k$ is the **spring constant** in newtons per metre. This is Hooke's law, and almost anything near a stable resting position obeys it for small displacements. Newton's second law, $F = ma$, with the acceleration written as a second derivative (@sec:m-change-derivative), gives

$$m\frac{d^2x}{dt^2} = -kx \qquad\text{or}\qquad \frac{d^2x}{dt^2} = -\omega_0^2\,x, \qquad \omega_0 = \sqrt{\frac{k}{m}}.$$ {#eq:m-osc-shm}

The equation says: *the acceleration is proportional to the displacement and points back towards the middle*. Which function, differentiated twice, gives itself back with a minus sign? The rules of @eq:m-change-rules answer: sine and cosine. The general solution is

$$x(t) = A\cos(\omega_0 t + \varphi),$$ {#eq:m-osc-solution}

with **amplitude** $A$ (the largest displacement) and **phase** $\varphi$ (where in the cycle it starts), both set by how the motion begins. This is **simple harmonic motion**. The constant $\omega_0$ is the **angular frequency**, measured in radians per second. A full cycle is $2\pi$ radians, so the ordinary frequency and the period are

$$f = \frac{\omega_0}{2\pi}, \qquad T = \frac{1}{f} = 2\pi\sqrt{\frac{m}{k}}.$$ {#eq:m-osc-period}

Note what is missing: the amplitude. A stiff spring and a light mass oscillate fast, a soft spring and a heavy mass slowly, but a big swing takes as long as a small one. Galileo noticed this for pendulums, and it is why pendulums and quartz crystals keep time.

{{Visualize | eq:m-osc-solution | function-plot:wave | f="cos(t)"; name="position $x/A$"; f2="-sin(t)"; name2="velocity $v/(A\omega_0)$"; var=t; x=[0,12.6]; xlabel="phase $\omega_0 t$ (radians)"; label=fig:m-osc-shm; height=28% }} Simple harmonic motion over two cycles. The velocity (the derivative) runs a quarter of a cycle ahead of the position: fastest through the middle, at rest at the ends.

::: {.example #ex:m-osc-mass-spring title="A mass on a spring"}
A $0.50\,\mathrm{kg}$ mass hangs on a spring with $k = 200\,\mathrm{N\,m^{-1}}$. It is pulled down $3.0\,\mathrm{cm}$ and released. Find the angular frequency, the frequency, the period and the largest speed.

**Strategy.** Use @eq:m-osc-shm and @eq:m-osc-period; the largest speed is $A\omega_0$, since the derivative of $A\cos\omega_0 t$ is $-A\omega_0\sin\omega_0 t$.

**Solution.** $\omega_0 = \sqrt{200/0.50} = 20\,\mathrm{rad\,s^{-1}}$, so $f = 20/2\pi = 3.2\,\mathrm{Hz}$ and $T = 0.31\,\mathrm{s}$. The largest speed is $0.030 \times 20 = 0.60\,\mathrm{m\,s^{-1}}$.

**Significance.** Gravity only shifts the resting point of a hanging spring; it does not change the frequency. Pulling the mass down $6\,\mathrm{cm}$ instead would double the largest speed and leave the period unchanged.
:::

::: {.check-your-learning}
A pendulum of length $L$ obeys @eq:m-osc-shm with $\omega_0 = \sqrt{g/L}$ for small swings. What length gives a period of exactly $2.0\,\mathrm{s}$? (Answer: $L = g\,(T/2\pi)^2 = 0.99\,\mathrm{m}$, the "seconds pendulum" of @ex:m-scale-pendulum-dimensions.)
:::

## Oscillation as a shadow of a circle {#sec:m-osc-circle}

::: {.learning-objectives}
- measure angles in radians;
- show that uniform motion round a circle projects to simple harmonic motion;
- interpret phase as an angle.
:::

A point moving steadily round a circle of radius $A$ at $\omega_0$ radians per second has coordinates $x = A\cos\omega_0 t$ and $y = A\sin\omega_0 t$. Its shadow on the horizontal axis moves exactly as @eq:m-osc-solution: simple harmonic motion is uniform circular motion seen edge-on. This picture explains every feature at once. The period is the time for one turn; the amplitude is the radius; the phase $\varphi$ is the angle where the point starts; and the velocity leads the position by a quarter turn because the direction of motion round a circle is always at right angles to the radius.

Angles here are in **radians**: the arc length divided by the radius. A full turn is $2\pi$ radians, $360^\circ$, so one radian is $57.3^\circ$. Radians are the natural unit because only in radians is the derivative of $\sin\theta$ exactly $\cos\theta$.

Two oscillations at the same frequency can differ in phase. If one is $\cos\omega t$ and the other $\cos(\omega t + \pi/2)$, the second reaches its peak a quarter cycle earlier. Phase differences decide whether waves reinforce or cancel when they meet, and whether pushes on a swing add energy or take it away (@sec:response-resonance-quality-factor).

::: {.check-your-learning}
A wheel turns at $33\tfrac{1}{3}$ revolutions per minute. What is its angular frequency in radians per second? (Answer: $33.3 \times 2\pi/60 = 3.49\,\mathrm{rad\,s^{-1}}$.)
:::

## Complex numbers {#sec:m-osc-complex}

::: {.learning-objectives}
- add and multiply complex numbers;
- plot a complex number and find its modulus and argument;
- explain multiplication by $i$ as a quarter-turn.
:::

The circle picture needs two coordinates for one oscillation. Complex numbers pack them into one number. Define a new number $i$ with

$$i^2 = -1.$$ {#eq:m-osc-i}

No ordinary number squares to $-1$, which is why $i$ was once called "imaginary". The name stuck, but the idea is concrete. A **complex number** $z = a + ib$ has a **real part** $a$ and an **imaginary part** $b$, and is drawn as the point $(a, b)$ on a plane, the **complex plane**. Its distance from the origin is the **modulus** $|z| = \sqrt{a^2 + b^2}$, and its angle from the positive real axis is the **argument** $\arg z$, with $\tan(\arg z) = b/a$.

Complex numbers add like arrows: real parts with real parts, imaginary with imaginary. They multiply by the usual rules of algebra, with $i^2$ replaced by $-1$:

$$(a + ib)(c + id) = (ac - bd) + i(ad + bc).$$ {#eq:m-osc-multiply}

The geometric meaning of multiplication is the key to everything that follows: **multiplying two complex numbers multiplies their moduli and adds their arguments**. Multiplying by $i$, which has modulus $1$ and argument $90^\circ$, turns any number a quarter-turn anticlockwise without changing its length.

{{Visualize | eq:m-osc-multiply | complex-plane:generic | points="3+4j, j*(3+4j), -(3+4j)"; names="$z$, $iz$, $i^2 z$"; arrows=true; radius=6; label=fig:m-osc-rotate; height=34% }} Multiplying $z = 3 + 4i$ by $i$ turns it a quarter-turn to $iz = -4 + 3i$; multiplying again gives $i^2 z = -z$, a half-turn. Every multiplication by $i$ is a rotation by $90^\circ$.

::: {.example #ex:m-osc-complex-arithmetic title="Modulus, argument and a product"}
For $z = 3 + 4i$, find $|z|$ and $\arg z$. Then compute $z \times i$ and check that the modulus is unchanged.

**Strategy.** Use Pythagoras for the modulus and the inverse tangent for the argument; multiply with @eq:m-osc-multiply.

**Solution.** $|z| = \sqrt{9 + 16} = 5$ and $\arg z = \arctan(4/3) = 53.1^\circ$. Then $iz = 3i + 4i^2 = -4 + 3i$, whose modulus is $\sqrt{16 + 9} = 5$ and whose argument is $143.1^\circ$, larger by $90^\circ$.

**Significance.** @fig:m-osc-rotate draws the result. A rotation that would need a sine and a cosine in ordinary coordinates is a single multiplication in complex numbers.
:::

::: {.check-your-learning}
Multiply $(1 + 2i)(3 - i)$, and check that the modulus of the product is the product of the moduli. (Answer: $5 + 5i$; $|5 + 5i| = 7.07 = \sqrt{5} \times \sqrt{10}$.)
:::

## Euler's formula and phasors {#sec:m-osc-euler}

::: {.learning-objectives}
- state Euler's formula and evaluate $e^{i\theta}$;
- represent an oscillation as the real part of a rotating complex number;
- explain why exponentials make oscillation equations easy.
:::

What is $e$ raised to an imaginary power? Using the series of the Going Further box in @sec:m-change-relaxation and $i^2 = -1$, the real and imaginary terms separate into the series for cosine and sine. The result is **Euler's formula**:

$$e^{i\theta} = \cos\theta + i\sin\theta.$$ {#eq:m-osc-euler}

The number $e^{i\theta}$ lies on the circle of radius one at angle $\theta$. As $\theta$ grows it goes round the circle: the exponential of an imaginary number *is* rotation. At $\theta = \pi$ the formula gives $e^{i\pi} = -1$, linking the five most important numbers in mathematics in one line.

{{Visualize | eq:m-osc-euler | complex-plane:wave | points="exp(j*theta)"; vary=theta:0,pi/4,pi/2,3*pi/4,pi,5*pi/4,3*pi/2; arrows=true; unit_circle=true; radius=1.5; label=fig:m-osc-euler; height=34% }} The numbers $e^{i\theta}$ for $\theta$ in steps of a quarter of $\pi$. They all lie on the unit circle; $\theta$ is the angle, so increasing it walks round the circle.

Now let the angle grow steadily, $\theta = \omega t$. The complex number $A e^{i\omega t}$ is an arrow of length $A$ turning at $\omega$ radians per second, called a **phasor**. Its real part, $A\cos\omega t$, is simple harmonic motion: the shadow of @sec:m-osc-circle. Physicists and engineers write oscillations as phasors and take the real part at the end, because exponentials are far easier to differentiate than sines: $\tfrac{d}{dt}e^{i\omega t} = i\omega\,e^{i\omega t}$. Differentiating multiplies by $i\omega$, a quarter-turn and a stretch, which is the quarter-cycle lead of the velocity in @fig:m-osc-shm.

::: {.example #ex:m-osc-phasor-check title="The spring equation with a phasor"}
Show that $x = e^{i\omega_0 t}$ solves @eq:m-osc-shm.

**Strategy.** Differentiate twice, each time multiplying by $i\omega_0$.

**Solution.** $\dot{x} = i\omega_0\,x$ and $\ddot{x} = (i\omega_0)^2 x = -\omega_0^2\,x$, which is the equation.

**Significance.** Solving a differential equation has turned into algebra: the derivative became multiplication by a number. The next section uses this trick to solve the damped oscillator in two lines.
:::

::: {.check-your-learning}
Evaluate $e^{i\pi/3}$ in the form $a + ib$. (Answer: $\cos 60^\circ + i\sin 60^\circ = 0.5 + 0.866i$.)
:::

## Damping and poles {#sec:m-osc-damping}

::: {.learning-objectives}
- write the equation of a damped oscillator;
- find its solutions by trying an exponential, and interpret the complex exponent;
- read the decay rate and frequency from the position of a pole.
:::

Real oscillations die away, because friction or resistance drains their energy. Adding a drag force proportional to the velocity gives the **damped oscillator**:

$$\frac{d^2x}{dt^2} + 2\gamma\frac{dx}{dt} + \omega_0^2\,x = 0,$$ {#eq:m-osc-damped}

where $\gamma$ is the damping rate (per second). Try $x = e^{st}$, with $s$ a complex number to be found. Each derivative multiplies by $s$, so the equation becomes $s^2 + 2\gamma s + \omega_0^2 = 0$, a quadratic whose roots are

$$s = -\gamma \pm i\,\omega_d, \qquad \omega_d = \sqrt{\omega_0^2 - \gamma^2}.$$ {#eq:m-osc-poles}

The real part of $s$ gives decay and the imaginary part gives oscillation: $e^{st} = e^{-\gamma t}\,e^{\pm i\omega_d t}$. The motion is a cosine at the frequency $\omega_d$ inside an exponential envelope that shrinks with time constant $1/\gamma$.

{{Visualize | eq:m-osc-damped | function-plot:wave | f="exp(-gamma*t)*cos(t)"; var=t; vary=gamma:0.05,0.2,0.6; x=[0,25]; xlabel="time $t$ (units of $1/\omega_0$)"; ylabel="$x/A$"; label=fig:m-osc-ringing; height=30% }} Damped oscillations for three damping rates (in units of $\omega_0$). Light damping rings for many cycles; heavier damping dies within one or two.

The two roots of @eq:m-osc-poles are the **poles** of the oscillator. Plot them on the complex plane: the horizontal distance from the vertical axis is the decay rate, the height above the real axis is the oscillation frequency. The **damping ratio** $\zeta = \gamma/\omega_0$ measures damping on a scale where $\zeta = 1$ is the boundary between ringing and creeping back without overshoot. As $\zeta$ grows from zero the poles slide round a circle of radius $\omega_0$ towards the real axis.

$$\frac{s}{\omega_0} = -\zeta \pm i\sqrt{1 - \zeta^2}$$ {#eq:m-osc-poles-scaled}

{{Visualize | eq:m-osc-poles-scaled | complex-plane:wave | points="-zeta + j*sqrt(1-zeta^2)"; vary=zeta:0.05,0.3,0.7; conjugate=true; poles=true; unit_circle=true; radius=1.3; xlabel="real part of $s/\omega_0$ (decay)"; ylabel="imaginary part of $s/\omega_0$ (ringing)"; label=fig:m-osc-poles; height=34% }} Poles of the damped oscillator for three damping ratios. Each pair is mirrored across the real axis. More damping moves the poles left (faster decay) and down (slower ringing); they stay on the circle of radius $\omega_0$ until $\zeta = 1$.

The **quality factor** $Q = \omega_0/2\gamma = 1/2\zeta$ counts roughly how many radians the system rings before its energy falls by a factor $e$. @sec:response-resonance-quality-factor uses $Q$ to predict how sharply a system resonates, and @sec:atoms-lines-poles reads the width of a spectral line as the distance of a pole from the real axis.

::: {.example #ex:m-osc-guitar-q title="How long a guitar string rings"}
The guitar's A string vibrates at $110\,\mathrm{Hz}$, and its amplitude falls by a factor $e$ in about $3\,\mathrm{s}$. Estimate $\gamma$, $\zeta$ and $Q$.

**Strategy.** The envelope is $e^{-\gamma t}$, so $\gamma = 1/(3\,\mathrm{s})$. Then $\omega_0 = 2\pi \times 110$.

**Solution.** $\gamma = 0.33\,\mathrm{s^{-1}}$ and $\omega_0 = 691\,\mathrm{rad\,s^{-1}}$, so $\zeta = \gamma/\omega_0 = 4.8 \times 10^{-4}$ and $Q = 1/2\zeta = 1.0 \times 10^{3}$.

**Significance.** A $Q$ of a thousand means the string rings for hundreds of cycles, which is why a plucked note sustains. Its poles sit almost on the vertical axis. A car's shock absorber is designed for the opposite, $\zeta$ close to one, so the car settles after a bump instead of bouncing.
:::

::: {.going-further}
When $\zeta > 1$ the square root in @eq:m-osc-poles-scaled is imaginary, both poles are real and negative, and the motion is a sum of two decaying exponentials with no oscillation: **overdamping**. At $\zeta = 1$ the two poles meet (**critical damping**), the fastest return without overshoot. Every linear system, not only springs, has poles: they are the values of $s$ for which $e^{st}$ solves its equation with no input. The **impulse response** of @ch:response is a sum of $e^{st}$ over the poles, and its Fourier transform, the system's spectrum, has a peak near each pole whose width is the pole's distance from the axis. That is the bridge from this chapter to spectroscopy, seismology and every resonance in the course.
:::

::: {.check-your-learning}
An oscillator has $\omega_0 = 4\,\mathrm{rad\,s^{-1}}$ and $\gamma = 0.5\,\mathrm{s^{-1}}$. Find $\omega_d$ and $Q$. (Answer: $\omega_d = \sqrt{16 - 0.25} = 3.97\,\mathrm{rad\,s^{-1}}$; $Q = 4/1 = 4$.)
:::

::: {.soma-machine}
Every level of the Soma Machine has a response with poles: ringing levels sit near the vertical axis, sluggish ones far to the left. **Try it:** `#level=atomic&lens=on&compare=1` for the sharp lines of an atom, then `#level=geological` for the slow, heavily damped response of rock.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
amplitude
: the largest displacement of an oscillation

angular frequency
: the rate of an oscillation in radians per second, $\omega = 2\pi f$

complex number
: a number $a + ib$ with $i^2 = -1$, drawn as a point on a plane

damping ratio
: $\zeta = \gamma/\omega_0$; below one the system rings, above one it creeps back

Euler's formula
: $e^{i\theta} = \cos\theta + i\sin\theta$

phase
: where in its cycle an oscillation is, measured as an angle

phasor
: a rotating complex number $Ae^{i\omega t}$ whose real part is an oscillation

pole
: a value $s$ for which $e^{st}$ solves a system's equation with no input

quality factor
: $Q = \omega_0/2\gamma$; how many radians a system rings before its energy falls by $e$

simple harmonic motion
: oscillation with acceleration proportional to displacement and opposite to it
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Simple harmonic motion
: $\ddot{x} = -\omega_0^2 x$, $\ \omega_0 = \sqrt{k/m}$, $\ x = A\cos(\omega_0 t + \varphi)$

Period
: $T = 2\pi/\omega_0$, $\ f = \omega_0/2\pi$

Complex numbers
: $i^2 = -1$, $\ |a + ib| = \sqrt{a^2 + b^2}$

Euler's formula
: $e^{i\theta} = \cos\theta + i\sin\theta$

Damped oscillator
: $\ddot{x} + 2\gamma\dot{x} + \omega_0^2 x = 0$, $\ s = -\gamma \pm i\sqrt{\omega_0^2 - \gamma^2}$

Quality factor
: $Q = \omega_0/2\gamma = 1/2\zeta$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-osc-spring]** A restoring force proportional to displacement gives simple harmonic motion, a cosine whose period does not depend on the amplitude.

**[-@sec:m-osc-circle]** Simple harmonic motion is the shadow of uniform circular motion; phase is an angle, measured in radians.

**[-@sec:m-osc-complex]** Complex numbers are points on a plane. Multiplying them multiplies lengths and adds angles; multiplying by $i$ is a quarter-turn.

**[-@sec:m-osc-euler]** Euler's formula makes $e^{i\theta}$ a point on the unit circle; an oscillation is the real part of a rotating phasor, and differentiating multiplies by $i\omega$.

**[-@sec:m-osc-damping]** Trying $e^{st}$ turns the damped oscillator into a quadratic. Its roots, the poles, give the decay rate (real part) and frequency (imaginary part); $Q = 1/2\zeta$.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does the period of a simple harmonic oscillator not depend on its amplitude?
2. Explain in words why the velocity of an oscillator leads its position by a quarter of a cycle.
3. What does it mean, geometrically, to multiply a complex number by $i$?
4. Why do physicists write oscillations as $e^{i\omega t}$ and take the real part?
5. A pole moves further from the vertical axis of the complex plane. What happens to the ringing?
6. Why would you want a guitar string to have a high $Q$ and a car suspension a low one?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-osc-suspension title="A car suspension"}
A quarter of a car, $300\,\mathrm{kg}$, rests on a spring with $k = 3.0 \times 10^{4}\,\mathrm{N\,m^{-1}}$. Find its natural frequency and period.
:::

::: {.solution}
**Strategy.** Use @eq:m-osc-shm and @eq:m-osc-period.

**Solution.** $\omega_0 = \sqrt{3.0 \times 10^4/300} = 10\,\mathrm{rad\,s^{-1}}$, so $f = 1.6\,\mathrm{Hz}$ and $T = 0.63\,\mathrm{s}$.

**Significance.** Suspensions are tuned near $1$ to $1.5\,\mathrm{Hz}$, close to the rhythm of walking, which people find comfortable. Shock absorbers then set $\zeta$ near $0.3$ to $0.7$, so a bump gives one soft rebound rather than a long bounce.
:::

::: {.problems #pr:m-osc-complex-product title="Rotating and stretching"}
Write $w = 1 + i$ in terms of its modulus and argument, and use the rule "multiply moduli, add arguments" to find $w^2$ and $w^4$. Check $w^2$ by direct multiplication.
:::

::: {.solution}
**Strategy.** $|w| = \sqrt{2}$, $\arg w = 45^\circ$; squaring doubles the angle and squares the length.

**Solution.** $w^2$ has modulus $2$ and argument $90^\circ$, so $w^2 = 2i$; directly, $(1 + i)^2 = 1 + 2i + i^2 = 2i$. Then $w^4$ has modulus $4$ and argument $180^\circ$: $w^4 = -4$.

**Significance.** Powers of a complex number walk round a spiral. Powers of a number of modulus one walk round the circle, which is what $e^{i\omega t}$ does in time.
:::

::: {.problems #pr:m-osc-euler-values title="Points on the circle"}
Evaluate $e^{i\pi/2}$, $e^{i\pi}$ and $e^{2\pi i}$, and say where each lies on the complex plane.
:::

::: {.solution}
**Strategy.** Use Euler's formula, @eq:m-osc-euler.

**Solution.** $e^{i\pi/2} = \cos 90^\circ + i\sin 90^\circ = i$, at the top of the circle. $e^{i\pi} = -1$, on the left. $e^{2\pi i} = 1$, back at the start after one full turn.

**Significance.** One turn of the phasor is one period of the oscillation: $e^{i\omega T} = 1$ when $\omega T = 2\pi$.
:::

::: {.problems #pr:m-osc-decay-amplitude title="How much is left"}
For the oscillator of the last check in @sec:m-osc-damping ($\gamma = 0.5\,\mathrm{s^{-1}}$), what fraction of the starting amplitude remains after $5\,\mathrm{s}$, and how many full oscillations has it made?
:::

::: {.solution}
**Strategy.** The envelope is $e^{-\gamma t}$; the number of cycles is $\omega_d t/2\pi$.

**Solution.** $e^{-2.5} = 0.082$, about $8\,\%$. In $5\,\mathrm{s}$ it makes $3.97 \times 5/2\pi = 3.2$ oscillations.

**Significance.** With $Q = 4$ the system rings for only a few cycles, like the middle curve of @fig:m-osc-ringing. A tuning fork, with $Q$ in the thousands, would still be ringing strongly.
:::

::: {.problems #pr:m-osc-poles-location title="Reading a pole"}
A system has poles at $s = -2 \pm 15i\ \mathrm{s^{-1}}$. What are its decay time, its ringing frequency in hertz, and its quality factor?
:::

::: {.solution}
**Strategy.** Read $\gamma = 2\,\mathrm{s^{-1}}$ and $\omega_d = 15\,\mathrm{rad\,s^{-1}}$ from @eq:m-osc-poles; then $\omega_0 = \sqrt{\omega_d^2 + \gamma^2}$.

**Solution.** The decay time is $1/\gamma = 0.50\,\mathrm{s}$. The ringing frequency is $15/2\pi = 2.4\,\mathrm{Hz}$. With $\omega_0 = \sqrt{225 + 4} = 15.1\,\mathrm{rad\,s^{-1}}$, $Q = 15.1/4 = 3.8$.

**Significance.** Two numbers, the coordinates of a pole, describe the whole free motion of the system. Measuring a ringing, or the shape of a resonance peak, is a way of locating its poles.
:::
