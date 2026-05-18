"""
Figure 2 — The Perception Threshold: Field amplitude over time
Shows two emotion modes oscillating; one exceeds threshold, the other doesn't.
Produces fig2_threshold.pdf and fig2_threshold.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

t = np.linspace(0, 15, 3000)

# Mode i: stays below threshold — sub-perceptual anxiety
mode_i = 0.55 * np.sin(2 * np.pi * 0.6 * t) * np.exp(-0.03 * t) + \
         0.25 * np.cos(2 * np.pi * 1.4 * t + 0.5)

# Mode j: rises, crosses threshold, decays
env_j = np.where(t < 5, 0.0, 1.1 * (1 - np.exp(-(t - 5) / 1.2)) * np.exp(-(t - 5) / 5))
mode_j = env_j * np.sin(2 * np.pi * 0.9 * t + 1.0)

threshold = 0.80

fig, ax = plt.subplots(figsize=(9, 3.8))

ax.plot(t, mode_i, color="#2C6FAC", lw=1.2, label=r"mode $i$ (sub-perceptual)", zorder=3)
ax.plot(t, mode_j, color="#27AE60", lw=1.2, label=r"mode $j$ (rises to threshold)", zorder=3)
ax.axhline(threshold, color="#C0392B", lw=1.4, ls="--", zorder=4,
           label=r"threshold $\theta_j$")
ax.axhline(-threshold, color="#C0392B", lw=1.4, ls="--", zorder=4)
ax.fill_between(t, mode_j, threshold,
                where=(mode_j >= threshold), alpha=0.30, color="#E74C3C", zorder=2)
ax.fill_between(t, mode_j, -threshold,
                where=(mode_j <= -threshold), alpha=0.30, color="#E74C3C", zorder=2)
ax.axhline(0, color="#aaa", lw=0.6)

ax.set_xlabel("time", fontsize=10)
ax.set_ylabel(r"$|\psi_i(t)|$", fontsize=11)
ax.set_title("Threshold Gating: Only Super-Threshold Modes Enter Conscious Awareness",
             fontsize=10.5, pad=8)
ax.legend(fontsize=9, loc="upper left", framealpha=0.85)
ax.set_xlim(0, 15)
ax.set_yticks([-1, -threshold, 0, threshold, 1])
ax.set_yticklabels(["-1", r"$-\theta$", "0", r"$\theta$", "1"])
ax.tick_params(axis="x", labelbottom=False)

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"fig2_threshold.{ext}", dpi=180, bbox_inches="tight")
print("fig2 saved")
