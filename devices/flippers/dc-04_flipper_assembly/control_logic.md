# DC-04 Flipper assembly — Control logic

**Revision:** 20261106-01

| Item | Definition |
|---|---|
| Drive sequence | Fixed-duration fire pulse, then PWM hold while the button is held; drive ends on release. Fire pulse width, hold duty, PWM frequency and hold voltage: TBD |
| Max-on timer | Firmware limit on continuous drive time. Value TBD |
| Max-duty clamp | Firmware limit on commanded hold duty. Value TBD |
| Stuck-on detection | Firmware shuts off drive if coil current stays above the commanded hold level. Threshold and time TBD |
| IWDG | Independent watchdog enabled; a firmware hang ends drive |
| Gate pulldown | Topedal gate pulldown holds the MOSFET off when the Blue Pill output floats |
| Shorted driver | A shorted MOSFET is not covered by firmware; the flipper feed fuse rating (TBD) covers it |
