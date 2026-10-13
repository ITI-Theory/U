"""Sherlock's coverage (ISS-092): what a book promises, and what is missing.

    python sherlock/coverage.py                 # every scope in registry/scopes.yaml
    python sherlock/coverage.py field-atlas     # one book

A book's promise is a list of registry ids per kind (registry/scopes.yaml). Each id is covered
when its identifying text (a level's label, a model's or path's label, a question, a concept's
phrase or Lean name, a paper's title or id, a tour's title) appears in the built document, or,
for the explorer's stops, when the book's configuration captures that stop (voyage=<stop>).
Writes bld/sherlock/coverage-<book>.md and fails when a required id is missing.
"""
from __future__ import annotations

import re
import subprocess
import sys
import unicodedata
from pathlib import Path

import yaml

U = Path(__file__).resolve().parents[1]
REG = U / "registry"
OUT = U / "bld" / "sherlock"


def norm(text: str) -> str:
    """Letters and digits only, lower case, Unicode-normalised (G\u2082 and G$_2$ both give g2; dashes,
    quotes, brackets and LaTeX commands drop out), so a title matches however it is typeset."""
    text = re.sub(r"\\[a-zA-Z]+\*?", " ", text)          # LaTeX commands
    text = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in text.lower() if ch.isalnum())


def load_yaml(p: Path):
    return yaml.safe_load(p.read_text(encoding="utf-8"))


def registry_items() -> dict[str, dict[str, list[str]]]:
    """kind -> id -> the texts that show it is covered (any one suffices)."""
    items: dict[str, dict[str, list[str]]] = {k: {} for k in ("levels", "models", "paths", "questions", "concepts", "papers", "tours", "stops")}
    for p in sorted((REG / "levels").glob("*.yaml")):
        d = load_yaml(p)
        items["levels"][d["id"]] = [d.get("label", d["id"])]
    for p in sorted((REG / "models").glob("*.yaml")):
        d = load_yaml(p)
        items["models"][d["id"]] = [d.get("label", d["id"])]
    for p in sorted((REG / "paths").glob("*/path.yaml")):
        d = load_yaml(p)
        items["paths"][d["id"]] = [d.get("label", d["id"])]
    for p in sorted((REG / "questions").glob("*.yaml")):
        d = load_yaml(p)
        items["questions"][d["id"]] = [d.get("question", d["id"])]
    for p in sorted((REG / "concepts").glob("*.yaml")):
        d = load_yaml(p)
        lean = (d.get("lean") or {}).get("name")
        items["concepts"][d["id"]] = [d.get("concept", d["id"])] + ([lean] if lean else [])
    papers = load_yaml(REG / "papers.yaml")["canonical_papers"]
    for p in (papers.values() if isinstance(papers, dict) else papers):
        # the published title or the paper's own (source_title), whichever the book uses
        titles = [str(p[k]).split(":")[0] for k in ("title", "source_title") if p.get(k)]
        items["papers"][p["id"]] = titles or [p["id"]]
    for p in sorted((REG / "tours").glob("*.yaml")):
        d = load_yaml(p)
        items["tours"][d["id"]] = [d.get("title", d["id"])]
    explorer = (U / "apps/instrument/visuals/soma-field-operator/explorer.js").read_text(encoding="utf-8")
    stops = re.findall(r"'(\w+)'", re.search(r"export const STOPS = \[(.*?)\]", explorer).group(1))
    items["stops"] = {s: [f"voyage={s}"] for s in stops}
    return items


def check(name: str, scope: dict, items: dict) -> tuple[list[str], int]:
    built = U / scope["built"] if scope.get("built") else None
    texts = []
    if built and built.exists() and built.suffix == ".pdf":
        r = subprocess.run(["pdftotext", "-enc", "UTF-8", str(built), "-"], capture_output=True)
        texts.append(r.stdout.decode("utf-8", errors="replace"))
    elif built and built.exists():
        texts.append(built.read_text(encoding="utf-8", errors="replace"))
    for pattern in scope.get("sources") or []:
        texts += [p.read_text(encoding="utf-8", errors="replace") for p in sorted(U.glob(pattern))]
    config = (U / scope["config"]).read_text(encoding="utf-8") if scope.get("config") else ""
    body = norm("\n".join(texts))
    lines, missing_required = [f"# Coverage: {scope.get('title', name)}", "",
                                f"Checked against `{scope.get('built') or ', '.join(scope.get('sources') or [])}`"
                                + ("" if not built or built.exists() else " (NOT BUILT: build it first)") + ".", ""], 0
    if built and not built.exists():
        print(f"{name}: {scope['built']} is not built")
        return lines, 1
    for group, required in (("expect", True), ("report", False)):
        for kind, want in (scope.get(group) or {}).items():
            pool = items.get(kind, {})
            ids = list(pool) if want == "all" else list(want)
            missing = []
            for i in ids:
                needles = pool.get(i, [i])
                if kind == "stops":
                    found = any(n in config for n in needles)
                else:
                    found = any(norm(n) and norm(n) in body for n in needles)
                if not found:
                    missing.append(i)
            mark = "required" if required else "reported"
            lines.append(f"## {kind}: {len(ids) - len(missing)} of {len(ids)} covered ({mark})")
            lines.append("")
            for i in missing:
                lines.append(f"- missing: `{i}` ({' / '.join(pool.get(i, [i]))})")
            if missing:
                lines.append("")
            print(f"{name} {kind}: {len(ids) - len(missing)}/{len(ids)}" + (f", missing {', '.join(missing)}" if missing else ""))
            if required:
                missing_required += len(missing)
    return lines, missing_required


