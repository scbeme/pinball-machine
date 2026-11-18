# PlatformIO post script: replace "upload" with a one-time ST-Link flash of the
# STM32duino USB DFU bootloader (generic_boot20_pc13, 7172 B) at 0x08000000.
# Mass-erases the chip first (removes the previous OPP image).
Import("env")
from os.path import join
pio = env.PioPlatform()
ocd = pio.get_package_dir("tool-openocd")
binfile = join(env.subst("$PROJECT_DIR"), "usb_boot", "generic_boot20_pc13.bin")
cmd = ('"%s" -s "%s" -s "%s" -f interface/stlink.cfg -f target/stm32f1x.cfg '
       '-c "adapter speed 400; init; reset halt; stm32f1x mass_erase 0; '
       'program \\"%s\\" verify reset exit 0x08000000"') % (
       join(ocd, "bin", "openocd"), ocd, join(ocd, "openocd", "scripts"), binfile)
env.Replace(UPLOADCMD=cmd)
