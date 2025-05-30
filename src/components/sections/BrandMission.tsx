
export const BrandMission = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-blue-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Our <span className="text-emerald-400">Mission</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                <span className="text-emerald-400 font-semibold">NO PLAN-ET B</span> challenges the fashion industry's status quo. 
                We believe that style and sustainability aren't mutually exclusive – they're inseparable.
              </p>
              <p className="text-blue-200">
                Every piece in our collection tells a story of conscious creation, ethical sourcing, 
                and revolutionary design. We're not just making clothes; we're crafting the future.
              </p>
              <p className="text-teal-200">
                From recycled materials to innovative production techniques, we're proving that 
                the most beautiful fashion comes from caring about our planet and its people.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden ring-4 ring-emerald-400/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=600&fit=crop"
                alt="Sustainable Fashion - Eco-conscious clothing by NO PLAN-ET B"
                className="w-full h-full object-cover filter brightness-110 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10"></div>
            </div>
            
            {/* Enhanced floating stats with earth colors */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-emerald-950/90 to-teal-950/90 p-6 rounded-lg border border-emerald-400/30 backdrop-blur-md shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">100%</div>
                <div className="text-emerald-200 text-sm">Sustainable Materials</div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-950/90 to-slate-950/90 p-6 rounded-lg border border-blue-400/30 backdrop-blur-md shadow-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">0</div>
                <div className="text-blue-200 text-sm">Waste Production</div>
              </div>
            </div>
            
            {/* New environmental impact stat */}
            <div className="absolute top-1/2 -left-12 bg-gradient-to-br from-teal-950/90 to-emerald-950/90 p-4 rounded-lg border border-teal-400/30 backdrop-blur-md shadow-2xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">♻️</div>
                <div className="text-teal-200 text-xs">Carbon Neutral</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
