'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Rock_Salt } from 'next/font/google';
import { ArrowLeft, Car, Award, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

const rockSalt = Rock_Salt({ subsets: ['latin'], weight: ['400'] });

interface ScenarioItem {
  situation: string;
  question: string;
  o1: string;
  o2: string;
  o3: string;
  o4: string;
  exp: string;
  correctAnswer: number;
}

export default function MisesEnSituation() {
  const { t, language } = useLanguage();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [historyAnswers, setHistoryAnswers] = useState<boolean[]>([]);

  // Get localized scenarios list safely
  const localizedData = t('situations', { returnObjects: true }) as any;
  const list: ScenarioItem[] = localizedData?.list || [];

  if (!list || list.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A061E] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <p className="text-xl font-bold">Erreur de chargement des scénarios.</p>
          <Link href="/" className="text-violet-400 hover:underline">Retour à l&apos;accueil</Link>
        </div>
      </div>
    );
  }

  const currentScenario = list[currentIdx];
  const correctAnswerIndex = currentScenario?.correctAnswer ?? 0;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedAns(idx);
  };

  const handleValidate = () => {
    if (selectedAns === null || isSubmitted) return;
    
    const isCorrect = selectedAns === correctAnswerIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setHistoryAnswers(prev => [...prev, isCorrect]);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < list.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAns(null);
      setIsSubmitted(false);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAns(null);
    setIsSubmitted(false);
    setScore(0);
    setShowSummary(false);
    setHistoryAnswers([]);
  };

  // Cockpit mockup background visual illustrations based on current index
  const renderMockupVisual = () => {
    switch (currentIdx) {
      case 0: // Night Overtake
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-slate-900 to-black flex items-center justify-center overflow-hidden">
            <div className="w-full h-1 bg-yellow-500/30 absolute bottom-1/3"></div>
            {/* Overtaken Car taillights */}
            <div className="w-16 h-8 bg-red-900/60 rounded-md border border-red-500/40 flex items-center justify-between px-2 relative z-10 animate-pulse">
              <span className="w-3 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]"></span>
              <span className="w-3 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]"></span>
            </div>
            {/* Approaching headlights far away */}
            <div className="absolute top-1/2 left-1/4 flex gap-1 z-10">
              <span className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></span>
              <span className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]"></span>
            </div>
            {/* Ambient dashboard glow */}
            <div className="absolute bottom-0 w-full h-1/4 bg-violet-900/20 blur-md"></div>
          </div>
        );
      case 1: // Level Crossing
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center overflow-hidden">
            {/* Tracks */}
            <div className="w-full h-12 bg-zinc-800/80 absolute bottom-1/4 flex flex-col justify-between">
              <div className="h-1 bg-zinc-600"></div>
              <div className="h-1 bg-zinc-600"></div>
            </div>
            {/* Level crossing light */}
            <div className="absolute right-1/4 top-1/3 flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-full bg-red-600 shadow-[0_0_20px_#ef4444] animate-ping absolute"></div>
              <div className="w-8 h-8 rounded-full bg-red-600 shadow-[0_0_20px_#ef4444] z-10"></div>
              <div className="w-2 h-20 bg-zinc-700"></div>
            </div>
            {/* Barrier */}
            <div className="w-2/3 h-3 bg-red-600 border border-white rotate-[25deg] absolute left-1/3 bottom-1/3 origin-bottom-right z-20"></div>
          </div>
        );
      case 2: // Seating adjustment
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#110B29] to-[#0A061E] flex items-center justify-center overflow-hidden">
            {/* Steering Wheel graphic */}
            <div className="w-40 h-40 rounded-full border-8 border-violet-500/20 flex items-center justify-center relative">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-400/20"></div>
              <div className="w-full h-4 bg-violet-500/20 absolute"></div>
              <div className="w-4 h-full bg-violet-500/20 absolute"></div>
            </div>
          </div>
        );
      case 3: // Tunnel
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-[#130d2f] to-zinc-950 flex items-center justify-center overflow-hidden">
            {/* Tunnel walls */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent border-r border-violet-500/10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent border-l border-violet-500/10"></div>
            {/* Safety diodes (blue lights) */}
            <div className="absolute left-6 top-1/2 flex flex-col gap-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
            </div>
            <div className="absolute right-6 top-1/2 flex flex-col gap-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
              <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
            </div>
            {/* Broken down car ahead */}
            <div className="w-20 h-10 bg-zinc-800 rounded-md border border-zinc-700 relative z-10 flex flex-col justify-between p-1">
              <div className="flex justify-between">
                <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b] animate-pulse"></span>
                <span className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b] animate-pulse"></span>
              </div>
              <div className="text-[6px] text-zinc-500 text-center font-mono">PANNE</div>
            </div>
          </div>
        );
      case 4: // Partage de la route (Cyclist / Pedestrian)
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] flex flex-col items-center justify-end overflow-hidden">
            {/* Street lanes */}
            <div className="w-full h-24 bg-[#334155] relative flex items-center justify-center border-t border-b border-slate-500">
              {/* Pedestrian Crosswalk (passage clouté) */}
              <div className="absolute left-1/4 h-full w-12 flex justify-between">
                <span className="w-2 h-full bg-white/90"></span>
                <span className="w-2 h-full bg-white/90"></span>
                <span className="w-2 h-full bg-white/90"></span>
                <span className="w-2 h-full bg-white/90"></span>
              </div>
              {/* Lane dividing dashed line */}
              <div className="w-full h-0.5 border-t border-dashed border-white/50 absolute top-1/2"></div>
              {/* Cyclist container */}
              <div className="absolute right-1/3 top-1/4 animate-bounce flex flex-col items-center">
                <div className="w-6 h-6 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-950/80">
                  <span className="text-[10px] text-emerald-400 font-bold">🚲</span>
                </div>
                {/* 1m safety zone aura */}
                <div className="absolute -inset-2 rounded-full border border-dashed border-emerald-400/40 animate-ping"></div>
                <div className="text-[8px] font-mono text-emerald-300 font-bold mt-1 bg-black/60 px-1 rounded border border-emerald-400/30">d &gt; 1m</div>
              </div>
              {/* Pedestrian indicator */}
              <div className="absolute left-1/5 bottom-2 flex flex-col items-center">
                <span className="text-xl animate-pulse">🚶</span>
                <span className="text-[7px] text-rose-400 font-black tracking-widest uppercase bg-black/60 px-1 rounded border border-rose-500/30">PRIORITAIRE</span>
              </div>
            </div>
          </div>
        );
      case 5: // Eco-Conduite (Highway Deceleration)
        return (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#1e1b4b] to-black flex items-center justify-center overflow-hidden">
            {/* Highway lines perspective */}
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-30">
              <div className="w-0.5 h-full bg-zinc-600 rotate-[-30deg] origin-top-left"></div>
              <div className="w-0.5 h-full bg-zinc-600 rotate-[30deg] origin-top-right"></div>
            </div>
            
            {/* Speed display & Eco indicator */}
            <div className="flex flex-col items-center gap-2 z-10 bg-black/55 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-md">
              <div className="text-2xl font-black text-rose-500 animate-pulse tracking-widest font-mono">
                110 <span className="text-xs text-rose-400/60">km/h</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider uppercase">FREIN MOTEUR (0L/100)</span>
              </div>
            </div>

            {/* Warning indicator representation in background */}
            <div className="absolute top-1/4 flex gap-8 z-0">
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-ping"></div>
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b] animate-ping"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getScoreFeedback = () => {
    const ratio = score / list.length;
    if (ratio >= 0.8) return t('situations.feedback_excellent');
    if (ratio >= 0.5) return t('situations.feedback_medium');
    return t('situations.feedback_low');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#070417] text-white py-10 px-4 overflow-hidden font-sans">
      {/* Intense Glowing Neon Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .neon-title-situations {
          background: linear-gradient(90deg, #c084fc 0%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(192,132,252,0.8)) drop-shadow(0 0 25px rgba(56,189,248,0.5));
        }
        .cyber-card {
          background: rgba(13, 9, 39, 0.7);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(16px);
        }
        .neon-border-glow:hover {
          border-color: rgba(56, 189, 248, 0.6);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
        }
      `}} />

      {/* Futuristic glowing grid behind */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,50,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,10,50,0.4)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Navigation / Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-violet-300/70 hover:text-cyan-400 transition-colors gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('nav.home') || "Accueil"}
          </Link>
          
          <div className="text-right">
            <h1 className={`text-4xl md:text-5xl font-black ${rockSalt.className} neon-title-situations mb-2`} style={{ letterSpacing: '-0.08em' }}>
              {t('situations.title')}
            </h1>
            <p className="text-violet-200/60 font-medium">
              {t('situations.subtitle')}
            </p>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!showSummary ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="cyber-card rounded-[2.5rem] overflow-hidden border border-violet-500/10"
            >
              {/* Image / Immersive visual compartment */}
              <div className="relative w-full h-44 md:h-56 border-b border-violet-500/10">
                {renderMockupVisual()}
                
                {/* Progress Overlay */}
                <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-sm font-mono font-bold tracking-wider z-20 flex items-center gap-2">
                  <Car className="w-4 h-4 text-cyan-400" />
                  {t('situations.progress')
                    ?.replace('{current}', (currentIdx + 1).toString())
                    ?.replace('{total}', list.length.toString())}
                </div>
              </div>

              {/* Interaction Details Area */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Heading details */}
                <div className="space-y-4">
                  <span className="text-xs uppercase font-black tracking-widest text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    {t('situations.question_title') || "La Situation"}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black leading-snug text-slate-100">
                    {currentScenario.situation}
                  </h2>
                  <p className="text-lg font-bold text-violet-200">
                    {currentScenario.question}
                  </p>
                </div>

                {/* Multiple choice selections */}
                <div className="grid grid-cols-1 gap-4">
                  {[currentScenario.o1, currentScenario.o2, currentScenario.o3, currentScenario.o4].map((opt, idx) => {
                    const isSelected = selectedAns === idx;
                    const isCorrectOption = idx === correctAnswerIndex;
                    
                    let btnStyle = "bg-white/5 border-white/10 text-slate-300 neon-border-glow";
                    if (isSelected && !isSubmitted) {
                      btnStyle = "bg-violet-600/30 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]";
                    } else if (isSubmitted) {
                      if (isCorrectOption) {
                        btnStyle = "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(52,211,153,0.3)]";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500/20 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]";
                      } else {
                        btnStyle = "bg-white/2 border-white/5 text-slate-500 opacity-60";
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={!isSubmitted ? { scale: 1.01 } : {}}
                        whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between gap-4 font-bold text-sm md:text-base ${btnStyle}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono font-black text-sm uppercase text-slate-300">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSubmitted && isCorrectOption && (
                          <span className="shrink-0 text-emerald-400 font-mono text-sm font-black uppercase tracking-wider">{t('quiz.correct') || "Correct"}</span>
                        )}
                        {isSubmitted && isSelected && !isCorrectOption && (
                          <span className="shrink-0 text-rose-400 font-mono text-sm font-black uppercase tracking-wider">{t('quiz.wrong') || "Faux"}</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Submit/Next Actions */}
                <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4 border-t border-white/5">
                  {!isSubmitted ? (
                    <motion.button
                      whileHover={{ scale: selectedAns !== null ? 1.03 : 1 }}
                      whileTap={{ scale: selectedAns !== null ? 0.97 : 1 }}
                      onClick={handleValidate}
                      disabled={selectedAns === null}
                      className={`w-full sm:w-auto px-8 py-4 rounded-xl font-black text-base uppercase tracking-wider transition-all duration-300 ${
                        selectedAns !== null 
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_10px_30px_rgba(139,92,246,0.3)]'
                          : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
                      }`}
                    >
                      {t('situations.btn_validate') || "Valider la réponse"}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNext}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-[0_10px_30px_rgba(6,182,212,0.3)] rounded-xl font-black text-base uppercase tracking-wider transition-all duration-300"
                    >
                      {t('situations.btn_next') || "Suivant"}
                    </motion.button>
                  )}
                </div>

                {/* Dynamic Feedback block */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-white/5 rounded-[1.5rem] p-6 border border-white/10 space-y-3 overflow-hidden"
                    >
                      <h4 className="flex items-center gap-2 text-lg font-black tracking-tight">
                        {selectedAns === correctAnswerIndex ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
                            <span className="text-emerald-400">
                              {t('situations.correct') || "Bonne réponse !"}
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-6 h-6 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
                            <span className="text-rose-400">
                              {t('situations.incorrect') || "Mauvaise réponse..."}
                            </span>
                          </>
                        )}
                      </h4>
                      <p className="text-sm font-bold text-violet-300/80 tracking-wide uppercase">
                        {t('situations.explanation_title') || "L'explication :"}
                      </p>
                      <p className="text-slate-300 font-medium leading-relaxed">
                        {currentScenario.exp}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          ) : (
            /* Immersive Retro-Cyberpunk Summary Dashboard */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cyber-card rounded-[2.5rem] p-8 md:p-14 border border-violet-500/10 text-center space-y-10"
            >
              <div className="space-y-4">
                <div className="inline-flex w-20 h-20 rounded-full bg-violet-600/20 border border-violet-400/30 items-center justify-center text-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.2)] mb-4">
                  <Award className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-100 tracking-tight">
                  {t('situations.score_title') || "Bilan de conduite"}
                </h2>
                <p className="text-violet-200/60 max-w-xl mx-auto font-medium text-lg leading-relaxed">
                  {t('situations.score_desc')}
                </p>
              </div>

              {/* Dynamic glowing circular progress display */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <span className="text-5xl md:text-7xl font-black text-cyan-400 font-mono tracking-tight filter drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  {score} <span className="text-violet-500/40">/</span> {list.length}
                </span>
                
                {/* Bullet visual validation indicators */}
                <div className="flex gap-2 justify-center">
                  {historyAnswers.map((isCorrect, idx) => (
                    <span 
                      key={idx} 
                      className={`w-3 h-3 rounded-full ${
                        isCorrect 
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' 
                          : 'bg-rose-400 shadow-[0_0_8px_#f43f5e]'
                      }`}
                    ></span>
                  ))}
                </div>

                <div className="pt-4 max-w-lg mx-auto text-xl font-bold text-violet-100 leading-relaxed">
                  {getScoreFeedback()}
                </div>
              </div>

              {/* Action layout */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t border-white/5 max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRestart}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 font-bold transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  {t('situations.btn_finish') || "Recommencer"}
                </motion.button>

                <Link href="/" className="w-full">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_10px_25px_rgba(139,92,246,0.3)]"
                  >
                    {t('ui.back_to_modules') || "Retour aux cours"}
                  </motion.button>
                </Link>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
