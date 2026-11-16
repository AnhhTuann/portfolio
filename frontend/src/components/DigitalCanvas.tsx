import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getProjects, Project } from '../services/dataService';
import { ArrowUpRight } from 'lucide-react';
import { getTechnologyClass } from '../utils/technologyColors';

function ProjectCover({ project, index }: { project: Project; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const background = index % 3 === 1 ? 'bg-[#c6b8ee]' : index % 3 === 2 ? 'bg-[#d5e4ad]' : 'bg-[#f7b2a1]';

  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[1.75rem] ${background}`}>
      {(!project.imageUrl || imageFailed) && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <span className="font-display text-center text-4xl font-bold tracking-tight text-slate-950/80 md:text-6xl">
            {project.name}
          </span>
        </div>
      )}
      {project.imageUrl && !imageFailed && (
        <img
          src={project.imageUrl}
          alt={project.name}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="relative z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      <span className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-slate-950">
        PROJECT {String(index + 1).padStart(2, '0')}
      </span>
      <span className="absolute bottom-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 shadow-md transition-transform group-hover:rotate-45">
        <ArrowUpRight size={20} />
      </span>
    </div>
  );
}

export default function DigitalCanvas() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <span className="font-sans text-sm font-medium text-secondary animate-pulse">
          Đang tải dự án...
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full rounded-[1.75rem] border border-dashed border-subtle-hover bg-surface/70 px-6 py-20 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-display text-lg font-semibold text-secondary"
        >
          Dự án mới sẽ sớm được cập nhật ở đây.
        </motion.span>
      </div>
    );
  }

  return (
    <div className="space-y-14 md:space-y-20">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`group mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14 ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
        >
          <ProjectCover project={project} index={idx} />

          <div className="flex flex-col px-1 py-2 lg:px-3">
            <span className="mb-4 flex flex-wrap gap-x-2 text-sm font-bold tracking-normal">
              {project.techStack?.length
                ? project.techStack.slice(0, 2).map((technology, index) => (
                  <span key={technology} className={`tech-brand ${getTechnologyClass(technology)}`}>
                    {index > 0 && <span className="mr-2 text-muted">·</span>}{technology}
                  </span>
                ))
                : <span className="text-accent">Selected project</span>}
            </span>
            <h3 className="mb-5 font-display text-3xl font-bold leading-tight tracking-tight text-primary md:text-4xl">
              {project.name}
            </h3>
            <p className="max-w-xl text-base leading-7 text-secondary">
              {project.painPoint}
            </p>
            {project.techStack?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <span key={tag} className={`tech-brand tech-chip rounded-full border px-3.5 py-2 text-sm font-semibold ${getTechnologyClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent">
                  Xem dự án <ArrowUpRight size={16} />
                </a>
              )}
              {project.sourceCode && (
                <a href={project.sourceCode} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent">
                  Mã nguồn <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
