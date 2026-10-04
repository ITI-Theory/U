# Change: Rates and Exponentials {#ch:m-change}

Most of physics is about how things change: how fast a ball falls, how quickly a cup of tea cools, how a voltage across a nerve membrane relaxes after a kick. The mathematics of change is the **derivative**, the rate at which one quantity changes as another moves on. This chapter builds it from the slope of a graph, finds the derivatives this course uses, and meets the most important function in the subject: the exponential, the shape of anything whose rate of change is proportional to itself.

**Chapter outline.** [-@sec:m-change-rates] Rates of change · [-@sec:m-change-derivative] The derivative · [-@sec:m-change-exponential] Exponential growth and decay · [-@sec:m-change-semilog] Reading exponentials: semilog plots · [-@sec:m-change-relaxation] Relaxation towards a target

## Rates of change {#sec:m-change-rates}

::: {.learning-objectives}
- compute an average rate of change from two points on a graph;
- explain the difference between an average rate and an instantaneous rate;
- read a rate of change as the slope of a graph.
:::

A cyclist covers $12\,\mathrm{km}$ in $30$ minutes. Her **average speed** is the change in distance divided by the change in time, $12\,\mathrm{km}/0.5\,\mathrm{h} = 24\,\mathrm{km\,h^{-1}}$. On a graph of distance against time this is the slope of the straight line joining the start and end points: rise over run.

Any **average rate of change** has the same form. If a quantity $y$ depends on $x$, written $y = f(x)$, its average rate of change between $x_1$ and $x_2$ is

