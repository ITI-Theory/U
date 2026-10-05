# Frequencies: Fourier, Convolution and Poles {#ch:frequencies}

A chord on a piano, the light from a star, the trembling of the whole Earth after an earthquake: each is a mixture of many oscillations at once, and each is best understood by taking the mixture apart into its frequencies. @ch:response described a system by what it does to a single kick. This chapter describes the same system by what it does to each frequency, and shows that the two descriptions are one. The tool is Fourier analysis. The prize is a single picture, the system's poles on the complex plane, that holds its ringing, its resonance and its spectral lines together.

**Chapter outline.** [-@sec:freq-sums-sines] Signals as sums of sines · [-@sec:freq-spectrum] The spectrum · [-@sec:freq-convolution-theorem] Convolution becomes multiplication · [-@sec:freq-transfer] The transfer function and resonance · [-@sec:freq-poles] Poles: where a spectrum comes from · [-@sec:freq-short-sharp] Short or sharp, not both · [-@sec:freq-programme] Spectra across the ladder

::: {.maths-you-need}
Sines, phase and angular frequency (@sec:m-osc-spring, @sec:m-osc-circle); complex numbers and $e^{i\omega t}$ (@sec:m-osc-complex, @sec:m-osc-euler); poles of the damped oscillator (@sec:m-osc-damping); integrals as sums (@sec:m-acc-integral).
:::

## Signals as sums of sines {#sec:freq-sums-sines}

::: {.learning-objectives}
- describe a repeating signal as a sum of harmonics;
- build a square wave from its odd harmonics;
- explain why the shape of a wave is set by the strengths of its harmonics.
:::

The plucked guitar string of @ex:fields-guitar-string vibrates at $110\,\mathrm{Hz}$ and at the same time at $220$, $330$, $440\,\mathrm{Hz}$ and so on: its normal modes, sounding together. What reaches the ear is their sum. In 1807 Joseph Fourier claimed something much stronger: *any* repeating signal of period $T$, however jagged, can be written as a sum of sines and cosines at the frequencies $1/T$, $2/T$, $3/T$, and so on, the **harmonics**:

