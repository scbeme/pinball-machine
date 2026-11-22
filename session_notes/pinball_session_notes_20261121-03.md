# Pinball Session Notes

**Revision:** pinball_session_notes_20261121-03
**Date:** 2026-11-21

## 1. Open Items

| ID | Deliverable | Owner | Status | Blocked by |
|---|---|---|---|---|
| (none) | No open items. No changes proposed this session | | | |

## 2. Session scope

Administrative audit of the Project Instructions, the Profile Instructions and `.github/github_workflow.md` against the repository-master workflow (Scott: "execute without my involvement"). Three audit passes; pass 3 found no further change. No design change.

## 3. Decisions

| ID | Decision |
|---|---|
| D11 | `Migrated from:` header line applies to migrated non-design documents only. Migrated design documents carry no source-document reference (Scott's 2026-11-10 preference; resolves a conflict created by the 2026-11-21 audit) |

## 4. Audit result

| Pass | Finding | Action |
|---|---|---|
| 1 | Workflow: no session-start read location after the move; Project-location rule contradicted the repository master; `Migrated from:` rule conflicted with the 2026-11-10 no-source-reference preference; workflow document missing from the document set; `.github/*.md` missing from the revision rule; filename deviation unlisted | Fixed in `.github/github_workflow.md` Revision 20261121-03 (PR #46, `main` = 7e8d661) |
| 1 | Profile preference 3 (GitHub-managed documents are not saved to the Air): the Air project folder held a copy of the workflow document | Copy removed from `~/projects/pinball-machine` |
| 2 | Re-read the repository for residual references (README, scan.py, opp README): section numbers and name unchanged, no change needed | None |
| 3 | Project Instructions items 1 and 6 | Not editable by Claude; replacement wording below |

## 5. Proposed Project Instructions wording (Scott's document; not applied)

| Item | Current | Proposed |
|---|---|---|
| 1 | read only (a) the most recent session notes and (b) github_workflow.md | read only (a) the most recent session notes and (b) `.github/github_workflow.md` from `main` of `scbeme/pinball-machine` |
| 5 | Rules not stated here are in github_workflow.md. | Rules not stated here are in `.github/github_workflow.md`. |
| 6 | GitHub branch/PR/merge/deploy check | GitHub branch/PR/merge/deploy check, Releases and tags |

## 6. Limits

| Item | State |
|---|---|
| Air repository clone | Stale (lists `cad`, `docs`, `ecad`, `firmware`; no `.github/github_workflow.md`). Needs `git pull`; the Air shell has no network |
| Session notes 20261121-02 | Written by an iPad research session; copied to the Air project folder |
| Release `v2026.11.21.3` | Baseline for PR #46 |
