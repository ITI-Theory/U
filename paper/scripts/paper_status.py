#!/usr/bin/env python3
"""Generate a paper status snapshot for the U repository."""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[1]
PAPER_DIR = ROOT / "paper"

BASE_DOCS = [
    "soma-field-paper",
    "soma-field-patient-pov",
    "quantum-soma-penrose",
    "mathematical-co-identification",
    "music-affect-dynamics",
    "soma-field-book",
    "the-tensor",
]

LANGS = {
    "en": "English",
    "de": "German",
    "fr": "French",
    "it": "Italian",
}

PUBLICATION_TRACKER = [
    {
        "channel": "Zenodo",
        "document": "soma-field-paper",
        "status": "published",
        "evidence": "DOI https://doi.org/10.5281/zenodo.20350516 (May 2026)",
    },
    {
        "channel": "Zenodo",
        "document": "quantum-soma-penrose",
        "status": "published",
        "evidence": "DOI https://doi.org/10.5281/zenodo.20351231 (May 2026)",
    },
    {
        "channel": "Zenodo",
        "document": "mathematical-co-identification",
        "status": "published",
        "evidence": "DOI https://doi.org/10.5281/zenodo.20350331 (May 2026)",
    },
    {
        "channel": "bioRxiv",
        "document": "soma-field-paper",
        "status": "posted",
        "evidence": "README reports BIORXIV/2026/725970 (May 18, 2026)",
    },
    {
        "channel": "Frontiers (Computational Neuroscience)",
        "document": "soma-field-paper",
        "status": "not confirmed in repo",
        "evidence": "No submission receipt or manuscript ID found in tracked files",
    },
    {
        "channel": "PsyArXiv",
        "document": "music-affect-dynamics",
        "status": "not submitted",
        "evidence": "Pending post-hardening experiment completion",
    },
    {
        "channel": "arXiv",
        "document": "mathematical-co-identification",
        "status": "not submitted",
        "evidence": "Submission pending",
    },
]


@dataclass
class FileState:
    exists: bool
    path: str
    modified: str



def fmt_mtime(path: Path) -> str:
    if not path.exists():
        return "-"
    dt = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    return dt.strftime("%Y-%m-%d %H:%M UTC")



def state_for(path: Path) -> FileState:
    return FileState(path.exists(), path.relative_to(ROOT).as_posix(), fmt_mtime(path))



def build_inventory() -> Dict[str, Dict[str, Dict[str, str]]]:
    inventory: Dict[str, Dict[str, Dict[str, str]]] = {}

    for base in BASE_DOCS:
        inventory[base] = {}
        for lang in LANGS:
            suffix = "" if lang == "en" else f".{lang}"
            md_path = PAPER_DIR / f"{base}{suffix}.md"
            pdf_path = PAPER_DIR / f"{base}{suffix}.pdf"
            md_state = state_for(md_path)
            pdf_state = state_for(pdf_path)
            inventory[base][lang] = {
                "language": LANGS[lang],
                "md_exists": "yes" if md_state.exists else "no",
                "pdf_exists": "yes" if pdf_state.exists else "no",
                "md_modified": md_state.modified,
                "pdf_modified": pdf_state.modified,
                "md_path": md_state.path,
                "pdf_path": pdf_state.path,
            }

    return inventory



def get_version_snapshots() -> List[str]:
    return sorted([p.name for p in PAPER_DIR.glob("*.V*.md")])



def render_markdown(inventory: Dict[str, Dict[str, Dict[str, str]]], snapshots: List[str]) -> str:
    now = datetime.now(tz=timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines: List[str] = []
    lines.append("# Paper Status Dashboard")
    lines.append("")
    lines.append(f"Generated: {now}")
    lines.append("")
    lines.append("## Publication Status")
    lines.append("")
    lines.append("| Channel | Document | Status | Evidence |")
    lines.append("|---|---|---|---|")
    for row in PUBLICATION_TRACKER:
        lines.append(
            f"| {row['channel']} | {row['document']} | {row['status']} | {row['evidence']} |"
        )

    lines.append("")
    lines.append("## Build Artifact Matrix")
    lines.append("")

    for base, lang_map in inventory.items():
        lines.append(f"### {base}")
        lines.append("")
        lines.append("| Lang | Markdown | PDF | Markdown Modified | PDF Modified |")
        lines.append("|---|---|---|---|---|")
        for lang in ["en", "de", "fr", "it"]:
            entry = lang_map[lang]
            lines.append(
                f"| {entry['language']} | {entry['md_exists']} | {entry['pdf_exists']} | {entry['md_modified']} | {entry['pdf_modified']} |"
            )
        lines.append("")

    lines.append("## Snapshot Files (*.V*.md)")
    lines.append("")
    if snapshots:
        for name in snapshots:
            lines.append(f"- {name}")
    else:
        lines.append("- none")

    lines.append("")
    lines.append("## Freeze Recommendation")
    lines.append("")
    lines.append("Status: proceed to freeze package generation when all target rows show Markdown=yes and PDF=yes.")

    return "\n".join(lines) + "\n"



def main() -> None:
    parser = argparse.ArgumentParser(description="Generate paper status dashboard")
    parser.add_argument(
        "--md-output",
        default=str(PAPER_DIR / "PAPER_STATUS.md"),
        help="Markdown output path",
    )
    parser.add_argument(
        "--json-output",
        default=str(PAPER_DIR / "paper_status.json"),
        help="JSON output path",
    )
    args = parser.parse_args()

    inventory = build_inventory()
    snapshots = get_version_snapshots()

    payload = {
        "generated_utc": datetime.now(tz=timezone.utc).isoformat(),
        "publication": PUBLICATION_TRACKER,
        "inventory": inventory,
        "snapshots": snapshots,
    }

    md_text = render_markdown(inventory, snapshots)

    md_output = Path(args.md_output)
    json_output = Path(args.json_output)
    md_output.write_text(md_text, encoding="utf-8")
    json_output.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    print(f"Wrote {md_output}")
    print(f"Wrote {json_output}")


if __name__ == "__main__":
    main()
