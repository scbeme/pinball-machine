# Test — 1173N223 O-Ring Resilience (Bounce Test)

**Test doc:** test_1173n223_resilience

## Header

| Item | Value |
|---|---|
| Date | 2026-10-18 |
| Tester | Scott Carson |
| Subject | McMaster-Carr 1173N223 silicone O-ring, resilience characterization via ball bounce test |
| Related devices | DC-02 (slingshot) material characterization |

## Setup

| Item | Spec |
|---|---|
| Fixture | 3-post equilateral triangle, 48.2 mm (1.90") center-to-center on all three sides |
| Posts | 0.359" dia (9.12 mm) DIY 3D-printed, mounted on plywood |
| Plywood sheet | ≥300×90 mm, sanded, propped at 45° angle |
| O-ring | 1173N223 (free ID 1.609", free circ 128.4 mm) installed at +35% stretch (installed circ 173.3 mm) |
| Ball | 22 mm ferrous |
| Release line | 200 mm up-slope from strike-side strand midpoint |
| Rebound measurement | Marked ruler/tape along slope, zero at o-ring strike point |

## Data

| Trial # | L (mm) | L' (mm) | Valid | Observations |
|---|---|---|---|---|
| 1 | 200 | 100 | Y | See video IMG_5555 (10+ trials observed, L' consistently near 100 mm) |
| 2–10 | 200 | ~100 | Y | Video recorded; peak values not individually extracted — all consistent with ~100 mm per visual review |

Scott's annotation on ruler: "<100" — marker position for observed bounce peak range.

## Interpretation

**Measured silicone resilience (back-calculated from L' = 100 mm with sliding-ball friction correction):**

| Model | μ assumption | Back-calculated R |
|---|---|---|
| Sliding ball, friction correction | 0.0 | 0.50 |
| Sliding ball, friction correction | 0.2 | 0.75 |
| Sliding ball, friction correction | 0.3 | 0.93 |
| Rolling ball with post-bounce slip | 0.3 | ~0.91 |

**Best estimate: R ≈ 0.75–0.90, midpoint ~0.80** — at the UPPER END of silicone VMQ 50A literature band (60-80%).

**Measured L' (100 mm) exceeds predicted range (65–90 mm, midpoint 75 mm) by ~33%** — indicates either (a) silicone resilience slightly above literature mid-estimate, (b) plywood friction coefficient lower than assumed, or (c) both.

**Impact on slingshot design:**
- Expected ball bounce performance vs commercial 3/16" natural rubber: ~94% (upper end of prior 82–94% range)
- Static force margin at 24V for slingshot kicker increases significantly (ring softer than literature)
- 24V operating voltage remains the design choice; 12V now also statically adequate but underperforms dynamically

## Supersedes

None — first revision of this test.

## Caveats

- μ_k (plywood-steel kinetic friction) is estimated at ~0.2–0.3, not measured. Shifts back-calculated R by ±0.15.
- Measurement precision: Scott's visual estimate ±10 mm; back-calculated R uncertainty ±0.10.
- Rolling-ball analysis assumes ball collides with ring at equator (no induced torque); valid for midspan strikes.
- Modulus characterization in companion test test_1173n21_modulus.md — related measurement using 1173N21 ring, independent of this resilience result.
