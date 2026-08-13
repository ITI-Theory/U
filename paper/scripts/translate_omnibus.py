#!/usr/bin/env python3
"""
translate_omnibus.py — Translate omnibus-body-plus.md into DE, IT, FR.

Build step: run after build_omnibus.py generates omnibus-body-plus.md.
Output: paper/bld/omnibus-body-plus.{de,it,fr}.md

Usage:
    python paper/scripts/translate_omnibus.py

Requires:
    pip install anthropic
    ANTHROPIC_API_KEY set in environment

Chunk cache: paper/bld/.chunk_cache/  (safe to delete; allows resume after interruption)
"""
import os, re, sys
from pathlib import Path

# ── config ───────────────────────────────────────────────────────────────────
SCRIPTS = Path(__file__).parent
U_ROOT  = SCRIPTS.parent.parent
SOURCE  = U_ROOT / "paper" / "bld" / "omnibus-body-plus.md"

MODEL  = "claude-opus-4-7"
LANGS  = [
    ("de", "German"),
    ("it", "Italian"),
    ("fr", "French"),
]
MAX_CHUNK_CHARS = 60_000

SYSTEM = """\
You are a professional academic translator specialising in psychology, \
neuroscience, and somatic therapy. Translate the following English text to {label}.

Rules — follow exactly:
1. Preserve all markdown formatting: # headings, **bold**, *italic*, tables, \
bullet lists, numbered lists, YAML frontmatter.
2. Tokens of the form XPROTnXPROT are protected placeholders — copy them \
verbatim, do NOT translate or alter them in any way.
3. Maintain an academic register. Keep technical terms (e.g. "Soma-Field", \
"biotensegrity", "Hopfield network", "soma-field") in their established {label} \
usage or leave untranslated if no standard equivalent exists.
4. Return ONLY the translated text. No preamble, no explanations.\
"""

# ── placeholder protection ────────────────────────────────────────────────────
_PATTERNS = [
    re.compile(r"```[\s\S]*?```"),
    re.compile(r"`[^`\n]+`"),
    re.compile(r"\$\$[\s\S]*?\$\$"),
    re.compile(r"\$[^\$\n]+\$"),
    re.compile(r"\[@[^\]]*\]"),
    re.compile(r"\{[#\.][^}]*\}"),
    re.compile(r"<!--[\s\S]*?-->"),
    re.compile(r"\\\w+"),
]
_TOK = re.compile(r"XPROT(\d+)XPROT")

def protect(text):
    store = []
    for pat in _PATTERNS:
        def _sub(m, s=store):
            s.append(m.group(0)); return f"XPROT{len(s)-1}XPROT"
        text = pat.sub(_sub, text)
    return text, store

def restore(text, store):
    return _TOK.sub(lambda m: store[int(m.group(1))], text)

# ── chunking ──────────────────────────────────────────────────────────────────
def split_chunks(text, max_chars=MAX_CHUNK_CHARS):
    parts = re.split(r'(?=\n#{1,4} )', text)
    chunks, cur = [], ""
    for p in parts:
        if len(cur) + len(p) > max_chars and cur:
            chunks.append(cur); cur = p
        else:
            cur += p
    if cur: chunks.append(cur)
    return chunks or [text]

# ── translation ───────────────────────────────────────────────────────────────
def translate_file(client, src_text, lang_code, label):
    protected, store = protect(src_text)
    chunks = split_chunks(protected)
    cache_dir = SOURCE.parent / ".chunk_cache"
    cache_dir.mkdir(exist_ok=True)

    results = []
    for i, chunk in enumerate(chunks, 1):
        cache_file = cache_dir / f"omnibus-body-plus.{lang_code}.{i:03d}.txt"
        if cache_file.exists():
            print(f"  chunk {i}/{len(chunks)} — cached", flush=True)
            results.append(cache_file.read_text(encoding="utf-8"))
            continue
        print(f"  chunk {i}/{len(chunks)} ({len(chunk):,} chars)...", end=" ", flush=True)
        msg = client.messages.create(
            model=MODEL, max_tokens=8192, temperature=0.2,
            system=SYSTEM.format(label=label),
            messages=[{"role": "user", "content": chunk}],
        )
        translated = msg.content[0].text
        cache_file.write_text(translated, encoding="utf-8")
        results.append(translated)
        print("ok", flush=True)

    return restore("".join(results), store)

# ── main ──────────────────────────────────────────────────────────────────────
def main():
    try:
        import anthropic
    except ImportError:
        print("Error: run:  pip install anthropic", file=sys.stderr); sys.exit(1)

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("Error: set ANTHROPIC_API_KEY", file=sys.stderr); sys.exit(1)

    if not SOURCE.exists():
        print(f"Error: source not found: {SOURCE}", file=sys.stderr)
        print("Run build_omnibus.py first to generate omnibus-body-plus.md")
        sys.exit(1)

    client   = anthropic.Anthropic(api_key=api_key)
    src_text = SOURCE.read_text(encoding="utf-8")
    print(f"Source: {SOURCE}  ({len(src_text):,} chars)")
    print(f"Model:  {MODEL}\n")

    for lang_code, label in LANGS:
        out_path = SOURCE.parent / f"omnibus-body-plus.{lang_code}.md"
        if out_path.exists():
            print(f"[{lang_code}] already exists — skipping (delete to re-translate)")
            continue
        print(f"[{lang_code}] Translating to {label}...")
        translated = translate_file(client, src_text, lang_code, label)
        out_path.write_text(translated, encoding="utf-8")
        print(f"[{lang_code}] Written: {out_path.name}\n")

    print("Done.")

if __name__ == "__main__":
    main()
