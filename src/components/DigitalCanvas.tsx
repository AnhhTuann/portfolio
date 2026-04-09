import { useState, useEffect } from 'react';
import { getProjects, Project } from '../services/dataService';
import { ExternalLink, Github } from 'lucide-react';

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
          Loading Canvas...
        </span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-sans text-xs tracking-[0.3em] text-gray-600">
          [ NO PROJECTS FOUND ]
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-40">
      {projects.map((project, idx) => (
        <div 
          key={project.id} 
          className={`group relative flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto`}
        >
          {/* Cột trái: Hình ảnh */}
          <div className="w-full lg:w-3/5 relative">
            <div className="absolute inset-0 bg-[#FFC107]/5 blur-[60px] rounded-full transform scale-90 group-hover:scale-105 transition-transform duration-[2s] ease-out" />
            
            <div className="relative aspect-[16/10] bg-[#0a0a0a] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              {/* Ảnh với hiệu ứng grayscale -> color khi hover */}
              <img 
                src={project.imageUrl || '#'} 
                alt={project.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/90 via-[#050505]/40 to-transparent opacity-60 group-hover:opacity-10 transition-opacity duration-1000" />
            </div>
          </div>

          {/* Cột phải: Nội dung */}
          <div className="w-full lg:w-2/5 flex flex-col z-10">
            {/* Tên dự án: Serif, Italic */}
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 font-medium italic tracking-wide">
              {project.name}
            </h3>
            
            <div className="mb-10">
              <span className="font-sans text-[10px] tracking-[0.3em] text-gray-500 mb-4 block uppercase font-medium">
                THE PAIN POINT
              </span>
              <p className="text-gray-400 font-light leading-relaxed text-lg font-sans">
                {project.painPoint}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.techStack?.map(tag => (
                <span 
                  key={tag} 
                  className="px-4 py-2 text-[10px] font-sans uppercase tracking-[0.2em] text-[#FFC107]/80 border border-[#FFC107]/20 bg-[#FFC107]/[0.02] rounded-full shadow-[0_0_10px_rgba(255,193,7,0.02)] group-hover:shadow-[0_0_15px_rgba(255,193,7,0.1)] group-hover:border-[#FFC107]/50 group-hover:text-[#FFC107] transition-all duration-700"
                >
                  [{tag}]
                </span>
              ))}
            </div>

            {/* Nút bấm */}
            <div className="flex gap-8 opacity-40 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 ease-out translate-y-4 group-hover:translate-y-0">
              <a 
                href={project.liveLink || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-sans tracking-[0.2em] text-gray-300 hover:text-[#FFC107] transition-colors uppercase font-medium"
              >
                <ExternalLink className="w-4 h-4" /> VIEW LIVE
              </a>
              <a 
                href={project.sourceCode || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-sans tracking-[0.2em] text-gray-300 hover:text-[#FFC107] transition-colors uppercase font-medium"
              >
                <Github className="w-4 h-4" /> SOURCE CODE
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
