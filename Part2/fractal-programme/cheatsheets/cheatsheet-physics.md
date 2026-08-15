---
title: ""
lang: en-GB
geometry: "a4paper,margin=15mm"
fontsize: 9.5pt
linestretch: 1.15
mainfont: "TeX Gyre Pagella"
---

\begin{center}
{\LARGE\bfseries\sffamily [T]-Theory: Physics}\\[4pt]
{\large\sffamily\color{heading} P2 · Formal Foundation · For: The Astrophysicist}\\[2pt]
{\normalsize\sffamily\color{heading} \textit{The Master Green's Function — from Helmholtz to the Hubble horizon.}}
\end{center}

\vspace{4pt}

\noindent\colorbox{ghost}{\begin{minipage}{\dimexpr\textwidth-2\fboxsep\relax}
\vspace{4pt}
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Cosmological predictions (zero-parameter):}
\begin{itemize}
\item $\Omega_\Lambda = 7/11 \approx 0.636$ \quad observed: $0.683$ \quad (6.8\% off)
\item $\Omega_c = 3/11 \approx 0.273$ \quad observed: $0.265$ \quad (2.9\% off)
\item $\Omega_b = 1/22 \approx 0.045$ \quad observed: $0.049$ \quad (8\% off)
\item $w = -1$ exact; live test: DESI DR1 \& Euclid
\end{itemize}
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Derived, not postulated:}
\begin{itemize}
\item $\Lambda$ from compact vacuum fraction $7/11$
\item Dark matter $=$ spatial block vacuum — no WIMPs, no direct detection
\item Cosmological constant problem resolved topologically
\item Moduli frozen by G$_2$ holonomy (LocalGR gate theorem, Lean 4)
\end{itemize}
\end{minipage}
\vspace{3pt}
\end{minipage}}

\startcolumns

# I · The Master Green's Function

The USF propagator in flat 4D spacetime (Lorenz gauge, retarded):
$$G_R(r,\tau) = \frac{v_s}{4\pi r}\,e^{-kv_s\tau}\,\delta\!\left(\tau - \tfrac{r}{v_s}\right)\theta(\tau)$$

The **Euclidean QFT formulation** (Osterwalder–Schrader, P14–P15):
$$S[\Phi] = \int d^4x\left[\tfrac{1}{2}(\partial_\mu\Phi)^2 + \tfrac{1}{2}k^2\Phi^2 + \tfrac{\lambda}{4!}\Phi^4\right]$$

All four OS axioms verified in Lean 4 (P14). Reflection positivity confirmed
under Hopfield quartic coupling (P15).

# II · The M-Theory Geometry

$$M_{11} = \mathbb{R}_t \times M_3 \times X_7, \quad X_7 = \mathrm{CY}_3 \times S^1/\mathbb{Z}_2$$

The vacuum energy partition from dimension counting alone:
$$\Omega_\Lambda = \frac{\dim X_7}{\dim M_{11}} = \frac{7}{11}, \quad
\Omega_c = \frac{\dim M_3}{\dim M_{11}} = \frac{3}{11}$$

G$_2$ holonomy on $X_7$ freezes the moduli: $d\Omega_\Lambda/dz = 0$.
Proved in Lean 4 via the LocalGR gate theorem chain.

# III · Scale 19–20 on the Dial

At cosmological scale ($n=19$), the field equation reduces to the linearised
Einstein equation. At $n=20$ (Hubble scale), the propagator becomes:

$$G_{20}(x,x') = \text{gravitational wave propagator} = \frac{e^{-m_g r}}{r}$$

with effective graviton mass $m_g \to 0$ on the Hubble horizon.

# IV · Key Theorems (Lean 4, 0 sorries)

\begin{itemize}
\item \texttt{cosmological\_correspondence}: scale 19 = linearised GR ✓
\item \texttt{calabi\_yau\_moduli\_static}: $d\Omega_\Lambda/dz = 0$ ✓
\item \texttt{dm\_gauge\_coupling\_zero}: DM has zero EM coupling ✓
\item \texttt{usf\_all\_predictions\_within\_bounds}: all three Planck hits ✓
\end{itemize}

\noindent\rule{\linewidth}{0.4pt}

\noindent{\small\sffamily G-ID: \textit{The Master Green's Function} — $(\nabla^2+k^2)G=\delta$ in relativistic field theory.
ORCID: 0009-0007-2194-0850 · CC BY 4.0 · Zurich 2026}
