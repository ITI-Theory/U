#!/usr/bin/env python3
"""
translate_papers.py — Translate English .md papers to DE, FR, IT.

Backends
--------
  llm    (default) — OpenAI-compatible API (GPT-4o).  Set OPENAI_API_KEY.
                     Also works with GitHub Models: set OPENAI_API_KEY to your
                     GitHub PAT and OPENAI_BASE_URL to
                     https://models.inference.ai.azure.com
  deepl             — DeepL API (higher quality, costs money after free tier).
                     Set DEEPL_API_KEY.
                     Free tier: https://www.deepl.com/pro-api (500k chars/month)

Usage
-----
    python scripts/translate_papers.py                            # all papers, llm
    python scripts/translate_papers.py soma-field-paper           # one paper, llm
    python scripts/translate_papers.py --langs de fr              # specific langs
    python scripts/translate_papers.py --backend deepl            # DeepL backend
    python scripts/translate_papers.py --model gpt-4.1           # override model

Makefile targets (in paper/)
-----------------------------
    make translate        # LLM  (OPENAI_API_KEY)
    make translate-deepl  # DeepL (DEEPL_API_KEY)

Output
------
    paper/bld/<name>.de.md  (and .fr.md, .it.md)
    Picked up directly by 'make translations'.
"""

import argparse
import os
import re
import sys
from pathlib import Path

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

# Assembled files that live in bld/ rather than paper/.
# translate_paper() checks BLD_DIR as a fallback for these.
BLD_ONLY_PAPERS = {"omnibus-body"}

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
# LLM backend (OpenAI-compatible)
# ---------------------------------------------------------------------------

LLM_SYSTEM = """\
You are a professional academic translator specialising in psychology, \
neuroscience, and somatic therapy. Translate the following English text \
to {label}.

Rules — follow exactly:
1. Preserve all markdown formatting: # headings, **bold**, *italic*, tables, \
bullet lists, numbered lists.
2. Tokens of the form XPROTnXPROT are protected placeholders — copy them \
verbatim, do NOT translate or alter them in any way.
3. Maintain an academic register.  Keep technical terms (e.g. "Soma-Field", \
"biotensegrity", "Hopfield network") in their established {label} usage or \
leave untranslated if no standard equivalent exists.
4. Return ONLY the translated text.  No preamble, no explanations.\
"""


def _llm_translate(client, text: str, label: str, model: str) -> str:
    """Send text to the LLM and return the translation."""
    response = client.chat.completions.create(
        model=model,
        temperature=0.2,
        messages=[
            {"role": "system", "content": LLM_SYSTEM.format(label=label)},
            {"role": "user",   "content": text},
        ],
    )
    return response.choices[0].message.content


# GitHub Models free tier limit is ~8k tokens per request.
# Keep chunks well under that: 18 000 chars ≈ 4 500 tokens leaves room for
# the system prompt (~500 t) and a full-length translation response (~3 000 t).
_MAX_CHUNK_CHARS = 18_000


def _split_chunks(text: str, max_chars: int = _MAX_CHUNK_CHARS) -> list:
    """Split Markdown text at heading boundaries, each chunk ≤ max_chars."""
    import re as _re
    # Split *before* any line that starts with one or more # chars
    parts = _re.split(r'(?=\n#{1,4} )', text)
    chunks, current = [], ""
    for part in parts:
        if len(current) + len(part) > max_chars and current:
            chunks.append(current)
            current = part
        else:
            current += part
    if current:
        chunks.append(current)
    return chunks or [text]


def _llm_translate_chunked(client, text: str, label: str, model: str,
                           cache_key: str = None, cache_dir=None) -> str:
    """Translate text, splitting into chunks if it exceeds the API token limit.

    If cache_key + cache_dir are provided, each completed chunk is saved to disk
    so re-running after a rate-limit error resumes from where it left off.
    """
    if len(text) <= _MAX_CHUNK_CHARS:
        return _llm_translate(client, text, label, model)
    chunks = _split_chunks(text)
    results = []
    for i, chunk in enumerate(chunks, 1):
        cache_file = None
        if cache_key and cache_dir:
            from pathlib import Path as _P
            _cd = _P(cache_dir)
            _cd.mkdir(parents=True, exist_ok=True)
            cache_file = _cd / f"{cache_key}.{i:03d}.txt"
            if cache_file.exists():
                print(f"\n    chunk {i}/{len(chunks)} ({len(chunk):,} chars)... (cached)",
                      flush=True)
                results.append(cache_file.read_text(encoding="utf-8"))
                continue
        print(f"\n    chunk {i}/{len(chunks)} ({len(chunk):,} chars)...",
              end=" ", flush=True)
        translated = _llm_translate(client, chunk, label, model)
        if cache_file:
            cache_file.write_text(translated, encoding="utf-8")
        results.append(translated)
        print("ok", flush=True)
    return "".join(results)


def _llm_translate_scalar(client, value, label: str, model: str):
    """Translate a string or list-of-strings YAML value via LLM."""
    if isinstance(value, list):
        return [_llm_translate_scalar(client, v, label, model) for v in value]
    if not isinstance(value, str) or not value.strip():
        return value
    return _llm_translate(client, value, label, model)


