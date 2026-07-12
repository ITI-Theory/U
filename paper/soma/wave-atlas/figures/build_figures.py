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
    # --- new scale-chapter figures ---
    fa_universal_dial()
    fa_dual_scaling()
    fa_three_waves()
    fs0_double_well()
    fs1_sho_string()
    fs2_yukawa_vs_coulomb()
    fs3_four_one_over_r()
    fs4_molecular_limbic()
    fs6_wkb_amplitude()
    fs8_arnold_tongue()
    fs_softmax_demo()
    # ---- real atlas figures (override grey placeholders) ----
    real_11d_body_schematic()
    real_hv_two_branes()
    real_hydrogen_atom_s3()
    real_hydrogen_orbitals_s3()
    real_hydrogen_spectrum_s3()
    real_nuclear_binding_energy_s2()
    real_periodic_table_s2()
    real_periodic_table_energy_s3()
    real_proton_quarks_s2()
    real_quantum_foam_s0()
    real_path_integral_s0()
    real_soap_bubble_foam_comparison_s0()
    real_soap_bubbles()
    real_branching_tree_s0()
    real_speaker_room_greens()
    real_m_theory_web_s1()
    real_coupling_matrix()
    real_crowd_entrainment()
    real_friendship_coupling()
    real_therapy_coupling()
    real_neurodivergent_parameter_space()
    real_glarus_thrust()
    real_thames_waveguide()
    real_earth_cross_section()
    real_milky_way_edge_on()
    real_cosmic_web()
    real_six_greens_functions()
    real_invariant_equation_all_scales()
    real_guitar_impulse()
    real_murmuration()
    print("Done.")


def _save_real(fig, stem):
    """Save as the placeholder name so it replaces the grey box."""
    out = OUT / f"{stem}-placeholder.png"
    fig.savefig(out, dpi=300, facecolor="white")
    plt.close(fig)
    print(f"  wrote {out.name}")


# ============================================================
# NEW FIGURES — scale atlas chapters
# ============================================================

def fa_universal_dial():
    """FA — The 20-step universal scale dial (vertical)."""
    fig, ax = plt.subplots(figsize=(3.5, 9))
    scales = list(range(21))
    log_metres = [-35 + n * 3 for n in scales]
    labels = [
        "0 Quantum foam", "1 String", "2 Nuclear", "3 Atomic",
        "4 Molecular", "5 Cellular", "6 Brain/CEMI", "7 Swarms",
        "8 Organism", "9 City", "10 Geological", "11 Planetary",
        "12 Orbital", "13 Solar system", "14 Stellar",
        "15 Galactic arm", "16 Galaxy", "17 Local group",
        "18 Cosmic web", "19 Observable universe", "20 Universal"
    ]
    colors = plt.cm.plasma(np.linspace(0.1, 0.95, 21))
    for i, (s, lm, lbl, col) in enumerate(zip(scales, log_metres, labels, colors)):
        ax.barh(i, 1, color=col, alpha=0.7, height=0.8)
        ax.text(1.05, i, f"$10^{{{lm}}}$ m — {lbl}", va='center', fontsize=7)
    ax.set_xlim(0, 5.5)
    ax.set_yticks([])
    ax.set_xticks([])
    for s in ax.spines.values():
        s.set_visible(False)
    ax.set_title("The 20-Step Scale Dial\n$(\\nabla^2+k^2)G=\\delta$ at every level",
                 fontsize=9)
    save(fig, "FA_universal_dial")


def fa_dual_scaling():
    """FA — Physical scale (metres) and mind rank N zoom together."""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(7, 4), sharey=True)
    n = np.arange(21)
    log_m = -35 + 3 * n
    log_N = [0, 2, 5, 2, 3, 4, 14, 5, 15, 7, 3, 3, 3, 6, 6, 11, 11, 12, 14, 20, 30]
    ax1.barh(n, log_m, color=ACCENT, alpha=0.7)
    ax1.set_xlabel("log₁₀(length / m)")
    ax1.set_title("Physical scale", fontsize=9)
    ax1.invert_xaxis()
    ax2.barh(n, log_N, color=WARM, alpha=0.7)
    ax2.set_xlabel("log₁₀(mind rank N)")
    ax2.set_title("Mind matrix rank", fontsize=9)
    for ax in (ax1, ax2):
        ax.set_yticks(n)
        ax.set_yticklabels([str(i) for i in n], fontsize=7)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
    fig.suptitle("Physical and mind zoom together\n(Dependent Pair Type — cannot zoom independently)",
                 fontsize=9)
    plt.tight_layout()
    save(fig, "FA_dual_scaling")


def fa_three_waves():
    """FA — Same wave shape at three different physical scales."""
    fig, axes = plt.subplots(1, 3, figsize=(8, 2.5))
    t = np.linspace(0, 4 * np.pi, 500)
    y = np.sin(t)
    titles = ["Ripple on water\n(Scale 7–8, mm–cm)", "Seismic P-wave\n(Scale 10, km)", "Neural action potential\n(Scale 5, mm)"]
    colors_list = [ACCENT, "#4a8a4a", WARM]
    for ax, col, title in zip(axes, colors_list, titles):
        ax.plot(t, y, color=col, lw=1.5)
        ax.fill_between(t, y, 0, where=y > 0, color=col, alpha=0.15)
        ax.set_xticks([])
        ax.set_yticks([])
        ax.set_title(title, fontsize=8)
        for s in ("top", "right", "left"):
            ax.spines[s].set_visible(False)
        ax.axhline(0, color="#999", lw=0.5)
    fig.suptitle("$(\\nabla^2+k^2)G=\\delta$ — three substrates, same wave shape",
                 fontsize=9)
    plt.tight_layout()
    save(fig, "FA_three_waves")


def fs0_double_well():
    """FS0 — The quartic double-well potential V(x) = W(x²-1)²."""
    fig, ax = plt.subplots(figsize=(5.5, 3.5))
    x = np.linspace(-1.8, 1.8, 400)
    for W, col, lbl in [(8, ACCENT, "W=8"), (10, WARM, "W=10"), (12, "#4a8a4a", "W=12")]:
        V = W * (x**2 - 1)**2
        ax.plot(x, V, color=col, lw=1.5, label=lbl)
    ax.axhline(0, color="#ccc", lw=0.5)
    ax.axvline(-1, color="#999", lw=0.5, ls="--")
    ax.axvline(1, color="#999", lw=0.5, ls="--")
    ax.text(-1, -1.5, "trauma\nattractor", ha="center", fontsize=7, color="#666")
    ax.text(1, -1.5, "resolved\nstate", ha="center", fontsize=7, color="#666")
    ax.text(0, 8.5, "barrier\nheight W", ha="center", fontsize=7, color="#666")
    ax.set_xlabel("limbic axis $x$")
    ax.set_ylabel("$V(x) = W(x^2-1)^2$")
    ax.set_ylim(-3, 16)
    ax.legend(fontsize=8, frameon=False)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("The limbic double-well — trauma vs resolved state\n"
                 "Classical dynamics: trapped. Quantum tunnelling: escape.",
                 fontsize=9)
    save(fig, "FS0_double_well")


