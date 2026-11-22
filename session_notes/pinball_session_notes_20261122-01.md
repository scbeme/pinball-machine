# Pinball Session Notes

**Revision:** pinball_session_notes_20261122-01
**Date:** 2026-11-22

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session | | | |

## 2. Session scope

DC-07 Drop target 4-blade (inline): added the 4-blade bench test card and drawings, device specs and assembly sequence; revised the device name; set the solenoid count; added test requirements and Pass/Fail. One design change (solenoid count = 2), Scott-approved in chat.

## 3. Decisions

| ID | Decision |
|---|---|
| D12 | DC-07 solenoid count = 2, one at each end of the bank (locations 1 and 4). Basis: 4-blade bench test — 2 solenoids raise all 4 blades (PASS); 1 solenoid cannot (FAIL), marginal at 3, PASS at 2 |
| D13 | DC-07 device name revised to "Drop target 4-blade (inline)" (text only; folder path `dc-07_drop_target_bank_inline` unchanged) |

## 4. Work done

| Item | Detail | PR / Release |
|---|---|---|
| Test card | `tests/test_drop_target_4blade_two_solenoid_lift.md` + 4 drawings (design views, rear view, Hall perf bd, solenoid perf bd) | #47 |
| Specs + assembly | DC-07 README: spring 37 mm w/ loops, 3 mm×150 mm SS axle, M3×10 mount screws (M3×12 + 2 washers sub), M3×20 leveling screw; 8-step assembly sequence | #47 |
| Device name | Revised to "Drop target 4-blade (inline)" across repo | #48 |
| Folder rename revert | Unapproved folder rename reverted; path restored | #49 |
| Solenoid count + requirements | README 20261122-02 (count = 2); test card 20261122-02 (two requirements + Pass/Fail) | #50 |
| Releases | `v2026.11.21.3` → `v2026.11.22.1` (PRs #47-49) → `v2026.11.22.2` (PR #50, Latest) | — |

## 5. Test results (12 V bench supply)

| Requirement | Result | Pass/Fail |
|---|---|---|
| 2 solenoids @ 24 V (max) raise 4 blades | All 4 blades consistently raised (2 solenoids, loc 1 & 4) | PASS |
| Hall effect sensor triggers at blade flush | Triggers at flush | PASS |

## 6. Limits / notes

| Item | State |
|---|---|
| Requirement vs evidence | Requirement (1) stated at 24 V (max); bench evidence at 12 V. Recorded as a 12 V→24 V deviation in the card. A 24 V retest is optional, Scott's call |
| Screenshots | Moi 3D design screenshots kept in the repo (Scott directed), beside the test card |
| Process note | Claude renamed the DC-07 device folder on the name change (unapproved structure change); reverted in PR #49. Rule reaffirmed: a name change edits text only; no folder/file path rename without Scott's approval |
| Pages deploy | On a deploy failure, trigger a fresh `workflow_dispatch` run (not a job rerun, which duplicates the `github-pages` artifact) |
