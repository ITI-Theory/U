"""
twister_ui.py — Virtual Midi Fighter Twister display

Three-layer architecture (database schema analogy):
  Physical    : 4×4 knob grid mirroring the hardware device
  MIDI        : raw CC number + 0–127 integer value
  Instrument  : named parameter (e.g. "arousal") + 0–1 normalised value

Run modes:
    python twister_ui.py                         # read live log (default)
    python twister_ui.py --midi "Midi Fighter"   # direct MIDI input (live)

Layout:
    ┌─────────────────────────┬──────────────────────────┐
    │  SOMATIC (left Twister) │  COGNITIVE (right Twister)│
    │    CC 1–8  (knobs 1–8)  │    CC 9–16 (knobs 1–8)   │
    │    4 × 4  knob grid     │    4 × 4  knob grid       │
    └─────────────────────────┴──────────────────────────┘

Knob anatomy (per cell):
  • Arc track       — grey 270° sweep (7 o'clock → 5 o'clock)
  • Value arc       — band-coloured, fills track proportional to value
  • Background fill — tinted by (band hue × value brightness)
  • Touch ring      — white halo when capacitive top is touched
  • Center dot      — lights white when push-button is pressed
  • Text (name)     — parameter name, top-centre of knob
  • Text (value)    — 0.00–1.00, centre of knob
  • Text (CC#)      — CC label, bottom, small

Colour scheme:
  Somatic (left)  : orange-amber hue;  brightness = value
  Cognitive (right): steel-blue hue;   brightness = value
  Inactive knobs   : flat dark grey, no arc

Touch / button detection (direct MIDI mode only):
  The Midi Fighter Twister sends Note On/Off for capacitive touch and
  push-click. Default note mapping:
    touch note = knob_idx - 1  (note 0–15, ch 1)
    push  note = knob_idx - 1 + 16  (note 16–31, ch 1)
  Adjust KnobConfig.touch_note / push_note per-knob if your firmware
  uses a different mapping (configurable in Midi Fighter Utility).

VST / DAW future path:
  All drawing lives in KnobArtist.  To embed in a DAW:
  1. Port KnobArtist.update() to a PySide6/PyQt6 QWidget.paintEvent
  2. Host via CLAP/VST3 wrapper or Reaper's ReaScript Python bridge
  3. Share _states dict over OSC (already in the instrument stack)
"""

from __future__ import annotations

import argparse
import colorsys
import ctypes
import ctypes.wintypes as wt
from ctypes import windll, WINFUNCTYPE, byref
import glob
import json
import os
import threading
from dataclasses import dataclass
from typing import Optional

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.animation as animation
import numpy as np


# ─── Layer-2 parameter names (8 emotional modes) ────────────────────────────
# Index i maps to: somatic CC i+1 (left Twister) and cognitive CC i+9 (right)

MODE_NAMES: list[str] = [
    "arousal",        # mode 0  — CC 1  / CC 9
    "valence",        # mode 1  — CC 2  / CC 10
    "tension",        # mode 2  — CC 3  / CC 11
    "affect",         # mode 3  — CC 4  / CC 12
    "regulation",     # mode 4  — CC 5  / CC 13
    "interoception",  # mode 5  — CC 6  / CC 14
    "agency",         # mode 6  — CC 7  / CC 15
    "presence",       # mode 7  — CC 8  / CC 16
]


# ─── Display constants ───────────────────────────────────────────────────────

SOMATIC_HUE   = 0.08   # orange-amber
COGNITIVE_HUE = 0.58   # steel blue

BG            = "#0d0d0d"
PANEL_BG      = "#111111"
INACTIVE_COL  = "#1c1c1c"

KNOB_COLS = 4
KNOB_ROWS = 4
CELL_SIZE = 1.0

KNOB_R    = 0.36        # circle radius, in cell units
ARC_R     = KNOB_R * 0.78

TRACK_LW  = 2.0         # grey track line width (pts)
ARC_LW    = 3.5         # value arc line width
TOUCH_LW  = 2.5         # touch ring line width

# Arc geometry: 7 o'clock (225°) sweep CW 270° to 5 o'clock (-45° = 315°)
# matplotlib angles are CCW from east; going CCW from -45→225 = 270° arc ✓
ARC_START = 225.0       # start angle (top of sweep)
ARC_SWEEP = 270.0       # total travel in degrees

FPS = 15
INTERVAL_MS = int(1000 / FPS)


