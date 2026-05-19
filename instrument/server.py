"""
server.py — Soma-Field Instrument main loop

Usage:
    python server.py [--midi "Bome Virtual Port 1"] [--rate 50]

Connects all components:
  MidiInput  → field state updates
  SomaField  → Langevin dynamics at --rate Hz
  OscOutput  → Ableton + TouchDesigner
  SessionLogger → timestamped JSON lines log

Press Ctrl+C to stop and save the session log.
"""

import argparse
import time
import sys
import signal

from field     import SomaField, N_MODES, ATTRACTORS
from modifiers import build_params
from midi_input import MidiInput, list_ports as midi_list_ports
from osc_output import OscOutput
from logger     import SessionLogger


# ---------------------------------------------------------------------------
# CC → field parameter routing (matches DESIGN.md §4)
# ---------------------------------------------------------------------------

def make_cc_handler(field: SomaField, params_ref: dict):
    """Return a closure that routes CC messages to field state."""
    def on_cc(cc: int, value: float):
        # Somatic: CCs 1-8 → modes 0-7
        if 1 <= cc <= 8:
            field.set_somatic(cc - 1, value)

        # Cognitive: CCs 9-16 → modes 0-7
        elif 9 <= cc <= 16:
            field.set_cognitive(cc - 9, value)

        # Field parameters
        elif cc == 17:
            field.gamma = 0.1 + value * 3.9          # range [0.1, 4.0]
        elif cc == 18:
            field.D     = value * 0.2                 # range [0, 0.2]
        elif cc == 20:
            field.theta = 0.3 + value * 0.6           # range [0.3, 0.9]

        # Neurotype modifiers (update params_ref, rebuild on next step)
        elif cc == 21:
            params_ref["cptsd"] = value
        elif cc == 22:
            params_ref["adhd"]  = value
        elif cc == 23:
            params_ref["asc"]   = value

    return on_cc


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Soma-Field Instrument server")
    parser.add_argument("--midi", default=None,
                        help="Bome virtual MIDI port name (default: list and exit)")
    parser.add_argument("--rate", type=float, default=50.0,
                        help="Field update rate in Hz (default: 50)")
    args = parser.parse_args()

    # List ports if no port specified
    if args.midi is None:
        ports = midi_list_ports()
        print("Available MIDI input ports:")
        for i, p in enumerate(ports):
            print(f"  [{i}] {p!r}")
        print("\nRe-run with --midi <substring of port name>")
        sys.exit(0)

    # Initialise components
    field      = SomaField(dt=1.0 / args.rate)
    params_ref = {}           # {modifier_name: strength} — updated by CC
    osc        = OscOutput()
    logger     = SessionLogger()

    midi = MidiInput(args.midi, make_cc_handler(field, params_ref))
    midi.start()

    dt     = 1.0 / args.rate
    step_n = 0

    def shutdown(sig=None, frame=None):
        print("\nShutting down...")
        midi.stop()
        logger.close()
        sys.exit(0)

    signal.signal(signal.SIGINT,  shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    print(f"Soma-Field server running at {args.rate:.0f} Hz. Ctrl+C to stop.")

    while True:
        t_start = time.perf_counter()

        # Apply neurotype modifiers to field parameters
        if params_ref:
            p = build_params(params_ref)
            field.gamma = p.gamma
            field.D     = p.D
            field.theta = p.theta

        # Step dynamics
        field.step()
        state = field.state_dict()

        # Output
        osc.send(state)
        logger.log(state)

        step_n += 1

        # Pace to target rate
        elapsed = time.perf_counter() - t_start
        sleep   = max(0.0, dt - elapsed)
        time.sleep(sleep)


if __name__ == "__main__":
    main()
