/**
 * Typed SSE event interfaces matching orb-backend streaming.py wire format.
 *
 * These types correspond 1:1 to the named SSE events emitted by
 * GET /api/oracle/read/{deity_id} on orb-backend :8300.
 */

/** First event -- deity metadata with art and color palette */
export interface DeityEvent {
  name: string;
  title: string;
  image: { path: string; tags: string[] } | null;
  color_palette: [string, string, string];
}

/** Progressive LLM text token */
export interface TextEvent {
  chunk: string;
}

/** Base64-encoded TTS audio chunk */
export interface AudioEvent {
  chunk: string;
}

/** Reading complete -- summary stats */
export interface DoneEvent {
  total_chars: number;
  deity: string;
}

/** Fatal pipeline error */
export interface ErrorEvent {
  error: string;
}

/** Non-fatal TTS error -- reading continues as text */
export interface TtsErrorEvent {
  error: string;
}

/** SSE connection lifecycle status */
export type SSEStatus = "idle" | "connecting" | "streaming" | "done" | "error";
