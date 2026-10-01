#!/usr/bin/env python3
"""Automated NotebookLM UAT for a staged release track.

Creates a fresh private notebook, uploads every file in uat/staging/<track>/,
asks each worksheet item separately (re-verifying, ignoring any status already
recorded in the worksheet), and writes a review report to uat/results/.
Nothing in the worksheets is changed: a human transfers accepted findings.

Runs with the MOTHER environment (notebooklm-py, unofficial; your own login):

    apps\\instrument\\mother\\.venv\\Scripts\\python uat\\scripts\\nlm_uat.py papers
    ... nlm_uat.py ttheory --items TS-1,TH-2
    ... nlm_uat.py papers --notebook <id>      # reuse an uploaded notebook
"""
from __future__ import annotations

import argparse
import asyncio
import datetime as dt
import json
import re
import sys
from pathlib import Path

from notebooklm import NotebookLMClient

UAT = Path(__file__).resolve().parents[1]
WORKSHEETS = {"papers": "papers-omnibus-nlm-uat.md", "ttheory": "ttheory-nlm-uat.md"}
ITEM = re.compile(r"^###\s+([A-Z]{1,3}-\d+[a-z]?)\s+(.*?)\s*$", re.M)
QUESTION = re.compile(r"\*\*Question:\*\*\s*(.+?)(?=\n\s*\n\*\*|\n###|\n##|\Z)", re.S)
STATUS = re.compile(r"\b(PASS|FIX|OPEN)\b")

FORMAT = (
    "Use exactly this format: ITEM, STATUS (PASS/FIX/OPEN), FINDING, EVIDENCE "
    "(exact source PDF filename and page number). Ignore any status, result, or "
    "evidence already recorded in the worksheet: re-verify against the PDFs. "
    "Apply the worksheet's Evidence Rules. A finding without an exact source and "
    "page is OPEN."
)


def worksheet_items(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    matches = list(ITEM.finditer(text))
    items = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        question = QUESTION.search(text[match.end():end])
        if question:
            items.append({"id": match.group(1), "title": match.group(2), "question": " ".join(question.group(1).split())})
    return items


async def upload(client, notebook_id: str, folder: Path) -> None:
    source_ids = []
    for path in sorted(p for p in folder.iterdir() if p.is_file()):
        print(f"upload {path.name}", flush=True)
        if path.suffix.lower() in {".md", ".txt", ".yaml", ".json"}:
            source = await client.sources.add_text(notebook_id, path.name, path.read_text(encoding="utf-8"))
        else:
            source = await client.sources.add_file(notebook_id, path, title=path.name)
        source_ids.append(source.id)
    print(f"waiting for {len(source_ids)} sources to be processed...", flush=True)
    await client.sources.wait_for_sources(notebook_id, source_ids, timeout=900)


async def run(track: str, notebook_id: str | None, only: set[str] | None) -> Path:
    folder = UAT / "staging" / track
    worksheet = folder / WORKSHEETS[track]
    if not worksheet.exists():
        raise SystemExit(f"{worksheet} missing: run make uat-stage-{track} first")
    items = [item for item in worksheet_items(worksheet) if not only or item["id"] in only]
    if not items:
        raise SystemExit("no worksheet items matched")
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M")
    results = []
    async with NotebookLMClient.from_storage() as client:
        if notebook_id is None:
            notebook = await client.notebooks.create(f"UAT {track} {stamp} (private)")
            notebook_id = notebook.id
            print(f"notebook {notebook_id}", flush=True)
            await upload(client, notebook_id, folder)
        titles = {source.id: getattr(source, "title", None) or source.id for source in await client.sources.list(notebook_id)}
        for item in items:
            prompt = f"Execute worksheet item {item['id']} ({item['title']}) from {worksheet.name}.\nQuestion: {item['question']}\n{FORMAT}"
            print(f"ask {item['id']}", flush=True)
            try:
                answer = await client.chat.ask(notebook_id, prompt)
                cited = sorted({titles.get(ref.source_id, ref.source_id) for ref in answer.references})
                found = STATUS.search(answer.answer)
                results.append({**item, "status": found.group(1) if found else "UNCLEAR", "answer": answer.answer, "cited": cited})
            except Exception as error:  # keep going; record the failure
                results.append({**item, "status": "ERROR", "answer": f"{type(error).__name__}: {error}", "cited": []})

    out = UAT / "results"
    out.mkdir(exist_ok=True)
    report = out / f"{track}-{stamp}.md"
    counts = {s: sum(r["status"] == s for r in results) for s in ("PASS", "FIX", "OPEN", "UNCLEAR", "ERROR")}
    summary = ", ".join(f"{k} {v}" for k, v in counts.items() if v)
    lines = [
        f"# NotebookLM UAT: {track} ({stamp})",
        "",
        f"Notebook `{notebook_id}` (private). Worksheet `{worksheet.name}`. Sources: every file in `uat/staging/{track}/`.",
        "Automated run (`uat/scripts/nlm_uat.py`); review before transferring findings to the worksheet.",
        "",
        "| Item | Title | Status | Cited sources |",
        "|---|---|---|---|",
        *[f"| {r['id']} | {r['title']} | {r['status']} | {', '.join(r['cited']) or '-'} |" for r in results],
        "",
        f"Totals: {summary}",
        "",
    ]
    for r in results:
        lines += [f"## {r['id']} {r['title']} ({r['status']})", "", f"**Question:** {r['question']}", "", r["answer"].strip(), ""]
    text = "\n".join(lines)
    text = re.sub(r"[ \t]+$", "", text, flags=re.M)  # NotebookLM uses trailing-space line breaks
    report.write_text(text, encoding="utf-8", newline="\n")
    report.with_suffix(".json").write_text(json.dumps({"notebook": notebook_id, "results": results}, indent=2, ensure_ascii=False), encoding="utf-8", newline="\n")
    print(f"report {report}  ({summary})")
    return report


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("track", choices=sorted(WORKSHEETS))
    parser.add_argument("--notebook", help="reuse an existing notebook id (skip upload)")
    parser.add_argument("--items", help="comma-separated item ids, e.g. S-1,H-2")
    parser.add_argument("--list", action="store_true", help="list the worksheet items and exit")
    args = parser.parse_args()
    if args.list:
        for item in worksheet_items(UAT / "staging" / args.track / WORKSHEETS[args.track]):
            print(f"{item['id']:6} {item['title']}: {item['question'][:90]}")
        return
    asyncio.run(run(args.track, args.notebook, set(args.items.split(",")) if args.items else None))


if __name__ == "__main__":
    main()
