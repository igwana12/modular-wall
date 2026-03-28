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
