
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandMission } from "@/components/sections/BrandMission";
import { Gallery } from "@/components/sections/Gallery";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <BrandMission />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
