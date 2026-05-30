#!/usr/bin/env python3
"""Build one master ZIP containing the full portable project state."""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

EXCLUDED_TOP_DIRS = {
    ".git",
    ".venv",
    ".lake",
    "__pycache__",
    "tmp",
}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def run_step(cmd: list[str]) -> None:
    subprocess.run(cmd, cwd=str(ROOT), check=True)


def refresh_component_bundles(version: str, quantum_version: str) -> None:
    """Ensure all key bundles are up to date before assembling the master ZIP."""
    py = sys.executable

    run_step([py, "scripts/paper_status.py"])
    run_step([py, "scripts/package_papers.py", "--version", version])
    run_step([py, "scripts/package_submissions.py", "--version", version])
    run_step([py, "instrument/package_release.py", "--version", quantum_version])


def should_include(rel: Path) -> bool:
    if not rel.parts:
        return False

    top = rel.parts[0]
    if top in EXCLUDED_TOP_DIRS:
        return False

    if top == "dist":
        if rel.suffix.lower() != ".zip":
            return False
        # Avoid recursive master-of-masters growth.
        return not rel.name.startswith("U-everything-")

    return True


def collect_files(exclude: Path | None = None) -> list[Path]:
    files: list[Path] = []

    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        if exclude is not None and path.resolve() == exclude.resolve():
            continue
        rel = path.relative_to(ROOT)
        if should_include(rel):
            files.append(path)

    return sorted(files)


def build_master_zip(version: str) -> Path:
    stamp = datetime.now().strftime("%Y%m%d")
    zip_name = f"U-everything-{version}-{stamp}.zip"
    zip_path = DIST / zip_name

    if zip_path.exists():
        zip_path.unlink()

    # Exclude the bundle being written to avoid recursive self-inclusion.
    files = collect_files(exclude=zip_path)
    manifest: dict[str, str] = {}

    with ZipFile(zip_path, "w", compression=ZIP_DEFLATED) as zf:
        for src in files:
            rel = src.relative_to(ROOT)
            arcname = rel.as_posix()
            zf.write(src, arcname=arcname)
            manifest[arcname] = sha256(src)

        readme = (
            "# U Master Bundle\n\n"
            f"Version: {version}\n"
            f"Generated: {datetime.now().isoformat()}\n\n"
            "This ZIP includes:\n"
            "- Full repository source (portable subset)\n"
            "- Dist ZIP artifacts (quantum test, paper freeze, submission bundles)\n"
            "- Integrity manifest\n"
        )

        zf.writestr("BUNDLE-README.md", readme)
        zf.writestr("BUNDLE-MANIFEST.json", json.dumps(manifest, indent=2))

    return zip_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Build one master ZIP with everything")
    parser.add_argument("--version", default="v1.0.0", help="Master bundle version")
    parser.add_argument(
        "--quantum-version",
        default="v0.1.1",
        help="Version passed to instrument/package_release.py",
    )
    parser.add_argument(
        "--skip-refresh",
        action="store_true",
        help="Skip rebuilding component bundles and use existing artifacts",
    )
    args = parser.parse_args()

    DIST.mkdir(parents=True, exist_ok=True)

    if not args.skip_refresh:
        refresh_component_bundles(args.version, args.quantum_version)

    zip_path = build_master_zip(args.version)
    print(f"Master bundle created: {zip_path}")


if __name__ == "__main__":
    main()
