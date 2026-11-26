# Pinball Session Notes

**Revision:** pinball_session_notes_20261126-01
**Date:** 2026-11-26

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. Deferred items (below) are picked up when their design tasks start (Scott) | | | |

## 2. Session scope

OPP-compatible STM32 I/O map for the DP-28A, DP-28B and DP-28C Controller boards, audited against the OPP pin assignments and the board silkscreen; DC-02 Slingshots switch count and trigger; dashboard status of the I/O map.

## 3. Decisions (salient design changes)

| ID | Tag | Decision |
|---|---|---|
| D26 | I/O MAP · DP-28 Controller board | I/O map approved with open notes (Electrical Master, I/O map section): all inputs direct; Blue Pill pins named as printed on the board silkscreen; SWIO and SWCLK are configured by OPP firmware and stay unwired to devices. |
| D27 | DC-02 Slingshots · switches | Two leaf switches per slingshot (DC-02A Slingshot L, DC-02B Slingshot R). Either switch closing on ring deflection makes the controller board firmware fire the solenoid; no hardware autofire. |
| D28 | DASHBOARD · status rule | A document section holding a "Not assigned" subheading shows In Progress. System "I/O map" and Controllers & Power "I/O map (all boards)" are In Progress. |

## 4. Work done

| Item | PR / Release |
|---|---|
| electrical_master.md 20261126-01 (new I/O map section) | PR #59 · v2026.11.26.1 |
| DP-28 Controller board: photo bluepill_board_top.png (new) and README link, 20261126-01; photo link checked in the dashboard | PR #59 · v2026.11.26.1 |
| DC-02 Slingshots README 20261126-01 (two leaf switches) | PR #59 · v2026.11.26.1 |
| DC-02 Slingshots control_logic.md 20261126-01 (trigger) | PR #60 · v2026.11.26.2 |
| scan.py status rule and github_workflow.md 20261126-01 (section 4) | PR #61 · v2026.11.26.3 |
| Admin: GitHub audit found no incorrect entries, nothing removed (account tokens, keys and apps not checked); older branches kept (workflow section 14) | — |
| Admin: MacBook Air clone commit email set to the GitHub noreply address; clone pulled to main | — |

## 5. Limits and deferred items

| Item | Detail |
|---|---|
| I/O map, not assigned | DP-03 Spinner and DP-04 Tilt sensor (sensor undefined); DB-02 Ball lock (quantity 0–1); K1 coil-rail cutoff and 24 V rail-current detect (no pins); DP-22 Volume control and DP-23 Monitor menu joystick (to host); DP-31 to DP-41 lights (LED chain index) |
| I/O map, assumptions | Listed under Open notes in the Electrical Master I/O map section |
| I/O map status | Returns to Complete only when the "Not assigned" subsection is removed, including its DP-22 Volume control and DP-23 Monitor menu joystick "To host" entry |
| Dashboard link | Controllers & Power "I/O map (all boards)" opens the top of the Electrical Master, not the I/O map section |
| scan.py | Not run on the MacBook Air (no folder connected); the GitHub check passed on PRs #59 to #61 |
| RDS(on) at 3.3 V gate | IRLZ44N datasheet doesn't specify RDS(on) at a 3.3 V gate drive (next point up is 4 V: 35 mΩ @ 21 A); fire current and MOSFET heating to be confirmed by bench test once the DC-06 Drop target (single) rig is built (carried over) |
| Board layout | DC-06 Drop target (single) schematic is the bench-test-rig circuit; not yet laid out as a perf board/PCB (carried over) |
| Architecture diagram | system/drawings system-architecture diagram still not redrawn for co-located drivers generally (carried over) |

## 6. Next session

Build the DC-06 Drop target (single) bench-test rig (breadboard + perf board) and run the RDS(on)/heating bench test against the approved schematic (carried over).
