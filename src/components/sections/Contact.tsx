
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Ready to join the fashion revolution? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-zinc-300 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-zinc-300 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
                />
              </div>
              
              <Button className="w-full bg-white text-zinc-950 hover:bg-zinc-100 text-lg py-3">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                    <p className="text-zinc-400">hello@noplanetb.com</p>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm">
                  For general inquiries, collaborations, and customer support
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-zinc-800 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Call Us</h3>
                    <p className="text-zinc-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <p className="text-zinc-500 text-sm">
                  Available Monday - Friday, 9 AM - 6 PM EST
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Connect Instantly</h3>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-zinc-600 text-white hover:bg-zinc-800"
                onClick={() => window.open('https://instagram.com/noplanetb', '_blank')}
              >
                <Instagram className="mr-3 h-5 w-5" />
                Follow us on Instagram
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-zinc-600 text-white hover:bg-zinc-800"
                onClick={() => window.open('https://wa.me/15551234567', '_blank')}
              >
                <MessageCircle className="mr-3 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
