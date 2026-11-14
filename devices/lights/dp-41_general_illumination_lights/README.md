# DP-41 General illumination lights

**Common design:** see [Lights — Common Components](../common_components/README.md) (WS2812B LED, connection, data line, part specifications, schematic).

## Functions, constraints, parameters

| Item | Value |
|---|---|
| Function | Post lights, general lighting |
| Quantity | 32 |
| Type | Post (LED with dome cover) |
| Instance IDs | DP-41-01 to DP-41-32 (Machine Master Device Register) |
| Design input | Even glow with low to moderate brightness, providing background lighting that doesn't wash out gameplay lighting (Scott, from experience with commercial dome lights) |
| Light effect | TBD, pending bench test of printed stem and dome |
| LED | WS2812B assembly, same as all lights (see common components) |
| Playfield thickness | 12 mm (Scott) |
| Playfield hole | Ø10 mm through, no recess (Scott) |
| Stem and dome | Printed; design TBD. Stem length follows the playfield thickness |
| Chain index | Wiring attribute in the Electrical Master I/O map, not part of the instance ID |
