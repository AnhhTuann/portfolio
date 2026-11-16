import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
      {artworks.map((art, idx) => (
        <motion.div
          key={art.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.65, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="studio-art-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border"
        >
          <Link to={`/art/${art.id}`} className="block overflow-hidden focus:outline-none">
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-glass">
              {art.imageUrl ? (
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <span className="font-sans text-sm text-muted">
                  {english ? 'No image' : 'Chưa có ảnh'}
                </span>
              )}
            </div>
          </Link>
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <span className="mb-3 block font-sans text-xs font-bold tracking-[0.08em] text-accent">
              {english ? englishPortfolio.gallery.artwork : 'TÁC PHẨM'}{' '}
              {String(idx + 1).padStart(2, '0')}
            </span>
            <Link to={`/art/${art.id}`} className="transition-colors hover:text-accent">
              <h3 className="mb-2 line-clamp-2 h-16 font-display text-xl font-bold tracking-tight text-primary transition-colors hover:text-accent lg:text-2xl">
                {art.title}
              </h3>
            </Link>
            <div className="h-[7.5rem] overflow-hidden">
              {art.description && (
                <p className="line-clamp-5 whitespace-break-spaces font-sans text-sm leading-6 text-secondary">
                  {art.description}
                </p>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-subtle/60 flex items-center justify-between">
              <Link
                to={`/art/${art.id}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-accent transition-colors hover:opacity-80 underline underline-offset-4 decoration-accent/60"
              >
                <span>{english ? englishPortfolio.gallery.details : 'Xem chi tiết'}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
