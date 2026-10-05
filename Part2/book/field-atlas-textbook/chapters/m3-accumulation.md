# Accumulation: Areas, Sums and Flux {#ch:m-accumulation}

{{Visualize | ch:m-accumulation | area-under:generic | f="1 + sin(x)"; x=[0,12.6]; from=0; to=12.566; n=24; rule=mid; aspect=3; note=false; opener=true }} A curve cut into twenty-four strips. Adding the strips gives the area under the curve, and thinner strips give it more exactly.

The derivative of @ch:m-change takes something apart: from a journey it extracts the speed at each instant. This chapter runs the other way. From the speed at each instant it rebuilds the journey; from a flow it finds a total; from a field it finds how much passes through a surface. The tool is the **integral**, and the idea behind it is simple: cut the whole into thin pieces, work out each piece, add them up. It is the mathematics behind the course's central idea, that a response to a long input is the sum of responses to many short kicks (@ch:response).

**Chapter outline.** [-@sec:m-acc-pieces] Adding up small pieces · [-@sec:m-acc-integral] The integral · [-@sec:m-acc-fundamental] Undoing the derivative · [-@sec:m-acc-averages] Averages and totals · [-@sec:m-acc-flux] Flux: what passes through a surface

## Adding up small pieces {#sec:m-acc-pieces}

::: {.learning-objectives}
- find a distance travelled as the area under a speed–time graph;
- explain why cutting a quantity into thin strips gives a good approximation;
- recognise an accumulation problem in a new setting.
:::

At a steady $20\,\mathrm{m\,s^{-1}}$, a car covers $20 \times 30 = 600\,\mathrm{m}$ in $30\,\mathrm{s}$. On a graph of speed against time, that product is the area of a rectangle $20$ high and $30$ wide. The rule holds whatever the speed does: **the distance travelled is the area under the speed–time graph**. If the speed changes, cut the time into short intervals, treat the speed as constant in each, and add up the thin rectangles.

The stone of @eq:m-change-fall falls with speed $v = 9.8\,t$. Over the first two seconds the area under this straight line is a triangle, $\tfrac{1}{2} \times 2 \times 19.6 = 19.6\,\mathrm{m}$, which agrees with $4.9 \times 2^2 = 19.6\,\mathrm{m}$ from the position formula. Accumulating the speed rebuilt the distance.

