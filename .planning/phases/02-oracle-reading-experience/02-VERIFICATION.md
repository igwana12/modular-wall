---
phase: 02-oracle-reading-experience
verified: 2026-03-28T16:20:13Z
status: passed
score: 5/5 success criteria verified
re_verification: true
re_verified: 2026-03-29T12:30:00Z
re_verification_notes: "All gaps resolved — PaywallGate is mounted wrapping reading flow, recordReading() called on complete, guidebook images use .path not .url. Build passes."
gaps:
  - truth: "Free tier user hits a monthly limit; paid user ($9.99/mo via Stripe) gets unlimited readings"
    status: failed
    reason: "PaywallGate component is fully implemented but never mounted anywhere in the app. recordReading() is exported but never called. The reading flow (ReadingPageClient) has zero canRead() checks. Any user can take unlimited readings with no paywall triggered."
    artifacts:
      - path: "apps/oracle/src/components/paywall-gate.tsx"
        issue: "Exported but never imported or mounted in any page or layout"
      - path: "apps/oracle/src/app/read/[deity_id]/reading-page-client.tsx"
        issue: "No PaywallGate wrapper, no canRead() check before starting a reading"
      - path: "apps/oracle/src/lib/reading-tracker.ts"
        issue: "recordReading() defined but never called from any reading completion handler"
    missing:
      - "Import and mount PaywallGate in reading-page-client.tsx wrapping the reading flow, or in layout.tsx"
      - "Call recordReading(deity.id) from ReadingStream onComplete or ReadingPageClient handleReadingComplete"
      - "canRead() check before allowing ReadingStream to start (or enforce via PaywallGate wrapping)"
  - truth: "Digital guidebook page exists for each god with mythology, keywords, and meanings"
    status: partial
    reason: "Guidebook pages exist and render structure correctly, but hero PANTHEON art will always be absent due to a data-field mismatch: getDeityImages() is typed as Promise<{ url: string }[]> but orb-backend ContentImage model returns { filename, path, tags, available } -- no 'url' field. heroImage = images[0]?.url is always undefined."
    artifacts:
      - path: "apps/oracle/src/app/guidebook/[deity_id]/page.tsx"
        issue: "Line 25: return type declared as Promise<{ url: string }[]> but backend returns { path: string, ... }. Line 74: heroImage = images[0]?.url is always undefined."
    missing:
      - "Change getDeityImages return type to Promise<{ path: string; tags: string[]; filename: string; available: boolean }[]>"
      - "Change line 74 from images[0]?.url to images[0]?.path"
human_verification:
  - test: "End-to-end reading quality check"
    expected: "Navigate to /read/zeus on mobile, type intent, receive streaming text reading with Zeus voice narration and PANTHEON artwork mid-reading. Reading should feel mythological and personalized, not generic chatbot output."
    why_human: "Voice quality, narrative feel, and 'magical' UX are subjective and require live audio playback with orb-backend running"
  - test: "QR scan to reading starts in under 3 seconds on mobile"
    expected: "Scan any QR code linking to /read/{deity_id} on a real mobile device over cellular and reach the card reveal screen in under 3 seconds"
    why_human: "Requires real mobile device, cellular connection, and orb-backend deployed -- cannot time programmatically"
---

# Phase 2: Oracle Reading Experience Verification Report

**Phase Goal:** Users receive personalized, voice-narrated oracle readings that feel magical -- not generic chatbot output
**Verified:** 2026-03-28T16:20:13Z
**Status:** gaps_found
**Re-verification:** No -- initial verification

## Goal Achievement

### Success Criteria from ROADMAP.md

| # | Success Criterion | Status | Evidence |
|---|-------------------|--------|----------|
| 1 | User scans QR code on mobile and reaches reading screen in under 3 seconds | ? HUMAN | Build compiles, route exists at /read/[deity_id] with SSR card back for fast FCP. Actual mobile timing requires human test. |
| 2 | User hears deity-voiced narration with PANTHEON artwork displayed | ? HUMAN | Full SSE pipeline wired: useOracleSSE -> audio events -> useAudioQueue -> Web Audio API playback. PANTHEON art via SSE deity event. Requires live orb-backend to confirm audio plays. |
| 3 | User can pull a daily card and receive a unique reading each time | ✓ VERIFIED | DailyCard component wired to /api/deities/random, stores in localStorage with date, navigates to /read/{deity_id}. ReadingStream sends intent to SSE endpoint each time. |
| 4 | Free tier user hits monthly limit; paid user gets unlimited readings | ✗ FAILED | PaywallGate exists but is never mounted. recordReading() is never called. canRead() is only checked inside PaywallGate which is orphaned. |
| 5 | Digital guidebook page exists for each god with mythology, keywords, and meanings | ✗ PARTIAL | All 21 guidebook pages render at /guidebook/{deity_id} with keywords (Badge), mythology (extracted from system_prompt), reading style, and CTA. However, hero PANTHEON art is always absent due to field name mismatch (.url vs .path). |

