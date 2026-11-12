# DB-03 Ball trough

**Revision:** 20261106-01 · **CAD base name:** ball-handling

## 1. Requirements

| Tier | Qty | Requirements |
|---|---|---|
| Ball-State Device | 1 | **Function:** Hold/stage balls not in play; feed one ball at a time to the shooter lane<br>**Structural:** Guide dead ball to pre-load position<br>**Sensor:** Detect ball in position<br>**Actuator:** Eject ball to shooter lane |

## 2. Mechanical

Geometry and positions: CAD (`ball-handling`).

| Item | Description |
|---|---|
| Housing | TBD. Configuration-specific (ball count, trough length); needs CAD-driven sizing once the trough layout is finalized |

## 3. Electrical

| Item | Design solution |
|---|---|
| Sensor | [GoHz M12 inductive proximity sensor](../../../system/system_common_components/gohz_m12_inductive_sensor.md); 24 V; NPN output to a Topedal direct input. Single sensor for ball detection; ball count is tracked digitally, so no sensor per ball |
| Actuator | JF-1039B, 12 V-rated, 10 mm stroke, push-pull; driven at 24 V; solenoid eject to shooter lane. Ball retention in the shooter lane at full-power eject: TBD |
| Protection | 1N400x-class diode |

## 4. Software

TBD

## 5. Acceptance Criteria

TBD
