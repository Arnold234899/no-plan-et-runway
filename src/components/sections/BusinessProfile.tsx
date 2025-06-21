
import { Building2, Users, Award, Target, MapPin, Factory } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BusinessProfile = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Business <span className="text-blue-600 dark:text-blue-400">Profile</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            No Plan-etB (Pty) Ltd - Leading sustainable fashion innovation in South Africa
          </p>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-2 border-blue-200/50 dark:border-blue-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Building2 className="text-blue-600 dark:text-blue-400" />
                About the Brand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">No Plan-etB (Pty) Ltd</strong> specializes in high-quality, 
                sustainable fashion—particularly denim pieces. Each item is a one-of-a-kind creation made from 
                locally sourced materials with edgy, unique designs that reflect our commitment to environmental responsibility.
              </p>
              <p>
                As awareness around the environmental impact of fast fashion grows, especially among younger 
                generations, we're addressing the market gap in South Africa by offering conscious consumers 
                an ethical alternative to mass-produced imports.
              </p>
              <p>
                We collaborate with and stock pieces from other local designers who share our sustainable 
                fashion vision, expanding creativity and variety within our store.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Current Operations */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="text-emerald-600 dark:text-emerald-400" />
                Current Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Retail Store:</strong> Blairgowrie location serving diverse clientele
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Manufacturing:</strong> Facility in Kempton Park for local production
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Distribution:</strong> Supply to select boutiques across South Africa
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Base */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="text-purple-600 dark:text-purple-400" />
                Customer Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Students',
                  'Tourists', 
                  'Stylists',
                  'Celebrities',
                  'Performers',
                  'Models',
                  'General Public',
                  'Boutiques'
                ].map((customer, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{customer}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What We Bring */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="text-orange-600 dark:text-orange-400" />
                Value Proposition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                No Plan-etB brings a fresh, creative edge to retail environments, offering a 
                fun, fashion-forward alternative to mainstream brands.
              </p>
              <p>
                We appeal to style-conscious shoppers who care about sustainability and 
                support local production over mass-produced imports.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="text-red-600 dark:text-red-400" />
                Vision & Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Vision:</strong> To become one of South Africa's 
                most sought-after sustainable fashion brands.
              </p>
              <p>
                <strong className="text-foreground">Key Goal:</strong> Open a second retail location 
                by mid-next year, continuing to grow our presence and impact.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Details */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/50 dark:to-emerald-950/50 border-2 border-blue-200/50 dark:border-blue-800/50">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">No Plan-etB (Pty) Ltd</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>94 Conrad Drive, Blairgowrie</span>
                </div>
                <div className="flex items-center gap-2">
                  <Factory className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Manufacturing: Kempton Park</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Follow us on Instagram: 
                <a 
                  href="https://instagram.com/no.plan_etb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  @no.plan_etb
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
