
import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { Promotions } from "@/components/sections/Promotions";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandMission } from "@/components/sections/BrandMission";
import { Gallery } from "@/components/sections/Gallery";
import { Influencers } from "@/components/sections/Influencers";
import { InfluencerApplicationForm } from "@/components/forms/InfluencerApplicationForm";
import { Contact } from "@/components/sections/Contact";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navigation />
      <Hero />
      <Promotions />
      <FeaturedProducts />
      <BrandMission />
      <Gallery />
      <Influencers />
      <div className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
        <InfluencerApplicationForm />
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
