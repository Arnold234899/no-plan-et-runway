
export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Brand Ambassador Lerai - Urban Edge",
      image: "/lovable-uploads/4719e223-3912-42a7-91f1-b5678c5fa238.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 2,
      title: "Brand Ambassador Lerai - Industrial Chic",
      image: "/lovable-uploads/601bed96-1515-4246-867f-4a8583901394.png",
      type: "Brand Ambassador Feature",
    },
  ];

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Gallery
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
            A glimpse into our creative process, collaborations, and the movement we're building.
          </p>
          <div className="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">
              Featuring Brand Ambassador Lerai
            </h3>
            <p className="text-zinc-300">
              Celebrating our partnership with Lerai, embodying the spirit of conscious fashion and sustainable style.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-yellow-400/20"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <p className="text-yellow-400 text-sm mb-2 font-semibold uppercase tracking-wider">
                      {item.type}
                    </p>
                    <h3 className="font-bold text-2xl mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      Sustainable fashion meets urban style
                    </p>
                  </div>
                </div>

                {/* Professional overlay accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-2 border-yellow-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-yellow-400/20 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional branding footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-zinc-400">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <span className="text-sm uppercase tracking-widest font-medium">NO PLAN-ET B</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-yellow-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
