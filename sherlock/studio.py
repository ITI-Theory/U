"""studio.py: Sherlock checks a Live set against the studio standard (ISS-120, registry/studio/standard.yaml).

Author, 19 Oct 2026: "a standard ... a STD track is: Serum, PP ... and in the strip, SSL standard ... if a track
doesn't need PP, it turns it off"; "if you don't know what a std track has, either you will use nothing or randomly
download, install stuff". The standard says what every track, group, return and the master hold; this reads a Live
set (.als: gzipped XML) and says, track by track:
    a slot missing         the standard's device for that slot is not on the track
    out of order           the devices are there, not in the standard's order
    undeclared             a device the standard does not name: a proposal to the author, never a fault in itself
    two desks on           a desk slot (strip, glue, colour, hall, master) with more than one house sounding
and, for information only, each slot's on or off and its desk (a version changes settings, never the shape). A slot
is one device, alternatives (`or`) or the desks' (`desk`: any house's device fills it); a device given as a list is
several in that order. Live's own devices are known by their names (the set stores tags: Eq8, GlueCompressor);
a rack is a container: its devices are read in place and the rack itself is never a proposal.

    python sherlock/studio.py [<set.als>]        # default: the newest set in the author's Live folder
    python sherlock/studio.py --tracks "^RF"     # which MIDI tracks are standard tracks (a regex; default all)
    python sherlock/studio.py --self-test        # synthetic sets, no Live needed
Writes bld/sherlock/studio.md (track names stay in bld, never committed). Exit 1 when a slot is missing or out of order.
"""
from __future__ import annotations

import gzip
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "studio.md"


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", str(s).lower())


# the tags Live writes for its own devices (read from the Core Library's presets), by the names the standard uses
LIVE_NAMES = {"ChannelEq": "Channel EQ", "Compressor2": "Compressor", "GlueCompressor": "Glue Compressor",
              "Limiter": "Limiter", "Hybrid": "Hybrid Reverb", "Roar": "Roar", "Saturator": "Saturator", "Eq8": "EQ Eight",
              "DrumBuss": "Drum Buss", "Reverb": "Reverb", "StereoGain": "Utility", "AudioEffectGroupDevice": "Audio Effect Rack",
              "InstrumentGroupDevice": "Instrument Rack", "MidiEffectGroupDevice": "MIDI Effect Rack", "DrumGroupDevice": "Drum Rack",
              "AutoFilter": "Auto Filter", "UltraAnalog": "Analog", "OriginalSimpler": "Simpler", "MultiSampler": "Sampler",
              "InstrumentVector": "Wavetable", "MxDeviceAudioEffect": "Max Audio Effect", "MxDeviceInstrument": "Max Instrument",
              "MxDeviceMidiEffect": "Max MIDI Effect"}
RACKS = {"AudioEffectGroupDevice", "InstrumentGroupDevice", "MidiEffectGroupDevice", "DrumGroupDevice"}
OPEN = re.compile(r"\bopen\b")


def same(device: str, slot: str) -> bool:
    """A device in Live is the standard's slot if the names agree, ignoring case, spaces, a maker's prefix
    ("Modular FX" is "Softube Modular FX") and a version tag ("SSL Native X-Saturator v6": SSL's files, 20 Oct)."""
    a, b = (re.sub(r"v\d+$", "", norm(n)) for n in (device, slot))
    return bool(a) and bool(b) and (a == b or a.endswith(b) or b.endswith(a))


def devices(chain, parent_on: bool = True) -> list[dict]:
    """The devices of a chain in order; a rack's branches are read in place (its devices follow the rack, off when
    the rack is off)."""
    out = []
    if chain is None:
        return out
    for d in list(chain):
        on = d.find("On/Manual")
        entry = {"tag": d.tag, "rack": d.tag in RACKS,
                 "on": parent_on and ((on.attrib.get("Value") == "true") if on is not None else True)}
        if d.tag in ("PluginDevice", "AuPluginDevice"):
            info = d.find("PluginDesc")
            names = [e.attrib.get("Value") for e in (info.iter() if info is not None else []) if e.tag in ("Name", "PlugName") and e.attrib.get("Value")]
            entry["names"] = names[:1] or ["a plugin"]
        else:
            user = d.find("UserName")
            named = user.attrib.get("Value") if user is not None else ""
            entry["names"] = [n for n in (named, LIVE_NAMES.get(d.tag, d.tag)) if n]
        entry["name"] = entry["names"][0]
        out.append(entry)
        branches = d.find("Branches")
        for br in list(branches) if branches is not None else []:   # a rack: each branch's own chain, in order
            out.extend(devices(next(br.iter("Devices"), None), entry["on"]))
    return out


