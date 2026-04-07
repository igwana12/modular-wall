/**
 * Enhanced Main Page - Redesigned mosAIc Website
 * Improvements implemented:
 * - Enhanced hero with better performance and accessibility
 * - Improved navigation with mobile support
 * - Better wall configurator with presets and guidance
 * - Optimized animations and loading performance
 */

import { EnhancedNav } from "@/components/enhanced-nav";
import { EnhancedHero } from "@/components/enhanced-hero";
import { HowItWorks } from "@/components/how-it-works";
import { ModuleCatalog } from "@/components/module-catalog";
import { Configurations } from "@/components/configurations";
import { InterfaceGallery } from "@/components/interface-gallery";
import { EnhancedWallConfigurator } from "@/components/enhanced-wall-configurator";
import { Scenes } from "@/components/scenes";
import { TheGuide } from "@/components/the-guide";
import { HubTiers } from "@/components/hub-tiers";
import { Thesis } from "@/components/thesis";
import { Footer } from "@/components/footer";

export default function EnhancedHome() {
  return (
    <>
      <EnhancedNav />
      <main className="flex-1">
        <EnhancedHero />
        <HowItWorks />
        <ModuleCatalog />
        <Configurations />
        <InterfaceGallery />
        <EnhancedWallConfigurator />
        <Scenes />
        <TheGuide />
        <HubTiers />
        <Thesis />
      </main>
      <Footer />
    </>
  );
}