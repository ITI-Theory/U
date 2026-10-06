#!/usr/bin/env python3
"""Automated NotebookLM UAT for a staged release track.

Uploads every file in uat/staging/<track>/ to a private notebook, asks each
worksheet item separately (re-verifying, ignoring any status already recorded
in the worksheet), and writes a review report to uat/results/. Nothing in the
worksheets is changed: a human transfers accepted findings.

Each track has a standing UAT notebook (NOTEBOOKS). `--replace` deletes its
old sources, uploads the current staging folder and renames it to the run's
date, so no new notebook is needed per run. It refuses any notebook whose
title does not start with "UAT ", so MOTHER or H-AL can never be wiped.

Runs with the MOTHER environment (notebooklm-py, unofficial; your own login;
`make uat-nlm` from U/ is the usual way in):

    apps\\instrument\\mother\\.venv\\Scripts\\python uat\\scripts\\nlm_uat.py papers --replace -n   # dry run
    ... nlm_uat.py papers --replace            # swap sources, then ask
    ... nlm_uat.py ttheory --items TS-1,TH-2   # ask only (sources as they are)
    ... nlm_uat.py papers --new                # create a fresh notebook instead

NotebookLM has a per-account daily chat quota (shared with MOTHER); the
script pauses between questions (--pause, default 45 s).
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
# Standing private UAT notebooks (created by this script on 2026-10-01).
NOTEBOOKS = {
    "papers": "f6189d45-2a9f-4dbc-8214-e09cfbdcf246",
    "ttheory": "f9c01519-a563-4644-be82-f02d5fe891f8",
}
UAT_TITLE = "UAT "
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


def staged(folder: Path) -> list[Path]:
    return sorted(p for p in folder.iterdir() if p.is_file())


async def dry_run(track: str, notebook_id: str, folder: Path, items: list[dict], replace: bool) -> None:
    files = staged(folder)
    print(f"DRY RUN: nothing is deleted, uploaded or asked.\nnotebook {notebook_id} ({track})")
    try:
        async with NotebookLMClient.from_storage() as client:
            notebook = await client.notebooks.get(notebook_id)
            sources = await client.sources.list(notebook_id)
        print(f"  title: {notebook.title!r}")
        if replace and not (notebook.title or "").startswith(UAT_TITLE):
            print(f"  WOULD REFUSE: title does not start with {UAT_TITLE!r}")
        verb = "would delete" if replace else "keeps"
        print(f"  {verb} {len(sources)} source(s):")
        for source in sources:
            print(f"    - {getattr(source, 'title', None) or source.id}")
    except Exception as error:  # usually an expired login
        print(f"  cannot read the notebook ({type(error).__name__}); log in first:\n"
              "    apps\\instrument\\mother\\.venv\\Scripts\\notebooklm login")
    if replace:
        size = sum(p.stat().st_size for p in files) / 1e6
        print(f"  would upload {len(files)} file(s), {size:.1f} MB, from uat/staging/{track}/:")
        for path in files:
            print(f"    + {path.name}")
    print(f"  would ask {len(items)} item(s): {', '.join(i['id'] for i in items)}")


async def replace_sources(client, notebook_id: str, folder: Path, track: str, stamp: str) -> None:
    notebook = await client.notebooks.get(notebook_id)
    if not (notebook.title or "").startswith(UAT_TITLE):
        raise SystemExit(f"refusing to replace sources in {notebook.title!r}: not a UAT notebook")
    old = [source.id for source in await client.sources.list(notebook_id)]
    print(f"notebook {notebook_id} {notebook.title!r}: deleting {len(old)} old source(s)", flush=True)
    await client.sources.delete_many(notebook_id, old)
    await upload(client, notebook_id, folder)
    await client.notebooks.rename(notebook_id, f"{UAT_TITLE}{track} {stamp} (private)")


async def upload(client, notebook_id: str, folder: Path) -> None:
    source_ids = []
    for path in staged(folder):
        print(f"upload {path.name}", flush=True)
        if path.suffix.lower() in {".md", ".txt", ".yaml", ".json"}:
            source = await client.sources.add_text(notebook_id, path.name, path.read_text(encoding="utf-8"))
        else:
            source = await client.sources.add_file(notebook_id, path, title=path.name)
        source_ids.append(source.id)
    print(f"waiting for {len(source_ids)} sources to be processed...", flush=True)
    await client.sources.wait_for_sources(notebook_id, source_ids, timeout=900)


async def run(track: str, notebook_id: str | None, only: set[str] | None, pause: float = 45.0,
              replace: bool = False, new: bool = False, dry: bool = False) -> Path | None:
    folder = UAT / "staging" / track
    worksheet = folder / WORKSHEETS[track]
    if not worksheet.exists():
        raise SystemExit(f"{worksheet} missing: run make uat-stage-{track} first")
    items = [item for item in worksheet_items(worksheet) if not only or item["id"] in only]
    if not items:
        raise SystemExit("no worksheet items matched")
    if not new and notebook_id is None:
        notebook_id = NOTEBOOKS[track]
    if dry:
        if new:
            print(f"DRY RUN: would create a new notebook and upload {len(staged(folder))} file(s); "
                  f"would ask {len(items)} item(s)")
        else:
            await dry_run(track, notebook_id, folder, items, replace)
        return None
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M")
    results = []
    async with NotebookLMClient.from_storage() as client:
        if new:
            notebook = await client.notebooks.create(f"{UAT_TITLE}{track} {stamp} (private)")
            notebook_id = notebook.id
            print(f"notebook {notebook_id}", flush=True)
            await upload(client, notebook_id, folder)
        elif replace:
            await replace_sources(client, notebook_id, folder, track, stamp)
        titles = {source.id: getattr(source, "title", None) or source.id for source in await client.sources.list(notebook_id)}
        for index, item in enumerate(items):
            if index:
                await asyncio.sleep(pause)  # pace like a person: the chat quota is per account
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
    parser.add_argument("--notebook", help="notebook id (default: the track's standing UAT notebook)")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--replace", action="store_true", help="delete the notebook's sources and upload uat/staging/<track>/")
    mode.add_argument("--new", action="store_true", help="create a fresh notebook and upload")
    parser.add_argument("-n", "--dry-run", action="store_true", help="show what would be deleted, uploaded and asked")
    parser.add_argument("--items", help="comma-separated item ids, e.g. S-1,H-2")
    parser.add_argument("--list", action="store_true", help="list the worksheet items and exit")
    parser.add_argument("--pause", type=float, default=45.0, help="seconds between questions (default 45)")
    args = parser.parse_args()
    if args.list:
        for item in worksheet_items(UAT / "staging" / args.track / WORKSHEETS[args.track]):
            print(f"{item['id']:6} {item['title']}: {item['question'][:90]}")
        return
    only = set(args.items.split(",")) if args.items else None
    asyncio.run(run(args.track, args.notebook, only, args.pause, args.replace, args.new, args.dry_run))


if __name__ == "__main__":
    main()
