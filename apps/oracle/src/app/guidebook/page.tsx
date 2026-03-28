import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { DeitySummary } from "@/types/deity";

export const metadata: Metadata = {
  title: "Digital Guidebook | Oracle Cards",
  description:
    "Explore the 21 gods of the Greek Pantheon. Learn their mythology, keywords, and reading styles before receiving your oracle reading.",
};

async function getDeities(): Promise<DeitySummary[]> {
  const res = await fetch(
    `${process.env.ORB_BACKEND_URL}/api/deities`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function GuidebookPage() {
  const deities = await getDeities();

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-serif text-[32px] font-bold">Digital Guidebook</h1>
        <p className="mt-2 text-base text-muted-foreground">
          The 21 gods of the Pantheon
        </p>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
          {deities.map((deity) => (
            <Link
              key={deity.id}
              href={`/guidebook/${deity.id}`}
              className="group"
            >
              <Card className="overflow-hidden border-border/50 transition-transform group-hover:scale-[1.03]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={`${process.env.ORB_BACKEND_URL}/api/content/${deity.id}/random`}
                    alt={`${deity.name} - ${deity.title}`}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-2">
                  <p
                    className="truncate font-serif text-sm font-semibold"
                    style={{ color: deity.color_palette[0] }}
                  >
                    {deity.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {deity.title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
