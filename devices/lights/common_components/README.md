# Lights — common components (DP-31 to DP-41)

**Revision:** 20261118-01 · **CAD base name:** light (variants: light-recessed, light-post)

## 1. Requirements

| Item | Value |
|---|---|
| Devices | DP-31 Bonus rack lights; DP-32 Drop-target ball lamps; DP-33 DELUXE letter lights; DP-34 ABCD lane feature lights; DP-35 Left-lane feature lights; DP-36 Bank shot value lights; DP-37 DELUXE value lights; DP-38 8-ball saucer chain and outlane special lights; DP-39 Bonus, multiplier and shoot-again lights; DP-40 Pop bumper lights; DP-41 General illumination lights |
| Function | Addressable RGB LED (WS2812B); one part for every light; shared electronics across both light types (recessed and post) |
| Quantity | 103 in the CAD (68 recessed, 3 stars, 32 post); group counts and instance IDs (for example DP-38-03) in the Machine Master Device Register and the Device Registry graphic |
| Chain index | A wiring attribute in the Electrical Master I/O map, not part of the instance ID |

## 2. Mechanical

Geometry is defined by CAD (Scott's STEP export, 2026-11-14; not stored in the repository). Values below are read from that export unless marked.

| Item | Value |
|---|---|
| Assembly envelope | 28.000 mm × 19.642 mm (X × Y); about 6.9 mm in Z |
| Assembly parts | WS2812B disk (Ø9.5 mm, 2.6 mm thick, on 1.2 mm PCB), 2 ea. 3-position 0.1" terminal block, 0.1 µF capacitor, bracket |
| Mounting | Bracket to the underside of the playfield; LED center on the light's playfield hole |
| Fastener | #2 × 5/8" sheet metal screw, 0.0635 pilot (inches assumed); McMaster-Carr 92470A101 (Scott; unverified) |

## 3. Electrical

| Item | Design solution |
|---|---|
| LED | BTF-LIGHTING WS2812B, 10 mm, 5 V disk |
| Connection | Female-header connector |
| Data in / out | DIN from the previous LED's DOUT (first LED of each group from its Topedal board Neopixel output, 5 V via the board's level shifter); DOUT to the next LED's DIN |
| Data topology | 3 LED groups, one per Topedal board (the design uses 3 Topedal boards). Each group is one daisy chain on that board's Neopixel output (PB15 to J6) |
| Schematic | [draft_schematic.svg](draft_schematic.svg) (single WS2812B LED) |

**WS2812B disk specifications (BTF-LIGHTING WS2812BLEDW-W100pcs)**

Source: Amazon listing "Product information" and "Parameter Table" (ASIN B01DC0J0WS), two screenshots supplied by Scott 2026-11-18, and retailer pages that repeat the listing (country of origin, package size). No BTF-LIGHTING datasheet has been supplied or found. Every value below is a seller claim and is **unverified**. The Worldsemi chip datasheet values are kept separately in the chip reference below because they describe the chip, not the disk as sold.

