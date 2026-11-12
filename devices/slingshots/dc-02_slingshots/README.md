# DC-02 Slingshots

**Revision:** 20261106-01 · **CAD base name:** slingshot

## 1. Requirements

| ID | Device | Tier | Qty | Requirements |
|---|---|---|---|---|
| DC-02 | Slingshots | Composite Mech | 2 | **Function:** Ball strikes stretched o-ring → integrated leaf switch closes → board firmware fires the solenoid → solenoid drives kicker arm → kicker pushes ring segment outward → ring deflection kicks ball back into play. All solenoid firing runs through the Topedal board's STM firmware; no hardware autofire |

## 2. Mechanical

Geometry and positions: CAD (`slingshot`).

| Sub-component | Specification |
|---|---|
| Posts | 3-post equilateral triangle, DIY 3D print, bolt-mount through playfield |
| O-ring | McMaster-Carr 1173N227: dash 227, 2.109" free ID × 2.387" OD × 1/8" (0.139") CS, 50A silicone (VMQ), red, ASTM D2000 / SAE AS568. Qty needed: 2 |
| O-ring installed stretch (static) | +35% (centers the commercial slingshot 30–50% band) |
| O-ring installed inside circumference | 227.149 mm (R-flipper side) / 227.272 mm (L-flipper side) |
| Kicker arm | DIY; travel 5–8 mm (linear scale of the commercial 6–10 mm per the 0.8148 playfield scale factor) |
| Linkage lever ratio | About 1.5:1 (solenoid plunger stroke 10 mm → kicker arm travel about 6.67 mm). Uses the full solenoid stroke; gives 1.5× force advantage at the kicker. Lever ratio, kicker arm length and pivot location TBD per CAD |
| Leaf switch | DIY leaf-switch assembly, same construction as the DP-01 Standup targets leaf switches. Mounted so ring deflection on ball impact closes the contacts |
| Switch position | Behind the ring segment opposite the kicker arm, so ball impact on the ring front face deflects the ring into the switch |

## 3. Electrical

| Sub-component | Design solution |
|---|---|
| Switch | Integrated DIY leaf switch (see Section 2); input on the same Topedal board as its coil; the board firmware fires the solenoid (no hardware autofire) |
| Actuator | Heyiarbeit JF-1039B DC push-pull solenoid (nominal 12 V, 25 N, 0.4 A, 4.8 W, 10 mm stroke). Operating voltage: **24 V DC**. 12 V is inadequate for the scaled dynamic kick (ball Δv 0.9 m/s vs scaled target 1.8–2.7 m/s) |
| Driver | Topedal board onboard solenoid driver: low-side IRLZ44NPbF MOSFET switching |
| Protection | External 1N400x-class flyback diode, one per solenoid (the Topedal board has none; same as DC-04 Flipper assembly) |
| Fusing | Slow-blow fuse per coil bank, ratings TBD |

## 4. Software

MPF `slingshot` device, standard config. The board firmware fires the solenoid on switch closure; MPF receives the event for scoring. See [control_logic.md](control_logic.md).

## 5. Acceptance Criteria

| Item | Requirement |
|---|---|
| O-ring installed stretch | +35% |
| Kicker arm travel | 5–8 mm |
| Linkage lever ratio | About 1.5:1 |
| Actuator supply | 24 V DC |
| Ball Δv | Scaled target 1.8–2.7 m/s |
| Fire pulse width and rate | TBD |
| Fuse rating | TBD |
