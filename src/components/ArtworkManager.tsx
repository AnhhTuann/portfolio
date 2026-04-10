import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, X, Upload, Save, Check } from 'lucide-react';
import { getArtworks, addArtwork, updateArtworkData, deleteArtworkData, Artwork } from '../services/dataService';

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState<Partial<Artwork>>({});
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchArtworks = async () => {
    setLoading(true);
    const data = await getArtworks();
    setArtworks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const openAddModal = () => {
    setCurrentArtwork({ title: '', description: '', imageUrl: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (a: Artwork) => {
    setCurrentArtwork(a);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bức tranh này sẽ bị thiêu rụi vĩnh viễn bỏi lửa điện tử. Bạn chắc chứ?")) {
      await deleteArtworkData(id);
      fetchArtworks();
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
          const canvas = document.createElement('canvas');
          const MAX_SIDE = 800; // Giới hạn cạnh lớn nhất
          let width = img.width;
          let height = img.height;

          // Thuật toán: Tranh vẽ tự do tỉ lệ, giữ Y NGUYÊN gốc
          if (width > height) {
            if (width > MAX_SIDE) {
              height *= MAX_SIDE / width;
              width = MAX_SIDE;
            }
          } else {
            if (height > MAX_SIDE) {
              width *= MAX_SIDE / height;
              height = MAX_SIDE;
            }
          }

          canvas.width = Math.round(width);
          canvas.height = Math.round(height);
          const ctx = canvas.getContext('2d');
          
          if (!ctx) return reject('No context');

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Trả về chuỗi Base64
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
      setCurrentArtwork({ ...currentArtwork, imageUrl: base64String });
    } catch (err: any) {
      alert("Lỗi xử lý ảnh: " + err.message);
    }
    setUploadingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const artworkData = { ...currentArtwork };

    if (currentArtwork.id) {
      await updateArtworkData(currentArtwork.id, artworkData);
    } else {
      await addArtwork(artworkData as Omit<Artwork, 'id'>);
    }
    
    setSaving(false);
    setIsModalOpen(false);
    fetchArtworks();
  };

  return (
    <div className="mt-12 border-t border-subtle pt-12 relative z-10 w-full max-w-2xl mx-auto mb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-3xl text-primary font-light tracking-tight mb-2">Artistic Vision.</h2>
          <p className="text-gray-500 font-light text-sm">Phòng tranh Nghệ Thuật & Khung Hình Trừu Tượng</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/20 rounded-lg font-mono text-xs tracking-widest transition-colors shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> THÊM BỨC TRANH
        </button>
      </div>

      {loading ? (
        <div className="text-[#8B5CF6] font-mono text-xs animate-pulse text-center py-6">ĐANG TẢI TRANH...</div>
      ) : (
        <div className="columns-2 sm:columns-3 gap-4 space-y-4">
          {artworks.map(a => (
            <div key={a.id} className="relative group break-inside-avoid bg-glass border border-subtle rounded-xl overflow-hidden hover:border-subtle-hover transition-all">
              {/* Image filling masonry item */}
              <div className="w-full relative bg-glass">
                {a.imageUrl ? (
                  <img src={a.imageUrl} alt={a.title} className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                ) : (
                  <div className="w-full aspect-[3/4] flex flex-col items-center justify-center text-[10px] text-gray-700 font-mono bg-black/80">
                    <span>NO</span>
                    <span>IMG</span>
                  </div>
                )}
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 backdrop-blur-[2px]">
                  <h4 className="text-primary font-serif font-semibold text-xs tracking-wide truncate mb-0.5">{a.title}</h4>
                  <p className="text-muted text-[9px] font-sans line-clamp-2 mb-3">{a.description}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditModal(a)} className="flex-1 py-1.5 bg-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-primary rounded text-[10px] font-mono transition-colors flex justify-center items-center">
                      SỬA
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="w-8 h-6 flex justify-center items-center bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-primary rounded transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {artworks.length === 0 && <p className="text-gray-500 text-sm italic py-4 col-span-2">Phòng tranh số không đang vắng vẻ.</p>}
        </div>
      )}

      {/* Modal Thêm/Sửa Artwork */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-xl bg-black border border-subtle-hover rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)] my-auto"
          >
            <div className="p-4 border-b border-subtle-hover flex justify-between items-center bg-[#8B5CF6]/5 sticky top-0 z-10 rounded-t-2xl">
              <h3 className="text-[#8B5CF6] font-mono text-xs tracking-widest uppercase font-semibold">
                {currentArtwork.id ? 'HIỆU CHỈNH TÁC PHẨM' : 'TRƯNG BÀY TRANH MỚI'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-muted hover:text-primary transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-[#8B5CF6] uppercase tracking-widest">Tiêu đề tác phẩm</label>
                <input 
                  type="text" required value={currentArtwork.title || ''}
                  onChange={(e) => setCurrentArtwork({...currentArtwork, title: e.target.value})}
                  className="w-full bg-glass border border-subtle rounded-xl px-4 py-3 text-primary font-serif placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors"
                  placeholder="VD: Nỗi ám ảnh của gã lập trình viên..."
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted uppercase tracking-widest flex justify-between items-center">
                  <span>Khung Tranh Sơn Dầu</span>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="text-[10px] px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/20 rounded transition-colors flex items-center gap-1"
                  >
                    {uploadingImage ? 'ĐANG ÉP KHUNG...' : <><Upload className="w-3 h-3"/> TREO TRANH</>}
                  </button>
                </label>
                
                <div className="relative min-h-[200px] w-full border border-dashed border-[#8B5CF6]/30 rounded-xl overflow-hidden bg-background flex flex-col items-center justify-center group hover:border-[#8B5CF6]/60 transition-colors p-2">
                  {currentArtwork.imageUrl ? (
                    <div className="relative max-h-[400px] w-full flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
                      <img src={currentArtwork.imageUrl} className="max-w-full max-h-[400px] object-contain shadow-2xl" alt="Preview Frame" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 border border-white/20 rounded-lg text-primary font-mono text-xs hover:bg-white/10 flex items-center gap-2"><Upload className="w-4 h-4"/> ĐỔI CUỘN TRANH</button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-[#8B5CF6]/60 font-mono text-xs text-center p-8">
                      <Upload className="w-8 h-8 mx-auto mb-3 opacity-50" strokeWidth={1} />
                      Tỉ lệ gốc mộc định.<br/>
                      <span className="text-[10px] text-gray-500">(Cạnh dài nhất sẽ được ép xuống 800px giới hạn)</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[10px] text-muted uppercase tracking-widest">Lời tự sự (Câu chuyện phía sau)</label>
                <textarea 
                  required rows={4} value={currentArtwork.description || ''}
                  onChange={(e) => setCurrentArtwork({...currentArtwork, description: e.target.value})}
                  className="w-full bg-glass border border-subtle rounded-xl px-4 py-3 text-primary placeholder:text-gray-600 focus:outline-none focus:border-white/[0.2] transition-colors resize-none text-sm font-light italic"
                  placeholder="2 giờ sáng, ánh đèn leo lét, cây bút chì gãy đôi rơi rụng xuống kẽ chân..."
                />
              </div>

              <div className="pt-8">
                <button 
                  type="submit" disabled={saving || uploadingImage}
                  className="w-full py-4 bg-[#8B5CF6] text-primary font-semibold rounded-xl font-mono text-xs tracking-widest hover:bg-[#A78BFA] transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-[0.98] disabled:opacity-50"
                >
                  {saving ? 'ĐANG KÝ TÊN TÁC GIẢ...' : <><Save className="w-4 h-4"/> XUẤT HIỆN TẠI TRIỂN LÃM</>}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
