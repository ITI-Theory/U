# Chapter 5 — Planets, Weather, and the Skin of the Earth

\begin{quote}\itshape
A planet is a thin film of fluid on a slowly cooling ball of rock. The
film does the weather; the rock does the geology; both are wave systems.
\end{quote}

\vspace{1em}

## 5.1  The atmosphere as a fluid sheet

The Earth's atmosphere, to a first approximation, is a layer of gas
roughly 100 km thick wrapped over a sphere 12,742 km in diameter. The
aspect ratio — thickness divided by radius — is less than 1%. On any
diagram drawn to scale, the atmosphere is a film not a layer.

A thin film of fluid on a rotating sphere, heated unequally (most at the
equator, least at the poles) and subject to Coriolis force, has a very
specific set of preferred modes. These modes are the *Hadley cells*, the
*Ferrel cells*, the *polar cells* of the general circulation; the
*Rossby waves* that meander through the jet stream; the *Madden–Julian
oscillation*; the *El Niño–Southern Oscillation*. Each is a long-lived
wave or wave pattern on the fluid sheet. The names are different for
historical reasons; the underlying mathematics is one nonlinear wave
equation, the *Navier–Stokes equation on a rotating sphere*, with
thermal forcing.[^holton]

[^holton]: James R. Holton and Gregory J. Hakim, *An Introduction to
Dynamic Meteorology*, 5th ed. (Waltham, MA: Academic Press, 2012). The
standard graduate textbook.

\begin{figure}[h]
\centering
\includegraphics[width=0.6\linewidth]{soma/wave-atlas/figures/F5_1_earth_football.png}
\end{figure}

> **Figure 5.1** *(PUBLIC)* — A global Rossby-wave pattern in the
> northern jet stream, satellite view, with the meanders highlighted.
> *Credit: NOAA; public domain.*

The lesson, repeated from the previous chapter: structure that *looks*
like a stable object — a high-pressure ridge, a cyclone, a hurricane —
is a wave on a fluid. The fluid moves through the pattern.

## 5.2  Lenses, again

A lens, as we saw in Chapter 1, takes a field of incoming waves and
folds it down to a point. The atmosphere itself acts as a (rather bad)
lens, due to its variable refractive index with height; this is why
stars twinkle, why mirages form, why the Sun appears squashed at the
horizon. Astronomers spend much of their effort correcting for these
atmospheric distortions; adaptive optics, the technique by which modern
ground-based telescopes rival space telescopes, is in essence a fast
real-time inversion of the atmospheric lens.

The relevance for this book is that you do not need to leave the surface
of the Earth to encounter the wave-folding mathematics that will return
in Chapter 15 when we talk about the compactification of M-theory. The
atmosphere is doing it, badly, every clear evening at every horizon you
ever look at.

## 5.3  The ocean: another fluid sheet, slower and denser

The oceans are a second fluid sheet, thicker (average depth 3.7 km) and
denser (factor of 800) than the atmosphere, wrapped over the same
spherical rock. The same equations govern them, with the boundary
condition that water has a free surface against the atmosphere above and
a rigid bottom against the sea floor below.

The ocean supports a fully analogous spectrum of waves: surface gravity
waves (the ones you see at the beach, periods of seconds), internal
waves (in the thermocline, periods of minutes to hours), tides
(astronomically forced, period 12.42 hours), inertial oscillations
(Coriolis-forced, period varying with latitude), Rossby and Kelvin waves
(long-period, planetary scale, key to ENSO). The ocean also supports
*meddies* and *eddies* — coherent vortex structures that travel
thousands of kilometres while preserving their identity, behaving in
essence as solitons.

> **Figure 5.2** *(PUBLIC)* — A satellite altimetry map of sea-surface
> height showing the dense eddy field of the Gulf Stream. The eddies
> are 100–200 km across and persist for months. *Credit: NASA / JPL;
> public domain.*

