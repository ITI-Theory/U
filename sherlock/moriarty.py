"""Moriarty, the breaker (ISS-094): plant faults, see whether Sherlock catches them.

    python sherlock/moriarty.py            # every fault in registry/moriarty.yaml
    python sherlock/moriarty.py hedge-dropped

Each fault changes one file in the working copy; the battery of fast checks runs before (the
baseline) and after; the fault is caught when any check's result changes. The file is restored
whatever happens. Writes bld/sherlock/moriarty.md: the catch rate, and each miss, a DOT.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock"
PY = sys.executable

BATTERY = {
    "ledger": ([[PY, "sherlock/ledger.py", "extract"], [PY, "sherlock/ledger.py", "report"]], r"(\d+) disagree"),
    "clinical": ([[PY, "sherlock/clinical.py"]], r"(\d+) candidates"),
    "qp": ([[PY, "sherlock/readings.py", "qp"]], r"(\d+) read pairs with opposite signs, (\d+) sentences against their own matrix, (\d+) pairs whose matrices differ"),
    "licences": ([[PY, "paper/scripts/check_licences.py"]], r"(PASS|FAIL)"),
}


def run(cmds) -> tuple[str, int]:
    out, code = "", 0
    for c in cmds:
        r = subprocess.run(c, cwd=U, capture_output=True, text=True, encoding="utf-8", errors="replace")
        out += r.stdout + r.stderr
        code = code or r.returncode
    return out, code


def measure(extra: list[str]) -> dict[str, str]:
    result = {}
    for name, (cmds, pattern) in BATTERY.items():
        out, code = run(cmds)
        found = re.findall(pattern, out)
        result[name] = f"{found[-1] if found else '-'} exit {code}"
    for doc in extra:
        out, _ = run([[PY, "sherlock/delta.py", doc]])
        m = re.search(r"((?:unchanged|edited|gone|lost)[^\n]*)", out)
        result[f"delta:{doc}"] = re.sub(r"uncovered new text: \d+ hunks.*", "", m.group(1)).strip() if m else "-"
    return result


def apply(fault: dict, text: str) -> str:
    if "append" in fault:
        return text + fault["append"]
    for k in ("", "2"):
        if f"find{k}" in fault:
            if text.count(fault[f"find{k}"]) != 1:
                raise SystemExit(f"{fault['id']}: find{k} must match exactly once in {fault['file']}")
            text = text.replace(fault[f"find{k}"], fault[f"replace{k}"])
    return text


def main(argv: list[str]) -> int:
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    faults = yaml.safe_load((U / "registry" / "moriarty.yaml").read_text(encoding="utf-8"))["faults"]
    faults = [f for f in faults if not argv or f["id"] in argv]
    affidavits = {p.stem for p in (U / "registry" / "affidavits").glob("*.yaml")}
    deltas = sorted({Path(f["file"]).stem for f in faults} & affidavits)
    base = measure(deltas)
    rows, surprises = [], 0
    for fault in faults:
        path = U / fault["file"]
        original = path.read_bytes()
        try:
            path.write_bytes(apply(fault, original.decode("utf-8")).encode("utf-8"))
            after = measure(deltas)
        finally:
            path.write_bytes(original)
        changed = [k for k in base if after[k] != base[k]]
        caught = bool(changed)
        surprise = caught != (fault["expect"] == "caught")
        surprises += surprise
        by = ", ".join(f"{k}: {base[k]} -> {after[k]}" for k in changed) or "nothing changed"
        rows.append((fault, caught, by, surprise))
        print(f"{'CAUGHT' if caught else 'MISSED'}  {fault['id']}: {by}" + ("   (unexpected)" if surprise else ""))
    n = len(rows)
    k = sum(1 for _, c, _, _ in rows if c)
    lines = ["# Moriarty: faults planted, and what Sherlock caught (ISS-094)", "",
             f"{k} of {n} caught. A miss is a DOT in Sherlock: a kind of fault it cannot see yet.", "",
             "| fault | what | caught by | expected |", "|---|---|---|---|"]
    for f, c, by, s in rows:
        lines.append(f"| `{f['id']}` | {f['what']} | {by if c else '**missed**'} | {f['expect']}{' (unexpected)' if s else ''} |")
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "moriarty.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
    print(f"bld/sherlock/moriarty.md: {k} of {n} faults caught; {surprises} unexpected")
    return 1 if surprises else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
