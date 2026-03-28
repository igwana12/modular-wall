import { NextResponse } from "next/server";

const ORB_BACKEND_URL =
  process.env.ORB_BACKEND_URL || "http://localhost:8300";

/**
 * GET /api/deities -- BFF proxy for deity list.
 * Cached for 1 hour (deity list rarely changes).
 */
export async function GET() {
  try {
    const res = await fetch(`${ORB_BACKEND_URL}/api/deities`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch deities from backend" },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Backend unreachable" },
      { status: 503 }
    );
  }
}