# ─── Per-knob configuration ──────────────────────────────────────────────────

@dataclass
class KnobConfig:
    knob_idx:   int           # 1–16  physical position on the Twister
    cc:         int           # MIDI CC# this knob transmits
    name:       str           # instrument parameter name (empty = unmapped)
    band:       str           # "somatic" | "cognitive" | ""
    mode:       str = "rotary"  # "rotary" | "button" | "bank"
    touch_note: int = -1      # MIDI note for cap-touch  (-1 → knob_idx - 1)
    push_note:  int = -1      # MIDI note for push-click (-1 → knob_idx + 15)

    @property
    def mapped(self) -> bool:
        return bool(self.name)

    def eff_touch_note(self) -> int:
        return (self.knob_idx - 1) if self.touch_note < 0 else self.touch_note

    def eff_push_note(self) -> int:
        return (self.knob_idx + 15) if self.push_note < 0 else self.push_note


@dataclass
class KnobState:
    value:   float = 0.0    # 0–1 normalised field value
    raw:     int   = 0      # 0–127 raw MIDI
    touched: bool  = False  # capacitive touch active
    pressed: bool  = False  # push-button pressed


# ─── Default configurations ───────────────────────────────────────────────────

def _left_configs() -> list[KnobConfig]:
    """Left Twister: knobs 1–8 → CC 1–8 (somatic); knobs 9–16 spare."""
    cfgs: list[KnobConfig] = []
    for i in range(1, 17):
        if i <= 8:
            cfgs.append(KnobConfig(
                knob_idx=i, cc=i, name=MODE_NAMES[i - 1], band="somatic"
            ))
        else:
            cfgs.append(KnobConfig(knob_idx=i, cc=i, name="", band=""))
    return cfgs


def _right_configs() -> list[KnobConfig]:
    """Right Twister: knobs 1–8 → CC 9–16 (cognitive); knobs 9–16 spare."""
    cfgs: list[KnobConfig] = []
    for i in range(1, 17):
        if i <= 8:
            cfgs.append(KnobConfig(
                knob_idx=i, cc=i + 8, name=MODE_NAMES[i - 1], band="cognitive"
            ))
        else:
            cfgs.append(KnobConfig(knob_idx=i, cc=i + 8, name="", band=""))
    return cfgs


# ─── Thread-safe state registry ──────────────────────────────────────────────
# Keyed by CC number.  Written by MIDI callback or log reader; read by animation.

_states: dict[int, KnobState] = {}
_lock   = threading.Lock()


def _get(cc: int) -> KnobState:
    """Return current state for a CC, creating default if absent."""
    with _lock:
        return _states.get(cc, KnobState())


def _set_cc(cc: int, raw: int) -> None:
    with _lock:
        if cc not in _states:
            _states[cc] = KnobState()
        s = _states[cc]
        s.raw   = raw
        s.value = raw / 127.0


def _set_touch(cc: int, active: bool) -> None:
    with _lock:
        if cc not in _states:
            _states[cc] = KnobState()
        _states[cc].touched = active


def _set_press(cc: int, active: bool) -> None:
    with _lock:
        if cc not in _states:
            _states[cc] = KnobState()
        _states[cc].pressed = active


def _load_field_vector(e: list[float]) -> None:
    """Map a 16-element field state vector → _states (used by log reader)."""
    if len(e) < 16:
        return
    with _lock:
        for i in range(8):
            cc = i + 1          # somatic: CC 1–8
            if cc not in _states:
                _states[cc] = KnobState()
            _states[cc].value = float(e[i])
            _states[cc].raw   = int(e[i] * 127)
        for i in range(8):
            cc = i + 9          # cognitive: CC 9–16
            if cc not in _states:
                _states[cc] = KnobState()
            _states[cc].value = float(e[8 + i])
            _states[cc].raw   = int(e[8 + i] * 127)


# ─── Colour helper ────────────────────────────────────────────────────────────

def _band_color(band: str, value: float) -> str:
    """HSV color: band → hue, value → brightness (0.25–1.0)."""
    hue = SOMATIC_HUE if band == "somatic" else COGNITIVE_HUE
    bri = 0.25 + max(0.0, min(1.0, value)) * 0.75
    r, g, b = colorsys.hsv_to_rgb(hue, 0.85, bri)
    return f"#{int(r * 255):02x}{int(g * 255):02x}{int(b * 255):02x}"


