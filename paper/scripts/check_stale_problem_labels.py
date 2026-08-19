#!/usr/bin/env python3
"""Reject stale numbered-problem labels for resolved implementation work."""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path

PAPER_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT = PAPER_DIR.parent

STALE_LABELS = (
    "Open Problem 3",
    "open_problem_3_progress",
    "Problem 3: The `FieldLayerType` Functor Upgrade",
    "Problem 4: Path-Dependence in Moduli Space",
    "4 of 21 scales upgraded",
    "pending Open Problem 3 closure",
)


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def check_text(path: Path, text: str) -> None:
    for label in STALE_LABELS:
        if label in text:
            fail(f"stale resolved-problem label in {path.relative_to(REPO_ROOT)}: {label}")


def pdf_text(path: Path) -> str:
    return subprocess.run(
        ["pdftotext", "-layout", str(path), "-"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", type=Path, action="append", default=[])
    args = parser.parse_args()

    source_paths = [
        PAPER_DIR / "soma" / "zoomable-somatic-field" / "zoomable-somatic-field.md",
        PAPER_DIR / "proofs" / "ScaleUniverse.lean",
    ]
    for path in source_paths:
        check_text(path, path.read_text(encoding="utf-8"))
        print(f"PASS  no stale resolved-problem labels in {path.relative_to(REPO_ROOT)}")

    for candidate in args.pdf:
        if candidate.is_absolute():
            pdf = candidate
        elif (PAPER_DIR / candidate).is_file():
            pdf = PAPER_DIR / candidate
        else:
            pdf = REPO_ROOT / candidate
        if not pdf.is_file():
            fail(f"missing candidate PDF: {pdf}")
        check_text(pdf, pdf_text(pdf))
        print(f"PASS  no stale resolved-problem labels in {pdf.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    main()