def fs1_sho_string():
    """FS1 — The SHO is G: harmonic oscillator = impulse response."""
    fig, axes = plt.subplots(1, 2, figsize=(7.5, 3))
    t = np.linspace(0, 4 * np.pi, 300)
    omega = 1.5
    # Left: SHO oscillation
    axes[0].plot(t, np.cos(omega * t), color=ACCENT, lw=1.5)
    axes[0].set_title("Simple Harmonic Oscillator\n$\\ddot{x} + \\omega^2 x = 0$", fontsize=9)
    axes[0].set_xlabel("time"); axes[0].set_ylabel("$x(t)$")
    # Right: Green's function G = impulse response
    tau = np.linspace(0, 6, 300)
    G = np.exp(-0.3 * tau) * np.cos(omega * tau)
    axes[1].plot(tau, G, color=WARM, lw=1.5)
    axes[1].axhline(0, color="#ccc", lw=0.5)
    axes[1].set_title("Green's function $G(\\tau)$ = impulse response\n"
                      "$G$ satisfies the SHO equation", fontsize=9)
    axes[1].set_xlabel("$\\tau = t - t'$"); axes[1].set_ylabel("$G(\\tau)$")
    for ax in axes:
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
    fig.text(0.5, 0.01, "These are the same object. The string IS G.", ha="center",
             fontsize=10, weight="bold", color=INK)
    plt.tight_layout(rect=[0, 0.08, 1, 1])
    save(fig, "FS1_sho_string")


def fs2_yukawa_vs_coulomb():
    """FS2 — Yukawa (nuclear) vs Coulomb (EM) propagators."""
    fig, ax = plt.subplots(figsize=(5.5, 3.5))
    r = np.linspace(0.01, 5, 500)
    m_pi = 1.0  # normalised
    yukawa = np.exp(-m_pi * r) / r
    coulomb = 1.0 / r
    ax.semilogy(r, yukawa, color=ACCENT, lw=1.5, label=r"Yukawa: $e^{-m_\pi r}/r$ (nuclear, Scale 2)")
    ax.semilogy(r, coulomb, color=WARM, lw=1.5, ls="--", label=r"Coulomb: $1/r$ (EM, Scale 3)")
    ax.axvline(1.0 / m_pi, color=ACCENT, lw=0.7, ls=":", alpha=0.6)
    ax.text(1.0 / m_pi + 0.1, 2, r"$1/m_\pi$", fontsize=8, color=ACCENT)
    ax.set_xlabel(r"distance $r$ (normalised)"); ax.set_ylabel(r"$G(r)$")
    ax.legend(fontsize=8, frameon=False)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("Scale 2→3: massive→massless propagator\n"
                 "Same equation; $k=m_\\pi$ (Yukawa) vs $k=0$ (Coulomb)", fontsize=9)
    save(fig, "FS2_yukawa_vs_coulomb")


def fs3_four_one_over_r():
    """FS3 — 1/r appears at four different scales (same G, different substrate)."""
    fig, axes = plt.subplots(1, 4, figsize=(11, 2.8))
    r = np.linspace(0.1, 5, 300)
    G = 1.0 / r
    titles = ["Electrostatic field\n(Scale 3, Å)", "Sound intensity\nvs distance\n(Scale 8, m)",
              "Seismic far-field\n(Scale 10, km)", "Gravitational\nfield (Scale 12, AU)"]
    colors_list = [ACCENT, WARM, "#4a8a4a", "#8a4a8a"]
    for ax, col, title in zip(axes, colors_list, titles):
        ax.plot(r, G, color=col, lw=1.5)
        ax.set_xticks([]); ax.set_yticks([])
        ax.set_title(title, fontsize=7.5)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
    fig.suptitle("$G(r) = 1/r$ — four substrates, one propagator\n"
                 "The equation has not changed. Only the substrate has.", fontsize=9, y=1.02)
    plt.tight_layout()
    save(fig, "FS3_four_one_over_r")


def fs4_molecular_limbic():
    """FS4 — Retinal chromophore double-well vs trauma attractor (same shape, 25 orders of magnitude apart)."""
    fig, axes = plt.subplots(1, 2, figsize=(8, 3.5))
    x = np.linspace(-1.8, 1.8, 400)
    V_mol = 4.0 * (x**2 - 1)**2  # molecular (small W)
    V_lim = 10.0 * (x**2 - 1)**2  # limbic (large W)
    axes[0].plot(x, V_mol, color=ACCENT, lw=1.8)
    axes[0].fill_between(x, V_mol, 0, where=V_mol < 1, color=ACCENT, alpha=0.15)
    axes[0].set_title("Retinal chromophore\nScale 4: $10^{-9}$ m, $W=4$ eV", fontsize=9)
    axes[0].text(-1, -1.2, "11-cis\n(dark)", ha="center", fontsize=7)
    axes[0].text(1, -1.2, "all-trans\n(light)", ha="center", fontsize=7)
    axes[1].plot(x, V_lim, color=WARM, lw=1.8)
    axes[1].fill_between(x, V_lim, 0, where=V_lim < 1, color=WARM, alpha=0.15)
    axes[1].set_title("Limbic trauma attractor\nScale 8: $10^{0}$ m, $W=10$", fontsize=9)
    axes[1].text(-1, -1.5, "trauma\nstate", ha="center", fontsize=7)
    axes[1].text(1, -1.5, "resolved\nstate", ha="center", fontsize=7)
    for ax in axes:
        ax.set_xlabel("configuration coordinate $x$")
        ax.set_ylabel("$V(x)$")
        ax.set_ylim(-3, 20)
        for s in ("top", "right"):
            ax.spines[s].set_visible(False)
    fig.suptitle("Same double-well: $V(x) = W(x^2-1)^2$ — 25 orders of magnitude apart\n"
                 "The equation has not changed. Only the substrate has.", fontsize=9)
    plt.tight_layout()
    save(fig, "FS4_molecular_limbic")