def manifest_scopes(spec: dict) -> dict[str, dict]:
    """Scopes read from a book manifest (registry/scopes.yaml `manifests:`), so a promise the
    manifest already states is pointed to, not copied: each domain's canonical papers (c:<slug>)
    and its levels are required; the concepts of those papers are reported."""
    manifest = load_yaml(U / spec["file"])
    for key in spec.get("path", []):
        manifest = manifest[key]
    papers = load_yaml(REG / "papers.yaml")["canonical_papers"]
    by_slug = {p["slug"]: p["id"] for p in (papers.values() if isinstance(papers, dict) else papers)}
    concepts = [load_yaml(c) for c in sorted((REG / "concepts").glob("*.yaml"))]
    out = {}
    for dom in manifest[spec.get("list", "domains")]:
        ids = [by_slug[x.split(":", 1)[1]] for x in dom.get("papers", []) if x.startswith("c:") and x.split(":", 1)[1] in by_slug]
        stem = Path(dom["source_book"]).stem
        out[f"book-{dom['id']}"] = {
            "title": dom.get("title", dom["id"]),
            "built": spec["built"].format(stem=stem, id=dom["id"]),
            "expect": {"papers": ids},
            # the ladder note naming the levels is added when the volumes are assembled
            # (ttheory-assemble.lua zoom_strip), not in the standalone book: reported here
            "report": {**({"levels": dom["levels"]} if dom.get("levels") else {}),
                       "concepts": [c["id"] for c in concepts if set(c.get("papers") or []) & set(ids)]},
        }
    return out


def printed_nowhere(spec: dict) -> list[str]:
    """Canonical papers a manifest assigns to a domain but no book prints in full ({{AddPaper}} in
    a source book, or a volume's closing paper): mentioned is not printed (ISS-092, 13 Oct: P10,
    P14, P15 and P25 had been placed in the manifest, cited, and printed nowhere)."""
    manifest = load_yaml(U / spec["file"])
    for key in spec.get("path", []):
        manifest = manifest[key]
    root = (U / spec["file"]).parent.parent
    printed = set()
    for dom in manifest[spec.get("list", "domains")]:
        src = (root / dom["source_book"]).read_text(encoding="utf-8")
        printed |= set(re.findall(r"\{\{AddPaper [^}]*?/([\w-]+)\.md\}\}", src))
    for vol in (manifest.get("volumes") or {}).values():
        if str(vol.get("closing_paper", "")).startswith("c:"):
            printed.add(vol["closing_paper"][2:])
    wanted = {x[2:] for dom in manifest[spec.get("list", "domains")] for x in dom.get("papers", []) if x.startswith("c:")}
    return sorted(wanted - printed)


def main(argv: list[str]) -> int:
    for stream in (sys.stdout, sys.stderr):
        stream.reconfigure(encoding="utf-8", errors="replace")
    reg = load_yaml(REG / "scopes.yaml")
    scopes = dict(reg["scopes"])
    for spec in (reg.get("manifests") or {}).values():
        scopes.update(manifest_scopes(spec))
    items = registry_items()
    failed = 0
    printed_only = "--printed" in argv  # only the manifests' printed check (fast; Moriarty uses it)
    for name, scope in scopes.items():
        if printed_only or (argv and name not in argv):
            continue
        lines, missing = check(name, scope, items)
        OUT.mkdir(parents=True, exist_ok=True)
        (OUT / f"coverage-{name}.md").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")
        failed += missing
    for name, spec in (reg.get("manifests") or {}).items():
        if argv and not printed_only and not any(a.startswith("book-") for a in argv):
            continue
        nowhere = printed_nowhere(spec)
        print(f"{name} printed: " + (f"{len(nowhere)} assigned papers printed in no book: {', '.join(nowhere)}" if nowhere else "every assigned paper is printed in full in some book"))
        failed += len(nowhere)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
