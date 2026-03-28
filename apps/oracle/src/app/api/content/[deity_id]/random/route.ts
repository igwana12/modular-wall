import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * BFF proxy: fetches a random PANTHEON image for a deity from orb-backend.
 * No caching -- each request returns a different random image.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ deity_id: string }> }
) {
  const { deity_id } = await params;
  const backendUrl = process.env.ORB_BACKEND_URL ?? "http://localhost:8300";

  try {
    const res = await fetch(
      `${backendUrl}/api/content/${encodeURIComponent(deity_id)}/random`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Content not available" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to content backend" },
      { status: 502 }
    );
  }
}
