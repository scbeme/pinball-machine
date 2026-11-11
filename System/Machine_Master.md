# Machine Master

**Revision:** 20261110-02 · **Date:** 2026-11-10

## System overview

### System

| Topic | Definition |
|---|---|
| Hybrid pinball | Typical pinball playing field used to accomplish game scenario objectives displayed real-time on monitor |
| Physical machine | Portable, tabletop cabinet containing typical pinball devices controlled using modern day electronics + monitor for real-time graphics |
| Game scenarios | Software defined theme packs played on generic playing field |


### Mechanical

| # | Item | Description |
|---|---|---|
| 1 | Cabinet | Baltic birch plywood construction |
| 2 | Materials | COTS materials and fasteners; 3D printed and laser cut custom parts |
| 3 | Access | Hinged playfield (service access); fixed bottom shelf panel; no legs — rubber pads only |


### Electrical

| # | Item | Description |
|---|---|---|
| 1 | Time-critical devices | All solenoid firing runs through the Topedal board's Blue Pill firmware (fire pulse, then PWM hold where used); no hardware autofire (safety). The switches for DC-01 Pop bumpers, DC-02 Slingshots and DC-04 Flipper Assembly are on the same Topedal board as their coils |
| 2 | Non-time-critical devices | Digital switches connected via Topedal board's onboard direct/matrix switch inputs |
| 3 | Rules engine & asset management | Computer supporting MPF + Godot Media Controller (GMC) running Mission Pinball Framework (MPF) — game logic, scoring, game scenarios; GMC for audio/video/monitor display |
| 4 | Comm bus | USB serial between host and Topedal board(s) |


### Software

| # | Item | Description |
|---|---|---|
| 1 | Firmware | Identical OPP firmware flashed to all Topedal boards (same STM32F103 processor as standard OPP), distinguished by board address; MPF config (not firmware) defines game scenario behavior |
| 2 | Game scenarios | A game scenario is defined by populating a Game Scenario Framework — requires no firmware changes |
| 3 | Playing field devices | <b>Primitive</b> — single physical switch/coil/sensor, no sub-components, assigned unique ID.<br><b>Composite</b> — 2 or more primitives combined to perform one coordinated physical action, e.g., button + coil + EOS sensor = flipper assembly.<br><b>Ball-state Device</b> — tracks ongoing ball location/count/presence as persistent state, e.g., scoop, ball lock, or trough |
| 4 | Game setup | Players select game preferences before starting a game. Setup parameters include standard parameters applicable to all scenarios + scenario-specific parameters |


## Requirements

### System-Level Requirements

