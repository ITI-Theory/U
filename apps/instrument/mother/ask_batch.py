#!/usr/bin/env python3
"""Ask a list of survey questions to a NotebookLM notebook and record the answers.

Reads the numbered questions (the quoted text of each item) under a heading of a
Markdown file, asks them one at a time with a pause between them, and writes each
answer with its cited sources under the file's results heading. Only sources whose
title looks like a PDF are queried, so the question file itself is never cited.
Uses the MOTHER bridge's NotebookLM login (run `.venv\\Scripts\\notebooklm login`
first if it has expired).

    .venv\\Scripts\\python.exe ask_batch.py ..\\..\\..\\docs\\agent\\OPENSTAX-SURVEY.md --notebook openstax-maths
"""
from __future__ import annotations

import argparse
import asyncio
import re
from pathlib import Path

from notebooklm import NotebookLMClient
from notebooklm.exceptions import RateLimitError

QUESTION = re.compile(r'^\d+\.\s+\*\*(?P<label>[^*]+)\*\*\s+"(?P<text>.+?)"\s*$', re.S)


def questions(markdown: str, heading: str) -> list[tuple[str, str]]:
    section = markdown.split(heading, 1)[1].split("\n## ", 1)[0]
    items = re.split(r"\n(?=\d+\.\s)", "\n" + section)
    found = []
    for item in items:
        item = item.strip().split("\n\n", 1)[0]  # an item ends at the first blank line
        match = QUESTION.match(" ".join(item.split()))
        if match:
            found.append((match["label"].rstrip(". "), match["text"]))
    return found


async def run(path: Path, title: str, heading: str, results: str, pause: float) -> None:
    text = path.read_text(encoding="utf-8")
    asked = questions(text, heading)
    if not asked:
        raise SystemExit(f"no questions found under {heading!r}")
    async with NotebookLMClient.from_storage() as client:
        notebook = next((n for n in await client.notebooks.list() if (n.title or "").strip().lower() == title.lower()), None)
        if notebook is None:
            raise SystemExit(f"no notebook titled {title!r}")
        sources = await client.sources.list(notebook.id)
        titles = {s.id: getattr(s, "title", None) or s.id for s in sources}
        pdfs = [s.id for s in sources if str(titles[s.id]).lower().endswith(".pdf")]
        print(f"notebook {notebook.id}: {len(sources)} sources, {len(pdfs)} PDFs queried")
        if not pdfs:
            raise SystemExit("no PDF sources yet (still uploading?)")
        out = [f"{results}\n", f"Asked {len(asked)} questions of `{title}` ({len(pdfs)} PDF sources) by `apps/instrument/mother/ask_batch.py`.\n"]
        for number, (label, question) in enumerate(asked, 1):
            prompt = question + " Answer only from the uploaded books, and cite book, section and page."
            for attempt in range(3):
                try:
                    result = await client.chat.ask(notebook.id, prompt, source_ids=pdfs)
                    break
                except RateLimitError:
                    raise SystemExit(f"quota reached at question {number}; answers so far are not saved")
                except Exception as error:  # flaky internal API: wait and retry
                    print(f"  retry {attempt + 1} after {type(error).__name__}")
                    await asyncio.sleep(10)
            else:
                raise SystemExit(f"question {number} failed three times")
            cited = []
            for reference in result.references:
                name = titles.get(reference.source_id, reference.source_id)
                if name not in cited:
                    cited.append(name)
            out.append(f"\n### {number}. {label}\n\n{result.answer.strip()}\n\nSources cited: {', '.join(cited) or 'none returned as links; the answer cites book, section and page inline'}.\n")
            print(f"{number:2d}/{len(asked)} {label}: {len(result.answer)} chars, {len(cited)} sources")
            if number < len(asked):
                await asyncio.sleep(pause)
    head = text.split(results, 1)[0]
    path.write_text(head + "".join(out), encoding="utf-8", newline="\n")
    print(f"wrote {len(asked)} answers to {path}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("file", type=Path)
    parser.add_argument("--notebook", required=True, help="notebook title")
    parser.add_argument("--heading", default="## NotebookLM survey")
    parser.add_argument("--results", default="## Survey results")
    parser.add_argument("--pause", type=float, default=30, help="seconds between questions")
    args = parser.parse_args()
    asyncio.run(run(args.file, args.notebook, args.heading, args.results, args.pause))


if __name__ == "__main__":
    main()
