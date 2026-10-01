#!/usr/bin/env python3
"""MOTHER bridge: answer Soma Machine questions from the programme's NotebookLM
notebook, using the author's own NotebookLM login (notebooklm-py, unofficial).

Local use only. Binds to 127.0.0.1 and answers only browser requests from
localhost origins. Never deploy it publicly: it acts with your Google account.

    .venv\\Scripts\\notebooklm login          # once, interactive
    $env:MOTHER_NOTEBOOK_ID = "<notebook id>" # or put it in mother.local.json
    .\\run_bridge.ps1                         # serves http://127.0.0.1:8765

POST /ask {"prompt": "...", "question": "...", "compare": false} -> {"answer": "...", "citations": ["..."]}
     with "compare": true and a baseline notebook (mainstream reference sources):
     also {"baseline": {"answer", "citations"}, "diff": "what [T]-Theory adds"}
GET  /health -> {"ok": true, "notebook": "<id>"}
"""
from __future__ import annotations

import asyncio
import json
import os
import re
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from notebooklm import NotebookLMClient
from notebooklm.exceptions import RateLimitError

HERE = Path(__file__).resolve().parent
PORT = int(os.environ.get("MOTHER_PORT", "8765"))
LOCAL_ORIGIN = re.compile(r"^http://(127\.0\.0\.1|localhost)(:\d+)?$")


def local_config() -> dict:
    config = HERE / "mother.local.json"
    return json.loads(config.read_text(encoding="utf-8-sig")) if config.exists() else {}


def notebook_id() -> str:
    value = os.environ.get("MOTHER_NOTEBOOK_ID") or local_config().get("notebook_id")
    if not value:
        raise SystemExit("Set MOTHER_NOTEBOOK_ID or create mother.local.json with {\"notebook_id\": \"...\"}")
    return value


def baseline_id() -> str | None:
    # Optional reference notebook of mainstream sources (the lens-off answer).
    return os.environ.get("MOTHER_BASELINE_ID") or local_config().get("baseline_notebook_id")


DIFF_PROMPT = """Compare two answers to the same question. Answer A is grounded in mainstream reference sources; Answer B is grounded in the [T]-Theory research programme.
Question: {question}

Answer A (mainstream):
{baseline}

Answer B ([T]-Theory):
{answer}

Reply concisely in three short sections: 1. ADDS: what B adds that A does not contain. 2. CHANGES OR CONTRADICTS: where B reframes or departs from mainstream science. 3. STATUS: for each addition, whether it is established science, a mathematical result within the programme, or the programme's interpretation or open hypothesis. Do not repeat the answers and do not offer follow-up questions."""


class Bridge:
    """One event loop and one NotebookLM client shared by all requests."""

    def __init__(self, notebook: str, baseline: str | None = None) -> None:
        self.notebook = notebook
        self.baseline = baseline
        self.baseline_conversation: str | None = None
        self.loop = asyncio.new_event_loop()
        threading.Thread(target=self.loop.run_forever, daemon=True).start()
        self.client = None
        self.titles: dict[str, str] = {}
        self.conversation: str | None = None

    async def _ensure(self) -> None:
        if self.client is None:
            self.client = await NotebookLMClient.from_storage().__aenter__()
            for notebook in filter(None, (self.notebook, self.baseline)):
                for source in await self.client.sources.list(notebook):
                    self.titles[source.id] = getattr(source, "title", None) or source.id

    async def _chat(self, notebook: str, prompt: str, conversation: str | None):
        # NotebookLM's internal API is occasionally flaky under load: retry once in a fresh conversation.
        try:
            return await self.client.chat.ask(notebook, prompt, conversation_id=conversation)
        except RateLimitError:
            raise
        except Exception as error:
            print(f"[mother] retrying after {type(error).__name__}", flush=True)
            await asyncio.sleep(3)
            return await self.client.chat.ask(notebook, prompt)

    def _cited(self, result) -> list[str]:
        seen: list[str] = []
        for reference in result.references:
            title = self.titles.get(reference.source_id, reference.source_id)
            if title not in seen:
                seen.append(title)
        return seen

    async def _ask(self, prompt: str, question: str, compare: bool) -> dict:
        await self._ensure()
        if not (compare and self.baseline):
            result = await self._chat(self.notebook, prompt, self.conversation)
            self.conversation = result.conversation_id
            return {"answer": result.answer, "citations": self._cited(result)}
        # Lens off and lens on in parallel, then the difference.
        result, baseline = await asyncio.gather(
            self._chat(self.notebook, prompt, self.conversation),
            self._chat(self.baseline, question, self.baseline_conversation),
        )
        self.conversation = result.conversation_id
        self.baseline_conversation = baseline.conversation_id
        diff = await self._chat(
            self.baseline, DIFF_PROMPT.format(question=question, baseline=baseline.answer, answer=result.answer), None
        )
        return {
            "answer": result.answer,
            "citations": self._cited(result),
            "baseline": {"answer": baseline.answer, "citations": self._cited(baseline)},
            "diff": diff.answer,
        }

    def ask(self, prompt: str, question: str = "", compare: bool = False) -> dict:
        coroutine = self._ask(prompt, question or prompt, compare)
        return asyncio.run_coroutine_threadsafe(coroutine, self.loop).result(timeout=300)


class Handler(BaseHTTPRequestHandler):
    bridge: Bridge

    def _origin_ok(self) -> bool:
        origin = self.headers.get("Origin", "")
        return not origin or bool(LOCAL_ORIGIN.match(origin))

    def _cors(self) -> None:
        origin = self.headers.get("Origin", "")
        if origin and LOCAL_ORIGIN.match(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, status: int, payload: dict) -> None:
        if not self._origin_ok():
            status, payload = 403, {"error": "local origins only"}
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            self._json(200, {"ok": True, "notebook": self.bridge.notebook, "baseline": self.bridge.baseline})
        else:
            self._json(404, {"error": "not found"})

    def do_POST(self) -> None:  # noqa: N802
        if self.path != "/ask":
            self._json(404, {"error": "not found"})
            return
        if not self._origin_ok():
            self._json(403, {"error": "local origins only"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            data = json.loads(self.rfile.read(min(length, 64_000)) or b"{}")
            prompt = str(data.get("prompt") or data.get("question") or "").strip()
            question = str(data.get("baseline_prompt") or data.get("question") or prompt).strip()
            if not prompt:
                self._json(400, {"error": "empty question"})
                return
            self._json(200, self.bridge.ask(prompt[:8000], question[:4000], bool(data.get("compare"))))
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            print("[mother] client went away before the answer arrived")
        except RateLimitError:
            self._json(429, {"error": "NotebookLM chat quota reached for this account; try again later (free accounts have a daily chat limit)."})
        except Exception as error:  # report, do not crash the bridge
            try:
                self._json(500, {"error": f"{type(error).__name__}: {error}"})
            except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
                pass

    def log_message(self, fmt: str, *args) -> None:
        print(f"[mother] {self.address_string()} {fmt % args}")


def main() -> None:
    Handler.bridge = Bridge(notebook_id(), baseline_id())
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"MOTHER bridge on http://127.0.0.1:{PORT} (notebook {Handler.bridge.notebook}); Ctrl+C to stop")
    server.serve_forever()


if __name__ == "__main__":
    main()
