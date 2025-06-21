
export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "FW23 Runway Show",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
      type: "Fashion Show",
    },
    {
      id: 2,
      title: "Sustainable Studio",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      type: "Behind the Scenes",
    },
    {
      id: 3,
      title: "Urban Collection",
      image: "/lovable-uploads/0905d31a-b001-441b-bb04-07b3ee90a7d3.png",
      type: "Campaign",
    },
    {
      id: 4,
      title: "Studio Portrait",
      image: "/lovable-uploads/c3c00612-53b0-4814-ba26-b7308a5cef69.png",
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
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A glimpse into our creative process, collaborations, and the movement we're building.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-lg cursor-pointer hover:scale-105 transition-transform duration-500 ${
                index === 0 || index === 4 ? 'md:row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 || index === 4 ? 'aspect-[3/4]' : 'aspect-[4/3]'} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-zinc-300 text-sm mb-1">{item.type}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
