import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Github, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { getProjectById, getProjects, Project } from '../services/dataService';
import { englishPortfolio, vietnamesePortfolio, PortfolioLanguage } from '../utils/portfolioTranslations';
import { getTechnologyClass } from '../utils/technologyColors';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [language, setLanguage] = useState<PortfolioLanguage>(() => {
    try {
      return localStorage.getItem('portfolio_language') === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('portfolio_language', language);
  }, [language]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      setImageFailed(false);
      try {
        const [targetProject, projectsList] = await Promise.all([
          id ? getProjectById(id) : null,
          getProjects(),
        ]);
        if (isMounted) {
          setProject(targetProject);
          setAllProjects(projectsList);
        }
      } catch (err) {
        console.error('Error fetching project detail:', err);
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

  const t = language === 'en' ? englishPortfolio.projects : vietnamesePortfolio.projects;
  const english = language === 'en';

  // Calculate prev and next projects
  const currentIndex = allProjects.findIndex((p) => String(p.id) === String(id));
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="portfolio-studio min-h-screen bg-background text-secondary selection:bg-accent selection:text-black font-sans relative overflow-x-hidden">
      {/* Header */}
      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10 border-b border-subtle/50">
        <div className="flex items-center gap-4">
          <Link
            to="/#projects"
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
      <main className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="font-sans text-sm font-medium text-secondary animate-pulse">
              {t.loading}
            </span>
          </div>
        ) : !project ? (
          <div className="rounded-[2rem] border border-dashed border-subtle-hover bg-surface/70 px-6 py-20 text-center">
            <h2 className="font-display text-2xl font-bold text-primary mb-3">
              {t.notFound}
            </h2>
            <p className="text-secondary mb-8">
              {english
                ? 'The project you are looking for does not exist or may have been removed.'
                : 'Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
            </p>
            <button
              onClick={() => navigate('/#projects')}
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
            {/* Project Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-bold tracking-wider text-accent border border-accent/20">
                  {currentIndex >= 0
                    ? `PROJECT ${String(currentIndex + 1).padStart(2, '0')}`
                    : 'PROJECT'}
                </span>
                {project.createdAt && (
                  <span className="font-mono text-xs text-muted">
                    {new Date(project.createdAt).toLocaleDateString(english ? 'en-US' : 'vi-VN', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight mb-6">
                {project.name}
              </h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-xs font-semibold text-background shadow-md hover:opacity-90 transition-all hover:scale-[1.02]"
                  >
                    <ExternalLink size={15} />
                    <span>{t.visitLive}</span>
                    <ArrowUpRight size={14} className="opacity-70" />
                  </a>
                )}
                {project.sourceCode && (
                  <a
                    href={project.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-subtle-hover bg-surface px-6 py-3 font-mono text-xs font-semibold text-primary hover:border-accent hover:text-accent transition-all hover:scale-[1.02]"
                  >
                    <Github size={15} />
                    <span>{t.viewSource}</span>
                    <ArrowUpRight size={14} className="opacity-70" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Image Showcase */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-subtle bg-surface shadow-lg">
              {(!project.imageUrl || imageFailed) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-surface to-background">
                  <span className="font-display text-3xl md:text-5xl font-bold tracking-tight text-primary/80 text-center">
                    {project.name}
                  </span>
                  <span className="mt-4 font-mono text-xs text-muted">
                    {english ? 'Project Preview' : 'Xem trước dự án'}
                  </span>
                </div>
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover object-top"
                />
              )}
            </div>

            {/* Project Overview / Pain Point */}
            <div className="rounded-[2rem] border border-subtle bg-surface/80 p-8 md:p-10 shadow-sm backdrop-blur-sm">
              <h2 className="font-display text-xl font-bold text-primary mb-4 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent text-sm font-bold">
                  01
                </span>
                {t.overview}
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-secondary whitespace-pre-line">
                {project.painPoint}
              </div>
            </div>

            {/* Tech Stack Section */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="rounded-[2rem] border border-subtle bg-surface/80 p-8 md:p-10 shadow-sm backdrop-blur-sm">
                <h2 className="font-display text-xl font-bold text-primary mb-6 flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent text-sm font-bold">
                    02
                  </span>
                  {t.techUsed}
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`tech-brand tech-chip rounded-full border px-4 py-2 font-mono text-xs md:text-sm font-semibold transition-all ${getTechnologyClass(
                        tech
                      )}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Next / Previous Project Navigation */}
            <div className="pt-8 border-t border-subtle">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevProject ? (
                  <Link
                    to={`/projects/${prevProject.id}`}
                    className="group flex flex-col p-5 rounded-2xl border border-subtle bg-surface/60 hover:border-accent hover:bg-surface transition-all"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      <ChevronLeft size={16} />
                      {t.prevProject}
                    </span>
                    <span className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                      {prevProject.name}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.id}`}
                    className="group flex flex-col items-end text-right p-5 rounded-2xl border border-subtle bg-surface/60 hover:border-accent hover:bg-surface transition-all sm:col-start-2"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted group-hover:text-accent transition-colors">
                      {t.nextProject}
                      <ChevronRight size={16} />
                    </span>
                    <span className="font-display text-base font-bold text-primary group-hover:text-accent transition-colors mt-1 line-clamp-1">
                      {nextProject.name}
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
