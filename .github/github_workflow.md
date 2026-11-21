# GitHub Workflow

**Revision:** 20261121-03
**Migrated from:** github_workflow_20261121-01 (Claude Project, now `ref-only_`)
**Date:** 2026-11-21
**Status:** Sections 1 to 9 carry the approved 2026-11-11 content, revised 2026-11-12 with Scott's approval to match the repository (`main` at 565c8dd, per session notes 20261112-03). Sections 10 to 16 carry rules from the retired Project Instructions (rev 20261110-01); Claude reviewed them 2026-11-12 under Scott's delegation of document reviews. Sections 1, 2, 3, 10, 11, 14, 15 and 16 were revised 2026-11-12 with Scott's approval to match the Design vs Admin Task Assignment (section 1). Revised 2026-11-18 with Scott's approval: flat `tests/` folders for test cards together with their test code (section 3 Common components folders, section 10); `devices/lights/common_components/tests/` added (merged in PR #33). Revised 2026-11-18 (second revision) with Scott's approval: `system/software/` holds the `opp/` and `mpf/` open-source baseline folders (section 3, section 5, MPF row); the firmware tag and firmware register rules are retired and replaced by Step 0 (section 10). Folder and scan changes in PR #37. Revised 2026-11-19 with Scott's approval ("publish. instructions revised"): the one-click batch approval is replaced by the standing GitHub approval in the Profile Instructions (MacBook Air autonomy, item 5) in sections 1, 2, 3, 14, 15 and 16. Revised 2026-11-21 with Scott's approval ("approve all ... execute ALL", GitHub document management audit against standard GitHub practice): merge-commit-only merging, required status check, revision header check, tag ruleset and baseline Releases, automatic branch deletion, commit and PR conventions, rename-only commits (sections 2, 3, 4, 10, 14, 15) and the accepted-deviations list (section 17). Executed in PRs #42 and #43, the rulesets and the Release `v2026.11.21.1`. Revised 2026-11-21 (second revision) with Scott's approval ("approve #E"): this file moved from the Claude Project to `.github/github_workflow.md` in the repository, which is now its master (sections 1, 3, 4, 5, 15); scan.py covers `.github/*.md` (PR #44). Revised 2026-11-21 (third revision, administrative audit of the Project Instructions against this file; Scott: "execute without my involvement"): session-start read location, Project location exception, `Migrated from:` limited to non-design documents (Scott's 2026-11-10 preference: design content carries no source-document references), workflow document row, `.github/*.md` revision rule, filename deviation (sections 1, 2, 9, 15, 17).
**Supersedes:** github_workflow_20261121-01 (Project copy)

## 1. Authority

| Item | Rule |
|---|---|
| Precedence | Claude Profile Instructions, then Project Instructions, then this file. A conflict is resolved by that order. It is presented to Scott only if it affects the design |
| Task ownership | The Design vs Admin Task Assignment below governs |
| Open work | Open Items table, first section of each session notes file (ID, Deliverable, Owner, Status, Blocked by). Design items only; admin tasks are never Open Items. Additions and deletions only with Scott's approval, proposed as a diff at session close |
| Naming | Every ID is written with its name (for example DC-05 Drop target bank). Never an ID alone |
| GitHub master | `main` of `scbeme/pinball-machine` is the master for every migrated document. A frozen `ref-only_` Project copy of a document not yet migrated is the working reference until its migration; it does not control design |
| Session start | Read this file from `main` (`.github/github_workflow.md`): the repository clone on the Air after `git pull`, or the GitHub API from a cloud session. The Project holds only the frozen `ref-only_` copy, which does not control |
| Changes to this file | Master: `.github/github_workflow.md` in the repository; Git history is the revision record. Changed by pull request. Rule changes: Scott's approval. Factual status text (commit ID, pull request state, verified items): Claude, no approval. The Claude Project holds a frozen `ref-only_` copy and a pointer note |

**Design vs Admin Task Assignment**

| Task | Details | Owner | Approval |
|---|---|---|---|
| All changes impacting the design | | Scott | Scott |
| All administrative issues (no design impact) | Includes IDs, naming, GitHub links, document locations, etc. | Claude | None |
| GitHub project folder and file structure | github_workflow.md defines structure | Claude | Scott |
| GitHub document exchange | Admin execution | Claude | Standing approval (Profile Instructions) |
| Open Items list | Design issues only<br>Admin issues excluded | Claude | Scott |
| Project instructions | Project Profile Instructions<br>Project Session Instructions<br>github_workflow.md | Scott<br>Scott<br>Claude | Scott |

| Administration rule | Definition |
|---|---|
| Design impact | A change to the machine's form, fit or function: requirements, geometry, parts, electrical, firmware behavior, test criteria or results, scope. Unsure counts as design |
| Timing | Administrative tasks are batched silently at a natural pause or before session close. They never interrupt design work |
| Reporting | None. Recorded in the session notes only. Raised only if it blocks design work |
| GitHub approval | Standing approval (Profile Instructions, MacBook Air autonomy, item 5): Claude prepares and executes every document movement (branch, commit, pull request, merge, deploy check) for administrative changes and for design content Scott approved in chat. No click. Never commit directly to `main` |

## 2. Migration workflow (one document at a time)

| Step | Action | Who |
|---|---|---|
| 1 | Scott names the next dashboard line. Scope the content and decide whether a new document is needed | Scott and Claude |
| 2 | Draft the document and prepare the batch. No further trigger is needed | Claude |
| 3 | Design content: Scott approves it in chat. Administrative content: none | Scott |
| 4 | Standing approval applies; no batch approval wait. The reply lists the files, the branch and the changes | Claude |
| 5 | Add the files at their stable lowercase paths on a development branch (no `data.json` status edit; status is derived, section 4), open the pull request, merge with a merge commit (section 14), then verify the repository, the Pages deployment and the production site. A migrated design document carries no source-document reference; a migrated non-design document (this file) carries a `Migrated from:` header line naming its source document and revision | Claude |
| 6 | Authority moves to GitHub on merge. Apply the `ref-only_` prefix to the Project copy. Frozen copies of documents not yet migrated stay the working reference (section 1) | Claude |
| Pace | One dashboard line at a time. Step 1 tags the existing documents that match the line's deliverables. Step 2 pulls the technical info still needed for the design | |
| Pilot | Drop Targets: Common components, DC-05 Drop target bank (side-by-side), DC-06 Drop target (single), DC-07 Drop target bank (inline) | |

**Approved build sequence (2026-11-11)**

| # | Change | Branch | Status on `main` (2026-11-12) |
|---|---|---|---|
| 1 | Rename to lowercase (section 3). Move the 3 System SVGs to `system/drawings/` and update their embeds and paths | Own branch | Done |
| 2 | Scan script and `pages.yml` change: derived status and links, publish only .md/.svg/.png, build date and commit ID set automatically, link check before deploy | Own branch (deployment change) | Done |
| 3 | Dashboard code: folder links, plain-text deliverables, `data.json` reduced to structure | After 1 and 2 | Done |
| 4 | One-folder test that `README.md` shows when a folder is opened on GitHub | Dev branch | Not verified |
| 5 | Drop Targets migration: README, interim Hall and coil drawings, test cards | Per batch approval | Done |

Status is read from the repository contents, not confirmed by Scott.

## 3. Repository structure (approved 2026-11-11)

All names lowercase, no spaces. Only `README.md` keeps capitals (GitHub default). A folder is created only when it holds a file.

```
/
├─ README.md
├─ dashboard/
│  ├─ index.html, styles.css, dashboard.js
│  ├─ data.json        structure only
│  └─ scan.py          derives status, links
├─ system/
│  ├─ machine_master.md
│  ├─ electrical_master.md   (+ I/O map)
│  ├─ interface_harness_list.md *
│  ├─ software_master.md *
│  ├─ control_timing_table.md *
│  ├─ drawings/        device_registry.svg
│  │                   system_architecture.svg
│  │                   electrical_block_diagram.svg
│  ├─ cad/             full-machine STEP
│  ├─ software/        opp/, mpf/
│  └─ system_common_components/
├─ devices/
│  ├─ ball_handling/
│  │  ├─ ml-01_shooter_plunger
│  │  ├─ db-01_scoop_hole
│  │  ├─ db-02_ball_lock
│  │  ├─ db-03_ball_trough
│  │  └─ db-04_shooter_lane_sensor
│  ├─ ball_path_sensing/
│  │  ├─ dc-03_outlane_save_gate_deflector
│  │  ├─ dp-18_rollover_sensor
│  │  └─ md-02_adjustable_outlane_pin
│  ├─ cabinet/
│  │  ├─ mc-01_cabinet_body
│  │  ├─ mc-02_hinged_playfield_support
│  │  ├─ mc-03_glass_top_and_slide_retention
│  │  ├─ mc-04_bottom_shelf
│  │  └─ mc-05_rubber_feet
│  ├─ controllers_power/
│  │  ├─ common_components
│  │  ├─ dp-13_master_power_switch
│  │  ├─ dp-28_topedal_board
│  │  ├─ dp-29_24v_coil_supply
│  │  └─ dp-30_5v_supply
│  ├─ controls_tilt/
│  │  ├─ dp-04_tilt_sensor
│  │  ├─ dp-12_game_setup_start_button
│  │  ├─ dp-20_programmable_button
│  │  ├─ dp-21_exit_button
│  │  ├─ dp-22_volume_control
│  │  └─ dp-23_monitor_menu_joystick
│  ├─ display_audio_host/
│  │  ├─ dp-25_display_monitor
│  │  ├─ dp-26_speakers
│  │  └─ dp-27_host_computer
│  ├─ drop_targets/
│  │  ├─ common_components
│  │  ├─ dc-05_drop_target_bank_side-by-side
│  │  ├─ dc-06_drop_target_single
│  │  └─ dc-07_drop_target_bank_inline
│  ├─ flippers/
│  │  ├─ dc-04_flipper_assembly
│  │  └─ dp-09_flipper_buttons
│  ├─ lights/
│  │  ├─ common_components
│  │  ├─ dp-31_bonus_rack_lights
│  │  ├─ dp-32_drop-target_ball_lamps
│  │  ├─ dp-33_deluxe_letter_lights
│  │  ├─ dp-34_abcd_lane_feature_lights
│  │  ├─ dp-35_left-lane_feature_lights
│  │  ├─ dp-36_bank_shot_value_lights
│  │  ├─ dp-37_deluxe_value_lights
│  │  ├─ dp-38_8-ball_saucer_chain_and_
│  │  │        outlane_special_lights
│  │  ├─ dp-39_bonus_multiplier_and_
│  │  │        shoot-again_lights
│  │  ├─ dp-40_pop_bumper_lights
│  │  └─ dp-41_general_illumination_lights
│  ├─ playfield_fixtures/
│  │  ├─ md-01_playfield_post
│  │  ├─ mg-01_ball_guides
│  │  └─ mg-02_apron
│  ├─ pop_bumpers/
│  │  └─ dc-01_pop_bumpers
│  ├─ rebound_switches/
│  │  └─ dp-24_rebound_switch_leaf_behind_
│  │           rubber_ring
│  ├─ slingshots/
│  │  └─ dc-02_slingshots
│  ├─ spinner/
│  │  └─ dp-03_spinner
│  └─ standup_targets/
│     ├─ dp-01_standup_targets
│     └─ dp-19_standup_target
└─ .github/
   ├─ github_workflow.md   this file (master)
   └─ workflows/       pages.yml, check.yml
```

`*` created only when its content exists. The tree is the target structure; the text after each ID follows the device folder rule below. The wrapped names (dp-38, dp-39, dp-24) are single unbroken folder names.

| Change type | Approval |
|---|---|
| File or folder at a path in this tree | Document exchange: standing approval (section 2) |
| File or folder at a path outside this tree, or any change to this tree | Structure change: Scott's approval |
| Project document locations | Administrative: Claude, no approval |

**Device folder contents**

| Item | Dashboard deliverable |
|---|---|
| `README.md` | Functions, constraints, parameters, and parts. Layout is free-form (the five-section layout of migrated READMEs is accepted). Add a datasheet link in the parts table when a manufacturer part is used, at the README's next revision |
| `schematic.svg` | Schematic |
| `board_layout.*` | Board layout (format undefined until Scott supplies the layout) |
| `control_logic.md` | Control logic |
| `cad/` | 3D CAD model (STEP) |
| `print/` | 3D print files |
| `drawings/` | Drawings, only if Scott exports PDFs |
| `tests/` | One test card per test (`test_<subject>.md`). A test card's bench-circuit SVG and test code live beside the card in the same flat folder (section 10) |

**Common components folders**

| Folder | Contents |
|---|---|
| `devices/drop_targets/common_components/` | README, interim Hall and coil board drawings (`interim_*.svg`), `tests/` |
| `devices/lights/common_components/` | README, LED data line `schematic.svg`, recessed-LED `cad/` and `print/`, `tests/` (WS2812B test card, circuit and test firmware; added 2026-11-18) |
| `devices/controllers_power/common_components/` | Power `schematic.svg` (supplies and distribution: DP-13, DP-29, DP-30, bus bar, fused feeds), `drawings/` (bottom shelf layout) |
| `system/system_common_components/` | README, generic switch-input `schematic.svg`, `tests/` (system-level and Blue Pill bench tests, including the USB bootloader card and bench tooling) |

Group-level common_components folders exist only where design is shared (Drop Targets, Lights, Controllers and Power). Others are added only to facilitate a document migration.

**Naming rules**

| Rule | Definition |
|---|---|
| Device folder | `<id>_<short label>`: lowercase, spaces to underscores, punctuation removed, hyphens inside words kept. The label may be shortened from the register name |
| Matching | The dashboard finds a device folder by its ID prefix, ignoring case. Renaming the text after the ID never breaks a link |
| Case | No uppercase in any path except `README.md`. The scan fails the build on any other uppercase path |
| Draft | A `draft_` prefix on a file or folder means In Progress. Removing the prefix on completion is a rename-only commit (Renames row) |
| Interim | An `interim_` prefix marks a drawing that is not a deliverable. It never changes a deliverable's status |
| MPF | `system/software/mpf/` holds the open-source baseline reference (README only) and, once it exists, the machine configuration, which follows MPF convention (`modes/`, `config/config.yaml`, `<mode_name>/config/<mode_name>.yaml`). The MPF mode folder name sets the mode name |
| Renames | A change of capitalization only is done with a two-step `git mv` on the Mac. Every rename or move is its own commit, made with `git mv`, with no content edits, so Git detects it as a 100 % rename and file history follows it. The commit message records old path → new path |

**Existing files moved or renamed (step 1 of the build sequence)**

| From | To |
|---|---|
| `Dashboard/`, `System/`, `Devices/` | `dashboard/`, `system/`, `devices/` |
| `System/Machine_Master.md`, `Electrical_Master.md` | `system/machine_master.md`, `system/electrical_master.md` |
| `System/Device_Registry.svg`, `System_Architecture.svg`, `Electrical_Block_Diagram.svg` | `system/drawings/device_registry.svg`, `system_architecture.svg`, `electrical_block_diagram.svg` |
| `Devices/Controllers_Power/DP-28_Topedal_Board/Topedal_Schematic.svg` | `devices/controllers_power/dp-28_topedal_board/draft_schematic.svg` |

## 4. Dashboard rules

| Rule | Definition |
|---|---|
| Links | Device names and Common components rows link to their repository folder (`/tree/main/<folder>`). A link exists only when the folder exists. Deliverables in device rows show status only, with no link |
| System documents | System documents and diagrams keep direct links to their files |
| Status source | Derived at deploy time by `dashboard/scan.py` from the folder contents. Nothing is hand-set |
| Status rule | Item absent = Not Started. File or folder with a `draft_` prefix = In Progress. Item present on `main` = Complete. N/A is set once in `data.json` |
| Meaning of Complete | The artifact exists on `main` after Scott's merge approval. It does not mean the design passed its tests |
| Roll-up | N/A excluded; all Complete = Complete; all Not Started = Not Started; any mix = In Progress; all N/A = N/A |
| Automatic fields | "Last updated" from the build date; cache-buster from the commit ID |
| `data.json` | Structure only: groups, devices, IDs, names, applicable deliverables, N/A flags, shared references |
| Label | "Functions, constraints, parameters" on every row, including the System row and every Common components row |
| Common components rows | System page and Drop Targets Level 2 and Level 1 (merged PRs #7, #8). Other groups only as needed |
| Site content | Pages publishes only .md, .svg and .png under `system/` and `devices/`. `.github/`, CAD, print, test code and other files are never published |
| Pre-deploy check | Link check before deploy. A failed check stops the deploy and leaves the current site up |
| Pull request check | `.github/workflows/check.yml` runs the same scan on every pull request (no `paths:` filter) and deploys nothing. The job `check` is a required status check on `main` (ruleset, 2026-11-21) |
| Revision header check | `scan.py` fails when a design `.md` under `system/` or `devices/`, or an `.md` directly in `.github/`, lacks `**Revision:** yyyymmdd-##`. On a pull request (`--base`) an edited document must carry a higher ID than the base copy. Exceptions: the label `admin-no-bump` (administrative-only edit), a pure rename, and the 11 legacy test cards (section 10) while unchanged |
| Approval | The scan script and `pages.yml` change are a deployment change and need Scott's approval on their own branch |
| Structure | Level 1 System Dashboard, the System page, and Level 2 device-group matrices use the same six columns (Device; Function & Design Inputs; Mechanical; Electrical; Firmware / Control; Integration & Test) and the same status icons. Status and matrix changes need Scott's approval |

## 5. Document homes (one home each)

| Information | Home |
|---|---|
| I/O pin assignments | I/O map section of `system/electrical_master.md`. The 36 per-device "I/O pin assignments" entries are replaced by one System entry |
| Control and timing, power budget | `system/control_timing_table.md`, `system/electrical_master.md` |
| Display and audio map | `system/software_master.md` |
| Firmware and MPF (baseline, then configuration) | `system/software/opp/` and `system/software/mpf/`. Each folder holds the latest version. Third-party binaries and upstream source are not copied; the folder README records upstream, version, license and SHA-256. A folder holding only baseline references shows In progress on the dashboard |
| Test firmware and bench tooling | The owning `tests/` folder, beside the test card (section 10) |
| Device control logic | The device's `control_logic.md` |
| Parts and datasheets | Parts table in the owning README, with a datasheet link. Vendor datasheets and third-party designs are not stored in the repo |
| Bill of materials | None. Parts tables are the source; a purchasing list is generated later if wanted |
| Cabinet fabrication and assembly drawings | N/A. MoI3D drawings stay on Scott's computer unless he exports PDFs to `drawings/` |
| Workflow rules (this file) | `.github/github_workflow.md` (repository master) |
| Open work | Session notes, first section (section 1) |
| Decisions and history | Claude Project (session notes). Not in the repo |

## 6. Common items (three tiers)

| Tier | Holds | Home |
|---|---|---|
| System common | Items used by 2 or more groups | `system/system_common_components/` |
| Group common | Items used by every device in one group | `devices/<group>/common_components/` |
| Device | Items specific to one device | The device's own folder |

| Rule | Definition |
|---|---|
| One home | A shared item's parameters live in one place. Other READMEs reference it and do not copy it |
| Tests | Test cards of a shared part live with the common components folder. 11 existing test cards are placed by subject; component-level cards (JF-1039B, 1173N O-ring, rubber band) go to `system_common_components/tests/` |
| System list | Audit result, not yet confirmed by Scott: JF-1039B solenoid, 1N400x diode, GoHz M12 inductive sensor, McMaster 1173N O-rings, cable-tie leaf switch. Approved 2026-11-11: the generic switch-input schematic is system common for DP-09, DP-12, DP-20, DP-21, DP-24. DP-01 and DP-19 were added on `main` (PR #16) |
| Lights | WS2812B is used only by Lights, so it is group common (`devices/lights/common_components/`); its tests and test firmware go in `devices/lights/common_components/tests/` |
| Controllers and Power | Common components hold the power schematic and the bottom shelf layout. The DP-28 Topedal board schematic is DP-28's own device schematic (`dp-28_topedal_board/`). The system-level electrical schematic (supplies, bus bar, fused feeds, Topedal boards, device blocks) is a separate System item in the Electrical Master. Power budget, I/O map and timing point to the System documents |

## 7. CAD, size and GitHub limits

| Item | Rule or limit |
|---|---|
| CAD input | STEP only. MoI3D native files and drawings stay local |
| CAD policy (approved 2026-11-11) | Stable lowercase filename, no revision suffix. Commit CAD and print files at design freeze for each device, not on every export. Every committed revision stays in Git history. The device README records the committed CAD revision ID and the commit message repeats it (section 15) |
| Repository | Public. Pages on GitHub Free requires a public repo |
| File size | Warning above 50 MiB; blocked above 100 MiB |
| Repository size | Ideally under 1 GB; under 5 GB strongly recommended |
| Pages site | 1 GB maximum; 10 minute deploy timeout; soft 100 GB per month bandwidth. Git LFS cannot be used with Pages |
| Estimate | Repo today 358 KB. Published site after full migration under 10 MB (estimate). STEP and print file sizes are unmeasured; Scott supplies the playfield STEP size. Git LFS is decided after the STEP size is measured (section 17) |

## 8. Playfield registry workflow

| Step | Action |
|---|---|
| 1 | Scott supplies a STEP export and a screenshot of the playfield when the 3D model changes. Scott does not maintain a separate 2D layout |
| 2 | Claude takes geometry and counts from the STEP file (CAD controls, section 12) and device identity from the screenshot |
| 3 | Claude builds the instance table (ID to coordinate, origin at the flipper pivot centerline) and the labeled SVG Device Registry graphic |
| 4 | Claude flags any count that disagrees with the Device Register or the screenshot, and does not reconcile it |
| 5 | Scott approves before anything is published. The graphic and the instance table are published together |

## 9. Document set and structure

| Item | Rule |
|---|---|
| System documents | `machine_master.md`, `electrical_master.md`, `interface_harness_list.md`, `software_master.md`, `control_timing_table.md`. Keep them brief; tables and diagrams preferred. Sections and table columns are frozen once Scott approves them |
| Device documents | The per-device folder (section 3) replaces the family device card. README layout is free-form. No `card_<family>.md`, no `family_common/` |
| Workflow document | `.github/github_workflow.md` (this file). Not published to the site; linked from the root README only |
| Test cards | One per test, in the owning `tests/` folder (section 10) |
| Hall and coil board schematics | DC-05, DC-06 and DC-07 each get their own KiCad schematic (`schematic.svg` in the device folder). The interim Hall and coil drawings in `devices/drop_targets/common_components/` are not deliverables |
| Session notes | A session's notes file may be replaced in place within that session. Earlier notes stay frozen and are never deleted |
| Redundancy | One authoritative home per item (section 5). Reference it; do not copy it. No document is created only to fill a dashboard cell. No separate requirements, architecture, verification or management documents unless Scott approves |
| `ref-only_` | Reference or frozen superseded documents. Never revised. They do not control design |
| Principle | Homebrew machine on an 1980s Bally Eight Ball Deluxe baseline with a hybrid modern implementation. Documentation stays proportional to the machine. The objective is to complete the machine |

## 10. Test cards and test rigs

All designs are bench tested. A failed test means redesign. Design documents contain no bench-test, trial or verification callouts. Checking documents against CAD or eCAD exports is a document check, not a bench test.

**Test card format** (new cards; existing Data / Interpretation cards stay as they are)

| Part | Content |
|---|---|
| Header | Test ID / name, device ID and name, revision, date |
| Test Setup | Brief description of configuration and conditions |
| Results table | Columns: Test Title / Description, Requirement, Result, Pass / Fail. One row per individual test |
| Supersedes | Previous test card revision, if any |

| Rule | Definition |
|---|---|
| Requirement | Measurable acceptance criterion where applicable |
| Result | Actual measured or observed value supplied by Scott. Never an estimate or expected value |
| Pass / Fail | Actual result compared with the requirement. No PASS without supporting evidence |
| Retest | Replaces the test card in place. Supersedes cites the prior revision ID. Git history holds the old revision |
| Filename | `test_<subject>.md` in the owning `tests/` folder |
| Legacy cards | The 11 pre-migration cards without a Revision header (listed in `scan.py`) stay as they are and are exempt from the header check while unchanged. A retest or edit adds the `**Revision:**` header |

**Test code and bench tooling** (approved 2026-11-18)

| Rule | Definition |
|---|---|
| Location | The owning `tests/` folder, flat: no folder per test. A test's circuit SVG, firmware source and tooling files sit beside its card |
| Filenames | `test_<subject>.md` for the card; every related file starts with the same `test_<subject>` stem plus a suffix (`_circuit.svg`, `_main.c`, `_platformio.ini`, and so on). The stem ties card and code together |
| Shared tooling | Tooling used by more than one test lives with the card of the test that introduced it; later cards link to it |
| Firmware version | The test code file beside its card is the version; older versions stay in Git history. No firmware tag is kept (retired 2026-11-18, Scott) |
| Step 0 | Every test card states: upload this test's firmware before every run. The chip has no version string and its flash cannot be read back, so a board is never assumed to hold it. No firmware register is kept (retired 2026-11-18, Scott). Switching between test firmware and OPP needs the bootloader install in the USB bootloader test card |
| Third-party binaries | Not stored in the repository. The card records the source repository, commit and SHA-256 |
| Publishing | Pages publishes only `.md`, `.svg` and `.png` (section 4); code files are stored in the repository and not published |

**Test rigs mirror the final machine:** final circuit topology; identical trigger paths (hardware-direct fire versus firmware); final parts; final fusing; final grounding; identical Blue Pill pin assignments from the design documents. Any deviation is listed in a Deviations table in the test card with its reason. Never deviate silently.

If the final design leaves a pin assignment undefined: (1) state that it is undefined, (2) propose an assignment, (3) obtain Scott's approval before building, (4) add the approved assignment to the Electrical Master I/O map in the next batch.

## 11. Technical research and source priority

| Priority | Source |
|---|---|
| 1 | Approved system documents and device folders |
| 2 | CAD, for geometry and device counts |
| 3 | Session-note decisions |
| 4 | Reference-only documents |
| 5 | Outside sources |

| Rule | Definition |
|---|---|
| Documents first | Before a technical design answer, recommendation or test-rig proposal, read the applicable system sections and the complete device folder for every device involved. State the documents and revision dates relied on. No reliance on search snippets alone |
| Conflicts | If a source contradicts an approved document on a design or technical matter, flag it and use the approved document (CAD controls geometry and counts). Administrative conflicts (naming, IDs, links, locations) are corrected without flagging |
| Part data | Use official manufacturer datasheets. Verify every relevant design constraint, not only the parameter that prompted the search. Search multiple manufacturers before claiming no part qualifies. If no official documentation exists, name the alternative source and state confidence. State conditions the datasheet does not cover. Never round up or assume compatibility |
| Substitutions | Confirm package and pinout compatibility (pass/fail), and electrical and thermal requirements, from datasheets. No substitution recommended without datasheet verification |
| Validation | Validate design inputs against real working pinball machines. Propose modern electronic replacements for electromechanical devices where appropriate |
| Prior decisions | Cite the exact source and revision date for anything Scott previously said, decided or required. Never state an established decision from memory alone |

## 12. IDs and CAD

| Rule | Definition |
|---|---|
| CAD controls | CAD controls geometry and device counts. If a document disagrees with CAD, CAD wins; flag the discrepancy. Never alter CAD geometry or counts to reconcile a document |
| Input | Scott supplies CAD as STEP. Claude adds an annotation layer of assigned IDs |
| Registry | The labeled snapshot is the official Device Registry graphic. The Machine Master instance table maps each instance ID to its CAD grid coordinate. Origin: flipper pivot centerline, defined in the Machine Master. Graphic and table are published together and agree |
| CAD revision | The Device Registry graphic states the CAD revision it was built from |
| Lights | DP-05 is retired and never reused. Light groups are DP-31 through DP-41. Instance IDs are numbered within each group (for example DP-38-03). The addressable RGB LED chain index is a wiring attribute in the Electrical Master I/O map, not part of the instance ID. Code and MPF names are in the Software Master driver map |

## 13. Schematics and diagrams

| Rule | Definition |
|---|---|
| Format | Standalone `schematic.svg` per section 3 |
| Content | Component values on parts; IC pins on the IC body with pin numbers and pin names; in-line capacitor symbols; anode/cathode direction where applicable; net table and parts table below the drawing |
| Block diagrams | A block diagram never substitutes for a required electrical schematic |

## 14. Branch and approval workflow

| # | Rule |
|---|---|
| 1 | `main` is the authoritative approved branch. Never commit directly to `main` |
| 2 | All development takes place on separate branches named `dev/<topic>`. Existing files and revision history are preserved |
| 3 | Claude opens the pull request under the standing approval (section 1). The `main` ruleset "Pinball22 ruleset" requires a pull request with 0 required GitHub approvals (the owner cannot approve their own pull request) and the required status check `check` (section 4) |
| 4 | Claude merges under the standing approval with a merge commit. The ruleset allows merge commits only. Then Claude verifies the resulting repository and dashboard |
| 5 | Production GitHub Pages deploys from `main` only. Development branch changes must not publish to production |
| 6 | Merged branches are deleted automatically (repository setting, 2026-11-21). The 49 branches that existed on that date stay as references. Every commit stays reachable on `main` through the merge commits; baselines are the tags in item 11 |
| 7 | No change to repository permissions, branch protection, rulesets, tag rules, repository settings or deployment settings without Scott's approval. Approved and executed 2026-11-21: merge-commit-only and the required status check on the branch ruleset; the tag ruleset "Pinball22 tag protection" (no tag update or delete); automatic deletion of merged branches |
| 8 | The standing approval covers engineering content Scott approved in chat and administrative content, and the merge. The reply lists the files, the branch and the changes |
| 9 | Pull request titles are descriptive. The pull request body lists each document path and revision ID. Commits carry one `Revision: <path> <ID>` trailer per document revised, then the attribution trailers |
| 10 | Every rename or move is its own commit with no content edits (section 3, Renames) |
| 11 | Baselines: after each session publish, Claude creates the tag and GitHub Release `vYYYY.MM.DD.N` (calendar version; N counts publishes that day) on `main`, with generated release notes. The tag ruleset blocks tag update and delete. Claude creates tags and Releases in the GitHub web UI through the built-in browser: the Claude session proxy blocks tag pushes and the Releases API (verified 2026-11-21) |
| 12 | Label `admin-no-bump` on a pull request skips the revision-bump check for an administrative-only edit (section 4). Claude applies it only to administrative changes |
| 13 | Ruleset and repository setting changes are made in the GitHub web UI through the built-in browser: the Claude session proxy blocks writes to rulesets and repository settings (verified 2026-11-21). Reads work through the REST API |

## 15. Revisions and publishing

| Item | Rule |
|---|---|
| Revision ID | `yyyymmdd-##`, kept inside each document header. A design `.md` under `system/` and `devices/`, and every `.md` directly in `.github/`, carries `**Revision:** yyyymmdd-##` on the line after its title. Every content change raises the ID; the scan enforces it (section 4) |
| Claude Project filenames | Keep the revision suffix: `<stem>_yyyymmdd-##.md`. Exception: this file is stored in the repository (stable name, Revision header); the Project holds `ref-only_github_workflow_20261121-01.md` |
| Claude Project location | Documents Claude maintains live in the Project `claude/` folder (session notes, `ref-only_` copies). Documents whose master is the repository, including this file, are not kept in the Project except as a frozen `ref-only_` copy, and are not saved to the Air project folder. Duplicates elsewhere in the Project are removed (administrative) |
| GitHub filenames | Stable, lowercase, no suffix (section 3). The header holds the revision ID and date. The file is replaced in place; Git history is the record. No archived copies of superseded documents unless Scott approves |
| Migration | A migrated non-design document carries a `Migrated from:` header line; a migrated design document carries none (section 2, step 5). The `ref-only_` copy is the pre-migration record. The 16 documents migrated before 2026-11-21 carry a header note instead: "Header added 2026-11-21; content unchanged since migration" |
| Trigger | Administrative changes (no design impact): no trigger and no approval. Design content: only after Scott's approval in chat; GitHub execution then follows the standing approval (section 1). A request to add or change information is not itself approval to publish design content |
| Batching | Publish once per session, batching that session's decisions. Revise only documents affected by those decisions. Administrative cleanup (duplicates, superseded revisions, naming, links, status text) is exempt and runs as a silent batch at a natural pause or before session close |
| Full rewrite | Project documents can only be fully rewritten. Superseded text is replaced in place; no line-outs. Existing struck-through text is non-controlling |
| Deleting | Claude deletes superseded revisions from the Project with no approval. Session notes and `ref-only_` files are never deleted |
| Multiple documents | Provide a downloadable ZIP |
| Dashboard | Verify affected dashboard links after publishing |

## 16. Responsibilities

| Scott | Claude |
|---|---|
| Approves changes that impact the design, design content, repository folder and file structure changes, dashboard matrix changes, repository permissions, branch protection, rulesets and deployment settings. Supplies CAD (STEP), design inputs and test results. Owns the Project Profile Instructions and the Project Session Instructions | Handles all administration with no approval or involvement. Prepares and executes every GitHub document movement under the standing approval (section 1). Owns this file (Scott approves rule changes). Presents discrepancies that affect the design to Scott and corrects administrative ones silently. Never approves changes or makes unapproved design decisions, and never claims an artifact was created, published, tested or verified unless it was |

## 17. Standard GitHub practice: accepted deviations and verified settings (2026-11-21)

Audit of this workflow against standard GitHub document management practice. Scott approved all changes and the deviations below.

| Deviation | Standard practice | Why kept | Mitigation |
|---|---|---|---|
| Manual revision ID in each document header | Git history and tags are the revision record | Configuration control; test cards cite revision IDs; the Pages site shows documents without Git context | Scan enforces header presence and bumps (section 4) |
| `draft_` and `interim_` filename prefixes mark status | Draft pull requests, branches or front matter | The dashboard derives status from the repository contents | A prefix change is a rename-only commit (section 3) |
| Commit authors: Claude (content commits) and the owner (merge commits) | The accountable human authors, with a `Co-authored-by` trailer | Provenance stays accurate | Every Claude commit carries `Co-Authored-By` and `Claude-Session` trailers |
| Open Items, decisions and session notes live in the Claude Project | GitHub Issues, Projects or decision records | Session-notes control (section 1) | None needed |
| No LICENSE file | A license states reuse terms | Scott's decision 2026-11-21: no license; all rights reserved by default | None |
| STEP and print files in plain Git, no LFS | Git LFS for large binaries | File sizes unmeasured; CAD is committed only at design freeze | Revisit when Scott supplies the STEP size |
| Workflow document named `github_workflow.md`, not `CONTRIBUTING.md` | GitHub's recognized contributing file name | Lowercase-path rule (section 3) allows only `README.md` with capitals; the project name for the document is established | Linked from the root README |
| No pull request template | `.github/PULL_REQUEST_TEMPLATE.md` | Not needed: item 9 of section 14 defines the content | None |

**Settings verified 2026-11-21** (screenshots and REST reads)

| Setting | Value |
|---|---|
| Branch ruleset | Active on the default branch, no bypass actors. Rules: block deletion, block force push, pull request required (0 approvals, merge commit only), required status check `check` (GitHub Actions) |
| Tag ruleset | Active on all tags: restrict deletions, restrict updates (non-fast-forward) |
| Repository | Automatic deletion of merged branches on. Repository-level merge, squash and rebase are all enabled; the ruleset restricts pull requests to merge commits |
| Pages | Source GitHub Actions; HTTPS enforced; no custom domain |
| Actions | All actions allowed (workflows use GitHub-owned actions at version tags); fork pull requests need approval for first-time contributors; default workflow token read-only; Actions cannot create or approve pull requests |
| Baseline | Release and tag `v2026.11.21.1` on `main` at eda898e |
