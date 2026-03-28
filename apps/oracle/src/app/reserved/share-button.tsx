"use client";

import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  function handleShare() {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleShare}
      className="flex flex-1 min-h-[48px] items-center justify-center rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
    >
      {copied ? "Link Copied!" : "Share with Friends"}
    </button>
  );
}
