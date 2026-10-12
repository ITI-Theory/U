#!/usr/bin/env python3
"""The Lean appendix's catalogue lists exactly the files in paper/proofs (ISS-034).

    python scripts/check_lean_catalogue.py

soma/lean-proofs-appendix/catalogue.yaml is the one inventory: lean-include.lua
reads the files in its order. A .lean file with no entry is left out of the
appendix; an entry with no file breaks the build. Exit 1 on either.
"""
import re
import sys
from pathlib import Path

PAPER = Path(__file__).resolve().parents[1]
catalogue = (PAPER / "soma" / "lean-proofs-appendix" / "catalogue.yaml").read_text(encoding="utf-8")
listed = re.findall(r"(?m)^([A-Za-z0-9_]+\.lean):", catalogue)
files = sorted(p.name for p in (PAPER / "proofs").glob("*.lean"))
missing = [f for f in files if f not in listed]
stale = [f for f in listed if f not in files]
dupes = sorted({f for f in listed if listed.count(f) > 1})
for f in missing:
    print(f"FAIL  {f}: in paper/proofs but not in the catalogue (left out of the appendix)")
for f in stale:
    print(f"FAIL  {f}: in the catalogue but not in paper/proofs")
for f in dupes:
    print(f"FAIL  {f}: listed twice")
if missing or stale or dupes:
    sys.exit(1)
print(f"PASS  Lean catalogue: {len(listed)} files, all in paper/proofs, none missing")
