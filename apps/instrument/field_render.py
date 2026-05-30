#!/usr/bin/env python3
"""
field_render.py — Lean → Python bridge for The Abstract Movie.

Reads RenderFrame JSON lines from stdin (Lean server's stdout), maps the
abstract emotional score e*(t) to simultaneous audio and visual output.

  lake exe Movie | python instrument/field_render.py --verbose

──────────────────────────────────────────────────────────────────────────────
Architecture
──────────────────────────────────────────────────────────────────────────────

  ┌────────────────────────────────────────────────────────────┐
  │  Lean Server  (src/Movie.lean)                             │
  │  serverLoop @ 50 Hz  →  stdout JSON lines                  │
  │  {"t":0.52,"e":[...],"v":[...],"threshold":"awe-onset",    │
  │   "tick":26}                                               │
  └─────────────────────┬──────────────────────────────────────┘
                        │ stdin (pipe)
  ┌─────────────────────▼──────────────────────────────────────┐
  │  field_render.py  (this file)                              │
  │  ├── parse RenderFrame JSON                                │
  │  ├── map e*(t) → OSC to Ableton Live  (port 9000)         │
  │  ├── map e*(t) → OSC to TouchDesigner (port 9001)         │
  │  └── (future) write e_V back to stdout for GAP-MOVIE-2    │
  └─────────────────────┬──────────────────────────────────────┘
                        │ OSC/UDP
       ┌────────────────┴───────────────┐
       ▼                                ▼
  Ableton Live                    TouchDesigner
  (Max4Live / M4L device)         (Mandelbulb fractal renderer)
  port 9000                       port 9001

──────────────────────────────────────────────────────────────────────────────
OSC namespace — Movie layer  (both targets unless noted)
──────────────────────────────────────────────────────────────────────────────

  /movie/t                  float   story-time [0,1]
  /movie/tick               int     tick counter
  /movie/at_threshold       int     1 = inside threshold window, 0 = free
  /movie/threshold          str     dstBasin label or "none"  [TD only]
  /movie/e/safety           float   [0,1]
  /movie/e/fear             float   [0,1]
  /movie/e/curiosity        float   [0,1]
  /movie/e/awe              float   [0,1]
  /movie/e/grief            float   [0,1]
  /movie/e/language         float   [0,1]
  /movie/e/preverbal        float   [0,1]
  /movie/e/shame            float   [0,1]

OSC namespace — Field bridge (compatible with existing Ableton patches)
──────────────────────────────────────────────────────────────────────────────

  /field/e/{i}/somatic      float   mode i score activation → somatic axis
  /field/e/{i}/cognitive    float   mode i viewer field → cognitive axis
  /field/H                  float   field energy H(e) = -½ Σᵢ eᵢ²

OSC namespace — Mandelbulb mapping  [TD only]
──────────────────────────────────────────────────────────────────────────────

  /movie/mandelbulb/power   float   [2, 8]   — Awe ↑ → complex fractal
  /movie/mandelbulb/bailout float   [2, 6]   — Safety ↑ → stable escape
  /movie/mandelbulb/theta   float   [0, π]   — Grief adds angular offset
  /movie/mandelbulb/phi     float   [0, 2π]  — Language vs Preverbal ratio
  /movie/mandelbulb/speed   float   [0, 1]   — Curiosity drives animation speed
  /movie/mandelbulb/shame   float   [0, 1]   — Shame → contraction / occlusion

──────────────────────────────────────────────────────────────────────────────
Biofeedback hook (GAP-MOVIE-2 / future)
──────────────────────────────────────────────────────────────────────────────

  When enabled, field_render.py writes e_V estimates back to stdout:
    {"e_V": [0.5, 0.3, 0.1, 0.2, 0.4, 0.6, 0.1, 0.0]}
  Lean will read these from stdin once GAP-MOVIE-6 (stdin reader) is resolved.
"""

from __future__ import annotations

import sys
import json
import math
import argparse
import logging
from typing import Optional

try:
    from pythonosc import udp_client
    _OSC_AVAILABLE = True
except ImportError:
    _OSC_AVAILABLE = False
    print(
        "[field_render] WARNING: python-osc not installed. OSC output disabled.\n"
        "[field_render]   pip install python-osc",
        file=sys.stderr,
    )


# ─────────────────────────────────────────────────────────────────────────────
# Mode constants  (index = MovieMode.dim in Movie.lean)
# ─────────────────────────────────────────────────────────────────────────────

MODE_NAMES = [
    "safety",     # dim 0 — ventral vagal, regulated
    "fear",       # dim 1 — threat mobilisation
    "curiosity",  # dim 2 — approach, exploration
    "awe",        # dim 3 — threshold-adjacent wonder
    "grief",      # dim 4 — loss, parasympathetic collapse
    "language",   # dim 5 — symbolic, narrative
    "preverbal",  # dim 6 — deepest, somatic, oldest
    "shame",      # dim 7 — social evaluation, self-concealment
]


