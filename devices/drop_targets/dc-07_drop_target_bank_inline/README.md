# DC-07 Drop target bank (inline)

**Common design:** see [Drop Targets — Common Components](../common_components/README.md) (supply, sensor, actuator, drive, lifter, blade, mounting, spring attachment, forward bias, protection, coil termination, schematics).
**Source:** `pmdd_drop-target_20261103-01` (Claude Project), migrated 2026-11-11

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Bank of targets, physically inline, top left of playfield (EBD reference layout); drops on hit; resets via solenoid-driven lifter arm |
| Targets (blades) | 4 |
| Sequence | Targets must drop in order: target 1 (front) before 2, 2 before 3, 3 before 4 (rear). The mechanism must physically enforce and verify the order; sequencing detail TBD |
| Magnet | Generic rare-earth 4×4 mm, COTS (Amazon), in the blade bottom tab; the only critical tolerance is magnet placement directly over the sensor |
| Solenoid count | Determined by bench testing of the 4-blade prototype |
| Module | One blade per repeated module; module width 1.3" (sensor pitch compatible with 0.1" perf-board hole spacing) |
| Return spring | McMaster-Carr 9665K84 (catalog data in common components); cut to 38 mm free length (end loops excluded) |
| Hall board | Up to 4 channels (common design) |
| Coil board | Solenoid circuits set to the solenoid count |
