# Test Card: WS2812B Function and Dome Baseline

**Test ID:** 20261118-01

**Revision:** 20261120-01

**Date:** 2026-11-20

**Device:** Lights common components (DP-31 to DP-41), WS2812B post light with dome cover

**Tester:** Scott

**Supersedes:** 20261118-06 (Setup A, the two-diode 3.8 V direct-drive circuit, deleted from this card and the drawing with Scott's approval 2026-11-20; the circuit is now the 74AHCT125N level-shifter rig; results re-entered from the 2026-11-20 session, except Test 7)

**Circuit:** `test_ws2812b_dome_baseline_circuit.svg` (74AHCT125N level shifter, 5.0 V LED supply)

**Firmware:** [test_ws2812b_dome_baseline_main.c](test_ws2812b_dome_baseline_main.c) (revision 20261120-01; PlatformIO, STM32Cube HAL). This file is the only firmware record; upload it before every run (Step 0)

**Bench tooling:** [test_bluepill_usb_bootloader.md](../../../../system/system_common_components/tests/test_bluepill_usb_bootloader.md) (USB bootloader, upload procedure, platformio.ini)

## Objective

1. Verify WS2812B function (2 disks chained, driven from a Blue Pill pin through a 74AHCT125N level shifter).
2. Identify a baseline color and brightness for the post lights behind the 3D-printed dome.

## Test setup

**Step 0 (before every test run):** upload this test's firmware (section "Reloading this test firmware"). Do not assume the board still holds it: the chip has no version string and its flash cannot be read back. Uploading over the same firmware simply overwrites it. If the board holds OPP or other firmware, first reinstall the USB bootloader (bench tooling card).

| Item | Setup |
|---|---|
| Controller | Blue Pill STM32F103C8T6, USB powered, 72 MHz; STM32duino USB DFU bootloader at 0x08000000, app at 0x08002000 (see the bench tooling card) |
| Data | Board pin B15 (bottom row, pin 4) to U2 74AHCT125N pin 2 (1A); U2 pin 3 (1Y) to D1 DIN; D1 DOUT to D2 DIN. U2 tie-offs per the circuit drawing. No series resistor |
| LED supply | Board pin 5V (USB 5 V) to D1 and D2 5V and U2 pin 14; board pin G to D1 and D2 GND and U2 pin 7. No diodes in the feed. No added capacitors on the disks (each disk carries its own 0.1 uF); C1 across U2 is shown in the drawing as proposed |
| D1 | Under 3D-printed dome |
| D2 | Bare (reference), same color and level as D1 |
| Switch | SW1 between board pin B12 (bottom row, pin 1) and G; internal pull-up |
| Readout | Onboard LED (PC13) blinks the color number, pause, then the brightness number |

Pins are named as printed on the board silkscreen and counted from the USB-C end of the bottom row (B12 = 1, B15 = 4, 5V = 18, G = 19).

**Controls**

| Action | Result |
|---|---|
| Short press (<1 s) | Next brightness level (wraps) |
| Long press (>=1 s) | Next color preset (wraps, level kept) |

After the bootloader's rapid start flashes, PC13 blinks twice (start-up banner: firmware running). SW1 is not read while PC13 blinks the color and level report (up to about 6.7 s); a press during the report is ignored (firmware header, functional note 1).

**Presets** (edit in the firmware source)

| # | Color (R,G,B full scale) | | # | Level (scale of 255) |
|---|---|---|---|---|
| 1 | White (255,255,255) | | 1 | 4 |
| 2 | Warm white approx. (255,147,41) | | 2 | 8 |
| 3 | Red (255,0,0) | | 3 | 16 |
| 4 | Green (0,255,0) | | 4 | 32 (start) |
| 5 | Blue (0,0,255) | | 5 | 64 |
| 6 | Amber (255,191,0) | | 6 | 128 |
| 7 | Cyan (0,255,255) | | 7 | 255 |
| 8 | Magenta (255,0,255) | | | |

Power-up state: color 1, level 4.

## Results

Results are entered by Scott (observations as reported in session, by eye). Pass / Fail left blank for Scott. Results are from the 2026-11-20 session with firmware revision 20261120-01 and the current circuit, except Test 7.

**Brightness condition:** the Test 7 baseline decision was observed at the earlier 3.8 V LED supply (two series diodes, since removed from the rig), not the final 5.0 V. Scott's expectation is that LED brightness will increase significantly at 5.0 V; this is not measured. Test 8 repeats the baseline at 5.0 V.

| Test | Requirement | Result | Pass / Fail |
|---|---|---|---|
| 1 Both disks light at power-up (color 1, level 4) | D1 and D2 both lit, same color, no flicker | Both disks lit white at power-up, same color (brightness described as average, not measured). Flicker not reported. Reported by Scott. | |
| 2 Color order | Each preset shows its named hue on both disks (confirms GRB order) | Color 1 white, 3 red (both disks), 4 green, 5 blue (reported as dim). Color 2 looked white (warm tint not distinguished). Colors 6 to 8 not tested. Reported by Scott. | |
| 3 Brightness steps | 7 distinct steps, D2 tracks D1, no flicker at any step | A short press raised the brightness. Not all 7 steps checked individually; in one run presses at the lowest levels showed no visible change (levels 1 and 2 are 1.6% and 3% of full). D2 tracking D1 and flicker per step not recorded. Reported by Scott. | |
| 4 Switch and readout | Short press changes level, long press changes color, readout blink counts equal the state | Short and long presses both worked. PC13 color counts 1 to 4 matched the color shown (3 red, 4 green). A short press raised the brightness with a matching PC13 level count (7 at full brightness). Presses during the PC13 report are ignored by design (firmware header, functional note 1); early runs missed presses for that reason. Reported by Scott. | |
| 5 Direct 3.3 V data at 5 V supply | No wrong colors or flicker at level 7 over 5 minutes | Not applicable: the direct 3.3 V drive was removed from the rig (level shifter decision, Scott, 2026-11-18; Setup A deleted 2026-11-20). | |
| 6 Supply current at color 1, level 7 (optional, meter in the 5 V lead) | Record value for the 2 disks | | |
| 7 Dome baseline | Record the color # and level # chosen for D1 under the dome, and how it compares with bare D2 | Scott's decision: baseline default post-light setting = color 1 (pure white, 255,255,255) at level 7 (scale 255, maximum brightness). Dome-vs-bare comparison not recorded. Observed at 3.8 V LED supply (see Brightness condition); to be re-confirmed at 5.0 V in Test 8. | |
| 8 Baseline at 5.0 V with 74AHCT125N | LED supply 5.0 V, data from the Blue Pill through a 74AHCT125N (5 V supply, OE tied low). Record the brightness of color 1 at level 7 against the 3.8 V observation; no wrong colors or flicker over 5 minutes | Rig built and running 2026-11-20. Brightness of color 1 at level 7 against the 3.8 V observation, and the 5-minute run, not recorded. | |

## Deviations from the final design

| Item | Rig | Final design | Reason |
|---|---|---|---|
| Programming | USB DFU bootloader (STM32duino generic_boot20_pc13) | OPP firmware / bootloader | Scott's USB-programming preference |
| SPI timing | 4.5 MHz, 5 SPI bits per WS2812B bit (0 = 10000, 1 = 11100) | n/a | Removed D1 color error seen at 2.25 MHz (3 bits per WS bit) |
| Series resistor, added capacitors | None | Values TBD in lights README | Simplest rig |
| Pins | B15 (data), B12 (SW1), PC13 (readout) | Pin assignments in the I/O map of [electrical_master.md](../../../../system/electrical_master.md) | Bench only |
| Firmware | Test firmware, SPI2 timing | OPP firmware | Isolate the LED path |
| Switch input | Direct to board pin, internal pull-up | Generic switch-input schematic | Bench control only |
| 5 V source | USB 5 V from the Blue Pill | Fused 5 V (P-06) | Simplest rig |
| Chain | 2 disks | 3 groups on 3 boards | Test scope |
| Connection | Breadboard wiring | Female-header base | Bench |

## Not verified at this revision

| Item | State |
|---|---|
| Firmware build and flash | Built and uploaded over USB (PlatformIO env bluepill_usb) |
| Cause of the D1 color error at 2.25 MHz SPI timing (rev 20261118-06) | Not established: not the disk (persisted with disks swapped), not the dome, not supply level alone (persisted at 3.8 V). Cleared by the SPI timing change. Not checked with an oscilloscope |
| USB current | Per-LED current is TBD in the lights README; 2 disks are expected to be a small load (estimate, not measured) |
| Disk pad marks and on-board capacitor | Not verified on the BTF-LIGHTING disk |
| LED brightness at 5.0 V | Not measured against the 3.8 V baseline observation; Scott expects a significant increase at 5.0 V (Test 8) |
| Power-up no-start with the LED chain connected | Observed intermittently 2026-11-20 (only the bootloader's rapid flashes, no start-up banner). Not reproduced; cause not identified. A 10 kOhm pull-down on U2 pin 2 made no difference (firmware header, Known Issues) |

## Reloading this test firmware

| Step | Action |
|---|---|
| 1 | Clone the repository and copy `test_ws2812b_dome_baseline_main.c` to `src/main.c` of the Blue Pill bench project (setup in the bench tooling card) |
| 2 | Build env `bluepill_usb` (PlatformIO) |
| 3 | Unplug the Blue Pill USB-C, click Upload, plug the USB-C in, then press reset |
| 4 | Confirm: after the bootloader's rapid flashes PC13 blinks twice (start-up banner), both LEDs show white at level 4, and the short and long presses behave as in the Controls table. The chip has no version string, so this check is the only confirmation that the firmware is loaded |
