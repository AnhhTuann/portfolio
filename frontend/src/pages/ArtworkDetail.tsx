import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, X, Download } from 'lucide-react';
import { getArtworkById, getArtworks, Artwork } from '../services/dataService';
import { englishPortfolio, vietnamesePortfolio, PortfolioLanguage } from '../utils/portfolioTranslations';

export default function ArtworkDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [language, setLanguage] = useState<PortfolioLanguage>(() => {
    try {
      return localStorage.getItem('portfolio_language') === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('portfolio_language', language);
  }, [language]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [targetArt, artworksList] = await Promise.all([
          id ? getArtworkById(id) : null,
          getArtworks(),
        ]);
        if (isMounted) {
          setArtwork(targetArt);
          setAllArtworks(artworksList);
        }
      } catch (err) {
        console.error('Error fetching artwork detail:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      isMounted = false;
    };
  }, [id]);

  const t = language === 'en' ? englishPortfolio.gallery : vietnamesePortfolio.gallery;
  const english = language === 'en';

  const currentIndex = allArtworks.findIndex((a) => String(a.id) === String(id));
  const prevArtwork = currentIndex > 0 ? allArtworks[currentIndex - 1] : null;
  const nextArtwork = currentIndex >= 0 && currentIndex < allArtworks.length - 1 ? allArtworks[currentIndex + 1] : null;

  return (
    <div className="portfolio-studio min-h-screen bg-background text-secondary selection:bg-accent selection:text-black font-sans relative overflow-x-hidden">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && artwork?.imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Đóng xem ảnh"
            >
              <X size={22} />
            </button>
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10 border-b border-subtle/50">
        <div className="flex items-center gap-4">
          <Link
            to="/#gallery"
            className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-accent transition-colors py-1.5 px-3 rounded-full border border-subtle hover:border-accent"
          >
            <ArrowLeft size={16} />
            <span>{t.back}</span>
          </Link>
        </div>

        <Link to="/" className="font-display text-xl font-bold tracking-tight text-primary">
          AT<span className="text-accent">.</span>
        </Link>

        {/* Language switch */}
        <div
          role="group"
          aria-label={english ? englishPortfolio.languageLabel : 'Chọn ngôn ngữ'}
          className="flex shrink-0 items-center rounded-full border border-subtle p-1"
        >
          {(['vi', 'en'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={language === option}
              onClick={() => setLanguage(option)}
              className={`rounded-full px-3 py-1 font-mono text-xs font-semibold uppercase transition-all ${
                language === option
                  ? 'bg-primary text-background shadow-sm'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="font-sans text-sm font-medium text-secondary animate-pulse">
              {t.loading}
            </span>
          </div>
        ) : !artwork ? (
          <div className="rounded-[2rem] border border-dashed border-subtle-hover bg-surface/70 px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-bold text-primary mb-3">
              {t.notFound}
            </h2>
            <p className="text-secondary mb-8">
              {english
                ? 'The artwork you are looking for does not exist or may have been removed.'
                : 'Tác phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
            </p>
            <button
              onClick={() => navigate('/#gallery')}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-background hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={16} />
              {t.backHome}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Gallery Grid: Left Image, Right Story */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Artwork Media Frame */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative group overflow-hidden rounded-[2rem] border border-subtle bg-glass shadow-lg flex items-center justify-center min-h-[360px] md:min-h-[500px]">
                  {artwork.imageUrl ? (
                    <>
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="max-h-[75vh] w-full object-contain cursor-zoom-in transition-transform duration-700 group-hover:scale-[1.02]"
                        onClick={() => setIsLightboxOpen(true)}
                      />
                      <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-surface/90 px-4 py-2 text-xs font-semibold text-primary shadow-md backdrop-blur-sm hover:bg-surface transition-all border border-subtle"
                      >
                        <Maximize2 size={14} />
                        <span>{english ? 'Zoom' : 'Phóng to'}</span>
                      </button>
                    </>
                  ) : (
                    <span className="font-sans text-sm text-muted">
                      {english ? 'No image available' : 'Chưa có ảnh'}
                    </span>
                  )}
                </div>

                {/* Direct image action */}
                {artwork.imageUrl && (
                  <div className="flex justify-end">
                    <a
                      href={artwork.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors"
                    >
                      <Download size={13} />
                      <span>{english ? 'View high resolution' : 'Xem ảnh độ phân giải gốc'}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Artwork Information */}
              <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-accent-soft px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-accent border border-accent/20">
                      {currentIndex >= 0
                        ? `${t.artwork} ${String(currentIndex + 1).padStart(2, '0')}`
                        : t.artwork}
                    </span>
                    {artwork.createdAt && (
                      <span className="font-mono text-xs text-muted">
                        {new Date(artwork.createdAt).toLocaleDateString(
                          english ? 'en-US' : 'vi-VN',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </span>
                    )}
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-primary leading-tight">
                    {artwork.title}
                  </h1>
                </div>

                {/* Story / Description */}
                <div className="rounded-[1.75rem] border border-subtle bg-surface/80 p-6 md:p-8 shadow-sm backdrop-blur-sm">
                  <h2 className="font-display text-base font-bold text-primary mb-3 flex items-center gap-2 text-accent">
                    <span>✳</span>
                    {t.story}
                  </h2>
                  <div className="font-sans text-base leading-relaxed text-secondary whitespace-pre-line">
                    {artwork.description || (
                      <span className="italic text-muted">
                        {english
                          ? 'No detailed description provided for this artwork.'
                          : 'Chưa có phần giới thiệu chi tiết cho tác phẩm này.'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Next / Previous Artwork Navigation */}
            <div className="pt-8 border-t border-subtle">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArtwork ? (
                  <Link
                    to={`/art/${prevArtwork.id}`}
                    className="group flex flex-col p-5 rounded-2xl border border-subtle bg-surface/60 hover:border-accent hover:bg-surface transition-all"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      <ChevronLeft size={16} />
                      {t.prevArtwork}
                    </span>
                    <span className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                      {prevArtwork.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextArtwork && (
                  <Link
                    to={`/art/${nextArtwork.id}`}
                    className="group flex flex-col items-end text-right p-5 rounded-2xl border border-subtle bg-surface/60 hover:border-accent hover:bg-surface transition-all sm:col-start-2"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      {t.nextArtwork}
                      <ChevronRight size={16} />
                    </span>
                    <span className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                      {nextArtwork.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-5 py-8 text-center text-xs text-muted md:px-10 border-t border-subtle/40 mt-12">
        <p>
          {english ? englishPortfolio.footer : 'Thiết kế & phát triển bởi'} Nguyễn Đức Anh Tuấn{' '}
          <span className="text-accent">✳</span> © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
