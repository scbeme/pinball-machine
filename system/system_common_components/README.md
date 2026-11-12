# System common components

**Revision:** 20261112-01 · **Date:** 2026-11-12

**Rule:** A part used by two or more device groups is specified once, here. Device READMEs link to it and do not copy it.

## Functions, constraints, parameters

| Part | Used by | Specification |
|---|---|---|
| GoHz M12 inductive proximity sensor | DP-18 Rollover sensor, DB-01 Scoop/hole, DB-03 Ball trough, DB-04 Shooter lane ball-present sensor | [gohz_m12_inductive_sensor.md](gohz_m12_inductive_sensor.md) |
| Houocon stainless steel cable tie | DP-01 Standup targets, DP-19 Standup target (single), DC-05, DC-06 and DC-07 drop targets, DP-09 Flipper buttons | [houocon_stainless_cable_tie.md](houocon_stainless_cable_tie.md) |

**Listed as system common, no specification file yet** (audit result, pending Scott's confirmation): JF-1039B solenoid, 1N400x-class diode, McMaster-Carr 1173N O-rings, cable-tie leaf switch.

**Generic switch-input schematic** (system common for DP-09, DP-12, DP-20, DP-21, DP-24; also DP-01 and DP-19 per the workflow): not yet drawn.

## Tests

| Test card | Subject |
|---|---|
| [test_jf1039b_plunger_spring.md](tests/test_jf1039b_plunger_spring.md) | JF-1039B plunger return spring force vs shaft position |
| [test_solenoid_heating.md](tests/test_solenoid_heating.md) | Solenoid fire modes and heating (JF-1039B bench rig) |
| [test_1173n21_modulus.md](tests/test_1173n21_modulus.md) | 1173N21 O-ring Young's modulus |
| [test_1173n223_resilience.md](tests/test_1173n223_resilience.md) | 1173N223 O-ring resilience |
| [test_rubber_band_single_strand.md](tests/test_rubber_band_single_strand.md) | Rubber band single strand, force vs stretch |
