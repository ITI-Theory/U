#!/usr/bin/env python3
"""Generate compact Markdown context files for Papers UAT."""

from __future__ import annotations

from pathlib import Path

import yaml

U_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = U_ROOT / "paper"
REGISTRY_PATH = U_ROOT.parent / "Dist" / "PAPERS.yaml"
OUTPUT_DIR = PAPER_DIR / "bld" / "uat-context"

TECHNICAL_SOURCES = [
    ("paper/FORMAT.md", "markdown"),
    ("paper/OMNIBUS_DOCUMENT_MODEL.md", "markdown"),
    ("paper/Makefile", "makefile"),
    ("paper/mk/common.mk", "makefile"),
    ("paper/journal.tex", "tex"),
    ("paper/omnibus.tex", "tex"),
    ("paper/scripts/build_omnibus.py", "python"),
    ("paper/scripts/check_omnibus_format.py", "python"),
    ("paper/scripts/check_individual_format.py", "python"),
    ("paper/scripts/check_paper_references.py", "python"),
    ("paper/scripts/check_paper_figures.py", "python"),
    ("paper/scripts/check_stale_problem_labels.py", "python"),
    ("paper/scripts/stage_uat.py", "python"),
]


def collection(registry: dict[str, object]) -> dict[str, object]:
    result = next((entry for entry in registry["collections"] if entry["id"] == "C1v2"), None)
    if not result:
        raise RuntimeError("C1v2 missing from PAPERS.yaml")
    return result


def registry_markdown(registry: dict[str, object]) -> str:
    lines = [
        "# Papers Registry",
        "",
        "Generated from `Dist/PAPERS.yaml` for UAT. This is a readable view, not an independent registry.",
        "",
        "## Canonical Papers",
        "",
        "| ID | Title | Status | DOI | Build | Reference minimum |",
        "|---|---|---|---|---|---:|",
    ]
    for entry in registry.get("canonical_papers", []):
        doi = entry.get("doi") or "pending"
        lines.append(
            f"| {entry['id']} | {entry['title']} | {entry['status']} | {doi} | "
            f"{entry.get('make_alias', '-')} | {entry.get('references_minimum', 5)} |"
        )
    lines += ["", "## Datasets", "", "| ID | Title | Status | Reference policy |", "|---|---|---|---|"]
    for entry in registry.get("datasets", []):
        policy = entry.get("references", f"minimum {entry.get('references_minimum', 5)}")
        lines.append(f"| {entry['id']} | {entry['title']} | {entry['status']} | {policy} |")

    c1v2 = collection(registry)
    lines += [
        "",
        "## C1v2 Omnibus",
        "",
        f"- **Title:** {c1v2['title']}",
        f"- **Status:** {c1v2['status']}",
        "- **Architecture:** one merged manuscript; one master contents; no individual-paper front matter or local TOCs.",
        "- **Ordered members:**",
    ]
    for index, member in enumerate(c1v2["members"], 1):
        part = f"; opens {member['part']}" if member.get("part") else ""
        lines.append(f"  {index}. `{member['slug']}`{part}")
    return "\n".join(lines) + "\n"


def build_context() -> str:
    lines = [
        "# Papers Build Context",
        "",
        "Generated from active Papers build sources for UAT discussion. Labeled code blocks are source snapshots for this candidate.",
        "",
        "## Build Map",
        "",
        "1. `Dist/PAPERS.yaml` owns release identity, reference policy, C1v2 metadata, member order, and part openings.",
        "2. `paper/scripts/build_omnibus.py` reads C1v2 and writes merged `bld/omnibus-body.md`.",
        "3. `paper/Makefile` renders `omnibus-body.md` and invokes quality gates.",
        "4. `paper/scripts/stage_uat.py` copies PDFs and context into the hash manifest.",
        "",
    ]
    for relative_path, language in TECHNICAL_SOURCES:
        source = U_ROOT / relative_path
        if not source.is_file():
            raise FileNotFoundError(f"Missing UAT context source: {relative_path}")
        content = source.read_text(encoding="utf-8").replace("\r\n", "\n").rstrip()
        lines += [f"## `{relative_path}`", "", f"```{language}", content, "```", ""]
    return "\n".join(lines)


def main() -> None:
    registry = yaml.safe_load(REGISTRY_PATH.read_text(encoding="utf-8")) or {}
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "PAPERS.md").write_text(registry_markdown(registry), encoding="utf-8")
    (OUTPUT_DIR / "BUILD_CONTEXT.md").write_text(build_context(), encoding="utf-8")
    print(f"Generated UAT context: {OUTPUT_DIR.relative_to(U_ROOT)}")


if __name__ == "__main__":
    main()
