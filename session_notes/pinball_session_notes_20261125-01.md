# Pinball Session Notes

**Revision:** pinball_session_notes_20261125-01
**Date:** 2026-11-25

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. Deferred items (below) are picked up when their design tasks start (Scott) | | | |

## 2. Session scope

System-level electrical safety architecture, grounding architecture, the co-located coil-driver decision, the 24 V inductive-sensor conditioning, the DC-07 A3144 / 1N5817 bench result, and a documentation cleanup (Topedal branding removed; electrical block diagram replaced with the tiered-safety view). Published in PRs #53–#56 (releases v2026.11.25.1 through v2026.11.25.4).

## 3. Decisions (salient design changes)

| ID | Tag | Decision |
|---|---|---|
| D15 | SAFETY · architecture | Three-tier defense-in-depth electrical safety below an AC-mains tier. Mains: F_AC, master switch (DP-13), chassis earth bond, GFCI. Tier 1 (rail): F_MAIN, K1 master coil-rail cutoff (opens on watchdog timeout **or** firmware fault), 24 V rail-current stuck-on detection, bulk cap + bleeder. Tier 2 (circuit): fuses F1–F8 + 5 V rail fuses (F_5V_LOGIC, F_5V_LED). Tier 3 (device): fail-safe default — gate pulldown → MOSFET OFF, flyback, 24 V→3.3 V sensor clamp, LEDs off without 5 V. **No per-coil fuses** (circuit fuses + K1/rail-current cover the coil hazards). Circuit fuse table added, ratings TBD. |
| D16 | ARCHITECTURE · co-located drivers | **Coil drivers are co-located with each device.** The DP-28 board (OPP reference) is superseded for production by a **controller board** (Blue Pill + switch/matrix inputs + Neopixel + per-channel gate outputs) and **per-device coil-driver boards** (IRLZ44N MOSFET, 100 Ω + 10 kΩ gate net, 1N4007 flyback, screw terminals). Firmware-gated firing preserves the no-hardware-autofire rule. The OPP reference board and the Cobrapin board are the design references. **DC-06 is the first prototype.** |
| D17 | GROUNDING | Single-point star ground at GND★ (P-08): return classes (24 V coil, LED, per-device gate GNDREF, logic GNDREF, sensor) meet only at the star; one earth bond to chassis / mains PE; each device's gate return (GNDREF) is a dedicated wire, separate from its 4.5 A coil return; the mains-earthed host ties logic GNDREF to earth over USB (add a USB isolator if a ground loop appears). |
| D18 | FUSING | Circuit fuses are selected by **measured coil current** (fire pulse, PWM-hold, refire RMS, simultaneous-group) — no coil thermal-withstand test is needed, since K1 + rail-current handle the 4.5 A stuck-on. Fuse values + trunk → power-supply design; K1 timeout + rail-current threshold → firmware design. |
| D19 | SENSOR · conditioning | GoHz M12 inductive sensors are **NPN NO** (datasheet). Conditioning per input: 4.7 kΩ pull-up to 3.3 V, 1 kΩ series, 10 nF filter, optional 3.3 V TVS; shared ground; active-LOW. No level shifter or optocoupler needed. The sensor is a system-common component. |
| D20 | SUPPLY | 24 V supply concept: ~25 A (commonly available). Final sizing deferred to the power-supply design. |
| D21 | TEST · DC-07 | DC-07 Hall perf board v2 (A3144 alternate): 1N5817 (Schottky) replacing 1N4007 measured a 0.3 V drop → sensor VDD 4.7 V, within the A3144 4.5 V minimum (PASS). |
| D22 | ADMIN · cleanup | "Topedal board" → "controller board" across all docs and diagrams (0 references remain); DP-28 renamed **Controller board**, folder → `dp-28_controller_board`. The electrical block diagram is now the **3-tier safety architecture** view (old power-distribution diagram retired to git history). Dashboard new-file link-check rule added to `github_workflow.md` §4. |

## 4. Work done

| Item | PR / Release |
|---|---|
| Safety architecture + circuit fuse table (electrical_master); block-diagram safety update | PR #53 · v2026.11.25.1 |
| Grounding architecture + drawing; GoHz sensor datasheet specs + NPN conditioning | PR #54 · v2026.11.25.2 |
| Co-located coil drivers (electrical_master, machine_master, coil_driver_board, DP-28); DC-07 1N5817 result | PR #55 · v2026.11.25.3 |
| Topedal removal → controller board; folder rename; tiered-safety block diagram; link-check rule | PR #56 (admin-no-bump) · v2026.11.25.4 |

## 5. Limits and deferred items

| Item | Detail |
|---|---|
| TBD values | All fuse ratings, K1 timeout, rail-current threshold set later (DC-06 currents, PSU, firmware) |
| Controller / driver boards | Not yet designed; OPP reference board + Cobrapin are references; DC-06 is the first prototype |
| Power-supply design | Size 24 V (~25 A concept), 5 V (LED ~6 A + logic), trunk + F_MAIN; host-to-controller grounding / earth bond |
| Architecture diagram | Topedal removed, but not yet redrawn for co-located drivers (deferred until DC-06 verified) |
| 24 V sensor interface | Conditioning defined; controller-board implementation pending |

## 6. Next session

Start with the **DC-06 Drop target (single) electrical schematic** with the co-located coil driver.
