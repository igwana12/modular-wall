"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { canRead } from "@/lib/reading-tracker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "paywall" | "auth" | "auth-sent" | "redirecting";

export function PaywallGate({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("paywall");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Check reading allowance on mount
  useEffect(() => {
    if (status === "loading") return;
    // Premium users are never gated
    if (session?.user?.tier === "premium") return;
    if (!canRead()) {
      setOpen(true);
    }
  }, [session, status]);

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await signIn("resend", { email, redirect: false });
      setStep("auth-sent");
    } catch {
      // Fall through -- show sent state anyway to not leak info
      setStep("auth-sent");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    setStep("redirecting");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
      setStep("paywall");
    }
  }

  function handleCTAClick() {
    if (status === "authenticated") {
      handleCheckout();
    } else {
      setStep("auth");
    }
  }

  if (!open) return <>{children}</>;

  return (
    <>
      {children}
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setOpen(false);
        }}
      >
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          {step === "paywall" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  Your free readings have been claimed
                </DialogTitle>
                <DialogDescription>
                  You have received 3 readings this month. Unlock unlimited
                  oracle wisdom, deity voice narration, and your complete
                  reading history.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={handleCTAClick}
                  disabled={loading}
                  className="bg-[hsl(45,93%,47%)] text-black hover:bg-[hsl(45,93%,40%)] h-11 text-base font-medium"
                >
                  {loading ? "Loading..." : "Unlock the Oracle -- $9.99/month"}
                </Button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </>
          )}

          {step === "auth" && (
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
                <label htmlFor="paywall-email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="paywall-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="bg-[hsl(45,93%,47%)] text-black hover:bg-[hsl(45,93%,40%)] h-11 text-base font-medium"
                >
                  {loading ? "Sending..." : "Send Magic Link"}
                </Button>
                <button
                  type="button"
                  onClick={() => setStep("paywall")}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back
                </button>
              </form>
            </>
          )}

          {step === "auth-sent" && (
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
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {step === "redirecting" && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Redirecting to checkout...
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
