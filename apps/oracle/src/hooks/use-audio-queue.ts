"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Web Audio API queue for sequential playback of base64-encoded TTS chunks.
 *
 * AudioContext is created lazily via initAudio() -- must be called from a
 * user gesture (e.g., "Begin Reading" button click) to comply with browser
 * autoplay policy. Never created on mount.
 */
export function useAudioQueue() {
  const [isMuted, setIsMutedState] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const queueRef = useRef<AudioBuffer[]>([]);
  const playingRef = useRef(false);

  /**
   * Initialize AudioContext. MUST be called from a user gesture handler.
   * Safe to call multiple times -- subsequent calls are no-ops.
   */
  const initAudio = useCallback(() => {
    if (contextRef.current) return;

    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    contextRef.current = ctx;
    gainRef.current = gain;
  }, []);

  /**
   * Decode a base64-encoded audio chunk and add it to the playback queue.
   * If nothing is currently playing, starts playback immediately.
   */
  const enqueue = useCallback(async (base64Chunk: string) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    // Decode base64 to ArrayBuffer
    const binaryString = atob(base64Chunk);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    try {
      const audioBuffer = await ctx.decodeAudioData(bytes.buffer.slice(0));
      queueRef.current.push(audioBuffer);

      // Start playback if not already playing
      if (!playingRef.current) {
        playNext();
      }
    } catch {
      // Silently skip corrupt audio chunks -- text reading continues
    }
  }, []);

  /** Play the next buffer in the queue sequentially. */
  function playNext() {
    const ctx = contextRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    const buffer = queueRef.current.shift();
    if (!buffer) {
      playingRef.current = false;
      setIsPlaying(false);
      return;
    }

    playingRef.current = true;
    setIsPlaying(true);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(gain);
    source.onended = () => playNext();
    source.start();
  }

  /** Mute or unmute audio playback via gain node. */
  const setMuted = useCallback((muted: boolean) => {
    setIsMutedState(muted);
    if (gainRef.current) {
      gainRef.current.gain.value = muted ? 0 : 1;
    }
  }, []);

  return { initAudio, enqueue, setMuted, isMuted, isPlaying };
}