# ─── Per-knob artist ──────────────────────────────────────────────────────────

# N_ARC_PTS controls arc smoothness; 48 pts is plenty at knob display size
_N_ARC = 48


def _arc_xy(cx: float, cy: float, r: float,
            start_deg: float, end_deg: float, n: int = _N_ARC):
    """Return (x, y) arrays for an arc from start_deg to end_deg (both CCW from east)."""
    angles = np.linspace(np.radians(start_deg), np.radians(end_deg), max(2, n))
    return cx + r * np.cos(angles), cy + r * np.sin(angles)


class KnobArtist:
    """All matplotlib artists for one physical knob.  Call update() each frame."""

    def __init__(self, ax, cx: float, cy: float, cfg: KnobConfig):
        self._ax  = ax
        self._cx  = cx
        self._cy  = cy
        self._cfg = cfg
        r  = KNOB_R
        ar = ARC_R

        # 1 — Background fill circle
        self._bg = mpatches.Circle(
            (cx, cy), r, color=INACTIVE_COL, linewidth=0, zorder=2
        )
        ax.add_patch(self._bg)

        # 2 — Grey track arc (static, drawn once)
        tx, ty = _arc_xy(cx, cy, ar, ARC_START - ARC_SWEEP, ARC_START)
        (self._track,) = ax.plot(
            tx, ty, color="#383838", linewidth=TRACK_LW,
            solid_capstyle="round", zorder=3
        )

        # 3 — Value arc (Line2D — updated via set_data each frame)
        (self._varc,) = ax.plot(
            [], [], color="#888888", linewidth=ARC_LW,
            solid_capstyle="round", zorder=4
        )

        # 4 — Touch ring (Circle outline — visible only when cap-touched)
        self._touch = mpatches.Circle(
            (cx, cy), r * 1.14, fill=False,
            edgecolor="white", linewidth=TOUCH_LW,
            visible=False, zorder=5
        )
        ax.add_patch(self._touch)

        # 5 — Push-button dot (center)
        self._dot = mpatches.Circle(
            (cx, cy), r * 0.13, color="#252525", zorder=6
        )
        ax.add_patch(self._dot)

        # 6 — Parameter name (top, bold)
        self._name_t = ax.text(
            cx, cy + r * 0.32,
            cfg.name if cfg.mapped else "",
            ha="center", va="center",
            fontsize=5.5, color="#cccccc", fontweight="bold",
            zorder=7, clip_on=True
        )

        # 7 — Current value (centre)
        self._val_t = ax.text(
            cx, cy - r * 0.10,
            "0.00" if cfg.mapped else "",
            ha="center", va="center",
            fontsize=5.5, color="#aaaaaa",
            zorder=7, clip_on=True
        )

        # 8 — CC label (bottom, smallest)
        self._cc_t = ax.text(
            cx, cy - r * 0.52,
            f"CC{cfg.cc}" if cfg.mapped else "",
            ha="center", va="center",
            fontsize=4.0, color="#555555",
            zorder=7, clip_on=True
        )

    def update(self, st: KnobState) -> None:
        v   = st.value
        cfg = self._cfg
        cx, cy = self._cx, self._cy

        # Background tint (mapped knobs only)
        if cfg.mapped:
            self._bg.set_facecolor(_band_color(cfg.band, v * 0.38))

        # Value arc: sweep from ARC_START down to ARC_START - ARC_SWEEP*v
        if cfg.mapped and v > 0.004:
            end_deg = ARC_START - ARC_SWEEP * v
            n_pts   = max(2, int(_N_ARC * v))
            vx, vy  = _arc_xy(cx, cy, ARC_R, end_deg, ARC_START, n=n_pts)
            self._varc.set_data(vx, vy)
            self._varc.set_color(_band_color(cfg.band, 0.45 + v * 0.55))
            self._varc.set_visible(True)
        elif cfg.mapped:
            self._varc.set_visible(False)

        # Touch ring
        self._touch.set_visible(st.touched)

        # Push dot
        self._dot.set_facecolor("#ffffff" if st.pressed else "#252525")

        # Value text
        if cfg.mapped:
            self._val_t.set_text(f"{v:.2f}")


# ─── Twister panel (one 4×4 grid) ────────────────────────────────────────────

