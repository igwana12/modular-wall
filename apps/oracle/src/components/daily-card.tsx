"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DeitySummary } from "@/types/deity";

const STORAGE_KEY = "oracle_daily_card";

interface DailyCardState {
  date: string;
  deity_id: string;
  deity_name: string;
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function getStoredCard(): DailyCardState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && stored.date === getTodayString()) return stored;
  } catch {
    // Corrupted data
  }
  return null;
}

export function DailyCard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pulled, setPulled] = useState<DailyCardState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPulled(getStoredCard());
  }, []);

  async function handlePull() {
    setLoading(true);
    try {
      const res = await fetch("/api/deities/random");
      if (!res.ok) throw new Error("Failed to fetch random deity");
      const deity: DeitySummary = await res.json();

      const state: DailyCardState = {
        date: getTodayString(),
        deity_id: deity.id,
        deity_name: deity.name,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setPulled(state);
      router.push(`/read/${deity.id}`);
    } catch {
      setLoading(false);
    }
  }

  // Hydration: show skeleton until client mounts
  if (!mounted) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    );
  }

  // Already pulled today
  if (pulled) {
    return (
      <Card className="w-full max-w-sm border-border/50">
        <CardContent className="flex items-center gap-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-serif font-bold">
            {pulled.deity_name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              You drew {pulled.deity_name} today
            </span>
            <button
              onClick={() => router.push(`/read/${pulled.deity_id}`)}
              className="text-sm text-[hsl(45,93%,47%)] hover:underline text-left"
            >
              Read again?
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Not pulled yet
  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <Button
        onClick={handlePull}
        disabled={loading}
        className="h-12 w-full bg-[hsl(45,93%,47%)] text-zinc-950 hover:bg-[hsl(45,93%,42%)] font-semibold text-base"
      >
        {loading ? "The gods are choosing..." : "Pull Your Daily Card"}
      </Button>
    </div>
  );
}
