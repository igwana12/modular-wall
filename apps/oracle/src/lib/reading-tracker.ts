/**
 * Anonymous reading counter for free tier enforcement.
 *
 * Tracks monthly reading usage in localStorage. SSR-safe -- all functions
 * guard against server-side execution where `window` is unavailable.
 */

const STORAGE_KEY = "oracle_readings";
const FREE_LIMIT = 3;

interface ReadingRecord {
  month: string; // "2026-04"
  count: number;
  deity_ids: string[];
}

/** Check whether the user can perform another reading this month. */
export function canRead(): boolean {
  if (typeof window === "undefined") return true; // SSR guard
  return getMonthRecord().count < FREE_LIMIT;
}

/** Record that a reading was performed for the given deity. */
export function recordReading(deityId: string): void {
  if (typeof window === "undefined") return;
  const record = getMonthRecord();
  record.count++;
  record.deity_ids.push(deityId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Return the number of free readings remaining this month. */
export function getReadingsRemaining(): number {
  if (typeof window === "undefined") return FREE_LIMIT;
  return Math.max(0, FREE_LIMIT - getMonthRecord().count);
}

/** Get the current month's record, resetting if the month has changed. */
function getMonthRecord(): ReadingRecord {
  const month = new Date().toISOString().slice(0, 7);
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (stored.month === month) return stored;
  } catch {
    // Corrupted data -- reset
  }
  return { month, count: 0, deity_ids: [] };
}
