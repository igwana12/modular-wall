# Phase 2: Oracle Reading Experience - Research

**Researched:** 2026-03-28
**Domain:** Mobile web experience, freemium monetization, SSE streaming, Stripe payments, animation
**Confidence:** HIGH

## Summary

Phase 2 builds the user-facing oracle reading experience -- the product that makes people buy cards. The backend (orb-backend at :8300) already streams readings via SSE with interleaved text + audio events. This phase is pure frontend: a Next.js 15 App Router application that consumes those SSE events, wraps them in a dramatic visual experience with deity art and voice narration, and gates access behind a freemium model with Stripe subscriptions.

The six research areas resolve cleanly. Competitive analysis of Co-Star, Nebula, The Pattern, and Labyrinthos reveals a consistent industry pattern: generous free tier with feature/depth gating (not hard usage caps), auth delayed until value is demonstrated, and paywall appearing after personalization investment. The technical stack is straightforward -- EventSource API for SSE, motion (formerly framer-motion) for card reveal animations, Stripe Checkout for payments, and Auth.js v5 for magic link authentication. No exotic dependencies.

**Primary recommendation:** Use a "3 free readings/month, then paywall" model with anonymous session tracking (localStorage + fingerprint) for the free tier, delaying email auth until the paywall moment. This matches industry patterns and minimizes friction for the QR-scan entry point.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- QR scan lands on deity-specific URL: `/read/{deity_id}`
- Card reveal first -- dramatic visual moment showing the deity's PANTHEON art before anything else
- Then intent input -- user types their question/situation
- Then reading streams -- voice + text + visuals delivered via SSE (wired in Phase 1)
- Both modes available: Random pull as primary (homepage), user can also browse/pick specific god
- Tech Stack: Next.js 15 App Router + React 19 + TypeScript + Tailwind 4 + shadcn/ui
- Serwist for PWA / "Add to Home Screen" after QR scan
- next-themes for dark mode (oracle readings = immersive dark by default)
- Stripe for payments, Auth.js v5 for authentication
- Deploy on Vercel (free tier initially)
- orb-backend at :8300 already has SSE endpoint, 21 deity configs, Content DB, RAG, TTS
- Frontend consumes `/api/oracle/read/{deity_id}?intent=...` SSE endpoint
- Next.js API routes as BFF proxy layer
- McKee storytelling principles applied in reading prompt engineering

### Claude's Discretion
- Free tier / paywall strategy (specifics)
- Auth timing strategy (when to require sign-up)
- Card reveal animation approach
- SSE consumption patterns
- Stripe integration patterns

### Deferred Ideas (OUT OF SCOPE)
- AR card experience with 3D animated deity (v2)
- Mystery pack / digital-first commerce model (Phase 3)
- Customized physical card delivery (Phase 3)
- Multi-card spread readings (v2)
- Shareable reading cards / social images (v2)
- Reading journal with pattern analytics (v2)
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| READ-01 | QR scan to reading starts in under 3 seconds on mobile | QR-to-reading UX section: PWA precaching, minimal JS, no redirects |
| READ-02 | User selects intention/question before reading begins | Reading flow UX pattern: intent input after card reveal, before stream |
| READ-03 | AI generates personalized reading using deity personality + mythology RAG | Backend already implements this (streaming.py). Frontend consumes via SSE |
| READ-04 | Reading delivered with deity voice narration via ElevenLabs (min 5 gods) | SSE audio events pattern: base64 audio chunks, Web Audio API playback |
| READ-05 | PANTHEON artwork displayed during reading (god-specific visuals) | SSE deity event includes image data. Content DB endpoint for gallery |
| READ-06 | McKee storytelling principles in reading prompt engineering | Backend prompt engineering task, not frontend. Already in system prompts |
| READ-07 | Daily card / single pull reading mode (primary engagement loop) | Daily card mechanic section: localStorage date tracking + random deity API |
| READ-08 | Free tier with limited readings per month | Monetization research: 3 readings/month free, anon session tracking |
| READ-09 | Paid tier via Stripe ($9.99/mo) with unlimited readings | Stripe integration patterns: Checkout subscription mode + webhooks |
| READ-10 | Digital guidebook per god (mythology, keywords, meanings) | Static content from deity JSON configs, rendered as guidebook pages |
</phase_requirements>

## Standard Stack