def fs6_wkb_amplitude():
    """FS6 — WKB tunnelling amplitude vs barrier height W."""
    fig, ax = plt.subplots(figsize=(5.5, 3.5))
    W = np.linspace(0.1, 15, 300)
    theta = np.exp(-8 * np.sqrt(2 * W) / 3)
    ax.semilogy(W, theta, color=ACCENT, lw=2)
    for W_mark, col in [(8, ACCENT), (10, WARM), (12, "#4a8a4a")]:
        t_mark = np.exp(-8 * np.sqrt(2 * W_mark) / 3)
        ax.plot(W_mark, t_mark, 'o', color=col, ms=7)
        ax.annotate(f"W={W_mark}: Θ≈{t_mark:.1e}", xy=(W_mark, t_mark),
                    xytext=(W_mark + 0.5, t_mark * 3), fontsize=7.5,
                    arrowprops=dict(arrowstyle='->', color='#666', lw=0.8))
    ax.axhline(0, color="#ccc", lw=0.4)
    ax.set_xlabel("barrier height $W$")
    ax.set_ylabel(r"$\Theta(W) = \exp(-8\sqrt{2W}/3)$")
    ax.set_title("WKB tunnelling amplitude (QUANT-EXP-1 barrier sweep)\n"
                 "Classical rate = 0. Quantum rate = Θ > 0 always.", fontsize=9)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    save(fig, "FS6_wkb_amplitude")


def fs8_arnold_tongue():
    """FS8 — Arnold tongue for two coupled oscillators (Huygens locking)."""
    fig, ax = plt.subplots(figsize=(5.5, 4))
    kappa = np.linspace(0, 1.5, 300)
    delta_omega = np.linspace(-2, 2, 300)
    K, D = np.meshgrid(kappa, delta_omega)
    locked = np.abs(D) < K
    ax.contourf(K, D, locked.astype(float), levels=[0.5, 1.5],
                colors=[ACCENT], alpha=0.35)
    ax.contour(K, D, locked.astype(float), levels=[0.5],
               colors=[ACCENT], linewidths=1.5)
    ax.axhline(0, color="#888", lw=0.5, ls="--")
    ax.set_xlabel(r"coupling strength $\kappa = |G_{AB}|$")
    ax.set_ylabel(r"frequency detuning $\Delta\omega$")
    ax.text(0.8, 0.0, "LOCKED\n(rapport)", ha="center", va="center",
            fontsize=9, color=ACCENT, weight="bold")
    ax.text(0.2, 1.2, "unlocked", ha="center", fontsize=8, color="#888")
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("Arnold tongue: Huygens frequency locking\n"
                 "Rapport = two soma-fields locked inside the tongue", fontsize=9)
    save(fig, "FS8_arnold_tongue")


def fs_softmax_demo():
    """FSx — Correspondence demo: softmax collapses to sign as β→∞."""
    fig, ax = plt.subplots(figsize=(5.5, 3.5))
    betas = [0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 50.0]
    pos_probs = [np.exp(b * 1.0) / (np.exp(b * 1.0) + np.exp(b * (-1.0))) for b in betas]
    ax.plot(betas, pos_probs, 'o-', color=ACCENT, lw=1.5, ms=6)
    ax.axhline(1.0, color=WARM, lw=0.8, ls="--", label="classical sign(+1) = 1")
    ax.axhline(0.5, color="#999", lw=0.8, ls=":", label="uniform (β=0)")
    ax.set_xscale("log")
    ax.set_xlabel(r"inverse temperature $\beta$ (log scale)")
    ax.set_ylabel(r"softmax$(+1)$")
    ax.set_ylim(0.45, 1.05)
    ax.legend(fontsize=8, frameon=False)
    for s in ("top", "right"):
        ax.spines[s].set_visible(False)
    ax.set_title("Correspondence Principle: softmax → sign as β → ∞\n"
                 "Modern HN (2020) → Classical HN (1982) as $\\Phi_{\\text{limbic}} \\to 0$",
                 fontsize=9)
    save(fig, "FSx_softmax_correspondence")


# ============================================================
# REAL ATLAS FIGURES (30 generated figures, no grey boxes)
# ============================================================

def real_11d_body_schematic():
    fig, ax = plt.subplots(figsize=(8, 3.5))
    ax.set_xlim(0, 11); ax.set_ylim(0, 3); ax.axis("off")
    blocks = [
        (0.05, 0.25, "D₁–D₄\n4D Spacetime\n(body in world)", ACCENT),
        (0.35, 0.20, "D₅–D₇\n3D Propagator\n(CEMI / EMF)", "#4a8a4a"),
        (0.58, 0.10, "D₈\n1D Limbic\n(barrier)", WARM),
        (0.72, 0.20, "D₉–D₁₁\n3D Cortex\n(mind matrix)", "#8a4a8a"),
    ]
    for (x0, w, label, col) in blocks:
        rect = plt.Rectangle((x0 * 11, 0.5), w * 11, 2,
                              facecolor=col, alpha=0.25, edgecolor=col, lw=2)
        ax.add_patch(rect)
        ax.text(x0 * 11 + w * 5.5, 1.5, label, ha="center", va="center",
                fontsize=8.5, color=col)
    ax.text(5.5, 0.1, "4 + 3 + 1 + 3 = 11 dimensions   —   invisible but not hidden",
            ha="center", fontsize=10, weight="bold", color=INK)
    ax.set_title("The 11D Soma-Field: four functional subspaces, all detectable", fontsize=10)
    _save_real(fig, "11d-body-schematic")

def real_hv_two_branes():
    fig, ax = plt.subplots(figsize=(7, 3.5))
    ax.set_xlim(0, 10); ax.set_ylim(0, 4); ax.axis("off")
    for x, label, col in [(1.5, "Person A\n(Brane 1)", ACCENT), (8.5, "Person B\n(Brane 2)", ACCENT)]:
        rect = plt.Rectangle((x-0.8, 0.5), 1.6, 3, facecolor=col, alpha=0.2, edgecolor=col, lw=2)
        ax.add_patch(rect)
        ax.text(x, 2, label, ha="center", va="center", fontsize=9, color=col)
    rect2 = plt.Rectangle((2.8, 0.8), 4.4, 2.4, facecolor=WARM, alpha=0.1, edgecolor=WARM, lw=1.5, ls="--")
    ax.add_patch(rect2)
    ax.text(5, 2, "Shared Limbic Corridor\n$D_8$ orbifold\n$G_{AB}(\\omega)$", ha="center", va="center", fontsize=9, color=WARM)
    ax.text(5, 0.2, "Off-diagonal coupling = empathy / rapport", ha="center", fontsize=9, style="italic")
    ax.set_title("Horava-Witten two-brane: two people, one shared corridor", fontsize=10)
    _save_real(fig, "hv-two-branes")

