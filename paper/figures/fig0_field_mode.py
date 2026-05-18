"""
Figure 0 — The Quantum Field Analogy: Virtual and Real Excitations
Illustrates continuous field oscillation with one threshold-crossing event.
Produces fig0_field_mode.pdf and fig0_field_mode.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

rng = np.random.default_rng(42)

t = np.linspace(0, 20, 4000)
# Carrier oscillation at ω_0 with smaller harmonics
signal = (0.6 * np.sin(2 * np.pi * 0.8 * t + 0.3)
          + 0.25 * np.sin(2 * np.pi * 1.9 * t + 1.1)
          + 0.18 * np.sin(2 * np.pi * 3.2 * t + 0.7))
# Add a single large excitation event at t≈11
spike_centre = 11.0
signal += 1.35 * np.exp(-((t - spike_centre) ** 2) / 0.12)

threshold = 0.90

fig, ax = plt.subplots(figsize=(9, 3.6))
ax.plot(t, signal, color="#2C6FAC", lw=1.1, zorder=3)
ax.axhline(threshold, color="#C0392B", lw=1.4, ls="--", zorder=4,
           label=r"Perception threshold $\theta$")

# Shade area above threshold
ax.fill_between(t, signal, threshold,
                where=(signal >= threshold),
                alpha=0.35, color="#E74C3C", zorder=2,
                label="Conscious percept")

# Zero line
ax.axhline(0, color="#888", lw=0.6, zorder=1)

# Annotations
ax.annotate("virtual fluctuations\n(sub-perceptual)",
            xy=(5.5, 0.55), fontsize=8.5, ha="center", color="#555",
            xytext=(5.5, 0.55))
ax.annotate("", xy=(spike_centre, 1.38), xytext=(spike_centre, threshold + 0.05),
            arrowprops=dict(arrowstyle="->", color="#C0392B", lw=1.2))
ax.text(spike_centre + 0.25, 1.28, "felt emotion\n(Green's function\npole)", fontsize=8.5,
        color="#C0392B", va="top")

ax.set_xlabel("time", fontsize=10)
ax.set_ylabel(r"field amplitude $|\psi_i(t)|$", fontsize=10)
ax.set_title("Soma-Field Mode: Sub-Perceptual Persistence and Threshold Crossing",
             fontsize=10.5, pad=8)
ax.legend(loc="upper left", fontsize=9, framealpha=0.8)
ax.set_xlim(0, 20)
ax.set_yticks([0, threshold, 1.0])
ax.set_yticklabels(["0", r"$\theta$", "1"])
ax.tick_params(axis="x", labelbottom=False)

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"fig0_field_mode.{ext}", dpi=180, bbox_inches="tight")
print("fig0 saved")
