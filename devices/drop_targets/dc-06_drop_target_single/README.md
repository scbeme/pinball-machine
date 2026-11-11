# DC-06 Drop target (single)

**Common design:** see [Drop Targets — Common Components](../common_components/README.md) (supply, sensor, actuator, drive, lifter, blade, mounting, spring attachment, forward bias, protection, coil termination, schematics).

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Single target, top right of playfield (EBD reference layout); drops on hit; resets via solenoid-driven lifter arm |
| Targets (blades) | 1 |
| Magnet | SRENMSMT 6×2 mm |
| Solenoid count | 1 |
| Return spring | McMaster-Carr 9665K84 (catalog data in common components); cut to 55 mm free length (end loops ignored); 60 mm installed length at flush (5 mm extension); 27 mm additional extension from flush to full lift |
| Hall board | 1 channel (common design) |
| Coil board | 1 solenoid circuit |
