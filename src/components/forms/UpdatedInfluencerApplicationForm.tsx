
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const UpdatedInfluencerApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagramHandle: '',
    tiktokHandle: '',
    followersCount: '',
    whyInterested: '',
    collaborationIdeas: '',
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('influencer_applications')
        .insert({
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          instagram_handle: formData.instagramHandle || null,
          tiktok_handle: formData.tiktokHandle || null,
          followers_count: formData.followersCount ? parseInt(formData.followersCount) : null,
          why_interested: formData.whyInterested || null,
          collaboration_ideas: formData.collaborationIdeas || null,
        });

      if (error) throw error;

      toast.success('Application submitted successfully! We\'ll review it and get back to you.');
      setFormData({
        name: '',
        email: '',
        instagramHandle: '',
        tiktokHandle: '',
        followersCount: '',
        whyInterested: '',
        collaborationIdeas: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Become a Brand Ambassador
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Join our mission to revolutionize sustainable fashion. We're looking for passionate individuals who share our vision of conscious style.
        </p>
      </div>

      <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white text-center">
            Influencer Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-zinc-300 text-sm font-medium mb-2 block">
                  Full Name *
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-white focus:border-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-zinc-300 text-sm font-medium mb-2 block">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-white focus:border-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="instagramHandle" className="text-zinc-300 text-sm font-medium mb-2 block">
                  Instagram Handle
                </Label>
                <Input
                  type="text"
                  id="instagramHandle"
                  name="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-white focus:border-white"
                />
              </div>

              <div>
                <Label htmlFor="tiktokHandle" className="text-zinc-300 text-sm font-medium mb-2 block">
                  TikTok Handle
                </Label>
                <Input
                  type="text"
                  id="tiktokHandle"
                  name="tiktokHandle"
                  value={formData.tiktokHandle}
                  onChange={handleChange}
                  placeholder="@yourusername"
                  className="bg-zinc-800 border-zinc-700 text-white focus:ring-white focus:border-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="followersCount" className="text-zinc-300 text-sm font-medium mb-2 block">
                Total Followers (combined)
              </Label>
              <Input
                type="number"
                id="followersCount"
                name="followersCount"
                value={formData.followersCount}
                onChange={handleChange}
                placeholder="10000"
                className="bg-zinc-800 border-zinc-700 text-white focus:ring-white focus:border-white"
              />
            </div>

            <div>
              <Label htmlFor="whyInterested" className="text-zinc-300 text-sm font-medium mb-2 block">
                Why are you interested in NO PLAN-ET B?
              </Label>
              <textarea
                id="whyInterested"
                name="whyInterested"
                value={formData.whyInterested}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                placeholder="Tell us about your passion for sustainable fashion..."
              />
            </div>

            <div>
              <Label htmlFor="collaborationIdeas" className="text-zinc-300 text-sm font-medium mb-2 block">
                Collaboration Ideas
              </Label>
              <textarea
                id="collaborationIdeas"
                name="collaborationIdeas"
                value={formData.collaborationIdeas}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                placeholder="Share your ideas for promoting sustainable fashion..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-semibold py-3 text-lg hover:from-yellow-500 hover:to-amber-500 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
