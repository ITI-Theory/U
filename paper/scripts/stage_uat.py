#!/usr/bin/env python3
"""Stage explicit UAT candidate PDFs and record their hashes."""

from __future__ import annotations

import argparse
import hashlib
import shutil
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


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("track", choices=("papers", "ttheory"))
    args = parser.parse_args()

    manifest = yaml.safe_load(MANIFEST.read_text(encoding="utf-8"))
    track = manifest[args.track]
    staging_dir = STAGING_ROOT / args.track
    staging_dir.mkdir(parents=True, exist_ok=True)

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
        destination = staging_dir / source.name
        shutil.copy2(source, destination)
        staged.append((kind, relative_path, destination.name, sha256(destination)))

    lines = [
        f"# UAT Staging: {args.track}",
        "",
        track["purpose"],
        "",
        "| Type | Source | Staged file | SHA-256 |",
        "|---|---|---|---|",
    ]
    lines.extend(
        f"| {kind} | `{source}` | `{name}` | `{digest}` |"
        for kind, source, name, digest in staged
    )
    (staging_dir / "MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Staged {len(staged)} artifact(s): {staging_dir.relative_to(U_ROOT)}")


if __name__ == "__main__":
    main()
