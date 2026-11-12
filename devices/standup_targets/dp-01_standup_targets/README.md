# DP-01 Standup targets (6 side-by-side)

**Revision:** 20261018-01 · **CAD base name:** standup-target · DP-19 Standup target (single) uses the same construction; see [DP-19](../dp-19_standup_target/README.md)

## 1. Requirements

| Tier | Qty | Requirements |
|---|---|---|
| Primitive | 6 | **Function:** Detect a ball strike on a vertical target by closing a switch contact |

## 2. Mechanical

Geometry and positions: CAD (`standup-target`).

| Item | Description |
|---|---|
| Switch | Leaf type: front and back vertical stainless cable-tie leaves ([spec](../../../system/system_common_components/houocon_stainless_cable_tie.md)), separated by 3D-printed front, middle and back spacer blocks; aluminum back stop, 1/16" × 3/8" |
| Target | 3D-printed circle |
| Assembly | M3 × 25 mm screw, M3 flat washer, M3 hex nut; #4 pop rivet |
| Mounting | 3D-printed 6-target bracket, 3 #6 sheet metal screws, 0.138" diameter holes |

## 3. Electrical

| Item | Design solution |
|---|---|
| Switch | SPST, normally open; the leaf contacts close on target deflection |
| Interface | Closes a Topedal switch input to ground; generic switch-input circuit shared with the other switch devices (pins per the Electrical Master I/O map) |

## 4. Software

N/A

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Qty | 6 |
| Cable tie | 304 stainless, 10 mm × 0.46 mm |
