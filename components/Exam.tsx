'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';
import { examQuestions, ExamQuestion, ExamModule } from '@/lib/examData';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Timer, Award, AlertTriangle, ChevronRight, RotateCcw, ArrowLeft, History } from 'lucide-react';
import Link from 'next/link';

const EXAM_DURATION = 30 * 60; // 30 minutes in seconds

export default function Exam() {
  const { language } = useLanguage();
  const t = (key: string) => {
    const keys = key.split('.');
    let val: any = translations[language];
    for (const k of keys) {
      if (!val[k]) return key;
      val = val[k];
    }
    return val;
  };

  const [step, setStep] = useState<'start' | 'test' | 'results'>('start');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(40).fill(null));
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'test' && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft, isFinished]);

  const handleStart = () => {
    setStep('test');
    setTimeLeft(EXAM_DURATION);
    setAnswers(new Array(40).fill(null));
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const handleAnswerSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIdx < 39) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setStep('results');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const score = useMemo(() => {
    return answers.reduce((acc: number, ans, idx) => {
      return acc + (ans === examQuestions[idx].correctAnswer ? 1 : 0);
    }, 0);
  }, [answers]);

  const isSuccess = score >= 35;

  // Analysis of frequent errors
  const mistakeCategories = useMemo(() => {
    const categories: Record<ExamModule, { total: number; errors: number }> = {
      signalisation: { total: 0, errors: 0 },
      priorites: { total: 0, errors: 0 },
      circulation: { total: 0, errors: 0 },
      vitesse: { total: 0, errors: 0 },
      securite: { total: 0, errors: 0 },
      alcool: { total: 0, errors: 0 },
      mecanique: { total: 0, errors: 0 },
      eco_conduite: { total: 0, errors: 0 },
      premiers_secours: { total: 0, errors: 0 },
      partage_route: { total: 0, errors: 0 },
    };

    examQuestions.forEach((q, idx) => {
      categories[q.module].total++;
      if (answers[idx] !== q.correctAnswer) {
        categories[q.module].errors++;
      }
    });

    return Object.entries(categories)
      .filter(([_, stats]) => stats.errors > 0)
      .sort((a, b) => b[1].errors - a[1].errors);
  }, [answers]);

  if (step === 'start') {
    return (
      <div className="max-w-2xl mx-auto mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100 text-center"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <History className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">{t('exam.title')}</h1>
          <p className="text-neutral-600 mb-8 leading-relaxed">
            {t('exam.subtitle')}
            <br />
            <span className="font-semibold text-neutral-800 mt-2 block italic">
              {t('exam.score_desc')}
            </span>
          </p>
          <button
            onClick={handleStart}
            className="group relative w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 slant" />
            <span>{t('exam.start_btn')}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    );
  }

  if (step === 'test') {
    const q = examQuestions[currentIdx];
    const transQ = t(`exam.questions.q${q.id}`);

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header: Progress and Timer */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-neutral-100 mb-8 gap-4 sticky top-4 z-10">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="h-10 w-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-800 font-bold">
              {currentIdx + 1}
            </div>
            <div className="flex-1 md:w-48">
              <div className="text-xs text-neutral-400 font-medium mb-1">
                {t('exam.progress_label').replace('{current}', (currentIdx + 1).toString()).replace('{total}', '40')}
              </div>
              <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIdx + 1) / 40) * 100}%` }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${timeLeft < 300 ? 'bg-rose-50 text-rose-500' : 'bg-neutral-50 text-neutral-700'}`}>
            <Timer className={`w-5 h-5 ${timeLeft < 300 ? 'animate-pulse' : ''}`} />
            <span className="font-mono text-xl font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100"
          >
            <h2 className="text-xl md:text-2xl font-bold text-neutral-800 mb-8 min-h-[4rem]">
              {transQ.q}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {transQ.o.map((option: string, i: number) => {
                const isSelected = answers[currentIdx] === i;
                const letter = ['A', 'B', 'C', 'D'][i];

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(i)}
                    className={`group relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 border-2 ${
                      isSelected 
                        ? 'border-neutral-400 bg-neutral-100' 
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-all ${
                      isSelected
                        ? 'bg-neutral-800 text-white border-neutral-800'
                        : 'bg-white text-neutral-700 border-neutral-300 group-hover:bg-neutral-100'
                    }`}>
                      {letter}
                    </div>
                    <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-neutral-900' : 'text-neutral-600'}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex justify-between items-center">
              {currentIdx > 0 && (
                <button
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-neutral-600 font-medium transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{t('exam.previous_btn')}</span>
                </button>
              )}
              <div className="flex-1" />
              <button
                disabled={answers[currentIdx] === null}
                onClick={handleNext}
                className={`py-4 px-8 rounded-2xl font-bold transition-all flex items-center gap-2 ${
                  answers[currentIdx] !== null
                    ? 'bg-neutral-800 text-white hover:bg-neutral-900 shadow-lg'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span>{currentIdx === 39 ? t('exam.finish_btn') : t('exam.next_btn')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-neutral-100 mb-12"
        >
          <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 ${isSuccess ? 'bg-emerald-50 text-emerald-500 shadow-inner' : 'bg-rose-50 text-rose-500 shadow-inner'}`}>
            {isSuccess ? <Award className="w-14 h-14" /> : <XCircle className="w-14 h-14" />}
          </div>
          
          <h1 className="text-4xl font-black mb-2 text-neutral-800">
            {isSuccess ? t('exam.result_success') : t('exam.result_fail')}
          </h1>
          
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="text-6xl font-black text-neutral-800 mb-2">
              <span className={isSuccess ? 'text-emerald-500' : 'text-rose-500'}>{score}</span>
              <span className="text-neutral-200">/</span>
              <span>40</span>
            </div>
            <p className="text-neutral-500 font-medium">{t('exam.score_label')}</p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleStart}
              className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200"
            >
              <RotateCcw className="w-5 h-5" />
              {t('quiz.restart')}
            </button>
            <Link
              href="/quiz"
              className="px-8 py-4 bg-neutral-100 text-neutral-800 rounded-2xl font-bold hover:bg-neutral-200 transition-all flex items-center gap-2"
            >
              {t('ui.back_to_modules')}
            </Link>
          </div>
        </motion.div>

        {/* Mistake Analysis */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl font-bold text-neutral-800">{t('exam.mistakes_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mistakeCategories.map(([cat, stats]) => (
              <div key={cat} className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md hover:border-amber-200">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center font-black text-amber-600 text-xl border border-amber-100">
                  {stats.errors}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-800 mb-1 text-lg">
                    {t(`exam.mistake_cat_${cat}`)}
                  </h3>
                  <div className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
                    {stats.errors} {t('exam.mistake_label') || 'fautes'} / {stats.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Correction */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            {t('exam.correction_title')}
          </h2>
          <div className="space-y-6">
            {examQuestions.map((q, idx) => {
              const transQ = t(`exam.questions.q${q.id}`);
              const userAns = answers[idx];
              const isCorrect = userAns === q.correctAnswer;
              
              return (
                <div key={q.id} className={`bg-white rounded-3xl p-6 md:p-8 shadow-md border-l-8 ${isCorrect ? 'border-emerald-500' : 'border-rose-500'}`}>
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1 block">
                      {t('exam.q_label').replace('{num}', (idx + 1).toString())} • {q.module}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-800">{transQ.q}</h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    {transQ.o.map((option: string, i: number) => {
                      const isUserChoice = userAns === i;
                      const isRight = i === q.correctAnswer;
                      return (
                        <div 
                          key={i} 
                          className={`p-4 rounded-xl flex items-center justify-between ${
                            isRight ? 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200' : 
                            isUserChoice && !isCorrect ? 'bg-rose-50 text-rose-900 ring-1 ring-rose-200' : 
                            'bg-neutral-50 text-neutral-500'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-bold">{['A', 'B', 'C', 'D'][i]}.</span>
                            <span className="font-medium">{option}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             {isUserChoice && (
                               <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-white/50 rounded-md">
                                 {t('exam.your_answer')}
                               </span>
                             )}
                             {isRight && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                             {isUserChoice && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                    <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <History className="w-4 h-4" />
                       {t('exam.explanation')}
                    </h4>
                    <p className="text-neutral-700 leading-relaxed italic">
                      {transQ.exp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
