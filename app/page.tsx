'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Award, Car } from 'lucide-react';
import { Rock_Salt } from 'next/font/google';

const rockSalt = Rock_Salt({ subsets: ['latin'], weight: ['400'] });

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#0A061E]">
      {/* Refined AI-generated Neon Background (similar to user's sample) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-bg-v5.png"
          alt="Refined retro neon car background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark-to-medium gradient overlay to protect text from bright neon lamp beams */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent md:w-3/4"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 md:px-24 relative z-10 py-12 sm:py-20">
        <div className="max-w-3xl space-y-8 sm:space-y-12 text-left items-start">
          
          {/* Title Section with Glow Effect */}
          <div className="space-y-6">
            <style dangerouslySetInnerHTML={{__html: `
              .neon-mixed-title {
                background: linear-gradient(90deg, #ddd6fe 0%, #a7f3d0 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                filter: drop-shadow(0 0 15px rgba(139,92,246,0.8)) drop-shadow(0 0 30px rgba(16,185,129,0.5));
              }
            `}} />
            <motion.h1
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[1.1] pb-3 sm:pb-6 ${rockSalt.className}`}
              style={{ letterSpacing: '-0.15em' }}
            >
              <span className="neon-mixed-title block">
                {t('home.title_1') || "Le Volant"}
              </span>
              <span className="neon-mixed-title block -mt-1 sm:-mt-2 md:-mt-6">
                {t('home.title_2') || "Pour Tous"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-violet-100/80 font-medium max-w-xl leading-relaxed"
            >
              {t('home.subtitle')}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start pt-2 sm:pt-4 w-full sm:w-auto"
          >
            {/* Primary Button: Cours (Violet Theme) */}
            <Link href="/cours" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }} // Entrance bounce
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#10b981", // Becomes Green on hover
                  boxShadow: "0 0 30px rgba(167, 139, 250, 0.5)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 sm:px-9 sm:py-3.5 bg-violet-600 text-white rounded-[2rem] font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(139,92,246,0.25)] transition-all duration-300 flex items-center justify-center gap-2.5 group"
              >
                {t('nav.courses')}
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.button>
            </Link>

            {/* Secondary Button: Quiz (Translucent Glassmorphism) */}
            <Link href="/quiz" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(139, 92, 246, 0.2)",
                  borderColor: "#a78bfa"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 sm:px-9 sm:py-3.5 bg-white/5 backdrop-blur-md text-violet-100 border-2 border-violet-400/20 rounded-[2rem] font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md"
              >
                {t('nav.quiz')}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.button>
            </Link>

            {/* Tertiary Button: Examen (Amber/Gold Theme) */}
            <Link href="/examen" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                style={{ position: 'relative' }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#d97706", // Amber 600
                  boxShadow: "0 0 30px rgba(251, 191, 36, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 sm:px-9 sm:py-3.5 bg-amber-500 text-white rounded-[2rem] font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(245,158,11,0.15)] group"
              >
                <Award className="w-5 h-5" />
                {t('nav.exam')}
                <div className="absolute -top-2.5 -right-2.5 bg-white text-amber-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-sm border border-amber-100">
                  Premium
                </div>
              </motion.button>
            </Link>

            {/* Quaternary Button: Mises en Situation (Cyan Theme) */}
            <Link href="/situations" className="w-full sm:w-auto max-w-sm sm:max-w-none">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#06b6d4", // Cyan 600
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 sm:px-9 sm:py-3.5 bg-cyan-500 text-white rounded-[2rem] font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgba(6, 182, 212, 0.15)] group"
              >
                <Car className="w-5 h-5 animate-pulse" />
                {t('nav.situations')}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
