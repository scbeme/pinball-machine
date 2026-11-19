# OPP Firmware: Open-Source Baseline (Not Configured)

**Revision:** 20261119-01 · **Date:** 2026-11-19

Controller firmware for the DP-28 Topedal boards (identical firmware on every board, `machine_master.md` Software item 1). This folder holds the open-source baseline only; no project configuration has been applied. When a configured or modified build exists, its files are added here and this page is updated. The folder always holds the latest version, so no other firmware record is kept.

| Item | Value |
|---|---|
| Baseline image | `OppStm32.3.0.0.1.hex`, prebuilt, 84064 bytes. Not stored in this repository (third-party binary, `github_workflow` section 10); whether the image is on Scott's bench computer is not verified |
| SHA-256 | `796c44e2902efbf6ba143a1cfe3da4d69cbe457db6d8b281305e2733564747fc` |
| Layout (read from the hex file) | Bootloader at 0x08000000 (4064 bytes); application at 0x08001000 (26472 bytes) |
| Target | STM32F103 |
| Upstream source and version | Not recorded. To be confirmed by Scott |
| License | Not verified at the source. An MPF-users forum post reports OPP as GPLv3 |
| Loading | Planned, not yet done on the bench board: ST-Link, whole chip (bench environment `opp_flash`, existence not verified). It replaces the USB bootloader; going back to test firmware needs the bootloader install in [test_bluepill_usb_bootloader.md](../../system_common_components/tests/test_bluepill_usb_bootloader.md) |
| Configuration | None applied. Board addressing and any project changes are not yet defined |
