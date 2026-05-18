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

          {/* Action Buttons: Premium Bento Grid Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-md sm:max-w-xl p-4 sm:p-5 bg-black/40 backdrop-blur-xl border border-violet-500/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-3 sm:gap-4 relative overflow-hidden"
          >
            {/* Column 1 (Left): Tall then Short */}
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              {/* Primary Button: Cours (Violet Theme, Taller) */}
              <Link href="/cours" className="w-full">
                <motion.button
                  initial={{ y: 0 }}
                  animate={{ y: [0, -6, 0] }} // Gentle entrance bounce
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                  whileHover={{ 
                    scale: 1.03, 
                    borderColor: "rgba(168, 85, 247, 0.5)",
                    boxShadow: "0 0 30px rgba(139,92,246,0.35)" 
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-36 sm:h-44 p-4 sm:p-5 rounded-2xl border border-violet-500/20 bg-violet-950/20 text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[0_4px_20px_rgba(139,92,246,0.05)] cursor-pointer select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-base sm:text-lg font-black tracking-wider group-hover:text-violet-200 transition-colors uppercase">
                      {t('nav.courses')}
                    </span>
                    <span className="text-violet-300/60 text-[10px] sm:text-xs font-semibold">
                      18 Modules
                    </span>
                  </div>
                  
                  <div className="self-end text-violet-400/80 group-hover:text-violet-200 transition-colors">
                    <svg className="w-8 h-8 sm:w-10 h-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0H8.25m11.25 0V8.25" />
                    </svg>
                  </div>
                </motion.button>
              </Link>

              {/* Secondary Button: Quiz (Translucent Glassmorphism, Shorter) */}
              <Link href="/quiz" className="w-full">
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-28 sm:h-32 p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md cursor-pointer select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-violet-100 text-sm sm:text-base font-black tracking-wider uppercase">
                      {t('nav.quiz')}
                    </span>
                    <span className="text-violet-300/40 text-[9px] sm:text-xs font-semibold">
                      Thématiques
                    </span>
                  </div>
                  
                  <span className="absolute bottom-2 right-4 text-violet-300/10 group-hover:text-violet-300/20 transition-colors text-5xl sm:text-6xl font-serif font-black select-none">
                    ?
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Column 2 (Right): Short then Tall */}
            <div className="flex flex-col gap-3 sm:gap-4 w-full">
              {/* Tertiary Button: Examen (Amber/Gold Theme, Shorter) */}
              <Link href="/examen" className="w-full">
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: "rgba(245, 158, 11, 0.5)",
                    boxShadow: "0 0 30px rgba(245, 158, 11, 0.35)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-28 sm:h-32 p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-950/20 text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[0_4px_20px_rgba(245,158,11,0.05)] cursor-pointer select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-sm sm:text-base font-black tracking-wider group-hover:text-amber-200 transition-colors uppercase">
                      {t('nav.exam')}
                    </span>
                    <span className="text-amber-300/50 text-[9px] sm:text-xs font-semibold">
                      Examen Blanc
                    </span>
                  </div>

                  <Award className="w-8 h-8 sm:w-10 h-10 text-amber-400/80 group-hover:text-amber-300 transition-colors absolute bottom-3 right-3" />

                  <div className="absolute top-3 right-3 bg-white/95 text-amber-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm border border-amber-100">
                    Premium
                  </div>
                </motion.button>
              </Link>

              {/* Quaternary Button: Mises en Situation (Cyan Theme, Taller) */}
              <Link href="/situations" className="w-full">
                <motion.button
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: "rgba(6, 182, 212, 0.5)",
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.35)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full h-36 sm:h-44 p-4 sm:p-5 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 text-left flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-[0_4px_20px_rgba(6,182,212,0.05)] cursor-pointer select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-base sm:text-lg font-black tracking-wider group-hover:text-cyan-200 transition-colors uppercase">
                      {t('nav.situations')}
                    </span>
                    <span className="text-cyan-300/60 text-[10px] sm:text-xs font-semibold">
                      Subjectif 3D
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors">
                    <svg className="w-14 h-14 sm:w-18 h-18 group-hover:scale-105 transition-transform" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                      <path d="M20 80 A 40 40 0 1 1 80 80" strokeWidth="6" strokeLinecap="round" strokeDasharray="5,5" />
                      <path d="M20 80 A 40 40 0 0 1 70 25" strokeWidth="8" strokeLinecap="round" className="text-cyan-400/80" />
                      <line x1="50" y1="50" x2="75" y2="35" strokeWidth="4" strokeLinecap="round" className="text-cyan-300" />
                      <circle cx="50" cy="50" r="6" fill="currentColor" />
                    </svg>
                  </div>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
