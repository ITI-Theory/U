#!/usr/bin/env python3
"""
control_post.py — The Control Post for The Abstract Movie.

An immersive operator interface: three 3D wireframe attractor-slice
landscapes rendered live in TouchDesigner, with XY pads, faders, and
direct mode injection.

  # Full pipeline (once Movie.lean has a main entry point):
  lake exe Movie | python instrument/field_render.py --forward-port 9002 &
  python instrument/control_post.py --verbose

  # Development — replay a saved session:
  cat session.jsonl | python instrument/field_render.py --forward-port 9002 &
  python instrument/control_post.py --verbose

  # Single-port direct test (control post listens for /movie/* directly):
  python instrument/control_post.py --listen-port 9002 --verbose

──────────────────────────────────────────────────────────────────────────────
Architecture
──────────────────────────────────────────────────────────────────────────────

  field_render.py
  (sends /movie/* to port 9002 when --forward-port 9002 is set)
        │ OSC /movie/e/*,/movie/t → port 9002
        ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  control_post.py                                                        │
  │                                                                         │
  │  Three attractor-slice panels  (the triptych):                         │
  │    Panel 0: Safety vs Fear       — autonomic pole                       │
  │    Panel 1: Awe vs Preverbal     — depth axis (transcendence)           │
  │    Panel 2: Language vs Shame    — social / symbolic axis               │
  │                                                                         │
  │  Per panel, every tick:                                                 │
  │    • H(eᵢ, eⱼ; e_rest) on 32×32 grid  →  /landscape/{n}/mesh          │
  │    • ∂H/∂eᵢ gradient field             →  /landscape/{n}/gradient      │
  │    • e*(t) trajectory marker           →  /landscape/{n}/trajectory     │
  │    • active axis labels                →  /landscape/{n}/axes           │
  │                                                                         │
  │  Receives TouchDesigner XY pad events:                                  │
  │    /control/xypad/{n}/axes  xMode yMode  →  reconfigure panel axes     │
  │    /control/xypad/{n}/inject x y         →  override mode values        │
  │    /control/knob/{name} value            →  ControlKnobs override       │
  │    /control/seek t                       →  seek story-time             │
  │    /control/pause, /control/resume       →  transport control           │
  │                                                                         │
  │  Control messages → stdout JSON (for Lean once GAP-MOVIE-6 lands)       │
  └─────────────────────────────────────┬───────────────────────────────────┘
                                        │ OSC → TouchDesigner port 9001
                              ┌─────────▼──────────┐
                              │   TouchDesigner     │
                              │   3× wireframe SOP  │
                              │   (CHOP → DAT →     │
                              │    Geometry COMP)   │
                              └─────────────────────┘

──────────────────────────────────────────────────────────────────────────────
Attractor slices — what is a "2D mesh graph control"?
──────────────────────────────────────────────────────────────────────────────

In DAW / synthesizer terms this is an XY pad — a 2D parameter surface.
In this system the surface has mathematical content: it is a Poincaré section
(phase-portrait slice) of the 8-dimensional Hopfield energy landscape.

  H(eᵢ, eⱼ; e_rest) = -½ eᵀ W e
  evaluated on a 32×32 grid of (eᵢ, eⱼ) values
  with all other modes fixed at the current score e*(t).

Valleys = attractor basins.  Peaks = repellers.
The trajectory e*(t) sweeps through the landscape in real time.
The gradient field ∂H/∂e shows the "pull" direction at each point.

Three panels give three simultaneous cross-sections through the 8-dimensional
field — like the three orthogonal faces of a cube, but in 8D.

──────────────────────────────────────────────────────────────────────────────
OSC namespace — Control Post → TouchDesigner
──────────────────────────────────────────────────────────────────────────────

  /landscape/{n}/mesh        list[float]  32*32 H values, row-major
  /landscape/{n}/gradient    list[float]  32*32*2 (∂H/∂x, ∂H/∂y), row-major
  /landscape/{n}/trajectory  list[float]  [x, y, H_at_xy]  (current position)
  /landscape/{n}/axes        list[str]    [xModeName, yModeName]
  /landscape/{n}/min_h       float        min(mesh) — for TD normalisation
  /landscape/{n}/max_h       float        max(mesh)
  /control_post/t            float        current story-time [0,1]
  /control_post/energy       float        H(e*(t)) — global field energy

OSC namespace — TouchDesigner → Control Post
──────────────────────────────────────────────────────────────────────────────

  /control/seek              float t               seek to story-time
  /control/knob/{name}       float value           knob override (depth/velocity/…)
  /control/xypad/{n}/axes    str xMode, str yMode  steer panel axes
  /control/xypad/{n}/inject  float x, float y      inject mode values directly
  /control/pause                                   pause story-time
  /control/resume                                  resume story-time
"""

