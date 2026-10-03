#!/usr/bin/env python3
"""Verify numeric answers used by the textbook examples and problem key."""
from __future__ import annotations

import math


def close(name: str, actual: float, expected: float, tol: float = 5e-3) -> None:
    if abs(actual - expected) > tol:
        raise SystemExit(f"{name}: {actual} != {expected}")
    print(f"{name}: {actual:.6g} OK")


def relclose(name: str, actual: float, expected: float, rel: float = 5e-3) -> None:
    if abs(actual - expected) > rel * max(1.0, abs(expected)):
        raise SystemExit(f"{name}: {actual} != {expected}")
    print(f"{name}: {actual:.6g} OK")


def main() -> int:
    # Chapter 1 (worked examples, check-your-learning, problems)
    c = 2.998e8
    kB = 1.380649e-23
    close("1.1 gradient K/m", (24 - 18) / 2.5, 2.4)
    close("1.1 heat flux W/m2", 0.026 * 2.4, 0.062, 0.001)
    close("1.1 ceiling loss W", 20 * 0.026 * 2.4, 1.2, 0.05)
    close("1.1 CYL field 1 mm V/m", 0.070 / 1e-3, 70)
    relclose("1.1 CYL field 5 nm V/m", 0.070 / 5e-9, 1.4e7)
    close("1.2 lambda air m", 343 / 440, 0.780, 0.001)
    close("1.2 lambda water m", 1480 / 440, 3.36, 0.01)
    close("1.3 string speed m/s", 2 * 0.648 * 110, 143, 0.5)
    close("1.3 third harmonic Hz", 3 * 110, 330)
    close("1.2 CYL helium m", 1007 / 1000, 1.01, 0.01)
    close("1.3 log midpoint", (-35 + 26) / 2, -4.5)
    relclose("1.3 geometric centre m", 10 ** -4.5, 32e-6, 0.02)
    relclose("1.4 atom L/c", 1e-10 / c, 3.3e-19, 0.02)
    relclose("1.4 atom ratio", 1e-16 / (1e-10 / c), 300, 0.02)
    relclose("1.4 body L/c", 1 / c, 3.3e-9, 0.02)
    relclose("1.4 body ratio", 10 / (1 / c), 3e9, 0.01)
    relclose("1.4 disc L/c s", 1e20 / c, 3.3e11, 0.02)
    relclose("1.4 disc L/c years", 1e20 / c / 3.156e7, 1.06e4, 0.02)
    relclose("1.4 disc ratio", 1e16 / (1e20 / c), 3e4, 0.01)
    close("1.3 CYL Earth crossing s", 1.27e7 / c, 0.042, 0.001)
    relclose("1.3 CYL Earth mode ratio", 53.9 * 60 / (1.27e7 / c), 7.6e4, 0.05)
    n_air = 1.013e5 / (kB * 293)
    relclose("1.5 number density", n_air, 2.5e25, 0.01)
    relclose("1.5 N in 1 um cube", n_air * 1e-18, 2.5e7, 0.01)
    relclose("1.5 fluctuation 1 um", 1 / math.sqrt(n_air * 1e-18), 2e-4, 0.01)
    close("1.5 N in 10 nm cube", n_air * 1e-24, 25, 0.1)
    close("1.5 fluctuation 10 nm", 1 / math.sqrt(n_air * 1e-24), 0.2, 0.001)
    close("1.4 MC membrane tau ms", 20e3 * 1e-6 * 1e3, 20)
    close("P1.1 lambda m", 343 / 1000, 0.343)
    close("P1.2 speed m/s", 2 * 0.648 * 329.6, 427.2, 0.05)
    close("P1.3 cell-person orders", 0 - (-6), 6)
    close("P1.3 person-Earth orders", math.log10(1.27e7), 7.1, 0.01)
    relclose("P1.4 molecules", 2.5e25 * (100e-9) ** 3, 2.5e4)
    close("P1.4 fluctuation %", 100 / math.sqrt(2.5e25 * (100e-9) ** 3), 0.63, 0.005)
    close("P1.5 tau ms", 10e3 * 1e-6 * 1e3, 10)
    close("P1.6 Sun crossing s", 1.39e9 / c, 4.64, 0.01)
    close("P1.6 ratio to 5 min", 300 / (1.39e9 / c), 65, 0.5)
    # Chapter 2 (worked examples, check-your-learning, worked homework)
    m, k, b = 0.50, 200.0, 2.0
    w0 = math.sqrt(k / m); g = b / (2 * m); wd = math.sqrt(w0**2 - g**2)
    close("2.1 omega0", w0, 20.0)
    close("2.1 f0 Hz", w0 / (2 * math.pi), 3.18, 0.005)
    close("2.1 gamma", g, 2.0)
    close("2.1 zeta", g / w0, 0.10)
    close("2.1 Q", w0 / (2 * g), 5.0)
    close("2.1 decay time s", 1 / g, 0.50)
    close("2.1 cycles in decay time", (1 / g) * w0 / (2 * math.pi), 1.6, 0.01)
    close("2.1 omega_d", wd, 19.9, 0.01)
    close("2.1 CYL critical b", 2 * m * w0, 20.0)
    J = 0.10
    close("2.2 v0", J / m, 0.20)
    close("2.2 amplitude m", (J / m) / wd, 0.010, 0.0001)
    tp = math.atan(wd / g) / wd
    close("2.2 t_peak s", tp, 0.074, 0.001)
    close("2.2 peak m", (J / m) / wd * math.exp(-g * tp) * math.sin(wd * tp), 0.0086, 0.0001)
    Td = 2 * math.pi / wd
    close("2.3 Td", Td, 0.316, 0.001)
    close("2.3 half-period decay", math.exp(-g * Td / 2), 0.73, 0.005)
    close("2.3 cancel factor", 1 - math.exp(-g * Td / 2), 0.27, 0.005)
    close("2.3 full-period decay", math.exp(-g * Td), 0.53, 0.005)
    close("2.3 reinforce factor", 1 + math.exp(-g * Td), 1.53, 0.005)
    wE = 2 * math.pi / (53.9 * 60)
    relclose("2.4 Earth omega0", wE, 1.94e-3, 0.01)
    relclose("2.4 Earth decay s", 2 * 500 / wE, 5.1e5, 0.02)
    close("2.4 Earth decay days", 2 * 500 / wE / 86400, 6.0, 0.05)
    close("2.4 fraction after 21 d", math.exp(-21 * 86400 / (2 * 500 / wE)), 0.03, 0.005)
    close("2.4 CYL GW Q", math.pi * 250 * 0.004, 3.1, 0.05)
    lam = 197.3 / 139.6
    close("2.5 pion range fm", lam, 1.41, 0.005)
    close("2.5 suppression 0.5 fm", math.exp(-0.5 / lam), 0.70, 0.005)
    close("2.5 suppression 1.41 fm", math.exp(-1.41 / lam), 0.37, 0.005)
    close("2.5 suppression 3.0 fm", math.exp(-3.0 / lam), 0.12, 0.005)
    w1 = math.sqrt(200 / 1.0); g1 = 2.0 / 2.0
    close("P2.1 omega0", w1, 14.1, 0.05)
    close("P2.1 zeta", g1 / w1, 0.071, 0.001)
    close("P2.1 Q", w1 / (2 * g1), 7.1, 0.05)
    wf = 2 * math.pi * 440
    close("P2.2 omega0", wf, 2765, 1)
    close("P2.2 decay s", 2 * 1000 / wf, 0.72, 0.005)
    close("P2.2 cycles", 440 * 2 * 1000 / wf, 318, 1)
    close("P2.3 Q", math.pi * 250 * 0.004, 3.1, 0.05)
    close("P2.3 cycles", 250 * 0.004, 1.0)
    relclose("P2.4 W range fm", 197.3 / 80400, 2.45e-3, 0.01)
    dq = Td / 4
    close("P2.5 quarter period s", dq, 0.079, 0.001)
    close("P2.5 decay", math.exp(-g * dq), 0.85, 0.005)
    close("P2.5 factor", math.sqrt(1 + math.exp(-g * dq) ** 2), 1.32, 0.005)
    # Chapter 3 examples and problems
    close("ch3 hydrogen n2 energy", -13.6 / 4.0, -3.4, 1e-6)
    close("ch3 lyman alpha nm", 1240.0 / 10.2, 121.5686, 0.02)
    close("ch3 green photon eV", 1240 / 500, 2.48)
    close("ch3 uv photon eV", 1240 / 250, 4.96)
    close("ch3 310 nm eV", 1240 / 310, 4.0, 0.001)
    close("ch3 620 nm eV", 1240 / 620, 2.0)
    close("ch3 1.55 eV nm", 1240 / 1.55, 800.0, 0.001)
    close("ch3 resolution eV", 2.48 * 0.20 / 500, 0.000992, 1e-7)
    close("ch3 kBT ratio", 2.48 / 0.026, 95.3846, 0.001)
    close("ch3 carbon sample atoms", 6.022e23 * (0.012 / 12), 6.022e20, 1e15)
    close("ch3 2eV wavelength", 1240 / 2, 620)
    close("ch3 E4", -13.6 / 16, -0.85)
    close("ch3 400nm eV", 1240 / 400, 3.1)
    close("ch3 n4 to n2", (-13.6 / 4) - (-13.6 / 16), -2.55)
    close("ch3 bohr meters", 0.0529e-9, 5.29e-11, 1e-14)
    close("ch3 photon factor", (1240 / 300) / (1240 / 600), 2.0)

    # Chapter 4 examples and problems
    lam = math.sqrt(5e-6 * 1.0 / (2 * 1.0))
    close("ch4 cable length mm", lam * 1000, 1.5811, 0.001)
    close("ch4 membrane tau ms", 1.0 * 0.01 * 1000, 10.0, 0.001)
    close("ch4 current nA", 10e-9 * 50e-3 / 1e-9, 0.5)
    area = 4 * math.pi * (10e-6) ** 2
    cap = area * 0.01
    close("ch4 cell area", area, 1.2566e-9, 1e-13)
    close("ch4 cell capacitance pF", cap / 1e-12, 12.566, 0.01)
    close("ch4 voltage delta mV", (0.5e-9 * 1e-3) / cap * 1000, 39.79, 0.1)
    close("ch4 2nS current pA", 2e-9 * 40e-3 / 1e-12, 80)
    close("ch4 radius double factor", math.sqrt(2), 1.4142, 1e-4)
    close("ch4 one length fraction", math.exp(-1), 0.367879, 1e-6)
    close("ch4 problem current pA", 5e-9 * 20e-3 / 1e-12, 100)
    close("ch4 problem tau ms", 2 * 0.015 * 1000, 30)
    area5 = 4 * math.pi * (5e-6) ** 2
    close("ch4 radius5 area", area5, 3.1416e-10, 1e-14)
    close("ch4 radius5 capacitance pF", area5 * 0.01 / 1e-12, 3.1416, 0.001)
    close("ch4 current into cap mV", (100e-12 * 2e-3) / 10e-12 * 1000, 20)
    close("ch4 spike ions per sec", 20e-12 / 1.60e-19, 1.25e8, 1e5)

    # Chapter 5 examples and problems
    close("ch5 Kramers ratio", math.exp(-(6 - 3) / 0.75), 0.0183156, 1e-6)
    close("ch5 e-2", math.exp(-2), 0.135335, 1e-6)
    close("ch5 memory e-2", math.exp(-12 / 6), math.exp(-2), 1e-6)
    close("ch5 memory e-3", math.exp(-18 / 6), math.exp(-3), 1e-6)
    close("ch5 forcing 2s", -0.40 + 0.15 * 2, -0.10)
    close("ch5 forcing 3s", -0.40 + 0.15 * 3, 0.05)
    close("ch5 basis states", 2**8, 256)
    rmse = math.sqrt(((4.0-4.2)**2 + (4.5-4.1)**2 + (5.0-5.4)**2 + (4.5-4.7)**2)/4)
    close("ch5 rmse", rmse, 0.316227, 1e-6)
    close("ch5 baseline rmse", math.sqrt(((4-3)**2 + (4-5)**2 + (4-4)**2)/3), 0.816497, 1e-6)
    close("ch5 rare accuracy", 98 / 100 * 100, 98)
    close("ch5 problem barrier ratio", math.exp(-(5 - 2) / 1), math.exp(-3), 1e-6)
    close("ch5 drive no crossing", -0.60 + 0.12 * 4, -0.12)
    close("ch5 memory tau8", math.exp(-16 / 8), math.exp(-2), 1e-6)
    close("ch5 observed success fraction", 0 / 48, 0)
    close("ch5 problem rmse", math.sqrt(((2-2)**2 + (3-5)**2 + (4-4)**2)/3), 1.1547, 0.001)
    close("ch5 time to threshold", 0.75 / 0.25, 3.0)

    # Chapter 6 examples and problems
    close("ch6 lock angle deg", math.degrees(math.asin(0.4 / 0.7)), 34.85, 0.01)
    close("ch6 breathing samples", 10 * (1 / 0.25), 40)
    close("ch6 pairs 8", 8 * 7 / 2, 28)
    close("ch6 pairs 30", 30 * 29 / 2, 435)
    close("ch6 tapping samples", 100 / 2, 50)
    close("ch6 lag seconds", 6 / 50, 0.12)
    close("ch6 problem angle", math.degrees(math.asin(0.2 / 0.5)), 23.578, 0.01)
    close("ch6 problem samples", 20 / 0.5, 40)
    close("ch6 problem pairs12", 12 * 11 / 2, 66)
    close("ch6 problem angle2", math.degrees(math.asin(0.6 / 1.2)), 30.0)
    close("ch6 samples marginal", 25 / 10, 2.5)

    # Chapter 7 examples and problems
    close("ch7 Vicsek step m", 12.0 * 0.2, 2.4, 1e-9)
    close("ch7 neighbors", math.pi * 3.0**2 * 200.0 / 50.0**2, 2.26195, 1e-4)
    close("ch7 polarization", math.sqrt(8) / 4, 0.7071, 1e-4)
    close("ch7 dense count", 50**2, 2500)
    close("ch7 gossip count", 50 * 200, 10000)
    close("ch7 dense quarter", 2500 / 10000, 0.25)
    close("ch7 dense larger K20", 50 * 20, 1000)
    close("ch7 N30 K90 ratio", 30**2 / (30*90), 1/3, 1e-6)
    close("ch7 delay distance", 12 * 0.08, 0.96)
    close("ch7 problem move", 8 * 0.5, 4.0)
    close("ch7 problem neighbors", math.pi * 4**2 * 0.05, 2.51327, 1e-4)
    close("ch7 problem phi", abs(3 - 1) / 4, 0.5)
    close("ch7 problem dense", 40**2, 1600)
    close("ch7 problem gossip", 40 * 100, 4000)
    close("ch7 problem dt", 1.5 / 3, 0.5)
    close("ch7 problem density", 80 / (20*20), 0.2)
    close("ch7 problem neighbors2", math.pi * 2**2 * 0.2, 2.51327, 1e-4)

    # Chapter 8 examples and problems
    close("ch8 U238 after 1 Ga", 2 ** (-1.0 / 4.47), 0.8565, 0.001)
    close("ch8 plate 1Myr km", 0.03 * 1_000_000 / 1000, 30)
    close("ch8 plate 100Myr km", 0.03 * 100_000_000 / 1000, 3000)
    close("ch8 thermal year m", math.sqrt(1e-6 * 3.15e7), 5.61, 0.01)
    close("ch8 sediment m/Myr", 120 / 3.0, 40)
    close("ch8 sediment mm/yr", 40 / 1000, 0.040)
    close("ch8 rebound mm/yr", 80 / 10000 * 1000, 8)
    close("ch8 map 1cm m", 50000 / 100, 500)
    close("ch8 map 6cm km", 6 * 500 / 1000, 3.0)
    close("ch8 two half-lives", 2 ** (-8.94 / 4.47), 0.25)
    close("ch8 plate 5cm 10Myr km", 0.05 * 10_000_000 / 1000, 500)
    close("ch8 day diffusion m", math.sqrt(1e-6 * 86400), 0.2939, 1e-4)
    close("ch8 12.5 percent half-lives", math.log(0.125, 0.5), 3)
    close("ch8 uplift km", 0.001 * 2_000_000 / 1000, 2)

    # Chapter 9 examples and problems
    L = 3.828e26
    d = 10.0 * 3.085677581e16
    close("ch9 solar flux 10 pc", L / (4 * math.pi * d * d), 3.199e-10, 1e-13)
    close("ch9 mag 2 ratio", 2.512**2, 6.31, 0.01)
    z = (660.0 - 656.3) / 656.3
    close("ch9 redshift", z, 0.00564, 1e-5)
    close("ch9 redshift velocity", z * 3e5, 1691, 2)
    r = 8 * 3.085677581e19
    v = 2.20e5
    G = 6.674e-11
    Msun = 1.98847e30
    close("ch9 orbital mass kg", r * v*v / G, 1.79e41, 2e39)
    close("ch9 orbital mass solar", (r * v*v / G) / Msun, 9.0e10, 2e9)
    close("ch9 lifetime factor", 2 ** (-2.5), 0.1768, 1e-4)
    close("ch9 lifetime Gyr", 10 * 2 ** (-2.5), 1.768, 0.001)
    close("ch9 orbital period yr", (2 * math.pi * r / v) / 3.156e7, 2.23e8, 1e6)
    close("ch9 flux compare", 2 / (2**2), 0.5)
    close("ch9 mass luminosity", 3 ** 3.5, 46.765, 0.001)
    close("ch9 one mag ratio", 100 ** (1/5), 2.5119, 1e-4)
    close("ch9 501 redshift", (501-500)/500, 0.002)
    close("ch9 501 velocity", 0.002 * 3e5, 600)
    close("ch9 4L twice distance", 4 / 2**2, 1)
    close("ch9 mass speed factor", 2**2, 4)
    close("ch9 distance modulus 100", 5 * math.log10(100/10), 5)
    close("ch9 distance modulus 1000", 5 * math.log10(1000/10), 10)

    # Chapter 10 examples and problems
    H0 = 67.4 * 1000 / 3.085677581e22
    c = 299792458.0
    Gsi = 6.674e-11
    close("ch10 lambda_usf", (21/11) * H0 * H0 / (c * c), 1.012e-52, 5e-55)
    close("ch10 omega_dm", 3/11, 0.272727, 1e-6)
    close("ch10 critical density", 3 * H0**2 / (8 * math.pi * Gsi), 8.53e-27, 5e-29)
    close("ch10 omega discrepancy", (0.2727 - 0.2645) / 0.2645, 0.0310, 0.0002)
    close("ch10 lambda discrepancy", (1.09 - 1.01) / 1.09, 0.0734, 0.0001)
    close("ch10 hubble time Gyr", (1 / H0) / 3.156e7 / 1e9, 14.5, 0.1)
    close("ch10 flat bookkeeping", 1 - 0.315, 0.685)
    close("ch10 baryon ratio", 0.2645 / 0.049, 5.398, 0.001)
    close("ch10 percent", 3/11 * 100, 27.2727, 1e-4)
    close("ch10 H0 two percent lambda", (0.98**2 - 1) * 100, -3.96, 0.01)
    close("ch10 remaining DE", 1 - 0.315, 0.685)
    close("ch10 model discrepancy", (0.640 - 0.690) / 0.690, -0.07246, 0.0001)

    print("verify_answers.py: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())