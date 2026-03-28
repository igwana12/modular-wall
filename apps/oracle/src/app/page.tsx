import type { Metadata } from "next";
import { LandingHero } from "@/components/landing-hero";
import { LandingFeatures } from "@/components/landing-features";
import { DepositCta } from "@/components/deposit-cta";

export const metadata: Metadata = {
  title: "Oracle Cards — AI-Powered Greek Deity Readings",
  description:
    "21 Greek gods deliver personalized AI oracle readings through physical cards with digital magic. Reserve your deck with a $1 refundable deposit.",
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <LandingHero />
      <LandingFeatures />
      <DepositCta />

      {/* Footer */}
      <footer className="mt-auto flex w-full items-center justify-center gap-6 border-t border-border/50 py-6 text-sm text-muted-foreground">
        <a href="/oracle" className="hover:text-foreground">
          Try a Reading
        </a>
        <a href="/guidebook" className="hover:text-foreground">
          Guidebook
        </a>
        <a href="/terms" className="hover:text-foreground">
          Terms
        </a>
      </footer>
    </div>
  );
}
