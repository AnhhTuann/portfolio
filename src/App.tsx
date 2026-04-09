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
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-white selection:text-black font-sans">
      
      {/* 00. Prologue (Hero) */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center z-10"
        >
          <h1 className="font-display text-6xl md:text-8xl font-light tracking-tighter text-white mb-6">
            Tuấn.
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Kỹ sư CNTT từ SGU. Nơi logic của <span className="text-white font-medium">React & Firebase</span> giao thoa cùng cảm xúc của <span className="text-white font-medium">Nghệ thuật & Sự sống</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
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
  );
}
