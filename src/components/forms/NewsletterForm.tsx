
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, save to newsletter_subscriptions table
      const { error: subscriptionError } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);

      if (subscriptionError) {
        // Check if it's a duplicate email error
        if (subscriptionError.code === '23505') {
          toast.error("You're already subscribed to our newsletter!");
          return;
        }
        throw subscriptionError;
      }

      // Send welcome email
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          type: 'newsletter',
          to: email,
          data: { email }
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the subscription if email fails
        toast.success("Successfully subscribed! (Welcome email may be delayed)");
      } else {
        toast.success("Successfully subscribed! Check your email for a welcome message.");
      }

      setEmail("");
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6"
      >
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};