### Core (LOCKED from CLAUDE.md)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x | Web framework | App Router, SSR, Vercel deployment. Locked decision. |
| react | 19.x | UI library | Ships with Next.js 15. Server Components for guidebook pages. |
| typescript | 5.x | Type safety | Non-negotiable. |
| tailwindcss | 4.x | Styling | Inline theming, no config file. Locked. |
| shadcn/ui | latest | Component library | Copy-paste components. Locked. |

### Phase 2 Additions
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| motion | 12.38.0 | Card reveal animation | Card flip/reveal on `/read/{deity_id}`. Renamed from framer-motion in 2025. Import from `motion/react`. |
| stripe | 21.0.1 | Server-side Stripe SDK | Checkout sessions, webhook verification, customer portal in API routes. |
| @stripe/stripe-js | 9.0.0 | Client-side Stripe | Redirect to Checkout from client. Lightweight loader. |
| @serwist/next | 9.5.7 | PWA / service worker | Precache reading pages, "Add to Home Screen" prompt. Locked. |
| next-themes | 0.4.6 | Dark mode | Dark by default for immersive oracle feel. Locked. |
| next-auth (Auth.js v5) | 5.x (beta) | Authentication | Magic link email. Delayed auth -- only at paywall. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion | CSS @keyframes | CSS is lighter but lacks gesture support, spring physics, and `AnimatePresence` for exit animations. Card reveal needs dramatic spring feel. |
| Stripe Checkout (hosted) | Stripe Elements (embedded) | Checkout is faster to implement, handles PCI compliance automatically. Elements gives more control but not needed for v1. |
| Auth.js v5 magic link | Clerk | Clerk adds cost ($25/mo at scale). Auth.js is free and sufficient for magic link flow. |
| EventSource API | fetch + ReadableStream | EventSource handles reconnection automatically. fetch stream is lower-level. Use EventSource -- it matches the SSE protocol from orb-backend perfectly. |

**Installation:**
```bash
npm install motion stripe @stripe/stripe-js @serwist/next next-themes next-auth@beta
npx shadcn-ui@latest init
```

## Architecture Patterns

### Recommended Project Structure
```
apps/oracle/
  src/
    app/
      layout.tsx              # Root layout: dark theme, fonts, metadata
      page.tsx                # Homepage: daily card pull + god gallery
      read/
        [deity_id]/
          page.tsx            # Card reveal + intent input + reading stream
      guidebook/
        page.tsx              # 21-god overview grid
        [deity_id]/
          page.tsx            # Individual god guidebook page
      api/
        oracle/
          read/[deity_id]/
            route.ts          # BFF proxy to orb-backend SSE
        webhooks/
          stripe/
            route.ts          # Stripe webhook handler
        auth/
          [...nextauth]/
            route.ts          # Auth.js routes
      pricing/
        page.tsx              # Subscription plans
      account/
        page.tsx              # Manage subscription (Stripe portal redirect)
    components/
      card-reveal.tsx         # Animated card flip with motion
      reading-stream.tsx      # SSE consumer + text/audio renderer
      audio-player.tsx        # Web Audio API for TTS chunks
      intent-input.tsx        # Question/intention form
      deity-gallery.tsx       # 21-god browse grid
      daily-card.tsx          # Random pull mechanic
      paywall-gate.tsx        # Free tier check + upgrade prompt
    hooks/
      use-sse.ts              # EventSource hook with reconnection
      use-reading-count.ts    # Free tier tracking (localStorage)
      use-audio-queue.ts      # Sequential audio chunk playback
    lib/
      stripe.ts               # Stripe client/server helpers
      auth.ts                 # Auth.js config
      reading-tracker.ts      # Anonymous usage tracking
    types/
      sse-events.ts           # Typed SSE event interfaces
```

### Pattern 1: SSE Consumption via BFF Proxy
**What:** Next.js API route proxies SSE from orb-backend to client, adding auth headers and rate limiting.
**When to use:** Every reading request.
**Example:**
```typescript
// app/api/oracle/read/[deity_id]/route.ts
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ deity_id: string }> }
) {
  const { deity_id } = await params;
  const { searchParams } = new URL(request.url);
  const intent = searchParams.get('intent') || '';

  // Rate limiting check here (free tier enforcement)

  const backendUrl = `${process.env.ORB_BACKEND_URL}/api/oracle/read/${deity_id}?intent=${encodeURIComponent(intent)}`;

  const backendResponse = await fetch(backendUrl, {
    headers: { 'Accept': 'text/event-stream' },
  });

  // Pipe through as SSE
  return new Response(backendResponse.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

### Pattern 2: Typed SSE Client Hook
**What:** Custom React hook consuming named SSE events matching orb-backend's event types.
**When to use:** Reading stream component.
**Example:**
```typescript
// hooks/use-sse.ts
'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface DeityEvent {
  name: string;
  title: string;
  image: { path: string; tags: string[] } | null;
  color_palette: string[];
}

