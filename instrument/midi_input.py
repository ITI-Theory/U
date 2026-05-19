"""
midi_input.py — Receive MIDI from Bome virtual port, update field state.

Expected CC mapping (matches DESIGN.md §4):
  Twister 1, encoders 1-8  → CC 1-8    somatic intensity, modes 0-7
  Twister 2, encoders 1-8  → CC 9-16   cognitive intensity, modes 0-7
  Twister 1, encoder 9     → CC 17     damping gamma
  Twister 1, encoder 10    → CC 18     noise temperature D
  Twister 1, encoder 11    → CC 19     global coupling
  Twister 1, encoder 12    → CC 20     perception threshold
  Twister 2, encoder 9     → CC 21     C-PTSD strength
  Twister 2, encoder 10    → CC 22     ADHD T_eff strength
  Twister 2, encoder 11    → CC 23     ASC coupling sparsity
  Twister 2, encoder 12    → CC 24     memory kernel depth

All CC values 0-127 → normalised to [0, 1].
"""

import mido
import threading
from typing import Callable


def midi_to_float(value: int) -> float:
    return value / 127.0


class MidiInput:
    def __init__(self, port_name: str, on_update: Callable):
        """
        port_name : name of the Bome virtual MIDI port
        on_update : callback(cc, value_float) called on each CC message
        """
        self.port_name = port_name
        self.on_update = on_update
        self._thread   = None
        self._running  = False

    def list_ports(self):
        return mido.get_input_names()

    def start(self):
        self._running = True
        self._thread  = threading.Thread(target=self._run, daemon=True)
        self._thread.start()
        print(f"MIDI input listening on: {self.port_name!r}")

    def stop(self):
        self._running = False

    def _run(self):
        try:
            with mido.open_input(self.port_name) as port:
                for msg in port:
                    if not self._running:
                        break
                    if msg.type == "control_change":
                        self.on_update(msg.control, midi_to_float(msg.value))
        except Exception as e:
            print(f"MIDI input error: {e}")
