# soma.py: the Soma control script's surface (ISS-118). For each target in rig.json, a CC on a MIDI
# channel moves one parameter of one device: the device is found by name anywhere in the set (tracks,
# returns, the master, inside racks), the parameter by one of its names (from NKS: "Threshold",
# "Compressor Threshold" ...) or by position; the CC's 0..127 sweeps the target's range of the
# parameter's travel. On start, and when a target cannot be found, it writes soma-devices.json beside
# itself: every device and parameter name Live shows, so the rig can be corrected from facts. All it
# does is logged to Live's Log.txt, prefixed "Soma:".
import json
import os
import time

import Live
from _Framework.ControlSurface import ControlSurface

HERE = os.path.dirname(os.path.abspath(__file__))


def _devices(container):
    """Every device in a track or chain, rack contents included."""
    for d in container.devices:
        yield d
        if getattr(d, "can_have_chains", False):
            for chain in d.chains:
                for inner in _devices(chain):
                    yield inner


class Soma(ControlSurface):
    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        self._targets = []
        self._cache = {}
        self._last_dump = 0.0
        with self.component_guard():
            try:
                with open(os.path.join(HERE, "rig.json"), encoding="utf-8") as f:
                    self._targets = json.load(f).get("targets", [])
                self.log_message("Soma: rig with %d targets" % len(self._targets))
            except Exception as e:  # no rig: the script still lists the devices
                self.log_message("Soma: no rig.json (%s)" % e)
            self.song().add_tracks_listener(self._forget)
        self.schedule_message(20, self._dump)

    def disconnect(self):
        try:
            self.song().remove_tracks_listener(self._forget)
        except Exception:
            pass
        ControlSurface.disconnect(self)

    def _forget(self):
        self._cache = {}

    # ------------------------------------------------------------------ MIDI in

    def build_midi_map(self, midi_map_handle):
        ControlSurface.build_midi_map(self, midi_map_handle)
        seen = set()
        for t in self._targets:
            key = (t.get("midi_channel", 0), t["cc"])
            if key not in seen:
                seen.add(key)
                Live.MidiMap.forward_midi_cc(self._c_instance.handle(), midi_map_handle, key[0], key[1])

    def receive_midi(self, midi_bytes):
        if len(midi_bytes) == 3 and (midi_bytes[0] & 0xF0) == 0xB0:
            channel, cc, value = midi_bytes[0] & 0x0F, midi_bytes[1], midi_bytes[2]
            hit = False
            for i, t in enumerate(self._targets):
                if t["cc"] == cc and t.get("midi_channel", 0) == channel:
                    hit = True
                    self._apply(i, t, value / 127.0)
            if hit:
                return
        ControlSurface.receive_midi(self, midi_bytes)

    # ------------------------------------------------------------------ targets

    def _all_devices(self):
        song = self.song()
        for track in list(song.tracks) + list(song.return_tracks) + [song.master_track]:
            for d in _devices(track):
                yield track, d

    def _find(self, t):
        want = t["device"].lower()
        for track, d in self._all_devices():
            if want in (d.name or "").lower() or want in (getattr(d, "class_display_name", "") or "").lower():
                params = list(d.parameters)
                if "param_index" in t:
                    idx = t["param_index"]
                    if 0 <= idx < len(params):
                        return params[idx]
                    continue
                names = [n.lower() for n in t.get("names", [])]
                for p in params:  # an exact name first
                    if (p.name or "").lower() in names:
                        return p
                for p in params:  # then a name containing one of them
                    if any(n and n in (p.name or "").lower() for n in names):
                        return p
        return None

    def _apply(self, i, t, x):
        p = self._cache.get(i)
        if p is None:
            p = self._find(t)
            if p is None:
                self._dump_soon("no %s in %s" % (t.get("names") or t.get("param_index"), t["device"]))
                return
            self._cache[i] = p
            self.log_message("Soma: CC %d -> %s (%s)" % (t["cc"], p.name, t["device"]))
        lo, hi = t.get("range", [0.0, 1.0])
        f = lo + (hi - lo) * x
        v = p.min + (p.max - p.min) * f
        if getattr(p, "is_quantized", False):
            v = round(v)
        try:
            p.value = max(p.min, min(p.max, v))
        except Exception as e:  # a parameter that cannot be set (e.g. automation locked): forget it
            self.log_message("Soma: cannot set %s (%s)" % (p.name, e))
            self._cache.pop(i, None)

    # ------------------------------------------------------------------ the list of devices

    def _dump_soon(self, why):
        if time.time() - self._last_dump > 10:
            self.log_message("Soma: %s; listing the devices" % why)
            self._dump()

    def _dump(self):
        self._last_dump = time.time()
        out = []
        for track, d in self._all_devices():
            out.append({
                "track": track.name, "device": d.name, "class": getattr(d, "class_display_name", ""),
                "parameters": [{"index": k, "name": p.name, "min": p.min, "max": p.max} for k, p in enumerate(d.parameters)],
            })
        try:
            with open(os.path.join(HERE, "soma-devices.json"), "w", encoding="utf-8") as f:
                json.dump({"written": time.strftime("%Y-%m-%d %H:%M:%S"), "devices": out}, f, indent=1)
            self.log_message("Soma: listed %d devices in soma-devices.json" % len(out))
        except Exception as e:
            self.log_message("Soma: could not write soma-devices.json (%s)" % e)
