"""
midi_diag.py -- MIDI port diagnostic
Listens on EVERY available input port at once and prints any CC message.
Run this, turn a Twister encoder, and see which port(s) receive the signal.

Usage:  python midi_diag.py
"""
import ctypes
import ctypes.wintypes
import time
import sys

winmm = ctypes.windll.winmm

# ── list ports ──────────────────────────────────────────────────────────────
n_ports = winmm.midiInGetNumDevs()
if n_ports == 0:
    print("No MIDI input ports found.")
    sys.exit(1)

print(f"Found {n_ports} MIDI input port(s):\n")

class MIDIINCAPS(ctypes.Structure):
    _fields_ = [
        ("wMid",           ctypes.wintypes.WORD),
        ("wPid",           ctypes.wintypes.WORD),
        ("vDriverVersion", ctypes.c_uint),
        ("szPname",        ctypes.c_wchar * 32),
        ("dwSupport",      ctypes.wintypes.DWORD),
    ]

port_names = []
for i in range(n_ports):
    caps = MIDIINCAPS()
    winmm.midiInGetDevCapsW(i, ctypes.byref(caps), ctypes.sizeof(caps))
    port_names.append(caps.szPname)
    print(f"  [{i}] {caps.szPname}")

print()

# ── open all ports ───────────────────────────────────────────────────────────
CALLBACK_FUNCTION = 0x00030000
MIM_DATA          = 0x3C3

handles = []
received = []

MIDIINPROC = ctypes.WINFUNCTYPE(
    None,
    ctypes.wintypes.HANDLE,
    ctypes.wintypes.UINT,
    ctypes.POINTER(ctypes.c_ulong),
    ctypes.wintypes.DWORD,
    ctypes.wintypes.DWORD,
)

def make_callback(port_idx, port_name):
    def cb(hmi, msg, instance, param1, param2):
        if msg == MIM_DATA:
            status = param1 & 0xFF
            data1  = (param1 >> 8)  & 0xFF
            data2  = (param1 >> 16) & 0xFF
            ch     = (status & 0x0F) + 1
            kind   = status & 0xF0
            if kind == 0xB0:  # CC
                received.append((port_idx, port_name, ch, data1, data2))
                val = round(data2 / 127, 3)
                print(f"  PORT [{port_idx}] {port_name:<30}  CC {data1:>3d}  val={val:.3f}  (ch {ch})",
                      flush=True)
    return cb

callbacks = []
for i, name in enumerate(port_names):
    cb   = make_callback(i, name)
    proc = MIDIINPROC(cb)
    callbacks.append(proc)  # keep reference alive

    handle = ctypes.wintypes.HANDLE()
    rc = winmm.midiInOpen(
        ctypes.byref(handle),
        i,
        proc,
        None,
        CALLBACK_FUNCTION,
    )
    if rc == 0:
        winmm.midiInStart(handle)
        handles.append(handle)
        print(f"  Listening on [{i}] {name}")
    else:
        print(f"  WARN: could not open [{i}] {name}  (rc={rc:#x})")

print()
print("Turn a Twister encoder now. Ctrl+C to quit.\n")

try:
    while True:
        time.sleep(0.1)
except KeyboardInterrupt:
    pass
finally:
    for h in handles:
        winmm.midiInStop(h)
        winmm.midiInClose(h)
    print(f"\nTotal CC events received: {len(received)}")
