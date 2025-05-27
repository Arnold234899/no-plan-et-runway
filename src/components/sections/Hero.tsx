
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="block text-white">NO</span>
            <span className="block text-zinc-400">PLAN-ET</span>
            <span className="block text-white">B</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Where consciousness meets couture. 
            <span className="block mt-2 text-zinc-400">
              The future of sustainable fashion is here.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-zinc-950 hover:bg-zinc-100 text-lg px-8 py-4 group transition-all duration-300"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-zinc-600 text-white hover:bg-zinc-800 text-lg px-8 py-4"
            >
              Watch Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-zinc-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
