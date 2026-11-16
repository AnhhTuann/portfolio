import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          className="group relative p-10 bg-glass backdrop-blur-md border border-subtle rounded-[2rem] hover:border-accent/40 hover:bg-glass-hover hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden"
        >
          {/* Góc accent khi hover */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <h3 className="font-serif italic text-2xl text-primary mb-8 tracking-wide group-hover:text-accent transition-colors duration-500 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent/50 block group-hover:w-12 transition-all duration-500" />
            {category.title}
          </h3>
          <ul className="space-y-5">
            {category.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 + i * 0.05, duration: 0.5 }}
                className="text-muted font-sans font-light flex items-center gap-4 group/item"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-muted/30 group-hover/item:bg-accent group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_var(--accent)] transition-all duration-300" />
                <span className="group-hover/item:text-primary transition-colors duration-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
