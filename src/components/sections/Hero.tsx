
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Removed static emoji/animated bg, EarthBackground is now in parent */}
      {/* Main hero content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="block text-emerald-300 drop-shadow-2xl filter brightness-110 animate-pulse">NO</span>
            <span className="block text-blue-400 drop-shadow-2xl filter brightness-110 animate-pulse delay-300">PLAN-ET</span>
            <span className="block text-teal-300 drop-shadow-2xl filter brightness-110 animate-pulse delay-500">B</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Where consciousness meets couture.
            <span className="block mt-2 text-emerald-300">
              The future of sustainable fashion is here.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 text-lg px-8 py-4 group transition-all duration-300 shadow-2xl border-0"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-400 text-blue-300 hover:bg-blue-400/20 hover:text-blue-200 text-lg px-8 py-4 shadow-xl backdrop-blur-sm bg-blue-950/30"
            >
              <Eye className="mr-2 h-5 w-5" />
              View More Products
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center backdrop-blur-sm bg-emerald-950/30">
          <div className="w-1 h-3 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
