"""
Figure 3a — The Energy Landscape (2D contour)
Four attractor basins: Calm (global minimum), Freeze (deep narrow),
Fight and Flight (shallower, high-energy).
Produces fig3a_energy_landscape.pdf and fig3a_energy_landscape.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch

x = np.linspace(-4.5, 4.5, 600)
y = np.linspace(-4.5, 4.5, 600)
X, Y = np.meshgrid(x, y)

def gaussian(X, Y, cx, cy, sx, sy, depth):
    return -depth * np.exp(-((X - cx)**2 / (2 * sx**2) + (Y - cy)**2 / (2 * sy**2)))

# Attractor centres
V = (gaussian(X, Y,  0.0,  0.0, 1.8, 1.8, 3.5)   # Calm   — wide deep
   + gaussian(X, Y, -2.8, -2.5, 0.6, 0.6, 3.0)   # Freeze — narrow deep
   + gaussian(X, Y,  2.8,  1.5, 1.0, 0.9, 1.8)   # Fight  — medium
   + gaussian(X, Y, -2.4,  2.0, 1.0, 0.9, 1.8))  # Flight — medium
# Background bowl to keep trajectories bounded
V += 0.10 * (X**2 + Y**2)

fig, ax = plt.subplots(figsize=(7, 6.5))

levels = np.linspace(V.min(), V.max() * 0.5, 28)
cf = ax.contourf(X, Y, V, levels=levels, cmap="RdYlBu_r", alpha=0.85)
cs = ax.contour(X, Y, V, levels=levels[::3], colors="k", linewidths=0.4, alpha=0.5)
cb = plt.colorbar(cf, ax=ax, fraction=0.046, pad=0.04)
cb.set_label("energy H(e)", fontsize=9)

# Label attractors
labels = [
    ( 0.0,  0.15, "Calm\n(regulated)", "#1A5276"),
    (-2.8, -2.35, "Freeze",            "#6C3483"),
    ( 2.8,  1.65, "Fight",             "#7B241C"),
    (-2.4,  2.20, "Flight",            "#784212"),
]
for lx, ly, txt, col in labels:
    ax.text(lx, ly, txt, ha="center", fontsize=9.5, color="white", weight="bold",
            bbox=dict(boxstyle="round,pad=0.2", fc=col, alpha=0.75, ec="none"))

ax.set_xlabel(r"field component $e_1$", fontsize=10)
ax.set_ylabel(r"field component $e_2$", fontsize=10)
ax.set_title("Soma-Field Energy Landscape: Four Attractor States", fontsize=11, pad=8)
ax.set_aspect("equal")
ax.tick_params(labelbottom=False, labelleft=False)

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"fig3a_energy_landscape.{ext}", dpi=180, bbox_inches="tight")
print("fig3a saved")
