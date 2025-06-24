
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BrandAmbassador = () => {
  const ambassadorImages = [
    {
      id: 3,
      title: "Brand Ambassador Lerai - Contemporary Street Style",
      image: "/lovable-uploads/795c525b-bac1-414a-8fd5-b78d5316ab6c.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 4,
      title: "Brand Ambassador Lerai - Artistic Fashion Expression",
      image: "/lovable-uploads/254de182-44ca-4998-9068-3d79305bab6f.png",
      type: "Brand Ambassador Feature",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Brand Ambassador | NO PLAN-ET B | Sustainable Fashion Leaders</title>
        <meta name="description" content="Meet our brand ambassadors leading the sustainable fashion revolution. Discover their journey in conscious fashion and environmental responsibility." />
        <meta name="keywords" content="brand ambassador, NO PLAN-ET B, sustainable fashion, fashion leaders, conscious style, environmental fashion" />
        <meta property="og:title" content="Brand Ambassador | NO PLAN-ET B" />
        <meta property="og:description" content="Meet our brand ambassadors leading the sustainable fashion revolution." />
        <link rel="canonical" href="https://noplanetb.com/brand-ambassador" />
      </Helmet>
      
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navigation theme="dark" toggleTheme={() => {}} />
        
        {/* Hero Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Brand
              <span className="block text-yellow-400">Ambassadors</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-8">
              Leading the sustainable fashion revolution with conscious style and environmental responsibility
            </p>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="lerai" className="w-full">
              <TabsList className="grid w-full grid-cols-1 max-w-md mx-auto mb-12 bg-zinc-800 border border-zinc-700">
                <TabsTrigger 
                  value="lerai" 
                  className="text-white data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
                >
                  Lerai
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lerai" className="mt-0">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    Lerai
                  </h2>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
                    Embodying the spirit of conscious fashion and sustainable style
                  </p>
                  <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-lg p-6 max-w-3xl mx-auto">
                    <p className="text-zinc-300">
                      Lerai represents the future of fashion - where style meets sustainability, 
                      where conscious choices create lasting impact, and where every outfit tells 
                      a story of environmental responsibility and authentic self-expression.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {ambassadorImages.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          style={{ 
                            objectPosition: 'center 60%'
                          }}
                        />
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-yellow-400 text-sm mb-1 font-semibold uppercase tracking-wide">
                            {item.type}
                          </p>
                          <h3 className="font-semibold text-xl leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BrandAmbassador;
