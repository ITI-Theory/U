# Scale 13–14 — Stellar ($10^{9}$–$10^{11}$ m)

\begin{tcolorbox}[colback=gray!8, colframe=gray!40,
  title=\textbf{Scale 13–14 — Stars Ring Like Bells ($10^9$–$10^{11}$ m)}]
\textbf{The equation (always):} $(\nabla^2 + k^2)\, G = \delta$;
Substrate: stellar plasma; $k = \omega/c_s$ (sound speed in plasma $\sim 100$ km/s);
Propagator: helioseismic Green's function (measured by SOHO/HMI);
Mind rank $N$: stellar oscillation mode spectrum ($\sim 10^6$ modes);
Mind: stellar memory — rotation profile, chemical stratification.
\end{tcolorbox}

\vspace{1em}

# Chapter 4 — Stars Ring Like Bells

\begin{quote}\itshape
The Sun is a ten-million-tonne bell with a million simultaneous notes
struck on it. We can read every one of them.
\end{quote}

\vspace{1em}

## 4.1  The interior we cannot see

A star is opaque. Photons released in the core of the Sun take, on the
diffusive random walk through the radiative zone, roughly $10^5$ years
to reach the surface. The interior is therefore inaccessible to direct
optical observation. For most of the history of astronomy, what was
known about the inside of the Sun came from theory — hydrostatic
equilibrium, the equations of state, the nuclear cross-sections — and
not from observation.

This changed in 1962, when Robert Leighton, Robert Noyes, and George
Simon discovered that the surface of the Sun was oscillating, in a
patchwork pattern, with a dominant period of about five minutes.[^leighton]
What looked at first like a single resonance turned out, on better
data, to be a superposition of millions of modes, each one a standing
sound wave trapped inside the solar interior. The discipline that grew
up to interpret these oscillations is called *helioseismology*. It is to
the Sun what seismology is to the Earth, and it has — over the last six
decades — given us a quantitative map of the solar interior accurate to
fractions of a per cent.

[^leighton]: R. B. Leighton, R. W. Noyes, and G. W. Simon, "Velocity
Fields in the Solar Atmosphere. I. Preliminary Report," *Astrophysical
Journal* 135 (1962): 474–99, <https://doi.org/10.1086/147285>.

\begin{figure}[h]
\centering
\includegraphics[width=0.7\linewidth]{soma/wave-atlas/figures/F4_2_helioseismology.png}
\end{figure}

> **Figure 4.1** *(PUBLIC)* — A spherical-harmonic mode of the Sun, of
> low degree, rendered as a deformation. *Credit: NASA / GONG project;
> public domain.*

## 4.2  Modes, by analogy with a violin string

A violin string, fixed at both ends and plucked, sings in a fundamental
plus a series of harmonics. The pitches are determined by the length,
tension, and mass per unit length of the string. The plucked string
contains all the harmonics at once; the ear separates them.

A spherical bell, struck, sings in a series of *spherical-harmonic*
modes. These are the analogues of the violin's harmonics, generalised to
a two-sphere. Each mode is labelled by two integers — the *degree*
$\ell$ (how many lines of nodes circle the bell) and the *order* $m$
(how those nodes are oriented). The frequency of each mode is determined
by the geometry, density, and elasticity of the bell. Two bells with the
same mode spectrum are essentially the same bell.

A star is a *three-dimensional* bell, and so its modes are labelled by
three integers: $\ell$, $m$, and $n$ (the *radial order*, how many nodes
the mode has between the centre and the surface). The Sun has detectable
modes with $\ell$ ranging from 0 to over 1,000 and $n$ from 0 to about
40. Each mode has a frequency that depends on the temperature, density,
and composition along the path it sweeps through the interior. By
measuring the frequencies — which the helioseismic instruments do with
parts-per-million precision — we recover the structure of the interior
the modes pass through.

This is, in honesty, an extraordinary piece of inverse mathematics. We
read the inside of a star from the way it rings.

## 4.3  What we have learned

Helioseismology has, among other things:

- Confirmed the standard solar model to within $\sim 0.5\%$ in the
  sound speed throughout most of the interior.
- Measured the depth of the convective zone (the outer 28.7% of the
  Sun's radius, by mass about 2%).
- Measured the internal rotation profile, finding that the radiative
  interior rotates approximately rigidly while the convective envelope
  has the differential rotation visible at the surface (faster at the
  equator than at the poles).
- Located the *tachocline* — the thin shear layer at the boundary
  between rigid and differential rotation — and identified it as the
  probable seat of the solar dynamo that generates the eleven-year
  sunspot cycle.

The same technique, applied to other stars, is now called
*asteroseismology* and has been extended by the Kepler and TESS space
missions to stars across most of the Hertzsprung–Russell diagram.

## 4.4  The eleven-year wave

The Sun's most visible long-period oscillation is the *sunspot cycle*,
with an average period of 11.0 years and considerable variability around
that average (the Maunder Minimum, 1645–1715, was a 70-year suppression
of the cycle, of which the cause is still debated). The sunspot cycle is
driven by the solar dynamo — the cyclic generation, twisting, and
destruction of magnetic fields in the convective zone — and its
qualitative shape is well captured by *Babcock–Leighton dynamo* models,
which themselves are nonlinear wave equations on the solar surface.

> **Figure 4.2** *(PUBLIC)* — The Maunder butterfly diagram: latitudes
> of sunspots plotted against time, since 1875. The cyclic pattern is
> obvious. *Credit: NASA Marshall Space Flight Center; public domain.*

The sunspots themselves are the visible bruises of the magnetic field
breaching the photosphere. They are the *output*, not the *cause*; the
cause is a magnetic wave propagating through the convective zone with
period 11 years.

## 4.5  Variable stars: the spectrum from regular to chaotic

Some stars are intrinsically variable. The classical examples — Cepheid
variables, RR Lyrae variables, Mira variables — pulsate radially with
remarkably stable periods, ranging from hours to hundreds of days. These
pulsations are nearly pure standing acoustic waves, and the
period-luminosity relation discovered for Cepheids by Henrietta Swan
Leavitt in 1912 is one of the foundational rungs of the distance
ladder.[^leavitt]

[^leavitt]: Henrietta S. Leavitt and Edward C. Pickering, "Periods of 25
Variable Stars in the Small Magellanic Cloud," *Harvard College
Observatory Circular* 173 (1912): 1–3.

Other stars are *chaotic* variables — semiregular giants, irregular
variables, certain pre-main-sequence stars whose pulsations have no
clean period at all. The full spectrum from clean periodicity to
deterministic chaos is present in the stellar sky, and the underlying
equations (nonlinear wave equations in a self-gravitating compressible
fluid) admit all of these behaviours as solutions in different parameter
regimes.

This is the second time in the book we have met the spectrum from
regular to chaotic in a single underlying system; we will meet it again
in the cardiac field, where the same spectrum is the difference between
a healthy heart and one in fibrillation.

## 4.6  What carries forward

A star is, structurally, a *resonant cavity*. It contains a fluid; the
fluid supports waves; the waves stand in modes determined by the cavity;
and the modes ring at frequencies we can measure.

This is a useful template to keep in front of you for the rest of Part I.
The Earth is a resonant cavity (Chapter 5 and Chapter 6). The atmosphere
is a resonant cavity. The body cavities are resonant cavities. The
nervous system, on the soma-field interpretation, is a resonant cavity
of a particular kind. All of these systems can be analysed by the same
technique: find the modes, measure the frequencies, read the structure
from the spectrum.

\newpage
