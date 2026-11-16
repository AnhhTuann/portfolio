import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <span className="font-mono text-xs tracking-[0.4em] text-muted animate-pulse uppercase">
          [ Loading Vision... ]
        </span>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
          [ NO ARTWORKS FOUND ]
        </span>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {artworks.map((art, idx) => (
        <motion.div
          key={art.id}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: (idx % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="break-inside-avoid relative group overflow-hidden rounded-xl bg-glass border border-subtle cursor-pointer shadow-lg hover:shadow-[0_10px_40px_rgba(255,193,7,0.08)] hover:border-accent/30 transition-all duration-700"
        >
          {/* Index tag */}
          <span className="absolute top-4 left-4 z-30 font-mono text-[10px] tracking-[0.2em] text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {String(idx + 1).padStart(2, '0')}
          </span>

          <img
            src={art.imageUrl || '#'}
            alt={art.title}
            className="w-full h-auto object-cover block transition-transform duration-[2s] ease-out group-hover:scale-[1.04] opacity-80 group-hover:opacity-100"
            loading="lazy"
          />

          {/* Subtle frame effect */}
          <div className="absolute inset-0 border border-subtle rounded-xl pointer-events-none z-20 group-hover:border-accent/20 transition-colors duration-700"></div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#2e092f] via-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

          {/* Content trượt lên khi Hover */}
          <div className="absolute bottom-0 left-0 w-full p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out flex flex-col justify-end opacity-0 group-hover:opacity-100 z-20">
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-2 font-medium italic drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {art.title}
            </h3>
            <p className="font-sans text-xs lg:text-sm text-gray-300 font-light leading-relaxed whitespace-break-spaces">
              {art.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