interface TextEvent { chunk: string; }
interface AudioEvent { chunk: string; } // base64
interface DoneEvent { total_chars: number; deity: string; }
interface ErrorEvent { error: string; }

type SSECallbacks = {
  onDeity?: (data: DeityEvent) => void;
  onText?: (data: TextEvent) => void;
  onAudio?: (data: AudioEvent) => void;
  onDone?: (data: DoneEvent) => void;
  onError?: (data: ErrorEvent) => void;
};

export function useOracleSSE(url: string | null, callbacks: SSECallbacks) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'streaming' | 'done' | 'error'>('idle');
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!url) return;
    setStatus('connecting');

    const es = new EventSource(url);
    esRef.current = es;

    es.addEventListener('deity', (e) => {
      setStatus('streaming');
      callbacks.onDeity?.(JSON.parse(e.data));
    });
    es.addEventListener('text', (e) => callbacks.onText?.(JSON.parse(e.data)));
    es.addEventListener('audio', (e) => callbacks.onAudio?.(JSON.parse(e.data)));
    es.addEventListener('done', (e) => {
      setStatus('done');
      callbacks.onDone?.(JSON.parse(e.data));
      es.close();
    });
    es.addEventListener('error', (e) => {
      // SSE 'error' can be connection loss OR custom error event
      if (e instanceof MessageEvent) {
        callbacks.onError?.(JSON.parse(e.data));
      }
      setStatus('error');
    });
    es.addEventListener('tts_error', (e) => {
      // Non-fatal -- TTS failed but text continues
      console.warn('TTS error:', JSON.parse(e.data));
    });

    return () => { es.close(); esRef.current = null; };
  }, [url]);

  return { status };
}
```

### Pattern 3: Audio Queue for TTS Chunks
**What:** Sequential playback of base64-encoded audio chunks from SSE.
**When to use:** During reading stream when audio events arrive.
**Example:**
```typescript
// hooks/use-audio-queue.ts
'use client';
import { useRef, useCallback } from 'react';

