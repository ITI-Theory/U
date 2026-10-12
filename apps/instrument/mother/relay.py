"""relay.py: the screens' channel across devices (ISS-069), so tablets and a second
machine follow the Soma Machine like the windows of one browser do.

Windows on one machine already share the view through a BroadcastChannel (screens.js);
that channel cannot leave the browser. This relay carries the same small messages over
HTTP: a window POSTs to /send, every window listens on /events (Server-Sent Events).

Deliberately separate from the MOTHER bridge: the bridge has a shell and acts with your
Google account, so it stays on 127.0.0.1. The relay knows nothing but view messages
(a short list of types, at most 8 KB each) and asks for a pairing token.

Usage:
  python relay.py            # this machine only (http://127.0.0.1:8766)
  python relay.py --lan      # tablets on the home network: prints the address and token
Then, on each device, open the app with ?relay=http://<this machine>:8766&token=<token>
(the app must be reachable too: npm run start -- --host). The Engine Room's RELAY panel
sets the same and remembers it per browser.
"""
from __future__ import annotations

import argparse
import json
import os
import queue
import secrets
import socket
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

TYPES = {"view", "hello", "step", "tour-end", "fx", "camera"}
MAX_BYTES = 8192
TOKEN = os.environ.get("RELAY_TOKEN") or secrets.token_urlsafe(9)
clients: list[queue.Queue] = []
lock = threading.Lock()


def broadcast(message: dict) -> int:
    data = json.dumps(message, separators=(",", ":"))
    with lock:
        for q in clients:
            q.put(data)
        return len(clients)


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, *_args) -> None:  # quiet
        pass

    def _token_ok(self) -> bool:
        query = parse_qs(urlparse(self.path).query)
        return secrets.compare_digest(query.get("token", [""])[0], TOKEN)

    def _cors(self) -> None:
        # the token, not the origin, is the guard: the app may be served from any address
        self.send_header("Access-Control-Allow-Origin", self.headers.get("Origin") or "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _reply(self, status: int, payload: dict) -> None:
        body = json.dumps(payload).encode()
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        path = urlparse(self.path).path
        if path == "/health":
            with lock:
                n = len(clients)
            return self._reply(200, {"ok": True, "listeners": n})
        if path != "/events":
            return self._reply(404, {"error": "not found"})
        if not self._token_ok():
            return self._reply(403, {"error": "bad token"})
        q: queue.Queue = queue.Queue(maxsize=256)
        with lock:
            clients.append(q)
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "keep-alive")
        self.end_headers()
        try:
            self.wfile.write(b": relay\n\n")
            self.wfile.flush()
            while True:
                try:
                    data = q.get(timeout=15)
                    self.wfile.write(f"data: {data}\n\n".encode())
                except queue.Empty:
                    self.wfile.write(b": ping\n\n")
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, OSError):
            pass
        finally:
            with lock:
                if q in clients:
                    clients.remove(q)

    def do_POST(self) -> None:  # noqa: N802
        if urlparse(self.path).path != "/send":
            return self._reply(404, {"error": "not found"})
        if not self._token_ok():
            return self._reply(403, {"error": "bad token"})
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BYTES:
            return self._reply(413, {"error": "too large"})
        try:
            message = json.loads(self.rfile.read(length))
        except ValueError:
            return self._reply(400, {"error": "not JSON"})
        if not isinstance(message, dict) or message.get("type") not in TYPES:
            return self._reply(400, {"error": "unknown message type"})
        return self._reply(200, {"ok": True, "delivered": broadcast(message)})


def lan_addresses() -> list[str]:
    try:
        return sorted({info[4][0] for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET)} - {"127.0.0.1"})
    except OSError:
        return []


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--lan", action="store_true", help="listen on the home network, not only this machine")
    parser.add_argument("--port", type=int, default=int(os.environ.get("RELAY_PORT", "8766")))
    args = parser.parse_args()
    host = "0.0.0.0" if args.lan else "127.0.0.1"
    server = ThreadingHTTPServer((host, args.port), Handler)
    server.daemon_threads = True
    addresses = lan_addresses() if args.lan else ["127.0.0.1"]
    print(f"Soma relay on port {args.port}, token {TOKEN}")
    for a in addresses:
        print(f"  open the app with ?relay=http://{a}:{args.port}&token={TOKEN}")
    print("Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
