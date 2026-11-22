# Pinball Session Notes

**Revision:** pinball_session_notes_20261121-01
**Date:** 2026-11-21

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session | | | |

## 2. Session scope

GitHub document management audit against standard GitHub practice, with the project revision chain preserved. Administrative only; no design change. Scott approved all changes ("approve all ... execute ALL"). Later in the session Scott approved moving the workflow document to `.github/` ("approve #E").

## 3. Decisions

| ID | Decision |
|---|---|
| D1 | Merge commits only (no squash or rebase); ruleset enforces |
| D2 | Required status check `check` on `main` |
| D3 | Revision header `**Revision:** yyyymmdd-##` enforced by `scan.py`; bump required on edit; label `admin-no-bump` for administrative-only edits |
| D4 | Tag ruleset on all tags (no update or delete); baseline Release `vYYYY.MM.DD.N` per session publish |
| D5 | Merged branches auto-deleted; the 49 existing branches stay |
| D6 | No LICENSE file (Scott: leave as is) |
| D7 | Deviations accepted and listed in github_workflow section 17 |
| D8 | Branch naming `dev/<topic>`; `Revision:` commit trailers; PR body lists path and ID; rename-only commits |
| D9 | Git LFS: pending STEP size measurement (no action) |
| D10 | Workflow document master moves to `.github/github_workflow.md` (Scott: "approve #E"); no dashboard matrix row; linked from root README; Project copy frozen as `ref-only_` |

## 4. GitHub work executed

| Item | Result |
|---|---|
| PR #42 | Revision headers added to 16 migrated docs; merged (merge commit) |
| PR #43 | `scan.py` revision checks, `check.yml` (no paths filter, full fetch, labels); merged, `main` = eda898e |
| Branch ruleset 26894429 | Required check `check`, merge-only, no bypass |
| Tag ruleset 27799860 | All tags: update, delete, non-fast-forward blocked |
| Repository | Delete branch on merge on |
| Release | `v2026.11.21.1` on eda898e (created in web UI; session proxy blocks tag pushes, Releases API and ruleset writes) |
| PR #44 | `scan.py` revision and link checks extended to `.github/*.md`; merged, `main` = 27e405b |
| PR #45 | `.github/github_workflow.md` (Revision 20261121-02, Migrated from github_workflow_20261121-01) and README link; merged, `main` = c163031. `pages.yml` paths filter excludes these files, so no Pages deploy was triggered |

## 5. Documents

| Document | Action |
|---|---|
| `.github/github_workflow.md` (repository) | Master, Revision 20261121-02 |
| ref-only_github_workflow_20261121-01.md (Project) | Frozen pre-migration copy; supersedes 20261119-01 (deleted). Pointer: the master is `.github/github_workflow.md` in `scbeme/pinball-machine` |

## 6. Limits and carry-forward

| Item | State |
|---|---|
| Tag `v2026.11.21.1` | Created via UI; likely lightweight, not annotated (unverified) |
| Air project folder | `~/projects/pinball-machine`; session notes saved there. The workflow master is in the repository clone; the Air clone needs a `git pull` |
| Project Instructions items 1 and 7 | Name `github_workflow.md` in the Project; wording update proposed to Scott (his document) |
| Folder-row display of `.github/` | Expected to split from `.github/workflows` on GitHub; not yet viewed |
| D9 LFS | Needs playfield STEP size from Scott |
