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
import base64
import hashlib
import json
import os
import re
import secrets
import shutil
import socket
import struct
import subprocess
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from notebooklm import NotebookLMClient
from notebooklm.exceptions import RateLimitError

try:
    from winpty import PtyProcess
except ImportError:  # installed only when the local shell is wanted
    PtyProcess = None

HERE = Path(__file__).resolve().parent
DEFAULT_SHELL_CWD = HERE.parents[2]
PORT = int(os.environ.get("MOTHER_PORT", "8765"))
LOCAL_ORIGIN = re.compile(r"^http://(127\.0\.0\.1|localhost)(:\d+)?$")
SHELL_TOKEN = secrets.token_urlsafe(32)
SHELL_LOCK = threading.Lock()
ACTIVE_SHELLS = 0


def local_config() -> dict:
    config = HERE / "mother.local.json"
    return json.loads(config.read_text(encoding="utf-8-sig")) if config.exists() else {}


def shell_enabled() -> bool:
    # Deliberately config-only: the shell must be explicitly opted in locally.
    return local_config().get("shell") is True


def shell_limit() -> int:
    try:
        return max(1, min(8, int(local_config().get("shell_limit", 2))))
    except (TypeError, ValueError):
        return 2


def shell_cwd() -> Path:
    configured = local_config().get("shell_cwd")
    if configured:
        path = Path(configured).expanduser()
        if path.is_dir():
            return path
        print(f"[mother] shell_cwd does not exist; using {DEFAULT_SHELL_CWD}: {path}", flush=True)
    return DEFAULT_SHELL_CWD


def notebook_id() -> str:
    value = os.environ.get("MOTHER_NOTEBOOK_ID") or local_config().get("notebook_id")
    if not value:
        raise SystemExit("Set MOTHER_NOTEBOOK_ID or create mother.local.json with {\"notebook_id\": \"...\"}")
    return value


def hal_id() -> str | None:
    # H-AL ("Hologram Al"): the author's private notebook (MOTHER's sources plus Phase Dot and chats).
    return os.environ.get("MOTHER_HAL_ID") or local_config().get("hal_notebook_id")


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

    def __init__(self, notebook: str, baseline: str | None = None, hal: str | None = None) -> None:
        self.notebook = notebook
        self.baseline = baseline
        self.hal = hal
        self.conversations: dict[str, str] = {}
        self.loop = asyncio.new_event_loop()
        threading.Thread(target=self.loop.run_forever, daemon=True).start()
        self.client = None
        self.titles: dict[str, str] = {}
        self.conversation: str | None = None

    async def _ensure(self) -> None:
        if self.client is None:
            self.client = await NotebookLMClient.from_storage().__aenter__()
            for notebook in filter(None, (self.notebook, self.baseline, self.hal)):
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

    async def _ask(self, prompt: str, question: str, compare: bool, persona: str = "mother") -> dict:
        await self._ensure()
        notebook = self.hal if persona == "hal" else self.notebook
        if not notebook:
            raise ValueError("no H-AL notebook configured (hal_notebook_id)")
        if not (compare and self.baseline):
            result = await self._chat(notebook, prompt, self.conversations.get(notebook))
            self.conversations[notebook] = result.conversation_id
            return {"answer": result.answer, "citations": self._cited(result)}
        # Lens off (mainstream reference notebook) and lens on in parallel, then the difference.
        result, baseline = await asyncio.gather(
            self._chat(notebook, prompt, self.conversations.get(notebook)),
            self._chat(self.baseline, question, self.conversations.get(self.baseline)),
        )
        self.conversations[notebook] = result.conversation_id
        self.conversations[self.baseline] = baseline.conversation_id
        diff = await self._chat(
            self.baseline, DIFF_PROMPT.format(question=question, baseline=baseline.answer, answer=result.answer), None
        )
        return {
            "answer": result.answer,
            "citations": self._cited(result),
            "baseline": {"answer": baseline.answer, "citations": self._cited(baseline)},
            "diff": diff.answer,
        }

    def ask(self, prompt: str, question: str = "", compare: bool = False, persona: str = "mother") -> dict:
        coroutine = self._ask(prompt, question or prompt, compare, persona)
        return asyncio.run_coroutine_threadsafe(coroutine, self.loop).result(timeout=300)


