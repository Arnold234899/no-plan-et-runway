
import { Mail, Phone, Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 mb-6 tracking-tight leading-tight">
            Get in Touch
          </h2>
          <div className="w-20 h-1 bg-emerald-600 mx-auto mb-8"></div>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Ready to join the sustainable fashion revolution? We'd love to hear from you 
            and help you discover conscious fashion choices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Card className="bg-white border-0 shadow-xl rounded-2xl">
            <CardHeader className="pb-8">
              <CardTitle className="text-zinc-900 text-2xl font-medium">Send us a Message</CardTitle>
              <p className="text-zinc-600">We typically respond within 24 hours</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-zinc-700 text-sm font-medium mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-zinc-700 text-sm font-medium mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-zinc-700 text-sm font-medium mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="What's this about?"
                  className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-zinc-700 text-sm font-medium mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-300"
                />
              </div>
              
              <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 text-lg py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-zinc-900 font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-emerald-600 font-medium">hello@noplanetb.com</p>
                  </div>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  For general inquiries, collaborations, and customer support. 
                  We respond to all emails within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-zinc-900 font-semibold text-lg mb-1">Visit Us</h3>
                    <p className="text-zinc-700">94 Conrad Drive, Blairgowrie</p>
                  </div>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  Our sustainable fashion studio and showroom. 
                  Visit by appointment to see our latest collections.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="text-zinc-900 font-semibold text-xl">Connect With Us</h3>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-2 border-zinc-200 text-zinc-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 py-4 rounded-xl transition-all duration-300"
                onClick={() => window.open('https://instagram.com/no.plan_etb', '_blank')}
              >
                <Instagram className="mr-4 h-5 w-5" />
                Follow us on Instagram @no.plan_etb
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-2 border-zinc-200 text-zinc-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 py-4 rounded-xl transition-all duration-300"
                onClick={() => window.open('https://wa.me/15551234567', '_blank')}
              >
                <MessageCircle className="mr-4 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>

            <Card className="bg-white border-0 shadow-lg rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-zinc-900 font-semibold text-lg">Business Hours</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                    <span className="text-zinc-600">Monday - Friday</span>
                    <span className="text-zinc-900 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-100">
                    <span className="text-zinc-600">Saturday</span>
                    <span className="text-zinc-900 font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-zinc-600">Sunday</span>
                    <span className="text-zinc-900 font-medium">Closed</span>
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
