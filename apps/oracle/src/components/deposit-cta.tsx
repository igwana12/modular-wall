"use client";

import { useState, type FormEvent } from "react";

export function DepositCta() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDeposit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubscribe() {
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    setSubscribing(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubscribed(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubscribing(false);
    }
  }

  return (
    <section className="w-full max-w-md px-4 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">
          Reserve Your Deck
        </h2>

        <p className="text-sm text-muted-foreground">
          Be first to experience Oracle Cards when they launch.
        </p>

        <form onSubmit={handleDeposit} className="flex w-full flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full rounded-lg border border-border bg-background px-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Reserve Early Access \u2014 $1"}
          </button>
        </form>

        <p className="text-xs text-muted-foreground/70">
          Fully refundable deposit. Secures early-bird pricing.
        </p>

        {error && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {subscribed ? (
          <p className="text-xs text-green-400">
            You&apos;re on the list! We&apos;ll keep you posted.
          </p>
        ) : (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={subscribing}
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-50"
          >
            {subscribing ? "Signing up..." : "Just sign up for updates instead"}
          </button>
        )}
      </div>
    </section>
  );
}
