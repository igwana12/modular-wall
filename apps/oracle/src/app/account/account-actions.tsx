"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AccountActions({ isPremium }: { isPremium: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleManage() {
    setLoading(true);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  if (isPremium) {
    return (
      <Button
        onClick={handleManage}
        disabled={loading}
        variant="outline"
        className="w-full"
      >
        {loading ? "Loading..." : "Manage Subscription"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={loading}
      className="w-full bg-[hsl(45,93%,47%)] text-black hover:bg-[hsl(45,93%,40%)] h-11 text-base font-medium"
    >
      {loading ? "Redirecting..." : "Upgrade to Premium"}
    </Button>
  );
}