def real_hydrogen_atom_s3():
    fig, ax = plt.subplots(figsize=(4, 4))
    ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_aspect("equal"); ax.axis("off")
    nucleus = Circle((0,0), 0.12, color=WARM, zorder=5)
    ax.add_patch(nucleus)
    ax.text(0.2, 0.15, "p⁺", fontsize=8, color=WARM)
    x = np.linspace(-3,3,200); X,Y = np.meshgrid(x,x); R = np.sqrt(X**2+Y**2)
    cloud = np.exp(-R**2/0.8)
    ax.contourf(X, Y, cloud, levels=20, cmap="Blues", alpha=0.6)
    ax.set_title("Hydrogen 1s orbital\n$G_{EM}(r)=e^{ikr}/4\\pi r$\nThe cloud IS G(x,x')", fontsize=9)
    _save_real(fig, "hydrogen-atom-s3")

def real_hydrogen_orbitals_s3():
    fig, axes = plt.subplots(1,4,figsize=(10,3))
    x=np.linspace(-3,3,200); X,Y=np.meshgrid(x,x); R=np.sqrt(X**2+Y**2); PHI=np.arctan2(Y,X)
    orbitals = [(np.exp(-R),"1s","s-type"),(R*np.exp(-R/2),"2s","1 node"),
                (R*np.exp(-R/2)*np.cos(PHI),"2p","p-type"),(R**2*np.exp(-R/3)*(3*np.cos(PHI)**2-1),"3d","d-type")]
    for ax,(orb,name,note) in zip(axes,orbitals):
        ax.contourf(X,Y,orb**2,levels=15,cmap="plasma",alpha=0.85)
        ax.set_title(f"{name}\n{note}",fontsize=8); ax.set_xticks([]); ax.set_yticks([]); ax.set_aspect("equal")
    fig.suptitle("Hydrogen orbitals = eigenmodes of $G_{Coulomb}$\nEach shape = G at different boundary conditions",fontsize=9)
    _save_real(fig, "hydrogen-orbitals-s3")

def real_hydrogen_spectrum_s3():
    fig,ax = plt.subplots(figsize=(8,2))
    wavelengths=[656.3,486.1,434.0,410.2,397.0]; names=["Hα","Hβ","Hγ","Hδ","Hε"]
    colors_s=["#e00000","#00a0e0","#6000c0","#4000a0","#3000a0"]
    ax.set_xlim(380,700); ax.set_ylim(0,1); ax.axis("off"); ax.set_facecolor("black"); fig.patch.set_facecolor("black")
    for lam,col,name in zip(wavelengths,colors_s,names):
        ax.axvline(lam,color=col,lw=3,alpha=0.9)
        ax.text(lam,0.85,f"{lam:.1f}nm\n{name}",ha="center",fontsize=7,color=col)
    ax.text(540,0.35,"Balmer series — eigenvalue spectrum of $G_{Coulomb}$",ha="center",fontsize=9,color="white")
    _save_real(fig, "hydrogen-spectrum-s3")

def real_nuclear_binding_energy_s2():
    Z=[1,2,4,6,8,12,16,20,26,28,36,50,82,92]
    BE=[0,7.07,6.46,7.68,7.98,8.26,8.49,8.55,8.79,8.78,8.61,8.52,7.87,7.59]
    fig,ax=plt.subplots(figsize=(8,3.5))
    ax.plot(Z,BE,'o-',color=ACCENT,lw=1.5,ms=5); ax.fill_between(Z,BE,0,alpha=0.15,color=ACCENT)
    ax.axvline(26,color=WARM,lw=1,ls="--",alpha=0.7); ax.text(27,8,"Fe-56\npeak",fontsize=8,color=WARM)
    ax.set_xlabel("Atomic number Z"); ax.set_ylabel("Binding energy / nucleon (MeV)")
    ax.set_title("Nuclear binding energy = eigenvalue spectrum of $G_{Yukawa}$\nMind matrix of Scale 2: which nuclear configurations persist",fontsize=9)
    for s in ("top","right"): ax.spines[s].set_visible(False)
    _save_real(fig, "nuclear-binding-energy-s2")

def real_periodic_table_s2():
    fig,ax=plt.subplots(figsize=(12,5)); ax.set_xlim(-0.5,18.5); ax.set_ylim(-0.5,7.5); ax.axis("off")
    period_row={1:0,2:0,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:2,12:2,13:2,14:2,15:2,16:2,17:2,18:2,
                19:3,20:3,21:3,22:3,23:3,24:3,25:3,26:3,27:3,28:3,29:3,30:3,31:3,32:3,33:3,34:3,35:3,36:3}
    period_col={1:0,2:17,3:0,4:1,5:12,6:13,7:14,8:15,9:16,10:17,11:0,12:1,13:12,14:13,15:14,16:15,17:16,18:17,
                19:0,20:1,21:2,22:3,23:4,24:5,25:6,26:7,27:8,28:9,29:10,30:11,31:12,32:13,33:14,34:15,35:16,36:17}
    for Z in range(1,37):
        if Z not in period_row: continue
        row=period_row[Z]; col_pos=period_col[Z]
        color=plt.cm.plasma(Z/36)
        rect=plt.Rectangle((col_pos-0.45,6.5-row-0.45),0.9,0.9,facecolor=color,alpha=0.75,edgecolor="white",lw=0.5)
        ax.add_patch(rect); ax.text(col_pos,6.5-row,str(Z),ha="center",va="center",fontsize=7,color="white")
    ax.text(9,-0.3,"Periodic table (Z=1–36) — each element = a stable Yukawa attractor at Scale 2",ha="center",fontsize=10)
    ax.set_title("All chemical diversity emerges from Scale-2 nuclear combinatorics",fontsize=10)
    _save_real(fig, "periodic-table-s2")

def real_periodic_table_energy_s3():
    IE=[13.6,24.6,5.4,9.3,8.3,11.3,14.5,13.6,17.4,21.6,5.1,7.6,6.0,8.2,10.5,10.4,13.0,15.8,
        4.3,6.1,6.5,6.8,6.7,6.8,7.4,7.9,7.9,7.6,7.7,9.4,6.0,7.9,9.8,9.8,11.8,14.0]
    Z=list(range(1,37))
    fig,ax=plt.subplots(figsize=(9,3.5))
    colors_ie=[plt.cm.plasma(ie/25) for ie in IE]
    ax.bar(Z,IE,color=colors_ie,alpha=0.8,edgecolor="white",lw=0.3)
    for z,ie,name in [(2,24.6,"He"),(10,21.6,"Ne"),(18,15.8,"Ar"),(36,14.0,"Kr")]:
        ax.text(z,ie+0.3,name,ha="center",fontsize=7,color=WARM)
    ax.set_xlabel("Atomic number Z"); ax.set_ylabel("Ionization energy (eV)")
    ax.set_title("Ionization energy = barrier height of the atomic attractor\nNoble gases: deepest wells. Alkali metals: shallowest.",fontsize=9)
    for s in ("top","right"): ax.spines[s].set_visible(False)
    _save_real(fig, "periodic-table-energy-s3")

