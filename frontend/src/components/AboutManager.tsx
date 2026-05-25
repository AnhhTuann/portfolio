import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutManager() {
  const defaultAbout = {
    p1: "Tốt nghiệp Đại học Sài Gòn (SGU), tôi được rèn luyện trong môi trường kỹ thuật khắt khe. Ở đó, mọi thứ đều cần sự chính xác, tối ưu và logic.",
    p2: 'Nhưng mã nguồn không chỉ là những dòng lệnh khô khan. Khi kết hợp với tư duy thẩm mỹ từ việc <strong class="text-primary font-normal">vẽ tranh</strong> và sự tĩnh lặng khi <strong class="text-primary font-normal">chăm sóc hồ cá thủy sinh</strong>, tôi tìm thấy một nhịp điệu riêng:',
    quote: '"Code là nghệ thuật kiến tạo, và nghệ thuật là logic của cảm xúc."'
  };

  const [formData, setFormData] = useState(defaultAbout);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  useEffect(() => {
    const saved = localStorage.getItem('about_data');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    localStorage.setItem('about_data', JSON.stringify(formData));
    
    // Dispatch a storage event so if the Portfolio is open in another tab, it updates (though usually works across tabs natively, we can manually trigger it if needed).
    window.dispatchEvent(new Event('storage'));
    
    setTimeout(() => setStatus('success'), 500);
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 bg-surface border border-subtle-hover rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display text-primary tracking-tight">Chỉnh Sửa "The Architect & The Artist"</h2>
          <p className="text-muted text-sm mt-1 font-light">
            Cập nhật đoạn giới thiệu (Chỉ lưu tạm trên Browser - Không cần DB)
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-mono text-xs text-accent uppercase tracking-widest">Đoạn 1 (Học vấn & Logic)</label>
          <textarea 
            rows={3}
            required
            value={formData.p1}
            onChange={(e) => setFormData({...formData, p1: e.target.value})}
            className="w-full bg-glass border border-subtle rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-subtle-hover transition-colors resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-mono text-xs text-accent uppercase tracking-widest">Đoạn 2 (Nghệ thuật & Cảm xúc - Hỗ trợ thẻ HTML)</label>
          <textarea 
            rows={4}
            required
            value={formData.p2}
            onChange={(e) => setFormData({...formData, p2: e.target.value})}
            className="w-full bg-glass border border-subtle rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-subtle-hover transition-colors resize-none font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block font-mono text-xs text-accent uppercase tracking-widest">Câu Quote Tâm Đắc</label>
          <input 
            type="text"
            required
            value={formData.quote}
            onChange={(e) => setFormData({...formData, quote: e.target.value})}
            className="w-full bg-glass border border-subtle rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-subtle-hover transition-colors italic"
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={status === 'saving'}
            className="w-full flex items-center justify-center gap-3 px-8 py-3 bg-accent-soft text-accent border border-accent/20 rounded-xl font-medium hover:bg-accent/20 hover:border-accent/50 transition-all disabled:opacity-50"
          >
            {status === 'saving' ? (
              <span>ĐANG LƯU...</span>
            ) : status === 'success' ? (
              <span>ĐÃ LƯU TRÊN TRÌNH DUYỆT</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>LƯU TẠM THỜI LOCAL</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