export function useAudioQueue() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const queueRef = useRef<string[]>([]);
  const playingRef = useRef(false);

  const enqueue = useCallback((base64Chunk: string) => {
    queueRef.current.push(base64Chunk);
    if (!playingRef.current) playNext();
  }, []);

  const playNext = async () => {
    if (queueRef.current.length === 0) { playingRef.current = false; return; }
    playingRef.current = true;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const chunk = queueRef.current.shift()!;
    const binary = atob(chunk);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const buffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.onended = () => playNext();
    source.start();
  };

  return { enqueue };
}
```

### Anti-Patterns to Avoid
- **DO NOT fetch SSE with regular fetch() and parse manually** -- Use EventSource API. It handles reconnection, content-type negotiation, and named events natively. The orb-backend emits named events (deity, text, audio, done, error) that EventSource can listen to individually.
- **DO NOT buffer the entire reading before displaying** -- The whole point of SSE is progressive delivery. Append text tokens as they arrive. The backend explicitly forbids batch-then-stream (D-10).
- **DO NOT require auth before the first reading** -- Friction kills QR-scan conversion. Track anonymously first, gate at the paywall.
- **DO NOT create audio elements per chunk** -- Use Web Audio API with a single AudioContext and queue. Creating `<audio>` elements per chunk causes gaps and memory leaks.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SSE reconnection | Custom retry logic | EventSource API | Built-in reconnection with Last-Event-ID. Exponential backoff for free. |
| Payment form | Custom card input | Stripe Checkout (hosted page) | PCI compliance, 3D Secure, Apple Pay, Google Pay -- all handled. |
| Subscription lifecycle | Custom billing state machine | Stripe webhooks + Billing Portal | Renewals, failures, cancellations, proration -- all handled by Stripe. |
| Service worker | Custom caching strategy | @serwist/next | Precaching, runtime caching, offline fallback -- all configured declaratively. |
| Dark mode | CSS media query + manual toggle | next-themes | Handles hydration mismatch, system preference, localStorage persistence. |
| Card flip 3D animation | CSS transforms + JS | motion (framer-motion successor) | Spring physics, gesture support, AnimatePresence for unmount animations. GPU-accelerated. |

**Key insight:** The entire payment and auth subsystem should be handled by Stripe + Auth.js. Custom billing logic is a tarpit that burns months. Stripe Checkout for conversion, Billing Portal for self-service management, webhooks for state sync.

## Competitive Analysis: Free Tier / Paywall Strategy

### What Successful Apps Do

| App | Free Tier | Paywall Trigger | Pricing | Auth Timing |
|-----|-----------|-----------------|---------|-------------|
| **Co-Star** | Daily horoscope, birth chart, friend compatibility | Deep readings, relationship analysis, "Ask the Stars" | $11.99/unit (one-time purchases, not subscription) | Sign-up required immediately (birth data needed) |
| **The Pattern** | Personality insights, daily notifications, bonds feature | "Personal Audio" deep-dive series, detailed descriptions | $29.99/quarter or $83.99/year | Sign-up required immediately (birth data) |
| **Nebula** | Basic placements (Sun, Moon, Rising) | Detailed interpretations, live psychic chat | 3 tiers + trial; ~$9-10/user/install revenue | After 26-step onboarding quiz (paywall at quiz completion) |
| **Labyrinthos** | Everything free (no paywall) | N/A -- monetizes through physical deck sales | Physical decks $25-40 | Optional sign-up for progress tracking |
| **Sanctuary** | Daily horoscope, birth chart | Live astrologer sessions | Monthly membership (per-session pricing) | Required for live sessions only |

### Key Patterns Observed

1. **Astrology apps require birth data, so auth is forced early.** Oracle Cards do NOT need birth data -- this is a massive advantage for delayed auth.
2. **Feature gating outperforms hard usage caps.** The Pattern and Co-Star gate *depth* (detailed vs. surface readings), not *quantity*.
3. **Nebula's high-investment onboarding converts well.** Their 26-step quiz creates psychological commitment before the paywall. Revenue: ~$450-700K/month.
4. **Labyrinthos proves physical products + free digital works.** Directly analogous to Oracle Cards model.

### Recommended Strategy for Oracle Cards

**Model: "3 Free Readings / Month + Feature Depth Gating"**

| Tier | Access | Price |
|------|--------|-------|
| Free (Anonymous) | 3 readings/month, text-only (no voice), basic reading length | $0 |
| Free (Signed Up) | 3 readings/month, voice narration included, save reading history | $0 |
| Premium | Unlimited readings, voice narration, extended readings, daily card notifications, guidebook access | $9.99/month |

**Why this model:**
- 3/month gives enough to experience value and share with friends (word-of-mouth driver)
- Voice gating for anonymous users saves ElevenLabs API costs (significant at scale)
- Feature depth (not hard cap) makes the free experience feel complete, not crippled
- Matches the $9.99/mo price point from requirements (READ-09)

**Conversion math (conservative):**
- 1,000 monthly active users (post-card-launch)
- 5% conversion to paid = 50 subscribers
- 50 x $9.99 = $499.50/month recurring
- At 10,000 MAU: $4,995/month
- Industry benchmark: 2-5% freemium conversion, top apps hit 5-8%

## Auth Timing Strategy

### Recommendation: Delayed Auth at Paywall

**Flow:**
1. QR scan -> `/read/{deity_id}` -- NO auth required
2. Card reveal animation -- NO auth required
3. Intent input -- NO auth required
4. Reading streams (text + audio for first 3/month) -- NO auth required
5. User hits monthly limit OR wants premium feature -> **Auth prompt appears**
6. Magic link email -> account created -> redirect to Stripe Checkout

**Anonymous tracking mechanism:**
```typescript
// lib/reading-tracker.ts
const STORAGE_KEY = 'oracle_readings';

interface ReadingRecord {
  month: string; // "2026-04"
  count: number;
  deity_ids: string[];
}

export function canRead(): boolean {
  const record = getMonthRecord();
  return record.count < 3; // Free tier limit
}

