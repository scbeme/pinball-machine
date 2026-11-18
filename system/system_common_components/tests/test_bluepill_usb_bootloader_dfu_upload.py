# PlatformIO post script: upload the app over USB to the STM32duino bootloader.
# DFU alt setting 2 = user flash at 0x08002000. -w waits for the bootloader to appear.
# Procedure that worked: start the upload with the Blue Pill USB-C unplugged, then plug it in.
# Uploading while the board was already enumerated gave LIBUSB_ERROR_IO. Press reset after the upload to start the app.
Import("env")
from os.path import join
pio = env.PioPlatform()
dfu = join(pio.get_package_dir("tool-dfuutil"), "bin", "dfu-util")
cmd = '"%s" -d 1eaf:0003 -a 2 -w -D "$BUILD_DIR/${PROGNAME}.bin" -R' % dfu
env.Replace(UPLOADCMD=cmd)