**Score:** 1/5 fully verified, 2/5 human-needed, 1/5 partial, 1/5 failed

---

### Observable Truths (from PLAN must_haves, cross-plan summary)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Next.js app builds and TypeScript compiles without errors | ✓ VERIFIED | `npm run build` exits 0. `npx tsc --noEmit` exits 0. |
| 2 | Dark mode default, Inter + Crimson Pro fonts, gold accent, deity CSS variables | ✓ VERIFIED | layout.tsx has ThemeProvider defaultTheme="dark". fonts.ts exports inter + crimsonPro. globals.css has --accent-gold and --deity-primary/secondary/tertiary. |
| 3 | BFF proxy at /api/oracle/read/{deity_id} forwards SSE from orb-backend | ✓ VERIFIED | Edge Runtime, force-dynamic, pipes backendResponse.body, correct headers. ORB_BACKEND_URL used. |
| 4 | useOracleSSE uses named addEventListener for all 6 event types | ✓ VERIFIED | deity, text, audio, done, error, tts_error all wired via addEventListener (not onmessage). |
| 5 | useAudioQueue creates AudioContext lazily from user gesture | ✓ VERIFIED | initAudio() is a no-op unless called. Called in ReadingPageClient.handleIntentSubmit (user gesture). |
| 6 | Card reveal animation uses spring physics (stiffness 60, damping 20), prefers-reduced-motion respected | ✓ VERIFIED | motion spring with stiffness:60 damping:20. useReducedMotion() skips animation. |
| 7 | Reading text streams token-by-token with SSE, user intent required | ✓ VERIFIED | ReadingStream uses useOracleSSE with onText appending chunks. IntentInput validates >= 3 chars. |
| 8 | Deity color palette tints background and name text | ✓ VERIFIED | DeityBackground sets --deity-primary/secondary/tertiary inline. CardReveal uses colorPalette[0] for name. |
| 9 | Homepage shows daily card pull + deity gallery + reading counter | ✓ VERIFIED | page.tsx renders DailyCard, ReadingCounter, DeityGallery with server-fetched deity list. |
| 10 | Reading tracker enforces 3/month free limit via localStorage | ✓ VERIFIED (isolated) | reading-tracker.ts correctly implements canRead/recordReading/getReadingsRemaining with SSR guards. BUT: recordReading is never called from the reading flow, so count never increments in practice. |
| 11 | PaywallGate shows correct UI-SPEC copy and triggers Stripe Checkout | ✓ VERIFIED (isolated) | All UI-SPEC copy present in paywall-gate.tsx. Wires canRead(), signIn Resend, /api/checkout. BUT: component is never mounted anywhere. |
| 12 | Free tier user hits paywall; premium user bypasses it | ✗ FAILED | PaywallGate is orphaned (not imported outside its own file). Reading flow has zero canRead() enforcement. |
| 13 | Stripe webhook handler verifies signature and updates tier | ✓ VERIFIED | req.text() for raw body, constructEvent, handles checkout.session.completed + subscription.deleted + subscription.updated + invoice.payment_failed. |
| 14 | McKee storytelling guidance in all 21 deity system prompts | ✓ VERIFIED | Python audit: all 21 gods have 'mckee' in system_prompt AND non-empty mckee_guidance field. |
| 15 | Guidebook pages show mythology, keywords, reading style, and CTA | ✓ PARTIAL | All fields render correctly. Hero image is always absent due to images[0]?.url (should be .path). guidebook/page.tsx also uses ORB_BACKEND_URL directly in next/image src (bypasses BFF, only works for localhost). |
| 16 | PWA manifest, service worker, offline fallback configured | ✓ VERIFIED | manifest.ts with dark #09090b + standalone + portrait. sw.ts with CacheFirst/StaleWhileRevalidate/NetworkOnly + offline fallback. withSerwist in next.config.ts. |

---

### Required Artifacts