def match(entry: dict, name: str) -> bool:
    return any(same(n, name) for n in entry["names"])


def candidates(slot: dict, standard: dict) -> list[tuple[str, list[str]]]:
    """What fills a slot: (who, devices in order). A desk slot: each house's device, houses with the same device
    together ("ssl/izotope/uad"); otherwise the device and its alternatives. A device still open is not checked."""
    raw = []
    if slot.get("desk"):
        houses = ((standard.get("desks") or {}).get("houses")) or {}
        raw = [(h, (v or {}).get(slot["desk"])) for h, v in houses.items()]
    else:
        raw = [("", slot.get("device"))] + [("", o) for o in slot.get("or") or []]
    merged: dict[tuple, list[str]] = {}
    for who, v in raw:
        names = tuple(str(n) for n in (v if isinstance(v, list) else [v]) if n)
        if names and not any(OPEN.search(n) for n in names):
            merged.setdefault(names, []).append(who)
    return [("/".join(w for w in whos if w), list(names)) for names, whos in merged.items()]


def find(have: list[dict], names: list[str], after: int, used: set) -> tuple[list[int] | None, bool]:
    """The devices' places in order after `after`; else anywhere in order (then out of order); else none."""
    def seq(start: int) -> list[int] | None:
        idx, pos = [], start
        for n in names:
            i = next((i for i, d in enumerate(have) if i > pos and i not in used and match(d, n)), None)
            if i is None:
                return None
            idx.append(i)
            pos = i
        return idx
    got = seq(after)
    if got:
        return got, True
    got = seq(-1)
    return got, False


def read_set(path: Path) -> dict:
    root = ET.fromstring(gzip.open(path).read())
    live = root.find("LiveSet")
    tracks = []
    for t in list(live.find("Tracks")):
        name = t.find("Name/EffectiveName")
        chain = t.find("DeviceChain/DeviceChain/Devices")
        tracks.append({"kind": t.tag, "name": name.attrib.get("Value") if name is not None else "?", "devices": devices(chain)})
    master = live.find("MainTrack")
    if master is None:
        master = live.find("MasterTrack")
    if master is not None:
        tracks.append({"kind": "MainTrack", "name": "Main", "devices": devices(master.find("DeviceChain/DeviceChain/Devices"))})
    return {"file": path.name, "live": root.attrib.get("MinorVersion", ""), "tracks": tracks}


def check_chain(have: list[dict], slots: list[dict], standard: dict) -> tuple[list[str], list[str], list[str]]:
    """Problems (missing, out of order, two desks on), proposals (undeclared) and notes (on or off) for one chain."""
    problems, notes = [], []
    used: set[int] = set()
    last = -1
    for s in slots:
        cands = candidates(s, standard)
        if not cands:            # still open: not chosen yet, not checked yet
            continue
        n = s.get("slot", "?")
        what = f"the desk's {s['desk']}" if s.get("desk") else " or ".join(" + ".join(c[1]) for c in cands)
        found = []
        for who, names in cands:
            idx, in_order = find(have, names, last, used)
            if idx:
                used.update(idx)
                found.append((who, names, idx, in_order, any(have[i]["on"] for i in idx)))
        if not found:
            problems.append(f"slot {n} ({s.get('role', '')}: {what}) missing")
            continue
        sounding = [f for f in found if f[4]]
        if s.get("desk") and len(sounding) > 1:
            problems.append(f"slot {n} ({s.get('role', '')}): {len(sounding)} desks on ({', '.join(f[0] for f in sounding)}): one desk at a time")
        main = (sounding or found)[0]
        if not main[3]:
            problems.append(f"slot {n} ({' + '.join(main[1])}) out of order")
        last = max(last, max(main[2]))
        want = s.get("default")
        for who, names, _idx, _ok, on in found:
            label = " + ".join(names) + (f" [{who}]" if who else "")
            notes.append(f"{label} {'on' if on else 'off'}" + (f" (the standard's default: {'on' if want else 'off'})" if (who, names) == main[:2] and isinstance(want, bool) and want != on else ""))
    proposals = [d["name"] for i, d in enumerate(have) if i not in used and not d["rack"]]
    return problems, proposals, notes


