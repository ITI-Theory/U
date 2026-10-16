"""sound_grammar.py: what the model says can be heard (ISS-115), checked as the pictures are.

Reads registry/sound-grammar.yaml with the model terms of registry/visual-grammar.yaml (one model,
two senses). Fails on: a heard channel whose code anchor is gone; a channel naming an unknown term;
a channel that expresses nothing and does not say it is decorative; a planned channel without its
label. Reports which terms are heard in the app, which are only planned (an instrument outside the
Soma Machine, ISS-115), and which no sound carries yet.

    python sherlock/sound_grammar.py      # -> bld/sherlock/sound-grammar.md
"""
from __future__ import annotations

import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
OUT = U / "bld" / "sherlock" / "sound-grammar.md"


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    terms = {t["id"]: t for t in (yaml.safe_load((U / "registry" / "visual-grammar.yaml").read_text(encoding="utf-8")) or {}).get("terms", [])}
    reg = yaml.safe_load((U / "registry" / "sound-grammar.yaml").read_text(encoding="utf-8")) or {}
    problems, heard, planned, decorative = [], {k: [] for k in terms}, {k: [] for k in terms}, []
    for c in reg.get("channels", []):
        kind = c.get("kind")
        if kind == "heard":
            f = U / c.get("code", {}).get("file", "")
            if not f.is_file():
                problems.append(f"channel {c['id']}: code file {c.get('code', {}).get('file')} missing")
            elif c["code"]["anchor"] not in f.read_text(encoding="utf-8"):
                problems.append(f"channel {c['id']}: anchor {c['code']['anchor']!r} not in {c['code']['file']}")
        elif kind == "planned":
            if not c.get("label"):
                problems.append(f"channel {c['id']}: planned without a label")
            if c.get("via") not in ("scaler", "instrument", "daw"):
                problems.append(f"channel {c['id']}: via must be scaler, instrument or daw")
        else:
            problems.append(f"channel {c['id']}: kind must be heard or planned")
        names = c.get("expresses") or []
        for n in names:
            if n not in terms:
                problems.append(f"channel {c['id']}: expresses unknown term {n!r}")
            else:
                (heard if kind == "heard" else planned)[n].append(c["id"])
        if not names:
            if c.get("decorative"):
                decorative.append(c)
            else:
                problems.append(f"channel {c['id']}: expresses no term and does not say it is decorative (the chocolate bar)")
    silent = [t for t in terms if not heard[t] and not planned[t]]
    only_planned = [t for t in terms if not heard[t] and planned[t]]
    n = len(reg.get("channels", []))
    head = (f"{len(terms)} model terms, {n} sound channels; {len(terms) - len(silent) - len(only_planned)} heard in the app, "
            f"{len(only_planned)} only planned, {len(silent)} carried by no sound; {len(problems)} problems")
    lines = ["# The sound grammar (ISS-115)", "", head, "", "| term | heard in the app | planned (outside it) |", "|---|---|---|"]
    lines += [f"| {k} | {', '.join(heard[k]) or '·'} | {', '.join(planned[k]) or '·'} |" for k in terms]
    if decorative:
        lines += ["", "Decorative (no model term, and they say so):", ""] + [f"- {c['id']}: {c['decorative']}" for c in decorative]
    if problems:
        lines += ["", "Problems:", ""] + [f"- {p}" for p in problems]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(head)
    for p in problems:
        print(f"  PROBLEM {p}")
    if silent:
        print(f"  carried by no sound: {', '.join(silent)}")
    return 1 if problems else 0


if __name__ == "__main__":
    raise SystemExit(main())
