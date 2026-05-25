import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'motion/react';

export interface SkillCategory {
  title: string;
  items: string[];
}

const DEFAULT_SKILLS: SkillCategory[] = [
  { title: "Frontend Engineering", items: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { title: "Backend & Cloud", items: ["Firebase / Firestore", "Node.js / Express", "RESTful APIs", "Cloud Functions"] },
  { title: "Creative Tools", items: ["Figma", "Digital Painting", "Aquascape Design", "UI/UX Prototyping"] }
];

export function getSkillsData(): SkillCategory[] {
  try {
    const saved = localStorage.getItem('skills_data');
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
  } catch { return DEFAULT_SKILLS; }
}

export default function SkillsManager() {
  const [categories, setCategories] = useState<SkillCategory[]>(() => getSkillsData());
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    localStorage.setItem('skills_data', JSON.stringify(categories));
    window.dispatchEvent(new Event('storage'));
    setTimeout(() => setStatus('success'), 400);
    setTimeout(() => setStatus('idle'), 3000);
  };

  const updateCategoryTitle = (idx: number, title: string) => {
    const updated = [...categories];
    updated[idx] = { ...updated[idx], title };
    setCategories(updated);
  };

  const updateItem = (catIdx: number, itemIdx: number, value: string) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: updated[catIdx].items.map((item, i) => i === itemIdx ? value : item)
    };
    setCategories(updated);
  };

  const addItem = (catIdx: number) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: [...updated[catIdx].items, "New Skill"]
    };
    setCategories(updated);
  };

  const removeItem = (catIdx: number, itemIdx: number) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: updated[catIdx].items.filter((_, i) => i !== itemIdx)
    };
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { title: "New Category", items: ["Skill 1"] }]);
  };

  const removeCategory = (idx: number) => {
    if (categories.length <= 1) return;
    setCategories(categories.filter((_, i) => i !== idx));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 bg-surface border border-subtle-hover rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display text-primary tracking-tight">Chỉnh Sửa "Technical Mastery"</h2>
          <p className="text-muted text-sm mt-1 font-light">
            Thêm / sửa / xóa các nhóm kỹ năng (Lưu tạm trên Browser)
          </p>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl hover:bg-[#3B82F6]/20 transition-all"
        >
          <Plus className="w-4 h-4" /> THÊM NHÓM
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="bg-glass border border-subtle rounded-xl p-5 space-y-4">
            {/* Category header */}
            <div className="flex items-center gap-3">
              <GripVertical className="w-4 h-4 text-muted/50 flex-shrink-0" />
              <input
                type="text"
                value={cat.title}
                onChange={(e) => updateCategoryTitle(catIdx, e.target.value)}
                className="flex-1 bg-transparent border-b border-subtle text-primary font-serif italic text-lg focus:outline-none focus:border-accent/50 transition-colors py-1"
                placeholder="Tên nhóm kỹ năng..."
              />
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategory(catIdx)}
                  className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                  title="Xóa nhóm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Skills list */}
            <div className="space-y-2 pl-7">
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-center gap-2 group/skill">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(catIdx, itemIdx, e.target.value)}
                    className="flex-1 bg-transparent text-secondary text-sm focus:outline-none focus:text-primary transition-colors py-1"
                    placeholder="Tên kỹ năng..."
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(catIdx, itemIdx)}
                    className="opacity-0 group-hover/skill:opacity-100 p-1 text-red-500/50 hover:text-red-500 rounded transition-all"
                    title="Xóa skill"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem(catIdx)}
                className="flex items-center gap-2 text-[11px] font-mono text-muted hover:text-accent transition-colors mt-2"
              >
                <Plus className="w-3 h-3" /> Thêm skill
              </button>
            </div>
          </div>
        ))}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="w-full flex items-center justify-center gap-3 px-8 py-3 bg-accent-soft text-accent border border-accent/20 rounded-xl font-medium hover:bg-accent/20 hover:border-accent/50 transition-all disabled:opacity-50"
          >
            {status === 'saving' ? (
              <span>ĐANG LƯU...</span>
            ) : status === 'success' ? (
              <span>ĐÃ LƯU TRÊN TRÌNH DUYỆT ✓</span>
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
