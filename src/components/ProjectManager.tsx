import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, X, Upload, Save, Check } from 'lucide-react';
import { getProjects, addProject, updateProjectData, deleteProjectData, Project } from '../services/dataService';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [techStackInput, setTechStackInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setCurrentProject({ name: '', painPoint: '', imageUrl: '', liveLink: '', sourceCode: '' });
    setTechStackInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setCurrentProject(p);
    setTechStackInput(p.techStack ? p.techStack.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      await deleteProjectData(id);
      fetchProjects();
    }
  };

  const handleImageBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas'); // Khởi tạo thợ vẽ
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          // Cắt tự động khung 16:10 để ảnh tràn viền 
          const targetRatio = 16 / 10;
          const imgRatio = width / height;

          let sx = 0, sy = 0, sWidth = width, sHeight = height;

          if (imgRatio > targetRatio) {
            // Ảnh dẹt hơn 16:10 -> cắt bỏ hai bên mép
            sWidth = height * targetRatio;
            sx = (width - sWidth) / 2;
          } else {
            // Ảnh cao hơn 16:10 -> cắt bỏ trên dưới
            sHeight = width / targetRatio;
            sy = (height - sHeight) / 2;
          }

          canvas.width = MAX_WIDTH;
          canvas.height = MAX_HEIGHT;
          const ctx = canvas.getContext('2d');
          
          if (!ctx) return reject('No context');

          // Đóng mộc vào khung 800x500
          ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, MAX_WIDTH, MAX_HEIGHT);
          
          // Trả về chuỗi Base64 JPEG cho nhẹ nhàng Firestore
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const base64String = await handleImageBase64(file);
      setCurrentProject({ ...currentProject, imageUrl: base64String });
    } catch (err: any) {
      alert("Lỗi xử lý ảnh: " + err.message);
    }
    setUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const projectData = {
      ...currentProject,
      techStack: techStackInput.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    if (currentProject.id) {
      await updateProjectData(currentProject.id, projectData);
    } else {
      await addProject(projectData as Omit<Project, 'id'>);
    }
    
    setSaving(false);
    setIsModalOpen(false);
    fetchProjects();
  };

  return (
    <div className="mt-20 border-t border-white/[0.05] pt-12 relative z-10 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-3xl text-white font-light tracking-tight mb-2">Digital Canvas.</h2>
          <p className="text-gray-500 font-light text-sm">Quản lý các mảnh ghép sáng tạo</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFC107]/10 text-[#FFC107] hover:bg-[#FFC107]/20 border border-[#FFC107]/20 rounded-lg font-mono text-xs tracking-widest transition-colors shadow-[0_0_15px_rgba(255,193,7,0.1)] hover:shadow-[0_0_20px_rgba(255,193,7,0.3)]"
        >
          <Plus className="w-4 h-4" /> THÊM PROJECT
        </button>
      </div>

      {loading ? (
        <div className="text-[#3B82F6] font-mono text-xs animate-pulse text-center py-6">ĐANG TẢI DỮ LIỆU...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex gap-4 hover:border-white/[0.1] transition-colors group">
              <div className="w-20 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0 border border-white/10 relative">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-700 font-mono">
                    <span>NO</span>
                    <span>IMG</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className="text-white font-semibold text-sm truncate">{p.name}</h4>
                <p className="text-gray-500 text-[10px] font-mono truncate mt-1">{p.techStack?.slice(0,2).join(', ')}{p.techStack && p.techStack.length > 2 ? '...' : ''}</p>
              </div>
              <div className="flex flex-col gap-1 justify-center">
                <button onClick={() => openEditModal(p)} className="p-1.5 text-gray-500 hover:text-[#3B82F6] rounded-md hover:bg-[#3B82F6]/10 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-500 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-gray-500 text-sm italic py-4">Hệ thống The Matrix đang trống. Bạn chưa thêm dự án nào.</p>}
        </div>
      )}

      {/* Modal Thêm/Sửa Dự Án */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl my-auto"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/50 sticky top-0 z-10 rounded-t-2xl">
              <h3 className="text-[#FFC107] font-mono text-xs tracking-widest uppercase font-semibold">
                {currentProject.id ? 'SỬA THÔNG TIN DỰ ÁN' : 'KHỞI TẠO DỰ ÁN MỚI'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tên Dự Án */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block font-mono text-[10px] text-[#3B82F6] uppercase tracking-widest">Tên Dự Án</label>
                  <input 
                    type="text" required value={currentProject.name || ''}
                    onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                    placeholder="Tên Hệ Thống. (VD: NEXUS CMS)"
                  />
                </div>

                {/* Tech Stack */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Tech Stack (Ngăn cách phẩy)</label>
                  <input 
                    type="text" required value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white font-mono text-xs placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                    placeholder="VD: Next.js, Tailwind, Firestore"
                  />
                </div>

                {/* Mô tả Pain Point */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">The Pain Point (Vấn Đề Giải Quyết)</label>
                  <textarea 
                    required rows={3} value={currentProject.painPoint || ''}
                    onChange={(e) => setCurrentProject({...currentProject, painPoint: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors resize-none text-sm"
                    placeholder="Dự án sinh ra để dẹp tan nỗi đau gì của người dùng?"
                  />
                </div>

                {/* Links */}
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Link Sản phẩm sống (Live)</label>
                  <input 
                    type="url" value={currentProject.liveLink || ''}
                    onChange={(e) => setCurrentProject({...currentProject, liveLink: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors text-xs font-mono"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest">Mã Nguồn (Source Code)</label>
                  <input 
                    type="url" value={currentProject.sourceCode || ''}
                    onChange={(e) => setCurrentProject({...currentProject, sourceCode: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors text-xs font-mono"
                    placeholder="https://github.com/..."
                  />
                </div>

                {/* Ảnh Minh Họa */}
                <div className="space-y-2 md:col-span-2 mt-2">
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest flex justify-between items-center">
                    <span>Ảnh Demo Dự Án</span>
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="text-[10px] px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20 border border-[#3B82F6]/20 rounded transition-colors flex items-center gap-1"
                    >
                      {uploadingImage ? 'ĐANG XỬ LÝ...' : <><Upload className="w-3 h-3"/> TẢI ẢNH (TỰ ĐỘNG CẮT 16:10)</>}
                    </button>
                  </label>
                  
                  <div className="relative aspect-[16/10] w-full border border-dashed border-white/20 rounded-xl overflow-hidden bg-black/50 flex flex-col items-center justify-center group hover:border-[#3B82F6]/50 transition-colors">
                    {currentProject.imageUrl ? (
                      <>
                        <img src={currentProject.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-white/20 rounded-lg text-white font-mono text-xs hover:bg-white/10 flex items-center gap-2"><Upload className="w-4 h-4"/> ĐỔI ẢNH KHÁC</button>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-600 font-mono text-xs text-center">
                        <Upload className="w-8 h-8 mx-auto mb-3 opacity-30" strokeWidth={1} />
                        Kích thước Auto Canvas: 800x500<br/>
                        <span className="text-[10px] text-gray-700">(Được nén Base64 siêu tiết kiệm)</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  </div>
                </div>

              </div>

              {/* Submit */}
              <div className="pt-6 pb-2 border-t border-white/10">
                <button 
                  type="submit" disabled={saving || uploadingImage}
                  className="w-full py-4 bg-[#FFC107] text-black font-semibold rounded-xl font-mono text-xs tracking-widest hover:bg-[#FFD54F] transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] active:scale-[0.98] disabled:opacity-50"
                >
                  {saving ? 'ĐANG LƯU DỮ LIỆU VÀO MA TRẬN...' : <><Save className="w-4 h-4"/> TRIỂN KHAI DỰ ÁN LÊN HỆ THỐNG</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
