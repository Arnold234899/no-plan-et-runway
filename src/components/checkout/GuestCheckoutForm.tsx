
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface GuestCheckoutFormProps {
  onSubmit: (guestData: GuestCheckoutData) => void;
  loading: boolean;
}

export interface GuestCheckoutData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}

export const GuestCheckoutForm = ({ onSubmit, loading }: GuestCheckoutFormProps) => {
  const [guestData, setGuestData] = useState<GuestCheckoutData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US'
    },
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!guestData.email || !guestData.firstName || !guestData.lastName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (!guestData.shippingAddress.addressLine1 || !guestData.shippingAddress.city || 
        !guestData.shippingAddress.state || !guestData.shippingAddress.postalCode) {
      toast.error('Please fill in all shipping address fields');
      return;
    }

    onSubmit(guestData);
  };

  return (
    <Card className="bg-zinc-900 border-emerald-400/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <User className="mr-2 h-5 w-5 text-emerald-400" />
          Guest Checkout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Mail className="mr-2 h-4 w-4 text-emerald-400" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">First Name *</Label>
                <Input
                  value={guestData.firstName}
                  onChange={(e) => setGuestData({...guestData, firstName: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-300">Last Name *</Label>
                <Input
                  value={guestData.lastName}
                  onChange={(e) => setGuestData({...guestData, lastName: e.target.value})}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-zinc-300">Email *</Label>
              <Input
                type="email"
                value={guestData.email}
                onChange={(e) => setGuestData({...guestData, email: e.target.value})}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label className="text-zinc-300">Phone</Label>
              <Input
                type="tel"
                value={guestData.phone}
                onChange={(e) => setGuestData({...guestData, phone: e.target.value})}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-emerald-400" />
              Shipping Address
            </h3>

            <div>
              <Label className="text-zinc-300">Address Line 1 *</Label>
              <Input
                value={guestData.shippingAddress.addressLine1}
                onChange={(e) => setGuestData({
                  ...guestData, 
                  shippingAddress: {...guestData.shippingAddress, addressLine1: e.target.value}
                })}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                required
              />
            </div>

            <div>
              <Label className="text-zinc-300">Address Line 2 (Optional)</Label>
              <Input
                value={guestData.shippingAddress.addressLine2}
                onChange={(e) => setGuestData({
                  ...guestData, 
                  shippingAddress: {...guestData.shippingAddress, addressLine2: e.target.value}
                })}
                className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">City *</Label>
                <Input
                  value={guestData.shippingAddress.city}
                  onChange={(e) => setGuestData({
                    ...guestData, 
                    shippingAddress: {...guestData.shippingAddress, city: e.target.value}
                  })}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-300">State *</Label>
                <Input
                  value={guestData.shippingAddress.state}
                  onChange={(e) => setGuestData({
                    ...guestData, 
                    shippingAddress: {...guestData.shippingAddress, state: e.target.value}
                  })}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-zinc-300">Postal Code *</Label>
                <Input
                  value={guestData.shippingAddress.postalCode}
                  onChange={(e) => setGuestData({
                    ...guestData, 
                    shippingAddress: {...guestData.shippingAddress, postalCode: e.target.value}
                  })}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  required
                />
              </div>
              <div>
                <Label className="text-zinc-300">Country</Label>
                <Input
                  value={guestData.shippingAddress.country}
                  onChange={(e) => setGuestData({
                    ...guestData, 
                    shippingAddress: {...guestData.shippingAddress, country: e.target.value}
                  })}
                  className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
                  placeholder="US"
                />
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div>
            <Label className="text-zinc-300">Order Notes (Optional)</Label>
            <Textarea
              value={guestData.notes}
              onChange={(e) => setGuestData({...guestData, notes: e.target.value})}
              className="bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400"
              placeholder="Any special instructions for your order..."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue to Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