# ─────────────────────────────────────────────────────────────────────────────
# Field energy  (simplified diagonal W: H(e) = -½ Σᵢ eᵢ²)
# ─────────────────────────────────────────────────────────────────────────────

def field_energy(e: list[float]) -> float:
    """Scalar field energy — deeper attractors yield more negative H."""
    return -0.5 * sum(x * x for x in e)


# ─────────────────────────────────────────────────────────────────────────────
# Mandelbulb parameter mapping
# Each parameter drives a different axis of the 3D fractal.
# ─────────────────────────────────────────────────────────────────────────────

def mandelbulb_params(e: list[float]) -> dict[str, float]:
    """
    Map 8-dim score activation to Mandelbulb fractal control parameters.

    Aesthetic intent:
      - Awe     → power ↑   (complex, elaborate fractal topology)
      - Safety  → bailout ↑ (stable, contained — fractal doesn't escape)
      - Fear    → bailout ↓ (edges sharp, escape fast)
      - Grief   → theta     (angular offset — rotation toward darkness)
      - Language vs Preverbal → phi (symbolic order vs deep somatic)
      - Curiosity → speed   (animation rate)
      - Shame   → contraction (folding inward)
    """
    if len(e) < 8:
        e = list(e) + [0.0] * (8 - len(e))

    safety, fear, curiosity, awe, grief, language, preverbal, shame = e[:8]

    return {
        "power":   2.0 + awe * 4.0 + (1.0 - safety) * 2.0,         # [2, 8]
        "bailout": 2.0 + safety * 3.0 + (1.0 - fear) * 1.0,        # [2, 6]
        "theta":   grief * math.pi,                                  # [0, π]
        "phi":     language * math.pi + preverbal * math.pi,        # [0, 2π]
        "speed":   curiosity,                                        # [0, 1]
        "shame":   shame,                                            # [0, 1]
    }


# ─────────────────────────────────────────────────────────────────────────────
# Main renderer
# ─────────────────────────────────────────────────────────────────────────────

