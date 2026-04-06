import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ModuleCatalog } from "@/components/module-catalog";
import { WallConfigurator } from "@/components/wall-configurator";
import { Scenes } from "@/components/scenes";
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
        <WallConfigurator />
        <Scenes />
        <Thesis />
      </main>
      <Footer />
    </>
  );
}
