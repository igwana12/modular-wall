/**
 * Kit (ConvertKit) API client.
 *
 * Gracefully degrades when KIT_API_SECRET is not set -- logs a warning
 * and returns without throwing. Email tagging is non-critical; a failed
 * Kit call must never break the deposit or signup flow.
 *
 * Environment variables:
 *   KIT_API_SECRET       - Kit API secret (from Kit account settings)
 *   KIT_FORM_ID          - Form ID for the main subscriber form
 *   KIT_TAG_VIP_DEPOSIT  - Tag ID for VIP depositors ($1 deposit)
 *   KIT_TAG_EMAIL_ONLY   - Tag ID for email-only signups
 */

const KIT_API_BASE = "https://api.convertkit.com/v3";

function getApiSecret(): string | undefined {
  return process.env.KIT_API_SECRET;
}

/**
 * Add a subscriber and apply a named tag.
 *
 * Tag names are mapped to environment variable tag IDs:
 *   "vip-deposit" -> KIT_TAG_VIP_DEPOSIT
 *   "email-only"  -> KIT_TAG_EMAIL_ONLY
 */
export async function addSubscriber(
  email: string,
  tag: "vip-deposit" | "email-only"
): Promise<void> {
  const apiSecret = getApiSecret();
  if (!apiSecret) {
    console.warn("[Kit] KIT_API_SECRET not set -- skipping subscriber tagging");
    return;
  }

  const tagIdMap: Record<string, string | undefined> = {
    "vip-deposit": process.env.KIT_TAG_VIP_DEPOSIT,
    "email-only": process.env.KIT_TAG_EMAIL_ONLY,
  };

  const tagId = tagIdMap[tag];
  if (!tagId) {
    console.warn(`[Kit] Tag ID env var not set for "${tag}" -- skipping`);
    return;
  }

  try {
    const res = await fetch(`${KIT_API_BASE}/tags/${tagId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_secret: apiSecret, email }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[Kit] Failed to tag subscriber (${res.status}): ${body}`);
      return;
    }

    console.log(`[Kit] Tagged ${email} with "${tag}" (tag ${tagId})`);
  } catch (err) {
    console.error("[Kit] Network error tagging subscriber:", err);
  }
}

/**
 * Add a subscriber to the main Kit form (email-only signups).
 * Uses KIT_FORM_ID to determine which form to subscribe to.
 */
export async function addToForm(email: string): Promise<void> {
  const apiSecret = getApiSecret();
  if (!apiSecret) {
    console.warn("[Kit] KIT_API_SECRET not set -- skipping form subscription");
    return;
  }

  const formId = process.env.KIT_FORM_ID;
  if (!formId) {
    console.warn("[Kit] KIT_FORM_ID not set -- skipping form subscription");
    return;
  }

  try {
    const res = await fetch(`${KIT_API_BASE}/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_secret: apiSecret, email }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        `[Kit] Failed to add to form (${res.status}): ${body}`
      );
      return;
    }

    console.log(`[Kit] Added ${email} to form ${formId}`);
  } catch (err) {
    console.error("[Kit] Network error adding to form:", err);
  }
}