class TwisterPanel:
    """Draws one physical Twister as a 4×4 grid of KnobArtist objects."""

    def __init__(self, ax, configs: list[KnobConfig], title: str):
        self._ax      = ax
        self._artists: list[KnobArtist] = []

        W = KNOB_COLS * CELL_SIZE
        H = KNOB_ROWS * CELL_SIZE

        ax.set_facecolor(PANEL_BG)
        ax.set_xlim(0, W)
        ax.set_ylim(0, H)
        ax.set_aspect("equal")
        ax.axis("off")
        ax.set_title(title, color="#cccccc", fontsize=8.5,
                     fontweight="bold", pad=6)

        for idx, cfg in enumerate(configs):
            row = idx // KNOB_COLS      # 0 = top row
            col = idx  % KNOB_COLS
            # Flip row so knob 1 appears top-left
            cy  = (KNOB_ROWS - 1 - row) * CELL_SIZE + CELL_SIZE / 2
            cx  = col * CELL_SIZE + CELL_SIZE / 2
            self._artists.append(KnobArtist(ax, cx, cy, cfg))

    def refresh(self) -> None:
        """Pull current _states and repaint all knobs."""
        for artist in self._artists:
            artist.update(_get(artist._cfg.cc))


# ─── Log-file data source ─────────────────────────────────────────────────────

def _latest_log() -> Optional[str]:
    files = glob.glob("logs/session_*.jsonl")
    return max(files, key=os.path.getmtime) if files else None


def _read_last_record(path: str) -> Optional[dict]:
    """Efficiently read the last JSON line of a JSONL log file."""
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


# ─── Direct MIDI data source ──────────────────────────────────────────────────

# Module-level GC anchor for WINFUNCTYPE callbacks (must stay alive)
_midi_callbacks: list = []
_midi_handles:   list = []


def _start_midi(port_name: str,
                all_configs: list[KnobConfig]) -> None:
    """Open all matching MIDI input ports and route messages to _states."""
    try:
        winmm_ = windll.winmm
    except Exception as exc:
        raise RuntimeError(f"winmm.dll not available: {exc}") from exc

    CALLBACK_FUNCTION = 0x00030000
    MIM_DATA          = 0x3C3
    MMSYSERR_NOERROR  = 0

    # ------------------------------------------------------------------
    # Build note → (cc, kind) lookup for touch + push detection
    # ------------------------------------------------------------------
    note_map: dict[int, tuple[int, str]] = {}
    for cfg in all_configs:
        if cfg.mapped:
            note_map[cfg.eff_touch_note()] = (cfg.cc, "touch")
            note_map[cfg.eff_push_note()]  = (cfg.cc, "push")

    # ------------------------------------------------------------------
    # Enumerate ports
    # ------------------------------------------------------------------
    class MIDIINCAPS(ctypes.Structure):
        _fields_ = [
            ("wMid",           wt.WORD),
            ("wPid",           wt.WORD),
            ("vDriverVersion", wt.UINT),
            ("szPname",        ctypes.c_char * 32),
            ("dwSupport",      wt.DWORD),
        ]

    def _list_ports() -> list[str]:
        n = winmm_.midiInGetNumDevs()
        names = []
        for i in range(n):
            caps = MIDIINCAPS()
            winmm_.midiInGetDevCapsA(i, byref(caps), ctypes.sizeof(caps))
            names.append(caps.szPname.decode("ascii", errors="replace").rstrip("\x00"))
        return names

    ports   = _list_ports()
    indices = [i for i, name in enumerate(ports)
               if port_name.lower() in name.lower()]
    if not indices:
        available = "\n".join(f"  [{i}] {n}" for i, n in enumerate(ports))
        raise ValueError(
            f"MIDI port {port_name!r} not found.\nAvailable:\n{available}"
        )

    # ------------------------------------------------------------------
    # Callback — handles CC (values), Note On/Off (touch + push)
    # ------------------------------------------------------------------
    MIDIINPROC = WINFUNCTYPE(
        None, wt.HANDLE, wt.UINT,
        ctypes.POINTER(ctypes.c_ulong), wt.DWORD, wt.DWORD
    )

    def _cb(hmidi, msg, instance, param1, param2):
        if msg != MIM_DATA:
            return
        status   = param1 & 0xFF
        msg_type = status & 0xF0
        data1    = (param1 >> 8)  & 0x7F
        data2    = (param1 >> 16) & 0x7F

        if msg_type == 0xB0:                        # Control Change → value
            _set_cc(data1, data2)
        elif msg_type in (0x90, 0x80):              # Note On / Note Off → touch or push
            on   = (msg_type == 0x90) and (data2 > 0)
            info = note_map.get(data1)
            if info:
                cc, kind = info
                if kind == "touch":
                    _set_touch(cc, on)
                else:
                    _set_press(cc, on)

    cb = MIDIINPROC(_cb)
    _midi_callbacks.append(cb)          # keep alive — GC anchor

    for idx in indices:
        handle = wt.HANDLE(0)
        ret = winmm_.midiInOpen(byref(handle), idx, cb, 0, CALLBACK_FUNCTION)
        if ret != MMSYSERR_NOERROR:
            print(f"WARN: midiInOpen failed [{idx}] {ports[idx]!r} rc={ret}")
            continue
        winmm_.midiInStart(handle)
        _midi_handles.append(handle)
        print(f"[twister_ui] MIDI open: [{idx}] {ports[idx]!r}")

    if not _midi_handles:
        raise RuntimeError("Failed to open any MIDI input port.")


