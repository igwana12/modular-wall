"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAudioQueue } from "@/hooks/use-audio-queue";
import { IntentInput } from "@/components/intent-input";
import { DeityBackground } from "@/components/deity-background";
import { AudioPlayer } from "@/components/audio-player";
import { ReadingStream } from "@/components/reading-stream";
import { PaywallGate } from "@/components/paywall-gate";
import { recordReading } from "@/lib/reading-tracker";
import type { DeityConfig } from "@/types/deity";

// Lazy-load CardReveal (motion-heavy) -- SSR shows card back placeholder
const CardReveal = dynamic(
  () => import("@/components/card-reveal").then((m) => m.CardReveal),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[420px] rounded-xl bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800 flex items-center justify-center">
        <span className="text-zinc-700 font-serif text-lg tracking-widest uppercase">
          Oracle
        </span>
      </div>
    ),
  }
);

type Phase = "reveal" | "intent" | "reading" | "complete";

interface ReadingPageClientProps {
  deity: DeityConfig;
  imageUrl: string;
}

export function ReadingPageClient({ deity, imageUrl }: ReadingPageClientProps) {
  const [phase, setPhase] = useState<Phase>("reveal");
  const [intent, setIntent] = useState("");
  const audioQueue = useAudioQueue();

  const handleRevealComplete = useCallback(() => {
    setPhase("intent");
  }, []);

  const handleIntentSubmit = useCallback(
    (submittedIntent: string) => {
      // Initialize AudioContext on user gesture
      audioQueue.initAudio();
      setIntent(submittedIntent);
      setPhase("reading");
    },
    [audioQueue]
  );

  const handleReadingComplete = useCallback(() => {
    recordReading(deity.id);
    setPhase("complete");
  }, [deity.id]);

  return (
    <PaywallGate>
    <DeityBackground colorPalette={deity.color_palette}>
      <div className="min-h-screen px-4 md:px-8 py-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/oracle"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          {phase === "reading" || phase === "complete" ? (
            <AudioPlayer
              isMuted={audioQueue.isMuted}
              isPlaying={audioQueue.isPlaying}
              onToggleMute={() => audioQueue.setMuted(!audioQueue.isMuted)}
            />
          ) : (
            <div className="w-[44px]" />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-12 max-w-[640px] mx-auto">
          {/* Phase 1: Card Reveal */}
          {(phase === "reveal" || phase === "intent") && (
            <CardReveal
              deityName={deity.name}
              deityTitle={deity.title}
              imageUrl={imageUrl}
              colorPalette={deity.color_palette}
              onRevealComplete={handleRevealComplete}
            />
          )}

          {/* Phase 2: Intent Input */}
          {phase === "intent" && (
            <IntentInput
              onSubmit={handleIntentSubmit}
              disabled={false}
            />
          )}

          {/* Phase 3 & 4: Reading Stream */}
          {(phase === "reading" || phase === "complete") && (
            <ReadingStream
              deityId={deity.id}
              intent={intent}
              onComplete={handleReadingComplete}
            />
          )}
        </div>
      </div>
    </DeityBackground>
    </PaywallGate>
  );
}
