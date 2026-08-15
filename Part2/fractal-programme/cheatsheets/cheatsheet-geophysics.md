---
title: ""
lang: en-GB
geometry: "a4paper,margin=15mm"
fontsize: 9.5pt
linestretch: 1.15
mainfont: "TeX Gyre Pagella"
---

\begin{center}
{\LARGE\bfseries\sffamily [T]-Theory: Geophysics}\\[4pt]
{\large\sffamily\color{heading} P12 · Collective Field · For: The Seismologist}\\[2pt]
{\normalsize\sffamily\color{heading} \textit{Seismic Memory Propagator — Earth's elastic Green's function as a USF instance.}}
\end{center}

\vspace{4pt}

\noindent\colorbox{ghost}{\begin{minipage}{\dimexpr\textwidth-2\fboxsep\relax}
\vspace{4pt}
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Scale 10–11 identification:}
\begin{itemize}
\item Scale 10: Earth's elastic Green's function — seismic wave propagation
\item Scale 11: Seismic Memory Propagator — global free oscillations
\item Same equation: $(\nabla^2 + k^2)G = \delta$ with crustal parameters
\item Normal modes = poles of $G_{10}$ at eigenfrequencies $\omega_n$
\end{itemize}
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Cross-scale correspondence:}
\begin{itemize}
\item Seismic $P$-wave $\leftrightarrow$ longitudinal field mode
\item Seismic $S$-wave $\leftrightarrow$ transverse field mode
\item Earth's free oscillations $\leftrightarrow$ global field normal modes
\item Mantle convection $\leftrightarrow$ thermodynamic propagator (scale 12)
\end{itemize}
\end{minipage}
\vspace{3pt}
\end{minipage}}

\startcolumns

# I · The Seismic Memory Propagator

The elastic Green's function for seismic waves in a stratified Earth:
$$G^E_{ij}(\mathbf{r},t;\mathbf{r}',t') = \sum_n \frac{u_n^i(\mathbf{r})\,u_n^{*j}(\mathbf{r}')}
{\omega_n^2 - \omega^2 - 2i\omega\gamma_n}\,e^{-i\omega_n(t-t')}$$

This is the \textbf{resolvent} of the elastic wave operator — mathematically
identical to the Clinical Operator Propagator (P10) under relabelling.
One equation; different substrate.

# II · Normal Modes and Memory

Earth's normal modes (free oscillations $_0S_2$, $_0T_2$, \ldots) are
exactly the poles of $G^E$. Their frequencies encode the Earth's
interior structure — the planet's somatic memory.

Post-earthquake ring-down $\equiv$ memory kernel decay:
$$G^E(t) \sim \sum_n A_n\,e^{-t/\tau_n}\cos(\omega_n t + \phi_n)$$

This is the same form as $K(\tau) = K_0 e^{-\tau/\tau_m}$
from somatic memory (scale 7) — the \textit{Seismic Memory Propagator}.

# III · The USF at Geological Scale

\begin{itemize}
\item Scale 10: local seismic propagation — fault zone to fault zone
\item Scale 11: global free oscillations — the whole Earth as a resonator
\item Scale 12: mantle convection and solar wind — the thermodynamic propagator
\item Cross-scale link: USF wave speed $v_s(\sigma)$ interpolates from neural to seismic
\end{itemize}

# IV · Geophysical Test of the USF

Prediction: the ratio of seismic $P$ to $S$ wave speeds should
equal the ratio of corresponding USF field modes at scale 10.

$$\frac{v_P}{v_S} = \sqrt{\frac{\lambda + 2\mu}{\mu}} \approx \frac{k_P}{k_S}$$

This is a direct numerical test of the scale-10 G-identification.
Data: global seismograph networks (IRIS/GSN).

\noindent\rule{\linewidth}{0.4pt}

\noindent{\small\sffamily G-ID: \textit{Seismic Memory Propagator} — elastic Green's function for crustal wave propagation.
ORCID: 0009-0007-2194-0850 · CC BY 4.0 · Zurich 2026}
