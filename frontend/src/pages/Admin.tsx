import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Save, ArrowLeft, LogOut, Upload, X, Check } from 'lucide-react';
import { getProfile, updateProfile, Profile } from '../services/dataService';
import { logout } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import AboutManager from '../components/AboutManager';
import SkillsManager from '../components/SkillsManager';
import ProjectManager from '../components/ProjectManager';
import ArtworkManager from '../components/ArtworkManager';
import MessageManager from '../components/MessageManager';

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
    canvas.width = 800; // Xuất ảnh 800x800 sắc nét
    canvas.height = 800;
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
      800,
      800
    );

    return canvas.toDataURL('image/jpeg', 0.85); // Nén 0.85 chất lượng cao sắc nét
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
    <div className="portfolio-studio studio-admin relative min-h-screen overflow-x-hidden px-5 py-6 font-sans text-secondary md:px-10 md:py-10">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[20%] h-[50%] w-[50%] rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-[#ad4564]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-subtle bg-surface/90 px-4 py-3 shadow-sm backdrop-blur md:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Về trang chủ
          </Link>
          <span className="hidden items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted sm:inline-flex">
            <span className="h-2 w-2 rounded-full bg-[#82b93a]" />
            Studio / Bảng điều khiển
          </span>
          <button
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-300"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </button>
        </header>

        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-subtle pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
              Không gian sáng tạo / Quản trị
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl"
            >
              Studio của bạn.
            </motion.h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-secondary">
              Cập nhật hồ sơ và quản lý những nội dung đang xuất hiện trên portfolio.
            </p>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2 text-xs font-semibold text-secondary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#82b93a]" />
            Đang hoạt động
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="studio-admin-panel space-y-6 rounded-[1.75rem] border border-subtle bg-surface p-5 shadow-[0_16px_45px_rgba(30,42,55,0.08)] md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary">Tên hiển thị</label>
              <input 
                type="text" 
                required
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full rounded-xl border border-subtle bg-background px-4 py-3.5 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                placeholder="VD: Nguyễn Đức Anh Tuấn."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary">Ảnh đại diện</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  required
                  value={profile.avatarUrl}
                  onChange={(e) => setProfile({...profile, avatarUrl: e.target.value})}
                  className="min-w-0 flex-1 rounded-xl border border-subtle bg-background px-4 py-3.5 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                  placeholder="Đường dẫn ảnh hoặc chọn ảnh"
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
                  className="flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-subtle px-4 text-xs font-semibold text-secondary transition-colors hover:border-accent hover:text-accent"
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

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-primary">Vai trò <span className="font-normal text-muted">(cách nhau bằng dấu phẩy)</span></label>
            <input 
              type="text" 
              required
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              className="w-full rounded-xl border border-subtle bg-background px-4 py-3.5 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
              placeholder="VD: Software Engineer, Creative Explorer"
            />
          </div>

          <div className="space-y-2">
             <label className="block text-xs font-semibold text-primary">Giới thiệu</label>
             <textarea 
                rows={4}
                required
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
                className="w-full resize-y rounded-xl border border-subtle bg-background px-4 py-3.5 text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
             />
          </div>

          <div className="border-t border-subtle pt-5">
            <button 
              type="submit" 
              disabled={status === 'saving'}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 font-semibold text-background shadow-[0_10px_24px_var(--accent-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_var(--accent-soft)] disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="studio-admin-managers">
          <AboutManager />
          <SkillsManager />
          <ProjectManager />
          <ArtworkManager />
          <MessageManager />
        </div>
      </div>

      {/* CROPPER MODAL DÀNH CHO AVATAR */}
      {imageToCrop && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-lg bg-surface border border-subtle-hover rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header Modal */}
            <div className="p-4 border-b border-subtle-hover flex justify-between items-center bg-glass">
              <h3 className="text-primary font-mono text-xs tracking-widest text-accent">CẮT ẢNH AVATAR</h3>
              <button 
                onClick={() => setImageToCrop(null)} 
                className="text-muted hover:text-primary transition-colors p-1"
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
            <div className="p-6 bg-glass flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500 min-w-10">ZOOM</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-accent h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <button 
                onClick={handleCropComplete}
                disabled={uploadingImage}
                className="w-full py-4 bg-accent text-white dark:text-black font-semibold rounded-xl font-mono text-xs tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_var(--accent-soft)] active:scale-[0.98]"
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
