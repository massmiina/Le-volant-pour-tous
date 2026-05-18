"use client";

import { motion } from "framer-motion";
import { Rock_Salt } from 'next/font/google';
import { useLanguage } from "@/contexts/LanguageContext";

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

interface DashboardProps {
  user: { name: string; email: string };
  progress: any;
  examResults: any[];
}

export default function DashboardClient({ user, progress, examResults }: DashboardProps) {
  const { t } = useLanguage();

  // Calcul fictif de progression si vide
  const completedPercentage = progress?.completedModules 
    ? Math.round((JSON.parse(progress.completedModules).length / 12) * 100) 
    : 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className={`text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 ${rockSalt.className}`}>
              {t('dashboard.welcome', { name: user.name || "Pilote" })}
            </h1>
            <p className="text-gray-400 mt-4 text-lg">
              {t('dashboard.subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full border-8 border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
               <div className="absolute inset-0 rounded-full border-8 border-emerald-500 border-l-transparent border-b-transparent transform rotate-45" />
               <span className="text-3xl font-bold text-white">{completedPercentage}%</span>
            </div>
            <span className="text-sm text-gray-500 mt-3 uppercase tracking-widest">{t('dashboard.completed')}</span>
          </div>
        </div>
      </motion.section>

      {/* Grid Modules & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Module Resume */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-xl font-bold text-white mb-4 relative z-10">{t('dashboard.resume_title')}</h2>
              <button className="w-full py-4 px-6 rounded-xl font-bold text-black uppercase tracking-wider bg-gradient-to-r from-violet-400 to-emerald-400 hover:from-violet-300 hover:to-emerald-300 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] relative z-10">
                 {t('dashboard.resume_btn')}
              </button>
           </div>

           {/* Modules Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => {
                const moduleId = i + 1;
                let isCompleted = false;
                let score: number | undefined;
                
                try {
                  const completedArr = progress?.completedModules ? JSON.parse(progress.completedModules) : [];
                  const scoresObj = progress?.quizScores ? JSON.parse(progress.quizScores) : {};
                  isCompleted = completedArr.includes(moduleId);
                  score = scoresObj[moduleId.toString()];
                } catch (e) {}

                return (
                  <div key={i} className={`p-4 rounded-xl border ${isCompleted ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-white/5 border-white/10'} flex flex-col items-center justify-center aspect-square text-center transition-all hover:scale-105 relative`}>
                    {isCompleted && (
                      <div className="absolute top-2 right-2 text-emerald-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <div className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>
                      {moduleId}
                    </div>
                    <span className="text-xs font-medium text-gray-300">Module {moduleId}</span>
                    {score !== undefined && (
                      <span className="text-xs font-bold text-violet-400 mt-1">Score: {score}</span>
                    )}
                  </div>
                );
              })}
           </div>
        </motion.div>

        {/* Stats Sidebar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
             <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.latest_exams')}</h2>
             
             {examResults.length === 0 ? (
                <p className="text-gray-400 text-sm">{t('dashboard.no_exams')}</p>
             ) : (
                <div className="space-y-3">
                  {examResults.map((exam, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-4 bg-black/40 rounded-xl border ${exam.passed ? 'border-emerald-500/30' : 'border-red-500/30'}`}>
                      <span className="text-gray-300">{t('dashboard.exam_title', { number: examResults.length - idx })}</span>
                      <span className={`${exam.passed ? 'text-emerald-400' : 'text-red-400'} font-bold text-lg`}>{exam.score}/40</span>
                    </div>
                  ))}
                </div>
             )}
             
             <button className="w-full mt-4 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm uppercase tracking-wider">
               {t('dashboard.start_test')}
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
