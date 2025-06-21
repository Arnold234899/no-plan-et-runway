
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Lerai = () => {
  const leraiGallery = [
    {
      id: 1,
      title: "Lerai - Industrial Style Statement",
      image: "/lovable-uploads/36667570-40cc-476f-9c0b-65fd119186b6.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 2,
      title: "Lerai - Urban Fashion Forward",
      image: "/lovable-uploads/0d8e7c98-78d0-4374-ba24-55383045f7c0.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 3,
      title: "Lerai - Sustainable Fashion Icon",
      image: "/lovable-uploads/b6e15c48-3ee5-47d5-91f3-7c3bea348a6a.png",
      type: "Brand Ambassador",
    },
    {
      id: 4,
      title: "Lerai - Conscious Style Leader",
      image: "/lovable-uploads/92174a9d-2efd-4362-8157-5d5b355093c4.png",
      type: "Brand Ambassador",
    },
    {
      id: 5,
      title: "Lerai - Contemporary Street Style",
      image: "/lovable-uploads/795c525b-bac1-414a-8fd5-b78d5316ab6c.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 6,
      title: "Lerai - Artistic Fashion Expression",
      image: "/lovable-uploads/254de182-44ca-4998-9068-3d79305bab6f.png",
      type: "Brand Ambassador Feature",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Brand Ambassador Lerai | NO PLAN-ET B | Sustainable Fashion Leader</title>
        <meta name="description" content="Meet Lerai, NO PLAN-ET B's brand ambassador embodying conscious fashion and sustainable style. Discover her journey in sustainable fashion leadership." />
        <meta name="keywords" content="Lerai, brand ambassador, NO PLAN-ET B, sustainable fashion, fashion leader, conscious style" />
        <meta property="og:title" content="Brand Ambassador Lerai | NO PLAN-ET B" />
        <meta property="og:description" content="Meet Lerai, embodying conscious fashion and sustainable style as NO PLAN-ET B's brand ambassador." />
        <link rel="canonical" href="https://noplanetb.com/lerai" />
      </Helmet>
      
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navigation theme="dark" toggleTheme={() => {}} />
        
        {/* Hero Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-900 to-zinc-950">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Brand Ambassador
              <span className="block text-yellow-400">Lerai</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-8">
              Embodying the spirit of conscious fashion and sustainable style
            </p>
            <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-lg p-8 max-w-4xl mx-auto">
              <p className="text-lg text-zinc-200 leading-relaxed">
                Lerai represents the future of fashion - where style meets sustainability, 
                where conscious choices create lasting impact, and where every outfit tells 
                a story of environmental responsibility and authentic self-expression.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Gallery
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Celebrating Lerai's journey as our brand ambassador and sustainable fashion leader.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {leraiGallery.map((item) => (
                    <CarouselItem key={item.id}>
                      <div className="group relative overflow-hidden rounded-lg">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-yellow-400 text-sm mb-1 font-semibold">
                              {item.type}
                            </p>
                            <h3 className="font-semibold text-xl">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Meet Lerai in Action
              </h2>
              <p className="text-lg text-zinc-400">
                Watch Lerai embody the NO PLAN-ET B vision of sustainable fashion
              </p>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <video
                className="w-full h-auto"
                controls
                poster="/lovable-uploads/b6e15c48-3ee5-47d5-91f3-7c3bea348a6a.png"
              >
                <source src="/videos/lerai-brand-ambassador.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Lerai;