from __future__ import annotations

import sys
import json
import math
import time
import threading
import argparse
import logging
from typing import Optional

import numpy as np

try:
    from pythonosc import udp_client
    from pythonosc.osc_server import ThreadingOSCUDPServer
    from pythonosc.dispatcher import Dispatcher
    _OSC_AVAILABLE = True
except ImportError:
    _OSC_AVAILABLE = False
    print(
        "[control_post] WARNING: python-osc not installed. OSC disabled.\n"
        "[control_post]   pip install python-osc",
        file=sys.stderr,
    )


# ─────────────────────────────────────────────────────────────────────────────
# Mode constants — mirror Movie.lean MovieMode.dim
# ─────────────────────────────────────────────────────────────────────────────

MODE_NAMES = [
    "safety",     # dim 0
    "fear",       # dim 1
    "curiosity",  # dim 2
    "awe",        # dim 3
    "grief",      # dim 4
    "language",   # dim 5
    "preverbal",  # dim 6
    "shame",      # dim 7
]

GRID_SIZE = 32  # 32×32 landscape mesh — 1024 points, good TD resolution


# ─────────────────────────────────────────────────────────────────────────────
# Coupling matrix W — mirrors riverCoupling in Movie.lean
# H(e) = -½ eᵀWe  (W symmetric, Hopfield energy)
# ─────────────────────────────────────────────────────────────────────────────

def build_coupling_matrix(coupling_scale: float = 1.0) -> np.ndarray:
    """
    Build the 8×8 symmetric coupling matrix W from riverCoupling.

    Diagonal = -1.0 (intrinsic restoring force toward 0 for each mode).
    Off-diagonal = from Movie.lean riverCoupling:
      Fear(1) → Awe(3)      : +0.4
      Awe(3)  → Grief(4)    : +0.3
      Language(5) ↔ Preverbal(6): -0.6  (mutual inhibition)
      Safety(0) ↔ Fear(1)   : -0.5  (reciprocal inhibition)
    """
    W = np.diag(np.full(8, -1.0))

    def couple(i: int, j: int, w: float) -> None:
        W[i, j] += w * coupling_scale
        W[j, i] += w * coupling_scale

    couple(1, 3,  0.4)   # Fear → Awe
    couple(3, 4,  0.3)   # Awe → Grief
    couple(5, 6, -0.6)   # Language ↔ Preverbal
    couple(0, 1, -0.5)   # Safety ↔ Fear
    return W


def field_energy_W(e: np.ndarray, W: np.ndarray) -> float:
    """H(e) = -½ eᵀWe — full coupling-weighted Hopfield energy."""
    return float(-0.5 * e @ W @ e)


# ─────────────────────────────────────────────────────────────────────────────
# Attractor Slice — one 2D cross-section of the 8-dimensional landscape
# ─────────────────────────────────────────────────────────────────────────────

