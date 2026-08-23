#!/usr/bin/env python3
"""Stage a registry-driven future-Dist mirror beneath UAT without promotion."""

from __future__ import annotations

import hashlib
import shutil
from pathlib import Path

import yaml

U_ROOT = Path(__file__).resolve().parent.parent.parent
DIST_ROOT = U_ROOT.parent / "Dist"
REGISTRY = DIST_ROOT / "PAPERS.yaml"
STAGING = U_ROOT / "uat" / "staging" / "full"
PAPER_BLD = U_ROOT / "paper" / "bld"
FRAC_BLD = U_ROOT / "Part2" / "fractal-programme" / "bld"


def digest(path: Path) -> str:
    hasher = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            hasher.update(block)
    return hasher.hexdigest()


def source(entry: dict[str, object]) -> Path:
    if entry.get("build") == "fractal":
        filename = entry.get("bld_file")
        if not filename:
            filename = f"book-{str(entry['slug']).removeprefix('ttheory-book-')}.pdf"
        return FRAC_BLD / str(filename)
    return PAPER_BLD / str(entry.get("bld_file") or f"{entry['slug']}.pdf")


def copy(
    records: list[tuple[str, Path, str]],
    destination: str,
    source_path: Path,
    ready_status: str = "READY",
    missing_status: str = "MISSING",
) -> None:
    target = STAGING / destination
    target.parent.mkdir(parents=True, exist_ok=True)
    if not source_path.is_file():
        records.append((missing_status, source_path, destination))
        return
    shutil.copy2(source_path, target)
    records.append((ready_status, source_path, destination))


def main() -> None:
    data = yaml.safe_load(REGISTRY.read_text(encoding="utf-8")) or {}
    entries = [entry for section in data.values() if isinstance(section, list) for entry in section]
    if STAGING.exists():
        shutil.rmtree(STAGING)
    records: list[tuple[str, Path, str]] = []

    for entry in entries:
        if entry.get("build") == "manual" or not entry.get("file"):
            continue
        candidate = source(entry)
        if entry.get("distribution", True) and (entry.get("build") != "fractal" or entry.get("id") == "C2"):
            copy(records, str(entry["file"]), candidate)
        if entry.get("zenodo_file"):
            copy(records, str(entry["zenodo_file"]), candidate)
        if entry.get("nlm_min"):
            copy(records, f"nlm-min/{entry['nlm_min']}.pdf", candidate)
        nlm_name = entry.get("nlm")
        if not nlm_name and str(entry.get("slug", "")).startswith("ttheory-book-"):
            nlm_name = f"B{int(entry['book_number']):02d}-{entry['slug']}"
        if nlm_name:
            copy(records, f"nlm-max/{nlm_name}.pdf", candidate)
        if entry.get("lulu"):
            lulu_name = str(entry["lulu"])
            status = "READY"
            copy(records, f"lulu/{lulu_name}.pdf", candidate, status, status)
            cover_root = PAPER_BLD / "lulu-covers"
            for suffix in ("linen-wrap-proof", "dust-jacket"):
                copy(
                    records,
                    f"lulu/{lulu_name}-{suffix}.pdf",
                    cover_root / f"{lulu_name}-{suffix}.pdf",
                    status,
                    "MISSING-COVER" if status == "READY" else status,
                )
        if entry.get("stuff"):
            copy(records, f"stuff/{entry['stuff']}", candidate)
        if str(entry.get("slug", "")).startswith("ttheory-book-"):
            domain = str(entry["slug"]).removeprefix("ttheory-book-")
            copy(records, f"stuff/ttheory-cheatsheet-{domain}.pdf", FRAC_BLD / f"booklet-{domain}.pdf")

    for relative in ("paper/bld/uat-context/PAPERS.md", "paper/bld/uat-context/BUILD_CONTEXT.md", "uat/DISTRIBUTION_MIRROR.md", "uat/dev-handover.md"):
        copy(records, f"_context/{Path(relative).name}", U_ROOT / relative)

    lines = ["# Full UAT Distribution Mirror", "", "| Status | U source | UAT destination | SHA-256 |", "|---|---|---|---|"]
    for status, source_path, destination in records:
        staged = STAGING / destination
        hash_value = digest(staged) if staged.is_file() else "-"
        lines.append(f"| {status} | `{source_path.relative_to(U_ROOT)}` | `{destination}` | `{hash_value}` |")
    (STAGING / "MANIFEST.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Staged {sum((STAGING / destination).is_file() for _, _, destination in records)} artifacts: {STAGING.relative_to(U_ROOT)}")


if __name__ == "__main__":
    main()
