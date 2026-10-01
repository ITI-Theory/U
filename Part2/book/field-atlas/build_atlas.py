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


def level_spread(level_id: str, labels: dict[str, str], edges, examples, missing: list[str]) -> str:
    data = yaml.safe_load((REGISTRY / "levels" / f"{level_id}.yaml").read_text(encoding="utf-8"))
    entry_path = REGISTRY / "levels" / f"{level_id}.md"
    if not entry_path.exists():
        missing.append(f"entry text {entry_path.name}")
        front, body = {}, "*Entry text not yet written.*"
    else:
        front, body = split_front_matter(entry_path.read_text(encoding="utf-8"))
    claims = data.get("claims", {})
    out = ["\\newpage", "", f"## {data['label']} {{#level-{level_id}}}", ""]
    out += [
        "| | |",
        "|:--|:--|",
        f"| Scale | {powers(data.get('length_scale', ''))} |",
        f"| Response time | {powers(data.get('response_time', 'not set'))}: {cell(data.get('response_time_basis', ''))} |",
        f"| Substrate | {cell(data.get('substrate', ''))} |",
        f"| Field | {cell(data.get('field', ''))} |",
        f"| Equation | ${data.get('equation', '')}$ |",
        f"| Badges | physical {claims.get('physical', '-')}, field {claims.get('field', '-')}, mind {claims.get('mind', '-')} |",
        "",
    ]
    plates = [ATLAS / "figures" / "app" / "plates" / f"{level_id}--lens-{lens}.png" for lens in ("off", "on")]
    if all(plate.exists() for plate in plates):
        out += [
            " ".join(f"![]({plate.relative_to(ATLAS).as_posix()}){{width=49%}}" for plate in plates),
            "",
            "\\begin{center}\\footnotesize\\textit{Left: T-Theory lens off (4D physics baseline). Right: lens on (field layers). Rendered by the Soma Machine.}\\end{center}",
            "",
        ]
    else:
        missing.append(f"plates for {level_id} (run npm run capture)")
    out += [demote(body, 1), ""]
    for figure in front.get("figures") or []:
        out += [f"![]({(Path('figures') / figure).as_posix()}){{width=80%}}", ""]
    for example in examples.get(level_id, []):
        out += [f"### Worked example: {example['label']}", "", example.get("summary", ""), ""]
        for step in example["steps"]:
            out += [
                f"**{AXIS_TITLES.get(step['axis'], step['axis'])}: {step['title']}** ({step['badge']})",
                "",
                step["body"].strip(),
                "",
                f"$$ {step['equation']} $$",
                "",
            ]
    for (source, target), (edge, edge_body) in edges.items():
        if source == level_id:
            out += [f"### Transition: {data['label']} to {labels.get(target, target)}", "", edge_body, ""]
    return "\n".join(out)


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
    listed = [level for sector in atlas["sectors"] for level in sector["levels"]]
    unlisted = sorted(set(labels) - set(listed))
    if unlisted:
        missing.append(f"levels not in atlas.yaml: {', '.join(unlisted)}")

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
        parts += [(ATLAS / name).read_text(encoding="utf-8").strip(), ""]
    parts += ["\\mainmatter", ""]
    for number, sector in enumerate(atlas["sectors"], start=1):
        front, body = split_front_matter((ATLAS / sector["file"]).read_text(encoding="utf-8"))
        parts += [f"# Sector {front.get('sector', number)}: {front.get('title', '')}", "", body, ""]
        for level_id in sector["levels"]:
            parts += [level_spread(level_id, labels, edges, examples, missing), ""]
    parts += ["\\backmatter", ""]
    for name in atlas["back"]:
        parts += [(ATLAS / name).read_text(encoding="utf-8").strip(), ""]
    parts += ["# References {.unnumbered}", "", "::: {#refs}", ":::", ""]
    return "\n".join(parts), missing


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("--md-only", action="store_true")
    args = parser.parse_args()
    markdown, missing = assemble()
    BLD.mkdir(exist_ok=True)
    md_path = BLD / "field-atlas.md"
    md_path.write_text(markdown, encoding="utf-8", newline="\n")
    print(f"wrote {md_path} ({len(markdown.split())} words)")
    for item in missing:
        print(f"missing: {item}")
    if args.md_only:
        return
    pdf_path = BLD / "field-atlas.pdf"
    command = [
        "pandoc", str(md_path), "-o", str(pdf_path),
        "--pdf-engine=xelatex", "--standalone", f"--resource-path={ATLAS}",
        "--citeproc", f"--bibliography={BIB}", f"--csl={CSL}",
        "-V", "geometry=paperwidth=156mm,paperheight=234mm,twoside,inner=20mm,outer=16mm,top=20mm,bottom=22mm",
        "-V", "fontsize=10pt", "-V", "mainfont=TeX Gyre Pagella", "-V", "monofont=Consolas",
        "-V", "colorlinks=true", "-V", "linkcolor=NavyBlue", "-V", "urlcolor=NavyBlue",
        "-V", "header-includes=\\usepackage{amsmath}\\usepackage{amssymb}",
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
