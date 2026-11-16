import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Code2, Palette, Fish, Database, ChevronDown, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { saveContactMessage, getProfile, Profile } from '../services/dataService';
import ArtisticVision from '../components/ArtisticVision';
import DigitalCanvas from '../components/DigitalCanvas';
import TechnicalMastery from '../components/TechnicalMastery';

const FULL_NAME = 'Nguyễn Đức Anh Tuấn';
const DISPLAY_NAME = 'Anh Tuấn.';

const CinematicSection = ({
  children,
  id,
  title,
  number,
  subtitle,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
  number: string;
  subtitle?: string;
}) => (
  <section id={id} className="min-h-screen py-32 px-6 flex flex-col justify-center relative">
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto w-full"
    >
      <div className="mb-16 relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute -top-4 left-0 h-[2px] w-full bg-gradient-to-r from-accent/60 via-primary/30 to-transparent origin-left"
        />
        <div className="flex items-baseline gap-6 pt-6 border-b border-subtle pb-8">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-xs tracking-[0.3em] text-accent"
          >
            {number}
          </motion.span>
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-primary font-light tracking-tight">{title}</h2>
            {subtitle && (
              <p className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-muted uppercase mt-3">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      {children}
    </motion.div>
  </section>
);

const MARQUEE_ITEMS = [
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND CSS',
  'FRAMER MOTION', 'REST API', 'JWT AUTH', 'DIGITAL ART', 'AQUASCAPE',
];

export default function Portfolio() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  const defaultAbout = {
    p1: "Tốt nghiệp Đại học Sài Gòn (SGU), tôi được rèn luyện trong môi trường kỹ thuật khắt khe. Ở đó, mọi thứ đều cần sự chính xác, tối ưu và logic.",
    p2: 'Nhưng mã nguồn không chỉ là những dòng lệnh khô khan. Khi kết hợp với tư duy thẩm mỹ từ việc <strong class="text-primary font-normal">vẽ tranh</strong> và sự tĩnh lặng khi <strong class="text-primary font-normal">chăm sóc hồ cá thủy sinh</strong>, tôi tìm thấy một nhịp điệu riêng:',
    quote: '"Code là nghệ thuật kiến tạo, và nghệ thuật là logic của cảm xúc."'
  };
  const [aboutData, setAboutData] = useState(() => {
    try {
      const saved = localStorage.getItem('about_data');
      return saved ? JSON.parse(saved) : defaultAbout;
    } catch { return defaultAbout; }
  });
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('about_data');
        if (saved) setAboutData(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // --- STATE QUẢN LÝ FORM LIÊN HỆ ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // --- XỬ LÝ SUBMIT FORM ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const result = await saveContactMessage(formData);

    if (result.success) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3500);
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3500);
    }
  };

  const heroName = profile?.name || DISPLAY_NAME;

  return (
    <div className="min-h-screen bg-background text-secondary selection:bg-accent selection:text-black font-sans relative overflow-x-hidden">

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-accent origin-left z-50"
      />

      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.05] bg-grain" />

      {/* --- Cực Quang Vũ Trụ (Aurora Background Glow) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-70">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/10 blur-[130px] rounded-full animate-aurora" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] bg-[#3B82F6]/10 blur-[140px] rounded-full animate-aurora" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-accent/5 blur-[120px] rounded-full animate-aurora" style={{ animationDelay: '-10s' }}></div>
      </div>

      <div className="relative z-10 w-full">
      {/* 00. Prologue (Hero) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-40">
        {/* Lưới không gian 3D chìm */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center z-10 relative flex flex-col items-center w-full max-w-5xl"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-muted uppercase">
              {FULL_NAME} — Portfolio
            </span>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" style={{ animationDelay: '1s' }} />
          </motion.div>

          {/* Avatar Container */}
          <Link to="/admin" className="mb-10 relative w-40 h-40 md:w-48 md:h-48 mx-auto group perspective-1000 block cursor-pointer">
            {/* Conic gradient ring xoay */}
            <div className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#3B82F6,#8B5CF6,#FFC107,#3B82F6)] opacity-60 blur-[2px] animate-spin-slower group-hover:opacity-90 transition-opacity duration-700" />
            <div className="absolute -inset-4 rounded-full border border-subtle border-t-[#3B82F6]/60 border-b-accent/40 animate-spin [animation-duration:10s] pointer-events-none z-10" />
            <div className="absolute -inset-8 rounded-full border border-subtle border-l-[#8B5CF6]/30 border-r-[#8B5CF6]/30 animate-spin-reverse pointer-events-none z-10" />

            <div className="w-full h-full rounded-full border-2 border-subtle-hover overflow-hidden relative z-20 transform group-hover:rotate-y-[15deg] group-hover:rotate-x-[10deg] preserve-3d shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-transform duration-700 bg-surface">
              <img
                src={profile?.avatarUrl || "/assets/images/avatar.png"}
                alt={`${heroName}'s Avatar`}
                className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-30"></div>
            </div>
            {/* Orbiting dot */}
            <div className="absolute inset-[-14px] animate-spin [animation-duration:6s] pointer-events-none z-30">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            </div>
            <div className="absolute inset-0 z-40" />
          </Link>

          {/* Tên — stagger từng từ */}
          <div className="flex flex-col items-center mb-2">
            <h1 className="font-display font-light tracking-tight text-primary leading-[0.95] flex flex-wrap justify-center gap-x-4 md:gap-x-6">
              {heroName.replace(/\.$/, '').split(' ').map((word, i) => (
                <span key={i} className="overflow-hidden inline-block">
                  <motion.span
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#FFC107] dark:from-white dark:via-gray-100 dark:to-gray-500 drop-shadow-2xl"
                    style={{ fontSize: 'clamp(2.6rem, 9vw, 6.5rem)' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="flex items-center justify-center gap-3 md:gap-5 mb-8 mt-4"
          >
            {profile?.role && profile.role.length > 0 ? (
              profile.role.map((r, index) => (
                <React.Fragment key={index}>
                  <span className={`font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase font-semibold ${index % 2 === 0 ? 'text-[#3B82F6]' : 'text-accent'}`}>
                    {r}
                  </span>
                  {index < profile.role.length - 1 && (
                    <span className="w-1 h-1 rounded-full bg-muted animate-pulse-dot" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-[#3B82F6] uppercase font-semibold">Software Engineer</span>
                <span className="w-1 h-1 rounded-full bg-muted animate-pulse-dot" />
                <span className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-accent uppercase font-semibold">Creative Explorer</span>
              </>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="text-base md:text-lg font-light tracking-wide text-muted max-w-2xl mx-auto leading-relaxed mb-12 px-2"
          >
            {profile?.description || (
              <>Kỹ sư CNTT từ SGU. Nơi logic của <span className="text-primary font-medium">React & Node.js/PostgreSQL</span> giao thoa cùng cảm xúc của <span className="text-accent font-medium drop-shadow-[0_0_8px_var(--accent)]">Nghệ thuật & Sự sống</span>.</>
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
          >
            <a href="#projects" className="group relative px-9 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full overflow-hidden font-mono text-xs tracking-[0.2em] font-semibold transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_45px_rgba(99,102,241,0.35)]">
              <span className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#8B5CF6]/30 to-[#FFC107]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <span className="relative z-10 flex items-center gap-3">[ KHÁM PHÁ DỰ ÁN ]</span>
            </a>

            <a href="#contact" className="group relative px-9 py-4 bg-transparent border border-subtle-hover text-primary rounded-full overflow-hidden font-mono text-xs tracking-[0.2em] font-semibold transition-all duration-500 hover:border-accent/50 hover:bg-glass-hover hover:scale-105 active:scale-95">
              <span className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
                LIÊN HỆ NGAY
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-20 group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-muted group-hover:text-primary transition-colors duration-300">SCROLL TO EXPLORE</span>
          <div className="p-2 rounded-full border border-subtle-hover group-hover:border-accent/50 transition-colors duration-300">
            <ChevronDown className="w-4 h-4 text-muted group-hover:text-accent group-hover:animate-bounce transition-all" />
          </div>
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          className="absolute bottom-0 left-0 w-full border-t border-subtle py-5 overflow-hidden mask-fade-x bg-background/40 backdrop-blur-sm z-20"
        >
          <div className="flex w-max animate-marquee gap-0">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-8 px-8 font-mono text-[11px] tracking-[0.3em] text-muted/70 whitespace-nowrap">
                {item}
                <span className="w-1 h-1 rounded-full bg-accent/50" />
              </span>
            ))}
          </div>
        </motion.div>

        {/* Ánh sáng dưới đáy */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
      </section>

      {/* 01. The Architect & The Artist */}
      <CinematicSection id="about" number="01" title="The Architect & The Artist" subtitle="Logic × Emotion">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-muted font-light leading-relaxed text-lg">
            <p dangerouslySetInnerHTML={{ __html: aboutData.p1 }}></p>
            <p dangerouslySetInnerHTML={{ __html: aboutData.p2 }}></p>
            <blockquote className="border-l-2 border-accent/50 pl-6 italic text-secondary mt-8 font-serif text-xl">
              <span dangerouslySetInnerHTML={{ __html: aboutData.quote }} />
            </blockquote>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="aspect-square bg-glass border border-subtle rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-glass-hover hover:border-accent/30 transition-all duration-500 group/tile"
              >
                <Code2 className="w-8 h-8 text-secondary mb-4 group-hover/tile:text-accent group-hover/tile:-translate-y-1 transition-all duration-500" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-muted">LOGIC</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="aspect-[4/5] bg-glass border border-subtle rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-glass-hover hover:border-accent/30 transition-all duration-500 group/tile"
              >
                <Palette className="w-8 h-8 text-secondary mb-4 group-hover/tile:text-accent group-hover/tile:-translate-y-1 transition-all duration-500" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-muted">EMOTION</span>
              </motion.div>
            </div>
            <div className="space-y-4 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="aspect-[4/5] bg-glass border border-subtle rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-glass-hover hover:border-accent/30 transition-all duration-500 group/tile"
              >
                <Database className="w-8 h-8 text-secondary mb-4 group-hover/tile:text-accent group-hover/tile:-translate-y-1 transition-all duration-500" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-muted">STRUCTURE</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="aspect-square bg-glass border border-subtle rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-glass-hover hover:border-accent/30 transition-all duration-500 group/tile"
              >
                <Fish className="w-8 h-8 text-secondary mb-4 group-hover/tile:text-accent group-hover/tile:-translate-y-1 transition-all duration-500" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-muted">LIFE</span>
              </motion.div>
            </div>
          </div>
        </div>
      </CinematicSection>

      {/* 02. Technical Mastery */}
      <CinematicSection id="skills" number="02" title="Technical Mastery" subtitle="Stack & Craft">
        <TechnicalMastery />
      </CinematicSection>

      {/* 03. Digital Canvas */}
      <CinematicSection id="projects" number="03" title="Digital Canvas" subtitle="Selected Works">
        <DigitalCanvas />
      </CinematicSection>

      {/* 04. Artistic Vision */}
      <CinematicSection id="gallery" number="04" title="Artistic Vision" subtitle="Canvas & Aquarium">
        <ArtisticVision />
      </CinematicSection>

      {/* 05. Epilogue */}
      <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center text-center border-t border-subtle mt-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-md relative"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-accent mb-6 block">05. EPILOGUE</span>
          <h2 className="font-display text-4xl md:text-6xl text-primary font-light tracking-tight mb-8">The Next Chapter.</h2>
          <p className="text-muted font-light mb-12">
            Cho dù là một dự án phần mềm phức tạp, một bức tranh đang dang dở, hay một hồ thủy sinh cần thiết kế. Hãy kết nối với tôi.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="relative group">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-glass border border-subtle rounded-xl px-6 py-4 text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all duration-300"
              />
              <span className="absolute bottom-0 left-6 h-[1px] w-0 bg-accent group-focus-within:w-[calc(100%-3rem)] transition-all duration-500" />
            </div>
            <div className="relative group">
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-glass border border-subtle rounded-xl px-6 py-4 text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all duration-300"
              />
              <span className="absolute bottom-0 left-6 h-[1px] w-0 bg-accent group-focus-within:w-[calc(100%-3rem)] transition-all duration-500" />
            </div>
            <div className="relative group">
              <textarea
                placeholder="Your Message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-glass border border-subtle rounded-xl px-6 py-4 text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/50 focus:bg-glass-hover transition-all duration-300 resize-none"
              />
              <span className="absolute bottom-0 left-6 h-[1px] w-0 bg-accent group-focus-within:w-[calc(100%-3rem)] transition-all duration-500" />
            </div>
            <motion.button
              type="submit"
              disabled={formStatus === 'submitting'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono text-xs tracking-[0.2em] font-semibold transition-all duration-500 disabled:opacity-60 ${
                formStatus === 'success'
                  ? 'bg-accent text-black'
                  : formStatus === 'error'
                    ? 'bg-red-500/80 text-white'
                    : 'bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-200'
              }`}
            >
              {formStatus === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>SENDING...</span>
                </>
              ) : formStatus === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MESSAGE SENT</span>
                </>
              ) : formStatus === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>ERROR. TRY AGAIN.</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-muted/60 font-light text-[11px] tracking-[0.3em] border-t border-subtle font-mono">
        <p>DESIGNED & ENGINEERED BY {FULL_NAME.toUpperCase()} © {new Date().getFullYear()}</p>
      </footer>
      </div>
    </div>
  );
}
