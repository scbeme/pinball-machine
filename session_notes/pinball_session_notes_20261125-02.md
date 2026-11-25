# Pinball Session Notes

**Revision:** pinball_session_notes_20261125-02
**Date:** 2026-11-25

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. Deferred items (below) are picked up when their design tasks start (Scott) | | | |

## 2. Session scope

DC-06 Drop target (single) electrical schematic and bench-test rig — reviewed through five revisions, bugs and labeling issues fixed, and approved. Refines the D17 grounding decision (gate-return routing) for every co-located coil-driver board, system-wide, not just DC-06. Published in PR #58 (release v2026.11.25.5).

## 3. Decisions (salient design changes)

| ID | Tag | Decision |
|---|---|---|
| D23 | GROUNDING · refines D17 | Each co-located driver's gate return (GNDREF) pairs with its gate wire back to the controller board (conventional remote gate drive) instead of running as its own dedicated wire to GND★; the controller makes the single GNDREF tie to the star. Applies to every co-located coil-driver board, not just DC-06. Electrical Master grounding architecture and the grounding drawing updated. |
| D24 | PROTECTION · coil driver board | Added a 100 kΩ gate-to-source local pulldown (R4) on the coil-driver board, alongside the existing 10 kΩ gate-to-GNDREF pulldown (R3) — backup fail-safe OFF if the GNDREF/controller wire itself opens, leaving R3 floating. |
| D25 | DC-06 · schematic | DC-06 Drop target (single) electrical schematic and bench-test rig approved: 1 blade, 1 Hall sensor (Melexis US5781, open-drain — no external conditioning, STM32 internal pull-up suffices), 1 solenoid, 1 coil-driver board (IRLZ44N; R2 100 Ω gate series; R3 10 kΩ + R4 100 kΩ gate pulldowns; 1N4007 flyback). Bench-rig pins verified against the DP-28 OPP controller mapping: A8 coil gate, B14 Hall input, B12 fire button (rig-only substitute for the ball strike, not part of the final device). |

## 4. Work done

| Item | PR / Release |
|---|---|
| DC-06 schematic.svg (new, approved) | PR #58 · v2026.11.25.5 |
| coil_driver_board.md (R4 added, GNDREF routing updated) | PR #58 · v2026.11.25.5 |
| electrical_master.md (grounding architecture + board architecture) | PR #58 · v2026.11.25.5 |
| draft_grounding_architecture.svg (gate-return routing redrawn) | PR #58 · v2026.11.25.5 |
| DC-06 README (bench-rig pin assignment added) | PR #58 · v2026.11.25.5 |

## 5. Limits and deferred items

| Item | Detail |
|---|---|
| RDS(on) at 3.3 V gate | IRLZ44N datasheet doesn't specify RDS(on) at a 3.3 V gate drive (next point up is 4 V: 35 mΩ @ 21 A); fire current and MOSFET heating to be confirmed by bench test once the DC-06 rig is built |
| Board layout | DC-06 schematic is the bench-test-rig circuit; not yet laid out as a perf board/PCB |
| Architecture diagram | system/drawings system-architecture diagram still not redrawn for co-located drivers generally (carried over from 20261125-01) |

## 6. Next session

Build the DC-06 bench-test rig (breadboard + perf board) and run the RDS(on)/heating bench test against the approved schematic.
