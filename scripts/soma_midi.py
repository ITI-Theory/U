#!/usr/bin/env python3
"""
soma_midi.py — Soma-Field ↔ MIDI bridge for Ableton Live (or any DAW)

Runs the 8-dimensional BRECVEMA Hopfield field internally and streams each
activation dimension as a MIDI Continuous Controller.  Also accepts CC input
to override field activations in real time (bidirectional).

CC assignment (channel 1)
──────────────────────────
  CC 20  BrainStem              (BS)  dim 0
  CC 21  RhythmicEntrainment    (RE)  dim 1
  CC 22  EvaluativeConditioning (EC)  dim 2
  CC 23  Contagion              (CO)  dim 3
  CC 24  VisualImagery          (VI)  dim 4
  CC 25  EpisodicMemory         (EM)  dim 5
  CC 26  MusicalExpectancy      (ME)  dim 6
  CC 27  AestheticJudgement     (AJ)  dim 7
  CC 28  Energy H (normalised, higher = more stable / lower energy)
  CC 29  Dominant dim index  × 18  (0, 18, 36 … 126 → dims 0-7)

Note-on / note-off  (channel 1, velocity = confidence 0-127)
──────────────────────────────────────────────────────────────
  C4  (60)  nostalgia attractor   (EM dominant)
  D4  (62)  startle attractor     (BS dominant)
  E4  (64)  musical-awe attractor (ME dominant)
  F4  (65)  entrainment attractor (RE dominant)

MIDI input (control)
─────────────────────
  CC 20-27 on ch 1 → override the corresponding field dimension
  CC 30    on ch 1 → reset to initial pattern (value 0-31 per pattern)
  CC 31    on ch 1 → freeze/unfreeze dynamics (value ≥ 64 = freeze)

Setup on Windows
─────────────────
  1. Install loopMIDI (https://www.tobias-erichsen.de/software/loopmidi.html)
  2. Create a virtual port called e.g. "SomaField"
  3. In Ableton: External Instrument / MIDI From → SomaField
  4. python scripts/soma_midi.py --list-ports
  5. python scripts/soma_midi.py --play nostalgia --port "SomaField"

OSC note (for visual software — TouchDesigner, Max/MSP, Processing)
─────────────────────────────────────────────────────────────────────
  Add --osc-host 127.0.0.1 --osc-port 8000 to also stream activations
  as OSC bundles  /soma/dim/<0-7>  and  /soma/energy.
  Requires: pip install python-osc  (optional; gracefully skipped if absent)

Usage
──────
  python scripts/soma_midi.py --list-ports
  python scripts/soma_midi.py --play nostalgia     --port "SomaField"
  python scripts/soma_midi.py --play startle        --steps 80
  python scripts/soma_midi.py --live               --port "SomaField"
  python scripts/soma_midi.py --dry-run            --play nostalgia   # no MIDI
  python scripts/soma_midi.py --play nostalgia --osc-host 127.0.0.1 --osc-port 8000
"""

from __future__ import annotations

import argparse
import sys
import time
import threading
from typing import Optional

import numpy as np

# ── Field dynamics (Python mirror of SomaField.lean) ────────────────────────

N8 = 8

DIM_NAMES = ["BS", "RE", "EC", "CO", "VI", "EM", "ME", "AJ"]

_COUPLINGS = {
    (0, 2):  0.3,   # BS ↔ EC
    (0, 3):  0.4,   # BS ↔ CO
    (1, 3):  0.5,   # RE ↔ CO
    (2, 3):  0.4,   # EC ↔ CO
    (4, 5):  0.6,   # VI ↔ EM
    (6, 7):  0.7,   # ME ↔ AJ
    (0, 7): -0.4,   # BS ↔ AJ  (reflexive inhibits reflective)
    (2, 4): -0.3,   # EC ↔ VI  (involuntary inhibits voluntary)
}

def W8(i: int, j: int) -> float:
    if i == j:
        return 1.2
    return _COUPLINGS.get((min(i, j), max(i, j)), 0.0)

# Build matrix once
W_MAT = np.array([[W8(i, j) for j in range(N8)] for i in range(N8)])

def energy(e: np.ndarray) -> float:
    return float(-0.5 * e @ W_MAT @ e)

def step(e: np.ndarray, dt: float = 0.05) -> np.ndarray:
    return e + dt * (W_MAT @ e)

def run(e0: np.ndarray, dt: float, n: int) -> list[np.ndarray]:
    """Return list of field states for steps 0..n."""
    states = [e0.copy()]
    e = e0.copy()
    for _ in range(n):
        e = step(e, dt)
        states.append(e.copy())
    return states

# ── Named initial patterns ────────────────────────────────────────────────────

def _pat(*pairs) -> np.ndarray:
    e = np.zeros(N8)
    for i, v in pairs:
        e[i] = v
    return e

