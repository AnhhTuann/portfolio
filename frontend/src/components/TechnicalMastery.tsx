import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PortfolioLanguage } from '../utils/portfolioTranslations';
import { getTechnologyClass } from '../utils/technologyColors';
import { getSkillsData, SkillCategory } from './SkillsManager';

export default function TechnicalMastery({ language }: { language: PortfolioLanguage }) {
  const [skills, setSkills] = useState<SkillCategory[]>(() => getSkillsData());
  const accents = [
    { badge: 'studio-skill-badge-coral', dot: 'studio-skill-dot-coral' },
    { badge: 'studio-skill-badge-purple', dot: 'studio-skill-dot-purple' },
    { badge: 'studio-skill-badge-green', dot: 'studio-skill-dot-green' },
  ];

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
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          className="studio-skill-card group relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-300 hover:-translate-y-1 md:p-8"
        >
          <span
            className={`mb-6 inline-flex rounded-full px-3 py-1.5 font-sans text-xs font-bold tracking-normal ${accents[idx % accents.length].badge}`}
          >
            0{idx + 1} / {language === 'en' ? 'EXPERTISE' : 'CHUYÊN MÔN'}
          </span>
          <h3 className="mb-7 flex items-center gap-3 font-display text-2xl font-bold leading-snug tracking-tight text-primary md:text-3xl">
            <span className={`h-3 w-3 rounded-sm ${accents[idx % accents.length].dot}`} />
            {category.title}
          </h3>
          <ul className="space-y-4">
            {category.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 + i * 0.05, duration: 0.5 }}
                className="flex items-center gap-3 font-sans text-base font-semibold text-secondary group/item"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${accents[idx % accents.length].dot}`}
                />
                <span
                  className={`tech-brand transition-colors group-hover/item:opacity-80 ${getTechnologyClass(item)}`}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
