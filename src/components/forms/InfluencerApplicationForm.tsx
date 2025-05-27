
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Youtube, Users, Mail } from "lucide-react";

export const InfluencerApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    followers: "",
    location: "",
    niche: "",
    experience: "",
    why: "",
    collaboration: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Influencer application submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for your application! We'll be in touch soon.");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-3xl mb-4">
            Become a NO PLAN-ET B Influencer
          </CardTitle>
          <p className="text-zinc-400 text-lg">
            Join our community of conscious fashion advocates and help spread the message of sustainable style.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-zinc-300 text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-zinc-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-zinc-300 text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Social Media Presence
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="instagram" className="block text-zinc-300 text-sm font-medium mb-2">
                    <Instagram className="inline mr-1 h-4 w-4" />
                    Instagram Handle *
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="@yourusername"
                  />
                </div>
                
                <div>
                  <label htmlFor="youtube" className="block text-zinc-300 text-sm font-medium mb-2">
                    <Youtube className="inline mr-1 h-4 w-4" />
                    YouTube Channel
                  </label>
                  <input
                    type="text"
                    id="youtube"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="Channel name or URL"
                  />
                </div>
                
                <div>
                  <label htmlFor="tiktok" className="block text-zinc-300 text-sm font-medium mb-2">
                    TikTok Handle
                  </label>
                  <input
                    type="text"
                    id="tiktok"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    placeholder="@yourusername"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="followers" className="block text-zinc-300 text-sm font-medium mb-2">
                  Total Followers *
                </label>
                <select
                  id="followers"
                  name="followers"
                  value={formData.followers}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select range</option>
                  <option value="1k-10k">1K - 10K</option>
                  <option value="10k-50k">10K - 50K</option>
                  <option value="50k-100k">50K - 100K</option>
                  <option value="100k-500k">100K - 500K</option>
                  <option value="500k-1m">500K - 1M</option>
                  <option value="1m+">1M+</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="niche" className="block text-zinc-300 text-sm font-medium mb-2">
                  Content Niche *
                </label>
                <select
                  id="niche"
                  name="niche"
                  value={formData.niche}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                >
                  <option value="">Select niche</option>
                  <option value="fashion">Fashion & Style</option>
                  <option value="sustainability">Sustainability</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="beauty">Beauty</option>
                  <option value="fitness">Fitness</option>
                  <option value="travel">Travel</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-zinc-300 text-sm font-medium mb-2">
                Influencer Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                placeholder="Tell us about your experience as an influencer, brands you've worked with, etc."
              />
            </div>

            <div>
              <label htmlFor="why" className="block text-zinc-300 text-sm font-medium mb-2">
                Why NO PLAN-ET B? *
              </label>
              <textarea
                id="why"
                name="why"
                value={formData.why}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                placeholder="Why do you want to collaborate with NO PLAN-ET B? What values do we share?"
              />
            </div>

            <div>
              <label htmlFor="collaboration" className="block text-zinc-300 text-sm font-medium mb-2">
                Collaboration Ideas
              </label>
              <textarea
                id="collaboration"
                name="collaboration"
                value={formData.collaboration}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                placeholder="What type of content would you create? Any specific collaboration ideas?"
              />
            </div>

            <Button type="submit" className="w-full bg-white text-zinc-950 hover:bg-zinc-100 text-lg py-4">
              <Mail className="mr-2 h-5 w-5" />
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
