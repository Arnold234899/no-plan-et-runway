import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EarthBackground } from "@/components/ui/EarthBackground";

interface HeroProps {
  theme: 'light' | 'dark';
}

export const Hero = ({ theme }: HeroProps) => {
  const [period, setPeriod] = useState<'morning' | 'afternoon' | 'evening'>('evening');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getPeriodDetails = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setPeriod('morning');
        setGreeting('Good Morning, change-maker!');
      } else if (hour >= 12 && hour < 18) {
        setPeriod('afternoon');
        setGreeting('Good Afternoon, change-maker!');
      } else {
        setPeriod('evening');
        setGreeting('Good Evening, change-maker!');
      }
    };
    getPeriodDetails();
  }, []);
  
  const darkPeriodBg = {
    morning: 'from-indigo-900 via-purple-900 to-slate-900', // Sunrise dark
    afternoon: 'from-sky-800 via-blue-900 to-slate-950', // Daytime dark
    evening: 'from-slate-950 via-blue-950 to-emerald-950', // Night dark (original)
  };

  const lightPeriodBg = {
      morning: 'from-orange-300 via-pink-400 to-sky-500', // Sunrise light
      afternoon: 'from-sky-400 via-cyan-400 to-blue-500', // Daytime light
      evening: 'from-indigo-500 via-purple-600 to-slate-800', // Sunset light
  };

  const currentSectionBg = theme === 'light' ? lightPeriodBg[period] : darkPeriodBg[period];

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${currentSectionBg} transition-all duration-1000`}>
      
      <EarthBackground />

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent"></div>

      {/* Content with enhanced earth-inspired styling */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <p className="text-2xl md:text-3xl text-foreground/80 mb-4 font-light filter drop-shadow-lg">{greeting}</p>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            <span className="block text-emerald-700 dark:text-emerald-300 drop-shadow-2xl filter brightness-110 animate-pulse">NO</span>
            <span className="block text-blue-700 dark:text-blue-400 drop-shadow-2xl filter brightness-110 animate-pulse delay-300">PLAN-ET</span>
            <span className="block text-teal-700 dark:text-teal-300 drop-shadow-2xl filter brightness-110 animate-pulse delay-500">B</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Where consciousness meets couture. 
            <span className="block mt-2 text-emerald-600 dark:text-emerald-400">
              The future of sustainable fashion is here.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-primary-foreground hover:from-emerald-600 hover:to-teal-600 text-lg px-8 py-4 group transition-all duration-300 shadow-2xl border-0"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary/50 text-primary/90 hover:bg-primary/10 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-blue-400/20 dark:hover:text-blue-200 text-lg px-8 py-4 shadow-xl backdrop-blur-sm bg-primary/5 dark:bg-blue-950/30"
            >
              <Eye className="mr-2 h-5 w-5" />
              View More Products
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator with earth colors */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-emerald-600 dark:border-emerald-400 rounded-full flex justify-center backdrop-blur-sm bg-emerald-300/30 dark:bg-emerald-950/30">
          <div className="w-1 h-3 bg-gradient-to-b from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