class MovieRenderer:
    """
    Reads RenderFrame JSON lines from a stream and dispatches to OSC targets.
    Designed to be piped from Lean's serverLoop stdout.
    """

    def __init__(
        self,
        ableton_host: str = "127.0.0.1", ableton_port: int = 9000,
        td_host: str = "127.0.0.1",      td_port: int = 9001,
        forward_host: str = "127.0.0.1", forward_port: Optional[int] = None,
        verbose: bool = False,
        biofeedback: bool = False,
    ):
        self.verbose     = verbose
        self.biofeedback = biofeedback
        self._ab: Optional[object] = None
        self._td: Optional[object] = None
        self._fwd: Optional[object] = None  # Control Post forward target

        if _OSC_AVAILABLE:
            self._ab = udp_client.SimpleUDPClient(ableton_host, ableton_port)
            self._td = udp_client.SimpleUDPClient(td_host,      td_port)
            logging.info(f"OSC → Ableton       {ableton_host}:{ableton_port}")
            logging.info(f"OSC → TouchDesigner {td_host}:{td_port}")
            if forward_port is not None:
                self._fwd = udp_client.SimpleUDPClient(forward_host, forward_port)
                logging.info(f"OSC → Control Post  {forward_host}:{forward_port}")
        else:
            logging.warning("OSC unavailable — running in log-only mode")

    # ── OSC send helpers ───────────────────────────────────────────────────

    def _ab(self, addr: str, val) -> None:
        if self._ab:
            self._ab.send_message(addr, val)

    def _td(self, addr: str, val) -> None:
        if self._td:
            self._td.send_message(addr, val)

    def _both(self, addr: str, val) -> None:
        if self._ab:
            self._ab.send_message(addr, val)
        if self._td:
            self._td.send_message(addr, val)

    # ── per-frame dispatch ─────────────────────────────────────────────────

    def render_frame(self, frame: dict) -> None:
        t      = float(frame.get("t", 0.0))
        e      = [float(x) for x in frame.get("e", [])]
        v      = [float(x) for x in frame.get("v", [])]
        thresh = frame.get("threshold")   # None, "null" string, or basin name
        tick   = int(frame.get("tick", 0))

        # Normalise sentinel values from Lean JSON formatter
        if thresh in (None, "null", ""):
            thresh = None

        # Pad to 8 if Lean sent fewer
        while len(e) < 8:
            e.append(0.0)
        while len(v) < 8:
            v.append(0.0)

        # ── /movie/ namespace ─────────────────────────────────────────────
        self._both("/movie/t",            t)
        self._both("/movie/tick",         tick)
        self._both("/movie/at_threshold", 1 if thresh else 0)
        if self._td:
            self._td.send_message("/movie/threshold", thresh or "none")

        for i, name in enumerate(MODE_NAMES):
            self._both(f"/movie/e/{name}", e[i])
            # Forward to Control Post for landscape computation
            if self._fwd:
                self._fwd.send_message(f"/movie/e/{name}", e[i])
        if self._fwd:
            self._fwd.send_message("/movie/t", t)

        # ── /field/ bridge — compatible with existing Ableton patches ─────
        H = field_energy(e)
        self._both("/field/H", H)
        for i in range(8):
            self._both(f"/field/e/{i}/somatic",   e[i])
            self._both(f"/field/e/{i}/cognitive",  v[i])  # viewer field (zeros until GAP-MOVIE-2)

        # ── Mandelbulb params — TouchDesigner only ────────────────────────
        mb = mandelbulb_params(e)
        for key, val in mb.items():
            if self._td:
                self._td.send_message(f"/movie/mandelbulb/{key}", val)

        # ── Biofeedback output (GAP-MOVIE-2 hook) ─────────────────────────
        # When --biofeedback is set, write estimated e_V to stdout.
        # Lean will read this from stdin once GAP-MOVIE-6 is resolved.
        # Currently: echo back the viewer field unchanged (placeholder).
        if self.biofeedback:
            fb = json.dumps({"e_V": v})
            print(fb, flush=True)

        if self.verbose:
            thresh_str = thresh or "—"
            awe_s  = f"awe={e[3]:.2f}"
            safe_s = f"safety={e[0]:.2f}"
            lang_s = f"lang={e[5]:.2f}"
            pv_s   = f"pv={e[6]:.2f}"
            print(
                f"  t={t:.3f}  {awe_s}  {safe_s}  {lang_s}  {pv_s}"
                f"  thresh={thresh_str}  H={H:.3f}",
                flush=True,
            )

    # ── main read loop ─────────────────────────────────────────────────────

    def run(self, stream=sys.stdin) -> int:
        """
        Read JSON lines from stream until EOF or Lean's completion sentinel.
        Returns final tick count.
        """
        tick_count = 0
        frames     = 0

        for raw in stream:
            raw = raw.strip()
            if not raw:
                continue

            try:
                msg = json.loads(raw)
            except json.JSONDecodeError as exc:
                logging.warning(f"JSON parse error: {exc}  raw={raw!r}")
                continue

            # Completion sentinel: {"status":"complete","ticks":N}
            if "status" in msg:
                tick_count = int(msg.get("ticks", tick_count))
                logging.info(f"Movie complete. {frames} frames, {tick_count} ticks.")
                break

            self.render_frame(msg)
            tick_count = int(msg.get("tick", tick_count))
            frames += 1

        return tick_count


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="field_render.py — Lean abstract movie → OSC bridge",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Pipe from Lean (once Movie.lean has a main entry point):
  lake exe Movie | python instrument/field_render.py --verbose

  # Replay a saved JSON session log:
  cat session.jsonl | python instrument/field_render.py

  # Single-frame smoke test:
  echo '{"t":0.52,"e":[0.2,0.7,0.5,0.4,0.3,0.3,0.5,0.0],"v":[],"threshold":"awe-onset","tick":26}' \\
    | python instrument/field_render.py --verbose

  # Remote Ableton / TouchDesigner:
  lake exe Movie | python instrument/field_render.py --ableton-host 192.168.1.10 --td-host 192.168.1.11
""",
    )
    parser.add_argument("--ableton-host", default="127.0.0.1",
                        help="Ableton Live OSC host (default: 127.0.0.1)")
    parser.add_argument("--ableton-port", type=int, default=9000,
                        help="Ableton Live OSC port (default: 9000)")
    parser.add_argument("--td-host",      default="127.0.0.1",
                        help="TouchDesigner OSC host (default: 127.0.0.1)")
    parser.add_argument("--td-port",      type=int, default=9001,
                        help="TouchDesigner OSC port (default: 9001)")
    parser.add_argument("--forward-host", default="127.0.0.1",
                        help="Control Post OSC host for forwarding (default: 127.0.0.1)")
    parser.add_argument("--forward-port", type=int, default=None,
                        help="Forward /movie/* to this port for control_post.py (default: off)")
    parser.add_argument("--verbose", "-v", action="store_true",
                        help="Print per-frame summary to stderr")
    parser.add_argument("--biofeedback", action="store_true",
                        help="Write e_V estimates to stdout (GAP-MOVIE-2 hook)")
    parser.add_argument("--log-level",   default="INFO",
                        choices=["DEBUG", "INFO", "WARNING", "ERROR"])

    args = parser.parse_args()

    logging.basicConfig(
        level=getattr(logging, args.log_level),
        format="[field_render] %(levelname)s %(message)s",
        stream=sys.stderr,
    )

    renderer = MovieRenderer(
        ableton_host=args.ableton_host, ableton_port=args.ableton_port,
        td_host=args.td_host,           td_port=args.td_port,
        forward_host=args.forward_host, forward_port=args.forward_port,
        verbose=args.verbose,
        biofeedback=args.biofeedback,
    )

    logging.info("Ready — reading RenderFrame JSON from stdin")
    ticks = renderer.run(sys.stdin)
    logging.info(f"Done. {ticks} ticks processed.")


if __name__ == "__main__":
    main()
