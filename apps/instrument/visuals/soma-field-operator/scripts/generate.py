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
REGISTRY_ROOT = REPO_ROOT / "registry"
GENERATED_ROOT = APP_ROOT / "generated"
CLAIM_BADGES = {"FORMAL", "SOURCED", "INTERPRETIVE"}


def load_yaml(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or {}
    if not isinstance(data, dict):
        raise ValueError(f"{path}: expected a YAML mapping")
    return data


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

    levels = []
    for path in sorted((REGISTRY_ROOT / "levels").glob("*.yaml")):
        level = load_yaml(path)
        level_id = level.get("id")
        if not isinstance(level_id, str):
            errors.append(f"{path}: missing string id")
        elif level_id != path.stem:
            errors.append(f"{path}: id {level_id!r} must match file name {path.stem!r}")
        validate_claims(level, str(path.relative_to(REPO_ROOT)), errors)
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
            validate_claims(edge_data, str(edge_file.relative_to(REPO_ROOT)), errors)
            for endpoint in ("from", "to"):
                if edge_data.get(endpoint) not in level_ids:
                    errors.append(f"{edge_file}: dangling {endpoint} level {edge_data.get(endpoint)!r}")
            edges.append(edge_data)
        for node in path_data.get("nodes", []):
            if node not in level_ids:
                errors.append(f"{path_yaml}: dangling node {node!r}")
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
        ],
    }
    return levels, paths, models, lenses, coverage


def js_export(name: str, value: Any) -> str:
    return f"export const {name} = {json.dumps(value, ensure_ascii=False, indent=2)};\n"


def write_outputs(levels: list[dict[str, Any]], paths: list[dict[str, Any]], models: list[dict[str, Any]], lenses: dict[str, Any], coverage: dict[str, Any]) -> None:
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


def main() -> None:
    write_outputs(*load_registry())


if __name__ == "__main__":
    main()
