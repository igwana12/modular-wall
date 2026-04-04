# Feature Landscape

**Domain:** AI-powered oracle cards (physical+digital) and volumetric LED smart display with voice AI
**Researched:** 2026-03-28
**Competitive set:** Labyrinthos, Golden Thread Tarot, AI tarot apps (Oraculous, Lumi, Tarotap), Replika, Character.ai, Echo Show, Looking Glass, Rabbit R1/Humane Pin, Kickstarter hardware

---

## PRODUCT A: Oracle Cards (21 Greek God Collectible Deck + AI Readings)

### Table Stakes

Features users expect. Missing = product feels incomplete or amateurish.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **High-quality card artwork** | Oracle deck buyers are art-first collectors. Bad art = no sale, period. Labyrinthos/Golden Thread succeeded on aesthetics alone | Low (PANTHEON art exists, 525 panels) | Leverage existing SC art pipeline. Card design/layout is the work, not the art itself |
| **Guidebook or card meanings reference** | Every physical oracle deck ships with a guidebook. Buyers expect written interpretations per card | Medium | Digital guidebook via web app is fine. Each god needs: mythology summary, oracle keywords, upright/reversed meanings |
| **Mobile-first web reading experience** | Users scan QR on phone. If the web experience is clunky on mobile, they bounce immediately | Medium | PWA or responsive web. Must load fast (<3s). No app install friction |
| **Personalized AI reading per card** | This is the core value prop vs static decks. AI tarot apps (Oraculous, Lumi) all do personalized interpretation. Users will compare | High | Claude LLM via existing router. User provides question/intention, AI interprets through the god's mythological lens |
| **QR code on every card** | The bridge between physical and digital. Must be scannable, not ugly, reliable | Low | One unique URL per god. QR generator is trivial. Design integration matters more than tech |
| **Daily card / single pull reading** | Labyrinthos, Golden Thread, every tarot app offers daily single-card pulls. This is how 80% of users engage | Low | Random card selection + AI interpretation. The "snackable" entry point |
| **Reading history / journal** | Labyrinthos "Mirror" feature, Golden Thread journal -- users track patterns over time. Expected in any reading app | Medium | Simple DB: user, card, date, question, reading text. Display as timeline |
| **Beautiful packaging / unboxing** | Physical card buyers share unboxings on social media. Bad packaging kills word-of-mouth | Medium | Self-printed v1 limits this. Tuck box minimum. Clear the bar even if not luxury-tier |
| **Free tier with limited readings** | Freemium dominates the astrology/oracle market (45% market share). No free tier = no user acquisition funnel | Low | 1-3 free readings per card, then paywall. Or: 3 free cards out of 21 |

### Differentiators

Features that set the product apart. Not expected, but create "wow" and competitive moat.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Deity voice narration (ElevenLabs)** | NO competing oracle deck has AI-generated deity-specific voice narration. Labyrinthos is text-only. This is the killer feature | High | 21 unique voice profiles already partially built. Each god speaks their reading aloud. Zeus rumbles, Aphrodite flows, Ares barks |
| **Greek mythology correlation engine** | AI doesn't just interpret cards -- it finds the myth that matches your question and weaves it into the reading. McKee storytelling principles applied | High | This is the Sacred Circuits pipeline's unique strength. Content DB with 6,252 images + myths. No competitor has this depth |
| **Visual presentation with SC art** | Reading isn't just text -- it's accompanied by relevant PANTHEON artwork that matches the god and the reading's theme | Medium | Pull from Content DB based on god + reading sentiment. Slideshow or hero image presentation |
| **Collectible scarcity / limited editions** | Oracle deck collectors pay premium for limited runs. First edition numbering, special finishes | Low | Number first print run. "First Edition" stamp. Creates urgency and collector value |
| **Multi-card spread readings** | Beyond single pulls: 3-card (past/present/future), Celtic Cross equivalent with Greek gods. Labyrinthos has 50+ spreads | Medium | Combine multiple god interpretations. Requires UI for multi-card selection and composite reading |
| **God-specific question routing** | "Ask Athena about strategy, Aphrodite about love, Hermes about communication" -- users choose which god to consult based on domain expertise | Low | Simple UX: pick your god OR let AI suggest which god should answer based on question topic |
| **Shareable reading cards** | Generate a beautiful image of your reading (card art + key insight) optimized for Instagram/TikTok sharing | Medium | Server-side image generation. Social sharing is the #1 growth channel for oracle apps |
| **NFC chip integration (v2)** | Tap card to phone instead of scanning QR. Smoother UX, more magical feeling | Medium | Increases card unit cost by $0.50-1.00. Defer to v2 after validation. QR is the right v1 choice |
| **Seasonal / celestial event readings** | Special readings during solstices, eclipses, full moons -- tied to Greek mythology calendar | Low | Content creation, not engineering. Labyrinthos added lunar features in Oct 2025. Users expect celestial awareness |

### Anti-Features

