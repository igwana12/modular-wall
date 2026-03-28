/**
 * POST /api/webhooks/stripe
 *
 * Stripe webhook handler. Receives events directly from Stripe (no auth).
 * CRITICAL: Uses req.text() for raw body -- req.json() breaks signature verification.
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  getUserByStripeCustomerId,
  getUserByEmail,
  updateUserTier,
} from "@/lib/db";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_email;

        // Handle $1 reservation deposits separately from subscriptions
        if (session.metadata?.type === "reservation_deposit") {
          console.log(
            `[Stripe] Reservation deposit received from ${email ?? "anonymous"}`
          );
          break;
        }

        // Existing subscription checkout handling
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id;
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

        if (email) {
          await updateUserTier(
            email,
            "premium",
            customerId ?? undefined,
            subscriptionId ?? undefined
          );
          console.log(`[Stripe] User ${email} upgraded to premium`);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const user = await getUserByStripeCustomerId(customerId);
        if (user) {
          await updateUserTier(user.email, "free");
          console.log(`[Stripe] User ${user.email} reverted to free tier`);
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const user = await getUserByStripeCustomerId(customerId);
        if (user) {
          const isActive =
            subscription.status === "active" ||
            subscription.status === "trialing";
          await updateUserTier(
            user.email,
            isActive ? "premium" : "free"
          );
          console.log(
            `[Stripe] Subscription updated for ${user.email}: ${subscription.status}`
          );
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;

        if (customerId) {
          const user = await getUserByStripeCustomerId(customerId);
          console.warn(
            `[Stripe] Payment failed for ${user?.email ?? customerId}`
          );
        }
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`[Stripe] Error processing ${event.type}:`, err);
    // Return 200 anyway -- Stripe retries on non-200 and we don't want
    // an internal error to cause infinite retries.
  }

  return NextResponse.json({ received: true });
}
