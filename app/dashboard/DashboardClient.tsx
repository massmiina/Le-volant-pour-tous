"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rock_Salt } from 'next/font/google';
import { useLanguage } from "@/contexts/LanguageContext";
import { Zap, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });

interface DashboardProps {
  user: { name: string; email: string };
  progress: any;
  examResults: any[];
}

// Gorgeous self-contained Animated Circular Progress gauge
const CircularProgress = ({ percentage, strokeColor, shadowColor, label }: { percentage: number; strokeColor: string; shadowColor: string; label: string }) => {
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${shadowColor})` }}
          />
        </svg>
        <span className="text-xl font-black text-white z-10">{percentage}%</span>
      </div>
      <span className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider font-extrabold">{label}</span>
    </div>
  );
};

export default function DashboardClient({ user, progress, examResults }: DashboardProps) {
  const { language, t } = useLanguage();

  // Completed theoretical modules ratio
  const completedPercentage = progress?.completedModules 
    ? Math.round((JSON.parse(progress.completedModules).length / 12) * 100) 
    : 0;

  // Real-time dynamic success prediction (VolantReady™ Algorithm)
  const examCount = examResults?.length || 0;
  const avgExamScore = examCount > 0 
    ? (examResults.reduce((acc, curr) => acc + curr.score, 0) / examCount)
    : 0;
  const scaledExamScore = (avgExamScore / 40) * 100;
  
  let volantReadyScore = 0;
  if (examCount === 0) {
    volantReadyScore = Math.round(completedPercentage * 0.4); // max 40% if no exam taken
  } else {
    volantReadyScore = Math.round((completedPercentage * 0.3) + (scaledExamScore * 0.7));
  }

  // Neon status classes and colors based on score
  let readyLabel = t('dashboard.ready_status_learning');
  let readyColorClass = "text-violet-400";
  let readyBgGlow = "border-violet-500/20 bg-violet-950/15 shadow-[0_0_20px_rgba(139,92,246,0.15)]";
  let readyProgressColor = "#a78bfa"; // Violet-400
  let readyProgressShadow = "rgba(167,139,250,0.5)";

  if (volantReadyScore >= 85) {
    readyLabel = t('dashboard.ready_status_excellent');
    readyColorClass = "text-emerald-400 animate-pulse";
    readyBgGlow = "border-emerald-500/30 bg-emerald-950/20 shadow-[0_0_25px_rgba(16,185,129,0.25)]";
    readyProgressColor = "#10b981"; // Emerald-500
    readyProgressShadow = "rgba(16,185,129,0.6)";
  } else if (volantReadyScore >= 50) {
    readyLabel = t('dashboard.ready_status_medium');
    readyColorClass = "text-cyan-400";
    readyBgGlow = "border-cyan-500/25 bg-cyan-950/15 shadow-[0_0_20px_rgba(6,182,212,0.15)]";
    readyProgressColor = "#22d3ee"; // Cyan-400
    readyProgressShadow = "rgba(34,211,238,0.5)";
  }

  // --- FEATURE 3 : STATE FOR INTERACTIVE ERROR REVIEW ---
  const [activeReviewList, setActiveReviewList] = useState<any[]>([]);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);
  const [reviewSelection, setReviewSelection] = useState<number | null>(null);
  const [reviewFeedback, setReviewFeedback] = useState<{ isCorrect: boolean; explanation?: string } | null>(null);

  // Initialize failed questions pool from past exams
  useEffect(() => {
    const list: any[] = [];
    const seen = new Set<number>();
    examResults.forEach((exam: any) => {
      let parsed = [];
      try {
        parsed = typeof exam.mistakes === 'string' ? JSON.parse(exam.mistakes) : (exam.mistakes || []);
      } catch (e) {}
      parsed.forEach((m: any) => {
        if (m.question && m.question.id && !seen.has(m.question.id)) {
          seen.add(m.question.id);
          list.push(m.question);
        }
      });
    });
    setActiveReviewList(list);
  }, [examResults]);

  // Handle choice selection during mistakes catch-up
  const handleReviewAnswer = (index: number, correctIdx: number, exp: string) => {
    if (reviewFeedback) return;
    const isCorrect = index === correctIdx;
    setReviewSelection(index);
    setReviewFeedback({ isCorrect, explanation: exp });
  };

  // Next question or clear mistakes
  const handleNextReview = () => {
    if (reviewFeedback?.isCorrect) {
      // Remove corrected question from list
      setActiveReviewList((prev: any[]) => prev.filter((_: any, idx: number) => idx !== currentReviewIdx));
      if (currentReviewIdx >= activeReviewList.length - 1) {
        setCurrentReviewIdx(Math.max(0, activeReviewList.length - 2));
      }
    } else {
      // Move to next if not correct
      setCurrentReviewIdx((prev: number) => (prev + 1) % activeReviewList.length);
    }
    setReviewSelection(null);
    setReviewFeedback(null);
  };

  // --- FEATURE 2 : COMPUTE THEME MASTERY STATISTICS ---
  const THEME_QUESTIONS_COUNT: Record<string, number> = {
    signalisation: 8,
    priorites: 8,
    vitesse: 4,
    circulation: 4,
    securite: 4,
    alcool: 3,
    mecanique: 3,
    eco_conduite: 2,
    premiers_secours: 2,
    partage_route: 2,
  };

  const mistakesPerTheme: Record<string, number> = {
    signalisation: 0,
    priorites: 0,
    vitesse: 0,
    circulation: 0,
    securite: 0,
    alcool: 0,
    mecanique: 0,
    eco_conduite: 0,
    premiers_secours: 0,
    partage_route: 0,
  };

  examResults.forEach((exam: any) => {
    let parsed = [];
    try {
      parsed = typeof exam.mistakes === 'string' ? JSON.parse(exam.mistakes) : (exam.mistakes || []);
    } catch (e) {}
    parsed.forEach((m: any) => {
      const mod = m.question?.module;
      if (mod && mod in mistakesPerTheme) {
        mistakesPerTheme[mod]++;
      }
    });
  });

  const themesList = [
    { key: 'signalisation', name: { fr: 'Signalisation & Panneaux', ru: 'Знаки и разметка' } },
    { key: 'priorites', name: { fr: 'Priorités & Croisements', ru: 'Приоритеты проезда' } },
    { key: 'vitesse', name: { fr: 'Limites de Vitesse', ru: 'Скоростной режим' } },
    { key: 'circulation', name: { fr: 'Règles de Circulation', ru: 'Правила движения' } },
    { key: 'securite', name: { fr: 'Sécurité & Conducteur', ru: 'Безопасность вождения' } },
    { key: 'alcool', name: { fr: 'Alcool, Fatigue & Vigilance', ru: 'Алкоголь и внимание' } },
    { key: 'mecanique', name: { fr: 'Mécanique & Équipements', ru: 'Механика автомобиля' } },
    { key: 'eco_conduite', name: { fr: 'Éco-conduite', ru: 'Эко-вождение' } },
    { key: 'premiers_secours', name: { fr: 'Premiers Secours', ru: 'Первая помощь' } },
    { key: 'partage_route', name: { fr: 'Partage de la Route', ru: 'Совместное вождение' } },
  ];

  const themesData = themesList.map((theme) => {
    const qCount = THEME_QUESTIONS_COUNT[theme.key] || 1;
    const totalAsked = examCount * qCount;
    const mistakes = mistakesPerTheme[theme.key] || 0;
    
    let score = 0;
    if (examCount === 0) {
      score = 0; // Default to 0 if no exams taken yet
    } else {
      score = Math.max(0, Math.round(((totalAsked - mistakes) / totalAsked) * 100));
    }

    let colorClass = "text-violet-400";
    let progressColor = "bg-gradient-to-r from-violet-500 to-indigo-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]";
    let borderStyle = "border-violet-500/10 hover:border-violet-500/30";

    if (score >= 85) {
      colorClass = "text-emerald-400 animate-pulse";
      progressColor = "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]";
      borderStyle = "border-emerald-500/10 hover:border-emerald-500/30";
    } else if (score >= 50) {
      colorClass = "text-cyan-400";
      progressColor = "bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]";
      borderStyle = "border-cyan-500/10 hover:border-cyan-500/30";
    } else if (examCount > 0) {
      colorClass = "text-rose-400";
      progressColor = "bg-gradient-to-r from-rose-500 to-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]";
      borderStyle = "border-rose-500/20 hover:border-rose-500/40 bg-rose-950/5";
    }

    return {
      ...theme,
      score,
      colorClass,
      progressColor,
      borderStyle,
    };
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <h1 className={`text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 ${rockSalt.className} leading-[1.3] pb-2`}>
              {t('dashboard.welcome', { name: user.name || "Pilote" })}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('dashboard.subtitle')}
            </p>
            
            {/* Dynamic Status Alert Banner */}
            <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-bold ${readyBgGlow} transition-all duration-500`}>
              <Zap className={`w-5 h-5 shrink-0 ${readyColorClass}`} />
              <span className="text-gray-300">
                {t('dashboard.volant_ready')} : <span className={readyColorClass}>{readyLabel}</span>
              </span>
            </div>
          </div>
          
          {/* Dual Interactive Progress Circular Gauges */}
          <div className="flex gap-8 items-center bg-black/30 p-6 rounded-3xl border border-white/5">
            <CircularProgress
              percentage={completedPercentage}
              strokeColor="#10b981"
              shadowColor="rgba(16,185,129,0.5)"
              label={t('dashboard.completed')}
            />
            
            <CircularProgress
              percentage={volantReadyScore}
              strokeColor={readyProgressColor}
              shadowColor={readyProgressShadow}
              label={t('dashboard.volant_ready')}
            />
          </div>
        </div>
      </motion.section>

      {/* Grid Modules & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Learn Resume, Modules and Theme Radar */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Module Resume */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-xl font-bold text-white mb-4 relative z-10">{t('dashboard.resume_title')}</h2>
              <button className="w-full py-4 px-6 rounded-xl font-bold text-black uppercase tracking-wider bg-gradient-to-r from-violet-400 to-emerald-400 hover:from-violet-300 hover:to-emerald-300 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] relative z-10">
                 {t('dashboard.resume_btn')}
              </button>
           </motion.div>

           {/* FEATURE 2 : RADAR DES 10 THEMES */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full blur-[80px]" />
              
              <div className="mb-6">
                <h2 className={`text-2xl font-bold text-white ${rockSalt.className} tracking-wider`}>
                  {language === 'fr' ? 'Radar des 10 thèmes' : 'Радар освоения тем'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {language === 'fr' 
                    ? 'Analyse visuelle de votre maîtrise par thématique officielle de l\'examen.' 
                    : 'Визуальный анализ ваших знаний по официальным темам экзамена.'}
                </p>
              </div>

              {examCount === 0 ? (
                <div className="bg-black/30 border border-white/5 rounded-2xl p-8 text-center">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {language === 'fr'
                      ? 'Passez votre premier examen blanc pour cartographier vos forces et points faibles par thème.'
                      : 'Сдайте свой первый пробный экзамен, чтобы составить карту своих сильных и слабых сторон.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {themesData.map((theme) => (
                    <div key={theme.key} className={`p-4 bg-black/35 rounded-2xl border transition-all duration-300 ${theme.borderStyle} space-y-3`}>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-gray-300 tracking-wide">{theme.name[language]}</span>
                        <span className={`font-black text-sm ${theme.colorClass}`}>{theme.score}%</span>
                      </div>
                      
                      {/* Interactive Progress Bar */}
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                        <motion.div 
                          className={`h-full rounded-full ${theme.progressColor}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${theme.score}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
           </motion.div>

           {/* Modules Grid */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="space-y-4"
           >
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{language === 'fr' ? 'Progression des chapitres' : 'Прогресс по главам'}</h3>
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
        </div>

        {/* Right Side: Error review and Last exams */}
        <div className="space-y-8">
          
          {/* FEATURE 3 : INTUITIVE ERROR REVIEW HUB */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px]" />
             
             {!isReviewMode ? (
               <div className="space-y-4">
                 <h2 className={`text-xl font-bold text-white ${rockSalt.className} tracking-wider`}>
                   {language === 'fr' ? 'Revue d\'Erreurs' : 'Работа над ошибками'}
                 </h2>
                 <p className="text-gray-400 text-sm leading-relaxed">
                   {language === 'fr'
                     ? 'Révisez et éliminez vos fautes d\'examen à travers un entraînement interactif ciblé.'
                     : 'Изучайте и исправляйте свои ошибки в пробных тестах в интерактивном режиме.'}
                 </p>

                 {activeReviewList.length === 0 ? (
                   <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3">
                     <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
                     <span className="text-emerald-300 text-xs font-bold">
                       {language === 'fr' ? 'Félicitations ! Aucune erreur à réviser.' : 'Поздравляем! Ошибок нет.'}
                     </span>
                   </div>
                 ) : (
                   <div className="space-y-4">
                     <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                       <span className="text-rose-300 text-xs font-bold">
                         {language === 'fr' 
                           ? `${activeReviewList.length} questions en attente` 
                           : `${activeReviewList.length} вопросов в очереди`}
                       </span>
                     </div>
                     
                     <button 
                       onClick={() => setIsReviewMode(true)}
                       className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(244,63,94,0.3)] text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                     >
                       {language === 'fr' ? 'Lancer le rattrapage' : 'Начать работу'}
                     </button>
                   </div>
                 )}
               </div>
             ) : (
               // Interactive mistakes catching carousel active mode!
               <div className="space-y-5">
                 <div className="flex justify-between items-center border-b border-white/5 pb-3">
                   <h3 className="text-xs font-black text-rose-400 uppercase tracking-widest">
                     {language === 'fr' ? 'Rattrapage Active' : 'Исправление ошибок'}
                   </h3>
                   <button 
                     onClick={() => {
                       setIsReviewMode(false);
                       setReviewSelection(null);
                       setReviewFeedback(null);
                     }}
                     className="text-gray-400 hover:text-white"
                   >
                     ✕
                   </button>
                 </div>

                 {activeReviewList.length === 0 ? (
                   <div className="text-center py-6 space-y-3">
                     <p className="text-emerald-400 font-bold text-sm">
                       {language === 'fr' ? 'Toutes vos erreurs sont effacées !' : 'Все ошибки успешно устранены!'}
                     </p>
                     <button 
                       onClick={() => setIsReviewMode(false)}
                       className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs"
                     >
                       Fermer
                     </button>
                   </div>
                 ) : (
                   (() => {
                     const activeQuestion = activeReviewList[currentReviewIdx];
                     const transQ = t(`exam.questions.q${activeQuestion.id}`);
                     
                     return (
                       <div className="space-y-4">
                         <div className="flex justify-between text-[10px] text-gray-500">
                           <span>Question {currentReviewIdx + 1}/{activeReviewList.length}</span>
                           <span className="uppercase tracking-widest font-black text-rose-500">{activeQuestion.module}</span>
                         </div>

                         {activeQuestion.image && (
                           <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                             <img src={activeQuestion.image} alt="" className="w-full h-full object-cover" />
                           </div>
                         )}

                         <p className="text-white text-xs font-black leading-relaxed">
                           {transQ?.q || "..."}
                         </p>

                         {/* Answers choices options */}
                         <div className="space-y-2">
                           {transQ?.o?.map((opt: string, idx: number) => {
                             const letter = String.fromCharCode(65 + idx);
                             let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300";
                             
                             if (reviewFeedback) {
                               const isCorrect = idx === activeQuestion.correctAnswer;
                               const isSelected = idx === reviewSelection;
                               if (isCorrect) {
                                 btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                               } else if (isSelected) {
                                 btnStyle = "bg-rose-950/40 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
                               }
                             }

                             return (
                               <button 
                                 key={idx}
                                 disabled={!!reviewFeedback}
                                 onClick={() => handleReviewAnswer(idx, activeQuestion.correctAnswer, transQ.exp)}
                                 className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-3 leading-relaxed ${btnStyle}`}
                               >
                                 <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-[10px]">
                                   {letter}
                                 </span>
                                 {opt}
                               </button>
                             );
                           })}
                         </div>

                         {/* Educational explanation feedback */}
                         {reviewFeedback && (
                           <motion.div 
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             className={`p-4 rounded-xl border space-y-2 ${reviewFeedback.isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'}`}
                           >
                             <div className="flex items-center gap-2 text-xs font-bold">
                               <span className={reviewFeedback.isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                                 {reviewFeedback.isCorrect ? '✓ Réussi !' : '✗ Incorrect'}
                               </span>
                             </div>
                             <p className="text-[11px] text-gray-400 leading-relaxed italic">
                               {reviewFeedback.explanation}
                             </p>
                             
                             <button 
                               onClick={handleNextReview}
                               className="w-full mt-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-extrabold uppercase tracking-widest text-white border border-white/10 transition-colors"
                             >
                               {reviewFeedback.isCorrect ? 'Suivant (Effacer l\'erreur)' : 'Continuer'}
                             </button>
                           </motion.div>
                         )}
                       </div>
                     );
                   })()
                 )}
               </div>
             )}
          </motion.div>

          {/* Last Exams Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >
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
             
             <Link href="/examen">
               <button className="w-full mt-4 py-3 rounded-lg border border-white/10 text-gray-300 hover:bg-white/10 transition-colors text-sm uppercase tracking-wider font-bold">
                 {t('dashboard.start_test')}
               </button>
             </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