def real_proton_quarks_s2():
    fig,ax=plt.subplots(figsize=(4.5,4.5)); ax.set_xlim(-2.5,2.5); ax.set_ylim(-2.5,2.5); ax.set_aspect("equal"); ax.axis("off")
    for angle,qname,qcol in [(90,"u","#e04040"),(210,"u","#40a040"),(330,"d","#4040e0")]:
        rad=np.radians(angle); x_q,y_q=1.4*np.cos(rad),1.4*np.sin(rad)
        ax.plot([0,x_q*0.65],[0,y_q*0.65],color=MUTED,lw=2.5,zorder=2)
        quark=Circle((x_q,y_q),0.35,color=qcol,zorder=5,alpha=0.9); ax.add_patch(quark)
        ax.text(x_q,y_q,qname,ha="center",va="center",fontsize=10,color="white",weight="bold")
    ax.set_title("Proton: uud quarks + gluon flux tubes\n$G_{Yukawa}$ = confinement prevents isolation",fontsize=9)
    _save_real(fig, "proton-quarks-s2")

def real_quantum_foam_s0():
    fig,ax=plt.subplots(figsize=(6,3.5))
    rng=np.random.default_rng(42); x=np.linspace(0,10,300); y=np.linspace(0,5,200); X,Y=np.meshgrid(x,y)
    foam=sum(rng.normal(0,1,X.shape)*np.exp(-((X-rng.uniform(0,10))**2+(Y-rng.uniform(0,5))**2)/rng.uniform(0.1,0.5)) for _ in range(40))
    ax.contourf(X,Y,foam,levels=30,cmap="twilight_shifted",alpha=0.9); ax.set_xticks([]); ax.set_yticks([])
    ax.set_title("Quantum foam — Scale 0 ($10^{-35}$ m)\nSpacetime geometry fluctuates: G = prob. amplitude for geometry at x'",fontsize=9)
    _save_real(fig, "quantum-foam-s0"); _save_real(fig, "quantum-foam")

def real_path_integral_s0():
    fig,ax=plt.subplots(figsize=(6,4)); ax.set_xlim(-0.5,10.5); ax.set_ylim(-3,3); ax.axis("off")
    ax.plot(0,0,'o',color=WARM,ms=10,zorder=5); ax.plot(10,0,'o',color=ACCENT,ms=10,zorder=5)
    ax.text(-0.3,0,"$x'$\n(source)",ha="right",fontsize=9,color=WARM)
    ax.text(10.3,0,"$x$\n(obs.)",ha="left",fontsize=9,color=ACCENT)
    rng=np.random.default_rng(0); t=np.linspace(0,10,100)
    for i in range(15):
        amp=rng.uniform(0.3,2.5); freq=rng.uniform(0.5,3)
        path=amp*np.sin(freq*np.pi*t/10)*np.sin(np.pi*t/10)
        ax.plot(t,path,color=ACCENT if i==0 else MUTED,lw=2.0 if i==0 else 0.8,alpha=0.8 if i==0 else 0.25)
    ax.text(5,-2.6,"G(x,x') = sum over all paths. The string IS G.",ha="center",fontsize=9,style="italic")
    ax.set_title("Feynman path integral: between $x'$ and $x$, all paths contribute",fontsize=9)
    _save_real(fig, "path-integral-s0")

def real_soap_bubble_foam_comparison_s0():
    fig,axes=plt.subplots(1,2,figsize=(9,3.5))
    x=np.linspace(-3,3,300); X,Y=np.meshgrid(x,x); R=np.sqrt(X**2+Y**2)
    rings=np.cos(8*R**2)
    axes[0].contourf(X,Y,rings,levels=20,cmap="RdYlBu",alpha=0.9)
    axes[0].set_title("Newton's rings (soap film)\n$10^{-8}$ m — EM interference",fontsize=8.5)
    axes[0].set_xticks([]); axes[0].set_yticks([])
    rng=np.random.default_rng(7)
    foam=sum(rng.normal()*np.cos(rng.uniform(3,15)*X+rng.uniform(3,15)*Y) for _ in range(20))
    axes[1].contourf(X,Y,foam,levels=20,cmap="RdYlBu",alpha=0.9)
    axes[1].set_title("Quantum foam interference\n$10^{-35}$ m — gravitational amplitude",fontsize=8.5)
    axes[1].set_xticks([]); axes[1].set_yticks([])
    fig.suptitle("Same interference pattern, 27 orders of magnitude apart.\nThe equation has not changed. Only the substrate has.",fontsize=9)
    _save_real(fig, "soap-bubble-foam-comparison-s0")

def real_soap_bubbles():
    fig,ax=plt.subplots(figsize=(5,4)); ax.set_xlim(-3,3); ax.set_ylim(-2,2.5); ax.set_aspect("equal"); ax.axis("off")
    c1=Circle((-1,0),1.4,facecolor=ACCENT,alpha=0.25,edgecolor=ACCENT,lw=2); ax.add_patch(c1)
    c2=Circle((1,0),1.4,facecolor=WARM,alpha=0.25,edgecolor=WARM,lw=2); ax.add_patch(c2)
    ax.axvline(0,color="#888",lw=1.5,ls="--",ymin=0.22,ymax=0.78)
    ax.text(-1,0,"Person A\n$G_{AA}$",ha="center",fontsize=9,color=ACCENT)
    ax.text(1,0,"Person B\n$G_{BB}$",ha="center",fontsize=9,color=WARM)
    ax.text(0,1.7,"Shared\nboundary\n$G_{AB}$",ha="center",fontsize=9,color="#666")
    ax.set_title("Two soma-fields touching:\nthe shared boundary IS the relational field",fontsize=9)
    _save_real(fig, "soap-bubbles")

