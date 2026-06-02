'use client';

import React, { useState } from 'react';
import MiniGame from '@/components/MiniGame';
import SignMaster from '@/components/SignMaster';
import { Rock_Salt } from 'next/font/google';
import { useLanguage } from '@/contexts/LanguageContext';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

export default function JeuPage() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState<'menu' | 'car' | 'sign'>('menu');

  if (activeGame === 'car') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#0f172a] py-12 px-4 flex flex-col items-center">
         <button onClick={() => setActiveGame('menu')} className="mb-8 text-gray-400 hover:text-white uppercase tracking-widest font-bold text-sm">← {t('jeu.back_to_hub')}</button>
         <MiniGame />
      </div>
    );
  }

  if (activeGame === 'sign') {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-black py-12 px-4 flex flex-col items-center relative">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black pointer-events-none" />
         <button onClick={() => setActiveGame('menu')} className="mb-8 text-gray-400 hover:text-white uppercase tracking-widest font-bold text-sm relative z-20">← {t('jeu.back_to_hub')}</button>
         <SignMaster />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black text-white py-12 px-4 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />
      
      <div className="relative z-10 text-center mb-16">
        <h1 className={`text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-violet-400 mb-4 ${rockSalt.className} drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]`}>
          Arcade Hub
        </h1>
        <p className="text-gray-400 font-medium text-lg">{t('jeu.choose_training')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        {/* Game 1 */}
        <button 
          onClick={() => setActiveGame('sign')}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-left transition-all hover:scale-105 hover:bg-white/10 group"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg">
            🛑
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sign Master</h2>
          <p className="text-gray-400 text-sm">{t('jeu.sign_master_desc')}</p>
          <div className="mt-6 text-emerald-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">{t('jeu.play')} →</div>
        </button>

        {/* Game 2 */}
        <button 
          onClick={() => setActiveGame('car')}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-left transition-all hover:scale-105 hover:bg-white/10 group"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-lg">
            🏎️
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Esquive Route</h2>
          <p className="text-gray-400 text-sm">{t('jeu.esquive_route_desc')}</p>
          <div className="mt-6 text-cyan-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">{t('jeu.play')} →</div>
        </button>
      </div>
    </div>
  );
}
