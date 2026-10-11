"""skyline.py: OpenCyc's skyline for the city of code (ISS-071).

Counts the ground facts per microtheory in the generated Lean knowledge base
(bld/sherlock/lean/CycKB, from gen_krf.py; parts _p1, _p2 ... summed) and writes
bld/sherlock/skyline.json: [{"mt": name, "facts": n}], largest first. The app's
generate.py reads it, if present, and draws a tower per microtheory on the horizon.

Usage: python sherlock/skyline.py
"""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KB = ROOT / "bld" / "sherlock" / "lean" / "CycKB"
OUT = ROOT / "bld" / "sherlock" / "skyline.json"
FACT = re.compile(rb"^@\[aesop.*?\] axiom f\d+ ", re.M)
TITLE = re.compile(r"Ground facts of microtheory (\S+) \(NextKB\)")


def main() -> int:
    if not KB.exists():
        print(f"skyline: {KB} not found (run make -C sherlock lean-gen first)")
        return 1
    facts: Counter[str] = Counter()
    for path in sorted(KB.rglob("*.lean")):
        data = path.read_bytes()
        head = TITLE.search(data[:2000].decode("utf-8", "replace"))
        if not head:
            continue
        facts[head.group(1)] += len(FACT.findall(data))
    rows = [{"mt": mt, "facts": n} for mt, n in facts.most_common() if n]
    OUT.write_text(json.dumps(rows, indent=0), encoding="utf-8")
    print(f"skyline: {len(rows)} microtheories, {sum(r['facts'] for r in rows):,} facts -> {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
