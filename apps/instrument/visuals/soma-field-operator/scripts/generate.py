#!/usr/bin/env python3
"""Generate the Soma Field Operator data module from U/registry."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml
except ModuleNotFoundError as exc:  # pragma: no cover - exercised by local setup
    raise SystemExit("PyYAML is required: install `PyYAML` in the project Python environment.") from exc


APP_ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = Path(__file__).resolve().parents[5]
DIST_ROOT = REPO_ROOT.parent / "Dist"
REGISTRY_ROOT = REPO_ROOT / "registry"
GENERATED_ROOT = APP_ROOT / "generated"
CLAIM_BADGES = {"FORMAL", "SOURCED", "INTERPRETIVE"}
UNPUBLISHED_SOURCE_BASE_URL = "https://www.t-theory.org/atlas"
ZOOMABLE_SOURCE = REPO_ROOT / "paper" / "soma" / "zoomable-somatic-field" / "zoomable-somatic-field.md"
PLACEHOLDER_MIND_TEXT = "Information/organization row from source; interpretive unless specifically sourced."
DISALLOWED_EQUATION_PATTERNS = [
    r"(?<!\\)sqrt\(",
    r"(?<!\\)\bgrad\b",
    r"(?<!\\)\bnabla\b",
    r"(?<!\\)\bpartial_",
    r"(?<!\\)\bd_t\b",
    r"(?<!\\)\bBox\b",
    r"(?<!\\)\bdot\b",
    r"<x\s*\|",
    r"(?<!\\)\bpi\b",
    r"(?<!\\)\bdelta\b",
    r"\bproportional to\b",
]


def load_yaml(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{path}: expected a YAML mapping")
    return data


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "source"


def load_paper_registry() -> tuple[dict[str, dict[str, Any]], dict[str, list[dict[str, Any]]]]:
    papers_path = DIST_ROOT / "PAPERS.yaml"
    data = load_yaml(papers_path)
    records: dict[str, dict[str, Any]] = {}
    by_slug: dict[str, dict[str, Any]] = {}
    collections: list[dict[str, Any]] = []
    for section_name, section_value in data.items():
        if not isinstance(section_value, list):
            continue
        for entry in section_value:
            if not isinstance(entry, dict) or not isinstance(entry.get("id"), str):
                continue
            record = {
                "id": entry["id"],
                "slug": entry.get("slug") or slugify(entry["id"]),
                "title": entry.get("title") or entry.get("source_title") or entry["id"],
                "source_title": entry.get("source_title"),
                "doi": entry.get("doi"),
                "status": entry.get("status"),
                "section": section_name,
            }
            doi = record["doi"]
            if doi:
                record["url"] = f"https://doi.org/{doi}"
                record["publication_label"] = "published"
            else:
                record["url"] = f"{UNPUBLISHED_SOURCE_BASE_URL}/{record['slug']}"
                record["publication_label"] = "not yet published"
            records[record["id"]] = record
            by_slug[record["slug"]] = record
            if section_name == "collections":
                collections.append({**record, "members": entry.get("members", [])})

    related_collections: dict[str, list[dict[str, Any]]] = {}
    for collection in collections:
        for member in collection.get("members", []):
            if isinstance(member, dict):
                slug = member.get("slug")
            else:
                slug = member
            if not slug:
                continue
            member_record = by_slug.get(slug)
            if member_record:
                related_collections.setdefault(member_record["id"], []).append({
                    key: collection[key]
                    for key in ("id", "slug", "title", "doi", "status", "url", "publication_label")
                    if key in collection
                })
    return records, related_collections


def resolve_source_id(source_id: str, papers: dict[str, dict[str, Any]]) -> dict[str, Any]:
    if source_id in papers:
        return {**papers[source_id], "kind": "paper"}
    pathish = source_id.replace("\\", "/")
    name = Path(pathish).stem if "." in Path(pathish).name else pathish.split("/")[-1]
    slug = slugify(name)
    title = name.replace("-", " ").replace("_", " ").title()
    if "field-atlas" in pathish:
        title = f"Field Atlas — {title}"
        kind = "atlas"
    elif pathish.endswith(".lean"):
        title = f"Lean proof surface — {title}"
        kind = "proof"
    else:
        kind = "unpublished"
    return {
        "id": source_id,
        "slug": slug,
        "title": title,
        "doi": None,
        "status": "not-yet-published",
        "url": f"{UNPUBLISHED_SOURCE_BASE_URL}/{slug}",
        "publication_label": "not yet published",
        "kind": kind,
        "repo_path": source_id,
    }


def resolve_sources(source_ids: list[Any], papers: dict[str, dict[str, Any]]) -> list[dict[str, Any]]:
    resolved = []
    for source_id in source_ids:
        if isinstance(source_id, str):
            resolved.append(resolve_source_id(source_id, papers))
    return resolved


def extract_front_matter_field(path: Path, key: str) -> Any:
    text = path.read_text(encoding="utf-8")
    match = re.match(r"---\n(.*?)\n---\n?", text, re.S)
    if not match:
        return None
    data = yaml.safe_load(match.group(1)) or {}
    if not isinstance(data, dict):
        return None
    return data.get(key)


def validate_equation(value: Any, location: str, errors: list[str]) -> None:
    if not isinstance(value, str) or not value.strip():
        errors.append(f"{location}: equation must be a non-empty LaTeX string")
        return
    for pattern in DISALLOWED_EQUATION_PATTERNS:
        if re.search(pattern, value):
            errors.append(f"{location}: equation contains bare ASCII pattern {pattern!r}: {value!r}")


def validate_level_text(level: dict[str, Any], location: str, errors: list[str]) -> None:
    mind = level.get("atlas_rows", {}).get("mind")
    if mind == PLACEHOLDER_MIND_TEXT:
        errors.append(f"{location}: atlas_rows.mind still contains the placeholder text")
    explain = level.get("explain", {})
    for register in ("general", "specialist"):
        value = explain.get(register)
        text = value.get("text") if isinstance(value, dict) else value
        if not isinstance(text, str) or not text.strip():
            errors.append(f"{location}: explain.{register} must be a non-empty explanation")
        elif text.startswith("Migrated from"):
            errors.append(f"{location}: explain.{register} must be explanatory prose, not a migration note")


def parse_front_matter(path: Path) -> tuple[dict[str, Any], str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return {}, text.strip()
    match = re.match(r"---\n(.*?)\n---\n?(.*)", text, re.S)
    if not match:
        raise ValueError(f"{path}: malformed front matter")
    data = yaml.safe_load(match.group(1)) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{path}: edge front matter must be a mapping")
    return data, match.group(2).strip()


def validate_claims(container: dict[str, Any], location: str, errors: list[str]) -> None:
    claims = container.get("claims")
    if isinstance(claims, dict):
        for key, value in claims.items():
            if value not in CLAIM_BADGES:
                errors.append(f"{location}: claims.{key} must be one of {sorted(CLAIM_BADGES)}, got {value!r}")
    elif "claim" in container:
        if container["claim"] not in CLAIM_BADGES:
            errors.append(f"{location}: claim must be one of {sorted(CLAIM_BADGES)}, got {container['claim']!r}")
    else:
        errors.append(f"{location}: missing claim badge")


def discover_renderers() -> set[str]:
    renderers_dir = APP_ROOT / "renderers"
    if not renderers_dir.exists():
        return set()
    return {path.stem for path in renderers_dir.glob("*.js") if path.stem != "index"}


def load_registry() -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]], dict[str, Any], dict[str, Any]]:
    errors: list[str] = []
    papers, related_collections = load_paper_registry()

    levels = []
    for path in sorted((REGISTRY_ROOT / "levels").glob("*.yaml")):
        level = load_yaml(path)
        level_id = level.get("id")
        if not isinstance(level_id, str):
            errors.append(f"{path}: missing string id")
        elif level_id != path.stem:
            errors.append(f"{path}: id {level_id!r} must match file name {path.stem!r}")
        validate_claims(level, str(path.relative_to(REPO_ROOT)), errors)
        validate_equation(level.get("equation"), f"{path.relative_to(REPO_ROOT)}: equation", errors)
        validate_equation(level.get("atlas_rows", {}).get("equation_setting"), f"{path.relative_to(REPO_ROOT)}: atlas_rows.equation_setting", errors)
        validate_level_text(level, str(path.relative_to(REPO_ROOT)), errors)
        level["resolved_sources"] = resolve_sources(level.get("sources", []), papers)
        related = []
        for source in level["resolved_sources"]:
            related.extend(related_collections.get(source["id"], []))
        if related:
            seen = set()
            level["related_collections"] = [
                item for item in related
                if not (item["id"] in seen or seen.add(item["id"]))
            ]
        else:
            level["related_collections"] = []
        level["resolved_media"] = [
            resolve_source_id(item["path"], papers) | {"media_kind": item.get("kind")}
            for item in level.get("media", [])
            if isinstance(item, dict) and isinstance(item.get("path"), str)
        ]
        levels.append(level)

    level_ids = {level["id"] for level in levels if isinstance(level.get("id"), str)}

    paths = []
    for path_yaml in sorted((REGISTRY_ROOT / "paths").glob("*\\path.yaml")) + sorted((REGISTRY_ROOT / "paths").glob("*/path.yaml")):
        if not path_yaml.exists():
            continue
        path_data = load_yaml(path_yaml)
        path_id = path_data.get("id")
        if not isinstance(path_id, str):
            errors.append(f"{path_yaml}: missing string id")
            continue
        edges = []
        for edge_file in sorted((path_yaml.parent / "edges").glob("*.md")):
            edge_data, prose = parse_front_matter(edge_file)
            edge_data["body"] = prose
            if isinstance(edge_data.get("source"), str):
                edge_data["resolved_source"] = resolve_source_id(edge_data["source"], papers)
            validate_claims(edge_data, str(edge_file.relative_to(REPO_ROOT)), errors)
            for endpoint in ("from", "to"):
                if edge_data.get(endpoint) not in level_ids:
                    errors.append(f"{edge_file}: dangling {endpoint} level {edge_data.get(endpoint)!r}")
            edges.append(edge_data)
        for node in path_data.get("nodes", []):
            if node not in level_ids:
                errors.append(f"{path_yaml}: dangling node {node!r}")
        if isinstance(path_data.get("source"), str):
            path_data["resolved_source"] = resolve_source_id(path_data["source"], papers)
        declared_edges = set(path_data.get("edges", []))
        actual_edges = {edge.get("id") for edge in edges}
        missing_edges = declared_edges - actual_edges
        if missing_edges:
            errors.append(f"{path_yaml}: missing edge files for {sorted(missing_edges)}")
        path_data["edge_records"] = edges
        paths.append(path_data)

    # Deduplicate if both glob variants matched on the current platform.
    deduped_paths: dict[str, dict[str, Any]] = {}
    for path_data in paths:
        deduped_paths[path_data["id"]] = path_data
    paths = [deduped_paths[key] for key in sorted(deduped_paths)]
    path_ids = {path["id"] for path in paths}

    models = []
    for path in sorted((REGISTRY_ROOT / "models").glob("*.yaml")):
        model = load_yaml(path)
        model_id = model.get("id")
        if not isinstance(model_id, str):
            errors.append(f"{path}: missing string id")
        for entry in model.get("levels", []):
            if isinstance(entry, dict) and isinstance(entry.get("levels"), list):
                candidate_ids = entry["levels"]
            else:
                candidate_ids = [entry.get("level") if isinstance(entry, dict) else entry]
            for level_id in candidate_ids:
                if level_id not in level_ids:
                    errors.append(f"{path}: dangling model level {level_id!r}")
        for path_id in model.get("paths", []):
            if path_id not in path_ids:
                errors.append(f"{path}: dangling model path {path_id!r}")
        models.append(model)

    lenses = load_yaml(REGISTRY_ROOT / "lenses.yaml")

    renderer_ids = sorted(
        {
            level.get("renderer", {}).get("id")
            for level in levels
            if isinstance(level.get("renderer"), dict) and level.get("renderer", {}).get("id")
        }
    )
    available_renderers = discover_renderers()
    missing_renderers = [renderer_id for renderer_id in renderer_ids if renderer_id not in available_renderers]

    if errors:
        for error in errors:
            print(f"registry error: {error}", file=sys.stderr)
        raise SystemExit(1)

    coverage = {
        "claim_badges": sorted(CLAIM_BADGES),
        "level_count": len(levels),
        "path_count": len(paths),
        "model_count": len(models),
        "renderer_ids": renderer_ids,
        "available_renderer_ids": sorted(available_renderers),
        "missing_renderer_ids": missing_renderers,
        "notes": [
            "Missing renderer ids are reported for Track B and do not fail generation.",
            "Publication metadata remains authoritative in Dist/PAPERS.yaml.",
            "Reader-facing sources are DOI links or t-theory.org placeholders; repository paths are developer-only.",
        ],
    }
    zabstract = extract_front_matter_field(ZOOMABLE_SOURCE, "abstract")
    if not isinstance(zabstract, str) or not zabstract.strip():
        errors.append(f"{ZOOMABLE_SOURCE}: missing front-matter abstract")
    source_resolver = {
        "unpublished_base_url": UNPUBLISHED_SOURCE_BASE_URL,
        "abstract_source": resolve_source_id("P11", papers),
    }
    return levels, paths, models, lenses, coverage, latex_tilde_to_nbsp(zabstract.strip()), source_resolver


def latex_tilde_to_nbsp(text: str) -> str:
    # Even-indexed segments are outside $...$ math; only there is `~` a LaTeX tie.
    parts = text.split("$")
    return "$".join(p.replace("~", "\u00a0") if i % 2 == 0 else p for i, p in enumerate(parts))


def js_export(name: str, value: Any) -> str:
    return f"export const {name} = {json.dumps(value, ensure_ascii=False, indent=2)};\n"


def write_outputs(levels: list[dict[str, Any]], paths: list[dict[str, Any]], models: list[dict[str, Any]], lenses: dict[str, Any], coverage: dict[str, Any], zabstract: str, source_resolver: dict[str, Any], examples: list[dict[str, Any]] | None = None) -> None:
    GENERATED_ROOT.mkdir(parents=True, exist_ok=True)
    comment = """/*
Generated by scripts/generate.py from U/registry.

Exported shapes:
- levels: array of level records. Each record has id, label, substrate/field/equation
  metadata, explain.cookie/general/specialist, claims, sources, renderer, and media.
- paths: array of path records. Each path has id, label, nodes, edges, and edge_records
  parsed from registry/paths/<path-id>/edges/*.md.
- models: array of model records. Each model orders level ids with its own coordinates.
- lenses: lens catalogue for baseline/T-Theory/display/affect modes.
- coverage: validation and renderer coverage report. Missing renderer ids are warnings.
- zUSFAbstract: hardened front-matter abstract from the zoomable-somatic-field paper.
- sourceResolver: source-resolution constants and resolved abstract source metadata.
- examples: worked examples (registry/examples), each a level, paths, and
  4d-baseline / 8d-life / 11d-mind steps with title, body, equation, badge.

Do not edit this file directly; edit U/registry and rerun npm run generate.
*/
"""
    module = (
        comment
        + js_export("levels", levels)
        + js_export("paths", paths)
        + js_export("models", models)
        + js_export("lenses", lenses)
        + js_export("coverage", coverage)
        + js_export("zUSFAbstract", zabstract)
        + js_export("sourceResolver", source_resolver)
        + js_export("examples", examples or [])
    )
    (GENERATED_ROOT / "app-data.js").write_text(module, encoding="utf-8", newline="\n")

    coverage_lines = [
        "# Operator Registry Coverage",
        "",
        f"- Levels: {coverage['level_count']}",
        f"- Paths: {coverage['path_count']}",
        f"- Models: {coverage['model_count']}",
        f"- Renderer ids declared: {', '.join(coverage['renderer_ids']) or 'none'}",
        f"- Renderer ids available: {', '.join(coverage['available_renderer_ids']) or 'none'}",
        f"- Missing renderer ids (warning only): {', '.join(coverage['missing_renderer_ids']) or 'none'}",
        "",
        "## Notes",
        "",
        *[f"- {note}" for note in coverage["notes"]],
        "",
    ]
    (GENERATED_ROOT / "coverage.md").write_text("\n".join(coverage_lines), encoding="utf-8", newline="\n")


def load_examples() -> list[dict[str, Any]]:
    papers, _ = load_paper_registry()
    level_ids = {load_yaml(path).get("id") for path in (REGISTRY_ROOT / "levels").glob("*.yaml")}
    path_ids = {path.parent.name for path in (REGISTRY_ROOT / "paths").glob("*/path.yaml")}
    axis_ids = {axis["id"] for axis in load_yaml(REGISTRY_ROOT / "lenses.yaml").get("display_axes", [])}
    errors: list[str] = []
    examples: list[dict[str, Any]] = []
    for path in sorted((REGISTRY_ROOT / "examples").glob("*.yaml")):
        example = load_yaml(path)
        if example.get("level") not in level_ids:
            errors.append(f"{path}: unknown level {example.get('level')!r}")
        for path_id in example.get("paths", []):
            if path_id not in path_ids:
                errors.append(f"{path}: unknown path {path_id!r}")
        for step in example.get("steps", []):
            if step.get("axis") not in axis_ids:
                errors.append(f"{path}: unknown axis {step.get('axis')!r}")
            if step.get("badge") not in CLAIM_BADGES:
                errors.append(f"{path}: unknown badge {step.get('badge')!r}")
            validate_equation(step.get("equation"), f"{path}:{step.get('axis')}", errors)
            # Programme ids (P1, D2, C1) resolve to DOIs; anything else is a bibliography key.
            step["resolved_sources"] = [
                resolve_source_id(source, papers) if re.fullmatch(r"[PDC]\d+", str(source)) else {"label": str(source), "kind": "reference"}
                for source in step.get("sources", [])
            ]
        examples.append(example)
    if errors:
        for error in errors:
            print(f"registry error: {error}", file=sys.stderr)
        raise SystemExit(1)
    return examples


def main() -> None:
    write_outputs(*load_registry(), examples=load_examples())


if __name__ == "__main__":
    main()
