import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signInWithGoogle } from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ArrowLeft, Fingerprint, AlertCircle } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) return <div className="min-h-screen bg-[#050505]"></div>;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const result = await signInWithGoogle();
    if (result.success) {
      navigate('/admin');
    } else {
      setError(`Lỗi: ${result.error}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <Link to="/" className="absolute top-12 left-12 inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-xs tracking-widest z-10">
        <ArrowLeft className="w-4 h-4" /> CANCEL
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center"
      >
        <div className="w-20 h-20 mb-8 rounded-full border border-white/[0.1] bg-white/[0.02] flex items-center justify-center relative group">
          <div className="absolute inset-0 rounded-full border-t border-[#3B82F6] animate-spin opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <Fingerprint className="w-8 h-8 text-[#FFC107] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-4xl text-white font-light tracking-tight mb-2 text-center">Xác Thực.</h1>
        <p className="text-gray-500 font-light text-sm text-center mb-12">Hệ thống yêu cầu quyền truy cập cấp cao</p>

        {error && (
          <div className="mb-6 w-full flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-mono tracking-wide">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full relative group px-8 py-4 bg-white text-black rounded-xl overflow-hidden font-mono text-xs tracking-widest font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            {loading ? 'ĐANG KẾT NỐI...' : 'ĐĂNG NHẬP VỚI GOOGLE'}
          </span>
        </button>
      </motion.div>
    </div>
  );
}
