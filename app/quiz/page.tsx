'use client';

import { useState } from 'react';
import { Quiz } from '@/components/Quiz';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

type QuizModule = 'signalisation' | 'priorites' | 'regles' | 'vitesse' | 'stationnement' | 'autoroute' | 'securite' | 'alcool' | 'mecanique' | 'eco_conduite' | 'premiers_secours' | 'partage_route';

export default function QuizPage() {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState<QuizModule | null>(null);

  const modules = [
    {
      id: 'signalisation' as const,
      title: t('cours.modules_list.m1_title') || "Signalisation",
      desc: t('cours.modules_list.m1_desc') || "Tests sur les panneaux et marquages.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 'priorites' as const,
      title: t('cours.modules_list.m2_title') || "Priorités",
      desc: t('cours.modules_list.m2_desc') || "Règles d'intersections et passages.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 'regles' as const,
      title: t('cours.modules_list.m3_title') || "Règles",
      desc: t('cours.modules_list.m3_desc') || "Placement et règles fondamentales.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 'vitesse' as const,
      title: t('cours.modules_list.m4_title') || "Vitesse",
      desc: t('cours.modules_list.m4_desc') || "Apprendre à adapter son allure.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-orange-500 to-red-600"
    },
    {
      id: 'stationnement' as const,
      title: t('cours.modules_list.m5_title') || "Stationnement",
      desc: t('cours.modules_list.m5_desc') || "Les règles pour s'arrêter ou se garer.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 'autoroute' as const,
      title: t('cours.modules_list.m6_title') || "Autoroute",
      desc: t('cours.modules_list.m6_desc') || "L'insertion, circulation et sorties.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-rose-500 to-pink-600"
    },
    {
      id: 'securite' as const,
      title: t('cours.modules_list.m7_title') || "Sécurité",
      desc: t('cours.modules_list.m7_desc') || "Distances de sécurité et vigilance.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-emerald-400 to-green-600"
    },
    {
      id: 'alcool' as const,
      title: t('cours.modules_list.m8_title') || "Alcool & Drogues",
      desc: t('cours.modules_list.m8_desc') || "Effets, limites et dangers.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-700"
    },
    {
      id: 'mecanique' as const,
      title: t('cours.modules_list.m9_title') || "Mécanique",
      desc: t('cours.modules_list.m9_desc') || "Vérifications et entretien véhicule.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "from-gray-500 to-slate-700"
    },
    {
      id: 'eco_conduite' as const,
      title: t('cours.modules_list.m10_title') || "Éco-Conduite",
      desc: t('cours.modules_list.m10_desc') || "Conduire de manière économique.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3s-6.5 0-11 4.5S3 16 3 21c5-5 5-11 5-11s0-4.5 4.5-9" />
        </svg>
      ),
      color: "from-green-400 to-emerald-600"
    },
    {
      id: 'premiers_secours' as const,
      title: t('cours.modules_list.m11_title') || "Premiers Secours",
      desc: t('cours.modules_list.m11_desc') || "Protéger, alerter et secourir.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: "from-red-400 to-rose-600"
    },
    {
      id: 'partage_route' as const,
      title: t('cours.modules_list.m12_title') || "Partage de la Route",
      desc: t('cours.modules_list.m12_desc') || "Coexister avec les autres usagers.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-cyan-400 to-blue-600"
    }
  ];


  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A061E] text-white pt-16 pb-12 px-6 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AnimatedSection>
                <header className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-300 to-emerald-400 tracking-tighter">
                    {t('quiz.title') || "Testez vos connaissances"}
                  </h1>
                  <p className="text-base text-violet-100/60 font-medium max-w-2xl mx-auto">
                    {t('quiz.subtitle') || "Choisissez un module pour commencer votre entraînement intensif."}
                  </p>
                </header>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {modules.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveModule(m.id)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all hover:bg-white/10 hover:border-violet-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4 shadow-2xl group-hover:scale-105 transition-transform`}>
                        {m.icon}
                      </div>
                      <h3 className="text-xl font-black mb-2">{m.title}</h3>
                      <p className="text-sm text-violet-100/40 font-medium leading-relaxed">
                        {m.desc}
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-violet-400 font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{t('quiz.start') || "Commencer"}</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <div className="flex justify-center mb-10">
                <button 
                  onClick={() => setActiveModule(null)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl text-violet-100/60 font-bold transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {t('quiz.quit') || "Quitter le quiz"}
                </button>
              </div>
              <Quiz moduleKey={activeModule} onRestart={() => setActiveModule(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
