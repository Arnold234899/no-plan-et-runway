
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const UpdatedInfluencerApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram_handle: "",
    tiktok_handle: "",
    followers_count: "",
    why_interested: "",
    collaboration_ideas: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save influencer application to database
      const { error: dbError } = await supabase
        .from('influencer_applications')
        .insert([{
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          instagram_handle: formData.instagram_handle || null,
          tiktok_handle: formData.tiktok_handle || null,
          followers_count: formData.followers_count ? parseInt(formData.followers_count) : null,
          why_interested: formData.why_interested || null,
          collaboration_ideas: formData.collaboration_ideas || null
        }]);

      if (dbError) throw dbError;

      // Send confirmation email to applicant
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'influencer',
          to: formData.email,
          data: formData
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast.success("Application submitted successfully! (Confirmation email may be delayed)");
      } else {
        toast.success("Application submitted successfully! Check your email for confirmation.");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        instagram_handle: "",
        tiktok_handle: "",
        followers_count: "",
        why_interested: "",
        collaboration_ideas: ""
      });
    } catch (error) {
      console.error('Influencer application error:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-zinc-900/95 border-emerald-400/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
            Become a Brand Ambassador
          </CardTitle>
          <CardDescription className="text-zinc-300 text-lg">
            Join our mission to revolutionize sustainable fashion and inspire conscious choices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-emerald-400 font-semibold">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-emerald-400 font-semibold">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="instagram_handle" className="text-emerald-400 font-semibold">Instagram Handle</Label>
                <Input
                  id="instagram_handle"
                  name="instagram_handle"
                  placeholder="@yourusername"
                  value={formData.instagram_handle}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
                />
              </div>
              <div>
                <Label htmlFor="tiktok_handle" className="text-emerald-400 font-semibold">TikTok Handle</Label>
                <Input
                  id="tiktok_handle"
                  name="tiktok_handle"
                  placeholder="@yourusername"
                  value={formData.tiktok_handle}
                  onChange={handleChange}
                  className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="followers_count" className="text-emerald-400 font-semibold">Total Followers Count</Label>
              <Input
                id="followers_count"
                name="followers_count"
                type="number"
                placeholder="e.g., 10000"
                value={formData.followers_count}
                onChange={handleChange}
                className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
              />
            </div>

            <div>
              <Label htmlFor="why_interested" className="text-emerald-400 font-semibold">Why are you interested in partnering with NO PLAN-ET B?</Label>
              <Textarea
                id="why_interested"
                name="why_interested"
                rows={4}
                value={formData.why_interested}
                onChange={handleChange}
                className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
              />
            </div>

            <div>
              <Label htmlFor="collaboration_ideas" className="text-emerald-400 font-semibold">What collaboration ideas do you have?</Label>
              <Textarea
                id="collaboration_ideas"
                name="collaboration_ideas"
                rows={4}
                value={formData.collaboration_ideas}
                onChange={handleChange}
                className="bg-zinc-800/50 border-emerald-400/30 text-white focus:border-emerald-400"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Submitting Application..." : "Apply to Become a Brand Ambassador"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
