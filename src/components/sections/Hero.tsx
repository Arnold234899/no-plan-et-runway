
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-emerald-50">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-zinc-50/30"></div>
        
        {/* Minimalist floating elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-200 rounded-full animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Earth with brand text - floating together */}
        <div className="absolute inset-0">
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-around opacity-60"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            {/* Large Earth */}
            <div className="text-[16rem] animate-spin-slow opacity-20 relative">
              🌍
            </div>
            
            {/* Brand text positioned around Earth */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div 
                  className="absolute text-2xl font-light text-emerald-600 animate-pulse"
                  style={{ 
                    top: '-80px', 
                    left: '-100px',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  NO
                </div>
                
                <div 
                  className="absolute text-3xl font-medium text-zinc-700 animate-pulse"
                  style={{ 
                    top: '-60px', 
                    right: '-120px',
                    transform: 'translate(50%, -50%)',
                    animationDelay: '0.5s'
                  }}
                >
                  PLAN-ET
                </div>
                
                <div 
                  className="absolute text-4xl font-bold text-emerald-600 animate-pulse"
                  style={{ 
                    bottom: '-100px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animationDelay: '1s'
                  }}
                >
                  B
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-white/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        <div className="animate-fade-in space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight leading-tight">
            <span className="block text-zinc-900 font-extralight">NO</span>
            <span className="block text-emerald-600 font-medium">PLAN-ET</span>
            <span className="block text-zinc-900 font-bold">B</span>
          </h1>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed">
              Sustainable clothing brand.
            </p>
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
              Saving the 🌎 one piece at a time👖
            </p>
            <p className="text-base text-zinc-500">
              Where consciousness meets couture. The future of sustainable fashion is here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-emerald-600 text-white hover:bg-emerald-700 text-lg px-10 py-4 group transition-all duration-300 shadow-lg hover:shadow-xl font-medium rounded-full"
              >
                Shop Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 text-lg px-10 py-4 group transition-all duration-300 font-medium rounded-full"
            >
              <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-zinc-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
