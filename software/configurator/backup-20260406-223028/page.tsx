import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ModuleCatalog } from "@/components/module-catalog";
import { Configurations } from "@/components/configurations";
import { WallConfigurator } from "@/components/wall-configurator";
import { Scenes } from "@/components/scenes";
import { TheGuide } from "@/components/the-guide";
import { HubTiers } from "@/components/hub-tiers";
import { Thesis } from "@/components/thesis";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ModuleCatalog />
        <Configurations />
        <WallConfigurator />
        <Scenes />
        <TheGuide />
        <HubTiers />
        <Thesis />
      </main>
      <Footer />
    </>
  );
}
