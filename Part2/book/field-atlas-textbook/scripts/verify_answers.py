#!/usr/bin/env python3
"""Verify numeric answers used by the textbook examples."""
from __future__ import annotations

import math


def close(name: str, actual: float, expected: float, tol: float = 5e-3) -> None:
    if abs(actual - expected) > tol:
        raise SystemExit(f"{name}: {actual} != {expected}")
    print(f"{name}: {actual:.6g} OK")


def main() -> int:
    close("chapter 1 mark spacing cm", 39.0 / 30.0, 1.30, 0.01)
    omega0 = math.sqrt(16.0 / 1.0)
    zeta = 2.0 / (2.0 * math.sqrt(16.0))
    close("chapter 2 omega0", omega0, 4.0)
    close("chapter 2 zeta", zeta, 0.25)
    close("chapter 2 omega_d", omega0 * math.sqrt(1 - zeta * zeta), math.sqrt(15.0), 1e-6)
    close("chapter 3 hydrogen n2 energy", -13.6 / 4.0, -3.4, 1e-6)
    close("chapter 3 lyman alpha nm", 1240.0 / 10.2, 121.5686, 0.02)
    lam = math.sqrt(5e-6 * 1.0 / (2 * 1.0))
    close("chapter 4 cable length mm", lam * 1000, 1.5811, 0.001)
    close("chapter 4 membrane tau ms", 1.0 * 0.01 * 1000, 10.0, 0.001)
    close("chapter 5 Kramers ratio", math.exp(-(6 - 3) / 0.75), 0.0183156, 1e-6)
    close("chapter 6 lock angle deg", math.degrees(math.asin(0.4 / 0.7)), 34.85, 0.01)
    close("chapter 7 Vicsek step m", 12.0 * 0.2, 2.4, 1e-9)
    close("chapter 7 neighbors", math.pi * 3.0**2 * 200.0 / 50.0**2, 2.26195, 1e-4)
    close("chapter 8 U238 after 1 Ga", 2 ** (-1.0 / 4.47), 0.8565, 0.001)
    L = 3.828e26
    d = 10.0 * 3.085677581e16
    close("chapter 9 solar flux 10 pc", L / (4 * math.pi * d * d), 3.199e-10, 1e-13)
    H0 = 67.4 * 1000 / 3.085677581e22
    c = 299792458.0
    close("chapter 10 lambda_usf", (21/11) * H0 * H0 / (c * c), 1.012e-52, 5e-55)
    close("chapter 10 omega_dm", 3/11, 0.272727, 1e-6)
    print("verify_answers.py: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())