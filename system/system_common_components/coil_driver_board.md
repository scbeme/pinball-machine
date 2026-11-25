# Coil driver board (common component)

**Revision:** 20261125-01 · **Used by:** every coil device — DC-01 Pop bumpers, DC-02 Slingshots, DC-03 Outlane save gate/deflector, DC-04 Flipper assembly, DC-05/DC-06/DC-07 Drop targets, DB-01 Scoop/hole, DB-03 Ball trough ejects

Co-located coil driver, mounted at the coil (device-level), one driver per coil. The low-side MOSFET switches the coil; its gate is driven over a wire from the controller board (firmware-gated — no hardware autofire). Concept design, to be built as a custom perf board / PCB. The DP-28 Topedal board and the Cobrapin board are the reference designs.

| Element | Value | Note |
|---|---|---|
| MOSFET | IRLZ44N (logic-level), TO-220 | Low-side; source to coil-return (GND) |
| Gate series R | 100 Ω | Controller gate output to MOSFET gate |
| Gate pulldown | 10 kΩ | Gate to GNDREF — fail-safe OFF on a lost/open gate signal |
| Flyback diode | 1N400x-class across the coil | Commutates turn-off energy |
| Terminals | Screw terminals | +24 V (fused feed), coil, gate-in, GNDREF |

**Grounding:** the coil-return (heavy) and the gate-return (GNDREF, dedicated) run separately to the GND★ star — see Electrical Master, Grounding architecture.

**Protection:** no per-coil fuse; the circuit fuses (F1–F7) plus the K1 cutoff and rail-current detection cover the coil hazards — see Electrical Master, Safety architecture.