def real_branching_tree_s0():
    fig,ax=plt.subplots(figsize=(6,4)); ax.set_xlim(-1,9); ax.set_ylim(-0.5,6); ax.axis("off")
    def draw_tree(x,y,angle,depth,length=1.0):
        if depth==0: return
        x2=x+length*np.cos(np.radians(angle)); y2=y+length*np.sin(np.radians(angle))
        ax.plot([x,x2],[y,y2],color=plt.cm.plasma(depth/5),lw=max(0.5,depth*0.4),alpha=0.8)
        spread=30/depth
        draw_tree(x2,y2,angle+spread,depth-1,length*0.7); draw_tree(x2,y2,angle-spread,depth-1,length*0.7)
    draw_tree(4,0,90,5,1.2)
    ax.text(4,-0.3,"Each branch = a possible universe at Scale 0",ha="center",fontsize=8.5,style="italic")
    ax.set_title("Quantum branching tree — mind matrix at Scale 0: $N=\\infty$",fontsize=9)
    _save_real(fig, "branching-tree-s0")

def real_speaker_room_greens():
    fig,ax=plt.subplots(figsize=(7,4)); ax.set_xlim(0,10); ax.set_ylim(0,6); ax.axis("off")
    room=plt.Rectangle((0.5,0.5),9,5,fill=False,edgecolor=INK,lw=2); ax.add_patch(room)
    ax.annotate("",xy=(1.5,3),xytext=(0.8,3),arrowprops=dict(arrowstyle="->",color=ACCENT,lw=2))
    ax.text(0.5,3.3,"Speaker\n(source)",fontsize=8,color=ACCENT,ha="center")
    theta=np.linspace(0,2*np.pi,100)
    for r in [0.8,1.5,2.2,2.9,3.6]:
        xc=1.5+r*np.cos(theta); yc=3+r*np.sin(theta)
        mask=(xc>0.5)&(xc<9.5)&(yc>0.5)&(yc<5.5)
        ax.plot(xc[mask],yc[mask],color=ACCENT,lw=0.8,alpha=0.5)
    ax.plot(8.5,3,'o',color=WARM,ms=12); ax.text(8.5,3.5,"Listener\n$G(x,x')$",ha="center",fontsize=8,color=WARM)
    ax.text(5,0.2,"G = room impulse response: what the listener hears given a click at the speaker",ha="center",fontsize=8.5,style="italic")
    ax.set_title("The Green's function is the field's answer to a unit impulse",fontsize=10)
    _save_real(fig, "speaker-room-greens")

def real_m_theory_web_s1():
    fig,ax=plt.subplots(figsize=(6,6)); ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_aspect("equal"); ax.axis("off")
    theories=["Type I","Type IIA","Type IIB","HE","HO"]
    angles=np.linspace(90,90+360,6)[:-1]; positions=[(1.8*np.cos(np.radians(a)),1.8*np.sin(np.radians(a))) for a in angles]
    m=Circle((0,0),0.6,facecolor=ACCENT,alpha=0.8,zorder=5); ax.add_patch(m)
    ax.text(0,0,"M-theory\n(11D)",ha="center",va="center",fontsize=9,color="white",weight="bold")
    for (x,y),name in zip(positions,theories):
        c=Circle((x,y),0.55,facecolor=plt.cm.plasma(theories.index(name)/5),alpha=0.7,zorder=4); ax.add_patch(c)
        ax.text(x,y,name,ha="center",va="center",fontsize=7.5,color="white")
        ax.plot([0,x*0.65],[0,y*0.65],color=MUTED,lw=1,zorder=3)
    ax.set_title("M-theory unification: five string theories = one theory\nThe string's SHO = the worldsheet Green's function G",fontsize=9)
    _save_real(fig, "m-theory-web-s1")

def real_coupling_matrix():
    fig,ax=plt.subplots(figsize=(5.5,4.5))
    matrix=np.array([[0.9,0.9,0.3,0.2],[0.9,0.9,0.2,0.3],[0.3,0.2,0.9,0.9],[0.2,0.3,0.9,0.9]])
    im=ax.imshow(matrix,cmap="Blues",vmin=0,vmax=1); plt.colorbar(im,ax=ax,fraction=0.046,label="|G|")
    ax.set_xticks(range(4)); ax.set_yticks(range(4)); ax.set_xticklabels(["A₁","A₂","B₁","B₂"]); ax.set_yticklabels(["A₁","A₂","B₁","B₂"])
    for(x0,y0,w,h,lbl) in [(-0.5,-0.5,2,2,"$G_{AA}$"),(1.5,-0.5,2,2,"$G_{BB}$"),(-0.5,1.5,2,2,"$G_{AB}$\nempathy"),(1.5,1.5,2,2,"$G_{BA}$\nempathy")]:
        rect=plt.Rectangle((x0,y0),w,h,fill=False,edgecolor=WARM if "empathy" in lbl else ACCENT,lw=2,ls="--" if "empathy" in lbl else "-"); ax.add_patch(rect)
    ax.set_title("$G_{AB}(\\omega)$: off-diagonal coupling = empathic resonance",fontsize=9)
    _save_real(fig, "coupling-matrix")

def real_crowd_entrainment():
    fig,axes=plt.subplots(1,2,figsize=(9,3.5),sharey=True); t=np.linspace(0,60,500); rng=np.random.default_rng(1)
    for i in range(6):
        axes[0].plot(t,np.sin(2*np.pi*rng.uniform(0.9,1.1)*t+rng.uniform(0,2*np.pi)),alpha=0.4,color=plt.cm.Set2(i/7),lw=0.8)
        axes[1].plot(t,np.sin(2*np.pi*(1+rng.uniform(-0.05,0.05))*t),alpha=0.7,color=plt.cm.Set2(i/7),lw=1.0)
    for ax,title in zip(axes,["Before music: r=0.12 (uncoupled)","After 90 min: r=0.71 (locked)"]):
        ax.set_title(title,fontsize=9); ax.set_xlabel("time (s)"); ax.set_yticks([])
        for s in ("top","right"): ax.spines[s].set_visible(False)
    fig.suptitle("Crowd entrainment: heart rate phase locking\nMusic = forcing function on shared $G_{AB}$",fontsize=9)
    _save_real(fig, "crowd-entrainment")

def real_friendship_coupling():
    fig,ax=plt.subplots(figsize=(6,3.5))
    stages=["Strangers","Acquaintances","Friends","Close"]; G=[0.02,0.15,0.45,0.75]; tw=[0.1,0.4,0.9,1.5]
    ax.bar(stages,G,color=[MUTED,"#6090c0",ACCENT,"#0a2a6a"],alpha=0.8,width=0.5)
    ax2=ax.twinx(); ax2.plot(stages,tw,'o--',color=WARM,ms=8,lw=1.5)
    ax2.set_ylabel("Arnold tongue width",color=WARM); ax.set_ylabel("$|G_{AB}|$")
    ax.set_title("Friendship as persistent off-diagonal coupling\nMore history → wider Arnold tongue → easier rapport",fontsize=9)
    for s in ("top",): ax.spines[s].set_visible(False)
    _save_real(fig, "friendship-coupling")

