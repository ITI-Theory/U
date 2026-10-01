#!/usr/bin/env python3
"""MOTHER bridge: answer Soma Machine questions from the programme's NotebookLM
notebook, using the author's own NotebookLM login (notebooklm-py, unofficial).

Local use only. Binds to 127.0.0.1 and answers only browser requests from
localhost origins. Never deploy it publicly: it acts with your Google account.

    .venv\\Scripts\\notebooklm login          # once, interactive
    $env:MOTHER_NOTEBOOK_ID = "<notebook id>" # or put it in mother.local.json
    .\\run_bridge.ps1                         # serves http://127.0.0.1:8765

POST /ask {"prompt": "...", "question": "..."} -> {"answer": "...", "citations": ["..."]}
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

HERE = Path(__file__).resolve().parent
PORT = int(os.environ.get("MOTHER_PORT", "8765"))
LOCAL_ORIGIN = re.compile(r"^http://(127\.0\.0\.1|localhost)(:\d+)?$")


def notebook_id() -> str:
    value = os.environ.get("MOTHER_NOTEBOOK_ID")
    config = HERE / "mother.local.json"
    if not value and config.exists():
        value = json.loads(config.read_text(encoding="utf-8-sig")).get("notebook_id")
    if not value:
        raise SystemExit("Set MOTHER_NOTEBOOK_ID or create mother.local.json with {\"notebook_id\": \"...\"}")
    return value


class Bridge:
    """One event loop and one NotebookLM client shared by all requests."""

    def __init__(self, notebook: str) -> None:
        self.notebook = notebook
        self.loop = asyncio.new_event_loop()
        threading.Thread(target=self.loop.run_forever, daemon=True).start()
        self.client = None
        self.titles: dict[str, str] = {}
        self.conversation: str | None = None

    async def _ensure(self) -> None:
        if self.client is None:
            self.client = await NotebookLMClient.from_storage().__aenter__()
            for source in await self.client.sources.list(self.notebook):
                self.titles[source.id] = getattr(source, "title", None) or source.id

    async def _ask(self, prompt: str) -> dict:
        await self._ensure()
        result = await self.client.chat.ask(self.notebook, prompt, conversation_id=self.conversation)
        self.conversation = result.conversation_id
        seen: list[str] = []
        for reference in result.references:
            title = self.titles.get(reference.source_id, reference.source_id)
            if title not in seen:
                seen.append(title)
        return {"answer": result.answer, "citations": seen}

    def ask(self, prompt: str) -> dict:
        return asyncio.run_coroutine_threadsafe(self._ask(prompt), self.loop).result(timeout=180)


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
            self._json(200, {"ok": True, "notebook": self.bridge.notebook})
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
            if not prompt:
                self._json(400, {"error": "empty question"})
                return
            self._json(200, self.bridge.ask(prompt[:8000]))
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            print("[mother] client went away before the answer arrived")
        except Exception as error:  # report, do not crash the bridge
            try:
                self._json(500, {"error": f"{type(error).__name__}: {error}"})
            except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
                pass

    def log_message(self, fmt: str, *args) -> None:
        print(f"[mother] {self.address_string()} {fmt % args}")


def main() -> None:
    Handler.bridge = Bridge(notebook_id())
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"MOTHER bridge on http://127.0.0.1:{PORT} (notebook {Handler.bridge.notebook}); Ctrl+C to stop")
    server.serve_forever()


if __name__ == "__main__":
    main()