def _which(command: str) -> str | None:
    path = shutil.which(command)
    if path:
        return path
    try:
        result = subprocess.run(["where.exe", command], capture_output=True, text=True, timeout=2, check=False)
    except (OSError, subprocess.SubprocessError):
        return None
    return result.stdout.splitlines()[0].strip() if result.returncode == 0 and result.stdout.strip() else None


def git_bash_path() -> str | None:
    configured = local_config().get("bash_path")
    candidates = [
        configured,
        Path(os.environ.get("ProgramFiles", r"C:\Program Files")) / "Git" / "bin" / "bash.exe",
        Path(os.environ.get("ProgramFiles", r"C:\Program Files")) / "Git" / "usr" / "bin" / "bash.exe",
        _which("bash.exe"),
    ]
    for candidate in filter(None, candidates):
        path = Path(candidate)
        if path.exists():
            return str(path)
    return None


def shell_profiles() -> dict[str, dict]:
    bash = git_bash_path()
    nvim = _which("nvim.exe") or _which("nvim")
    python = HERE / ".venv" / "Scripts" / "python.exe"
    return {
        "bash": {
            "label": "Git Bash",
            "enabled": bool(bash),
            "hint": "" if bash else r"Install Git for Windows so C:\Program Files\Git\bin\bash.exe exists.",
            "argv": [bash, "--login", "-i"] if bash else None,
        },
        "nvim": {
            "label": "Neovim",
            "enabled": bool(nvim),
            "hint": "" if nvim else "install Neovim, e.g. scoop install neovim",
            "argv": [nvim] if nvim else None,
        },
        "python": {
            "label": "Python (mother venv)",
            "enabled": python.exists(),
            "hint": "" if python.exists() else r"Create apps\instrument\mother\.venv first.",
            "argv": [str(python), "-i"] if python.exists() else None,
        },
    }


def shell_status(include_token: bool = False) -> dict:
    profiles = shell_profiles()
    return {
        "enabled": shell_enabled(),
        "available": PtyProcess is not None,
        "token": SHELL_TOKEN if shell_enabled() and include_token else None,
        "active": ACTIVE_SHELLS,
        "limit": shell_limit(),
        "profiles": {name: {k: v for k, v in profile.items() if k != "argv"} for name, profile in profiles.items()},
    }


def _recv_exact(sock: socket.socket, length: int) -> bytes:
    chunks = []
    remaining = length
    while remaining:
        chunk = sock.recv(remaining)
        if not chunk:
            raise ConnectionAbortedError("socket closed")
        chunks.append(chunk)
        remaining -= len(chunk)
    return b"".join(chunks)


