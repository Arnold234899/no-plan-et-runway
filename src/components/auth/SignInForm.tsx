
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignInFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const SignInForm = ({ loading, setLoading }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting sign in with email:', email);
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        toast.error(error.message || 'Failed to sign in');
      } else {
        console.log('Sign in successful');
        toast.success('Welcome back!');
      }
    } catch (err) {
      console.error('Sign in exception:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <Label htmlFor="signin-email" className="text-zinc-300">Email</Label>
        <Input
          id="signin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white"
          placeholder="ferdinandthandoarnold@gmail.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="signin-password" className="text-zinc-300">Password</Label>
        <Input
          id="signin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white"
          placeholder="123456@#"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-white text-zinc-950 hover:bg-zinc-100"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};
