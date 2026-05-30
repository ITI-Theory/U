#!/usr/bin/env python3
"""Create a freeze-ready ZIP containing paper sources and PDFs."""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[2]
PAPER_DIR = ROOT / "paper"
DIST_DIR = ROOT / "dist"

INCLUDE_SUFFIXES = {".md", ".pdf", ".bib", ".csl", ".lua", ".lean"}
INCLUDE_NAMES = {"Makefile", "PAPER_STATUS.md", "paper_status.json", "QUANT-EXP-SWEEP-2026-05-20.md"}



def compute_sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()



def should_include(path: Path) -> bool:
    if path.name in INCLUDE_NAMES:
        return True
    if path.suffix.lower() in INCLUDE_SUFFIXES:
        return True
    return False



def build(version: str) -> Path:
    stamp = datetime.now().strftime("%Y%m%d")
    package_name = f"U-papers-freeze-{version}-{stamp}"

    staging = DIST_DIR / package_name
    if staging.exists():
        shutil.rmtree(staging)
    (staging / "paper").mkdir(parents=True, exist_ok=True)

    manifest = {}

    for src in sorted(PAPER_DIR.rglob("*")):
        if not src.is_file():
            continue
        if src.is_relative_to(PAPER_DIR / "bld"):
            continue
        if not should_include(src):
            continue
        rel = src.relative_to(PAPER_DIR)
        dst = staging / "paper" / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        manifest[str(dst.relative_to(staging)).replace(chr(92), "/")] = compute_sha256(dst)

    readme_text = f"""# U Papers Freeze Package

Version: {version}
Generated: {datetime.now().isoformat()}

## Included
- Markdown and PDF papers (EN/DE/FR/IT variants)
- bibliography.bib and apa-7th.csl
- Makefile and status exports
- SHA256 manifest

## Validation
Use MANIFEST.json to verify file integrity after transfer.
"""
    (staging / "FREEZE-README.md").write_text(readme_text, encoding="utf-8")
    (staging / "MANIFEST.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    zip_path = DIST_DIR / f"{package_name}.zip"
    if zip_path.exists():
        zip_path.unlink()

    with ZipFile(zip_path, "w", compression=ZIP_DEFLATED) as zf:
        for f in staging.rglob("*"):
            if f.is_file():
                zf.write(f, arcname=f.relative_to(staging))

    return zip_path



def main() -> None:
    parser = argparse.ArgumentParser(description="Build freeze-ready paper ZIP")
    parser.add_argument("--version", default="v1.0.0", help="Version for freeze package")
    args = parser.parse_args()

    DIST_DIR.mkdir(parents=True, exist_ok=True)
    zip_path = build(args.version)
    print(f"Paper freeze package created: {zip_path}")


if __name__ == "__main__":
    main()
