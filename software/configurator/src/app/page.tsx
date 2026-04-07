import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mosAIc — Your Desktop. On Your Wall.",
  description:
    "Open source modular wall computer. 12 magnetic modules. AI-powered. Build your wall.",
  openGraph: {
    title: "mosAIc — Your Desktop. On Your Wall.",
    description:
      "Open source modular wall computer. 12 magnetic modules. AI-powered. Build your wall.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mosAIc — Your Desktop. On Your Wall.",
    description:
      "Open source modular wall computer. 12 magnetic modules. AI-powered. Build your wall.",
    images: ["/og-image.jpg"],
  },
};

import { EnhancedNav } from "@/components/enhanced-nav";
import { EnhancedHero } from "@/components/enhanced-hero";
import { InteractiveDemo } from "@/components/interactive-demo";
import { HowItWorks } from "@/components/how-it-works";
import { ModuleCatalog } from "@/components/module-catalog";
import { Configurations } from "@/components/configurations";
import { InterfaceGallery } from "@/components/interface-gallery";
import { EnhancedWallConfigurator } from "@/components/enhanced-wall-configurator";
import { Customization } from "@/components/customization";
import { Scenes } from "@/components/scenes";
import { TheGuide } from "@/components/the-guide";
import { HubTiers } from "@/components/hub-tiers";
import { Thesis } from "@/components/thesis";
import { Community } from "@/components/community";
import { Footer } from "@/components/footer";

export default function EnhancedHome() {
  return (
    <>
      <EnhancedNav />
      <main className="flex-1">
        <EnhancedHero />
        <InteractiveDemo />
        <HowItWorks />
        <ModuleCatalog />
        <Configurations />
        <InterfaceGallery />
        <EnhancedWallConfigurator />
        <Customization />
        <Scenes />
        <TheGuide />
        <HubTiers />
        <Thesis />
        <Community />
      </main>
      <Footer />
    </>
  );
}