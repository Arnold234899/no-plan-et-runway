
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SignUpFormProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const SignUpForm = ({ loading, setLoading }: SignUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signUp } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting sign up with email:', email);
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, firstName, lastName);
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message || 'Failed to create account');
      } else {
        console.log('Sign up successful');
        toast.success('Account created successfully! Please check your email to verify your account.');
      }
    } catch (err) {
      console.error('Sign up exception:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="first-name" className="text-zinc-300">First Name</Label>
          <Input
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
        <div>
          <Label htmlFor="last-name" className="text-zinc-300">Last Name</Label>
          <Input
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="signup-email" className="text-zinc-300">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white"
          placeholder="ferdinandthandoarnold@gmail.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="signup-password" className="text-zinc-300">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 border-zinc-700 text-white"
          placeholder="123456@#"
          required
          minLength={6}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-white text-zinc-950 hover:bg-zinc-100"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};
