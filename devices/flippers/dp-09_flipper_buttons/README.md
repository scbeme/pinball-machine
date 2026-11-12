# DP-09 Flipper buttons (L/R)

**Revision:** 20261106-01 · Part of the flipper design; see [DC-04 Flipper assembly](../dc-04_flipper_assembly/README.md).

| Item | Value |
|---|---|
| Function | Player pushbuttons for the flippers: left button fires lower-left + upper-left, right button fires lower-right only |
| Qty | 2 |
| Button | Pinball Life PBL-100-0081-00-XX or comparable: opaque cabinet button, 1-1/8" shaft with spring (Williams/Bally A-16883-x and Data East/Stern 500-5026-xx equivalents) |
| Nut | PAL nut, Williams/Bally 02-3000 |
| Switch | SPST. The button's internal rod pushes on a [stainless cable tie](../../../system/system_common_components/houocon_stainless_cable_tie.md), either as an integral leaf of a leaf switch (commercial design, same construction as the standup targets DP-01 and DP-19) or as a spring leaf (flexure for the commercial button feel) with the electrical switch implemented as a microswitch. Choice TBD; actuation and gap per CAD |
| Interface | Closes a Blue Pill input on the Topedal board; firmware drives the coil (see DC-04) |
