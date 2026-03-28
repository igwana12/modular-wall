/**
 * POST /api/deposit
 *
 * Creates a Stripe Checkout session for a $1 refundable reservation deposit.
 * No authentication required -- anyone can reserve with just an email.
 * Uses one-time payment mode (NOT subscription).
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body as { email?: string };

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 100,
            product_data: {
              name: "Oracle Cards - Early Access Reservation",
              description:
                "Fully refundable $1 deposit. Secures early-bird pricing.",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/reserved?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
      metadata: {
        type: "reservation_deposit",
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("[Deposit] Failed to create checkout session:", err);
    return NextResponse.json(
      { error: "Failed to create deposit session" },
      { status: 500 }
    );
  }
}