| Parameter | Value | Status |
|---|---|---|
| Brand / manufacturer | BTF-LIGHTING / BTF-LIGHTING Technology Co., Limited | Unverified |
| Model / manufacturer part number | WS2812BLEDW-W100pcs | Unverified |
| ASIN / UPC | B01DC0J0WS / 602938070492 | Unverified |
| Country of origin | China | Unverified (retailer page) |
| LED type / IC | WS2812B RGB LED pixel, WS2812B IC, 5050SMD lamp bead, individually addressable, DIY use | Unverified |
| Color | Full color, 24-bit | Unverified |
| Color order | GRB (not RGB) | Unverified |
| Wavelength | Red 620–630 nm; green 515–530 nm; blue 465–475 nm | Unverified |
| FPCB board color | Black or white (listing offers both; which was ordered: not recorded) | Unverified |
| Pack size | 100 (listing: Number of Light Sources 100, Unit Count 100; Parameter Table: 100 pcs / 200 pcs) | Unverified |
| Supply | Input voltage DC 5 V; supply range not stated | Unverified |
| Recommended power supply | DC 5 V, 6 A; supply and controller not included. The listing does not say for how many LEDs | Unverified |
| Operating temperature | −20 to +40 °C (−4 to 104 °F) | Unverified |
| Included | 1 × 3-pin SM male connector; no power supply or controller | Unverified |
| Package size / weight | 4.72 × 3.94 × 0.59 in (12 × 10 × 1.5 cm, retailer page) / 1.06 oz. The listing does not say whether this is the pack or the disk; the figures match a pack of 100 | Unverified |
| Indoor / outdoor | Header says Outdoor; Parameter Table says waterproof level IP30. The two conflict; not resolved | Unverified |
| Connection | Solder only (Parameter Table notice) | Unverified |
| White brightness | 1750 lumens. Basis not stated; not used in the design | Unverified |
| Per-LED current at full white | 60 mA design value (not from the listing) | Unverified |
| Per-LED decoupling capacitor | 0.1 µF per assembly (Scott; part number and type not recorded). Whether the disk board includes one: Not recorded | Unverified |
| Data-line series resistor | Not recorded | TBD |
| Supply voltage range, data input thresholds, data rate, bit timing, reset time, absolute maximum input voltage | Not in the listing | TBD |
| Disk diameter and thickness | Not in the listing (CAD uses Ø9.5 mm × 2.6 mm on a 1.2 mm PCB) | TBD |

Listing fields that do not apply to this part and are not recorded: Controller Type (Amazon Alexa), Control Method (App), Connectivity (Wi-Fi), Bulb Shape (T).

**WS2812B chip reference (Worldsemi datasheet V1.0, Jan 2016): chip values, not the BTF disk**

Reference only. These describe the Worldsemi chip and are unverified for the BTF-LIGHTING disk above; the disk table controls. Restored 2026-11-18 at Scott's direction.

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
| Input voltage VI, absolute maximum | −0.5 V to VDD + 0.5 V |
| Current, red channel | 16 mA (green and blue values TBD) |
| Typical circuit decoupling | 100 nF (C1) per LED |

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
| Drop budget | 0.25 V round trip from the 5.0 V rail to any LED. Reason: VI maximum is VDD + 0.5 V (Worldsemi chip reference; unverified for the disk). The 74AHCT125N drives data at 5.0 V | Unverified |
| Current entering a segment | LEDs downstream × 60 mA design value (for example 30 LEDs = 1.8 A) | Unverified |
| LEDs downstream of any terminal | 30 or fewer, so pass-through current stays at or below the 2 A design limit per pin | Unverified |
| Segment limit, 22 AWG | 2.4 A·m for the 0.25 V drop budget | Unverified |
| Group count | 3, one per Topedal board | Scott |
| LEDs per group | About 34 (101 to 103 LEDs divided by 3); exact balance TBD | Unverified |
| 5V feed points per group | At least 2: a head feed plus one mid-group injection, so no segment carries more than 30 LEDs downstream (34 LEDs at 60 mA is 2.04 A, over the 2 A per-pin design limit). Feed locations TBD | Unverified |
| Feeder wire size | TBD (an 18 AWG feeder cannot share an opening with a second wire) | TBD |
| Group-to-board assignment | TBD (each group to be a physical region; assignment by device group DP-31 to DP-41 TBD) | TBD |
| Chain order within each group | TBD | TBD |
| MPF/OPP light numbering across 3 boards | TBD (forum examples show card-based numbering such as 1-0-0; not verified against OPP documentation) | Unverified |
| Firmware brightness cap | TBD | TBD |

## 4. Software

TBD

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Quantity | 103 (per CAD) |
| Supply | 5 V (listing: DC 5 V; chip reference VDD 3.5–5.3 V, unverified for the disk) |
| Terminal two-wire fit | Two 22 AWG wires fit in one terminal opening and pass a pull test. Result: TBD |
