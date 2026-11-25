# OPP Firmware: Open-Source Baseline (Not Configured)

**Revision:** 20261119-02 · **Date:** 2026-11-19

Controller firmware for the DP-28 controller boards (identical firmware on every board, `machine_master.md` Software item 1). This folder holds the open-source baseline only; no project configuration has been applied. When a configured or modified build exists, its files are added here and this page is updated. The folder always holds the latest version, so no other firmware record is kept.

| Item | Value |
|---|---|
| Baseline image | `OppStm32.3.0.0.1.hex`, prebuilt, 84064 bytes. Not stored in this repository (third-party binary, `github_workflow` section 10); present on Scott's bench computer at `~/projects/stm32-bench/pio-bluepill/opp/` (SHA-256 verified 2026-11-19) |
| SHA-256 | `796c44e2902efbf6ba143a1cfe3da4d69cbe457db6d8b281305e2733564747fc` |
| Layout (read from the hex file) | Bootloader at 0x08000000 (4064 bytes); application at 0x08001000 (26472 bytes) |
| Target | STM32F103 |
| Upstream source and version | `https://github.com/openpinballproject/opp`, file `Stm32Workbench/Gen3Images/OppStm32.3.0.0.1.hex` (firmware version 3.0.0.1). SHA-256 identical to that file at `main` commit c639757 (2026-05-09), checked 2026-11-19 |
| License | GPLv3: repository `LICENSE.txt`, and the application and bootloader source headers (Hugh Spahr). Exceptions: bootloader USB code `Booty/src/cdc_loop.c` is Apache-2.0 (Dmitry Filimonchuk); ST HAL and USB middleware carry ST terms. GPLv3 allows modifying and redistributing a fork under GPLv3. Read from the source 2026-11-19 |
| Loading | ST-Link, whole chip (bench environment `opp_flash`, `pio-bluepill/opp/flash_opp.py` present on the bench computer). It replaces the USB bootloader; going back to test firmware needs the bootloader install in [test_bluepill_usb_bootloader.md](../../system_common_components/tests/test_bluepill_usb_bootloader.md) |
| Bench load status | Not verified. The image and flash script exist on the bench computer; no flash log or test card result is recorded |
| Configuration | None applied. Board addressing and any project changes are not yet defined |
