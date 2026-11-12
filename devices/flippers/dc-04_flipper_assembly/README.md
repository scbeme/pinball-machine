# DC-04 Flipper assembly (L/R/Upper-L)

**Revision:** 20261106-01 · **Devices covered:** DC-04 Flipper assembly, DP-09 Flipper buttons (see [DP-09](../dp-09_flipper_buttons/README.md)), DP-10 Flipper coil/driver · **CAD base name:** flipper

## 1. Requirements

| ID | Device | Tier | Qty | Requirements |
|---|---|---|---|---|
| DC-04 | Flipper assembly (L/R/Upper-L) | Composite Mech | 3 | **Function:** Player-controlled paddle, strikes ball to keep in play<br>**Switch:** Player pushbutton L/R + upper-L; left fires lower-left + upper-left simultaneously, right fires lower-right only<br>**Actuator:** Pull/push-pull, 12 V, 25 N, 10 mm stroke<br>**Driver:** N-channel, VDS ≥ 55 V, RDS(on) specified at VGS ≤ 4.5 V, ≥ 10 A, TO-220<br>**Protection:** External flyback diode, band toward positive<br>**Coil count:** One coil per flipper; center-pinned lever arm; mechanism per CAD<br>**Body:** Player-actuated paddle, pivots to strike ball<br>**Rubber:** Resilient material along flipper paddle contact edge, replaceable |
| DP-09 | Flipper buttons (L/R) | Primitive | 2 | See [DP-09](../dp-09_flipper_buttons/README.md) |
| DP-10 | Flipper coil/driver | Primitive | 3 | See DC-04 |

## 2. Mechanical

Geometry and positions: CAD (`flipper`). Mechanical sub-parts (body, rubber, lever arm) are recorded in Section 3.

## 3. Electrical

| Item | Design solution |
|---|---|
| Trigger | Blue Pill firmware: the button closes a Blue Pill input on the same Topedal board as the coils; firmware drives the Topedal driver with a fixed-duration fire pulse (about 30–40 ms estimated, no end-of-stroke sensor), then PWM hold; firmware ends drive on button release. No hardware autofire |
| Actuator | JF-1039B, 12 V-rated, 25 N, 10 mm stroke, push-pull type; coil resistance 5.2–5.4 Ω (bench-measured); driven at 24 V (2× overdrive) |
| Driver | IRLZ44NPbF: VDS 55 V, RDS(on) 22 mΩ typ. (VGS = 4 V/10 V), 47 A, TO-220; the Topedal board's own Rev 1.1 part |
| Protection | 1N400x-class diode, one per solenoid; flipper feed fuse (rating TBD); firmware protections in the control logic. No separate thermal control |
| Body | PETG-printed, embedded COTS hex-key (Allen wrench) shaft, hex-to-round printed adapter sleeve, 2× ball bearing support, grub-screw shaft capture with heat-set brass inserts, removable back-side rubber capture plate with heat-set brass inserts |
| Rubber | McMaster-Carr Silicone Rubber Bumper Strip, P/N 8780N116: 1/2" width × 1/8" thick × 24" length, 50A durometer, red, plain backing; single strip wrapped around paddle edge, clamped under capture plate |

## 4. Software

See [control_logic.md](control_logic.md).

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| Stroke | 10 mm |
| Actuator force | 25 N |
| Coil resistance | 5.2–5.4 Ω |
| Driver | VDS ≥ 55 V; RDS(on) specified at VGS ≤ 4.5 V; ≥ 10 A; TO-220 |
| Fire pulse width | TBD |
| Hold duty, PWM frequency, hold voltage | TBD |
| Flipper feed fuse rating | TBD |
