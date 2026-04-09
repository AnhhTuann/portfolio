import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Palette, Fish, Database, ChevronDown, Mail, Send } from 'lucide-react';
import { saveContactMessage } from './services/dataService';
import ArtisticVision from './components/ArtisticVision';
import DigitalCanvas from './components/DigitalCanvas';
import TechnicalMastery from './components/TechnicalMastery';

const CinematicSection = ({ 
  children, 
  id, 
  title, 
  number 
}: { 
  children: React.ReactNode; 
  id: string; 
  title: string; 
  number: string;
}) => (
  <section id={id} className="min-h-screen py-32 px-6 flex flex-col justify-center relative">
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl mx-auto w-full"
    >
      <div className="mb-16 flex items-baseline gap-6 border-b border-white/[0.05] pb-8">
        <span className="font-display text-sm tracking-[0.3em] text-gray-600">{number}</span>
        <h2 className="font-display text-3xl md:text-4xl text-white font-light tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.div>
  </section>
);

export default function App() {
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
      setFormData({ name: '', email: '', message: '' }); // Reset form
      setTimeout(() => setFormStatus('idle'), 3000); // Trở về trạng thái ban đầu sau 3s
    } else {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-[#FFC107] selection:text-black font-sans relative overflow-x-hidden">
      
      {/* --- Cực Quang Vũ Trụ (Aurora Background Glow) --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-70">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8B5CF6]/10 blur-[130px] rounded-full animate-aurora" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] bg-[#3B82F6]/10 blur-[140px] rounded-full animate-aurora" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] bg-[#FFC107]/5 blur-[120px] rounded-full animate-aurora" style={{ animationDelay: '-10s' }}></div>
      </div>
      
      <div className="relative z-10 w-full">
      {/* 00. Prologue (Hero) */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Lưới không gian 3D chìm */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center z-10 relative flex flex-col items-center w-full max-w-4xl"
        >
          {/* Avatar Container */}
          <div className="mb-8 relative w-44 h-44 mx-auto group perspective-1000">
            {/* Hiệu ứng Glow phía sau Avatar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6] via-[#8B5CF6] to-[#FFC107] blur-[50px] rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-1000 ease-out z-0"></div>
            
            {/* Các vòng sáng công nghệ xoay quanh */}
            <div className="absolute inset-[-8px] border border-white/[0.05] border-t-[#3B82F6]/70 rounded-full animate-spin [animation-duration:8s] pointer-events-none z-10"></div>
            <div className="absolute inset-[-18px] border border-white/[0.02] border-b-[#FFC107]/50 rounded-full animate-spin [animation-duration:12s] [animation-direction:reverse] pointer-events-none z-10"></div>
            <div className="absolute inset-[-28px] border border-transparent border-l-[#8B5CF6]/30 border-r-[#8B5CF6]/30 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none z-10"></div>
            
            {/* Hình Avatar */}
            <div className="w-full h-full rounded-full border-2 border-white/10 overflow-hidden relative z-20 transform group-hover:rotate-y-[15deg] group-hover:rotate-x-[10deg] preserve-3d shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-transform duration-700 bg-[#0a0a0a]">
              <img 
                src="/assets/images/avatar.png" 
                alt="Tuấn's Avatar" 
                className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-30"></div>
            </div>
          </div>

          {/* Tên & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-display text-7xl md:text-9xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-500 mb-4 drop-shadow-2xl">
              Tuấn.
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#3B82F6]/70"></span>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-[#3B82F6] uppercase font-semibold">
                Software Engineer
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-600 hidden md:block"></span>
              <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-[#FFC107] uppercase font-semibold hidden md:block">
                Creative Explorer
              </span>
              <span className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#FFC107]/70"></span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="text-base md:text-xl font-light tracking-wide text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Kỹ sư CNTT từ SGU. Nơi logic của <span className="text-white font-medium">React & Firebase</span> giao thoa cùng cảm xúc của <span className="text-[#FFC107] font-medium drop-shadow-[0_0_8px_rgba(255,193,7,0.5)]">Nghệ thuật & Sự sống</span>.
          </motion.p>

          {/* Call to Actions (CTAs) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <a href="#projects" className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden font-mono text-xs tracking-widest font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-3">
                [ KHÁM PHÁ DỰ ÁN ]
              </span>
            </a>
            
            <a href="#contact" className="group relative px-8 py-4 bg-transparent border border-white/[0.1] text-white rounded-full overflow-hidden font-mono text-xs tracking-widest font-semibold transition-all hover:border-white/[0.3] hover:bg-white/[0.05] hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-[#FFC107]/0 group-hover:bg-[#FFC107]/5 transition-colors duration-500"></div>
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse"></span>
                LIÊN HỆ NGAY
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Nút cuộn xuống */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-20 group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="font-mono text-[9px] tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors duration-300">SCROLL TO EXPLORE</span>
          <div className="p-2 rounded-full border border-white/[0.1] group-hover:border-white/[0.3] transition-colors duration-300">
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:animate-bounce transition-all" />
          </div>
        </motion.div>
        
        {/* Ánh sáng dưới đáy */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />
      </section>

      {/* 01. The Architect & The Artist */}
      <CinematicSection id="about" number="01" title="The Architect & The Artist">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
            <p>
              Tốt nghiệp Đại học Sài Gòn (SGU), tôi được rèn luyện trong môi trường kỹ thuật khắt khe. Ở đó, mọi thứ đều cần sự chính xác, tối ưu và logic.
            </p>
            <p>
              Nhưng mã nguồn không chỉ là những dòng lệnh khô khan. Khi kết hợp với tư duy thẩm mỹ từ việc <strong className="text-white font-normal">vẽ tranh</strong> và sự tĩnh lặng khi <strong className="text-white font-normal">chăm sóc hồ cá thủy sinh</strong>, tôi tìm thấy một nhịp điệu riêng:
            </p>
            <blockquote className="border-l-2 border-white/[0.2] pl-6 italic text-gray-300 mt-8">
              "Code là nghệ thuật kiến tạo, và nghệ thuật là logic của cảm xúc."
            </blockquote>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-white/[0.02] border border-white/[0.05] rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/[0.05] transition-all duration-500">
                <Code2 className="w-8 h-8 text-gray-300 mb-4" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-gray-400">LOGIC</span>
              </div>
              <div className="aspect-[4/5] bg-white/[0.02] border border-white/[0.05] rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/[0.05] transition-all duration-500">
                <Palette className="w-8 h-8 text-gray-300 mb-4" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-gray-400">EMOTION</span>
              </div>
            </div>
            <div className="space-y-4 mt-12">
              <div className="aspect-[4/5] bg-white/[0.02] border border-white/[0.05] rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/[0.05] transition-all duration-500">
                <Database className="w-8 h-8 text-gray-300 mb-4" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-gray-400">STRUCTURE</span>
              </div>
              <div className="aspect-square bg-white/[0.02] border border-white/[0.05] rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/[0.05] transition-all duration-500">
                <Fish className="w-8 h-8 text-gray-300 mb-4" strokeWidth={1.5} />
                <span className="font-display text-xs tracking-[0.2em] text-gray-400">LIFE</span>
              </div>
            </div>
          </div>
        </div>
      </CinematicSection>

      {/* 02. Technical Mastery */}
      <CinematicSection id="skills" number="02" title="Technical Mastery">
        <TechnicalMastery />
      </CinematicSection>

      {/* 03. Digital Canvas */}
      <CinematicSection id="projects" number="03" title="Digital Canvas">
        <DigitalCanvas />
      </CinematicSection>

      {/* 04. Artistic Vision */}
      <CinematicSection id="gallery" number="04" title="Artistic Vision">
        <ArtisticVision />
      </CinematicSection>

      {/* 05. Epilogue */}
      <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center text-center border-t border-white/[0.05] mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-md"
        >
          <span className="font-display text-sm tracking-[0.3em] text-gray-600 mb-6 block">05. EPILOGUE</span>
          <h2 className="font-display text-4xl md:text-6xl text-white font-light tracking-tight mb-8">The Next Chapter.</h2>
          <p className="text-gray-400 font-light mb-12">
            Cho dù là một dự án phần mềm phức tạp, một bức tranh đang dang dở, hay một hồ thủy sinh cần thiết kế. Hãy kết nối với tôi.
          </p>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={formStatus === 'submitting'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {formStatus === 'submitting' ? (
                <span>SENDING...</span>
              ) : formStatus === 'success' ? (
                <span>MESSAGE SENT</span>
              ) : formStatus === 'error' ? (
                <span>ERROR. TRY AGAIN.</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 font-light text-xs tracking-widest border-t border-white/[0.05]">
        <p>DESIGNED & ENGINEERED BY TUẤN © {new Date().getFullYear()}</p>
      </footer>
      </div>
    </div>
  );
}
