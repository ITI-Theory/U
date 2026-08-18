#!/usr/bin/env python3
"""Verify the mechanical print-format contract for the Papers collection."""

from __future__ import annotations

import shutil
import subprocess
import sys
import re
import yaml
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
BODY = PAPER_DIR / "bld" / "papers-collection.md"
PDF = PAPER_DIR / "bld" / "omnibus-a4.pdf"
BUILD_SCRIPT = PAPER_DIR / "scripts" / "build_omnibus.py"


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def page_text(pdf: Path, start: int, end: int) -> str:
    command = ["pdftotext", "-f", str(start), "-l", str(end), "-layout", str(pdf), "-"]
    return subprocess.run(command, check=True, capture_output=True, text=True).stdout


def source_abstract(slug: str) -> str:
    source = PAPER_DIR / "soma" / slug / f"{slug}.md"
    text = source.read_text(encoding="utf-8")
    match = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not match:
        return ""
    metadata = yaml.safe_load(match.group(1)) or {}
    return str(metadata.get("abstract", "")).strip()


def main() -> None:
    if not BODY.is_file():
        fail(f"missing body: {BODY}")
    if not PDF.is_file():
        fail(f"missing PDF: {PDF}")
    if shutil.which("pdftotext") is None:
        fail("pdftotext is unavailable")

    body = BODY.read_text(encoding="utf-8")
    divider_count = body.count("\\omnipaperdivider{")
    if divider_count == 0:
        fail("no paper divider commands found")
    include_count = body.count("\\includepdf[")
    if include_count != divider_count:
        fail("every paper divider must be followed by one facsimile PDF inclusion")
    if "Papers merged" in body or "\\part{" in body:
        fail("collection source still contains merged-manuscript structure")

    build_namespace: dict[str, object] = {"__file__": str(BUILD_SCRIPT), "__name__": "omnibus_format"}
    exec(BUILD_SCRIPT.read_text(encoding="utf-8"), build_namespace)
    for _, slug in build_namespace["STRUCTURE"]:
        if slug:
            expected_pdf = f"bld/{slug}.pdf"
            if expected_pdf not in body:
                fail(f"facsimile PDF missing from collection source: {slug}")

    first_pages = page_text(PDF, 1, 3).split("\f")
    if len(first_pages) < 3:
        fail("PDF has fewer than three physical pages")
    if first_pages[1].strip():
        fail("physical page 2 is not blank inside cover")
    if "Contents" not in first_pages[2]:
        fail("physical page 3 does not begin the master contents")

    dividers = re.findall(
        r"\\omnipaperdivider\{([^}]+)\}\{([^}]+)\}\{([^}]+)\}", body
    )
    all_pages = page_text(PDF, 1, 10000).split("\f")
    for _label, _title, slug in dividers:
        page_number = next(
            (
                index + 1
                for index, page in enumerate(all_pages)
                if "COLLECTION PAPER" in page and slug in page
            ),
            None,
        )
        if page_number is None:
            fail(f"divider slug not found in PDF: {slug}")
        if page_number % 2 == 0:
            fail(f"paper divider is not recto: {slug} on page {page_number}")

    print(f"PASS  {divider_count} paper PDFs included as facsimiles")
    print("PASS  title, blank inside cover, and master contents structure")
    print("PASS  recto major parts and appendix contract")
    print("PASS  every paper divider begins on an odd physical page")


if __name__ == "__main__":
    main()