| Artifact | Status | Details |
|----------|--------|---------|
| `apps/oracle/src/types/sse-events.ts` | ✓ VERIFIED | All 6 interfaces + SSEStatus type. Matches orb-backend wire format exactly. |
| `apps/oracle/src/app/api/oracle/read/[deity_id]/route.ts` | ✓ VERIFIED | Edge Runtime, force-dynamic, SSE pipe-through, ORB_BACKEND_URL. |
| `apps/oracle/src/hooks/use-sse.ts` | ✓ VERIFIED | Named addEventListener for all events. Returns SSEStatus. |
| `apps/oracle/src/hooks/use-audio-queue.ts` | ✓ VERIFIED | Lazy AudioContext, enqueue with atob + decodeAudioData, sequential playback, mute via GainNode. |
| `apps/oracle/src/components/card-reveal.tsx` | ✓ VERIFIED | 3D flip, stiffness:60/damping:20, prefers-reduced-motion, 500ms delay, deity name fade-in. |
| `apps/oracle/src/components/reading-stream.tsx` | ✓ VERIFIED | useOracleSSE + useAudioQueue wired. aria-live, max-w-[640px], all error states, "Your reading is complete." |
| `apps/oracle/src/app/read/[deity_id]/page.tsx` | ✓ VERIFIED | Server component, notFound() on 404, parallel fetches, correct .path field handling. |
| `apps/oracle/src/components/daily-card.tsx` | ✓ VERIFIED | localStorage date tracking, "Pull Your Daily Card"/"The gods are choosing..."/"You drew X today", SSR-safe. |
| `apps/oracle/src/components/deity-gallery.tsx` | ⚠️ STUB-IMAGE | Structure and navigation to /read/{deity_id} correct. Gallery tiles show initial letter instead of PANTHEON art (documented intentional stub in summary -- requires content DB running). |
| `apps/oracle/src/lib/reading-tracker.ts` | ✓ VERIFIED (isolated) | canRead/recordReading/getReadingsRemaining with SSR guards. FREE_LIMIT=3. Correct monthly reset. Not called from reading flow. |
| `apps/oracle/src/components/paywall-gate.tsx` | ⚠️ ORPHANED | All UI-SPEC copy present, canRead() check, auth flow, checkout redirect. Never imported by any page or layout. |
| `apps/oracle/src/app/api/webhooks/stripe/route.ts` | ✓ VERIFIED | req.text() raw body, constructEvent, 4 event types handled, 200 always returned. |
| `apps/oracle/src/lib/auth.ts` | ✓ VERIFIED | NextAuth v5, Resend provider, JWT strategy, signIn creates user, jwt/session callbacks expose tier. |
| `apps/oracle/src/app/api/checkout/route.ts` | ✓ VERIFIED | Auth check, stripe.checkout.sessions.create, mode:subscription, STRIPE_PRICE_ID, customer_email pre-filled. |
| `apps/oracle/src/app/guidebook/[deity_id]/page.tsx` | ✗ HOLLOW | Renders all fields. heroImage = images[0]?.url is always undefined (field is .path). Hero art never displays. |
| `apps/oracle/src/app/guidebook/page.tsx` | ✓ VERIFIED | Responsive 3/4/5 grid, deity colors, generateMetadata, links to /guidebook/{deity_id}. |
| `apps/oracle/src/app/manifest.ts` | ✓ VERIFIED | Dark #09090b, standalone, portrait, Oracle Cards name. |
| `apps/oracle/src/sw.ts` | ✓ VERIFIED | precacheEntries, CacheFirst (pantheon-art 7d), StaleWhileRevalidate (deity-configs), NetworkOnly (readings), offline fallback. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| BFF proxy route | orb-backend :8300 | ORB_BACKEND_URL env var | ✓ WIRED | fetch with Accept: text/event-stream, pipes body |
| useOracleSSE | sse-events.ts types | DeityEvent, TextEvent, AudioEvent | ✓ WIRED | All types imported and used in event listeners |
| ReadingStream | useOracleSSE | hook call with sseUrl | ✓ WIRED | URL constructed, all callbacks provided |
| ReadingStream | useAudioQueue | enqueue called in onAudio | ✓ WIRED | audioQueue.enqueue(data.chunk) in onAudio callback |
| ReadingPageClient | CardReveal | imageUrl prop | ✓ WIRED | server-fetched imageData.path passed as imageUrl |
| DailyCard | /api/deities/random | fetch on pull | ✓ WIRED | fetch("/api/deities/random"), router.push to /read/{id} |
| DeityGallery | /api/deities | server-side fetch in page.tsx | ✓ WIRED | page.tsx fetches and passes deities prop |
| PaywallGate | reading flow | wrapping children | ✗ NOT WIRED | PaywallGate never imported by any parent component |
| ReadingStream onComplete | recordReading | reading completion | ✗ NOT WIRED | handleReadingComplete in ReadingPageClient has no recordReading call |
| guidebook/[deity_id] | ContentImage.path | heroImage render | ✗ BROKEN | images[0]?.url (wrong field) should be images[0]?.path |
| Stripe webhook | user tier update | constructEvent + updateUserTier | ✓ WIRED | signature verified, tier updated in db.ts |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|-------------------|--------|
| ReadingStream | readingText | SSE text events via useOracleSSE | Yes (streams from LLM) | ✓ FLOWING |
| ReadingStream | deityImage | SSE deity event | Yes (from orb-backend) | ✓ FLOWING |
| ReadingStream | audioQueue | SSE audio events | Yes (ElevenLabs base64 chunks) | ✓ FLOWING |
| ReadingPageClient | imageUrl | Server-side fetch to orb-backend /api/content/{id}/random | Yes (imageData.path field correct) | ✓ FLOWING |
| DailyCard | pulled | localStorage + /api/deities/random | Yes (real random selection) | ✓ FLOWING |
| DeityGallery | deities | Server-side fetch in page.tsx | Yes (from orb-backend) | ✓ FLOWING (but gallery images are initial-letter stub) |
| guidebook/[deity_id] | heroImage | images[0]?.url from /api/content/{id} list | No (.url undefined, field is .path) | ✗ HOLLOW_PROP |
| PaywallGate | open (dialog shown) | canRead() check | N/A (component never mounted) | ✗ DISCONNECTED |
| ReadingCounter | readingsRemaining | getReadingsRemaining() from localStorage | Static (count never increments, recordReading not called) | ⚠️ STATIC |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| App builds clean | `npm run build` | Exits 0 | ✓ PASS |
| TypeScript compiles | `npx tsc --noEmit` | Exits 0 | ✓ PASS |
| All 21 deity McKee guidance | Python audit script | 21/21 OK | ✓ PASS |
| BFF SSE route exists and responds | Static route check | /api/oracle/read/[deity_id] listed in build output | ✓ PASS |
| PaywallGate mounted in app | grep for import | Zero imports outside component file | ✗ FAIL |
| recordReading called in reading flow | grep across src/ | Zero call sites | ✗ FAIL |
| heroImage populated in guidebook | Field name check | images[0]?.url vs ContentImage.path | ✗ FAIL |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| READ-01 | 02-01, 02-02 | QR scan to reading starts in under 3 seconds on mobile | ? HUMAN | SSR card back for fast FCP, Edge Runtime BFF. Needs mobile timing test. |
| READ-02 | 02-02 | User selects intention/question before reading begins | ✓ SATISFIED | IntentInput component with validation. BFF rejects intent < 3 chars. |
| READ-03 | 02-02 | AI generates personalized reading using deity personality + mythology RAG | ? HUMAN | Full SSE pipeline wired. Content depends on orb-backend RAG + LLM. Needs live test. |
| READ-04 | 02-02 | Reading delivered with deity voice narration via ElevenLabs | ? HUMAN | useAudioQueue correctly decodes base64 SSE audio chunks and plays sequentially. Needs live audio test. |
| READ-05 | 02-02 | PANTHEON artwork displayed during reading | ✓ SATISFIED | deityImage from SSE deity event displayed after first paragraph. Server-side image URL from /api/content. |
| READ-06 | 02-03 | McKee storytelling principles applied in reading prompt engineering | ✓ SATISFIED | All 21 deity JSON files have mckee_guidance field and 'mckee' in system_prompt. Verified by Python audit. |
| READ-07 | 02-03 | Daily card / single pull reading mode | ✓ SATISFIED | DailyCard component with localStorage date tracking, "Pull Your Daily Card", navigates to /read/{id}. |
| READ-08 | 02-03, 02-04 | Free tier with limited readings per month | ✗ BLOCKED | reading-tracker.ts implemented correctly but isolated. PaywallGate orphaned. recordReading never called. Free limit is unenforced. |
| READ-09 | 02-04 | Paid tier via Stripe ($9.99/mo) with unlimited readings | ✗ BLOCKED | Stripe Checkout, Auth.js, webhook handler all implemented. But entry point (PaywallGate) is never activated. No user can reach the checkout flow through normal app navigation. |
| READ-10 | 02-05 | Digital guidebook per god (mythology, keywords, meanings) | ✓ PARTIAL | All 21 guidebook pages exist with keywords, mythology, reading style, CTA. Hero image absent due to .url vs .path field mismatch in getDeityImages(). |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `apps/oracle/src/components/paywall-gate.tsx` | 1-189 | Fully implemented component, zero imports outside own file | BLOCKER | Free tier enforcement never activates. READ-08 and READ-09 cannot be reached by users. |
| `apps/oracle/src/lib/reading-tracker.ts` | 24 | recordReading() exported but never called | BLOCKER | Reading count never increments. canRead() always returns true after 0 readings. Even if PaywallGate were mounted, it would never trigger. |
| `apps/oracle/src/app/guidebook/[deity_id]/page.tsx` | 25, 74 | Wrong field name (.url vs .path) in getDeityImages return type and heroImage access | WARNING | Guidebook hero art always absent. Deity pages render without their primary visual. Not a total failure (text content works) but degrades the experience. |
| `apps/oracle/src/components/deity-gallery.tsx` | 39-44 | Initial letter shown instead of PANTHEON art | INFO | Documented intentional stub in 02-03-SUMMARY.md. Does not affect reading flow. Gallery still navigates correctly to /read/{deity_id}. |
| `apps/oracle/src/app/guidebook/page.tsx` | 43 | next/image uses ORB_BACKEND_URL directly (not BFF proxy). remotePatterns only allows localhost:8300 | WARNING | Images will fail in production where ORB_BACKEND_URL is a non-localhost hostname not in remotePatterns. |