def _ws_accept(key: str) -> str:
    value = (key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").encode("ascii")
    return base64.b64encode(hashlib.sha1(value).digest()).decode("ascii")


def _ws_send(sock: socket.socket, data: str, lock: threading.Lock) -> None:
    payload = data.encode("utf-8", errors="replace")
    if len(payload) < 126:
        header = struct.pack("!BB", 0x81, len(payload))
    elif len(payload) < 65536:
        header = struct.pack("!BBH", 0x81, 126, len(payload))
    else:
        header = struct.pack("!BBQ", 0x81, 127, len(payload))
    with lock:
        sock.sendall(header + payload)


def _ws_close(sock: socket.socket, lock: threading.Lock) -> None:
    with lock:
        try:
            sock.sendall(b"\x88\x00")
        except OSError:
            pass


def _ws_recv(sock: socket.socket) -> tuple[int, bytes]:
    first, second = _recv_exact(sock, 2)
    opcode = first & 0x0F
    masked = bool(second & 0x80)
    length = second & 0x7F
    if length == 126:
        length = struct.unpack("!H", _recv_exact(sock, 2))[0]
    elif length == 127:
        length = struct.unpack("!Q", _recv_exact(sock, 8))[0]
    mask = _recv_exact(sock, 4) if masked else b""
    payload = _recv_exact(sock, length) if length else b""
    if masked:
        payload = bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload))
    return opcode, payload


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
        if urlparse(self.path).path == "/shell":
            self._shell_ws()
            return
        if self.path == "/health":
            origin = self.headers.get("Origin", "")
            self._json(200, {"ok": True, "notebook": self.bridge.notebook, "baseline": self.bridge.baseline, "hal": bool(self.bridge.hal), "shell": shell_status(bool(origin and LOCAL_ORIGIN.match(origin)))})
        else:
            self._json(404, {"error": "not found"})

    def _shell_error(self, status: int, message: str) -> None:
        body = json.dumps({"error": message}).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _shell_ws(self) -> None:
        global ACTIVE_SHELLS
        if not self._origin_ok():
            self._shell_error(403, "local origins only")
            return
        if not shell_enabled():
            self._shell_error(403, "shell disabled in mother.local.json")
            return
        if PtyProcess is None:
            self._shell_error(503, "pywinpty is not installed in the bridge venv")
            return
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        if query.get("token", [""])[0] != SHELL_TOKEN:
            self._shell_error(403, "bad shell token")
            return
        key = self.headers.get("Sec-WebSocket-Key")
        if self.headers.get("Upgrade", "").lower() != "websocket" or not key:
            self._shell_error(400, "websocket upgrade required")
            return
        profiles = shell_profiles()
        profile_name = query.get("profile", ["bash"])[0]
        profile = profiles.get(profile_name)
        if not profile or not profile.get("enabled") or not profile.get("argv"):
            self._shell_error(400, f"profile unavailable: {profile_name}")
            return
        try:
            cols = max(20, min(240, int(query.get("cols", ["100"])[0] or "100")))
            rows = max(6, min(80, int(query.get("rows", ["28"])[0] or "28")))
        except ValueError:
            self._shell_error(400, "bad terminal size")
            return
        with SHELL_LOCK:
            if ACTIVE_SHELLS >= shell_limit():
                self._shell_error(429, "too many open shells")
                return
            ACTIVE_SHELLS += 1

        send_lock = threading.Lock()
        pty = None
        try:
            self.send_response(101)
            self.send_header("Upgrade", "websocket")
            self.send_header("Connection", "Upgrade")
            self.send_header("Sec-WebSocket-Accept", _ws_accept(key))
            self.end_headers()

            pty = PtyProcess.spawn(profile["argv"], cwd=str(shell_cwd()), dimensions=(rows, cols))
            stop = threading.Event()

            def pump_output() -> None:
                while not stop.is_set():
                    try:
                        chunk = pty.read(1024)
                    except Exception:
                        break
                    if chunk:
                        try:
                            _ws_send(self.connection, chunk, send_lock)
                        except OSError:
                            break
                stop.set()

            threading.Thread(target=pump_output, daemon=True).start()
            while not stop.is_set():
                opcode, payload = _ws_recv(self.connection)
                if opcode == 0x8:
                    break
                if opcode == 0x9:
                    continue
                if opcode != 0x1:
                    continue
                try:
                    message = json.loads(payload.decode("utf-8"))
                except (UnicodeDecodeError, json.JSONDecodeError):
                    continue
                if message.get("type") == "input":
                    pty.write(str(message.get("data", "")))
                elif message.get("type") == "resize":
                    pty.setwinsize(max(6, min(80, int(message.get("rows", rows)))), max(20, min(240, int(message.get("cols", cols)))))
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError, OSError):
            pass
        finally:
            if pty is not None:
                try:
                    pty.close(force=True)
                except TypeError:
                    pty.close()
                except Exception:
                    pass
            try:
                _ws_close(self.connection, send_lock)
            except OSError:
                pass
            with SHELL_LOCK:
                ACTIVE_SHELLS = max(0, ACTIVE_SHELLS - 1)

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
            persona = "hal" if data.get("persona") == "hal" else "mother"
            self._json(200, self.bridge.ask(prompt[:8000], question[:4000], bool(data.get("compare")), persona))
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
    Handler.bridge = Bridge(notebook_id(), baseline_id(), hal_id())
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"MOTHER bridge on http://127.0.0.1:{PORT} (notebook {Handler.bridge.notebook}); Ctrl+C to stop")
    server.serve_forever()


if __name__ == "__main__":
    main()
