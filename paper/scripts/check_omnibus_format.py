#!/usr/bin/env python3
"""Verify the registry-driven merged C1v2 omnibus format contract."""

from __future__ import annotations

import re
import shutil
import subprocess
from pathlib import Path

import yaml

PAPER_DIR = Path(__file__).resolve().parent.parent
U_ROOT = PAPER_DIR.parent
REGISTRY = U_ROOT.parent / "Dist" / "PAPERS.yaml"
BODY = PAPER_DIR / "bld" / "omnibus-body.md"
PDF = PAPER_DIR / "bld" / "omnibus-a4.pdf"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(page: int) -> str:
    return subprocess.run(
        ["pdftotext", "-f", str(page), "-l", str(page), "-layout", str(PDF), "-"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout


def collection() -> dict[str, object]:
    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    value = next((entry for entry in registry.get("collections", []) if entry.get("id") == "C1v2"), None)
    if not value:
        fail("C1v2 collection missing from PAPERS.yaml")
    return value


def main() -> None:
    if not BODY.is_file() or not PDF.is_file():
        fail("missing merged omnibus source or PDF")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    c1v2 = collection()
    members = c1v2.get("members")
    if not isinstance(members, list) or not members:
        fail("C1v2 has no registered members")

    body = BODY.read_text(encoding="utf-8")
    if "\\includepdf[" in body or "papers-collection.md" in body:
        fail("facsimile PDF inclusion remains in merged omnibus source")
    if body.count("\\tableofcontents") != 0:
        fail("merged source must not inject a second master table of contents")
    if str(c1v2["title"]) not in body:
        fail("registry C1v2 title missing from merged source")

    dividers = re.findall(r"\\omnipaperdivider\{.*?\}\{([^}]+)\}", body, re.DOTALL)
    slugs = [member["slug"] for member in members]
    if dividers != slugs:
        fail("paper divider order differs from C1v2 members")
    for member in members:
        if member.get("part") and f"\\part{{{member['part']}}}" not in body:
            fail(f"registered part opening missing: {member['part']}")

    if page_text(2).strip():
        fail("physical page 2 is not a blank inside cover")
    if "Contents" not in page_text(3):
        fail("physical page 3 does not begin the sole master contents")
    if "Contents" in page_text(5):
        fail("master contents repeats after its initial run")

    print(f"PASS  C1v2 registry title and {len(slugs)} ordered members drive merged source")
    print("PASS  no facsimile imports or duplicate master contents")
    print("PASS  registered parts and paper dividers match registry order")
    print("PASS  title, blank inside cover, and sole master contents structure")


if __name__ == "__main__":
    main()
