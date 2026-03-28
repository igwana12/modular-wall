import { type NextRequest, NextResponse } from "next/server";

/**
 * BFF proxy: fetches full deity config from orb-backend.
 * Caches for 1 hour (deity configs change rarely).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ deity_id: string }> }
) {
  const { deity_id } = await params;
  const backendUrl = process.env.ORB_BACKEND_URL ?? "http://localhost:8300";

  try {
    const res = await fetch(
      `${backendUrl}/api/deities/${encodeURIComponent(deity_id)}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json(
          { error: "Deity not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Backend error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to oracle backend" },
      { status: 502 }
    );
  }
}
