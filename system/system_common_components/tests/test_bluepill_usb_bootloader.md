# Test Card: Blue Pill USB Bootloader and USB Upload

**Test ID:** 20261118-02

**Revision:** 20261119-01

**Date:** 2026-11-19

**Device:** Blue Pill STM32F103C8T6 (USB-C board) bench controller (system common; not a machine device)

**Tester:** Scott

**Supersedes:** 20261118-02 (correction, Scott 2026-11-19: OPP was never loaded on the bench board; the History row is corrected, no test content changed)

**Tooling files:** [platformio.ini](test_bluepill_usb_bootloader_platformio.ini), [flash script](test_bluepill_usb_bootloader_flash.py), [DFU upload script](test_bluepill_usb_bootloader_dfu_upload.py), [linker script](test_bluepill_usb_bootloader_app2000.ld)

## Objective

Load firmware onto the Blue Pill over its USB-C port, without an ST-Link, as a modern board would. Scott's criterion: USB programming must work like a modern board; otherwise revert to an ESP32.

## Test setup

| Item | Setup |
|---|---|
| Board | Blue Pill STM32F103C8T6, USB-C, 8 MHz crystal, stock |
| One-time installer | ST-Link V2 clone, SWD (SWCLK, SWDIO, GND), OpenOCD through PlatformIO. Not needed after the install |
| Host | MacBook Air, PlatformIO in VS Code, USB-C to the Blue Pill through a USB-C to A adapter and an A to C cable |
| USB bootloader | STM32duino-bootloader, `bootloader_only_binaries/generic_boot20_pc13.bin`, 7172 bytes, flashed at 0x08000000 (source repository rogerclarkmelbourne/STM32duino-bootloader, commit df689808b6030280480c0d151ee9c552ecf6b405, SHA-256 8738933a44363f2a3597c7bd6e13afb892b2a4ed304372c31e758745b23b903c). The binary is third-party and is not stored in this repository |
| Application | Linked at 0x08002000 (56 KB, 20 KB RAM), vector table relocated with `-DAPP_VTOR_OFFSET=0x2000U` |
| USB upload | dfu-util from PlatformIO, USB ID 1eaf:0003, alternate setting 2 |
| Bootloader behavior | Blinks PC13 and waits briefly after reset, then starts the application. Source: the bootloader repository README and `main.c`; not an ST document |

## Procedures

**One-time bootloader install**

| Step | Action |
|---|---|
| 1 | Wire the ST-Link SWCLK, SWDIO and GND to the Blue Pill SWD header, with the Blue Pill powered over USB |
| 2 | Move the BOOT0 jumper to 1 (in this test the ST-Link could not connect with BOOT0 at 0 while the previous firmware was on the board) |
| 3 | Copy the bootloader binary to `usb_boot/generic_boot20_pc13.bin`. Select env `usb_boot_flash` and click Upload (mass erase, program, verify) |
| 4 | Return BOOT0 to 0. The ST-Link is no longer needed |

**USB upload (procedure that worked)**

| Step | Action |
|---|---|
| 1 | Unplug the Blue Pill USB-C |
| 2 | Select env `bluepill_usb`, click Build, then click Upload (it waits for the device) |
| 3 | Plug the USB-C in; the upload completes in about 15 s |
| 4 | Press reset to start the application |

**Bench project environments** (PlatformIO project `pio-bluepill`, on Scott's MacBook Air only)

| Env | Purpose |
|---|---|
| `usb_boot_flash` | One-time ST-Link flash of the USB bootloader |
| `bluepill_usb` | Normal workflow: application at 0x08002000, uploaded over USB-C. Default env |
| `bluepill_f103c8` | Application at 0x08000000 through the ST-Link; overwrites the bootloader |
| `opp_flash` | Flash the prebuilt OPP image (bootloader at 0x08000000, application at 0x08001000, see `system/software/opp/README.md`) through the ST-Link; overwrites the USB bootloader |

**Switching between test firmware and OPP**

| Rule | Definition |
|---|---|
| Test firmware to test firmware | USB upload overwrites the application only; the bootloader stays |
| Test firmware to OPP | Not an overwrite: the ST-Link flashes the whole chip with the OPP bootloader and application (env `opp_flash`) |
| OPP back to test firmware | Repeat the one-time bootloader install above, then upload over USB |
| Before every test | Upload that test's firmware (Step 0 in its test card); the chip has no version string and its flash cannot be read back |
| History | OPP has not been loaded on the bench board. No OPP flash or inventory result exists. Earlier records stating that OPP was flashed and erased were not observed and are corrected (Scott, 2026-11-19) |

## Results

Results are entered by Scott (log outcomes as observed in session). Pass / Fail is Scott's.

| Test | Requirement | Result | Pass / Fail |
|---|---|---|---|
| 1 ST-Link connect, BOOT0 = 0 | OpenOCD connects to the target | 3 attempts failed: "unable to connect to the target" (ST-Link detected, target voltage 3.2 V; with connect-under-reset and 400 kHz also failed) | |
| 2 Bootloader install, BOOT0 = 1 | Program and verify the 7172-byte bootloader | OpenOCD: Programming Finished, Verified OK, 2.25 s | |
| 3 USB upload 1, no ST-Link | Firmware loads over USB-C | Success, 4168 bytes | |
| 4 USB upload 2, reset pressed while the upload waited | Firmware loads over USB-C | Success, 4168 bytes, 35 s | |
| 5 USB upload with the board already enumerated | Firmware loads over USB-C | 4 attempts failed: `dfu-util: error get_status: LIBUSB_ERROR_IO`. Cause not established | |
| 6 USB upload with the unplug-then-plug procedure | Firmware loads over USB-C | Success, 4208 bytes, 15 s (a different firmware build) | |
| 7 Application start after upload | Application runs without extra action | Application did not run until reset was pressed | |
| 8 USB programming overall | USB programming works like a modern board | Scott recorded the USB programming test as passed on 2026-11-18, after upload 2; the upload procedure above applies | Pass (Scott) |

## Not verified

| Item | State |
|---|---|
| Cause of the `LIBUSB_ERROR_IO` failures and of the ST-Link failure with BOOT0 = 0 | Not established |
| Reading the flash back over USB to confirm the loaded firmware | Not tested |
| Reliability over many uploads | 3 successful uploads in total |
| Reset-into-bootloader from the firmware, automatic start after upload | Not implemented |
| Bootloader on other Blue Pill clones, other host computers | Not tested |
