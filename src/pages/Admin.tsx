import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Save, ArrowLeft, LogOut, Upload, X, Check } from 'lucide-react';
import { getProfile, updateProfile, Profile } from '../services/dataService';
import { logout } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import ProjectManager from '../components/ProjectManager';

export default function Admin() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    avatarUrl: '',
    description: '',
    role: []
  });
  const [roleInput, setRoleInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Cho Cropper
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

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

  const getCroppedImageBase64 = async (imageSrc: string, pixelCrop: any): Promise<string> => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement('canvas');
    canvas.width = 400; // Xuất ảnh 400x400 nhẹ nhàng
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Không tạo được context canvas');

    // Cắt chuẩn xác tọa độ x,y
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      400,
      400
    );

    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;
    setUploadingImage(true);
    try {
      const base64Avatar = await getCroppedImageBase64(imageToCrop, croppedAreaPixels);
      setProfile({ ...profile, avatarUrl: base64Avatar });
      setImageToCrop(null); // Tắt bảng cắt
    } catch (err: any) {
      alert("Lỗi xử lý nén ảnh: " + err.message);
    }
    setUploadingImage(false);
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans p-6 md:p-12 relative overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen opacity-50">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FFC107]/10 blur-[130px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#3B82F6]/10 blur-[130px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto mt-12">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" /> TRỞ VỀ TRANG CHỦ
          </Link>
          <button 
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-2 text-red-500/70 hover:text-red-500 transition-colors font-mono text-xs tracking-widest px-4 py-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/10"
          >
            <LogOut className="w-4 h-4" /> ĐĂNG XUẤT
          </button>
        </div>
        
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
              <div className="flex gap-2">
                <input 
                  type="text" 
                  required
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                  className="flex-1 min-w-0 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                  placeholder="VD: /assets/images/avatar.png"
                />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={onFileSelect} 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl text-white font-mono text-xs tracking-wider transition-colors flex flex-shrink-0 items-center justify-center gap-2"
                >
                  {uploadingImage ? 'XỬ LÝ...' : (
                    <>
                      <Upload className="w-4 h-4"/> 
                      CHỌN MÁY
                    </>
                  )}
                </button>
              </div>
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

        <ProjectManager />
      </div>

      {/* CROPPER MODAL DÀNH CHO AVATAR */}
      {imageToCrop && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header Modal */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h3 className="text-white font-mono text-xs tracking-widest text-[#FFC107]">CẮT ẢNH AVATAR</h3>
              <button 
                onClick={() => setImageToCrop(null)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Vùng Cropper */}
            <div className="relative h-80 md:h-96 bg-black">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
              />
            </div>
            
            {/* Thanh trượt control */}
            <div className="p-6 bg-black/50 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500 min-w-10">ZOOM</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-[#FFC107] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button 
                onClick={handleCropComplete}
                disabled={uploadingImage}
                className="w-full py-4 bg-[#FFC107] text-black font-semibold rounded-xl font-mono text-xs tracking-widest hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] active:scale-[0.98]"
              >
                {uploadingImage ? 'ĐANG XỬ LÝ...' : (
                  <>
                    <Check className="w-4 h-4"/> 
                    XÁC NHẬN CẮT & LƯU
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