class AttractorSlice:
    """
    A 2D phase-portrait slice (XY pad with mathematical content).

    The slice fixes all emotional modes except x_mode and y_mode at their
    current values e*(t), then sweeps (eᵢ, eⱼ) over [0,1]×[0,1].

    The result is a 32×32 height-field of H values — valleys are attractor
    basins, peaks are repellers. TouchDesigner renders this as a wireframe SOP.

    Three slices = three simultaneous views into the 8-dimensional field.
    Together they form the Control Post triptych.
    """

    xs = np.linspace(0.0, 1.0, GRID_SIZE)
    ys = np.linspace(0.0, 1.0, GRID_SIZE)

    def __init__(self, panel_id: int, x_mode: int, y_mode: int):
        self.panel_id  = panel_id
        self.x_mode    = x_mode
        self.y_mode    = y_mode
        # Pre-allocate output buffers
        self.mesh      = np.zeros((GRID_SIZE, GRID_SIZE))    # H(i,j)
        self.gradient  = np.zeros((GRID_SIZE, GRID_SIZE, 2)) # (∂H/∂x, ∂H/∂y)
        self.traj_x    = 0.5
        self.traj_y    = 0.5
        self.min_h     = -0.5
        self.max_h     = 0.0

    def update(self, e_full: list[float], W: np.ndarray) -> None:
        """
        Recompute the 32×32 energy landscape given the current score e*(t).

        Vectorised: builds a (32,32,8) array of e-vectors, computes
        H = -½ eᵀWe at every point via einsum.  ~0.3 ms on modern hardware.
        """
        e_base = np.array(e_full, dtype=np.float64)

        # Broadcast: fill grid with e_base, then overwrite the two slice axes
        e_grid = np.broadcast_to(e_base, (GRID_SIZE, GRID_SIZE, 8)).copy()
        xv, yv = np.meshgrid(self.xs, self.ys, indexing='ij')
        e_grid[:, :, self.x_mode] = xv
        e_grid[:, :, self.y_mode] = yv

        # H = -½ eᵀWe  at each of the 32×32 grid points
        eW = np.einsum('ghi,ij->ghj', e_grid, W)       # (32,32,8)
        self.mesh = -0.5 * np.einsum('ghi,ghi->gh', e_grid, eW)  # (32,32)

        # Gradient ∂H/∂eᵢ = -(We)ᵢ  at each grid point
        self.gradient[:, :, 0] = -eW[:, :, self.x_mode]
        self.gradient[:, :, 1] = -eW[:, :, self.y_mode]

        # Trajectory: project current e*(t) onto this slice
        self.traj_x = float(e_full[self.x_mode])
        self.traj_y = float(e_full[self.y_mode])
        self.min_h  = float(self.mesh.min())
        self.max_h  = float(self.mesh.max())

    def traj_h(self) -> float:
        """H value at the current trajectory position (bilinear lookup)."""
        xi = int(round(self.traj_x * (GRID_SIZE - 1)))
        yi = int(round(self.traj_y * (GRID_SIZE - 1)))
        xi = max(0, min(GRID_SIZE - 1, xi))
        yi = max(0, min(GRID_SIZE - 1, yi))
        return float(self.mesh[xi, yi])


# Three panels — the triptych
DEFAULT_PANELS = [
    (0, MODE_NAMES.index("safety"),   MODE_NAMES.index("fear")),
    (1, MODE_NAMES.index("awe"),      MODE_NAMES.index("preverbal")),
    (2, MODE_NAMES.index("language"), MODE_NAMES.index("shame")),
]


# ─────────────────────────────────────────────────────────────────────────────
# Control Post
# ─────────────────────────────────────────────────────────────────────────────

