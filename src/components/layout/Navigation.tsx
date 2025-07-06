
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AuthButton } from "@/components/auth/AuthButton";
import { CartButton } from "@/components/cart/CartButton";
import { Link } from "react-router-dom";

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navigation = ({ theme, toggleTheme }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "Gallery", href: "/#gallery" },
    { name: "About", href: "/#about" },
    { name: "Brand Ambassador", href: "/brand-ambassador" },
    { name: "Influencers", href: "/#influencers" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // Handle anchor links
    if (href.startsWith('/#')) {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-emerald-950/95 backdrop-blur-md border-b border-emerald-400/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo with responsive sizing */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent tracking-wider hover:from-emerald-300 hover:to-blue-300 transition-all duration-300 filter drop-shadow-sm">
                NO PLAN-ET B
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-slate-300 hover:text-emerald-400 px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-all duration-300 relative group whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-slate-300 hover:text-emerald-400 px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-all duration-300 relative group whitespace-nowrap cursor-pointer"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Desktop Actions - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <CartButton />
            <AuthButton />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {/* Mobile actions and menu button */}
          <div className="flex items-center gap-1 sm:gap-2 md:hidden">
            <CartButton />
            <AuthButton />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-emerald-400 hover:bg-emerald-900/30 transition-all duration-300 border border-emerald-400/20 ml-1 tap-target"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-br from-slate-950/98 via-blue-950/98 to-emerald-950/98 border-b border-emerald-400/20 backdrop-blur-md">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20 block px-3 py-3 text-base font-medium transition-all duration-300 rounded-md border border-transparent hover:border-emerald-400/30 tap-target"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-emerald-400 hover:bg-emerald-900/20 block px-3 py-3 text-base font-medium transition-all duration-300 rounded-md border border-transparent hover:border-emerald-400/30 tap-target cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