def check(set_: dict, standard: dict, tracks_re: str = "") -> dict:
    groups = {norm(n) for n in (standard.get("group") or {}).get("names") or []}
    returns = {norm(r.get("name", "")): r for r in standard.get("returns") or []}
    result = []
    for t in set_["tracks"]:
        if t["kind"] == "MidiTrack" and (not tracks_re or re.search(tracks_re, t["name"])):
            role, slots = "track", (standard.get("track") or {}).get("slots") or []
        elif t["kind"] == "GroupTrack" and norm(t["name"]) in groups:
            role, slots = "group", (standard.get("group") or {}).get("slots") or []
        elif t["kind"] == "ReturnTrack" and norm(t["name"]) in returns:
            role, slots = "return", [{**returns[norm(t["name"])], "slot": 1}]
        elif t["kind"] == "MainTrack":
            role, slots = "master", (standard.get("master") or {}).get("slots") or []
        else:
            continue
        problems, proposals, notes = check_chain(t["devices"], slots, standard)
        result.append({"track": t["name"], "kind": t["kind"], "role": role, "problems": problems, "proposals": proposals, "notes": notes})
    return {"file": set_["file"], "live": set_["live"], "version": standard.get("version"), "tracks": result}


def write(report: dict) -> None:
    md = [f"# Sherlock: {report['file']} against the studio standard (version {report['version']})", "",
          "A missing slot or one out of order is a problem; an undeclared device is a proposal to the author; on and off "
          "are shown, never judged (a version changes settings, never the shape).", ""]
    for t in report["tracks"]:
        md.append(f"## {t['track']} ({t['role']})")
        md += [f"- PROBLEM: {p}" for p in t["problems"]] or ["- every slot in place, in order"]
        md += [f"- proposal (undeclared): {p}" for p in t["proposals"]]
        if t["notes"]:
            md.append(f"- on and off: {'; '.join(t['notes'])}")
        md.append("")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(md), encoding="utf-8", newline="\n")


def newest_set() -> Path | None:
    cfg = U / "apps" / "instrument" / "mother" / "mother.local.json"
    folder = Path.home() / "OneDrive" / "prj" / "Music" / "Soma"
    if cfg.exists():
        folder = Path(json.loads(cfg.read_text(encoding="utf-8")).get("live_dir") or folder)
    sets = sorted(folder.glob("**/*.als"), key=lambda p: p.stat().st_mtime) if folder.is_dir() else []
    return sets[-1] if sets else None


def synthetic(tracks: list[tuple]) -> bytes:
    """A minimal Live set: (kind, name, devices); a device is (plugin name, on), ("live:<Tag>", on) for Live's own,
    or ("rack:<name>", on, [chain, ...]) for a rack; a "MainTrack" is the set's main track."""
    def device(d):
        n, on = d[0], str(d[1]).lower()
        if n.startswith("rack:"):
            chains = "".join(f'<AudioEffectBranch><DeviceChain><AudioToAudioDeviceChain><Devices>{"".join(device(x) for x in c)}'
                             f'</Devices></AudioToAudioDeviceChain></DeviceChain></AudioEffectBranch>' for c in d[2])
            return (f'<AudioEffectGroupDevice><On><Manual Value="{on}"/></On><UserName Value="{n[5:]}"/>'
                    f'<Branches>{chains}</Branches></AudioEffectGroupDevice>')
        if n.startswith("live:"):
            return f'<{n[5:]}><On><Manual Value="{on}"/></On><UserName Value=""/></{n[5:]}>'
        return (f'<PluginDevice><On><Manual Value="{on}"/></On><PluginDesc><Vst3PluginInfo><Name Value="{n}"/>'
                f'</Vst3PluginInfo></PluginDesc></PluginDevice>')

    def track(k, n, ds):
        return (f'<{k}><Name><EffectiveName Value="{n}"/></Name><DeviceChain><DeviceChain><Devices>{"".join(device(d) for d in ds)}'
                f'</Devices></DeviceChain></DeviceChain></{k}>')
    body = "".join(track(*t) for t in tracks if t[0] != "MainTrack")
    main = "".join(track(*t) for t in tracks if t[0] == "MainTrack")
    return gzip.compress(f'<Ableton MinorVersion="12.0_test"><LiveSet><Tracks>{body}</Tracks>{main}</LiveSet></Ableton>'.encode())


