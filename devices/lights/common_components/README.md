# Lights — common components (DP-31 to DP-41)

**Revision:** 20261106-01 · **CAD base name:** light (variants: light-recessed, light-post)

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
| Per-LED current at full white | Not recorded |
| Data-line series resistor | Not recorded |
| Per-LED decoupling capacitor | Datasheet typical circuit: 100 nF (C1) per LED; whether the disk board includes it: Not recorded |

## 4. Software

TBD

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Quantity | 103 (per CAD) |
| Supply | 5 V (VDD 3.5–5.3 V) |
