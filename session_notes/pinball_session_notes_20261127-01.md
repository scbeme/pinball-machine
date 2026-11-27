# Pinball Session Notes

**Revision:** pinball_session_notes_20261127-01
**Date:** 2026-11-27

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| OI-01 | Move DC-07 Drop target 4-blade (inline) Hall perf board fire LED downstream of D1 | Scott | Open | — |

## 2. Session scope

Perf-board layout of the drop-target coil driver: draw and netlist-verify the DC-06 Drop target (single) single-coil low-side MOSFET driver as a reusable cell, and settle the plan for multi-coil drop-target devices (DC-05, DC-07), their grounding, wiring gauge, and inter-board daisy-chain connection.

## 3. Decisions (salient design changes)

| ID | Tag | Decision |
|---|---|---|
| D29 | DRIVER · drop-target coil driver | **MOSFET alternative plan:** multi-coil drop-target devices (DC-05 side-by-side, DC-07 inline) are built by daisy-chaining identical single-coil, single-MOSFET (IRLZ44N) driver boards, not dedicated multi-coil boards. One board design serves DC-05/DC-06/DC-07; it scales by adding boards; each board is self-contained (own 1N4007 flyback + fire LED). GATE does not chain — each coil is a unique controller pin. |
| D30 | DRIVER · daisy-chain method | Inter-board rails (+24 V, GND★, GNDREF) are permanent soldered flying leads cut to length (the chain is a permanent assembly). Terminals carry only COIL+/DRAIN (to the solenoid), GATE (to the controller), and the chain-entry feed. Board stays the fixed DC-06 cell footprint (20.3 × 43.2 mm); no multi-coil-board redesign. |
| D31 | GROUNDING · co-located boards | Option B — a local board-level GND★ node per board, daisy-chained across co-located boards, with a single home-run from the chain to the main star ground. Per-coil home-runs are not required at this machine scale (short runs; logic GNDREF already separated from coil GND★; no GND★-referenced analog). |
| D32 | WIRING · 24 V gauge standard | All 24 V wiring (feed, COIL+, DRAIN, GND★, inter-board daisy links) is 18 AWG; digital nets (GATE, GNDREF) are non-critical (24-26 AWG). Basis: drop-target coils are momentary pulse-fire (low duty), so 18 AWG has large margin even for a 3-board chain's cumulative pulse; 18 AWG (0.82 mm²) also seats in the MKDSN 1,5 terminal (≤1.5 mm²). Boundary: holds for pulse-fire drop-target coils only, not a continuous-hold device sharing the rail. |
| D33 | DC-06 board · J2 | Input terminal J2 changed from 2-pin to 3-pin; the added (right-end) pin is the GNDREF daisy pass-through, bonded to the GNDREF pin by an on-board jumper. R5 and LED1 shifted one column with J2; no net change. |

## 4. Work done

| Item | PR / Release |
|---|---|
| DC-06 Drop target (single) perf-board layout — single-coil driver cell, netlist-verified (planar; union-find + jumper-crossing + body-overlap checks); datasheet footprints (IRLZ44N TO-220, 1N4007 DO-41, MKDSN 1,5/4-5,08); draft_board_layout.svg (top x-ray) + draft_board_layout_bottom.svg (solder) | PR #63 · v2026.11.27.1 |
| DC-06 README 20261127-01 — Perf-board layout section (cell parameters, daisy-chain solder points, 18 AWG note) | PR #63 · v2026.11.27.1 |
| Daisy-chain solder points added to the cell: +24 V and GND★ rail taps (◎ markers); GNDREF via J2 pin 3 | PR #63 · v2026.11.27.1 |

## 5. Limits and deferred items

| Item | Detail |
|---|---|
| DC-06 cell | Draft; design is iterative, not frozen. Dashboard "Board layout" is In Progress. |
| Multi-coil boards | DC-05 (2+1) and DC-07 daisy-chained board compositions not yet laid out (next task) |
| RDS(on) at 3.3 V gate | IRLZ44N datasheet doesn't specify RDS(on) at a 3.3 V gate drive (next point up is 4 V: 35 mΩ @ 21 A); fire current and MOSFET heating to be confirmed by bench test once the DC-06 rig is built (carried over) |
| Architecture diagram | system/drawings system-architecture diagram still not redrawn for co-located drivers generally (carried over) |

## 6. Next session

Compose the DC-05 daisy-chained 2-coil + 1-coil boards from the DC-06 cell (shared rails, combined output terminal, daisy-chain solder points); then build the DC-06 bench-test rig and run the RDS(on)/heating bench test against the approved schematic (carried over).
