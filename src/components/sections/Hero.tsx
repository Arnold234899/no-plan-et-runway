
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Enhanced Floating PLAN-ET B Background with Pushing Hands */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main floating text container with enhanced visibility */}
        <div className="relative animate-float">
          {/* PLAN-ET B Text - Much more prominent */}
          <div className="text-[14rem] md:text-[18rem] lg:text-[24rem] font-bold opacity-25 select-none pointer-events-none">
            <div className="text-gradient bg-gradient-to-br from-blue-300 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              PLAN-ET
            </div>
            <div className="text-gradient bg-gradient-to-br from-white via-blue-100 to-blue-300 bg-clip-text text-transparent -mt-12 drop-shadow-2xl">
              B
            </div>
          </div>
          
          {/* Left Pushing Hand - More dynamic positioning */}
          <div className="absolute -left-40 top-1/2 transform -translate-y-1/2 text-9xl md:text-[8rem] opacity-30 animate-pulse">
            <span className="text-blue-200 drop-shadow-lg transform rotate-12">👐</span>
          </div>
          
          {/* Right Pushing Hand - More dynamic positioning */}
          <div className="absolute -right-40 top-1/2 transform -translate-y-1/2 text-9xl md:text-[8rem] opacity-30 animate-pulse delay-500">
            <span className="text-blue-200 drop-shadow-lg transform -rotate-12 scale-x-[-1] inline-block">👐</span>
          </div>
          
          {/* Bottom Left Pushing Hand */}
          <div className="absolute -left-32 bottom-0 text-8xl md:text-9xl opacity-25 animate-pulse delay-1000">
            <span className="text-white drop-shadow-lg transform rotate-45">🤲</span>
          </div>
          
          {/* Bottom Right Pushing Hand */}
          <div className="absolute -right-32 bottom-0 text-8xl md:text-9xl opacity-25 animate-pulse delay-1500">
            <span className="text-white drop-shadow-lg transform -rotate-45 scale-x-[-1] inline-block">🤲</span>
          </div>
        </div>
        
        {/* Additional floating hands creating push effect */}
        <div className="absolute top-1/4 left-1/3 text-7xl opacity-20 animate-float delay-1000">
          <span className="text-blue-300 drop-shadow-lg transform rotate-12">✋</span>
        </div>
        <div className="absolute top-3/4 right-1/3 text-7xl opacity-20 animate-float delay-2000">
          <span className="text-blue-200 drop-shadow-lg transform -rotate-12">🤚</span>
        </div>
        <div className="absolute top-1/2 left-1/6 text-6xl opacity-25 animate-float delay-1500">
          <span className="text-white drop-shadow-lg transform rotate-45">👋</span>
        </div>
        <div className="absolute top-1/3 right-1/6 text-6xl opacity-25 animate-float delay-2500">
          <span className="text-blue-400 drop-shadow-lg transform -rotate-45">🖐️</span>
        </div>
        
        {/* Corner hands for extra push effect */}
        <div className="absolute top-10 left-10 text-5xl opacity-15 animate-float delay-3000">
          <span className="text-blue-200 drop-shadow-lg transform rotate-90">👌</span>
        </div>
        <div className="absolute top-10 right-10 text-5xl opacity-15 animate-float delay-3500">
          <span className="text-white drop-shadow-lg transform -rotate-90">👌</span>
        </div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-15 animate-float delay-4000">
          <span className="text-blue-300 drop-shadow-lg transform rotate-45">🤘</span>
        </div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-15 animate-float delay-4500">
          <span className="text-blue-100 drop-shadow-lg transform -rotate-45">🤘</span>
        </div>
      </div>

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/60"></div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="block text-white drop-shadow-2xl">NO</span>
            <span className="block text-zinc-400 drop-shadow-2xl">PLAN-ET</span>
            <span className="block text-white drop-shadow-2xl">B</span>
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