# ---------------------------------------------------------------------------
# DeepL backend
# ---------------------------------------------------------------------------

def _deepl_translate_scalar(translator, value, target_lang: str):
    """Translate a string or list-of-strings YAML value via DeepL."""
    if isinstance(value, list):
        return [_deepl_translate_scalar(translator, v, target_lang) for v in value]
    if not isinstance(value, str) or not value.strip():
        return value
    return translator.translate_text(value, target_lang=target_lang).text


# ---------------------------------------------------------------------------
# Core translate_paper — dispatches to the right backend
# ---------------------------------------------------------------------------

def translate_paper(paper_name: str, lang_code: str, backend: str,
                    client=None, model: str = "gpt-4o") -> None:
    info     = LANG_MAP[lang_code]
    src_path = PAPER_DIR / f"{paper_name}.md"
    if not src_path.exists():
        src_path = BLD_DIR / f"{paper_name}.md"   # fallback for assembled files (e.g. omnibus-body)
    out_path = BLD_DIR   / f"{paper_name}.{lang_code}.md"

    if not src_path.exists():
        print(f"  SKIP  {paper_name}: source not found", file=sys.stderr)
        return

    print(f"  {paper_name}  →  {info['label']} [{backend}] ...", end=" ", flush=True)

    raw      = src_path.read_text(encoding="utf-8")
    fm, body = split_frontmatter(raw)

    # --- Translate selected frontmatter fields ---
    for field in TRANSLATE_FM_FIELDS:
        if field not in fm:
            continue
        if backend == "deepl":
            fm[field] = _deepl_translate_scalar(client, fm[field], info["deepl"])
        else:
            fm[field] = _llm_translate_scalar(client, fm[field], info["label"], model)
    fm["lang"] = info["pandoc"]

    # --- Translate body with protected placeholders ---
    protector      = Protector()
    protected_body = protector.protect(body)

    if backend == "deepl":
        result         = client.translate_text(
            protected_body,
            target_lang         = info["deepl"],
            split_sentences     = "nonewlines",
            preserve_formatting = True,
        )
        translated_body = protector.restore(result.text)
    else:
        _cache_dir = BLD_DIR / ".chunk_cache"
        _cache_key = f"{paper_name}.{lang_code}"
        translated_body = protector.restore(
            _llm_translate_chunked(client, protected_body, info["label"], model,
                                   cache_key=_cache_key, cache_dir=_cache_dir)
        )

    BLD_DIR.mkdir(exist_ok=True)
    out_path.write_text(render_frontmatter(fm) + translated_body, encoding="utf-8")
    print(f"done  →  {out_path.relative_to(REPO_ROOT)}")


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Translate Soma-Field papers to DE/FR/IT.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "papers", nargs="*",
        help="Paper names without .md extension.  Defaults to all.",
    )
    parser.add_argument(
        "--langs", nargs="+", default=["de", "fr", "it"],
        choices=list(LANG_MAP.keys()), metavar="LANG",
        help="Target languages (default: de fr it).",
    )
    parser.add_argument(
        "--backend", choices=["llm", "deepl"], default="llm",
        help="Translation backend (default: llm).",
    )
    parser.add_argument(
        "--model", default="gpt-4o",
        help="LLM model name (default: gpt-4o).  Ignored for --backend deepl.",
    )
    args   = parser.parse_args()
    papers = args.papers if args.papers else ALL_PAPERS

    # --- Initialise the chosen backend client ---
    if args.backend == "deepl":
        try:
            import deepl as _deepl
        except ImportError:
            print("Error: deepl not installed.  Run: pip install deepl", file=sys.stderr)
            sys.exit(1)
        api_key = os.environ.get("DEEPL_API_KEY")
        if not api_key:
            print("Error: DEEPL_API_KEY not set.  Add it to paper/.keys.local", file=sys.stderr)
            sys.exit(1)
        client = _deepl.Translator(api_key)
        usage  = client.get_usage()
        print(
            f"DeepL usage: {usage.character.count:,} / {usage.character.limit:,} chars "
            f"({usage.character.count / usage.character.limit * 100:.1f}%)"
        )
    else:  # llm
        try:
            import openai as _openai
        except ImportError:
            print("Error: openai not installed.  Run: pip install openai", file=sys.stderr)
            sys.exit(1)
        api_key  = os.environ.get("OPENAI_API_KEY")
        base_url = os.environ.get("OPENAI_BASE_URL")  # optional — GitHub Models etc.
        if not api_key:
            print("Error: OPENAI_API_KEY not set.  Add it to paper/.keys.local", file=sys.stderr)
            sys.exit(1)
        kwargs = {"api_key": api_key}
        if base_url:
            kwargs["base_url"] = base_url
        client = _openai.OpenAI(**kwargs)
        print(f"LLM backend: {args.model}" + (f"  (base: {base_url})" if base_url else ""))

    print()

    for paper in papers:
        for lang in args.langs:
            translate_paper(paper, lang, args.backend, client, args.model)

    print()
    print("Done.  Run 'make translations' in paper/ to build PDFs.")


if __name__ == "__main__":
    main()
