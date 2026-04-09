import { useState, useEffect } from 'react';
import { getArtworks, Artwork } from '../services/dataService';

export default function ArtworksGallery() {
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

  // Hiệu ứng Loading đơn giản, tinh tế (Cinematic Loader)
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-8 h-8 border-t-2 border-white/[0.2] border-r-2 border-r-white rounded-full animate-spin"></div>
        <span className="font-display text-xs tracking-[0.4em] text-gray-500 animate-pulse">
          LOADING GALLERY...
        </span>
      </div>
    );
  }

  // Trạng thái khi không có dữ liệu
  if (artworks.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-display text-xs tracking-[0.3em] text-gray-600">
          [ NO ARTWORKS FOUND ]
        </span>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 gap-12 space-y-12">
      {artworks.map((art) => (
        <div 
          key={art.id} 
          className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.05] cursor-pointer"
        >
          {/* Image with slow scale effect */}
          <img
            src={art.imageUrl}
            alt={art.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100"
          />
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Content on Hover */}
          <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out flex flex-col justify-end opacity-0 group-hover:opacity-100">
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-3 font-medium italic">
              {art.title}
            </h3>
            <p className="font-sans text-sm text-gray-500 font-light">
              {art.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
