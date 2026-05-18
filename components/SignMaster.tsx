"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rock_Salt } from 'next/font/google';
import { useLanguage } from '@/contexts/LanguageContext';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

export default function SignMaster() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  if (!isPlaying) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 text-center transition-transform hover:scale-105 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10" />
           <div className="relative z-10">
             <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-5xl shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                🛑
             </div>
             <h2 className={`text-3xl font-bold text-white mb-3 ${rockSalt.className}`}>Sign Master</h2>
             <p className="text-gray-400 mb-8 text-sm leading-relaxed font-sans">
                {t('jeu.sign_master.intro')}
             </p>
             
             <button 
               onClick={() => setIsPlaying(true)}
               className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] font-sans"
             >
               {t('jeu.sign_master.insert_coin')}
             </button>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-[2rem] border border-white/10 flex flex-col font-sans overflow-hidden relative" style={{ height: '600px' }}>
      {/* Game Header */}
      <div className="w-full bg-white/5 border-b border-white/10 p-4 md:px-8 flex justify-between items-center z-20">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('jeu.sign_master.score')}</span>
          <span className="text-3xl font-black text-emerald-400">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-violet-400 uppercase tracking-widest font-bold mb-1">{t('jeu.sign_master.combo')}</span>
          <span className="px-3 py-1 bg-violet-500/20 text-violet-400 font-bold rounded-lg border border-violet-500/30 text-sm">
            x1
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('jeu.sign_master.time')}</span>
          <span className="text-3xl font-black text-white">59s</span>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 relative p-4 flex flex-col items-center justify-center z-10">
         
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
           <h1 className={`text-7xl md:text-9xl text-center leading-tight ${rockSalt.className}`}>SIGN<br/>MASTER</h1>
         </div>

         {/* Draggable Item (Mock) */}
         <motion.div 
           drag
           dragConstraints={{ left: -100, right: 100, top: -100, bottom: 200 }}
           whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
           dragElastic={0.2}
           className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center text-7xl shadow-[0_0_50px_rgba(255,255,255,0.2)] cursor-grab relative z-30 border-8 border-red-500 bg-center bg-cover"
         >
           🛑
         </motion.div>

         <p className="mt-12 text-emerald-400 font-bold tracking-widest uppercase text-xs md:text-sm animate-pulse">
           {t('jeu.sign_master.drag_instruction')}
         </p>

         {/* Dropzones (Mock) */}
         <div className="w-full grid grid-cols-2 gap-4 md:gap-8 mt-8 relative z-20">
           <div className="border-2 border-dashed border-white/20 rounded-3xl p-6 md:p-8 flex items-center justify-center bg-black/60 text-center transition-colors hover:border-white/40 hover:bg-white/10">
             <span className="text-gray-200 font-bold text-sm md:text-base">{t('jeu.sign_master.sign_no_parking')}</span>
           </div>
           <div className="border-2 border-dashed border-white/20 rounded-3xl p-6 md:p-8 flex items-center justify-center bg-black/60 text-center transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10">
             <span className="text-gray-200 font-bold text-sm md:text-base">{t('jeu.sign_master.sign_stop')}</span>
           </div>
         </div>
         
         <button 
           onClick={() => setIsPlaying(false)}
           className="absolute bottom-4 text-gray-500 hover:text-gray-300 text-xs font-medium uppercase tracking-widest transition-colors"
         >
           {t('jeu.sign_master.quit_game')}
         </button>
      </div>
    </div>
  );
}