def real_therapy_coupling():
    fig,axes=plt.subplots(1,3,figsize=(10,3.5)); x=np.linspace(-1.8,1.8,300)
    for ax,W,title,col in zip(axes,[12,0.5,7],["Client alone\nW=12","Therapist alone\nW=0.5","Coupled\n$W_{eff}$=7"],[WARM,ACCENT,"#4a8a4a"]):
        V=W*(x**2-1)**2; ax.plot(x,V,color=col,lw=2); ax.fill_between(x,V,0,where=V<1.5,alpha=0.15,color=col)
        ax.set_ylim(-2,20); ax.set_title(title,fontsize=8.5); ax.set_xlabel("$x$"); ax.set_yticks([])
        for s in ("top","right"): ax.spines[s].set_visible(False)
    fig.suptitle("Therapy: coupling lowers the effective barrier $W_{eff}=W(1-\\alpha|G_{TC}|^2)$",fontsize=9)
    _save_real(fig, "therapy-coupling")

def real_neurodivergent_parameter_space():
    fig,ax=plt.subplots(figsize=(6,5)); ax.set_xlim(0,3); ax.set_ylim(0,15)
    ax.set_xlabel("Inverse temperature $\\beta$"); ax.set_ylabel("Barrier height $W$")
    for(beta,W,name,col,marker) in [(0.3,2,"ADHD\n(hot)",WARM,"^"),(1.0,4,"Neurotypical",ACCENT,"o"),(2.2,3,"ASC\n(cold)","#4a6a9a","s"),(1.5,12,"C-PTSD\nW=12","#8a2a2a","D")]:
        ax.plot(beta,W,marker,ms=14,color=col,alpha=0.85)
        ax.annotate(name,(beta,W),textcoords="offset points",xytext=(12,5),fontsize=8,color=col)
    ax.set_title("Neurodivergent profiles in $(\\beta,W)$ parameter space",fontsize=9)
    for s in ("top","right"): ax.spines[s].set_visible(False)
    _save_real(fig, "neurodivergent-parameter-space")

def real_glarus_thrust():
    fig,ax=plt.subplots(figsize=(9,4)); ax.set_xlim(0,10); ax.set_ylim(-1,5); ax.axis("off")
    ax.add_patch(plt.Polygon([(0,2),(10,3.5),(10,5),(0,4)],facecolor="#c08050",alpha=0.8,edgecolor="#805030",lw=1.5))
    ax.text(5,3.5,"Verrucano sandstone — 250 million years old",ha="center",fontsize=9,color="white",weight="bold")
    ax.add_patch(plt.Polygon([(0,-1),(10,-1),(10,2.5),(0,1.5)],facecolor="#7090b0",alpha=0.8,edgecolor="#4060a0",lw=1.5))
    ax.text(5,0.7,"Eocene flysch — 35 million years old",ha="center",fontsize=9,color="white",weight="bold")
    ax.plot([0,10],[1.5,2.5],color=WARM,lw=3,zorder=5)
    ax.text(10.1,2.0,"Glarus Thrust\n(overthrust plane)",fontsize=8.5,va="center",color=WARM)
    ax.set_title("Glarus Overthrust: 250 Ma rock on 35 Ma rock\nRock moved 35 km — a wave with a 10-million-year period",fontsize=9)
    _save_real(fig, "glarus-thrust")

def real_thames_waveguide():
    fig,ax=plt.subplots(figsize=(9,3.5)); ax.set_xlim(0,10); ax.set_ylim(-1,4); ax.axis("off")
    x=np.linspace(0,10,200); rng=np.random.default_rng(1)
    y_n=2.5+0.8*np.sin(np.pi*x/10)+0.2*rng.normal(0,1,200)
    y_s=0.2-0.4*np.sin(np.pi*x/10)+0.15*rng.normal(0,1,200)
    ax.fill_between(x,y_n,4,color="#c8a060",alpha=0.8); ax.fill_between(x,-1,y_s,color="#c8a060",alpha=0.8)
    ax.fill_between(x,y_s,y_n,color="#a0c8e8",alpha=0.5)
    for x0 in [2,4,6,8]:
        ax.annotate("",xy=(x0+0.8,1.3),xytext=(x0,1.3),arrowprops=dict(arrowstyle="->",color=ACCENT,lw=1.5))
    ax.text(5,1.3,"Wave propagation →\n(Estuary English / parakeets)",ha="center",va="center",fontsize=8.5,color=ACCENT)
    ax.text(5,3.5,"Chilterns (north wall)",ha="center",fontsize=8,color="#805030")
    ax.text(5,-0.7,"North Downs (south wall)",ha="center",fontsize=8,color="#805030")
    ax.set_title("Thames Valley as geographic wave-guide\nBoundary conditions channel pattern propagation",fontsize=9)
    _save_real(fig, "thames-waveguide")

def real_earth_cross_section():
    fig,ax=plt.subplots(figsize=(5,5)); ax.set_xlim(-3,3); ax.set_ylim(-3,3); ax.set_aspect("equal"); ax.axis("off")
    for r,col,label in [(2.8,"#c8a060","Crust"),(2.2,"#d0804a","Mantle"),(1.3,"#e06020","Outer core"),(0.6,"#f08020","Inner core")]:
        ax.add_patch(Circle((0,0),r,facecolor=col,edgecolor="white",lw=0.8,alpha=0.9))
        ax.text(r*0.65,r*0.65,label,ha="center",fontsize=7,color="white",rotation=45)
    ax.set_title("Earth interior (Scale 11–12)\nMantle convection = $G_{seismic}$ slow wave",fontsize=9)
    _save_real(fig, "earth-cross-section")

def real_milky_way_edge_on():
    fig,ax=plt.subplots(figsize=(9,3)); ax.set_facecolor("#050510"); fig.patch.set_facecolor("#050510"); ax.axis("off")
    rng=np.random.default_rng(42)
    for _ in range(3000):
        xi=rng.uniform(-5,5); yi=rng.normal(0,0.15*np.exp(-abs(xi)/2.5)); b=rng.uniform(0.3,1.0)*np.exp(-abs(xi)/2.5)
        ax.plot(xi,yi,'.',color=(b,b*0.9,b*0.7),ms=rng.uniform(0.5,1.5),alpha=0.6)
    ax.set_xlim(-5,5); ax.set_ylim(-1.5,1.5)
    ax.text(0,-1.2,"The Milky Way — spiral arms = resonant modes of galactic $G$\n$N=10^{11}$ stars: mind matrix of Scale 15–16",ha="center",fontsize=8.5,color="white")
    _save_real(fig, "milky-way-edge-on")

