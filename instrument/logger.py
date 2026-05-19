"""
logger.py — Timestamped session log (JSON lines).

Each record: one field update step.
Output: instrument/logs/session_YYYYMMDD_HHMMSS.jsonl

Used as primary data source for Paper 3 empirical section.
"""

import json
import time
import os
from datetime import datetime


class SessionLogger:
    def __init__(self, log_dir: str = "logs"):
        os.makedirs(log_dir, exist_ok=True)
        ts       = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.path = os.path.join(log_dir, f"session_{ts}.jsonl")
        self._fh  = open(self.path, "w", encoding="utf-8")
        self._t0  = time.time()
        print(f"Logging to: {self.path}")

    def log(self, state: dict, event: str = None):
        record = {
            "t":     round(time.time() - self._t0, 4),
            **state,
        }
        if event:
            record["event"] = event
        self._fh.write(json.dumps(record) + "\n")
        self._fh.flush()

    def mark(self, label: str):
        """Mark a named event at the current timestamp (Stream Deck trigger)."""
        self._fh.write(json.dumps({"t": round(time.time() - self._t0, 4),
                                    "event": label}) + "\n")
        self._fh.flush()
        print(f"EVENT MARKED: {label}")

    def close(self):
        self._fh.close()
        print(f"Session saved: {self.path}")
