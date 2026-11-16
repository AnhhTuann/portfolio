import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';

interface HeroAvatarProps {
  avatarUrl?: string;
  heroName: string;
}

export default function HeroAvatar({ avatarUrl, heroName }: HeroAvatarProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse relative coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth, organic physics
  const mouseX = useSpring(x, { stiffness: 180, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 22 });

  // 3D Tilt for card
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  // Multi-layer parallax
  const tealX = useTransform(mouseX, [-0.5, 0.5], [-16, 16]);
  const tealY = useTransform(mouseY, [-0.5, 0.5], [-16, 16]);

  const purpleX = useTransform(mouseX, [-0.5, 0.5], [14, -14]);
  const purpleY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const badgeLeftX = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const badgeLeftY = useTransform(mouseY, [-0.5, 0.5], [-14, 14]);

  const badgeRightX = useTransform(mouseX, [-0.5, 0.5], [16, -16]);
  const badgeRightY = useTransform(mouseY, [-0.5, 0.5], [14, -14]);

  const avatarX = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const avatarY = useTransform(mouseY, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="order-2 mx-auto w-full max-w-[500px] lg:order-2 select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto aspect-[0.92] max-w-[460px] rounded-[2rem] bg-[#f7b2a1] p-5 shadow-2xl md:rounded-[2.5rem] md:p-7 will-change-transform group cursor-pointer"
      >
        {/* Decorative Floating Shape 1: Top-Right Teal Circle */}
        <motion.div
          style={{ x: tealX, y: tealY }}
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-3 top-8 h-20 w-20 rounded-full bg-[#67c7c3] shadow-md md:-right-6 md:h-28 md:w-28"
        />

        {/* Decorative Floating Shape 2: Bottom-Left Purple Rounded Box */}
        <motion.div
          style={{ x: purpleX, y: purpleY }}
          animate={{
            y: [0, 8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6,
          }}
          className="absolute -bottom-5 -left-4 h-24 w-24 rounded-[2rem] bg-[#8a78d6] shadow-md md:-bottom-7 md:-left-7 md:h-32 md:w-32"
        />

        {/* Main Inner Frame with Portrait Photo */}
        <motion.div
          style={{ x: avatarX, y: avatarY }}
          className="relative z-10 h-full w-full overflow-hidden rounded-[1.5rem] bg-[#f5f2eb] shadow-inner md:rounded-[2rem]"
        >
          {/* Subtle bottom tone backdrop */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#e8e5de]" />

          {/* Interactive Avatar Image */}
          <Link
            to="/admin"
            aria-label="Mở trang quản trị hồ sơ"
            className="absolute inset-0 z-10 block focus:outline-none"
          >
            <motion.img
              src={avatarUrl || '/assets/images/avatar.png'}
              alt={`${heroName}'s Avatar`}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-contain object-bottom drop-shadow-sm"
            />
          </Link>

          {/* Soft light sweep overlay on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Sticker Badge 1: Top-Left "Hi, I'm Anh Tuấn ✳" */}
        <motion.div
          style={{ x: badgeLeftX, y: badgeLeftY }}
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -6, 0],
            rotate: [-6, -3, -6],
          }}
          transition={{
            scale: { duration: 0.6, delay: 0.3, type: 'spring', stiffness: 300, damping: 20 },
            opacity: { duration: 0.3, delay: 0.3 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          whileHover={{
            scale: 1.1,
            rotate: -2,
            transition: { type: 'spring', stiffness: 400, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute -left-5 top-8 z-30 rounded-xl bg-[#f8f3e8] px-4 py-3 shadow-xl md:-left-10 md:top-12 border border-[#eadfc8]/60 cursor-pointer"
        >
          <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-[#747b86]">
            Hi, I’m
          </span>
          <span className="font-display text-sm font-bold text-[#242a38] flex items-center">
            <span>Anh Tuấn</span>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              className="inline-block ml-1 text-accent text-xs origin-center"
            >
              ✳
            </motion.span>
          </span>
        </motion.div>

        {/* Sticker Badge 2: Bottom-Right "Code × Art" */}
        <motion.div
          style={{ x: badgeRightX, y: badgeRightY }}
          initial={{ scale: 0, rotate: 20, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, 6, 0],
            rotate: [3, 6, 3],
          }}
          transition={{
            scale: { duration: 0.6, delay: 0.45, type: 'spring', stiffness: 300, damping: 20 },
            opacity: { duration: 0.3, delay: 0.45 },
            y: { duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            rotate: { duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          whileHover={{
            scale: 1.12,
            rotate: 6,
            transition: { type: 'spring', stiffness: 400, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute -bottom-3 right-5 z-30 rounded-full bg-[#fff9ed] px-4 py-2 text-xs font-bold text-[#242a38] shadow-lg md:right-8 border border-[#eadfc8]/60 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Code × Art
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
