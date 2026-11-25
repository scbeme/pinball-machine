# GoHz M12 inductive proximity sensor (common component)

**Revision:** 20261125-01 · **Used by:** DP-18 Rollover sensor (including the outlane sensors that trigger DC-03 Outlane save gate/deflector), DB-01 Scoop/hole, DB-03 Ball trough, DB-04 Shooter lane ball-present sensor

Common electrical interface: 24 V supply, NPN NO (sinking) output to an STM32 direct (or matrix) switch input, GND to GNDREF. Inductive sensing is immune to magnetic fields from nearby solenoids and magnets, so no shielding or magnetic keep-out distance is required.

| Spec | Value |
|---|---|
| Model | M12 inductive proximity, unshielded, NPN NO, 3-wire DC |
| Output | NPN NO (sinking) |
| Housing / material | Unshielded, M12 thread; nickel-plated brass body, ABS sensing face |
| Sensing distance, Sn | 4 mm ±10% |
| Standard detection object | Iron 15×15×1 mm |
| Detection object | Magnetic/ferrous metal; detection distance decreases for non-magnetic metal |
| Hysteresis (delay distance) | ≤10% of Sn |
| Supply voltage | 6–36 VDC (12–24 VDC nominal) |
| Output (control) current | ≤300 mA |
| Supply (consumption) current | ≤13 mA |
| Response frequency | 1 kHz (DC) |
| Operating temperature / humidity | −30 to +65 °C; 35–95% RH (no freeze, no dew) |
| Temperature influence | ±15% of Sn over −30 to +65 °C |
| Supply-voltage influence | ±10% of Sn over ±15% supply |
| Protection (loop) | Reverse polarity, load short circuit, surge absorption |
| Protection class | IP67 |
| Withstand voltage / insulation | AC 1000 V 50/60 Hz 1 min; ≥50 MΩ (charging part to housing) |
| Cable length | 1.2 m (47 in) |
| Wire count and color code | 3-wire DC; industry-standard NPN colors (brown +V, blue 0 V, black output) — not stated in datasheet |
| Detection distance, 22 mm ferrous ball | Not recorded (bench-measure; the 4 mm Sn is for the 15×15×1 mm target) |
| On-state residual voltage | Not recorded |
| Off-state leakage current | Not recorded |
| Body length | Not recorded |
| Thread length | Not recorded |
| Minimum sensor-to-sensor spacing | Not recorded |
| Metal-free zone around sensing face | Not recorded |

## Input conditioning (24 V sensor to 3.3 V STM32 input)

The NPN output only sinks to GND when a target is present, so with a pull-up the HIGH level is set by the 3.3 V rail and no 24 V ever reaches the MCU pin. Required at the receiving (controller) board, one stage per input:

| Element | Value | Purpose |
|---|---|---|
| Pull-up, output node to 3.3 V | 4.7 kΩ | Sets HIGH; stiff enough for a long playfield run (not the STM32 weak internal pull-up) |
| Series R, node to MCU pin | 1 kΩ | Limits injected current; protects the pin |
| Filter cap, pin to GND | 10 nF | RC debounce/noise filter (~16 kHz corner; sensor is 1 kHz) |
| Clamp (optional) | 3.3 V TVS/Zener at the pin | Spike margin (internal clamps + the sensor's surge absorption may suffice) |

Shared ground required: sensor 0 V (blue) to GNDREF/GND★. Firmware logic is active-LOW (target present = 0).