class ControlPost:
    """
    The full Control Post bridge.

    Receiving side (OSC server on listen_port):
      - /movie/e/{name}  from field_render.py (--forward-port)
      - /movie/t         from field_render.py
      - /control/*       from TouchDesigner XY pads and faders

    Sending side (OSC client to TouchDesigner):
      - /landscape/{n}/mesh, /gradient, /trajectory, /axes, /min_h, /max_h
      - /control_post/t, /control_post/energy

    Stdout: ControlMessage JSON for Lean (GAP-MOVIE-6/11)
    """

    def __init__(
        self,
        listen_port: int = 9002,
        td_host: str = "127.0.0.1", td_port: int = 9001,
        coupling_scale: float = 1.0,
        verbose: bool = False,
    ):
        self.listen_port  = listen_port
        self.verbose      = verbose
        self.W            = build_coupling_matrix(coupling_scale)
        self._lock        = threading.Lock()
        self._current_e   = [0.5] * 8
        self._current_t   = 0.0
        self._panels      = [AttractorSlice(pid, xm, ym) for pid, xm, ym in DEFAULT_PANELS]
        self._td          = udp_client.SimpleUDPClient(td_host, td_port) if _OSC_AVAILABLE else None
        self._server      = None

    # ── OSC send helpers ──────────────────────────────────────────────────

    def _send_landscapes(self) -> None:
        """Push all three attractor-slice panels to TouchDesigner."""
        if not self._td:
            return
        for panel in self._panels:
            n = panel.panel_id
            # Mesh: 32*32 = 1024 floats — flat row-major
            self._td.send_message(f"/landscape/{n}/mesh",    panel.mesh.flatten().tolist())
            # Gradient: 32*32*2 floats
            self._td.send_message(f"/landscape/{n}/gradient", panel.gradient.flatten().tolist())
            # Trajectory marker
            self._td.send_message(f"/landscape/{n}/trajectory",
                                  [panel.traj_x, panel.traj_y, panel.traj_h()])
            # Axis labels
            self._td.send_message(f"/landscape/{n}/axes",
                                  [MODE_NAMES[panel.x_mode], MODE_NAMES[panel.y_mode]])
            # Range for TD normalisation
            self._td.send_message(f"/landscape/{n}/min_h", panel.min_h)
            self._td.send_message(f"/landscape/{n}/max_h", panel.max_h)

        # Global state
        e = np.array(self._current_e)
        H = field_energy_W(e, self.W)
        self._td.send_message("/control_post/t",      self._current_t)
        self._td.send_message("/control_post/energy", H)

    # ── ControlMessage → stdout ───────────────────────────────────────────

    def _emit(self, msg: dict) -> None:
        """Write a ControlMessage JSON line to stdout for Lean."""
        print(json.dumps(msg), flush=True)

    # ── OSC receive handlers ──────────────────────────────────────────────

    def _on_movie_e(self, addr: str, *args) -> None:
        """Receive /movie/e/{name} from field_render.py."""
        parts = addr.split('/')
        if len(parts) >= 4 and parts[2] == 'e':
            name = parts[3]
            if name in MODE_NAMES and args:
                with self._lock:
                    self._current_e[MODE_NAMES.index(name)] = float(args[0])

    def _on_movie_t(self, addr: str, *args) -> None:
        """Receive /movie/t — triggers landscape recompute."""
        if args:
            with self._lock:
                self._current_t = float(args[0])
                e_snap = list(self._current_e)
            for panel in self._panels:
                panel.update(e_snap, self.W)
            self._send_landscapes()
            if self.verbose:
                e = np.array(e_snap)
                H = field_energy_W(e, self.W)
                panels_str = "  ".join(
                    f"P{p.panel_id}[{MODE_NAMES[p.x_mode][:3]}×{MODE_NAMES[p.y_mode][:3]}]"
                    f"=({p.traj_x:.2f},{p.traj_y:.2f})"
                    for p in self._panels
                )
                print(f"  [ctrl_post] t={self._current_t:.3f}  H={H:.3f}  {panels_str}", flush=True)

    def _on_seek(self, addr: str, *args) -> None:
        if args:
            self._emit({"type": "Seek", "t": float(args[0])})

    def _on_knob(self, addr: str, *args) -> None:
        """Receive /control/knob/{name} from TD faders."""
        parts = addr.split('/')
        if len(parts) >= 4 and args:
            self._emit({"type": "SetKnob", "knob": parts[3], "value": float(args[0])})

    def _on_xypad(self, addr: str, *args) -> None:
        """
        Receive XY pad interactions from TouchDesigner:
          /control/xypad/{n}/axes  xModeName yModeName  — reconfigure panel axes
          /control/xypad/{n}/inject x y                 — inject mode value override
        """
        parts = addr.split('/')
        if len(parts) < 5:
            return
        try:
            pid = int(parts[3])
        except ValueError:
            return
        action = parts[4]

        if action == 'axes' and len(args) >= 2:
            xn, yn = str(args[0]), str(args[1])
            if xn in MODE_NAMES and yn in MODE_NAMES and 0 <= pid < len(self._panels):
                with self._lock:
                    self._panels[pid].x_mode = MODE_NAMES.index(xn)
                    self._panels[pid].y_mode = MODE_NAMES.index(yn)
                self._emit({"type": "SetLandscapeAxes",
                            "panel": pid, "xMode": xn, "yMode": yn})
                if self.verbose:
                    print(f"  [ctrl_post] Panel {pid} → {xn} × {yn}", flush=True)

        elif action == 'inject' and len(args) >= 2 and 0 <= pid < len(self._panels):
            panel = self._panels[pid]
            self._emit({"type": "SetModeOverride",
                        "xMode": MODE_NAMES[panel.x_mode], "xValue": float(args[0]),
                        "yMode": MODE_NAMES[panel.y_mode], "yValue": float(args[1])})

    def _on_pause(self, addr: str, *args) -> None:
        self._emit({"type": "Pause"})

    def _on_resume(self, addr: str, *args) -> None:
        self._emit({"type": "Resume"})

    def _on_default(self, addr: str, *args) -> None:
        logging.debug(f"[ctrl_post] unhandled: {addr} {args}")

    # ── Main server loop ──────────────────────────────────────────────────

    def run(self) -> None:
        if not _OSC_AVAILABLE:
            logging.error("python-osc not installed — exiting.")
            return

        d = Dispatcher()
        d.map("/movie/e/*",       self._on_movie_e)
        d.map("/movie/t",         self._on_movie_t)
        d.map("/control/seek",    self._on_seek)
        d.map("/control/knob/*",  self._on_knob)
        d.map("/control/xypad/*", self._on_xypad)
        d.map("/control/pause",   self._on_pause)
        d.map("/control/resume",  self._on_resume)
        d.set_default_handler(self._on_default)

        server = ThreadingOSCUDPServer(("0.0.0.0", self.listen_port), d)

        td_addr = f"{self._td._address}:{self._td._port}" if self._td else "N/A"
        logging.info(f"Control Post listening on 0.0.0.0:{self.listen_port}")
        logging.info(f"Sending landscape data to TouchDesigner at {td_addr}")
        logging.info(f"Attractor-slice triptych:")
        for p in self._panels:
            logging.info(
                f"  Panel {p.panel_id}: {MODE_NAMES[p.x_mode]:>10} × {MODE_NAMES[p.y_mode]}"
            )
        logging.info(f"ControlMessage JSON → stdout (for Lean GAP-MOVIE-6/11)")

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            logging.info("Control Post stopped.")


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="control_post.py — Control Post for The Abstract Movie",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
The Control Post renders three simultaneous 2D cross-sections (attractor slices)
of the 8-dimensional Hopfield energy landscape H(e) = -½ eᵀWe, visualised as
animated 3D wireframe meshes in TouchDesigner.

