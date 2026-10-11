"""The programme's Lean for the towers of code (ISS-071): one JSON for the Soma Machine.

    python sherlock/towers.py [Module ...]    # default: every module of the root package

Runs sherlock/Ledger/Export.lean once per module (one Lean process at a time, as the
ledger's judge does), then merges bld/sherlock/towers/<Module>.json into
bld/sherlock/towers.json: per module (a tower) its declarations (floors), each with
kind, statement, source line and axioms; the summary counts theorems, definitions,
axioms and the declarations resting on sorry. Stamped with the commit the Lean was
checked at: "kernel-checked at <commit>", never claimed live.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
TOWERS = OUT / "towers"
STANDARD = {"propext", "Classical.choice", "Quot.sound"}


def modules() -> list[str]:
    toml = (U / "lakefile.toml").read_text(encoding="utf-8")
    names = re.findall(r'\[\[lean_lib\]\]\s*\nname = "([^"]+)"\s*\nsrcDir = "paper/proofs"', toml)
    return [n for n in names if n != "EmotionCyc"]  # EmotionCyc imports all of OpenCyc: exported apart


def export(mod: str) -> bool:
    env = dict(os.environ, SHERLOCK_MODULE=mod, LEAN_NUM_THREADS="2")
    r = subprocess.run(["lake", "env", "lean", "sherlock/Ledger/Export.lean"], cwd=U, env=env,
                       capture_output=True, text=True)
    lines = [l for l in (r.stdout + r.stderr).splitlines() if l.strip() and "OSforGFF" not in l and "PANIC" not in l]
    print("\n".join(lines[-2:]), flush=True)
    return r.returncode == 0


def merge() -> dict:
    commit = subprocess.run(["git", "log", "-1", "--format=%h", "--", "paper/proofs"], cwd=U,
                            capture_output=True, text=True).stdout.strip()
    towers, totals = [], {"theorem": 0, "def": 0, "axiom": 0, "sorry": 0, "declarations": 0}
    for f in sorted(TOWERS.glob("*.json")):
        decls = json.loads(f.read_text(encoding="utf-8"))
        decls.sort(key=lambda d: (d.get("line") or 0, d["name"]))
        for d in decls:
            d["sorry"] = "sorryAx" in d["axioms"]
            d["own_axioms"] = [a for a in d["axioms"] if a not in STANDARD and a != "sorryAx"]
            # a theorem whose conclusion is `True` proves nothing: a placeholder floor
            d["trivial"] = d["kind"] == "theorem" and bool(re.search(r"(^|→ |, )True$", d["statement"].strip()))
            totals["trivial"] = totals.get("trivial", 0) + d["trivial"]
            totals["declarations"] += 1
            totals[d["kind"]] = totals.get(d["kind"], 0) + 1
            totals["sorry"] += d["sorry"]
        towers.append({"module": f.stem, "file": f"paper/proofs/{f.stem}.lean", "declarations": decls})
    data = {"commit": commit, "note": f"kernel-checked at {commit}", "totals": totals, "towers": towers}
    (OUT / "towers.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8", newline="\n")
    return data


def main() -> int:
    mods = sys.argv[1:] or modules()
    failed = [m for m in mods if not export(m)]
    data = merge()
    t = data["totals"]
    print(f"bld/sherlock/towers.json: {len(data['towers'])} towers, {t['declarations']} declarations "
          f"({t.get('theorem', 0)} theorems, {t.get('def', 0)} definitions, {t.get('axiom', 0)} axioms, "
          f"{t['sorry']} resting on sorry, {t.get('trivial', 0)} proving only True), {data['note']}" + (f"; failed: {failed}" if failed else ""))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
