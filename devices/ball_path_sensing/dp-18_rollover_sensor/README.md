# DP-18 Rollover sensor

**Revision:** 20261106-01 · **CAD base name:** ball-path-sensing

## 1. Requirements

| Tier | Qty | Requirements |
|---|---|---|
| Primitive | 7 | **Function:** Sense ball rolling along a designated path |

## 2. Mechanical

Geometry and positions: CAD (`ball-path-sensing`).

| Item | Description |
|---|---|
| Mounting | 3D-printed bracket in a recessed sub-playfield pocket; sensor face positioned beneath a 3D-printed playfield cover lens (about 1.2 mm thick) |

## 3. Electrical

| Item | Design solution |
|---|---|
| Sensor | GoHz M12 inductive proximity sensor, unshielded, NPN NO, 4 mm; specifications in [GoHz M12 inductive proximity sensor](../../../system/system_common_components/gohz_m12_inductive_sensor.md) |
| Wiring | 24 V Vcc; NPN output to STM32 direct/matrix switch input; GND to GNDREF |
| Isolation | Inductive sensing is immune to magnetic fields from nearby solenoids and magnets; no shielding or magnetic keep-out distance required |

## 4. Software

TBD

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Qty | 7 |
| Sensing distance | 4 mm ±10% (sensor spec) |
| Supply | 24 V DC |
| Minimum sensor-to-sensor spacing | Not recorded |
