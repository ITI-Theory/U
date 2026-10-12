"""Check the programme's licences against registry/licences.yaml (ISS-086).

    python paper/scripts/check_licences.py            # files, READMEs, manifests, statements
    python paper/scripts/check_licences.py --zenodo   # also every Zenodo record in Dist/PAPERS.yaml

A licence text is easily lost (a file deleted, replaced, truncated): each public
repository's licence files must exist with exactly the canonical text (SHA-256), its README
must have a Licence section naming the licences, package manifests must carry the SPDX
expression, and the statements that name the text licence must still say it. Sibling
repositories not cloned next to U are reported and skipped (a CI checkout of U alone).
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[2]
ROOT = U.parent
SHORT = {"CC-BY-4.0": "CC BY 4.0", "Apache-2.0": "Apache"}


def main() -> int:
    reg = yaml.safe_load((U / "registry" / "licences.yaml").read_text(encoding="utf-8"))
    lic = reg["licences"]
    errors: list[str] = []
    skipped: list[str] = []
    checked = 0
    for name, repo in reg["repositories"].items():
        base = ROOT / repo["path"]
        if not base.exists():
            skipped.append(name)
            continue
        for fname, spdx in repo["files"].items():
            f = base / fname
            checked += 1
            if not f.exists():
                errors.append(f"{name}/{fname}: missing (should be {spdx})")
            elif hashlib.sha256(f.read_bytes()).hexdigest() != lic[spdx]["sha256"]:
                errors.append(f"{name}/{fname}: not the canonical {spdx} text")
        readme = base / repo["readme"]
        checked += 1
        text = readme.read_text(encoding="utf-8") if readme.exists() else ""
        wanted = {SHORT[s] for s in repo["files"].values()} or set(SHORT.values())
        if not re.search(r"licen[cs]e", text, re.I) or not all(w in text for w in wanted):
            errors.append(f"{name}/{repo['readme']}: no licence statement naming {', '.join(sorted(wanted))}")
    for rel, spdx in reg["manifests"].items():
        checked += 1
        got = json.loads((U / rel).read_text(encoding="utf-8")).get("license")
        if got != spdx:
            errors.append(f"{rel}: license is {got!r}, should be {spdx!r}")
    for rel, phrase in reg["statements"].items():
        checked += 1
        if phrase not in (U / rel).read_text(encoding="utf-8"):
            errors.append(f"{rel}: no longer says {phrase!r}")
    if "--zenodo" in sys.argv:
        papers = ROOT / "Dist" / "PAPERS.yaml"
        ids = sorted(set(re.findall(r"10\.5281/zenodo\.(\d+)", papers.read_text(encoding="utf-8"))))
        for i in ids:
            checked += 1
            req = urllib.request.Request(f"https://zenodo.org/api/records/{i}", headers={"User-Agent": "ITI-Theory licence check"})
            got = (json.load(urllib.request.urlopen(req, timeout=30))["metadata"].get("license") or {}).get("id")
            if got != "cc-by-4.0":
                errors.append(f"zenodo.{i}: licence {got!r}, should be cc-by-4.0")
    for e in errors:
        print(f"FAIL  {e}")
    if skipped:
        print(f"note  not cloned next to U, skipped: {', '.join(skipped)}")
    if errors:
        return 1
    print(f"PASS  licences: {checked} checks (CC BY 4.0 for text, Apache-2.0 for code)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
