import { useState, useEffect } from 'react';
import { getProjects, Project } from '../services/dataService';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsGallery() {
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

  // Hiệu ứng Loading đơn giản, tinh tế (Cinematic Loader)
  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-8 h-8 border-t-2 border-white/[0.2] border-r-2 border-r-white rounded-full animate-spin"></div>
        <span className="font-display text-xs tracking-[0.4em] text-gray-500 animate-pulse">
          LOADING SYSTEM...
        </span>
      </div>
    );
  }

  // Trạng thái khi không có dữ liệu
  if (projects.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <span className="font-display text-xs tracking-[0.3em] text-gray-600">
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
          {/* Mockup Image */}
          <div className="w-full lg:w-3/5 relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/[0.02] blur-[50px] rounded-full transform scale-90 group-hover:scale-105 transition-transform duration-[2s] ease-out" />
            
            {/* Image Container */}
            <div className="relative aspect-[16/10] bg-[#0a0a0a] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <img 
                src={project.imageUrl} 
                alt={project.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-[#050505]/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-2/5 flex flex-col z-10">
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 font-medium italic tracking-wide">
              {project.name}
            </h3>
            
            <div className="mb-10">
              <span className="font-display text-[10px] tracking-[0.3em] text-gray-600 mb-4 block">
                THE PAIN POINT
              </span>
              <p className="text-gray-400 font-light leading-relaxed text-lg">
                {project.problem}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.techStack?.map(tag => (
                <span 
                  key={tag} 
                  className="px-4 py-2 text-[10px] font-display tracking-[0.2em] text-gray-400 border border-white/[0.1] bg-white/[0.01] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.01)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] group-hover:border-white/[0.2] group-hover:text-gray-200 transition-all duration-700"
                >
                  [{tag}]
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-8 opacity-30 blur-[3px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-700 ease-out translate-y-4 group-hover:translate-y-0">
              <a 
                href={project.liveUrl || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-display tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> VIEW LIVE
              </a>
              <a 
                href={project.sourceUrl || "#"} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-xs font-display tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
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
