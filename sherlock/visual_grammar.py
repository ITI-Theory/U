"""The visual grammar check (ISS-104): the app's pictures against the model, both ways.

    python sherlock/visual_grammar.py          # report; exit 1 on a problem

registry/visual-grammar.yaml lists the model's terms (each pinned to a Lean declaration or a
paper) and the app's visual channels (each pinned to its code, with the terms it expresses).
Problems (exit 1): a term whose Lean name or paper is missing; a channel whose code anchor is
missing, which names an unknown term, or which expresses no term without saying it is
decorative (the chocolate bar). Reported, not failed: terms no channel expresses yet (the next
pictures to design) and decorative channels. Writes bld/sherlock/visual-grammar.md.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
REG = U / "registry" / "visual-grammar.yaml"
OUT = U / "bld" / "sherlock" / "visual-grammar.md"


def lean_has(path: Path, name: str) -> bool:
    """The name is declared in the file (def, theorem, inductive, structure, class, abbrev) or
    is a field of a class or structure there (`  name :`)."""
    text = path.read_text(encoding="utf-8")
    decl = re.compile(rf"^\s*(?:noncomputable\s+|private\s+|protected\s+)*(?:def|theorem|lemma|inductive|structure|class|abbrev|instance)\s+{re.escape(name)}\b", re.M)
    field = re.compile(rf"^\s+{re.escape(name)}\s*:", re.M)
    return bool(decl.search(text) or field.search(text))


def main(argv: list[str]) -> int:
    reg = yaml.safe_load(REG.read_text(encoding="utf-8"))
    terms = {t["id"]: t for t in reg.get("terms", [])}
    problems: list[str] = []
    for t in terms.values():
        if "lean" in t:
            f = U / t["lean"]["file"]
            if not f.exists():
                problems.append(f"term {t['id']}: Lean file {t['lean']['file']} missing")
            elif not lean_has(f, t["lean"]["name"]):
                problems.append(f"term {t['id']}: `{t['lean']['name']}` not declared in {t['lean']['file']}")
        elif "paper" in t:
            if not (U / t["paper"]).exists():
                problems.append(f"term {t['id']}: paper {t['paper']} missing")
        else:
            problems.append(f"term {t['id']}: pinned to neither Lean nor a paper")
    expressed: dict[str, list[str]] = {k: [] for k in terms}
    decorative = []
    for c in reg.get("channels", []):
        f = U / c["code"]["file"]
        if not f.exists():
            problems.append(f"channel {c['id']}: code file {c['code']['file']} missing")
        elif c["code"]["anchor"] not in f.read_text(encoding="utf-8"):
            problems.append(f"channel {c['id']}: anchor {c['code']['anchor']!r} not in {c['code']['file']}")
        names = c.get("expresses") or []
        for n in names:
            if n not in terms:
                problems.append(f"channel {c['id']}: expresses unknown term {n!r}")
            else:
                expressed[n].append(c["id"])
        if not names:
            if c.get("decorative"):
                decorative.append(c)
            else:
                problems.append(f"channel {c['id']}: expresses no term of the model and does not say it is decorative (the chocolate bar)")
    gaps = [t for t in terms if not expressed[t]]
    lines = ["# The visual grammar (ISS-104)", "",
             f"{len(terms)} model terms, {len(reg.get('channels', []))} channels; "
             f"{len(terms) - len(gaps)} terms shown, {len(gaps)} not yet shown, {len(decorative)} decorative channels; "
             f"{len(problems)} problems", "",
             "| term | what | shown by |", "|---|---|---|"]
    for k, t in terms.items():
        lines.append(f"| {k} | {t['what']} | {', '.join(expressed[k]) or '**not yet shown**'} |")
    if decorative:
        lines += ["", "Decorative channels (express no model term, and say so):", ""]
        lines += [f"- {c['id']}: {c['decorative']}" for c in decorative]
    if problems:
        lines += ["", "Problems:", ""] + [f"- {p}" for p in problems]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(lines[2])
    for p in problems:
        print(f"  PROBLEM {p}")
    if gaps:
        print(f"  not yet shown: {', '.join(gaps)}")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
