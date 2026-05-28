#!/usr/bin/env python3
"""
translate_papers.py — Translate English .md papers to DE, FR, IT using DeepL API.

Usage:
    python scripts/translate_papers.py                       # translate all papers
    python scripts/translate_papers.py soma-field-paper      # one paper, all langs
    python scripts/translate_papers.py --langs de fr         # all papers, specific langs
    python scripts/translate_papers.py soma-field-paper --langs de

Requires:
    pip install deepl PyYAML
    DEEPL_API_KEY environment variable
    Free key (500k chars/month): https://www.deepl.com/pro-api

Output:
    paper/bld/<name>.de.md  (and .fr.md, .it.md)
    These are picked up directly by 'make translations'.
"""

import argparse
import os
import re
import sys
from pathlib import Path

try:
    import deepl
except ImportError:
    print("Error: deepl package not installed.  Run: pip install deepl", file=sys.stderr)
    sys.exit(1)

try:
    import yaml
except ImportError:
    print("Error: PyYAML not installed.  Run: pip install PyYAML", file=sys.stderr)
    sys.exit(1)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parent.parent
PAPER_DIR = REPO_ROOT / "paper"
BLD_DIR   = PAPER_DIR / "bld"

# All papers that can be translated.
# Mirrors TRANS_PAPERS in paper/Makefile (keep in sync).
ALL_PAPERS = [
    "soma-field-paper",
    "soma-field-patient-pov",
    "quantum-soma-penrose",
    "soma-field-book",
    "the-tensor",
    "mathematical-co-identification",
    "music-affect-dynamics",
    "soma-field-synthesis",
    "soma-physical-substrate",
]

LANG_MAP = {
    "de": {"deepl": "DE",  "pandoc": "de",  "label": "German"},
    "fr": {"deepl": "FR",  "pandoc": "fr",  "label": "French"},
    "it": {"deepl": "IT",  "pandoc": "it",  "label": "Italian"},
}

# YAML frontmatter fields to translate (all others are kept verbatim).
TRANSLATE_FM_FIELDS = {"title", "subtitle", "abstract", "keywords"}

# ---------------------------------------------------------------------------
# Placeholder-based content protection
# ---------------------------------------------------------------------------

class Protector:
    """
    Replace content that must survive translation unchanged with round-trip-safe
    tokens.  Patterns are applied in order (longest/outermost first).
    """

    TOKEN_PAT = re.compile(r"XPROT(\d+)XPROT")

    PATTERNS = [
        re.compile(r"```[\s\S]*?```"),        # fenced code blocks
        re.compile(r"`[^`\n]+`"),             # inline code
        re.compile(r"\$\$[\s\S]*?\$\$"),      # display math
        re.compile(r"\$[^\$\n]+\$"),          # inline math
        re.compile(r"\[@[^\]]*\]"),           # pandoc citations  [@key]
        re.compile(r"\{[#\.][^}]*\}"),        # pandoc attrs  {#id .class}
        re.compile(r"<!--[\s\S]*?-->"),       # HTML comments
        re.compile(r"\\\w+"),                 # LaTeX commands  \newpage etc.
    ]

    def __init__(self):
        self._store: list[str] = []

    def protect(self, text: str) -> str:
        for pat in self.PATTERNS:
            def _sub(m, _store=self._store):
                idx = len(_store)
                _store.append(m.group(0))
                return f"XPROT{idx}XPROT"
            text = pat.sub(_sub, text)
        return text

    def restore(self, text: str) -> str:
        def _sub(m):
            return self._store[int(m.group(1))]
        return self.TOKEN_PAT.sub(_sub, text)


# ---------------------------------------------------------------------------
# YAML frontmatter parsing / rendering
# ---------------------------------------------------------------------------

_FM_RE = re.compile(r"^---\n([\s\S]*?)\n---\n", re.MULTILINE)


def split_frontmatter(text: str) -> tuple[dict, str]:
    m = _FM_RE.match(text)
    if not m:
        return {}, text
    return yaml.safe_load(m.group(1)) or {}, text[m.end():]


def render_frontmatter(fm: dict) -> str:
    return "---\n" + yaml.dump(
        fm,
        allow_unicode=True,
        default_flow_style=False,
        sort_keys=False,
    ) + "---\n\n"


# ---------------------------------------------------------------------------
# Translation helpers
# ---------------------------------------------------------------------------

def _translate_scalar(translator: deepl.Translator, value, target_lang: str):
    """Translate a string or list-of-strings YAML value."""
    if isinstance(value, list):
        return [_translate_scalar(translator, v, target_lang) for v in value]
    if not isinstance(value, str) or not value.strip():
        return value
    return translator.translate_text(value, target_lang=target_lang).text


def translate_paper(translator: deepl.Translator, paper_name: str, lang_code: str) -> None:
    info       = LANG_MAP[lang_code]
    src_path   = PAPER_DIR / f"{paper_name}.md"
    out_path   = BLD_DIR   / f"{paper_name}.{lang_code}.md"

    if not src_path.exists():
        print(f"  SKIP  {paper_name}: source not found ({src_path})", file=sys.stderr)
        return

    print(f"  {paper_name}  →  {info['label']} ...", end=" ", flush=True)

    raw       = src_path.read_text(encoding="utf-8")
    fm, body  = split_frontmatter(raw)

    # --- Translate selected frontmatter fields ---
    for field in TRANSLATE_FM_FIELDS:
        if field in fm:
            fm[field] = _translate_scalar(translator, fm[field], info["deepl"])
    fm["lang"] = info["pandoc"]

    # --- Translate body with protected content ---
    protector       = Protector()
    protected_body  = protector.protect(body)

    result          = translator.translate_text(
        protected_body,
        target_lang         = info["deepl"],
        split_sentences     = "nonewlines",
        preserve_formatting = True,
    )
    translated_body = protector.restore(result.text)

    BLD_DIR.mkdir(exist_ok=True)
    out_path.write_text(render_frontmatter(fm) + translated_body, encoding="utf-8")
    print(f"done  →  {out_path.relative_to(REPO_ROOT)}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Translate Soma-Field papers to DE/FR/IT via DeepL.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "papers", nargs="*",
        help="Paper names without .md extension. Defaults to all.",
    )
    parser.add_argument(
        "--langs", nargs="+", default=["de", "fr", "it"],
        choices=list(LANG_MAP.keys()),
        metavar="LANG",
        help="Target languages (default: de fr it).",
    )
    args = parser.parse_args()

    api_key = os.environ.get("DEEPL_API_KEY")
    if not api_key:
        print("Error: DEEPL_API_KEY environment variable not set.", file=sys.stderr)
        print("       Get a free key at: https://www.deepl.com/pro-api", file=sys.stderr)
        sys.exit(1)

    papers = args.papers if args.papers else ALL_PAPERS

    translator = deepl.Translator(api_key)
    usage = translator.get_usage()
    print(
        f"DeepL usage: {usage.character.count:,} / {usage.character.limit:,} chars "
        f"({usage.character.count / usage.character.limit * 100:.1f}%)"
    )
    print()

    for paper in papers:
        for lang in args.langs:
            translate_paper(translator, paper, lang)

    print()
    print("Done.  Run 'make translations' in paper/ to build PDFs.")


if __name__ == "__main__":
    main()
