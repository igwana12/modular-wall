import { Menu } from "lucide-react";
import { DailyCard } from "@/components/daily-card";
import { DeityGallery } from "@/components/deity-gallery";
import { ReadingCounter } from "@/components/reading-counter";
import type { DeitySummary } from "@/types/deity";

const ORB_BACKEND_URL =
  process.env.ORB_BACKEND_URL || "http://localhost:8300";

async function getDeities(): Promise<DeitySummary[]> {
  try {
    const res = await fetch(`${ORB_BACKEND_URL}/api/deities`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const deities = await getDeities();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="flex h-12 items-center justify-between px-4 border-b border-border/50">
        <span className="font-serif text-lg font-semibold">Oracle Cards</span>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-4 pb-8">
        {/* Hero / Daily Card section */}
        <section className="mt-8 w-full max-w-sm flex flex-col items-center gap-4 text-center">
          <h1 className="font-serif text-3xl font-bold">The gods await</h1>
          <p className="text-muted-foreground text-sm">
            Pull a card to receive wisdom from the Pantheon. Each day brings a
            new oracle.
          </p>
          <DailyCard />
          <ReadingCounter />
        </section>

        {/* Deity Gallery */}
        <section className="mt-8 w-full max-w-3xl">
          {deities.length > 0 ? (
            <DeityGallery deities={deities} />
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              The Pantheon is gathering. Check back soon.
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="flex h-12 items-center justify-center gap-6 border-t border-border/50 text-sm text-muted-foreground">
        <a href="/pricing" className="hover:text-foreground">
          Pricing
        </a>
        <a href="/guidebook" className="hover:text-foreground">
          Guidebook
        </a>
      </footer>
    </div>
  );
}
