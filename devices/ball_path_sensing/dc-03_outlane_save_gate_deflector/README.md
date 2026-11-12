# DC-03 Outlane save gate/deflector

**Revision:** 20261106-01 · **CAD base name:** ball-path-sensing

## 1. Requirements

| Tier | Qty | Requirements |
|---|---|---|
| Composite Mech | 2 (1 per outlane) | **Function:** Automatic ball-save: a sensor detects the ball in the outlane, MPF logic (enable/grace-period) fires a solenoid kickback to return the ball to play; no player control (replaces the earlier player-button gate concept) |

## 2. Mechanical

Geometry and positions: CAD (`ball-path-sensing`). Mounting and bracket parts: TBD.

## 3. Electrical

| Item | Design solution |
|---|---|
| Sensor | Triggers from the two outlane DP-18 Rollover sensors (no separate sensors); see [DP-18](../dp-18_rollover_sensor/README.md) |
| Actuator | Solenoid, kickback-style; fires on sensor trigger, subject to MPF ball-save enable/grace-period logic. Part TBD |
| Reference | Daniele Tartaglia commercial-build reference (sensor + solenoid outlane save) |

## 4. Software

See [control_logic.md](control_logic.md).

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Qty | 2 (1 per outlane) |
| Solenoid part | TBD |
| Fire pulse width and rate | TBD |
