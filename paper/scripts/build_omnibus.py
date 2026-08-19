#!/usr/bin/env python3
"""Build the C1v2 merged omnibus from Dist/PAPERS.yaml.

PAPERS.yaml owns the collection's identity, ordered membership, and part
openings. This script only turns that registry data and paper sources into a
single merged Markdown manuscript for Pandoc.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR = PAPER_DIR / "bld"
REGISTRY_PATH = REPO_ROOT.parent / "Dist" / "PAPERS.yaml"
COLLECTION_ID = "C1v2"

_FRONTMATTER = re.compile(r"^---\n[\s\S]*?\n---\n\n?", re.MULTILINE)
_REFERENCES = re.compile(r"\n#{1,3}\s+References\b[\s\S]*$", re.IGNORECASE)


def fail(message: str) -> None:
    print(f"ERROR  {message}", file=sys.stderr)
    raise SystemExit(1)


def load_registry() -> tuple[dict[str, object], dict[str, dict[str, object]]]:
    registry = yaml.safe_load(REGISTRY_PATH.read_text(encoding="utf-8")) or {}
    collection = next(
        (entry for entry in registry.get("collections", []) if entry.get("id") == COLLECTION_ID),
        None,
    )
    if not collection:
        fail(f"collection not found in registry: {COLLECTION_ID}")
    entries = {
        entry["slug"]: entry
        for section in ("canonical_papers", "datasets")
        for entry in registry.get(section, [])
        if entry.get("slug")
    }
    members = collection.get("members")
    if not isinstance(members, list) or not members:
        fail(f"{COLLECTION_ID} requires a non-empty members list in PAPERS.yaml")
    slugs = [member.get("slug") for member in members]
    if any(not slug for slug in slugs) or len(slugs) != len(set(slugs)):
        fail(f"{COLLECTION_ID} members must have unique non-empty slugs")
    missing = [slug for slug in slugs if slug not in entries]
    if missing:
        fail(f"registry members not found in canonical records: {', '.join(missing)}")
    return collection, entries


def collection_frontmatter(collection: dict[str, object]) -> str:
    required = ("title", "author", "orcid", "institute", "date", "description")
    missing = [field for field in required if not collection.get(field)]
    if missing:
        fail(f"{COLLECTION_ID} missing front-matter fields: {', '.join(missing)}")
    metadata = {field: collection[field] for field in required}
    metadata.update({"bibliography": "bibliography.bib", "csl": "apa-7th.csl"})
    return "---\n" + yaml.safe_dump(
        metadata, allow_unicode=True, default_flow_style=False, sort_keys=False
    ) + "---"


def source_path(slug: str) -> Path:
    return PAPER_DIR / "soma" / slug / f"{slug}.md"


def body(slug: str) -> str:
    path = source_path(slug)
    if not path.is_file():
        fail(f"missing omnibus member source: {path}")
    text = _FRONTMATTER.sub("", path.read_text(encoding="utf-8"), count=1)
    text = _REFERENCES.sub("", text)
    return re.sub(r"^(#{1,5})(?= )", r"#\1", text, flags=re.MULTILINE).strip()


def latex_text(value: object) -> str:
    return str(value).replace("\\", r"\textbackslash{}").replace("&", r"\&").replace("%", r"\%").replace("_", r"\_")


def divider(title: str, slug: str) -> str:
    return "\n\n```{=latex}\n" + f"\\omnipaperdivider{{{latex_text(title)}}}{{{latex_text(slug)}}}\n" + "```\n"


def abstract(value: object) -> str:
    return f"\n\n## Abstract\n\n{str(value).strip()}\n" if value else ""


def main() -> None:
    BLD_DIR.mkdir(exist_ok=True)
    collection, entries = load_registry()
    sections = [collection_frontmatter(collection)]

    for member in collection["members"]:
        slug = member["slug"]
        entry = entries[slug]
        part = member.get("part")
        if part:
            prefix = "\\cleardoublepage\n\n"
            if member.get("appendix"):
                prefix += "\\appendix\n\n"
            sections.append(prefix + f"\\part{{{latex_text(part)}}}\n")
        source_body = body(slug)
        sections.append(divider(str(entry["title"]), slug))
        sections.append(abstract(entry.get("abstract")))
        sections.append(f"\n\n# {entry['title']}\n\n{source_body}\n")
        print(f"  + {slug}")

    output = "\n".join(sections)
    target = BLD_DIR / "omnibus-body.md"
    target.write_text(output, encoding="utf-8")
    print(f"Written: {target.relative_to(REPO_ROOT)}")
    print(f"  Papers merged: {len(collection['members'])}")
    print(f"  Registry: {COLLECTION_ID} ({REGISTRY_PATH.name})")


if __name__ == "__main__":
    main()
