import { useState, useEffect } from 'react';
import { getSkillsData, SkillCategory } from './SkillsManager';

export default function TechnicalMastery() {
  const [skills, setSkills] = useState<SkillCategory[]>(() => getSkillsData());

  useEffect(() => {
    const handleStorage = () => {
      setSkills(getSkillsData());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {skills.map((category, idx) => (
        <div 
          key={idx} 
          className="group p-10 bg-glass backdrop-blur-md border border-subtle rounded-[2rem] hover:border-[#FFC107]/30 hover:bg-glass-hover transition-all duration-500"
        >
          <h3 className="font-serif italic text-2xl text-primary mb-8 tracking-wide group-hover:text-[#FFC107] transition-colors duration-500 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#FFC107]/50 block"></span>
            {category.title}
          </h3>
          <ul className="space-y-5">
            {category.items.map((item, i) => (
              <li key={i} className="text-muted font-sans font-light flex items-center gap-4 group/item">
                <span className="w-1.5 h-1.5 rounded-full bg-muted/30 group-hover/item:bg-[#FFC107] group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_rgba(255,193,7,0.6)] transition-all duration-300" />
                <span className="group-hover/item:text-primary transition-colors duration-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
