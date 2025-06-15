import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { EarthBackground } from "@/components/ui/EarthBackground";
import { ImpactStatsBar } from "@/components/sections/ImpactStatsBar";
import { DayNightToggle } from "@/components/ui/DayNightToggle";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => setIsLoading(false);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <Helmet>
        <title>NO PLAN-ET B | Sustainable Fashion Revolution | Eco-Conscious Clothing</title>
        <meta name="description" content="NO PLAN-ET B - Where consciousness meets couture. Discover sustainable fashion that challenges the industry's status quo. Shop eco-friendly clothing, jackets, and accessories. The future of sustainable fashion is here." />
        <meta name="keywords" content="sustainable fashion, eco-conscious clothing, ethical fashion, NO PLAN-ET B, environmental fashion, sustainable clothing brand, eco-friendly apparel, conscious fashion, green fashion, sustainable style" />
        <meta property="og:title" content="NO PLAN-ET B | Sustainable Fashion Revolution" />
        <meta property="og:description" content="Where consciousness meets couture. The future of sustainable fashion is here." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://noplanetb.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NO PLAN-ET B | Sustainable Fashion Revolution" />
        <meta name="twitter:description" content="Where consciousness meets couture. The future of sustainable fashion is here." />
        <link rel="canonical" href="https://noplanetb.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NO PLAN-ET B",
            "description": "Sustainable fashion brand challenging the industry's status quo",
            "url": "https://noplanetb.com",
            "logo": "https://noplanetb.com/logo.png",
            "sameAs": [
              "https://instagram.com/no.plan_etb"
            ]
          })}
        </script>
      </Helmet>
      {/* LIVE IMPACT BANNER */}
      <ImpactStatsBar />
      {/* HERO WITH 3D EARTH BACKGROUND */}
      <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950 overflow-hidden">
        <EarthBackground />
        <div className="relative z-10">
          <Navigation />
          <Hero />
        </div>
      </div>
      {/* Smoothed Section Transitions */}
      <div className="ocean-gradient">
        <Promotions />
      </div>
      <div className="forest-gradient">
        <FeaturedProducts />
      </div>
      <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-blue-950/60">
        <BrandMission />
      </div>
      <div className="earth-gradient">
        <Gallery />
      </div>
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-950/90 to-emerald-950/70">
        <Influencers />
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <InfluencerApplicationForm />
        </div>
        <Contact />
        <Footer />
      </div>
      {/* INTERACTIVE EARTH/NIGHT TOGGLE */}
      <DayNightToggle />
    </>
  );
};

export default Index;