---

### Human Verification Required

#### 1. Oracle Reading Quality

**Test:** Start orb-backend at :8300, run `cd apps/oracle && npm run dev`, navigate to http://localhost:3000/read/zeus on a phone (or 375px viewport). Type "What does my future hold?" and tap Begin Reading.

**Expected:** Card flips with spring animation revealing Zeus PANTHEON art. Intent input slides up. Reading text streams word-by-word with Zeus's voice narrating simultaneously. Background gains subtle golden tint. Reading completes with "Your reading is complete." and two buttons. The reading content feels mythological, dramatic, and personalized -- not generic chatbot output.

**Why human:** Voice quality, narrative feel, and the "magical" character of the experience are subjective. Also requires live orb-backend with ElevenLabs credentials.

#### 2. QR Code to Reading Under 3 Seconds

**Test:** Deploy to a staging URL, generate a QR code for /read/zeus, scan on a real mobile device over cellular.

**Expected:** Reading screen (card back visible) within 3 seconds of QR scan.

**Why human:** Requires real mobile device, cellular network, and production deployment. Network conditions vary.

---

### Gaps Summary

Two blockers prevent goal achievement:

**Gap 1 -- Paywall enforcement completely disconnected (READ-08, READ-09)**

The payment and free-tier infrastructure is feature-complete in isolation: `reading-tracker.ts` correctly tracks usage, `paywall-gate.tsx` checks `canRead()` and drives the full Stripe Checkout flow, `stripe.ts` + webhook handler + checkout route are all wired. But `PaywallGate` is never imported or mounted anywhere in the app. No parent wraps the reading flow in it. Additionally, `recordReading()` is never called when a reading completes, so even if the gate were mounted, it would never trigger because the count never increments.

Root fix: Mount `PaywallGate` in `reading-page-client.tsx` wrapping the reading content phases, and call `recordReading(deity.id)` in `handleReadingComplete`.

**Gap 2 -- Guidebook hero image field mismatch (READ-10 partial)**

`getDeityImages()` in `guidebook/[deity_id]/page.tsx` is typed as returning `{ url: string }[]` but the orb-backend `ContentImage` Pydantic model serializes to `{ filename, path, tags, available }` -- no `url` field. `heroImage = images[0]?.url` is always `undefined`. The deity guidebook pages render without their primary visual.

Root fix: Change line 25 return type to `{ path: string; tags: string[]; filename: string; available: boolean }[]` and line 74 from `images[0]?.url` to `images[0]?.path`.

These two gaps do not affect the core reading stream quality (voice, text, animation, PANTHEON art mid-reading all work correctly). They affect monetization enforcement and the guidebook visual experience.

---

_Verified: 2026-03-28T16:20:13Z_
_Verifier: Claude (gsd-verifier)_
