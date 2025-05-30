
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "#shop" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Influencers", href: "#influencers" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-wider hover:text-blue-400 transition-colors duration-300">
              NO PLAN-ET B
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-zinc-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="hidden md:block">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-900/30 hover:text-blue-400 transition-all duration-300 group">
              <ShoppingBag className="h-5 w-5 group-hover:text-green-400 transition-colors duration-300" />
              <span className="ml-2">Cart (0)</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 hover:bg-blue-900/30 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-zinc-300 hover:text-blue-400 hover:bg-blue-900/20 block px-3 py-2 text-base font-medium transition-all duration-300 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-900/30 hover:text-blue-400 w-full justify-start transition-all duration-300 group">
                <ShoppingBag className="h-5 w-5 mr-2 group-hover:text-green-400 transition-colors duration-300" />
                Cart (0)
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