$$v(t) = 9.8\,t\ \mathrm{m\,s^{-1}}$$ {#eq:m-acc-fall-speed}

{{Visualize | eq:m-acc-fall-speed | area-under:generic | f="9.8*x"; x=[0,2.5]; from=0; to=2; expect_area=19.6; xlabel="time $t$ (s)"; ylabel="speed (m/s)"; label=fig:m-acc-fall-area; height=28% }} The falling stone's speed against time. The shaded area over the first two seconds is the distance fallen, $19.6\,\mathrm{m}$.

The same move appears everywhere. Water flowing into a bath at a known rate gives the volume after ten minutes; power drawn at each moment gives the energy used in a day; the birth rate gives the number born in a year. In each case a **rate** is accumulated into a **total**.

::: {.check-your-learning}
A cyclist rides at $6\,\mathrm{m\,s^{-1}}$ for $100\,\mathrm{s}$, then at $9\,\mathrm{m\,s^{-1}}$ for $50\,\mathrm{s}$. How far does she go? (Answer: $600 + 450 = 1050\,\mathrm{m}$, the total area of two rectangles.)
:::

## The integral {#sec:m-acc-integral}

::: {.learning-objectives}
- write a Riemann sum and explain how it approaches the area;
- use integral notation, with limits and an integration variable;
- estimate an integral numerically with strips.
:::

To find the area under a curve $f(x)$ between $x = a$ and $x = b$, cut the interval into $n$ strips of width $\Delta x = (b - a)/n$, pick a point $x_i$ in each strip, and add the rectangles:

$$S_n = \sum_{i=1}^{n} f(x_i)\,\Delta x.$$ {#eq:m-acc-riemann}

This is a **Riemann sum**; the Greek capital $\Sigma$ (sigma) means "add up". As the strips get thinner the sum approaches a limit, the **integral**,

$$\int_a^b f(x)\,dx = \lim_{n \to \infty} \sum_{i=1}^{n} f(x_i)\,\Delta x.$$ {#eq:m-acc-integral}

The long S is Leibniz's, chosen to mean "sum", and $dx$ is the thin width that $\Delta x$ becomes. The numbers $a$ and $b$ are the **limits** of integration. Where $f$ is negative, the strips count negatively: an integral is a *signed* area.

{{Visualize | eq:m-acc-riemann | area-under:generic | f="x^2"; x=[0,1.15]; from=0; to=1; n=5; rule=mid; expect_area=1/3; expect_sum=0.33; label=fig:m-acc-riemann; height=30% }} Five midpoint strips under $y = x^2$ between $0$ and $1$. Their total, $0.330$, is already within one per cent of the exact area, $1/3$.

::: {.example #ex:m-acc-area-parabola title="Area under a parabola"}
Estimate $\int_0^1 x^2\,dx$ with five strips, using the midpoint of each strip, and compare with the exact value $1/3$.

**Strategy.** The strips are $0.2$ wide with midpoints $0.1, 0.3, 0.5, 0.7, 0.9$. Add $f(x_i)\,\Delta x$.

**Solution.** $S_5 = 0.2\,(0.01 + 0.09 + 0.25 + 0.49 + 0.81) = 0.2 \times 1.65 = 0.330$. The exact value is $0.3333$; the error is $0.0033$, one per cent.

**Significance.** With midpoints the error falls as the square of the strip width: ten strips give $0.3325$. Computers integrate this way, with clever choices of points, and every simulated figure in this course rests on such sums.
:::

::: {.check-your-learning}
Repeat the example with four strips, using the *left* end of each strip. Why is the answer too small? (Answer: $0.25\,(0 + 0.0625 + 0.25 + 0.5625) = 0.219$; the left ends sit at the lowest point of each strip of a rising curve.)
:::

## Undoing the derivative {#sec:m-acc-fundamental}

::: {.learning-objectives}
- state the fundamental theorem of calculus in words;
- find antiderivatives of powers and exponentials;
- evaluate a definite integral from an antiderivative.
:::

Strips work, but there is a shortcut, and it is one of the great discoveries of mathematics. Let $F(x)$ be the area under $f$ from $a$ up to $x$. Moving $x$ on by a small $h$ adds one thin strip of area $f(x)\,h$, so $F$ changes at the rate $f$: the derivative of the accumulated area is the curve itself. This is the **fundamental theorem of calculus**: integration undoes differentiation. To integrate $f$, find a function $F$ whose derivative is $f$, an **antiderivative**, and subtract its values at the limits:

$$\int_a^b f(x)\,dx = F(b) - F(a), \qquad \text{where } \frac{dF}{dx} = f.$$ {#eq:m-acc-ftc}

Reading the rules of @eq:m-change-rules backwards gives the antiderivatives this course needs:

$$\int x^n\,dx = \frac{x^{n+1}}{n+1} \ (n \neq -1), \qquad \int e^{-t/\tau}\,dt = -\tau\,e^{-t/\tau}, \qquad \int \cos kx\,dx = \frac{\sin kx}{k}.$$ {#eq:m-acc-antiderivatives}

For the parabola, $F = x^3/3$, so $\int_0^1 x^2\,dx = \tfrac{1}{3} - 0 = \tfrac{1}{3}$ exactly, the value the strips were approaching.

::: {.example #ex:m-acc-capacitor-charge title="Charge from a decaying current"}
A capacitor of $100\,\mu\mathrm{F}$, charged to $9.0\,\mathrm{V}$, discharges through $10\,\mathrm{k}\Omega$. The current is $I(t) = (V_0/R)\,e^{-t/\tau}$ with $\tau = RC = 1.0\,\mathrm{s}$. How much charge flows in total, and how much in the first second?

**Strategy.** Charge is the accumulated current, $Q = \int I\,dt$. Use the exponential antiderivative.

**Solution.** $V_0/R = 9.0/10^4 = 9.0 \times 10^{-4}\,\mathrm{A}$. In total, $Q = (V_0/R)\int_0^\infty e^{-t/\tau}\,dt = (V_0/R)\,\tau = 9.0 \times 10^{-4}\,\mathrm{C}$. In the first second, $Q_1 = (V_0/R)\,\tau\,(1 - e^{-1}) = 5.7 \times 10^{-4}\,\mathrm{C}$, or $63\,\%$ of the total.

**Significance.** The total is $CV_0$, the charge the capacitor started with, as it must be: the integral has rediscovered conservation of charge. An exponential tail that never quite ends still has a finite area, $\tau$ times its starting height.
:::

{{Visualize | ex:m-acc-capacitor-charge | area-under:soma | f="exp(-x)"; x=[0,5]; from=0; to=1; expect_area=1-exp(-1); xlabel="time $t/\tau$"; ylabel="current $I/I_0$"; label=fig:m-acc-exp-area; height=28% }} The capacitor current of @ex:m-acc-capacitor-charge in units of its starting value. The shaded area, the charge that flows in the first time constant, is $1 - e^{-1} = 0.632$ of the whole area under the curve.

::: {.check-your-learning}
Evaluate $\int_1^3 2x\,dx$ with an antiderivative, and check it as the area of a trapezium. (Answer: $[x^2]_1^3 = 9 - 1 = 8$; the trapezium has parallel sides $2$ and $6$ and width $2$, area $8$.)
:::

## Averages and totals {#sec:m-acc-averages}

::: {.learning-objectives}
- compute the average value of a function over an interval;
- explain the root-mean-square value of an oscillation;
- convert between peak and RMS values.
:::

The **average** of a function over an interval is its integral divided by the length of the interval:

$$\langle f \rangle = \frac{1}{b - a}\int_a^b f(x)\,dx.$$ {#eq:m-acc-average}

It is the height of the rectangle with the same area. For the falling stone, the average speed over two seconds is $19.6\,\mathrm{m}/2\,\mathrm{s} = 9.8\,\mathrm{m\,s^{-1}}$, half the final speed, as expected for a speed that grows steadily.

Oscillations raise a puzzle. The average of $\sin t$ over a whole cycle is zero, because the positive and negative halves cancel, yet an alternating current certainly heats a kettle. The useful measure is the **root mean square** (RMS): square the signal (making it positive), average, then take the square root. The average of $\sin^2 t$ over a cycle is exactly one half, so

$$A_{\mathrm{rms}} = \frac{A}{\sqrt{2}} = 0.707\,A$$ {#eq:m-acc-rms}

for a sine wave of amplitude $A$.

{{Visualize | eq:m-acc-rms | area-under:wave | f="sin(x)^2"; x=[0,6.6]; from=0; to=2*pi; expect_area=pi; hline=0.5; xlabel="phase $t$ (radians)"; ylabel="$\sin^2 t$"; label=fig:m-acc-sin2; height=28% }} The square of a sine wave over one cycle. Its area is $\pi$ over a width $2\pi$, so its average is exactly one half (dotted line): the hills above the line fill the valleys below it.

::: {.example #ex:m-acc-mains title="Mains voltage"}
European mains electricity is quoted as $230\,\mathrm{V}$. This is the RMS value. What is the peak voltage, and what average power does it deliver to a $53\,\Omega$ kettle element?

**Strategy.** Invert @eq:m-acc-rms for the peak. Power in a resistor is $V^2/R$, so its average uses the mean of $V^2$, which is $V_{\mathrm{rms}}^2$.

**Solution.** Peak $= 230 \times \sqrt{2} = 325\,\mathrm{V}$. Average power $= 230^2/53 = 1.0 \times 10^{3}\,\mathrm{W}$.

**Significance.** RMS values are chosen precisely so that power formulas look the same for alternating and steady currents. The peak, $325\,\mathrm{V}$, is what insulation must withstand.
:::

::: {.check-your-learning}
North American mains is $120\,\mathrm{V}$ RMS. What is its peak? (Answer: $170\,\mathrm{V}$.)
:::

## Flux: what passes through a surface {#sec:m-acc-flux}

::: {.learning-objectives}
- define the flux of a field through a surface;
- explain why the flux from a point source is the same through every enclosing sphere;
- derive an inverse-square law from conservation.
:::

A field of arrows, such as the velocity of flowing water or the electric field around a charge, can be accumulated over a surface instead of along a line. The **flux** through a small flat patch of area $A$ is the component of the field perpendicular to the patch times the area: $\Phi = E_\perp A$. For a curved surface, cut it into patches and add, which is an integral over the surface. Flux measures *how much passes through*: litres per second for water, watts for light.

Now take a source that sends out a steady amount, such as a lamp radiating power $L$ in all directions. Surround it by a sphere of radius $r$. In a steady state nothing piles up, so the whole of $L$ crosses every sphere, large or small. The sphere's area is $4\pi r^2$, so the power per unit area, the **intensity**, must be

$$I(r) = \frac{L}{4\pi r^2}.$$ {#eq:m-acc-inverse-square}

The **inverse-square law** is not an extra assumption: it is conservation plus the geometry of spheres. The same argument gives Newton's law of gravity and Coulomb's law of electric force their $1/r^2$ form, and it is the idea behind Gauss's law in electromagnetism.

The two-dimensional version is easy to draw. A source in a plane spreads out over circles of circumference $2\pi r$, so its field falls as $1/r$. The flux out of any circle around it is the same.

$$\mathbf{F}(x, y) = \frac{(x, y)}{x^2 + y^2}$$ {#eq:m-acc-source-2d}

{{Visualize | eq:m-acc-source-2d | vector-field:generic | u="x/(x^2+y^2)"; v="y/(x^2+y^2)"; x=[-2,2]; y=[-2,2]; n=16; circle=1.2; expect_flux=2*pi; expect_circulation=0; label=fig:m-acc-flux; height=36% }} A point source in a plane. The arrows weaken as $1/r$, but the flux out of the red circle is $2\pi$ whatever its radius: what the source sends out must cross every circle around it. Nothing circulates around the source.

::: {.example #ex:m-acc-solar-constant title="Sunlight at the Earth"}
The Sun radiates $L = 3.83 \times 10^{26}\,\mathrm{W}$. The Earth is $1.496 \times 10^{11}\,\mathrm{m}$ away. What is the intensity of sunlight at the Earth, above the atmosphere?

**Strategy.** Spread the Sun's power over a sphere of radius one Earth–Sun distance, @eq:m-acc-inverse-square.

**Solution.** $4\pi r^2 = 4\pi \times (1.496 \times 10^{11})^2 = 2.81 \times 10^{23}\,\mathrm{m^2}$, so $I = 3.83 \times 10^{26}/2.81 \times 10^{23} = 1360\,\mathrm{W\,m^{-2}}$.

**Significance.** This is the measured **solar constant**, $1361\,\mathrm{W\,m^{-2}}$. Run backwards, the same law turns a measured brightness into a distance or a power, the main tool of @ch:stars.
:::

::: {.going-further}
The flux argument becomes exact in the **divergence theorem**: the flux of a field $\mathbf{F}$ out of any closed surface equals the integral, over the volume inside, of its divergence $\nabla \cdot \mathbf{F}$, a derivative measuring how much the field spreads out from each point. For the source of @fig:m-acc-flux the divergence is zero everywhere except at the source, which is why every circle around it gives the same flux and a circle that misses it gives zero. A related theorem (Stokes's) turns the **circulation** around a loop into the curl inside it. Together they are the language of Maxwell's equations, and the same "kick-and-sum" accumulation, written as an integral over earlier times, is the **convolution** of @ch:response.
:::

::: {.check-your-learning}
Mars is $1.524$ times as far from the Sun as the Earth. What is the solar intensity there? (Answer: $1361/1.524^2 = 586\,\mathrm{W\,m^{-2}}$.)
:::

::: {.soma-machine}
At the stellar and galactic levels the Soma Machine shows light spreading from a source. **Try it:** `#level=stellar&lens=on`, then `#level=galactic-disc`; the response falls off with distance as the flux argument requires.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
antiderivative
: a function whose derivative is the given function

flux
: the amount of a field passing through a surface; perpendicular component times area, summed

fundamental theorem of calculus
: integration and differentiation undo each other

integral
: the limit of a sum of thin strips; a signed area

intensity
: power per unit area

inverse-square law
: a quantity spreading from a point falls as $1/r^2$, because spheres have area $4\pi r^2$

Riemann sum
: a sum of rectangles approximating an integral

root mean square
: the square root of the average of the square; $A/\sqrt{2}$ for a sine wave
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Integral
: $\int_a^b f\,dx = \lim \sum f(x_i)\,\Delta x$

Fundamental theorem
: $\int_a^b f\,dx = F(b) - F(a)$, $\ dF/dx = f$

Antiderivatives
: $\int x^n dx = x^{n+1}/(n+1)$, $\ \int e^{-t/\tau}dt = -\tau e^{-t/\tau}$

Average
: $\langle f \rangle = \frac{1}{b-a}\int_a^b f\,dx$; $\ A_{\mathrm{rms}} = A/\sqrt{2}$

Inverse square
: $I = L/4\pi r^2$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-acc-pieces]** Accumulating a rate gives a total: distance is the area under a speed–time graph.

**[-@sec:m-acc-integral]** The integral is the limit of a Riemann sum of thin strips; it is a signed area.

**[-@sec:m-acc-fundamental]** Integration undoes differentiation, so definite integrals follow from antiderivatives; an exponential tail has finite area $\tau$.

**[-@sec:m-acc-averages]** An average is an integral divided by a width. Oscillations are measured by their RMS value, $A/\sqrt{2}$ for a sine.

**[-@sec:m-acc-flux]** Flux is a field accumulated over a surface. Conservation through spheres gives the inverse-square law.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why is the distance travelled equal to the area under the speed–time graph?
2. What happens to a Riemann sum as the strips get thinner, and why do midpoints do better than left ends?
3. Explain the fundamental theorem of calculus using a growing area.
4. Why is the average of a sine wave zero, and why is that not the useful measure of its strength?
5. Why does the inverse-square law follow from conservation of energy?
6. In a plane, a source's field falls as $1/r$, not $1/r^2$. Why?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-acc-accelerating-car title="An accelerating car"}
A car's speed is $v(t) = 3t^2\,\mathrm{m\,s^{-1}}$ for the first $2\,\mathrm{s}$. How far does it travel?
:::

::: {.solution}
**Strategy.** Integrate the speed with the power rule of @eq:m-acc-antiderivatives.

**Solution.** $\int_0^2 3t^2\,dt = [t^3]_0^2 = 8\,\mathrm{m}$.

**Significance.** Differentiating the answer, $t^3$, gives back the speed: the fundamental theorem in action.
:::

::: {.problems #pr:m-acc-ten-strips title="Ten strips"}
Estimate $\int_0^1 x^2\,dx$ with ten midpoint strips. By what factor is the error smaller than with five?
:::

::: {.solution}
**Strategy.** The midpoints are $0.05, 0.15, \ldots, 0.95$; each strip is $0.1$ wide.

**Solution.** The sum of the squared midpoints is $3.325$, so $S_{10} = 0.3325$, with an error of $0.00083$. With five strips the error was $0.0033$: four times larger.

**Significance.** Halving the strip width quartered the error, the square law quoted in @ex:m-acc-area-parabola.
:::

::: {.problems #pr:m-acc-average-speed title="Average of a falling speed"}
Use @eq:m-acc-average to find the falling stone's average speed over its first $3\,\mathrm{s}$, and check it against the distance fallen.
:::

::: {.solution}
**Strategy.** Integrate $9.8\,t$ from $0$ to $3$ and divide by $3$.

**Solution.** $\int_0^3 9.8\,t\,dt = 4.9 \times 9 = 44.1\,\mathrm{m}$, so the average speed is $44.1/3 = 14.7\,\mathrm{m\,s^{-1}}$, half the final speed of $29.4\,\mathrm{m\,s^{-1}}$.

**Significance.** The integral is the distance fallen, $4.9\,t^2$ at $t = 3$: the average speed is just distance over time.
:::

::: {.problems #pr:m-acc-half-charge title="Half the charge"}
How long does the capacitor of @ex:m-acc-capacitor-charge take to deliver half its total charge?
:::

::: {.solution}
**Strategy.** The fraction delivered by time $t$ is $1 - e^{-t/\tau}$; set it to one half.

**Solution.** $e^{-t/\tau} = \tfrac{1}{2}$, so $t = \tau \ln 2 = 0.69\,\mathrm{s}$.

**Significance.** The half-life of @eq:m-change-half-life again: a half-life is the time for half of anything exponential to be used up or delivered.
:::

::: {.problems #pr:m-acc-jupiter title="Sunlight at Jupiter"}
Jupiter is $5.20$ times as far from the Sun as the Earth. What is the solar intensity there, and what fraction is it of the intensity at the Earth?
:::

::: {.solution}
**Strategy.** Scale the solar constant by the inverse square of the distance ratio.

**Solution.** $1361/5.20^2 = 50.3\,\mathrm{W\,m^{-2}}$, which is $1/27.0 = 3.7\,\%$ of the Earth's.

**Significance.** The spacecraft Juno flies solar panels at Jupiter and needs about twenty-seven times the panel area it would need near the Earth.
:::
