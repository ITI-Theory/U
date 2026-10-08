#!/usr/bin/env python3
"""Publish the Soma Machine app to https://www.t-theory.org/app/.

Builds the app with relative asset paths into bld/app/, checks the build for
private material, replaces app/ in the site repo (ITI-Theory/t-theory.org,
cloned beside U) and commits and pushes it. GitHub Pages then serves it.

    make app-publish DRY=1     # build and check; show what would change
    make app-publish           # build, check, copy, commit, push

Refuses to publish from a U working tree with uncommitted changes (the site
commit names the U commit it was built from) or into a site repo that is not
clean and up to date.
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

APP = Path(__file__).resolve().parents[1]
U = APP.parents[3]
BUILD = U / "bld" / "app"
SITE = U.parent / "t-theory.org"
MOTHER_LOCAL = U / "apps" / "instrument" / "mother" / "mother.local.json"
# The MOTHER notebook is the programme's public notebook (mother/README.md) and
# may appear; every other notebook id in mother.local.json is private.
PUBLIC_NOTEBOOK = "16368cb3-6c5f-47b3-8e79-781b77084944"
PRIVATE_PATTERNS = [r"C:[\\/]+Users", r"/home/\w+/", r"sk-[A-Za-z0-9_-]{20,}", r"AIza[0-9A-Za-z_-]{30,}",
                    r"ghp_[A-Za-z0-9]{30,}", r"github_pat_\w{30,}"]


def run(cmd: list[str], cwd: Path, capture: bool = True) -> str:
    result = subprocess.run(cmd, cwd=cwd, text=True, encoding="utf-8", capture_output=capture,
                            shell=sys.platform == "win32" and cmd[0] == "npm")
    if result.returncode:
        raise SystemExit(f"failed: {' '.join(cmd)}\n{result.stdout or ''}{result.stderr or ''}")
    return (result.stdout or "").strip()


def private_ids() -> list[str]:
    if not MOTHER_LOCAL.exists():
        return []
    text = MOTHER_LOCAL.read_text(encoding="utf-8")
    ids = set(re.findall(r"[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", text))
    return sorted(ids - {PUBLIC_NOTEBOOK})


def scan(folder: Path) -> list[str]:
    patterns = [re.compile(p) for p in PRIVATE_PATTERNS] + [re.compile(re.escape(i)) for i in private_ids()]
    hits = []
    for path in sorted(folder.rglob("*")):
        if path.is_file() and path.suffix in {".html", ".js", ".css", ".json", ".map"}:
            text = path.read_text(encoding="utf-8", errors="replace")
            for pattern in patterns:
                if pattern.search(text):
                    hits.append(f"{path.relative_to(folder)}: matches {pattern.pattern[:40]}")
    return hits


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("-n", "--dry-run", action="store_true", help="build and check only; change nothing")
    args = parser.parse_args()

    if not (SITE / ".git").is_dir():
        raise SystemExit(f"site repo missing: clone ITI-Theory/t-theory.org to {SITE}")
    if run(["git", "status", "--porcelain"], U):
        raise SystemExit("U has uncommitted changes: commit first, so the site names a real U commit")
    commit = run(["git", "rev-parse", "--short", "HEAD"], U)

    print(f"build: U {commit} -> {BUILD.relative_to(U)} (vite, base ./)", flush=True)
    run(["npm", "run", "build", "--", "--base=./"], APP)
    hits = scan(BUILD)
    if hits:
        print("private material in the build; not publishing:", *hits, sep="\n  ")
        return 1
    files = sorted(p.relative_to(BUILD).as_posix() for p in BUILD.rglob("*") if p.is_file())
    print(f"check: {len(files)} files, no private material")

    if args.dry_run:
        old = sorted(p.relative_to(SITE / "app").as_posix() for p in (SITE / "app").rglob("*") if p.is_file()) \
            if (SITE / "app").is_dir() else []
        print(f"DRY RUN: would replace {SITE.name}/app/ ({len(old)} files) with {len(files)} files:")
        for name in sorted(set(old) | set(files)):
            mark = "=" if name in old and name in files else ("+" if name in files else "-")
            print(f"  {mark} {name}")
        print(f"  then commit 'App preview from U {commit}' and push to ITI-Theory/{SITE.name}")
        return 0

    run(["git", "pull", "-q", "--ff-only"], SITE)
    if run(["git", "status", "--porcelain"], SITE):
        raise SystemExit(f"{SITE.name} has uncommitted changes: resolve them first")
    shutil.rmtree(SITE / "app", ignore_errors=True)
    shutil.copytree(BUILD, SITE / "app")
    run(["git", "add", "-A", "app"], SITE)
    if not run(["git", "status", "--porcelain"], SITE):
        print("site already up to date: nothing to publish")
        return 0
    message = f"App preview from U {commit}\n\nCo-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
    run(["git", "commit", "-q", "-m", message], SITE)
    run(["git", "push", "-q"], SITE)
    print(f"published: {SITE.name} {run(['git', 'rev-parse', '--short', 'HEAD'], SITE)}; "
          "GitHub Pages updates https://www.t-theory.org/app/ in about a minute")
    return 0


if __name__ == "__main__":
    sys.exit(main())
