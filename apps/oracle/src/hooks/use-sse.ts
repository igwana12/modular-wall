"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type {
  DeityEvent,
  TextEvent,
  AudioEvent,
  DoneEvent,
  ErrorEvent,
  TtsErrorEvent,
  SSEStatus,
} from "@/types/sse-events";

export interface OracleSSECallbacks {
  onDeity?: (data: DeityEvent) => void;
  onText?: (data: TextEvent) => void;
  onAudio?: (data: AudioEvent) => void;
  onDone?: (data: DoneEvent) => void;
  onError?: (data: ErrorEvent) => void;
  onTtsError?: (data: TtsErrorEvent) => void;
}

/**
 * Hook to consume named SSE events from the BFF oracle reading endpoint.
 *
 * CRITICAL: Uses addEventListener for named events (deity, text, audio, done,
 * error, tts_error) -- NOT the generic onmessage handler. orb-backend emits
 * named events via sse-starlette.
 *
 * @param url - The SSE endpoint URL, or null to stay idle.
 * @param callbacks - Event handlers for each SSE event type.
 * @returns Current connection status.
 */
export function useOracleSSE(
  url: string | null,
  callbacks: OracleSSECallbacks
) {
  const [status, setStatus] = useState<SSEStatus>("idle");
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  useEffect(() => {
    if (!url) {
      setStatus("idle");
      return;
    }

    setStatus("connecting");
    const es = new EventSource(url);

    es.addEventListener("deity", (e: MessageEvent) => {
      const data: DeityEvent = JSON.parse(e.data);
      setStatus("streaming");
      callbacksRef.current.onDeity?.(data);
    });

    es.addEventListener("text", (e: MessageEvent) => {
      const data: TextEvent = JSON.parse(e.data);
      callbacksRef.current.onText?.(data);
    });

    es.addEventListener("audio", (e: MessageEvent) => {
      const data: AudioEvent = JSON.parse(e.data);
      callbacksRef.current.onAudio?.(data);
    });

    es.addEventListener("done", (e: MessageEvent) => {
      const data: DoneEvent = JSON.parse(e.data);
      setStatus("done");
      callbacksRef.current.onDone?.(data);
      es.close();
    });

    es.addEventListener("error", (e: MessageEvent) => {
      // Named "error" event from backend (not EventSource onerror)
      if (e.data) {
        const data: ErrorEvent = JSON.parse(e.data);
        setStatus("error");
        callbacksRef.current.onError?.(data);
        es.close();
      }
    });

    es.addEventListener("tts_error", (e: MessageEvent) => {
      const data: TtsErrorEvent = JSON.parse(e.data);
      // Non-fatal: reading continues, just notify
      callbacksRef.current.onTtsError?.(data);
    });

    // EventSource connection-level error (network failure, etc.)
    es.onerror = () => {
      if (es.readyState === EventSource.CLOSED) {
        // Only set error if we didn't already transition to done
        setStatus((prev) => (prev === "done" ? "done" : "error"));
      }
    };

    return () => {
      es.close();
    };
  }, [url]);

  return { status };
}