def self_test(standard: dict) -> int:
    import tempfile
    head = [("Serum 2", True), ("Snap Heap", False), ("Snap Heap", False), ("Modular FX", False)]
    std = head + [("SSL Native Channel Strip 2", True)]
    desk_rack = ("rack:Desk", True, [[("SSL Native Channel Strip 2", True)], [("Neutron 3", False)],
                                     [("UADx API Vision Channel Strip", False)], [("live:ChannelEq", False), ("live:Compressor2", False)]])
    cases = {
        "a standard track (the SSL desk)": ([("MidiTrack", "Violins I", std)], 0, 0),
        "the UAD desk's strip": ([("MidiTrack", "Violas", head + [("UADx API Vision Channel Strip", True)])], 0, 0),
        "the Live desk: Channel EQ, then Compressor": ([("MidiTrack", "Flute", head + [("live:ChannelEq", True), ("live:Compressor2", True)])], 0, 0),
        "two desks on": ([("MidiTrack", "Horns", std + [("UADx API Vision Channel Strip", True)])], 1, 0),
        "the four desks in a rack, one on": ([("MidiTrack", "Celli", head + [desk_rack])], 0, 0),
        "a Snap Heap missing, a Valhalla added": ([("MidiTrack", "Celli", std[:2] + std[3:] + [("ValhallaRoom", True)])], 1, 1),
        "the strip before the source": ([("MidiTrack", "Horns", [std[4]] + std[:4])], 1, 0),
        "the Atmosphere's Pad: Phase Plant the source": ([("MidiTrack", "Pad", [("Phase Plant", True)] + std[1:])], 0, 0),
        "a group to standard": ([("GroupTrack", "Violins A", [("Snap Heap", True), ("SSL G3 MultiBusComp", True), ("SSL Native X-Saturator", False)])], 0, 0),
        "a group without its state": ([("GroupTrack", "Brass Low", [("SSL G3 MultiBusComp", True), ("SSL Native X-Saturator", False)])], 1, 0),
        "SSL's names as installed (a version tag)": ([("GroupTrack", "Choir", [("Snap Heap", True), ("SSL G3 MultiBusComp", True), ("SSL Native X-Saturator v6", False)])], 0, 0),
        "the master: Ozone 9": ([("MainTrack", "Main", [("Ozone 9", True)])], 0, 0),
        "the master, the Live desk": ([("MainTrack", "Main", [("live:GlueCompressor", True), ("live:Limiter", True)])], 0, 0),
        "the hall: UAD's Lexicon 224": ([("ReturnTrack", "Space", [("UADx Lexicon 224 Digital Reverb", True)])], 0, 0),
        "a designed space: Live's Hybrid Reverb": ([("ReturnTrack", "Designed space", [("live:Hybrid", True)])], 0, 0),
    }
    fails = 0
    with tempfile.TemporaryDirectory() as tmp:
        for title, (tracks, want_problems, want_proposals) in cases.items():
            p = Path(tmp) / "t.als"
            p.write_bytes(synthetic(tracks))
            r = check(read_set(p), standard)
            got_p = sum(len(t["problems"]) for t in r["tracks"])
            got_x = sum(len(t["proposals"]) for t in r["tracks"])
            ok = got_p == want_problems and got_x == want_proposals
            fails += not ok
            print(f"{'ok  ' if ok else 'FAIL'} {title}: {got_p} problem(s), {got_x} proposal(s)"
                  + ("" if ok else f" {[(t['problems'], t['proposals']) for t in r['tracks']]}"))
    return 1 if fails else 0


def main(argv: list[str]) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    standard = yaml.safe_load((U / "registry" / "studio" / "standard.yaml").read_text(encoding="utf-8")) or {}
    if "--self-test" in argv:
        return self_test(standard)
    tracks_re = ""
    if "--tracks" in argv:
        i = argv.index("--tracks")
        tracks_re = argv[i + 1]
        del argv[i:i + 2]
    path = Path(argv[0]) if argv else newest_set()
    if not path or not path.exists():
        print("no Live set: give one (python sherlock/studio.py <set.als>), or save the Soma set in the Live folder")
        return 0
    report = check(read_set(path), standard, tracks_re)
    write(report)
    problems = sum(len(t["problems"]) for t in report["tracks"])
    proposals = sum(len(t["proposals"]) for t in report["tracks"])
    print(f"{path.name}: {len(report['tracks'])} standard tracks, {problems} problem(s), {proposals} proposal(s) -> {OUT.relative_to(U)}")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
