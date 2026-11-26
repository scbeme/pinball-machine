# DP-28 controller board

**Revision:** 20261126-01 · **Source:** OPP Solenoid, Neopixel & Switches reference board, Rev 1.1 (12 Jun 2026), as used · 3 identical boards (DP-28A to DP-28C)

> **Architecture note (2026-11-25):** this is the DP-28 controller board, kept as the OPP reference/bench board (8 on-board drivers). For production the coil drivers are co-located with each device on per-device [coil driver boards](../../../system/system_common_components/coil_driver_board.md), and the controller board keeps the Blue Pill + I/O + Neopixel + per-channel gate outputs. The OPP reference board and the Cobrapin board are the design references. See Electrical Master, Board architecture.

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

### 3.1 Blue Pill board as purchased

Source: Amazon vendor listing (ASIN B0G1S5M8YB), read 2026-11-19. The listing is the only documentation: no board schematic or datasheet exists, and the seller is a reseller, not the manufacturer. The chip is documented by ST (DS5319); the board is not. The seller may change or stop selling this board; the ASIN is not a controlled part source.

Photo of the board as used: [bluepill_board_top.png](bluepill_board_top.png)

| Item | Listing value |
|---|---|
| Seller / brand | EC Buying (ShenZhen EC Buyiing Technology Co). Reseller, not the manufacturer |
| Pack | 3 boards (matches the 3 controller boards, DP-28A to DP-28C) |
| MCU | STM32F103C8T6, ARM Cortex-M3, 72 MHz |
| Memory | 64 KB flash, 20 KB SRAM |
| Supply range (MCU) | 2.0 to 3.6 V |
| Crystal | 4 to 16 MHz (MCU range; board crystal marked 8000 in the project photo, 8 MHz in the bench test card) |
| Reset | POR / PDR |
| USB | Type-C (the listing also says "Micro USB" in one feature bullet; the specification line and the bench board are Type-C) |
| Debug | SWD, 3 wires |
| Headers | 2.54 mm single-row pins, soldered (pins welded) |
| Size / color | 53 mm x 22 mm, blue |

| Not stated by the listing | Status |
|---|---|
| Regulator part and current rating | Unknown |
| Diode between USB VBUS and the 5V pin | Unknown |
| USB D+ pull-up resistor value | Unknown |
| Flash size actually fitted (chip marking vs. 64 KB) | Not verified |
| Whether later shipments match this board | No assurance |

## 4. Software

Blue Pill firmware and driver map: Software Master. Fire and hold times: Control and Timing Table. No hardware autofire; all solenoid firing runs through the board firmware.

### 4.1 Bench programming setup

Diagrams: [ST-Link SWD wiring](interim_bench_stlink_wiring.svg), [USB power chain](interim_bench_usb_power.svg).

| Item | Setup |
|---|---|
| Programmer | ST-Link V2 clone, SWD: SWCLK (pin 2) and SWDIO (pin 4) from the bottom row (2-4-6-8-10), GND on the top row; GND pin and wire colors TBD |
| Wrong row | Signals on the top row 1-3-5-7-9 (RST / SWIM) give "unable to connect to the target" |
| 3.3V wire | Not connected. The Blue Pill is powered from USB only |
| Boot jumpers | BOOT0 = 0, BOOT1 = 0 |
| USB chain | Mac USB-C port, USB-C to USB-A adapter at the Mac, USB-A to USB-C cable to the Blue Pill. Adapter at the Blue Pill end gives 0 V |
| First connect | Approve "Allow accessory to connect" on the Mac. Board appears as `/dev/cu.usbmodem...` (not in Finder) |
| Tools | VS Code with PlatformIO, ARM-native toolchain override `toolchain-gccarmnoneeabi@~1.120301.0` (Apple Silicon) |

## 5. Acceptance Criteria

TBD
