#!/usr/bin/env python3
"""Verify the Lua registry hook filter resolves representative PAPERS.yaml data."""

from __future__ import annotations

import subprocess
import re
from pathlib import Path

import yaml

PAPER_DIR = Path(__file__).resolve().parent.parent


def main() -> None:
    output = subprocess.run(
        ["pandoc", "tests/registry-hooks.md", "--lua-filter=filters/registry-hooks.lua", "-t", "plain"],
        cwd=PAPER_DIR,
        check=True,
        capture_output=True,
        text=True,
    ).stdout
    output = re.sub(r"\s+", " ", output)
    # the expected count from the registry itself, so a new paper does not break the test
    registry = yaml.safe_load((PAPER_DIR.parent.parent / "Dist" / "PAPERS.yaml").read_text(encoding="utf-8"))
    required = (
        f"Canonical count: {len(registry['canonical_papers'])}",
        "P21: The Cosmological Constant as the Vacuum Amplitude of the Universal Somatic Field",
        "C1v2: The Soma-Field: Collected Works",
        "Second Edition",
    )
    for value in required:
        if value not in output:
            raise SystemExit(f"FAIL  missing resolved hook value: {value}")
    print("PASS  Lua registry hooks resolve canonical, paper, and collection metadata")


if __name__ == "__main__":
    main()
