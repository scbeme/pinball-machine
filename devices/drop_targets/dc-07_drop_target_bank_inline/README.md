# DC-07 Drop target bank (inline)

**Revision:** 20261122-01 · Header added 2026-11-21; specs and assembly sequence added 2026-11-22

**Common design:** see [Drop Targets — Common Components](../common_components/README.md) (supply, sensor, actuator, drive, lifter, blade, mounting, spring attachment, forward bias, protection, coil termination, schematics).

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Bank of targets, physically inline, top left of playfield (EBD reference layout); drops on hit; resets via solenoid-driven lifter arm |
| Targets (blades) | 4 |
| Sequence | Targets must drop in order: target 1 (front) before 2, 2 before 3, 3 before 4 (rear). The mechanism must physically enforce and verify the order; sequencing detail TBD |
| Magnet | Generic rare-earth 4×4 mm, COTS (Amazon), in the blade bottom tab; the only critical tolerance is magnet placement directly over the sensor |
| Solenoid count | Determined by bench testing of the 4-blade prototype |
| Module | One blade per repeated module; module width 1.3" (sensor pitch compatible with 0.1" perf-board hole spacing) |
| Return spring | McMaster-Carr 9665K84 (catalog data in common components); cut to 38 mm free length (end loops excluded); 37 mm coil length with mounting loops |
| Hall board | Up to 4 channels (common design) |
| Coil board | Solenoid circuits set to the solenoid count |
| Lifter axle | 3 mm dia stainless steel rod, 150 mm long |
| Solenoid mounting screws | M3 × 10 mm (M3 × 12 mm with 2 M3 washers substituted) |
| Lifter lever leveling screw | M3 × 20 mm with hex nut |

## Assembly sequence

| # | Step |
|---|---|
| 1 | Install M3 heat set inserts |
| 2 | Install 4×4 mm magnets into blades |
| 3 | Insert blades into bracket |
| 4 | Attach springs to blades and bracket |
| 5 | Slide lifters into position |
| 6 | Position solenoid plunger shaft through lifter arms, then push the 3 mm dia lifting rod through the 3 mm hole in the solenoid plunger shaft |
| 7 | Continue pushing the lifting rod under each lifting arm; repeat step 6 for the second solenoid. When finished, the lifting rod drops into the bracket vertical guide slots |
| 8 | Insert the 3 mm dia lifter axle from the bracket side through to the opposite side |

Basic assembly complete. The Hall effect sensor perf board and solenoid perf board attach per the drawings in the test card `tests/test_drop_target_4blade_two_solenoid_lift.md`.
