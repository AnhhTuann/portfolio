import { useState, useEffect } from 'react';
import { getArtworks, Artwork } from '../services/dataService';

export default function ArtisticVision() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      const data = await getArtworks();
      setArtworks(data);
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-8 h-8 border-t-2 border-[#FFC107]/20 border-r-2 border-r-[#FFC107] rounded-full animate-spin"></div>
        <span className="font-sans text-xs tracking-[0.4em] text-gray-500 animate-pulse uppercase">
          LOADING VISION...
        </span>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-sans text-xs tracking-[0.3em] text-gray-600 uppercase">
          [ NO ARTWORKS FOUND ]
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((art) => (
        <div 
          key={art.id} 
          className="relative group overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] cursor-pointer aspect-auto"
        >
          {/* Image */}
          <img
            src={art.imageUrl || '#'}
            alt={art.title}
            className="w-full h-[500px] object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          
          {/* Gradient Overlay để nổi bật chữ */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Content trượt lên khi Hover */}
          <div className="absolute bottom-0 left-0 w-full p-8 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end opacity-0 group-hover:opacity-100">
            <h3 className="font-serif text-3xl text-[#FFC107] mb-3 font-medium italic drop-shadow-lg">
              {art.title}
            </h3>
            <p className="font-sans text-sm text-gray-300 font-light leading-relaxed">
              {art.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
