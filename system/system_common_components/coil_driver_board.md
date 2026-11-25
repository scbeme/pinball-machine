# Coil driver board (common component)

**Revision:** 20261125-02 · **Used by:** every coil device — DC-01 Pop bumpers, DC-02 Slingshots, DC-03 Outlane save gate/deflector, DC-04 Flipper assembly, DC-05/DC-06/DC-07 Drop targets, DB-01 Scoop/hole, DB-03 Ball trough ejects

Co-located coil driver, mounted at the coil (device-level), one driver per coil. The low-side MOSFET switches the coil; its gate is driven over a wire from the controller board (firmware-gated — no hardware autofire). Concept design, to be built as a custom perf board / PCB. The DP-28 OPP reference board and the Cobrapin board are the design references.

| Element | Value | Note |
|---|---|---|
| MOSFET | IRLZ44N (logic-level), TO-220 | Low-side; source to coil-return (GND). RDS(on) not datasheet-specified at a 3.3 V gate; fire current confirmed by bench test |
| Gate series R | 100 Ω | Controller GPIO to MOSFET gate; limits GPIO inrush charging Ciss (not the coil) and damps the gate edge |
| Gate pulldown | 10 kΩ | Gate to GNDREF — fail-safe OFF during controller reset or a lost/open gate signal |
| Local gate pulldown | 100 kΩ | Gate to source — backup fail-safe OFF even if the GNDREF/controller wire opens (the 10 kΩ then floats) |
| Flyback diode | 1N400x-class across the coil | Commutates turn-off energy |
| Terminals | Screw terminals | +24 V (fused feed), coil, and a gate-drive pair (gate-in, GNDREF) to the controller |

**Grounding:** the coil-return (heavy) runs on its own wire to the GND★ star; the gate-return (GNDREF) pairs with the gate wire back to the controller, whose single logic-GNDREF ties to the star (conventional remote gate drive) — see Electrical Master, Grounding architecture.

**Protection:** no per-coil fuse; the circuit fuses (F1–F7) plus the K1 cutoff and rail-current detection cover the coil hazards — see Electrical Master, Safety architecture.
