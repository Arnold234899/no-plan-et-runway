export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Brand Ambassador Lerai - Style Statement",
      image: "/lovable-uploads/b6e15c48-3ee5-47d5-91f3-7c3bea348a6a.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 2,
      title: "Brand Ambassador Lerai - Fashion Forward",
      image: "/lovable-uploads/92174a9d-2efd-4362-8157-5d5b355093c4.png",
      type: "Brand Ambassador Feature",
    },
    {
      id: 3,
      title: "FW23 Runway Show",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
      type: "Fashion Show",
    },
    {
      id: 4,
      title: "Sustainable Studio",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      type: "Behind the Scenes",
    },
    {
      id: 5,
      title: "Eco-Process",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop",
      type: "Process",
    },
    {
      id: 6,
      title: "Street Style",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop",
      type: "Street Style",
    },
    {
      id: 7,
      title: "Artist Collaboration",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=600&fit=crop",
      type: "Collaboration",
    },
    {
      id: 8,
      title: "Campaign Shoot",
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=400&fit=crop",
      type: "Campaign",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 
                index === 1 ? 'md:col-span-2 md:row-span-2' : 
                index === 2 || index === 4 ? 'md:row-span-2' : ''
              }`}
            >
              <div className={`${
                index === 0 || index === 1 ? 'aspect-[4/3]' : 
                index === 2 || index === 4 ? 'aspect-[3/4]' : 'aspect-[4/3]'
              } overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`w-full h-full group-hover:scale-110 transition-transform duration-700 ${
                    index === 0 || index === 1 ? 'object-cover object-center' : 'object-cover'
                  }`}
                  style={(index === 0 || index === 1) ? { objectPosition: 'center 20%' } : {}}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className={`text-zinc-300 text-sm mb-1 ${index === 0 || index === 1 ? 'text-yellow-400 font-semibold' : ''}`}>
                    {item.type}
                  </p>
                  <h3 className={`font-semibold ${index === 0 || index === 1 ? 'text-2xl' : 'text-xl'}`}>
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
