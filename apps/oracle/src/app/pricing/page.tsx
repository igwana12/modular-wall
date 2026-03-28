"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

const freeTierFeatures = [
  "3 readings per month",
  "Text-only readings",
  "Daily card pull",
];

const premiumFeatures = [
  "Unlimited readings",
  "Deity voice narration",
  "Reading history",
  "Priority support",
];

export default function PricingPage() {
  const { data: session, status } = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authSent, setAuthSent] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleUpgrade() {
    if (status !== "authenticated") {
      setShowAuth(true);
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setCheckoutLoading(false);
    }
  }

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setAuthLoading(true);
    try {
      await signIn("resend", { email, redirect: false });
      setAuthSent(true);
    } catch {
      setAuthSent(true);
    } finally {
      setAuthLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl font-bold mb-2">
            Choose your path
          </h1>
          <p className="text-muted-foreground">
            The oracle speaks to all. Premium unlocks its full voice.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Free tier */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">Free</h2>
              <Badge variant="secondary">Current</Badge>
            </div>
            <p className="text-3xl font-bold">
              $0<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="space-y-2 text-sm">
              {freeTierFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-muted-foreground">--</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium tier */}
          <div className="rounded-xl border-2 border-[hsl(45,93%,47%)] bg-card p-6 space-y-4 relative">
            <div className="absolute -top-3 right-4">
              <Badge className="bg-[hsl(45,93%,47%)] text-black">
                Recommended
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold">Premium</h2>
            </div>
            <p className="text-3xl font-bold">
              $9.99<span className="text-base font-normal text-muted-foreground">/month</span>
            </p>
            <ul className="space-y-2 text-sm">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-[hsl(45,93%,47%)]">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="w-full bg-[hsl(45,93%,47%)] text-black hover:bg-[hsl(45,93%,40%)] h-11 text-base font-medium"
            >
              {checkoutLoading
                ? "Redirecting..."
                : "Unlock the Oracle -- $9.99/month"}
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Cancel anytime from your{" "}
          <Link href="/account" className="underline underline-offset-2 hover:text-foreground">
            account page
          </Link>
          .
        </p>
      </div>

      {/* Auth dialog for unauthenticated users */}
      <Dialog open={showAuth} onOpenChange={setShowAuth}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          {!authSent ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  Save your oracle journey
                </DialogTitle>
                <DialogDescription>
                  Enter your email to keep your reading history and manage your
                  subscription.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3 pt-2">
                <label htmlFor="pricing-email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="pricing-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={authLoading || !email}
                  className="bg-[hsl(45,93%,47%)] text-black hover:bg-[hsl(45,93%,40%)] h-11 text-base font-medium"
                >
                  {authLoading ? "Sending..." : "Send Magic Link"}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowAuth(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-3">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  Check your email
                </DialogTitle>
                <DialogDescription>
                  The oracle has sent a key. Click the link in your email to
                  sign in, then return here to complete your upgrade.
                </DialogDescription>
              </DialogHeader>
              <button
                onClick={() => setShowAuth(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
