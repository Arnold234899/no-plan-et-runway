
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Animated background without Three.js */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-zinc-950 to-blue-800/20"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Large Floating Earth with animated text */}
        <div className="absolute inset-0">
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-float-around"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            {/* Large Earth */}
            <div className="text-[20rem] animate-spin-slow opacity-30 relative">
              🌍
            </div>
            
            {/* Floating Text around Earth - better spaced */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div 
                  className="absolute text-3xl font-bold text-white animate-pulse animate-orbit-text-1"
                >
                  NO
                </div>
                <div 
                  className="absolute text-4xl font-bold text-blue-400 animate-pulse animate-orbit-text-2"
                >
                  PLAN-ET
                </div>
                <div 
                  className="absolute text-5xl font-bold text-white animate-pulse animate-orbit-text-3"
                >
                  B
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-zinc-950/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="block text-white drop-shadow-2xl filter brightness-110 animate-pulse">NO</span>
            <span className="block text-blue-400 drop-shadow-2xl filter brightness-110 animate-pulse delay-300">PLAN-ET</span>
            <span className="block text-white drop-shadow-2xl filter brightness-110 animate-pulse delay-500">B</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Where consciousness meets couture. 
            <span className="block mt-2 text-zinc-400">
              The future of sustainable fashion is here.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-white text-zinc-950 hover:bg-zinc-100 text-lg px-8 py-4 group transition-all duration-300 shadow-2xl"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-zinc-600 text-white hover:bg-zinc-800 text-lg px-8 py-4 shadow-xl"
            >
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
