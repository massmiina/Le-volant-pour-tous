"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rock_Salt } from 'next/font/google';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { examQuestions } from '@/lib/examData';
import { Award, XCircle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });
const TIME_PER_QUESTION = 20000; // 20 secondes

export default function ExamEngineClient() {
  const { language } = useLanguage();
  const t = (key: string) => {
    const keys = key.split('.');
    let val: any = translations[language];
    for (const k of keys) {
      if (!val || !val[k]) return key;
      val = val[k];
    }
    return val;
  };

  const [currentIdx, setCurrentIdx] = useState(0);
  const [allAnswers, setAllAnswers] = useState<number[][]>(new Array(40).fill([]));
  const [currentSelection, setCurrentSelection] = useState<number[]>([]);
  
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [progress, setProgress] = useState(100);
  const [timeLeftStr, setTimeLeftStr] = useState("20s");
  
  const endTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Anti-Crash : Restauration depuis localStorage au chargement
  useEffect(() => {
    const saved = localStorage.getItem("exam_recovery");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Si l'examen n'était pas fini, on restaure l'état
        if (parsed.currentIdx < 40 && parsed.currentIdx > 0) {
          setCurrentIdx(parsed.currentIdx);
          setAllAnswers(parsed.allAnswers);
        }
      } catch (e) {}
    }
  }, []);

  // 2. Fonction de calcul du score et sauvegarde API
  const finalizeExam = useCallback(async (finalAnswers: number[][]) => {
    setIsFinished(true);
    setIsSaving(true);
    if (timerRef.current) clearInterval(timerRef.current);

    // Calcul du score basé sur les réponses
    let finalScore = 0;
    const newMistakes: any[] = [];
    finalAnswers.forEach((ansArray, idx) => {
      const correctAns = examQuestions[idx].correctAnswer;
      const isCorrect = ansArray.length === 1 && ansArray[0] === correctAns;
      if (isCorrect) {
        finalScore++;
      } else {
        newMistakes.push({
          idx,
          question: examQuestions[idx],
          given: ansArray,
          correct: correctAns
        });
      }
    });

    setScore(finalScore);
    setMistakes(newMistakes);
    const passed = finalScore >= 35;

    // Sauvegarde API Prisma
    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore, passed, mistakes: newMistakes, answers: finalAnswers })
      });
    } catch (e) {
      console.error("Erreur de sauvegarde", e);
    }

    // Nettoyage de l'anti-crash
    localStorage.removeItem("exam_recovery");
    setIsSaving(false);
  }, []);

  // 3. Validation de la question courante
  const handleValidate = useCallback(() => {
    if (isFinished || !hasStarted) return;

    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }
    
    setAllAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIdx] = [...currentSelection];
      
      // Sauvegarde Anti-crash immédiate
      localStorage.setItem("exam_recovery", JSON.stringify({
        currentIdx: currentIdx + 1,
        allAnswers: newAnswers
      }));

      // Si c'était la dernière question, on finalise
      if (currentIdx >= 39) {
        finalizeExam(newAnswers);
      }
      return newAnswers;
    });

    if (currentIdx < 39) {
      setCurrentIdx(prev => prev + 1);
      setCurrentSelection([]);
      resetTimer();
    }
  }, [currentIdx, currentSelection, isFinished, hasStarted, finalizeExam]);

  const resetTimer = useCallback(() => {
    if (!hasStarted) return;
    endTimeRef.current = Date.now() + TIME_PER_QUESTION;
    setProgress(100);
    setTimeLeftStr("20s");
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const remaining = endTimeRef.current - now;
      
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        handleValidate();
      } else {
        setProgress((remaining / TIME_PER_QUESTION) * 100);
        setTimeLeftStr(`${Math.ceil(remaining / 1000)}s`);
      }
    }, 50);
  }, [handleValidate, hasStarted]);

  useEffect(() => {
    if (!isFinished && hasStarted && currentIdx < 40) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isFinished, hasStarted, resetTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || !hasStarted) return;
      const key = e.key.toUpperCase();
      if (key === 'A') toggleSelection(0);
      if (key === 'B') toggleSelection(1);
      if (key === 'C') toggleSelection(2);
      if (key === 'D') toggleSelection(3);
      if (e.key === 'Enter') {
        e.preventDefault();
        handleValidate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFinished, hasStarted, handleValidate]);

  const toggleSelection = (index: number) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }
    setCurrentSelection(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // 0. Écran de Démarrage (Règles)
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 text-center max-w-3xl w-full relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10" />
          <div className="relative z-10">
             <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-white ${rockSalt.className}`}>{t('exam.title')}</h1>
             <p className="text-xl text-gray-400 mb-12 font-medium tracking-wide">{t('exam.subtitle')}</p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-12">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-start gap-4 hover:bg-white/10 transition-colors">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">
                        {num}
                     </div>
                     <p className="text-gray-300 font-medium leading-snug">{t(`exam.rules_${num}`)}</p>
                  </div>
                ))}
             </div>

             <button 
               onClick={() => setHasStarted(true)}
               className="px-12 py-6 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)] text-xl hover:scale-105 active:scale-95"
             >
               {t('exam.start_btn')}
             </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Écran des Résultats Finaux
  if (isFinished) {
    const passed = score !== null && score >= 35;
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 py-20 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 text-center max-w-4xl w-full relative overflow-hidden"
        >
          {isSaving ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6" />
              <h2 className="text-2xl font-bold">{t('exam.saving_results')}</h2>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10" />
              <div className="relative z-10">
                {!showReview ? (
                  <>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 ${passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} shadow-2xl`}>
                      {passed ? <Award className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
                    </div>
                    
                    <h1 className={`text-5xl font-bold mb-4 ${passed ? 'text-emerald-400' : 'text-rose-400'} ${rockSalt.className}`}>
                      {passed ? t('exam.success_title') : t('exam.fail_title')}
                    </h1>
                    
                    <div className="flex items-center justify-center gap-2 mb-10 mt-8">
                      <span className={`text-8xl font-black ${passed ? 'text-white' : 'text-rose-100'}`}>{score}</span>
                      <span className="text-4xl text-gray-500">/ 40</span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                      <button 
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" /> {t('exam.retry_btn')}
                      </button>
                      <button 
                        onClick={() => setShowReview(true)}
                        className="px-8 py-4 bg-violet-600/20 border border-violet-500/50 hover:bg-violet-600/40 text-violet-300 font-bold rounded-xl flex items-center justify-center gap-3 transition-colors"
                      >
                        {t('exam.review_errors')} ({mistakes.length})
                      </button>
                      <Link 
                        href="/dashboard"
                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                      >
                        <Home className="w-5 h-5" /> {t('exam.dashboard_btn')}
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-left">
                    <button 
                      onClick={() => setShowReview(false)}
                      className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      {t('exam.back_to_results')}
                    </button>
                    
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                      <XCircle className="text-rose-500" />
                      {t('exam.analysis_title').replace('{count}', String(mistakes.length))}
                    </h2>
 
                    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                      {mistakes.map((m, idx) => {
                        const transQ = t(`exam.questions.q${m.question.id}`);
                        return (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              {m.question.image && (
                                <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden shrink-0 border border-white/10">
                                  <img src={m.question.image} alt="" className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-3">{transQ.q}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                                    <span className="text-xs text-rose-400 uppercase font-black block mb-1">{t('exam.your_answer')}</span>
                                    <span className="text-sm font-bold text-rose-100">
                                      {m.given.length > 0 ? m.given.map((g: number) => ['A', 'B', 'C', 'D'][g]).join(', ') : t('exam.no_answer')}
                                    </span>
                                  </div>
                                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                                    <span className="text-xs text-emerald-400 uppercase font-black block mb-1">{t('exam.correct_answer')}</span>
                                    <span className="text-sm font-bold text-emerald-100">{['A', 'B', 'C', 'D'][m.correct]}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-400 italic bg-black/30 p-4 rounded-xl border border-white/5">
                                  <span className="font-bold text-gray-300 not-italic">{t('exam.explanation') + ' : '}</span>
                                  {transQ.exp}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  const currentQ = examQuestions[currentIdx];
  const transQ = typeof t === 'function' ? t(`exam.questions.q${currentQ.id}`) : null;
  const questionText = transQ?.q || "Chargement de la question...";
  const options = transQ?.o || ["Option A", "Option B", "Option C", "Option D"];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-emerald-500/30">
      <div className="w-full h-2 bg-neutral-900 relative">
        <motion.div 
          className={`h-full shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-colors duration-500 ${
            progress < 25 ? 'bg-gradient-to-r from-rose-500 to-red-600' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
          }`} 
          style={{ width: `${progress}%` }} 
          initial={false}
          transition={{ ease: "linear", duration: 0.05 }}
        />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-5xl aspect-video bg-neutral-900 border border-white/5 rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-emerald-500/5" />
           {currentQ.image ? (
             <img 
               src={currentQ.image} 
               alt={`Situation ${currentIdx + 1}`} 
               className="w-full h-full object-cover"
             />
           ) : (
             <span className="text-neutral-600 uppercase tracking-widest font-bold">{t('exam.media_question_fallback')} {currentIdx + 1}</span>
           )}
           
           <div className={`absolute top-6 right-6 backdrop-blur-md border rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg transition-colors ${
             progress < 25 ? 'bg-red-900/80 border-red-500/50' : 'bg-black/80 border-white/10'
           }`}>
             <span className={`w-3 h-3 rounded-full ${progress < 25 ? 'bg-red-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
             <span className={`font-mono text-2xl font-bold ${progress < 25 ? 'text-red-400' : 'text-white'}`}>
               {timeLeftStr}
             </span>
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
          >
             <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
               {questionText}
             </h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {options.map((ans: string, i: number) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isSelected = currentSelection.includes(i);
                  
                  return (
                    <button 
                      key={i} 
                      onClick={() => toggleSelection(i)}
                      className={`flex items-center gap-5 p-5 rounded-2xl border transition-all text-left group ${
                        isSelected 
                          ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                          : 'bg-black/50 border-white/5 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-colors ${
                        isSelected ? 'bg-emerald-500 text-black' : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
                      }`}>
                        {letters[i]}
                      </div>
                      <span className={`font-medium text-lg ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {ans}
                      </span>
                    </button>
                  )
                })}
             </div>

             <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
                <div className="text-gray-400 flex items-center gap-4 text-sm font-medium">
                  <span className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-white">
                    {t('exam.progress_label').replace('{current}', String(currentIdx + 1)).replace('{total}', '40')}
                  </span>
                  <span className="hidden md:inline">{t('exam.shortcuts_label')} <kbd className="bg-white/10 px-2 py-1 rounded mx-1">A</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">B</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">C</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">D</kbd> <kbd className="bg-white/10 px-2 py-1 rounded ml-1">{t('exam.key_enter')}</kbd></span>
                </div>
                
                <button 
                  onClick={handleValidate}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                >
                  {t('exam.validate_btn')}
                </button>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
