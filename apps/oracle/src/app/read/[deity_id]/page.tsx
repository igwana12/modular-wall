import { notFound } from "next/navigation";
import type { DeityConfig } from "@/types/deity";
import { ReadingPageClient } from "./reading-page-client";

interface ReadingPageProps {
  params: Promise<{ deity_id: string }>;
}

/**
 * Server Component: fetches deity config and random PANTHEON image at request time,
 * then renders the client-side reading flow state machine.
 *
 * SSR renders the card back placeholder for fast FCP (CardReveal is lazy-loaded).
 */
export default async function ReadingPage({ params }: ReadingPageProps) {
  const { deity_id } = await params;
  const backendUrl = process.env.ORB_BACKEND_URL ?? "http://localhost:8300";

  // Fetch deity config and random image in parallel
  const [deityRes, imageRes] = await Promise.all([
    fetch(`${backendUrl}/api/deities/${encodeURIComponent(deity_id)}`, {
      next: { revalidate: 3600 },
    }).catch(() => null),
    fetch(
      `${backendUrl}/api/content/${encodeURIComponent(deity_id)}/random`
    ).catch(() => null),
  ]);

  if (!deityRes || !deityRes.ok) {
    notFound();
  }

  const deity: DeityConfig = await deityRes.json();

  // Fallback image if content endpoint fails
  let imageUrl = "/card-back.png";
  if (imageRes && imageRes.ok) {
    const imageData = await imageRes.json();
    if (imageData.path) {
      imageUrl = imageData.path;
    }
  }

  return <ReadingPageClient deity={deity} imageUrl={imageUrl} />;
}
