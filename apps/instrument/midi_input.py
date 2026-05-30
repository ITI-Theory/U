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


# Callback type — use DWORD (32-bit) for param1/param2; the MIDI message
# payload sits in the low 24 bits and 32-bit extraction is proven to work
# on Windows x64 with WinMM.  Using c_size_t (64-bit) silently breaks.
MIDIINPROC = WINFUNCTYPE(None, wt.HANDLE, wt.UINT,
                         ctypes.POINTER(ctypes.c_ulong), wt.DWORD, wt.DWORD)


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


def _find_port_indices(port_name: str) -> list[int]:
    """Return indices of ALL ports whose name contains port_name (case-insensitive)."""
    ports = list_ports()
    indices = [i for i, name in enumerate(ports)
               if port_name.lower() in name.lower()]
    if not indices:
        raise ValueError(
            f"MIDI port {port_name!r} not found.\nAvailable ports:\n"
            + "\n".join(f"  [{i}] {p}" for i, p in enumerate(ports))
        )
    return indices


def midi_to_float(value: int) -> float:
    return value / 127.0


# Module-level store — ctypes callbacks MUST remain referenced here or the GC
# can collect them even if stored as instance attributes.
_active_callbacks: list = []


# ---------------------------------------------------------------------------
# MidiInput class
# ---------------------------------------------------------------------------

class MidiInput:
    def __init__(self, port_name: str, on_update: Callable):
        """
        port_name : substring to match against port names — ALL matching ports
                    are opened simultaneously (handles two identical devices).
        on_update : callback(cc: int, value: float) for each CC message
        """
        self.port_name = port_name
        self.on_update = on_update
        self._handles: list = []   # one HANDLE per opened port

    @staticmethod
    def list_ports() -> list[str]:
        return list_ports()

    def start(self):
        indices = _find_port_indices(self.port_name)
        ports   = list_ports()

        def _callback(hmidi, msg, instance, param1, param2):
            if msg == MIM_DATA:
                status = param1 & 0xFF
                if (status & 0xF0) == 0xB0:          # Control Change
                    ch  = (status & 0x0F) + 1        # 1-indexed MIDI channel
                    cc  = (param1 >> 8)  & 0x7F
                    val = (param1 >> 16) & 0x7F
                    if ch == 2:
                        cc += 8
                    self.on_update(cc, midi_to_float(val))

        # One WINFUNCTYPE wrapper — shared across all port handles.
        # Must stay referenced for the lifetime of the object.
        cb = MIDIINPROC(_callback)
        _active_callbacks.append(cb)

        for idx in indices:
            handle = wt.HANDLE(0)
            ret = winmm.midiInOpen(byref(handle), idx,
                                   cb, 0, CALLBACK_FUNCTION)
            if ret != MMSYSERR_NOERROR:
                print(f"WARN: midiInOpen failed for [{idx}] {ports[idx]!r} (rc={ret})")
                continue
            winmm.midiInStart(handle)
            self._handles.append(handle)
            print(f"MIDI input open: [{idx}] {ports[idx]!r}")

        if not self._handles:
            raise RuntimeError("Failed to open any MIDI input port.")

    def stop(self):
        for handle in self._handles:
            winmm.midiInStop(handle)
            winmm.midiInClose(handle)
        print(f"MIDI input closed ({len(self._handles)} port(s)).")
        self._handles.clear()

