# Electrical Master

**Revision:** 20261110-01 · **Date:** 2026-11-10

## Block diagram

![System electrical block diagram](Electrical_Block_Diagram.svg)

Device-to-driver assignments are not decided, so the 3 Topedal boards are drawn as a group.

### Power Design

| ID | Element | Design Solution |
|---|---|---|
| P-01 | Mains input | Fused mains input; DP-13 master power switch — mains-rated toggle, accessible, visible shutoff. Fuse rating TBD (pending supply AC rating) |
| P-02 | Coil supply | 24V DC supply, current rating TBD, to all solenoid positive terminals through fused feeds F1–F7 and to the 24V inductive proximity sensors through fused feed F8 (Power Distribution). Topedal board provides low-side drivers only (no positive supply, filter, or fuse on board) |
| P-03 | Bulk filter | Capacitor bank across the 24V rail at the distribution point. Value TBD |
| P-04 | Discharge | Bleeder resistor across the bank; LED driven from capacitor voltage (on = charged); posted wait-time label. Discharge time TBD |
| P-05 | Coil fusing | Slow-blow fuse per feed F1–F8 (Power Distribution), rated above hold/operating current and below sustained-fault level. Ratings TBD |
| P-06 | 5V supply | Separate fused 5V DC supply, regulated at 5.0V (WS2812B maximum 5.3V), to Topedal J4/J5 and J6 (level shifter, Neopixel strip) and the Hall sensor boards (DC-05/06/07). No series diodes on the rail. Rating TBD |
| P-07 | Logic power | Blue Pill powered over its USB link to the host; board 3.3V from the Blue Pill regulator |
| P-08 | Grounds | GND (coil supply return) and GNDREF (3V3/5V return) are separate nets on the Topedal board; tied at one point externally, at the GND bar (Power Distribution); tie verified before coil power is applied. GND bar location TBD |
| P-09 | Board addressing | Each Topedal board has a unique, verified chain address before coil power is connected |
| P-10 | Wiring | Solenoid feed and return wire 18 AWG (Power Distribution). Supply-to-bus-bar trunk and F8 sensor feed gauge TBD. Connectors TBD |


### Power Distribution

| Feed | Fuse | Devices | Coils | Feed wire | Coil return |
|---|---|---|---|---|---|
| F1 | TBD | DC-05 Drop target bank (side-by-side) | 3 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F2 | TBD | DC-07 Drop target bank (inline) | 2 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F3 | TBD | DC-06 Drop target (single) | 1 | 18 AWG | 18 AWG to its Topedal J2 drive pin |
| F4 | TBD | DC-04 Flipper assembly | 3 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F5 | TBD | DC-02 Slingshots | 2 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F6 | TBD | DC-01 Pop bumpers | 3 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F7 | TBD | DC-03 Outlane save gate/deflector kickbacks, DB-01 Scoop/hole and DB-03 Ball Trough ejects | 4 | 18 AWG | 18 AWG per coil to its own Topedal J2 drive pin |
| F8 | TBD | 24V inductive proximity sensors, 10 (DP-18 Rollover sensor x7, DB-01 Scoop/hole, DB-03 Ball Trough, DB-04 Shooter lane ball-present sensor; DC-03 Outlane save gate/deflector uses the outlane DP-18 sensors) | — | TBD | Sensor ground per the ball-path-sensing doc |

*Coils = power-budget counts accepted 2026-11-02; CAD controls device counts.*


### Power Distribution items

| Item | Definition |
|---|---|
| Distribution point | 24V bus bar and fuse block fed by the P-02 supply; feeds F1–F8 originate here |
| Feed separation | Each device group has its own fused feed; flippers, slingshots and pop bumpers each have their own feed; F8 sensor feed is separate from all coil feeds |
| Board ground return | 3 wires of 18 AWG per Topedal board, from J3 pins to the GND bar |
| GND bar | Single point where GND and GNDREF are tied (P-08) |


## System schematic

> **Requested: system-level schematic (not yet created)**
>
> - Create a system-level schematic that includes the pin assignments.
> - Merge/replace the Topedal pin assignments table into the schematic. Done for the Topedal board (linked below): the pin map is now carried on the drawing (GPIO, LQFP48 pin, timer output and 5 V tolerance on each J100 pin, with the J1/J2/J7/J8 connector pins).
> - The current design uses 3 Topedal boards (DP-28A, DP-28B, DP-28C); all three are identical hardware, so one board schematic and pin map applies to each.
> - Blocked until the device-to-driver and device-to-input assignments are decided; each device pin cannot be assigned until then.

Topedal board schematic and pin map: [DP-28 Topedal board](../Devices/Controllers_Power/DP-28_Topedal_Board/Topedal_Schematic.md)