A tsunami is a single very-long-wavelength surface gravity wave excited
by a seafloor displacement, typically from a subduction-zone
earthquake. The 2011 Tōhoku tsunami had a wavelength of about 200 km in
the open ocean and propagated at the same speed as a jet airliner.

## 5.4  The solid Earth as a resonant cavity

In Chapter 4 we treated the Sun as a resonant cavity that rings at its
natural frequencies. The Earth, struck by an earthquake, does the same.
The longest-period mode is the football mode, $_0S_2$, with a period
of 53.9 minutes; the spectrum extends down to periods of milliseconds at
the high end.

We need this fact in Chapter 6, where the Glarus thrust is one
particular ten-million-year wave in the same elastic body. The shorter
modes are minutes; the longer ones are tens of millions of years; the
underlying equations are the same equations of linear and nonlinear
elasticity, applied to the same rock.

## 5.5  The magnetosphere and the ionosphere

Two further fluid sheets wrap the Earth, both invisible to the naked
eye.

The *ionosphere* is the partially ionised upper atmosphere, between 60
and 1,000 km altitude. It reflects HF radio waves and supports its own
wave spectrum — gravity waves, travelling ionospheric disturbances,
plasma waves. It is the medium in which the aurora is painted; the
visible aurora is the optical signature of plasma waves dumping energy
into the upper atmosphere along magnetic-field lines.

The *magnetosphere* is the volume of space, extending to about 10 Earth
radii on the sunward side and a long tail on the night side, where the
Earth's magnetic field dominates over the solar wind. It is a plasma
cavity with its own modes — *ULF* (ultra-low-frequency) magnetic
pulsations with periods of seconds to minutes, *Alfvén waves* propagating
along field lines, magnetospheric storms.

I am rattling through these because the point of this chapter is *not*
the detailed physics of each one, but the *accumulation*. By the time
we close Chapter 5 you have met seven or eight nested fluid sheets
wrapped around the same rock, every one of them a wave-bearing cavity,
every one of them analysable by the same equations. The Earth is a
wave system from the core out to the magnetopause, and it is *one*
wave system, with the boundary conditions changing as you move through
it.

## 5.6  The Schumann resonance: the Earth's heartbeat

Between the conducting surface of the Earth and the conducting
ionosphere there is a spherical-shell waveguide about 100 km thick,
12,742 km in diameter. Like any cavity, it has resonant modes. The
fundamental mode, called the *Schumann resonance* after Winfried Otto
Schumann who predicted it in 1952, has a frequency of 7.83 Hz.

This is the lowest-frequency electromagnetic mode the Earth-atmosphere
system supports. It is continuously excited by lightning strokes
worldwide — roughly fifty per second on average — and a sensitive ELF
receiver can pick it up reliably anywhere on the planet.

> **Figure 5.3** *(BUILD)* — A typical Schumann-resonance power spectrum,
> showing the first six modes between 7.8 and 45 Hz. *To be generated by
> the author from publicly available data.*

I mention the Schumann resonance for two reasons. First, it is the
cleanest available example of *the whole planet ringing at one note* —
the planetary analogue of the open low E on a guitar. Second, it sits
on the edge of two arguments we will not pursue in this book but ought
to acknowledge. There is a substantial literature claiming a coupling
between Schumann resonance amplitude and human EEG bands (which overlap
in the same 8 Hz range), and an even larger literature making stronger
claims about it. The honest position, as of 2026, is that the
coincidence of frequencies is real, the claim of biological coupling is
suggestive but not established, and the claim of *causal* coupling
remains speculative. We will neither rely on nor dismiss it.

## 5.7  What carries forward

The closing structural point of Part I, anticipated here and made
explicit in Chapter 6, is this: *the Earth is a layered system of
wave-bearing fluids and solids, each layer with its own modes, each
layer coupled to its neighbours, the whole stack readable by the same
mathematics from the core to the magnetopause*. The next zoom is the
last one in Part I — into the rocks themselves, at the Glarus thrust,
where the same logic applies to objects that look, to the human eye,
exactly like the opposite of waves.

\newpage
