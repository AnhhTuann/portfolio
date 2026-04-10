import { useState, useEffect } from 'react';
import { getProjects, Project } from '../services/dataService';
import { ExternalLink, Github, Terminal } from 'lucide-react';

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
        <div className="w-8 h-8 border-t-2 border-[#FFC107]/20 border-r-2 border-r-[#FFC107] rounded-full animate-spin"></div>
        <span className="font-sans text-xs tracking-[0.4em] text-gray-500 animate-pulse uppercase">
          [System Booting...]
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-sans text-xs tracking-[0.3em] text-gray-600 font-mono">
          {'>'} 404_PROJECTS_NOT_FOUND
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-48">
      {projects.map((project, idx) => (
        <div 
          key={project.id} 
          className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto`}
        >
          {/* Cột trái: Hình ảnh phối cảnh 3D */}
          <div className="w-full lg:w-3/5 relative perspective-1000">
            {/* Hắt sáng lụa không gian (Cyberpunk Glow) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/10 to-[#8B5CF6]/10 blur-[80px] rounded-full transform scale-90 group-hover:scale-110 transition-transform duration-[3s] ease-out z-0" />
            
            <div className={`relative aspect-[16/10] bg-surface border border-subtle rounded-xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 transition-all duration-[1s] ease-out ${idx % 2 === 1 ? 'group-hover:rotate-y-[-5deg]' : 'group-hover:rotate-y-[5deg]'} group-hover:translate-z-10 group-hover:border-[#3B82F6]/30 preserve-3d`}>
              {/* Lưới kỹ thuật chìm */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-20"></div>

              {/* Ảnh với hiệu ứng grayscale -> color khi hover */}
              <img 
                src={project.imageUrl || '#'} 
                alt={project.name} 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-[1.5s] ease-out z-10 relative"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-surface/95 via-surface/40 dark:from-[#050505]/95 dark:via-[#050505]/40 to-transparent group-hover:opacity-20 transition-opacity duration-1000 z-30" />
            </div>
            
            {/* Hiệu ứng tia lướt nhẹ dọc ảnh (scanline) */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#3B82F6]/40 shadow-[0_0_15px_#3B82F6] animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none z-40"></div>
          </div>

          {/* Cột phải: Nội dung kỹ thuật */}
          <div className="w-full lg:w-2/5 flex flex-col z-20">
            {/* Tên dự án: phong cách kỹ thuật */}
            <div className="flex items-center gap-3 mb-6 opacity-60">
              <Terminal className="text-[#FFC107] w-4 h-4" />
              <span className="font-mono text-[10px] text-[#FFC107] tracking-[0.3em] uppercase">
                ID: {project.id || `PRJ_0${idx+1}`}
              </span>
            </div>

            <h3 className="font-sans text-4xl md:text-5xl text-primary mb-8 font-semibold tracking-tight uppercase">
              {project.name}
            </h3>
            
            <div className="mb-10 pl-4 border-l-2 border-subtle group-hover:border-[#3B82F6]/40 transition-colors duration-700">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#3B82F6]/70 mb-4 flex items-center gap-2 uppercase">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]/30 animate-pulse"></span>
                THE_PAIN_POINT
              </span>
              <p className="text-muted font-light leading-relaxed text-sm font-sans w-full lg:w-11/12 group-hover:text-secondary transition-colors">
                {project.painPoint}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {project.techStack?.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 text-[9px] font-mono tracking-[0.1em] text-muted bg-glass border border-subtle rounded-sm group-hover:border-[#FFC107]/30 group-hover:text-[#FFC107]/80 hover:!bg-[#FFC107]/10 hover:!text-[#FFC107] transition-all duration-500"
                >
                  &lt;{tag}/&gt;
                </span>
              ))}
            </div>

            {/* Nút bấm Terminal */}
            <div className="flex gap-6 opacity-60 group-hover:opacity-100 transition-all duration-700 ease-out translate-y-2 group-hover:translate-y-0">
              <a 
                href={project.liveLink || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 text-xs font-mono tracking-[0.1em] text-secondary hover:text-[#FFC107] transition-all"
              >
                <span className="text-[#FFC107]/50 group-hover/btn:text-[#FFC107]">&gt;</span> VIEW_LIVE
              </a>
              <a 
                href={project.sourceCode || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center gap-2 text-xs font-mono tracking-[0.1em] text-secondary hover:text-[#FFC107] transition-all"
              >
                <span className="text-[#FFC107]/50 group-hover/btn:text-[#FFC107]">&gt;</span> SOURCE_CODE
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
