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
  
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState<number | null>(null);
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
    finalAnswers.forEach((ansArray, idx) => {
      const correctAns = examQuestions[idx].correctAnswer;
      // Pour l'instant on a une seule bonne réponse en DB
      if (ansArray.length === 1 && ansArray[0] === correctAns) {
        finalScore++;
      }
    });

    setScore(finalScore);
    const passed = finalScore >= 35;

    // Sauvegarde API Prisma
    try {
      await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore, passed, answers: finalAnswers })
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
    if (isFinished) return;
    
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
  }, [currentIdx, currentSelection, isFinished, finalizeExam]);

  const resetTimer = useCallback(() => {
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
  }, [handleValidate]);

  useEffect(() => {
    if (!isFinished && currentIdx < 40) {
      resetTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isFinished, resetTimer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;
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
  }, [isFinished, handleValidate]);

  const toggleSelection = (index: number) => {
    setCurrentSelection(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Écran des Résultats Finaux
  if (isFinished) {
    const passed = score !== null && score >= 35;
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 text-center max-w-2xl w-full relative overflow-hidden"
        >
          {isSaving ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6" />
              <h2 className="text-2xl font-bold">Sauvegarde de vos résultats...</h2>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-emerald-500/10" />
              <div className="relative z-10">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 ${passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'} shadow-2xl`}>
                  {passed ? <Award className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
                </div>
                
                <h1 className={`text-5xl font-bold mb-4 ${passed ? 'text-emerald-400' : 'text-rose-400'} ${rockSalt.className}`}>
                  {passed ? 'Félicitations !' : 'Entraînement Requis'}
                </h1>
                
                <div className="flex items-center justify-center gap-2 mb-10 mt-8">
                  <span className={`text-8xl font-black ${passed ? 'text-white' : 'text-rose-100'}`}>{score}</span>
                  <span className="text-4xl text-gray-500">/ 40</span>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" /> Refaire un test
                  </button>
                  <Link 
                    href="/dashboard"
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <Home className="w-5 h-5" /> Mon Espace
                  </Link>
                </div>
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
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
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
             <span className="text-neutral-600 uppercase tracking-widest font-bold">Média Question {currentIdx + 1}</span>
           )}
           
           <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
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
                    Question {currentIdx + 1} / 40
                  </span>
                  <span className="hidden md:inline">Raccourcis clavier : <kbd className="bg-white/10 px-2 py-1 rounded mx-1">A</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">B</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">C</kbd> <kbd className="bg-white/10 px-2 py-1 rounded mx-1">D</kbd> <kbd className="bg-white/10 px-2 py-1 rounded ml-1">Entrée</kbd></span>
                </div>
                
                <button 
                  onClick={handleValidate}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
                >
                  Valider
                </button>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
