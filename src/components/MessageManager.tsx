import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MailOpen, Trash2, CheckCircle2 } from 'lucide-react';
import { getMessages, deleteMessageData, updateMessageStatus, MessageData } from '../services/dataService';

export default function MessageManager() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Xóa tin nhắn này vĩnh viễn?")) {
      await deleteMessageData(id);
      fetchMessages();
    }
  };

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    await updateMessageStatus(id, !currentStatus);
    fetchMessages();
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Unknown Date';
    return new Date(isoString).toLocaleString('vi-VN', {
      hour: '2-digit', minute: '2-digit', 
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="mt-12 border-t border-subtle pt-12 relative z-10 w-full max-w-2xl mx-auto mb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-3xl text-primary font-light tracking-tight mb-2">Hộp Thư Tín Hiệu.</h2>
          <p className="text-gray-500 font-light text-sm">Quản lý kết nối từ người dùng</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg font-mono text-xs tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <Mail className="w-4 h-4" /> {messages.filter(m => !m.read).length} CHƯA ĐỌC
        </div>
      </div>

      {loading ? (
        <div className="text-blue-400 font-mono text-xs animate-pulse text-center py-6">ĐANG ĐỒNG BỘ TÍN HIỆU...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map(m => (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-glass border rounded-xl p-5 flex flex-col gap-4 transition-all ${
                m.read ? 'border-subtle opacity-70' : 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-primary font-semibold text-sm truncate">{m.name}</h4>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                  </div>
                  <a href={`mailto:${m.email}`} className="text-blue-400 text-xs font-mono hover:underline">{m.email}</a>
                </div>
                <div className="text-gray-500 text-[10px] font-mono whitespace-nowrap">
                  {formatDate(m.createdAt)}
                </div>
              </div>
              
              <div className="text-sm text-gray-300 font-light leading-relaxed bg-black/30 p-3 rounded-lg border border-subtle-hover whitespace-pre-wrap">
                {m.message}
              </div>

              <div className="flex justify-end gap-2 mt-1">
                <button 
                  onClick={() => handleToggleRead(m.id!, !!m.read)} 
                  className={`p-2 rounded-md transition-colors flex items-center gap-1.5 text-[10px] font-mono ${
                    m.read 
                      ? 'text-gray-500 hover:text-primary hover:bg-white/10' 
                      : 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20'
                  }`}
                >
                  {m.read ? <><Mail className="w-3 h-3" /> ĐÁNH DẤU CHƯA ĐỌC</> : <><MailOpen className="w-3 h-3" /> ĐÁNH DẤU ĐÃ ĐỌC</>}
                </button>
                <button 
                  onClick={() => handleDelete(m.id!)} 
                  className="p-2 text-gray-500 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {messages.length === 0 && <p className="text-gray-500 text-sm italic py-8 text-center border border-dashed border-subtle rounded-xl">Chưa có tín hiệu nào truyền tới hệ thống.</p>}
        </div>
      )}
    </div>
  );
}
