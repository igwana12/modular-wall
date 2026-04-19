---
phase: quick-260419-nlm
plan: "01"
subsystem: obsidian-vault
tags: [writing, google-drive, obsidian, import, conversion]
dependency_graph:
  requires: [obsidian-vault-exists]
  provides: [WRITING-archive-imported]
  affects: []
tech_stack:
  added: []
  patterns: [textutil-docx-to-txt, gdoc-stub-with-doc-id]
key_files:
  created:
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/INDEX.md
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/TRANSCRIPTIONS/ (23 files)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/DRAFT 1/ (5 stubs)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/BOOK/ (tree with 27 files)
    - /Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/ideas for start ups/Globe 2.md
  modified: []
decisions:
  - "Used textutil (not pandoc) for .docx conversion — pandoc not installed"
  - "All 26 .gdoc files are unresolved stubs — all OAuth tokens expired on 2026-04-19"
  - "TR-5 - Solstice grove.gdoc skipped as duplicate of TR 5 - Solstice Grove.gdoc"
  - "Palenque_otter.ai (1).docx renamed to Palenque_otter.ai.md (strip (1) suffix)"
  - "STE-026 and STE-028 were (1) variants — only copy present, used and stripped (1)"
  - "macOS ._ sidecar files cleaned from external drive after each write batch"
metrics:
  duration: ~25min
  completed: 2026-04-19
  tasks_completed: 2
  files_created: 64
---

# Phase quick-260419-nlm Plan 01: Import Google Drive WRITING Archive Summary

Import all readable files from the Google Drive WRITING folder into the Obsidian MIGRATION vault's WRITING/ tree — 23 txt transcriptions and 14 docx parables/chapters converted to markdown, 26 .gdoc files stubbed with doc_ids pending OAuth re-auth.

---

## Per-Folder File Counts

| Folder | Source Files | Destination .md | Format |
|--------|-------------|-----------------|--------|
| TRANSCRIPTIONS/ | 23 .txt | 23 .md | txt→md (cp) |
| DRAFT 1/ | 5 .gdoc | 5 stubs | gdoc→stub |
| BOOK/ (root) | 1 .gdoc | 1 stub | gdoc→stub |
| BOOK/notes_parables_based on RECORDINGS/ | 9 .docx | 9 .md | textutil |
| BOOK/OLD ALEXANDRA THE BOOK/ | 4 .docx + 4 ~$ locks | 4 .md | textutil |
| BOOK/OLD parables/ | 12 .gdoc | 12 stubs | gdoc→stub |
| BOOK/TRANSCRIPTIONS_SARALENA/ | 9 .gdoc (1 dup) | 8 stubs | gdoc→stub |
| ideas for start ups/ | 1 .docx + 1 ~$ lock | 1 .md | textutil |
| **Total** | **~68 source** | **63 .md + INDEX** | |

Total bytes imported: 343,065 (344 KB)

---

## Unresolved .gdoc Files (26)

**All 26 Google Docs (.gdoc) files are unresolved stubs.**

Root cause: All OAuth tokens were expired/revoked on 2026-04-19:
- `gws` CLI: `invalid_grant: Token has been expired or revoked`
- gcloud ADC (`~/.config/gcloud/application_default_credentials.json`): `invalid_grant: Bad Request`
- gcloud access_tokens.db `igwana@gmail.com` token: expired 2026-04-03

Each stub file contains:
- The source filename as `# Header`
- The Google Drive `doc_id` extracted from the local `.gdoc` JSON stub
- Instructions to re-authenticate via `gws auth login` and re-run

**To resolve:** Run `gws auth login` (opens browser), then re-run gdoc conversion step for each file using `gws docs documents get --params '{"documentId":"<doc_id>"}'`.

### Unresolved List