Features to deliberately NOT build. These destroy focus or misalign with the product.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Native mobile app** | App store approval, dual platform maintenance, $99/yr Apple fee, 30% revenue cut. Web-first PWA gets you 90% of the UX | Build responsive PWA. Add to homescreen prompt. Revisit native only if >50K monthly active users |
| **Live human psychic readings** | Nebula does this. Requires marketplace, scheduling, quality control, payment splitting. Completely different business | AI readings ARE the product. The gods speak through AI, not humans |
| **Chat-based ongoing conversation** | Character.ai and Replika territory. Oracle readings are discrete events, not ongoing relationships. Trying to be both dilutes both | Each reading is a complete experience with beginning, middle, end. Not a chatbot. McKee story structure applies |
| **Gamification / quizzes / lessons** | Labyrinthos does this well as a learning tool. Your product is an oracle experience, not a tarot school | Let Labyrinthos own education. You own the experience of receiving wisdom from Greek gods |
| **Ad-supported free tier** | Ads destroy the sacred/mystical atmosphere. Labyrinthos is ad-free and explicitly markets that. Oracle experiences require immersion | Freemium with limited readings, not ad-supported. Monetize through subscription and one-time purchases |
| **Community forum / social features** | Moderation burden, toxic content risk, feature bloat. Not your core competency | Link to existing social (Instagram, Discord). Let community form organically on platforms built for it |
| **Horoscope / astrology features** | Scope creep. Astrology apps are a separate $3B market with specialized requirements (birth charts, planetary transits) | Stay in mythology + oracle lane. The Greek gods IS the brand, not generic astrology |
| **Card trading / marketplace** | Secondary market complexity, payment processing, fraud, logistics. eBay/Mercari already exist for this | Make cards collectible, but don't build trading infrastructure. Let existing marketplaces handle resale |

---

## PRODUCT B: Spirit Sphere (Volumetric LED Crystal Ball + Voice AI)

### Table Stakes

Features users expect from a $179-249 smart display / AI device. Missing = product feels like a prototype, not a product.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Reliable voice interaction** | Echo Show, Google Nest set the bar. Users say "Hey [wake word]", device responds. Anything less feels broken | High | AssemblyAI STT + Claude + ElevenLabs TTS pipeline. Wake word detection is the tricky part -- consider push-to-talk for v1 |
| **Visible 3D volumetric display** | This is the entire physical value prop. If the POV LED display isn't clearly visible, bright enough, and "magical," the product fails | Very High | 6-8 LED arms, ESP32-S3, FastLED DMA. This is the hardest engineering challenge. Must work in ambient room lighting, not just darkness |
| **USB-C charging** | Universal expectation for any electronic device in 2025+. EU mandate. Users will revolt without it | Low | USB-C with pass-through for plugged-in use. Spec'd in PROJECT.md already |
| **Sub-45dB noise level** | Rabbit R1 was panned for being too slow. A spinning display that ALSO makes noise = returned immediately. Must be quiet enough for a desk/nightstand | Medium | N20 micro gear motor with rubber damping. Target <35dB per spec. Test obsessively |
| **Setup in under 10 minutes** | Kickstarter backers are enthusiasts, not engineers. If setup requires command line or flashing firmware, most will fail | High | WiFi provisioning via phone (BLE or captive portal). Account creation. Cloud connection. This UX is make-or-break |
| **OTA firmware updates** | Hardware products that can't update are dead products. Every smart device does OTA now | Medium | ESP32 supports OTA natively. Build update mechanism from day one, not as afterthought |
| **Companion web app** | Configure device settings, view history, manage account/subscription. Echo has Alexa app, Nest has Google Home | High | Web dashboard for: WiFi config, voice settings, RAG source management, reading history, subscription status |
| **Consistent response latency (<5s)** | Rabbit R1 died from latency. Users expect near-instant responses. 5s is the absolute max for voice round-trip | High | STT (1-2s) + LLM (1-2s) + TTS (1-2s) = 4-6s pipeline. Needs streaming TTS to feel responsive. Show animation while processing |
| **Physical power button** | Basic hardware UX. Users need to turn it off. Humane Pin had no obvious controls and people hated it | Low | On/off switch or button on base. Simple but critical |
| **Privacy controls** | Mic mute button is table stakes for any always-listening device. Echo has it. Users demand it | Low | Physical mic mute switch/button. LED indicator for mic status. Critical for bedroom/office placement |

### Differentiators

