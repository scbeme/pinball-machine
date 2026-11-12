# Test TR-20261012-01 — JF-1039B Plunger Return Spring Force vs Shaft Position

**Date:** 2026-10-12
**Device/Part:** JF-1039B solenoid, internal plunger return spring
**Tester:** Scott
**Supersedes:** none

## Setup

| Item | Value |
|---|---|
| Part under test | JF-1039B solenoid plunger return spring (internal, factory-installed) |
| Spring access | External C-clip retention; spring slides off/on the plunger shaft |
| Measurement reference | Plunger shaft length in mm (visible shaft protrusion); shorter shaft = more retraction into coil |
| Full-stroke position | 16 mm shaft length corresponds to the 10 mm full-stroke position of the plunger (per Scott) |
| Force application | Directly at plunger (not through any linkage or lever) |

## Data

| Plunger shaft length (mm) | Force (oz) | Force (lbf) | Force (N) | Notes |
|---|---|---|---|---|
| 23 | 0 | 0 | 0 | Spring first engages (0-force reference) |
| 22 | 4.9 | 0.306 | 1.36 | 1 mm plunger retraction past engagement |
| 21 | 6.6 | 0.413 | 1.84 | 2 mm |
| 20 | 7.75 | 0.484 | 2.16 | 3 mm |
| 16 | 12.0 | 0.750 | 3.34 | 7 mm; plunger full-stroke position (10 mm total travel) |

**Secant rates**

| Segment (mm past engagement) | Rate (oz/mm) | Rate (lbf/in) |
|---|---|---|
| 0 → 1 | 4.9 | 7.78 |
| 1 → 2 | 1.7 | 2.70 |
| 2 → 3 | 1.15 | 1.83 |
| 3 → 7 | 1.06 | 1.68 |

## Interpretation

| Point | Finding |
|---|---|
| Shape | Stiff first mm (4.9 oz/mm) then flattens to ~1 oz/mm through rest of stroke |
| Full-stroke force | 3.34 N; this is the resistance the solenoid must overcome at seated/latched position just from the plunger return spring, in addition to the external return spring and load |
| Replaceability | Spring is retained by an external C-clip, slides off the shaft, and can be replaced with a lighter spring; supersedes earlier assessment implying sealed construction |
| Impact on design | Not currently acted on. K84 external return spring at 3 solenoids has adequate margin; plunger spring removal reserved as a reversible option if margin ever proves inadequate |

## Caveats

| Item | Note |
|---|---|
| Scale resolution | Not recorded |
| First-engagement interpretation | 0 force at 23 mm shaft inferred to mean spring just contacts its seat at that position; does not change the shape of the curve above engagement |
| 10 mm vs 7 mm | Scott's note "16 mm = 10 mm full stroke position" implies plunger rest shaft length ~26 mm (not measured); the 7 mm range measured here is 3 mm into the stroke from rest |
| Earlier mis-attribution | This data was initially recorded in session notes 20261012-02 under a heading labeling it as rubber band single strand data; mis-attribution corrected 2026-10-12 |
