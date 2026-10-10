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
EVIDENCE_LABELS = {"kernel-verified", "derived-under-assumptions", "simulated", "empirical-result", "interpretive", "open-hypothesis"}
ERA_BANDS = {"cosmic", "geological", "palaeontology", "human", "philosophy"}
ERA_THEMES = {
    "cosmic", "earth", "egypt", "babylon", "greece", "islamic-golden-age", "medieval",
    "renaissance", "enlightenment", "modern", "present", "expressionism", "constructivism",
    "bauhaus", "color-field", "pop-art", "street-art",
}
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


def bibliography_keys() -> set[str]:
    text = (REPO_ROOT / "paper" / "bibliography.bib").read_text(encoding="utf-8")
    return set(re.findall(r"@\w+\{([^,\s]+)", text))


def discover_renderers() -> set[str]:
    renderers_dir = APP_ROOT / "renderers"
    if not renderers_dir.exists():
        return set()
    return {path.stem for path in renderers_dir.glob("*.js") if path.stem != "index"}


def load_registry() -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]], dict[str, Any], dict[str, Any], str, dict[str, Any]]:
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

    bib_keys = bibliography_keys()
    era_root = load_yaml(REGISTRY_ROOT / "eras.yaml")
    eras = era_root.get("eras")
    if not isinstance(eras, list) or not eras:
        errors.append("registry/eras.yaml: eras must be a non-empty list")
        eras = []
    previous_time = -1.0
    era_ids: set[str] = set()
    for index, era in enumerate(eras):
        location = f"registry/eras.yaml:eras[{index}]"
        if not isinstance(era, dict):
            errors.append(f"{location}: expected mapping")
            continue
        era_id = era.get("id")
        if not isinstance(era_id, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", era_id):
            errors.append(f"{location}: id must be kebab-case")
        elif era_id in era_ids:
            errors.append(f"{location}: duplicate era id {era_id!r}")
        else:
            era_ids.add(era_id)
        if era.get("band") not in ERA_BANDS:
            errors.append(f"{location}: band must be one of {sorted(ERA_BANDS)}")
        if era.get("badge") not in CLAIM_BADGES:
            errors.append(f"{location}: badge must be one of {sorted(CLAIM_BADGES)}")
        if "theme" in era and era.get("theme") not in ERA_THEMES:
            errors.append(f"{location}: theme must be one of {sorted(ERA_THEMES)}")
        if era.get("level") not in level_ids:
            errors.append(f"{location}: dangling level {era.get('level')!r}")
        time = era.get("time")
        seconds = time.get("seconds_after_big_bang") if isinstance(time, dict) else None
        display = time.get("display") if isinstance(time, dict) else None
        if not isinstance(seconds, (int, float)) or seconds < 0:
            errors.append(f"{location}: time.seconds_after_big_bang must be a non-negative number")
        elif seconds < previous_time:
            errors.append(f"{location}: eras must be ordered by time.seconds_after_big_bang")
        else:
            previous_time = float(seconds)
        if not isinstance(display, str) or not display.strip():
            errors.append(f"{location}: time.display must be a non-empty string")
        if not isinstance(era.get("label"), str) or not era["label"].strip():
            errors.append(f"{location}: label must be non-empty")
        summary = era.get("summary")
        sentence_count = len([part for part in re.split(r"(?<=[.!?])\s+", summary.strip()) if part]) if isinstance(summary, str) else 0
        if sentence_count < 2:
            errors.append(f"{location}: summary must contain at least two sentences")
        if "equation" in era:
            validate_equation(era.get("equation"), f"{location}: equation", errors)
        resolved_sources = []
        for source in era.get("sources", []):
            if not isinstance(source, str):
                errors.append(f"{location}: sources must be strings")
            elif source in papers:
                resolved_sources.append(resolve_source_id(source, papers))
            elif source in bib_keys:
                resolved_sources.append({"id": source, "label": source, "kind": "reference"})
            else:
                errors.append(f"{location}: unknown source {source!r}")
        era["resolved_sources"] = resolved_sources

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
    return levels, paths, models, eras, lenses, coverage, latex_tilde_to_nbsp(zabstract.strip()), source_resolver


def latex_tilde_to_nbsp(text: str) -> str:
    # Even-indexed segments are outside $...$ math; only there is `~` a LaTeX tie.
    parts = text.split("$")
    return "$".join(p.replace("~", "\u00a0") if i % 2 == 0 else p for i, p in enumerate(parts))


def js_export(name: str, value: Any) -> str:
    return f"export const {name} = {json.dumps(value, ensure_ascii=False, indent=2)};\n"


def write_outputs(levels: list[dict[str, Any]], paths: list[dict[str, Any]], models: list[dict[str, Any]], eras: list[dict[str, Any]], lenses: dict[str, Any], coverage: dict[str, Any], zabstract: str, source_resolver: dict[str, Any], examples: list[dict[str, Any]] | None = None, questions: list[dict[str, Any]] | None = None, tours: list[dict[str, Any]] | None = None, reading: list[dict[str, Any]] | None = None, concepts: list[dict[str, Any]] | None = None) -> None:
    GENERATED_ROOT.mkdir(parents=True, exist_ok=True)
    comment = """/*
Generated by scripts/generate.py from U/registry.

Exported shapes:
- levels: array of level records. Each record has id, label, substrate/field/equation
  metadata, explain.cookie/general/specialist, claims, sources, renderer, and media.
- paths: array of path records. Each path has id, label, nodes, edges, and edge_records
  parsed from registry/paths/<path-id>/edges/*.md.
- models: array of model records. Each model orders level ids with its own coordinates.
- eras: ordered time-axis records from registry/eras.yaml.
- lenses: lens catalogue for baseline/T-Theory/display/affect modes.
- coverage: validation and renderer coverage report. Missing renderer ids are warnings.
- zUSFAbstract: hardened front-matter abstract from the zoomable-somatic-field paper.
- sourceResolver: source-resolution constants and resolved abstract source metadata.
- examples: worked examples (registry/examples), each a level, paths, and
  4d-baseline / 8d-life / 11d-mind steps with title, body, equation, badge.
- questions: curated "What's Different?" tours (registry/questions), each with
  view settings, evidence label, MOTHER prompt, optional example, and next link.
- tours: preset soma-tours (registry/tours), each a title, summary and steps of
  view (hash fragment), say, optional dwell and evidence label (docs/TOUR-LANGUAGE.md).
- reading: further reading (registry/reading.yaml): title, author, why, url, levels
  (level ids or "all").
- concepts: the Sherlock concept registry (registry/concepts): concept, ontology class,
  Lean name and its status derived from the source (paper/scripts/check_concepts.py),
  papers, levels, evidence label.

Do not edit this file directly; edit U/registry and rerun npm run generate.
*/
"""
    module = (
        comment
        + js_export("levels", levels)
        + js_export("paths", paths)
        + js_export("models", models)
        + js_export("eras", eras)
        + js_export("lenses", lenses)
        + js_export("coverage", coverage)
        + js_export("zUSFAbstract", zabstract)
        + js_export("sourceResolver", source_resolver)
        + js_export("examples", examples or [])
        + js_export("questions", questions or [])
        + js_export("tours", tours or [])
        + js_export("reading", reading or [])
        + js_export("concepts", concepts or [])
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


def load_questions(examples: list[dict[str, Any]]) -> list[dict[str, Any]]:
    papers, _ = load_paper_registry()
    question_dir = REGISTRY_ROOT / "questions"
    if not question_dir.exists():
        return []
    level_ids = {load_yaml(path).get("id") for path in (REGISTRY_ROOT / "levels").glob("*.yaml")}
    path_ids = {path.parent.name for path in (REGISTRY_ROOT / "paths").glob("*/path.yaml")}
    example_ids = {example["id"] for example in examples}
    errors: list[str] = []
    questions: list[dict[str, Any]] = []
    for path in sorted(question_dir.glob("*.yaml")):
        question = load_yaml(path)
        qid = question.get("id")
        if qid != path.stem:
            errors.append(f"{path}: id {qid!r} must match file name {path.stem!r}")
        for key in ("question", "short_answer", "mother_prompt"):
            if not isinstance(question.get(key), str) or not question[key].strip():
                errors.append(f"{path}: {key} must be a non-empty string")
        if question.get("level") not in level_ids:
            errors.append(f"{path}: unknown level {question.get('level')!r}")
        if question.get("path") and question.get("path") not in path_ids:
            errors.append(f"{path}: unknown path {question.get('path')!r}")
        if question.get("example") and question.get("example") not in example_ids:
            errors.append(f"{path}: unknown example {question.get('example')!r}")
        if question.get("badge") not in EVIDENCE_LABELS:
            errors.append(f"{path}: badge must be one of {sorted(EVIDENCE_LABELS)}, got {question.get('badge')!r}")
        view = question.get("view", {})
        if not isinstance(view, dict):
            errors.append(f"{path}: view must be a mapping")
        elif view.get("lens") not in (None, "on", "off", True, False):
            errors.append(f"{path}: view.lens must be 'on' or 'off'")
        elif view.get("dimension") not in (None, 4, 8, 11):
            errors.append(f"{path}: view.dimension must be 4, 8, or 11")
        elif view.get("lens") is True:
            view["lens"] = "on"
        elif view.get("lens") is False:
            view["lens"] = "off"
        question["resolved_sources"] = [
            resolve_source_id(source, papers) if re.fullmatch(r"[PDC]\d+", str(source)) else {"label": str(source), "kind": "reference"}
            for source in question.get("sources", [])
        ]
        questions.append(question)
    question_ids = {question["id"] for question in questions if isinstance(question.get("id"), str)}
    for question in questions:
        if question.get("next") and question["next"] not in question_ids:
            errors.append(f"{question_dir / (question['id'] + '.yaml')}: unknown next question {question['next']!r}")
    if errors:
        for error in errors:
            print(f"registry error: {error}", file=sys.stderr)
        raise SystemExit(1)
    return questions


TOUR_KEYS = {"level", "path", "lens", "dim", "model", "reader", "era", "compare", "contours", "q", "labels", "ui",
             "voyage", "phi", "feel", "resource"}
TOUR_FIXED = {"lens": {"on", "off"}, "dim": {"4", "8", "11"}, "reader": {"cookie", "general", "specialist"},
              "compare": {"0", "1"}, "contours": {"0", "1"}, "labels": {"on", "off"}, "ui": {"clean"},
              # The mind explorer (explorer.js; same lists as STOPS and FEELINGS there).
              "voyage": {"human", "body", "brain", "limbic", "thought", "neuron", "network", "landscape", "dyad", "tunnel", "ureter", "flight"},
              "feel": {"calm", "fight", "flight", "grief", "freeze", "vigilance", "flow", "joy"},
              "resource": {"0", "1"}}
# phi (the limbic field, the FX bar): a number from 0 to 1, as tour.js PHI.
TOUR_PHI = r"^(0(\.\d{1,3})?|1(\.0{1,3})?)$"
# Presentation overlays drawn by presentation.js (same list as OVERLAYS there).
# Tour pokes fired by tour.js (same names as POKES there).
TOUR_POKES = {"weak", "strong", "twice"}
TOUR_OVERLAYS = {"ripple", "dimensions", "zoom", "split", "threshold", "landscape", "network"}


def tour_stage_errors(step: dict[str, Any], abstract_paragraphs: int) -> list[str]:
    """Same rules as tour.js stageProblems: a known overlay, an abstract paragraph and a pause in range."""
    problems = []
    if step.get("overlay") is not None and step["overlay"] not in TOUR_OVERLAYS:
        problems.append(f"overlay {step['overlay']!r} not in {sorted(TOUR_OVERLAYS)}")
    if step.get("poke") is not None and step["poke"] not in TOUR_POKES:
        problems.append(f"poke {step['poke']!r} not in {sorted(TOUR_POKES)}")
    pause = step.get("pause")
    if pause is not None and not (isinstance(pause, (int, float)) and not isinstance(pause, bool) and 0 <= pause <= 30):
        problems.append(f"pause {pause!r} must be 0 to 30 seconds")
    abstract = step.get("abstract")
    if abstract is not None and not (isinstance(abstract, int) and not isinstance(abstract, bool) and 0 <= abstract <= abstract_paragraphs):
        problems.append(f"abstract {abstract!r} must be a paragraph number from 0 to {abstract_paragraphs}")
    return problems


def tour_view_errors(view: str, ids: dict[str, set[str]]) -> list[str]:
    """Same rules as tour.js: known hash keys, known registry ids, fixed vocabularies."""
    from urllib.parse import parse_qsl
    problems = []
    pairs = parse_qsl(view, keep_blank_values=True)
    if not pairs:
        problems.append(f"empty view {view!r}")
    for key, value in pairs:
        if key not in TOUR_KEYS:
            problems.append(f"unknown key {key!r}")
        elif key in TOUR_FIXED and value not in TOUR_FIXED[key]:
            problems.append(f"{key}={value!r} not in {sorted(TOUR_FIXED[key])}")
        elif key == "phi" and not re.match(TOUR_PHI, value):
            problems.append(f"phi={value!r} not a number from 0 to 1")
        elif key in ids and value not in ids[key]:
            problems.append(f"unknown {key} {value!r}")
    return problems


def load_concepts() -> list[dict[str, Any]]:
    """registry/concepts with each Lean status derived by the same code as `make concepts`."""
    folder = REGISTRY_ROOT / "concepts"
    if not folder.exists():
        return []
    import importlib.util
    spec = importlib.util.spec_from_file_location("check_concepts", REPO_ROOT / "paper" / "scripts" / "check_concepts.py")
    checker = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(checker)
    concepts = []
    for path in sorted(folder.glob("*.yaml")):
        concept = load_yaml(path)
        lean = concept.get("lean") or {}
        status, where = (checker.lean_status(lean["module"], lean["name"]) if lean.get("module") and lean.get("name") else (None, ""))
        concepts.append({
            "id": concept["id"], "concept": concept.get("concept", concept["id"]), "kind": concept.get("kind", ""),
            "ontology": (concept.get("ontology") or {}).get("class"),
            "lean": f"{lean['module']}.{lean['name']}" if lean.get("name") else None,
            "status": status, "where": where if status else "",
            "papers": concept.get("papers") or [], "levels": concept.get("levels") or [],
            "label": concept.get("label"), "notes": concept.get("notes", ""),
        })
    return concepts


def load_reading(level_ids: set[str]) -> list[dict[str, Any]]:
    """registry/reading.yaml: each item needs title, author, why, an https url, and
    levels that exist (or "all")."""
    path = REGISTRY_ROOT / "reading.yaml"
    if not path.exists():
        return []
    items = load_yaml(path).get("items") or []
    errors = []
    for number, item in enumerate(items, 1):
        where = f"{path}: item {number}"
        for key in ("title", "author", "why", "url"):
            if not isinstance(item.get(key), str) or not item[key].strip():
                errors.append(f"{where}: {key} must be a non-empty string")
        if not str(item.get("url", "")).startswith("https://"):
            errors.append(f"{where}: url must start with https://")
        levels = item.get("levels")
        if not isinstance(levels, list) or not levels:
            errors.append(f"{where}: levels must be a list of level ids or [all]")
        else:
            for level in levels:
                if level != "all" and level not in level_ids:
                    errors.append(f"{where}: unknown level {level!r}")
    if errors:
        raise SystemExit("\n".join(errors))
    return items


def load_tours(questions: list[dict[str, Any]], models: list[dict[str, Any]], eras: list[dict[str, Any]]) -> list[dict[str, Any]]:
    tour_dir = REGISTRY_ROOT / "tours"
    if not tour_dir.exists():
        return []
    ids = {
        "level": {load_yaml(path).get("id") for path in (REGISTRY_ROOT / "levels").glob("*.yaml")},
        "path": {path.parent.name for path in (REGISTRY_ROOT / "paths").glob("*/path.yaml")},
        "model": {model.get("id") for model in models},
        "era": {era.get("id") for era in eras},
        "q": {question.get("id") for question in questions},
    }
    errors: list[str] = []
    # The explorer vocabularies above are copies of explorer.js STOPS and FEELINGS.
    explorer_js = (Path(__file__).resolve().parents[1] / "explorer.js").read_text(encoding="utf-8")
    stops = set(re.findall(r"'(\w+)'", re.search(r"export const STOPS = \[(.*?)\]", explorer_js).group(1)))
    feelings = set(re.findall(r"^  (\w+): \{ label:", explorer_js, re.M))
    for level in set(re.findall(r"level: '([\w-]+)'", explorer_js.split("export const STOP_LEVELS", 1)[1].split("};", 1)[0])):
        if level not in ids["level"]:
            errors.append(f"explorer.js STOP_LEVELS: unknown level {level!r}")
    if stops != TOUR_FIXED["voyage"] or feelings != TOUR_FIXED["feel"]:
        errors.append(f"generate.py TOUR_FIXED voyage/feel differ from explorer.js STOPS {sorted(stops)} / FEELINGS {sorted(feelings)}")
    tours: list[dict[str, Any]] = []
    zabstract = extract_front_matter_field(ZOOMABLE_SOURCE, "abstract")
    abstract_paragraphs = len(str(zabstract or "").strip().split("\n\n"))
    for path in sorted(tour_dir.glob("*.yaml")):
        tour = load_yaml(path)
        if tour.get("id") != path.stem:
            errors.append(f"{path}: id {tour.get('id')!r} must match file name {path.stem!r}")
        for key in ("title", "summary"):
            if not isinstance(tour.get(key), str) or not tour[key].strip():
                errors.append(f"{path}: {key} must be a non-empty string")
        steps = tour.get("steps")
        if not isinstance(steps, list) or not steps:
            errors.append(f"{path}: steps must be a non-empty list")
            steps = []
        for index, step in enumerate(steps, 1):
            where = f"{path}: step {index}"
            if not isinstance(step, dict):
                errors.append(f"{where}: expected mapping")
                continue
            for problem in tour_view_errors(str(step.get("view", "")), ids) + tour_stage_errors(step, abstract_paragraphs):
                errors.append(f"{where}: {problem}")
            if not isinstance(step.get("say"), str) or not step["say"].strip():
                errors.append(f"{where}: say must be a non-empty string")
            if step.get("label") is not None and step["label"] not in EVIDENCE_LABELS:
                errors.append(f"{where}: label must be one of {sorted(EVIDENCE_LABELS)}")
            if step.get("dwell") is not None and not (isinstance(step["dwell"], (int, float)) and 2 <= step["dwell"] <= 60):
                errors.append(f"{where}: dwell must be a number of seconds from 2 to 60")
        tours.append(tour)
    # The Observatory Guide's example blocks must also be valid tours.
    guide = REPO_ROOT / "docs" / "TOUR-LANGUAGE.md"
    preset_ids = {tour.get("id") for tour in tours}
    if guide.exists():
        for number, block in enumerate(re.findall(r"```soma-tour\n(.*?)```", guide.read_text(encoding="utf-8"), re.S), 1):
            for line in block.splitlines():
                key, _, value = line.strip().removeprefix("- ").partition(":")
                value = value.strip().strip('"')
                if key == "view":
                    for problem in tour_view_errors(value, ids):
                        errors.append(f"{guide}: example block {number}: {problem}")
                elif key == "tour" and value not in preset_ids:
                    errors.append(f"{guide}: example block {number}: unknown preset {value!r}")
                elif key == "label" and value not in EVIDENCE_LABELS:
                    errors.append(f"{guide}: example block {number}: unknown label {value!r}")
    if errors:
        for error in errors:
            print(f"registry error: {error}", file=sys.stderr)
        raise SystemExit(1)
    return tours


def main() -> None:
    examples = load_examples()
    registry = load_registry()
    questions = load_questions(examples)
    tours = load_tours(questions, registry[2], registry[3])
    reading = load_reading({level["id"] for level in registry[0]})
    concepts = load_concepts()
    write_outputs(*registry, examples=examples, questions=questions, tours=tours, reading=reading, concepts=concepts)


if __name__ == "__main__":
    main()
