
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "#shop" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Influencers", href: "#influencers" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-emerald-950/95 backdrop-blur-md border-b border-emerald-400/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with enhanced earth styling */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent tracking-wider hover:from-emerald-300 hover:to-blue-300 transition-all duration-300 filter drop-shadow-sm">
              NO PLAN-ET B
            </h1>
          </div>

          {/* Desktop Navigation with earth-inspired hover effects */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-emerald-400 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-emerald-900/30 hover:text-emerald-400 transition-all duration-300 group border border-emerald-400/20 hover:border-emerald-400/60"
            >
              <ShoppingBag className="h-5 w-5 group-hover:text-teal-400 transition-colors duration-300" />
              <span className="ml-2">Cart (0)</span>
            </Button>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-emerald-400 hover:bg-emerald-900/30 transition-all duration-300 border border-emerald-400/20"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-slate-950/98 via-blue-950/98 to-emerald-950/98 border-b border-emerald-400/20 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20 block px-3 py-2 text-base font-medium transition-all duration-300 rounded-md border border-transparent hover:border-emerald-400/30"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-emerald-900/30 hover:text-emerald-400 w-full justify-start transition-all duration-300 group border border-emerald-400/20 hover:border-emerald-400/60"
              >
                <ShoppingBag className="h-5 w-5 mr-2 group-hover:text-teal-400 transition-colors duration-300" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