$$f(t) = a_0 + \sum_{n=1}^{\infty} \big( a_n \cos n\omega t + b_n \sin n\omega t \big), \qquad \omega = \frac{2\pi}{T}.$$ {#eq:freq-fourier-series}

The coefficients $a_n$ and $b_n$ say how much of each harmonic the signal contains; they are found by integrating the signal against each sine and cosine. A smooth, sine-like signal needs only the first few. A signal with sharp corners needs many, because only high frequencies can turn quickly.

The **square wave**, which jumps between $+1$ and $-1$, is the classic example. Its series contains only odd harmonics, with strengths falling as $1/n$:

$$\mathrm{square}(t) = \frac{4}{\pi}\left( \sin t + \frac{\sin 3t}{3} + \frac{\sin 5t}{5} + \cdots \right).$$ {#eq:freq-square}

{{Visualize | eq:freq-square | function-plot:wave | f1="4/pi*sin(t)"; name1="1 term"; f2="4/pi*(sin(t) + sin(3*t)/3 + sin(5*t)/5)"; name2="3 terms"; f3="4/pi*(sin(t) + sin(3*t)/3 + sin(5*t)/5 + sin(7*t)/7 + sin(9*t)/9 + sin(11*t)/11 + sin(13*t)/13 + sin(15*t)/15)"; name3="8 terms"; var=t; x=[0,12.6]; xlabel="time $t$"; label=fig:freq-square; height=30% }} Building a square wave from its odd harmonics. One sine is a rough sketch; three already show the flat tops; eight make sharp edges, with small overshoots at each jump that never quite go away.

::: {.example #ex:freq-harmonics title="How loud is each harmonic?"}
In the square wave of @eq:freq-square, how strong are the third and fifth harmonics compared with the fundamental, in amplitude and in power (which goes as amplitude squared)?

**Strategy.** Read the coefficients: $4/\pi$, $4/3\pi$, $4/5\pi$.

**Solution.** In amplitude the third harmonic is $1/3$ of the fundamental and the fifth $1/5$. In power they are $1/9$ and $1/25$, that is $11\,\%$ and $4\,\%$.

**Significance.** The square wave's harsh, buzzy sound comes from these strong upper harmonics. A flute's tone is close to a pure sine; a clarinet's, like a square wave, is rich in odd harmonics. Different instruments playing the same note differ only in these coefficients.
:::

::: {.check-your-learning}
A signal repeats every $5\,\mathrm{ms}$. What are the frequencies of its first three harmonics? (Answer: $200$, $400$ and $600\,\mathrm{Hz}$.)
:::

## The spectrum {#sec:freq-spectrum}

::: {.learning-objectives}
- describe the Fourier transform as a recipe of frequencies;
- read the frequencies and strengths of components from a spectrum;
- relate decaying components to broadened peaks.
:::

A signal that does not repeat, such as a single note that fades away, contains a continuous range of frequencies rather than a list of harmonics. The **Fourier transform** generalises @eq:freq-fourier-series to this case:

$$\tilde{f}(\omega) = \int_{-\infty}^{\infty} f(t)\,e^{-i\omega t}\,dt.$$ {#eq:freq-transform}

The integral compares the signal with a rotating phasor $e^{i\omega t}$ (@sec:m-osc-euler) at each frequency $\omega$ in turn: where the signal turns in step with the phasor, the contributions add up and $\tilde{f}$ is large; elsewhere they cancel. Plotting $|\tilde{f}|$ against frequency gives the **spectrum** of the signal, its recipe of frequencies. The transform loses nothing: the signal can be rebuilt from its spectrum by the reverse integral. Computers calculate spectra with the fast Fourier transform (FFT), which is how the figures below are drawn.

{{Visualize | eq:freq-transform | spectrum:wave | f="exp(-t/0.4)*(sin(2*pi*110*t) + 0.5*sin(2*pi*220*t) + 0.33*sin(2*pi*330*t) + 0.25*sin(2*pi*440*t))"; x=[0,2]; fmax=520; peaks=4; show=0.05; expect_peak=110; xlabel="time (s)"; flabel="frequency (Hz)"; label=fig:freq-string-spectrum; height=42% }} A plucked string, modelled as four harmonics fading together. Top: the first $50\,\mathrm{ms}$ of the sound, a repeating but un-sinelike shape. Bottom: its spectrum, four peaks at $110$, $220$, $330$ and $440\,\mathrm{Hz}$ with heights in the ratio of the harmonics. The program checked that the tallest peak is at $110\,\mathrm{Hz}$.

The peaks in @fig:freq-string-spectrum have a width. A pure sine lasting for ever would give an infinitely sharp line; a sine that fades away has a spread of frequencies, and the faster it fades the broader its peak. The width of a spectral peak therefore measures how long the oscillation lasts, an idea made exact in @sec:freq-short-sharp.

::: {.example #ex:freq-reading-chord title="Reading a chord"}
A spectrum of a held chord shows strong peaks at $261.6$, $329.6$ and $392.0\,\mathrm{Hz}$. What are the frequency ratios, and which simple fractions are they close to?

**Strategy.** Divide each frequency by the lowest.

**Solution.** $329.6/261.6 = 1.260$ and $392.0/261.6 = 1.498$. These are close to $5/4 = 1.25$ and $3/2 = 1.5$.

**Significance.** The chord is C major (C, E, G). Its notes stand in nearly simple ratios, so many of their harmonics coincide, which is one reason the chord sounds consonant. Piano tuning compromises these ratios slightly so that every key works, which is why $1.260$ is not exactly $1.25$.
:::

::: {.check-your-learning}
Two components of a spectrum have amplitudes $1.0$ and $0.25$. How many times more power does the first carry? (Answer: $16$ times, since power goes as amplitude squared.)
:::

## Convolution becomes multiplication {#sec:freq-convolution-theorem}

::: {.learning-objectives}
- recall convolution as a sum of delayed impulse responses;
- state the convolution theorem;
- describe a filter by its transfer function.
:::

@sec:response-adding-up-kicks showed that a linear system's output is a convolution: every small piece of the input produces a delayed copy of the impulse response $G$, and the copies add.

$$y(t) = \int_{-\infty}^{t} G(t - t')\,u(t')\,dt'$$ {#eq:freq-convolution}

{{Visualize | eq:freq-convolution | convolution:wave | input="exp(-((t-1)/0.05)^2)/(0.05*sqrt(pi)) + exp(-((t-3.094)/0.05)^2)/(0.05*sqrt(pi))"; kernel="exp(-0.3*t)*sin(3*t)"; x=[0,12]; input_label="input: two kicks"; kernel_label="impulse response $G$"; output_label="output $y = G * u$"; label=fig:freq-convolution; height=46% }} Convolution in time. Each kick starts a copy of $G$; the second arrives exactly one ringing period after the first, so the two copies reinforce and the output rings more strongly than after either kick alone.

Convolution is laborious in time. In frequency it is simple. The Fourier transform of a convolution is the *product* of the transforms:

$$\tilde{y}(\omega) = H(\omega)\,\tilde{u}(\omega), \qquad H(\omega) = \tilde{G}(\omega).$$ {#eq:freq-convolution-theorem}

This is the **convolution theorem**. The function $H(\omega)$, the Fourier transform of the impulse response, is the system's **transfer function**: for each frequency, the factor by which the system multiplies it (its modulus) and the delay it adds (its argument). A linear system cannot create frequencies that are not in its input; it can only amplify, weaken and delay those that are. That is what a **filter** does.

The simplest filter is the resistor–capacitor circuit of @sec:m-change-relaxation, whose impulse response is a decaying exponential with time constant $\tau = RC$. Its transfer function is

$$H(\omega) = \frac{1}{1 + i\omega\tau}, \qquad |H| = \frac{1}{\sqrt{1 + (\omega\tau)^2}}.$$ {#eq:freq-low-pass}

Slow signals ($\omega\tau \ll 1$) pass almost unchanged; fast ones ($\omega\tau \gg 1$) are weakened in proportion to $1/\omega$. This is a **low-pass filter**, and its **corner frequency** $f_c = 1/2\pi\tau$ is where $|H|$ has fallen to $1/\sqrt{2}$, half the power.

{{Visualize | eq:freq-low-pass | function-plot:generic | f="1/sqrt(1 + (x/fc)^2)"; fc=159; x=[1,20000]; logx=true; logy=true; y=[0.005,1.5]; vline=159; xlabel="frequency (Hz)"; ylabel="gain $|H|$"; label=fig:freq-low-pass; height=28% }} Gain of a low-pass filter with $\tau = 1\,\mathrm{ms}$ on log–log axes. Below the corner frequency ($159\,\mathrm{Hz}$, dotted) signals pass; above it the gain falls by ten for every factor of ten in frequency, a straight line of slope $-1$ (@sec:m-scale-laws).

::: {.example #ex:freq-rc-filter title="Taming a hiss"}
A circuit with $R = 10\,\mathrm{k}\Omega$ and $C = 100\,\mathrm{nF}$ filters an audio signal. Find its corner frequency, and the gain at $1\,\mathrm{kHz}$ and at $10\,\mathrm{kHz}$.

**Strategy.** $\tau = RC$; then use @eq:freq-low-pass with $\omega = 2\pi f$.

**Solution.** $\tau = 10^4 \times 10^{-7} = 1.0\,\mathrm{ms}$, so $f_c = 1/(2\pi \times 0.001) = 159\,\mathrm{Hz}$. At $1\,\mathrm{kHz}$, $\omega\tau = 6.28$ and $|H| = 1/\sqrt{1 + 39.5} = 0.157$. At $10\,\mathrm{kHz}$, $\omega\tau = 62.8$ and $|H| = 0.016$.

**Significance.** A high-frequency hiss is cut by a factor of sixty while a bass line passes untouched. The same arithmetic describes a nerve membrane, which is an RC circuit and therefore smooths fast inputs (@ch:cells).
:::

::: {.check-your-learning}
Using @eq:freq-convolution-theorem, what does a system do to an input that contains a single frequency $\omega_1$? (Answer: the output contains only $\omega_1$, multiplied by $|H(\omega_1)|$ and shifted in phase by $\arg H(\omega_1)$.)
:::

## The transfer function and resonance {#sec:freq-transfer}

::: {.learning-objectives}
- write the transfer function of a damped oscillator;
- relate the width of a resonance peak to the damping rate and to $Q$;
- read a resonance from a spectrum.
:::

For the damped oscillator of @sec:response-damped-oscillator, trying $x = X e^{i\omega t}$ in the driven equation turns each derivative into a factor $i\omega$ (@ex:m-osc-phasor-check), and the transfer function per unit force per unit mass is

$$H(\omega) = \frac{1}{\omega_0^2 - \omega^2 + 2i\gamma\omega}.$$ {#eq:freq-oscillator-h}

Its modulus is the resonance curve $A(\omega)$ of @sec:response-resonance-quality-factor. For light damping the **power** response $|H|^2$ falls to half its peak at $\omega_0 \pm \gamma$, so the full width at half maximum is $\Delta\omega = 2\gamma$ and

$$Q = \frac{\omega_0}{\Delta\omega} = \frac{f_0}{\Delta f}.$$ {#eq:freq-q-width}

The quality factor is the sharpness of the peak: the resonant frequency divided by the width.

{{Visualize | eq:freq-oscillator-h | function-plot:wave | f="1/sqrt((1 - x^2)^2 + (2*zeta*x)^2)"; vary=zeta:0.05,0.15,0.4; x=[0,2]; y=[0,11]; xlabel="driving frequency $\omega/\omega_0$"; ylabel="gain $|H|\,\omega_0^2$"; label=fig:freq-resonance; height=30% }} Resonance curves for three damping ratios. Light damping gives a tall, narrow peak near $\omega_0$; heavier damping a low, broad one. The peak height is about $Q$ and the width about $1/Q$.

::: {.example #ex:freq-earth-mode title="Hearing the Earth ring"}
The Earth's slowest free oscillation has a period of $53.9$ minutes and a quality factor of about $500$. What is its spectral width, and how long a seismogram is needed to resolve it?

**Strategy.** $f_0 = 1/T$; then $\Delta f = f_0/Q$ from @eq:freq-q-width. Resolving a width $\Delta f$ needs a record of length about $1/\Delta f$ (@sec:freq-short-sharp).

**Solution.** $f_0 = 1/(53.9 \times 60\,\mathrm{s}) = 3.09 \times 10^{-4}\,\mathrm{Hz}$, so $\Delta f = 6.2 \times 10^{-7}\,\mathrm{Hz}$. A record of $1/\Delta f = 1.6 \times 10^{6}\,\mathrm{s}$, about $19$ days, is needed.

**Significance.** After the 2004 Sumatra earthquake seismologists measured this mode's frequency and width from weeks of recordings, and the width gave the damping inside the planet (@ch:earth). A spectrum read the Earth's interior.
:::

::: {.check-your-learning}
A bell rings at $500\,\mathrm{Hz}$ and its sound fades by a factor $e$ in $2\,\mathrm{s}$. Find its spectral width and $Q$. (Answer: $\gamma = 0.5\,\mathrm{s^{-1}}$, $\Delta\omega = 1\,\mathrm{rad\,s^{-1}}$, $\Delta f = 0.16\,\mathrm{Hz}$; $Q = 2\pi \times 500/1 = 3.1 \times 10^{3}$.)
:::

## Poles: where a spectrum comes from {#sec:freq-poles}

::: {.learning-objectives}
- extend the transfer function to complex frequencies;
- locate a system's poles on the complex plane;
- explain a resonance peak as the shadow of a nearby pole.
:::

The transfer function of @eq:freq-oscillator-h is a formula, and nothing stops us evaluating it at complex values. Write $s = i\omega$, so that real frequencies lie along the imaginary axis, and allow $s$ to be anywhere on the plane:

$$H(s) = \frac{1}{s^2 + 2\gamma s + \omega_0^2}.$$ {#eq:freq-h-of-s}

The denominator is the characteristic polynomial of @sec:m-osc-damping. Where it vanishes, at the poles $s = -\gamma \pm i\omega_d$, $H$ is infinite. Picture $|H|$ as a landscape over the plane: two tall spikes stand at the poles, and the resonance curve is what you see walking along the imaginary axis. Where the path passes close to a spike, the ground rises: a peak in the spectrum.

{{Visualize | eq:freq-h-of-s | contour-map:wave | f="log10(abs(1/((x + j*y)^2 + 2*g*(x + j*y) + 1)))"; g=0.15; x=[-1,0.4]; y=[-1.6,1.6]; levels=24; vline=0; xlabel="real part of $s/\omega_0$ (decay)"; ylabel="imaginary part of $s/\omega_0$ (frequency)"; zlabel="$\log_{10}|H|$"; label=fig:freq-pole-landscape; height=40% }} The landscape $\log_{10}|H(s)|$ for an oscillator with $\gamma = 0.15\,\omega_0$. Two peaks stand at the poles, $s = -0.15 \pm 0.99i$. The dotted line is the axis of real frequencies; walking along it, the ground rises as the path passes the poles, which is the resonance peak of @fig:freq-resonance.

The picture explains every rule of this chapter at once. A pole close to the axis (small $\gamma$) makes a tall, narrow peak, a long ringing and a high $Q$. A pole far from the axis makes a low, broad peak and a quick decay. The height of the pole above the real axis is the ringing frequency. And because the impulse response $G(t)$ is a sum of $e^{st}$ over the poles (the Going Further box in @sec:m-osc-damping), the same two numbers describe the system in time and in frequency. **Poles are the system.**

::: {.example #ex:freq-reading-pole title="From a measured peak to a pole"}
A resonance measured on a bridge peaks at $2.0\,\mathrm{Hz}$ and has a full width at half power of $0.10\,\mathrm{Hz}$. Where are its poles, and how long does the bridge ring after a gust?

**Strategy.** $\Delta\omega = 2\gamma$, so $\gamma = \pi\Delta f$. The imaginary part is close to $\omega_0 = 2\pi f_0$ for light damping.

**Solution.** $\gamma = \pi \times 0.10 = 0.31\,\mathrm{s^{-1}}$ and $\omega_0 = 12.6\,\mathrm{rad\,s^{-1}}$, so the poles are at $s \approx -0.31 \pm 12.6i\ \mathrm{s^{-1}}$. The ringing decays with time constant $1/\gamma = 3.2\,\mathrm{s}$; $Q = 2.0/0.10 = 20$.

**Significance.** Engineers locate poles from measured spectra and then move them, by adding damping, away from the axis and away from frequencies that wind or footsteps supply. The Millennium Bridge in London, which swayed under walkers in 2000, was fixed this way.
:::

::: {.check-your-learning}
Doubling the damping $\gamma$ of a lightly damped oscillator moves its poles in which direction, and what happens to the peak? (Answer: twice as far left from the frequency axis; the peak becomes twice as wide and about half as tall.)
:::

## Short or sharp, not both {#sec:freq-short-sharp}

::: {.learning-objectives}
- state the time–frequency trade-off;
- estimate the spectral width of a short signal;
- relate the width of a spectral line to the lifetime of its source.
:::

A short burst of sound cannot have a sharp pitch, and a sharp pitch cannot be short. A signal lasting a time $\Delta t$ has a spectrum at least about $\Delta f \approx 1/\Delta t$ wide; the exact constant depends on how the duration and width are measured, but the product never falls below a fixed number of order one:

$$\Delta f\,\Delta t \gtrsim \frac{1}{4\pi} \quad \text{(standard deviations)}, \qquad \Delta f \approx \frac{1}{2\pi\tau} \quad \text{(decay time $\tau$)}.$$ {#eq:freq-trade-off}

This is a property of waves, not of measuring instruments. In quantum mechanics, where frequency is energy ($E = hf$), the same mathematics becomes the energy–time uncertainty relation.

{{Visualize | eq:freq-trade-off | spectrum:wave | f="exp(-((t-0.5)/0.01)^2)*sin(2*pi*200*t)"; x=[0,1]; fmax=400; show=[0.44,0.56]; expect_peak=200; xlabel="time (s)"; flabel="frequency (Hz)"; label=fig:freq-burst; height=40% }} A $200\,\mathrm{Hz}$ tone that lasts only about $20\,\mathrm{ms}$. Its spectrum is centred on $200\,\mathrm{Hz}$ but about $50\,\mathrm{Hz}$ wide: the ear hears a click with a vague pitch rather than a note.

::: {.example #ex:freq-natural-linewidth title="The width of a spectral line"}
Hydrogen's Lyman-alpha line, at a wavelength of $121.6\,\mathrm{nm}$, comes from a level that lives $1.6\,\mathrm{ns}$ on average. Estimate the natural width of the line and its $Q$.

**Strategy.** The light is a wave train decaying with $\tau = 1.6\,\mathrm{ns}$; use @eq:freq-trade-off. The line's frequency is $c/\lambda$.

**Solution.** $\Delta f = 1/(2\pi \times 1.6 \times 10^{-9}) = 9.9 \times 10^{7}\,\mathrm{Hz}$, about $100\,\mathrm{MHz}$. The frequency is $3.00 \times 10^{8}/1.216 \times 10^{-7} = 2.47 \times 10^{15}\,\mathrm{Hz}$, so $Q = 2.5 \times 10^{7}$.

**Significance.** The atom is an oscillator with a $Q$ of twenty-five million, far sharper than any bell. Its pole lies almost on the frequency axis. @sec:atoms-lines-poles reads spectral lines this way, and real lines are usually broader still, because moving and colliding atoms add widths of their own.
:::

::: {.check-your-learning}
To tell apart two tones at $440$ and $441\,\mathrm{Hz}$, roughly how long must you listen? (Answer: about $1/\Delta f = 1\,\mathrm{s}$; the two then drift one full beat apart.)
:::

## Spectra across the ladder {#sec:freq-programme}

::: {.learning-objectives}
- give examples of spectra measured at different levels of the Atlas;
- separate measured spectra from the programme's proposals about them;
- label a frequency-domain claim correctly.
:::

Everything above is standard mathematics and physics; Penrose treats Fourier analysis in chapter 9 of his survey and the calculus of complex functions, poles included, in chapter 7 [@penrose2004road]. Spectra are among the most widely measured things in science, and many levels of the Atlas are known chiefly through them.

| Level | Signal | What the spectrum shows | Label |
|:--|:--|:--|:--|
| Atomic | light from a gas | sharp lines; positions give energies, widths give lifetimes | `empirical-result` |
| Whole brain | EEG voltage | broad rhythms (alpha near $10\,\mathrm{Hz}$) over a $1/f$ background | `empirical-result` |
| Human | interval between heartbeats | low- and high-frequency bands linked to breathing and blood-pressure control | `empirical-result` |
| Human | emotional response to music | a response kernel with poles, read from physiology | `open-hypothesis` |
| Planetary | seismograms after a great earthquake | normal modes with $Q$ of hundreds | `empirical-result` |
| Cosmological | cosmic microwave background | acoustic peaks in the angular power spectrum | `empirical-result` |

The programme's proposal, in this chapter's language, is that each level's characteristic response can be summarised by the poles of its kernel, and that the response time quoted in the Atlas for each level is set by the distance of its dominant pole from the frequency axis [@P1; @P10]. As a way of organising measured spectra this is `interpretive`: it is a mapping, and its value is in the comparisons it makes possible. The specific claim that human affective responses, for example to music, have a kernel whose poles can be measured from physiology and that predicts later responses is an `open-hypothesis` [@P9]. Its test is concrete: fit poles to one session's recordings and check whether they predict the next session better than a model without them.

::: {.soma-machine}
Each level of the Soma Machine plays its response at its own pace: fast, sharp levels ring; slow, damped levels creep. **Try it:** `#level=atomic&lens=on&compare=1` for sharp lines from long-lived poles, then `#level=planetary` for the Earth's slow ringing, and `#level=human-vertebrate&lens=on` for a response with a long memory tail.
:::

## Key Terms {.unnumbered}

::: {.key-terms}
convolution theorem
: convolution in time is multiplication in frequency

corner frequency
: where a low-pass filter's gain has fallen to $1/\sqrt{2}$, $f_c = 1/2\pi\tau$

filter
: a system that weakens some frequencies more than others

Fourier series
: a repeating signal written as a sum of harmonics

Fourier transform
: the recipe of frequencies of any signal, $\tilde{f}(\omega) = \int f(t)e^{-i\omega t}dt$

harmonic
: a whole-number multiple of a fundamental frequency

spectrum
: the strength of each frequency in a signal

time–frequency trade-off
: a signal of duration $\Delta t$ has a spectrum at least about $1/\Delta t$ wide

transfer function
: $H(\omega)$, the Fourier transform of the impulse response; what a system does to each frequency
:::

## Key Equations {.unnumbered}

::: {.key-equations}
Fourier transform
: $\tilde{f}(\omega) = \int f(t)\,e^{-i\omega t}\,dt$

Convolution theorem
: $\tilde{y} = H\,\tilde{u}$, $\ H = \tilde{G}$

Low-pass filter
: $H = 1/(1 + i\omega\tau)$, $\ f_c = 1/2\pi\tau$

Oscillator
: $H(s) = 1/(s^2 + 2\gamma s + \omega_0^2)$, poles at $s = -\gamma \pm i\omega_d$

Peak width
: $\Delta\omega = 2\gamma$, $\ Q = f_0/\Delta f$

Trade-off
: $\Delta f \approx 1/2\pi\tau$
:::

## Summary {.unnumbered}

::: {.summary}
**[-@sec:freq-sums-sines]** Any repeating signal is a sum of harmonics; sharp features need high harmonics.

**[-@sec:freq-spectrum]** The Fourier transform gives a signal's spectrum; decaying components give broadened peaks.

**[-@sec:freq-convolution-theorem]** Convolution in time is multiplication in frequency. A linear system multiplies each frequency by its transfer function and can create no new ones.

**[-@sec:freq-transfer]** An oscillator's transfer function peaks at resonance with width $2\gamma$; $Q$ is frequency over width.

**[-@sec:freq-poles]** Extended to complex $s$, the transfer function has poles; a resonance peak is the shadow of a pole near the frequency axis. Poles describe a system in time and frequency at once.

**[-@sec:freq-short-sharp]** Short signals have broad spectra; a line's width measures its source's lifetime.

**[-@sec:freq-programme]** Many Atlas levels are known through measured spectra. The programme's pole reading of the ladder is `interpretive`; its affective-kernel claim is an `open-hypothesis` with a stated test.
:::

## Review Questions {.unnumbered}

::: {.review-questions}
1. Why does a square wave need high harmonics, and a sine wave none?
2. What does the Fourier transform compare a signal with, and why do most comparisons cancel?
3. Why can a linear system not create new frequencies?
4. Explain, using the pole landscape, why a lightly damped system has a tall, narrow resonance.
5. Why can a very short sound not have a precise pitch?
6. Which rows of the table in @sec:freq-programme are measurements, and which is a proposal? What would test the proposal?
:::

## Worked Homework {.unnumbered}

::: {.problems #pr:freq-square-power title="Power in the harmonics"}
What fraction of a square wave's power lies in its fundamental? Use the fact that the powers of the harmonics are proportional to $1, \tfrac{1}{9}, \tfrac{1}{25}, \ldots$ and that $1 + \tfrac{1}{9} + \tfrac{1}{25} + \cdots = \pi^2/8$.
:::

::: {.solution}
**Strategy.** The fundamental's share is $1$ divided by the sum.

**Solution.** $1/(\pi^2/8) = 8/\pi^2 = 0.81$, so $81\,\%$ of the power is in the fundamental and $19\,\%$ in all the rest.

**Significance.** Even a waveform with sharp corners keeps most of its power in its lowest harmonic. A low-pass filter that removes everything above the fundamental keeps $81\,\%$ of the power and turns the square wave into a sine.
:::

::: {.problems #pr:freq-mains-filter title="Hum through a filter"}
A low-pass filter has $\tau = 2.0\,\mathrm{ms}$. Find its corner frequency and its gain for $50\,\mathrm{Hz}$ mains hum.
:::

::: {.solution}
**Strategy.** $f_c = 1/2\pi\tau$; $|H| = 1/\sqrt{1 + (\omega\tau)^2}$ with $\omega = 2\pi \times 50$.

**Solution.** $f_c = 1/(2\pi \times 0.002) = 80\,\mathrm{Hz}$. At $50\,\mathrm{Hz}$, $\omega\tau = 0.628$ and $|H| = 1/\sqrt{1.39} = 0.85$.

**Significance.** The hum is below the corner and passes almost untouched. Removing a low-frequency hum needs a different filter, one with a pole-and-zero pattern that cuts a narrow band (a notch).
:::

::: {.problems #pr:freq-bridge-q title="A wobbly footbridge"}
A footbridge's sideways mode is at $1.0\,\mathrm{Hz}$ with $Q = 50$. Walkers sway sideways once every two steps, so people stepping twice a second push the deck sideways at $1.0\,\mathrm{Hz}$. By roughly what factor does the bridge amplify their push compared with a slow, steady push of the same size?
:::

::: {.solution}
**Strategy.** At resonance the gain of @fig:freq-resonance is about $Q$ times the gain for a very slow push.

**Solution.** About $50$ times.

**Significance.** Adding dampers that lower $Q$ to about $5$ cuts the response tenfold: the poles move away from the axis.
:::

::: {.problems #pr:freq-pole-from-peak title="Poles from a spectrum"}
A measured resonance peaks at $10\,\mathrm{Hz}$ with a full width at half power of $0.5\,\mathrm{Hz}$. Find $Q$, $\gamma$ and the poles.
:::

::: {.solution}
**Strategy.** $Q = f_0/\Delta f$; $\gamma = \pi\Delta f$; $\omega_0 = 2\pi f_0$.

**Solution.** $Q = 20$, $\gamma = 1.57\,\mathrm{s^{-1}}$, and the poles are at $s \approx -1.57 \pm 62.8i\ \mathrm{s^{-1}}$.

**Significance.** The ringing after a kick decays with time constant $1/\gamma = 0.64\,\mathrm{s}$: about six cycles. The spectrum and the ringing are two views of the same pole.
:::

::: {.problems #pr:freq-camera-flash title="A short flash"}
A camera flash lasts $1\,\mu\mathrm{s}$. Roughly how wide is the spread of frequencies in the light's brightness variation, and could a detector sensitive only below $10\,\mathrm{kHz}$ follow it?
:::

::: {.solution}
**Strategy.** $\Delta f \approx 1/\Delta t$.

**Solution.** $\Delta f \approx 10^{6}\,\mathrm{Hz}$, a megahertz. A detector limited to $10\,\mathrm{kHz}$ responds to only a hundredth of that band; it records a smeared pulse about $100\,\mu\mathrm{s}$ long.

**Significance.** Every instrument is a filter, and what it reports is the convolution of the event with its own impulse response. Reading through the instrument is part of reading any measurement.
:::
