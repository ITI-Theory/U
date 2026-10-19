#!/usr/bin/env python3
"""console_index.py: the console's data (ISS-120): every NKS plugin of the author's, its controls placed in the
console's sections by the rules in registry/audio/console.yaml (Console 1's idea over his own plugins).

    python lib/audio/console_index.py [<NKS folder> ...] [--out <folder>]
        default folders: OneDrive\\lib\\NKS; default out: ../Me/music/console (private: the author's plugins)
    python lib/audio/console_index.py --self-test

Reads each preset with nks.py (read, never copied: the presets stay where they are), merges a plugin's controls
across its presets (by parameter id), places each control (an instrument's are its SOURCE but for its macros;
an effect's by its NKS section, then its name), and writes index.json (plugin -> kind, presets, types, home
section, the sections with their controls) and INDEX.md (a table to read).
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))
import nks  # noqa: E402

U = Path(__file__).resolve().parents[2]
RULES = U / "registry" / "audio" / "console.yaml"
NKS_DIRS = [Path.home() / "OneDrive" / "lib" / "NKS"]
OUT = U.parents[1] / "Me" / "music" / "console"


def rules() -> tuple[list[str], dict]:
    r = yaml.safe_load(RULES.read_text(encoding="utf-8"))
    secs = r["sections"]
    for s in secs.values():
        s["_re"] = [re.compile(p, re.I) for p in s.get("patterns") or []]
    secs["_homes"] = r.get("homes") or {}
    return r["order"], secs


def place(kind: str, section: str, name: str, order: list[str], secs: dict) -> str:
    if secs["feel"]["_re"] and any(p.search(section) or p.search(name) for p in secs["feel"]["_re"]):
        return "feel"
    if kind == "INST":
        return "source"
    for text in (section, name):
        for sid in order:
            if text and any(p.search(text) for p in secs[sid]["_re"]):
                return sid
    return "other"


def build(folders: list[Path]) -> dict:
    order, secs = rules()
    plugins: dict[str, dict] = {}
    for folder in folders:
        for f in sorted(folder.rglob("*.nks*")):
            if "__MACOSX" in f.parts or f.suffix.lower() not in (".nksf", ".nksfx"):
                continue
            try:
                card = nks.read(f)
            except Exception:
                continue
            name = (card.get("bank") or [None])[0] or card.get("vendor") or "?"
            p = plugins.setdefault(name, {"vendor": card.get("vendor", ""), "kind": card.get("device", ""), "presets": 0,
                                          "types": Counter(), "controls": {}})
            p["presets"] += 1
            for t in card.get("types") or []:
                p["types"][t] += 1
            for page in card.get("pages") or []:
                for k in page:
                    if k.get("name"):
                        p["controls"].setdefault(k.get("id"), (k.get("section") or "", k["name"]))
    out = {}
    for name, p in sorted(plugins.items()):
        by = defaultdict(list)
        for pid, (section, cname) in p["controls"].items():
            by[place(p["kind"], section, cname, order, secs)].append({"section": section, "name": cname, "id": pid})
        counted = Counter({s: len(v) for s, v in by.items() if s not in ("out", "other", "feel")})
        home = secs["_homes"].get(name) or next((sid for sid in order if any(r.search(name) for r in secs[sid]["_re"])), None)
        home = home or (counted.most_common(1)[0][0] if counted else None)
        if not home:
            types = " ".join(p["types"])
            home = next((sid for sid in order if any(r.search(types) for r in secs[sid]["_re"])), "other")
        out[name] = {"vendor": p["vendor"], "kind": p["kind"], "presets": p["presets"],
                     "types": [t for t, _ in p["types"].most_common(6)], "home": home,
                     "sections": {s: by[s] for s in ["source", "feel", *order, "other"] if by.get(s)}}
    return {"rules": str(RULES.relative_to(U)), "names": {k: v["name"] for k, v in secs.items() if not k.startswith('_')}, "plugins": out}


def markdown(index: dict) -> str:
    names = index["names"] | {"other": "OTHER"}
    lines = ["# The console's index: the author's NKS plugins by section (private)", "",
             f"Placed by {index['rules']} (public); rebuilt by lib/audio/console_index.py. Home: where most of a plugin's controls land.", "",
             "| Plugin | Kind | Presets | Home | Sections (controls) |", "|---|---|---|---|---|"]
    for name, p in index["plugins"].items():
        secs = ", ".join(f"{names.get(s, s)} {len(v)}" for s, v in p["sections"].items())
        lines.append(f"| {name} | {p['kind']} | {p['presets']} | {names.get(p['home'], p['home'])} | {secs} |")
    homes = Counter(p["home"] for p in index["plugins"].values())
    lines += ["", "By home: " + ", ".join(f"{names.get(h, h)} {n}" for h, n in homes.most_common()), ""]
    return "\n".join(lines)


def self_test() -> int:
    order, secs = rules()
    cases = [("FX", "EQ", "LF Gain", "eq"), ("FX", "Compressor", "Ratio", "dynamics"), ("FX", "", "Decay", "space"),
             ("FX", "Master", "Fader", "out"), ("INST", "Filter", "Cutoff", "source"), ("INST", "MACROS", "Macro 3", "feel"),
             ("FX", "", "Frequency Shift", "wrong"), ("FX", "Drive", "Amount", "drive"), ("FX", "", "Wibble", "other")]
    fails = 0
    for kind, section, name, want in cases:
        got = place(kind, section, name, order, secs)
        fails += got != want
        print(f"{'ok  ' if got == want else 'FAIL'} {kind} {section or '-'} / {name}: {got}")
    return 1 if fails else 0


def main(argv: list[str]) -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if "--self-test" in argv:
        return self_test()
    out = OUT
    if "--out" in argv:
        i = argv.index("--out")
        out = Path(argv[i + 1])
        del argv[i:i + 2]
    folders = [Path(a) for a in argv] or [d for d in NKS_DIRS if d.exists()]
    index = build(folders)
    out.mkdir(parents=True, exist_ok=True)
    (out / "index.json").write_text(json.dumps(index, indent=1, ensure_ascii=False), encoding="utf-8", newline="\n")
    (out / "INDEX.md").write_text(markdown(index), encoding="utf-8", newline="\n")
    homes = Counter(p["home"] for p in index["plugins"].values())
    print(f"{len(index['plugins'])} plugins -> {out}: " + ", ".join(f"{index['names'].get(h, h)} {n}" for h, n in homes.most_common()))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
