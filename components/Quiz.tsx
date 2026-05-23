'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getQuizByModule, QuizQuestion } from '@/lib/quizData';

interface QuizProps {
  moduleKey: 'signalisation' | 'priorites' | 'regles' | 'vitesse' | 'stationnement' | 'autoroute' | 'securite' | 'alcool' | 'mecanique' | 'eco_conduite' | 'premiers_secours' | 'partage_route';

  onRestart: () => void;
}

const moduleNameKeys: Record<QuizProps['moduleKey'], string> = {
  signalisation: 'm1_title',
  priorites: 'm2_title',
  regles: 'm3_title',
  vitesse: 'm4_title',
  stationnement: 'm5_title',
  autoroute: 'm6_title',
  securite: 'm7_title',
  alcool: 'm8_title',
  mecanique: 'm9_title',
  eco_conduite: 'm10_title',
  premiers_secours: 'm11_title',
  partage_route: 'm12_title'
};

export const Quiz = ({ moduleKey, onRestart }: QuizProps) => {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Load questions based on moduleKey and current language
    const data = getQuizByModule(moduleKey, t);
    setQuestions(data);
  }, [moduleKey, t]);

  const handleAnswerOptionClick = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const correct = index === questions[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/10 min-h-[550px] flex flex-col justify-center relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
        <motion.div 
          className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {showScore ? (
          <motion.div 
            key="score"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-40 h-40 bg-gradient-to-br from-violet-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-2xl relative">
              <div className="absolute inset-0 bg-violet-500/10 blur-2xl rounded-full"></div>
              <span className="text-5xl font-black text-white relative z-10">{score}/{questions.length}</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">{t('quiz.finished')}</h2>
            <p className="text-xl text-violet-100/60 mb-12 font-medium">
              {score === questions.length ? t('quiz.perfect') : t('quiz.good')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowScore(false);
                  setSelectedOption(null);
                }}
                className="px-10 py-5 bg-violet-600 text-white rounded-2xl font-black text-xl transition-all shadow-xl"
              >
                {t('quiz.restart')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black text-xl transition-all"
              >
                {t('ui.back_to_modules') || "Changer de module"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-violet-400 font-black uppercase tracking-[0.2em] text-sm">
                  {t('quiz.question_progress')} {currentQuestion + 1} / {questions.length}
                </span>
                <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-violet-200 border border-white/5 uppercase tracking-wider">
                  {t('cours.modules_list.' + moduleNameKeys[moduleKey]) || moduleKey}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isAnswer = index === questions[currentQuestion].answer;
                
                // The button background remains neutral (white) or slightly grayed if not selected after answer
                let buttonClass = "bg-white border-gray-300 text-gray-800 hover:bg-gray-50";
                
                if (selectedOption !== null) {
                   if (!isAnswer && !isSelected) {
                     buttonClass = "bg-white border-gray-100 opacity-40 text-gray-400";
                   } else {
                     buttonClass = "bg-white border-gray-300 text-gray-800";
                   }
                }

                // Marker (pastille) logic
                let markerClass = "bg-white text-black border-gray-300";
                if (selectedOption !== null) {
                  if (isAnswer) {
                    markerClass = "bg-green-500 text-white border-green-500";
                  } else if (isSelected) {
                    markerClass = "bg-red-500 text-white border-red-500";
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={selectedOption === null ? { scale: 1.01, x: 4 } : {}}
                    whileTap={selectedOption === null ? { scale: 0.99 } : {}}
                    onClick={() => handleAnswerOptionClick(index)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 text-base sm:text-lg ${buttonClass} relative overflow-hidden`}
                  >
                    <span className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold border ${markerClass} text-sm transition-colors shadow-sm`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    
                    <span className="flex-grow font-medium">
                      {option}
                    </span>
                    
                    {selectedOption !== null && isAnswer && (
                      <motion.span 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className="text-xl"
                      >
                        ✔️
                      </motion.span>
                    )}
                    {selectedOption !== null && isSelected && !isCorrect && (
                      <motion.span 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className="text-xl"
                      >
                        ❌
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation & Next Button */}
            <AnimatePresence>
              {selectedOption !== null && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-6"
                >
                  <div className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100' : 'bg-red-500/10 border-red-500/20 text-red-100'} backdrop-blur-md`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'} text-white`}>
                        {isCorrect ? '✔️' : '❌'}
                      </div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-widest mb-1">{isCorrect ? t('quiz.explication_label') : t('quiz.correction_label')}</p>
                        <p className="text-sm opacity-80 leading-relaxed">{questions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextQuestion}
                      className="px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-black text-lg shadow-xl flex items-center gap-3"
                    >
                      {currentQuestion === questions.length - 1 ? t('quiz.see_score') : t('quiz.next_question')}
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
