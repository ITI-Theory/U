#!/usr/bin/env python3
"""Assemble the Field Atlas from the shared registry and build the PDF.

    python build_atlas.py            # bld/field-atlas.md and bld/field-atlas.pdf
    python build_atlas.py --md-only  # markdown only

Order comes from atlas.yaml. Per level: data panel (registry/levels/<id>.yaml),
app plates (figures/app/plates/<id>--lens-{off,on}.png from `npm run capture`),
the entry text (registry/levels/<id>.md), worked examples (registry/examples),
and the transition text to the next level (registry/paths/*/edges).
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

import yaml

ATLAS = Path(__file__).resolve().parent
REPO = ATLAS.parents[2]
REGISTRY = REPO / "registry"
BLD = ATLAS / "bld"
BIB = REPO / "paper" / "bibliography.bib"
CSL = REPO / "paper" / "apa-7th.csl"

# "royal" (156 x 234 mm book) or "a3" (A3 landscape picture atlas, printfactory.ch).
FORMAT = "royal"
PRINT_IMAGES = ATLAS / "figures" / "app" / "print"


def full_bleed(image: Path) -> list[str]:
    # A whole page filled by one app screenshot (A3 landscape, 300 dpi).
    return [
        "\\clearpage\\thispagestyle{empty}",
        f"\\AddToShipoutPictureBG*{{\\AtPageLowerLeft{{\\includegraphics[width=\\paperwidth,height=\\paperheight]{{{image.as_posix()}}}}}}}",
        "\\mbox{}\\clearpage",
        "",
    ]


def columns(markdown: str) -> str:
    # Three columns on A3 pages; tables (longtable) cannot sit inside multicols.
    if FORMAT != "a3" or re.search(r"^\|[:\- |]+\|\s*$", markdown, re.M):
        return markdown
    # Macros: pandoc would pass a whole \begin...\end environment through unconverted.
    return f"\\colsbegin\n\n{markdown}\n\n\\colsend"


AXIS_TITLES = {"4d-baseline": "4D / physics baseline", "8d-life": "8D / life and regulation", "11d-mind": "11D / mind"}


def split_front_matter(text: str) -> tuple[dict, str]:
    if text.startswith("---"):
        _, front, body = text.split("---", 2)
        return yaml.safe_load(front) or {}, body.strip()
    return {}, text.strip()


def demote(markdown: str, levels: int) -> str:
    return re.sub(r"^(#{1,5}) ", lambda m: "#" * (len(m.group(1)) + levels) + " ", markdown, flags=re.M)


def powers(text: str) -> str:
    return re.sub(r"10\^(-?\d+)", r"$10^{\1}$", str(text))


def cell(text: str) -> str:
    return str(text).replace("|", "\\|").replace("\n", " ")


def load_edges() -> dict[tuple[str, str], tuple[dict, str]]:
    edges: dict[tuple[str, str], tuple[dict, str]] = {}
    for path in sorted(REGISTRY.glob("paths/*/edges/*.md")):
        front, body = split_front_matter(path.read_text(encoding="utf-8"))
        key = (front.get("from"), front.get("to"))
        if key not in edges or path.parts[-3] == "full-atlas":
            edges[key] = (front, body)
    return edges


def load_models_and_paths() -> tuple[list[dict], list[dict]]:
    models = [yaml.safe_load(p.read_text(encoding="utf-8")) for p in sorted(REGISTRY.glob("models/*.yaml"))]
    paths = [yaml.safe_load(p.read_text(encoding="utf-8")) for p in sorted(REGISTRY.glob("paths/*/path.yaml"))]
    return models, paths


def model_levels(model: dict) -> list[tuple[str, str, list[str]]]:
    """(coordinate, label, level ids) rows; canonical-5 groups several levels per coordinate."""
    rows = []
    for entry in model.get("levels", []):
        ids = entry.get("levels") or [entry.get("level")]
        rows.append((str(entry.get("coordinate")), entry.get("label", ""), ids))
    return rows


def level_link(level_id: str, labels: dict[str, str]) -> str:
    return f"[{labels.get(level_id, level_id)}](#level-{level_id})"


def models_part(models: list[dict], labels: dict[str, str]) -> str:
    out = ["# Models {#part-models}", "",
           "A model is a named way of reading the ladder: its own coordinates over the shared levels. "
           "The same level can carry different coordinates in different models; the level itself does not change.", ""]
    for model in models:
        out += [f"## {model['label']} {{#model-{model['id']}}}", "", model.get("description", ""), "",
                "| Coordinate | Name | Levels |", "|:--|:--|:--|"]
        for coordinate, label, ids in model_levels(model):
            out.append(f"| {cell(coordinate)} | {cell(label)} | {', '.join(level_link(i, labels) for i in ids if i)} |")
        out += ["", f"Paths in this model: {', '.join(f'[{p}](#path-{p})' for p in model.get('paths', [])) or 'none'}.", ""]
    return "\n".join(out)


def paths_part(paths: list[dict], labels: dict[str, str], edges, examples, missing: list[str]) -> str:
    out = ["# Paths {#part-paths}", "",
           "A path is an ordered route through the levels, one transition per step. Paths are how the app "
           "moves between levels, and how a single system (a body, a flock, a city, a planet) is followed up the ladder.", ""]
    for path in paths:
        purpose = path.get("purpose", "")
        if not purpose or purpose.startswith("Migrated"):
            missing.append(f"reader-facing purpose for path {path['id']}")
            purpose = ""
        out += [f"## {path['label']} {{#path-{path['id']}}}", "", purpose, ""]
        for index, level_id in enumerate(path["nodes"], start=1):
            out.append(f"{index}. {level_link(level_id, labels)}")
        out.append("")
        steps = list(zip(path["nodes"], path["nodes"][1:]))
        if steps:
            out += ["| Step | Operation | Kernel | Badge |", "|:--|:--|:--|:--|"]
            for source, target in steps:
                edge = edges.get((source, target), ({}, ""))[0]
                out.append(f"| {labels.get(source, source)} to {labels.get(target, target)} | {cell(edge.get('label', '-'))} | {cell(edge.get('kernel', '-'))} | {edge.get('claim', '-')} |")
            out.append("")
        path_examples = [e for group in examples.values() for e in group if path["id"] in e.get("paths", [])]
        if path_examples:
            out += ["Worked examples on this path: " + "; ".join(f"{e['label']} (at {level_link(e['level'], labels)})" for e in path_examples) + ".", ""]
    return "\n".join(out)


def level_spread(level_id: str, labels: dict[str, str], edges, examples, missing: list[str], paths: list[dict] | None = None) -> str:
    data = yaml.safe_load((REGISTRY / "levels" / f"{level_id}.yaml").read_text(encoding="utf-8"))
    entry_path = REGISTRY / "levels" / f"{level_id}.md"
    if not entry_path.exists():
        missing.append(f"entry text {entry_path.name}")
        front, body = {}, "*Entry text not yet written.*"
    else:
        front, body = split_front_matter(entry_path.read_text(encoding="utf-8"))
    claims = data.get("claims", {})
    pictures = {view: next(PRINT_IMAGES.glob(f"*-{level_id}--{view}.jpg"), None) or next(PRINT_IMAGES.glob(f"*-{level_id}--{view}.png"), None) for view in ("lens-on", "compare")}
    out = []
    if FORMAT == "a3":
        if pictures["lens-on"]:
            out += full_bleed(pictures["lens-on"])
        else:
            missing.append(f"print image for {level_id} (run capture --only print)")
    out += ["\\newpage", "", f"## {data['label']} {{#level-{level_id}}}", ""]
    out += [
        "| | |",
        "|:--|:--|",
        f"| Scale | {powers(data.get('length_scale', ''))} |",
        f"| Response time | {powers(data.get('response_time', 'not set'))}: {cell(data.get('response_time_basis', ''))} |",
        f"| Substrate | {cell(data.get('substrate', ''))} |",
        f"| Field | {cell(data.get('field', ''))} |",
        f"| Equation | ${data.get('equation', '')}$ |",
        f"| Badges | physical {claims.get('physical', '-')}, field {claims.get('field', '-')}, mind {claims.get('mind', '-')} |",
        f"| Paths | {', '.join(f'[{p['label']}](#path-{p['id']})' for p in (paths or []) if level_id in p['nodes']) or 'none yet'} |",
        "",
    ]
    plates = [ATLAS / "figures" / "app" / "plates" / f"{level_id}--lens-{lens}.png" for lens in ("off", "on")]
    if FORMAT == "a3":
        pass  # the full-bleed pages carry the pictures
    elif all(plate.exists() for plate in plates):
        out += [
            " ".join(f"![]({plate.relative_to(ATLAS).as_posix()}){{width=49%}}" for plate in plates),
            "",
            "\\begin{center}\\footnotesize\\textit{Left: T-Theory lens off (4D physics baseline). Right: lens on (field layers). Rendered by the Soma Machine.}\\end{center}",
            "",
        ]
    else:
        missing.append(f"plates for {level_id} (run npm run capture)")
    text = [demote(body, 1), ""]
    for figure in front.get("figures") or []:
        width = "\\columnwidth" if FORMAT == "a3" else "80%"
        text += [f"![]({(Path('figures') / figure).as_posix()}){{width={width}}}", ""]
    for example in examples.get(level_id, []):
        text += [f"### Worked example: {example['label']}", "", example.get("summary", ""), ""]
        for step in example["steps"]:
            text += [
                f"**{AXIS_TITLES.get(step['axis'], step['axis'])}: {step['title']}** ({step['badge']})",
                "",
                step["body"].strip(),
                "",
                f"$$ {step['equation']} $$",
                "",
            ]
    for (source, target), (edge, edge_body) in edges.items():
        if source == level_id:
            text += [f"### Transition: {data['label']} to {labels.get(target, target)}", "", edge_body, ""]
    out += [columns("\n".join(text)), ""]
    if FORMAT == "a3" and pictures["compare"]:
        out += full_bleed(pictures["compare"])
    return "\n".join(out)


def front_or_back(path: Path) -> str:
    heading, _, rest = path.read_text(encoding="utf-8").strip().partition("\n")
    return f"{heading}\n\n{columns(rest.strip())}"


def assemble() -> tuple[str, list[str]]:
    atlas = yaml.safe_load((ATLAS / "atlas.yaml").read_text(encoding="utf-8"))
    labels = {
        yaml.safe_load(path.read_text(encoding="utf-8"))["id"]: yaml.safe_load(path.read_text(encoding="utf-8"))["label"]
        for path in (REGISTRY / "levels").glob("*.yaml")
    }
    edges = load_edges()
    examples: dict[str, list[dict]] = {}
    for path in sorted((REGISTRY / "examples").glob("*.yaml")):
        example = yaml.safe_load(path.read_text(encoding="utf-8"))
        examples.setdefault(example["level"], []).append(example)
    missing: list[str] = []
    models, paths = load_models_and_paths()
    listed = [level for sector in atlas["sectors"] for level in sector["levels"]]
    unlisted = sorted(set(labels) - set(listed))
    if unlisted:
        # Every registry level must be in the book; a new level folder makes the build fail until placed.
        raise SystemExit(f"levels in the registry but not in atlas.yaml: {', '.join(unlisted)}")

    parts = [
        "---",
        f"title: \"{atlas['title']}\"",
        f"subtitle: \"{atlas['subtitle']}\"",
        "author: Alistair Johnson",
        "date: 2026",
        "documentclass: book",
        "classoption: [openany]",
        "toc: true",
        "toc-depth: 1",
        "link-citations: true",
        "---",
        "",
        "\\frontmatter",
        "",
    ]
    for name in atlas["front"]:
        parts += [front_or_back(ATLAS / name), ""]
    parts += ["\\mainmatter", ""]
    for number, sector in enumerate(atlas["sectors"], start=1):
        front, body = split_front_matter((ATLAS / sector["file"]).read_text(encoding="utf-8"))
        parts += [f"# Sector {front.get('sector', number)}: {front.get('title', '')}", "", columns(body), ""]
        for level_id in sector["levels"]:
            parts += [level_spread(level_id, labels, edges, examples, missing, paths), ""]
    parts += [models_part(models, labels), "", paths_part(paths, labels, edges, examples, missing), ""]
    on_paths = {level for path in paths for level in path["nodes"]}
    for level_id in listed:
        if level_id not in on_paths:
            missing.append(f"level {level_id} is on no path")
    parts += ["\\backmatter", ""]
    for name in atlas["back"]:
        parts += [front_or_back(ATLAS / name), ""]
    parts += ["# References {.unnumbered}", "", "::: {#refs}", ":::", ""]
    return "\n".join(parts), missing


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("--md-only", action="store_true")
    parser.add_argument("--a3", action="store_true", help="A3 landscape picture atlas (printfactory.ch)")
    args = parser.parse_args()
    global FORMAT
    FORMAT = "a3" if args.a3 else "royal"
    stem = "field-atlas-a3" if args.a3 else "field-atlas"
    markdown, missing = assemble()
    BLD.mkdir(exist_ok=True)
    md_path = BLD / f"{stem}.md"
    md_path.write_text(markdown, encoding="utf-8", newline="\n")
    print(f"wrote {md_path} ({len(markdown.split())} words)")
    for item in missing:
        print(f"missing: {item}")
    if args.md_only:
        return
    pdf_path = BLD / f"{stem}.pdf"
    page = (
        ["-V", "geometry=paperwidth=420mm,paperheight=297mm,margin=18mm,top=20mm,bottom=20mm", "-V", "fontsize=11pt", "-V", "linestretch=1.12"]
        if FORMAT == "a3"
        else ["-V", "geometry=paperwidth=156mm,paperheight=234mm,twoside,inner=20mm,outer=16mm,top=20mm,bottom=22mm", "-V", "fontsize=10pt"]
    )
    command = [
        "pandoc", str(md_path), "-o", str(pdf_path),
        "--pdf-engine=xelatex", "--standalone", f"--resource-path={ATLAS}",
        "--citeproc", f"--bibliography={BIB}", f"--csl={CSL}",
        *page, "-V", "mainfont=TeX Gyre Pagella", "-V", "monofont=Consolas",
        "-V", "colorlinks=true", "-V", "linkcolor=NavyBlue", "-V", "urlcolor=NavyBlue",
        "-V", "header-includes=\\usepackage{amsmath}\\usepackage{amssymb}\\usepackage{graphicx}\\usepackage{multicol}\\usepackage{eso-pic}\\setlength{\\columnsep}{9mm}\\newcommand{\\colsbegin}{\\begin{multicols}{3}}\\newcommand{\\colsend}{\\end{multicols}}",
    ]
    result = subprocess.run(command, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        print(result.stderr[-4000:], file=sys.stderr)
        raise SystemExit(result.returncode)
    warnings = [line for line in result.stderr.splitlines() if line.strip()]
    for line in warnings[:20]:
        print(f"pandoc: {line}")
    print(f"wrote {pdf_path}")


if __name__ == "__main__":
    main()
