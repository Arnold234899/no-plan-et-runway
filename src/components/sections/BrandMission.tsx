
export const BrandMission = () => {
  return (
    <section id="about" className="py-24 px-6 sm:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-900 tracking-tight leading-tight">
                Our Story
              </h2>
              <div className="w-20 h-1 bg-emerald-600"></div>
            </div>
            
            <div className="space-y-6 text-lg text-zinc-700 leading-relaxed">
              <p className="text-xl font-medium text-zinc-900">
                Redefining fashion through conscious creation.
              </p>
              
              <p>
                <span className="font-semibold text-emerald-600">NO PLAN-ET B</span> challenges 
                the fashion industry's status quo. We believe that style and sustainability 
                aren't mutually exclusive – they're inseparable.
              </p>
              
              <p>
                Every piece in our collection tells a story of:
              </p>
              
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3">•</span>
                  <span>Conscious creation and ethical sourcing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3">•</span>
                  <span>Revolutionary design and innovation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3">•</span>
                  <span>Care for our planet and its people</span>
                </li>
              </ul>
              
              <p className="font-medium text-zinc-900">
                We're not just making clothes; we're crafting the future of fashion.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&h=600&fit=crop"
                alt="Sustainable fashion design process showing eco-friendly materials and ethical production methods"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
                <div className="text-zinc-600 text-sm font-medium">Sustainable Materials</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-8 rounded-2xl shadow-xl border border-zinc-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">0</div>
                <div className="text-zinc-600 text-sm font-medium">Waste Production</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