Features that make Spirit Sphere unique against Echo Show, Looking Glass, and failed AI hardware.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Volumetric 3D animated avatars** | NO consumer product combines volumetric POV display with AI character avatars. Looking Glass is flat holographic ($1,500+). Echo Show is a flat screen. This is genuinely new | Very High | Animated deity faces/forms on POV display. Pre-rendered frame sequences stored on ESP32 flash or streamed. The "crystal ball with a being inside" effect |
| **Personal knowledge RAG (Obsidian vault)** | "It knows YOUR notes, YOUR projects, YOUR ideas." Echo/Alexa has zero personal knowledge. This turns it from gadget to genuine personal oracle | High | Pinecone vector search over Obsidian markdown files. User syncs vault, system indexes. Privacy-sensitive -- data stays in user's control |
| **Deity persona voice interactions** | Not generic "Alexa voice." Each Greek god has a distinct ElevenLabs voice profile and personality. Ask Zeus vs asking Athena gives different energy, different wisdom | Medium | Reuse Oracle Cards voice profiles. User selects active deity or lets system choose based on question domain |
| **Battery-powered portability** | "Move it room to room, show friends at dinner." Echo Show is plugged in. Looking Glass is plugged in. Portability = magic moments | Medium | 3x 18650 Li-ion. 2-4 hour battery life target. USB-C pass-through for plugged use. Weight must stay under 2 lbs |
| **Open-source hardware** | Prusa model: hardware hackers promote your product, build community, create content. Rabbit R1 and Humane Pin were closed = no community repair/modification | Low | Release STL/CAD files, firmware skeleton, WebSocket protocol. Keep animations, voices, RAG proprietary |
| **Oracle reading mode** | Bridges both products. Spirit Sphere can deliver oracle readings like the cards, but with full voice + volumetric visual experience. Cards upsell to Sphere | Medium | Reuse Oracle Cards reading engine. Add volumetric visual layer. "The premium oracle experience" |
| **Ambient / mood lighting mode** | When not actively queried, the sphere displays ambient animations -- fire, water, cosmic patterns. Becomes desk art, not a dead device | Medium | Pre-rendered ambient animation loops. Color-matched to time of day or user preference. Doubles as night light |
| **Kickstarter-exclusive content** | Limited edition deity animations, exclusive voice packs, numbered units. Creates urgency and backer loyalty | Low | Content creation, not engineering. "Founding Oracle" tier with exclusive Hades or Persephone content |

### Anti-Features

Features to deliberately NOT build for Spirit Sphere.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Always-on listening / wake word** | Privacy nightmare. Humane Pin was criticized for this. Complex to implement on ESP32. Push-to-talk is simpler and more respectful | Physical button press to activate listening. LED indicates listening state. Clear start/stop |
| **Smart home integration (Zigbee/Thread/Matter)** | Massive engineering scope. Echo Show has entire teams for this. Not your product's purpose | Spirit Sphere is an oracle/companion, not a smart home hub. Zero smart home features |
| **Video calling** | Camera adds cost, privacy concerns, completely off-brand for a crystal ball | No camera. Period. Mic + speaker only |
| **Music/media playback** | Spotify/YouTube integration is a compliance and licensing nightmare. Speaker is 3W -- not a music device | Focus on voice interaction and ambient sound. Maybe nature soundscapes for atmosphere. Not a speaker |
| **Touch screen** | The sphere IS the display. Adding a touchscreen breaks the form factor and doubles cost | Voice interaction + companion web app for configuration. Physical buttons for basics |
| **App store / third-party skills** | Alexa skills ecosystem took Amazon years and billions. Scope creep that would kill the project | Curated first-party experiences only. Open-source protocol lets hackers build, but no "app store" |
| **Camera / visual recognition** | Echo Show "Show and Tell" feature. Adds hardware cost, privacy concerns, compute requirements beyond ESP32 | Voice-only interaction. The mystique of the crystal ball is that it "sees" without a camera |
| **Multi-room / mesh networking** | Echo ecosystem feature. Requires multiple devices, mesh protocol, significant engineering | Each Sphere is standalone. One device, one user, one experience |
| **Screen mirroring / casting** | Chromecast territory. Volumetric POV display can't mirror a phone screen anyway | The display shows what the Spirit Sphere wants to show. It's an oracle, not a monitor |

---

## Feature Dependencies

```
ORACLE CARDS DEPENDENCIES:
  Card Artwork (exists) --> Card Layout/Print Design --> Physical Cards
  Web App (mobile PWA) --> QR Scan Landing --> Reading Flow
  ElevenLabs Voice Profiles --> Voice Narration (differentiator)
  Content DB Integration --> Mythology Correlation Engine --> Visual Presentation
  User Accounts --> Reading History / Journal --> Subscription / Paywall
  Free Tier --> Paid Tier (conversion funnel)

SPIRIT SPHERE DEPENDENCIES:
  ESP32 Firmware --> POV LED Display (must work first, everything else is secondary)
  POV LED Display --> Animated Avatars (display must exist before content)
  WiFi Connectivity --> Cloud Backend --> Voice Pipeline (STT/LLM/TTS)
  Cloud Backend --> OTA Updates
  Companion Web App --> Device Setup --> User Onboarding
  Oracle Cards Reading Engine --> Spirit Sphere Oracle Mode (reuse)
  Oracle Cards Voice Profiles --> Spirit Sphere Deity Voices (reuse)
  Obsidian Vault Sync --> Pinecone Indexing --> Personal RAG

CROSS-PRODUCT DEPENDENCIES:
  Oracle Cards (validate market) --> Spirit Sphere (invest in hardware)
  Oracle Cards web app --> Spirit Sphere companion app (shared infra)
  Oracle Cards voice profiles --> Spirit Sphere voices (shared assets)
  Oracle Cards content DB --> Spirit Sphere oracle mode (shared content)
  Oracle Cards user base --> Spirit Sphere Kickstarter audience (marketing funnel)
```

