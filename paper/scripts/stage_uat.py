#!/usr/bin/env python3
"""Stage explicit UAT candidate PDFs and record their hashes.

Every staged file carries the candidate version from uat/manifest.yaml in its
name, like a library (`omnibus-a4.rc3.1.pdf`); MANIFEST.md links that version
to the git ref it was built from.
"""

from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import shutil
import subprocess
from pathlib import Path

import yaml

U_ROOT = Path(__file__).resolve().parent.parent.parent
MANIFEST = U_ROOT / "uat" / "manifest.yaml"
STAGING_ROOT = U_ROOT / "uat" / "staging"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def git_ref() -> str:
    def git(*args: str) -> str:
        return subprocess.run(["git", *args], cwd=U_ROOT, capture_output=True, text=True, check=True).stdout.strip()
    return git("rev-parse", "--short", "HEAD") + ("-dirty" if git("status", "--porcelain") else "")


def versioned(name: str, version: str) -> str:
    path = Path(name)
    return f"{path.stem}.{version}{path.suffix}"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("track", choices=("papers", "ttheory", "lulu-proofs"))
    args = parser.parse_args()

    manifest = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    version = str(manifest["version"])
    track = manifest[args.track]
    staging_dir = STAGING_ROOT / args.track
    staging_dir.mkdir(parents=True, exist_ok=True)
    for old in staging_dir.iterdir():  # generated output: no stale names from an earlier version
        if old.is_file():
            old.unlink()

    staged = []
    source_paths = [("PDF", relative_path) for relative_path in track["files"]]
    if track.get("worksheet"):
        source_paths.append(("Worksheet", track["worksheet"]))
    if track.get("readme"):
        source_paths.append(("Instructions", track["readme"]))
    for relative_path in track.get("context_files", []):
        source_paths.append(("Context", relative_path))

    for kind, relative_path in source_paths:
        source = U_ROOT / relative_path
        if not source.is_file():
            raise FileNotFoundError(f"Missing candidate: {relative_path}")
        destination = staging_dir / versioned(source.name, version)
        shutil.copy2(source, destination)
        staged.append((kind, relative_path, destination.name, sha256(destination)))

    ref = git_ref()
    lines = [
        f"# UAT Staging: {args.track}",
        "",
        track["purpose"],
        "",
        f"Version: {version} (U {ref}, staged {dt.date.today().isoformat()})",
        "",
        "| Type | Source | Staged file | SHA-256 |",
        "|---|---|---|---|",
    ]
    lines.extend(
        f"| {kind} | `{source}` | `{name}` | `{digest}` |"
        for kind, source, name, digest in staged
    )
    (staging_dir / "MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Staged {len(staged)} artifact(s) as {version} (U {ref}): {staging_dir.relative_to(U_ROOT)}")


if __name__ == "__main__":
    main()
