#!/usr/bin/env npx tsx
/**
 * Oracle Card Design Generator
 *
 * Generates print-ready card PNGs using React templates + Playwright screenshots.
 * Run from project root: npx tsx scripts/generate-card-designs.ts
 */

import { chromium, type Browser, type Page } from "playwright";
import { execSync, spawn, type ChildProcess } from "child_process";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// ─── Deity ordering (Oracle Card numbering) ─────────────────────────────────

const DEITY_ORDER: [string, string][] = [
  ["zeus", "I"],
  ["hera", "II"],
  ["poseidon", "III"],
  ["hades", "IV"],
  ["athena", "V"],
  ["apollo", "VI"],
  ["artemis", "VII"],
  ["ares", "VIII"],
  ["aphrodite", "IX"],
  ["hermes", "X"],
  ["hephaestus", "XI"],
  ["demeter", "XII"],
  ["dionysus", "XIII"],
  ["persephone", "XIV"],
  ["hestia", "XV"],
  ["prometheus", "XVI"],
  ["hecate", "XVII"],
  ["eros", "XVIII"],
  ["pan", "XIX"],
  ["nike", "XX"],
  ["tyche", "XXI"],
];

// ─── MYTHS folder mapping (deity → folder number) ──────────────────────────

const MYTHS_MAP: Record<string, string> = {
  zeus: "01-ZEUS",
  hera: "02-HERA",
  poseidon: "03-POSEIDON",
  demeter: "04-DEMETER",
  athena: "05-ATHENA",
  apollo: "06-APOLLO",
  artemis: "07-ARTEMIS",
  ares: "08-ARES",
  aphrodite: "09-APHRODITE",
  hephaestus: "10-HEPHAESTUS",
  hermes: "11-HERMES",
  dionysus: "12-DIONYSUS",
  prometheus: "13-PROMETHEUS",
  hecate: "19-HECATE",
  hades: "20-HADES",
};

const MYTHS_BASE = "/Volumes/Extreme Pro/MYTHS";
const ORGANIZED_DIR = "/Volumes/Extreme Pro/sacred-circuits-outputs/organized";
const MIDJOURNEY_DIR =
  "/Volumes/Extreme Pro/sacred-circuits-outputs/images/midjourney";
const PROJECT_ROOT = path.resolve(__dirname, "..");
const ORACLE_DIR = path.join(PROJECT_ROOT, "apps", "oracle");
const PRINT_ASSETS_DIR = path.join(ORACLE_DIR, "public", "print-assets");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "assets", "card-designs");

// ─── Image search with fallback chain ───────────────────────────────────────