PATTERNS = {
    "nostalgia":   _pat((5, 1.0), (4, 0.6), (6, -0.4), (7, -0.4)),
    "startle":     _pat((0, 1.0), (2, 0.4), (3, 0.3),  (7, -0.6)),
    "musicalAwe":  _pat((6, 1.0), (7, 0.8), (3, 0.4),  (0, -0.5)),
    "entrainment": _pat((1, 1.0), (3, 0.5), (0, -0.3)),
}

# Each attractor → (MIDI note, dominant dim)
ATTRACTOR_NOTES = {
    "nostalgia":   (60, 5),   # C4, EM
    "startle":     (62, 0),   # D4, BS
    "musicalAwe":  (64, 6),   # E4, ME
    "entrainment": (65, 1),   # F4, RE
}

def dominant_pattern(e: np.ndarray) -> Optional[str]:
    """Return the name of the closest stored attractor (cosine sim > 0.85)."""
    best_name, best_sim = None, 0.85
    for name, pat in PATTERNS.items():
        n1, n2 = np.linalg.norm(e), np.linalg.norm(pat)
        if n1 < 1e-6 or n2 < 1e-6:
            continue
        sim = float(e @ pat) / (n1 * n2)
        if sim > best_sim:
            best_sim, best_name = sim, name
    return best_name

# ── MIDI scaling ──────────────────────────────────────────────────────────────

CC_BASE   = 20   # CC 20-27 → dims 0-7
CC_ENERGY = 28
CC_DOM    = 29
CHANNEL   = 0    # mido uses 0-based channels (channel 1 in DAW = 0 here)

# Field activations are roughly in [-2, 2].  Map to CC 0-127.
_ACT_MIN, _ACT_MAX = -2.0, 2.0

def to_cc(x: float) -> int:
    cc = int((x - _ACT_MIN) / (_ACT_MAX - _ACT_MIN) * 127)
    return max(0, min(127, cc))

# Energy is negative; more negative = more stable.
# Map [-8, 0] → [127, 0]  (lower energy = higher CC = "more active")
_H_MIN = -8.0

def energy_to_cc(h: float) -> int:
    cc = int((h - _H_MIN) / (0.0 - _H_MIN) * 127)
    return max(0, min(127, cc))

# ── MIDI helpers ─────────────────────────────────────────────────────────────

def _try_import_mido():
    try:
        import mido
        return mido
    except ImportError:
        print("mido not found.  Run:  pip install mido python-rtmidi", file=sys.stderr)
        sys.exit(1)

def _try_import_osc():
    try:
        from pythonosc import udp_client
        return udp_client
    except ImportError:
        return None

def list_ports():
    mido = _try_import_mido()
    print("Output ports:")
    for p in mido.get_output_names():
        print(f"  {p!r}")
    print("Input ports:")
    for p in mido.get_input_names():
        print(f"  {p!r}")

def _open_output(mido, port_name: Optional[str]):
    if port_name is None:
        ports = mido.get_output_names()
        if not ports:
            raise RuntimeError("No MIDI output ports found.  Use loopMIDI on Windows.")
        port_name = ports[0]
        print(f"[soma_midi] Using output port: {port_name!r}")
    return mido.open_output(port_name)

def _open_input(mido, port_name: Optional[str]):
    if port_name is None:
        ports = mido.get_input_names()
        if not ports:
            return None
        port_name = ports[0]
    try:
        return mido.open_input(port_name)
    except Exception:
        return None

# ── OSC helpers ───────────────────────────────────────────────────────────────

def _make_osc_client(host: Optional[str], port: Optional[int]):
    if host is None:
        return None
    udp_client = _try_import_osc()
    if udp_client is None:
        print("[soma_midi] python-osc not found — OSC disabled.  "
              "pip install python-osc", file=sys.stderr)
        return None
    return udp_client.SimpleUDPClient(host, port)

def _send_osc(client, e: np.ndarray, h: float):
    if client is None:
        return
    try:
        from pythonosc.osc_bundle_builder import OscBundleBuilder
        from pythonosc.osc_message_builder import OscMessageBuilder
        import pythonosc.osc_bundle_builder as bbb
        builder = OscBundleBuilder(bbb.IMMEDIATELY)
        for i, v in enumerate(e):
            msg = OscMessageBuilder(f"/soma/dim/{i}")
            msg.add_arg(float(v))
            builder.add_content(msg.build())
        msg = OscMessageBuilder("/soma/energy")
        msg.add_arg(float(h))
        builder.add_content(msg.build())
        client.send(builder.build())
    except Exception:
        # Fallback: send individual messages
        for i, v in enumerate(e):
            client.send_message(f"/soma/dim/{i}", float(v))
        client.send_message("/soma/energy", float(h))

