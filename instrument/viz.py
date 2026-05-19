"""
viz.py -- Soma-Field Live Dashboard

Run in a second terminal alongside server.py:
    python viz.py

4-panel layout:
  +-----------------------+----------------------+
  |  SOMATIC  (CC 1-8)    |  COGNITIVE (CC 9-16) |
  +-----------------------+----------------------+
  |   H(t) energy sparkline (full width)         |
  +-----------------------+----------------------+
  |  MIDI diagnostics     |  Field physics       |
  +-----------------------+----------------------+
"""

import json
import glob
import os
import collections

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import matplotlib.animation as animation
import matplotlib.patches as mpatches

N_MODES = 8
HISTORY_LEN = 300   # ~30 s at 10 Hz reads

MODE_LABELS = ["calm", "fight", "flight", "grief",
               "freeze", "hyper", "flow", "joy"]

ATTRACTOR_COLORS = {
    "regulated_calm": "#44ff88",
    "flow":           "#44ccff",
    "hypervigilance": "#ffcc00",
    "fight":          "#ff4444",
    "flight":         "#ff8844",
    "freeze":         "#5599ff",
    "grief":          "#bb66ff",
    "dissociation":   "#888888",
    "unknown":        "#555555",
}

BG       = "#0d0d0d"
PANEL_BG = "#141414"
GRID_COL = "#252525"
TICK_COL = "#555555"


# ---------------------------------------------------------------------------
# Log reading helpers
# ---------------------------------------------------------------------------

def latest_log():
    files = glob.glob("logs/session_*.jsonl")
    return max(files, key=os.path.getmtime) if files else None


def read_last_record(path):
    try:
        with open(path, "rb") as f:
            f.seek(0, 2)
            pos = f.tell() - 1
            buf = b""
            while pos >= 0:
                f.seek(pos)
                ch = f.read(1)
                if ch == b"\n" and buf:
                    break
                buf = ch + buf
                pos -= 1
            line = buf.decode("utf-8", errors="replace").strip()
            return json.loads(line) if line else None
    except Exception:
        return None


# ---------------------------------------------------------------------------
# Figure layout
# ---------------------------------------------------------------------------

fig = plt.figure(figsize=(14, 8), facecolor=BG)
gs  = gridspec.GridSpec(
    3, 2,
    figure=fig,
    height_ratios=[4, 1.8, 2.2],
    hspace=0.38,
    wspace=0.12,
    left=0.06, right=0.97, top=0.93, bottom=0.07
)

ax_s     = fig.add_subplot(gs[0, 0])   # somatic bars
ax_c     = fig.add_subplot(gs[0, 1])   # cognitive bars
ax_spark = fig.add_subplot(gs[1, :])   # H(t) sparkline (full width)
ax_midi  = fig.add_subplot(gs[2, 0])   # MIDI diagnostics
ax_phy   = fig.add_subplot(gs[2, 1])   # field physics

fig.suptitle("SOMA-FIELD  ·  LIVE DASHBOARD",
             color="white", fontsize=12, fontweight="bold",
             fontfamily="monospace", y=0.975)


def _style(ax, title, title_col="#cccccc"):
    ax.set_facecolor(PANEL_BG)
    ax.set_title(title, color=title_col, fontsize=9, pad=5, fontfamily="monospace")
    for sp in ax.spines.values():
        sp.set_color(GRID_COL)
    ax.tick_params(colors=TICK_COL, length=2, labelsize=7)


# --- Somatic / Cognitive bar charts ---
x = np.arange(N_MODES)
for ax, title, col in [
        (ax_s, "SOMATIC   CC 1–8   (Twister 1 left bank)", "#aaffcc"),
        (ax_c, "COGNITIVE  CC 9–16  (Twister 2 left bank)", "#aaccff")]:
    _style(ax, title, col)
    ax.set_xlim(-0.6, N_MODES - 0.4)
    ax.set_ylim(0, 1.08)
    ax.set_xticks(x)
    ax.set_xticklabels(MODE_LABELS, fontsize=8, color="white",
                       rotation=25, ha="right")
    ax.set_yticks([0, 0.25, 0.5, 0.75, 1.0])
    ax.set_yticklabels(["0", "", ".5", "", "1"], color=TICK_COL)
    ax.axhline(0.5, color=GRID_COL, lw=0.5, ls="--")
    ax.axhline(0.7, color="#335533", lw=0.7, ls=":")    # threshold line
    ax.text(N_MODES - 0.55, 0.72, "θ", color="#446644", fontsize=8)

