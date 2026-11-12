# Test — 1173N21 O-Ring Young's Modulus (Force-vs-Stretch)

**Test doc:** test_1173n21_modulus

## Header

| Item | Value |
|---|---|
| Date | 2026-10-18 |
| Tester | Scott Carson |
| Subject | McMaster-Carr 1173N21 silicone O-ring, Young's modulus characterization via force-vs-stretch |
| Related devices | MD-01 (playfield post rings) and DC-02 (slingshot) material characterization |
| Related session notes | pinball_session_notes_20261018-01 |

## Setup

| Item | Spec |
|---|---|
| O-ring | 1173N21 (free ID 0.734", free circ 58.57 mm, cord dia 0.139", cord area 9.79 mm²) |
| Fixture | O-ring hung vertically from fixed hook; weight hung from bottom of ring |
| Weights | Container (5 g) + hooks (16 g) + water added incrementally. Actual mass measured on scale |
| Measurement | Vertical distance between upper fixture contact and lower weight hook contact, loaded minus unloaded (ΔH) |

## Data

| Weight target (g) | Actual mass (g) | ΔH predicted at E=2 MPa (mm) | ΔH measured (mm) | Strand strain | Secant E (MPa) |
|---|---|---|---|---|---|
| 200 | 204 | 2.9 | 5 | 17.1% | 0.60 |
| 400 | 414 | 5.9 | 8 | 27.3% | 0.76 |
| 600 | 604 | 8.8 | 10 | 34.2% | 0.89 |
| 1000 | 996 | 14.7 | 18 | 61.5% | 0.81 |
| 1500 | 1514 | 22.0 | 28 | 95.6% | 0.79 |

**Formula:** `E = W × C / (4 × A × ΔH)` where W = m × 9.81e-3 N, C = 58.57 mm (free circ), A = 9.79 mm² (cord cross-section), ΔH in mm.

## Interpretation

**Measured secant modulus:**
- At operating strain (~35%, matches slingshot and large-ring applications): **E ≈ 0.89 MPa**
- Across full test range (17–96% strain): E = 0.60–0.89 MPa, cluster ~0.80 MPa
- Low-strain modulus (<30%) is lower (~0.60–0.76 MPa) — "toe region" below linear regime
- At 35% strain and above, modulus stabilizes at ~0.80–0.89 MPa

**Vs literature:** ~2 MPa typical for 50A VMQ silicone. **Measured is 2.3× softer than literature estimate.**

**Impact on prior analyses:**
- Ring tensions at installed stretch are 2.3× lower than literature-based calculations
- Slingshot kicker force requirements proportionally lower
- Static margins at 24V (slingshot JF-1039B) increase significantly
- Fatigue/stress on ring material is lower than prior estimates — longer service life expected

## Supersedes

None — first revision of this test.

## Caveats

- Model assumes two-strand hairpin geometry (ring hung from thin hooks). Thick-hook variants would reduce effective strand length and alter back-calculation.
- Measurement precision: ΔH measured with ruler (~±1 mm); modulus uncertainty ±10–15% per point.
- Strain-stiffening expected above ~50% strain (silicone non-linear); test shows modest effect — modulus relatively flat 0.79–0.89 across 34–96% strain range.
- Rebound resilience is a separate material property not derived from this test — see companion test test_1173n223_resilience.md.
