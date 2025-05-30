
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer id="contact-footer" className="bg-zinc-900 border-t border-zinc-800 py-20 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-3xl font-light text-white mb-4 tracking-wide">
              NO PLAN-ET B
            </h3>
            <div className="space-y-3">
              <p className="text-zinc-300 text-lg leading-relaxed">
                Sustainable clothing brand. Saving the 🌎 one piece at a time👖
              </p>
              <div className="flex items-center text-zinc-400 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>94 Conrad Drive, Blairgowrie</span>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition-all duration-300"
                onClick={() => window.open('https://instagram.com/no.plan_etb', '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-3 rounded-xl transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#shop" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Shop Now</a></li>
              <li><a href="#gallery" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Gallery</a></li>
              <li><a href="#about" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Our Story</a></li>
              <li><a href="#influencers" className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 text-sm">Influencers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold text-lg">Get in Touch</h4>
            <div className="space-y-4 text-zinc-400 text-sm">
              <p className="hover:text-emerald-400 transition-colors duration-300 cursor-pointer">hello@noplanetb.com</p>
              <p className="hover:text-emerald-400 transition-colors duration-300 cursor-pointer">+1 (555) 123-4567</p>
              <p className="leading-relaxed">Join our community of conscious creators and sustainable fashion enthusiasts.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-16 pt-8 text-center">
          <p className="text-zinc-500 text-sm">
            &copy; 2024 NO PLAN-ET B. All rights reserved. | Sustainable Fashion Revolution
          </p>
        </div>
      </div>
    </footer>
  );
};