function findHeroImage(deityId: string): string | null {
  const deityName = deityId.charAt(0).toUpperCase() + deityId.slice(1);

  // 1. Check MYTHS hero folder
  const mythsFolder = MYTHS_MAP[deityId];
  if (mythsFolder) {
    const heroDir = path.join(MYTHS_BASE, mythsFolder, "images", "hero");
    if (fs.existsSync(heroDir)) {
      const files = fs
        .readdirSync(heroDir)
        .filter(
          (f) =>
            f.endsWith(".png") &&
            !f.startsWith(".") &&
            !f.startsWith("._") &&
            f.includes("character_design")
        );
      if (files.length > 0) {
        return path.join(heroDir, files[0]);
      }
      // Fallback: any PNG in hero
      const anyPng = fs
        .readdirSync(heroDir)
        .filter((f) => f.endsWith(".png") && !f.startsWith(".") && !f.startsWith("._"));
      if (anyPng.length > 0) {
        return path.join(heroDir, anyPng[0]);
      }
    }

    // 1b. Check genesis folder for deities like Aphrodite with empty hero
    const genesisDir = path.join(MYTHS_BASE, mythsFolder, "images", "genesis");
    if (fs.existsSync(genesisDir)) {
      const files = fs
        .readdirSync(genesisDir)
        .filter((f) => f.endsWith(".png") && !f.startsWith(".") && !f.startsWith("._"));
      if (files.length > 0) {
        return path.join(genesisDir, files[0]);
      }
    }
  }

  // 2. Check organized outputs
  if (fs.existsSync(ORGANIZED_DIR)) {
    const files = fs
      .readdirSync(ORGANIZED_DIR)
      .filter(
        (f) =>
          f.toLowerCase().includes(deityId.toLowerCase()) &&
          f.endsWith(".png") &&
          !f.startsWith(".") &&
          !f.startsWith("._") &&
          f.includes("character_design")
      );
    if (files.length > 0) {
      return path.join(ORGANIZED_DIR, files[0]);
    }
    // Any match in organized
    const anyMatch = fs
      .readdirSync(ORGANIZED_DIR)
      .filter(
        (f) =>
          f.toLowerCase().includes(deityId.toLowerCase()) &&
          f.endsWith(".png") &&
          !f.startsWith(".") &&
          !f.startsWith("._")
      );
    if (anyMatch.length > 0) {
      return path.join(ORGANIZED_DIR, anyMatch[0]);
    }
  }

  // 3. Check midjourney library
  if (fs.existsSync(MIDJOURNEY_DIR)) {
    const files = fs
      .readdirSync(MIDJOURNEY_DIR)
      .filter(
        (f) =>
          f.toLowerCase().includes(deityName.toLowerCase()) &&
          f.endsWith(".png") &&
          !f.startsWith(".") &&
          !f.startsWith("._")
      );
    if (files.length > 0) {
      return path.join(MIDJOURNEY_DIR, files[0]);
    }
  }

  return null;
}

// ─── Copy + resize hero image into public/print-assets ──────────────────────

async function prepareHeroImage(
  deityId: string,
  sourcePath: string | null
): Promise<void> {
  const destPath = path.join(PRINT_ASSETS_DIR, `${deityId}.png`);

  if (sourcePath && fs.existsSync(sourcePath)) {
    // Resize to portrait crop for card (crop center, 900x1500 target at 2x = 1800x3000)
    await sharp(sourcePath)
      .resize(1800, 3000, {
        fit: "cover",
        position: "centre",
      })
      .png()
      .toFile(destPath);
    console.log(`  [image] ${deityId}: ${path.basename(sourcePath)}`);
  } else {
    // Generate gradient placeholder
    const config = JSON.parse(
      fs.readFileSync(
        path.join(
          PROJECT_ROOT,
          "services",
          "orb-backend",
          "gods",
          `${deityId}.json`
        ),
        "utf-8"
      )
    );
    const [c1, c2, c3] = config.color_palette;

    // Create gradient placeholder using sharp
    const svg = `<svg width="1800" height="3000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="50%" stop-color="${c2}" />
          <stop offset="100%" stop-color="${c3}" />
        </linearGradient>
        <radialGradient id="glow">
          <stop offset="0%" stop-color="${c1}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
      </defs>
      <rect width="1800" height="3000" fill="url(#bg)" />
      <circle cx="900" cy="1200" r="600" fill="url(#glow)" />
      <text x="900" y="1500" text-anchor="middle" font-size="200" fill="white" opacity="0.15" font-family="serif">${config.name}</text>
    </svg>`;

    await sharp(Buffer.from(svg)).png().toFile(destPath);
    console.log(`  [placeholder] ${deityId}: gradient generated`);
  }
}

// ─── Server management ──────────────────────────────────────────────────────

function startDevServer(): ChildProcess {
  console.log("\nStarting Next.js dev server...");
  const server = spawn("npx", ["next", "dev", "--port", "3099"], {
    cwd: ORACLE_DIR,
    stdio: ["pipe", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "development" },
  });

  return server;
}

async function waitForServer(
  url: string,
  timeoutMs: number = 60000
): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return; // Server is up
    } catch {
      // Not ready yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Server did not start within ${timeoutMs}ms`);
}

// ─── Screenshot a page ──────────────────────────────────────────────────────