def _stop_midi() -> None:
    """Close all open MIDI input ports gracefully."""
    try:
        winmm_ = windll.winmm
    except Exception:
        return
    for handle in _midi_handles:
        winmm_.midiInStop(handle)
        winmm_.midiInClose(handle)
    _midi_handles.clear()
    print("[twister_ui] MIDI closed.")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    ap = argparse.ArgumentParser(description="Virtual Midi Fighter Twister display")
    ap.add_argument(
        "--midi", metavar="PORT", default=None,
        help="MIDI port substring for direct hardware input "
             "(default: read from live log file)"
    )
    args = ap.parse_args()

    left_cfgs  = _left_configs()
    right_cfgs = _right_configs()
    all_cfgs   = left_cfgs + right_cfgs

    # ── Figure ────────────────────────────────────────────────────────────────
    fig = plt.figure(figsize=(11, 5.8), facecolor=BG)
    try:
        fig.canvas.manager.set_window_title("Soma-Field — Twister UI")
    except Exception:
        pass

    gs = fig.add_gridspec(
        1, 2,
        left=0.03, right=0.97,
        bottom=0.06, top=0.93,
        wspace=0.07
    )
    ax_l = fig.add_subplot(gs[0, 0])
    ax_r = fig.add_subplot(gs[0, 1])

    panel_l = TwisterPanel(ax_l, left_cfgs,  "SOMATIC  ·  left Twister  ·  CC 1–8")
    panel_r = TwisterPanel(ax_r, right_cfgs, "COGNITIVE  ·  right Twister  ·  CC 9–16")

    status_t = fig.text(
        0.5, 0.015, "initialising…",
        ha="center", va="bottom",
        fontsize=6.5, color="#555555"
    )

    # ── Data source ───────────────────────────────────────────────────────────
    if args.midi:
        _start_midi(args.midi, all_cfgs)
        _log_path: list[Optional[str]] = [None]

        def _update_source() -> None:
            pass   # state updated live by MIDI callback

        src_label = f"MIDI · {args.midi}"
    else:
        _log_path = [_latest_log()]
        if _log_path[0]:
            print(f"[twister_ui] reading log: {_log_path[0]}")
        else:
            print("[twister_ui] no log found — start server.py first")

        def _update_source() -> None:
            if _log_path[0] is None:
                _log_path[0] = _latest_log()
                return
            rec = _read_last_record(_log_path[0])
            if rec and "e" in rec:
                _load_field_vector(rec["e"])

        src_label = "log"

    # ── Animation ─────────────────────────────────────────────────────────────
    def _animate(_frame: int) -> None:
        _update_source()
        panel_l.refresh()
        panel_r.refresh()

        # Status bar: show a couple of live values
        with _lock:
            s1  = _states.get(1,  KnobState())
            s9  = _states.get(9,  KnobState())
            s10 = _states.get(10, KnobState())

        status_t.set_text(
            f"src: {src_label}  │  "
            f"S·arousal {s1.value:.2f}  "
            f"C·arousal {s9.value:.2f}  "
            f"C·valence {s10.value:.2f}"
            + ("  ·  touch active" if s1.touched or s9.touched else "")
        )

    ani = animation.FuncAnimation(       # noqa: F841 — must stay referenced
        fig, _animate,
        interval=INTERVAL_MS,
        cache_frame_data=False
    )

    try:
        plt.show()
    finally:
        if args.midi:
            _stop_midi()


if __name__ == "__main__":
    main()
