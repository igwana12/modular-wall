# Discord Server Blueprint — The Orb

## Server Name

**The Orb -- Sacred Circuits**

Tagline: "Where mythology meets technology. Voice AI oracle readings, open-source hardware, and a community of builders."

---

## Categories and Channels

### WELCOME
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #welcome | Text (read-only) | Everyone read, Staff write | Server rules, project overview, role self-assignment via reaction roles |
| #introductions | Text | Everyone | New members introduce themselves, what drew them to the project |

### ANNOUNCEMENTS
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #news | Text (read-only) | Everyone read, @Founder write | Major milestones, Kickstarter updates, product launches |
| #build-log | Text (read-only) | Everyone read, @Founder write | Weekly progress updates, photos, videos of hardware builds |

### COMMUNITY
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #general | Text | Everyone | General conversation, off-topic, introductions overflow |
| #oracle-readings | Text | Everyone | Share oracle reading screenshots, discuss deity responses |
| #mythology | Text | Everyone | Greek deity lore, mythology discussions, favorite gods |

### BUILDERS
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #firmware-dev | Text | Everyone | Open-source firmware discussion, ESP32 questions, code review |
| #hardware-mods | Text | Everyone | Enclosure remixes, LED mods, alternative builds, 3D prints |
| #bug-reports | Text | Everyone | Bug reports for firmware, web app, and oracle readings |

### KICKSTARTER
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #campaign-discussion | Text | Everyone | Campaign progress, stretch goals, backer conversations |
| #shipping-updates | Text (read-only) | Everyone read, @Founder write | Manufacturing and shipping timeline updates |
| #feature-requests | Text | Everyone | Vote on features, suggest stretch goals, community wishlisting |

### VOICE
| Channel | Type | Permissions | Purpose |
|---------|------|-------------|---------|
| #oracle-lounge | Voice | Everyone | Live deity voice demos, Q&A sessions, community hangouts |

---

## Roles

| Role | Color | Purpose | Assignment |
|------|-------|---------|------------|
| @Founder | Gold (#FFD700) | Project creator | Manual (you) |
| @Early Supporter | Purple (#9B59B6) | $1 deposit holders from oracleball.ai | Automatic via deposit verification |
| @Backer | Green (#2ECC71) | Kickstarter backers | Manual after campaign, or BackerKit integration |
| @Builder | Blue (#3498DB) | GitHub contributors with merged PRs | Manual, verified via GitHub username |
| @Deity | Teal (#1ABC9C) | Fun role for highly active community members | Manual reward for engagement |

### Role Hierarchy (top to bottom)
1. @Founder
2. @Builder
3. @Backer
4. @Early Supporter
5. @Deity
6. @everyone

---

## Bot Setup

### MEE6 or Carl-bot (pick one)
- **Welcome message:** Auto-DM on join with server overview and channel guide
- **Reaction roles:** In #welcome, react to pick interests:
  - Oracle Cards interest
  - Spirit Sphere interest
  - Firmware/open-source contributor
  - Just here for mythology
- **Auto-moderation:** Spam filter, link filtering for new accounts (<7 days)
- **Logging:** Message deletes, member joins/leaves, role changes

### No custom bot needed for v1. Evaluate after 500+ members.

---

## Pre-Launch Seeding Strategy

### Phase 1: Core Community (Weeks 12-10)
- Invite all existing oracleball.ai $1 deposit holders via email (Kit sequence triggers)
- Personal invite to Sacred Circuits existing community members
- Target: 50-100 founding members

### Phase 2: Maker Community (Weeks 10-8)
- Post in r/esp32: "Open-sourcing our ESP32-S3 voice AI oracle firmware"
- Post in r/DIYelectronics: "Building a POV LED sphere with voice AI"
- Post in r/arduino: "ESP32-S3 project: voice-controlled Greek oracle"
- Cross-post GitHub repo announcement
- Target: 200-300 members

### Phase 3: Content-Driven Growth (Weeks 8-4)
- Share build-in-public content (from build-in-public-plan.md) with Discord invite link
- YouTube/TikTok video descriptions always include Discord link
- Hacker News "Show HN" post includes Discord
- Target: 500-800 members

### Phase 4: Campaign Launch (Weeks 4-0)
- Kickstarter pre-launch page links to Discord
- Launch day announcement drives final wave
- Target: 1,000+ members at launch

---

## Moderation Guidelines

- Keep #announcements and #build-log strictly read-only (staff posts only)
- Encourage #oracle-readings sharing -- this is the community's heartbeat
- #firmware-dev should feel welcoming to beginners (ESP32 newcomers)
- No gate-keeping on hardware knowledge level
- Feature requests go to #feature-requests, not #general
- Weekly "deity of the week" discussion prompt in #mythology

---

## Metrics to Track

| Metric | Target (pre-launch) | Target (launch day) |
|--------|---------------------|---------------------|
| Total members | 500+ | 1,000+ |
| Daily active users | 50+ | 200+ |
| #oracle-readings posts/week | 20+ | 50+ |
| #firmware-dev threads/week | 5+ | 10+ |

---

*Created: 2026-03-31*
*Requirement: KS-06 (Community & Pre-Launch Strategy)*
