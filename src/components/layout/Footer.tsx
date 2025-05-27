
import { Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-zinc-950 border-t border-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-4 tracking-wider">
              NO PLAN-ET B
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              Redefining fashion through conscious creation. Join the movement toward 
              a sustainable and stylish future.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#shop" className="text-zinc-400 hover:text-white transition-colors">Shop</a></li>
              <li><a href="#gallery" className="text-zinc-400 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#about" className="text-zinc-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#influencers" className="text-zinc-400 hover:text-white transition-colors">Influencers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3 text-zinc-400">
              <p>hello@noplanetb.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Join our community of conscious creators</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500">
          <p>&copy; 2024 NO PLAN-ET B. All rights reserved. | Sustainable Fashion Revolution</p>
        </div>
      </div>
    </footer>
  );
};