# ── Field state (shared between input listener and dynamics loop) ─────────────

class SharedField:
    def __init__(self, e0: np.ndarray):
        self._e    = e0.copy()
        self._lock = threading.Lock()
        self.frozen = False
        self.override = [None] * N8   # None = no override; float = set dim

    def get(self) -> np.ndarray:
        with self._lock:
            e = self._e.copy()
        return e

    def set(self, e: np.ndarray):
        with self._lock:
            self._e = e.copy()

    def apply_overrides(self, e: np.ndarray) -> np.ndarray:
        with self._lock:
            for i, v in enumerate(self.override):
                if v is not None:
                    e[i] = v
        return e

    def set_override(self, dim: int, v: float):
        with self._lock:
            self.override[dim] = v

    def clear_override(self, dim: int):
        with self._lock:
            self.override[dim] = None

# ── MIDI input listener ───────────────────────────────────────────────────────

def _midi_input_thread(midi_in, shared: SharedField, patterns):
    """Background thread: process incoming CC messages."""
    if midi_in is None:
        return
    for msg in midi_in:
        if msg.type == "control_change" and msg.channel == CHANNEL:
            cc, val = msg.control, msg.value
            if CC_BASE <= cc < CC_BASE + N8:
                # Override a field dimension
                dim = cc - CC_BASE
                # Map 0-127 → _ACT_MIN.._ACT_MAX
                act = _ACT_MIN + (val / 127.0) * (_ACT_MAX - _ACT_MIN)
                shared.set_override(dim, act)
                print(f"[CC in] dim {DIM_NAMES[dim]} ← {act:.2f}", flush=True)
            elif cc == 30:
                # Reset to a pattern (0-31 per pattern group)
                idx = val // (128 // len(patterns))
                name = list(patterns.keys())[min(idx, len(patterns) - 1)]
                shared.set(patterns[name].copy())
                for d in range(N8):
                    shared.clear_override(d)
                print(f"[CC in] reset → {name}", flush=True)
            elif cc == 31:
                shared.frozen = val >= 64
                print(f"[CC in] {'frozen' if shared.frozen else 'running'}", flush=True)

# ── Play mode: run a trajectory, stream CC ───────────────────────────────────

def play_mode(args, mido, osc_client):
    pat_name = args.play
    if pat_name not in PATTERNS:
        print(f"Unknown pattern {pat_name!r}.  Choices: {list(PATTERNS)}", file=sys.stderr)
        sys.exit(1)

    e0     = PATTERNS[pat_name].copy()
    states = run(e0, args.dt, args.steps)

    port_out = None if args.dry_run else _open_output(mido, args.port)
    midi_in  = None
    if not args.dry_run and args.port:
        try:
            midi_in = _open_input(mido, args.port)
        except Exception:
            pass

    shared        = SharedField(e0)
    prev_attractor = None

    if midi_in:
        t = threading.Thread(
            target=_midi_input_thread, args=(midi_in, shared, PATTERNS), daemon=True)
        t.start()

    step_ms = 60.0 / args.bpm  # one field step per beat subdivision

    print(f"[soma_midi] Playing '{pat_name}' — {args.steps} steps, dt={args.dt}, "
          f"bpm={args.bpm}, {'DRY RUN' if args.dry_run else f'port={args.port!r}'}")
    print(f"           CC {CC_BASE}-{CC_BASE+7} → {', '.join(DIM_NAMES)}")

    for idx, e in enumerate(states):
        h   = energy(e)
        att = dominant_pattern(e)

        if not args.dry_run and port_out is not None:
            msgs = []
            for dim in range(N8):
                msgs.append(mido.Message("control_change",
                    channel=CHANNEL, control=CC_BASE + dim, value=to_cc(e[dim])))
            msgs.append(mido.Message("control_change",
                channel=CHANNEL, control=CC_ENERGY, value=energy_to_cc(h)))
            dom_dim = int(np.argmax(np.abs(e)))
            msgs.append(mido.Message("control_change",
                channel=CHANNEL, control=CC_DOM, value=dom_dim * 18))

            # Attractor note events
            if att != prev_attractor:
                if prev_attractor is not None:
                    note = ATTRACTOR_NOTES[prev_attractor][0]
                    msgs.append(mido.Message("note_off",
                        channel=CHANNEL, note=note, velocity=0))
                if att is not None:
                    confidence = int(abs(h) / 8.0 * 127)
                    note = ATTRACTOR_NOTES[att][0]
                    msgs.append(mido.Message("note_on",
                        channel=CHANNEL, note=note, velocity=max(1, confidence)))
            prev_attractor = att

            for msg in msgs:
                port_out.send(msg)

        _send_osc(osc_client, e, h)

        # Console readout every 5 steps
        if idx % 5 == 0:
            bar = "  ".join(f"{DIM_NAMES[d]}={e[d]:+.2f}" for d in range(N8))
            print(f"  t={idx:03d}  {bar}  H={h:.3f}  att={att or '-'}", flush=True)

        time.sleep(step_ms)

    if port_out is not None:
        port_out.close()
    if midi_in is not None:
        midi_in.close()

