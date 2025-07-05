
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    newsletterSubscribers: 0,
    influencerApplications: 0,
    contactMessages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get product stats
      const { data: products } = await supabase
        .from('products')
        .select('is_active');

      const totalProducts = products?.length || 0;
      const activeProducts = products?.filter(p => p.is_active)?.length || 0;

      // Get newsletter subscribers
      const { data: newsletter } = await supabase
        .from('newsletter_subscriptions')
        .select('id', { count: 'exact' });

      // Get influencer applications
      const { data: applications } = await supabase
        .from('influencer_applications')
        .select('id', { count: 'exact' });

      // Get contact messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('id', { count: 'exact' });

      setStats({
        totalProducts,
        activeProducts,
        newsletterSubscribers: newsletter?.length || 0,
        influencerApplications: applications?.length || 0,
        contactMessages: messages?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Products</CardTitle>
            <CardDescription className="text-zinc-400">Total & Active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">{stats.totalProducts}</div>
            <div className="text-sm text-zinc-400">{stats.activeProducts} active</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Newsletter</CardTitle>
            <CardDescription className="text-zinc-400">Subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">{stats.newsletterSubscribers}</div>
            <div className="text-sm text-zinc-400">total subscribers</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Influencers</CardTitle>
            <CardDescription className="text-zinc-400">Applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{stats.influencerApplications}</div>
            <div className="text-sm text-zinc-400">applications received</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Contact</CardTitle>
            <CardDescription className="text-zinc-400">Messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-400">{stats.contactMessages}</div>
            <div className="text-sm text-zinc-400">messages received</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
