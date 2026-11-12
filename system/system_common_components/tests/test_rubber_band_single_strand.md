# Test TR-20261012-02 — Rubber Band Single Strand Force vs Stretch

**Date:** 2026-10-12
**Device/Part:** Rubber band, single strand (not looped); relevant to DC-05/06/07 drop-target return spring selection
**Tester:** Scott
**Supersedes:** none

## Setup

| Item | Value |
|---|---|
| Band form | Single strand (not looped) |
| Dimensions | Not restated at test time; presumed same material class as the dual-strand loop band characterized separately in session notes |
| Measurement | Force vs stretch, in tension; stretch measured from slack (0 mm = 0 force) |
| Units as provided | Weight in oz; stretch in inches |

## Data

| Stretch (as provided) | Stretch (mm) | Force (oz) | Force (lbf) | Force (N) |
|---|---|---|---|---|
| 1/8" | 3.18 | 0.56 | 0.035 | 0.156 |
| 1/4" | 6.35 | 1.01 | 0.063 | 0.281 |
| 7/16" | 11.11 | 1.095 | 0.068 | 0.304 |
| 3/4" | 19.05 | 1.68 | 0.105 | 0.467 |
| 2 1/2" | 63.5 | 2.23 | 0.139 | 0.620 |

**Secant rates** (nonlinear; two plateau regions)

| Segment (mm) | Rate (oz/mm) | Rate (lbf/in) |
|---|---|---|
| 0 → 3.18 | 0.176 | 0.281 |
| 3.18 → 6.35 | 0.142 | 0.226 |
| 6.35 → 11.11 | 0.018 | 0.028 |
| 11.11 → 19.05 | 0.074 | 0.117 |
| 19.05 → 63.5 | 0.012 | 0.020 |

## Interpretation

| Point | Finding |
|---|---|
| Shape | Nonlinear; soft plateau 6.35–11.11 mm (0.018 oz/mm); second plateau 19.05–63.5 mm (0.012 oz/mm). Not usable as a constant-rate spring |
| Single vs loop at same stretch (9 mm) | Loop (separate test) = 1.875 oz; single (interpolated) = 1.057 oz. Loop ÷ single = 1.77 (not 2.0), so the two bands are different physical specimens, not the same band tested two ways |
| Comparison to 9665K84 at drop-target design positions | At 5 mm flush: single ≈ 0.051 lbf vs K84 0.051 lbf (ratio 1.00×). At 32 mm raised: single ≈ 0.115 lbf vs K84 0.107 lbf (ratio 1.07×). Essentially equivalent across the design operating range |
| Implication for return spring selection | K84 (current) is bracketed by two demonstrated working return-force levels: single strand ≈ K84 at the low end; loop at 2–3× K84 at the high end, loop validated reliable at 12 V on 1 solenoid. No change recommended |

## Caveats

| Item | Note |
|---|---|
| Scale resolution | Not recorded |
| Interpolated values | 5 mm and 32 mm single strand forces are linear interpolations between measured points (not measured) |
| Different band from loop | The two rubber band tests use different physical bands; cross-comparison is directional, not exact |
| Band identity | Dimensions, material, source not characterized; standard office/retail rubber band presumed |
