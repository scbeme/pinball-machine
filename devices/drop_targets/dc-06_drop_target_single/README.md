# DC-06 Drop target (single)

**Revision:** 20261125-02 · Added bench-test rig pin assignment and schematic reference

**Common design:** see [Drop Targets — Common Components](../common_components/README.md) (supply, sensor, actuator, drive, lifter, blade, mounting, spring attachment, forward bias, protection, coil termination, schematics).

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Single target, top right of playfield (EBD reference layout); drops on hit; resets via solenoid-driven lifter arm |
| Targets (blades) | 1 |
| Magnet | SRENMSMT 6×2 mm |
| Solenoid count | 1 |
| Return spring | McMaster-Carr 9665K84 (catalog data in common components); cut to 55 mm free length (end loops ignored); 60 mm installed length at flush (5 mm extension); 27 mm additional extension from flush to full lift |
| Hall board | 1 channel (common design) |
| Coil board | 1 solenoid circuit |

## Bench test rig — pin assignment

Schematic: [schematic.svg](schematic.svg) — approved 2026-11-25, verified against the DP-28 OPP controller board pinout.

| STM32 (Blue Pill) pin | Signal | Note |
|---|---|---|
| A8 | Coil gate drive | To coil-driver board gate (via 100 Ω series R); matches OPP Drv7/TIM1_CH1 mapping |
| B14 | Hall sensor input | Open-drain US5781 output; uses STM32 internal pull-up (no external conditioning); matches OPP Sw3 mapping |
| B12 | Fire button | Bench rig only, substitutes the physical ball strike for test purposes; not part of the final device; matches OPP Sw1 mapping |