bars_s = ax_s.bar(x, [0]*N_MODES, color="#44ff88", edgecolor="#111",
                  linewidth=0.4, width=0.72)
bars_c = ax_c.bar(x, [0]*N_MODES, color="#44ccff", edgecolor="#111",
                  linewidth=0.4, width=0.72)

# --- Sparkline ---
_style(ax_spark, "ENERGY  H(t)  — last 30 s", "#ffddaa")
ax_spark.set_xlim(0, HISTORY_LEN)
ax_spark.set_ylim(-12, 1)
ax_spark.axhline(0, color=GRID_COL, lw=0.5)
ax_spark.set_xticks([])
ax_spark.set_ylabel("H", color=TICK_COL, fontsize=8, rotation=0, labelpad=8)
spark_line, = ax_spark.plot([], [], color="#ffaa44", lw=1.0)
spark_fill  = ax_spark.fill_between([], [], 0, color="#ffaa44", alpha=0.12)

# --- MIDI diagnostics ---
_style(ax_midi, "MIDI  INPUT", "#ffaaaa")
ax_midi.set_xlim(0, 1)
ax_midi.set_ylim(0, 1)
ax_midi.axis("off")

midi_lines = [
    ax_midi.text(0.04, 0.88, "PORT:  —", color="#888", fontsize=8.5,
                 va="top", fontfamily="monospace"),
    ax_midi.text(0.04, 0.68, "LAST CC:  —", color="#888", fontsize=8.5,
                 va="top", fontfamily="monospace"),
    ax_midi.text(0.04, 0.48, "RX COUNT:  0", color="#888", fontsize=8.5,
                 va="top", fontfamily="monospace"),
    ax_midi.text(0.04, 0.28, "STATUS:  waiting...", color="#888", fontsize=8.5,
                 va="top", fontfamily="monospace"),
]
# CC activity bar (per CC 1-24)
_cc_vals  = np.zeros(24)
cc_ax     = ax_midi.inset_axes([0.0, 0.02, 1.0, 0.18])
cc_ax.set_facecolor(PANEL_BG)
cc_ax.set_xlim(-0.5, 23.5)
cc_ax.set_ylim(0, 1)
cc_ax.set_xticks([0, 7, 8, 15, 16, 23])
cc_ax.set_xticklabels(["CC1", "", "CC9", "", "CC17", "CC24"],
                      fontsize=6, color=TICK_COL)
cc_ax.set_yticks([])
for sp in cc_ax.spines.values():
    sp.set_color(GRID_COL)
cc_bars = cc_ax.bar(range(24), _cc_vals, color="#ff6666",
                    edgecolor="#111", linewidth=0.2, width=0.8)

# --- Field physics ---
_style(ax_phy, "FIELD  PHYSICS", "#ddaaff")
ax_phy.set_xlim(0, 1)
ax_phy.set_ylim(0, 1)
ax_phy.axis("off")

phy_lines = [
    ax_phy.text(0.05, 0.93, "ATTRACTOR:  —", color="white", fontsize=9,
                va="top", fontfamily="monospace", fontweight="bold"),
    ax_phy.text(0.05, 0.75, "H:       —", color="#ffaa44", fontsize=8.5,
                va="top", fontfamily="monospace"),
    ax_phy.text(0.05, 0.60, "‖∇H‖:   —", color="#aa88ff", fontsize=8.5,
                va="top", fontfamily="monospace"),
    ax_phy.text(0.05, 0.45, "T_eff:   —", color="#44ccff", fontsize=8.5,
                va="top", fontfamily="monospace"),
    ax_phy.text(0.05, 0.30, "above-θ: —", color="#aaffcc", fontsize=8.5,
                va="top", fontfamily="monospace"),
    ax_phy.text(0.05, 0.12, "t:       —", color=TICK_COL, fontsize=8,
                va="top", fontfamily="monospace"),
]

# Attractor colour swatch
swatch = mpatches.FancyBboxPatch(
    (0.6, 0.82), 0.35, 0.12, boxstyle="round,pad=0.02",
    facecolor="#333333", edgecolor="#555555", lw=0.5,
    transform=ax_phy.transAxes, zorder=5
)
ax_phy.add_patch(swatch)


# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------

_H_history  = collections.deque([0.0] * HISTORY_LEN, maxlen=HISTORY_LEN)
_state      = {"log_path": None, "prev_rx": 0, "flash": 0}


# ---------------------------------------------------------------------------
# Animation update
# ---------------------------------------------------------------------------

def update(_frame):
    if _state["log_path"] is None:
        _state["log_path"] = latest_log()

    path = _state["log_path"]
    if path is None:
        midi_lines[3].set_text("STATUS:  no log — start server.py first")
        return []

    rec = read_last_record(path)
    if rec is None or "e" not in rec:
        return []

    e         = rec["e"]
    somatic   = e[:N_MODES]
    cognitive = e[N_MODES:]
    attractor = rec.get("nearest_attractor", "unknown")
    H         = rec.get("H", 0.0)
    grad_H    = rec.get("grad_H", [0.0]*16)
    T         = rec.get("T_eff", 0.0)
    t         = rec.get("t", 0.0)
    theta     = rec.get("theta", 0.7)
    crosses   = rec.get("threshold_cross", [])
    midi_cnt  = rec.get("midi_count", 0)
    last_cc   = rec.get("last_cc", -1)
    last_val  = rec.get("last_cc_val", 0.0)

    color = ATTRACTOR_COLORS.get(attractor, "#ffffff")

    # --- Bars ---
    for bar, val in zip(bars_s.patches, somatic):
        bar.set_height(val)
        bar.set_facecolor(color)
    for bar, val in zip(bars_c.patches, cognitive):
        bar.set_height(val)
        bar.set_facecolor(color)

    # --- Sparkline ---
    _H_history.append(H)
    yy = list(_H_history)
    xx = list(range(len(yy)))
    spark_line.set_data(xx, yy)
    lo = min(yy) - 0.5
    hi = max(yy) + 0.5
    ax_spark.set_ylim(lo, hi)

    global spark_fill
    spark_fill.remove()
    spark_fill = ax_spark.fill_between(xx, yy, lo, color="#ffaa44", alpha=0.10)

    # --- MIDI panel ---
    port_name = os.path.basename(path).replace("session_", "").replace(".jsonl", "")
    midi_lines[0].set_text(f"PORT:   Bome MIDI Translator 1")
    if last_cc >= 0:
        midi_lines[1].set_text(f"LAST:   CC {last_cc:>2d}  =  {last_val:.3f}")
        midi_lines[1].set_color("#ffaaaa")
    rx_new = midi_cnt - _state["prev_rx"]
    _state["prev_rx"] = midi_cnt
    midi_lines[2].set_text(f"RX:     {midi_cnt} events")
    if rx_new > 0:
        midi_lines[3].set_text("STATUS:  ● LIVE")
        midi_lines[3].set_color("#44ff88")
        _state["flash"] = 4
    else:
        _state["flash"] = max(0, _state["flash"] - 1)
        if _state["flash"] == 0:
            midi_lines[3].set_text("STATUS:  ○ idle")
            midi_lines[3].set_color("#888888")

    # CC activity bars — decay + highlight last received
    for i, bar in enumerate(cc_bars.patches):
        h = max(0, bar.get_height() * 0.85)   # decay
        bar.set_height(h)
        bar.set_facecolor("#ff6666")
    if 1 <= last_cc <= 24 and rx_new > 0:
        cc_bars.patches[last_cc - 1].set_height(last_val)
        cc_bars.patches[last_cc - 1].set_facecolor("#ffffff")

    # --- Physics panel ---
    grad_mag = float(np.linalg.norm(grad_H))
    phy_lines[0].set_text(f"ATTRACTOR:  {attractor}")
    phy_lines[0].set_color(color)
    phy_lines[1].set_text(f"H:        {H:+.3f}")
    phy_lines[2].set_text(f"\u2016\u2207H\u2016:    {grad_mag:.3f}")
    phy_lines[3].set_text(f"T_eff:    {T:.5f}")
    phy_lines[4].set_text(f"above-\u03b8:  {len(crosses)} / {N_MODES}")
    phy_lines[5].set_text(f"t:        {t:.1f} s")
    swatch.set_facecolor(color)

    return []


ani = animation.FuncAnimation(
    fig, update, interval=100,
    blit=False, cache_frame_data=False
)

plt.show()

