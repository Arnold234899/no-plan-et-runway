
export const BrandMission = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Our Mission
            </h2>
            <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
              <p>
                <span className="text-white font-semibold">NO PLAN-ET B</span> challenges the fashion industry's status quo. 
                We believe that style and sustainability aren't mutually exclusive – they're inseparable.
              </p>
              <p>
                Every piece in our collection tells a story of conscious creation, ethical sourcing, 
                and revolutionary design. We're not just making clothes; we're crafting the future.
              </p>
              <p>
                From recycled materials to innovative production techniques, we're proving that 
                the most beautiful fashion comes from caring about our planet and its people.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=600&fit=crop"
                alt="Sustainable Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-zinc-950 p-6 rounded-lg border border-zinc-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-zinc-400 text-sm">Sustainable Materials</div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-zinc-950 p-6 rounded-lg border border-zinc-800">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-zinc-400 text-sm">Waste Production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
