# Lights — common components (DP-31 to DP-41)

**Revision:** 20261113-01 · **CAD base name:** light (variants: light-recessed, light-post)

## 1. Requirements

| Item | Value |
|---|---|
| Devices | DP-31 Bonus rack lights; DP-32 Drop-target ball lamps; DP-33 DELUXE letter lights; DP-34 ABCD lane feature lights; DP-35 Left-lane feature lights; DP-36 Bank shot value lights; DP-37 DELUXE value lights; DP-38 8-ball saucer chain and outlane special lights; DP-39 Bonus, multiplier and shoot-again lights; DP-40 Pop bumper lights; DP-41 General illumination lights |
| Function | Addressable RGB LED (WS2812B); one part for every light; shared electronics across both light types (recessed and post) |
| Quantity | 103 in the CAD (68 recessed, 3 stars, 32 post); group counts and instance IDs (for example DP-38-03) in the Machine Master Device Register and the Device Registry graphic |
| Chain index | A wiring attribute in the Electrical Master I/O map, not part of the instance ID |

## 2. Mechanical

TBD, defined by CAD.

## 3. Electrical

| Item | Design solution |
|---|---|
| LED | BTF-LIGHTING WS2812B, 10 mm, 5 V disk |
| Connection | Female-header connector |
| Data in / out | DIN from the previous LED's DOUT (first LED from the Topedal board Neopixel output, 5 V via the board's level shifter); DOUT to the next LED's DIN |
| Schematic | [draft_schematic.svg](draft_schematic.svg) (single WS2812B LED) |

**WS2812B part specifications (Worldsemi datasheet)**

| Spec | Value |
|---|---|
| Supply VDD | 3.5–5.3 V |
| Data input high, VIH | 0.7 × VDD |
| Data input low, VIL | 0.3 × VDD |
| Data rate | 800 kbps |
| Data format | 24-bit, GRB order, MSB first |
| T0H / T0L | 0.4 µs / 0.85 µs (±150 ns) |
| T1H / T1L | 0.8 µs / 0.45 µs (±150 ns) |
| Reset time | >50 µs |
| Operating temperature | −25 to +80 °C |
| Input voltage VI, absolute maximum | −0.5 V to VDD + 0.5 V (Worldsemi V1.0, Jan 2016 datasheet; unverified for the BTF disk) |
| Per-LED current at full white | 60 mA design value (unverified). Worldsemi V1.0 lists 16 mA for the red channel; green and blue values TBD |
| Data-line series resistor | Not recorded |
| Per-LED decoupling capacitor | Datasheet typical circuit: 100 nF (C1) per LED; whether the disk board includes it: Not recorded |

**LED wiring terminal block (generic 2.54 mm screw terminal, 4 positions: 5V, GND, DIN, DOUT)**

Source: seller listing and drawings (Amazon, "2.54mm 0.1" Pitch PCB Mount Screw Terminal Block, 10P"). No manufacturer datasheet exists. Every value below is a seller claim and is **unverified** unless stated.

| Parameter | Value | Status |
|---|---|---|
| Part | Generic 2.54 mm (0.1") pitch PCB-mount screw terminal block, 10-pin, supplied 10 pieces per pack | Unverified |
| Pitch | 2.54 mm | Unverified |
| Wire range, one wire per opening | 26–18 AWG | Unverified |
| Wire range, two wires per opening | 22 AWG maximum (0.34 mm² each); seller gives no two-wire rating. Basis: Phoenix Contact MPT 0,5/4-2,54 datasheet (2 conductors of the same size, 0.14 to 0.34 mm²) | Unverified, pending test fit |
| Rated voltage | 150 V | Unverified |
| Rated current | 6 A (7 A instantaneous) | Unverified |
| Design current limit per pin | 2 A. Basis: CUI TBL003-254 UL rating (2 A, IEC 6 A). Pass-through current (Vin wire to Vout wire) counts | Unverified |
| Contact resistance | TBD (a generic 0.1" screw terminal lists 20 mΩ) | TBD |
| Wire strip length | TBD | TBD |
| Conductor | Tin-plated copper (seller title says tinned brass) | Unverified |
| Insulation | PA66, UL94 V-0 | Unverified |
| Operating temperature | −40 to +105 °C | Unverified |
| Screw / torque | M1.6, 0.1 maximum (torque unit not stated) | Unverified |
| PCB hole | Ø1.30 mm on 2.54 mm pitch | Unverified (seller drawing) |
| Pin | 0.8 mm wide, 0.50 mm thick, 3.5 mm below the body | Unverified (seller drawing) |
| Body | 8.80 mm tall, 6.30 mm deep, length (positions × 2.54) + 0.40 mm | Unverified (seller drawing) |
| Pack size vs need | Pack is 10-position; 4-position needed. Whether blocks separate or can be cut: TBD (a seam is visible between positions 5 and 6 in the seller images) | TBD |

**5V / GND wiring**

| Item | Value | Status |
|---|---|---|
| Terminal use | One 4-position block per LED node. The 5V position takes both the incoming and outgoing 5V wires; the GND position takes both the incoming and outgoing GND wires | Scott |
| Wire size at the terminal | 22 AWG for 5V and GND (largest that fits two per opening) | Unverified, pending test fit |
| DIN / DOUT wire | 24–26 AWG | Unverified |
| Drop budget | 0.25 V round trip from the 5.0 V rail to any LED. Reason: VI maximum is VDD + 0.5 V and the 74AHCT125N drives data at 5.0 V | Unverified |
| Current entering a segment | LEDs downstream × 60 mA design value (for example 30 LEDs = 1.8 A) | Unverified |
| LEDs downstream of any terminal | 30 or fewer, so pass-through current stays at or below the 2 A design limit per pin | Unverified |
| Segment limit, 22 AWG | 2.4 A·m for the 0.25 V drop budget | Unverified |
| 5V feed points and feeder wire size | TBD (an 18 AWG feeder cannot share an opening with a second wire) | TBD |
| LED group size and chain order | TBD | TBD |
| Firmware brightness cap | TBD | TBD |

## 4. Software

TBD

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Quantity | 103 (per CAD) |
| Supply | 5 V (VDD 3.5–5.3 V) |
| Terminal two-wire fit | Two 22 AWG wires fit in one terminal opening and pass a pull test. Result: TBD |
