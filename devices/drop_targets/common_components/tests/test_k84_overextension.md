# Test — 9665K84 Return Spring Overextension

## Header

| Field | Value |
|---|---|
| Date | 2026-10-20 |
| Tester | Scott |
| Devices | DC-05, DC-06, DC-07 (return spring) |

## Setup

- Spring: McMaster-Carr 9665K84 (302 stainless steel, 0.25" OD, 0.015" wire, 20" stock)
- Cut to 55mm free length (end loops ignored)
- Extended to 3× free length: 55mm × 3 = 165mm total length

## Data

| Item | Result |
|---|---|
| Spring after extension | Returns to original form; free length unchanged |
| Cycle count, force readings | Not provided |

## Interpretation

**Scott's conclusion:** 9665K84 is a viable return spring for DC-06 (single) and for DC-05 (7-blade), where the solenoid lifts 2 springs. The spring force can be roughly doubled by shortening the cut, at less than 3× total length.

**Force vs cut length (Claude-calculated; supports cut-length selection and additional testing once the 7-blade bank is built)**

| Cut length (mm) | Flush stretch (mm) | Flush force (lbf) | Raised stretch (mm) | Raised force (lbf) | Raised length ÷ free length |
|---|---|---|---|---|---|
| 55 (tested cut) | 5 | 0.047 | 32 | 0.087 | 1.58× |
| 50 | 10 | 0.056 | 37 | 0.099 | 1.74× |
| 45 | 15 | 0.067 | 42 | 0.115 | 1.93× |
| 40 | 20 | 0.080 | 47 | 0.134 | 2.18× |
| 38 | 22 | 0.086 | 49 | 0.143 | 2.29× |
| 35 | 25 | 0.097 | 52 | 0.159 | 2.49× |
| 30 | 30 | 0.120 | 57 | 0.192 | 2.90× |

| Basis | Value |
|---|---|
| Installed length at flush | 60mm, all cut lengths |
| Lift, flush to full lift | 27mm (raised length 87mm) |
| Force | F = 0.040 lbf + (0.08 ÷ cut length in mm) × stretch in mm |
| Initial tension | 0.040 lbf (McMaster minimum load, 0.04 lb) |
| Rate | 0.004 lbf/in at 20" stock; cut rate = catalog rate × 20" ÷ cut length (McMaster formula) |
| Cut length | Free length, end loops ignored |
| Force at 3× free length | 0.200 lbf for every cut length (stretch = 2 × free length) |
| Limit | Cuts shorter than 29mm (87mm ÷ 3) exceed the tested 3× extension |
| Flush force, 30mm vs 55mm cut | 2.6× |
| Raised force, 30mm vs 55mm cut | 2.2× |

Tags: `RESEARCH` `DECISION` `9665K84` `return-spring` `cut-length` `spring-rate` `fixed-flush-length` `force-vs-cut-length` `DC-05` `DC-06` `rod-load` `spring-overextension-test`

## Supersedes

- None.
