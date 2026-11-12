# Test — Drop Target Solenoid Voltage Range (Single Blade)

## Header

| Field | Value |
|---|---|
| Date | 2026-10-20 |
| Tester | Scott |
| Devices | DC-06 (single-blade prototype) |

## Setup

- Single-blade drop target prototype
- Solenoid: JF-1039B, 1 solenoid
- Plunger spring: OEM, retained
- Return spring: McMaster-Carr 9665K84, 55mm free length (end loops ignored)
- Supply: bench power supply

## Data

| Supply voltage | Result |
|---|---|
| Below 7 V | Solenoid does not move / operate |
| 7 V to 10 V | Drop target functions correctly |
| Above 10 V | Blade rises too high: solenoid force accelerates the blade too much, the spring connection gets stuck in the housing slot, and the blade departs the lifter arm |

| Item | Result |
|---|---|
| Blade lift height, fire duration, current at each voltage | Not provided |

## Interpretation

- DC-06 operates correctly with a 7–10 V supply to the solenoid with the 55mm 9665K84 return spring.
- The upper limit is set by blade overtravel, not by a solenoid limit.
- Plunger spring removal is preferred, to eliminate geometry conflicts between the plunger spring, the C-clip and the lifter arm. The OEM plunger spring was retained for this test.

## Supersedes

- None.
