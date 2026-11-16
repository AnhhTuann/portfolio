import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { getProjects, Project } from '../services/dataService';
import { Terminal } from 'lucide-react';

export default function DigitalCanvas() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    };

    fetchGallery();
  }, []);

  // Spotlight theo con trỏ chuột
  const handleMouseMove = (e: React.MouseEvent, idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-10 h-10 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <span className="font-mono text-xs tracking-[0.4em] text-muted animate-pulse uppercase">
          [ System Booting... ]
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-xs tracking-[0.3em] text-muted"
        >
          {'>'} 404_PROJECTS_NOT_FOUND
        </motion.span>
      </div>
    );
  }

  return (
    <div className="space-y-40 md:space-y-56">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto`}
        >
          {/* Cột trái: Hình ảnh phối cảnh 3D + spotlight */}
          <div className="w-full lg:w-3/5 relative perspective-1000">
            {/* Hắt sáng lụa không gian */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-[80px] rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-[3s] ease-out z-0" />

            <div
              ref={(el) => { cardRefs.current[idx] = el; }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              className={`relative aspect-[16/10] bg-surface border border-subtle rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-10 transition-all duration-[1s] ease-out ${idx % 2 === 1 ? 'group-hover:rotate-y-[-4deg]' : 'group-hover:rotate-y-[4deg]'} group-hover:translate-z-10 group-hover:border-accent/30 preserve-3d`}
            >
              {/* Lưới kỹ thuật chìm */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-20"></div>

              {/* Spotlight hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"
                style={{ background: 'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.12), transparent 40%)' }}
              />

              {/* Ảnh grayscale -> color */}
              <img
                src={project.imageUrl || '#'}
                alt={project.name}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-[1.5s] ease-out z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/95 via-background/40 dark:from-[#050505]/95 dark:via-[#050505]/40 to-transparent group-hover:opacity-10 transition-opacity duration-1000 z-30" />

              {/* Viền accent chạy quanh khi hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/40 transition-all duration-700 z-40 pointer-events-none" />
            </div>

            {/* Scanline */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/50 shadow-[0_0_15px_var(--accent)] animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none z-40"></div>

            {/* Index watermark */}
            <span className="absolute -bottom-8 left-2 font-display text-[7rem] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary/10 to-transparent select-none pointer-events-none z-0">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Cột phải: Nội dung */}
          <div className="w-full lg:w-2/5 flex flex-col z-20">
            <motion.div
              initial={{ opacity: 0, x: idx % 2 === 1 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 opacity-70">
                <Terminal className="text-accent w-4 h-4" />
                <span className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase">
                  ID: {project.id || `PRJ_0${idx + 1}`}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-5xl text-primary mb-8 font-semibold tracking-tight uppercase leading-tight">
                {project.name}
              </h3>

              <div className="mb-10 pl-4 border-l-2 border-subtle group-hover:border-accent/50 transition-colors duration-700">
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent/70 mb-4 flex items-center gap-2 uppercase">
                  <span className="w-2 h-2 rounded-full bg-accent/50 animate-pulse-dot"></span>
                  THE_PROBLEM
                </span>
                <p className="text-muted font-light leading-relaxed text-sm font-sans w-full lg:w-11/12 group-hover:text-secondary transition-colors">
                  {project.painPoint}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-12">
                {project.techStack?.map((tag, tagIdx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + tagIdx * 0.06 }}
                    className="px-4 py-2 text-xs font-mono tracking-[0.1em] text-secondary bg-glass border border-subtle rounded-lg group-hover:border-accent/30 group-hover:text-accent hover:!bg-accent-soft hover:!text-accent transition-all duration-500 cursor-default"
                  >
                    &lt;{tag}/&gt;
                  </motion.span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6 opacity-60 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-2 group-hover:translate-y-0">
                <a
                  href={project.liveLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 text-xs font-mono tracking-[0.1em] text-secondary hover:text-accent transition-all"
                >
                  <span className="text-accent/50 group-hover/btn:text-accent">&gt;</span> VIEW_LIVE
                </a>
                <a
                  href={project.sourceCode || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center gap-2 text-xs font-mono tracking-[0.1em] text-secondary hover:text-accent transition-all"
                >
                  <span className="text-accent/50 group-hover/btn:text-accent">&gt;</span> SOURCE_CODE
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
