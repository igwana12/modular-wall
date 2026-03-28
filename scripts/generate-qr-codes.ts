/**
 * Generate print-ready SVG QR codes for all 21 Oracle Cards.
 *
 * Each QR encodes `https://oracleball.ai/read/{deity_id}` at Error Correction
 * Level H (highest) so the code remains scannable even when printed small on a
 * card or partially obscured by design overlays.
 *
 * Usage: npx tsx scripts/generate-qr-codes.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";
import QRCode from "qrcode";

const GODS_DIR = path.resolve(__dirname, "../services/orb-backend/gods");
const OUTPUT_DIR = path.resolve(__dirname, "../assets/qr-codes");
const BASE_URL = "https://oracleball.ai/read";

interface DeityConfig {
  id: string;
  name: string;
  [key: string]: unknown;
}

async function main() {
  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Read all deity JSON configs
  const files = fs
    .readdirSync(GODS_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();

  if (files.length === 0) {
    console.error(`No deity JSON files found in ${GODS_DIR}`);
    process.exit(1);
  }

  console.log(`Found ${files.length} deity configs in ${GODS_DIR}\n`);

  let generated = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(GODS_DIR, file), "utf-8");
    const god: DeityConfig = JSON.parse(raw);
    const url = `${BASE_URL}/${god.id}`;
    const outPath = path.join(OUTPUT_DIR, `${god.id}.svg`);

    await QRCode.toFile(outPath, url, {
      errorCorrectionLevel: "H",
      type: "svg",
      margin: 2,
      width: 300,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

    generated++;
    console.log(`  [${generated}/${files.length}] ${god.name} -> ${url}`);
  }

  console.log(`\nDone. ${generated} SVG QR codes written to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("QR generation failed:", err);
  process.exit(1);
});
