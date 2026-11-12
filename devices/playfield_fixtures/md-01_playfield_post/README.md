# MD-01 Playfield post

**Revision:** 20261018-01 · **CAD base name:** playfield-fixtures

## 1. Requirements

| Qty | Requirements |
|---|---|
| Per CAD | Passive post to deflect the ball. MD-01 has more than one physical design (see Section 2); CAD defines the variants and counts |

## 2. Mechanical

Geometry and positions: CAD (`playfield-fixtures`).

### 2.1 Variants

| Variant | Construction |
|---|---|
| Tapered post | DIY 3D-printed body, mounted to the playfield by a bolt through the center hole; neck diameter sized per application; fitted with an o-ring per Section 2.2 |
| Stud post | M3 screw + silicone sleeve + top acorn nut, or M3 hex nut + top acorn nut; the top nut captures a decorative cover layer (for example the acrylic cover plate above the slingshot area). Sleeve and acorn nut part numbers: TBD |

### 2.2 O-ring selection (posts with rings)

DC-02 Slingshots rings are specified in the DC-02 card (same material, sizing per slingshot operating stretch).

| Attribute | Value |
|---|---|
| Material | Silicone rubber (VMQ) |
| Durometer | 50A (soft) |
| Cross-section | 1/8" (0.139"), selected to scale ring force correctly to the 22 mm ball mass |
| Color | Red |
| Standards | ASTM D2000, SAE AS568 |
| Supplier | McMaster-Carr, 1173N series (High-Temperature Soft Silicone O-Rings) |
| Stretch targets by post count | 1-post 45–55%, 2-post 20–40%, 3-post 10–30% |
| Ball bounce (measured) | About 94% of commercial 3/16" natural rubber |

Ring selection per `playfield-fixtures` CAD (9 rows):

| Item | Qty | CAD circ (in) | CAD circ (mm) | Post dia (in) | Post dia (mm) | Posts | Dash | McMaster P/N | Free ID (in) | Stretch |
|---|---|---|---|---|---|---|---|---|---|---|
| o-ring 1x tapered | 7 | 1.128 | 28.647 | 0.359 | 9.119 | 1 | 202 | 1173N202 | 0.234 | +53% |
| posts x2 pop bumper top | 1 | 2.858 | 72.594 | 0.910 | 23.107 | 2 | 210 | 1173N21 | 0.734 | +24% |
| posts 2x top rt of rollover | 1 | 3.051 | 77.499 | 0.971 | 24.669 | 2 | 210 | 1173N21 | 0.734 | +32% |
| posts x2 pop bumper bottom | 1 | 3.584 | 91.024 | 1.141 | 28.974 | 2 | 213 | 1173N213 | 0.921 | +24% |
| posts x2 R-top bottom | 1 | 3.857 | 97.958 | 1.228 | 31.181 | 2 | 213 | 1173N213 | 0.921 | +33% |
| posts x2 R-top top | 1 | 4.833 | 122.757 | 1.539 | 39.075 | 2 | 218 | 1173N218 | 1.234 | +25% |
| posts x3 R-side ctr | 1 | 4.980 | 126.503 | 1.585 | 40.267 | 3 | 218 | 1173N218 | 1.234 | +28% |
| posts x2 R-top ctr | 1 | 5.269 | 133.830 | 1.677 | 42.599 | 2 | 218 | 1173N218 | 1.234 | +36% |
| posts x3 L-side | 1 | 5.909 | 150.095 | 1.880 | 47.777 | 3 | 223 | 1173N223 | 1.609 | +17% |

## 3. Electrical

N/A

## 4. Software

N/A

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| O-ring material | Silicone (VMQ), 50A, 1/8" cross-section, red |
| Installed stretch | 1-post 45–55%; 2-post 20–40%; 3-post 10–30% |
