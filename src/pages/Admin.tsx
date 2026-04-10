import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, ArrowLeft } from 'lucide-react';
import { getProfile, updateProfile, Profile } from '../services/dataService';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    avatarUrl: '',
    description: '',
    role: []
  });
  const [roleInput, setRoleInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setProfile(data);
        setRoleInput(data.role.join(', '));
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    
    const updatedProfile = {
      ...profile,
      role: roleInput.split(',').map(r => r.trim()).filter(r => r !== '')
    };

    const result = await updateProfile(updatedProfile);
    
    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans p-6 md:p-12 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFC107]/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3B82F6]/10 blur-[130px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto mt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-mono text-sm">
          <ArrowLeft className="w-4 h-4" /> TRỞ VỀ TRANG CHỦ
        </Link>
        
        <div className="mb-12 border-b border-white/[0.05] pb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl text-white font-light tracking-tight mb-2"
          >
            Terminal Quản Trị.
          </motion.h1>
          <p className="text-gray-500 font-light text-sm">Cập nhật thông tin nhận diện không gian mạng</p>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Cột đôi cho Tên và Avatar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#FFC107] uppercase tracking-widest">Tên Hiển Thị</label>
              <input 
                type="text" 
                required
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                placeholder="VD: Tuấn."
              />
            </div>
            <div className="space-y-2">
              <label className="block font-mono text-xs text-[#FFC107] uppercase tracking-widest">Avatar URL</label>
              <input 
                type="text" 
                required
                value={profile.avatarUrl}
                onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                placeholder="VD: /assets/images/avatar.png"
              />
            </div>
          </div>

          {/* Vai trò */}
          <div className="space-y-2">
            <label className="block font-mono text-xs text-[#3B82F6] uppercase tracking-widest">Vai Trò (Cách nhau dấu phẩy)</label>
            <input 
              type="text" 
              required
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
              placeholder="VD: Software Engineer, Creative Explorer"
            />
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
             <label className="block font-mono text-xs text-gray-400 uppercase tracking-widest">Đoạn Mô Tả Giới Thiệu</label>
             <textarea 
                rows={4}
                required
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors resize-none"
             />
          </div>

          {/* Nút Submit */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={status === 'saving'}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {status === 'saving' ? (
                <span>ĐANG LƯU...</span>
              ) : status === 'success' ? (
                <span>ĐÃ LƯU THÀNH CÔNG</span>
              ) : status === 'error' ? (
                <span>LỖI. THỬ LẠI.</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>CẬP NHẬT TRẠNG THÁI</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
