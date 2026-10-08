#!/usr/bin/env python3
"""Automated NotebookLM UAT for a staged release track.

Uploads every file in uat/staging/<track>/ to a private notebook, asks each
worksheet item separately (re-verifying, ignoring any status already recorded
in the worksheet), and writes a review report to uat/results/. Nothing in the
worksheets is changed: a human transfers accepted findings.

Each track has a standing UAT notebook (NOTEBOOKS) holding two versions, so the
question "is the new one better?" can be asked. Staged files carry their version
(`omnibus-a4.rc3.1.pdf`; set in uat/manifest.yaml, git ref in MANIFEST.md).
`--replace` uploads the staged version, keeps the previous version, deletes
anything older (and an earlier upload of the same version), labels untagged
old sources as the version before, and renames the notebook to the version
and git ref. The worksheet is asked of the new version only; a final CMP item
compares the two. It refuses any notebook whose title does not start with
"UAT ", so MOTHER or H-AL can never be wiped.

Runs with the MOTHER environment (notebooklm-py, unofficial; your own login;
`make uat-nlm` from U/ is the usual way in):

    apps\\instrument\\mother\\.venv\\Scripts\\python uat\\scripts\\nlm_uat.py papers --replace -n   # dry run
    ... nlm_uat.py papers --replace            # upload this version (keep the previous), then ask
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
SOURCE_LIMIT = 50  # NotebookLM sources per notebook
# Previous-version sources kept for the comparison when a full second copy would
# not fit (by name without version); the papers omnibus contains every paper.
COMPARE_KEEP = {"papers": {"omnibus-a4.pdf", "lean-proofs-appendix.pdf", "MANIFEST.md"}}
TAG = re.compile(r"\.(rc\d+\.\d+)(?=\.[A-Za-z0-9]+$)")  # omnibus-a4.rc3.1.pdf
STAGED = re.compile(r"^Version: (rc\d+\.\d+) \(U ([0-9a-f]+(?:-dirty)?)", re.M)
VERDICT = re.compile(r"\b(BETTER|SAME|WORSE)\b")
COMPARE = (
    "Two versions of this release candidate are loaded; every source title ends with its "
    "version: {old} (previous) and {new} (new). Using the questions in {worksheet}, is {new} "
    "BETTER, the SAME or WORSE than {old}? For each worksheet area, give the concrete "
    "differences, citing the exact filename (with version) and page on both sides. End with "
    "one line: VERDICT: BETTER, SAME or WORSE."
)
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


def parse_version(text: str) -> tuple[int, int]:
    match = re.fullmatch(r"rc(\d+)\.(\d+)", text)
    if not match:
        raise SystemExit(f"bad version {text!r}: expected rcN.M")
    return int(match.group(1)), int(match.group(2))


def source_version(title: str) -> str | None:
    match = TAG.search(title or "")
    return match.group(1) if match else None


def versioned(name: str, version: str) -> str:
    if source_version(name):
        return name
    path = Path(name)
    return f"{path.stem}.{version}{path.suffix}"


def staging_version(folder: Path) -> tuple[str, str]:
    manifest = folder / "MANIFEST.md"
    match = STAGED.search(manifest.read_text(encoding="utf-8")) if manifest.exists() else None
    if not match:
        raise SystemExit(f"{manifest} has no Version line: restage with make uat-stage-<track>")
    return match.group(1), match.group(2)


def legacy_label(version: str) -> str:
    major, minor = parse_version(version)
    return f"rc{major}.{minor - 1}" if minor else f"rc{major - 1}.0"


def base_name(title: str) -> str:
    version = source_version(title)
    return title.replace(f".{version}.", ".") if version else title


def plan(sources: list, version: str, keep_only: set[str] | None = None) -> dict:
    """Which sources to relabel, keep (the previous version) and delete."""
    legacy = legacy_label(version)
    current = parse_version(version)
    relabel, tagged = [], []
    for source in sources:
        title = getattr(source, "title", None) or source.id
        tag = source_version(title)
        if tag is None:
            relabel.append((source, versioned(title, legacy)))
            tag = legacy
        tagged.append((source, tag))
    older = sorted({tag for _, tag in tagged if parse_version(tag) < current}, key=parse_version)
    previous = older[-1] if older else None
    keep = [s for s, tag in tagged if tag == previous
            and (not keep_only or base_name(title_of(s)) in keep_only)]
    delete = [s for s, _ in tagged if s not in keep]  # same version (re-upload), anything older, trimmed
    relabel = [(s, title) for s, title in relabel if s in keep]
    return {"previous": previous, "relabel": relabel, "keep": keep, "delete": delete}


def title_of(source) -> str:
    return getattr(source, "title", None) or source.id


async def dry_run(track: str, notebook_id: str, folder: Path, items: list[dict], replace: bool, version: str, ref: str) -> None:
    files = staged(folder)
    print(f"DRY RUN: nothing is relabelled, deleted, uploaded or asked.\nnotebook {notebook_id} ({track}); staging {version} (U {ref})")
    previous = None
    try:
        async with NotebookLMClient.from_storage() as client:
            notebook = await client.notebooks.get(notebook_id)
            sources = await client.sources.list(notebook_id)
        print(f"  title: {notebook.title!r}")
        if replace and not (notebook.title or "").startswith(UAT_TITLE):
            print(f"  WOULD REFUSE: title does not start with {UAT_TITLE!r}")
        steps = plan(sources, version, COMPARE_KEEP.get(track))
        previous = steps["previous"]
        total = len(steps["keep"]) + len(files)
        print(f"  sources after the run: {total} of {SOURCE_LIMIT}" + ("  WOULD REFUSE: over the limit" if total > SOURCE_LIMIT else ""))
        if replace:
            for source, new_title in steps["relabel"]:
                print(f"    ~ {title_of(source)} -> {new_title}")
            print(f"  would keep {len(steps['keep'])} source(s) of the previous version {previous or '(none)'}")
            print(f"  would delete {len(steps['delete'])} source(s):")
            for source in steps["delete"]:
                print(f"    - {title_of(source)}")
        else:
            print(f"  keeps all {len(sources)} source(s)")
    except Exception as error:  # usually an expired login
        print(f"  cannot read the notebook ({type(error).__name__}); log in first:\n"
              "    ~/prj/git/ITI-Theory/U/apps/instrument/mother/.venv/Scripts/notebooklm login")
    if replace:
        size = sum(p.stat().st_size for p in files) / 1e6
        print(f"  would upload {len(files)} file(s) as {version}, {size:.1f} MB, from uat/staging/{track}/:")
        for path in files:
            print(f"    + {versioned(path.name, version)}")
    compare = f" + CMP ({version} against {previous})" if previous else ""
    print(f"  would ask {len(items)} item(s) of {version}: {', '.join(i['id'] for i in items)}{compare}")


async def replace_sources(client, notebook_id: str, folder: Path, track: str, version: str, ref: str) -> str | None:
    notebook = await client.notebooks.get(notebook_id)
    if not (notebook.title or "").startswith(UAT_TITLE):
        raise SystemExit(f"refusing to replace sources in {notebook.title!r}: not a UAT notebook")
    steps = plan(await client.sources.list(notebook_id), version, COMPARE_KEEP.get(track))
    total = len(steps["keep"]) + len(staged(folder))
    if total > SOURCE_LIMIT:
        raise SystemExit(f"would need {total} sources (limit {SOURCE_LIMIT}): extend COMPARE_KEEP trimming")
    for source, new_title in steps["relabel"]:
        await client.sources.rename(notebook_id, source.id, new_title)
    print(f"notebook {notebook_id} {notebook.title!r}: keeping {len(steps['keep'])} source(s) of "
          f"{steps['previous'] or '(none)'}, deleting {len(steps['delete'])}", flush=True)
    await client.sources.delete_many(notebook_id, [s.id for s in steps["delete"]])
    await upload(client, notebook_id, folder, version)
    await client.notebooks.rename(notebook_id, f"{UAT_TITLE}{track} {version} (U {ref})")
    return steps["previous"]


async def upload(client, notebook_id: str, folder: Path, version: str) -> None:
    source_ids = []
    for path in staged(folder):
        title = versioned(path.name, version)
        print(f"upload {title}", flush=True)
        if path.suffix.lower() in {".md", ".txt", ".yaml", ".json"}:
            source = await client.sources.add_text(notebook_id, title, path.read_text(encoding="utf-8"))
        else:
            source = await client.sources.add_file(notebook_id, path, title=title)
        source_ids.append(source.id)
    print(f"waiting for {len(source_ids)} sources to be processed...", flush=True)
    await client.sources.wait_for_sources(notebook_id, source_ids, timeout=900)


async def ask(client, notebook_id: str, prompt: str, source_ids: list[str], titles: dict) -> dict:
    try:
        answer = await client.chat.ask(notebook_id, prompt, source_ids=source_ids)
        cited = sorted({titles.get(ref.source_id, ref.source_id) for ref in answer.references})
        return {"answer": answer.answer, "cited": cited}
    except Exception as error:  # keep going; record the failure
        return {"answer": f"{type(error).__name__}: {error}", "cited": [], "error": True}


async def run(track: str, notebook_id: str | None, only: set[str] | None, pause: float = 45.0,
              replace: bool = False, new: bool = False, dry: bool = False) -> Path | None:
    folder = UAT / "staging" / track
    version, ref = staging_version(folder)
    worksheet = folder / versioned(WORKSHEETS[track], version)
    if not worksheet.exists():
        raise SystemExit(f"{worksheet} missing: run make uat-stage-{track} first")
    items = [item for item in worksheet_items(worksheet) if not only or item["id"] in only]
    if not items:
        raise SystemExit("no worksheet items matched")
    if not new and notebook_id is None:
        notebook_id = NOTEBOOKS[track]
    if dry:
        if new:
            print(f"DRY RUN: would create a new notebook and upload {len(staged(folder))} file(s) as {version}; "
                  f"would ask {len(items)} item(s)")
        else:
            await dry_run(track, notebook_id, folder, items, replace, version, ref)
        return None
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M")
    previous = None
    results = []
    async with NotebookLMClient.from_storage() as client:
        if new:
            notebook = await client.notebooks.create(f"{UAT_TITLE}{track} {version} (U {ref})")
            notebook_id = notebook.id
            print(f"notebook {notebook_id}", flush=True)
            await upload(client, notebook_id, folder, version)
        elif replace:
            previous = await replace_sources(client, notebook_id, folder, track, version, ref)
        else:
            previous = plan(await client.sources.list(notebook_id), version, COMPARE_KEEP.get(track))["previous"]
        sources = await client.sources.list(notebook_id)
        titles = {s.id: title_of(s) for s in sources}
        current_ids = [s.id for s in sources if source_version(title_of(s)) == version]
        if not current_ids:
            raise SystemExit(f"no {version} sources in the notebook: run with --replace")
        both_ids = [s.id for s in sources if source_version(title_of(s)) in {version, previous}]
        kept = sorted(title_of(s) for s in sources if source_version(title_of(s)) == previous)
        scope = (f"Use only the {version} sources (every source title ends with its version, "
                 f"e.g. omnibus-a4.{version}.pdf).")
        for index, item in enumerate(items):
            if index:
                await asyncio.sleep(pause)  # pace like a person: the chat quota is per account
            prompt = (f"Execute worksheet item {item['id']} ({item['title']}) from {worksheet.name}.\n"
                      f"{scope}\nQuestion: {item['question']}\n{FORMAT}")
            print(f"ask {item['id']}", flush=True)
            reply = await ask(client, notebook_id, prompt, current_ids, titles)
            found = STATUS.search(reply["answer"])
            status = "ERROR" if reply.get("error") else (found.group(1) if found else "UNCLEAR")
            results.append({**item, "status": status, **{k: reply[k] for k in ("answer", "cited")}})
        if previous:
            await asyncio.sleep(pause)
            print("ask CMP", flush=True)
            question = COMPARE.format(new=version, old=previous, worksheet=worksheet.name) + (
                f" Of {previous} only these are loaded: {', '.join(kept)}; compare like with like.")
            reply = await ask(client, notebook_id, question, both_ids, titles)
            found = VERDICT.search(reply["answer"])
            status = "ERROR" if reply.get("error") else (found.group(1) if found else "UNCLEAR")
            results.append({"id": "CMP", "title": f"{version} against {previous}", "question": question,
                            "status": status, **{k: reply[k] for k in ("answer", "cited")}})

    out = UAT / "results"
    out.mkdir(exist_ok=True)
    report = out / f"{track}-{version}-{stamp}.md"
    counts = {s: sum(r["status"] == s for r in results) for s in ("PASS", "FIX", "OPEN", "BETTER", "SAME", "WORSE", "UNCLEAR", "ERROR")}
    summary = ", ".join(f"{k} {v}" for k, v in counts.items() if v)
    lines = [
        f"# NotebookLM UAT: {track} {version} ({stamp})",
        "",
        f"Version {version} (U {ref}); compared with {previous or 'no previous version'}. "
        f"Notebook `{notebook_id}` (private). Worksheet `{worksheet.name}`.",
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
    report.with_suffix(".json").write_text(json.dumps({"notebook": notebook_id, "version": version, "ref": ref,
                                                       "previous": previous, "results": results},
                                                      indent=2, ensure_ascii=False), encoding="utf-8", newline="\n")
    print(f"report {report}  ({summary})")
    return report


def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("track", choices=sorted(WORKSHEETS))
    parser.add_argument("--notebook", help="notebook id (default: the track's standing UAT notebook)")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--replace", action="store_true", help="upload this version, keep the previous one, delete older ones")
    mode.add_argument("--new", action="store_true", help="create a fresh notebook and upload")
    parser.add_argument("-n", "--dry-run", action="store_true", help="show what would be deleted, uploaded and asked")
    parser.add_argument("--items", help="comma-separated item ids, e.g. S-1,H-2")
    parser.add_argument("--list", action="store_true", help="list the worksheet items and exit")
    parser.add_argument("--pause", type=float, default=45.0, help="seconds between questions (default 45)")
    args = parser.parse_args()
    if args.list:
        folder = UAT / "staging" / args.track
        for item in worksheet_items(folder / versioned(WORKSHEETS[args.track], staging_version(folder)[0])):
            print(f"{item['id']:6} {item['title']}: {item['question'][:90]}")
        return
    only = set(args.items.split(",")) if args.items else None
    asyncio.run(run(args.track, args.notebook, only, args.pause, args.replace, args.new, args.dry_run))


if __name__ == "__main__":
    main()
