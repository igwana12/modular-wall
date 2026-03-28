"use client";

import { useEffect, useState } from "react";
import { getReadingsRemaining } from "@/lib/reading-tracker";

export function ReadingCounter() {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState(3);

  useEffect(() => {
    setMounted(true);
    setRemaining(getReadingsRemaining());
  }, []);

  // Don't render on server or before hydration (avoid SSR mismatch)
  if (!mounted) return null;

  // Don't render when no readings left (paywall handles this state)
  if (remaining <= 0) return null;

  return (
    <p className="text-sm text-muted-foreground">
      {remaining === 1
        ? "1 free reading remaining this month"
        : `${remaining} of 3 free readings remaining`}
    </p>
  );
}
