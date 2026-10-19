"""studio.py: Sherlock checks a Live set against the studio standard (ISS-120, registry/studio/standard.yaml).

Author, 19 Oct 2026: "a standard ... a STD track is: Serum, PP ... and in the strip, SSL standard ... if a track
doesn't need PP, it turns it off"; "if you don't know what a std track has, either you will use nothing or randomly
download, install stuff". The standard says what every track, group, return and the master hold; this reads a Live
set (.als: gzipped XML) and says, track by track:
    a slot missing         the standard's device for that slot is not on the track
    out of order           the devices are there, not in the standard's order
    undeclared             a device the standard does not name: a proposal to the author, never a fault in itself
and, for information only, each slot's on or off (a version changes settings, never the shape).

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


def same(device: str, slot: str) -> bool:
    """A device in Live is the standard's slot if the names agree, ignoring case, spaces and a maker's prefix
    ("Modular FX" is "Softube Modular FX")."""
    a, b = norm(device), norm(slot)
    return bool(a) and bool(b) and (a == b or a.endswith(b) or b.endswith(a))


def devices(chain) -> list[dict]:
    """The devices of a chain in order; a rack's branches are read in place (its devices follow the rack)."""
    out = []
    if chain is None:
        return out
    for d in list(chain):
        on = d.find("On/Manual")
        entry = {"tag": d.tag, "on": (on.attrib.get("Value") == "true") if on is not None else True}
        if d.tag in ("PluginDevice", "AuPluginDevice"):
            info = d.find("PluginDesc")
            names = [e.attrib.get("Value") for e in (info.iter() if info is not None else []) if e.tag in ("Name", "PlugName") and e.attrib.get("Value")]
            entry["name"] = names[0] if names else "a plugin"
        else:
            user = d.find("UserName")
            entry["name"] = (user.attrib.get("Value") if user is not None and user.attrib.get("Value") else d.tag)
        out.append(entry)
        branches = d.find("Branches")
        for br in list(branches) if branches is not None else []:   # a rack: each branch's own chain, in order
            out.extend(devices(next(br.iter("Devices"), None)))
    return out


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


def check_chain(have: list[dict], slots: list[dict]) -> tuple[list[str], list[str], list[str]]:
    """Problems (missing, out of order), proposals (undeclared) and notes (on or off) for one chain."""
    problems, proposals, notes = [], [], []
    # a device the standard still calls open (not yet chosen: "open", "which one is open") is not checked yet
    declared = [s for s in slots if not re.search(r"\bopen\b", str(s.get("device", "")))]
    used = set()
    last = -1
    for s in declared:
        dev = str(s.get("device", ""))
        hits = [i for i, d in enumerate(have) if same(d["name"], dev)]
        if not hits:
            problems.append(f"slot {s.get('slot', '?')} ({s.get('role', '')}: {dev}) missing")
            continue
        i = next((h for h in hits if h > last), hits[0])
        if i < last:
            problems.append(f"slot {s.get('slot', '?')} ({dev}) out of order")
        last = max(last, i)
        used.add(i)
        want = s.get("default")
        notes.append(f"{dev} {'on' if have[i]['on'] else 'off'}" + (f" (the standard's default: {'on' if want else 'off'})" if isinstance(want, bool) and want != have[i]["on"] else ""))
    proposals = [d["name"] for i, d in enumerate(have) if i not in used]
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
            role, slots = "return", [{"slot": 1, "role": returns[norm(t["name"])].get("role", ""), "device": returns[norm(t["name"])].get("device", "")}]
        elif t["kind"] == "MainTrack":
            role, slots = "master", (standard.get("master") or {}).get("slots") or []
        else:
            continue
        problems, proposals, notes = check_chain(t["devices"], slots)
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


def synthetic(tracks: list[tuple[str, str, list[tuple[str, bool]]]]) -> bytes:
    """A minimal Live set: (kind, name, [(plugin name, on)])."""
    def plugin(n, on):
        return (f'<PluginDevice><On><Manual Value="{str(on).lower()}"/></On><PluginDesc><Vst3PluginInfo><Name Value="{n}"/>'
                f'</Vst3PluginInfo></PluginDesc></PluginDevice>')
    body = "".join(f'<{k}><Name><EffectiveName Value="{n}"/></Name><DeviceChain><DeviceChain><Devices>{"".join(plugin(*d) for d in ds)}'
                   f'</Devices></DeviceChain></DeviceChain></{k}>' for k, n, ds in tracks)
    return gzip.compress(f'<Ableton MinorVersion="12.0_test"><LiveSet><Tracks>{body}</Tracks></LiveSet></Ableton>'.encode())


def self_test(standard: dict) -> int:
    import tempfile
    std = [("Serum 2", True), ("Phase Plant", True), ("Snap Heap", False), ("Modular FX", False), ("SSL Native Channel Strip 2", True)]
    cases = {
        "a standard track": ([("MidiTrack", "Violins I", std)], 0, 0),
        "Phase Plant missing, a Valhalla added": ([("MidiTrack", "Celli", [d for d in std if d[0] != "Phase Plant"] + [("ValhallaRoom", True)])], 1, 1),
        "the strip before the source": ([("MidiTrack", "Horns", [std[4]] + std[:4])], 1, 0),
        "a group to standard": ([("GroupTrack", "Strings", [("Phase Plant", False), ("SSL Native Bus Compressor 2", True)])], 0, 0),
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
            print(f"{'ok  ' if ok else 'FAIL'} {title}: {got_p} problem(s), {got_x} proposal(s)")
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
