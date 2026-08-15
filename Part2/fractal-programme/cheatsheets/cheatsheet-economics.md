---
title: ""
lang: en-GB
geometry: "a4paper,margin=15mm"
fontsize: 9.5pt
linestretch: 1.15
mainfont: "TeX Gyre Pagella"
---

\begin{center}
{\LARGE\bfseries\sffamily [T]-Theory: Economics}\\[4pt]
{\large\sffamily\color{heading} P15 · Capstone · For: The Economist}\\[2pt]
{\normalsize\sffamily\color{heading} \textit{The Nash Attractor Resolvent — markets as Hopfield networks settling into equilibria.}}
\end{center}

\vspace{4pt}

\noindent\colorbox{ghost}{\begin{minipage}{\dimexpr\textwidth-2\fboxsep\relax}
\vspace{4pt}
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Economy as field theory:}
\begin{itemize}
\item Market = Hopfield network in 8D agent strategy space
\item Nash equilibrium = fixed point of $\mathrm{step}(W_\mathrm{market})$
\item Economic shock = perturbation of the collective field
\item Recession = field trapped in a suboptimal attractor well
\end{itemize}
\end{minipage}\hfill
\begin{minipage}[t]{0.48\textwidth}
\textbf{\color{heading}Key identifications:}
\begin{itemize}
\item Price signal = field gradient $\nabla H$
\item Interest rate = field temperature $T_\mathrm{field}$
\item Central bank = volitional injection $J_\mathrm{CB}(t)$
\item Inflation = field running away from equilibrium
\end{itemize}
\end{minipage}
\vspace{3pt}
\end{minipage}}

\startcolumns

# I · The Nash Attractor Resolvent

The Nash equilibrium as a fixed point of the economic propagator:
$$G_\mathrm{Nash}(\lambda) = (H_\mathrm{market} - \lambda I)^{-1}$$

A Nash equilibrium corresponds to a pole of $G_\mathrm{Nash}$ at $\lambda^*$
where $\lambda^* = \min H_\mathrm{market}(\Psi)$.

The \textbf{resolvent} determines which equilibrium the market settles into,
given initial conditions — exactly the Clinical Operator Propagator (P10)
in an economic substrate. Same mathematics; different actors.

# II · Market Dynamics as Field Evolution

$$\dot{\Psi}_\mathrm{market} = -\nabla H_\mathrm{market}(\Psi) + J_\mathrm{policy}(t) + \eta_t$$

Where:
\begin{itemize}
\item $H_\mathrm{market}(\Psi) = -\tfrac{1}{2}\Psi^T W_\mathrm{market}\,\Psi$ (Hopfield form)
\item $J_\mathrm{policy}(t)$ = monetary/fiscal intervention
\item $\eta_t$ = market noise (temperature $T_\mathrm{field} \propto$ volatility)
\end{itemize}

This is Arrow–Debreu general equilibrium theory re-expressed as gradient flow.

# III · Economic Shocks as Field Perturbations

\begin{itemize}
\item Supply shock = $W_\mathrm{market}$ coupling matrix changes suddenly
\item Demand shock = source term $J(t)$ spike
\item Financial crisis = field escaping a basin, cascading through the network
\item Recovery = field finding a new Nash attractor (often suboptimal)
\end{itemize}

Secular stagnation = field in a low-energy basin with high escape barrier
(low interest rate $\neq$ low temperature in this model).

# IV · Welfare as Negative Energy

Aggregate welfare:
$$W = -H_\mathrm{market}(\Psi^*) = \tfrac{1}{2}{\Psi^*}^T W_\mathrm{market}\,\Psi^*$$

Maximising welfare = finding the global minimum of $-H$.
Policy = reshaping $W_\mathrm{market}$ to deepen the welfare-optimal well.

\noindent\rule{\linewidth}{0.4pt}

\noindent{\small\sffamily G-ID: \textit{The Nash Attractor Resolvent} — $(H-\lambda)^{-1}$ determining market equilibrium.
ORCID: 0009-0007-2194-0850 · CC BY 4.0 · Zurich 2026}
