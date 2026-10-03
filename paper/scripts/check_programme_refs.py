#!/usr/bin/env python3
"""Check that programme-paper references stand on their own (docs/BUILD.md).

1. registry/papers.yaml is an up-to-date mirror of ../Dist/PAPERS.yaml.
2. Built documents contain no bare paper ids ("P21") outside the
   M4 x P3 x L1 x C3 dimension notation: every reference must be a real
   citation with a reference-list entry (lib/format/programme-refs.lua).
3. The paper table in .github/copilot-instructions.md agrees with the
   registry on DOIs and on whether a paper is published.

Exit 1 on failure. Documents that are not built are skipped with a note.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MIRROR = ROOT / "registry" / "papers.yaml"
DIST = ROOT.parent / "Dist" / "PAPERS.yaml"
INSTRUCTIONS = ROOT / ".github" / "copilot-instructions.md"

# Outputs built with programme-refs.lua: bare ids are failures.
STRICT = [
    "bld/atlas/field-atlas-a3.pdf",
    "bld/textbook/field-atlas-textbook-a3.pdf",
    "bld/books/book-gateway.pdf",
    "bld/books/ttheory-vol1.pdf",
    "bld/books/ttheory-vol2.pdf",
]
BARE = re.compile(r"\bP(1[0-9]|2[0-4]|[1-9])\b")
DIMENSION = re.compile(r"M4|L1|C3|×")

failures: list[str] = []
notes: list[str] = []


def registry_entries(text: str) -> dict[str, dict[str, str | None]]:
    entries: dict[str, dict[str, str | None]] = {}
    current: dict[str, str | None] | None = None
    for line in text.splitlines():
        m = re.match(r"^\s*-\s+id:\s*(\S+)", line)
        if m:
            current = {"doi": None, "status": None}
            entries[m.group(1)] = current
            continue
        m = re.match(r"^\s+(doi|status):\s*(.*?)\s*$", line)
        if m and current is not None:
            value = m.group(2).strip('"\'')
            current[m.group(1)] = None if value in ("", "null", "~") else value
    return entries


def check_mirror() -> dict[str, dict[str, str | None]]:
    mirror = MIRROR.read_text(encoding="utf-8")
    body = "\n".join(l for l in mirror.splitlines() if not l.startswith("# MIRROR"))
    if DIST.exists():
        dist = DIST.read_text(encoding="utf-8").replace("\r\n", "\n")
        if body.strip() != dist.strip():
            failures.append("registry/papers.yaml differs from Dist/PAPERS.yaml: run `make generate`")
    else:
        notes.append("Dist/PAPERS.yaml not found; mirror freshness not checked")
    return registry_entries(body)


def check_outputs() -> None:
    for rel in STRICT:
        pdf = ROOT / rel
        if not pdf.exists():
            notes.append(f"{rel} not built; skipped")
            continue
        text = subprocess.run(["pdftotext", "-layout", str(pdf), "-"],
                              capture_output=True, text=True, encoding="utf-8",
                              errors="replace").stdout
        bare = []
        for line in text.splitlines():
            for m in BARE.finditer(line):
                window = line[max(0, m.start() - 25): m.end() + 25]
                if not DIMENSION.search(window):
                    bare.append(window.strip())
        if bare:
            failures.append(f"{rel}: {len(bare)} bare paper id(s), e.g. " + "; ".join(bare[:3]))


def check_instructions(entries: dict[str, dict[str, str | None]]) -> None:
    if not INSTRUCTIONS.exists():
        return
    for line in INSTRUCTIONS.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^\|\s*(P\d+|D\d|C\d)\s*\|[^|]*\|\s*([^|]*?)\s*\|", line)
        if not m or m.group(1) not in entries:
            continue
        pid, cell = m.group(1), m.group(2)
        reg = entries[pid]
        doi = re.search(r"10\.5281/zenodo\.\d+", cell)
        if reg["doi"] and doi and doi.group(0) != reg["doi"]:
            failures.append(f"instructions {pid}: DOI {doi.group(0)} != registry {reg['doi']}")
        if reg["doi"] and not doi and re.search(r"pending|not yet", cell, re.I):
            failures.append(f"instructions {pid}: says '{cell}' but registry has DOI {reg['doi']}")
        if not reg["doi"] and doi:
            failures.append(f"instructions {pid}: lists DOI {doi.group(0)} but registry has none")


def main() -> int:
    entries = check_mirror()
    check_outputs()
    check_instructions(entries)
    for note in notes:
        print(f"note: {note}")
    if failures:
        print("check_programme_refs.py: FAIL")
        for item in failures:
            print(f"- {item}")
        return 1
    print(f"check_programme_refs.py: PASS ({len(entries)} registry records)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
