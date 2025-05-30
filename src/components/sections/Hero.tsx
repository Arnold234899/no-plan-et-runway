
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Floating PLAN-ET B Background with Hands */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Main floating text container */}
        <div className="relative animate-float">
          {/* PLAN-ET B Text */}
          <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold opacity-10 select-none pointer-events-none">
            <div className="text-gradient bg-gradient-to-br from-blue-400 via-white to-blue-300 bg-clip-text text-transparent">
              PLAN-ET
            </div>
            <div className="text-gradient bg-gradient-to-br from-white via-blue-200 to-blue-400 bg-clip-text text-transparent -mt-8">
              B
            </div>
          </div>
          
          {/* Left Hand */}
          <div className="absolute -left-32 bottom-0 text-8xl md:text-9xl opacity-20 animate-pulse">
            <span className="text-blue-300">🤲</span>
          </div>
          
          {/* Right Hand */}
          <div className="absolute -right-32 bottom-0 text-8xl md:text-9xl opacity-20 animate-pulse delay-500">
            <span className="text-blue-300 scale-x-[-1] inline-block">🤲</span>
          </div>
        </div>
        
        {/* Additional floating hands around */}
        <div className="absolute top-1/4 left-1/4 text-6xl opacity-10 animate-float delay-1000">
          <span className="text-white">👐</span>
        </div>
        <div className="absolute top-3/4 right-1/4 text-6xl opacity-10 animate-float delay-2000">
          <span className="text-blue-200">🙌</span>
        </div>
        <div className="absolute top-1/2 left-1/6 text-5xl opacity-15 animate-float delay-1500">
          <span className="text-blue-400">✋</span>
        </div>
        <div className="absolute top-1/3 right-1/6 text-5xl opacity-15 animate-float delay-2500">
          <span className="text-white">🤚</span>
        </div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-30"
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
