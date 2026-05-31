"""Generate all BUILD figures for wave-atlas.

Run from repo root: python paper/soma/wave-atlas/figures/build_figures.py
Outputs <id>.png at 300 dpi into the same directory.
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import Circle, FancyArrowPatch, Wedge

OUT = Path(__file__).parent
plt.rcParams.update({
    "font.family": "serif",
    "font.size": 9,
    "axes.linewidth": 0.6,
    "axes.edgecolor": "#222",
    "axes.labelcolor": "#222",
    "xtick.color": "#222",
    "ytick.color": "#222",
    "savefig.dpi": 300,
    "savefig.bbox": "tight",
})

INK = "#111111"
ACCENT = "#1f4e8a"
WARM = "#b04a2a"
MUTED = "#8a8a8a"


def save(fig, name):
    out = OUT / f"{name}.png"
    fig.savefig(out, dpi=300, facecolor="white")
    plt.close(fig)
    print(f"  wrote {out.name}")


# -------------------------------------------------------------- F1.1
def f1_1_standing_wave():
    fig, axes = plt.subplots(4, 1, figsize=(5.2, 4.2), sharex=True)
    x = np.linspace(0, 1, 400)
    for ax, n, label in zip(axes, [1, 2, 3, 4],
                            ["fundamental n=1", "2nd harmonic n=2",
                             "3rd harmonic n=3", "4th harmonic n=4"]):
        y = np.sin(n * np.pi * x)
        ax.plot(x, y, color=ACCENT, lw=1.4)
        ax.plot(x, -y, color=ACCENT, lw=0.6, alpha=0.35)
        ax.axhline(0, color="#999", lw=0.4)
        ax.set_ylim(-1.2, 1.2)
        ax.set_yticks([])
        ax.text(0.01, 1.0, label, fontsize=8, color=INK)
        for s in ("top", "right", "left"):
            ax.spines[s].set_visible(False)
    axes[-1].set_xlabel("position along string")
    fig.suptitle("F1.1  Standing waves on a fixed string", fontsize=10)
    save(fig, "F1_1_standing_wave")


# -------------------------------------------------------------- F3.2
def f3_2_density_wave():
    fig, ax = plt.subplots(figsize=(4.8, 4.8))
    theta = np.linspace(0, 6 * np.pi, 2000)
    r_star = np.linspace(0.1, 1.0, 2000)
    # background star field
    rng = np.random.default_rng(42)
    n = 600
    rb = np.sqrt(rng.random(n))
    tb = rng.random(n) * 2 * np.pi
    ax.scatter(rb * np.cos(tb), rb * np.sin(tb), s=0.6, c="#ccc")
    # density wave envelope (two spiral arms)
    for offset in (0, np.pi):
        t = np.linspace(0, 2.5 * np.pi, 600)
        r = 0.18 + 0.13 * t
        x = r * np.cos(t + offset)
        y = r * np.sin(t + offset)
        ax.plot(x, y, color=ACCENT, lw=4, alpha=0.25)
        ax.plot(x, y, color=ACCENT, lw=1.0)
    # stars on arms (compressed)
    for offset in (0, np.pi):
        t = np.linspace(0, 2.5 * np.pi, 200)
        r = 0.18 + 0.13 * t + 0.02 * rng.standard_normal(t.size)
        x = r * np.cos(t + offset)
        y = r * np.sin(t + offset)
        ax.scatter(x, y, s=2, c=WARM)
    ax.set_xlim(-1.1, 1.1)
    ax.set_ylim(-1.1, 1.1)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title("F3.2  Density-wave spiral — stars pass through; the pattern persists",
                 fontsize=9)
    save(fig, "F3_2_density_wave")


# -------------------------------------------------------------- F4.2
def f4_2_helioseismology():
    fig, ax = plt.subplots(figsize=(4.6, 4.6), subplot_kw={"projection": "polar"})
    theta = np.linspace(0, 2 * np.pi, 360)
    for l in range(1, 6):
        r = 1 + 0.08 * np.cos(l * theta + l * 0.3)
        ax.plot(theta, r, lw=1.0, alpha=0.7,
                color=plt.cm.viridis(l / 6),
                label=f"ℓ = {l}")
    ax.set_yticklabels([])
    ax.set_xticklabels([])
    ax.legend(loc="lower right", bbox_to_anchor=(1.18, -0.05), fontsize=7,
              frameon=False)
    ax.set_title("F4.2  Solar p-mode oscillations\n(spherical harmonics ℓ = 1..5)",
                 fontsize=9, pad=12)
    save(fig, "F4_2_helioseismology")


# -------------------------------------------------------------- F5.1
def f5_1_earth_football():
    fig, ax = plt.subplots(figsize=(4.6, 4.6))
    theta = np.linspace(0, 2 * np.pi, 400)
    # base circle
    ax.plot(np.cos(theta), np.sin(theta), color="#888", lw=0.8)
    # deformed shape — ₀S₂ football mode (oblate / prolate)
    for amp, color, alpha in [(0.15, ACCENT, 1.0), (-0.15, WARM, 0.6)]:
        r = 1 + amp * (3 * np.cos(theta) ** 2 - 1) / 2
        ax.plot(r * np.cos(theta), r * np.sin(theta), color=color, lw=1.4,
                alpha=alpha)
    ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title("F5.1  Earth ₀S₂ — the 'football' free oscillation\n"
                 "period ≈ 54 minutes",
                 fontsize=9)
    save(fig, "F5_1_earth_football")


# -------------------------------------------------------------- F8.4
def f8_4_fractal_dims():
    fig, ax = plt.subplots(figsize=(5.4, 3.2))
    items = [
        ("Cantor set", 0.6309),
        ("Coastline (Britain)", 1.25),
        ("Mandelbrot boundary", 2.0),
        ("Bronchial tree", 2.97),
        ("Neuron arborisation", 1.7),
        ("Cumulus cloud edge", 1.35),
        ("Cosmic web (3D)", 1.85),
    ]
    items.sort(key=lambda p: p[1])
    names = [x[0] for x in items]
    vals = [x[1] for x in items]
    y = np.arange(len(items))
    ax.barh(y, vals, color=ACCENT, alpha=0.85)
    ax.set_yticks(y)
    ax.set_yticklabels(names)
    ax.set_xlabel("fractal dimension D")
    ax.set_xlim(0, 3.2)
    ax.axvline(1, color="#bbb", lw=0.6, ls="--")
    ax.axvline(2, color="#bbb", lw=0.6, ls="--")
    ax.axvline(3, color="#bbb", lw=0.6, ls="--")
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("F8.4  Fractal dimension across scales", fontsize=10)
    save(fig, "F8_4_fractal_dims")


# -------------------------------------------------------------- F9.1
def f9_1_hrv():
    fig, axes = plt.subplots(3, 1, figsize=(5.4, 4.0), sharex=True)
    t = np.linspace(0, 300, 3000)  # 5 minutes
    rng = np.random.default_rng(7)
    # calm: strong RSA, mean RR ~1000ms, large HF
    calm = 1000 + 60 * np.sin(2 * np.pi * t / 4.5) + 8 * rng.standard_normal(t.size)
    # anxious: short RR, low HF
    anx = 720 + 8 * np.sin(2 * np.pi * t / 4) + 6 * rng.standard_normal(t.size)
    # flow: mid RR, structured oscillation
    flow = 850 + 35 * np.sin(2 * np.pi * t / 10) + 18 * np.sin(2 * np.pi * t / 4) \
           + 6 * rng.standard_normal(t.size)

    for ax, sig, label, color in zip(axes,
                                     [calm, anx, flow],
                                     ["calm  (HF power ≈ 1800 ms²)",
                                      "anxious  (HF power ≈ 90 ms²)",
                                      "flow  (HF power ≈ 1200 ms²)"],
                                     [ACCENT, WARM, "#3e8a4a"]):
        ax.plot(t, sig, color=color, lw=0.7)
        ax.text(0.01, 0.85, label, transform=ax.transAxes, fontsize=8)
        ax.set_ylabel("RR (ms)")
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
    axes[-1].set_xlabel("time (s)")
    fig.suptitle("F9.1  Heart-rate variability across three soma-field states",
                 fontsize=10)
    save(fig, "F9_1_hrv")


# -------------------------------------------------------------- F9.3
def f9_3_ecg():
    fig, ax = plt.subplots(figsize=(5.4, 2.6))
    t = np.linspace(0, 1.0, 1000)
    # crude single-beat ECG
    P = 0.12 * np.exp(-((t - 0.18) / 0.025) ** 2)
    Q = -0.12 * np.exp(-((t - 0.34) / 0.012) ** 2)
    R = 1.0 * np.exp(-((t - 0.37) / 0.010) ** 2)
    S = -0.22 * np.exp(-((t - 0.40) / 0.015) ** 2)
    T = 0.28 * np.exp(-((t - 0.58) / 0.045) ** 2)
    ecg = P + Q + R + S + T
    ax.plot(t, ecg, color=INK, lw=1.0)
    # annotations
    for lab, x, y in [("P", 0.18, 0.18), ("Q", 0.34, -0.20),
                      ("R", 0.37, 1.06), ("S", 0.40, -0.30),
                      ("T", 0.58, 0.34)]:
        ax.text(x, y, lab, ha="center", fontsize=9, color=ACCENT)
    ax.axhline(0, color="#bbb", lw=0.4)
    ax.set_xlabel("time (s)")
    ax.set_ylabel("mV (arbitrary)")
    ax.set_ylim(-0.5, 1.3)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("F9.3  A single cardiac cycle — the P-Q-R-S-T complex",
                 fontsize=10)
    save(fig, "F9_3_ecg")


# -------------------------------------------------------------- F11.2
def f11_2_eight_modes():
    fig, ax = plt.subplots(figsize=(5.4, 5.4), subplot_kw={"projection": "polar"})
    modes = ["calm", "fight", "flight", "freeze",
             "flow", "joy", "grief", "hypervigilance"]
    colors = ["#3e8a4a", "#b04a2a", "#d18a35", "#3a3a4f",
              "#1f4e8a", "#e8b733", "#5a5a8a", "#8a2a5e"]
    radii = [1.0, 0.85, 0.85, 0.7, 1.0, 0.95, 0.8, 0.75]
    n = len(modes)
    angles = np.linspace(0, 2 * np.pi, n, endpoint=False)
    ax.bar(angles, radii, width=2 * np.pi / n * 0.92,
           color=colors, alpha=0.75, edgecolor="white", linewidth=2)
    ax.set_yticks([])
    ax.set_xticks(angles)
    ax.set_xticklabels(modes, fontsize=9)
    ax.set_ylim(0, 1.15)
    ax.set_title("F11.2  The eight modes of the soma field — E8 Cartan sector",
                 fontsize=10, pad=18)
    save(fig, "F11_2_eight_modes")


# -------------------------------------------------------------- F12.1
def f12_1_landscape():
    fig, ax = plt.subplots(figsize=(5.6, 3.4))
    x = np.linspace(-5, 5, 1000)
    # multi-well potential
    V = (0.6 * (x - 3) ** 2 - 0.15 * (x - 3) ** 4 + 0.01 * (x - 3) ** 6) * 0.0  # placeholder
    V = (np.exp(-((x + 3.5) / 0.9) ** 2) * -1.0 +  # calm
         np.exp(-((x + 1.5) / 0.6) ** 2) * -0.7 +  # awe
         np.exp(-((x - 0.8) / 0.5) ** 2) * -0.5 +  # fear (shallow)
         np.exp(-((x - 3.0) / 0.8) ** 2) * -0.9)   # freeze
    V += 0.04 * x ** 2  # gentle confining
    ax.fill_between(x, V, V.max() + 0.2, color="#f4f0e8")
    ax.plot(x, V, color=INK, lw=1.4)
    labels = [(-3.5, "calm", ACCENT),
              (-1.5, "awe", "#5a3a8a"),
              (0.8, "fear", WARM),
              (3.0, "freeze", "#3a3a4f")]
    for xp, name, c in labels:
        idx = np.argmin(np.abs(x - xp))
        ax.plot(xp, V[idx], "o", color=c, ms=6)
        ax.text(xp, V[idx] - 0.18, name, ha="center", fontsize=9, color=c,
                fontweight="bold")
    ax.set_xlabel("soma-field coordinate (schematic)")
    ax.set_ylabel("energy")
    ax.set_xticks([])
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("F12.1  Energy landscape with named attractors", fontsize=10)
    save(fig, "F12_1_landscape")


# -------------------------------------------------------------- F12.2
def f12_2_trajectory():
    fig, ax = plt.subplots(figsize=(5.6, 3.4))
    x = np.linspace(-5, 5, 1000)
    V = (np.exp(-((x + 3.5) / 0.9) ** 2) * -1.0 +
         np.exp(-((x + 1.5) / 0.6) ** 2) * -0.7 +
         np.exp(-((x - 0.8) / 0.5) ** 2) * -0.5 +
         np.exp(-((x - 3.0) / 0.8) ** 2) * -0.9)
    V += 0.04 * x ** 2
    ax.plot(x, V, color=INK, lw=1.2, alpha=0.7)
    # langevin trajectory starting near calm, perturbed
    rng = np.random.default_rng(11)
    pos = -3.5
    traj = [pos]
    dt = 0.02
    for k in range(1200):
        i = np.argmin(np.abs(x - pos))
        grad = (V[min(i + 1, 999)] - V[max(i - 1, 0)]) / (2 * (x[1] - x[0]))
        kick = 0.0 if k != 300 else 1.8  # perturbation
        pos = pos - grad * dt + 0.06 * rng.standard_normal() + kick
        pos = np.clip(pos, -4.8, 4.8)
        traj.append(pos)
    traj = np.array(traj)
    y_traj = np.array([V[np.argmin(np.abs(x - p))] for p in traj])
    ax.plot(traj, y_traj, color=WARM, lw=0.8, alpha=0.85)
    ax.plot(traj[0], y_traj[0], "o", color="#3e8a4a", ms=7, label="start (calm)")
    ax.plot(traj[-1], y_traj[-1], "s", color="#3a3a4f", ms=7, label="end (freeze)")
    ax.legend(loc="upper right", fontsize=8, frameon=False)
    ax.set_xlabel("soma-field coordinate")
    ax.set_ylabel("energy")
    ax.set_xticks([])
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("F12.2  Perturbed trajectory: calm → freeze after a shock",
                 fontsize=10)
    save(fig, "F12_2_trajectory")


# -------------------------------------------------------------- F13.1
def f13_1_quant_exp():
    fig, ax = plt.subplots(figsize=(5.4, 3.4))
    labels = ["classical\n(cold anneal)", "quantum\n(transverse field)"]
    successes = [0, 3]
    trials = [48, 3]
    rates = [s / t * 100 for s, t in zip(successes, trials)]
    bars = ax.bar(labels, rates, color=[MUTED, ACCENT], width=0.55, alpha=0.9)
    for b, s, t in zip(bars, successes, trials):
        h = b.get_height()
        ax.text(b.get_x() + b.get_width() / 2, h + 3,
                f"{s}/{t}", ha="center", fontsize=10, fontweight="bold")
    ax.set_ylim(0, 115)
    ax.set_ylabel("Awe-basin success rate (%)")
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("F13.1  QUANT-EXP-1 — quantum reaches the basin; classical does not",
                 fontsize=10)
    save(fig, "F13_1_quant_exp")


# -------------------------------------------------------------- F13.2
def f13_2_tunnelling():
    fig, ax = plt.subplots(figsize=(5.4, 3.2))
    x = np.linspace(-4, 4, 500)
    V = -np.exp(-((x + 2) / 0.7) ** 2) - 0.85 * np.exp(-((x - 2) / 0.7) ** 2) \
        + 0.6 * np.exp(-(x / 0.5) ** 2)
    ax.plot(x, V, color=INK, lw=1.4)
    ax.fill_between(x, V, 0.6, color="#f4f0e8")
    # wavefunction
    psi_classical = 0.4 * np.exp(-((x + 2) / 0.5) ** 2) - 1.2
    psi_quantum = (0.4 * np.exp(-((x + 2) / 0.5) ** 2)
                   + 0.15 * np.exp(-((x - 2) / 0.6) ** 2)) - 1.2
    ax.plot(x, psi_classical, color=MUTED, lw=1.0, label="classical (trapped)")
    ax.plot(x, psi_quantum, color=ACCENT, lw=1.2, label="quantum (leaks through)")
    ax.legend(loc="upper right", fontsize=8, frameon=False)
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_title("F13.2  Tunnelling through an energy barrier",
                 fontsize=10)
    for s in ("top", "right", "left", "bottom"):
        ax.spines[s].set_visible(False)
    save(fig, "F13_2_tunnelling")


# -------------------------------------------------------------- F13.3
def f13_3_schedule():
    fig, ax = plt.subplots(figsize=(5.4, 3.2))
    t = np.linspace(0, 1, 500)
    # linear schedule: A(t) decreases, B(t) increases
    A_lin = 1 - t
    B_lin = t
    # cosine
    A_cos = (1 + np.cos(np.pi * t)) / 2
    B_cos = (1 - np.cos(np.pi * t)) / 2
    ax.plot(t, A_lin, color=WARM, lw=1.4, label="A(t)  transverse field — linear")
    ax.plot(t, B_lin, color=ACCENT, lw=1.4, label="B(t)  problem Hamiltonian — linear")
    ax.plot(t, A_cos, color=WARM, lw=1.0, ls="--", alpha=0.6,
            label="A(t) cosine")
    ax.plot(t, B_cos, color=ACCENT, lw=1.0, ls="--", alpha=0.6,
            label="B(t) cosine")
    ax.set_xlabel("normalised anneal time t/T")
    ax.set_ylabel("schedule weight")
    ax.legend(fontsize=7, frameon=False, loc="center right")
    ax.set_title("F13.3  Quantum annealing transverse-field schedule",
                 fontsize=10)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    save(fig, "F13_3_schedule")


# -------------------------------------------------------------- F15.2
def f15_2_g2():
    fig, ax = plt.subplots(figsize=(5.0, 5.0))
    ax.set_aspect("equal")
    ax.axis("off")
    # seven directions arranged in a (4+3) Hopf-like split
    centre = (0, 0)
    radius = 1.0
    # 4 outer (Calabi-Yau-like, paired)
    pairs = [(0, np.pi), (np.pi/2, 3*np.pi/2)]
    for a, b in pairs:
        x1, y1 = radius * np.cos(a), radius * np.sin(a)
        x2, y2 = radius * np.cos(b), radius * np.sin(b)
        ax.plot([x1, x2], [y1, y2], color=ACCENT, lw=1.2, alpha=0.5)
        ax.plot(x1, y1, "o", color=ACCENT, ms=10)
        ax.plot(x2, y2, "o", color=ACCENT, ms=10)
    # 3 inner forming a triangle (the G2 "extra" three-form direction)
    for k in range(3):
        a = np.pi/2 + 2*np.pi*k/3
        x, y = 0.45 * np.cos(a), 0.45 * np.sin(a)
        ax.plot(x, y, "s", color=WARM, ms=10)
        ax.plot([0, x], [0, y], color=WARM, lw=1.0, alpha=0.6)
    ax.plot(0, 0, "*", color=INK, ms=14)
    ax.text(0, -1.35,
            "7 directions = 4 (Calabi-Yau-like, paired) ⊕ 3 (G₂ three-form)",
            ha="center", fontsize=8.5)
    ax.set_xlim(-1.4, 1.4)
    ax.set_ylim(-1.5, 1.4)
    ax.set_title("F15.2  G₂ holonomy — seven internal directions of feeling",
                 fontsize=10)
    save(fig, "F15_2_g2")


# -------------------------------------------------------------- F15.3
def f15_3_mtheory():
    fig, ax = plt.subplots(figsize=(5.6, 4.6))
    ax.set_aspect("equal")
    ax.axis("off")
    # central M-theory node
    centre = (0, 0)
    ax.add_patch(Circle(centre, 0.45, color=INK, alpha=0.85))
    ax.text(0, 0, "M-theory\n11D", ha="center", va="center",
            color="white", fontsize=11, fontweight="bold")
    # five string theories around it
    theories = ["Type I", "Type IIA", "Type IIB",
                "Heterotic SO(32)", "Heterotic E₈×E₈"]
    n = len(theories)
    for k, name in enumerate(theories):
        a = np.pi/2 + 2*np.pi*k/n
        x, y = 1.7 * np.cos(a), 1.7 * np.sin(a)
        ax.add_patch(Circle((x, y), 0.32, color=ACCENT, alpha=0.5))
        ax.text(x, y, name, ha="center", va="center",
                fontsize=7.5, color=INK)
        # arrow inward
        ax.add_patch(FancyArrowPatch((x*0.78, y*0.78), (x*0.28, y*0.28),
                                     arrowstyle="-|>", mutation_scale=10,
                                     color=MUTED, lw=0.7))
    ax.set_xlim(-2.4, 2.4)
    ax.set_ylim(-2.2, 2.2)
    ax.set_title("F15.3  The duality web — five superstring theories\n"
                 "as limits of a single 11-dimensional theory",
                 fontsize=10)
    save(fig, "F15_3_mtheory")


# -------------------------------------------------------------- F17.1
def f17_1_breath():
    fig, ax = plt.subplots(figsize=(5.4, 2.6))
    t = np.linspace(0, 30, 1500)
    # six breaths per minute = 0.1 Hz; mild RSA modulation
    breath = np.sin(2 * np.pi * 0.1 * t)
    ax.fill_between(t, 0, breath, where=breath > 0, color=ACCENT, alpha=0.3,
                    label="inhale")
    ax.fill_between(t, 0, breath, where=breath <= 0, color=WARM, alpha=0.3,
                    label="exhale")
    ax.plot(t, breath, color=INK, lw=1.0)
    ax.axhline(0, color="#999", lw=0.4)
    ax.set_xlabel("time (s)")
    ax.set_yticks([])
    ax.legend(fontsize=8, frameon=False, loc="upper right")
    for s in ("top", "right", "left"):
        ax.spines[s].set_visible(False)
    ax.set_title("F17.1  A breath, drawn as a wave (6 bpm, resonance frequency)",
                 fontsize=10)
    save(fig, "F17_1_breath")


def main():
    print(f"Writing figures to {OUT}")
    f1_1_standing_wave()
    f3_2_density_wave()
    f4_2_helioseismology()
    f5_1_earth_football()
    f8_4_fractal_dims()
    f9_1_hrv()
    f9_3_ecg()
    f11_2_eight_modes()
    f12_1_landscape()
    f12_2_trajectory()
    f13_1_quant_exp()
    f13_2_tunnelling()
    f13_3_schedule()
    f15_2_g2()
    f15_3_mtheory()
    f17_1_breath()
    print("Done.")


if __name__ == "__main__":
    main()