async function screenshotCard(
  page: Page,
  url: string,
  outputPath: string
): Promise<void> {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  // Wait a bit extra for images to load
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: outputPath,
    clip: { x: 0, y: 0, width: 900, height: 1500 },
    omitBackground: true,
  });
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("Oracle Card Design Generator");
  console.log("============================\n");

  // Ensure output directories exist
  fs.mkdirSync(PRINT_ASSETS_DIR, { recursive: true });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Step 1: Prepare hero images
  console.log("Step 1: Preparing hero images...\n");
  const missingImages: string[] = [];

  for (const [deityId] of DEITY_ORDER) {
    const heroPath = findHeroImage(deityId);
    if (!heroPath) {
      missingImages.push(deityId);
    }
    await prepareHeroImage(deityId, heroPath);
  }

  if (missingImages.length > 0) {
    console.log(
      `\n  WARNING: ${missingImages.length} deities using placeholder gradients:`
    );
    console.log(`  ${missingImages.join(", ")}\n`);
  }

  // Step 2: Start dev server
  const server = startDevServer();
  const BASE_URL = "http://localhost:3099";

  try {
    console.log("Waiting for dev server...");
    await waitForServer(BASE_URL);
    console.log("Server ready!\n");

    // Step 3: Launch browser and screenshot
    console.log("Step 2: Generating card designs...\n");
    const browser: Browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 900, height: 1500 },
      deviceScaleFactor: 2, // 2x for 1800x3000 output
    });
    const page: Page = await context.newPage();

    // Generate front cards
    for (const [deityId, numeral] of DEITY_ORDER) {
      const outputPath = path.join(OUTPUT_DIR, `front-${deityId}.png`);
      process.stdout.write(`  [${numeral.padStart(4)}] ${deityId}... `);
      try {
        await screenshotCard(page, `${BASE_URL}/print/${deityId}`, outputPath);
        const stat = fs.statSync(outputPath);
        const info = await sharp(outputPath).metadata();
        console.log(
          `${info.width}x${info.height} (${Math.round(stat.size / 1024)}KB)`
        );
      } catch (err) {
        console.log(
          `FAILED: ${err instanceof Error ? err.message : String(err)}`
        );
      }
    }

    // Generate back card
    process.stdout.write("  [BACK] card back... ");
    const backPath = path.join(OUTPUT_DIR, "back.png");
    await screenshotCard(page, `${BASE_URL}/print/back`, backPath);
    const backStat = fs.statSync(backPath);
    const backInfo = await sharp(backPath).metadata();
    console.log(
      `${backInfo.width}x${backInfo.height} (${Math.round(backStat.size / 1024)}KB)`
    );

    // Generate instruction card
    process.stdout.write("  [INST] instruction card... ");
    const instrPath = path.join(OUTPUT_DIR, "instruction.png");
    await screenshotCard(page, `${BASE_URL}/print/instruction`, instrPath);
    const instrStat = fs.statSync(instrPath);
    const instrInfo = await sharp(instrPath).metadata();
    console.log(
      `${instrInfo.width}x${instrInfo.height} (${Math.round(instrStat.size / 1024)}KB)`
    );

    await browser.close();

    // Step 4: Summary
    console.log("\n============================");
    console.log("Generation complete!\n");

    const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith(".png"));
    console.log(`Total files: ${files.length}`);
    console.log(`  Front cards: ${files.filter((f) => f.startsWith("front-")).length}/21`);
    console.log(`  Back card: ${files.includes("back.png") ? 1 : 0}/1`);
    console.log(`  Instruction: ${files.includes("instruction.png") ? 1 : 0}/1`);

    if (missingImages.length > 0) {
      console.log(`\nDeities using placeholder images (need manual selection):`);
      for (const id of missingImages) {
        console.log(`  - ${id}`);
      }
    }

    console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  } finally {
    // Kill dev server
    server.kill("SIGTERM");
    // Also kill any orphaned next dev processes on port 3099
    try {
      execSync("lsof -ti:3099 | xargs kill -9 2>/dev/null", {
        stdio: "ignore",
      });
    } catch {
      // Port may already be free
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  // Clean up port
  try {
    execSync("lsof -ti:3099 | xargs kill -9 2>/dev/null", { stdio: "ignore" });
  } catch {}
  process.exit(1);
});
