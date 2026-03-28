import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { DeityConfig } from "@/types/deity";

type Props = {
  params: Promise<{ deity_id: string }>;
};

async function getDeity(deityId: string): Promise<DeityConfig | null> {
  const res = await fetch(
    `${process.env.ORB_BACKEND_URL}/api/deities/${deityId}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  return res.json();
}

async function getDeityImages(
  deityId: string,
): Promise<{ path: string; filename: string; tags: string[]; available: boolean }[]> {
  const res = await fetch(
    `${process.env.ORB_BACKEND_URL}/api/content/${deityId}`,
  );
  if (!res.ok) return [];
  return res.json();
}

/**
 * Extract mythology description from the system_prompt.
 * Takes everything before "When giving a reading" or "McKee guidance:".
 * Falls back to first 500 characters if no split marker found.
 */
function extractMythology(systemPrompt: string): string {
  const markers = ["When giving a reading", "McKee guidance:"];
  for (const marker of markers) {
    const idx = systemPrompt.indexOf(marker);
    if (idx > 0) {
      return systemPrompt.slice(0, idx).trim();
    }
  }
  return systemPrompt.slice(0, 500).trim();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { deity_id } = await params;
  const deity = await getDeity(deity_id);
  if (!deity) {
    return { title: "Deity Not Found | Oracle Cards" };
  }
  return {
    title: `${deity.name} - ${deity.title} | Oracle Cards`,
    description: `Learn about ${deity.name}, ${deity.title}. Discover their mythology, keywords, and reading style in the Oracle Cards Digital Guidebook.`,
    keywords: deity.mythology_keywords,
  };
}

export default async function DeityGuidebookPage({ params }: Props) {
  const { deity_id } = await params;
  const [deity, images] = await Promise.all([
    getDeity(deity_id),
    getDeityImages(deity_id),
  ]);

  if (!deity) {
    notFound();
  }

  const mythology = extractMythology(deity.system_prompt);
  const heroImage = images[0]?.path;

  return (
    <main className="min-h-screen pb-16">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href="/guidebook"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Digital Guidebook</span>
        </Link>
      </div>

      {/* Hero image */}
      {heroImage && (
        <div className="relative h-[280px] w-full overflow-hidden rounded-xl mx-4" style={{ width: "calc(100% - 32px)" }}>
          <Image
            src={heroImage}
            alt={`${deity.name} PANTHEON art`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4">
        {/* Deity name and title */}
        <h1
          className="mt-6 font-serif text-[32px] font-bold"
          style={{ color: deity.color_palette[0] }}
        >
          {deity.name}
        </h1>
        <p className="text-2xl font-semibold text-muted-foreground">
          {deity.title}
        </p>

        {/* Keywords */}
        <section className="mt-8">
          <h2 className="font-serif text-xl font-semibold">Keywords</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {deity.mythology_keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Mythology */}
        <section>
          <h2 className="font-serif text-xl font-semibold">Mythology</h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            {mythology}
          </p>
        </section>

        <Separator className="my-8" />

        {/* Reading style */}
        <section>
          <h2 className="font-serif text-xl font-semibold">Reading Style</h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            {deity.reading_style}
          </p>
        </section>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href={`/read/${deity_id}`}
            className="flex h-11 w-full items-center justify-center rounded-lg bg-[#d4a017] text-base font-semibold text-zinc-950 transition-colors hover:bg-[#d4a017]/90"
          >
            Get a Reading from {deity.name}
          </Link>
        </div>
      </div>
    </main>
  );
}
