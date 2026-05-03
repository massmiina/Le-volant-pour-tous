'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const ModuleQuiz = ({ questions, title, intro }: { questions: QuizQuestion[], title: string, intro: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedIdx(idx);
    setShowResult(true);
    if (idx === questions[currentIdx].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedIdx(null);
      setShowResult(false);
    }
  };

  if (!questions || questions.length === 0) return null;

  const q = questions[currentIdx];

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-indigo-100 mt-12 overflow-hidden relative">
      <div className="relative z-10">
        <h2 className="text-3xl font-black text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-600 font-medium mb-8 italic">{intro}</p>

        <div className="mb-8">
           <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Question {currentIdx + 1} / {questions.length}</span>
              <span className="text-sm font-bold text-gray-400">Score: {score}</span>
           </div>
           <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-indigo-500 h-full" 
                initial={{ width: 0 }}
                animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
           </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 leading-tight">{q.question}</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((option, idx) => {
                let bgColor = "bg-gray-50 border-gray-100 hover:border-indigo-300 hover:bg-indigo-50";
                if (showResult) {
                  if (idx === q.answer) bgColor = "bg-emerald-50 border-emerald-500 text-emerald-700";
                  else if (idx === selectedIdx) bgColor = "bg-rose-50 border-rose-500 text-rose-700";
                  else bgColor = "bg-gray-50 border-gray-100 opacity-50";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all font-bold flex items-center justify-between group ${bgColor}`}
                  >
                    <span>{option}</span>
                    {showResult && idx === q.answer && (
                      <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {showResult && idx === selectedIdx && idx !== q.answer && (
                      <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl ${selectedIdx === q.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'} border-2 border-current border-opacity-10`}
              >
                <p className="font-black mb-2 uppercase tracking-widest text-sm">
                  {selectedIdx === q.answer ? '✅ Correct !' : '❌ Mauvaise réponse'}
                </p>
                <p className="font-medium leading-relaxed">{q.explanation}</p>
                
                {currentIdx < questions.length - 1 ? (
                  <button 
                    onClick={handleNext}
                    className="mt-6 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg"
                  >
                    Question Suivante
                  </button>
                ) : (
                  <div className="mt-6 pt-6 border-t border-current border-opacity-10">
                    <p className="font-bold">Vous avez terminé le quiz ! Score final : {score}/{questions.length}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function CoursCirculation() {
  const { t } = useLanguage();

  const moduleData = (t('cours.circulation', { returnObjects: true }) as any);
  
  const sections = moduleData.sections || [];
  const quizData = moduleData.quiz_section || { title: "", intro: "", questions: [] };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 font-sans">
      <section className="bg-white border-b border-gray-200 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/cours" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('ui.back_to_modules')}
          </Link>
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-600 text-white font-mono font-bold px-3 py-1 rounded-lg text-sm uppercase tracking-tighter shadow-sm">
                {moduleData.badge}
              </span>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                {moduleData.label}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
              {moduleData.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium leading-relaxed">
              {moduleData.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">
        {sections.map((section: any, index: number) => (
          <AnimatedSection key={section.id} delay={index * 0.05}>
            <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-sm border-2 ${section.color} relative overflow-hidden`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${section.bgBadge} shadow-lg`}>
                  {index + 1}
                </div>

                <div className="flex-1 w-full">
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{section.title}</h2>
                  <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                    {section.desc}
                  </p>

                  <div className={section.imageUrl ? "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 items-center" : "mb-10"}>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t('ui.key_rules')}
                      </h3>
                      
                      <div className="space-y-4">
                        {section.rules.map((rule: any, idx: number) => (
                          <div key={idx} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 transition-colors">
                            <h4 className="font-bold text-gray-900 mb-1">{rule.title}</h4>
                            <p className="text-gray-600 leading-relaxed font-medium">{rule.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {section.imageUrl && (
                      <div className="w-full">
                        <div className={`relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border-4 ${section.color.replace('border-', 'border-').replace('500', '200').replace('600', '200')} bg-gray-50 group`}>
                          <img 
                            src={section.imageUrl} 
                            alt={section.title} 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`rounded-2xl p-6 border ${section.color.replace('500', '200').replace('600', '200')} ${section.bgLight}`}>
                    <h3 className={`text-sm tracking-widest uppercase font-black mb-4 ${section.bgBadge.split(' ')[0].replace('bg-', 'text-')}`}>
                      💡 {t('ui.practical_cases')}
                    </h3>
                    <ul className="space-y-3">
                      {section.examples.map((ex: string, exIdx: number) => (
                        <li key={exIdx} className="flex items-start text-gray-800 font-medium">
                          <span className="mr-3 mt-1">
                            <span className="flex w-2 h-2 rounded-full bg-current"></span>
                          </span>
                          <span className="leading-snug">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection>
           <ModuleQuiz questions={quizData.questions} title={quizData.title} intro={quizData.intro} />
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center shadow-xl mt-8">
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">{moduleData.footer_title}</h2>
            <p className="text-gray-400 font-bold mb-8 text-xl">
              {moduleData.footer_desc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link href="/cours/2" className="w-full sm:w-auto px-10 py-5 bg-gray-800 hover:bg-gray-700 text-white font-black rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2 border border-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                {t('ui.prev_module', { number: 2 })}
              </Link>
              <Link href="/cours/4" className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-blue-900/40 text-lg flex items-center justify-center gap-2">
                {t('ui.next_module', { number: 4 })}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}
