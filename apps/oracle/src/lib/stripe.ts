/**
 * Stripe server-side client.
 *
 * Uses the default API version shipped with stripe@21.
 * All env vars are placeholder until real keys are configured.
 */

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
