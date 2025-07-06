
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Send, Eye, MousePointer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  template_type: string | null;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_count: number;
  opened_count: number;
  clicked_count: number;
  created_at: string;
}

export const EmailCampaigns = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    template_type: 'newsletter'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching campaigns:', error);
        return;
      }

      setCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name.trim() || !newCampaign.subject.trim() || !newCampaign.content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('email_campaigns')
        .insert([{
          name: newCampaign.name,
          subject: newCampaign.subject,
          content: newCampaign.content,
          template_type: newCampaign.template_type,
          status: 'draft'
        }]);

      if (error) {
        console.error('Error creating campaign:', error);
        toast.error('Failed to create campaign');
        return;
      }

      toast.success('Campaign created successfully!');
      setNewCampaign({ name: '', subject: '', content: '', template_type: 'newsletter' });
      setShowCreateForm(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'scheduled':
        return 'outline';
      case 'sending':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return <div className="text-white">Loading email campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center space-x-2">
              <Mail className="w-6 h-6" />
              <span>Email Campaigns</span>
            </CardTitle>
            <Button 
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-white text-zinc-950 hover:bg-zinc-100"
            >
              Create Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showCreateForm && (
            <div className="mb-6 p-4 bg-zinc-800 rounded-lg space-y-4">
              <h4 className="text-white font-semibold">Create New Campaign</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-zinc-300">Campaign Name</Label>
                  <Input
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="Enter campaign name"
                  />
                </div>
                
                <div>
                  <Label className="text-zinc-300">Template Type</Label>
                  <Select 
                    value={newCampaign.template_type} 
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, template_type: value })}
                  >
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="transactional">Transactional</SelectItem>
                      <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-zinc-300">Subject Line</Label>
                <Input
                  value={newCampaign.subject}
                  onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <Label className="text-zinc-300">Email Content</Label>
                <Textarea
                  value={newCampaign.content}
                  onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Enter email content (HTML supported)"
                  rows={6}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={createCampaign} className="bg-white text-zinc-950 hover:bg-zinc-100">
                  Create Campaign
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {campaigns.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">
              No email campaigns yet. Create your first campaign to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-zinc-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-white font-semibold">{campaign.name}</h4>
                      <Badge variant={getStatusColor(campaign.status) as any}>
                        {campaign.status.toUpperCase()}
                      </Badge>
                      {campaign.template_type && (
                        <Badge variant="outline">
                          {campaign.template_type}
                        </Badge>
                      )}
                    </div>
                    <span className="text-zinc-400 text-sm">
                      {new Date(campaign.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-zinc-300 mb-3">{campaign.subject}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-zinc-400">
                    <div className="flex items-center space-x-1">
                      <Send className="w-4 h-4" />
                      <span>Sent: {campaign.recipient_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Opened: {campaign.opened_count}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MousePointer className="w-4 h-4" />
                      <span>Clicked: {campaign.clicked_count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
