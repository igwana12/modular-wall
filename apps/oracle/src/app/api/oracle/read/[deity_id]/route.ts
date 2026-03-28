import { type NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * BFF proxy: forwards SSE stream from orb-backend to the client.
 *
 * This thin proxy keeps the orb-backend URL private and allows
 * the Edge Runtime to handle long-lived SSE connections without
 * Vercel's default function timeout.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deity_id: string }> }
) {
  const { deity_id } = await params;

  const intent = request.nextUrl.searchParams.get("intent") ?? "";
  if (intent.trim().length < 3) {
    return new Response(
      JSON.stringify({ error: "Intent must be at least 3 characters" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const backendUrl = process.env.ORB_BACKEND_URL ?? "http://localhost:8300";
  const url = `${backendUrl}/api/oracle/read/${encodeURIComponent(deity_id)}?intent=${encodeURIComponent(intent)}`;

  try {
    const backendResponse = await fetch(url, {
      headers: {
        Accept: "text/event-stream",
      },
    });

    if (!backendResponse.ok) {
      return new Response(backendResponse.body, {
        status: backendResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(backendResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to connect to oracle backend",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}
