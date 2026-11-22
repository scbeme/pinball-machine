# Pinball Session Notes

**Revision:** pinball_session_notes_20261121-02
**Date:** 2026-11-21

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session (Scott: administrative changes need no approval; proposed carry-forward items in Section 6 are not Open Items until approved) | | | |

## 2. Session scope

Research only (iPad session, Air not connected). No design requirement, form-fit-function, CAD, or GitHub change. `scan.py` not run.

## 3. Findings

| Topic | Finding | Evidence quality |
|---|---|---|
| Post/protected-area lamp color (commercial, incl. Bally Eight Ball Deluxe) | White/clear lamp is the default under plastics, in pop bumpers, GI and backbox. Color comes from the cover (insert, dome, plastic). Tinted lamps exist as special-order items. | Retailer catalogs and community posts; no count by color found |
| EBD specifics | Lamps are #44/#555 incandescents. pinwiki lamp chart has no bulb type or color column. Marco EBD LED kit page gives 175 lamps, no color breakdown. Bulb color per position needs the original Bally manual (not obtained). | Not resolved |
| Modern commercial insert lighting | Stern-class machines still use single-color lamp-style LEDs (#555 / #44-47) under inserts, mostly white. RGB appears mainly in accent lighting (cabinet, speaker) and in P3-ROC/homebrew builds. Aftermarket RGB retrofits reported to reduce ball visibility. | Forum and retailer sources; no manufacturer documentation found |
| Post light concept comparison | WS2812B disk beamed into dome: single chain, RGB, one part for all 101 lights; weak point is beaming loss through the 10mm hole and playfield thickness. 5mm LED + resistor: simple, bright in dome, but single color, one driver channel each (or grouped), second electrical family. Merged option: 5mm addressable LED in dome keeps chain and RGB, removes beaming loss. A 10mm disk cannot enter the 10mm through-hole. | Engineering reasoning; current and viewing-angle figures not verified |

## 4. LED sources (5mm addressable RGB, through-hole)

| Source | Part | Lens | IC (as listed) | Price as listed | Notes |
|---|---|---|---|---|---|
| Amazon (Scott's find, B0H87Y196Q) | WS2812B F5 5mm through-hole, 100 pcs | Transparent; frosted variant shown | "WS2812B" built-in IC (unverified; may be APA106-class) | Scott: about 1/4 of US-source price (about $0.20 each; price not captured) | Pinout DIN 4, GND 3, VDD 2, DOUT 1. VDD 3.5-5.3V, input -0.5 to VDD+0.5V, Topt -25 to +80C, storage -40 to +105C. Page not machine-readable; specs from Scott's screenshots. Viewing angle, current, color order, maker not shown |
| SparkFun COM-12986 (DigiKey 1568-12986-ND) | 5mm diffused PTH, 5-pack | Diffused | WS2812 control IC (commenter: APA-106-F5) | $4.75; $4.28 at 100+ (per pack) | DigiKey: 967 in stock, 12-week lead time (one regional page). 0.1uF cap per LED recommended. RGB order |
| SparkFun COM-12999 (DigiKey 1568-12999-ND) | 5mm clear PTH, 5-pack | Clear | WS2812 | Not captured | Commenter: one color projects straight, other two at slight angle (clear lens) |
| Adafruit 1938 (DigiKey 1938) | NeoPixel 5mm diffused, 5-pack | Diffused | SK6812 or WS2812 | $4.95; $3.96 at 100+ (per pack) | Flexible leads, 1.1mm spacing. RGB order |
| Adafruit 1837 | NeoPixel 5mm clear | Clear | | $4.95 | Discontinued. 5mm tall, 6mm base diameter, 26mm pins |
| Pololu 2535 | 5mm diffused, 10-pack | Diffused | WS2811, 5V | $7.84; $6.51 at 100+ (per pack) | About 50mA at full RGB. Chains with WS2812B products. One page showed out of stock |
| Solarbotics 60545 | 5mm diffused, 5-pack | Diffused | APA106 (WS2812B-compatible protocol) | USD $4.59 | Backorder |
| LCSC C190565 | Worldsemi WS2812D-F5 | Not stated | WS2812D | Not captured | Maker part. 800 kbit/s, 2 kHz PWM. Datasheet not pulled |
| SparkFun 23649 | 5mm right-angle addressable | Diffused | APA106/WS2812 type | Not captured | Right-angle; likely not useful for dome base |
| Mouser | None found | | | | Keyword search only; 8mm Soldered WS2812B THT found (too large). Parametric search not done |

URLs: sparkfun.com/products/12986, sparkfun.com/products/12999, sparkfun.com/products/23649, adafruit.com/products/1938, adafruit.com/products/1837, pololu.com/product/2535, solarbotics.com/?p=88207, lcsc.com (WS2812D-F5 C190565), digikey.com (12986/5673799, 12999/5673800), amazon.com/dp/B0H87Y196Q.

Unknowns (all 5mm parts): viewing angle, current per LED, color order of the Amazon part, manufacturer of the Amazon part. 5mm through-hole parts are RGB order (WS2812B disks are GRB); MPF sets color order per light.

Cost note (Scott): at about $1 vs $0.20 per LED, the premium for 33 lights is about $20-30; Scott finds it hard to justify for a simple LED. Preference, not a decision.

## 5. Decisions

| ID | Decision |
|---|---|
| (none) | No design decisions this session. Post light concept stays as locked (WS2812B disk, 3D-printed dome) |

## 6. Carry-forward (proposed, not Open Items until Scott approves)

| Item | Detail |
|---|---|
| Post light concept decision | WS2812B disk beamed into dome vs 5mm addressable LED in dome (design change; needs Scott's approval) |
| Sample purchase and bench test | Recommended: Amazon 100-pack (33 lights + spares + tests); optional one DigiKey 12986 pack as documented baseline. Test color order, current at full white, chain with WS2812B disks, light in 3D-printed dome |
| Playfield thickness at post-light holes | Needed to assess beaming loss |
| Post-light control requirement | Individual vs group control; RGB vs white |
| EBD per-position lamp color | Needs the original Bally manual or lamp pages uploaded to the Project |
| Mouser parametric search; LCSC WS2812D-F5 datasheet | Not done |

## 7. Limits

| Item | State |
|---|---|
| Air project folder | Not connected this session; notes saved to the Project only. Copy to `~/projects/pinball-machine` when the Air is available |
| Amazon page | Not fetchable (robots disallowed); specs from screenshots only |
