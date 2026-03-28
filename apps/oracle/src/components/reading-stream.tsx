"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useOracleSSE } from "@/hooks/use-sse";
import { useAudioQueue } from "@/hooks/use-audio-queue";
import { AudioPlayer } from "@/components/audio-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type {
  DeityEvent,
  TextEvent,
  AudioEvent,
  ErrorEvent,
} from "@/types/sse-events";

interface ReadingStreamProps {
  deityId: string;
  intent: string;
  onComplete: () => void;
}

export function ReadingStream({
  deityId,
  intent,
  onComplete,
}: ReadingStreamProps) {
  const [readingText, setReadingText] = useState("");
  const [deityImage, setDeityImage] = useState<DeityEvent["image"]>(null);
  const [ttsError, setTtsError] = useState(false);
  const [fatalError, setFatalError] = useState<string | null>(null);

  const audioQueue = useAudioQueue();
  const textContainerRef = useRef<HTMLDivElement>(null);

  const sseUrl = `/api/oracle/read/${deityId}?intent=${encodeURIComponent(intent)}`;

  const { status } = useOracleSSE(sseUrl, {
    onDeity: useCallback((data: DeityEvent) => {
      if (data.image) {
        setDeityImage(data.image);
      }
    }, []),
    onText: useCallback((data: TextEvent) => {
      setReadingText((prev) => prev + data.chunk);
    }, []),
    onAudio: useCallback(
      (data: AudioEvent) => {
        audioQueue.enqueue(data.chunk);
      },
      [audioQueue]
    ),
    onDone: useCallback(() => {
      onComplete();
    }, [onComplete]),
    onError: useCallback((data: ErrorEvent) => {
      setFatalError(data.error);
    }, []),
    onTtsError: useCallback(() => {
      setTtsError(true);
    }, []),
  });

  // Auto-scroll reading text into view
  useEffect(() => {
    if (textContainerRef.current && readingText) {
      textContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [readingText]);

  // Split reading text to detect paragraph breaks for image insertion
  const paragraphs = readingText.split("\n\n").filter(Boolean);
  const showImageAfterParagraph = paragraphs.length >= 2 ? 1 : -1;

  return (
    <div className="w-full max-w-[640px] mx-auto space-y-6">
      {/* Audio controls - positioned by parent */}
      <div className="flex justify-end">
        <AudioPlayer
          isMuted={audioQueue.isMuted}
          isPlaying={audioQueue.isPlaying}
          onToggleMute={() => audioQueue.setMuted(!audioQueue.isMuted)}
        />
      </div>

      {/* TTS error badge */}
      {ttsError && (
        <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">
          Voice unavailable -- your reading continues as text.
        </Badge>
      )}

      {/* Fatal error state */}
      {fatalError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center">
          <p className="text-base leading-relaxed">
            The oracle cannot speak right now. The connection to Olympus has been
            disrupted. Try again in a moment.
          </p>
        </div>
      )}

      {/* Connecting state */}
      {status === "connecting" && !fatalError && (
        <div className="space-y-4">
          <p className="text-[14px] font-medium text-muted-foreground animate-pulse">
            The oracle stirs...
          </p>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      )}

      {/* Streaming / Done text */}
      {(status === "streaming" || status === "done") && !fatalError && (
        <div
          ref={textContainerRef}
          aria-live="polite"
          className="space-y-4"
        >
          {paragraphs.map((paragraph, i) => (
            <div key={i}>
              <p className="text-base leading-[1.5] font-sans">
                {paragraph.split("").map((char, j) => (
                  <span
                    key={`${i}-${j}`}
                    className="inline transition-opacity duration-150"
                    style={{ opacity: 1 }}
                  >
                    {char}
                  </span>
                ))}
              </p>

              {/* PANTHEON art after first paragraph break */}
              {i === showImageAfterParagraph && deityImage && (
                <div className="my-6">
                  <Image
                    src={deityImage.path}
                    alt={deityImage.tags?.join(", ") || "Deity artwork"}
                    width={640}
                    height={400}
                    className="rounded-xl w-full h-auto"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reading complete state */}
      {status === "done" && !fatalError && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-[14px] font-medium whitespace-nowrap">
              Your reading is complete.
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="flex gap-3">
            <Link
              href="/oracle"
              className="flex flex-1 min-h-[48px] items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
            >
              Pull Another Card
            </Link>
            <Link
              href={`/guidebook/${deityId}`}
              className="flex flex-1 min-h-[48px] items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
            >
              View Guidebook
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