Each panel is a Poincaré section — mathematically equivalent to an XY pad backed
by the soma-field energy function.  The three default panels are:

  Panel 0: Safety × Fear       (autonomic pole — ventral/dorsal vagal)
  Panel 1: Awe × Preverbal     (depth axis — transcendence / oldest soma)
  Panel 2: Language × Shame    (social/symbolic axis)

The panel axes can be resteered in real time via TouchDesigner XY pad controls.

Examples:
  # Standard pipeline
  lake exe Movie | python instrument/field_render.py --forward-port 9002 &
  python instrument/control_post.py --verbose

  # Remote TouchDesigner
  python instrument/control_post.py --td-host 192.168.1.11 --td-port 9001

  # Custom coupling scale (must match Movie.lean ControlKnobs)
  python instrument/control_post.py --coupling-scale 1.5
""",
    )
    parser.add_argument("--listen-port",   type=int, default=9002,
                        help="UDP port to receive /movie/* from field_render.py (default: 9002)")
    parser.add_argument("--td-host",       default="127.0.0.1",
                        help="TouchDesigner OSC host (default: 127.0.0.1)")
    parser.add_argument("--td-port",       type=int, default=9001,
                        help="TouchDesigner OSC port (default: 9001)")
    parser.add_argument("--coupling-scale", type=float, default=1.0,
                        help="W coupling scale factor — should match Lean ControlKnobs (default: 1.0)")
    parser.add_argument("--verbose", "-v", action="store_true",
                        help="Print per-frame summary to stderr")
    parser.add_argument("--log-level",     default="INFO",
                        choices=["DEBUG", "INFO", "WARNING", "ERROR"])

    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="[control_post] %(levelname)s %(message)s",
        stream=sys.stderr,
    )

    post = ControlPost(
        listen_port=args.listen_port,
        td_host=args.td_host, td_port=args.td_port,
        coupling_scale=args.coupling_scale,
        verbose=args.verbose,
    )
    post.run()


if __name__ == "__main__":
    main()
