# Test — Drop Target Single-Blade Module Solenoid Voltage and Current

## Header

| Field | Value |
|---|---|
| Date | 2026-10-31 |
| Tester | Scott |
| Devices | DC-07 (1-blade module prototype of the 4-blade inline drop target; 1.3" module width) |

## Setup

- Single-blade module prototype (repeatable module for the 4-blade inline target), 1 solenoid, 1 blade
- Solenoid: JF-1039B, plunger return spring and C-clip removed
- Return spring: McMaster-Carr 9665K84 (0.25" OD), 38mm free length (end loops excluded)
- Supply: regulated bench supply (default test setup until the machine power supply is designed and tested)
- Drive: constant DC switched on and held for approximately 500 ms, then released (no PWM hold)

## Data

| Item | Result |
|---|---|
| Supply voltage range, functional | Approximately 8 V to 12 V DC |
| Solenoid current at 8 V | Approximately 1.5 A (one solenoid) |
| 12 V was more than enough | Yes (Scott) |
| Hold duration giving best operation | Voltage applied long enough for the blade to stabilize at the apex (22mm) before dropping to 20mm |

| Item | Result |
|---|---|
| Current at voltages other than 8 V, behavior below 8 V, and behavior above 12 V | Not provided |

## Interpretation

- The module functions from about 8 V to 12 V with the plunger spring and C-clip removed and the 38mm 9665K84 return spring.
- Operation is reliable without the OEM plunger return spring; this configuration is the default solenoid configuration for all drop targets.
- Single-blade module only; the 4-blade assembly has not been built or tested.

## Supersedes

- None. Configuration differs from test_drop_target_solenoid_voltage.md (OEM plunger spring retained, 55mm return spring, 7–10 V range); that doc remains the record for its configuration.
