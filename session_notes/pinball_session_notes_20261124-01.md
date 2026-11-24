# Pinball Session Notes

**Revision:** pinball_session_notes_20261124-01
**Date:** 2026-11-24

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session | | | |

## 2. Session scope

DC-07 Drop target 4-blade (inline): added the bench test card for the Hall effect sensor perf board v2 (generic A3144 sensors, 4×4mm magnet, 5 V) with the bench setup drawing, board photos and layouts, and the A3144 listing reference. No design document edited.

## 3. Decisions

None. Test result recorded: all four sensors PASS (trigger at approximately 7 mm from the sensor face).

## 4. Work done

| Item | Detail | PR / Release |
|---|---|---|
| Test card | `devices/drop_targets/dc-07_drop_target_bank_inline/tests/test_hall_perf_bd_v2_bench.md` (rev 20261124-01), circuit SVG, 3 photos, 2 layouts, A3144 listing image | this session's PR |

## 5. Limits

| Item | Detail |
|---|---|
| Sensor | The v2 board uses generic A3144 sensors (Amazon), not the US5781 in the Hall board design; recorded as a Deviation |
| Operating voltage | Allegro A3144 datasheet lists 4.5 to 24 V operating supply; D1 drops the 5 V supply to about 4.3 V at the sensors (calculated in test_hall_4x4_magnet_detect, not measured). Measured VDD not recorded in this test |
| Requirement | Numeric pass criterion not stated by Scott; card cites the 2mm designed gap |