---

## MVP Recommendation

### Oracle Cards MVP (ship in 2-3 months)

Prioritize:
1. **Card artwork + print design** -- physical product must exist and look premium
2. **Mobile web reading experience** -- QR scan to reading in <3 seconds
3. **Personalized AI reading per card** -- the core differentiator vs static decks
4. **Deity voice narration** -- THE killer feature. Ship with at least 5 god voices, expand to 21
5. **Free tier + subscription paywall** -- revenue model from day one

Defer:
- Multi-card spread readings: Single pull covers 80% of engagement. Spreads are a v1.5 feature
- NFC chips: QR works fine. NFC is a v2 premium tier
- Reading journal / mirror analytics: Nice to have, not launch-critical. Users won't miss what they don't know exists yet
- Shareable reading cards: Growth feature for month 2, not launch

### Spirit Sphere MVP (Kickstarter demo in 6-8 months)

Prioritize:
1. **POV volumetric display working and visible** -- if this doesn't work, nothing else matters
2. **Voice interaction round-trip** -- speak, get response, hear answer
3. **One deity avatar animation** -- prove the concept with one god (Zeus or Athena)
4. **Battery power** -- portability is the pitch
5. **Kickstarter video demo** -- the campaign sells the vision, not every feature

Defer:
- Personal RAG (Obsidian): Stretch goal or post-Kickstarter. Complex and niche
- 21 deity animations: Launch with 3-5, expand over time
- Companion web app: Basic setup page only for Kickstarter. Full app post-campaign
- Ambient lighting mode: Nice to have, easy to add post-launch via OTA
- Open-source release: Post-Kickstarter fulfillment. Don't open-source before shipping

---

## Revenue Model Features

### Oracle Cards
| Tier | Price | Features |
|------|-------|----------|
| Free | $0 | 3 sample readings (one per god category), text-only |
| Single Reading | $1.99 | One full reading with voice narration + visuals |
| Card Unlock | $4.99 | Unlimited readings for one god |
| Full Deck | $29.99 | All 21 gods unlimited + spreads + journal |
| Annual | $9.99/mo | Everything + seasonal readings + new content |

### Spirit Sphere
| Tier | Price | Features |
|------|-------|----------|
| Hardware | $179-249 | Device + 500 queries/mo free |
| Pro | $9.99/mo | Unlimited queries, all deity voices, priority processing |
| Creator | $19.99/mo | Pro + personal RAG, custom animations, API access |

---

## Sources