| ID | Title | Definition | Category | Type |
|---|---|---|---|---|
| S-01 | Game play | Playing field ball action and control will be similar to a traditional, full sized pinball machine (1 1/16" dia balls, 40" x 20.5" playing field, 6.5-7 deg slope). Audio, graphics, and video are used to enhance the gaming experience including real-time game scenario progress | Functional | Mandatory |
| S-02 | Game scenarios | System supports user selectable game scenarios. Scenarios have unique themes that use the same generic playing field | Functional | Mandatory |
| S-03 | Game setup parameters | Game parameters will be selected by the player before each game is started. Example parameters include: game difficulty level, number of players, player names, scenario, scenario specific parameters | Functional | Mandatory |
| G-01 | Initialize game | Master power ON, monitor presents setup prompts which player selects | Functional | Mandatory |
| G-02 | Select scoring targets | Player uses onscreen game info to identify best scoring targets | Functional | Mandatory |
| G-03 | Shoot ball | Player launches ball onto playing field using shooter | Functional | Mandatory |
| G-04 | Playing field action | Player uses flippers and programmable buttons (DP-20 Programmable button) to keep ball in play and interact with the game to maximize score | Functional | Mandatory |
| G-05 | Repeat | Repeat steps G-02–G-04 until turn is over | Functional | Mandatory |
| C-01 | Physical | Portable system, played on tabletop, stored in typical household closet | Constraint | Mandatory |
| C-02 | Components | Use COTS parts and materials including modern electronics to replace traditional electro-mechanical, analog devices. Fab and assembly using standard workshop equipment plus 3D printer and 40W laser (24"x12" bed) | Constraint | Mandatory |
| C-03 | Safety | Electrical design will comply with industry-standard safety practices | Constraint | Mandatory |


### Software Requirements — Game Setup Parameters

| ID | Parameter | Scope | Setting | Default | Applies To | Comments |
|---|---|---|---|---|---|---|
| GP-01 | Number of players | Global | 1–4 | 1 | All | — |
| GP-02 | Player name/initials | Per-player | Free text | — | All | Data structure defined in Detailed Design |
| GP-03 | Per-player difficulty tier | Per-player | 1-Clueless<br>2-Beginner<br>3-Intermediate<br>4-Advanced<br>5-Champion | 3 | All | Data structure defined in Detailed Design |
| GP-04 | Balls per game | Global | 1–10 | 3 | All | — |
| GP-05 | Outlane save budget | Global | 0–5 | 3 | All | — |
| GP-06 | Outlane save time | Global | 0–15 seconds | 5 | All | — |
| GP-07 | Tilt warning count | Global | 0–5 | 3 | All | 0=Disabled |
| GP-08 | Tilt warning sensitivity | Global | 1-Very low<br>2-Low<br>3-Medium<br>4-High<br>5-Very high | 3 | All | Requires ADC test values |
| GP-09 | Game scenario selection | Global | List of installed scenario IDs | — | All | — |
| GP-10 | Outlane width | TBD | 1-Liberal<br>2-Normal<br>3-Difficult | 2 | All | Physical implementation: MD-02 Adjustable outlane pin. Scope TBD pending mechanism decision |


## System architecture

![System architecture](System_Architecture.svg)

## Device Register

| ID | Device | Tier | Qty | Electrical? | X mm | Y mm |
|---|---|---|---|---|---|---|
| DB-01 | Scoop/hole | Ball-State Device | 1 | Y | 58.9 | 621.4 |
| DB-02 | Ball lock | Ball-State Device | 0–1 (desired) | TBD |  |  |
| DB-03 | Ball Trough | Ball-State Device | 1 | Y | 172.4 | -36.4 |
| DB-04 | Shooter lane ball-present sensor | Ball-State Device | 1 | Y | 206.9 | -40.8 |
| DC-01 | Pop bumpers | Composite Mech | 3 | Y |  |  |
| DC-01A |  |  |  |  | -59.2 | 485.2 |
| DC-01B |  |  |  |  | 32.5 | 485.2 |
| DC-01C |  |  |  |  | -13.4 | 396.5 |
| DC-02 | Slingshots | Composite Mech | 2 | Y |  |  |
| DC-02A |  |  |  |  | -97.0 | 89.5 |
| DC-02A-sw1 |  |  |  |  | -103.8 | 110.9 |
| DC-02A-sw2 |  |  |  |  | -84.7 | 68.6 |
| DC-02B |  |  |  |  | 97.0 | 89.5 |
| DC-02B-sw1 |  |  |  |  | 103.7 | 110.9 |
| DC-02B-sw2 |  |  |  |  | 84.6 | 68.6 |
| DC-03 | Outlane save gate/deflector | Composite Mech | 2 | Y |  |  |
| DC-03A |  |  |  |  | -167.9 | 4.8 |
| DC-03B |  |  |  |  | 166.1 | 4.8 |
| DC-04 | Flipper assembly | Composite Mech | 3 | Y |  |  |
| DC-04A |  |  |  |  | -149.8 | 236.6 |
| DC-04B |  |  |  |  | -73.0 | 0.1 |
| DC-04C |  |  |  |  | 73.0 | 0.1 |
| DC-05 | Drop target bank (side-by-side) | Composite Mech | 7 | Y |  |  |
| DC-05A |  |  |  |  | 141.6 | 389.6 |
| DC-05B |  |  |  |  | 145.1 | 364.4 |
| DC-05C |  |  |  |  | 148.7 | 339.3 |
| DC-05D |  |  |  |  | 152.2 | 314.1 |
| DC-05E |  |  |  |  | 155.8 | 289.0 |
| DC-05F |  |  |  |  | 159.4 | 263.8 |
| DC-05G |  |  |  |  | 162.9 | 238.7 |
| DC-06 | Drop target (single) | Composite Mech | 1 | Y | 140.9 | 546.0 |
| DC-07 | Drop target bank (inline) | Composite Mech | 4 | Y |  |  |
| DC-07A |  |  |  |  | -106.3 | 413.2 |
| DC-07B |  |  |  |  | -111.2 | 445.9 |
| DC-07C |  |  |  |  | -116.2 | 478.5 |
| DC-07D |  |  |  |  | -121.1 | 511.2 |
| DP-01 | Standup targets (side-by-side) | Primitive | 6 | Y |  |  |
| DP-01A |  |  |  |  | 154.8 | 378.6 |
| DP-01B |  |  |  |  | 158.4 | 353.5 |
| DP-01C |  |  |  |  | 161.9 | 328.3 |
| DP-01D |  |  |  |  | 165.5 | 303.2 |
| DP-01E |  |  |  |  | 169.1 | 278.0 |
| DP-01F |  |  |  |  | 172.6 | 252.9 |
| DP-03 | Spinner | Primitive | 1 | Y | -120.2 | 261.5 |
| DP-04 | Tilt sensor | Primitive | 1 | Y | 313.3 | 463.2 |
| DP-09 | Flipper buttons | Primitive | 2 | Y |  |  |
| DP-09L |  |  |  |  | -204.2 | -22.1 |
| DP-09R |  |  |  |  | 235.0 | -22.1 |
| DP-12 | Game setup/start button | Primitive | 1 | Y | 89.9 | -157.2 |
| DP-13 | Master power switch | Primitive | 1 | Y | 89.9 | -139.1 |
| DP-18 | Rollover sensor | Primitive | 7 | Y |  |  |
| DP-18A |  |  |  |  | -164.1 | 575.7 |
| DP-18B |  |  |  |  | -57.3 | 575.7 |
| DP-18C |  |  |  |  | -13.1 | 575.7 |
| DP-18D |  |  |  |  | -167.7 | 104.7 |
| DP-18E |  |  |  |  | -140.5 | 104.7 |
| DP-18F |  |  |  |  | 140.5 | 104.2 |
| DP-18G |  |  |  |  | 168.5 | 104.7 |
| DP-19 | Standup target (single) | Primitive | 1 | Y | -100.6 | 592.9 |
| DP-20 | Programmable button | Primitive | 2 | Y |  |  |
| DP-20L |  |  |  |  | -204.2 | 28.5 |
| DP-20R |  |  |  |  | 235.0 | 28.5 |
| DP-21 | Exit button | Primitive | 1 | Y | 89.9 | -173.4 |
| DP-22 | Volume control | Primitive | 1 | Y | 89.9 | -190.5 |
| DP-23 | Monitor menu joystick | Primitive | 1 | Y | -135.8 | -157.3 |
| DP-24 | Rebound switch (leaf behind rubber ring) | Primitive | 2 | Y |  |  |
| DP-24A |  |  |  |  | 58.0 | 559.9 |
| DP-24B |  |  |  |  | 98.0 | 515.1 |
| DP-25 | Display monitor | System | 1 | Y | 15.5 | 733.8 |
| DP-26 | Speakers | System | 2 | Y |  |  |
| DP-26A |  |  |  |  | -151.3 | 732.4 |
| DP-26B |  |  |  |  | 182.0 | 732.4 |
| DP-27 | Host computer | System | 1 | Y | 278.3 | 540.0 |
| DP-28 | Topedal board | System | 3 | Y |  |  |
| DP-28A |  |  |  |  | 308.3 | 540.0 |
| DP-28B |  |  |  |  | 338.3 | 540.0 |
| DP-28C |  |  |  |  | 278.3 | 526.0 |
| DP-29 | 24 V coil supply | System | 1 | Y | 308.3 | 526.0 |
| DP-30 | 5 V supply | System | 1 | Y | 338.3 | 526.0 |
| DP-31 | Bonus rack lights | Primitive | 15 | Y |  |  |
| DP-31-01 |  |  |  |  | -49.8 | 193.3 |
| DP-31-02 |  |  |  |  | -12.2 | 189.0 |
| DP-31-03 |  |  |  |  | 26.7 | 194.9 |
| DP-31-04 |  |  |  |  | 95.4 | 185.3 |
| DP-31-05 |  |  |  |  | -82.0 | 170.6 |
| DP-31-06 |  |  |  |  | 43.5 | 171.6 |
| DP-31-07 |  |  |  |  | -13.2 | 157.4 |
| DP-31-08 |  |  |  |  | 71.7 | 156.1 |
| DP-31-09 |  |  |  |  | -58.5 | 146.7 |
| DP-31-10 |  |  |  |  | 47.7 | 134.8 |
| DP-31-11 |  |  |  |  | 11.4 | 129.3 |
| DP-31-12 |  |  |  |  | -21.6 | 114.1 |
| DP-31-13 |  |  |  |  | -33.9 | 84.3 |
| DP-31-14 |  |  |  |  | 22.3 | 86.7 |
| DP-31-15 |  |  |  |  | -6.3 | 62.8 |
| DP-32 | Drop-target ball lamps | Primitive | 14 | Y |  |  |
| DP-32-01 |  |  |  |  | 62.8 | 374.8 |
| DP-32-02 |  |  |  |  | 38.3 | 371.2 |
| DP-32-03 |  |  |  |  | 66.9 | 348.2 |
| DP-32-04 |  |  |  |  | 42.1 | 344.6 |
| DP-32-05 |  |  |  |  | 45.8 | 318.5 |
| DP-32-06 |  |  |  |  | 70.9 | 322.2 |
| DP-32-07 |  |  |  |  | 49.2 | 294.1 |
| DP-32-08 |  |  |  |  | 74.6 | 297.8 |
| DP-32-09 |  |  |  |  | 52.9 | 268.2 |
| DP-32-10 |  |  |  |  | 78.6 | 272.0 |
| DP-32-11 |  |  |  |  | 82.4 | 246.9 |
| DP-32-12 |  |  |  |  | 56.4 | 243.0 |
| DP-32-13 |  |  |  |  | 86.2 | 221.7 |
| DP-32-14 |  |  |  |  | 60.0 | 217.9 |
| DP-33 | DELUXE letter lights | Primitive | 6 | Y |  |  |
| DP-33-01 |  |  |  |  | 15.3 | 353.0 |
| DP-33-02 |  |  |  |  | 19.3 | 327.6 |
| DP-33-03 |  |  |  |  | 23.3 | 302.2 |
| DP-33-04 |  |  |  |  | 27.3 | 276.8 |
| DP-33-05 |  |  |  |  | 31.3 | 251.4 |
| DP-33-06 |  |  |  |  | 35.3 | 226.0 |
| DP-34 | ABCD lane feature lights | Primitive | 7 | Y |  |  |
| DP-34-01 |  |  |  |  | -75.8 | 652.4 |
| DP-34-02 |  |  |  |  | -36.4 | 654.7 |
| DP-34-03 |  |  |  |  | 2.9 | 652.5 |
| DP-34-04 |  |  |  |  | -59.2 | 622.4 |
| DP-34-05 |  |  |  |  | -13.6 | 622.4 |
| DP-34-06 |  |  |  |  | -140.7 | 149.8 |
| DP-34-07 |  |  |  |  | 140.6 | 149.8 |
| DP-35 | Left-lane feature lights | Primitive | 7 | Y |  |  |
| DP-35-01 |  |  |  |  | -168.7 | 541.0 |
| DP-35-02 |  |  |  |  | -161.7 | 421.1 |
| DP-35-03 |  |  |  |  | -153.9 | 385.4 |
| DP-35-04 |  |  |  |  | -147.6 | 359.0 |
| DP-35-05 |  |  |  |  | -140.1 | 332.5 |
| DP-35-06 |  |  |  |  | -133.5 | 305.8 |
| DP-35-07 |  |  |  |  | -125.9 | 280.3 |
| DP-36 | Bank shot value lights | Primitive | 2 | Y |  |  |
| DP-36-01 |  |  |  |  | -95.1 | 357.4 |
| DP-36-02 |  |  |  |  | -89.0 | 327.9 |
| DP-37 | DELUXE value lights | Primitive | 2 | Y |  |  |
| DP-37-01 |  |  |  |  | -43.9 | 278.7 |
| DP-37-02 |  |  |  |  | -10.7 | 284.0 |
| DP-38 | 8-ball saucer chain and outlane special lights | Primitive | 7 | Y |  |  |
| DP-38-01 |  |  |  |  | 130.7 | 570.7 |
| DP-38-02 |  |  |  |  | 150.3 | 491.1 |
| DP-38-03 |  |  |  |  | 144.5 | 458.7 |
| DP-38-04 |  |  |  |  | 133.4 | 435.3 |
| DP-38-05 |  |  |  |  | 117.9 | 414.8 |
| DP-38-06 |  |  |  |  | -168.4 | 149.4 |
| DP-38-07 |  |  |  |  | 168.3 | 149.4 |
| DP-39 | Bonus, multiplier and shoot-again lights | Primitive | 8 | Y |  |  |
| DP-39-01 |  |  |  |  | -33.2 | 33.8 |
| DP-39-02 |  |  |  |  | 0.0 | 33.8 |
| DP-39-03 |  |  |  |  | 33.1 | 33.8 |
| DP-39-04 |  |  |  |  | -40.9 | 9.9 |
| DP-39-05 |  |  |  |  | 42.6 | 9.9 |
| DP-39-06 |  |  |  |  | -12.8 | -6.4 |
| DP-39-07 |  |  |  |  | 14.3 | -6.4 |
| DP-39-08 |  |  |  |  | 0.0 | -35.0 |
| DP-40 | Pop bumper lights | Primitive | 3 | Y |  |  |
| DP-40-01 |  |  |  |  | -59.2 | 485.2 |
| DP-40-02 |  |  |  |  | 32.5 | 485.2 |
| DP-40-03 |  |  |  |  | -13.4 | 396.5 |
| DP-41 | General illumination lights | Primitive | 32 | Y |  |  |
| DP-41-01 |  |  |  |  | -161.1 | 668.2 |
| DP-41-02 |  |  |  |  | 153.3 | 673.6 |
| DP-41-03 |  |  |  |  | 186.1 | 645.8 |
| DP-41-04 |  |  |  |  | -168.9 | 629.5 |
| DP-41-05 |  |  |  |  | 93.4 | 634.7 |
| DP-41-06 |  |  |  |  | -123.0 | 600.7 |
| DP-41-07 |  |  |  |  | 144.6 | 590.6 |
| DP-41-08 |  |  |  |  | 57.6 | 580.6 |
| DP-41-09 |  |  |  |  | -79.3 | 577.2 |
| DP-41-10 |  |  |  |  | -35.3 | 577.2 |
| DP-41-11 |  |  |  |  | 9.2 | 577.2 |
| DP-41-12 |  |  |  |  | 90.1 | 576.7 |
| DP-41-13 |  |  |  |  | -98.7 | 538.4 |
| DP-41-14 |  |  |  |  | 177.9 | 518.4 |
| DP-41-15 |  |  |  |  | 121.8 | 508.0 |
| DP-41-16 |  |  |  |  | -144.7 | 479.5 |
| DP-41-17 |  |  |  |  | 107.3 | 456.6 |
| DP-41-18 |  |  |  |  | 172.9 | 448.1 |
| DP-41-19 |  |  |  |  | -76.9 | 434.8 |
| DP-41-20 |  |  |  |  | -137.3 | 425.3 |
| DP-41-21 |  |  |  |  | 172.9 | 401.4 |
| DP-41-22 |  |  |  |  | 172.9 | 366.9 |
| DP-41-23 |  |  |  |  | -169.1 | 283.9 |
| DP-41-24 |  |  |  |  | -164.8 | 197.2 |
| DP-41-25 |  |  |  |  | 170.6 | 203.0 |
| DP-41-26 |  |  |  |  | -118.7 | 116.6 |
| DP-41-27 |  |  |  |  | 118.6 | 116.6 |
| DP-41-28 |  |  |  |  | -100.6 | 59.9 |
| DP-41-29 |  |  |  |  | 100.6 | 59.9 |
| DP-41-30 |  |  |  |  | -115.1 | 24.4 |
| DP-41-31 |  |  |  |  | 113.3 | 25.4 |
| DP-41-32 |  |  |  |  | -119.9 | -39.2 |
| MC-01 | Cabinet body | Mechanical | Per CAD | N |  |  |
| MC-02 | Hinged playfield support | Mechanical | Per CAD | N |  |  |
| MC-03 | Glass top and slide retention | Mechanical | Per CAD | N |  |  |
| MC-04 | Bottom shelf | Mechanical | Per CAD | N |  |  |
| MC-05 | Rubber feet | Mechanical | Per CAD | N |  |  |
| MD-01 | Playfield post | Mechanical | Per CAD (not tracked) | N |  |  |
| MD-02 | Adjustable outlane pin | Mechanical | 2 | N |  |  |
| MD-02A |  |  |  |  | 176.0 | 137.8 |
| MD-02B |  |  |  |  | -178.7 | 136.3 |
| MG-01 | Ball guides | Mechanical | Per CAD (not tracked) | N |  |  |
| MG-02 | Apron | Mechanical | 1 | N |  |  |
| ML-01 | Shooter plunger + spring | Mechanical | 1 | N | 206.4 | -105.5 |
