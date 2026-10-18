#!/usr/bin/env python3
"""rig.py: compile registry/audio/rig.yaml into the Soma control script's rig.json (ISS-118).

Each target: a CC of the score (channel 1, midi-out.js) -> a parameter of a device in Live. A target
named by NKS ([section, name]) is checked against that plugin's NKS presets (lib/audio/nks.py) when a
library folder is given, and gets the names Live is likely to show for it; one named by Live (`param`)
or by position (`param_index`) is passed through. Every target must realise a planned DAW channel of
the sound grammar (registry/sound-grammar.yaml).

  python lib/audio/rig.py [--nks <folder of NKS presets>] [--out bld/live/rig.json]
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).parent))
import nks  # noqa: E402


def knob_pages(library: Path | None) -> dict[str, list[dict]]:
    """Per plugin (its bank's first entry, and its file's folder), every knob its presets map."""
    out: dict[str, list[dict]] = {}
    if not library or not library.exists():
        return out
    for f in sorted(p for ext in ("*.nksf", "*.nksfx") for p in library.rglob(ext)):
        try:
            card = nks.read(f)
        except Exception:
            continue
        for key in {card["bank"][0] if card["bank"] else "", f.parent.name}:
            if key:
                knobs = out.setdefault(key.lower(), [])
                for page in card["pages"]:
                    for k in page:
                        if k["id"] is not None and k not in knobs:
                            knobs.append(k)
    return out


def main(argv: list[str]) -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    arg = lambda name, default=None: argv[argv.index(name) + 1] if name in argv else default
    library = Path(arg("--nks")) if arg("--nks") else None
    out = ROOT / arg("--out", "bld/live/rig.json")
    rig = yaml.safe_load((ROOT / "registry/audio/rig.yaml").read_text(encoding="utf-8"))
    grammar = {c["id"]: c for c in yaml.safe_load((ROOT / "registry/sound-grammar.yaml").read_text(encoding="utf-8"))["channels"]}
    pages = knob_pages(library)
    problems, targets = [], []
    for t in rig.get("targets") or []:
        where = f"target {t.get('mode')}->{t.get('device')}"
        g = grammar.get(t.get("channel"))
        if not g or g.get("kind") != "planned" or g.get("via") != "daw":
            problems.append(f"{where}: channel {t.get('channel')!r} is not a planned DAW channel of the sound grammar")
        if not (isinstance(t.get("cc"), int) and 0 <= t["cc"] <= 127):
            problems.append(f"{where}: cc must be 0..127")
        lo, hi = (t.get("range") or [0.0, 1.0])
        entry = {"cc": t["cc"], "midi_channel": t.get("midi_channel", 1) - 1, "device": t["device"], "range": [float(lo), float(hi)],
                 "mode": t.get("mode"), "grammar": t.get("channel")}
        if "nks" in t:
            section, name = t["nks"]
            entry["names"] = [name, f"{section} {name}", f"{section}: {name}", f"{section} - {name}"]
            knobs = pages.get(t["device"].lower())
            if knobs is None:
                entry["nks_checked"] = False
                if library:
                    problems.append(f"{where}: no NKS presets for {t['device']!r} in {library}")
            else:
                hit = next((k for k in knobs if k["section"].lower() == section.lower() and k["name"].lower() == name.lower()), None)
                if not hit:
                    near = [f"{k['section']}: {k['name']}" for k in knobs if name.lower() in k["name"].lower()][:5]
                    problems.append(f"{where}: NKS has no {section}: {name}" + (f" (near: {', '.join(near)})" if near else ""))
                else:
                    entry["nks_checked"], entry["vst_param_id"] = True, hit["id"]
        elif "param" in t:
            entry["names"] = [t["param"]]
        elif "param_index" in t:
            entry["param_index"] = int(t["param_index"])
        else:
            problems.append(f"{where}: name the parameter by nks, param or param_index")
        targets.append(entry)
    for p in problems:
        print("!!", p)
    if problems:
        return 1
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps({"schema": "soma-rig/1", "targets": targets}, indent=1), encoding="utf-8")
    checked = sum(1 for e in targets if e.get("nks_checked"))
    print(f"{out}: {len(targets)} targets, {checked} checked against NKS" + ("" if library else " (no NKS folder given: --nks)"))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
