"""views.py: levels of visualisation, by viewer (ISS-098): every pointer in registry/views.yaml resolves,
and the grid shows which scope and viewer have a view and which are gaps.

    python sherlock/views.py      # -> bld/sherlock/views.md; exit 1 on a broken pointer
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "views.md"
STOPS_JS = U / "apps" / "instrument" / "visuals" / "soma-field-operator" / "explorer.js"


def resolve(ptr: str, gallery_rooms: set[str], stops: set[str]) -> str | None:
    """None when the pointer resolves, else what is wrong."""
    kind, _, ref = ptr.partition(":")
    if kind == "tour":
        return None if (U / "registry" / "tours" / f"{ref}.yaml").exists() else f"no tour {ref}"
    if kind == "file":
        return None if (U / ref).exists() else f"no file {ref}"
    if kind == "gallery":
        return None if ref in gallery_rooms else f"no Gallery room {ref}"
    if kind == "level":
        return None if (U / "registry" / "levels" / f"{ref}.yaml").exists() else f"no level {ref}"
    if kind == "app":
        m = re.search(r"voyage=([\w-]+)", ref)
        return None if m and m.group(1) in stops else f"no stop in {ref}"
    return f"unknown pointer kind {kind!r}"


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    reg = yaml.safe_load((U / "registry" / "views.yaml").read_text(encoding="utf-8")) or {}
    rooms = {r["id"] for r in (yaml.safe_load((U / "registry" / "gallery.yaml").read_text(encoding="utf-8")) or {}).get("rooms") or []}
    m = re.search(r"export const STOPS = \[([^\]]*)\]", STOPS_JS.read_text(encoding="utf-8"))
    stops = set(re.findall(r"'([\w-]+)'", m.group(1))) if m else set()
    scopes, viewers, views = reg.get("scopes") or [], reg.get("viewers") or [], reg.get("views") or {}
    problems, have, gaps = [], 0, 0
    rows = ["| scope | " + " | ".join(viewers) + " |", "|---|" + "---|" * len(viewers)]
    for sc in scopes:
        cells = []
        for v in viewers:
            ptr = (views.get(sc) or {}).get(v)
            if ptr is None:
                cells.append("·")
            elif str(ptr).startswith("gap"):
                gaps += 1
                cells.append("**gap**")
            else:
                err = resolve(str(ptr), rooms, stops)
                if err:
                    problems.append(f"{sc} × {v}: {err}")
                    cells.append("**broken**")
                else:
                    have += 1
                    cells.append(str(ptr).split(":", 1)[0])
        rows.append(f"| {sc} | " + " | ".join(cells) + " |")
    for sc, row in views.items():
        for v in row:
            if sc not in scopes or v not in viewers:
                problems.append(f"{sc} × {v}: not a declared scope or viewer")
    empty = len(scopes) * len(viewers) - have - gaps - len(problems)
    head = f"{len(scopes)} scopes × {len(viewers)} viewers: {have} views, {gaps} named gaps, {empty} not yet considered; {len(problems)} problems"
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(["# Levels of visualisation, by viewer (ISS-098)", "", head, "", *rows, *(["", "Problems:", ""] + [f"- {p}" for p in problems] if problems else [])]) + "\n", encoding="utf-8")
    print(head)
    for p in problems:
        print(f"  PROBLEM {p}")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
