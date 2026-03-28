import { NextResponse } from "next/server";
import type { DeitySummary } from "@/types/deity";

export const dynamic = "force-dynamic";

const ORB_BACKEND_URL =
  process.env.ORB_BACKEND_URL || "http://localhost:8300";

/**
 * GET /api/deities/random -- Pick a random deity.
 * Always dynamic (never cached). Used by daily card pull.
 */
export async function GET() {
  try {
    const res = await fetch(`${ORB_BACKEND_URL}/api/deities`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch deities from backend" },
        { status: 502 }
      );
    }

    const deities: DeitySummary[] = await res.json();

    if (deities.length === 0) {
      return NextResponse.json(
        { error: "No deities available" },
        { status: 404 }
      );
    }

    const random = deities[Math.floor(Math.random() * deities.length)];

    return NextResponse.json({
      id: random.id,
      name: random.name,
      title: random.title,
      color_palette: random.color_palette,
    });
  } catch {
    return NextResponse.json(
      { error: "Backend unreachable" },
      { status: 503 }
    );
  }
}
