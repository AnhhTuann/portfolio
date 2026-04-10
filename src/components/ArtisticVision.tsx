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
        <div className="w-8 h-8 border-t-2 border-accent/20 border-r-2 border-r-accent rounded-full animate-spin"></div>
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
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {artworks.map((art) => (
        <div 
          key={art.id} 
          className="break-inside-avoid relative group overflow-hidden rounded-md bg-glass border border-subtle cursor-pointer shadow-lg hover:shadow-[0_10px_40px_rgba(255,193,7,0.05)] transition-shadow duration-700"
        >
          {/* Image - now respects original aspect ratio */}
          <img
            src={art.imageUrl || '#'}
            alt={art.title}
            className="w-full h-auto object-cover block transition-transform duration-[2s] ease-out group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
            loading="lazy"
          />
          
          {/* Subtle frame effect */}
          <div className="absolute inset-0 border border-subtle rounded-md pointer-events-none z-20"></div>

          {/* Gradient Overlay để nổi bật chữ nhưng pha ánh tím ma mị */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2e092f] via-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
          
          {/* Content trượt lên khi Hover */}
          <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end opacity-0 group-hover:opacity-100 z-20">
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2 font-medium italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {art.title}
            </h3>
            <p className="font-sans text-xs lg:text-sm text-gray-300 font-light leading-relaxed truncate whitespace-break-spaces">
              {art.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
