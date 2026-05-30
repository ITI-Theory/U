"""
osc_output.py — Send field state to Ableton (Max4Live) and TouchDesigner.

OSC namespace (see DESIGN.md §7):
  /field/e/{i}/somatic       float 0-1
  /field/e/{i}/cognitive     float 0-1
  /field/H                   float  (energy)
  /field/gradH/{i}           float  (gradient component i)
  /field/T_eff               float  (effective temperature)
  /field/threshold_cross     int    (first crossing mode, -1 if none)
  /field/attractor           str    (nearest named attractor)
"""

from pythonosc import udp_client


ABLETON_HOST    = "127.0.0.1"
ABLETON_PORT    = 9000   # Max4Live OSC receiver

TOUCHDESIGNER_HOST = "127.0.0.1"
TOUCHDESIGNER_PORT = 9001


class OscOutput:
    def __init__(self,
                 ableton_host=ABLETON_HOST,   ableton_port=ABLETON_PORT,
                 td_host=TOUCHDESIGNER_HOST,  td_port=TOUCHDESIGNER_PORT):
        self._ab = udp_client.SimpleUDPClient(ableton_host, ableton_port)
        self._td = udp_client.SimpleUDPClient(td_host, td_port)

    def send(self, state: dict):
        """Send a full field state dict to both targets."""
        e       = state["e"]
        grad    = state["grad_H"]
        crosses = state["threshold_cross"]
        cross0  = crosses[0] if crosses else -1

        N = len(e) // 2

        # Per-mode somatic/cognitive
        for i in range(N):
            self._send_both(f"/field/e/{i}/somatic",   e[i])
            self._send_both(f"/field/e/{i}/cognitive",  e[N + i])

        # Scalar summaries
        self._send_both("/field/H",               state["H"])
        self._send_both("/field/T_eff",            state["T_eff"])
        self._send_both("/field/threshold_cross",  cross0)

        # Gradient components
        for i, g in enumerate(grad):
            self._send_both(f"/field/gradH/{i}", g)

        # Attractor name (string — TouchDesigner only, Ableton can't use strings)
        self._td.send_message("/field/attractor", state["nearest_attractor"])

    def _send_both(self, address: str, value):
        self._ab.send_message(address, value)
        self._td.send_message(address, value)