$$\frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}.$$ {#eq:m-change-average}

The Greek capital $\Delta$ (delta) means "change in". The units of a rate are the units of $y$ divided by the units of $x$: metres per second, kelvin per minute, volts per millisecond.

An average hides what happens in between. The cyclist may have stopped at traffic lights and then sprinted. Her speedometer shows something different: the **instantaneous** rate, the speed *at this moment*. To find it from a graph, take the two points closer and closer together. The straight line through them turns into the **tangent**, the line that just touches the curve at one point, and its slope is the instantaneous rate.

::: {.check-your-learning}
The temperature of a cooling oven falls from $220\,^\circ\mathrm{C}$ to $160\,^\circ\mathrm{C}$ in $12$ minutes. What is the average rate of change? (Answer: $-5\,^\circ\mathrm{C}$ per minute; the minus sign says it is falling.)
:::

## The derivative {#sec:m-change-derivative}

::: {.learning-objectives}
- define the derivative as the limit of an average rate;
- differentiate powers, sums, sines, cosines and exponentials;
- find a velocity from a position and an acceleration from a velocity.
:::

The **derivative** of $f$ at $x$ is the slope of the tangent there: the average rate over a step $h$, as the step shrinks to nothing,

$$\frac{df}{dx} = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}.$$ {#eq:m-change-derivative}

The notation $df/dx$, due to Leibniz, is read "dee f by dee x" and reminds us that the derivative began as a ratio of small changes. Other common notations are $f'(x)$ and, for rates in time, a dot: $\dot{x} = dx/dt$.

Try it on $f(x) = x^2$. The average rate over a step $h$ is $\big((x+h)^2 - x^2\big)/h = (2xh + h^2)/h = 2x + h$. As $h$ shrinks to zero this becomes $2x$. So the slope of the parabola $y = x^2$ is $2x$: zero at the bottom, $2$ at $x = 1$, $-4$ at $x = -2$. The same reasoning applied to any power gives the **power rule**, and a few more results cover nearly everything in this course:

$$\frac{d}{dx}x^n = n x^{n-1}, \qquad \frac{d}{dx}e^{kx} = k\,e^{kx}, \qquad \frac{d}{dx}\sin kx = k\cos kx, \qquad \frac{d}{dx}\cos kx = -k\sin kx.$$ {#eq:m-change-rules}

Derivatives of sums are sums of derivatives, and a constant factor stays in front: $\tfrac{d}{dx}\big(3x^2 + 5x\big) = 6x + 5$.

The first use of derivatives is motion. **Velocity** is the rate of change of position, $v = dx/dt$, and **acceleration** is the rate of change of velocity, $a = dv/dt$. A stone dropped from rest falls a distance

$$x(t) = \tfrac{1}{2} g t^2 = 4.9\,t^2\ \mathrm{m}$$ {#eq:m-change-fall}

after $t$ seconds, with $g = 9.8\,\mathrm{m\,s^{-2}}$.

{{Visualize | eq:m-change-fall | function-plot:generic | f="4.9*t^2"; var=t; x=[0,3]; tangent_at=2; expect_slope=19.6; xlabel="time $t$ (s)"; ylabel="distance fallen (m)"; label=fig:m-change-tangent; height=30% }} Distance fallen against time. The dashed tangent at $t = 2\,\mathrm{s}$ has slope $19.6\,\mathrm{m\,s^{-1}}$: the stone's speed at that instant. The slope grows steadily, because the stone accelerates.

::: {.example #ex:m-change-falling-stone title="Speed of a falling stone"}
Using @eq:m-change-fall, find the stone's velocity and acceleration after $2.0\,\mathrm{s}$.

**Strategy.** Differentiate the position once for the velocity and again for the acceleration, using the power rule.

**Solution.** $v = dx/dt = 2 \times 4.9\,t = 9.8\,t$, so $v(2.0) = 19.6\,\mathrm{m\,s^{-1}}$. Then $a = dv/dt = 9.8\,\mathrm{m\,s^{-2}}$, the same at every moment.

**Significance.** The tangent in @fig:m-change-tangent has exactly this slope; the program that drew the figure measured it and checked it against this example. Differentiating twice turned a curve into a constant: the stone's acceleration is the one fixed number behind the whole motion.
:::

::: {.check-your-learning}
Differentiate $y = 3x^4 - 2x + 7$ and find the slope at $x = 1$. (Answer: $dy/dx = 12x^3 - 2$, which is $10$ at $x = 1$.)
:::

## Exponential growth and decay {#sec:m-change-exponential}

::: {.learning-objectives}
- recognise a process whose rate is proportional to its size;
- write its solution as an exponential with a time constant;
- convert between a time constant and a half-life.
:::

Some quantities change at a rate proportional to how much there is. A colony of bacteria with twice as many cells divides twice as fast. A sample of radioactive carbon with twice as many nuclei has twice as many decays per second. For decay, the law reads

$$\frac{dN}{dt} = -\frac{N}{\tau},$$ {#eq:m-change-decay-law}

where $N$ is the amount and $\tau$ (tau) is a constant with units of time. The minus sign says that $N$ falls. Which function has a derivative proportional to itself? The rules of @eq:m-change-rules answer at once: the exponential. The solution is

$$N(t) = N_0\, e^{-t/\tau},$$ {#eq:m-change-decay}

with $N_0$ the amount at $t = 0$. Check it: the derivative of $e^{-t/\tau}$ is $-\tfrac{1}{\tau}e^{-t/\tau}$, so $dN/dt = -N/\tau$, as required.

The constant $\tau$ is the **time constant**: after one $\tau$ the amount has fallen to $e^{-1} = 0.368$ of its start, after two to $0.135$, after five to less than one per cent. The **half-life** $t_{1/2}$ is the time to fall to one half. Setting $e^{-t_{1/2}/\tau} = \tfrac{1}{2}$ and taking natural logarithms gives

$$t_{1/2} = \tau \ln 2 = 0.693\,\tau.$$ {#eq:m-change-half-life}

{{Visualize | eq:m-change-decay | function-plot:generic | f="exp(-t/tau)"; var=t; vary=tau:1,2,4; x=[0,10]; hline="0.5"; xlabel="time $t$"; ylabel="$N/N_0$"; label=fig:m-change-decay; height=30% }} Exponential decay for three time constants. Every curve starts at the same height and falls to half (dotted line) after $0.693\,\tau$; a larger $\tau$ stretches the same shape along the time axis.

::: {.example #ex:m-change-carbon-dating title="Carbon dating"}
Carbon-14 has a half-life of $5730$ years. What fraction of the carbon-14 in a piece of wood remains after $10\,000$ years?

**Strategy.** Find $\tau$ from @eq:m-change-half-life, then use @eq:m-change-decay.

**Solution.** $\tau = 5730/0.693 = 8270$ years. The fraction remaining is $e^{-10\,000/8270} = e^{-1.21} = 0.298$, about $30\,\%$. Counting half-lives gives the same answer: $10\,000/5730 = 1.75$ half-lives, and $2^{-1.75} = 0.298$.

**Significance.** Measuring the remaining fraction and running the calculation backwards dates the wood. The method works because every carbon-14 nucleus has the same chance of decaying in each second, whatever its age.
:::

Growth is the same law with a plus sign: $N(t) = N_0 e^{t/\tau}$. Here the useful time is the **doubling time**, $t_2 = \tau \ln 2$. Something growing by a fixed percentage $r$ per year doubles in $t_2 = \ln 2/\ln(1 + r)$ years. For small $r$ this is close to $70$ divided by the percentage, the banker's "rule of seventy".

::: {.check-your-learning}
Iodine-131, used in thyroid treatment, has a half-life of $8.02$ days. What fraction remains after $30$ days? (Answer: $2^{-30/8.02} = 0.075$, about $7.5\,\%$.)
:::

## Reading exponentials: semilog plots {#sec:m-change-semilog}

::: {.learning-objectives}
- explain why an exponential is a straight line on a semilog plot;
- read a time constant or doubling time from such a line;
- count doublings to estimate growth.
:::

Taking the natural logarithm of @eq:m-change-decay gives $\ln N = \ln N_0 - t/\tau$: a straight line in $t$ with slope $-1/\tau$. On a graph with a logarithmic vertical axis and an ordinary horizontal one, a **semilog plot**, every exponential is a straight line. A steeper line means a shorter time constant. Experimenters plot their data this way to see at a glance whether a process is exponential and to read off its rate; a curve that bends on a semilog plot is *not* a single exponential.

{{Visualize | eq:m-change-decay | function-plot:generic | f="exp(-t/tau)"; var=t; vary=tau:1,2,4; x=[0,10]; logy=true; y=[0.001,1]; xlabel="time $t$"; ylabel="$N/N_0$ (logarithmic axis)"; label=fig:m-change-semilog; height=30% }} The decays of @fig:m-change-decay on a semilog plot. Each becomes a straight line, steeper for a shorter time constant.

Growth can be counted in doublings. Ten doublings multiply by $2^{10} = 1024$, about a thousand; twenty by about a million; thirty by about a billion. This is why exponential growth always ends: no real resource keeps up with it for long.

::: {.example #ex:m-change-bacteria title="A dividing colony"}
A bacterium in warm broth divides every $20$ minutes. Starting from one cell, how many are there after eight hours, if nothing runs out?

**Strategy.** Count the doublings, then raise two to that power.

**Solution.** Eight hours is $480/20 = 24$ doublings, so $2^{24} = 1.7 \times 10^{7}$ cells.

**Significance.** Seventeen million cells from one in a working day. Real cultures leave the straight line of the semilog plot when food or space runs short, and the growth curve flattens; the bend is the signature of the limit.
:::

::: {.check-your-learning}
A population grows by $3\,\%$ a year. How long does it take to double? Compare with the rule of seventy. (Answer: $\ln 2/\ln 1.03 = 23.4$ years; $70/3 = 23.3$.)
:::

## Relaxation towards a target {#sec:m-change-relaxation}

::: {.learning-objectives}
- write the equation for a quantity that relaxes towards a fixed value;
- solve it and interpret the time constant;
- recognise the same equation in cooling, capacitors and cell membranes.
:::

Many systems do not decay to zero but settle at some other value: a cup of tea cools to room temperature, a charging capacitor approaches the battery voltage, a nerve membrane returns to its resting potential. If the rate of approach is proportional to the remaining distance, the law is

$$\frac{dy}{dt} = -\frac{y - y_\infty}{\tau},$$ {#eq:m-change-relax}

where $y_\infty$ is the final value. The distance from the target, $y - y_\infty$, obeys the decay law of @eq:m-change-decay-law, so

$$y(t) = y_\infty + \big(y_0 - y_\infty\big)\,e^{-t/\tau}.$$ {#eq:m-change-relax-solution}

This **relaxation** is the simplest way a system responds to a disturbance and returns to rest. It is the first example in this course of a **response**, and @ch:response builds the whole response grammar from it and from its oscillating cousin (@ch:m-oscillation).

::: {.example #ex:m-change-cooling-tea title="A cooling cup of tea"}
Tea at $90\,^\circ\mathrm{C}$ stands in a $20\,^\circ\mathrm{C}$ room and has cooled to $60\,^\circ\mathrm{C}$ after $10$ minutes. Find the time constant, and when it reaches $40\,^\circ\mathrm{C}$.

**Strategy.** Use @eq:m-change-relax-solution with $y_\infty = 20$: the excess temperature falls from $70$ to $40$ in $10$ minutes.

**Solution.** $40/70 = e^{-10/\tau}$, so $\tau = -10/\ln(0.571) = 17.9$ minutes. The tea reaches $40\,^\circ\mathrm{C}$ when the excess is $20$: $t = \tau \ln(70/20) = 17.9 \times 1.253 = 22.4$ minutes.

**Significance.** Newton's law of cooling is only approximate (real cups lose heat by evaporation too), but the exponential describes the measured curve well. One number, $\tau$, captures the whole cooling history.
:::

{{Visualize | ex:m-change-cooling-tea | function-plot:soma | f="20 + 70*exp(-t/17.9)"; var=t; x=[0,60]; hline="20,40"; vline="22.4"; xlabel="time (minutes)"; ylabel="temperature (°C)"; label=fig:m-change-cooling; height=28% }} The tea of @ex:m-change-cooling-tea. It approaches room temperature (lower dotted line) exponentially and crosses $40\,^\circ\mathrm{C}$ at $22.4$ minutes.

The same equation governs a capacitor $C$ discharging through a resistor $R$, with $\tau = RC$, and the membrane of a nerve cell, which behaves like a leaky capacitor (@ch:cells). One equation, three systems: the response grammar of @ch:fields in its simplest form.

::: {.check-your-learning}
A $100\,\mu\mathrm{F}$ capacitor charged to $9.0\,\mathrm{V}$ discharges through $10\,\mathrm{k}\Omega$. What is the time constant, and what is the voltage after $2.5\,\mathrm{s}$? (Answer: $\tau = RC = 1.0\,\mathrm{s}$; $V = 9.0\,e^{-2.5} = 0.74\,\mathrm{V}$.)
:::

::: {.going-further}
**Why $e$?** The number $e = 2.71828\ldots$ is the one base whose exponential is its own derivative, which is why it, not ten, appears in @eq:m-change-decay. It can be written as the sum $e^x = 1 + x + \tfrac{x^2}{2!} + \tfrac{x^3}{3!} + \cdots$; differentiating the sum term by term returns the same sum. Truncating it after two terms gives the **linear approximation** $e^x \approx 1 + x$ for small $x$, which is how a computer steps @eq:m-change-decay-law forward in time (Euler's method): $N(t + h) \approx N(t)\,(1 - h/\tau)$. With a step $h = \tau/10$, ten steps give $0.9^{10} = 0.349$ instead of the exact $e^{-1} = 0.368$; halving the step roughly halves the error.
:::

::: {.soma-machine}
A kicked membrane in the Soma Machine relaxes along @eq:m-change-relax-solution until the kick is large enough to fire a spike. **Try it:** `#level=cellular-synaptic&lens=on` and watch the voltage return to rest after small kicks.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
derivative
: the instantaneous rate of change; the slope of the tangent to a graph

doubling time
: the time for a growing exponential to double, $\tau \ln 2$

exponential
: the function $e^{kt}$, whose rate of change is proportional to itself

half-life
: the time for a decaying exponential to halve, $\tau \ln 2$

relaxation
: exponential approach to a final value, with a time constant $\tau$

semilog plot
: a graph with one logarithmic axis, on which exponentials are straight lines

tangent
: the straight line that touches a curve at one point with the same slope

time constant
: the time $\tau$ in which an exponential changes by a factor $e$
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Derivative
: $df/dx = \lim_{h\to 0}\,[f(x+h) - f(x)]/h$

Rules
: $\tfrac{d}{dx}x^n = nx^{n-1}$, $\ \tfrac{d}{dx}e^{kx} = ke^{kx}$, $\ \tfrac{d}{dx}\sin kx = k\cos kx$

Motion
: $v = dx/dt$, $\ a = dv/dt$

Decay
: $dN/dt = -N/\tau \ \Rightarrow\ N = N_0 e^{-t/\tau}$, $\ t_{1/2} = \tau \ln 2$

Relaxation
: $y(t) = y_\infty + (y_0 - y_\infty)\,e^{-t/\tau}$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:m-change-rates]** An average rate is a change divided by a change: the slope of a chord. The instantaneous rate is the slope of the tangent.

**[-@sec:m-change-derivative]** The derivative is the limit of the average rate. Power, exponential and trigonometric rules cover most cases; velocity and acceleration are first and second derivatives of position.

**[-@sec:m-change-exponential]** A rate proportional to the amount gives exponential decay or growth, fixed by a time constant; the half-life is $0.693\,\tau$.

**[-@sec:m-change-semilog]** Exponentials are straight lines on semilog plots, with slope $-1/\tau$. Counting doublings estimates growth.

**[-@sec:m-change-relaxation]** Relaxation towards a target is the simplest response to a disturbance; cooling, capacitors and membranes share its equation.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. What is the difference between the slope of a chord and the slope of a tangent?
2. Why does the exponential appear whenever a rate is proportional to an amount?
3. A process halves every hour. Is that the same as falling by $50\,\%$ of its starting value every hour? Explain.
4. How would you decide from data whether a decay is a single exponential?
5. Give three systems that relax towards a target, and say what sets the time constant in each.
6. Why must every real exponential growth eventually stop?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:m-change-ball-thrown-up title="A ball thrown upwards"}
A ball is thrown straight up at $15\,\mathrm{m\,s^{-1}}$. Its height is $h(t) = 15t - 4.9t^2$ metres. When does it reach the top, and how high does it go?
:::

::: {.solution}
**Strategy.** At the top the velocity $dh/dt$ is zero.

**Solution.** $dh/dt = 15 - 9.8t = 0$ gives $t = 1.53\,\mathrm{s}$. Then $h = 15 \times 1.53 - 4.9 \times 1.53^2 = 11.5\,\mathrm{m}$.

**Significance.** Setting a derivative to zero finds the highest or lowest point of a curve. The same trick finds the bottom of an energy valley in @ch:human.
:::

::: {.problems #pr:m-change-slope-of-sine title="The slope of a wave"}
A string's displacement is $y = 0.002\sin(20t)$ metres. What is the largest speed of a point on the string?
:::

::: {.solution}
**Strategy.** Differentiate with @eq:m-change-rules; the largest value of a cosine is one.

**Solution.** $dy/dt = 0.002 \times 20\cos(20t) = 0.04\cos(20t)\,\mathrm{m\,s^{-1}}$, so the largest speed is $0.04\,\mathrm{m\,s^{-1}}$, reached as the point passes through the middle.

**Significance.** The speed is largest where the displacement is zero, and zero where the displacement is largest: a sine and its derivative are a quarter of a cycle out of step, which @ch:m-oscillation draws as a rotating arrow.
:::

::: {.problems #pr:m-change-capacitor title="Draining a capacitor"}
The capacitor of the last check in @sec:m-change-relaxation ($\tau = 1.0\,\mathrm{s}$, $V_0 = 9.0\,\mathrm{V}$) powers a circuit that stops working below $1.0\,\mathrm{V}$. How long does it work?
:::

::: {.solution}
**Strategy.** Solve $1.0 = 9.0\,e^{-t/\tau}$ for $t$ with a natural logarithm.

**Solution.** $t = \tau \ln(9.0/1.0) = 1.0 \times 2.20 = 2.2\,\mathrm{s}$.

**Significance.** The answer grows only logarithmically with the starting voltage: doubling $V_0$ adds just $0.69\,\mathrm{s}$.
:::

::: {.problems #pr:m-change-doubling-rule title="The rule of seventy"}
A bank account grows by $5\,\%$ a year. Find the exact doubling time and compare it with $70/5$.
:::

::: {.solution}
**Strategy.** Use $t_2 = \ln 2/\ln(1 + r)$ with $r = 0.05$.

**Solution.** $t_2 = 0.693/0.0488 = 14.2$ years; the rule gives $14$ years.

**Significance.** The rule works because $\ln(1 + r) \approx r$ for small $r$, the linear approximation of the Going Further box in @sec:m-change-relaxation.
:::

::: {.problems #pr:m-change-euler-step title="One step at a time"}
Use Euler's method with a step $h = \tau/5$ to estimate $N/N_0$ after one time constant for the decay law @eq:m-change-decay-law. How far is it from the exact value?
:::

::: {.solution}
**Strategy.** Each step multiplies by $(1 - h/\tau) = 0.8$; one time constant takes five steps.

**Solution.** $0.8^5 = 0.328$, against the exact $e^{-1} = 0.368$: an error of $0.040$, or $11\,\%$.

**Significance.** Smaller steps do better: $h = \tau/10$ gives $0.349$ and $h = \tau/100$ gives $0.366$. Every simulation in this course steps an equation forward this way, with steps small enough that the error does not matter.
:::
