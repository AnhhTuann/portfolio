import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { signInWithEmail, isAuthenticated } from '../services/authService';
import { ArrowLeft, Fingerprint, AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';

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
    <div className="portfolio-studio flex min-h-screen flex-col overflow-hidden px-5 py-8 font-sans text-secondary md:px-10 md:py-10">
      <Link
        to="/"
        className="relative z-10 inline-flex w-fit items-center gap-2 rounded-full border border-subtle bg-surface px-4 py-2.5 text-xs font-semibold text-secondary transition-colors hover:border-accent hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" /> VỀ TRANG CHỦ
      </Link>

      <div className="relative flex flex-1 items-center justify-center py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md rounded-[2rem] border border-subtle bg-surface/90 p-6 shadow-[0_24px_70px_rgba(30,42,55,0.12)] backdrop-blur md:p-10"
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Fingerprint className="h-7 w-7" strokeWidth={1.5} />
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-surface bg-[#82b93a]" />
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                Studio / Private area
              </p>
              <p className="text-xs text-muted">Chỉ dành cho quản trị viên</p>
            </div>
          </div>

          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight text-primary">
            Chào mừng trở lại.
          </h1>
          <p className="mb-8 text-sm leading-6 text-secondary">
            Đăng nhập để tiếp tục chăm sóc không gian sáng tạo của mình.
          </p>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-300"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xs font-semibold text-primary">
                Tên đăng nhập
              </label>
              <div className="relative">
                <Fingerprint className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  required
                  className="w-full rounded-xl border border-subtle bg-background px-4 py-3.5 pl-11 text-sm text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-semibold text-primary">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  className="w-full rounded-xl border border-subtle bg-background px-4 py-3.5 pl-11 pr-11 text-sm text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-bold text-background shadow-[0_10px_24px_var(--accent-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_var(--accent-soft)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'ĐANG ĐĂNG NHẬP...' : 'ĐĂNG NHẬP'}
            </button>
          </form>

          <p className="mt-7 border-t border-subtle pt-5 text-center text-xs text-muted">
            Một góc nhỏ được bảo vệ để quản lý portfolio.
          </p>
        </motion.main>
      </div>
    </div>
  );
}
