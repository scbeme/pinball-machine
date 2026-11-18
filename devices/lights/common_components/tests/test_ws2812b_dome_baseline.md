# Test Card: WS2812B Function and Dome Baseline

**Test ID:** 20261118-01

**Revision:** 20261118-05

**Date:** 2026-11-18

**Device:** Lights common components (DP-31 to DP-41), WS2812B post light with dome cover

**Tester:** Scott

**Supersedes:** none (earlier revisions were local drafts, never published)

**Circuit:** `test_ws2812b_dome_baseline_circuit.svg` (Setup A: 2-diode, 3.8 V, as tested 2026-11-18. Setup B: 74AHCT125N, 5.0 V, added 2026-11-18, not yet built; once Setup B is verified Setup A can likely be deleted)

**Firmware:** [test_ws2812b_dome_baseline_main.c](test_ws2812b_dome_baseline_main.c), tag `fw-ws2812b-test-20261118-01` (PlatformIO, STM32Cube HAL)

**Bench tooling:** [test_bluepill_usb_bootloader.md](../../../../system/system_common_components/tests/test_bluepill_usb_bootloader.md) (USB bootloader, upload procedure, platformio.ini)

## Objective

1. Verify WS2812B function (2 disks chained, driven directly from a Blue Pill pin).
2. Identify a baseline color and brightness for the post lights behind the 3D-printed dome.

## Test setup

| Item | Setup |
|---|---|
| Controller | Blue Pill STM32F103C8T6, USB powered, 72 MHz; STM32duino USB DFU bootloader at 0x08000000, app at 0x08002000 (see the bench tooling card) |
| Data | Board pin B15 (bottom row, pin 4) to D1 DIN; D1 DOUT to D2 DIN. 3.3 V data, no level shifter, no series resistor |
| LED supply | Board pin 5V (USB 5 V) through two 1N4007 in series (band toward the disks; 3.8 V measured at the disks, 4.5 V with one diode) to D1 and D2 5V; board pin G to D1 and D2 GND. No added capacitors (each disk carries its own 0.1 uF) |
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

Results are entered by Scott (observations as reported in session, by eye). Pass / Fail left blank for Scott. Tests 3 to 6 not run; Test 7 holds Scott's baseline decision.

**Brightness condition:** the brightness observed in this card, including the Test 7 baseline, was at the reduced LED supply of 3.8 V (two series 1N4007), not the final 5.0 V. Scott's expectation is that LED brightness will increase significantly at 5.0 V; this is not measured. Test 8 repeats the baseline at 5.0 V.

| Test | Requirement | Result | Pass / Fail |
|---|---|---|---|
| 1 Both disks light at power-up (color 1, level 4) | D1 and D2 both lit, same color, no flicker | Run A (2.25 MHz SPI timing): D1 green-tinted, D2 white; unchanged with disks swapped, diode added, supply 3.8 V. Run B (4.5 MHz SPI timing, 0-bit 0.22 us / 1-bit 0.67 us): both white. Flicker not reported. Reported by Scott. | |
| 2 Color order | Each preset shows its named hue on both disks (confirms GRB order) | Run A: D1 pale green on red, pale blue on blue, D2 correct. Run B: color 2 white with slight tint shift on both; color 3 both red, 4 both green, 5 both blue. Colors 6 to 8 not tested. Reported by Scott. | |
| 3 Brightness steps | 7 distinct steps, D2 tracks D1, no flicker at any step | | |
| 4 Switch and readout | Short press changes level, long press changes color, readout blink counts equal the state | | |
| 5 Direct 3.3 V data at 5 V supply | No wrong colors or flicker at level 7 over 5 minutes | Not run. Level shifter decision (Scott, 2026-11-18): 74AHCT125N; the 5 V supply check is Test 8 | |
| 6 Supply current at color 1, level 7 (optional, meter in the 5 V lead) | Record value for the 2 disks | | |
| 7 Dome baseline | Record the color # and level # chosen for D1 under the dome, and how it compares with bare D2 | Scott's decision: baseline default post-light setting = color 1 (pure white, 255,255,255) at level 7 (scale 255, maximum brightness). Dome-vs-bare comparison not recorded. Observed at 3.8 V LED supply (see Brightness condition); to be re-confirmed at 5.0 V in Test 8. | |
| 8 Baseline at 5.0 V with 74AHCT125N (circuit Setup B) | LED supply 5.0 V, data from the Blue Pill through a 74AHCT125N (5 V supply, OE tied low). Record the brightness of color 1 at level 7 against the 3.8 V observation; no wrong colors or flicker over 5 minutes | Not run. To be run when the 74AHCT125N is received (Scott to order) | |

## Deviations from the final design

| Item | Rig | Final design | Reason |
|---|---|---|---|
| Data level | 3.3 V direct, no level shifter; LED supply lowered to 3.8 V with two series 1N4007 | Level shifted to 5 V with a 74AHCT125N (Scott, 2026-11-18) | Simplest rig; keep the data-high threshold (0.7 x VDD) near 2.7 V |
| LED supply and brightness | 3.8 V at the disks; brightness observed at 3.8 V | 5.0 V (P-06); brightness expected to be significantly higher (Scott; not measured) | Lowered so 3.3 V data stays within the data-high threshold; see Test 8 |
| Programming | USB DFU bootloader (STM32duino generic_boot20_pc13) | OPP firmware / bootloader | Scott's USB-programming preference |
| SPI timing | 4.5 MHz, 5 SPI bits per WS2812B bit (0 = 10000, 1 = 11100) | n/a | Removed D1 color error seen at 2.25 MHz (3 bits per WS bit) |
| Series resistor, added capacitors | None | Values TBD in lights README | Simplest rig |
| Pins | B15, B12, onboard LED | Topedal assignments | Bench only |
| Firmware | Test firmware, SPI2 timing | OPP firmware | Isolate the LED path |
| Switch input | Direct to board pin, internal pull-up | Generic switch-input schematic | Bench control only |
| 5 V source | USB 5 V from the Blue Pill | Fused 5 V (P-06) | Simplest rig |
| Chain | 2 disks | 3 groups on 3 boards | Test scope |
| Connection | Breadboard wiring | Female-header base | Bench |

## Not verified at this revision

| Item | State |
|---|---|
| Firmware build and flash | Built and uploaded over USB (PlatformIO env bluepill_usb) |
| Cause of the Run A D1 error | Not established: not the disk (persisted with disks swapped), not the dome, not supply level alone (persisted at 3.8 V). Cleared by the SPI timing change. Not checked with an oscilloscope |
| USB current | Per-LED current is TBD in the lights README; 2 disks are expected to be a small load (estimate, not measured) |
| Disk pad marks and on-board capacitor | Not verified on the BTF-LIGHTING disk |
| LED brightness at 5.0 V | Not measured. Observed at 3.8 V only; Scott expects a significant increase at 5.0 V (Test 8) |

## Reloading this test firmware

| Step | Action |
|---|---|
| 1 | Clone the repository and copy `test_ws2812b_dome_baseline_main.c` to `src/main.c` of the Blue Pill bench project (setup in the bench tooling card) |
| 2 | Build env `bluepill_usb` (PlatformIO) |
| 3 | Unplug the Blue Pill USB-C, click Upload, plug the USB-C in, then press reset |
| 4 | Confirm: power-up shows both LEDs white at level 4 and the short and long presses behave as in the Controls table. The chip has no version string, so the firmware tag is recorded in the session notes |
