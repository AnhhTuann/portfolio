import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signInWithEmail, isAuthenticated } from '../services/authService';
import { ArrowLeft, Fingerprint, AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Email form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setAuthStatus(isAuthenticated());
  }, []);

  if (authStatus === null) return <div className="min-h-screen bg-background"></div>;
  if (authStatus) return <Navigate to="/admin" replace />;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError('');
    const result = await signInWithEmail(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(`${result.error}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-secondary font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <Link to="/" className="absolute top-12 left-12 inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-mono text-xs tracking-widest z-10">
        <ArrowLeft className="w-4 h-4" /> CANCEL
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-sm flex flex-col items-center"
      >
        <div className="w-20 h-20 mb-8 rounded-full border border-subtle-hover bg-glass flex items-center justify-center relative group">
          <div className="absolute inset-0 rounded-full border-t border-[#3B82F6] animate-spin opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          <Fingerprint className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        </div>

        <h1 className="font-display text-4xl text-primary font-light tracking-tight mb-2 text-center">Xác Thực.</h1>
        <p className="text-gray-500 font-light text-sm text-center mb-10">Hệ thống yêu cầu quyền truy cập cấp cao</p>

        {error && (
          <div className="mb-6 w-full flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-mono tracking-wide">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="w-full space-y-4 mb-6">
          <div className="relative">
            <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full bg-glass border border-subtle rounded-xl pl-11 pr-4 py-3.5 text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              className="w-full bg-glass border border-subtle rounded-xl pl-11 pr-11 py-3.5 text-primary placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-3.5 bg-accent text-white dark:text-black rounded-xl font-mono text-xs tracking-widest font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_var(--accent-soft)]"
          >
            {loading ? 'ĐANG KẾT NỐI...' : 'ĐĂNG NHẬP'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
