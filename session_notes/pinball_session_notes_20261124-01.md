# Pinball Session Notes

**Revision:** pinball_session_notes_20261124-01
**Date:** 2026-11-24

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session | | | |

## 2. Session scope

DC-07 Drop target 4-blade (inline): added the bench test card for the Hall effect sensor perf board v2 (generic A3144 sensors, 4×4mm magnet, 5 V) with the bench setup drawing, board photos and layouts, and the A3144 listing reference. Design documents revised (D14): drop targets common components README (rev 20261124-01) and DC-07 README (rev 20261124-01).

## 3. Decisions

| ID | Decision |
|---|---|
| D14 | Drop target Hall board: the US5781 design (D1 = 1N4007) stays the preferred design. A3144 added as an alternate design with D1 = 1N5817 (VDD 4.68 V or more against the A3144 4.5 V minimum). Both designs use the 5 V supply (P-06). More US5781 sensors to be ordered from Mouser (Scott) |

Test result recorded: all four sensors PASS (trigger at approximately 7 mm from the sensor face).

## 4. Work done

| Item | Detail | PR / Release |
|---|---|---|
| Test card | `devices/drop_targets/dc-07_drop_target_bank_inline/tests/test_hall_perf_bd_v2_bench.md` (rev 20261124-01), circuit SVG, 3 photos, 2 layouts, A3144 listing image | this session's PR |

## 5. Limits

| Item | Detail |
|---|---|
| Sensor | The v2 board uses generic A3144 sensors (Amazon), not the US5781 in the Hall board design; recorded as a Deviation |
| Operating voltage | A3144 operating supply minimum 4.5 V (Allegro); the v2 board as tested (D1 = 1N4007) has 4.3 V at the sensors, so the PASS was obtained below that minimum. The 1N5817 swap (D14) is not yet fitted or tested |
| Requirement | Numeric pass criterion not stated by Scott; card cites the 2mm designed gap |