export function recordReading(deityId: string): void {
  const record = getMonthRecord();
  record.count++;
  record.deity_ids.push(deityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function getMonthRecord(): ReadingRecord {
  const month = new Date().toISOString().slice(0, 7);
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (stored.month === month) return stored;
  } catch {}
  return { month, count: 0, deity_ids: [] };
}
```

**Why localStorage (not server-side) for anonymous tracking:**
- No auth means no server-side user identity to track against
- localStorage is trivially bypassable (clear storage) -- that is OK for v1
- Users who bother to clear localStorage to get free readings are not your paying customers
- Server-side enforcement kicks in once the user creates an account
- Keeps the zero-friction QR-scan experience intact

**Auth.js v5 Magic Link Setup:**
- Provider: Resend (recommended by Auth.js docs, cheaper than SendGrid for transactional email)
- Session strategy: JWT (no database needed for sessions)
- Database adapter: Prisma or Drizzle for user records + Stripe customer ID mapping

## QR-to-Reading Mobile UX (READ-01: <3 Second Target)

### Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| First Contentful Paint | <1.0s | SSR the card back image, inline critical CSS |
| Time to Interactive | <2.0s | Minimal client JS -- card reveal is CSS + motion only |
| Full reading start | <3.0s | SSE connection opens immediately after intent submit |

### Optimization Strategies

1. **No redirects.** QR code points directly to `https://oracleball.ai/read/{deity_id}`. No shortener, no redirect chain.
2. **SSR the card back.** The `/read/{deity_id}` page server-renders the card back (static image) so paint happens before any JS loads.
3. **Preload deity data.** The page's `generateMetadata` can fetch deity info server-side, embedded in the initial HTML.
4. **Lazy load motion.** The card flip animation library loads only after the static card back is visible. Use `dynamic(() => import('./card-reveal'), { ssr: false })`.
5. **Serwist precaching.** After first visit, the service worker caches the shell, fonts, and common deity images. Return visits are near-instant.
6. **Image optimization.** PANTHEON art served via Next.js `<Image>` with `priority` flag. WebP format, responsive sizes.
7. **No auth check on initial load.** Reading count check is localStorage-only (sync, <1ms).

### PWA Timing
- **Do NOT prompt "Add to Home Screen" on first visit.** It's annoying.
- Prompt after the first completed reading (user has experienced value).
- Use Serwist's `beforeinstallprompt` event to capture and defer the prompt.

## SSE Consumption: Next.js 15 App Router

### Architecture
```
[Mobile Browser] --EventSource--> [Next.js BFF /api/oracle/read/:id] --fetch--> [orb-backend :8300 /api/oracle/read/:id]
```

### SSE Event Types (from streaming.py)

| Event | Data | When |
|-------|------|------|
| `deity` | `{name, title, image, color_palette}` | First event, <100ms |
| `text` | `{chunk: "token"}` | Each LLM token |
| `audio` | `{chunk: "base64..."}` | After each sentence TTS |
| `tts_error` | `{error: "..."}` | Non-fatal TTS failure |
| `error` | `{error: "..."}` | Fatal pipeline failure |
| `done` | `{total_chars, deity}` | Reading complete |

### Critical: Named Events
The backend uses **named SSE events** (via sse-starlette), NOT the default `message` event. The client MUST use `addEventListener('deity', ...)` NOT `onmessage`. This is the most common SSE mistake.

### BFF Proxy Considerations
- The Next.js API route proxies the SSE stream from orb-backend. This adds latency (~10-50ms) but enables:
  - Rate limiting (free tier enforcement server-side for authenticated users)
  - Auth header injection (future: per-user reading tracking)
  - CORS handling (orb-backend doesn't need to know about browser origins)
  - Vercel edge function deployment (close to user)
- On Vercel, streaming responses from API routes work with Edge Runtime. Set `export const runtime = 'edge';` for best performance.

## Stripe Integration (READ-08, READ-09)

### Architecture

```
[Client] -> Stripe Checkout (hosted) -> [Stripe] -> Webhook -> [Next.js /api/webhooks/stripe] -> [DB: update user tier]
```

### Key Implementation Decisions

1. **Use Stripe Checkout (hosted), not Elements.** Faster to build, handles PCI compliance, supports Apple Pay / Google Pay automatically.
2. **Subscription mode for $9.99/month.** Create a Product + Price in Stripe Dashboard. Use `mode: 'subscription'` in checkout session.
3. **Webhook is the source of truth.** Never trust the success page redirect. Verify payment via `checkout.session.completed` webhook.
4. **Billing Portal for self-service.** Users manage cancellation, payment method updates, and invoices through Stripe's hosted portal. One API call to generate a portal session URL.

### Webhook Events to Handle

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Set user tier to 'premium', store Stripe customer ID |
| `customer.subscription.updated` | Handle plan changes |
| `customer.subscription.deleted` | Revert user to free tier |
| `invoice.payment_failed` | Notify user, grace period |

### Stripe Webhook in App Router
```typescript
// app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text(); // MUST be raw text, not json
  const sig = (await headers()).get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Update user in DB: tier = 'premium'
      break;
    case 'customer.subscription.deleted':
      // Revert user to free tier
      break;
  }

  return new Response('ok', { status: 200 });
}
```

## Card Reveal Animation (READ-05)

### Design Intent
The card reveal should feel like a **moment** -- not a page load. The user scanned a physical card, and now the god appears. This needs to be dramatic.

### Recommended Approach: 3D Card Flip with motion

**Sequence:**
1. Page loads with card BACK visible (deity-agnostic, consistent branding)
2. Short pause (500ms) to build anticipation
3. Card flips 180 degrees with spring physics, revealing deity's PANTHEON art
4. Deity name and title fade in below
5. Color palette from deity config tints the background/borders
6. Intent input slides up from bottom after flip completes

**Implementation:**
```typescript
// components/card-reveal.tsx
'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface CardRevealProps {
  deityName: string;
  deityTitle: string;
  imageUrl: string;
  colorPalette: string[];
  onRevealComplete: () => void;
}

export function CardReveal({ deityName, deityTitle, imageUrl, colorPalette, onRevealComplete }: CardRevealProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Build anticipation, then flip
    const timer = setTimeout(() => setIsFlipped(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        style={{ perspective: 1200 }}
        className="w-[280px] h-[420px]" // Tarot proportions (2.75:4.75 ratio)
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20, duration: 1.2 }}
          onAnimationComplete={() => isFlipped && onRevealComplete()}
          style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
        >
          {/* Card Back */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Oracle Cards branding / sacred geometry pattern */}
            <div className="w-full h-full bg-gradient-to-b from-indigo-950 to-purple-950 flex items-center justify-center">
              {/* Brand mark here */}
            </div>
          </motion.div>

          {/* Card Front (deity art) */}
          <motion.div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src={imageUrl} alt={deityName} className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Deity info fades in after flip */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-6"
          >
            <h1 className="text-3xl font-bold" style={{ color: colorPalette[0] }}>
              {deityName}
            </h1>
            <p className="text-lg text-muted-foreground">{deityTitle}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### Performance Notes
- motion uses GPU-accelerated transforms (rotateY, opacity). No layout thrashing.
- Spring animations feel more "physical" than eased durations -- appropriate for a magical reveal.
- `AnimatePresence` handles the fade-in of deity info cleanly without layout shifts.
- On low-end mobile: spring physics runs at 60fps because it is CSS transform-based. The motion library delegates to WAAPI where possible.

## Common Pitfalls

### Pitfall 1: EventSource Default Event Trap
**What goes wrong:** Developer uses `es.onmessage = ...` expecting to receive all events. Gets nothing.
**Why it happens:** orb-backend emits **named events** (`deity`, `text`, `audio`, `done`, `error`). The `onmessage` handler only fires for unnamed events (no `event:` field in SSE).
**How to avoid:** Use `es.addEventListener('deity', ...)` for each event type. Never use `onmessage`.
**Warning signs:** SSE connection opens successfully but no events are received.

### Pitfall 2: AudioContext Autoplay Policy
**What goes wrong:** Audio doesn't play on mobile. No error, just silence.
**Why it happens:** Browsers require a user gesture before creating or resuming an AudioContext. The SSE stream starts programmatically, not from a click.
**How to avoid:** Create/resume the AudioContext on the "Start Reading" button click (user gesture), THEN open the SSE stream. Store the AudioContext in a ref.
**Warning signs:** Works on desktop, silent on mobile. Works on second try but not first.

### Pitfall 3: Stripe Webhook Raw Body
**What goes wrong:** Webhook signature verification fails every time.
**Why it happens:** Next.js App Router middleware or body parsing converts the raw body to JSON before the handler runs. Stripe signature verification requires the raw request body.
**How to avoid:** Use `req.text()` not `req.json()`. Do NOT add body-parsing middleware to the webhook route.
**Warning signs:** 400 errors from webhook endpoint, events never processed.

### Pitfall 4: SSE Connection on Vercel Edge
**What goes wrong:** SSE stream cuts off after 30 seconds on Vercel.
**Why it happens:** Vercel serverless functions have execution time limits. Default is 10s (Hobby) or 60s (Pro).
**How to avoid:** Use `export const runtime = 'edge';` for the SSE proxy route -- Edge Functions have no execution time limit for streaming responses. OR use Vercel Pro plan's increased limits.
**Warning signs:** Readings cut off mid-stream, "done" event never received.

### Pitfall 5: localStorage Not Available in SSR
**What goes wrong:** `localStorage is not defined` error during server rendering.
**Why it happens:** Reading count tracker uses localStorage, but Next.js renders on server first.
**How to avoid:** Always guard with `typeof window !== 'undefined'` check, or use the tracker only in `useEffect` / event handlers (never in render path).
**Warning signs:** Build fails or hydration mismatch errors.

### Pitfall 6: Free Tier Bypass via Multiple Browsers/Devices
**What goes wrong:** Users get unlimited free readings by using different browsers or clearing localStorage.
**Why it happens:** Anonymous tracking is client-side only.
**How to avoid:** Accept this for v1. The goal is conversion, not enforcement. Users determined to bypass the paywall were never going to pay. Server-side enforcement kicks in for authenticated users. Consider browser fingerprinting (e.g., FingerprintJS) for v2 if abuse is significant.
**Warning signs:** Analytics show many users with exactly 3 readings/month across multiple "sessions."

## Code Examples

### Complete Reading Page Flow
```typescript
// app/read/[deity_id]/page.tsx
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CardRevealClient } from '@/components/card-reveal-client';

// Server component -- fetches deity data at request time
export default async function ReadingPage({
  params,
}: {
  params: Promise<{ deity_id: string }>;
}) {
  const { deity_id } = await params;

  // Fetch deity config server-side for SSR
  const res = await fetch(`${process.env.ORB_BACKEND_URL}/api/deities/${deity_id}`, {
    next: { revalidate: 3600 }, // Cache deity config for 1 hour
  });

  if (!res.ok) notFound();
  const deity = await res.json();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center pt-safe">
      <Suspense fallback={<CardBackSkeleton />}>
        <CardRevealClient deity={deity} />
      </Suspense>
    </main>
  );
}

