#!/usr/bin/env python3
"""Build the figure library: every {{Visualize}} figure in one file (ISS-051).

Usage: library.py [--bld DIR] [--out DIR]

Collects the manifests under <bld>/**/visualize/ (manifest.json and the
per-document lists in docs/), keeps each figure once (its id is a hash of what it
draws), and writes <out>/library.md and, with pandoc, <out>/library.pdf: per
source document, each figure with its caption, its context (the equation, section
or Lean theorem it illustrates), the primitive and concept, the expression and
parameters, and the image. One file, meant as a source for custom chats (Gemini
Gems, NotebookLM). Figures whose image has not been drawn yet are listed, not shown.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def collect(bld: Path) -> dict[str, dict]:
    figures: dict[str, dict] = {}
    for folder in sorted(p for p in bld.rglob("visualize") if p.is_dir()):
        manifests = [folder / "manifest.json", *sorted((folder / "docs").glob("*.json"))]
        for manifest in manifests:
            if not manifest.exists():
                continue
            for spec in json.loads(manifest.read_text(encoding="utf-8")):
                entry = figures.setdefault(spec["id"], {**spec, "image": folder / f"{spec['id']}.png"})
                # Per-document lists name the document; the shared manifest may not.
                if spec.get("document"):
                    entry["document"] = spec["document"]
                entry.setdefault("document", folder.parent.name)
    return figures


def literal(text: str) -> str:
    """Captions are plain text with TeX fragments left in; print them as written."""
    return re.sub(r"([\\`*_{}\[\]()#+\-.!$^~|<>&%])", r"\\\1", " ".join(str(text).split()))


def markdown(figures: dict[str, dict], out: Path) -> str:
    by_document: dict[str, list[dict]] = {}
    for figure in figures.values():
        by_document.setdefault(figure["document"], []).append(figure)
    drawn = sum(1 for f in figures.values() if f["image"].exists())
    lines = [
        "---",
        'title: "[T]-Theory figure library"',
        f'subtitle: "{len(figures)} figures from {len(by_document)} documents, {dt.date.today():%d %B %Y}"',
        "---",
        "",
        "Every figure in the programme is declared in the text with `{{Visualize}}` and drawn by",
        "code from the expression it illustrates (docs/VISUALIZE.md). Each entry gives the source",
        "document, the context it visualises, the drawing primitive and palette, the expression and",
        f"parameters, and the image. {drawn} of {len(figures)} are drawn.",
        "",
    ]
    for document in sorted(by_document):
        lines += [f"# {document}", ""]
        for figure in sorted(by_document[document], key=lambda f: (f["context"], f["id"])):
            params = "; ".join(f"{k}={v}" for k, v in sorted(figure.get("params", {}).items()))
            lines += [
                f"## {literal(figure['caption'][:90])}",
                "",
                f"- Context: `{figure['context']}`",
                f"- Drawing: `{figure['primitive']}` ({figure['concept']}), id `{figure['id']}`",
                f"- Expression and parameters: `{params}`" if params else "- No parameters",
                "",
            ]
            if figure["image"].exists():
                relative = Path(os.path.relpath(figure["image"], out)).as_posix()
                lines += [f"![{literal(figure['caption'])}]({relative}){{width=70%}}", ""]
            else:
                lines += ["*(not drawn yet)*", ""]
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--bld", type=Path, default=ROOT / "bld")
    parser.add_argument("--out", type=Path, default=ROOT / "bld" / "visualize")
    args = parser.parse_args()
    # Draw what is missing first: shared manifests are overwritten by later builds, the
    # per-document lists are complete (render.py writes their images to the folder).
    for listing in sorted(args.bld.rglob("visualize/docs/*.json")):
        subprocess.run([sys.executable, str(ROOT / "lib" / "visualize" / "render.py"), str(listing)], capture_output=True)
    figures = collect(args.bld)
    args.out.mkdir(parents=True, exist_ok=True)
    md = args.out / "library.md"
    md.write_text(markdown(figures, args.out), encoding="utf-8", newline="\n")
    print(f"figure library: {len(figures)} figures -> {md}")
    pdf = args.out / "library.pdf"
    result = subprocess.run(
        ["pandoc", md.name, "-o", pdf.name, "--pdf-engine=xelatex", "--toc", "--toc-depth=1",
         "-V", "geometry=a4paper,margin=20mm", "-V", "mainfont=TeX Gyre Pagella", "-V", "monofont=Latin Modern Mono"],
        cwd=args.out, capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr[-1500:])
        return 1
    print(f"figure library: {pdf}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
