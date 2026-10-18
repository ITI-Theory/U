#!/usr/bin/env python3
"""test_soma.py: the Soma control script tested outside Live (ISS-118). Live's modules are faked: a set
with SSL Native Channel Strip 2 on a track and Softube Modular inside a rack on a return; the script is
fed CCs as the app's MIDI OUT sends them, and the parameters must move as rig.json says.

  python lib/audio/test_soma.py
"""

from __future__ import annotations

import json
import shutil
import sys
import tempfile
import types
from pathlib import Path

HERE = Path(__file__).parent


class Param:
    def __init__(self, name, lo=0.0, hi=1.0, quantized=False):
        self.name, self.min, self.max, self.is_quantized, self.value = name, lo, hi, quantized, lo


class Device:
    def __init__(self, name, params, chains=None):
        self.name, self.class_display_name = name, name
        self.parameters = [Param("Device On", 0, 1, True)] + params
        self.can_have_chains = chains is not None
        self.chains = chains or []


class Chain:
    def __init__(self, devices):
        self.devices = devices


class Track:
    def __init__(self, name, devices):
        self.name, self.devices = name, devices


def fake_live():
    live = types.ModuleType("Live")
    live.MidiMap = types.SimpleNamespace(forwarded=[], forward_midi_cc=lambda h, m, ch, cc: live.MidiMap.forwarded.append((ch, cc)))
    fw = types.ModuleType("_Framework")
    cs = types.ModuleType("_Framework.ControlSurface")

    class ControlSurface:
        def __init__(self, c_instance):
            self._c_instance, self.log, self.unhandled = c_instance, [], []

        def component_guard(self):
            import contextlib
            return contextlib.nullcontext()

        def log_message(self, m):
            self.log.append(m)

        def schedule_message(self, delay, fn):
            fn()

        def song(self):
            return self._c_instance.song

        def build_midi_map(self, h):
            pass

        def receive_midi(self, b):
            self.unhandled.append(b)

        def disconnect(self):
            pass

    cs.ControlSurface = ControlSurface
    sys.modules.update({"Live": live, "_Framework": fw, "_Framework.ControlSurface": cs})
    return live


def main() -> int:
    live = fake_live()
    strip = Device("SSL Native Channel Strip 2", [Param("Input Trim", -20, 20), Param("Compressor Threshold", -20, 10), Param("LF Low Gain", -16.5, 16.5)])
    modular = Device("Modular", [Param("Macro 1"), Param("Macro 2")])
    rack = Device("Audio Effect Rack", [], chains=[Chain([modular])])
    song = types.SimpleNamespace(tracks=[Track("Vox", [strip])], return_tracks=[Track("A-Reverb", [rack])], master_track=Track("Master", []),
                                 add_tracks_listener=lambda f: None, remove_tracks_listener=lambda f: None)
    c_instance = types.SimpleNamespace(song=song, handle=lambda: 1)
    with tempfile.TemporaryDirectory() as d:
        pkg = Path(d) / "Soma"
        shutil.copytree(HERE / "ableton" / "Soma", pkg)
        rig = {"targets": [
            {"cc": 21, "midi_channel": 0, "device": "SSL Native Channel Strip 2", "range": [0.75, 0.3], "names": ["Threshold", "Compressor Threshold"]},
            {"cc": 20, "midi_channel": 0, "device": "SSL Native Channel Strip 2", "range": [0.45, 0.65], "names": ["Low Gain", "LF Low Gain"]},
            {"cc": 23, "midi_channel": 0, "device": "Modular", "range": [0.0, 1.0], "param_index": 1},
        ]}
        (pkg / "rig.json").write_text(json.dumps(rig), encoding="utf-8")
        sys.path.insert(0, d)
        import Soma  # noqa: E402
        s = Soma.create_instance(c_instance)
        s.build_midi_map(0)
        assert sorted(live.MidiMap.forwarded) == [(0, 20), (0, 21), (0, 23)], live.MidiMap.forwarded
        s.receive_midi((0xB0, 21, 127))   # fear full: the threshold at 30% of its travel
        thr = strip.parameters[2]
        assert abs(thr.value - (-20 + 30 * 0.3)) < 1e-6, thr.value
        s.receive_midi((0xB0, 21, 0))     # no fear: 75%
        assert abs(thr.value - (-20 + 30 * 0.75)) < 1e-6, thr.value
        s.receive_midi((0xB0, 20, 64))    # safety half: the low shelf between 45% and 65%
        low = strip.parameters[3]
        assert abs(low.value - (-16.5 + 33 * (0.45 + 0.2 * 64 / 127))) < 1e-6, low.value
        s.receive_midi((0xB0, 23, 127))   # awe full: Modular's first host parameter, inside a rack
        assert modular.parameters[1].value == 1.0, modular.parameters[1].value
        s.receive_midi((0xB0, 99, 5))     # not ours: passed on
        assert s.unhandled == [(0xB0, 99, 5)], s.unhandled
        listed = json.loads((pkg / "soma-devices.json").read_text(encoding="utf-8"))
        assert [x["device"] for x in listed["devices"]] == ["SSL Native Channel Strip 2", "Audio Effect Rack", "Modular"], listed
        assert any("CC 21 -> Compressor Threshold" in m for m in s.log), s.log
        print("\n".join(s.log))
    print("soma script test: PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
