
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          user_id: user?.id || null,
          name,
          email,
          subject: subject || null,
          message,
        });

      if (error) throw error;

      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-2">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="subject" className="block text-zinc-300 text-sm font-medium mb-2">
              Subject
            </Label>
            <Input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's this about?"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="block text-zinc-300 text-sm font-medium mb-2">
              Message
            </Label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us more about your inquiry..."
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
              required
            />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-white text-zinc-950 hover:bg-zinc-100 text-lg py-3"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
