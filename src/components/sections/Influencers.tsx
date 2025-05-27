
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Influencers = () => {
  const influencers = [
    {
      id: 1,
      name: "Maya Chen",
      handle: "@mayastyle",
      followers: "2.1M",
      image: "https://images.unsplash.com/photo-1494790108755-2616c67e7ca1?w=400&h=400&fit=crop",
      quote: "NO PLAN-ET B perfectly captures my vision of conscious luxury. Every piece tells a story.",
      instagramUrl: "https://instagram.com/mayastyle",
      collaboration: "Spring 2024 Campaign"
    },
    {
      id: 2,
      name: "Alex Rivera",
      handle: "@alexfashion",
      followers: "850K",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      quote: "The future of fashion is sustainable, and NO PLAN-ET B is leading the revolution.",
      instagramUrl: "https://instagram.com/alexfashion",
      collaboration: "Eco Warrior Collection"
    },
    {
      id: 3,
      name: "Zara Kim",
      handle: "@zarakim_style",
      followers: "1.5M",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      quote: "Bold designs that make a statement - exactly what the world needs right now.",
      instagramUrl: "https://instagram.com/zarakim_style",
      collaboration: "Future Canvas Series"
    },
    {
      id: 4,
      name: "Jordan Blake",
      handle: "@jordanblake",
      followers: "3.2M",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      quote: "When style meets sustainability, magic happens. NO PLAN-ET B gets it right.",
      instagramUrl: "https://instagram.com/jordanblake",
      collaboration: "Revolution Pants Campaign"
    }
  ];

  return (
    <section id="influencers" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Our Influencers
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Creative visionaries who embody the NO PLAN-ET B spirit and inspire change through conscious fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {influencers.map((influencer) => (
            <Card key={influencer.id} className="bg-zinc-950 border-zinc-800 overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img
                  src={influencer.image}
                  alt={influencer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{influencer.name}</h3>
                    <p className="text-zinc-400 text-sm">{influencer.handle}</p>
                    <p className="text-zinc-500 text-xs">{influencer.followers} followers</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    onClick={() => window.open(influencer.instagramUrl, '_blank')}
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>

                <blockquote className="text-zinc-300 text-sm italic mb-4 border-l-2 border-zinc-700 pl-4">
                  "{influencer.quote}"
                </blockquote>

                <div className="text-xs text-zinc-500 mb-4">
                  <span className="font-semibold">Collaboration:</span> {influencer.collaboration}
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-zinc-600 text-white hover:bg-zinc-800"
                  onClick={() => window.open(influencer.instagramUrl, '_blank')}
                >
                  View Profile
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-zinc-600 text-white hover:bg-zinc-800 text-lg px-8 py-4"
          >
            Become an Influencer
          </Button>
        </div>
      </div>
    </section>
  );
};
