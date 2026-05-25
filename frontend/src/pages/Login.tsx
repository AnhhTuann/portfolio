import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signInWithGoogle, signInWithEmail } from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { ArrowLeft, Fingerprint, AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  // Email form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) return <div className="min-h-screen bg-background"></div>;
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const result = await signInWithGoogle();
    if (result.success) {
      navigate('/admin');
    } else {
      setError(`${result.error}`);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError('');
    const result = await signInWithEmail(email, password);
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
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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

        {/* Divider */}
        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-subtle"></div>
          <span className="font-mono text-[10px] text-muted tracking-widest">HOẶC</span>
          <div className="flex-1 h-px bg-subtle"></div>
        </div>

        {/* Google Login */}
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full relative group px-8 py-3.5 bg-glass border border-subtle hover:border-subtle-hover text-primary rounded-xl overflow-hidden font-mono text-xs tracking-widest font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            ĐĂNG NHẬP VỚI GOOGLE
          </span>
        </button>
      </motion.div>
    </div>
  );
}
