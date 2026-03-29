/**
 * POST /api/subscribe
 *
 * Email-only signup endpoint for non-deposit subscribers.
 * Adds the subscriber to the main Kit form and tags them as email-only.
 * Used by the "Just sign up for updates" secondary CTA on the landing page.
 */

import { NextResponse } from "next/server";
import { addToForm, addSubscriber } from "@/lib/kit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format (basic check)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Add to main form and tag as email-only (both are fire-and-forget)
    await Promise.all([
      addToForm(email),
      addSubscriber(email, "email-only"),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Subscribe] Error processing signup:", err);
    return NextResponse.json(
      { error: "Failed to process signup" },
      { status: 500 }
    );
  }
}
