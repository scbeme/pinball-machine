# DC-05 Drop target bank (side-by-side)

**Common design:** see [Drop Targets — Common Components](../common_components/README.md) (supply, sensor, actuator, drive, lifter, blade, mounting, spring attachment, forward bias, protection, coil termination, schematics).

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Bank of targets, side-by-side, right side of playfield (EBD reference layout); drops on hit; resets via solenoid-driven lifter arm |
| Targets (blades) | 7 |
| Magnet | SRENMSMT 6×2 mm |
| Solenoid count | Determined by bench testing of the 7-blade prototype; solenoids lift through one common rod |
| Return spring | McMaster-Carr 9665K84 (catalog data in common components); cut to 38 mm (1.5") free length; end loops formed from the straight-cut ends; ~5 mm extension at flush (43 mm spring length); 27 mm additional extension from flush to full lift (70 mm spring length); housing accepts up to 60 mm end to end at flush |
| Hall board | 7 channels (common design) |
| Coil board | Solenoid circuits set to the solenoid count |
