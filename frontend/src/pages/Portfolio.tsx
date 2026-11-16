import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Code2,
  Github,
  Palette,
  Send,
  ShoppingCart,
  Workflow,
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArtisticVision from '../components/ArtisticVision';
import DigitalCanvas from '../components/DigitalCanvas';
import TechnicalMastery from '../components/TechnicalMastery';
import { getProfile, Profile, saveContactMessage } from '../services/dataService';
import { getTechnologyClass } from '../utils/technologyColors';

const FULL_NAME = 'Nguyễn Đức Anh Tuấn';
const DISPLAY_NAME = 'Anh Tuấn.';

const StudioSection = ({
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
  <section id={id} className={`studio-section studio-section-${id} px-5 py-20 md:px-10 md:py-28`}>
    <div className="mx-auto w-full max-w-7xl">
      <div className="studio-section-heading mb-10 border-b pb-6 md:mb-14 md:pb-8">
        <div className="flex min-w-0 items-start gap-4 md:gap-5">
          <motion.span className="studio-section-number mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-xl font-bold md:h-16 md:w-16 md:text-2xl">
            {number}
          </motion.span>
          <div className="min-w-0">
            <h2 className="studio-section-title font-display font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="studio-section-subtitle mt-2 font-sans text-sm leading-relaxed md:text-base">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  </section>
);

const MARQUEE_ITEMS = [
  'JAVASCRIPT',
  'HTML',
  'CSS',
  'REACT',
  'TYPESCRIPT',
  'NODE.JS',
  'POSTGRESQL',
  'TAILWIND CSS',
  'FRAMER MOTION',
  'REST API',
  'JWT AUTH',
  'DIGITAL ART',
  'AQUASCAPE',
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
    p1: 'Mình là <strong class="text-primary font-semibold">Frontend Engineer</strong>, hoạt động tự do từ năm 2021, với kinh nghiệm thiết kế, phát triển và triển khai đa dạng các loại website — từ landing page, website doanh nghiệp, thương mại điện tử đến các nền tảng web được xây dựng theo yêu cầu riêng.',
    p2: 'Mình sử dụng <strong class="text-primary font-semibold">ReactJS, Vite, WordPress, HTML, CSS, JavaScript, TypeScript, Node.js và SASS/SCSS</strong> để xây dựng những sản phẩm web hiện đại, responsive, tối ưu hiệu suất và mang lại trải nghiệm người dùng mượt mà.<br /><br />Không chỉ tập trung vào kỹ thuật, mình còn kết hợp <strong class="text-primary font-semibold">tư duy thiết kế UI/UX và thẩm mỹ sáng tạo</strong> để tạo ra những giao diện có bản sắc riêng, phù hợp với từng thương hiệu. Đồng thời, mình ứng dụng <strong class="text-primary font-semibold">AI vào quy trình phát triển</strong> nhằm hỗ trợ xử lý lỗi, tối ưu mã nguồn và nâng cao hiệu quả công việc.',
    quote: '"Nơi logic gặp gỡ sáng tạo."',
  };
  const [aboutData, setAboutData] = useState(() => {
    try {
      const saved = localStorage.getItem('about_data');
      if (!saved) return defaultAbout;

      const savedAbout = JSON.parse(saved);
      if (
        savedAbout.quote === '"Từ ý tưởng đến sản phẩm thực tế — mình chăm chút cả hành trình."' ||
        savedAbout.quote ===
          '"Mục tiêu của mình là biến ý tưởng thành những sản phẩm web đẹp về giao diện, tốt về trải nghiệm và hiệu quả trong vận hành thực tế."'
      ) {
        savedAbout.quote = defaultAbout.quote;
        localStorage.setItem('about_data', JSON.stringify(savedAbout));
      }
      return savedAbout;
    } catch {
      return defaultAbout;
    }
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
    <div className="portfolio-studio min-h-screen bg-background text-secondary selection:bg-accent selection:text-black font-sans relative overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-accent"
      />

      <div className="relative z-10 w-full">
        <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <a href="#" className="font-display text-lg font-bold tracking-tight text-primary">
            AT<span className="text-accent">.</span>
          </a>
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-8 text-sm font-medium text-secondary md:flex"
          >
            <a className="transition-colors hover:text-accent" href="#about">
              Giới thiệu
            </a>
            <a className="transition-colors hover:text-accent" href="#projects">
              Dự án
            </a>
            <a className="transition-colors hover:text-accent" href="#gallery">
              Nghệ thuật
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-background"
          >
            Kết nối <span aria-hidden="true">↗</span>
          </a>
        </header>
        {/* 00. Prologue (Hero) */}
        <section className="relative overflow-hidden px-5 pb-24 pt-12 md:px-10 md:pb-32 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className="order-1 flex flex-col items-start lg:order-1"
            >
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2 text-xs font-semibold text-secondary shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#82b93a]" />
                Thiết kế & phát triển trải nghiệm số
              </span>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Xin chào, mình là
              </p>
              <h1 className="max-w-3xl font-display text-[clamp(3.4rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.075em] text-primary">
                {heroName
                  .replace(/\.$/, '')
                  .split(' ')
                  .map((word, i) => (
                    <React.Fragment key={`${word}-${i}`}>
                      {i > 0 && ' '}
                      <span className={i === 0 ? 'text-accent' : ''}>{word}</span>
                    </React.Fragment>
                  ))}
                <span className="text-accent">.</span>
              </h1>

              <div className="mt-6 flex flex-wrap gap-2">
                {(profile?.role?.length
                  ? profile.role
                  : ['Software Engineer', 'Creative Explorer']
                ).map((role, i) => (
                  <span
                    key={role}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold ${i % 2 ? 'bg-[#e9e3ff] text-[#5b45bc]' : 'bg-[#ffe3d9] text-[#b9472e]'}`}
                  >
                    {role}
                  </span>
                ))}
              </div>

              <p className="mt-7 max-w-xl text-base leading-7 text-secondary md:text-lg">
                {profile?.description || (
                  <>
                    Kỹ sư CNTT từ SGU, mình kết hợp tư duy hệ thống của{' '}
                    <strong className="font-semibold text-primary">
                      React, Node.js và PostgreSQL
                    </strong>{' '}
                    với cảm hứng từ{' '}
                    <strong className="font-semibold text-accent">nghệ thuật và sự sống</strong>.
                  </>
                )}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                >
                  Xem dự án <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-subtle-hover px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-surface"
                >
                  Liên hệ với mình
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3 text-xs font-medium text-muted">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e6f0d7] text-[#52722e]">
                  <ChevronDown size={16} />
                </span>
                Cuộn xuống để khám phá
              </div>
            </motion.div>

            <div className="order-2 mx-auto w-full max-w-[500px] lg:order-2">
              <div className="relative mx-auto aspect-[0.92] max-w-[460px] rounded-[2rem] bg-[#f7b2a1] p-5 md:rounded-[2.5rem] md:p-7">
                <div className="absolute -right-3 top-8 h-20 w-20 rounded-full bg-[#67c7c3] md:-right-6 md:h-28 md:w-28" />
                <div className="absolute -bottom-5 -left-4 h-24 w-24 rounded-[2rem] bg-[#8a78d6] md:-bottom-7 md:-left-7 md:h-32 md:w-32" />
                <div className="absolute inset-5 overflow-hidden rounded-[1.5rem] bg-[#f5f2eb] md:inset-7 md:rounded-[2rem]">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#e8e5de]" />
                  <Link
                    to="/admin"
                    aria-label="Mở trang quản trị hồ sơ"
                    className="absolute inset-0 z-10 block"
                  >
                    <img
                      src={profile?.avatarUrl || '/assets/images/avatar.png'}
                      alt={`${heroName}'s Avatar`}
                      className="h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </Link>
                </div>
                <div className="absolute -left-5 top-8 z-20 -rotate-6 rounded-xl bg-[#f8f3e8] px-4 py-3 shadow-lg md:-left-10 md:top-12">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#747b86]">
                    Hi, I’m
                  </span>
                  <span className="font-display text-sm font-bold text-[#242a38]">Anh Tuấn ✳</span>
                </div>
                <div className="absolute -bottom-3 right-5 z-20 rotate-3 rounded-full bg-[#fff9ed] px-4 py-2 text-xs font-bold text-[#242a38] shadow-md md:right-8">
                  Code × Art
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mx-auto mt-20 max-w-7xl overflow-hidden border-y border-subtle py-4 md:mt-28">
            <div className="flex w-max animate-marquee">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className={`tech-brand flex items-center gap-5 px-5 text-sm font-bold tracking-normal whitespace-nowrap md:text-base ${getTechnologyClass(item)}`}
                >
                  {item}
                  <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 01. The Architect & The Artist */}
        <StudioSection
          id="about"
          number="01"
          title="Lý trí × Cảm hứng"
          subtitle="Freelance Frontend Engineer · 2021 — nay"
        >
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div>
              <div className="studio-about-status mb-6">
                <span className="h-2 w-2 rounded-full bg-[#78c49a]" />
                FREELANCE FRONTEND DEVELOPER
              </div>
              <div className="space-y-5 text-secondary text-base leading-7 md:text-lg md:leading-8">
                <p dangerouslySetInnerHTML={{ __html: aboutData.p1 }}></p>
                <p dangerouslySetInnerHTML={{ __html: aboutData.p2 }}></p>
              </div>
              <blockquote className="studio-quote mt-7 rounded-r-2xl border-l-4 px-5 py-4 font-serif text-lg italic md:mt-8 md:px-6 md:py-5 md:text-xl">
                <span dangerouslySetInnerHTML={{ __html: aboutData.quote }} />
              </blockquote>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  icon: Code2,
                  category: '01 / BUILD',
                  title: 'Từ ý tưởng đến vận hành',
                  description:
                    'Phát triển website trọn quy trình — từ dựng giao diện đến triển khai thực tế.',
                  style: 'studio-tile-blue',
                },
                {
                  icon: ShoppingCart,
                  category: '02 / COMMERCE',
                  title: 'E-commerce & Landing Page',
                  description: 'Tập trung vào trải nghiệm mua sắm và trang đích rõ ràng, hiệu quả.',
                  style: 'studio-tile-green',
                },
                {
                  icon: Palette,
                  category: '03 / VISUAL',
                  title: 'Giao diện có cá tính',
                  description:
                    'Kết hợp nền tảng mỹ thuật với SASS/SCSS để tạo chất riêng cho thương hiệu.',
                  style: 'studio-tile-coral',
                },
                {
                  icon: Workflow,
                  category: '04 / WORKFLOW',
                  title: 'Quy trình thông minh',
                  description:
                    'Ứng dụng AI để hỗ trợ debug, tối ưu và rút ngắn vòng lặp phát triển.',
                  style: 'studio-tile-purple',
                },
              ].map(({ icon: Icon, category, title, description, style }) => (
                <article key={category} className={`studio-tile studio-about-card ${style}`}>
                  <div className="studio-about-card-top">
                    <span className="studio-about-card-category">{category}</span>
                    <Icon aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold leading-snug md:text-xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 md:text-sm md:leading-6">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </StudioSection>

        {/* 02. Technical Mastery */}
        <StudioSection
          id="skills"
          number="02"
          title="Công cụ mình dùng"
          subtitle="Thiết kế · Phát triển · Hoàn thiện"
        >
          <TechnicalMastery />
        </StudioSection>

        {/* 03. Digital Canvas */}
        <StudioSection id="projects" number="03" title="Sản phẩm đã làm" subtitle="Một vài dấu mốc">
          <DigitalCanvas />
        </StudioSection>

        {/* 04. Artistic Vision */}
        <StudioSection
          id="gallery"
          number="04"
          title="Ngoài những dòng code"
          subtitle="Hội họa & Thủy sinh"
        >
          <ArtisticVision />
        </StudioSection>

        {/* 05. Epilogue */}
        <section
          id="contact"
          className="studio-contact mx-4 my-8 overflow-hidden rounded-[2rem] px-5 py-14 md:mx-8 md:my-12 md:rounded-[2.5rem] md:px-12 md:py-20"
        >
          <div className="relative mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
            <div className="md:sticky md:top-16 md:self-start">
              <div className="studio-contact-label mb-5 flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.12em]">
                <span className="studio-section-number studio-section-number-05 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-sans text-xl font-bold md:h-16 md:w-16 md:text-2xl">
                  05
                </span>
                <span>CÙNG BẮT ĐẦU</span>
              </div>
              <h2 className="studio-contact-title mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                Có ý tưởng hay?
                <br />
                <span>Mình cùng làm.</span>
              </h2>
              <p className="studio-contact-copy max-w-md text-base leading-7">
                Từ một sản phẩm số, một bức tranh đến một hồ thủy sinh — mình luôn vui khi được nghe
                về dự án tiếp theo của bạn.
              </p>
              <div className="studio-contact-copy mt-8 flex items-center gap-3 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#7fc7a3]" />
                Sẵn sàng cho những ý tưởng thú vị
              </div>
              <a
                href="https://github.com/AnhhTuann"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xem GitHub của Anh Tuấn"
                className="studio-contact-copy mt-5 inline-flex items-center gap-2 rounded-full border border-current/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-current/50"
              >
                <Github aria-hidden="true" size={18} />
                GitHub / AnhhTuann
              </a>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="studio-contact-form space-y-4 rounded-[1.75rem] p-5 text-left md:p-8"
            >
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  aria-label="Tên của bạn"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="studio-contact-input w-full rounded-xl border px-5 py-4 transition-all focus:border-accent focus:outline-none"
                />
              </div>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="studio-contact-input w-full rounded-xl border px-5 py-4 transition-all focus:border-accent focus:outline-none"
                />
              </div>
              <div className="relative group">
                <textarea
                  placeholder="Kể mình nghe về dự án..."
                  aria-label="Nội dung tin nhắn"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="studio-contact-input w-full resize-none rounded-xl border px-5 py-4 transition-all focus:border-accent focus:outline-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={formStatus === 'submitting'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono text-xs tracking-[0.2em] font-semibold transition-all duration-500 disabled:opacity-60 ${
                  formStatus === 'success'
                    ? 'bg-[#9ed977] text-[#1c2a20]'
                    : formStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-primary text-background hover:opacity-90'
                }`}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>ĐANG GỬI...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ĐÃ GỬI TIN NHẮN</span>
                  </>
                ) : formStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>CÓ LỖI. THỬ LẠI NHÉ.</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>GỬI LỜI NHẮN</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 py-8 text-center text-xs text-muted md:px-10">
          <p>
            Thiết kế & phát triển bởi {FULL_NAME} <span className="text-accent">✳</span> ©{' '}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
