
export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Brand Ambassador Lerai - Sustainable Fashion Icon",
      image: "/lovable-uploads/b6e15c48-3ee5-47d5-91f3-7c3bea348a6a.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 2,
      title: "Brand Ambassador Lerai - Conscious Style Leader",
      image: "/lovable-uploads/92174a9d-2efd-4362-8157-5d5b355093c4.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 3,
      title: "Brand Ambassador Lerai - Contemporary Street Style",
      image: "/lovable-uploads/795c525b-bac1-414a-8fd5-b78d5316ab6c.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 4,
      title: "Brand Ambassador Lerai - Artistic Fashion Expression",
      image: "/lovable-uploads/254de182-44ca-4998-9068-3d79305bab6f.png",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ objectPosition: 'center 30%' }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-yellow-400 text-sm mb-1 font-semibold uppercase tracking-wide">
                    {item.type}
                  </p>
                  <h3 className="font-semibold text-xl leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