def real_cosmic_web():
    fig,ax=plt.subplots(figsize=(6,6)); ax.set_aspect("equal"); ax.set_facecolor("#02020a"); fig.patch.set_facecolor("#02020a"); ax.axis("off")
    rng=np.random.default_rng(99); n=2000; x=rng.uniform(0,1,n); y=rng.uniform(0,1,n)
    for _ in range(20):
        cx,cy=rng.uniform(0,1,2); angle=rng.uniform(0,np.pi); t=np.linspace(-0.3,0.3,50)
        fx=cx+t*np.cos(angle)+rng.normal(0,0.02,50); fy=cy+t*np.sin(angle)+rng.normal(0,0.02,50)
        ax.plot(fx%1,fy%1,'-',color=(0.6,0.7,1.0),lw=0.5,alpha=0.3)
    ax.scatter(x,y,s=0.3,color=(0.8,0.9,1.0),alpha=0.4)
    ax.set_title("Cosmic web — Scale 18–20\nSame G structure as the neural network of a brain",fontsize=9,color="white")
    _save_real(fig, "cosmic-web")

def real_six_greens_functions():
    fig,axes=plt.subplots(2,3,figsize=(10,6)); r=np.linspace(0.05,3,200)
    titles=["Electrostatics\n$G=1/r$\nScale 3","Acoustics\n$G=e^{ikr}/r$\nScale 8","Seismology\n$G=e^{-\\gamma r}/r$\nScale 10",
            "Nuclear\n$G=e^{-mr}/r$\nScale 2","Cortex/CEMI\n$G=e^{-r/\\lambda}$\nScale 6","Gravity\n$G=1/r$\nScale 12–20"]
    fns=[1/r,np.cos(3*r)/r,np.exp(-0.3*r)/r,np.exp(-r)/r,np.exp(-r/0.5),1/r]
    cols=[ACCENT,WARM,"#4a8a4a","#8a4a8a","#8a8a2a","#2a6a8a"]
    for ax,fn,title,col in zip(axes.flat,fns,titles,cols):
        ax.plot(r,np.clip(fn,-3,10),color=col,lw=1.5); ax.set_title(title,fontsize=7.5)
        ax.set_xlabel("$r$"); ax.set_yticks([]); ax.set_ylim(-0.5,8)
        for s in ("top","right"): ax.spines[s].set_visible(False)
    fig.suptitle("Six G(x,x') contexts — $(\\nabla^2+k^2)G=\\delta$ with different $k$",fontsize=9)
    plt.tight_layout()
    _save_real(fig, "six-greens-functions")

def real_invariant_equation_all_scales():
    fig=plt.figure(figsize=(12,3)); ax_eq=fig.add_axes([0,0.55,1,0.45]); ax_eq.axis("off")
    ax_eq.text(0.5,0.5,r"$(\nabla^2 + k^2)\, G(x, x') = \delta(x - x')$",ha="center",va="center",fontsize=22,transform=ax_eq.transAxes)
    ax_eq.text(0.5,0.05,"The same equation at every scale — only $k$ and the substrate change.",ha="center",fontsize=10,transform=ax_eq.transAxes,style="italic")
    ax_bar=fig.add_axes([0.02,0.05,0.96,0.4]); ax_bar.axis("off")
    colors_inv=plt.cm.plasma(np.linspace(0.1,0.95,20))
    labels_inv=["0\nQFoam","1\nString","2\nNucl","3\nAtom","4\nMol","5\nCell","6\nBrain","7\nSwarm","8\nBody","9\nCity",
                "10\nGeo","11\nPlanet","12\nOrbit","13\nStar","14\nCluster","15\nGalArm","16\nGal","17\nLocal","18\nWeb","19\nUniv"]
    for i,(col,lbl) in enumerate(zip(colors_inv,labels_inv)):
        x=0.025+i*0.048
        ax_bar.add_patch(plt.Rectangle((x,0.1),0.04,0.8,transform=ax_bar.transAxes,facecolor=col,alpha=0.85))
        ax_bar.text(x+0.02,-0.05,lbl,ha="center",fontsize=5.5,transform=ax_bar.transAxes,va="top")
    _save_real(fig, "invariant-equation-all-scales")

def real_guitar_impulse():
    fig,axes=plt.subplots(1,2,figsize=(9,3)); t=np.linspace(0,10,1000)
    axes[0].plot(t,np.zeros_like(t),color=MUTED,lw=1.5); axes[0].set_title("Field before 2:49",fontsize=9); axes[0].set_ylim(-2,2)
    response=np.exp(-0.8*(t-2.49))*np.cos(6*(t-2.49))*(t>=2.49)
    axes[1].axvline(2.49,color=WARM,lw=1.5,ls="--",label="t=2:49")
    axes[1].plot(t,response,color=ACCENT,lw=1.5,label="$G(t)$ — field response")
    axes[1].fill_between(t,response,0,where=response>0,alpha=0.15,color=ACCENT)
    axes[1].set_title("Guitar at 2:49: δ-function probe\nField tunnels out of trauma well",fontsize=9)
    axes[1].legend(fontsize=7.5,frameon=False); axes[1].set_ylim(-2,2)
    for ax in axes: ax.set_xlabel("time (s)"); [ax.spines[s].set_visible(False) for s in ("top","right")]
    fig.suptitle("Music as δ-function probe — the guitar IS G",fontsize=9)
    _save_real(fig, "guitar-impulse")

def real_murmuration():
    fig,ax=plt.subplots(figsize=(7,5)); ax.set_facecolor("#1a1a2e"); fig.patch.set_facecolor("#1a1a2e"); ax.axis("off")
    rng=np.random.default_rng(77); n=2000; t=np.linspace(0,2*np.pi,n)
    r_base=2+0.5*np.sin(3*t); x=r_base*np.cos(t)+rng.normal(0,0.15,n); y=r_base*np.sin(t)*0.4+rng.normal(0,0.15,n)
    brightness=0.6+0.4*np.sin(2*t)
    ax.scatter(x,y,s=0.8,c=[(b,b*0.95,b*0.8) for b in brightness],alpha=0.7)
    ax.set_title("Murmuration — Scale 7: Active-matter velocity field\nNo central controller. The shape IS the Green's function.",fontsize=9,color="white")
    _save_real(fig, "murmuration"); _save_real(fig, "murmuration-scale7")


if __name__ == "__main__":
    main()
