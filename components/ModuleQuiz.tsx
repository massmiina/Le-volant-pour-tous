'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  imageUrl?: string;
}

interface ModuleQuizProps {
  moduleId: number;
  questions: QuizQuestion[];
  title: string;
  intro: string;
}

export const ModuleQuiz = ({ moduleId, questions, title, intro }: ModuleQuizProps) => {
  const { data: session } = useSession();
  const { t, language } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);
    setShowResult(true);
    
    const isCorrect = idx === questions[currentIdx].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([50]);
      }
    } else {
      if (typeof window !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setShowResult(false);
    }
  };

  const q = questions[currentIdx];
  const isFinished = currentIdx === questions.length - 1 && showResult;

  useEffect(() => {
    if (isFinished && !scoreSaved) {
      setScoreSaved(true);
      
      const finalScore = score + (selectedIdx === questions[currentIdx].answer ? 1 : 0);
      
      if (session?.user) {
        // Save to DB
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ moduleId, score: finalScore })
        }).catch(err => console.error("Erreur de sauvegarde:", err));
      } else {
        // Save to LocalStorage
        try {
          const localScores = JSON.parse(localStorage.getItem('guest_quiz_scores') || '{}');
          if (finalScore > (localScores[moduleId] || 0)) {
            localScores[moduleId] = finalScore;
            localStorage.setItem('guest_quiz_scores', JSON.stringify(localScores));
          }
        } catch (e) {
          console.error("Erreur LocalStorage:", e);
        }
      }
    }
  }, [isFinished, scoreSaved, score, selectedIdx, questions, currentIdx, session, moduleId]);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 md:p-12 shadow-2xl border border-gray-800 mt-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIdx + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="relative z-10 pt-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: '"Rock Salt", cursive' }}>{title}</h2>
          <p className="text-gray-400 font-medium text-lg">{intro}</p>
        </div>

        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div 
              key="score"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-40 h-40 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl relative">
                <div className="absolute inset-0 bg-violet-500/10 blur-2xl rounded-full"></div>
                <span className="text-5xl font-black text-white relative z-10">{score}/{questions.length}</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">{t('quiz.finished')}</h3>
              <p className="text-xl text-gray-400 mb-10">
                {score === questions.length ? t('quiz.perfect') : t('quiz.good')}
              </p>
              
              <div className="bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 rounded-2xl p-8 max-w-lg mx-auto backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-2">{language === 'fr' ? 'Sauvegardez votre progression' : 'Сохраните ваш прогресс'}</h4>
                <p className="text-gray-300 mb-6 text-sm">{language === 'fr' ? "Créez un compte gratuit pour enregistrer vos scores et débloquer l'examen blanc dans des conditions réelles." : "Создайте бесплатный аккаунт, чтобы сохранять свои результаты и разблокировать пробный экзамен в реальных условиях."}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register" className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] text-center">
                    {language === 'fr' ? 'Créer mon compte' : 'Создать аккаунт'}
                  </Link>
                  <button 
                    onClick={() => {
                      setCurrentIdx(0);
                      setScore(0);
                      setShowResult(false);
                      setSelectedIdx(null);
                    }}
                    className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all border border-gray-600"
                  >
                    {t('quiz.restart')}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-violet-400 uppercase tracking-widest">{t('quiz.question_progress')} {currentIdx + 1} / {questions.length}</span>
                <span className="text-sm font-bold text-gray-400">{language === 'fr' ? 'Score' : 'Счет'}: {score}</span>
              </div>

              {q.imageUrl && (
                <div className="w-full aspect-video md:aspect-[21/9] relative rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl">
                  <img src={q.imageUrl} alt="Illustration de la question" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">{q.question}</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {q.options.map((option, idx) => {
                  let bgColor = "bg-gray-800 border-gray-700 hover:border-violet-500 hover:bg-gray-750 text-white";
                  if (showResult) {
                    if (idx === q.answer) bgColor = "bg-emerald-900/40 border-emerald-500 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                    else if (idx === selectedIdx) bgColor = "bg-rose-900/40 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]";
                    else bgColor = "bg-gray-800 border-gray-800 opacity-30 text-gray-500";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showResult}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold flex items-center justify-between group ${bgColor}`}
                    >
                      <span className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${showResult && idx === q.answer ? 'border-emerald-400 bg-emerald-500/20' : showResult && idx === selectedIdx ? 'border-rose-400 bg-rose-500/20' : 'border-gray-600 bg-gray-700'}`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </span>
                      {showResult && idx === q.answer && (
                        <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                      {showResult && idx === selectedIdx && idx !== q.answer && (
                        <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-6 mt-6 rounded-2xl ${selectedIdx === q.answer ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-200' : 'bg-rose-900/20 border-rose-500/30 text-rose-200'} border backdrop-blur-sm`}>
                      <p className="font-black mb-3 uppercase tracking-widest text-sm flex items-center gap-2">
                        {selectedIdx === q.answer ? `✅ ${t('quiz.correct')} !` : `❌ ${language === 'fr' ? 'Mauvaise réponse' : 'Неверный ответ'}`}
                      </p>
                      <p className="font-medium leading-relaxed opacity-90">{q.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {showResult && (
                <div className="flex justify-end pt-4">
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-10 py-4 bg-white text-black rounded-xl font-black text-lg hover:bg-gray-200 transition-colors shadow-xl flex items-center gap-3"
                  >
                    {t('quiz.next_question')}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
