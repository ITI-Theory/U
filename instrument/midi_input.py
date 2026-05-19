"""
midi_input.py — Receive MIDI from Bome virtual port, update field state.

Uses Windows winmm.dll via ctypes — no python-rtmidi / C++ compiler needed.

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

import ctypes
import ctypes.wintypes as wt
from ctypes import windll, WINFUNCTYPE, Structure, c_char, byref, sizeof
from typing import Callable


# ---------------------------------------------------------------------------
# winmm.dll type definitions
# ---------------------------------------------------------------------------

winmm = windll.winmm

MMSYSERR_NOERROR  = 0
CALLBACK_FUNCTION = 0x00030000
MIM_DATA          = 0x3C3


class MIDIINCAPS(Structure):
    _fields_ = [
        ("wMid",           wt.WORD),
        ("wPid",           wt.WORD),
        ("vDriverVersion", wt.UINT),
        ("szPname",        c_char * 32),
        ("dwSupport",      wt.DWORD),
    ]


# Callback type: void CALLBACK MidiInProc(HMIDIIN, UINT, DWORD_PTR, DWORD_PTR, DWORD_PTR)
MIDIINPROC = WINFUNCTYPE(None, wt.HANDLE, wt.UINT,
                         ctypes.c_void_p, ctypes.c_size_t, ctypes.c_size_t)


# ---------------------------------------------------------------------------
# Module-level helpers
# ---------------------------------------------------------------------------

def list_ports() -> list[str]:
    """Return names of all available MIDI input devices."""
    n = winmm.midiInGetNumDevs()
    names = []
    for i in range(n):
        caps = MIDIINCAPS()
        winmm.midiInGetDevCapsA(i, byref(caps), sizeof(caps))
        names.append(caps.szPname.decode("ascii", errors="replace").rstrip("\x00"))
    return names


def _find_port_index(port_name: str) -> int:
    ports = list_ports()
    for i, name in enumerate(ports):
        if port_name.lower() in name.lower():
            return i
    raise ValueError(
        f"MIDI port {port_name!r} not found.\nAvailable ports:\n"
        + "\n".join(f"  [{i}] {p}" for i, p in enumerate(ports))
    )


def midi_to_float(value: int) -> float:
    return value / 127.0


# ---------------------------------------------------------------------------
# MidiInput class
# ---------------------------------------------------------------------------

class MidiInput:
    def __init__(self, port_name: str, on_update: Callable):
        """
        port_name : substring of the Bome virtual MIDI port name
        on_update : callback(cc: int, value: float) for each CC message
        """
        self.port_name = port_name
        self.on_update = on_update
        self._handle   = wt.HANDLE(0)
        self._cb       = None   # keep callback alive (prevent GC)

    @staticmethod
    def list_ports() -> list[str]:
        return list_ports()

    def start(self):
        idx = _find_port_index(self.port_name)

        def _callback(hmidi, msg, instance, param1, param2):
            if msg == MIM_DATA:
                status = param1 & 0xFF
                if (status & 0xF0) == 0xB0:          # Control Change
                    cc  = (param1 >> 8)  & 0x7F
                    val = (param1 >> 16) & 0x7F
                    self.on_update(cc, midi_to_float(val))

        self._cb = MIDIINPROC(_callback)

        ret = winmm.midiInOpen(byref(self._handle), idx,
                               self._cb, 0, CALLBACK_FUNCTION)
        if ret != MMSYSERR_NOERROR:
            raise RuntimeError(f"midiInOpen failed with error code {ret}")

        winmm.midiInStart(self._handle)
        print(f"MIDI input open: [{idx}] {list_ports()[idx]!r}")

    def stop(self):
        winmm.midiInStop(self._handle)
        winmm.midiInClose(self._handle)
        print("MIDI input closed.")