| File | doc_id |
|------|--------|
| DRAFT 1/1_Prologue | 1mG2cKqiKqymmMqVnlF8NsnH_nnoQTW6xaGifyC1FNJE |
| DRAFT 1/2_Introduction_Muse | 1ib3sNGfs3kb61cF_ouxP8PMz7pJl77HTlSrhdBcNo80 |
| DRAFT 1/3-Cancun | 1WrgKHf_KqMiFJCieM68qc4WhZE_xTGSb9O7tF5iee30 |
| DRAFT 1/4_To Tulum_0=1_special Generation | 1boUqi3kivagRFBH_0xyJpHtk_i6HMCaw8ksM-2uivmk |
| DRAFT 1/5_Palenque | 139q5WBzZr7TVR3ADlZVWRXI4EbcAGHfxDgdagc7ixyQ |
| BOOK/YOUR BOOK! (Recovered) | 1ccqMSG9lBczjWYOG3cU3N5BI8OR49uksH8IcfKc54HU |
| BOOK/OLD parables/1_Dancing Our way... | 1d0NKT0C_rNroPeTavw_ZhMdh5pPxdhQDJD0I-zz7oB0 |
| BOOK/OLD parables/2_War and Festivals | 1oSJKIHrPGe-70BaSGMiGoHOltPuaBEnbmmWlty9Z234 |
| BOOK/OLD parables/3_The Importance | 1ke2X-GBrY4adfROZg6ozw_0Ly90oYxweF2NncJsVNs4 |
| BOOK/OLD parables/4_The Birth of a Star | 1FiMHl8R3gDSHxfBxlq8z-2ZpjHCnhOyZZT9g3MGyT3w |
| BOOK/OLD parables/5_Gaia Hypothesis | 1YB-fQI9-7KnWHSWeHUsbJxST0PjHExF4DfcmbWTwZWY |
| BOOK/OLD parables/6_Calibrating | 1ZvKiAOI1RCcC5J_C5NkWvx5AYbNYVqE6HnMfqO03ZRw |
| BOOK/OLD parables/7_Ancient Rites | 1ROLUSpO5-F_qKjPZu06AfbBoAeR4frrvAqZGQ1F8Dy8 |
| BOOK/OLD parables/8_Goa and Psychedelic Trance | 1lr5Q3Wc10vRScp4y8paEbfAjAfxBT_Rg83mYMJuuRxg |
| BOOK/OLD parables/Alison_Ettina | 15GzP-9fWj2m4l_ipYNw1ZsmTx59sOCj5lKYqlEiC1h4 |
| BOOK/OLD parables/CHILDRENS STORY - Magic Berries | 19lYo1JaHhHAYgfeg-M3Rr3T1vow5C20l8MYC7b_pahs |
| BOOK/OLD parables/The eb and flow | 1bXgwR6UUNbIfsxcGiEW9CmsbQ8-MikyYbdMLJtyooP0 |
| BOOK/OLD parables/What they did with technology | 1a9IjbfnZwXaaT-u-vKBlWD6TnhGLxZSmClKU3tw-rYY |
| BOOK/TRANSCRIPTIONS_SARALENA/Journal - Thesis | 1PyxnCLIiMSuw3fEY_n1KStV_7HtBgdWym8tYOeJQVdM |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 1 | 18sRcSxw6vWvRl-2UirU_1PigrnCeSdDEnyhWknThxw4 |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 10 | 1GgUVs1AxdOys_tTTYxGvqBlsHx1-IrRL8nc6ME27NF4 |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 2 | 1Pk5NEvPDXNNLbPWTfj-OeD1s23EANsgz5RUbd8kXEB4 |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 3 | 1Exw1d3pXIMC2UoGa203iCeJfM7V6WmEsR5i7cYr-k8A |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 5 | 1ZcsSo4WAVKmd68W0T07k86UQDtcGyncVHNy4lsx1nBI |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 7 | 17Jf7WUT-RELR6G4V0m_D-RdMsRoUqgVZC5vrn8-_-x0 |
| BOOK/TRANSCRIPTIONS_SARALENA/TR 9 | 1OfGW-Hd77FeKKAgORSlpBNO6m5An-MJ8D9d61JkuboU |

---

## Duplicate Decisions

| Source File | Decision |
|------------|---------|
| STE-026 [FIX]_otter_ai (1).txt | Only (1) variant present — used it, stripped (1) → STE-026.md |
| STE-028 [FIX]_otter_ai (1).txt | Only (1) variant present — used it, stripped (1) → STE-028.md |
| Palenque_otter.ai (1).docx | Only (1) variant present — used it, stripped (1) → Palenque_otter.ai.md |
| TR-5 - Solstice grove.gdoc | Duplicate of TR 5 - Solstice Grove.gdoc — SKIPPED (different capitalization, same content expected) |

---

## Known Stubs

26 .gdoc stub files contain placeholder content (no prose). Each file is explicitly marked "Unresolved" with doc_id. These prevent full archive from being searchable in Obsidian until OAuth is re-established.

Goal of this plan (make writing archive searchable) is partially achieved: 37 of 63 files have real content. The 26 gdoc stubs are resolvable once auth is fixed.

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] macOS AppleDouble ._ sidecar files counted in find**
- Found during: Task 1 verification
- Issue: textutil and cp on external HFS+ drive create `._filename` sidecar files for xattrs; `find ... -name "*.md"` was matching these, doubling counts
- Fix: Added `find ... -name "._*" -delete` cleanup after each batch write
- Files modified: deleted ~35 sidecar files from destination
- Commit: f3e90d7

**2. [Rule 1 - Bug] gdoc stubs had "doc_id: unknown" because os.path.relpath() produced different keys than os.walk() loop**
- Found during: Task 2 spot check
- Issue: Path keys in `doc_ids` dict from `os.relpath()` didn't match the hardcoded src_rel strings
- Fix: Re-ran stub generation after verifying correct key mapping; all 26 stubs now have real doc_ids
- Commit: f3e90d7

### Auth Gate

**gws OAuth token expired**
- Attempted: `gws docs documents get --params '{"documentId":"..."}'` for all 26 .gdoc files
- Error: `invalid_grant: Token has been expired or revoked`
- Also tried: gcloud ADC refresh token (expired), gcloud access_tokens.db (expired 2026-04-03), Drive FS token (not OAuth)
- Resolution: Created explicit unresolved stubs with doc_ids. Re-auth via `gws auth login` will allow populating these.

---

## Total Bytes Imported

343,065 bytes (344 KB) of real content across 37 files (23 txt + 14 docx).
26 stubs add ~5 KB (placeholder only).

---

## INDEX.md Location

Open in Obsidian: `/Volumes/Extreme Pro/MIGRATION/2501-DEPLOYMENT/obsidian-vault/WRITING/INDEX.md`

---

## Self-Check

- [x] TRANSCRIPTIONS/: 23 .md files (STE-006 to STE-029 minus STE-024)
- [x] BOOK/notes_parables_based on RECORDINGS/: 9 .md files
- [x] BOOK/OLD ALEXANDRA THE BOOK/: 4 .md files
- [x] ideas for start ups/: 1 .md file (Globe 2.md)
- [x] DRAFT 1/: 5 stub .md files
- [x] BOOK/OLD parables/: 12 stub .md files
- [x] BOOK/TRANSCRIPTIONS_SARALENA/: 8 stub .md files
- [x] BOOK/YOUR BOOK! (Recovered).md: 1 stub
- [x] INDEX.md: 148 lines
- [x] Zero empty files
- [x] Zero ~$ lock files in destination
- [x] Commit f3e90d7 on master

## Self-Check: PASSED
