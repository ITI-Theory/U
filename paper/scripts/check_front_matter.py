#!/usr/bin/env python3
"""Check the opening pages of every built PDF against paper/FORMAT.md.

Title recto (p1), blank verso (p2); then, by kind:
  paper, domain book   abstract recto (p3), blank verso (p4), contents recto (p5)
  Gateway              noir page recto (p3), blank verso (p4), contents recto (p5)
  omnibus, volume,     master contents recto (p3)
  course book
A blank page has no text at all. Exit 1 on any failure.

    python paper/scripts/check_front_matter.py
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BLD = ROOT / "bld"
SKIP_PAPERS = re.compile(r"^(omnibus-|lean-proofs-appendix|.*-royal|.*-lulu|.*cover)")


def page(pdf: Path, number: int) -> str:
    result = subprocess.run(["pdftotext", "-f", str(number), "-l", str(number), "-layout", str(pdf), "-"],
                            capture_output=True, text=True, encoding="utf-8", errors="replace")
    return result.stdout.strip()


def expect(pdf: Path, rules: list[tuple[int, str]]) -> list[str]:
    errors = []
    for number, want in rules:
        text = page(pdf, number)
        side = "recto" if number % 2 else "verso"
        if want == "blank" and text:
            errors.append(f"p{number} ({side}) should be blank: {text.splitlines()[0][:50]!r}")
        elif want == "text" and not text:
            errors.append(f"p{number} ({side}) should not be blank")
        elif want not in ("blank", "text") and not re.search(want, text[:400], re.I):
            first = text.splitlines()[0][:50] if text else "(blank)"
            errors.append(f"p{number} ({side}) should open with {want.strip('^')}: found {first!r}")
    return errors


def targets() -> list[tuple[Path, list[tuple[int, str]]]]:
    front = [(1, "text"), (2, "blank")]
    single = front + [(3, r"\bAbstract\b"), (4, "blank"), (5, r"\bContents\b")]
    master = front + [(3, r"\bContents\b")]
    out = []
    for pdf in sorted((BLD / "papers").glob("*.pdf")):
        if not SKIP_PAPERS.match(pdf.stem):
            out.append((pdf, single))
    for pdf in sorted((BLD / "books").glob("book-*.pdf")):
        if pdf.stem == "book-gateway":
            out.append((pdf, front + [(3, "text"), (4, "blank"), (5, r"\bContents\b")]))
        else:
            out.append((pdf, single))
    for name in ("papers/omnibus-a4.pdf", "books/ttheory-omnibus.pdf", "books/ttheory-vol1.pdf",
                 "books/ttheory-vol2.pdf", "textbook/ttheory-course.pdf"):
        out.append((BLD / name, master))
    return out


def main() -> int:
    sys.stdout.reconfigure(encoding="utf-8")
    failed = checked = 0
    for pdf, rules in targets():
        if not pdf.exists():
            continue
        checked += 1
        errors = expect(pdf, rules)
        if errors:
            failed += 1
            print(f"FAIL {pdf.relative_to(ROOT).as_posix()}")
            for error in errors:
                print(f"     {error}")
    print(f"{checked} PDFs checked, {failed} failing")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