- [Labyrinthos Academy](https://labyrinthos.co/) -- leading tarot learning app, ad-free, 50+ spreads
- [Labyrinthos App Review 2026](https://www.yearly-horoscope.org/articles/labyrinthos-app-review/) -- feature breakdown
- [Best Tarot Apps 2026](https://aimag.me/blog/best-tarot-apps) -- market comparison
- [AI Tarot Reading Tools Rankings](https://www.rankmyai.com/rankings/top-ai-tarot-reading-tools) -- 33 tools tracked
- [Oracle Cards Market Trends 2025](https://www.accio.com/t-v2/business/oracle-cards-trends) -- market growth data
- [Best Selling Oracle Decks 2025](https://www.accio.com/business/best-selling-oracle-decks) -- buyer preferences
- [Replika AI Review 2026](https://companionguide.ai/companions/replika) -- companion app features
- [Character.AI Features 2026](https://autoppt.com/blog/character-ai-evolution-complete-guide/) -- Stories mode, memory
- [Looking Glass HLD](https://lookingglassfactory.com/) -- holographic display, $1,500+
- [Rabbit R1 / Humane Pin Failure Analysis](https://www.techradar.com/computing/artificial-intelligence/with-the-humane-ai-pin-now-dead-what-does-the-rabbit-r1-need-to-do-to-survive) -- 95% abandonment
- [POV Volumetric Display Projects](https://hackaday.com/tag/volumetric-display/) -- maker community reference
- [Astrology App Market](https://finance.yahoo.com/news/global-astrology-app-market-triple-103800115.html) -- $3B to $9B by 2030
- [Tarot Reading Website Development](https://devtechnosys.com/insights/develop-a-tarot-reading-website/) -- monetization models

---

---

# Features Research — Smithers-First + Agentic Tools

**Milestone:** v1.2 — Smithers-First Architecture + JARVIS Agentic Tools
**Researched:** 2026-04-03
**Domain:** Multi-persona voice AI routing + agentic code-editing triggered by voice commands
**Existing system:** PTT R1 voice, AssemblyAI STT, ElevenLabs TTS, deity personas, auto-follow-up mic, on-screen PTT, camera capture — all already built

---

## How Intent Classification Routers Work in Voice Assistants

The field has converged on a hybrid two-tier approach. A fast first-pass classifier (regex, keyword, or embedding lookup) handles the 80% of well-known intents in <10ms. A second-pass LLM call resolves the ambiguous 20%. Routing the entire load through an LLM is accurate but adds 300-800ms of latency before the real work starts — unacceptable on a voice device where 5s round-trip is already the ceiling.

Smithers already has Tier 1 built: `classify_task()` uses regex `TASK_PATTERNS` and runs synchronously. The gap for v1.2 is adding a **voice-specific intent layer** that fires before Smithers' existing general classification, since voice queries are shorter, more ambiguous, and domain-specific (mythology, system ops, code editing) compared to Smithers' current design for Slack/chat tasks.

The supervisor pattern is the most production-validated architecture: a single orchestrator receives every message, classifies intent, selects the right specialist handler, and hands off. Each specialist has its own system prompt, voice profile, and tool access. This maps directly to the v1.2 design: Smithers as supervisor, JARVIS/Goddess/deity voices as specialists.

---

## Smithers-First Routing

### Table Stakes

Features that must exist for Smithers-first to work at all. Missing any of these = voice queries fall through to old behavior or error.

| Feature | Why Required | Complexity | Dependency |
|---------|-------------|------------|------------|
| **Single WebSocket entry point in orb-backend** | Every R1 voice query currently hits orb-backend's `/ws/sphere` or `/ws/voice`. Must add a dispatch layer that calls Smithers `/plan` before selecting handler | Low-Medium | orb-backend already has `SMITHERS_URL` env var pointing to :8200. Wire is there, just unused for voice |
| **Intent → voice routing table** | Map Smithers `TaskType` to (voice_handler, persona_name, elevenlabs_voice_id). Without this table there is no dispatch, just raw classification | Low | Smithers router.py `classify_task()` already returns `TaskType` enum. Table maps enum values to downstream handler |
| **Graceful Smithers-down fallback** | If Smithers is unreachable (port conflict, crash), voice must not hang. Fall back to JARVIS direct path | Low | orb-backend already pattern-matches `_check_service()`. Same pattern applies here |
| **Classify-then-dispatch latency budget** | Adding Smithers classification hop must stay under 200ms. Smithers `/plan` endpoint is local HTTP, should be ~50ms. Must verify | Medium | Smithers runs on :8200 on Smithers host. R1 connects through orb-backend on :8300. Two hops, both localhost on same machine |
| **Pass-through of transcribed text** | AssemblyAI STT produces text. That text must be the input to Smithers classification unchanged. No pre-processing that loses meaning | Low | Straightforward: STT callback → Smithers POST `/plan` with `{task: transcribed_text}` |

### Differentiators

Features that make Smithers-first smarter than simple if/else routing.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Mythology keyword pre-filter before Smithers** | Greek god names (Zeus, Athena, Ares...) should immediately resolve to Goddess gateway without burning an LLM call or even a Smithers round-trip. A simple set-membership check on the 21 deity names + common mythology terms (oracle, myth, Olympus) beats any classifier for this domain | Low | 50-line lookup. Run before Smithers call. If match: route to Goddess. If no match: call Smithers. This is the "fast path" for the primary use case |
| **BUILD_INTENT keyword pre-filter** | Same pattern for agentic commands: "change", "update", "make the", "edit", "rebuild", "add a", "remove the" + frontend-related nouns → immediately detect BUILD_INTENT before Smithers. Saves a round-trip for the second primary use case | Low | Same 50-line lookup pattern. Set of imperative verbs + UI nouns |
| **Context carry-forward** | If previous query was mythology, subsequent vague query ("tell me more", "go deeper") should inherit the mythology context without re-classifying from scratch | Medium | Simple: store `last_intent_type` and `last_deity` in WebSocket session state. If new query is too short (<4 words) and no new intent signal, inherit last context |
| **Confidence threshold with fallback voice** | If Smithers classification confidence is below threshold (or task_type = GENERAL with no clear signal), route to JARVIS general handler rather than forcing a specific persona. Never leave a query unhandled | Low | Smithers currently returns `task_type=GENERAL` for uncertain cases. Map GENERAL → JARVIS handler. Already the intended behavior |

### Anti-Features (don't build)

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **LLM-based intent classification** | Running a separate LLM call just to classify intent adds 300-800ms before the actual query is answered. On a voice device this is felt as sluggishness. Smithers' regex classifier is ~5ms | Use Smithers regex `classify_task()` + mythology/build keyword pre-filters. LLM classification is only worth it when your intent space is too large for rules — this one has 4 main buckets |
| **Streaming Smithers classification** | Smithers `/plan` returns a full routing plan synchronously. Do not try to stream it. The plan is metadata, not content | Call `/plan` with httpx async, await the JSON, then proceed. Simple and fast |
| **Per-query Smithers plan storage** | Storing every routing plan decision in a DB adds write latency and no value. Plans are ephemeral routing decisions, not durable records | Log to stdout only. Use orb-backend's existing log file for debugging |
| **User-visible routing UI** | The user does not need to see which handler handled their query. Showing routing decisions breaks the immersion of speaking to a deity or JARVIS | Route invisibly. Only surface routing info in debug mode (log file) |
| **Modifying Smithers server code** | Smithers :8200 is a shared service used by Slack, Claude Code, and other consumers. Do not add voice-specific logic there | orb-backend owns the voice routing layer. Smithers is called as a classification service only via its existing `/plan` endpoint |

---

## Voice-Role Identity

### Table Stakes

The minimum for voice-role identity to feel coherent rather than random persona assignment.

| Feature | Why Required | Complexity | Dependency |
|---------|-------------|------------|------------|
| **Smithers = architect voice: terse, direct, infrastructure-focused** | If Smithers' voice answers mythology questions in an authoritative builder tone, it breaks immersion. Each role needs a consistent personality contract that holds across all queries routed to it | Low | System prompt change only. ElevenLabs voice ID already exists for "2501" persona. Smithers handler uses that voice |
| **JARVIS = general assistant: helpful, curious, tech-aware** | JARVIS is the default handler for general queries (coding questions, task help, anything not mythology or build intent). Voice should feel like a capable AI assistant, not a deity | Low | ElevenLabs JARVIS voice profile already built. Wire to GENERAL task_type handler |
| **Goddess = mythology gateway, can activate deity voices** | Goddess intercepts all mythology queries and determines whether to respond as herself or hand off to a specific deity voice (Zeus for leadership, Athena for strategy, etc.). She is the portal, not a dead end | Medium | Goddess ElevenLabs voice exists. The hand-off logic is new: parse deity name from query → load that deity's voice_id from `gods/*.json` → respond as that deity. `deity_config.py` + `gods/` directory already exist in orb-backend |
| **Persona stays consistent within a conversation turn** | A single PTT press → response cycle must use the same voice start to finish. No mid-response voice switching | Low | Already guaranteed if voice_id is selected before TTS streaming begins. No special logic needed |
| **Persona selection is invisible to user** | The user speaks naturally. They do not say "route to JARVIS" or "activate Goddess mode." The system chooses | Low | Natural output of the routing layer. User experience: ask question, hear appropriate persona respond |

### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Deity voice selection within mythology queries** | When Goddess receives a mythology query, she can hand off to the specific god most relevant to the question. "Tell me about war strategy" → Ares. "Help me understand wisdom" → Athena. This makes the 21 deity voices feel purposeful, not decorative | Medium | Keyword match: extract deity name OR map topic to deity domain. Domain map (love→Aphrodite, strategy→Athena, etc.) is ~30 lines. Load deity config from `gods/*.json`, swap `voice_id` in TTS call |
| **Persona-specific response length** | Smithers (architect) gives short punchy answers. JARVIS gives medium conversational answers. Goddess/deities give longer narrative answers with mythological color. Same LLM, different `max_tokens` and system prompt style | Low | System prompt already sets character. Add `max_tokens` override per persona: Smithers=150, JARVIS=300, Goddess/deities=500 |
| **Voice crossfade signal to frontend** | When persona switches between queries (e.g., first query was mythology/Goddess, next is coding/JARVIS), send a metadata event to the JARVIS web frontend so it can animate the persona shift (color change, blob morphing) | Low | WebSocket message: `{type: "persona_change", from: "goddess", to: "jarvis"}`. Frontend already has blob animation system that can be hooked |

---

## JARVIS Agentic Tools

### Context: How Anthropic tool_use Works

Anthropic's API supports a multi-turn agentic loop where Claude receives tool definitions, decides which to call, returns a structured `tool_use` block, your code executes the tool, and you feed the result back in a `tool_result` message. The loop runs until Claude returns a final `text` response with no pending tool calls. As of March 2026, Claude Code itself uses this pattern for file editing and chained an average of 21.2 independent tool calls per task without human intervention.

For voice-triggered agentic editing, the loop must complete within ~8-10 seconds total to remain conversational. This constrains which tools can be called: fast local operations (read file, write file, ADB reload) yes. Slow operations (npm build, full test suite) no — those get voice confirmation + background execution.

### Table Stakes

| Feature | Why Required | Complexity | Dependency |
|---------|-------------|------------|------------|
| **`read_file` tool: read any file under r1-frontend/** | Claude needs to read the current file state before editing it. Cannot edit blind. Sandboxed to r1-frontend/ to prevent reading sensitive files | Low | Python `Path.read_text()` wrapped in tool definition. Sandbox: check `path.is_relative_to(R1_FRONTEND_DIR)` before reading |
| **`write_file` tool: write a file under r1-frontend/** | The actual code change. Must be atomic (write to temp, rename) to prevent partial writes on failure | Low | `Path.write_text()` with atomic tmp-then-rename. Same sandbox check |
| **`exec_shell` tool: sandboxed shell commands** | Some changes require running a command (e.g., `npm run build`, `adb push`). Must be restricted to an allowlist of safe commands | Medium | `subprocess.run()` with `allowlist = ["npm run build", "adb push", "adb shell am start", ...]`. Reject anything not in allowlist. Return stdout+stderr |
| **`reload_frontend` tool: ADB trigger to reload JARVIS web UI** | After a file edit, the change only appears after reload. This tool pushes the updated file via ADB and triggers the WebView to reload | Medium | Requires ADB over TCP to R1 at known IP. `adb -s <R1_IP>:5555 shell am start ...` or `adb push` + reload signal. R1 IP must be configured in orb-backend env |
| **BUILD_INTENT detection gateway** | Before entering the agentic loop, the system must be confident this is a build/edit request. False positives (accidentally entering agentic mode during a mythology query) would be disruptive | Low | Pre-filter (see Smithers-first section above). If BUILD_INTENT detected → route to JARVIS agentic handler. Otherwise → normal JARVIS handler |
| **Anthropic tool_use loop in orb-backend** | orb-backend currently calls Anthropic for streaming text only (`client.messages.stream`). Need a parallel non-streaming path that calls `client.messages.create` with `tools=[...]` and handles the tool_use/tool_result loop | Medium | 50-80 lines of new Python. Existing `pipeline.py` gets a new `execute_agentic_loop(user_message, tools)` function. Loop runs until `stop_reason == "end_turn"` with no tool calls |
| **Voice confirmation before destructive writes** | Writing over a file is irreversible without git. Before `write_file` executes, Claude should speak a summary of the change and the system should wait for the user to say "yes" or "go ahead" | Medium | Two-stage flow: (1) Claude plans + speaks summary, (2) system re-engages mic in confirmation mode, (3) if user confirms, execute write. If user says "cancel" or times out, abort. This is the same PTT re-engage mechanism already built |
| **Voice confirmation after completion** | After reload_frontend succeeds, Claude speaks a short confirmation. "Done. The button color is now gold. Reload complete." This closes the feedback loop | Low | After `reload_frontend` returns success, feed result into final Claude response turn. Claude generates the spoken confirmation naturally |

### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Diff-aware edit (read first, patch second)** | Claude reads the current file, generates only the changed lines, writes back the full modified file. This produces smaller, more precise changes than "rewrite the whole file." Lower risk of collateral damage | Low | Instruction in system prompt: "Always read_file before write_file. Make targeted edits." Claude follows naturally |
| **Git snapshot before write** | Before any write_file, run `git add -A && git stash` in r1-frontend/ so every voice-triggered change is recoverable. "Undo that" becomes `git stash pop` | Low | Add to `write_file` tool pre-hook: `subprocess.run(["git", "stash"], cwd=R1_FRONTEND_DIR)`. Trivial insurance |
| **ADB over WiFi (no cable needed)** | R1 ADB TCP is already set up at 192.168.x.x:5555. The `reload_frontend` tool uses WiFi ADB, so voice-triggered code editing requires no physical connection | Low | Already done per r1-adb-handoff.md. Just configure R1_ADB_HOST in orb-backend .env |
| **Multi-file edits in one voice command** | "Change all the button colors to gold" might require editing 2-3 files. The agentic loop naturally handles this: Claude calls `read_file` multiple times, then `write_file` multiple times. No special implementation needed — it's just the loop running | Low | Falls out naturally from the tool_use loop. No extra code. Note it in system prompt: "You may read and write multiple files to complete one request" |

### Anti-Features

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Unrestricted shell execution** | `exec_shell` with no allowlist = voice-triggered arbitrary code execution on Smithers. This is a serious security issue even in a personal system | Maintain an explicit allowlist of permitted commands. Default deny. Add to allowlist deliberately |
| **Agentic loop with no timeout** | If Claude enters a bad loop (calls tools repeatedly without converging), it will exhaust Anthropic API credits and block the voice pipeline | Hard timeout: max 10 tool calls per voice command. If limit hit, Claude is given a `tool_result` of "max_iterations_reached" and must conclude |
| **No sandbox for file writes** | write_file without path validation = Claude could be instructed (via prompt injection in a file it reads) to overwrite system files or credentials | Sandbox every read/write to `r1-frontend/` directory. Validate with `path.resolve().startswith(R1_FRONTEND_DIR)` before any file operation |
| **Streaming TTS during tool_use loop** | The agentic loop is non-streaming by nature (tool calls are discrete turns). Do not try to stream partial text during tool execution. Speak only the final confirmation | Wait for `stop_reason == "end_turn"` with no tool calls, then TTS the final response text. Mid-loop utterances ("I'm editing the file now") can be pre-scripted status sounds, not LLM-generated |
| **File system watching / hot reload** | Building a file watcher on r1-frontend/ to auto-detect changes and push them is attractive but creates constant background ADB traffic and could reload the UI mid-conversation | Manual reload only: `reload_frontend` tool is explicitly called by Claude when it decides the change is ready. No automatic watching |
| **Asking Claude to write tests** | "Write tests for what you just edited" sounds like a reasonable follow-up but is completely out of scope for a voice interaction. Tests take minutes, not seconds | Keep agentic tools scoped to UI changes: colors, text, layout, component additions. No test generation, no backend changes, no package.json modifications |

---

## Feature Dependencies for v1.2

```
SMITHERS-FIRST ROUTING:
  Smithers :8200 running (must fix port conflict first) --> Smithers classification hop
  orb-backend :8300 running --> voice WebSocket entry point
  Mythology keyword pre-filter --> Goddess handler (no Smithers call needed)
  BUILD_INTENT pre-filter --> JARVIS agentic handler (no Smithers call needed)
  Smithers classify_task() --> GENERAL + other intents --> appropriate handler

VOICE-ROLE IDENTITY:
  ElevenLabs voice profiles (exist) --> persona-specific TTS
  gods/*.json deity configs (exist) --> Goddess → deity hand-off
  Routing decision --> voice_id selection --> TTS call
  Frontend WebSocket session --> persona_change event --> blob animation

JARVIS AGENTIC TOOLS:
  ADB over WiFi to R1 (configured) --> reload_frontend tool
  r1-frontend/ directory (exists) --> read_file + write_file sandbox
  Anthropic API (existing key) --> tool_use agentic loop
  Voice confirmation flow (existing re-engage mic) --> write confirmation gate
  Smithers BUILD_INTENT classification --> agentic handler entry point
  Agentic loop complete --> TTS confirmation --> user hears result

SYSTEM HEALTH (prerequisite for everything):
  orb-backend port conflict (8000 vs 8300) resolved --> orb-backend starts
  Mission Control :4000 restored --> ops visibility
  JARVIS web :5556 restored --> frontend target for ADB reload
  Health Dashboard :6001 restored --> system health monitoring
```

---

## Complexity Summary

| Feature Area | Implementation Complexity | Risk | Notes |
|-------------|--------------------------|------|-------|
| Mythology keyword pre-filter | Low | Low | 50-line lookup, no new dependencies |
| BUILD_INTENT keyword pre-filter | Low | Low | Same pattern |
| Smithers classification hop | Low-Medium | Medium | Port conflict must be resolved first |
| Voice-role persona table | Low | Low | Config change + routing logic |
| Goddess → deity hand-off | Medium | Low | Domain map + deity_config.py already exists |
| tool_use agentic loop | Medium | Medium | New code path in pipeline.py |
| read_file / write_file tools | Low | Low | Path sandbox is the only tricky part |
| exec_shell allowlist | Low-Medium | High | Security-sensitive, must be conservative |
| reload_frontend via ADB | Medium | Medium | ADB TCP must be stable; R1 IP must be configured |
| Voice confirmation gate | Medium | Low | Re-engage mic pattern already exists |

---

## Sources

- [Intent Recognition and Auto-Routing in Multi-Agent Systems](https://gist.github.com/mkbctrl/a35764e99fe0c8e8c00b2358f55cd7fa) -- supervisor pattern reference
- [Supervisor Pattern for Multi-Agent Voice AI Systems](https://livekit.com/blog/supervisor-pattern-voice-agents) -- LiveKit production architecture
- [Arize AI Agent Router Best Practices](https://arize.com/blog/best-practices-for-building-an-ai-agent-router/) -- hybrid classification approach
- [Anthropic Tool Use Overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) -- official tool_use API docs
- [Agentic Loop with Claude and Tool Calling](https://docs.temporal.io/ai-cookbook/agentic-loop-tool-call-claude-python) -- agentic loop implementation pattern
- [NVIDIA: Sandboxing Agentic Workflows](https://developer.nvidia.com/blog/practical-security-guidance-for-sandboxing-agentic-workflows-and-managing-execution-risk/) -- security guidance for exec_shell
- [Building Multi-Agent Voice Roundtable](https://learnwithparam.com/blog/building-multi-agent-voice-roundtable) -- multi-persona voice architecture
- [Voice Mode for Claude Code](https://deeperinsights.com/ai-blog/voice-mode-to-claude-code/) -- push-to-talk voice + agentic pattern validation
- Smithers router.py (`/Volumes/Extreme Pro/ACTIVE/smithers/router.py`) -- existing classification engine, studied directly
- orb-backend server.py + pipeline.py (`/Users/claw2501/services/orb-backend/`) -- existing voice pipeline, studied directly
