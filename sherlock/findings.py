"""Sherlock's findings report: what each affidavit proves, from its Lean source.

Run after `make -C sherlock affidavits` (which fails if any proof fails, so
every theorem listed here has been checked by Lean). For each affidavit file
it lists the document it examines (the module header's first heading), each
theorem with its doc comment, and each "not provable" test (`fail_if_success`).
Output: bld/sherlock/findings.md, a report for people; not a document build.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
U = HERE.parent
OUT = U / "bld" / "sherlock" / "findings.md"

DECL = re.compile(r"^(?P<kind>theorem|example)\b\s*(?P<name>[\w.']*)", re.M)


def clean(doc: str) -> str:
    return " ".join(doc.split())


def doc_before(src: str, pos: int) -> str:
    """The doc comment directly above a declaration (only whitespace between)."""
    before = src[:pos].rstrip()
    if not before.endswith("-/"):
        return ""
    start = before.rfind("/--")
    if start < 0 or before.rfind("-/", 0, len(before) - 2) > start:
        return ""
    return clean(before[start + 3:-2])


def affidavit(path: Path) -> list[str]:
    src = path.read_text(encoding="utf-8")
    header = re.search(r"/-!\s*#\s*(.+)", src)
    title = header.group(1).strip() if header else path.stem
    lines, steps = [f"## {title}", "", f"`{path.relative_to(HERE).as_posix()}`", ""], []
    for m in DECL.finditer(src):
        doc = doc_before(src, m.start())
        nxt = DECL.search(src, m.end())
        body = src[m.end(): nxt.start() if nxt else len(src)]
        if m.group("kind") == "example":
            if "fail_if_success" in body:
                lines.append(f"- **not provable** (Aesop must fail): {doc or 'see source'}")
            continue
        sig = body.split(":=", 1)[0]
        label = "contradiction" if ".falsum" in sig else "proved"
        if doc or label == "contradiction":
            lines.append(f"- `{m.group('name')}` ({label})" + (f": {doc}" if doc else ""))
        else:
            steps.append(f"`{m.group('name')}`")
    if steps:
        lines.append(f"- steps (proved): {', '.join(steps)}")
    return lines + [""]

def ledger(path: Path) -> list[str]:
    """A ledger file: each #eval check, with the comment line(s) just above it."""
    src = path.read_text(encoding="utf-8")
    header = re.search(r"/-!\s*#\s*(.+)", src)
    lines = [f"## {header.group(1).strip() if header else path.stem}", "",
             f"`{path.relative_to(HERE).as_posix()}` (programme's own Lean, root package)", ""]
    for m in re.finditer(r"((?:^--[^\n]*\n)+)#eval", src, re.M):
        note = clean(" ".join(l[2:] for l in m.group(1).splitlines()))
        lines.append(f"- **ledger** (Lean environment checked): {note}")
    return lines + [""]


def main() -> int:
    files = sorted((HERE / "Affidavits").rglob("*.lean"))
    if not files:
        print("no affidavits", file=sys.stderr)
        return 1
    out = ["# Sherlock findings", "",
           "Every theorem below was checked by Lean (`make -C sherlock affidavits`).",
           "Labels: proved; contradiction (a proof of `falsum` in the affidavit's microtheory);",
           "not provable (from what OpenCyc holds; not the same as false).", ""]
    for f in files:
        out += affidavit(f)
    for f in sorted(p for p in (HERE / "Ledger").glob("*.lean") if p.name != "Judge.lean"):
        out += ledger(f)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(out), encoding="utf-8", newline="\n")
    n = sum(1 for l in out if l.startswith("- "))
    print(f"{OUT.relative_to(U).as_posix()}: {len(files)} affidavits, {n} findings")
    return 0


if __name__ == "__main__":
    sys.exit(main())