// Static card back shown during loading
function CardBackSkeleton() {
  return (
    <div className="w-[280px] h-[420px] rounded-2xl bg-gradient-to-b from-indigo-950 to-purple-950 shadow-2xl animate-pulse" />
  );
}
```

### Daily Card Pull
```typescript
// components/daily-card.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DAILY_KEY = 'oracle_daily_card';

export function DailyCard() {
  const router = useRouter();
  const [todaysDeity, setTodaysDeity] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(DAILY_KEY);
    if (stored) {
      const { date, deity_id } = JSON.parse(stored);
      if (date === today) {
        setTodaysDeity(deity_id);
        return;
      }
    }
    // No card pulled today -- show the pull button
    setTodaysDeity(null);
  }, []);

  async function pullCard() {
    // Get random deity from backend
    const res = await fetch('/api/deities/random');
    const { id } = await res.json();

    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(DAILY_KEY, JSON.stringify({ date: today, deity_id: id }));

    router.push(`/read/${id}`);
  }

  if (todaysDeity) {
    return <AlreadyPulledCard deityId={todaysDeity} />;
  }

  return (
    <button onClick={pullCard} className="...">
      Pull Your Daily Card
    </button>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| framer-motion package | motion package (import from motion/react) | 2025 | Same API, new package name. framer-motion still works but is unmaintained. |
| next-pwa | @serwist/next | 2024 | next-pwa unmaintained. Serwist is the official successor. |
| NextAuth v4 | Auth.js v5 (next-auth@beta) | 2024 | New config pattern, Edge-compatible, unified providers. v5 is beta but stable for production. |
| Stripe legacy Checkout | Stripe Checkout + Billing Portal | 2023+ | Self-service subscription management. No custom billing UI needed. |
| Custom SSE parsing | Native EventSource + named events | Always | EventSource has been stable in all browsers since 2015. Named events are underused but well-supported. |

**Deprecated/outdated:**
- `framer-motion` package: Still works but replaced by `motion`. Use `motion/react` imports.
- `next-pwa`: Unmaintained since 2023. Use `@serwist/next` instead.
- Stripe legacy checkout (redirect via form POST): Use the JS SDK's `redirectToCheckout` or server-created checkout sessions.

## Open Questions

1. **ElevenLabs cost at scale**
   - What we know: ElevenLabs WebSocket streaming TTS is used per-sentence during readings. 21 deity voices configured.
   - What's unclear: Cost per reading. If average reading is 500 words (~3 minutes audio), what's the monthly cost at 1,000 MAU with 5% paying + 95% free (3 readings/month)?
   - Recommendation: Track TTS usage from day one. Gate voice narration for anonymous free users (text-only) to control costs. This also creates a conversion incentive.

2. **Database for user accounts and reading history**
   - What we know: Auth.js v5 needs a database adapter for magic link tokens and user records. Stripe needs customer ID storage.
   - What's unclear: What database to use. No database currently exists in the stack for the web app.
   - Recommendation: Start with SQLite via Prisma (zero-ops, deploys to Vercel with Turso for production). Or use Vercel Postgres if staying in the Vercel ecosystem. This is a planning decision, not a research gap.

3. **Vercel plan limitations**
   - What we know: Hobby plan has 10s serverless function timeout. SSE streams may exceed this.
   - What's unclear: Whether Edge Runtime streaming truly has no time limit on Hobby.
   - Recommendation: Use Edge Runtime for the SSE proxy route. If that fails, either upgrade to Vercel Pro ($20/month) or serve the SSE directly from orb-backend (bypass BFF for streaming, keep BFF for other routes). The orb-backend already handles CORS.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Next.js build | TBD (check at plan time) | -- | -- |
| orb-backend :8300 | SSE streaming, deity API | Assumed (Phase 1 output) | 1.0.0 | -- |
| Stripe account | Payments | Setup required | -- | Delay payment features to end of phase |
| Resend account | Magic link email | Setup required | -- | Use console log in dev, Resend in prod |
| Vercel account | Deployment | Setup required | -- | Local dev first, deploy when ready |
| PANTHEON art files | Card visuals, guidebook | Available on Extreme Pro drive | -- | Use placeholder images in dev |

**Missing dependencies with no fallback:**
- Stripe account must be created and configured (test mode for development, live mode for launch)

**Missing dependencies with fallback:**
- Resend account: Use console logging for magic link tokens during development
- Vercel account: Local development works without it; deploy when ready

## Sources

### Primary (HIGH confidence)
- orb-backend `streaming.py` source code -- SSE event format, named events, progressive delivery
- orb-backend `server.py` source code -- Endpoint signatures, CORS config
- [Stripe Checkout + Webhooks Next.js 15 Guide](https://www.pedroalonso.net/blog/stripe-nextjs-complete-guide-2025/) -- 2025 patterns
- [Motion (formerly Framer Motion) official docs](https://motion.dev/) -- Card flip animation patterns
- [Next.js SSE + WebSocket streaming guide](https://hackernoon.com/streaming-in-nextjs-15-websockets-vs-server-sent-events) -- useSSE hook pattern

### Secondary (MEDIUM confidence)
- [Nebula app analysis (ScreensDesign)](https://screensdesign.com/showcase/nebula-horoscope-astrology) -- Paywall placement, onboarding flow, revenue metrics ($450-700K/mo)
- [Adapty paywall analysis: Co-Star](https://adapty.io/paywall-library/co-star-personalized-astrology/) -- Co-Star monetization model
- [The Pattern app analysis (ScreensDesign)](https://screensdesign.com/showcase/the-pattern) -- Feature gating strategy, pricing
- [Framer Motion to Motion migration guide](https://motion.dev/docs/react-upgrade-guide) -- Package rename, import change
- [Auth.js v5 Resend magic link guide](https://authjs.dev/guides/configuring-resend) -- Email provider setup

### Tertiary (LOW confidence)
- Freemium conversion rate benchmarks (2-5% industry, 5-8% top apps) -- Multiple web sources, general industry data
- ElevenLabs cost projections -- Not verified against current pricing, needs validation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries are locked decisions from CLAUDE.md, versions verified against npm registry
- Architecture: HIGH -- SSE event format verified from actual backend source code, Next.js patterns from official guides
- Monetization strategy: MEDIUM -- Based on competitive analysis of 5 apps, conversion benchmarks from multiple sources, but no direct A/B test data
- Pitfalls: HIGH -- Known issues verified from GitHub issues, official docs, and production experience reports

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (30 days -- stable domain, no fast-moving dependencies)
