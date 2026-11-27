# DC-06 Drop target (single)

**Revision:** 20261127-01 · Added perf-board layout (single-coil driver cell; daisy-chain solder points)

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

## Perf-board layout (single-coil driver cell)

Draft layout of the single-coil low-side MOSFET driver as a reusable **cell**, netlist-verified (planar; union-find, jumper-crossing and body-overlap checks). This one cell is the building block for all drop-target coil drivers — multi-coil devices (DC-05, DC-07) are built by daisy-chaining identical cells rather than dedicated multi-coil boards.

- Top (x-ray): [draft_board_layout.svg](draft_board_layout.svg)
- Bottom (solder / jumpers): [draft_board_layout_bottom.svg](draft_board_layout_bottom.svg)

| Item | Value |
|---|---|
| Board | 0.1" perf, 20.3 × 43.2 mm |
| Q1 | IRLZ44N, TO-220 (low-side) |
| Gate network | R2 100 Ω series, R3 10 kΩ pulldown, R4 100 kΩ backup pulldown |
| Flyback | D2 1N4007 (cathode → +24 V, anode → DRAIN) |
| Fire indicator | LED1 green 3 mm + R5 1 kΩ |
| J1 (power/coil) | MKDSN 1,5/4-5,08: +24 V, COIL+, DRAIN, GND★ |
| J2 (signal) | 3-pin 2.54 mm: GATE, GNDREF, GNDREF-daisy (bonded to GNDREF) |
| Daisy-chain solder points | +24 V and GND★ rail taps (◎ markers); GNDREF via J2 pin 3 |
| Inter-board wiring | Permanent soldered flying leads, 18 AWG for all 24 V nets (digital non-critical) |

Draft — design is iterative; not frozen. See session notes 20261127-01 for the daisy-chain method, grounding (Option B) and the 18 AWG wiring standard.