# ── Live mode: continuous dynamics with MIDI I/O ──────────────────────────────

def live_mode(args, mido, osc_client):
    e        = np.zeros(N8)
    shared   = SharedField(e)
    port_out = None if args.dry_run else _open_output(mido, args.port)
    midi_in  = None
    if not args.dry_run:
        try:
            midi_in = _open_input(mido, args.port)
        except Exception:
            pass

    if midi_in:
        t = threading.Thread(
            target=_midi_input_thread, args=(midi_in, shared, PATTERNS), daemon=True)
        t.start()

    step_ms      = 60.0 / args.bpm
    prev_attractor = None

    print("[soma_midi] Live mode — use CC 20-27 on ch 1 to inject activations.")
    print("            CC 30 = reset to pattern, CC 31 ≥ 64 = freeze.")
    print("            Ctrl-C to stop.\n")

    try:
        while True:
            if not shared.frozen:
                e = shared.get()
                e = shared.apply_overrides(e)
                e = step(e, args.dt)
                shared.set(e)

            h   = energy(e)
            att = dominant_pattern(e)

            if not args.dry_run and port_out is not None:
                for dim in range(N8):
                    port_out.send(mido.Message("control_change",
                        channel=CHANNEL, control=CC_BASE + dim, value=to_cc(e[dim])))
                port_out.send(mido.Message("control_change",
                    channel=CHANNEL, control=CC_ENERGY, value=energy_to_cc(h)))
                dom_dim = int(np.argmax(np.abs(e)))
                port_out.send(mido.Message("control_change",
                    channel=CHANNEL, control=CC_DOM, value=dom_dim * 18))

                if att != prev_attractor:
                    if prev_attractor is not None:
                        port_out.send(mido.Message("note_off",
                            channel=CHANNEL, note=ATTRACTOR_NOTES[prev_attractor][0], velocity=0))
                    if att is not None:
                        conf = int(min(abs(h) / 8.0, 1.0) * 127)
                        port_out.send(mido.Message("note_on",
                            channel=CHANNEL, note=ATTRACTOR_NOTES[att][0],
                            velocity=max(1, conf)))
                prev_attractor = att

            _send_osc(osc_client, e, h)
            time.sleep(step_ms)

    except KeyboardInterrupt:
        print("\n[soma_midi] Stopped.")
    finally:
        if port_out is not None:
            # Send all-notes-off
            for ch in range(16):
                port_out.send(mido.Message("control_change",
                    channel=ch, control=123, value=0))
            port_out.close()
        if midi_in is not None:
            midi_in.close()

# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(
        description="Soma-Field → MIDI bridge for Ableton Live")
    ap.add_argument("--list-ports", action="store_true",
                    help="List available MIDI ports and exit")
    ap.add_argument("--play", metavar="PATTERN",
                    help=f"Run a stored pattern trajectory.  Choices: {list(PATTERNS)}")
    ap.add_argument("--live", action="store_true",
                    help="Continuous live mode (Ctrl-C to stop)")
    ap.add_argument("--port", metavar="NAME",
                    help="MIDI port name (from --list-ports)")
    ap.add_argument("--steps", type=int, default=60,
                    help="Number of field steps in --play mode (default 60)")
    ap.add_argument("--dt", type=float, default=0.05,
                    help="Langevin dt (default 0.05)")
    ap.add_argument("--bpm", type=float, default=120.0,
                    help="Tempo for MIDI clock (default 120 BPM)")
    ap.add_argument("--dry-run", action="store_true",
                    help="Print output without sending MIDI")
    ap.add_argument("--osc-host", metavar="HOST",
                    help="OSC host for visual software (e.g. TouchDesigner)")
    ap.add_argument("--osc-port", type=int, default=8000,
                    help="OSC port (default 8000)")
    args = ap.parse_args()

    mido = _try_import_mido() if not args.dry_run or args.list_ports else None
    if args.dry_run:
        # Provide a minimal mido stub for dry-run
        class _FakeMido:
            class Message:
                def __init__(self, *a, **kw): pass
            @staticmethod
            def get_output_names(): return []
            @staticmethod
            def get_input_names(): return []
        mido = _FakeMido()

    osc_client = _make_osc_client(args.osc_host, args.osc_port)

    if args.list_ports:
        list_ports()
        return

    if args.play:
        play_mode(args, mido, osc_client)
    elif args.live:
        live_mode(args, mido, osc_client)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
