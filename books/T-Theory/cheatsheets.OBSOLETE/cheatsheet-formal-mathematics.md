---
title: ""
lang: en-GB
geometry: "a4paper,margin=15mm"
fontsize: 9.5pt
linestretch: 1.15
mainfont: "TeX Gyre Pagella"
---

\begin{center}
{\LARGE\bfseries\sffamily [T]-Theory: Mathematics}\\[4pt]
{\large\sffamily\color{heading} P4 · Formal Foundation · For: The Type Theorist}\\[2pt]
{\normalsize\sffamily\color{heading} \textit{Functorial Green's Function — the proof architecture in Lean 4.}}
\end{center}

\vspace{4pt}

\noindent\colorbox{ghost}{\begin{minipage}{\dimexpr\textwidth-2\fboxsep\relax}
\vspace{4pt}
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Build status (2026-08-15):}
\begin{itemize}
\item \texttt{lake build}: 3912/3912 jobs, exit 0
\item 22 defaultTargets, all \textbf{clean} (warnings only)
\item 0 Float in proof files (ISS-009 closed)
\item 0 active \texttt{sorry} stubs (ISS-005 closed)
\end{itemize}
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Gate theorem architecture:}
\begin{itemize}
\item \texttt{LocalGR.lean}: linearised GR gate
\item \texttt{LocalGeometry.lean}: compact geometry gate
\item \texttt{calabi\_yau\_moduli\_static}: axiom $\to$ \textbf{theorem}
\item \texttt{dm\_gauge\_coupling\_zero}: axiom $\to$ \textbf{theorem}
\end{itemize}
\end{minipage}
\vspace{3pt}
\end{minipage}}

\startcolumns

# I · The Functorial Structure

The USF propagator $G$ is a \textbf{natural transformation}:
$$G : \mathrm{Scale}_{20} \to \mathrm{FieldEq}$$

where $\mathrm{Scale}_{20} \simeq \mathrm{Fin}\;21$ and $\mathrm{FieldEq}(\sigma)$
is the type of field configurations at scale $\sigma$.

\textbf{Scale invariance as a coherence condition}:
$$G \circ Z_\sigma = Z_{\sigma+1} \circ G \quad \forall\,\sigma$$

The Zoom Operator $Z_\sigma$ is the functor between adjacent fibers.
Proved in Lean 4 via \texttt{scale\_invariance\_full}.

# II · The \(\Sigma\)-Type Decomposition

$$\mathrm{SomaField} \;\equiv\; \sum_{(\sigma\,:\,\mathrm{Fin}\;21)} \mathrm{Substrate}(\sigma)$$

Each $\mathrm{Substrate}(\sigma) : \mathrm{Type}$ is the Lean 4 type of
the physical carrier at scale $\sigma$ (e.g.\ \texttt{Fin 3 → ℝ} for $M_3$,
\texttt{CompactX7} for $X_7$).

Lean types used: \texttt{Matrix (Fin 8) (Fin 8) ℝ} (coupling $W_8$),
\texttt{RigidAttractor V φ₀} (moduli stability),
\texttt{G2CompactManifold} (compact geometry).

# III · Honest Axiom Accounting

All 11-dimensional claims bottom out in precisely-typed local axioms
— no vacuous \texttt{True} wildcards remain:

\begin{itemize}
\item \texttt{g2\_holonomy\_implies\_rigid\_attractor} — Berger classification (pending Mathlib)
\item \texttt{rigidAttractor\_freezes\_omega\_lambda} — GR perturbation theory (pending Mathlib)
\item \texttt{g2\_implies\_hw\_compactification} — Horava-Witten geometry (pending Mathlib)
\end{itemize}

Each axiom names its exact Mathlib dependency. The proof tree is auditable.

# IV · Open Proof Obligations

\begin{itemize}
\item \textbf{ISS-011}: Upgrade \texttt{Pattern = Fin D → ℝ} to \texttt{SpinState} for Hopfield convergence
\item \textbf{ISS-012}: Add \texttt{lean-appendix} to \texttt{lake build}
\item \textbf{ISS-014}: Path-dependence in moduli space (needs ISS-016)
\item \textbf{Mathlib}: Riemannian holonomy, GR perturbation theory, KK spectral theory
\end{itemize}

\noindent\rule{\linewidth}{0.4pt}

\noindent{\small\sffamily G-ID: \textit{Functorial Green's Function} — category-theoretic propagator between field spaces.
ORCID: 0009-0007-2194-0850 · CC BY 4.0 · Zurich 2026}
