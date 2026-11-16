import {
  AlertCircle,
  Building2,
  Calendar,
  ExternalLink,
  Flame,
  FolderGit2,
  GitCommit,
  GitPullRequest,
  Star,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { PortfolioLanguage } from '../utils/portfolioTranslations';

interface GitHubUserStats {
  publicRepos: number;
  followers: number;
  createdAt: string;
}

export default function GitHubAnalytics({ language }: { language: PortfolioLanguage }) {
  const isEn = language === 'en';
  const [liveStats, setLiveStats] = useState<GitHubUserStats>({
    publicRepos: 65,
    followers: 5,
    createdAt: '2018-10-22',
  });

  useEffect(() => {
    fetch('https://api.github.com/users/AnhhTuann')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setLiveStats({
            publicRepos: data.public_repos ?? 65,
            followers: data.followers ?? 5,
            createdAt: data.created_at ? data.created_at.split('T')[0] : '2018-10-22',
          });
        }
      })
      .catch(() => {});
  }, []);

  const languages = [
    { name: 'TypeScript', percent: 71.27, color: '#2563a6' },
    { name: 'JavaScript', percent: 20.87, color: '#d97706' },
    { name: 'HTML', percent: 4.29, color: '#dc2626' },
    { name: 'SCSS', percent: 2.28, color: '#db2777' },
    { name: 'C#', percent: 1.29, color: '#7c3aed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 rounded-[2rem] border border-subtle bg-surface/90 p-6 shadow-sm backdrop-blur md:mt-16 md:p-8"
    >
      {/* Header bar matching Studio style */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-subtle pb-6">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded-full border border-subtle bg-glass px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            GITHUB METRICS
          </span>
          <h3 className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
            GitHub Analytics.
          </h3>
          <p className="mt-1 font-sans text-xs text-muted md:text-sm">
            {isEn
              ? 'Real-time code contributions, active streak & technical activity'
              : 'Thống kê hoạt động đóng góp mã nguồn, tần suất commit & xếp hạng thực tế'}
          </p>
        </div>

        <a
          href="https://github.com/AnhhTuann"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-subtle bg-glass px-4 py-2 font-mono text-xs font-semibold text-primary transition-all hover:border-accent hover:text-accent hover:shadow-sm"
        >
          <span>github.com/AnhhTuann</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="space-y-6">
        {/* 1. Top Card: Streak & Contributions Stats */}
        <div className="rounded-2xl border border-subtle bg-glass p-6">
          <div className="grid grid-cols-1 divide-y divide-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
            {/* Total contributions */}
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="font-display text-4xl font-extrabold tracking-tight text-accent md:text-5xl">
                1,280
              </span>
              <span className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-primary">
                {isEn ? 'Total Contributions' : 'Tổng Đóng Góp'}
              </span>
              <span className="mt-1 font-mono text-[11px] text-muted">
                Oct 22, 2018 - {isEn ? 'Present' : 'Hiện tại'}
              </span>
            </div>

            {/* Current streak */}
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="relative flex h-20 w-20 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 72 72">
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="5"
                    className="text-subtle"
                    fill="transparent"
                  />
                  <circle
                    cx="36"
                    cy="36"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeDasharray="188.4"
                    strokeDashoffset="170"
                    strokeLinecap="round"
                    fill="transparent"
                    className="text-accent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <Flame className="h-4 w-4 text-accent fill-accent" />
                  <span className="font-display text-xl font-bold text-primary">0</span>
                </div>
              </div>
              <span className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-accent">
                {isEn ? 'Current Streak' : 'Chuỗi Hiện Tại'}
              </span>
              <span className="mt-1 font-mono text-[11px] text-muted">
                {new Date().toLocaleDateString(isEn ? 'en-US' : 'vi-VN', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            {/* Longest streak */}
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="font-display text-4xl font-extrabold tracking-tight text-accent md:text-5xl">
                8
              </span>
              <span className="mt-2 font-sans text-xs font-bold uppercase tracking-wider text-primary">
                {isEn ? 'Longest Streak' : 'Kỷ Lục Chuỗi'}
              </span>
              <span className="mt-1 font-mono text-[11px] text-muted">May 5 - May 12</span>
            </div>
          </div>
        </div>

        {/* 2. Middle Row: Stats (A+) & Languages */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Middle Left: GitHub Stats Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-subtle bg-glass p-6">
            <h4 className="mb-6 font-display text-lg font-bold tracking-tight text-primary">
              {isEn ? "Nguyễn Đức Anh Tuấn's GitHub Stats" : 'Chỉ số GitHub của Nguyễn Đức Anh Tuấn'}
            </h4>

            <div className="flex items-center justify-between gap-6">
              {/* Stat list */}
              <div className="space-y-3.5 text-sm">
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-accent" />
                  <span className="text-secondary">{isEn ? 'Total Stars:' : 'Tổng Sao:'}</span>
                  <span className="font-mono font-bold text-primary">4</span>
                </div>
                <div className="flex items-center gap-3">
                  <GitCommit className="h-4 w-4 text-accent" />
                  <span className="text-secondary">
                    {isEn ? 'Total Commits (2026):' : 'Số Commits (2026):'}
                  </span>
                  <span className="font-mono font-bold text-primary">612+</span>
                </div>
                <div className="flex items-center gap-3">
                  <GitPullRequest className="h-4 w-4 text-accent" />
                  <span className="text-secondary">{isEn ? 'Total PRs:' : 'Tổng Pull Request:'}</span>
                  <span className="font-mono font-bold text-primary">8</span>
                </div>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  <span className="text-secondary">{isEn ? 'Total Issues:' : 'Tổng Issues:'}</span>
                  <span className="font-mono font-bold text-primary">0</span>
                </div>
                <div className="flex items-center gap-3">
                  <FolderGit2 className="h-4 w-4 text-accent" />
                  <span className="text-secondary">{isEn ? 'Contributed to:' : 'Đóng góp dự án:'}</span>
                  <span className="font-mono font-bold text-primary">0</span>
                </div>
              </div>

              {/* Grade Ring (A+) */}
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-subtle"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeDasharray="251.2"
                    strokeDashoffset="35"
                    strokeLinecap="round"
                    fill="transparent"
                    className="text-accent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-black tracking-tight text-primary">
                    A+
                  </span>
                  <span className="font-mono text-[9px] font-bold text-accent uppercase tracking-wider">
                    RANK
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Right: Most Used Languages */}
          <div className="flex flex-col justify-between rounded-2xl border border-subtle bg-glass p-6">
            <h4 className="mb-6 font-display text-lg font-bold tracking-tight text-primary">
              {isEn ? 'Most Used Languages' : 'Ngôn ngữ sử dụng nhiều nhất'}
            </h4>

            <div>
              {/* Segmented bar */}
              <div className="mb-6 flex h-3.5 w-full overflow-hidden rounded-full bg-subtle p-0.5 shadow-inner">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{
                      width: `${lang.percent}%`,
                      backgroundColor: lang.color,
                    }}
                    className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500"
                    title={`${lang.name}: ${lang.percent}%`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-medium md:grid-cols-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2.5">
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-secondary">{lang.name}</span>
                    <span className="font-mono text-muted">{lang.percent}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Row: Profile metadata & Contribution Wave Chart */}
        <div className="rounded-2xl border border-subtle bg-glass p-6 md:p-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left metadata */}
            <div className="space-y-4">
              <h4 className="font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
                anhhtuann <span className="font-sans text-base font-normal text-muted">(Nguyễn Đức Anh Tuấn)</span>
              </h4>

              <div className="space-y-3 font-sans text-sm">
                <div className="flex items-center gap-3 text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-subtle text-accent shadow-sm">
                    🐙
                  </span>
                  <span>
                    <strong className="text-primary font-semibold">1.28k</strong>{' '}
                    {isEn ? 'Contributions on GitHub' : 'Lượt đóng góp trên GitHub'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-subtle text-accent shadow-sm">
                    <FolderGit2 className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="text-primary font-semibold">{liveStats.publicRepos}</strong>{' '}
                    {isEn ? 'Public Repositories' : 'Kho lưu trữ công khai (Repos)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-subtle text-accent shadow-sm">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <span>
                    {isEn ? 'Joined GitHub 8 years ago' : 'Gia nhập GitHub từ 2018 (8 năm trước)'}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface border border-subtle text-accent shadow-sm">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <span>
                    {isEn ? 'Education / Org:' : 'Đại học:'} <strong className="text-primary font-semibold">SGU</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Area Curve Chart styled to match the site theme */}
            <div className="flex flex-col">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                  {isEn ? 'Activity Wave' : 'Biểu đồ hoạt động'}
                </span>
                <span className="font-mono text-xs text-muted">
                  {isEn ? 'contributions in the last year' : 'lượt đóng góp trong năm qua'}
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative w-full overflow-hidden rounded-xl border border-subtle bg-surface p-4 shadow-sm">
                <svg
                  viewBox="0 0 500 200"
                  className="w-full h-auto"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="studioCurveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[30, 60, 90, 120, 150].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="460"
                      y2={y}
                      stroke="currentColor"
                      className="text-subtle"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Smooth wave area */}
                  <path
                    d="M 0,170 
                       C 25,165 40,140 60,140 
                       C 80,140 100,168 130,170 
                       C 160,172 180,165 200,165 
                       C 220,165 235,110 250,90 
                       C 265,70 280,120 300,75 
                       C 320,30 340,35 360,95 
                       C 380,155 390,172 410,170 
                       C 425,168 435,145 445,150 
                       C 455,155 458,168 460,170 
                       L 460,170 L 0,170 Z"
                    fill="url(#studioCurveGradient)"
                  />

                  {/* Top stroke of curve */}
                  <path
                    d="M 0,170 
                       C 25,165 40,140 60,140 
                       C 80,140 100,168 130,170 
                       C 160,172 180,165 200,165 
                       C 220,165 235,110 250,90 
                       C 265,70 280,120 300,75 
                       C 320,30 340,35 360,95 
                       C 380,155 390,172 410,170 
                       C 425,168 435,145 445,150 
                       C 455,155 458,168 460,170"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Y-axis numbers */}
                  <g className="font-mono text-[9px] fill-current text-muted">
                    <text x="470" y="35">200</text>
                    <text x="470" y="65">160</text>
                    <text x="470" y="95">120</text>
                    <text x="470" y="125">80</text>
                    <text x="470" y="150">40</text>
                    <text x="470" y="172">0</text>
                  </g>
                </svg>

                {/* X-axis date labels */}
                <div className="mt-2 flex justify-between px-2 font-mono text-[10px] text-muted">
                  <span>25/11</span>
                  <span>26/01</span>
                  <span>26/03</span>
                  <span>26/05</span>
                  <span>26/07</span>
                  <span>26/09</span>
                  <span>26/11</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
