# DP-28 Topedal board

**Revision:** 20261106-02 · **Source:** Topedal OPP Solenoid, Neopixel & Switches Board, Rev 1.1 (12 Jun 2026), as used · 3 identical boards (DP-28A to DP-28C)

## 1. Requirements

| Item | Requirement |
|---|---|
| Functions | 8 low-side solenoid drivers, 8 direct switch inputs, 1 Neopixel output (via level shifter); one Blue Pill (STM32F103C8T6) per board |
| Power | Drivers only: no positive supply, filter or fuse on board. 24 V supply: [DP-29 24 V coil supply](../dp-29_24v_coil_supply/README.md). 5 V: [DP-30 5 V supply](../dp-30_5v_supply/README.md). Logic 3.3 V from the Blue Pill regulator; Blue Pill powered over USB from the host |
| Grounds | GND (coil return) and GNDREF (3V3/5V return) are separate nets on the board, tied at one point externally at the GND bar; tie verified before coil power is applied. GND bar location TBD |
| Board addressing | Each board has a unique, verified chain address before coil power is connected |
| Wiring | Solenoid feed and return 18 AWG; 3 wires of 18 AWG per board from J3 to the GND bar. Connectors TBD |
| Pin assignments | Electrical Master I/O map |

## 2. Mechanical

TBD, defined by CAD.

## 3. Electrical

Schematic: [draft_schematic.svg](draft_schematic.svg) (driver channel map, pin map).

| Ref | Part | Note |
|---|---|---|
| Q1–Q8 | IRLZ44NPbF, TO-220 | Rev 1.1 (was IRL540); sources on GND |
| Rg (R3, R6, R9, R12, R15, R18, R21, R24) | 100 Ω | Gate net to MOSFET gate |
| Rp (R2, R5, R8, R11, R14, R17, R20, R23) | 10 kΩ | Gate net to GND |
| Rd (R1, R4, R7, R10, R13, R16, R19, R22), Dd (D1–D8) | 1 kΩ + 3 mm white LED | Gate net to GND |
| R25, D9 | 1 kΩ, 3 mm green LED | +5 V to GNDREF power indicator at J4 |
| U2 | 3.3 V / 5 V logic level converter module | Pinout must match the drawing |
| J100 | 20-pin and 4-pin 2.54 mm female headers (Blue Pill) | Pins 41–44 physically reversed |
| J1, J2, J3, J7, J8 | 9-pin 3.96 mm headers | |
| J4, J5 / J6 / J9 | 2-pin / 3-pin / 4-pin | J9 is GNDREF only |

No flyback diode on the board: each solenoid has an external 1N400x-class diode.

## 4. Software

Blue Pill firmware and driver map: Software Master. Fire and hold times: Control and Timing Table. No hardware autofire; all solenoid firing runs through the board firmware.

## 5. Acceptance Criteria

TBD
