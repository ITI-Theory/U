"""
Figure B1 — Attractor Basin Comparison (Appendix B)
Numerically integrates the gradient-descent dynamics on each landscape
and colours the plane by which attractor the trajectory reaches.
Produces figB1_attractor_basins.pdf and figB1_attractor_basins.png
"""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap

# ── Landscape gradient: 2D four-well ────────────────────────────────────────
attractor_centres = np.array([
    [ 0.0,  0.0],   # 0 Calm
    [-2.8, -2.5],   # 1 Freeze
    [ 2.8,  1.5],   # 2 Fight
    [-2.4,  2.0],   # 3 Flight
])
depths = np.array([3.5, 3.0, 1.8, 1.8])
widths = np.array([1.8, 0.6, 1.0, 1.0])

def grad_V(pos):
    g = 0.20 * pos  # bowl gradient
    for (cx, cy), d, w in zip(attractor_centres, depths, widths):
        dx, dy = pos[0] - cx, pos[1] - cy
        r2 = (dx**2 + dy**2) / (2 * w**2)
        factor = d / w**2 * np.exp(-r2)
        g += np.array([-factor * dx, -factor * dy])
    return g

def basin_of(x0, y0, steps=200, lr=0.05):
    pos = np.array([x0, y0], dtype=float)
    for _ in range(steps):
        pos -= lr * grad_V(pos)
    dists = np.linalg.norm(attractor_centres - pos, axis=1)
    return np.argmin(dists)

# ── Grid ─────────────────────────────────────────────────────────────────────
N = 220
xs = np.linspace(-4.5, 4.5, N)
ys = np.linspace(-4.5, 4.5, N)
basin_map = np.zeros((N, N), dtype=int)
for i, yi in enumerate(ys):
    for j, xj in enumerate(xs):
        basin_map[i, j] = basin_of(xj, yi)

# ── Plot ──────────────────────────────────────────────────────────────────────
colours = ["#2980B9", "#8E44AD", "#C0392B", "#D35400"]   # Calm/Freeze/Fight/Flight
cmap = ListedColormap(colours)

fig, ax = plt.subplots(figsize=(6.5, 6))
ax.imshow(basin_map, origin="lower",
          extent=[-4.5, 4.5, -4.5, 4.5],
          cmap=cmap, vmin=-0.5, vmax=3.5,
          interpolation="nearest", alpha=0.70)

# Attractor markers
names = ["Calm", "Freeze", "Fight", "Flight"]
for (cx, cy), name, col in zip(attractor_centres, names, colours):
    ax.plot(cx, cy, "o", color=col, ms=8, mec="white", mew=1.5, zorder=5)
    ax.text(cx + 0.15, cy + 0.15, name, fontsize=9.5, color="white",
            weight="bold", zorder=6,
            bbox=dict(fc=col, alpha=0.75, ec="none", boxstyle="round,pad=0.15"))

ax.set_xlabel(r"$e_1$", fontsize=11)
ax.set_ylabel(r"$e_2$", fontsize=11)
ax.set_title("Attractor Basins of the Soma-Field\n(gradient-descent trajectories)", fontsize=10.5)
ax.tick_params(labelbottom=False, labelleft=False)

plt.tight_layout()
for ext in ("pdf", "png"):
    plt.savefig(f"figB1_attractor_basins.{ext}", dpi=180, bbox_inches="tight")
print("figB1 saved")
