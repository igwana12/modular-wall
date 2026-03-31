# Contributing to The Orb

Thank you for your interest in contributing to The Orb! This document explains how to get involved, what we're looking for, and how to submit your work.

---

## How to Report Bugs

1. Check [existing issues](https://github.com/sacred-circuits/orb-firmware/issues) to avoid duplicates
2. Open a new issue using the **Bug Report** template
3. Include:
   - Which product (Oracle Engine / POV Globe / Spirit Sphere)
   - Your hardware setup (ESP32-S3 variant, peripherals)
   - Arduino IDE version and ESP32 Core version
   - Steps to reproduce
   - Serial monitor output (if applicable)
   - Expected vs actual behavior

---

## How to Submit a Pull Request

1. **Fork** the repository
2. **Create a branch** from `develop`:
   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the code style below
4. **Test on hardware** (flash and verify behavior)
5. **Commit** with a descriptive message:
   ```bash
   git commit -m "feat(pov-globe): add rainbow spiral animation pattern"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Open a pull request** against the `develop` branch (not `main`)
8. Fill out the PR template: what changed, why, how to test

### PR Review Process

- A maintainer will review within 1 week
- We may request changes or ask questions
- Once approved, a maintainer will merge to `develop`
- Releases to `main` happen on a scheduled basis with version tags

---

## Code Style

### Arduino Conventions

- **Entry point:** `.ino` file per product (e.g., `oracle-engine.ino`)
- **Modules:** `.cpp` / `.h` pairs for each subsystem
- **Header guards:** Use `#ifndef MODULE_NAME_H` / `#define MODULE_NAME_H` pattern
- **Configuration:** All user-configurable values in `config.h` with `#define`
- **Pin assignments:** Documented in `config.h` with comments explaining wiring

### Naming

- Functions: `camelCase` (e.g., `initAudio()`, `readHallSensor()`)
- Constants/defines: `UPPER_SNAKE_CASE` (e.g., `SAMPLE_RATE`, `LED_COUNT`)
- Variables: `camelCase` (e.g., `frameBuffer`, `isConnected`)
- File names: `snake_case` (e.g., `audio_i2s.cpp`, `motor_control.h`)

### Comments

- Every `.h` file starts with a brief module description comment
- Public functions have a one-line doc comment above them
- Complex logic gets inline comments explaining "why" not "what"
- No commented-out code in PRs (use version control instead)

### Memory

- Prefer stack allocation over heap for small buffers
- Use `PSRAM` for large allocations (frame buffers, audio buffers)
- Document memory usage in comments for buffer allocations
- Always check `malloc`/`ps_malloc` return values

---

## Testing

There is no automated test framework for Arduino firmware. Testing is manual:

1. **Flash the firmware** to your ESP32-S3
2. **Open Serial Monitor** at 115200 baud
3. **Verify basic operation:**
   - WiFi connects successfully
   - WebSocket handshake completes (if backend available)
   - Audio plays through speaker (for Oracle Engine)
   - LEDs illuminate (for POV Globe)
4. **Test your specific change** and describe results in the PR

If you find a way to add unit testing (e.g., via PlatformIO native tests for non-hardware logic), we'd love a PR for that!

---

## Where Contributions Are Welcome

### Firmware

- New LED animation patterns (add to `firmware/pov-globe/`)
- Performance optimizations (DMA, buffer management, WiFi coexistence)
- New features (gesture detection, additional sensors)
- Bug fixes (memory leaks, crash handlers, edge cases)
- Code cleanup and refactoring

### Hardware

- **Enclosure remixes** -- design your own shell! (submit STL + source files)
- Alternative PCB layouts
- Wiring improvements
- Battery management enhancements

### Documentation

- Assembly guides with photos
- Troubleshooting guides
- Translations (README, guides)
- Architecture documentation
- Video tutorials

### Tools

- Build scripts and automation
- Sanitization/linting tools
- OTA update server implementations

---

## Where Contributions Are NOT Accepted

The following are proprietary to Sacred Circuits and not open for contribution:

- **Deity voice profiles** -- The 21 Greek god voices are created with ElevenLabs voice cloning and are proprietary content
- **Oracle prompt engineering** -- The LLM system prompts that create deity personalities are proprietary
- **PANTHEON art assets** -- All visual art (card illustrations, animations) is proprietary
- **Volumetric LED animation content** -- The 3D sphere display animations are proprietary content
- **Companion web app** -- The oracleball.ai web application is a separate proprietary project

You can, however, contribute **animation pattern code** (the rendering logic) -- just not the specific animation data/assets we ship.

---

## License

By contributing to this repository, you agree that your contributions will be licensed under:

- **MIT License** for firmware code (`.ino`, `.cpp`, `.h`)
- **CERN-OHL-S-2.0** for hardware designs (schematics, PCB files)
- **CC BY-SA 4.0** for 3D-printable enclosure files (STL, STEP)

You retain copyright to your contributions. The license grants the project and all users the right to use, modify, and distribute your work under the same terms.

---

## Communication

- **Discord:** Join [The Orb -- Sacred Circuits](#) for real-time discussion
- **GitHub Issues:** For bug reports and feature requests
- **GitHub Discussions:** For design conversations and questions
- **#firmware-dev** on Discord: For code-level questions and reviews

---

## Code of Conduct

Be kind, be respectful, be helpful. We're building something mythological together.

- No gate-keeping on skill level -- beginners are welcome
- Constructive feedback only -- explain why, not just "wrong"
- Credit contributors in release notes
- Assume good intent

---

*Thank you for helping build The Orb!*
