import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Artwork, getArtworks } from '../services/dataService';
import { englishPortfolio, PortfolioLanguage } from '../utils/portfolioTranslations';

export default function ArtisticVision({ language }: { language: PortfolioLanguage }) {
  const english = language === 'en';
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
        <span className="font-sans text-sm font-medium text-secondary animate-pulse">
          {english ? englishPortfolio.gallery.loading : 'Đang tải bộ sưu tập...'}
        </span>
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="w-full rounded-[1.75rem] border border-dashed border-subtle-hover bg-surface/70 px-6 py-20 text-center">
        <span className="font-display text-lg font-semibold text-secondary">
          {english ? englishPortfolio.gallery.empty : 'Những tác phẩm mới sẽ xuất hiện ở đây.'}
        </span>
      </div>
    );
  }

  return (
    <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
      {artworks.map((art, idx) => (
        <motion.div
          key={art.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.65, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="studio-art-card group relative mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] border"
        >
          {art.imageUrl && (
            <img
              src={art.imageUrl}
              alt={art.title}
              className="block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}
          <div className="p-5 md:p-6">
            <span className="mb-3 block font-sans text-xs font-bold tracking-[0.08em] text-accent">
              {english ? englishPortfolio.gallery.artwork : 'TÁC PHẨM'}{' '}
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h3 className="mb-2 font-display text-xl font-bold tracking-tight text-primary lg:text-2xl">
              {art.title}
            </h3>
            {art.description && (
              <p className="whitespace-break-spaces font-sans text-sm leading-6 text-secondary">
                {art.description}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
